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
    if(editSection.editCMS.getKeyLength()<2){
      openAlert("Maeeeh");
    }
    else {
      this.somethingChanged=false;
      this.somethingOptimized=false;

      this.editCMS_Foundation.deleteReferences();
      this.editCMS_Foundation = cloneCMS(editSection.editCMS);

      this.editCMS.deleteReferences();
      this.editCMS = cloneCMS(editSection.editCMS);
      this.fillKeyCombobox(false);
      super.showSection();
      this.part_Pathplot.pp_3D_StartAnimation();
      this.part_Pathplot.changePathPlotSpace(); // for drawing the pathplot space

      this.chooseOptimizationType(0);


      document.getElementById("id_OptiPage_editWarning").style.visibility="hidden";


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
        this.editCMS_Foundation.deleteReferences();
        this.editCMS_Foundation = cloneCMS(this.editCMS);
        this.fillKeyCombobox(true);
  }

  reset(){
    if(this.somethingChanged){
      this.editCMS.deleteReferences();
      this.editCMS = cloneCMS(editSection.editCMS);
      this.editCMS_Foundation.deleteReferences();
      this.editCMS_Foundation = cloneCMS(editSection.editCMS);
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
      editSection.editCMS = cloneCMS(this.editCMS);
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
    var smallesSpeedInOriginal_Global  = this.optiGraph.getMinSpeed(true);
    var smallesSpeedInOriginal_Local  = this.optiGraph.getMinSpeed(false);

    ///////////////////////////////////////////////////////
    ///// Not Noticeable Area
    var smallestNoticeable = smallestNoticeableDelta/distance; // smallesRefDis; smallest distance was an old idea.
    var smallestNoticeableArea = smallestNoticeable/blackWhiteSpeed;

    //legOrderNoticeableBorder = smallestNoticeableArea;
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

  calcOptiCMS(){

    this.editCMS.deleteReferences();
    this.editCMS = cloneCMS(this.editCMS_Foundation);
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

        document.getElementById("id_OptiPage_DisPowerOpti_Local_SpeedDisplay").innerHTML =  this.optiGraph.determineOptimalSpeed(false)*document.getElementById("id_OptiPage_LegOrderOpti_Local_Speed").value;
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

        document.getElementById("id_OptiPage_DisPowerOpti_Global_SpeedDisplay").innerHTML =  this.optiGraph.determineOptimalSpeed(true)*document.getElementById("id_OptiPage_LegOrderOpti_Global_Speed").value;
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
                          text+="Smoothness";
                          this.calcGlobalSmoothOptimum();
                          this.updateOptimizationCMS(optiGlobalDegree[i]);
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
        text+="  (Degree: "+optiLocalDegree[i]+");\n";
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

      var editCMS_Optimized = cloneCMS(this.editCMS);

      for (var i = document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex; i <= document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex; i++) {

        if(i!=document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex || i !=document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex){
          var originalPos = this.editCMS_Foundation.getRefPosition(i);
          var optiPos = editCMS_Optimized.getRefPosition(i);

          var dis = optiPos-originalPos;

          var newPosition = originalPos+(dis*optiDegree);

          this.editCMS.setRefPosition(i,newPosition);
        }

        /////////////////////////////////////////////////////////////////
        ///// Left Color
        var original_LeftColor = this.editCMS_Foundation.getLeftKeyColor(i,this.editCMS_Foundation.getInterpolationSpace());
        var opti_LeftColor = editCMS_Optimized.getLeftKeyColor(i,this.editCMS_Foundation.getInterpolationSpace());
        if(original_LeftColor!=undefined && opti_LeftColor!=undefined){
          if(!original_LeftColor.equalTo(opti_LeftColor)){
            var val1_dis = opti_LeftColor.get1Value()-original_LeftColor.get1Value();
            var val2_dis = opti_LeftColor.get2Value()-original_LeftColor.get2Value();
            var val3_dis = opti_LeftColor.get3Value()-original_LeftColor.get3Value();

            var newVal1 = original_LeftColor.get1Value()+(val1_dis*optiDegree);
            var newVal2 = original_LeftColor.get2Value()+(val2_dis*optiDegree);
            var newVal3 = original_LeftColor.get3Value()+(val3_dis*optiDegree);

            this.editCMS.setLeftKeyColor(i,createColor(newVal1,newVal2,newVal3,this.editCMS_Foundation.getInterpolationSpace()));
          }

          original_LeftColor.deleteReferences();
          opti_LeftColor.deleteReferences();
          original_LeftColor=null;
          opti_LeftColor=null;
        }

        /////////////////////////////////////////////////////////////////
        ///// Right Color
        var original_RightColor = this.editCMS_Foundation.getRightKeyColor(i,this.editCMS_Foundation.getInterpolationSpace());
        var opti_RightColor = editCMS_Optimized.getRightKeyColor(i,this.editCMS_Foundation.getInterpolationSpace());

        if(original_RightColor!=undefined && opti_RightColor!=undefined){
          if(!original_RightColor.equalTo(opti_RightColor)){
            var val1_dis = opti_RightColor.get1Value()-original_RightColor.get1Value();
            var val2_dis = opti_RightColor.get2Value()-original_RightColor.get2Value();
            var val3_dis = opti_RightColor.get3Value()-original_RightColor.get3Value();

            var newVal1 = original_RightColor.get1Value()+(val1_dis*optiDegree);
            var newVal2 = original_RightColor.get2Value()+(val2_dis*optiDegree);
            var newVal3 = original_RightColor.get3Value()+(val3_dis*optiDegree);

            this.editCMS.setRightKeyColor(i,createColor(newVal1,newVal2,newVal3,this.editCMS_Foundation.getInterpolationSpace()));
          }

          original_RightColor.deleteReferences();
          opti_RightColor.deleteReferences();
          original_RightColor=null;
          opti_RightColor=null;
        }

      } // FOR
      this.somethingOptimized=true;
      editCMS_Optimized.deleteReferences();

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

            if(((this.editCMS.getInterpolationType()==="linear" &&
               this.editCMS.getInterpolationSpace()!="rgb" &&  // distance of intervals is the same like the distance of start and end color
               this.editCMS.getInterpolationSpace()!="hsv" &&
               this.editCMS.getInterpolationSpace()!="lab" &&
               this.editCMS.getInterpolationSpace()!="din99") || this.editCMS.getInterpolationType()==="spline") &&
               this.editCMS.getIntervalLength(i)>0){

              switch (this.editCMS.getInterpolationSpace()) {
                case "rgb":
                case "hsv":
                case "lab":
                case "din99":
                  tmpDeltaSum += calc3DEuclideanDistance(c1,this.editCMS.getIntervalColor(i,0,this.editCMS.getInterpolationSpace()));
                  for (var j = 0; j < this.editCMS.getIntervalLength(i)-1; j++) {
                    tmpDeltaSum += calc3DEuclideanDistance(this.editCMS.getIntervalColor(i,j,this.editCMS.getInterpolationSpace()),this.editCMS.getIntervalColor(i,j+1,this.editCMS.getInterpolationSpace()));
                  }
                  tmpDeltaSum += calc3DEuclideanDistance(this.editCMS.getIntervalColor(i,this.editCMS.getIntervalLength(i)-1,this.editCMS.getInterpolationSpace()),c2);
                  break;
                case "de94":
                case "de94-ds":
                  tmpDeltaSum += calcDeltaDE94(c1,this.editCMS.getIntervalColor(i,0,this.editCMS.getInterpolationSpace()));
                  for (var j = 0; j < this.editCMS.getIntervalLength(i)-1; j++) {
                    tmpDeltaSum += calcDeltaDE94(this.editCMS.getIntervalColor(i,j,this.editCMS.getInterpolationSpace()),this.editCMS.getIntervalColor(i,j+1,this.editCMS.getInterpolationSpace()));
                  }
                  tmpDeltaSum += calcDeltaDE94(this.editCMS.getIntervalColor(i,this.editCMS.getIntervalLength(i)-1,this.editCMS.getInterpolationSpace()),c2);
                break;
                case "de2000":
                case "de2000-ds":
                  tmpDeltaSum += calcDeltaCIEDE2000(c1,this.editCMS.getIntervalColor(i,0,this.editCMS.getInterpolationSpace()));
                  for (var j = 0; j < this.editCMS.getIntervalLength(i)-1; j++) {
                    tmpDeltaSum += calcDeltaCIEDE2000(this.editCMS.getIntervalColor(i,j,this.editCMS.getInterpolationSpace()),this.editCMS.getIntervalColor(i,j+1,this.editCMS.getInterpolationSpace()));
                  }
                  tmpDeltaSum += calcDeltaCIEDE2000(this.editCMS.getIntervalColor(i,this.editCMS.getIntervalLength(i)-1,this.editCMS.getInterpolationSpace()),c2);
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
       var newColor = calcGradientLinear(lineStartColor.get1Value(),lineStartColor.get2Value(),lineStartColor.get3Value(),endStartColor.get1Value(),endStartColor.get2Value(),endStartColor.get3Value(),ratio);
       newLineColors.push(createColor(newColor[0],newColor[1],newColor[2],this.editCMS.getInterpolationSpace()));
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
         //var y_row = [tmpColor.get1Value(),tmpColor.get2Value(),tmpColor.get3Value()];
         //vector_y.push(y_row);
         vector_y_val1.push(tmpColor.get1Value()-fixedColor.get1Value());
         vector_y_val2.push(tmpColor.get2Value()-fixedColor.get2Value());
         vector_y_val3.push(tmpColor.get3Value()-fixedColor.get3Value());

         tmpColor.deleteReferences();
         tmpColor=null;
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
       var newVal1 = fixedColor.get1Value()+(closestLine_Parameter1*this.editCMS.getRefPosition(i));
       var newVal2 = fixedColor.get2Value()+(closestLine_Parameter2*this.editCMS.getRefPosition(i));
       var newVal3 = fixedColor.get3Value()+(closestLine_Parameter3*this.editCMS.getRefPosition(i));
       newLineColors.push(createColor(newVal1,newVal2,newVal3,this.editCMS.getInterpolationSpace()));
     }
     fixedColor.deleteReferences();
     fixedColor=null;


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
         //var y_row = [tmpColor.get1Value(),tmpColor.get2Value(),tmpColor.get3Value()];
         //vector_y.push(y_row);

         vector_y_val1.push(tmpColor.get1Value());
         vector_y_val2.push(tmpColor.get2Value());
         vector_y_val3.push(tmpColor.get3Value());

         tmpColor.deleteReferences()
         tmpColor=null;

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
       newLineColors.push(createColor(newVal1,newVal2,newVal3,this.editCMS.getInterpolationSpace()));
     }

   }

   /////////////////////////////////////////////////////////////////////////////////////
   for (var i = newLineColors.length-1; i >= 0; i--) {
     if(!newLineColors[i].checkRGBPossiblity()){
       var tmpColor = newLineColors[i].calcRGBColor(); // will calculate the best next rgb colorXYZ
       newLineColors[i].deleteReferences();
       newLineColors[i]=tmpColor.calcLABColor();
       tmpColor.deleteReferences;
       tmpColor = null;
     }


     switch (this.editCMS.getKeyType(startKey+i)){
       case "nil key":
           // should never happen
       break;
       case "right key":
         this.editCMS.setRightKeyColor(startKey,cloneColor(newLineColors[i]));
       break;

       case "dual key":
         this.editCMS.setLeftKeyColor(startKey+i,cloneColor(newLineColors[i]));
         this.editCMS.setRightKeyColor(startKey+i,cloneColor(newLineColors[i]));
       break;
       case "twin key":
         if(i==0)
           this.editCMS.setRightKeyColor(startKey+i,cloneColor(newLineColors[i]));
         else
           this.editCMS.setLeftKeyColor(startKey+i,cloneColor(newLineColors[i]));
       break;
       case "left key":
         // should be alwas the endKey
         this.editCMS.setLeftKeyColor(startKey+i,cloneColor(newLineColors[i]));
       break;
     }
     newLineColors[i].deleteReferences();
     newLineColors[i]=null;
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
      this.editCMS.setRightKeyColor(k1,cloneColor(result[1]));
      this.editCMS.setLeftKeyColor(k1,cloneColor(result[1]));
      result[1].deleteReferences();
      result[1]=null;
    break;
  }
}

calc3ColorOrderOptimum(color_K0,color_K1,color_K2){


  // orderVals = [deltaE_K0_K2,deltaE_K1_K2,deltaE_K0_K1,orderVal1,orderVal2]
  var orderVals = getOrderValues(cloneColor(color_K0),cloneColor(color_K1),cloneColor(color_K2), this.editCMS.getInterpolationSpace());
  //console.log(orderVals);
  if(orderVals[3]<0 && orderVals[4]<0){
    // create a line between k1 and a ref color, which is defined by the ratio of the distances k0->k1 and  k1->k2
    var intersectionPoints1 = this.getLineSphereIntersection(cloneColor(color_K1), cloneColor(color_K0), cloneColor(color_K0), orderVals[0]);
    var intersectionPoints2 = this.getLineSphereIntersection(cloneColor(color_K1), cloneColor(color_K2), cloneColor(color_K2), orderVals[0]);

    if(intersectionPoints1.length!=2 || intersectionPoints1.length!=2){
      return[0]; // this should never happen! There should be always two intersection points
    }

    var positiveOrderIntersection1 = false;
    var positiveOrderIntersection2 = false;

    var tmpOrder1 = getOrderValues(cloneColor(color_K0),cloneColor(intersectionPoints1[0]),cloneColor(color_K2), this.editCMS.getInterpolationSpace());
    var tmpOrder2 = getOrderValues(cloneColor(color_K0),cloneColor(intersectionPoints1[1]),cloneColor(color_K2), this.editCMS.getInterpolationSpace());
    var tmpOrder3 = getOrderValues(cloneColor(color_K0),cloneColor(intersectionPoints2[0]),cloneColor(color_K2), this.editCMS.getInterpolationSpace());
    var tmpOrder4 = getOrderValues(cloneColor(color_K0),cloneColor(intersectionPoints2[1]),cloneColor(color_K2), this.editCMS.getInterpolationSpace());

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
        //console.log(intersectionPoints1,0,tmpOrder1);
        intersectionPoints1[1].deleteReferences();
        intersectionPoints1[1]=null;
        return [1,intersectionPoints1[0]];
      } else
      if(isOrder2){
        //console.log(intersectionPoints1,1,tmpOrder2);
        intersectionPoints1[0].deleteReferences();
        intersectionPoints1[0]=null;
        return [1,intersectionPoints1[1]];
      } else
      if(isOrder3){
        //console.log(intersectionPoints2,2,tmpOrder3);
        intersectionPoints2[1].deleteReferences();
        intersectionPoints2[1]=null;
        return [1,intersectionPoints2[0]];
      } else
      if(isOrder4){
        //console.log(intersectionPoints2,3,tmpOrder4);
        intersectionPoints2[0].deleteReferences();
        intersectionPoints2[0]=null;
        return [1,intersectionPoints2[1]];
      }
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      break;
      case 2:

      if(isOrder1&&isOrder2){
        for (var k = intersectionPoints1.length-1; k >= 0; k--) {
          intersectionPoints1[k].deleteReferences();
          intersectionPoints1[k]=null;
        }
        for (var k = intersectionPoints2.length-1; k >= 0; k--) {
          intersectionPoints2[k].deleteReferences();
          intersectionPoints2[k]=null;
        }
        return[0]; // this should never happen
      }

      if(isOrder3&&isOrder4){
        for (var k = intersectionPoints1.length-1; k >= 0; k--) {
          intersectionPoints1[k].deleteReferences();
          intersectionPoints1[k]=null;
        }
        for (var k = intersectionPoints2.length-1; k >= 0; k--) {
          intersectionPoints2[k].deleteReferences();
          intersectionPoints2[k]=null;
        }
        return[0]; // this should never happen
      }

      var dis_K1_K0 = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(color_K0));
      var dis_K1_K2 = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(color_K2));
      var dis_1_K1_Int = undefined;
      var dis_2_K1_Int = undefined;

      if(isOrder1)
          dis_1_K1_Int = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(intersectionPoints1[0]));
      else
          dis_1_K1_Int = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(intersectionPoints1[1]));

      if(isOrder3)
          dis_2_K1_Int = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(intersectionPoints2[0]));
      else
          dis_2_K1_Int = calc3DEuclideanDistance(cloneColor(color_K1), cloneColor(intersectionPoints2[1]));

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
            intersectionPoints1[1].deleteReferences();
            intersectionPoints1[1]=null;
            return [1,intersectionPoints1[0]];
          }
          else {
            intersectionPoints1[0].deleteReferences();
            intersectionPoints1[0]=null;
            return [1,intersectionPoints1[1]];
          }
        }
        else {
          if(isOrder3){
            intersectionPoints2[1].deleteReferences();
            intersectionPoints2[1]=null;
            return [1,intersectionPoints2[0]];
          }
          else {
            intersectionPoints2[0].deleteReferences();
            intersectionPoints2[0]=null;
            return [1,intersectionPoints2[1]];
          }
        }

        // check special case
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      }

      break;
      default:

        for (var k = intersectionPoints1.length-1; k >= 0; k--) {
          intersectionPoints1[k].deleteReferences();
          intersectionPoints1[k]=null;
        }
        for (var k = intersectionPoints2.length-1; k >= 0; k--) {
          intersectionPoints2[k].deleteReferences();
          intersectionPoints2[k]=null;
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////// CASE 4: k1 is outsides the circles around k0 and k2, and the lines between k1 and k0/k2 have two intersection point with the ordered area.
        /////////////////////// Both are located before k0/k2 at the line.
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        //console.log("Case 4");

        var direction = [color_K2.get1Value()-color_K0.get1Value(),
                        color_K2.get2Value()-color_K0.get2Value(),
                        color_K2.get3Value()-color_K0.get3Value()]

        var middle = [color_K0.get1Value()+(0.5*direction[0]),
                      color_K0.get2Value()+(0.5*direction[1]),
                      color_K0.get3Value()+(0.5*direction[2])];

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
        var tmp = (norm[0]*color_K1.get1Value())+(norm[1]*color_K1.get2Value())+(norm[2]*color_K1.get3Value());
        var r = (nA-tmp)/divider;

        var intersection = [
          color_K1.get1Value()+norm[0]*r,
          color_K1.get2Value()+norm[1]*r,
          color_K1.get3Value()+norm[2]*r
        ];

        //////////////////////////////////
        /// new Postion using height of uniside triangle
        /// height of uniside triangle : h = a/2 * Math.sqrt(3);
        var height = calc3DEuclideanDistance(cloneColor(color_K0), cloneColor(color_K2))/2 * Math.sqrt(3);

        var direction_MI = [intersection[0]-middle[0],
                            intersection[1]-middle[1],
                            intersection[2]-middle[2]];

        var ratio = height/vecLength(direction_MI);

        var newPos = [middle[0]+(direction_MI[0]*ratio),
                      middle[1]+(direction_MI[1]*ratio),
                      middle[2]+(direction_MI[2]*ratio)];



        return [1,createColor(newPos[0],newPos[1],newPos[2],this.editCMS.getInterpolationSpace())];

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
        intersectionPoints = this.getLineSphereIntersection(cloneColor(color_K1), cloneColor(color_K0), cloneColor(color_K0), orderVals[0]);
    }
    else{ //orderVals[4]<0
        // create line between i and i+1
        intersectionPoints = this.getLineSphereIntersection(cloneColor(color_K1), cloneColor(color_K2), cloneColor(color_K2), orderVals[0]);
    }

    color_K0.deleteReferences();
    color_K2.deleteReferences();
    color_K0=null;
    color_K2=null;

    switch (intersectionPoints.length) {
      case 1:
        color_K1.deleteReferences();
        color_K1=null;
        intersectionPoints[1].deleteReferences();
        intersectionPoints[1]=null;
        return [1,intersectionPoints[0]];
      break;
      case 2:
        // the nearest intersection point is the right one
        var dis1 = calc3DEuclideanDistance(cloneColor(intersectionPoints[0]), cloneColor(color_K1));
        var dis2 = calc3DEuclideanDistance(cloneColor(intersectionPoints[1]), cloneColor(color_K1));
        color_K1.deleteReferences();
        color_K1=null;
        if(dis1<dis2){
          intersectionPoints[1].deleteReferences();
          intersectionPoints[1]=null;
          return [1,intersectionPoints[0]];
        }
        else {
          intersectionPoints[0].deleteReferences();
          intersectionPoints[0]=null;
          return [1,intersectionPoints[1]];
        }
      break;
      default:
        console.log("Error at Sphere Intersection Algorithm"); // because there should be always 2 intersection points if the line goes to the sphere center
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }else {
    color_K0.deleteReferences();
    color_K1.deleteReferences();
    color_K2.deleteReferences();
    color_K0=null;
    color_K1=null;
    color_K2=null;
    return [0];
  }

}

getLineSphereIntersection(colorL1, colorL2, colorCenter, radius){

    //http://www.ambrsoft.com/TrigoCalc/Sphere/SpherLineIntersection_.htm#SphereLineIntersectionEqDev

    var v_a = Math.pow(colorL2.get1Value()-colorL1.get1Value(),2)+Math.pow(colorL2.get2Value()-colorL1.get2Value(),2)+Math.pow(colorL2.get3Value()-colorL1.get3Value(),2);
    var v_b = -2*((colorL2.get1Value()-colorL1.get1Value())*(colorCenter.get1Value()-colorL1.get1Value())+(colorL2.get2Value()-colorL1.get2Value())*(colorCenter.get2Value()-colorL1.get2Value())+(colorL2.get3Value()-colorL1.get3Value())*(colorCenter.get3Value()-colorL1.get3Value()));
    var v_c = Math.pow(colorCenter.get1Value()-colorL1.get1Value(),2)+Math.pow(colorCenter.get2Value()-colorL1.get2Value(),2)+Math.pow(colorCenter.get3Value()-colorL1.get3Value(),2)-Math.pow(radius,2);

    // check the discriminante
    var v_D = Math.pow(v_b,2)-4*v_a*v_c;
    //console.log(v_D);
    if(v_D>0){
      var val_t_pos = (-1* v_b + Math.sqrt(v_D))/(2 * v_a);
      var val_t_neg = (-1* v_b - Math.sqrt(v_D))/(2 * v_a);
      var intColor1 = this.determineIntersectionPoint(colorL1, colorL2, val_t_pos);
      var intColor2 = this.determineIntersectionPoint(colorL1, colorL2, val_t_neg);
      colorL1.deleteReferences();
      colorL2.deleteReferences();
      colorL1=null;
      colorL2=null;
      return [intColor1,intColor2];
    }
    else if(v_D==0){
      var val_t = (-1* v_b)/(2 * v_a);
      var intColor1 = this.determineIntersectionPoint(colorL1, colorL2, val_t);
      colorL1.deleteReferences();
      colorL2.deleteReferences();
      colorL1=null;
      colorL2=null;
      return [intColor1];
    }
    else {
      colorL1.deleteReferences();
      colorL2.deleteReferences();
      colorL1=null;
      colorL2=null;
      return [];
    }

}

determineIntersectionPoint(colorL1, colorL2, val_t){
  var c_v1 = colorL1.get1Value() + ((colorL2.get1Value()-colorL1.get1Value())*val_t);
  var c_v2 = colorL1.get2Value() + ((colorL2.get2Value()-colorL1.get2Value())*val_t);
  var c_v3 = colorL1.get3Value() + ((colorL2.get3Value()-colorL1.get3Value())*val_t);
  return createColor(c_v1,c_v2,c_v3,this.editCMS.getInterpolationSpace());
}

/////////////////////////////////////////////////////////////////////////////////////////
////////////////            Legendbased Optimum                 ////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
createLegendBasedGraph(){

  if(this.optiGraph!=undefined){
    this.optiGraph.deleteReferences();
    this.optiGraph=undefined;
  }

  this.optiGraph = new class_Graph_ForcedLegOrder(this.editCMS.getInterpolationSpace(),document.getElementById("id_OptiPage_GlobalLegOrderOptimization").checked);
  this.optiGraph.changeColorEdgeOptions(this.editCMS.getInterpolationSpace(),false,"eu");

  var continuousSections = this.editCMS.searchForContinuousSections(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex,document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex);

  ///////
   // save not editAble color
   var firstID = continuousSections[0][0];
   var lastID= continuousSections[continuousSections.length-1][1];
   for (var i = 0; i < firstID; i++) {
     switch (this.editCMS.getKeyType(i)) {
       case "dual key":
         this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,2);
         break;
         case "left key":
           this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,0);
           break;
           case "right key":
            this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,1);
             break;
             case "twin key":
              this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,0);
              this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,1);
            break;
     }
   }

   if(this.editCMS.getKeyType(firstID)=="twin key"){
     this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,0);
   }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  for (var j = 0; j < continuousSections.length; j++) {
    for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++){
      if(i == continuousSections[j][0] && (this.editCMS.getKeyType(i)==="right key" || this.editCMS.getKeyType(i)==="twin key"))
        this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), false,i,1); // save key index information and if the node represent the right, left or both colors of the key
      else
        this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), false,i,2);

        this.optiGraph.pushEdge(this.optiGraph.getNodeLength()-1,this.optiGraph.getNodeLength());
    }// for

    if(this.editCMS.getKeyType(continuousSections[j][1])==="left key"|| this.editCMS.getKeyType(i)==="twin key")
      this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(continuousSections[j][1],this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(continuousSections[j][1]),false,continuousSections[j][1],0);
    else
      this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(continuousSections[j][1],this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(continuousSections[j][1]),false,continuousSections[j][1],2);

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  if(this.editCMS.getKeyType(lastID)==="twin key"){
    this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,lastID,1);
  }


  for (var i = lastID+1; i < this.editCMS.getKeyLength; i++) {
    switch (this.editCMS.getKeyType(i)) {
      case "dual key":
        this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,2);
        break;
        case "left key":
          this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,0);
          break;
          case "right key":
           this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,1);
            break;
            case "twin key":
             this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,0);
             this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,1);
           break;
    }
  }
}

calcLegOrderOptimum(isGlobal,degree){

  this.createLegendBasedGraph();

  var distance = Math.abs(this.editCMS.getRefPosition(this.editCMS.getKeyLength()-1) - this.editCMS.getRefPosition(0));
  var blackWhiteSpeed = undefined;
  switch (this.editCMS.getInterpolationSpace()) {
    case "rgb":
      var rgbBlack = new class_Color_RGB(0, 0, 0);
      var rgbWhite = new class_Color_RGB(1, 1, 1);
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
    default:
  }

  if(isGlobal){
    var optiSpeed = blackWhiteSpeed*document.getElementById("id_OptiPage_LegOrderOpti_Global_Speed").value;
    this.optiGraph.forceLayout(document.getElementById("id_OptiPage_LegOrderOpti_Global_Iterations").value,degree,optiSpeed,isGlobal);
  }
  else {
    var optiSpeed = blackWhiteSpeed*document.getElementById("id_OptiPage_LegOrderOpti_Local_Speed").value;
    this.optiGraph.forceLayout(document.getElementById("id_OptiPage_LegOrderOpti_Local_Iterations").value,degree,optiSpeed,isGlobal);
  }

  this.optiGraphToCMS();
}

////////////////////////////////////////////////////////////////////////////////
////////////////          Discriminative Power          ////////////////////////
////////////////////////////////////////////////////////////////////////////////
createDisPowerGraph(){

    if(this.optiGraph!=undefined){
      this.optiGraph.deleteReferences();
      this.optiGraph=undefined;
    }

    this.optiGraph = new class_Graph_ForcedDisPower(this.editCMS.getInterpolationSpace());
    this.optiGraph.changeColorEdgeOptions(this.editCMS.getInterpolationSpace(),true,"eu");

    //var continuousSections = this.editCMS.searchForContinuousSections(0,this.editCMS.getKeyLength()-1);
    var continuousSections = this.editCMS.searchForContinuousSections(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex,document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex);

    ///////
     // save not editAble color
     var firstID = continuousSections[0][0];
     var lastID= continuousSections[continuousSections.length-1][1];
     for (var i = 0; i < firstID; i++) {
       switch (this.editCMS.getKeyType(i)) {
         case "dual key":
           this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,2);
           break;
           case "left key":
             this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,0);
             break;
             case "right key":
              this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,1);
               break;
               case "twin key":
                this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,0);
                this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,1);
              break;
       }
     }

     if(this.editCMS.getKeyType(firstID)=="twin key"){
       this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,0);
     }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    for (var j = 0; j < continuousSections.length; j++) {
      for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++){


        if(i == continuousSections[j][0] && (this.editCMS.getKeyType(i)==="right key"||this.editCMS.getKeyType(i)==="twin key"))
          this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), false,i,1); // save key index information and if the node represent the right, left or both colors of the key
        else
          this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), false,i,2);

          this.optiGraph.pushEdge(this.optiGraph.getNodeLength()-1,this.optiGraph.getNodeLength());
      }// for

      if(this.editCMS.getKeyType(continuousSections[j][1])==="left key"|| this.editCMS.getKeyType(i)==="twin key")
        this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(continuousSections[j][1],this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(continuousSections[j][1]),false,continuousSections[j][1],0);
      else
        this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(continuousSections[j][1],this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(continuousSections[j][1]),false,continuousSections[j][1],2);

    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if(this.editCMS.getKeyType(lastID)=="twin key"){
      this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,lastID,1);
    }


    for (var i = lastID+1; i < this.editCMS.getKeyLength; i++) {
      switch (this.editCMS.getKeyType(i)) {
        case "dual key":
          this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,2);
          break;
          case "left key":
            this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,0);
            break;
            case "right key":
             this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,1);
              break;
              case "twin key":
               this.optiGraph.pushNode(this.editCMS.getLeftKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,0);
               this.optiGraph.pushNode(this.editCMS.getRightKeyColor(i,this.editCMS.getInterpolationSpace()),this.editCMS.getRefPosition(i), true,i,1);
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

  for (var j = 0; j < continuousSections.length; j++) {

    if(continuousSections[j][0]+1<continuousSections[j][1]){
      for (var i = continuousSections[j][0]+1; i < continuousSections[j][1]; i++) {
        this.testCalcSmoothnessOptiumumForKey(i-1,i,i+1,continuousSections[j][0],continuousSections[j][1]);//calcSmoothnessOptiumumForKey(i-1,i,i+1);
      }// for
    } // if
  }
}

calcGlobalSmoothOptimum(){
  var continuousSections = this.editCMS.searchForContinuousSections(document.getElementById("id_OptiPage_Optimization_FromKey").selectedIndex,document.getElementById("id_OptiPage_Optimization_TillKey").selectedIndex);

  for (var j = 0; j < continuousSections.length; j++) {

    if(continuousSections[j][0]+1==continuousSections[j][1])
      continue;

    if(continuousSections[j][0]+2==continuousSections[j][1]){
      this.calcSmoothnessOptiumumForKey(continuousSections[j][0],continuousSections[j][0]+1,continuousSections[j][1]);
    }
    else {
      for (var k0 = continuousSections[j][0]; k0 < continuousSections[j][1]-1; k0++) {
      for (var k2=k0+2; k2<=continuousSections[j][1]; k2++) {
      for (var k1=k0+1; k1<k2; k1++) {
        this.testCalcSmoothnessOptiumumForKey(k0,k1,k2,continuousSections[j][0],continuousSections[j][1]);//calcSmoothnessOptiumumForKey(k0,k1,k2);
      }// for k1
      }// for k2
      }// for k0
    } // if
  }
}

testCalcSmoothnessOptiumumForKey(k0,k1,k2,startID,endID){
  var status = this.calcSmoothnessOptiumumForKey(k0,k1,k2);

  /*if(status==2){
    if(k0!=startID){
      this.testCalcSmoothnessOptiumumForKey(k0-1,k1-1,k2-1,startID,endID);
    }
    if(k2!=endID){
      this.testCalcSmoothnessOptiumumForKey(k0+1,k1+1,k2+1,startID,endID);
    }
  }*/

}

calcSmoothnessOptiumumForKey(k0,k1,k2){

  var color_Ci = this.editCMS.getRightKeyColor(k0,this.editCMS.getInterpolationSpace());
  var color_Cj = this.editCMS.getRightKeyColor(k1,this.editCMS.getInterpolationSpace());
  var color_Ck = this.editCMS.getLeftKeyColor(k2,this.editCMS.getInterpolationSpace());
  var small_NUM = 1e-6;

  if(color_Ci.equalTo(color_Cj))
    return 0;

  if(color_Ci.equalTo(color_Ck))
    return 0;

  if(color_Ck.equalTo(color_Cj))
    return 0;


  /////////////////////////
  // Translation of color_Ci into the origin


  /////////////////////////
  // calc plane unit normal


  ///////////////////////////
  /// Determine Radius

  var ref_i = this.editCMS.getRefPosition(k0);
  var ref_j = this.editCMS.getRefPosition(k1);
  var ref_k = this.editCMS.getRefPosition(k2);

  var tangentVec_ij = vec_Divi(vec_Diff_COLOR(color_Cj,color_Ci),ref_j-ref_i);
  var tangentVec_jk = vec_Divi(vec_Diff_COLOR(color_Ck,color_Cj),ref_k-ref_j);

  var tangentVec_Norm_ij = vecNorm(tangentVec_ij);
  var tangentVec_Norm_jk = vecNorm(tangentVec_jk);

  console.log("----------------------------------------------------");
  console.log("Smooth: tangent vec (ci) = (",color_Ci.get1Value(),",",color_Ci.get2Value(),",",color_Ci.get3Value(),")");
  console.log("Smooth: tangent vec (cj) = (",color_Cj.get1Value(),",",color_Cj.get2Value(),",",color_Cj.get3Value(),")");
  console.log("Smooth: tangent vec (ck) = (",color_Ck.get1Value(),",",color_Ck.get2Value(),",",color_Ck.get3Value(),")");
  console.log("Smooth: normierter tangent vec (ci,cj) = ", tangentVec_Norm_ij);
  console.log("Smooth: normierter tangent vec (cj,ck) = ", tangentVec_Norm_jk);

  var scalarProduct = vec_Dot(tangentVec_Norm_ij,tangentVec_Norm_jk);
  console.log("Smooth: scalarProduct <tangentVec_ij,tangentVec_jk> = ", scalarProduct);

  if(scalarProduct>1){
    console.log("Smooth: scalarProduct > 1 => Clippen to 1 ");
    scalarProduct=1;
  }

  if(scalarProduct<-1){
    console.log("Smooth: scalarProduct < -1 => Clippen to -1 ");
    scalarProduct=-1;
  }

  var curvature = Math.sqrt(1-Math.pow(scalarProduct,2))/(0.5*(ref_k-ref_i));
  var curvature2 = Math.sin(Math.acos(scalarProduct))/(0.5*(ref_k-ref_i));

  console.log("Smooth: curvature (Math.sqrt(1-Math.pow(scalarProduct,2))/(0.5*(ref_k-ref_i))) = ", curvature);
  console.log("Smooth: curvature (Math.sin(Math.acos(scalarProduct))/(0.5*(ref_k-ref_i))) = ", curvature2);

  if(isNaN(curvature)){
    console.log("curvature is NaN for i=",k0,", j=",k1,", k=",k2);
    return 0;
  }

  var radius = 1/curvature;


  //console.log("curvature = ", curvature,"=Math.sqrt(1-Math.pow(",scalarProduct,",2))/0.5*(",ref_k,"-",ref_i,")");
  console.log("radius = ", radius);

  ///////////////////////////////////////////////
  // PLANE 1
  // norm form of plane  n*(x-A)=0

  var vec_JI = vec_Diff_COLOR(color_Ci,color_Cj);
  var vec_JK = vec_Diff_COLOR(color_Ck,color_Cj);
  var norm1 = vecNorm(vec_Cross(vec_JI,vec_JK));
  var vec_Cj = [color_Cj.get1Value(),color_Cj.get2Value(),color_Cj.get3Value()];

  //////////////////////////////////////////////
  /// Parameter form  = positionvector+r*intersectionLine_dirVector +s*intersectionLine_dirVector
  // => parameter form H: = vec_Cj + r*vec_JI + r*vec_JK

  ///////////////////////////////////////////////
  /// convert to coordinate form
  /// plane = Ax+By+Cz+D=0
  /// A=norm[0], B=norm[1], C=norm[2],
  /// insert known point for x,y,z
  /// D =  (Ax+By+Cz)*-1

  var plane_Point1 = [color_Ci.get1Value(),color_Ci.get2Value(),color_Ci.get3Value()];
  //var val_D1 = (plane_Point1[0]*norm1[0]+plane_Point1[1]*norm1[1]+plane_Point1[2]*norm1[2])*-1;
  var d1 = -vec_Dot(norm1, plane_Point1);

  ///////////////////////////////////////////////
  // PLANE 2
  // norm form of plane  n*(x-A)=0

  var direction = [color_Ck.get1Value()-color_Ci.get1Value(),
                  color_Ck.get2Value()-color_Ci.get2Value(),
                  color_Ck.get3Value()-color_Ci.get3Value()];

  var plane_Point2 = [color_Ci.get1Value()+(0.5*direction[0]),
                color_Ci.get2Value()+(0.5*direction[1]),
                color_Ci.get3Value()+(0.5*direction[2])]; // = middle point between c_i and c_k

  var norm2 = vecNorm(direction);

  ///////////////////////////////////////////////////
  // get coordinate form of plane 2
  //var val_D2 = (plane_Point2[0]*norm2[0]+plane_Point2[1]*norm2[1]+plane_Point2[2]*norm2[2])*-1;
  var d2 = -vec_Dot(norm2, plane_Point2);

  ///////////////////////////////////////////////
  // PLANE-PLANE Intersection Line
  // use parameterform of plane1 and coordinate form of plane 2
  // x= vec_Cj[0] + r*vec_JI[0] + s*vec_JK[0]
  // y= vec_Cj[1] + r*vec_JI[1] + s*vec_JK[1]
  // z= vec_Cj[2] + r*vec_JI[2] + s*vec_JK[2]

  // norm2[0]*x+ norm2[1]*y + norm2[2]*z +d2 = 0

  // norm2[0]*(vec_Cj[0] + r*vec_JI[0] + s*vec_JK[0]) +
  // norm2[1]*(vec_Cj[1] + r*vec_JI[1] + s*vec_JK[1]) +
  // norm2[2]*(vec_Cj[2] + r*vec_JI[2] + s*vec_JK[2]) +
  // d2 = 0

  var notRSFactor = norm2[0]*vec_Cj[0]+norm2[1]*vec_Cj[1]+norm2[2]*vec_Cj[2]+d2;
  var rFactor = norm2[0]*vec_JI[0]+norm2[1]*vec_JI[1]+norm2[2]*vec_JI[2];
  var sFactor = norm2[0]*vec_JK[0]+norm2[1]*vec_JK[1]+norm2[2]*vec_JK[2];

  // - s*sFactor =  r*rFactor+notRSFactor
  //  s = r*rFactor/(-sFactor)+(notRSFactor/rFactor)

  var sR= rFactor/(-sFactor);
  var sNonR = (notRSFactor/rFactor);

  // x= vec_Cj[0] + r*vec_JI[0] + s*vec_JK[0]
  // y= vec_Cj[1] + r*vec_JI[1] + s*vec_JK[1]
  // z= vec_Cj[2] + r*vec_JI[2] + s*vec_JK[2]

  var intersectionLine_supVec = [undefined,undefined,undefined];
  var intersectionLine_dirVec = [undefined,undefined,undefined];

  // Line G: = intersectionLine_supVec + r*intersectionLine_dirVec

  intersectionLine_supVec[0]= vec_Cj[0] + sNonR*vec_JK[0];
  intersectionLine_supVec[1]= vec_Cj[1] + sNonR*vec_JK[1];
  intersectionLine_supVec[2]= vec_Cj[2] + sNonR*vec_JK[2];

  intersectionLine_dirVec[0] = vec_JI[0]+ sR*vec_JK[0];
  intersectionLine_dirVec[1] = vec_JI[1]+ sR*vec_JK[1];
  intersectionLine_dirVec[2] = vec_JI[2]+ sR*vec_JK[2];

  ///////////////////////////////////////////////
  // PLANE-PLANE Intersection Line
  // http://geomalgorithms.com/a05-_intersect-1.html
  /*var intersectionLine_dirVec = vecNorm(vec_Cross(norm1,norm2));
  var ax = (intersectionLine_dirVec[0] >= 0 ? intersectionLine_dirVec[0] : -intersectionLine_dirVec[0]);
  var ay = (intersectionLine_dirVec[1] >= 0 ? intersectionLine_dirVec[1] : -intersectionLine_dirVec[1]);
  var az = (intersectionLine_dirVec[2] >= 0 ? intersectionLine_dirVec[2] : -intersectionLine_dirVec[2]);

  // test if the two planes are parallel
    if ((ax+ay+az) < small_NUM) {        // Pn1 and Pn2 are near parallel
        // test if disjoint or coincide
        var vec_V = vec_Diff(plane_Point2,plane_Point1);
        if (vec_Dot(norm1, vec_V) == 0)          // Pn2.V0 lies in Pn1
            return 0;                    // Pn1 and Pn2 coincide
        else
            return 0;                    // Pn1 and Pn2 are disjoint
    }


    // Pn1 and Pn2 intersect in a line
    // first determine max abs coordinate of cross product
    var  maxc = undefined;                       // max coordinate
    if (ax > ay) {
        if (ax > az)
             maxc =  1;
        else maxc = 3;
    }
    else {
        if (ay > az)
             maxc =  2;
        else maxc = 3;
    }

    // next, to get a point on the intersect line
    // zero the max coord, and solve for the other two
    var intersectionLine_supVec = [undefined,undefined,undefined];                // intersect point

    // the constants in the 2 plane equations
    switch (maxc) {             // select max coordinate
    case 1:                     // intersect with x=0
        intersectionLine_supVec[0] = 0;
        intersectionLine_supVec[1] = (d2*norm1[2] - d1*norm2[2]) /  intersectionLine_dirVec[0];
        intersectionLine_supVec[2] = (d1*norm2[1] - d2*norm1[1]) /  intersectionLine_dirVec[0];
        break;
    case 2:                     // intersect with y=0
        intersectionLine_supVec[0] = ((d1*norm2[2]) - (d2*norm1[2])) /  intersectionLine_dirVec[1];//((d1*norm2[2]) - (d2*norm1[2])) /  intersectionLine_dirVec[1];
        intersectionLine_supVec[1] = 0;
        intersectionLine_supVec[2] = ((d2*norm1[0]) - (d1*norm2[0])) /  intersectionLine_dirVec[1];//((d2*norm1[0]) - (d1*norm2[0])) /  intersectionLine_dirVec[1];


        //console.log("intersectionLine_supVec[0]=(",d1,"*",norm2[2],"-",d2,"*",norm1[2],")/",intersectionLine_dirVec[1],"=",intersectionLine_supVec[0]);
        //console.log("intersectionLine_supVec[2]=(",d2,"*",norm1[0],"-",d1,"*",norm2[0],")/",intersectionLine_dirVec[1],"=",intersectionLine_supVec[2]);

        break;
    case 3:                     // intersect with z=0
        intersectionLine_supVec[0] = ((d2*norm1[1]) - (d1*norm2[1])) /  intersectionLine_dirVec[2];
        intersectionLine_supVec[1] = ((d1*norm2[0]) - (d2*norm1[0])) /  intersectionLine_dirVec[2];
        intersectionLine_supVec[2] = 0;

        //console.log("intersectionLine_supVec[0]=(",d2,"*",norm1[1],"-",d1,"*",norm2[1],")/",intersectionLine_dirVec[2],"=",intersectionLine_supVec[0]);
        //console.log("intersectionLine_supVec[1]=(",d1,"*",norm2[0],"-",d2,"*",norm1[0],")/",intersectionLine_dirVec[2],"=",intersectionLine_supVec[1]);
        break;
    }//*/

    console.log("Smooth: Intersection Line G:= ",intersectionLine_supVec,"+r*",intersectionLine_dirVec);
    /////////////////////////////////////////////////////
    /// get two points on this line with the distance of r to c_i and c_k
    /// line = intersectionLine_supVec + delta * intersectionLine_dirVec;
    /// line_q1 = intersectionLine_supVec[0] + delta * intersectionLine_dirVec[0]
    /// line_q2 = intersectionLine_supVec[1] + delta * intersectionLine_dirVec[1]
    /// line_q3 = intersectionLine_supVec[2] + delta * intersectionLine_dirVec[2]
    /// Searching for one or two points with the distance r to point_P1 with distance r to our line
    /// distance (= Math.pow(r,2))= Math.sqrt(Math.pow(line_q1-P1[0],2)+Math.pow(line_q2-P1[1],2)+Math.pow(line_q3-P1[2],2))
    var point_P1 = [color_Ci.get1Value(),color_Ci.get2Value(),color_Ci.get3Value()];// we can choose c_i or c_j as this color
    var point_Controll = [color_Ck.get1Value(),color_Ck.get2Value(),color_Ck.get3Value()];
    var equation_Part3 = Math.pow(intersectionLine_supVec[0]-point_P1[0],2)+Math.pow(intersectionLine_supVec[1]-point_P1[1],2)+Math.pow(intersectionLine_supVec[2]-point_P1[2],2)-Math.pow(radius,2);
    var equation_Part2 = 2*((intersectionLine_dirVec[0]*(intersectionLine_supVec[0]-point_P1[0])) + (intersectionLine_dirVec[1]*(intersectionLine_supVec[1]-point_P1[1])) + (intersectionLine_dirVec[2]*(intersectionLine_supVec[2]-point_P1[2])));// delta part
    var equation_Part1 = Math.pow(intersectionLine_dirVec[0],2)+Math.pow(intersectionLine_dirVec[1],2)+Math.pow(intersectionLine_dirVec[2],2);// delta square part

    var deltas = midnightFormula(equation_Part1,equation_Part2,equation_Part3);


    var point_m = [undefined,undefined,undefined];
    switch (deltas.length) {
      case 0:
        console.log("Smooth: Midnight Formula found no Point m with a distance \"radius\" to the intersection line!.");
        return;
      break;
      case 1:
        point_m[0] = intersectionLine_supVec[0] + deltas[0] * intersectionLine_dirVec[0];
        point_m[1] = intersectionLine_supVec[1] + deltas[0] * intersectionLine_dirVec[1];
        point_m[2] = intersectionLine_supVec[2] + deltas[0] * intersectionLine_dirVec[2];
      break;
      case 2:
        var tmp_M1 = [undefined,undefined,undefined];
        tmp_M1[0] = intersectionLine_supVec[0] + deltas[0] * intersectionLine_dirVec[0];
        tmp_M1[1] = intersectionLine_supVec[1] + deltas[0] * intersectionLine_dirVec[1];
        tmp_M1[2] = intersectionLine_supVec[2] + deltas[0] * intersectionLine_dirVec[2];

        var tmp_M2 = [undefined,undefined,undefined];
        tmp_M2[0] = intersectionLine_supVec[0] + deltas[1] * intersectionLine_dirVec[0];
        tmp_M2[1] = intersectionLine_supVec[1] + deltas[1] * intersectionLine_dirVec[1];
        tmp_M2[2] = intersectionLine_supVec[2] + deltas[1] * intersectionLine_dirVec[2];

        var dist_M1_Cj = vecLength(vec_Diff(tmp_M1,vec_Cj));
        var dist_M2_Cj = vecLength(vec_Diff(tmp_M2,vec_Cj));

        if(dist_M1_Cj>dist_M2_Cj){
          point_m=tmp_M1;
          console.log("Smooth: Refused alternate Point m = (",tmp_M2[0],",",tmp_M2[1],",",tmp_M2[2],")" );
        }
        else {
          point_m=tmp_M2;
          console.log("Smooth: Refused alternate Point m = (",tmp_M1[0],",",tmp_M1[1],",",tmp_M1[2],")" );
        }
      break;

    }

    console.log("Smooth: Point m = (",point_m[0],",",point_m[1],",",point_m[2],")" );
    var direction_m_To_Cj = vec_Diff(vec_Cj,point_m);
    var distance_m_Cj = vecLength(direction_m_To_Cj);

    if(distance_m_Cj>radius){
      console.log("Smooth: c_j need a movement");
      var newPoint = vec_Add(point_m,vecScalMulti(vecNorm(direction_m_To_Cj),radius));
      this.editCMS.setRightKeyColor(k1,createColor(newPoint[0],newPoint[1],newPoint[2],this.editCMS.getInterpolationSpace()));
      this.editCMS.setLeftKeyColor(k1,createColor(newPoint[0],newPoint[1],newPoint[2],this.editCMS.getInterpolationSpace()));
      return 2;
    }
    else {
      console.log("Smooth: the position of c_j is fine.");
      return 1;
    }

  color_Ci.deleteReferences();
  color_Cj.deleteReferences();
  color_Ck.deleteReferences();
  }
};
