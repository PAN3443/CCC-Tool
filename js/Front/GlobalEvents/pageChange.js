

function activateMenuDropdown() {

    hideAllDropDowns();

    if(document.getElementById("id_dropDownContainer").style.display=="none")
    document.getElementById("id_dropDownContainer").style.display="block";
    else
    document.getElementById("id_dropDownContainer").style.display="none";
}


function activateThemeDropdown(){

    hideAllDropDowns();

    if(document.getElementById("id_dropDownContainerTheme").style.display=="none"){
      document.getElementById("id_dropDownContainerTheme").style.display="block";
      drawThemes();
    }
    else
    document.getElementById("id_dropDownContainerTheme").style.display="none";
}

function activateNaviDropdown() {

    hideAllDropDowns();

    if(document.getElementById("id_dropDownContainerNavi").style.display=="none"){
      document.getElementById("id_dropDownContainerNavi").style.display="block";
      drawCurrentNavi();
    }
    else
    document.getElementById("id_dropDownContainerNavi").style.display="none";
}

function hideAllDropDowns(){

  document.getElementById("id_dropDownContainer").style.display="none";
  document.getElementById("id_dropDownContainerTheme").style.display="none";
  document.getElementById("id_dropDownContainerNavi").style.display="none";
  document.getElementById("id_popupColorPicker").style.display="none";

}


function startLeaveEditPage(){

  if(document.getElementById("id_EditPage").display!="none" && somethingChanged){
    askType=4;
    openAskWindow();
  }
  else{
    showMyDesignsPage();
  }

}


function showWelcomePage(){
  document.getElementById("id_myDesignsPage").style.display="none";
  document.getElementById("footerDiv").style.display="block";
  document.getElementById("id_TestingPage").style.display="none";
  document.getElementById("id_welcomePage").style.display="block";
  document.getElementById("id_newCMSPage").style.display="none";
  document.getElementById("id_EditPage").style.display="none";
  document.getElementById("id_GalleryPage").style.display="none";
  hideQuickGuide();
}

function showTestPage(){

  if(myDesignsList.length>0){
    document.getElementById("id_myDesignsPage").style.display="none";
    document.getElementById("id_TestingPage").style.display="block";
    openTestSection();

    document.getElementById("id_actionMenu_myDesignPart").style.display="none";
    document.getElementById("id_actionMenu_testPart").style.display="block";
    drawCurrentNavi();
  }
  else{
    openAlert("Sorry. You need at least one CMS in the MyDesigns list to visit the Test Section.");
  }


}

function showMyDesignsPage(){

  if(doColorblindnessSim){
    changeColorblindness();
  }

  document.getElementById("footerDiv").style.display="none";
  document.getElementById("id_TestingPage").style.display="none";
  document.getElementById("id_welcomePage").style.display="none";
  document.getElementById("id_newCMSPage").style.display="none";
  document.getElementById("id_EditPage").style.display="none";
  document.getElementById("id_GalleryPage").style.display="none";
  document.getElementById("id_myDesignsPage").style.display="block";
  document.getElementById("id_actionMenu_testPart").style.display="none";
  drawMyDesigns();


  //DropDown
  if(document.getElementById("id_dropDownContainer").style.display=="block")
  document.getElementById("id_dropDownContainer").style.display="none";


  document.getElementById("id_actionMenu_Label").style.display="flex";
  //document.getElementById("id_settingMenu_Label_RGBPossible_Button").style.display="none";
  document.getElementById("id_settingMenu_Label_AnalyzeUpdate_Button").style.display="none";
  document.getElementById("id_settingMenu_Label_MappingUpdate_Button").style.display="none";
  document.getElementById("id_settingMenu_Label_ReturnMyDesigns_Button").style.display="none";
  document.getElementById("id_actionMenu_editPart").style.display="none";
  document.getElementById("id_actionMenu_myDesignPart").style.display="block";
  document.getElementById("id_dropDownMenu_DisplayOptions").style.display="none";
  document.getElementById("id_header_editWarning").style.visibility="hidden";


stopPathPlotAnimation();
stopAnimationMapping();
stopAnimationTestMapping();
drawCurrentNavi();
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
    globalCMS1.setInterpolationSpace(newCMSInterpolationSpace);
    myDesignsList.push(cloneCMS(globalCMS1));
    indexActiveCMS=myDesignsList.length-1;

  }
  else{
    // CMS from MyDesigns
    document.getElementById("id_myDesignsPage").style.display="none";

    globalCMS1 = cloneCMS(myDesignsList[indexActiveCMS]);


  }

  document.getElementById("id_GalleryPage").style.display="none";



  colormapProcess=[];
  processPosition=-1;

  // fill Edit pages
  document.getElementById("id_EditPage_CMSName").value=globalCMS1.getColormapName();
  //check document.getElementById("id_editPage_CMSDescription").value=globalCMS1.getDescription();

  document.getElementById("id_EditPage_CMS_NaN_Color").style.background=globalCMS1.getNaNColor("rgb").getRGBString();
  document.getElementById("id_EditPage_CMS_Below_Color").style.background=globalCMS1.getBelowColor("rgb").getRGBString();
  document.getElementById("id_EditPage_CMS_Above_Color").style.background=globalCMS1.getAboveColor("rgb").getRGBString();

  document.getElementById("id_EditPage").style.display="flex";


  updateInterpolationSpaceEditPage();

  //DropDown
  if(document.getElementById("id_dropDownContainer").style.display=="block")
  document.getElementById("id_dropDownContainer").style.display="none";

  document.getElementById("id_actionMenu_Label").style.display="flex";
  document.getElementById("id_actionMenu_editPart").style.display="block";
  //document.getElementById("id_settingMenu_Label_RGBPossible_Button").style.display="block";
  document.getElementById("id_settingMenu_Label_AnalyzeUpdate_Button").style.display="block";
  document.getElementById("id_settingMenu_Label_MappingUpdate_Button").style.display="block";
  document.getElementById("id_settingMenu_Label_ReturnMyDesigns_Button").style.display="block";
  document.getElementById("id_actionMenu_myDesignPart").style.display="none";
  document.getElementById("id_dropDownMenu_DisplayOptions").style.display="block";

  //switchAnalyzeMappingProbeSet(0);
  //switchPredefinedCMS(0);
  //switchModifyModus(0);
  update_EditPageStyle();

  if(document.getElementById("id_EditPage_Edit_Path").style.display != "none"){
    startPathPlotAnimation()
  }

  if(document.getElementById("id_EditPage_DivMapping").style.display != "none"){
    startAnimationMapping();
  }
  drawCurrentNavi();

}


//////////////////////
//////////////////////

function showGallery(){
  document.getElementById("id_myDesignsPage").style.display="none";

  document.getElementById("id_GalleryPage").style.display="block";
  drawCurrentNavi();

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
//document.getElementById("id_settingMenu_Label_RGBPossible_Button").style.display="none";
document.getElementById("id_settingMenu_Label_AnalyzeUpdate_Button").style.display="none";
document.getElementById("id_settingMenu_Label_MappingUpdate_Button").style.display="none";
document.getElementById("id_settingMenu_Label_ReturnMyDesigns_Button").style.display="none";
document.getElementById("id_actionMenu_myDesignPart").style.display="none";
document.getElementById("id_dropDownMenu_DisplayOptions").style.display="none";

changeNewInterSpace(2);

drawCurrentNavi();

}
