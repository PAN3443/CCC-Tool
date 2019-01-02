
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



  var context = document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").getContext('2d');
  context.clearRect(0, 0, document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").width, document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").height);


  if(globalCMS1.getKeyLength() != 0){


        document.getElementById("id_EditPage_CMS_VIS_SketchKeyNumbers").style.visibility="visible";
        document.getElementById("id_EditPage_CMS_VIS_LinearKeys").style.visibility="visible";
        document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.visibility="visible";
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


        if(globalCMS1.getProbeSetLength()!=0 && document.getElementById("id_EditPage_DivProbeSets").style.display!="none"){

          var tmpCMS = globalCMS1.getProbeSet(document.getElementById("id_selectProbeSetList").selectedIndex).generateProbeCMS(globalCMS1);

          drawCanvasColormap("id_EditPage_ProbePreview", tmpCMS);

        }

        drawCanvasColormap("id_EditPage_CMS_VIS_ColormapLinear", globalCMS1);
        drawKeys("id_EditPage_CMS_VIS_LinearKeys",  globalCMS1);
        drawSketchKeys("id_EditPage_CMS_VIS_SketchKeys", globalCMS1);
        drawLines("id_EditPage_CMS_VIS_Lines1",true, true,  globalCMS1);
        drawLines("id_EditPage_CMS_VIS_Lines2",false, false,  globalCMS1);
        drawKeyNumber("id_EditPage_CMS_VIS_SketchKeyNumbers", globalCMS1);
        drawKeyBursLine("id_EditPage_CMS_VIS_KeyBurs",globalCMS1);

        document.getElementById("id_EditPage_CMS_VIS_Label1").innerHTML = globalCMS1.getRefPosition(0);
        document.getElementById("id_EditPage_CMS_VIS_Label2").innerHTML = globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);




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


        document.getElementById("id_EditPage_CMS_VIS_Label1").innerHTML = "";
        document.getElementById("id_EditPage_CMS_VIS_Label2").innerHTML = "";
        /*if(document.getElementById("id_editPage_EditDiv").style.display!="none")
          document.getElementById("id_editPage_HelpImage1").style.display="block";*/
  }

  fillTable();

  if(document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display!="none"){

      if(document.getElementById("id_EditPage_DivAnalyze").style.display!="none" && autoAnalyze){
        updateAnalyze();
      }
      else{
        // updateMapping

        if(doAutoUpdate && mapping_doingAnimation){
          updateMesh();
        }

      }
    }


}


function reverseCMS(){
  globalCMS1.calcReverse();
  updateEditPage();

  if(document.getElementById("id_EditPage_Edit_Keys").style.display!="none"){
     openEditKeyDiv(document.getElementById("id_EditPage_EditKey_List").selectedIndex);
  }

  if(document.getElementById("id_EditPage_Edit_Path").style.display!="none"){
    if(pathColorspace==="rgb")
      drawcolormap_RGBSpace(true,true);
    else
      drawcolormap_hueSpace(true, true, true);
  }
}


function switchModifyModus(type){


  document.getElementById("id_editPage_SelectEditKeys").style.background=styleNotActiveColor;
  document.getElementById("id_editPage_SelectEditPath").style.background=styleNotActiveColor;

  document.getElementById("id_editPage_SelectEditKeys").style.color=styleNotActiveColorFont;
  document.getElementById("id_editPage_SelectEditPath").style.color=styleNotActiveColorFont;

  document.getElementById("id_EditPage_Edit_Keys").style.display="none";
  document.getElementById("id_EditPage_Edit_Path").style.display="none";

  switch (type) {
    case 0:

      document.getElementById("id_editPage_SelectEditKeys").style.background=styleActiveColor;
      document.getElementById("id_editPage_SelectEditKeys").style.color=styleActiveColorFont;
      document.getElementById("id_EditPage_Edit_Keys").style.display="block";
      openEditKeyDiv(0);

    break;

    case 1:
      document.getElementById("id_editPage_SelectEditPath").style.background=styleActiveColor;
      document.getElementById("id_editPage_SelectEditPath").style.color=styleActiveColorFont;
        document.getElementById("id_EditPage_Edit_Path").style.display="block";
        choosePathPlotSpace(2);
    break;
    default:
    switchModifyModus(0);
  }
}


function switchAnalyzeMappingProbeSet(type){

  if(document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display=="none")
  return;

  document.getElementById("id_editPage_SelectAnalyze").style.background=styleNotActiveColor;
  document.getElementById("id_editPage_SelectMapping").style.background=styleNotActiveColor;
  document.getElementById("id_editPage_SelectProbeSet").style.background=styleNotActiveColor;

  document.getElementById("id_editPage_SelectAnalyze").style.color=styleNotActiveColorFont;
  document.getElementById("id_editPage_SelectMapping").style.color=styleNotActiveColorFont;
  document.getElementById("id_editPage_SelectProbeSet").style.color=styleNotActiveColorFont;

  document.getElementById("id_EditPage_DivAnalyze").style.display="none";
  document.getElementById("id_EditPage_DivMapping").style.display="none";
  document.getElementById("id_EditPage_DivProbeSets").style.display="none";


  stopAnimationMapping();

  switch (type) {
    case 0:

      document.getElementById("id_editPage_SelectAnalyze").style.background=styleActiveColor;
      document.getElementById("id_editPage_SelectAnalyze").style.color=styleActiveColorFont;
      document.getElementById("id_EditPage_DivAnalyze").style.display="flex";
      updateAnalyze();
    break;

    case 1:
      document.getElementById("id_editPage_SelectMapping").style.background=styleActiveColor;
      document.getElementById("id_editPage_SelectMapping").style.color=styleActiveColorFont;
      document.getElementById("id_EditPage_DivMapping").style.display="block";

        var rect = document.getElementById("id_EditPage_DivMapping").getBoundingClientRect();
        document.getElementById("id_EditPage_DrawMappingDiv").style.height=rect.height+"px";

        var box = document.getElementById("id_EditPage_DrawMappingDiv").getBoundingClientRect();
        var drawWidth = box.width; //window.innerWidth;
        var drawHeight =box.height; // window.innerHeight;

      	mapping_camera.aspect = drawWidth/drawHeight;
      	mapping_camera.updateProjectionMatrix();

      	mapping_renderer.setSize(drawWidth, drawHeight);

        animateMapping();

        if(doAutoUpdate && mapping_doingAnimation){
          updateMesh();
        }
    break;

    case 2:
      document.getElementById("id_editPage_SelectProbeSet").style.background=styleActiveColor;
      document.getElementById("id_editPage_SelectProbeSet").style.color=styleActiveColorFont;
      document.getElementById("id_EditPage_DivProbeSets").style.display="block";
      init_editProbe();
    break;
    default:
    switchAnalyzeMappingProbeSet(0);
  }

}


function switchPredefinedCMS(type){

  document.getElementById("id_EditPage_Select_Predefined").style.background=styleNotActiveColor;
  document.getElementById("id_EditPage_Select_MyDesigns").style.background=styleNotActiveColor;

  document.getElementById("id_EditPage_Select_Predefined").style.color=styleNotActiveColorFont;
  document.getElementById("id_EditPage_Select_MyDesigns").style.color=styleNotActiveColorFont;

  document.getElementById("id_EditPage_Predefined_Div").style.display="none";
  document.getElementById("id_EditPage_MyDesigns_CMS_Div").style.display="none";


  switch (type) {
    case 0:
      document.getElementById("id_EditPage_Select_Predefined").style.background=styleActiveColor;
      document.getElementById("id_EditPage_Select_Predefined").style.color=styleActiveColorFont;
      document.getElementById("id_EditPage_Predefined_Div").style.display="block";
      changePredefined();
      break;
    case 1:
      document.getElementById("id_EditPage_Select_MyDesigns").style.background=styleActiveColor;
      document.getElementById("id_EditPage_MyDesigns_CMS_Div").style.display="block";
      document.getElementById("id_EditPage_Select_MyDesigns").style.color=styleActiveColorFont;
      drawPredefined_MyDesignsCMS();
      break;
    default:
    switchPredefinedCMS(0);
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
