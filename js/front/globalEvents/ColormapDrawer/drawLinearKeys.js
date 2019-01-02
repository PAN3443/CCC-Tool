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

  var colormapWidth = canvasObject.width * 0.9;
  var xPos = canvasObject.width * 0.05;
  var yPos = canvasObject.height;

  var twinStarted = false;
  var leftStarted = false;

  var distanceColorrects = canvasObject.height / 3;


  var colorrectHeigth = canvasObject.height;
  colorrectWitdh = colorrectHeigth;

  colorrectHeigth -=2;

  var box = document.getElementById(canvasID).getBoundingClientRect();

  var bandSketchWidth = Math.round(colormapWidth/(tmpCMS.getKeyLength()-1));
  // draw keys
  for (var i = 0; i < tmpCMS.getKeyLength(); i++) {


    var pos1 = (tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth;

    var colorrectYPos = 1; //yPos - distanceColorrects - colorrectHeigth;
    var colorrectXPos = xPos + pos1 - (colorrectWitdh / 2);

    switch (tmpCMS.getKeyType(i)) {
      case "nil key":

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, "rgb(125,125,125)", true);


        break;
      case "twin key":

          keyRectPoint.push(colorrectXPos);

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
              keyRectPoint.push(colorrectXPos);


        break;
      case "right key":

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, "rgb(125,125,125)", true);
        var colorrectXPos = xPos + pos1;
        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);



        break;
      default:

        keyRectPoint.push(colorrectXPos);

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);


    }

  }

}


function drawColorRect(contex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, rgbColor, isGrey) {

  var strokeWidth =1;

  contex.fillStyle = rgbColor;
  contex.fillRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);

  if (isGrey == true) {
    contex.beginPath();
    contex.moveTo(colorrectXPos, colorrectYPos + colorrectHeigth);
    contex.lineTo(colorrectXPos + colorrectWitdh, colorrectYPos);
    contex.strokeStyle = 'rgb(0,0,0)';
    contex.lineWidth = strokeWidth;
    contex.stroke();
  }

  contex.lineWidth = strokeWidth;
  contex.strokeStyle = 'rgb(0,0,0)';
  contex.strokeRect(colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth);

}
