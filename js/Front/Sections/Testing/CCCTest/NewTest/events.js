//////////////////////////////////////////////////////////////////////////////
////////////// Add New Test Part
//////////////

function addNewTest() {

  var newSelectedIndex = undefined;
  switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
    case 0:
      // Jumps
        if(cccTest_NewJump_Options[1].length<2){
          openAlert("Attention".bold()+": The jump set needs at least two jump elements! Please edit the jump set befor adding a new jump-test to the test-list or press cancel and go back to the test list.");
          return;
        }
        var tmpArray = [];
        tmpArray.push(cccTest_NewJump_Options[0]);
        var tmpArray2 = [];
        for (var i = 0; i < cccTest_NewJump_Options[1].length; i++) {
          tmpArray2.push(cccTest_NewJump_Options[1][i])
        }
        tmpArray.push(tmpArray2);
        cccTest_Jumps_Options.push(tmpArray);
        newSelectedIndex = cccTest_Jumps_Options.length-1;
      break;
    case 1:
      // Gradient
      var tmpArray = [];
      for (var i = 0; i < cccTest_NewGradient_Options.length; i++) {
        tmpArray.push(cccTest_NewGradient_Options[i])
      }
      cccTest_Gradient_Options.push(tmpArray);
      newSelectedIndex = cccTest_Jumps_Options.length+cccTest_Gradient_Options.length-1;
      break;
    case 2:
      // Ridge & Valley
      var tmpArray = [];
      for (var i = 0; i < cccTest_NewRidgeValley_Options.length; i++) {
        tmpArray.push(cccTest_NewRidgeValley_Options[i])
      }
      cccTest_RidgeValleyLine_Options.push(tmpArray);
      newSelectedIndex = cccTest_Jumps_Options.length+cccTest_Gradient_Options.length+cccTest_RidgeValleyLine_Options.length-1;
      break;
    case 3:
      // Local Extrema
      var tmpArray = [];
      for (var i = 0; i < cccTest_NewLocalExtrema_Options.length; i++) {
        tmpArray.push(cccTest_NewLocalExtrema_Options[i])
      }
      cccTest_LocalExtrema_Options.push(tmpArray);
      newSelectedIndex = cccTest_Jumps_Options.length+cccTest_Gradient_Options.length+cccTest_RidgeValleyLine_Options.length+cccTest_LocalExtrema_Options.length-1;
      break;
    case 4:
      // Frequency
      var tmpArray = [];
      for (var i = 0; i < cccTest_NewFrequency_Options.length; i++) {
        tmpArray.push(cccTest_NewFrequency_Options[i])
      }
      cccTest_Frequency_Options.push(tmpArray);
      newSelectedIndex = cccTest_Jumps_Options.length+cccTest_Gradient_Options.length+cccTest_RidgeValleyLine_Options.length+cccTest_LocalExtrema_Options.length+cccTest_Frequency_Options.length-1;
      break;
      case 5:
        // Little Bit
        var tmpArray = [];
        for (var i = 0; i < cccTest_NewLittleBit_Options.length; i++) {
          tmpArray.push(cccTest_NewLittleBit_Options[i])
        }
        cccTest_LittleBit_Options.push(tmpArray);
        newSelectedIndex = cccTest_Jumps_Options.length+cccTest_Gradient_Options.length+cccTest_RidgeValleyLine_Options.length+cccTest_LocalExtrema_Options.length+cccTest_Frequency_Options.length+cccTest_LittleBit_Options.length-1;
        break;
        case 6:
          // Treshold
          var tmpArray = [];
          for (var i = 0; i < cccTest_NewTreshold_Options.length; i++) {
            tmpArray.push(cccTest_NewTreshold_Options[i])
          }
          cccTest_Treshold_Options.push(tmpArray);
          newSelectedIndex = cccTest_Jumps_Options.length+cccTest_Gradient_Options.length+cccTest_RidgeValleyLine_Options.length+cccTest_LocalExtrema_Options.length+cccTest_Frequency_Options.length+cccTest_LittleBit_Options.length+cccTest_Treshold_Options.length-1;
          break;
  }


  showTestSet();
  document.getElementById("id_TestPage_UserTest_List").selectedIndex = newSelectedIndex;
  //startCCCTest();
}



function initNewTest() {

  document.getElementById("id_Testing_TestSets").style.display = "none";
  document.getElementById("id_Testing_NewTestSets").style.display = "block";

  selectNewTestType();
}

function selectNewTestType(){

  document.getElementById("id_TestPage_Dimension_Div").style.display="none";

  document.getElementById("id_TestPage_NewTest_JumpDiv").style.display="none";

  document.getElementById("id_TestPage_YFctType_Div").style.display="none";
  document.getElementById("id_TestPage_NewTest_D1").style.display="none";
  document.getElementById("id_TestPage_NewTest_D2").style.display="none";
  document.getElementById("id_TestPage_NewTest_D3").style.display="none";
  document.getElementById("id_TestPage_NewTest_D4").style.display="none";
  document.getElementById("id_TestPage_XFctType_Div").style.display="none";

  document.getElementById("id_TestPage_fitToCMS_Div").style.display="none";

  document.getElementById("id_TestPage_newTestInfoText").innerHTML="";
  document.getElementById("id_TestPage_newTestInfoText").style.display="none";


  document.getElementById("id_TestPage_doRatioCheckbox").disabled = false;
  document.getElementById("id_TestPage_doRatioCheckbox").checked = false;

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


  switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
    case 0:
      // Jumps
        selectNewJumpTestType();
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
      selectNewExtremaTestType();
      break;
    case 4:
      // Frequency
      selectNewFrequencyTestType();
      break;
      case 5:
        // Little Bit
        selectNewLittleBitTestType();
        break;
        case 6:
          // Treshold
          selectNewTresholdTestType();
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
      // Gradient
          updateGradientTestVariables();
      break;
    case 2:
        // Ridge & Valley
          updateRidgeValleyTestVariables();
      break;
    case 3:
          updateExtremaTestVariables();
          break;
    case 4:
        // Frequency
          updateFrequencyTestVariables();
      break;
      case 5:
          // Little Bit
            updateLittleBitTestVariables();
        break;
        case 6:
            // Treshold
            updateTresholdTestVariables();
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
