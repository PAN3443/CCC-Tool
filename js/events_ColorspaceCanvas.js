/////////////////////////////////////
// -------------Event COLORSPACE HUE---------------//
/////////////////////////////////////

function mouseLeaveColorspace() {
  mouseAboveSpaceObjectID = -1;
  if (mouseGrappedSpaceObjectID != -1) {
    mouseGrappedSpaceObjectID = -1;

    if (showSideID == 2) {
      drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
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

  // check if mouse is above a element
  for (var i = 0; i < spaceElementsType.length; i++) {

    if (mouseAboveSpaceObjectID == i) {
      if (spaceElementsType[i] == true) {
        // Circle -> Part of Scaled Band
        var dis = Math.sqrt(Math.pow(spaceElementsXPos[i] - mousePosX, 2) + Math.pow(spaceElementsYPos[i] - mousePosY, 2));
        if (dis > bigcircleRad) {
          mouseAboveSpaceObjectID = -1;
          if (showSideID == 2) {
            drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
          }
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
            if (showSideID == 2) {
              drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
            }
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
        if (showSideID == 2) {
          drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
        }
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
          if (showSideID == 2) {
            drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
          }
          break;
        }

      }
    }
  }


  // check if mouse is inside of Colorspace
  var dis = Math.sqrt(Math.pow(colorspaceCenterX - mousePosX, 2) + Math.pow(colorspaceCenterY - mousePosY, 2));
  if (dis <= colorspaceRadius) {
    document.getElementById(event.target.id).style.cursor = "pointer"; // crosshair
  } else {
    document.getElementById(event.target.id).style.cursor = "default";
    mouseAboveSpaceObjectID = -1;
    mouseGrappedSpaceObjectID = -1;
    if (showSideID == 2) {
      drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
    }

  }

  // if inside of colorelement
      if(mouseGrappedSpaceObjectID != -1){
          //calc color and give it to the band
          var ty = (mousePosY) - (colorspaceCenterY);
          var tx = mousePosX- colorspaceCenterX;
          var angle = (Math.atan2(ty,tx)+Math.PI)/(Math.PI*2); // values 0-1 ...
          var hVal = angle;
          var sVal = dis/colorspaceRadius;
          var vVal = updateCurrentValue;
          var colorHSV = new classColor_HSV(hVal,sVal,vVal);
          var tmpRGBColor = colorHSV.calcRGBColor();

          //draw the colorspace new
          if(updateSketchID1 != -1)
              colormapBandSketchC1[updateSketchID1] = tmpRGBColor;

          if(updateSketchID2 != -1)
              colormapBandSketchC2[updateSketchID2] = tmpRGBColor;

          orderColorSketch();
          if (showSideID == 2) {
            analysisColormap = sketchInfo2Colormap();
            drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
          }
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
          for(var i=0; i<colormapBandSketchC1.length; i++){

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

              saveNext=true;

              if(i+1<colormapBandSketchC1.length &&
              (colormapBandSketchC2[i].getRValue()!=colormapBandSketchC1[i].getRValue() ||  // i = scaled
              colormapBandSketchC2[i].getGValue()!=colormapBandSketchC1[i].getGValue() ||
              colormapBandSketchC2[i].getBValue()!=colormapBandSketchC1[i].getBValue())
              &&
              (colormapBandSketchC2[i+1].getRValue()!=colormapBandSketchC1[i+1].getRValue() || // i+1 = scaled
              colormapBandSketchC2[i+1].getGValue()!=colormapBandSketchC1[i+1].getGValue() ||
              colormapBandSketchC2[i+1].getBValue()!=colormapBandSketchC1[i+1].getBValue())
              &&
              (colormapBandSketchC2[i].getRValue()==colormapBandSketchC1[i+1].getRValue() && // -> dual key
              colormapBandSketchC2[i].getGValue()==colormapBandSketchC1[i+1].getGValue() &&
              colormapBandSketchC2[i].getBValue()==colormapBandSketchC1[i+1].getBValue()))
              saveNext=false; // case dual key

          }

          switch(spaceElementsKey[mouseGrappedSpaceObjectID]) {
                  case "twin key1":
                                      // = alwas circle
                                      if(spaceElementsType[mouseGrappedSpaceObjectID]==true){
                                          updateCurrentValue = colormapBandSketchC2[bandindex].calcHSVColor().getVValue();
                                          updateSketchID1 = -1;
                                          updateSketchID2 = bandindex;
                                      }
                                      else{
                                          updateCurrentValue = colormapBandSketchC1[bandindex].calcHSVColor().getVValue();
                                          updateSketchID1 = bandindex;
                                          updateSketchID2 = bandindex;
                                      }
                                      break;
                  case "twin key2":
                                      updateCurrentValue = colormapBandSketchC1[bandindex].calcHSVColor().getVValue();
                                      updateSketchID1 = bandindex; // +1 because the first band inde
                                      updateSketchID2 = -1;
                                      break;
                  case "left key1":
                                      if(spaceElementsType[mouseGrappedSpaceObjectID]==true){
                                          updateCurrentValue = colormapBandSketchC2[bandindex].calcHSVColor().getVValue();
                                          updateSketchID1 = -1;
                                          updateSketchID2 = bandindex;
                                      }
                                      else{
                                          updateCurrentValue = colormapBandSketchC1[bandindex].calcHSVColor().getVValue();
                                          updateSketchID1 = bandindex;
                                          updateSketchID2 = bandindex;
                                      }
                                      break;
                  case "dual key":
                                      updateCurrentValue = colormapBandSketchC2[bandindex].calcHSVColor().getVValue();
                                      updateSketchID1 = bandindex+1;
                                      updateSketchID2 = bandindex;
                                      break;
                  case "right key":
                                      updateCurrentValue = colormapBandSketchC1[bandindex].calcHSVColor().getVValue();
                                      updateSketchID1 = bandindex;
                                      updateSketchID2 = -1;
                                      break;
                  default:
                      updateSketchID1 = -1;
                      updateSketchID2 = -1;
          }


        }

}

function mouseUpColorspace() {

  mouseGrappedSpaceObjectID=-1;

}


/////////////////////////////////////
// -------------Event COLORSPACE VALUE---------------//
/////////////////////////////////////

function mouseLeaveValuePlot() {

  mouseAboveSpaceObjectID = -1;
  if (mouseGrappedSpaceObjectID != -1) {
    mouseGrappedSpaceObjectID = -1;

    if (showSideID == 2) {
      drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
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
            drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
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
        drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
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
          drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
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
        drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
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

  // check if mouse is above a element
/*   for (var i = 0; i < spaceElementsType.length; i++) {

    if (mouseAboveSpaceObjectID == i) {
      if (spaceElementsType[i] == true) {
        // Circle -> Part of Scaled Band
        var dis = Math.sqrt(Math.pow(spaceElementsXPos[i] - mousePosX, 2) + Math.pow(spaceElementsYPos[i] - mousePosY, 2));
        if (dis > bigcircleRad) {
          mouseAboveSpaceObjectID = -1;
          if (showSideID == 2) {
            drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
          }
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
            if (showSideID == 2) {
              drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
            }
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
        if (showSideID == 2) {
          drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
        }
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
          if (showSideID == 2) {
            drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
          }
          break;
        }

      }
    }
  }


  // check if mouse is inside of Colorspace
 var dis = Math.sqrt(Math.pow(colorspaceCenterX - mousePosX, 2) + Math.pow(colorspaceCenterY - mousePosY, 2));
  if (dis <= colorspaceRadius) {
    document.getElementById(event.target.id).style.cursor = "pointer"; // crosshair
  } else {
    document.getElementById(event.target.id).style.cursor = "default";
    mouseAboveSpaceObjectID = -1;
    mouseGrappedSpaceObjectID = -1;
    if (showSideID == 2) {
      drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
    }

  }*/

  var vPlotKeyPos = 0;
  var twinStarted=false;
  var leftStarted=false;

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
               var tmpHSVColor = colormapTmp.getHSVColor(i);

               /////////////////////////////////////////////
               // Twin Key First: V Overview
               if(colormapTmp.getKey(i-1)==="left key" || colormapTmp.getKey(i-1)==="nil key"){
                 // -> constant band

                 var tmpX = Math.round(plotXStart+(vPlotKeyPos)*widthVArea);
                 var tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));
                  vPlotKeyPos++;
                 var tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));

                 if(checkInsideRect(tmpX, tmpY, i)){
                   found = true;
                   break;
                 }

                 if(checkInsideRect(tmpX2, tmpY, i)){
                   found = true;
                   break;
                 }

               }else {
                 tmpHSVColor2 = colormapTmp.getHSVColor(i-1);


                 var tmpX = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                 var tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor2.getVValue()));
                 vPlotKeyPos++;
                 var tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                 var tmpY2 = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));


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
                var tmpHSVColor = colormapTmp.getHSVColor(i);

               /////////////////////////////////////////////
               // LEFT Key First: V Overview
               if(colormapTmp.getKey(i-1)==="left key" || colormapTmp.getKey(i-1)==="nil key"){
                   // -> constant band

                   var tmpX = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                   var tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));
                   vPlotKeyPos++;
                   var tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));

                   if(checkInsideRect(tmpX, tmpY, i)){
                     found = true;
                     break;
                   }

                   if(checkInsideRect(tmpX2, tmpY, i)){
                     found = true;
                     break;
                   }

               }else {
                 tmpHSVColor2 = colormapTmp.getHSVColor(i-1);

                 var tmpX = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                 var tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor2.getVValue()));
                 vPlotKeyPos++
                 var tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                 var tmpY2 = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));

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

           var tmpHSVColor = colormapTmp.getHSVColor(i);


           // V Overview
           /////////////////////////////////////////////
           // LEFT Key First: V Overview

           if(tmpKey=='dual key'){
             tmpHSVColor2 = colormapTmp.getHSVColor(i-1);

             var tmpX = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
             var tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor2.getVValue()));
             vPlotKeyPos++

             if(checkInsideCirce(tmpX, tmpY, i-1)){
               found = true;
               break;
             }

           }




   }

   if(found) break;

}

  // if inside of colorelement
      if(mouseGrappedSpaceObjectID != -1){
          //calc color and give it to the band
          var oldHSV = analysisColormap.getHSVColor(mouseGrappedSpaceObjectID);

          var newValue = (plotYStart-mousePosY)/heigthVArea;

          if(newValue>=0 && newValue<=1.0){
            var colorHSV = new classColor_HSV(oldHSV.getHValue(),oldHSV.getSValue(),newValue);
            var tmpRGBColor = colorHSV.calcRGBColor();

            //draw the colorspace new
            if(updateSketchID1 != -1)
                colormapBandSketchC1[updateSketchID1] = tmpRGBColor;

            if(updateSketchID2 != -1)
                colormapBandSketchC2[updateSketchID2] = tmpRGBColor;

            orderColorSketch();
            if (showSideID == 2) {
              analysisColormap = sketchInfo2Colormap();
              drawcolormap_hsvSpace(analysisColormap, "id_workcanvasAnalyseHue");
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



        for(var i=0; i<colormapBandSketchC1.length; i++){

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

              saveNext=true;

              if(i+1<colormapBandSketchC1.length &&
              (colormapBandSketchC2[i].getRValue()!=colormapBandSketchC1[i].getRValue() ||  // i = scaled
              colormapBandSketchC2[i].getGValue()!=colormapBandSketchC1[i].getGValue() ||
              colormapBandSketchC2[i].getBValue()!=colormapBandSketchC1[i].getBValue())
              &&
              (colormapBandSketchC2[i+1].getRValue()!=colormapBandSketchC1[i+1].getRValue() || // i+1 = scaled
              colormapBandSketchC2[i+1].getGValue()!=colormapBandSketchC1[i+1].getGValue() ||
              colormapBandSketchC2[i+1].getBValue()!=colormapBandSketchC1[i+1].getBValue())
              &&
              (colormapBandSketchC2[i].getRValue()==colormapBandSketchC1[i+1].getRValue() && // -> dual key
              colormapBandSketchC2[i].getGValue()==colormapBandSketchC1[i+1].getGValue() &&
              colormapBandSketchC2[i].getBValue()==colormapBandSketchC1[i+1].getBValue()))
              saveNext=false; // case dual key

          }

          switch(spaceElementsKey[mouseGrappedSpaceObjectID]) {
                  case "twin key1":
                                      // = alwas circle
                                      if(spaceElementsType[mouseGrappedSpaceObjectID]==true){
                                          updateCurrentValue = colormapBandSketchC2[bandindex].calcHSVColor().getVValue();
                                          updateSketchID1 = -1;
                                          updateSketchID2 = bandindex;
                                      }
                                      else{
                                          updateCurrentValue = colormapBandSketchC1[bandindex].calcHSVColor().getVValue();
                                          updateSketchID1 = bandindex;
                                          updateSketchID2 = bandindex;
                                      }
                                      break;
                  case "twin key2":
                                      updateCurrentValue = colormapBandSketchC1[bandindex].calcHSVColor().getVValue();
                                      updateSketchID1 = bandindex; // +1 because the first band inde
                                      updateSketchID2 = -1;
                                      break;
                  case "left key1":
                                      if(spaceElementsType[mouseGrappedSpaceObjectID]==true){
                                          updateCurrentValue = colormapBandSketchC2[bandindex].calcHSVColor().getVValue();
                                          updateSketchID1 = -1;
                                          updateSketchID2 = bandindex;
                                      }
                                      else{
                                          updateCurrentValue = colormapBandSketchC1[bandindex].calcHSVColor().getVValue();
                                          updateSketchID1 = bandindex;
                                          updateSketchID2 = bandindex;
                                      }
                                      break;
                  case "dual key":
                                      updateCurrentValue = colormapBandSketchC2[bandindex].calcHSVColor().getVValue();
                                      updateSketchID1 = bandindex+1;
                                      updateSketchID2 = bandindex;
                                      break;
                  case "right key":
                                      updateCurrentValue = colormapBandSketchC1[bandindex].calcHSVColor().getVValue();
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
