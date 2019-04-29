//////////////////////////////////////////
// -------------HSV LAB DIN99---------------//
//////////////////////////////////////////
function drawcolormap_hueSpace(calcBackground, drawInterpolationLine, doInitVplot) {



  if (doInitVplot){
    if(browserCanOffscreenCanvas)
      init_VPlot_Offscreen();
    else
      init_VPlot();
  }


  if (calcBackground)
    hueInit();



  if (drawInterpolationLine){

    for (var i = pathPlotLineGroup.children.length - 1; i >= 0; i--) {
      pathPlotLineGroup.remove(pathPlotLineGroup.children[i]);
    }

    drawInterpolationLineHSV_LAB_DIN99(false);

  }

  for (var i = pathPlotElementsGroup.children.length - 1; i >= 0; i--) {
    pathPlotElementsGroup.remove(pathPlotElementsGroup.children[i]);
  }

  drawElements_HSV_LAB_DIN99(false);

}

////////////////////////////////////////////
function hueInit() {

  if(!browserCanWorker || !browserCanOffscreenCanvas){
    updateVPlotWidth(document.getElementById("id_EditPage_PathPlot_Canvas1_0"));
  }

  if(browserCanWorker){
    hueInit_Worker();
  }
  else{
    var canvas = document.getElementById("id_EditPage_PathPlot_SingleCanvas_0");
    canvas.width = pathPlotResolution;
    canvas.height = pathPlotResolution;
    var canvasContex = canvas.getContext("2d");

    var fixedColor = undefined;
    if (mouseGrappedKeyID != -1) {

      switch (mouseGrappedColorSide) {
        case 0:
        // left color
          fixedColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, pathColorspace);
          break;
        default:
          // both colors
          fixedColor = globalCMS1.getRightKeyColor(mouseGrappedKeyID, pathColorspace);
      }

    }

    switch (pathColorspace) {
      case "hsv":
        drawHSVBackground(canvasContex,fixedColor);
        break;
        case "lab":
          drawLabBackground(canvasContex,fixedColor);
          break;
          case "din99":
            drawDIN99Background(canvasContex,fixedColor);
            break;
    }
  }




}

function hueInit_Worker(){

  var fixV1 = undefined;
  var fixV2 = undefined;
  var fixV3 = undefined;
  if (mouseGrappedKeyID != -1) {
    var fixedColor = undefined;
    switch (mouseGrappedColorSide) {
      case 0:
      // left color
        fixedColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, pathColorspace);
        break;
      default:
        // both colors
        fixedColor = globalCMS1.getRightKeyColor(mouseGrappedKeyID, pathColorspace);
    }
    if(fixedColor!=undefined){
      fixV1 = fixedColor.get1Value();
      fixV2 = fixedColor.get2Value();
      fixV3 = fixedColor.get3Value();
    }

  }

  var workerJSON = {};

  if(browserCanOffscreenCanvas)
    workerJSON['message'] = "draw";
  else
    workerJSON['message'] = "getData";

  workerJSON['pathPlotResolution'] = pathPlotResolution;
  workerJSON['vPlotWidth'] = vPlotWidth;
  workerJSON['space'] = pathColorspace;
  workerJSON['type'] = "Hue";
  workerJSON['fixedColorV1'] = fixV1;
  workerJSON['fixedColorV2'] = fixV2;
  workerJSON['fixedColorV3'] = fixV3;

  drawBackgroundWorker4.postMessage(workerJSON);
}

////////////////////////////////////////////
function init_VPlot() {

  var canvasObj0 = document.getElementById("id_EditPage_PathPlot_Canvas1_0");
  canvasObj0.width = vPlotWidth;
  canvasObj0.height = pathPlotResolution;
  var canvasContex0 = canvasObj0.getContext("2d");

  var canvasObj1 = document.getElementById("id_EditPage_PathPlot_Canvas2_0");
  canvasObj1.width = vPlotWidth;
  canvasObj1.height = pathPlotResolution;
  var canvasContex1 = canvasObj1.getContext("2d");

  var canvasObj2 = document.getElementById("id_EditPage_PathPlot_Canvas3_0");
  canvasObj2.width = vPlotWidth;
  canvasObj2.height = pathPlotResolution;
  var canvasContex2 = canvasObj2.getContext("2d");

  switch (pathColorspace) {
  case "hsv":
    drawVPlot(canvasContex0,0,1);
    drawVPlot(canvasContex1,0,1);
    drawVPlot(canvasContex2,0,1);
   break;
  case "lab":
    drawVPlot(canvasContex0,0,1);
    drawVPlot(canvasContex1,labSpaceRange*-1,labSpaceRange);
    drawVPlot(canvasContex2,labSpaceRange*-1,labSpaceRange);
    break;
  case "din99":
    drawVPlot(canvasContex0,0,1);
    drawVPlot(canvasContex1,rangeA99Neg,rangeA99Pos);
    drawVPlot(canvasContex2,rangeB99Neg,rangeB99Pos);
    break;
  }

}

function init_VPlot_Offscreen(){

  ///// update CMS
  drawBackgroundWorker1.postMessage(globalCMS1JSON);
  drawBackgroundWorker2.postMessage(globalCMS1JSON);
  drawBackgroundWorker3.postMessage(globalCMS1JSON);

  /////
  var workerJSON = {};

  workerJSON['message'] = "draw";
  workerJSON['pathPlotResolution'] = pathPlotResolution;
  workerJSON['vPlotWidth'] = vPlotWidth;
  workerJSON['space'] = pathColorspace;
  workerJSON['type'] = "V1";
  drawBackgroundWorker1.postMessage(workerJSON);

  workerJSON.type = "V2";
  drawBackgroundWorker2.postMessage(workerJSON);

  workerJSON.type = "V3";
  drawBackgroundWorker3.postMessage(workerJSON);


}
////////////////////////////////////////////

function drawElements_HSV_LAB_DIN99() {

  var canvasObj0 = document.getElementById("id_EditPage_PathPlot_Canvas1_2");
  canvasObj0.width = vPlotWidth;
  canvasObj0.height = pathPlotResolution;
  var canvasContex0 = canvasObj0.getContext("2d");
  canvasContex0.clearRect(0, 0, canvasObj0.width, canvasObj0.height);

  var canvasObj1 = document.getElementById("id_EditPage_PathPlot_Canvas2_2");
  canvasObj1.width = vPlotWidth;
  canvasObj1.height = pathPlotResolution;
  var canvasContex1 = canvasObj1.getContext("2d");
  canvasContex1.clearRect(0, 0, canvasObj1.width, canvasObj1.height);

  var canvasObj2 = document.getElementById("id_EditPage_PathPlot_Canvas3_2");
  canvasObj2.width = vPlotWidth;
  canvasObj2.height = pathPlotResolution;
  var canvasContex2 = canvasObj2.getContext("2d");
  canvasContex2.clearRect(0, 0, canvasObj2.width, canvasObj2.height);

  var canvasObj3 = document.getElementById("id_EditPage_PathPlot_SingleCanvas_2");
  canvasObj3.width = pathPlotResolution;
  canvasObj3.height = pathPlotResolution;
  var canvasContex3 = canvasObj3.getContext("2d");
  canvasContex3.clearRect(0, 0, canvasObj3.width, canvasObj3.height);

  /////////////////////////////////////////////////////////////////

  switch (pathColorspace) {
    case "hsv":
      calcHSVElements();
      break;
      case "lab":
        calcLabElements();
        break;
        case "din99":
          calcDIN99Elements();
          break;
    default:
      return;

  }

  drawHueElements(canvasContex3);

  drawVplotElements(canvasContex0,0);
  drawVplotElements(canvasContex1,1);
  drawVplotElements(canvasContex2,2);

  for (var i = pathPlotElementsGroup.children.length - 1; i >= 0; i--) {
    pathPlotElementsGroup.remove(pathPlotElementsGroup.children[i]);
  }

  drawPathplot3DElements();

}

function drawInterpolationLineHSV_LAB_DIN99(isCompareMap) {


  var canvasObj0 = document.getElementById("id_EditPage_PathPlot_Canvas1_1");
  canvasObj0.width = vPlotWidth;
  canvasObj0.height = pathPlotResolution;
  var canvasContex0 = canvasObj0.getContext("2d");
  canvasContex0.clearRect(0, 0, canvasObj0.width, canvasObj0.height);

  var canvasObj1 = document.getElementById("id_EditPage_PathPlot_Canvas2_1");
  canvasObj1.width = vPlotWidth;
  canvasObj1.height = pathPlotResolution;
  var canvasContex1 = canvasObj1.getContext("2d");
  canvasContex1.clearRect(0, 0, canvasObj1.width, canvasObj1.height);

  var canvasObj2 = document.getElementById("id_EditPage_PathPlot_Canvas3_1");
  canvasObj2.width = vPlotWidth;
  canvasObj2.height = pathPlotResolution;
  var canvasContex2 = canvasObj2.getContext("2d");
  canvasContex2.clearRect(0, 0, canvasObj2.width, canvasObj2.height);

  var canvasObj3 = document.getElementById("id_EditPage_PathPlot_SingleCanvas_1");
  canvasObj3.width = pathPlotResolution;
  canvasObj3.height = pathPlotResolution;
  var canvasContex3 = canvasObj3.getContext("2d");
  canvasContex3.clearRect(0, 0, canvasObj3.width, canvasObj3.height);

  /////////////////////////////////////////////////////////////////

  switch (pathColorspace) {
    case "hsv":
      calcInterpolationLine_HSV();
      drawInterpolationLine(canvasContex3,0, 1, false);
      break;
      case "lab":
        calcInterpolationLine_Lab();
        drawInterpolationLine(canvasContex3,1, 2, false);
        break;
        case "din99":
          calcInterpolationLine_DIN99();
          drawInterpolationLine(canvasContex3,1, 2, false);
          break;
    default:
      return;

  }


  drawInterpolationLine_VPlot(canvasContex0, 0);
  drawInterpolationLine_VPlot(canvasContex1, 1);
  drawInterpolationLine_VPlot(canvasContex2, 2);

  draw3DInterpolationLine()



}
