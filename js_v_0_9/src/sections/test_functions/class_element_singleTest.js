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
    this.tm_mesh=undefined;
    this.tm_meshGrey=undefined;
    this.tm_do3D = false;
    this.tm_3D_scalefactor = 1.0;
    this.tm_scene;
    this.tm_camera;
    this.tm_renderer;
    this.tm_group;
    this.tm_mesh;
    this.tm_controls;
    this.tm_sceneGrey;
    this.tm_cameraGrey;
    this.tm_rendererGrey;
    this.tm_groupGrey;
    this.tm_meshGrey;
    this.tm_doAnimation = false;
    this.tm_borderX = 100;
    this.tm_borderY = 100;
    this.tm_drawBB = false;
    this.tm_mesh_BB = undefined; // Bounding Box
    this.tm_meshcenter =undefined;
    this.tm_drawAxes = false;
    this.tm_bg_texture;
    this.tm_bg_width;
    this.tm_bg_height;
    this.tm_animationID=undefined;
    this.tm_zoomFactor=0
    this.tm_camera_maxRadius=-100;
    this.tm_camera_minRadius=-0.1;
    this.tm_doRotation = false;
    this.tm_doTranslation = false;
    this.mousePosX=undefined;
    this.mousePosY=undefined;

    //////////////////////////////////////////////////
    /// Worker
    this.worker_testInteractive_finished=true;
    this.worker_testInteractive = new Worker(version_JS_FolderName+"/src/sections/test_functions/worker/worker_SingleTesting.js"); //, { type: "module" });
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
    this.tm_init();
    this.styleVisOptions();
  }

  resize(){
    if(this.isElementOpen() && document.getElementById("id_TestVisualization_Mesh").checked)
      this.tm_3D_Resize();
  }

  addTestToReport(){
    var testLabel = "";
    var testSublabel = "";
    var optionList = [];

    switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
      case 0:
        testLabel = "CCCTest";
        testSublabel = "Jump";
        optionList = this.copyOptions(this.cccTest_NewJump_Options);
        break;
      case 1:
        testLabel = "CCCTest";
        testSublabel = "Gradient";
        optionList = this.copyOptions(this.cccTest_NewGradient_Options);
        break;
      case 2:
        testLabel = "CCCTest";
        testSublabel = "RiVa";
        optionList = this.copyOptions(this.cccTest_NewRidgeValley_Options);
        break;
      case 3:
        testLabel = "CCCTest";
        testSublabel = "Extrema";
        optionList = this.copyOptions(this.cccTest_NewLocalExtrema_Options);
        break;
      case 4:
        testLabel = "CCCTest";
        testSublabel = "Frequency";
        optionList = this.copyOptions(this.cccTest_NewFrequency_Options);
        break;
      case 5:
        testLabel = "CCCTest";
        testSublabel = "LittleBit";
        optionList = this.copyOptions(this.cccTest_NewLittleBit_Options);
        break;
      case 6:
        testLabel = "CCCTest";
        testSublabel = "Treshold";
        optionList = this.copyOptions(this.cccTest_NewTreshold_Options);
        break;
      case 7:
        testLabel = "CCCTest";
        testSublabel = "Topology";
        optionList = this.copyOptions(this.cccTest_NewTopology_Options);
        break;
        /////////////////////////////////////
      case 8:
        testLabel = "Collection";
        testSublabel = fctTest_NewLocalMin_Options[1];
        optionList = this.copyOptions(this.fctTest_NewLocalMin_Options);
        break;
      case 9:
        testLabel = "Collection";
        testSublabel = fctTest_NewBowlShaped_Options[1];
        optionList = this.copyOptions(this.fctTest_NewBowlShaped_Options);
        break;
      case 10:
        testLabel = "Collection";
        testSublabel = fctTest_NewValleyShaped_Options[1];
        optionList = this.copyOptions(this.fctTest_NewValleyShaped_Options);
        break;
        /////////////////////////////////////
      case 11:
      case 12:
      case 13:
        testLabel = "RealData";
        testSublabel = this.selectedRealWorldType;
        optionList = document.getElementById("id_TestPage_FctSelection").selectedIndex;
        break;
    }
    testingSection.element_testReport.reportListTestInfo.push([testLabel,testSublabel,optionList]);
    testingSection.element_testReport.reportListTestField.push(undefined);
    this.request_Worker_Testfield(testingSection.element_testReport.reportListTestField.length-1);
    // switch to report page at the event, when the worker has send the testfield to the main thread
  }

  copyOptions(options) {
    var newOptions = [];
    for (var i = 0; i < options.length; i++) {
      if (Array.isArray(options[i])) {
        newOptions.push(this.copyOptions(options[i]));
      } else {
        var tmp = options[i];
        newOptions.push(tmp);
      }
    }
    return newOptions;
  }

  showElement(){
    super.showElement();
    this.selectNewTestType();

    if (document.getElementById("id_TestVisualization_Mesh").checked)
      this.tm_startAnimation();

  }

  hideElement(){
    this.tm_stopAnimation();
    super.hideElement();
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

    if (this.tm_mesh != undefined) {
      this.tm_mesh.visible = false;
      this.tm_meshGrey.visible = false;
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
    this.tm_stopAnimation();

    if (document.getElementById("id_TestVisualization_Mesh").checked)
      this.tm_startAnimation();

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

  inform_Worker_GetVisualisation(){
    var workerJSON = {};
    workerJSON['message'] = "getVisData";

    if(document.getElementById("id_TestVisualization_Pixel").checked)
      workerJSON['visType'] = "pixel";
    else{
      workerJSON['visType'] = "mesh";
      workerJSON['do3DTestField'] = this.tm_do3D;
      workerJSON['scalefactor3DTest'] = this.tm_3D_scalefactor;
    }
    return workerJSON;
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
      document.getElementById("id_Test_ScaleFactor").value = 1;
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
      this.tm_mesh.visible = false;
      this.tm_meshGrey.visible = false;
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
  ///// 3D Rendering (test mapping)


  tm_screenshot() {

    var testing_ImgData = undefined;
    if (document.getElementById("id_TestVisualization_Mesh").checked) {
      this.tm_stopAnimation();
      var oldSize = this.tm_renderer.getSize();
      this.tm_renderer.setSize(2160, 2160);
      this.tm_renderer.preserveDrawingBuffer = true;
      this.tm_renderer.render(this.tm_scene, this.tm_camera);
      testing_ImgData = this.tm_renderer.domElement.toDataURL();
      this.tm_renderer.preserveDrawingBuffer = false;
      this.tm_renderer.setSize(oldSize.width, oldSize.height);
      this.tm_startAnimation();
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

  tm_screenshotGrey(){
    var testing_ImgData = undefined;
    if (document.getElementById("id_TestVisualization_Mesh").checked) {
      this.tm_stopAnimation();
      var oldSize = this.tm_rendererGrey.getSize();
      this.tm_rendererGrey.setSize(2160, 2160);
      this.tm_rendererGrey.preserveDrawingBuffer = true;
      this.tm_rendererGrey.render(this.tm_sceneGrey, this.tm_cameraGrey);
      testing_ImgData = this.tm_rendererGrey.domElement.toDataURL();
      this.tm_rendererGrey.preserveDrawingBuffer = false;
      this.tm_rendererGrey.setSize(oldSize.width, oldSize.height);
      this.tm_startAnimation();
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

  tm_3D_Resize()
  {
    if(this.tm_doAnimation){
      var idCanvas="id_Test_MeshVisDiv";
      var idCanvasGrey = "id_Test_MeshVisDivGrey";

      if(document.getElementById("id_PopUp_fullTestingWindow").style.display!="none"){
        idCanvas="id_Test_MeshVisDivFull";
        idCanvasGrey = "id_Test_MeshVisDivGreyFull";
      }

      var canvasObj = document.getElementById(idCanvas);

      if(canvasObj!=undefined && canvasObj!=null){
        canvasObj.innerHTML = "";
        var box = canvasObj.getBoundingClientRect();
        var drawWidth = box.width; //window.innerWidth;
        var drawHeight = box.height; // window.innerHeight;
        canvasObj.appendChild( this.tm_renderer.domElement );
      	this.tm_camera.aspect = drawWidth/drawHeight;
      	this.tm_camera.updateProjectionMatrix();
      	this.tm_renderer.setSize(drawWidth, drawHeight);
      }

      canvasObj = document.getElementById(idCanvasGrey);

      if(canvasObj!=undefined && canvasObj!=null){
        canvasObj.innerHTML = "";
        var box = canvasObj.getBoundingClientRect();
        var drawWidth = box.width; //window.innerWidth;
        var drawHeight = box.height; // window.innerHeight;
        canvasObj.appendChild( this.tm_rendererGrey.domElement );
      	this.tm_cameraGrey.aspect = drawWidth/drawHeight;
      	this.tm_cameraGrey.updateProjectionMatrix();
      	this.tm_rendererGrey.setSize(drawWidth, drawHeight);
      }
    }
  }

  tm_switchHightmap(){

      if(this.tm_do3D){
        this.tm_do3D=false;

        this.tm_group.rotation.y = Math.PI;
        this.tm_group.rotation.x = 0;
        this.tm_group.rotation.z = 0;

        this.tm_groupGrey.rotation.y = Math.PI;
        this.tm_groupGrey.rotation.x = 0;
        this.tm_groupGrey.rotation.z = 0;
        document.getElementById("id_TestPage_HightmapButton").innerHTML="3D";
        document.getElementById("id_TestPage_HightmapButtonFull").innerHTML="3D";
        document.getElementById("id_Test_ScaleFactor_Div").style.visibility="hidden";

      }
      else{
        this.tm_do3D=true;
        document.getElementById("id_TestPage_HightmapButton").innerHTML="2D";
        document.getElementById("id_TestPage_HightmapButtonFull").innerHTML="2D";

        document.getElementById("id_Test_ScaleFactor_Div").style.visibility="visible";
      }

      document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
      document.getElementById("id_Test_WaitForTestCalculation").style.display="flex";
      document.getElementById("id_Test_VisDiv").style.display="none";
      this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());

  }

  tm_showAxis(){
      if(this.tm_drawAxes){
        this.tm_drawAxes=false;
      }
      else{
        this.tm_drawAxes=true;
      }
      this.tm_updateMesh();
  }

  tm_showBB(){

      if(this.tm_drawBB){
        this.tm_drawBB=false;
      }
      else{
        this.tm_drawBB=true;
      }
      this.tm_updateMesh();
  }

  tm_Render() {

              this.tm_renderer.clear();
              this.tm_rendererGrey.clear();

              this.tm_renderer.render( this.tm_scene,this.tm_camera );
              this.tm_rendererGrey.render(this.tm_sceneGrey,this.tm_cameraGrey);

  }

  tm_stopAnimation(){
    if(this.tm_doAnimation){
      cancelAnimationFrame( this.tm_animationID );
      this.tm_doAnimation = false;
    }
  }

  tm_Animate() {
      if(testingSection.element_singleTest.tm_doAnimation){
        testingSection.element_singleTest.tm_animationID = requestAnimationFrame( testingSection.element_singleTest.tm_Animate );
        testingSection.element_singleTest.tm_Render();
      }
  }

  tm_startAnimation(){
    this.tm_doAnimation = true;
    this.tm_Animate();
  }

  tm_init()
  {
    //mapping_Translation_X=0;
    //mapping_Translation_Y=0;

    var canvasObj = document.getElementById("id_Test_MeshVisDiv");
    canvasObj.innerHTML = "";
    var box = canvasObj.getBoundingClientRect();

    this.tm_scene = new THREE.Scene();
  	this.tm_camera = new THREE.PerspectiveCamera(50,box.width / box.height, 1, 10000);
    this.tm_renderer = new THREE.WebGLRenderer({ alpha: true,antialias: true,
      logarithmicDepthBuffer: true});
    this.tm_renderer.setClearColor( 0xffffff, 0);
    this.tm_group = new THREE.Group();
    this.tm_scene.add( this.tm_group );
    this.tm_group.rotation.y = Math.PI;

    var ambientLight = new THREE.AmbientLight( 0xffffff );
    ambientLight.name = 'ambientLight';
    this.tm_scene.add( ambientLight );//

    this.tm_camera.position.x = 0;
    this.tm_camera.position.y = 0;
    this.tm_camera.position.z = -1*(this.tm_camera_minRadius+(this.tm_camera_maxRadius-this.tm_camera_minRadius)/2);

    this.tm_renderer.setSize(box.width , box.height);//(window.innerWidth, window.innerHeight);
    canvasObj.appendChild( this.tm_renderer.domElement );


    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////

    var canvasObjGrey = document.getElementById("id_Test_MeshVisDivGrey");
    canvasObjGrey.innerHTML = "";
    var boxGrey = canvasObjGrey.getBoundingClientRect();

    this.tm_sceneGrey = new THREE.Scene();
  	this.tm_cameraGrey = new THREE.PerspectiveCamera(50,boxGrey.width /boxGrey.height, 1, 10000);
    this.tm_rendererGrey = new THREE.WebGLRenderer( {alpha: true,antialias: true,
      logarithmicDepthBuffer: true } );
    this.tm_rendererGrey.setClearColor( 0xffffff, 0);
    this.tm_groupGrey = new THREE.Group();
    this.tm_sceneGrey.add( this.tm_groupGrey );
    this.tm_groupGrey.rotation.y = Math.PI;

    var ambientLightGrey = new THREE.AmbientLight( 0xffffff );
    ambientLightGrey.name = 'ambientLightGrey';
    this.tm_sceneGrey.add( ambientLightGrey );

    this.tm_cameraGrey.position.x = 0;
    this.tm_cameraGrey.position.y = 0;
    this.tm_cameraGrey.position.z = -1*(this.tm_camera_minRadius+(this.tm_camera_maxRadius-this.tm_camera_minRadius)/2);

    this.tm_rendererGrey.setSize(boxGrey.width,boxGrey.height);
    canvasObjGrey.appendChild( this.tm_rendererGrey.domElement );


    /////////////////////////////////////
    /////////////////////////////////////
    /////////////////////////////////////

    // instantiate a loader
    var loader = new THREE.TextureLoader();

    // load a resource
    this.tm_bg_texture = loader.load(
    	// resource URL
    	'img/EditPage/plotBackground.png',

    	// onLoad callback
    	function ( texture ) {
        var img = texture.image;
          testingSection.element_singleTest.tm_bg_width= img.width;
          testingSection.element_singleTest.tm_bg_height = img.height;
          testingSection.element_singleTest.tm_scene.background = testingSection.element_singleTest.tm_bg_texture;
          testingSection.element_singleTest.tm_sceneGrey.background = testingSection.element_singleTest.tm_bg_texture;
          testingSection.element_singleTest.tm_3D_Resize();
    	},

    	// onProgRepeatWrappingress callback currently not supported
    	undefined,

    	// onError callback
    	function ( err ) {
    		console.error( 'Background could not be loaded!!!!' );
    	}
    );

    this.tm_bg_texture.wrapS = THREE.RepeatWrapping;
    this.tm_bg_texture.wrapT = THREE.RepeatWrapping;
  }


  /////////////////////////////////////////////////////////////////////

  tm_drawMesh(meshData){

    this.tm_mesh_BB = undefined;
    this.tm_meshcenter = undefined;

    if(meshData[0] && meshData[1]){
        // 3D Cell Values
        this.tm_mesh = new THREE.Group();
        this.tm_meshGrey = new THREE.Group();

        for (var i = 0; i < meshData[2].length; i++) {

          var geometry = undefined;
          var geometryGrey = undefined;

          if (meshData[2][i][2] == 0) {
            geometry = new THREE.PlaneGeometry(meshData[2][i][0], meshData[2][i][1], 1, 1);
            geometryGrey = new THREE.PlaneGeometry(meshData[2][i][0], meshData[2][i][1], 1, 1);
          } else {
            geometry = new THREE.BoxBufferGeometry(meshData[2][i][0], meshData[2][i][1], meshData[2][i][2]);
            geometryGrey = new THREE.BoxBufferGeometry(meshData[2][i][0], meshData[2][i][1], meshData[2][i][2]);
          }

          var material = new THREE.MeshLambertMaterial({
            side: THREE.DoubleSide
          });
          material.color.set(new THREE.Color(meshData[2][i][6],meshData[2][i][7],meshData[2][i][8]));
          var mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = meshData[2][i][3];
          mesh.position.y = meshData[2][i][4];
          mesh.position.z = meshData[2][i][5];
          this.tm_mesh.add(mesh);

          var materialGrey = new THREE.MeshLambertMaterial({
            side: THREE.DoubleSide
          });
          materialGrey.color.set(new THREE.Color(meshData[2][i][9],meshData[2][i][9],meshData[2][i][9]));
          var meshGrey = new THREE.Mesh(geometryGrey, materialGrey);
          meshGrey.position.x = meshData[2][i][3];
          meshGrey.position.y = meshData[2][i][4];
          meshGrey.position.z = meshData[2][i][5];
          this.tm_meshGrey.add(meshGrey);

        }

        this.tm_mesh_BB = new THREE.Box3().setFromObject(this.tm_mesh);
        this.tm_meshcenter = this.tm_mesh_BB.getCenter();
    }
    else {

      var geometry = new THREE.Geometry(); //
      var geometryGrey = new THREE.Geometry(); //

      geometry.vertices = meshData[2];
      geometryGrey.vertices = meshData[2];

      var faceArray = new Array(meshData[3].length).fill(undefined); //[];
      var faceArrayGrey = new Array(meshData[3].length).fill(undefined);

      if(meshData[0]){
        // 2D Cell Values
        for (var i = 0; i < meshData[3].length; i++) {

          faceArray[i] = new THREE.Face3(meshData[3][i][0],meshData[3][i][1],meshData[3][i][2]);
          faceArray[i].vertexColors[0] = new THREE.Color(meshData[3][i][3],meshData[3][i][4],meshData[3][i][5]);
          faceArray[i].vertexColors[1] = new THREE.Color(meshData[3][i][3],meshData[3][i][4],meshData[3][i][5]);
          faceArray[i].vertexColors[2] = new THREE.Color(meshData[3][i][3],meshData[3][i][4],meshData[3][i][5]);

          faceArrayGrey[i] = new THREE.Face3(meshData[3][i][0],meshData[3][i][1],meshData[3][i][2]);
          faceArrayGrey[i].vertexColors[0] = new THREE.Color(meshData[3][i][6],meshData[3][i][6],meshData[3][i][6]);
          faceArrayGrey[i].vertexColors[1] = new THREE.Color(meshData[3][i][6],meshData[3][i][6],meshData[3][i][6]);
          faceArrayGrey[i].vertexColors[2] = new THREE.Color(meshData[3][i][6],meshData[3][i][6],meshData[3][i][6]);
        }
      }
      else{
        // Point Values
        for (var i = 0; i < meshData[3].length; i++) {
          faceArray[i] = new THREE.Face3(meshData[3][i][0],meshData[3][i][1],meshData[3][i][2]);
          faceArray[i].vertexColors[0] = new THREE.Color(meshData[3][i][3][0],meshData[3][i][3][1],meshData[3][i][3][2]);
          faceArray[i].vertexColors[1] = new THREE.Color(meshData[3][i][4][0],meshData[3][i][4][1],meshData[3][i][4][2]);
          faceArray[i].vertexColors[2] = new THREE.Color(meshData[3][i][5][0],meshData[3][i][5][1],meshData[3][i][5][2]);

          faceArrayGrey[i] = new THREE.Face3(meshData[3][i][0],meshData[3][i][1],meshData[3][i][2]);
          faceArrayGrey[i].vertexColors[0] = new THREE.Color(meshData[3][i][3][3],meshData[3][i][3][3],meshData[3][i][3][3]);
          faceArrayGrey[i].vertexColors[1] = new THREE.Color(meshData[3][i][4][3],meshData[3][i][4][3],meshData[3][i][4][3]);
          faceArrayGrey[i].vertexColors[2] = new THREE.Color(meshData[3][i][5][3],meshData[3][i][5][3],meshData[3][i][5][3]);
        }

      }

      geometry.faces = faceArray;
      geometryGrey.faces = faceArrayGrey;
      geometry.computeBoundingBox();

      var material =
        //new THREE.MeshDepthMaterial( {
        new THREE.MeshLambertMaterial({
          side: THREE.DoubleSide,
          vertexColors: THREE.VertexColors
          //  blending: THREE.NoBlending,
          //depthTest: true,
          //depthWrite:true,
          // depthFunc : THREE.NeverDepth
          // depthFunc : THREE.AlwaysDepth
          // depthFunc : THREE.LessDepth
          // depthFunc : THREE.LessEqualDepth
          // depthFunc : THREE.GreaterEqualDepth
          // depthFunc : THREE.GreaterDepth
          // depthFunc : THREE.NotEqualDepth
          //wireframe: true
        });

      this.tm_mesh = new THREE.Mesh(geometry, material);
      this.tm_meshGrey = new THREE.Mesh(geometryGrey, material);

      this.tm_mesh_BB = geometry.boundingBox;
      this.tm_meshcenter = this.tm_mesh_BB.getCenter();

    }

    this.tm_mesh.position.x = -1 * this.tm_meshcenter.x;
    this.tm_mesh.position.y = -1 * this.tm_meshcenter.y;
    this.tm_mesh.position.z = 0; //-1*this.tm_meshcenter.z;*/

    this.tm_meshGrey.position.x = -1 * this.tm_meshcenter.x;
    this.tm_meshGrey.position.y = -1 * this.tm_meshcenter.y;
    this.tm_meshGrey.position.z = 0; //-1*this.tm_meshcenter.z;*/

    var largestDis = undefined;

    if (this.tm_do3D)
      largestDis = Math.hypot(this.tm_mesh_BB.getSize().x, this.tm_mesh_BB.getSize().y, this.tm_mesh_BB.getSize().z); //,this.tm_mesh_BB.getSize().z);
    else
      largestDis = Math.max(this.tm_mesh_BB.getSize().x, this.tm_mesh_BB.getSize().y);

    this.tm_borderX = this.tm_mesh_BB.getSize().x * 2;
    this.tm_borderY = this.tm_mesh_BB.getSize().y * 2;

    this.tm_camera_maxRadius = -1*largestDis * 2;
    this.tm_camera_minRadius = this.tm_camera_maxRadius*0.001;
    this.tm_zoomFactor = this.tm_camera_maxRadius / 50;

    ///*

    this.tm_camera.near = largestDis * 0.001;
    this.tm_camera.far = -2 * this.tm_camera_maxRadius;
    this.tm_camera.updateProjectionMatrix();

    this.tm_cameraGrey.near = largestDis * 0.001;
    this.tm_cameraGrey.far = -2 * this.tm_camera_maxRadius;
    this.tm_cameraGrey.updateProjectionMatrix();

    //*/
    /*this.tm_camera.position.x = this.tm_mesh_BB.getSize().x;
    this.tm_camera.position.y = this.tm_mesh_BB.getSize().y;

    this.tm_cameraGrey.position.x = this.tm_mesh_BB.getSize().x;
    this.tm_cameraGrey.position.y = this.tm_mesh_BB.getSize().y;*/

    //if(this.tm_camera.position.z>this.tm_camera_maxRadius || this.tm_camera.position.z<mapping_minRadius){
    this.tm_camera.position.z = -largestDis;
    this.tm_cameraGrey.position.z = -largestDis;
    //}

    document.getElementById("id_Test_MeshVisOptions_Zoom").value = 50;


    for (var i = this.tm_group.children.length - 1; i >= 0; i--) {
      this.tm_group.remove(this.tm_group.children[i]);
    }
    this.tm_group.add(this.tm_mesh);

    this.tm_group.position.x = 0;//this.tm_mesh_BB.getSize().x; //0;
    this.tm_group.position.y = 0;//this.tm_mesh_BB.getSize().y; //0;
    this.tm_group.position.z = 0;//largestDis * 2; //0;

    for (var i = this.tm_groupGrey.children.length - 1; i >= 0; i--) {
      this.tm_groupGrey.remove(this.tm_groupGrey.children[i]);
    }
    this.tm_groupGrey.add(this.tm_meshGrey);

    this.tm_groupGrey.position.x = 0;//this.tm_mesh_BB.getSize().x; //0;
    this.tm_groupGrey.position.y = 0;//this.tm_mesh_BB.getSize().y; //0;
    this.tm_groupGrey.position.z = 0;//largestDis * 2; //0;

    this.tm_camera.lookAt(this.tm_group.position);
    this.tm_cameraGrey.lookAt(this.tm_groupGrey.position);

    this.tm_updateMesh();

  }

  tm_updateMesh() {

    for (var i = this.tm_group.children.length - 1; i > 0; i--) {
      this.tm_group.remove(this.tm_group.children[i]);
    }

    for (var i = this.tm_groupGrey.children.length - 1; i > 0; i--) {
      this.tm_groupGrey.remove(this.tm_groupGrey.children[i]);
    }

    if (this.tm_do3D && this.tm_drawBB) {

      var linesGeometry = new THREE.BufferGeometry();
      var linesMaterial = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        linewidth: 2
      });

      var indices = [];
      var positions = [];
      var colors = [];

      var startPosX = this.tm_meshcenter.x - (this.tm_mesh_BB.getSize().x / 2);
      var startPosY = this.tm_meshcenter.y - (this.tm_mesh_BB.getSize().y / 2);
      var startPosZ = this.tm_meshcenter.z - (this.tm_mesh_BB.getSize().z / 2);

      var endPosX = this.tm_meshcenter.x + (this.tm_mesh_BB.getSize().x / 2);
      var endPosY = this.tm_meshcenter.y + (this.tm_mesh_BB.getSize().y / 2);
      var endPosZ = this.tm_meshcenter.z + (this.tm_mesh_BB.getSize().z / 2);

      positions.push(startPosX, startPosY, startPosZ);
      positions.push(endPosX, startPosY, startPosZ);
      positions.push(endPosX, endPosY, startPosZ);
      positions.push(startPosX, endPosY, startPosZ);

      positions.push(startPosX, startPosY, endPosZ);
      positions.push(endPosX, startPosY, endPosZ);
      positions.push(endPosX, endPosY, endPosZ);
      positions.push(startPosX, endPosY, endPosZ);

      colors.push(0, 0, 0);
      colors.push(0, 0, 0);
      colors.push(0, 0, 0);
      colors.push(0, 0, 0);
      colors.push(1, 1, 1);
      colors.push(1, 1, 1);
      colors.push(1, 1, 1);
      colors.push(1, 1, 1);

      indices = [
        0, 1, 1, 2, 2, 3, 3, 0, // bottom rect
        4, 5, 5, 6, 6, 7, 7, 4, // top rect
        0, 4, 1, 5, 2, 6, 3, 7
      ];

      linesGeometry.setIndex(indices);
      linesGeometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      linesGeometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      linesGeometry.computeBoundingSphere();

      var linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
      linesMesh.position.x = 0;
      linesMesh.position.y = 0;
      linesMesh.position.z = 0;

      linesMesh.position.x = -1 * this.tm_meshcenter.x;
      linesMesh.position.y = -1 * this.tm_meshcenter.y;
      linesMesh.position.z = 0;

      this.tm_group.add(linesMesh);

      var linesMeshGrey = new THREE.LineSegments(linesGeometry, linesMaterial);
      linesMeshGrey.position.x = 0;
      linesMeshGrey.position.y = 0;
      linesMeshGrey.position.z = 0;

      linesMeshGrey.position.x = -1 * this.tm_meshcenter.x;
      linesMeshGrey.position.y = -1 * this.tm_meshcenter.y;
      linesMeshGrey.position.z = 0;

      this.tm_groupGrey.add(linesMeshGrey);
    }

    if (this.tm_drawAxes) {
      var orginX = this.tm_meshcenter.x - (this.tm_mesh_BB.getSize().x / 2);
      var orginY = this.tm_meshcenter.y - (this.tm_mesh_BB.getSize().y / 2);
      var orginZ = this.tm_meshcenter.z - (this.tm_mesh_BB.getSize().z / 2);

      var lengthX = this.tm_mesh_BB.getSize().x * 1.5;
      var lengthY = this.tm_mesh_BB.getSize().y * 1.5;
      var lengthZ = this.tm_mesh_BB.getSize().z * 1.5;

      if (this.tm_drawBB && this.tm_do3D) {
        orginX = this.tm_meshcenter.x + (this.tm_mesh_BB.getSize().x / 2);
        orginY = this.tm_meshcenter.y + (this.tm_mesh_BB.getSize().y / 2);
        orginZ = this.tm_meshcenter.z + (this.tm_mesh_BB.getSize().z / 2);

        lengthX = this.tm_mesh_BB.getSize().x * 0.2;
        lengthY = this.tm_mesh_BB.getSize().y * 0.2;
        lengthZ = this.tm_mesh_BB.getSize().z * 0.2;
      }

      var length = Math.max(lengthX, lengthY, lengthZ);
      var direction = new THREE.Vector3(1, 0, 0);
      var arrowXAxis = new THREE.ArrowHelper(direction, orginX, length, 0x0000ff);
      arrowXAxis.position.x = -1 * this.tm_meshcenter.x + orginX;
      arrowXAxis.position.y = -1 * this.tm_meshcenter.y;
      arrowXAxis.position.z = 0;
      this.tm_group.add(arrowXAxis);
      var arrowXAxisGrey = new THREE.ArrowHelper(direction, orginX, length, 0x0000ff);
      arrowXAxisGrey.position.x = -1 * this.tm_meshcenter.x + orginX;
      arrowXAxisGrey.position.y = -1 * this.tm_meshcenter.y;
      arrowXAxisGrey.position.z = 0;
      this.tm_groupGrey.add(arrowXAxisGrey);

      direction = new THREE.Vector3(0, 1, 0);
      var arrowYAxis = new THREE.ArrowHelper(direction, orginY, length, 0xff0000);
      arrowYAxis.position.x = -1 * this.tm_meshcenter.x;
      arrowYAxis.position.y = -1 * this.tm_meshcenter.y + orginY;
      arrowYAxis.position.z = 0;
      this.tm_group.add(arrowYAxis);
      var arrowYAxisGrey = new THREE.ArrowHelper(direction, orginY, length, 0xff0000);
      arrowYAxisGrey.position.x = -1 * this.tm_meshcenter.x;
      arrowYAxisGrey.position.y = -1 * this.tm_meshcenter.y + orginY;
      arrowYAxisGrey.position.z = 0;
      this.tm_groupGrey.add(arrowYAxisGrey);
      if (this.tm_do3D) {
        direction = new THREE.Vector3(0, 0, 1);
        var arrowZAxis = new THREE.ArrowHelper(direction, orginZ, length, 0x00ff00);
        arrowZAxis.position.x = -1 * this.tm_meshcenter.x;
        arrowZAxis.position.y = -1 * this.tm_meshcenter.y;
        arrowZAxis.position.z = orginZ;
        this.tm_group.add(arrowZAxis);
        var arrowZAxisGrey = new THREE.ArrowHelper(direction, orginZ, length, 0x00ff00);
        arrowZAxisGrey.position.x = -1 * this.tm_meshcenter.x;
        arrowZAxisGrey.position.y = -1 * this.tm_meshcenter.y;
        arrowZAxisGrey.position.z = orginZ;
        this.tm_groupGrey.add(arrowZAxisGrey);
      }
    }

  }

  tm_updateScaleFactor() {
    var value = document.getElementById("id_Test_ScaleFactor").value;

    if (isNaN(value) || value == undefined) {
      openAlert("Invalid input for the scale factor.")
      document.getElementById("id_Test_ScaleFactor").value = 1.0;
      return;
    }

    if (value <= 0) {
      openAlert("Invalid input for the scale factor. The input has to be positive!")
      document.getElementById("id_Test_ScaleFactor").value = 1.0;
      return;
    }
    this.tm_3D_scalefactor = value;

    document.getElementById("id_TestPage_CalcButton").style.visibility="hidden";
    document.getElementById("id_Test_WaitForTestCalculation").style.display="flex";
    document.getElementById("id_Test_VisDiv").style.display="none";
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());

  }

  ////////////////////////////////////////////////////////////////////////////


  tm_3D_Mousemove(mousePosX,mousePosY,rectWidth,rectHeight){

    if(this.tm_doRotation && this.tm_do3D){

        var angle1 = ((mousePosX-this.mousePosX)/rectWidth) * 2*Math.PI;
        var angle2 = -1*((mousePosY-this.mousePosY)/rectHeight) * 2*Math.PI;

        var rotationQuaternion = new THREE.Quaternion()
              .setFromEuler(new THREE.Euler(
                  angle2,
                  angle1,
                  0,
                  'XYZ'
              ));

        this.mousePosX=mousePosX;
        this.mousePosY=mousePosY;

        this.tm_group.quaternion.multiplyQuaternions(rotationQuaternion, this.tm_group.quaternion);
        this.tm_groupGrey.quaternion.multiplyQuaternions(rotationQuaternion, this.tm_groupGrey.quaternion);
    }
    else if(this.tm_doTranslation){

      var newXPos = this.tm_group.position.x - (this.mousePosX-mousePosX)/rectWidth * this.tm_camera.position.z;
      var newYPos = this.tm_group.position.y - (this.mousePosY-mousePosY)/rectHeight * this.tm_camera.position.z;

      if(newXPos>=-this.tm_borderX && newXPos<=this.tm_borderX){
        this.tm_group.position.x = newXPos;
        this.tm_groupGrey.position.x = newXPos;
      }

      if(newYPos>=-this.tm_borderY && newYPos<=this.tm_borderY){
        this.tm_group.position.y = newYPos;
        this.tm_groupGrey.position.y = newYPos;
      }

      this.mousePosX=mousePosX;
      this.mousePosY=mousePosY;
    }
    else{
      this.mousePosX=mousePosX;
      this.mousePosY=mousePosY;
    }

  }

  tm_3D_zoom(zoomIn){
    var newRadius = undefined;
    if(zoomIn){
      newRadius=this.tm_camera.position.z-this.tm_zoomFactor;
      if(newRadius>this.tm_camera_minRadius)
      return;
      this.tm_camera.position.z=newRadius;
      this.tm_cameraGrey.position.z=newRadius;
    }
    else{
      newRadius=this.tm_camera.position.z+this.tm_zoomFactor;
      if(newRadius<this.tm_camera_maxRadius)
      return;
      this.tm_camera.position.z=newRadius;
      this.tm_cameraGrey.position.z=newRadius;
    }
    document.getElementById("id_Test_MeshVisOptions_Zoom").value = Math.round(newRadius/this.tm_camera_maxRadius*100);
  }

  tm_ZoomInput(){

    var value = parseInt(document.getElementById("id_Test_MeshVisOptions_Zoom").value);
    var newRadius = value/100*this.tm_camera_maxRadius;

    this.tm_camera.position.z = newRadius;
    this.tm_cameraGrey.position.z = newRadius;

  }

};
