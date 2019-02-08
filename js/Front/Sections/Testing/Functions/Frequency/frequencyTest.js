
function startFrequencyFieldGeneration(){

    document.getElementById("id_TestFrequency_Status").style.width = "0%";
    document.getElementById("id_TestFrequency_Check").style.visibility = "hidden";

    allFrequencyFinished=false;
    allFrequencyWorkersFinished=false;

    // delete fields
    frequencyTestFields_Array=[];
    frequencyTestFields_Names=[];
    frequencyWorkers_Array=[];
    frequencyWorkerStatus_Array=[];

    if(useCMSRangeForFrequencyFields){
      testField_WorkerJSON.testFieldRangeStart = globalCMS1.getRefPosition(0);
      testField_WorkerJSON.testFieldRangeEnd = globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);
    }
    else{
      testField_WorkerJSON.testFieldRangeStart = frequencyFieldRangeStart;
      testField_WorkerJSON.testFieldRangeEnd = frequencyFieldRangeEnd;
    }

    // generate fields
    frequencyWorkerStatus_Array.push(0,0,0);
    frequencyTestFields_Names.push("Marschner Lobb Test (Step:0.01, Dim:600, Alpha: 0.25, f_M: 6.00)","Marschner Lobb Test (Step:0.05, Dim:600, Alpha: 0.25, f_M: 6.00)","Marschner Lobb Test (Step:0.1, Dim:600, Alpha: 0.25, f_M: 6.00)");
    frequency_startWorker("Marschner-Lobb", 600, 0.01, 0.25, 6.0);
    frequency_startWorker("Marschner-Lobb", 600, 0.05, 0.25, 6.0);
    frequency_startWorker("Marschner-Lobb", 600, 0.1, 0.25, 6.0);

    frequencyWorkerStatus_Array.push(0,0,0);
    frequencyTestFields_Names.push("Cross-in-Tray Test (Step:0.01)","Cross-in-Tray Test (Step:0.05)","Cross-in-Tray Test (Step:0.1)");
    frequency_startWorker("Cross-in-Tray", 600, 0.01, undefined, undefined);
    frequency_startWorker("Cross-in-Tray", 600, 0.05, undefined, undefined);
    frequency_startWorker("Cross-in-Tray", 600, 0.1, undefined, undefined);




}


function frequency_startWorker(type,n,steplength, alpha, f_M){

  var newWorker;
  var globalTestField = new class_TestField(n,n);
  frequencyTestFields_Array.push(globalTestField);

  testField_WorkerJSON.originIsRelevant=true;

  testField_WorkerJSON.testFieldType = 99;
  testField_WorkerJSON.testFieldGenerationType = type;
  testField_WorkerJSON.testFieldIndex = frequencyWorkers_Array.length;

  testField_WorkerJSON.originPosX = 0;
  testField_WorkerJSON.originPosY = 0;

  testField_WorkerJSON.stepXDirection = steplength;
  testField_WorkerJSON.stepYDirection = steplength;

  testField_WorkerJSON.marschnerLopp_Alpha = alpha;
  testField_WorkerJSON.marschnerLopp_f_M = f_M;

  testField_WorkerJSON.testFieldDimX = n ;
  testField_WorkerJSON.testFieldDimY = n;

  frequencyWorkers_Array.push(newWorker);

  mappingWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');
  mappingWorker.addEventListener('message', workerEvent_frequencyTestField, false);


  mappingWorker.postMessage(testField_WorkerJSON);


}


function removeFrequencyFields(){


    document.getElementById("id_TestFrequency_Status").style.width = "0%";
    document.getElementById("id_TestFrequency_Check").style.visibility = "hidden";

    if(allFrequencyWorkersFinished=false){
      for (var i = 0; i < frequencyWorkers_Array.length; i++) {
        if(frequencyWorkers_Array[i]!=undefined)
          frequencyWorkers_Array[i].terminate();
      }

      allFrequencyWorkersFinished=true;
    }

    frequencyTestFields_Array=[];
    frequencyTestFields_Names=[];
    frequencyWorkers_Array=[];
    frequencyWorkerStatus_Array=[];

    if(document.getElementById("id_CCCTest_FieldType_Select").selectedIndex == 1){
      var selectobject=document.getElementById("id_CCCTest_Field_Select")
      for (var i=selectobject.length-1; i>=0; i--){
         selectobject.remove(i);
      }
    }

    selectCCCTestField(false);

    if(document.getElementById("id_CCCTest_DoFrequency").checked){
      allFrequencyFinished=false;
      startFrequencyFieldGeneration();
    }
    else{
      allFrequencyFinished=true;
      document.getElementById("id_CCCTest_FieldOption_Frequency").disabled=true;
    }



}
