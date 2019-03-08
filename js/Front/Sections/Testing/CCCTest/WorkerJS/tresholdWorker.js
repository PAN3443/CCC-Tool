function treshold_startWorker(options) {

  userTestGlobalField = new class_TestField(options[6], options[7]);

  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "Treshold";
  testField_WorkerJSON.testFieldDimX = options[6];
  testField_WorkerJSON.testFieldDimY = options[7];
  testField_WorkerJSON.testFieldVar_a = options[0]; // ratio or not
  testField_WorkerJSON.testFieldVar_b = options[1]; // type
  testField_WorkerJSON.testFieldVar_c = options[2]; // exp
  testField_WorkerJSON.testFieldVar_d = options[3]; // min
  testField_WorkerJSON.testFieldVar_e = options[4]; // treshold
  testField_WorkerJSON.testFieldVar_f = options[5]; // max
  testField_WorkerJSON.onlyGrey = false;

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);
}
