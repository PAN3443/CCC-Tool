function workerEvent_DrawPreviewTestfunction(e) {

  var canvas = document.getElementById(e.data.canvasID);
  canvas.width = e.data.imageData.width;
  canvas.height = e.data.imageData.height;

  var canvasContex = canvas.getContext("2d");
  canvasContex.clearRect(0, 0, canvas.width, canvas.height);
  canvasContex.putImageData(e.data.imageData, 0, 0);

}


function workerEvent_DrawTestfunction(e) {

  switch (e.data.type) {
    case "pixel":
      var canvas = document.getElementById(e.data.canvasID);
      canvas.width = e.data.imageData.width;
      canvas.height = e.data.imageData.height;

      var canvasContex = canvas.getContext("2d");
      canvasContex.clearRect(0, 0, canvas.width, canvas.height);
      canvasContex.putImageData(e.data.imageData, 0, 0);

      var canvasFull = document.getElementById(e.data.canvasIDFull);
      canvasFull.width = e.data.imageData.width;
      canvasFull.height = e.data.imageData.height;

      var canvasContexFull = canvasFull.getContext("2d");
      canvasContexFull.clearRect(0, 0, canvasFull.width, canvasFull.height);
      canvasContexFull.putImageData(e.data.imageData, 0, 0);

      var canvasGrey = document.getElementById(e.data.canvasIDGrey);
      canvasGrey.width = e.data.imageDataGrey.width;
      canvasGrey.height = e.data.imageDataGrey.height;

      var canvasContexGrey = canvasGrey.getContext("2d");
      canvasContexGrey.clearRect(0, 0, canvasGrey.width, canvasGrey.height);
      canvasContexGrey.putImageData(e.data.imageDataGrey, 0, 0);

      var canvasGreyFull = document.getElementById(e.data.canvasIDGreyFull);
      canvasGreyFull.width = e.data.imageDataGrey.width;
      canvasGreyFull.height = e.data.imageDataGrey.height;

      var canvasContexGreyFull = canvasGreyFull.getContext("2d");
      canvasContexGreyFull.clearRect(0, 0, canvasGreyFull.width, canvasGreyFull.height);
      canvasContexGreyFull.putImageData(e.data.imageDataGrey, 0, 0);
      break;
    case "mesh":
      drawTransfered_Mesh(e.data.testMappingMeshData); // js/Front/Sections/Testing/3D_TestVis/testImageMapping.js
    break;
    case "noiseExample":
      var canvas = document.getElementById(e.data.canvasID);
      canvas.width = e.data.imageData.width;
      canvas.height = e.data.imageData.height;

      var canvasContex = canvas.getContext("2d");
      canvasContex.clearRect(0, 0, canvas.width, canvas.height);
      canvasContex.putImageData(e.data.imageData, 0, 0);
    break;
    case "noiseHisto":
      var canvas = document.getElementById(e.data.canvasID);
      var rect = canvas.getBoundingClientRect();

      var rangeWidth = 25;
      canvas.width = e.data.histoData.length*rangeWidth; //rect.width/numOfBars;
      canvas.height = rect.height;

      var xStart = 0;
      var yStart = canvas.height;

      var canvasCtx = canvas.getContext("2d");
      canvasCtx.mozImageSmoothingEnabled = false;
      canvasCtx.webkitImageSmoothingEnabled = false;
      canvasCtx.msImageSmoothingEnabled = false;
      canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
      canvasCtx.oImageSmoothingEnabled = false;
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      var currentPos = 0;
      for (var j = 0; j < e.data.histoData.length; j++) {
          var tmpHeight = Math.round((canvas.height*e.data.histoData[j]));
          canvasCtx.fillStyle="rgb(80,80,80)";
          canvasCtx.strokeStyle="black";
          canvasCtx.lineWidth=1;
          canvasCtx.fillRect(currentPos,canvas.height-tmpHeight,rangeWidth,tmpHeight);
          currentPos+=rangeWidth;
      }
    break;
    case "sendTestfield":

      reportListTestField[e.data.arrayIndex]=e.data.testField;

      document.getElementById("id_Test_FunctionCollection").style.width = "0vw";
      document.getElementById("id_Test_TestDiv").style.width = "0vw";
      document.getElementById("id_Test_ReportDiv").style.width = "100vw";
      document.getElementById("id_Test_pageSwitchStatus2").style.visibility = "visible";
      document.getElementById("id_Test_pageSwitchStatus2").innerHTML = "&#x25C9;";
      document.getElementById("id_Test_pageSwitchStatus0").innerHTML = "&#x25CE;";
      document.getElementById("id_Test_pageSwitchStatus1").innerHTML = "&#x25CE;";
      document.getElementById("id_Test_pageSwitchLeft").style.visibility = "visible";
      document.getElementById("id_Test_pageSwitchRight").style.visibility = "hidden";
      testingModus=2;

      updateReportList(e.data.arrayIndex);

    break;
  }

}


function workerEvent_GetReport(e){

  switch (e.data.type) {
    case 0:
      console.log(e.data.canvasID);

      var canvas = document.getElementById(e.data.canvasID);
      canvas.width = e.data.imageData.width;
      canvas.height = e.data.imageData.height;

      var canvasContex = canvas.getContext("2d");
      canvasContex.clearRect(0, 0, canvas.width, canvas.height);
      canvasContex.putImageData(e.data.imageData, 0, 0);
      break;
    default:

  }

}
