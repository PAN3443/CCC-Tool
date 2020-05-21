
function openCloseEditHeaderButtons(){

  if(document.getElementById("id_edit_HeaderButtonDiv").style.display!="none"){
    document.getElementById("id_edit_HeaderButtonDiv").style.display="none";
    document.getElementById("id_EditPage_CMSVisDiv").style.height="25vh";
  }
  else {
    document.getElementById("id_edit_HeaderButtonDiv").style.display="flex";
    document.getElementById("id_EditPage_CMSVisDiv").style.height="20vh";
  }
  editSection.drawEditCMSVIS();
}



function editCMS_equalKeyIntervals(){

  document.getElementById("id_PopUp_AskCheck").onclick = function (){
    closeAsk();
    editSection.editCMS.equalKeyIntervals();
    editSection.saveCreateProcess();
    editSection.updateSection();
  }
  document.getElementById("id_askText").innerHTML="Do you really want to change the reference values of all keys to equal intervals?";
  openAskWindow();

}

function changeAddKeyModus(){
  if(editSection.getKeyModus()==1){
    editSection.setKeyModus(0);
  }
  else {
    editSection.setKeyModus(1);
  }
}

function changeRemoveKeyModus(){
  if(editSection.getKeyModus()==2){
    editSection.setKeyModus(0);
  }
  else {
    editSection.setKeyModus(2);
  }
}

function clearColormap(){
  if(editSection.editCMS.getKeyLength()>0){
    document.getElementById("id_PopUp_AskCheck").onclick = function (){
      closeAsk();
      editSection.editCMS.clear();
      editSection.updateSection();
    }
    document.getElementById("id_askText").innerHTML="Do you really want to clear the CMS?";
    openAskWindow();
  }
}

function reverseCMS(){
  editSection.editCMS.calcReverse();
  editSection.updateSection();
  editSection.saveCreateProcess();
}

function refreshKeyValueEdit(){
  var selectedIndex = document.getElementById("id_EditPage_EditKey_List").selectedIndex;
  document.getElementById("id_EditPage_KeyValueEdit_warning").innerHTML="";
  document.getElementById("id_EditPage_KeyValueEdit_previousVal").innerHTML="";
  document.getElementById("id_EditPage_KeyValueEdit_nextVal").innerHTML="";

  if(selectedIndex!=0){
    document.getElementById("id_EditPage_KeyValueEdit_previousVal").innerHTML=editSection.editCMS.getRefPosition(selectedIndex-1).toFixed(5)+" <";
  }

  document.getElementById("id_EditPage_KeyValueEdit_input").value = editSection.editCMS.getRefPosition(selectedIndex);

  if(selectedIndex!=editSection.editCMS.getKeyLength()-1){
    document.getElementById("id_EditPage_KeyValueEdit_nextVal").innerHTML= "< "+editSection.editCMS.getRefPosition(selectedIndex+1).toFixed(5);
  }
}

function checkKeyValueChange(){

  var tmpVal = Number(document.getElementById("id_EditPage_KeyValueEdit_input").value);

  if(isNaN(tmpVal)){
    document.getElementById("id_EditPage_KeyValueEdit_warning").innerHTML="&#9888";
    document.getElementById("id_EditPage_KeyValueEdit_warning").title="Warning: Input is not a number.";
    return;
  }

  var selectedIndex = document.getElementById("id_EditPage_EditKey_List").selectedIndex;
  if(selectedIndex!=0){
    var preVal = editSection.editCMS.getRefPosition(selectedIndex-1);
    if(tmpVal<=preVal){
      document.getElementById("id_EditPage_KeyValueEdit_warning").innerHTML="&#9888";
      document.getElementById("id_EditPage_KeyValueEdit_warning").title="Warning: Input has to be larger than the reference value of the previous key.";
      return;
    }
  }

  if(selectedIndex!=editSection.editCMS.getKeyLength()-1){
    var nextVal = editSection.editCMS.getRefPosition(selectedIndex+1);
    if(tmpVal>=nextVal){
      document.getElementById("id_EditPage_KeyValueEdit_warning").innerHTML="&#9888";
      document.getElementById("id_EditPage_KeyValueEdit_warning").title="Warning: Input has to be smaller than the reference value of the following key.";
      return;
    }
  }

  editSection.editCMS.setRefPosition(selectedIndex,tmpVal);
  editSection.updateSection();
  document.getElementById("id_EditPage_KeyValueEdit_warning").innerHTML="";
}

function exportEditCMS(){
  var clone = cloneCMS(editSection.editCMS);
  if(clone.getKeyLength()==0){
    openAlert("Your CMS is empty. Please create first a colormap before visiting the export section.");
    clone.deleteReferences();
    return;
  }
  exportSection.setCMS(clone);
  exportSection.showSection();
}
