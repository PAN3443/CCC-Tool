
//////////////////////////////////////
/// Short Cuts /////
///////////////////////////////////

function closeShortcutsWindow(){
  document.getElementById("id_PopUp_ShortcutsWindow").style.display="none";
}

function openShortcutsWindow(){
  document.getElementById("id_PopUp_ShortcutsWindow").style.display="flex";
  document.getElementById("id_dropDownContainer").style.display="none";
  updateShortCuts();
}

//////////////////////////////////////
/// Full Screen Mapping Vis /////
///////////////////////////////////


function openFullTestMappingScreen(text){
  document.getElementById("id_PopUp_fullTestingWindow").style.display="flex";

  if(document.getElementById("id_TestVisualization_Mesh").checked){
    updateTestMappingCanvas(true);
  }

}

function closeFullTestMappingScreen(){
  document.getElementById("id_PopUp_fullTestingWindow").style.display="none";

  if(document.getElementById("id_TestVisualization_Mesh").checked)
    updateTestMappingCanvas(false);
}

//////////////////////////////////////
/// Wait /////
///////////////////////////////////

function openWaitPopUp(text){
  document.getElementById("waitWindow").style.display="flex";
  document.getElementById("id_waitText").innerHTML = text;
}

function closeWaitPopUp(){
  document.getElementById("waitWindow").style.display="none";
}




//////////////////////////////////////
/// News /////
///////////////////////////////////

function openNewsPopUp(){
  document.getElementById("id_PopUp_NewsWindow").style.display="flex";
}

function closeNewsPopUp(){
  document.getElementById("id_PopUp_NewsWindow").style.display="none";
}



//////////////////////////////////////
/// Big Screen Mapping /////
///////////////////////////////////

function openFullMappingScreen(){
  document.getElementById("id_PopUp_fullMappingWindow").style.display="block";
  document.getElementById("id_PopUp_FullMappingDiv").appendChild( mapping_renderer.domElement);
  updateMappingSize();
}

function closeFullMappingScreen(){
  document.getElementById("id_PopUp_fullMappingWindow").style.display="none";
  document.getElementById("id_EditPage_DrawMappingDiv").appendChild( mapping_renderer.domElement );
  updateMappingSize();
}

//////////////////////////////////////
/// Big Screen Analyze /////
///////////////////////////////////

function openFullAnalyzeScreen(){
  document.getElementById("id_PopUp_fullAnalzeWindow").style.display="flex";
  updateAnalyze();
}

function closeFullAnalyzeScreen(){
  document.getElementById("id_PopUp_fullAnalzeWindow").style.display="none";
  updateAnalyze();
}





//////////////////////////////////////
/// Impressum Window /////
///////////////////////////////////


function closeImpressum(){
  document.getElementById("id_PopUp_ImpessumWindow").style.display="none";
}

function openImpressum(){
  document.getElementById("id_PopUp_ImpessumWindow").style.display="flex";
  document.getElementById("id_dropDownContainer").style.display="none";
}

//////////////////////////////////////
/// Alert Window /////
///////////////////////////////////


function closeAlert(){
  document.getElementById("id_PopUp_AlertWindow").style.display="none";
}

function openAlert(txt){
  document.getElementById("id_PopUp_AlertWindow").style.display="flex";
  document.getElementById("id_alertText").innerHTML=txt;
}


//////////////////////////////////////
/// Ask Window /////
///////////////////////////////////

function openScale(){

  if(globalCMS1.getKeyLength()>0){
    document.getElementById("id_PopUp_ScaleWindow").style.display="flex";
    document.getElementById("id_popupWindow_ScaleInfoText").style.display="none";
    updateAutoRangeInput();
  }
  document.getElementById("id_dropDownContainer").style.display="none";
}

function checkScale(){

  var start = parseFloat(document.getElementById("id_inputAutoRangeStart").value);
  var end = parseFloat(document.getElementById("id_inputAutoRangeEnd").value);

  if(start>=end){
    //document.getElementById("id_PopUp_ScaleWindow").style.display="none";
    document.getElementById("id_popupWindow_ScaleInfoText").style.display="block";
  }
  else{
    globalCMS1.setAutoRange(start,end);
    saveCreateProcess();

    if(editPage_optimizationMode){
      updateOptimizationPage();
    }

    updateEditPage();
    document.getElementById("id_PopUp_ScaleWindow").style.display="none";
    document.getElementById("id_popupWindow_ScaleInfoText").style.display="none";

    if(document.getElementById("id_EditPage_Edit_Keys").style.display!="none"){
       openEditKeyDiv(document.getElementById("id_EditPage_EditKey_List").selectedIndex);
    }
  }

}


function closeScale(){
  document.getElementById("id_PopUp_ScaleWindow").style.display="none";
}
