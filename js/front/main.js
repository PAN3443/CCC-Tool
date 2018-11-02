window.onload = function() {

  // init global vars
  globalCMS1 = new class_CMS();






  initAutoCompleteInputs();


  // init events
  init_events_EditPage();
  init_events_PopUp_ColorPicker();



  // if possible zoom to 100%
  /*document.body.style.zoom="100%";


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// GLOBAL /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  if (typeof (Worker) === undefined)
  browserCanWorker=false;
  else
  browserCanWorker=true;

  globalCMS1 = new class_CMS();
  globalCMS2 = new class_CMS();

  document.getElementById("editSide_Radiobutton_PickerRG_B").checked=true;
  document.getElementById("bandCreator_Radiobutton_PickerRG_B").checked=true;
  colorpickerType="RG_B";

  /*document.getElementById('id_creatorPage').style.display = "none";
  document.getElementById('id_comparePage').style.display = "none";
  document.getElementById('id_analysisPage').style.display = "none";
  document.getElementById('id_tutorialPage').style.display = "none";*

  document.getElementById('id_inputCMSData').addEventListener("change", readCMSFile);
  document.getElementById('id_inputSessionData').addEventListener("change", readSessionFile);
  document.getElementById('id_inputData').addEventListener("change", readDataFile);

  document.getElementById('switchExpertMode').addEventListener("click", switchCCCToolMode);
  document.getElementById('switchExpertModeWelcomePage').addEventListener("change", switchCCCToolMode);
  document.getElementById('switchExpertModeWelcomePage').checked=true;


  document.getElementById('switchExpertMode').click();


  init_settingPage();
  init_AddPage();
  init_EditPage();
  init_CreatePage();
  init_analyzeComparePage();
  init_TutorialPage();
  init_ExportPage();

 /////
  changeColorspace(2);
  switchTableTestFunction(0);
  switchModifyModus(0);
  pageIsLoaded=true;



  initMapping();
  backgroundMapping(0);
  changeColorblindnessDegree();

  init_Size();*/

  //// STYLE

  initMyDesignObj();
  init_CCCPageStyle();

  // load predefiend;
  cmsYellowColormaps = loadPredefinedCMS(pathColormaps+folderYellow,fileYellowColormaps);
  cmsBlueColormaps = loadPredefinedCMS(pathColormaps+folderBlue,fileBlueColormaps);
  cmsRedPurpleColormaps = loadPredefinedCMS(pathColormaps+folderRedPurple,fileRedPurpleColormaps);
  cmsGreenColormaps = loadPredefinedCMS(pathColormaps+folderGreen,fileGreenColormaps);
  cmsBrownColormaps = loadPredefinedCMS(pathColormaps+folderBrown,fileBrownColormaps);
  cmsDivergentColormaps = loadPredefinedCMS(pathColormaps+folderDivergent,fileDivergentColormaps);
  cmsThreeBandColormaps = loadPredefinedCMS(pathColormaps+folderThreeBand,fileThreeBandColormaps);
  cmsFourBandColormaps = loadPredefinedCMS(pathColormaps+folderFourBand,fileFourBandColormaps);
  // draw predefined;
  changeFilterPredefined(0);

  pageIsLoaded=true;


}


/*window.onscroll = function() {
  document.getElementById("headerDiv").style.marginLeft = document.documentElement.scrollLeft+"px";
  document.getElementById("footerDiv").style.marginLeft = document.documentElement.scrollLeft+"px";
};*/






window.onresize = function(event) {


  var windowWidth = document.body.offsetWidth;
  document.getElementById("id_ccctoolPage").style.width = windowWidth+"px";
  //document.getElementById("id_EditPage").style.width = windowWidth+"px";

};


/*

window.onscroll = function() {
  //console.log(document.documentElement.scrollLeft);
  document.getElementById("id_menu").style.marginLeft = document.documentElement.scrollLeft+"px";
  document.getElementById("id_MainMenue").style.marginLeft = document.documentElement.scrollLeft+"px";
  document.getElementById("id_Mod_Menue").style.marginLeft = document.documentElement.scrollLeft+"px";
  document.getElementById("footerDiv").style.marginLeft = document.documentElement.scrollLeft+"px";


};



*/
