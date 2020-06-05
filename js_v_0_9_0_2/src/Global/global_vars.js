// Animation
var version_JS_FolderName = "js_v_0_9_0_2";
var tool_version = "0.9.0.2";
var tool_copyRight = "2020";
var doColorblindnessSim = false;
var timer2DAnimation;
var animationInterval = 1000/30; //1000/30;
// Math
var errorMath = 1e12;   // for math operations with wrong decimal places
var smallErrorMath = 1e-12; // for math operation, which should be zero.
// worker
var doWorker = true;
var browserCanOffscreenCanvas = false;

// just noticeable difference
var jnd_lab = 2;
var jnd_din99 = 2;
////
var gWorkColor1 = new class_Color("rgb",0,0,0);
var gWorkColor2 = new class_Color("rgb",0,0,0);

var ref_GlobalCMS = undefined;
