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
      document.getElementById(this.sectionID).style.display='none';
  }

  showSection(doUpdate){
    document.getElementById("id_popupColorPicker").style.display = "none"; // close colorpicker of the current open section

    for (var i = 0; i < sectionArray.length; i++){
      if(sectionArray[i].isSectionOpen()){
        sectionArray[i].hideSection();
        this.backSection=sectionArray[i].sectionID;
        break;
      }
    }

    document.getElementById(this.sectionID).style.display='flex';

    if(doUpdate!=undefined && !doUpdate)
      return;

    this.updateSection();
  }

  updateSection(){

  }

  backToSection(){
    for (var i = 0; i < sectionArray.length; i++) {
      if(this.backSection===sectionArray[i].sectionID){
        sectionArray[i].showSection();
        break;
      }
    }
  }

};
