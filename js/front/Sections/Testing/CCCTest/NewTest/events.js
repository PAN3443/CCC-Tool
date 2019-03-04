//////////////////////////////////////////////////////////////////////////////
////////////// Add New Test Part
//////////////

function addNewTest() {

  switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
    case 0:
      // Jumps
        cccTest_Jumps_Options.push(cccTest_NewJump_Options);
      break;
    case 1:
      // Gradient

      break;
    case 2:
      // Ridge & Valley

      break;
    case 3:
      // Local Extrema

      break;
    case 4:
      // Frequency

      break;
  }


  showTestSet();
}



function initNewTest() {

  document.getElementById("id_Testing_TestSets").style.display = "none";
  document.getElementById("id_Testing_NewTestSets").style.display = "block";

  selectNewTestType();
}

function selectNewTestType(){

  document.getElementById("id_TestPage_Dimension_Div").style.display="none";

  document.getElementById("id_TestPage_NewTest_JumpDiv").style.display="none";

  document.getElementById("id_TestPage_MType_Div").style.display="none";
  document.getElementById("id_TestPage_NewTest_D1").style.display="none";
  document.getElementById("id_TestPage_NewTest_D2").style.display="none";
  document.getElementById("id_TestPage_NewTest_D3").style.display="none";
  document.getElementById("id_TestPage_NewTest_D4").style.display="none";
  document.getElementById("id_TestPage_mType_Div").style.display="none";

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
    case 4:
        // Frequency
          updateFrequencyTestVariables();


      break;

  }
}
