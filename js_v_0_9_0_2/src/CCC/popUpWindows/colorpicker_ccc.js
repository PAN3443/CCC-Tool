

function setColorpickerEventID(eventID){
  colorpickerAffectID = eventID;

  var refObj = document.getElementById(eventID);

  var box = refObj.getBoundingClientRect();

  var pickerBox = document.getElementById("id_popupColorPicker").getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  switch (eventID) {
    case "id_edit_cms_SetNaN":
      colorpickerColor.updateColor(editSection.getSpecialCMSColor("nan", "rgb"));
      // below the object
      document.getElementById("id_popupColorPicker").style.top = (top + box.height) + "px";
      document.getElementById("id_popupColorPicker").style.left = (left - pickerBox.width) + "px";
      break;
    case "id_edit_cms_SetBelow":
      colorpickerColor.updateColor(editSection.getSpecialCMSColor("below", "rgb"));
      // below the object
      document.getElementById("id_popupColorPicker").style.top = (top + box.height) + "px";
      document.getElementById("id_popupColorPicker").style.left = (left - pickerBox.width) + "px";
      break;
    case "id_edit_cms_SetAbove":
      colorpickerColor.updateColor(editSection.getSpecialCMSColor("above", "rgb"));
      // below the object
      document.getElementById("id_popupColorPicker").style.top = (top + box.height) + "px";
      document.getElementById("id_popupColorPicker").style.left = (left - pickerBox.width) + "px";
      break;
    case "id_EditPage_DrawnDualKey":
    case "id_EditPage_DrawnRightKey":
      colorpickerColor.updateColor(editSection.editCMS.getRightKeyColor(document.getElementById("id_EditPage_EditKey_List").selectedIndex, "rgb"));
      // above the object
      document.getElementById("id_popupColorPicker").style.top = (top + box.height) + "px";
      document.getElementById("id_popupColorPicker").style.left = (left - pickerBox.width) + "px";
      break;

    case "id_EditPage_DrawnLeftKey":
      colorpickerColor.updateColor(editSection.editCMS.getLeftKeyColor(document.getElementById("id_EditPage_EditKey_List").selectedIndex, "rgb"));
      // above the object
      document.getElementById("id_popupColorPicker").style.top = (top + box.height) + "px";
      document.getElementById("id_popupColorPicker").style.left = (left - pickerBox.width) + "px";
    break;
  }
}

function affectColorpickerChange() {
  switch (colorpickerAffectID) {
    case "id_edit_cms_SetNaN":
      editSection.setSpecialCMSColor("nan", colorpickerColor.getColorInfo("rgb"));
      editSection.updateMapping();
      editSection.saveCreateProcess();
      break;
    case "id_edit_cms_SetBelow":
      editSection.setSpecialCMSColor("below", colorpickerColor.getColorInfo("rgb"));
      editSection.updateMapping();
      editSection.saveCreateProcess();
      break;
    case "id_edit_cms_SetAbove":
      editSection.setSpecialCMSColor("above", colorpickerColor.getColorInfo("rgb"));
      editSection.updateMapping();
      editSection.saveCreateProcess();
      break;
    case "id_EditPage_DrawnDualKey":
      editSection.editCMS.setRightKeyColor(document.getElementById("id_EditPage_EditKey_List").selectedIndex, colorpickerColor.getColorInfo("rgb"));
      editSection.editCMS.setLeftKeyColor(document.getElementById("id_EditPage_EditKey_List").selectedIndex, colorpickerColor.getColorInfo("rgb"));
      editSection.updateSection();
      editSection.saveCreateProcess();
      break;
    case "id_EditPage_DrawnLeftKey":
      editSection.editCMS.setLeftKeyColor(document.getElementById("id_EditPage_EditKey_List").selectedIndex, colorpickerColor.getColorInfo("rgb"));
      editSection.updateSection();
      editSection.saveCreateProcess();
      break;
    case "id_EditPage_DrawnRightKey":
      editSection.editCMS.setRightKeyColor(document.getElementById("id_EditPage_EditKey_List").selectedIndex, colorpickerColor.getColorInfo("rgb"));
      editSection.updateSection();
      editSection.saveCreateProcess();
      break;
  }
}
