function drawCanvasColormap(canvasID, tmpCMS ) { //1920,150

  // start
  var canvasObject = document.getElementById(canvasID);
  var canvasRect = canvasObject.getBoundingClientRect();

  if(canvasRect.width>1)
    canvasObject.width = canvasRect.width;
  else
    canvasObject.width = 500;

  canvasObject.height = 1; //canvasRect.height;

  var canvasContex = canvasObject.getContext("2d");
  /*canvasContex.mozImageSmoothingEnabled = false;
  canvasContex.webkitImageSmoothingEnabled = false;
  canvasContex.msImageSmoothingEnabled = false;
  canvasContex.imageSmoothingEnabled = false; // did not work !?!?!
  canvasContex.oImageSmoothingEnabled = false;*/

  var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);

  /////////////////////////////////////////////////////////

  var xPos = 0;
  var yPos = 0;

  // draw colormap
  for (var i = 0; i < tmpCMS.getKeyLength()-1; i++) {

    var linearKey_xPos = Math.round((tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.width);

    switch (tmpCMS.getKeyType(i)) {
      case "nil key": case "left key":
        canvasData = createConstantBand(canvasData, linearKey_xPos, 0, elementwidth, canvasObject.height, tmpCMS.getLeftKeyColor(i+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
        break;
      default:

      if((tmpCMS.getInterpolationSpace()==="de94-ds" || tmpCMS.getInterpolationSpace()==="de2000-ds" || tmpCMS.getInterpolationType()==="spline") && tmpCMS.getIntervalLength(i)>0){

        var linearKey_Sub_xPos = linearKey_xPos;

        // from left key to first interval
        var elementwidth = Math.round((tmpCMS.getIntervalRef(i,0) - tmpCMS.getRefPosition(i)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.width);
        canvasData = createScaledBand(canvasData,linearKey_Sub_xPos, 0, elementwidth, canvasObject.height, tmpCMS.getRightKeyColor(i,tmpCMS.getInterpolationSpace()), tmpCMS.getIntervalColor(i,0,tmpCMS.getInterpolationSpace()), canvasObject.width);
        canvasContex.putImageData(canvasData, 0, 0);
          // between intervals
        for (var j = 0; j < tmpCMS.getIntervalLength(i)-1; j++) {
          var tmpTest = linearKey_Sub_xPos;
          linearKey_Sub_xPos += elementwidth;
          elementwidth = Math.round((tmpCMS.getIntervalRef(i,j+1) - tmpCMS.getIntervalRef(i,j)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.width);
          canvasData = createScaledBand(canvasData,linearKey_Sub_xPos, 0, elementwidth, canvasObject.height, tmpCMS.getIntervalColor(i,j,tmpCMS.getInterpolationSpace()), tmpCMS.getIntervalColor(i,j+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
          canvasContex.putImageData(canvasData, 0, 0);
        }
        // from last interval to last key
        linearKey_Sub_xPos += elementwidth;
        var tmpEndPos = Math.round((tmpCMS.getRefPosition(i+1) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.width);
        elementwidth = (tmpEndPos-linearKey_Sub_xPos);
        canvasData = createScaledBand(canvasData,linearKey_Sub_xPos, 0, elementwidth, canvasObject.height, tmpCMS.getIntervalColor(i,tmpCMS.getIntervalLength(i)-1,tmpCMS.getInterpolationSpace()), tmpCMS.getLeftKeyColor(i+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
      }
      else{
        var elementwidth = Math.round((tmpCMS.getRefPosition(i+1) - tmpCMS.getRefPosition(i)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.width);
        canvasData = createScaledBand(canvasData, linearKey_xPos, 0, elementwidth, canvasObject.height, tmpCMS.getRightKeyColor(i,tmpCMS.getInterpolationSpace()), tmpCMS.getLeftKeyColor(i+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
      }

    }

  }
  canvasContex.putImageData(canvasData, 0, 0);


}


function drawCanvasColormapHorizontal(canvasID, tmpCMS, height, width ) {

  // start
  var canvasObject = document.getElementById(canvasID);
  canvasObject.height = height;
  canvasObject.width = width;
  var canvasContex = canvasObject.getContext("2d");

  var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);

  /////////////////////////////////////////////////////////

  var xPos = 0;
  var yPos = 0;
  // draw colormap
  for (var i = 0; i < tmpCMS.getKeyLength()-1; i++) {

    /*var pos1 = Math.round((tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.width);
    var pos2 = Math.round((tmpCMS.getRefPosition(i+1) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.width);
    var elementwidth = pos2 - pos1;*/

    var linearKey_xPos = Math.round((tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.width);
    var elementwidth = Math.round((tmpCMS.getRefPosition(i+1) - tmpCMS.getRefPosition(i)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.width);

    switch (tmpCMS.getKeyType(i)) {
      case "nil key": case "left key":
        canvasData = createConstantBand(canvasData, xPos + pos1, 0, elementwidth, canvasObject.height, tmpCMS.getLeftKeyColor(i+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
        break;
      default:
      if((tmpCMS.getInterpolationSpace()==="de94-ds" || tmpCMS.getInterpolationSpace()==="de2000-ds" || tmpCMS.getInterpolationType()==="spline") && tmpCMS.getIntervalLength(i)>0){

        var linearKey_Sub_xPos = linearKey_xPos;

        // from left key to first interval
        elementwidth = Math.round((tmpCMS.getIntervalRef(i,0) - tmpCMS.getRefPosition(i)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.width);
        canvasData = createScaledBand(canvasData,linearKey_Sub_xPos, 0, elementwidth, canvasObject.height, tmpCMS.getRightKeyColor(i,tmpCMS.getInterpolationSpace()), tmpCMS.getIntervalColor(i,0,tmpCMS.getInterpolationSpace()), canvasObject.width);

          // between intervals
        for (var j = 0; j < tmpCMS.getIntervalLength(i)-1; j++) {
          linearKey_Sub_xPos += elementwidth;
          elementwidth = Math.round((tmpCMS.getIntervalRef(i,j+1) - tmpCMS.getIntervalRef(i,j)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.width);
          canvasData = createScaledBand(canvasData,linearKey_Sub_xPos, 0, elementwidth, canvasObject.height, tmpCMS.getIntervalColor(i,j,tmpCMS.getInterpolationSpace()), tmpCMS.getIntervalColor(i,j+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
        }
        // from last interval to last key
        linearKey_Sub_xPos += elementwidth;
        var tmpEndPos = editCMS_cmsArea_x1+Math.round((tmpCMS.getRefPosition(i+1) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.width);
        elementwidth = (tmpEndPos-linearKey_Sub_xPos);
        canvasData = createScaledBand(canvasData,linearKey_Sub_xPos, 0, elementwidth, canvasObject.height, tmpCMS.getIntervalColor(i,tmpCMS.getIntervalLength(i)-1,tmpCMS.getInterpolationSpace()), tmpCMS.getLeftKeyColor(i+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
      }
      else
        canvasData = createScaledBand(canvasData, linearKey_xPos, 0, elementwidth, canvasObject.height, tmpCMS.getRightKeyColor(i,tmpCMS.getInterpolationSpace()), tmpCMS.getLeftKeyColor(i+1,tmpCMS.getInterpolationSpace()), canvasObject.width);

    }

  }
  canvasContex.putImageData(canvasData, 0, 0);

}


function drawCanvasColormapVertical(canvasID, tmpCMS, height, width) {

  // start
  var canvasObject = document.getElementById(canvasID);
  canvasObject.height = height;
  canvasObject.width = width;
  var canvasContex = canvasObject.getContext("2d");

  var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);

  /////////////////////////////////////////////////////////

  // draw colormap
  for (var i = 0; i < tmpCMS.getKeyLength()-1; i++) {

    /*var pos1 = Math.round((tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.height);
    var pos2 = Math.round((tmpCMS.getRefPosition(i+1) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.height);
    var elementheight = pos2 - pos1;*/

    var linearKey_yPos = Math.round((tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.height);
    var elementheight = Math.round((tmpCMS.getRefPosition(i+1) - tmpCMS.getRefPosition(i)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.height);

    switch (tmpCMS.getKeyType(i)) {
      case "nil key": case "left key":
        canvasData = createConstantBandVertical(canvasData, canvasObject.height-pos1, 0, canvasObject.width,elementheight, tmpCMS.getLeftKeyColor(i+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
        break;
      default:
      if((tmpCMS.getInterpolationSpace()==="de94-ds" || tmpCMS.getInterpolationSpace()==="de2000-ds" || tmpCMS.getInterpolationType()==="spline") && tmpCMS.getIntervalLength(i)>0){

        var linearKey_Sub_yPos = linearKey_yPos;

        // from left key to first interval
        elementheight = Math.round((tmpCMS.getIntervalRef(i,0) - tmpCMS.getRefPosition(i)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.height);
        canvasData = createScaledBandVertical(canvasData,canvasObject.height-linearKey_Sub_yPos, 0, canvasObject.width, elementheight, tmpCMS.getRightKeyColor(i,tmpCMS.getInterpolationSpace()), tmpCMS.getIntervalColor(i,0,tmpCMS.getInterpolationSpace()), canvasObject.width);

          // between intervals
        for (var j = 0; j < tmpCMS.getIntervalLength(i)-1; j++) {
          linearKey_Sub_yPos += elementheight;
          elementheight = Math.round((tmpCMS.getIntervalRef(i,j+1) - tmpCMS.getIntervalRef(i,j)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.height);
          canvasData = createScaledBandVertical(canvasData,canvasObject.height-linearKey_Sub_yPos, 0, canvasObject.width, elementheight, tmpCMS.getIntervalColor(i,j,tmpCMS.getInterpolationSpace()), tmpCMS.getIntervalColor(i,j+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
        }
        // from last interval to last key
        linearKey_Sub_yPos += elementheight;
        var tmpEndPos = editCMS_cmsArea_x1+Math.round((tmpCMS.getRefPosition(i+1) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * canvasObject.height);
        elementheight = (tmpEndPos-linearKey_Sub_yPos);
        canvasData = createScaledBandVertical(canvasData,canvasObject.height-linearKey_Sub_yPos, 0, canvasObject.width, elementheight, tmpCMS.getIntervalColor(i,tmpCMS.getIntervalLength(i)-1,tmpCMS.getInterpolationSpace()), tmpCMS.getLeftKeyColor(i+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
      }
      else
        canvasData = createScaledBandVertical(canvasData, canvasObject.height-linearKey_yPos, 0, canvasObject.width, elementheight, tmpCMS.getRightKeyColor(i,tmpCMS.getInterpolationSpace()), tmpCMS.getLeftKeyColor(i+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
    }

  }
  canvasContex.putImageData(canvasData, 0, 0);

}
