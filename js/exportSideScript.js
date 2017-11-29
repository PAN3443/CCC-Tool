function initExportWindow(){

  //exportColormap

  drawCanvasColormap("id_linearColormapExport",linearMap_resolution_X, linearMap_resolution_Y, exportColormap);
  drawKeys("id_keyColormapExport",key_resolution_X, key_resolution_Y, exportColormap, "id_keyColormapLinesBottomExport",true)

}

function cancelExport(){
    document.getElementById("id_exportWindow").style.display = "none";

    if(showSideID==1)
      orderColorSketch();
}
