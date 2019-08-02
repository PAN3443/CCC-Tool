
function fillTestCollection(){

  var backgroundColor1 = "rgb(250,250,250)";
  var backgroundColor2 = "rgb(240,240,240)";

  /////////////////////////////////////////////////////////////////////////////
  ///// CCC-Tests

  var tmpDivCCCTests = document.createElement('div');
  tmpDivCCCTests.style.margin = "auto";
  tmpDivCCCTests.style.background = backgroundColor1;
  tmpDivCCCTests.style.paddingTop = "2vh";

  var tmpDivCCCLabel = document.createElement('p');
  tmpDivCCCLabel.className = "standardText";
  tmpDivCCCLabel.style.color = "rgb(100,100,100)";
  tmpDivCCCLabel.style.height = "4vh";
  tmpDivCCCLabel.style.lineHeight = "4vh";
  tmpDivCCCLabel.style.fontSize = "3.5vh";
  tmpDivCCCLabel.style.marginLeft = "2.5vw";
  tmpDivCCCLabel.style.fontWeight = "bold";
  tmpDivCCCLabel.innerHTML = "1. CCC-Tests:";
  tmpDivCCCTests.appendChild(tmpDivCCCLabel);

  tmpDivCCCTests.appendChild(createJumpDiv());
  tmpDivCCCTests.appendChild(createGradientDiv());
  tmpDivCCCTests.appendChild(createRidgeAndValley());
  tmpDivCCCTests.appendChild(createLocalExtrema());
  tmpDivCCCTests.appendChild(createFrequency());
  tmpDivCCCTests.appendChild(createLittleBit());
  tmpDivCCCTests.appendChild(createTreshold());

  /////////////////////////////////////////////////////////////////////////////
  ///// Function Collection

  var tmpDivFunctionCollection = document.createElement('div');
  tmpDivCCCTests.style.margin = "auto";
  tmpDivFunctionCollection.style.background = backgroundColor2;
  tmpDivFunctionCollection.style.paddingTop = "2vh";

  var tmpDivFCLabel = document.createElement('p');
  tmpDivFCLabel.className = "standardText";
  tmpDivFCLabel.style.color = "rgb(100,100,100)";
  tmpDivFCLabel.style.height = "4vh";
  tmpDivFCLabel.style.lineHeight = "4vh";
  tmpDivFCLabel.style.fontSize = "3.5vh";
  tmpDivFCLabel.style.marginLeft = "2.5vw";
  tmpDivFCLabel.style.fontWeight = "bold";
  tmpDivFCLabel.innerHTML = "2. Function Collection:";
  tmpDivFunctionCollection.appendChild(tmpDivFCLabel);

  tmpDivFunctionCollection.appendChild(createFunctionLocalMin());
  tmpDivFunctionCollection.appendChild(createFunctionBowlShaped());
  tmpDivFunctionCollection.appendChild(createFunctionValleyShaped());

  /////////////////////////////////////////////////////////////////////////////
  ///// Real World Data

  var tmpDivRealWorld = document.createElement('div');
  tmpDivRealWorld.style.margin = "auto";
  tmpDivRealWorld.style.background = backgroundColor1;
  tmpDivRealWorld.style.paddingTop = "2vh";

  var tmpDivRealWorldLabel = document.createElement('p');
  tmpDivRealWorldLabel.className = "standardText";
  tmpDivRealWorldLabel.style.color = "rgb(100,100,100)";
  tmpDivRealWorldLabel.style.height = "4vh";
  tmpDivRealWorldLabel.style.lineHeight = "4vh";
  tmpDivRealWorldLabel.style.fontSize = "3.5vh";
  tmpDivRealWorldLabel.style.marginLeft = "2.5vw";
  tmpDivRealWorldLabel.style.fontWeight = "bold";
  tmpDivRealWorldLabel.innerHTML = "3. Real World Data:";
  tmpDivRealWorld.appendChild(tmpDivRealWorldLabel);

  tmpDivRealWorld.appendChild(createRealWorld_MedicalDiv());
  tmpDivRealWorld.appendChild(createRealWorld_FlowSimDiv());
  tmpDivRealWorld.appendChild(createRealWorld_PhotographDiv());


  ////////////////////////////////////////////////////////////////////////////////////
  document.getElementById("id_Test_FunctionCollection").appendChild(tmpDivCCCTests);
  document.getElementById("id_Test_FunctionCollection").appendChild(tmpDivFunctionCollection);
  document.getElementById("id_Test_FunctionCollection").appendChild(tmpDivRealWorld);
}


function drawTestCollection(){

  calcPreviewTestFields(testpreviewWorker_CCCTest);
  calcPreviewTestFields(testpreviewWorker_Collection);
  calcPreviewTestFields(testpreviewWorker_RealWorldData);

  var workerJSON = {};
  workerJSON['message'] = undefined;

  /*if(browserCanOffscreenCanvas)
    workerJSON.message = "drawTestField";
  else*/
    workerJSON.message = "getImgData";

  testpreviewWorker_CCCTest.postMessage(workerJSON);
  testpreviewWorker_Collection.postMessage(workerJSON);
  testpreviewWorker_RealWorldData.postMessage(workerJSON);
}

function createJumpDiv(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "1.1 Jumps:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);
  for (var i = 0; i < cccTest_Jumps_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "jumpSelectorCanvas_"+i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_CCCTest,"CCCTest","Jump");
      inform_Worker_PushTestingOptions(testpreviewWorker_CCCTest,cccTest_Jumps_Options[i]);
      inform_Worker_PushTestingCanvas(testpreviewWorker_CCCTest,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
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
      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);


      tmpSelection.onclick = (function(tmpID) {
      return function() {
        redrawTests = false;
         switchTestDisplay(1);
         openJumpTest(tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}

function createGradientDiv(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "1.2 Gradient:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);
  for (var i = 0; i < cccTest_Gradient_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "gradientSelectorCanvas_"+i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_CCCTest,"CCCTest","Gradient");
      inform_Worker_PushTestingOptions(testpreviewWorker_CCCTest,cccTest_Gradient_Options[i]);
      inform_Worker_PushTestingCanvas(testpreviewWorker_CCCTest,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText;
      if(cccTest_Gradient_Options[i][0]){
        labelText ="m="+(cccTest_Gradient_Options[i][1]*100)+"%; ";
        labelText +="M="+(cccTest_Gradient_Options[i][2]*100)+"%; ";
      }
      else {
        labelText ="m="+cccTest_Gradient_Options[i][1]+"; ";
        labelText +="M="+cccTest_Gradient_Options[i][2]+"; ";
      }
      labelText +="Type=";

      switch (cccTest_Gradient_Options[i][3]) {
        case 0:
            labelText +="Const Gradient :";
          break;
          case 1:
              labelText +="Decreasing Gradient :";
            break;
            case 2:
                labelText +="Increasing Gradient :";
              break;

      }

      switch (cccTest_Gradient_Options[i][5]) {
        case 0:
            labelText +="Const Gradient;";
          break;
          case 1:
              labelText +="Decreasing Gradient;";
            break;
            case 2:
                labelText +="Increasing Gradient;";
              break;

      }


      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);


      tmpSelection.onclick = (function(tmpID) {
      return function() {
        redrawTests = false;
         switchTestDisplay(1);
         openGradientTest(tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}

function createRidgeAndValley(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "1.3 Ridge/Valley:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);
  for (var i = 0; i < cccTest_RidgeValleyLine_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "ridgeValleySelectorCanvas_"+i;
      tmpSelection.appendChild(tmpCanvas);


      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_CCCTest,"CCCTest","RiVa");
      inform_Worker_PushTestingOptions(testpreviewWorker_CCCTest,cccTest_RidgeValleyLine_Options[i]);
      inform_Worker_PushTestingCanvas(testpreviewWorker_CCCTest,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText;
      if(cccTest_RidgeValleyLine_Options[i][0]){
        labelText ="m="+(cccTest_RidgeValleyLine_Options[i][1]*100)+"%; ";
        labelText +="M="+(cccTest_RidgeValleyLine_Options[i][2]*100)+"%; ";
      }
      else {
        labelText ="m="+cccTest_RidgeValleyLine_Options[i][1]+"; ";
        labelText +="M="+cccTest_RidgeValleyLine_Options[i][2]+"; ";
      }
      labelText +="Type=";

      switch (cccTest_RidgeValleyLine_Options[i][3]) {
        case 0:
            labelText +="Linear : ";
          break;
          case 1:
              labelText +="Mound:";
            break;
            case 2:
                labelText +="Peak:";
              break;

      }

      switch (cccTest_RidgeValleyLine_Options[i][5]) {
        case 0:
            labelText +="Linear;";
          break;
          case 1:
              labelText +="Mound;";
            break;
            case 2:
                labelText +="Peak;";
              break;

      }


      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);


      tmpSelection.onclick = (function(tmpID) {
      return function() {
         redrawTests = false;
         switchTestDisplay(1);
         openRidgeValleyTest(tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}

function createLocalExtrema(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "1.4 Minimum/Maximum/Saddle:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);
  for (var i = 0; i < cccTest_LocalExtrema_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "localExtremaCanvas_"+i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_CCCTest,"CCCTest","Extrema");
      inform_Worker_PushTestingOptions(testpreviewWorker_CCCTest,cccTest_LocalExtrema_Options[i]);
      inform_Worker_PushTestingCanvas(testpreviewWorker_CCCTest,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText;

      if(cccTest_LocalExtrema_Options[i][0]<0 && cccTest_LocalExtrema_Options[i][1]<0){
        labelText = "Maximum".bold()+": ";
      }
      else if(cccTest_LocalExtrema_Options[i][0]>0 && cccTest_LocalExtrema_Options[i][1]>0){
        labelText = "Minimum".bold()+": ";
      }
      else {
        labelText = "Saddle".bold()+": ";
      }

      labelText += "a="+cccTest_LocalExtrema_Options[i][0]+"; b="+cccTest_LocalExtrema_Options[i][1]+"; m="+cccTest_LocalExtrema_Options[i][2]+";";

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
      return function() {
        redrawTests = false;
         switchTestDisplay(1);
         openExtremaTest(tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}

function createFrequency(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "1.5 Frequency:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);

  for (var i = 0; i < cccTest_Frequency_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "frequencyCanvas_"+i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_CCCTest,"CCCTest","Frequency");
      inform_Worker_PushTestingOptions(testpreviewWorker_CCCTest,cccTest_Frequency_Options[i]);
      inform_Worker_PushTestingCanvas(testpreviewWorker_CCCTest,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = "Frequency-Increases: " + cccTest_Frequency_Options[i][3];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
      return function() {
        redrawTests = false;
         switchTestDisplay(1);
         openFrequencyTest(tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}

function createLittleBit(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "1.6 Little Bit:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);

  for (var i = 0; i < cccTest_LittleBit_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "littlebitCanvas_"+i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_CCCTest,"CCCTest","LittleBit");
      inform_Worker_PushTestingOptions(testpreviewWorker_CCCTest,cccTest_LittleBit_Options[i]);
      inform_Worker_PushTestingCanvas(testpreviewWorker_CCCTest,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = "from ";

      if(cccTest_LittleBit_Options[i][0]){
        labelText += cccTest_LittleBit_Options[i][3]*100+"% to ";
        labelText += cccTest_LittleBit_Options[i][4]*100+"%;";
      }
      else{
        labelText += cccTest_LittleBit_Options[i][3]+" to ";
        labelText += cccTest_LittleBit_Options[i][4]+";";
      }

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
      return function() {
        redrawTests = false;
         switchTestDisplay(1);
         openLittleBitTest(tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}

function createTreshold(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "1.7 Treshold:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);

  for (var i = 0; i < cccTest_Treshold_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "tresholdCanvas_"+i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_CCCTest,"CCCTest","Treshold");
      inform_Worker_PushTestingOptions(testpreviewWorker_CCCTest,cccTest_Treshold_Options[i]);
      inform_Worker_PushTestingCanvas(testpreviewWorker_CCCTest,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = "";

      if(cccTest_Treshold_Options[i][0]){
        labelText = "m="+cccTest_Treshold_Options[i][3]*100+"% < ";
        labelText += "T="+cccTest_Treshold_Options[i][4]*100+"% < ";
        labelText += "M="+cccTest_Treshold_Options[i][5]*100+"%; ";
      }
      else{


        labelText = "m="+cccTest_Treshold_Options[i][3]+" < ";
        labelText += "T="+cccTest_Treshold_Options[i][4]+" < ";
        labelText += "M="+cccTest_Treshold_Options[i][5]+"; ";
      }

      labelText += "Type=";

      switch (cccTest_Treshold_Options[i][1]) {
        case 0:
          labelText += "Linear Surounding;";
          break;
          case 1:
              labelText += "Flat Surounding;";
            break;
            case 2:
              labelText += "Steep Surounding;";
              break;
      }

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
      return function() {
        redrawTests = false;
         switchTestDisplay(1);
         openTresholdTest(tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}

function createFunctionLocalMin(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "2.1 Local Minimum:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);

  for (var i = 0; i < fctTest_LocalMin_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = fctTest_LocalMin_Options[i][1];
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_Collection,"Collection",fctTest_LocalMin_Options[i][1]);
      inform_Worker_PushTestingOptions(testpreviewWorker_Collection,fctTest_LocalMin_Options[i]);
      inform_Worker_PushTestingCanvas(testpreviewWorker_Collection,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = fctTest_LocalMin_Options[i][0];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
      return function() {
        redrawTests = false;
         switchTestDisplay(1);
         openFctLocalMinimaTest(tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}

function createFunctionBowlShaped(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "2.2 Bowl Shaped:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);

  for (var i = 0; i < fctTest_BowlShaped_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = fctTest_BowlShaped_Options[i][1];
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_Collection,"Collection",fctTest_BowlShaped_Options[i][1]);
      inform_Worker_PushTestingOptions(testpreviewWorker_Collection,fctTest_BowlShaped_Options[i]);
      inform_Worker_PushTestingCanvas(testpreviewWorker_Collection,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = fctTest_BowlShaped_Options[i][0];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
      return function() {
        redrawTests = false;
         switchTestDisplay(1);
         openFctBowlShapedTest(tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}

function createFunctionValleyShaped(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "2.3 Valley Shaped:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);

  for (var i = 0; i < fctTest_ValleyShaped_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = fctTest_ValleyShaped_Options[i][1];
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_Collection,"Collection",fctTest_ValleyShaped_Options[i][1]);
      inform_Worker_PushTestingOptions(testpreviewWorker_Collection,fctTest_ValleyShaped_Options[i]);
      inform_Worker_PushTestingCanvas(testpreviewWorker_Collection,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = fctTest_ValleyShaped_Options[i][0];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
      return function() {
        redrawTests = false;
         switchTestDisplay(1);
         openFctValleyShapedTest(tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}

function createRealWorld_MedicalDiv(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "3.1 Medical:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);

  for (var i = 0; i < medicalLabels.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "rw_medical_canvas_"+i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_RealWorldData,"RealData",undefined);
      inform_Worker_LoadRealWorldIMG(testpreviewWorker_RealWorldData,"resource/realWorldData/medicalData/"+medicalFiles[i],realWorldCanvasIndex);
      realWorldCanvasIndex++;
      inform_Worker_PushTestingCanvas(testpreviewWorker_RealWorldData,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = medicalLabels[i];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      if(medicalAcknowlegments[i]!=undefined)
      tmpSelection.appendChild(createAchnowledgments(medicalAcknowlegments[i]));

      tmpSelection.onclick = (function(tmpID) {
      return function() {
         redrawTests = false;
         switchTestDisplay(1);
         openRealWorldTest("medical",tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}

function createRealWorld_FlowSimDiv(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "3.2 Scientific Flow Simulation:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);

  for (var i = 0; i < scientificFlowSimLabels.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "rw_scientificFlowSim_canvas_"+i;
      tmpSelection.appendChild(tmpCanvas);

      var tmpTestLabel = document.createElement('p');
      var labelText = scientificFlowSimLabels[i];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_RealWorldData,"RealData",undefined);
      inform_Worker_LoadRealWorldIMG(testpreviewWorker_RealWorldData,"resource/realWorldData/scientificFlowSimulation/"+scientificFlowSimFiles[i],realWorldCanvasIndex);
      realWorldCanvasIndex++;
      inform_Worker_PushTestingCanvas(testpreviewWorker_RealWorldData,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      if(scientificFlowSimAcknowlegments[i]!=undefined)
      tmpSelection.appendChild(createAchnowledgments(scientificFlowSimAcknowlegments[i]));

      tmpSelection.onclick = (function(tmpID) {
      return function() {
         redrawTests = false;
         switchTestDisplay(1);
         openRealWorldTest("scientificFlowSim",tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}

function createRealWorld_PhotographDiv(){

  var tmpTestDiv = document.createElement('div');
  tmpTestDiv.style.width = "90vw";
  tmpTestDiv.style.maxWidth = "90vw";
  tmpTestDiv.style.marginLeft = "5vw";

  var tmpDivLabel = document.createElement('p');
  tmpDivLabel.className = "standardText";
  tmpDivLabel.style.color = "rgb(100,100,100)";
  tmpDivLabel.style.fontSize = "2.5vh";
  tmpDivLabel.style.lineHeight = "4vh";
  tmpDivLabel.style.marginTop = "2vh";
  tmpDivLabel.style.fontWeight = "bold";
  tmpDivLabel.innerHTML = "3.3 Photographs:";
  tmpTestDiv.appendChild(tmpDivLabel);

  var tmpDivRow = document.createElement('div');
  tmpDivRow.className = "class_Test_SelectorRow";
  tmpTestDiv.appendChild(tmpDivRow);

  for (var i = 0; i < photographsLabels.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "rw_photographs_canvas_"+i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      inform_Worker_PushTestingType(testpreviewWorker_RealWorldData,"RealData",undefined);
      inform_Worker_LoadRealWorldIMG(testpreviewWorker_RealWorldData,"resource/realWorldData/photographs/"+photographsFiles[i],realWorldCanvasIndex);
      realWorldCanvasIndex++
      inform_Worker_PushTestingCanvas(testpreviewWorker_RealWorldData,tmpCanvas.id);
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = photographsLabels[i];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      if(photographsAcknowlegments[i]!=undefined)
      tmpSelection.appendChild(createAchnowledgments(photographsAcknowlegments[i]));

      tmpSelection.onclick = (function(tmpID) {
      return function() {
         redrawTests = false;
         switchTestDisplay(1);
         openRealWorldTest("photographs",tmpID);
      };
    })(i);

      tmpDivRow.appendChild(tmpSelection);
  }

  return tmpTestDiv;
}


function createAchnowledgments(index){

  var tmpLabel = document.createElement('p');

  var text = "We thank "+acknowlegments[index].blankLink(acknowlegmentsURL[index])+" for provision of real world data.";

  tmpLabel.innerHTML = text;

  tmpLabel.onclick = function(event){event.stopPropagation();};

  return tmpLabel;
}
