class class_Edit_Basis_Section extends class_Section {

  constructor(div_id) {
    super(div_id);
    this.part_CMSVis = new class_Edit_Part_CMSVIS(undefined, div_id);
    this.part_Pathplot = new class_Edit_Part_Pathplot(undefined, div_id);
    this.part_Mapping = new class_Edit_Part_Mapping(undefined, div_id);
    this.part_Analysis = new class_Edit_Part_Analysis(undefined, div_id);

    this.mousePosX = undefined;
    this.mousePosY = undefined;
    /////
    this.cmsCanvasID = undefined;
    this.cmsNameID = undefined;
    this.cmsInterpolationID = undefined;
    this.cmsNaNColorID = undefined;
    this.cmsAboveID = undefined;
    this.cmsBelowID = undefined;

    // CMS Visualization Information
    this.editCMS_key_size = undefined;
    this.editCMS_cmsArea_x1 = undefined;
    this.editCMS_cmsArea_width = undefined;
    this.editCMS_linearKey_y1 = undefined;
    this.editCMS_burdock_y1 = undefined;
    this.editCMS_burdock_height = undefined;
    this.editCMS_linearCMS_y1 = undefined;
    this.editCMS_linearCMS_height = undefined;
    this.editCMS_sketchCMS_y1 = undefined;
    this.editCMS_sketchCMS_height = undefined;
    this.editCMS_sketchKey_y1 = undefined;
  }

  resize() {
    /*if (this.isSectionOpen()) {
      this.part_CMSVis.resize();
      this.part_Pathplot.resize();
      this.part_Mapping.resize();
      this.part_Analysis.resize();
    }*/
  }

  showSection() {
    super.showSection();
    /*this.resize();
    this.doPagePeculiarity();*/
  }

  doPagePeculiarity() {
    // is empty. Filled at the classes extends from this class
    // is for special updating of the section, which not need to be done with each call of updateSection()

    // update Name, Interpolation ....
    /*if (this.cmsNameID != undefined)
      document.getElementById(this.cmsNameID).innerHTML = "Name: " + this.editCMS.getColormapName();
    if (this.cmsInterpolationID != undefined)
      document.getElementById(this.cmsInterpolationID).innerHTML = "Interpolation: " + this.editCMS.getInterpolationSpace() + " (" + this.editCMS.getInterpolationType() + ")"
    document.getElementById(this.cmsNaNColorID).style.background = this.editCMS.getNaNColor("rgb").getRGBString();
    document.getElementById(this.cmsAboveID).style.background = this.editCMS.getAboveColor("rgb").getRGBString();
    document.getElementById(this.cmsBelowID).style.background = this.editCMS.getBelowColor("rgb").getRGBString();*/
  }

  updateSection() {
    // ONLY BASIS like draw CMS
    /*this.drawEditCMSVIS();

    this.part_Pathplot.updatePart(false, true, true);
    this.part_Analysis.updatePart();
    this.part_Mapping.updatePart();*/
  }

  updateMapping() {
    //this.part_Mapping.updatePart();
  }

  getSpecialCMSColor(type, space) {
    /*switch (type) {
      case "nan":
        return this.editCMS.getNaNColor(space);
      case "below":
        return this.editCMS.getAboveColor(space);
      case "above":
        return this.editCMS.getBelowColor(space);
      default:
        return undefined;
    }*/
  }

  setSpecialCMSColor(type, color) {
    /*switch (type) {
      case "nan":
        this.editCMS.setNaNColor(color);
        break;
      case "below":
        this.editCMS.setAboveColor(color);
        break;
      case "above":
        this.editCMS.setBelowColor(color);
        break;
    }*/
  }



};
