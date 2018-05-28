/////////////////////////////////////
// -------------Event COLORSPACE HUE---------------//
/////////////////////////////////////

function mouseLeaveColorspace(event) {
  clearInterval(timer2DAnimation);
  document.getElementById(event.target.id).style.cursor = "default";

  document.getElementById("id_huePositionLabel").innerHTML = "";

  mouseAboveKeyID = -1;
  mouseGrappedColorSide = -1;
  if (mouseGrappedKeyID != -1) {
    mouseGrappedKeyID = -1;
      drawcolormap_hueSpace(true,true,false);
  }
}


function hsvLabDinAnimation(){
  orderColorSketch(colorspaceModus);
  drawcolormap_hueSpace(false,true,false);
}

function mouseMoveColorspace(event) {
  // calc mouse pos
  var rect = document.getElementById(event.target.id).getBoundingClientRect();
  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  var ratioToColorspaceResolutionX = hue_resolution_X / rect.width;
  var ratioToColorspaceResolutionY = hue_resolution_Y / rect.height;
  mousePosX = canvasPosX * ratioToColorspaceResolutionX;
  mousePosY = canvasPosY * ratioToColorspaceResolutionY;
  var xWidth = hue_resolution_X * labSpaceRectRange;
  var yHeight = hue_resolution_Y * labSpaceRectRange;
  var colorspaceCenterX = Math.round(hue_resolution_X/2);
  var colorspaceCenterY = Math.round(hue_resolution_Y/2);
  var colorspaceRadius = Math.round((hue_resolution_X/2)*radiusratio);



  if(mouseGrappedKeyID==-1){

    // check if mouse is above a element
    for (var i = 0; i < spaceElementsType.length; i++) {
      if (mouseAboveKeyID == spaceElementsKey[i]) {

        if (spaceElementsType[i] == true) {
          // Circle -> Part of Scaled Band
          var dis = Math.sqrt(Math.pow(spaceElementsXPos[i] - mousePosX, 2) + Math.pow(spaceElementsYPos[i] - mousePosY, 2));

          if (dis > bigcircleRad) {
            mouseAboveKeyID = -1;
            mouseGrappedColorSide = -1;
            drawcolormap_hueSpace(false,false,false);

            document.getElementById(event.target.id).style.cursor = "default";
            break;
          } else {
            break;
          }
        } else {
          if (spaceElementsXPos[i] != -1) {
            // QUAD -> Constant Band

            //var dis = Math.sqrt(Math.pow(spaceElementsXPos[i]-mousePosX,2)+Math.pow(spaceElementsYPos[i]-mousePosY,2));

            if (mousePosX < spaceElementsXPos[i] - bigcircleRad ||
              mousePosX > spaceElementsXPos[i] + bigcircleRad ||
              mousePosY < spaceElementsYPos[i] - bigcircleRad ||
              mousePosY > spaceElementsYPos[i] + bigcircleRad) {
              mouseAboveKeyID = -1;
              mouseGrappedColorSide = -1;
                drawcolormap_hueSpace(false,false,false);

              document.getElementById(event.target.id).style.cursor = "default";
              break;
            } else {
              break;
            }

          }
        }
      }

      if (spaceElementsType[i] == true) {
        // Circle -> Part of Scaled Band
        var dis = Math.sqrt(Math.pow(spaceElementsXPos[i] - mousePosX, 2) + Math.pow(spaceElementsYPos[i] - mousePosY, 2));

        if (dis <= circleRad) {
          mouseAboveKeyID = spaceElementsKey[i];
          mouseGrappedColorSide = spaceElementsColor[i];
          document.getElementById(event.target.id).style.cursor = "pointer";
          drawcolormap_hueSpace(false,false,false);
          break;
        }


      } else {
        if (spaceElementsXPos[i] != -1) {
          // QUAD -> Constant Band

          var dis = Math.sqrt(Math.pow(spaceElementsXPos[i] - mousePosX, 2) + Math.pow(spaceElementsYPos[i] - mousePosY, 2));

          if (mousePosX >= spaceElementsXPos[i] - circleRad &&
            mousePosX <= spaceElementsXPos[i] + circleRad &&
            mousePosY >= spaceElementsYPos[i] - circleRad &&
            mousePosY <= spaceElementsYPos[i] + circleRad) {
            mouseAboveKeyID = spaceElementsKey[i];
            mouseGrappedColorSide = spaceElementsColor[i];
            document.getElementById(event.target.id).style.cursor = "pointer";

            drawcolormap_hueSpace(false,false,false);
            break;
          }

        }
      }
    }

  }//if grapped key == -1
  else{
    // check if mouse is inside of Colorspace
    var tmpColor;
    var errorRGBColor = new classColor_RGB(-1, -1, -1);
    document.getElementById("id_huePositionLabel").innerHTML = "";
    switch(analyzeColorspaceModus) {
      case "hsv":
        var dis = Math.sqrt(Math.pow(colorspaceCenterX - mousePosX, 2) + Math.pow(colorspaceCenterY - mousePosY, 2));
        if (dis <= colorspaceRadius) {
          //document.getElementById(event.target.id).style.cursor = "pointer"; // crosshair
          var ty = (mousePosY) - (colorspaceCenterY);
          var tx = mousePosX - colorspaceCenterX;
          var angle = (Math.atan2(ty, tx) + Math.PI) / (Math.PI * 2); // values 0-1 ...
          var hVal = angle;
          var sVal = dis / colorspaceRadius;
          tmpColor = new classColor_HSV(hVal, sVal, updateCurrentValue);

          document.getElementById("id_huePositionLabel").innerHTML = "H : " + hVal.toFixed(numDecimalPlaces) + ", S : " + sVal.toFixed(numDecimalPlaces);
        } else {
          return;
        }
        break
      case "lab":
        var aVal = ((mousePosX - colorspaceCenterX) / (xWidth / 2)) * labSpaceRange;
        var bVal = ((mousePosY - colorspaceCenterY) / (yHeight / 2)) * labSpaceRange;

        if (aVal >= labSpaceRange * -1 && aVal <= labSpaceRange && bVal >= labSpaceRange * -1 && bVal <= labSpaceRange) {

          tmpColor = new classColor_LAB(updateCurrentValue, aVal, bVal);
          document.getElementById("id_huePositionLabel").innerHTML = "A : " + aVal.toFixed(numDecimalPlaces) + ", B : " + bVal.toFixed(numDecimalPlaces);

          if (document.getElementById("id_checkboxRGB").checked == true) {
            var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

            if (testColor.getRValue() == -1) {
              return;
            }
          }

        } else {
          return;
        }
        break;
      case "din99":
        var xStart = hue_resolution_X * 0.1;
        var yStart = hue_resolution_Y * 0.1;
        var xEnd = hue_resolution_X * 0.9;
        var yEnd = hue_resolution_Y * 0.9;
        var a99Val = ((mousePosX - xStart) / (xEnd - xStart)) * rangeA99 + rangeA99Neg;
        var b99Val = ((mousePosY - yStart) / (yEnd - yStart)) * rangeB99 + rangeB99Neg;

        //if (a99Val>=din99SpaceRange*-1 && a99Val<=din99SpaceRange && b99Val>=din99SpaceRange*-1 && b99Val<=din99SpaceRange){
        if (a99Val >= rangeA99Neg && a99Val <= rangeA99Pos && b99Val >= rangeB99Neg && b99Val <= rangeB99Pos) {
          tmpColor = new classColorDIN99(updateCurrentValue, a99Val, b99Val);
          document.getElementById("id_huePositionLabel").innerHTML = "A99 : " + a99Val.toFixed(numDecimalPlaces) + ", B99 : " + b99Val.toFixed(numDecimalPlaces);

          var colorRGB = tmpColor.calcRGBColor();
          if(colorRGB.getRValue()==0 && colorRGB.getGValue()==0 && colorRGB.getBValue()==0){
            if(tmpColor.getL99Value()!=0 || tmpColor.getA99Value() !=0 || tmpColor.getB99Value()!=0){
              return;
            }
          }

          if (document.getElementById("id_checkboxRGB").checked == true) {
            var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

            if (testColor.getRValue() == -1) {
              return;
            }
          }
        } else {
          return;
        }
        break;
      default:
        console.log("Error at the getC1CurrentValue function");
        return;
    }

    switch (mouseGrappedColorSide) {
      case 0:
      // left color
        globalCMS1.setLeftKeyColor(mouseGrappedKeyID, tmpColor);
        break;
      case 1:
        // right color
        globalCMS1.setRightKeyColor(mouseGrappedKeyID, tmpColor);
        break;
      case 2:
        // both colors
        globalCMS1.setLeftKeyColor(mouseGrappedKeyID, tmpColor);
        globalCMS1.setRightKeyColor(mouseGrappedKeyID, tmpColor);
        break;
      default:
      console.log("Error "+ mouseGrappedColorSide);
    }

    somethingChanged = true;

  }



}

function mouseDownColorspace() {

  if (mouseAboveKeyID != -1) {
    mouseGrappedKeyID = mouseAboveKeyID;
    hueInit();
    timer2DAnimation = setInterval(hsvLabDinAnimation, animationInterval);

    var tmpColor;
    switch (mouseGrappedColorSide) {
      case 0:
      // left color
        tmpColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, analyzeColorspaceModus);
        break;
      case 1:
        // right color
        tmpColor = globalCMS1.getRightKeyColor(mouseGrappedKeyID, analyzeColorspaceModus);
        break;
      default:
        // one of both colors
        tmpColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, analyzeColorspaceModus);
    }

    if(analyzeColorspaceModus=="hsv")
      updateCurrentValue=tmpColor.get3Value();
    else
      updateCurrentValue=tmpColor.get1Value();

  }

}

function mouseUpColorspace() {

  mouseGrappedKeyID=-1;
  mouseGrappedColorSide=-1;

  clearInterval(timer2DAnimation);

  drawcolormap_hueSpace(true,true,false);

}


/////////////////////////////////////
// -------------Event COLORSPACE VALUE---------------//
/////////////////////////////////////

function mouseLeaveValuePlot(event) {
  clearInterval(timer2DAnimation);
  document.getElementById(event.target.id).style.cursor = "default";

  mouseAboveKeyID = -1;
  mouseGrappedColorSide = -1;
  if (mouseGrappedKeyID != -1) {
    mouseGrappedKeyID = -1;
      drawcolormap_hueSpace(true,true,false);
  }
}
////////////////////////////////////////////////////////////////////////////////
function checkInsideRect(centerPosX, centerPosY, i, colorside) {
  if (mouseAboveKeyID == i) {

    if (mousePosX < centerPosX - bigcircleRad ||
      mousePosX > centerPosX + bigcircleRad ||
      mousePosY < centerPosY - bigcircleRad ||
      mousePosY > centerPosY + bigcircleRad) {
      mouseAboveKeyID = -1;
      mouseGrappedColorSide=-1;
        drawcolormap_hueSpace(false,false,false);

      return false;
    } else {
      return true;
    }

  } else {
    if (mousePosX >= centerPosX - circleRad &&
      mousePosX <= centerPosX + circleRad &&
      mousePosY >= centerPosY - circleRad &&
      mousePosY <= centerPosY + circleRad) {
      mouseAboveKeyID = i;
      mouseGrappedColorSide=colorside;
        drawcolormap_hueSpace(false,false,false);

      return true;
    } else {
      mouseAboveKeyID = -1;
      mouseGrappedColorSide=-1;
      return false;
    }

  }
}

function checkInsideCirce(centerPosX, centerPosY, i, colorside) {

  if (mouseAboveKeyID == i) {
    // Circle -> Part of Scaled Band
    var dis = Math.sqrt(Math.pow(centerPosX - mousePosX, 2) + Math.pow(centerPosY - mousePosY, 2));
    if (dis > bigcircleRad) {
      mouseAboveKeyID = -1;

        drawcolormap_hueSpace(false,false,false);

      return false;
    } else {
      return true;
    }
  } else {
    var dis = Math.sqrt(Math.pow(centerPosX - mousePosX, 2) + Math.pow(centerPosY - mousePosY, 2));
  //  console.log(dis +" <= "+ circleRad);
    if (dis <= circleRad) {
      mouseAboveKeyID = i;
      mouseGrappedColorSide=colorside;
        drawcolormap_hueSpace(false,false,false);

      return true;
    } else {
      return false;
    }
  }

}

function calcVYPos(tmpColor,plotYStart,heigthVArea, type){

  var tmpY;

  switch (type) {
    case 1:
    switch(analyzeColorspaceModus) {
      case "hsv":
        tmpY = Math.round(plotYStart - (heigthVArea * tmpColor.getVValue()));
        break
      case "lab":
        tmpY = Math.round(plotYStart - (heigthVArea * tmpColor.getLValue() / 100));
        break;
      case "din99":
        tmpY = Math.round(plotYStart - (heigthVArea * tmpColor.getL99Value() / 100));
        break;
      default:
        console.log("Error at the getC1CurrentValue function");
        return;
    }
      break;
      case 2:
      switch (analyzeColorspaceModus) {
        case "hsv":
          tmpY = Math.round(plotYStart - (heigthVArea * tmpColor.getHValue()));
          break;
        case "lab":
          tmpY = Math.round(plotYStart - (heigthVArea * (tmpColor.getAValue()+labSpaceRange) / (labSpaceRange*2)));
          break;
        case "din99":
          tmpY = Math.round(plotYStart - (heigthVArea * (tmpColor.getA99Value()+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
          break;
        default:
          console.log("Error at the changeColorspace function");
          return;
      }
        break;
        case 3:
        switch (analyzeColorspaceModus) {
          case "hsv":
            tmpY = Math.round(plotYStart - (heigthVArea * tmpColor.getSValue()));
            break;
          case "lab":
            tmpY = Math.round(plotYStart - (heigthVArea * (tmpColor.getBValue()+labSpaceRange) / (labSpaceRange*2)));
            break;
          case "din99":
            tmpY = Math.round(plotYStart - (heigthVArea * (tmpColor.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
            break;
          default:
            console.log("Error at the changeColorspace function");
            return;
        }

          break;
    default:
  }


  return tmpY;
}

function mouseMoveValuePlot(event) {

  var type;

  switch (event.target.id) {
    case "id_ModifyValue3Top":
      type=1;
      break;
      case "id_ModifyValue1Top":
        type=2;
        break;
        case "id_ModifyValue2Top":
          type=3;
          break;
    default:
    return;
  }

  // calc mouse pos
  var rect = document.getElementById(event.target.id).getBoundingClientRect();
  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  var ratioToColorspaceResolutionX = vPlot_resolution_X / rect.width;
  var ratioToColorspaceResolutionY = vPlot_resolution_Y / rect.height;
  mousePosX = canvasPosX * ratioToColorspaceResolutionX;
  mousePosY = canvasPosY * ratioToColorspaceResolutionY;

  var vPlotyStart =  Math.round(vPlot_resolution_Y*0.9);

  var vPlotyStart =  Math.round(vPlot_resolution_Y*0.9);
  var vPlotyEnd =  Math.round(vPlot_resolution_Y*0.2);
  var vPlotxStart =  Math.round(vPlot_resolution_X*0.1);
  var vPlotxEnd =  Math.round(vPlot_resolution_X*0.85);
  var heigthVArea =vPlotyStart-vPlotyEnd;
  var plotwidth = vPlotxEnd-vPlotxStart;

  var tmpX, tmpY;
  document.getElementById(event.target.id).style.cursor = "default";


  if(mouseGrappedKeyID==-1){

    for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

      var found = false;

      var tmpColor, tmpColor2;
      tmpX = vPlotxStart+((globalCMS1.getRefPosition(i)-globalCMS1.getRefPosition(0))/globalCMS1.getRefRange())*plotwidth;

      switch (globalCMS1.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

          tmpColor = globalCMS1.getLeftKeyColor(i, analyzeColorspaceModus);
          tmpColor2 = globalCMS1.getRightKeyColor(i, analyzeColorspaceModus);

          var drawCircle = true;

          if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
            drawCircle = false;


          ////////////////////////////////////////////////////////////////
          /////// V Plot

          if(drawCircle){

            tmpY=calcVYPos(tmpColor,vPlotyStart,heigthVArea,type);
            if (checkInsideCirce(tmpX, tmpY, i,0)) {
              found = true;
              break;
            }

            tmpY=calcVYPos(tmpColor2,vPlotyStart,heigthVArea,type);
            if (checkInsideCirce(tmpX, tmpY, i,1)) {
              found = true;
              break;
            }

          }
          else{

            tmpY=calcVYPos(tmpColor2,vPlotyStart,heigthVArea,type);
            if (checkInsideCirce(tmpX, tmpY, i,1)) {
              found = true;
              break;
            }


            tmpY=calcVYPos(tmpColor,vPlotyStart,heigthVArea,type);
            if (checkInsideRect(tmpX, tmpY, i,0)) {
              found = true;
              break;
            }

            tmpX = vPlotxStart+((globalCMS1.getRefPosition(i-1)-globalCMS1.getRefPosition(0))/globalCMS1.getRefRange())*plotwidth;
            if (checkInsideRect(tmpX, tmpY, i-1,0)) {
              found = true;
              break;
            }

          }

          break;
        case "left key":

          tmpColor = globalCMS1.getLeftKeyColor(i, analyzeColorspaceModus);

          var drawCircle = true;
          if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
            drawCircle = false;


            tmpY=calcVYPos(tmpColor,vPlotyStart,heigthVArea,type);
          if(drawCircle){
              if (checkInsideCirce(tmpX, tmpY, i,0)) {
                found = true;
                break;
              }
          }
          else{
              if (checkInsideRect(tmpX, tmpY, i,0)) {
                found = true;
                break;
              }

              tmpX = vPlotxStart+((globalCMS1.getRefPosition(i-1)-globalCMS1.getRefPosition(0))/globalCMS1.getRefRange())*plotwidth;
              if (checkInsideRect(tmpX, tmpY, i-1,0)) {
                found = true;
                break;
              }
          }
          break;

          case "right key":

          tmpColor = globalCMS1.getRightKeyColor(i, analyzeColorspaceModus); // right color because of right key

          tmpY=calcVYPos(tmpColor,vPlotyStart,heigthVArea,type);

          if (checkInsideCirce(tmpX, tmpY, i,1)) {
            found = true;
          }

          break;
        default:
          // dual Key

          tmpColor = globalCMS1.getRightKeyColor(i, analyzeColorspaceModus); // right color because of right key

          tmpY=calcVYPos(tmpColor,vPlotyStart,heigthVArea,type);
          if (checkInsideCirce(tmpX, tmpY, i,2)) {
            found = true;
          }

      }

      if (found) {
        document.getElementById(event.target.id).style.cursor = "pointer";
        break;
      }

    }


  }//if grapped key == -1
  else{
    //calc color and give it to the band
    var errorRGBColor = new classColor_RGB(-1, -1, -1);

    var newValue = (vPlotyStart - mousePosY) / heigthVArea;

    if (newValue >= 0 && newValue <= 1.0) {

      var tmpColor,oldColor;
      switch (mouseGrappedColorSide) {
        case 0:
        // left color
          oldColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, analyzeColorspaceModus);
          break;
        case 1:
          // right color
          oldColor = globalCMS1.getRightKeyColor(mouseGrappedKeyID, analyzeColorspaceModus);
          break;
        default:
          // one of both colors
          oldColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, analyzeColorspaceModus);
      }



      switch (type) {
        case 1:
            switch(analyzeColorspaceModus) {
              case "hsv":
                tmpColor = new classColor_HSV(oldColor.getHValue(), oldColor.getSValue(), newValue);
                break
              case "lab":
                tmpColor = new classColor_LAB(newValue * 100, oldColor.getAValue(), oldColor.getBValue());
                if (document.getElementById("id_checkboxRGB").checked == true) {
                  var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

                  if (testColor.getRValue() == -1) {
                    return;
                  }
                }
                break;
              case "din99":
                tmpColor = new classColorDIN99(newValue * 100, oldColor.getA99Value(), oldColor.getB99Value());
                if (document.getElementById("id_checkboxRGB").checked == true) {
                  var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

                  if (testColor.getRValue() == -1) {
                    return;
                  }
                }
                break;
              default:
                console.log("Error at the getC1CurrentValue function");
                return;
            }
          break;
          case 2:
          switch(analyzeColorspaceModus) {
            case "hsv":
              tmpColor = new classColor_HSV(newValue, oldColor.getSValue(), oldColor.getVValue());
              break
            case "lab":
              newValue= newValue*(labSpaceRange*2)+(labSpaceRange*-1);
              tmpColor = new classColor_LAB(oldColor.getLValue(), newValue, oldColor.getBValue());
              if (document.getElementById("id_checkboxRGB").checked == true) {
                var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

                if (testColor.getRValue() == -1) {
                  return;
                }
              }
              break;
            case "din99":
              newValue= newValue*(rangeA99Pos-rangeA99Neg)+(rangeA99Neg);
              tmpColor = new classColorDIN99(oldColor.getL99Value(),newValue, oldColor.getB99Value());

              if (document.getElementById("id_checkboxRGB").checked == true) {
                var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);
                if (testColor.getRValue() == -1) {
                  return;
                }
              }
              var testColor2 = tmpColor.calcRGBColor();
              if((tmpColor.getA99Value()!=0 || tmpColor.getB99Value()!=0)  && testColor2.equalTo(new classColor_RGB(0,0,0)))
                return;
              break;
            default:
              console.log("Error at the getC1CurrentValue function");
              return;
          }
            break;
            case 3:
            switch(analyzeColorspaceModus) {
              case "hsv":
                tmpColor = new classColor_HSV(oldColor.getHValue(), newValue, oldColor.getVValue());
                break
              case "lab":
                newValue= newValue*(labSpaceRange*2)+(labSpaceRange*-1);
                tmpColor = new classColor_LAB(oldColor.getLValue(), oldColor.getAValue(),newValue);
                if (document.getElementById("id_checkboxRGB").checked == true) {
                  var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

                  if (testColor.getRValue() == -1) {
                    return;
                  }
                }
                break;
              case "din99":
                newValue= newValue*(rangeB99Pos-rangeB99Neg)+(rangeB99Neg);
                tmpColor = new classColorDIN99(oldColor.getL99Value(), oldColor.getA99Value(), newValue);

                if (document.getElementById("id_checkboxRGB").checked == true) {
                  var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);
                  if (testColor.getRValue() == -1) {
                    return;
                  }
                }

                var testColor2 = tmpColor.calcRGBColor();
                if((tmpColor.getA99Value()!=0 || tmpColor.getB99Value()!=0)  && testColor2.equalTo(new classColor_RGB(0,0,0)))
                  return;
                break;
              default:
                console.log("Error at the getC1CurrentValue function");
                return;
            }
              break;
        default:
        return;
      }


      switch (mouseGrappedColorSide) {
        case 0:
        // left color
          globalCMS1.setLeftKeyColor(mouseGrappedKeyID, tmpColor);
          break;
        case 1:
          // right color
          globalCMS1.setRightKeyColor(mouseGrappedKeyID, tmpColor);
          break;
        case 2:
          // both colors
          globalCMS1.setLeftKeyColor(mouseGrappedKeyID, tmpColor);
          globalCMS1.setRightKeyColor(mouseGrappedKeyID, tmpColor);
          break;
        default:
        console.log("Error "+ mouseGrappedColorSide);
      }

      somethingChanged = true;
    }
  }

}



function mouseDownValuePlot() {
    if (mouseAboveKeyID != -1) {
      mouseGrappedKeyID = mouseAboveKeyID;
      timer2DAnimation = setInterval(hsvLabDinAnimation, animationInterval);
    }
}
