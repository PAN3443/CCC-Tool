

var drawBackgroundWorker1 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotBackground.js", { type: "module" });
var drawBackgroundWorker2 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotBackground.js", { type: "module" });
var drawBackgroundWorker3 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotBackground.js", { type: "module" });
var drawBackgroundWorker4 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotBackground.js", { type: "module" });

var drawInterpolationLineWorker1 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotInterpolationLine.js", { type: "module" });
var drawInterpolationLineWorker2 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotInterpolationLine.js", { type: "module" });
var drawInterpolationLineWorker3 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotInterpolationLine.js", { type: "module" });
var drawInterpolationLineWorker4 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/PathPlot/worker_DrawPathPlotInterpolationLine.js", { type: "module" });

var testpreviewWorker_CCCTest = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/Testing/worker_PreviewTesting.js", { type: "module" });
var testpreviewWorker_Collection = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/Testing/worker_PreviewTesting.js", { type: "module" });
var testpreviewWorker_RealWorldData = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/Testing/worker_PreviewTesting.js", { type: "module" });

var testfunctionWorker_InteractiveTest = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/Testing/worker_SingleTesting.js", { type: "module" });


var testfunctionWorker_Report0 = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/Testing/worker_ReportTesting.js", { type: "module" });

var metricInterpolationWorker = new Worker(version_JS_FolderName+"/Front/Worker/workerFiles/MetricInterpolation/worker_MetricInterpolation.js", { type: "module" });
