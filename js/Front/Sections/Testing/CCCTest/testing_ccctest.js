

//////////////////////////////////////////////////////////////////////////////
////////////// CCCTest
//////////////

function showTestSet() {
  document.getElementById("id_Testing_TestSets").style.display = "block";
  document.getElementById("id_Testing_NewTestSets").style.display = "none";
  fillCCCTestSelection();
}

function removeCCCTest() {

  switch (document.getElementById("id_TestPage_UserTest_List").options[document.getElementById("id_TestPage_UserTest_List").selectedIndex].value) {

    case "Jump":
      cccTest_Jumps_Options.splice(document.getElementById("id_TestPage_UserTest_List").selectedIndex, 1);
      break;

    case "Gradient":
      var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Jumps_Options.length;
      cccTest_Gradient_Options.splice(index, 1);
      break;

    case "Valley":
      var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length;
      cccTest_RidgeValleyLine_Options.splice(index, 1);
      break;

    case "Extrema":
      var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length - cccTest_RidgeValleyLine_Options.length;
      cccTest_LocalExtrema_Options.splice(index, 1);
      break;

    case "Frequency":
      var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length - cccTest_RidgeValleyLine_Options.length - cccTest_LocalExtrema_Options.length;
      cccTest_Frequency_Options.splice(index, 1);
      break;

      case "LittleBit":
        var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length - cccTest_RidgeValleyLine_Options.length - cccTest_LocalExtrema_Options.length - cccTest_Frequency_Options.length;
        cccTest_LittleBit_Options.splice(index, 1);
        break;

        case "Treshold":
          var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length - cccTest_RidgeValleyLine_Options.length - cccTest_LocalExtrema_Options.length - cccTest_Frequency_Options.length - cccTest_LittleBit_Options.length;
          cccTest_Treshold_Options.splice(index, 1);
          break;

  }
  fillCCCTestSelection();
  startCCCTest();
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
        gradient_startWorker(cccTest_Gradient_Options[index]);
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
        littlebit_startWorker(cccTest_Frequency_Options[index]);
        break;

        case "LittleBit":
          var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length - cccTest_RidgeValleyLine_Options.length - cccTest_LocalExtrema_Options.length - cccTest_Frequency_Options.length;
          littlebit_startWorker(cccTest_LittleBit_Options[index]);
          break;

          case "Treshold":
            var index = document.getElementById("id_TestPage_UserTest_List").selectedIndex - cccTest_Gradient_Options.length - cccTest_Jumps_Options.length - cccTest_RidgeValleyLine_Options.length - cccTest_LocalExtrema_Options.length - cccTest_Frequency_Options.length - cccTest_LittleBit_Options.length;
            treshold_startWorker(cccTest_Treshold_Options[index]);
            break;

    }

  }

}

function treshold_startWorker(options) {

  userTestGlobalField = new class_TestField(options[6], options[7]);

  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "Treshold";
  testField_WorkerJSON.testFieldDimX = options[6];
  testField_WorkerJSON.testFieldDimY = options[7];
  testField_WorkerJSON.testFieldVar_a = options[0]; // ratio or not
  testField_WorkerJSON.testFieldVar_b = options[1]; // type
  testField_WorkerJSON.testFieldVar_c = options[2]; // exp
  testField_WorkerJSON.testFieldVar_d = options[3]; // min
  testField_WorkerJSON.testFieldVar_e = options[4]; // treshold
  testField_WorkerJSON.testFieldVar_f = options[5]; // max

  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);
}

function littlebit_startWorker(options) {

  var numberOfSinks = 10;
  var numberOfAreas = numberOfSinks+numberOfSinks+1;
  var xDim = numberOfAreas*options[3];
  var yDim = numberOfAreas*options[3];
  userTestGlobalField = new class_TestField(xDim, yDim);

  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "LittleBit";

  testField_WorkerJSON.testFieldDimX = xDim;
  testField_WorkerJSON.testFieldDimY = yDim;
  testField_WorkerJSON.testFieldVar_a = options[0]; // ratio or not
  testField_WorkerJSON.testFieldVar_b = options[1]; // max little
  testField_WorkerJSON.testFieldVar_c = options[2]; // min little
  testField_WorkerJSON.testFieldVar_d = options[3]; // pixel per area
  testField_WorkerJSON.testFieldVar_e =numberOfSinks;


  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}

function frequency_startWorker(options) {

  //cccTest_Frequency_Options//

  userTestGlobalField = new class_TestField(100, 100);



  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "Frequency";

  testField_WorkerJSON.testFieldDimX = 100;
  testField_WorkerJSON.testFieldDimY = 100;
  testField_WorkerJSON.testFieldVar_f = options[0]; // ratio
  testField_WorkerJSON.testFieldVar_a = options[1]; // sin or cos
  testField_WorkerJSON.testFieldVar_b = options[2]; // Start Frequency
  testField_WorkerJSON.testFieldVar_c = options[3]; // Doublings
  testField_WorkerJSON.testFieldVar_d = options[4]; // Range Start
  testField_WorkerJSON.testFieldVar_e = options[5]; // Range End


  usertestWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');

  usertestWorkerfinished = false;
  usertestWorker.addEventListener('message', workerEvent_showTestField, false);
  usertestWorker.postMessage(testField_WorkerJSON);

}

function gradient_startWorker(options) {

  userTestGlobalField = new class_TestField(options[7], options[8]);

  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "Gradient";

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
  userTestGlobalField = new class_TestField(options[4], options[5]);

  testField_WorkerJSON.originIsRelevant = false;

  testField_WorkerJSON.testFieldType = "Extrema";
  testField_WorkerJSON.testFieldIndex = jumpWorkers_Array.length;

  testField_WorkerJSON.testFieldDimX = options[4];
  testField_WorkerJSON.testFieldDimY = options[5];

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
      for (var j = 0; j < cccTest_Jumps_Options[i][1].length; j++) {
        if(cccTest_Jumps_Options[i][0])
          name += cccTest_Jumps_Options[i][1][j]*100+"%";
        else
          name += cccTest_Jumps_Options[i][1][j];


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
        name += " : m=" + cccTest_RidgeValleyLine_Options[i][1]*100+"%, M=" + cccTest_RidgeValleyLine_Options[i][2]*100+"%, X-Type=";
      }
      else {
        name += " : m=" + cccTest_RidgeValleyLine_Options[i][1] + ", M=" + cccTest_RidgeValleyLine_Options[i][2] + ", X-Type=";
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
      name += ", Y-Type=";
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

      if (cccTest_LocalExtrema_Options[i][3]) {
        name += "; Autoscale To Range";
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


  if (cccTest_LittleBit_Options.length > 0) {
    var optgroupJumps = document.createElement('optgroup');
    optgroupJumps.label = "Little Bit Tests:";
    for (var i = 0; i < cccTest_LittleBit_Options.length; i++) {
      var opt = document.createElement('option');

      var name =  "Little"+"Start".sub()+"="+cccTest_LittleBit_Options[i][1] +
                  "; Little"+"End".sub()+"="+cccTest_LittleBit_Options[i][2]+";";


      opt.innerHTML = name;
      opt.value = "LittleBit";
      optgroupJumps.appendChild(opt);
    }
    selectbox.appendChild(optgroupJumps);
  }

  if (cccTest_Treshold_Options.length > 0) {
    var optgroupJumps = document.createElement('optgroup');
    optgroupJumps.label = "Treshold Tests:";
    for (var i = 0; i < cccTest_Treshold_Options.length; i++) {
      var opt = document.createElement('option');

      var name =  "m="+cccTest_Treshold_Options[i][3] +
                  ", T="+cccTest_Treshold_Options[i][4]+
                  ", M="+cccTest_Treshold_Options[i][5]+
                  ", Type="+cccTest_Treshold_Options[i][1];


      opt.innerHTML = name;
      opt.value = "Treshold";
      optgroupJumps.appendChild(opt);
    }
    selectbox.appendChild(optgroupJumps);
  }





  selectbox.selectedIndex = 0;



}
