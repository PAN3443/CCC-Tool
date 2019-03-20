
function openFctLocalMinimaTest(tmpID){

var tmpArray = [];
for (var i = 0; i < fctTest_LocalMin_Options[tmpID].length; i++) {

  if(i==2){
    var tmpArray2 = [];
    for (var j = 0; j < fctTest_LocalMin_Options[tmpID][2].length; j++) {
      var tmpVal = fctTest_LocalMin_Options[tmpID][2][j];
      tmpArray2.push(tmpVal);
    }
    tmpArray.push(tmpArray2);
  }
  else{
    var tmpVal = fctTest_LocalMin_Options[tmpID][i];
    tmpArray.push(tmpVal);
  }

}


fctTest_NewLocalMin_Options = tmpArray;

initNewTest();
document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 8;
selectNewFctLocalMinimaType();

}

function selectNewFctLocalMinimaType(){
  document.getElementById("id_TestPage_Dimension_Div").style.display="block";

  document.getElementById("id_TestPage_FctSelection_Div").style.display="flex";
  document.getElementById("id_TestPage_doRatioCheckbox").disabled = true;
  document.getElementById("id_TestPage_doRatioLabel").style.color = "grey";

  document.getElementById("id_TestPage_FctSelection").innerHTML = [];

  var rememberID = -1;
  for (var i = 0; i < fctTest_LocalMin_Options.length; i++) {
    var option = document.createElement("option");
    option.innerHTML = fctTest_LocalMin_Options[i][0];
    document.getElementById("id_TestPage_FctSelection").add(option);

    if(fctTest_LocalMin_Options[i][1] == fctTest_NewLocalMin_Options[1])
      rememberID=i;
  }

  document.getElementById("id_TestPage_FctSelection").selectedIndex = rememberID;

  document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

  document.getElementById("id_TestPage_NewTest_V1").innerHTML="x"+"Start".sub()+":";
  document.getElementById("id_TestPage_NewTest_V2").innerHTML="x"+"End".sub()+":";
  document.getElementById("id_TestPage_NewTest_V3").innerHTML="y"+"Start".sub()+":";
  document.getElementById("id_TestPage_NewTest_V4").innerHTML="y"+"End".sub()+":";

  document.getElementById("id_TestPage_NewTest_I1").value= fctTest_NewLocalMin_Options[2][0];
  document.getElementById("id_TestPage_NewTest_I2").value= fctTest_NewLocalMin_Options[2][1];
  document.getElementById("id_TestPage_NewTest_I3").value= fctTest_NewLocalMin_Options[2][2];
  document.getElementById("id_TestPage_NewTest_I4").value= fctTest_NewLocalMin_Options[2][3];

  document.getElementById("id_TestPage_GridDimX").value=fctTest_NewLocalMin_Options[3];
  document.getElementById("id_TestPage_GridDimY").value=fctTest_NewLocalMin_Options[4];
  updateNoise();
  fct_Worker(fctTest_NewLocalMin_Options);
}

function updateFctLocalMinimaTestVariables(){

  var xStart = parseFloat(document.getElementById("id_TestPage_NewTest_I1").value);
  document.getElementById("id_TestPage_NewTest_I1").value=xStart;
  if(isNaN(xStart)){
    openAlert("Invalid input for the x"+"Start".sub()+".");
    return;
  }
  var xEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I2").value);
  document.getElementById("id_TestPage_NewTest_I2").value=xEnd;
  if(isNaN(xEnd)){
    openAlert("Invalid input for the x"+"End".sub()+".");
    return;
  }

  if(xStart>=xEnd){
    openAlert("Invalid input for the x"+"Start".sub()+" and x"+"End".sub()+". The start value has to be smaller than the end value!");
    return;
  }

  var yStart = parseFloat(document.getElementById("id_TestPage_NewTest_I3").value);
  document.getElementById("id_TestPage_NewTest_I3").value=yStart;
  if(isNaN(yStart)){
    openAlert("Invalid input for the y"+"Start".sub()+".");
    return;
  }
  var yEnd = parseFloat(document.getElementById("id_TestPage_NewTest_I4").value);
  document.getElementById("id_TestPage_NewTest_I4").value=yEnd;
  if(isNaN(yEnd)){
    openAlert("Invalid input for the y"+"End".sub()+".");
    return;
  }

  if(yStart>=yEnd){
    openAlert("Invalid input for the y"+"Start".sub()+" and y"+"End".sub()+". The start value has to be smaller than the end value!");
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

  fctTest_NewLocalMin_Options[2][0]=xStart;
  fctTest_NewLocalMin_Options[2][1]=xEnd;
  fctTest_NewLocalMin_Options[2][2]=yStart;
  fctTest_NewLocalMin_Options[2][3]=yEnd;

  fctTest_NewLocalMin_Options[3]=dimX;
  fctTest_NewLocalMin_Options[4]=dimY;
  updateNoise();
  fct_Worker(fctTest_NewLocalMin_Options);
}


function updateLocalMinimaFctSelection(){

  var selectedID = document.getElementById("id_TestPage_FctSelection").selectedIndex;
  /*fctTest_NewLocalMin_Options = [];
  var tmpName = fctTest_LocalMin_Options[selectedID][0];
  fctTest_NewLocalMin_Options.push(tmpName);
  var tmpID = fctTest_LocalMin_Options[selectedID][1];
  fctTest_NewLocalMin_Options.push(tmpID);

  var tmpArray = [];
  for (var j = 0; j < fctTest_LocalMin_Options[selectedID][2].length; j++) {
    var tmpVal = fctTest_LocalMin_Options[selectedID][2][j];
    tmpArray.push(tmpVal);
  }
  fctTest_NewLocalMin_Options.push(tmpArray);

  if(fctTest_LocalMin_Options[selectedID].length>3){
    for (var i = 3; i < fctTest_LocalMin_Options[selectedID].length; i++) {
      var tmpVal = fctTest_LocalMin_Options[selectedID][2][j];
    }
  }
  selectNewFctLocalMinimaType();
  */
  openFctLocalMinimaTest(selectedID);

}