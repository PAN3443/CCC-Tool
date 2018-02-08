function editPage_delteKey(){
bandSketch.deleteKey(selectedKey);
globalColormap1=bandSketch.sketch2Colormap(colorspaceModus, globalColormap1.getColormapName());
orderColorSketch();
addKeyButtons();
}


function editPage_drawKeys(canvasID, tmpColormap){

    keyRectPointSketch = [];

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

    keyCounter = 0;
    keyType=[];
    // draw keys
    for (var i = 0; i < tmpColormap.getNumColors(); i++) {

      var tmpKey = tmpColormap.getKey(i);
      var colorrectYPos = yPos - distanceColorrects - colorrectHeigth;
      var colorrectXPos = xPos - (colorrectWitdh / 2);



      if(twinStarted!=true && leftStarted!=true){
        keyCounter++;
        keyType.push(tmpKey);
        var text = ""+keyCounter;
        canvasContex.font = labelFontSize+"px Arial";
        canvasContex.fillStyle = 'rgb(0,0,0)';
        canvasContex.fillText(text,xPos-(labelFontSize/2),colorrectYPos-labelFontSize);
      }

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
          keyRectPointSketch.push(tmpArray);

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
            keyRectPointSketch.push(tmpArray);

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
          keyRectPointSketch.push(tmpArray);

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
          keyRectPointSketch.push(tmpArray);

          drawColorRect(canvasContex, colorrectXPos, colorrectYPos, colorrectWitdh, colorrectHeigth, rgbColor1, false);

          xPos+=bandWidth;

      }

    }


}

function colorChange(){
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
        keyDivArray[selectedKey].style.borderColor = "rgb(0,191,255)";
        keyDivArray[selectedKey].style.color = "rgb(0,191,255)";
        selectKey();

    };
    })(i);


    container.appendChild(selectButton);
    keyDivArray.push(selectButton);

  }


  selectedKey=0;
  keyDivArray[selectedKey].style.borderColor = "rgb(0,191,255)";
  keyDivArray[selectedKey].style.color = "rgb(0,191,255)";
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
}

function changeColorpickerType(event){
  switch (event.target.id) {
    case "editSide_Radiobutton_PickerRG_B":
      colorpickerType="RG_B";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="RG";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="B";
    break;
    case "editSide_Radiobutton_PickerRB_G":
      colorpickerType="RB_G";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="RB";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="G";
    break;
    case "editSide_Radiobutton_PickerGB_R":
      colorpickerType="GB_R";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="GB";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="R";
    break;
    case "editSide_Radiobutton_PickerHS_V":
      colorpickerType="HS_V";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="HS";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="V";
    break;
    case "editSide_Radiobutton_PickerHV_S":
      colorpickerType="HV_S";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="HV";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="S";
    break;
    case "editSide_Radiobutton_PickerSV_H":
      colorpickerType="SV_H";
      document.getElementById("editPage_canvasPicker_Label").innerHTML="SV";
      document.getElementById("editPage_canvasPicker2_Label").innerHTML="H";
    break;
    default:

  }

  initColorpickerBackground("editPage_canvasPicker", colorpickerType);
  drawEditPageColorCircles("editPage_canvasPicker","editPage_canvasPicker2", colorpickerType);
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

function checkColorInputFieldsKey(event){


  var doSpace =0;
  switch (event.target.id) {
    case "id_editPageC1RInput":
    case "id_editPageC1GInput":
    case "id_editPageC1BInput":
    case "id_editPageC2RInput":
    case "id_editPageC2GInput":
    case "id_editPageC2BInput":
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
