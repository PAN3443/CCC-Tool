
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
  document.getElementById("id_TestPage_NewTest_D1").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D2").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D3").style.display="flex";
  document.getElementById("id_TestPage_NewTest_D4").style.display="flex";

  document.getElementById("id_TestPage_NewTest_V1").innerHTML="Start Frequency: ";
  document.getElementById("id_TestPage_NewTest_V2").innerHTML="#Increases: ";
  document.getElementById("id_TestPage_NewTest_V3").innerHTML="Wava-Range Start: ";
  document.getElementById("id_TestPage_NewTest_V4").innerHTML="Wava-Range End: ";
}

function updateFrequencyTestVariables (){

}
