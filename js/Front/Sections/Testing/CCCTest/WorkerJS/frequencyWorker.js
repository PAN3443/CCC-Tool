function frequency_startWorker(options) {

  //cccTest_Frequency_Options//

  userTestGlobalField = new class_TestField(100, 100);



  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "Frequency";

  testField_WorkerJSON.testFieldDimX = 100;
  testField_WorkerJSON.testFieldDimY = 100;
  testField_WorkerJSON.testFieldVar_f = options[0]; // ratio
  testField_WorkerJSON.testFieldVar_a = options[1]; // sin or cos
  testField_WorkerJSON.testFieldVar_b = options[2]; // Start Frequency
  testField_WorkerJSON.testFieldVar_c = options[3]; // Doublings
  testField_WorkerJSON.testFieldVar_d = options[4]; // Range Start
  testField_WorkerJSON.testFieldVar_e = options[5]; // Range End
  testField_WorkerJSON.onlyGrey = false;


  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}
