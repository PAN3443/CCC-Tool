var doingAnimation = false;
var pathplotAnimationID;

var testAnimationInterval = 1000/30;
var testIntervalAnimation;


var dorotation = false;
var downXPos =0;
var downYPos =0;
var xRotationAngle=0; //Math.PI/2;
var yRotationAngle=0;

var xRotationDownAngle=0; //Math.PI/2;
var yRotationDownAngle=0;

var opacityVal = 0.5;

var showSpace = 0; // 1=rgb, 2=lab

var textSize = 30;
var textHeight = 7;

var circleRad3D = 5;
var bigcircleRad3D = 10;

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

// HSV
var hsv3DRadius = 200;
var vStart3D = -100;
var vEnd3D = 100;

///////////////////////////////////////
//// ALL Space

  var font;
  var pathPlotGroup;
  var scene, camera, renderer, stats, colorspaceGroup;
  var radius = 400;

  var cameraLight;
