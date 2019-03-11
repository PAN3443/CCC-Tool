


function ridgeValleyTest_JSON(options, createGlobalField){

  if(createGlobalField){
    userTestGlobalField = new class_TestField(options[7], options[8]);
    testField_WorkerJSON.testFieldDimX = options[7];
    testField_WorkerJSON.testFieldDimY = options[8];
  }
  else {
    testField_WorkerJSON.testFieldDimX = 50;
    testField_WorkerJSON.testFieldDimY = 50;
  }

  testField_WorkerJSON.originIsRelevant = false;
  testField_WorkerJSON.testFieldType = "Valley";

  if(options[0]){
    var start= globalCMS1.getRefPosition(0);
    var end= globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);
    var dis = end-start;
    testField_WorkerJSON.testFieldVar_a = start+options[1]*dis;
    testField_WorkerJSON.testFieldVar_b = start+options[2]*dis;
  }
  else {
    testField_WorkerJSON.testFieldVar_a = options[1];
    testField_WorkerJSON.testFieldVar_b = options[2];
  }

  testField_WorkerJSON.testFieldVar_c = options[3];
  testField_WorkerJSON.testFieldVar_d = options[5];
  testField_WorkerJSON.testFieldVar_e = options[4];
  testField_WorkerJSON.testFieldVar_f = options[6];
  testField_WorkerJSON.onlyGrey = false;

}

function valleyTest_startWorker(options) {

  ridgeValleyTest_JSON(options, true);

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}
