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

  testingModus=true;
  document.getElementById("id_Test_FunctionCollection").style.width = "100vw";
  document.getElementById("id_Test_TestDiv").style.width = "0vw";
  document.getElementById("id_Test_pageSwitchRight").style.visibility = "visible";
  document.getElementById("id_Test_pageSwitchStatus").innerHTML = "&#x25C9; &#x25CE;";

  fillTestCollection();
  selectTestCMS();
}


function switchTestDisplay() {
  if(testingModus){
    testingModus=false;
  }
  else {
    testingModus=true;
  }
  slideTestDisplayDivs();
}

function slideTestDisplayDivs(){


  document.getElementById("id_Test_pageSwitchRight").style.visibility = "hidden";
  document.getElementById("id_Test_pageSwitchLeft").style.visibility = "hidden";

  if(testingModus){
    document.getElementById("id_Test_FunctionCollection").style.width = "100vw";
    document.getElementById("id_Test_TestDiv").style.width = "0vw";
    document.getElementById("id_Test_pageSwitchRight").style.visibility = "visible";
    document.getElementById("id_Test_pageSwitchStatus").innerHTML = "&#x25C9; &#x25CE;";
  }
  else {
    document.getElementById("id_Test_FunctionCollection").style.width = "0vw";
    document.getElementById("id_Test_TestDiv").style.width = "100vw";
    document.getElementById("id_Test_pageSwitchStatus").innerHTML = "&#x25CE; &#x25C9;";
    document.getElementById("id_Test_pageSwitchLeft").style.visibility = "visible";
  }

}

function selectTestCMS(){

  globalCMS1 = cloneCMS(myDesignsList[document.getElementById("id_TestSection_CMS_Select").selectedIndex]);


  drawCanvasColormap("id_TestPage_CMS_VIS_ColormapLinear", globalCMS1);

  initTesttestField_WorkerJSON();

  drawTestCollection();

}
