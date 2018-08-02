function init_settingPage(){

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Init Setting Side /////////////////////////////////////
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

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  document.getElementById("select_XYZTransferMatrix").addEventListener("change", updateRGBtoXYZ_TransferMatrices);

  document.getElementById("inputRgbToXYZTransferMatrix00").addEventListener("change", updateRGBtoXYZ_TransferMatrices);
  document.getElementById("inputRgbToXYZTransferMatrix10").addEventListener("change", updateRGBtoXYZ_TransferMatrices);
  document.getElementById("inputRgbToXYZTransferMatrix20").addEventListener("change", updateRGBtoXYZ_TransferMatrices);

  document.getElementById("inputRgbToXYZTransferMatrix01").addEventListener("change", updateRGBtoXYZ_TransferMatrices);
  document.getElementById("inputRgbToXYZTransferMatrix11").addEventListener("change", updateRGBtoXYZ_TransferMatrices);
  document.getElementById("inputRgbToXYZTransferMatrix21").addEventListener("change", updateRGBtoXYZ_TransferMatrices);

  document.getElementById("inputRgbToXYZTransferMatrix02").addEventListener("change", updateRGBtoXYZ_TransferMatrices);
  document.getElementById("inputRgbToXYZTransferMatrix12").addEventListener("change", updateRGBtoXYZ_TransferMatrices);
  document.getElementById("inputRgbToXYZTransferMatrix22").addEventListener("change", updateRGBtoXYZ_TransferMatrices);


  document.getElementById("inputRgbToXYZTransferMatrix00").value=1;
  document.getElementById("inputRgbToXYZTransferMatrix10").value=0;
  document.getElementById("inputRgbToXYZTransferMatrix20").value=0;

  document.getElementById("inputRgbToXYZTransferMatrix01").value=0;
  document.getElementById("inputRgbToXYZTransferMatrix11").value=1;
  document.getElementById("inputRgbToXYZTransferMatrix21").value=0;

  document.getElementById("inputRgbToXYZTransferMatrix02").value=0;
  document.getElementById("inputRgbToXYZTransferMatrix12").value=0;
  document.getElementById("inputRgbToXYZTransferMatrix22").value=1;

  //updateColorBlindness_TransferMatrices();
  document.getElementById("select_LMSTransferMatrix").selectedIndex=0;

  //////////////////////////////////////////////////////////////////////

  document.getElementById("select_LMSTransferMatrix").addEventListener("change", updateXYZtoLMS_TransferMatrices);

  document.getElementById("inputXyztoLSMTransferMatrix00").addEventListener("change", updateXYZtoLMS_TransferMatrices);
  document.getElementById("inputXyztoLSMTransferMatrix10").addEventListener("change", updateXYZtoLMS_TransferMatrices);
  document.getElementById("inputXyztoLSMTransferMatrix20").addEventListener("change", updateXYZtoLMS_TransferMatrices);

  document.getElementById("inputXyztoLSMTransferMatrix01").addEventListener("change", updateXYZtoLMS_TransferMatrices);
  document.getElementById("inputXyztoLSMTransferMatrix11").addEventListener("change", updateXYZtoLMS_TransferMatrices);
  document.getElementById("inputXyztoLSMTransferMatrix21").addEventListener("change", updateXYZtoLMS_TransferMatrices);

  document.getElementById("inputXyztoLSMTransferMatrix02").addEventListener("change", updateXYZtoLMS_TransferMatrices);
  document.getElementById("inputXyztoLSMTransferMatrix12").addEventListener("change", updateXYZtoLMS_TransferMatrices);
  document.getElementById("inputXyztoLSMTransferMatrix22").addEventListener("change", updateXYZtoLMS_TransferMatrices);


  document.getElementById("inputXyztoLSMTransferMatrix00").value=1;
  document.getElementById("inputXyztoLSMTransferMatrix10").value=0;
  document.getElementById("inputXyztoLSMTransferMatrix20").value=0;

  document.getElementById("inputXyztoLSMTransferMatrix01").value=0;
  document.getElementById("inputXyztoLSMTransferMatrix11").value=1;
  document.getElementById("inputXyztoLSMTransferMatrix21").value=0;

  document.getElementById("inputXyztoLSMTransferMatrix02").value=0;
  document.getElementById("inputXyztoLSMTransferMatrix12").value=0;
  document.getElementById("inputXyztoLSMTransferMatrix22").value=1;

  //updateColorBlindness_TransferMatrices();
  document.getElementById("select_LMSTransferMatrix").selectedIndex=1;

  ///////////////////////////////////////////
  updateAllSetting();
}

function init_AddPage(){
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
}

function init_EditPage(){
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
}


function init_MappingCreatePage(){
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Create Side  Mapping/////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  document.getElementById('showHideMappingOptionsText').style.background = styleActiveColor;
  document.getElementById('showHideMappingHistogramText').style.background = styleActiveColor;
  document.getElementById('showHideMappingVisualizationText').style.background = styleActiveColor;
  document.getElementById('showHideColorBlindnessSimText').style.background = styleActiveColor;

  document.getElementById('id_radio_SelectTrichomacy_Dichromatism').checked=true;
  document.getElementById("id_radio_Monochromatic").disabled = true;
  document.getElementById('id_radio_Protanopia').checked=true;
  colorblindnessType=0;

  document.getElementById('customTransferMatrix00').value = 1;
  document.getElementById('customTransferMatrix01').value = 0;
  document.getElementById('customTransferMatrix02').value = 0;
  document.getElementById('customTransferMatrix10').value = 0;
  document.getElementById('customTransferMatrix11').value = 1;
  document.getElementById('customTransferMatrix12').value = 0;
  document.getElementById('customTransferMatrix20').value = 0;
  document.getElementById('customTransferMatrix21').value = 0;
  document.getElementById('customTransferMatrix22').value = 1;

  document.getElementById('customTransferMatrix00').addEventListener("change", changeCustomTransferMatrix);
  document.getElementById('customTransferMatrix01').addEventListener("change", changeCustomTransferMatrix);
  document.getElementById('customTransferMatrix02').addEventListener("change", changeCustomTransferMatrix);
  document.getElementById('customTransferMatrix10').addEventListener("change", changeCustomTransferMatrix);
  document.getElementById('customTransferMatrix11').addEventListener("change", changeCustomTransferMatrix);
  document.getElementById('customTransferMatrix12').addEventListener("change", changeCustomTransferMatrix);
  document.getElementById('customTransferMatrix20').addEventListener("change", changeCustomTransferMatrix);
  document.getElementById('customTransferMatrix21').addEventListener("change", changeCustomTransferMatrix);
  document.getElementById('customTransferMatrix22').addEventListener("change", changeCustomTransferMatrix);

  document.getElementById('id_doColorBlindSim').checked = false;
  document.getElementById('id_doColorBlindSim').addEventListener("change", changeColorblindness);

  document.getElementById('id_radio_Protanopia').addEventListener("change", changeColorblindnessType);
  document.getElementById('id_radio_Deuteranopia').addEventListener("change", changeColorblindnessType);
  document.getElementById('id_radio_Tritanopes').addEventListener("change", changeColorblindnessType);
  document.getElementById('id_radio_Achromatopsia').addEventListener("change", changeColorblindnessType);
  document.getElementById('id_radio_BlueCone').addEventListener("change", changeColorblindnessType);


  document.getElementById('range_DegreeProtanopia').addEventListener("change", changeColorblindnessDegree);
  document.getElementById('range_DegreeDeuteranopia').addEventListener("change", changeColorblindnessDegree);
  document.getElementById('range_DegreeTritanopes').addEventListener("change", changeColorblindnessDegree);

  document.getElementById('id_radio_SelectTrichomacy_Dichromatism').addEventListener("change", changeColorblindnessSection);
  document.getElementById('id_radio_Monochromatic').addEventListener("change", changeColorblindnessSection);
  document.getElementById('id_radio_CustomColorblindness').addEventListener("change", changeColorblindnessSection);

  document.getElementById('id_affectHistogram').addEventListener("change", orderColorSketch);


  //document.getElementById("mappingProcessBar").style.background=styleActiveColor;
  document.getElementById("mappingProcessBar").style.color=styleActiveColor;

  document.getElementById('idNumberHistoRanges').addEventListener("keyup", updateHistogramKey);
  document.getElementById('idNumberHistoRanges').addEventListener("change", updateHistogramChange);
  document.getElementById('histogram_SelectTimeStep').addEventListener("click", updateHistogramChange);
  document.getElementById('histogram_SelectFullData').addEventListener("click", updateHistogramChange);

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

  document.getElementById('mappingDiv').addEventListener("mousemove", eventMapping_mousemove);
  document.getElementById('mappingDiv').addEventListener("mouseleave", eventMapping_mouseleave);
  document.getElementById('mappingDiv').addEventListener("mouseenter", eventMapping_mouseenter);
  document.getElementById('mappingDiv').addEventListener("mousedown", eventMapping_mousedown);
  document.getElementById('mappingDiv').addEventListener("mouseup", eventMapping_mouseup);
  document.getElementById("mappingDiv").addEventListener("wheel", eventMapping_mousewheel);

  document.getElementById("mappingBG3").style.borderColor=styleActiveColor;
}


function init_CreatePage(){
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

}


function init_analyzeComparePage(){
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Analyze Side /////////////////////////////////////
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
}

function init_TutorialPage(){

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

}

function init_ExportPage(){
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Export Side /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  document.getElementById('id_InputIntervalExport').addEventListener("change", checkIntervalInputFieldsChange);
  document.getElementById('id_InputIntervalExport').addEventListener("keyup", checkIntervalInputFieldsKey);
}



function init_Size(){

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  //console.log(windowWidth,windowHeight);
  //document.querySelector(".standardText").style.fontSize = innerHeight*0.02+"px";



  //document.getElementById("id_menu").style.width = windowWidth+"px";
  var divWidth = windowWidth*0.6;
  document.getElementById("id_welcomePage").style.width = divWidth+"px";
  document.getElementById("id_impressumPage").style.width = divWidth+"px";
  document.getElementById("id_settingPage").style.width = divWidth+"px";

  divWidth = windowWidth*0.96;
  document.getElementById("div_colormapBandSketch").style.width = divWidth+"px";
  document.getElementById("div_colormapBandSketch2").style.width = divWidth+"px";
  document.getElementById("id_creatorPage").style.width = divWidth+"px";
  document.getElementById("id_myListPage").style.width = divWidth+"px";
  document.getElementById("id_addPage").style.width = divWidth+"px";
  document.getElementById("id_comparePage").style.width = divWidth+"px";
  document.getElementById("id_analysisPage").style.width = divWidth+"px";
  document.getElementById("id_exportPage").style.width = divWidth+"px";
  document.getElementById("id_tutorialPage").style.width = divWidth+"px";
  document.getElementById("id_Mapping_Table_Div").style.width = divWidth+"px";

  divWidth = windowWidth*0.35;
  document.getElementById("analyze_GlobalSpeed_Canvas_Lab").style.width = divWidth+"px";
  document.getElementById("analyze_GlobalSpeed_Canvas_de94").style.width = divWidth+"px";
  document.getElementById("analyze_GlobalSpeed_Canvas_de2000").style.width = divWidth+"px";
  document.getElementById("analyze_GlobalSpeed_Canvas_din99").style.width = divWidth+"px";

  document.getElementById("compare1_GlobalSpeed_Canvas_Lab").style.width = divWidth+"px";
  document.getElementById("compare1_GlobalSpeed_Canvas_de94").style.width = divWidth+"px";
  document.getElementById("compare1_GlobalSpeed_Canvas_de2000").style.width = divWidth+"px";
  document.getElementById("compare1_GlobalSpeed_Canvas_din99").style.width = divWidth+"px";

  document.getElementById("compare2_GlobalSpeed_Canvas_Lab").style.width = divWidth+"px";
  document.getElementById("compare2_GlobalSpeed_Canvas_de94").style.width = divWidth+"px";
  document.getElementById("compare2_GlobalSpeed_Canvas_de2000").style.width = divWidth+"px";
  document.getElementById("compare2_GlobalSpeed_Canvas_din99").style.width = divWidth+"px";

  document.getElementById("analyze_GlobalSpeed_Canvas_Lab").style.height = divWidth+"px";
  document.getElementById("analyze_GlobalSpeed_Canvas_de94").style.height = divWidth+"px";
  document.getElementById("analyze_GlobalSpeed_Canvas_de2000").style.height = divWidth+"px";
  document.getElementById("analyze_GlobalSpeed_Canvas_din99").style.height = divWidth+"px";

  document.getElementById("compare1_GlobalSpeed_Canvas_Lab").style.height = divWidth+"px";
  document.getElementById("compare1_GlobalSpeed_Canvas_de94").style.height = divWidth+"px";
  document.getElementById("compare1_GlobalSpeed_Canvas_de2000").style.height = divWidth+"px";
  document.getElementById("compare1_GlobalSpeed_Canvas_din99").style.height = divWidth+"px";

  document.getElementById("compare2_GlobalSpeed_Canvas_Lab").style.height = divWidth+"px";
  document.getElementById("compare2_GlobalSpeed_Canvas_de94").style.height = divWidth+"px";
  document.getElementById("compare2_GlobalSpeed_Canvas_de2000").style.height = divWidth+"px";
  document.getElementById("compare2_GlobalSpeed_Canvas_din99").style.height = divWidth+"px";

  document.getElementById("analyze_LocalSpeed_Canvas_Lab").style.width = divWidth+"px";
  document.getElementById("analyze_LocalSpeed_Canvas_de94").style.width = divWidth+"px";
  document.getElementById("analyze_LocalSpeed_Canvas_de2000").style.width = divWidth+"px";
  document.getElementById("analyze_LocalSpeed_Canvas_din99").style.width = divWidth+"px";

  document.getElementById("analyze_LocalSpeed_Canvas_Lab").style.height = divWidth+"px";
  document.getElementById("analyze_LocalSpeed_Canvas_de94").style.height = divWidth+"px";
  document.getElementById("analyze_LocalSpeed_Canvas_de2000").style.height = divWidth+"px";
  document.getElementById("analyze_LocalSpeed_Canvas_din99").style.height = divWidth+"px";

  document.getElementById("compare1_LocalSpeed_Canvas_Lab").style.width = divWidth+"px";
  document.getElementById("compare1_LocalSpeed_Canvas_de94").style.width = divWidth+"px";
  document.getElementById("compare1_LocalSpeed_Canvas_de2000").style.width = divWidth+"px";
  document.getElementById("compare1_LocalSpeed_Canvas_din99").style.width = divWidth+"px";

  document.getElementById("compare1_LocalSpeed_Canvas_Lab").style.height = divWidth+"px";
  document.getElementById("compare1_LocalSpeed_Canvas_de94").style.height = divWidth+"px";
  document.getElementById("compare1_LocalSpeed_Canvas_de2000").style.height = divWidth+"px";
  document.getElementById("compare1_LocalSpeed_Canvas_din99").style.height = divWidth+"px";

  document.getElementById("compare2_LocalSpeed_Canvas_Lab").style.width = divWidth+"px";
  document.getElementById("compare2_LocalSpeed_Canvas_de94").style.width = divWidth+"px";
  document.getElementById("compare2_LocalSpeed_Canvas_de2000").style.width = divWidth+"px";
  document.getElementById("compare2_LocalSpeed_Canvas_din99").style.width = divWidth+"px";

  document.getElementById("compare2_LocalSpeed_Canvas_Lab").style.height = divWidth+"px";
  document.getElementById("compare2_LocalSpeed_Canvas_de94").style.height = divWidth+"px";
  document.getElementById("compare2_LocalSpeed_Canvas_de2000").style.height = divWidth+"px";
  document.getElementById("compare2_LocalSpeed_Canvas_din99").style.height = divWidth+"px";


  document.getElementById("analyze_OrderSpeed_Canvas_Lab").style.width = divWidth+"px";
  document.getElementById("analyze_OrderSpeed_Canvas_de94").style.width = divWidth+"px";
  document.getElementById("analyze_OrderSpeed_Canvas_de2000").style.width = divWidth+"px";
  document.getElementById("analyze_OrderSpeed_Canvas_din99").style.width = divWidth+"px";

  document.getElementById("analyze_OrderSpeed_Canvas_Lab").style.height = divWidth+"px";
  document.getElementById("analyze_OrderSpeed_Canvas_de94").style.height = divWidth+"px";
  document.getElementById("analyze_OrderSpeed_Canvas_de2000").style.height = divWidth+"px";
  document.getElementById("analyze_OrderSpeed_Canvas_din99").style.height = divWidth+"px";

  document.getElementById("compare1_OrderSpeed_Canvas_Lab").style.width = divWidth+"px";
  document.getElementById("compare1_OrderSpeed_Canvas_de94").style.width = divWidth+"px";
  document.getElementById("compare1_OrderSpeed_Canvas_de2000").style.width = divWidth+"px";
  document.getElementById("compare1_OrderSpeed_Canvas_din99").style.width = divWidth+"px";

  document.getElementById("compare1_OrderSpeed_Canvas_Lab").style.height = divWidth+"px";
  document.getElementById("compare1_OrderSpeed_Canvas_de94").style.height = divWidth+"px";
  document.getElementById("compare1_OrderSpeed_Canvas_de2000").style.height = divWidth+"px";
  document.getElementById("compare1_OrderSpeed_Canvas_din99").style.height = divWidth+"px";

  document.getElementById("compare2_OrderSpeed_Canvas_Lab").style.width = divWidth+"px";
  document.getElementById("compare2_OrderSpeed_Canvas_de94").style.width = divWidth+"px";
  document.getElementById("compare2_OrderSpeed_Canvas_de2000").style.width = divWidth+"px";
  document.getElementById("compare2_OrderSpeed_Canvas_din99").style.width = divWidth+"px";

  document.getElementById("compare2_OrderSpeed_Canvas_Lab").style.height = divWidth+"px";
  document.getElementById("compare2_OrderSpeed_Canvas_de94").style.height = divWidth+"px";
  document.getElementById("compare2_OrderSpeed_Canvas_de2000").style.height = divWidth+"px";
  document.getElementById("compare2_OrderSpeed_Canvas_din99").style.height = divWidth+"px";

  divWidth = windowWidth*0.25;
  document.getElementById("id_canvasRGModiyBackground").style.height = divWidth+"px";
  document.getElementById("id_canvasRGModiyMiddle").style.height = divWidth+"px";
  document.getElementById("id_canvasRGModiyTop").style.height = divWidth+"px";

  document.getElementById("id_canvasBGModiyBackground").style.height = divWidth+"px";
  document.getElementById("id_canvasBGModiyMiddle").style.height = divWidth+"px";
  document.getElementById("id_canvasBGModiyTop").style.height = divWidth+"px";

  document.getElementById("id_canvasRBModiyBackground").style.height = divWidth+"px";
  document.getElementById("id_canvasRBModiyMiddle").style.height = divWidth+"px";
  document.getElementById("id_canvasRBModiyTop").style.height = divWidth+"px";

  document.getElementById("id_canvasRGModiyBackground").style.width = divWidth+"px";
  document.getElementById("id_canvasRGModiyMiddle").style.width = divWidth+"px";
  document.getElementById("id_canvasRGModiyTop").style.width = divWidth+"px";

  document.getElementById("id_canvasBGModiyBackground").style.width = divWidth+"px";
  document.getElementById("id_canvasBGModiyMiddle").style.width = divWidth+"px";
  document.getElementById("id_canvasBGModiyTop").style.width = divWidth+"px";

  document.getElementById("id_canvasRBModiyBackground").style.width = divWidth+"px";
  document.getElementById("id_canvasRBModiyMiddle").style.width = divWidth+"px";
  document.getElementById("id_canvasRBModiyTop").style.width = divWidth+"px";


  document.getElementById("id_canvasRGAnalyzeBackground").style.height = divWidth+"px";
  document.getElementById("id_canvasRGAnalyzeMiddle").style.height = divWidth+"px";
  document.getElementById("id_canvasRGAnalyzeTop").style.height = divWidth+"px";

  document.getElementById("id_canvasBGAnalyzeBackground").style.height = divWidth+"px";
  document.getElementById("id_canvasBGAnalyzeMiddle").style.height = divWidth+"px";
  document.getElementById("id_canvasBGAnalyzeTop").style.height = divWidth+"px";

  document.getElementById("id_canvasRBAnalyzeBackground").style.height = divWidth+"px";
  document.getElementById("id_canvasRBAnalyzeMiddle").style.height = divWidth+"px";
  document.getElementById("id_canvasRBAnalyzeTop").style.height = divWidth+"px";

  document.getElementById("id_canvasRGAnalyzeBackground").style.width = divWidth+"px";
  document.getElementById("id_canvasRGAnalyzeMiddle").style.width = divWidth+"px";
  document.getElementById("id_canvasRGAnalyzeTop").style.width = divWidth+"px";

  document.getElementById("id_canvasBGAnalyzeBackground").style.width = divWidth+"px";
  document.getElementById("id_canvasBGAnalyzeMiddle").style.width = divWidth+"px";
  document.getElementById("id_canvasBGAnalyzeTop").style.width = divWidth+"px";

  document.getElementById("id_canvasRBAnalyzeBackground").style.width = divWidth+"px";
  document.getElementById("id_canvasRBAnalyzeMiddle").style.width = divWidth+"px";
  document.getElementById("id_canvasRBAnalyzeTop").style.width = divWidth+"px";




  document.getElementById("id_canvasRGCompareBackground").style.height = divWidth+"px";
  document.getElementById("id_canvasRGCompareMiddle").style.height = divWidth+"px";
  document.getElementById("id_canvasRGCompareTop").style.height = divWidth+"px";

  document.getElementById("id_canvasBGCompareBackground").style.height = divWidth+"px";
  document.getElementById("id_canvasBGCompareMiddle").style.height = divWidth+"px";
  document.getElementById("id_canvasBGCompareTop").style.height = divWidth+"px";

  document.getElementById("id_canvasRBCompareBackground").style.height = divWidth+"px";
  document.getElementById("id_canvasRBCompareMiddle").style.height = divWidth+"px";
  document.getElementById("id_canvasRBCompareTop").style.height = divWidth+"px";

  document.getElementById("id_canvasRGCompareBackground").style.width = divWidth+"px";
  document.getElementById("id_canvasRGCompareMiddle").style.width = divWidth+"px";
  document.getElementById("id_canvasRGCompareTop").style.width = divWidth+"px";

  document.getElementById("id_canvasBGCompareBackground").style.width = divWidth+"px";
  document.getElementById("id_canvasBGCompareMiddle").style.width = divWidth+"px";
  document.getElementById("id_canvasBGCompareTop").style.width = divWidth+"px";

  document.getElementById("id_canvasRBCompareBackground").style.width = divWidth+"px";
  document.getElementById("id_canvasRBCompareMiddle").style.width = divWidth+"px";
  document.getElementById("id_canvasRBCompareTop").style.width = divWidth+"px";



  document.getElementById("id_RG_Modify_Div").style.height = divWidth+"px";
  document.getElementById("id_RB_Modify_Div").style.height = divWidth+"px";
  document.getElementById("id_BG_Modify_Div").style.height = divWidth+"px";
  document.getElementById("id_RG_Modify_Div").style.width = divWidth+"px";
  document.getElementById("id_RB_Modify_Div").style.width = divWidth+"px";
  document.getElementById("id_BG_Modify_Div").style.width = divWidth+"px";

  document.getElementById("id_RG_Analyze_Div").style.height = divWidth+"px";
  document.getElementById("id_RB_Analyze_Div").style.height = divWidth+"px";
  document.getElementById("id_BG_Analyze_Div").style.height = divWidth+"px";
  document.getElementById("id_RG_Analyze_Div").style.width = divWidth+"px";
  document.getElementById("id_RB_Analyze_Div").style.width = divWidth+"px";
  document.getElementById("id_BG_Analyze_Div").style.width = divWidth+"px";

  document.getElementById("id_RG_Compare_Div").style.height = divWidth+"px";
  document.getElementById("id_RB_Compare_Div").style.height = divWidth+"px";
  document.getElementById("id_BG_Compare_Div").style.height = divWidth+"px";
  document.getElementById("id_RG_Compare_Div").style.width = divWidth+"px";
  document.getElementById("id_RB_Compare_Div").style.width = divWidth+"px";
  document.getElementById("id_BG_Compare_Div").style.width = divWidth+"px";

  ///////////////////////////////////////////////////////////////////////////////


  var pElements = document.getElementsByTagName("p");
  for(var i =0; i<pElements.length;i++){

    if(pElements[i].classList.contains("constText"))
      continue;

     pElements[i].style.lineHeight = windowHeight*0.02+"px";
     pElements[i].style.fontSize = windowHeight*0.016+"px";
  }

  var labelElements = document.getElementsByTagName("label");
  for(var i =0; i<labelElements.length;i++){

    if(labelElements[i].classList.contains("constText"))
      continue;

     labelElements[i].style.lineHeight = windowHeight*0.02+"px";
     labelElements[i].style.fontSize = windowHeight*0.016+"px";
  }

  var sectionLabels = document.getElementsByTagName("h1");
  for(var i =0; i<sectionLabels.length;i++){

     sectionLabels[i].style.lineHeight = windowHeight*0.035+"px";
     sectionLabels[i].style.fontSize = windowHeight*0.03+"px";
  }

  var subsectionLabels = document.getElementsByTagName("h2");
  for(var i =0; i<subsectionLabels.length;i++){

     subsectionLabels[i].style.lineHeight = windowHeight*0.025+"px";
     subsectionLabels[i].style.fontSize = windowHeight*0.02+"px";
  }


  var buttons = document.getElementsByTagName("button");
  for(var i =0; i<buttons.length;i++){

    if(buttons[i].name=="constStyle")
      continue;

     buttons[i].style.height = windowHeight*0.04+"px";
     buttons[i].style.lineHeight = windowHeight*0.04+"px";
     buttons[i].style.fontSize = windowHeight*0.022+"px";
  }

  var inputs = document.getElementsByTagName("input");
  for(var i =0; i<inputs.length;i++){

    if(inputs[i].classList.contains("constText"))
      continue;

     inputs[i].style.height = windowHeight*0.025+"px";
     inputs[i].style.lineHeight = windowHeight*0.025+"px";
     inputs[i].style.fontSize = windowHeight*0.022+"px";
  }



  /*var myDesingElementHight = windowHeight*0.05+"px";
  for(var i=0; i<10; i++){
    //  console.log(myList[i].getColormapName());

    document.getElementById("id_canvasMyListColormap"+i).style.height =  myDesingElementHight;

    document.getElementById("id_buttonExportMyList"+i).style.height =  myDesingElementHight;
    document.getElementById("id_buttonExportMyList"+i).style.width =  myDesingElementHight;

    document.getElementById("id_buttonDeleteMyList"+i).style.height =  myDesingElementHight;
    document.getElementById("id_buttonDeleteMyList"+i).style.width =  myDesingElementHight;

    document.getElementById("id_buttonAcceptMyList"+i).style.height =  myDesingElementHight;
    document.getElementById("id_buttonAcceptMyList"+i).style.width =  myDesingElementHight;

    document.getElementById("id_nanMyListColormap"+i).style.height =  myDesingElementHight;
    document.getElementById("id_nanMyListColormap"+i).style.width =  myDesingElementHight;

  }*/

}
