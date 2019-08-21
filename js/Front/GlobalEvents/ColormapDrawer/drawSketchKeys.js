function drawSketchKeys(canvasID, tmpCMS){

    var canvasObject = document.getElementById(canvasID);
    var rect = canvasObject.getBoundingClientRect();
    canvasObject.width = rect.width;
    canvasObject.height = rect.height;

    //var relation = window.innerHeight/window.innerWidth; //canvasObject.height/canvasObject.width;

    var canvasContex = canvasObject.getContext("2d");

   /* canvasContex.mozImageSmoothingEnabled = false;
    canvasContex.webkitImageSmoothingEnabled = false;
    canvasContex.msImageSmoothingEnabled = false;
    canvasContex.imageSmoothingEnabled = false; // did not work !?!?!
    canvasContex.oImageSmoothingEnabled = false;*/

    //////////////////////////////////////////////////////////////

    var colormapWidth = canvasObject.width * 0.9;
    var xPos = canvasObject.width * 0.05;
    var yPos = canvasObject.height;

    var bandWidth = colormapWidth/(tmpCMS.getKeyLength()-1);

    var colorrectHeigth = canvasObject.height;
    var colorrectWitdh = canvasObject.height; //(colorrectHeigth*relation)/2;
    colorrectHeigth -=2;
    // draw keys
    for (var i = 0; i < tmpCMS.getKeyLength(); i++) {

      var tmpKey = tmpCMS.getKeyType(i);
      var colorrectYPos = 1;
      var colorrectXPos = xPos - (colorrectWitdh / 2);


      switch (tmpKey) {
        case "nil key":

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, new classColor_RGB(0.5,0.5,0.5), true);

          xPos+=bandWidth;
          break;
        case "twin key":

            // draw Middle of triple

            if(tmpCMS.getMoT(i))
              drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getRightKeyColor(i,"rgb"), false);
            else
              drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb"), false);

            colorrectYPos=colorrectYPos+colorrectHeigth / 2;
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb"), false);
            colorrectXPos = xPos;
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/2, tmpCMS.getRightKeyColor(i,"rgb"), false);



            xPos+=bandWidth;

          break;
        case "left key":

            if(i!=tmpCMS.getKeyLength()-1)
              if(tmpCMS.getMoT(i))
                drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i+1,"rgb"), false);
              else
                drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb"), false);
            else
              drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb"), false);

            colorrectYPos=colorrectYPos+colorrectHeigth / 2;
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/ 2, tmpCMS.getLeftKeyColor(i,"rgb"), false);
            colorrectXPos = xPos;
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/ 2, new classColor_RGB(0.5,0.5,0.5), true);

            leftStarted = true;

            xPos+=bandWidth;

          break;
        case "right key":

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, new classColor_RGB(0.5,0.5,0.5), true);
          colorrectXPos = xPos;
          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb"), false);

          xPos+=bandWidth;

          break;
        default:

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb"), false);

          xPos+=bandWidth;
      }
    }

}


function drawKeyNumber(canvasID, tmpCMS){

    var lineColor =  getComputedStyle(document.documentElement).getPropertyValue('--main-font-color');

    var canvasObject = document.getElementById(canvasID);
    var rect = canvasObject.getBoundingClientRect();
    canvasObject.width = rect.width; //canvasObject.width;
    canvasObject.height = rect.height; //canvasObject.height;


    var canvasContex = canvasObject.getContext("2d");

    //////////////////////////////////////////////////////////////

    var colormapWidth = canvasObject.width * 0.9;
    var xPos = canvasObject.width * 0.05;
    var yPos = canvasObject.height;

    var distanceColorrects = canvasObject.height / 6;
    var bandWidth = colormapWidth/(tmpCMS.getKeyLength()-1);

    var labelFontSize = (canvasObject.height / 3) * 2;
    var distanceTop = (canvasObject.height / 6);

    // draw keys
    for (var i = 0; i < tmpCMS.getKeyLength(); i++) {

      var tmpKey = tmpCMS.getKeyType(i);
      var colorrectYPos = yPos - distanceTop;
      var colorrectXPos = xPos - (colorrectWitdh / 2);


      var text = ""+(i+1);
      canvasContex.font = labelFontSize+"px Arial";
      canvasContex.fillStyle = lineColor;
      canvasContex.fillText(text,xPos-(labelFontSize/3),colorrectYPos);

      xPos+=bandWidth;
    }

}
