





function openFullAnalyzeScreen(){
  document.getElementById("id_PopUp_fullAnalzeWindow").style.display="block";
  updateAnalyze();
}

function closeFullAnalyzeScreen(){
  document.getElementById("id_PopUp_fullAnalzeWindow").style.display="none";
  updateAnalyze();
}

//////////////////////////////////////
/// Shortcuts  Window /////
///////////////////////////////////


function closeShortcutsWindow(){
  document.getElementById("id_PopUp_ShortcutsWindow").style.display="none";
}


function updateShortCuts(){
  document.getElementById("id_PopUp_Shortcuts_Undo_Label").style.innerHTML= short_undoKey;
  document.getElementById("id_PopUp_Shortcuts_Redo_Label").style.innerHTML= short_redoKey;
  document.getElementById("id_PopUp_Shortcuts_Save_Label").style.innerHTML= short_saveKey;
  document.getElementById("id_PopUp_Shortcuts_Scale_Label").style.innerHTML= short_scaleKey;
  document.getElementById("id_PopUp_Shortcuts_Clear_Label").style.innerHTML= short_clearKey;
  document.getElementById("id_PopUp_Shortcuts_SaveAsNew_Label").style.innerHTML= short_dublicateKey;
  document.getElementById("id_PopUp_Shortcuts_Export_Label").style.innerHTML= short_exportKey;
  document.getElementById("id_PopUp_Shortcuts_Interpolation_Label").style.innerHTML= short_interpolationChangeKey;
  document.getElementById("id_PopUp_Shortcuts_EditMode_Label").style.innerHTML= short_editWinKey;
  document.getElementById("id_PopUp_Shortcuts_AnalyzeMode_Label").style.innerHTML= short_analyzeWinKey;
  document.getElementById("id_PopUp_Shortcuts_MappingMode_Label").style.innerHTML= short_mappingWinKey;
}

function openShortcutsWindow(){
  document.getElementById("id_PopUp_ShortcutsWindow").style.display="block";
  document.getElementById("id_dropDownContainer").style.display="none";
  updateShortCuts();
}

//////////////////////////////////////
/// Filter Window /////
///////////////////////////////////

function closeFilterWindow(){
  document.getElementById("id_PopUp_FilterWindow").style.display="none";
}

function openFilterWindow(){
  document.getElementById("id_PopUp_FilterWindow").style.display="block";
}


//////////////////////////////////////
/// Impressum Window /////
///////////////////////////////////


function closeImpressum(){
  document.getElementById("id_PopUp_ImpessumWindow").style.display="none";
}

function openImpressum(){
  document.getElementById("id_PopUp_ImpessumWindow").style.display="block";
  document.getElementById("id_dropDownContainer").style.display="none";
}

//////////////////////////////////////
/// Alert Window /////
///////////////////////////////////


function closeAlert(){
  document.getElementById("id_PopUp_AlertWindow").style.display="none";
}

function openAlert(txt){
  document.getElementById("id_PopUp_AlertWindow").style.display="block";
  document.getElementById("id_alertText").innerHTML=txt;
}


//////////////////////////////////////
/// Ask Window /////
///////////////////////////////////

function openScale(){

  if(globalCMS1.getKeyLength()>0){
    document.getElementById("id_PopUp_ScaleWindow").style.display="block";
    document.getElementById("id_popupWindow_ScaleInfoText").style.display="none";
    updateAutoRangeInput();
  }
  document.getElementById("id_dropDownContainer").style.display="none";
}

function checkScale(){

  var start = parseFloat(document.getElementById("id_inputAutoRangeStart").value);
  var end = parseFloat(document.getElementById("id_inputAutoRangeEnd").value);

  if(start>=end){
    //document.getElementById("id_PopUp_ScaleWindow").style.display="none";
    document.getElementById("id_popupWindow_ScaleInfoText").style.display="block";
  }
  else{
    globalCMS1.setAutoRange(start,end);
    updateEditPage();
    document.getElementById("id_PopUp_ScaleWindow").style.display="none";
    document.getElementById("id_popupWindow_ScaleInfoText").style.display="none";
  }

}


function closeScale(){
  document.getElementById("id_PopUp_ScaleWindow").style.display="none";
}




//////////////////////////////////////
/// Ask Window /////
///////////////////////////////////

function openAskWindow(){
    document.getElementById("popupAskWindow").style.display="inline";
    switch (askType) {
      case 0:
      //delete CMS
        document.getElementById("id_askText").innerHTML="Do you really want to clear the CMS?";
        break;
      case 1:
        //delete Band
        document.getElementById("id_askText").innerHTML="Do you really want to delete the Band?";
        break;
        case 2:
          //load Session
          document.getElementById("id_askText").innerHTML="Do you really want to load a session and reject the current session?";
          break;
          case 3:
            //load Session
            document.getElementById("id_askText").innerHTML="Do you really want to delete the colormap?";
            break;

            case 4:
              // leave edit page
              document.getElementById("id_askText").innerHTML="Do you really want to leave the edit page and reject unsaved content?";
              break;

              case 5:
              // delete Probe-Set
                document.getElementById("id_askText").innerHTML="Do you really want to delete the selected probe-set?";
              break;
              case 6:
              // delete Probe-Set

                var tmpProbeSet = globalCMS1.getProbeSet(document.getElementById("id_selectProbeSetList").selectedIndex);
                if(tmpProbeSet.getProbeLength()==1){
                    document.getElementById("id_askText").innerHTML="Do you really want to delete the last probe? (The full probe set will be deleted!)";
                }
                else {
                    document.getElementById("id_askText").innerHTML="Do you really want to delete the selected probe?";
                }




              break;
      default:

    }
}

function checkAsk(){
  document.getElementById("popupAskWindow").style.display="none";

  switch (askType) {
    case 0:
      //delete CMS
      globalCMS1.clear();
      switchModifyModus(0);
      updateEditPage();
      break;
    case 1:
      //delete Band
      globalCMS1.deleteBand(askIndex);
      updateEditPage();
      saveCreateProcess();
      break;

      case 2:
        //load Session
        document.getElementById("id_inputSessionData").click();
        document.getElementById("id_dropDownContainer").style.display="none";
        break;

        case 3:

          myDesignsList.splice(askIndex, 1);

          drawMyDesigns();
        break;

        case 4:
          //leave edit page
          showMyDesignsPage();
          break;

          case 5:
            //delete probe set
            globalCMS1.deleteProbeSet(document.getElementById("id_selectProbeSetList").selectedIndex);
            initProbePage();
            break;

            case 6:
              // delete probe
              var tmpProbeSet = globalCMS1.getProbeSet(document.getElementById("id_selectProbeSetList").selectedIndex);
              if(tmpProbeSet.getProbeLength()==1){
                globalCMS1.deleteProbeSet(document.getElementById("id_selectProbeSetList").selectedIndex);
                initProbePage();
              }
              else {
                globalCMS1.deleteProbe(document.getElementById("id_selectProbeSetList").selectedIndex,document.getElementById("id_selectProbeList").selectedIndex-1);
                drawProbePreview(tmpProbeSet);
              }

              break;

    default:

  }
}


function closeAsk(){
  document.getElementById("popupAskWindow").style.display="none";
}
