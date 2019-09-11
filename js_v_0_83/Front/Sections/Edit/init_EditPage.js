

function init_events_EditPage(){


  var editCMSElement = document.getElementById('id_EditPage_CMSVisCanvas');
  editCMSElement.addEventListener("dragenter", cmsStructureOnEnter);
  editCMSElement.addEventListener("dragleave", cmsStructureOnLeave);
  //editCMSElement.addEventListener("drop dragdrop", createSide_cmsStructureOnDrop);
  editCMSElement.addEventListener("mousedown", editCMS_MouseDown);
  editCMSElement.addEventListener("mouseup", editCMS_MouseUp);
  editCMSElement.addEventListener("mousemove", editCMS_MouseMove);
  editCMSElement.addEventListener("mouseenter",editCMS_MouseEnter);
  editCMSElement.addEventListener("mouseleave",editCMS_MouseLeave);

  editCMSElement.ondrop = function(event) {
    event.preventDefault();
    cmsStructureOnDrop();
  }; // allow Drop

  editCMS_dragOver_LastKey = -1;
  editCMS_dragOver_DrawGlobalCMS = false;

  editCMSElement.addEventListener("dragover",cmsStructureDragOver);


  document.getElementById('id_EditPage_CMSName').addEventListener("change", updateColormapName);

  limitKeyBurLine=true;

  document.getElementById('id_EditPage_DataInfoButton').addEventListener("click", activateDropdown);
  document.getElementById('id_EditPage_editProbeFunctionLabel').addEventListener("click", activateDropdown);

  initPathPlot();

  document.getElementById('id_EditPage_PathPlot_3D_Div').addEventListener("mousemove", eventPathPlot3D_mousemove);
  document.getElementById('id_EditPage_PathPlot_3D_Div').addEventListener("mouseleave", eventPathPlot3D_mouseleave);
  document.getElementById('id_EditPage_PathPlot_3D_Div').addEventListener("mousedown", eventPathPlot3D_mousedown);
  document.getElementById('id_EditPage_PathPlot_3D_Div').addEventListener("mouseup", eventPathPlot3D_mouseup);

  // Edit Keys
    document.getElementById('id_EditPage_EditKey_List').addEventListener("click", selectKey);
    document.getElementById('id_editPage_BurKeyTrue').addEventListener("change", changeKeyBurStatus);
    document.getElementById('id_editPage_BurKeyFalse').addEventListener("change", changeKeyBurStatus);
    document.getElementById('id_EditPage_EditKey_SetReference').addEventListener("change", editPage_ChangeReference);

    document.getElementById('id_editPage_KeyTypeNil').addEventListener("change", changeKeyType);
    document.getElementById('id_editPage_KeyTypeTwin').addEventListener("change", changeKeyType);
    document.getElementById('id_editPage_KeyTypeLeft').addEventListener("change", changeKeyType);
    document.getElementById('id_editPage_KeyTypeRight').addEventListener("change", changeKeyType);
    document.getElementById('id_editPage_KeyTypeDual').addEventListener("change", changeKeyType);

    document.getElementById('id_EditPage_EditKey_DrawKeyDiv').addEventListener("mouseenter", showDrawnKeyHelp);
    document.getElementById('id_EditPage_EditKey_DrawKeyDiv').addEventListener("mouseleave", hideDrawnKeyHelp);

    // Path plots
    document.getElementById('id_EditPage_PathPlot_SingleCanvas_2').addEventListener("mouseleave", mouseLeaveColorspace);
    document.getElementById('id_EditPage_PathPlot_SingleCanvas_2').addEventListener("mousemove", mouseMoveColorspace);
    document.getElementById('id_EditPage_PathPlot_SingleCanvas_2').addEventListener("mousedown", mouseDownColorspace);
    document.getElementById('id_EditPage_PathPlot_SingleCanvas_2').addEventListener("mouseup", mouseUpColorspace);

    // Analyze
    document.getElementById("id_EditPage_SelectAnalyzePlot").selectedIndex=1;

    ////////////////////////////////////////
    // analyze
    document.getElementById('id_EditPage_AnalyzeSelect_LinearVisType').addEventListener("change", styleStructure_InterpolationSpaces);
    document.getElementById('id_EditPage_AnalyzeSelect_SketchVisType').addEventListener("change", styleStructure_InterpolationSpaces);


    //////////////////////////////////////////
    /// mapping
    document.getElementById('id_EditPage_DrawMappingDiv').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_EditPage_DrawMappingDiv').addEventListener("mousemove", eventMapping_mousemove);
    document.getElementById('id_EditPage_DrawMappingDiv').addEventListener("mouseleave", eventMapping_mouseleave);
    document.getElementById('id_EditPage_DrawMappingDiv').addEventListener("mouseenter", eventMapping_mouseenter);
    document.getElementById('id_EditPage_DrawMappingDiv').addEventListener("mousedown", eventMapping_mousedown);
    document.getElementById('id_EditPage_DrawMappingDiv').addEventListener("mouseup", eventMapping_mouseup);
    document.getElementById("id_EditPage_DrawMappingDiv").addEventListener("wheel", eventMapping_mousewheel);

    document.getElementById('id_PopUp_FullMappingDiv').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_PopUp_FullMappingDiv').addEventListener("mousemove", eventMapping_mousemove);
    document.getElementById('id_PopUp_FullMappingDiv').addEventListener("mouseleave", eventMapping_mouseleave);
    document.getElementById('id_PopUp_FullMappingDiv').addEventListener("mouseenter", eventMapping_mouseenter);
    document.getElementById('id_PopUp_FullMappingDiv').addEventListener("mousedown", eventMapping_mousedown);
    document.getElementById('id_PopUp_FullMappingDiv').addEventListener("mouseup", eventMapping_mouseup);
    document.getElementById("id_PopUp_FullMappingDiv").addEventListener("wheel", eventMapping_mousewheel);

    if (browserCanWorker) {
      document.getElementById('id_EditPage_Mapping_DoParallel').checked = true;
    } else {
      document.getElementById('id_EditPage_Mapping_DoParallel').checked = false;
      document.getElementById('id_EditPage_Mapping_DoParallel').disabled = true;
    }

    //document.getElementById('id_EditPage_Mapping_DoAutoUpdate').addEventListener("change", changeAutoUpdate);
    document.getElementById('id_EditPage_Mapping_ShowAxis').addEventListener("click", changeAxisVisibility);

    document.getElementById('id_EditPage_SelectMappingField').addEventListener("change", changeField);
    document.getElementById('id_EditPage_SelectMappingTimeStep').addEventListener("change", changeTimeStep);

    document.getElementById('id_EditPage_MappingBackground_Select').addEventListener("change", changeBackground);

    document.getElementById('id_EditPage_SelectTimeStepHistogram').addEventListener("click", updateHistogramChange);
    document.getElementById('id_EditPage_SelectFullDataHistogram').addEventListener("click", updateHistogramChange);

    document.getElementById('id_EditPage_NumberHistoRanges').addEventListener("keyup", updateHistogramKey);
    document.getElementById('id_EditPage_NumberHistoRanges').addEventListener("change", updateHistogramChange);

    document.getElementById('id_EditPage_MappingCMS_Select').onchange  = function(){ updateFieldValueColors(true)};

    /////////////////////////////////////////////////////
    /////////////// side options
    document.getElementById('id_editPage_ProbeSpace_Value').addEventListener("change", changeProbeSpace);
    document.getElementById('id_editPage_ProbeSpace_Lightness').addEventListener("change", changeProbeSpace);

    document.getElementById("id_inputCustomProbeRanges").addEventListener("change", checkKeyCustomRangeInput);
    document.getElementById("id_inputCustomProbeRanges").addEventListener("keyup", checkKeyCustomRangeInput);

    document.getElementById("id_probe_GenerationName").addEventListener("change", changeGenerationProbeName);

    document.getElementById("id_inputSingleProbeRangeStart").addEventListener("change", generateProbeSet);
    document.getElementById("id_inputSingleProbeRangeEnd").addEventListener("change", generateProbeSet);
    document.getElementById("id_inputProbeIntervalStart").addEventListener("change", generateProbeSet);
    document.getElementById("id_inputProbeIntervalLength").addEventListener("change", generateProbeSet);
    document.getElementById("id_inputProbeDistance").addEventListener("change", generateProbeSet);
    document.getElementById("id_inputNumberIntervalAuto").addEventListener("change", generateProbeSet);

    document.getElementById("id_selectProbeSetList").addEventListener("change", updateProbeSelectBox);
    document.getElementById("id_selectProbeList").addEventListener("change", selectProbe);
    document.getElementById("id_probe_EditProbeName").addEventListener("change", editPageChangeProbeSetName);


    document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").onchange = function (){
      updateAnalyzeCompareKeyIndex("id_EditPage_SelectFrom_GlobalLocalOrder","id_EditPage_SelectTill_GlobalLocalOrder");
    };

    document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").onchange = function (){
      updateAnalyzeCompareKeyIndex("id_EditPage_SelectFrom_GlobalLocalOrder","id_EditPage_SelectTill_GlobalLocalOrder");
    };

    document.getElementById("id_EditPage_InputFixedAxis_GlobalLocalOrder").addEventListener("change", updateAnalyze);
    document.getElementById("id_EditPage_DoFixedAxis_GlobalLocalOrder").addEventListener("change", updateAnalyze);
    document.getElementById("id_EditPage_DoLogSelect_GlobalLocalOrder").addEventListener("change", updateAnalyze);

    document.getElementById("id_EditPage_SelectAnalyzePlot").addEventListener("change", updateAnalyze);

    document.getElementById("id_editPage_Optimization_IntervalCalcInput").value = deltaSampling_Analyze;
    document.getElementById("id_editPage_Optimization_IntervalCalcInput").addEventListener("change", changeDeltaSampling);
    document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value = deltaSampling_Analyze;
    document.getElementById("id_editPage_Anaylze_IntervalCalcInput").addEventListener("change", changeDeltaSampling);


}
