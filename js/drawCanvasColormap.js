 /////////////////////////////////////////////////////////////////////////////////////////////
//// Colormap
//////////////////////////////////////////////////////////////////////////////////////////////

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

    var pos1 = (tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth;
    var pos2 = (tmpCMS.getRefPosition(i+1) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth;
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



function createUnknownTypeBand(canvasData, xStart, bandWidth, bandHeight, color1, color2, canvasWidth) {

  if(color1.equalTo(color2)){
    canvasData=createConstantBand(canvasData, xStart, bandWidth, bandHeight, color1, canvasWidth);
  }
  else{
    canvasData=createScaledBand(canvasData, xStart, bandWidth, bandHeight, color1, color2, canvasWidth);
  }

  return canvasData;

}

function createScaledBand(canvasData, xStart, bandWidth, bandHeight, color1, color2, canvasWidth) {

  xStart = Math.round(xStart);
  bandWidth = Math.round(bandWidth);
  bandHeight = Math.round(bandHeight);

  //  console.log(typeof color1);
  //  console.log('createScaledBand: ' + color1.getColorType());


  switch (colorspaceModus) {
    case "rgb":
      for (var x = xStart; x <= xStart + bandWidth; x++) {

        var tmpRatio = (x - xStart) / bandWidth;

        var rValue = color1.getRValue() + (color2.getRValue() - color1.getRValue()) * tmpRatio;
        var gValue = color1.getGValue() + (color2.getGValue() - color1.getGValue()) * tmpRatio;
        var bValue = color1.getBValue() + (color2.getBValue() - color1.getBValue()) * tmpRatio;

        var tmpCurrentColor = new classColor_RGB(rValue, gValue, bValue);

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a

        }

      }

      break;
    case "hsv":

      var tmpDis = color1.getSValue() * 50; // radius 50; center(0,0,0);
      var tmpRad = (color1.getHValue() * Math.PI * 2) - Math.PI;
      var xPos = tmpDis * Math.cos(tmpRad);
      var yPos = tmpDis * Math.sin(tmpRad);
      var zPos = color1.getVValue() - 50;

      var tmpDis2 = color2.getSValue() * 50;
      var tmpRad2 = (color2.getHValue() * Math.PI * 2) - Math.PI;
      var xPos2 = tmpDis2 * Math.cos(tmpRad2);
      var yPos2 = tmpDis2 * Math.sin(tmpRad2);
      var zPos2 = color2.getVValue() - 50;


      for (var x = xStart; x <= xStart + bandWidth; x++) {

        var tmpRatio = (x - xStart) / bandWidth;

        var tmpX = xPos + (xPos2 - xPos) * tmpRatio;
        var tmpY = yPos + (yPos2 - yPos) * tmpRatio;
        var tmpZ = zPos + (zPos2 - zPos) * tmpRatio;

        var tmpH = (Math.atan2(tmpY, tmpX) + Math.PI) / (Math.PI * 2);
        var tmpS = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2)) / 50;
        var tmpV = tmpZ + 50;
        var tmpCurrentHSVColor = new classColor_HSV(tmpH, tmpS, tmpV);

        var tmpCurrentColor = tmpCurrentHSVColor.calcRGBColor();
        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      break;
    case "lab":
      for (var x = xStart; x <= xStart + bandWidth; x++) {

        var tmpRatio = (x - xStart) / bandWidth;

        var lValue = color1.getLValue() + (color2.getLValue() - color1.getLValue()) * tmpRatio;
        var aValue = color1.getAValue() + (color2.getAValue() - color1.getAValue()) * tmpRatio;
        var bValue = color1.getBValue() + (color2.getBValue() - color1.getBValue()) * tmpRatio;
        var tmpCurrentLABColor = new classColor_LAB(lValue, aValue, bValue);

        var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      break;
    case "din99":

      for (var x = xStart; x <= xStart + bandWidth; x++) {

        var tmpRatio = (x - xStart) / bandWidth;

        var l99Value = color1.getL99Value() + (color2.getL99Value() - color1.getL99Value()) * tmpRatio;
        var a99Value = color1.getA99Value() + (color2.getA99Value() - color1.getA99Value()) * tmpRatio;
        var b99Value = color1.getB99Value() + (color2.getB99Value() - color1.getB99Value()) * tmpRatio;

        var tmpCurrentDIN99Color = new classColorDIN99(l99Value, a99Value, b99Value);

        var tmpCurrentColor = tmpCurrentDIN99Color.calcRGBColor();

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      break;
    default:
      console.log("Error at the createBand function");

  }

  return canvasData;
}


function createConstantBand(canvasData, xStart, bandWidth, bandHeight, color1, canvasWidth) {

  xStart = Math.round(xStart);
  bandWidth = Math.round(bandWidth);
  bandHeight = Math.round(bandHeight);

  switch (colorspaceModus) {
    case "rgb":

      for (var x = xStart; x <= xStart + bandWidth; x++) {

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(color1.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(color1.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(color1.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      break;
    case "hsv":

      var tmpCurrentColor = color1.calcRGBColor();

      for (var x = xStart; x <= xStart + bandWidth; x++) {

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }
      break;
    case "lab":

      var tmpCurrentColor = color1.calcRGBColor();

      for (var x = xStart; x <= xStart + bandWidth; x++) {

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      break;
    case "din99":

      var tmpCurrentColor = color1.calcRGBColor();

      for (var x = xStart; x <= xStart + bandWidth; x++) {

        for (var y = 0; y < bandHeight; y++) {
          var index = (x + y * canvasWidth) * 4;
          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

      }

      break;
    default:
      console.log("Error at the createBand function");

  }

  return canvasData;
}


/////////////////////////////////////////////////////////////////////////////////////////////
//// Keys
//////////////////////////////////////////////////////////////////////////////////////////////

function drawKeys(canvasID, resolutionX, resolutionY, tmpCMS, lineKeyID) {

  for (var i = refElementContainer.length - 1; i >= 0; i--) {
    refElementContainer[i].remove();
    refElementContainer.pop();
  }

  keyRectPoint = [];

  var canvasObject = document.getElementById(canvasID);
  canvasObject.width = resolutionX;
  canvasObject.height = resolutionY;

  var canvasContex = canvasObject.getContext("2d");
  //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
  var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);

  /////////////////////////////////////////////////////////

  var canvasObject2 = document.getElementById(lineKeyID);
  canvasObject2.width = resolutionX;
  canvasObject2.height = resolutionY;

  var canvasContex2 = canvasObject2.getContext("2d");

  //////////////////////////////////////////////////////////////

  var colormapWidth = resolutionX * 0.95;
  var xPos = resolutionX * 0.025;
  var yPos = resolutionY;

  var twinStarted = false;
  var leftStarted = false;

  var distanceColorrects = resolutionY / 3;


  colorrectHeigth = resolutionY / 2;
  colorrectWitdh = resolutionY / 3;

  var box = document.getElementById(lineKeyID).getBoundingClientRect();

  // draw keys
  for (var i = 0; i < tmpCMS.getKeyLength(); i++) {


    var pos1 = (tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth;

    canvasContex.beginPath();
    canvasContex.lineWidth = 1;
    canvasContex.moveTo(xPos + pos1, yPos);
    canvasContex.lineTo(xPos + pos1, yPos - distanceColorrects);
    canvasContex.strokeStyle = 'rgb(0,0,0)';
    canvasContex.stroke();

    canvasContex2.beginPath();
    canvasContex2.lineWidth = 1;
    canvasContex2.moveTo(xPos + pos1, 0);
    canvasContex2.lineTo(xPos + pos1, resolutionY);
    canvasContex2.strokeStyle = 'rgb(0,0,0)';
    canvasContex2.stroke();

    var colorrectYPos = yPos - distanceColorrects - colorrectHeigth;
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
        createKeyInputBox(xposHTML, yposHTML, tmpText, i);

        break;
      case "twin key":

          keyRectPoint.push(tmpArray);

          if(tmpCMS.getMoT(i))
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);
          else
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);

          colorrectYPos=colorrectYPos+colorrectWitdh / 2;

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);
          var colorrectXPos = xPos + pos1;
          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/2, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);

          /////////////////// draw ref /////////
          createKeyInputBox(xposHTML, yposHTML, tmpText, i);



        break;
      case "left key":

          if(i!=tmpCMS.getKeyLength()-1)
            if(tmpCMS.getMoT(i))
              drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i+1,"rgb").getRGBString(), false);
            else
              drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);
          else
            drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);

          colorrectYPos=colorrectYPos+colorrectWitdh / 2;

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/2, tmpCMS.getLeftKeyColor(i,"rgb").getRGBString(), false);
          var colorrectXPos = xPos + pos1;
          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth/2, "rgb(125,125,125)", true);

          if (i != tmpCMS.getKeyLength() - 1)
              keyRectPoint.push(tmpArray);

          createKeyInputBox(xposHTML, yposHTML, tmpText, i);

        break;
      case "right key":

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, "rgb(125,125,125)", true);
        var colorrectXPos = xPos + pos1;
        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh / 2, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);

        /////////////////// draw ref /////////
          createKeyInputBox(xposHTML, yposHTML, tmpText, i);


        break;
      default:

        keyRectPoint.push(tmpArray);

        drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);

        /////////////////// draw ref /////////
        createKeyInputBox(xposHTML, yposHTML, tmpText, i);

    }

  }

}

function createKeyInputBox(leftVal, topVal, tmpText, index) {

  var inputField = document.createElement("input");
  inputField.setAttribute('type', 'text');
  inputField.setAttribute('value', tmpText);
  var inputID = "id_KeyValInput" + index;
  inputField.id = inputID;
  document.body.appendChild(inputField);

  //inputField.style.width = "min-content";
  inputField.style.width = "3vw";
  inputField.style.height = "2vh";
  inputField.style.fontSize = "1.8vh";
  //inputField.style.background = "rgb(255,255,255)";
  inputField.style.paddingLeft = 5 + "px";
  inputField.style.paddingRight = 5 + "px";
  //inputField.style.border = "2px solid rgb(0,0,0)";
  inputField.style.margin = "0px";
  inputField.style.zIndex = tmpZIndex;

  inputField.style.position = "absolute";
  inputField.style.top = Math.round(topVal) + "px";
  inputField.style.left = Math.round(leftVal) + "px";
  refElementContainer.push(inputField);
  leftVal = leftVal - (inputField.getBoundingClientRect().width / 2);
  inputField.style.left = Math.round(leftVal) + "px";

  inputField.onchange = (function(keyIndex, id) {
    return function() {

      changeKeyValueInput(keyIndex, id);

    };
  })(index, inputID);

  inputField.onkeyup = (function (id) {
    return function() {

      var inputObj = document.getElementById(id);

      checkInputVal(inputObj, true, true);

    };
  })(inputID);

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
