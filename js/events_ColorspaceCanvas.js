/////////////////////////////////////
// -------------Event COLORSPACE HUE---------------//
/////////////////////////////////////

function mouseLeaveColorspace(event) {
  document.getElementById(event.target.id).style.cursor = "default";
  document.getElementById("id_huePositionLabel").innerHTML = "";
  mouseAboveSpaceObjectID = -1;
  if (mouseGrappedSpaceObjectID != -1) {
    mouseGrappedSpaceObjectID = -1;

    if (showSideID == 2) {
      drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",true); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
    }
  }
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
  var xWidth = hue_resolution_X*labSpaceRectRange;
  var yHeight = hue_resolution_Y*labSpaceRectRange;

  // check if mouse is above a element
  for (var i = 0; i < spaceElementsType.length; i++) {

    if (mouseAboveSpaceObjectID == i) {
      if (spaceElementsType[i] == true) {
        // Circle -> Part of Scaled Band
        var dis = Math.sqrt(Math.pow(spaceElementsXPos[i] - mousePosX, 2) + Math.pow(spaceElementsYPos[i] - mousePosY, 2));
        if (dis > bigcircleRad) {
          mouseAboveSpaceObjectID = -1;
            drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
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
            mouseAboveSpaceObjectID = -1;
              drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
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
        mouseAboveSpaceObjectID = i;
        document.getElementById(event.target.id).style.cursor = "pointer";
          drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
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
          mouseAboveSpaceObjectID = i;
          document.getElementById(event.target.id).style.cursor = "pointer";
          drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
          break;
        }

      }
    }
  }


  // check if mouse is inside of Colorspace
  var tmpColor;
  var errorRGBColor = new classColor_RGB(-1,-1,-1);
  document.getElementById("id_huePositionLabel").innerHTML = "";
  switch(colorspaceModus){
      case "hsv":
        var dis = Math.sqrt(Math.pow(colorspaceCenterX - mousePosX, 2) + Math.pow(colorspaceCenterY - mousePosY, 2));
        if (dis <= colorspaceRadius) {
          //document.getElementById(event.target.id).style.cursor = "pointer"; // crosshair
          var ty = (mousePosY) - (colorspaceCenterY);
          var tx = mousePosX- colorspaceCenterX;
          var angle = (Math.atan2(ty,tx)+Math.PI)/(Math.PI*2); // values 0-1 ...
          var hVal = angle;
          var sVal = dis/colorspaceRadius;
          tmpColor = new classColor_HSV(hVal,sVal,updateCurrentValue);

          document.getElementById("id_huePositionLabel").innerHTML = "H : "+ hVal.toFixed(numDecimalPlaces) +", S : "+ sVal.toFixed(numDecimalPlaces);
        } else {
          //document.getElementById(event.target.id).style.cursor = "default";
          if (mouseGrappedSpaceObjectID != -1) {
            mouseGrappedSpaceObjectID = -1;
            mouseAboveSpaceObjectID = -1;
            drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",true); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
          }

          if (mouseAboveSpaceObjectID != -1) {
            mouseAboveSpaceObjectID = -1;
            drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
          }

        }
      break
      case "lab":
        var aVal = ((mousePosX-colorspaceCenterX)/(xWidth/2))*labSpaceRange;
        var bVal = ((mousePosY-colorspaceCenterY)/(yHeight/2))*labSpaceRange;

        if (aVal>=labSpaceRange*-1 && aVal<=labSpaceRange && bVal>=labSpaceRange*-1 && bVal<=labSpaceRange){

          tmpColor = new classColor_LAB(updateCurrentValue,aVal,bVal);
          document.getElementById("id_huePositionLabel").innerHTML = "A : "+ aVal.toFixed(numDecimalPlaces) +", B : "+ bVal.toFixed(numDecimalPlaces);

          if(document.getElementById("id_checkboxRGB").checked==true){
            var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

            if(testColor.getRValue()==-1){
              return;
            }
          }

        }
        else {
          return;
        }
      break;
      case "din99":
        var a99Val = ((mousePosX-colorspaceCenterX)/(xWidth/2))*din99SpaceRange;
        var b99Val = ((mousePosY-colorspaceCenterY)/(yHeight/2))*din99SpaceRange;

        if (a99Val>=din99SpaceRange*-1 && a99Val<=din99SpaceRange && b99Val>=din99SpaceRange*-1 && b99Val<=din99SpaceRange){
          tmpColor = new classColorDIN99(updateCurrentValue,a99Val,b99Val);
          document.getElementById("id_huePositionLabel").innerHTML = "A99 : "+ a99Val.toFixed(numDecimalPlaces) +", B99 : "+ b99Val.toFixed(numDecimalPlaces);

          if(document.getElementById("id_checkboxRGB").checked==true){
            var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

            if(testColor.getRValue()==-1){
              return;
            }
          }
        }
        else {
          return;
        }
      break;
      default:
      console.log("Error at the getC1CurrentValue function");
      return;
  }

  // if inside of colorelement
  if(mouseGrappedSpaceObjectID != -1){

      //draw the colorspace new
      if(updateSketchID1 != -1)
          bandSketch.setC1(tmpColor, updateSketchID1);

      if(updateSketchID2 != -1)
          bandSketch.setC2(tmpColor, updateSketchID2);

      orderColorSketch(colorspaceModus);
      drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");

    }
    else{

    }

}

function mouseDownColorspace() {
    if(mouseAboveSpaceObjectID!=-1){
      mouseGrappedSpaceObjectID = mouseAboveSpaceObjectID;

      // Calc Band Index
          var saveNext=true;
          var keyCounter = -1;
          updateSketchID1 = -1;
          updateSketchID2 = -1;
          var bandindex = -1;

          var colorindex;
          switch(colorspaceModus){
              case "hsv":
              colorindex=1;
              break
              case "lab":
              colorindex=2;
              break;
              case "din99":
              colorindex=3;
              break;
              default:
              console.log("Error at the getC1CurrentValue function");
              return;
          }

          for(var i=0; i<bandSketch.getBandLenght(); i++){

              if(saveNext){
                  keyCounter++;

                  if(keyCounter==mouseGrappedSpaceObjectID){
                  bandindex=i;
                  break;
                  }
              }

              keyCounter++;

              if(keyCounter==mouseGrappedSpaceObjectID){
                  bandindex=i;
                  break;
              }

              saveNext=bandSketch.keyColorEqual(i,colorindex); // if false -> case dual key

          }

          switch(spaceElementsKey[mouseGrappedSpaceObjectID]) {
                  case "twin key1":
                                      if(spaceElementsType[mouseGrappedSpaceObjectID]==true){
                                          updateCurrentValue = getC2CurrentValue(bandindex);
                                          updateSketchID1 = -1;
                                          updateSketchID2 = bandindex;
                                      }
                                      else{
                                          updateCurrentValue = getC1CurrentValue(bandindex);
                                          updateSketchID1 = bandindex;
                                          updateSketchID2 = bandindex;
                                      }
                                      break;
                  case "twin key2":
                                      updateCurrentValue = getC1CurrentValue(bandindex);
                                      updateSketchID1 = bandindex; // +1 because the first band inde
                                      updateSketchID2 = -1;
                                      break;
                  case "left key1":
                                      if(spaceElementsType[mouseGrappedSpaceObjectID]==true){
                                          updateCurrentValue = getC2CurrentValue(bandindex);
                                          updateSketchID1 = -1;
                                          updateSketchID2 = bandindex;
                                      }
                                      else{
                                          updateCurrentValue = getC1CurrentValue(bandindex);
                                          updateSketchID1 = bandindex;
                                          updateSketchID2 = bandindex;
                                      }
                                      break;
                  case "dual key":
                                      updateCurrentValue = getC2CurrentValue(bandindex);
                                      updateSketchID1 = bandindex+1;
                                      updateSketchID2 = bandindex;
                                      break;
                  case "right key":
                                      updateCurrentValue =  getC1CurrentValue(bandindex);
                                      updateSketchID1 = bandindex;
                                      updateSketchID2 = -1;
                                      break;
                  default:
                      updateSketchID1 = -1;
                      updateSketchID2 = -1;
          }

            drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",true);
      }

}


function getC1CurrentValue(index){

  switch(colorspaceModus){
      case "hsv":
      return bandSketch.getC1Color(index,"hsv").getVValue();
      case "lab":
      return bandSketch.getC1Color(index,"lab").getLValue();
      case "din99":
      return bandSketch.getC1Color(index,"din99").getL99Value();
      default:
      console.log("Error at the getC1CurrentValue function");
      return;
  }

}

function getC2CurrentValue(index){

  switch(colorspaceModus){
      case "hsv":
      return bandSketch.getC2Color(index,"hsv").getVValue();
      case "lab":
      return bandSketch.getC2Color(index,"lab").getLValue();
      break;
      case "din99":
      return bandSketch.getC2Color(index,"din99").getL99Value();
      break;
      default:
      console.log("Error at the getC2CurrentValue function");
      return;
  }

}

function mouseUpColorspace() {

  mouseGrappedSpaceObjectID=-1;
  drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",true);
}


/////////////////////////////////////
// -------------Event COLORSPACE VALUE---------------//
/////////////////////////////////////

function mouseLeaveValuePlot(event) {
  document.getElementById(event.target.id).style.cursor = "default";
  mouseAboveSpaceObjectID = -1;
  if (mouseGrappedSpaceObjectID != -1) {
    mouseGrappedSpaceObjectID = -1;

    if (showSideID == 2) {
      drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
    }
  }
}
////////////////////////////////////////////////////////////////////////////////
function checkInsideRect(centerPosX, centerPosY, i){
  if (mouseAboveSpaceObjectID == i) {

        if (mousePosX < centerPosX - bigcircleRad ||
          mousePosX > centerPosX + bigcircleRad ||
          mousePosY < centerPosY - bigcircleRad ||
          mousePosY > centerPosY + bigcircleRad) {
          mouseAboveSpaceObjectID = -1;
          if (showSideID == 2) {
            drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
          }
          return false;
        } else {
          return true;
        }

  }
  else{
    if (mousePosX >= centerPosX - circleRad &&
      mousePosX <= centerPosX + circleRad &&
      mousePosY >= centerPosY - circleRad &&
      mousePosY <= centerPosY + circleRad) {
      mouseAboveSpaceObjectID = i;
      if (showSideID == 2) {
        drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
      }
      return true;
    }
    else{
      return false;
    }

  }
}
////////////////////////////////////////////////////////////////////////////////
function checkInsideCirce(centerPosX, centerPosY, i){

  if (mouseAboveSpaceObjectID == i) {
      // Circle -> Part of Scaled Band
      var dis = Math.sqrt(Math.pow(centerPosX - mousePosX, 2) + Math.pow(centerPosY - mousePosY, 2));
      if (dis > bigcircleRad) {
        mouseAboveSpaceObjectID = -1;
        if (showSideID == 2) {
          drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
        }
        return false;
      } else {
        return true;
      }
  }
  else{
    var dis = Math.sqrt(Math.pow(centerPosX - mousePosX, 2) + Math.pow(centerPosY - mousePosY, 2));
    if (dis <= circleRad) {
      mouseAboveSpaceObjectID = i;
      if (showSideID == 2) {
        drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
      }
      return true;
    } else {
      return false;
    }
  }

}
////////////////////////////////////////////////////////////////////////////////
function mouseMoveValuePlot(event) {

  // calc mouse pos
  var rect = document.getElementById(event.target.id).getBoundingClientRect();
  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  var ratioToColorspaceResolutionX = vPlot_resolution_X / rect.width;
  var ratioToColorspaceResolutionY = vPlot_resolution_Y / rect.height;
  mousePosX = canvasPosX * ratioToColorspaceResolutionX;
  mousePosY = canvasPosY * ratioToColorspaceResolutionY;

  var  colormapTmp;

  switch(showSideID) {
    case 2:
      colormapTmp=analysisColormap;
    break;
    default:
    return;
  }


  var vPlotKeyPos = 0;
  var twinStarted=false;
  var leftStarted=false;
  var tmpX, tmpX2, tmpY, tmpY2;
  document.getElementById(event.target.id).style.cursor = "default";
  for(var i = 0; i<colormapTmp.getNumColors(); i++){

   var tmpKey = colormapTmp.getKey(i);
   var found = false;
     switch(tmpKey) {
       case "nil key":

           break;
       case "twin key":
           if(twinStarted==true){
               twinStarted=false;
               break;

           }
           else{


               /////////////////////////////////////////////
               // Twin Key First: V Overview


               if(colormapTmp.getKey(i-1)==="left key" || colormapTmp.getKey(i-1)==="nil key"){
                 // -> constant band
                 tmpX = Math.round(plotXStart+(vPlotKeyPos)*widthVArea);
                 vPlotKeyPos++;
                 tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));

                 switch(colorspaceModus){
                     case "hsv":
                     var tmpHSVColor = colormapTmp.getHSVColor(i);
                     tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));
                     break
                     case "lab":
                     var tmpLABColor = colormapTmp.getLabColor(i);
                     tmpY = Math.round(plotYStart-(heigthVArea*tmpLABColor.getLValue()/100));
                     break;
                     case "din99":
                     var tmpDIN99Color = colormapTmp.getDIN99Color(i);
                     tmpY = Math.round(plotYStart-(heigthVArea*tmpDIN99Color.getL99Value()/100));
                     break;
                     default:
                     console.log("Error at the getC1CurrentValue function");
                     return;
                 }

                 if(checkInsideRect(tmpX, tmpY, i)){
                   found = true;
                   break;
                 }

                 if(checkInsideRect(tmpX2, tmpY, i)){
                   found = true;
                   break;
                 }

               }else {

                 tmpX = Math.round(plotXStart+(vPlotKeyPos)*widthVArea);
                 vPlotKeyPos++;
                 tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));

                 switch(colorspaceModus){
                     case "hsv":
                     var tmpHSVColor = colormapTmp.getHSVColor(i);
                     var tmpHSVColor2 = colormapTmp.getHSVColor(i-1);
                     tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor2.getVValue()));
                     tmpY2 = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));
                     break
                     case "lab":
                     var tmpLABColor = colormapTmp.getLabColor(i);
                     var tmpLABColor2 = colormapTmp.getLabColor(i-1);
                     tmpY = Math.round(plotYStart-(heigthVArea*tmpLABColor2.getLValue()/100));
                     tmpY2 = Math.round(plotYStart-(heigthVArea*tmpLABColor.getLValue()/100));
                     break;
                     case "din99":
                     var tmpDIN99Color = colormapTmp.getDIN99Color(i);
                     var tmpDIN99Color2 = colormapTmp.getDIN99Color(i-1);
                     tmpY = Math.round(plotYStart-(heigthVArea*tmpDIN99Color2.getL99Value()/100));
                     tmpY2 = Math.round(plotYStart-(heigthVArea*tmpDIN99Color.getL99Value()/100));
                     break;
                     default:
                     console.log("Error at the getC1CurrentValue function");
                     return;
                 }



                 if(checkInsideCirce(tmpX, tmpY, i-1)){
                   found = true;
                   break;
                 }

                 if(checkInsideCirce(tmpX2, tmpY2, i)){
                   found = true;
                   break;
                 }


               }


               twinStarted=true;


               break;
           }
       case "left key":
           if(leftStarted==true){


               leftStarted=false;
               break;

           }
           else{
               /////////////////////////////////////////////
               // LEFT Key First: V Overview
               if(colormapTmp.getKey(i-1)==="left key" || colormapTmp.getKey(i-1)==="nil key"){
                   // -> constant band

                   tmpX = Math.round(plotXStart+(vPlotKeyPos)*widthVArea);
                   vPlotKeyPos++;
                   tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));

                   switch(colorspaceModus){
                       case "hsv":
                       var tmpHSVColor = colormapTmp.getHSVColor(i);
                       tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));
                       break
                       case "lab":
                       var tmpLABColor = colormapTmp.getLabColor(i);
                       tmpY = Math.round(plotYStart-(heigthVArea*tmpLABColor.getLValue()/100));
                       break;
                       case "din99":
                       var tmpDIN99Color = colormapTmp.getDIN99Color(i);
                       tmpY = Math.round(plotYStart-(heigthVArea*tmpDIN99Color.getL99Value()/100));
                       break;
                       default:
                       console.log("Error at the getC1CurrentValue function");
                       return;
                   }

                   if(checkInsideRect(tmpX, tmpY, i)){
                     found = true;
                     break;
                   }

                   if(checkInsideRect(tmpX2, tmpY, i)){
                     found = true;
                     break;
                   }

               }else {
                 tmpX = Math.round(plotXStart+(vPlotKeyPos)*widthVArea);
                 vPlotKeyPos++;
                 tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));

                 switch(colorspaceModus){
                     case "hsv":
                     var tmpHSVColor = colormapTmp.getHSVColor(i);
                     var tmpHSVColor2 = colormapTmp.getHSVColor(i-1);
                     tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor2.getVValue()));
                     tmpY2 = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));
                     break
                     case "lab":
                     var tmpLABColor = colormapTmp.getLabColor(i);
                     var tmpLABColor2 = colormapTmp.getLabColor(i-1);
                     tmpY = Math.round(plotYStart-(heigthVArea*tmpLABColor2.getLValue()/100));
                     tmpY2 = Math.round(plotYStart-(heigthVArea*tmpLABColor.getLValue()/100));
                     break;
                     case "din99":
                     var tmpDIN99Color = colormapTmp.getDIN99Color(i);
                     var tmpDIN99Color2 = colormapTmp.getDIN99Color(i-1);
                     tmpY = Math.round(plotYStart-(heigthVArea*tmpDIN99Color2.getL99Value()/100));
                     tmpY2 = Math.round(plotYStart-(heigthVArea*tmpDIN99Color.getL99Value()/100));
                     break;
                     default:
                     console.log("Error at the getC1CurrentValue function");
                     return;
                 }

                 if(checkInsideCirce(tmpX, tmpY, i-1)){
                   found = true;
                   break;
                 }

                 if(checkInsideCirce(tmpX2, tmpY2, i)){
                   found = true;
                   break;
                 }
               }

               leftStarted=true;
               break;
           }

       default:
           // dual Key, right key,

           // V Overview
           /////////////////////////////////////////////
           // LEFT Key First: V Overview

           if(tmpKey=='dual key'){
             tmpHSVColor2 = colormapTmp.getHSVColor(i-1);

             tmpX = Math.round(plotXStart+(vPlotKeyPos)*widthVArea);
             vPlotKeyPos++;

             switch(colorspaceModus){
                 case "hsv":
                 var tmpHSVColor2 = colormapTmp.getHSVColor(i-1);
                 tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor2.getVValue()));
                 break
                 case "lab":
                 var tmpLABColor2 = colormapTmp.getLabColor(i-1);
                 tmpY = Math.round(plotYStart-(heigthVArea*tmpLABColor2.getLValue()/100));
                 break;
                 case "din99":
                 var tmpDIN99Color2 = colormapTmp.getDIN99Color(i-1);
                 tmpY = Math.round(plotYStart-(heigthVArea*tmpDIN99Color2.getL99Value()/100));
                 break;
                 default:
                 console.log("Error at the getC1CurrentValue function");
                 return;
             }


             if(checkInsideCirce(tmpX, tmpY, i-1)){
               found = true;
               break;
             }

           }




   }

   if(found) {
     document.getElementById(event.target.id).style.cursor = "pointer";
     break;
   }

}

  // if inside of colorelement
      if(mouseGrappedSpaceObjectID != -1){
          //calc color and give it to the band
          var errorRGBColor = new classColor_RGB(-1,-1,-1);

          var newValue = (plotYStart-mousePosY)/heigthVArea;

          if(newValue>=0 && newValue<=1.0){

            var tmpColor;

            switch(colorspaceModus){
                case "hsv":
                var oldHSV = analysisColormap.getHSVColor(mouseGrappedSpaceObjectID);
                tmpColor = new classColor_HSV(oldHSV.getHValue(),oldHSV.getSValue(),newValue);
                break
                case "lab":
                var oldLAB = analysisColormap.getLabColor(mouseGrappedSpaceObjectID);
                tmpColor = new classColor_LAB(newValue*100,oldLAB.getAValue(),oldLAB.getBValue());
                if(document.getElementById("id_checkboxRGB").checked==true){
                  var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

                  if(testColor.getRValue()==-1){
                    return;
                  }
                }
                break;
                case "din99":
                var oldDIN99 = analysisColormap.getDIN99Color(mouseGrappedSpaceObjectID);
                tmpColor = new classColorDIN99(newValue*100,oldDIN99.getA99Value(),oldDIN99.getB99Value());
                if(document.getElementById("id_checkboxRGB").checked==true){
                  var testColor = tmpColor.calcRGBColorCorrect(errorRGBColor);

                  if(testColor.getRValue()==-1){
                    return;
                  }
                }
                break;
                default:
                console.log("Error at the getC1CurrentValue function");
                return;
            }



            //draw the colorspace new
            if(updateSketchID1 != -1)
                bandSketch.setC1(tmpColor, updateSketchID1);

            if(updateSketchID2 != -1)
                bandSketch.setC2(tmpColor, updateSketchID2);


            orderColorSketch(colorspaceModus);
            if (showSideID == 2) {
              drawcolormap_hueSpace(analysisColormap, "id_anaylseCourseHueBackground",false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
            }
          }
      }

}

function mouseDownValuePlot() {
    if(mouseAboveSpaceObjectID!=-1){
      mouseGrappedSpaceObjectID = mouseAboveSpaceObjectID;

      // Calc Band Index
          var saveNext=true;
          var keyCounter = -1;
          updateSketchID1 = -1;
          updateSketchID2 = -1;
          var bandindex = -1;

          var colorindex;

          switch(colorspaceModus){
              case "hsv":
              colorindex=1;
              break
              case "lab":
colorindex=2;
              break;
              case "din99":
colorindex=3;
              break;
              default:
              console.log("Error at the getC1CurrentValue function");
              return;
          }

        for(var i=0; i<bandSketch.getBandLenght(); i++){

              if(saveNext){
                  keyCounter++;

                  if(keyCounter==mouseGrappedSpaceObjectID){
                  bandindex=i;
                  break;
                  }
              }

              keyCounter++;

              if(keyCounter==mouseGrappedSpaceObjectID){
                  bandindex=i;
                  break;
              }

              saveNext=bandSketch.keyColorEqual(i,colorindex); // if false -> case dual key

          }

          switch(spaceElementsKey[mouseGrappedSpaceObjectID]) {
                  case "twin key1":
                                      // = alwas circle
                                      if(spaceElementsType[mouseGrappedSpaceObjectID]==true){
                                          updateSketchID1 = -1;
                                          updateSketchID2 = bandindex;
                                      }
                                      else{
                                          updateSketchID1 = bandindex;
                                          updateSketchID2 = bandindex;
                                      }
                                      break;
                  case "twin key2":
                                      updateSketchID1 = bandindex; // +1 because the first band inde
                                      updateSketchID2 = -1;
                                      break;
                  case "left key1":
                                      if(spaceElementsType[mouseGrappedSpaceObjectID]==true){
                                          updateSketchID1 = -1;
                                          updateSketchID2 = bandindex;
                                      }
                                      else{
                                          updateSketchID1 = bandindex;
                                          updateSketchID2 = bandindex;
                                      }
                                      break;
                  case "dual key":
                                      updateSketchID1 = bandindex+1;
                                      updateSketchID2 = bandindex;
                                      break;
                  case "right key":
                                      updateSketchID1 = bandindex;
                                      updateSketchID2 = -1;
                                      break;
                  default:
                      updateSketchID1 = -1;
                      updateSketchID2 = -1;
          }


        }

}

function mouseUpValuePlot() {

  mouseGrappedSpaceObjectID=-1;

}
