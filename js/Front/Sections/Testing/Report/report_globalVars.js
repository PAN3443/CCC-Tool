/////////////////////////////////////////////////////////////////////////////
/////// Report //////////////////////////////////////////////////////////////
var reportModus = 0;
var reportColorValueDifColormap = new class_CMS();
var hasDrawnReportCMS = false;

var markpixelColor = 255;
var doPixelMarking = true;

var reportOptions_ColorDif = 2; // 0=eu.Lab, 1=de94, 2=de2000, 3=din99
var reportListTestInfo = [];
var reportListTestField = [];

var zoomStatus = 100;
var maximalZoomBar = 500;

var fixPixelPreview = false;
var pixelPreviewX = 0;
var pixelPreviewY = 0;
