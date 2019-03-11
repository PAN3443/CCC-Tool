function fct_Worker(options){
  fct_JSON(options,true);

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);

  usertestWorkerfinished = false;
  usertestWorker.postMessage(testField_WorkerJSON);
}

function fct_JSON(options,createGlobalField) {

  testField_WorkerJSON.testFieldType = "FCT";
  testField_WorkerJSON.testFieldGenerationType = options[1];
  testField_WorkerJSON.functionDim = options[2];


  if(createGlobalField){
    userTestGlobalField = new class_TestField(options[3], options[4]);
    testField_WorkerJSON.testFieldDimX = options[3];
    testField_WorkerJSON.testFieldDimY = options[4];
  }
  else {
    testField_WorkerJSON.testFieldDimX = 50;
    testField_WorkerJSON.testFieldDimY = 50;
  }


  if(options.length>5)
  testField_WorkerJSON.testFieldVar_a = options[5];

  if(options.length>6)
  testField_WorkerJSON.testFieldVar_b = options[6];

  if(options.length>7)
  testField_WorkerJSON.testFieldVar_c = options[7];

}
