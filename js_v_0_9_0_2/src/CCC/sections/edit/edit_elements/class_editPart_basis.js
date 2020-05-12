class class_Edit_Part_Basis{

  constructor(divID,parentID) {
    this.partDivID=divID;
    this.parentID=parentID;
    this.partIsReady=false;
  }

  updatePart(){
    if(this.partDivID==undefined)
      return false;

    var tmpDiv = document.getElementById(this.partDivID);
    if(tmpDiv==null || tmpDiv==undefined)
      return false;

    /*if(tmpDiv.style.display==="none")
      return false;*/

    return this.partIsReady;
  }

  /*getParentCMS(){
    switch (this.parentID) {
      case "id_EditPage":
        return cloneCMS(editSection.editCMS);
      break;
      case "id_OptimizationPage":
        return cloneCMS(optiSection.editCMS);
      break;
      case "id_ProbePage":
        return cloneCMS(probeSection.editCMS);
      break;
    }
  }

  setParentCMS(cms){
    switch (this.parentID) {
      case "id_EditPage":
        editSection.editCMS.deleteReferences();
        editSection.editCMS=cms;
      break;
      case "id_OptimizationPage":
        optiSection.editCMS.deleteReferences();
        optiSection.editCMS=cms;
      break;
      case "id_ProbePage":
        probeSection.editCMS.deleteReferences();
        probeSection.editCMS=cms;
      break;
    }
  }*/

  resize(){

  }

  isPartDisplayed(){
    if(this.partDivID==undefined)
      return;

    var tmpDiv = document.getElementById(this.partDivID);
    if(tmpDiv==null || tmpDiv==undefined)
      return;

    if(tmpDiv.style.display!=="none")
      return true;
    else
      return false;
  }

  showPart(){
    if(this.partDivID==undefined)
      return false;

    var tmpDiv = document.getElementById(this.partDivID);
    if(tmpDiv==null || tmpDiv==undefined)
      return false;

    tmpDiv.style.display="flex";
    return true;
  }


  hidePart(){
    if(this.partDivID==undefined)
      return;

    var tmpDiv = document.getElementById(this.partDivID);
    if(tmpDiv==null || tmpDiv==undefined)
      return;

    tmpDiv.style.display="none";
  }

};
