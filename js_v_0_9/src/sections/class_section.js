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
    if(this.isSectionOpen()){
      exportSection.backSection = this.sectionID;
      tutorialSection.backSection = this.sectionID;
      document.getElementById(this.sectionID).style.display='none';
    }
  }

  showSection(){
    welcomeSection.hideSection();
    myDesignsSection.hideSection();
    gallerySection.hideSection();
    editSection.hideSection();
    probeSection.hideSection();
    optiSection.hideSection();
    newSection.hideSection();
    testingSection.hideSection();
    exportSection.hideSection();
    tutorialSection.hideSection();
    document.getElementById(this.sectionID).style.display='flex';
    this.updateSection();
  }

  updateSection(){

  }

};
