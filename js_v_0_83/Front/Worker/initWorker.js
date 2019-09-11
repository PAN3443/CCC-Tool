

function initOffscreenWorker(){

  //////////////// Path Plot Background /////////////////////
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

  //////////////// Path Plot Elements /////////////////////
  htmlCanvas = document.getElementById("id_EditPage_PathPlot_Canvas1_1");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas";
  workerJSON['canvas'] = offscreenBackground;
  drawInterpolationLineWorker1.postMessage(workerJSON, [offscreenBackground]);

  htmlCanvas = document.getElementById("id_EditPage_PathPlot_Canvas2_1");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas";
  workerJSON['canvas'] = offscreenBackground;
  drawInterpolationLineWorker2.postMessage(workerJSON, [offscreenBackground]);

  htmlCanvas = document.getElementById("id_EditPage_PathPlot_Canvas3_1");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas";
  workerJSON['canvas'] = offscreenBackground;
  drawInterpolationLineWorker3.postMessage(workerJSON, [offscreenBackground]);

  htmlCanvas = document.getElementById("id_EditPage_PathPlot_SingleCanvas_1");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas";
  workerJSON['canvas'] = offscreenBackground;
  drawInterpolationLineWorker4.postMessage(workerJSON, [offscreenBackground]);

  //////////////// Path Plot Interpolation Line /////////////////////
  htmlCanvas = document.getElementById("id_EditPage_PathPlot_Canvas1_2");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas2";
  workerJSON['canvas'] = offscreenBackground;
  drawInterpolationLineWorker1.postMessage(workerJSON, [offscreenBackground]);

  htmlCanvas = document.getElementById("id_EditPage_PathPlot_Canvas2_2");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas2";
  workerJSON['canvas'] = offscreenBackground;
  drawInterpolationLineWorker2.postMessage(workerJSON, [offscreenBackground]);

  htmlCanvas = document.getElementById("id_EditPage_PathPlot_Canvas3_2");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas2";
  workerJSON['canvas'] = offscreenBackground;
  drawInterpolationLineWorker3.postMessage(workerJSON, [offscreenBackground]);

  htmlCanvas = document.getElementById("id_EditPage_PathPlot_SingleCanvas_2");
  offscreenBackground = htmlCanvas.transferControlToOffscreen();
  workerJSON.message = "canvas2";
  workerJSON['canvas'] = offscreenBackground;
  drawInterpolationLineWorker4.postMessage(workerJSON, [offscreenBackground]);


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

  drawInterpolationLineWorker1.postMessage({'message':'init'});
  drawInterpolationLineWorker2.postMessage({'message':'init'});
  drawInterpolationLineWorker3.postMessage({'message':'init'});
  drawInterpolationLineWorker4.postMessage({'message':'init'});
  drawInterpolationLineWorker1.addEventListener('message', workerEvent_DrawInterpolationLine, false);
  drawInterpolationLineWorker2.addEventListener('message', workerEvent_DrawInterpolationLine, false);
  drawInterpolationLineWorker3.addEventListener('message', workerEvent_DrawInterpolationLine, false);
  drawInterpolationLineWorker4.addEventListener('message', workerEvent_DrawInterpolationLine, false);


  /////////////////////////////////////
  testpreviewWorker_CCCTest.postMessage({'message':'init', 'initOption1' : 'CCCTest'});
  testpreviewWorker_Collection.postMessage({'message':'init', 'initOption1' : 'Collection'});
  testpreviewWorker_RealWorldData.postMessage({'message':'init', 'initOption1' : 'RealData'});
  testpreviewWorker_CCCTest.addEventListener('message', workerEvent_DrawPreviewTestfunction, false);
  testpreviewWorker_Collection.addEventListener('message', workerEvent_DrawPreviewTestfunction, false);
  testpreviewWorker_RealWorldData.addEventListener('message', workerEvent_DrawPreviewTestfunction, false);

  testfunctionWorker_InteractiveTest.postMessage({'message':'init'});
  testfunctionWorker_InteractiveTest.addEventListener('message', workerEvent_DrawTestfunction, false);
  init_Worker_SingleTesting_LoadRealWorld();

  testfunctionWorker_Report0.postMessage({'message':'init','reportType':0});
  testfunctionWorker_Report0.addEventListener('message', workerEvent_GetReport, false);

  inform_Worker_ColorblindSimulation();
  inform_Worker_PathPlotBackgroundParams();
  inform_Worker_ColorSettings();
  inform_Worker_ColorMetrics();

  // Define CMS for Testing Report
  testfunctionWorker_Report0.postMessage({'message':'defineReportCMS'});

  if(browserCanOffscreenCanvas)
    initOffscreenWorker(); // Global Events -> WorkerDependent -> others

}


function init_Worker_SingleTesting_LoadRealWorld(){

  for (var i = 0; i < medicalFiles.length; i++) {

        var url = "resource/realWorldData/medicalData/"+medicalFiles[i];
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = (function(index) {
        return function () {
          var workerJSON = {};
          workerJSON['message'] = "pushRealWorldData";
          workerJSON['type'] = "medical";
          workerJSON['index'] = index;
          workerJSON['imgData'] = getCanvasImgData(this);
          testfunctionWorker_InteractiveTest.postMessage(workerJSON);
        };
      })(i);

      img.src = url;
  }

  for (var i = 0; i < scientificFlowSimFiles.length; i++) {

        var url = "resource/realWorldData/scientificFlowSimulation/"+scientificFlowSimFiles[i];
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = (function(index) {
        return function () {
          var workerJSON = {};
          workerJSON['message'] = "pushRealWorldData";
          workerJSON['type'] = "scientificFlowSim";
          workerJSON['index'] = index;
          workerJSON['imgData'] = getCanvasImgData(this);
          testfunctionWorker_InteractiveTest.postMessage(workerJSON);
        };
      })(i);

      img.src = url;
  }

  for (var i = 0; i < photographsFiles.length; i++) {

        var url = "resource/realWorldData/photographs/"+photographsFiles[i];
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = (function(index) {
        return function () {
          var workerJSON = {};
          workerJSON['message'] = "pushRealWorldData";
          workerJSON['type'] = "photographs";
          workerJSON['index'] = index;
          workerJSON['imgData'] = getCanvasImgData(this);
          testfunctionWorker_InteractiveTest.postMessage(workerJSON);
        };
      })(i);

      img.src = url;
  }

}
