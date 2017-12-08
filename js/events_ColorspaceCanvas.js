/////////////////////////////////////
// -------------Event COLORSPACE---------------//
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
            console.log("above "+mouseAboveSpaceObjectID);
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
