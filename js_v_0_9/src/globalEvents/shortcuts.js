//////////////////////////////////////
/// Shortcuts  Window /////
///////////////////////////////////

/////////////////////////////////////
/// global variables
var short_undoKey = "z";
var short_undoKeyNum = 90;

var short_redoKey = "y";
var short_redoKeyNum = 89;

var short_saveKey = "s";
var short_saveKeyNum = 83;

var short_scaleKey = "x";
var short_scaleKeyNum = 88;

var short_clearKey = "c";
var short_clearKeyNum = 67;

var short_dublicateKey = "d";
var short_dublicateKeyNum = 68;

var short_exportKey = "e";
var short_exportKeyNum = 69;

var short_interpolationChangeKey = "i";
var short_interpolationChangeKeyNum = 73;

var short_editWinKey = "1";
var short_editWinKeyNum = 97;

var short_analyzeWinKey = "2";
var short_analyzeWinKeyNum = 98;

var short_mappingWinKey = "3";
var short_mappingWinKeyNum = 99;

var short_navigatorKey = "3";
var short_navigatorNum = 78;


/////////////////////////////////////
// functions

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


  if(event.ctrlKey && event.shiftKey){

    event.preventDefault();

    var keynum;
    if(window.event) { // IE
      keynum = event.keyCode;
    } else if(event.which){ // Netscape/Firefox/Opera
      keynum = event.which;
    }

    console.log(keynum);

    //////////////////////////////////
    /// General
    switch (keynum) {
      case short_navigatorNum:
        if(document.getElementById('id_PopUp_navigationWindow').style.display!="none")
          closeNaviWindow();
        else
          openNaviWindow();
      return;
    }

    //////////////////////////////////
    /// Edit Page
    if(document.getElementById("id_EditPage").style.display!="none"){
      switch (keynum) {

        case short_redoKeyNum:
          redo();
          return;
        case short_undoKeyNum:
          undo();
          return;

          case short_saveKeyNum:
            saveCMS();
            return;


          case short_scaleKeyNum:
            openScale();
            return;

            case short_clearKeyNum:
              clearColormap();
              return;

              case short_dublicateKeyNum: // save as new
                saveCMSasNew();
                return;

                case short_exportKeyNum:
                  // strg + e => export
                  openExportWindow();
                  return;


                  case short_editWinKeyNum:
                    showEditMode();
                    return;

                    case short_analyzeWinKeyNum:
                      showAnalyzeMode();
                      return;

                      case short_mappingWinKeyNum:
                        showMappingMode();
                        return;


                case short_interpolationChangeKeyNum:
                  // strg + i => change interpolation space
                  switch (globalCMS1.getInterpolationSpace()) {
                    case "rgb":
                        document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 6;
                      return;
                      case "hsv":
                        document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 0;
                        return;
                        case "lab":
                          document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 1;
                          return;
                          case "din99":
                            document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 5;
                            return;
                    default:

                  }
                  changeColorspace();
                  return;
      }


    }



  }

  //////////////////////////////////
  /// Testing Page
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
      return;
      case 38:
          // up arrow
          if(testingModus==2 && reportModus>0)
            switchToPreviousReport();
      return;
      case 39:
        // right arrow
        if(testingModus==1 && reportListTestField.length>0)
          switchToNextTest();
        else if(testingModus==0)
          switchToNextTest();
      return;
      case 40:
        // down arrow
        if(testingModus==2 && reportModus<3)
          switchToNextReport();
      return;
    }

    //console.log(keynum);
  }

}
