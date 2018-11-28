
function changeColorPossiblity(){

  if(onlyRGBPossibleColor){
      onlyRGBPossibleColor=false;
      document.getElementById('id_settingMenu_Label_RGBPossible_Button').innerHTML="Allow RGB Incompalible Colors : true";
  }
  else{
      onlyRGBPossibleColor=true;
      document.getElementById('id_settingMenu_Label_RGBPossible_Button').innerHTML="Allow RGB Incompalible Colors : false";
  }

  if(document.getElementById("id_EditPage_Edit_Path").style.display!="none"){
    if(pathColorspace==="rgb"){
      drawcolormap_RGBSpace(true,true);
    }
    else{
      drawcolormap_hueSpace(true, true, true);
    }
  }

}

function changeLimitKeyBurLine(){

  if(limitKeyBurLine){
    limitKeyBurLine=false,
    document.getElementById('id_dropDownMenue_LimitKeyBurLine_Label').innerHTML="Show Limited Key Bur Line";
  }
  else {
    limitKeyBurLine=true,
    document.getElementById('id_dropDownMenue_LimitKeyBurLine_Label').innerHTML="Show Full Key Bur Line";
  }

  document.getElementById("id_dropDownContainer").style.display="none";
  drawKeyBursLine("id_EditPage_CMS_VIS_KeyBurs",globalCMS1);
}


function updateEditPage(){


  drawBandSketch(globalCMS1,"id_EditPage_CMS_VIS_ColormapSketch", false, -1);


  for (var i = refElementContainer.length - 1; i >= 0; i--) {
    refElementContainer[i].remove();
    refElementContainer.pop();
  }

  document.getElementById("id_selectMainProbeSetList").style.visibility="hidden";

  var context = document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").getContext('2d');
  context.clearRect(0, 0, document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").width, document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").height);
  context = document.getElementById("id_EditPage_CMS_VIS_PreviewProbe").getContext('2d');
  context.clearRect(0, 0, document.getElementById("id_EditPage_CMS_VIS_PreviewProbe").width, document.getElementById("id_EditPage_CMS_VIS_PreviewProbe").height);


  if(globalCMS1.getKeyLength() != 0){


        document.getElementById("id_EditPage_CMS_VIS_SketchKeyNumbers").style.visibility="visible";
        document.getElementById("id_EditPage_CMS_VIS_LinearKeys").style.visibility="visible";
        document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.visibility="visible";
        //document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").style.visibility="visible";
        //document.getElementById("id_EditPage_RefPlaceholder").style.visibility="visible";
        document.getElementById("id_EditPage_CMS_VIS_SketchKeys").style.visibility="visible";
        document.getElementById("id_EditPage_CMS_VIS_Lines1").style.visibility="visible";
        document.getElementById("id_EditPage_CMS_VIS_Lines2").style.visibility="visible";
        document.getElementById("id_EditPage_CMS_VIS_Lines3").style.visibility="visible";

        var scaleButton = document.getElementById("id_actionMenu_scaleButton");
        if (scaleButton.classList.contains('dropdownNotActiveMenuButton'))
        scaleButton.classList.remove('dropdownNotActiveMenuButton');

        if (!scaleButton.classList.contains('dropdownMenuButton'))
        scaleButton.classList.toggle("dropdownMenuButton");

        var exportButton = document.getElementById("id_actionMenu_exportButton");
        if (exportButton.classList.contains('dropdownNotActiveMenuButton'))
        exportButton.classList.remove('dropdownNotActiveMenuButton');

        if (!exportButton.classList.contains('dropdownMenuButton'))
        exportButton.classList.toggle("dropdownMenuButton");

        var clearButton = document.getElementById("id_actionMenu_clearButton");
        if (clearButton.classList.contains('dropdownNotActiveMenuButton'))
        clearButton.classList.remove('dropdownNotActiveMenuButton');

        if (!clearButton.classList.contains('dropdownMenuButton'))
        clearButton.classList.toggle("dropdownMenuButton");

        //document.getElementById("id_editPage_HelpImage1").style.display="none";


        if(globalCMS1.getProbeSetLength()!=0 && document.getElementById("id_EditPage_PreviewProbe_Div").style.display!="none"){
          document.getElementById("id_selectMainProbeSetList").style.visibility="visible";

          /*updateProbeSetSelectBox();
          document.getElementById("id_selectMainProbeSetList").selectedIndex=0;*/
          var tmpCMS = globalCMS1.getProbeSet(document.getElementById("id_selectMainProbeSetList").selectedIndex).generateProbeCMS(globalCMS1);

          drawCanvasColormap("id_EditPage_CMS_VIS_PreviewProbe", tmpCMS);

        }

        drawCanvasColormap("id_EditPage_CMS_VIS_ColormapLinear", globalCMS1);
        drawKeys("id_EditPage_CMS_VIS_LinearKeys",  globalCMS1);
        drawSketchKeys("id_EditPage_CMS_VIS_SketchKeys", globalCMS1);
        drawLines("id_EditPage_CMS_VIS_Lines1",true, true,  globalCMS1);
        drawLines("id_EditPage_CMS_VIS_Lines2",false, false,  globalCMS1);
        drawLines("id_EditPage_CMS_VIS_Lines3",false, false,  globalCMS1);
        drawKeyNumber("id_EditPage_CMS_VIS_SketchKeyNumbers", globalCMS1);
        drawSketchInputFields(globalCMS1,"id_EditPage_CMS_VIS_Lines3", true);
        drawKeyBursLine("id_EditPage_CMS_VIS_KeyBurs",globalCMS1);



  }
  else{
    /*document.getElementById("div_colormapLinear").style.display = "none";
    document.getElementById("bandSketchAutoRangeDiv").style.display="none";*/
    document.getElementById("id_EditPage_CMS_VIS_SketchKeyNumbers").style.visibility="hidden";
    document.getElementById("id_EditPage_CMS_VIS_LinearKeys").style.visibility="hidden";
    document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.visibility="hidden";
    //document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").style.visibility="hidden";
    //document.getElementById("id_EditPage_RefPlaceholder").style.visibility="hidden";
    document.getElementById("id_EditPage_CMS_VIS_SketchKeys").style.visibility="hidden";
    document.getElementById("id_EditPage_CMS_VIS_Lines1").style.visibility="hidden";
      document.getElementById("id_EditPage_CMS_VIS_Lines2").style.visibility="hidden";
        document.getElementById("id_EditPage_CMS_VIS_Lines3").style.visibility="hidden";

        var scaleButton = document.getElementById("id_actionMenu_scaleButton");
        if (scaleButton.classList.contains('dropdownMenuButton'))
        scaleButton.classList.remove('dropdownMenuButton');

        if (!scaleButton.classList.contains('dropdownNotActiveMenuButton'))
        scaleButton.classList.toggle("dropdownNotActiveMenuButton");

        var exportButton = document.getElementById("id_actionMenu_exportButton");
        if (exportButton.classList.contains('dropdownMenuButton'))
        exportButton.classList.remove('dropdownMenuButton');

        if (!exportButton.classList.contains('dropdownNotActiveMenuButton'))
        exportButton.classList.toggle("dropdownNotActiveMenuButton");

        var clearButton = document.getElementById("id_actionMenu_clearButton");
        if (clearButton.classList.contains('dropdownMenuButton'))
        clearButton.classList.remove('dropdownMenuButton');

        if (!clearButton.classList.contains('dropdownNotActiveMenuButton'))
        clearButton.classList.toggle("dropdownNotActiveMenuButton");



        /*if(document.getElementById("id_editPage_EditDiv").style.display!="none")
          document.getElementById("id_editPage_HelpImage1").style.display="block";*/
  }


  fillTable();

    if(document.getElementById("id_editPage_AnalyzeMappingDiv").style.display!="none"){

      if(document.getElementById("id_EditPage_DivAnalyze").style.display!="none" && autoAnalyze){
        updateAnalyze();
      }
      else{
        // updateMapping

        if(document.getElementById("id_EditPage_Mapping_DoAutoUpdate").checked==true && mapping_doingAnimation){
          updateMesh();
        }

      }
    }


}





function switchModifyModus(type){


  document.getElementById("id_editPage_SelectAddStructures").style.background=styleNotActiveColor;
  document.getElementById("id_editPage_SelectEditKeys").style.background=styleNotActiveColor;
  document.getElementById("id_editPage_SelectEditPath").style.background=styleNotActiveColor;

  document.getElementById("id_EditPage_Add_Structures").style.display="none";

  document.getElementById("id_EditPage_Edit_Keys").style.display="none";
  document.getElementById("id_EditPage_Edit_Path").style.display="none";


  switch (type) {
    case 0:
      document.getElementById("id_editPage_SelectAddStructures").style.background=styleActiveColor;
      document.getElementById("id_EditPage_Add_Structures").style.display="block";
      updatePredefined();
    break;

    case 1:

    if(globalCMS1.getKeyLength() != 0){
      document.getElementById("id_editPage_SelectEditKeys").style.background=styleActiveColor;
      document.getElementById("id_EditPage_Edit_Keys").style.display="block";
      openEditKeyDiv(0);
    }
    else{
      openAlert("There are no keys for modyfing. Please use Add Bands to create a CMS.");
      switchModifyModus(0);
    }
    break;

    case 2:

    if(globalCMS1.getKeyLength() != 0){
      document.getElementById("id_editPage_SelectEditPath").style.background=styleActiveColor;
      document.getElementById("id_EditPage_Edit_Path").style.display="block";
      choosePathPlotSpace(2);
    }
    else{
      openAlert("There are no keys for modyfing. Please use Add Bands to create a CMS.");
      switchModifyModus(0);
    }
    break;
    default:
    switchModifyModus(0);
  }
}




function switchCMSInformation(type){

  /*if(type==0){
    document.getElementById("id_EditPage_DivCMSDescription").style.display="block";
    document.getElementById("id_EditPage_DivKeyDescription").style.display="none";
    document.getElementById("id_editPage_SelectCMSDescription").style.background=styleActiveColor;
    document.getElementById("id_editPage_SelectKeyDescription").style.background=styleNotActiveColor;
  }
  else{
    document.getElementById("id_EditPage_DivKeyDescription").style.display="block";
    document.getElementById("id_EditPage_DivCMSDescription").style.display="none";
    document.getElementById("id_editPage_SelectKeyDescription").style.background=styleActiveColor;
    document.getElementById("id_editPage_SelectCMSDescription").style.background=styleNotActiveColor;
  }*/

}


function switchAnalyzeMapping(type){

  if(type==0){
    document.getElementById("id_EditPage_DivAnalyze").style.display="block";
    document.getElementById("id_EditPage_DivMapping").style.display="none";
    document.getElementById("id_editPage_SelectAnalyze").style.background=styleActiveColor;
    document.getElementById("id_editPage_SelectMapping").style.background=styleNotActiveColor;
    stopAnimationMapping();
    updateAnalyze();
  }
  else{
    document.getElementById("id_EditPage_DivMapping").style.display="block";
    document.getElementById("id_EditPage_DivAnalyze").style.display="none";
    document.getElementById("id_editPage_SelectMapping").style.background=styleActiveColor;
    document.getElementById("id_editPage_SelectAnalyze").style.background=styleNotActiveColor;

    var rect = document.getElementById("id_EditPage_DivMapping").getBoundingClientRect();
      document.getElementById("id_EditPage_DrawMappingDiv").style.height=rect.height+"px";

      var box = document.getElementById("id_EditPage_DrawMappingDiv").getBoundingClientRect();
      var drawWidth = box.width; //window.innerWidth;
      var drawHeight =box.height; // window.innerHeight;

    	mapping_camera.aspect = drawWidth/drawHeight;
    	mapping_camera.updateProjectionMatrix();

    	mapping_renderer.setSize(drawWidth, drawHeight);

      animateMapping();

      if(document.getElementById("id_EditPage_Mapping_DoAutoUpdate").checked==true && mapping_doingAnimation){
        updateMesh();
      }

  }

}


function updateDescription(){
  globalCMS1.setDescription(document.getElementById("id_editPage_CMSDescription").value);
  saveCreateProcess();
}

function updateColormapName(){
  globalCMS1.setColormapName(document.getElementById("id_EditPage_CMSName").value);
  saveCreateProcess();
}


function updateAutoRangeInput(){
  document.getElementById("id_inputAutoRangeStart").value=globalCMS1.getRefPosition(0);
  document.getElementById("id_inputAutoRangeEnd").value=globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);
  document.getElementById("id_inputAutoRangeEnd").min = document.getElementById("id_inputAutoRangeStart").value;
  document.getElementById("id_inputAutoRangeStart").max = document.getElementById("id_inputAutoRangeEnd").value;
}



function switchCustomScaleColors(){

  var tmp = customScaleBandColor1;
  customScaleBandColor1 = customScaleBandColor2;
  customScaleBandColor2 = tmp;

  drawScaleCustomBand();

  if(document.getElementById("id_popupColorPicker").style.display!="none"){
    document.getElementById("id_popupColorPicker").style.display="none";
  }
}


function clearColormap(){

  if(document.getElementById("id_actionMenu_clearButton").classList.contains('dropdownMenuButton')){
    askType=0;
    openAskWindow();


  }
  document.getElementById("id_dropDownContainer").style.display="none";

}


//////////////////////////
//// Display Options

function showHideEditContainer(){

  if(document.getElementById("id_editPage_EditDiv").style.display=="none"){
      document.getElementById("id_editPage_EditDiv").style.display="inline-block";
      document.getElementById("id_dropDownMenue_HideEdit_Label").innerHTML="&#9673; Edit";

      /*if(globalCMS1.getKeyLength()==0){
        document.getElementById("id_editPage_HelpImage1").style.display="block";
      }*/
  }
  else{
      document.getElementById("id_editPage_EditDiv").style.display="none";
      document.getElementById("id_dropDownMenue_HideEdit_Label").innerHTML="&#9675; Edit";

      /*if(document.getElementById("id_editPage_HelpImage1").style.display!="none"){
        document.getElementById("id_editPage_HelpImage1").style.display="none";
      }*/
  }

  document.getElementById("id_dropDownContainer").style.display="none";


}



function showHideAnalyzeContainer(){

  if(document.getElementById("id_editPage_AnalyzeMappingDiv").style.display=="none"){
      document.getElementById("id_editPage_AnalyzeMappingDiv").style.display="block";
      document.getElementById("id_dropDownMenue_HideAnalyze_Label").innerHTML="&#9673; Analyze/Mapping";

      if(document.getElementById("id_EditPage_DivMapping").style.display!="none"){
        animateMapping();

        if(document.getElementById("id_EditPage_Mapping_DoAutoUpdate").checked==true && mapping_doingAnimation){
          updateMesh();
        }
      }
  }
  else{
      document.getElementById("id_dropDownMenue_HideAnalyze_Label").innerHTML="&#9675; Analyze/Mapping";
      document.getElementById("id_editPage_AnalyzeMappingDiv").style.display="none";
      stopAnimationMapping();

  }

  document.getElementById("id_dropDownContainer").style.display="none";
}

function showHideCMSInfoContainer(){

  if(document.getElementById("id_editPage_DescriptionDiv").style.display=="none"){
      document.getElementById("id_editPage_DescriptionDiv").style.display="block";
      document.getElementById("id_dropDownMenue_HideDescription_Label").innerHTML="&#9673; CMS-Info";
  }
  else{
      document.getElementById("id_dropDownMenue_HideDescription_Label").innerHTML="&#9675; CMS-Info";
      document.getElementById("id_editPage_DescriptionDiv").style.display="none";
  }

  document.getElementById("id_dropDownContainer").style.display="none";
}


function showHideHistogram(){

  if (document.getElementById("id_dropDownMenue_ShowHistogram").classList.contains('dropdownMenuButton')){
    if(document.getElementById("id_EditPage_Histogram_Div").style.display=="none"){
        document.getElementById("id_EditPage_Histogram_Div").style.display="block";
        document.getElementById("id_dropDownMenue_ShowHistogram").innerHTML= "&#9673; Histogram";
        drawHistogram(false);
        updateEditPage();
    }
    else{
        document.getElementById("id_dropDownMenue_ShowHistogram").innerHTML="&#9675; Histogram";
        document.getElementById("id_EditPage_Histogram_Div").style.display="none";
    }
  }

}


function showHideProbePreview(){

    if(document.getElementById("id_EditPage_PreviewProbe_Div").style.display=="none"){
        document.getElementById("id_EditPage_PreviewProbe_Div").style.display="block";
        document.getElementById("id_dropDownMenue_ShowProbePreview").innerHTML= "&#9673; Probe Preview";
        updateEditPage();
    }
    else{
        document.getElementById("id_dropDownMenue_ShowProbePreview").innerHTML="&#9675; Probe Preview";
        document.getElementById("id_EditPage_PreviewProbe_Div").style.display="none";
    }


}


function showEditMode(){
  if(document.getElementById("id_EditPage_PreviewProbe_Div").style.display!="none")
    showHideProbePreview();

  if(document.getElementById("id_EditPage_Histogram_Div").style.display!="none")
    showHideHistogram();

  if(document.getElementById("id_editPage_DescriptionDiv").style.display=="none")
    showHideCMSInfoContainer();

  if(document.getElementById("id_editPage_AnalyzeMappingDiv").style.display!="none")
    showHideAnalyzeContainer();

  if(document.getElementById("id_editPage_EditDiv").style.display=="none")
    showHideEditContainer();
}

function showAnalyzeMode(){
  if(document.getElementById("id_EditPage_PreviewProbe_Div").style.display!="none")
    showHideProbePreview();

  if(document.getElementById("id_EditPage_Histogram_Div").style.display!="none")
    showHideHistogram();

  if(document.getElementById("id_editPage_DescriptionDiv").style.display!="none")
    showHideCMSInfoContainer();

  if(document.getElementById("id_editPage_AnalyzeMappingDiv").style.display=="none")
    showHideAnalyzeContainer();

    if(document.getElementById("id_EditPage_DivAnalyze").style.display=="none")
      switchAnalyzeMapping(0);

  if(document.getElementById("id_editPage_EditDiv").style.display!="none")
    showHideEditContainer();
}

function showMappingMode(){
  if(document.getElementById("id_EditPage_PreviewProbe_Div").style.display!="none")
    showHideProbePreview();

    if(document.getElementById("id_EditPage_Histogram_Div").style.display=="none")
      showHideHistogram();

  if(document.getElementById("id_editPage_DescriptionDiv").style.display!="none")
    showHideCMSInfoContainer();

  if(document.getElementById("id_EditPage_DivMapping").style.display=="none")
    switchAnalyzeMapping(1);

  if(document.getElementById("id_editPage_AnalyzeMappingDiv").style.display=="none")
    showHideAnalyzeContainer();

  if(document.getElementById("id_editPage_EditDiv").style.display!="none")
    showHideEditContainer();
}
