window.onload = function() {

  // if possible zoom to 100%
  document.body.style.zoom="100%";

  document.onkeydown = keyDownDocumentHandler;
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
  document.getElementById('id_tutorialPage').style.display = "none";*/

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

  init_Size();


}

window.onresize = function(event) {

  orderColorSketch(colorspaceModus);

  if( document.getElementById("id_Mapping_Table_Div").style.display!="none"&&
      document.getElementById("id_mapping_Div").style.display!="none"&&
      document.getElementById("showHideMappingVisualization").style.display!="none"){

      updateMappingSize(2);
  }
};


window.onscroll = function() {
  //console.log(document.documentElement.scrollLeft);
  document.getElementById("id_menu").style.marginLeft = document.documentElement.scrollLeft+"px";
  document.getElementById("id_MainMenue").style.marginLeft = document.documentElement.scrollLeft+"px";
  document.getElementById("id_Mod_Menue").style.marginLeft = document.documentElement.scrollLeft+"px";
  document.getElementById("footerDiv").style.marginLeft = document.documentElement.scrollLeft+"px";


};


function keyDownDocumentHandler(event){
  if (event.keyCode == 13) {
    if(document.getElementById("popupAlertWindow").style.display!="none")
    document.getElementById("popupAlertWindow").style.display="none";
  }
}


///////////////////////////////////////////////

function orderColorSketch(forColorspace) {

  document.getElementById("id_colormapSketch").innerHTML = null;

  for (var i = refLineSketchContainer.length - 1; i >= 0; i--) {
    refLineSketchContainer[i].remove();
    refLineSketchContainer.pop();
  }

 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (showSideID == 1 && globalCMS1.getKeyLength() != 0) {

        if(document.getElementById('switchExpertModeWelcomePage').checked){
          document.getElementById("id_Mapping_Table_Div").style.display = "block";
          fillTable();
        }

        if(document.getElementById("mapping_checkAutoUpdate").checked==true && mapping_doingAnimation && document.getElementById('switchExpertModeWelcomePage').checked){
          updateMesh();
        }

    }
    else{
      document.getElementById("id_Mapping_Table_Div").style.display = "none";
    }


      // show and draw the colormap
      if(globalCMS1.getKeyLength() != 0){

        drawCanvasColormap("id_linearColormap", linearMap_resolution_X, linearMap_resolution_Y, globalCMS1);
        drawKeys("id_keyColormap", key_resolution_X, key_resolution_Y, globalCMS1, "id_keyColormapLinesBottom");

        document.getElementById("div_colormapLinear").style.display = "inline-block";

        if(showSideID==1)
          document.getElementById("bandSketchAutoRangeDiv").style.display="block";
        else
          document.getElementById("bandSketchAutoRangeDiv").style.display="none";


      }
      else{
        document.getElementById("div_colormapLinear").style.display = "none";
        document.getElementById("bandSketchAutoRangeDiv").style.display="none";
      }



    //////////////////////////////////////////////////////////////////////////
    drawBandSketch(globalCMS1,"id_colormapSketch","id_createColormapKeys","id_colormapSketch_Ref", false, -1);


    if(showSideID == 3){

      if(globalCMS2.getKeyLength() != 0){

        drawCanvasColormap("id_linearColormap2", linearMap_resolution_X, linearMap_resolution_Y, globalCMS2);
        drawKeys("id_keyColormap2", key_resolution_X, key_resolution_Y, globalCMS2, "id_keyColormapLinesBottom2");

        document.getElementById("div_colormapLinear2").style.display = "inline-block";

      }
      else{
        document.getElementById("div_colormapLinear2").style.display = "none";
      }

      drawBandSketch(globalCMS2,"id_colormapSketch2","id_createColormapKeys2","id_colormapSketch_Ref2", false, -1);
    }



}
