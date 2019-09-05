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

    document.getElementById("id_EditPage_InterpolationAnalyse_RGB_Div").style.display = "flex";
    document.getElementById("id_EditPage_InterpolationAnalyse_HSV_Div").style.display = "flex";


    document.getElementById("id_EditPage_CanvasLAB_IntSpaceKeySpeed").style.height = "5.5vh";
    document.getElementById("id_EditPage_CanvasLAB_DS94_IntSpaceKeySpeed").style.height = "5.5vh";
    document.getElementById("id_EditPage_CanvasLAB_DS2000_IntSpaceKeySpeed").style.height = "5.5vh";
    document.getElementById("id_EditPage_CanvasDE94_IntSpaceKeySpeed").style.height = "5.5vh";
    document.getElementById("id_EditPage_CanvasCIEDE2000_IntSpaceKeySpeed").style.height = "5.5vh";
    document.getElementById("id_EditPage_CanvasDIN99_IntSpaceKeySpeed").style.height = "5.5vh";
    document.getElementById("id_EditPage_CanvasRGB_IntSpaceKeySpeed").style.height = "5.5vh";
    document.getElementById("id_EditPage_CanvasHSV_IntSpaceKeySpeed").style.height = "5.5vh";


    var oldInterpolation = globalCMS1.getInterpolationSpace();
    if(document.getElementById("id_EditPage_AnalyzeSelect_LinearVisType").checked){
        globalCMS1.setInterpolationSpace("lab");
      drawCanvasColormap("id_EditPage_CanvasLAB_IntSpaceKeySpeed", globalCMS1);
        globalCMS1.setInterpolationSpace("de94-ds");
      drawCanvasColormap("id_EditPage_CanvasLAB_DS94_IntSpaceKeySpeed", globalCMS1);
        globalCMS1.setInterpolationSpace("de2000-ds");
      drawCanvasColormap("id_EditPage_CanvasLAB_DS2000_IntSpaceKeySpeed", globalCMS1);
      /*  globalCMS1.setInterpolationSpace("de94");
      drawCanvasColormap("id_EditPage_CanvasDE94_IntSpaceKeySpeed", globalCMS1);
        globalCMS1.setInterpolationSpace("de2000");
      drawCanvasColormap("id_EditPage_CanvasCIEDE2000_IntSpaceKeySpeed", globalCMS1);*/
        globalCMS1.setInterpolationSpace("din99");
      drawCanvasColormap("id_EditPage_CanvasDIN99_IntSpaceKeySpeed", globalCMS1);
        globalCMS1.setInterpolationSpace("rgb");
      drawCanvasColormap("id_EditPage_CanvasRGB_IntSpaceKeySpeed", globalCMS1);
        globalCMS1.setInterpolationSpace("hsv");
      drawCanvasColormap("id_EditPage_CanvasHSV_IntSpaceKeySpeed", globalCMS1);
    }
    else{
      globalCMS1.setInterpolationSpace("lab");
    drawBandSketch(globalCMS1,"id_EditPage_CanvasLAB_IntSpaceKeySpeed");
      globalCMS1.setInterpolationSpace("de94-ds");
    drawBandSketch(globalCMS1,"id_EditPage_CanvasLAB_DS94_IntSpaceKeySpeed");
      globalCMS1.setInterpolationSpace("de2000-ds");
    drawBandSketch(globalCMS1,"id_EditPage_CanvasLAB_DS2000_IntSpaceKeySpeed");
    /*  globalCMS1.setInterpolationSpace("de94");
    drawBandSketch(globalCMS1,"id_EditPage_CanvasDE94_IntSpaceKeySpeed");
      globalCMS1.setInterpolationSpace("de2000");
    drawBandSketch(globalCMS1,"id_EditPage_CanvasCIEDE2000_IntSpaceKeySpeed");*/
      globalCMS1.setInterpolationSpace("din99");
    drawBandSketch(globalCMS1,"id_EditPage_CanvasDIN99_IntSpaceKeySpeed");
      globalCMS1.setInterpolationSpace("rgb");
    drawBandSketch(globalCMS1,"id_EditPage_CanvasRGB_IntSpaceKeySpeed");
      globalCMS1.setInterpolationSpace("hsv");
    drawBandSketch(globalCMS1,"id_EditPage_CanvasHSV_IntSpaceKeySpeed");
    }
    globalCMS1.setInterpolationSpace(oldInterpolation);
  }



}
