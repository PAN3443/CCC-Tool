///////////////////////////
/// GLOBAL
//////////////////////////

var version_JS_FolderName = "js_v_0_83";

var anonymousMode = true;

///
var globalCMS1;
var globalCMS1JSON = {'message':'undefined'};

var browserCanWorker = false;
var browserCanOffscreenCanvas = false;
var browsertype = undefined;
var numberOfCores = undefined;
var numberOfMaxWorker = undefined;

var numDecimalPlaces=2;

// Calculation of Interval colors depenting on colordifference delta
var intervalDelta = 1;
var intervalSize = 1;

var errorMath = 1e12;   // for math operations with wrong decimal places
var smallErrorMath = 1e-12; // for math operation, which should be zero.
