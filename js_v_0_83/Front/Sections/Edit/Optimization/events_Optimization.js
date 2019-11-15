
function changeOpimizationMode(){

  if(editPage_optimizationMode){
    editPage_optimizationMode=false;
    document.getElementById("id_EditPage_OptimizationModeButton").classList.remove("class_EditPage_EditButtonActive");
    document.getElementById("id_EditPage_OptimizationModeButton").classList.add("class_EditPage_EditButton");
    document.getElementById("id_header_OptimizationModus").style.visibility = "hidden";

    document.getElementById("id_dropDownMenu_DisplayOptions").style.display = "block";
    document.getElementById("predefinedStructures_Div").style.display = "block";
    document.getElementById("optimization_Div").style.display = "none";

    //////////////////////////////////////////////////////////////////////////////////////////////
    // update STYLE Analyze Page
    document.getElementById("id_EditPage_DivAnalyze").style.height = "59vh";
    document.getElementById("id_editPage_AnalyzeMappingProbeSet_CloseDiv").style.display = "flex";
    document.getElementById("id_editPage_AnalyzeMappingProbeSet_TabDiv").style.display = "flex";
    document.getElementById("id_EditPage_AnalyseContentDiv").style.display = "flex"; // old flex
    document.getElementById("id_EditPage_AnalyseContentDiv_1").style.height = "100%"; // old 100%
    document.getElementById("id_EditPage_AnalyseContentDiv_1").style.width = "10vw"; // old 10vw
    document.getElementById("id_EditPage_AnalyseContentDiv_1").style.display = "block"; // old block
    document.getElementById("id_EditPage_AnalyseContentDiv_1").style.background = getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color'); // old

    document.getElementById("id_EditPage_AnalyseContentDiv_1_Obj1").style.margin = "0vh";
    document.getElementById("id_EditPage_AnalyseContentDiv_1_Obj1").style.marginLeft = "1vw";
    document.getElementById("id_EditPage_AnalyseContentDiv_1_Obj1").style.marginTop = "2vh";
    document.getElementById("id_EditPage_AnalyseContentDiv_1_Obj1").style.marginBottom = "1vh";
    document.getElementById("id_EditPage_AnalyseContentDiv_1_Obj1").style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color'); // old
    document.getElementById("id_EditPage_SelectAnalyzePlot").style.margin = "0vh";
    document.getElementById("id_EditPage_SelectAnalyzePlot").style.marginLeft = "1vw";

    document.getElementById("id_EditPage_AnalyseContentDiv_1_Obj3").style.display = "block";
    document.getElementById("id_editPage_Anaylze_IntervalCalcInput").style.display = "block";

    document.getElementById("id_EditPage_AnalyseContentDiv_2").style.height = "100%";

    // update STYLE Pathplot Page
    document.getElementById("id_EditPage_Edit_Path").style.height = "59vh"; // 59vh
    document.getElementById("id_editPage_EditKeyPathPlot_CloseDiv").style.display = "flex"; // old flex
    document.getElementById("id_editPage_EditKeyPathPlot_TabDiv").style.display = "flex"; // old flex

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    // show all
    document.getElementById("id_EditPage_Add_Structures_Optimization").style.display = "block"; // should be
    document.getElementById("id_EditPage_Table_Div").style.display = "block";
    document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display = "block";
    document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display = "block";

    update_EditPageStyle();

    if(editPage_editK_wasDisplayed){
      switchModifyModus(0);
    }
    else{// => editPage_editP_wasDisplayed == true
      switchModifyModus(1);
    }


    if(editPage_analyzeA_wasDisplayed){
      switchAnalyzeMappingProbeSet(0);
    }
    else if(editPage_analyzeM_wasDisplayed){
      switchAnalyzeMappingProbeSet(1);
    }else{
      // => editPage_analyzeP_wasDisplayed == true
        switchAnalyzeMappingProbeSet(2);
    }
    //hide

    console.log(editPage_predefinedCMS_wasDisplayed,editPage_table_wasDisplayed,editPage_edit_wasDisplayed,editPage_analyze_wasDisplayed);

    if(!editPage_predefinedCMS_wasDisplayed)
      document.getElementById("id_EditPage_Add_Structures_Optimization").style.display = "none";

    if(!editPage_table_wasDisplayed)
      document.getElementById("id_EditPage_Table_Div").style.display = "none";

    if(!editPage_edit_wasDisplayed)
      document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display = "none";

    if(!editPage_analyze_wasDisplayed)
      document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display = "none";

    update_EditPageStyle();
  }
  else {

    if(globalCMS1_Original!=undefined)
      globalCMS1_Original.deleteReferences();
    globalCMS1_Original = cloneCMS(globalCMS1);

    editPage_optimizationMode=true;
    document.getElementById("id_EditPage_OptimizationModeButton").classList.remove("class_EditPage_EditButton");
    document.getElementById("id_EditPage_OptimizationModeButton").classList.add("class_EditPage_EditButtonActive");
    document.getElementById("id_header_OptimizationModus").style.visibility = "visible";

    document.getElementById("id_dropDownMenu_DisplayOptions").style.display = "none";
    document.getElementById("predefinedStructures_Div").style.display = "none";
    document.getElementById("optimization_Div").style.display = "flex";


    editPage_table_wasDisplayed = false;
    editPage_predefinedCMS_wasDisplayed = false;
    editPage_analyze_wasDisplayed = false;
    editPage_analyzeA_wasDisplayed = false; // analyze
    editPage_analyzeM_wasDisplayed = false; // mapping
    editPage_analyzeP_wasDisplayed = false; // probeset
    editPage_edit_wasDisplayed = false;
    editPage_editK_wasDisplayed = false; // key
    editPage_editP_wasDisplayed = false; // pathplot

    /////////////////////////////////////////////////////////////////////////////
    ///// Add Structure Window
    if(document.getElementById("id_EditPage_Add_Structures_Optimization").style.display != "none"){
      editPage_predefinedCMS_wasDisplayed=true;
    }
    else {
      document.getElementById("id_EditPage_Add_Structures_Optimization").style.display = "block"; // we want the space for the optimization options
    }


    /////////////////////////////////////////////////////////////////////////////
    ///// Table Window
    if(document.getElementById("id_EditPage_Table_Div").style.display != "none"){
      editPage_table_wasDisplayed=true;
      document.getElementById("id_EditPage_Table_Div").style.display = "none"; // we dont want this
    }


    /////////////////////////////////////////////////////////////////////////////
    ///// Edit Window
    if(document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display != "none"){
      editPage_edit_wasDisplayed=true;
    }
    else {
      document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display = "block"; // we want the space for the optimization options
    }

    if(document.getElementById("id_EditPage_Edit_Keys").style.display != "none"){
      editPage_editK_wasDisplayed=true;
    }

    if(document.getElementById("id_EditPage_Edit_Path").style.display != "none"){
      editPage_editP_wasDisplayed=true;
    }

    /////////////////////////////////////////////////////////////////////////////
    ///// Analyze Mapping Probe Window
    if(document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display != "none"){
      editPage_analyze_wasDisplayed=true;
    }
    else {
      document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display = "block"; // we want the space for the optimization options
    }

    if(document.getElementById("id_EditPage_DivAnalyze").style.display != "none"){
      editPage_analyzeA_wasDisplayed=true;
    }

    if(document.getElementById("id_EditPage_DivMapping").style.display != "none"){
      editPage_analyzeM_wasDisplayed=true;
    }

    if(document.getElementById("id_EditPage_DivProbeSets").style.display != "none"){
      editPage_analyzeP_wasDisplayed=true;
    }

    update_EditPageStyle();

    if(!editPage_analyzeA_wasDisplayed)
     switchAnalyzeMappingProbeSet(0);

     if(!editPage_analyzeP_wasDisplayed)
      switchModifyModus(1);

    // update STYLE Analzye Page
    document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.width = "50%";
    document.getElementById("id_EditPage_DivAnalyze").style.height = "65vh"; // 59vh
    document.getElementById("id_editPage_AnalyzeMappingProbeSet_CloseDiv").style.display = "none";
    document.getElementById("id_editPage_AnalyzeMappingProbeSet_TabDiv").style.display = "none";
    document.getElementById("id_EditPage_AnalyseContentDiv").style.display = "block"; // old flex
    document.getElementById("id_EditPage_AnalyseContentDiv_1").style.height = "5vh"; // old 100%
    document.getElementById("id_EditPage_AnalyseContentDiv_1").style.width = "100%"; // old 10vw
    document.getElementById("id_EditPage_AnalyseContentDiv_1").style.display = "flex"; // old block
    document.getElementById("id_EditPage_AnalyseContentDiv_1").style.background = getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-bg'); // old --main-bg-color

    document.getElementById("id_EditPage_AnalyseContentDiv_1_Obj1").style.margin = "auto";
    document.getElementById("id_EditPage_AnalyseContentDiv_1_Obj1").style.marginLeft = "2vw";
    document.getElementById("id_EditPage_AnalyseContentDiv_1_Obj1").style.marginRight = "1vw";
    document.getElementById("id_EditPage_AnalyseContentDiv_1_Obj1").style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color'); // old --main-font-color

    document.getElementById("id_EditPage_SelectAnalyzePlot").style.margin = "auto";
    document.getElementById("id_EditPage_SelectAnalyzePlot").style.marginLeft = "1vw";

    document.getElementById("id_EditPage_AnalyseContentDiv_1_Obj3").style.display = "none";
    document.getElementById("id_editPage_Anaylze_IntervalCalcInput").style.display = "none";

    document.getElementById("id_EditPage_AnalyseContentDiv_2").style.height = "60vh";

    document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.width = "15vw";
    document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.maxWidth = "30vh";
    document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.height = "30vh";
    document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.maxHeight= "15vw";
    document.getElementById("id_EditPage_LabelDiv_GlobalLocalOrder").style.maxWidth = "20vw";

    // update STYLE Pathplot Page
    document.getElementById("id_editPage_EditKeyPathPlotDiv").style.width = "50%";
    document.getElementById("id_EditPage_Edit_Path").style.height = "65vh"; // 59vh
    document.getElementById("id_editPage_EditKeyPathPlot_CloseDiv").style.display = "none"; // old flex
    document.getElementById("id_editPage_EditKeyPathPlot_TabDiv").style.display = "none"; // old flex

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    document.getElementById("id_EditPage_LocalSpeedOptimization").checked=false;
    document.getElementById("id_EditPage_GlobalSpeedOptimization").checked=false;

    document.getElementById("id_EditPage_LocalIntOrderOptimization").checked=false;
    document.getElementById("id_EditPage_GlobalIntOrderOptimization").checked=false;

    document.getElementById("id_EditPage_LocalLegOrderOptimization").checked=false;
    document.getElementById("id_EditPage_GlobalLegOrderOptimization").checked=false;

    document.getElementById("id_EditPage_LocalDisPowerOptimization").checked=false;
    document.getElementById("id_EditPage_GlobalDisPowerOptimization").checked=false;

    document.getElementById("id_EditPage_UniOpti_Local_Degree").value=0;
    document.getElementById("id_EditPage_UniOpti_Global_Degree").value=0;
    document.getElementById("id_EditPage_IntOrderOpti_Local_Degree").value=0;
    document.getElementById("id_EditPage_IntOrderOpti_Global_Degree").value=0;
    document.getElementById("id_EditPage_LegOrderOpti_Local_Degree").value=0;
    document.getElementById("id_EditPage_LegOrderOpti_Global_Degree").value=0;
    document.getElementById("id_EditPage_DisPowerOpti_Local_Degree").value=0;
    document.getElementById("id_EditPage_DisPowerOpti_Global_Degree").value=0;

    fillKeyCombobox(false);
    chooseOptimizationType(0);
  }
}

function editCMSduringOptimizationMode(){
  globalCMS1_Original = cloneCMS(globalCMS1);
  fillKeyCombobox(true);
  updateOptiPageStyle();
}



function chooseOptimizationType(type){

  document.getElementById("id_Select_Uniform_Opti").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_Select_IntOrder_Opti").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_Select_LegOrder_Opti").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_Select_DisPower_Opti").classList.remove("class_TabRowButtonActive");

  document.getElementById("id_Select_Uniform_Opti").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_Select_IntOrder_Opti").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_Select_LegOrder_Opti").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_Select_DisPower_Opti").classList.add("class_TabRowButtonNotActive");

  document.getElementById("id_Opti_Uniformity_Div").style.display="none";
  document.getElementById("id_Opti_IntOrder_Div").style.display="none";
  document.getElementById("id_Opti_LegOrder_Div").style.display="none";
  document.getElementById("id_Opti_DisPower_Div").style.display="none";

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
        break;
        case 2:
        document.getElementById("id_Select_LegOrder_Opti").classList.remove("class_TabRowButtonNotActive");
        document.getElementById("id_Select_LegOrder_Opti").classList.add("class_TabRowButtonActive");
        document.getElementById("id_Opti_LegOrder_Div").style.display="block";
          break;
          case 3:
          document.getElementById("id_Select_DisPower_Opti").classList.remove("class_TabRowButtonNotActive");
          document.getElementById("id_Select_DisPower_Opti").classList.add("class_TabRowButtonActive");
          document.getElementById("id_Opti_DisPower_Div").style.display="block";
            break;
    default:
      return;
  }

  updateOptiPageStyle();
}

function updateOptiPageStyle(){

  if(globalCMS1.getInterpolationSpace()==="lch" || globalCMS1.getInterpolationSpace()==="hsv"){
    document.getElementById("id_EditPage_OptimizationWarning").style.display="flex";
    document.getElementById("id_EditPage_OptimizationSettings").style.display="none";
    return;
  }
  else {
    document.getElementById("id_EditPage_OptimizationWarning").style.display="none";
    document.getElementById("id_EditPage_OptimizationSettings").style.display="block";
    //document.getElementById("id_Optimization_Degree").value=0;
    //updateOptiCMSDegree();
  }

  ///////////////////////////////////////////////////////////////
  //// 1. Uniformity
  //////////////////////////////////////////////////////////////
    if(document.getElementById("id_Opti_Uniformity_Div").style.display!="none"){
      ///////////////////////////////////////////////////////////////
      //// 1.1 Local Uniformity
      //////////////////////////////////////////////////////////////
      if(document.getElementById("id_EditPage_LocalSpeedOptimization").checked){
        document.getElementById("id_EditPage_UniOpti_Local_Options").style.display="block";
      }
      else{
        document.getElementById("id_EditPage_UniOpti_Local_Options").style.display="none";
      }

      ///////////////////////////////////////////////////////////////
      //// 1.2 Global Uniformity
      //////////////////////////////////////////////////////////////
      if(document.getElementById("id_EditPage_GlobalSpeedOptimization").checked){

        document.getElementById("id_EditPage_UniOpti_FixedDiv").style.display="none";
        document.getElementById("id_EditPage_UniOpti_GraphSettings").style.display="none";

        document.getElementById("id_EditPage_UniOpti_Global_Options").style.display="block";

        if(document.getElementById("id_EditPage_GlobalLinearReg").checked)
          document.getElementById("id_EditPage_UniOpti_FixedDiv").style.display="block";
        else
          document.getElementById("id_EditPage_UniOpti_GraphSettings").style.display="block";
      }
      else{
        document.getElementById("id_EditPage_UniOpti_Global_Options").style.display="none";
      }
    }

  ///////////////////////////////////////////////////////////////
  //// 2. Intrinsic Order
  //////////////////////////////////////////////////////////////
  if(document.getElementById("id_Opti_IntOrder_Div").style.display!="none"){
    ///////////////////////////////////////////////////////////////
    //// 2.1 Local Intrinsic Order
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_EditPage_LocalIntOrderOptimization").checked){
      document.getElementById("id_EditPage_IntOrderOpti_Local_Options").style.display="block";
    }
    else{
      document.getElementById("id_EditPage_IntOrderOpti_Local_Options").style.display="none";
    }

    ///////////////////////////////////////////////////////////////
    //// 2.2 Global Intrinsic Order
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_EditPage_GlobalIntOrderOptimization").checked){
      document.getElementById("id_EditPage_IntOrderOpti_Global_Options").style.display="block";
    }
    else{
      document.getElementById("id_EditPage_IntOrderOpti_Global_Options").style.display="none";
    }
  }

  ///////////////////////////////////////////////////////////////
  //// 3. Legendbased Order
  //////////////////////////////////////////////////////////////
  if(document.getElementById("id_Opti_LegOrder_Div").style.display!="none"){

    updateLegendOptiWarningArea();

    ///////////////////////////////////////////////////////////////
    //// 3.1 Local Legendbased Order
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_EditPage_LocalLegOrderOptimization").checked){
      document.getElementById("id_EditPage_LegOrderOpti_Local_Options").style.display="block";
    }
    else{
      document.getElementById("id_EditPage_LegOrderOpti_Local_Options").style.display="none";
    }

    ///////////////////////////////////////////////////////////////
    //// 3.2 Global Legendbased Order
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_EditPage_GlobalLegOrderOptimization").checked){
      document.getElementById("id_EditPage_LegOrderOpti_Global_Options").style.display="block";
    }
    else{
      document.getElementById("id_EditPage_LegOrderOpti_Global_Options").style.display="none";
    }
  }

  ///////////////////////////////////////////////////////////////
  //// 4. Discriminative Power
  //////////////////////////////////////////////////////////////
  if(document.getElementById("id_Opti_DisPower_Div").style.display!="none"){
    ///////////////////////////////////////////////////////////////
    //// 4.1 Local Discriminative Power
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_EditPage_LocalDisPowerOptimization").checked){
      document.getElementById("id_EditPage_DisPowerOpti_Local_Options").style.display="block";
    }
    else{
      document.getElementById("id_EditPage_DisPowerOpti_Local_Options").style.display="none";
    }

    ///////////////////////////////////////////////////////////////
    //// 4.2 Global Discriminative Power
    //////////////////////////////////////////////////////////////
    if(document.getElementById("id_EditPage_GlobalDisPowerOptimization").checked){
      document.getElementById("id_EditPage_DisPowerOpti_Global_Options").style.display="block";
    }
    else{
      document.getElementById("id_EditPage_DisPowerOpti_Global_Options").style.display="none";
    }
  }

  calcOptiCMS();

}

function updateLegendOptiWarningArea(){


  if(globalCMS1.getKeyLength()<2)
    return;

  createLegendBasedGraph(); // create Graph here because we need the information for the warning area

  var distance = Math.abs(globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1) - globalCMS1.getRefPosition(0));
  var blackWhiteSpeed = undefined;
  var smallestNoticeableDelta = undefined;
  switch (globalCMS1.getInterpolationSpace()) {
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

  document.getElementById("id_EditPage_LegOrderOpti_Local_SpeedDisplay").innerHTML =  blackWhiteSpeed*document.getElementById("id_EditPage_LegOrderOpti_Local_Speed").value;
  document.getElementById("id_EditPage_LegOrderOpti_Global_SpeedDisplay").innerHTML =  blackWhiteSpeed*document.getElementById("id_EditPage_LegOrderOpti_Global_Speed").value;

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
  document.getElementById("id_EditPage_LegOrderOpti_Local_NotNoticeableArea").style.width=smallestNoticeableArea*100+"%";
  document.getElementById("id_EditPage_LegOrderOpti_Global_NotNoticeableArea").style.width=smallestNoticeableArea*100+"%";

  ///////////////////////////////////////////////////////
  ///// No Change Area
  var remainingNoChange=0;

  if(smallesSpeedInOriginal_Local != Infinity && smallesSpeedInOriginal_Local>smallestNoticeable){
    var smallestSpeedPos = smallesSpeedInOriginal_Local/blackWhiteSpeed;
    remainingNoChange = smallestSpeedPos-smallestNoticeableArea;
    document.getElementById("id_EditPage_LegOrderOpti_Local_NoChangeArea").style.width=remainingNoChange*100+"%";
    //document.getElementById("id_EditPage_LegOrderOpti_Info").style.visibility="visible";
  }
  else {
    ///////////////////////////////////////////////////////
    ///// Fitable Area
    remainingNoChange=0;
    document.getElementById("id_EditPage_LegOrderOpti_Local_NoChangeArea").style.width=0+"%";
    document.getElementById("id_EditPage_LegOrderOpti_Info").style.visibility="hidden";
  }

  var remainingFitable = 1.0-smallestNoticeableArea-remainingNoChange;
  document.getElementById("id_EditPage_LegOrderOpti_Local_OkayArea").style.width=remainingFitable*100+"%";


  remainingNoChange=0;

  if(smallesSpeedInOriginal_Global != Infinity && smallesSpeedInOriginal_Global>smallestNoticeable){
    var smallestSpeedPos = smallesSpeedInOriginal_Global/blackWhiteSpeed;
    remainingNoChange = smallestSpeedPos-smallestNoticeableArea;
    document.getElementById("id_EditPage_LegOrderOpti_Global_NoChangeArea").style.width=remainingNoChange*100+"%";
    //document.getElementById("id_EditPage_LegOrderOpti_Info").style.visibility="visible";
  }
  else {
    ///////////////////////////////////////////////////////
    ///// Fitable Area
    remainingNoChange=0;
    document.getElementById("id_EditPage_LegOrderOpti_Global_NoChangeArea").style.width=0+"%";
    document.getElementById("id_EditPage_LegOrderOpti_Info").style.visibility="hidden";
  }

  var remainingFitable = 1.0-smallestNoticeableArea-remainingNoChange;
  document.getElementById("id_EditPage_LegOrderOpti_Global_OkayArea").style.width=remainingFitable*100+"%";


  ///////////////////////////////////////////////////////
  ///// Above Area
  //var remainingNotFitable = 1.0-remainingFitable;
  //document.getElementById("id_EditPage_LegOrderOpti_NotFitableArea").style.width=(remainingNotFitable*100)+"%";

}

function updateOptimizationCMS(optiDegree){

    for (var i = document.getElementById("id_editPage_Optimization_FromKey").selectedIndex; i <= document.getElementById("id_editPage_Optimization_TillKey").selectedIndex; i++) {

      if(i!=document.getElementById("id_editPage_Optimization_FromKey").selectedIndex || i !=document.getElementById("id_editPage_Optimization_TillKey").selectedIndex){
        var originalPos = globalCMS1.getRefPosition(i);
        var optiPos = globalCMS1_Optimum.getRefPosition(i);

        var dis = optiPos-originalPos;

        var newPosition = originalPos+(dis*optiDegree);

        globalCMS1.setRefPosition(i,newPosition);
      }

      /////////////////////////////////////////////////////////////////
      ///// Left Color
      var original_LeftColor = globalCMS1.getLeftKeyColor(i,globalCMS1_Original.getInterpolationSpace());
      var opti_LeftColor = globalCMS1_Optimum.getLeftKeyColor(i,globalCMS1_Original.getInterpolationSpace());
      if(original_LeftColor!=undefined && opti_LeftColor!=undefined){
        if(!original_LeftColor.equalTo(opti_LeftColor)){
          var val1_dis = opti_LeftColor.get1Value()-original_LeftColor.get1Value();
          var val2_dis = opti_LeftColor.get2Value()-original_LeftColor.get2Value();
          var val3_dis = opti_LeftColor.get3Value()-original_LeftColor.get3Value();

          var newVal1 = original_LeftColor.get1Value()+(val1_dis*optiDegree);
          var newVal2 = original_LeftColor.get2Value()+(val2_dis*optiDegree);
          var newVal3 = original_LeftColor.get3Value()+(val3_dis*optiDegree);

          globalCMS1.setLeftKeyColor(i,createColor(newVal1,newVal2,newVal3,globalCMS1.getInterpolationSpace()));
        }

        original_LeftColor.deleteReferences();
        opti_LeftColor.deleteReferences();
        original_LeftColor=null;
        opti_LeftColor=null;
      }

      /////////////////////////////////////////////////////////////////
      ///// Right Color
      var original_RightColor = globalCMS1.getRightKeyColor(i,globalCMS1_Original.getInterpolationSpace());
      var opti_RightColor = globalCMS1_Optimum.getRightKeyColor(i,globalCMS1_Original.getInterpolationSpace());

      if(original_RightColor!=undefined && opti_RightColor!=undefined){
        if(!original_RightColor.equalTo(opti_RightColor)){
          var val1_dis = opti_RightColor.get1Value()-original_RightColor.get1Value();
          var val2_dis = opti_RightColor.get2Value()-original_RightColor.get2Value();
          var val3_dis = opti_RightColor.get3Value()-original_RightColor.get3Value();

          var newVal1 = original_RightColor.get1Value()+(val1_dis*optiDegree);
          var newVal2 = original_RightColor.get2Value()+(val2_dis*optiDegree);
          var newVal3 = original_RightColor.get3Value()+(val3_dis*optiDegree);

          globalCMS1.setRightKeyColor(i,createColor(newVal1,newVal2,newVal3,globalCMS1.getInterpolationSpace()));
        }

        original_RightColor.deleteReferences();
        opti_RightColor.deleteReferences();
        original_RightColor=null;
        opti_RightColor=null;
      }

    } // FOR

    globalCMS1_Optimum = cloneCMS(globalCMS1);
    globalCMS1_Optimum.setPreventIntervals(true);

  //// Update Edit Page => Plots for Analysis, Visualization and Edit

}

function calcOptiCMS(){

  if(globalCMS1_Optimum!=undefined)
    globalCMS1_Optimum.deleteReferences();
  globalCMS1_Optimum = cloneCMS(globalCMS1_Original);
  globalCMS1_Optimum.setPreventIntervals(true);

  globalCMS1.deleteReferences();
  globalCMS1 = cloneCMS(globalCMS1_Original);

  /////////////////////////////////////////////////////////////////////////////////////
  /// because of many of the optimization algorith has negative effects to the other

  var optiLocalType = [];
  var optiLocalDegree = [];

  var optiGlobalType = [];
  var optiGlobalDegree = [];



      if(document.getElementById("id_EditPage_LocalIntOrderOptimization").checked){
        var degree = document.getElementById("id_EditPage_IntOrderOpti_Local_Degree").value;
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

      if(document.getElementById("id_EditPage_GlobalIntOrderOptimization").checked){
        var degree = document.getElementById("id_EditPage_IntOrderOpti_Global_Degree").value;
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


    if(document.getElementById("id_EditPage_LocalLegOrderOptimization").checked){
      var degree = document.getElementById("id_EditPage_LegOrderOpti_Local_Degree").value;
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

    if(document.getElementById("id_EditPage_GlobalLegOrderOptimization").checked){
      var degree = document.getElementById("id_EditPage_LegOrderOpti_Global_Degree").value;
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


    createDisPowerGraph();

    if(document.getElementById("id_EditPage_LocalDisPowerOptimization").checked){

      document.getElementById("id_EditPage_DisPowerOpti_Local_SpeedDisplay").innerHTML =  optiGraph.determineOptimalSpeed(false)*document.getElementById("id_EditPage_LegOrderOpti_Local_Speed").value;
      var degree = document.getElementById("id_EditPage_DisPowerOpti_Local_Degree").value;
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

    if(document.getElementById("id_EditPage_GlobalDisPowerOptimization").checked){

      document.getElementById("id_EditPage_DisPowerOpti_Global_SpeedDisplay").innerHTML =  optiGraph.determineOptimalSpeed(true)*document.getElementById("id_EditPage_LegOrderOpti_Global_Speed").value;
      var degree = document.getElementById("id_EditPage_DisPowerOpti_Global_Degree").value;
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



    if(document.getElementById("id_EditPage_LocalSpeedOptimization").checked){
      var degree = document.getElementById("id_EditPage_UniOpti_Local_Degree").value;
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

    if(document.getElementById("id_EditPage_GlobalSpeedOptimization").checked){

      var degree = document.getElementById("id_EditPage_UniOpti_Global_Degree").value;
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


  var text = "";
  if(optiGlobalType.length!=0){

    for (var i = 0; i < optiGlobalType.length; i++) {
      text+=(i+1)+". ";
      switch (optiGlobalType[i]) {
          case 3:
            text+="Perceptual Uniformity";

              if(document.getElementById("id_EditPage_GlobalLinearReg").checked){
                // perceptual uniformity global linear reg,
                calcGlobalUniformityLinearRegOptimum();
                updateOptimizationCMS(optiGlobalDegree[i]);
              }
              else{
                // perceptual uniformity global graph,
                calcGlobalUniformityForcedGraphOptimum(optiGlobalDegree[i]);
                globalCMS1= cloneCMS(globalCMS1_Optimum);
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
                      globalCMS1= cloneCMS(globalCMS1_Optimum);
                      break;
                    case 2: //  Discriminative Power
                      text+="Discriminative Power";
                      calcDisPowerOptimum(true,optiGlobalDegree[i]);
                      globalCMS1= cloneCMS(globalCMS1_Optimum);
                      break;

      }
      text+="  (Degree: "+optiGlobalDegree[i]+");\n";
    }

  }

  document.getElementById("id_EditPage_OptimizationExOrderGlobal").innerHTML=text;

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
                    globalCMS1= cloneCMS(globalCMS1_Optimum);
                    break;
                    case 2: //  Discriminative Power
                      text+="Discriminative Power";
                      calcDisPowerOptimum(false,optiLocalDegree[i]);
                      globalCMS1= cloneCMS(globalCMS1_Optimum);
                      break;

      }
      text+="  (Degree: "+optiLocalDegree[i]+");\n";
    }
  }

  document.getElementById("id_EditPage_OptimizationExOrderLocal").innerHTML=text;

  updateEditPage();

  if(pathColorspace==="rgb"){
    drawcolormap_RGBSpace(true,true);
  }

}

function updateKeyIndex(){

  var startIndex = document.getElementById("id_editPage_Optimization_FromKey").selectedIndex;
  var endIndex = document.getElementById("id_editPage_Optimization_TillKey").selectedIndex;

  var options = document.getElementById("id_editPage_Optimization_FromKey").options;
  for (var i = 0; i < options.length; i++) {
    if(i<endIndex)
      options[i].disabled = false;
    else
      options[i].disabled = true;
  }

  options = document.getElementById("id_editPage_Optimization_TillKey").options;
  for (var i = 0; i < options.length; i++) {
    if(i>startIndex)
      options[i].disabled = false;
    else
      options[i].disabled = true;
  }


  calcOptiCMS();


}

function fillKeyCombobox(saveOldPosition){


  var tmpStartID = document.getElementById("id_editPage_Optimization_FromKey").selectedIndex;
  var tmpEndID = document.getElementById("id_editPage_Optimization_TillKey").selectedIndex;

    var selectbox = document.getElementById("id_editPage_Optimization_FromKey");
    for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }

    // fill startbox
    if(globalCMS1.getKeyLength()==0)
    return;


    for (var i = 1; i <= globalCMS1.getKeyLength(); i++) {

      var opt = document.createElement('option');
      opt.innerHTML = "Key "+i;
      opt.value = i;

      if(i == globalCMS1.getKeyLength()){
        opt.disabled = true;
      }

      selectbox.appendChild(opt);
    }
    document.getElementById("id_editPage_Optimization_FromKey").options[0].selected = true;
    ///////////////////////////////////////////////////////////////////////
    selectbox = document.getElementById("id_editPage_Optimization_TillKey");
    for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }

    for (var i = 1; i <= globalCMS1.getKeyLength(); i++) {

      var opt = document.createElement('option');
      opt.innerHTML = "Key "+i;
      opt.value = i;

      if(i == 1){
        opt.disabled = true;
      }

      selectbox.appendChild(opt);
    }
    document.getElementById("id_editPage_Optimization_TillKey").options[document.getElementById("id_editPage_Optimization_TillKey").options.length-1].selected = true;

    if(saveOldPosition && tmpStartID!=tmpEndID && tmpStartID>=0 && tmpEndID>=0 && tmpStartID<globalCMS1.getKeyLength() && tmpEndID<globalCMS1.getKeyLength()){
      document.getElementById("id_editPage_Optimization_FromKey").selectedIndex=tmpStartID;
      document.getElementById("id_editPage_Optimization_TillKey").selectedIndex=tmpEndID;
      updateKeyIndex();
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
        globalCMS1_Optimum.setLeftKeyColor(tmpKeyInfo[0],optiGraph.getNodeColor(i));
      break;
      case 1:
        globalCMS1_Optimum.setRightKeyColor(tmpKeyInfo[0],optiGraph.getNodeColor(i));
      break;
      case 2:
        globalCMS1_Optimum.setLeftKeyColor(tmpKeyInfo[0],optiGraph.getNodeColor(i));
        globalCMS1_Optimum.setRightKeyColor(tmpKeyInfo[0],optiGraph.getNodeColor(i));
      break;
    }
  }

  /////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////

  optiGraph.deleteReferences();
  optiGraph=undefined;
}
