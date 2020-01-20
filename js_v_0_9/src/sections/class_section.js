class class_Section {

  constructor(divID) {
    this.sectionID = divID;
  }

  isSectionOpen(){
    if(document.getElementById(this.sectionID).style.display!=='none')
      return true;
    else
      return false;
  }

  hideSection() {
    document.getElementById(this.sectionID).style.display='none';
  }

  showSection(){
    welcomeSection.hideSection();
    myDesignsSection.hideSection();
    gallerySection.hideSection();
    editSection.hideSection();
    editSection.pp_3D_StopAnimation();
    probeSection.hideSection();
    optiSection.hideSection();
    optiSection.pp_3D_StopAnimation();
    newSection.hideSection();
    testingSection.hideSection();
    document.getElementById(this.sectionID).style.display='flex';
    this.updateSection();
  }

  updateSection(){

  }

};
