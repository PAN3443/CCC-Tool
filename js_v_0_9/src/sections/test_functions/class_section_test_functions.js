class class_TestFunction_Section extends class_Section {

  constructor() {
    super('id_TestingPage');

    if (typeof(Worker) === undefined) {
      return;
    }

    this.testingCMS = new class_CMS();
    this.backSection = undefined;
    this.collectionIsOpen = true;

    //////////////////////////////////////////////////
    /// Collection

    ////////////////////////////////////////////////////////////////////////////
    //  CCC-Test Functions
    this.cccTest_Jumps_Options = [
      [true, [0.25, 0.75]],
      [true, [0.25, 0.75, 1.0]],
      [true, [0.0, 0.25, 0.75, 1.0]],
      [true, [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]]
    ];

    this.cccTest_Gradient_Options = [
      [true, 0, 1, 0, 2, 0, 2, 101, 100],
      [true, 0, 1, 1, 2, 1, 2, 101, 100],
      [true, 0, 1, 2, 2, 2, 2, 101, 100],
      [true, 1, 0, 0, 2, 0, 2, 101, 100],
      [true, 1, 0, 1, 2, 1, 2, 101, 100],
      [true, 1, 0, 2, 2, 2, 2, 101, 100]
    ];

    this.cccTest_RidgeValleyLine_Options = [ // m,M,type
      [true, 0.0, 1.0, 0, 2, 0, 2, 101, 101],
      [true, 0.0, 1.0, 0, 2, 1, 2, 101, 101],
      [true, 0.0, 1.0, 0, 2, 2, 2, 101, 101],
      [true, 0.0, 1.0, 1, 2, 0, 2, 101, 101],
      [true, 0.0, 1.0, 1, 2, 1, 2, 101, 101],
      [true, 0.0, 1.0, 1, 2, 2, 2, 101, 101],
      [true, 0.0, 1.0, 2, 2, 0, 2, 101, 101],
      [true, 0.0, 1.0, 2, 2, 1, 2, 101, 101],
      [true, 0.0, 1.0, 2, 2, 2, 2, 101, 101]
    ];

    this.cccTest_LocalExtrema_Options = [
      //[a,b,m,stepX,#stepsX,stepY,#stepsY,autoScale],
      [1, 1, 0, true, 101, 101],
      [-1, -1, 0, true, 101, 101],
      [-1, 1, 0, true, 101, 101],
      [1, -1, 0, true, 101, 101],
    ];

    this.cccTest_Frequency_Options = [
      [true, true, 1, 0, 0.0, 1.0, 100, 100],
      [true, false, 1, 1, 0.0, 1.0, 100, 100],
      [true, true, 1, 2, 0.0, 1.0, 100, 100],
      [true, true, 1, 4, 0.0, 1.0, 100, 100],
      [true, true, 1, 8, 0.0, 1.0, 100, 100]
    ];

    this.littleBit_NumberOfSinks = 10;
    this.cccTest_LittleBit_Options = [
      [true, 0.0, 1.0, 0.0001, 0.001, 10, 10, 100],
      [true, 0.0, 1.0, 0.0001, 0.005, 10, 10, 100],
      [true, 0.0, 1.0, 0.0001, 0.01, 10, 10, 100],
      [true, 0.0, 1.0, 0.0001, 0.05, 10, 10, 100],
      [true, 0.0, 1.0, 0.0001, 0.1, 10, 10, 100]
    ];

    this.cccTest_Treshold_Options = [
      [true, 0, 2, 0.0, 0.5, 1.0, 101, 101],
      [true, 1, 2, 0.0, 0.5, 1.0, 101, 101],
      [true, 2, 2, 0.0, 0.5, 1.0, 101, 101]
    ];

    ////////////////////////////////////////////////////////////////////////////
    // Test Functions ()
    this.fctTest_LocalMin_Options = [
      ["Ackley Function", "Ackley", [-32.768, 32.768, -32.768, 32.768], 100, 100, 20, 0.2, Math.PI * 2], // a,b,c
      ["Bukin Function N. 6", "Bukin_N6", [-15, -5, -3, 3], 100, 100],
      ["Cross-in-Tray Function", "Cross-in-Tray", [-10, 10, -10, 10], 100, 100],
      ["Drop-Wave Function", "Drop-Wave", [-5, 5, -5, 5], 100, 100],
      ["Eggholder Function", "Eggholder", [-512, 512, -512, 512], 100, 100],
      ["Griewank Function", "Griewank", [-100, 100, -100, 100], 100, 100],
      ["Holder Table Function", "HolderTable", [-10, 10, -10, 10], 100, 100],
      ["Langermann Function", "Langermann", [0, 10, 0, 10], 100, 100, [1, 2, 5, 2, 3],
        [
          [3, 5, 2, 1, 7],
          [5, 2, 1, 4, 9]
        ]
      ], // vec_c,mat_A
      ["Levy Function", "Levy", [0, 10, 0, 10], 100, 100],
      ["Levy Function N. 13", "Levy_N13", [0, 10, 0, 10], 100, 100],
      ["Rastrigin Function", "Rastrigin", [-5, 5, -5, 5], 100, 100],
      ["Schaffer Function N. 2", "Schaffer_N2", [-50, 50, -50, 50], 100, 100],
      ["Schaffer Function N. 4", "Schaffer_N4", [-50, 50, -50, 50], 100, 100],
      ["Schwefel Function", "Schwefel", [-500, 500, -500, 500], 100, 100],
      ["Shubert Function", "Shubert", [-10, 10, -10, 10], 100, 100]
    ];

    this.fctTest_BowlShaped_Options = [
      ["Bohachevsky Function ", "Bohachevsky_F1", [-100, 100, -100, 100], 100, 100],
      ["Perm Function 0, d, β", "Perm_V1", [-2, 2, -2, 2], 100, 100, 10], // b
      ["Rotated Hyper-Ellipsoid Function", "Rot_Hyper_Ellipsoid", [-65.536, 65.536, -65.536, 65.536], 100, 100],
      ["Sphere Function", "Sphere", [-5.12, 5.12, -5.12, 5.12], 100, 100],
      ["Sum of Different Powers Function", "SumDifPowers", [-1, 1, -1, 1], 100, 100],
      ["Sum Squares Function", "Sum_Squares", [-10, 10, -10, 10], 100, 100],
      ["Trid Function", "Trid", [-4, 4, -4, 4], 100, 100]
    ];

    this.fctTest_ValleyShaped_Options = [
      ["Three-Hump Camel Function", "Three_Hump_Camel", [-5, 5, -5, 5], 100, 100],
      ["Six-Hump Camel Function", "Six_Hump_Camel", [-5, 5, -5, 5], 100, 100]
    ];

    ////////////////////////////////////////////////////////////////////////////
    // Real World Data
    this.realWorldCanvasIndex=0;
    this.selectedRealWorldType=undefined;
    this.medicalLabels = ["CT Head","MR Brain","Thermography","Mammography",];
    this.medicalFiles = ["cthead-8bit061.png","mrbrain-8bit038.png","thermography.png","M0279.LEFT_MLO.2017-05-04.00.png",];
    this.medicalData = new Array(this.medicalFiles.length);
    this.medicalAcknowlegments = [0,0,1,1];

    this.scientificFlowSimLabels = ["Karman Street","FTLE","Asteroid V02 SciVis Contest 18"];
    this.scientificFlowSimFiles = ["karmanStreet.png","ftle_new.png","asteroid_v02.png"];
    this.scientificFlowSimData = new Array(this.scientificFlowSimFiles.length);
    this.scientificFlowSimAcknowlegments = [undefined,undefined,4];

    this.photographsLabels = ["ThermalPedestrain","Flir_ADAS","Lenna"];
    this.photographsFiles = ["img_00029.png","FLIR_02674.png","lena_grey.png"];
    this.photographsData = new Array(this.photographsFiles.length);
    this.photographsAcknowlegments = [2,3,5];

    this.acknowlegments = ["The Stanford volume data archive",
    "DMR - Database For Mastology Research",
    "FLIR Thermal Dataset for Algorithm Training",
    "OTCBVS Benchmark Dataset Collection",
    "SciVis Contest 2018",
    "Playboy"
    ];

    this.acknowlegmentsURL = ["https://graphics.stanford.edu/data/voldata/",
    "http://visual.ic.uff.br/dmi/prontuario/home.php",
    "https://www.flir.co.uk/oem/adas/adas-dataset-form/",
    "http://vcipl-okstate.org/pbvs/bench/",
    "https://sciviscontest2018.org/",
    "https://www.playboy.com/"
    ];

    this.acknowlegmentsAdditional = [undefined,
    "The Database For Mastology Research (DMR) is an online platform with mastologic images for early detection of breast cancer.",
    "The FLIR starter thermal dataset is intended for the training of convolutional neural networks.",
    "This image comes from OSU Thermal Pedestrian Database. The topic of interest is the person detection in thermal imagery.",
    "This data set comes from the SciVis contest 2018 and includes the simulation data of asteroid impacts in deep ocean water.",
    "Lenna is a test image often used in the computer science of image processing. The image is popular because of its different areas of multifarious detail degree."
    ];

    //////////////////////////////////////////////////
    /// Single Tests
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

    this.current_yFktType = 0;
    this.current_xFktType = 0;

    //////////////////////////////////////////////////
    /// Worker
    this.worker_testCollection_CCCTest = new Worker(version_JS_FolderName+"/src/sections/test_functions/worker/worker_PreviewTesting.js", { type: "module" });
    this.worker_testCollection_CCCTest.postMessage({'message':'init', 'initOption1' : 'CCCTest'});
    this.worker_testCollection_CCCTest.addEventListener('message', workerEvent_DrawPreviewTestfunction, false);
    this.worker_testCollection_Collection = new Worker(version_JS_FolderName+"/src/sections/test_functions/worker/worker_PreviewTesting.js", { type: "module" });
    this.worker_testCollection_Collection.postMessage({'message':'init', 'initOption1' : 'Collection'});
    this.worker_testCollection_Collection.addEventListener('message', workerEvent_DrawPreviewTestfunction, false);
    this.worker_testCollection_RealWorldData = new Worker(version_JS_FolderName+"/src/sections/test_functions/worker/worker_PreviewTesting.js", { type: "module" });
    this.worker_testCollection_RealWorldData.postMessage({'message':'init', 'initOption1' : 'RealData'});
    this.worker_testCollection_RealWorldData.addEventListener('message', workerEvent_DrawPreviewTestfunction, false);

    this.worker_testInteractive_finished=true;
    this.worker_testInteractive = new Worker(version_JS_FolderName+"/src/sections/test_functions/worker/worker_SingleTesting.js", { type: "module" });
    this.worker_testInteractive.postMessage({'message':'init'});
    this.worker_testInteractive.addEventListener('message', workerEvent_DrawTestfunction, false);
    for (var i = 0; i < this.medicalFiles.length; i++) {
          var url = "resource/realWorldData/this.medicalData/"+this.medicalFiles[i];
          var img = new Image();
          img.setAttribute('crossOrigin', 'anonymous');
          img.onload = (function(index) {
          return function () {
            var workerJSON = {};
            workerJSON['message'] = "pushRealWorldData";
            workerJSON['type'] = "medical";
            workerJSON['index'] = index;
            workerJSON['imgData'] = loadImgData(this);
            testingSection.worker_testInteractive.postMessage(workerJSON);
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
            testingSection.worker_testInteractive.postMessage(workerJSON);
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
            testingSection.worker_testInteractive.postMessage(workerJSON);
          };
        })(i);
        img.src = url;
    }

    this.noiseField_WorkerJSON = {"addNoise":false,"noiseField":undefined,"noiseBehavior":undefined,"maxChange":undefined,"replaceNoiseFrom":undefined,"replaceNoiseTill":undefined};

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

    ///////////////////////////////////////////////
    /// Init
    /*
    document.getElementById("id_Test_downloadScreenshot").addEventListener('click', downloadTestImage, false);
    document.getElementById("id_Test_downloadScreenshotGrey").addEventListener('click', downloadTestImageGrey, false);
    document.getElementById("id_Test_downloadScreenshotFull").addEventListener('click', downloadTestImage, false);
    document.getElementById("id_Test_downloadScreenshotGreyFull").addEventListener('click', downloadTestImageGrey, false);*/

    /*document.getElementById('id_Test_MeshVisDiv').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_Test_MeshVisDiv').addEventListener("mousemove", eventTestMapping_mousemove);
    document.getElementById('id_Test_MeshVisDiv').addEventListener("mouseleave", eventMapping_mouseleave);
    document.getElementById('id_Test_MeshVisDiv').addEventListener("mouseenter", eventMapping_mouseenter);
    document.getElementById('id_Test_MeshVisDiv').addEventListener("mousedown", eventMapping_mousedown);
    document.getElementById('id_Test_MeshVisDiv').addEventListener("mouseup", eventMapping_mouseup);
    document.getElementById("id_Test_MeshVisDiv").addEventListener("wheel", eventTestMapping_mousewheel);

    document.getElementById('id_Test_MeshVisDivGrey').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mousemove", eventTestMapping_mousemove);
    document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mouseleave", eventMapping_mouseleave);
    document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mouseenter", eventMapping_mouseenter);
    document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mousedown", eventMapping_mousedown);
    document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mouseup", eventMapping_mouseup);
    document.getElementById("id_Test_MeshVisDivGrey").addEventListener("wheel", eventTestMapping_mousewheel);

    document.getElementById('id_Test_MeshVisDivFull').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_Test_MeshVisDivFull').addEventListener("mousemove", eventTestMapping_mousemove);
    document.getElementById('id_Test_MeshVisDivFull').addEventListener("mouseleave", eventMapping_mouseleave);
    document.getElementById('id_Test_MeshVisDivFull').addEventListener("mouseenter", eventMapping_mouseenter);
    document.getElementById('id_Test_MeshVisDivFull').addEventListener("mousedown", eventMapping_mousedown);
    document.getElementById('id_Test_MeshVisDivFull').addEventListener("mouseup", eventMapping_mouseup);
    document.getElementById("id_Test_MeshVisDivFull").addEventListener("wheel", eventTestMapping_mousewheel);

    document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mousemove", eventTestMapping_mousemove);
    document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mouseleave", eventMapping_mouseleave);
    document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mouseenter", eventMapping_mouseenter);
    document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mousedown", eventMapping_mousedown);
    document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mouseup", eventMapping_mouseup);
    document.getElementById("id_Test_MeshVisDivGreyFull").addEventListener("wheel", eventTestMapping_mousewheel);*/


    ////// Init interactive Tests

    this.fillTestCollection();

  }

  showSection() {
    if (typeof(Worker) === undefined) {
      openAlert("Attention".bold() + ": Your browser does not support Worker. Therefore the test function section of the CCC-Tool won't work. Please use another brower for this functionality.\n");
      return;
    }

    var selectobject = document.getElementById("id_TestSection_CMS_Select")
    for (var i = selectobject.length - 1; i >= 0; i--) {
      selectobject.remove(i);
    }

    if (this.backSection === "myDesigns") {
      // => many CMS for switching
      document.getElementById("id_TestPage_CMS_VIS_ColormapLinear").style.width = "75vw";
      document.getElementById("id_TestSection_CMS_Label").style.display = "block";
      selectobject.style.display = "block";
      for (var i = 0; i < myDesignsSection.getMyDesignLength(); i++) {
        var optionCMS = document.createElement("option");
        optionCMS.innerHTML = myDesignsSection.getMyDesignCMSName(i);
        selectobject.add(optionCMS);
      }
      selectobject.selectedIndex = 0;
      this.testingCMS = myDesignsSection.getMyDesignCMS(0);
    } else {
      // => single CMS
      document.getElementById("id_TestPage_CMS_VIS_ColormapLinear").style.width = "100vw";
      document.getElementById("id_TestSection_CMS_Label").style.display = "none";
      selectobject.style.display = "none";
    }
    var cmsJSON=json_message_sendCMS(cloneCMS(this.testingCMS));
    this.worker_testCollection_CCCTest.postMessage(cmsJSON);
    this.worker_testCollection_Collection.postMessage(cmsJSON);
    this.worker_testCollection_RealWorldData.postMessage(cmsJSON);
    this.worker_testInteractive.postMessage(cmsJSON);
    this.testingCMS.drawCMS_Horizontal("id_TestPage_CMS_VIS_ColormapLinear", 1000, 1);
    this.showCollection();
    this.inform_Worker_GeneralInformations();
    super.showSection();
  }

  setCMS(cms) {
    this.testingCMS.deleteReferences();
    this.testingCMS = cms;
  }

  showCollection() {
    this.collectionIsOpen = true;
    document.getElementById("id_Test_SwitchToCollection").style.background = "var(--main-active-coloredButton)";
    document.getElementById("id_Test_SwitchToSingleTest").style.background = "var(--main-coloredButton)";
    document.getElementById("id_Test_FunctionCollection").style.width = "100vw";
    document.getElementById("id_Test_SingleTestDiv").style.width = "0vw";
  }

  showSingleTesting() {
    this.collectionIsOpen = false;
    document.getElementById("id_Test_SwitchToCollection").style.background = "var(--main-coloredButton)";
    document.getElementById("id_Test_SwitchToSingleTest").style.background = "var(--main-active-coloredButton)";
    document.getElementById("id_Test_FunctionCollection").style.width = "0vw";
    document.getElementById("id_Test_SingleTestDiv").style.width = "100vw";
    this.updateTestVis();
  }

  backToSection() {
    switch (this.backSection) {
      case "edit":
        editSection.showSection();
        break;
      case "gallery":
        gallerySection.showSection();
        break;
      case "myDesigns":
        myDesignsSection.showSection();
        break;
      default:
        myDesignsSection.showSection();
    }
  }

  updateSection() {
    if (this.collectionIsOpen) {
      var workerJSON = {};
      workerJSON['message'] = "calcTestFields";
      this.worker_testCollection_CCCTest.postMessage(workerJSON);
      this.worker_testCollection_Collection.postMessage(workerJSON);
      this.worker_testCollection_RealWorldData.postMessage(workerJSON);

      workerJSON = {};
      workerJSON['message'] = "getImgData";
      this.worker_testCollection_CCCTest.postMessage(workerJSON);
      this.worker_testCollection_Collection.postMessage(workerJSON);
      this.worker_testCollection_RealWorldData.postMessage(workerJSON);
    } else {
      this.selectNewTestType();
    }
  }

  selectTestingCMS(){
    this.testingCMS.deleteReferences();
    this.testingCMS = myDesignsSection.getMyDesignCMS(document.getElementById("id_TestSection_CMS_Select").selectedIndex);
    var cmsJSON=json_message_sendCMS(cloneCMS(this.testingCMS));
    this.worker_testCollection_CCCTest.postMessage(cmsJSON);
    this.worker_testCollection_Collection.postMessage(cmsJSON);
    this.worker_testCollection_RealWorldData.postMessage(cmsJSON);
    this.worker_testInteractive.postMessage(cmsJSON);
    this.testingCMS.drawCMS_Horizontal("id_TestPage_CMS_VIS_ColormapLinear", 1000, 1);
    this.updateSection();
  }

  /////////////////////////////////////
  ///// Worker Functions

  inform_Worker_GeneralInformations(){
    var workerJSON = {};
    workerJSON['message'] = "colorSimSettings";
    workerJSON['doColorblindnessSim'] = doColorblindnessSim;
    workerJSON['tmXYZ_Selected'] = tmXYZ_Selected;
    workerJSON['tmXYZ_Selected_Inv'] = tmXYZ_Selected_Inv;
    workerJSON['tmLMS_Selected'] = tmLMS_Selected;
    workerJSON['tmLMS_Selected_Inv'] = tmLMS_Selected_Inv;
    workerJSON['sim_AdaptiveColorblindness'] = sim_AdaptiveColorblindness;
    this.worker_testCollection_CCCTest.postMessage(workerJSON);
    this.worker_testCollection_Collection.postMessage(workerJSON);
    this.worker_testCollection_RealWorldData.postMessage(workerJSON);
    this.worker_testInteractive.postMessage(workerJSON);

    workerJSON = {};
    workerJSON['message'] = "colorSettings";
    workerJSON['din99_kE'] = din99_kE;
    workerJSON['din99_kCH'] = din99_kCH;
    workerJSON['cielab_ref_X'] = cielab_ref_X;
    workerJSON['cielab_ref_Y'] = cielab_ref_Y;
    workerJSON['cielab_ref_Z'] = cielab_ref_Z;
    this.worker_testCollection_CCCTest.postMessage(workerJSON);
    this.worker_testCollection_Collection.postMessage(workerJSON);
    this.worker_testCollection_RealWorldData.postMessage(workerJSON);
    this.worker_testInteractive.postMessage(workerJSON);

    workerJSON = {};
    workerJSON['message'] = "colorMetrics";
    // 2000
    workerJSON['de2000_k_L'] = de2000_k_L;
    workerJSON['de2000_k_C'] = de2000_k_C;
    workerJSON['de2000_k_H'] = de2000_k_H;
    // 94
    workerJSON['de94_k_L'] = de94_k_L;
    workerJSON['de94_k_C'] = de94_k_C;
    workerJSON['de94_k_H'] = de94_k_H;
    workerJSON['de94_k_1'] = de94_k_1;
    workerJSON['de94_k_2'] = de94_k_2;
    this.worker_testCollection_CCCTest.postMessage(workerJSON);
    this.worker_testCollection_Collection.postMessage(workerJSON);
    this.worker_testCollection_RealWorldData.postMessage(workerJSON);
    this.worker_testInteractive.postMessage(workerJSON);
  }

  inform_Worker_Testfield (index){
    var workerJSON = {};
    workerJSON['message'] = "Testfield";
    workerJSON['reportOptions_ColorDif'] = reportOptions_ColorDif;
    workerJSON['testfield'] = reportListTestField[index];
    return workerJSON;//*/
  }

  inform_Worker_PushInteractiveTest(type,subtype,options){
    var workerJSON = {};
    workerJSON['message'] = "updateTest";
    workerJSON['type'] = type;
    workerJSON['subtype'] = subtype;
    workerJSON['options'] = options;
    this.worker_testInteractive.postMessage(workerJSON);
  }

  inform_Worker_PushTestingType(type,subtype){
    var workerJSON = {};
    workerJSON['message'] = "setType";
    workerJSON['type'] = type;
    workerJSON['subtype'] = subtype;
    return workerJSON;
  }

  inform_Worker_PushTestingOptions(options){
    var workerJSON = {};
    workerJSON['message'] = "pushOptions";
    workerJSON['optionsList'] = [];
    for (var i = 0; i < options.length; i++) {
      var elem = options[i];
      workerJSON.optionsList.push(elem);
    }
    return workerJSON;
  }

  inform_Worker_PushTestingCanvas(canvasID){
    var workerJSON = {};
    workerJSON['message'] = "pushCanvas";
    workerJSON['canvas'] = undefined;
    workerJSON.canvas = canvasID;
    return workerJSON;
  }

  inform_Worker_LoadRealWorldIMG(url,imgIndex){
          var img = new Image();
          img.setAttribute('crossOrigin', 'anonymous');
          img.onload = (function(index) {
          return function () {
            var workerJSON = {};
            workerJSON['message'] = "getRealWorldData_IMG";
            workerJSON['index'] = index;
            workerJSON['img'] = loadImgData(this);
            testingSection.worker_testCollection_RealWorldData.postMessage(workerJSON);
          };
        })(imgIndex);

        img.src = url;
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
      workerJSON['do3DTestField'] = this.do3DTestField;
      workerJSON['scalefactor3DTest'] = this.scalefactor3DTest;

    }
    return workerJSON;
  }


  ///////////////////////////////////////////
  //// Interactive Test

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

    if (this.testmappingMesh != undefined) {
      this.testmappingMesh.visible = false;
      this.testmappingMeshGrey.visible = false;
    }

  }

  selectNewTestType() {

    if (this.worker_testInteractive_finished == false) {

      if (usertestWorker != undefined)
        usertestWorker.terminate();

      this.worker_testInteractive_finished = true;
    }

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
        this.selectNewTopologyTestType();
        break;

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

    if (this.worker_testInteractive_finished == false) {

      if (usertestWorker != undefined)
        usertestWorker.terminate();

      this.worker_testInteractive_finished = true;
    }

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

    document.getElementById("id_Test_WaitForTestCalculation").style.display="flex";
    document.getElementById("id_Test_VisDiv").style.display="none";

    if (this.worker_testInteractive_finished == false) {

      if (usertestWorker != undefined)
        usertestWorker.terminate();

      this.worker_testInteractive_finished = true;
    }

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

    if (this.worker_testInteractive_finished == false) {

      if (usertestWorker != undefined)
        usertestWorker.terminate();

      this.worker_testInteractive_finished = true;
    }

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

  updateTestVis() {

    document.getElementById("id_Test_WaitForTestCalculation").style.display="flex";
    document.getElementById("id_Test_VisDiv").style.display="none";

    this.stopAnimationTestMapping();
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
      this.startAnimationTestMapping();
    } else {
      document.getElementById("id_Test_PixelCanvas").style.display = "block";
      document.getElementById("id_Test_PixelCanvasGrey").style.display = "block";
      document.getElementById("id_TestFull_PixelVis").style.display = "flex";
    }

    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
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

  updateNoise() {

    document.getElementById("id_TestPage_newTestNoiseDivSub").style.display = "none";
    document.getElementById("id_Test_NoiseProportionDiv").style.display = "none";
    document.getElementById("id_Test_NoiseDistributionDiv").style.display = "none";
    document.getElementById("id_Test_NoiseScalingDiv").style.display = "none";
    document.getElementById("id_Test_NoiseMaxChangeDiv").style.display = "none";
    document.getElementById("id_Test_NoiseValueRangeDiv1").style.display = "none";
    document.getElementById("id_Test_NoiseValueRangeDiv2").style.display = "none";
    document.getElementById("id_Test_NoiseBehaviorReplacing").disabled = false;

    this.noiseField_WorkerJSON.addNoise = false;

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
        this.noiseField_WorkerJSON.addNoise = true;
        this.noiseField_WorkerJSON.noiseBehavior = document.getElementById("id_Test_NoiseBehavior").selectedIndex;
        this.noiseField_WorkerJSON.maxChange = parseFloat(document.getElementById("id_Test_NoiseMaxChange").value);

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

    this.worker_testInteractive.postMessage(this.noiseField_WorkerJSON);

  }

  /////////////////////////////////////
  /// Interactive Test (CCC-Tests::Jumps)
  openJumpTest(jumpID){

  this.cccTest_NewJump_Options = [];
  var tmpRatio = this.cccTest_Jumps_Options[jumpID][1];
  this.cccTest_NewJump_Options.push(tmpRatio);
  var tmpArray = [];
  for (var i = 0; i < this.cccTest_Jumps_Options[jumpID][1].length; i++) {
    var tmpJump = this.cccTest_Jumps_Options[jumpID][1][i];
    tmpArray.push(tmpJump);
  }
  this.cccTest_NewJump_Options.push(tmpArray);

  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 0;
  this.selectNewJumpTestType();
  }

  selectNewJumpTestType(){

    this.initNewTest();

    document.getElementById("id_TestPage_NewTest_JumpDiv").style.display="block";
    document.getElementById("id_TestPage_newTestNoiseDiv").style.display="none";
    document.getElementById("id_Test_NoiseType").selectedIndex=0;
    document.getElementById("id_TestPage_doRatioCheckbox").checked = this.cccTest_NewJump_Options[0];

    this.fillNewJumpsList();
    this.updateNoise();

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
      this.cccTest_NewJump_Options[1]=[this.testingCMS.getRefPosition(0),this.testingCMS.getRefPosition(this.testingCMS.getKeyLength()-1)];
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

      if (this.worker_testInteractive_finished == false) {

        if (usertestWorker != undefined)
          usertestWorker.terminate();

        this.worker_testInteractive_finished = true;
      }

      this.inform_Worker_PushInteractiveTest("CCCTest","Jump",this.cccTest_NewJump_Options);
      this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
      this.worker_testInteractive_finished=false;
    }
    else{
      this.testmappingMesh.visible = false;
      this.testmappingMeshGrey.visible = false;
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

  openGradientTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.cccTest_Gradient_Options[tmpID].length; i++) {
    tmpArray.push(this.cccTest_Gradient_Options[tmpID][i])
  }
  this.cccTest_NewGradient_Options = tmpArray;

  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 1;
  this.selectNewGradientTestType();

  }

  switchRatioType_GradientTest(){

    this.cccTest_NewGradient_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      this.cccTest_NewGradient_Options[1] = 0;
      this.cccTest_NewGradient_Options[2] = 1;
    }
    else {
      this.cccTest_NewGradient_Options[1] = this.testingCMS.getRefPosition(0);
      this.cccTest_NewGradient_Options[2] = this.testingCMS.getRefPosition(this.testingCMS.getKeyLength()-1);
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
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_m<0 || value_m>1.0)){
      openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }

    // check M-value
    var value_M = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    if(isNaN(value_M)){
      openAlert("Invalid input for M-Value");
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_M<0 || value_M>1.0)){
      openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }


    if(value_m==value_M){
      openAlert("Invalid input! The m-Value and M-Value have to be different!");
      return;
    }

    // check m-exp
    var exp_x = parseInt(document.getElementById("id_TestPage_NewTest_I3").value);
    if(isNaN(exp_x)){
      openAlert("Invalid input for m-Exponent");
      return;
    }
    document.getElementById("id_TestPage_NewTest_I3").value =exp_x;
    if(document.getElementById("id_TestPage_NewTest_I3").disabled==false &&exp_x<2){
      openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    // check M-exp
    var exp_y = parseInt(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value = exp_y;
    if(isNaN(exp_y)){
      openAlert("Invalid input for m-Exponent");
      return;
    }
    if(document.getElementById("id_TestPage_NewTest_I4").disabled==false &&exp_y<2){
      openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    // check x,y DIM
    var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
    document.getElementById("id_TestPage_GridDimX").value=dimX;
    if(isNaN(dimX)){
      openAlert("Invalid input for the Grid x-dimension!");
      return;
    }
    if(dimX<2){
      openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
    document.getElementById("id_TestPage_GridDimY").value=dimY;
    if(isNaN(dimY)){
      openAlert("Invalid input for the Grid y-dimension!");
      return;
    }
    if(dimY<2){
      openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }


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

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    this.inform_Worker_PushInteractiveTest("CCCTest","Gradient",this.cccTest_NewGradient_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
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

  openRidgeValleyTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.cccTest_RidgeValleyLine_Options[tmpID].length; i++) {
    tmpArray.push(this.cccTest_RidgeValleyLine_Options[tmpID][i])
  }
  this.cccTest_NewRidgeValley_Options = tmpArray;


  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 2;

  this.selectNewRidgeValleyTestType();

  }

  switchRatioType_RidgeValleyTest(){
    this.cccTest_NewRidgeValley_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      this.cccTest_NewRidgeValley_Options[1] = 0;
      this.cccTest_NewRidgeValley_Options[2] = 1;
    }
    else {
      this.cccTest_NewRidgeValley_Options[1] = this.testingCMS.getRefPosition(0);
      this.cccTest_NewRidgeValley_Options[2] = this.testingCMS.getRefPosition(this.testingCMS.getKeyLength()-1);
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
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_m<0 || value_m>1.0)){
      openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }

    // check M-value
    var value_M = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    if(isNaN(value_M)){
      openAlert("Invalid input for M-Value");
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_M<0 || value_M>1.0)){
      openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }


    if(value_m==value_M){
      openAlert("Invalid input! The m-Value and M-Value have to be different!");
      return;
    }

    // check m-exp
    var exp_m = parseInt(document.getElementById("id_TestPage_NewTest_I3").value);
    if(isNaN(exp_m)){
      openAlert("Invalid input for m-Exponent");
      return;
    }
    document.getElementById("id_TestPage_NewTest_I3").value =exp_m;
    if(document.getElementById("id_TestPage_NewTest_I3").disabled==false &&exp_m<2){
      openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    // check M-exp
    var exp_M = parseInt(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value = exp_M;
    if(isNaN(exp_M)){
      openAlert("Invalid input for m-Exponent");
      return;
    }
    if(document.getElementById("id_TestPage_NewTest_I4").disabled==false &&exp_M<2){
      openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    // check x,y DIM
    var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
    document.getElementById("id_TestPage_GridDimX").value=dimX;
    if(isNaN(dimX)){
      openAlert("Invalid input for the Grid x-dimension!");
      return;
    }
    if(dimX<2){
      openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
    document.getElementById("id_TestPage_GridDimY").value=dimY;
    if(isNaN(dimY)){
      openAlert("Invalid input for the Grid y-dimension!");
      return;
    }
    if(dimY<2){
      openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }


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

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    this.inform_Worker_PushInteractiveTest("CCCTest","RiVa",this.cccTest_NewRidgeValley_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
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

  openExtremaTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.cccTest_LocalExtrema_Options[tmpID].length; i++) {
    tmpArray.push(this.cccTest_LocalExtrema_Options[tmpID][i])
  }
  this.cccTest_NewLocalExtrema_Options = tmpArray;


  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 3;
  this.selectNewExtremaTestType();

  }

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
        return;
      }
      if(dimX<2){
        openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
        return;
      }

      var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
      document.getElementById("id_TestPage_GridDimY").value=dimY;
      if(isNaN(dimY)){
        openAlert("Invalid input for the Grid y-dimension!");
        return;
      }
      if(dimY<2){
        openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
        return;
      }

      this.cccTest_NewLocalExtrema_Options[4]= dimX;
      this.cccTest_NewLocalExtrema_Options[5]= dimY;

      this.newTestExtremaInfoText();

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.inform_Worker_PushInteractiveTest("CCCTest","Extrema",this.cccTest_NewLocalExtrema_Options);
      this.updateNoise();
      this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
      this.worker_testInteractive_finished=false;
      ///////////////////////////////////////////////////////////
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

  openLittleBitTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.cccTest_LittleBit_Options[tmpID].length; i++) {
    tmpArray.push(this.cccTest_LittleBit_Options[tmpID][i])
  }
  this.cccTest_NewLittleBit_Options = tmpArray;


  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 5;
  this.selectNewLittleBitTestType();

  }

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
        return;
      }

      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (lStart<0 || lStart>1.0)){
        openAlert("Invalid value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        return;
      }

      var lEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
      document.getElementById("id_TestPage_NewTest_I4").value = lEnd;
      if(isNaN(lEnd)){
        openAlert("Invalid value for end value!");
        return;
      }

      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (lEnd<0 || lEnd>1.0)){
        openAlert("Invalid value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        return;
      }

      // check m-value
      var value_m = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
      if(isNaN(value_m)){
        openAlert("Invalid input for the m-Value");
        return;
      }
      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_m<0 || value_m>1.0)){
        openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        return;
      }

      // check M-value
      var value_M = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
      if(isNaN(value_M)){
        openAlert("Invalid input for M-Value");
        return;
      }
      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_M<0 || value_M>1.0)){
        openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        return;
      }

      /////
      var pixelsArea = parseInt(document.getElementById("id_TestPage_NewTest_I5").value);
      document.getElementById("id_TestPage_NewTest_I5").value = pixelsArea;
      if(isNaN(pixelsArea)){
        openAlert("Invalid value for pixels per area value!");
        return;
      }

      if(pixelsArea<3){
        openAlert("Invalid value for pixels per area value! The value is not allowed to be smaller than three!");
        return;
      }


      var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
      document.getElementById("id_TestPage_GridDimY").value=dimY;
      if(isNaN(dimY)){
        openAlert("Invalid input for the Grid y-dimension!");
        return;
      }
      if(dimY<2){
        openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
        return;
      }

      /*if(lStart>=lEnd){
        openAlert("Invalid input for the start and end value! The start value has to be smaller than the end value!");
      }*/

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

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.inform_Worker_PushInteractiveTest("CCCTest","LittleBit",this.cccTest_NewLittleBit_Options);
      this.updateNoise();
      this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
      this.worker_testInteractive_finished=false;
      ///////////////////////////////////////////////////////////
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
      this.cccTest_NewLittleBit_Options[1] = this.testingCMS.getRefPosition(0);
      this.cccTest_NewLittleBit_Options[2] = this.testingCMS.getRefPosition(this.testingCMS.getKeyLength()-1);
      this.cccTest_NewLittleBit_Options[3] = 0.001*(this.testingCMS.getRefPosition(this.testingCMS.getKeyLength()-1)-this.testingCMS.getRefPosition(0));
      this.cccTest_NewLittleBit_Options[4] = 0.01*(this.testingCMS.getRefPosition(this.testingCMS.getKeyLength()-1)-this.testingCMS.getRefPosition(0));
    }
    this.selectNewLittleBitTestType();
  }

  /////////////////////////////////////
  /// Interactive Test (CCC-Tests::Frequency)

  openFrequencyTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.cccTest_Frequency_Options[tmpID].length; i++) {
    tmpArray.push(this.cccTest_Frequency_Options[tmpID][i])
  }
  this.cccTest_NewFrequency_Options = tmpArray;


  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 4;
  this.selectNewFrequencyTestType();

  }

  switchRatioType_FrequencyTest(){
    this.cccTest_NewFrequency_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      this.cccTest_NewFrequency_Options[4] = 0;
      this.cccTest_NewFrequency_Options[5] = 1;
    }
    else {
      this.cccTest_NewFrequency_Options[4] = this.testingCMS.getRefPosition(0);
      this.cccTest_NewFrequency_Options[5] = this.testingCMS.getRefPosition(this.testingCMS.getKeyLength()-1);
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
      return;
    }
    if(increases<0){
      openAlert("Invalid input for the number of increases! The value has to be an integer and positive!");
      return;
    }

    var waveStart = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
    document.getElementById("id_TestPage_NewTest_I3").value=waveStart;
    if(isNaN(waveStart)){
      openAlert("Invalid input for the number of wave start!");
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (waveStart<0 || waveStart>1.0)){
      openAlert("Invalid value for the wave start! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }

    var waveEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value=waveEnd;
    if(isNaN(waveEnd)){
      openAlert("Invalid input for the number of wave end!");
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (waveStart<0 || waveStart>1.0)){
      openAlert("Invalid value for the wave end! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }

    if(waveStart>=waveEnd){
      openAlert("Invalid value for the wave start/end! The value for the wave start has to be smaller than the value for the wave end!");
      return;
    }

    // check x,y DIM
    var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
    document.getElementById("id_TestPage_GridDimX").value=dimX;
    if(isNaN(dimX)){
      openAlert("Invalid input for the Grid x-dimension!");
      return;
    }
    if(dimX<2){
      openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
    document.getElementById("id_TestPage_GridDimY").value=dimY;
    if(isNaN(dimY)){
      openAlert("Invalid input for the Grid y-dimension!");
      return;
    }
    if(dimY<2){
      openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    //this.cccTest_NewFrequency_Options[2]=startFrequency;
    this.cccTest_NewFrequency_Options[3]=increases;
    this.cccTest_NewFrequency_Options[4]=waveStart;
    this.cccTest_NewFrequency_Options[5]=waveEnd;
    this.cccTest_NewFrequency_Options[6]=dimX;
    this.cccTest_NewFrequency_Options[7]=dimY;

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    this.inform_Worker_PushInteractiveTest("CCCTest","Frequency",this.cccTest_NewFrequency_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  /////////////////////////////////////
  /// Interactive Test (CCC-Tests::Treshold)

  openTresholdTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.cccTest_Treshold_Options[tmpID].length; i++) {
    tmpArray.push(this.cccTest_Treshold_Options[tmpID][i])
  }
  this.cccTest_NewTreshold_Options = tmpArray;

  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 6;
  this.selectNewTresholdTestType();

  }

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
        return;
      }

      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_m<0 || value_m>1.0)){
        openAlert("Invalid input for the m-value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        return;
      }

      var value_T = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
      document.getElementById("id_TestPage_NewTest_I2").value = value_T;
      if(isNaN(value_T)){
        openAlert("Invalid input for the T-value!");
        return;
      }

      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_T<0 || value_T>1.0)){
        openAlert("Invalid input for the T-value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        return;
      }


      var value_M = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
      document.getElementById("id_TestPage_NewTest_I3").value = value_M;
      if(isNaN(value_M)){
        openAlert("Invalid input for the M-value!");
        return;
      }

      if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_M<0 || value_M>1.0)){
        openAlert("Invalid input for the M-value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
        return;
      }

      var exp = parseInt(document.getElementById("id_TestPage_NewTest_I4").value);
      document.getElementById("id_TestPage_NewTest_I4").value = exp;
      if(isNaN(exp)){
        openAlert("Invalid input for the exponent!");
        return;
      }

      if(document.getElementById("id_TestPage_NewTest_I4").disabled==false && exp<2){
        openAlert("Invalid input for the exponent! The value is not allowed to be smaller than two!");
        return;
      }

      if(!(value_m<value_T && value_T<value_M)){
        openAlert("Invalid input! The m-value has to be smaller than the T-value and the T-value has to be smaller than the M-Value!");
      }

      var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
      document.getElementById("id_TestPage_GridDimX").value=dimX;
      if(isNaN(dimX)){
        openAlert("Invalid input for the Grid x-dimension!");
        return;
      }
      if(dimX<2){
        openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
        return;
      }

      var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
      document.getElementById("id_TestPage_GridDimY").value=dimY;
      if(isNaN(dimY)){
        openAlert("Invalid input for the Grid y-dimension!");
        return;
      }
      if(dimY<2){
        openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
        return;
      }

      this.cccTest_NewTreshold_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;
      this.cccTest_NewTreshold_Options[1] = this.current_xFktType;
      this.cccTest_NewTreshold_Options[3]=value_m;
      this.cccTest_NewTreshold_Options[4]=value_T;
      this.cccTest_NewTreshold_Options[5]=value_M;
      this.cccTest_NewTreshold_Options[2]=exp;
      this.cccTest_NewTreshold_Options[6]=dimX;
      this.cccTest_NewTreshold_Options[7]=dimY;

      this.draw_TesholdFunctionType();

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.inform_Worker_PushInteractiveTest("CCCTest","Treshold",this.cccTest_NewTreshold_Options);
      this.updateNoise();
      this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
      this.worker_testInteractive_finished=false;
      ///////////////////////////////////////////////////////////
  }

  switchRatioType_TresholdTest(){
    this.cccTest_NewTreshold_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
      this.cccTest_NewTreshold_Options[3]=0.0;
      this.cccTest_NewTreshold_Options[4]=0.5;
      this.cccTest_NewTreshold_Options[5]=1.0;
    }
    else {
      this.cccTest_NewTreshold_Options[3]=this.testingCMS.getRefPosition(0);
      this.cccTest_NewTreshold_Options[4]=this.testingCMS.getRefPosition(0)+0.5*(this.testingCMS.getRefPosition(this.testingCMS.getKeyLength()-1)-this.testingCMS.getRefPosition(0));
      this.cccTest_NewTreshold_Options[5]=this.testingCMS.getRefPosition(this.testingCMS.getKeyLength()-1);
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
      return;
    }
    var xEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    document.getElementById("id_TestPage_NewTest_I2").value=xEnd;
    if(isNaN(xEnd)){
      openAlert("Invalid input for the x"+"End".sub()+".");
      return;
    }

    if(xStart>=xEnd){
      openAlert("Invalid input for the x"+"Start".sub()+" and x"+"End".sub()+". The start value has to be smaller than the end value!");
      return;
    }

    var yStart = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
    document.getElementById("id_TestPage_NewTest_I3").value=yStart;
    if(isNaN(yStart)){
      openAlert("Invalid input for the y"+"Start".sub()+".");
      return;
    }
    var yEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value=yEnd;
    if(isNaN(yEnd)){
      openAlert("Invalid input for the y"+"End".sub()+".");
      return;
    }

    if(yStart>=yEnd){
      openAlert("Invalid input for the y"+"Start".sub()+" and y"+"End".sub()+". The start value has to be smaller than the end value!");
      return;
    }

    // check x,y DIM
    var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
    document.getElementById("id_TestPage_GridDimX").value=dimX;
    if(isNaN(dimX)){
      openAlert("Invalid input for the Grid x-dimension!");
      return;
    }
    if(dimX<2){
      openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
    document.getElementById("id_TestPage_GridDimY").value=dimY;
    if(isNaN(dimY)){
      openAlert("Invalid input for the Grid y-dimension!");
      return;
    }
    if(dimY<2){
      openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    this.fctTest_NewBowlShaped_Options[2][0]=xStart;
    this.fctTest_NewBowlShaped_Options[2][1]=xEnd;
    this.fctTest_NewBowlShaped_Options[2][2]=yStart;
    this.fctTest_NewBowlShaped_Options[2][3]=yEnd;

    this.fctTest_NewBowlShaped_Options[3]=dimX;
    this.fctTest_NewBowlShaped_Options[4]=dimY;

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    this.inform_Worker_PushInteractiveTest("Collection",this.fctTest_NewBowlShaped_Options[1],this.fctTest_NewBowlShaped_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateBowlShapedFctSelection(){
    var selectedID = document.getElementById("id_TestPage_FctSelection").selectedIndex;
    this.openFctBowlShapedTest(selectedID);
  }

  /////////////////////////////////////
  /// Interactive Test (Function-Collection::Local Minimum)

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
      return;
    }
    var xEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    document.getElementById("id_TestPage_NewTest_I2").value=xEnd;
    if(isNaN(xEnd)){
      openAlert("Invalid input for the x"+"End".sub()+".");
      return;
    }

    if(xStart>=xEnd){
      openAlert("Invalid input for the x"+"Start".sub()+" and x"+"End".sub()+". The start value has to be smaller than the end value!");
      return;
    }

    var yStart = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
    document.getElementById("id_TestPage_NewTest_I3").value=yStart;
    if(isNaN(yStart)){
      openAlert("Invalid input for the y"+"Start".sub()+".");
      return;
    }
    var yEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value=yEnd;
    if(isNaN(yEnd)){
      openAlert("Invalid input for the y"+"End".sub()+".");
      return;
    }

    if(yStart>=yEnd){
      openAlert("Invalid input for the y"+"Start".sub()+" and y"+"End".sub()+". The start value has to be smaller than the end value!");
      return;
    }

    // check x,y DIM
    var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
    document.getElementById("id_TestPage_GridDimX").value=dimX;
    if(isNaN(dimX)){
      openAlert("Invalid input for the Grid x-dimension!");
      return;
    }
    if(dimX<2){
      openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
    document.getElementById("id_TestPage_GridDimY").value=dimY;
    if(isNaN(dimY)){
      openAlert("Invalid input for the Grid y-dimension!");
      return;
    }
    if(dimY<2){
      openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    this.fctTest_NewLocalMin_Options[2][0]=xStart;
    this.fctTest_NewLocalMin_Options[2][1]=xEnd;
    this.fctTest_NewLocalMin_Options[2][2]=yStart;
    this.fctTest_NewLocalMin_Options[2][3]=yEnd;

    this.fctTest_NewLocalMin_Options[3]=dimX;
    this.fctTest_NewLocalMin_Options[4]=dimY;

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    this.inform_Worker_PushInteractiveTest("Collection",this.fctTest_NewLocalMin_Options[1],this.fctTest_NewLocalMin_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateLocalMinimaFctSelection(){
    var selectedID = document.getElementById("id_TestPage_FctSelection").selectedIndex;
    this.openFctLocalMinimaTest(selectedID);
  }

  /////////////////////////////////////
  /// Interactive Test (Function-Collection::Valley Shaped)

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
      return;
    }
    var xEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    document.getElementById("id_TestPage_NewTest_I2").value=xEnd;
    if(isNaN(xEnd)){
      openAlert("Invalid input for the x"+"End".sub()+".");
      return;
    }

    if(xStart>=xEnd){
      openAlert("Invalid input for the x"+"Start".sub()+" and x"+"End".sub()+". The start value has to be smaller than the end value!");
      return;
    }

    var yStart = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
    document.getElementById("id_TestPage_NewTest_I3").value=yStart;
    if(isNaN(yStart)){
      openAlert("Invalid input for the y"+"Start".sub()+".");
      return;
    }
    var yEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value=yEnd;
    if(isNaN(yEnd)){
      openAlert("Invalid input for the y"+"End".sub()+".");
      return;
    }

    if(yStart>=yEnd){
      openAlert("Invalid input for the y"+"Start".sub()+" and y"+"End".sub()+". The start value has to be smaller than the end value!");
      return;
    }

    // check x,y DIM
    var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
    document.getElementById("id_TestPage_GridDimX").value=dimX;
    if(isNaN(dimX)){
      openAlert("Invalid input for the Grid x-dimension!");
      return;
    }
    if(dimX<2){
      openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
    document.getElementById("id_TestPage_GridDimY").value=dimY;
    if(isNaN(dimY)){
      openAlert("Invalid input for the Grid y-dimension!");
      return;
    }
    if(dimY<2){
      openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
      return;
    }

    this.fctTest_NewValleyShaped_Options[2][0]=xStart;
    this.fctTest_NewValleyShaped_Options[2][1]=xEnd;
    this.fctTest_NewValleyShaped_Options[2][2]=yStart;
    this.fctTest_NewValleyShaped_Options[2][3]=yEnd;

    this.fctTest_NewValleyShaped_Options[3]=dimX;
    this.fctTest_NewValleyShaped_Options[4]=dimY;

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    this.inform_Worker_PushInteractiveTest("Collection",this.fctTest_NewValleyShaped_Options[1],this.fctTest_NewValleyShaped_Options);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
  }

  updateValleyShapedFctSelection(){
    var selectedID = document.getElementById("id_TestPage_FctSelection").selectedIndex;
    this.openFctValleyShapedTest(selectedID);
  }

  /////////////////////////////////////
  /// Interactive Test (Real World Data)

  openRealWorldTest(type,index){

    this.selectedRealWorldType = type;

    switch (this.selectedRealWorldType) {
      case "medical":
          document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 11;
        break;
      case "scientificFlowSim":
          document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 12;
        break;
      case "photographs":
          document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 13;
        break;
      default:
        return;
    }

  this.initNewTest();
  this.selectRealWorldType(index);

  }

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

    this.updateRealWorldVariables();
  }

  updateRealWorldVariables(){
    var selectedID = document.getElementById("id_TestPage_FctSelection").selectedIndex;

    this.checkAcknowledgements(selectedID);

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    this.inform_Worker_PushInteractiveTest("RealData",this.selectedRealWorldType,selectedID);
    this.updateNoise();
    this.worker_testInteractive.postMessage(this.inform_Worker_GetVisualisation());
    this.worker_testInteractive_finished=false;
    ///////////////////////////////////////////////////////////
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

  /////////////////////////////////////
  ///// 3D Rendering

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
  /////////////////////////////////////
  ///// Style Collection Page
  fillTestCollection() {

    document.getElementById("id_Test_FunctionCollection").innerHTML = "";

    var backgroundColor1 = getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color');
    var backgroundColor2 = getComputedStyle(document.documentElement).getPropertyValue('--main-second-bg-color');

    /////////////////////////////////////////////////////////////////////////////
    ///// CCC-Tests

    var tmpDivCCCTests = document.createElement('div');
    tmpDivCCCTests.style.margin = "auto";
    tmpDivCCCTests.style.background = backgroundColor1;
    tmpDivCCCTests.style.paddingTop = "2vh";

    var tmpDivCCCLabel = document.createElement('p');
    tmpDivCCCLabel.className = "standardText";
    tmpDivCCCLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivCCCLabel.style.height = "4vh";
    tmpDivCCCLabel.style.lineHeight = "4vh";
    tmpDivCCCLabel.style.fontSize = "3.5vh";
    tmpDivCCCLabel.style.marginLeft = "2.5vw";
    tmpDivCCCLabel.style.fontWeight = "bold";
    tmpDivCCCLabel.innerHTML = "1. CCC-Tests:";
    tmpDivCCCTests.appendChild(tmpDivCCCLabel);

    tmpDivCCCTests.appendChild(this.createJumpDiv());
    tmpDivCCCTests.appendChild(this.createGradientDiv());
    tmpDivCCCTests.appendChild(this.createRidgeAndValley());
    tmpDivCCCTests.appendChild(this.createLocalExtrema());
    tmpDivCCCTests.appendChild(this.createFrequency());
    tmpDivCCCTests.appendChild(this.createLittleBit());
    tmpDivCCCTests.appendChild(this.createTreshold());

    /////////////////////////////////////////////////////////////////////////////
    ///// Function Collection

    var tmpDivFunctionCollection = document.createElement('div');
    tmpDivCCCTests.style.margin = "auto";
    tmpDivFunctionCollection.style.background = backgroundColor2;
    tmpDivFunctionCollection.style.paddingTop = "2vh";

    var tmpDivFCLabel = document.createElement('p');
    tmpDivFCLabel.className = "standardText";
    tmpDivFCLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivFCLabel.style.height = "4vh";
    tmpDivFCLabel.style.lineHeight = "4vh";
    tmpDivFCLabel.style.fontSize = "3.5vh";
    tmpDivFCLabel.style.marginLeft = "2.5vw";
    tmpDivFCLabel.style.fontWeight = "bold";
    tmpDivFCLabel.innerHTML = "2. Function Collection:";
    tmpDivFunctionCollection.appendChild(tmpDivFCLabel);

    tmpDivFunctionCollection.appendChild(this.createFunctionLocalMin());
    tmpDivFunctionCollection.appendChild(this.createFunctionBowlShaped());
    tmpDivFunctionCollection.appendChild(this.createFunctionValleyShaped());

    /////////////////////////////////////////////////////////////////////////////
    ///// Real World Data

    var tmpDivRealWorld = document.createElement('div');
    tmpDivRealWorld.style.margin = "auto";
    tmpDivRealWorld.style.background = backgroundColor1;
    tmpDivRealWorld.style.paddingTop = "2vh";

    var tmpDivRealWorldLabel = document.createElement('p');
    tmpDivRealWorldLabel.className = "standardText";
    tmpDivRealWorldLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivRealWorldLabel.style.height = "4vh";
    tmpDivRealWorldLabel.style.lineHeight = "4vh";
    tmpDivRealWorldLabel.style.fontSize = "3.5vh";
    tmpDivRealWorldLabel.style.marginLeft = "2.5vw";
    tmpDivRealWorldLabel.style.fontWeight = "bold";
    tmpDivRealWorldLabel.innerHTML = "3. Real World Data:";
    tmpDivRealWorld.appendChild(tmpDivRealWorldLabel);

    tmpDivRealWorld.appendChild(this.createRealWorld_MedicalDiv());
    tmpDivRealWorld.appendChild(this.createRealWorld_FlowSimDiv());
    tmpDivRealWorld.appendChild(this.createRealWorld_PhotographDiv());


    ////////////////////////////////////////////////////////////////////////////////////
    document.getElementById("id_Test_FunctionCollection").appendChild(tmpDivCCCTests);
    document.getElementById("id_Test_FunctionCollection").appendChild(tmpDivFunctionCollection);
    document.getElementById("id_Test_FunctionCollection").appendChild(tmpDivRealWorld);
  }

  createJumpDiv() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "1.1 Jumps:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);
    for (var i = 0; i < this.cccTest_Jumps_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "jumpSelectorCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID

      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType("CCCTest", "Jump"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_Jumps_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = "J = {";

      for (var j = 0; j < this.cccTest_Jumps_Options[i][1].length; j++) {
        if (this.cccTest_Jumps_Options[i][0])
          labelText += this.cccTest_Jumps_Options[i][1][j] * 100 + "%";
        else
          labelText += this.cccTest_Jumps_Options[i][1][j];


        if (j != this.cccTest_Jumps_Options[i][1].length - 1)
          labelText += ",";
      }
      labelText += "}";
      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);


      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.showSingleTesting();
          testingSection.openJumpTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createGradientDiv() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "1.2 Gradient:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);
    for (var i = 0; i < this.cccTest_Gradient_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "gradientSelectorCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType( "CCCTest", "Gradient"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_Gradient_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText;
      if (this.cccTest_Gradient_Options[i][0]) {
        labelText = "m=" + (this.cccTest_Gradient_Options[i][1] * 100) + "%; ";
        labelText += "M=" + (this.cccTest_Gradient_Options[i][2] * 100) + "%; ";
      } else {
        labelText = "m=" + this.cccTest_Gradient_Options[i][1] + "; ";
        labelText += "M=" + this.cccTest_Gradient_Options[i][2] + "; ";
      }
      labelText += "Type=";

      switch (this.cccTest_Gradient_Options[i][3]) {
        case 0:
          labelText += "Const Gradient :";
          break;
        case 1:
          labelText += "Decreasing Gradient :";
          break;
        case 2:
          labelText += "Increasing Gradient :";
          break;

      }

      switch (this.cccTest_Gradient_Options[i][5]) {
        case 0:
          labelText += "Const Gradient;";
          break;
        case 1:
          labelText += "Decreasing Gradient;";
          break;
        case 2:
          labelText += "Increasing Gradient;";
          break;

      }


      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);


      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.showSingleTesting();
          testingSection.openGradientTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createRidgeAndValley() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "1.3 Ridge/Valley:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);
    for (var i = 0; i < this.cccTest_RidgeValleyLine_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "ridgeValleySelectorCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);


      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType("CCCTest", "RiVa"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_RidgeValleyLine_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText;
      if (this.cccTest_RidgeValleyLine_Options[i][0]) {
        labelText = "m=" + (this.cccTest_RidgeValleyLine_Options[i][1] * 100) + "%; ";
        labelText += "M=" + (this.cccTest_RidgeValleyLine_Options[i][2] * 100) + "%; ";
      } else {
        labelText = "m=" + this.cccTest_RidgeValleyLine_Options[i][1] + "; ";
        labelText += "M=" + this.cccTest_RidgeValleyLine_Options[i][2] + "; ";
      }
      labelText += "Type=";

      switch (this.cccTest_RidgeValleyLine_Options[i][3]) {
        case 0:
          labelText += "Linear : ";
          break;
        case 1:
          labelText += "Mound:";
          break;
        case 2:
          labelText += "Peak:";
          break;
      }

      switch (this.cccTest_RidgeValleyLine_Options[i][5]) {
        case 0:
          labelText += "Linear;";
          break;
        case 1:
          labelText += "Mound;";
          break;
        case 2:
          labelText += "Peak;";
          break;
      }


      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);


      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.showSingleTesting();
          testingSection.openRidgeValleyTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createLocalExtrema() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "1.4 Minimum/Maximum/Saddle:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);
    for (var i = 0; i < this.cccTest_LocalExtrema_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "localExtremaCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType( "CCCTest", "Extrema"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_LocalExtrema_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText;

      if (this.cccTest_LocalExtrema_Options[i][0] < 0 && this.cccTest_LocalExtrema_Options[i][1] < 0) {
        labelText = "Maximum".bold() + ": ";
      } else if (this.cccTest_LocalExtrema_Options[i][0] > 0 && this.cccTest_LocalExtrema_Options[i][1] > 0) {
        labelText = "Minimum".bold() + ": ";
      } else {
        labelText = "Saddle".bold() + ": ";
      }

      labelText += "a=" + this.cccTest_LocalExtrema_Options[i][0] + "; b=" + this.cccTest_LocalExtrema_Options[i][1] + "; m=" + this.cccTest_LocalExtrema_Options[i][2] + ";";

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.showSingleTesting();
          testingSection.openExtremaTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createFrequency() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "1.5 Frequency:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.cccTest_Frequency_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "frequencyCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType("CCCTest", "Frequency"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_Frequency_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = "Frequency-Increases: " + this.cccTest_Frequency_Options[i][3];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.showSingleTesting();
          testingSection.openFrequencyTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createLittleBit() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "1.6 Little Bit:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.cccTest_LittleBit_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "littlebitCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType("CCCTest", "LittleBit"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_LittleBit_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = "from ";

      if (this.cccTest_LittleBit_Options[i][0]) {
        labelText += this.cccTest_LittleBit_Options[i][3] * 100 + "% to ";
        labelText += this.cccTest_LittleBit_Options[i][4] * 100 + "%;";
      } else {
        labelText += this.cccTest_LittleBit_Options[i][3] + " to ";
        labelText += this.cccTest_LittleBit_Options[i][4] + ";";
      }

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.showSingleTesting();
          testingSection.openLittleBitTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createTreshold() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "1.7 Treshold:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.cccTest_Treshold_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "tresholdCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType("CCCTest", "Treshold"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_Treshold_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = "";

      if (this.cccTest_Treshold_Options[i][0]) {
        labelText = "m=" + this.cccTest_Treshold_Options[i][3] * 100 + "% < ";
        labelText += "T=" + this.cccTest_Treshold_Options[i][4] * 100 + "% < ";
        labelText += "M=" + this.cccTest_Treshold_Options[i][5] * 100 + "%; ";
      } else {


        labelText = "m=" + this.cccTest_Treshold_Options[i][3] + " < ";
        labelText += "T=" + this.cccTest_Treshold_Options[i][4] + " < ";
        labelText += "M=" + this.cccTest_Treshold_Options[i][5] + "; ";
      }

      labelText += "Type=";

      switch (this.cccTest_Treshold_Options[i][1]) {
        case 0:
          labelText += "Linear Surounding;";
          break;
        case 1:
          labelText += "Flat Surounding;";
          break;
        case 2:
          labelText += "Steep Surounding;";
          break;
      }

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.showSingleTesting();
          testingSection.openTresholdTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createFunctionLocalMin() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "2.1 Local Minimum:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.fctTest_LocalMin_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = this.fctTest_LocalMin_Options[i][1];
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingType("Collection", this.fctTest_LocalMin_Options[i][1]));
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingOptions(this.fctTest_LocalMin_Options[i]));
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = this.fctTest_LocalMin_Options[i][0];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.showSingleTesting();
          testingSection.openFctLocalMinimaTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createFunctionBowlShaped() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "2.2 Bowl Shaped:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.fctTest_BowlShaped_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = this.fctTest_BowlShaped_Options[i][1];
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingType("Collection", this.fctTest_BowlShaped_Options[i][1]));
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingOptions(this.fctTest_BowlShaped_Options[i]));
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = this.fctTest_BowlShaped_Options[i][0];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.showSingleTesting();
          testingSection.openFctBowlShapedTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createFunctionValleyShaped() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "2.3 Valley Shaped:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.fctTest_ValleyShaped_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = this.fctTest_ValleyShaped_Options[i][1];
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingType("Collection", this.fctTest_ValleyShaped_Options[i][1]));
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingOptions(this.fctTest_ValleyShaped_Options[i]));
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = this.fctTest_ValleyShaped_Options[i][0];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.showSingleTesting();
          testingSection.openFctValleyShapedTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createRealWorld_MedicalDiv() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "3.1 Medical:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.medicalLabels.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "rw_medical_canvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_RealWorldData.postMessage(this.inform_Worker_PushTestingType("RealData", undefined));
      this.inform_Worker_LoadRealWorldIMG("resource/realWorldData/this.medicalData/" + this.medicalFiles[i], this.realWorldCanvasIndex);
      this.realWorldCanvasIndex++;
      this.worker_testCollection_RealWorldData.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = this.medicalLabels[i];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      if (this.medicalAcknowlegments[i] != undefined)
        tmpSelection.appendChild(this.createAchnowledgments(this.medicalAcknowlegments[i]));

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.showSingleTesting();
          testingSection.openRealWorldTest("medical", tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createRealWorld_FlowSimDiv() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "3.2 Scientific Flow Simulation:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.scientificFlowSimLabels.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "rw_scientificFlowSim_canvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      var tmpTestLabel = document.createElement('p');
      var labelText = this.scientificFlowSimLabels[i];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_RealWorldData.postMessage(this.inform_Worker_PushTestingType("RealData", undefined));
      this.inform_Worker_LoadRealWorldIMG("resource/realWorldData/scientificFlowSimulation/" + this.scientificFlowSimFiles[i], this.realWorldCanvasIndex);
      this.realWorldCanvasIndex++;
      this.worker_testCollection_RealWorldData.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      if (this.scientificFlowSimAcknowlegments[i] != undefined)
        tmpSelection.appendChild(this.createAchnowledgments(this.scientificFlowSimAcknowlegments[i]));

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.showSingleTesting();
          testingSection.openRealWorldTest("scientificFlowSim", tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createRealWorld_PhotographDiv() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('p');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');;
    tmpDivLabel.style.fontSize = "2.5vh";
    tmpDivLabel.style.lineHeight = "4vh";
    tmpDivLabel.style.marginTop = "2vh";
    tmpDivLabel.style.fontWeight = "bold";
    tmpDivLabel.innerHTML = "3.3 Photographs:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.photographsLabels.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "rw_photographs_canvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_RealWorldData.postMessage(this.inform_Worker_PushTestingType("RealData", undefined));
      this.inform_Worker_LoadRealWorldIMG("resource/realWorldData/photographs/" + this.photographsFiles[i], this.realWorldCanvasIndex);
      this.realWorldCanvasIndex++
      this.worker_testCollection_RealWorldData.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = this.photographsLabels[i];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      if (this.photographsAcknowlegments[i] != undefined)
        tmpSelection.appendChild(this.createAchnowledgments(this.photographsAcknowlegments[i]));

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.testingSection.showSingleTesting();
          openRealWorldTest("photographs", tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createAchnowledgments(index) {

    var tmpLabel = document.createElement('p');

    var text = "We thank " + this.acknowlegments[index].blankLink(this.acknowlegmentsURL[index]) + " for provision of real world data.";

    tmpLabel.innerHTML = text;

    tmpLabel.onclick = function(event) {
      event.stopPropagation();
    };

    return tmpLabel;
  }

};
