




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
  drawMapping();
  drawHistogram(false);
}

function changeTimeStep(){
  currentTimeIndex=document.getElementById("combobox_selectTimeStep").selectedIndex;
  globalDomain.generateCells(currentFieldIndex,currentTimeIndex);
  drawMapping();
  drawHistogram(false);
}


function drawHistogram(upDate){


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

  if(upDate==false){

    var canvasPlot = document.getElementById("id_HistogramCanvas");
    var rect = canvasPlot.getBoundingClientRect();

    canvasPlot.width = rect.width;
    canvasPlot.height = rect.height;

    var plotWidth = canvasPlot.width;
    var plotHeight = canvasPlot.height;
    var xStart = Math.round((canvasPlot.width-plotWidth)/2);
    var yStart = plotHeight;
    var mapHeight = canvasPlot.height-plotHeight;

    var canvasCtx = canvasPlot.getContext("2d");


    canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);
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

  for (var x = 0; x < canvasPlot.width; x++) {
    var value = x / canvasPlot.width * range + rangeStart;

    var tmpCurrentColor = globalCMS1.calculateColor(value, colorspaceModus);

      var index = x * 4;
      //var index = ((xStart+x) + y * canvasWidth) * 4;
      canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      canvasData.data[index + 3] = 255; //a

  }

  canvasCtx.putImageData(canvasData, 0, 0);

  var start = globalCMS1.getKey(0).getRefPosition();
  var end = globalCMS1.getKey(globalCMS1.getKeyLength()-1).getRefPosition();

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

function updateHistogram(){

}
