

function initOffscreenWorker(){
  var htmlCanvas = document.getElementById("id_EditPage_PathPlot_Canvas1_0");
  var offscreenBackground = htmlCanvas.transferControlToOffscreen();
  var workerJSON = {};
  workerJSON.message = "canvas";
  workerJSON['canvas'] = offscreenBackground;
  drawBackgroundWorker1.postMessage(workerJSON, [offscreenBackground]);
  drawBackgroundWorker1.postMessage({'message':'init'});

  htmlCanvas = document.getElementById("id_EditPage_PathPlot_Canvas2_0");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas";
  workerJSON['canvas'] = offscreenBackground;
  drawBackgroundWorker2.postMessage(workerJSON, [offscreenBackground]);
  drawBackgroundWorker2.postMessage({'message':'init'});

  htmlCanvas = document.getElementById("id_EditPage_PathPlot_Canvas3_0");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas";
  workerJSON['canvas'] = offscreenBackground;
  drawBackgroundWorker3.postMessage(workerJSON, [offscreenBackground]);
  drawBackgroundWorker3.postMessage({'message':'init'});

  inform_Worker_ColorblindSimulation();
}


function inform_Worker_ColorblindSimulation(){

    if(!browserCanWorker)
      return;

    var workerJSON = {};
    workerJSON['message'] = "colorSimSettings";
    workerJSON['doColorblindnessSim'] = doColorblindnessSim;
    workerJSON['tmXYZ_Selected'] = tmXYZ_Selected;
    workerJSON['tmXYZ_Selected_Inv'] = tmXYZ_Selected_Inv;
    workerJSON['tmLMS_Selected'] = tmLMS_Selected;
    workerJSON['tmLMS_Selected_Inv'] = tmLMS_Selected_Inv;
    workerJSON['sim_AdaptiveColorblindness'] = sim_AdaptiveColorblindness;



    drawBackgroundWorker1.postMessage(workerJSON);
    drawBackgroundWorker2.postMessage(workerJSON);
    drawBackgroundWorker3.postMessage(workerJSON);


}
