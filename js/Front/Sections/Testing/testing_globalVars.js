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

///////////////////////////////////////////
///// worker

//// Worker : Jumps

var allWorkerFinished=true;
var doneWorkerPreparation=false;
var testField_WorkerJSON;

var jumpWorkers_Array=[];
var jumpWorkerStatus_Array=[];
