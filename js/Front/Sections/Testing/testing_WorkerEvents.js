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

  testField_WorkerJSON=jsonAddGeneral(testField_WorkerJSON);
  testField_WorkerJSON=jsonAddCMSInfo(testField_WorkerJSON);
  testField_WorkerJSON=jsonAddTestfield(testField_WorkerJSON);
  
}
