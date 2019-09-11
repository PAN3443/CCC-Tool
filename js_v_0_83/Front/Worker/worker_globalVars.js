

var drawBackgroundWorker1 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotBackground.js");
var drawBackgroundWorker2 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotBackground.js");
var drawBackgroundWorker3 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotBackground.js");
var drawBackgroundWorker4 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotBackground.js");

var drawInterpolationLineWorker1 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotInterpolationLine.js");
var drawInterpolationLineWorker2 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotInterpolationLine.js");
var drawInterpolationLineWorker3 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotInterpolationLine.js");
var drawInterpolationLineWorker4 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotInterpolationLine.js");

var testpreviewWorker_CCCTest = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/Testing/worker_PreviewTesting.js");
var testpreviewWorker_Collection = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/Testing/worker_PreviewTesting.js");
var testpreviewWorker_RealWorldData = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/Testing/worker_PreviewTesting.js");

var testfunctionWorker_InteractiveTest = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/Testing/worker_SingleTesting.js");


var testfunctionWorker_Report0 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/Testing/worker_ReportTesting.js");
