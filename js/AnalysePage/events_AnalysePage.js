

function initAnalysePage(){


    document.getElementById('analyseSideShowHSV').checked = true;
    document.getElementById('id_setValueRange').value = 100;
    // fill and draw sketch
    hueInit("id_anaylseCourseHueBackground");
    colormap2Sketch(analysisColormap);
    drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
    styleAnalysisPage();

}

function changeCourseSpace(){

  document.getElementById('id_hueValueRange').style.display = 'none';

  if(document.getElementById('analyseSideShowRGB').checked == true){

  }
  if(document.getElementById('analyseSideShowHSV').checked == true){
    document.getElementById('id_setValueRange').value = 100;
    //document.getElementById('id_hueValueRange').style.display = 'inline-block';
    hueInit("id_anaylseCourseHueBackground");
    drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
  }
  if(document.getElementById('analyseSideShowLAB').checked == true){
    document.getElementById('id_setValueRange').value = 65;
    //document.getElementById('id_hueValueRange').style.display = 'inline-block';
    hueInit("id_anaylseCourseHueBackground");
  }
}

function changeValueRange(){
      hueInit("id_anaylseCourseHueBackground");
}
