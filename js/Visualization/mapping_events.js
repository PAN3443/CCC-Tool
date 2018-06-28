




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
        drawHistogram();
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



function drawHistogram(){

}
