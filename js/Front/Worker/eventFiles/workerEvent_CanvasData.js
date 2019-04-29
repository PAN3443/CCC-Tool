function workerEvent_DrawCanvasData(e) {

  var canvas = document.getElementById(e.data.canvasID);
  canvas.width = e.data.imageData.width;
  canvas.height = e.data.imageData.height;

  var canvasContex = canvas.getContext("2d");
  canvasContex.clearRect(0, 0, canvas.width, canvas.height);
  canvasContex.putImageData(e.data.imageData, 0, 0);

  switch (e.data.additionalFct) {
    case 0:
      rgbPlot(canvasContex, canvas.width, canvas.height, e.data.optionA, e.data.optionB);
    break;

  }


}


function workerEvent_DrawInterpolationLine(e) {

  ////////////////////////////
  /// ELEMENTS
  var canvasElements = document.getElementById(e.data.canvasID2);

  if(e.data.vPlotWidth==undefined){
    // => RGB or Hue Plot
    pathPlotResolution = e.data.pathPlotResolution;
    canvasElements.width = pathPlotResolution;
    canvasElements.height = pathPlotResolution;
  }
  else {
    vPlotWidth = e.data.vPlotWidth;
    pathPlotResolution = e.data.pathPlotResolution;
    canvasElements.width = vPlotWidth;
    canvasElements.height = pathPlotResolution;
  }

  var canvasElementsContex = canvasElements.getContext("2d");
  canvasElementsContex.clearRect(0, 0, canvasElements.width, canvasElements.height);

  pathplotElementPositions = e.data.pathplotElementPositions;
  drawRGBElements(canvasElementsContex, e.data.index1, e.data.index2);

  if(e.data.do3D){
    for (var i = pathPlotElementsGroup.children.length - 1; i >= 0; i--) {
      pathPlotElementsGroup.remove(pathPlotElementsGroup.children[i]);
    }
    drawRGB3DElements();
  }

  ////////////////////////////
  /// Interpolation line
  if(e.data.drawInterpolationLine){

    var canvasInterpolationLine = document.getElementById(e.data.canvasID);
    canvasInterpolationLine.width = e.data.canvasSize;
    canvasInterpolationLine.height = e.data.canvasSize;

    if(e.data.vPlotWidth==undefined){
      // => RGB or Hue Plot
      canvasInterpolationLine.width = pathPlotResolution;
      canvasInterpolationLine.height = pathPlotResolution;
    }
    else {
      canvasInterpolationLine.width = vPlotWidth;
      canvasInterpolationLine.height = pathPlotResolution;
    }

    var canvasInterpolationLineContex = canvasInterpolationLine.getContext("2d");
    canvasInterpolationLineContex.clearRect(0, 0, canvasInterpolationLine.width, canvasInterpolationLine.height);

    pathplotLines=e.data.pathplotLines;
    pathplotLinesDashed=e.data.pathplotLinesDashed;

    drawInterpolationLine_RGB(canvasInterpolationLineContex, 0, 1,e.data.isRGB);
    drawInterpolationLine_RGB(canvasInterpolationLineContex, 0, 1,e.data.isRGB);

    if(e.data.do3D)
      draw3DInterpolationLine();

  }


}
