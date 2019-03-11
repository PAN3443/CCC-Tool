function workerEvent_showTestField(e) {

  var data = e.data;

  if(data.isUpdate){
    document.getElementById("id_Test_StatusBar").style.width = data.status+"%";
  }
  else{

    if(data.includeCellValues){
      userTestGlobalField.setCellValues(true);
    }
    else {
      userTestGlobalField.setCellValues(false);
    }

    for (var i = 0; i < data.testFieldVal.length; i++) {
      var y = (i / userTestGlobalField.getXDim()) >> 0;
      var x = i - (y * userTestGlobalField.getXDim());
      var newRGB = new classColor_RGB(data.cVal1[i], data.cVal2[i], data.cVal3[i]);

      var value = data.testFieldVal[i];
      var xPos = data.positions[i][0];
      var yPos = data.positions[i][1];

      var greyVal = data.gVal[i];
      var greyRGB = undefined;
      if(greyVal==undefined || greyVal>1.0 || greyVal<0){
        greyRGB = new classColor_RGB(1.0,0,0);
      }
      else{
        greyRGB = new classColor_RGB(greyVal, greyVal,greyVal);
      }
      userTestGlobalField.setFieldValue(x, y, value, newRGB, greyRGB,xPos,yPos);
    }

    usertestWorkerfinished = true;
    drawTestField(userTestGlobalField,false);
    document.getElementById("id_Test_StatusBar").style.width = "100%";
  }

}


function workerEvent_drawTest(e) {

  var data = e.data;

  if(data.isUpdate)
    return;

  var canvasPlot = document.getElementById(data.canvasID);
  var canvasCtx = canvasPlot.getContext("2d");

  if(data.includeCellValues){
    canvasPlot.width = data.width-1;
    canvasPlot.height = data.height-1;
  }
  else {
    canvasPlot.width = data.width;
    canvasPlot.height = data.height;
  }

   canvasCtx.mozImageSmoothingEnabled = false;
   canvasCtx.webkitImageSmoothingEnabled = false;
   canvasCtx.msImageSmoothingEnabled = false;
   canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
   canvasCtx.oImageSmoothingEnabled = false;

  var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height);

  for(var y=0; y<canvasPlot.height; y++){
    for(var x=0; x<canvasPlot.width; x++){

          var indexColor = y*data.width+x;
          var red = Math.round(data.cVal1[indexColor]*255);
          var green = Math.round(data.cVal2[indexColor]*255);
          var blue = Math.round(data.cVal3[indexColor]*255);

          var index = (x + (canvasPlot.height-(y+1)) * canvasPlot.width) * 4;
          canvasData.data[index + 0] = red; // r
          canvasData.data[index + 1] = green; // g
          canvasData.data[index + 2] = blue; // b
          canvasData.data[index + 3] = 255; //a

    }

  }

  canvasCtx.putImageData(canvasData, 0, 0);

}




function initTesttestField_WorkerJSON(){
  testField_WorkerJSON = {};

  testField_WorkerJSON['testFieldType'] = undefined;
  testField_WorkerJSON['testFieldGenerationType'] = undefined;
  testField_WorkerJSON['testFieldIndex'] = undefined;

  testField_WorkerJSON['testFieldDimX'] = undefined;
  testField_WorkerJSON['testFieldDimY'] = undefined;

  testField_WorkerJSON['originIsRelevant'] = false;
  testField_WorkerJSON['functionDim'] = undefined;


  /*testField_WorkerJSON['originPosX'] = 0;
  testField_WorkerJSON['originPosY'] = 0;
  testField_WorkerJSON['stepXDirection'] = 0.01;
  testField_WorkerJSON['stepYDirection'] = 0.01;
  testField_WorkerJSON['originIsCenter'] = true;*/

  testField_WorkerJSON['testFieldVar_ratio'] = false;
  testField_WorkerJSON['testFieldRangeStart'] = 0;
  testField_WorkerJSON['testFieldRangeEnd'] = 1;

  testField_WorkerJSON['canvasID'] = undefined;

  //// Additional Field Variables
  testField_WorkerJSON['testFieldVar_a'] = undefined;
  testField_WorkerJSON['testFieldVar_b'] = undefined;
  testField_WorkerJSON['testFieldVar_c'] = undefined;
  testField_WorkerJSON['testFieldVar_d'] = undefined;
  testField_WorkerJSON['testFieldVar_e'] = undefined;
  testField_WorkerJSON['testFieldVar_f'] = undefined;

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
