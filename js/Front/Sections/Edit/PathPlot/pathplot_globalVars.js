//////////////////////////
///// Colorspace VIS

//////////////////////////////////////
var labSpaceRange = 128;
//var din99SpaceRange = 156;

var lineWidth3D = 3;

var rangeA99Neg = -155;
var rangeA99Pos = 105;
var rangeA99;

var rangeB99Neg = -83;
var rangeB99Pos = 155;
var rangeB99;

var pathplotLines = [];
var pathplotLinesDashed = [];

var pathplotElementPositions = [];

var framesPerSecond = 10;
var animationIntervalPathPlot = 1000/framesPerSecond;
