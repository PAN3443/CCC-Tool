

var drawBackgroundWorker1 = new Worker("js/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotBackground.js");
var drawBackgroundWorker2 = new Worker("js/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotBackground.js");
var drawBackgroundWorker3 = new Worker("js/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotBackground.js");
var drawBackgroundWorker4 = new Worker("js/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotBackground.js");

var drawInterpolationLineWorker1 = new Worker("js/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotInterpolationLine.js");
var drawInterpolationLineWorker2 = new Worker("js/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotInterpolationLine.js");
var drawInterpolationLineWorker3 = new Worker("js/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotInterpolationLine.js");
var drawInterpolationLineWorker4 = new Worker("js/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotInterpolationLine.js");

var testpreviewWorker_CCCTest = new Worker("js/Front/Worker/workerFiles/Testing/worker_PreviewTesting.js");
var testpreviewWorker_Collection = new Worker("js/Front/Worker/workerFiles/Testing/worker_PreviewTesting.js");
var testpreviewWorker_RealWorldData = new Worker("js/Front/Worker/workerFiles/Testing/worker_PreviewTesting.js");

var testfunctionWorker = new Worker("js/Front/Worker/workerFiles/Testing/worker_SingleTesting.js");
