class class_Edit_Optimization_Section extends class_Edit_Basis_Section {

  constructor() {
    super('id_OptimizationPage');
    this.cmsCanvasID = 'id_OptiPage_CMS_Canvas';
    this.cmsNameID = 'id_opti_cms_name';
    this.cmsInterpolationID = 'id_opti_cms_interpolation';
    this.cmsNaNColorID = 'id_opti_cms_NaN';
    this.cmsAboveID = 'id_opti_cms_Below';
    this.cmsBelowID = 'id_opti_cms_Above';
    this.optimizationCMS = new class_CMS();
    this.somethingChanged=false;
    this.somethingOptimized=false;


    /// Part: Pathplot
    this.part_Pathplot.partDivID="id_OptiPage_PathplotContainer";
    this.part_Pathplot.pathPlot_CoordID="id_OptiPage_PathplotCoord";
    this.part_Pathplot.pathPlot_Width_VW=30;
    this.part_Pathplot.pathPlot_Height_VH=90;
    //this.part_Pathplot.partIsReady=true;
    /// Part: Analysis
    this.part_Analysis.partDivID="id_OptiPage_AnalysisContainer";
    this.part_Analysis.optionRowID="id_OptiPage_AnalysisOptions";
    this.part_Analysis.selectTypeID="id_OptiPage_SelectAnalysisType";
    this.part_Analysis.analysis_Width_VW=45;
    this.part_Analysis.analysis_Height_VH=60;
    //this.part_Analysis.partIsReady=true;

  }

  updateSection(){
    super.updateSection();
    this.optimizationCMS.deleteReferences();
    this.optimizationCMS = cloneCMS(this.editCMS);
    this.somethingOptimized=false;
  }

  changeInterpolationSpace(){
    var intSpace = document.getElementById(this.selectInterpolationSpaceID).options[document.getElementById(this.selectInterpolationSpaceID).selectedIndex].value;
    this.editCMS.setInterpolationSpace(intSpace);
    this.optimizationCMS.setInterpolationSpace(intSpace);
    this.updateSection();
  }

  changeInterpolationType(){

    switch (document.getElementById(this.selectInterpolationTypeID).selectedIndex){
      case 0:
        this.editCMS.setInterpolationType("linear");
        this.optimizationCMS.setInterpolationType("linear");
        break;
        case 1:
          this.editCMS.setInterpolationType("spline");
          this.optimizationCMS.setInterpolationType("spline");
          break;
    }

    this.updateSection(); // = update CMS, Mapping and Analyze Plots
  }

  hideSection(){
    super.hideSection();
    this.part_Pathplot.pp_3D_StopAnimation();
  }

  showSection(){
    if(editSection.editCMS.getKeyLength()<2){
      openAlert("Maeeeh");
    }
    else {
      this.editCMS.deleteReferences();
      this.editCMS = cloneCMS(editSection.editCMS);
      super.showSection();
      this.part_Pathplot.pp_3D_StartAnimation();
      this.part_Pathplot.changePathPlotSpace(); // for drawing the pathplot space

      this.part_Analysis.stylePart();

      this.somethingChanged=false;
      document.getElementById("id_optiPage_editWarning").style.visibility="hidden";
    }
  }

  saveCreateProcess(){
        this.somethingChanged=true;
        document.getElementById("id_optiPage_editWarning").style.visibility="visible";
  }

  reset(){
    if(this.somethingChanged){
      this.editCMS.deleteReferences();
      this.editCMS = cloneCMS(editSection.editCMS);
      this.somethingChanged=false;
      document.getElementById("id_optiPage_editWarning").style.visibility="hidden";
      this.updateSection();
    }
    /*else {
      openAlert("This CMS is in the original condition from the Edit Section.");
    }*/
  }

  acceptAndReplace(){
    if(this.somethingOptimized || this.somethingChanged){
      editSection.editCMS.deleteReferences();
      editSection.editCMS = cloneCMS(this.optimizationCMS);
      editSection.saveCreateProcess();
    }

    editSection.showSection();
  }




};
