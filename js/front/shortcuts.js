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

//console.log(keynum);

    switch (keynum) {
      case 83:
        // strg + s => save
        event.preventDefault();
        saveCMS();

        break;

        case 88:
          // strg + x => set x range (scale)
          event.preventDefault();
          openScale();
          break;

          case 67:
            // strg + c => clear
            event.preventDefault();
            clearColormap();
            break;

            case 68:
              // strg + d => dublicate (save as new)
              event.preventDefault();
              saveCMSasNew();

              break;

              case 73:
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
