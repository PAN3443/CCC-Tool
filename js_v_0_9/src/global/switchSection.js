function switchSection(type){

  switch (type) {
    case 0:
      welcomeSection.showSection();
    break;
    case 1:
      myDesignsSection.showSection();
    break;
    case 2:
      gallerySection.showSection();
    break;
    case 3:
      if(myDesignsSection.checkMyDesignLimit()){
          openAlert("You already used the full CMS-storage!");
          return;
      }
      newSection.showSection();
    break;
    case 4:
      editSection.showSection();
    break;
    case 5:
      testingSection.showSection();
    break;
  }
}

function showWelcomePage(){
  switchSection(0);
}

function showTestPage(){
  switchSection(5);
}

function showMyDesignsPage(){

  if(editSection.isSectionOpen()){
    if(editSection.somethingChanged){
      if(myDesignsSection.myDesignsList[editSection.myDesignID].getKeyLength()==0){
        document.getElementById("id_PopUp_AskCheck").onclick = function (){
          closeAsk();
          myDesignsSection.deleteCMS(editSection.myDesignID);
          switchSection(1);
        }
        document.getElementById("id_askText").innerHTML="Do you really want to leave the edit page and reject unsaved content? The current saved content include an emtpy CMS and will be delted from the MyDesigns. Conitnue?";
        openAskWindow();
      }
      else{
        document.getElementById("id_PopUp_AskCheck").onclick = function (){
          closeAsk();
          switchSection(1);
        }
        document.getElementById("id_askText").innerHTML="Do you really want to leave the edit page and reject unsaved content?";
        openAskWindow();
      }
    }
    else if (editSection.editCMS.getKeyLength()==0) {
      document.getElementById("id_PopUp_AskCheck").onclick = function (){
        closeAsk();
        myDesignsSection.deleteCMS(editSection.myDesignID);
        switchSection(1);
      }
      document.getElementById("id_askText").innerHTML="Your CMS is empty and will be deleted from the MyDesigns section. Do you want to continue?";
      openAskWindow();
    }
    else
      switchSection(1);
  }
  else
    switchSection(1);
}

function showEditPage(){
switchSection(4);
}

function showGallery(){
switchSection(2);
}

function showNewCMSPage(){
switchSection(3);
}


function showTesting(){
  switch (true) {
    case editSection.isSectionOpen():
        var clone = cloneCMS(editSection.editCMS);
        if(clone.getKeyLength()==0){
          openAlert("Your CMS is empty. Please create first a colormap before visiting the testing section.");
          clone.deleteReferences();
          return;
        }
        testingSection.setCMS(clone);
        testingSection.backSection="edit";
      break;
    case myDesignsSection.isSectionOpen():
         if(myDesignsSection.getMyDesignLength()==0){
           openAlert("Your MyDesigns list is empty. Please create first a colormap before visiting the testing section.");
           return;
         }
         testingSection.backSection="myDesigns";
      break;
    default:
      return;
  }
  testingSection.showSection();
}
