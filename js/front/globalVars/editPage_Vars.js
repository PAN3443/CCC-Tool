


var somethingChanged = false;


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

var timer2DAnimation;
var animationInterval = 1000/30;

// key moving vars
var grappedKey = false;
var overKeyID = -1;
var mouseKeyChangeUp = true;

var colorpickerAffectID="";
var colorpickerType = "RG_B";

//////////////////////////////////////////////////////////////
// Probes
var globalProbeSet;
var globalProbeSpace = "hsv";
var globalProbeType = 0;
var globalProbeSubtype = 0;
var globalProbeSubtypeIndex = 0;
var globalProbeRangeType = 0;
var globalProbeColor = new classColor_HSV(0,0,1.0);


//////////////////////////////////////////////////////////////
// ADD CMS
var colorpickerColor = new classColor_RGB(1,1,1);
var customConstBandColor = new classColor_RGB(0.5,0.5,0.5);
var customScaleBandColor1 = new classColor_RGB(1.0,1.0,1.0);
var customScaleBandColor2 = new classColor_RGB(0.0,0.0,0.0);
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

var pathColormaps = "resource/sciviscolor/";
var folderYellow = "Scaled/YellowOrange/";
var folderBlue = "Scaled/Blues/";
var folderRedPurple = "Scaled/RedPurple/";
var folderGreen = "Scaled/Green/";
var folderBrown = "Scaled/Brown/";
var folderDivergent = "Divergent/";
var folderThreeBand = "ThreeBand/";
var folderFourBand = "FourBand/";
var fileYellowColormaps = ["YellowOrange1.xml", "YellowOrange2.xml", "YellowOrange3.xml", "YellowOrange4.xml", "YellowOrange5.xml", "YellowOrange6.xml", "YellowOrange7.xml", "YellowOrange8.xml"];
var fileBlueColormaps = ["Blue1.xml", "Blue2.xml", "Blue3.xml", "Blue4.xml", "Blue5.xml", "Blue6.xml", "Blue7.xml", "Blue8.xml", "Blue9.xml", "Blue10.xml", "Blue11.xml"];
var fileRedPurpleColormaps = ["RedPurple1.xml", "RedPurple2.xml", "RedPurple3.xml", "RedPurple4.xml", "RedPurple5.xml", "RedPurple6.xml", "RedPurple7.xml", "RedPurple8.xml"];
var fileGreenColormaps = ["Green1.xml", "Green2.xml", "Green3.xml", "Green4.xml", "Green5.xml", "Green6.xml", "Green7.xml", "Green8.xml"];
var fileBrownColormaps = ["ccc-tool_colormap_ScaledBlackBrown3.xml","ccc-tool_colormap_ScaledBlackBrown4.xml","ccc-tool_colormap_ScaledBlackBrown1.xml","ccc-tool_colormap_ScaledBlackBrown2.xml","Brown1.xml", "Brown2.xml", "Brown3.xml", "Brown4.xml", "Brown5.xml", "Brown6.xml", "Brown7.xml", "Brown8.xml", "Brown9.xml"];
var fileDivergentColormaps = ["Blue_Orange.xml", "Green_Brown.xml", "Grey_Gold.xml", "Turqoise_Olive.xml","ccc-tool_colormap_DoubleDiv1.xml","ccc-tool_colormap_DoubleDiv2.xml","ccc-tool_colormap_DoubleDiv3.xml","ccc-tool_colormap_DivQuadruple1.xml","ccc-tool_colormap_DivQuadruple2.xml"];
var fileThreeBandColormaps = ["brown_green_blue.xml", "brown_green_orangeRed.xml","yellowOrange_brown_blue.xml","blue_green_red.xml"];
var fileFourBandColormaps = ["1.xml", "2.xml", "3.xml", "4.xml", "5.xml"];

var cmsYellowColormaps = [];
var cmsBlueColormaps = [];
var cmsRedPurpleColormaps = [];
var cmsGreenColormaps = [];
var cmsBrownColormaps = [];
var cmsDivergentColormaps = [];
var cmsThreeBandColormaps = [];
var cmsFourBandColormaps = [];
