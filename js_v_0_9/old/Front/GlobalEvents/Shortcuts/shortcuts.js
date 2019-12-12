//////////////////////////////////////
/// Shortcuts  Window /////
///////////////////////////////////





function updateShortCuts(){
  document.getElementById("id_PopUp_Shortcuts_Undo_Label").innerHTML= short_undoKey;
  document.getElementById("id_PopUp_Shortcuts_Redo_Label").innerHTML= short_redoKey;
  document.getElementById("id_PopUp_Shortcuts_Save_Label").innerHTML= short_saveKey;
  document.getElementById("id_PopUp_Shortcuts_Scale_Label").innerHTML= short_scaleKey;
  document.getElementById("id_PopUp_Shortcuts_Clear_Label").innerHTML= short_clearKey;
  document.getElementById("id_PopUp_Shortcuts_SaveAsNew_Label").innerHTML= short_dublicateKey;
  document.getElementById("id_PopUp_Shortcuts_Export_Label").innerHTML= short_exportKey;
  document.getElementById("id_PopUp_Shortcuts_Interpolation_Label").innerHTML= short_interpolationChangeKey;
  document.getElementById("id_PopUp_Shortcuts_EditMode_Label").innerHTML= short_editWinKey;
  document.getElementById("id_PopUp_Shortcuts_AnalyzeMode_Label").innerHTML= short_analyzeWinKey;
  document.getElementById("id_PopUp_Shortcuts_MappingMode_Label").innerHTML= short_mappingWinKey;
}




document.onkeydown = keyDownDocumentHandler;

function keyDownDocumentHandler(event){


  if(document.getElementById("id_EditPage").style.display!="none" && event.ctrlKey){

    var keynum;
    if(window.event) { // IE
      keynum = event.keyCode;
    } else if(event.which){ // Netscape/Firefox/Opera
      keynum = event.which;
    }

    switch (keynum) {

      case short_redoKeyNum:
        event.preventDefault();
        redo();

        break;
      case short_undoKeyNum:
        event.preventDefault();
        undo();

        break;

        case short_saveKeyNum:
          event.preventDefault();
          saveCMS();

          break;


        case short_scaleKeyNum:
          event.preventDefault();
          openScale();
          break;

          case short_clearKeyNum:
            event.preventDefault();
            clearColormap();
            break;

            case short_dublicateKeyNum: // save as new
              event.preventDefault();
              saveCMSasNew();
              break;

              case short_exportKeyNum:
                // strg + e => export
                event.preventDefault();
                openExportWindow();
                break;


                case short_editWinKeyNum:
                  event.preventDefault();
                  showEditMode();
                  break;

                  case short_analyzeWinKeyNum:
                    event.preventDefault();
                    showAnalyzeMode();
                    break;

                    case short_mappingWinKeyNum:
                      event.preventDefault();
                      showMappingMode();
                      break;


              case short_interpolationChangeKeyNum:
                // strg + i => change interpolation space
                event.preventDefault();


                switch (globalCMS1.getInterpolationSpace()) {
                  case "rgb":
                      document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 6;
                    break;
                    case "hsv":
                      document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 0;
                      break;
                      case "lab":
                        document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 1;
                        break;
                        case "din99":
                          document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 5;
                          break;
                  default:

                }

                changeColorspace();

                break;
      default:

    }

  }



  if(document.getElementById("id_TestingPage").style.display!="none"){
    var keynum;
    if(window.event) { // IE
      keynum = event.keyCode;
    } else if(event.which){ // Netscape/Firefox/Opera
      keynum = event.which;
    }

    switch (keynum) {

      case 37:
        // left arrow
        if(testingModus>0)
         switchToPreviousTest();
      break;
      case 38:
          // up arrow
          if(testingModus==2 && reportModus>0)
            switchToPreviousReport();
      break;
      case 39:
        // right arrow
        if(testingModus==1 && reportListTestField.length>0)
          switchToNextTest();
        else if(testingModus==0)
          switchToNextTest();
      break;
      case 40:
        // down arrow
        if(testingModus==2 && reportModus<3)
          switchToNextReport();
      break;
    }

    //console.log(keynum);
  }

}
