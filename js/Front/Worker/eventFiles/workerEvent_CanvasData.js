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
