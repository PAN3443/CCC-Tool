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

  var canvas = document.getElementById(e.data.canvasID);
  canvas.width = e.data.canvasSize;
  canvas.height = e.data.canvasSize;

  var canvasContex = canvas.getContext("2d");
  canvasContex.clearRect(0, 0, canvas.width, canvas.height);


  drawInterpolationLine(canvasContex,e.data.canvasSize,e.data.pathplotLines, false, 0, 1);
  drawInterpolationLine(canvasContex,e.data.canvasSize,e.data.pathplotLinesDashed, true, 0, 1);

  if(e.data.do3D){
    for (var i = pathPlotLineGroup.children.length - 1; i >= 0; i--) {
      pathPlotLineGroup.remove(pathPlotLineGroup.children[i]);
    }
    
    draw3DInterpolationLine(e.data.pathplotLines,false);
    draw3DInterpolationLine(e.data.pathplotLinesDashed,true);
  }

}
