window.onload = function() {

  document.onkeydown = keyDownDocumentHandler;
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// GLOBAL /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  if (typeof (Worker) === undefined)
  browserCanWorker=false;
  else
  browserCanWorker=true;

  globalCMS1 = new class_CMS();
  globalCMS2 = new class_CMS();

  document.getElementById("editSide_Radiobutton_PickerRG_B").checked=true;
  document.getElementById("bandCreator_Radiobutton_PickerRG_B").checked=true;
  colorpickerType="RG_B";

  document.getElementById('id_creatorPage').style.display = "none";
  document.getElementById('id_comparePage').style.display = "none";
  document.getElementById('id_analysisPage').style.display = "none";
  document.getElementById('id_tutorialPage').style.display = "none";

  document.getElementById('id_inputCMSData').addEventListener("change", readCMSFile);
  document.getElementById('id_inputSessionData').addEventListener("change", readSessionFile);
  document.getElementById('id_inputData').addEventListener("change", readDataFile);

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Setting Side /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  document.getElementById("id_cielab_refX_Input").addEventListener("keyup", checkSettingInputKey);
  document.getElementById("id_cielab_refY_Input").addEventListener("keyup", checkSettingInputKey);
  document.getElementById("id_cielab_refZ_Input").addEventListener("keyup", checkSettingInputKey);
  document.getElementById("id_din99_k_E_Input").addEventListener("keyup", checkSettingInputKey);
  document.getElementById("id_din99_k_CH_Input").addEventListener("keyup", checkSettingInputKey);
  document.getElementById("id_de94_k_L_Input").addEventListener("keyup", checkSettingInputKey);
  document.getElementById("id_de94_k_C_Input").addEventListener("keyup", checkSettingInputKey);
  document.getElementById("id_de94_k_H_Input").addEventListener("keyup", checkSettingInputKey);
  document.getElementById("id_de94_k_1_Input").addEventListener("keyup", checkSettingInputKey);
  document.getElementById("id_de94_k_2_Input").addEventListener("keyup", checkSettingInputKey);
  document.getElementById("id_de2000_k_L_Input").addEventListener("keyup", checkSettingInputKey);
  document.getElementById("id_de2000_k_C_Input").addEventListener("keyup", checkSettingInputKey);
  document.getElementById("id_de2000_k_H_Input").addEventListener("keyup", checkSettingInputKey);

  document.getElementById("id_cielab_refX_Input").addEventListener("change", checkSettingInputChange);
  document.getElementById("id_cielab_refY_Input").addEventListener("change", checkSettingInputChange);
  document.getElementById("id_cielab_refZ_Input").addEventListener("change", checkSettingInputChange);
  document.getElementById("id_din99_k_E_Input").addEventListener("change", checkSettingInputChange);
  document.getElementById("id_din99_k_CH_Input").addEventListener("change", checkSettingInputChange);
  document.getElementById("id_de94_k_L_Input").addEventListener("change", checkSettingInputChange);
  document.getElementById("id_de94_k_C_Input").addEventListener("change", checkSettingInputChange);
  document.getElementById("id_de94_k_H_Input").addEventListener("change", checkSettingInputChange);
  document.getElementById("id_de94_k_1_Input").addEventListener("change", checkSettingInputChange);
  document.getElementById("id_de94_k_2_Input").addEventListener("change", checkSettingInputChange);
  document.getElementById("id_de2000_k_L_Input").addEventListener("change", checkSettingInputChange);
  document.getElementById("id_de2000_k_C_Input").addEventListener("change", checkSettingInputChange);
  document.getElementById("id_de2000_k_H_Input").addEventListener("change", checkSettingInputChange);

  updateAllSetting();

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Add Side /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  document.getElementById('id_expandYellowDiv').addEventListener("click", expandAddColormapDivs);
  document.getElementById('id_expandRedPurpleDiv').addEventListener("click", expandAddColormapDivs);
  document.getElementById('id_expandBlueDiv').addEventListener("click", expandAddColormapDivs);
  document.getElementById('id_expandGreenDiv').addEventListener("click", expandAddColormapDivs);
  document.getElementById('id_expandBrownDiv').addEventListener("click", expandAddColormapDivs);
  document.getElementById('id_expandDivergentDiv').addEventListener("click", expandAddColormapDivs);
  document.getElementById('id_expandComplexThreeDiv').addEventListener("click", expandAddColormapDivs);
  document.getElementById('id_expandComplexFourDiv').addEventListener("click", expandAddColormapDivs);
  document.getElementById('addCMS_ShowHelp').addEventListener("mouseenter", showAddCMSHelp);
  document.getElementById('addCMS_ShowHelp').addEventListener("mouseleave", hideAddCMSHelp);

  document.getElementById('buttonShowMyDesignsPreview').addEventListener("mouseenter", showMyDesingsPreview);
  document.getElementById('buttonShowMyDesignsPreview').addEventListener("mouseleave", hideMyDesingsPreview);

  var colormapPath = pathColormaps+folderYellow+fileYellowColormaps[0];
  var tmpMap  = xmlColormapParserPath(colormapPath);
  drawCanvasColormap( "canvasPreviewYellow", existingMap_resolution_X,  existingMap_resolution_Y, tmpMap);
  colormapPath = pathColormaps+folderRedPurple+fileRedPurpleColormaps[0];
  tmpMap  = xmlColormapParserPath(colormapPath);
  drawCanvasColormap( "canvasPreviewRed", existingMap_resolution_X,  existingMap_resolution_Y, tmpMap);
  colormapPath = pathColormaps+folderBlue+fileBlueColormaps[0];
  tmpMap  = xmlColormapParserPath(colormapPath);
  drawCanvasColormap( "canvasPreviewBlue", existingMap_resolution_X,  existingMap_resolution_Y, tmpMap);
  colormapPath = pathColormaps+folderGreen+fileGreenColormaps[0];
  tmpMap  = xmlColormapParserPath(colormapPath);
  drawCanvasColormap( "canvasPreviewGreen", existingMap_resolution_X,  existingMap_resolution_Y, tmpMap);
  colormapPath = pathColormaps+folderBrown+fileBrownColormaps[0];
  tmpMap  = xmlColormapParserPath(colormapPath);
  drawCanvasColormap( "canvasPreviewBrown", existingMap_resolution_X,  existingMap_resolution_Y, tmpMap);
  colormapPath = pathColormaps+folderDivergent+fileDivergentColormaps[0];
  tmpMap  = xmlColormapParserPath(colormapPath);
  drawCanvasColormap("canvasPreviewDivergent", existingMap_resolution_X,  existingMap_resolution_Y, tmpMap);

  colormapPath = pathColormaps+folderThreeBand+fileThreeBandColormaps[0];
  tmpMap  = xmlColormapParserPath(colormapPath);
  drawCanvasColormap("canvasPreviewComplexThree", existingMap_resolution_X,  existingMap_resolution_Y, tmpMap);

  colormapPath = pathColormaps+folderFourBand+fileFourBandColormaps[0];
  tmpMap  = xmlColormapParserPath(colormapPath);
  drawCanvasColormap("canvasPreviewComplexFour", existingMap_resolution_X, existingMap_resolution_Y, tmpMap);


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Edit Side /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  document.getElementById('id_editPageScalarInput').addEventListener("change", editPage_ChangeScalar);
  document.getElementById('id_editPageScalarInput').addEventListener("keyup", editPage_CheckScalar);

  document.getElementById('editSide_Radiobutton_KeyTypeNil').addEventListener("change", changeKeyType);
  document.getElementById('editSide_Radiobutton_KeyTypeTwin').addEventListener("change", changeKeyType);
  document.getElementById('editSide_Radiobutton_KeyTypeLeft').addEventListener("change", changeKeyType);
  document.getElementById('editSide_Radiobutton_KeyTypeRight').addEventListener("change", changeKeyType);
  document.getElementById('editSide_Radiobutton_KeyTypeDual').addEventListener("change", changeKeyType);

  document.getElementById('editSide_Radiobutton_PickerRG_B').addEventListener("change", changeColorpickerType);
  document.getElementById('editSide_Radiobutton_PickerRB_G').addEventListener("change", changeColorpickerType);
  document.getElementById('editSide_Radiobutton_PickerGB_R').addEventListener("change", changeColorpickerType);
  document.getElementById('editSide_Radiobutton_PickerHS_V').addEventListener("change", changeColorpickerType);
  document.getElementById('editSide_Radiobutton_PickerHV_S').addEventListener("change", changeColorpickerType);
  document.getElementById('editSide_Radiobutton_PickerSV_H').addEventListener("change", changeColorpickerType);

  document.getElementById('editPage_canvasPicker').addEventListener("mousemove", event_colorpicker_MouseMove);
  document.getElementById('editPage_canvasPicker').addEventListener("click", event_colorpicker_MouseClick);
  document.getElementById('editPage_canvasPicker2').addEventListener("mousemove", event_colorpicker_MouseMove);
  document.getElementById('editPage_canvasPicker2').addEventListener("click", event_colorpicker_MouseClick);

  document.getElementById('id_EditPage_ConfirmButton').addEventListener("click", editPageConfirmColor);

  document.getElementById('editSide_Radiobutton_SelectColor1').addEventListener("change", colorChange);
  document.getElementById('editSide_Radiobutton_SelectColor2').addEventListener("change", colorChange);

  document.getElementById('id_editPageC1RInput').addEventListener("keyup", checkColorInputFieldsKey);
    document.getElementById('id_editPageC1GInput').addEventListener("keyup", checkColorInputFieldsKey);
      document.getElementById('id_editPageC1BInput').addEventListener("keyup", checkColorInputFieldsKey);
        document.getElementById('id_editPageC2RInput').addEventListener("keyup", checkColorInputFieldsKey);
          document.getElementById('id_editPageC2GInput').addEventListener("keyup", checkColorInputFieldsKey);
            document.getElementById('id_editPageC2BInput').addEventListener("keyup", checkColorInputFieldsKey);
              document.getElementById('id_editPageC1HInput').addEventListener("keyup", checkColorInputFieldsKey);
                document.getElementById('id_editPageC2HInput').addEventListener("keyup", checkColorInputFieldsKey);
                  document.getElementById('id_editPageC1SInput').addEventListener("keyup", checkColorInputFieldsKey);
                    document.getElementById('id_editPageC1VInput').addEventListener("keyup", checkColorInputFieldsKey);
                      document.getElementById('id_editPageC2SInput').addEventListener("keyup", checkColorInputFieldsKey);
                        document.getElementById('id_editPageC2VInput').addEventListener("keyup", checkColorInputFieldsKey);

                        document.getElementById('id_editPageC1RInput').addEventListener("change", checkColorInputFieldsChange);
                          document.getElementById('id_editPageC1GInput').addEventListener("change", checkColorInputFieldsChange);
                            document.getElementById('id_editPageC1BInput').addEventListener("change", checkColorInputFieldsChange);
                              document.getElementById('id_editPageC2RInput').addEventListener("change", checkColorInputFieldsChange);
                                document.getElementById('id_editPageC2GInput').addEventListener("change", checkColorInputFieldsChange);
                                  document.getElementById('id_editPageC2BInput').addEventListener("change", checkColorInputFieldsChange);
                                    document.getElementById('id_editPageC1HInput').addEventListener("change", checkColorInputFieldsChange);
                                      document.getElementById('id_editPageC2HInput').addEventListener("change", checkColorInputFieldsChange);
                                        document.getElementById('id_editPageC1SInput').addEventListener("change", checkColorInputFieldsChange);
                                          document.getElementById('id_editPageC1VInput').addEventListener("change", checkColorInputFieldsChange);
                                            document.getElementById('id_editPageC2SInput').addEventListener("change", checkColorInputFieldsChange);
                                              document.getElementById('id_editPageC2VInput').addEventListener("change", checkColorInputFieldsChange);


  document.getElementById('editSide_Radiobutton_MiddleOfTripleColor1').addEventListener("change", motChange);
  document.getElementById('editSide_Radiobutton_MiddleOfTripleColor2').addEventListener("change", motChange);

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Create Side  Mapping/////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  document.getElementById('showHideMappingOptionsText').style.background = styleActiveColor;
  document.getElementById('showHideMappingHistogramText').style.background = styleActiveColor;
  document.getElementById('showHideMappingVisualizationText').style.background = styleActiveColor;


  //document.getElementById("mappingProcessBar").style.background=styleActiveColor;
  document.getElementById("mappingProcessBar").style.color=styleActiveColor;



  if(browserCanWorker){
    document.getElementById('mapping_checkMultiThread').checked = true;
  }
  else{
    document.getElementById('mapping_checkMultiThread').checked = false;
    document.getElementById('mapping_checkMultiThread').disabled = true;
  }

  document.getElementById('mapping_checkAutoUpdate').addEventListener("change", changeAutoUpdate);
  document.getElementById('mapping_showAxes').addEventListener("change", changeAxisVisibility);

  document.getElementById('combobox_selectField').addEventListener("change", changeField);
  document.getElementById('combobox_selectTimeStep').addEventListener("change", changeTimeStep);

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Create Side /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////


  var sketchElement = document.getElementById('id_colormapSketch');
  sketchElement.addEventListener("dragenter", bandOnEnter);
  sketchElement.addEventListener("dragleave", bandOnLeave);
  //sketchElement.addEventListener("drop dragdrop", createSide_BandOnDrop);

  sketchElement.addEventListener("mousemove", sketch_MouseMove);
  sketchElement.addEventListener("click", sketch_MouseClick);

  sketchElement.ondrop = function(event) {
    event.preventDefault();
    bandOnDrop();
  }; // allow Drop


  sketchElement.ondragover = function(event) {
    event.preventDefault();

    event = event || window.event;
    //var dragX = event.pageX, dragY = event.pageY;

    var rect = event.target.getBoundingClientRect();
    var canvasPosX = event.clientX - rect.left;
    //var canvasPosY = event.clientY - rect.top;
    var ratioToColorspaceResolutionX = event.target.width / rect.width;
    //var ratioToColorspaceResolutionY = event.target.height / rect.height;
    mousePosX = canvasPosX * ratioToColorspaceResolutionX;
    //mousePosY = canvasPosY * ratioToColorspaceResolutionY;

    if(globalCMS1.getKeyLength()==0){
      indexOfDroppedPlace=0;
      return;
    }

    for (var i = 0; i < dropRects.length; i++) {
      if(mousePosX>=dropRects[i] && mousePosX<=dropRects[i]+bandSketchObjLength){
        if(indexOfDroppedPlace!=i){
          indexOfDroppedPlace=i;
          drawBandSketch(globalCMS1,"id_colormapSketch","id_createColormapKeys","id_colormapSketch_Ref", true, i);
        }
        return;
      }
    }
    indexOfDroppedPlace=-1;

  }; // allow Drop

  // Band Creator
  document.getElementById('bandCreator_Radiobutton_PickerRG_B').addEventListener("change", changeColorpickerType);
  document.getElementById('bandCreator_Radiobutton_PickerRB_G').addEventListener("change", changeColorpickerType);
  document.getElementById('bandCreator_Radiobutton_PickerGB_R').addEventListener("change", changeColorpickerType);
  document.getElementById('bandCreator_Radiobutton_PickerHS_V').addEventListener("change", changeColorpickerType);
  document.getElementById('bandCreator_Radiobutton_PickerHV_S').addEventListener("change", changeColorpickerType);
  document.getElementById('bandCreator_Radiobutton_PickerSV_H').addEventListener("change", changeColorpickerType);

  document.getElementById('bandCreator_Radiobutton_SelectColor1').addEventListener("change", colorChange);
  document.getElementById('bandCreator_Radiobutton_SelectColor2').addEventListener("change", colorChange);

  document.getElementById('id_bandCreatorC1RInput').addEventListener("keyup", checkColorInputFieldsKey);
    document.getElementById('id_bandCreatorC1GInput').addEventListener("keyup", checkColorInputFieldsKey);
      document.getElementById('id_bandCreatorC1BInput').addEventListener("keyup", checkColorInputFieldsKey);
        document.getElementById('id_bandCreatorC2RInput').addEventListener("keyup", checkColorInputFieldsKey);
          document.getElementById('id_bandCreatorC2GInput').addEventListener("keyup", checkColorInputFieldsKey);
            document.getElementById('id_bandCreatorC2BInput').addEventListener("keyup", checkColorInputFieldsKey);
              document.getElementById('id_bandCreatorC1HInput').addEventListener("keyup", checkColorInputFieldsKey);
                document.getElementById('id_bandCreatorC2HInput').addEventListener("keyup", checkColorInputFieldsKey);
                  document.getElementById('id_bandCreatorC1SInput').addEventListener("keyup", checkColorInputFieldsKey);
                    document.getElementById('id_bandCreatorC1VInput').addEventListener("keyup", checkColorInputFieldsKey);
                      document.getElementById('id_bandCreatorC2SInput').addEventListener("keyup", checkColorInputFieldsKey);
                        document.getElementById('id_bandCreatorC2VInput').addEventListener("keyup", checkColorInputFieldsKey);

                        document.getElementById('id_bandCreatorC1RInput').addEventListener("change", checkColorInputFieldsChange);
                          document.getElementById('id_bandCreatorC1GInput').addEventListener("change", checkColorInputFieldsChange);
                            document.getElementById('id_bandCreatorC1BInput').addEventListener("change", checkColorInputFieldsChange);
                              document.getElementById('id_bandCreatorC2RInput').addEventListener("change", checkColorInputFieldsChange);
                                document.getElementById('id_bandCreatorC2GInput').addEventListener("change", checkColorInputFieldsChange);
                                  document.getElementById('id_bandCreatorC2BInput').addEventListener("change", checkColorInputFieldsChange);
                                    document.getElementById('id_bandCreatorC1HInput').addEventListener("change", checkColorInputFieldsChange);
                                      document.getElementById('id_bandCreatorC2HInput').addEventListener("change", checkColorInputFieldsChange);
                                        document.getElementById('id_bandCreatorC1SInput').addEventListener("change", checkColorInputFieldsChange);
                                          document.getElementById('id_bandCreatorC1VInput').addEventListener("change", checkColorInputFieldsChange);
                                            document.getElementById('id_bandCreatorC2SInput').addEventListener("change", checkColorInputFieldsChange);
                                              document.getElementById('id_bandCreatorC2VInput').addEventListener("change", checkColorInputFieldsChange);

                                              document.getElementById('bandCreator_canvasPicker').addEventListener("mousemove", event_colorpicker_MouseMove);
                                              document.getElementById('bandCreator_canvasPicker').addEventListener("click", event_colorpicker_MouseClick);
                                              document.getElementById('bandCreator_canvasPicker2').addEventListener("mousemove", event_colorpicker_MouseMove);
                                              document.getElementById('bandCreator_canvasPicker2').addEventListener("click", event_colorpicker_MouseClick);



  // Ref Change Key Rects
  document.getElementById('id_keyColormap').addEventListener("mouseenter", mouseEnterKeyRef);
  document.getElementById('id_keyColormap').addEventListener("mouseleave", mouseLeaveKeyRef);
  document.getElementById('id_keyColormap').addEventListener("mousemove", mouseMoveKeyRef);
  document.getElementById('id_keyColormap').addEventListener("mousedown", mouseDownKeyRef);
  document.getElementById('id_keyColormap').addEventListener("mouseup", mouseUpKeyRef);



  ////
  // Creat Colormap Menue
  // Colormap Name Change
  document.getElementById('id_InputMapName').addEventListener("change", colormapNameChange);
  document.getElementById('id_InputMapName').addEventListener("keyup", colormapNameChangeEnter);

  document.getElementById('id_buttonDeleteCreateColormap').addEventListener("click", deleteCreatedColormap);
  document.getElementById('id_buttonBackwardCreateColormap').addEventListener("click", backwardColormapProcess);
  document.getElementById('id_buttonForwardCreateColormap').addEventListener("click", forwardColormapProcess);
  document.getElementById('id_buttonSaveCreateColormap').addEventListener("click", saveColormapToList);
  document.getElementById('id_buttonLoadCreateColormap').addEventListener("click", loadColormapCreateSide);

  document.getElementById('id_buttonHelpCreateColormap').addEventListener("mouseleave", createPage_hideHelp);
  document.getElementById('id_buttonHelpCreateColormap').addEventListener("mouseenter", createPage_showHelp);

  // Edit Path

  document.getElementById('id_ModiyCourseHueTop').addEventListener("mouseleave", mouseLeaveColorspace);
  document.getElementById('id_ModiyCourseHueTop').addEventListener("mousemove", mouseMoveColorspace);
  document.getElementById('id_ModiyCourseHueTop').addEventListener("mousedown", mouseDownColorspace);
  document.getElementById('id_ModiyCourseHueTop').addEventListener("mouseup", mouseUpColorspace);

  document.getElementById('id_ModifyValue3Top').addEventListener("mouseleave", mouseLeaveValuePlot);
  document.getElementById('id_ModifyValue3Top').addEventListener("mousemove", mouseMoveValuePlot);
  document.getElementById('id_ModifyValue3Top').addEventListener("mousedown", mouseDownValuePlot);
  document.getElementById('id_ModifyValue3Top').addEventListener("mouseup", mouseUpColorspace);

  document.getElementById('id_ModifyValue2Top').addEventListener("mouseleave", mouseLeaveValuePlot);
  document.getElementById('id_ModifyValue2Top').addEventListener("mousemove", mouseMoveValuePlot);
  document.getElementById('id_ModifyValue2Top').addEventListener("mousedown", mouseDownValuePlot);
  document.getElementById('id_ModifyValue2Top').addEventListener("mouseup", mouseUpColorspace);

  document.getElementById('id_ModifyValue1Top').addEventListener("mouseleave", mouseLeaveValuePlot);
  document.getElementById('id_ModifyValue1Top').addEventListener("mousemove", mouseMoveValuePlot);
  document.getElementById('id_ModifyValue1Top').addEventListener("mousedown", mouseDownValuePlot);
  document.getElementById('id_ModifyValue1Top').addEventListener("mouseup", mouseUpColorspace);

  document.getElementById('id_canvasRGModiyTop').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_canvasRGModiyTop').addEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_canvasRGModiyTop').addEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_canvasRGModiyTop').addEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_canvasRBModiyTop').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_canvasRBModiyTop').addEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_canvasRBModiyTop').addEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_canvasRBModiyTop').addEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_canvasBGModiyTop').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_canvasBGModiyTop').addEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_canvasBGModiyTop').addEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_canvasBGModiyTop').addEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_setValueRange').addEventListener("change", changeValueRange);
  document.getElementById('id_checkboxRGB').addEventListener("change", modifyColormapRGBPossible);

  document.getElementById('id_rgb3DModiy').addEventListener("mousemove", eventRGB3D_mousemove);
  document.getElementById('id_rgb3DModiy').addEventListener("mouseleave", eventRGB3D_mouseleave);
  document.getElementById('id_rgb3DModiy').addEventListener("mousedown", eventRGB3D_mousedown);
  document.getElementById('id_rgb3DModiy').addEventListener("mouseup", eventRGB3D_mouseup);

  document.getElementById('id_setOpacityRangeModiy').addEventListener("change", changeOpacityRange);



  ///// Color Mapping
  document.getElementById('mappingDiv').addEventListener("mousemove", eventMapping_mousemove);
  document.getElementById('mappingDiv').addEventListener("mouseleave", eventMapping_mouseleave);
  document.getElementById('mappingDiv').addEventListener("mouseenter", eventMapping_mouseenter);
  document.getElementById('mappingDiv').addEventListener("mousedown", eventMapping_mousedown);
  document.getElementById('mappingDiv').addEventListener("mouseup", eventMapping_mouseup);
  document.getElementById("mappingDiv").addEventListener("wheel", eventMapping_mousewheel);

  document.getElementById("mappingBG3").style.borderColor=styleActiveColor;


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Analyse Side /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  document.getElementById('id_InputIntervalNum').addEventListener("keyup", checkIntervalInputFieldsKey);
  document.getElementById('id_InputIntervalNum').addEventListener("change", checkIntervalInputFieldsChange);
  document.getElementById('id_InputIntervalNum2').addEventListener("keyup", checkIntervalInputFieldsKey);
  document.getElementById('id_InputIntervalNum2').addEventListener("change", checkIntervalInputFieldsChange);
  document.getElementById('id_InputIntervalNum3').addEventListener("keyup", checkIntervalInputFieldsKey);
  document.getElementById('id_InputIntervalNum3').addEventListener("change", checkIntervalInputFieldsChange);

  document.getElementById('id_rgb3D').addEventListener("mousemove", eventRGB3D_mousemove);
  document.getElementById('id_rgb3D').addEventListener("mouseleave", eventRGB3D_mouseleave);
  document.getElementById('id_rgb3D').addEventListener("mousedown", eventRGB3D_mousedown);
  document.getElementById('id_rgb3D').addEventListener("mouseup", eventRGB3D_mouseup);

  document.getElementById('id_setOpacityRange').addEventListener("change", changeOpacityRange);


  //document.getElementById('analyse_SelectMetric').addEventListener("change", drawAnalyseDifferenceMaps);
  //styleAnalysisPage();

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Compare Side /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////,

  document.getElementById('id_CompareInputIntervalNum').addEventListener("keyup", checkIntervalInputFieldsKey);
  document.getElementById('id_CompareInputIntervalNum').addEventListener("change", checkIntervalInputFieldsChange);
  document.getElementById('id_CompareInputIntervalNum2').addEventListener("keyup", checkIntervalInputFieldsKey);
  document.getElementById('id_CompareInputIntervalNum2').addEventListener("change", checkIntervalInputFieldsChange);
  document.getElementById('id_CompareInputIntervalNum3').addEventListener("keyup", checkIntervalInputFieldsKey);
  document.getElementById('id_CompareInputIntervalNum3').addEventListener("change", checkIntervalInputFieldsChange);

  document.getElementById('id_rgb3DCompare').addEventListener("mousemove", eventRGB3D_mousemove);
  document.getElementById('id_rgb3DCompare').addEventListener("mouseleave", eventRGB3D_mouseleave);
  document.getElementById('id_rgb3DCompare').addEventListener("mousedown", eventRGB3D_mousedown);
  document.getElementById('id_rgb3DCompare').addEventListener("mouseup", eventRGB3D_mouseup);

  document.getElementById('id_setOpacityRangeCompare').addEventListener("change", changeOpacityRange);

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Tutorial Side /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  document.getElementById('id_expandCreatePageMenueLayout').addEventListener("click", expandTutorialDivs);
  document.getElementById('id_expandCreatePageHowCreateColormap').addEventListener("click", expandTutorialDivs);
  document.getElementById('id_expandCreatePageHowCreateBand').addEventListener("click", expandTutorialDivs);
  document.getElementById('id_expandCreatePageExampleVideos').addEventListener("click", expandTutorialDivs);
  document.getElementById('id_expandAnalyseCourse').addEventListener("click", expandTutorialDivs);
  document.getElementById('id_expandAnalyseColorspaces').addEventListener("click", expandTutorialDivs);
  document.getElementById('id_expandAnalyseDifferenceMaps').addEventListener("click", expandTutorialDivs);

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Export Side /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  document.getElementById('id_InputIntervalExport').addEventListener("change", checkIntervalInputFieldsChange);
  document.getElementById('id_InputIntervalExport').addEventListener("keyup", checkIntervalInputFieldsKey);

 /////
  changeColorspace(2);
  switchTableTestFunction(0);
  switchModifyModus(0);
  pageIsLoaded=true;


  initMapping();
  backgroundMapping(0);




}

window.onresize = function(event) {

  orderColorSketch(colorspaceModus);

};


/*window.onscroll = function() {

};*/


function keyDownDocumentHandler(event){
  if (event.keyCode == 13) {
    if(document.getElementById("popupAlertWindow").style.display!="none")
    document.getElementById("popupAlertWindow").style.display="none";
  }
}


///////////////////////////////////////////////

function orderColorSketch(forColorspace) {

  document.getElementById("id_colormapSketch").innerHTML = null;

  for (var i = refLineSketchContainer.length - 1; i >= 0; i--) {
    refLineSketchContainer[i].remove();
    refLineSketchContainer.pop();
  }

 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (showSideID == 1) {
      // show and draw the colormap
      if(globalCMS1.getKeyLength() != 0){
        document.getElementById("id_LinearMap_Table_Div").style.display = "inline-block";
        drawCanvasColormap("id_linearColormap", linearMap_resolution_X, linearMap_resolution_Y, globalCMS1);
        drawKeys("id_keyColormap", key_resolution_X, key_resolution_Y, globalCMS1, "id_keyColormapLinesBottom");
        fillTable();
      }
      else{
        document.getElementById("id_LinearMap_Table_Div").style.display = "none";
      }

      if(document.getElementById("mapping_checkAutoUpdate").checked==true && mapping_doingAnimation){
        updateMesh();
      }
    }

    //////////////////////////////////////////////////////////////////////////
    drawBandSketch(globalCMS1,"id_colormapSketch","id_createColormapKeys","id_colormapSketch_Ref", false, -1);


    if(showSideID == 3)
    drawBandSketch(globalCMS2,"id_colormapSketch2","id_createColormapKeys2","id_colormapSketch_Ref2", false, -1);


}


function changeKeyValueInput(keyIndex, fielID) {

  var inputObj = document.getElementById(fielID);

  checkInputVal(inputObj, true, true);

  var newRef = parseFloat(inputObj.value);

  switch (keyIndex) {
    case 0:
      var nextRef = globalCMS1.getRefPosition(1);
      if(nextRef<=newRef){
        openAlert("Attention: You can not set the reference value greater than or equal to the reference value of the right neighboring key! Please enter another value.");
        inputObj.value=globalCMS1.getRefPosition(0);
      }
      else {
        globalCMS1.setRefPosition(keyIndex,newRef);
        orderColorSketch();
      }
      break;
    case globalCMS1.getKeyLength()-1:
      var prevRef = globalCMS1.getRefPosition(keyIndex-1);
      if(prevRef>=newRef){
        openAlert("Attention: You can not set the reference value smaller than or equal to the reference value of the left neighboring key! Please enter another value.");
        inputObj.value=globalCMS1.getRefPosition(keyIndex);
      }
      else {
        globalCMS1.setRefPosition(keyIndex,newRef);
        orderColorSketch();
      }

      break;
    default:
    var nextRef = globalCMS1.getRefPosition(keyIndex+1);
    if(nextRef<=newRef){
      openAlert("Attention: You can not set the reference value greater than or equal to the reference value of the right neighboring key! Please enter another value.");
      inputObj.value=globalCMS1.getRefPosition(keyIndex);
    }
    else{
      var prevRef = globalCMS1.getRefPosition(keyIndex-1);
      if(prevRef>=newRef){
        openAlert("Attention: You can not set the reference value smaller than or equal to the reference value of the left neighboring key! Please enter another value.");
        inputObj.value=globalCMS1.getRefPosition(keyIndex);
      }
      else{
        globalCMS1.setRefPosition(keyIndex,newRef);
        orderColorSketch();
      }
    }
  }

}


function fillTable() {

  var old_tbody = document.getElementById("id_tableBody");
  var new_tbody = document.createElement('tbody');

  //fill table

  for (i = 0; i < globalCMS1.getKeyLength()-1; i++) {
    var tr = document.createElement('tr');
    tr.style.background = "white";

    var td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(i + 1));
    td.style.width="4%";
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(globalCMS1.getRefPosition(i)));
    td.style.width="9%";
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(globalCMS1.getRefPosition(i+1)));
    td.style.width="9%";
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";


    var color1 = globalCMS1.getRightKeyColor(i,colorspaceModus);
    var color2 = globalCMS1.getLeftKeyColor(i+1,colorspaceModus)

    if(color1==undefined){
      td.appendChild(document.createTextNode("constant"));
      color1 = color2;
    }
    else{
      td.appendChild(document.createTextNode("scaled"));
    }
    td.style.width="9%";

    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    var td2 = document.createElement('td')
    td2.className = "class_tableInput";



    switch (colorspaceModus) {
      case "rgb":
        td.appendChild(document.createTextNode(color1.getRGBString()));
        td2.appendChild(document.createTextNode(color2.getRGBString()));
        break;
      case "hsv":
       td.appendChild(document.createTextNode(color1.getHSVString(numDecimalPlaces)));
       td2.appendChild(document.createTextNode(color2.getHSVString(numDecimalPlaces)));
        break;
      case "lab":
       td.appendChild(document.createTextNode(color1.getLABString(numDecimalPlaces)));
       td2.appendChild(document.createTextNode(color2.getLABString(numDecimalPlaces)));
        break;
      case "din99":
       td.appendChild(document.createTextNode(color1.getDIN99String(numDecimalPlaces)));
       td2.appendChild(document.createTextNode(color2.getDIN99String(numDecimalPlaces)));
        break;
      default:
        console.log("Error at the changeColorspace function");
    }

    td.style.width="9%";
    td2.style.width="9%";

    tr.appendChild(td);
    tr.appendChild(td2);

    new_tbody.appendChild(tr);

  }

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
  new_tbody.id = "id_tableBody";
}
