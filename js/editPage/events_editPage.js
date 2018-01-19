function editPage_drawKeys(canvasID, tmpColormap){

    keyRectPoint = [];

    var canvasObject = document.getElementById(canvasID);
    canvasObject.width = key_resolution_X;
    canvasObject.height = key_resolution_Y;

    var canvasContex = canvasObject.getContext("2d");
    //canvasContex.clearRect(0, 0, key_resolution_X, key_resolution_Y);
    var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);


    //////////////////////////////////////////////////////////////

    var colormapWidth = key_resolution_X * 0.95;
    var xPos = key_resolution_X * 0.025;
    var yPos = key_resolution_Y;

    var twinStarted = false;
    var leftStarted = false;

    var distanceColorrects = key_resolution_Y / 6;
    var bandWidth = colormapWidth/bandSketch.getBandLenght();

    var labelFontSize = key_resolution_Y / 6;
    colorrectHeigth = key_resolution_Y / 3;
    colorrectWitdh = key_resolution_X / 50;

    // draw keys
    for (var i = 0; i < tmpColormap.getNumColors(); i++) {

      var tmpKey = tmpColormap.getKey(i);

      var colorrectYPos = yPos - distanceColorrects - colorrectHeigth;
      var colorrectXPos = xPos - (colorrectWitdh / 2);

      var text = ""+(i+1);
      canvasContex.font = labelFontSize+"px Arial";
      canvasContex.fillStyle = 'rgb(0,0,0)';
      canvasContex.fillText(text,xPos-(labelFontSize/2),colorrectYPos-labelFontSize);


      switch (tmpKey) {
        case "nil key":

          canvasContex.beginPath();
          canvasContex.lineWidth = 1;
          canvasContex.moveTo(xPos, yPos);
          canvasContex.lineTo(xPos, yPos - distanceColorrects);
          canvasContex.strokeStyle = 'rgb(0,0,0)';
          canvasContex.stroke();


          //var colorrectYPos = yPos - distanceColorrects - colorrectHeigth;
          //var colorrectXPos = xPos - (colorrectWitdh / 2);


          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, "rgb(125,125,125)", true);

          var tmpArray = [colorrectXPos, colorrectYPos];
          keyRectPoint.push(tmpArray);

          xPos+=bandWidth;
          break;
        case "twin key":

          if (twinStarted == true) {
            twinStarted = false;
          } else {

            var rgbColor1 = tmpColormap.getRGBColor(i).getRGBString();
            var rgbColor2 = tmpColormap.getRGBColor(i + 1).getRGBString();

            canvasContex.beginPath();
            canvasContex.lineWidth = 1;
            canvasContex.moveTo(xPos, yPos);
            canvasContex.lineTo(xPos, yPos - distanceColorrects);
            canvasContex.strokeStyle = 'rgb(0,0,0)';
            canvasContex.stroke();


            //var colorrectYPos = yPos - distanceColorrects - colorrectHeigth;
            //var colorrectXPos = xPos - (colorrectWitdh / 2);

            var tmpArray = [colorrectXPos, colorrectYPos];
            keyRectPoint.push(tmpArray);

            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, rgbColor1, false);
            var colorrectXPos = xPos;
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, rgbColor2, false);

            xPos+=bandWidth;

            twinStarted = true;

          }

          break;
        case "left key":
          if (leftStarted == true) {

            leftStarted = false;

          } else {
            var pos1 = (tmpColormap.getPosition(i) - tmpColormap.getRangeStart()) / (tmpColormap.getRangeEnd() - tmpColormap.getRangeStart()) * colormapWidth;
            var rgbColor1 = tmpColormap.getRGBColor(i).getRGBString();

            canvasContex.beginPath();
            canvasContex.lineWidth = 1;
            canvasContex.moveTo(xPos, yPos);
            canvasContex.lineTo(xPos, yPos - distanceColorrects);
            canvasContex.strokeStyle = 'rgb(0,0,0)';
            canvasContex.stroke();


            //var colorrectYPos = yPos - distanceColorrects - colorrectHeigth;
            //var colorrectXPos = xPos - (colorrectWitdh / 2);

            var tmpArray = [colorrectXPos, colorrectYPos];
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, rgbColor1, false);
            var colorrectXPos = xPos;
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, "rgb(125,125,125)", true);

            leftStarted = true;

            xPos+=bandWidth;
          }
          break;
        case "right key":

          var rgbColor1 = tmpColormap.getRGBColor(i).getRGBString();

          var pos1 = (tmpColormap.getPosition(i) - tmpColormap.getRangeStart()) / (tmpColormap.getRangeEnd() - tmpColormap.getRangeStart()) * colormapWidth;

          canvasContex.beginPath();
          canvasContex.lineWidth = 1;
          canvasContex.moveTo(xPos, yPos);
          canvasContex.lineTo(xPos, yPos - distanceColorrects);
          canvasContex.strokeStyle = 'rgb(0,0,0)';
          canvasContex.stroke();


          //var colorrectYPos = yPos - distanceColorrects - colorrectHeigth;
          //var colorrectXPos = xPos - (colorrectWitdh / 2);

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, "rgb(125,125,125)", true);
          var colorrectXPos = xPos;
          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, rgbColor1, false);

          xPos+=bandWidth;

          var tmpArray = [colorrectXPos, colorrectYPos];
          keyRectPoint.push(tmpArray);

          break;
        default:
          var rgbColor1 = tmpColormap.getRGBColor(i).getRGBString();


          var pos1 = (tmpColormap.getPosition(i) - tmpColormap.getRangeStart()) / (tmpColormap.getRangeEnd() - tmpColormap.getRangeStart()) * colormapWidth;


          ////
          canvasContex.beginPath();
          canvasContex.lineWidth = 1;
          canvasContex.moveTo(xPos, yPos);
          canvasContex.lineTo(xPos, yPos - distanceColorrects);
          canvasContex.strokeStyle = 'rgb(0,0,0)';
          canvasContex.stroke();


          //var colorrectYPos = yPos - distanceColorrects - colorrectHeigth;
          //var colorrectXPos = xPos - (colorrectWitdh / 2);

          var tmpArray = [colorrectXPos, colorrectYPos];
          keyRectPoint.push(tmpArray);

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, rgbColor1, false);

          xPos+=bandWidth;

      }

    }


}
