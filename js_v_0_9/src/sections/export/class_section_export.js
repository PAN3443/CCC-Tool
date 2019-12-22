class class_Export_Section extends class_Section {

  constructor() {
    super('id_EditPage');
    this.exportCMS = new class_CMS();
  }

  showSection(){
    document.getElementById(this.sectionID).style.display='flex';
  }

  updateSection(){

  }

  setCMS(cms){
    this.editCMS.deleteReferences();
    this.editCMS=cms;
  }


};
