//////////////////////////////////////
/// Ask Window /////
///////////////////////////////////

function openAskWindow(){
    document.getElementById("popupAskWindow").style.display="flex";
    switch (askType) {
      case 0:
      //delete CMS

        break;
      case 1:
        //delete Band
        document.getElementById("id_askText").innerHTML="Do you really want to delete the Band?";
        break;
        case 2:
          //load Session

          break;
          case 3:
            //load Session
            
            break;

            case 4:
              // leave edit page
              document.getElementById("id_askText").innerHTML="Do you really want to leave the edit page and reject unsaved content?";
              break;

              /*case 5:
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
              break;*/
              case 7:
              // equal key intervals

              break;
              case 8:
              // delete Empty CMS
                document.getElementById("id_askText").innerHTML="Your CMS is empty and will be deleted from the MyDesigns section. Do you want to continue?";
              break;
      default:

    }
}

function closeAsk(){
  document.getElementById("popupAskWindow").style.display="none";
}
