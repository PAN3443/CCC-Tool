
function startGradientFieldGeneration(){

    document.getElementById("id_TestGradient_Status").style.width = "0%";
    document.getElementById("id_TestGradient_Check").style.visibility = "hidden";

    allGradientFinished=false;
    allGradientWorkersFinished=false;

    // delete fields
    gradientTestFields_Array=[];
    gradientTestFields_Names=[];
    gradientWorkers_Array=[];
    gradientWorkerStatus_Array=[];

    if(useCMSRangeForGradientFields){
      testField_WorkerJSON.testFieldRangeStart = globalCMS1.getRefPosition(0);
      testField_WorkerJSON.testFieldRangeEnd = globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);
    }
    else{
      testField_WorkerJSON.testFieldRangeStart = gradientFieldRangeStart;
      testField_WorkerJSON.testFieldRangeEnd = gradientFieldRangeEnd;
    }

    // generate fields
    // upstairs
    gradientWorkerStatus_Array.push(0,0,0,0,0);
    gradientTestFields_Names.push("Gradient StartLine=0% Dim=750","Gradient StartLine=20% Dim=750","Gradient StartLine=40% Dim=750","Gradient StartLine=60% Dim=750","Gradient StartLine=80% Dim=750");
    var tmpDis = testField_WorkerJSON.testFieldRangeEnd - testField_WorkerJSON.testFieldRangeStart;
    gradient_startWorker(0, testField_WorkerJSON.testFieldRangeStart,750);
    gradient_startWorker(0, testField_WorkerJSON.testFieldRangeStart+tmpDis*0.2,750);
    gradient_startWorker(0, testField_WorkerJSON.testFieldRangeStart+tmpDis*0.4,750);
    gradient_startWorker(0, testField_WorkerJSON.testFieldRangeStart+tmpDis*0.6,750);
    gradient_startWorker(0, testField_WorkerJSON.testFieldRangeStart+tmpDis*0.8,750);

}


function gradient_startWorker(type, startLineValue, dim ){

  var newWorker;
  var globalTestField = new class_TestField(dim,dim);
  gradientTestFields_Array.push(globalTestField);

  testField_WorkerJSON.originIsRelevant=false;

  testField_WorkerJSON.testFieldType = 1;
  testField_WorkerJSON.testFieldGenerationType = type;
  testField_WorkerJSON.testFieldIndex = gradientWorkers_Array.length;

  testField_WorkerJSON.testFieldStartLineValue = startLineValue;
  testField_WorkerJSON.testFieldDimX = dim;
  testField_WorkerJSON.testFieldDimY = dim;

  gradientWorkers_Array.push(newWorker);

  mappingWorker = new Worker('js/Front/Sections/Testing/testingWorker.js');
  mappingWorker.addEventListener('message', workerEvent_gradientTestField, false);


  mappingWorker.postMessage(testField_WorkerJSON);


}


function removeGradientFields(){


    document.getElementById("id_TestGradient_Status").style.width = "0%";
    document.getElementById("id_TestGradient_Check").style.visibility = "hidden";

    if(allGradientWorkersFinished=false){
      for (var i = 0; i < gradientWorkers_Array.length; i++) {
        if(gradientWorkers_Array[i]!=undefined)
          gradientWorkers_Array[i].terminate();
      }

      allGradientWorkersFinished=true;
    }

    gradientTestFields_Array=[];
    gradientTestFields_Names=[];
    gradientWorkers_Array=[];
    gradientWorkerStatus_Array=[];

    if(document.getElementById("id_CCCTest_FieldType_Select").selectedIndex == 1){
      var selectobject=document.getElementById("id_CCCTest_Field_Select")
      for (var i=selectobject.length-1; i>=0; i--){
         selectobject.remove(i);
      }
    }

    selectCCCTestField(false);

    if(document.getElementById("id_CCCTest_DoGradient").checked){
      allGradientFinished=false;
      startGradientFieldGeneration();
    }
    else{
      allGradientFinished=true;
      document.getElementById("id_CCCTest_FieldOption_Gradient").disabled=true;
    }



}
