window.onload = function() {


  ///// Future Work:
  ///
  /// Dynamically adding different script depenting if the browser is able to work with workers
  //  var newScript = document.createElement('script');
  //  newScript.setAttribute('src','http://ccctool.com/front/js/example.js');
  //  document.head.appendChild(newScript);
  // -> function addScript(src)


  openWaitPopUp("Initialization of the tool.");

  if (typeof (Worker) === undefined)
  browserCanWorker=false;
  else
  browserCanWorker=true;

  // init global vars
  globalProbeSet = new class_ProbeSet("");
  globalCMS1 = new class_CMS();
  // init events

  init_events_EditPage();
  init_events_PopUp_ColorPicker();
  init_ExportWindow();
  init_Testing();
  initMyDesignObj();
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
  loadRealWorldData();

  closeWaitPopUp();

  /*///////////////////////////////
  // For Testing: with start CMS in the MyDesigns
  ///

    myDesignsList.push(cmsGreenColormaps[0]);
    myDesignsList.push(cmsDivergentColormaps[0]);
    myDesignsList.push(cmsRedPurpleColormaps[0]);

    showMyDesignsPage();
    showTestPage();//*/


}



function addScript(src){
  var newScript = document.createElement('script');
  newScript.setAttribute('src',src);
  document.head.appendChild(newScript);
}
