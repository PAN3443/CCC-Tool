function realData_startWorker(type,index) {

  var check = realWorldTest_JSON(type,index, true);

  if(!check)
    return;


  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);
}


function realWorldTest_JSON(type,index, createGlobalField){

  switch (type) {
    case "medical":
        if(medicalData[index]==undefined)
          return;
        testField_WorkerJSON.testFieldVar_a = medicalData[index];
      break;
    case "scientificFlowSim":
        if(scientificFlowSimData[index]==undefined)
          return;
        testField_WorkerJSON.testFieldVar_a = scientificFlowSimData[index];
      break;
      case "photographs":
        if(photographsData[index]==undefined)
          return;
        testField_WorkerJSON.testFieldVar_a = photographsData[index];
        break;
    default:
      return false;
  }

  if(testField_WorkerJSON.testFieldVar_a.length<1 || testField_WorkerJSON.testFieldVar_a.length==undefined)
    return false;

  if(testField_WorkerJSON.testFieldVar_a[0].length<1 || testField_WorkerJSON.testFieldVar_a[0].length==undefined)
    return false;

  if(createGlobalField){
    userTestGlobalField = new class_TestField(testField_WorkerJSON.testFieldVar_a.length,testField_WorkerJSON.testFieldVar_a[0].length);
  }

  testField_WorkerJSON.testFieldDimX = testField_WorkerJSON.testFieldVar_a.length;
  testField_WorkerJSON.testFieldDimY = testField_WorkerJSON.testFieldVar_a[0].length;

  testField_WorkerJSON.testFieldType = "RealWorldData";

  return true;

}
