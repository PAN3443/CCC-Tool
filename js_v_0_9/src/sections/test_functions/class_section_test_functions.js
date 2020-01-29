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
    //////////////////////////////////////////////////
    /// 3D Rendering

    this.do3DTestField = false;

    ///////////////////////////////////////////////
    /// Init

    /*document.getElementById('id_testPageLabel').onmouseenter= function(){ displayTestMap();};
    document.getElementById('id_testPageLabel').onmouseleave= function(){ document.getElementById("id_Test_Map").style.display="none"};
    document.getElementById('id_testPageLabelArrow').onmouseenter= function(){ displayTestMap();};
    document.getElementById('id_testPageLabelArrow').onmouseleave= function(){ document.getElementById("id_Test_Map").style.display="none"};

    document.getElementById('id_reportPageLabel').onmouseenter= function(){ displayTestMap();};
    document.getElementById('id_reportPageLabel').onmouseleave= function(){ document.getElementById("id_Test_Map").style.display="none"};
    document.getElementById('id_reportPageLabelArrow').onmouseenter= function(){ displayTestMap();};
    document.getElementById('id_reportPageLabelArrow').onmouseleave= function(){ document.getElementById("id_Test_Map").style.display="none"};

    document.getElementById("id_Test_downloadScreenshot").addEventListener('click', downloadTestImage, false);
    document.getElementById("id_Test_downloadScreenshotGrey").addEventListener('click', downloadTestImageGrey, false);
    document.getElementById("id_Test_downloadScreenshotFull").addEventListener('click', downloadTestImage, false);
    document.getElementById("id_Test_downloadScreenshotGreyFull").addEventListener('click', downloadTestImageGrey, false);

    document.getElementById('id_Test_MeshVisDiv').addEventListener('contextmenu', event => event.preventDefault());
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
      //selectNewTestType();
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
      workerJSON['do3DTestField'] = do3DTestField;
      workerJSON['scalefactor3DTest'] = scalefactor3DTest;

    }
    return workerJSON;
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
      this.inform_Worker_LoadRealWorldIMG("resource/realWorldData/medicalData/" + this.medicalFiles[i], this.realWorldCanvasIndex);
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
