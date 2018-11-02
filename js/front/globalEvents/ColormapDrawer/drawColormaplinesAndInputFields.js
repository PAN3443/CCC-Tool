 /////////////////////////////////////////////////////////////////////////////////////////////
//// Lines
//////////////////////////////////////////////////////////////////////////////////////////////

function drawLines(cmsID,fromIsLinear, toIsLinear, tmpCMS){

  var canvasObject = document.getElementById(cmsID);
  var rect = canvasObject.getBoundingClientRect();
  canvasObject.width = rect.width;
  canvasObject.height = rect.height;

  var canvasContex = canvasObject.getContext("2d");

  var colormapWidth = canvasObject.width * 0.9;
  var xPos = canvasObject.width * 0.05;

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

    canvasContex.lineTo(xPos + pos2, canvasObject.height);
    canvasContex.strokeStyle = 'rgb(0,0,0)';
    canvasContex.stroke();

  }

}




/////////////////////////////////////////////////////////////////////////////////////////////
//// Input Fields
//////////////////////////////////////////////////////////////////////////////////////////////


function drawSketchInputFields(cms,sketchRefObjID, asInputFields){

  var sketchRefObj = document.getElementById(sketchRefObjID);

  var box = sketchRefObj.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left+(box.width*0.05) + scrollLeft - clientLeft;
  var yposHTML = box.height + top;
  var width = box.width*0.9;


  for (var i = 0; i < cms.getKeyLength()-1; i++) {

    /////////////////// draw ref /////////
    var xposHTML = (i / (cms.getKeyLength()-1)) * width + left;
    var tmpText = '' + cms.getRefPosition(i); //.toFixed(numDecimalPlaces);

    if(asInputFields){

      var inputField = document.createElement("input");
      inputField.setAttribute('type', 'text');
      inputField.setAttribute('value', tmpText);
      var inputID = "id_SketchKeyValInput" + i;
      inputField.id = inputID;
      document.body.appendChild(inputField);

      inputField.style.width = "30px";
      inputField.style.height = "15px";
      inputField.style.fontSize = "12px";
      inputField.style.paddingLeft = "5px";
      inputField.style.paddingRight = "5px";
      inputField.style.margin = "0px";
      inputField.style.zIndex = "2";

      inputField.style.position = "absolute";
      inputField.style.top = Math.round(yposHTML) + "px";
      inputField.style.left = Math.round(xposHTML) + "px";
      refElementContainer.push(inputField);
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
        tmpText = '' + cms.getRefPosition(i+1); //.toFixed(numDecimalPlaces);
        xposHTML = width + left;
        var inputField2 = document.createElement("input");
        inputField2.setAttribute('type', 'text');
        inputField2.setAttribute('value', tmpText);
        var inputID = "id_SketchKeyValInput" + i + 1;
        inputField2.id = inputID;
        document.body.appendChild(inputField2);

        //inputField.style.width = "min-content";
        inputField2.style.width = "30px";
        inputField2.style.height = "15px";
        inputField2.style.fontSize = "12px";
        //inputField.style.background = "rgb(255,255,255)";
        inputField2.style.paddingLeft = "5px";
        inputField2.style.paddingRight = "5px";
        //inputField.style.border = "2px solid rgb(0,0,0)";
        inputField2.style.margin = "0px";
        inputField2.style.zIndex = "2";

        inputField2.style.position = "absolute";
        inputField2.style.top = Math.round(yposHTML) + "px";
        inputField2.style.left = Math.round(xposHTML) + "px";
        refElementContainer.push(inputField2);
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

      inputField.type = "number";
      inputField.step = "any";
      inputField.style.width = "min-content";
      //inputField.style.width = "3vw";
      inputField.style.height = "15px";
      inputField.style.fontSize = "12px";
      inputField.style.background = "rgb(255,255,255)";
      inputField.style.paddingLeft = "5px";
      inputField.style.paddingRight = "5px";
      //inputField.style.border = "1px solid rgb(0,0,0)";
      inputField.style.margin = "0px";
      inputField.style.zIndex = "2";

      inputField.style.position = "absolute";
      inputField.style.top = Math.round(yposHTML) + "px";
      inputField.style.left = Math.round(xposHTML) + "px";
      refElementContainer.push(inputField);
      xposHTML = xposHTML - (inputField.getBoundingClientRect().width / 2);
      inputField.style.left = Math.round(xposHTML) + "px";


      /////////////////// special case: last element /////////
      if (i == cms.getKeyLength()-2) {
        tmpText = cms.getRefPosition(i+1) + "";
        if(cms.getRefPosition(i+1).countDecimals()>2){
          tmpText = cms.getRefPosition(i+1).toFixed(2) + "..";
        }
        xposHTML = width + left;
        var inputField2 = document.createElement("p");
        inputField2.innerHTML = tmpText;
        var inputID = "id_SketchKeyValInput" + i + 1;
        inputField2.id = inputID;
        document.body.appendChild(inputField2);

        inputField2.style.width = "min-content";
        //inputField2.style.width = "3vw";
        inputField2.style.height = "15px";
        inputField2.style.fontSize = "12px";
        inputField2.style.background = "rgb(255,255,255)";
        inputField2.style.paddingLeft ="5px";
        inputField2.style.paddingRight = "5px";
        //inputField2.style.border = "1px solid rgb(0,0,0)";
        inputField2.style.margin = "0px";
        inputField2.style.zIndex = "2";

        inputField2.style.position = "absolute";
        inputField2.style.top = Math.round(yposHTML) + "px";
        inputField2.style.left = Math.round(xposHTML) + "px";
        refElementContainer.push(inputField2);
        xposHTML = xposHTML - (inputField2.getBoundingClientRect().width / 2);
        inputField2.style.left = Math.round(xposHTML) + "px";
      }

    }
  }


}


function changeKeyValueInput(keyIndex, fielID) {

  var inputObj = document.getElementById(fielID);

  checkInputVal(inputObj, true, true);

  var newRef = parseFloat(inputObj.value);

  switch (keyIndex) {
    case 0:
      var nextRef = globalCMS1.getRefPosition(1);
      if(nextRef<=newRef){
        openAlert("Attention: You can not set the reference value greater than or equal to the reference value of the right neighboring key! Please enter another value.");
        inputObj.value=globalCMS1.getRefPosition(0);
      }
      else {
        globalCMS1.setRefPosition(keyIndex,newRef);
        updateEditPage();
        saveCreateProcess();
      }
      break;
    case globalCMS1.getKeyLength()-1:
      var prevRef = globalCMS1.getRefPosition(keyIndex-1);
      if(prevRef>=newRef){
        openAlert("Attention: You can not set the reference value smaller than or equal to the reference value of the left neighboring key! Please enter another value.");
        inputObj.value=globalCMS1.getRefPosition(keyIndex);
      }
      else {
        globalCMS1.setRefPosition(keyIndex,newRef);
        updateEditPage();
        saveCreateProcess();
      }

      break;
    default:
    var nextRef = globalCMS1.getRefPosition(keyIndex+1);
    if(nextRef<=newRef){
      openAlert("Attention: You can not set the reference value greater than or equal to the reference value of the right neighboring key! Please enter another value.");
      inputObj.value=globalCMS1.getRefPosition(keyIndex);
    }
    else{
      var prevRef = globalCMS1.getRefPosition(keyIndex-1);
      if(prevRef>=newRef){
        openAlert("Attention: You can not set the reference value smaller than or equal to the reference value of the left neighboring key! Please enter another value.");
        inputObj.value=globalCMS1.getRefPosition(keyIndex);
      }
      else{
        globalCMS1.setRefPosition(keyIndex,newRef);
        updateEditPage();
        saveCreateProcess();
      }
    }
  }

}


/*function createKeyInputBox(leftVal, topVal, tmpText, index) {

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

}*/
