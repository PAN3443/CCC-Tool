



function drawcolormap_RGBSpace(calcBackground, drawInterpolationLine) {

  //pathPlotCanvasInit();

  if(calcBackground){

    if(browserCanWorker)
      rgbWorkerDrawBackground();
    else
      rgbDrawBackground();
  }




    if(browserCanWorker){
      rgbWorkerDrawElements_And_InterpolationLine(drawInterpolationLine);
    }
    else{
      if(drawInterpolationLine)
        rgbDrawInterpolationLine();

      rgbDrawElements(); // do3D true
    }



}

function rgbDrawElements(){

  var canvasObj0 = document.getElementById("id_EditPage_PathPlot_Canvas1_2");
  canvasObj0.width = pathPlotResolution;
  canvasObj0.height = pathPlotResolution;
  var canvasContex0 = canvasObj0.getContext("2d");
  canvasContex0.clearRect(0, 0, canvasObj0.width, canvasObj0.height);

  var canvasObj1 = document.getElementById("id_EditPage_PathPlot_Canvas2_2");
  canvasObj1.width = pathPlotResolution;
  canvasObj1.height = pathPlotResolution;
  var canvasContex1 = canvasObj1.getContext("2d");
  canvasContex1.clearRect(0, 0, canvasObj1.width, canvasObj1.height);

  var canvasObj2 = document.getElementById("id_EditPage_PathPlot_Canvas3_2");
  canvasObj2.width = pathPlotResolution;
  canvasObj2.height = pathPlotResolution;
  var canvasContex2 = canvasObj2.getContext("2d");
  canvasContex2.clearRect(0, 0, canvasObj2.width, canvasObj2.height);


  calcRGBElements();

  drawRGBElements(canvasContex0, 1, 0);
  drawRGBElements(canvasContex1, 2, 0);
  drawRGBElements(canvasContex2, 1, 2);

  for (var i = pathPlotElementsGroup.children.length - 1; i >= 0; i--) {
    pathPlotElementsGroup.remove(pathPlotElementsGroup.children[i]);
  }

  drawRGB3DElements();

}



function rgbDrawInterpolationLine() {


  var canvasObj0 = document.getElementById("id_EditPage_PathPlot_Canvas1_1");
  canvasObj0.width = pathPlotResolution;
  canvasObj0.height = pathPlotResolution;
  var canvasContex0 = canvasObj0.getContext("2d");
  canvasContex0.clearRect(0, 0, canvasObj0.width, canvasObj0.height);

  var canvasObj1 = document.getElementById("id_EditPage_PathPlot_Canvas2_1");
  canvasObj1.width = pathPlotResolution;
  canvasObj1.height = pathPlotResolution;
  var canvasContex1 = canvasObj1.getContext("2d");
  canvasContex1.clearRect(0, 0, canvasObj1.width, canvasObj1.height);

  var canvasObj2 = document.getElementById("id_EditPage_PathPlot_Canvas3_1");
  canvasObj2.width = pathPlotResolution;
  canvasObj2.height = pathPlotResolution;
  var canvasContex2 = canvasObj2.getContext("2d");
  canvasContex2.clearRect(0, 0, canvasObj2.width, canvasObj2.height);


  calcRGBInterpolationLine();

  drawInterpolationLine(canvasContex0,1,0,true);
  drawInterpolationLine(canvasContex1,2,0,true);
  drawInterpolationLine(canvasContex2,1,2,true);
  
  draw3DInterpolationLine();


}

function rgbWorkerDrawElements_And_InterpolationLine(drawInterpolationLine){

    drawInterpolationLineWorker1.postMessage(globalCMS1JSON);
    drawInterpolationLineWorker2.postMessage(globalCMS1JSON);
    drawInterpolationLineWorker3.postMessage(globalCMS1JSON);

    var workerJSON = {};

    if(browserCanOffscreenCanvas)
      workerJSON['message'] = "draw";
    else
      workerJSON['message'] = "getData";

    workerJSON['drawInterpolationLine'] = drawInterpolationLine;
    workerJSON['intervalDelta'] = intervalDelta;
    workerJSON['pathPlotResolution'] = pathPlotResolution;
    workerJSON['vPlotWidth'] = undefined;
    workerJSON['do3D'] = false;
    workerJSON['space'] = "rgb";
    workerJSON['type'] = "GR";
    drawInterpolationLineWorker1.postMessage(workerJSON);

    workerJSON.type = "BR";
    drawInterpolationLineWorker2.postMessage(workerJSON);

    workerJSON.do3D = true; // we only need one worker give the 3D information to the main thread so we can reduce the data transfer
    workerJSON.type = "GB";
    drawInterpolationLineWorker3.postMessage(workerJSON);

}



function rgbDrawBackground() {

  var canvasObj0 = document.getElementById("id_EditPage_PathPlot_Canvas1_0");
  canvasObj0.width = pathPlotResolution;
  canvasObj0.height = pathPlotResolution;
  var canvasContex0 = canvasObj0.getContext("2d");
  canvasContex0.clearRect(0, 0, canvasObj0.width, canvasObj0.height);

  var canvasObj1 = document.getElementById("id_EditPage_PathPlot_Canvas2_0");
  canvasObj1.width = pathPlotResolution;
  canvasObj1.height = pathPlotResolution;
  var canvasContex1 = canvasObj1.getContext("2d");
  canvasContex1.clearRect(0, 0, canvasObj1.width, canvasObj1.height);

  var canvasObj2 = document.getElementById("id_EditPage_PathPlot_Canvas3_0");
  canvasObj2.width = pathPlotResolution;
  canvasObj2.height = pathPlotResolution;
  var canvasContex2 = canvasObj2.getContext("2d");
  canvasContex2.clearRect(0, 0, canvasObj2.width, canvasObj2.height);

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

  drawGRBackground(canvasContex0,fixedColor);
  drawBRBackground(canvasContex1,fixedColor);
  drawGBBackground(canvasContex2,fixedColor);

}

function rgbWorkerDrawBackground(){

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

  if(browserCanOffscreenCanvas)
    workerJSON['message'] = "draw";
  else
    workerJSON['message'] = "getData";

  workerJSON['pathPlotResolution'] = pathPlotResolution;
  workerJSON['vPlotWidth'] = undefined;
  workerJSON['space'] = "rgb";
  workerJSON['type'] = "GR";
  workerJSON['fixedColorV1'] = fixR;
  workerJSON['fixedColorV2'] = fixG;
  workerJSON['fixedColorV3'] = fixB;
  drawBackgroundWorker1.postMessage(workerJSON);

  workerJSON.type = "BR";
  drawBackgroundWorker2.postMessage(workerJSON);

  workerJSON.type = "GB";
  drawBackgroundWorker3.postMessage(workerJSON);


}
