
function startJumpFieldGeneration(){

    document.getElementById("id_TestJump_Status").style.width = "0%";
    document.getElementById("id_TestJump_Check").style.visibility = "hidden";

    allJumpsFinished=false;
    allJumpWorkersFinished=false;

    // delete fields
    jumpTestFields_Array=[];
    jumpTestFields_Names=[];
    jumpWorkers_Array=[];
    jumpWorkerStatus_Array=[];

    if(useCMSRangeForJumpFields){
      testField_WorkerJSON.testFieldRangeStart = globalCMS1.getRefPosition(0);
      testField_WorkerJSON.testFieldRangeEnd = globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);
    }
    else{
      testField_WorkerJSON.testFieldRangeStart = jumpFieldRangeStart;
      testField_WorkerJSON.testFieldRangeEnd = jumpFieldRangeEnd;
    }

    // generate fields
    // upstairs
    jumpWorkerStatus_Array.push(0,0,0,0,0,0);
    jumpTestFields_Names.push("Jump Upstairs Steps=2","Jump Upstairs Steps=5","Jump Upstairs Steps=10","Jump Upstairs Steps=100","Jump Upstairs Steps=600","Jump Upstairs Steps=1200");
    jump_startWorker(2,  0);
    jump_startWorker(5,  0);
    jump_startWorker(10, 0);
    jump_startWorker(100, 0);
    jump_startWorker(600, 0);
    jump_startWorker(1200, 0);
    // downstairs
    jumpWorkerStatus_Array.push(0,0,0,0,0,0);
    jumpTestFields_Names.push("Jump Downstairs Steps=2","Jump Downstairs Steps=5","Jump Downstairs Steps=10","Jump Downstairs Steps=100","Jump Downstairs Steps=600","Jump Downstairs Steps=1200");
    jump_startWorker(2,  1);
    jump_startWorker(5,  1);
    jump_startWorker(10, 1);
    jump_startWorker(100, 1);
    jump_startWorker(600, 1);
    jump_startWorker(1200, 1);
    // variable jumps (fixed max)
    jumpWorkerStatus_Array.push(0,0,0,0);
    jumpTestFields_Names.push("Jump Decrease (Max) Steps=5","Jump Decrease (Max) Steps=10","Jump Decrease (Max) Steps=100","Jump Decrease (Max) Steps=600");
    jump_startWorker(5,  2);
    jump_startWorker(10, 2);
    jump_startWorker(100, 2);
    jump_startWorker(600, 2);
    // variable jumps (fixed min)
    jumpWorkerStatus_Array.push(0,0,0,0);
    jumpTestFields_Names.push("Jump Decrease (Min) Steps=5","Jump Decrease (Min) Steps=10","Jump Decrease (Min) Steps=100","Jump Decrease (Min) Steps=600");
    jump_startWorker(5,  3);
    jump_startWorker(10, 3);
    jump_startWorker(100, 3);
    jump_startWorker(600, 3);

}


function jump_startWorker(n, type){

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


function removeJumpFields(){


    document.getElementById("id_TestJump_Status").style.width = "0%";
    document.getElementById("id_TestJump_Check").style.visibility = "hidden";

    if(allJumpWorkersFinished=false){
      for (var i = 0; i < jumpWorkers_Array.length; i++) {
        if(jumpWorkers_Array[i]!=undefined)
          jumpWorkers_Array[i].terminate();
      }

      allJumpWorkersFinished=true;
    }

    jumpTestFields_Array=[];
    jumpTestFields_Names=[];
    jumpWorkers_Array=[];
    jumpWorkerStatus_Array=[];

    if(document.getElementById("id_CCCTest_FieldType_Select").selectedIndex == 0){
      var selectobject=document.getElementById("id_CCCTest_Field_Select")
      for (var i=selectobject.length-1; i>=0; i--){
         selectobject.remove(i);
      }
    }

    selectTestField(false);

    if(document.getElementById("id_CCCTest_DoJump").checked){
      allJumpsFinished=false;
      startJumpFieldGeneration();
    }
    else{
      allJumpsFinished=true;
    }



}
