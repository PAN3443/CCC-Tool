


function changeDisplayPredefined(){
  if(editSection.showPredefined)
    editSection.showPredefined=false;
  else
    editSection.showPredefined=true;

  editSection.styleEditPage();
}

function changeDisplayPathplot(){
  if(editSection.showPathplot){
    if(editSection.getNumPAM()==2)
    editSection.showPathplot=false;
  }
  else{
    if(editSection.getNumPAM()<2)
      editSection.showPathplot=true;
    else
      return
  }
  editSection.styleEditPage();
}

function changeDisplayAnalysis(){
  if(editSection.showAnalysis){
    if(editSection.getNumPAM()==2)
    editSection.showAnalysis=false;
  }
  else{
    if(editSection.getNumPAM()<2)
      editSection.showAnalysis=true;
    else
      return
  }
  editSection.styleEditPage();
}

function changeDisplayMapping(){
  if(editSection.showMapping){
    if(editSection.getNumPAM()==2)
    editSection.showMapping=false;
  }
  else{
    if(editSection.getNumPAM()<2)
      editSection.showMapping=true;
    else
      return
  }
  editSection.styleEditPage();
}
