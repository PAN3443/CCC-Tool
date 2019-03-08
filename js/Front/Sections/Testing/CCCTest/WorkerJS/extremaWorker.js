function extremaTest_startWorker(options) {

  //var newWorker;
  userTestGlobalField = new class_TestField(options[4], options[5]);

  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "Extrema";
  testField_WorkerJSON.testFieldIndex = jumpWorkers_Array.length;

  testField_WorkerJSON.testFieldDimX = options[4];
  testField_WorkerJSON.testFieldDimY = options[5];

  testField_WorkerJSON.testFieldVar_a = options[0]; // a
  testField_WorkerJSON.testFieldVar_b = options[1]; // b
  testField_WorkerJSON.testFieldVar_c = options[2]; //m
  testField_WorkerJSON.testFieldVar_d = options[3]; // auto sclae

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);
  testField_WorkerJSON.onlyGrey = false;

}
