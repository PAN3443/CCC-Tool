
function startLeaveEditPage(){

  document.getElementById("id_EditPage_savePartDiv").style.display="none";
  document.getElementById("id_EditPage_interpolationPartDiv").style.display="none";
  document.getElementById("id_EditPage_cmsTablePartDiv").style.display="none";
  document.getElementById("id_EditPage_GuideLineDiv").style.display="none"
  document.getElementById("id_EditPage_StopInteractionDiv").style.width="0%"


  if(somethingChanged){
    askType=4;
    openAskWindow();
  }
  else
    showMyDesignsPage();
}

function showMyDesignsPage(){

  document.getElementById("id_welcomePage").style.display="none";
  document.getElementById("id_newCMSPage").style.display="none";
  document.getElementById("id_EditPage").style.display="none";
  document.getElementById("id_myDesignsPage").style.display="block";

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
    somethingChanged=true;

    // create new CMS

    globalCMS1 = new class_CMS();
    globalCMS1.setColormapName(document.getElementById("id_newCMSPage_ColormapName").value);
  }
  else{
    // CMS from MyDesigns
    document.getElementById("id_myDesignsPage").style.display="none";
  }


  // fill Edit pages
  document.getElementById("id_EditPage_CMSName").innerHTML=globalCMS1.getColormapName();

  document.getElementById("id_EditPage_CMS_NaN_Color").style.background=globalCMS1.getNaNColor("rgb").getRGBString();
  document.getElementById("id_EditPage_CMS_Below_Color").style.background=globalCMS1.getBelowColor("rgb").getRGBString();
  document.getElementById("id_EditPage_CMS_Above_Color").style.background=globalCMS1.getAboveColor("rgb").getRGBString();

  document.getElementById("id_EditPage").style.display="block";
  updateEditPage();

}

//////////////////////
//////////////////////

function showGallery(){
  document.getElementById("id_myDesignsPage").style.display="none";
}

//////////////////////
//////////////////////

function showNewCMSPage(){

  if(myDesignsList.lenght>=numberOfMyDesignsObj){
    openAlert("Your My Designs storage is full. Please delete a CMS before the creation of a new one!");
    return;
  }

  document.getElementById("id_myDesignsPage").style.display="none";
  document.getElementById("id_newCMSPage").style.display="block";

  document.getElementById("id_newCMSPage_ColormapName").value = "";
  document.getElementById("id_newCMSPage_MapDescription").value = "";

}


//////////////////////
//////////////////////
