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
        return editSection.editCMS.createCMSInfoPackage();
      break;
      case "id_OptimizationPage":
        return optiSection.editCMS.createCMSInfoPackage();
      break;
      case "id_ProbePage":
        return probeSection.editCMS.createCMSInfoPackage();
      break;
    }
  }

  setParentCMS(cmsPackage){
    switch (this.parentID) {
      case "id_EditPage":
        editSection.editCMS.setCMSFromPackage(cmsPackage);
      break;
      case "id_OptimizationPage":
        optiSection.editCMS.setCMSFromPackage(cmsPackage);
      break;
      case "id_ProbePage":
        probeSection.editCMS.setCMSFromPackage(cmsPackage);
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
