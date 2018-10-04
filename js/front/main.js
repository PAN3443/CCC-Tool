window.onload = function() {

  // if possible zoom to 100%
  /*document.body.style.zoom="100%";

  document.onkeydown = keyDownDocumentHandler;
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// GLOBAL /////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  if (typeof (Worker) === undefined)
  browserCanWorker=false;
  else
  browserCanWorker=true;

  globalCMS1 = new class_CMS();
  globalCMS2 = new class_CMS();

  document.getElementById("editSide_Radiobutton_PickerRG_B").checked=true;
  document.getElementById("bandCreator_Radiobutton_PickerRG_B").checked=true;
  colorpickerType="RG_B";

  /*document.getElementById('id_creatorPage').style.display = "none";
  document.getElementById('id_comparePage').style.display = "none";
  document.getElementById('id_analysisPage').style.display = "none";
  document.getElementById('id_tutorialPage').style.display = "none";*

  document.getElementById('id_inputCMSData').addEventListener("change", readCMSFile);
  document.getElementById('id_inputSessionData').addEventListener("change", readSessionFile);
  document.getElementById('id_inputData').addEventListener("change", readDataFile);

  document.getElementById('switchExpertMode').addEventListener("click", switchCCCToolMode);
  document.getElementById('switchExpertModeWelcomePage').addEventListener("change", switchCCCToolMode);
  document.getElementById('switchExpertModeWelcomePage').checked=true;


  document.getElementById('switchExpertMode').click();


  init_settingPage();
  init_AddPage();
  init_EditPage();
  init_CreatePage();
  init_analyzeComparePage();
  init_TutorialPage();
  init_ExportPage();

 /////
  changeColorspace(2);
  switchTableTestFunction(0);
  switchModifyModus(0);
  pageIsLoaded=true;



  initMapping();
  backgroundMapping(0);
  changeColorblindnessDegree();

  init_Size();


}

window.onresize = function(event) {

  orderColorSketch(colorspaceModus);

  if( document.getElementById("id_Mapping_Table_Div").style.display!="none"&&
      document.getElementById("id_mapping_Div").style.display!="none"&&
      document.getElementById("showHideMappingVisualization").style.display!="none"){

      updateMappingSize(2);
  }
};


window.onscroll = function() {
  //console.log(document.documentElement.scrollLeft);
  document.getElementById("id_menu").style.marginLeft = document.documentElement.scrollLeft+"px";
  document.getElementById("id_MainMenue").style.marginLeft = document.documentElement.scrollLeft+"px";
  document.getElementById("id_Mod_Menue").style.marginLeft = document.documentElement.scrollLeft+"px";
  document.getElementById("footerDiv").style.marginLeft = document.documentElement.scrollLeft+"px";


};


function keyDownDocumentHandler(event){
  if (event.keyCode == 13) {
    if(document.getElementById("popupAlertWindow").style.display!="none")
    document.getElementById("popupAlertWindow").style.display="none";
  }
}


///////////////////////////////////////////////

function orderColorSketch(forColorspace) {

  document.getElementById("id_colormapSketch").innerHTML = null;

  for (var i = refLineSketchContainer.length - 1; i >= 0; i--) {
    refLineSketchContainer[i].remove();
    refLineSketchContainer.pop();
  }

 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    if (showSideID == 1 && globalCMS1.getKeyLength() != 0) {

        if(document.getElementById('switchExpertModeWelcomePage').checked){
          document.getElementById("id_Mapping_Table_Div").style.display = "block";
          fillTable();
        }

        if(document.getElementById("mapping_checkAutoUpdate").checked==true && mapping_doingAnimation && document.getElementById('switchExpertModeWelcomePage').checked){
          updateMesh();
        }

    }
    else{
      document.getElementById("id_Mapping_Table_Div").style.display = "none";
    }


      // show and draw the colormap
      if(globalCMS1.getKeyLength() != 0){

        drawCanvasColormap("id_linearColormap", linearMap_resolution_X, linearMap_resolution_Y, globalCMS1);
        drawKeys("id_keyColormap", key_resolution_X, key_resolution_Y, globalCMS1, "id_keyColormapLinesBottom");

        document.getElementById("div_colormapLinear").style.display = "inline-block";

        if(showSideID==1)
          document.getElementById("bandSketchAutoRangeDiv").style.display="block";
        else
          document.getElementById("bandSketchAutoRangeDiv").style.display="none";


      }
      else{
        document.getElementById("div_colormapLinear").style.display = "none";
        document.getElementById("bandSketchAutoRangeDiv").style.display="none";
      }



    //////////////////////////////////////////////////////////////////////////
    drawBandSketch(globalCMS1,"id_colormapSketch","id_createColormapKeys","id_colormapSketch_Ref", false, -1);


    if(showSideID == 3){

      if(globalCMS2.getKeyLength() != 0){

        drawCanvasColormap("id_linearColormap2", linearMap_resolution_X, linearMap_resolution_Y, globalCMS2);
        drawKeys("id_keyColormap2", key_resolution_X, key_resolution_Y, globalCMS2, "id_keyColormapLinesBottom2");

        document.getElementById("div_colormapLinear2").style.display = "inline-block";

      }
      else{
        document.getElementById("div_colormapLinear2").style.display = "none";
      }

      drawBandSketch(globalCMS2,"id_colormapSketch2","id_createColormapKeys2","id_colormapSketch_Ref2", false, -1);
    }



}


function changeKeyValueInput(keyIndex, fielID) {

  var inputObj = document.getElementById(fielID);

  checkInputVal(inputObj, true, true);

  var newRef = parseFloat(inputObj.value);

  switch (keyIndex) {
    case 0:
      var nextRef = globalCMS1.getRefPosition(1);
      if(nextRef<=newRef){
        openAlert("Attention: You can not set the reference value greater than or equal to the reference value of the right neighboring key! Please enter another value.");
        inputObj.value=globalCMS1.getRefPosition(0);
      }
      else {
        globalCMS1.setRefPosition(keyIndex,newRef);
        orderColorSketch();
      }
      break;
    case globalCMS1.getKeyLength()-1:
      var prevRef = globalCMS1.getRefPosition(keyIndex-1);
      if(prevRef>=newRef){
        openAlert("Attention: You can not set the reference value smaller than or equal to the reference value of the left neighboring key! Please enter another value.");
        inputObj.value=globalCMS1.getRefPosition(keyIndex);
      }
      else {
        globalCMS1.setRefPosition(keyIndex,newRef);
        orderColorSketch();
      }

      break;
    default:
    var nextRef = globalCMS1.getRefPosition(keyIndex+1);
    if(nextRef<=newRef){
      openAlert("Attention: You can not set the reference value greater than or equal to the reference value of the right neighboring key! Please enter another value.");
      inputObj.value=globalCMS1.getRefPosition(keyIndex);
    }
    else{
      var prevRef = globalCMS1.getRefPosition(keyIndex-1);
      if(prevRef>=newRef){
        openAlert("Attention: You can not set the reference value smaller than or equal to the reference value of the left neighboring key! Please enter another value.");
        inputObj.value=globalCMS1.getRefPosition(keyIndex);
      }
      else{
        globalCMS1.setRefPosition(keyIndex,newRef);
        orderColorSketch();
      }
    }
  }


  updateAutoRangeInput();
}


function fillTable() {

  var old_tbody = document.getElementById("id_tableBody");
  var new_tbody = document.createElement('tbody');

  //fill table

  for (i = 0; i < globalCMS1.getKeyLength()-1; i++) {
    var tr = document.createElement('tr');
    tr.style.background = "white";

    var td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(i + 1));
    td.style.width="4%";
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(globalCMS1.getRefPosition(i)));
    td.style.width="9%";
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(globalCMS1.getRefPosition(i+1)));
    td.style.width="9%";
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";


    var color1 = globalCMS1.getRightKeyColor(i,colorspaceModus);
    var color2 = globalCMS1.getLeftKeyColor(i+1,colorspaceModus)

    if(color1==undefined){
      td.appendChild(document.createTextNode("constant"));
      color1 = color2;
    }
    else{
      td.appendChild(document.createTextNode("scaled"));
    }
    td.style.width="9%";

    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    var td2 = document.createElement('td')
    td2.className = "class_tableInput";



    switch (colorspaceModus) {
      case "rgb":
        td.appendChild(document.createTextNode(color1.getRGBString()));
        td2.appendChild(document.createTextNode(color2.getRGBString()));
        break;
      case "hsv":
       td.appendChild(document.createTextNode(color1.getHSVString(numDecimalPlaces)));
       td2.appendChild(document.createTextNode(color2.getHSVString(numDecimalPlaces)));
        break;
      case "lab":
       td.appendChild(document.createTextNode(color1.getLABString(numDecimalPlaces)));
       td2.appendChild(document.createTextNode(color2.getLABString(numDecimalPlaces)));
        break;
      case "din99":
       td.appendChild(document.createTextNode(color1.getDIN99String(numDecimalPlaces)));
       td2.appendChild(document.createTextNode(color2.getDIN99String(numDecimalPlaces)));
        break;
      default:
        console.log("Error at the changeColorspace function");
    }

    td.style.width="9%";
    td2.style.width="9%";

    tr.appendChild(td);
    tr.appendChild(td2);

    new_tbody.appendChild(tr);

  }

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
  new_tbody.id = "id_tableBody";*/




  //// STYLE

  initMyDesignObj();


//*  init_Style();


  // at least
  pageIsLoaded=true;
}
