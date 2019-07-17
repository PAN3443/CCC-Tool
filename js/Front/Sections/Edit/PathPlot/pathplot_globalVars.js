//////////////////////////
///// Colorspace VIS

//////////////////////////////////////
var labSpaceRange = 128;
//var din99SpaceRange = 156;

var lineWidth3D = 3;

var rangeA99Neg = -50;//-155;
var rangeA99Pos = 50;//105;
var rangeA99 = rangeA99Pos - rangeA99Neg;

var rangeB99Neg = -50;//-83;
var rangeB99Pos = 50;//155;
var rangeB99 = rangeB99Pos - rangeB99Neg;

var pathplotLines = [];
var pathplotLinesDashed = [];
var pathplotLinesVPlot=[];

var pathplotElementPositions = [];
var vPlotElementPositions=[];

var framesPerSecond = 10;
var animationIntervalPathPlot = 1000/framesPerSecond;

var pathPlotResolution = 500;
var vPlotHeight = 200;
var vPlotWidth = 600;

var vPlotyStart = Math.round(vPlotHeight * 0.9);
var vPlotyEnd = Math.round(vPlotHeight * 0.1);
var vPlotxStart = Math.round(vPlotWidth * 0.1);
var vPlotxEnd = Math.round(vPlotWidth * 0.85);
var heigthVArea = vPlotyStart - vPlotyEnd;
var plotwidth = vPlotxEnd - vPlotxStart;
