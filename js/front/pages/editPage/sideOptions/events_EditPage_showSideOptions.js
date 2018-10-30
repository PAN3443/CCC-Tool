

function showSaveOptions(){

  document.getElementById("id_EditPage_GuideLineDiv").style.display="none";
  document.getElementById("id_EditPage_interpolationPartDiv").style.display="none";
  document.getElementById("id_EditPage_cmsTablePartDiv").style.display="none";

  if(document.getElementById("id_EditPage_savePartDiv").style.display=="none"){
    document.getElementById("id_EditPage_savePartDiv").style.display="block";
    //document.getElementById("id_EditPage_StopInteractionDiv").style.width="100%";

  }
  else {
    document.getElementById("id_EditPage_savePartDiv").style.display="none";
    //document.getElementById("id_EditPage_StopInteractionDiv").style.width="0%";
  }

}


function saveCMS(){

  myDesignsList[indexActiveCMS] = cloneCMS(globalCMS1);
  document.getElementById("id_header_editWarning").style.display="none";
  somethingChanged=false;
  document.getElementById("id_EditPage_savePartDiv").style.display="none";
  //document.getElementById("id_EditPage_StopInteractionDiv").style.width="0%";

}

function saveCMSasNew(){


  if(myDesignsList.length<numberOfMyDesignsObj){
    myDesignsList.push(cloneCMS(globalCMS1));
    somethingChanged=false;
    document.getElementById("id_header_editWarning").style.display="none";
    document.getElementById("id_EditPage_savePartDiv").style.display="none";
    //document.getElementById("id_EditPage_StopInteractionDiv").style.width="0%";
  }
  else{
    openAlert("You already used the full CMS-storage and the CMS can not saved as new one!");
  }

  document.getElementById("edit_Page_FreeSpaceInfo").innerHTML="Free Places: "+(numberOfMyDesignsObj-myDesignsList.length);

  if(numberOfMyDesignsObj-myDesignsList.length==0){
    document.getElementById("edit_Page_FreeSpaceInfo").style.color="red";
  }
  else{
    document.getElementById("edit_Page_FreeSpaceInfo").style.color="black";
  }

}


function saveColormapToList(){

  if(globalCMS1.getKeyLength()>0){

    if(isEdit==-1){

      if(myList.length<9){
        myList.push(cloneCMS(globalCMS1));
        colormap1SelectIndex=myList.length-1;
        clearCreateSide();

        globalCMS1.clear();
        orderColorSketch();
      }
      else{
        changePage(0);
      }

    }
    else{
      tmpSaveColormap = cloneCMS(globalCMS1);
      openSavePopUp();
    }

    switchModifyModus(0);
  }

}


function showGuideLine(){

  document.getElementById("id_EditPage_savePartDiv").style.display="none";
  document.getElementById("id_EditPage_interpolationPartDiv").style.display="none";
  document.getElementById("id_EditPage_cmsTablePartDiv").style.display="none";

  if(document.getElementById("id_EditPage_GuideLineDiv").style.display=="none"){
    document.getElementById("id_EditPage_GuideLineDiv").style.display="block"
    //document.getElementById("id_EditPage_StopInteractionDiv").style.width="100%"
  }
  else {
    document.getElementById("id_EditPage_GuideLineDiv").style.display="none"
    //document.getElementById("id_EditPage_StopInteractionDiv").style.width="0%"
  }

}

function showInterpolationOptions () {
  document.getElementById("id_EditPage_savePartDiv").style.display="none";
  document.getElementById("id_EditPage_GuideLineDiv").style.display="none";
  document.getElementById("id_EditPage_cmsTablePartDiv").style.display="none";

  if(document.getElementById("id_EditPage_interpolationPartDiv").style.display=="none"){
    document.getElementById("id_EditPage_interpolationPartDiv").style.display="block"
    //document.getElementById("id_EditPage_StopInteractionDiv").style.width="100%"
  }
  else {
    document.getElementById("id_EditPage_interpolationPartDiv").style.display="none"
    //document.getElementById("id_EditPage_StopInteractionDiv").style.width="0%"
  }
}

function showCMSTable () {
  document.getElementById("id_EditPage_savePartDiv").style.display="none";
  document.getElementById("id_EditPage_GuideLineDiv").style.display="none";
  document.getElementById("id_EditPage_interpolationPartDiv").style.display="none";

  if(document.getElementById("id_EditPage_cmsTablePartDiv").style.display=="none"){
    document.getElementById("id_EditPage_cmsTablePartDiv").style.display="block"
    //document.getElementById("id_EditPage_StopInteractionDiv").style.width="100%"
  }
  else {
    document.getElementById("id_EditPage_cmsTablePartDiv").style.display="none"
    //document.getElementById("id_EditPage_StopInteractionDiv").style.width="0%"
  }
}
