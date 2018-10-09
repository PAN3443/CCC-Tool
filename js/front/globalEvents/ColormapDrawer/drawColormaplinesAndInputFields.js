 /////////////////////////////////////////////////////////////////////////////////////////////
//// Lines
//////////////////////////////////////////////////////////////////////////////////////////////

function drawLines(cmsID,fromIsLinear, toIsLinear, resolutionX, resolutionY, tmpCMS){

  var canvasObject = document.getElementById(cmsID);
  var tmpRect = canvasObject.getBoundingClientRect();
  canvasObject.width = resolutionX;
  canvasObject.height = tmpRect.height;

  var canvasContex = canvasObject.getContext("2d");

  var colormapWidth = resolutionX * 0.9;
  var xPos = resolutionX * 0.05;

  var bandSketchWidth = Math.round(colormapWidth/(tmpCMS.getKeyLength()-1));
  // draw keys
  for (var i = 0; i < tmpCMS.getKeyLength(); i++) {

    var pos1, pos2;

    if(fromIsLinear)
       pos1 = (tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth;
    else
      pos1 = i*bandSketchWidth;

      if(toIsLinear)
         pos2 = (tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth;
      else
        pos2 = i*bandSketchWidth;

    canvasContex.beginPath();
    canvasContex.lineWidth = 1;
    canvasContex.moveTo(xPos + pos1, 0);

    canvasContex.lineTo(xPos + pos2, tmpRect.height);
    canvasContex.strokeStyle = 'rgb(0,0,0)';
    canvasContex.stroke();

  }

}




/////////////////////////////////////////////////////////////////////////////////////////////
//// Input Fields
//////////////////////////////////////////////////////////////////////////////////////////////

/*function drawKeys(canvasID, resolutionX, resolutionY, tmpCMS) {

  /*for (var i = refElementContainer.length - 1; i >= 0; i--) {
    refElementContainer[i].remove();
    refElementContainer.pop();
  }* /

  keyRectPoint = [];

  var canvasObject = document.getElementById(canvasID);
  canvasObject.width = resolutionX;
  canvasObject.height = resolutionY;

  var canvasContex = canvasObject.getContext("2d");
  //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
  var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);


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

  var bandSketchWidth = Math.round(colormapWidth/(tmpCMS.getKeyLength()-1));
  // draw keys
  for (var i = 0; i < tmpCMS.getKeyLength(); i++) {


    var pos1 = (tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth;

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
        //createKeyInputBox(xposHTML, yposHTML, tmpText, i);

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

          colorrectYPos=colorrectYPos+colorrectWitdh / 2;

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
*/
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
