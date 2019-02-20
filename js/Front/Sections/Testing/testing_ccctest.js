function startCCCTest(){

  if (usertestWorkerfinished == false) {

    if (usertestWorker != undefined)
      usertestWorker.terminate();

    usertestWorkerfinished = true;
  }

  console.log("Start CCC Test: "+ document.getElementById("id_TestPage_UserTest_List").options[document.getElementById("id_TestPage_UserTest_List").selectedIndex].value);

  if (document.getElementById("id_TestPage_UserTest_List").selectedIndex != -1) {

    switch (document.getElementById("id_TestPage_UserTest_List").options[document.getElementById("id_TestPage_UserTest_List").selectedIndex].value) {

      case "Jump":
        jumpTest_startWorker(cccTest_Jumps_Options[document.getElementById("id_TestPage_UserTest_List").selectedIndex]);
      break;

      case "Gradient":
        var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Jumps_Options.length;
        console.log(index);
        gradient_startWorker(index);
      break;

      case "Valley":
        var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length;
        valleyTest_startWorker(index);
      break;

      case "Extrema":
        var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length - cccTest_RidgeValleyLine_Options.length;
        extremaTest_startWorker(index);
      break;

      case "Frequency":
        var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length - cccTest_RidgeValleyLine_Options.length - cccTest_LocalExtrema_Options.length;
        frequency_startWorker(index);
      break;





    }

  }

}


function frequency_startWorker(index){

  //cccTest_Frequency_Options//

  userTestGlobalField = new class_TestField(cccTest_Frequency_Options[index][5],cccTest_Frequency_Options[index][6]);

  testField_WorkerJSON.originIsRelevant=false;

  testField_WorkerJSON.testFieldType = "Frequency";
  testField_WorkerJSON.testFieldGenerationType = cccTest_Gradient_Options[index][1];

  testField_WorkerJSON.testFieldDimX = cccTest_Frequency_Options[index][5];
  testField_WorkerJSON.testFieldDimY = cccTest_Frequency_Options[index][6];
  testField_WorkerJSON.testFieldVar_a = cccTest_Frequency_Options[index][0]; // sin or cos
  testField_WorkerJSON.testFieldVar_b = cccTest_Frequency_Options[index][1]; // Start Frequency
  testField_WorkerJSON.testFieldVar_c = cccTest_Frequency_Options[index][2]; // Doublings
  testField_WorkerJSON.testFieldVar_d = cccTest_Frequency_Options[index][3]; // Range Start
  testField_WorkerJSON.testFieldVar_e = cccTest_Frequency_Options[index][4]; // Range End

  usertestWorker=new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished=false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}

function gradient_startWorker(index){

  userTestGlobalField = new class_TestField(cccTest_Gradient_Options[index][2],cccTest_Gradient_Options[index][2]);

  testField_WorkerJSON.originIsRelevant=false;

  testField_WorkerJSON.testFieldType = "GRADIENT";
  testField_WorkerJSON.testFieldGenerationType = cccTest_Gradient_Options[index][1];

  testField_WorkerJSON.testFieldVar_a = cccTest_Gradient_Options[index][0];
  testField_WorkerJSON.testFieldDimX = cccTest_Gradient_Options[index][2];
  testField_WorkerJSON.testFieldDimY = cccTest_Gradient_Options[index][2];

  usertestWorker=new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished=false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}

function valleyTest_startWorker(index){

  //var newWorker;
  userTestGlobalField = new class_TestField(cccTest_RidgeValleyLine_Options[index][6],cccTest_RidgeValleyLine_Options[index][7]);

  testField_WorkerJSON.originIsRelevant=false;

  testField_WorkerJSON.testFieldType = "Valley";
  testField_WorkerJSON.testFieldIndex = jumpWorkers_Array.length;

  testField_WorkerJSON.testFieldDimX = cccTest_RidgeValleyLine_Options[index][6];
  testField_WorkerJSON.testFieldDimY = cccTest_RidgeValleyLine_Options[index][7];

  testField_WorkerJSON.testFieldVar_a = cccTest_RidgeValleyLine_Options[index][0];
  testField_WorkerJSON.testFieldVar_b = cccTest_RidgeValleyLine_Options[index][1];
  testField_WorkerJSON.testFieldVar_c = cccTest_RidgeValleyLine_Options[index][2]; //m-type
  testField_WorkerJSON.testFieldVar_d = cccTest_RidgeValleyLine_Options[index][4]; //M-type
  testField_WorkerJSON.testFieldVar_e = cccTest_RidgeValleyLine_Options[index][3]; //m-type exponend
  testField_WorkerJSON.testFieldVar_f = cccTest_RidgeValleyLine_Options[index][5]; //M-type exponend

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished=false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}

function extremaTest_startWorker(index){

  //var newWorker;
  userTestGlobalField = new class_TestField(cccTest_LocalExtrema_Options[index][4],cccTest_LocalExtrema_Options[index][6]);

  testField_WorkerJSON.originIsRelevant=false;

  testField_WorkerJSON.testFieldType = "Extrema";
  testField_WorkerJSON.testFieldIndex = jumpWorkers_Array.length;

  testField_WorkerJSON.testFieldDimX = cccTest_LocalExtrema_Options[index][4];
  testField_WorkerJSON.testFieldDimY = cccTest_LocalExtrema_Options[index][6];

  testField_WorkerJSON.testFieldVar_a = cccTest_LocalExtrema_Options[index][0]; // a
  testField_WorkerJSON.testFieldVar_b = cccTest_LocalExtrema_Options[index][1]; // b
  testField_WorkerJSON.testFieldVar_c = cccTest_LocalExtrema_Options[index][2]; //m
  testField_WorkerJSON.testFieldVar_d = cccTest_LocalExtrema_Options[index][3]; // xstep
  testField_WorkerJSON.testFieldVar_e = cccTest_LocalExtrema_Options[index][5]; // ystep
  testField_WorkerJSON.testFieldVar_f = cccTest_LocalExtrema_Options[index][7];

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished=false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}

function jumpTest_startWorker(stepArray){

  var nDim = (stepArray.length*2)+1;// oldJump Image: (stepArray.length-1)*2+1; // nDim-1 = number of cells in x direction
  var mDim = stepArray.length+1; // oldJump Image: stepArray.length+1; // mDim-1 = number of cells in y direction

  //var newWorker;
  userTestGlobalField = new class_TestField(nDim,mDim);

  testField_WorkerJSON.originIsRelevant=false;

  testField_WorkerJSON.testFieldType = "JUMP";
  testField_WorkerJSON.testFieldGenerationType = undefined;
  testField_WorkerJSON.testFieldIndex = jumpWorkers_Array.length;

  testField_WorkerJSON.testFieldDimX = nDim;
  testField_WorkerJSON.testFieldDimY = mDim;

  testField_WorkerJSON.testFieldVar_a = stepArray;

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished=false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}
