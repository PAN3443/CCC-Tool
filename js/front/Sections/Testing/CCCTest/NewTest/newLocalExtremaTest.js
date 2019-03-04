function selectNewExtremaTestType(){

  document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
  document.getElementById("id_TestPage_fitToCMS_Div").style.display="flex";
  document.getElementById("id_TestPage_doRatioCheckbox").disabled = true;
  document.getElementById("id_TestPage_newTestInfoText").style.display="block";
  document.getElementById("id_TestPage_fitToCMS").checked = cccTest_NewLocalExtrema_Options[3];

  document.getElementById("id_TestPage_NewTest_V1").innerHTML="a-Value: ";
  document.getElementById("id_TestPage_NewTest_V2").innerHTML="b-Value: ";
  document.getElementById("id_TestPage_NewTest_V3").innerHTML="m-Value: ";

  document.getElementById("id_TestPage_NewTest_I1").value= cccTest_NewLocalExtrema_Options[0];
  document.getElementById("id_TestPage_NewTest_I2").value= cccTest_NewLocalExtrema_Options[1];
  document.getElementById("id_TestPage_NewTest_I3").value= cccTest_NewLocalExtrema_Options[2];

  newTestExtremaInfoText();
  extremaTest_startWorker(cccTest_NewLocalExtrema_Options);
}


function updateExtremaTestVariables(){
    cccTest_NewLocalExtrema_Options[3]=document.getElementById("id_TestPage_fitToCMS").checked;

    cccTest_NewLocalExtrema_Options[0]= parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
    cccTest_NewLocalExtrema_Options[1]= parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    cccTest_NewLocalExtrema_Options[2]= parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);

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
