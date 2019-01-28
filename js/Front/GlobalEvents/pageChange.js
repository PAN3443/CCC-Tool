


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

  if(somethingChanged){
    askType=4;
    openAskWindow();
  }
  else{
    showMyDesignsPage();
  }

}

function showMyDesignsPage(){

  if(doColorblindnessSim){
    changeColorblindness();
  }

  document.getElementById("id_welcomePage").style.display="none";
  document.getElementById("id_newCMSPage").style.display="none";
  document.getElementById("id_EditPage").style.display="none";
  document.getElementById("id_GalleryPage").style.display="none";
  document.getElementById("id_myDesignsPage").style.display="block";
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
  document.getElementById("id_header_interpolationSpaceWarning").style.visibility="hidden";


stopPathPlotAnimation();
stopAnimationMapping();

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

}


//////////////////////
//////////////////////

function showGallery(){
  document.getElementById("id_myDesignsPage").style.display="none";

  document.getElementById("id_GalleryPage").style.display="block";
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


}
