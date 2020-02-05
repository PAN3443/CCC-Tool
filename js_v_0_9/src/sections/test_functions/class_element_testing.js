class class_Testing_Element_Basis {

  constructor(divID,buttonID) {
    this.partDivID=divID;
    this.buttonID = buttonID;

    ////////////////////////////////////////////////////////////////////////////
    // Variables needed in more than one single element.
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

  updateElement(){

  }

  getParentCMS(){
    return cloneCMS(testingSection.editCMS);
  }

  isElementOpen(){
    if(this.partDivID==undefined)
      return false;

    var tmpDiv = document.getElementById(this.partDivID);
    if(tmpDiv==null || tmpDiv==undefined)
      return false;

    if(tmpDiv.style.width==="100vw")
      return true;
    else
      return false;
  }

  showElement(){
    /*if(this.partDivID==undefined)
      return;

    var tmpDiv = document.getElementById(this.partDivID);
    if(tmpDiv==null || tmpDiv==undefined)
      return;*/

    testingSection.element_singleTest.hideElement()
    testingSection.element_testCollection.hideElement()
    testingSection.element_testReport.hideElement()
    document.getElementById(this.partDivID).style.width = "100vw";
    document.getElementById(this.buttonID).style.background = "var(--main-active-coloredButton)";
  }

  hideElement(){
    /*if(this.partDivID==undefined)
      return;

    var tmpDiv = document.getElementById(this.partDivID);
    if(tmpDiv==null || tmpDiv==undefined)
      return;*/

    document.getElementById(this.partDivID).style.width = "0vw";
    document.getElementById(this.buttonID).style.background = "var(--main-coloredButton)";
  }



};
