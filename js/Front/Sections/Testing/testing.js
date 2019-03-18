//////////////////////////////////////
/// Wait /////
///////////////////////////////////


function openTestSection(){

  updateTestMappingCanvas(false); // updateSize
  document.getElementById("id_Test_ScaleFactor").value = scalefactor3DTest;


  var selectobject=document.getElementById("id_TestSection_CMS_Select")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }

  for (var i = 0; i < myDesignsList.length; i++) {
    var optionCMS = document.createElement("option");
    optionCMS.innerHTML = myDesignsList[i].getColormapName();

    selectobject.add(optionCMS);
  }
  selectobject.selectedIndex = 0;

  document.getElementById("id_TestVisualization_Pixel").checked = true;
  updateTestVis();

  testingModus=0;
  document.getElementById("id_Test_FunctionCollection").style.width = "100vw";
  document.getElementById("id_Test_TestDiv").style.width = "0vw";
  document.getElementById("id_Test_pageSwitchRight").style.visibility = "visible";
  document.getElementById("id_Test_pageSwitchStatusLeft").innerHTML = "&#x25C9;";
  document.getElementById("id_Test_pageSwitchStatusRight").innerHTML = "&#x25CE;";
  selectTestCMS();
}

function switchTestDisplay(type) {

  if(testingModus!=type){
    testingModus=type;
    slideTestDisplayDivs();
  }

}

function slideTestDisplayDivs(){

  document.getElementById("id_Test_pageSwitchRight").style.visibility = "hidden";
  document.getElementById("id_Test_pageSwitchLeft").style.visibility = "hidden";



  switch (testingModus) {
    case 0:
    document.getElementById("id_Test_FunctionCollection").style.width = "100vw";
    document.getElementById("id_Test_TestDiv").style.width = "0vw";
    document.getElementById("id_Test_pageSwitchRight").style.visibility = "visible";
    document.getElementById("id_Test_pageSwitchStatusLeft").innerHTML = "&#x25C9;";
    document.getElementById("id_Test_pageSwitchStatusRight").innerHTML = "&#x25CE;";
    if(redrawCollection)
    drawTestCollection();
    redrawCollection=false;
    break;
    case 1:
      document.getElementById("id_Test_FunctionCollection").style.width = "0vw";
      document.getElementById("id_Test_TestDiv").style.width = "100vw";
      document.getElementById("id_Test_pageSwitchStatusLeft").innerHTML = "&#x25CE;";
      document.getElementById("id_Test_pageSwitchStatusRight").innerHTML = "&#x25C9;";
      document.getElementById("id_Test_pageSwitchLeft").style.visibility = "visible";
      if(redrawTest)
      selectNewTestType();
      redrawTest = false;
    break;
  }

}


function selectTestCMS(){

  globalCMS1 = cloneCMS(myDesignsList[document.getElementById("id_TestSection_CMS_Select").selectedIndex]);


  drawCanvasColormap("id_TestPage_CMS_VIS_ColormapLinear", globalCMS1);

  initTesttestField_WorkerJSON();

  switch (testingModus) {
    case 0:
    drawTestCollection();
    redrawTest = true;
      break;
      case 1:
      selectNewTestType();
      redrawCollection = true;
        break;
  }

}
