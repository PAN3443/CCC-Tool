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
    probeSection.hideSection();
    optiSection.hideSection();
    newSection.hideSection();
    testingSection.hideSection();
    document.getElementById(this.sectionID).style.display='flex';
    this.updateSection();
  }

  updateSection(){

  }

};
