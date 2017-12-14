

function initAnalysePage(){

    bandSketch.colormap2Sketch(analysisColormap);
    orderColorSketch(colorspaceModus);
    //changeCourseSpace();
    document.getElementById("id_setValueRange").value = 100;

}

function changeCourseSpace(){

  document.getElementById("id_containerHueCourse").style.display = "none";
  document.getElementById("id_anaylseValue").style.display = "none";
  document.getElementById("id_hueValueOptions").style.display = "none";

  switch(colorspaceModus){
      case "rgb":;

      break;
      case "hsv":
        document.getElementById("id_containerHueCourse").style.display = "initial";
        document.getElementById("id_anaylseValue").style.display = "initial";
        document.getElementById("id_hueValueOptions").style.display = "initial";
        hueInit("id_anaylseCourseHueBackground");
        document.getElementById("id_setValueRange").value = 100;
        //document.getElementById("id_hueValueRange").style.display = "inline-block";
        hueInit("id_anaylseCourseHueBackground");
        drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
      break;
      case "lab": case "din99":
        document.getElementById("id_containerHueCourse").style.display = "initial";
        document.getElementById("id_anaylseValue").style.display = "initial";
        document.getElementById("id_hueValueOptions").style.display = "initial";
        hueInit("id_anaylseCourseHueBackground");
        document.getElementById("id_setValueRange").value = 65;
        hueInit("id_anaylseCourseHueBackground");
        drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
        //document.getElementById("id_hueValueRange").style.display = "inline-block";
      break;
      default:
      console.log("Error at the changeColorspace function");
      return;
  }//*/


}

function changeValueRange(){
      hueInit("id_anaylseCourseHueBackground");
      drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false);
}

function analyseColormapRGBPossible(){
  if(document.getElementById("id_checkboxRGB").checked==true){
    orderColorSketch('rgb');
    bandSketch.colormap2Sketch(analysisColormap);
    drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false);
  }
}
