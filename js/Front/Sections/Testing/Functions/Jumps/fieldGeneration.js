
function startJumpFieldGeneration(){


  document.getElementById("id_TestJump_Status").style.width = "0%";
  document.getElementById("id_TestJump_Check").style.visibility = "hidden";


    // delete fields
    jumpTestFields_Array=[];
    jumpTestFields_Names=[];
    jumpWorkers_Array=[];
    jumpWorkerStatus_Array=[];

    allJumpsFinished=false;
    allJumpWorkersFinished=false;

    // generate fields
    jumpWorkerStatus_Array.push(0,0,0,0,0);
    jumpTestFields_Names.push("Jump Upstairs Dim=2","Jump Upstairs Dim=10","Jump Upstairs Dim=100","Jump Upstairs Dim=600","Jump Upstairs Dim=1200");
    jump_upstairs(2,  0);
    jump_upstairs(10, 0);
    jump_upstairs(100, 0);
    jump_upstairs(600, 0);
    jump_upstairs(1200, 0);



}


function jump_upstairs(n, type){

  var newWorker;
  var globalTestField = new class_TestField(n,n);
  jumpTestFields_Array.push(globalTestField);

  testField_WorkerJSON.testFieldType = 0;
  testField_WorkerJSON.testFieldGenerationType = type;
  testField_WorkerJSON.testFieldIndex = jumpWorkers_Array.length;

  testField_WorkerJSON.testFieldDimX = n;
  testField_WorkerJSON.testFieldDimY = n;

  jumpWorkers_Array.push(newWorker);

  mappingWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');
  mappingWorker.addEventListener('message', workerEvent_JumpTestField, false);

  // seperate start of Worker
  allWorkerFinished=false;

  mappingWorker.postMessage(testField_WorkerJSON);


}
