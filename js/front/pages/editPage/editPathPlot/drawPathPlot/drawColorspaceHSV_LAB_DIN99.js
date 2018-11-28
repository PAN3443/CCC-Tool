//////////////////////////////////////////
// -------------HSV LAB DIN99---------------//
//////////////////////////////////////////
function hueInit() {
  var canvasID = "id_EditPage_PathPlot_SingleCanvas_0";

  var canvasColorspace = document.getElementById(canvasID);
  var canvasObjBox = canvasColorspace.getBoundingClientRect();
  canvasColorspace.width = canvasObjBox.width;
  canvasColorspace.height = canvasObjBox.height;

  var colorspaceContex = canvasColorspace.getContext("2d");
  var colorspaceBackgroundData = colorspaceContex.getImageData(0, 0, canvasColorspace.width, canvasColorspace.height);

  var colorspaceCenterX = Math.round(canvasColorspace.width / 2);
  var colorspaceCenterY = Math.round(canvasColorspace.height / 2);
  var colorspaceRadius = Math.round((canvasColorspace.width / 2) * radiusratio);

  var errorRGBColor = new classColor_RGB(0.5, 0.5, 0.5);

  switch (pathColorspace) {
    case "hsv":
      for (var x = 0; x < canvasColorspace.width; x++) {

        for (var y = 0; y < canvasColorspace.height; y++) {

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
                vVal = backgroundValue / 100;
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
            var index = (x + y * canvasColorspace.width) * 4;

            colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
            colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
            colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
            colorspaceBackgroundData.data[index + 3] = 255; //a


          }

        }

      }
      break;
    case "lab":
      var xStart = canvasColorspace.width * 0.1;
      var yStart = canvasColorspace.height * 0.1;
      var xEnd = canvasColorspace.width * 0.9;
      var yEnd = canvasColorspace.height * 0.9;
      var xWidth = canvasColorspace.width * labSpaceRectRange;
      var yHeight = canvasColorspace.height * labSpaceRectRange;

      colorspaceCenterX = Math.round(canvasColorspace.width / 2);
      colorspaceCenterY = Math.round(canvasColorspace.height / 2);

      // draw colorspace
      for (var x = 0; x < canvasColorspace.width; x++) {

        for (var y = 0; y < canvasColorspace.height; y++) {

          if (x >= xStart && x <= xEnd && y >= yStart && y <= yEnd) {
            // calc hsv color
            var colorRGB;

            if (mouseGrappedKeyID == -1) {
              var lVal;


              lVal = backgroundValue;


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

              if (onlyRGBPossibleColor) {
                colorRGB = colorLAB.calcRGBColorCorrect(errorRGBColor);
              } else {
                colorRGB = colorLAB.calcRGBColor();
              }


            } // else


            var index = (x + y * canvasColorspace.width) * 4;

            colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
            colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
            colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
            colorspaceBackgroundData.data[index + 3] = 255; //a
          }
        }

      }
      break;
    case "din99":
      var xStart = canvasColorspace.width * 0.1;
      var yStart = canvasColorspace.height * 0.1;
      var xEnd = canvasColorspace.width * 0.9;
      var yEnd = canvasColorspace.height * 0.9;
      var xWidth = canvasColorspace.width * labSpaceRectRange;
      var yHeight = canvasColorspace.height * labSpaceRectRange;


      rangeA99 = rangeA99Pos - rangeA99Neg;
      rangeB99 = rangeB99Pos - rangeB99Neg;

      colorspaceCenterX = Math.round(canvasColorspace.width / 2);
      colorspaceCenterY = Math.round(canvasColorspace.height / 2);


      // draw colorspace
      for (var x = 0; x < canvasColorspace.width; x++) {

        for (var y = 0; y < canvasColorspace.height; y++) {

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


                l99Val = backgroundValue;


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

              if (onlyRGBPossibleColor) {
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

            var index = (x + y * canvasColorspace.width) * 4;

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

  var canvasVPlot1 = document.getElementById("id_EditPage_PathPlot_Canvas1_0");
  var canvasVPlot2 = document.getElementById("id_EditPage_PathPlot_Canvas2_0");
  var canvasVPlot3 = document.getElementById("id_EditPage_PathPlot_Canvas3_0");

  canvasVPlot1.width = vPlot_bg_resolution_X;
  canvasVPlot1.height = vPlot_bg_resolution_Y;

  canvasVPlot2.width = vPlot_bg_resolution_X;
  canvasVPlot2.height = vPlot_bg_resolution_Y;

  canvasVPlot3.width = vPlot_bg_resolution_X;
  canvasVPlot3.height = vPlot_bg_resolution_Y;

  //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
  var vPlotContex1 = canvasVPlot1.getContext("2d");
  var vPlotContex2 = canvasVPlot2.getContext("2d");
  var vPlotContex3 = canvasVPlot3.getContext("2d");

  var yStart = Math.round(vPlot_bg_resolution_Y * 0.9);
  var yEnd = Math.round(vPlot_bg_resolution_Y * 0.1);
  var yEndLine = Math.round(vPlot_bg_resolution_Y * 0.05);
  var yEndArrow = 0;
  var arrowHeight = Math.round(yEndLine - yEndArrow);
  var labelFontSize = arrowHeight * 0.75;
  var labelFontSizeSmall = arrowHeight * 0.5;
  var xStart = Math.round(vPlot_bg_resolution_X * 0.1);
  var xEnd = Math.round(vPlot_bg_resolution_X * 0.85);
  var xEndArrow = Math.round(vPlot_bg_resolution_X * 0.9);
  var xEndLine = xEndArrow - arrowHeight;

  var lineColor = 'rgb(200,200,200)';
  var arrowFontColor = 'rgb(90,90,90)';

  vPlotContex1.fillStyle = arrowFontColor;
  vPlotContex2.fillStyle = arrowFontColor;
  vPlotContex3.fillStyle = arrowFontColor;
  /////////////////////////////////////////////////////////////////
  // init vars for V-Value Overview
  var widthVArea = 0;
  var widthVArea2 = 0;

  var tmpCounter = 0;
  var leftCounter = 0;

  var xPosPos;
  var plotwidth = xEnd - xStart;

  widthVArea = globalCMS1.getRefRange();

  /*if (showSideID == 3) {
    widthVArea2 = globalCMS2.getRefRange();

    for (var i = 0; i < globalCMS2.getKeyLength(); i++) {

      xPosPos = xStart + ((globalCMS2.getRefPosition(i) - globalCMS2.getRefPosition(0)) / widthVArea2) * plotwidth;

      vPlotContex1.beginPath();
      vPlotContex1.lineWidth = Math.round(lineWidthVPlot / 2);
      vPlotContex1.moveTo(xPosPos, yStart);
      vPlotContex1.lineTo(xPosPos, vPlot_bg_resolution_Y * 0.93);
      vPlotContex1.strokeStyle = "rgb(200,200,200)";
      vPlotContex1.stroke();
      vPlotContex1.strokeStyle = "rgb(200,200,200)";
      var text = "" + (i + 1);
      vPlotContex1.font = labelFontSizeSmall + "px Arial";
      vPlotContex1.fillText(text, xPosPos, vPlot_bg_resolution_Y * 0.96 + labelFontSizeSmall);

      vPlotContex2.beginPath();
      vPlotContex2.lineWidth = Math.round(lineWidthVPlot / 2);
      vPlotContex2.moveTo(xPosPos, yStart);
      vPlotContex2.lineTo(xPosPos, vPlot_bg_resolution_Y * 0.93);
      vPlotContex2.strokeStyle = "rgb(200,200,200)";
      vPlotContex2.stroke();
      vPlotContex2.strokeStyle = "rgb(200,200,200)";
      vPlotContex2.font = labelFontSizeSmall + "px Arial";
      vPlotContex2.fillText(text, xPosPos, vPlot_bg_resolution_Y * 0.96 + labelFontSizeSmall);

      vPlotContex3.beginPath();
      vPlotContex3.lineWidth = Math.round(lineWidthVPlot / 2);
      vPlotContex3.moveTo(xPosPos, yStart);
      vPlotContex3.lineTo(xPosPos, vPlot_bg_resolution_Y * 0.93);
      vPlotContex3.strokeStyle = "rgb(200,200,200)";
      vPlotContex3.stroke();
      vPlotContex3.strokeStyle = "rgb(200,200,200)";
      vPlotContex3.font = labelFontSizeSmall + "px Arial";
      vPlotContex3.fillText(text, xPosPos, vPlot_bg_resolution_Y * 0.96 + labelFontSizeSmall);

    }
  }*/


  for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

    xPosPos = xStart + ((globalCMS1.getRefPosition(i) - globalCMS1.getRefPosition(0)) / widthVArea) * plotwidth;

    vPlotContex1.beginPath();
    vPlotContex1.lineWidth = Math.round(lineWidthVPlot / 2);
    vPlotContex1.moveTo(xPosPos, yStart);
    vPlotContex1.lineTo(xPosPos, vPlot_bg_resolution_Y * 0.93);
    vPlotContex1.strokeStyle = lineColor;
    vPlotContex1.stroke();
    vPlotContex1.strokeStyle = arrowFontColor;
    var text = "" + (i + 1);
    vPlotContex1.font = labelFontSizeSmall + "px Arial";
    vPlotContex1.fillText(text, xPosPos, vPlot_bg_resolution_Y * 0.93 + labelFontSizeSmall);

    vPlotContex2.beginPath();
    vPlotContex2.lineWidth = Math.round(lineWidthVPlot / 2);
    vPlotContex2.moveTo(xPosPos, yStart);
    vPlotContex2.lineTo(xPosPos, vPlot_bg_resolution_Y * 0.93);
    vPlotContex2.strokeStyle = lineColor;
    vPlotContex2.stroke();
    vPlotContex2.strokeStyle = arrowFontColor;
    vPlotContex2.font = labelFontSizeSmall + "px Arial";
    vPlotContex2.fillText(text, xPosPos, vPlot_bg_resolution_Y * 0.93 + labelFontSizeSmall);

    vPlotContex3.beginPath();
    vPlotContex3.lineWidth = Math.round(lineWidthVPlot / 2);
    vPlotContex3.moveTo(xPosPos, yStart);
    vPlotContex3.lineTo(xPosPos, vPlot_bg_resolution_Y * 0.93);
    vPlotContex3.strokeStyle = lineColor;
    vPlotContex3.stroke();
    vPlotContex3.strokeStyle = arrowFontColor;
    vPlotContex3.font = labelFontSizeSmall + "px Arial";
    vPlotContex3.fillText(text, xPosPos, vPlot_bg_resolution_Y * 0.93 + labelFontSizeSmall);

  }

  xPosPos = Math.round(vPlot_bg_resolution_X * 0.09);
  var yPos = yStart;
  vPlotContex1.font = labelFontSizeSmall + "px Arial";
  vPlotContex2.font = labelFontSizeSmall + "px Arial";
  vPlotContex3.font = labelFontSizeSmall + "px Arial";

  var steps = 10;

  var startValue1=0;
  var endValue1=1.0;

  var startValue2=0;
  var endValue2=1.0;

  var startValue3=0;
  var endValue3=1.0;

  switch (pathColorspace) {
    case "hsv":
      break;
    case "lab":
      startValue2=labSpaceRange*-1;
      endValue2=labSpaceRange;
      startValue3=labSpaceRange*-1;
      endValue3=labSpaceRange;
      break;
    case "din99":
      startValue2=rangeA99Neg;
      endValue2=rangeA99Pos;
      startValue3=rangeB99Neg;
      endValue3=rangeB99Pos;


      yPos = yStart - (yStart - yEnd) * (rangeA99Neg*-1)/(rangeA99Pos-rangeA99Neg);
      vPlotContex2.beginPath();
      vPlotContex2.lineWidth = 2;
      vPlotContex2.moveTo(xPosPos, yPos);
      vPlotContex2.lineTo(xEnd, yPos);
      vPlotContex2.strokeStyle = lineColor;
      vPlotContex2.stroke();
      vPlotContex2.strokeStyle = arrowFontColor;
      //vPlotContex2.fillText("0", xPosPos * 0.75, yPos);

      yyPos = yStart - (yStart - yEnd) * (rangeA99Neg*-1)/(rangeB99Pos-rangeB99Neg);
      vPlotContex3.beginPath();
      vPlotContex3.lineWidth = 2;
      vPlotContex3.moveTo(xPosPos, yPos);
      vPlotContex3.lineTo(xEnd, yPos);
      vPlotContex3.strokeStyle = lineColor;
      vPlotContex3.stroke();
      vPlotContex3.strokeStyle = arrowFontColor;
      //vPlotContex3.fillText("0", xPosPos * 0.75, yPos);

      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }


  for (var i = 0; i <= steps; i++) {
    yPos = yStart - (yStart - yEnd) * i/steps;
    var tmpVal = (startValue1+(endValue1-startValue1)*i/steps);
    var text = ""+tmpVal.toFixed(2);
    vPlotContex1.beginPath();
    vPlotContex1.lineWidth = 1;
    vPlotContex1.moveTo(xPosPos, yPos);
    vPlotContex1.lineTo(xEnd, yPos);
    vPlotContex1.strokeStyle = lineColor;
    vPlotContex1.stroke();
    vPlotContex1.strokeStyle = arrowFontColor;
    vPlotContex1.fillText(text, xPosPos * 0.75, yPos);

    yPos = yStart - (yStart - yEnd) * i/steps;
    var tmpVal =(startValue2+(endValue2-startValue2)*i/steps);
    var text = ""+tmpVal.toFixed(2);
    vPlotContex2.beginPath();
    vPlotContex2.lineWidth = 1;
    vPlotContex2.moveTo(xPosPos, yPos);
    vPlotContex2.lineTo(xEnd, yPos);
    vPlotContex2.strokeStyle = lineColor;
    vPlotContex2.stroke();
    vPlotContex2.strokeStyle = arrowFontColor;
    vPlotContex2.fillText(text, xPosPos * 0.75, yPos);

    yPos = yStart - (yStart - yEnd) * i/steps;
    var tmpVal =(startValue3+(endValue3-startValue3)*i/steps);
    var text = ""+tmpVal.toFixed(2);
    vPlotContex3.beginPath();
    vPlotContex3.lineWidth = 1;
    vPlotContex3.moveTo(xPosPos, yPos);
    vPlotContex3.lineTo(xEnd, yPos);
    vPlotContex3.strokeStyle = lineColor;
    vPlotContex3.stroke();
    vPlotContex3.strokeStyle = arrowFontColor;
    vPlotContex3.fillText(text, xPosPos * 0.75, yPos);
  }


  ////////////////////////////////////////////////////////////
  /////////////ARROWS////////////////////
  ////////////////////////////////////////////////////////////

  // the fill color
  vPlotContex2.fill();

  vPlotContex1.strokeStyle = arrowFontColor;
  vPlotContex1.beginPath();
  vPlotContex1.lineWidth = lineWidthVPlot;
  vPlotContex1.moveTo(xStart, yStart);
  vPlotContex1.lineTo(xEndLine, yStart);
  vPlotContex1.stroke();

  // the triangle
  vPlotContex1.beginPath();
  vPlotContex1.moveTo(xEndLine, yStart - (arrowHeight/2));
  vPlotContex1.lineTo(xEndArrow, yStart);
  vPlotContex1.lineTo(xEndLine, yStart + (arrowHeight/2));
  vPlotContex1.closePath();

  // the fill color
  vPlotContex1.fillStyle = arrowFontColor;
  vPlotContex1.fill();

  vPlotContex1.beginPath();
  vPlotContex1.lineWidth = lineWidthVPlot;
  vPlotContex1.moveTo(xStart, yStart);
  vPlotContex1.lineTo(xStart, yEndLine);
  vPlotContex1.stroke();

  // the triangle
  vPlotContex1.beginPath();
  vPlotContex1.moveTo(xStart - (arrowHeight/2), yEndLine);
  vPlotContex1.lineTo(xStart, yEndArrow);
  vPlotContex1.lineTo(xStart + (arrowHeight/2), yEndLine);
  vPlotContex1.closePath();

  // the fill color
  vPlotContex1.fill();

  vPlotContex2.strokeStyle = arrowFontColor;
  vPlotContex2.beginPath();
  vPlotContex2.lineWidth = lineWidthVPlot;
  vPlotContex2.moveTo(xStart, yStart);
  vPlotContex2.lineTo(xEndLine, yStart);
  vPlotContex2.stroke();

  // the triangle
  vPlotContex2.beginPath();
  vPlotContex2.moveTo(xEndLine, yStart - (arrowHeight/2));
  vPlotContex2.lineTo(xEndArrow, yStart);
  vPlotContex2.lineTo(xEndLine, yStart + (arrowHeight/2));
  vPlotContex2.closePath();

  // the fill color
  vPlotContex2.fillStyle = arrowFontColor;
  vPlotContex2.fill();

  vPlotContex2.beginPath();
  vPlotContex2.lineWidth = lineWidthVPlot;
  vPlotContex2.moveTo(xStart, yStart);
  vPlotContex2.lineTo(xStart, yEndLine);
  vPlotContex2.stroke();

  // the triangle
  vPlotContex2.beginPath();
  vPlotContex2.moveTo(xStart - (arrowHeight/2), yEndLine);
  vPlotContex2.lineTo(xStart, yEndArrow);
  vPlotContex2.lineTo(xStart + (arrowHeight/2), yEndLine);
  vPlotContex2.closePath();

  // the fill color
  vPlotContex2.fill();

  vPlotContex3.strokeStyle = arrowFontColor;
  vPlotContex3.beginPath();
  vPlotContex3.lineWidth = lineWidthVPlot;
  vPlotContex3.moveTo(xStart, yStart);
  vPlotContex3.lineTo(xEndLine, yStart);
  vPlotContex3.stroke();

  // the triangle
  vPlotContex3.beginPath();
  vPlotContex3.moveTo(xEndLine, yStart - (arrowHeight/2));
  vPlotContex3.lineTo(xEndArrow, yStart);
  vPlotContex3.lineTo(xEndLine, yStart + (arrowHeight/2));
  vPlotContex3.closePath();

  // the fill color
  vPlotContex3.fillStyle = arrowFontColor;
  vPlotContex3.fill();

  vPlotContex3.beginPath();
  vPlotContex3.lineWidth = lineWidthVPlot;
  vPlotContex3.moveTo(xStart, yStart);
  vPlotContex3.lineTo(xStart, yEndLine);
  vPlotContex3.stroke();

  // the triangle
  vPlotContex3.beginPath();
  vPlotContex3.moveTo(xStart - (arrowHeight/2), yEndLine);
  vPlotContex3.lineTo(xStart, yEndArrow);
  vPlotContex3.lineTo(xStart + (arrowHeight/2), yEndLine);
  vPlotContex3.closePath();

  // the fill color
  vPlotContex3.fill();

  ////////////////// TEXT /////////////////////
  vPlotContex1.font = labelFontSize + "px Arial";
  vPlotContex1.fillText("Key Position", xEndArrow, yStart + labelFontSize);

  vPlotContex2.font = labelFontSize + "px Arial";
  vPlotContex2.fillText("Key Position", xEndArrow, yStart + labelFontSize);

  vPlotContex3.font = labelFontSize + "px Arial";
  vPlotContex3.fillText("Key Position", xEndArrow, yStart + labelFontSize);


  /*switch (pathColorspace) {
    case "hsv":
      vPlotContex1.fillText("Value", xStart - labelFontSize, yEndArrow);
      vPlotContex2.fillText("Hue", xStart - labelFontSize, yEndArrow);
      vPlotContex3.fillText("Saturation", xStart - labelFontSize, yEndArrow);
      break;
    case "lab":
      vPlotContex1.fillText("Lightness", xStart - labelFontSize, yEndArrow);
      vPlotContex2.fillText("A (Green-Red)", xStart - labelFontSize, yEndArrow);
      vPlotContex3.fillText("B (Yellow-Blue)", xStart - labelFontSize, yEndArrow);
      break;
    case "din99":
      vPlotContex1.fillText("Lightness 99", xStart - labelFontSize, yEndArrow);
      vPlotContex2.fillText("A99 (Green-Red)", xStart - labelFontSize, yEndArrow);
      vPlotContex3.fillText("B99 (Yellow-Blue)", xStart - labelFontSize, yEndArrow);
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }*/

}

function drawcolormap_hueSpace(calcBackground, drawInterpolationLine, doInitVplot) {

  if (doInitVplot)
    init_VPlot();

  if (calcBackground)
    hueInit();

  drawElements_HSV_LAB_DIN99(false);

  if (drawInterpolationLine)
    drawInterpolationLineHSV_LAB_DIN99(false);

}


function drawElements_HSV_LAB_DIN99(isCompareMap) {

  var canvasColorspace = document.getElementById("id_EditPage_PathPlot_SingleCanvas_2");

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

  var canvasVPlot1 = document.getElementById("id_EditPage_PathPlot_Canvas1_2");
  var canvasVPlot2 = document.getElementById("id_EditPage_PathPlot_Canvas2_2");
  var canvasVPlot3 = document.getElementById("id_EditPage_PathPlot_Canvas3_2");

  canvasVPlot1.width = vPlot_resolution_X;
  canvasVPlot1.height = vPlot_resolution_Y;

  canvasVPlot2.width = vPlot_resolution_X;
  canvasVPlot2.height = vPlot_resolution_Y;

  canvasVPlot3.width = vPlot_resolution_X;
  canvasVPlot3.height = vPlot_resolution_Y;

  var vPlotContex1 = canvasVPlot1.getContext("2d");
  var vPlotContex2 = canvasVPlot2.getContext("2d");
  var vPlotContex3 = canvasVPlot3.getContext("2d");

  var vPlotyStart = Math.round(vPlot_resolution_Y * 0.9);
  var vPlotyEnd = Math.round(vPlot_resolution_Y * 0.1);
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
    globalCMS2.calcDeltaIntervalColors(intervalDelta, 0,globalCMS2.getKeyLength()-1);
  }

  var csModus=pathColorspace;
  if((pathColorspace=="lab" || pathColorspace=="din99") && onlyRGBPossibleColor){
    if(pathColorspace=="lab")
    csModus = "lab_rgb_possible";
    if(pathColorspace=="din99")
    csModus = "din99_rgb_possible";
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
      return;
    }

    for (var i = 0; i < workCMS.getKeyLength(); i++) {

      switch (workCMS.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

            tmpColor = workCMS.getLeftKeyColor(i, csModus);


          var drawCircle = true;

          if (workCMS.getKeyType(i - 1) === "nil key" || workCMS.getKeyType(i - 1) === "left key")
            drawCircle = false;

          ////////////////////////////////////////////////////////////////
          /////// left Color

          drawHueElement(tmpColor, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, drawCircle, colorspaceContex, i, 0);

          ////////////////////////////////////////////////////////////////
          /////// Right Color

          var tmpColor2 = workCMS.getRightKeyColor(i, csModus);

          drawHueElement(tmpColor2, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, true, colorspaceContex, i, 1);


          ////////////////////////////////////////////////////////////////
          /////// V Plot

          if (drawCircle) {
            drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex1,vPlotContex2,vPlotContex3, i, 0);
            drawVElement(tmpColor2, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex1,vPlotContex2,vPlotContex3, i, 1);
          } else {

            drawVElement(tmpColor, workCMS.getRefPosition(i - 1), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex1,vPlotContex2,vPlotContex3, i, 0);
            drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex1,vPlotContex2,vPlotContex3, i, 0);
            drawVElement(tmpColor2, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex1,vPlotContex2,vPlotContex3, i, 1);

          }

          break;
        case "left key":

          var drawCircle = true;
          if (workCMS.getKeyType(i - 1) === "nil key" || workCMS.getKeyType(i - 1) === "left key")
            drawCircle = false;

          ////////////////////////////////////////////////////////////////
          /////// left Color

            tmpColor = workCMS.getLeftKeyColor(i, csModus);

          drawHueElement(tmpColor, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, drawCircle, colorspaceContex, i, 0);

          ////////////////////////////////////////////////////////
          ///// Right Color

          // do nothing

          ////////////////////////////////////////////////////////////////
          /////// V Plot

          if (drawCircle) {
            drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex1,vPlotContex2,vPlotContex3, i, 0);
          } else {
            drawVElement(tmpColor, workCMS.getRefPosition(i - 1), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex1,vPlotContex2,vPlotContex3, i, 0);
            drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex1,vPlotContex2,vPlotContex3, i, 0);
          }
          break;

        case "right key":

            tmpColor = workCMS.getRightKeyColor(i, csModus);

          drawHueElement(tmpColor, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, true, colorspaceContex, i, 1);

          ////////////////////////////////////////////////////////////////
          /////// V Plot

          drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex1,vPlotContex2,vPlotContex3, i, 1);

          break;
        default:
          // dual Key

          tmpColor = workCMS.getRightKeyColor(i, csModus);

          drawHueElement(tmpColor, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, true, colorspaceContex, i, 2);

          ////////////////////////////////////////////////////////////////
          /////// V Plot

          drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex1,vPlotContex2,vPlotContex3, i, 2);


          if(workCMS.getKeyType(i-1)==="left key"){
            drawVElement(tmpColor, workCMS.getRefPosition(i - 1), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex1,vPlotContex2,vPlotContex3, i, 2);
          }
      }

    }

  }


}


function drawInterpolationLineHSV_LAB_DIN99(isCompareMap) {


  var canvasColorspace = document.getElementById("id_EditPage_PathPlot_SingleCanvas_1");

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


  var canvasVPlot1 = document.getElementById("id_EditPage_PathPlot_Canvas1_1");
  var canvasVPlot2 = document.getElementById("id_EditPage_PathPlot_Canvas2_1");
  var canvasVPlot3 = document.getElementById("id_EditPage_PathPlot_Canvas3_1");

  canvasVPlot1.width = vPlot_resolution_X;
  canvasVPlot1.height = vPlot_resolution_Y;

  canvasVPlot2.width = vPlot_resolution_X;
  canvasVPlot2.height = vPlot_resolution_Y;

  canvasVPlot3.width = vPlot_resolution_X;
  canvasVPlot3.height = vPlot_resolution_Y;

  var vPlotContex1 = canvasVPlot1.getContext("2d");
  var vPlotContex2 = canvasVPlot2.getContext("2d");
  var vPlotContex3 = canvasVPlot3.getContext("2d");

  var vPlotyStart = Math.round(vPlot_resolution_Y * 0.9);
  var vPlotyEnd = Math.round(vPlot_resolution_Y * 0.1);
  var vPlotxStart = Math.round(vPlot_resolution_X * 0.1);
  var vPlotxEnd = Math.round(vPlot_resolution_X * 0.85);
  var heigthVArea = vPlotyStart - vPlotyEnd;
  var plotwidth = vPlotxEnd - vPlotxStart;

  globalCMS1.calcDeltaIntervalColors(intervalDelta, 0,globalCMS1.getKeyLength()-1);


  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;

  var border = 1;

  if (isCompareMap) {
    border = 2;

    globalCMS1.calcDeltaIntervalColors(intervalDelta, 0,globalCMS1.getKeyLength()-1);
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
      return;
    }

    var csModus=pathColorspace;
    if((pathColorspace=="lab" || pathColorspace=="din99") && onlyRGBPossibleColor){
      if(pathColorspace=="lab")
      csModus = "lab_rgb_possible";
      if(pathColorspace=="din99")
      csModus = "din99_rgb_possible";
    }


    for (var i = 0; i < workCMS.getKeyLength() - 1; i++) {

      switch (workCMS.getKeyType(i)) {
        case "nil key":
          //drawHueLine(workCMS.getLeftKeyColor(i,pathColorspace),workCMS.getLeftKeyColor(i+1,pathColorspace),xWidth,yHeight,xStart,yStart,xEnd,yEnd,colorspaceRadius, colorspaceCenterY, colorspaceCenterX, isDashed,compareColor,colorspaceContex);
          drawVLine(workCMS.getLeftKeyColor(i + 1, csModus),
            workCMS.getLeftKeyColor(i + 1, csModus),
            workCMS.getRefPosition(i),
            workCMS.getRefPosition(i + 1),
            workCMS.getRefPosition(0),
            workCMS.getRefRange(),
            vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex1,vPlotContex2,vPlotContex3);
          break;
        case "twin key":
          var intervalIndexA = workCMS.getIntervalPositions(i);
          drawHueLine(workCMS.getLeftKeyColor(i, pathColorspace), workCMS.getRightKeyColor(i, csModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, true, compareColor, colorspaceContex);

            for (var j = intervalIndexA[0]; j < intervalIndexA[1]; j++) {
              drawHueLine(workCMS.getIntervalColor(j, csModus), workCMS.getIntervalColor(j + 1, csModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, false, compareColor, colorspaceContex);
              drawVLine(workCMS.getIntervalColor(j, csModus),
                workCMS.getIntervalColor(j + 1, csModus),
                workCMS.getIntervalRef(j),
                workCMS.getIntervalRef(j + 1),
                workCMS.getRefPosition(0),
                workCMS.getRefRange(),
                vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex1,vPlotContex2,vPlotContex3);
            }
          break;
        case "left key":
          drawHueLine(workCMS.getLeftKeyColor(i, csModus), workCMS.getLeftKeyColor(i + 1, csModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, true, compareColor, colorspaceContex);
          drawVLine(workCMS.getLeftKeyColor(i + 1, csModus),
            workCMS.getLeftKeyColor(i + 1, csModus),
            workCMS.getRefPosition(i),
            workCMS.getRefPosition(i + 1),
            workCMS.getRefPosition(0),
            workCMS.getRefRange(),
            vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex1,vPlotContex2,vPlotContex3);
          break;
        default:

          var intervalIndexA = workCMS.getIntervalPositions(i);

          if(workCMS.getKeyType(i)=="dual key"){
            // we do not save the interval colors for dual key double -> it is easier for the analyze algorithm
            drawHueLine(workCMS.getLeftKeyColor(i,csModus), workCMS.getIntervalColor(intervalIndexA[0],csModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, false, compareColor, colorspaceContex);
            drawVLine(workCMS.getLeftKeyColor(i,csModus),
              workCMS.getIntervalColor(intervalIndexA[0],csModus),
              workCMS.getRefPosition(i),
              workCMS.getIntervalRef(intervalIndexA[0]),
              workCMS.getRefPosition(0),
              workCMS.getRefRange(),
              vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex1,vPlotContex2,vPlotContex3);
          }

            for (var j = intervalIndexA[0]; j < intervalIndexA[1]; j++) {
              drawHueLine(workCMS.getIntervalColor(j, csModus), workCMS.getIntervalColor(j + 1, csModus), xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, false, compareColor, colorspaceContex);
              drawVLine(workCMS.getIntervalColor(j, csModus),
                workCMS.getIntervalColor(j + 1, csModus),
                workCMS.getIntervalRef(j),
                workCMS.getIntervalRef(j + 1),
                workCMS.getRefPosition(0),
                workCMS.getRefRange(),
                vPlotxStart, vPlotyStart, heigthVArea, plotwidth, false, compareColor, vPlotContex1,vPlotContex2,vPlotContex3);
            }

      }


    }
  }

}

function drawHueElement(tmpColor, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, drawCircle, colorspaceContex, keyIndex, colorSide) {

  switch (pathColorspace) {
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

  drawElement(tmpColor.calcRGBColor().getRGBString(), colorspaceContex, xPos, yPos, keyIndex, colorSide, drawCircle);

  spaceElementsXPos.push(xPos);
  spaceElementsYPos.push(yPos);

  if (drawCircle)
    spaceElementsType.push(true);
  else
    spaceElementsType.push(false);

  spaceElementsKey.push(keyIndex);
  spaceElementsColor.push(colorSide); // colorSide 0=left color, 1= right color, 2=both colors

}

function drawVElement(tmpColor, currentRef, startRef, rangeSize, vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex1,vPlotContex2,vPlotContex3, keyIndex, colorSide) {


  var xVPos = vPlotxStart + ((currentRef - startRef) / rangeSize) * plotwidth;

  var yPos;
  switch (pathColorspace) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getHValue()));
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

  drawElement(tmpColor.calcRGBColor().getRGBString(), vPlotContex1, xVPos, yPos, keyIndex, colorSide, drawCircle);

  switch (pathColorspace) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getSValue()));
      break;
    case "lab":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getAValue()+labSpaceRange) / (labSpaceRange*2)));
      break;
    case "din99":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getA99Value()+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  drawElement(tmpColor.calcRGBColor().getRGBString(), vPlotContex2, xVPos, yPos, keyIndex, colorSide, drawCircle);

  switch (pathColorspace) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getVValue()));
      break;
    case "lab":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getBValue()+labSpaceRange) / (labSpaceRange*2)));
      break;
    case "din99":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  drawElement(tmpColor.calcRGBColor().getRGBString(), vPlotContex3, xVPos, yPos, keyIndex, colorSide, drawCircle);


}

function drawHueLine(tmpColor, tmpColor2, xWidth, yHeight, xStart, yStart, xEnd, yEnd, colorspaceRadius, colorspaceCenterY, colorspaceCenterX, isDashed, isCompareMap, colorspaceContex) {
  // RG

  switch (pathColorspace) {
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



}

function drawVLine(tmpColor, tmpColor2, ref, ref2, startRef, rangeSize, vPlotxStart, vPlotyStart, heigthVArea, plotwidth, isDashed, isCompareMap, vPlotContex1,vPlotContex2,vPlotContex3) {
  var xPos = vPlotxStart + ((ref - startRef) / rangeSize) * plotwidth;
  var xPos2 = vPlotxStart + ((ref2 - startRef) / rangeSize) * plotwidth;

  var yPos, yPos2;
  switch (pathColorspace) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getHValue()));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor2.getHValue()));
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

  drawLine(vPlotContex1, xPos, yPos, xPos2, yPos2, isDashed, isCompareMap);

  switch (pathColorspace) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getSValue()));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor2.getSValue()));
      break;
    case "lab":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getAValue()+labSpaceRange) / (labSpaceRange*2)));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * (tmpColor2.getAValue()+labSpaceRange) / (labSpaceRange*2)));
      break;
    case "din99":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getA99Value()+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * (tmpColor2.getA99Value()+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  drawLine(vPlotContex2, xPos, yPos, xPos2, yPos2, isDashed, isCompareMap);

  switch (pathColorspace) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getVValue()));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor2.getVValue()));
      break;
    case "lab":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getBValue()+labSpaceRange) / (labSpaceRange*2)));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * (tmpColor2.getBValue()+labSpaceRange) / (labSpaceRange*2)));
      break;
    case "din99":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * (tmpColor2.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  drawLine(vPlotContex3, xPos, yPos, xPos2, yPos2, isDashed, isCompareMap);
}
