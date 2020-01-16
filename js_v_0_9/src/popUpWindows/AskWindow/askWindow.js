//////////////////////////////////////
/// Ask Window /////
///////////////////////////////////

function openAskWindow(){
    document.getElementById("popupAskWindow").style.display="flex";
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
              case 7:
              // equal key intervals
                document.getElementById("id_askText").innerHTML="Do you really want to change the reference values of all keys to equal intervals?";
              break;
      default:

    }
}

function checkAsk(){
  document.getElementById("popupAskWindow").style.display="none";

  switch (askType) {
    case 0:
      //delete CMS
      editSection.editCMS.clear();
      editSection.updateSection();
      editSection.saveCreateProcess();
    break;
    case 1:
      //delete Band
      globalCMS1.deleteBand(askIndex);
      updateEditPage();
      saveCreateProcess();

      if(editPage_optimizationMode){
        updateOptimizationPage();
      }
      break;

      case 2:
        //load Session
        document.getElementById("id_inputSessionData").click();
        document.getElementById("id_MyDesigns_Import_dropdown").style.display="none";
        break;

        case 3:
          myDesignsSection.deleteCMS(askIndex);
        break;

        case 4:
          //leave edit page

          if(editPage_optimizationMode){
            changeOpimizationMode();
          }

          showMyDesignsPage();
          break;

          case 5:
            //delete probe set
            globalCMS1.deleteProbeSet(document.getElementById("id_selectProbeSetList").selectedIndex);
            init_editProbe();
            break;

            case 6:
              // delete probe
              var tmpProbeSet = globalCMS1.getProbeSetClone(document.getElementById("id_selectProbeSetList").selectedIndex);
              if(tmpProbeSet.getProbeLength()==1){
                globalCMS1.deleteProbeSet(document.getElementById("id_selectProbeSetList").selectedIndex);
                init_editProbe();
              }
              else {
                globalCMS1.deleteProbe(document.getElementById("id_selectProbeSetList").selectedIndex,document.getElementById("id_selectProbeList").selectedIndex-1);
                drawProbePreview(tmpProbeSet);
                updateProbeSelectBox();
              }
              tmpProbeSet.deleteReferences();
              tmpProbeSet=undefined;

              break;

              case 7:
                // equal key intervals
                editSection.editCMS.equalKeyIntervals();
                editSection.saveCreateProcess();
                editSection.updateSection();
              break;

    default:

  }
}


function closeAsk(){
  document.getElementById("popupAskWindow").style.display="none";
}
