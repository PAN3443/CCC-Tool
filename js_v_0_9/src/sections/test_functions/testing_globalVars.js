/////////////////////////////////////////////////
//////  Testing Global Vars
var testingModus = 0;

var testingType = 0;

var testingFieldResolution = 5; // ~ 2 million pixels for realistic

var current_yFktType = 0;
var current_xFktType = 0;
///////////////////////////////////////////
///// Fields

var allFieldsFinished;

// USER Test Fields
var userTestGlobalField = undefined;

///////////////////////////////////////////
///// worker
var noiseField_WorkerJSON = {"addNoise":false,"noiseField":undefined,"noiseBehavior":undefined,"maxChange":undefined,"replaceNoiseFrom":undefined,"replaceNoiseTill":undefined};

//// Worker : Jumps
var allJumpWorkersFinished=true;
var jumpWorkers_Array=[];
var jumpWorkerStatus_Array=[];

//// Worker : Gradient
var allGradientWorkersFinished=true;
var gradientWorkers_Array=[];
var gradientWorkerStatus_Array=[];

//// Worker : Frequences
var allFrequencyWorkersFinished=true;
var frequencyWorkers_Array=[];
var frequencyWorkerStatus_Array=[];

var redrawTest = true;
var redrawCollection = true;

//// Worker : User Test
var usertestWorker = undefined;
var usertestWorkerfinished = true;





var drawElementInPreview = false;
var drawElementID = 0;


///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////
/// User Test Options



 /////////////////////////////////////////////////////////////////////
 ///// Real World
 ////////////////////////////////////////////////////////////////////

 var selectedRealWorldType = undefined;

 var realWorldCanvasIndex = 0;



 var importRealDataField = [];

 var scientificMeasurmentsLabels = [];
 var scientificMeasurmentsFiles = [];
 var scientificMeasurmentsData = new Array(scientificMeasurmentsFiles.length);
 var scientificMeasurmentsAcknowlegments = [];



 var statisticalDataLabels = [];
 var statisticalDataFiles = [];
 var statisticalDataData = new Array(statisticalDataFiles.length);
 var statisticalDataAcknowlegments = [];




 var acknowlegments = ["The Stanford volume data archive",
 "DMR - Database For Mastology Research",
 "FLIR Thermal Dataset for Algorithm Training",
 "OTCBVS Benchmark Dataset Collection",
 "SciVis Contest 2018",
 "Playboy"
 ];

 var acknowlegmentsURL = ["https://graphics.stanford.edu/data/voldata/",
 "http://visual.ic.uff.br/dmi/prontuario/home.php",
 "https://www.flir.co.uk/oem/adas/adas-dataset-form/",
 "http://vcipl-okstate.org/pbvs/bench/",
 "https://sciviscontest2018.org/",
 "https://www.playboy.com/"
 ];


 var acknowlegmentsAdditional = [undefined,
 "The Database For Mastology Research (DMR) is an online platform with mastologic images for early detection of breast cancer.",
 "The FLIR starter thermal dataset is intended for the training of convolutional neural networks.",
 "This image comes from OSU Thermal Pedestrian Database. The topic of interest is the person detection in thermal imagery.",
 "This data set comes from the SciVis contest 2018 and includes the simulation data of asteroid impacts in deep ocean water.",
 "Lenna is a test image often used in the computer science of image processing. The image is popular because of its different areas of multifarious detail degree."
 ];
