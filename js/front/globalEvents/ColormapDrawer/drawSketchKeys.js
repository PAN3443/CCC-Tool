function drawSketchKeys(canvasID, tmpCMS){

    var canvasObject = document.getElementById(canvasID);
    canvasObject.width = key_resolution_X;
    canvasObject.height = key_resolution_Y;

    var canvasContex = canvasObject.getContext("2d");
    var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);

    //////////////////////////////////////////////////////////////

    var colormapWidth = key_resolution_X * 0.95;
    var xPos = key_resolution_X * 0.025;
    var yPos = key_resolution_Y;

    var distanceColorrects = key_resolution_Y / 6;
    var bandWidth = colormapWidth/(tmpCMS.getKeyLength()-1);

    var labelFontSize = key_resolution_Y / 6;
    colorrectHeigth = key_resolution_Y / 3;
    colorrectWitdh = key_resolution_X / 50;

    // draw keys
    for (var i = 0; i < tmpCMS.getKeyLength(); i++) {

      var tmpKey = tmpCMS.getKeyType(i);
      var colorrectYPos = yPos - distanceColorrects - colorrectHeigth;
      var colorrectXPos = xPos - (colorrectWitdh / 2);

      canvasContex.beginPath();
      canvasContex.lineWidth = 1;
      canvasContex.moveTo(xPos, yPos);
      canvasContex.lineTo(xPos, yPos - distanceColorrects);
      canvasContex.strokeStyle = 'rgb(0,0,0)';
      canvasContex.stroke();

      var text = ""+(i+1);
      canvasContex.font = labelFontSize+"px Arial";
      canvasContex.fillStyle = 'rgb(0,0,0)';
      canvasContex.fillText(text,xPos-(labelFontSize/2),colorrectYPos-labelFontSize);

      switch (tmpKey) {
        case "nil key":

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, "rgb(125,125,125)", true);

          xPos+=bandWidth;
          break;
        case "twin key":

            // draw Middle of triple

            if(tmpCMS.getMoT(i))
              drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);
            else
              drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);

            colorrectYPos=colorrectYPos+colorrectHeigth / 2;
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);
            colorrectXPos = xPos;
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/2, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);



            xPos+=bandWidth;

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
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/ 2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);
            colorrectXPos = xPos;
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/ 2, "rgb(125,125,125)", true);

            leftStarted = true;

            xPos+=bandWidth;

          break;
        case "right key":

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, "rgb(125,125,125)", true);
          colorrectXPos = xPos;
          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);

          xPos+=bandWidth;

          break;
        default:

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);

          xPos+=bandWidth;
      }
    }

}
