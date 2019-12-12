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
          canvasCtx.fillStyle= getComputedStyle(document.documentElement).getPropertyValue('--general-active-color');
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
      document.getElementById("id_reportPageLabelDiv").style.visibility = "visible";
      document.getElementById("id_testPageLabel").innerHTML = "Test".bold()+" : Report/Optimization";
      testingModus=2;
      reportModus=0;
      switchReportDisplay();

      if(!hasDrawnReportCMS){
        drawCanvasColormap("id_TestPage_DifReportColormap", reportColorValueDifColormap);
        hasDrawnReportCMS=true;
      }


      updateReportList(e.data.arrayIndex);

    break;
  }

}


function workerEvent_GetReport(e){

  switch (e.data.type) {
    case 0:
      switch (e.data.subtype) {
        case "reportIMG":
          var canvas = document.getElementById(e.data.canvasID);
          canvas.width = e.data.imageData.width;
          canvas.height = e.data.imageData.height;

          var canvas2 = document.getElementById(e.data.canvasID+"_Pixel");
          canvas2.width = e.data.imageData.width;
          canvas2.height = e.data.imageData.height;

          var canvasContex = canvas.getContext("2d");
          canvasContex.clearRect(0, 0, canvas.width, canvas.height);
          canvasContex.putImageData(e.data.imageData, 0, 0);
          break;
          case "statistics":

          valueDifInfo = e.data.valueDifInfo;
          colorDifInfo = e.data.colorDifInfo;
          valueRatioInfo = e.data.valueRatioInfo;
          colorRatioInfo = e.data.colorRatioInfo;
          subtractionInfo = e.data.subtractionInfo;

          var valueDifStat = e.data.valueDifStat;
          var colorDifStat = e.data.colorDifStat;
          var valueRatioStat = e.data.valueRatioStat;
          var colorRatioStat = e.data.colorRatioStat;
          var subtractionStat = e.data.subtractionStat;

          document.getElementById("id_ratioReportValueDifMax").innerHTML = valueDifStat[1].toFixed(3)+" ("+valueRatioStat[1].toFixed(3)+")";
          document.getElementById("id_ratioReportValueDifMin").innerHTML = valueDifStat[0].toFixed(3)+" ("+valueRatioStat[0].toFixed(3)+")";
          document.getElementById("id_ratioReportValueDifAvg").innerHTML = valueDifStat[2].toFixed(3)+" ("+valueRatioStat[2].toFixed(3)+")";
          document.getElementById("id_ratioReportValueDifVar").innerHTML = valueDifStat[3].toFixed(3)+" ("+valueRatioStat[3].toFixed(3)+")";
          document.getElementById("id_ratioReportValueDifDev").innerHTML = valueDifStat[4].toFixed(3)+" ("+valueRatioStat[4].toFixed(3)+")";
          document.getElementById("id_ratioReportValueDifMax").title = valueDifStat[1]+" ("+valueRatioStat[1]+")";
          document.getElementById("id_ratioReportValueDifMin").title = valueDifStat[0]+" ("+valueRatioStat[0]+")";
          document.getElementById("id_ratioReportValueDifAvg").title = valueDifStat[2]+" ("+valueRatioStat[2]+")";
          document.getElementById("id_ratioReportValueDifVar").title = valueDifStat[3]+" ("+valueRatioStat[3]+")";
          document.getElementById("id_ratioReportValueDifDev").title = valueDifStat[4]+" ("+valueRatioStat[4]+")";

          document.getElementById("id_ratioReportColorDifMax").innerHTML = colorDifStat[1].toFixed(3)+" ("+colorRatioStat[1].toFixed(3)+")";
          document.getElementById("id_ratioReportColorDifMin").innerHTML = colorDifStat[0].toFixed(3)+" ("+colorRatioStat[0].toFixed(3)+")";
          document.getElementById("id_ratioReportColorDifAvg").innerHTML = colorDifStat[2].toFixed(3)+" ("+colorRatioStat[2].toFixed(3)+")";
          document.getElementById("id_ratioReportColorDifVar").innerHTML = colorDifStat[3].toFixed(3)+" ("+colorRatioStat[3].toFixed(3)+")";
          document.getElementById("id_ratioReportColorDifDev").innerHTML = colorDifStat[4].toFixed(3)+" ("+colorRatioStat[4].toFixed(3)+")";
          document.getElementById("id_ratioReportColorDifMax").title = colorDifStat[1]+" ("+colorRatioStat[1]+")";
          document.getElementById("id_ratioReportColorDifMin").title = colorDifStat[0]+" ("+colorRatioStat[0]+")";
          document.getElementById("id_ratioReportColorDifAvg").title = colorDifStat[2]+" ("+colorRatioStat[2]+")";
          document.getElementById("id_ratioReportColorDifVar").title = colorDifStat[3]+" ("+colorRatioStat[3]+")";
          document.getElementById("id_ratioReportColorDifDev").title = colorDifStat[4]+" ("+colorRatioStat[4]+")";

          document.getElementById("id_ratioReportSubMax").innerHTML = subtractionStat[1].toFixed(3);
          document.getElementById("id_ratioReportSubMin").innerHTML = subtractionStat[0].toFixed(3);
          document.getElementById("id_ratioReportSubAvg").innerHTML = subtractionStat[2].toFixed(3);
          document.getElementById("id_ratioReportSubVar").innerHTML = subtractionStat[3].toFixed(3);
          document.getElementById("id_ratioReportSubDev").innerHTML = subtractionStat[4].toFixed(3);
          document.getElementById("id_ratioReportSubMax").title = subtractionStat[1];
          document.getElementById("id_ratioReportSubMin").title = subtractionStat[0];
          document.getElementById("id_ratioReportSubAvg").title = subtractionStat[2];
          document.getElementById("id_ratioReportSubVar").title = subtractionStat[3];
          document.getElementById("id_ratioReportSubDev").title = subtractionStat[4];

          fillSubReportTable(undefined,undefined);

          break;
      }
  }

}
