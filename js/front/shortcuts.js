//////////////////////////////
//// short cuts


document.onkeydown = keyDownDocumentHandler;

function keyDownDocumentHandler(event){


  if(document.getElementById("id_EditPage").style.display!="none" && event.ctrlKey){


    var keynum;
    if(window.event) { // IE
      keynum = event.keyCode;
    } else if(event.which){ // Netscape/Firefox/Opera
      keynum = event.which;
    }

console.log(keynum);

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
                    changeColorspace(1);
                    break;
                    case "hsv":
                      changeColorspace(2);
                      break;
                      case "lab":
                        changeColorspace(3);
                        break;
                        case "din99":
                          changeColorspace(0);
                          break;
                  default:

                }

                break;
      default:

    }

  }



}
