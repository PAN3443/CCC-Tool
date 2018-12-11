function showHideHistogram(){

  if (!document.getElementById("id_dropDownMenue_ShowHistogram").classList.contains('dropdownNotActiveMenuButton')){

    if(document.getElementById("id_EditPage_Histogram_Div").style.display=="none"){
      document.getElementById("id_EditPage_Histogram_Div").style.display="block";
      document.getElementById("id_EditPage_Mapping_HistoButton").style.background = styleActiveColor;
      document.getElementById("id_dropDownMenue_ShowHistogram").innerHTML="&#9673; Histogram";
      document.getElementById("id_EditPage_DrawMappingDiv").style.height="25.5vh";
      drawHistogram(false);
    }
    else {
      document.getElementById("id_EditPage_Histogram_Div").style.display="none";
      document.getElementById("id_EditPage_DrawMappingDiv").style.height="55vh";
      document.getElementById("id_EditPage_Mapping_HistoButton").style.background = styleNotActiveColor;
      document.getElementById("id_dropDownMenue_ShowHistogram").innerHTML="&#9675; Histogram";
    }

  }
  else{
    document.getElementById("id_EditPage_Histogram_Div").style.display="none";
    document.getElementById("id_EditPage_DrawMappingDiv").style.height="55vh";
    document.getElementById("id_EditPage_Mapping_HistoButton").style.background = styleNotActiveColor;
  }

  updateMappingSize();

  document.getElementById("id_dropDownContainer").style.display="none";
}

function drawHistogram(onlyMapUpdate){


  var rangeStart;
  var rangeEnd;
  if(document.getElementById("id_EditPage_SelectFullDataHistogram").checked){
    rangeStart = globalDomain.getMinField(currentFieldIndex);
    rangeEnd = globalDomain.getMaxField(currentFieldIndex);
  }
  else{
    rangeStart = globalDomain.getMinTimeStep(currentFieldIndex,currentTimeIndex);
    rangeEnd = globalDomain.getMaxTimeStep(currentFieldIndex,currentTimeIndex);
  }

  if(onlyMapUpdate==false){

    var canvasPlot = document.getElementById("id_EditPage_CMS_VIS_Histogramm");
    var rect = canvasPlot.getBoundingClientRect();
    var rangeWidth = 25;//Math.round(canvasPlot.width/(numberRanges));
    var numberRanges = parseInt(document.getElementById("id_EditPage_NumberHistoRanges").value);
    if(numberRanges==0 || numberRanges==NaN){
      return;
    }

    canvasPlot.width = numberRanges*rangeWidth;//rect.width;
    canvasPlot.height = rect.height;

    var plotWidth = canvasPlot.width;
    var plotHeight = canvasPlot.height;
    var xStart = Math.round((canvasPlot.width-plotWidth)/2);
    var yStart = plotHeight;
    var mapHeight = canvasPlot.height-plotHeight;

    var canvasCtx = canvasPlot.getContext("2d");

    canvasCtx.mozImageSmoothingEnabled = false;
    canvasCtx.webkitImageSmoothingEnabled = false;
    canvasCtx.msImageSmoothingEnabled = false;
    canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
    canvasCtx.oImageSmoothingEnabled = false;

    canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);

    var fullDis = rangeEnd-rangeStart;
    var rangeDis = Math.abs(fullDis/(numberRanges));

    var arrayRanges = [];
    var histoCounter = [];


    for (var i = 0; i < numberRanges; i++) {
      arrayRanges.push(rangeStart+(i*rangeDis));
      histoCounter.push(0);
    }
    arrayRanges.push(rangeEnd);

 var counter = 0;
    //// get Histogram values
    if(document.getElementById("id_EditPage_SelectFullDataHistogram").checked){
      for (var i = 0; i < globalDomain.getNumberOfFieldValues(currentFieldIndex); i++) {
        var tmpVal = globalDomain.getFieldValue(currentFieldIndex, i);

        if(tmpVal==undefined)
          continue;


        for (var j = 0; j < arrayRanges.length-1; j++) {
          if(tmpVal>=arrayRanges[j] && tmpVal<=arrayRanges[j+1]){
            histoCounter[j]++;
            break;
          }
        }
      }

    }
    else{
      for (var i = 0; i < globalDomain.getNumValPerTime(currentFieldIndex); i++) {
        var tmpVal = globalDomain.getFieldTimeValue(currentFieldIndex,currentTimeIndex, i);
        if(tmpVal==undefined)
        continue;

        for (var j = 0; j < arrayRanges.length-1; j++) {
          if(tmpVal>=arrayRanges[j] && tmpVal<=arrayRanges[j+1]){
            histoCounter[j]++;
            break;
          }
        }
      }
    }

    var maxValue = 0;
    for (var i = 0; i < histoCounter.length; i++) {
      maxValue=Math.max(maxValue,histoCounter[i])
    }

    var currentPos = 0;
    var lastYPos = canvasPlot.height;
    for (var j = 0; j < arrayRanges.length; j++) {
        var tmpHeight = Math.round((canvasPlot.height*(histoCounter[j]/maxValue)));
        canvasCtx.fillStyle="rgb(80,80,80)";//styleActiveColor;
        canvasCtx.strokeStyle="black";
        canvasCtx.lineWidth=1;
        canvasCtx.fillRect(currentPos,canvasPlot.height-tmpHeight,rangeWidth,tmpHeight);
        /*canvasCtx.rect(currentPos,canvasPlot.height-tmpHeight,rangeWidth,tmpHeight);
        canvasCtx.stroke();*/

        /*canvasCtx.beginPath();
        canvasCtx.moveTo(currentPos,lastYPos);
        lastYPos = canvasPlot.height-tmpHeight;
        canvasCtx.lineTo(currentPos,lastYPos);
        canvasCtx.stroke();


        canvasCtx.beginPath();
        canvasCtx.moveTo(currentPos,lastYPos);
        canvasCtx.lineTo(currentPos+rangeWidth,lastYPos);
        canvasCtx.stroke();*/


        currentPos+=rangeWidth;
    }

    canvasCtx.beginPath();
    canvasCtx.moveTo(currentPos,lastYPos);
    canvasCtx.lineTo(currentPos,canvasPlot.height);
    canvasCtx.stroke();

  }

  drawHistogramMap(rangeStart,rangeEnd);

  /// draw Inter
  document.getElementById("id_EditPage_HistoMinVal").innerHTML = rangeStart;
  document.getElementById("id_EditPage_HistoMaxVal").innerHTML = rangeEnd;
}




function drawHistogramMap(rangeStart,rangeEnd){

  var canvasPlot = document.getElementById("id_EditPage_CMS_VIS_HistogrammCMS");
  var rect = canvasPlot.getBoundingClientRect();

  canvasPlot.width = rect.width;
  canvasPlot.height = 1;

  var canvasCtx = canvasPlot.getContext("2d");

  canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);

  var canvasData = canvasCtx.getImageData(0, 0, canvasPlot.width, canvasPlot.height);

  var range = rangeEnd-rangeStart;

  var workCMS;

  if(document.getElementById("id_EditPage_MappingCMS_Select").selectedIndex==0){
    workCMS = cloneCMS(globalCMS1);
  }
  else{
    workCMS = globalCMS1.getProbeSet(document.getElementById("id_EditPage_MappingCMS_Select").selectedIndex-1).generateProbeCMS(globalCMS1);
  }

  for (var x = 0; x < canvasPlot.width; x++) {
    var value = x / canvasPlot.width * range + rangeStart;

    var tmpCurrentColor = workCMS.calculateColor(value);

      var index = x * 4;
      //var index = ((xStart+x) + y * canvasWidth) * 4;
      canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      canvasData.data[index + 3] = 255; //a

  }

  canvasCtx.putImageData(canvasData, 0, 0);

  var start = workCMS.getKey(0).getRefPosition();
  var end = workCMS.getKey(workCMS.getKeyLength()-1).getRefPosition();

  if(start >= rangeEnd || end <= rangeStart){
    document.getElementById("id_EditPage_HistogramCMSFitLabel").innerHTML = "Colormap is covering 0% of the Data-Range.";
  }
  else{

      if( start <= rangeStart){
        start=rangeStart;
      }

      if( end >= rangeEnd){
        end=rangeEnd;
      }

      var ratio = ((end-start)/range)*100;


      document.getElementById("id_EditPage_HistogramCMSFitLabel").innerHTML = "Colormap is covering "+ratio+"% of the Data-Range.";
  }

}

function updateHistogramChange(){
  checkInputVal(document.getElementById("id_EditPage_NumberHistoRanges"), false, false);

  if(document.getElementById("id_EditPage_NumberHistoRanges")!="")
  drawHistogram(false);
}

function updateHistogramKey(event){
  checkInputVal(document.getElementById("id_EditPage_NumberHistoRanges"), false, false);

  if (event.keyCode == 13) {
    if(document.getElementById("id_EditPage_NumberHistoRanges")!="")
    drawHistogram(false);
  }

}
