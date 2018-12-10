

function updateDomainCMSRange(){

  globalCMS1.setAutoRange(globalDomain.getMinField(currentFieldIndex),globalDomain.getMaxField(currentFieldIndex));
  saveCreateProcess();
  updateEditPage();

}

function changeAutoMapping(){
  if(document.getElementById("id_EditPage_Mapping_DoAutoUpdate").checked)
    document.getElementById("id_EditPage_MappingManual_Button").style.display="none";
  else
    document.getElementById("id_EditPage_MappingManual_Button").style.display="flex";

}


function changeBackground(){

  document.getElementById("id_EditPage_MappingBackground_Custom").style.background = mappingBackgroundColor.getRGBString();
  document.getElementById("id_EditPageCustomColorDiv").style.display = "none";


  switch (document.getElementById("id_EditPage_MappingBackground_Select").selectedIndex) {
    case 0:
          document.getElementById("id_EditPage_DrawMappingDiv").style.background = "url(img/EditPage/plotBackground.png)";
      break;
      case 1:
          document.getElementById("id_EditPage_DrawMappingDiv").style.background = "white";
        break;
        case 2:
          document.getElementById("id_EditPage_DrawMappingDiv").style.background = "black";
          break;
    default:
    document.getElementById("id_EditPageCustomColorDiv").style.display = "block";
    document.getElementById("id_EditPage_DrawMappingDiv").style.background = mappingBackgroundColor.getRGBString();
  }
}


/*function updateProgressBar(status){

  //document.getElementById("id_processBar").style.width = status+"%";
  document.getElementById("mappingProcessBar").value = status;

  //console.log(status, document.getElementById("id_processBar").style.width );
}*/


function changeField(){

  currentFieldIndex=document.getElementById("id_EditPage_SelectMappingField").selectedIndex;
  currentTimeIndex=0;

  var selectobject=document.getElementById("id_EditPage_SelectMappingTimeStep")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }

  for (var i = 1; i <= globalDomain.getNumberOfTimeSteps(currentFieldIndex); i++) {
    var option = document.createElement("option");
    option.text = i+"";
    selectobject.add(option);
  }

  document.getElementById("id_EditPage_FieldMinValue").innerHTML = globalDomain.getMinField(currentFieldIndex);
  document.getElementById("id_EditPage_FieldMaxValue").innerHTML = globalDomain.getMaxField(currentFieldIndex);

  globalDomain.generateCells(currentFieldIndex,currentTimeIndex);

  doneWorkerPreparation=false;
  drawMapping();

  /*if(document.getElementById("showHideMappingHistogram").style.display!="none")
  drawHistogram(false);*/
}

function changeTimeStep(){
  currentTimeIndex=document.getElementById("id_EditPage_SelectMappingTimeStep").selectedIndex;
  globalDomain.generateCells(currentFieldIndex,currentTimeIndex);
  doneWorkerPreparation=false;
  drawMapping();

  /*if(document.getElementById("showHideMappingHistogram").style.display!="none")
  drawHistogram(false);*/
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
  document.getElementById("id_EditPage_HistoMinVal").innerHTML = rangeStart;
  document.getElementById("id_EditPage_HistoMaxVal").innerHTML = rangeEnd;
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
