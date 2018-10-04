
function startLeaveEditPage(){

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
  }
  else{
    // CMS from MyDesigns
    document.getElementById("id_myDesignsPage").style.display="none";
  }


  document.getElementById("id_EditPage").style.display="block";

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
