function initColorPicker() {
  document.getElementById('id_popupWindow_Colorpicker_RG_B').addEventListener("click", changeColorpickerType);
  document.getElementById('id_popupWindow_Colorpicker_RB_G').addEventListener("click", changeColorpickerType);
  document.getElementById('id_popupWindow_Colorpicker_GB_R').addEventListener("click", changeColorpickerType);
  document.getElementById('id_popupWindow_Colorpicker_HS_V').addEventListener("click", changeColorpickerType);
  document.getElementById('id_popupWindow_Colorpicker_HV_S').addEventListener("click", changeColorpickerType);
  document.getElementById('id_popupWindow_Colorpicker_SV_H').addEventListener("click", changeColorpickerType);

  document.getElementById('id_popupWindow_Colorpicker_canvasPicker_circle').addEventListener("mousemove", event_colorpicker_MouseMove);
  document.getElementById('id_popupWindow_Colorpicker_canvasPicker_circle').addEventListener("click", event_colorpicker_MouseClick);

  document.getElementById('id_popupWindow_Colorpicker_canvasPicker2_bar').addEventListener("mousemove", event_colorpicker_MouseMove);
  document.getElementById('id_popupWindow_Colorpicker_canvasPicker2_bar').addEventListener("click", event_colorpicker_MouseClick);

  document.getElementById('id_popupWindow_Colorpicker_Input1').addEventListener("change", changeColorPickerInput);
  document.getElementById('id_popupWindow_Colorpicker_Input2').addEventListener("change", changeColorPickerInput);
  document.getElementById('id_popupWindow_Colorpicker_Input3').addEventListener("change", changeColorPickerInput);
}

function openColorPicker(event) {

  document.getElementById("id_popupColorPicker").style.display = "block";
  document.getElementById("id_popupColorPicker").style.position = "absolute";
  document.getElementById("id_popupColorPicker").style.zIndex = 85;

  setColorpickerEventID(event.target.id);

  if (document.getElementById("id_popupWindow_Colorpicker_HS_V").checked ||
    document.getElementById("id_popupWindow_Colorpicker_HV_S").checked ||
    document.getElementById("id_popupWindow_Colorpicker_SV_H").checked) {

    document.getElementById("id_popupWindow_Colorpicker_Input1").max = 360;
    document.getElementById("id_popupWindow_Colorpicker_Input2").max = 100;
    document.getElementById("id_popupWindow_Colorpicker_Input3").max = 100;
    var tmpColorInfo = colorpickerColor.getColorInfo("hsv");
    document.getElementById("id_popupWindow_Colorpicker_Input1").value = Math.round(tmpColorInfo[1] * 360);
    document.getElementById("id_popupWindow_Colorpicker_Input2").value = Math.round(tmpColorInfo[2] * 100);
    document.getElementById("id_popupWindow_Colorpicker_Input3").value = Math.round(tmpColorInfo[3] * 100);

    document.getElementById("id_popupColorPicker_InputLabel1").innerHTML = "H : ";
    document.getElementById("id_popupColorPicker_InputLabel2").innerHTML = "S : ";
    document.getElementById("id_popupColorPicker_InputLabel3").innerHTML = "V : ";
  } else {
    var tmpColorInfo = colorpickerColor.getColorInfo("rgb");
    document.getElementById("id_popupWindow_Colorpicker_Input1").max = 255;
    document.getElementById("id_popupWindow_Colorpicker_Input2").max = 255;
    document.getElementById("id_popupWindow_Colorpicker_Input3").max = 255;
    document.getElementById("id_popupWindow_Colorpicker_Input1").value = Math.round(tmpColorInfo[1] * 255);
    document.getElementById("id_popupWindow_Colorpicker_Input2").value = Math.round(tmpColorInfo[2] * 255);
    document.getElementById("id_popupWindow_Colorpicker_Input3").value = Math.round(tmpColorInfo[3] * 255);

    document.getElementById("id_popupColorPicker_InputLabel1").innerHTML = "R : ";
    document.getElementById("id_popupColorPicker_InputLabel2").innerHTML = "G : ";
    document.getElementById("id_popupColorPicker_InputLabel3").innerHTML = "B : ";
  }

  initColorpickerBackground();
  drawColorPickerCircle();
  initColorPickerVBarBackground();
  drawColorPickerVBar();

}

function closeColorPicker() {
  document.getElementById("id_popupColorPicker").style.display = "none";
}

function changeColorpickerType(event) {

  switch (event.target.id) {
    case "id_popupWindow_Colorpicker_RG_B":
      colorpickerType = "RG_B";
      break;
    case "id_popupWindow_Colorpicker_RB_G":
      colorpickerType = "RB_G";
      break;
    case "id_popupWindow_Colorpicker_GB_R":
      colorpickerType = "GB_R";
      break;
    case "id_popupWindow_Colorpicker_HS_V":
      colorpickerType = "HS_V";
      break;
    case "id_popupWindow_Colorpicker_HV_S":
      colorpickerType = "HV_S";
      break;
    case "id_popupWindow_Colorpicker_SV_H":
      colorpickerType = "SV_H";
      break;
    default:
      return;
  }

  initColorpickerBackground();
  drawColorPickerCircle();
  initColorPickerVBarBackground();
  drawColorPickerVBar();

  if (document.getElementById("id_popupWindow_Colorpicker_HS_V").checked ||
    document.getElementById("id_popupWindow_Colorpicker_HV_S").checked ||
    document.getElementById("id_popupWindow_Colorpicker_SV_H").checked) {

    document.getElementById("id_popupWindow_Colorpicker_Input1").max = 360;
    document.getElementById("id_popupWindow_Colorpicker_Input2").max = 100;
    document.getElementById("id_popupWindow_Colorpicker_Input3").max = 100;
    var tmpColorInfo = colorpickerColor.getColorInfo("hsv");
    document.getElementById("id_popupWindow_Colorpicker_Input1").value = Math.round(tmpColorInfo[1] * 360);
    document.getElementById("id_popupWindow_Colorpicker_Input2").value = Math.round(tmpColorInfo[2] * 100);
    document.getElementById("id_popupWindow_Colorpicker_Input3").value = Math.round(tmpColorInfo[3] * 100);

    document.getElementById("id_popupColorPicker_InputLabel1").innerHTML = "H : ";
    document.getElementById("id_popupColorPicker_InputLabel2").innerHTML = "S : ";
    document.getElementById("id_popupColorPicker_InputLabel3").innerHTML = "V : ";
  } else {
    var tmpColorInfo = colorpickerColor.getColorInfo("rgb");
    document.getElementById("id_popupWindow_Colorpicker_Input1").max = 255;
    document.getElementById("id_popupWindow_Colorpicker_Input2").max = 255;
    document.getElementById("id_popupWindow_Colorpicker_Input3").max = 255;
    document.getElementById("id_popupWindow_Colorpicker_Input1").value = Math.round(tmpColorInfo[1] * 255);
    document.getElementById("id_popupWindow_Colorpicker_Input2").value = Math.round(tmpColorInfo[2] * 255);
    document.getElementById("id_popupWindow_Colorpicker_Input3").value = Math.round(tmpColorInfo[3] * 255);

    document.getElementById("id_popupColorPicker_InputLabel1").innerHTML = "R : ";
    document.getElementById("id_popupColorPicker_InputLabel2").innerHTML = "G : ";
    document.getElementById("id_popupColorPicker_InputLabel3").innerHTML = "B : ";
  }
}

function initColorpickerBackground() {

  var canvasColorspace = document.getElementById("id_popupWindow_Colorpicker_canvasPicker");

  var rect = canvasColorspace.getBoundingClientRect();

  canvasColorspace.width = rect.width;
  canvasColorspace.height = rect.height;

  //var ratioWidthHeight = canvasColorspace.width/canvasColorspace.height;
  var colorspaceContex = canvasColorspace.getContext("2d");
  colorpickerData = colorspaceContex.getImageData(0, 0, canvasColorspace.width, canvasColorspace.height);

  var tmpRGBColorInfo = colorpickerColor.getColorInfo("rgb");
  var tmpHSVColorInfo = colorpickerColor.getColorInfo("hsv");
  switch (colorpickerType) {
    case "RG_B":

      var bVal = tmpRGBColorInfo[3];

      for (var x = 0; x < canvasColorspace.width; x++) {

        var rVal = x / canvasColorspace.width;

        for (var y = 0; y < canvasColorspace.height; y++) {
          var gVal = 1 - y / canvasColorspace.height;
          var index = (x + y * canvasColorspace.width) * 4;
          if (doColorblindnessSim) {
            gWorkColor1.updateColor("rgb", rVal, gVal, bVal);
            var colorInfo = gWorkColor1.getColorInfo("rgb_cb");
            colorpickerData.data[index + 0] = Math.round(colorInfo[1] * 255); // r
            colorpickerData.data[index + 1] = Math.round(colorInfo[2] * 255); // g
            colorpickerData.data[index + 2] = Math.round(colorInfo[3] * 255); // b
          } else {
            colorpickerData.data[index + 0] = Math.round(rVal * 255); // r
            colorpickerData.data[index + 1] = Math.round(gVal * 255); // g
            colorpickerData.data[index + 2] = Math.round(bVal * 255); // b
          }
          colorpickerData.data[index + 3] = 255; //a
        }
      }
      break;
    case "RB_G":

      var gVal = tmpRGBColorInfo[2];
      for (var x = 0; x < canvasColorspace.width; x++) {
        var rVal = x / canvasColorspace.width;
        for (var y = 0; y < canvasColorspace.height; y++) {
          var bVal = 1 - y / canvasColorspace.height;
          var index = (x + y * canvasColorspace.width) * 4;
          if (doColorblindnessSim) {
            gWorkColor1.updateColor("rgb", rVal, gVal, bVal);
            var colorInfo = gWorkColor1.getColorInfo("rgb_cb");
            colorpickerData.data[index + 0] = Math.round(colorInfo[1] * 255); // r
            colorpickerData.data[index + 1] = Math.round(colorInfo[2] * 255); // g
            colorpickerData.data[index + 2] = Math.round(colorInfo[3] * 255); // b
          } else {
            colorpickerData.data[index + 0] = Math.round(rVal * 255); // r
            colorpickerData.data[index + 1] = Math.round(gVal * 255); // g
            colorpickerData.data[index + 2] = Math.round(bVal * 255); // b
          }
          colorpickerData.data[index + 3] = 255; //a

        }
      }
      break;
    case "GB_R":
      var rVal = tmpRGBColorInfo[1];
      for (var x = 0; x < canvasColorspace.width; x++) {
        var gVal = x / canvasColorspace.width;
        for (var y = 0; y < canvasColorspace.height; y++) {
          var bVal = 1 - y / canvasColorspace.height;
          var index = (x + y * canvasColorspace.width) * 4;
          if (doColorblindnessSim) {
            gWorkColor1.updateColor("rgb", rVal, gVal, bVal);
            var colorInfo = gWorkColor1.getColorInfo("rgb_cb");
            colorpickerData.data[index + 0] = Math.round(colorInfo[1] * 255); // r
            colorpickerData.data[index + 1] = Math.round(colorInfo[2] * 255); // g
            colorpickerData.data[index + 2] = Math.round(colorInfo[3] * 255); // b
          } else {
            colorpickerData.data[index + 0] = Math.round(rVal * 255); // r
            colorpickerData.data[index + 1] = Math.round(gVal * 255); // g
            colorpickerData.data[index + 2] = Math.round(bVal * 255); // b
          }
          colorpickerData.data[index + 3] = 255; //a
        }
      }
      break;
    case "HS_V":

      var vVal = tmpHSVColorInfo[3];
      for (var x = 0; x < canvasColorspace.width; x++) {
        var hVal = x / canvasColorspace.width;
        for (var y = 0; y < canvasColorspace.height; y++) {
          // calc hsv color
          var sVal = 1 - y / canvasColorspace.height;
          var index = (x + y * canvasColorspace.width) * 4;
          gWorkColor1.updateColor("hsv", hVal, sVal, vVal);
          if (doColorblindnessSim) {
            var colorInfo = gWorkColor1.getColorInfo("rgb_cb");
            colorpickerData.data[index + 0] = Math.round(colorInfo[1] * 255); // r
            colorpickerData.data[index + 1] = Math.round(colorInfo[2] * 255); // g
            colorpickerData.data[index + 2] = Math.round(colorInfo[3] * 255); // b
          } else {
            var colorInfo = gWorkColor1.getColorInfo("rgb");
            colorpickerData.data[index + 0] = Math.round(colorInfo[1] * 255); // r
            colorpickerData.data[index + 1] = Math.round(colorInfo[2] * 255); // g
            colorpickerData.data[index + 2] = Math.round(colorInfo[3] * 255); // b
          }
          colorpickerData.data[index + 3] = 255; //a
        }
      }
      break;
    case "HV_S":

      var sVal = tmpHSVColorInfo[2];

      for (var x = 0; x < canvasColorspace.width; x++) {

        var hVal = x / canvasColorspace.width;

        for (var y = 0; y < canvasColorspace.height; y++) {

          // calc hsv color
          var vVal = 1 - y / canvasColorspace.height;
          var index = (x + y * canvasColorspace.width) * 4;
          gWorkColor1.updateColor("hsv", hVal, sVal, vVal);
          if (doColorblindnessSim) {
            var colorInfo = gWorkColor1.getColorInfo("rgb_cb");
            colorpickerData.data[index + 0] = Math.round(colorInfo[1] * 255); // r
            colorpickerData.data[index + 1] = Math.round(colorInfo[2] * 255); // g
            colorpickerData.data[index + 2] = Math.round(colorInfo[3] * 255); // b
          } else {
            var colorInfo = gWorkColor1.getColorInfo("rgb");
            colorpickerData.data[index + 0] = Math.round(colorInfo[1] * 255); // r
            colorpickerData.data[index + 1] = Math.round(colorInfo[2] * 255); // g
            colorpickerData.data[index + 2] = Math.round(colorInfo[3] * 255); // b
          }
          colorpickerData.data[index + 3] = 255; //a

        }
      }
      break;
    case "SV_H":

      var hVal = tmpHSVColorInfo[1];

      for (var x = 0; x < canvasColorspace.width; x++) {

        var sVal = x / canvasColorspace.width;

        for (var y = 0; y < canvasColorspace.height; y++) {

          // calc hsv color
          var vVal = 1 - y / canvasColorspace.height;
          var index = (x + y * canvasColorspace.width) * 4;
          gWorkColor1.updateColor("hsv", hVal, sVal, vVal);
          if (doColorblindnessSim) {
            var colorInfo = gWorkColor1.getColorInfo("rgb_cb");
            colorpickerData.data[index + 0] = Math.round(colorInfo[1] * 255); // r
            colorpickerData.data[index + 1] = Math.round(colorInfo[2] * 255); // g
            colorpickerData.data[index + 2] = Math.round(colorInfo[3] * 255); // b
          } else {
            var colorInfo = gWorkColor1.getColorInfo("rgb");
            colorpickerData.data[index + 0] = Math.round(colorInfo[1] * 255); // r
            colorpickerData.data[index + 1] = Math.round(colorInfo[2] * 255); // g
            colorpickerData.data[index + 2] = Math.round(colorInfo[3] * 255); // b
          }
          colorpickerData.data[index + 3] = 255; //a

        }
      }
      break;
    default:

  }

  colorspaceContex.putImageData(colorpickerData, 0, 0);

}

function initColorPickerVBarBackground() {

  var canvasVInput = document.getElementById("id_popupWindow_Colorpicker_canvasPicker2");

  var rect = canvasVInput.getBoundingClientRect();

  canvasVInput.width = rect.width;
  canvasVInput.height = rect.height;

  var canvasVInputContex = canvasVInput.getContext("2d");

  var tmpRGBColorInfo = colorpickerColor.getColorInfo("rgb");
  var tmpHSVColorInfo = colorpickerColor.getColorInfo("hsv");

  if (colorpickerType != "SV_H") {

    switch (colorpickerType) {
      case "RG_B":
        var gVal = tmpRGBColorInfo[2];
        var rVal = tmpRGBColorInfo[1];
        gWorkColor1.updateColor("rgb", rVal, gVal, 1);
        gWorkColor2.updateColor("rgb", rVal, gVal, 0);
        break;
      case "RB_G":
        var rVal = tmpRGBColorInfo[1];
        var bVal = tmpRGBColorInfo[3];
        gWorkColor1.updateColor("rgb", rVal, 1, bVal);
        gWorkColor2.updateColor("rgb", rVal, 0, bVal);
        break;
      case "GB_R":
        var gVal = tmpRGBColorInfo[2];
        var bVal = tmpRGBColorInfo[3];
        gWorkColor1.updateColor("rgb", 1, gVal, bVal);
        gWorkColor2.updateColor("rgb", 0, gVal, bVal);
        break;
      case "HS_V":
        var hVal = tmpHSVColorInfo[1];
        var sVal = tmpHSVColorInfo[2];
        gWorkColor1.updateColor("hsv", hVal, sVal, 1);
        gWorkColor2.updateColor("hsv", hVal, sVal, 0);
        break;
      case "HV_S":
        var hVal = tmpHSVColorInfo[1];
        var vVal = tmpHSVColorInfo[3];
        gWorkColor1.updateColor("hsv", hVal, 1, vVal);
        gWorkColor2.updateColor("hsv", hVal, 0, vVal);
        break;
        /*case "SV_H":

          var sVal = tmpHSVColorInfo[2];
          var vVal = tmpHSVColorInfo[3];
          gWorkColor1.updateColor("hsv",1, sVal, vVal);
          gWorkColor2.updateColor("hsv",0, sVal, vVal);
          break;*/
      default:
        return;
    }

    ////////////////////// HIER WEITER ARBEITEN ///////////////////////////
    var rgbString1 = gWorkColor1.get_RGB_String();
    var rgbString2 = gWorkColor2.get_RGB_String();
    if (doColorblindnessSim) {
      rgbString1 = gWorkColor1.get_RGB_CB_String()
      rgbString2 = gWorkColor2.get_RGB_CB_String()
    }
    var grd = canvasVInputContex.createLinearGradient(0, 0, 0, canvasVInput.height);
    grd.addColorStop(0, rgbString1);
    grd.addColorStop(1, rgbString2);
    canvasVInputContex.fillStyle = grd;
    canvasVInputContex.fillRect(0, 0, canvasVInput.width, canvasVInput.height);

  } else {
    var tmpData = canvasVInputContex.getImageData(0, 0, canvasVInput.width, canvasVInput.height);
    for (var y = 0; y < canvasVInput.height; y++) {

      // calc hsv color
      var hVal = 1 - y / canvasVInput.height;
      for (var x = 0; x < canvasVInput.width; x++) {

        var sVal = tmpHSVColorInfo[2];
        var vVal = tmpHSVColorInfo[3];

        gWorkColor1.updateColor("hsv", hVal, sVal, vVal);

        var index = (x + y * canvasVInput.width) * 4;
        var rgbInfo = gWorkColor1.getColorInfo("rgb");
        if (doColorblindnessSim)
          rgbInfo = gWorkColor1.getColorInfo("rgb_cb");

        tmpData.data[index + 0] = Math.round(rgbInfo[1] * 255); // r
        tmpData.data[index + 1] = Math.round(rgbInfo[2] * 255); // g
        tmpData.data[index + 2] = Math.round(rgbInfo[3] * 255); // b
        tmpData.data[index + 3] = 255; //a

      }
    }
    canvasVInputContex.putImageData(tmpData, 0, 0);

  }

}

function drawColorPickerCircle() {


  var canvasColorspace = document.getElementById("id_popupWindow_Colorpicker_canvasPicker_circle");

  var rect = canvasColorspace.getBoundingClientRect();

  canvasColorspace.width = rect.width;
  canvasColorspace.height = rect.height;

  var colorspaceContex = canvasColorspace.getContext("2d");

  var tmpRGBColorInfo = colorpickerColor.getColorInfo("rgb");
  var tmpHSVColorInfo = colorpickerColor.getColorInfo("hsv");
  switch (colorpickerType) {
    case "RG_B":

      xPos = tmpRGBColorInfo[1] * canvasColorspace.width;
      yPos = (1 - tmpRGBColorInfo[2]) * canvasColorspace.height;

      break;
    case "RB_G":

      xPos = tmpRGBColorInfo[1] * canvasColorspace.width;
      yPos = (1 - tmpRGBColorInfo[3]) * canvasColorspace.height;

      break;
    case "GB_R":

      xPos = tmpRGBColorInfo[2] * canvasColorspace.width;
      yPos = (1 - tmpRGBColorInfo[3]) * canvasColorspace.height;


      break;
    case "HS_V":

      xPos = tmpHSVColorInfo[1] * canvasColorspace.width;
      yPos = (1 - tmpHSVColorInfo[2]) * canvasColorspace.height;

      break;
    case "HV_S":

      xPos = tmpHSVColorInfo[1] * canvasColorspace.width;
      yPos = (1 - tmpHSVColorInfo[3]) * canvasColorspace.height;

      break;
    case "SV_H":

      xPos = tmpHSVColorInfo[2] * canvasColorspace.width;
      yPos = (1 - tmpHSVColorInfo[3]) * canvasColorspace.height;

      break;
    default:
      return;
  }

  colorspaceContex.beginPath();
  colorspaceContex.arc(xPos, yPos, 5, 0, 2 * Math.PI, false);
  colorspaceContex.fillStyle = colorpickerColor.get_RGB_String();
  colorspaceContex.fill();
  colorspaceContex.lineWidth = 2;

  if (colorpickerColor.getColorInfo("lab")[1] > 50)
    colorspaceContex.strokeStyle = 'rgb(0,0,0)';
  else
    colorspaceContex.strokeStyle = 'rgb(255,255,255)';
  colorspaceContex.stroke();

}

function drawColorPickerVBar() {
  var canvasVInput = document.getElementById("id_popupWindow_Colorpicker_canvasPicker2_bar");

  var rect = canvasVInput.getBoundingClientRect();

  canvasVInput.width = rect.width;
  canvasVInput.height = rect.height;

  var canvasVInputContex = canvasVInput.getContext("2d");
  var colorRGB1;
  var colorRGB2;

  var vBarHeight = canvasVInput.width / 20;
  var vBarHeightsmall = canvasVInput.width / 30;

  var tmpRGBColorInfo = colorpickerColor.getColorInfo("rgb");
  var tmpHSVColorInfo = colorpickerColor.getColorInfo("hsv");
  switch (colorpickerType) {
    case "RG_B":
      zPos = canvasVInput.height * (1 - tmpRGBColorInfo[3]);
      break;
    case "RB_G":
      zPos = canvasVInput.height * (1 - tmpRGBColorInfo[2]);
      break;
    case "GB_R":
      zPos = canvasVInput.height * (1 - tmpRGBColorInfo[1]);
      break;
    case "HS_V":
      zPos = canvasVInput.height * (1 - tmpHSVColorInfo[3]);
      break;
    case "HV_S":
      zPos = canvasVInput.height * (1 - tmpHSVColorInfo[2]);
      break;
    case "SV_H":
      zPos = canvasVInput.height * (1 - tmpHSVColorInfo[1]);
      break;
    default:
      return;
  }

  canvasVInputContex.fillStyle = "rgba(255,255,255,0.7)";
  canvasVInputContex.fillRect(0, zPos - vBarHeight / 2, canvasVInput.width, vBarHeight);
  canvasVInputContex.fillStyle = "rgba(0,0,0,0.7)"; //colorRGB1.getRGBStringAplha(1.0);
  canvasVInputContex.fillRect(0, zPos - vBarHeightsmall / 2, canvasVInput.width, vBarHeightsmall);

}

function event_colorpicker_MouseMove(event) {

  var rect = document.getElementById(event.target.id).getBoundingClientRect();

  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;

  mousePosX = canvasPosX;
  mousePosY = canvasPosY;

  //console.log(mousePosX,rect.width,mousePosY,rect.height);
}

function event_colorpicker_MouseClick(event) {

  var canvasObject = document.getElementById(event.target.id);

  var rect = canvasObject.getBoundingClientRect();

  canvasObject.width = rect.width;
  canvasObject.height = rect.height;


  switch (event.target.id) {
    case "id_popupWindow_Colorpicker_canvasPicker_circle":
      switch (colorpickerType) {
        case "RG_B":
          var rVal = mousePosX / canvasObject.width;
          var gVal = 1 - mousePosY / canvasObject.height;
          colorpickerColor.setValue("rgb", 0, rVal);
          colorpickerColor.setValue("rgb", 1, gVal);
          break;
        case "RB_G":
          var rVal = mousePosX / canvasObject.width;
          var bVal = 1 - mousePosY / canvasObject.height;
          colorpickerColor.setValue("rgb", 0, rVal);
          colorpickerColor.setValue("rgb", 2, bVal);
          break;
        case "GB_R":
          var gVal = mousePosX / canvasObject.width;
          var bVal = 1 - mousePosY / canvasObject.height;
          colorpickerColor.setValue("rgb", 1, gVal);
          colorpickerColor.setValue("rgb", 2, bVal);
          break;
        case "HS_V":
          var hVal = mousePosX / canvasObject.width;
          var sVal = 1 - mousePosY / canvasObject.height;
          colorpickerColor.setValue("hsv", 0, hVal);
          colorpickerColor.setValue("hsv", 1, sVal);
          break;
        case "HV_S":

          var hVal = mousePosX / canvasObject.width;
          var vVal = 1 - mousePosY / canvasObject.height;
          colorpickerColor.setValue("hsv", 0, hVal);
          colorpickerColor.setValue("hsv", 2, vVal);
          break;
        case "SV_H":
          var sVal = mousePosX / canvasObject.width;
          var vVal = 1 - mousePosY / canvasObject.height;
          colorpickerColor.setValue("hsv", 1, sVal);
          colorpickerColor.setValue("hsv", 2, vVal);
          break;
        default:
          return;
      }
      drawColorPickerCircle();
      initColorPickerVBarBackground();
      break;
    case "id_popupWindow_Colorpicker_canvasPicker2_bar":

      switch (colorpickerType) {
        case "RG_B":
          var bVal = 1 - mousePosY / canvasObject.height;
          colorpickerColor.setValue("rgb", 2, bVal);
          break;
        case "RB_G":
          var gVal = 1 - mousePosY / canvasObject.height;
          colorpickerColor.setValue("rgb", 1, gVal);
          break;
        case "GB_R":
          var rVal = 1 - mousePosY / canvasObject.height;
          colorpickerColor.setValue("rgb", 0, rVal);
          break;
        case "HS_V":
          var vVal = 1 - mousePosY / canvasObject.height;
          colorpickerColor.setValue("hsv", 2, vVal);
          break;
        case "HV_S":
          var sVal = 1 - mousePosY / canvasObject.height;
          colorpickerColor.setValue("hsv", 1, sVal);
          break;
        case "SV_H":
          var hVal = 1 - mousePosY / canvasObject.height;
          colorpickerColor.setValue("hsv", 0, hVal);
          break;
        default:
          return;
      }

      initColorpickerBackground();
      drawColorPickerVBar();
      //drawColorPickerCircle();


      break;
    default:
      return;

  }

  affectColorpickerChange();

  if (document.getElementById("id_popupWindow_Colorpicker_HS_V").checked ||
    document.getElementById("id_popupWindow_Colorpicker_HV_S").checked ||
    document.getElementById("id_popupWindow_Colorpicker_SV_H").checked) {
    var tmpHSVColorInfo = colorpickerColor.getColorInfo("hsv");
    document.getElementById("id_popupWindow_Colorpicker_Input1").value = Math.round(tmpHSVColorInfo[1] * 360);
    document.getElementById("id_popupWindow_Colorpicker_Input2").value = Math.round(tmpHSVColorInfo[2] * 100);
    document.getElementById("id_popupWindow_Colorpicker_Input3").value = Math.round(tmpHSVColorInfo[3] * 100);

  } else {
    var tmpRGBColorInfo = colorpickerColor.getColorInfo("rgb");
    document.getElementById("id_popupWindow_Colorpicker_Input1").value = Math.round(tmpRGBColorInfo[1] * 255);
    document.getElementById("id_popupWindow_Colorpicker_Input2").value = Math.round(tmpRGBColorInfo[2] * 255);
    document.getElementById("id_popupWindow_Colorpicker_Input3").value = Math.round(tmpRGBColorInfo[3] * 255);
  }

  if(doColorblindnessSim)
    document.getElementById(colorpickerAffectID).style.background = colorpickerColor.getColorInfo("rgb_cb_string");
  else
    document.getElementById(colorpickerAffectID).style.background = colorpickerColor.getColorInfo("rgb_string");

}

function changeColorPickerInput() {


  if (document.getElementById("id_popupWindow_Colorpicker_HS_V").checked ||
    document.getElementById("id_popupWindow_Colorpicker_HV_S").checked ||
    document.getElementById("id_popupWindow_Colorpicker_SV_H").checked) {


    var hVal = parseFloat(document.getElementById("id_popupWindow_Colorpicker_Input1").value) / 360;
    var sVal = parseFloat(document.getElementById("id_popupWindow_Colorpicker_Input2").value) / 100;
    var vVal = parseFloat(document.getElementById("id_popupWindow_Colorpicker_Input3").value) / 100;


    if (hVal > 1.0) {
      hVal = 1.0;
      document.getElementById("id_popupWindow_Colorpicker_Input1").value = 360;
    }

    if (hVal < 0) {
      hVal = 0;
      document.getElementById("id_popupWindow_Colorpicker_Input1").value = 0;
    }


    if (sVal > 1.0) {
      sVal = 1.0;
      document.getElementById("id_popupWindow_Colorpicker_Input2").value = 100;
    }

    if (sVal < 0) {
      sVal = 0;
      document.getElementById("id_popupWindow_Colorpicker_Input2").value = 0;
    }


    if (vVal > 1.0) {
      vVal = 1.0;
      document.getElementById("id_popupWindow_Colorpicker_Input3").value = 100;
    }

    if (vVal < 0) {
      vVal = 0;
      document.getElementById("id_popupWindow_Colorpicker_Input3").value = 0;
    }


    colorpickerColor.setHSV(hVal, sVal, vVal);

  } else {
    var rVal = parseFloat(document.getElementById("id_popupWindow_Colorpicker_Input1").value) / 255;
    var gVal = parseFloat(document.getElementById("id_popupWindow_Colorpicker_Input2").value) / 255;
    var bVal = parseFloat(document.getElementById("id_popupWindow_Colorpicker_Input3").value) / 255;

    if (rVal > 1.0) {
      rVal = 1.0;
      document.getElementById("id_popupWindow_Colorpicker_Input1").value = 255;
    }

    if (rVal < 0) {
      rVal = 0;
      document.getElementById("id_popupWindow_Colorpicker_Input1").value = 0;
    }

    if (gVal > 1.0) {
      gVal = 1.0;
      document.getElementById("id_popupWindow_Colorpicker_Input2").value = 255;
    }

    if (gVal < 0) {
      gVal = 0;
      document.getElementById("id_popupWindow_Colorpicker_Input2").value = 0;
    }

    if (bVal > 1.0) {
      bVal = 1.0;
      document.getElementById("id_popupWindow_Colorpicker_Input3").value = 255;
    }

    if (bVal < 0) {
      bVal = 0;
      document.getElementById("id_popupWindow_Colorpicker_Input3").value = 0;
    }

    colorpickerColor.setRGB(rVal, gVal, bVal);
  }

  initColorpickerBackground();
  drawColorPickerVBar();
  drawColorPickerCircle();

  affectColorpickerChange();
}
