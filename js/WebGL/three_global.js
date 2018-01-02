

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

///////////////////////////////////////
//// RGB Space

  var font;
  var colormapRGB3D;
  var scene, camera, renderer, stats, rgbGroup;
  var radius = 400;

  var cameraLight;

  var textR, textG, textB;
  var doRGB3D = false;

  var planeRG_material;
  var planeRG;
  var planeBG_material;
  var planeBG ;
  var planeBR_material;
  var planeBR;
  var planeRG255_material;
  var planeRG255;
  var planeBG255_material;
  var planeBG255;
  var planeBR255_material;
  var planeBR255;
