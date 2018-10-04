

function showSaveOptions(){

  document.getElementById("id_EditPage_GuideLineDiv").style.display="none";
  document.getElementById("id_EditPage_interpolationPartDiv").style.display="none";
  document.getElementById("id_EditPage_cmsTablePartDiv").style.display="none";

  if(document.getElementById("id_EditPage_savePartDiv").style.display=="none"){
    document.getElementById("id_EditPage_savePartDiv").style.display="block"
    document.getElementById("id_EditPage_StopInteractionDiv").style.width="100%"

  }
  else {
    document.getElementById("id_EditPage_savePartDiv").style.display="none"
    document.getElementById("id_EditPage_StopInteractionDiv").style.width="0%"
  }

}

function showGuideLine(){

  document.getElementById("id_EditPage_savePartDiv").style.display="none";
  document.getElementById("id_EditPage_interpolationPartDiv").style.display="none";
  document.getElementById("id_EditPage_cmsTablePartDiv").style.display="none";

  if(document.getElementById("id_EditPage_GuideLineDiv").style.display=="none"){
    document.getElementById("id_EditPage_GuideLineDiv").style.display="block"
    document.getElementById("id_EditPage_StopInteractionDiv").style.width="100%"
  }
  else {
    document.getElementById("id_EditPage_GuideLineDiv").style.display="none"
    document.getElementById("id_EditPage_StopInteractionDiv").style.width="0%"
  }

}

function showInterpolationOptions () {
  document.getElementById("id_EditPage_savePartDiv").style.display="none";
  document.getElementById("id_EditPage_GuideLineDiv").style.display="none";
  document.getElementById("id_EditPage_cmsTablePartDiv").style.display="none";

  if(document.getElementById("id_EditPage_interpolationPartDiv").style.display=="none"){
    document.getElementById("id_EditPage_interpolationPartDiv").style.display="block"
    document.getElementById("id_EditPage_StopInteractionDiv").style.width="100%"
  }
  else {
    document.getElementById("id_EditPage_interpolationPartDiv").style.display="none"
    document.getElementById("id_EditPage_StopInteractionDiv").style.width="0%"
  }
}

function showCMSTable () {
  document.getElementById("id_EditPage_savePartDiv").style.display="none";
  document.getElementById("id_EditPage_GuideLineDiv").style.display="none";
  document.getElementById("id_EditPage_interpolationPartDiv").style.display="none";

  if(document.getElementById("id_EditPage_cmsTablePartDiv").style.display=="none"){
    document.getElementById("id_EditPage_cmsTablePartDiv").style.display="block"
    document.getElementById("id_EditPage_StopInteractionDiv").style.width="100%"
  }
  else {
    document.getElementById("id_EditPage_cmsTablePartDiv").style.display="none"
    document.getElementById("id_EditPage_StopInteractionDiv").style.width="0%"
  }
}
