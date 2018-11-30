
function closeColorPicker(){
  document.getElementById("id_popupColorPicker").style.display="none";
  document.getElementById("id_popupColorPicker_settingDiv").style.display="none";
}

function openColorPickerSettings(){
  if(document.getElementById("id_popupColorPicker_settingDiv").style.display=="none")
    document.getElementById("id_popupColorPicker_settingDiv").style.display="inline-block";
  else
    document.getElementById("id_popupColorPicker_settingDiv").style.display="none";
}

function openColorPicker(event){

  document.getElementById("id_popupColorPicker").style.display="block";
  document.getElementById("id_popupColorPicker").style.position="absolute";

  var refObj = document.getElementById(event.target.id);

  var box = refObj.getBoundingClientRect();

  var pickerBox = document.getElementById("id_popupColorPicker").getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left+ scrollLeft - clientLeft;

  colorpickerAffectID=event.target.id;

  switch (event.target.id) {
    case "id_EditPage_MappingBackground_Custom":
    colorpickerColor=mappingBackgroundColor;
    // below the object
    document.getElementById("id_popupColorPicker").style.top=(top-pickerBox.height)+"px";
    document.getElementById("id_popupColorPicker").style.left=(left+box.width)+"px";
    break;

    case "id_EditPage_ColorAboveFixedAxis_GlobalLocalOrder":
    colorpickerColor=globalPlotAboveColor;
    // below the object
    document.getElementById("id_popupColorPicker").style.top=(top-pickerBox.height)+"px";
    document.getElementById("id_popupColorPicker").style.left=(left-pickerBox.width)+"px";
    break;
    case "id_EditPage_CMS_NaN_Color":
    colorpickerColor=globalCMS1.getNaNColor("rgb");
    // below the object
    document.getElementById("id_popupColorPicker").style.top=(top+box.height)+"px";
    document.getElementById("id_popupColorPicker").style.left=(left-pickerBox.width)+"px";
    break;
    case "id_EditPage_CMS_Below_Color":
    colorpickerColor=globalCMS1.getBelowColor("rgb");
    // below the object
    document.getElementById("id_popupColorPicker").style.top=(top+box.height)+"px";
    document.getElementById("id_popupColorPicker").style.left=(left-pickerBox.width)+"px";
    break;
    case "id_EditPage_CMS_Above_Color":
      colorpickerColor=globalCMS1.getAboveColor("rgb");
      // below the object
      document.getElementById("id_popupColorPicker").style.top=(top+box.height)+"px";
      document.getElementById("id_popupColorPicker").style.left=(left-pickerBox.width)+"px";
      break;

      case "id_editPage_customConstColor":
        colorpickerColor=customConstBandColor;
        // above the object
        document.getElementById("id_popupColorPicker").style.top=(top+box.height)+"px";
        document.getElementById("id_popupColorPicker").style.left=(left+box.width)+"px";
        break;
        case "id_editPage_customScaleColor1":
          colorpickerColor=customScaleBandColor1;
          // above the object
          document.getElementById("id_popupColorPicker").style.top=(top+box.height)+"px";
          document.getElementById("id_popupColorPicker").style.left=(left-pickerBox.width)+"px";
          break;
          case "id_editPage_customScaleColor2":
            colorpickerColor=customScaleBandColor2;
            // above the object
            document.getElementById("id_popupColorPicker").style.top=(top+box.height)+"px";
            document.getElementById("id_popupColorPicker").style.left=(left+box.width)+"px";
            break;

            case "id_EditPage_DrawnDualKey": case "id_EditPage_DrawnRightKey":
              colorpickerColor=globalCMS1.getRightKeyColor(document.getElementById("id_EditPage_EditKey_List").selectedIndex,"rgb");
              // above the object
              document.getElementById("id_popupColorPicker").style.top=(top)+"px";
              document.getElementById("id_popupColorPicker").style.left=(left+box.width)+"px";
              break;

                case "id_EditPage_DrawnLeftKey":
                  colorpickerColor=globalCMS1.getLeftKeyColor(document.getElementById("id_EditPage_EditKey_List").selectedIndex,"rgb");
                  // above the object
                  document.getElementById("id_popupColorPicker").style.top=(top)+"px";
                  document.getElementById("id_popupColorPicker").style.left=(left+box.width)+"px";
                  break;

                  case "id_inputProbeColor":
                    document.getElementById("id_popupColorPicker").style.position="fixed";
                    colorpickerColor=globalProbeColor;
                    // above the object
                    top =  refObj.offsetTop;
                    left = refObj.offsetLeft;
                    document.getElementById("id_popupColorPicker").style.top=(top+box.height)+"px";
                    document.getElementById("id_popupColorPicker").style.left=(left+box.width)+"px";
                    break;

                    case "id_inputEditProbeColor":
                      document.getElementById("id_popupColorPicker").style.position="fixed";
                      colorpickerColor=globalProbeColor;
                      // above the object
                      top =  refObj.offsetTop;
                      left = refObj.offsetLeft;
                      document.getElementById("id_popupColorPicker").style.top=(top+box.height)+"px";
                      document.getElementById("id_popupColorPicker").style.left=(left+box.width)+"px";
                      break;

    default:
    return;

  }



  if(document.getElementById("id_popupWindow_Colorpicker_HS_V").checked ||
    document.getElementById("id_popupWindow_Colorpicker_HV_S").checked ||
      document.getElementById("id_popupWindow_Colorpicker_SV_H").checked ){
  colorpickerColor=colorpickerColor.calcHSVColor();
  document.getElementById("id_popupWindow_Colorpicker_Input1").max = 360;
  document.getElementById("id_popupWindow_Colorpicker_Input2").max = 100;
  document.getElementById("id_popupWindow_Colorpicker_Input3").max = 100;
  document.getElementById("id_popupWindow_Colorpicker_Input1").value = Math.round(colorpickerColor.getHValue()*360);
    document.getElementById("id_popupWindow_Colorpicker_Input2").value = Math.round(colorpickerColor.getSValue()*100);
      document.getElementById("id_popupWindow_Colorpicker_Input3").value = Math.round(colorpickerColor.getVValue()*100);

      document.getElementById("id_popupColorPicker_InputLabel").innerHTML = "HSV";
      document.getElementById("id_popupColorPicker_InputLabel1").innerHTML = "H : ";
      document.getElementById("id_popupColorPicker_InputLabel2").innerHTML = "S : ";
      document.getElementById("id_popupColorPicker_InputLabel3").innerHTML = "V : ";
}
else{
  colorpickerColor=colorpickerColor.calcRGBColor();
  document.getElementById("id_popupWindow_Colorpicker_Input1").max = 255;
  document.getElementById("id_popupWindow_Colorpicker_Input2").max = 255;
  document.getElementById("id_popupWindow_Colorpicker_Input3").max = 255;
  document.getElementById("id_popupWindow_Colorpicker_Input1").value = Math.round(colorpickerColor.getRValue()*255);
    document.getElementById("id_popupWindow_Colorpicker_Input2").value = Math.round(colorpickerColor.getGValue()*255);
      document.getElementById("id_popupWindow_Colorpicker_Input3").value = Math.round(colorpickerColor.getBValue()*255);

      document.getElementById("id_popupColorPicker_InputLabel").innerHTML = "RGB";
      document.getElementById("id_popupColorPicker_InputLabel1").innerHTML = "R : ";
      document.getElementById("id_popupColorPicker_InputLabel2").innerHTML = "G : ";
      document.getElementById("id_popupColorPicker_InputLabel3").innerHTML = "B : ";
}



  initColorpickerBackground();
  drawColorPickerCircle();
  initColorPickerVBarBackground();
  drawColorPickerVBar();


  var tmpRGB = colorpickerColor.calcHSVColor();

}

function changeColorpickerType(event){

  switch (event.target.id) {
    case "id_popupWindow_Colorpicker_RG_B":
      colorpickerType="RG_B";
      colorpickerColor=colorpickerColor.calcRGBColor();
      break;
      case "id_popupWindow_Colorpicker_RB_G":
        colorpickerType="RB_G";
        colorpickerColor=colorpickerColor.calcRGBColor();
        break;
        case "id_popupWindow_Colorpicker_GB_R":
          colorpickerType="GB_R";
          colorpickerColor=colorpickerColor.calcRGBColor();
          break;
      case "id_popupWindow_Colorpicker_HS_V":
        colorpickerType="HS_V";
        colorpickerColor=colorpickerColor.calcHSVColor();
        break;
        case "id_popupWindow_Colorpicker_HV_S":
          colorpickerType="HV_S";
          colorpickerColor=colorpickerColor.calcHSVColor();
          break;
          case "id_popupWindow_Colorpicker_SV_H":
            colorpickerType="SV_H";
            colorpickerColor=colorpickerColor.calcHSVColor();
            break;
    default:

  }


  initColorpickerBackground();
  drawColorPickerCircle();
  initColorPickerVBarBackground();
  drawColorPickerVBar();


  if(document.getElementById("id_popupWindow_Colorpicker_HS_V").checked ||
    document.getElementById("id_popupWindow_Colorpicker_HV_S").checked ||
      document.getElementById("id_popupWindow_Colorpicker_SV_H").checked ){
  colorpickerColor=colorpickerColor.calcHSVColor();
  document.getElementById("id_popupWindow_Colorpicker_Input1").max = 360;
  document.getElementById("id_popupWindow_Colorpicker_Input2").max = 100;
  document.getElementById("id_popupWindow_Colorpicker_Input3").max = 100;
  document.getElementById("id_popupWindow_Colorpicker_Input1").value = Math.round(colorpickerColor.getHValue()*360);
    document.getElementById("id_popupWindow_Colorpicker_Input2").value = Math.round(colorpickerColor.getSValue()*100);
      document.getElementById("id_popupWindow_Colorpicker_Input3").value = Math.round(colorpickerColor.getVValue()*100);

      document.getElementById("id_popupColorPicker_InputLabel").innerHTML = "HSV";
      document.getElementById("id_popupColorPicker_InputLabel1").innerHTML = "H : ";
      document.getElementById("id_popupColorPicker_InputLabel2").innerHTML = "S : ";
      document.getElementById("id_popupColorPicker_InputLabel3").innerHTML = "V : ";
}
else{
  document.getElementById("id_popupWindow_Colorpicker_Input1").max = 255;
  document.getElementById("id_popupWindow_Colorpicker_Input2").max = 255;
  document.getElementById("id_popupWindow_Colorpicker_Input3").max = 255;
  document.getElementById("id_popupWindow_Colorpicker_Input1").value = Math.round(colorpickerColor.getRValue()*255);
    document.getElementById("id_popupWindow_Colorpicker_Input2").value = Math.round(colorpickerColor.getGValue()*255);
      document.getElementById("id_popupWindow_Colorpicker_Input3").value = Math.round(colorpickerColor.getBValue()*255);

      document.getElementById("id_popupColorPicker_InputLabel").innerHTML = "RGB";
      document.getElementById("id_popupColorPicker_InputLabel1").innerHTML = "R : ";
      document.getElementById("id_popupColorPicker_InputLabel2").innerHTML = "G : ";
      document.getElementById("id_popupColorPicker_InputLabel3").innerHTML = "B : ";
}
}

function initColorpickerBackground(){

    var canvasColorspace = document.getElementById("id_popupWindow_Colorpicker_canvasPicker");

    var rect = canvasColorspace.getBoundingClientRect();

    canvasColorspace.width = rect.width;
    canvasColorspace.height = rect.height;

    //var ratioWidthHeight = canvasColorspace.width/canvasColorspace.height;
    var colorspaceContex = canvasColorspace.getContext("2d");
    colorpickerData = colorspaceContex.getImageData(0, 0, canvasColorspace.width, canvasColorspace.height);


    switch (colorpickerType) {
      case "RG_B":

      var bVal = colorpickerColor.get3Value();

      for(var x=0; x<canvasColorspace.width;x++){

            var rVal = x/canvasColorspace.width;


            for(var y=0; y<canvasColorspace.height;y++){

                  // calc hsv color
                  var gVal = 1-y/canvasColorspace.height;

                  var colorRGB = new classColor_RGB(rVal,gVal,bVal);
                  var index = (x + y * canvasColorspace.width) * 4;

                  colorpickerData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                  colorpickerData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                  colorpickerData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                  colorpickerData.data[index + 3] = 255; //a

            }
      }
      break;
      case "RB_G":

      var gVal = colorpickerColor.get2Value();


      for(var x=0; x<canvasColorspace.width;x++){

            var rVal = x/canvasColorspace.width;


            for(var y=0; y<canvasColorspace.height;y++){

                  // calc hsv color
                  var bVal = 1-y/canvasColorspace.height;

                  var colorRGB = new classColor_RGB(rVal,gVal,bVal);
                  var index = (x + y * canvasColorspace.width) * 4;

                  colorpickerData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                  colorpickerData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                  colorpickerData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                  colorpickerData.data[index + 3] = 255; //a

            }
      }
      break;
      case "GB_R":

      var rVal = colorpickerColor.get1Value();

      for(var x=0; x<canvasColorspace.width;x++){

            var gVal = x/canvasColorspace.width;


            for(var y=0; y<canvasColorspace.height;y++){

                  // calc hsv color
                  var bVal = 1-y/canvasColorspace.height;

                  var colorRGB = new classColor_RGB(rVal,gVal,bVal);
                  var index = (x + y * canvasColorspace.width) * 4;

                  colorpickerData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                  colorpickerData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                  colorpickerData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                  colorpickerData.data[index + 3] = 255; //a

            }
      }
      break;
      case "HS_V":

      var vVal = colorpickerColor.get3Value();

      for(var x=0; x<canvasColorspace.width;x++){

            var hVal = x/canvasColorspace.width;


            for(var y=0; y<canvasColorspace.height;y++){

                  // calc hsv color
                  var sVal = 1-y/canvasColorspace.height;

                  var colorHSV = new classColor_HSV(hVal,sVal,vVal);
                  var colorRGB = colorHSV.calcRGBColor();
                  var index = (x + y * canvasColorspace.width) * 4;

                  colorpickerData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                  colorpickerData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                  colorpickerData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                  colorpickerData.data[index + 3] = 255; //a

            }
      }
      break;
      case "HV_S":

      var sVal = colorpickerColor.get2Value();

      for(var x=0; x<canvasColorspace.width;x++){

            var hVal = x/canvasColorspace.width;

            for(var y=0; y<canvasColorspace.height;y++){

                  // calc hsv color
                  var vVal = 1-y/canvasColorspace.height;

                  var colorHSV = new classColor_HSV(hVal,sVal,vVal);
                  var colorRGB = colorHSV.calcRGBColor();
                  var index = (x + y * canvasColorspace.width) * 4;

                  colorpickerData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                  colorpickerData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                  colorpickerData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                  colorpickerData.data[index + 3] = 255; //a

            }
      }
      break;
      case "SV_H":

      var hVal = colorpickerColor.get1Value();

      for(var x=0; x<canvasColorspace.width;x++){

            var sVal = x/canvasColorspace.width;

            for(var y=0; y<canvasColorspace.height;y++){

                  // calc hsv color
                  var vVal = 1-y/canvasColorspace.height;

                  var colorHSV = new classColor_HSV(hVal,sVal,vVal);
                  var colorRGB = colorHSV.calcRGBColor();
                  var index = (x + y * canvasColorspace.width) * 4;

                  colorpickerData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                  colorpickerData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                  colorpickerData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                  colorpickerData.data[index + 3] = 255; //a

            }
      }
      break;
      default:

    }

    colorspaceContex.putImageData(colorpickerData, 0, 0);






}



function initColorPickerVBarBackground(){

  var canvasVInput = document.getElementById("id_popupWindow_Colorpicker_canvasPicker2");

    var rect = canvasVInput.getBoundingClientRect();

    canvasVInput.width = rect.width;
    canvasVInput.height = rect.height;

    var canvasVInputContex = canvasVInput.getContext("2d");
    var colorRGB1;
    var colorRGB2;

    switch (colorpickerType) {
      case "RG_B":

      var gVal = colorpickerColor.getGValue();
      var rVal = colorpickerColor.getRValue();
      colorRGB1 = new classColor_RGB(rVal,gVal,1);
      colorRGB2 = new classColor_RGB(rVal,gVal,0);

      break;
      case "RB_G":

      var rVal = colorpickerColor.getRValue();
      var bVal = colorpickerColor.getBValue();
      colorRGB1 = new classColor_RGB(rVal,1,bVal);
      colorRGB2 = new classColor_RGB(rVal,0,bVal);

      break;
      case "GB_R":

      var gVal = colorpickerColor.getGValue();
      var bVal = colorpickerColor.getBValue();
      colorRGB1 = new classColor_RGB(1,gVal,bVal);
      colorRGB2 = new classColor_RGB(0,gVal,bVal);

      break;
      case "HS_V":

      var hVal = colorpickerColor.getHValue();
      var sVal = colorpickerColor.getSValue();
      var colorHSV = new classColor_HSV(hVal,sVal,1);
      colorRGB1 = colorHSV.calcRGBColor();
      colorHSV = new classColor_HSV(hVal,sVal,0);
      colorRGB2 = colorHSV.calcRGBColor();

      break;
      case "HV_S":

      var hVal = colorpickerColor.getHValue();
      var vVal = colorpickerColor.getVValue();
      var colorHSV = new classColor_HSV(hVal,1,vVal);
      colorRGB1 = colorHSV.calcRGBColor();
      colorHSV = new classColor_HSV(hVal,0,vVal);
      colorRGB2 = colorHSV.calcRGBColor();

      break;
      case "SV_H":

      var sVal = colorpickerColor.getSValue();
      var vVal = colorpickerColor.getVValue();
      var colorHSV = new classColor_HSV(1,sVal,vVal);
      colorRGB1 = colorHSV.calcRGBColor();
      colorHSV = new classColor_HSV(0,sVal,vVal);
      colorRGB2 = colorHSV.calcRGBColor();
      break;
      default:
      return;
    }


    if(colorpickerType!="SV_H"){
        var grd = canvasVInputContex.createLinearGradient(0, 0, 0, canvasVInput.height);
        grd.addColorStop(0, colorRGB1.getRGBString());
        grd.addColorStop(1, colorRGB2.getRGBString());
        canvasVInputContex.fillStyle = grd;
        canvasVInputContex.fillRect(0,0, canvasVInput.width, canvasVInput.height);

      }
      else{
        var tmpData = canvasVInputContex.getImageData(0, 0, canvasVInput.width, canvasVInput.height);
        for(var y=0; y<canvasVInput.height;y++){

              // calc hsv color
              var hVal = 1-y/canvasVInput.height;
              for(var x=0; x<canvasVInput.width;x++){


                    var sVal = colorpickerColor.getSValue();
                    var vVal = colorpickerColor.getVValue();

                    var cHSV = new classColor_HSV(hVal,sVal,vVal);
                    var cRGB = cHSV.calcRGBColor();
                    var index = (x + y * canvasVInput.width) * 4;

                    tmpData.data[index + 0] = Math.round(cRGB.getRValue()*255); // r
                    tmpData.data[index + 1] = Math.round(cRGB.getGValue()*255); // g
                    tmpData.data[index + 2] = Math.round(cRGB.getBValue()*255); // b
                    tmpData.data[index + 3] = 255; //a

              }
        }
        canvasVInputContex.putImageData(tmpData, 0, 0);

      }


}


function drawColorPickerCircle(){


  var canvasColorspace = document.getElementById("id_popupWindow_Colorpicker_canvasPicker_circle");

  var rect = canvasColorspace.getBoundingClientRect();

  canvasColorspace.width = rect.width;
  canvasColorspace.height = rect.height;

  var colorspaceContex = canvasColorspace.getContext("2d");

  switch (colorpickerType) {
    case "RG_B":

    xPos = colorpickerColor.getRValue() * canvasColorspace.width;
    yPos = (1-colorpickerColor.getGValue()) * canvasColorspace.height;

    break;
    case "RB_G":

    xPos = colorpickerColor.getRValue() * canvasColorspace.width;
    yPos = (1-colorpickerColor.getBValue()) * canvasColorspace.height;

    break;
    case "GB_R":

    xPos = colorpickerColor.getGValue() * canvasColorspace.width;
    yPos = (1-colorpickerColor.getBValue()) * canvasColorspace.height;


    break;
    case "HS_V":

    xPos = colorpickerColor.getHValue() * canvasColorspace.width;
    yPos = (1-colorpickerColor.getSValue()) * canvasColorspace.height;

    break;
    case "HV_S":

    xPos = colorpickerColor.getHValue() * canvasColorspace.width;
    yPos = (1-colorpickerColor.getVValue()) * canvasColorspace.height;

    break;
    case "SV_H":

    xPos = colorpickerColor.getSValue() * canvasColorspace.width;
    yPos = (1-colorpickerColor.getVValue()) * canvasColorspace.height;

    break;
    default:
    return;
  }

    colorspaceContex.beginPath();
    colorspaceContex.arc(xPos, yPos, 5, 0, 2 * Math.PI, false);
    colorspaceContex.fillStyle = colorpickerColor.calcRGBColor().getRGBStringAplha(1.0);
    colorspaceContex.fill();
    colorspaceContex.lineWidth = 2;

    var tmpVal=(colorpickerColor.get1Value()+colorpickerColor.get2Value()+colorpickerColor.get3Value())/3;
    if(tmpVal>0.5)
    colorspaceContex.strokeStyle = 'rgb(0,0,0)';
    else
    colorspaceContex.strokeStyle = 'rgb(255,255,255)';
    colorspaceContex.stroke();

}



function drawColorPickerVBar(){
  var canvasVInput = document.getElementById("id_popupWindow_Colorpicker_canvasPicker2_bar");

    var rect = canvasVInput.getBoundingClientRect();

    canvasVInput.width = rect.width;
    canvasVInput.height = rect.height;

    var canvasVInputContex = canvasVInput.getContext("2d");
    var colorRGB1;
    var colorRGB2;

    var vBarHeight = canvasVInput.width/20;
    var vBarHeightsmall = canvasVInput.width/30;

    switch (colorpickerType) {
      case "RG_B":
      zPos = canvasVInput.height*(1-colorpickerColor.getBValue());
      break;
      case "RB_G":
      zPos = canvasVInput.height*(1-colorpickerColor.getGValue());
      break;
      case "GB_R":
      zPos = canvasVInput.height*(1-colorpickerColor.getRValue());
      break;
      case "HS_V":
      zPos = canvasVInput.height*(1-colorpickerColor.getVValue());
      break;
      case "HV_S":
      zPos = canvasVInput.height*(1-colorpickerColor.getSValue());
      break;
      case "SV_H":
      zPos = canvasVInput.height*(1-colorpickerColor.getHValue());
      break;
      default:
      return;
    }

    canvasVInputContex.fillStyle = "rgba(255,255,255,0.7)";
    canvasVInputContex.fillRect(0,zPos-vBarHeight/2, canvasVInput.width, vBarHeight);
    canvasVInputContex.fillStyle = "rgba(0,0,0,0.7)"; //colorRGB1.getRGBStringAplha(1.0);
    canvasVInputContex.fillRect(0,zPos-vBarHeightsmall/2, canvasVInput.width, vBarHeightsmall);

}


function event_colorpicker_MouseMove(event){



  var rect = document.getElementById(event.target.id).getBoundingClientRect();

  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;

  mousePosX = canvasPosX;
  mousePosY = canvasPosY;

  //console.log(mousePosX,rect.width,mousePosY,rect.height);
}


function event_colorpicker_MouseClick(event){

  var canvasObject = document.getElementById(event.target.id);

  var rect = canvasObject.getBoundingClientRect();

  canvasObject.width = rect.width;
  canvasObject.height = rect.height;

  /*if(colorpickerColor.getVValue()==0)
     colorpickerColor.setVValue(0.00000001);*/


  switch (event.target.id) {
    case "id_popupWindow_Colorpicker_canvasPicker_circle":
      switch (colorpickerType) {
            case "RG_B":

                var rVal = mousePosX/canvasObject.width;
                var gVal = 1-mousePosY/canvasObject.height;

               colorpickerColor = new classColor_RGB( rVal, gVal, colorpickerColor.getBValue());

            break;
            case "RB_G":

                var rVal = mousePosX/canvasObject.width;
                var bVal = 1-mousePosY/canvasObject.height;

               colorpickerColor = new classColor_RGB( rVal, colorpickerColor.getGValue(), bVal);
            break;
            case "GB_R":
                var gVal = mousePosX/canvasObject.width;
                var bVal = 1-mousePosY/canvasObject.height;

               colorpickerColor = new classColor_RGB(  colorpickerColor.getRValue(),gVal, bVal);

            break;
            case "HS_V":

                    var hVal = mousePosX/canvasObject.width;
                    var sVal = 1-mousePosY/canvasObject.height;

                    colorpickerColor = new classColor_HSV(hVal, sVal, colorpickerColor.getVValue());

            break;
            case "HV_S":

                  var hVal = mousePosX/canvasObject.width;
                  var vVal = 1-mousePosY/canvasObject.height;

                 colorpickerColor = new classColor_HSV(hVal, colorpickerColor.getSValue(), vVal);


            break;
            case "SV_H":


                var sVal = mousePosX/canvasObject.width;
                var vVal = 1-mousePosY/canvasObject.height;

               colorpickerColor = new classColor_HSV( colorpickerColor.getHValue(), sVal, vVal);

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

                var bVal = 1-mousePosY/canvasObject.height;
                colorpickerColor = new classColor_RGB(colorpickerColor.get1Value(), colorpickerColor.get2Value(), bVal);

            break;
            case "RB_G":

                var gVal = 1-mousePosY/canvasObject.height;
                colorpickerColor = new classColor_RGB(colorpickerColor.get1Value(), gVal, colorpickerColor.get3Value());



            break;
            case "GB_R":

                var rVal = 1-mousePosY/canvasObject.height;
                colorpickerColor = new classColor_RGB(rVal, colorpickerColor.get2Value(), colorpickerColor.get3Value());


            break;
            case "HS_V":

                    var vVal = 1-mousePosY/canvasObject.height;
                    colorpickerColor = new classColor_HSV(colorpickerColor.get1Value(), colorpickerColor.get2Value(), vVal);

            break;
            case "HV_S":


              var sVal = 1-mousePosY/canvasObject.height;
              colorpickerColor = new classColor_HSV(colorpickerColor.get1Value(), sVal, colorpickerColor.get3Value());

            break;
            case "SV_H":


              var hVal = 1-mousePosY/canvasObject.height;
              colorpickerColor = new classColor_HSV(hVal, colorpickerColor.get2Value(), colorpickerColor.get3Value());


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

    var tmpRGB  = colorpickerColor.calcRGBColor();

    if(document.getElementById("id_popupWindow_Colorpicker_HS_V").checked ||
      document.getElementById("id_popupWindow_Colorpicker_HV_S").checked ||
        document.getElementById("id_popupWindow_Colorpicker_SV_H").checked ){

    document.getElementById("id_popupWindow_Colorpicker_Input1").value = Math.round(colorpickerColor.getHValue()*360);
      document.getElementById("id_popupWindow_Colorpicker_Input2").value = Math.round(colorpickerColor.getSValue()*100);
        document.getElementById("id_popupWindow_Colorpicker_Input3").value = Math.round(colorpickerColor.getVValue()*100);

  }
  else{
    document.getElementById("id_popupWindow_Colorpicker_Input1").value = Math.round(colorpickerColor.getRValue()*255);
      document.getElementById("id_popupWindow_Colorpicker_Input2").value = Math.round(colorpickerColor.getGValue()*255);
        document.getElementById("id_popupWindow_Colorpicker_Input3").value = Math.round(colorpickerColor.getBValue()*255);

  }


  document.getElementById(colorpickerAffectID).style.background = tmpRGB.getRGBString();

}



function affectColorpickerChange(){
  switch (colorpickerAffectID) {

    case "id_EditPage_MappingBackground_Custom":
    mappingBackgroundColor=colorpickerColor;
    changeBackground();
    break;

    case "id_EditPage_ColorAboveFixedAxis_GlobalLocalOrder":
    globalPlotAboveColor=colorpickerColor.calcRGBColor();
    updateAnalyze();
    break;
    case "id_EditPage_CMS_NaN_Color":
    globalCMS1.setNaNColor(colorpickerColor);
    saveCreateProcess();
    break;
    case "id_EditPage_CMS_Below_Color":
    globalCMS1.setBelowColor(colorpickerColor);
    saveCreateProcess();
    break;
    case "id_EditPage_CMS_Above_Color":
      globalCMS1.setAboveColor(colorpickerColor);
      saveCreateProcess();
      break;
      case "id_editPage_customConstColor":
        customConstBandColor=colorpickerColor;
        drawConstCustomBand();
        break;
        case "id_editPage_customScaleColor1":
          customScaleBandColor1=colorpickerColor;
          drawScaleCustomBand();
          break;
          case "id_editPage_customScaleColor2":
            customScaleBandColor2=colorpickerColor;
            drawScaleCustomBand();
            break;
            case "id_EditPage_DrawnDualKey":
                globalCMS1.setRightKeyColor(document.getElementById("id_EditPage_EditKey_List").selectedIndex,colorpickerColor);
                globalCMS1.setLeftKeyColor(document.getElementById("id_EditPage_EditKey_List").selectedIndex,colorpickerColor);
                updateEditPage();
                saveCreateProcess();
              break;
              case "id_EditPage_DrawnLeftKey":
              globalCMS1.setLeftKeyColor(document.getElementById("id_EditPage_EditKey_List").selectedIndex,colorpickerColor);
              drawSelectedKey();
              updateEditPage();
              saveCreateProcess();
              break;

              case "id_EditPage_DrawnRightKey":
              globalCMS1.setRightKeyColor(document.getElementById("id_EditPage_EditKey_List").selectedIndex,colorpickerColor);

              drawSelectedKey();
              updateEditPage();
              saveCreateProcess();
              break;

              case "id_inputProbeColor":
                globalProbeColor=colorpickerColor.calcHSVColor();
                changeProbeColor();
                generateProbeSet();
              break;

              case "id_inputEditProbeColor":
                globalProbeColor=colorpickerColor.calcHSVColor();
                changeProbeColor();
              break;


    default:
    return;

  }

}


function changeColorPickerInput(){


  if(document.getElementById("id_popupWindow_Colorpicker_HS_V").checked ||
    document.getElementById("id_popupWindow_Colorpicker_HV_S").checked ||
      document.getElementById("id_popupWindow_Colorpicker_SV_H").checked ){


        var hVal = parseFloat(document.getElementById("id_popupWindow_Colorpicker_Input1").value)/360;
        var sVal = parseFloat(document.getElementById("id_popupWindow_Colorpicker_Input2").value)/100;
        var vVal = parseFloat(document.getElementById("id_popupWindow_Colorpicker_Input3").value)/100;


        if(hVal>1.0){
          hVal = 1.0;
          document.getElementById("id_popupWindow_Colorpicker_Input1").value=360;
        }

        if(hVal<0){
          hVal = 0;
          document.getElementById("id_popupWindow_Colorpicker_Input1").value=0;
        }


        if(sVal>1.0){
          sVal = 1.0;
          document.getElementById("id_popupWindow_Colorpicker_Input2").value=100;
        }

        if(sVal<0){
          sVal = 0;
          document.getElementById("id_popupWindow_Colorpicker_Input2").value=0;
        }


        if(vVal>1.0){
          vVal = 1.0;
          document.getElementById("id_popupWindow_Colorpicker_Input3").value=100;
        }

        if(vVal<0){
          vVal = 0;
          document.getElementById("id_popupWindow_Colorpicker_Input3").value=0;
        }


        colorpickerColor = new classColor_HSV(hVal,sVal,vVal);

}
else{
  var rVal = parseFloat(document.getElementById("id_popupWindow_Colorpicker_Input1").value)/255;
  var gVal = parseFloat(document.getElementById("id_popupWindow_Colorpicker_Input2").value)/255;
  var bVal = parseFloat(document.getElementById("id_popupWindow_Colorpicker_Input3").value)/255;


  if(rVal>1.0){
    rVal = 1.0;
    document.getElementById("id_popupWindow_Colorpicker_Input1").value=255;
  }

  if(rVal<0){
    rVal = 0;
    document.getElementById("id_popupWindow_Colorpicker_Input1").value=0;
  }


  if(gVal>1.0){
    gVal = 1.0;
    document.getElementById("id_popupWindow_Colorpicker_Input2").value=255;
  }

  if(gVal<0){
    gVal = 0;
    document.getElementById("id_popupWindow_Colorpicker_Input2").value=0;
  }


  if(bVal>1.0){
    bVal = 1.0;
    document.getElementById("id_popupWindow_Colorpicker_Input3").value=255;
  }

  if(bVal<0){
    bVal = 0;
    document.getElementById("id_popupWindow_Colorpicker_Input3").value=0;
  }


  colorpickerColor = new classColor_RGB(rVal,gVal,bVal);

}



  initColorpickerBackground();
  drawColorPickerVBar();
  drawColorPickerCircle();

  affectColorpickerChange();
}
