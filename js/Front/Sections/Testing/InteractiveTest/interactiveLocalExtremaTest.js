
function openExtremaTest(tmpID){

var tmpArray = [];
for (var i = 0; i < cccTest_LocalExtrema_Options[tmpID].length; i++) {
  tmpArray.push(cccTest_LocalExtrema_Options[tmpID][i])
}
cccTest_NewLocalExtrema_Options = tmpArray;

initNewTest();
document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 3;
selectNewExtremaTestType();

}

function selectNewExtremaTestType(){

  document.getElementById("id_TestPage_Dimension_Div").style.display="block";
  document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
  document.getElementById("id_TestPage_fitToCMS_Div").style.display="flex";
  document.getElementById("id_TestPage_doRatioCheckbox").disabled = true;
  document.getElementById("id_TestPage_doRatioLabel").style.color = "grey";
  document.getElementById("id_TestPage_newTestInfoText").style.display="block";
  document.getElementById("id_TestPage_fitToCMS").checked = cccTest_NewLocalExtrema_Options[3];

  document.getElementById("id_TestPage_NewTest_V1").innerHTML="a-Value: ";
  document.getElementById("id_TestPage_NewTest_V2").innerHTML="b-Value: ";
  document.getElementById("id_TestPage_NewTest_V3").innerHTML="m-Value: ";

  document.getElementById("id_TestPage_NewTest_I1").value= cccTest_NewLocalExtrema_Options[0];
  document.getElementById("id_TestPage_NewTest_I2").value= cccTest_NewLocalExtrema_Options[1];
  document.getElementById("id_TestPage_NewTest_I3").value= cccTest_NewLocalExtrema_Options[2];

  document.getElementById("id_TestPage_GridDimX").value=cccTest_NewLocalExtrema_Options[4];
  document.getElementById("id_TestPage_GridDimY").value=cccTest_NewLocalExtrema_Options[5];

  newTestExtremaInfoText();
  extremaTest_startWorker(cccTest_NewLocalExtrema_Options);
}


function updateExtremaTestVariables(){
    cccTest_NewLocalExtrema_Options[3]=document.getElementById("id_TestPage_fitToCMS").checked;

    cccTest_NewLocalExtrema_Options[0]= parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
    cccTest_NewLocalExtrema_Options[1]= parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    cccTest_NewLocalExtrema_Options[2]= parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);

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

    cccTest_NewLocalExtrema_Options[4]= dimX;
    cccTest_NewLocalExtrema_Options[5]= dimY;

    newTestExtremaInfoText();
    extremaTest_startWorker(cccTest_NewLocalExtrema_Options);
}

function newTestExtremaInfoText(){

  var diagnoseText = "Type: ";

  if(cccTest_NewLocalExtrema_Options[0]==0 || cccTest_NewLocalExtrema_Options[1]==0){
    diagnoseText += "Undefined\n".bold();
  }
  else if(cccTest_NewLocalExtrema_Options[0]>0){
    if(cccTest_NewLocalExtrema_Options[1]>0){
      diagnoseText += "Maximum\n".bold();
    }
    else {
      diagnoseText += "Saddle\n".bold();
    }
  }
  else{
    if(cccTest_NewLocalExtrema_Options[1]<0){
      diagnoseText += "Minimum\n".bold();
    }
    else {
      diagnoseText += "Saddle\n".bold();
    }
  }

  var standartText = "\nMaximum: a>0 and b>0\nMinimum: a<0 and b<0\nSaddle: a<0 and b>0 or a>0 and b<0".italics();

  document.getElementById("id_TestPage_newTestInfoText").innerHTML="Info:\n".bold()+diagnoseText+standartText;
}
