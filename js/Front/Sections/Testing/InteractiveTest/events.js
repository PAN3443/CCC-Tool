//////////////////////////////////////////////////////////////////////////////
////////////// Add New Test Part
//////////////


function initNewTest() {

  document.getElementById("id_TestPage_Dimension_Div").style.display="none";

  document.getElementById("id_TestPage_NewTest_JumpDiv").style.display="none";

  document.getElementById("id_TestPage_YFctType_Div").style.display="none";
  document.getElementById("id_TestPage_NewTest_D1").style.display="none";
  document.getElementById("id_TestPage_NewTest_D2").style.display="none";
  document.getElementById("id_TestPage_NewTest_D3").style.display="none";
  document.getElementById("id_TestPage_NewTest_D4").style.display="none";
  document.getElementById("id_TestPage_XFctType_Div").style.display="none";

  document.getElementById("id_TestPage_FctSelection_Div").style.display="none";


  document.getElementById("id_TestPage_fitToCMS_Div").style.display="none";

  document.getElementById("id_TestPage_newTestInfoText").innerHTML="";
  document.getElementById("id_TestPage_newTestInfoText").style.display="none";


  document.getElementById("id_TestPage_doRatioCheckbox").disabled = false;
  document.getElementById("id_TestPage_doRatioCheckbox").checked = false;
  document.getElementById("id_TestPage_doRatioLabel").style.color = "black";


  document.getElementById("id_TestPage_NewTest_I1").min=undefined;
  document.getElementById("id_TestPage_NewTest_I2").min=undefined;
  document.getElementById("id_TestPage_NewTest_I3").min=undefined;
  document.getElementById("id_TestPage_NewTest_I4").min=undefined;

  document.getElementById("id_TestPage_NewTest_I1").max=undefined;
  document.getElementById("id_TestPage_NewTest_I2").max=undefined;
  document.getElementById("id_TestPage_NewTest_I3").max=undefined;
  document.getElementById("id_TestPage_NewTest_I4").max=undefined;

  document.getElementById("id_TestPage_NewTest_I1").step="any";
  document.getElementById("id_TestPage_NewTest_I2").step="any";
  document.getElementById("id_TestPage_NewTest_I3").step="any";
  document.getElementById("id_TestPage_NewTest_I4").step="any";


  if(testmappingMesh!=undefined){
    testmappingMesh.visible = false;
    testmappingMeshGrey.visible = false;
  }
}

function selectNewTestType(){

  initNewTest();

  switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
    case 0:
        selectNewJumpTestType();
      break;
    case 1:
        selectNewGradientTestType();
      break;
    case 2:
       selectNewRidgeValleyTestType();
      break;
    case 3:
      selectNewExtremaTestType();
      break;
    case 4:
      selectNewFrequencyTestType();
      break;
      case 5:
        selectNewLittleBitTestType();
        break;
        case 6:
          selectNewTresholdTestType();
          break;
          case 7:
            selectNewFctLocalMinimaType();
            break;
            case 8:
              selectNewFctBowlShapedType();
              break;
              case 9:
                selectNewFctValleyShapedType();
                break;




    default:
      document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 0;
      selectNewTestType();

  }
}


function newTest_switchRatioType(){

  switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
    case 0:
      // Jumps
        updateJumpTestVariables();
      break;
    case 1:
      // Gradient
        selectNewGradientTestType();
      break;
    case 2:
      // Ridge & Valley
       selectNewRidgeValleyTestType();
      break;
    case 3:
      // Local Extrema
        updateExtremaTestVariables();
      break;
    case 4:
      // Frequency
      selectNewFrequencyTestType();
      break;
      case 5:
        // Little Bit
        switchRatioType_LittleBitTest();
        break;
        case 6:
          // Treshold
          switchRatioType_TresholdTest();
          break;
    default:
      document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 0;
      selectNewTestType();

  }
}

function updateTestVariables(){

  if (usertestWorkerfinished == false) {

    if (usertestWorker != undefined)
      usertestWorker.terminate();

    usertestWorkerfinished = true;
  }

  switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
    case 1:
          updateGradientTestVariables();
      break;
    case 2:
          updateRidgeValleyTestVariables();
      break;
    case 3:
          updateExtremaTestVariables();
          break;
    case 4:
          updateFrequencyTestVariables();
      break;
      case 5:
            updateLittleBitTestVariables();
        break;
        case 6:
            updateTresholdTestVariables();
          break;
          case 7:
              updateFctLocalMinimaTestVariables();
            break;
            case 8:
                updateFctBowlShapedTestVariables();
              break;
              case 9:
                  updateFctValleyShapedTestVariables();
                break;



  }
}


function updateFunctionSelection(){
  switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
          case 7:
              updateLocalMinimaFctSelection();
            break;
            case 8:
                updateBowlShapedFctSelection();
              break;
              case 9:
                  updateValleyShapedFctSelection();
                break;
  }
}

function check_xFktType(){


  if(document.getElementById("id_TestPage_NewTest_XType1").checked)
    current_xFktType=0;

    if(document.getElementById("id_TestPage_NewTest_XType2").checked)
      current_xFktType=1;

      if(document.getElementById("id_TestPage_NewTest_XType3").checked)
        current_xFktType=2;

}

function check_yFktType(){

  if(document.getElementById("id_TestPage_NewTest_YType1").checked)
    current_yFktType=0;

    if(document.getElementById("id_TestPage_NewTest_YType2").checked)
      current_yFktType=1;

      if(document.getElementById("id_TestPage_NewTest_YType3").checked)
        current_yFktType=2;

}
