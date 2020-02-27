function drawGRBackground(canvasContex,fixedColor){
  canvasContex.clearRect(0, 0, canvasContex.canvas.clientWidth, canvasContex.canvas.clientHeight);
  var canvasData =  getRGBBackground( fixedColor,canvasContex.canvas.clientWidth, "GR"); //canvasContex.getImageData(0, 0, hueResolution, hueResolution);

  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  draw_RGB_Coordinates(canvasContex, canvasContex.canvas.clientWidth, "G", "R");
}

function drawBRBackground(canvasContex,fixedColor){

  canvasContex.clearRect(0, 0, canvasContex.canvas.clientWidth, canvasContex.canvas.clientHeight);
  var canvasData = getRGBBackground( fixedColor,canvasContex.canvas.clientWidth,"BR");

  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  draw_RGB_Coordinates(canvasContex, canvasContex.canvas.clientWidth, "B", "R");
}

function drawGBBackground(canvasContex,fixedColor){
  canvasContex.clearRect(0, 0, canvasContex.canvas.clientWidth, canvasContex.canvas.clientHeight);
  var canvasData = getRGBBackground( fixedColor,canvasContex.canvas.clientWidth,"GB");

  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  draw_RGB_Coordinates(canvasContex, canvasContex.canvas.clientWidth, "G", "B");
}

function getRGBBackground(fixedColor,hueResolution, type){

  var xStart = hueResolution * 0.1;
  var yStart = hueResolution * 0.9;
  var xEnd = hueResolution * 0.8;
  var yEnd = hueResolution * 0.2;
  var xWidth = xEnd - xStart;
  var yHeight = yStart - yEnd;

  var fixedValue = 0;

  if(fixedColor!=undefined){
    switch (type) {
      case "GR":
        fixedValue=fixedColor.get3Value();
        break;
        case "BR":
          fixedValue=fixedColor.get2Value();
          break;
          case "GB":
            fixedValue=fixedColor.get1Value();
            break;
    }
  }

  var tmpRGB= new class_Color_RGB(1,1,1);

  var background = new ImageData(hueResolution, hueResolution);

  for (var x = 0; x < hueResolution; x++) {

    for (var y = 0; y < hueResolution; y++) {

      if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
        // calc hsv color
        var indices = getColorIndicesForCoord(x, y, hueResolution);

        var xVal = (x - xStart) / xWidth;
        var yVal = (yStart - y) / yHeight;


        switch (type) {
          case "GR":
            tmpRGB.set1Value(yVal);
            tmpRGB.set2Value(xVal);
            tmpRGB.set3Value(fixedValue);
            break;
            case "BR":
            tmpRGB.set1Value(yVal);
            tmpRGB.set2Value(fixedValue);
            tmpRGB.set3Value(xVal);
              break;
              case "GB":
                tmpRGB.set1Value(fixedValue);
                tmpRGB.set2Value(xVal);
                tmpRGB.set3Value(yVal);
                break;
        }


        if(doColorblindnessSim){
          var tmpLMS = tmpRGB.calcLMSColor();
          tmpRGB.deleteReferences();
          tmpRGB = tmpLMS.calcColorBlindRGBColor();
          tmpLMS.deleteReferences();
          tmpLMS=null;
        }

        background.data[indices[0]] = Math.round(tmpRGB.get1Value() * 255); // r
        background.data[indices[1]] = Math.round(tmpRGB.get2Value() * 255); // g
        background.data[indices[2]] = Math.round(tmpRGB.get3Value() * 255); // b
        background.data[indices[3]] = 255; //a
      }

    }
  }

  tmpRGB.deleteReferences();
  tmpRGB=null;

  return background;
}


///////////////////////////////////////////////////////////////////////////////


function drawHSVBackground(canvasContex,fixedColor){
  canvasContex.clearRect(0, 0, canvasContex.canvas.clientWidth, canvasContex.canvas.clientHeight);
  var colorspaceBackgroundData = getHSVBackground( fixedColor,canvasContex.canvas.clientHeight);//canvasContex.getImageData(0, 0, hueResolution, hueResolution);
  canvasContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;
}

function getHSVBackground( fixedColor,hueResolution){

  var background = new ImageData(hueResolution, hueResolution);

  var colorspaceCenterX = Math.round(hueResolution / 2);
  var colorspaceCenterY = Math.round(hueResolution / 2);
  var colorspaceRadius = Math.round((hueResolution*0.95 / 2));// * radiusratio);

  var vVal = 1.0;

  if (fixedColor!=undefined)
    vVal=fixedColor.getVValue();

  var colorRGB;
  for (var x = 0; x < hueResolution; x++) {

    for (var y = 0; y < hueResolution; y++) {

      var dis = Math.sqrt(Math.pow(colorspaceCenterX - x, 2) + Math.pow(colorspaceCenterY - y, 2));

      if (dis <= colorspaceRadius) {
        // calc hsv color

        var tmpY= hueResolution-y;
        var ty = (tmpY) - (colorspaceCenterY);
        var tx = x - colorspaceCenterX;
        var angle = atan2_360Degree(tx,ty)/360; // values 0-1 ...
        var hVal = angle;
        var sVal = dis / colorspaceRadius;

        var colorHSV = new class_Color_HSV(hVal, sVal, vVal);
        colorRGB = colorHSV.calcRGBColor();

        if(doColorblindnessSim){
          var tmpLMS = colorRGB.calcLMSColor();
          colorRGB = tmpLMS.calcColorBlindRGBColor();
        }

        var indices = getColorIndicesForCoord(x, y, hueResolution);

        background.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
        background.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
        background.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
        background.data[indices[3]] = 255; //a


      }

    }

  }

  return background;
}

function drawLabBackground(canvasContex,fixedColor){
  canvasContex.clearRect(0, 0, canvasContex.canvas.clientWidth, canvasContex.canvas.clientHeight);
  var colorspaceBackgroundData = getLabBackground( fixedColor,canvasContex.canvas.clientHeight);//canvasContex.getImageData(0, 0, hueResolution, hueResolution);
  canvasContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;
}

function getLabBackground(fixedColor,hueResolution){
  var background = new ImageData(hueResolution, hueResolution);

  var colorspaceCenterX = Math.round(hueResolution / 2);
  var colorspaceCenterY = Math.round(hueResolution / 2);
  var colorspaceRadius = Math.round((hueResolution / 2));// * radiusratio);

  var lVal = 50;

  if (fixedColor!=undefined)
    lVal=fixedColor.getLValue();

  for (var x = 0; x < hueResolution; x++) {

    for (var y = 0; y < hueResolution; y++) {


        var tmpY = hueResolution-y;
        var aVal = ((x - colorspaceCenterX) / (hueResolution / 2)) * labSpaceRange;
        var bVal = ((tmpY - colorspaceCenterY) / (hueResolution / 2)) * labSpaceRange;

        var colorLAB = new class_Color_LAB(lVal, aVal, bVal);
        var colorRGB = undefined;

        if(colorLAB.checkRGBPossiblity() || fixedColor==undefined){
          colorRGB = colorLAB.calcRGBColor();
        }
        else {
          //colorRGB = new class_Color_RGB(0.5, 0.5, 0.5);
          colorLAB.deleteReferences();  // Problem -> deleteReferences cost a lot of time -> worker implementation
          continue;
        }
        colorLAB.deleteReferences(); // Problem -> deleteReferences cost a lot of time -> worker implementation

        if(doColorblindnessSim){
          var tmpLMS = colorRGB.calcLMSColor();
          colorRGB = tmpLMS.calcColorBlindRGBColor();
          tmpLMS.deleteReferences();
        }

        var indices = getColorIndicesForCoord(x, y, hueResolution);

        background.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
        background.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
        background.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
        background.data[indices[3]] = 255; //a
        colorRGB.deleteReferences();

    }

  }

  return background;
}

function drawDIN99Background(canvasContex,fixedColor){

  canvasContex.clearRect(0, 0, canvasContex.canvas.clientWidth, canvasContex.canvas.clientHeight);

  var colorspaceBackgroundData = getDIN99Background( fixedColor,canvasContex.canvas.clientHeight);//canvasContex.getImageData(0, 0, hueResolution, hueResolution);

  canvasContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;

}

function getDIN99Background(fixedColor,hueResolution){
  var background = new ImageData(hueResolution, hueResolution);

  rangeA99 = rangeA99Pos - rangeA99Neg;
  rangeB99 = rangeB99Pos - rangeB99Neg;

  var colorspaceCenterX = Math.round(hueResolution / 2);
  var colorspaceCenterY = Math.round(hueResolution / 2);
  var colorspaceRadius = Math.round((hueResolution / 2));// * radiusratio);

  var l99Val = 50;

  if (fixedColor!=undefined)
    l99Val=fixedColor.getL99Value();


  for (var x = 0; x < hueResolution; x++) {

    for (var y = 0; y < hueResolution; y++) {

        var tmpY = hueResolution-y;
        var a99Val = (x  / hueResolution) * rangeA99 + rangeA99Neg;
        var b99Val = (tmpY / hueResolution) * rangeB99 + rangeB99Neg;

        var colorDIN99 = new class_Color_DIN99(l99Val, a99Val, b99Val);
        var colorRGB = undefined;
        if (colorDIN99.checkRGBPossiblity() || fixedColor==undefined){
          colorRGB = colorDIN99.calcRGBColor();
        } else {
          //colorRGB = new class_Color_RGB(0.5, 0.5, 0.5);
          colorDIN99.deleteReferences();
          continue;
        }
        colorDIN99.deleteReferences();

        /*if (colorRGB.getRValue() == 0 && colorRGB.getGValue() == 0 && colorRGB.getBValue() == 0) {
            if (colorDIN99.getL99Value() != 0 || colorDIN99.getA99Value() != 0 || colorDIN99.getB99Value() != 0) {
              colorRGB = new class_Color_RGB(1, 1, 1);
            }
        }*/

        if(doColorblindnessSim){
          var tmpLMS = colorRGB.calcLMSColor();
          colorRGB = tmpLMS.calcColorBlindRGBColor();
          tmpLMS.deleteReferences();
        }

        var indices = getColorIndicesForCoord(x, y, hueResolution);
        background.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
        background.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
        background.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
        background.data[indices[3]] = 255; //a
        colorRGB.deleteReferences();

    }
  }

  return background;
}

function drawLCHBackground(canvasContex,fixedColor){

  canvasContex.clearRect(0, 0, canvasContex.canvas.clientWidth, canvasContex.canvas.clientHeight);

  var colorspaceBackgroundData = getLCHBackground(fixedColor,canvasContex.canvas.clientHeight);//canvasContex.getImageData(0, 0, hueResolution, hueResolution);
  canvasContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;

}

function getLCHBackground(fixedColor,hueResolution){

  var background = new ImageData(hueResolution, hueResolution);

  var errorRGBColor = new class_Color_RGB(0.5, 0.5, 0.5);

  var colorspaceCenterX = Math.round(hueResolution / 2);
  var colorspaceCenterY = Math.round(hueResolution / 2);
  var colorspaceRadius = Math.round((hueResolution*0.95 / 2));// * radiusratio);

  var lVal = 0.50;

  if (fixedColor!=undefined)
    lVal=fixedColor.getLValue();

  var colorRGB;
  for (var x = 0; x < hueResolution; x++) {

    for (var y = 0; y < hueResolution; y++) {

      var dis = Math.sqrt(Math.pow(colorspaceCenterX - x, 2) + Math.pow(colorspaceCenterY - y, 2));

      if (dis <= colorspaceRadius) {
        // calc hsv color

        var tmpY= hueResolution-y;
        var ty = (tmpY) - (colorspaceCenterY);
        var tx = x - colorspaceCenterX;
        var angle = atan2_360Degree(tx,ty)/360; // values 0-1 ...
        var hVal = angle;
        var cVal = dis / colorspaceRadius;

        var colorLCH = new class_Color_LCH(lVal,cVal,hVal);

        if (fixedColor!=undefined){
          colorRGB = colorLCH.calcRGBColorCorrect(errorRGBColor);
        } else{
          colorRGB = colorLCH.calcRGBColor();
        }

        if(doColorblindnessSim){
          var tmpLMS = colorRGB.calcLMSColor();
          colorRGB = tmpLMS.calcColorBlindRGBColor();
        }

        var indices = getColorIndicesForCoord(x, y, hueResolution);

        background.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
        background.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
        background.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
        background.data[indices[3]] = 255; //a


      }

    }

  }

  return background;
}
