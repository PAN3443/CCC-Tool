/////////////////////////////////////
// -------------Event COLORSPACE HUE---------------//
/////////////////////////////////////

function mouseLeaveColorspace(event) {
  clearInterval(timer2DAnimation);
  document.getElementById(event.target.id).style.cursor = "default";

  switch (pathColorspace) {
    case "hsv":
      document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "H : -, S: -, V: -";
      break;
      case "lab":
        document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L : -, a: -, b: -";
        break;
        case "din99":
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L99 : -, a99: -, b99: -";
          break;
    default:

  }



  mouseAboveKeyID = -1;
  mouseGrappedColorSide = -1;
  if (mouseGrappedKeyID != -1) {
    mouseGrappedKeyID = -1;
      drawcolormap_hueSpace(true,true,false);
      saveCreateProcess();
  }
}


function hsvLabDinAnimation(){
  updateEditPage();
  drawcolormap_hueSpace(false,true,false);
}

function mouseMoveColorspace(event) {
  // calc mouse pos
  var canvasObj = document.getElementById(event.target.id);


  var rect = canvasObj.getBoundingClientRect();
  mousePosX =  event.clientX - rect.left;
  mousePosY = event.clientY - rect.top;

  var colorspaceCenterX = Math.round(canvasObj.width / 2);
  var colorspaceCenterY = Math.round(canvasObj.height / 2);
  var colorspaceRadius = Math.round(canvasObj.width / 2);

  if(mouseGrappedKeyID==-1){

    // check if mouse is above a element

    var displayColor;
    for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

      var found = false;

      var tmpColor, tmpColor2, tmpPos;

      switch (globalCMS1.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

          tmpColor = globalCMS1.getLeftKeyColor(i, pathColorspace);
          tmpColor2 = globalCMS1.getRightKeyColor(i, pathColorspace);

          var drawCircle = true;

          if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
            drawCircle = false;


          ////////////////////////////////////////////////////////////////
          /////// V Plot

          if(drawCircle){

            tmpPos = calcHuePos(tmpColor,canvasObj.width, canvasObj.height);

            if (checkInsideCirce(tmpPos[0], tmpPos[1], i,0)) {
              found = true;
              displayColor=tmpColor;
              break;
            }

            tmpPos = calcHuePos(tmpColor2,canvasObj.width, canvasObj.height);
            if (checkInsideCirce(tmpPos[0], tmpPos[1], i,1)) {
              found = true;
              displayColor=tmpColor2;
              break;
            }

          }
          else{

            tmpPos = calcHuePos(tmpColor2,canvasObj.width, canvasObj.height);
            if (checkInsideCirce(tmpPos[0], tmpPos[1], i,1)) {
              displayColor=tmpColor2;
              found = true;
              break;
            }


            tmpPos = calcHuePos(tmpColor,canvasObj.width, canvasObj.height);
            if (checkInsideRect(tmpPos[0], tmpPos[1], i,0)) {
              displayColor=tmpColor;
              found = true;
              break;
            }

          }

          break;
        case "left key":

          tmpColor = globalCMS1.getLeftKeyColor(i, pathColorspace);

          var drawCircle = true;
          if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
            drawCircle = false;


          tmpPos = calcHuePos(tmpColor,canvasObj.width, canvasObj.height);
          if(drawCircle){
              if (checkInsideCirce(tmpPos[0], tmpPos[1], i,0)) {
                displayColor=tmpColor;
                found = true;
                break;
              }
          }
          else{
              if (checkInsideRect(tmpPos[0], tmpPos[1], i,0)) {
                displayColor=tmpColor;
                found = true;
                break;
              }
          }
          break;

          case "right key":

          tmpColor = globalCMS1.getRightKeyColor(i, pathColorspace); // right color because of right key

          tmpPos = calcHuePos(tmpColor,canvasObj.width, canvasObj.height);

          if (checkInsideCirce(tmpPos[0], tmpPos[1], i,1)) {
            displayColor=tmpColor;
            found = true;
          }

          break;
        default:
          // dual Key

          tmpColor = globalCMS1.getRightKeyColor(i, pathColorspace); // right color because of right key

          tmpPos = calcHuePos(tmpColor,canvasObj.width, canvasObj.height);
          if (checkInsideCirce(tmpPos[0], tmpPos[1], i,2)) {
            displayColor=tmpColor;
            found = true;
            break;
          }

          if(globalCMS1.getKeyType(i-1)==="left key"){
            tmpX = vPlotxStart+((globalCMS1.getRefPosition(i-1)-globalCMS1.getRefPosition(0))/globalCMS1.getRefRange())*plotwidth;
            if (checkInsideRect(tmpX, tmpY, i,2)) {
              displayColor=tmpColor;
              found = true;
              break;
            }
          }

      }

      if (found) {
        document.getElementById(event.target.id).style.cursor = "pointer";
        switch(pathColorspace) {
          case "hsv":
              var diplay1Val = Math.round(displayColor.get1Value()*360);
              var diplay2Val = Math.round(displayColor.get2Value()*100);
              var diplay3Val = Math.round(displayColor.get3Value()*100);
              document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "H : " + diplay1Val + ", S : " + diplay2Val + ", V : " + diplay3Val;
            break
          case "lab":
              var diplay1Val = Math.round(displayColor.get1Value());
              var diplay2Val = Math.round(displayColor.get2Value());
              var diplay3Val = Math.round(displayColor.get3Value());
              document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L : " + diplay1Val + ", a : " + diplay2Val + ", b : " + diplay3Val;
            break;
          case "din99":
              var diplay1Val = Math.round(displayColor.get1Value());
              var diplay2Val = Math.round(displayColor.get2Value());
              var diplay3Val = Math.round(displayColor.get3Value());
              document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L99 : " + diplay1Val + ", a99 : " + diplay2Val + ", b99 : " + diplay3Val;
            break;
          default:
            console.log("Error at the getC1CurrentValue function");
            return;
        }
        break;
      }
      else{
        mouseAboveKeyID = -1;
        mouseGrappedColorSide = -1;
      }


    }

    drawcolormap_hueSpace(false,false,false);

  }//if grapped key == -1
  else{
    // check if mouse is inside of Colorspace
    var tmpColor;
    var errorRGBColor = new classColor_RGB(-1, -1, -1);
    switch(pathColorspace) {
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

          var diplay1Val = Math.round(hVal*360);
          var diplay2Val = Math.round(sVal*100);
          var diplay3Val = Math.round(updateCurrentValue*100);
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "H : " + diplay1Val + ", S : " + diplay2Val + ", V : " + diplay3Val;
        } else {
          return;
        }
        break
      case "lab":
        var aVal = ((mousePosX - colorspaceCenterX) / (canvasObj.width / 2)) * labSpaceRange;
        var bVal = ((mousePosY - colorspaceCenterY) / (canvasObj.height / 2)) * labSpaceRange;


          tmpColor = new classColor_LAB(updateCurrentValue, aVal, bVal);

          var diplay1Val = Math.round(updateCurrentValue);
          var diplay2Val = Math.round(aVal);
          var diplay3Val = Math.round(bVal);
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L : " + diplay1Val + ", a : " + diplay2Val + ", b : " + diplay3Val;

          if (onlyRGBPossibleColor) {
            var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

            if (testColor.getRValue() == -1) {
              return;
            }
          }


        break;
      case "din99":
        var a99Val = (mousePosX / canvasObj.width) * rangeA99 + rangeA99Neg;
        var b99Val = (mousePosY / canvasObj.height) * rangeB99 + rangeB99Neg;

        //if (a99Val>=din99SpaceRange*-1 && a99Val<=din99SpaceRange && b99Val>=din99SpaceRange*-1 && b99Val<=din99SpaceRange){
        if (a99Val >= rangeA99Neg && a99Val <= rangeA99Pos && b99Val >= rangeB99Neg && b99Val <= rangeB99Pos) {
          tmpColor = new classColorDIN99(updateCurrentValue, a99Val, b99Val);

          var diplay1Val = Math.round(updateCurrentValue);
          var diplay2Val = Math.round(a99Val);
          var diplay3Val = Math.round(b99Val);
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L99 : " + diplay1Val + ", a99 : " + diplay2Val + ", b99 : " + diplay3Val;

          var colorRGB = tmpColor.calcRGBColor();
          if(colorRGB.getRValue()==0 && colorRGB.getGValue()==0 && colorRGB.getBValue()==0){
            if(tmpColor.getL99Value()!=0 || tmpColor.getA99Value() !=0 || tmpColor.getB99Value()!=0){
              return;
            }
          }

          if (onlyRGBPossibleColor) {
            var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

            if (testColor.getRValue() == -1) {
              return;
            }
          }
        } else {
          console.log(123);
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
        tmpColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, pathColorspace);
        break;
      case 1:
        // right color
        tmpColor = globalCMS1.getRightKeyColor(mouseGrappedKeyID, pathColorspace);
        break;
      default:
        // one of both colors
        tmpColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, pathColorspace);
    }

    switch(pathColorspace) {
      case "hsv":
          updateCurrentValue=tmpColor.get3Value();
          var diplay1Val = Math.round(tmpColor.get1Value()*360);
          var diplay2Val = Math.round(tmpColor.get2Value()*100);
          var diplay3Val = Math.round(tmpColor.get3Value()*100);
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "H : " + diplay1Val + ", S : " + diplay2Val + ", V : " + diplay3Val;
        break
      case "lab":
          updateCurrentValue=tmpColor.get1Value();
          var diplay1Val = Math.round(tmpColor.get1Value());
          var diplay2Val = Math.round(tmpColor.get2Value());
          var diplay3Val = Math.round(tmpColor.get3Value());
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L : " + diplay1Val + ", a : " + diplay2Val + ", b : " + diplay3Val;
        break;
      case "din99":
          updateCurrentValue=tmpColor.get1Value();
          var diplay1Val = Math.round(tmpColor.get1Value());
          var diplay2Val = Math.round(tmpColor.get2Value());
          var diplay3Val = Math.round(tmpColor.get3Value());
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L99 : " + diplay1Val + ", a99 : " + diplay2Val + ", b99 : " + diplay3Val;
        break;
      default:
        console.log("Error at the getC1CurrentValue function");
        return;
    }


  }

}

function mouseUpColorspace() {

  mouseGrappedKeyID=-1;
  mouseGrappedColorSide=-1;

  clearInterval(timer2DAnimation);

  switch (pathColorspace) {
    case "hsv":
      document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "H : -, S: -, V: -";
      break;
      case "lab":
        document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L : -, a: -, b: -";
        break;
        case "din99":
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L99 : -, a99: -, b99: -";
          break;
    default:

  }

  drawcolormap_hueSpace(true,true,false);
  saveCreateProcess();

}

function calcHuePos(tmpColor,canvasObjWidth, canvasObjHeight){

  var tmpPos=[];
  var xPos = undefined;
  var yPos = undefined;

  var colorspaceCenterX = Math.round(canvasObjWidth / 2);
  var colorspaceCenterY = Math.round(canvasObjHeight / 2);



  switch (pathColorspace) {
      case "hsv":
        var colorspaceRadius = Math.round(canvasObjWidth / 2);
        var tmpDis = tmpColor.getSValue() * colorspaceRadius;
        var tmpRad = (tmpColor.getHValue() * Math.PI * 2) - Math.PI;
        xPos = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
        yPos = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
        break;
      break;
      case "lab":
        xPos = ((tmpColor.getAValue() / labSpaceRange) * canvasObjWidth / 2) + colorspaceCenterX;
        yPos = ((tmpColor.getBValue() / labSpaceRange) * canvasObjHeight / 2) + colorspaceCenterY;
        break;
      case "din99":
        xPos = (tmpColor.getA99Value() - rangeA99Neg) / rangeA99 * canvasObjWidth;
        yPos = (tmpColor.getB99Value() - rangeB99Neg) / rangeB99 * canvasObjHeight;
        break;
      break;
        default:
          console.log("Error at the changeColorspace function");
          return;
      }
  tmpPos=[xPos,yPos];
  return tmpPos;
}


/////////////////////////////////////
// -------------Event COLORSPACE VALUE---------------//
/////////////////////////////////////

function mouseLeaveValuePlot(event) {
  clearInterval(timer2DAnimation);
  document.getElementById(event.target.id).style.cursor = "default";

  switch (pathColorspace) {
    case "hsv":
      document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "H : -, S: -, V: -";
      break;
      case "lab":
        document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L : -, a: -, b: -";
        break;
        case "din99":
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L99 : -, a99: -, b99: -";
          break;
    default:

  }

  mouseAboveKeyID = -1;
  mouseGrappedColorSide = -1;
  if (mouseGrappedKeyID != -1) {
    mouseGrappedKeyID = -1;
      drawcolormap_hueSpace(true,true,false);
      saveCreateProcess();
  }
}
////////////////////////////////////////////////////////////////////////////////


function checkPlotPosition(centerPosX, centerPosY, i, colorside, isCircle){

  if(isCircle)
    return checkInsideCirce(centerPosX, centerPosY, i, colorside);
  else
    return checkInsideRect(centerPosX, centerPosY, i, colorside);
}

function checkInsideRect(centerPosX, centerPosY, i, colorside) {
  if (mouseAboveKeyID == i) {

    if (mousePosX < centerPosX - bigcircleRad ||
      mousePosX > centerPosX + bigcircleRad ||
      mousePosY < centerPosY - bigcircleRad ||
      mousePosY > centerPosY + bigcircleRad) {
      mouseAboveKeyID = -1;
      mouseGrappedColorSide=-1;
        //drawcolormap_hueSpace(false,false,false);

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
        //drawcolormap_hueSpace(false,false,false);

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

        //drawcolormap_hueSpace(false,false,false);

      return false;
    } else {
      return true;
    }
  } else {

    var dis = Math.sqrt(Math.pow(centerPosX - mousePosX, 2) + Math.pow(centerPosY - mousePosY, 2));

    if (dis <= circleRad) {
      mouseAboveKeyID = i;
      mouseGrappedColorSide=colorside;
        //drawcolormap_hueSpace(false,false,false);
      return true;
    } else {
      return false;
    }
  }

}

function calcVYPos(tmpColor,plotYStart,heigthVArea, type){

  var tmpY;

  switch (type) {

      case 0:
      switch (pathColorspace) {
        case "hsv":
          tmpY = Math.round(plotYStart - (heigthVArea * tmpColor.getHValue()));
          break;
        case "lab":
          tmpY = Math.round(plotYStart - (heigthVArea * tmpColor.getLValue() / 100));
          break;
        case "din99":
          tmpY = Math.round(plotYStart - (heigthVArea * tmpColor.getL99Value() / 100));
          break;
        default:
          console.log("Error at the changeColorspace function");
          return;
      }
        break;
        case 1:
        switch (pathColorspace) {
          case "hsv":
            tmpY = Math.round(plotYStart - (heigthVArea * tmpColor.getSValue()));
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

          case 2:
          switch(pathColorspace) {
            case "hsv":
              tmpY = Math.round(plotYStart - (heigthVArea * tmpColor.getVValue()));
              break
            case "lab":
              //tmpY = Math.round(plotYStart - (heigthVArea * tmpColor.getLValue() / 100));
              tmpY = Math.round(plotYStart - (heigthVArea * (tmpColor.getBValue()+labSpaceRange) / (labSpaceRange*2)));
              break;
            case "din99":
              //tmpY = Math.round(plotYStart - (heigthVArea * tmpColor.getL99Value() / 100));
              tmpY = Math.round(plotYStart - (heigthVArea * (tmpColor.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
              break;
            default:
              console.log("Error at the getC1CurrentValue function");
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
    case "id_EditPage_PathPlot_Canvas1_2":
      type=0;
      break;
      case "id_EditPage_PathPlot_Canvas2_2":
        type=1;
        break;
        case "id_EditPage_PathPlot_Canvas3_2":
          type=2;
          break;
    default:
    return;
  }

  // calc mouse pos
  var rect = document.getElementById(event.target.id).getBoundingClientRect();
  /*var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  var ratioToColorspaceResolutionX = vPlot_resolution_X / rect.width;
  var ratioToColorspaceResolutionY = vPlot_resolution_Y / rect.height;
  mousePosX = canvasPosX * ratioToColorspaceResolutionX;
  mousePosY = canvasPosY * ratioToColorspaceResolutionY;*/

  mousePosX = event.clientX - rect.left;
  mousePosY = event.clientY - rect.top;

  var vPlotyStart =  Math.round(rect.height*0.9);

  var vPlotyStart =  Math.round(rect.height*0.9);
  var vPlotyEnd =  Math.round(rect.height*0.1);
  var vPlotxStart =  Math.round(rect.width*0.1);
  var vPlotxEnd =  Math.round(rect.width*0.85);
  var heigthVArea =vPlotyStart-vPlotyEnd;
  var plotwidth = vPlotxEnd-vPlotxStart;

  var tmpX, tmpY;
  document.getElementById(event.target.id).style.cursor = "default";


  if(mouseGrappedKeyID==-1){

    var displayColor;
    for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

      var found = false;

      var tmpColor, tmpColor2;
      tmpX = vPlotxStart+((globalCMS1.getRefPosition(i)-globalCMS1.getRefPosition(0))/globalCMS1.getRefRange())*plotwidth;

      switch (globalCMS1.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

          tmpColor = globalCMS1.getLeftKeyColor(i, pathColorspace);
          tmpColor2 = globalCMS1.getRightKeyColor(i, pathColorspace);

          var drawCircle = true;

          if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
            drawCircle = false;


          ////////////////////////////////////////////////////////////////
          /////// V Plot

          if(drawCircle){

            tmpY=calcVYPos(tmpColor,vPlotyStart,heigthVArea,type);
            if (checkInsideCirce(tmpX, tmpY, i,0)) {
              found = true;
              displayColor=tmpColor;
              break;
            }

            tmpY=calcVYPos(tmpColor2,vPlotyStart,heigthVArea,type);
            if (checkInsideCirce(tmpX, tmpY, i,1)) {
              found = true;
              displayColor=tmpColor2;
              break;
            }

          }
          else{

            tmpY=calcVYPos(tmpColor2,vPlotyStart,heigthVArea,type);
            if (checkInsideCirce(tmpX, tmpY, i,1)) {
              displayColor=tmpColor2;
              found = true;
              break;
            }


            tmpY=calcVYPos(tmpColor,vPlotyStart,heigthVArea,type);
            if (checkInsideRect(tmpX, tmpY, i,0)) {
              displayColor=tmpColor;
              found = true;
              break;
            }

            tmpX = vPlotxStart+((globalCMS1.getRefPosition(i-1)-globalCMS1.getRefPosition(0))/globalCMS1.getRefRange())*plotwidth;
            if (checkInsideRect(tmpX, tmpY, i,0)) {
              displayColor=tmpColor;
              found = true;
              break;
            }

          }

          break;
        case "left key":

          tmpColor = globalCMS1.getLeftKeyColor(i, pathColorspace);

          var drawCircle = true;
          if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
            drawCircle = false;


            tmpY=calcVYPos(tmpColor,vPlotyStart,heigthVArea,type);
          if(drawCircle){
              if (checkInsideCirce(tmpX, tmpY, i,0)) {
                displayColor=tmpColor;
                found = true;
                break;
              }
          }
          else{
              if (checkInsideRect(tmpX, tmpY, i,0)) {
                displayColor=tmpColor;
                found = true;
                break;
              }

              tmpX = vPlotxStart+((globalCMS1.getRefPosition(i-1)-globalCMS1.getRefPosition(0))/globalCMS1.getRefRange())*plotwidth;
              if (checkInsideRect(tmpX, tmpY, i,0)) {
                displayColor=tmpColor;
                found = true;
                break;
              }
          }
          break;

          case "right key":

          tmpColor = globalCMS1.getRightKeyColor(i, pathColorspace); // right color because of right key

          tmpY=calcVYPos(tmpColor,vPlotyStart,heigthVArea,type);

          if (checkInsideCirce(tmpX, tmpY, i,1)) {
            displayColor=tmpColor;
            found = true;
          }

          break;
        default:
          // dual Key

          tmpColor = globalCMS1.getRightKeyColor(i, pathColorspace); // right color because of right key

          tmpY=calcVYPos(tmpColor,vPlotyStart,heigthVArea,type);
          if (checkInsideCirce(tmpX, tmpY, i,2)) {
            displayColor=tmpColor;
            found = true;
            break;
          }

          if(globalCMS1.getKeyType(i-1)==="left key"){
            tmpX = vPlotxStart+((globalCMS1.getRefPosition(i-1)-globalCMS1.getRefPosition(0))/globalCMS1.getRefRange())*plotwidth;
            if (checkInsideRect(tmpX, tmpY, i,2)) {
              displayColor=tmpColor;
              found = true;
              break;
            }
          }

      }

      if (found) {
        document.getElementById(event.target.id).style.cursor = "pointer";
        switch(pathColorspace) {
          case "hsv":
              var diplay1Val = Math.round(displayColor.get1Value()*360);
              var diplay2Val = Math.round(displayColor.get2Value()*100);
              var diplay3Val = Math.round(displayColor.get3Value()*100);
              document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "H : " + diplay1Val + ", S : " + diplay2Val + ", V : " + diplay3Val;
            break
          case "lab":
              var diplay1Val = Math.round(displayColor.get1Value());
              var diplay2Val = Math.round(displayColor.get2Value());
              var diplay3Val = Math.round(displayColor.get3Value());
              document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L : " + diplay1Val + ", a : " + diplay2Val + ", b : " + diplay3Val;
            break;
          case "din99":
              var diplay1Val = Math.round(displayColor.get1Value());
              var diplay2Val = Math.round(displayColor.get2Value());
              var diplay3Val = Math.round(displayColor.get3Value());
              document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L99 : " + diplay1Val + ", a99 : " + diplay2Val + ", b99 : " + diplay3Val;
            break;
          default:
            console.log("Error at the getC1CurrentValue function");
            return;
        }
        break;
      }
      else{
        mouseAboveKeyID = -1;
        mouseGrappedColorSide = -1;
      }


    }



    drawcolormap_hueSpace(false,false,false);

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
          oldColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, pathColorspace);
          break;
        case 1:
          // right color
          oldColor = globalCMS1.getRightKeyColor(mouseGrappedKeyID, pathColorspace);
          break;
        default:
          // one of both colors
          oldColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, pathColorspace);
      }

      if(oldColor==undefined)
      return;

      switch (type) {

          case 0:
          switch(pathColorspace) {
            case "hsv":
              tmpColor = new classColor_HSV(newValue, oldColor.getSValue(), oldColor.getVValue());
              break;
              case "lab":
                tmpColor = new classColor_LAB(newValue * 100, oldColor.getAValue(), oldColor.getBValue());
                if (onlyRGBPossibleColor) {
                  var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

                  if (testColor.getRValue() == -1) {
                    return;
                  }
                }
                break;
              case "din99":
                tmpColor = new classColorDIN99(newValue * 100, oldColor.getA99Value(), oldColor.getB99Value());
                if (onlyRGBPossibleColor) {
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
            case 1:
            switch(pathColorspace) {
              case "hsv":
                tmpColor = new classColor_HSV(oldColor.getHValue(), newValue, oldColor.getVValue());
                break;

                var testColor2 = tmpColor.calcRGBColor();
                if((tmpColor.getA99Value()!=0 || tmpColor.getB99Value()!=0)  && testColor2.equalTo(new classColor_RGB(0,0,0)))
                  return;
                break;

                case "lab":
                  newValue= newValue*(labSpaceRange*2)+(labSpaceRange*-1);
                  tmpColor = new classColor_LAB(oldColor.getLValue(), newValue, oldColor.getBValue());
                  if (onlyRGBPossibleColor) {
                    var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

                    if (testColor.getRValue() == -1) {
                      return;
                    }
                  }
                  break;
                case "din99":
                  newValue= newValue*(rangeA99Pos-rangeA99Neg)+(rangeA99Neg);
                  tmpColor = new classColorDIN99(oldColor.getL99Value(),newValue, oldColor.getB99Value());

                  if (onlyRGBPossibleColor) {
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
              case 2:
                  switch(pathColorspace) {
                    case "hsv":
                      tmpColor = new classColor_HSV(oldColor.getHValue(), oldColor.getSValue(), newValue);
                      break;

                      case "lab":
                        newValue= newValue*(labSpaceRange*2)+(labSpaceRange*-1);
                        tmpColor = new classColor_LAB(oldColor.getLValue(), oldColor.getAValue(),newValue);
                        if (onlyRGBPossibleColor) {
                          var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

                          if (testColor.getRValue() == -1) {
                            return;
                          }
                        }
                        break;
                      case "din99":
                        newValue= newValue*(rangeB99Pos-rangeB99Neg)+(rangeB99Neg);
                        tmpColor = new classColorDIN99(oldColor.getL99Value(), oldColor.getA99Value(), newValue);

                        if (onlyRGBPossibleColor) {
                          var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);
                          if (testColor.getRValue() == -1) {
                            return;
                          }
                        }
                    default:
                      console.log("Error at the getC1CurrentValue function");
                      return;
                  }
                break;
        default:
        return;
      }


      switch(pathColorspace) {
        case "hsv":
            var diplay1Val = Math.round(tmpColor.get1Value()*360);
            var diplay2Val = Math.round(tmpColor.get2Value()*100);
            var diplay3Val = Math.round(tmpColor.get3Value()*100);
            document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "H : " + diplay1Val + ", S : " + diplay2Val + ", V : " + diplay3Val;
          break
        case "lab":
            var diplay1Val = Math.round(tmpColor.get1Value());
            var diplay2Val = Math.round(tmpColor.get2Value());
            var diplay3Val = Math.round(tmpColor.get3Value());
            document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L : " + diplay1Val + ", a : " + diplay2Val + ", b : " + diplay3Val;
          break;
        case "din99":
            var diplay1Val = Math.round(tmpColor.get1Value());
            var diplay2Val = Math.round(tmpColor.get2Value());
            var diplay3Val = Math.round(tmpColor.get3Value());
            document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L99 : " + diplay1Val + ", a99 : " + diplay2Val + ", b99 : " + diplay3Val;
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

}



function mouseDownValuePlot() {
    if (mouseAboveKeyID != -1) {
      mouseGrappedKeyID = mouseAboveKeyID;
      timer2DAnimation = setInterval(hsvLabDinAnimation, animationInterval);
    }
}
