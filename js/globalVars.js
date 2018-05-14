///////////////////////////
/// GLOBAL
//////////////////////////


////////////////////////////////////
//// possible User Settings
var k_L = 1.0, k_C = 1.0, k_H = 1.0; // K_l = 1 default, = 2 textiles
var k_1 = 0.045, k_2 = 0.015; // K1: 0.045 graphic arts  0.048 textiles  K2: 0.015 graphic arts 0.014 textiles


//////////////////////////////////////////


var showSideID = -1; // 0 = myList; 1=CreateSide, 2=Analyse
var initPageType = -1;
var somethingChanged = false;

var styleActiveColor = "rgba(0,191,255,0.7)";
var styleInactiveColor = "none";//"rgba(169,169,169,0.3)";//"rgb(65,105,225)";
var size3D=50;

//// Colormaps
var myList = [];
var globalCMS1;
var globalCMS2;
var tmpSaveColormap;
var saveTwoColormaps=false;
var tmpSaveColormap2;
var colormap1SelectIndex = -1;
var colormap2SelectIndex = -1;
var pageIsLoaded=false;

/*var createColormap;
var exportColormap;
var analysisColormap;
var compareColormap1;
var compareColormap2;*/

/// Colorspace Parameter
var kE = 1;
var kCH = 1;

var interactionIntervalSize = 200;//50;
var intervalSize = 200;

//
var numDecimalPlaces = 2;

// mouseposition
var mousePosX;
var mousePosY;

var timer2DAnimation;
var animationInterval = 1000/30;

// Resolutions

var resolutionX_differenceMetrics = 1024;

var vPlot_resolution_X = 800; // hue colorspace
var vPlot_resolution_Y = 400; // hue colorspace

var vPlot_bg_resolution_X = 1500; // hue colorspace
var vPlot_bg_resolution_Y = 650; // hue colorspace

var hue_resolution_X = 400; //750; // hue colorspace
var hue_resolution_Y = 400; //750;; // hue colorspace

var hue_bg_resolution_X = 400;//800; //750; // hue colorspace
var hue_bg_resolution_Y = 400;//800; //750;; // hue colorspace

  var hs_resolution_X =  750; // Colorpicker
  var hs_resolution_Y = 750; // Colorpicker

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
var analyzeColorspaceModus = "rgb";

var tmpZIndex = 5;

////////// Canvas colorspaceCenter

var radiusratio = 0.95;
var labSpaceRectRange = 0.8;
var bigLineWidth = 4;//8;
var smallLineWidth = 2;//4;
var circleRadPicker = 40;
var circleRadColorPicker = 20;
var circleRad = 6;//8;
var bigcircleRad = 8;// 12;
var vBarWidth = 8;
var circleStrokeWidth = 5; //15
var alphaVal = 1.0;
var lineWidthVPlot = 2;
var arrowWidth = 15;

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

// colorspace eventes
var mouseAboveKeyID = -1;
var mouseGrappedKeyID = -1;
var mouseGrappedColorSide = -1;

//var updateCurrentValue = 0;
var mouseGrappedColor = "rgb(120,120,120)";

var spaceElementsXPos = [];
var spaceElementsYPos = [];
var spaceElementsType = [];
var spaceElementsKey = [];
var spaceElementsColor = [];

////////////////////////////////////////////////////////////////////////////////


///////////////////////////
/// Tutorial Page
//////////////////////////

var loadWebtoolImages = false;
var loadCMSImages = false;
var loadCreationImages = false;
var loadExportImages = false;
var loadAnalyzeImages = false;

////////////////////////////////////////////////////////////////////////////////


///////////////////////////
/// Analyze Compare
//////////////////////////

var plotType =0;
var doLogMartixPlot = false;

///////////////////////////
/// My List
//////////////////////////
var myListPageModus = 0; // 0=standart, 1=analysis, 2=compare

var selectFirstForCompare = false;

////////////////////////////////////////////////////////////////////////////////


///////////////////////////
/// Edit
//////////////////////////

var keyDivArray=[];
var selectedKey = 0;
var selectedColor = -1;
var editColor1;
var editColor2;
var colorpickerType="";
var  colorpickerData;
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
var folderThreeBand = "ThreeBand/";
var folderFourBand = "FourBand/";
var fileYellowColormaps = ["YellowOrange1.xml", "YellowOrange2.xml", "YellowOrange3.xml", "YellowOrange4.xml", "YellowOrange5.xml", "YellowOrange6.xml", "YellowOrange7.xml", "YellowOrange8.xml"];
var fileBlueColormaps = ["Blue1.xml", "Blue2.xml", "Blue3.xml", "Blue4.xml", "Blue5.xml", "Blue6.xml", "Blue7.xml", "Blue8.xml", "Blue9.xml", "Blue10.xml", "Blue11.xml",];
var fileRedPurpleColormaps = ["RedPurple1.xml", "RedPurple2.xml", "RedPurple3.xml", "RedPurple4.xml", "RedPurple5.xml", "RedPurple6.xml", "RedPurple7.xml", "RedPurple8.xml"];
var fileGreenColormaps = ["Green1.xml", "Green2.xml", "Green3.xml", "Green4.xml", "Green5.xml", "Green6.xml", "Green7.xml", "Green8.xml"];
var fileBrownColormaps = ["Brown1.xml", "Brown2.xml", "Brown3.xml", "Brown4.xml", "Brown5.xml", "Brown6.xml", "Brown7.xml", "Brown8.xml", "Brown9.xml"];
var fileDivergentColormaps = ["Blue_Orange.xml", "Green_Brown.xml", "Grey_Gold.xml", "Turqoise_Olive.xml"];
var fileThreeBandColormaps = ["brown_green_blue.xml", "brown_green_orangeRed.xml","yellowOrange_brown_blue.xml","blue_green_red.xml"];
var fileFourBandColormaps = ["1.xml", "2.xml", "3.xml", "4.xml", "5.xml"];

var existingColormapsAreDrawn=false;
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


var activColorIndex = 0;
var bandIndex = -1;
var creatorBandIsNew = true;
var newBandIsAdded = true;
var dragPredefinedBandIndex = -1;
var dragPredefinedBandType = -1;


// table expand button
var tableIsExpand = false;


///// Draw Colormap and keys
var refElementContainer = [];

// Key events
var keyRectPoint = [];
var keyRectPointSketch = [];
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

///////////////////////////
/// Band Editor
//////////////////////////
var tmpBandArray=[];
var createBandType = 1; // 0=constant, 1=scale, 2=double, 3=triple, 4=quadruple
var selectedBand=0;
var bandDivArray=[];
var bandCreatorOpen=false;
//////////////////////////
// predefined Bands
//////////////////////////
var constBands = [   new classColor_RGB(0,0,0),
                     new classColor_RGB(1,1,1),
                     new classColor_RGB(70/255,70/255,70/255),
                     new classColor_RGB(145/255,143/255,129/255),
                     new classColor_RGB(225/255,226/255,211/255),
                      new classColor_RGB(253/255,103/255,105/255),
                       new classColor_RGB(252/255,13/255,28/255),
                        new classColor_RGB(151/255,4/255,12/255),
                         new classColor_RGB(254/255,193/255,109/255),
                          new classColor_RGB(253/255,152/255,39/255),
                           new classColor_RGB(152/255,91/255,19/255),
                     new classColor_RGB(95/255,56/255,23/255),
                      new classColor_RGB(199/255,178/255,155/255),
                      new classColor_RGB(248/255,227/255,197/255),
                      new classColor_RGB(255/255,253/255,186/255),
                      new classColor_RGB(255/255,240/255,42/255),
                      new classColor_RGB(191/255,239/255,134/255),
                      new classColor_RGB(102/255,163/255,107/255),
                      new classColor_RGB(6/255,109/255,40/255),
                      new classColor_RGB(186/255,239/255,236/255),
                      new classColor_RGB(68/255,233/255,239/255),
                      new classColor_RGB(27/255,142/255,163/255),
                      new classColor_RGB(89/255,151/255,235/255),
                      new classColor_RGB(17/255,52/255,230/255),
                      new classColor_RGB(21/255,23/255,114/255),
                      new classColor_RGB(126/255,126/255,174/255),
                      new classColor_RGB(170/255,42/255,185/255),
                      new classColor_RGB(74/255,0/255,72/255)
               ];

var scaleBands = [
                  [ new classColor_RGB(1,1,1), new classColor_RGB(0, 0, 0)], // FROM HERE Constant
                  [ new classColor_RGB(1,1,1), new classColor_RGB(172/255, 148/255, 126/255)],
                  [ new classColor_RGB(247/255, 248/255, 190/255), new classColor_RGB(231/255, 143/255, 47/255)],
                  [ new classColor_RGB(1,1,1), new classColor_RGB(205/255, 90/255, 25/255)],
                  [ new classColor_RGB(253/255,112/255,71/255), new classColor_RGB(0, 0, 0)],
                  [ new classColor_RGB(252/255, 190/255, 134/255), new classColor_RGB(97/255, 0/255, 29/255)],
                  [ new classColor_RGB(95/255,198/255,116/255), new classColor_RGB(0, 0, 0)],
                  [ new classColor_RGB(1,1,1), new classColor_RGB(42/255, 93/255, 43/255)],
                  [ new classColor_RGB(171/255, 246/255, 134/255), new classColor_RGB(0, 64/255, 22/255)],
                  [ new classColor_RGB(70/255,116/255,229/255), new classColor_RGB(0, 0, 0)],
                  [ new classColor_RGB(1,1,1), new classColor_RGB(44/255, 72/255, 143/255)],
                  [ new classColor_RGB(36/255, 244/255, 252/255), new classColor_RGB(3/255, 34/255, 136/255)]
                ];

                bandIndex = scaleBands.length-1;

var doubleBands = [ [new classColor_RGB(199/255,189/255,173/255),new classColor_RGB(246/255,232/255,137/255),new classColor_RGB(246/255,232/255,137/255),new classColor_RGB(197/255,80/255,23/255)],
                   [new classColor_RGB(247/255,234/255,159/255),new classColor_RGB(197/255,103/255,54/255),new classColor_RGB(197/255,103/255,54/255),new classColor_RGB(151/255,47/255,44/255)],
                   [new classColor_RGB(115/255,111/255,99/255),new classColor_RGB(1,1,1),new classColor_RGB(1,1,1),new classColor_RGB(205/255,90/255,25/255)],
                   [new classColor_RGB(56/255,88/255,181/255),new classColor_RGB(247/255,234/255,159/255),new classColor_RGB(247/255,234/255,159/255),new classColor_RGB(151/255,47/255,44/255)],
                   [new classColor_RGB(39/255,64/255,125/255),new classColor_RGB(1,1,1),new classColor_RGB(1,1,1),new classColor_RGB(115/255,23/255,23/255)],
                   [new classColor_RGB(44/255,72/255,143/255),new classColor_RGB(111/255,189/255,230/255),new classColor_RGB(111/255,189/255,230/255),new classColor_RGB(1,1,1)],
                   [new classColor_RGB(42/255,93/255,43/255),new classColor_RGB(157/255,198/255,108/255),new classColor_RGB(157/255,198/255,108/255),new classColor_RGB(1,1,1)],
                   [new classColor_RGB(0, 0, 0),new classColor_RGB(109/255,105/255,93/255),new classColor_RGB(109/255,105/255,93/255),new classColor_RGB(1,1,1)],
                    [new classColor_RGB(1,1,1), new classColor_RGB(1,1,1), new classColor_RGB(0, 0, 0), new classColor_RGB(0, 0, 0)], // FROM HERE Constant
                   [new classColor_RGB(1,1,1), new classColor_RGB(1,1,1), new classColor_RGB(172/255, 148/255, 126/255), new classColor_RGB(172/255, 148/255, 126/255)],
                   [new classColor_RGB(1,1,1), new classColor_RGB(1,1,1), new classColor_RGB(205/255, 90/255, 25/255), new classColor_RGB(205/255, 90/255, 25/255)],
                   [new classColor_RGB(253/255,112/255,71/255), new classColor_RGB(253/255,112/255,71/255), new classColor_RGB(0, 0, 0), new classColor_RGB(0, 0, 0)],
                   [new classColor_RGB(95/255,198/255,116/255), new classColor_RGB(95/255,198/255,116/255), new classColor_RGB(0, 0, 0), new classColor_RGB(0, 0, 0)],
                   [new classColor_RGB(70/255,116/255,229/255), new classColor_RGB(70/255,116/255,229/255), new classColor_RGB(0, 0, 0), new classColor_RGB(0, 0, 0)],
                   [new classColor_RGB(1,1,1), new classColor_RGB(1,1,1), new classColor_RGB(42/255, 93/255, 43/255), new classColor_RGB(42/255, 93/255, 43/255)],
                   [new classColor_RGB(1,1,1), new classColor_RGB(1,1,1), new classColor_RGB(44/255, 72/255, 143/255), new classColor_RGB(44/255, 72/255, 143/255)]
                ]; // red white blue

var tribleBands = [[new classColor_RGB(1,1,1),new classColor_RGB(207/255,188/255,153/255),new classColor_RGB(207/255,188/255,153/255),new classColor_RGB(98/255,87/255,73/255),new classColor_RGB(98/255,87/255,73/255),new classColor_RGB(51/255,51/255,51/255)],
                 [new classColor_RGB(1,1,1),new classColor_RGB(239/255,188/255,153/255),new classColor_RGB(239/255,188/255,153/255),new classColor_RGB(154/255,34/255,25/255),new classColor_RGB(154/255,34/255,25/255),new classColor_RGB(59/255,52/255,48/255)],
                 [new classColor_RGB(164/255,73/255,22/255),new classColor_RGB(237/255,218/255,143/255),new classColor_RGB(237/255,218/255,143/255),new classColor_RGB(198/255,223/255,151/255),new classColor_RGB(198/255,223/255,151/255),new classColor_RGB(72/255,104/255,20/255)],
                 [new classColor_RGB(1,1,1),new classColor_RGB(1,254/255,177/255),new classColor_RGB(1,254/255,177/255),new classColor_RGB(152/255,241/255,145/255),new classColor_RGB(152/255,241/255,145/255),new classColor_RGB(38/255,188/255,147/255)],
                 [new classColor_RGB(56/255,88/255,181/255),new classColor_RGB(141/255,221/255,236/255),new classColor_RGB(141/255,221/255,236/255),new classColor_RGB(203/255,221/255,158/255),new classColor_RGB(203/255,221/255,158/255),new classColor_RGB(99/255,162/255,62/255)],
                 [new classColor_RGB(4/255,52/255,81/255),new classColor_RGB(141/255,221/255,236/255),new classColor_RGB(141/255,221/255,236/255),new classColor_RGB(154/255,221/255,116/255),new classColor_RGB(154/255,221/255,116/255),new classColor_RGB(62/255,83/255,15/255)],
                 [new classColor_RGB(184/255,231/255,199/255),new classColor_RGB(15/255,88/255,52/255),new classColor_RGB(15/255,88/255,52/255),new classColor_RGB(43/255,68/255,138/255),new classColor_RGB(43/255,68/255,138/255),new classColor_RGB(175/255,212/255,228/255)],
                 [new classColor_RGB(1,1,1),new classColor_RGB(254/255,221/255,152/255),new classColor_RGB(254/255,221/255,152/255),new classColor_RGB(96/255,68/255,50/255),new classColor_RGB(96/255,68/255,50/255),new classColor_RGB(0, 0, 0)],
                 [new classColor_RGB(199/255,189/255,173/255),new classColor_RGB(199/255,189/255,173/255),new classColor_RGB(246/255,232/255,137/255),new classColor_RGB(246/255,232/255,137/255),new classColor_RGB(197/255,80/255,23/255),new classColor_RGB(197/255,80/255,23/255)],// FROM HERE Constant
                   [new classColor_RGB(247/255,234/255,159/255),new classColor_RGB(247/255,234/255,159/255),new classColor_RGB(197/255,103/255,54/255),new classColor_RGB(197/255,103/255,54/255),new classColor_RGB(151/255,47/255,44/255),new classColor_RGB(151/255,47/255,44/255)],
                   [new classColor_RGB(115/255,111/255,99/255),new classColor_RGB(115/255,111/255,99/255),new classColor_RGB(1,1,1),new classColor_RGB(1,1,1),new classColor_RGB(205/255,90/255,25/255),new classColor_RGB(205/255,90/255,25/255)],
                   [new classColor_RGB(56/255,88/255,181/255),new classColor_RGB(56/255,88/255,181/255),new classColor_RGB(247/255,234/255,159/255),new classColor_RGB(247/255,234/255,159/255),new classColor_RGB(151/255,47/255,44/255),new classColor_RGB(151/255,47/255,44/255)],
                   [new classColor_RGB(39/255,64/255,125/255),new classColor_RGB(39/255,64/255,125/255),new classColor_RGB(1,1,1),new classColor_RGB(1,1,1),new classColor_RGB(115/255,23/255,23/255),new classColor_RGB(115/255,23/255,23/255)],
                   [new classColor_RGB(44/255,72/255,143/255),new classColor_RGB(44/255,72/255,143/255),new classColor_RGB(111/255,189/255,230/255),new classColor_RGB(111/255,189/255,230/255),new classColor_RGB(1,1,1),new classColor_RGB(1,1,1)],
                   [new classColor_RGB(42/255,93/255,43/255),new classColor_RGB(42/255,93/255,43/255),new classColor_RGB(157/255,198/255,108/255),new classColor_RGB(157/255,198/255,108/255),new classColor_RGB(1,1,1),new classColor_RGB(1,1,1)],
                   [new classColor_RGB(0, 0, 0),new classColor_RGB(0, 0, 0),new classColor_RGB(109/255,105/255,93/255),new classColor_RGB(109/255,105/255,93/255),new classColor_RGB(1,1,1),new classColor_RGB(1,1,1)]
                  ];

var quadBands = [ [new classColor_RGB(1,1,1),new classColor_RGB(254/255,213/255,131/255),new classColor_RGB(254/255,213/255,131/255),new classColor_RGB(239/255,60/255,47/255),new classColor_RGB(239/255,60/255,47/255),new classColor_RGB(111/255,79/255,58/255),new classColor_RGB(111/255,79/255,58/255),new classColor_RGB(0,0,0)],
                  [new classColor_RGB(255/255,252/255,216/255),new classColor_RGB(180/255,157/255,121/255),new classColor_RGB(180/255,157/255,121/255),new classColor_RGB(177/255,118/255,73/255),new classColor_RGB(177/255,118/255,73/255),new classColor_RGB(161/255,62/255,31/255),new classColor_RGB(161/255,62/255,31/255),new classColor_RGB(86/255,12/255,8/255)],
                  [new classColor_RGB(164/255,70/255,17/255),new classColor_RGB(236/255,174/255,75/255),new classColor_RGB(236/255,174/255,75/255),new classColor_RGB(224/255,219/255,143/255),new classColor_RGB(224/255,219/255,143/255),new classColor_RGB(161/255,208/255,81/255),new classColor_RGB(161/255,208/255,81/255),new classColor_RGB(64/255,116/255,22/255)],
                  [new classColor_RGB(196/255,254/255,231/255),new classColor_RGB(34/255,49/255,108/255),new classColor_RGB(34/255,49/255,108/255),new classColor_RGB(0,0,0),new classColor_RGB(0,0,0),new classColor_RGB(171/255,29/255,21/255),new classColor_RGB(171/255,29/255,21/255),new classColor_RGB(254/255,216/255,168/255)],
                  [new classColor_RGB(1,1,1),new classColor_RGB(218/255,254/255,167/255),new classColor_RGB(218/255,254/255,167/255),new classColor_RGB(129/255,231/255,162/255),new classColor_RGB(129/255,231/255,162/255),new classColor_RGB(49/255,165/255,149/255),new classColor_RGB(49/255,165/255,149/255),new classColor_RGB(39/255,96/255,156/255)],
                  [new classColor_RGB(30/255,52/255,115/255),new classColor_RGB(118/255,188/255,218/255),new classColor_RGB(118/255,188/255,218/255),new classColor_RGB(1,1,1),new classColor_RGB(1,1,1),new classColor_RGB(121/255,185/255,110/255),new classColor_RGB(121/255,185/255,110/255),new classColor_RGB(30/255,86/255,28/255)],
                  [new classColor_RGB(1,1,1),new classColor_RGB(245/255,242/255,146/255),new classColor_RGB(245/255,242/255,146/255),new classColor_RGB(148/255,183/255,83/255),new classColor_RGB(148/255,183/255,83/255),new classColor_RGB(57/255,121/255,38/255),new classColor_RGB(57/255,121/255,38/255),new classColor_RGB(5/255,60/255,11/255)],
                  [new classColor_RGB(223/255,230/255,240/255),new classColor_RGB(127/255,131/255,137/255),new classColor_RGB(127/255,131/255,137/255),new classColor_RGB(0,0,0),new classColor_RGB(0,0,0),new classColor_RGB(183/255,132/255,79/255),new classColor_RGB(183/255,132/255,79/255),new classColor_RGB(229/255,213/255,200/255)],
                  [new classColor_RGB(1,1,1),new classColor_RGB(1,1,1),new classColor_RGB(207/255,188/255,153/255),new classColor_RGB(207/255,188/255,153/255),new classColor_RGB(98/255,87/255,73/255),new classColor_RGB(98/255,87/255,73/255),new classColor_RGB(51/255,51/255,51/255),new classColor_RGB(51/255,51/255,51/255)], // constant
                 [new classColor_RGB(1,1,1),new classColor_RGB(1,1,1),new classColor_RGB(239/255,188/255,153/255),new classColor_RGB(239/255,188/255,153/255),new classColor_RGB(154/255,34/255,25/255),new classColor_RGB(154/255,34/255,25/255),new classColor_RGB(59/255,52/255,48/255),new classColor_RGB(59/255,52/255,48/255)],
                 [new classColor_RGB(164/255,73/255,22/255),new classColor_RGB(164/255,73/255,22/255),new classColor_RGB(237/255,218/255,143/255),new classColor_RGB(237/255,218/255,143/255),new classColor_RGB(198/255,223/255,151/255),new classColor_RGB(198/255,223/255,151/255),new classColor_RGB(72/255,104/255,20/255),new classColor_RGB(72/255,104/255,20/255)],
                 [new classColor_RGB(1,1,1),new classColor_RGB(1,1,1),new classColor_RGB(1,254/255,177/255),new classColor_RGB(1,254/255,177/255),new classColor_RGB(152/255,241/255,145/255),new classColor_RGB(152/255,241/255,145/255),new classColor_RGB(38/255,188/255,147/255),new classColor_RGB(38/255,188/255,147/255)],
                 [new classColor_RGB(56/255,88/255,181/255),new classColor_RGB(56/255,88/255,181/255),new classColor_RGB(141/255,221/255,236/255),new classColor_RGB(141/255,221/255,236/255),new classColor_RGB(203/255,221/255,158/255),new classColor_RGB(203/255,221/255,158/255),new classColor_RGB(99/255,162/255,62/255),new classColor_RGB(99/255,162/255,62/255)],
                 [new classColor_RGB(4/255,52/255,81/255),new classColor_RGB(4/255,52/255,81/255),new classColor_RGB(141/255,221/255,236/255),new classColor_RGB(141/255,221/255,236/255),new classColor_RGB(154/255,221/255,116/255),new classColor_RGB(154/255,221/255,116/255),new classColor_RGB(62/255,83/255,15/255),new classColor_RGB(62/255,83/255,15/255)],
                 [new classColor_RGB(184/255,231/255,199/255),new classColor_RGB(184/255,231/255,199/255),new classColor_RGB(15/255,88/255,52/255),new classColor_RGB(15/255,88/255,52/255),new classColor_RGB(43/255,68/255,138/255),new classColor_RGB(43/255,68/255,138/255),new classColor_RGB(175/255,212/255,228/255),new classColor_RGB(175/255,212/255,228/255)],
                 [new classColor_RGB(1,1,1),new classColor_RGB(1,1,1),new classColor_RGB(254/255,221/255,152/255),new classColor_RGB(254/255,221/255,152/255),new classColor_RGB(96/255,68/255,50/255),new classColor_RGB(96/255,68/255,50/255),new classColor_RGB(0, 0, 0),new classColor_RGB(0, 0, 0)]
                ];


////////////////////////////////////////////////////////////////////////////////


///////////////////////////
/// Export
//////////////////////////
var doMerging = true;
var exportColorspace = "rgb";
var outputFormat = 1; // 0=lookup, 1=xml, 2=json
////////////////////////////////////////////////////////////////////////////////
