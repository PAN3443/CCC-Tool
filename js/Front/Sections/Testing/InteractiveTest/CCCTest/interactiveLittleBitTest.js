
function openLittleBitTest(tmpID){

var tmpArray = [];
for (var i = 0; i < cccTest_LittleBit_Options[tmpID].length; i++) {
  tmpArray.push(cccTest_LittleBit_Options[tmpID][i])
}
cccTest_NewLittleBit_Options = tmpArray;

initNewTest();
document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 5;
selectNewLittleBitTestType();

}

function selectNewLittleBitTestType(){

  document.getElementById("id_TestPage_Dimension_Div").style.display="block";
  document.getElementById("id_TestPage_GridDimX").disabled=true;

  document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D3").style.display="flex";

  document.getElementById("id_TestPage_NewTest_D4").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D5").style.display="flex";

  document.getElementById("id_TestPage_doRatioCheckbox").checked = cccTest_NewLittleBit_Options[0];

  document.getElementById("id_TestPage_NewTest_V3").innerHTML="Little"+"Start".sub()+":";
  document.getElementById("id_TestPage_NewTest_V4").innerHTML="Little"+"End".sub()+":";
  document.getElementById("id_TestPage_NewTest_V5").innerHTML="x"+"Pixels".sub()+" per Stribe: ";
  document.getElementById("id_TestPage_NewTest_V1").innerHTML="From (m):";
  document.getElementById("id_TestPage_NewTest_V2").innerHTML="Till (M):";

  document.getElementById("id_TestPage_NewTest_I3").value= cccTest_NewLittleBit_Options[3];
  document.getElementById("id_TestPage_NewTest_I4").value= cccTest_NewLittleBit_Options[4];
  document.getElementById("id_TestPage_NewTest_I5").value= cccTest_NewLittleBit_Options[5];
  document.getElementById("id_TestPage_NewTest_I1").value= cccTest_NewLittleBit_Options[1];
  document.getElementById("id_TestPage_NewTest_I2").value= cccTest_NewLittleBit_Options[2];
  document.getElementById("id_TestPage_NewTest_I5").min= 2;
  document.getElementById("id_TestPage_NewTest_I5").step= 1;


  document.getElementById("id_TestPage_NewTest_I3").step= 0.00001;
  document.getElementById("id_TestPage_NewTest_I4").step= 0.00001;
  document.getElementById("id_TestPage_NewTest_I1").step= 0.001;
  document.getElementById("id_TestPage_NewTest_I2").step= 0.001;

  if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
    document.getElementById("id_TestPage_NewTest_I3").min= 0;
    document.getElementById("id_TestPage_NewTest_I3").max= 1;
    document.getElementById("id_TestPage_NewTest_I4").min= 0;
    document.getElementById("id_TestPage_NewTest_I4").max= 1;
    document.getElementById("id_TestPage_NewTest_I1").min= 0;
    document.getElementById("id_TestPage_NewTest_I1").max= 1;
    document.getElementById("id_TestPage_NewTest_I2").min= 0;
    document.getElementById("id_TestPage_NewTest_I2").max= 1;
  }
  else {
    document.getElementById("id_TestPage_NewTest_I3").min= undefined;
    document.getElementById("id_TestPage_NewTest_I3").max= undefined;
    document.getElementById("id_TestPage_NewTest_I4").min= undefined;
    document.getElementById("id_TestPage_NewTest_I4").max= undefined;
    document.getElementById("id_TestPage_NewTest_I1").min= undefined;
    document.getElementById("id_TestPage_NewTest_I1").max= undefined;
    document.getElementById("id_TestPage_NewTest_I2").min= undefined;
    document.getElementById("id_TestPage_NewTest_I2").max= undefined;
  }

  var numStribes = cccTest_NewGradient_Options[6]+cccTest_NewGradient_Options[6]+1;
  document.getElementById("id_TestPage_GridDimX").value=cccTest_NewGradient_Options[5]*numStribes;
  document.getElementById("id_TestPage_GridDimY").value=cccTest_NewLittleBit_Options[7];


  ///////////////////////////////////////////////////////////
  //// For Worker add canvas or canvasID
  inform_Worker_PushInteractiveTest("CCCTest","LittleBit",cccTest_NewLittleBit_Options);
  updateNoise();
  inform_Worker_GetVisualisation();
  ///////////////////////////////////////////////////////////
}


function updateLittleBitTestVariables(){

    var lStart = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
    document.getElementById("id_TestPage_NewTest_I3").value = lStart;
    if(isNaN(lStart)){
      openAlert("Invalid value for start value!");
      return;
    }

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (lStart<0 || lStart>1.0)){
      openAlert("Invalid value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }

    var lEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value = lEnd;
    if(isNaN(lEnd)){
      openAlert("Invalid value for end value!");
      return;
    }

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (lEnd<0 || lEnd>1.0)){
      openAlert("Invalid value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }

    // check m-value
    var value_m = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
    if(isNaN(value_m)){
      openAlert("Invalid input for the m-Value");
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_m<0 || value_m>1.0)){
      openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }

    // check M-value
    var value_M = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    if(isNaN(value_M)){
      openAlert("Invalid input for M-Value");
      return;
    }
    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_M<0 || value_M>1.0)){
      openAlert("Invalid value for the m-Value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }

    /////
    var pixelsArea = parseInt(document.getElementById("id_TestPage_NewTest_I5").value);
    document.getElementById("id_TestPage_NewTest_I5").value = pixelsArea;
    if(isNaN(pixelsArea)){
      openAlert("Invalid value for pixels per area value!");
      return;
    }

    if(pixelsArea<3){
      openAlert("Invalid value for pixels per area value! The value is not allowed to be smaller than three!");
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

    /*if(lStart>=lEnd){
      openAlert("Invalid input for the start and end value! The start value has to be smaller than the end value!");
    }*/

    cccTest_NewLittleBit_Options[0]=document.getElementById("id_TestPage_doRatioCheckbox").checked;
    cccTest_NewLittleBit_Options[1]= value_m;
    cccTest_NewLittleBit_Options[2]= value_M;
    cccTest_NewLittleBit_Options[3]= lStart;
    cccTest_NewLittleBit_Options[4]= lEnd;
    cccTest_NewLittleBit_Options[5]= pixelsArea;
    cccTest_NewLittleBit_Options[7]=dimY;

    // Update input for noise calculation
    var numberOfAreas = littleBit_NumberOfSinks+littleBit_NumberOfSinks+1;
    document.getElementById("id_TestPage_GridDimX").value=numberOfAreas*pixelsArea;

    ///////////////////////////////////////////////////////////
    //// For Worker add canvas or canvasID
    inform_Worker_PushInteractiveTest("CCCTest","LittleBit",cccTest_NewLittleBit_Options);
    updateNoise();
    inform_Worker_GetVisualisation();
    ///////////////////////////////////////////////////////////
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
