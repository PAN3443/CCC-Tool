/////////////////////////////////////////////////
//////  Testing Global Vars




var testingFieldResolution = 1500; // ~ 2 million pixels for realistic


///////////////////////////////////////////
///// Fields

var allFieldsFinished;

// Jumps
var useCMSRangeForJumpFields = true;
var jumpTestFields_Array = [];
var jumpTestFields_Names = [];
var allJumpsFinished = false;
var jumpFieldRangeStart =0;
var jumpFieldRangeEnd =0;

// Gradient
var useCMSRangeForGradientFields = true;
var gradientTestFields_Array = [];
var gradientTestFields_Names = [];
var allGradientFinished = false;
var gradientFieldRangeStart =0;
var gradientFieldRangeEnd =0;

// Frequency
var useCMSRangeForFrequencyFields = true;
var frequencyTestFields_Array = [];
var frequencyTestFields_Names = [];
var allFrequencyFinished = false;
var frequencyFieldRangeStart =0;
var frequencyFieldRangeEnd =0;

///////////////////////////////////////////
///// worker

//// Worker : Jumps

var allJumpWorkersFinished=true;
var testField_WorkerJSON;

var jumpWorkers_Array=[];
var jumpWorkerStatus_Array=[];
