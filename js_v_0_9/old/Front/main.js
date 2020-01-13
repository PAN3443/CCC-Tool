
function main_init() {

  // init global vars
  globalProbeSet = new class_ProbeSet("");
  globalCMS1 = new class_CMS();
  workCMS_Edit = new class_CMS();

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

  /*if (typeof OffscreenCanvas === 'function'){
    browserCanOffscreenCanvas = true;
  }
  else{
    browserCanOffscreenCanvas = false;
    attentionText += "Attention".bold()+": Your browser does not support OffscreenCanvas. Therefore the performance of the CCC-Tool can be impeded.\n"
  }*/

  initWorker();


  if(attentionText.length>0){
    document.getElementById("id_welcomePage_InfoTxt").style.display = "block";
    document.getElementById("id_welcomePage_InfoTxt").innerHTML = attentionText;
  }


  // init events

  // global init
  document.getElementById('id_dropDownContainerNavi').addEventListener("mouseleave", hideAllDropDowns);
  document.getElementById('id_dropDownContainerTheme').addEventListener("mouseleave", hideAllDropDowns);

  calcSpaceGridLAB();
  calcSpaceGridDIN99();

  /////////////////////
  init_events_EditPage();
  init_events_PopUp_ColorPicker();
  init_ExportWindow();
  init_Testing();
  initMyDesign();
  initMapping();
  initTestMapping();
  init_MetricInt_Events();
  init_MetricInt_Graph();

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

  

  document.getElementById("id_dropDownContainer").onmouseleave  = function(){document.getElementById("id_dropDownContainer").style.display="none";};
  document.getElementById("id_popupColorPicker").onmouseleave  = function(){document.getElementById("id_popupColorPicker").style.display="none";};

  // Init Color
  updateXYZtoLMS_TransferMatrices();
  updateRGBtoXYZ_TransferMatrices();
  updateColorBlindness_TransferMatrices();
  doColorblindnessSim = false;

  stopPathPlotAnimation();
  stopAnimationMapping();


  /////
  setToolTheme(currentTheme);

  /// for testing
  //loadRealWorldData();

  ////////////////

  //selectToolTheme(); // cookie?

  closeWaitPopUp();
  checkLandscapeWindow();//

  ////////////////////////////////
  // For Testing: with start CMS in the MyDesigns
  ///
    /*myDesignsList.push(cmsFourBandColormaps[0]);
    myDesignsList.push(cmsGreenColormaps[0]);
    myDesignsList.push(cmsDivergentColormaps[0]);
    myDesignsList.push(cmsRedPurpleColormaps[0]);

    showMyDesignsPage();
    showTestPage();//*/


    ////////////////////////////////
    // For Testing: with start EditPage
    ///

      //myDesignsList.push(cmsDivergentColormaps[0]);


      /*var tmpCMS = new class_CMS();
      tmpCMS.setPreventIntervals(true);
      tmpCMS.pushKey(new class_Key(undefined, new class_Color_RGB(0.25,0.25,0.5), 0, false));
      tmpCMS.pushKey(new class_Key(new class_Color_RGB(0.25,0.75,0.5), new class_Color_RGB(0.25,0.75,0.5), 0.5, false));
      tmpCMS.pushKey(new class_Key(new class_Color_RGB(0.25,0.75,0.75), undefined, 1, false));
      tmpCMS.setAboveColor(new class_Color_RGB(1.0,0,0));
      tmpCMS.setBelowColor(new class_Color_RGB(0,0,1.0));
      tmpCMS.setInterpolationSpace("rgb");
      tmpCMS.setPreventIntervals(false);
      myDesignsList.push(tmpCMS);*/


      var tmpCMS = new class_CMS();
      tmpCMS.setPreventIntervals(true);
      tmpCMS.pushKey(new class_Key(undefined, new class_Color_RGB(0.25,0.25,0.5), 0, false));
      tmpCMS.pushKey(new class_Key(new class_Color_RGB(0.5,0.75,0.5), new class_Color_RGB(0.5,0.75,0.5), 0.5, false));
      tmpCMS.pushKey(new class_Key(new class_Color_RGB(0.75,0.25,0.5), undefined, 1, false));
      tmpCMS.setAboveColor(new class_Color_RGB(1.0,0,0));
      tmpCMS.setBelowColor(new class_Color_RGB(0,0,1.0));
      tmpCMS.setInterpolationSpace("rgb");
      tmpCMS.setPreventIntervals(false);
      myDesignsList.push(tmpCMS);


      var tmpCMS = new class_CMS();
      tmpCMS.setPreventIntervals(true);
      tmpCMS.pushKey(new class_Key(undefined, new class_Color_RGB(0.25,0.5,0.25), 0, false));
      tmpCMS.pushKey(new class_Key(new class_Color_RGB(0.5,0.5,0.75), new class_Color_RGB(0.5,0.5,0.75), 0.5, false));
      tmpCMS.pushKey(new class_Key(new class_Color_RGB(0.75,0.5,0.25), undefined, 1, false));
      tmpCMS.setAboveColor(new class_Color_RGB(1.0,0,0));
      tmpCMS.setBelowColor(new class_Color_RGB(0,0,1.0));
      tmpCMS.setInterpolationSpace("rgb");
      tmpCMS.setPreventIntervals(false);
      myDesignsList.push(tmpCMS);


      var tmpCMS = new class_CMS();
      tmpCMS.setPreventIntervals(true);
      tmpCMS.pushKey(new class_Key(undefined, new class_Color_RGB(0.5,0.25,0.25), 0, false));
      tmpCMS.pushKey(new class_Key(new class_Color_RGB(0.5,0.5,0.75), new class_Color_RGB(0.5,0.5,0.75), 0.5, false));
      tmpCMS.pushKey(new class_Key(new class_Color_RGB(0.5,0.75,0.25), undefined, 1, false));
      tmpCMS.setAboveColor(new class_Color_RGB(1.0,0,0));
      tmpCMS.setBelowColor(new class_Color_RGB(0,0,1.0));
      tmpCMS.setInterpolationSpace("rgb");
      tmpCMS.setPreventIntervals(false);
      myDesignsList.push(tmpCMS);



      var tmpCMS = new class_CMS();
      tmpCMS.setPreventIntervals(true);

      tmpCMS.pushKey(new class_Key(undefined, new class_Color_RGB(0.25,0.5,0.5), 0, false));
      tmpCMS.pushKey(new class_Key(new class_Color_RGB(0.375,0.75,0.5), new class_Color_RGB(0.375,0.75,0.5), 0.25, false));
      tmpCMS.pushKey(new class_Key(new class_Color_RGB(0.5,0.5,0.5), new class_Color_RGB(0.5,0.5,0.5), 0.5, false));
      tmpCMS.pushKey(new class_Key(new class_Color_RGB(0.625,0.25,0.5), new class_Color_RGB(0.625,0.25,0.5), 0.75, false));
      tmpCMS.pushKey(new class_Key(new class_Color_RGB(0.75,0.5,0.5), undefined, 1, false));

      tmpCMS.setAboveColor(new class_Color_RGB(1.0,0,0));
      tmpCMS.setBelowColor(new class_Color_RGB(0,0,1.0));
      tmpCMS.setInterpolationSpace("rgb");
      tmpCMS.setPreventIntervals(false);
      myDesignsList.push(tmpCMS);


      showMyDesignsPage();
      /*indexActiveCMS=0;
      showEditPage();// /
      //globalCMS1.setInterpolationSpace("rgb");
      //updateInterpolationSpaceEditPage();//*/







}
