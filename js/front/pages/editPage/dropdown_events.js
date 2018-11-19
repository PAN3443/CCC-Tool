function activateDropdown(event) {

    var dropdownID, labelID;

    var additionalScrollID="";
    labelID = event.target.id;

    var doAbsolute = false;
    var onTop = false;
    switch (labelID) {
      case "id_editPage_OrderPredefinedLabel":
        dropdownID = "id_editPage_OrderPredefinedDropdown";
        break;
        case "id_EditPage_PathPlotSpaces_Label":
          dropdownID = "id_EditPage_PathPlotSpaces_Dropdown";
          break;
          case "id_EditPage_AnalyzePlot_Label":
            dropdownID = "id_EditPage_AnalyzePlots_Dropdown";
            break;
            case "id_EditPage_AnalyzeOptions_Label":
              dropdownID = "id_EditPage_AnalyzeOptions_Dropdown";
              break;
              case "id_EditPage_selectProbeTypeLabel":
                doAbsolute = true;
                additionalScrollID="id_EditPage_generateProbeSet";
                dropdownID = "id_EditPage_selectProbeTypeDropDown";

                document.getElementById("id_EditPage_selectProbeSetRangeTypeDropDown").style.display="none";
                break;

                  case "id_EditPage_selectProbeSetRangeType":
                    doAbsolute = true;
                    additionalScrollID="id_EditPage_generateProbeSet";
                    dropdownID = "id_EditPage_selectProbeSetRangeTypeDropDown";
                    document.getElementById("id_EditPage_selectProbeTypeDropDown").style.display="none";
                    break;

                    case "id_EditPage_editProbeTypeLabel":
                      doAbsolute = true;
                      additionalScrollID="id_EditPage_editProbe";
                      dropdownID = "id_EditPage_editProbeTypeDropDown";
                      document.getElementById("id_EditPage_editProbeFunctionDropDown").style.display="none";
                      break;
                        case "id_EditPage_editProbeFunctionLabel":
                          doAbsolute = true;
                          additionalScrollID="id_EditPage_editProbe";
                          onTop=true;
                          dropdownID = "id_EditPage_editProbeFunctionDropDown";
                          document.getElementById("id_EditPage_editProbeTypeDropDown").style.display="none";
                          break;
      default:
        return;
    }

    if(document.getElementById(dropdownID).style.display=="none"){

      document.getElementById(dropdownID).style.display="block";

      var refObj = document.getElementById(labelID);

      var box = refObj.getBoundingClientRect();

      var dropdownBox = document.getElementById(dropdownID).getBoundingClientRect();

      var body = document.body;
      var docEl = document.documentElement;

      var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
      var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

      var clientTop = docEl.clientTop || body.clientTop || 0;
      var clientLeft = docEl.clientLeft || body.clientLeft || 0;

      var top,left;
      if(doAbsolute){
        scrollTop=0;
        scrollLeft=0;

        if(additionalScrollID!=""){
          scrollTop=document.getElementById(additionalScrollID).scrollTop;
          scrollLeft=document.getElementById(additionalScrollID).scrollLeft;
        }

        top =  refObj.offsetTop-scrollTop;
        left = refObj.offsetLeft-scrollLeft;
      }
      else{
        top = box.top + scrollTop - clientTop;
        left = box.left+ scrollLeft - clientLeft;
      }


      if(onTop){
        document.getElementById(dropdownID).style.top=(top-dropdownBox.height)+"px";
      }
      else {
        document.getElementById(dropdownID).style.top=(top+box.height)+"px";
      }
      document.getElementById(dropdownID).style.left=(left+box.width-dropdownBox.width)+"px";
    }
    else{
      document.getElementById(dropdownID).style.display="none";
    }

}
