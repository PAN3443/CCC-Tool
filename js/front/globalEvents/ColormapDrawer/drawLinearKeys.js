function drawKeys(canvasID, resolutionX, resolutionY, tmpCMS) {

  /*for (var i = refElementContainer.length - 1; i >= 0; i--) {
    refElementContainer[i].remove();
    refElementContainer.pop();
  }*/

  keyRectPoint = [];

  var canvasObject = document.getElementById(canvasID);
  canvasObject.width = key_resolution_X;
  canvasObject.height = key_resolution_Y;

  var relation = window.innerHeight/window.innerWidth; //key_resolution_Y/key_resolution_X;

  var canvasContex = canvasObject.getContext("2d");
  //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
  var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);


  //////////////////////////////////////////////////////////////

  var colormapWidth = resolutionX * 0.9;
  var xPos = resolutionX * 0.05;
  var yPos = resolutionY;

  var twinStarted = false;
  var leftStarted = false;

  var distanceColorrects = resolutionY / 3;


  colorrectHeigth = resolutionY;
  colorrectWitdh = (colorrectHeigth*relation)/2;

  var box = document.getElementById(canvasID).getBoundingClientRect();

  var bandSketchWidth = Math.round(colormapWidth/(tmpCMS.getKeyLength()-1));
  // draw keys
  for (var i = 0; i < tmpCMS.getKeyLength(); i++) {


    var pos1 = (tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth;

    var colorrectYPos = 1; //yPos - distanceColorrects - colorrectHeigth;
    var colorrectXPos = xPos + pos1 - (colorrectWitdh / 2);
    var tmpArray = [colorrectXPos, colorrectYPos];


    switch (tmpCMS.getKeyType(i)) {
      case "nil key":

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, "rgb(125,125,125)", true);


        break;
      case "twin key":

          keyRectPoint.push(tmpArray);

          if(tmpCMS.getMoT(i))
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);
          else
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);

          colorrectYPos=colorrectYPos+colorrectHeigth / 2;

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);
          var colorrectXPos = xPos + pos1;
          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/2, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);


        break;
      case "left key":

          if(i!=tmpCMS.getKeyLength()-1)
            if(tmpCMS.getMoT(i))
              drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i+1,"rgb").getRGBString(), false);
            else
              drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);
          else
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);

          colorrectYPos=colorrectYPos+colorrectHeigth / 2;

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);
          var colorrectXPos = xPos + pos1;
          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/2, "rgb(125,125,125)", true);

          if (i != tmpCMS.getKeyLength() - 1)
              keyRectPoint.push(tmpArray);


        break;
      case "right key":

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, "rgb(125,125,125)", true);
        var colorrectXPos = xPos + pos1;
        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);



        break;
      default:

        keyRectPoint.push(tmpArray);

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);


    }

  }

}


function drawColorRect(contex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, rgbColor, isGrey) {

  contex.fillStyle = rgbColor;
  contex.fillRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);

  if (isGrey == true) {
    contex.beginPath();
    contex.moveTo(colorrectXPos, colorrectYPos + colorrectHeigth);
    contex.lineTo(colorrectXPos + colorrectWitdh, colorrectYPos);
    contex.strokeStyle = 'rgb(0,0,0)';
    contex.lineWidth = 1;
    contex.stroke();
  }

  contex.lineWidth = 1;
  contex.strokeStyle = 'rgb(0,0,0)';
  contex.strokeRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);

}
