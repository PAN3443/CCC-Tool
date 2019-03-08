

function jumpTest_startWorker(options) {
  jumpTest_JSON(options, true)
  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');
  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);
}

function jumpTest_JSON(options, createGlobalField) {

  var nDim = ((options[1].length) * 2) + 1; // oldJump Image: (stepArray.length-1)*2+1; // nDim-1 = number of cells in x direction
  var mDim = options[1].length+1; // oldJump Image: stepArray.length+1; // mDim-1 = number of cells in y direction

  //var newWorker;
  if(createGlobalField)
  userTestGlobalField = new class_TestField(nDim, mDim);

  testField_WorkerJSON.originIsRelevant = false;
  testField_WorkerJSON.testFieldType = "JUMP";
  testField_WorkerJSON.testFieldDimX = nDim;
  testField_WorkerJSON.testFieldDimY = mDim;
  testField_WorkerJSON.testFieldVar_a =  options[1];
  testField_WorkerJSON.testFieldVar_b =  options[0];

}
