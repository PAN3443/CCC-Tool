window.onresize = function(event) {

    // if Edit Page is visible

    if(mapping_doAnimation){
      updateMappingSize();
    }

    if(pathplot_doAnimation){
      pathPlot3D_Resize();
    }


    // if Test Page is visible
    if(testmapping_doAnimation){
      updateTestMappingCanvas();
    }

};
