

function initOffscreenWorker(){

  var htmlCanvas = document.getElementById("id_EditPage_PathPlot_Canvas1_0");
  var offscreenBackground = htmlCanvas.transferControlToOffscreen();
  var workerJSON = {};
  workerJSON.message = "canvas";
  workerJSON['canvas'] = offscreenBackground;
  drawBackgroundWorker1.postMessage(workerJSON, [offscreenBackground]);

  htmlCanvas = document.getElementById("id_EditPage_PathPlot_Canvas2_0");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas";
  workerJSON['canvas'] = offscreenBackground;
  drawBackgroundWorker2.postMessage(workerJSON, [offscreenBackground]);

  htmlCanvas = document.getElementById("id_EditPage_PathPlot_Canvas3_0");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas";
  workerJSON['canvas'] = offscreenBackground;
  drawBackgroundWorker3.postMessage(workerJSON, [offscreenBackground]);

  htmlCanvas = document.getElementById("id_EditPage_PathPlot_SingleCanvas_0");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas";
  workerJSON['canvas'] = offscreenBackground;
  drawBackgroundWorker4.postMessage(workerJSON, [offscreenBackground]);

}

function initWorker(){

  if(!browserCanWorker)
    return;

  drawBackgroundWorker1.postMessage({'message':'init'});
  drawBackgroundWorker2.postMessage({'message':'init'});
  drawBackgroundWorker3.postMessage({'message':'init'});
  drawBackgroundWorker4.postMessage({'message':'init'});

  drawBackgroundWorker1.addEventListener('message', workerEvent_DrawCanvasData, false);
  drawBackgroundWorker2.addEventListener('message', workerEvent_DrawCanvasData, false);
  drawBackgroundWorker3.addEventListener('message', workerEvent_DrawCanvasData, false);
  drawBackgroundWorker4.addEventListener('message', workerEvent_DrawCanvasData, false);

  inform_Worker_ColorblindSimulation();
  inform_Worker_PathPlotBackgroundParams();
  inform_Worker_ColorSettings();
  inform_Worker_ColorMetrics();

  if(browserCanOffscreenCanvas)
    initOffscreenWorker(); // Global Events -> WorkerDependent -> others

}
