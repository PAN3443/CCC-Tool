

//////////////////////////////////////
/// Full Screen Testing Vis /////
///////////////////////////////////
function openFullTestMappingScreen(text){
  document.getElementById("id_PopUp_fullTestingWindow").style.display="flex";

  if(document.getElementById("id_TestVisualization_Mesh").checked){
    testingSection.element_singleTest.tm_3D_Resize();
  }

}

function closeFullTestMappingScreen(){
  document.getElementById("id_PopUp_fullTestingWindow").style.display="none";

  if(document.getElementById("id_TestVisualization_Mesh").checked)
    testingSection.element_singleTest.tm_3D_Resize();
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
/// Scale Window /////
///////////////////////////////////

function openScale(){

  if(editSection.editCMS.getKeyLength()>0){
    document.getElementById("id_PopUp_ScaleWindow").style.display="flex";
    document.getElementById("id_popupWindow_ScaleInfoText").style.display="none";
    updateAutoRangeInput();
  }
}

function updateAutoRangeInput(){
  document.getElementById("id_inputAutoRangeStart").value=editSection.editCMS.getRefPosition(0);
  document.getElementById("id_inputAutoRangeEnd").value=editSection.editCMS.getRefPosition(editSection.editCMS.getKeyLength()-1);
  document.getElementById("id_inputAutoRangeEnd").min = document.getElementById("id_inputAutoRangeStart").value;
  document.getElementById("id_inputAutoRangeStart").max = document.getElementById("id_inputAutoRangeEnd").value;
}

function checkScale(){

  var start = parseFloat(document.getElementById("id_inputAutoRangeStart").value);
  var end = parseFloat(document.getElementById("id_inputAutoRangeEnd").value);

  if(start>=end){
    //document.getElementById("id_PopUp_ScaleWindow").style.display="none";
    document.getElementById("id_popupWindow_ScaleInfoText").style.display="block";
  }
  else{
    editSection.editCMS.setAutoRange(start,end);
    editSection.saveCreateProcess();
    editSection.updateSection();
    document.getElementById("id_PopUp_ScaleWindow").style.display="none";
    document.getElementById("id_popupWindow_ScaleInfoText").style.display="none";
  }

}


function closeScale(){
  document.getElementById("id_PopUp_ScaleWindow").style.display="none";
}

//////////////////////////////////////
/// Shortcuts /////
///////////////////////////////////

function closeShortcutsWindow(){
  document.getElementById("id_PopUp_ShortcutsWindow").style.display="none";
}

function openShortcutsWindow(){
  document.getElementById("id_PopUp_ShortcutsWindow").style.display="flex";
  document.getElementById("id_PopUp_Shortcuts_Undo_Label").innerHTML= sc_key_arrayEdit[0];
  document.getElementById("id_PopUp_Shortcuts_Redo_Label").innerHTML= sc_key_arrayEdit[1];
  document.getElementById("id_PopUp_Shortcuts_Save_Label").innerHTML= sc_key_arrayEdit[2];
  document.getElementById("id_PopUp_Shortcuts_Scale_Label").innerHTML= sc_key_arrayEdit[4];
  document.getElementById("id_PopUp_Shortcuts_Clear_Label").innerHTML= sc_key_arrayEdit[5];
  document.getElementById("id_PopUp_Shortcuts_SaveAsNew_Label").innerHTML= sc_key_arrayEdit[3];
  document.getElementById("id_PopUp_Shortcuts_Export_Label").innerHTML= sc_key_arrayEdit[6];
  document.getElementById("id_PopUp_Shortcuts_Interpolation_Label").innerHTML= sc_key_arrayEdit[7];
  document.getElementById("id_PopUp_Shortcuts_AddKey_Label").innerHTML= sc_key_arrayEdit[8];
  document.getElementById("id_PopUp_Shortcuts_RemoveKey_Label").innerHTML= sc_key_arrayEdit[9];
}
