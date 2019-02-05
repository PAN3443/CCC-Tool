function workerEvent_frequencyTestField(e){

  var data = e.data;


  if(data.isUpdate){

    frequencyWorkerStatus_Array[data.index]=data.status;

    var currentStatus = 0;
    var part = 100/frequencyWorkerStatus_Array.length;

    for (var i = 0; i < frequencyWorkerStatus_Array.length; i++) {
      currentStatus+=frequencyWorkerStatus_Array[i]/100*part;
    }

    document.getElementById("id_TestFrequency_Status").style.width = currentStatus+"%";


  }
  else{

    for (var i = 0; i < data.testFieldVal.length; i++) {
        var y = (i / frequencyTestFields_Array[data.index].getXDim()) >> 0
        var x = i-(y*frequencyTestFields_Array[data.index].getXDim())
        var newRGB = new classColor_RGB(data.cVal1[i],data.cVal2[i],data.cVal3[i]);
        var value = data.testFieldVal[i];

        frequencyTestFields_Array[data.index].setFieldValue(x,y,value,newRGB);
    }

    frequencyWorkerStatus_Array[data.index]=100;
    document.getElementById("id_TestFrequency_Status").style.width = "100%";

    for (var i = 0; i < frequencyWorkerStatus_Array.length; i++) {
      if(frequencyWorkerStatus_Array[i]<100){
        return;
      }
    }


    document.getElementById("id_TestFrequency_Check").style.visibility = "visible";
    allFrequencyFinished=true;

    checkIfGenerationFinished();

  }


}
