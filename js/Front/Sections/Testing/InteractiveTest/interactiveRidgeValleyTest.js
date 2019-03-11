function openRidgeValleyTest(tmpID){

var tmpArray = [];
for (var i = 0; i < cccTest_RidgeValleyLine_Options[tmpID].length; i++) {
  tmpArray.push(cccTest_RidgeValleyLine_Options[tmpID][i])
}
cccTest_NewRidgeValley_Options = tmpArray;

initNewTest();
document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 2;
selectNewRidgeValleyTestType();

}


function selectNewRidgeValleyTestType(){
  document.getElementById("id_TestPage_Dimension_Div").style.display="block";
  document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

  document.getElementById("id_TestPage_doRatioCheckbox").checked = cccTest_NewRidgeValley_Options[0];

  document.getElementById("id_TestPage_NewTest_I3").value=cccTest_NewRidgeValley_Options[4];
  document.getElementById("id_TestPage_NewTest_I4").value=cccTest_NewRidgeValley_Options[6];

  document.getElementById("id_TestPage_NewTest_I1").value=cccTest_NewRidgeValley_Options[1];
  document.getElementById("id_TestPage_NewTest_I2").value=cccTest_NewRidgeValley_Options[2];


  document.getElementById("id_TestPage_NewTest_XTypeL1").innerHTML=" : Linear";
  document.getElementById("id_TestPage_NewTest_XTypeL2").innerHTML=" : Convex";
  document.getElementById("id_TestPage_NewTest_XTypeL3").innerHTML=" : Concave";

  document.getElementById("id_TestPage_NewTest_YTypeL1").innerHTML=" : Linear";
  document.getElementById("id_TestPage_NewTest_YTypeL2").innerHTML=" : Convex";
  document.getElementById("id_TestPage_NewTest_YTypeL3").innerHTML=" : Concave";

  current_xFktType= cccTest_NewRidgeValley_Options[3];
  switch (current_xFktType) {
    case 0:
      document.getElementById("id_TestPage_NewTest_YType1").checked = true;
      break;
      case 1:
        document.getElementById("id_TestPage_NewTest_YType2").checked = true;
        break;
        case 2:
          document.getElementById("id_TestPage_NewTest_YType3").checked = true;
          break;
  }

  current_yFktType= cccTest_NewRidgeValley_Options[5];
  switch (current_yFktType) {
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

document.getElementById("id_TestPage_GridDimX").value=cccTest_NewRidgeValley_Options[7];
document.getElementById("id_TestPage_GridDimY").value=cccTest_NewRidgeValley_Options[8];

  document.getElementById("id_TestPage_NewTest_I3").min=2;
  document.getElementById("id_TestPage_NewTest_I4").min=2;

  document.getElementById("id_TestPage_NewTest_I3").step=1;
  document.getElementById("id_TestPage_NewTest_I4").step=1;



  if(document.getElementById("id_TestPage_doRatioCheckbox").checked){

    document.getElementById("id_TestPage_NewTest_I1").min=0;
    document.getElementById("id_TestPage_NewTest_I1").max=1.0;

    document.getElementById("id_TestPage_NewTest_I1").min=0;
    document.getElementById("id_TestPage_NewTest_I1").max=1.0;

  }

  document.getElementById("id_TestPage_NewTest_V1").innerHTML="m-Value: ";
  document.getElementById("id_TestPage_NewTest_V2").innerHTML="M-Value: ";
  document.getElementById("id_TestPage_XFctType_Div").style.display="block";

  document.getElementById("id_TestPage_NewTest_V3").innerHTML="X-Exponent: ";
  document.getElementById("id_TestPage_NewTest_V4").innerHTML="Y-Exponent: ";
  document.getElementById("id_TestPage_YFctType_Div").style.display="block";

  draw_RidgeValleyFunctionType();
  valleyTest_startWorker(cccTest_NewRidgeValley_Options);
}


function updateRidgeValleyTestVariables(){
  check_xFktType();
  check_yFktType();

  if(current_xFktType==0)
    document.getElementById("id_TestPage_NewTest_I3").disabled=true;
  else
    document.getElementById("id_TestPage_NewTest_I3").disabled=false;

  if(current_yFktType==0)
    document.getElementById("id_TestPage_NewTest_I4").disabled=true;
  else
    document.getElementById("id_TestPage_NewTest_I4").disabled=false;

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


  if(value_m==value_M){
    openAlert("Invalid input! The m-Value and M-Value have to be different!");
    return;
  }

  // check m-exp
  var exp_m = parseInt(document.getElementById("id_TestPage_NewTest_I3").value);
  if(isNaN(exp_m)){
    openAlert("Invalid input for m-Exponent");
    return;
  }
  document.getElementById("id_TestPage_NewTest_I3").value =exp_m;
  if(exp_m<2){
    openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
    return;
  }

  // check M-exp
  var exp_M = parseInt(document.getElementById("id_TestPage_NewTest_I4").value);
  document.getElementById("id_TestPage_NewTest_I4").value = exp_M;
  if(isNaN(exp_M)){
    openAlert("Invalid input for m-Exponent");
    return;
  }
  if(exp_M<2){
    openAlert("Invalid input for m-Exponent. The exponent has to be an integer and has to be 2 or greater than 2.");
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


  cccTest_NewRidgeValley_Options[0] = document.getElementById("id_TestPage_doRatioCheckbox").checked;
  cccTest_NewRidgeValley_Options[1]=value_m;
  cccTest_NewRidgeValley_Options[2]=value_M;
  cccTest_NewRidgeValley_Options[3] = current_xFktType;
  cccTest_NewRidgeValley_Options[4]=exp_m;
  cccTest_NewRidgeValley_Options[5] = current_yFktType;
  cccTest_NewRidgeValley_Options[6] = exp_M;
  cccTest_NewRidgeValley_Options[7]= dimX;
  cccTest_NewRidgeValley_Options[8] = dimY;

  draw_RidgeValleyFunctionType();
  valleyTest_startWorker(cccTest_NewRidgeValley_Options);
}




function draw_RidgeValleyFunctionType(){

  var exp= document.getElementById("id_TestPage_NewTest_I3").value;
  var value_m = document.getElementById("id_TestPage_NewTest_I1").value;
  var value_M = document.getElementById("id_TestPage_NewTest_I2").value;
  draw_FunctionTypeMirrored("id_TestPage_Canvas_xFktType",exp,value_m,value_M,current_xFktType);

  exp= document.getElementById("id_TestPage_NewTest_I4").value;
  value_m = document.getElementById("id_TestPage_NewTest_I1").value;
  value_M = document.getElementById("id_TestPage_NewTest_I2").value;
  draw_FunctionType("id_TestPage_Canvas_yFktType",exp,value_m,value_M,current_yFktType);
}
