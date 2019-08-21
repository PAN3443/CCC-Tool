function drawKeys(canvasID, tmpCMS) {

  /*for (var i = refElementContainer.length - 1; i >= 0; i--) {
    refElementContainer[i].remove();
    refElementContainer.pop();
  }*/

  keyRectPoint = [];

  var canvasObject = document.getElementById(canvasID);
  var rect = canvasObject.getBoundingClientRect();
  canvasObject.width = rect.width;
  canvasObject.height = rect.height;

  //var relation = canvasObject.width/canvasObject.height; //rect.height/rect.width;

  var canvasContex = canvasObject.getContext("2d");

  /*canvasContex.mozImageSmoothingEnabled = false;
  canvasContex.webkitImageSmoothingEnabled = false;
  canvasContex.msImageSmoothingEnabled = false;
  canvasContex.imageSmoothingEnabled = false; // did not work !?!?!
  canvasContex.oImageSmoothingEnabled = false;*/

  var strokeWidth = 1;


  //////////////////////////////////////////////////////////////

  var colormapWidth = Math.round(canvasObject.width * 0.9);
  var xPos = Math.round(canvasObject.width * 0.05);
  var yPos = Math.round(canvasObject.height);

  var twinStarted = false;
  var leftStarted = false;

  var distanceColorrects = Math.round(canvasObject.height / 3);


  var colorrectHeigth = Math.round(canvasObject.height);
  colorrectWitdh = colorrectHeigth;

  colorrectHeigth -=2;

  var box = document.getElementById(canvasID).getBoundingClientRect();

  var bandSketchWidth = Math.round(colormapWidth/(tmpCMS.getKeyLength()-1));

  // draw keys
  for (var i = 0; i < tmpCMS.getKeyLength(); i++) {


    var pos1 = Math.round((tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth);

    var colorrectYPos = 1; //yPos - distanceColorrects - colorrectHeigth;
    var colorrectXPos = Math.round(xPos + pos1 - (colorrectWitdh / 2));

    switch (tmpCMS.getKeyType(i)) {
      case "nil key":

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, new classColor_RGB(0.5,0.5,0.5), true);


        break;
      case "twin key":

          keyRectPoint.push(colorrectXPos);

          if(tmpCMS.getMoT(i))
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, Math.round(colorrectHeigth/2), tmpCMS.getRightKeyColor(i,"rgb"), false);
          else
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, Math.round(colorrectHeigth/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);

          colorrectYPos=Math.round(colorrectYPos+colorrectHeigth / 2);

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, Math.round(colorrectWitdh / 2), Math.round(colorrectHeigth/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);
          var colorrectXPos = xPos + pos1;
          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, Math.round(colorrectWitdh / 2), Math.round(colorrectHeigth/2), tmpCMS.getRightKeyColor(i,"rgb"), false);


        break;
      case "left key":

          if(i!=tmpCMS.getKeyLength()-1)
            if(tmpCMS.getMoT(i))
              drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, Math.round(colorrectHeigth/2), tmpCMS.getLeftKeyColor(i+1,"rgb"), false);
            else
              drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, Math.round(colorrectHeigth/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);
          else
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, Math.round(colorrectHeigth/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);

          colorrectYPos=Math.round(colorrectYPos+colorrectHeigth / 2);

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, Math.round(colorrectWitdh / 2), Math.round(colorrectHeigth/2), tmpCMS.getLeftKeyColor(i,"rgb"), false);
          var colorrectXPos = xPos + pos1;
          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, Math.round(colorrectWitdh / 2), Math.round(colorrectHeigth/2), new classColor_RGB(0.5,0.5,0.5), true);

          if (i != tmpCMS.getKeyLength() - 1)
              keyRectPoint.push(colorrectXPos);


        break;
      case "right key":

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, Math.round(colorrectWitdh / 2), colorrectHeigth, new classColor_RGB(0.5,0.5,0.5), true);
        var colorrectXPos = Math.round(xPos + pos1);
        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, Math.round(colorrectWitdh / 2), colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb"), false);



        break;
      default:

        keyRectPoint.push(colorrectXPos);

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb"), false);


    }

  }

}


function drawColorRect(contex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, rgbColor, isGrey) {

  var strokeWidth =1;
  var lineColor =  getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');

  if(doColorblindnessSim){
    var tmpLMS = rgbColor.calcLMSColor();
    rgbColor = tmpLMS.calcColorBlindRGBColor();
  }

  contex.fillStyle = rgbColor.getRGBString();
  contex.fillRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);

  if (isGrey == true) {
    contex.beginPath();
    contex.moveTo(colorrectXPos, colorrectYPos + colorrectHeigth);
    contex.lineTo(colorrectXPos + colorrectWitdh, colorrectYPos);
    contex.strokeStyle = lineColor;
    contex.lineWidth = strokeWidth;
    contex.stroke();
  }

  contex.lineWidth = strokeWidth;
  contex.strokeStyle = lineColor;
  contex.strokeRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);

}
