//////////////////////////////////////////
// -------------HSV LAB DIN99---------------//
//////////////////////////////////////////
function hueInit() {
  var canvasID;
  switch (showSideID) {
    case 1:
      canvasID = "id_ModiyCourseHueBackground";
      break;
    case 2:
      canvasID = "id_anaylzeCourseHueBackground";
      break;
    case 3:
      canvasID = "id_compareCourseHueBackground";
      break;
    default:

  }

  var canvasColorspace = document.getElementById(canvasID);

  canvasColorspace.width = hue_bg_resolution_X;
  canvasColorspace.height = hue_bg_resolution_Y;
  var canvasColorspaceWidth = canvasColorspace.width;
  var canvasColorspaceHeight = canvasColorspace.height;

  var colorspaceContex = canvasColorspace.getContext("2d");
  var colorspaceBackgroundData = colorspaceContex.getImageData(0, 0, canvasColorspaceWidth, canvasColorspaceHeight);

  var colorspaceCenterX = Math.round(canvasColorspaceWidth / 2);
  var colorspaceCenterY = Math.round(canvasColorspaceHeight / 2);
  var colorspaceRadius = Math.round((canvasColorspaceWidth / 2) * radiusratio);

  var errorRGBColor = new classColor_RGB(0.5, 0.5, 0.5);

  switch (analyzeColorspaceModus) {
    case "hsv":
      for (var x = 0; x < canvasColorspaceWidth; x++) {

        for (var y = 0; y < canvasColorspaceHeight; y++) {

          var dis = Math.sqrt(Math.pow(colorspaceCenterX - x, 2) + Math.pow(colorspaceCenterY - y, 2));

          if (dis <= colorspaceRadius) {
            // calc hsv color

            var ty = (y) - (colorspaceCenterY);
            var tx = x - colorspaceCenterX;
            var angle = (Math.atan2(ty, tx) + Math.PI) / (Math.PI * 2); // values 0-1 ...
            var hVal = angle;
            var sVal = dis / colorspaceRadius;
            var vVal;

            if (mouseGrappedKeyID == -1) {
              if (showSideID == 1)
                vVal = parseFloat(document.getElementById('id_setValueRange').value) / 100;
              else
                vVal = 1.0;
            } else {
              switch (mouseGrappedColorSide) {
                case 0:
                  // left color
                  vVal = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "hsv").getVValue();
                  break;
                default:
                  // both colors
                  vVal = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "hsv").getVValue();
              }
            }

            var colorHSV = new classColor_HSV(hVal, sVal, vVal);
            var colorRGB = colorHSV.calcRGBColor();
            var index = (x + y * canvasColorspaceWidth) * 4;

            colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
            colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
            colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
            colorspaceBackgroundData.data[index + 3] = 255; //a


          }

        }

      }
      break;
    case "lab":
      var xStart = canvasColorspaceWidth * 0.1;
      var yStart = canvasColorspaceHeight * 0.1;
      var xEnd = canvasColorspaceWidth * 0.9;
      var yEnd = canvasColorspaceHeight * 0.9;
      var xWidth = canvasColorspaceWidth * labSpaceRectRange;
      var yHeight = canvasColorspaceHeight * labSpaceRectRange;

      colorspaceCenterX = Math.round(canvasColorspaceWidth / 2);
      colorspaceCenterY = Math.round(canvasColorspaceHeight / 2);

      // draw colorspace
      for (var x = 0; x < canvasColorspaceWidth; x++) {

        for (var y = 0; y < canvasColorspaceHeight; y++) {

          if (x >= xStart && x <= xEnd && y >= yStart && y <= yEnd) {
            // calc hsv color
            var colorRGB;

            if (mouseGrappedKeyID == -1) {
              var lVal;

              if (showSideID == 1)
                lVal = parseFloat(document.getElementById('id_setValueRange').value);
              else
                lVal = 65;

              var aVal = ((x - colorspaceCenterX) / (xWidth / 2)) * labSpaceRange;
              var bVal = ((y - colorspaceCenterY) / (yHeight / 2)) * labSpaceRange;

              var colorLAB = new classColor_LAB(lVal, aVal, bVal);
              colorRGB = colorLAB.calcRGBColor();
            } else {

              var lVal;

              switch (mouseGrappedColorSide) {
                case 0:
                  // left color
                  lVal = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "lab").getLValue();
                  break;
                default:
                  // both colors
                  lVal = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "lab").getLValue();
              }

              var aVal = ((x - colorspaceCenterX) / (xWidth / 2)) * labSpaceRange;
              var bVal = ((y - colorspaceCenterY) / (yHeight / 2)) * labSpaceRange;

              var colorLAB = new classColor_LAB(lVal, aVal, bVal);

              if (document.getElementById("id_checkboxRGB").checked == true) {
                colorRGB = colorLAB.calcRGBColorCorrect(errorRGBColor);
              } else {
                colorRGB = colorLAB.calcRGBColor();
              }


            } // else


            var index = (x + y * canvasColorspaceWidth) * 4;

            colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
            colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
            colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
            colorspaceBackgroundData.data[index + 3] = 255; //a
          }
        }

      }
      break;
    case "din99":
      var xStart = canvasColorspaceWidth * 0.1;
      var yStart = canvasColorspaceHeight * 0.1;
      var xEnd = canvasColorspaceWidth * 0.9;
      var yEnd = canvasColorspaceHeight * 0.9;
      var xWidth = canvasColorspaceWidth * labSpaceRectRange;
      var yHeight = canvasColorspaceHeight * labSpaceRectRange;


      rangeA99 = rangeA99Pos - rangeA99Neg;
      rangeB99 = rangeB99Pos - rangeB99Neg;

      colorspaceCenterX = Math.round(canvasColorspaceWidth / 2);
      colorspaceCenterY = Math.round(canvasColorspaceHeight / 2);


      // draw colorspace
      for (var x = 0; x < canvasColorspaceWidth; x++) {

        for (var y = 0; y < canvasColorspaceHeight; y++) {

          if (x >= xStart && x <= xEnd && y >= yStart && y <= yEnd) {
            // calc hsv color
            var colorRGB;
            //var a99Val = ((x-colorspaceCenterX)/(xWidth/2))*din99SpaceRange;
            //var b99Val = ((y-colorspaceCenterY)/(yHeight/2))*din99SpaceRange;
            var a99Val = ((x - xStart) / (xEnd - xStart)) * rangeA99 + rangeA99Neg;
            var b99Val = ((y - yStart) / (yEnd - yStart)) * rangeB99 + rangeB99Neg;

            var colorDIN99;

            if (mouseGrappedKeyID == -1) {
              var l99Val;

              if (showSideID == 1)
                l99Val = parseFloat(document.getElementById('id_setValueRange').value);
              else
                l99Val = 65;

              colorDIN99 = new classColorDIN99(l99Val, a99Val, b99Val);
              colorRGB = colorDIN99.calcRGBColor();
            } else {

              var l99Val;

              switch (mouseGrappedColorSide) {
                case 0:
                  // left color
                  l99Val = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "din99").getL99Value();
                  break;
                default:
                  // both colors
                  l99Val = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "din99").getL99Value();
              }

              colorDIN99 = new classColorDIN99(l99Val, a99Val, b99Val);

              if (document.getElementById("id_checkboxRGB").checked == true) {
                colorRGB = colorDIN99.calcRGBColorCorrect(errorRGBColor);
              } else {
                colorRGB = colorDIN99.calcRGBColor();
              }

            } // else

            if (colorRGB.getRValue() == 0 && colorRGB.getGValue() == 0 && colorRGB.getBValue() == 0) {
              if (colorDIN99.getL99Value() != 0 || colorDIN99.getA99Value() != 0 || colorDIN99.getB99Value() != 0) {
                colorRGB = new classColor_RGB(1, 1, 1);
              }
            }

            //console.log(a99Val+' '+b99Val);
            //console.log(colorRGB.getRValue()*255+' '+colorRGB.getGValue()*255+' '+colorRGB.getBValue()*255);
            //break;

            var index = (x + y * canvasColorspaceWidth) * 4;

            colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
            colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
            colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
            colorspaceBackgroundData.data[index + 3] = 255; //a
          }
        }

      }
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  colorspaceContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;

}

function init_VPlot() {

  var canvasID = '';
  switch (showSideID) {
    case 1:
      canvasID = 'id_ModifyValueBackground';
      break;
    case 2:
      canvasID = 'id_analyzeValueBackground';
      break;
    case 3:
      canvasID = 'id_compareValueBackground';
      break;
    default:

  }
  var canvasVPlot = document.getElementById(canvasID);

  canvasVPlot.width = vPlot_bg_resolution_X;
  canvasVPlot.height = vPlot_bg_resolution_Y;

  //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
  var vPlotContex = canvasVPlot.getContext("2d");

  var yStart = Math.round(vPlot_bg_resolution_Y * 0.9);
  var yEnd = Math.round(vPlot_bg_resolution_Y * 0.2);
  var yEndLine = Math.round(vPlot_bg_resolution_Y * 0.15);
  var yEndArrow = Math.round(vPlot_bg_resolution_Y * 0.1);
  var arrowHeight = Math.round((yEndLine - yEndArrow) * 0.75);
  var labelFontSize = arrowHeight * 0.75;
  var labelFontSizeSmall = arrowHeight * 0.5;
  var xStart = Math.round(vPlot_bg_resolution_X * 0.1);
  var xEnd = Math.round(vPlot_bg_resolution_X * 0.85);
  var xEndArrow = Math.round(vPlot_bg_resolution_X * 0.9);
  var xEndLine = xEndArrow - arrowHeight;

  var lineColor = 'rgb(200,200,200)';
  var arrowFontColor = 'rgb(90,90,90)';

  vPlotContex.fillStyle = arrowFontColor;
  /////////////////////////////////////////////////////////////////
  // init vars for V-Value Overview
  var widthVArea = 0;
  var widthVArea2 = 0;

  var tmpCounter = 0;
  var leftCounter = 0;

  var xPosPos;
  var plotwidth = xEnd - xStart;

  widthVArea = globalCMS1.getRefRange();

  if (showSideID == 3) {
    widthVArea2 = globalCMS2.getRefRange();

    for (var i = 0; i < globalCMS2.getKeyLength(); i++) {

      xPosPos = xStart + ((globalCMS2.getRefPosition(i) - globalCMS2.getRefPosition(0)) / widthVArea2) * plotwidth;

      vPlotContex.beginPath();
      vPlotContex.lineWidth = Math.round(lineWidthVPlot / 2);
      vPlotContex.moveTo(xPosPos, yStart);
      vPlotContex.lineTo(xPosPos, vPlot_bg_resolution_Y * 0.93);
      vPlotContex.strokeStyle = "rgb(200,200,200)";
      vPlotContex.stroke();
      vPlotContex.strokeStyle = "rgb(200,200,200)";
      var text = "" + (i + 1);
      vPlotContex.font = labelFontSizeSmall + "px Arial";
      vPlotContex.fillText(text, xPosPos, vPlot_bg_resolution_Y * 0.96 + labelFontSizeSmall);

    }
  }


  for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

    xPosPos = xStart + ((globalCMS1.getRefPosition(i) - globalCMS1.getRefPosition(0)) / widthVArea) * plotwidth;

    vPlotContex.beginPath();
    vPlotContex.lineWidth = Math.round(lineWidthVPlot / 2);
    vPlotContex.moveTo(xPosPos, yStart);
    vPlotContex.lineTo(xPosPos, vPlot_bg_resolution_Y * 0.93);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
    var text = "" + (i + 1);
    vPlotContex.font = labelFontSizeSmall + "px Arial";
    vPlotContex.fillText(text, xPosPos, vPlot_bg_resolution_Y * 0.93 + labelFontSizeSmall);

  }


  xPosPos = Math.round(vPlot_bg_resolution_X * 0.09);
  var yPos = yStart;
  vPlotContex.font = labelFontSizeSmall + "px Arial";

  vPlotContex.beginPath();
  vPlotContex.lineWidth = 1;
  vPlotContex.moveTo(xPosPos, yPos);
  vPlotContex.lineTo(xStart, yPos);
  vPlotContex.strokeStyle = lineColor;
  vPlotContex.stroke();
  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillText("0.00", xPosPos * 0.75, yPos);

  yPos = yStart - (yStart - yEnd) * 0.10;
  vPlotContex.beginPath();
  vPlotContex.lineWidth = 1;
  vPlotContex.moveTo(xPosPos, yPos);
  vPlotContex.lineTo(xEnd, yPos);
  vPlotContex.strokeStyle = lineColor;
  vPlotContex.stroke();
  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillText("0.10", xPosPos * 0.75, yPos);

  yPos = yStart - (yStart - yEnd) * 0.20;
  vPlotContex.beginPath();
  vPlotContex.lineWidth = 1;
  vPlotContex.moveTo(xPosPos, yPos);
  vPlotContex.lineTo(xEnd, yPos);
  vPlotContex.strokeStyle = lineColor;
  vPlotContex.stroke();
  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillText("0.20", xPosPos * 0.75, yPos);

  yPos = yStart - (yStart - yEnd) * 0.30;
  vPlotContex.beginPath();
  vPlotContex.lineWidth = 1;
  vPlotContex.moveTo(xPosPos, yPos);
  vPlotContex.lineTo(xEnd, yPos);
  vPlotContex.strokeStyle = lineColor;
  vPlotContex.stroke();
  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillText("0.30", xPosPos * 0.75, yPos);

  yPos = yStart - (yStart - yEnd) * 0.40;
  vPlotContex.beginPath();
  vPlotContex.lineWidth = 1;
  vPlotContex.moveTo(xPosPos, yPos);
  vPlotContex.lineTo(xEnd, yPos);
  vPlotContex.strokeStyle = lineColor;
  vPlotContex.stroke();
  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillText("0.40", xPosPos * 0.75, yPos);

  yPos = yStart - (yStart - yEnd) * 0.50;
  vPlotContex.beginPath();
  vPlotContex.lineWidth = 2;
  vPlotContex.moveTo(xPosPos, yPos);
  vPlotContex.lineTo(xEnd, yPos);
  vPlotContex.strokeStyle = lineColor;
  vPlotContex.stroke();
  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillText("0.50", xPosPos * 0.75, yPos);

  yPos = yStart - (yStart - yEnd) * 0.60;
  vPlotContex.beginPath();
  vPlotContex.lineWidth = 1;
  vPlotContex.moveTo(xPosPos, yPos);
  vPlotContex.lineTo(xEnd, yPos);
  vPlotContex.strokeStyle = lineColor;
  vPlotContex.stroke();
  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillText("0.60", xPosPos * 0.75, yPos);

  yPos = yStart - (yStart - yEnd) * 0.70;
  vPlotContex.beginPath();
  vPlotContex.lineWidth = 1;
  vPlotContex.moveTo(xPosPos, yPos);
  vPlotContex.lineTo(xEnd, yPos);
  vPlotContex.strokeStyle = lineColor;
  vPlotContex.stroke();
  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillText("0.70", xPosPos * 0.75, yPos);

  yPos = yStart - (yStart - yEnd) * 0.80;
  vPlotContex.beginPath();
  vPlotContex.lineWidth = 1;
  vPlotContex.moveTo(xPosPos, yPos);
  vPlotContex.lineTo(xEnd, yPos);
  vPlotContex.strokeStyle = lineColor;
  vPlotContex.stroke();
  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillText("0.80", xPosPos * 0.75, yPos);

  yPos = yStart - (yStart - yEnd) * 0.90;
  vPlotContex.beginPath();
  vPlotContex.lineWidth = 1;
  vPlotContex.moveTo(xPosPos, yPos);
  vPlotContex.lineTo(xEnd, yPos);
  vPlotContex.strokeStyle = lineColor;
  vPlotContex.stroke();
  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillText("0.90", xPosPos * 0.75, yPos);

  yPos = yStart - (yStart - yEnd);
  vPlotContex.beginPath();
  vPlotContex.lineWidth = 1;
  vPlotContex.moveTo(xPosPos, yPos);
  vPlotContex.lineTo(xEnd, yPos);
  vPlotContex.strokeStyle = lineColor;
  vPlotContex.stroke();
  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillText("1.00", xPosPos * 0.75, yPos);

  ////////////////////////////////////////////////////////////
  /////////////ARROWS////////////////////
  ////////////////////////////////////////////////////////////
  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.beginPath();
  vPlotContex.lineWidth = lineWidthVPlot;
  vPlotContex.moveTo(xStart, yStart);
  vPlotContex.lineTo(xEndLine, yStart);
  vPlotContex.stroke();

  // the triangle
  vPlotContex.beginPath();
  vPlotContex.moveTo(xEndLine, yStart - arrowWidth);
  vPlotContex.lineTo(xEndArrow, yStart);
  vPlotContex.lineTo(xEndLine, yStart + arrowWidth);
  vPlotContex.closePath();

  // the fill color
  vPlotContex.fillStyle = arrowFontColor;
  vPlotContex.fill();

  vPlotContex.beginPath();
  vPlotContex.lineWidth = lineWidthVPlot;
  vPlotContex.moveTo(xStart, yStart);
  vPlotContex.lineTo(xStart, yEndLine);
  vPlotContex.stroke();

  // the triangle
  vPlotContex.beginPath();
  vPlotContex.moveTo(xStart - arrowWidth, yEndLine);
  vPlotContex.lineTo(xStart, yEndArrow);
  vPlotContex.lineTo(xStart + arrowWidth, yEndLine);
  vPlotContex.closePath();

  // the fill color
  vPlotContex.fill();

  ////////////////// TEXT /////////////////////
  vPlotContex.font = labelFontSize + "px Arial";

  vPlotContex.fillText("Key Position", xEndArrow, yStart + labelFontSize);

  switch (analyzeColorspaceModus) {
    case "hsv":
      vPlotContex.fillText("Value", xStart - labelFontSize, yEndArrow);
      break;
    case "lab":
    case "din99":
      vPlotContex.fillText("Lightness", xStart - labelFontSize, yEndArrow);
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

}

function drawcolormap_hueSpace(calcBackground, drawInterpolationLine, doInitVplot) {

  if (doInitVplot)
    init_VPlot();

  if (calcBackground)
    hueInit();

    if(showSideID==3) // is Compare PAGE
    {
      drawElements_HSV_LAB_DIN99(true);

      if (drawInterpolationLine)
        drawInterpolationLineHSV_LAB_DIN99(true, intervalSize);
    }
    else {
      drawElements_HSV_LAB_DIN99(false);

      if (drawInterpolationLine)
        drawInterpolationLineHSV_LAB_DIN99(false, intervalSize);
    }

}


function drawElements_HSV_LAB_DIN99(isCompareMap) {

  var canvasID, vCanvasID;
  switch (showSideID) {
    case 1:
      canvasID = "id_ModiyCourseHueTop";
      vCanvasID = 'id_ModifyValueTop';
      break;
    case 2:
      canvasID = "id_anaylzeCourseHueTop";
      vCanvasID = 'id_analyzeValueTop';
      break;
    case 3:
      canvasID = "id_compareCourseHueTop";
      vCanvasID = 'id_compareValueTop';
      break;
    default:

  }

  var canvasColorspace = document.getElementById(canvasID);

  canvasColorspace.width = hue_resolution_X;
  canvasColorspace.height = hue_resolution_Y;
  var canvasColorspaceWidth = canvasColorspace.width;
  var canvasColorspaceHeight = canvasColorspace.height;

  var colorspaceCenterX = Math.round(canvasColorspaceWidth / 2);
  var colorspaceCenterY = Math.round(canvasColorspaceHeight / 2);
  var colorspaceRadius = Math.round((canvasColorspaceWidth / 2) * radiusratio);
  var xStart = canvasColorspaceWidth * 0.1;
  var yStart = canvasColorspaceHeight * 0.1;
  var xEnd = canvasColorspaceWidth * 0.9;
  var yEnd = canvasColorspaceHeight * 0.9;

  var xWidth = canvasColorspaceWidth * 0.8;
  var yHeight = canvasColorspaceHeight * 0.8;

  //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
  var colorspaceContex = canvasColorspace.getContext("2d");
  var canvasColorspaceData = colorspaceContex.getImageData(0, 0, canvasColorspaceWidth, canvasColorspaceHeight);


  var canvasVPlot = document.getElementById(vCanvasID);

  canvasVPlot.width = vPlot_resolution_X;
  canvasVPlot.height = vPlot_resolution_Y;

  var vPlotContex = canvasVPlot.getContext("2d");

  var vPlotyStart = Math.round(vPlot_resolution_Y * 0.9);
  var vPlotyEnd = Math.round(vPlot_resolution_Y * 0.2);
  var vPlotxStart = Math.round(vPlot_resolution_X * 0.1);
  var vPlotxEnd = Math.round(vPlot_resolution_X * 0.85);
  var heigthVArea = vPlotyStart - vPlotyEnd;
  var plotwidth = vPlotxEnd - vPlotxStart;

  /////////////////////////////////////////////////////////////////



  /////////////////////////////////////////////////////////////////

  var xPos, yPos, xPos2, yPos2, xVPos, xVPos2, tmpColor, tmpColor2;
  xVPos = xStart;
  xVPos2 = xStart;

  spaceElementsXPos = [];
  spaceElementsYPos = [];
  spaceElementsType = [];
  spaceElementsKey = [];
  spaceElementsColor = [];

  var border=1;
  if (isCompareMap) {
    border = 2;
    globalCMS2.calcIntervalColors(intervalSize, colorspaceModus);
  }

  for (var j = 0; j < border; j++) {
    var workCMS;
    switch (j) {
      case 0:
        workCMS = globalCMS1;
        break;
      case 1:
        workCMS = globalCMS2;
        break;
      default:
    }

    for (var i = 0; i < workCMS.getKeyLength(); i++) {

      switch (workCMS.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

          tmpColor = workCMS.getLeftKeyColor(i, analyzeColorspaceModus);

          var drawCircle = true;

          if (workCMS.getKeyType(i - 1) === "nil key" || workCMS.getKeyType(i - 1) === "left key")
            drawCircle = false;

          ////////////////////////////////////////////////////////////////
          /////// left Color

          drawHueElement(tmpColor, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, drawCircle, colorspaceContex, i, 0);

          ////////////////////////////////////////////////////////////////
          /////// Right Color

          var tmpColor2 = workCMS.getRightKeyColor(i, analyzeColorspaceModus);

          drawHueElement(tmpColor2, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, true, colorspaceContex, i, 1);


          ////////////////////////////////////////////////////////////////
          /////// V Plot

          if (drawCircle) {
            drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex, i, 0);
            drawVElement(tmpColor2, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex, i, 1);
          } else {

            drawVElement(tmpColor, workCMS.getRefPosition(i - 1), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex, i, 0);
            drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex, i, 0);
            drawVElement(tmpColor2, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex, i, 1);

          }

          break;
        case "left key":

          var drawCircle = true;
          if (workCMS.getKeyType(i - 1) === "nil key" || workCMS.getKeyType(i - 1) === "left key")
            drawCircle = false;

          ////////////////////////////////////////////////////////////////
          /////// left Color

          tmpColor = workCMS.getLeftKeyColor(i, analyzeColorspaceModus);

          drawHueElement(tmpColor, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, drawCircle, colorspaceContex, i, 0);

          ////////////////////////////////////////////////////////
          ///// Right Color

          // do nothing

          ////////////////////////////////////////////////////////////////
          /////// V Plot

          if (drawCircle) {
            drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex, i, 0);
          } else {
            drawVElement(tmpColor, workCMS.getRefPosition(i - 1), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex, i, 0);
            drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex, i, 0);
          }
          break;

        case "right key":

          tmpColor = workCMS.getRightKeyColor(i, analyzeColorspaceModus); // right color because of right key

          drawHueElement(tmpColor, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, true, colorspaceContex, i, 1);

          ////////////////////////////////////////////////////////////////
          /////// V Plot

          drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex, i, 1);

          break;
        default:
          // dual Key

          tmpColor = workCMS.getRightKeyColor(i, analyzeColorspaceModus); // right color because of right key

          drawHueElement(tmpColor, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, true, colorspaceContex, i, 2);

          ////////////////////////////////////////////////////////////////
          /////// V Plot

          drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex, i, 2);

      }

    }

  }


}


function drawInterpolationLineHSV_LAB_DIN99(isCompareMap, intervalSize) {


  var canvasID, vCanvasID;
  switch (showSideID) {
    case 1:
      canvasID = "id_ModiyCourseHueMiddle";
      vCanvasID = 'id_ModifyValueMiddle';
      break;
    case 2:
      canvasID = "id_anaylzeCourseHueMiddle";
      vCanvasID = 'id_analyzeValueMiddle';
      break;
    case 3:
      canvasID = "id_compareCourseHueMiddle";
      vCanvasID = 'id_compareValueMiddle';
      break;
    default:
  }

  var canvasColorspace = document.getElementById(canvasID);

  canvasColorspace.width = hue_resolution_X;
  canvasColorspace.height = hue_resolution_Y;
  var canvasColorspaceWidth = canvasColorspace.width;
  var canvasColorspaceHeight = canvasColorspace.height;

  var colorspaceCenterX = Math.round(canvasColorspaceWidth / 2);
  var colorspaceCenterY = Math.round(canvasColorspaceHeight / 2);
  var colorspaceRadius = Math.round((canvasColorspaceWidth / 2) * radiusratio);
  var xStart = canvasColorspaceWidth * 0.1;
  var yStart = canvasColorspaceHeight * 0.1;
  var xEnd = canvasColorspaceWidth * 0.9;
  var yEnd = canvasColorspaceHeight * 0.9;

  var xWidth = canvasColorspaceWidth * 0.8;
  var yHeight = canvasColorspaceHeight * 0.8;

  //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
  var colorspaceContex = canvasColorspace.getContext("2d");
  var canvasColorspaceData = colorspaceContex.getImageData(0, 0, canvasColorspaceWidth, canvasColorspaceHeight);


  var canvasVPlot = document.getElementById(vCanvasID);

  canvasVPlot.width = vPlot_resolution_X;
  canvasVPlot.height = vPlot_resolution_Y;

  var vPlotContex = canvasVPlot.getContext("2d");

  var vPlotyStart = Math.round(vPlot_resolution_Y * 0.9);
  var vPlotyEnd = Math.round(vPlot_resolution_Y * 0.2);
  var vPlotxStart = Math.round(vPlot_resolution_X * 0.1);
  var vPlotxEnd = Math.round(vPlot_resolution_X * 0.85);
  var heigthVArea = vPlotyStart - vPlotyEnd;
  var plotwidth = vPlotxEnd - vPlotxStart;

  globalCMS1.calcIntervalColors(intervalSize, colorspaceModus);

  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;

  var border = 1;

  if (isCompareMap) {
    border = 2;
    globalCMS2.calcIntervalColors(intervalSize, colorspaceModus);
  }

  for (var x = 0; x < border; x++) {
    var workCMS;
    var compareColor = false;
    switch (x) {
      case 0:
        workCMS = globalCMS1;
        break;
      case 1:
        workCMS = globalCMS2;
        compareColor = true;
        break;
      default:
    }

    for (var i = 0; i < workCMS.getKeyLength() - 1; i++) {

      switch (workCMS.getKeyType(i)) {
        case "nil key":
          //drawHueLine(workCMS.getLeftKeyColor(i,analyzeColorspaceModus),workCMS.getLeftKeyColor(i+1,analyzeColorspaceModus),xWidth,yHeight,xStart,yStart,xEnd,yEnd,colorspaceRadius, colorspaceCenterY, colorspaceCenterX, isDashed,compareColor,colorspaceContex);
          drawVLine(workCMS.getLeftKeyColor(i + 1, analyzeColorspaceModus),
            workCMS.getLeftKeyColor(i + 1, analyzeColorspaceModus),
            workCMS.getRefPosition(i),
            workCMS.getRefPosition(i + 1),
            workCMS.getRefPosition(0),
            workCMS.getRefRange(),
            vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex);
          break;
        case "twin key":
          var intervalIndexA = workCMS.getIntervalPositions(i);
          drawHueLine(workCMS.getLeftKeyColor(i, analyzeColorspaceModus), workCMS.getRightKeyColor(i, analyzeColorspaceModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, true, compareColor, colorspaceContex);
          drawHueLine(workCMS.getRightKeyColor(i, analyzeColorspaceModus), workCMS.getIntervalColor(intervalIndexA[0], analyzeColorspaceModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, false, compareColor, colorspaceContex);
          drawVLine(workCMS.getRightKeyColor(i, analyzeColorspaceModus),
            workCMS.getIntervalColor(intervalIndexA[0], analyzeColorspaceModus),
            workCMS.getRefPosition(i),
            workCMS.getIntervalRef(intervalIndexA[0]),
            workCMS.getRefPosition(0),
            workCMS.getRefRange(),
            vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex);

          for (var j = intervalIndexA[0]; j < intervalIndexA[1]; j++) {
            drawHueLine(workCMS.getIntervalColor(j, analyzeColorspaceModus), workCMS.getIntervalColor(j + 1, analyzeColorspaceModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, false, compareColor, colorspaceContex);
            drawVLine(workCMS.getIntervalColor(j, analyzeColorspaceModus),
              workCMS.getIntervalColor(j + 1, analyzeColorspaceModus),
              workCMS.getIntervalRef(j),
              workCMS.getIntervalRef(j + 1),
              workCMS.getRefPosition(0),
              workCMS.getRefRange(),
              vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex);
          }

          if (workCMS.getIntervalisKey(intervalIndexA[1]) != true) {
            drawHueLine(workCMS.getIntervalColor(intervalIndexA[1], analyzeColorspaceModus), workCMS.getLeftKeyColor(i + 1, analyzeColorspaceModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, false, compareColor, colorspaceContex);
            drawVLine(workCMS.getIntervalColor(intervalIndexA[1], analyzeColorspaceModus),
              workCMS.getLeftKeyColor(i + 1, analyzeColorspaceModus),
              workCMS.getIntervalRef(intervalIndexA[1]),
              workCMS.getRefPosition(i + 1),
              workCMS.getRefPosition(0),
              workCMS.getRefRange(),
              vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex);
          }

          break;
        case "left key":
          drawHueLine(workCMS.getLeftKeyColor(i, analyzeColorspaceModus), workCMS.getLeftKeyColor(i + 1, analyzeColorspaceModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, true, compareColor, colorspaceContex);
          drawVLine(workCMS.getLeftKeyColor(i + 1, analyzeColorspaceModus),
            workCMS.getLeftKeyColor(i + 1, analyzeColorspaceModus),
            workCMS.getRefPosition(i),
            workCMS.getRefPosition(i + 1),
            workCMS.getRefPosition(0),
            workCMS.getRefRange(),
            vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex);
          break;
        default:

          var intervalIndexA = workCMS.getIntervalPositions(i);
          drawHueLine(workCMS.getRightKeyColor(i, analyzeColorspaceModus), workCMS.getIntervalColor(intervalIndexA[0], analyzeColorspaceModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, false, compareColor, colorspaceContex);
          drawVLine(workCMS.getRightKeyColor(i, analyzeColorspaceModus),
            workCMS.getIntervalColor(intervalIndexA[0], analyzeColorspaceModus),
            workCMS.getRefPosition(i),
            workCMS.getIntervalRef(intervalIndexA[0]),
            workCMS.getRefPosition(0),
            workCMS.getRefRange(),
            vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex);

          for (var j = intervalIndexA[0]; j < intervalIndexA[1]; j++) {

            drawHueLine(workCMS.getIntervalColor(j, analyzeColorspaceModus), workCMS.getIntervalColor(j + 1, analyzeColorspaceModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, false, compareColor, colorspaceContex);
            drawVLine(workCMS.getIntervalColor(j, analyzeColorspaceModus),
              workCMS.getIntervalColor(j + 1, analyzeColorspaceModus),
              workCMS.getIntervalRef(j),
              workCMS.getIntervalRef(j + 1),
              workCMS.getRefPosition(0),
              workCMS.getRefRange(),
              vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex);
          }

          if (workCMS.getIntervalisKey(intervalIndexA[1]) != true) {
            drawHueLine(workCMS.getIntervalColor(intervalIndexA[1], analyzeColorspaceModus), workCMS.getLeftKeyColor(i + 1, analyzeColorspaceModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, false, compareColor, colorspaceContex);
            drawVLine(workCMS.getIntervalColor(intervalIndexA[1], analyzeColorspaceModus),
              workCMS.getLeftKeyColor(i + 1, analyzeColorspaceModus),
              workCMS.getIntervalRef(intervalIndexA[1]),
              workCMS.getRefPosition(i + 1),
              workCMS.getRefPosition(0),
              workCMS.getRefRange(),
              vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex);
          }
      }


    }
  }

}

function drawHueElement(tmpColor, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, drawCircle, colorspaceContex, keyIndex, colorSide) {

  switch (analyzeColorspaceModus) {
    case "hsv":
      var tmpDis = tmpColor.getSValue() * colorspaceRadius;
      var tmpRad = (tmpColor.getHValue() * Math.PI * 2) - Math.PI;
      xPos = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
      yPos = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
      break;
    case "lab":
      xPos = ((tmpColor.getAValue() / labSpaceRange) * xWidth / 2) + colorspaceCenterX;
      yPos = ((tmpColor.getBValue() / labSpaceRange) * yHeight / 2) + colorspaceCenterY;
      break;
    case "din99":
      xPos = ((tmpColor.getA99Value() - rangeA99Neg) / rangeA99 * (xEnd - xStart)) + xStart;
      yPos = ((tmpColor.getB99Value() - rangeB99Neg) / rangeB99 * (yEnd - yStart)) + yStart;
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  drawElement(tmpColor.calcRGBColor().getRGBStringAplha(alphaVal), colorspaceContex, xPos, yPos, keyIndex, colorSide, drawCircle);

  spaceElementsXPos.push(xPos);
  spaceElementsYPos.push(yPos);

  if (drawCircle)
    spaceElementsType.push(true);
  else
    spaceElementsType.push(false);

  spaceElementsKey.push(keyIndex);
  spaceElementsColor.push(colorSide); // colorSide 0=left color, 1= right color, 2=both colors

}

function drawVElement(tmpColor, currentRef, startRef, rangeSize, vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex, keyIndex, colorSide) {


  var xVPos = vPlotxStart + ((currentRef - startRef) / rangeSize) * plotwidth;

  var yPos;
  switch (analyzeColorspaceModus) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getVValue()));
      break;
    case "lab":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getLValue() / 100));
      break;
    case "din99":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getL99Value() / 100));
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  drawElement(tmpColor.calcRGBColor().getRGBStringAplha(alphaVal), vPlotContex, xVPos, yPos, keyIndex, colorSide, drawCircle);

}

function drawHueLine(tmpColor, tmpColor2, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, isDashed, isCompareMap, colorspaceContex) {
  // RG

  switch (analyzeColorspaceModus) {
    case "hsv":
      var tmpDis = tmpColor.getSValue() * colorspaceRadius;
      var tmpRad = (tmpColor.getHValue() * Math.PI * 2) - Math.PI;
      xPos = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
      yPos = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;

      var tmpDis2 = tmpColor2.getSValue() * colorspaceRadius;
      var tmpRad2 = (tmpColor2.getHValue() * Math.PI * 2) - Math.PI;
      xPos2 = tmpDis2 * Math.cos(tmpRad2) + colorspaceCenterX;
      yPos2 = tmpDis2 * Math.sin(tmpRad2) + colorspaceCenterY;
      break;
    case "lab":
      xPos = ((tmpColor.getAValue() / labSpaceRange) * xWidth / 2) + colorspaceCenterX;
      yPos = ((tmpColor.getBValue() / labSpaceRange) * yHeight / 2) + colorspaceCenterY;

      xPos2 = ((tmpColor2.getAValue() / labSpaceRange) * xWidth / 2) + colorspaceCenterX;
      yPos2 = ((tmpColor2.getBValue() / labSpaceRange) * yHeight / 2) + colorspaceCenterY;
      break;
    case "din99":
      xPos = ((tmpColor.getA99Value() - rangeA99Neg) / rangeA99 * (xEnd - xStart)) + xStart;
      yPos = ((tmpColor.getB99Value() - rangeB99Neg) / rangeB99 * (yEnd - yStart)) + yStart;

      xPos2 = ((tmpColor2.getA99Value() - rangeA99Neg) / rangeA99 * (xEnd - xStart)) + xStart;
      yPos2 = ((tmpColor2.getB99Value() - rangeB99Neg) / rangeB99 * (yEnd - yStart)) + yStart;

      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  drawLine(colorspaceContex, xPos, yPos, xPos2, yPos2, isDashed, isCompareMap);


  /*if (showSpace == 1) {

    var x1 = tmpColor.getRValue() * 255 - 128;
    var y1 = tmpColor.getGValue() * 255 - 128;
    var z1 = tmpColor.getBValue() * 255 - 128;

    var x2 = tmpColor2.getRValue() * 255 - 128;
    var y2 = tmpColor2.getGValue() * 255 - 128;
    var z2 = tmpColor2.getBValue() * 255 - 128;


    draw3DLine(x1, y1, z1, x2, y2, z2, isDashed, isCompareMap);

  }*/
}

function drawVLine(tmpColor, tmpColor2, ref, ref2, startRef, rangeSize, vPlotxStart, vPlotyStart, heigthVArea, plotwidth, isDashed, isCompareMap, colorspaceContex) {
  var xPos = vPlotxStart + ((ref - startRef) / rangeSize) * plotwidth;
  var xPos2 = vPlotxStart + ((ref2 - startRef) / rangeSize) * plotwidth;

  var yPos, yPos2;
  switch (analyzeColorspaceModus) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getVValue()));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor2.getVValue()));
      break;
    case "lab":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getLValue() / 100));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor2.getLValue() / 100));
      break;
    case "din99":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getL99Value() / 100));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor2.getL99Value() / 100));
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  drawLine(colorspaceContex, xPos, yPos, xPos2, yPos2, isDashed, isCompareMap);
}
