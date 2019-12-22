class class_NewCMS_Section extends class_Section {

  constructor() {
    super('id_newCMSPage');
    this.interpolationSpace = "lab";
  }

  updateSection() {

    document.getElementById("id_newCMSPage_ColormapName").value = "Custom CMS";

    document.getElementById("id_NewCMS_SpaceLAB").style.background = "var(--main-coloredButton)";
    document.getElementById("id_NewCMS_SpaceDIN99").style.background = "var(--main-coloredButton)";
    document.getElementById("id_NewCMS_SpaceRGB").style.background = "var(--main-coloredButton)";
    document.getElementById("id_NewCMS_SpaceHSV").style.background = "var(--main-coloredButton)";
    switch (this.interpolationSpace) {
      case "lab":
        document.getElementById("id_NewCMS_SpaceLAB").style.background = "var(--main-active-coloredButton)";
      break;
      case "din99":
        document.getElementById("id_NewCMS_SpaceDIN99").style.background = "var(--main-active-coloredButton)";
      break;
      case "rgb":
        document.getElementById("id_NewCMS_SpaceRGB").style.background = "var(--main-active-coloredButton)";
      break;
      case "hsv":
        document.getElementById("id_NewCMS_SpaceHSV").style.background = "var(--main-active-coloredButton)";
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

  createCMS(){
    if(document.getElementById("id_newCMSPage_ColormapName").value===""){
      openAlert("Please enter a name for your new CMS!");
      return;
    }

    editSection.createCMS(document.getElementById("id_newCMSPage_ColormapName").value,this.interpolationSpace);
    editSection.showSection();
  }

};
