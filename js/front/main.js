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

  initAutoCompleteInputs();

  init_events_EditPage();
  init_events_PopUp_ColorPicker();
  init_ExportWindow();

  initMyDesignObj();
  //init_CCCPageStyle();

  initMapping();


  document.getElementById('id_inputCMSData').addEventListener("change", readCMSFile);
  document.getElementById('id_inputSessionData').addEventListener("change", readSessionFile);
  document.getElementById('id_inputData').addEventListener("change", readDataFile);

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
