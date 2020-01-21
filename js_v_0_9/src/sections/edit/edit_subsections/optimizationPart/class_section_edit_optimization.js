class class_Edit_Optimization_Section extends class_Edit_Basis_Section {

  constructor() {
    super('id_OptimizationPage');
    this.originalCMS = new class_CMS();
    this.cmsCanvasID = 'id_OptiPage_CMS_Canvas';
    this.cmsNameID = 'id_opti_cms_name';
    this.cmsInterpolationID = 'id_opti_cms_interpolation';
    this.cmsNaNColorID = 'id_opti_cms_NaN';
    this.cmsAboveID = 'id_opti_cms_Below';
    this.cmsBelowID = 'id_opti_cms_Above';
    this.optimizationCMS = new class_CMS();
  }

  updateSection(){
    super.updateSection();
  }

  changeInterpolationSpace(){
    var intSpace = document.getElementById(this.selectInterpolationSpaceID).options[document.getElementById(this.selectInterpolationSpaceID).selectedIndex].value;
    this.editCMS.setInterpolationSpace(intSpace);
    this.originalCMS.setInterpolationSpace(intSpace);
    this.optimizationCMS.setInterpolationSpace(intSpace);
    this.updateSection();
  }

  changeInterpolationType(){

    switch (document.getElementById(this.selectInterpolationTypeID).selectedIndex){
      case 0:
        this.editCMS.setInterpolationType("linear");
        this.originalCMS.setInterpolationType("linear");
        this.optimizationCMS.setInterpolationType("linear");
        break;
        case 1:
          this.editCMS.setInterpolationType("spline");
          this.originalCMS.setInterpolationType("spline");
          this.optimizationCMS.setInterpolationType("spline");
          break;
    }

    this.updateSection(); // = update CMS, Mapping and Analyze Plots
  }

  hideSection(){
    super.hideSection();
    this.part_Pathplot.pp_3D_StopAnimation();
  }

  /*pp_3D_Animation(){
    //test
    if(optiSection.pp_doAnimation){
      optiSection.pp_animationID = requestAnimationFrame(optiSection.pp_3D_Animation);
    	optiSection.pp_3D_Render();
    }//
  }*/


};
