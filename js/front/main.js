window.onload = function() {

  if (typeof (Worker) === undefined)
  browserCanWorker=false;
  else
  browserCanWorker=true;

  // init global vars
  globalProbeSet = new class_ProbeSet("");
  globalCMS1 = new class_CMS();
  // init events


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

    changeFilterPredefined(1);
    drawCanvasColormap("id_EditPage_Preview_Multiband", cmsFourBandColormaps[0]);
    drawCanvasColormap("id_EditPage_Preview_Divergent", cmsDivergentColormaps[0]);
    drawCanvasColormap("id_EditPage_Preview_ScaledBlue", cmsBlueColormaps[0]);
    drawCanvasColormap("id_EditPage_Preview_ScaledBrown", cmsBrownColormaps[0]);
    drawCanvasColormap("id_EditPage_Preview_ScaledGreen", cmsGreenColormaps[0]);
    drawCanvasColormap("id_EditPage_Preview_ScaledRedPurple", cmsRedPurpleColormaps[0]);
    drawCanvasColormap("id_EditPage_Preview_ScaledYellowOrange", cmsYellowColormaps[0]);

    updateTableStatus();

   document.getElementById("id_EditPage").style.display = "none";


   document.getElementById("id_GalleryPage").style.display = "block";

   drawCanvasColormap("id_GalleryPage_Preview_Multiband", cmsFourBandColormaps[0]);
   drawCanvasColormap("id_GalleryPage_Preview_Divergent", cmsDivergentColormaps[0]);
   drawCanvasColormap("id_GalleryPage_Preview_ScaledBlue", cmsBlueColormaps[0]);
   drawCanvasColormap("id_GalleryPage_Preview_ScaledBrown", cmsBrownColormaps[0]);
   drawCanvasColormap("id_GalleryPage_Preview_ScaledGreen", cmsGreenColormaps[0]);
   drawCanvasColormap("id_GalleryPage_Preview_ScaledRedPurple", cmsRedPurpleColormaps[0]);
   drawCanvasColormap("id_GalleryPage_Preview_ScaledYellowOrange", cmsYellowColormaps[0]);
   changeGalleryPredefined(0);

   document.getElementById("id_GalleryPage").style.display = "none";

  init_events_EditPage();
  init_events_PopUp_ColorPicker();
  init_ExportWindow();
  initMyDesignObj();
  initMapping();


  document.getElementById('id_inputCMSData').addEventListener("change", readCMSFile);
  document.getElementById('id_inputSessionData').addEventListener("change", readSessionFile);
  document.getElementById('id_inputData').addEventListener("change", readDataFile);

  pageIsLoaded=true;



  document.getElementById("id_dropDownContainer").onmouseleave  = function(){document.getElementById("id_dropDownContainer").style.display="none";};
  document.getElementById("id_popupColorPicker").onmouseleave  = function(){document.getElementById("id_popupColorPicker").style.display="none";};

}


/*window.onresize = function(event) {


  var windowWidth = document.body.offsetWidth;
  document.getElementById("id_ccctoolPage").style.width = windowWidth+"px";
  //document.getElementById("id_EditPage").style.width = windowWidth+"px";

};*/
