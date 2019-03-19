
function openFrequencyTest(tmpID){

var tmpArray = [];
for (var i = 0; i < cccTest_Frequency_Options[tmpID].length; i++) {
  tmpArray.push(cccTest_Frequency_Options[tmpID][i])
}
cccTest_NewFrequency_Options = tmpArray;

initNewTest();
document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 4;
selectNewFrequencyTestType();

}

function selectNewFrequencyTestType(){

  document.getElementById("id_TestPage_Dimension_Div").style.display="block";
  //document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

  //document.getElementById("id_TestPage_NewTest_V1").innerHTML="Start Frequency: ";
  document.getElementById("id_TestPage_NewTest_V2").innerHTML="#Increases: ";
  document.getElementById("id_TestPage_NewTest_V3").innerHTML="Wava"+"Start".sub()+": ";
  document.getElementById("id_TestPage_NewTest_V4").innerHTML="Wava"+"End".sub()+": ";

  //document.getElementById("id_TestPage_NewTest_I1").value=cccTest_NewFrequency_Options[2];
  document.getElementById("id_TestPage_NewTest_I2").value=cccTest_NewFrequency_Options[3];
  document.getElementById("id_TestPage_NewTest_I3").value=cccTest_NewFrequency_Options[4];
  document.getElementById("id_TestPage_NewTest_I4").value=cccTest_NewFrequency_Options[5];

  document.getElementById("id_TestPage_GridDimX").value=cccTest_NewFrequency_Options[6];
  document.getElementById("id_TestPage_GridDimY").value=cccTest_NewFrequency_Options[7];

  document.getElementById("id_TestPage_NewTest_I1").min=1;
  document.getElementById("id_TestPage_NewTest_I2").min=0;



  updateNoise();
  frequency_startWorker(cccTest_NewFrequency_Options);
}

function updateFrequencyTestVariables (){

  /*var startFrequency = parseInt(document.getElementById("id_TestPage_NewTest_I1").value);
  document.getElementById("id_TestPage_NewTest_I1").value=startFrequency;
  if(isNaN(startFrequency)){
    openAlert("Invalid input for the start frequncy!");
    return;
  }
  if(startFrequency<1){
    openAlert("Invalid input for the start frequncy! The value has to be an integer and greater than null!");
    return;
  }*/


  var increases = parseInt(document.getElementById("id_TestPage_NewTest_I2").value);
  document.getElementById("id_TestPage_NewTest_I2").value=increases;

  if(isNaN(increases)){
    openAlert("Invalid input for the number of increases!");
    return;
  }
  if(increases<0){
    openAlert("Invalid input for the number of increases! The value has to be an integer and positive!");
    return;
  }

  var waveStart = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
  document.getElementById("id_TestPage_NewTest_I3").value=waveStart;
  if(isNaN(waveStart)){
    openAlert("Invalid input for the number of wave start!");
    return;
  }
  if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (waveStart<0 || waveStart>1.0)){
    openAlert("Invalid value for the wave start! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
    return;
  }

  var waveEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
  document.getElementById("id_TestPage_NewTest_I4").value=waveEnd;
  if(isNaN(waveEnd)){
    openAlert("Invalid input for the number of wave end!");
    return;
  }
  if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (waveStart<0 || waveStart>1.0)){
    openAlert("Invalid value for the wave end! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
    return;
  }

  if(waveStart>=waveEnd){
    openAlert("Invalid value for the wave start/end! The value for the wave start has to be smaller than the value for the wave end!");
    return;
  }

  // check x,y DIM
  var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value);
  document.getElementById("id_TestPage_GridDimX").value=dimX;
  if(isNaN(dimX)){
    openAlert("Invalid input for the Grid x-dimension!");
    return;
  }
  if(dimX<2){
    openAlert("Invalid input for the Grid x-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
    return;
  }

  var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value);
  document.getElementById("id_TestPage_GridDimY").value=dimY;
  if(isNaN(dimY)){
    openAlert("Invalid input for the Grid y-dimension!");
    return;
  }
  if(dimY<2){
    openAlert("Invalid input for the Grid y-dimension. The exponent has to be an integer and has to be 2 or greater than 2.");
    return;
  }

  //cccTest_NewFrequency_Options[2]=startFrequency;
  cccTest_NewFrequency_Options[3]=increases;
  cccTest_NewFrequency_Options[4]=waveStart;
  cccTest_NewFrequency_Options[5]=waveEnd;
  cccTest_NewFrequency_Options[6]=dimX;
  cccTest_NewFrequency_Options[7]=dimY;

  updateNoise();
  frequency_startWorker(cccTest_NewFrequency_Options);
}
