function initColorpickerBackground(id, type){

    var canvasColorspace = document.getElementById(id);

    canvasColorspace.width = hs_resolution_X;
    canvasColorspace.height = hs_resolution_Y;
    var canvasColorspaceWidth = canvasColorspace.width;
    var canvasColorspaceHeight = canvasColorspace.height;
    //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
    var colorspaceContex = canvasColorspace.getContext("2d");
    colorpickerData = colorspaceContex.getImageData(0, 0, canvasColorspaceWidth, canvasColorspaceHeight);

    switch (type) {
      case "RG_B":

      var bVal = 0;
      switch (selectedColor) {
        case 0:
          bVal = editColor1.get3Value();
        break;
        case 1:
          bVal = editColor2.get3Value();
        break;
        default:

      }

      for(var x=0; x<canvasColorspaceWidth;x++){

            var rVal = x/canvasColorspaceWidth;


            for(var y=0; y<canvasColorspaceHeight;y++){

                  // calc hsv color
                  var gVal = 1-y/canvasColorspaceHeight;

                  var colorRGB = new classColor_RGB(rVal,gVal,bVal);
                  var index = (x + y * canvasColorspaceWidth) * 4;

                  colorpickerData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                  colorpickerData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                  colorpickerData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                  colorpickerData.data[index + 3] = 255; //a

            }
      }
      break;
      case "RB_G":

      var gVal = 0;
      switch (selectedColor) {
        case 0:
          gVal = editColor1.get2Value();
        break;
        case 1:
          gVal = editColor2.get2Value();
        break;
        default:

      }

      for(var x=0; x<canvasColorspaceWidth;x++){

            var rVal = x/canvasColorspaceWidth;


            for(var y=0; y<canvasColorspaceHeight;y++){

                  // calc hsv color
                  var bVal = 1-y/canvasColorspaceHeight;

                  var colorRGB = new classColor_RGB(rVal,gVal,bVal);
                  var index = (x + y * canvasColorspaceWidth) * 4;

                  colorpickerData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                  colorpickerData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                  colorpickerData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                  colorpickerData.data[index + 3] = 255; //a

            }
      }
      break;
      case "GB_R":

      var rVal = 0;
      switch (selectedColor) {
        case 0:
          rVal = editColor1.get1Value();
        break;
        case 1:
          rVal = editColor2.get1Value();
        break;
        default:

      }

      for(var x=0; x<canvasColorspaceWidth;x++){

            var gVal = x/canvasColorspaceWidth;


            for(var y=0; y<canvasColorspaceHeight;y++){

                  // calc hsv color
                  var bVal = 1-y/canvasColorspaceHeight;

                  var colorRGB = new classColor_RGB(rVal,gVal,bVal);
                  var index = (x + y * canvasColorspaceWidth) * 4;

                  colorpickerData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                  colorpickerData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                  colorpickerData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                  colorpickerData.data[index + 3] = 255; //a

            }
      }
      break;
      case "HS_V":

      var vVal = 1;
      switch (selectedColor) {
        case 0:
          var tmpHSV = editColor1.calcHSVColor();
          vVal = tmpHSV.get3Value();
        break;
        case 1:
          var tmpHSV = editColor2.calcHSVColor();
          vVal = tmpHSV.get3Value();
        break;
        default:

      }

      for(var x=0; x<canvasColorspaceWidth;x++){

            var hVal = x/canvasColorspaceWidth;


            for(var y=0; y<canvasColorspaceHeight;y++){

                  // calc hsv color
                  var sVal = 1-y/canvasColorspaceHeight;

                  var colorHSV = new classColor_HSV(hVal,sVal,vVal);
                  var colorRGB = colorHSV.calcRGBColor();
                  var index = (x + y * canvasColorspaceWidth) * 4;

                  colorpickerData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                  colorpickerData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                  colorpickerData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                  colorpickerData.data[index + 3] = 255; //a

            }
      }
      break;
      case "HV_S":
      var sVal = 1;
      switch (selectedColor) {
        case 0:
          var tmpHSV = editColor1.calcHSVColor();
          sVal = tmpHSV.get2Value();
        break;
        case 1:
          var tmpHSV = editColor2.calcHSVColor();
          sVal = tmpHSV.get2Value();
        break;
        default:

      }
      for(var x=0; x<canvasColorspaceWidth;x++){

            var hVal = x/canvasColorspaceWidth;

            for(var y=0; y<canvasColorspaceHeight;y++){

                  // calc hsv color
                  var vVal = 1-y/canvasColorspaceHeight;

                  var colorHSV = new classColor_HSV(hVal,sVal,vVal);
                  var colorRGB = colorHSV.calcRGBColor();
                  var index = (x + y * canvasColorspaceWidth) * 4;

                  colorpickerData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                  colorpickerData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                  colorpickerData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                  colorpickerData.data[index + 3] = 255; //a

            }
      }
      break;
      case "SV_H":

      var hVal = 1;
      switch (selectedColor) {
        case 0:
          var tmpHSV = editColor1.calcHSVColor();
          hVal = tmpHSV.get1Value();
        break;
        case 1:
          var tmpHSV = editColor2.calcHSVColor();
          hVal = tmpHSV.get1Value();
        break;
        default:

      }

      for(var x=0; x<canvasColorspaceWidth;x++){

            var sVal = x/canvasColorspaceWidth;

            for(var y=0; y<canvasColorspaceHeight;y++){

                  // calc hsv color
                  var vVal = 1-y/canvasColorspaceHeight;

                  var colorHSV = new classColor_HSV(hVal,sVal,vVal);
                  var colorRGB = colorHSV.calcRGBColor();
                  var index = (x + y * canvasColorspaceWidth) * 4;

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


function drawEditPageColorCircles(id12, id3, type){

    var canvasColorspace = document.getElementById(id12);

    var canvasColorspaceWidth = canvasColorspace.width;
    var canvasColorspaceHeight = canvasColorspace.height;
    //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
    var colorspaceContex = canvasColorspace.getContext("2d");
    colorspaceContex.putImageData(colorpickerData, 0, 0);

    var canvasVInput = document.getElementById(id3);
    canvasVInput.width = v_resolution_X;
    canvasVInput.height = v_resolution_Y;
    var canvasVInputContex = canvasVInput.getContext("2d");

      var tmpHSV, tmpRGB,xPos,yPos,zPos;
      var colorRGB1;
      var colorRGB2;

      switch (selectedColor) {
        case 0:
          tmpRGB=editColor1;
          tmpHSV = editColor1.calcHSVColor();
        break;
        case 1:
          tmpRGB=editColor2;
          tmpHSV = editColor2.calcHSVColor();
        break;
        default:
        return;

      }

      switch (type) {
        case "RG_B":

        xPos = tmpRGB.getRValue() * canvasColorspaceWidth;
        yPos = (1-tmpRGB.getGValue()) * canvasColorspaceHeight;

        var gVal = tmpRGB.getGValue();
        var rVal = tmpRGB.getRValue();
        colorRGB1 = new classColor_RGB(rVal,gVal,1);
        colorRGB2 = new classColor_RGB(rVal,gVal,0);
        zPos = v_resolution_Y*(1-tmpRGB.getBValue());

        break;
        case "RB_G":

        xPos = tmpRGB.getRValue() * canvasColorspaceWidth;
        yPos = (1-tmpRGB.getBValue()) * canvasColorspaceHeight;

        var rVal = tmpRGB.getRValue();
        var bVal = tmpRGB.getBValue();
        colorRGB1 = new classColor_RGB(rVal,1,bVal);
        colorRGB2 = new classColor_RGB(rVal,0,bVal);
        zPos = v_resolution_Y*(1-tmpRGB.getGValue());

        break;
        case "GB_R":

        xPos = tmpRGB.getGValue() * canvasColorspaceWidth;
        yPos = (1-tmpRGB.getBValue()) * canvasColorspaceHeight;

        var gVal = tmpRGB.getGValue();
        var bVal = tmpRGB.getBValue();
        colorRGB1 = new classColor_RGB(1,gVal,bVal);
        colorRGB2 = new classColor_RGB(0,gVal,bVal);
        zPos = v_resolution_Y*(1-tmpRGB.getRValue());

        break;
        case "HS_V":

        xPos = tmpHSV.getHValue() * canvasColorspaceWidth;
        yPos = (1-tmpHSV.getSValue()) * canvasColorspaceHeight;

        var hVal = tmpHSV.getHValue();
        var sVal = tmpHSV.getSValue();
        var colorHSV = new classColor_HSV(hVal,sVal,1);
        colorRGB1 = colorHSV.calcRGBColor();
        colorHSV = new classColor_HSV(hVal,sVal,0);
        colorRGB2 = colorHSV.calcRGBColor();
        zPos = v_resolution_Y*(1-tmpHSV.getVValue());

        break;
        case "HV_S":

        xPos = tmpHSV.getHValue() * canvasColorspaceWidth;
        yPos = (1-tmpHSV.getVValue()) * canvasColorspaceHeight;

        var hVal = tmpHSV.getHValue();
        var vVal = tmpHSV.getVValue();
        var colorHSV = new classColor_HSV(hVal,1,vVal);
        colorRGB1 = colorHSV.calcRGBColor();
        colorHSV = new classColor_HSV(hVal,0,vVal);
        colorRGB2 = colorHSV.calcRGBColor();
        zPos = v_resolution_Y*(1-tmpHSV.getSValue());

        break;
        case "SV_H":

        xPos = tmpHSV.getSValue() * canvasColorspaceWidth;
        yPos = (1-tmpHSV.getVValue()) * canvasColorspaceHeight;

        var sVal = tmpHSV.getSValue();
        var vVal = tmpHSV.getVValue();
        var colorHSV = new classColor_HSV(1,sVal,vVal);
        colorRGB1 = colorHSV.calcRGBColor();
        colorHSV = new classColor_HSV(0,sVal,vVal);
        colorRGB2 = colorHSV.calcRGBColor();
        zPos = v_resolution_Y*(1-tmpHSV.getHValue());
        break;
        default:
        return;
      }



        colorspaceContex.beginPath();
        colorspaceContex.arc(xPos, yPos, circleRadColorPicker, 0, 2 * Math.PI, false);
        colorspaceContex.fillStyle = tmpRGB.getRGBStringAplha(1.0);
        colorspaceContex.fill();
        colorspaceContex.lineWidth = circleStrokeWidth;




      var tmpVal=(tmpRGB.get1Value()+tmpRGB.get2Value()+tmpRGB.get3Value())/3;
      if(tmpVal>0.5)
      colorspaceContex.strokeStyle = 'rgb(0,0,0)';
      else
      colorspaceContex.strokeStyle = 'rgb(255,255,255)';
      colorspaceContex.stroke();

      //drawVChangeRects

      //gradient
              if(type!="SV_H"){
              var grd = canvasVInputContex.createLinearGradient(0, 0, 0, v_resolution_Y);
                  grd.addColorStop(0, colorRGB1.getRGBString());
                  grd.addColorStop(1, colorRGB2.getRGBString());
                  canvasVInputContex.fillStyle = grd;
                  canvasVInputContex.fillRect(0,0, v_resolution_X, v_resolution_Y);

                }
                else{
                  var tmpData = canvasVInputContex.getImageData(0, 0, v_resolution_X, v_resolution_Y);
                  for(var y=0; y<v_resolution_Y;y++){

                        // calc hsv color
                        var hVal = 1-y/v_resolution_Y;
                        for(var x=0; x<v_resolution_X;x++){


                              var sVal = tmpHSV.getSValue();
                              var vVal = tmpHSV.getVValue();

                              var cHSV = new classColor_HSV(hVal,sVal,vVal);
                              var cRGB = cHSV.calcRGBColor();
                              var index = (x + y * v_resolution_X) * 4;

                              tmpData.data[index + 0] = Math.round(cRGB.getRValue()*255); // r
                              tmpData.data[index + 1] = Math.round(cRGB.getGValue()*255); // g
                              tmpData.data[index + 2] = Math.round(cRGB.getBValue()*255); // b
                              tmpData.data[index + 3] = 255; //a

                        }
                  }
                  canvasVInputContex.putImageData(tmpData, 0, 0);
                  console.log(123123123);
                }

              // Button


              canvasVInputContex.fillStyle = "rgba(255,255,255,0.7)";
              canvasVInputContex.fillRect(0,zPos-vBarWidth, v_resolution_X, vBarWidth*2);
              canvasVInputContex.fillStyle = "rgba(0,0,0,0.7)"; //colorRGB1.getRGBStringAplha(1.0);
              canvasVInputContex.fillRect(0,zPos-vBarWidth/2, v_resolution_X, vBarWidth);





}


function event_colorpicker_MouseMove(event){

  var rect = document.getElementById(event.target.id).getBoundingClientRect();

  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;

  var ratioToColorspaceResolutionX;
  var ratioToColorspaceResolutionY;

    switch (event.target.id) {
      case "editPage_canvasPicker":
        ratioToColorspaceResolutionX = hs_resolution_X/rect.width;
        ratioToColorspaceResolutionY = hs_resolution_Y/rect.height;
      break;
      case "editPage_canvasPicker2":
        ratioToColorspaceResolutionX = v_resolution_X/rect.width;
        ratioToColorspaceResolutionY = v_resolution_Y/rect.height;
      break;
      default:
      return;

    }

    mousePosX = canvasPosX*ratioToColorspaceResolutionX;
    mousePosY = canvasPosY*ratioToColorspaceResolutionY;
}

function event_colorpicker_MouseClick(event){

    var tmpRGB, tmpHSV;
    switch (selectedColor) {
    case 0:
      tmpRGB=editColor1;
      tmpHSV=editColor1.calcHSVColor();
    break;
    case 1:
      tmpRGB=editColor2;
      tmpHSV=editColor2.calcHSVColor();
    break;
    default:
    return;

  }

  if(tmpHSV.getVValue()==0)
     tmpHSV.setVValue(0.00001);

            switch (colorpickerType) {
              case "RG_B":
              switch (event.target.id) {
                case "editPage_canvasPicker":
                  var rVal = mousePosX/hs_resolution_X;
                  var gVal = 1-mousePosY/hs_resolution_Y;

                 tmpRGB = new classColor_RGB( rVal, gVal, tmpRGB.getBValue());
                break;
                case "editPage_canvasPicker2":
                  var bVal = 1-mousePosY/v_resolution_Y;
                  tmpRGB = new classColor_RGB(tmpRGB.get1Value(), tmpRGB.get2Value(), bVal);
                break;
                default:
                return;

              }


              break;
              case "RB_G":
              switch (event.target.id) {
                case "editPage_canvasPicker":
                  var rVal = mousePosX/hs_resolution_X;
                  var bVal = 1-mousePosY/hs_resolution_Y;

                 tmpRGB = new classColor_RGB( rVal, tmpRGB.getGValue(), bVal);
                break;
                case "editPage_canvasPicker2":
                  var gVal = 1-mousePosY/v_resolution_Y;
                  tmpRGB = new classColor_RGB(tmpRGB.get1Value(), gVal, tmpRGB.get3Value());
                break;
                default:
                return;

              }


              break;
              case "GB_R":
              switch (event.target.id) {
                case "editPage_canvasPicker":
                  var gVal = mousePosX/hs_resolution_X;
                  var bVal = 1-mousePosY/hs_resolution_Y;

                 tmpRGB = new classColor_RGB(  tmpRGB.getRValue(),gVal, bVal);
                break;
                case "editPage_canvasPicker2":
                  var rVal = 1-mousePosY/v_resolution_Y;
                  tmpRGB = new classColor_RGB(rVal, tmpRGB.get2Value(), tmpRGB.get3Value());
                break;
                default:
                return;

              }


              break;
              case "HS_V":
              switch (event.target.id) {
                case "editPage_canvasPicker":
                      var hVal = mousePosX/hs_resolution_X;
                      var sVal = 1-mousePosY/hs_resolution_Y;

                     tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
                     tmpRGB = tmpHSV.calcRGBColor();
                break;
                case "editPage_canvasPicker2":
                      var vVal = 1-mousePosY/v_resolution_Y;
                      tmpHSV = new classColor_HSV(tmpHSV.get1Value(), tmpHSV.get2Value(), vVal);
                      tmpRGB = tmpHSV.calcRGBColor();
                break;
                default:
                return;

              }


              break;
              case "HV_S":

              switch (event.target.id) {
                case "editPage_canvasPicker":
                    var hVal = mousePosX/hs_resolution_X;
                    var vVal = 1-mousePosY/hs_resolution_Y;

                   tmpHSV = new classColor_HSV(hVal, tmpHSV.getSValue(), vVal);
                   tmpRGB = tmpHSV.calcRGBColor();
                break;
                case "editPage_canvasPicker2":
                var sVal = 1-mousePosY/v_resolution_Y;
                tmpHSV = new classColor_HSV(tmpHSV.get1Value(), sVal, tmpHSV.get3Value());
                tmpRGB = tmpHSV.calcRGBColor();
                break;
                default:
                return;

              }

              break;
              case "SV_H":

              switch (event.target.id) {
                case "editPage_canvasPicker":
                  var sVal = mousePosX/hs_resolution_X;
                  var vVal = 1-mousePosY/hs_resolution_Y;

                 tmpHSV = new classColor_HSV( tmpHSV.getHValue(), sVal, vVal);
                 tmpRGB = tmpHSV.calcRGBColor();
                break;
                case "editPage_canvasPicker2":
                var hVal = 1-mousePosY/v_resolution_Y;
                tmpHSV = new classColor_HSV(hVal, tmpHSV.get2Value(), tmpHSV.get3Value());
                tmpRGB = tmpHSV.calcRGBColor();
                break;
                default:
                return;

              }

              break;
              default:
              return;
            }


    if(keyType[selectedKey]==="dual key"){
      editColor1=tmpRGB;
      editColor2= new classColor_RGB(tmpRGB.get1Value(), tmpRGB.get2Value(), tmpRGB.get3Value());
      fillColorInputFields(true);
      fillColorInputFields(false);
    }
    else{
      switch (selectedColor) {
      case 0:
        editColor1=tmpRGB;
        fillColorInputFields(true);
      break;
      case 1:
        editColor2=tmpRGB;
        fillColorInputFields(false);
      break;
      default:
      return;

    }
    }


  if(event.target.id==="editPage_canvasPicker2"){
      initColorpickerBackground("editPage_canvasPicker", colorpickerType);
  }

  drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
  drawCurrentColor();

}
