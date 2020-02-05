class class_Element_SingleTest extends class_Testing_Element_Basis {

  constructor(divID,buttonID) {
    super(divID,buttonID);

    this.cccTest_NewJump_Options = [true, [0, 1]];
    this.cccTest_NewRidgeValley_Options = [true, 0, 1, 1, 2, 1, 2, 101, 100];
    this.cccTest_NewLocalExtrema_Options = [1, -1, 0, true, 101, 101];
    this.cccTest_NewGradient_Options = [true, 0, 1, 1, 2, 1, 2, 101, 100];
    this.cccTest_NewLittleBit_Options = [true, 0.0, 1.0, 0.0001, 0.001, 10, 10, 100];
    this.cccTest_NewTreshold_Options = [true, 0, 2, 0.0, 0.5, 1.0, 101, 101];
    this.cccTest_NewFrequency_Options = [true, true, 1, 1, 0.0, 1.0, 100, 100];
    this.fctTest_NewValleyShaped_Options = ["Three-Hump Camel Function", "Three_Hump_Camel", [-5, 5, -5, 5], 100, 100];
    this.fctTest_NewBowlShaped_Options = ["Bohachevsky Function ", "Bohachevsky_F1", [-100, 100, -100, 100], 100, 100];
    this.fctTest_NewLocalMin_Options = ["Ackley Function", "Ackley", [-32.768, 32.768, -32.768, 32.768], 100, 100, 20, 0.2, Math.PI * 2];
    this.selectedRealWorldType=undefined;

    this.current_yFktType = 0;
    this.current_xFktType = 0;

    //////////////////////////////////////////////////
    /// 3D Rendering
    this.testmappingMesh=undefined;
    this.testmappingMeshGrey=undefined;
    this.do3DTestField = false;
    this.scalefactor3DTest = 1.0;
    this.testmapping_scene;
    this.testmapping_camera;
    this.testmapping_renderer;
    this.testMappingGroup;
    this.testmappingMesh;
    this.testmapping_controls;
    this.testmapping_sceneGrey;
    this.testmapping_cameraGrey;
    this.testmapping_rendererGrey;
    this.testMappingGroupGrey;
    this.testmappingMeshGrey;
    this.testmapping_doAnimation = false;
    this.mapping_transferBorderX = 0;
    this.mapping_transferBorderY = 0;
    this.testing_DrawBoundingBox = false;
    this.testMeshBoundingBox = undefined;
    this.testMeshCenter =undefined;
    this.testing_DrawAxes = false;
    this.bg_texture;
    this.bgWidth;
    this.bgHeight;

    //////////////////////////////////////////////////
    /// Worker
    this.worker_testInteractive_finished=true;
    this.worker_testInteractive = new Worker(version_JS_FolderName+"/src/sections/test_functions/worker/worker_SingleTesting.js", { type: "module" });
    this.worker_testInteractive.postMessage({'message':'init'});
    this.worker_testInteractive.addEventListener('message', workerEvent_DrawTestfunction, false);
    for (var i = 0; i < this.medicalFiles.length; i++) {
          var url = "resource/realWorldData/medicalData/"+this.medicalFiles[i];
          var img = new Image();
          img.setAttribute('crossOrigin', 'anonymous');
          img.onload = (function(index) {
          return function () {
            var workerJSON = {};
            workerJSON['message'] = "pushRealWorldData";
            workerJSON['type'] = "medical";
            workerJSON['index'] = index;
            workerJSON['imgData'] = loadImgData(this);
            testingSection.element_singleTest.worker_testInteractive.postMessage(workerJSON);
          };
        })(i);
        img.src = url;
    }

    for (var i = 0; i < this.scientificFlowSimFiles.length; i++) {
          var url = "resource/realWorldData/scientificFlowSimulation/"+this.scientificFlowSimFiles[i];
          var img = new Image();
          img.setAttribute('crossOrigin', 'anonymous');
          img.onload = (function(index) {
          return function () {
            var workerJSON = {};
            workerJSON['message'] = "pushRealWorldData";
            workerJSON['type'] = "scientificFlowSim";
            workerJSON['index'] = index;
            workerJSON['imgData'] = loadImgData(this);
            testingSection.element_singleTest.worker_testInteractive.postMessage(workerJSON);
          };
        })(i);
        img.src = url;
    }

    for (var i = 0; i < this.photographsFiles.length; i++) {
          var url = "resource/realWorldData/photographs/"+this.photographsFiles[i];
          var img = new Image();
          img.setAttribute('crossOrigin', 'anonymous');
          img.onload = (function(index) {
          return function () {
            var workerJSON = {};
            workerJSON['message'] = "pushRealWorldData";
            workerJSON['type'] = "photographs";
            workerJSON['index'] = index;
            workerJSON['imgData'] = loadImgData(this);
            testingSection.element_singleTest.worker_testInteractive.postMessage(workerJSON);
          };
        })(i);
        img.src = url;
    }

    //this.noiseField_WorkerJSON = {"addNoise":false,"noiseField":undefined,"noiseBehavior":undefined,"maxChange":undefined,"replaceNoiseFrom":undefined,"replaceNoiseTill":undefined};

    this.styleVisOptions();
  }

  addTestToReport(){

  }

  showElement(){
    super.showElement();
    this.selectNewTestType();
  }

  updateElement(){
    if(this.isElementOpen()){
      document.getElementById("id_Test_WaitForTestCalculation").style.display="flex";
      document.getElementById("id_Test_VisDiv").style.display="none";
      document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
      switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
        case 0:
            if(this.cccTest_NewJump_Options[1].length==0)
              return;
              this.inform_Worker_PushInteractiveTest("CCCTest","Jump",this.cccTest_NewJump_Options);
          break;
        case 1:
            this.inform_Worker_PushInteractiveTest("CCCTest","Gradient",this.cccTest_NewGradient_Options);
          break;
        case 2:
            this.inform_Worker_PushInteractiveTest("CCCTest","RiVa",this.cccTest_NewRidgeValley_Options);
          break;
        case 3:
            this.inform_Worker_PushInteractiveTest("CCCTest","Extrema",this.cccTest_NewLocalExtrema_Options);
          break;
        case 4:
            this.inform_Worker_PushInteractiveTest("CCCTest","Frequency",this.cccTest_NewFrequency_Options);
          break;
        case 5:
            this.inform_Worker_PushInteractiveTest("CCCTest","LittleBit",this.cccTest_NewLittleBit_Options);
          break;
        case 6:
            this.inform_Worker_PushInteractiveTest("CCCTest","Treshold",this.cccTest_NewTreshold_Options);
          break;
        case 7:
          return;
          /////////////////////////////////////
        case 8:
            this.inform_Worker_PushInteractiveTest("Collection",this.fctTest_NewLocalMin_Options[1],this.fctTest_NewLocalMin_Options);
          break;
        case 9:
            this.inform_Worker_PushInteractiveTest("Collection",this.fctTest_NewBowlShaped_Options[1],this.fctTest_NewBowlShaped_Options);
          break;
        case 10:
            this.inform_Worker_PushInteractiveTest("Collection",this.fctTest_NewValleyShaped_Options[1],this.fctTest_NewValleyShaped_Options);
          break;
          /////////////////////////////////////
        case 11:
        case 12:
        case 13:
            this.inform_Worker_PushInteractiveTest("RealData",this.selectedRealWorldType,document.getElementById("id_TestPage_FctSelection").selectedIndex);
          break;
        default:
          document.getElementById("id_TestPage_CalcButton").style.visibility="visible";
          document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 0;
          this.selectNewTestType();
          return;
      }
      this.updateNoise();
      this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    }
  }

  initNewTest() {

    document.getElementById("id_TestPage_Dimension_Div").style.display = "none";

    document.getElementById("id_TestPage_NewTest_JumpDiv").style.display = "none";

    document.getElementById("id_TestPage_YFctType_Div").style.display = "none";
    document.getElementById("id_TestPage_NewTest_D1").style.display = "none";
    document.getElementById("id_TestPage_NewTest_D2").style.display = "none";
    document.getElementById("id_TestPage_NewTest_D3").style.display = "none";
    document.getElementById("id_TestPage_NewTest_D4").style.display = "none";
    document.getElementById("id_TestPage_NewTest_D5").style.display = "none";

    document.getElementById("id_TestPage_XFctType_Div").style.display = "none";
    document.getElementById("id_TestPage_newTestAcknowledgmentsDiv").style.display = "none";

    document.getElementById("id_TestPage_FctSelection_Div").style.display = "none";
    document.getElementById("id_TestPage_newTestNoiseDiv").style.display = "block";

    document.getElementById("id_TestPage_fitToCMS_Div").style.display = "none";

    document.getElementById("id_TestPage_newTestInfoText").innerHTML = "";
    document.getElementById("id_TestPage_newTestInfoText").style.display = "none";

    document.getElementById("id_TestPage_GridDimX").disabled = false;
    document.getElementById("id_TestPage_GridDimY").disabled = false;

    document.getElementById("id_TestPage_doRatioCheckbox").disabled = false;
    document.getElementById("id_TestPage_doRatioCheckbox").checked = false;


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
    document.getElementById("id_TestPage_CalcButton").style.display="block";

    if (this.testmappingMesh != undefined) {
      this.testmappingMesh.visible = false;
      this.testmappingMeshGrey.visible = false;
    }

  }

  selectNewTestType() {

    this.initNewTest();
    document.getElementById("id_Test_WaitForTestCalculation").style.display="flex";
    document.getElementById("id_Test_VisDiv").style.display="none";
    switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
      case 0:
        this.selectNewJumpTestType();
        break;
      case 1:
        this.selectNewGradientTestType();
        break;
      case 2:
        this.selectNewRidgeValleyTestType();
        break;
      case 3:
        this.selectNewExtremaTestType();
        break;
      case 4:
        this.selectNewFrequencyTestType();
        break;
      case 5:
        this.selectNewLittleBitTestType();
        break;
      case 6:
        this.selectNewTresholdTestType();
        break;
      case 7:
        //this.selectNewTopologyTestType();
        return;

        /////////////////////////////////////
      case 8:
        this.selectNewFctLocalMinimaType();
        break;
      case 9:
        this.selectNewFctBowlShapedType();
        break;
      case 10:
        this.selectNewFctValleyShapedType();
        break;

        /////////////////////////////////////
      case 11:
        this.selectedRealWorldType = "medical";
        this.selectRealWorldType(0);
        break;
      case 12:
        this.selectedRealWorldType = "scientificFlowSim";
        this.selectRealWorldType(0);
        break;
      case 13:
        this.selectedRealWorldType = "photographs";
        this.selectRealWorldType(0);
        break;

      default:
        document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 0;
        this.selectNewTestType();

    }
  }

  newTest_switchRatioType() {

    document.getElementById("id_Test_WaitForTestCalculation").style.display="flex";
    document.getElementById("id_Test_VisDiv").style.display="none";

    switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
      case 0:
        // Jumps
        this.updateJumpTestVariables();
        break;
      case 1:
        // Gradient
        this.switchRatioType_GradientTest();
        break;
      case 2:
        // Ridge & Valley
        this.switchRatioType_RidgeValleyTest();
        break;
        /*case 3:
          // Local Extrema
            updateExtremaTestVariables();
          break;*/
      case 4:
        // Frequency
        this.switchRatioType_FrequencyTest();
        break;
      case 5:
        // Little Bit
        this.switchRatioType_LittleBitTest();
        break;
      case 6:
        // Treshold
        this.switchRatioType_TresholdTest();
        break;
      default:
        document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 0;
        this.selectNewTestType();

    }
  }

  updateTestVariables() {

    switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
      case 1:
        this.updateGradientTestVariables();
        break;
      case 2:
        this.updateRidgeValleyTestVariables();
        break;
      case 3:
        this.updateExtremaTestVariables();
        break;
      case 4:
        this.updateFrequencyTestVariables();
        break;
      case 5:
        this.updateLittleBitTestVariables();
        break;
      case 6:
        this.updateTresholdTestVariables();
        break;
      case 7:
        this.updateTopologyTestVariables();
        break;

        ///////////////////////////////////////////////
      case 8:
        this.updateFctLocalMinimaTestVariables();
        break;
      case 9:
        this.updateFctBowlShapedTestVariables();
        break;
      case 10:
        this.updateFctValleyShapedTestVariables();
        break;

        /////////////////////////////////////////////////
      case 11:
      case 12:
      case 13:
        this.updateRealWorldVariables();
        break;
    }
  }

  updateFunctionSelection() {

    document.getElementById("id_Test_WaitForTestCalculation").style.display="flex";
    document.getElementById("id_Test_VisDiv").style.display="none";

    switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
      case 8:
        this.updateLocalMinimaFctSelection();
        break;
      case 9:
        this.updateBowlShapedFctSelection();
        break;
      case 10:
        this.updateValleyShapedFctSelection();
        break;
        /////////////////////////////////////////////////
      case 11:
      case 12:
      case 13:
        this.updateRealWorldVariables();
        break;
    }
  }


  /////////////////////////////////////
  ///// Worker Functions

  updateTestVis() {
    this.styleVisOptions();
    this.stopAnimationTestMapping();

    if (document.getElementById("id_TestVisualization_Mesh").checked)
      this.startAnimationTestMapping();

    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
  }

  inform_Worker_PushInteractiveTest(type,subtype,options){
    var workerJSON = {};
    workerJSON['message'] = "updateTest";
    workerJSON['type'] = type;
    workerJSON['subtype'] = subtype;
    workerJSON['options'] = options;
    this.worker_testInteractive.postMessage(workerJSON);
  }

  request_Worker_Testfield(index){
    var workerJSON = {};
    workerJSON['message'] = "sendTestfield";
    workerJSON['arrayIndex'] = index;
    this.worker_testInteractive.postMessage(workerJSON);//*/
  }

  ////////////////////////////////////////////////////////////////////////

  styleVisOptions(){
    document.getElementById("id_Test_WaitForTestCalculation").style.display="flex";
    document.getElementById("id_Test_VisDiv").style.display="none";

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
    } else {
      document.getElementById("id_Test_PixelCanvas").style.display = "block";
      document.getElementById("id_Test_PixelCanvasGrey").style.display = "block";
      document.getElementById("id_TestFull_PixelVis").style.display = "flex";
    }
  }

  check_xFktType() {
    if (document.getElementById("id_TestPage_NewTest_XType1").checked)
      this.current_xFktType = 0;

    if (document.getElementById("id_TestPage_NewTest_XType2").checked)
      this.current_xFktType = 1;

    if (document.getElementById("id_TestPage_NewTest_XType3").checked)
      this.current_xFktType = 2;
  }

  check_yFktType() {
    if (document.getElementById("id_TestPage_NewTest_YType1").checked)
      this.current_yFktType = 0;

    if (document.getElementById("id_TestPage_NewTest_YType2").checked)
      this.current_yFktType = 1;

    if (document.getElementById("id_TestPage_NewTest_YType3").checked)
      this.current_yFktType = 2;
  }

  /////////////////////////////////////
  /// Interactive Test (CCC-Tests::Jumps)

  selectNewJumpTestType(){

    this.initNewTest();
    document.getElementById("id_TestPage_NewTest_JumpDiv").style.display="block";
    document.getElementById("id_TestPage_newTestNoiseDiv").style.display="none";
    document.getElementById("id_Test_NoiseType").selectedIndex=0;
    document.getElementById("id_TestPage_doRatioCheckbox").checked = this.cccTest_NewJump_Options[0];

    this.fillNewJumpsList();
    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    this.updateNoise();
    this.inform_Worker_PushInteractiveTest("CCCTest","Jump",this.cccTest_NewJump_Options);
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
  }

  newJumpTestStartPerEnter(event){

    var keynum;
    if(window.event) { // IE
      keynum = event.keyCode;
    } else if(event.which){ // Netscape/Firefox/Opera
      keynum = event.which;
    }

    if (keynum == 13) {
        this.addJumpToJumpSet();
    }
  }

  updateJumpTestVariables(){

    this.cccTest_NewJump_Options[0]=document.getElementById("id_TestPage_doRatioCheckbox").checked;
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      this.cccTest_NewJump_Options[1]=[0,1];
    }
    else{
      this.cccTest_NewJump_Options[1]=[testingSection.testingCMS.getRefPosition(0),testingSection.testingCMS.getRefPosition(testingSection.testingCMS.getKeyLength()-1)];
    }
    this.fillNewJumpsList();
  }

  fillNewJumpsList(){
    document.getElementById("id_TestPage_NewTest_JumpList").innerHTML = "";
    for (var i = 0; i < this.cccTest_NewJump_Options[1].length; i++) {
      var option = document.createElement("option");
      option.innerHTML = this.cccTest_NewJump_Options[1][i];
      document.getElementById("id_TestPage_NewTest_JumpList").add(option);
    }

    if(this.cccTest_NewJump_Options[1].length>0){
      document.getElementById("id_TestPage_CalcButton").style.display="block";
    }
    else{
      this.testmappingMesh.visible = false;
      this.testmappingMeshGrey.visible = false;
      document.getElementById("id_TestPage_CalcButton").style.display="none";
    }
  }

  addJumpToSet(){

    var newValue = document.getElementById("id_TestPage_NewJumpValue").value;
    if(isNaN(newValue)){
      openAlert("Invalid value for adding a new jump!");
      return;
    }

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (newValue<0 || newValue>1.0)){
      openAlert("Invalid value for adding a new jump! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }


      var foundValue = false;
      for (var i = 0; i < this.cccTest_NewJump_Options[1].length; i++) {
        if(this.cccTest_NewJump_Options[1][i]==newValue){
          foundValue=true;
          break;
        }
      }

      if(foundValue){
        openAlert("The value is already in the jump set! Please enter another value.");
        return;
      }

      this.cccTest_NewJump_Options[1].push(newValue);
      this.cccTest_NewJump_Options[1].sort(function(a, b){return a - b});
      this.fillNewJumpsList();

  }

  removeJumpFromSet(){

    if(document.getElementById("id_TestPage_NewTest_JumpList").selectedIndex!=-1){
      this.cccTest_NewJump_Options[1].splice(document.getElementById("id_TestPage_NewTest_JumpList").selectedIndex, 1);
      this.fillNewJumpsList();
    }

  }

  /////////////////////////////////////
  /// Interactive Test (CCC-Tests::Gradient)

  switchRatioType_GradientTest(){

    this.cccTest_NewGradient_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      this.cccTest_NewGradient_Options[1] = 0;
      this.cccTest_NewGradient_Options[2] = 1;
    }
    else {
      this.cccTest_NewGradient_Options[1] = testingSection.testingCMS.getRefPosition(0);
      this.cccTest_NewGradient_Options[2] = testingSection.testingCMS.getRefPosition(testingSection.testingCMS.getKeyLength()-1);
    }
    this.selectNewGradientTestType();
  }

  selectNewGradientTestType(){

    this.initNewTest();
    document.getElementById("id_TestPage_Dimension_Div").style.display="block";
    document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

    document.getElementById("id_TestPage_doRatioCheckbox").checked = this.cccTest_NewGradient_Options[0];

    document.getElementById("id_TestPage_NewTest_I3").value=this.cccTest_NewGradient_Options[4];
    document.getElementById("id_TestPage_NewTest_I4").value=this.cccTest_NewGradient_Options[6];

    document.getElementById("id_TestPage_NewTest_I1").value=this.cccTest_NewGradient_Options[1];
    document.getElementById("id_TestPage_NewTest_I2").value=this.cccTest_NewGradient_Options[2];

    document.getElementById("id_TestPage_NewTest_XTypeL1").innerHTML=" : Const";
    document.getElementById("id_TestPage_NewTest_XTypeL2").innerHTML=" : Decreasing";
    document.getElementById("id_TestPage_NewTest_XTypeL3").innerHTML=" : Increasing";

    document.getElementById("id_TestPage_NewTest_YTypeL1").innerHTML=" : Const";
    document.getElementById("id_TestPage_NewTest_YTypeL2").innerHTML=" : Decreasing";
    document.getElementById("id_TestPage_NewTest_YTypeL3").innerHTML=" : Increasing";

    document.getElementById("id_TestPage_NewTest_I1").step=0.001;
    document.getElementById("id_TestPage_NewTest_I2").step=0.001;

    this.current_xFktType= this.cccTest_NewGradient_Options[3];
    switch (this.current_xFktType) { // mType
      case 0:
        document.getElementById("id_TestPage_NewTest_XType1").checked = true;
        break;
        case 1:
          document.getElementById("id_TestPage_NewTest_XType2").checked = true;
          break;
          case 2:
            document.getElementById("id_TestPage_NewTest_XType3").checked = true;
            break;
    }

    this.current_yFktType= this.cccTest_NewGradient_Options[5];
    switch (this.current_yFktType) { // mType
      case 0:
        document.getElementById("id_TestPage_NewTest_YType1").checked = true;
        break;
        case 1:
          document.getElementById("id_TestPage_NewTest_YType2").checked = true;
          break;
          case 2:
            document.getElementById("id_TestPage_NewTest_YType3").checked = true;
            break;
    }

   document.getElementById("id_TestPage_GridDimX").value=this.cccTest_NewGradient_Options[7];
   document.getElementById("id_TestPage_GridDimY").value=this.cccTest_NewGradient_Options[8];

    document.getElementById("id_TestPage_NewTest_I3").min=2;
    document.getElementById("id_TestPage_NewTest_I4").min=2;

    document.getElementById("id_TestPage_NewTest_I3").step=1;
    document.getElementById("id_TestPage_NewTest_I4").step=1;



    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      document.getElementById("id_TestPage_NewTest_I1").min=0;
      document.getElementById("id_TestPage_NewTest_I1").max=1.0;
      document.getElementById("id_TestPage_NewTest_I2").min=0;
      document.getElementById("id_TestPage_NewTest_I2").max=1.0;
    }
    else {
      document.getElementById("id_TestPage_NewTest_I1").min=undefined;
      document.getElementById("id_TestPage_NewTest_I1").max=undefined;
      document.getElementById("id_TestPage_NewTest_I2").min=undefined;
      document.getElementById("id_TestPage_NewTest_I2").max=undefined;
    }

    document.getElementById("id_TestPage_NewTest_V1").innerHTML="m-Value: ";
    document.getElementById("id_TestPage_NewTest_V2").innerHTML="M-Value: ";
    document.getElementById("id_TestPage_XFctType_Div").style.display="block";

    document.getElementById("id_TestPage_NewTest_V3").innerHTML="X-Exponent: ";
    document.getElementById("id_TestPage_NewTest_V4").innerHTML="Y-Exponent: ";
    document.getElementById("id_TestPage_YFctType_Div").style.display="block";

    this.draw_GradientFunctionType();

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    this.inform_Worker_PushInteractiveTest("CCCTest","Gradient",this.cccTest_NewGradient_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateGradientTestVariables(){
    this.check_xFktType();
    this.check_yFktType();

    if(this.current_xFktType==0){
      document.getElementById("id_TestPage_NewTest_I3").disabled=true;
      document.getElementById("id_TestPage_NewTest_I3").value=1;
    }
    else{
      document.getElementById("id_TestPage_NewTest_I3").disabled=false;

      if(document.getElementById("id_TestPage_NewTest_I3").value==1)
        document.getElementById("id_TestPage_NewTest_I3").value=2
    }

    if(this.current_yFktType==0){
      document.getElementById("id_TestPage_NewTest_I4").disabled=true;
      document.getElementById("id_TestPage_NewTest_I4").value=1;
    }
    else{
      document.getElementById("id_TestPage_NewTest_I4").disabled=false;

      if(document.getElementById("id_TestPage_NewTest_I4").value==1)
        document.getElementById("id_TestPage_NewTest_I4").value=2
    }

    // check m-value
    var value_m = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
    if(isNaN(value_m)){
      openAlert("Invalid input for the m-Value");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_m<0 || value_m>1.0)){
      openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    // check M-value
    var value_M = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    if(isNaN(value_M)){
      openAlert("Invalid input for M-Value");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_M<0 || value_M>1.0)){
      openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }


    if(value_m==value_M){
      openAlert("Invalid input! The m-Value and M-Value have to be different!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    // check m-exp
    var exp_x = parseInt(document.getElementById("id_TestPage_NewTest_I3").value);
    if(isNaN(exp_x)){
      openAlert("Invalid input for m-Exponent");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    document.getElementById("id_TestPage_NewTest_I3").value =exp_x;
    if(document.getElementById("id_TestPage_NewTest_I3").disabled==false &&exp_x<2){
      openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    // check M-exp
    var exp_y = parseInt(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value = exp_y;
    if(isNaN(exp_y)){
      openAlert("Invalid input for m-Exponent");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(document.getElementById("id_TestPage_NewTest_I4").disabled==false &&exp_y<2){
      openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    // check x,y DIM
    var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
    document.getElementById("id_TestPage_GridDimX").value=dimX;
    if(isNaN(dimX)){
      openAlert("Invalid input for the Grid x-dimension!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(dimX<2){
      openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
    document.getElementById("id_TestPage_GridDimY").value=dimY;
    if(isNaN(dimY)){
      openAlert("Invalid input for the Grid y-dimension!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(dimY<2){
      openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    document.getElementById("id_TestPage_CalcButton").style.display="block";

    this.cccTest_NewGradient_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;
    this.cccTest_NewGradient_Options[1]=value_m;
    this.cccTest_NewGradient_Options[2]=value_M;
    this.cccTest_NewGradient_Options[3] = this.current_xFktType;
    this.cccTest_NewGradient_Options[4]=exp_x;
    this.cccTest_NewGradient_Options[5] = this.current_yFktType;
    this.cccTest_NewGradient_Options[6] = exp_y;
    this.cccTest_NewGradient_Options[7]= dimX;
    this.cccTest_NewGradient_Options[8] = dimY;

    this.draw_GradientFunctionType();
  }

  draw_GradientFunctionType(){

    var exp= document.getElementById("id_TestPage_NewTest_I3").value;
    var value_m = document.getElementById("id_TestPage_NewTest_I1").value;
    var value_M = document.getElementById("id_TestPage_NewTest_I2").value;
    draw_FunctionType("id_TestPage_Canvas_xFktType",exp,value_m,value_M,this.current_xFktType);

    exp= document.getElementById("id_TestPage_NewTest_I4").value;
    value_m = document.getElementById("id_TestPage_NewTest_I1").value;
    value_M = document.getElementById("id_TestPage_NewTest_I2").value;
    draw_FunctionType("id_TestPage_Canvas_yFktType",exp,value_m,value_M,this.current_yFktType);
  }

  /////////////////////////////////////
  /// Interactive Test (CCC-Tests::Ridge and Valley)

  switchRatioType_RidgeValleyTest(){
    this.cccTest_NewRidgeValley_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      this.cccTest_NewRidgeValley_Options[1] = 0;
      this.cccTest_NewRidgeValley_Options[2] = 1;
    }
    else {
      this.cccTest_NewRidgeValley_Options[1] = testingSection.testingCMS.getRefPosition(0);
      this.cccTest_NewRidgeValley_Options[2] = testingSection.testingCMS.getRefPosition(testingSection.testingCMS.getKeyLength()-1);
    }
    this.selectNewRidgeValleyTestType();
  }

  selectNewRidgeValleyTestType(){
    this.initNewTest();
    document.getElementById("id_TestPage_Dimension_Div").style.display="block";
    document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

    document.getElementById("id_TestPage_doRatioCheckbox").checked = this.cccTest_NewRidgeValley_Options[0];

    document.getElementById("id_TestPage_NewTest_I3").value=this.cccTest_NewRidgeValley_Options[4];
    document.getElementById("id_TestPage_NewTest_I4").value=this.cccTest_NewRidgeValley_Options[6];

    document.getElementById("id_TestPage_NewTest_I1").value=this.cccTest_NewRidgeValley_Options[1];
    document.getElementById("id_TestPage_NewTest_I2").value=this.cccTest_NewRidgeValley_Options[2];


    document.getElementById("id_TestPage_NewTest_XTypeL1").innerHTML=" : Linear";
    document.getElementById("id_TestPage_NewTest_XTypeL2").innerHTML=" : Mound";
    document.getElementById("id_TestPage_NewTest_XTypeL3").innerHTML=" : Peak";

    document.getElementById("id_TestPage_NewTest_YTypeL1").innerHTML=" : Linear";
    document.getElementById("id_TestPage_NewTest_YTypeL2").innerHTML=" : Mound";
    document.getElementById("id_TestPage_NewTest_YTypeL3").innerHTML=" : Peak";

    document.getElementById("id_TestPage_NewTest_I1").step=0.001;
    document.getElementById("id_TestPage_NewTest_I2").step=0.001;

    this.current_xFktType= this.cccTest_NewRidgeValley_Options[3];
    switch (this.current_xFktType) {
      case 0:
        document.getElementById("id_TestPage_NewTest_YType1").checked = true;
        break;
        case 1:
          document.getElementById("id_TestPage_NewTest_YType2").checked = true;
          break;
          case 2:
            document.getElementById("id_TestPage_NewTest_YType3").checked = true;
            break;
    }

    this.current_yFktType= this.cccTest_NewRidgeValley_Options[5];
    switch (this.current_yFktType) {
      case 0:
        document.getElementById("id_TestPage_NewTest_XType1").checked = true;
        break;
        case 1:
          document.getElementById("id_TestPage_NewTest_XType2").checked = true;
          break;
          case 2:
            document.getElementById("id_TestPage_NewTest_XType3").checked = true;
            break;
    }

  document.getElementById("id_TestPage_GridDimX").value=this.cccTest_NewRidgeValley_Options[7];
  document.getElementById("id_TestPage_GridDimY").value=this.cccTest_NewRidgeValley_Options[8];

    document.getElementById("id_TestPage_NewTest_I3").min=2;
    document.getElementById("id_TestPage_NewTest_I4").min=2;

    document.getElementById("id_TestPage_NewTest_I3").step=1;
    document.getElementById("id_TestPage_NewTest_I4").step=1;



    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){

      document.getElementById("id_TestPage_NewTest_I1").min=0;
      document.getElementById("id_TestPage_NewTest_I1").max=1.0;

      document.getElementById("id_TestPage_NewTest_I1").min=0;
      document.getElementById("id_TestPage_NewTest_I1").max=1.0;

    }

    document.getElementById("id_TestPage_NewTest_V1").innerHTML="m-Value: ";
    document.getElementById("id_TestPage_NewTest_V2").innerHTML="M-Value: ";
    document.getElementById("id_TestPage_XFctType_Div").style.display="block";

    document.getElementById("id_TestPage_NewTest_V3").innerHTML="X-Exponent: ";
    document.getElementById("id_TestPage_NewTest_V4").innerHTML="Y-Exponent: ";
    document.getElementById("id_TestPage_YFctType_Div").style.display="block";

    this.draw_RidgeValleyFunctionType();

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    this.inform_Worker_PushInteractiveTest("CCCTest","RiVa",this.cccTest_NewRidgeValley_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateRidgeValleyTestVariables(){
    this.check_xFktType();
    this.check_yFktType();

    if(this.current_xFktType==0){
      document.getElementById("id_TestPage_NewTest_I3").disabled=true;
      document.getElementById("id_TestPage_NewTest_I3").value=1;
    }
    else{
      document.getElementById("id_TestPage_NewTest_I3").disabled=false;

      if(document.getElementById("id_TestPage_NewTest_I3").value==1)
        document.getElementById("id_TestPage_NewTest_I3").value=2
    }

    if(this.current_yFktType==0){
      document.getElementById("id_TestPage_NewTest_I4").disabled=true;
      document.getElementById("id_TestPage_NewTest_I4").value=1;
    }
    else{
      document.getElementById("id_TestPage_NewTest_I4").disabled=false;

      if(document.getElementById("id_TestPage_NewTest_I4").value==1)
        document.getElementById("id_TestPage_NewTest_I4").value=2
    }

    // check m-value
    var value_m = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
    if(isNaN(value_m)){
      openAlert("Invalid input for the m-Value");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_m<0 || value_m>1.0)){
      openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    // check M-value
    var value_M = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    if(isNaN(value_M)){
      openAlert("Invalid input for M-Value");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_M<0 || value_M>1.0)){
      openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }


    if(value_m==value_M){
      openAlert("Invalid input! The m-Value and M-Value have to be different!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    // check m-exp
    var exp_m = parseInt(document.getElementById("id_TestPage_NewTest_I3").value);
    if(isNaN(exp_m)){
      openAlert("Invalid input for m-Exponent");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    document.getElementById("id_TestPage_NewTest_I3").value =exp_m;
    if(document.getElementById("id_TestPage_NewTest_I3").disabled==false &&exp_m<2){
      openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    // check M-exp
    var exp_M = parseInt(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value = exp_M;
    if(isNaN(exp_M)){
      openAlert("Invalid input for m-Exponent");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(document.getElementById("id_TestPage_NewTest_I4").disabled==false &&exp_M<2){
      openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    // check x,y DIM
    var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
    document.getElementById("id_TestPage_GridDimX").value=dimX;
    if(isNaN(dimX)){
      openAlert("Invalid input for the Grid x-dimension!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(dimX<2){
      openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
    document.getElementById("id_TestPage_GridDimY").value=dimY;
    if(isNaN(dimY)){
      openAlert("Invalid input for the Grid y-dimension!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(dimY<2){
      openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    document.getElementById("id_TestPage_CalcButton").style.display="block";

    this.cccTest_NewRidgeValley_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;
    this.cccTest_NewRidgeValley_Options[1]=value_m;
    this.cccTest_NewRidgeValley_Options[2]=value_M;
    this.cccTest_NewRidgeValley_Options[3] = this.current_xFktType;
    this.cccTest_NewRidgeValley_Options[4]=exp_m;
    this.cccTest_NewRidgeValley_Options[5] = this.current_yFktType;
    this.cccTest_NewRidgeValley_Options[6] = exp_M;
    this.cccTest_NewRidgeValley_Options[7]= dimX;
    this.cccTest_NewRidgeValley_Options[8] = dimY;

    this.draw_RidgeValleyFunctionType();
  }

  draw_RidgeValleyFunctionType(){

    var exp= document.getElementById("id_TestPage_NewTest_I3").value;
    var value_m = document.getElementById("id_TestPage_NewTest_I1").value;
    var value_M = document.getElementById("id_TestPage_NewTest_I2").value;
    draw_FunctionTypeMirrored("id_TestPage_Canvas_xFktType",exp,value_m,value_M,this.current_xFktType);

    exp= document.getElementById("id_TestPage_NewTest_I4").value;
    value_m = document.getElementById("id_TestPage_NewTest_I1").value;
    value_M = document.getElementById("id_TestPage_NewTest_I2").value;
    draw_FunctionType("id_TestPage_Canvas_yFktType",exp,value_m,value_M,this.current_yFktType);
  }

  /////////////////////////////////////
  /// Interactive Test (CCC-Tests::Local Extrema)

  selectNewExtremaTestType(){

    this.initNewTest();

    document.getElementById("id_TestPage_Dimension_Div").style.display="block";
    document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
    document.getElementById("id_TestPage_fitToCMS_Div").style.display="flex";
    document.getElementById("id_TestPage_doRatioCheckbox").disabled = true;
    document.getElementById("id_TestPage_newTestInfoText").style.display="block";
    document.getElementById("id_TestPage_fitToCMS").checked = this.cccTest_NewLocalExtrema_Options[3];

    document.getElementById("id_TestPage_NewTest_V1").innerHTML="a-Value: ";
    document.getElementById("id_TestPage_NewTest_V2").innerHTML="b-Value: ";
    document.getElementById("id_TestPage_NewTest_V3").innerHTML="m-Value: ";

    document.getElementById("id_TestPage_NewTest_I1").value= this.cccTest_NewLocalExtrema_Options[0];
    document.getElementById("id_TestPage_NewTest_I2").value= this.cccTest_NewLocalExtrema_Options[1];
    document.getElementById("id_TestPage_NewTest_I3").value= this.cccTest_NewLocalExtrema_Options[2];

    document.getElementById("id_TestPage_NewTest_I1").step= 0.001;
    document.getElementById("id_TestPage_NewTest_I2").step= 0.001;
    document.getElementById("id_TestPage_NewTest_I3").step= 0.001;

    document.getElementById("id_TestPage_GridDimX").value=this.cccTest_NewLocalExtrema_Options[4];
    document.getElementById("id_TestPage_GridDimY").value=this.cccTest_NewLocalExtrema_Options[5];

    this.newTestExtremaInfoText();

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    this.inform_Worker_PushInteractiveTest("CCCTest","Extrema",this.cccTest_NewLocalExtrema_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateExtremaTestVariables(){
      this.cccTest_NewLocalExtrema_Options[3]=document.getElementById("id_TestPage_fitToCMS").checked;

      this.cccTest_NewLocalExtrema_Options[0]= parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
      document.getElementById("id_TestPage_NewTest_I1").value = this.cccTest_NewLocalExtrema_Options[0];

      this.cccTest_NewLocalExtrema_Options[1]= parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
      document.getElementById("id_TestPage_NewTest_I2").value=this.cccTest_NewLocalExtrema_Options[1];

      this.cccTest_NewLocalExtrema_Options[2]= parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
      document.getElementById("id_TestPage_NewTest_I3").value=this.cccTest_NewLocalExtrema_Options[2];

      // check x,y DIM
      var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
      document.getElementById("id_TestPage_GridDimX").value=dimX;
      if(isNaN(dimX)){
        openAlert("Invalid input for the Grid x-dimension!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }
      if(dimX<2){
        openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
      document.getElementById("id_TestPage_GridDimY").value=dimY;
      if(isNaN(dimY)){
        openAlert("Invalid input for the Grid y-dimension!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }
      if(dimY<2){
        openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      document.getElementById("id_TestPage_CalcButton").style.display="block";

      this.cccTest_NewLocalExtrema_Options[4]= dimX;
      this.cccTest_NewLocalExtrema_Options[5]= dimY;

      this.newTestExtremaInfoText();
  }

  newTestExtremaInfoText(){

    var diagnoseText = "Type: ";

    if(this.cccTest_NewLocalExtrema_Options[0]==0 || this.cccTest_NewLocalExtrema_Options[1]==0){
      diagnoseText += "Undefined\n".bold();
    }
    else if(this.cccTest_NewLocalExtrema_Options[0]<0){
      if(this.cccTest_NewLocalExtrema_Options[1]<0){
        diagnoseText += "Maximum\n".bold();
      }
      else {
        diagnoseText += "Saddle\n".bold();
      }
    }
    else{
      if(this.cccTest_NewLocalExtrema_Options[1]>0){
        diagnoseText += "Minimum\n".bold();
      }
      else {
        diagnoseText += "Saddle\n".bold();
      }
    }

    var standartText = "\nMaximum: a<0 and b<0\nMinimum: a>0 and b>0\nSaddle: a<0 and b>0 or a>0 and b<0".italics();

    document.getElementById("id_TestPage_newTestInfoText").innerHTML="Info:\n".bold()+diagnoseText+standartText;
  }

  /////////////////////////////////////
  /// Interactive Test (CCC-Tests::Little Bit)

  selectNewLittleBitTestType(){

    this.initNewTest();

    document.getElementById("id_TestPage_Dimension_Div").style.display="block";
    document.getElementById("id_TestPage_GridDimX").disabled=true;

    document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D3").style.display="flex";

    document.getElementById("id_TestPage_NewTest_D4").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D5").style.display="flex";

    document.getElementById("id_TestPage_doRatioCheckbox").checked = this.cccTest_NewLittleBit_Options[0];

    document.getElementById("id_TestPage_NewTest_V3").innerHTML="Little"+"Start".sub()+":";
    document.getElementById("id_TestPage_NewTest_V4").innerHTML="Little"+"End".sub()+":";
    document.getElementById("id_TestPage_NewTest_V5").innerHTML="x"+"Pixels".sub()+" per Stribe: ";
    document.getElementById("id_TestPage_NewTest_V1").innerHTML="From (m):";
    document.getElementById("id_TestPage_NewTest_V2").innerHTML="Till (M):";

    document.getElementById("id_TestPage_NewTest_I3").value= this.cccTest_NewLittleBit_Options[3];
    document.getElementById("id_TestPage_NewTest_I4").value= this.cccTest_NewLittleBit_Options[4];
    document.getElementById("id_TestPage_NewTest_I5").value= this.cccTest_NewLittleBit_Options[5];
    document.getElementById("id_TestPage_NewTest_I1").value= this.cccTest_NewLittleBit_Options[1];
    document.getElementById("id_TestPage_NewTest_I2").value= this.cccTest_NewLittleBit_Options[2];
    document.getElementById("id_TestPage_NewTest_I5").min= 2;
    document.getElementById("id_TestPage_NewTest_I5").step= 1;


    document.getElementById("id_TestPage_NewTest_I3").step= 0.00001;
    document.getElementById("id_TestPage_NewTest_I4").step= 0.00001;
    document.getElementById("id_TestPage_NewTest_I1").step= 0.001;
    document.getElementById("id_TestPage_NewTest_I2").step= 0.001;

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      document.getElementById("id_TestPage_NewTest_I3").min= 0;
      document.getElementById("id_TestPage_NewTest_I3").max= 1;
      document.getElementById("id_TestPage_NewTest_I4").min= 0;
      document.getElementById("id_TestPage_NewTest_I4").max= 1;
      document.getElementById("id_TestPage_NewTest_I1").min= 0;
      document.getElementById("id_TestPage_NewTest_I1").max= 1;
      document.getElementById("id_TestPage_NewTest_I2").min= 0;
      document.getElementById("id_TestPage_NewTest_I2").max= 1;
    }
    else {
      document.getElementById("id_TestPage_NewTest_I3").min= undefined;
      document.getElementById("id_TestPage_NewTest_I3").max= undefined;
      document.getElementById("id_TestPage_NewTest_I4").min= undefined;
      document.getElementById("id_TestPage_NewTest_I4").max= undefined;
      document.getElementById("id_TestPage_NewTest_I1").min= undefined;
      document.getElementById("id_TestPage_NewTest_I1").max= undefined;
      document.getElementById("id_TestPage_NewTest_I2").min= undefined;
      document.getElementById("id_TestPage_NewTest_I2").max= undefined;
    }

    var numStribes = this.cccTest_NewGradient_Options[6]+this.cccTest_NewGradient_Options[6]+1;
    document.getElementById("id_TestPage_GridDimX").value=this.cccTest_NewGradient_Options[5]*numStribes;
    document.getElementById("id_TestPage_GridDimY").value=this.cccTest_NewLittleBit_Options[7];


    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    this.inform_Worker_PushInteractiveTest("CCCTest","LittleBit",this.cccTest_NewLittleBit_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateLittleBitTestVariables(){

      var lStart = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
      document.getElementById("id_TestPage_NewTest_I3").value = lStart;
      if(isNaN(lStart)){
        openAlert("Invalid value for start value!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (lStart<0 || lStart>1.0)){
        openAlert("Invalid value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      var lEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
      document.getElementById("id_TestPage_NewTest_I4").value = lEnd;
      if(isNaN(lEnd)){
        openAlert("Invalid value for end value!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (lEnd<0 || lEnd>1.0)){
        openAlert("Invalid value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      // check m-value
      var value_m = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
      if(isNaN(value_m)){
        openAlert("Invalid input for the m-Value");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }
      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_m<0 || value_m>1.0)){
        openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      // check M-value
      var value_M = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
      if(isNaN(value_M)){
        openAlert("Invalid input for M-Value");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }
      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_M<0 || value_M>1.0)){
        openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      /////
      var pixelsArea = parseInt(document.getElementById("id_TestPage_NewTest_I5").value);
      document.getElementById("id_TestPage_NewTest_I5").value = pixelsArea;
      if(isNaN(pixelsArea)){
        openAlert("Invalid value for pixels per area value!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      if(pixelsArea<3){
        openAlert("Invalid value for pixels per area value! The value is not allowed to be smaller than three!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }


      var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
      document.getElementById("id_TestPage_GridDimY").value=dimY;
      if(isNaN(dimY)){
        openAlert("Invalid input for the Grid y-dimension!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }
      if(dimY<2){
        openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      /*if(lStart>=lEnd){
        openAlert("Invalid input for the start and end value! The start value has to be smaller than the end value!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
      }*/

      document.getElementById("id_TestPage_CalcButton").style.display="block";

      this.cccTest_NewLittleBit_Options[0]=document.getElementById("id_TestPage_doRatioCheckbox").checked;
      this.cccTest_NewLittleBit_Options[1]= value_m;
      this.cccTest_NewLittleBit_Options[2]= value_M;
      this.cccTest_NewLittleBit_Options[3]= lStart;
      this.cccTest_NewLittleBit_Options[4]= lEnd;
      this.cccTest_NewLittleBit_Options[5]= pixelsArea;
      this.cccTest_NewLittleBit_Options[7]=dimY;

      // Update input for noise calculation
      var numberOfAreas = this.littleBit_NumberOfSinks+this.littleBit_NumberOfSinks+1;
      document.getElementById("id_TestPage_GridDimX").value=numberOfAreas*pixelsArea;
  }

  switchRatioType_LittleBitTest(){
    this.cccTest_NewLittleBit_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      this.cccTest_NewLittleBit_Options[1] = 0;
      this.cccTest_NewLittleBit_Options[2] = 1;
      this.cccTest_NewLittleBit_Options[3] = 0.001;
      this.cccTest_NewLittleBit_Options[4] = 0.01;
    }
    else {
      this.cccTest_NewLittleBit_Options[1] = testingSection.testingCMS.getRefPosition(0);
      this.cccTest_NewLittleBit_Options[2] = testingSection.testingCMS.getRefPosition(testingSection.testingCMS.getKeyLength()-1);
      this.cccTest_NewLittleBit_Options[3] = 0.001*(testingSection.testingCMS.getRefPosition(testingSection.testingCMS.getKeyLength()-1)-testingSection.testingCMS.getRefPosition(0));
      this.cccTest_NewLittleBit_Options[4] = 0.01*(testingSection.testingCMS.getRefPosition(testingSection.testingCMS.getKeyLength()-1)-testingSection.testingCMS.getRefPosition(0));
    }
    this.selectNewLittleBitTestType();
  }

  /////////////////////////////////////
  /// Interactive Test (CCC-Tests::Frequency)

  switchRatioType_FrequencyTest(){
    this.cccTest_NewFrequency_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      this.cccTest_NewFrequency_Options[4] = 0;
      this.cccTest_NewFrequency_Options[5] = 1;
    }
    else {
      this.cccTest_NewFrequency_Options[4] = testingSection.testingCMS.getRefPosition(0);
      this.cccTest_NewFrequency_Options[5] = testingSection.testingCMS.getRefPosition(testingSection.testingCMS.getKeyLength()-1);
    }
    this.selectNewFrequencyTestType();
  }

  selectNewFrequencyTestType(){

    this.initNewTest();
    document.getElementById("id_TestPage_Dimension_Div").style.display="block";
    //document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

    //document.getElementById("id_TestPage_NewTest_V1").innerHTML="Start Frequency: ";
    document.getElementById("id_TestPage_NewTest_V2").innerHTML="#Increases: ";
    document.getElementById("id_TestPage_NewTest_V3").innerHTML="Wava"+"Start".sub()+": ";
    document.getElementById("id_TestPage_NewTest_V4").innerHTML="Wava"+"End".sub()+": ";

    document.getElementById("id_TestPage_doRatioCheckbox").checked=this.cccTest_NewFrequency_Options[0];

    //document.getElementById("id_TestPage_NewTest_I1").value=this.cccTest_NewFrequency_Options[2];
    document.getElementById("id_TestPage_NewTest_I2").value=this.cccTest_NewFrequency_Options[3];
    document.getElementById("id_TestPage_NewTest_I3").value=this.cccTest_NewFrequency_Options[4];
    document.getElementById("id_TestPage_NewTest_I4").value=this.cccTest_NewFrequency_Options[5];

    document.getElementById("id_TestPage_GridDimX").value=this.cccTest_NewFrequency_Options[6];
    document.getElementById("id_TestPage_GridDimY").value=this.cccTest_NewFrequency_Options[7];

    document.getElementById("id_TestPage_NewTest_I1").min=1;
    document.getElementById("id_TestPage_NewTest_I2").min=0;

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){

      document.getElementById("id_TestPage_NewTest_I3").min=0;
      document.getElementById("id_TestPage_NewTest_I3").max=1.0;

      document.getElementById("id_TestPage_NewTest_I4").min=0;
      document.getElementById("id_TestPage_NewTest_I4").max=1.0;

    }

    document.getElementById("id_TestPage_NewTest_I2").step=1;
    document.getElementById("id_TestPage_NewTest_I3").step=0.001;
    document.getElementById("id_TestPage_NewTest_I4").step=0.001;


    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    this.inform_Worker_PushInteractiveTest("CCCTest","Frequency",this.cccTest_NewFrequency_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateFrequencyTestVariables (){

    var increases = parseInt(document.getElementById("id_TestPage_NewTest_I2").value);
    document.getElementById("id_TestPage_NewTest_I2").value=increases;

    if(isNaN(increases)){
      openAlert("Invalid input for the number of increases!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(increases<0){
      openAlert("Invalid input for the number of increases! The value has to be an integer and positive!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    var waveStart = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
    document.getElementById("id_TestPage_NewTest_I3").value=waveStart;
    if(isNaN(waveStart)){
      openAlert("Invalid input for the number of wave start!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (waveStart<0 || waveStart>1.0)){
      openAlert("Invalid value for the wave start! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    var waveEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value=waveEnd;
    if(isNaN(waveEnd)){
      openAlert("Invalid input for the number of wave end!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (waveStart<0 || waveStart>1.0)){
      openAlert("Invalid value for the wave end! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    if(waveStart>=waveEnd){
      openAlert("Invalid value for the wave start/end! The value for the wave start has to be smaller than the value for the wave end!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    // check x,y DIM
    var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
    document.getElementById("id_TestPage_GridDimX").value=dimX;
    if(isNaN(dimX)){
      openAlert("Invalid input for the Grid x-dimension!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(dimX<2){
      openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
    document.getElementById("id_TestPage_GridDimY").value=dimY;
    if(isNaN(dimY)){
      openAlert("Invalid input for the Grid y-dimension!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(dimY<2){
      openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    document.getElementById("id_TestPage_CalcButton").style.display="block";

    //this.cccTest_NewFrequency_Options[2]=startFrequency;
    this.cccTest_NewFrequency_Options[3]=increases;
    this.cccTest_NewFrequency_Options[4]=waveStart;
    this.cccTest_NewFrequency_Options[5]=waveEnd;
    this.cccTest_NewFrequency_Options[6]=dimX;
    this.cccTest_NewFrequency_Options[7]=dimY;

  }

  /////////////////////////////////////
  /// Interactive Test (CCC-Tests::Treshold)

  selectNewTresholdTestType(){

    this.initNewTest();

    document.getElementById("id_TestPage_Dimension_Div").style.display="block";
    document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

    document.getElementById("id_TestPage_doRatioCheckbox").checked = this.cccTest_NewTreshold_Options[0];

    document.getElementById("id_TestPage_NewTest_V1").innerHTML="Min:";
    document.getElementById("id_TestPage_NewTest_V2").innerHTML="Treshold:";
    document.getElementById("id_TestPage_NewTest_V3").innerHTML="Max: ";
    document.getElementById("id_TestPage_NewTest_V4").innerHTML="Exponent: ";

    document.getElementById("id_TestPage_NewTest_I1").value= this.cccTest_NewTreshold_Options[3];
    document.getElementById("id_TestPage_NewTest_I2").value= this.cccTest_NewTreshold_Options[4];
    document.getElementById("id_TestPage_NewTest_I3").value= this.cccTest_NewTreshold_Options[5];

    document.getElementById("id_TestPage_NewTest_I1").max= this.cccTest_NewTreshold_Options[4];
    document.getElementById("id_TestPage_NewTest_I3").min= this.cccTest_NewTreshold_Options[4];

    document.getElementById("id_TestPage_NewTest_I4").value= this.cccTest_NewTreshold_Options[2];
    document.getElementById("id_TestPage_NewTest_I4").min= 2;
    document.getElementById("id_TestPage_NewTest_I4").step= 1;

    document.getElementById("id_TestPage_NewTest_I1").step= 0.001;
    document.getElementById("id_TestPage_NewTest_I2").step= 0.001;
    document.getElementById("id_TestPage_NewTest_I3").step= 0.001;

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      document.getElementById("id_TestPage_NewTest_I1").min= 0;
      document.getElementById("id_TestPage_NewTest_I1").max= 1;
      document.getElementById("id_TestPage_NewTest_I2").min= 0;
      document.getElementById("id_TestPage_NewTest_I2").max= 1;
      document.getElementById("id_TestPage_NewTest_I3").min= 0;
      document.getElementById("id_TestPage_NewTest_I3").max= 1;
    }
    else {
      document.getElementById("id_TestPage_NewTest_I1").min= undefined;
      document.getElementById("id_TestPage_NewTest_I1").max= undefined;
      document.getElementById("id_TestPage_NewTest_I2").min= undefined;
      document.getElementById("id_TestPage_NewTest_I2").max= undefined;
      document.getElementById("id_TestPage_NewTest_I3").min= undefined;
      document.getElementById("id_TestPage_NewTest_I3").max= undefined;
    }

    document.getElementById("id_TestPage_XFctType_Div").style.display="block";
    document.getElementById("id_TestPage_NewTest_XTypeL1").innerHTML=" : Linear-Surrounding";
    document.getElementById("id_TestPage_NewTest_XTypeL2").innerHTML=" : Flat-Surrounding";
    document.getElementById("id_TestPage_NewTest_XTypeL3").innerHTML=" : Steep-Surrounding";

    this.current_xFktType= this.cccTest_NewTreshold_Options[1];
    switch (this.current_xFktType) { // mType
      case 0:
        document.getElementById("id_TestPage_NewTest_XType1").checked = true;
        break;
        case 1:
          document.getElementById("id_TestPage_NewTest_XType2").checked = true;
          break;
          case 2:
            document.getElementById("id_TestPage_NewTest_XType3").checked = true;
            break;
    }

    document.getElementById("id_TestPage_GridDimX").value=this.cccTest_NewTreshold_Options[6];
    document.getElementById("id_TestPage_GridDimY").value=this.cccTest_NewTreshold_Options[7];

    this.draw_TesholdFunctionType();

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    this.inform_Worker_PushInteractiveTest("CCCTest","Treshold",this.cccTest_NewTreshold_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateTresholdTestVariables(){
      this.check_xFktType();

      if(this.current_xFktType==0){
        document.getElementById("id_TestPage_NewTest_I4").disabled=true;
        document.getElementById("id_TestPage_NewTest_I4").value=1;
      }
      else{
        document.getElementById("id_TestPage_NewTest_I4").disabled=false;

        if(document.getElementById("id_TestPage_NewTest_I4").value==1)
        document.getElementById("id_TestPage_NewTest_I4").value=2
      }

      var value_m = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
      document.getElementById("id_TestPage_NewTest_I1").value = value_m;
      if(isNaN(value_m)){
        openAlert("Invalid input for the m-value!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_m<0 || value_m>1.0)){
        openAlert("Invalid input for the m-value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      var value_T = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
      document.getElementById("id_TestPage_NewTest_I2").value = value_T;
      if(isNaN(value_T)){
        openAlert("Invalid input for the T-value!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_T<0 || value_T>1.0)){
        openAlert("Invalid input for the T-value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }


      var value_M = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
      document.getElementById("id_TestPage_NewTest_I3").value = value_M;
      if(isNaN(value_M)){
        openAlert("Invalid input for the M-value!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_M<0 || value_M>1.0)){
        openAlert("Invalid input for the M-value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      var exp = parseInt(document.getElementById("id_TestPage_NewTest_I4").value);
      document.getElementById("id_TestPage_NewTest_I4").value = exp;
      if(isNaN(exp)){
        openAlert("Invalid input for the exponent!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      if(document.getElementById("id_TestPage_NewTest_I4").disabled==false && exp<2){
        openAlert("Invalid input for the exponent! The value is not allowed to be smaller than two!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      if(!(value_m<value_T && value_T<value_M)){
        openAlert("Invalid input! The m-value has to be smaller than the T-value and the T-value has to be smaller than the M-Value!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
      document.getElementById("id_TestPage_GridDimX").value=dimX;
      if(isNaN(dimX)){
        openAlert("Invalid input for the Grid x-dimension!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }
      if(dimX<2){
        openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
      document.getElementById("id_TestPage_GridDimY").value=dimY;
      if(isNaN(dimY)){
        openAlert("Invalid input for the Grid y-dimension!");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }
      if(dimY<2){
        openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
        document.getElementById("id_TestPage_CalcButton").style.display="none";
        return;
      }

      document.getElementById("id_TestPage_CalcButton").style.display="block";

      this.cccTest_NewTreshold_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;
      this.cccTest_NewTreshold_Options[1] = this.current_xFktType;
      this.cccTest_NewTreshold_Options[3]=value_m;
      this.cccTest_NewTreshold_Options[4]=value_T;
      this.cccTest_NewTreshold_Options[5]=value_M;
      this.cccTest_NewTreshold_Options[2]=exp;
      this.cccTest_NewTreshold_Options[6]=dimX;
      this.cccTest_NewTreshold_Options[7]=dimY;

      this.draw_TesholdFunctionType();
  }

  switchRatioType_TresholdTest(){
    this.cccTest_NewTreshold_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      this.cccTest_NewTreshold_Options[3]=0.0;
      this.cccTest_NewTreshold_Options[4]=0.5;
      this.cccTest_NewTreshold_Options[5]=1.0;
    }
    else {
      this.cccTest_NewTreshold_Options[3]=testingSection.testingCMS.getRefPosition(0);
      this.cccTest_NewTreshold_Options[4]=testingSection.testingCMS.getRefPosition(0)+0.5*(testingSection.testingCMS.getRefPosition(testingSection.testingCMS.getKeyLength()-1)-testingSection.testingCMS.getRefPosition(0));
      this.cccTest_NewTreshold_Options[5]=testingSection.testingCMS.getRefPosition(testingSection.testingCMS.getKeyLength()-1);
    }
    this.selectNewTresholdTestType();
  }

  draw_TesholdFunctionType(){
    var exp= document.getElementById("id_TestPage_NewTest_I4").value;
    var value_m = document.getElementById("id_TestPage_NewTest_I1").value;
    var value_T = document.getElementById("id_TestPage_NewTest_I2").value;
    var value_M = document.getElementById("id_TestPage_NewTest_I3").value;

    this.draw_FunctionTypeTresh("id_TestPage_Canvas_xFktType", exp, this.current_xFktType);
  }

  /////////////////////////////////////
  /// Interactive Test (Function-Collection::BowlShaped)

  selectNewFctBowlShapedType(){
    document.getElementById("id_TestPage_Dimension_Div").style.display="block";

    document.getElementById("id_TestPage_FctSelection_Div").style.display="flex";
    document.getElementById("id_TestPage_doRatioCheckbox").disabled = true;

    document.getElementById("id_TestPage_FctSelection").innerHTML = [];

    var rememberID = -1;
    for (var i = 0; i < this.fctTest_BowlShaped_Options.length; i++) {
      var option = document.createElement("option");
      option.innerHTML = this.fctTest_BowlShaped_Options[i][0];
      document.getElementById("id_TestPage_FctSelection").add(option);

      if(this.fctTest_BowlShaped_Options[i][1] == this.fctTest_NewBowlShaped_Options[1])
        rememberID=i;
    }

    document.getElementById("id_TestPage_FctSelection").selectedIndex = rememberID;

    document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

    document.getElementById("id_TestPage_NewTest_V1").innerHTML="x"+"Start".sub()+":";
    document.getElementById("id_TestPage_NewTest_V2").innerHTML="x"+"End".sub()+":";
    document.getElementById("id_TestPage_NewTest_V3").innerHTML="y"+"Start".sub()+":";
    document.getElementById("id_TestPage_NewTest_V4").innerHTML="y"+"End".sub()+":";

    document.getElementById("id_TestPage_NewTest_I1").value= this.fctTest_NewBowlShaped_Options[2][0];
    document.getElementById("id_TestPage_NewTest_I2").value= this.fctTest_NewBowlShaped_Options[2][1];
    document.getElementById("id_TestPage_NewTest_I3").value= this.fctTest_NewBowlShaped_Options[2][2];
    document.getElementById("id_TestPage_NewTest_I4").value= this.fctTest_NewBowlShaped_Options[2][3];

    document.getElementById("id_TestPage_GridDimX").value=this.fctTest_NewBowlShaped_Options[3];
    document.getElementById("id_TestPage_GridDimY").value=this.fctTest_NewBowlShaped_Options[4];

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    this.inform_Worker_PushInteractiveTest("Collection",this.fctTest_NewBowlShaped_Options[1],this.fctTest_NewBowlShaped_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateFctBowlShapedTestVariables(){

    var xStart = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
    document.getElementById("id_TestPage_NewTest_I1").value=xStart;
    if(isNaN(xStart)){
      openAlert("Invalid input for the x"+"Start".sub()+".");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    var xEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    document.getElementById("id_TestPage_NewTest_I2").value=xEnd;
    if(isNaN(xEnd)){
      openAlert("Invalid input for the x"+"End".sub()+".");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    if(xStart>=xEnd){
      openAlert("Invalid input for the x"+"Start".sub()+" and x"+"End".sub()+". The start value has to be smaller than the end value!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    var yStart = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
    document.getElementById("id_TestPage_NewTest_I3").value=yStart;
    if(isNaN(yStart)){
      openAlert("Invalid input for the y"+"Start".sub()+".");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    var yEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value=yEnd;
    if(isNaN(yEnd)){
      openAlert("Invalid input for the y"+"End".sub()+".");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    if(yStart>=yEnd){
      openAlert("Invalid input for the y"+"Start".sub()+" and y"+"End".sub()+". The start value has to be smaller than the end value!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    // check x,y DIM
    var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
    document.getElementById("id_TestPage_GridDimX").value=dimX;
    if(isNaN(dimX)){
      openAlert("Invalid input for the Grid x-dimension!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(dimX<2){
      openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
    document.getElementById("id_TestPage_GridDimY").value=dimY;
    if(isNaN(dimY)){
      openAlert("Invalid input for the Grid y-dimension!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(dimY<2){
      openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    document.getElementById("id_TestPage_CalcButton").style.display="block";

    this.fctTest_NewBowlShaped_Options[2][0]=xStart;
    this.fctTest_NewBowlShaped_Options[2][1]=xEnd;
    this.fctTest_NewBowlShaped_Options[2][2]=yStart;
    this.fctTest_NewBowlShaped_Options[2][3]=yEnd;

    this.fctTest_NewBowlShaped_Options[3]=dimX;
    this.fctTest_NewBowlShaped_Options[4]=dimY;
  }

  updateBowlShapedFctSelection(){
    var selectedID = document.getElementById("id_TestPage_FctSelection").selectedIndex;
    this.openFctBowlShapedTest(selectedID);
  }

  openFctBowlShapedTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.fctTest_BowlShaped_Options[tmpID].length; i++) {

    if(i==2){
      var tmpArray2 = [];
      for (var j = 0; j < this.fctTest_BowlShaped_Options[tmpID][2].length; j++) {
        var tmpVal = this.fctTest_BowlShaped_Options[tmpID][2][j];
        tmpArray2.push(tmpVal);
      }
      tmpArray.push(tmpArray2);
    }
    else{
      var tmpVal = this.fctTest_BowlShaped_Options[tmpID][i];
      tmpArray.push(tmpVal);
    }

  }

  this.fctTest_NewBowlShaped_Options = tmpArray;

  this.initNewTest();
  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 9;
  this.selectNewFctBowlShapedType();

  }

  /////////////////////////////////////
  /// Interactive Test (Function-Collection::Local Minimum)

  selectNewFctLocalMinimaType(){
    document.getElementById("id_TestPage_Dimension_Div").style.display="block";

    document.getElementById("id_TestPage_FctSelection_Div").style.display="flex";
    document.getElementById("id_TestPage_doRatioCheckbox").disabled = true;

    document.getElementById("id_TestPage_FctSelection").innerHTML = [];

    var rememberID = -1;
    for (var i = 0; i < this.fctTest_LocalMin_Options.length; i++) {
      var option = document.createElement("option");
      option.innerHTML = this.fctTest_LocalMin_Options[i][0];
      document.getElementById("id_TestPage_FctSelection").add(option);

      if(this.fctTest_LocalMin_Options[i][1] == this.fctTest_NewLocalMin_Options[1])
        rememberID=i;
    }

    document.getElementById("id_TestPage_FctSelection").selectedIndex = rememberID;

    document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

    document.getElementById("id_TestPage_NewTest_V1").innerHTML="x"+"Start".sub()+":";
    document.getElementById("id_TestPage_NewTest_V2").innerHTML="x"+"End".sub()+":";
    document.getElementById("id_TestPage_NewTest_V3").innerHTML="y"+"Start".sub()+":";
    document.getElementById("id_TestPage_NewTest_V4").innerHTML="y"+"End".sub()+":";

    document.getElementById("id_TestPage_NewTest_I1").value= this.fctTest_NewLocalMin_Options[2][0];
    document.getElementById("id_TestPage_NewTest_I2").value= this.fctTest_NewLocalMin_Options[2][1];
    document.getElementById("id_TestPage_NewTest_I3").value= this.fctTest_NewLocalMin_Options[2][2];
    document.getElementById("id_TestPage_NewTest_I4").value= this.fctTest_NewLocalMin_Options[2][3];

    document.getElementById("id_TestPage_GridDimX").value=this.fctTest_NewLocalMin_Options[3];
    document.getElementById("id_TestPage_GridDimY").value=this.fctTest_NewLocalMin_Options[4];

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    this.inform_Worker_PushInteractiveTest("Collection",this.fctTest_NewLocalMin_Options[1],this.fctTest_NewLocalMin_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateFctLocalMinimaTestVariables(){

    var xStart = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
    document.getElementById("id_TestPage_NewTest_I1").value=xStart;
    if(isNaN(xStart)){
      openAlert("Invalid input for the x"+"Start".sub()+".");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    var xEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    document.getElementById("id_TestPage_NewTest_I2").value=xEnd;
    if(isNaN(xEnd)){
      openAlert("Invalid input for the x"+"End".sub()+".");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    if(xStart>=xEnd){
      openAlert("Invalid input for the x"+"Start".sub()+" and x"+"End".sub()+". The start value has to be smaller than the end value!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    var yStart = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
    document.getElementById("id_TestPage_NewTest_I3").value=yStart;
    if(isNaN(yStart)){
      openAlert("Invalid input for the y"+"Start".sub()+".");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    var yEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value=yEnd;
    if(isNaN(yEnd)){
      openAlert("Invalid input for the y"+"End".sub()+".");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    if(yStart>=yEnd){
      openAlert("Invalid input for the y"+"Start".sub()+" and y"+"End".sub()+". The start value has to be smaller than the end value!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    // check x,y DIM
    var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
    document.getElementById("id_TestPage_GridDimX").value=dimX;
    if(isNaN(dimX)){
      openAlert("Invalid input for the Grid x-dimension!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(dimX<2){
      openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
    document.getElementById("id_TestPage_GridDimY").value=dimY;
    if(isNaN(dimY)){
      openAlert("Invalid input for the Grid y-dimension!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(dimY<2){
      openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    document.getElementById("id_TestPage_CalcButton").style.display="block";

    this.fctTest_NewLocalMin_Options[2][0]=xStart;
    this.fctTest_NewLocalMin_Options[2][1]=xEnd;
    this.fctTest_NewLocalMin_Options[2][2]=yStart;
    this.fctTest_NewLocalMin_Options[2][3]=yEnd;

    this.fctTest_NewLocalMin_Options[3]=dimX;
    this.fctTest_NewLocalMin_Options[4]=dimY;
  }

  updateLocalMinimaFctSelection(){
    var selectedID = document.getElementById("id_TestPage_FctSelection").selectedIndex;
    this.openFctLocalMinimaTest(selectedID);
  }

  openFctLocalMinimaTest(tmpID){

    var tmpArray = [];
    for (var i = 0; i < this.fctTest_LocalMin_Options[tmpID].length; i++) {

      if(i==2){
        var tmpArray2 = [];
        for (var j = 0; j < this.fctTest_LocalMin_Options[tmpID][2].length; j++) {
          var tmpVal = this.fctTest_LocalMin_Options[tmpID][2][j];
          tmpArray2.push(tmpVal);
        }
        tmpArray.push(tmpArray2);
      }
      else{
        var tmpVal = this.fctTest_LocalMin_Options[tmpID][i];
        tmpArray.push(tmpVal);
      }

    }
    this.fctTest_NewLocalMin_Options = tmpArray;

    this.initNewTest();
    document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 8;
    this.selectNewFctLocalMinimaType();
  }
  /////////////////////////////////////
  /// Interactive Test (Function-Collection::Valley Shaped)

  selectNewFctValleyShapedType(){
    document.getElementById("id_TestPage_Dimension_Div").style.display="block";

    document.getElementById("id_TestPage_FctSelection_Div").style.display="flex";
    document.getElementById("id_TestPage_doRatioCheckbox").disabled = true;

    document.getElementById("id_TestPage_FctSelection").innerHTML = [];

    var rememberID = -1;
    for (var i = 0; i < this.fctTest_ValleyShaped_Options.length; i++) {
      var option = document.createElement("option");
      option.innerHTML = this.fctTest_ValleyShaped_Options[i][0];
      document.getElementById("id_TestPage_FctSelection").add(option);

      if(this.fctTest_ValleyShaped_Options[i][1] == this.fctTest_NewValleyShaped_Options[1])
        rememberID=i;
    }

    document.getElementById("id_TestPage_FctSelection").selectedIndex = rememberID;

    document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
    document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

    document.getElementById("id_TestPage_NewTest_V1").innerHTML="x"+"Start".sub()+":";
    document.getElementById("id_TestPage_NewTest_V2").innerHTML="x"+"End".sub()+":";
    document.getElementById("id_TestPage_NewTest_V3").innerHTML="y"+"Start".sub()+":";
    document.getElementById("id_TestPage_NewTest_V4").innerHTML="y"+"End".sub()+":";

    document.getElementById("id_TestPage_NewTest_I1").value= this.fctTest_NewValleyShaped_Options[2][0];
    document.getElementById("id_TestPage_NewTest_I2").value= this.fctTest_NewValleyShaped_Options[2][1];
    document.getElementById("id_TestPage_NewTest_I3").value= this.fctTest_NewValleyShaped_Options[2][2];
    document.getElementById("id_TestPage_NewTest_I4").value= this.fctTest_NewValleyShaped_Options[2][3];

    document.getElementById("id_TestPage_GridDimX").value=this.fctTest_NewValleyShaped_Options[3];
    document.getElementById("id_TestPage_GridDimY").value=this.fctTest_NewValleyShaped_Options[4];

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    this.inform_Worker_PushInteractiveTest("Collection",this.fctTest_NewValleyShaped_Options[1],this.fctTest_NewValleyShaped_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateFctValleyShapedTestVariables(){

    var xStart = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
    document.getElementById("id_TestPage_NewTest_I1").value=xStart;
    if(isNaN(xStart)){
      openAlert("Invalid input for the x"+"Start".sub()+".");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    var xEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    document.getElementById("id_TestPage_NewTest_I2").value=xEnd;
    if(isNaN(xEnd)){
      openAlert("Invalid input for the x"+"End".sub()+".");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    if(xStart>=xEnd){
      openAlert("Invalid input for the x"+"Start".sub()+" and x"+"End".sub()+". The start value has to be smaller than the end value!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    var yStart = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
    document.getElementById("id_TestPage_NewTest_I3").value=yStart;
    if(isNaN(yStart)){
      openAlert("Invalid input for the y"+"Start".sub()+".");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    var yEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value=yEnd;
    if(isNaN(yEnd)){
      openAlert("Invalid input for the y"+"End".sub()+".");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    if(yStart>=yEnd){
      openAlert("Invalid input for the y"+"Start".sub()+" and y"+"End".sub()+". The start value has to be smaller than the end value!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    // check x,y DIM
    var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
    document.getElementById("id_TestPage_GridDimX").value=dimX;
    if(isNaN(dimX)){
      openAlert("Invalid input for the Grid x-dimension!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(dimX<2){
      openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
    document.getElementById("id_TestPage_GridDimY").value=dimY;
    if(isNaN(dimY)){
      openAlert("Invalid input for the Grid y-dimension!");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }
    if(dimY<2){
      openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      document.getElementById("id_TestPage_CalcButton").style.display="none";
      return;
    }

    document.getElementById("id_TestPage_CalcButton").style.display="block";

    this.fctTest_NewValleyShaped_Options[2][0]=xStart;
    this.fctTest_NewValleyShaped_Options[2][1]=xEnd;
    this.fctTest_NewValleyShaped_Options[2][2]=yStart;
    this.fctTest_NewValleyShaped_Options[2][3]=yEnd;

    this.fctTest_NewValleyShaped_Options[3]=dimX;
    this.fctTest_NewValleyShaped_Options[4]=dimY;
  }

  updateValleyShapedFctSelection(){
    var selectedID = document.getElementById("id_TestPage_FctSelection").selectedIndex;
    this.openFctValleyShapedTest(selectedID);
  }

  openFctValleyShapedTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.fctTest_ValleyShaped_Options[tmpID].length; i++) {

    if(i==2){
      var tmpArray2 = [];
      for (var j = 0; j < this.fctTest_ValleyShaped_Options[tmpID][2].length; j++) {
        var tmpVal = this.fctTest_ValleyShaped_Options[tmpID][2][j];
        tmpArray2.push(tmpVal);
      }
      tmpArray.push(tmpArray2);
    }
    else{
      var tmpVal = this.fctTest_ValleyShaped_Options[tmpID][i];
      tmpArray.push(tmpVal);
    }

  }

  this.fctTest_NewValleyShaped_Options = tmpArray;

  this.initNewTest();
  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 10;
  this.selectNewFctValleyShapedType();

  }

  /////////////////////////////////////
  /// Interactive Test (Real World Data)

  selectRealWorldType(index){

    document.getElementById("id_TestPage_FctSelection").innerHTML = [];

    document.getElementById("id_TestPage_FctSelection_Div").style.display="flex";
    document.getElementById("id_TestPage_doRatioCheckbox").disabled = true;

    switch (this.selectedRealWorldType) {
      case "medical":

            for (var i = 0; i < this.medicalData.length; i++) {
              var option = document.createElement("option");
              option.innerHTML = this.medicalLabels[i];
              document.getElementById("id_TestPage_FctSelection").add(option);
            }

        break;
      case "scientificFlowSim":

            for (var i = 0; i < this.scientificFlowSimData.length; i++) {
              var option = document.createElement("option");
              option.innerHTML = this.scientificFlowSimLabels[i];
              document.getElementById("id_TestPage_FctSelection").add(option);
            }

        break;
        case "photographs":

          for (var i = 0; i < this.photographsData.length; i++) {
            var option = document.createElement("option");
            option.innerHTML = this.photographsLabels[i];
            document.getElementById("id_TestPage_FctSelection").add(option);
          }

          break;
      default:
        return;
    }
    document.getElementById("id_TestPage_FctSelection").selectedIndex = index;
    this.checkAcknowledgements(index);
    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    this.inform_Worker_PushInteractiveTest("RealData",this.selectedRealWorldType,index);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateRealWorldVariables(){
    var selectedID = document.getElementById("id_TestPage_FctSelection").selectedIndex;
    this.checkAcknowledgements(selectedID);
  }

  checkAcknowledgements(selectedID){
    var index = undefined;

    switch (this.selectedRealWorldType) {
      case "medical":

          if(this.medicalAcknowlegments[selectedID]!=undefined)
            index=this.medicalAcknowlegments[selectedID];

        break;
      case "scientificFlowSim":

           if(this.scientificFlowSimAcknowlegments[selectedID]!=undefined)
            index=this.scientificFlowSimAcknowlegments[selectedID];

        break;
        case "photographs":

           if(this.photographsAcknowlegments[selectedID]!=undefined)
            index=this.photographsAcknowlegments[selectedID];

          break;
      default:
        return;
    }

    if(index!=undefined){
      document.getElementById("id_TestPage_newTestAcknowledgmentsDiv").style.display="block";

      var atext = "Acknowledgments".bold()+": We thank "+this.acknowlegments[index].blankLink(this.acknowlegmentsURL[index])+" for provision of real world data.";

     if(this.acknowlegmentsAdditional[index]!=undefined){
      atext += "\n"+this.acknowlegmentsAdditional[index];
     }

      document.getElementById("id_TestPage_newTestAcknowledgmentsText").innerHTML = atext;

    }
    else{
      document.getElementById("id_TestPage_newTestAcknowledgmentsDiv").style.display="none";
    }

  }

  /////////////////////////////////////
  /// Interactive Test (Noise)

  calcNoise(noiseType,noiseProportion,noiseDistribution){
    var workerJSON = {};
    workerJSON['message'] = "calcNoiseField";
    workerJSON['noiseType']=document.getElementById("id_Test_NoiseType").selectedIndex;
    workerJSON['noiseProportion']=parseFloat(document.getElementById("id_Test_NoiseProportion").value);
    workerJSON['noiseDistribution']=document.getElementById("id_Test_NoiseDistribution").selectedIndex;
    workerJSON['noiseScaling']=parseInt(document.getElementById("id_Test_NoiseScaling").value);
    workerJSON['noiseMaxChange']=parseFloat(document.getElementById("id_Test_NoiseMaxChange").value);
    workerJSON['noiseBehavior']=document.getElementById("id_Test_NoiseBehavior").selectedIndex;
    workerJSON['replaceFrom'] = parseFloat(document.getElementById("id_TestPage_Noise_ReplaceFromValue").value);
    workerJSON['replaceNoiseTill'] = parseFloat(document.getElementById("id_TestPage_Noise_ReplaceTillValue").value);
    this.worker_testInteractive.postMessage(workerJSON);
  }

  updateNoise() {
    document.getElementById("id_TestPage_newTestNoiseDivSub").style.display = "none";
    document.getElementById("id_Test_NoiseProportionDiv").style.display = "none";
    document.getElementById("id_Test_NoiseDistributionDiv").style.display = "none";
    document.getElementById("id_Test_NoiseScalingDiv").style.display = "none";
    document.getElementById("id_Test_NoiseMaxChangeDiv").style.display = "none";
    document.getElementById("id_Test_NoiseValueRangeDiv1").style.display = "none";
    document.getElementById("id_Test_NoiseValueRangeDiv2").style.display = "none";
    document.getElementById("id_Test_NoiseBehaviorReplacing").disabled = false;

    //this.noiseField_WorkerJSON.addNoise = false;

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
        }

        if (document.getElementById("id_Test_NoiseBehavior").selectedIndex == 2) {
          document.getElementById("id_Test_NoiseMaxChangeDiv").style.display = "none";
          document.getElementById("id_Test_NoiseValueRangeDiv1").style.display = "flex";
          document.getElementById("id_Test_NoiseValueRangeDiv2").style.display = "flex";
        }

        // For the Worker
        //this.noiseField_WorkerJSON.addNoise = true;
        //this.noiseField_WorkerJSON.noiseBehavior = document.getElementById("id_Test_NoiseBehavior").selectedIndex;
        //this.noiseField_WorkerJSON.maxChange = parseFloat(document.getElementById("id_Test_NoiseMaxChange").value);

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

        this.calcNoise();
        break;
    }

    //this.worker_testInteractive.postMessage(this.noiseField_WorkerJSON);

  }

  /////////////////////////////////////
  ///// 3D Rendering

  resize(){

  }

  downloadTestImage() {

    var testing_ImgData = undefined;
    if (document.getElementById("id_TestVisualization_Mesh").checked) {
      this.stopAnimationTestMapping();
      var oldSize = this.testmapping_renderer.getSize();
      this.testmapping_renderer.setSize(2160, 2160);
      this.testmapping_renderer.preserveDrawingBuffer = true;
      this.testmapping_renderer.render(this.testmapping_scene, this.testmapping_camera);
      testing_ImgData = this.testmapping_renderer.domElement.toDataURL();
      this.testmapping_renderer.preserveDrawingBuffer = false;
      this.testmapping_renderer.setSize(oldSize.width, oldSize.height);
      this.startAnimationTestMapping();
    } else {
      var canvasID = "id_Test_PixelCanvas";
      if (document.getElementById("id_PopUp_fullTestingWindow").style.display != "none")
        var canvasID = "id_Test_PixelCanvasFull"
      testing_ImgData = document.getElementById(canvasID).toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    }
    document.getElementById("id_Test_downloadScreenshot").href = testing_ImgData;
    document.getElementById("id_Test_downloadScreenshotFull").href = testing_ImgData;
  }

  downloadTestImageGrey(){
    var testing_ImgData = undefined;
    if (document.getElementById("id_TestVisualization_Mesh").checked) {
      this.stopAnimationTestMapping();
      var oldSize = this.testmapping_rendererGrey.getSize();
      this.testmapping_rendererGrey.setSize(2160, 2160);
      this.testmapping_rendererGrey.preserveDrawingBuffer = true;
      this.testmapping_rendererGrey.render(this.testmapping_sceneGrey, this.testmapping_cameraGrey);
      testing_ImgData = this.testmapping_rendererGrey.domElement.toDataURL();
      this.testmapping_rendererGrey.preserveDrawingBuffer = false;
      this.testmapping_rendererGrey.setSize(oldSize.width, oldSize.height);
      this.startAnimationTestMapping();
    } else {
      var canvasID = "id_Test_PixelCanvasGrey";
      if (document.getElementById("id_PopUp_fullTestingWindow").style.display != "none")
        var canvasID = "id_Test_PixelCanvasGreyFull"
      testing_ImgData = document.getElementById(canvasID).toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    }
    document.getElementById("id_Test_downloadScreenshotGrey").href = testing_ImgData;
    document.getElementById("id_Test_downloadScreenshotGreyFull").href = testing_ImgData;
  }

  stopAnimationTestMapping(){

  }

  startAnimationTestMapping(){

  }

};
