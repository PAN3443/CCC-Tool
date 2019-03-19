
function openRealWorldTest(type,index){

/*var tmpArray = [];
for (var i = 0; i < fctTest_BowlShaped_Options[tmpID].length; i++) {

  if(i==2){
    var tmpArray2 = [];
    for (var j = 0; j < fctTest_BowlShaped_Options[tmpID][2].length; j++) {
      var tmpVal = fctTest_BowlShaped_Options[tmpID][2][j];
      tmpArray2.push(tmpVal);
    }
    tmpArray.push(tmpArray2);
  }
  else{
    var tmpVal = fctTest_BowlShaped_Options[tmpID][i];
    tmpArray.push(tmpVal);
  }

}


fctTest_NewBowlShaped_Options = tmpArray;

initNewTest();*/
  selectedRealWorldType = type;

  switch (selectedRealWorldType) {
    case "medical":
        document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 12;
      break;
    case "bio":
        document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 11;
      break;
    case "other":
        document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 13;
      break;
    default:
      return;
  }

initNewTest();
selectRealWorldType(index);

}

function selectRealWorldType(index){

  document.getElementById("id_TestPage_FctSelection").innerHTML = [];

  document.getElementById("id_TestPage_Dimension_Div").style.display="block";

  document.getElementById("id_TestPage_GridDimX").disabled=true;
  document.getElementById("id_TestPage_GridDimY").disabled=true;

  document.getElementById("id_TestPage_GridDimX").style.color="grey";
  document.getElementById("id_TestPage_GridDimY").style.color="grey";

  document.getElementById("id_TestPage_GridDimXLabel").style.color="grey";
  document.getElementById("id_TestPage_GridDimYLabel").style.color="grey";

  document.getElementById("id_TestPage_FctSelection_Div").style.display="flex";
  document.getElementById("id_TestPage_doRatioCheckbox").disabled = true;
  document.getElementById("id_TestPage_doRatioLabel").style.color = "grey";

  switch (selectedRealWorldType) {
    case "medical":
        if(medicalData[index]==undefined)
          return;

          for (var i = 0; i < medicalData.length; i++) {
            var option = document.createElement("option");
            option.innerHTML = medicalLabels[i];
            document.getElementById("id_TestPage_FctSelection").add(option);
          }

      break;
    case "bio":
        if(bioData[index]==undefined)
          return;

          for (var i = 0; i < bioData.length; i++) {
            var option = document.createElement("option");
            option.innerHTML = bioLabels[i];
            document.getElementById("id_TestPage_FctSelection").add(option);
          }

      break;
      case "other":
        if(otherData[index]==undefined)
          return;

        for (var i = 0; i < otherData.length; i++) {
          var option = document.createElement("option");
          option.innerHTML = otherLabels[i];
          document.getElementById("id_TestPage_FctSelection").add(option);
        }

        break;
    default:
      return;
  }
  document.getElementById("id_TestPage_FctSelection").selectedIndex = index;

  updateRealWorldVariables();
}



function updateRealWorldVariables(){
  var selectedID = document.getElementById("id_TestPage_FctSelection").selectedIndex;

  switch (selectedRealWorldType) {
    case "medical":
        if(medicalData[selectedID]==undefined)
          return;

        document.getElementById("id_TestPage_GridDimX").value=medicalData[selectedID].length;
        document.getElementById("id_TestPage_GridDimY").value=medicalData[selectedID][0].length;

      break;
    case "bio":
        if(bioData[selectedID]==undefined)
          return;

          document.getElementById("id_TestPage_GridDimX").value=bioData[selectedID].length;
          document.getElementById("id_TestPage_GridDimY").value=bioData[selectedID][0].length;

      break;
      case "other":
        if(otherData[selectedID]==undefined)
          return;

          document.getElementById("id_TestPage_GridDimX").value=otherData[selectedID].length;
          document.getElementById("id_TestPage_GridDimY").value=otherData[selectedID][0].length;

        break;
    default:
      return;
  }

  updateNoise();
  realData_startWorker(selectedRealWorldType,selectedID);
}
