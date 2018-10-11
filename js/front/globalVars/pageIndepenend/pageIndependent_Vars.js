///////////////////////////
/// GLOBAL
//////////////////////////

///
var userID = "";
var anonymousMode = true;
var globalCMS1;
var refLineSketchContainer = [];
var numDecimalPlaces=2;

var styleActiveColor = "rgba(76, 175, 80,0.7)";

/// Switch Pages
var currentPageID = 0;
var pageIsLoaded=false;

// Interpolation colorspace
//var colorspaceModus="lab";




// Draw Reference Information
var refElementContainer = [];



//////////////////////////
///// Colorspace VIS

var labSpaceRange = 128;
//var din99SpaceRange = 156;

var lineWidth3D = 3;

var rangeA99Neg = -155;
var rangeA99Pos = 105;
var rangeA99;

var rangeB99Neg = -83;
var rangeB99Pos = 155;
var rangeB99;


//////////////////////////
///// Pop Up WINDOWS

// color Picker
var circleRadColorPicker = 20;
var circleStrokeWidth = 5; //15

// Ast Window
var askType = 0;
