function drawCanvasColormap(canvasID, resolutionX, resolutionY, tmpCMS) { //1920,150

  // start
  var canvasObject = document.getElementById(canvasID);

  canvasObject.width = resolutionX;
  canvasObject.height = resolutionY;

  var canvasContex = canvasObject.getContext("2d");
  //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
  var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);

  /////////////////////////////////////////////////////////

  var colormapWidth = resolutionX;
  var xPos = 0;
  var yPos = 0;
  var colormapHeigth = resolutionY;

  // draw colormap
  for (var i = 0; i < tmpCMS.getKeyLength()-1; i++) {

    var pos1 = Math.round((tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth);
    var pos2 = Math.round((tmpCMS.getRefPosition(i+1) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth);
    var elementwidth = pos2 - pos1;

    switch (tmpCMS.getKeyType(i)) {
      case "nil key": case "left key":
        canvasData = createConstantBand(canvasData, xPos + pos1, elementwidth, colormapHeigth, tmpCMS.getLeftKeyColor(i+1,colorspaceModus), resolutionX);
        break;
      default:
        canvasData = createScaledBand(canvasData, xPos + pos1, elementwidth, colormapHeigth, tmpCMS.getRightKeyColor(i,colorspaceModus), tmpCMS.getLeftKeyColor(i+1,colorspaceModus), resolutionX);
    }

  }
  canvasContex.putImageData(canvasData, 0, 0);
  //canvasContex.lineWidth = 2;
  //canvasContex.strokeStyle = 'rgb(0,0,0)';
  //canvasContex.strokeRect(0, 0, colormapWidth, colormapHeigth);


}
