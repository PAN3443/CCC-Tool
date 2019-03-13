function topology_startWorker(options) {

  var check = topologyTest_JSON(options, true);

  if(!check)
    return;

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);
}


function topologyTest_JSON(options, createGlobalField){

  createTopologyField(options);

  if(topologyField.length<1)
    return false;

  if(topologyField[0].length<1)
    return false;

  if(createGlobalField){
    userTestGlobalField = new class_TestField(topologyField.length,topologyField[0].length);
  }


  testField_WorkerJSON.testFieldDimX = topologyField.length;
  testField_WorkerJSON.testFieldDimY = topologyField[0].length;

  testField_WorkerJSON.testFieldType = "Topology";

  testField_WorkerJSON.testFieldVar_a = topologyField;

    return true;

}
