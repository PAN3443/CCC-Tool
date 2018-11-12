function rgbInit(canvasID, mode) {

  var canvasObj = document.getElementById(canvasID);
  var canvasObjBox = canvasObj.getBoundingClientRect();
  canvasObj.width = 500;//canvasObjBox.width;
  canvasObj.height = 500;//canvasObjBox.height;
  var canvasContex = canvasObj.getContext("2d");
  canvasContex.clearRect(0, 0, canvasObj.width, canvasObj.height);

  var canvasData = canvasContex.getImageData(0, 0, canvasObj.width, canvasObj.height);



    var xStart = canvasObj.width * 0.1;
    var yStart = canvasObj.height * 0.9;
    var xEnd = canvasObj.width * 0.8;
    var yEnd = canvasObj.height * 0.2;
    var xWidth = xEnd - xStart;
    var yHeight = yStart - yEnd;

    //RG
    for (var x = 0; x < canvasObj.width; x++) {

      for (var y = 0; y < canvasObj.height; y++) {

        var r,g,b =0;
        if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
          // calc hsv color
          var colorRGB;
          switch (mode) {
            case "rg":
                r = (x - xStart) / xWidth;
                g = (yStart - y) / yHeight;

                if (mouseGrappedKeyID != -1) {
                  switch (mouseGrappedColorSide) {
                    case 0:
                    // left color
                      b = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "rgb").getBValue();
                      break;
                    default:
                      // both colors
                      b = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "rgb").getBValue();
                  }
                }
              break;

              case "rb":
                  r = (x - xStart) / xWidth;
                  b = (yStart - y) / yHeight;

                  if (mouseGrappedKeyID != -1) {
                    switch (mouseGrappedColorSide) {
                      case 0:
                      // left color
                        g = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "rgb").getGValue();
                        break;
                      default:
                        // both colors
                        g = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "rgb").getGValue();
                    }

                  }
                  break;
              case "bg":
                  b = (x - xStart) / xWidth;
                  g = (yStart - y) / yHeight;

                  if (mouseGrappedKeyID != -1) {
                    switch (mouseGrappedColorSide) {
                      case 0:
                      // left color
                        r = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "rgb").getRValue();
                        break;
                      default:
                        // both colors
                        r = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "rgb").getRValue();
                    }
                  }
              break;
            default:
              return;

          }


          var index = (x + y * canvasObj.width) * 4;

          canvasData.data[index + 0] = Math.round(r * 255); // r
          canvasData.data[index + 1] = Math.round(g * 255); // g
          canvasData.data[index + 2] = Math.round(b * 255); // b
          canvasData.data[index + 3] = 255; //a
        }
      }

    }


  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;


  switch (mode) {
    case "rg":
          rgbPlot(canvasContex, canvasObj.width, canvasObj.height, "R", "G");
          break;
    case "rb":
          rgbPlot(canvasContex, canvasObj.width, canvasObj.height, "R", "B");
          break;
    case "bg":
          rgbPlot(canvasContex, canvasObj.width, canvasObj.height, "B", "G");
          break;
    default:
        return;

  }





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
  context.moveTo(xEndLine, yStart - arrowHeight/2);
  context.lineTo(xEndArrow, yStart);
  context.lineTo(xEndLine, yStart + arrowHeight/2);
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
  context.moveTo(xStart - arrowHeight/2, yEndLine);
  context.lineTo(xStart, yEndArrow);
  context.lineTo(xStart + arrowHeight/2, yEndLine);
  context.closePath();

  // the fill color
  context.fill();

  ////////////////// TEXT /////////////////////
  context.font = labelFontSize + "px Arial";

  context.fillText(xlabel, xEndArrow, yStart + labelFontSize);
  context.fillText(ylabel, xStart - labelFontSize, yEndArrow);


}

function drawcolormap_RGBSpace(calcBackground, drawInterpolationLine) {



  var canvasIDRG,canvasIDRB,canvasIDBG;

  switch (pathCanvasAssignmentBig) {
  case 0:
    canvasIDRG="id_EditPage_PathPlot_BigCanvas_";

    if (pathCanvasAssignmentSmallTop==1) {
      canvasIDRB="id_EditPage_PathPlot_SmallTopCanvas_";
      canvasIDBG="id_EditPage_PathPlot_SmallBottomCanvas_";
    }
    else{
      canvasIDRB="id_EditPage_PathPlot_SmallBottomCanvas_";
      canvasIDBG="id_EditPage_PathPlot_SmallTopCanvas_";
    }
    break;
  case 1:

  canvasIDRB="id_EditPage_PathPlot_BigCanvas_";

  if (pathCanvasAssignmentSmallTop==0) {
    canvasIDRG="id_EditPage_PathPlot_SmallTopCanvas_";
    canvasIDBG="id_EditPage_PathPlot_SmallBottomCanvas_";
  }
  else{
    canvasIDRG="id_EditPage_PathPlot_SmallBottomCanvas_";
    canvasIDBG="id_EditPage_PathPlot_SmallTopCanvas_";
  }

    break;
  case 2:
  canvasIDBG="id_EditPage_PathPlot_BigCanvas_";

  if (pathCanvasAssignmentSmallTop==1) {
    canvasIDRB="id_EditPage_PathPlot_SmallTopCanvas_";
    canvasIDRG="id_EditPage_PathPlot_SmallBottomCanvas_";
  }
  else{
    canvasIDRB="id_EditPage_PathPlot_SmallBottomCanvas_";
    canvasIDRG="id_EditPage_PathPlot_SmallTopCanvas_";
  }

    break;
  default:
    return;
}

  if(calcBackground){
    rgbInit(canvasIDRG+"0","rg");
    rgbInit(canvasIDRB+"0","rb");
    rgbInit(canvasIDBG+"0","bg");
  }




  if(drawInterpolationLine){
    // 3D init
    if (showSpace == 1) {
      for (var i = colormapRGB3D.children.length - 1; i >= 0; i--) {
        colormapRGB3D.remove(colormapRGB3D.children[i]);
      }
    }
    drawInterpolationLineInRGB(canvasIDRG+"1","rg");
    drawInterpolationLineInRGB(canvasIDRB+"1","rb");
    drawInterpolationLineInRGB(canvasIDBG+"1","bg");
    drawElements(canvasIDRG+"2","rg",true);
    drawElements(canvasIDRB+"2","rb",true);
    drawElements(canvasIDBG+"2","bg",true);
  }
  else{
    drawElements(canvasIDRG+"2","rg",false);
    drawElements(canvasIDRB+"2","rb",false);
    drawElements(canvasIDBG+"2","bg",false);
  }



}

function drawElements(canvasID, mode, do3D){

  var canvasObj = document.getElementById(canvasID);
  var canvasObjBox = canvasObj.getBoundingClientRect();
  canvasObj.width = canvasObjBox.width;
  canvasObj.height = canvasObjBox.height;
  var canvasContex = canvasObj.getContext("2d");
  canvasContex.clearRect(0, 0, canvasObj.width, canvasObj.height);

  var xStart = canvasObj.width * 0.1;
  var yStart = canvasObj.height * 0.9;
  var xEnd = canvasObj.width * 0.8;
  var yEnd = canvasObj.height * 0.2;
  var xWidth = xEnd - xStart;
  var yHeight = yStart - yEnd;

  var xPos, yPos, xPos2, yPos2, tmpColor, tmpColor2;

    for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

      switch (globalCMS1.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

          tmpColor = globalCMS1.getLeftKeyColor(i, "rgb");

          var drawCircle = true;
          if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
            drawCircle = false;

          ////////////////////////////////////////////////////////////////
          /////// left Color

          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, drawCircle,mode,canvasContex, i, 0, do3D);

          ////////////////////////////////////////////////////////////////
          /////// Right Color

          tmpColor = globalCMS1.getRightKeyColor(i, "rgb");

          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, true,mode,canvasContex, i,1, do3D);

          break;
        case "left key":

          var drawCircle = true;
          if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
            drawCircle = false;

          ////////////////////////////////////////////////////////////////
          /////// left Color

          tmpColor = globalCMS1.getLeftKeyColor(i, "rgb");

          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, drawCircle,mode,canvasContex, i, 0, do3D);

          ////////////////////////////////////////////////////////
          ///// Right Color

            // do nothing
            break;

          case "right key":

          tmpColor = globalCMS1.getRightKeyColor(i, "rgb"); // right color because of right key

          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, true,mode,canvasContex, i, 1, do3D);

          break;
        default:
          // dual Key

          tmpColor = globalCMS1.getRightKeyColor(i, "rgb"); // right color because of right key

          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, true,mode,canvasContex, i, 2, do3D);

      }

    }



}

function drawInterpolationLineInRGB(canvasID, mode) {

  var canvasObj = document.getElementById(canvasID);
  var canvasObjBox = canvasObj.getBoundingClientRect();
  canvasObj.width = canvasObjBox.width;
  canvasObj.height = canvasObjBox.height;
  var canvasContex = canvasObj.getContext("2d");
  canvasContex.clearRect(0, 0, canvasObj.width, canvasObj.height);

  var xStart = canvasObj.width * 0.1;
  var yStart = canvasObj.height * 0.9;
  var xEnd = canvasObj.width * 0.8;
  var yEnd = canvasObj.height * 0.2;
  var xWidth = xEnd - xStart;
  var yHeight = yStart - yEnd;


  globalCMS1.calcDeltaIntervalColors(intervalDelta, 0,globalCMS1.getKeyLength()-1);

  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;

  var compareColor = false;

  for (var i = 0; i < globalCMS1.getKeyLength()-1; i++) {

    switch (globalCMS1.getKeyType(i)) {
      case "nil key":

      break;
      case "twin key":
        var intervalIndexA = globalCMS1.getIntervalPositions(i);
        drawRGBline(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getRightKeyColor(i,"rgb"),xWidth,yHeight,xStart,yStart, true,compareColor,mode,canvasContex);

          for(var j=intervalIndexA[0]; j<intervalIndexA[1]; j++){
            drawRGBline(globalCMS1.getIntervalColor(j,"rgb"),globalCMS1.getIntervalColor(j+1,"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,mode,canvasContex);
          }

          break;
      case "left key":

        drawRGBline(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getLeftKeyColor(i+1,"rgb"),xWidth,yHeight,xStart,yStart,true, compareColor,mode,canvasContex);
        break;

      default:

        var intervalIndexA = globalCMS1.getIntervalPositions(i);

          if(globalCMS1.getKeyType(i)=="dual key"){
            // we do not save the interval colors for dual key double -> it is easier for the analyze algorithm
            drawRGBline(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getIntervalColor(intervalIndexA[0],"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,mode,canvasContex);
          }

          for(var j=intervalIndexA[0]; j<intervalIndexA[1]; j++){
            drawRGBline(globalCMS1.getIntervalColor(j,"rgb"),globalCMS1.getIntervalColor(j+1,"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,mode,canvasContex);
          }

      }

    }


}

function drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, drawCircle,mode,canvasContex, keyIndex,colorSide,do3D){

  var xpos,yPos;
  switch (mode) {
    case "rg":
          xPos = tmpColor.getRValue() * xWidth + xStart;
          yPos = yStart - tmpColor.getGValue() * yHeight;

          var tmpArray = [xPos, -1, -1];
          var tmpArray2 = [yPos, -1, -1];


          break;
    case "rb":
          xPos = tmpColor.getRValue() * xWidth + xStart;
          yPos = yStart - tmpColor.getBValue() * yHeight;


          break;
    case "bg":
          xPos = tmpColor.getBValue() * xWidth + xStart;
          yPos = yStart - tmpColor.getGValue() * yHeight;

          break;
    default:
        return;

  }

  drawElement(tmpColor.getRGBString(), canvasContex, xPos, yPos, keyIndex,colorSide, drawCircle);

  if (do3D && showSpace == 1) {

    var x1 = tmpColor.getRValue() * 255 - 128;
    var y1 = tmpColor.getGValue() * 255 - 128;
    var z1 = tmpColor.getBValue() * 255 - 128;

    draw3DElement(tmpColor.getHexString(), x1, y1, z1, keyIndex,colorSide, drawCircle);
  }
}


function getRGBXYPos(tmpColor,xWidth,yHeight,xStart,yStart,mode){

  var position = [0,0];
  switch (mode) {
    case "rg":
          position[0] = tmpColor.getRValue() * xWidth + xStart;
          position[1] = yStart - tmpColor.getGValue() * yHeight;
          break;
    case "rb":
          position[0] = tmpColor.getRValue() * xWidth + xStart;
          position[1] = yStart - tmpColor.getBValue() * yHeight;
          break;
    case "bg":
          position[0] = tmpColor.getBValue() * xWidth + xStart;
          position[1] = yStart - tmpColor.getGValue() * yHeight;
          break;
    default:
        return;

  }

  return position;

}


function drawRGBline(tmpColor,tmpColor2,xWidth,yHeight,xStart,yStart, isDashed,isCompareMap,mode,canvasContex){
  // RG

  var position = getRGBXYPos(tmpColor,xWidth,yHeight,xStart,yStart,mode);
  var position2 = getRGBXYPos(tmpColor2,xWidth,yHeight,xStart,yStart,mode);
  var xpos,yPos,xpos2,yPos2;


  drawLine(canvasContex, position[0], position[1], position2[0], position2[1], isDashed, isCompareMap);


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
