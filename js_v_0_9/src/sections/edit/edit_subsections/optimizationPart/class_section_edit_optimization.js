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

    this.helpIDs=["Optimization","LocalUni","GlobalUni","LocalIntOrder","GlobalIntOrder","LocalLegOrder","GlobalLegOrder","LocalDisPow","GlobalDisPow","LocalSmooth","GlobalSmooth"];
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

      this.chooseOptimizationType(0);


      this.somethingChanged=false;
      document.getElementById("id_OptiPage_editWarning").style.visibility="hidden";

      this.fillKeyCombobox(false);
    }
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
        this.somethingChanged=true;
        document.getElementById("id_OptiPage_editWarning").style.visibility="visible";
        this.fillKeyCombobox(true);
  }

  reset(){
    if(this.somethingChanged){
      this.editCMS.deleteReferences();
      this.editCMS = cloneCMS(editSection.editCMS);
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
      editSection.editCMS.deleteReferences();
      editSection.editCMS = cloneCMS(this.optimizationCMS);
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

    //updateLegendOptiWarningArea();

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
  if(document.getElementById("id_Opti_DisPower_Div").style.display!="none"){
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


calcOptiCMS(){
  console.log(123);
}



};

























function updateLegendOptiWarningArea(){


  if(this.editCMS.getKeyLength()<2)
    return;

  createLegendBasedGraph(); // create Graph here because we need the information for the warning area

  var distance = Math.abs(this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0));
  var blackWhiteSpeed = undefined;
  var smallestNoticeableDelta = undefined;
  switch (this.editCMS.getInterpolationSpace()) {
    case "rgb":
      var rgbBlack = new class_Color_RGB(0, 0, 0);
      var rgbWhite = new class_Color_RGB(1, 1, 1);
      blackWhiteSpeed = calc3DEuclideanDistance(rgbBlack,rgbWhite)/ distance; //
      smallestNoticeableDelta = 0.05;
      break;
    case "hsv":
      blackWhiteSpeed = 100.0 / distance;
      smallestNoticeableDelta = 4;
      break;
    case "lab":
    case "de94":
    case "de94-ds":
    case "de2000":
    case "de2000-ds":
      blackWhiteSpeed = 100.0 / distance;
      smallestNoticeableDelta = 4;
      break;
    case "din99":
      blackWhiteSpeed = 100.0 / distance;
      smallestNoticeableDelta = 4;
      break;
    case "lch":
      blackWhiteSpeed = 100.0 / distance;
      smallestNoticeableDelta = 4;
      break;
    default:
  }

  document.getElementById("id_OptiPage_LegOrderOpti_Local_SpeedDisplay").innerHTML =  blackWhiteSpeed*document.getElementById("id_OptiPage_LegOrderOpti_Local_Speed").value;
  document.getElementById("id_OptiPage_LegOrderOpti_Global_SpeedDisplay").innerHTML =  blackWhiteSpeed*document.getElementById("id_OptiPage_LegOrderOpti_Global_Speed").value;

  ///////////////////////////////////////////////////////
  ///// Get important infos from the CMS

  //var smallesRefDis = Infinity;
  var smallesSpeedInOriginal_Global  = optiGraph.getMinSpeed(true);
  var smallesSpeedInOriginal_Local  = optiGraph.getMinSpeed(false);

  ///////////////////////////////////////////////////////
  ///// Not Noticeable Area
  var smallestNoticeable = smallestNoticeableDelta/distance; // smallesRefDis; smallest distance was an old idea.
  var smallestNoticeableArea = smallestNoticeable/blackWhiteSpeed;

  legOrderNoticeableBorder = smallestNoticeableArea;
  document.getElementById("id_OptiPage_LegOrderOpti_Local_NotNoticeableArea").style.width=smallestNoticeableArea*100+"%";
  document.getElementById("id_OptiPage_LegOrderOpti_Global_NotNoticeableArea").style.width=smallestNoticeableArea*100+"%";

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


  ///////////////////////////////////////////////////////
  ///// Above Area
  //var remainingNotFitable = 1.0-remainingFitable;
  //document.getElementById("id_OptiPage_LegOrderOpti_NotFitableArea").style.width=(remainingNotFitable*100)+"%";

}

function updateOptimizationCMS(optiDegree){

    for (var i = document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex; i <= document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex; i++) {

      if(i!=document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex || i !=document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex){
        var originalPos = this.editCMS.getRefPosition(i);
        var optiPos = this.editCMS_Optimum.getRefPosition(i);

        var dis = optiPos-originalPos;

        var newPosition = originalPos+(dis*optiDegree);

        this.editCMS.setRefPosition(i,newPosition);
      }

      /////////////////////////////////////////////////////////////////
      ///// Left Color
      var original_LeftColor = this.editCMS.getLeftKeyColor(i,this.editCMS_Original.getInterpolationSpace());
      var opti_LeftColor = this.editCMS_Optimum.getLeftKeyColor(i,this.editCMS_Original.getInterpolationSpace());
      if(original_LeftColor!=undefined && opti_LeftColor!=undefined){
        if(!original_LeftColor.equalTo(opti_LeftColor)){
          var val1_dis = opti_LeftColor.get1Value()-original_LeftColor.get1Value();
          var val2_dis = opti_LeftColor.get2Value()-original_LeftColor.get2Value();
          var val3_dis = opti_LeftColor.get3Value()-original_LeftColor.get3Value();

          var newVal1 = original_LeftColor.get1Value()+(val1_dis*optiDegree);
          var newVal2 = original_LeftColor.get2Value()+(val2_dis*optiDegree);
          var newVal3 = original_LeftColor.get3Value()+(val3_dis*optiDegree);

          this.editCMS.setLeftKeyColor(i,createColor(newVal1,newVal2,newVal3,this.editCMS.getInterpolationSpace()));
        }

        original_LeftColor.deleteReferences();
        opti_LeftColor.deleteReferences();
        original_LeftColor=null;
        opti_LeftColor=null;
      }

      /////////////////////////////////////////////////////////////////
      ///// Right Color
      var original_RightColor = this.editCMS.getRightKeyColor(i,this.editCMS_Original.getInterpolationSpace());
      var opti_RightColor = this.editCMS_Optimum.getRightKeyColor(i,this.editCMS_Original.getInterpolationSpace());

      if(original_RightColor!=undefined && opti_RightColor!=undefined){
        if(!original_RightColor.equalTo(opti_RightColor)){
          var val1_dis = opti_RightColor.get1Value()-original_RightColor.get1Value();
          var val2_dis = opti_RightColor.get2Value()-original_RightColor.get2Value();
          var val3_dis = opti_RightColor.get3Value()-original_RightColor.get3Value();

          var newVal1 = original_RightColor.get1Value()+(val1_dis*optiDegree);
          var newVal2 = original_RightColor.get2Value()+(val2_dis*optiDegree);
          var newVal3 = original_RightColor.get3Value()+(val3_dis*optiDegree);

          this.editCMS.setRightKeyColor(i,createColor(newVal1,newVal2,newVal3,this.editCMS.getInterpolationSpace()));
        }

        original_RightColor.deleteReferences();
        opti_RightColor.deleteReferences();
        original_RightColor=null;
        opti_RightColor=null;
      }

    } // FOR

    this.editCMS_Optimum = cloneCMS(this.editCMS);
    this.editCMS_Optimum.setPreventIntervals(true);

  //// Update Edit Page => Plots for Analysis, Visualization and Edit

}

function calcOptiCMS(){

  if(this.editCMS_Optimum!=undefined)
    this.editCMS_Optimum.deleteReferences();
  this.editCMS_Optimum = cloneCMS(this.editCMS_Original);
  this.editCMS_Optimum.setPreventIntervals(true);

  this.editCMS.deleteReferences();
  this.editCMS = cloneCMS(this.editCMS_Original);

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
    createDisPowerGraph();

    if(document.getElementById("id_OptiPage_LocalDisPowerOptimization").checked){

      document.getElementById("id_OptiPage_DisPowerOpti_Local_SpeedDisplay").innerHTML =  optiGraph.determineOptimalSpeed(false)*document.getElementById("id_OptiPage_LegOrderOpti_Local_Speed").value;
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

      document.getElementById("id_OptiPage_DisPowerOpti_Global_SpeedDisplay").innerHTML =  optiGraph.determineOptimalSpeed(true)*document.getElementById("id_OptiPage_LegOrderOpti_Global_Speed").value;
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
  if(optiGlobalType.length!=0){

    for (var i = 0; i < optiGlobalType.length; i++) {
      text+=(i+1)+". ";
      switch (optiGlobalType[i]) {
          case 3:
            text+="Perceptual Uniformity";

              if(document.getElementById("id_OptiPage_GlobalLinearReg").checked){
                // perceptual uniformity global linear reg,
                calcGlobalUniformityLinearRegOptimum();
                updateOptimizationCMS(optiGlobalDegree[i]);
              }
              else{
                // perceptual uniformity global graph,
                calcGlobalUniformityForcedGraphOptimum(optiGlobalDegree[i]);
                this.editCMS= cloneCMS(this.editCMS_Optimum);
              }

            break;
                case 0: //  Intrinsic Order global
                  text+="Intrinsic Order";
                  calcGlobalIntOrderOptimum();
                  updateOptimizationCMS(optiGlobalDegree[i]);
                  break;
                    case 1: //  Legendbased Order
                      text+="Legendbased Order";
                      calcLegOrderOptimum(true,optiGlobalDegree[i]);
                      this.editCMS= cloneCMS(this.editCMS_Optimum);
                      break;
                    case 2: //  Discriminative Power
                      text+="Discriminative Power";
                      calcDisPowerOptimum(true,optiGlobalDegree[i]);
                      this.editCMS= cloneCMS(this.editCMS_Optimum);
                      break;

                      case 4: //  Smoothness
                        text+="Smoothness";
                        calcGlobalSmoothOptimum();
                        updateOptimizationCMS(optiGlobalDegree[i]);
                        break;

      }
      text+="  (Degree: "+optiGlobalDegree[i]+");\n";
    }

  }

  document.getElementById("id_OptiPage_OptimizationExOrderGlobal").innerHTML=text;

  text = "";
  if(optiLocalType.length!=0){

    for (var i = 0; i < optiLocalType.length; i++) {
      text+=(i+1)+".";
      switch (optiLocalType[i]) {
        case 3: // perceptual uniformity local
          text+="Perceptual Uniformity";
          calcLocalUniformityOptimum();
          updateOptimizationCMS(optiLocalDegree[i]);
          break;
              case 0: //  Intrinsic Order local
                text+="Intrinsic Order";
                calcLocalIntOrderOptimum();
                updateOptimizationCMS(optiLocalDegree[i]);
                break;
                  case 1: //  Legendbased Order
                    text+="Legendbased Order";
                    calcLegOrderOptimum(false,optiLocalDegree[i]);
                    this.editCMS= cloneCMS(this.editCMS_Optimum);
                    break;
                    case 2: //  Discriminative Power
                      text+="Discriminative Power";
                      calcDisPowerOptimum(false,optiLocalDegree[i]);
                      this.editCMS= cloneCMS(this.editCMS_Optimum);
                      break;
                      case 4: //  Smoothness
                        text+="Smoothness";
                        calcLocalSmoothOptimum();
                        updateOptimizationCMS(optiLocalDegree[i]);
                        break;

      }
      text+="  (Degree: "+optiLocalDegree[i]+");\n";
    }
  }

  document.getElementById("id_OptiPage_OptimizationExOrderLocal").innerHTML=text;

  updateOptiPage();

  if(pathColorspace==="rgb"){
    drawcolormap_RGBSpace(true,true);
  }

}

function optiGraphToCMS(){
  if(optiGraph==undefined)
    return;

  for ( var i = 0; i < optiGraph.getNodeLength(); i ++ ) {
    // positions
    var tmpKeyInfo = optiGraph.getCMSInfo(i);

    if(tmpKeyInfo==undefined)
      continue;

    switch (tmpKeyInfo[1]) {
      case 0:
        this.editCMS_Optimum.setLeftKeyColor(tmpKeyInfo[0],optiGraph.getNodeColor(i));
      break;
      case 1:
        this.editCMS_Optimum.setRightKeyColor(tmpKeyInfo[0],optiGraph.getNodeColor(i));
      break;
      case 2:
        this.editCMS_Optimum.setLeftKeyColor(tmpKeyInfo[0],optiGraph.getNodeColor(i));
        this.editCMS_Optimum.setRightKeyColor(tmpKeyInfo[0],optiGraph.getNodeColor(i));
      break;
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  optiGraph.deleteReferences();
  optiGraph=undefined;
}
