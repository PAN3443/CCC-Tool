class class_Options_Section extends class_Section {

  constructor() {
    super('id_OptionsPage');
    this.settingType = 0;
    this.settingStatus = 0;


  }

  updateSection() {

    document.getElementById("id_CT_1_Settings").style.display = "none";
    document.getElementById("id_CT_2_Settings").style.display = "none";
    document.getElementById("id_CDM_Settings").style.display = "none";

    document.getElementById("id_Options_CT").style.background = "var(--main-coloredButton)";
    document.getElementById("id_Options_CDM").style.background = "var(--main-coloredButton)";

    switch (this.settingType) {
      case 0:
        ///////////////////////////////////////////////////////
        /////////////// Color Transformation //////////////////
        ///////////////////////////////////////////////////////
        document.getElementById("id_Options_CT").style.background = "var(--main-active-coloredButton)";
        document.getElementById("id_Options_RGBtoXYZ").style.background = "var(--main-coloredButton)";
        document.getElementById("id_Options_XYZtoLMS").style.background = "var(--main-coloredButton)";
        document.getElementById("id_Options_XYZtoLab").style.background = "var(--main-coloredButton)";
        document.getElementById("id_Options_LABtoDIN99").style.background = "var(--main-coloredButton)";

        document.getElementById("id_Options_RGBtoXYZ").style.width = "25vw";
        document.getElementById("id_Options_XYZtoLMS").style.width = "25vw";
        document.getElementById("id_Options_XYZtoLab").style.width = "25vw";
        document.getElementById("id_Options_LABtoDIN99").style.width = "25vw";
        document.getElementById("id_Options_de94").style.width = "0vw";
        document.getElementById("id_Options_de2000").style.width = "0vw";

        switch (this.settingStatus) {
          case 0:
            document.getElementById("id_CT_1_Settings").style.display = "flex";
            document.getElementById("id_Options_RGBtoXYZ").style.background = "var(--main-active-coloredButton)";
            break;
          case 1:
            document.getElementById("id_CT_1_Settings").style.display = "flex";
            document.getElementById("id_Options_XYZtoLMS").style.background = "var(--main-active-coloredButton)";
            break;
          case 2:
            document.getElementById("id_CT_2_Settings").style.display = "flex";
            document.getElementById("id_Options_XYZtoLab").style.background = "var(--main-active-coloredButton)";
            break;
          case 3:
            document.getElementById("id_CT_2_Settings").style.display = "flex";
            document.getElementById("id_Options_LABtoDIN99").style.background = "var(--main-active-coloredButton)";
            break;
          default:
            this.settingStatus = 0;
            this.updateSection();
        }
        break;
      case 1:
        //////////////////////////////////////////////////////
        /////////////////// Color Metric /////////////////////
        //////////////////////////////////////////////////////
        document.getElementById("id_Options_CDM").style.background = "var(--main-active-coloredButton)";
        document.getElementById("id_CDM_Settings").style.display = "flex";
        document.getElementById("id_Options_de94").style.background = "var(--main-coloredButton)";
        document.getElementById("id_Options_de2000").style.background = "var(--main-coloredButton)";

        document.getElementById("id_Options_RGBtoXYZ").style.width = "0vw";
        document.getElementById("id_Options_XYZtoLMS").style.width = "0vw";
        document.getElementById("id_Options_XYZtoLab").style.width = "0vw";
        document.getElementById("id_Options_LABtoDIN99").style.width = "0vw";
        document.getElementById("id_Options_de94").style.width = "50vw";
        document.getElementById("id_Options_de2000").style.width = "50vw";
        switch (this.settingStatus) {
          case 0:
            document.getElementById("id_Options_de94").style.background = "var(--main-active-coloredButton)";
            document.getElementById("id_PopUp_Metric_Div4").style.visibility="visible";
            document.getElementById("id_PopUp_Metric_Div5").style.visibility="hidden";
          break;
          case 1:
            document.getElementById("id_Options_de2000").style.background = "var(--main-active-coloredButton)";
            document.getElementById("id_PopUp_Metric_Div4").style.visibility="hidden";
            document.getElementById("id_PopUp_Metric_Div5").style.visibility="visible";
          break;
          default:
            this.settingStatus = 0;
            this.updateSection();
        }
        break;
      default:
        this.settingType = 0;
        this.updateSection();
    }

  }

  default () {

  }

  reset() {

  }

  applySettings() {

  }

  switchSettings(type, status) {
    this.settingType = type;
    this.settingStatus = status;
    this.updateSection();
  }

  changeRGBtoXYZ() {

  }

  changeXYZtoLMS() {

  }

};
