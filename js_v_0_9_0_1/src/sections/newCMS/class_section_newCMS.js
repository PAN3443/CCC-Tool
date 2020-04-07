class class_NewCMS_Section extends class_Section {

  constructor() {
    super('id_newPage');
    this.interpolationSpace = "lab";
    this.processType=0;

    document.getElementById("id_NewCMS_Process_Help").onmouseover = function(){document.getElementById("id_NewCMS_Process_HelpContent").style.display="flex";};
    document.getElementById("id_NewCMS_Process_Help").onmouseout = function(){document.getElementById("id_NewCMS_Process_HelpContent").style.display="none";};
  }

  showSection(){
    super.showSection();
    this.changeInterpolationSpace(0);
    this.changeProcessType(0);
  }

  updateSection() {

    document.getElementById("id_newPage_ColormapName").value = "Custom CMS";

    document.getElementById("id_NewCMS_SpaceLAB").style.background = "var(--main-coloredButton_Dark)";
    document.getElementById("id_NewCMS_SpaceDIN99").style.background = "var(--main-coloredButton_Dark)";
    document.getElementById("id_NewCMS_SpaceRGB").style.background = "var(--main-coloredButton_Dark)";
    document.getElementById("id_NewCMS_SpaceHSV").style.background = "var(--main-coloredButton_Dark)";
    switch (this.interpolationSpace) {
      case "lab":
        document.getElementById("id_NewCMS_SpaceLAB").style.background = "var(--main-active-coloredButton_Dark)";
      break;
      case "din99":
        document.getElementById("id_NewCMS_SpaceDIN99").style.background = "var(--main-active-coloredButton_Dark)";
      break;
      case "rgb":
        document.getElementById("id_NewCMS_SpaceRGB").style.background = "var(--main-active-coloredButton_Dark)";
      break;
      case "hsv":
        document.getElementById("id_NewCMS_SpaceHSV").style.background = "var(--main-active-coloredButton_Dark)";
      break;
    }

  }

  changeInterpolationSpace(type) {
    switch (type) {
      case 0:
        this.interpolationSpace = "lab";
        break;
      case 1:
        this.interpolationSpace = "din99";
        break;
      case 2:
        this.interpolationSpace = "rgb";
        break;
      case 3:
        this.interpolationSpace = "hsv";
        break;
    }

    this.updateSection();
  }

  changeProcessType(type){
    this.processType=type;

    document.getElementById("id_NewCMS_AutoGen").style.background = "var(--main-coloredButton_Dark)";
    document.getElementById("id_NewCMS_Freestyle").style.background = "var(--main-coloredButton_Dark)";

    switch (this.processType) {
      case 0:
        document.getElementById("id_NewCMS_Freestyle").style.background = "var(--main-active-coloredButton_Dark)";
      break;
      case 1:
        document.getElementById("id_NewCMS_AutoGen").style.background = "var(--main-active-coloredButton_Dark)";
      break;
      default:
        this.changeProcessType(0);
    }
  }

  createCMS(){
    if(document.getElementById("id_newPage_ColormapName").value===""){
      openAlert("Please enter a name for your new CMS!");
      return;
    }

    switch (this.processType) {
      case 0:
        editSection.createCMS(document.getElementById("id_newPage_ColormapName").value,this.interpolationSpace);
        editSection.showSection();
      break;
      case 1:
        autoGenSection.showSection();
      break;
      default:
        this.changeProcessType(0);
    }
  }
};
