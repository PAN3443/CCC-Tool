//////////////////////////////////////
/// Wait /////
///////////////////////////////////




function openTestSection(){
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
  selectTestCMS();

}


function selectTestCMS(){

  globalCMS1 = cloneCMS(myDesignsList[document.getElementById("id_TestSection_CMS_Select").selectedIndex]);

  drawBandSketch(globalCMS1,"id_TestPage_CMS_VIS_ColormapSketch", false, -1);
  drawCanvasColormap("id_TestPage_CMS_VIS_ColormapLinear", globalCMS1);
  drawKeys("id_TestPage_CMS_VIS_LinearKeys",  globalCMS1);
  drawSketchKeys("id_TestPage_CMS_VIS_SketchKeys", globalCMS1);
  drawLines("id_TestPage_CMS_VIS_Lines1",true, true,  globalCMS1);
  drawLines("id_TestPage_CMS_VIS_Lines2",false, false,  globalCMS1);
  drawKeyNumber("id_TestPage_CMS_VIS_SketchKeyNumbers", globalCMS1);
  drawKeyBursLine("id_TestPage_CMS_VIS_KeyBurs",globalCMS1);

  document.getElementById("id_TestPage_CMS_VIS_Label1").innerHTML = globalCMS1.getRefPosition(0);
  document.getElementById("id_TestPage_CMS_VIS_Label2").innerHTML = globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);

}




function switchTest(type){

  if (type==1) {
    return;
  }

  selectedMetric=type;

  document.getElementById("id_TestPage_CCCTest").style.background=styleNotActiveColor;
  document.getElementById("id_TestPage_CustomTest").style.background=styleNotActiveColor;


  document.getElementById("id_TestPage_CCCTest").style.color=styleNotActiveColorFont;
  document.getElementById("id_TestPage_CustomTest").style.color=styleNotActiveColorFont;

  document.getElementById("id_TestPage_CCCTest_Div").style.display="none";
  document.getElementById("id_TestPage_CustomTest_Div").style.display="none";

  switch (type) {
    case 0:
      document.getElementById("id_TestPage_CCCTest").style.background=styleActiveColor;
      document.getElementById("id_TestPage_CCCTest").style.color=styleActiveColorFont;

      document.getElementById("id_TestPage_CCCTest_Div").style.display="flex";


      break;
      case 1:
      document.getElementById("id_TestPage_CustomTest").style.background=styleActiveColor;
      document.getElementById("id_TestPage_CustomTest").style.color=styleActiveColorFont;

      document.getElementById("id_TestPage_CustomTest_Div").style.display="flex";

        break;
    default:
        switchMetricSettings(0);
  }

}
