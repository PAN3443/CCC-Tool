




function inform_Worker_Tensorfield(worker){
  var workerJSON = {};
  workerJSON['message'] = "calcTensorField";
  workerJSON['reportOptions_ColorDif'] = reportOptions_ColorDif;
  worker.postMessage(workerJSON);//*/
}

function inform_Worker_CalcReport(worker){
  var workerJSON = {};
  workerJSON['message'] = "calcReport";
  worker.postMessage(workerJSON);//*/
}









function inform_Worker_PathPlotBackgroundParams(){

    if(!browserCanWorker)
      return;

    var workerJSON = {};
    workerJSON['message'] = "general_parameter";
    workerJSON['labSpaceRange'] = labSpaceRange;
    workerJSON['rangeA99Neg'] = rangeA99Neg;
    workerJSON['rangeA99Pos'] = rangeA99Pos;
    workerJSON['rangeB99Neg'] = rangeB99Neg;
    workerJSON['rangeB99Pos'] = rangeB99Pos;

    drawBackgroundWorker1.postMessage(workerJSON);
    drawBackgroundWorker2.postMessage(workerJSON);
    drawBackgroundWorker3.postMessage(workerJSON);
    drawBackgroundWorker4.postMessage(workerJSON);

    drawInterpolationLineWorker1.postMessage(workerJSON);
    drawInterpolationLineWorker2.postMessage(workerJSON);
    drawInterpolationLineWorker3.postMessage(workerJSON);
    drawInterpolationLineWorker4.postMessage(workerJSON);

}
