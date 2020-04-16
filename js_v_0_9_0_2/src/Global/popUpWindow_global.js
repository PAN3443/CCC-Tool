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
/// News /////
///////////////////////////////////

function openNewsPopUp(){
  document.getElementById("id_PopUp_NewsWindow").style.display="flex";
}

function closeNewsPopUp(){
  document.getElementById("id_PopUp_NewsWindow").style.display="none";
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
