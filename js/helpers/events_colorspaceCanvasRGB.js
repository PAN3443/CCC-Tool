/////////////////////////////////////
// -------------Event COLORSPACE HUE---------------//
/////////////////////////////////////

function mouseLeaveColorspaceRGB(event) {

  document.getElementById(event.target.id).style.cursor = "default";
  clearInterval(timer2DAnimation);
   //document.getElementById("id_huePositionLabel").innerHTML = "";
  mouseAboveKeyID = -1;
  mouseGrappedColorSide = -1;
  if (mouseGrappedKeyID != -1) {
    mouseGrappedKeyID = -1;

      drawcolormap_RGBSpace(true,true);


  }
}



function rgb2DAnimation(){

  orderColorSketch(colorspaceModus);

  drawcolormap_RGBSpace(false,true);

}

function mouseMoveColorspaceRGB(event) {
  var index;
  switch (event.target.id) {
    case "id_canvasRGModiyTop":
      index=0;
      break;
    case "id_canvasRBModiyTop":
      index=1;
      break;
    case "id_canvasBGModiyTop":
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

  if(mouseGrappedKeyID==-1){
      for (var i = 0; i < spaceElementsType.length; i++) {

        if (mouseAboveKeyID == spaceElementsKey[i]) {
          if (spaceElementsType[i] == true) {
            // Circle -> Part of Scaled Band
            var dis = Math.sqrt(Math.pow(spaceElementsXPos[i][index] - mousePosX, 2) + Math.pow(spaceElementsYPos[i][index] - mousePosY, 2));
            if (dis > bigcircleRad) {
              mouseAboveKeyID = -1;
              mouseGrappedColorSide = -1;

                  drawcolormap_RGBSpace(false,false);

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
                mouseAboveKeyID = -1;
                mouseGrappedColorSide = -1;

                drawcolormap_RGBSpace(false,false);

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
            mouseAboveKeyID = spaceElementsKey[i];
            mouseGrappedColorSide = spaceElementsColor[i];
            document.getElementById(event.target.id).style.cursor = "pointer";
            drawcolormap_RGBSpace(false,false);
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
              mouseAboveKeyID = spaceElementsKey[i];
              mouseGrappedColorSide = spaceElementsColor[i];
              document.getElementById(event.target.id).style.cursor = "pointer";

                drawcolormap_RGBSpace(false,false);

              break;
            }

          }
        }
      }
  }
  else{

    // check if mouse is inside of Colorspace
    var tmpColor;

    //document.getElementById("id_huePositionLabel").innerHTML = "";

    var val1 = (mousePosX-xStart)/xWidth;
    var val2 = (yStart-mousePosY)/yHeight;

    if (val1>=0 && val1<=1 && val2>=0 && val2<=1){

      switch (event.target.id) {
        case "id_canvasRGModiyTop":
          tmpColor = new classColor_RGB(val1,val2,updateCurrentValue);
          break;
        case "id_canvasRBModiyTop":
          tmpColor = new classColor_RGB(val1,updateCurrentValue,val2);
          break;
        case "id_canvasBGModiyTop":
          tmpColor = new classColor_RGB(updateCurrentValue,val2,val1);
          break;
        default:
          return;
      }

    }
    else {
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

        if(showSpace==1){

          var newPos = updateCurrentValue*255-128;
          var plane_geometry = new THREE.PlaneGeometry( 256, 256, 1, 1 );
          plane_material = new THREE.MeshLambertMaterial({ color: 0xbdbdbd, side: THREE.DoubleSide });
          //plane_material.transparent = true;
          //plane_material.opacity =  1;
          var plane = new THREE.Mesh( plane_geometry, plane_material );

          switch (event.target.id) {
            case "id_canvasRGModiyTop":
              //tmpColor = new classColor_RGB(val1,val2,updateCurrentValue);
              plane.position.x = 0;
              plane.position.y = 0;
              plane.position.z = newPos;
              break;
            case "id_canvasRBModiyTop":
              //tmpColor = new classColor_RGB(val1,updateCurrentValue,val2);
              plane.rotation.x = Math.PI/2;
              plane.position.x = 0;
              plane.position.y = newPos;
              plane.position.z = 0;

              break;
            case "id_canvasBGModiyTop":
              //tmpColor = new classColor_RGB(updateCurrentValue,val2,val1);
              plane.rotation.y = Math.PI+Math.PI/2;
              plane.position.x = newPos;
              plane.position.y = 0;
              plane.position.z = 0;
              break;
            default:
              return;
          }
          colormapRGB3D.add( plane );
        }


    }


}

function mouseDownColorspaceRGB(event) {
    if(mouseAboveKeyID!=-1){


      timer2DAnimation = setInterval(rgb2DAnimation, animationInterval);
      // Calc Band Index

      mouseGrappedKeyID = mouseAboveKeyID;

      var tmpColor;
      switch (mouseGrappedColorSide) {
        case 0:
        // left color
          tmpColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "rgb");
          break;
        case 1:
          // right color
          tmpColor = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "rgb");
          break;
        default:
          // one of both colors
          tmpColor = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "rgb");
      }

      switch (event.target.id) {
        case "id_canvasRGModiyTop":
          updateCurrentValue=tmpColor.getBValue();
          break;
        case "id_canvasRBModiyTop":
          updateCurrentValue=tmpColor.getGValue();
          break;
        case "id_canvasBGModiyTop":
          updateCurrentValue=tmpColor.getRValue();
          break;
        default:
        console.log("Error: function mouseDownColorspaceRGB");
        return;
      }

      drawcolormap_RGBSpace(true,false);


          if(showSpace==1){
            var newPos = updateCurrentValue*255-128;
            var plane_geometry = new THREE.PlaneGeometry( 256, 256, 1, 1 );
            plane_material = new THREE.MeshLambertMaterial({ color: 0xbdbdbd, side: THREE.DoubleSide });
            //plane_material.transparent = true;
            //plane_material.opacity = 1;
            var plane = new THREE.Mesh( plane_geometry, plane_material );

            switch (event.target.id) {
              case "id_canvasRGModiyTop":
                //tmpColor = new classColor_RGB(val1,val2,updateCurrentValue);
                plane.position.x = 0;
                plane.position.y = 0;
                plane.position.z = newPos;
                break;
              case "id_canvasRBModiyTop":
                //tmpColor = new classColor_RGB(val1,updateCurrentValue,val2);
                plane.rotation.x = Math.PI/2;
                plane.position.x = 0;
                plane.position.y = newPos;
                plane.position.z = 0;

                break;
              case "id_canvasBGModiyTop":
                //tmpColor = new classColor_RGB(updateCurrentValue,val2,val1);
                plane.rotation.y = Math.PI+Math.PI/2;
                plane.position.x = newPos;
                plane.position.y = 0;
                plane.position.z = 0;
                break;
              default:
                return;
            }
            colormapRGB3D.add( plane );
          }
      }

}


function mouseUpColorspaceRGB() {
  mouseGrappedKeyID=-1;
  mouseGrappedColorSide=-1;
  clearInterval(timer2DAnimation);
  drawcolormap_RGBSpace(true,true);
}
