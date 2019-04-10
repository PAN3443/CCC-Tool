//////////////////////////
///// Colorspace VIS

var drawBackgroundWorker1 = new Worker("js/Front/Worker/PathPlot/offscreenWorker_DrawPathPlotBackground.js");
var drawBackgroundWorker2 = new Worker("js/Front/Worker/PathPlot/offscreenWorker_DrawPathPlotBackground.js");
var drawBackgroundWorker3 = new Worker("js/Front/Worker/PathPlot/offscreenWorker_DrawPathPlotBackground.js");
var drawBackgroundWorker4 = new Worker("js/Front/Worker/PathPlot/offscreenWorker_DrawPathPlotBackground.js");

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
