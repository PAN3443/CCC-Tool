

//////////////////////////////////////////////////////////////////////////////
////////////// CCCTest
//////////////

function showTestSet() {
  document.getElementById("id_Testing_TestSets").style.display = "block";
  document.getElementById("id_Testing_NewTestSets").style.display = "none";
  fillCCCTestSelection();
}

function removeCCCTest() {

}

function startCCCTest() {

  if (usertestWorkerfinished == false) {

    if (usertestWorker != undefined)
      usertestWorker.terminate();

    usertestWorkerfinished = true;
  }

  console.log("Start CCC Test: " + document.getElementById("id_TestPage_UserTest_List").options[document.getElementById("id_TestPage_UserTest_List").selectedIndex].value);

  if (document.getElementById("id_TestPage_UserTest_List").selectedIndex != -1) {

    switch (document.getElementById("id_TestPage_UserTest_List").options[document.getElementById("id_TestPage_UserTest_List").selectedIndex].value) {

      case "Jump":
        jumpTest_startWorker(cccTest_Jumps_Options[document.getElementById("id_TestPage_UserTest_List").selectedIndex]);
        break;

      case "Gradient":
        var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Jumps_Options.length;
        gradient_startWorker(index);
        break;

      case "Valley":
        var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length;
        valleyTest_startWorker(cccTest_RidgeValleyLine_Options[index]);
        break;

      case "Extrema":
        var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length - cccTest_RidgeValleyLine_Options.length;
        extremaTest_startWorker(cccTest_LocalExtrema_Options[index]);
        break;

      case "Frequency":
        var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length - cccTest_RidgeValleyLine_Options.length - cccTest_LocalExtrema_Options.length;
        frequency_startWorker(index);
        break;

    }

  }

}

function frequency_startWorker(index) {

  //cccTest_Frequency_Options//

  userTestGlobalField = new class_TestField(document.getElementById("id_TestPage_GridDimX").value, document.getElementById("id_TestPage_GridDimY").value);



  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "Frequency";
  testField_WorkerJSON.testFieldGenerationType = cccTest_Gradient_Options[index][1];

  testField_WorkerJSON.testFieldDimX = document.getElementById("id_TestPage_GridDimX").value;
  testField_WorkerJSON.testFieldDimY = document.getElementById("id_TestPage_GridDimY").value;
  testField_WorkerJSON.testFieldVar_a = cccTest_Frequency_Options[index][0]; // sin or cos
  testField_WorkerJSON.testFieldVar_b = cccTest_Frequency_Options[index][1]; // Start Frequency
  testField_WorkerJSON.testFieldVar_c = cccTest_Frequency_Options[index][2]; // Doublings
  testField_WorkerJSON.testFieldVar_d = cccTest_Frequency_Options[index][3]; // Range Start
  testField_WorkerJSON.testFieldVar_e = cccTest_Frequency_Options[index][4]; // Range End


  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}

function gradient_startWorker(index) {

  userTestGlobalField = new class_TestField(document.getElementById("id_TestPage_GridDimX").value, document.getElementById("id_TestPage_GridDimY").value);

  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "GRADIENT";
  testField_WorkerJSON.testFieldGenerationType = cccTest_Gradient_Options[index][1];

  testField_WorkerJSON.testFieldVar_a = cccTest_Gradient_Options[index][0];
  testField_WorkerJSON.testFieldDimX = document.getElementById("id_TestPage_GridDimX").value;
  testField_WorkerJSON.testFieldDimY = document.getElementById("id_TestPage_GridDimY").value;

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}

function valleyTest_startWorker(options) {
  //var newWorker;
  userTestGlobalField = new class_TestField(options[7], options[8]);

  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "Valley";
  testField_WorkerJSON.testFieldIndex = jumpWorkers_Array.length;

  testField_WorkerJSON.testFieldDimX = options[7];
  testField_WorkerJSON.testFieldDimY = options[8];

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

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}

function extremaTest_startWorker(options) {

  //var newWorker;
  userTestGlobalField = new class_TestField(document.getElementById("id_TestPage_GridDimX").value, document.getElementById("id_TestPage_GridDimY").value);

  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "Extrema";
  testField_WorkerJSON.testFieldIndex = jumpWorkers_Array.length;

  testField_WorkerJSON.testFieldDimX = document.getElementById("id_TestPage_GridDimX").value;
  testField_WorkerJSON.testFieldDimY = document.getElementById("id_TestPage_GridDimY").value;

  testField_WorkerJSON.testFieldVar_a = options[0]; // a
  testField_WorkerJSON.testFieldVar_b = options[1]; // b
  testField_WorkerJSON.testFieldVar_c = options[2]; //m
  testField_WorkerJSON.testFieldVar_d = options[3]; // auto sclae

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}

function jumpTest_startWorker(options) {

  var nDim = ((options[1].length) * 2) + 1; // oldJump Image: (stepArray.length-1)*2+1; // nDim-1 = number of cells in x direction
  var mDim = options[1].length+1; // oldJump Image: stepArray.length+1; // mDim-1 = number of cells in y direction

  //var newWorker;
  userTestGlobalField = new class_TestField(nDim, mDim);

  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "JUMP";
  testField_WorkerJSON.testFieldGenerationType = undefined;

  testField_WorkerJSON.testFieldDimX = nDim;
  testField_WorkerJSON.testFieldDimY = mDim;

  testField_WorkerJSON.testFieldVar_a =  options[1];
  testField_WorkerJSON.testFieldVar_b =  options[0];

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}

function fillCCCTestSelection() {

  var selectbox = document.getElementById("id_TestPage_UserTest_List");
  selectbox.innerHTML = [];

  if (cccTest_Jumps_Options.length > 0) {
    var optgroupJumps = document.createElement('optgroup');
    optgroupJumps.label = "Jump Tests (No use of Grid Options):";
    for (var i = 0; i < cccTest_Jumps_Options.length; i++) {
      var opt = document.createElement('option');

      var name = "Jump : J={";
      for (var j = 1; j < cccTest_Jumps_Options[i].length; j++) {
        if(cccTest_Jumps_Options[0])
          name += cccTest_Jumps_Options[i][j]*100+"%";
        else
          name += cccTest_Jumps_Options[i][j];


        if (j != cccTest_Jumps_Options[i].length - 1)
          name += ",";
      }
      name += "}";
      opt.innerHTML = name;
      opt.value = "Jump";
      optgroupJumps.appendChild(opt);
    }
    selectbox.appendChild(optgroupJumps);
  }


  if (cccTest_Gradient_Options.length > 0) {
    var optgroupGradient = document.createElement('optgroup');
    optgroupGradient.label = "Gradient Tests:";
    for (var i = 0; i < cccTest_Gradient_Options.length; i++) {
      var opt = document.createElement('option');

      var name = "Gradient : S=" + cccTest_Gradient_Options[i][0] * 100 + "%";

      switch (cccTest_Gradient_Options[i][1]) {
        case 0:
          name += ", Type=Rising";
          break;
        case 1:
          name += ", Type=Falling";
          break;
        default:

      }

      opt.innerHTML = name;
      opt.value = "Gradient";
      optgroupGradient.appendChild(opt);
    }
    selectbox.appendChild(optgroupGradient);
  }


  if (cccTest_RidgeValleyLine_Options.length > 0) {
    var optgroupJumps = document.createElement('optgroup');
    optgroupJumps.label = "Ridge & Valley Tests:";
    for (var i = 0; i < cccTest_RidgeValleyLine_Options.length; i++) {
      var opt = document.createElement('option');

      var name = ""

      if (cccTest_RidgeValleyLine_Options[i][1] < cccTest_RidgeValleyLine_Options[i][2])
        name = "Ridge";
      else
        name = "Valley";

      if(cccTest_RidgeValleyLine_Options[i][0]){
        name += " : m=" + cccTest_RidgeValleyLine_Options[i][1]*100+"%, M=" + cccTest_RidgeValleyLine_Options[i][2]*100+"%, m-Type=";
      }
      else {
        name += " : m=" + cccTest_RidgeValleyLine_Options[i][1] + ", M=" + cccTest_RidgeValleyLine_Options[i][2] + ", m-Type=";
      }


      switch (cccTest_RidgeValleyLine_Options[i][3]) {
        case 0:
          name += "\"Linear\"";
          break;
        case 1:
          name += "\"Arc\"";
          /*var exp = ""+cccTest_RidgeValleyLine_Options[i][3];
          name += "\"Quad x"+exp.sup()+"\"";*/
          break;
        case 2:
          name += "\"Peak\"";
          /*var exp = ""+cccTest_RidgeValleyLine_Options[i][3];
          name += "\"Quad (x&#8723;1)"+exp.sup()+"\"";*/
          break;
        default:

      }
      name += ", M-Type=";
      switch (cccTest_RidgeValleyLine_Options[i][5]) {
        case 0:
          name += "\"Linear\"";
          break;
        case 1:
          name += "\"Hunch\"";
          /*var exp = ""+cccTest_RidgeValleyLine_Options[i][5];
          name += "\"Quad x"+exp.sup()+"\"";*/
          break;
        case 2:
          name += "\"Crook\"";
          /*var exp = ""+cccTest_RidgeValleyLine_Options[i][5];
          name += "\"Quad (x-1)"+exp.sup()+"\"";/*/
          break;
        default:

      }

      opt.innerHTML = name;
      opt.value = "Valley";
      optgroupJumps.appendChild(opt);
    }
    selectbox.appendChild(optgroupJumps);
  }


  if (cccTest_LocalExtrema_Options.length > 0) {
    var optgroupJumps = document.createElement('optgroup');
    optgroupJumps.label = "Local Extrema Tests:";
    for (var i = 0; i < cccTest_LocalExtrema_Options.length; i++) {
      var opt = document.createElement('option');

      var name = ""

      if (cccTest_LocalExtrema_Options[i][0] > 0 && cccTest_LocalExtrema_Options[i][1] > 0) {
        name += "Minimum (";
      } else if (cccTest_LocalExtrema_Options[i][0] < 0 && cccTest_LocalExtrema_Options[i][1] < 0) {
        name += "Maximum (";
      } else {
        name += "Saddle (";
      }

      name += "a=" + cccTest_LocalExtrema_Options[i][0] + ", b=" + cccTest_LocalExtrema_Options[i][1] + ", m=" + cccTest_LocalExtrema_Options[i][2] + ")";
      name += " : x_step=" + cccTest_LocalExtrema_Options[i][3] + ", y_step=" + cccTest_LocalExtrema_Options[i][4];

      if (cccTest_LocalExtrema_Options[i][5]) {
        name += ", Autoscale To Range";
      }

      opt.innerHTML = name;
      opt.value = "Extrema";
      optgroupJumps.appendChild(opt);
    }
    selectbox.appendChild(optgroupJumps);
  }

  if (cccTest_Frequency_Options.length > 0) {
    var optgroupJumps = document.createElement('optgroup');
    optgroupJumps.label = "Frequency Tests:";
    for (var i = 0; i < cccTest_Frequency_Options.length; i++) {
      var opt = document.createElement('option');

      var name = "";

      if (cccTest_Frequency_Options[i][1])
        name = "Sinus : ";
      else
        name = "Cosinus : ";

      var tmp = "Start";
      name += "F" + tmp.sub() + "=";

      name += cccTest_Frequency_Options[i][2] +
        ", #Doublings=" + cccTest_Frequency_Options[i][3] +
        ", Wave-Range=" + cccTest_Frequency_Options[i][4] +
        "-" + cccTest_Frequency_Options[i][5];

      opt.innerHTML = name;
      opt.value = "Frequency";
      optgroupJumps.appendChild(opt);
    }
    selectbox.appendChild(optgroupJumps);
  }


  selectbox.selectedIndex = 0;



}
