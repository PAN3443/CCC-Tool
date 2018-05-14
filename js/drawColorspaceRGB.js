function rgbInit() {

  var canvasIDRG, canvasIDRB, canvasIDBG;
  switch (showSideID) {
    case 1:
      canvasIDRG="id_canvasRGModiyBackground";
      canvasIDRB="id_canvasRBModiyBackground";
      canvasIDBG="id_canvasBGModiyBackground";
      break;
    case 2:
    canvasIDRG="id_canvasRGAnalyzeBackground";
    canvasIDRB="id_canvasRBAnalyzeBackground";
    canvasIDBG="id_canvasBGAnalyzeBackground";
      break;
    case 3:
    canvasIDRG="id_canvasRGCompareBackground";
    canvasIDRB="id_canvasRBCompareBackground";
    canvasIDBG="id_canvasBGCompareBackground";
      break;
    default:

  }

  var canvasColorspaceRG = document.getElementById(canvasIDRG);
  canvasColorspaceRG.width = hue_bg_resolution_X;
  canvasColorspaceRG.height = hue_bg_resolution_Y;
  var colorspaceContexRG = canvasColorspaceRG.getContext("2d");

  var canvasColorspaceRB = document.getElementById(canvasIDRB);
  canvasColorspaceRB.width = hue_bg_resolution_X;
  canvasColorspaceRB.height = hue_bg_resolution_Y;
  var colorspaceContexRB = canvasColorspaceRB.getContext("2d");

  var canvasColorspaceBG = document.getElementById(canvasIDBG);
  canvasColorspaceBG.width = hue_bg_resolution_X;
  canvasColorspaceBG.height = hue_bg_resolution_Y;
  var colorspaceContexBG = canvasColorspaceBG.getContext("2d");

  var colorspaceBackgroundDataRG = colorspaceContexRG.getImageData(0, 0, canvasColorspaceRG.width, canvasColorspaceRG.height);
  var colorspaceBackgroundDataRB = colorspaceContexRB.getImageData(0, 0, canvasColorspaceRB.width, canvasColorspaceRB.height);
  var colorspaceBackgroundDataBG = colorspaceContexBG.getImageData(0, 0, canvasColorspaceBG.width, canvasColorspaceBG.height);



    var xStart = hue_bg_resolution_X * 0.1;
    var yStart = hue_bg_resolution_Y * 0.9;
    var xEnd = hue_bg_resolution_X * 0.8;
    var yEnd = hue_bg_resolution_Y * 0.2;
    var xWidth = xEnd - xStart;
    var yHeight = yStart - yEnd;

    //RG
    for (var x = 0; x < hue_bg_resolution_X; x++) {

      for (var y = 0; y < hue_bg_resolution_Y; y++) {

        if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
          // calc hsv color
          var colorRGB;

          var r = (x - xStart) / xWidth;
          var g = (yStart - y) / yHeight;

          if (mouseGrappedKeyID == -1) {
            colorRGB = new classColor_RGB(r, g, 255);
          } else {
            var b;

            switch (mouseGrappedColorSide) {
              case 0:
              // left color
                b = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "rgb").getBValue();
                break;
              default:
                // both colors
                b = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "rgb").getBValue();
            }

            colorRGB = new classColor_RGB(r, g, b);
          }

          var index = (x + y * hue_bg_resolution_X) * 4;

          colorspaceBackgroundDataRG.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
          colorspaceBackgroundDataRG.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
          colorspaceBackgroundDataRG.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
          colorspaceBackgroundDataRG.data[index + 3] = 255; //a
        }
      }

    }

    //RB

    for (var x = 0; x < hue_bg_resolution_X; x++) {

      for (var y = 0; y < hue_bg_resolution_Y; y++) {

        if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
          // calc hsv color
          var colorRGB;

          var r = (x - xStart) / xWidth;
          var b = (yStart - y) / yHeight;

          if (mouseGrappedKeyID == -1) {
            colorRGB = new classColor_RGB(r, 255, b);
          } else {
            var g;

            switch (mouseGrappedColorSide) {
              case 0:
              // left color
                g = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "rgb").getGValue();
                break;
              default:
                // both colors
                g = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "rgb").getGValue();
            }

            colorRGB = new classColor_RGB(r, g, b);
          }


          var index = (x + y * hue_bg_resolution_X) * 4;

          colorspaceBackgroundDataRB.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
          colorspaceBackgroundDataRB.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
          colorspaceBackgroundDataRB.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
          colorspaceBackgroundDataRB.data[index + 3] = 255; //a
        }
      }

    }

    //BG

    for (var x = 0; x < hue_bg_resolution_X; x++) {

      for (var y = 0; y < hue_bg_resolution_Y; y++) {

        if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
          // calc hsv color
          var colorRGB;

          var b = (x - xStart) / xWidth;
          var g = (yStart - y) / yHeight;

          if (mouseGrappedKeyID == -1) {
            colorRGB = new classColor_RGB(255, g, b);
          } else {
            var r;

            switch (mouseGrappedColorSide) {
              case 0:
              // left color
                r = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "rgb").getRValue();
                break;
              default:
                // both colors
                r = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "rgb").getRValue();
            }

            colorRGB = new classColor_RGB(r, g, b);
          }


          var index = (x + y * hue_bg_resolution_X) * 4;

          colorspaceBackgroundDataBG.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
          colorspaceBackgroundDataBG.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
          colorspaceBackgroundDataBG.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
          colorspaceBackgroundDataBG.data[index + 3] = 255; //a
        }
      }

    }

  colorspaceContexRG.putImageData(colorspaceBackgroundDataRG, 0, 0); // update ColorspaceCanvas;
  colorspaceContexRB.putImageData(colorspaceBackgroundDataRB, 0, 0); // update ColorspaceCanvas;
  colorspaceContexBG.putImageData(colorspaceBackgroundDataBG, 0, 0); // update ColorspaceCanvas;

  rgbPlot(colorspaceContexRG, canvasColorspaceRG.width, canvasColorspaceRG.height, "R", "G");
  rgbPlot(colorspaceContexRB, canvasColorspaceRB.width, canvasColorspaceRB.height, "R", "B");
  rgbPlot(colorspaceContexBG, canvasColorspaceBG.width, canvasColorspaceBG.height, "B", "G");
}

function rgbPlot(context, canvasWidth, canvasHidth, xlabel, ylabel) {

  var yStart = Math.round(canvasHidth * 0.9);
  var yEnd = Math.round(canvasHidth * 0.2);
  var yEndLine = Math.round(canvasHidth * 0.15);
  var yEndArrow = Math.round(canvasHidth * 0.1);
  var arrowHeight = Math.round((yEndLine - yEndArrow) * 0.75);
  var labelFontSize = arrowHeight * 0.85;
  var labelFontSizeSmall = arrowHeight * 0.75;
  var xStart = Math.round(canvasWidth * 0.1);
  var xEnd = Math.round(canvasWidth * 0.8);
  var xEndLine = Math.round(canvasWidth * 0.85);
  var xEndArrow = Math.round(canvasWidth * 0.9);


  var lineColor = 'rgb(200,200,200)';
  var arrowFontColor = 'rgb(90,90,90)';

  plotXStart = xStart;
  heigthVArea = yStart - yEnd;
  plotYStart = yStart;
  plotYEnd = yEnd;

  context.fillStyle = arrowFontColor;


  var xPosPos;
  var yPos = canvasHidth * 0.93;
  context.font = labelFontSizeSmall + "px Arial";

  var steps = 5;
  for (var i = 0; i <= steps; i++) {

    xPosPos = xStart + (xEnd - xStart) * (i / steps);
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(xPosPos, yStart);
    context.lineTo(xPosPos, yPos);
    context.strokeStyle = lineColor;
    context.stroke();
    context.strokeStyle = arrowFontColor;
    var text = "" + i * (255 / steps);
    context.fillText(text, xPosPos, yPos + labelFontSizeSmall);
  }

  xPosPos = Math.round(canvasWidth * 0.07);
  yPos = yStart;
  context.font = labelFontSizeSmall + "px Arial";

  for (var i = 0; i <= steps; i++) {

    yPos = yStart - (yStart - yEnd) * (i / steps);
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(xPosPos, yPos);
    context.lineTo(xStart, yPos);
    context.strokeStyle = lineColor;
    context.stroke();
    context.strokeStyle = arrowFontColor;
    var text = "" + i * (255 / steps);
    context.fillText(text, xPosPos * 0.5, yPos);
  }


  ////////////////////////////////////////////////////////////
  /////////////ARROWS////////////////////
  ////////////////////////////////////////////////////////////
  context.strokeStyle = arrowFontColor;
  context.beginPath();
  context.lineWidth = lineWidthVPlot;
  context.moveTo(xStart, yStart);
  context.lineTo(xEndLine, yStart);
  context.stroke();

  // the triangle
  context.beginPath();
  context.moveTo(xEndLine, yStart - arrowWidth/2);
  context.lineTo(xEndArrow, yStart);
  context.lineTo(xEndLine, yStart + arrowWidth/2);
  context.closePath();

  // the fill color
  context.fillStyle = arrowFontColor;
  context.fill();

  context.beginPath();
  context.lineWidth = lineWidthVPlot;
  context.moveTo(xStart, yStart);
  context.lineTo(xStart, yEndLine);
  context.stroke();

  // the triangle
  context.beginPath();
  context.moveTo(xStart - arrowWidth/2, yEndLine);
  context.lineTo(xStart, yEndArrow);
  context.lineTo(xStart + arrowWidth/2, yEndLine);
  context.closePath();

  // the fill color
  context.fill();

  ////////////////// TEXT /////////////////////
  context.font = labelFontSize + "px Arial";

  context.fillText(xlabel, xEndArrow, yStart + labelFontSize);
  context.fillText(ylabel, xStart - labelFontSize, yEndArrow);


}

function drawcolormap_RGBSpace(calcBackground, drawInterpolationLine) {


  // 3D init
  if (showSpace == 1) {
    for (var i = colormapRGB3D.children.length - 1; i >= 0; i--) {
      colormapRGB3D.remove(colormapRGB3D.children[i]);
    }
  }

  if(calcBackground)
  rgbInit();


  if(showSideID==3) // is Compare PAGE
  {
    drawElements(true);

    //if(drawInterpolationLine)// have to think about that later
    drawInterpolationLineInRGB(true, intervalSize);
  }
  else {
    drawElements(false);

    //if(drawInterpolationLine)// have to think about that later
    drawInterpolationLineInRGB(false, intervalSize);
  }

}

function drawElements(isCompareMap){

  var canvasIDRG, canvasIDRB, canvasIDBG;
  switch (showSideID) {
    case 1:
      canvasIDRG="id_canvasRGModiyTop";
      canvasIDRB="id_canvasRBModiyTop";
      canvasIDBG="id_canvasBGModiyTop";
      break;
    case 2:
    canvasIDRG="id_canvasRGAnalyzeTop";
    canvasIDRB="id_canvasRBAnalyzeTop";
    canvasIDBG="id_canvasBGAnalyzeTop";
      break;
    case 3:
    canvasIDRG="id_canvasRGCompareTop";
    canvasIDRB="id_canvasRBCompareTop";
    canvasIDBG="id_canvasBGCompareTop";
      break;
    default:

  }

  var xStart = hue_resolution_X * 0.1;
  var yStart = hue_resolution_Y * 0.9;
  var xEnd = hue_resolution_X * 0.8;
  var yEnd = hue_resolution_Y * 0.2;
  var xWidth = xEnd - xStart;
  var yHeight = yStart - yEnd;

  var canvasColorspaceRG = document.getElementById(canvasIDRG);
  canvasColorspaceRG.width = hue_resolution_X;
  canvasColorspaceRG.height = hue_resolution_Y;
  var colorspaceContexRG = canvasColorspaceRG.getContext("2d");

  var canvasColorspaceRB = document.getElementById(canvasIDRB);
  canvasColorspaceRB.width = hue_resolution_X;
  canvasColorspaceRB.height = hue_resolution_Y;
  var colorspaceContexRB = canvasColorspaceRB.getContext("2d");

  var canvasColorspaceBG = document.getElementById(canvasIDBG);
  canvasColorspaceBG.width = hue_resolution_X;
  canvasColorspaceBG.height = hue_resolution_Y;
  var colorspaceContexBG = canvasColorspaceBG.getContext("2d");


  var xPos, yPos, xPos2, yPos2, tmpColor, tmpColor2;

  spaceElementsXPos = [];
  spaceElementsYPos = [];
  spaceElementsType = [];
  spaceElementsKey = [];
  spaceElementsColor = [];

  var border=1;

  if(isCompareMap)
  border=2;

  for(var j=0; j<border; j++){
    var workCMS;
    switch (j) {
      case 0:
        workCMS=globalCMS1;
        break;
      case 1:
        workCMS=globalCMS2;
        break;
      default:
    }



    for (var i = 0; i < workCMS.getKeyLength(); i++) {

      switch (workCMS.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

          tmpColor = workCMS.getLeftKeyColor(i, "rgb");

          var drawCircle = true;
          if (workCMS.getKeyType(i - 1) === "nil key" || workCMS.getKeyType(i - 1) === "left key")
            drawCircle = false;

          ////////////////////////////////////////////////////////////////
          /////// left Color

          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, drawCircle,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG, i, 0);

          ////////////////////////////////////////////////////////////////
          /////// Right Color

          tmpColor = workCMS.getRightKeyColor(i, "rgb");

          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, true,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG, i,1);

          break;
        case "left key":

          var drawCircle = true;
          if (workCMS.getKeyType(i - 1) === "nil key" || workCMS.getKeyType(i - 1) === "left key")
            drawCircle = false;

          ////////////////////////////////////////////////////////////////
          /////// left Color

          tmpColor = workCMS.getLeftKeyColor(i, "rgb");

          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, drawCircle,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG, i, 0);

          ////////////////////////////////////////////////////////
          ///// Right Color

            // do nothing
            break;

          case "right key":

          tmpColor = workCMS.getRightKeyColor(i, "rgb"); // right color because of right key

          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, true,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG, i, 1);

          break;
        default:
          // dual Key

          tmpColor = workCMS.getRightKeyColor(i, "rgb"); // right color because of right key

          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, true,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG, i, 2);

      }

    }
  }



}

function drawInterpolationLineInRGB(isCompareMap, intervalSize) {


  var canvasIDRG, canvasIDRB, canvasIDBG;
  switch (showSideID) {
    case 1:
      canvasIDRG="id_canvasRGModiyMiddle";
      canvasIDRB="id_canvasRBModiyMiddle";
      canvasIDBG="id_canvasBGModiyMiddle";
      break;
    case 2:
    canvasIDRG="id_canvasRGAnalyzeMiddle";
    canvasIDRB="id_canvasRBAnalyzeMiddle";
    canvasIDBG="id_canvasBGAnalyzeMiddle";
      break;
    case 3:
    canvasIDRG="id_canvasRGCompareMiddle";
    canvasIDRB="id_canvasRBCompareMiddle";
    canvasIDBG="id_canvasBGCompareMiddle";
      break;
    default:

  }

  var xStart = hue_resolution_X * 0.1;
  var yStart = hue_resolution_Y * 0.9;
  var xEnd = hue_resolution_X * 0.8;
  var yEnd = hue_resolution_Y * 0.2;
  var xWidth = xEnd - xStart;
  var yHeight = yStart - yEnd;

  var canvasColorspaceRG = document.getElementById(canvasIDRG);
  canvasColorspaceRG.width = hue_resolution_X;
  canvasColorspaceRG.height = hue_resolution_Y;
  var colorspaceContexRG = canvasColorspaceRG.getContext("2d");

  var canvasColorspaceRB = document.getElementById(canvasIDRB);
  canvasColorspaceRB.width = hue_resolution_X;
  canvasColorspaceRB.height = hue_resolution_Y;
  var colorspaceContexRB = canvasColorspaceRB.getContext("2d");

  var canvasColorspaceBG = document.getElementById(canvasIDBG);
  canvasColorspaceBG.width = hue_resolution_X;
  canvasColorspaceBG.height = hue_resolution_Y;
  var colorspaceContexBG = canvasColorspaceBG.getContext("2d");

  globalCMS1.calcIntervalColors(intervalSize, colorspaceModus);

  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;


  var border=1;

  if(isCompareMap){
    border=2;
    globalCMS2.calcIntervalColors(intervalSize, colorspaceModus);
  }

  for(var x=0; x<border; x++){
      var workCMS;
      var compareColor=false;
      switch (x) {
        case 0:
          workCMS=globalCMS1;
          break;
        case 1:
          workCMS=globalCMS2;
          compareColor=true;
          break;
        default:
      }

  for (var i = 0; i < workCMS.getKeyLength()-1; i++) {

    switch (workCMS.getKeyType(i)) {
      case "nil key":
        //drawRGBline(workCMS.getLeftKeyColor(i+1,"rgb"),workCMS.getLeftKeyColor(i+1,"rgb"),xWidth,yHeight,xStart,yStart, true,compareColor,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG);
      break;
      case "twin key":
        var intervalIndexA = workCMS.getIntervalPositions(i);
        drawRGBline(workCMS.getLeftKeyColor(i,"rgb"),workCMS.getRightKeyColor(i,"rgb"),xWidth,yHeight,xStart,yStart, true,compareColor,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG);
        drawRGBline(workCMS.getRightKeyColor(i,"rgb"),workCMS.getIntervalColor(intervalIndexA[0],"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG);

        for(var j=intervalIndexA[0]; j<intervalIndexA[1]; j++){
          drawRGBline(workCMS.getIntervalColor(j,"rgb"),workCMS.getIntervalColor(j+1,"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG);
        }

        if(workCMS.getIntervalisKey(intervalIndexA[1])!=true)
          drawRGBline(workCMS.getIntervalColor(intervalIndexA[1],"rgb"),workCMS.getLeftKeyColor(i+1,"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG);

          break;
      case "left key":

        drawRGBline(workCMS.getLeftKeyColor(i,"rgb"),workCMS.getLeftKeyColor(i+1,"rgb"),xWidth,yHeight,xStart,yStart,true, compareColor,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG);
        break;

      default:

        var intervalIndexA = workCMS.getIntervalPositions(i);
        drawRGBline(workCMS.getRightKeyColor(i,"rgb"),workCMS.getIntervalColor(intervalIndexA[0],"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG);

        for(var j=intervalIndexA[0]; j<intervalIndexA[1]; j++){
          drawRGBline(workCMS.getIntervalColor(j,"rgb"),workCMS.getIntervalColor(j+1,"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG);

        }

        if(workCMS.getIntervalisKey(intervalIndexA[1])!=true)
          drawRGBline(workCMS.getIntervalColor(intervalIndexA[1],"rgb"),workCMS.getLeftKeyColor(i+1,"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG);

      }
    }

  }

}

function drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, drawCircle,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG, keyIndex,colorSide){

  var tmpArray = [-1, -1, -1];
  var tmpArray2 = [-1, -1, -1];

  // RG

  xPos = tmpColor.getRValue() * xWidth + xStart;
  yPos = yStart - tmpColor.getGValue() * yHeight;

  drawElement(tmpColor.getRGBStringAplha(alphaVal), colorspaceContexRG, xPos, yPos, keyIndex,colorSide, drawCircle);

  tmpArray[0] = xPos;
  tmpArray2[0] = yPos;

  // RB

  xPos = tmpColor.getRValue() * xWidth + xStart;
  yPos = yStart - tmpColor.getBValue() * yHeight;

  drawElement(tmpColor.getRGBStringAplha(alphaVal), colorspaceContexRB, xPos, yPos, keyIndex,colorSide, drawCircle);

  tmpArray[1] = xPos;
  tmpArray2[1] = yPos;

  // BG

  xPos = tmpColor.getBValue() * xWidth + xStart;
  yPos = yStart - tmpColor.getGValue() * yHeight;

  drawElement(tmpColor.getRGBStringAplha(alphaVal), colorspaceContexBG, xPos, yPos, keyIndex,colorSide, drawCircle);

  tmpArray[2] = xPos;
  tmpArray2[2] = yPos;

  //// for mouse events: twin key second = circle
  spaceElementsXPos.push(tmpArray);
  spaceElementsYPos.push(tmpArray2);
  if (drawCircle)
    spaceElementsType.push(true);
  else
    spaceElementsType.push(false);

  spaceElementsKey.push(keyIndex);
  spaceElementsColor.push(colorSide); // colorSide 0=left color, 1= right color, 2=both colors

  if (showSpace == 1) {

    var x1 = tmpColor.getRValue() * 255 - 128;
    var y1 = tmpColor.getGValue() * 255 - 128;
    var z1 = tmpColor.getBValue() * 255 - 128;

    draw3DElement(tmpColor.getHexString(), x1, y1, z1, keyIndex,colorSide, drawCircle);
  }
}


function drawRGBline(tmpColor,tmpColor2,xWidth,yHeight,xStart,yStart, isDashed,isCompareMap,colorspaceContexRG,colorspaceContexRB,colorspaceContexBG){
  // RG

  xPos = tmpColor.getRValue() * xWidth + xStart;
  yPos = yStart - tmpColor.getGValue() * yHeight;

  xPos2 = tmpColor2.getRValue() * xWidth + xStart;
  yPos2 = yStart - tmpColor2.getGValue() * yHeight;

  drawLine(colorspaceContexRG, xPos, yPos, xPos2, yPos2, isDashed, isCompareMap);


  // RB

  xPos = tmpColor.getRValue() * xWidth + xStart;
  yPos = yStart - tmpColor.getBValue() * yHeight;

  xPos2 = tmpColor2.getRValue() * xWidth + xStart;
  yPos2 = yStart - tmpColor2.getBValue() * yHeight;

  drawLine(colorspaceContexRB, xPos, yPos, xPos2, yPos2, isDashed, isCompareMap);

  // BG

  xPos = tmpColor.getBValue() * xWidth + xStart;
  yPos = yStart - tmpColor.getGValue() * yHeight;

  xPos2 = tmpColor2.getBValue() * xWidth + xStart;
  yPos2 = yStart - tmpColor2.getGValue() * yHeight;

  drawLine(colorspaceContexBG, xPos, yPos, xPos2, yPos2, isDashed, isCompareMap);

  if (showSpace == 1) {

    var x1 = tmpColor.getRValue() * 255 - 128;
    var y1 = tmpColor.getGValue() * 255 - 128;
    var z1 = tmpColor.getBValue() * 255 - 128;

    var x2 = tmpColor2.getRValue() * 255 - 128;
    var y2 = tmpColor2.getGValue() * 255 - 128;
    var z2 = tmpColor2.getBValue() * 255 - 128;


    draw3DLine(x1, y1, z1, x2, y2, z2, isDashed, isCompareMap);

  }
}
