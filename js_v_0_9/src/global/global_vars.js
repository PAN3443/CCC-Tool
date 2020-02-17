

//////////////////////////////////////////////////////
///// Sections
//////////////////////////////////////////////////////
//
var version_JS_FolderName = "js_v_0_9";
var doColorblindnessSim = false;

var welcomeSection = undefined;
var myDesignsSection = undefined;
var gallerySection = undefined;
var editSection = undefined;
var probeSection = undefined;
var optiSection = undefined;
var testingSection = undefined;
var newSection = undefined;
var exportSection = undefined;


// Animation
var timer2DAnimation;
var animationInterval = 1000/30;

// Math
var errorMath = 1e12;   // for math operations with wrong decimal places
var smallErrorMath = 1e-12; // for math operation, which should be zero.

// worker

var global_worker_3DSpaceGrids=undefined;
