//////////////////////////////////////
/// Ask Window /////
///////////////////////////////////

function openAskWindow(){
  document.getElementById("popupAskWindow").style.display="flex";
}

function closeAsk(){
  document.getElementById("popupAskWindow").style.display="none";
}



//////////////////////////////////////
/// Full Screen Mapping Vis /////
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
