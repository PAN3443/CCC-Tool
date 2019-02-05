function workerEvent_gradientTestField(e){

  var data = e.data;


  if(data.isUpdate){

    gradientWorkerStatus_Array[data.index]=data.status;

    var currentStatus = 0;
    var part = 100/gradientWorkerStatus_Array.length;

    for (var i = 0; i < gradientWorkerStatus_Array.length; i++) {
      currentStatus+=gradientWorkerStatus_Array[i]/100*part;
    }

    document.getElementById("id_TestGradient_Status").style.width = currentStatus+"%";


  }
  else{

    for (var i = 0; i < data.testFieldVal.length; i++) {
        var y = (i / gradientTestFields_Array[data.index].getXDim()) >> 0
        var x = i-(y*gradientTestFields_Array[data.index].getXDim())
        var newRGB = new classColor_RGB(data.cVal1[i],data.cVal2[i],data.cVal3[i]);
        var value = data.testFieldVal[i];



        gradientTestFields_Array[data.index].setFieldValue(x,y,value,newRGB);
    }

    gradientWorkerStatus_Array[data.index]=100;
    document.getElementById("id_TestGradient_Status").style.width = "100%";

    for (var i = 0; i < gradientWorkerStatus_Array.length; i++) {
      if(gradientWorkerStatus_Array[i]<100){
        return;
      }
    }


    document.getElementById("id_TestGradient_Check").style.visibility = "visible";
    allGradientFinished=true;

    checkIfGenerationFinished();

  }


}
