
function frequencyTest_JSON(options, createGlobalField){

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
  testField_WorkerJSON.testFieldType = "Frequency";

  testField_WorkerJSON.testFieldVar_f = options[0]; // ratio
  testField_WorkerJSON.testFieldVar_a = options[1]; // sin or cos
  testField_WorkerJSON.testFieldVar_b = options[2]; // Start Frequency
  testField_WorkerJSON.testFieldVar_c = options[3]; // Doublings
  testField_WorkerJSON.testFieldVar_d = options[4]; // Range Start
  testField_WorkerJSON.testFieldVar_e = options[5]; // Range End

}

function frequency_startWorker(options) {

  //cccTest_Frequency_Options//

  frequencyTest_JSON(options, true);

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}
