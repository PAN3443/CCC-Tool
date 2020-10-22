class class_Edit_Probe_Section extends class_Edit_Basis_Section {

  constructor() {
    super('id_ProbePage');
    this.cmsCanvasID = 'id_ProbePage_CMS_Canvas';
    this.cmsNameID = 'id_probe_cms_name';
    this.cmsInterpolationID = 'id_probe_cms_interpolation';
    this.cmsNaNColorID = 'id_probe_cms_NaN';
    this.cmsAboveID = 'id_probe_cms_Below';
    this.cmsBelowID = 'id_probe_cms_Above';
  }

  updateSection(){
    super.updateSection();
  }

};
