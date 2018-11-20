function styleStructure_InterpolationSpaces(){

  if(globalCMS1.getKeyLength()==0){
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "flex";
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "none";
  }
  else{
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "flex";
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "none";

    document.getElementById("id_EditPage_AnalyzeContainer_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_AnalyzeContainer_SpacesKeyspeed").style.display = "block";
    document.getElementById("id_EditPage_AnalyzeContainer_SpacesSelectVisType").style.display = "flex";

    var context = document.getElementById("id_EditPage_CanvasDE94_IntSpaceKeySpeed").getContext('2d');
    context.clearRect(0, 0, document.getElementById("id_EditPage_CanvasDE94_IntSpaceKeySpeed").width, document.getElementById("id_EditPage_CanvasDE94_IntSpaceKeySpeed").height);
    context = document.getElementById("id_EditPage_CanvasCIEDE2000_IntSpaceKeySpeed").getContext('2d');
    context.clearRect(0, 0, document.getElementById("id_EditPage_CanvasCIEDE2000_IntSpaceKeySpeed").width, document.getElementById("id_EditPage_CanvasCIEDE2000_IntSpaceKeySpeed").height);
    document.getElementById("id_EditPage_MatricLabel_IntSpaceKeySpeed").style.display = "none";
    document.getElementById("id_EditPage_MatricDiv1_IntSpaceKeySpeed").style.display = "none";
    document.getElementById("id_EditPage_MatricDiv2_IntSpaceKeySpeed").style.display = "none";

    document.getElementById("id_EditPage_EuDisLabel_IntSpaceKeySpeed").style.display = "none";


    var oldInterpolation = globalCMS1.getInterpolationSpace();
    if(document.getElementById("id_EditPage_AnalyzeSelect_LinearVisType").checked){
      globalCMS1.setInterpolationSpace("rgb");
      drawCanvasColormap("id_EditPage_CanvasRGB_IntSpaceKeySpeed", globalCMS1);
      globalCMS1.setInterpolationSpace("hsv");
      drawCanvasColormap("id_EditPage_CanvasHSV_IntSpaceKeySpeed", globalCMS1);
      globalCMS1.setInterpolationSpace("lab");
      drawCanvasColormap("id_EditPage_CanvasLAB_IntSpaceKeySpeed", globalCMS1);
      globalCMS1.setInterpolationSpace("din99");
      drawCanvasColormap("id_EditPage_CanvasDIN99_IntSpaceKeySpeed", globalCMS1);
    }
    else{
      globalCMS1.setInterpolationSpace("rgb");
      drawBandSketch(globalCMS1,"id_EditPage_CanvasRGB_IntSpaceKeySpeed", false, -1);
      globalCMS1.setInterpolationSpace("hsv");
      drawBandSketch(globalCMS1,"id_EditPage_CanvasHSV_IntSpaceKeySpeed", false, -1);
      globalCMS1.setInterpolationSpace("lab");
      drawBandSketch(globalCMS1,"id_EditPage_CanvasLAB_IntSpaceKeySpeed", false, -1);
      globalCMS1.setInterpolationSpace("din99");
      drawBandSketch(globalCMS1,"id_EditPage_CanvasDIN99_IntSpaceKeySpeed", false, -1);
    }
    globalCMS1.setInterpolationSpace(oldInterpolation);
  }



}
