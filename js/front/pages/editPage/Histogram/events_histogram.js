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
