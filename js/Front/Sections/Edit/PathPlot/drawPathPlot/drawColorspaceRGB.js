

function rgbDrawBackground() {

  var canvasObj0 = document.getElementById("id_EditPage_PathPlot_Canvas1_0");
  var canvasContex0 = canvasObj0.getContext("2d");

  var canvasObj1 = document.getElementById("id_EditPage_PathPlot_Canvas2_0");
  var canvasContex1 = canvasObj1.getContext("2d");

  var canvasObj2 = document.getElementById("id_EditPage_PathPlot_Canvas3_0");
  var canvasContex2 = canvasObj2.getContext("2d");



  var fixedColor = undefined;
  if (mouseGrappedKeyID != -1) {

    switch (mouseGrappedColorSide) {
      case 0:
      // left color
        fixedColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "rgb");
        break;
      default:
        // both colors
        fixedColor = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "rgb");
    }

  }

  drawGRBackground(canvasContex0,canvasObj0.width,canvasObj0.height,fixedColor);
  drawBRBackground(canvasContex1,canvasObj1.width,canvasObj1.height,fixedColor);
  drawGBBackground(canvasContex2,canvasObj2.width,canvasObj2.height,fixedColor);

}

function rgbDrawBackground_Offscreen(){

  var fixR = undefined;
  var fixG = undefined;
  var fixB = undefined;
  if (mouseGrappedKeyID != -1) {
    var fixedColor = undefined;
    switch (mouseGrappedColorSide) {
      case 0:
      // left color
        fixedColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "rgb");
        break;
      default:
        // both colors
        fixedColor = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "rgb");
    }
    if(fixedColor!=undefined){
      fixR = fixedColor.get1Value();
      fixG = fixedColor.get2Value();
      fixB = fixedColor.get3Value();
    }

  }


  var workerJSON = {};

  workerJSON['message'] = "draw";
  workerJSON['space'] = "rgb";
  workerJSON['type'] = "GR";
  workerJSON['fixedColorR'] = fixR;
  workerJSON['fixedColorG'] = fixG;
  workerJSON['fixedColorB'] = fixB;
  drawBackgroundWorker1.postMessage(workerJSON);

  workerJSON.type = "BR";
  drawBackgroundWorker2.postMessage(workerJSON);

  workerJSON.type = "GB";
  drawBackgroundWorker3.postMessage(workerJSON);


}




function drawcolormap_RGBSpace(calcBackground, drawInterpolationLine) {

  //pathPlotCanvasInit();



  if(calcBackground){

    if(browserCanWorker && browserCanOffscreenCanvas){
      if(browserCanOffscreenCanvas)
        rgbDrawBackground_Offscreen();
      else
        rgbDrawBackground();
    }
    else
      rgbDrawBackground();
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
