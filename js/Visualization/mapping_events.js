

function updateDomainCMSRange(){

  globalCMS1.setAutoRange(globalDomain.getMinField(currentFieldIndex),globalDomain.getMaxField(currentFieldIndex));
  orderColorSketch();

}


function updateProgressBar(status){

  //document.getElementById("id_processBar").style.width = status+"%";
  document.getElementById("mappingProcessBar").value = status;

  //console.log(status, document.getElementById("id_processBar").style.width );
}

function showHideMappingContainer(type){

  switch (type) {
    case 0:
      if(document.getElementById("showHideMappingOptions").style.display==="none"){
        document.getElementById("showHideMappingOptions").style.display="inline-block";
        document.getElementById("showHideMappingOptionsText").innerHTML="Hide Mapping Options &#8661;";
      }else{
        document.getElementById("showHideMappingOptions").style.display="none";
        document.getElementById("showHideMappingOptionsText").innerHTML="Show Mapping Options &#8661;";
      }
      break;
      case 1:
      if(document.getElementById("showHideMappingHistogram").style.display==="none"){
        document.getElementById("showHideMappingHistogram").style.display="inline-block";
        document.getElementById("showHideMappingHistogramText").innerHTML="Hide Histogram &#8661;";
        drawHistogram(false);
      }else{
        document.getElementById("showHideMappingHistogram").style.display="none";
        document.getElementById("showHideMappingHistogramText").innerHTML="Show Histogram &#8661;";
      }
      break;
      case 2:
      if(document.getElementById("showHideMappingVisualization").style.display==="none"){
        document.getElementById("showHideMappingVisualization").style.display="inline-block";
        document.getElementById("showHideMappingVisualizationText").innerHTML="Hide Visualization &#8661;";
      }else{
        document.getElementById("showHideMappingVisualization").style.display="none";
        document.getElementById("showHideMappingVisualizationText").innerHTML="Show Visualization &#8661;";
      }
      break;
      case 3:
      if(document.getElementById("showHideColorBlindnessSim").style.display==="none"){
        document.getElementById("showHideColorBlindnessSim").style.display="inline-block";
        document.getElementById("showHideColorBlindnessSimText").innerHTML="Hide Colorblindness Simulation &#8661;";
      }else{
        document.getElementById("showHideColorBlindnessSim").style.display="none";
        document.getElementById("showHideColorBlindnessSimText").innerHTML="Show Colorblindness Simulation &#8661;";
      }
      break;
    default:

  }

  orderColorSketch(colorspaceModus);
}


function changeField(){

  currentFieldIndex=document.getElementById("combobox_selectField").selectedIndex;
  currentTimeIndex=0;

  var selectobject=document.getElementById("combobox_selectTimeStep")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }

  for (var i = 1; i <= globalDomain.getNumberOfTimeSteps(currentFieldIndex); i++) {
    var option = document.createElement("option");
    option.text = i+"";
    selectobject.add(option);
  }

  document.getElementById("id_fieldMinValue").innerHTML = globalDomain.getMinField(currentFieldIndex);
  document.getElementById("id_fieldMaxValue").innerHTML = globalDomain.getMaxField(currentFieldIndex);

  globalDomain.generateCells(currentFieldIndex,currentTimeIndex);

  doneWorkerPreparation=false;
  drawMapping();

  if(document.getElementById("showHideMappingHistogram").style.display!="none")
  drawHistogram(false);
}

function changeTimeStep(){
  currentTimeIndex=document.getElementById("combobox_selectTimeStep").selectedIndex;
  globalDomain.generateCells(currentFieldIndex,currentTimeIndex);
  doneWorkerPreparation=false;
  drawMapping();

  if(document.getElementById("showHideMappingHistogram").style.display!="none")
  drawHistogram(false);
}


function drawHistogram(onlyMapUpdate){


  var rangeStart;
  var rangeEnd;
  if(document.getElementById("histogram_SelectFullData").checked){
    rangeStart = globalDomain.getMinField(currentFieldIndex);
    rangeEnd = globalDomain.getMaxField(currentFieldIndex);
  }
  else{
    rangeStart = globalDomain.getMinTimeStep(currentFieldIndex,currentTimeIndex);
    rangeEnd = globalDomain.getMaxTimeStep(currentFieldIndex,currentTimeIndex);
  }

  if(onlyMapUpdate==false){

    var canvasPlot = document.getElementById("id_HistogramCanvas");
    var rect = canvasPlot.getBoundingClientRect();
    var rangeWidth = 25;//Math.round(canvasPlot.width/(numberRanges));
    var numberRanges = parseInt(document.getElementById("idNumberHistoRanges").value);
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
    if(document.getElementById("histogram_SelectFullData").checked){
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
        canvasCtx.fillStyle=styleActiveColor;
        canvasCtx.strokeStyle="black";
        canvasCtx.lineWidth=1;
        canvasCtx.fillRect(currentPos,canvasPlot.height-tmpHeight,rangeWidth,tmpHeight);
        /*canvasCtx.rect(currentPos,canvasPlot.height-tmpHeight,rangeWidth,tmpHeight);
        canvasCtx.stroke();*/

        canvasCtx.beginPath();
        canvasCtx.moveTo(currentPos,lastYPos);
        lastYPos = canvasPlot.height-tmpHeight;
        canvasCtx.lineTo(currentPos,lastYPos);
        canvasCtx.stroke();


        canvasCtx.beginPath();
        canvasCtx.moveTo(currentPos,lastYPos);
        canvasCtx.lineTo(currentPos+rangeWidth,lastYPos);
        canvasCtx.stroke();


        currentPos+=rangeWidth;
    }

    canvasCtx.beginPath();
    canvasCtx.moveTo(currentPos,lastYPos);
    canvasCtx.lineTo(currentPos,canvasPlot.height);
    canvasCtx.stroke();

  }

  drawHistogramMap(rangeStart,rangeEnd);

  /// draw Inter
  document.getElementById("histoMinVal").innerHTML = rangeStart;
  document.getElementById("histoMaxVal").innerHTML = rangeEnd;
}


function drawHistogramMap(rangeStart,rangeEnd){

  var canvasPlot = document.getElementById("id_HistogramMappingCanvas");
  var rect = canvasPlot.getBoundingClientRect();

  canvasPlot.width = rect.width;
  canvasPlot.height = 1;

  var canvasCtx = canvasPlot.getContext("2d");

  canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);

  var canvasData = canvasCtx.getImageData(0, 0, canvasPlot.width, canvasPlot.height);

  var range = rangeEnd-rangeStart;

  var workCMS;
  if(document.getElementById("mapping_checkProbeVis").checked){
    if(document.getElementById("id_selectProbeListVIS").selectedIndex!=-1){
      var probe = globalCMS1.getProbe(document.getElementById("id_selectProbeListVIS").selectedIndex);
      workCMS = probe.generateProbeCMS(globalCMS1,colorspaceModus);
    }
    else{
      workCMS = cloneCMS(globalCMS1);
    }
  }
  else{
    workCMS = cloneCMS(globalCMS1);
  }

  for (var x = 0; x < canvasPlot.width; x++) {
    var value = x / canvasPlot.width * range + rangeStart;

    var tmpCurrentColor = workCMS.calculateColor(value, colorspaceModus);


    if(document.getElementById("id_affectHistogram").checked && doColorblindnessSim){
      var tmpLMS = tmpCurrentColor.calcLMSColor();
      tmpCurrentColor = tmpLMS.calcColorBlindRGBColor();
    }

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
    document.getElementById("id_histogramCoveringLabel").innerHTML = "Colormap is covering 0% of the Data-Range.";
  }
  else{

      if( start <= rangeStart){
        start=rangeStart;
      }

      if( end >= rangeEnd){
        end=rangeEnd;
      }

      var ratio = ((end-start)/range)*100;


      document.getElementById("id_histogramCoveringLabel").innerHTML = "Colormap is covering "+ratio+"% of the Data-Range.";
  }

}

function updateHistogramChange(){
  checkInputVal(document.getElementById("idNumberHistoRanges"), false, false);

  if(document.getElementById("idNumberHistoRanges")!="")
  drawHistogram(false);
}

function updateHistogramKey(event){
  checkInputVal(document.getElementById("idNumberHistoRanges"), false, false);

  if (event.keyCode == 13) {
    if(document.getElementById("idNumberHistoRanges")!="")
    drawHistogram(false);
  }

}

function changeColorblindness(){
  if(document.getElementById('id_doColorBlindSim').checked){
    doColorblindnessSim=true;
    changeColorblindnessType();
    document.getElementById('colorblindnessOptions').style.display = "inline-block";

    switch (colorblindnessType) {
      case 0:

        break;
      default:

    }
  }
  else{
    doColorblindnessSim=false;
    document.getElementById('colorblindnessOptions').style.display = "none";
  }
  changeColorblindnessType();
}


function changeColorblindnessSection(){
  document.getElementById('AnomalousTrichomacy_Dichromatism_View_Div').style.display="none";
  document.getElementById('Monochromatic_View_Div').style.display="none";

  document.getElementById('input_transferMatrixCol1').style.display="none";
  document.getElementById('input_transferMatrixCol2').style.display="none";
  document.getElementById('input_transferMatrixCol3').style.display="none";
  document.getElementById('label_transferMatrixCol1').style.display="none";
  document.getElementById('label_transferMatrixCol2').style.display="none";
  document.getElementById('label_transferMatrixCol3').style.display="none";

  if(document.getElementById('id_radio_SelectTrichomacy_Dichromatism').checked){
    document.getElementById('AnomalousTrichomacy_Dichromatism_View_Div').style.display="inline-block";
    document.getElementById('label_transferMatrixCol1').style.display="inline-block";
    document.getElementById('label_transferMatrixCol2').style.display="inline-block";
    document.getElementById('label_transferMatrixCol3').style.display="inline-block";
  }

  if(document.getElementById('id_radio_Monochromatic').checked){
    document.getElementById('Monochromatic_View_Div').style.display="inline-block";
    document.getElementById('label_transferMatrixCol1').style.display="inline-block";
    document.getElementById('label_transferMatrixCol2').style.display="inline-block";
    document.getElementById('label_transferMatrixCol3').style.display="inline-block";
  }

  if(document.getElementById('id_radio_CustomColorblindness').checked){
    document.getElementById('input_transferMatrixCol1').style.display="inline-block";
    document.getElementById('input_transferMatrixCol2').style.display="inline-block";
    document.getElementById('input_transferMatrixCol3').style.display="inline-block";
  }

  changeColorblindnessType();
}


function changeColorblindnessType(){

  if(document.getElementById('id_radio_SelectTrichomacy_Dichromatism').checked){

    if(document.getElementById('id_radio_Protanopia').checked)
      colorblindnessType=0;

    if(document.getElementById('id_radio_Deuteranopia').checked)
      colorblindnessType=1;

    if(document.getElementById('id_radio_Tritanopes').checked)
      colorblindnessType=2;
  }

  if(document.getElementById('id_radio_Monochromatic').checked){

    if(document.getElementById('id_radio_Achromatopsia').checked)
      colorblindnessType=3;

    if(document.getElementById('id_radio_BlueCone').checked)
      colorblindnessType=4;
  }


  if(document.getElementById('id_radio_CustomColorblindness').checked){
    colorblindnessType=5;
  }

  updateColorBlindness_TransferMatrices()
  doneWorkerPreparation=false;
  orderColorSketch(colorspaceModus);

}


function changeColorblindnessDegree(){

  if(parseFloat(document.getElementById("range_DegreeProtanopia").value)==100)
    document.getElementById("ProtanopiaLabel").style.visibility="visible";
  else
    document.getElementById("ProtanopiaLabel").style.visibility="hidden";

    if(parseFloat(document.getElementById("range_DegreeDeuteranopia").value)==100)
      document.getElementById("DeuteranopiaLabel").style.visibility="visible";
    else
      document.getElementById("DeuteranopiaLabel").style.visibility="hidden";

      if(parseFloat(document.getElementById("range_DegreeTritanopes").value)==100)
        document.getElementById("TritanopiaLabel").style.visibility="visible";
      else
        document.getElementById("TritanopiaLabel").style.visibility="hidden";

  updateColorBlindness_TransferMatrices()
  doneWorkerPreparation=false;
  orderColorSketch(colorspaceModus);

}

function changeCustomTransferMatrix(){
  updateColorBlindness_TransferMatrices()
  doneWorkerPreparation=false;
  orderColorSketch(colorspaceModus);
}
