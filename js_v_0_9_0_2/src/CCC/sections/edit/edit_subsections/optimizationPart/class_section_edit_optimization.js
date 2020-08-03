class class_Edit_Optimization_Section extends class_Edit_Basis_Section {

  constructor() {
    super('id_OptimizationPage');
    this.cmsCanvasID = 'id_OptiPage_CMS_Canvas';
    this.cmsNameID = 'id_opti_cms_name';
    this.cmsInterpolationID = 'id_opti_cms_interpolation';
    this.cmsNaNColorID = 'id_opti_cms_NaN';
    this.cmsAboveID = 'id_opti_cms_Below';
    this.cmsBelowID = 'id_opti_cms_Above';
    this.editCMS_Foundation = new class_CMS();
    this.editCMS_Optimized = new class_CMS();

    this.somethingChanged=false;
    this.somethingOptimized=false;

    this.optiGraph=undefined;


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

    this.helpIDs=["Optimization","LocalUni","GlobalUni","LocalIntOrder","GlobalIntOrder","LocalLegOrder","GlobalLegOrder","LocalDisPow","GlobalDisPow","LocalSmooth","GlobalSmooth"];
  }

  updateSection(){
    super.updateSection();
  }

  changeInterpolationSpace(){
    var intSpace = document.getElementById(this.selectInterpolationSpaceID).options[document.getElementById(this.selectInterpolationSpaceID).selectedIndex].value;
    this.editCMS.setInterpolationSpace(intSpace);
    this.editCMS_Foundation.setInterpolationSpace(intSpace);
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
    if(editSection.editCMS.getInterpolationSpace()==="hsv" || editSection.editCMS.getInterpolationSpace()==="lch"){
      openAlert("Your CMS use the HSV or LCH colorspace for interpolation. Please change the interpolation colorspace to a space, that works with cartesian coordinates.");
      return;
    }

    if(editSection.editCMS.getKeyLength()<2){
      openAlert("Your CMS is empty and can't be optimized!");
      return;
    }

      // Uncheck all optimizations
      document.getElementById("id_OptiPage_LocalSpeedOptimization").checked=false;
      document.getElementById("id_OptiPage_GlobalSpeedOptimization").checked=false;
      document.getElementById("id_OptiPage_LocalIntOrderOptimization").checked=false;
      document.getElementById("id_OptiPage_GlobalIntOrderOptimization").checked=false;
      document.getElementById("id_OptiPage_LocalLegOrderOptimization").checked=false;
      document.getElementById("id_OptiPage_GlobalLegOrderOptimization").checked=false;
      document.getElementById("id_OptiPage_LocalDisPowerOptimization").checked=false;
      document.getElementById("id_OptiPage_GlobalDisPowerOptimization").checked=false;
      document.getElementById("id_OptiPage_Local_SmoothOptimization").checked=false;
      document.getElementById("id_OptiPage_Global_SmoothOptimization").checked=false;

      this.somethingChanged=false;
      this.somethingOptimized=false;
      var editPackage = editSection.editCMS.createCMSInfoPackage();
      this.editCMS_Foundation.setCMSFromPackage(editPackage);
      this.editCMS.setCMSFromPackage(editPackage);
      this.updateElements_CMS_Ref();
      this.fillKeyCombobox(false);
      super.showSection();
      this.part_Pathplot.pp_3D_StartAnimation();

      for (var i = 0; i < document.getElementById("id_OptiPage_SelectOptiSpace").options.length; i++) {
        if(document.getElementById("id_OptiPage_SelectOptiSpace").options[i].value===this.editCMS.getInterpolationSpace()){
            document.getElementById("id_OptiPage_SelectOptiSpace").selectedIndex = i;
            break;
        }
      }
      this.part_Pathplot.changePathPlotSpace();


      this.chooseOptimizationType(0);
      document.getElementById("id_OptiPage_editWarning").style.visibility="hidden";

  }

  changeOptiSpace(){
    var space = document.getElementById("id_OptiPage_SelectOptiSpace").options[document.getElementById("id_OptiPage_SelectOptiSpace").selectedIndex].value;
    this.editCMS.setInterpolationSpace(space);
    this.editCMS_Foundation.setInterpolationSpace(space);
    document.getElementById(this.cmsInterpolationID).innerHTML =  "Interpolation: "+space+" ("+this.editCMS.getInterpolationType()+")"
    this.part_Pathplot.changePathPlotSpace();
    this.calcOptiCMS();
  }

  fillKeyCombobox(saveOldPosition){


    var tmpStartID = document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex;
    var tmpEndID = document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex;

      var selectbox = document.getElementById("id_OptiPage_Optimization_FromKey");
      for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
      {
          selectbox.remove(i);
      }

      // fill startbox
      if(this.editCMS.getKeyLength()==0)
      return;


      for (var i = 1; i <= this.editCMS.getKeyLength(); i++) {

        var opt = document.createElement('option');
        opt.innerHTML = "Key "+i;
        opt.value = i;

        if(i == this.editCMS.getKeyLength()){
          opt.disabled = true;
        }

        selectbox.appendChild(opt);
      }
      document.getElementById("id_OptiPage_Optimization_FromKey").options[0].selected = true;
      ///////////////////////////////////////////////////////////////////////
      selectbox = document.getElementById("id_OptiPage_Optimization_TillKey");
      for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
      {
          selectbox.remove(i);
      }

      for (var i = 1; i <= this.editCMS.getKeyLength(); i++) {

        var opt = document.createElement('option');
        opt.innerHTML = "Key "+i;
        opt.value = i;

        if(i == 1){
          opt.disabled = true;
        }

        selectbox.appendChild(opt);
      }
      document.getElementById("id_OptiPage_Optimization_TillKey").options[document.getElementById("id_OptiPage_Optimization_TillKey").options.length-1].selected = true;

      if(saveOldPosition && tmpStartID!=tmpEndID && tmpStartID>=0 && tmpEndID>=0 && tmpStartID<this.editCMS.getKeyLength() && tmpEndID<this.editCMS.getKeyLength()){
        document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex=tmpStartID;
        document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex=tmpEndID;
        this.updateKeyIndex();
      }
  }

  updateKeyIndex(){

    var startIndex = document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex;
    var endIndex = document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex;

    var options = document.getElementById("id_OptiPage_Optimization_FromKey").options;
    for (var i = 0; i < options.length; i++) {
      if(i<endIndex)
        options[i].disabled = false;
      else
        options[i].disabled = true;
    }

    options = document.getElementById("id_OptiPage_Optimization_TillKey").options;
    for (var i = 0; i < options.length; i++) {
      if(i>startIndex)
        options[i].disabled = false;
      else
        options[i].disabled = true;
    }

    this.calcOptiCMS();
  }

  saveCreateProcess(){
        //// Turn off all automatic optimization ///
        document.getElementById("id_OptiPage_IntOrderOpti_Local_Degree").value=0;
        document.getElementById("id_OptiPage_IntOrderOpti_Global_Degree").value=0;
        document.getElementById("id_OptiPage_LegOrderOpti_Local_Degree").value=0;
        document.getElementById("id_OptiPage_LegOrderOpti_Global_Degree").value=0;
        document.getElementById("id_OptiPage_DisPowerOpti_Local_Degree").value=0;
        document.getElementById("id_OptiPage_DisPowerOpti_Global_Degree").value=0;
        document.getElementById("id_OptiPage_UniOpti_Local_Degree").value=0;
        document.getElementById("id_OptiPage_UniOpti_Global_Degree").value=0;
        document.getElementById("id_OptiPage_SmoothOpti_Local_Degree").value=0;
        document.getElementById("id_OptiPage_SmoothOpti_Global_Degree").value=0;
        ///////////////////////////////////
        this.somethingChanged=true;
        document.getElementById("id_OptiPage_editWarning").style.visibility="visible";

        this.editCMS_Foundation.setCMSFromPackage(this.editCMS.createCMSInfoPackage());
        this.fillKeyCombobox(true);
  }

  reset(){
    if(this.somethingChanged){
      var editPackage = editSection.editCMS.createCMSInfoPackage();
      this.editCMS.setCMSFromPackage(editPackage);
      this.editCMS_Foundation.setCMSFromPackage(editPackage);
      this.somethingChanged=false;
      document.getElementById("id_OptiPage_editWarning").style.visibility="hidden";
      this.updateSection();
      this.fillKeyCombobox(true);
    }
    /*else {
      openAlert("This CMS is in the original condition from the Edit Section.");
    }*/
  }

  acceptAndReplace(){
    if(this.somethingOptimized || this.somethingChanged){
      editSection.editCMS.setCMSFromPackage(this.editCMS.createCMSInfoPackage());
      editSection.saveCreateProcess();
    }

    editSection.showSection();
  }

  showHelp(index){
    for (var i = 0; i < this.helpIDs.length; i++) {
      document.getElementById("id_OptiPage_Info_"+this.helpIDs[i]).style.display="none";
    }
    if(index!=undefined && index<this.helpIDs.length)
      document.getElementById("id_OptiPage_Info_"+this.helpIDs[index]).style.display="flex";
  }

  chooseOptimizationType(type){

  document.getElementById("id_Select_Uniform_Opti").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_Select_IntOrder_Opti").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_Select_LegOrder_Opti").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_Select_DisPower_Opti").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_Select_Smoothness_Opti").classList.remove("class_TabRowButtonActive");

  document.getElementById("id_Select_Uniform_Opti").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_Select_IntOrder_Opti").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_Select_LegOrder_Opti").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_Select_DisPower_Opti").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_Select_Smoothness_Opti").classList.add("class_TabRowButtonNotActive");


  document.getElementById("id_Opti_Uniformity_Div").style.display="none";
  document.getElementById("id_Opti_IntOrder_Div").style.display="none";
  document.getElementById("id_Opti_LegOrder_Div").style.display="none";
  document.getElementById("id_Opti_DisPower_Div").style.display="none";
  document.getElementById("id_Opti_Smooth_Div").style.display="none";

  switch (type) {
    case 0:
    document.getElementById("id_Select_Uniform_Opti").classList.remove("class_TabRowButtonNotActive");
    document.getElementById("id_Select_Uniform_Opti").classList.add("class_TabRowButtonActive");
    document.getElementById("id_Opti_Uniformity_Div").style.display="block";
      break;
      case 1:
      document.getElementById("id_Select_IntOrder_Opti").classList.remove("class_TabRowButtonNotActive");
      document.getElementById("id_Select_IntOrder_Opti").classList.add("class_TabRowButtonActive");
      document.getElementById("id_Opti_IntOrder_Div").style.display="block";
      document.getElementById("id_OptiPage_SelectAnalysisType").selectedIndex = 4;
      this.part_Analysis.stylePart();
        break;
        case 2:
        document.getElementById("id_Select_LegOrder_Opti").classList.remove("class_TabRowButtonNotActive");
        document.getElementById("id_Select_LegOrder_Opti").classList.add("class_TabRowButtonActive");
        document.getElementById("id_Opti_LegOrder_Div").style.display="block";
        document.getElementById("id_OptiPage_SelectAnalysisType").selectedIndex = 3;
        this.part_Analysis.stylePart();
          break;
          case 3:
          document.getElementById("id_Select_DisPower_Opti").classList.remove("class_TabRowButtonNotActive");
          document.getElementById("id_Select_DisPower_Opti").classList.add("class_TabRowButtonActive");
          document.getElementById("id_Opti_DisPower_Div").style.display="block";
          document.getElementById("id_OptiPage_SelectAnalysisType").selectedIndex = 3;
          this.part_Analysis.stylePart();
            break;
            case 4:
            document.getElementById("id_Select_Smoothness_Opti").classList.remove("class_TabRowButtonNotActive");
            document.getElementById("id_Select_Smoothness_Opti").classList.add("class_TabRowButtonActive");
            document.getElementById("id_Opti_Smooth_Div").style.display="block";
            document.getElementById("id_OptiPage_SelectAnalysisType").selectedIndex = 3;
            this.part_Analysis.stylePart();
              break;
    default:
      return;
  }

  this.updateOptiPageStyle();
}

  updateOptiPageStyle(){

  /*if(this.editCMS.getInterpolationSpace()==="lch" || this.editCMS.getInterpolationSpace()==="hsv"){
    document.getElementById("id_OptiPage_OptimizationWarning").style.display="flex";
    document.getElementById("id_OptiPage_OptimizationSettings").style.display="none";
    return;
  }
  else {
    document.getElementById("id_OptiPage_OptimizationWarning").style.display="none";
    document.getElementById("id_OptiPage_OptimizationSettings").style.display="block";
    //document.getElementById("id_Optimization_Degree").value=0;
    //updateOptiCMSDegree();
  }*/

  ///////////////////////////////////////////////////////////////
  //// 1. Uniformity
  //////////////////////////////////////////////////////////////
    if(document.getElementById("id_Opti_Uniformity_Div").style.display!="none"){
      ///////////////////////////////////////////////////////////////
      //// 1.1 Local Uniformity
      //////////////////////////////////////////////////////////////
      if(document.getElementById("id_OptiPage_LocalSpeedOptimization").checked){
        document.getElementById("id_OptiPage_UniOpti_Local_Options").style.display="block";
      }
      else{
        document.getElementById("id_OptiPage_UniOpti_Local_Options").style.display="none";
      }

      ///////////////////////////////////////////////////////////////
      //// 1.2 Global Uniformity
      //////////////////////////////////////////////////////////////
      if(document.getElementById("id_OptiPage_GlobalSpeedOptimization").checked){

        document.getElementById("id_OptiPage_UniOpti_FixedDiv").style.display="none";
        document.getElementById("id_OptiPage_UniOpti_GraphSettings").style.display="none";

        document.getElementById("id_OptiPage_UniOpti_Global_Options").style.display="block";

        if(document.getElementById("id_OptiPage_GlobalLinearReg").checked)
          document.getElementById("id_OptiPage_UniOpti_FixedDiv").style.display="block";
        else
          document.getElementById("id_OptiPage_UniOpti_GraphSettings").style.display="block";

          document.getElementById("id_OptiPage_SelectAnalysisType").selectedIndex = 3;
          this.part_Analysis.stylePart();
      }
      else{
        document.getElementById("id_OptiPage_UniOpti_Global_Options").style.display="none";

        document.getElementById("id_OptiPage_SelectAnalysisType").selectedIndex = 2;
        this.part_Analysis.stylePart();
      }

    }

  ///////////////////////////////////////////////////////////////
  //// 2. Intrinsic Order
  //////////////////////////////////////////////////////////////
  if(document.getElementById("id_Opti_IntOrder_Div").style.display!="none"){
    ///////////////////////////////////////////////////////////////
    //// 2.1 Local Intrinsic Order
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_OptiPage_LocalIntOrderOptimization").checked){
      document.getElementById("id_OptiPage_IntOrderOpti_Local_Options").style.display="block";
    }
    else{
      document.getElementById("id_OptiPage_IntOrderOpti_Local_Options").style.display="none";
    }

    ///////////////////////////////////////////////////////////////
    //// 2.2 Global Intrinsic Order
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_OptiPage_GlobalIntOrderOptimization").checked){
      document.getElementById("id_OptiPage_IntOrderOpti_Global_Options").style.display="block";
    }
    else{
      document.getElementById("id_OptiPage_IntOrderOpti_Global_Options").style.display="none";
    }
  }

  ///////////////////////////////////////////////////////////////
  //// 3. Legendbased Order
  //////////////////////////////////////////////////////////////
  if(document.getElementById("id_Opti_LegOrder_Div").style.display!="none"){

    if(document.getElementById("id_OptiPage_LegOrderUseDistance").checked){
      document.getElementById("id_OptiPage_LegOrderOpti_Local_Label").innerHTML = "Distance";
      document.getElementById("id_OptiPage_LegOrderOpti_Global_Label").innerHTML = "Distance";
    }
    else{
      document.getElementById("id_OptiPage_LegOrderOpti_Local_Label").innerHTML = "Speed";
      document.getElementById("id_OptiPage_LegOrderOpti_Global_Label").innerHTML = "Speed";
    }

    this.updateLegendOptiWarningArea();

    ///////////////////////////////////////////////////////////////
    //// 3.1 Local Legendbased Order
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_OptiPage_LocalLegOrderOptimization").checked){
      document.getElementById("id_OptiPage_LegOrderOpti_Local_Options").style.display="block";
    }
    else{
      document.getElementById("id_OptiPage_LegOrderOpti_Local_Options").style.display="none";
    }

    ///////////////////////////////////////////////////////////////
    //// 3.2 Global Legendbased Order
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_OptiPage_GlobalLegOrderOptimization").checked){
      document.getElementById("id_OptiPage_LegOrderOpti_Global_Options").style.display="block";
    }
    else{
      document.getElementById("id_OptiPage_LegOrderOpti_Global_Options").style.display="none";
    }
  }

  ///////////////////////////////////////////////////////////////
  //// 4. Discriminative Power
  //////////////////////////////////////////////////////////////
  if(document.getElementById("id_Opti_DisPower_Div").style.display!="none"){


    if(document.getElementById("id_OptiPage_DisPowerUseDistance").checked){
      document.getElementById("id_OptiPage_DisPowerOpti_Local_Label").innerHTML = "Distance";
      document.getElementById("id_OptiPage_DisPowerOpti_Global_Label").innerHTML = "Distance";
    }
    else{
      document.getElementById("id_OptiPage_DisPowerOpti_Local_Label").innerHTML = "Speed";
      document.getElementById("id_OptiPage_DisPowerOpti_Global_Label").innerHTML = "Speed";
    }


    ///////////////////////////////////////////////////////////////
    //// 4.1 Local Discriminative Power
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_OptiPage_LocalDisPowerOptimization").checked){
      document.getElementById("id_OptiPage_DisPowerOpti_Local_Options").style.display="block";
    }
    else{
      document.getElementById("id_OptiPage_DisPowerOpti_Local_Options").style.display="none";
    }

    ///////////////////////////////////////////////////////////////
    //// 4.2 Global Discriminative Power
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_OptiPage_GlobalDisPowerOptimization").checked){
      document.getElementById("id_OptiPage_DisPowerOpti_Global_Options").style.display="block";
    }
    else{
      document.getElementById("id_OptiPage_DisPowerOpti_Global_Options").style.display="none";
    }
  }

  ///////////////////////////////////////////////////////////////
  //// 5. Discriminative Smoothness
  //////////////////////////////////////////////////////////////
  if(document.getElementById("id_Opti_Smooth_Div").style.display!="none"){
    ///////////////////////////////////////////////////////////////
    //// 4.1 Local Discriminative Smoothness
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_OptiPage_Local_SmoothOptimization").checked){
      document.getElementById("id_OptiPage_SmoothOpti_Local_Options").style.display="block";
    }
    else{
      document.getElementById("id_OptiPage_SmoothOpti_Local_Options").style.display="none";
    }

    ///////////////////////////////////////////////////////////////
    //// 4.2 Global Discriminative Smoothness
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_OptiPage_Global_SmoothOptimization").checked){
      document.getElementById("id_OptiPage_SmoothOpti_Global_Options").style.display="block";
    }
    else{
      document.getElementById("id_OptiPage_SmoothOpti_Global_Options").style.display="none";
    }
  }

  this.calcOptiCMS();

}

  updateLegendOptiWarningArea(){

    if(this.editCMS.getKeyLength()<2)
      return;

    this.createLegendBasedGraph(); // create Graph here because we need the information for the warning area


    var distance = Math.abs(this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0));
    var blackWhiteDistance = undefined;
    var smallestNoticeableDelta = undefined;
    switch (this.editCMS.getInterpolationSpace()) {
      case "rgb":
        var rgbBlack = ["rgb",0, 0, 0];
        var rgbWhite = ["rgb",1, 1, 1];
        blackWhiteDistance = calc3DEuclideanDistance(rgbBlack,rgbWhite);
        smallestNoticeableDelta = 0.05;
        break;
      case "hsv":
        blackWhiteDistance = 1.0;
        smallestNoticeableDelta = 4;
        break;
      case "lab":
      case "de94":
      case "de94-ds":
      case "de2000":
      case "de2000-ds":
        blackWhiteDistance = 100.0;
        smallestNoticeableDelta = 4;
        break;
      case "din99":
        blackWhiteDistance = 100.0;
        smallestNoticeableDelta = 4;
        break;
      case "lch":
        blackWhiteDistance = 100.0;
        smallestNoticeableDelta = 4;
        break;
      default:
    }
    var blackWhiteSpeed = blackWhiteDistance/ distance;

    var maxSlinderValue = undefined;

    if(document.getElementById("id_OptiPage_LegOrderUseDistance").checked){
      document.getElementById("id_OptiPage_LegOrderOpti_Local_SpeedDisplay").innerHTML =  blackWhiteDistance*document.getElementById("id_OptiPage_LegOrderOpti_Local_Speed").value;
      document.getElementById("id_OptiPage_LegOrderOpti_Global_SpeedDisplay").innerHTML =  blackWhiteDistance*document.getElementById("id_OptiPage_LegOrderOpti_Global_Speed").value;
      var smallestNoticeableArea = smallestNoticeableDelta/blackWhiteDistance;
      ///////////////////////////////////////////////////////
      ///// Not Noticeable Area
      document.getElementById("id_OptiPage_LegOrderOpti_Local_NotNoticeableArea").style.width=smallestNoticeableArea*100+"%";
      document.getElementById("id_OptiPage_LegOrderOpti_Global_NotNoticeableArea").style.width=smallestNoticeableArea*100+"%";

      ///////////////////////////////////////////////////////
      ///// Get infos from the CMS
      var smallesDistanceInOriginal_Global  = this.optiGraph.getMinWeight(true);
      var smallesDistanceInOriginal_Local  = this.optiGraph.getMinWeight(false);


      ///////////////////////////////////////////////////////
      ///// No Change Area
      var remainingNoChange=0;
      if(smallesDistanceInOriginal_Local != Infinity && smallesDistanceInOriginal_Local>smallestNoticeable){
        var smallestDistancePos = smallesDistanceInOriginal_Local/blackWhiteDistance;
        remainingNoChange = smallestDistancePos-smallestNoticeableArea;
        document.getElementById("id_OptiPage_LegOrderOpti_Local_NoChangeArea").style.width=remainingNoChange*100+"%";
        //document.getElementById("id_OptiPage_LegOrderOpti_Info").style.visibility="visible";
      }
      else {
        ///////////////////////////////////////////////////////
        ///// Fitable Area
        remainingNoChange=0;
        document.getElementById("id_OptiPage_LegOrderOpti_Local_NoChangeArea").style.width=0+"%";
        document.getElementById("id_OptiPage_LegOrderOpti_Info").style.visibility="hidden";
      }

      var remainingFitable = 1.0-smallestNoticeableArea-remainingNoChange;
      document.getElementById("id_OptiPage_LegOrderOpti_Local_OkayArea").style.width=remainingFitable*100+"%";

      remainingNoChange=0;
      if(smallesDistanceInOriginal_Global != Infinity && smallesDistanceInOriginal_Global>smallestNoticeable){
        var smallestDistancePos = smallesDistanceInOriginal_Global/blackWhiteDistance;
        remainingNoChange = smallestDistancePos-smallestNoticeableArea;
        document.getElementById("id_OptiPage_LegOrderOpti_Global_NoChangeArea").style.width=remainingNoChange*100+"%";
        //document.getElementById("id_OptiPage_LegOrderOpti_Info").style.visibility="visible";
      }
      else {
        ///////////////////////////////////////////////////////
        ///// Fitable Area
        remainingNoChange=0;
        document.getElementById("id_OptiPage_LegOrderOpti_Global_NoChangeArea").style.width=0+"%";
        document.getElementById("id_OptiPage_LegOrderOpti_Info").style.visibility="hidden";
      }

      var remainingFitable = 1.0-smallestNoticeableArea-remainingNoChange;
      document.getElementById("id_OptiPage_LegOrderOpti_Global_OkayArea").style.width=remainingFitable*100+"%";







    }
    else{
      document.getElementById("id_OptiPage_LegOrderOpti_Local_SpeedDisplay").innerHTML =  blackWhiteSpeed*document.getElementById("id_OptiPage_LegOrderOpti_Local_Speed").value;
      document.getElementById("id_OptiPage_LegOrderOpti_Global_SpeedDisplay").innerHTML =  blackWhiteSpeed*document.getElementById("id_OptiPage_LegOrderOpti_Global_Speed").value;
      var smallestNoticeable = smallestNoticeableDelta/distance; // smallesRefDis; smallest distance was an old idea.
      var smallestNoticeableArea = smallestNoticeable/blackWhiteSpeed;
      ///////////////////////////////////////////////////////
      ///// Not Noticeable Area
      //legOrderNoticeableBorder = smallestNoticeableArea;
      document.getElementById("id_OptiPage_LegOrderOpti_Local_NotNoticeableArea").style.width=smallestNoticeableArea*100+"%";
      document.getElementById("id_OptiPage_LegOrderOpti_Global_NotNoticeableArea").style.width=smallestNoticeableArea*100+"%";

      ///////////////////////////////////////////////////////
      ///// Get infos from the CMS
      var smallesSpeedInOriginal_Global  = this.optiGraph.getMinWeight(true);
      var smallesSpeedInOriginal_Local  = this.optiGraph.getMinWeight(false);

      ///////////////////////////////////////////////////////
      ///// No Change Area
      var remainingNoChange=0;
      if(smallesSpeedInOriginal_Local != Infinity && smallesSpeedInOriginal_Local>smallestNoticeable){
        var smallestSpeedPos = smallesSpeedInOriginal_Local/blackWhiteSpeed;
        remainingNoChange = smallestSpeedPos-smallestNoticeableArea;
        document.getElementById("id_OptiPage_LegOrderOpti_Local_NoChangeArea").style.width=remainingNoChange*100+"%";
        //document.getElementById("id_OptiPage_LegOrderOpti_Info").style.visibility="visible";
      }
      else {
        ///////////////////////////////////////////////////////
        ///// Fitable Area
        remainingNoChange=0;
        document.getElementById("id_OptiPage_LegOrderOpti_Local_NoChangeArea").style.width=0+"%";
        document.getElementById("id_OptiPage_LegOrderOpti_Info").style.visibility="hidden";
      }

      var remainingFitable = 1.0-smallestNoticeableArea-remainingNoChange;
      document.getElementById("id_OptiPage_LegOrderOpti_Local_OkayArea").style.width=remainingFitable*100+"%";

      remainingNoChange=0;
      if(smallesSpeedInOriginal_Global != Infinity && smallesSpeedInOriginal_Global>smallestNoticeable){
        var smallestSpeedPos = smallesSpeedInOriginal_Global/blackWhiteSpeed;
        remainingNoChange = smallestSpeedPos-smallestNoticeableArea;
        document.getElementById("id_OptiPage_LegOrderOpti_Global_NoChangeArea").style.width=remainingNoChange*100+"%";
        //document.getElementById("id_OptiPage_LegOrderOpti_Info").style.visibility="visible";
      }
      else {
        ///////////////////////////////////////////////////////
        ///// Fitable Area
        remainingNoChange=0;
        document.getElementById("id_OptiPage_LegOrderOpti_Global_NoChangeArea").style.width=0+"%";
        document.getElementById("id_OptiPage_LegOrderOpti_Info").style.visibility="hidden";
      }

      var remainingFitable = 1.0-smallestNoticeableArea-remainingNoChange;
      document.getElementById("id_OptiPage_LegOrderOpti_Global_OkayArea").style.width=remainingFitable*100+"%";
    }

  }

  calcOptiCMS(){


    this.editCMS.setCMSFromPackage(this.editCMS_Foundation.createCMSInfoPackage());
    this.somethingOptimized=false;
    /////////////////////////////////////////////////////////////////////////////////////
    /// because of many of the optimization algorith has negative effects to the other

    var optiLocalType = [];
    var optiLocalDegree = [];

    var optiGlobalType = [];
    var optiGlobalDegree = [];

        if(document.getElementById("id_OptiPage_LocalIntOrderOptimization").checked){
          var degree = document.getElementById("id_OptiPage_IntOrderOpti_Local_Degree").value;
          var inserted = false;
          if(degree!=0){
            for (var i = 0; i < optiLocalDegree.length; i++) {
              if(degree<optiLocalDegree[i]){
                optiLocalType.splice(i, 0,0);
                optiLocalDegree.splice(i, 0,degree);
                inserted=true;
                break;
              }
            }

            if(!inserted){
              optiLocalType.push(0);
              optiLocalDegree.push(degree);
            }
          }
        }

        if(document.getElementById("id_OptiPage_GlobalIntOrderOptimization").checked){
          var degree = document.getElementById("id_OptiPage_IntOrderOpti_Global_Degree").value;
          var inserted = false;
          if(degree!=0){
            for (var i = 0; i < optiGlobalDegree.length; i++) {
              if(degree<optiGlobalDegree[i]){
                optiGlobalType.splice(i, 0,0);
                optiGlobalDegree.splice(i, 0,degree);
                inserted=true;
                break;
              }
            }

            if(!inserted){
              optiGlobalType.push(0);
              optiGlobalDegree.push(degree);
            }
          }
        }

        /////////////////////////////////////////////////////////////////////////////

      if(document.getElementById("id_OptiPage_LocalLegOrderOptimization").checked){
        var degree = document.getElementById("id_OptiPage_LegOrderOpti_Local_Degree").value;
        var inserted = false;
        if(degree!=0){
          for (var i = 0; i < optiLocalDegree.length; i++) {
            if(degree<optiLocalDegree[i]){
              optiLocalType.splice(i, 0,1);
              optiLocalDegree.splice(i, 0,degree);
              inserted=true;
              break;
            }
          }

          if(!inserted){
            optiLocalType.push(1);
            optiLocalDegree.push(degree);
          }
        }
      }

      if(document.getElementById("id_OptiPage_GlobalLegOrderOptimization").checked){
        var degree = document.getElementById("id_OptiPage_LegOrderOpti_Global_Degree").value;
        var inserted = false;
        if(degree!=0){
          for (var i = 0; i < optiGlobalDegree.length; i++) {
            if(degree<optiGlobalDegree[i]){
              optiGlobalType.splice(i, 0,1);
              optiGlobalDegree.splice(i, 0,degree);
              inserted=true;
              break;
            }
          }

          if(!inserted){
            optiGlobalType.push(1);
            optiGlobalDegree.push(degree);
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////
      this.createDisPowerGraph();

      if(document.getElementById("id_OptiPage_LocalDisPowerOptimization").checked){

        document.getElementById("id_OptiPage_DisPowerOpti_Local_SpeedDisplay").innerHTML =  this.optiGraph.determineMaxSetting(false)*document.getElementById("id_OptiPage_LegOrderOpti_Local_Speed").value;
        var degree = document.getElementById("id_OptiPage_DisPowerOpti_Local_Degree").value;
        var inserted = false;
        if(degree!=0){
          for (var i = 0; i < optiLocalDegree.length; i++) {
            if(degree<optiLocalDegree[i]){
              optiLocalType.splice(i, 0,2);
              optiLocalDegree.splice(i, 0,degree);
              inserted=true;
              break;
            }
          }

          if(!inserted){
            optiLocalType.push(2);
            optiLocalDegree.push(degree);
          }
        }
      }

      if(document.getElementById("id_OptiPage_GlobalDisPowerOptimization").checked){

        document.getElementById("id_OptiPage_DisPowerOpti_Global_SpeedDisplay").innerHTML =  this.optiGraph.determineMaxSetting(true)*document.getElementById("id_OptiPage_LegOrderOpti_Global_Speed").value;
        var degree = document.getElementById("id_OptiPage_DisPowerOpti_Global_Degree").value;
        var inserted = false;

        if(degree!=0){
          for (var i = 0; i < optiGlobalDegree.length; i++) {
            if(degree<optiGlobalDegree[i]){
              optiGlobalType.splice(i, 0,2);
              optiGlobalDegree.splice(i, 0,degree);
              inserted=true;
              break;
            }
          }

          if(!inserted){
            optiGlobalType.push(2);
            optiGlobalDegree.push(degree);
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////

      if(document.getElementById("id_OptiPage_LocalSpeedOptimization").checked){
        var degree = document.getElementById("id_OptiPage_UniOpti_Local_Degree").value;
        var inserted = false;
        if(degree!=0){
          for (var i = 0; i < optiLocalDegree.length; i++) {
            if(degree<optiLocalDegree[i]){
              optiLocalType.splice(i, 0,3);
              optiLocalDegree.splice(i, 0,degree);
              inserted=true;
              break;
            }
          }

          if(!inserted){
            optiLocalType.push(3);
            optiLocalDegree.push(degree);
          }
        }
      }

      if(document.getElementById("id_OptiPage_GlobalSpeedOptimization").checked){

        var degree = document.getElementById("id_OptiPage_UniOpti_Global_Degree").value;
        var inserted = false;

        if(degree!=0){
          for (var i = 0; i < optiGlobalDegree.length; i++) {
            if(degree<optiGlobalDegree[i]){
              optiGlobalType.splice(i, 0,3);
              optiGlobalDegree.splice(i, 0,degree);
              inserted=true;
              break;
            }
          }

          if(!inserted){
            optiGlobalType.push(3);
            optiGlobalDegree.push(degree);
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////
      document.getElementById("id_OptiPage_LocalSmooth_Degree_Display").innerHTML = 0;
      if(document.getElementById("id_OptiPage_Local_SmoothOptimization").checked){
        var degree = document.getElementById("id_OptiPage_SmoothOpti_Local_Degree").value;
        var inserted = false;
        if(degree!=0){
          for (var i = 0; i < optiLocalDegree.length; i++) {
            if(degree<optiLocalDegree[i]){
              optiLocalType.splice(i, 0,4);
              optiLocalDegree.splice(i, 0,degree);
              inserted=true;
              break;
            }
          }

          if(!inserted){
            optiLocalType.push(4);
            optiLocalDegree.push(degree);
          }
        }
      }

      if(document.getElementById("id_OptiPage_Global_SmoothOptimization").checked){

        var degree = document.getElementById("id_OptiPage_SmoothOpti_Global_Degree").value;
        var inserted = false;

        if(degree!=0){
          for (var i = 0; i < optiGlobalDegree.length; i++) {
            if(degree<optiGlobalDegree[i]){
              optiGlobalType.splice(i, 0,4);
              optiGlobalDegree.splice(i, 0,degree);
              inserted=true;
              break;
            }
          }

          if(!inserted){
            optiGlobalType.push(4);
            optiGlobalDegree.push(degree);
          }
        }
      }

      /////////////////////////////////////////////////////////////////////////////


    var text = "";
    var space = "";
    if(optiGlobalType.length!=0){

      for (var i = 0; i < optiGlobalType.length; i++) {
        text+=(i+1)+". ";
        switch (optiGlobalType[i]) {
            case 3:
              text+="Perceptual Uniformity";
              space=this.editCMS.getInterpolationSpace();
                if(document.getElementById("id_OptiPage_GlobalLinearReg").checked){
                  // perceptual uniformity global linear reg,
                  this.calcGlobalUniformityLinearRegOptimum();
                  this.updateOptimizationCMS(optiGlobalDegree[i]);
                }
                else{
                  // perceptual uniformity global graph,
                  this.calcGlobalUniformityForcedGraphOptimum(optiGlobalDegree[i]);
                }

              break;
                  case 0: //  Intrinsic Order global
                    text+="Intrinsic Order";
                    this.calcGlobalIntOrderOptimum();
                    this.updateOptimizationCMS(optiGlobalDegree[i]);
                    break;
                      case 1: //  Legendbased Order
                        text+="Legendbased Order";
                        this.calcLegOrderOptimum(true,optiGlobalDegree[i]);
                        break;
                      case 2: //  Discriminative Power
                        text+="Discriminative Power";
                        this.calcDisPowerOptimum(true,optiGlobalDegree[i]);
                        break;

                        case 4: //  Smoothness
                          /*text+="Smoothness";
                          this.calcGlobalSmoothOptimum();
                          this.updateOptimizationCMS(optiGlobalDegree[i]);*/
                          break;

        }
        text+="  (Degree: "+optiGlobalDegree[i]+","+space+");\n";
      }

    }

    document.getElementById("id_OptiPage_OptimizationExOrderGlobal").innerHTML=text;

    text = "";
    space = "";
    if(optiLocalType.length!=0){

      for (var i = 0; i < optiLocalType.length; i++) {
        text+=(i+1)+".";
        switch (optiLocalType[i]) {
          case 3: // perceptual uniformity local
            text+="Perceptual Uniformity";
            space=this.editCMS.getInterpolationSpace();
            this.calcLocalUniformityOptimum();
            this.updateOptimizationCMS(optiLocalDegree[i]);
            break;
                case 0: //  Intrinsic Order local
                  text+="Intrinsic Order";
                  this.calcLocalIntOrderOptimum();
                  this.updateOptimizationCMS(optiLocalDegree[i]);
                  break;
                    case 1: //  Legendbased Order
                      text+="Legendbased Order";
                      this.calcLegOrderOptimum(false,optiLocalDegree[i]);
                      break;
                      case 2: //  Discriminative Power
                        text+="Discriminative Power";
                        this.calcDisPowerOptimum(false,optiLocalDegree[i]);
                        break;
                        case 4: //  Smoothness
                          text+="Smoothness";
                          this.calcLocalSmoothOptimum();
                          this.updateOptimizationCMS(optiLocalDegree[i]);
                          break;

        }
        text+="  (Degree: "+optiLocalDegree[i]+","+space+");\n";
      }
    }

    document.getElementById("id_OptiPage_OptimizationExOrderLocal").innerHTML=text;

    this.updateSection();

  }

  optiGraphToCMS(){
    if(this.optiGraph==undefined)
      return;

    this.somethingOptimized=true;

    for ( var i = 0; i < this.optiGraph.getNodeLength(); i ++ ) {
      // positions
      var tmpKeyInfo = this.optiGraph.getCMSInfo(i);

      if(tmpKeyInfo==undefined)
        continue;

      switch (tmpKeyInfo[1]) {
        case 0:
          this.editCMS.setLeftKeyColor(tmpKeyInfo[0],this.optiGraph.getNodeColor(i));
        break;
        case 1:
          this.editCMS.setRightKeyColor(tmpKeyInfo[0],this.optiGraph.getNodeColor(i));
        break;
        case 2:
          this.editCMS.setLeftKeyColor(tmpKeyInfo[0],this.optiGraph.getNodeColor(i));
          this.editCMS.setRightKeyColor(tmpKeyInfo[0],this.optiGraph.getNodeColor(i));
        break;
      }
    }

    this.optiGraph.deleteReferences();
    this.optiGraph=undefined;
  }

  updateOptimizationCMS(optiDegree){

      this.editCMS_Optimized.setCMSFromPackage(this.editCMS.createCMSInfoPackage());

      for (var i = document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex; i <= document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex; i++) {

        if(i!=document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex || i !=document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex){
          var originalPos = this.editCMS_Foundation.getRefPosition(i);
          var optiPos = this.editCMS_Optimized.getRefPosition(i);

          var dis = optiPos-originalPos;

          var newPosition = originalPos+(dis*optiDegree);

          this.editCMS.setRefPosition(i,newPosition);
        }

        /////////////////////////////////////////////////////////////////
        ///// Left Color
        var original_LeftColor = this.editCMS_Foundation.getLeftKeyColor(i,this.editCMS_Foundation.getInterpolationSpace());
        var opti_LeftColor = this.editCMS_Optimized.getLeftKeyColor(i,this.editCMS_Foundation.getInterpolationSpace());
        if(original_LeftColor!=undefined && opti_LeftColor!=undefined){
          gWorkColor1.updateColor(original_LeftColor[0],original_LeftColor[1],original_LeftColor[2],original_LeftColor[3]);
          if(!gWorkColor1.equalTo(opti_LeftColor)){
            var val1_dis = opti_LeftColor[1]-original_LeftColor[1];
            var val2_dis = opti_LeftColor[2]-original_LeftColor[2];
            var val3_dis = opti_LeftColor[3]-original_LeftColor[3];

            var newVal1 = original_LeftColor[1]+(val1_dis*optiDegree);
            var newVal2 = original_LeftColor[2]+(val2_dis*optiDegree);
            var newVal3 = original_LeftColor[3]+(val3_dis*optiDegree);

            this.editCMS.setLeftKeyColor(i,[this.editCMS_Foundation.getInterpolationSpace(),newVal1,newVal2,newVal3]);
          }
        }

        /////////////////////////////////////////////////////////////////
        ///// Right Color
        var original_RightColor = this.editCMS_Foundation.getRightKeyColor(i,this.editCMS_Foundation.getInterpolationSpace());
        var opti_RightColor = this.editCMS_Optimized.getRightKeyColor(i,this.editCMS_Foundation.getInterpolationSpace());

        if(original_RightColor!=undefined && opti_RightColor!=undefined){
          gWorkColor1.updateColor(original_RightColor[0],original_RightColor[1],original_RightColor[2],original_RightColor[3]);
          if(!gWorkColor1.equalTo(opti_RightColor)){
            var val1_dis = opti_RightColor[1]-original_RightColor[1];
            var val2_dis = opti_RightColor[2]-original_RightColor[2];
            var val3_dis = opti_RightColor[3]-original_RightColor[3];

            var newVal1 = original_RightColor[1]+(val1_dis*optiDegree);
            var newVal2 = original_RightColor[2]+(val2_dis*optiDegree);
            var newVal3 = original_RightColor[3]+(val3_dis*optiDegree);

            this.editCMS.setRightKeyColor(i,[this.editCMS_Foundation.getInterpolationSpace(),newVal1,newVal2,newVal3]);
          }

        }

      } // FOR
      this.somethingOptimized=true;

    //// Update Edit Page => Plots for Analysis, Visualization and Edit

  }

  /////////////////////////////////////////////////////////////////////////////
  ////////////////          Local Uniformity           ////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  calcLocalUniformityOptimum (){

    var r1 = this.editCMS.getRefPosition(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex);
    var r2 = this.editCMS.getRefPosition(document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex);
    var relevantDistance = Math.abs(r2-r1);

    var bandsDeltaArray = [];
    var contBandsDistances = [];
    var bandsDeltaSum = 0;



    for (var i = document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex; i < document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex; i++) {

      if(this.editCMS.getKeyType(i)==="nil key" || this.editCMS.getKeyType(i)==="left key"){
        bandsDeltaArray.push(undefined);
        var constBandDis = Math.abs(this.editCMS.getRefPosition(i+1)-this.editCMS.getRefPosition(i));
        relevantDistance -= constBandDis;
        contBandsDistances.push(constBandDis);
      }
      else {
            var c1 = this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace());
            var c2 = this.editCMS.getLeftKeyColor(i+1,this.editCMS.getInterpolationSpace());

            var tmpDeltaSum = 0;

            if(/*((this.editCMS.getInterpolationType()==="linear" &&
               this.editCMS.getInterpolationSpace()!="rgb" &&  // distance of intervals is the same like the distance of start and end color
               this.editCMS.getInterpolationSpace()!="hsv" &&
               this.editCMS.getInterpolationSpace()!="lab" &&
               this.editCMS.getInterpolationSpace()!="din99") || this.editCMS.getInterpolationType()==="spline") &&*/
               this.editCMS.getSupportColorsLength(i)>0){

              switch (this.editCMS.getInterpolationSpace()) {
                case "rgb":
                case "hsv":
                case "lab":
                case "din99":
                  tmpDeltaSum += calc3DEuclideanDistance(c1,this.editCMS.getSupportColor(i,0,this.editCMS.getInterpolationSpace()));
                  for (var j = 0; j < this.editCMS.getSupportColorsLength(i)-1; j++) {
                    tmpDeltaSum += calc3DEuclideanDistance(this.editCMS.getSupportColor(i,j,this.editCMS.getInterpolationSpace()),this.editCMS.getSupportColor(i,j+1,this.editCMS.getInterpolationSpace()));
                  }
                  tmpDeltaSum += calc3DEuclideanDistance(this.editCMS.getSupportColor(i,this.editCMS.getSupportColorsLength(i)-1,this.editCMS.getInterpolationSpace()),c2);
                  break;
                case "de94":
                case "de94-ds":
                  tmpDeltaSum += calcDeltaDE94(c1,this.editCMS.getSupportColor(i,0,this.editCMS.getInterpolationSpace()));
                  for (var j = 0; j < this.editCMS.getSupportColorsLength(i)-1; j++) {
                    tmpDeltaSum += calcDeltaDE94(this.editCMS.getSupportColor(i,j,this.editCMS.getInterpolationSpace()),this.editCMS.getSupportColor(i,j+1,this.editCMS.getInterpolationSpace()));
                  }
                  tmpDeltaSum += calcDeltaDE94(this.editCMS.getSupportColor(i,this.editCMS.getSupportColorsLength(i)-1,this.editCMS.getInterpolationSpace()),c2);
                break;
                case "de2000":
                case "de2000-ds":
                  tmpDeltaSum += calcDeltaCIEDE2000(c1,this.editCMS.getSupportColor(i,0,this.editCMS.getInterpolationSpace()));
                  for (var j = 0; j < this.editCMS.getSupportColorsLength(i)-1; j++) {
                    tmpDeltaSum += calcDeltaCIEDE2000(this.editCMS.getSupportColor(i,j,this.editCMS.getInterpolationSpace()),this.editCMS.getSupportColor(i,j+1,this.editCMS.getInterpolationSpace()));
                  }
                  tmpDeltaSum += calcDeltaCIEDE2000(this.editCMS.getSupportColor(i,this.editCMS.getSupportColorsLength(i)-1,this.editCMS.getInterpolationSpace()),c2);
                break;
                default:
                  return;
              }
            }
            else {
              switch (this.editCMS.getInterpolationSpace()) {
                case "rgb":
                case "hsv":
                case "lab":
                case "din99":
                  tmpDeltaSum = calc3DEuclideanDistance(c1,c2);
                break;
                case "de94":
                case "de94-ds":
                  tmpDeltaSum = calcDeltaDE94(c1,c2);
                break;
                case "de2000":
                case "de2000-ds":
                  tmpDeltaSum = calcDeltaCIEDE2000(c1,c2);
                break;
                default:
                  return;
              }
            }
            bandsDeltaSum+=tmpDeltaSum;
            bandsDeltaArray.push(tmpDeltaSum);
            contBandsDistances.push(undefined);
      }
    }

    /////////////////////////////////////////////////////////////////////

    var perfectSpeend = bandsDeltaSum/relevantDistance;
    var currentPos = r1;

    for (var i = 0; i < bandsDeltaArray.length; i++) {
      if(bandsDeltaArray[i]==undefined){
        currentPos+=contBandsDistances[i];
      }
      else {
        currentPos+=(bandsDeltaArray[i]/perfectSpeend);
      }
      var testDis= this.editCMS.getRefPosition(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex+i+1)-this.editCMS.getRefPosition(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex+i);
      this.editCMS.setRefPosition(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex+i+1,currentPos);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////          Global Uniformity  (linear Regression)         ////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////

  calcGlobalUniformityLinearRegOptimum(){

   var fixedStartKey = document.getElementById('id_OptiPage_UniOpti_FixedStart').checked;
   var fixedEndKey = document.getElementById('id_OptiPage_UniOpti_FixedEnd').checked;
   var continuousSections = this.editCMS.searchForContinuousSections(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex,document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex);

   //console.log(i);
   for (var i = 0; i < continuousSections.length; i++) {
     this.linearRegression(continuousSections[i][0],continuousSections[i][1],fixedStartKey,fixedEndKey);
   }

   /// Local Optimization
   if(this.editCMS.getInterpolationSpace()!="lab" && this.editCMS.getInterpolationSpace()!="din99")
     this.calcLocalUniformityOptimum();

 }

  linearRegression(startKey,endKey,fixedStartKey,fixedEndKey){

   var newLineColors = [];

   if(fixedStartKey && fixedEndKey){
     var lineStartColor = this.editCMS.getRightKeyColor(startKey,this.editCMS.getInterpolationSpace());
     var endStartColor =this.editCMS.getLeftKeyColor(endKey,this.editCMS.getInterpolationSpace());
     newLineColors.push(lineStartColor);
     var ref1 = this.editCMS.getRefPosition(startKey);
     var ref2 = this.editCMS.getRefPosition(endKey);
     var dis = ref2-ref1;
     for (var j = startKey+1; j < endKey; j++) {
       var ratio = (this.editCMS.getRefPosition(j)-ref1)/dis;
       var newColor = calcGradientLinear(lineStartColor[1],lineStartColor[2],lineStartColor[3],endStartColor[1],endStartColor[2],endStartColor[3],ratio);
       newLineColors.push([this.editCMS.getInterpolationSpace(),newColor[0],newColor[1],newColor[2]]);
     }
     newLineColors.push(endStartColor);
   } else if (fixedStartKey || fixedEndKey) {

     ////////////////////////////////////////////////
     // normal linear linearRegression
     // standart formula: 0 = (X^T X)^-1 X^T y
     ////////////////////////////////////////////////
     var transponse = [];
     var value_XT_X = 0;
     var vector_y_val1 = [];
     var vector_y_val2 = [];
     var vector_y_val3 = [];
     var fixedColor = undefined;

     var tmpStart = startKey;
     var tmpEnd = endKey;
     if(fixedStartKey){
       fixedColor = this.editCMS.getRightKeyColor(startKey,this.editCMS.getInterpolationSpace());
       //tmpStart++;
     }
     else{
       fixedColor = this.editCMS.getLeftKeyColor(endKey,this.editCMS.getInterpolationSpace());
       //tmpEnd--;
     }


     for (var i = tmpStart; i <= tmpEnd; i++) {

       /// the multipication of a transponse vector with the vector (X^T X) -
       transponse.push(this.editCMS.getRefPosition(i))
       value_XT_X+=Math.pow(this.editCMS.getRefPosition(i),2);

       var tmpColor = undefined;
       if(i!=endKey)
         tmpColor = this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace());
       else
         tmpColor = this.editCMS.getLeftKeyColor(endKey,this.editCMS.getInterpolationSpace());

         // Use insteed of three vectors a matrix
         //var y_row = [tmpColor[1],tmpColor[2],tmpColor[3]];
         //vector_y.push(y_row);
         vector_y_val1.push(tmpColor[1]-fixedColor[1]);
         vector_y_val2.push(tmpColor[2]-fixedColor[2]);
         vector_y_val3.push(tmpColor[3]-fixedColor[3]);

     }

     // Inverse of (X^T X)
     var value_XT_X_inverse = 1/value_XT_X;

     // transponse of x multiply with inverse
     var rIT = [];
     for (var i = 0; i < transponse.length; i++) {
       rIT.push(transponse[i]*value_XT_X_inverse);
     }

     // multiplicaton with y
     var closestLine_Parameter1 = 0;
     var closestLine_Parameter2 = 0;
     var closestLine_Parameter3 = 0;
     for (var i = 0; i < rIT.length; i++) {
       closestLine_Parameter1 += rIT[i]*vector_y_val1[i];
       closestLine_Parameter2 += rIT[i]*vector_y_val2[i];
       closestLine_Parameter3 += rIT[i]*vector_y_val3[i];
     }

     // get new positions
     for (var i = startKey; i <= endKey; i++) {
       var newVal1 = fixedColor[1]+(closestLine_Parameter1*this.editCMS.getRefPosition(i));
       var newVal2 = fixedColor[2]+(closestLine_Parameter2*this.editCMS.getRefPosition(i));
       var newVal3 = fixedColor[3]+(closestLine_Parameter3*this.editCMS.getRefPosition(i));
       newLineColors.push([this.editCMS.getInterpolationSpace(),newVal1,newVal2,newVal3]);
     }


   } else {

     ////////////////////////////////////////////////
     // normal linear linearRegression
     // standart formula: 0 = (X^T X)^-1 X^T y
     ////////////////////////////////////////////////////////////
     var designMatrix_X = [];
     // Use insteed of three vectors a matrix
     //var vector_y = [];
     var vector_y_val1 = [];
     var vector_y_val2 = [];
     var vector_y_val3 = [];


     for (var i = startKey; i <= endKey; i++) {

       designMatrix_X.push([1,this.editCMS.getRefPosition(i)]);

       var tmpColor = undefined;
       if(i!=endKey)
         tmpColor = this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace());
       else
         tmpColor = this.editCMS.getLeftKeyColor(endKey,this.editCMS.getInterpolationSpace());

         // Use insteed of three vectors a matrix
         //var y_row = [tmpColor[1],tmpColor[2],tmpColor[3]];
         //vector_y.push(y_row);

         vector_y_val1.push(tmpColor[1]);
         vector_y_val2.push(tmpColor[2]);
         vector_y_val3.push(tmpColor[3]);


     }


     ///////////////////////////////////////////////////////////////

     var designMatrix_X_Transponse = [[],[]];

     for (var i = 0; i < designMatrix_X.length; i++) {
       for (var j = 0; j < 2; j++) {
         designMatrix_X_Transponse[j].push(designMatrix_X[i][j]);
       }
     }

     /////////////////////////////////////////////////////////////
     var designMatrix_X_x_XT = matrixMultiplication(designMatrix_X_Transponse,designMatrix_X);
     var designMatrix_X_x_XT_Inverse = matrix_invert(designMatrix_X_x_XT);
     var designMatrix_Inverse_x_Transponse = matrixMultiplication(designMatrix_X_x_XT_Inverse,designMatrix_X_Transponse);

     // Use insteed of three vectors a matrix
     //var closestLine_Parameter = matrixMultiplication(designMatrix_Inverse_x_Transponse,vector_y);

     var closestLine_Parameter1 = matrixVectorMultiplication(designMatrix_Inverse_x_Transponse,vector_y_val1);
     var closestLine_Parameter2 = matrixVectorMultiplication(designMatrix_Inverse_x_Transponse,vector_y_val2);
     var closestLine_Parameter3 = matrixVectorMultiplication(designMatrix_Inverse_x_Transponse,vector_y_val3);

     for (var i = startKey; i <= endKey; i++) {
       var newVal1 = closestLine_Parameter1[0]+(closestLine_Parameter1[1]*this.editCMS.getRefPosition(i));
       var newVal2 = closestLine_Parameter2[0]+(closestLine_Parameter2[1]*this.editCMS.getRefPosition(i));
       var newVal3 = closestLine_Parameter3[0]+(closestLine_Parameter3[1]*this.editCMS.getRefPosition(i));
       newLineColors.push([this.editCMS.getInterpolationSpace(),newVal1,newVal2,newVal3]);
     }

   }

   /////////////////////////////////////////////////////////////////////////////////////
   for (var i = newLineColors.length-1; i >= 0; i--) {
     switch (this.editCMS.getKeyType(startKey+i)){
       case "nil key":
           // should never happen
       break;
       case "right key":
         this.editCMS.setRightKeyColor(startKey,newLineColors[i]);
       break;

       case "dual key":
         this.editCMS.setLeftKeyColor(startKey+i,newLineColors[i]);
         this.editCMS.setRightKeyColor(startKey+i,newLineColors[i]);
       break;
       case "twin key":
         if(i==0)
           this.editCMS.setRightKeyColor(startKey+i,newLineColors[i]);
         else
           this.editCMS.setLeftKeyColor(startKey+i,newLineColors[i]);
       break;
       case "left key":
         // should be alwas the endKey
         this.editCMS.setLeftKeyColor(startKey+i,newLineColors[i]);
       break;
     }
   }
 }

 //////////////////////////////////////////////////////////////////////////////////////////////////
 ////////////////          Global Uniformity  (Forced Graph)              ////////////////////////
 /////////////////////////////////////////////////////////////////////////////////////////////////
 calcGlobalUniformityForcedGraphOptimum(degree){

   // create graph

   this.optiGraph = new class_Graph_ForcedGlobalSpeed(this.editCMS.getInterpolationSpace());
   this.optiGraph.changeColorEdgeOptions(this.editCMS.getInterpolationSpace(),true,"eu");

   var continuousSections = this.editCMS.searchForContinuousSections(0,this.editCMS.getKeyLength()-1);

   for (var j = 0; j < continuousSections.length; j++) {
       if(continuousSections[j][0]<continuousSections[j][1]){
         for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++){
           this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i));
           if(i == continuousSections[j][0] && (this.editCMS.getKeyType(i)==="right key"||this.editCMS.getKeyType(i)==="twin key"))
             this.optiGraph.pushCMSInfo([i,1]); // save key index information and if the node represent the right, left or both colors of the key
           else
             this.optiGraph.pushCMSInfo([i,2]);
         }// for
         this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(continuousSections[j][1],this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(continuousSections[j][1]));
         if(this.editCMS.getKeyType(continuousSections[j][1])==="left key"|| this.editCMS.getKeyType(continuousSections[j][1])==="twin key")
           this.optiGraph.pushCMSInfo([continuousSections[j][1],0]);
         else
           this.optiGraph.pushCMSInfo([continuousSections[j][1],2]);
       }
   }

   //////////////////////////////////////////////////////////////////////////////
   this.optiGraph.forceLayout(document.getElementById("id_OptiPage_UniOpti_Iterations").value,degree);
   //////////////////////////////////////////////////////////////////////////////
   this.optiGraphToCMS();

 }

//////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////                  Intrinsic Order (Local,Global)                  ////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

calcLocalIntOrderOptimum (){
  var continuousSections = this.editCMS.searchForContinuousSections(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex,document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex);

  for (var j = 0; j < continuousSections.length; j++) {

    if(continuousSections[j][0]+1<continuousSections[j][1]){
      for (var i = continuousSections[j][0]+1; i < continuousSections[j][1]; i++) {
        this.calcOrderOptimumForKey(i-1,i,i+1);
      }// for
    } // if
  }
}

calcGlobalIntOrderOptimum (){
  var continuousSections = this.editCMS.searchForContinuousSections(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex,document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex);

  for (var j = 0; j < continuousSections.length; j++) {

    if(continuousSections[j][0]+1==continuousSections[j][1])
      continue;

    if(continuousSections[j][0]+2==continuousSections[j][1]){
      this.calcOrderOptimumForKey(continuousSections[j][0],continuousSections[j][0]+1,continuousSections[j][1]);
    }
    else {
      for (var k0 = continuousSections[j][0]; k0 < continuousSections[j][1]-1; k0++) {
      for (var k2=k0+2; k2<=continuousSections[j][1]; k2++) {
      for (var k1=k0+1; k1<k2; k1++) {
        this.calcOrderOptimumForKey(k0,k1,k2);
      }// for k1
      }// for k2
      }// for k0
    } // if
  }
}

calcOrderOptimumForKey(k0,k1,k2){

  var result = this.calc3ColorOrderOptimum(this.editCMS.getRightKeyColor(k0,this.editCMS.getInterpolationSpace()),
                                      this.editCMS.getRightKeyColor(k1,this.editCMS.getInterpolationSpace()),
                                      this.editCMS.getLeftKeyColor(k2,this.editCMS.getInterpolationSpace()));

  switch (result[0]) {
    //case 0: break; //do nothing
    case 1:
      this.editCMS.setRightKeyColor(k1,result[1]);
      this.editCMS.setLeftKeyColor(k1,result[1]);
    break;
  }
}

calc3ColorOrderOptimum(color_K0,color_K1,color_K2){


  // orderVals = [deltaE_K0_K2,deltaE_K1_K2,deltaE_K0_K1,orderVal1,orderVal2]
  var orderVals = getOrderValues(color_K0,color_K1,color_K2, this.editCMS.getInterpolationSpace());
  //console.log(orderVals);
  if(orderVals[3]<0 && orderVals[4]<0){
    // create a line between k1 and a ref color, which is defined by the ratio of the distances k0->k1 and  k1->k2
    var intersectionPoints1 = this.getLineSphereIntersection(color_K1, color_K0, color_K0, orderVals[0]);
    var intersectionPoints2 = this.getLineSphereIntersection(color_K1, color_K2, color_K2, orderVals[0]);

    if(intersectionPoints1.length!=2 || intersectionPoints1.length!=2){
      return[0]; // this should never happen! There should be always two intersection points
    }

    var positiveOrderIntersection1 = false;
    var positiveOrderIntersection2 = false;

    var tmpOrder1 = getOrderValues(color_K0,intersectionPoints1[0],color_K2, this.editCMS.getInterpolationSpace());
    var tmpOrder2 = getOrderValues(color_K0,intersectionPoints1[1],color_K2, this.editCMS.getInterpolationSpace());
    var tmpOrder3 = getOrderValues(color_K0,intersectionPoints2[0],color_K2, this.editCMS.getInterpolationSpace());
    var tmpOrder4 = getOrderValues(color_K0,intersectionPoints2[1],color_K2, this.editCMS.getInterpolationSpace());

    var counter = 0;
    var isOrder1 = false;
    var isOrder2 = false;
    var isOrder3 = false;
    var isOrder4 = false;

    if(tmpOrder1[3]>=0 && tmpOrder1[4]>=0){
      counter++;
      isOrder1=true;
    }

    if(tmpOrder2[3]>=0 && tmpOrder2[4]>=0){
      counter++;
      isOrder2=true;
    }

    if(tmpOrder3[3]>=0 && tmpOrder3[4]>=0){
      counter++;
      isOrder3=true;
    }

    if(tmpOrder4[3]>=0 && tmpOrder4[4]>=0){
      counter++;
      isOrder4=true;
    }

    switch (counter) {
      case 1:
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //////////////////////// CASE 2: k1 is outsides the circles around k0 and k2, and the lines between k1 and k0/k2 have one intersection point with the ordered area  //////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      var intersectionPoints = [];
      //console.log("Case 2");

      if(isOrder1){
        return [1,intersectionPoints1[0]];
      } else
      if(isOrder2){
        return [1,intersectionPoints1[1]];
      } else
      if(isOrder3){
        return [1,intersectionPoints2[0]];
      } else
      if(isOrder4){
        return [1,intersectionPoints2[1]];
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      break;
      case 2:

      if(isOrder1&&isOrder2){
        return[0]; // this should never happen
      }

      if(isOrder3&&isOrder4){
        return[0]; // this should never happen
      }

      var dis_K1_K0 = calc3DEuclideanDistance(color_K1, color_K0);
      var dis_K1_K2 = calc3DEuclideanDistance(color_K1, color_K2);
      var dis_1_K1_Int = undefined;
      var dis_2_K1_Int = undefined;

      if(isOrder1)
          dis_1_K1_Int = calc3DEuclideanDistance(color_K1, intersectionPoints1[0]);
      else
          dis_1_K1_Int = calc3DEuclideanDistance(color_K1, intersectionPoints1[1]);

      if(isOrder3)
          dis_2_K1_Int = calc3DEuclideanDistance(color_K1, intersectionPoints2[0]);
      else
          dis_2_K1_Int = calc3DEuclideanDistance(color_K1, intersectionPoints2[1]);

      var isShorter1 = false;
      var isShorter2 = false;

      if(dis_1_K1_Int<dis_K1_K0)
        isShorter1 = true;

      if(dis_2_K1_Int<dis_K1_K2)
        isShorter2 = true;


      if (isShorter1 || isShorter2 && !(isShorter1 && isShorter2)) {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////// CASE 3: k1 is outsides the circles around k0 and k2, and the lines between k1 and k0/k2 have two intersection point with the ordered area.
        /////////////////////// one before k0/k2 and one is located behind k0/k2
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //console.log("case 3");

        if(isShorter1){
          if(isOrder1){
            return [1,intersectionPoints1[0]];
          }
          else {
            return [1,intersectionPoints1[1]];
          }
        }
        else {
          if(isOrder3){
            return [1,intersectionPoints2[0]];
          }
          else {
            return [1,intersectionPoints2[1]];
          }
        }

        // check special case
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      }

      break;
      default:

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////// CASE 4: k1 is outsides the circles around k0 and k2, and the lines between k1 and k0/k2 have two intersection point with the ordered area.
        /////////////////////// Both are located before k0/k2 at the line.
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //console.log("Case 4");

        var direction = [color_K2[1]-color_K0[1],
                        color_K2[2]-color_K0[2],
                        color_K2[3]-color_K0[3]]

        var middle = [color_K0[1]+(0.5*direction[0]),
                      color_K0[2]+(0.5*direction[1]),
                      color_K0[3]+(0.5*direction[2])];

        var norm = vecNorm(direction);

        ///////////////////////////////////////////////
        // PLANE
        // norm form of plane  n*(x-A)=0
        // nx-n*Ax+ny-n*Ay+nz-n*Az = 0
        // nx+ny+nz = n*Ax+n*Ay+n*Az

        var nA = norm[0]*middle[0]+norm[1]*middle[1]+norm[2]*middle[2];

        //////////////////////////////////
        // LINE
        // line with k1 as support vector and norm as direction
        // g(x)=k1+n*r
        //////////////////////////////////
        // Intersection
        // n[0]*(k1[0]+n[0]*r)+n[1]*(k1[1]+n[1]*r)+n[2]*(k1[2]+n[2]*r)= nA
        //  n[0]*n[0]*r+n[1]*n[1]*r+n[2]*n[2]*r = nA - n[0]*k1[0] - n[1]*k1[1] - n[2]*k1[2]
        // r = (nA - n[0]*k1[0] - n[1]*k1[1] - n[2]*k1[2])/(n[0]*n[0]+n[1]*n[1]+n[2]*n[2])
        var divider = Math.pow(norm[0],2)+Math.pow(norm[1],2)+Math.pow(norm[2],2);
        if(divider==0){
          return[0];
        }
        var tmp = (norm[0]*color_K1[1])+(norm[1]*color_K1[2])+(norm[2]*color_K1[3]);
        var r = (nA-tmp)/divider;

        var intersection = [
          color_K1[1]+norm[0]*r,
          color_K1[2]+norm[1]*r,
          color_K1[3]+norm[2]*r
        ];

        //////////////////////////////////
        /// new Postion using height of uniside triangle
        /// height of uniside triangle : h = a/2 * Math.sqrt(3);
        var height = calc3DEuclideanDistance(color_K0, color_K2)/2 * Math.sqrt(3);

        var direction_MI = [intersection[0]-middle[0],
                            intersection[1]-middle[1],
                            intersection[2]-middle[2]];

        var ratio = height/vecLength(direction_MI);

        var newPos = [middle[0]+(direction_MI[0]*ratio),
                      middle[1]+(direction_MI[1]*ratio),
                      middle[2]+(direction_MI[2]*ratio)];



        return [1,[this.editCMS.getInterpolationSpace(),newPos[0],newPos[1],newPos[2]]];

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
  }
  else if(orderVals[3]<0 || orderVals[4]<0){
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////// CASE 1: k1 is inside the circles around k0 and k2, but not in the intersection area of both circles //////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //console.log("Case 1");
    var intersectionPoints =[];
    if(orderVals[3]<0){
        // create line between i and i-1
        intersectionPoints = this.getLineSphereIntersection(color_K1, color_K0, color_K0, orderVals[0]);
    }
    else{ //orderVals[4]<0
        // create line between i and i+1
        intersectionPoints = this.getLineSphereIntersection(color_K1, color_K2, color_K2, orderVals[0]);
    }



    switch (intersectionPoints.length) {
      case 1:
        return [1,intersectionPoints[0]];
      break;
      case 2:
        // the nearest intersection point is the right one
        var dis1 = calc3DEuclideanDistance(intersectionPoints[0], color_K1);
        var dis2 = calc3DEuclideanDistance(intersectionPoints[1], color_K1);
        if(dis1<dis2){
          return [1,intersectionPoints[0]];
        }
        else {
          return [1,intersectionPoints[1]];
        }
      break;
      default:
        console.log("Error at Sphere Intersection Algorithm"); // because there should be always 2 intersection points if the line goes to the sphere center
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }else {
    return [0];
  }

}

getLineSphereIntersection(colorL1, colorL2, colorCenter, radius){

    //http://www.ambrsoft.com/TrigoCalc/Sphere/SpherLineIntersection_.htm#SphereLineIntersectionEqDev

    var v_a = Math.pow(colorL2[1]-colorL1[1],2)+Math.pow(colorL2[2]-colorL1[2],2)+Math.pow(colorL2[3]-colorL1[3],2);
    var v_b = -2*((colorL2[1]-colorL1[1])*(colorCenter[1]-colorL1[1])+(colorL2[2]-colorL1[2])*(colorCenter[2]-colorL1[2])+(colorL2[3]-colorL1[3])*(colorCenter[3]-colorL1[3]));
    var v_c = Math.pow(colorCenter[1]-colorL1[1],2)+Math.pow(colorCenter[2]-colorL1[2],2)+Math.pow(colorCenter[3]-colorL1[3],2)-Math.pow(radius,2);

    // check the discriminante
    var v_D = Math.pow(v_b,2)-4*v_a*v_c;
    //console.log(v_D);
    if(v_D>0){
      var val_t_pos = (-1* v_b + Math.sqrt(v_D))/(2 * v_a);
      var val_t_neg = (-1* v_b - Math.sqrt(v_D))/(2 * v_a);
      var intColor1 = this.determineIntersectionPoint(colorL1, colorL2, val_t_pos);
      var intColor2 = this.determineIntersectionPoint(colorL1, colorL2, val_t_neg);
      return [intColor1,intColor2];
    }
    else if(v_D==0){
      var val_t = (-1* v_b)/(2 * v_a);
      var intColor1 = this.determineIntersectionPoint(colorL1, colorL2, val_t);
      return [intColor1];
    }
    else {
      return [];
    }

}

determineIntersectionPoint(colorL1, colorL2, val_t){
  var c_v1 = colorL1[1] + ((colorL2[1]-colorL1[1])*val_t);
  var c_v2 = colorL1[2] + ((colorL2[2]-colorL1[2])*val_t);
  var c_v3 = colorL1[3] + ((colorL2[3]-colorL1[3])*val_t);
  return [this.editCMS.getInterpolationSpace(),c_v1,c_v2,c_v3];
}

/////////////////////////////////////////////////////////////////////////////////////////
////////////////            Legendbased Optimum                 ////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
createLegendBasedGraph(){

  if(this.optiGraph!=undefined){
    this.optiGraph=undefined;
  }

  switch (true) {
    case document.getElementById("id_OptiPage_DisPowerUseSpeed").checked:
      this.optiGraph = new class_Graph_ForcedLegOrder_Speed(optiSpace,document.getElementById("id_OptiPage_GlobalLegOrderOptimization").checked);
    break;
    case document.getElementById("id_OptiPage_DisPowerUseDistance").checked:
      this.optiGraph = new class_Graph_ForcedLegOrder_Distance(optiSpace,document.getElementById("id_OptiPage_GlobalLegOrderOptimization").checked);
    break;
    default:
      return;
  }

  var optiSpace = this.editCMS.getInterpolationSpace();
  if(optiSpace==="de94-ds"||optiSpace==="de2000-ds")
  optiSpace="lab";

  this.optiGraph.changeColorEdgeOptions(optiSpace,false,"eu");

  var continuousSections = this.editCMS.searchForContinuousSections(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex,document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex);

  ///////
   // save not editAble color
   var firstID = continuousSections[0][0];
   var lastID= continuousSections[continuousSections.length-1][1];
   for (var i = 0; i < firstID; i++) {
     switch (this.editCMS.getKeyType(i)) {
       case "dual key":
         this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,2);
         break;
         case "left key":
           this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,0);
           break;
           case "right key":
            this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,1);
             break;
             case "twin key":
              this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,0);
              this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,1);
            break;
     }
   }

   if(this.editCMS.getKeyType(firstID)=="twin key"){
     this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,0);
   }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  for (var j = 0; j < continuousSections.length; j++) {
    for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++){
      if(i == continuousSections[j][0] && (this.editCMS.getKeyType(i)==="right key" || this.editCMS.getKeyType(i)==="twin key"))
        this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), false,i,1); // save key index information and if the node represent the right, left or both colors of the key
      else
        this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), false,i,2);

        this.optiGraph.pushEdge(this.optiGraph.getNodeLength()-1,this.optiGraph.getNodeLength());
    }// for

    if(this.editCMS.getKeyType(continuousSections[j][1])==="left key"|| this.editCMS.getKeyType(i)==="twin key")
      this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(continuousSections[j][1],optiSpace),this.editCMS.getRefPosition(continuousSections[j][1]),false,continuousSections[j][1],0);
    else
      this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(continuousSections[j][1],optiSpace),this.editCMS.getRefPosition(continuousSections[j][1]),false,continuousSections[j][1],2);

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  if(this.editCMS.getKeyType(lastID)==="twin key"){
    this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,lastID,1);
  }


  for (var i = lastID+1; i < this.editCMS.getKeyLength; i++) {
    switch (this.editCMS.getKeyType(i)) {
      case "dual key":
        this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,2);
        break;
        case "left key":
          this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,0);
          break;
          case "right key":
           this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,1);
            break;
            case "twin key":
             this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,0);
             this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,1);
           break;
    }
  }
}

calcLegOrderOptimum(isGlobal,degree){

  this.createLegendBasedGraph();



  var optiValue = undefined;
  switch (true) {
    case document.getElementById("id_OptiPage_DisPowerUseSpeed").checked:
      var distance = Math.abs(this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0));
      var blackWhiteSpeed = undefined;
      switch (this.editCMS.getInterpolationSpace()) {
        case "rgb":
          var rgbBlack =["rgb",0, 0, 0];
          var rgbWhite = ["rgb",1, 1, 1];
          blackWhiteSpeed = calc3DEuclideanDistance(rgbBlack,rgbWhite)/ distance; //
          break;
        case "hsv":
          blackWhiteSpeed = 100.0 / distance;
          break;
        case "lab":
        case "de94":
        case "de94-ds":
        case "de2000":
        case "de2000-ds":
          blackWhiteSpeed = 100.0 / distance;
          break;
        case "din99":
          blackWhiteSpeed = 100.0 / distance;
          break;
        case "lch":
          blackWhiteSpeed = 100.0 / distance;
          break;
      }
      optiValue=blackWhiteSpeed;
    break;
    case document.getElementById("id_OptiPage_DisPowerUseDistance").checked:
      var blackWhiteDistance = undefined;
      switch (this.editCMS.getInterpolationSpace()) {
        case "rgb":
          var rgbBlack = ["rgb",0, 0, 0];
          var rgbWhite = ["rgb",1, 1, 1];
          blackWhiteDistance = calc3DEuclideanDistance(rgbBlack,rgbWhite); //
        break;
        case "hsv":
          blackWhiteDistance=1.0;
        break;
        case "lab":
        case "de94":
        case "de94-ds":
        case "de2000":
        case "de2000-ds":
          blackWhiteDistance=100;
        break;
        case "din99":
          blackWhiteDistance=100;
        break;
        case "lch":
          blackWhiteDistance=100;
        break;
      }
      optiValue=blackWhiteDistance;
    break;
    default:
      return;
  }

  if(isGlobal){
    optiValue = optiValue*document.getElementById("id_OptiPage_LegOrderOpti_Global_Speed").value;
    this.optiGraph.forceLayout(document.getElementById("id_OptiPage_LegOrderOpti_Global_Iterations").value,degree,optiValue,isGlobal);
  }
  else {
    optiValue = optiValue*document.getElementById("id_OptiPage_LegOrderOpti_Local_Speed").value;
    this.optiGraph.forceLayout(document.getElementById("id_OptiPage_LegOrderOpti_Local_Iterations").value,degree,optiValue,isGlobal);
  }

  this.optiGraphToCMS();
}

////////////////////////////////////////////////////////////////////////////////
////////////////          Discriminative Power          ////////////////////////
////////////////////////////////////////////////////////////////////////////////
createDisPowerGraph(){

    if(this.optiGraph!=undefined){
      this.optiGraph=undefined;
    }

    var optiSpace = this.editCMS.getInterpolationSpace();
    if(optiSpace==="de94-ds"||optiSpace==="de2000-ds")
    optiSpace="lab";



    switch (true) {
      case document.getElementById("id_OptiPage_DisPowerUseSpeed").checked:
        this.optiGraph = new class_Graph_ForcedDisPower_Speed(optiSpace);
      break;
      case document.getElementById("id_OptiPage_DisPowerUseDistance").checked:
        this.optiGraph = new class_Graph_ForcedDisPower_Distance(optiSpace);
      break;
      default:
        return;
    }

    this.optiGraph.changeColorEdgeOptions(optiSpace,true,"eu");

    //var continuousSections = this.editCMS.searchForContinuousSections(0,this.editCMS.getKeyLength()-1);
    var continuousSections = this.editCMS.searchForContinuousSections(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex,document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex);

    ///////
     // save not editAble color
     var firstID = continuousSections[0][0];
     var lastID= continuousSections[continuousSections.length-1][1];
     for (var i = 0; i < firstID; i++) {
       switch (this.editCMS.getKeyType(i)) {
         case "dual key":
           this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,2);
           break;
           case "left key":
             this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,0);
             break;
             case "right key":
              this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,1);
               break;
               case "twin key":
                this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,0);
                this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,1);
              break;
       }
     }

     if(this.editCMS.getKeyType(firstID)=="twin key"){
       this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,0);
     }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    for (var j = 0; j < continuousSections.length; j++) {
      for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++){


        if(i == continuousSections[j][0] && (this.editCMS.getKeyType(i)==="right key"||this.editCMS.getKeyType(i)==="twin key"))
          this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), false,i,1); // save key index information and if the node represent the right, left or both colors of the key
        else
          this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), false,i,2);

          this.optiGraph.pushEdge(this.optiGraph.getNodeLength()-1,this.optiGraph.getNodeLength());
      }// for

      if(this.editCMS.getKeyType(continuousSections[j][1])==="left key"|| this.editCMS.getKeyType(i)==="twin key")
        this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(continuousSections[j][1],optiSpace),this.editCMS.getRefPosition(continuousSections[j][1]),false,continuousSections[j][1],0);
      else
        this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(continuousSections[j][1],optiSpace),this.editCMS.getRefPosition(continuousSections[j][1]),false,continuousSections[j][1],2);

    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if(this.editCMS.getKeyType(lastID)=="twin key"){
      this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,lastID,1);
    }


    for (var i = lastID+1; i < this.editCMS.getKeyLength; i++) {
      switch (this.editCMS.getKeyType(i)) {
        case "dual key":
          this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,2);
          break;
          case "left key":
            this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,0);
            break;
            case "right key":
             this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,1);
              break;
              case "twin key":
               this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,0);
               this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,optiSpace),this.editCMS.getRefPosition(i), true,i,1);
             break;
      }
    }
  }

calcDisPowerOptimum(isGlobal,degree){
    // create graph
    this.createDisPowerGraph();
    //////////////////////////////////////////////////////////////////////////////

    if(isGlobal)
      this.optiGraph.forceLayout(document.getElementById("id_OptiPage_DisPowerOpti_Global_Iterations").value,document.getElementById("id_OptiPage_DisPowerOpti_Global_Speed").value,degree,isGlobal);
    else
      this.optiGraph.forceLayout(document.getElementById("id_OptiPage_DisPowerOpti_Local_Iterations").value,document.getElementById("id_OptiPage_DisPowerOpti_Local_Speed").value,degree,isGlobal);

    this.optiGraphToCMS();

  }

/////////////////////////////////////////////////////////////////////////////
////////////////            Smothness               ////////////////////////
////////////////////////////////////////////////////////////////////////////

calcLocalSmoothOptimum(){
    var continuousSections = this.editCMS.searchForContinuousSections(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex,document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex);

    var continuousSections_Colors = [];
    var continuousSections_Update = [];
    var idealAngle = parseInt(180*parseFloat(document.getElementById("id_OptiPage_SmoothOpti_Local_Degree").value));
    document.getElementById("id_OptiPage_LocalSmooth_Degree_Display").innerHTML = idealAngle;

    for (var j = 0; j < continuousSections.length; j++) {
      var tmpArray = [];
      var tmpArray2 = [];
      tmpArray.push(this.editCMS.getRightKeyColor(continuousSections[j][0],this.editCMS.getInterpolationSpace()));
      for (var i = continuousSections[j][0]+1; i <= continuousSections[j][1]; i++) {
        tmpArray.push(this.editCMS.getLeftKeyColor(i,this.editCMS.getInterpolationSpace()));
        tmpArray2.push([0,0,0]);
      }// for
      continuousSections_Update.push(tmpArray2);
      continuousSections_Colors.push(tmpArray);
    }

    var counter = 0;
    var interations = parseInt(document.getElementById("id_OptiPage_SmoothOpti_Local_Iterations").value);

    if(isNaN(interations)){
      document.getElementById("id_OptiPage_SmoothOpti_Local_Iterations").value=20;
      interations=20;
    }

    var maxLoops = interations;
    var foundBadAngle = true;

    while(foundBadAngle && counter<maxLoops){

      foundBadAngle=false;
      counter++;

      for (var j = 0; j < continuousSections_Colors.length; j++) {
        if(continuousSections_Colors[j].length>2){ // continious section has more than two keys

          for (var i = 1; i < continuousSections_Colors[j].length-1; i++) {

            var vec1 = [
              continuousSections_Colors[j][i-1][1]-continuousSections_Colors[j][i][1],
              continuousSections_Colors[j][i-1][2]-continuousSections_Colors[j][i][2],
              continuousSections_Colors[j][i-1][3]-continuousSections_Colors[j][i][3]
            ];
            var vec2 = [
              continuousSections_Colors[j][i+1][1]-continuousSections_Colors[j][i][1],
              continuousSections_Colors[j][i+1][2]-continuousSections_Colors[j][i][2],
              continuousSections_Colors[j][i+1][3]-continuousSections_Colors[j][i][3]
            ];

            var angle = rad2deg (Math.acos(vec_Dot(vec1,vec2) / (vecLength(vec1) * vecLength(vec2))));

            if(angle<idealAngle){
              foundBadAngle=true;

              ///// get Middle between C_0 and C_2
              var vec3 = [
                continuousSections_Colors[j][i+1][1]-continuousSections_Colors[j][i-1][1],
                continuousSections_Colors[j][i+1][2]-continuousSections_Colors[j][i-1][2],
                continuousSections_Colors[j][i+1][3]-continuousSections_Colors[j][i-1][3]
              ];

              var middle = [continuousSections_Colors[j][i-1][1]+0.5*vec3[0],
                continuousSections_Colors[j][i-1][2]+0.5*vec3[1],
                continuousSections_Colors[j][i-1][3]+0.5*vec3[2]
              ];

              var vec4 = [continuousSections_Colors[j][i][1]-middle[0],
                continuousSections_Colors[j][i][2]-middle[1],
                continuousSections_Colors[j][i][3]-middle[2]
              ];

              var foundNewPos=false;
              var currentPos=0.0;
              var currentStep = 0.1;
              var minStep = 0.001;

              while (!foundNewPos) {

                var nextpos=currentPos+currentStep;
                var nextColorPos=[middle[0]+nextpos*vec4[0],
                  middle[1]+nextpos*vec4[1],
                  middle[2]+nextpos*vec4[2]
                ];

                //// Check Angle
                var tmpVec1 = [
                  continuousSections_Colors[j][i-1][1]-nextColorPos[0],
                  continuousSections_Colors[j][i-1][2]-nextColorPos[1],
                  continuousSections_Colors[j][i-1][3]-nextColorPos[2]
                ];
                var tmpVec2 = [
                  continuousSections_Colors[j][i+1][1]-nextColorPos[0],
                  continuousSections_Colors[j][i+1][2]-nextColorPos[1],
                  continuousSections_Colors[j][i+1][3]-nextColorPos[2]
                ];
                var tmpAngle = rad2deg (Math.acos(vec_Dot(tmpVec1,tmpVec2) / (vecLength(tmpVec1) * vecLength(tmpVec2))));

                if(tmpAngle<idealAngle){
                  var newStep=currentStep*0.5;
                  if(newStep<=minStep){

                    var currentColorPos=[middle[0]+currentPos*vec4[0],
                      middle[1]+currentPos*vec4[1],
                      middle[2]+currentPos*vec4[2]
                    ];

                    // save the movement information for later and add them to the current movement information
                    continuousSections_Update[j][i][0]+=currentColorPos[0]-continuousSections_Colors[j][i][1];
                    continuousSections_Update[j][i][1]+=currentColorPos[1]-continuousSections_Colors[j][i][2];
                    continuousSections_Update[j][i][2]+=currentColorPos[2]-continuousSections_Colors[j][i][3];

                    foundNewPos=true;
                    break;
                  }
                  else{
                    currentStep=newStep;
                  }
                }
                else {
                  currentPos+=currentStep;
                }
              }

            }

          }// for
        } // if
      }// for

      if(!foundBadAngle)
        break;

      //// Update Colors
      for (var j = 0; j < continuousSections_Colors.length; j++) {
        if(continuousSections_Colors[j].length>2){ // continious section has more than two keys
          for (var i = 1; i < continuousSections_Colors[j].length-1; i++) {
            continuousSections_Colors[j][i][1]=continuousSections_Colors[j][i][1]+continuousSections_Update[j][i][0];
            continuousSections_Colors[j][i][2]=continuousSections_Colors[j][i][2]+continuousSections_Update[j][i][1];
            continuousSections_Colors[j][i][3]=continuousSections_Colors[j][i][3]+continuousSections_Update[j][i][2];

            continuousSections_Update[j][i][0]=0;
            continuousSections_Update[j][i][1]=0;
            continuousSections_Update[j][i][2]=0;
          }
        }
      }

    } // while


    // Update Edit CMS with new Colors
    for (var j = 0; j < continuousSections.length; j++) {
      this.editCMS.setRightKeyColor(continuousSections[j][0],continuousSections_Colors[j][0]);

      for (var i = continuousSections[j][0]+1; i < continuousSections[j][1]; i++) {
        this.editCMS.setRightKeyColor(i,continuousSections_Colors[j][i-continuousSections[j][0]]);
        this.editCMS.setLeftKeyColor(i,continuousSections_Colors[j][i-continuousSections[j][0]]);
      }// for
      this.editCMS.setLeftKeyColor(continuousSections[j][1],continuousSections_Colors[j][continuousSections_Colors[j].length-1]);
    }
  }


}