class class_Edit_CBSim_Section extends class_Edit_Basis_Section {

  constructor() {
    super('id_CBSimPage');
    this.cmsCanvasID = 'id_cbSimPage_CMS_Canvas';
    this.cmsNameID = 'id_cbSim_cms_name';
    this.cmsInterpolationID = 'id_cbSim_cms_interpolation';
    this.cmsNaNColorID = 'id_cbSim_cms_NaN';
    this.cmsAboveID = 'id_cbSim_cms_Below';
    this.cmsBelowID = 'id_cbSim_cms_Above';
  }

  updateSection(){
    super.updateSection();
  }

  hideSection(){
    super.hideSection();
    //this.part_Pathplot.pp_3D_StopAnimation();
  }

  showSection(){

    if(editSection.editCMS.getKeyLength()<2){
      openAlert("Your CMS is empty and can't be analyzed for colorblindness!");
      return;
    }

    super.showSection();
    //this.part_Pathplot.pp_3D_StartAnimation();

  }

};
