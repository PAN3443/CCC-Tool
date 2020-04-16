class class_Element_Collection extends class_Testing_Element_Basis {

  constructor(divID,buttonID) {
    super(divID,buttonID);

    this.cccTest_Jumps_Options = [
      [true, [0.25, 0.75]],
      [true, [0.25, 0.75, 1.0]],
      [true, [0.0, 0.25, 0.75, 1.0]],
      [true, [0.0, 0.2, 0.4, 0.6, 0.8, 1.0]]
    ];

    this.cccTest_Gradient_Options = [
      [true, 0, 1, 0, 2, 0, 2, 101, 100],
      [true, 0, 1, 1, 2, 1, 2, 101, 100],
      [true, 0, 1, 2, 2, 2, 2, 101, 100],
      [true, 1, 0, 0, 2, 0, 2, 101, 100],
      [true, 1, 0, 1, 2, 1, 2, 101, 100],
      [true, 1, 0, 2, 2, 2, 2, 101, 100]
    ];

    this.cccTest_RidgeValleyLine_Options = [ // m,M,type
      [true, 0.0, 1.0, 0, 2, 0, 2, 101, 101],
      [true, 0.0, 1.0, 0, 2, 1, 2, 101, 101],
      [true, 0.0, 1.0, 0, 2, 2, 2, 101, 101],
      [true, 0.0, 1.0, 1, 2, 0, 2, 101, 101],
      [true, 0.0, 1.0, 1, 2, 1, 2, 101, 101],
      [true, 0.0, 1.0, 1, 2, 2, 2, 101, 101],
      [true, 0.0, 1.0, 2, 2, 0, 2, 101, 101],
      [true, 0.0, 1.0, 2, 2, 1, 2, 101, 101],
      [true, 0.0, 1.0, 2, 2, 2, 2, 101, 101]
    ];

    this.cccTest_LocalExtrema_Options = [
      //[a,b,m,stepX,#stepsX,stepY,#stepsY,autoScale],
      [1, 1, 0, true, 101, 101],
      [-1, -1, 0, true, 101, 101],
      [-1, 1, 0, true, 101, 101],
      [1, -1, 0, true, 101, 101],
    ];

    this.cccTest_Frequency_Options = [
      [true, true, 1, 0, 0.0, 1.0, 100, 100],
      [true, false, 1, 1, 0.0, 1.0, 100, 100],
      [true, true, 1, 2, 0.0, 1.0, 100, 100],
      [true, true, 1, 4, 0.0, 1.0, 100, 100],
      [true, true, 1, 8, 0.0, 1.0, 100, 100]
    ];

    this.littleBit_NumberOfSinks = 10;
    this.cccTest_LittleBit_Options = [
      [true, 0.0, 1.0, 0.0001, 0.001, 10, 10, 100],
      [true, 0.0, 1.0, 0.0001, 0.005, 10, 10, 100],
      [true, 0.0, 1.0, 0.0001, 0.01, 10, 10, 100],
      [true, 0.0, 1.0, 0.0001, 0.05, 10, 10, 100],
      [true, 0.0, 1.0, 0.0001, 0.1, 10, 10, 100]
    ];

    this.cccTest_Treshold_Options = [
      [true, 0, 2, 0.0, 0.5, 1.0, 101, 101],
      [true, 1, 2, 0.0, 0.5, 1.0, 101, 101],
      [true, 2, 2, 0.0, 0.5, 1.0, 101, 101]
    ];

    this.realWorldCanvasIndex=0;

    //////////////////////////////////////////////////
    /// Worker
    this.worker_testCollection_CCCTest = new Worker("../../"+version_JS_FolderName+"/src/CCC/sections/test_functions/worker/worker_PreviewTesting.js");//, { type: "module" });
    this.worker_testCollection_CCCTest.postMessage({'message':'init', 'initOption1' : 'CCCTest'});
    this.worker_testCollection_CCCTest.addEventListener('message', workerEvent_DrawPreviewTestfunction, false);
    this.worker_testCollection_Collection = new Worker("../../"+version_JS_FolderName+"/src/CCC/sections/test_functions/worker/worker_PreviewTesting.js");//, { type: "module" });
    this.worker_testCollection_Collection.postMessage({'message':'init', 'initOption1' : 'Collection'});
    this.worker_testCollection_Collection.addEventListener('message', workerEvent_DrawPreviewTestfunction, false);
    this.worker_testCollection_RealWorldData = new Worker("../../"+version_JS_FolderName+"/src/CCC/sections/test_functions/worker/worker_PreviewTesting.js");//, { type: "module" });
    this.worker_testCollection_RealWorldData.postMessage({'message':'init', 'initOption1' : 'RealData'});
    this.worker_testCollection_RealWorldData.addEventListener('message', workerEvent_DrawPreviewTestfunction, false);

    this.fillTestCollection();
  }

  showElement(){
    super.showElement();
    this.updateElement();
  }

  updateElement(){
    if(this.isElementOpen()){
      var workerJSON = {};
      workerJSON['message'] = "calcTestFields";
      this.worker_testCollection_CCCTest.postMessage(workerJSON);
      this.worker_testCollection_Collection.postMessage(workerJSON);
      this.worker_testCollection_RealWorldData.postMessage(workerJSON);

      workerJSON = {};
      workerJSON['message'] = "getImgData";
      this.worker_testCollection_CCCTest.postMessage(workerJSON);
      this.worker_testCollection_Collection.postMessage(workerJSON);
      this.worker_testCollection_RealWorldData.postMessage(workerJSON);
    }
  }

  /////////////////////////////////////
  ///// Worker Functions

  /*inform_Worker_GetVisualisation(){
    var workerJSON = {};
    workerJSON['message'] = "getVisData";

    workerJSON['visType'] = "pixel";

    return workerJSON;
  }*/

  inform_Worker_PushTestingCanvas(canvasID){
    var workerJSON = {};
    workerJSON['message'] = "pushCanvas";
    workerJSON['canvas'] = undefined;
    workerJSON.canvas = canvasID;
    return workerJSON;
  }

  inform_Worker_PushTestingOptions(options){
    var workerJSON = {};
    workerJSON['message'] = "pushOptions";
    workerJSON['optionsList'] = [];
    for (var i = 0; i < options.length; i++) {
      var elem = options[i];
      workerJSON.optionsList.push(elem);
    }
    return workerJSON;
  }

  inform_Worker_PushTestingType(type,subtype){
    var workerJSON = {};
    workerJSON['message'] = "setType";
    workerJSON['type'] = type;
    workerJSON['subtype'] = subtype;
    return workerJSON;
  }

  inform_Worker_LoadRealWorldIMG(url,imgIndex){
          var img = new Image();
          img.setAttribute('crossOrigin', 'anonymous');
          img.onload = (function(index) {
          return function () {
            var workerJSON = {};
            workerJSON['message'] = "getRealWorldData_IMG";
            workerJSON['index'] = index;
            workerJSON['img'] = loadImgData(this);
            testingSection.element_testCollection.worker_testCollection_RealWorldData.postMessage(workerJSON);
          };
        })(imgIndex);

        img.src = url;
  }

  /////////////////////////////////////
  ///// Open Tests

  openJumpTest(jumpID){

  testingSection.element_singleTest.cccTest_NewJump_Options = [];
  var tmpRatio = this.cccTest_Jumps_Options[jumpID][1];
  testingSection.element_singleTest.cccTest_NewJump_Options.push(tmpRatio);
  var tmpArray = [];
  for (var i = 0; i < this.cccTest_Jumps_Options[jumpID][1].length; i++) {
    var tmpJump = this.cccTest_Jumps_Options[jumpID][1][i];
    tmpArray.push(tmpJump);
  }
  testingSection.element_singleTest.cccTest_NewJump_Options.push(tmpArray);

  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 0;
  testingSection.element_singleTest.selectNewJumpTestType();
  }

  openGradientTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.cccTest_Gradient_Options[tmpID].length; i++) {
    tmpArray.push(this.cccTest_Gradient_Options[tmpID][i])
  }
  testingSection.element_singleTest.cccTest_NewGradient_Options = tmpArray;

  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 1;
  testingSection.element_singleTest.selectNewGradientTestType();

  }

  openRidgeValleyTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.cccTest_RidgeValleyLine_Options[tmpID].length; i++) {
    tmpArray.push(this.cccTest_RidgeValleyLine_Options[tmpID][i])
  }
  testingSection.element_singleTest.cccTest_NewRidgeValley_Options = tmpArray;


  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 2;

  testingSection.element_singleTest.selectNewRidgeValleyTestType();

  }

  openExtremaTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.cccTest_LocalExtrema_Options[tmpID].length; i++) {
    tmpArray.push(this.cccTest_LocalExtrema_Options[tmpID][i])
  }
  testingSection.element_singleTest.cccTest_NewLocalExtrema_Options = tmpArray;


  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 3;
  testingSection.element_singleTest.selectNewExtremaTestType();

  }

  openLittleBitTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.cccTest_LittleBit_Options[tmpID].length; i++) {
    tmpArray.push(this.cccTest_LittleBit_Options[tmpID][i])
  }
  testingSection.element_singleTest.cccTest_NewLittleBit_Options = tmpArray;


  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 5;
  testingSection.element_singleTest.selectNewLittleBitTestType();

  }

  openFrequencyTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.cccTest_Frequency_Options[tmpID].length; i++) {
    tmpArray.push(this.cccTest_Frequency_Options[tmpID][i])
  }
  testingSection.element_singleTest.cccTest_NewFrequency_Options = tmpArray;

  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 4;
  testingSection.element_singleTest.selectNewFrequencyTestType();

  }

  openTresholdTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.cccTest_Treshold_Options[tmpID].length; i++) {
    tmpArray.push(this.cccTest_Treshold_Options[tmpID][i])
  }
  testingSection.element_singleTest.cccTest_NewTreshold_Options = tmpArray;

  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 6;
  testingSection.element_singleTest.selectNewTresholdTestType();

  }

  openFctBowlShapedTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.fctTest_BowlShaped_Options[tmpID].length; i++) {

    if(i==2){
      var tmpArray2 = [];
      for (var j = 0; j < this.fctTest_BowlShaped_Options[tmpID][2].length; j++) {
        var tmpVal = this.fctTest_BowlShaped_Options[tmpID][2][j];
        tmpArray2.push(tmpVal);
      }
      tmpArray.push(tmpArray2);
    }
    else{
      var tmpVal = this.fctTest_BowlShaped_Options[tmpID][i];
      tmpArray.push(tmpVal);
    }

  }

  testingSection.element_singleTest.fctTest_NewBowlShaped_Options = tmpArray;

  testingSection.element_singleTest.initNewTest();
  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 9;
  testingSection.element_singleTest.selectNewFctBowlShapedType();

  }

  openFctLocalMinimaTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.fctTest_LocalMin_Options[tmpID].length; i++) {

    if(i==2){
      var tmpArray2 = [];
      for (var j = 0; j < this.fctTest_LocalMin_Options[tmpID][2].length; j++) {
        var tmpVal = this.fctTest_LocalMin_Options[tmpID][2][j];
        tmpArray2.push(tmpVal);
      }
      tmpArray.push(tmpArray2);
    }
    else{
      var tmpVal = this.fctTest_LocalMin_Options[tmpID][i];
      tmpArray.push(tmpVal);
    }

  }

  testingSection.element_singleTest.fctTest_NewLocalMin_Options = tmpArray;

  testingSection.element_singleTest.initNewTest();
  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 8;
  testingSection.element_singleTest.selectNewFctLocalMinimaType();

  }

  openFctValleyShapedTest(tmpID){

  var tmpArray = [];
  for (var i = 0; i < this.fctTest_ValleyShaped_Options[tmpID].length; i++) {

    if(i==2){
      var tmpArray2 = [];
      for (var j = 0; j < this.fctTest_ValleyShaped_Options[tmpID][2].length; j++) {
        var tmpVal = this.fctTest_ValleyShaped_Options[tmpID][2][j];
        tmpArray2.push(tmpVal);
      }
      tmpArray.push(tmpArray2);
    }
    else{
      var tmpVal = this.fctTest_ValleyShaped_Options[tmpID][i];
      tmpArray.push(tmpVal);
    }

  }

  testingSection.element_singleTest.fctTest_NewValleyShaped_Options = tmpArray;

  testingSection.element_singleTest.initNewTest();
  document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 10;
  testingSection.element_singleTest.selectNewFctValleyShapedType();

  }

  openRealWorldTest(type,index){

    testingSection.element_singleTest.selectedRealWorldType = type;

    switch (testingSection.element_singleTest.selectedRealWorldType) {
      case "medical":
          document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 11;
        break;
      case "scientificFlowSim":
          document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 12;
        break;
      case "photographs":
          document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 13;
        break;
      default:
        return;
    }

  testingSection.element_singleTest.initNewTest();
  testingSection.element_singleTest.selectRealWorldType(index);

  }


  /////////////////////////////////////
  ///// Style Collection Page
  fillTestCollection() {

    document.getElementById("id_Test_FunctionCollection").innerHTML = "";

    var backgroundColor1 = getComputedStyle(document.documentElement).getPropertyValue('--main-bg-color');
    var backgroundColor2 = getComputedStyle(document.documentElement).getPropertyValue('--main-second-bg-color');

    /////////////////////////////////////////////////////////////////////////////
    ///// CCC-Tests

    var tmpDivCCCTests = document.createElement('div');
    tmpDivCCCTests.style.margin = "auto";
    tmpDivCCCTests.style.background = backgroundColor1;
    tmpDivCCCTests.style.paddingTop = "2vh";

    var tmpDivCCCLabel = document.createElement('h1');
    tmpDivCCCLabel.innerHTML = "1. CCC-Tests:";
    tmpDivCCCTests.appendChild(tmpDivCCCLabel);

    tmpDivCCCTests.appendChild(this.createJumpDiv());
    tmpDivCCCTests.appendChild(this.createGradientDiv());
    tmpDivCCCTests.appendChild(this.createRidgeAndValley());
    tmpDivCCCTests.appendChild(this.createLocalExtrema());
    tmpDivCCCTests.appendChild(this.createFrequency());
    tmpDivCCCTests.appendChild(this.createLittleBit());
    tmpDivCCCTests.appendChild(this.createTreshold());

    /////////////////////////////////////////////////////////////////////////////
    ///// Function Collection

    var tmpDivFunctionCollection = document.createElement('div');
    tmpDivCCCTests.style.margin = "auto";
    tmpDivFunctionCollection.style.background = backgroundColor2;
    tmpDivFunctionCollection.style.paddingTop = "2vh";

    var tmpDivFCLabel = document.createElement('h1');
    tmpDivFCLabel.className = "standardText";
    tmpDivFCLabel.innerHTML = "2. Function Collection:";
    tmpDivFunctionCollection.appendChild(tmpDivFCLabel);

    tmpDivFunctionCollection.appendChild(this.createFunctionLocalMin());
    tmpDivFunctionCollection.appendChild(this.createFunctionBowlShaped());
    tmpDivFunctionCollection.appendChild(this.createFunctionValleyShaped());

    /////////////////////////////////////////////////////////////////////////////
    ///// Real World Data

    var tmpDivRealWorld = document.createElement('div');
    tmpDivRealWorld.style.margin = "auto";
    tmpDivRealWorld.style.background = backgroundColor1;
    tmpDivRealWorld.style.paddingTop = "2vh";

    var tmpDivRealWorldLabel = document.createElement('h1');
    tmpDivRealWorldLabel.className = "standardText";
    tmpDivRealWorldLabel.innerHTML = "3. Real World Data:";
    tmpDivRealWorld.appendChild(tmpDivRealWorldLabel);

    tmpDivRealWorld.appendChild(this.createRealWorld_MedicalDiv());
    tmpDivRealWorld.appendChild(this.createRealWorld_FlowSimDiv());
    tmpDivRealWorld.appendChild(this.createRealWorld_PhotographDiv());


    ////////////////////////////////////////////////////////////////////////////////////
    document.getElementById("id_Test_FunctionCollection").appendChild(tmpDivCCCTests);
    document.getElementById("id_Test_FunctionCollection").appendChild(tmpDivFunctionCollection);
    document.getElementById("id_Test_FunctionCollection").appendChild(tmpDivRealWorld);
  }

  createJumpDiv() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.className = "standardText";
    tmpDivLabel.innerHTML = "1.1 Jumps:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);
    for (var i = 0; i < this.cccTest_Jumps_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "jumpSelectorCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID

      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType("CCCTest", "Jump"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_Jumps_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = "J = {";

      for (var j = 0; j < this.cccTest_Jumps_Options[i][1].length; j++) {
        if (this.cccTest_Jumps_Options[i][0])
          labelText += this.cccTest_Jumps_Options[i][1][j] * 100 + "%";
        else
          labelText += this.cccTest_Jumps_Options[i][1][j];


        if (j != this.cccTest_Jumps_Options[i][1].length - 1)
          labelText += ",";
      }
      labelText += "}";
      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);


      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openJumpTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createGradientDiv() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.innerHTML = "1.2 Gradient:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);
    for (var i = 0; i < this.cccTest_Gradient_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "gradientSelectorCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType( "CCCTest", "Gradient"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_Gradient_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText;
      if (this.cccTest_Gradient_Options[i][0]) {
        labelText = "m=" + (this.cccTest_Gradient_Options[i][1] * 100) + "%; ";
        labelText += "M=" + (this.cccTest_Gradient_Options[i][2] * 100) + "%; ";
      } else {
        labelText = "m=" + this.cccTest_Gradient_Options[i][1] + "; ";
        labelText += "M=" + this.cccTest_Gradient_Options[i][2] + "; ";
      }
      labelText += "Type=";

      switch (this.cccTest_Gradient_Options[i][3]) {
        case 0:
          labelText += "Const Gradient :";
          break;
        case 1:
          labelText += "Decreasing Gradient :";
          break;
        case 2:
          labelText += "Increasing Gradient :";
          break;

      }

      switch (this.cccTest_Gradient_Options[i][5]) {
        case 0:
          labelText += "Const Gradient;";
          break;
        case 1:
          labelText += "Decreasing Gradient;";
          break;
        case 2:
          labelText += "Increasing Gradient;";
          break;

      }


      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);


      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openGradientTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createRidgeAndValley() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.innerHTML = "1.3 Ridge/Valley:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);
    for (var i = 0; i < this.cccTest_RidgeValleyLine_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "ridgeValleySelectorCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);


      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType("CCCTest", "RiVa"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_RidgeValleyLine_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText;
      if (this.cccTest_RidgeValleyLine_Options[i][0]) {
        labelText = "m=" + (this.cccTest_RidgeValleyLine_Options[i][1] * 100) + "%; ";
        labelText += "M=" + (this.cccTest_RidgeValleyLine_Options[i][2] * 100) + "%; ";
      } else {
        labelText = "m=" + this.cccTest_RidgeValleyLine_Options[i][1] + "; ";
        labelText += "M=" + this.cccTest_RidgeValleyLine_Options[i][2] + "; ";
      }
      labelText += "Type=";

      switch (this.cccTest_RidgeValleyLine_Options[i][3]) {
        case 0:
          labelText += "Linear : ";
          break;
        case 1:
          labelText += "Mound:";
          break;
        case 2:
          labelText += "Peak:";
          break;
      }

      switch (this.cccTest_RidgeValleyLine_Options[i][5]) {
        case 0:
          labelText += "Linear;";
          break;
        case 1:
          labelText += "Mound;";
          break;
        case 2:
          labelText += "Peak;";
          break;
      }


      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);


      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openRidgeValleyTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createLocalExtrema() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.innerHTML = "1.4 Minimum/Maximum/Saddle:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);
    for (var i = 0; i < this.cccTest_LocalExtrema_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "localExtremaCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType( "CCCTest", "Extrema"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_LocalExtrema_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText;

      if (this.cccTest_LocalExtrema_Options[i][0] < 0 && this.cccTest_LocalExtrema_Options[i][1] < 0) {
        labelText = "Maximum".bold() + ": ";
      } else if (this.cccTest_LocalExtrema_Options[i][0] > 0 && this.cccTest_LocalExtrema_Options[i][1] > 0) {
        labelText = "Minimum".bold() + ": ";
      } else {
        labelText = "Saddle".bold() + ": ";
      }

      labelText += "a=" + this.cccTest_LocalExtrema_Options[i][0] + "; b=" + this.cccTest_LocalExtrema_Options[i][1] + "; m=" + this.cccTest_LocalExtrema_Options[i][2] + ";";

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openExtremaTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createFrequency() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.innerHTML = "1.5 Frequency:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.cccTest_Frequency_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "frequencyCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType("CCCTest", "Frequency"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_Frequency_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = "Frequency-Increases: " + this.cccTest_Frequency_Options[i][3];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openFrequencyTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createLittleBit() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.innerHTML = "1.6 Little Bit:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.cccTest_LittleBit_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "littlebitCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType("CCCTest", "LittleBit"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_LittleBit_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = "from ";

      if (this.cccTest_LittleBit_Options[i][0]) {
        labelText += this.cccTest_LittleBit_Options[i][3] * 100 + "% to ";
        labelText += this.cccTest_LittleBit_Options[i][4] * 100 + "%;";
      } else {
        labelText += this.cccTest_LittleBit_Options[i][3] + " to ";
        labelText += this.cccTest_LittleBit_Options[i][4] + ";";
      }

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openLittleBitTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createTreshold() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.innerHTML = "1.7 Treshold:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.cccTest_Treshold_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "tresholdCanvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingType("CCCTest", "Treshold"));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingOptions(this.cccTest_Treshold_Options[i]));
      this.worker_testCollection_CCCTest.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = "";

      if (this.cccTest_Treshold_Options[i][0]) {
        labelText = "m=" + this.cccTest_Treshold_Options[i][3] * 100 + "% < ";
        labelText += "T=" + this.cccTest_Treshold_Options[i][4] * 100 + "% < ";
        labelText += "M=" + this.cccTest_Treshold_Options[i][5] * 100 + "%; ";
      } else {


        labelText = "m=" + this.cccTest_Treshold_Options[i][3] + " < ";
        labelText += "T=" + this.cccTest_Treshold_Options[i][4] + " < ";
        labelText += "M=" + this.cccTest_Treshold_Options[i][5] + "; ";
      }

      labelText += "Type=";

      switch (this.cccTest_Treshold_Options[i][1]) {
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
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openTresholdTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createFunctionLocalMin() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.innerHTML = "2.1 Local Minimum:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.fctTest_LocalMin_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = this.fctTest_LocalMin_Options[i][1];
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingType("Collection", this.fctTest_LocalMin_Options[i][1]));
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingOptions(this.fctTest_LocalMin_Options[i]));
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = this.fctTest_LocalMin_Options[i][0];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openFctLocalMinimaTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createFunctionBowlShaped() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.innerHTML = "2.2 Bowl Shaped:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.fctTest_BowlShaped_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = this.fctTest_BowlShaped_Options[i][1];
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingType("Collection", this.fctTest_BowlShaped_Options[i][1]));
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingOptions(this.fctTest_BowlShaped_Options[i]));
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = this.fctTest_BowlShaped_Options[i][0];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openFctBowlShapedTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createFunctionValleyShaped() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.innerHTML = "2.3 Valley Shaped:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.fctTest_ValleyShaped_Options.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = this.fctTest_ValleyShaped_Options[i][1];
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingType("Collection", this.fctTest_ValleyShaped_Options[i][1]));
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingOptions(this.fctTest_ValleyShaped_Options[i]));
      this.worker_testCollection_Collection.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = this.fctTest_ValleyShaped_Options[i][0];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openFctValleyShapedTest(tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createRealWorld_MedicalDiv() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.innerHTML = "3.1 Medical:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.medicalLabels.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "rw_medical_canvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_RealWorldData.postMessage(this.inform_Worker_PushTestingType("RealData", undefined));
      this.inform_Worker_LoadRealWorldIMG("../../resource/realWorldData/medicalData/" + this.medicalFiles[i], this.realWorldCanvasIndex);
      this.realWorldCanvasIndex++;
      this.worker_testCollection_RealWorldData.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = this.medicalLabels[i];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      if (this.medicalAcknowlegments[i] != undefined)
        tmpSelection.appendChild(this.createAchnowledgments(this.medicalAcknowlegments[i]));

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openRealWorldTest("medical", tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createRealWorld_FlowSimDiv() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.innerHTML = "3.2 Scientific Flow Simulation:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.scientificFlowSimLabels.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "rw_scientificFlowSim_canvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      var tmpTestLabel = document.createElement('p');
      var labelText = this.scientificFlowSimLabels[i];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_RealWorldData.postMessage(this.inform_Worker_PushTestingType("RealData", undefined));
      this.inform_Worker_LoadRealWorldIMG("../../resource/realWorldData/scientificFlowSimulation/" + this.scientificFlowSimFiles[i], this.realWorldCanvasIndex);
      this.realWorldCanvasIndex++;
      this.worker_testCollection_RealWorldData.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      if (this.scientificFlowSimAcknowlegments[i] != undefined)
        tmpSelection.appendChild(this.createAchnowledgments(this.scientificFlowSimAcknowlegments[i]));

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openRealWorldTest("scientificFlowSim", tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createRealWorld_PhotographDiv() {

    var tmpTestDiv = document.createElement('div');
    tmpTestDiv.style.width = "90vw";
    tmpTestDiv.style.maxWidth = "90vw";
    tmpTestDiv.style.marginLeft = "5vw";

    var tmpDivLabel = document.createElement('h2');
    tmpDivLabel.innerHTML = "3.3 Photographs:";
    tmpTestDiv.appendChild(tmpDivLabel);

    var tmpDivRow = document.createElement('div');
    tmpDivRow.className = "class_Test_SelectorRow";
    tmpTestDiv.appendChild(tmpDivRow);

    for (var i = 0; i < this.photographsLabels.length; i++) {

      var tmpSelection = document.createElement('div');
      tmpSelection.className = "class_Test_Selector";

      var tmpCanvas = document.createElement('canvas');
      tmpCanvas.id = "rw_photographs_canvas_" + i;
      tmpSelection.appendChild(tmpCanvas);

      ///////////////////////////////////////////////////////////
      //// For Worker add canvas or canvasID
      this.worker_testCollection_RealWorldData.postMessage(this.inform_Worker_PushTestingType("RealData", undefined));
      this.inform_Worker_LoadRealWorldIMG("../../resource/realWorldData/photographs/" + this.photographsFiles[i], this.realWorldCanvasIndex);
      this.realWorldCanvasIndex++
      this.worker_testCollection_RealWorldData.postMessage(this.inform_Worker_PushTestingCanvas(tmpCanvas.id));
      ///////////////////////////////////////////////////////////

      var tmpTestLabel = document.createElement('p');
      var labelText = this.photographsLabels[i];

      tmpTestLabel.innerHTML = labelText;
      tmpSelection.appendChild(tmpTestLabel);

      if (this.photographsAcknowlegments[i] != undefined)
        tmpSelection.appendChild(this.createAchnowledgments(this.photographsAcknowlegments[i]));

      tmpSelection.onclick = (function(tmpID) {
        return function() {
          testingSection.element_singleTest.showElement();
          testingSection.element_testCollection.openRealWorldTest("photographs", tmpID);
        };
      })(i);

      tmpDivRow.appendChild(tmpSelection);
    }

    return tmpTestDiv;
  }

  createAchnowledgments(index) {

    var tmpLabel = document.createElement('p');

    var text = "We thank " + this.acknowlegments[index].blankLink(this.acknowlegmentsURL[index]) + " for provision of real world data.";

    tmpLabel.innerHTML = text;

    tmpLabel.onclick = function(event) {
      event.stopPropagation();
    };

    return tmpLabel;
  }

};
