function activateDropdown(event) {

    var dropdownID, labelID;

    var additionalScrollID="";
    labelID = event.target.id;

    var onTop = false;
    var toRight=false;
    switch (labelID) {
                  case "id_EditPage_selectProbeSetRangeType":
                    dropdownID = "id_EditPage_selectProbeSetRangeTypeDropDown";
                    break;
                        case "id_EditPage_editProbeFunctionLabel":
                          onTop=true;
                          dropdownID = "id_EditPage_editProbeFunctionDropDown";
                          break;
                          case "id_EditPage_DataInfoButton":
                            onTop=true;
                            toRight=true;
                            dropdownID = "id_EditPage_DataInfoDiv";
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

        top = box.top + scrollTop - clientTop;
        left = box.left+ scrollLeft - clientLeft;


      if(onTop){
        document.getElementById(dropdownID).style.top=(top-dropdownBox.height)+"px";
      }
      else {
        document.getElementById(dropdownID).style.top=(top+box.height)+"px";
      }
      if(toRight){
          document.getElementById(dropdownID).style.left=(left+box.width)+"px";
      }
      else {
          document.getElementById(dropdownID).style.left=(left+box.width-dropdownBox.width)+"px";
      }


    }
    else{
      document.getElementById(dropdownID).style.display="none";
    }

}
