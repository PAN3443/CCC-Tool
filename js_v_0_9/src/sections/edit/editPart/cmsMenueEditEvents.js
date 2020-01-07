function editCMS_equalKeyIntervals(){
  askType=7;
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
