function workerEvent_JumpTestField(e){

  var data = e.data;


  if(data.isUpdate){

    jumpWorkerStatus_Array[data.index]=data.status;

    var currentStatus = 0;
    var part = 100/jumpWorkerStatus_Array.length;

    for (var i = 0; i < jumpWorkerStatus_Array.length; i++) {
      currentStatus+=jumpWorkerStatus_Array[i]/100*part;
    }

    document.getElementById("id_TestJump_Status").style.width = currentStatus+"%";


  }
  else{


    for (var i = 0; i < data.testFieldVal.length; i++) {
        var y = (i / jumpTestFields_Array[data.index].getXDim()) >> 0
        var x = i-(y*jumpTestFields_Array[data.index].getXDim())
        var newRGB = new classColor_RGB(data.cVal1[i],data.cVal2[i],data.cVal3[i]);
        var value = data.testFieldVal[i];

        jumpTestFields_Array[data.index].setFieldValue(x,y,value,newRGB);
    }


    for (var i = 0; i < jumpWorkerStatus_Array.length; i++) {
      if(jumpWorkerStatus_Array[i]<100){
        return;
      }
    }


    document.getElementById("id_TestJump_Check").style.visibility = "visible";
    allJumpsFinished=true;

    checkIfGenerationFinished();

  }


}
