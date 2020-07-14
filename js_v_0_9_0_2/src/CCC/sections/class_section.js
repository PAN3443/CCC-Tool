class class_Section {

  constructor(divID) {
    this.sectionID = divID;
    this.backSection = undefined;
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
      testingSection.backSection = this.sectionID;
      document.getElementById(this.sectionID).style.display='none';
    }
  }

  showSection(doUpdate){
    document.getElementById("id_popupColorPicker").style.display = "none"; // close colorpicker of the current open section
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
    autoGenSection.hideSection();
    document.getElementById(this.sectionID).style.display='flex';

    if(doUpdate!=undefined && !doUpdate)
      return;

    this.updateSection();
  }

  updateSection(){

  }

  backToSection(){
    switch (this.backSection) {
      case welcomeSection.sectionID:
        welcomeSection.showSection();
      break;
      case myDesignsSection.sectionID:
        myDesignsSection.showSection();
      break;
      case gallerySection.sectionID:
        gallerySection.showSection();
      break;
      case newSection.sectionID:
        newSection.showSection();
      break;
      case editSection.sectionID:
        editSection.showSection();
      break;
      case probeSection.sectionID:
        probeSection.showSection();
      break;
      case optiSection.sectionID:
        optiSection.showSection();
      break;
      case testingSection.sectionID:
        testingSection.showSection();
      break;
      case exportSection.sectionID:
        exportSection.showSection();
      break;
      case tutorialSection.sectionID:
        tutorialSection.showSection();
      break;
      case autoGenSection.sectionID:
        autoGenSection.showSection();
      break;
      default:
        myDesignsSection.showSection();
    }
  }

};
