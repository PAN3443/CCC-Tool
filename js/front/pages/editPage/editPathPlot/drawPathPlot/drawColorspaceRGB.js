function rgbInit() {

  var canvasObj0 = document.getElementById("id_EditPage_PathPlot_Canvas1_0");
  var canvasObjBox = canvasObj0.getBoundingClientRect();
  canvasObj0.width = canvasObjBox.width;
  canvasObj0.height = canvasObjBox.height;
  var canvasContex0 = canvasObj0.getContext("2d");
  canvasContex0.clearRect(0, 0, canvasObj0.width, canvasObj0.height);
  var canvasData0 = canvasContex0.getImageData(0, 0, canvasObj0.width, canvasObj0.height);


  var canvasObj1 = document.getElementById("id_EditPage_PathPlot_Canvas2_0");
  canvasObj1.width = canvasObjBox.width;
  canvasObj1.height = canvasObjBox.height;
  var canvasContex1 = canvasObj1.getContext("2d");
  canvasContex1.clearRect(0, 0, canvasObj1.width, canvasObj1.height);
  var canvasData1 = canvasContex1.getImageData(0, 0, canvasObj1.width, canvasObj1.height);

  var canvasObj2 = document.getElementById("id_EditPage_PathPlot_Canvas3_0");
  canvasObj2.width = canvasObjBox.width;
  canvasObj2.height = canvasObjBox.height;
  var canvasContex2 = canvasObj2.getContext("2d");
  canvasContex2.clearRect(0, 0, canvasObj2.width, canvasObj2.height);
  var canvasData2 = canvasContex2.getImageData(0, 0, canvasObj2.width, canvasObj2.height);


    var xStart = canvasObj0.width * 0.1;
    var yStart = canvasObj0.height * 0.9;
    var xEnd = canvasObj0.width * 0.8;
    var yEnd = canvasObj0.height * 0.2;
    var xWidth = xEnd - xStart;
    var yHeight = yStart - yEnd;

    var r = 0;
    var g = 0;
    var b = 0;

    if (mouseGrappedKeyID != -1) {

      var tmpColor;
      switch (mouseGrappedColorSide) {
        case 0:
        // left color
          tmpColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "rgb");
          break;
        default:
          // both colors
          tmpColor = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "rgb");
      }

      r=tmpColor.get1Value();
      g=tmpColor.get2Value();
      b=tmpColor.get3Value();
    }

    var tmpRGB1= new classColor_RGB(1,1,1);
    var tmpRGB2= new classColor_RGB(1,1,1);
    var tmpRGB3= new classColor_RGB(1,1,1);

    //RG
    for (var x = 0; x < canvasObj0.width; x++) {

      for (var y = 0; y < canvasObj0.height; y++) {


        if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
          // calc hsv color

          var xVal = (x - xStart) / xWidth;
          var yVal = (yStart - y) / yHeight;

          var index = (x + y * canvasObj0.width) * 4;

          tmpRGB1.set1Value(yVal);
          tmpRGB1.set2Value(xVal);
          tmpRGB1.set3Value(b);

          tmpRGB2.set1Value(yVal);
          tmpRGB2.set2Value(g);
          tmpRGB2.set3Value(xVal);

          tmpRGB3.set1Value(r);
          tmpRGB3.set2Value(xVal);
          tmpRGB3.set3Value(yVal);

          if(doColorblindnessSim){
            var tmpLMS = tmpRGB1.calcLMSColor();
            tmpRGB1 = tmpLMS.calcColorBlindRGBColor();

            tmpLMS = tmpRGB2.calcLMSColor();
            tmpRGB2 = tmpLMS.calcColorBlindRGBColor();

            tmpLMS = tmpRGB3.calcLMSColor();
            tmpRGB3 = tmpLMS.calcColorBlindRGBColor();
          }

            canvasData0.data[index + 0] = Math.round(tmpRGB1.get1Value() * 255); // r
            canvasData0.data[index + 1] = Math.round(tmpRGB1.get2Value() * 255); // g
            canvasData0.data[index + 2] = Math.round(tmpRGB1.get3Value() * 255); // b
            canvasData0.data[index + 3] = 255; //a

            canvasData1.data[index + 0] = Math.round(tmpRGB2.get1Value() * 255); // r
            canvasData1.data[index + 1] = Math.round(tmpRGB2.get2Value() * 255); // g
            canvasData1.data[index + 2] = Math.round(tmpRGB2.get3Value() * 255); // b
            canvasData1.data[index + 3] = 255; //a

            canvasData2.data[index + 0] = Math.round(tmpRGB3.get1Value() * 255); // r
            canvasData2.data[index + 1] = Math.round(tmpRGB3.get2Value() * 255); // g
            canvasData2.data[index + 2] = Math.round(tmpRGB3.get3Value() * 255); // b
            canvasData2.data[index + 3] = 255; //a

        }
      }

    }


  canvasContex0.putImageData(canvasData0, 0, 0); // update ColorspaceCanvas;
  canvasContex1.putImageData(canvasData1, 0, 0); // update ColorspaceCanvas;
  canvasContex2.putImageData(canvasData2, 0, 0); // update ColorspaceCanvas;


    rgbPlot(canvasContex0, canvasObj0.width, canvasObj0.height, "G", "R");

    rgbPlot(canvasContex1, canvasObj1.width, canvasObj1.height, "B", "R");

    rgbPlot(canvasContex2, canvasObj2.width, canvasObj2.height, "G", "B");



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


  if(calcBackground){
    rgbInit();
  }



  if(drawInterpolationLine){

    for (var i = pathPlotLineGroup.children.length - 1; i >= 0; i--) {
      pathPlotLineGroup.remove(pathPlotLineGroup.children[i]);
    }

    drawInterpolationLineInRGB();
  }

  for (var i = pathPlotElementsGroup.children.length - 1; i >= 0; i--) {
    pathPlotElementsGroup.remove(pathPlotElementsGroup.children[i]);
  }
  drawElements(); // do3D true




}

function drawElements(){

  var canvasObj0 = document.getElementById("id_EditPage_PathPlot_Canvas1_2");
  var canvasObjBox = canvasObj0.getBoundingClientRect();
  canvasObj0.width = canvasObjBox.width;
  canvasObj0.height = canvasObjBox.height;
  var canvasContex0 = canvasObj0.getContext("2d");
  canvasContex0.clearRect(0, 0, canvasObj0.width, canvasObj0.height);
  var canvasData0 = canvasContex0.getImageData(0, 0, canvasObj0.width, canvasObj0.height);


  var canvasObj1 = document.getElementById("id_EditPage_PathPlot_Canvas2_2");
  canvasObj1.width = canvasObjBox.width;
  canvasObj1.height = canvasObjBox.height;
  var canvasContex1 = canvasObj1.getContext("2d");
  canvasContex1.clearRect(0, 0, canvasObj1.width, canvasObj1.height);
  var canvasData1 = canvasContex1.getImageData(0, 0, canvasObj1.width, canvasObj1.height);

  var canvasObj2 = document.getElementById("id_EditPage_PathPlot_Canvas3_2");
  canvasObj2.width = canvasObjBox.width;
  canvasObj2.height = canvasObjBox.height;
  var canvasContex2 = canvasObj2.getContext("2d");
  canvasContex2.clearRect(0, 0, canvasObj2.width, canvasObj2.height);
  var canvasData2 = canvasContex2.getImageData(0, 0, canvasObj2.width, canvasObj2.height);


  var xStart = canvasObj0.width * 0.1;
  var yStart = canvasObj0.height * 0.9;
  var xEnd = canvasObj0.width * 0.8;
  var yEnd = canvasObj0.height * 0.2;
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

          //drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, drawCircle,mode,canvasContex, i, 0, do3D);
          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, drawCircle,canvasContex0,canvasContex1,canvasContex2, i, 0);

          ////////////////////////////////////////////////////////////////
          /////// Right Color

          tmpColor = globalCMS1.getRightKeyColor(i, "rgb");

          //drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, true,mode,canvasContex, i,1, do3D);
          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, true,canvasContex0,canvasContex1,canvasContex2, i, 1);

          break;
        case "left key":

          var drawCircle = true;
          if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
            drawCircle = false;

          ////////////////////////////////////////////////////////////////
          /////// left Color

          tmpColor = globalCMS1.getLeftKeyColor(i, "rgb");

          //drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, drawCircle,mode,canvasContex, i, 0, do3D);
          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, drawCircle,canvasContex0,canvasContex1,canvasContex2, i, 0);

          ////////////////////////////////////////////////////////
          ///// Right Color

            // do nothing
            break;

          case "right key":

          tmpColor = globalCMS1.getRightKeyColor(i, "rgb"); // right color because of right key

          //drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, true,mode,canvasContex, i, 1, do3D);
          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, true,canvasContex0,canvasContex1,canvasContex2, i, 1);

          break;
        default:
          // dual Key

          tmpColor = globalCMS1.getRightKeyColor(i, "rgb"); // right color because of right key

          //drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, true,mode,canvasContex, i, 2, do3D);
          drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, true,canvasContex0,canvasContex1,canvasContex2, i, 2);

      }

    }



}

function drawInterpolationLineInRGB() {


  pathplotLines1=[];
  pathplotLines2=[];
  pathplotLines3=[];

  var canvasObj0 = document.getElementById("id_EditPage_PathPlot_Canvas1_1");
  var canvasObjBox = canvasObj0.getBoundingClientRect();
  canvasObj0.width = canvasObjBox.width;
  canvasObj0.height = canvasObjBox.height;
  var canvasContex0 = canvasObj0.getContext("2d");
  canvasContex0.clearRect(0, 0, canvasObj0.width, canvasObj0.height);
  var canvasData0 = canvasContex0.getImageData(0, 0, canvasObj0.width, canvasObj0.height);


  var canvasObj1 = document.getElementById("id_EditPage_PathPlot_Canvas2_1");
  canvasObj1.width = canvasObjBox.width;
  canvasObj1.height = canvasObjBox.height;
  var canvasContex1 = canvasObj1.getContext("2d");
  canvasContex1.clearRect(0, 0, canvasObj1.width, canvasObj1.height);
  var canvasData1 = canvasContex1.getImageData(0, 0, canvasObj1.width, canvasObj1.height);

  var canvasObj2 = document.getElementById("id_EditPage_PathPlot_Canvas3_1");
  canvasObj2.width = canvasObjBox.width;
  canvasObj2.height = canvasObjBox.height;
  var canvasContex2 = canvasObj2.getContext("2d");
  canvasContex2.clearRect(0, 0, canvasObj2.width, canvasObj2.height);
  var canvasData2 = canvasContex2.getImageData(0, 0, canvasObj2.width, canvasObj2.height);


  var xStart = canvasObj0.width * 0.1;
  var yStart = canvasObj0.height * 0.9;
  var xEnd = canvasObj0.width * 0.8;
  var yEnd = canvasObj0.height * 0.2;
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
        //drawRGBline(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getRightKeyColor(i,"rgb"),xWidth,yHeight,xStart,yStart, true,compareColor,mode,canvasContex);
        drawRGBline(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getRightKeyColor(i,"rgb"),xWidth,yHeight,xStart,yStart, true,compareColor,canvasContex0,canvasContex1,canvasContex2);
          for(var j=intervalIndexA[0]; j<intervalIndexA[1]; j++){
            //drawRGBline(globalCMS1.getIntervalColor(j,"rgb"),globalCMS1.getIntervalColor(j+1,"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,mode,canvasContex);
            drawRGBline(globalCMS1.getIntervalColor(j,"rgb"),globalCMS1.getIntervalColor(j+1,"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,canvasContex0,canvasContex1,canvasContex2);
          }

          break;
      case "left key":

        //drawRGBline(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getLeftKeyColor(i+1,"rgb"),xWidth,yHeight,xStart,yStart,true, compareColor,mode,canvasContex);
        drawRGBline(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getLeftKeyColor(i+1,"rgb"),xWidth,yHeight,xStart,yStart, true,compareColor,canvasContex0,canvasContex1,canvasContex2);
        break;

      default:

        var intervalIndexA = globalCMS1.getIntervalPositions(i);

          if(globalCMS1.getKeyType(i)=="dual key"){
            // we do not save the interval colors for dual key double -> it is easier for the analyze algorithm
            //drawRGBline(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getIntervalColor(intervalIndexA[0],"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,mode,canvasContex);
            drawRGBline(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getIntervalColor(intervalIndexA[0],"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,canvasContex0,canvasContex1,canvasContex2);
          }

          for(var j=intervalIndexA[0]; j<intervalIndexA[1]; j++){
            //drawRGBline(globalCMS1.getIntervalColor(j,"rgb"),globalCMS1.getIntervalColor(j+1,"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,mode,canvasContex);
            drawRGBline(globalCMS1.getIntervalColor(j,"rgb"),globalCMS1.getIntervalColor(j+1,"rgb"),xWidth,yHeight,xStart,yStart, false,compareColor,canvasContex0,canvasContex1,canvasContex2);
          }

      }

    }

    canvasContex0.beginPath();
    canvasContex1.beginPath();
    canvasContex2.beginPath();

    canvasContex0.setLineDash([]);
    canvasContex1.setLineDash([]);
    canvasContex2.setLineDash([]);

    for (var i = 0; i < pathplotLines1.length/4; i++) {

        var index = i*4;
        canvasContex0.moveTo(pathplotLines1[index], pathplotLines1[index+1]);
        canvasContex0.lineTo(pathplotLines1[index+2], pathplotLines1[index+3]);

        canvasContex1.moveTo(pathplotLines2[index], pathplotLines2[index+1]);
        canvasContex1.lineTo(pathplotLines2[index+2], pathplotLines2[index+3]);

        canvasContex2.moveTo(pathplotLines3[index], pathplotLines3[index+1]);
        canvasContex2.lineTo(pathplotLines3[index+2], pathplotLines3[index+3]);


    }

    canvasContex0.lineWidth=bigLineWidth;
    canvasContex1.lineWidth=bigLineWidth;
    canvasContex2.lineWidth=bigLineWidth;

    canvasContex0.strokeStyle = 'rgb(0,0,0)';
    canvasContex1.strokeStyle = 'rgb(0,0,0)';
    canvasContex2.strokeStyle = 'rgb(0,0,0)';


    canvasContex0.stroke();
    canvasContex1.stroke();
    canvasContex2.stroke();

    canvasContex0.lineWidth=smallLineWidth;
    canvasContex1.lineWidth=smallLineWidth;
    canvasContex2.lineWidth=smallLineWidth;

    canvasContex0.strokeStyle = 'rgb(255,255,255)';
    canvasContex1.strokeStyle = 'rgb(255,255,255)';
    canvasContex2.strokeStyle = 'rgb(255,255,255)';

    canvasContex0.stroke();
    canvasContex1.stroke();
    canvasContex2.stroke();




}

function drawRGBElement(tmpColor,xWidth,yHeight,xStart,yStart, drawCircle,canvasContexRG,canvasContexRB,canvasContexBG, keyIndex,colorSide){

  var tmpArray = [-1, -1, -1];
  var tmpArray2 = [-1, -1, -1];

  var showColor = tmpColor;
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
  }

  // RG

  xPos = tmpColor.getGValue() * xWidth + xStart;
  yPos = yStart - tmpColor.getRValue() * yHeight;

  drawElement(showColor.getRGBString(), canvasContexRG, xPos, yPos, keyIndex,colorSide, drawCircle);

  tmpArray[0] = xPos;
  tmpArray2[0] = yPos;

  // RB

  xPos = tmpColor.getBValue() * xWidth + xStart;
  yPos = yStart - tmpColor.getRValue() * yHeight;

  drawElement(showColor.getRGBString(), canvasContexRB, xPos, yPos, keyIndex,colorSide, drawCircle);

  tmpArray[1] = xPos;
  tmpArray2[1] = yPos;

  // BG

  xPos = tmpColor.getGValue() * xWidth + xStart;
  yPos = yStart - tmpColor.getBValue() * yHeight;

  drawElement(showColor.getRGBString(), canvasContexBG, xPos, yPos, keyIndex,colorSide, drawCircle);

  tmpArray[2] = xPos;
  tmpArray2[2] = yPos;

  // 3D
    var x1 = tmpColor.getRValue() * 255 - 128;
    var y1 = tmpColor.getGValue() * 255 - 128;
    var z1 = tmpColor.getBValue() * 255 - 128;

    draw3DElement(showColor.getHexString(), x1, y1, z1, keyIndex,colorSide, drawCircle);

}

function drawRGBline(tmpColor,tmpColor2,xWidth,yHeight,xStart,yStart, isDashed,isCompareMap,canvasContexRG,canvasContexRB,canvasContexBG){
  // RG

  xPos = tmpColor.getGValue() * xWidth + xStart;
  yPos = yStart - tmpColor.getRValue() * yHeight;

  xPos2 = tmpColor2.getGValue() * xWidth + xStart;
  yPos2 = yStart - tmpColor2.getRValue() * yHeight;


  if(isDashed)
    drawLine(canvasContexRG, xPos, yPos, xPos2, yPos2);
  else{
    pathplotLines1.push(xPos);
    pathplotLines1.push(yPos);
    pathplotLines1.push(xPos2);
    pathplotLines1.push(yPos2);
  }

  // RB

  xPos = tmpColor.getBValue() * xWidth + xStart;
  yPos = yStart - tmpColor.getRValue() * yHeight;

  xPos2 = tmpColor2.getBValue() * xWidth + xStart;
  yPos2 = yStart - tmpColor2.getRValue() * yHeight;

  if(isDashed)
    drawLine(canvasContexRB, xPos, yPos, xPos2, yPos2);
  else{
      pathplotLines2.push(xPos);
      pathplotLines2.push(yPos);
      pathplotLines2.push(xPos2);
      pathplotLines2.push(yPos2);
  }
  // BG

  xPos = tmpColor.getGValue() * xWidth + xStart;
  yPos = yStart - tmpColor.getBValue() * yHeight;

  xPos2 = tmpColor2.getGValue() * xWidth + xStart;
  yPos2 = yStart - tmpColor2.getBValue() * yHeight;

  if(isDashed)
    drawLine(canvasContexBG, xPos, yPos, xPos2, yPos2);
  else{
      pathplotLines3.push(xPos);
      pathplotLines3.push(yPos);
      pathplotLines3.push(xPos2);
      pathplotLines3.push(yPos2);
    }

  //3D

    var x1 = tmpColor.getRValue() * 255 - 128;
    var y1 = tmpColor.getGValue() * 255 - 128;
    var z1 = tmpColor.getBValue() * 255 - 128;

    var x2 = tmpColor2.getRValue() * 255 - 128;
    var y2 = tmpColor2.getGValue() * 255 - 128;
    var z2 = tmpColor2.getBValue() * 255 - 128;


    draw3DLine(x1, y1, z1, x2, y2, z2, isDashed);


}
