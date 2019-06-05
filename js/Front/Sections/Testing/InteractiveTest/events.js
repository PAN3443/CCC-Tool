//////////////////////////////////////////////////////////////////////////////
////////////// Add New Test Part
//////////////

function initNewTest() {

  document.getElementById("id_TestPage_Dimension_Div").style.display = "none";

  document.getElementById("id_TestPage_NewTest_JumpDiv").style.display = "none";

  document.getElementById("id_TestPage_YFctType_Div").style.display = "none";
  document.getElementById("id_TestPage_NewTest_D1").style.display = "none";
  document.getElementById("id_TestPage_NewTest_D2").style.display = "none";
  document.getElementById("id_TestPage_NewTest_D3").style.display = "none";
  document.getElementById("id_TestPage_NewTest_D4").style.display = "none";
  document.getElementById("id_TestPage_NewTest_D5").style.display = "none";

  document.getElementById("id_TestPage_XFctType_Div").style.display = "none";
  document.getElementById("id_TestPage_NewTest_TopologyDiv1").style.display = "none";
  document.getElementById("id_TestPage_NewTest_TopologyDiv2").style.display = "none";
  document.getElementById("id_NewTest_TopologySubDivOptionDiv").style.display = "none";
  document.getElementById("id_TestPage_newTestAcknowledgmentsDiv").style.display = "none";


  document.getElementById("id_TestPage_FctSelection_Div").style.display = "none";
  document.getElementById("id_TestPage_newTestNoiseDiv").style.display = "block";

  document.getElementById("id_TestPage_fitToCMS_Div").style.display = "none";

  document.getElementById("id_TestPage_newTestInfoText").innerHTML = "";
  document.getElementById("id_TestPage_newTestInfoText").style.display = "none";

  document.getElementById("id_TestPage_GridDimX").disabled = false;
  document.getElementById("id_TestPage_GridDimY").disabled = false;

  document.getElementById("id_TestPage_GridDimXLabel").style.color = "black";
  document.getElementById("id_TestPage_GridDimYLabel").style.color = "black";

  document.getElementById("id_TestPage_GridDimX").style.color = "black";
  document.getElementById("id_TestPage_GridDimY").style.color = "black";

  document.getElementById("id_TestPage_doRatioCheckbox").disabled = false;
  document.getElementById("id_TestPage_doRatioCheckbox").checked = false;
  document.getElementById("id_TestPage_doRatioLabel").style.color = "black";


  document.getElementById("id_TestPage_NewTest_I1").min = undefined;
  document.getElementById("id_TestPage_NewTest_I2").min = undefined;
  document.getElementById("id_TestPage_NewTest_I3").min = undefined;
  document.getElementById("id_TestPage_NewTest_I4").min = undefined;

  document.getElementById("id_TestPage_NewTest_I1").max = undefined;
  document.getElementById("id_TestPage_NewTest_I2").max = undefined;
  document.getElementById("id_TestPage_NewTest_I3").max = undefined;
  document.getElementById("id_TestPage_NewTest_I4").max = undefined;

  document.getElementById("id_TestPage_NewTest_I1").disabled = false;
  document.getElementById("id_TestPage_NewTest_I2").disabled = false;
  document.getElementById("id_TestPage_NewTest_I3").disabled = false;
  document.getElementById("id_TestPage_NewTest_I4").disabled = false;

  document.getElementById("id_TestPage_NewTest_I1").step = "any";
  document.getElementById("id_TestPage_NewTest_I2").step = "any";
  document.getElementById("id_TestPage_NewTest_I3").step = "any";
  document.getElementById("id_TestPage_NewTest_I4").step = "any";

  document.getElementById("id_TestPage_NewTest_subDiv1").style.display = "block";
  document.getElementById("id_TestPage_NewTest_subDiv2").style.display = "none";

  if (testmappingMesh != undefined) {
    testmappingMesh.visible = false;
    testmappingMeshGrey.visible = false;
  }

}



function addTestToReport() {

  var testLabel = "";
  var testSublabel = "";
  var optionList = [];

  switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
    case 0:
      testLabel = "CCCTest";
      testSublabel = "Jump";
      optionList = copyOptions(cccTest_NewJump_Options);
      break;
    case 1:
      testLabel = "CCCTest";
      testSublabel = "Gradient";
      optionList = copyOptions(cccTest_NewGradient_Options);
      break;
    case 2:
      testLabel = "CCCTest";
      testSublabel = "RiVa";
      optionList = copyOptions(cccTest_NewRidgeValley_Options);
      break;
    case 3:
      testLabel = "CCCTest";
      testSublabel = "Extrema";
      optionList = copyOptions(cccTest_NewLocalExtrema_Options);
      break;
    case 4:
      testLabel = "CCCTest";
      testSublabel = "Frequency";
      optionList = copyOptions(cccTest_NewFrequency_Options);
      break;
    case 5:
      testLabel = "CCCTest";
      testSublabel = "LittleBit";
      optionList = copyOptions(cccTest_NewLittleBit_Options);
      break;
    case 6:
      testLabel = "CCCTest";
      testSublabel = "Treshold";
      optionList = copyOptions(cccTest_NewTreshold_Options);
      break;
    case 7:
      testLabel = "CCCTest";
      testSublabel = "Topology";
      optionList = copyOptions(cccTest_NewTopology_Options);
      break;
      /////////////////////////////////////
    case 8:
      testLabel = "Collection";
      testSublabel = fctTest_NewLocalMin_Options[1];
      optionList = copyOptions(fctTest_NewLocalMin_Options);
      break;
    case 9:
      testLabel = "Collection";
      testSublabel = fctTest_NewBowlShaped_Options[1];
      optionList = copyOptions(fctTest_NewBowlShaped_Options);
      break;
    case 10:
      testLabel = "Collection";
      testSublabel = fctTest_NewValleyShaped_Options[1];
      optionList = copyOptions(fctTest_NewValleyShaped_Options);
      break;
      /////////////////////////////////////
    case 11:
    case 12:
    case 13:
      testLabel = "RealData";
      testSublabel = selectedRealWorldType;
      optionList = selectedID;
      break;
  }
  reportListTestInfo.push([testLabel,testSublabel,optionList]);
  reportListTestField.push(undefined);
  request_Worker_Testfield(reportListTestField.length-1);
  // switch to report page at the event, when the worker has send the testfield to the main thread

}

function copyOptions(options) {
  var newOptions = [];
  for (var i = 0; i < options.length; i++) {
    if (Array.isArray(options[i])) {
      newOptions.push(copyOptions(options[i]));
    } else {
      var tmp = options[i];
      newOptions.push(tmp);
    }
  }
  return newOptions;
}

function selectNewTestType() {

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
      selectNewTopologyTestType();
      break;

      /////////////////////////////////////
    case 8:
      selectNewFctLocalMinimaType();
      break;
    case 9:
      selectNewFctBowlShapedType();
      break;
    case 10:
      selectNewFctValleyShapedType();
      break;

      /////////////////////////////////////
    case 11:
      selectedRealWorldType = "medical";
      selectRealWorldType(0);
      break;
    case 12:
      selectedRealWorldType = "scientificFlowSim";
      selectRealWorldType(0);
      break;
    case 13:
      selectedRealWorldType = "photographs";
      selectRealWorldType(0);
      break;



    default:
      document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 0;
      selectNewTestType();

  }
}

function newTest_switchRatioType() {

  switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
    case 0:
      // Jumps
      updateJumpTestVariables();
      break;
    case 1:
      // Gradient
      switchRatioType_GradientTest();
      break;
    case 2:
      // Ridge & Valley
      switchRatioType_RidgeValleyTest();
      break;
      /*case 3:
        // Local Extrema
          updateExtremaTestVariables();
        break;*/
    case 4:
      // Frequency
      switchRatioType_FrequencyTest();
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

function updateTestVariables() {

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
      updateTopologyTestVariables();
      break;

      ///////////////////////////////////////////////
    case 8:
      updateFctLocalMinimaTestVariables();
      break;
    case 9:
      updateFctBowlShapedTestVariables();
      break;
    case 10:
      updateFctValleyShapedTestVariables();
      break;

      /////////////////////////////////////////////////
    case 11:
    case 12:
    case 13:
      updateRealWorldVariables();
      break;



  }


}

function updateFunctionSelection() {
  switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
    case 8:
      updateLocalMinimaFctSelection();
      break;
    case 9:
      updateBowlShapedFctSelection();
      break;
    case 10:
      updateValleyShapedFctSelection();
      break;
      /////////////////////////////////////////////////
    case 11:
    case 12:
    case 13:
      updateRealWorldVariables();
      break;
  }
}



function updateTestVis() {

  stopAnimationTestMapping();
  document.getElementById("id_Test_PixelCanvas").style.display = "none";
  document.getElementById("id_Test_PixelCanvasGrey").style.display = "none";
  document.getElementById("id_Test_MeshVisDiv").style.display = "none";
  document.getElementById("id_Test_MeshVisDivGrey").style.display = "none";

  document.getElementById("id_TestPage_HightmapButton").style.display = "none";
  document.getElementById("id_Test_showBoundingBox").style.display = "none";
  document.getElementById("id_Test_showHideAxis").style.display = "none";
  document.getElementById("id_Test_MeshVisOptions").style.display = "none";

  document.getElementById("id_TestFull_PixelVis").style.display = "none";
  document.getElementById("id_TestFull_MeshVis").style.display = "none";


  if (document.getElementById("id_TestVisualization_Mesh").checked) {
    document.getElementById("id_Test_MeshVisDiv").style.display = "block";
    document.getElementById("id_Test_MeshVisDivGrey").style.display = "block";

    document.getElementById("id_Test_showBoundingBox").style.display = "block";
    document.getElementById("id_Test_showHideAxis").style.display = "block";
    document.getElementById("id_Test_MeshVisOptions").style.display = "flex";
    document.getElementById("id_TestPage_HightmapButton").style.display = "block";
    document.getElementById("id_TestFull_MeshVis").style.display = "flex";
    startAnimationTestMapping();
  } else {
    document.getElementById("id_Test_PixelCanvas").style.display = "block";
    document.getElementById("id_Test_PixelCanvasGrey").style.display = "block";
    document.getElementById("id_TestFull_PixelVis").style.display = "flex";
  }

  inform_Worker_GetVisualisation();
}

function downloadTestImage() {

  var testing_ImgData = undefined;
  if (document.getElementById("id_TestVisualization_Mesh").checked) {
    stopAnimationTestMapping();
    var oldSize = testmapping_renderer.getSize();
    testmapping_renderer.setSize(2160, 2160);
    testmapping_renderer.preserveDrawingBuffer = true;
    testmapping_renderer.render(testmapping_scene, testmapping_camera);
    testing_ImgData = testmapping_renderer.domElement.toDataURL();
    testmapping_renderer.preserveDrawingBuffer = false;
    testmapping_renderer.setSize(oldSize.width, oldSize.height);
    startAnimationTestMapping();
  } else {

    var canvasID = "id_Test_PixelCanvas";

    if (document.getElementById("id_PopUp_fullTestingWindow").style.display != "none")
      var canvasID = "id_Test_PixelCanvasFull"

    testing_ImgData = document.getElementById(canvasID).toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

  }

  this.href = testing_ImgData;
}

function downloadTestImageGrey() {

  var testing_ImgData = undefined;
  if (document.getElementById("id_TestVisualization_Mesh").checked) {
    stopAnimationTestMapping();
    var oldSize = testmapping_rendererGrey.getSize();
    testmapping_rendererGrey.setSize(2160, 2160);
    testmapping_rendererGrey.preserveDrawingBuffer = true;
    testmapping_rendererGrey.render(testmapping_sceneGrey, testmapping_cameraGrey);
    testing_ImgData = testmapping_rendererGrey.domElement.toDataURL();
    testmapping_rendererGrey.preserveDrawingBuffer = false;
    testmapping_rendererGrey.setSize(oldSize.width, oldSize.height);
    startAnimationTestMapping();
  } else {
    var canvasID = "id_Test_PixelCanvasGrey";

    if (document.getElementById("id_PopUp_fullTestingWindow").style.display != "none")
      var canvasID = "id_Test_PixelCanvasGreyFull"

    testing_ImgData = document.getElementById(canvasID).toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
  }
  this.href = testing_ImgData;
}



function check_xFktType() {

  if (document.getElementById("id_TestPage_NewTest_XType1").checked)
    current_xFktType = 0;

  if (document.getElementById("id_TestPage_NewTest_XType2").checked)
    current_xFktType = 1;

  if (document.getElementById("id_TestPage_NewTest_XType3").checked)
    current_xFktType = 2;

}

function check_yFktType() {

  if (document.getElementById("id_TestPage_NewTest_YType1").checked)
    current_yFktType = 0;

  if (document.getElementById("id_TestPage_NewTest_YType2").checked)
    current_yFktType = 1;

  if (document.getElementById("id_TestPage_NewTest_YType3").checked)
    current_yFktType = 2;

}


function updateNoise() {

  document.getElementById("id_TestPage_newTestNoiseDivSub").style.display = "none";
  document.getElementById("id_Test_NoiseProportionDiv").style.display = "none";
  document.getElementById("id_Test_NoiseDistributionDiv").style.display = "none";
  document.getElementById("id_Test_NoiseScalingDiv").style.display = "none";
  document.getElementById("id_Test_NoiseMaxChangeDiv").style.display = "none";
  document.getElementById("id_Test_NoiseValueRangeDiv1").style.display = "none";
  document.getElementById("id_Test_NoiseValueRangeDiv2").style.display = "none";
  document.getElementById("id_Test_NoiseBehaviorReplacing").disabled = false;

  noiseField_WorkerJSON.addNoise = false;

  switch (document.getElementById("id_Test_NoiseType").selectedIndex) {
    case 1:
    case 2:


      document.getElementById("id_TestPage_newTestNoiseDivSub").style.display = "block";
      document.getElementById("id_Test_NoiseMaxChangeDiv").style.display = "flex";

      if (document.getElementById("id_Test_NoiseType").selectedIndex == 1) {
        document.getElementById("id_Test_NoiseProportionDiv").style.display = "flex";
        document.getElementById("id_Test_NoiseDistributionDiv").style.display = "flex";
      }

      if (document.getElementById("id_Test_NoiseType").selectedIndex == 2) {
        document.getElementById("id_Test_NoiseScalingDiv").style.display = "flex";

        /*if(document.getElementById("id_Test_NoiseBehavior").selectedIndex==2){
          document.getElementById("id_Test_NoiseBehavior").selectedIndex=0;
        }
        document.getElementById("id_Test_NoiseBehaviorReplacing").disabled = true; //*/

      }

      if (document.getElementById("id_Test_NoiseBehavior").selectedIndex == 2) {
        document.getElementById("id_Test_NoiseMaxChangeDiv").style.display = "none";
        document.getElementById("id_Test_NoiseValueRangeDiv1").style.display = "flex";
        document.getElementById("id_Test_NoiseValueRangeDiv2").style.display = "flex";
      }

      // For the Worker
      noiseField_WorkerJSON.addNoise = true;
      noiseField_WorkerJSON.noiseBehavior = document.getElementById("id_Test_NoiseBehavior").selectedIndex;
      noiseField_WorkerJSON.maxChange = parseFloat(document.getElementById("id_Test_NoiseMaxChange").value);

      var replaceFrom = parseFloat(document.getElementById("id_TestPage_Noise_ReplaceFromValue").value);
      if (isNaN(replaceFrom) || replaceFrom == undefined) {
        openAlert("Attention! The input for the noise replacing range wasn't correct.");
        document.getElementById("id_TestPage_Noise_ReplaceFromValue").value = 0;
        document.getElementById("id_TestPage_Noise_ReplaceTillValue").value = 1.0;
      }

      var replaceTill = parseFloat(document.getElementById("id_TestPage_Noise_ReplaceTillValue").value);
      if (isNaN(replaceTill) || replaceTill == undefined) {
        openAlert("Attention! The input for the noise replacing range wasn't correct.");
        document.getElementById("id_TestPage_Noise_ReplaceFromValue").value = 0;
        document.getElementById("id_TestPage_Noise_ReplaceTillValue").value = 1.0;
      }

      if (replaceFrom >= replaceTill) {
        openAlert("Attention! The input for the noise replacing range wasn't correct. The \"From\" value has to be smaller than the \"Till\" value!");
        document.getElementById("id_TestPage_Noise_ReplaceFromValue").value = 0;
        document.getElementById("id_TestPage_Noise_ReplaceTillValue").value = 1.0;
      }

      calcNoise();
      break;
  }

  testfunctionWorker_InteractiveTest.postMessage(noiseField_WorkerJSON);

}
