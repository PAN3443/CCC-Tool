function littlebit_startWorker(options) {

  littleBitTest_JSON(options, true);

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}


function littleBitTest_JSON(options, createGlobalField){

  
  var numberOfAreas = littleBit_NumberOfSinks+littleBit_NumberOfSinks+1;

  var xDim = undefined;
  var yDim = undefined;
  if(createGlobalField){
    xDim = numberOfAreas*options[3];
    yDim = numberOfAreas*options[3];
    userTestGlobalField = new class_TestField(xDim, yDim);
  }
  else {
    xDim = numberOfAreas*5;
    yDim = numberOfAreas*5;
  }

  testField_WorkerJSON.testFieldDimX = xDim;
  testField_WorkerJSON.testFieldDimY = yDim;

  testField_WorkerJSON.originIsRelevant = false;
  testField_WorkerJSON.testFieldType = "LittleBit";

  testField_WorkerJSON.testFieldVar_a = options[0]; // ratio or not
  testField_WorkerJSON.testFieldVar_b = options[1]; // max little
  testField_WorkerJSON.testFieldVar_c = options[2]; // min little
  testField_WorkerJSON.testFieldVar_d = options[3]; // pixel per area
  testField_WorkerJSON.testFieldVar_e =littleBit_NumberOfSinks;
  testField_WorkerJSON.onlyGrey = false;

}
