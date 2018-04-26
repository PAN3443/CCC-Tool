function editPage_delteKey(){
bandSketch.deleteKey(selectedKey);
globalColormap1=bandSketch.sketch2Colormap(colorspaceModus, globalColormap1.getColormapName());
orderColorSketch();
addKeyButtons();
}


function editPage_drawKeys(canvasID, tmpCMS){


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

    keyCounter = 0;
    keyType=[];
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

      keyType.push(tmpKey);
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
                drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth/2, tmpCMS.getRightKeyColor(i,"rgb").getRGBString(), false);
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

function colorChange(){


  if(bandCreatorOpen){

    if(document.getElementById("bandCreator_Radiobutton_SelectColor1").checked==true){
      selectedColor=0;
    }
    else{
      selectedColor=1;
    }

    drawCurrentBandColor();
    initColorpickerBackground("bandCreator_canvasPicker", colorpickerType);
    drawEditPageColorCircles("bandCreator_canvasPicker","bandCreator_canvasPicker2", colorpickerType);
  }
  else{

    if(document.getElementById("editSide_Radiobutton_SelectColor1").checked==true){
      selectedColor=0;
    }
    else{
      selectedColor=1;
    }
    drawCurrentColor();
    initColorpickerBackground("editPage_canvasPicker", colorpickerType);
    drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
  }


}

function addKeyButtons(){
  var container = document.getElementById("editPage_KeyDiv");

  for(var i = keyDivArray.length-1; i>=0; i--){
    keyDivArray[i].remove();
    keyDivArray.pop();
  }

  container.innerHTML = "";

  for (var i = 0; i < keyCounter; i++) {

    var selectButton = document.createElement("div");
    selectButton.className = "class_keybuttonEditPage classButtonWhite";
    selectButton.innerHTML = ""+(i+1);
    selectButton.style.cursor = "pointer";

    selectButton.onclick = (function(tmpIndex) {
    return function() {

        keyDivArray[selectedKey].style.borderColor = "black";
        keyDivArray[selectedKey].style.color = "black";
        selectedKey = tmpIndex;
        keyDivArray[selectedKey].style.borderColor = styleActiveColor;
        keyDivArray[selectedKey].style.color = styleActiveColor;
        selectKey();

    };
    })(i);


    container.appendChild(selectButton);
    keyDivArray.push(selectButton);

  }


  selectedKey=0;
  keyDivArray[selectedKey].style.borderColor = styleActiveColor;
  keyDivArray[selectedKey].style.color = styleActiveColor;
  selectKey();
}

function selectKey(){

  if(selectedKey==0 || selectedKey==keyType.length-1){
      document.getElementById("editPage_deleteButton").style.display = "none";
  }
  else {
      document.getElementById("editPage_deleteButton").style.display = "inline-block";
  }

  switch (keyType[selectedKey]) {
    case "nil key":
      document.getElementById("editSide_Radiobutton_KeyTypeNil").checked = true;

      document.getElementById("editSide_Radiobutton_SelectColor1").disabled = true;
      document.getElementById("editSide_Radiobutton_SelectColor1_Label").style.color = "grey";
      document.getElementById("id_editPageC1HInput").style.background = "grey";
      document.getElementById("id_editPageC1SInput").style.background = "grey";
      document.getElementById("id_editPageC1VInput").style.background = "grey";
      document.getElementById("id_editPageC1RInput").style.background = "grey";
      document.getElementById("id_editPageC1GInput").style.background = "grey";
      document.getElementById("id_editPageC1BInput").style.background = "grey";
      document.getElementById("id_editPageC1HInput").value = "";
      document.getElementById("id_editPageC1SInput").value = "";
      document.getElementById("id_editPageC1VInput").value = "";
      document.getElementById("id_editPageC1RInput").value = "";
      document.getElementById("id_editPageC1GInput").value = "";
      document.getElementById("id_editPageC1BInput").value = "";
      document.getElementById("editColor1HSVLAbel").style.color = "grey";
      document.getElementById("editColor1RGBLAbel").style.color = "grey";

      document.getElementById("editSide_Radiobutton_SelectColor2").disabled = true;
      document.getElementById("editSide_Radiobutton_SelectColor2_Label").style.color = "grey";
      document.getElementById("id_editPageC2HInput").style.background = "grey";
      document.getElementById("id_editPageC2SInput").style.background = "grey";
      document.getElementById("id_editPageC2VInput").style.background = "grey";
      document.getElementById("id_editPageC2RInput").style.background = "grey";
      document.getElementById("id_editPageC2GInput").style.background = "grey";
      document.getElementById("id_editPageC2BInput").style.background = "grey";
      document.getElementById("id_editPageC2HInput").value = "";
      document.getElementById("id_editPageC2SInput").value = "";
      document.getElementById("id_editPageC2VInput").value = "";
      document.getElementById("id_editPageC2RInput").value = "";
      document.getElementById("id_editPageC2GInput").value = "";
      document.getElementById("id_editPageC2BInput").value = "";
      document.getElementById("editColor2HSVLAbel").style.color = "grey";
      document.getElementById("editColor2RGBLAbel").style.color = "grey";





      selectedColor=-1;
      break;
    case "twin key":
      document.getElementById("editSide_Radiobutton_KeyTypeTwin").checked = true;
      document.getElementById("editSide_Radiobutton_SelectColor1").checked = true;
      document.getElementById("editSide_Radiobutton_SelectColor1").disabled = false;
      document.getElementById("editSide_Radiobutton_SelectColor1_Label").style.color = "black";
      document.getElementById("id_editPageC1HInput").style.background = "white";
      document.getElementById("id_editPageC1SInput").style.background = "white";
      document.getElementById("id_editPageC1VInput").style.background = "white";
      document.getElementById("id_editPageC1RInput").style.background = "white";
      document.getElementById("id_editPageC1GInput").style.background = "white";
      document.getElementById("id_editPageC1BInput").style.background = "white";
      document.getElementById("editColor1HSVLAbel").style.color = "black";
      document.getElementById("editColor1RGBLAbel").style.color = "black";

      document.getElementById("editSide_Radiobutton_SelectColor2").disabled = false;
      document.getElementById("editSide_Radiobutton_SelectColor2_Label").style.color = "black";
      document.getElementById("id_editPageC2HInput").style.background = "white";
      document.getElementById("id_editPageC2SInput").style.background = "white";
      document.getElementById("id_editPageC2VInput").style.background = "white";
      document.getElementById("id_editPageC2RInput").style.background = "white";
      document.getElementById("id_editPageC2GInput").style.background = "white";
      document.getElementById("id_editPageC2BInput").style.background = "white";
      document.getElementById("editColor2HSVLAbel").style.color = "black";
      document.getElementById("editColor2RGBLAbel").style.color = "black";

      editColor1=bandSketch.getC2Color(selectedKey-1,"rgb");
      editColor2=bandSketch.getC1Color(selectedKey,"rgb");

      fillColorInputFields(false);
      fillColorInputFields(true);

      selectedColor=0;
      break;
    case "left key":
      document.getElementById("editSide_Radiobutton_KeyTypeLeft").checked = true;
      document.getElementById("editSide_Radiobutton_SelectColor1").disabled = false;
      document.getElementById("editSide_Radiobutton_SelectColor1_Label").style.color = "black";
      document.getElementById("id_editPageC1HInput").style.background = "white";
      document.getElementById("id_editPageC1SInput").style.background = "white";
      document.getElementById("id_editPageC1VInput").style.background = "white";
      document.getElementById("id_editPageC1RInput").style.background = "white";
      document.getElementById("id_editPageC1GInput").style.background = "white";
      document.getElementById("id_editPageC1BInput").style.background = "white";
      document.getElementById("editColor1HSVLAbel").style.color = "black";
      document.getElementById("editColor1RGBLAbel").style.color = "black";

      document.getElementById("editSide_Radiobutton_SelectColor2").disabled = true;
      document.getElementById("editSide_Radiobutton_SelectColor2_Label").style.color = "grey";
      document.getElementById("id_editPageC2HInput").style.background = "grey";
      document.getElementById("id_editPageC2SInput").style.background = "grey";
      document.getElementById("id_editPageC2VInput").style.background = "grey";
      document.getElementById("id_editPageC2RInput").style.background = "grey";
      document.getElementById("id_editPageC2GInput").style.background = "grey";
      document.getElementById("id_editPageC2BInput").style.background = "grey";
      document.getElementById("id_editPageC2HInput").value = "";
      document.getElementById("id_editPageC2SInput").value = "";
      document.getElementById("id_editPageC2VInput").value = "";
      document.getElementById("id_editPageC2RInput").value = "";
      document.getElementById("id_editPageC2GInput").value = "";
      document.getElementById("id_editPageC2BInput").value = "";
      document.getElementById("editColor2HSVLAbel").style.color = "grey";
      document.getElementById("editColor2RGBLAbel").style.color = "grey";
      selectedColor=0;

      editColor1=bandSketch.getC2Color(selectedKey-1,"rgb");
      fillColorInputFields(true);

      break;
    case "right key":
      document.getElementById("editSide_Radiobutton_KeyTypeRight").checked = true;
      document.getElementById("editSide_Radiobutton_SelectColor1").disabled = true;
      document.getElementById("editSide_Radiobutton_SelectColor1_Label").style.color = "grey";
      document.getElementById("id_editPageC1HInput").style.background = "grey";
      document.getElementById("id_editPageC1SInput").style.background = "grey";
      document.getElementById("id_editPageC1VInput").style.background = "grey";
      document.getElementById("id_editPageC1RInput").style.background = "grey";
      document.getElementById("id_editPageC1GInput").style.background = "grey";
      document.getElementById("id_editPageC1BInput").style.background = "grey";
      document.getElementById("id_editPageC1HInput").value = "";
      document.getElementById("id_editPageC1SInput").value = "";
      document.getElementById("id_editPageC1VInput").value = "";
      document.getElementById("id_editPageC1RInput").value = "";
      document.getElementById("id_editPageC1GInput").value = "";
      document.getElementById("id_editPageC1BInput").value = "";
      document.getElementById("editColor1HSVLAbel").style.color = "grey";
      document.getElementById("editColor1RGBLAbel").style.color = "grey";

      document.getElementById("editSide_Radiobutton_SelectColor2").disabled = false;
      document.getElementById("editSide_Radiobutton_SelectColor2_Label").style.color = "black";
      document.getElementById("id_editPageC2HInput").style.background = "white";
      document.getElementById("id_editPageC2SInput").style.background = "white";
      document.getElementById("id_editPageC2VInput").style.background = "white";
      document.getElementById("id_editPageC2RInput").style.background = "white";
      document.getElementById("id_editPageC2GInput").style.background = "white";
      document.getElementById("id_editPageC2BInput").style.background = "white";
      document.getElementById("editColor2HSVLAbel").style.color = "black";
      document.getElementById("editColor2RGBLAbel").style.color = "black";

      document.getElementById("editSide_Radiobutton_SelectColor2").checked = true;

      editColor2=bandSketch.getC1Color(0,"rgb");

      fillColorInputFields(false);

      selectedColor=1;
      break;
    default:
    document.getElementById("editSide_Radiobutton_KeyTypeDual").checked = true;
    document.getElementById("editSide_Radiobutton_SelectColor1").disabled = false;
    document.getElementById("editSide_Radiobutton_SelectColor1_Label").style.color = "black";
    document.getElementById("id_editPageC1HInput").style.background = "white";
    document.getElementById("id_editPageC1SInput").style.background = "white";
    document.getElementById("id_editPageC1VInput").style.background = "white";
    document.getElementById("id_editPageC1RInput").style.background = "white";
    document.getElementById("id_editPageC1GInput").style.background = "white";
    document.getElementById("id_editPageC1BInput").style.background = "white";
    document.getElementById("editColor1HSVLAbel").style.color = "black";
    document.getElementById("editColor1RGBLAbel").style.color = "black";

    document.getElementById("editSide_Radiobutton_SelectColor2").disabled = false;
    document.getElementById("editSide_Radiobutton_SelectColor2_Label").style.color = "black";
    document.getElementById("id_editPageC2HInput").style.background = "white";
    document.getElementById("id_editPageC2SInput").style.background = "white";
    document.getElementById("id_editPageC2VInput").style.background = "white";
    document.getElementById("id_editPageC2RInput").style.background = "white";
    document.getElementById("id_editPageC2GInput").style.background = "white";
    document.getElementById("id_editPageC2BInput").style.background = "white";
    document.getElementById("editColor2HSVLAbel").style.color = "black";
    document.getElementById("editColor2RGBLAbel").style.color = "black";

    document.getElementById("editSide_Radiobutton_SelectColor1").checked = true;

    editColor1=bandSketch.getC2Color(selectedKey-1,"rgb");
    editColor2=bandSketch.getC1Color(selectedKey,"rgb");

    fillColorInputFields(false);
    fillColorInputFields(true);

    selectedColor=0;
  }

  document.getElementById("editSide_Radiobutton_KeyTypeNil").style.display = "none";
  document.getElementById("editSide_Radiobutton_KeyTypeNilLabel").style.display = "none";

  document.getElementById("editSide_Radiobutton_KeyTypeTwin").style.display = "none";
  document.getElementById("editSide_Radiobutton_KeyTypeTwinLabel").style.display = "none";

  document.getElementById("editSide_Radiobutton_KeyTypeLeft").style.display = "none";
  document.getElementById("editSide_Radiobutton_KeyTypeLeftLabel").style.display = "none";

  document.getElementById("editSide_Radiobutton_KeyTypeRight").style.display = "none";
  document.getElementById("editSide_Radiobutton_KeyTypeRightLabel").style.display = "none";

  document.getElementById("editSide_Radiobutton_KeyTypeDual").style.display = "none";
  document.getElementById("editSide_Radiobutton_KeyTypeDualLabel").style.display = "none";


  switch (selectedKey) {
    case 0:
      document.getElementById("id_editPageScalarInput").value=bandSketch.getRefR1(selectedKey);

      document.getElementById("editSide_Radiobutton_KeyTypeNil").style.display = "inline-block";
      document.getElementById("editSide_Radiobutton_KeyTypeNilLabel").style.display = "inline-block";

      document.getElementById("editSide_Radiobutton_KeyTypeRight").style.display = "inline-block";
      document.getElementById("editSide_Radiobutton_KeyTypeRightLabel").style.display = "inline-block";
      break;
    default:
      document.getElementById("id_editPageScalarInput").value=bandSketch.getRefR2(selectedKey-1);


      if(selectedKey+1==keyCounter){
        document.getElementById("editSide_Radiobutton_KeyTypeLeft").style.display = "inline-block";
        document.getElementById("editSide_Radiobutton_KeyTypeLeftLabel").style.display = "inline-block";
      }
      else{
        document.getElementById("editSide_Radiobutton_KeyTypeTwin").style.display = "inline-block";
        document.getElementById("editSide_Radiobutton_KeyTypeTwinLabel").style.display = "inline-block";

        document.getElementById("editSide_Radiobutton_KeyTypeLeft").style.display = "inline-block";
        document.getElementById("editSide_Radiobutton_KeyTypeLeftLabel").style.display = "inline-block";

        document.getElementById("editSide_Radiobutton_KeyTypeDual").style.display = "inline-block";
        document.getElementById("editSide_Radiobutton_KeyTypeDualLabel").style.display = "inline-block";
      }
  }



  drawCurrentColor();
  initColorpickerBackground("editPage_canvasPicker", colorpickerType);
  drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);

}

function drawCurrentColor(){
  switch (selectedColor) {
    case 0:
        document.getElementById("editPage_currentColor").style.background=bandSketch.getC2Color(selectedKey-1,"rgb").getRGBString();
        document.getElementById("editPage_SetColor").style.background=editColor1.getRGBString();
    break;
    case 1:
      document.getElementById("editPage_currentColor").style.background=bandSketch.getC1Color(selectedKey,"rgb").getRGBString();
      document.getElementById("editPage_SetColor").style.background=editColor2.getRGBString();
    break;
    default:
      document.getElementById("editPage_currentColor").style.background="none";
        document.getElementById("editPage_SetColor").style.background="none";
  }
  drawModifyPreview();
}

function drawModifyPreview(){

  var bandIncludeKey=0;
  var tmpSelectedColor = selectedColor;

  if(keyType[selectedKey]==='dual key'){
    selectedColor=0;
  }

    if(selectedColor==0){
      bandIncludeKey=selectedKey-1;
    }
    else{
      bandIncludeKey=selectedKey;
    }

  var canvas = document.getElementById("id_modifyBandPreview");


  canvas.width = resolutionX_differenceMetrics;
  canvas.height = 1;

  var canvasCtx = canvas.getContext("2d");
  var canvasData = canvasCtx.getImageData(0, 0, resolutionX_differenceMetrics, 1);


  var borderWidth = 2;
  var restWidth = resolutionX_differenceMetrics-(bandSketch.getBandLength()-1)*borderWidth;
  var bandWith = Math.round(restWidth/bandSketch.getBandLength());
  var currentPos = 0;

  var color1, color2;

  for (var i = 0; i < bandSketch.getBandLength(); i++) {

    var tmpDis,tmpRad,xPos,yPos, zPos,tmpDis2,tmpRad2,xPos2, yPos2,zPos2;

    switch (colorspaceModus) {
      case 'rgb':
       color1 = bandSketch.getC1Color(i,"rgb");
       color2 = bandSketch.getC2Color(i,"rgb");

         if(bandIncludeKey==i){

           if(selectedColor==0){
             color2 = editColor1;
           }
           else{
             color1 = editColor2;
           }
         }
        break;
        case 'hsv':
        color1 = bandSketch.getC1Color(i,"hsv");
        color2 = bandSketch.getC2Color(i,"hsv");

        if(bandIncludeKey==i){

          if(selectedColor==0){
            color2 = editColor1.calcHSVColor();
          }
          else{
            color1 = editColor2.calcHSVColor();
          }
        }

        tmpDis = color1.getSValue() * 50; // radius 50; center(0,0,0);
        tmpRad = (color1.getHValue() * Math.PI * 2) - Math.PI;
        xPos = tmpDis * Math.cos(tmpRad);
        yPos = tmpDis * Math.sin(tmpRad);
        zPos = color1.getVValue() - 50;

        tmpDis2 = color2.getSValue() * 50;
        tmpRad2 = (color2.getHValue() * Math.PI * 2) - Math.PI;
        xPos2 = tmpDis2 * Math.cos(tmpRad2);
        yPos2 = tmpDis2 * Math.sin(tmpRad2);
        zPos2 = color2.getVValue() - 50;
        break;
        case 'lab':
        color1 = bandSketch.getC1Color(i,"lab");
        color2 = bandSketch.getC2Color(i,"lab");

        if(bandIncludeKey==i){

          if(selectedColor==0){
            color2 = editColor1.calcLABColor();
          }
          else{
            color1 = editColor2.calcLABColor();
          }
        }
        break;
        case 'din99':
        color1 = bandSketch.getC1Color(i,"din99");
        color2 = bandSketch.getC2Color(i,"din99");

        if(bandIncludeKey==i){

          if(selectedColor==0){
            color2 = editColor1.calcDIN99Color(kE,kCH);
          }
          else{
            color1 = editColor2.calcDIN99Color(kE,kCH);
          }
        }
        break;
      default:

    }

    if(keyType[selectedKey]==='dual key'){
      bandIncludeKey=selectedKey;
      selectedColor=1;
    }

    for(var x=0; x<bandWith; x++){


      var index = (currentPos+x) * 4;
      var tmpRatio = x/bandWith;


      switch (colorspaceModus) {
        case 'rgb':

          var rValue, gValue, bValue;


           rValue = color1.getRValue() + (color2.getRValue() - color1.getRValue()) * tmpRatio;
           gValue = color1.getGValue() + (color2.getGValue() - color1.getGValue()) * tmpRatio;
           bValue = color1.getBValue() + (color2.getBValue() - color1.getBValue()) * tmpRatio;

           canvasData.data[index + 0] = Math.round(rValue * 255); // r
           canvasData.data[index + 1] = Math.round(gValue * 255); // g
           canvasData.data[index + 2] = Math.round(bValue * 255); // b
           canvasData.data[index + 3] = 255; //a
          break;


          case 'hsv':

          var tmpX = xPos + (xPos2 - xPos) * tmpRatio;
          var tmpY = yPos + (yPos2 - yPos) * tmpRatio;
          var tmpZ = zPos + (zPos2 - zPos) * tmpRatio;

          var tmpH = (Math.atan2(tmpY, tmpX) + Math.PI) / (Math.PI * 2);
          var tmpS = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2)) / 50;
          var tmpV = tmpZ + 50;
          var tmpCurrentHSVColor = new classColor_HSV(tmpH, tmpS, tmpV);

          var tmpCurrentColor = tmpCurrentHSVColor.calcRGBColor();

          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a

          break;
          case 'lab':

          var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
          var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
          var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

          var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
          var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a

          break;
          case 'din99':

          var l99Value = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
          var a99Value = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
          var b99Value = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

          var tmpCurrentDIN99Color = new classColorDIN99(l99Value,a99Value,b99Value);
          var tmpCurrentColor = tmpCurrentDIN99Color.calcRGBColor();

          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
          break;
        default:

      }


    }

    currentPos=currentPos+bandWith;

    if(i != bandSketch.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos+x) * 4;
        canvasData.data[index + 0] = Math.round(0); // r
        canvasData.data[index + 1] = Math.round(0); // g
        canvasData.data[index + 2] = Math.round(0); // b
        canvasData.data[index + 3] = 255; //a
      }
      currentPos=currentPos+borderWidth;
    }

  }

  canvasCtx.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;

   selectedColor=tmpSelectedColor;//
}

function fillColorInputFields(dofirst){

  if(dofirst){

    var tmpVal =editColor1.get1Value()*255;
    document.getElementById("id_editPageC1RInput").value=tmpVal.toFixed(numDecimalPlaces);
    tmpVal =editColor1.get2Value()*255;
    document.getElementById("id_editPageC1GInput").value=tmpVal.toFixed(numDecimalPlaces);
    tmpVal =editColor1.get3Value()*255;
    document.getElementById("id_editPageC1BInput").value=tmpVal.toFixed(numDecimalPlaces);
     var tmpHSV = editColor1.calcHSVColor();
     tmpVal =tmpHSV.get1Value()*360;
     document.getElementById("id_editPageC1HInput").value=tmpVal.toFixed(numDecimalPlaces);
     tmpVal =tmpHSV.get2Value()*100;
     document.getElementById("id_editPageC1SInput").value=tmpVal.toFixed(numDecimalPlaces);
     tmpVal =tmpHSV.get3Value()*100;
     document.getElementById("id_editPageC1VInput").value=tmpVal.toFixed(numDecimalPlaces);
  }
  else {
    var tmpVal =editColor2.get1Value()*255;
    document.getElementById("id_editPageC2RInput").value=tmpVal.toFixed(numDecimalPlaces);
    tmpVal =editColor2.get2Value()*255;
    document.getElementById("id_editPageC2GInput").value=tmpVal.toFixed(numDecimalPlaces);
    tmpVal =editColor2.get3Value()*255;
    document.getElementById("id_editPageC2BInput").value=tmpVal.toFixed(numDecimalPlaces);
      var tmpHSV = editColor2.calcHSVColor();
     tmpVal =tmpHSV.get1Value()*360;
     document.getElementById("id_editPageC2HInput").value=tmpVal.toFixed(numDecimalPlaces);
     tmpVal =tmpHSV.get2Value()*100;
     document.getElementById("id_editPageC2SInput").value=tmpVal.toFixed(numDecimalPlaces);
     tmpVal =tmpHSV.get3Value()*100;
     document.getElementById("id_editPageC2VInput").value=tmpVal.toFixed(numDecimalPlaces);

  }
}

function editPage_ChangeScalar(event){

  var id = event.target.id;
  switch (selectedKey) {
    case 0:
      changeKeyValueInputSketch(selectedKey, true, id, false);
      break;
    default:
      changeKeyValueInputSketch(selectedKey-1, false, id, false);
  }
  orderColorSketch();
}


function editPage_CheckScalar(event){
  var inputObj = document.getElementById(event.target.id);

  checkInputVal(inputObj, true, true);

  if (event.keyCode == 13) {
    var id = event.target.id;
    switch (selectedKey) {
      case 0:
        changeKeyValueInputSketch(selectedKey, true, id, false);
        break;
      default:
        changeKeyValueInputSketch(selectedKey-1, false, id, false);
    }
    orderColorSketch();
  }
}

function changeKeyType(event){

  switch (event.target.id) {
    case "editSide_Radiobutton_KeyTypeNil":
    if(keyType[selectedKey]==="right key"){
      var tmpColor = bandSketch.getC2Color(0,colorspaceModus);
      bandSketch.setC1(tmpColor, 0);
    }

      break;
    case "editSide_Radiobutton_KeyTypeTwin":
      if(keyType[selectedKey]==="dual key" || keyType[selectedKey]==="left key"){

        var tmpColor = bandSketch.getC2Color(selectedKey,colorspaceModus);


        if(tmpColor.get1Value()!=0||tmpColor.get2Value()!=0||tmpColor.get3Value()!=0)
        {
          tmpColor.set1Value(tmpColor.get1Value()*0.75);
          tmpColor.set2Value(tmpColor.get2Value()*0.75);
          tmpColor.set3Value(tmpColor.get3Value()*0.75);
        }
        else{
          tmpColor.set1Value(1);
          tmpColor.set2Value(1);
          tmpColor.set3Value(1);
        }
        bandSketch.setC1(tmpColor, selectedKey);

        var tmpColor2 = bandSketch.getC1Color(selectedKey-1,colorspaceModus);

        if(tmpColor2.get1Value()!=0||tmpColor2.get2Value()!=0||tmpColor2.get3Value()!=0)
        {
          tmpColor2.set1Value(tmpColor2.get1Value()*0.75);
          tmpColor2.set2Value(tmpColor2.get2Value()*0.75);
          tmpColor2.set3Value(tmpColor2.get3Value()*0.75);
        }
        else{
          tmpColor2.set1Value(1);
          tmpColor2.set2Value(1);
          tmpColor2.set3Value(1);
        }

        bandSketch.setC2(tmpColor2, selectedKey-1);

      }
      break;
    case "editSide_Radiobutton_KeyTypeLeft":
      if(keyType[selectedKey]==="dual key" || keyType[selectedKey]==="twin key"){
        var tmpColor = bandSketch.getC2Color(selectedKey,colorspaceModus);

        bandSketch.setC1(tmpColor, selectedKey);
      }

      break;
    case "editSide_Radiobutton_KeyTypeRight":
      if(keyType[selectedKey]==="nil key"){
        var tmpColor = bandSketch.getC2Color(0,colorspaceModus);

        if(tmpColor.get1Value()!=0||tmpColor.get2Value()!=0||tmpColor.get3Value()!=0)
        {
          tmpColor.set1Value(tmpColor.get1Value()*0.5);
          tmpColor.set2Value(tmpColor.get2Value()*0.5);
          tmpColor.set3Value(tmpColor.get3Value()*0.5);
        }
        else{
          tmpColor.set1Value(1);
          tmpColor.set2Value(1);
          tmpColor.set3Value(1);
        }

        bandSketch.setC1(tmpColor, 0);
      }

      break;
    default:
    // dual key+
        if(keyType[selectedKey]==="twin key" || keyType[selectedKey]==="left key"){
            var tmpColor = bandSketch.getC2Color(0,colorspaceModus);

            if(tmpColor.get1Value()!=0||tmpColor.get2Value()!=0||tmpColor.get3Value()!=0)
            {
              tmpColor.set1Value(tmpColor.get1Value()*0.5);
              tmpColor.set2Value(tmpColor.get2Value()*0.5);
              tmpColor.set3Value(tmpColor.get3Value()*0.5);
            }
            else{
              tmpColor.set1Value(1);
              tmpColor.set2Value(1);
              tmpColor.set3Value(1);
            }

            bandSketch.setC1(tmpColor, selectedKey);
            bandSketch.setC2(tmpColor, selectedKey-1);

        }


  }

  orderColorSketch();
  selectKey();
  somethingChanged = true;
}

function changeColorpickerType(event){
  switch (event.target.id) {
    case "editSide_Radiobutton_PickerRG_B":
      colorpickerType="RG_B";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="RG";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="B";
      document.getElementById("bandCreator_Radiobutton_PickerRG_B").checked=true;
    break;
    case "editSide_Radiobutton_PickerRB_G":
      colorpickerType="RB_G";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="RB";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="G";
      document.getElementById("bandCreator_Radiobutton_PickerRB_G").checked=true;
    break;
    case "editSide_Radiobutton_PickerGB_R":
      colorpickerType="GB_R";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="GB";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="R";
      document.getElementById("bandCreator_Radiobutton_PickerGB_R").checked=true;
    break;
    case "editSide_Radiobutton_PickerHS_V":
      colorpickerType="HS_V";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="HS";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="V";
      document.getElementById("bandCreator_Radiobutton_PickerHS_V").checked=true;
    break;
    case "editSide_Radiobutton_PickerHV_S":
      colorpickerType="HV_S";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="HV";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="S";
      document.getElementById("bandCreator_Radiobutton_PickerHV_S").checked=true;
    break;
    case "editSide_Radiobutton_PickerSV_H":
      colorpickerType="SV_H";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="SV";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="H";
      document.getElementById("bandCreator_Radiobutton_PickerSV_H").checked=true;
    break;
    case "bandCreator_Radiobutton_PickerRG_B":
      colorpickerType="RG_B";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="RG";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="B";
      document.getElementById("editSide_Radiobutton_PickerRG_B").checked=true;
    break;
    case "bandCreator_Radiobutton_PickerRB_G":
      colorpickerType="RB_G";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="RB";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="G";
      document.getElementById("editSide_Radiobutton_PickerRB_G").checked=true;
    break;
    case "bandCreator_Radiobutton_PickerGB_R":
      colorpickerType="GB_R";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="GB";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="R";
      document.getElementById("editSide_Radiobutton_PickerGB_R").checked=true;
    break;
    case "bandCreator_Radiobutton_PickerHS_V":
      colorpickerType="HS_V";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="HS";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="V";
      document.getElementById("editSide_Radiobutton_PickerHS_V").checked=true;
    break;
    case "bandCreator_Radiobutton_PickerHV_S":
      colorpickerType="HV_S";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="HV";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="S";
      document.getElementById("editSide_Radiobutton_PickerHV_S").checked=true;
    break;
    case "bandCreator_Radiobutton_PickerSV_H":
      colorpickerType="SV_H";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="SV";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="H";
      document.getElementById("editSide_Radiobutton_PickerSV_H").checked=true;
    break;
    default:

  }

  if(bandCreatorOpen){
    initColorpickerBackground("bandCreator_canvasPicker", colorpickerType);
    drawEditPageColorCircles("bandCreator_canvasPicker","bandCreator_canvasPicker2", colorpickerType);
    switch (event.target.id) {
      case "bandCreator_Radiobutton_PickerRG_B":
        colorpickerType="RG_B";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="RG";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="B";
        document.getElementById("editSide_Radiobutton_PickerRG_B").checked=true;
      break;
      case "bandCreator_Radiobutton_PickerRB_G":
        colorpickerType="RB_G";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="RB";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="G";
        document.getElementById("editSide_Radiobutton_PickerRB_G").checked=true;
      break;
      case "bandCreator_Radiobutton_PickerGB_R":
        colorpickerType="GB_R";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="GB";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="R";
        document.getElementById("editSide_Radiobutton_PickerGB_R").checked=true;
      break;
      case "bandCreator_Radiobutton_PickerHS_V":
        colorpickerType="HS_V";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="HS";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="V";
        document.getElementById("editSide_Radiobutton_PickerHS_V").checked=true;
      break;
      case "bandCreator_Radiobutton_PickerHV_S":
        colorpickerType="HV_S";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="HV";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="S";
        document.getElementById("editSide_Radiobutton_PickerHV_S").checked=true;
      break;
      case "bandCreator_Radiobutton_PickerSV_H":
        colorpickerType="SV_H";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="SV";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="H";
        document.getElementById("editSide_Radiobutton_PickerSV_H").checked=true;
      break;
      default:
    }
  }else{
    initColorpickerBackground("editPage_canvasPicker", colorpickerType);
    drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
    switch (event.target.id) {
      case "editSide_Radiobutton_PickerRG_B":
        colorpickerType="RG_B";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="RG";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="B";
        document.getElementById("bandCreator_Radiobutton_PickerRG_B").checked=true;
      break;
      case "editSide_Radiobutton_PickerRB_G":
        colorpickerType="RB_G";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="RB";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="G";
        document.getElementById("bandCreator_Radiobutton_PickerRB_G").checked=true;
      break;
      case "editSide_Radiobutton_PickerGB_R":
        colorpickerType="GB_R";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="GB";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="R";
        document.getElementById("bandCreator_Radiobutton_PickerGB_R").checked=true;
      break;
      case "editSide_Radiobutton_PickerHS_V":
        colorpickerType="HS_V";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="HS";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="V";
        document.getElementById("bandCreator_Radiobutton_PickerHS_V").checked=true;
      break;
      case "editSide_Radiobutton_PickerHV_S":
        colorpickerType="HV_S";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="HV";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="S";
        document.getElementById("bandCreator_Radiobutton_PickerHV_S").checked=true;
      break;
      case "editSide_Radiobutton_PickerSV_H":
        colorpickerType="SV_H";
        document.getElementById("editPage_canvasPicker_Label").innerHTML="SV";
        document.getElementById("editPage_canvasPicker2_Label").innerHTML="H";
        document.getElementById("bandCreator_Radiobutton_PickerSV_H").checked=true;
      break;
      default:

    }
  }

}


function editPageConfirmColor(){

  if(keyType[selectedKey]==="dual key"){
    var tmpColor = new classColor_RGB(editColor1.get1Value(),editColor1.get2Value(),editColor1.get3Value());
    bandSketch.setC2(tmpColor,selectedKey-1);
    var tmpColor2 = new classColor_RGB(editColor2.get1Value(),editColor2.get2Value(),editColor2.get3Value());
    bandSketch.setC1(tmpColor2,selectedKey);
    orderColorSketch();
    drawCurrentColor();
  }
  else{
      switch (selectedColor) {
        case 0:
            var tmpColor = new classColor_RGB(editColor1.get1Value(),editColor1.get2Value(),editColor1.get3Value());
            bandSketch.setC2(tmpColor,selectedKey-1);
            orderColorSketch();
            drawCurrentColor();

        break;
        case 1:
              var tmpColor = new classColor_RGB(editColor2.get1Value(),editColor2.get2Value(),editColor2.get3Value());
              bandSketch.setC1(tmpColor,selectedKey);
              orderColorSketch();
              drawCurrentColor();

        break;
        default:
          document.getElementById("editPage_currentColor").style.background="none";
            document.getElementById("editPage_SetColor").style.background="none";
      }
  }

  somethingChanged = true;

}


function checkColorInputFieldsChange(event){

  var doSpace =0;
  switch (event.target.id) {
    case "id_editPageC1RInput":
    case "id_editPageC1GInput":
    case "id_editPageC1BInput":
    case "id_editPageC2RInput":
    case "id_editPageC2GInput":
    case "id_editPageC2BInput":
    case "id_bandCreatorC1RInput":
    case "id_bandCreatorC1GInput":
    case "id_bandCreatorC1BInput":
    case "id_bandCreatorC2RInput":
    case "id_bandCreatorC2GInput":
    case "id_bandCreatorC2BInput":
        doSpace=1;
        checkInputVal(document.getElementById(event.target.id),true,false);

        if(parseFloat(document.getElementById(event.target.id).value)>255){
            document.getElementById(event.target.id).value = 255;
        }

        if(parseFloat(document.getElementById(event.target.id).value)<0){
            document.getElementById(event.target.id).value = 0;
        }

    break;
    case "id_editPageC1HInput":
    case "id_editPageC2HInput":
    case "id_bandCreatorC1HInput":
    case "id_bandCreatorC2HInput":
    doSpace=2;
      checkInputVal(document.getElementById(event.target.id),true,false);

      if(parseFloat(document.getElementById(event.target.id).value)>360){
           document.getElementById(event.target.id).value = 360;
      }

      if(parseFloat(document.getElementById(event.target.id).value)<0){
           document.getElementById(event.target.id).value = 0;
      }
    break;

    case "id_editPageC1SInput":
    case "id_editPageC1VInput":
    case "id_editPageC2SInput":
    case "id_editPageC2VInput":
    case "id_bandCreatorC1SInput":
    case "id_bandCreatorC1VInput":
    case "id_bandCreatorC2SInput":
    case "id_bandCreatorC2VInput":
      doSpace=2;
       checkInputVal(document.getElementById(event.target.id),true,false);

       if(parseFloat(document.getElementById(event.target.id).value)>100){
            document.getElementById(event.target.id).value = 100;
       }

       if(parseFloat(document.getElementById(event.target.id).value)<0){
            document.getElementById(event.target.id).value = 0;
       }

      break;
    default:

  }



    if(bandCreatorOpen){
      if( doSpace==2){
        var tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC1HInput").value/360);
        var tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC1SInput").value/100);
        var tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC1VInput").value/100);
        var tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor1= tmpHSV.calcRGBColor();

       tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC2HInput").value/360);
       tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC2SInput").value/100);
       tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC2VInput").value/100);
       tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor2= tmpHSV.calcRGBColor();

       document.getElementById("id_bandCreatorC1RInput").value=editColor1.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC1GInput").value=editColor1.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC1BInput").value=editColor1.get3Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC2RInput").value=editColor2.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC2GInput").value=editColor2.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC2BInput").value=editColor2.get3Value().toFixed(numDecimalPlaces)*255;

       initColorpickerBackground("bandCreator_canvasPicker", colorpickerType);
       drawEditPageColorCircles("bandCreator_canvasPicker","bandCreator_canvasPicker2", colorpickerType);
       drawCurrentBandColor();

      }

      if( doSpace==1){
        var tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC1RInput").value/255);
        var tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC1GInput").value/255);
        var tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC1BInput").value/255);
        editColor1 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);


       tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC2RInput").value/255);
       tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC2GInput").value/255);
       tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC2BInput").value/255);
       editColor2 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);

       var tmpHSV = editColor1.calcHSVColor();
       document.getElementById("id_bandCreatorC1HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_bandCreatorC1SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_bandCreatorC1VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;
       tmpHSV = editColor2.calcHSVColor();
       document.getElementById("id_bandCreatorC2HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_bandCreatorC2SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_bandCreatorC2VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;

       initColorpickerBackground("bandCreator_canvasPicker", colorpickerType);
       drawEditPageColorCircles("bandCreator_canvasPicker","bandCreator_canvasPicker2", colorpickerType);
       drawCurrentColor();
      }
    }
    else{
      if( doSpace==2){
        var tmpVal1 = parseFloat(document.getElementById("id_editPageC1HInput").value/360);
        var tmpVal2 = parseFloat(document.getElementById("id_editPageC1SInput").value/100);
        var tmpVal3 = parseFloat(document.getElementById("id_editPageC1VInput").value/100);
        var tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor1= tmpHSV.calcRGBColor();

       tmpVal1 = parseFloat(document.getElementById("id_editPageC2HInput").value/360);
       tmpVal2 = parseFloat(document.getElementById("id_editPageC2SInput").value/100);
       tmpVal3 = parseFloat(document.getElementById("id_editPageC2VInput").value/100);
       tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor2= tmpHSV.calcRGBColor();

       document.getElementById("id_editPageC1RInput").value=editColor1.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC1GInput").value=editColor1.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC1BInput").value=editColor1.get3Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC2RInput").value=editColor2.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC2GInput").value=editColor2.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC2BInput").value=editColor2.get3Value().toFixed(numDecimalPlaces)*255;

       initColorpickerBackground("editPage_canvasPicker", colorpickerType);
       drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
       drawCurrentColor();

      }

      if( doSpace==1){
        var tmpVal1 = parseFloat(document.getElementById("id_editPageC1RInput").value/255);
        var tmpVal2 = parseFloat(document.getElementById("id_editPageC1GInput").value/255);
        var tmpVal3 = parseFloat(document.getElementById("id_editPageC1BInput").value/255);
        editColor1 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);


       tmpVal1 = parseFloat(document.getElementById("id_editPageC2RInput").value/255);
       tmpVal2 = parseFloat(document.getElementById("id_editPageC2GInput").value/255);
       tmpVal3 = parseFloat(document.getElementById("id_editPageC2BInput").value/255);
       editColor2 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);

       var tmpHSV = editColor1.calcHSVColor();
       document.getElementById("id_editPageC1HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_editPageC1SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_editPageC1VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;
       tmpHSV = editColor2.calcHSVColor();
       document.getElementById("id_editPageC2HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_editPageC2SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_editPageC2VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;

       initColorpickerBackground("editPage_canvasPicker", colorpickerType);
       drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
       drawCurrentColor();
      }
    }


}

function checkColorInputFieldsKey(event){


  var doSpace =0;
  switch (event.target.id) {
    case "id_editPageC1RInput":
    case "id_editPageC1GInput":
    case "id_editPageC1BInput":
    case "id_editPageC2RInput":
    case "id_editPageC2GInput":
    case "id_editPageC2BInput":
    case "id_bandCreatorC1RInput":
    case "id_bandCreatorC1GInput":
    case "id_bandCreatorC1BInput":
    case "id_bandCreatorC2RInput":
    case "id_bandCreatorC2GInput":
    case "id_bandCreatorC2BInput":
        doSpace=1;

        checkInputVal(document.getElementById(event.target.id),true,false);

        if(parseFloat(document.getElementById(event.target.id).value)>255){
            document.getElementById(event.target.id).value = 255;
        }

        if(parseFloat(document.getElementById(event.target.id).value)<0){
            document.getElementById(event.target.id).value = 0;
        }

    break;
    case "id_editPageC1HInput":
    case "id_editPageC2HInput":
    case "id_bandCreatorC1HInput":
    case "id_bandCreatorC2HInput":
    doSpace=2;

      checkInputVal(document.getElementById(event.target.id),true,false);

      if(parseFloat(document.getElementById(event.target.id).value)>360){
           document.getElementById(event.target.id).value = 360;
      }

      if(parseFloat(document.getElementById(event.target.id).value)<0){
           document.getElementById(event.target.id).value = 0;
      }
    break;

    case "id_editPageC1SInput":
    case "id_editPageC1VInput":
    case "id_editPageC2SInput":
    case "id_editPageC2VInput":
    case "id_bandCreatorC1SInput":
    case "id_bandCreatorC1VInput":
    case "id_bandCreatorC2SInput":
    case "id_bandCreatorC2VInput":
      doSpace=2;

       checkInputVal(document.getElementById(event.target.id),true,false);

       if(parseFloat(document.getElementById(event.target.id).value)>100){
            document.getElementById(event.target.id).value = 100;
       }

       if(parseFloat(document.getElementById(event.target.id).value)<0){
            document.getElementById(event.target.id).value = 0;
       }

      break;
    default:

  }


  if (event.keyCode == 13) {

    if(bandCreatorOpen){
      if( doSpace==2){
        var tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC1HInput").value/360);
        var tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC1SInput").value/100);
        var tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC1VInput").value/100);
        var tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor1= tmpHSV.calcRGBColor();

       tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC2HInput").value/360);
       tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC2SInput").value/100);
       tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC2VInput").value/100);
       tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor2= tmpHSV.calcRGBColor();

       document.getElementById("id_bandCreatorC1RInput").value=editColor1.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC1GInput").value=editColor1.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC1BInput").value=editColor1.get3Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC2RInput").value=editColor2.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC2GInput").value=editColor2.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_bandCreatorC2BInput").value=editColor2.get3Value().toFixed(numDecimalPlaces)*255;

       initColorpickerBackground("bandCreator_canvasPicker", colorpickerType);
       drawEditPageColorCircles("bandCreator_canvasPicker","bandCreator_canvasPicker2", colorpickerType);
       drawCurrentBandColor();

      }

      if( doSpace==1){
        var tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC1RInput").value/255);
        var tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC1GInput").value/255);
        var tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC1BInput").value/255);
        editColor1 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);


       tmpVal1 = parseFloat(document.getElementById("id_bandCreatorC2RInput").value/255);
       tmpVal2 = parseFloat(document.getElementById("id_bandCreatorC2GInput").value/255);
       tmpVal3 = parseFloat(document.getElementById("id_bandCreatorC2BInput").value/255);
       editColor2 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);

       var tmpHSV = editColor1.calcHSVColor();
       document.getElementById("id_bandCreatorC1HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_bandCreatorC1SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_bandCreatorC1VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;
       tmpHSV = editColor2.calcHSVColor();
       document.getElementById("id_bandCreatorC2HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_bandCreatorC2SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_bandCreatorC2VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;

       initColorpickerBackground("bandCreator_canvasPicker", colorpickerType);
       drawEditPageColorCircles("bandCreator_canvasPicker","bandCreator_canvasPicker2", colorpickerType);
       drawCurrentColor();
      }
    }
    else{
      if( doSpace==2){
        var tmpVal1 = parseFloat(document.getElementById("id_editPageC1HInput").value/360);
        var tmpVal2 = parseFloat(document.getElementById("id_editPageC1SInput").value/100);
        var tmpVal3 = parseFloat(document.getElementById("id_editPageC1VInput").value/100);
        var tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor1= tmpHSV.calcRGBColor();

       tmpVal1 = parseFloat(document.getElementById("id_editPageC2HInput").value/360);
       tmpVal2 = parseFloat(document.getElementById("id_editPageC2SInput").value/100);
       tmpVal3 = parseFloat(document.getElementById("id_editPageC2VInput").value/100);
       tmpHSV = new classColor_HSV(tmpVal1,tmpVal2,tmpVal3);
        editColor2= tmpHSV.calcRGBColor();

       document.getElementById("id_editPageC1RInput").value=editColor1.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC1GInput").value=editColor1.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC1BInput").value=editColor1.get3Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC2RInput").value=editColor2.get1Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC2GInput").value=editColor2.get2Value().toFixed(numDecimalPlaces)*255;
       document.getElementById("id_editPageC2BInput").value=editColor2.get3Value().toFixed(numDecimalPlaces)*255;

       initColorpickerBackground("editPage_canvasPicker", colorpickerType);
       drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
       drawCurrentColor();

      }

      if( doSpace==1){
        var tmpVal1 = parseFloat(document.getElementById("id_editPageC1RInput").value/255);
        var tmpVal2 = parseFloat(document.getElementById("id_editPageC1GInput").value/255);
        var tmpVal3 = parseFloat(document.getElementById("id_editPageC1BInput").value/255);
        editColor1 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);


       tmpVal1 = parseFloat(document.getElementById("id_editPageC2RInput").value/255);
       tmpVal2 = parseFloat(document.getElementById("id_editPageC2GInput").value/255);
       tmpVal3 = parseFloat(document.getElementById("id_editPageC2BInput").value/255);
       editColor2 = new classColor_RGB(tmpVal1,tmpVal2,tmpVal3);

       var tmpHSV = editColor1.calcHSVColor();
       document.getElementById("id_editPageC1HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_editPageC1SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_editPageC1VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;
       tmpHSV = editColor2.calcHSVColor();
       document.getElementById("id_editPageC2HInput").value=tmpHSV.get1Value().toFixed(numDecimalPlaces)*360;
       document.getElementById("id_editPageC2SInput").value=tmpHSV.get2Value().toFixed(numDecimalPlaces)*100;
       document.getElementById("id_editPageC2VInput").value=tmpHSV.get3Value().toFixed(numDecimalPlaces)*100;

       initColorpickerBackground("editPage_canvasPicker", colorpickerType);
       drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
       drawCurrentColor();
      }
    }


  }




}
