
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


window.onbeforeunload = function() { return "Attention: Your work will be lost, if you will leave this page."; };

window.onload = function() {

  includeHTML();

  // init global vars
  globalProbeSet = new class_ProbeSet("");
  globalCMS1 = new class_CMS();

  /////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// Check Browerser and Hardware ////////////////////////////////

  numberOfCores = navigator.hardwareConcurrency;

  if(numberOfCores==undefined)
    numberOfMaxWorker = 4; // use maximal 2/3 of cores or 4 as default.
  else
    numberOfMaxWorker = Math.round(numberOfCores*2.0/3.0);

  var attentionText = "";
  if (typeof (Worker) === undefined){
    browserCanWorker=false;
    attentionText += "Attention".bold()+": Your browser does not support Worker. Therefore the some features of the CCC-Tool won't work and the the performance can be impeded.\n"
  }
  else
  browserCanWorker=true;

  if (typeof OffscreenCanvas === 'function'){
    browserCanOffscreenCanvas = true;
  }
  else{
    browserCanOffscreenCanvas = false;
    attentionText += "Attention".bold()+": Your browser does not support OffscreenCanvas. Therefore the performance of the CCC-Tool can be impeded.\n"
  }

  initWorker();


  if(attentionText.length>0){
    document.getElementById("id_welcomePage_InfoTxt").style.display = "block";
    document.getElementById("id_welcomePage_InfoTxt").innerHTML = attentionText;
  }

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////

  ///// Future Work:
  ///
  /// Dynamically adding different script depenting if the browser is able to work with workers
  //  var newScript = document.createElement('script');
  //  newScript.setAttribute('src','http://ccctool.com/front/js/example.js');
  //  document.head.appendChild(newScript);
  // -> function addScript(src)

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////


  // init events

  // global init
  document.getElementById('id_dropDownContainerNavi').addEventListener("mouseleave", activateNaviDropdown);

  /////////////////////
  init_events_EditPage();
  init_events_PopUp_ColorPicker();
  init_ExportWindow();
  init_Testing();
  initMyDesign();
  initMapping();
  initTestMapping();


  // load predefiend;
  cmsYellowColormaps = loadPredefinedCMS(pathColormaps+folderYellow,fileYellowColormaps);
  cmsBlueColormaps = loadPredefinedCMS(pathColormaps+folderBlue,fileBlueColormaps);
  cmsRedPurpleColormaps = loadPredefinedCMS(pathColormaps+folderRedPurple,fileRedPurpleColormaps);
  cmsGreenColormaps = loadPredefinedCMS(pathColormaps+folderGreen,fileGreenColormaps);
  cmsBrownColormaps = loadPredefinedCMS(pathColormaps+folderBrown,fileBrownColormaps);
  cmsDivergentColormaps = loadPredefinedCMS(pathColormaps+folderDivergent,fileDivergentColormaps);
  cmsThreeBandColormaps = loadPredefinedCMS(pathColormaps+folderThreeBand,fileThreeBandColormaps);
  cmsFourBandColormaps = loadPredefinedCMS(pathColormaps+folderFourBand,fileFourBandColormaps);

  document.getElementById("id_EditPage").style.display = "flex";

    drawCanvasColormap("id_EditPage_Preview_Multiband", cmsFourBandColormaps[0]);
    drawCanvasColormap("id_EditPage_Preview_Divergent", cmsDivergentColormaps[0]);
    drawCanvasColormap("id_EditPage_Preview_ScaledBlue", cmsBlueColormaps[0]);
    drawCanvasColormap("id_EditPage_Preview_ScaledBrown", cmsBrownColormaps[0]);
    drawCanvasColormap("id_EditPage_Preview_ScaledGreen", cmsGreenColormaps[0]);
    drawCanvasColormap("id_EditPage_Preview_ScaledRedPurple", cmsRedPurpleColormaps[0]);
    drawCanvasColormap("id_EditPage_Preview_ScaledYellowOrange", cmsYellowColormaps[0]);

    switchAnalyzeMappingProbeSet(0);
    switchModifyModus(1);
    switchPredefinedCMS(0);
    changeFilterPredefined(5);
    choosePathPlotSpace(1);
    updateTableStatus();
    updateAnalzyeMappingProbeSetStatus();

   document.getElementById("id_EditPage").style.display = "none";


   document.getElementById("id_GalleryPage").style.display = "block";

   drawCanvasColormap("id_GalleryPage_Preview_Multiband", cmsFourBandColormaps[0]);
   drawCanvasColormap("id_GalleryPage_Preview_Divergent", cmsDivergentColormaps[0]);
   drawCanvasColormap("id_GalleryPage_Preview_ScaledBlue", cmsBlueColormaps[0]);
   drawCanvasColormap("id_GalleryPage_Preview_ScaledBrown", cmsBrownColormaps[0]);
   drawCanvasColormap("id_GalleryPage_Preview_ScaledGreen", cmsGreenColormaps[0]);
   drawCanvasColormap("id_GalleryPage_Preview_ScaledRedPurple", cmsRedPurpleColormaps[0]);
   drawCanvasColormap("id_GalleryPage_Preview_ScaledYellowOrange", cmsYellowColormaps[0]);
   changeGalleryPredefined(3);

  document.getElementById("id_GalleryPage").style.display = "none";

  document.getElementById('id_inputCMSData').addEventListener("change", readCMSFile);
  document.getElementById('id_inputSessionData').addEventListener("change", readSessionFile);
  document.getElementById('id_inputData').addEventListener("change", readDataFile);

  document.getElementById("id_dropDownContainer").onmouseleave  = function(){document.getElementById("id_dropDownContainer").style.display="none";};
  document.getElementById("id_popupColorPicker").onmouseleave  = function(){document.getElementById("id_popupColorPicker").style.display="none";};

  // Init Color
  updateXYZtoLMS_TransferMatrices();
  updateRGBtoXYZ_TransferMatrices();
  updateColorBlindness_TransferMatrices();
  doColorblindnessSim = false;

  calcSpaceGridLAB();
  calcSpaceGridDIN99();

  stopPathPlotAnimation();
  stopAnimationMapping();


  /// for testing
  //loadRealWorldData();

  ////////////////

  closeWaitPopUp();

  ////////////////////////////////
  // For Testing: with start CMS in the MyDesigns
  ///
    myDesignsList.push(cmsFourBandColormaps[0]);
    myDesignsList.push(cmsGreenColormaps[0]);
    myDesignsList.push(cmsDivergentColormaps[0]);
    myDesignsList.push(cmsRedPurpleColormaps[0]);

    showMyDesignsPage();
    showTestPage();//*/

    checkLandscapeWindow();


}


window.onresize = function (){
  checkLandscapeWindow();

  if(document.getElementById("id_EditPage").style.display!="none"){
    updateEditPage();
  }
}

function checkLandscapeWindow(){

  var ratio = window.innerHeight/window.innerWidth;

  if(ratio>0.75){
    document.getElementById("id_PopUp_LandscapeWindow").style.display = "flex";
  }
  else{
    document.getElementById("id_PopUp_LandscapeWindow").style.display = "none";
  }
}


function addScript(src){
  var newScript = document.createElement('script');
  newScript.setAttribute('src',src);
  document.head.appendChild(newScript);
}
