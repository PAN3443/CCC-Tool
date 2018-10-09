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

function openAskWindow(){
    document.getElementById("popupAskWindow").style.display="inline";
    switch (askType) {
      case 0:
      //delete CMS
        document.getElementById("id_askText").innerHTML="Do you really want to delete the CMS?";
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
      default:

    }
}

function checkAsk(){
  document.getElementById("popupAskWindow").style.display="none";

  switch (askType) {
    /*case 0:
      //delete CMS
      clearCreateSide();
      globalCMS1.clear();
      orderColorSketch();
      break;
    case 1:
      //delete Band
      globalCMS1.deleteBand(askIndex);
      orderColorSketch();
      somethingChanged = true;
      saveCreateProcess();
      break;

      case 2:
        //load Session
        document.getElementById("id_inputSessionData").click();
        break;

        case 3:

          myList.splice(askIndex, 1);

          if (askIndex == colormap1SelectIndex) {
            colormap1SelectIndex = 0;
          }

          if (askIndex < colormap1SelectIndex) {
            colormap1SelectIndex--;
          }

          if (myList.length == 0) {
            colormap1SelectIndex = -1;
            globalCMS1.clear();
          } else {
            globalCMS1 = cloneCMS(myList[colormap1SelectIndex]);
          }

          orderColorSketch();
          drawMyList();
        break;*/

        case 4:
          //leave edit page
          showMyDesignsPage();
          break;

    default:

  }
}


function closeAsk(){
  document.getElementById("popupAskWindow").style.display="none";
}
