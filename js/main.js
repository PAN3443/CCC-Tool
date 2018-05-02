window.onload = function() {


  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// GLOBAL /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  if (typeof (Worker) === undefined)
  browserCanWorker=false;
  else
  browserCanWorker=true;

  browserCanWorker=false;

  globalColormap1 = new classColorMapSpecification();
  globalColormap2 = new classColorMapSpecification();

  globalCMS1 = new class_CMS();
  globalCMS2 = new class_CMS();

  bandSketch = new classBandSketch();
  bandSketch2 = new classBandSketch();

  document.getElementById("editSide_Radiobutton_PickerRG_B").checked=true;
  document.getElementById("bandCreator_Radiobutton_PickerRG_B").checked=true;
  colorpickerType="RG_B";



  document.getElementById('id_creatorPage').style.display = "none";
  document.getElementById('id_comparePage').style.display = "none";
  document.getElementById('id_analysisPage').style.display = "none";
  document.getElementById('id_tutorialPage').style.display = "none";

  document.getElementById('id_inputData').addEventListener("change", readSingleFile);


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


  /*var colormapPath = pathColormaps+folderYellow+fileYellowColormaps[0];
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
  drawCanvasColormap("canvasPreviewComplexFour", existingMap_resolution_X,  existingMap_resolution_Y, tmpMap);*/


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
  /////////////////////////////// Create Side /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  // Style Init
  document.getElementById("id_table_workwindow").style.display = "none";

  //// set events
  // Table
  document.getElementById('id_expandTablebutton').addEventListener("click", expandTable);

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
  //document.getElementById('id_buttonExportCreateColormap').addEventListener("click", createSideExport);
  document.getElementById('id_buttonLoadCreateColormap').addEventListener("click", loadColormapCreateSide);

  document.getElementById('id_buttonHelpCreateColormap').addEventListener("mouseleave", createPage_hideHelp);
  document.getElementById('id_buttonHelpCreateColormap').addEventListener("mouseenter", createPage_showHelp);

  // Edit Path

  document.getElementById('id_ModiyCourseHueBackground3').addEventListener("mouseleave", mouseLeaveColorspace);
  document.getElementById('id_ModiyCourseHueBackground3').addEventListener("mousemove", mouseMoveColorspace);
  document.getElementById('id_ModiyCourseHueBackground3').addEventListener("mousedown", mouseDownColorspace);
  document.getElementById('id_ModiyCourseHueBackground3').addEventListener("mouseup", mouseUpColorspace);

  document.getElementById('id_ModifyValue').addEventListener("mouseleave", mouseLeaveValuePlot);
  document.getElementById('id_ModifyValue').addEventListener("mousemove", mouseMoveValuePlot);
  document.getElementById('id_ModifyValue').addEventListener("mousedown", mouseDownValuePlot);
  document.getElementById('id_ModifyValue').addEventListener("mouseup", mouseUpValuePlot);

  document.getElementById('id_canvasRGModiy').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_canvasRGModiy').addEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_canvasRGModiy').addEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_canvasRGModiy').addEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_canvasRBModiy').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_canvasRBModiy').addEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_canvasRBModiy').addEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_canvasRBModiy').addEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_canvasBGModiy').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_canvasBGModiy').addEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_canvasBGModiy').addEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_canvasBGModiy').addEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_setValueRange').addEventListener("change", changeValueRange);
  document.getElementById('id_checkboxRGB').addEventListener("change", modifyColormapRGBPossible);

  document.getElementById('id_rgb3DModiy').addEventListener("mousemove", eventRGB3D_mousemove);
  document.getElementById('id_rgb3DModiy').addEventListener("mouseleave", eventRGB3D_mouseleave);
  document.getElementById('id_rgb3DModiy').addEventListener("mousedown", eventRGB3D_mousedown);
  document.getElementById('id_rgb3DModiy').addEventListener("mouseup", eventRGB3D_mouseup);

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Analyse Side /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  document.getElementById('id_InputIntervalNum').addEventListener("keyup", checkIntervalInputFieldsKey);
  document.getElementById('id_InputIntervalNum').addEventListener("change", checkIntervalInputFieldsChange);
  document.getElementById('id_InputIntervalNum2').addEventListener("keyup", checkIntervalInputFieldsKey);
  document.getElementById('id_InputIntervalNum2').addEventListener("change", checkIntervalInputFieldsChange);
  document.getElementById('id_InputIntervalNum3').addEventListener("keyup", checkIntervalInputFieldsKey);
  document.getElementById('id_InputIntervalNum3').addEventListener("change", checkIntervalInputFieldsChange);

  /*document.getElementById('id_anaylseCourseHueBackground3').addEventListener("mouseleave", mouseLeaveColorspace);
  document.getElementById('id_anaylseCourseHueBackground3').addEventListener("mousemove", mouseMoveColorspace);
  document.getElementById('id_anaylseCourseHueBackground3').addEventListener("mousedown", mouseDownColorspace);
  document.getElementById('id_anaylseCourseHueBackground3').addEventListener("mouseup", mouseUpColorspace);*/

  /*document.getElementById('id_anaylseValue').addEventListener("mouseleave", mouseLeaveValuePlot);
  document.getElementById('id_anaylseValue').addEventListener("mousemove", mouseMoveValuePlot);
  document.getElementById('id_anaylseValue').addEventListener("mousedown", mouseDownValuePlot);
  document.getElementById('id_anaylseValue').addEventListener("mouseup", mouseUpValuePlot);*/

  /*document.getElementById('id_canvasRG').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_canvasRG').addEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_canvasRG').addEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_canvasRG').addEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_canvasRB').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_canvasRB').addEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_canvasRB').addEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_canvasRB').addEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_canvasBG').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_canvasBG').addEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_canvasBG').addEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_canvasBG').addEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_setValueRange').addEventListener("change", changeValueRange);
  document.getElementById('id_checkboxRGB').addEventListener("change", analyseColormapRGBPossible);*/

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

  /*document.getElementById('id_compareCourseHueBackground').addEventListener("mouseleave", mouseLeaveColorspace);
  document.getElementById('id_compareCourseHueBackground').addEventListener("mousemove", mouseMoveColorspace);
  document.getElementById('id_compareCourseHueBackground').addEventListener("mousedown", mouseDownColorspace);
  document.getElementById('id_compareCourseHueBackground').addEventListener("mouseup", mouseUpColorspace);

  document.getElementById('id_compareValue').addEventListener("mouseleave", mouseLeaveValuePlot);
  document.getElementById('id_compareValue').addEventListener("mousemove", mouseMoveValuePlot);
  document.getElementById('id_compareValue').addEventListener("mousedown", mouseDownValuePlot);
  document.getElementById('id_compareValue').addEventListener("mouseup", mouseUpValuePlot);

  document.getElementById('id_canvasRGCompare').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_canvasRGCompare').addEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_canvasRGCompare').addEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_canvasRGCompare').addEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_canvasRBCompare').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_canvasRBCompare').addEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_canvasRBCompare').addEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_canvasRBCompare').addEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_canvasBGCompare').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_canvasBGCompare').addEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_canvasBGCompare').addEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_canvasBGCompare').addEventListener("mouseup", mouseUpColorspaceRGB);*/

  //document.getElementById('id_setValueRangeCompare').addEventListener("change", changeValueRangeCompare);
  //document.getElementById('id_checkboxRGBCompare').addEventListener("change", compareColormapRGBPossible);

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

  document.getElementById('id_InputIntervalExport').addEventListener("change", exportSide_changeIntervalNumChange);
  document.getElementById('id_InputIntervalExport').addEventListener("keyup", exportSide_changeIntervalNumEnter);

 /////
  changeColorspace(2);
  pageIsLoaded=true;
}

window.onresize = function(event) {


  orderColorSketch(colorspaceModus);

};


/*window.onscroll = function() {

};*/



///////////////////////////////////////////////

function orderColorSketch(forColorspace) {

  document.getElementById("id_colormapSketch").innerHTML = null;

  for (var i = dropPositionElements.length - 1; i >= 0; i--) {
    dropPositionElements[i].remove();
    dropPositionElements.pop();
  }

  for (var i = droppedBandElements.length - 1; i >= 0; i--) {
    droppedBandElements[i].remove();
    droppedBandElements.pop();
  }

  for (var i = refLineSketchContainer.length - 1; i >= 0; i--) {
    refLineSketchContainer[i].remove();
    refLineSketchContainer.pop();
  }

  var sketchObject = document.getElementById("id_colormapSketch");
  var sketchRefObj = document.getElementById("id_colormapSketch_Ref");


 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if (globalCMS1.getKeyLength() != 0) {

    if (showSideID == 1) {
      // show and draw the colormap
      document.getElementById("id_LinearMap_Table_Div").style.display = "inline-block";
      drawCanvasColormap("id_linearColormap", linearMap_resolution_X, linearMap_resolution_Y, globalCMS1);
      drawKeys("id_keyColormap", key_resolution_X, key_resolution_Y, globalCMS1, "id_keyColormapLinesBottom");
      fillTable();
    }

    editPage_drawKeys('id_createColormapKeys', globalCMS1);

    //////////////////////////////////////////////////////////////////////////


    sketchObject.style.border = "none";

    var tmpRect = sketchObject.getBoundingClientRect();

    var tmpLength = tmpRect.width/(globalCMS1.getKeyLength()-1)-2;

    for (var i = 0; i < globalCMS1.getKeyLength()-1; i++) {

      // create band
      var tCan = document.createElement('canvas');
      tCan.id = 'band' + i;

      tCan.style.border = "1px solid black";
      tCan.style.margin = "0px";
      tCan.setAttribute('draggable', true);
      tCan.style.height = 100 + '%';
      //tCan.style.maxWidth = tmpLength + "px"; //100 +'%';
      tCan.style.width = tmpLength + "px"; //100 +'%';


      drawCanvasBand(tCan, globalCMS1.getRightKeyColor(i,colorspaceModus), globalCMS1.getLeftKeyColor(i+1,colorspaceModus), tCan.width);

      //tCan.addEventListener("dragstart", createSide_BandOnDragStart);
      //tCan.addEventListener("dragend", createSide_BandOnDragEnd);

      tCan.onclick = (function(index) {
          return function() {
            if(showSideID==1)
              deleteBand(index);
          };
        })(i);


      if(showSideID == 1){
        // Dropplace
        // create drop place
        var tDiv = document.createElement('div');
        tDiv.id = 'dragPos' + i;
        tDiv.style.border = "3px solid red";
        tDiv.style.height = 100 + '%';
        tDiv.style.width = 100 + '%';
        tDiv.style.display = "none";
        //tDiv.style.visibility = "hidden";
        tDiv.style.lineHeight = "8vh";
        tDiv.style.fontSize = "2vh";
        tDiv.style.textAlign = "center";
        tDiv.style.verticalAlign = "middle";
        tDiv.innerHTML = "Here";

        tDiv.addEventListener("dragenter", bandOnEnter);
        tDiv.addEventListener("dragleave", bandOnLeave);
        //tDiv.addEventListener("drop dragdrop", createSide_BandOnDrop);

        tDiv.ondrop = function(event) {
          event.preventDefault();
          bandOnDrop();
        }; // allow Drop
        tDiv.ondragover = function(event) {
          event.preventDefault();
        }; // allow Drop

        sketchObject.appendChild(tDiv);
        dropPositionElements.push(tDiv);
        //tCan.addEventListener("click", bandOnClick);
        tCan.style.cursor = "pointer";
      }

      sketchObject.appendChild(tCan);
      droppedBandElements.push(tCan);


      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      var refLineDiv = document.createElement('div');
      refLineDiv.style.height = 100 + '%';
      refLineDiv.style.width = 100 + '%';
      refLineDiv.style.borderLeft = "1px solid black";

      //tDiv.style.visibility = "hidden";

      sketchRefObj.appendChild(refLineDiv);
      refLineSketchContainer.push(refLineDiv);


      /////////////////// draw ref /////////


      var box = sketchRefObj.getBoundingClientRect();

      var body = document.body;
      var docEl = document.documentElement;

      var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

      var clientTop = docEl.clientTop || body.clientTop || 0;
      var clientLeft = docEl.clientLeft || body.clientLeft || 0;

      var top = box.top + scrollTop - clientTop;
      var left = box.left + scrollLeft - clientLeft;


      var xposHTML = (i / (globalCMS1.getKeyLength()-1)) * box.width + left;
      var yposHTML = box.height + top;
      var tmpText = '' + globalCMS1.getRefPosition(i); //.toFixed(numDecimalPlaces);

      if(showSideID==1){

        var inputField = document.createElement("input");
        inputField.setAttribute('type', 'text');
        inputField.setAttribute('value', tmpText);
        var inputID = "id_SketchKeyValInput" + i;
        inputField.id = inputID;
        document.body.appendChild(inputField);

        //inputField.style.width = "min-content";
        inputField.style.width = "3vw";
        inputField.style.height = "2vh";
        inputField.style.fontSize = "1.8vh";
        //inputField.style.background = "rgb(255,255,255)";
        inputField.style.paddingLeft = 5 + "px";
        inputField.style.paddingRight = 5 + "px";
        //inputField.style.border = "2px solid rgb(0,0,0)";
        inputField.style.margin = "0px";
        inputField.style.zIndex = "2";

        inputField.style.position = "absolute";
        inputField.style.top = Math.round(yposHTML) + "px";
        inputField.style.left = Math.round(xposHTML) + "px";
        refLineSketchContainer.push(inputField);
        xposHTML = xposHTML - (inputField.getBoundingClientRect().width / 2);
        inputField.style.left = Math.round(xposHTML) + "px";

        inputField.onchange = (function(keyIndex, id) {
          return function() {

            switch (id) {
              case 0:
                changeKeyValueInput(keyIndex, id);
                break;
              default:
                changeKeyValueInput(keyIndex, id);
            }

          };
        })(i, inputID);

        inputField.onkeyup = (function(id) {
          return function() {

            var inputObj = document.getElementById(id);

            checkInputVal(inputObj, true, true);
          };
        })(inputID);

        /////////////////// special case: last element /////////
        if (i == globalCMS1.getKeyLength()-2) {
          refLineDiv.style.borderRight = "1px solid black";
          tmpText = '' + globalCMS1.getRefPosition(i+1); //.toFixed(numDecimalPlaces);
          xposHTML = box.width + left;
          var inputField2 = document.createElement("input");
          inputField2.setAttribute('type', 'text');
          inputField2.setAttribute('value', tmpText);
          var inputID = "id_SketchKeyValInput" + i + 1;
          inputField2.id = inputID;
          document.body.appendChild(inputField2);

          //inputField.style.width = "min-content";
          inputField2.style.width = "3vw";
          inputField2.style.height = "2vh";
          inputField2.style.fontSize = "1.8vh";
          //inputField.style.background = "rgb(255,255,255)";
          inputField2.style.paddingLeft = 5 + "px";
          inputField2.style.paddingRight = 5 + "px";
          //inputField.style.border = "2px solid rgb(0,0,0)";
          inputField2.style.margin = "0px";
          inputField2.style.zIndex = "2";

          inputField2.style.position = "absolute";
          inputField2.style.top = Math.round(yposHTML) + "px";
          inputField2.style.left = Math.round(xposHTML) + "px";
          refLineSketchContainer.push(inputField2);
          xposHTML = xposHTML - (inputField2.getBoundingClientRect().width / 2);
          inputField2.style.left = Math.round(xposHTML) + "px";

          inputField2.onchange = (function(keyIndex, id) {
            return function() {

              changeKeyValueInput(keyIndex, id);

            };
          })(i, inputID);

          inputField2.onkeyup = (function(id) {
            return function() {

              var inputObj = document.getElementById(id);

              checkInputVal(inputObj, true, true);
            };
          })(inputID);

        }
      }
      else{
        // no input fields !


        if(globalCMS1.getRefPosition(i).countDecimals()>2){
          tmpText = globalCMS1.getRefPosition(i).toFixed(2) + "..";
        }
        var inputField = document.createElement("p");
        inputField.innerHTML = tmpText;
        var inputID = "id_SketchKeyValInput" + i;
        inputField.id = inputID;
        document.body.appendChild(inputField);

        inputField.style.width = "min-content";
        //inputField.style.width = "3vw";
        inputField.style.height = "2vh";
        inputField.style.fontSize = "1.8vh";
        inputField.style.background = "rgb(255,255,255)";
        inputField.style.paddingLeft = 5 + "px";
        inputField.style.paddingRight = 5 + "px";
        //inputField.style.border = "1px solid rgb(0,0,0)";
        inputField.style.margin = "0px";
        inputField.style.zIndex = "2";

        inputField.style.position = "absolute";
        inputField.style.top = Math.round(yposHTML) + "px";
        inputField.style.left = Math.round(xposHTML) + "px";
        refLineSketchContainer.push(inputField);
        xposHTML = xposHTML - (inputField.getBoundingClientRect().width / 2);
        inputField.style.left = Math.round(xposHTML) + "px";


        /////////////////// special case: last element /////////
        if (i == globalCMS1.getKeyLength()-2) {
          refLineDiv.style.borderRight = "1px solid black";
          tmpText = globalCMS1.getRefPosition(i+1) + "";
          if(globalCMS1.getRefPosition(i+1).countDecimals()>2){
            tmpText = globalCMS1.getRefPosition(i+1).toFixed(2) + "..";
          }
          xposHTML = box.width + left;
          var inputField2 = document.createElement("p");
          inputField2.innerHTML = tmpText;
          var inputID = "id_SketchKeyValInput" + i + 1;
          inputField2.id = inputID;
          document.body.appendChild(inputField2);

          inputField2.style.width = "min-content";
          //inputField2.style.width = "3vw";
          inputField2.style.height = "2vh";
          inputField2.style.fontSize = "1.8vh";
          inputField2.style.background = "rgb(255,255,255)";
          inputField2.style.paddingLeft = 5 + "px";
          inputField2.style.paddingRight = 5 + "px";
          //inputField2.style.border = "1px solid rgb(0,0,0)";
          inputField2.style.margin = "0px";
          inputField2.style.zIndex = "2";

          inputField2.style.position = "absolute";
          inputField2.style.top = Math.round(yposHTML) + "px";
          inputField2.style.left = Math.round(xposHTML) + "px";
          refLineSketchContainer.push(inputField2);
          xposHTML = xposHTML - (inputField2.getBoundingClientRect().width / 2);
          inputField2.style.left = Math.round(xposHTML) + "px";
        }

      }
    }

    var t2Div = document.createElement('div');
    t2Div.id = 'dragPos' + (globalCMS1.getKeyLength()-1);
    t2Div.style.border = "3px solid red";
    t2Div.style.height = 99 + '%';
    t2Div.style.width = 100 + '%';
    t2Div.style.display = "none";
    t2Div.style.lineHeight = "8vh";
    t2Div.style.fontSize = "2vh";
    t2Div.style.textAlign = "center";
    t2Div.style.verticalAlign = "middle";
    t2Div.innerHTML = "Here";

    t2Div.addEventListener("dragenter", bandOnEnter);
    t2Div.addEventListener("dragleave", bandOnLeave);

    t2Div.ondrop = function(event) {
      event.preventDefault();
      bandOnDrop();
    }; // allow Drop
    t2Div.ondragover = function(event) {
      event.preventDefault();
    }; // allow Drop

    sketchObject.appendChild(t2Div);
    dropPositionElements.push(t2Div);


    if(showSideID == 3){
      tmpLength = tmpRect.width /(globalCMS2.getKeyLength()-1) - 1;
      sketchObject = document.getElementById("id_colormapSketch2");
      sketchRefObj = document.getElementById("id_colormapSketch_Ref2");
      editPage_drawKeys('id_createColormapKeys2', globalCMS2);

      for (var i = 0; i < globalCMS2.getKeyLength()-1; i++) {

        // create band
        var tCan = document.createElement('canvas');
        tCan.id = 'band' + i;

        tCan.style.border = "1px solid black";
        tCan.style.margin = "0px";
        tCan.setAttribute('draggable', true);

        sketchObject.appendChild(tCan);
        droppedBandElements.push(tCan);

        tCan.style.height = 100 + '%';
        tCan.style.maxWidth = tmpLength + "px"; //100 +'%';
        tCan.style.width = tmpLength + "px"; //100 +'%';

        drawCanvasBand(tCan, globalCMS2.getRightKeyColor(i, colorspaceModus), globalCMS2.getRightKeyColor(i+1, colorspaceModus), tCan.width);

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var refLineDiv = document.createElement('div');
        refLineDiv.style.height = 100 + '%';
        refLineDiv.style.width = 100 + '%';
        refLineDiv.style.borderLeft = "1px solid black";

        //tDiv.style.visibility = "hidden";

        sketchRefObj.appendChild(refLineDiv);
        refLineSketchContainer.push(refLineDiv);


        /////////////////// draw ref /////////
        var tmpText = '' + globalCMS2.getRefPosition(i); //.toFixed(numDecimalPlaces);

        var box = sketchRefObj.getBoundingClientRect();

        var body = document.body;
        var docEl = document.documentElement;

        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

        var clientTop = docEl.clientTop || body.clientTop || 0;
        var clientLeft = docEl.clientLeft || body.clientLeft || 0;

        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;


        var xposHTML = ((i) / (globalCMS2.getKeyLength()-1)) * box.width + left;
        var yposHTML = box.height + top;

        var inputField = document.createElement("p");
        inputField.innerHTML = tmpText;
        var inputID = "id_SketchKeyValInput" + i;
        inputField.id = inputID;
        document.body.appendChild(inputField);

        inputField.style.width = "min-content";
        //inputField.style.width = "3vw";
        inputField.style.height = "2vh";
        inputField.style.fontSize = "1.8vh";
        inputField.style.background = "rgb(255,255,255)";
        inputField.style.paddingLeft = 5 + "px";
        inputField.style.paddingRight = 5 + "px";
        //inputField.style.border = "1px solid rgb(0,0,0)";
        inputField.style.margin = "0px";
        inputField.style.zIndex = "2";

        inputField.style.position = "absolute";
        inputField.style.top = Math.round(yposHTML) + "px";
        inputField.style.left = Math.round(xposHTML) + "px";
        refLineSketchContainer.push(inputField);
        xposHTML = xposHTML - (inputField.getBoundingClientRect().width / 2);
        inputField.style.left = Math.round(xposHTML) + "px";


        /////////////////// special case: last element /////////
        if (i == globalCMS2.getKeyLength()-2) {
          refLineDiv.style.borderRight = "1px solid black";
          tmpText = '' + globalCMS2.getRefPosition(i+1); //.toFixed(numDecimalPlaces);
          xposHTML = box.width + left;
          var inputField2 = document.createElement("p");
          inputField2.innerHTML = tmpText;
          var inputID = "id_SketchKeyValInput" + i + 1;
          inputField2.id = inputID;
          document.body.appendChild(inputField2);

          inputField2.style.width = "min-content";
          //inputField2.style.width = "3vw";
          inputField2.style.height = "2vh";
          inputField2.style.fontSize = "1.8vh";
          inputField2.style.background = "rgb(255,255,255)";
          inputField2.style.paddingLeft = 5 + "px";
          inputField2.style.paddingRight = 5 + "px";
          //inputField2.style.border = "1px solid rgb(0,0,0)";
          inputField2.style.margin = "0px";
          inputField2.style.zIndex = "2";

          inputField2.style.position = "absolute";
          inputField2.style.top = Math.round(yposHTML) + "px";
          inputField2.style.left = Math.round(xposHTML) + "px";
          refLineSketchContainer.push(inputField2);
          xposHTML = xposHTML - (inputField2.getBoundingClientRect().width / 2);
          inputField2.style.left = Math.round(xposHTML) + "px";
        }

      }

    }


  } else {

    var t2Div = document.createElement('div');
    t2Div.id = 'dragPos0';
    t2Div.style.border = "2px dashed black";
    t2Div.style.height = 100 + '%';
    t2Div.style.width = 100 + '%';
    t2Div.style.lineHeight = "8vh";
    t2Div.style.fontSize = "4vh";
    t2Div.style.textAlign = "center";
    t2Div.style.verticalAlign = "middle";
    //t2Div.style.color = "red";


    var canvasObject = document.getElementById("id_createColormapKeys");
    var canvasContex = canvasObject.getContext("2d");
    canvasContex.clearRect(0, 0, canvasObject.width, canvasObject.height);


    if(showSideID==1){
      t2Div.innerHTML = "Drop one or more bands here!";
      document.getElementById("id_LinearMap_Table_Div").style.display = "none";
    }
    else
    t2Div.innerHTML = "MyDesigns List is empty! Visit the Section Gallery or New.";

    t2Div.addEventListener("dragenter", bandOnEnter);
    t2Div.addEventListener("dragleave", bandOnLeave);

    t2Div.ondrop = function(event) {
      event.preventDefault();
      bandOnDrop();
    }; // allow Drop
    t2Div.ondragover = function(event) {
      event.preventDefault();
    }; // allow Drop

    sketchObject.appendChild(t2Div);
    dropPositionElements.push(t2Div);

  }


}

function changeKeyValueInput(keyIndex, fielID) {

  var inputObj = document.getElementById(fielID);

  checkInputVal(inputObj, true, true);

  var newRef = parseFloat(inputObj.value);

  globalCMS1.setRefPosition(keyIndex,newRef)

  orderColorSketch(); // for updating ref and linear colormap


}


function fillTable() {

  var old_tbody = document.getElementById("id_tableBody");
  var new_tbody = document.createElement('tbody');

  //fill table

  for (i = 0; i < globalCMS1.getKeyLength()-1; i++) {
    var tr = document.createElement('tr');

    var td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(i + 1));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(globalCMS1.getRefPosition(i)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(globalCMS1.getRefPosition(i+1)));
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


    tr.appendChild(td);
    tr.appendChild(td2);

    new_tbody.appendChild(tr);

  }

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
  new_tbody.id = "id_tableBody";
}
