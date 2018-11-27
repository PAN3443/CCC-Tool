

function updatePageWidth(){
  var actualInnerWidth = document.body.clientWidth;
  //var actualInnerWidth = document.body.scrollWidth;

  document.getElementById("id_ccctoolPage").style.width = actualInnerWidth + "px";
}

function activateMenuDropdown() {

    if(document.getElementById("id_dropDownContainer").style.display=="none")
    document.getElementById("id_dropDownContainer").style.display="block";
    else
    document.getElementById("id_dropDownContainer").style.display="none";
}

/*window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}*/

function startLeaveEditPage(){

  document.getElementById("id_EditPage_savePartDiv").style.display="none";
  document.getElementById("id_EditPage_interpolationPartDiv").style.display="none";
  document.getElementById("id_EditPage_cmsTablePartDiv").style.display="none";
  document.getElementById("id_EditPage_GuideLineDiv").style.display="none";
  document.getElementById("id_PopUp_StopWorkingWindow").style.display="none";
  document.getElementById("id_EditPage_guideLinePartButton").style.visibility="visible";
  document.getElementById("id_EditPage_cmsProbePartButton").style.visibility="visible";
  document.getElementById("id_EditPage_cmsTablePartButton").style.visibility="visible";


  if(somethingChanged){
    askType=4;
    openAskWindow();
  }
  else{
    showMyDesignsPage();
  }

}

function showMyDesignsPage(){



  for (var i = refElementContainer.length - 1; i >= 0; i--) {
    refElementContainer[i].remove();
    refElementContainer.pop();
  }

  document.getElementById("id_welcomePage").style.display="none";
  document.getElementById("id_newCMSPage").style.display="none";
  document.getElementById("id_EditPage").style.display="none";
  document.getElementById("id_myDesignsPage").style.display="block";
  drawMyDesigns();


  //DropDown
  if(document.getElementById("id_dropDownContainer").style.display=="block")
  document.getElementById("id_dropDownContainer").style.display="none";


  document.getElementById("id_actionMenu_Label").style.display="flex";
  document.getElementById("id_settingMenu_Label_RGBPossible_Button").style.display="none";
  document.getElementById("id_settingMenu_Label_AnalyzeUpdate_Button").style.display="none";
  document.getElementById("id_actionMenu_editPart").style.display="none";
  document.getElementById("id_actionMenu_myDesignPart").style.display="block";
  document.getElementById("id_dropDownMenu_DisplayOptions").style.display="none";
  document.getElementById("id_header_editWarning").style.display="none";

  updatePageWidth();
}

//////////////////////
//////////////////////

function showEditPage(){

  if(document.getElementById("id_newCMSPage").style.display!="none"){

    if(document.getElementById("id_newCMSPage_ColormapName").value==""){
      openAlert("Please enter a name for your new CMS!");
      return;
    }

    // Empty CMS
    document.getElementById("id_newCMSPage").style.display="none";


    // create new CMS

    globalCMS1 = new class_CMS();
    globalCMS1.setColormapName(document.getElementById("id_newCMSPage_ColormapName").value);
    globalCMS1.setDescription(document.getElementById("id_newCMSPage_MapDescription").value);

    myDesignsList.push(cloneCMS(globalCMS1));
    indexActiveCMS=myDesignsList.length-1;

    switchModifyModus(0);
    changePredefinedStructure(0);

  }
  else{
    // CMS from MyDesigns
    document.getElementById("id_myDesignsPage").style.display="none";

    globalCMS1 = cloneCMS(myDesignsList[indexActiveCMS]);

    if(globalCMS1.getKeyLength() != 0)
    switchModifyModus(2);
    else{
      switchModifyModus(0);
      changePredefinedStructure(0);
    }

  }

  switchCMSInformation(0);
  switchAnalyzeMapping(0);


  colormapProcess=[];
  processPosition=-1;

  // fill Edit pages
  document.getElementById("id_EditPage_CMSName").value=globalCMS1.getColormapName();
  document.getElementById("id_editPage_CMSDescription").value=globalCMS1.getDescription();

  document.getElementById("id_EditPage_CMS_NaN_Color").style.background=globalCMS1.getNaNColor("rgb").getRGBString();
  document.getElementById("id_EditPage_CMS_Below_Color").style.background=globalCMS1.getBelowColor("rgb").getRGBString();
  document.getElementById("id_EditPage_CMS_Above_Color").style.background=globalCMS1.getAboveColor("rgb").getRGBString();

  document.getElementById("id_EditPage").style.display="inline-block";


  document.getElementById("edit_Page_FreeSpaceInfo").innerHTML="Free Places: "+(numberOfMyDesignsObj-myDesignsList.length);

  if(numberOfMyDesignsObj-myDesignsList.length==0){
    document.getElementById("edit_Page_FreeSpaceInfo").style.color="red";
  }
  else{
    document.getElementById("edit_Page_FreeSpaceInfo").style.color="black";
  }


  updateInterpolationSpaceEditPage();

  //DropDown
  if(document.getElementById("id_dropDownContainer").style.display=="block")
  document.getElementById("id_dropDownContainer").style.display="none";



  if(document.getElementById("id_EditPage_PreviewProbe_Div").style.display!="none")
  showHideProbePreview();

  document.getElementById("id_actionMenu_Label").style.display="flex";
  document.getElementById("id_actionMenu_editPart").style.display="block";
  document.getElementById("id_settingMenu_Label_RGBPossible_Button").style.display="block";
  document.getElementById("id_settingMenu_Label_AnalyzeUpdate_Button").style.display="block";
  document.getElementById("id_actionMenu_myDesignPart").style.display="none";
  document.getElementById("id_dropDownMenu_DisplayOptions").style.display="block";

  updatePageWidth();
  updateEditPage();
  drawPredefined_MyDesignsCMS();



}


//////////////////////
//////////////////////

function showGallery(){
  document.getElementById("id_myDesignsPage").style.display="none";

  updatePageWidth();
}

//////////////////////
//////////////////////

function showNewCMSPage(){

  if(myDesignsList.length>=numberOfMyDesignsObj){
    openAlert("Your My Designs storage is full. Please delete a CMS before the creation of a new one!");
    return;
  }

  document.getElementById("id_myDesignsPage").style.display="none";
  document.getElementById("id_newCMSPage").style.display="block";

  document.getElementById("id_newCMSPage_ColormapName").value = "";
  document.getElementById("id_newCMSPage_MapDescription").value = "";

  //DropDown
  if(document.getElementById("id_dropDownContainer").style.display=="block")
document.getElementById("id_dropDownContainer").style.display="none";

document.getElementById("id_actionMenu_Label").style.display="none";
document.getElementById("id_actionMenu_editPart").style.display="none";
document.getElementById("id_settingMenu_Label_RGBPossible_Button").style.display="none";
document.getElementById("id_settingMenu_Label_AnalyzeUpdate_Button").style.display="none";
document.getElementById("id_actionMenu_myDesignPart").style.display="none";
document.getElementById("id_dropDownMenu_DisplayOptions").style.display="none";

updatePageWidth();

}
