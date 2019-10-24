

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


window.onbeforeunload = function() { return "Attention: Your work will be lost, if you will leave this page."; };

window.onload = function() {
  includeHTML();
  //includeScripts();
  main_init();
}

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("include-html");
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, false); // true); //
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };

  function checkLandscapeWindow(){

    var ratio = window.innerWidth/window.innerHeight;

    if(ratio<4/3){
      document.getElementById("id_PopUp_LandscapeWindow").style.display = "flex";
    }
    else{
      document.getElementById("id_PopUp_LandscapeWindow").style.display = "none";
    }
  }

  function dynamicallyLoadScript_VersionsCheck(url) {
      var versionUpdate = (new Date()).getTime();
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url+"?v=" + versionUpdate;
      document.head.appendChild(script);
  }
