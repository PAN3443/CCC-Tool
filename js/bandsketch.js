function drawBandSketch(cms,sketchObjectID, sketchKeyID, sketchRefID, withInputFields, aboveInputField){

  // start
  var canvasObject = document.getElementById(sketchObjectID);
  var rect = canvasObject.getBoundingClientRect();

  var canvasContex = canvasObject.getContext("2d");
  canvasContex.mozImageSmoothingEnabled = false;
  canvasContex.webkitImageSmoothingEnabled = false;
  canvasContex.msImageSmoothingEnabled = false;
  canvasContex.imageSmoothingEnabled = false; // did not work !?!?!
  canvasContex.oImageSmoothingEnabled = false;

  canvasObject.height = 80;//40;
  var fontSize = 40;//20;
  var smallFontSize = 30;//15;
  var bandLength; //= bandSketchObjLength;

  if(withInputFields){
    bandLength= Math.round(rect.width/(cms.getKeyLength()-1));

  }else{
    bandLength= Math.round(rect.width/(cms.getKeyLength()-1 + cms.getKeyLength()));
  }

  bandSketchObjLength=bandLength;

  if(withInputFields==false){
    drawSketchKeys(sketchKeyID, cms);
    drawSketchRefElements(cms,sketchRefID);
  }

  if(cms.getKeyLength()==0){
    canvasObject.width = 2500;//1500;

    canvasObject.style.border = "2px dashed black";
    canvasContex.textBaseline="bottom";
    // write text into the canvasID

    if(withInputFields){

      if(aboveInputField==0){
          // draw dragElemten_ID
          var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);
          canvasData=drawInsertBandPreview(canvasData, 0, canvasObject.width, canvasObject.height, canvasObject.width);
          canvasContex.putImageData(canvasData, 0, 0);
      }
      else{
        dropRects = [];
        dropRects.push(0);
        canvasContex.font = fontSize+"px Arial";
        var txt="Drop It Here";
        var xPos=(canvasObject.width/2)-(canvasContex.measureText(txt).width/2);
        var yPos=(canvasObject.height/2)+(fontSize/2);
        canvasContex.fillText(txt,xPos,yPos);
        return;
      }

    }
    else{
      canvasContex.font = fontSize+"px Arial";

      var txt;
      if(showSideID==1){
        txt="Drag a band construct from the bottom and drop it in this area.";
      }
      else{
        txt="Emty CMS. Please visit the New or Gallery section";
      }
      var xPos=(canvasObject.width/2)-(canvasContex.measureText(txt).width/2);
      var yPos=(canvasObject.height/2)+(fontSize/2);
      canvasContex.fillText(txt,xPos,yPos);
    }

  }
  else{

    canvasObject.style.border = "thin solid black";

    if(withInputFields){
      dropRects = [];
      canvasObject.width = (cms.getKeyLength()-1)*bandLength+cms.getKeyLength()*bandLength;
    }
    else{
      canvasObject.width = (cms.getKeyLength()-1)*bandLength;
    }


    var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);
    var currentPos=0;

    ///////////////////////////////
    // draw cms band

    var color1, color2;

    for(var x=0; x<cms.getKeyLength()-1; x++){

      if(withInputFields){
        if(aboveInputField==x)
          canvasData=drawInsertBandPreview(canvasData, currentPos, bandLength, canvasObject.height, canvasObject.width);

        currentPos += bandLength;
      }

      color1 = cms.getRightKeyColor(x,colorspaceModus);
      color2 = cms.getLeftKeyColor(x+1,colorspaceModus);

      if(color1==undefined)
        canvasData=createConstantBand(canvasData, currentPos, bandLength, canvasObject.height, color2, canvasObject.width);
      else
        canvasData=createScaledBand(canvasData, currentPos, bandLength, canvasObject.height, color1, color2, canvasObject.width);

      currentPos += bandLength;
    }

    if(aboveInputField==cms.getKeyLength()-1)
      canvasData=drawInsertBandPreview(canvasData, currentPos, bandLength, canvasObject.height, canvasObject.width);

    canvasContex.putImageData(canvasData, 0, 0);

    ///////////////////////////////
    // draw cms band
    currentPos=0;
    var borderWidth=1;//canvasObject.width/canvasObject.getBoundingClientRect().width;
    //console.log(canvasObject.getBoundingClientRect().width+"/"+canvasObject.width+"="+borderWidth);

      for(var x=0; x<cms.getKeyLength(); x++){
      // push to drop Rects

          if(withInputFields){
            dropRects.push(currentPos);
            if(aboveInputField!=x){


              /*canvasContex.font = fontSize+"px Arial";
              var txt="here";
              var xPos= currentPos+(bandLength/2)-(canvasContex.measureText(txt).width/2);
              var yPos=(canvasObject.height/2)+(fontSize/2);
              canvasContex.fillStyle = "black";
              canvasContex.fillText(txt,xPos,yPos);//*/
              canvasContex.lineWidth=borderWidth;
              canvasContex.strokeStyle = "black";
              canvasContex.strokeRect(currentPos,0,bandLength,canvasObject.height);
              canvasContex.lineWidth=2;
              canvasContex.beginPath();
              canvasContex.moveTo(currentPos+(bandLength/2),0+canvasObject.height/16);
              canvasContex.lineTo(currentPos+(bandLength/2),canvasObject.height-canvasObject.height/16);
              canvasContex.stroke();

              canvasContex.beginPath();
              canvasContex.moveTo(currentPos+bandLength/16,canvasObject.height/2);
              canvasContex.lineTo(currentPos+bandLength-bandLength/16,canvasObject.height/2);
              canvasContex.stroke();

              canvasContex.strokeStyle = "red";
              canvasContex.fillStyle = "red";


              canvasContex.beginPath();
              canvasContex.arc(currentPos+(bandLength/2),canvasObject.height/2,30,0,2*Math.PI);
              canvasContex.stroke();

              canvasContex.beginPath();
              canvasContex.arc(currentPos+(bandLength/2),canvasObject.height/2,20,0,2*Math.PI);
              canvasContex.stroke();

              canvasContex.beginPath();
              canvasContex.arc(currentPos+(bandLength/2),canvasObject.height/2,10,0,2*Math.PI);
              canvasContex.stroke();

              canvasContex.beginPath();
              canvasContex.arc(currentPos+(bandLength/2),canvasObject.height/2,3,0,2*Math.PI);
              canvasContex.fill();

            }
            currentPos += bandLength;
          }

          canvasContex.lineWidth=borderWidth;
          canvasContex.strokeStyle = "black";
          canvasContex.strokeRect(currentPos,0,bandLength,canvasObject.height);

          currentPos += bandLength;
    }
   }

}


function drawInsertBandPreview(canvasData, currentPos, bandLength, canvasHeight, canvasWidth){

  switch(dragPredefinedBandType){
      case 0:
              // ->const
              canvasData=createConstantBand(canvasData, currentPos, bandLength, canvasHeight, constBands[dragPredefinedBandIndex].getInColorFormat(colorspaceModus), canvasWidth);
      break;
      case 1:
              // ->scale
              canvasData=createScaledBand(canvasData, currentPos, bandLength, canvasHeight, scaleBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),scaleBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
      break;
      case 2:
              // ->double
              var numberOfBands=2;
              var tmpbandLength=bandLength/numberOfBands;
              if(tmpbandLength%1!=0){
                var rest=tmpbandLength%1;
                tmpbandLength=Math.floor(tmpbandLength);
                var lesspixels=Math.round(rest*numberOfBands); // should be an integer
                canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength+lesspixels, canvasHeight, doubleBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),doubleBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
                currentPos+=(tmpbandLength+lesspixels);
              }
              else{
                canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, doubleBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),doubleBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
                currentPos+=tmpbandLength;
              }
              canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, doubleBands[dragPredefinedBandIndex][2].getInColorFormat(colorspaceModus),doubleBands[dragPredefinedBandIndex][3].getInColorFormat(colorspaceModus), canvasWidth);
      break;
      case 3:
              // ->tripleX
              var numberOfBands=3;
              var tmpbandLength=bandLength/numberOfBands; //Math.round(bandLength/numberOfBands);

              if(tmpbandLength%1!=0){
                var rest=tmpbandLength%1;
                tmpbandLength=Math.floor(tmpbandLength);
                var lesspixels=Math.round(rest*numberOfBands);
                canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength+lesspixels, canvasHeight, tribleBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),tribleBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
                currentPos+=(tmpbandLength+lesspixels);
              }
              else{
                canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, tribleBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),tribleBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
                currentPos+=tmpbandLength;
              }
              canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, tribleBands[dragPredefinedBandIndex][2].getInColorFormat(colorspaceModus),tribleBands[dragPredefinedBandIndex][3].getInColorFormat(colorspaceModus), canvasWidth);
              currentPos+=tmpbandLength;
              canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, tribleBands[dragPredefinedBandIndex][4].getInColorFormat(colorspaceModus),tribleBands[dragPredefinedBandIndex][5].getInColorFormat(colorspaceModus), canvasWidth);

      break;
      case 4:
              // ->quad
              var numberOfBands=4;
              var tmpbandLength=bandLength/numberOfBands;
              if(tmpbandLength%1!=0){
                var rest=tmpbandLength%1;
                tmpbandLength=Math.floor(tmpbandLength);
                var lesspixels=Math.round(rest*numberOfBands);
                canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength+lesspixels, canvasHeight, quadBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),quadBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
                currentPos+=(tmpbandLength+lesspixels);
              }
              else{
                canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, quadBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),quadBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
                currentPos+=tmpbandLength;
              }
              canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, quadBands[dragPredefinedBandIndex][2].getInColorFormat(colorspaceModus),quadBands[dragPredefinedBandIndex][3].getInColorFormat(colorspaceModus), canvasWidth);
              currentPos+=tmpbandLength;
              canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, quadBands[dragPredefinedBandIndex][4].getInColorFormat(colorspaceModus),quadBands[dragPredefinedBandIndex][5].getInColorFormat(colorspaceModus), canvasWidth);
              currentPos+=tmpbandLength;
              canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, quadBands[dragPredefinedBandIndex][6].getInColorFormat(colorspaceModus),quadBands[dragPredefinedBandIndex][7].getInColorFormat(colorspaceModus), canvasWidth);
    break;

      default:
      console.log("Error in drawInsertBandPreview function.");
  }

  return canvasData;

}

function drawSketchRefElements(cms,sketchRefObjID){

  var sketchRefObj = document.getElementById(sketchRefObjID);

  var box = sketchRefObj.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  var yposHTML = box.height + top;

  //sketchObject.style.border = "none";

  //var tmpRect = sketchObject.getBoundingClientRect();

  //var borderWidth = 1;
  //var tmpLength = Math.floor((tmpRect.width/(cms.getKeyLength()-1))-(2*borderWidth));

  for (var i = 0; i < cms.getKeyLength()-1; i++) {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var refLineDiv = document.createElement('div');
    refLineDiv.style.height = 100 + '%';
    refLineDiv.style.width = 100 + '%';
    refLineDiv.style.borderLeft = "1px solid black";

    sketchRefObj.appendChild(refLineDiv);
    refLineSketchContainer.push(refLineDiv);

    /////////////////// draw ref /////////
    var xposHTML = (i / (cms.getKeyLength()-1)) * box.width + left;
    var tmpText = '' + cms.getRefPosition(i); //.toFixed(numDecimalPlaces);

    if(showSideID==1){

      var inputField = document.createElement("input");
      inputField.setAttribute('type', 'text');
      inputField.setAttribute('value', tmpText);
      var inputID = "id_SketchKeyValInput" + i;
      inputField.id = inputID;
      document.body.appendChild(inputField);

      inputField.style.width = "3vw";
      inputField.style.height = "2vh";
      inputField.style.fontSize = "1.8vh";
      inputField.style.paddingLeft = 5 + "px";
      inputField.style.paddingRight = 5 + "px";
      inputField.style.margin = "0px";
      inputField.style.zIndex = "2";

      inputField.style.position = "absolute";
      inputField.style.top = Math.round(yposHTML) + "px";
      inputField.style.left = Math.round(xposHTML) + "px";
      refLineSketchContainer.push(inputField);
      xposHTML = xposHTML - (inputField.getBoundingClientRect().width / 2);
      inputField.style.left = Math.round(xposHTML) + "px";

      inputField.onchange = (function(keyIndex, id) {
        return function() {

              changeKeyValueInput(keyIndex, id);

        };
      })(i, inputID);

      inputField.onkeyup = (function(id) {
        return function() {

          var inputObj = document.getElementById(id);

          checkInputVal(inputObj, true, true);
        };
      })(inputID);

      /////////////////// special case: last element /////////
      if (i == cms.getKeyLength()-2) {
        refLineDiv.style.borderRight = "1px solid black";
        tmpText = '' + cms.getRefPosition(i+1); //.toFixed(numDecimalPlaces);
        xposHTML = box.width + left;
        var inputField2 = document.createElement("input");
        inputField2.setAttribute('type', 'text');
        inputField2.setAttribute('value', tmpText);
        var inputID = "id_SketchKeyValInput" + i + 1;
        inputField2.id = inputID;
        document.body.appendChild(inputField2);

        //inputField.style.width = "min-content";
        inputField2.style.width = "3vw";
        inputField2.style.height = "2vh";
        inputField2.style.fontSize = "1.8vh";
        //inputField.style.background = "rgb(255,255,255)";
        inputField2.style.paddingLeft = 5 + "px";
        inputField2.style.paddingRight = 5 + "px";
        //inputField.style.border = "2px solid rgb(0,0,0)";
        inputField2.style.margin = "0px";
        inputField2.style.zIndex = "2";

        inputField2.style.position = "absolute";
        inputField2.style.top = Math.round(yposHTML) + "px";
        inputField2.style.left = Math.round(xposHTML) + "px";
        refLineSketchContainer.push(inputField2);
        xposHTML = xposHTML - (inputField2.getBoundingClientRect().width / 2);
        inputField2.style.left = Math.round(xposHTML) + "px";

        inputField2.onchange = (function(keyIndex, id) {
          return function() {

            changeKeyValueInput(keyIndex+1, id);

          };
        })(i, inputID);

        inputField2.onkeyup = (function(id) {
          return function() {

            var inputObj = document.getElementById(id);

            checkInputVal(inputObj, true, true);
          };
        })(inputID);

      }
    }
    else{
      // no input fields !


      if(cms.getRefPosition(i).countDecimals()>2){
        tmpText = cms.getRefPosition(i).toFixed(2) + "..";
      }
      var inputField = document.createElement("p");
      inputField.innerHTML = tmpText;
      var inputID = "id_SketchKeyValInput" + i;
      inputField.id = inputID;
      document.body.appendChild(inputField);

      inputField.style.width = "min-content";
      //inputField.style.width = "3vw";
      inputField.style.height = "2vh";
      inputField.style.fontSize = "1.8vh";
      inputField.style.background = "rgb(255,255,255)";
      inputField.style.paddingLeft = 5 + "px";
      inputField.style.paddingRight = 5 + "px";
      //inputField.style.border = "1px solid rgb(0,0,0)";
      inputField.style.margin = "0px";
      inputField.style.zIndex = "2";

      inputField.style.position = "absolute";
      inputField.style.top = Math.round(yposHTML) + "px";
      inputField.style.left = Math.round(xposHTML) + "px";
      refLineSketchContainer.push(inputField);
      xposHTML = xposHTML - (inputField.getBoundingClientRect().width / 2);
      inputField.style.left = Math.round(xposHTML) + "px";


      /////////////////// special case: last element /////////
      if (i == cms.getKeyLength()-2) {
        refLineDiv.style.borderRight = "1px solid black";
        tmpText = cms.getRefPosition(i+1) + "";
        if(cms.getRefPosition(i+1).countDecimals()>2){
          tmpText = cms.getRefPosition(i+1).toFixed(2) + "..";
        }
        xposHTML = box.width + left;
        var inputField2 = document.createElement("p");
        inputField2.innerHTML = tmpText;
        var inputID = "id_SketchKeyValInput" + i + 1;
        inputField2.id = inputID;
        document.body.appendChild(inputField2);

        inputField2.style.width = "min-content";
        //inputField2.style.width = "3vw";
        inputField2.style.height = "2vh";
        inputField2.style.fontSize = "1.8vh";
        inputField2.style.background = "rgb(255,255,255)";
        inputField2.style.paddingLeft = 5 + "px";
        inputField2.style.paddingRight = 5 + "px";
        //inputField2.style.border = "1px solid rgb(0,0,0)";
        inputField2.style.margin = "0px";
        inputField2.style.zIndex = "2";

        inputField2.style.position = "absolute";
        inputField2.style.top = Math.round(yposHTML) + "px";
        inputField2.style.left = Math.round(xposHTML) + "px";
        refLineSketchContainer.push(inputField2);
        xposHTML = xposHTML - (inputField2.getBoundingClientRect().width / 2);
        inputField2.style.left = Math.round(xposHTML) + "px";
      }

    }
  }


}


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

            colorrectYPos=colorrectYPos+colorrectWitdh / 2;
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

            colorrectYPos=colorrectYPos+colorrectWitdh / 2;
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


function sketch_MouseMove(event){
  if(showSideID!=1)
  return;

  var rect = event.target.getBoundingClientRect();
  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  var ratioToColorspaceResolutionX = event.target.width / rect.width;
  var ratioToColorspaceResolutionY = event.target.height / rect.height;
  mousePosX = canvasPosX * ratioToColorspaceResolutionX;
  mousePosY = canvasPosY * ratioToColorspaceResolutionY;
}

function sketch_MouseClick(){
  if(showSideID!=1)
  return;

  for (var i = 1; i <= globalCMS1.getKeyLength()-1; i++) {
    if(mousePosX-(bandSketchObjLength*i)<=0){
      askIndex=i-1;
      askType=1;
      openAskWindow()
      break;
    }
  }

}
