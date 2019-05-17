function treshold_startWorker(options) {

  tresholdTest_JSON(options, true);

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);
}


function tresholdTest_JSON(options, createGlobalField){


  

  if(createGlobalField){
    userTestGlobalField = new class_TestField(options[6], options[7]);
    testField_WorkerJSON.testFieldDimX = options[6];
    testField_WorkerJSON.testFieldDimY = options[7];
  }
  else {
    testField_WorkerJSON.testFieldDimX = 50;
    testField_WorkerJSON.testFieldDimY = 50;
  }

  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "Treshold";

  testField_WorkerJSON.testFieldVar_a = options[0]; // ratio or not
  testField_WorkerJSON.testFieldVar_b = options[1]; // type
  testField_WorkerJSON.testFieldVar_c = options[2]; // exp
  testField_WorkerJSON.testFieldVar_d = options[3]; // min
  testField_WorkerJSON.testFieldVar_e = options[4]; // treshold
  testField_WorkerJSON.testFieldVar_f = options[5]; // max

}
