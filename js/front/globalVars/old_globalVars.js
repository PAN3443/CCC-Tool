
//////////////////////////////////////////


var showSideID = -1; // 0 = myList; 1=CreateSide, 2=Analyse
var initPageType = -1;
var somethingChanged = false;

var styleActiveColor2 = "rgb(0,191,255)";
var styleActiveColor = "rgba(0,191,255,0.7)";
//"rgba(169,169,169,0.3)";//"rgb(65,105,225)";
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


var intervalDelta = 1;

/*var createColormap;
var exportColormap;
var analysisColormap;
var compareColormap1;
var compareColormap2;*/

/*var interactionIntervalSize = 200;//50;*/

var intervalMode = 0; // 0 = global, 1=sectional, 2=sectional color difference depenting
var intervalSize = 200;
var doNoMerge = false;

//
var numDecimalPlaces = 2;



// Resolutions



// using colormap
var colorspaceModus = "rgb"; // 0=rgb,1=hsv,2=lab,3=din99
var analyzeColorspaceModus = "rgb";

var tmpZIndex = 5;

////////// Canvas colorspaceCenter


var labSpaceRectRange = 0.8;
var bigLineWidth = 4;//8;
var smallLineWidth = 2;//4;
var circleRadPicker = 40;

var circleRad = 6;//8;
var bigcircleRad = 8;// 12;
var vBarWidth = 8;


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

var dropRects = [];
var bandSketchObjLength = 200;//100;

// table expand button
var tableIsExpand = false;


///// Draw Colormap and keys
var refElementContainer = [];

// Key events
var keyRectPoint = [];
var keyRectPointSketch = [];
var colorrectHeigth = 0;
var colorrectWitdh = 0;


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
// ask Window
//////////////////////////
var askIndex=0;
var askType=0;


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



//////////////////////////
// Probe
//////////////////////////
var customRangeInputIsOkay=false;

////////////////////////////////////////////////////////////////////////////////


///////////////////////////
/// Export
//////////////////////////
//var doMerging = true;
var exportColorspace = "rgb";
var outputFormat = 1; // 0=lookup, 1=xml, 2=json
////////////////////////////////////////////////////////////////////////////////
