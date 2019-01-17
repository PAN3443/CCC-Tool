
function changeParallelProcessing(){

  if(doParallelProcessing){
    doParallelProcessing=false;
    document.getElementById('id_EditPage_Mapping_DoParallel').style.background=styleNotActiveColor;
    //document.getElementById("id_EditPage_Mapping_DoParallel").style.color=styleNotActiveColorFont;
  }
  else{
    doParallelProcessing=true;
    document.getElementById('id_EditPage_Mapping_DoParallel').style.background="none";
    //document.getElementById("id_EditPage_Mapping_DoParallel").style.color="none";
  }

}

function updateDomainCMSRange(){

  globalCMS1.setAutoRange(globalDomain.getMinField(currentFieldIndex),globalDomain.getMaxField(currentFieldIndex));
  saveCreateProcess();
  updateEditPage();

}


function changeAutoMapping(){

  if(doAutoUpdate){
      doAutoUpdate=false;
      document.getElementById('id_settingMenu_Label_MappingUpdate_Button').innerHTML="Activate Automatical Mapping Update";
      document.getElementById('id_EditPage_MappingManual_Button').style.display="block";
  }
  else{
      doAutoUpdate=true;
      document.getElementById('id_settingMenu_Label_MappingUpdate_Button').innerHTML="Deactivate Automatical Mapping Update";
      document.getElementById('id_EditPage_MappingManual_Button').style.display="none";

      if(mapping_doingAnimation)
        updateMesh();

  }

}



function changeBackground(){

  document.getElementById("id_EditPage_MappingBackground_Custom").style.background = mappingBackgroundColor.getRGBString();
  document.getElementById("id_EditPage_MappingBackground_Custom").style.visibility = "hidden";


  switch (document.getElementById("id_EditPage_MappingBackground_Select").selectedIndex) {
    case 0:
          document.getElementById("id_EditPage_DrawMappingDiv").style.backgroundImage = "url(img/EditPage/plotBackground.png)";
          document.getElementById("id_PopUp_FullMappingDiv").style.backgroundImage = "url(img/EditPage/plotBackground.png)";
      break;
      case 1:
          document.getElementById("id_EditPage_DrawMappingDiv").style.background = "white";
          document.getElementById("id_PopUp_FullMappingDiv").style.background = "white";
        break;
        case 2:
          document.getElementById("id_EditPage_DrawMappingDiv").style.background = "black";
          document.getElementById("id_PopUp_FullMappingDiv").style.background = "black";
          break;
    default:
    document.getElementById("id_EditPage_MappingBackground_Custom").style.visibility = "visible";
    document.getElementById("id_EditPage_DrawMappingDiv").style.background = mappingBackgroundColor.getRGBString();
    document.getElementById("id_PopUp_FullMappingDiv").style.background = mappingBackgroundColor.getRGBString();
  }
}


/*function updateProgressBar(status){

  //document.getElementById("id_processBar").style.width = status+"%";
  document.getElementById("mappingProcessBar").value = status;

  //console.log(status, document.getElementById("id_processBar").style.width );
}*/


function changeField(){

  currentFieldIndex=document.getElementById("id_EditPage_SelectMappingField").selectedIndex;
  currentTimeIndex=0;

  var selectobject=document.getElementById("id_EditPage_SelectMappingTimeStep")
  for (var i=selectobject.length-1; i>=0; i--){
     selectobject.remove(i);
  }

  for (var i = 1; i <= globalDomain.getNumberOfTimeSteps(currentFieldIndex); i++) {
    var option = document.createElement("option");
    option.text = i+"";
    selectobject.add(option);
  }

  document.getElementById("id_EditPage_FieldMinValue").innerHTML = globalDomain.getMinField(currentFieldIndex);
  document.getElementById("id_EditPage_FieldMaxValue").innerHTML = globalDomain.getMaxField(currentFieldIndex);

  globalDomain.generateCells(currentFieldIndex,currentTimeIndex);

  doneWorkerPreparation=false;
  drawMapping();

  if(document.getElementById("id_EditPage_Histogram_Div").style.display!="none")
  drawHistogram(false);
}

function changeTimeStep(){
  currentTimeIndex=document.getElementById("id_EditPage_SelectMappingTimeStep").selectedIndex;
  globalDomain.generateCells(currentFieldIndex,currentTimeIndex);
  doneWorkerPreparation=false;
  drawMapping();

  if(document.getElementById("id_EditPage_Histogram_Div").style.display!="none")
  drawHistogram(false);
}
