///////////////////////////
/// MAIN PAGE
//////////////////////////

// colorpicker

var hs_resolution_X = 1500;
var hs_resolution_Y = 1500;

var aboveC1Circle = false;
var aboveC2Circle = false;
var grapedC1Circle = false;
var grapedC2Circle = false;

var bigcircleRad = 50;
var circleRad = 25;
var circleStrokeWidth = 8;
var activeCircleColor = "rgb(120,120,120)";
// using colormap 
var colorspaceModus = "rgb"; // 0=rgb,1=hsv,2=lab,3=din99
var colorVal1_C1 = 255;
var colorVal2_C1 = 255;
var colorVal3_C1 = 255;
var colorVal1_C2 = 0;
var colorVal2_C2 = 0;
var colorVal3_C2 = 0;

// table expand button
var tableIsExpand = false;

// existing Colormaps
var yellow1Colormap;
var yellow2Colormap;
var yellow3Colormap;

var pathyellow1 = "resource/Colormaps/yellow1.xml";
var pathyellow2 = "resource/Colormaps/yellow2.xml";
var pathyellow3 = "resource/Colormaps/yellow3.xml";

var red1Colormap;
var red2Colormap;
var red3Colormap;

var pathred1= "resource/Colormaps/red1.xml";
var pathred2= "resource/Colormaps/red2.xml";
var pathredw3= "resource/Colormaps/red3.xml";

var blue1Colormap;
var blue2Colormap;
var blue3Colormap;

var pathblue1= "resource/Colormaps/blue1.xml";
var pathblue2= "resource/Colormaps/blue2.xml";
var pathblue3= "resource/Colormaps/blue3.xml";

var green1Colormap;
var green2Colormap;
var green3Colormap;

var pathgreen1= "resource/Colormaps/green1.xml";
var pathgreen2= "resource/Colormaps/green2.xml";
var pathgreen3= "resource/Colormaps/green3.xml";