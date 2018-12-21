/////////////////////////////////////
// -------------Event COLORSPACE HUE---------------//
/////////////////////////////////////

function mouseLeaveColorspaceRGB(event) {

  document.getElementById(event.target.id).style.cursor = "default";
  clearInterval(timer2DAnimation);

  document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "R : -, G: -, B: -";
   //document.getElementById("id_huePositionLabel").innerHTML = "";
  mouseAboveKeyID = -1;
  mouseGrappedColorSide = -1;
  if (mouseGrappedKeyID != -1) {
    mouseGrappedKeyID = -1;

      drawcolormap_RGBSpace(true,true);


  }
}



function rgb2DAnimation(){

  updateEditPage();

  drawcolormap_RGBSpace(false,true);

}


function getRGBXYPos(tmpColor,xWidth,yHeight,xStart,yStart,mode){

  var position = [0,0];
  switch (mode) {
    case "rg":
          position[0] = tmpColor.getGValue() * xWidth + xStart;
          position[1] = yStart - tmpColor.getRValue() * yHeight;
          break;
    case "rb":
          position[0] = tmpColor.getBValue() * xWidth + xStart;
          position[1] = yStart - tmpColor.getRValue() * yHeight;
          break;
    case "bg":
          position[0] = tmpColor.getGValue() * xWidth + xStart;
          position[1] = yStart - tmpColor.getBValue() * yHeight;
          break;
    default:
        return;

  }

  return position;

}

function mouseMoveColorspaceRGB(event) {

  var mode = "";
  switch (event.target.id) {
    case "id_EditPage_PathPlot_Canvas1_2":
      mode = "rg";
      break;
    case "id_EditPage_PathPlot_Canvas2_2":
      mode = "rb";
      break;
    case "id_EditPage_PathPlot_Canvas3_2":
      mode = "bg";
      break;
    default:
      return;
  }

  // calc mouse pos
  var rect = document.getElementById(event.target.id).getBoundingClientRect();
  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  //var ratioToColorspaceResolutionX = hue_resolution_X / rect.width;
  //var ratioToColorspaceResolutionY = hue_resolution_Y / rect.height;
  mousePosX = canvasPosX;// * ratioToColorspaceResolutionX;
  mousePosY = canvasPosY;// * ratioToColorspaceResolutionY;
  var xStart = document.getElementById(event.target.id).width*0.1;
  var yStart = document.getElementById(event.target.id).height*0.9;
  var xEnd = document.getElementById(event.target.id).width*0.8;
  var yEnd = document.getElementById(event.target.id).height*0.2;
  var xWidth = xEnd-xStart;
  var yHeight =yStart-yEnd;

  // check if mouse is above a element

  if(mouseGrappedKeyID==-1){

    var found = false;
    document.getElementById(event.target.id).style.cursor = "default";
    var oldmouseAboveKeyID = mouseAboveKeyID;


    for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

      var position = [-1,-1];

      switch (globalCMS1.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

        ////////////////////////////////////////////////////////////////
        /////// left Color

          tmpColor = globalCMS1.getLeftKeyColor(i, "rgb");

          var drawCircle = true;
          if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
            drawCircle = false;

          position =  getRGBXYPos(tmpColor,xWidth,yHeight,xStart,yStart,mode);


          if(checkPlotPosition(position[0], position[1], i, 0, drawCircle)){
              displayColor=tmpColor;
              found = true;
              break;
          }


          ////////////////////////////////////////////////////////////////
          /////// Right Color

          tmpColor = globalCMS1.getRightKeyColor(i, "rgb");

          position =  getRGBXYPos(tmpColor,xWidth,yHeight,xStart,yStart,mode);

          if(checkPlotPosition(position[0], position[1], i, 1, drawCircle)){
              displayColor=tmpColor;
              found = true;
          }

          break;
        case "left key":

          var drawCircle = true;
          if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
            drawCircle = false;

          ////////////////////////////////////////////////////////////////
          /////// left Color

          tmpColor = globalCMS1.getLeftKeyColor(i, "rgb");

          position =  getRGBXYPos(tmpColor,xWidth,yHeight,xStart,yStart,mode);

          if(checkPlotPosition(position[0], position[1], i, 0, drawCircle)){
              displayColor=tmpColor;
              found = true;
          }


          ////////////////////////////////////////////////////////
          ///// Right Color

            // do nothing
            break;

          case "right key":

          tmpColor = globalCMS1.getRightKeyColor(i, "rgb"); // right color because of right key

          position = getRGBXYPos(tmpColor,xWidth,yHeight,xStart,yStart,mode);

          if(checkPlotPosition(position[0], position[1], i, 1, drawCircle)){
              displayColor=tmpColor;
              found = true;
          }

          break;
        default:
          // dual Key

          tmpColor = globalCMS1.getRightKeyColor(i, "rgb"); // right color because of right key

          position =  getRGBXYPos(tmpColor,xWidth,yHeight,xStart,yStart,mode);

          if(checkPlotPosition(position[0], position[1], i, 2, drawCircle)){
              displayColor=tmpColor;
              found = true;
          }


      }

      if(found){
        document.getElementById(event.target.id).style.cursor = "pointer";
        break;
      }

    }

    if(oldmouseAboveKeyID!=mouseAboveKeyID)
      drawcolormap_RGBSpace(false,false);
  }
  else{

    // check if mouse is inside of Colorspace
    var tmpColor;

    //document.getElementById("id_huePositionLabel").innerHTML = "";

    var val1 = (mousePosX-xStart)/xWidth;
    var val2 = (yStart-mousePosY)/yHeight;

    if (val1>=0 && val1<=1 && val2>=0 && val2<=1){

      switch (event.target.id) {
        case "id_EditPage_PathPlot_Canvas1_2":
          tmpColor = new classColor_RGB(val2,val1,updateCurrentValue);
          var diplay1Val = Math.round(val2*255);
          var diplay2Val = Math.round(val1*255);
          var diplay3Val = Math.round(updateCurrentValue*255);
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "R : " + diplay1Val + ", G : " + diplay2Val + ", B : " + diplay3Val;
          break;
        case "id_EditPage_PathPlot_Canvas2_2":
          tmpColor = new classColor_RGB(val2,updateCurrentValue,val1);
          var diplay1Val = Math.round(val2*255);
          var diplay2Val = Math.round(updateCurrentValue*255);
          var diplay3Val = Math.round(val1*255);
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "R : " + diplay1Val + ", G : " + diplay2Val + ", B : " + diplay3Val;
          break;
        case "id_EditPage_PathPlot_Canvas3_2":
        tmpColor = new classColor_RGB(updateCurrentValue,val1,val2);
          var diplay1Val = Math.round(updateCurrentValue*255);
          var diplay2Val = Math.round(val2*255);
          var diplay3Val = Math.round(val1*255);
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "R : " + diplay1Val + ", G : " + diplay2Val + ", B : " + diplay3Val;
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
            case "id_EditPage_PathPlot_Canvas1_2":
              //tmpColor = new classColor_RGB(val1,val2,updateCurrentValue);
              plane.position.x = 0;
              plane.position.y = 0;
              plane.position.z = newPos;
              break;
            case "id_EditPage_PathPlot_Canvas2_2":
              //tmpColor = new classColor_RGB(val1,updateCurrentValue,val2);
              plane.rotation.x = Math.PI/2;
              plane.position.x = 0;
              plane.position.y = newPos;
              plane.position.z = 0;

              break;
            case "id_EditPage_PathPlot_Canvas3_2":
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


      var diplay1Val = Math.round(tmpColor.get1Value()*255);
      var diplay2Val = Math.round(tmpColor.get2Value()*255);
      var diplay3Val = Math.round(tmpColor.get3Value()*255);
      document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "R : " + diplay1Val + ", G : " + diplay2Val + ", B : " + diplay3Val;

      switch (event.target.id) {
        case "id_EditPage_PathPlot_Canvas1_2":
          updateCurrentValue=tmpColor.getBValue();
          break;
        case "id_EditPage_PathPlot_Canvas2_2":
          updateCurrentValue=tmpColor.getGValue();
          break;
        case "id_EditPage_PathPlot_Canvas3_2":
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
              case "id_EditPage_PathPlot_Canvas1_2":
                //tmpColor = new classColor_RGB(val1,val2,updateCurrentValue);
                plane.position.x = 0;
                plane.position.y = 0;
                plane.position.z = newPos;
                break;
              case "id_EditPage_PathPlot_Canvas2_2":
                //tmpColor = new classColor_RGB(val1,updateCurrentValue,val2);
                plane.rotation.x = Math.PI/2;
                plane.position.x = 0;
                plane.position.y = newPos;
                plane.position.z = 0;

                break;
              case "id_EditPage_PathPlot_Canvas3_2":
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
  document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "R : -, G: -, B: -";
  clearInterval(timer2DAnimation);
  drawcolormap_RGBSpace(true,true);
}
