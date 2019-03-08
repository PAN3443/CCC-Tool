function selectNewLittleBitTestType(){


  document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D3").style.display="flex";

  document.getElementById("id_TestPage_doRatioCheckbox").checked = cccTest_NewLittleBit_Options[0];

  document.getElementById("id_TestPage_NewTest_V1").innerHTML="Little"+"Start".sub()+":";
  document.getElementById("id_TestPage_NewTest_V2").innerHTML="Little"+"End".sub()+":";
  document.getElementById("id_TestPage_NewTest_V3").innerHTML="Pixels Per Area: ";

  document.getElementById("id_TestPage_NewTest_I1").value= cccTest_NewLittleBit_Options[1];
  document.getElementById("id_TestPage_NewTest_I2").value= cccTest_NewLittleBit_Options[2];
  document.getElementById("id_TestPage_NewTest_I3").value= cccTest_NewLittleBit_Options[3];
  document.getElementById("id_TestPage_NewTest_I3").min= 2;
  document.getElementById("id_TestPage_NewTest_I3").step= 1;

  if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
    document.getElementById("id_TestPage_NewTest_I1").min= 0;
    document.getElementById("id_TestPage_NewTest_I1").max= 1;
    document.getElementById("id_TestPage_NewTest_I2").min= 0;
    document.getElementById("id_TestPage_NewTest_I2").max= 1;
  }
  else {
    document.getElementById("id_TestPage_NewTest_I1").min= undefined;
    document.getElementById("id_TestPage_NewTest_I1").max= undefined;
    document.getElementById("id_TestPage_NewTest_I2").min= undefined;
    document.getElementById("id_TestPage_NewTest_I2").max= undefined;
  }

  littlebit_startWorker(cccTest_NewLittleBit_Options);
}


function updateLittleBitTestVariables(){

    var lStart = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
    document.getElementById("id_TestPage_NewTest_I1").value = lStart;
    if(isNaN(lStart)){
      openAlert("Invalid value for start value!");
      return;
    }

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (lStart<0 || lStart>1.0)){
      openAlert("Invalid value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }

    var lEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    document.getElementById("id_TestPage_NewTest_I2").value = lEnd;
    if(isNaN(lEnd)){
      openAlert("Invalid value for end value!");
      return;
    }

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (lEnd<0 || lEnd>1.0)){
      openAlert("Invalid value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }

    var pixelsArea = parseInt(document.getElementById("id_TestPage_NewTest_I3").value);
    document.getElementById("id_TestPage_NewTest_I3").value = pixelsArea;
    if(isNaN(pixelsArea)){
      openAlert("Invalid value for pixels per area value!");
      return;
    }

    if(pixelsArea<3){
      openAlert("Invalid value for pixels per area value! The value is not allowed to be smaller than three!");
      return;
    }

    if(lStart>=lEnd){
      openAlert("Invalid input for the start and end value! The start value has to be smaller than the end value!");
    }

    cccTest_NewLittleBit_Options[0]=document.getElementById("id_TestPage_doRatioCheckbox").checked;
    cccTest_NewLittleBit_Options[1]= lStart;
    cccTest_NewLittleBit_Options[2]= lEnd;
    cccTest_NewLittleBit_Options[3]= pixelsArea;

    littlebit_startWorker(cccTest_NewLittleBit_Options);
}


function switchRatioType_LittleBitTest(){
  cccTest_NewLittleBit_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;

  if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
    cccTest_NewLittleBit_Options[1] = 0.001;
    cccTest_NewLittleBit_Options[2] = 0.01;
  }
  else {
    cccTest_NewLittleBit_Options[1] = 0.001*(globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1)-globalCMS1.getRefPosition(0));
    cccTest_NewLittleBit_Options[2] = 0.01*(globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1)-globalCMS1.getRefPosition(0));
  }
  selectNewLittleBitTestType();
}
