function activateDropdown(event) {

    var dropdownID, labelID;
    labelID = event.target.id;

    switch (labelID) {
      case "id_editPage_OrderPredefinedLabel":
        dropdownID = "id_editPage_OrderPredefinedDropdown";
        break;
        case "id_EditPage_PathPlotSpaces_Label":
          dropdownID = "id_EditPage_PathPlotSpaces_Dropdown";
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

      var top = box.top + scrollTop - clientTop;
      var left = box.left+ scrollLeft - clientLeft;

      document.getElementById(dropdownID).style.top=(top+box.height)+"px";
      document.getElementById(dropdownID).style.left=left+"px";
    }
    else{
      document.getElementById(dropdownID).style.display="none";
    }


}
