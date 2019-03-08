function littlebit_startWorker(options) {

  var numberOfSinks = 10;
  var numberOfAreas = numberOfSinks+numberOfSinks+1;
  var xDim = numberOfAreas*options[3];
  var yDim = numberOfAreas*options[3];
  userTestGlobalField = new class_TestField(xDim, yDim);

  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "LittleBit";

  testField_WorkerJSON.testFieldDimX = xDim;
  testField_WorkerJSON.testFieldDimY = yDim;
  testField_WorkerJSON.testFieldVar_a = options[0]; // ratio or not
  testField_WorkerJSON.testFieldVar_b = options[1]; // max little
  testField_WorkerJSON.testFieldVar_c = options[2]; // min little
  testField_WorkerJSON.testFieldVar_d = options[3]; // pixel per area
  testField_WorkerJSON.testFieldVar_e =numberOfSinks;
  testField_WorkerJSON.onlyGrey = false;


  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}
