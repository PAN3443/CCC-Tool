function drawKeys(canvasID, resolutionX, resolutionY, tmpCMS) {

  /*for (var i = refElementContainer.length - 1; i >= 0; i--) {
    refElementContainer[i].remove();
    refElementContainer.pop();
  }*/

  keyRectPoint = [];

  var canvasObject = document.getElementById(canvasID);
  canvasObject.width = resolutionX;
  canvasObject.height = resolutionY;

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
  colorrectWitdh = (colorrectHeigth*9/16)/2;

  var box = document.getElementById(canvasID).getBoundingClientRect();

  var bandSketchWidth = Math.round(colormapWidth/(tmpCMS.getKeyLength()-1));
  // draw keys
  for (var i = 0; i < tmpCMS.getKeyLength(); i++) {


    var pos1 = (tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth;

    var colorrectYPos = 1; //yPos - distanceColorrects - colorrectHeigth;
    var colorrectXPos = xPos + pos1 - (colorrectWitdh / 2);
    var tmpArray = [colorrectXPos, colorrectYPos];

    var tmpText = '' + tmpCMS.getRefPosition(i); //.toFixed(numDecimalPlaces);

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    var xposHTML = ((xPos + pos1) / resolutionX) * box.width + left;
    var yposHTML = box.height + top;

    switch (tmpCMS.getKeyType(i)) {
      case "nil key":

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, "rgb(125,125,125)", true);

        /////////////////// draw ref /////////
        //createKeyInputBox(xposHTML, yposHTML, tmpText, i);

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

          /////////////////// draw ref /////////
          //createKeyInputBox(xposHTML, yposHTML, tmpText, i);



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

          //createKeyInputBox(xposHTML, yposHTML, tmpText, i);

        break;
      case "right key":

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, "rgb(125,125,125)", true);
        var colorrectXPos = xPos + pos1;
        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);

        /////////////////// draw ref /////////
          //createKeyInputBox(xposHTML, yposHTML, tmpText, i);


        break;
      default:

        keyRectPoint.push(tmpArray);

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);

        /////////////////// draw ref /////////
        //createKeyInputBox(xposHTML, yposHTML, tmpText, i);

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
