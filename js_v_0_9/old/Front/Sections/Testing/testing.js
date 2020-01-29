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

  for (var i = 0; i < myDesignsSection.getMyDesignLength(); i++) {
    var optionCMS = document.createElement("option");
    optionCMS.innerHTML = myDesignsList[i].getColormapName();
    selectobject.add(optionCMS);
  }
  selectobject.selectedIndex = 0;

  document.getElementById("id_TestVisualization_Pixel").checked = true;
  updateTestVis();

  testingModus=0;

  document.getElementById("id_Test_Map_Collection").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_InteractiveTest").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_MyTests").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_SubReport").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_AutoAnalysis").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_Optimization").classList.remove("class_Test_Map_DivActive");

  document.getElementById("id_Test_Map_Collection").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_InteractiveTest").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_MyTests").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_SubReport").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_AutoAnalysis").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_Optimization").classList.add("class_Test_Map_Div");

  document.getElementById("id_reportPageLabelDiv").style.visibility = "hidden";
  document.getElementById("id_Test_FunctionCollection").style.width = "100vw";
  document.getElementById("id_Test_TestDiv").style.width = "0vw";
  document.getElementById("id_Test_ReportDiv").style.width = "0vw";
  document.getElementById("id_Test_pageSwitchRight").style.visibility = "visible";
  document.getElementById("id_Test_pageSwitchLeft").style.visibility = "hidden";
  document.getElementById("id_testPageLabel").innerHTML = "Test".bold()+" : Collection";

  if(reportListTestField.length==0)
    document.getElementById("id_Test_pageSwitchStatus2").style.visibility = "hidden";

  document.getElementById("id_Test_pageSwitchStatus0").innerHTML = "&#x25C9;";
  document.getElementById("id_Test_pageSwitchStatus1").innerHTML = "&#x25CE;";
  document.getElementById("id_Test_pageSwitchStatus2").innerHTML = "&#x25CE;";
  selectTestCMS();

}

function switchTestDisplay(type) {

  if(testingModus!=type){
    testingModus=type;
    slideTestDisplayDivs();
  }

}

function switchToPreviousTest() {
    testingModus--;
    slideTestDisplayDivs();
}

function switchToNextTest() {
  testingModus++;
  slideTestDisplayDivs();
}

function slideTestDisplayDivs(){

  document.getElementById("id_Test_pageSwitchRight").style.visibility = "hidden";
  document.getElementById("id_Test_pageSwitchLeft").style.visibility = "hidden";
  document.getElementById("id_reportPageLabelDiv").style.visibility = "hidden";

  document.getElementById("id_Test_pageSwitchStatus0").innerHTML = "&#x25CE;";
  document.getElementById("id_Test_pageSwitchStatus1").innerHTML = "&#x25CE;";
  document.getElementById("id_Test_pageSwitchStatus2").innerHTML = "&#x25CE;";

  document.getElementById("id_Test_Map_Collection").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_InteractiveTest").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_MyTests").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_SubReport").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_AutoAnalysis").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_Optimization").classList.remove("class_Test_Map_DivActive");

  document.getElementById("id_Test_Map_Collection").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_InteractiveTest").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_MyTests").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_SubReport").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_AutoAnalysis").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_Optimization").classList.add("class_Test_Map_Div");

  switch (testingModus) {
    case 0:
    document.getElementById("id_Test_FunctionCollection").style.width = "100vw";
    document.getElementById("id_Test_TestDiv").style.width = "0vw";
    document.getElementById("id_Test_ReportDiv").style.width = "0vw";
    document.getElementById("id_Test_pageSwitchRight").style.visibility = "visible";
    document.getElementById("id_Test_pageSwitchStatus0").innerHTML = "&#x25C9;";
    document.getElementById("id_testPageLabel").innerHTML = "Test".bold()+" : Collection";
    drawTestCollection();

    document.getElementById("id_Test_Map_Collection").classList.remove("class_Test_Map_Div");
    document.getElementById("id_Test_Map_Collection").classList.add("class_Test_Map_DivActive");
    break;
    case 1:
      document.getElementById("id_Test_FunctionCollection").style.width = "0vw";
      document.getElementById("id_Test_TestDiv").style.width = "100vw";
      document.getElementById("id_Test_ReportDiv").style.width = "0vw";
      document.getElementById("id_Test_pageSwitchStatus1").innerHTML = "&#x25C9;";
      document.getElementById("id_Test_pageSwitchLeft").style.visibility = "visible";
      document.getElementById("id_testPageLabel").innerHTML = "Test".bold()+" : Interactive";

      if(reportListTestField.length>0)
        document.getElementById("id_Test_pageSwitchRight").style.visibility = "visible";

      selectNewTestType();
      document.getElementById("id_Test_Map_InteractiveTest").classList.remove("class_Test_Map_Div");
      document.getElementById("id_Test_Map_InteractiveTest").classList.add("class_Test_Map_DivActive");
    break;
    case 2:
      document.getElementById("id_Test_FunctionCollection").style.width = "0vw";
      document.getElementById("id_Test_TestDiv").style.width = "0vw";
      document.getElementById("id_Test_ReportDiv").style.width = "100vw";
      document.getElementById("id_Test_pageSwitchStatus2").innerHTML = "&#x25C9;";
      document.getElementById("id_Test_pageSwitchLeft").style.visibility = "visible";
      document.getElementById("id_reportPageLabelDiv").style.visibility = "visible";
      document.getElementById("id_testPageLabel").innerHTML = "Test".bold()+" : Report/Optimization";
      fixPixelPreview = false;
      pixelPreviewX = 0;
      pixelPreviewY = 0;

      reportModus=0;
      switchReportDisplay();

      calc_Report();
    break;
  }

}

function selectTestCMS(){

  globalCMS1 =


  drawCanvasColormap("id_TestPage_CMS_VIS_ColormapLinear", globalCMS1);


  testfunctionWorker_Report0.postMessage(globalCMS1JSON);

  switch (testingModus) {
    case 0:
      
    break;
    case 2:
      calc_Report();
    break;
  }

}
