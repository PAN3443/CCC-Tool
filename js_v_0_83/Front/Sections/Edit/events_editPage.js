
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

function searchForContinuousSections(startKey, endKey){

  var continuousSections=[];
  var beforeConstant = false;
  var startKey = 0;
  for (var i = startKey; i <= endKey; i++) {

    switch (globalCMS1.getKeyType(i)) {
      case "nil key":
        beforeConstant=true;
      break;
      case "left key":
        if(!beforeConstant){
          var tmpStart = startKey;
          var tmpEnd = i;
          continuousSections.push([tmpStart,tmpEnd])
        }
        startKey=i;
        beforeConstant=true;
      break;
      case "twin key":
        if(!beforeConstant){
          var tmpStart = startKey;
          var tmpEnd = i;
          continuousSections.push([tmpStart,tmpEnd])
        }
        startKey=i;
        beforeConstant=false;
      break;
      default:
        if(beforeConstant){
          startKey=i;
          beforeConstant=false;
        }
        else {
          if(i==endKey){
            var tmpStart = startKey;
            var tmpEnd = i;
            continuousSections.push([tmpStart,tmpEnd])
          }
        }

    }

  }

  return continuousSections;
}

function updateEditPage(){

  globalCMS1JSON=inform_Worker_GlobalCMS();

  drawEditCMSVIS(globalCMS1,[]);

  fillTable();

  if(document.getElementById("id_EditPage_Edit_Keys").style.display!="none"){
     openEditKeyDiv(document.getElementById("id_EditPage_EditKey_List").selectedIndex);
  }

  if(document.getElementById("id_editPage_EditKeyPathPlotDiv").style.display!="none" && document.getElementById("id_EditPage_Edit_Path").style.display!="none"){
    if(pathColorspace=="rgb")
      drawcolormap_RGBSpace(false,true);
    else
      drawcolormap_hueSpace(false, true, false);
  }

  if(document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display!="none"){

      if(document.getElementById("id_EditPage_DivAnalyze").style.display!="none"){// && autoAnalyze){
        updateAnalyze();
      }
      else{
        // updateMapping

        if(doAutoUpdate && mapping_doAnimation){
          updateFieldValueColors(true);
        }

      }
    }

}

function reverseCMS(){
  globalCMS1.calcReverse();
  updateEditPage();
  saveCreateProcess();

  if(editPage_optimizationMode){
    editCMSduringOptimizationMode();
  }
}


function switchModifyModus(type){

  document.getElementById("id_editPage_SelectEditKeys").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_editPage_SelectEditPath").classList.remove("class_TabRowButtonActive");

  document.getElementById("id_editPage_SelectEditKeys").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_editPage_SelectEditPath").classList.add("class_TabRowButtonNotActive");


  document.getElementById("id_EditPage_Edit_Keys").style.display="none";
  document.getElementById("id_EditPage_Edit_Path").style.display="none";

  stopPathPlotAnimation();
  switch (type) {
    case 0:
      document.getElementById("id_editPage_SelectEditKeys").classList.remove("class_TabRowButtonNotActive");
      document.getElementById("id_editPage_SelectEditKeys").classList.add("class_TabRowButtonActive");
      document.getElementById("id_EditPage_Edit_Keys").style.display="block";
      openEditKeyDiv(0);

    break;

    case 1:
      document.getElementById("id_editPage_SelectEditPath").classList.remove("class_TabRowButtonNotActive");
      document.getElementById("id_editPage_SelectEditPath").classList.add("class_TabRowButtonActive");
        document.getElementById("id_EditPage_Edit_Path").style.display="block";
        choosePathPlotSpace(2);
        startPathPlotAnimation();
    break;
    default:
    switchModifyModus(0);
  }
}


function switchAnalyzeMappingProbeSet(type){

  if(document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display=="none")
  return;

  document.getElementById("id_editPage_SelectAnalyze").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_editPage_SelectMapping").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_editPage_SelectProbeSet").classList.remove("class_TabRowButtonActive");

  document.getElementById("id_editPage_SelectAnalyze").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_editPage_SelectMapping").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_editPage_SelectProbeSet").classList.add("class_TabRowButtonNotActive");

  document.getElementById("id_EditPage_DivAnalyze").style.display="none";
  document.getElementById("id_EditPage_DivMapping").style.display="none";
  document.getElementById("id_EditPage_DivProbeSets").style.display="none";


  stopAnimationMapping();

  switch (type) {
    case 0:
      document.getElementById("id_editPage_SelectAnalyze").classList.remove("class_TabRowButtonNotActive");
      document.getElementById("id_editPage_SelectAnalyze").classList.add("class_TabRowButtonActive");
      document.getElementById("id_EditPage_DivAnalyze").style.display="flex";
      updateAnalyze();
    break;

    case 1:
      document.getElementById("id_editPage_SelectMapping").classList.remove("class_TabRowButtonNotActive");
      document.getElementById("id_editPage_SelectMapping").classList.add("class_TabRowButtonActive");
      document.getElementById("id_EditPage_DivMapping").style.display="block";

        var rect = document.getElementById("id_EditPage_DivMapping").getBoundingClientRect();
        document.getElementById("id_EditPage_DrawMappingDiv").style.height=rect.height+"px";

        var box = document.getElementById("id_EditPage_DrawMappingDiv").getBoundingClientRect();
        var drawWidth = box.width; //window.innerWidth;
        var drawHeight =box.height; // window.innerHeight;

      	mapping_camera.aspect = drawWidth/drawHeight;
      	mapping_camera.updateProjectionMatrix();

      	mapping_renderer.setSize(drawWidth, drawHeight);

        startAnimationMapping();

        if(doAutoUpdate && mapping_doAnimation){
          updateFieldValueColors(true);
        }
    break;

    case 2:
      document.getElementById("id_editPage_SelectProbeSet").classList.remove("class_TabRowButtonNotActive");
      document.getElementById("id_editPage_SelectProbeSet").classList.add("class_TabRowButtonActive");
      document.getElementById("id_EditPage_DivProbeSets").style.display="block";
      init_editProbe();
    break;
    default:
    switchAnalyzeMappingProbeSet(0);
  }

}


function switchPredefinedCMS(type){

  document.getElementById("id_EditPage_Select_Predefined").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_EditPage_Select_MyDesigns").classList.remove("class_TabRowButtonActive");

  document.getElementById("id_EditPage_Select_Predefined").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_EditPage_Select_MyDesigns").classList.add("class_TabRowButtonNotActive");

  document.getElementById("id_EditPage_Predefined_Div").style.display="none";
  document.getElementById("id_EditPage_MyDesigns_CMS_Div").style.display="none";


  switch (type) {
    case 0:
      document.getElementById("id_EditPage_Select_Predefined").classList.remove("class_TabRowButtonNotActive");
      document.getElementById("id_EditPage_Select_Predefined").classList.add("class_TabRowButtonActive");
      document.getElementById("id_EditPage_Predefined_Div").style.display="block";
      changePredefined();
      break;
    case 1:
      document.getElementById("id_EditPage_Select_MyDesigns").classList.remove("class_TabRowButtonNotActive");
      document.getElementById("id_EditPage_Select_MyDesigns").classList.add("class_TabRowButtonActive");
      document.getElementById("id_EditPage_MyDesigns_CMS_Div").style.display="block";

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
