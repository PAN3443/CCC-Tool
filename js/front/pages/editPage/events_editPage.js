
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


  if(globalCMS1.getKeyLength() != 0){


        document.getElementById("id_EditPage_CMS_VIS_SketchKeyNumbers").style.visibility="visible";
        document.getElementById("id_EditPage_CMS_VIS_LinearKeys").style.visibility="visible";
        document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.visibility="visible";
        document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").style.visibility="visible";
        document.getElementById("id_EditPage_RefPlaceholder").style.visibility="visible";
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


        document.getElementById("id_editPage_HelpImage1").style.display="none";


        drawCanvasColormap("id_EditPage_CMS_VIS_ColormapLinear", linearMap_resolution_X, linearMap_resolution_Y, globalCMS1);
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
    document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").style.visibility="hidden";
    document.getElementById("id_EditPage_RefPlaceholder").style.visibility="hidden";
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



        if(document.getElementById("id_editPage_EditDiv").style.display!="none")
          document.getElementById("id_editPage_HelpImage1").style.display="block";
  }




  fillTable();
  var rect = document.getElementById("id_EditPage_MainPartDiv").getBoundingClientRect();
  document.getElementById("id_EditPage").style.height =  rect.height +"px";


    if(document.getElementById("id_editPage_AnalyzeMappingDiv").style.display!="none"){

      if(document.getElementById("id_EditPage_DivAnalyze").style.display!="none"){
        updateAnalyze();
      }
      else{
        // updateMapping
      }
    }


}


function switchModifyModus(type){


  document.getElementById("id_editPage_SelectAddStructures").style.background="none";
  document.getElementById("id_editPage_SelectAddKeys").style.background="none";
  document.getElementById("id_editPage_SelectEditKeys").style.background="none";
  document.getElementById("id_editPage_SelectEditPath").style.background="none";

  document.getElementById("id_EditPage_Add_Structures").style.display="none";
  document.getElementById("id_EditPage_Add_Keys").style.display="none";
  document.getElementById("id_EditPage_Edit_Keys").style.display="none";
  document.getElementById("id_EditPage_Edit_Path").style.display="none";


  switch (type) {
    case 0:
      document.getElementById("id_editPage_SelectAddStructures").style.background=styleActiveColor;
      document.getElementById("id_EditPage_Add_Structures").style.display="block";
    break;
    case 1:
      if(globalCMS1.getKeyLength() != 0){
        document.getElementById("id_editPage_SelectAddKeys").style.background=styleActiveColor;
        document.getElementById("id_EditPage_Add_Keys").style.display="block";
        //addKeyButtons();
      }
      else{
        openAlert("Adding Keys needs a CMS structure. Please use Add Bands to create a CMS.");
        switchModifyModus(0);
      }
    break;
    case 2:

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

    case 3:

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

  if(type==0){
    document.getElementById("id_EditPage_DivCMSDescription").style.display="block";
    document.getElementById("id_EditPage_DivKeyDescription").style.display="none";
    document.getElementById("id_editPage_SelectCMSDescription").style.background=styleActiveColor;
    document.getElementById("id_editPage_SelectKeyDescription").style.background="none";
  }
  else{
    document.getElementById("id_EditPage_DivKeyDescription").style.display="block";
    document.getElementById("id_EditPage_DivCMSDescription").style.display="none";
    document.getElementById("id_editPage_SelectKeyDescription").style.background=styleActiveColor;
    document.getElementById("id_editPage_SelectCMSDescription").style.background="none";
  }

}


function switchAnalyzeMapping(type){

  if(type==0){
    document.getElementById("id_EditPage_DivAnalyze").style.display="block";
    document.getElementById("id_EditPage_DivMapping").style.display="none";
    document.getElementById("id_editPage_SelectAnalyze").style.background=styleActiveColor;
    document.getElementById("id_editPage_SelectMapping").style.background="none";

    updateAnalyze();
  }
  else{
    document.getElementById("id_EditPage_DivMapping").style.display="block";
    document.getElementById("id_EditPage_DivAnalyze").style.display="none";
    document.getElementById("id_editPage_SelectMapping").style.background=styleActiveColor;
    document.getElementById("id_editPage_SelectAnalyze").style.background="none";
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
    openAskWindow()
  }
  document.getElementById("id_dropDownContainer").style.display="none";

}


//////////////////////////
//// Display Options

function showHideEditContainer(){

  if(document.getElementById("id_editPage_EditDiv").style.display=="none"){
      document.getElementById("id_editPage_EditDiv").style.display="inline-block";
      document.getElementById("id_dropDownMenue_HideEdit_Label").innerHTML="Hide Edit";

      if(globalCMS1.getKeyLength()==0){
        document.getElementById("id_editPage_HelpImage1").style.display="block";
      }
  }
  else{
      document.getElementById("id_editPage_EditDiv").style.display="none";
      document.getElementById("id_dropDownMenue_HideEdit_Label").innerHTML="Show Edit";

      if(document.getElementById("id_editPage_HelpImage1").style.display!="none"){
        document.getElementById("id_editPage_HelpImage1").style.display="none";
      }
  }

  document.getElementById("id_dropDownContainer").style.display="none";


}



function showHideAnalyzeContainer(){

  if(document.getElementById("id_editPage_AnalyzeMappingDiv").style.display=="none"){
      document.getElementById("id_editPage_AnalyzeMappingDiv").style.display="inline-block";
      document.getElementById("id_dropDownMenue_HideAnalyze_Label").innerHTML="Hide Analyze/Mapping";

      if(document.getElementById("id_editPage_DescriptionDiv").style.display=="none")
        document.getElementById("id_editPage_AnalyzeMappingDiv").style.width="100%";
      else{
        document.getElementById("id_editPage_DescriptionDiv").style.width="38%";
        document.getElementById("id_editPage_AnalyzeMappingDiv").style.width="60%";
      }

  }
  else{
      document.getElementById("id_dropDownMenue_HideAnalyze_Label").innerHTML="Show Analyze/Mapping";
      document.getElementById("id_editPage_AnalyzeMappingDiv").style.display="none";
      document.getElementById("id_editPage_DescriptionDiv").style.width="100%";
  }


  document.getElementById("id_dropDownContainer").style.display="none";
}

function showHideCMSInfoContainer(){

  if(document.getElementById("id_editPage_DescriptionDiv").style.display=="none"){
      document.getElementById("id_editPage_DescriptionDiv").style.display="inline-block";
      document.getElementById("id_dropDownMenue_HideDescription_Label").innerHTML="Hide CMS-Info";

      if(document.getElementById("id_editPage_AnalyzeMappingDiv").style.display=="none")
        document.getElementById("id_editPage_DescriptionDiv").style.width="100%";
      else{
        document.getElementById("id_editPage_DescriptionDiv").style.width="38%";
        document.getElementById("id_editPage_AnalyzeMappingDiv").style.width="60%";
      }


  }
  else{
      document.getElementById("id_dropDownMenue_HideDescription_Label").innerHTML="Show CMS-Info";
      document.getElementById("id_editPage_DescriptionDiv").style.display="none";
      document.getElementById("id_editPage_AnalyzeMappingDiv").style.width="100%";
  }

  document.getElementById("id_dropDownContainer").style.display="none";
}
