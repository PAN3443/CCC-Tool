


var somethingChanged = false;

var mapping_doAnimation = false;

////////////////////////////
/// Colormap Process
var colormapProcess = [];
var processPosition = -1;
var processLimitation = 20;

var keyRectPoint = [];
var keyBurPoint = [];
var keyBurKeyIndex = [];
var colorrectWitdh = 0;
var colorBurRadius = 0;
var limitKeyBurLine = true;

// mouseposition
var mousePosX;
var mousePosY;







//////////////////////////////////////////////////////////////
// Probes
var globalProbeSet;
var globalProbeSpace = "hsv";
var globalProbeType = 0;
var globalProbeSubtype = 0;
var globalProbeSubtypeIndex = 0;
var globalProbeRangeType = 0;
var globalProbeColor = new class_Color_HSV(0,0,1.0);


//////////////////////////////////////////////////////////////
// ADD CMS

var customConstBandColor = new class_Color_RGB(0.5,0.5,0.5);
var customScaleBandColor1 = new class_Color_RGB(1.0,1.0,1.0);
var customScaleBandColor2 = new class_Color_RGB(0.0,0.0,0.0);
var selectedPredefinedType = 0;

///////////////////////////////////////////////////////////////////////
// Colormap Path

var pathplotLines1 = [];
var pathplotLines2 = [];
var pathplotLines3 = [];
var pathplotLines4 = [];

var pathColorspace = "lab";
var onlyRGBPossibleColor = true;
var backgroundValue = 0;
var mouseAboveKeyID = -1;
var mouseGrappedKeyID = -1;
var mouseGrappedColorSide = -1;
var lineWidthVPlot = 2;
var mouseGrappedColor = "rgb(120,120,120)";

//var alphaVal = 1.0;
var circleRad = 6;//8;
var bigcircleRad = 8;// 12;
var bigLineWidth = 4;//8;
var smallLineWidth = 2;//4;
var radiusratio = 0.95;
var labSpaceRectRange = 128; //0.8

///////////////////////////////////////////////////////////////////////////////
/// Predefined CMS

var filterPredefined = 0; // 0=all, 1=Multiband, 2=Divergent, 3=Scaled All, 4=Scaled Blue, 5=Scaled Brown, 6=Scaled Green, 7=Scaled Red Purple, 8=Scaled Yellow Orange
var currentPredefinedType = -1;
var currentPredefinedId = -1;
