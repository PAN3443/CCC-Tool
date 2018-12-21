function drawCanvasColormap(canvasID, tmpCMS) { //1920,150

  // start
  var canvasObject = document.getElementById(canvasID);
  var canvasRect = canvasObject.getBoundingClientRect();
  canvasObject.width = canvasRect.width;
  canvasObject.height = 1; //canvasRect.height;

  var canvasContex = canvasObject.getContext("2d");
  canvasContex.mozImageSmoothingEnabled = false;
  canvasContex.webkitImageSmoothingEnabled = false;
  canvasContex.msImageSmoothingEnabled = false;
  canvasContex.imageSmoothingEnabled = false; // did not work !?!?!
  canvasContex.oImageSmoothingEnabled = false;

  /*if(canvasObject.width<1) // because of display
    canvasObject.width=100;*/

  var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);

  /////////////////////////////////////////////////////////

  var colormapWidth = canvasObject.width;
  var xPos = 0;
  var yPos = 0;
  var colormapHeigth = canvasObject.height;

  // draw colormap
  for (var i = 0; i < tmpCMS.getKeyLength()-1; i++) {

    var pos1 = Math.round((tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth);
    var pos2 = Math.round((tmpCMS.getRefPosition(i+1) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth);
    var elementwidth = pos2 - pos1;

    switch (tmpCMS.getKeyType(i)) {
      case "nil key": case "left key":
        canvasData = createConstantBand(canvasData, xPos + pos1, elementwidth, colormapHeigth, tmpCMS.getLeftKeyColor(i+1,globalCMS1.getInterpolationSpace()), canvasObject.width);
        break;
      default:
        canvasData = createScaledBand(canvasData, xPos + pos1, elementwidth, colormapHeigth, tmpCMS.getRightKeyColor(i,globalCMS1.getInterpolationSpace()), tmpCMS.getLeftKeyColor(i+1,globalCMS1.getInterpolationSpace()), canvasObject.width);
    }

  }
  canvasContex.putImageData(canvasData, 0, 0);


}
