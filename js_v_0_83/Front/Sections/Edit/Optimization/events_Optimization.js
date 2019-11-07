
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
    document.getElementById("optimization_Div").style.display = "block";


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
    document.getElementById("id_EditPage_LocalSpeedOptimization").checked = true;
    document.getElementById("id_EditPage_UniOpti_Check").checked=false;
    document.getElementById("id_EditPage_IntOrderOpti_Check").checked=false;
    document.getElementById("id_EditPage_LegOrderOpti_Check").checked=false;
    document.getElementById("id_EditPage_DisPowerOpti_Check").checked=false;

    fillKeyCombobox(false);
    updateOptiPageStyle();
    updateLegendOptiWarningArea();
  }
}

function editCMSduringOptimizationMode(){
  globalCMS1_Original = cloneCMS(globalCMS1);
  fillKeyCombobox(true);
  updateOptiPageStyle();
}

function updateOptiPageStyle(){

  /*if(globalCMS1.getInterpolationSpace()==="rgb" || globalCMS1.getInterpolationSpace()==="hsv"){
    document.getElementById("id_EditPage_OptimizationWarning").style.display="flex";
    document.getElementById("id_EditPage_OptimizationSettings").style.display="none";
  }
  else {*/
    document.getElementById("id_EditPage_OptimizationWarning").style.display="none";
    document.getElementById("id_EditPage_OptimizationSettings").style.display="block";
    //document.getElementById("id_Optimization_Degree").value=0;
    //updateOptiCMSDegree();
  //}

  if(document.getElementById("id_EditPage_UniOpti_Check").checked){
    document.getElementById("id_EditPage_UniOpti_Options").style.display="block";

    document.getElementById("id_EditPage_UniOpti_FixedDiv").style.display="none";
    document.getElementById("id_EditPage_UniOpti_GlobalTypesDiv").style.display="none";
    document.getElementById("id_EditPage_UniOpti_GraphSettings").style.display="none";

    if(document.getElementById("id_EditPage_GlobalSpeedOptimization").checked){
      document.getElementById("id_EditPage_UniOpti_GlobalTypesDiv").style.display="block";

      if(document.getElementById("id_EditPage_GlobalLinearReg").checked)
        document.getElementById("id_EditPage_UniOpti_FixedDiv").style.display="block";
      else
        document.getElementById("id_EditPage_UniOpti_GraphSettings").style.display="block";
    }
  }
  else {
    document.getElementById("id_EditPage_UniOpti_Options").style.display="none";
  }


  if(document.getElementById("id_EditPage_IntOrderOpti_Check").checked){
    document.getElementById("id_EditPage_IntOrderOpti_Options").style.display="block";
  }
  else {
    document.getElementById("id_EditPage_IntOrderOpti_Options").style.display="none";
  }

  if(document.getElementById("id_EditPage_LegOrderOpti_Check").checked){
    document.getElementById("id_EditPage_LegOrderOpti_Options").style.display="block";
  }
  else {
    document.getElementById("id_EditPage_LegOrderOpti_Options").style.display="none";
  }

  if(document.getElementById("id_EditPage_DisPowerOpti_Check").checked){
    document.getElementById("id_EditPage_DisPowerOpti_Options").style.display="block";
  }
  else {
    document.getElementById("id_EditPage_DisPowerOpti_Options").style.display="none";
  }

  calcOptiCMS();

}

function updateLegendOptiWarningArea(){

  if(globalCMS1.getKeyLength()<2)
    return;

  var deleteGraph=false;

  if(optiGraph==undefined){
    deleteGraph=true;
    createLegendBasedGraph();
  }

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

  ///////////////////////////////////////////////////////
  ///// Get important infos from the CMS

  //var smallesRefDis = Infinity;
  var smallesSpeedInOriginal = Infinity;
  smallesSpeedInOriginal = optiGraph.getMinSpeed();
  /*for (var i = 0; i < globalCMS1.getKeyLength()-1; i++) {
    //smallesRefDis = Math.min(smallesRefDis,Math.abs(globalCMS1.getRefPosition(i+1) - globalCMS1.getRefPosition(i)));

    if(document.getElementById("id_EditPage_LocalLegOrderOptimization").checked){
      var tmpDis = Math.abs(globalCMS1.getRefPosition(i+1) - globalCMS1.getRefPosition(i));
      if(globalCMS1.getKeyType(i)!="nil key" && globalCMS1.getKeyType(i)!="left key"){
        var tmpSpeed = undefined;
        switch (globalCMS1.getInterpolationSpace()) {
          case "de94":
          case "de94-ds":
            // smallesSpeedInOriginal=calcDeltaDE94(globalCMS1.getLeftKeyColor(i,globalCMS1.getInterpolationSpace()), globalCMS1.getRightKeyColor(i+1,globalCMS1.getInterpolationSpace()))/tmpDis;
            // break;
          case "de2000":
          case "de2000-ds":
            // smallesSpeedInOriginal=calcDeltaCIEDE2000(globalCMS1.getLeftKeyColor(i,globalCMS1.getInterpolationSpace()), globalCMS1.getRightKeyColor(i+1,globalCMS1.getInterpolationSpace()))/tmpDis;
            // break;
          case "lab":
          case "rgb":
          case "hsv":
          case "din99":
          case "lch":
              tmpSpeed=calc3DEuclideanDistance(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()), globalCMS1.getLeftKeyColor(i+1,globalCMS1.getInterpolationSpace()))/tmpDis;
            break;
          default:
        }
        smallesSpeedInOriginal=Math.min(smallesSpeedInOriginal,tmpSpeed)
      }
    }
    else{
      for (var j = i+1; j < globalCMS1.getKeyLength(); j++) {
        var tmpDis = Math.abs(globalCMS1.getRefPosition(j) - globalCMS1.getRefPosition(i));
        if(globalCMS1.getKeyType(i)!="nil key" && globalCMS1.getKeyType(i)!="left key"){
          var tmpSpeed = undefined;
          switch (globalCMS1.getInterpolationSpace()) {
            case "de94":
            case "de94-ds":
              // smallesSpeedInOriginal=calcDeltaDE94(globalCMS1.getLeftKeyColor(i,globalCMS1.getInterpolationSpace()), globalCMS1.getRightKeyColor(i+1,globalCMS1.getInterpolationSpace()))/tmpDis;
              // break;
            case "de2000":
            case "de2000-ds":
              // smallesSpeedInOriginal=calcDeltaCIEDE2000(globalCMS1.getLeftKeyColor(i,globalCMS1.getInterpolationSpace()), globalCMS1.getRightKeyColor(i+1,globalCMS1.getInterpolationSpace()))/tmpDis;
              // break;
            case "lab":
            case "rgb":
            case "hsv":
            case "din99":
            case "lch":
                tmpSpeed=calc3DEuclideanDistance(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()), globalCMS1.getLeftKeyColor(j,globalCMS1.getInterpolationSpace()))/tmpDis;
              break;
            default:
          }
          smallesSpeedInOriginal=Math.min(smallesSpeedInOriginal,tmpSpeed)
        }
      }
    }

  }//*/

  ///////////////////////////////////////////////////////
  ///// Not Noticeable Area
  var smallestNoticeable = smallestNoticeableDelta/distance; // smallesRefDis; smallest distance was an old idea.
  var smallestNoticeableArea = smallestNoticeable/blackWhiteSpeed;

  legOrderNoticeableBorder = smallestNoticeableArea;
  document.getElementById("id_EditPage_LegOrderOpti_NotNoticeableArea").style.width=smallestNoticeableArea*100+"%";

  ///////////////////////////////////////////////////////
  ///// No Change Area
  var remainingNoChange=undefined;
  if(smallesSpeedInOriginal != Infinity && smallesSpeedInOriginal>smallestNoticeable){
    var smallestSpeedPos = smallesSpeedInOriginal/blackWhiteSpeed;
    remainingNoChange = smallestSpeedPos-smallestNoticeableArea;
    document.getElementById("id_EditPage_LegOrderOpti_NoChangeArea").style.width=remainingNoChange*100+"%";
    document.getElementById("id_EditPage_LegOrderOpti_Info").style.visibility="visible";
  }
  else {
    ///////////////////////////////////////////////////////
    ///// Fitable Area
    remainingNoChange=0;
    document.getElementById("id_EditPage_LegOrderOpti_NoChangeArea").style.width=0+"%";
    document.getElementById("id_EditPage_LegOrderOpti_Info").style.visibility="hidden";
  }

  var remainingFitable = 1.0-smallestNoticeableArea-remainingNoChange;
  document.getElementById("id_EditPage_LegOrderOpti_OkayArea").style.width=remainingFitable*100+"%";


  ///////////////////////////////////////////////////////
  ///// Above Area
  //var remainingNotFitable = 1.0-remainingFitable;
  //document.getElementById("id_EditPage_LegOrderOpti_NotFitableArea").style.width=(remainingNotFitable*100)+"%";


  if(deleteGraph){
    optiGraph.deleteReferences();
  }
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

  var optitype = [];
  var optiDegree = [];
  var usedSpeedForcGraphv= false;

  if(document.getElementById("id_EditPage_IntOrderOpti_Check").checked){
      var inserted = false;
      var degree = document.getElementById("id_EditPage_IntOrderOpti_Degree").value;
      var type = undefined;

      if(document.getElementById("id_EditPage_LocalIntOrderOptimization").checked)
        type=3;
      else
        type=4;

      if(degree!=0){
        for (var i = 0; i < optiDegree.length; i++) {
          if(degree<optiDegree[i]){
            optitype.splice(i, 0,type);
            optiDegree.splice(i, 0,degree);
            inserted=true;
            break;
          }
        }

        if(!inserted){
          optitype.push(type);
          optiDegree.push(degree);
        }
      }


  }

  if(document.getElementById("id_EditPage_LegOrderOpti_Check").checked){
    createLegendBasedGraph(); // create Graph here because we need the information for the warning area
    updateLegendOptiWarningArea();
    var inserted = false;
    var degree = document.getElementById("id_EditPage_LegOrderOpti_Degree").value;

    if(degree<legOrderNoticeableBorder){
      document.getElementById("id_EditPage_LegOrderOpti_Warning").style.visibility="visible";
    }
    else {
      document.getElementById("id_EditPage_LegOrderOpti_Warning").style.visibility="hidden";
    }

    var type = undefined;

    if(document.getElementById("id_EditPage_LocalLegOrderOptimization").checked)
      type=5;
    else
      type=6;

    usedSpeedForcGraphv=true;

    if(degree!=0){
    for (var i = 0; i < optiDegree.length; i++) {
      if(degree<optiDegree[i]){
        optitype.splice(i, 0,type);
        optiDegree.splice(i, 0,degree);
        inserted=true;
        break;
      }
    }

    if(!inserted){
      optitype.push(type);
      optiDegree.push(degree);
    }
  }

  }

  if(document.getElementById("id_EditPage_DisPowerOpti_Check").checked){
    var inserted = false;
    var degree = document.getElementById("id_EditPage_DisPowerOpti_Degree").value;
    var type = 7;

    if(degree!=0){
    for (var i = 0; i < optiDegree.length; i++) {
      if(degree<optiDegree[i]){
        optitype.splice(i, 0,type);
        optiDegree.splice(i, 0,degree);
        inserted=true;
        break;
      }
    }

    if(!inserted){
      optitype.push(type);
      optiDegree.push(degree);
    }
  }

  }

  // local uniformity only affects the forced speed graph => if we do force speed graph the order depends on the degree, if not local perceptual optimization is alway the last!
  if(document.getElementById("id_EditPage_UniOpti_Check").checked){
      var degree = document.getElementById("id_EditPage_UniOpti_Degree").value;
      var type = undefined;

      if(document.getElementById("id_EditPage_GlobalSpeedOptimization").checked){
        if(document.getElementById("id_EditPage_GlobalLinearReg").checked)
          type = 1;
        else
          type = 2;
      }
      else
        type = 0;

      if(degree!=0){
      if(type==0 && !usedSpeedForcGraphv){
        optitype.push(type);
        optiDegree.push(degree);
      }
      else{
        var inserted = false;
        for (var i = 0; i < optiDegree.length; i++) {
          if(degree<optiDegree[i]){
            optitype.splice(i, 0,type);
            optiDegree.splice(i, 0,degree);
            inserted=true;
            break;
          }
        }

        if(!inserted){
          optitype.push(type);
          optiDegree.push(degree);
        }
      }
    }

  }


  if(optitype.length!=0){
    document.getElementById("id_EditPage_OptimizationExOrder").style.display="block";
    var text = "Execute Order:".bold()+"\n";

    for (var i = 0; i < optitype.length; i++) {
      text+=(i+1)+". ";
      switch (optitype[i]) {
        case 0: // perceptual uniformity local
          text+="Local Perceptual Uniformity";
          calcLocalUniformityOptimum();
          updateOptimizationCMS(optiDegree[i]);
          break;
          case 1: // perceptual uniformity global linear reg,
            text+="Global Perceptual Uniformity Linear Regression";
              calcGlobalUniformityLinearRegOptimum();
              updateOptimizationCMS(optiDegree[i]);
            break;
            case 2: // perceptual uniformity global graph,
              text+="Global Perceptual Uniformity Forced Graph";
              calcGlobalUniformityForcedGraphOptimum(optiDegree[i]);
              globalCMS1= cloneCMS(globalCMS1_Optimum);
              break;
              case 3: //  Intrinsic Order local
                text+="Local Intrinsic Order";
                calcLocalIntOrderOptimum();
                updateOptimizationCMS(optiDegree[i]);
                break;
                case 4: //  Intrinsic Order global
                  text+="Global Intrinsic Order";
                  calcGlobalIntOrderOptimum();
                  updateOptimizationCMS(optiDegree[i]);
                  break;
                  case 5: //  Legendbased Order
                    text+="Local Legendbased Order";
                    calcLegOrderOptimum(false,optiDegree[i]);
                    globalCMS1= cloneCMS(globalCMS1_Optimum);
                    break;
                    case 6: //  Legendbased Order
                      text+="Global Legendbased Order";
                      calcLegOrderOptimum(true,optiDegree[i]);
                      globalCMS1= cloneCMS(globalCMS1_Optimum);
                      break;
                    case 7: //  Discriminative Power
                      text+="Discriminative Power";
                      calcDisPowerOptimum(optiDegree[i]);
                      globalCMS1= cloneCMS(globalCMS1_Optimum);
                      break;

      }
      text+="  (Degree: "+optiDegree[i]+");\n";
      document.getElementById("id_EditPage_OptimizationExOrder").innerHTML=text;

    }



  }
  else{
    document.getElementById("id_EditPage_OptimizationExOrder").style.display="none";
  }

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
