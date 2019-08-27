

function init_events_EditPage(){


  var editCMSElement = document.getElementById('id_EditPage_CMSVisCanvas');
  editCMSElement.addEventListener("dragenter", cmsStructureOnEnter);
  editCMSElement.addEventListener("dragleave", cmsStructureOnLeave);
  //editCMSElement.addEventListener("drop dragdrop", createSide_cmsStructureOnDrop);
  editCMSElement.addEventListener("mousemove", editCMS_MouseMove);
  editCMSElement.addEventListener("click", editCMS_MouseClick);

  editCMSElement.ondrop = function(event) {
    event.preventDefault();
    cmsStructureOnDrop();
  }; // allow Drop

  editCMS_dragOver_LastKey = -1;
  editCMS_dragOver_DrawGlobalCMS = false;
  editCMSElement.ondragover = function(event) {
    event.preventDefault();

    event = event || window.event;
    //var dragX = event.pageX, dragY = event.pageY;

        if(globalCMS1.getKeyLength()!=0){



          var rect = event.target.getBoundingClientRect();
          var canvasPosX = event.clientX - rect.left;
          var canvasPosY = event.clientY - rect.top;
          var ratioToColorspaceResolutionX = event.target.width / rect.width;
          var ratioToColorspaceResolutionY = event.target.height / rect.height;
          mousePosX = canvasPosX * ratioToColorspaceResolutionX;
          mousePosY = canvasPosY * ratioToColorspaceResolutionY;

          /// Are we between Linear Key Start and Linear CMS End?
          var keyIndex = undefined;
          if(around_LinearCMSVis_yPosition()){
            keyIndex = getClosest_linearKey();
          }
          else if(around_SketchCMSVis_yPosition()){
            keyIndex = getClosest_sketchKey();
          }

          if(keyIndex!=undefined){

            if(keyIndex!=editCMS_dragOver_LastKey){

              workCMS_Edit = cloneCMS(globalCMS1);
              switch(dragPredefinedBandType){
                    case 0:
                            // ->const

                                // band at the end
                                switch (keyIndex) {
                                  case workCMS_Edit.getKeyLength()-1:
                                    // case constant
                                    var tmpVal = workCMS_Edit.getRefPosition(indexOfDroppedPlace);
                                    var dist = Math.abs(tmpVal-workCMS_Edit.getRefPosition(indexOfDroppedPlace-1));
                                    workCMS_Edit.setRefPosition(indexOfDroppedPlace,tmpVal-dist*0.5);
                                    workCMS_Edit.pushKey(new class_Key(constBands[dragPredefinedBandIndex],undefined,tmpVal,true)); // push left key
                                    break;

                                  default:
                                    var startPos = workCMS_Edit.getRefPosition(indexOfDroppedPlace);
                                    var endPos = (startPos+Math.abs(workCMS_Edit.getRefPosition(indexOfDroppedPlace+1)-startPos)*0.5);

                                    ///////////
                                    ///// split key
                                    workCMS_Edit.setRefPosition(indexOfDroppedPlace,endPos);
                                    workCMS_Edit.setBur(indexOfDroppedPlace,true);
                                    // case constant add Keys
                                    var oldColor = workCMS_Edit.getLeftKeyColor(indexOfDroppedPlace,"lab");
                                    workCMS_Edit.setLeftKeyColor(indexOfDroppedPlace,constBands[dragPredefinedBandIndex]); // create left key
                                    workCMS_Edit.insertKey(indexOfDroppedPlace, new class_Key(oldColor,undefined,startPos,true));

                                }


                    break;

                    case 1:
                          // -> myDesign CMS
                          workCMS_Edit.insertCMS(myDesignsList[currentPredefinedId], keyIndex);
                    break;
                    case 2:

                      var tmpCMS;
                      switch (currentPredefinedType) {
                        case 0:
                            tmpCMS = cmsYellowColormaps[currentPredefinedId];
                          break
                          case 1:
                            tmpCMS = cmsBlueColormaps[currentPredefinedId];
                            break
                            case 2:
                              tmpCMS = cmsRedPurpleColormaps[currentPredefinedId];
                              break
                              case 3:
                                tmpCMS = cmsGreenColormaps[currentPredefinedId];
                                break
                                case 4:
                                tmpCMS = cmsBrownColormaps[currentPredefinedId];
                                  break
                                  case 5:
                                  tmpCMS = cmsDivergentColormaps[currentPredefinedId];
                                    break
                                    case 6:
                                    tmpCMS = cmsThreeBandColormaps[currentPredefinedId];
                                      break
                                      case 7:
                                        tmpCMS = cmsFourBandColormaps[currentPredefinedId];
                                        break

                      default:
                        return;
                    }

                      workCMS_Edit.insertCMS(tmpCMS, keyIndex);
                    break;

                }

                editCMS_dragOver_LastKey=keyIndex;
                editCMS_dragOver_DrawGlobalCMS=false;
                editCMS_AllowDrop = true;
                drawEditCMSVIS(workCMS_Edit,[]);

          }
        }
        else{
          editCMS_AllowDrop=false;
          if(editCMS_dragOver_DrawGlobalCMS==false){
            drawEditCMSVIS(globalCMS1,[]);
            editCMS_dragOver_LastKey=-1;
            editCMS_dragOver_DrawGlobalCMS=true;
          }
        }

      }


  }; // allow Drop*/


  // Ref Change Key Rects
  /*document.getElementById('id_EditPage_CMS_VIS_LinearKeys').addEventListener("mouseenter", mouseEnterKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_LinearKeys').addEventListener("mouseleave", mouseLeaveKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_LinearKeys').addEventListener("mousemove", mouseMoveKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_LinearKeys').addEventListener("mousedown", mouseDownKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_LinearKeys').addEventListener("mouseup", mouseUpKeyRef);

  document.getElementById('id_EditPage_CMS_VIS_KeyBurs').addEventListener("mouseenter", mouseEnterKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_KeyBurs').addEventListener("mouseleave", mouseLeaveKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_KeyBurs').addEventListener("mousemove", mouseMoveKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_KeyBurs').addEventListener("mousedown", mouseDownKeyRef);
  document.getElementById('id_EditPage_CMS_VIS_KeyBurs').addEventListener("mouseup", mouseUpKeyRef);*/

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

    /*document.getElementById("id_selectMainProbeSetList").onchange = function (){
      var tmpCMS = globalCMS1.getProbeSet(document.getElementById("id_selectMainProbeSetList").selectedIndex).generateProbeCMS(globalCMS1);

      drawCanvasColormap("id_EditPage_CMS_VIS_PreviewProbe", tmpCMS);
    };*/


    document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").onchange = function (){
      updateAnalyzeCompareKeyIndex("id_EditPage_SelectFrom_GlobalLocalOrder","id_EditPage_SelectTill_GlobalLocalOrder");
    };

    document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").onchange = function (){
      updateAnalyzeCompareKeyIndex("id_EditPage_SelectFrom_GlobalLocalOrder","id_EditPage_SelectTill_GlobalLocalOrder");
    };


    document.getElementById("id_EditPage_InputFixedAxis_GlobalLocalOrder").addEventListener("change", updateAnalyze);
    document.getElementById("id_EditPage_DoFixedAxis_GlobalLocalOrder").addEventListener("change", updateAnalyze);
    document.getElementById("id_AnalyzeSubContainer_Select").addEventListener("change", updateAnalyze);
    document.getElementById("id_EditPage_DoLogSelect_GlobalLocalOrder").addEventListener("change", updateAnalyze);

    document.getElementById("id_EditPage_SelectAnalyzePlot").addEventListener("change", updateAnalyze);

    document.getElementById("id_editPage_Anaylze_IntervalCalcInput").addEventListener("change", changeAnalyzeIntervalInput);
    document.getElementById("id_editPage_Anaylze_IntervalNumber").addEventListener("change", changeAnalyzeIntervalCalculation);
    document.getElementById("id_editPage_Anaylze_IntervalColorDifference").addEventListener("change", changeAnalyzeIntervalCalculation);
    document.getElementById("id_editPage_Anaylze_IntervalNumber").checked=true;


}
