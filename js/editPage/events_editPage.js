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

  switch (keyType[selectedKey]) {
    case "nil key":
      document.getElementById("editSide_Radiobutton_KeyTypeNil").checked = true;

      break;
    case "twin key":
      document.getElementById("editSide_Radiobutton_KeyTypeTwin").checked = true;

      break;
    case "left key":
      document.getElementById("editSide_Radiobutton_KeyTypeLeft").checked = true;
      break;
    case "right key":
      document.getElementById("editSide_Radiobutton_KeyTypeRight").checked = true;
      break;
    default:
    document.getElementById("editSide_Radiobutton_KeyTypeDual").checked = true;

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
        tmpColor.set1Value(tmpColor.get1Value()*0.75);
        tmpColor.set2Value(tmpColor.get2Value()*0.75);
        tmpColor.set3Value(tmpColor.get3Value()*0.75);

        bandSketch.setC1(tmpColor, selectedKey);

        var tmpColor2 = bandSketch.getC1Color(selectedKey-1,colorspaceModus);
        tmpColor2.set1Value(tmpColor.get1Value()*0.75);
        tmpColor2.set2Value(tmpColor.get2Value()*0.75);
        tmpColor2.set3Value(tmpColor.get3Value()*0.75);

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
        tmpColor.set1Value(tmpColor.get1Value()*0.5);
        tmpColor.set2Value(tmpColor.get2Value()*0.5);
        tmpColor.set3Value(tmpColor.get3Value()*0.5);

        bandSketch.setC1(tmpColor, 0);
      }

      break;
    default:
    // dual key+
        if(keyType[selectedKey]==="twin key" || keyType[selectedKey]==="left key"){
            var tmpColor = bandSketch.getC2Color(0,colorspaceModus);
            tmpColor.set1Value(tmpColor.get1Value()*0.5);
            tmpColor.set2Value(tmpColor.get2Value()*0.5);
            tmpColor.set3Value(tmpColor.get3Value()*0.5);

            bandSketch.setC1(tmpColor, selectedKey);
            bandSketch.setC2(tmpColor, selectedKey-1);

        }


  }

  orderColorSketch();
  selectKey();
}
