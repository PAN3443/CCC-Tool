

window.onresize = function(event) {

    // if Edit Page is visible
    checkLandscapeWindow();

    if(document.getElementById("id_EditPage").style.display!="none"){
      updateEditPage();

      if(mapping_doAnimation){
        updateMappingSize();
      }

      if(pathplot_doAnimation){
        pathPlot3D_Resize();
      }
    }
    else {
      // if Test Page is visible
      if(testmapping_doAnimation){
        updateTestMappingCanvas();
      }
    }

    if(metricInt_Graph_doAnimation){
      update_MetricInt_RenderSize();
    }

};






  function dynamicallyLoadScript_VersionsCheck(url) {
      var versionUpdate = (new Date()).getTime();
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url+"?v=" + versionUpdate;
      document.head.appendChild(script);
  }
