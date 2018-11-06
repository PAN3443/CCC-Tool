
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
        if (scaleButton.classList.contains('settingNotActiveMenuButton'))
        scaleButton.classList.remove('settingNotActiveMenuButton');

        if (!scaleButton.classList.contains('settingMenuButton'))
        scaleButton.classList.toggle("settingMenuButton");

        var exportButton = document.getElementById("id_actionMenu_exportButton");
        if (exportButton.classList.contains('settingNotActiveMenuButton'))
        exportButton.classList.remove('settingNotActiveMenuButton');

        if (!exportButton.classList.contains('settingMenuButton'))
        exportButton.classList.toggle("settingMenuButton");

        var clearButton = document.getElementById("id_actionMenu_clearButton");
        if (clearButton.classList.contains('settingNotActiveMenuButton'))
        clearButton.classList.remove('settingNotActiveMenuButton');

        if (!clearButton.classList.contains('settingMenuButton'))
        clearButton.classList.toggle("settingMenuButton");


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
        if (scaleButton.classList.contains('settingMenuButton'))
        scaleButton.classList.remove('settingMenuButton');

        if (!scaleButton.classList.contains('settingNotActiveMenuButton'))
        scaleButton.classList.toggle("settingNotActiveMenuButton");

        var exportButton = document.getElementById("id_actionMenu_exportButton");
        if (exportButton.classList.contains('settingMenuButton'))
        exportButton.classList.remove('settingMenuButton');

        if (!exportButton.classList.contains('settingNotActiveMenuButton'))
        exportButton.classList.toggle("settingNotActiveMenuButton");

        var clearButton = document.getElementById("id_actionMenu_clearButton");
        if (clearButton.classList.contains('settingMenuButton'))
        clearButton.classList.remove('settingMenuButton');

        if (!clearButton.classList.contains('settingNotActiveMenuButton'))
        clearButton.classList.toggle("settingNotActiveMenuButton");



        if(document.getElementById("id_editPage_EditDiv").style.display!="none")
          document.getElementById("id_editPage_HelpImage1").style.display="block";
  }




  fillTable();
  var rect = document.getElementById("id_EditPage_MainPartDiv").getBoundingClientRect();
  document.getElementById("id_EditPage").style.height =  rect.height +"px";

    /*for (var i = refLineSketchContainer.length - 1; i >= 0; i--) {
      refLineSketchContainer[i].remove();
      refLineSketchContainer.pop();
    }*/

   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   /*if(document.getElementById("mapping_checkAutoUpdate").checked==true && mapping_doingAnimation && document.getElementById('switchExpertModeWelcomePage').checked){
     updateMesh();
   }*/




    // show and draw the colormap
    /*if(globalCMS1.getKeyLength() != 0){

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
      }*/





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
      openEditKeyDiv();
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

  if(document.getElementById("id_actionMenu_clearButton").classList.contains('settingMenuButton')){
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

  if(document.getElementById("id_editPage_AnalyzeDiv").style.display=="none"){
      document.getElementById("id_editPage_AnalyzeDiv").style.display="inline-block";
      document.getElementById("id_dropDownMenue_HideAnalyze_Label").innerHTML="Hide Analyze/Mapping";

      if(document.getElementById("id_editPage_DescriptionDiv").style.display=="none")
        document.getElementById("id_editPage_AnalyzeDiv").style.width="100%";
      else{
        document.getElementById("id_editPage_DescriptionDiv").style.width="38%";
        document.getElementById("id_editPage_AnalyzeDiv").style.width="60%";
      }

  }
  else{
      document.getElementById("id_dropDownMenue_HideAnalyze_Label").innerHTML="Show Analyze/Mapping";
      document.getElementById("id_editPage_AnalyzeDiv").style.display="none";
      document.getElementById("id_editPage_DescriptionDiv").style.width="100%";
  }


  document.getElementById("id_dropDownContainer").style.display="none";
}

function showHideCMSInfoContainer(){

  if(document.getElementById("id_editPage_DescriptionDiv").style.display=="none"){
      document.getElementById("id_editPage_DescriptionDiv").style.display="inline-block";
      document.getElementById("id_dropDownMenue_HideDescription_Label").innerHTML="Hide CMS-Info";

      if(document.getElementById("id_editPage_AnalyzeDiv").style.display=="none")
        document.getElementById("id_editPage_DescriptionDiv").style.width="100%";
      else{
        document.getElementById("id_editPage_DescriptionDiv").style.width="38%";
        document.getElementById("id_editPage_AnalyzeDiv").style.width="60%";
      }


  }
  else{
      document.getElementById("id_dropDownMenue_HideDescription_Label").innerHTML="Show CMS-Info";
      document.getElementById("id_editPage_DescriptionDiv").style.display="none";
      document.getElementById("id_editPage_AnalyzeDiv").style.width="100%";
  }

  document.getElementById("id_dropDownContainer").style.display="none";
}




/*





function editPage_ChangeScalar(event){

  var inputObj = document.getElementById(event.target.id);
  checkInputVal(inputObj, true, true);
  var id = event.target.id;
  changeKeyValueInput(selectedKey, id);

}


function editPage_CheckScalar(event){
  var inputObj = document.getElementById(event.target.id);

  checkInputVal(inputObj, true, true);

  if (event.keyCode == 13) {
    var id = event.target.id;
    changeKeyValueInput(selectedKey, id);
  }
}

function changeKeyType(event){

  switch (event.target.id) {
    case "editSide_Radiobutton_KeyTypeNil":
    if(globalCMS1.getKeyType(selectedKey)==="right key"){

      globalCMS1.setRightKeyColor(selectedKey,undefined);
      globalCMS1.setLeftKeyColor(selectedKey,undefined);

    }

      break;
    case "editSide_Radiobutton_KeyTypeTwin":
      if(globalCMS1.getKeyType(selectedKey)==="dual key" || globalCMS1.getKeyType(selectedKey)==="left key"){

        var tmpColor = globalCMS1.getLeftKeyColor(selectedKey+1,colorspaceModus);


        if(tmpColor.get1Value()!=0||tmpColor.get2Value()!=0||tmpColor.get3Value()!=0)
        {
          tmpColor.set1Value(tmpColor.get1Value()*0.75);
          tmpColor.set2Value(tmpColor.get2Value()*0.75);
          tmpColor.set3Value(tmpColor.get3Value()*0.75);
        }
        else{
          tmpColor.set1Value(1);
          tmpColor.set2Value(1);
          tmpColor.set3Value(1);
        }
        globalCMS1.setRightKeyColor(selectedKey,tmpColor);

        var tmpColor2;
        if(globalCMS1.getKeyType(selectedKey-1)==="left key" || globalCMS1.getKeyType(selectedKey-1)==="nil key")
          tmpColor2 = globalCMS1.getLeftKeyColor(selectedKey,colorspaceModus);
        else{
          tmpColor2 = globalCMS1.getRightKeyColor(selectedKey-1,colorspaceModus);

          if(tmpColor2.get1Value()!=0||tmpColor2.get2Value()!=0||tmpColor2.get3Value()!=0)
          {
            tmpColor2.set1Value(tmpColor2.get1Value()*0.75);
            tmpColor2.set2Value(tmpColor2.get2Value()*0.75);
            tmpColor2.set3Value(tmpColor2.get3Value()*0.75);
          }
          else{
            tmpColor2.set1Value(1);
            tmpColor2.set2Value(1);
            tmpColor2.set3Value(1);
          }
        }

        globalCMS1.setLeftKeyColor(selectedKey,tmpColor2);

      }
      break;
    case "editSide_Radiobutton_KeyTypeLeft":
      if(globalCMS1.getKeyType(selectedKey)==="dual key" || globalCMS1.getKeyType(selectedKey)==="twin key"){
        globalCMS1.setRightKeyColor(selectedKey,undefined);
      }

      break;
    case "editSide_Radiobutton_KeyTypeRight":
      if(globalCMS1.getKeyType(selectedKey)==="nil key"){
        var tmpColor = globalCMS1.getLeftKeyColor(selectedKey+1,colorspaceModus);

        if(tmpColor.get1Value()!=0||tmpColor.get2Value()!=0||tmpColor.get3Value()!=0)
        {
          tmpColor.set1Value(tmpColor.get1Value()*0.5);
          tmpColor.set2Value(tmpColor.get2Value()*0.5);
          tmpColor.set3Value(tmpColor.get3Value()*0.5);
        }
        else{
          tmpColor.set1Value(1);
          tmpColor.set2Value(1);
          tmpColor.set3Value(1);
        }
        globalCMS1.setRightKeyColor(selectedKey,tmpColor);
        globalCMS1.setLeftKeyColor(selectedKey,undefined);
      }

      break;
    default:
    // dual key+
        if(globalCMS1.getKeyType(selectedKey)==="twin key" || globalCMS1.getKeyType(selectedKey)==="left key"){
            var tmpColor = globalCMS1.getLeftKeyColor(selectedKey,colorspaceModus);

            if(tmpColor.get1Value()!=0||tmpColor.get2Value()!=0||tmpColor.get3Value()!=0)
            {
              tmpColor.set1Value(tmpColor.get1Value()*0.5);
              tmpColor.set2Value(tmpColor.get2Value()*0.5);
              tmpColor.set3Value(tmpColor.get3Value()*0.5);
            }
            else{
              tmpColor.set1Value(1);
              tmpColor.set2Value(1);
              tmpColor.set3Value(1);
            }

            globalCMS1.setRightKeyColor(selectedKey,tmpColor);
            globalCMS1.setLeftKeyColor(selectedKey,tmpColor);


        }


  }

  orderColorSketch();
  selectKey();
  saveCreateProcess();
}

function changeColorpickerType(event){
  switch (event.target.id) {
    case "editSide_Radiobutton_PickerRG_B":
      colorpickerType="RG_B";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="RG";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="B";
      document.getElementById("bandCreator_Radiobutton_PickerRG_B").checked=true;
    break;
    case "editSide_Radiobutton_PickerRB_G":
      colorpickerType="RB_G";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="RB";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="G";
      document.getElementById("bandCreator_Radiobutton_PickerRB_G").checked=true;
    break;
    case "editSide_Radiobutton_PickerGB_R":
      colorpickerType="GB_R";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="GB";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="R";
      document.getElementById("bandCreator_Radiobutton_PickerGB_R").checked=true;
    break;
    case "editSide_Radiobutton_PickerHS_V":
      colorpickerType="HS_V";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="HS";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="V";
      document.getElementById("bandCreator_Radiobutton_PickerHS_V").checked=true;
    break;
    case "editSide_Radiobutton_PickerHV_S":
      colorpickerType="HV_S";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="HV";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="S";
      document.getElementById("bandCreator_Radiobutton_PickerHV_S").checked=true;
    break;
    case "editSide_Radiobutton_PickerSV_H":
      colorpickerType="SV_H";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="SV";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="H";
      document.getElementById("bandCreator_Radiobutton_PickerSV_H").checked=true;
    break;
    case "bandCreator_Radiobutton_PickerRG_B":
      colorpickerType="RG_B";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="RG";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="B";
      document.getElementById("editSide_Radiobutton_PickerRG_B").checked=true;
    break;
    case "bandCreator_Radiobutton_PickerRB_G":
      colorpickerType="RB_G";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="RB";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="G";
      document.getElementById("editSide_Radiobutton_PickerRB_G").checked=true;
    break;
    case "bandCreator_Radiobutton_PickerGB_R":
      colorpickerType="GB_R";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="GB";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="R";
      document.getElementById("editSide_Radiobutton_PickerGB_R").checked=true;
    break;
    case "bandCreator_Radiobutton_PickerHS_V":
      colorpickerType="HS_V";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="HS";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="V";
      document.getElementById("editSide_Radiobutton_PickerHS_V").checked=true;
    break;
    case "bandCreator_Radiobutton_PickerHV_S":
      colorpickerType="HV_S";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="HV";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="S";
      document.getElementById("editSide_Radiobutton_PickerHV_S").checked=true;
    break;
    case "bandCreator_Radiobutton_PickerSV_H":
      colorpickerType="SV_H";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="SV";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="H";
      document.getElementById("editSide_Radiobutton_PickerSV_H").checked=true;
    break;
    default:

  }

  if(bandCreatorOpen){
    initColorpickerBackground("bandCreator_canvasPicker", colorpickerType);
    drawEditPageColorCircles("bandCreator_canvasPicker","bandCreator_canvasPicker2", colorpickerType);
    switch (event.target.id) {
      case "bandCreator_Radiobutton_PickerRG_B":
        colorpickerType="RG_B";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="RG";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="B";
        document.getElementById("editSide_Radiobutton_PickerRG_B").checked=true;
      break;
      case "bandCreator_Radiobutton_PickerRB_G":
        colorpickerType="RB_G";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="RB";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="G";
        document.getElementById("editSide_Radiobutton_PickerRB_G").checked=true;
      break;
      case "bandCreator_Radiobutton_PickerGB_R":
        colorpickerType="GB_R";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="GB";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="R";
        document.getElementById("editSide_Radiobutton_PickerGB_R").checked=true;
      break;
      case "bandCreator_Radiobutton_PickerHS_V":
        colorpickerType="HS_V";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="HS";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="V";
        document.getElementById("editSide_Radiobutton_PickerHS_V").checked=true;
      break;
      case "bandCreator_Radiobutton_PickerHV_S":
        colorpickerType="HV_S";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="HV";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="S";
        document.getElementById("editSide_Radiobutton_PickerHV_S").checked=true;
      break;
      case "bandCreator_Radiobutton_PickerSV_H":
        colorpickerType="SV_H";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="SV";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="H";
        document.getElementById("editSide_Radiobutton_PickerSV_H").checked=true;
      break;
      default:
    }
  }else{
    initColorpickerBackground("editPage_canvasPicker", colorpickerType);
    drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
    switch (event.target.id) {
      case "editSide_Radiobutton_PickerRG_B":
        colorpickerType="RG_B";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="RG";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="B";
        document.getElementById("bandCreator_Radiobutton_PickerRG_B").checked=true;
      break;
      case "editSide_Radiobutton_PickerRB_G":
        colorpickerType="RB_G";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="RB";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="G";
        document.getElementById("bandCreator_Radiobutton_PickerRB_G").checked=true;
      break;
      case "editSide_Radiobutton_PickerGB_R":
        colorpickerType="GB_R";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="GB";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="R";
        document.getElementById("bandCreator_Radiobutton_PickerGB_R").checked=true;
      break;
      case "editSide_Radiobutton_PickerHS_V":
        colorpickerType="HS_V";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="HS";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="V";
        document.getElementById("bandCreator_Radiobutton_PickerHS_V").checked=true;
      break;
      case "editSide_Radiobutton_PickerHV_S":
        colorpickerType="HV_S";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="HV";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="S";
        document.getElementById("bandCreator_Radiobutton_PickerHV_S").checked=true;
      break;
      case "editSide_Radiobutton_PickerSV_H":
        colorpickerType="SV_H";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="SV";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="H";
        document.getElementById("bandCreator_Radiobutton_PickerSV_H").checked=true;
      break;
      default:

    }
  }

}


function editPageConfirmColor(){

  if(globalCMS1.getKeyType(selectedKey)==="dual key"){
    var tmpColor = new classColor_RGB(editColor1.get1Value(),editColor1.get2Value(),editColor1.get3Value());
    var tmpColor2 = new classColor_RGB(editColor2.get1Value(),editColor2.get2Value(),editColor2.get3Value());

    globalCMS1.setRightKeyColor(selectedKey,tmpColor);
    globalCMS1.setLeftKeyColor(selectedKey,tmpColor2);

    orderColorSketch();
    drawCurrentColor();
  }
  else{
      switch (selectedColor) {
        case 0:
            var tmpColor = new classColor_RGB(editColor1.get1Value(),editColor1.get2Value(),editColor1.get3Value());
            globalCMS1.setLeftKeyColor(selectedKey,tmpColor);
            orderColorSketch();
            drawCurrentColor();

        break;
        case 1:
              var tmpColor = new classColor_RGB(editColor2.get1Value(),editColor2.get2Value(),editColor2.get3Value());
              globalCMS1.setRightKeyColor(selectedKey,tmpColor);
              orderColorSketch();
              drawCurrentColor();

        break;
        default:
          document.getElementById("editPage_currentColor").style.background="none";
            document.getElementById("editPage_SetColor").style.background="none";
      }
  }

  saveCreateProcess();

}


function checkColorInputFieldsChange(event){

  var doSpace =0;
  switch (event.target.id) {
    case "id_editPageC1RInput":
    case "id_editPageC1GInput":
    case "id_editPageC1BInput":
    case "id_editPageC2RInput":
    case "id_editPageC2GInput":
    case "id_editPageC2BInput":
    case "id_bandCreatorC1RInput":
    case "id_bandCreatorC1GInput":
    case "id_bandCreatorC1BInput":
    case "id_bandCreatorC2RInput":
    case "id_bandCreatorC2GInput":
    case "id_bandCreatorC2BInput":
        doSpace=1;
        checkInputVal(document.getElementById(event.target.id),true,false);

        if(parseFloat(document.getElementById(event.target.id).value)>255){
            document.getElementById(event.target.id).value = 255;
        }

        if(parseFloat(document.getElementById(event.target.id).value)<0){
            document.getElementById(event.target.id).value = 0;
        }

    break;
    case "id_editPageC1HInput":
    case "id_editPageC2HInput":
    case "id_bandCreatorC1HInput":
    case "id_bandCreatorC2HInput":
    doSpace=2;
      checkInputVal(document.getElementById(event.target.id),true,false);

      if(parseFloat(document.getElementById(event.target.id).value)>360){
           document.getElementById(event.target.id).value = 360;
      }

      if(parseFloat(document.getElementById(event.target.id).value)<0){
           document.getElementById(event.target.id).value = 0;
      }
    break;

    case "id_editPageC1SInput":
    case "id_editPageC1VInput":
    case "id_editPageC2SInput":
    case "id_editPageC2VInput":
    case "id_bandCreatorC1SInput":
    case "id_bandCreatorC1VInput":
    case "id_bandCreatorC2SInput":
    case "id_bandCreatorC2VInput":
      doSpace=2;
       checkInputVal(document.getElementById(event.target.id),true,false);

       if(parseFloat(document.getElementById(event.target.id).value)>100){
            document.getElementById(event.target.id).value = 100;
       }

       if(parseFloat(document.getElementById(event.target.id).value)<0){
            document.getElementById(event.target.id).value = 0;
       }

      break;
    default:

  }



    if(bandCreatorOpen){
      if( doSpace==2){
        var tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC1HInput").value/360);
        var tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC1SInput").value/100);
        var tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC1VInput").value/100);
        var tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor1= tmpHSV.calcRGBColor();

       tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC2HInput").value/360);
       tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC2SInput").value/100);
       tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC2VInput").value/100);
       tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor2= tmpHSV.calcRGBColor();

       document.getElementById("id_bandCreatorC1RInput").value=editColor1.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC1GInput").value=editColor1.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC1BInput").value=editColor1.get3Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC2RInput").value=editColor2.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC2GInput").value=editColor2.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC2BInput").value=editColor2.get3Value().toFixed(numDecimalPlaces)*255;

       initColorpickerBackground("bandCreator_canvasPicker", colorpickerType);
       drawEditPageColorCircles("bandCreator_canvasPicker","bandCreator_canvasPicker2", colorpickerType);
       drawCurrentBandColor();

      }

      if( doSpace==1){
        var tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC1RInput").value/255);
        var tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC1GInput").value/255);
        var tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC1BInput").value/255);
        editColor1 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);


       tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC2RInput").value/255);
       tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC2GInput").value/255);
       tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC2BInput").value/255);
       editColor2 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);

       var tmpHSV = editColor1.calcHSVColor();
       document.getElementById("id_bandCreatorC1HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_bandCreatorC1SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_bandCreatorC1VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;
       tmpHSV = editColor2.calcHSVColor();
       document.getElementById("id_bandCreatorC2HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_bandCreatorC2SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_bandCreatorC2VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;

       initColorpickerBackground("bandCreator_canvasPicker", colorpickerType);
       drawEditPageColorCircles("bandCreator_canvasPicker","bandCreator_canvasPicker2", colorpickerType);
       drawCurrentColor();
      }
    }
    else{
      if( doSpace==2){
        var tmpVal1 = parseFloat(document.getElementById("id_editPageC1HInput").value/360);
        var tmpVal2 = parseFloat(document.getElementById("id_editPageC1SInput").value/100);
        var tmpVal3 = parseFloat(document.getElementById("id_editPageC1VInput").value/100);
        var tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor1= tmpHSV.calcRGBColor();

       tmpVal1 = parseFloat(document.getElementById("id_editPageC2HInput").value/360);
       tmpVal2 = parseFloat(document.getElementById("id_editPageC2SInput").value/100);
       tmpVal3 = parseFloat(document.getElementById("id_editPageC2VInput").value/100);
       tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor2= tmpHSV.calcRGBColor();

       document.getElementById("id_editPageC1RInput").value=editColor1.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC1GInput").value=editColor1.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC1BInput").value=editColor1.get3Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC2RInput").value=editColor2.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC2GInput").value=editColor2.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC2BInput").value=editColor2.get3Value().toFixed(numDecimalPlaces)*255;

       initColorpickerBackground("editPage_canvasPicker", colorpickerType);
       drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
       drawCurrentColor();

      }

      if( doSpace==1){
        var tmpVal1 = parseFloat(document.getElementById("id_editPageC1RInput").value/255);
        var tmpVal2 = parseFloat(document.getElementById("id_editPageC1GInput").value/255);
        var tmpVal3 = parseFloat(document.getElementById("id_editPageC1BInput").value/255);
        editColor1 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);


       tmpVal1 = parseFloat(document.getElementById("id_editPageC2RInput").value/255);
       tmpVal2 = parseFloat(document.getElementById("id_editPageC2GInput").value/255);
       tmpVal3 = parseFloat(document.getElementById("id_editPageC2BInput").value/255);
       editColor2 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);

       var tmpHSV = editColor1.calcHSVColor();
       document.getElementById("id_editPageC1HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_editPageC1SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_editPageC1VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;
       tmpHSV = editColor2.calcHSVColor();
       document.getElementById("id_editPageC2HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_editPageC2SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_editPageC2VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;

       initColorpickerBackground("editPage_canvasPicker", colorpickerType);
       drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
       drawCurrentColor();
      }
    }


}

function checkColorInputFieldsKey(event){


  var doSpace =0;
  switch (event.target.id) {
    case "id_editPageC1RInput":
    case "id_editPageC1GInput":
    case "id_editPageC1BInput":
    case "id_editPageC2RInput":
    case "id_editPageC2GInput":
    case "id_editPageC2BInput":
    case "id_bandCreatorC1RInput":
    case "id_bandCreatorC1GInput":
    case "id_bandCreatorC1BInput":
    case "id_bandCreatorC2RInput":
    case "id_bandCreatorC2GInput":
    case "id_bandCreatorC2BInput":
        doSpace=1;

        checkInputVal(document.getElementById(event.target.id),true,false);

        if(parseFloat(document.getElementById(event.target.id).value)>255){
            document.getElementById(event.target.id).value = 255;
        }

        if(parseFloat(document.getElementById(event.target.id).value)<0){
            document.getElementById(event.target.id).value = 0;
        }

    break;
    case "id_editPageC1HInput":
    case "id_editPageC2HInput":
    case "id_bandCreatorC1HInput":
    case "id_bandCreatorC2HInput":
    doSpace=2;

      checkInputVal(document.getElementById(event.target.id),true,false);

      if(parseFloat(document.getElementById(event.target.id).value)>360){
           document.getElementById(event.target.id).value = 360;
      }

      if(parseFloat(document.getElementById(event.target.id).value)<0){
           document.getElementById(event.target.id).value = 0;
      }
    break;

    case "id_editPageC1SInput":
    case "id_editPageC1VInput":
    case "id_editPageC2SInput":
    case "id_editPageC2VInput":
    case "id_bandCreatorC1SInput":
    case "id_bandCreatorC1VInput":
    case "id_bandCreatorC2SInput":
    case "id_bandCreatorC2VInput":
      doSpace=2;

       checkInputVal(document.getElementById(event.target.id),true,false);

       if(parseFloat(document.getElementById(event.target.id).value)>100){
            document.getElementById(event.target.id).value = 100;
       }

       if(parseFloat(document.getElementById(event.target.id).value)<0){
            document.getElementById(event.target.id).value = 0;
       }

      break;
    default:

  }

  if(globalCMS1.getKeyType(selectedKey)==="dual key"){
    switch (event.target.id) {
      case "id_editPageC1RInput":
      case "id_editPageC1GInput":
      case "id_editPageC1BInput":
      case "id_editPageC1HInput":
      case "id_editPageC1SInput":
      case "id_editPageC1VInput":
        document.getElementById("id_editPageC2RInput").value = document.getElementById("id_editPageC1RInput").value;
        document.getElementById("id_editPageC2GInput").value = document.getElementById("id_editPageC1GInput").value;
        document.getElementById("id_editPageC2BInput").value = document.getElementById("id_editPageC1BInput").value;
        document.getElementById("id_editPageC2HInput").value = document.getElementById("id_editPageC1HInput").value;
        document.getElementById("id_editPageC2SInput").value = document.getElementById("id_editPageC1SInput").value;
        document.getElementById("id_editPageC2VInput").value = document.getElementById("id_editPageC1VInput").value;
        break;
      case "id_editPageC2RInput":
      case "id_editPageC2GInput":
      case "id_editPageC2BInput":
      case "id_editPageC2HInput":
      case "id_editPageC2SInput":
      case "id_editPageC2VInput":
        document.getElementById("id_editPageC1RInput").value = document.getElementById("id_editPageC2RInput").value;
        document.getElementById("id_editPageC1GInput").value = document.getElementById("id_editPageC2GInput").value;
        document.getElementById("id_editPageC1BInput").value = document.getElementById("id_editPageC2BInput").value;
        document.getElementById("id_editPageC1HInput").value = document.getElementById("id_editPageC2HInput").value;
        document.getElementById("id_editPageC1SInput").value = document.getElementById("id_editPageC2SInput").value;
        document.getElementById("id_editPageC1VInput").value = document.getElementById("id_editPageC2VInput").value;
        break;
      default:
    }
  }


  if (event.keyCode == 13) {

    if(bandCreatorOpen){
      if( doSpace==2){
        var tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC1HInput").value/360);
        var tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC1SInput").value/100);
        var tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC1VInput").value/100);
        var tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor1= tmpHSV.calcRGBColor();

       tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC2HInput").value/360);
       tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC2SInput").value/100);
       tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC2VInput").value/100);
       tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor2= tmpHSV.calcRGBColor();

       document.getElementById("id_bandCreatorC1RInput").value=editColor1.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC1GInput").value=editColor1.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC1BInput").value=editColor1.get3Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC2RInput").value=editColor2.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC2GInput").value=editColor2.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC2BInput").value=editColor2.get3Value().toFixed(numDecimalPlaces)*255;

       initColorpickerBackground("bandCreator_canvasPicker", colorpickerType);
       drawEditPageColorCircles("bandCreator_canvasPicker","bandCreator_canvasPicker2", colorpickerType);
       drawCurrentBandColor();

      }

      if( doSpace==1){
        var tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC1RInput").value/255);
        var tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC1GInput").value/255);
        var tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC1BInput").value/255);
        editColor1 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);


       tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC2RInput").value/255);
       tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC2GInput").value/255);
       tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC2BInput").value/255);
       editColor2 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);

       var tmpHSV = editColor1.calcHSVColor();
       document.getElementById("id_bandCreatorC1HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_bandCreatorC1SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_bandCreatorC1VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;
       tmpHSV = editColor2.calcHSVColor();
       document.getElementById("id_bandCreatorC2HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_bandCreatorC2SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_bandCreatorC2VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;

       initColorpickerBackground("bandCreator_canvasPicker", colorpickerType);
       drawEditPageColorCircles("bandCreator_canvasPicker","bandCreator_canvasPicker2", colorpickerType);
       drawCurrentColor();
      }
    }
    else{
      if( doSpace==2){
        var tmpVal1 = parseFloat(document.getElementById("id_editPageC1HInput").value/360);
        var tmpVal2 = parseFloat(document.getElementById("id_editPageC1SInput").value/100);
        var tmpVal3 = parseFloat(document.getElementById("id_editPageC1VInput").value/100);
        var tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor1= tmpHSV.calcRGBColor();

       tmpVal1 = parseFloat(document.getElementById("id_editPageC2HInput").value/360);
       tmpVal2 = parseFloat(document.getElementById("id_editPageC2SInput").value/100);
       tmpVal3 = parseFloat(document.getElementById("id_editPageC2VInput").value/100);
       tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor2= tmpHSV.calcRGBColor();

       document.getElementById("id_editPageC1RInput").value=editColor1.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC1GInput").value=editColor1.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC1BInput").value=editColor1.get3Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC2RInput").value=editColor2.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC2GInput").value=editColor2.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC2BInput").value=editColor2.get3Value().toFixed(numDecimalPlaces)*255;

       initColorpickerBackground("editPage_canvasPicker", colorpickerType);
       drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
       drawCurrentColor();

      }

      if( doSpace==1){
        var tmpVal1 = parseFloat(document.getElementById("id_editPageC1RInput").value/255);
        var tmpVal2 = parseFloat(document.getElementById("id_editPageC1GInput").value/255);
        var tmpVal3 = parseFloat(document.getElementById("id_editPageC1BInput").value/255);
        editColor1 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);


       tmpVal1 = parseFloat(document.getElementById("id_editPageC2RInput").value/255);
       tmpVal2 = parseFloat(document.getElementById("id_editPageC2GInput").value/255);
       tmpVal3 = parseFloat(document.getElementById("id_editPageC2BInput").value/255);
       editColor2 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);

       var tmpHSV = editColor1.calcHSVColor();
       document.getElementById("id_editPageC1HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_editPageC1SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_editPageC1VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;
       tmpHSV = editColor2.calcHSVColor();
       document.getElementById("id_editPageC2HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_editPageC2SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_editPageC2VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;

       initColorpickerBackground("editPage_canvasPicker", colorpickerType);
       drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
       drawCurrentColor();
      }
    }


  }




}*/
