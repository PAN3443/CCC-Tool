//////////////////////////////////////////////////////////////////////////////
////////////// Add New Test Part
//////////////


function addTestToReport() {

  var testLabel = "";
  var testSublabel = "";
  var optionList = [];

  switch (document.getElementById("id_TestPage_SelectNewTestType").selectedIndex) {
    case 0:
      testLabel = "CCCTest";
      testSublabel = "Jump";
      optionList = copyOptions(cccTest_NewJump_Options);
      break;
    case 1:
      testLabel = "CCCTest";
      testSublabel = "Gradient";
      optionList = copyOptions(cccTest_NewGradient_Options);
      break;
    case 2:
      testLabel = "CCCTest";
      testSublabel = "RiVa";
      optionList = copyOptions(cccTest_NewRidgeValley_Options);
      break;
    case 3:
      testLabel = "CCCTest";
      testSublabel = "Extrema";
      optionList = copyOptions(cccTest_NewLocalExtrema_Options);
      break;
    case 4:
      testLabel = "CCCTest";
      testSublabel = "Frequency";
      optionList = copyOptions(cccTest_NewFrequency_Options);
      break;
    case 5:
      testLabel = "CCCTest";
      testSublabel = "LittleBit";
      optionList = copyOptions(cccTest_NewLittleBit_Options);
      break;
    case 6:
      testLabel = "CCCTest";
      testSublabel = "Treshold";
      optionList = copyOptions(cccTest_NewTreshold_Options);
      break;
    case 7:
      testLabel = "CCCTest";
      testSublabel = "Topology";
      optionList = copyOptions(cccTest_NewTopology_Options);
      break;
      /////////////////////////////////////
    case 8:
      testLabel = "Collection";
      testSublabel = fctTest_NewLocalMin_Options[1];
      optionList = copyOptions(fctTest_NewLocalMin_Options);
      break;
    case 9:
      testLabel = "Collection";
      testSublabel = fctTest_NewBowlShaped_Options[1];
      optionList = copyOptions(fctTest_NewBowlShaped_Options);
      break;
    case 10:
      testLabel = "Collection";
      testSublabel = fctTest_NewValleyShaped_Options[1];
      optionList = copyOptions(fctTest_NewValleyShaped_Options);
      break;
      /////////////////////////////////////
    case 11:
    case 12:
    case 13:
      testLabel = "RealData";
      testSublabel = selectedRealWorldType;
      optionList = document.getElementById("id_TestPage_FctSelection").selectedIndex;
      break;
  }
  reportListTestInfo.push([testLabel,testSublabel,optionList]);
  reportListTestField.push(undefined);
  request_Worker_Testfield(reportListTestField.length-1);
  // switch to report page at the event, when the worker has send the testfield to the main thread

}

function copyOptions(options) {
  var newOptions = [];
  for (var i = 0; i < options.length; i++) {
    if (Array.isArray(options[i])) {
      newOptions.push(copyOptions(options[i]));
    } else {
      var tmp = options[i];
      newOptions.push(tmp);
    }
  }
  return newOptions;
}
