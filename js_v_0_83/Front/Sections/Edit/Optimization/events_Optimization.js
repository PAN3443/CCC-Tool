
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
    selectedOptimizationType=0;
    updateOptimizationPage();
  }

}


function setOptimizationCombination(event){
  switch (event.target.id) {
    case "id_EditPage_LocalSpeedOptimization":
      selectedOptimizationType=0;
      break;
    case "id_EditPage_GlobalSpeedOptimization":
      selectedOptimizationType=1;
      break;
    case "id_EditPage_LocalLegendOrderOptimization":
      selectedOptimizationType=2;
      break;
    case "id_EditPage_GlobalLegendOrderOptimization":
      selectedOptimizationType=3;
      break;
    case "id_EditPage_IntrinsicOrderOptimization":
      selectedOptimizationType=4;
      break;
    case "id_EditPage_IntrinsicSmoothnessOptimization":
      selectedOptimizationType=5;
      break;
  }
  updateOptimizationPage();
}



function editCMSduringOptimizationMode(){
  globalCMS1_Original = cloneCMS(globalCMS1);
  updateOptimizationPage();
}

function updateOptimizationPage(){
  if(globalCMS1.getInterpolationSpace()==="rgb" || globalCMS1.getInterpolationSpace()==="hsv"){
    document.getElementById("id_EditPage_OptimizationWarning").style.display="flex";
    document.getElementById("id_EditPage_OptimizationSettings").style.display="none";
  }
  else {
    document.getElementById("id_EditPage_OptimizationWarning").style.display="none";
    document.getElementById("id_EditPage_OptimizationSettings").style.display="block";

    globalCMS1 = cloneCMS(globalCMS1_Original);
    optimization_StartKey = 0;
    optimization_EndKey = globalCMS1.getKeyLength()-1;

    document.getElementById("id_Optimization_UniformityDegree").value=0;
    document.getElementById("id_Optimization_OrderDegree").value=0;

    switch (selectedOptimizationType) {
      case 0:
        calcLocalUniformityOptimum(true);
      break;
      case 1:
        calcGlobalUniformityOptimum();
      break;
      case 2:
        calcLocalOrderOptimum();
      break;
    }
    updateCMSwithOptInfo();
  }

}


function updateCMSwithOptInfo(){

  globalCMS1 = cloneCMS(globalCMS1_Original);

  /////////////////////////////////////////////////////////////////////////
  //// Uniformity
  ///////////////////////////////////////////////////////////////////////

  switch (selectedOptimizationType) {
    case 0:
      var uniformity_degree = document.getElementById("id_Optimization_UniformityDegree").value;
      if(uniformity_degree>0){
        for (var i = optimization_StartKey+1; i < optimization_EndKey; i++) {

          var originalPos = globalCMS1_Original.getRefPosition(i);
          var optiPos = globalCMS_Uniform.getRefPosition(i);

          var dis = optiPos-originalPos;

          var newPosition = originalPos+(dis*uniformity_degree);

          globalCMS1.setRefPosition(i,newPosition);
        }
      }
    break;

    case 1:
      var uniformity_degree = document.getElementById("id_Optimization_UniformityDegree").value;


      ////////////////////////////////////////////////////////////////////////////
      //// Global optimization
      for (var i = optimization_StartKey; i <= optimization_EndKey; i++) {

        if(globalCMS1.getInterpolationSpace()!="lab" && globalCMS1.getInterpolationSpace()!="din99" && (i!=optimization_StartKey || i !=optimization_EndKey)){
            var originalPos = globalCMS1_Original.getRefPosition(i);
            var optiPos = globalCMS_Uniform.getRefPosition(i);

            var dis = optiPos-originalPos;

            var newPosition = originalPos+(dis*uniformity_degree);

            globalCMS1.setRefPosition(i,newPosition);
        }

        /////////////////////////////////////////////////////////////////
        ///// Left Color
        var original_LeftColor = globalCMS1_Original.getLeftKeyColor(i,globalCMS1_Original.getInterpolationSpace());
        var opti_LeftColor = globalCMS_Uniform.getLeftKeyColor(i,globalCMS1_Original.getInterpolationSpace());
        if(original_LeftColor!=undefined && opti_LeftColor!=undefined){
          if(!original_LeftColor.equalTo(opti_LeftColor)){
            var val1_dis = opti_LeftColor.get1Value()-original_LeftColor.get1Value();
            var val2_dis = opti_LeftColor.get2Value()-original_LeftColor.get2Value();
            var val3_dis = opti_LeftColor.get3Value()-original_LeftColor.get3Value();

            var newVal1 = original_LeftColor.get1Value()+(val1_dis*uniformity_degree);
            var newVal2 = original_LeftColor.get2Value()+(val2_dis*uniformity_degree);
            var newVal3 = original_LeftColor.get3Value()+(val3_dis*uniformity_degree);

            globalCMS1.setLeftKeyColor(i,createColor(newVal1,newVal2,newVal3,globalCMS1.getInterpolationSpace()));
          }

          original_LeftColor.deleteReferences();
          opti_LeftColor.deleteReferences();
          original_LeftColor=null;
          opti_LeftColor=null;
        }

        /////////////////////////////////////////////////////////////////
        ///// Right Color
        var original_RightColor = globalCMS1_Original.getRightKeyColor(i,globalCMS1_Original.getInterpolationSpace());
        var opti_RightColor = globalCMS_Uniform.getRightKeyColor(i,globalCMS1_Original.getInterpolationSpace());

        if(original_RightColor!=undefined && opti_RightColor!=undefined){
          if(!original_RightColor.equalTo(opti_RightColor)){
            var val1_dis = opti_RightColor.get1Value()-original_RightColor.get1Value();
            var val2_dis = opti_RightColor.get2Value()-original_RightColor.get2Value();
            var val3_dis = opti_RightColor.get3Value()-original_RightColor.get3Value();

            var newVal1 = original_RightColor.get1Value()+(val1_dis*uniformity_degree);
            var newVal2 = original_RightColor.get2Value()+(val2_dis*uniformity_degree);
            var newVal3 = original_RightColor.get3Value()+(val3_dis*uniformity_degree);

            globalCMS1.setRightKeyColor(i,createColor(newVal1,newVal2,newVal3,globalCMS1.getInterpolationSpace()));
          }

          original_RightColor.deleteReferences();
          opti_RightColor.deleteReferences();
          original_RightColor=null;
          opti_RightColor=null;
        }

      }
    break;

    case 2:
      var order_degree = document.getElementById("id_Optimization_OrderDegree").value;


      ////////////////////////////////////////////////////////////////////////////
      //// Global optimization
      for (var i = optimization_StartKey; i <= optimization_EndKey; i++) {

        /////////////////////////////////////////////////////////////////
        ///// Left Color
        var original_LeftColor = globalCMS1_Original.getLeftKeyColor(i,globalCMS1_Original.getInterpolationSpace());
        var opti_LeftColor = globalCMS_Order.getLeftKeyColor(i,globalCMS1_Original.getInterpolationSpace());
        if(original_LeftColor!=undefined && opti_LeftColor!=undefined){
          if(!original_LeftColor.equalTo(opti_LeftColor)){
            var val1_dis = opti_LeftColor.get1Value()-original_LeftColor.get1Value();
            var val2_dis = opti_LeftColor.get2Value()-original_LeftColor.get2Value();
            var val3_dis = opti_LeftColor.get3Value()-original_LeftColor.get3Value();

            var newVal1 = original_LeftColor.get1Value()+(val1_dis*order_degree);
            var newVal2 = original_LeftColor.get2Value()+(val2_dis*order_degree);
            var newVal3 = original_LeftColor.get3Value()+(val3_dis*order_degree);

            globalCMS1.setLeftKeyColor(i,createColor(newVal1,newVal2,newVal3,globalCMS1.getInterpolationSpace()));
          }

          original_LeftColor.deleteReferences();
          opti_LeftColor.deleteReferences();
          original_LeftColor=null;
          opti_LeftColor=null;
        }

        /////////////////////////////////////////////////////////////////
        ///// Right Color
        var original_RightColor = globalCMS1_Original.getRightKeyColor(i,globalCMS1_Original.getInterpolationSpace());
        var opti_RightColor = globalCMS_Order.getRightKeyColor(i,globalCMS1_Original.getInterpolationSpace());

        if(original_RightColor!=undefined && opti_RightColor!=undefined){
          if(!original_RightColor.equalTo(opti_RightColor)){
            var val1_dis = opti_RightColor.get1Value()-original_RightColor.get1Value();
            var val2_dis = opti_RightColor.get2Value()-original_RightColor.get2Value();
            var val3_dis = opti_RightColor.get3Value()-original_RightColor.get3Value();

            var newVal1 = original_RightColor.get1Value()+(val1_dis*order_degree);
            var newVal2 = original_RightColor.get2Value()+(val2_dis*order_degree);
            var newVal3 = original_RightColor.get3Value()+(val3_dis*order_degree);

            globalCMS1.setRightKeyColor(i,createColor(newVal1,newVal2,newVal3,globalCMS1.getInterpolationSpace()));
          }

          original_RightColor.deleteReferences();
          opti_RightColor.deleteReferences();
          original_RightColor=null;
          opti_RightColor=null;
        }

      }
    break;
  }

  //// Update Edit Page => Plots for Analysis, Visualization and Edit
  updateEditPage();

}
