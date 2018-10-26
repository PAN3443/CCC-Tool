function drawConstantBands(){
  //---------------------------
  // --------- Empty Divs
  document.getElementById('id_EditPage_ConstBandDiv').innerHTML = "";

  //---------------------------
  // --------- Const
  for(var i=0; i<constBands.length; i++){

      var iDiv = document.createElement('div');
      iDiv.id = 'const'+i;
      iDiv.className = 'class_predefinedConstBands';
      iDiv.setAttribute('draggable', true);
      iDiv.style.background = constBands[i].getRGBString();
      document.getElementById('id_EditPage_ConstBandDiv').appendChild(iDiv);
      iDiv.addEventListener("dragstart", bandOnDragStart);
      iDiv.addEventListener("dragend", bandOnDragEnd);
      iDiv.style.cursor = "move";
  }
}

function drawScaledBands(){
  document.getElementById('id_EditPage_ScaleBandDiv').innerHTML = "";

  var resolutionX = 100;

  //---------------------------
  // --------- Scale
  for(var i=0; i<scaleBands.length; i++){

      var div = document.createElement("div");
      div.className = "row";
      div.style.width = "100%";
      div.style.marginTop = "1vh";

      var iCan = document.createElement('canvas');
      var id = 'scale'+i
      iCan.id = id;
      iCan.className = 'class_predefinedScaledBands';
      iCan.setAttribute('draggable', true);
      iCan.addEventListener("dragstart", bandOnDragStart);
      iCan.addEventListener("dragend", bandOnDragEnd);
      iCan.style.cursor = "move";

      var tmpC1RGB = scaleBands[i][0];
      var tmpC2RGB = scaleBands[i][1];

      var reverseButton = document.createElement("div");
      reverseButton.className = "class_reversebuttonEditPage classButtonWhite";
      reverseButton.innerHTML = "&#8646;";
      reverseButton.style.cursor = "pointer";

      reverseButton.onclick = (function(tmpIndex) {
      return function() {
          // do the reverse
          var tmpVar = scaleBands[tmpIndex][0];
          scaleBands[tmpIndex][0]=scaleBands[tmpIndex][1];
          scaleBands[tmpIndex][1]=tmpVar;
          var canObj = document.getElementById("scale"+tmpIndex);
          var tmpC1 = scaleBands[tmpIndex][0];
          var tmpC2 = scaleBands[tmpIndex][1];
          drawCanvasBand(canObj, tmpC1, tmpC2,resolutionX);

      };
    })(i);

      div.appendChild(iCan);
      div.appendChild(reverseButton);
      document.getElementById('id_EditPage_ScaleBandDiv').appendChild(div);

      drawCanvasBand(iCan, tmpC1RGB, tmpC2RGB,resolutionX);

  }
}


function drawConstCustomBand(){
  document.getElementById("id_editPage_customConstBand").style.background=customConstBandColor.calcRGBColor().getRGBString();
  document.getElementById("id_editPage_customConstColor").style.background=customConstBandColor.calcRGBColor().getRGBString();
}


function drawScaleCustomBand(){
  document.getElementById("id_editPage_customScaleColor1").style.background=customScaleBandColor1.calcRGBColor().getRGBString();
  document.getElementById("id_editPage_customScaleColor2").style.background=customScaleBandColor2.calcRGBColor().getRGBString();

  var resolutionX = 100;
  drawCanvasBand(document.getElementById("id_editPage_customScaleBand"), customScaleBandColor1, customScaleBandColor2,resolutionX);
}


function drawCanvasBand(canvasObject, color1, color2,resolutionX){

            canvasObject.width = resolutionX;
            canvasObject.height = 1;

            if(color1 == undefined){
              // case constant band
              color1=color2;
            }

            var canvasContex = canvasObject.getContext("2d");
            var canvasData = canvasContex.getImageData(0, 0, resolutionX, 1);

            var tmpcolor1, tmpcolor2;
            switch(globalCMS1.getInterpolationSpace()){
                case "rgb":

                    if(color1.getColorType()===globalCMS1.getInterpolationSpace())
                      tmpcolor1=color1;
                    else
                      tmpcolor1=color1.calcRGBColor();

                    if(color2.getColorType()===globalCMS1.getInterpolationSpace())
                      tmpcolor2=color2;
                    else
                      tmpcolor2=color2.calcRGBColor();


                break;
                case "hsv":
                    if(color1.getColorType()===globalCMS1.getInterpolationSpace())
                      tmpcolor1=color1;
                    else
                      tmpcolor1=color1.calcHSVColor();

                    if(color2.getColorType()===globalCMS1.getInterpolationSpace())
                      tmpcolor2=color2;
                    else
                      tmpcolor2=color2.calcHSVColor();

                break;
                case "lab":

                    if(color1.getColorType()===globalCMS1.getInterpolationSpace())
                      tmpcolor1=color1;
                    else
                      tmpcolor1=color1.calcLABColor();

                    if(color2.getColorType()===globalCMS1.getInterpolationSpace())
                      tmpcolor2=color2;
                    else
                      tmpcolor2=color2.calcLABColor();

                break;
                case "din99":
                    if(color1.getColorType()===globalCMS1.getInterpolationSpace())
                      tmpcolor1=color1;
                    else
                      tmpcolor1=color1.calcDIN99Color();

                    if(color2.getColorType()===globalCMS1.getInterpolationSpace())
                      tmpcolor2=color2;
                    else
                      tmpcolor2=color2.calcDIN99Color();

                break;
                default:
                console.log("Error at the changeColorspace function");
                return;
            }//*/

            if(tmpcolor1.get1Value()!=tmpcolor2.get1Value() ||  // i = scaled
               tmpcolor1.get2Value()!=tmpcolor2.get2Value() ||
               tmpcolor1.get3Value()!=tmpcolor2.get3Value()){
              canvasData=createScaledBand(canvasData, 0, resolutionX, 1, tmpcolor1, tmpcolor2, resolutionX);

            }
            else{
              canvasData=createConstantBand(canvasData, 0, resolutionX, 1, tmpcolor1, resolutionX);
            }

            canvasContex.putImageData(canvasData, 0, 0);
}
