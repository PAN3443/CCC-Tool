
function openTresholdTest(tmpID){

var tmpArray = [];
for (var i = 0; i < cccTest_Treshold_Options[tmpID].length; i++) {
  tmpArray.push(cccTest_Treshold_Options[tmpID][i])
}
cccTest_NewTreshold_Options = tmpArray;

initNewTest();
document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 6;
selectNewTresholdTestType();

}

function selectNewTresholdTestType(){

  document.getElementById("id_TestPage_Dimension_Div").style.display="block";
  document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

  document.getElementById("id_TestPage_doRatioCheckbox").checked = cccTest_NewTreshold_Options[0];

  document.getElementById("id_TestPage_NewTest_V1").innerHTML="Min:";
  document.getElementById("id_TestPage_NewTest_V2").innerHTML="Treshold:";
  document.getElementById("id_TestPage_NewTest_V3").innerHTML="Max: ";
  document.getElementById("id_TestPage_NewTest_V4").innerHTML="Exponent: ";

  document.getElementById("id_TestPage_NewTest_I1").value= cccTest_NewTreshold_Options[3];
  document.getElementById("id_TestPage_NewTest_I2").value= cccTest_NewTreshold_Options[4];
  document.getElementById("id_TestPage_NewTest_I3").value= cccTest_NewTreshold_Options[5];

  document.getElementById("id_TestPage_NewTest_I1").max= cccTest_NewTreshold_Options[4];
  document.getElementById("id_TestPage_NewTest_I3").min= cccTest_NewTreshold_Options[4];

  document.getElementById("id_TestPage_NewTest_I4").value= cccTest_NewTreshold_Options[2];
  document.getElementById("id_TestPage_NewTest_I4").min= 2;
  document.getElementById("id_TestPage_NewTest_I4").step= 1;

  if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
    document.getElementById("id_TestPage_NewTest_I1").min= 0;
    document.getElementById("id_TestPage_NewTest_I1").max= 1;
    document.getElementById("id_TestPage_NewTest_I2").min= 0;
    document.getElementById("id_TestPage_NewTest_I2").max= 1;
    document.getElementById("id_TestPage_NewTest_I3").min= 0;
    document.getElementById("id_TestPage_NewTest_I3").max= 1;
  }
  else {
    document.getElementById("id_TestPage_NewTest_I1").min= undefined;
    document.getElementById("id_TestPage_NewTest_I1").max= undefined;
    document.getElementById("id_TestPage_NewTest_I2").min= undefined;
    document.getElementById("id_TestPage_NewTest_I2").max= undefined;
    document.getElementById("id_TestPage_NewTest_I3").min= undefined;
    document.getElementById("id_TestPage_NewTest_I3").max= undefined;
  }

  document.getElementById("id_TestPage_XFctType_Div").style.display="block";
  document.getElementById("id_TestPage_NewTest_XTypeL1").innerHTML=" : Linear-Surrounding";
  document.getElementById("id_TestPage_NewTest_XTypeL2").innerHTML=" : Flat-Surrounding";
  document.getElementById("id_TestPage_NewTest_XTypeL3").innerHTML=" : Steep-Surrounding";

  current_xFktType= cccTest_NewTreshold_Options[1];
  switch (current_xFktType) { // mType
    case 0:
      document.getElementById("id_TestPage_NewTest_XType1").checked = true;
      break;
      case 1:
        document.getElementById("id_TestPage_NewTest_XType2").checked = true;
        break;
        case 2:
          document.getElementById("id_TestPage_NewTest_XType3").checked = true;
          break;
  }

  document.getElementById("id_TestPage_GridDimX").value=cccTest_NewTreshold_Options[6];
  document.getElementById("id_TestPage_GridDimY").value=cccTest_NewTreshold_Options[7];

  draw_TesholdFunctionType();
  updateNoise();
  treshold_startWorker(cccTest_NewTreshold_Options);
}


function updateTresholdTestVariables(){
    check_xFktType();

    if(current_xFktType==0)
      document.getElementById("id_TestPage_NewTest_I4").disabled=true;
    else
      document.getElementById("id_TestPage_NewTest_I4").disabled=false;

    var value_m = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
    document.getElementById("id_TestPage_NewTest_I1").value = value_m;
    if(isNaN(value_m)){
      openAlert("Invalid input for the m-value!");
      return;
    }

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_m<0 || value_m>1.0)){
      openAlert("Invalid input for the m-value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }

    var value_T = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
    document.getElementById("id_TestPage_NewTest_I2").value = value_T;
    if(isNaN(value_T)){
      openAlert("Invalid input for the T-value!");
      return;
    }

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_T<0 || value_T>1.0)){
      openAlert("Invalid input for the T-value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }


    var value_M = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
    document.getElementById("id_TestPage_NewTest_I3").value = value_M;
    if(isNaN(value_M)){
      openAlert("Invalid input for the M-value!");
      return;
    }

    if(document.getElementById("id_TestPage_doRatioCheckbox").checked && (value_M<0 || value_M>1.0)){
      openAlert("Invalid input for the M-value! You have select the option to work with rational numbers of the CMS range. Therefore only numbers between 0 and 1 are allowed!");
      return;
    }



    var exp = parseInt(document.getElementById("id_TestPage_NewTest_I4").value);
    document.getElementById("id_TestPage_NewTest_I4").value = exp;
    if(isNaN(exp)){
      openAlert("Invalid input for the exponent!");
      return;
    }

    if(exp<2){
      openAlert("Invalid input for the exponent! The value is not allowed to be smaller than two!");
      return;
    }

    if(!(value_m<value_T && value_T<value_M)){
      openAlert("Invalid input! The m-value has to be smaller than the T-value and the T-value has to be smaller than the M-Value!");
    }

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

    cccTest_NewTreshold_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;
    cccTest_NewTreshold_Options[1] = current_xFktType;
    cccTest_NewTreshold_Options[3]=value_m;
    cccTest_NewTreshold_Options[4]=value_T;
    cccTest_NewTreshold_Options[5]=value_M;
    cccTest_NewTreshold_Options[2]=exp;
    cccTest_NewTreshold_Options[6]=dimX;
    cccTest_NewTreshold_Options[7]=dimY;

    draw_TesholdFunctionType();
    updateNoise();
    treshold_startWorker(cccTest_NewTreshold_Options);
}


function switchRatioType_TresholdTest(){
  cccTest_NewTreshold_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;

  if(document.getElementById("id_TestPage_doRatioCheckbox").checked){
    cccTest_NewTreshold_Options[3]=0.0;
    cccTest_NewTreshold_Options[4]=0.5;
    cccTest_NewTreshold_Options[5]=1.0;
  }
  else {
    cccTest_NewTreshold_Options[3]=globalCMS1.getRefPosition(0);
    cccTest_NewTreshold_Options[4]=globalCMS1.getRefPosition(0)+0.5*(globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1)-globalCMS1.getRefPosition(0));
    cccTest_NewTreshold_Options[5]=globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);
  }
  selectNewTresholdTestType();
}


function draw_TesholdFunctionType(){

  var exp= document.getElementById("id_TestPage_NewTest_I4").value;
  var value_m = document.getElementById("id_TestPage_NewTest_I1").value;
  var value_T = document.getElementById("id_TestPage_NewTest_I2").value;
  var value_M = document.getElementById("id_TestPage_NewTest_I3").value;

  draw_FunctionTypeTresh("id_TestPage_Canvas_xFktType", exp, current_xFktType )
}
