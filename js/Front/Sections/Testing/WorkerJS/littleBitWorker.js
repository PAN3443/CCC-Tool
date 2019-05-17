function littlebit_startWorker(options) {

  littleBitTest_JSON(options, true);

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}


function littleBitTest_JSON(options, createGlobalField){

  var numberOfAreas = options[6]+options[6]+1;
  var xDim = undefined;
  var yDim = undefined;
  if(createGlobalField){
    xDim = numberOfAreas*options[5];
    yDim = options[7];
    userTestGlobalField = new class_TestField(xDim, yDim);
  }
  else {
    xDim = numberOfAreas*3;
    yDim = 50;
  }

  testField_WorkerJSON.testFieldDimX = xDim;
  testField_WorkerJSON.testFieldDimY = yDim;

  testField_WorkerJSON.originIsRelevant = false;
  testField_WorkerJSON.testFieldType = "LittleBit";

  testField_WorkerJSON.testFieldVar_a = options[0]; // ratio or not
  testField_WorkerJSON.testFieldVar_b = options[3]; // start little
  testField_WorkerJSON.testFieldVar_c = options[4]; // end little
  testField_WorkerJSON.testFieldVar_d = options[5]; // pixel per area
  testField_WorkerJSON.testFieldVar_e = options[6]; // pixel per area
  testField_WorkerJSON.testFieldVar_f = options[1];
  testField_WorkerJSON.testFieldVar_g = options[2];
  testField_WorkerJSON.onlyGrey = false;

}
