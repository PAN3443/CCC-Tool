/////////////////////////////////////
// -------------Event COLORSPACE HUE---------------//
/////////////////////////////////////

function mouseLeaveColorspaceRGB(event) {
  document.getElementById(event.target.id).style.cursor = "default";
  //document.getElementById("id_huePositionLabel").innerHTML = "";
  mouseAboveSpaceObjectID = -1;
  if (mouseGrappedSpaceObjectID != -1) {
    mouseGrappedSpaceObjectID = -1;

    if (showSideID == 2) {
      drawcolormap_RGBSpace(analysisColormap, "id_canvasRG","id_canvasRB","id_canvasBG", true); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
    }
  }
}

function mouseMoveColorspaceRGB(event) {
  var index;
  switch (event.target.id) {
    case "id_canvasRG":
      index=0;
      break;
    case "id_canvasRB":
      index=1;
      break;
    case "id_canvasBG":
      index=2;
      break;
    default:
      return;
  }
  // calc mouse pos
  var rect = document.getElementById(event.target.id).getBoundingClientRect();
  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  var ratioToColorspaceResolutionX = hue_resolution_X / rect.width;
  var ratioToColorspaceResolutionY = hue_resolution_Y / rect.height;
  mousePosX = canvasPosX * ratioToColorspaceResolutionX;
  mousePosY = canvasPosY * ratioToColorspaceResolutionY;
  var xStart = hue_resolution_X*0.1;
  var yStart = hue_resolution_Y*0.9;
  var xEnd = hue_resolution_X*0.8;
  var yEnd = hue_resolution_Y*0.2;
  var xWidth = xEnd-xStart;
  var yHeight =yStart-yEnd;

  // check if mouse is above a element
  for (var i = 0; i < spaceElementsType.length; i++) {

    if (mouseAboveSpaceObjectID == i) {
      if (spaceElementsType[i] == true) {
        // Circle -> Part of Scaled Band
        var dis = Math.sqrt(Math.pow(spaceElementsXPos[i][index] - mousePosX, 2) + Math.pow(spaceElementsYPos[i][index] - mousePosY, 2));
        if (dis > bigcircleRad) {
          mouseAboveSpaceObjectID = -1;
            drawcolormap_RGBSpace(analysisColormap, "id_canvasRG","id_canvasRB","id_canvasBG", false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
          document.getElementById(event.target.id).style.cursor = "default";
          break;
        } else {
          break;
        }
      } else {
        if (spaceElementsXPos[i][index] != -1) {
          // QUAD -> Constant Band

          //var dis = Math.sqrt(Math.pow(spaceElementsXPos[i]-mousePosX,2)+Math.pow(spaceElementsYPos[i]-mousePosY,2));

          if (mousePosX < spaceElementsXPos[i][index] - bigcircleRad ||
            mousePosX > spaceElementsXPos[i][index] + bigcircleRad ||
            mousePosY < spaceElementsYPos[i][index] - bigcircleRad ||
            mousePosY > spaceElementsYPos[i][index] + bigcircleRad) {
            mouseAboveSpaceObjectID = -1;
              drawcolormap_RGBSpace(analysisColormap, "id_canvasRG","id_canvasRB","id_canvasBG", false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
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
      var dis = Math.sqrt(Math.pow(spaceElementsXPos[i][index] - mousePosX, 2) + Math.pow(spaceElementsYPos[i][index] - mousePosY, 2));
      if (dis <= circleRad) {
        mouseAboveSpaceObjectID = i;
        document.getElementById(event.target.id).style.cursor = "pointer";
          drawcolormap_RGBSpace(analysisColormap, "id_canvasRG","id_canvasRB","id_canvasBG", false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
        break;
      }


    } else {
      if (spaceElementsXPos[i][index] != -1) {
        // QUAD -> Constant Band

        var dis = Math.sqrt(Math.pow(spaceElementsXPos[i][index] - mousePosX, 2) + Math.pow(spaceElementsYPos[i][index] - mousePosY, 2));

        if (mousePosX >= spaceElementsXPos[i][index] - circleRad &&
          mousePosX <= spaceElementsXPos[i][index] + circleRad &&
          mousePosY >= spaceElementsYPos[i][index] - circleRad &&
          mousePosY <= spaceElementsYPos[i][index] + circleRad) {
          mouseAboveSpaceObjectID = i;
          document.getElementById(event.target.id).style.cursor = "pointer";
          drawcolormap_RGBSpace(analysisColormap, "id_canvasRG","id_canvasRB","id_canvasBG", false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
          break;
        }

      }
    }
  }


  // check if mouse is inside of Colorspace
  var tmpColor;

  //document.getElementById("id_huePositionLabel").innerHTML = "";

  var val1 = (mousePosX-xStart)/xWidth;
  var val2 = (yStart-mousePosY)/yHeight;

  if (val1>=0 && val1<=1 && val2>=0 && val2<=1){


    switch (event.target.id) {
      case "id_canvasRG":
        tmpColor = new classColor_RGB(val1,val2,updateCurrentValue);
        //document.getElementById("id_huePositionLabel").innerHTML = "A : "+ aVal.toFixed(numDecimalPlaces) +", B : "+ bVal.toFixed(numDecimalPlaces);
        break;
      case "id_canvasRB":
        tmpColor = new classColor_RGB(val1,updateCurrentValue,val2);
        //document.getElementById("id_huePositionLabel").innerHTML = "A : "+ aVal.toFixed(numDecimalPlaces) +", B : "+ bVal.toFixed(numDecimalPlaces);
        break;
      case "id_canvasBG":
        tmpColor = new classColor_RGB(updateCurrentValue,val2,val1);
        //document.getElementById("id_huePositionLabel").innerHTML = "A : "+ aVal.toFixed(numDecimalPlaces) +", B : "+ bVal.toFixed(numDecimalPlaces);
        break;
      default:
        return;
    }

  }


  // if inside of colorelement
  if(mouseGrappedSpaceObjectID != -1){

      //draw the colorspace new
      if(updateSketchID1 != -1)
          bandSketch.setC1(tmpColor, updateSketchID1);

      if(updateSketchID2 != -1)
          bandSketch.setC2(tmpColor, updateSketchID2);

      orderColorSketch(colorspaceModus);
      drawcolormap_RGBSpace(analysisColormap, "id_canvasRG","id_canvasRB","id_canvasBG", false); //drawcolormap_hueSpace(analysisColormap, "id_workcanvasAnalyseHue");
        drawAnalyseMapPreviews();
drawAnalyseDifferenceMaps(); 
    }


}

function mouseDownColorspaceRGB(event) {
    if(mouseAboveSpaceObjectID!=-1){
      mouseGrappedSpaceObjectID = mouseAboveSpaceObjectID;

      // Calc Band Index
          var saveNext=true;
          var keyCounter = -1;
          updateSketchID1 = -1;
          updateSketchID2 = -1;
          var bandindex = -1;

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

              saveNext=bandSketch.keyColorEqual(i,0); // if false -> case dual key

          }

          switch(spaceElementsKey[mouseGrappedSpaceObjectID]) {
                  case "twin key1":
                                      if(spaceElementsType[mouseGrappedSpaceObjectID]==true){
                                          updateCurrentValue = getC2CurrentRGBValue(bandindex,event.target.id);
                                          updateSketchID1 = -1;
                                          updateSketchID2 = bandindex;
                                      }
                                      else{
                                          updateCurrentValue = getC1CurrentRGBValue(bandindex,event.target.id);
                                          updateSketchID1 = bandindex;
                                          updateSketchID2 = bandindex;
                                      }
                                      break;
                  case "twin key2":
                                      updateCurrentValue = getC1CurrentRGBValue(bandindex,event.target.id);
                                      updateSketchID1 = bandindex; // +1 because the first band inde
                                      updateSketchID2 = -1;
                                      break;
                  case "left key1":
                                      if(spaceElementsType[mouseGrappedSpaceObjectID]==true){
                                          updateCurrentValue = getC2CurrentRGBValue(bandindex,event.target.id);
                                          updateSketchID1 = -1;
                                          updateSketchID2 = bandindex;
                                      }
                                      else{
                                          updateCurrentValue = getC1CurrentRGBValue(bandindex,event.target.id);
                                          updateSketchID1 = bandindex;
                                          updateSketchID2 = bandindex;
                                      }
                                      break;
                  case "dual key":
                                      updateCurrentValue = getC2CurrentRGBValue(bandindex,event.target.id);
                                      updateSketchID1 = bandindex+1;
                                      updateSketchID2 = bandindex;
                                      break;
                  case "right key":
                                      updateCurrentValue =  getC1CurrentRGBValue(bandindex,event.target.id);
                                      updateSketchID1 = bandindex;
                                      updateSketchID2 = -1;
                                      break;
                  default:
                      updateSketchID1 = -1;
                      updateSketchID2 = -1;
          }

            drawcolormap_RGBSpace(analysisColormap, "id_canvasRG","id_canvasRB","id_canvasBG", true);
      }

}

function getC1CurrentRGBValue(index,id){

  switch (id) {
    case "id_canvasRG":
      return bandSketch.getC1Color(index,"rgb").getBValue();
      break;
    case "id_canvasRB":
      return bandSketch.getC1Color(index,"rgb").getGValue();
      break;
    case "id_canvasBG":
      return bandSketch.getC1Color(index,"rgb").getRValue();
      break;
    default:
    console.log("Error at the getC1CurrentValue function");
    return;
  }

}

function getC2CurrentRGBValue(index,id){

  switch (id) {
    case "id_canvasRG":
      return bandSketch.getC2Color(index,"rgb").getBValue();
      break;
    case "id_canvasRB":
      return bandSketch.getC2Color(index,"rgb").getGValue();
      break;
    case "id_canvasBG":
      return bandSketch.getC2Color(index,"rgb").getRValue();
      break;
    default:
    console.log("Error at the getC1CurrentValue function");
    return;
  }

}


function mouseUpColorspaceRGB() {
  mouseGrappedSpaceObjectID=-1;
  drawcolormap_RGBSpace(analysisColormap, "id_canvasRG","id_canvasRB","id_canvasBG", true);
}
