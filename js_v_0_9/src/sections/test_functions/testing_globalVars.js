/////////////////////////////////////////////////
//////  Testing Global Vars
var testingModus = 0;

var testingType = 0;

var testingFieldResolution = 5; // ~ 2 million pixels for realistic


///////////////////////////////////////////
///// Fields

var allFieldsFinished;

// USER Test Fields
var userTestGlobalField = undefined;

///////////////////////////////////////////
///// worker

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
