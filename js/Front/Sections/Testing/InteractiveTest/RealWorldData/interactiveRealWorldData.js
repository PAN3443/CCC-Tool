
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
        document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 11;
      break;
    case "scientificFlowSim":
        document.getElementById("id_TestPage_SelectNewTestType").selectedIndex = 12;
      break;
    case "photographs":
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

  /*document.getElementById("id_TestPage_Dimension_Div").style.display="block";
  document.getElementById("id_TestPage_GridDimX").disabled=true;
  document.getElementById("id_TestPage_GridDimY").disabled=true;
  document.getElementById("id_TestPage_GridDimX").style.color="grey";
  document.getElementById("id_TestPage_GridDimY").style.color="grey";
  document.getElementById("id_TestPage_GridDimXLabel").style.color="grey";
  document.getElementById("id_TestPage_GridDimYLabel").style.color="grey";*/

  document.getElementById("id_TestPage_FctSelection_Div").style.display="flex";
  document.getElementById("id_TestPage_doRatioCheckbox").disabled = true;
  document.getElementById("id_TestPage_doRatioLabel").style.color = "grey";

  switch (selectedRealWorldType) {
    case "medical":

          for (var i = 0; i < medicalData.length; i++) {
            var option = document.createElement("option");
            option.innerHTML = medicalLabels[i];
            document.getElementById("id_TestPage_FctSelection").add(option);
          }

      break;
    case "scientificFlowSim":

          for (var i = 0; i < scientificFlowSimData.length; i++) {
            var option = document.createElement("option");
            option.innerHTML = scientificFlowSimLabels[i];
            document.getElementById("id_TestPage_FctSelection").add(option);
          }

      break;
      case "photographs":

        for (var i = 0; i < photographsData.length; i++) {
          var option = document.createElement("option");
          option.innerHTML = photographsLabels[i];
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

  /*switch (selectedRealWorldType) {
    case "medical":

        document.getElementById("id_TestPage_GridDimX").value=medicalData[selectedID].length;
        document.getElementById("id_TestPage_GridDimY").value=medicalData[selectedID][0].length;

      break;
    case "scientificFlowSim":

          document.getElementById("id_TestPage_GridDimX").value=scientificFlowSimData[selectedID].length;
          document.getElementById("id_TestPage_GridDimY").value=scientificFlowSimData[selectedID][0].length;

      break;
      case "photographs":

          document.getElementById("id_TestPage_GridDimX").value=photographsData[selectedID].length;
          document.getElementById("id_TestPage_GridDimY").value=photographsData[selectedID][0].length;

        break;
    default:
      return;
  }*/
  checkAcknowledgements(selectedID);

  ///////////////////////////////////////////////////////////
  //// For Worker add canvas or canvasID
  inform_Worker_PushInteractiveTest("RealData",selectedRealWorldType,selectedID);
  updateNoise();
  inform_Worker_GetVisualisation();
  ///////////////////////////////////////////////////////////
}



function checkAcknowledgements(selectedID){


  var index = undefined;

  switch (selectedRealWorldType) {
    case "medical":

        if(medicalAcknowlegments[selectedID]!=undefined)
          index=medicalAcknowlegments[selectedID];

      break;
    case "scientificFlowSim":

         if(scientificFlowSimAcknowlegments[selectedID]!=undefined)
          index=scientificFlowSimAcknowlegments[selectedID];

      break;
      case "photographs":

         if(photographsAcknowlegments[selectedID]!=undefined)
          index=photographsAcknowlegments[selectedID];

        break;
    default:
      return;
  }

  if(index!=undefined){
    document.getElementById("id_TestPage_newTestAcknowledgmentsDiv").style.display="block";

    var atext = "Acknowledgments".bold()+": We thank "+acknowlegments[index].blankLink(acknowlegmentsURL[index])+" for provision of real world data.";

   if(acknowlegmentsAdditional[index]!=undefined){
    atext += "\n"+acknowlegmentsAdditional[index];
   }

    document.getElementById("id_TestPage_newTestAcknowledgmentsText").innerHTML = atext;

  }
  else{
    document.getElementById("id_TestPage_newTestAcknowledgmentsDiv").style.display="none";
  }

}
