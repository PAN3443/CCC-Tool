///////////////////////////
/// GLOBAL
//////////////////////////
var showSideID = 0; // 0 = myList; 1=CreateSide, 2=Analyse

//// Colormaps
var myList = [];
var createColormap;
var exportColormap;
var analysisColormap;
var compareColormap1;
var compareColormap2;

/// Colorspace Parameter
var kE = 1;
var kCH = 1;

//
var numDecimalPlaces = 2;

// mouseposition
var mousePosX;
var mousePosY;

// Resolutions

var resolutionX_differenceMetrics = 1024;

var vPlot_resolution_X = 1500; // hue colorspace
var vPlot_resolution_Y = 650; // hue colorspace

var hue_resolution_X = 750;//1500; // hue colorspace
var hue_resolution_Y = 750;//1500; // hue colorspace

  var hs_resolution_X =  750;//1500; // Colorpicker
  var hs_resolution_Y = 750;//1500; // Colorpicker

  var v_resolution_X = 1; // Colorpicker
  var v_resolution_Y = 400; // Colorpicker

  // key
  var key_resolution_X = 1920;
  var key_resolution_Y = 100;

  // linear Colormap
  var linearMap_resolution_X = 1024; //1920;
  var linearMap_resolution_Y = 1; //250;

  // analyselinear Colormap
  var analysePreviewMap_resolution_X = 700;
  var analysePreviewMap_resolution_Y = 1;

  // MyList Colormaps
  var myList_resolution_X = 700;
  var myList_resolution_Y = 1;

  // Existing Colormaps
  var existingMap_resolution_X = 250;
  var existingMap_resolution_Y = 1;




// using colormap
var colorspaceModus = "rgb"; // 0=rgb,1=hsv,2=lab,3=din99


////////// Canvas colorspaceCenter
var colorspaceCenterX;
var colorspaceCenterY;
var colorspaceRadius;
var radiusratio = 0.95;
var labSpaceRectRange = 0.8;
var bigLineWidth = 8;
var smallLineWidth = 4;
var circleRadPicker = 40;
var circleRad = 8; //15;
var bigcircleRad = 12;//25;
var vBarWidth = 8;
var circleStrokeWidth = 15;
var alphaVal = 1.0;
var lineWidthVPlot = 5;
var arrowWidth = 15;

var widthVArea =0; // width of plotelement
var widthVArea2 =0; // width of plotelement
var heigthVArea =0;
var plotXStart =0;
var plotYStart =0;
var plotYEnd=0;
var plotLineWidth = 5;
var plotLineColor = "rgb(0,0,0)";

var labSpaceRange = 128;
//var din99SpaceRange = 156;

var lineWidth3D = 3;

var rangeA99Neg = -155;
var rangeA99Pos = 105;
var rangeA99;

var rangeB99Neg = -83;
var rangeB99Pos = 155;
var rangeB99;

var colorspaceBackgroundData;
var colorspaceBackgroundDataRG;
var colorspaceBackgroundDataRG;
var colorspaceBackgroundDataBG;

// colorspace eventes
var mouseAboveSpaceObjectID = -1;
var mouseGrappedSpaceObjectID = -1;
var updateSketchID1 = -1;
var updateSketchID2 = -1;
var updateCurrentValue = 0;
var mouseGrappedColor = "rgb(120,120,120)";

var spaceElementsXPos = [];
var spaceElementsYPos = [];
var spaceElementsType = [];
var spaceElementsKey = [];

/////
// Band Sketch
/////
var bandSketch;
var bandSketch2;
////////////////////////////////////////////////////////////////////////////////


///////////////////////////
/// My List
//////////////////////////
var myListPageModus = 0; // 0=standart, 1=analysis, 2=compare
var colormap1SelectIndex = 0;
var colormap2SelectIndex = 0;
var selectFirstForCompare = false;


////////////////////////////////////////////////////////////////////////////////


///////////////////////////
/// ADD
//////////////////////////

var pathColormaps = "resource/sciviscolor/";
var folderYellow = "Scaled/YellowOrange/";
var folderBlue = "Scaled/Blues/";
var folderRedPurple = "Scaled/RedPurple/";
var folderGreen = "Scaled/Green/";
var folderBrown = "Scaled/Brown/";
var folderDivergent = "Divergent/";
var fileYellowColormaps = ["YellowOrange1.xml", "YellowOrange2.xml", "YellowOrange3.xml", "YellowOrange4.xml", "YellowOrange5.xml", "YellowOrange6.xml", "YellowOrange7.xml", "YellowOrange8.xml"];
var fileBlueColormaps = ["Blue1.xml", "Blue2.xml", "Blue3.xml", "Blue4.xml", "Blue5.xml", "Blue6.xml", "Blue7.xml", "Blue8.xml", "Blue9.xml", "Blue10.xml", "Blue11.xml",];
var fileRedPurpleColormaps = ["RedPurple1.xml", "RedPurple2.xml", "RedPurple3.xml", "RedPurple4.xml", "RedPurple5.xml", "RedPurple6.xml", "RedPurple7.xml", "RedPurple8.xml"];
var fileGreenColormaps = ["Green1.xml", "Green2.xml", "Green3.xml", "Green4.xml", "Green5.xml", "Green6.xml", "Green7.xml", "Green8.xml"];
var fileBrownColormaps = ["Brown1.xml", "Brown2.xml", "Brown3.xml", "Brown4.xml", "Brown5.xml", "Brown6.xml", "Brown7.xml", "Brown8.xml", "Brown9.xml"];
var fileDivergentColormaps = ["Blue_Orange.xml", "Green_Brown.xml", "Grey_Gold.xml", "Turqoise_Olive.xml"];


var restSpace = 0;
var sizeMyList = 10;
var addedIndex = [];
var addedType = [];
var addedPos = [];


////////////////////////////////////////////////////////////////////////////////


///////////////////////////
/// Create
//////////////////////////
var isEdit = -1;

// Create Menue button events
var colormapProcess = [];
var processPosition = -1;
var processLimitation = 20;
var saveMyListID = 0;

var createBandType = 1; // 0=constant, 1=scale, 2=double, 3=triple, 4=quadruple
var activColorIndex = 0;
var bandIndex = -1;
var creatorBandIsNew = true;
var newBandIsAdded = true;
var dragPredefinedBandIndex = -1;
var dragPredefinedBandType = -1;

var colorVal1_C1 = 255;
var colorVal2_C1 = 255;
var colorVal3_C1 = 255;
var colorVal1_C2 = 191.25;
var colorVal2_C2 = 191.25;
var colorVal3_C2 = 191.25;
var colorVal1_C3 = 127.5;
var colorVal2_C3 = 127.5;
var colorVal3_C3 = 127.5;
var colorVal1_C4 = 63.75;
var colorVal2_C4 = 63.75;
var colorVal3_C4 = 63.75;
var colorVal1_C5 = 0;
var colorVal2_C5 = 0;
var colorVal3_C5 = 0;

// table expand button
var tableIsExpand = false;


///// Draw Colormap and keys
var refElementContainer = [];

// Key events
var keyRectPoint = [];
var colorrectHeigth = 0;
var colorrectWitdh = 0;
var grappedKey = false;
var overKeyID = -1;
var mouseKeyChangeUp = false;

var dropPositionElements = [];
var droppedBandElements = [];
var refLineSketchContainer = [];

// drag and drop
var dragElemBandCreator;
var doppedBandtype = -1;
var doppedBandIndex = -1;


var indexOfDroppedPlace = -1;

// Band Edit
var bandOptionsIndex = -1;
var hasRightNeig = false
var hasLeftNeig = false;
var changedColor = false;
var changedColorC1;
var changedColorC2;
var changedRefR1;
var changedRefR2;
var changedNeiRefR1;
var changedNeiRefR2;

var c1IsActive = true;

// predefined Bands

var constBands = [   new classColor_RGB(0,0,0), new classColor_RGB(1, 1,1), new classColor_RGB(1, 0.8, 0.8), new classColor_RGB(1, 0.4, 0.4), new classColor_RGB(1, 0.4, 0.2), new classColor_RGB(1, 0, 0), new classColor_RGB(0.8, 0, 0), new classColor_RGB(0.6, 0, 0), new classColor_RGB(0.4, 0, 0),  // red
                  new classColor_RGB(1, 0.917647059, 0.8), new classColor_RGB(1, 0.76, 0.4), new classColor_RGB(1, 0.682352941, 0.2), new classColor_RGB(1, 0.6, 0), new classColor_RGB(0.8, 0.48, 0), new classColor_RGB(0.6, 0.36, 0), new classColor_RGB(0.4, 0.24, 0),  // orange
                  new classColor_RGB(0.99999999956,1,0.78),  new classColor_RGB(0.99999999916,1,0.58), new classColor_RGB(0.99999999868,1,0.33999999999999997), new classColor_RGB(0.9999999988,1,0.4), new classColor_RGB(0.9999999982000001,1,0.09999999999999998), new classColor_RGB(0.9999999980000001,1,0), new classColor_RGB(0.7999999984000001,0.8,0), new classColor_RGB(0.5999999988,0.6,0), //yellow
                  new classColor_RGB(0.7800000000044001,1,0.78), new classColor_RGB(0.800000000004,1,0.8), new classColor_RGB(0.6000000000079999,1,0.6), new classColor_RGB(0.400000000012,1,0.4), new classColor_RGB(0.20000000001599993,1,0.19999999999999996), new classColor_RGB(2.000000165480742e-11,1,0), new classColor_RGB(1.3200001092172898e-11,0.66,0),new classColor_RGB(1.2000000992884451e-11,0.6,0),  // green
                  new classColor_RGB(0.78,1,1), new classColor_RGB(0.56,1,1), new classColor_RGB(0.6,1,1), new classColor_RGB(0.4,1,1), new classColor_RGB(0.2,1,1), new classColor_RGB(0,0.88,0.88), new classColor_RGB(0,0.8,0.8), new classColor_RGB(0,0.6,0.6), //blue
                  new classColor_RGB(0.7800000004400001,0.78,1), new classColor_RGB(0.8000000004000001,0.8,1), new classColor_RGB(0.6000000008,0.6,1), new classColor_RGB(0.4000000012000001,0.4,1), new classColor_RGB(0.2000000016000001,0.19999999999999996,1), new classColor_RGB(2.000000165480742e-9,0,1), new classColor_RGB(1.6000001323845936e-9,0,0.8), new classColor_RGB(1.2000000992884452e-9,0,0.6),  // blue 2
                  new classColor_RGB(0.9999999979999998,0,1), new classColor_RGB(0.9999999996,0.8,1), new classColor_RGB(0.9999999991999999,0.6,1), new classColor_RGB(0.9999999987999999,0.4,1), new classColor_RGB(0.9999999983999999,0.19999999999999996,1), new classColor_RGB(0.9999999979999998,0,1), new classColor_RGB(0.7999999983999999,0,0.8),new classColor_RGB(0.5999999987999999,0,0.6)
               ];

var scaleBands = [[new classColor_RGB(0, 0, 0), new classColor_RGB(1, 1, 1)], // black white
                [new classColor_RGB(1,0,0), new classColor_RGB(1,1,1)], // red white
                [new classColor_RGB(1,0,0), new classColor_RGB(1,1,0)], // red yellow
                [new classColor_RGB(1, 0, 0), new classColor_RGB(0, 1, 1)], // red cyan
                [new classColor_RGB(1, 0, 0), new classColor_RGB(0, 0, 1)], // red blue
                [new classColor_RGB(1, 1, 0), new classColor_RGB(0, 0, 1)], // yellow blue
                [new classColor_RGB(0, 1, 1), new classColor_RGB(0, 0, 1)], // cyan blue
                [new classColor_RGB(0, 1, 1), new classColor_RGB(1, 0, 1)], // cyan blue
                [new classColor_RGB(0, 0, 1), new classColor_RGB(1, 0, 1)], // cyan blue
                [new classColor_RGB(1, 1, 1), new classColor_RGB(0, 0, 0)], // START BAND !!!!! (white black)
                ];

                bandIndex = scaleBands.length-1;

var doubleBands = [ [new classColor_RGB(1,0.04363238475790354,0.015850553040006377), new classColor_RGB(0.8425063909685755,0.5040655970974081,0.14291810185217466), new classColor_RGB(0.6199244458392044,0.6097191064500393,0.20300372989296359)], // red orange yellow
                  [new classColor_RGB(0.9677215034696575,1,0.01989749749690406), new classColor_RGB(0.4898978955486485,0.7818022241151106,0.11047321311559163), new classColor_RGB(0.16662577174242177,0.5308916677874558,0.14806671752952635)], // yellow green
                  [new classColor_RGB(0.9677215034696575,1,0.01989749749690406), new classColor_RGB(0.059850650279225155,0.7818022241151106,0.7501990085657919), new classColor_RGB(0.17221983919401046,0.1545121848060229,0.530891667787455)], // yellow blue
                  [new classColor_RGB(0.011803608583108804,0.9865239817915799,1), new classColor_RGB(0.11996494364741034,0.3928048146641329,0.78180222411511), new classColor_RGB(0.17221983919401046,0.1545121848060229,0.530891667787455)], // blue
                  [new classColor_RGB(0.011803608583108804,0.9865239817915799,1), new classColor_RGB(1,1,1), new classColor_RGB(1,0,0)], // cyan, white red
                  [new classColor_RGB(0,0,1), new classColor_RGB(1,1,1), new classColor_RGB(1,0,0)], // blue, white red
                ]; // red white blue

var tribleBands = [[new classColor_RGB(0, 0, 0), new classColor_RGB(0, 1, 0),new classColor_RGB(0, 1,1),new classColor_RGB(1, 1, 1)], // black green yellow white
                [new classColor_RGB(1, 1, 1), new classColor_RGB(0, 1,1),new classColor_RGB(0, 1, 0),new classColor_RGB(0, 0, 0)], // white yellow green black
                [new classColor_RGB(1, 0, 0), new classColor_RGB(0, 0, 0), new classColor_RGB(0, 0, 0),new classColor_RGB(0, 0, 1)]]; // red white blue

var quadBands = [[new classColor_RGB(0, 0, 0), new classColor_RGB(0, 1, 0),new classColor_RGB(0, 1,1),new classColor_RGB(1, 0.5,0),new classColor_RGB(1, 1, 1)], // black green yellow white
                [new classColor_RGB(1, 1, 1), new classColor_RGB(1, 0.5,0), new classColor_RGB(0, 1,1),new classColor_RGB(0, 1, 0),new classColor_RGB(0, 0, 0)], // white yellow green black
                [new classColor_RGB(1, 0, 0), new classColor_RGB(0, 0, 0), new classColor_RGB(1, 1, 1), new classColor_RGB(0, 0, 0),new classColor_RGB(0, 0, 1)]]; // red white black white blue*/


////////////////////////////////////////////////////////////////////////////////


///////////////////////////
/// Export
//////////////////////////

var outputFormat = 1; // 0=lookup, 1=xml, 2=json
var exportSideOpen = false;
////////////////////////////////////////////////////////////////////////////////
