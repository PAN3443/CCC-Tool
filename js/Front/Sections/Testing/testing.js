//////////////////////////////////////
/// Wait /////
///////////////////////////////////




function openTestSection(){

  var children = document.getElementById("id_CCCTest_FieldType_Select").children;
  for (var i = 0; i < children.length; i++) {
    children[i].disabled=true;
  }

  var selectobject=document.getElementById("id_CCCTest_Field_Select")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }

  selectobject=document.getElementById("id_TestSection_CMS_Select")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }

  for (var i = 0; i < myDesignsList.length; i++) {
    var optionCMS = document.createElement("option");
    optionCMS.innerHTML = myDesignsList[i].getColormapName();

    selectobject.add(optionCMS);
  }
  selectobject.selectedIndex = 0;

  switchTest(0);


}

function selectTestCMS(){

  globalCMS1 = cloneCMS(myDesignsList[document.getElementById("id_TestSection_CMS_Select").selectedIndex]);


  drawCanvasColormap("id_TestPage_CMS_VIS_ColormapLinear", globalCMS1);

  if(document.getElementById("id_TestPage_CCCTest_Div").style.display!="none")
  startCCCTest();

}

function switchTest(type){

  if (type==1) {
    return;
  }

  selectedMetric=type;

  document.getElementById("id_TestPage_CCCTest").style.background=styleNotActiveColor;
  document.getElementById("id_TestPage_CustomTest").style.background=styleNotActiveColor;


  document.getElementById("id_TestPage_CCCTest").style.color=styleNotActiveColorFont;
  document.getElementById("id_TestPage_CustomTest").style.color=styleNotActiveColorFont;

  document.getElementById("id_TestPage_CCCTest_Div").style.display="none";
  document.getElementById("id_TestPage_CustomTest_Div").style.display="none";

  switch (type) {
    case 0:
      document.getElementById("id_TestPage_CCCTest").style.background=styleActiveColor;
      document.getElementById("id_TestPage_CCCTest").style.color=styleActiveColorFont;

      document.getElementById("id_TestPage_CCCTest_Div").style.display="flex";

      break;
      case 1:
      document.getElementById("id_TestPage_CustomTest").style.background=styleActiveColor;
      document.getElementById("id_TestPage_CustomTest").style.color=styleActiveColorFont;

      document.getElementById("id_TestPage_CustomTest_Div").style.display="flex";

        break;
    default:
        switchMetricSettings(0);
  }

  selectTestCMS();

}

function startCCCTest(){

  var children = document.getElementById("id_CCCTest_FieldType_Select").children;
  for (var i = 0; i < children.length; i++) {
    children[i].disabled=true;
  }

  var selectobject=document.getElementById("id_CCCTest_Field_Select")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }


  allFieldsFinished=false;

  initTesttestField_WorkerJSON();


  //// JUMPS /////////////////////////////////
  if(document.getElementById("id_CCCTest_DoJump").checked){
    if(allJumpWorkersFinished=false){
      for (var i = 0; i < jumpWorkers_Array.length; i++) {
        if(jumpWorkers_Array[i]!=undefined)
          jumpWorkers_Array[i].terminate();
      }

      allJumpWorkersFinished=true;
    }
    startJumpFieldGeneration();
  }


  //////////////////////////////////////////////

}

function checkIfGenerationFinished(){

  if(document.getElementById("id_CCCTest_DoJump").checked && allJumpsFinished!=true)
    return;



  allJumpsFinished=true;

  /////////////////// fill field combo
  var selectobject = document.getElementById("id_CCCTest_FieldType_Select");
  var oldselectedIndex = selectobject.selectedIndex;

  if(document.getElementById("id_CCCTest_DoJump").checked){
    document.getElementById("id_CCCTest_FieldOption_Jump").disabled=false;
  }
  else{
    document.getElementById("id_CCCTest_FieldOption_Jump").disabled=true;
  }
  var newSelectedIndex = -1;

  if (oldselectedIndex>-1)
    if(selectobject.children[oldselectedIndex].disabled==false)
      newSelectedIndex = oldselectedIndex;


  if(newSelectedIndex==-1){
    for (var i = 0; i < selectobject.children.length; i++) {
      if(selectobject.children[i].disabled==false){
        newSelectedIndex=i;
        break;
      }
    }
  }
  selectobject.selectedIndex =  newSelectedIndex;
  selectTestFieldType();
}



function selectTestFieldType(){

  if(document.getElementById("id_CCCTest_FieldType_Select").selectedIndex == -1){

    var children = document.getElementById("id_CCCTest_FieldType_Select").children;
    var allDisabled = true;
    for (var i = 0; i < children.length; i++) {
      if(children[i].disabled==false){
        document.getElementById("id_CCCTest_FieldType_Select").selectedIndex=i;
        break;
      }
    }
    if(allDisabled)
      return;
  }

  var selectobject=document.getElementById("id_CCCTest_Field_Select")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }


  switch (document.getElementById("id_CCCTest_FieldType_Select").selectedIndex) {
    case 0: // jumps
      for (var i = 0; i < jumpTestFields_Array.length; i++) {
        var option = document.createElement("option");
        option.innerHTML = jumpTestFields_Names[i];

        selectobject.add(option);
      }
      selectobject.selectedIndex = 0;
      selectTestField(false);
      break;
    default:

  }


}


function selectTestField(doFullWindow){

  switch (document.getElementById("id_CCCTest_FieldType_Select").selectedIndex) {
    case 0: // jumps

        if(doFullWindow)
          drawTestField(jumpTestFields_Array[document.getElementById("id_CCCTest_Field_Select").selectedIndex],"id_PopUp_FullTestFuctionCanvas");
        else
          drawTestField(jumpTestFields_Array[document.getElementById("id_CCCTest_Field_Select").selectedIndex],"id_CCCTestCanvas");


      break;
    default:

  }

}

function drawTestField(field,canvasID){

  var canvasPlot = document.getElementById(canvasID);
  var canvasCtx = canvasPlot.getContext("2d");

  var pixelsPerXStep = Math.floor(testingFieldResolution/field.getXDim());
  var pixelsPerYStep = Math.floor(testingFieldResolution/field.getYDim());
  var imageDIMX = field.getXDim()*pixelsPerXStep;
  var imageDIMY = field.getYDim()*pixelsPerXStep;

  if(field==undefined){
    canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);
    return;
  }

  canvasPlot.width = imageDIMX;
  canvasPlot.height = imageDIMY;

   canvasCtx.mozImageSmoothingEnabled = false;
   canvasCtx.webkitImageSmoothingEnabled = false;
   canvasCtx.msImageSmoothingEnabled = false;
   canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
   canvasCtx.oImageSmoothingEnabled = false;

  var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height); //getImageData(0, 0, canvasPlot.width, canvasPlot.height);


  for(var x=0; x<field.getXDim(); x++){

    for (var subX = 0; subX < pixelsPerXStep; subX++) {

      var currentX = x*pixelsPerXStep+subX;

      for(var y=0; y<field.getYDim(); y++){

          var tmpColor = field.getFieldColor(x,y);

          for (var subY = 0; subY < pixelsPerYStep; subY++) {

            var currentY = y*pixelsPerYStep+subY;

            var index = (currentX + currentY * canvasPlot.width) * 4;
            canvasData.data[index + 0] = Math.round(tmpColor.getRValue() * 255); // r
            canvasData.data[index + 1] = Math.round(tmpColor.getGValue() * 255); // g
            canvasData.data[index + 2] = Math.round(tmpColor.getBValue() * 255); // b
            canvasData.data[index + 3] = 255; //a

          }

      }

    }

  }

  canvasCtx.putImageData(canvasData, 0, 0);

}



/* Source: https://stackoverflow.com/questions/12796513/html5-canvas-to-png-file*/
/* REGISTER DOWNLOAD HANDLER */
/* Only convert the canvas to Data URL when the user clicks.
   This saves RAM and CPU ressources in case this feature is not required. */
function downloadTestImage() {

  var canvas = document.getElementById("id_CCCTestCanvas");

  var dt = canvas.toDataURL('image/png');
  /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
  dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

  /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
  dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

  this.href = dt;
}

function initTesttestField_WorkerJSON(){
  testField_WorkerJSON = {};

  testField_WorkerJSON['testFieldType'] = undefined;
  testField_WorkerJSON['testFieldGenerationType'] = undefined;
  testField_WorkerJSON['testFieldIndex'] = undefined;

  testField_WorkerJSON['testFieldDimX'] = undefined;
  testField_WorkerJSON['testFieldDimY'] = undefined;

  testField_WorkerJSON['testFieldRangeStart'] = 0;
  testField_WorkerJSON['testFieldRangeEnd'] = 1;

  testField_WorkerJSON['colorspace'] = globalCMS1.getInterpolationSpace();
  testField_WorkerJSON['refVal'] = [];
  testField_WorkerJSON['key1cVal1'] = [];
  testField_WorkerJSON['key1cVal2'] = [];
  testField_WorkerJSON['key1cVal3'] = [];
  testField_WorkerJSON['key2cVal1'] = [];
  testField_WorkerJSON['key2cVal2'] = [];
  testField_WorkerJSON['key2cVal3'] = [];
  testField_WorkerJSON['MoT'] = [];

  testField_WorkerJSON['transferMatrixColorXYZ'] = tmXYZ_Selected;
  testField_WorkerJSON['transferMatrixColorXYZ_Inv'] = tmXYZ_Selected_Inv;

  testField_WorkerJSON['din99_kE'] = din99_kE;
  testField_WorkerJSON['din99_kCH'] = din99_kCH;
  testField_WorkerJSON['cielab_ref_X'] = cielab_ref_X;
  testField_WorkerJSON['cielab_ref_Y'] = cielab_ref_Y;
  testField_WorkerJSON['cielab_ref_Z'] = cielab_ref_Z;

  testField_WorkerJSON['nanC1'] = undefined;
  testField_WorkerJSON['nanC2'] = undefined;
  testField_WorkerJSON['nanC3'] = undefined;

  testField_WorkerJSON['aboveC1'] = undefined;
  testField_WorkerJSON['aboveC2'] = undefined;
  testField_WorkerJSON['aboveC3'] = undefined;

  testField_WorkerJSON['belowC1'] = undefined;
  testField_WorkerJSON['belowC2'] = undefined;
  testField_WorkerJSON['belowC3'] = undefined;


  var tmpRefVal = [];
  var tmpkey1CVal1 = [];
  var tmpkey1CVal2 = [];
  var tmpkey1CVal3 = [];
  var tmpkey2CVal1 = [];
  var tmpkey2CVal2 = [];
  var tmpkey2CVal3 = [];
  var tmpMoT = [];


  for (var i = 0; i < globalCMS1.getKeyLength()-1; i++) {

    tmpRefVal.push(globalCMS1.getKey(i).getRefPosition());
    var color1=globalCMS1.getKey(i).getRightKeyColor(globalCMS1.getInterpolationSpace());
    var color2=globalCMS1.getKey(i+1).getLeftKeyColor(globalCMS1.getInterpolationSpace());

    if(color1!=undefined){
      tmpkey1CVal1.push(color1.get1Value());
      tmpkey1CVal2.push(color1.get2Value());
      tmpkey1CVal3.push(color1.get3Value());
    }
    else{
      tmpkey1CVal1.push(undefined);
      tmpkey1CVal2.push(undefined);
      tmpkey1CVal3.push(undefined);
    }

    if(color2!=undefined){
      tmpkey2CVal1.push(color2.get1Value());
      tmpkey2CVal2.push(color2.get2Value());
      tmpkey2CVal3.push(color2.get3Value());
    }
    else{
      tmpkey2CVal1.push(undefined);
      tmpkey2CVal2.push(undefined);
      tmpkey2CVal3.push(undefined);
    }

    tmpMoT.push(globalCMS1.getKey(i).getMoT());
  }
  tmpRefVal.push(globalCMS1.getKey(globalCMS1.getKeyLength()-1).getRefPosition());
  tmpMoT.push(globalCMS1.getKey(globalCMS1.getKeyLength()-1).getMoT());

  var tmpNaN = globalCMS1.getNaNColor("rgb");
  var tmpAbove = globalCMS1.getAboveColor("rgb");
  var tmpBelow = globalCMS1.getBelowColor("rgb");

    testField_WorkerJSON.colorspace = globalCMS1.getInterpolationSpace();
    testField_WorkerJSON.refVal=tmpRefVal;
    testField_WorkerJSON.key1cVal1=tmpkey1CVal1;
    testField_WorkerJSON.key1cVal2=tmpkey1CVal2;
    testField_WorkerJSON.key1cVal3=tmpkey1CVal3;
    testField_WorkerJSON.key2cVal1=tmpkey2CVal1;
    testField_WorkerJSON.key2cVal2=tmpkey2CVal2;
    testField_WorkerJSON.key2cVal3=tmpkey2CVal3;
    testField_WorkerJSON.MoT = tmpMoT;
    testField_WorkerJSON.din99_kE = din99_kE;
    testField_WorkerJSON.din99_kCH = din99_kCH;
    testField_WorkerJSON.cielab_ref_X = cielab_ref_X;
    testField_WorkerJSON.cielab_ref_Y = cielab_ref_Y;
    testField_WorkerJSON.cielab_ref_Z = cielab_ref_Z;


    testField_WorkerJSON.simColorBlind = doColorblindnessSim;

    testField_WorkerJSON.transferMatrixColorXYZ = tmXYZ_Selected;
    testField_WorkerJSON.transferMatrixColorXYZ_Inv = tmXYZ_Selected_Inv;
    testField_WorkerJSON.transferMatrixColorLMS = tmLMS_Selected;
    testField_WorkerJSON.transferMatrixColorLMS_Inv = tmLMS_Selected_Inv;
    testField_WorkerJSON.transferMatrixColorSIM = sim_AdaptiveColorblindness;

    testField_WorkerJSON.nanC1 = tmpNaN.get1Value();
    testField_WorkerJSON.nanC2 = tmpNaN.get2Value();
    testField_WorkerJSON.nanC3 = tmpNaN.get3Value();

    testField_WorkerJSON.aboveC1 = tmpAbove.get1Value();
    testField_WorkerJSON.aboveC2 = tmpAbove.get2Value();
    testField_WorkerJSON.aboveC3 = tmpAbove.get3Value();

    testField_WorkerJSON.belowC1 = tmpBelow.get1Value();
    testField_WorkerJSON.belowC2 = tmpBelow.get2Value();
    testField_WorkerJSON.belowC3 = tmpBelow.get3Value();


}