class class_Tutorials_Section extends class_Section {

  constructor() {
    super('id_TutorialPage');
    this.backSection = undefined;
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
      default:
        myDesignsSection.showSection();
    }
  }

  updateSection(){

  }

};
