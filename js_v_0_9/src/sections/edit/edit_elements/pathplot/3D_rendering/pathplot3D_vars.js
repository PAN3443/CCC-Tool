
var pathplotImgData = undefined;

var textSize = 30;
var textHeight = 2.5;

var circleRad3D = 5;
var bigcircleRad3D = 10;

var pathplotFontColor = "rgb(10, 10, 10)";
var planesOpacity = 0.75;
var lineOpacity = 0.35;
var space_opacity=0.5;

// Lab
var positionsLAB=[];
var labABMax = 0;
var labSPos = -150.0; // -100-200
var labEPos = 150.0; // -100-200

// din99
var positionsDIN99=[];
var din99ABMax = 0;
var din99SPos = -150.0; // -100-200
var din99EPos = 150.0; // -100-200

// LMS
var positionsLMS =[];
var lms3D_lmsStep = 1;

// HSV
var hsv3DRadius = 200;
var vStart3D = -100;
var vEnd3D = 100;


///////////////////////////////////////
//// ALL Space





/*  , , stats,
  var radius = 400;*/

  var pp_cameraLight;


  var bg_texture_pathplot;
  var bgWidth_pathplot;
  var bgHeight_pathplot;
