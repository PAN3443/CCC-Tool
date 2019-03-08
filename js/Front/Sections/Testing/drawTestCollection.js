
function fillTestCollection(){

  var backgroundColor1 = "rgb(250,250,250)";
  var backgroundColor2 = "rgb(240,240,240)";

  /////////////////////////////////////////////////////////////////////////////
  ///// CCC-Tests

  var tmpDivCCCTests = document.createElement('div');
  tmpDivCCCTests.style.width = "100%";
  tmpDivCCCTests.style.background = backgroundColor1;
  tmpDivCCCTests.style.paddingTop = "2vh";

  var tmpDivCCCLabel = document.createElement('p');
  tmpDivCCCLabel.className = "standardText";
  tmpDivCCCLabel.style.height = "4vh";
  tmpDivCCCLabel.style.lineHeight = "4vh";
  tmpDivCCCLabel.style.fontSize = "3.5vh";
  tmpDivCCCLabel.style.marginLeft = "2.5%";
  tmpDivCCCLabel.style.fontWeight = "bold";
  tmpDivCCCLabel.innerHTML = "1. CCC-Tests:";
  tmpDivCCCTests.appendChild(tmpDivCCCLabel);

      ////////////////////////////////
      ///// CCC-Tests : Jumps
      var tmpDivJumpsLabel = document.createElement('p');
      tmpDivJumpsLabel.className = "standardText";
      tmpDivJumpsLabel.style.fontSize = "2.5vh";
      tmpDivJumpsLabel.style.lineHeight = "2.5vh";
      tmpDivJumpsLabel.style.marginLeft = "5%";
      tmpDivJumpsLabel.style.marginTop = "2vh";
      tmpDivJumpsLabel.style.fontWeight = "bold";
      tmpDivJumpsLabel.innerHTML = "1.1 Jumps:";
      tmpDivCCCTests.appendChild(tmpDivJumpsLabel);

      var tmpDivJumps = document.createElement('div');
      tmpDivJumps.style.width = "90%";
      tmpDivJumps.style.maxWidth = "90%";
      tmpDivJumps.style.display = "inline-block";
      tmpDivJumps.style.marginLeft = "5%";
      tmpDivJumps.style.paddingTop = "1vh";
      tmpDivJumps.style.marginBottom = "1vh";
      tmpDivCCCTests.appendChild(tmpDivJumps);
      for (var i = 0; i < cccTest_Jumps_Options.length; i++) {

          var tmpJumpSelection = document.createElement('div');
          tmpJumpSelection.className = "class_Test_Selector";

          var tmpJumpCanvas = document.createElement('canvas');
          tmpJumpCanvas.id = "jumpSelectorCanvas_"+i;
          tmpJumpSelection.appendChild(tmpJumpCanvas);

          var tmpJumpLabel = document.createElement('p');
          labelText ="J = {";

          for (var j = 0; j < cccTest_Jumps_Options[i][1].length; j++) {
            if(cccTest_Jumps_Options[i][0])
              labelText += cccTest_Jumps_Options[i][1][j]*100+"%";
            else
              labelText += cccTest_Jumps_Options[i][1][j];


            if (j != cccTest_Jumps_Options[i][1].length - 1)
              labelText += ",";
          }
          labelText += "}";
          tmpJumpLabel.innerHTML = labelText;
          tmpJumpSelection.appendChild(tmpJumpLabel);

          tmpDivJumps.appendChild(tmpJumpSelection);
      }

  /////////////////////////////////////////////////////////////////////////////
  ///// Function Collection

  var tmpDivFunctionCollection = document.createElement('div');
  tmpDivFunctionCollection.style.width = "100%";
  tmpDivFunctionCollection.style.background = backgroundColor2;
  tmpDivFunctionCollection.style.paddingTop = "2vh";

  var tmpDivFCLabel = document.createElement('p');
  tmpDivFCLabel.className = "standardText";
  tmpDivFCLabel.style.height = "4vh";
  tmpDivFCLabel.style.lineHeight = "4vh";
  tmpDivFCLabel.style.fontSize = "3.5vh";
  tmpDivFCLabel.style.marginLeft = "2.5%";
  tmpDivFCLabel.style.fontWeight = "bold";
  tmpDivFCLabel.innerHTML = "2. Function Collection:";
  tmpDivFunctionCollection.appendChild(tmpDivFCLabel);


  document.getElementById("id_Test_FunctionCollection").appendChild(tmpDivCCCTests);

  document.getElementById("id_Test_FunctionCollection").appendChild(tmpDivFunctionCollection);
}


function drawTestCollection(){

  for (var i = 0; i < cccTest_Jumps_Options.length; i++) {

      jumpTest_JSON(cccTest_Jumps_Options[i], false);
      testField_WorkerJSON.canvasID = "jumpSelectorCanvas_"+i;
      var tmpWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');
      tmpWorker.addEventListener('message', workerEvent_drawTest, false);
      tmpWorker.postMessage(testField_WorkerJSON);
  }


}


/*


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
        name += "\"Quad x"+exp.sup()+"\""; * /
        break;
      case 2:
        name += "\"Peak\"";
        /*var exp = ""+cccTest_RidgeValleyLine_Options[i][3];
        name += "\"Quad (x&#8723;1)"+exp.sup()+"\"";* /
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
        name += "\"Quad x"+exp.sup()+"\""; * /
        break;
      case 2:
        name += "\"Crook\"";
        /*var exp = ""+cccTest_RidgeValleyLine_Options[i][5];
        name += "\"Quad (x-1)"+exp.sup()+"\"";/* /
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

*/
