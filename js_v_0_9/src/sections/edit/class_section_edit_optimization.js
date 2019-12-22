class class_Edit_Optimization_Section extends class_Edit_Basis_Section {

  constructor() {
    super('id_OptimizationPage');
    this.originalCMS = new class_CMS();
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


};
