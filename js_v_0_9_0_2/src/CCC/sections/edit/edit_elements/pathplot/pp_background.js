

function drawRGBBackground(canvasContex_GR,canvasContex_BR,canvasContex_GB,fixedColor) {
    canvasContex_GR.clearRect(0, 0, canvasContex_GR.canvas.clientWidth, canvasContex_GR.canvas.clientHeight);
    canvasContex_BR.clearRect(0, 0, canvasContex_BR.canvas.clientWidth, canvasContex_BR.canvas.clientHeight);
    canvasContex_GB.clearRect(0, 0, canvasContex_GB.canvas.clientWidth, canvasContex_GB.canvas.clientHeight);

    var canvasData_GR = new ImageData(canvasContex_GR.canvas.clientWidth, canvasContex_GR.canvas.clientHeight);
    var canvasData_BR = new ImageData(canvasContex_BR.canvas.clientWidth, canvasContex_BR.canvas.clientHeight);
    var canvasData_GB = new ImageData(canvasContex_GB.canvas.clientWidth, canvasContex_GB.canvas.clientHeight);

    var hueResolution = canvasContex_GR.canvas.clientWidth;
    var xStart = hueResolution * 0.1;
    var yStart = hueResolution * 0.9;
    var xEnd = hueResolution * 0.8;
    var yEnd = hueResolution * 0.2;
    var xWidth = xEnd - xStart;
    var yHeight = yStart - yEnd;

    var tmpRGB_GR = new class_Color_RGB(0,0,0);
    var tmpRGB_BR = new class_Color_RGB(0,0,0);
    var tmpRGB_GB = new class_Color_RGB(0,0,0);

    if(fixedColor!=undefined){
      tmpRGB_GR.set3Value(fixedColor.get3Value());
      tmpRGB_BR.set2Value(fixedColor.get2Value());
      tmpRGB_GB.set1Value(fixedColor.get1Value());
    }

    for (var x = 0; x < hueResolution; x++) {
      for (var y = 0; y < hueResolution; y++) {

        if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
          // calc hsv color
          var indices = getColorIndicesForCoord(x, y, hueResolution);

          var xVal = (x - xStart) / xWidth;
          var yVal = (yStart - y) / yHeight;

          tmpRGB_GR.set1Value(yVal);
          tmpRGB_GR.set2Value(xVal);

          tmpRGB_BR.set1Value(yVal);
          tmpRGB_BR.set3Value(xVal);

          tmpRGB_GB.set2Value(xVal);
          tmpRGB_GB.set3Value(yVal);

          if(doColorblindnessSim){
            var tmpLMS = tmpRGB_GR.calcLMSColor();
            tmpRGB_GR.deleteReferences();
            tmpRGB_GR = tmpLMS.calcColorBlindRGBColor();
            tmpLMS.deleteReferences();

            tmpLMS = tmpRGB_BR.calcLMSColor();
            tmpRGB_BR.deleteReferences();
            tmpRGB_BR = tmpLMS.calcColorBlindRGBColor();
            tmpLMS.deleteReferences();

            tmpLMS = tmpRGB_GB.calcLMSColor();
            tmpRGB_GB.deleteReferences();
            tmpRGB_GB = tmpLMS.calcColorBlindRGBColor();
            tmpLMS.deleteReferences();
          }

          canvasData_GR.data[indices[0]] = Math.round(tmpRGB_GR.get1Value() * 255); // r
          canvasData_GR.data[indices[1]] = Math.round(tmpRGB_GR.get2Value() * 255); // g
          canvasData_GR.data[indices[2]] = Math.round(tmpRGB_GR.get3Value() * 255); // b
          canvasData_GR.data[indices[3]] = 255; //a

          canvasData_BR.data[indices[0]] = Math.round(tmpRGB_BR.get1Value() * 255); // r
          canvasData_BR.data[indices[1]] = Math.round(tmpRGB_BR.get2Value() * 255); // g
          canvasData_BR.data[indices[2]] = Math.round(tmpRGB_BR.get3Value() * 255); // b
          canvasData_BR.data[indices[3]] = 255; //a

          canvasData_GB.data[indices[0]] = Math.round(tmpRGB_GB.get1Value() * 255); // r
          canvasData_GB.data[indices[1]] = Math.round(tmpRGB_GB.get2Value() * 255); // g
          canvasData_GB.data[indices[2]] = Math.round(tmpRGB_GB.get3Value() * 255); // b
          canvasData_GB.data[indices[3]] = 255; //a
        }

      }
    }

    tmpRGB_GR.deleteReferences();
    tmpRGB_BR.deleteReferences();
    tmpRGB_GB.deleteReferences();

    canvasContex_GR.putImageData(canvasData_GR, 0, 0);
    canvasContex_BR.putImageData(canvasData_BR, 0, 0);
    canvasContex_GB.putImageData(canvasData_GB, 0, 0);

    draw_RGB_Coordinates(canvasContex_GR, canvasContex_GR.canvas.clientWidth, "G", "R");
    draw_RGB_Coordinates(canvasContex_BR, canvasContex_BR.canvas.clientWidth, "B", "R");
    draw_RGB_Coordinates(canvasContex_GB, canvasContex_GB.canvas.clientWidth, "G", "B");
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
  var colorHSV = new class_Color_HSV(0, 0, vVal);
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

        colorHSV.set1Value(hVal);
        colorHSV.set2Value(sVal);
        colorRGB = colorHSV.calcRGBColor();

        if(doColorblindnessSim){
          var tmpLMS = colorRGB.calcLMSColor();
          colorRGB.deleteReferences();
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

  }
  colorHSV.deleteReferences();
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

  var colorLAB = new class_Color_LAB(lVal, 0, 0);
  for (var x = 0; x < hueResolution; x++) {

    for (var y = 0; y < hueResolution; y++) {

        var tmpY = hueResolution-y;
        var aVal = ((x - colorspaceCenterX) / (hueResolution / 2)) * labSpaceRange;
        var bVal = ((tmpY - colorspaceCenterY) / (hueResolution / 2)) * labSpaceRange;

        colorLAB.set2Value(aVal);
        colorLAB.set3Value(bVal);
        var colorRGB = undefined;

        if(colorLAB.checkRGBPossiblity() || fixedColor==undefined){
          colorRGB = colorLAB.calcRGBColor();
        }
        else {
          //colorRGB = new class_Color_RGB(0.5, 0.5, 0.5);
          continue;
        }

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
  colorLAB.deleteReferences();

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

  var colorDIN99 = new class_Color_DIN99(l99Val, 0, 0);
  for (var x = 0; x < hueResolution; x++) {

    for (var y = 0; y < hueResolution; y++) {

        var tmpY = hueResolution-y;
        var a99Val = (x  / hueResolution) * rangeA99 + rangeA99Neg;
        var b99Val = (tmpY / hueResolution) * rangeB99 + rangeB99Neg;

        colorDIN99.set2Value(a99Val);
        colorDIN99.set3Value(b99Val);
        var colorRGB = undefined;
        if (colorDIN99.checkRGBPossiblity() || fixedColor==undefined){
          colorRGB = colorDIN99.calcRGBColor();
        } else {
          //colorRGB = new class_Color_RGB(0.5, 0.5, 0.5);
          continue;
        }

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

  colorDIN99.deleteReferences();

  return background;
}

function drawLCHBackground(canvasContex,fixedColor){

  canvasContex.clearRect(0, 0, canvasContex.canvas.clientWidth, canvasContex.canvas.clientHeight);

  var colorspaceBackgroundData = getLCHBackground(fixedColor,canvasContex.canvas.clientHeight);//canvasContex.getImageData(0, 0, hueResolution, hueResolution);
  canvasContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;

}

function getLCHBackground(fixedColor,hueResolution){

  var background = new ImageData(hueResolution, hueResolution);

  var colorspaceCenterX = Math.round(hueResolution / 2);
  var colorspaceCenterY = Math.round(hueResolution / 2);
  var colorspaceRadius = Math.round((hueResolution*0.95 / 2));// * radiusratio);

  var lVal = 0.50;

  if (fixedColor!=undefined)
    lVal=fixedColor.getLValue();

  var colorLCH = new class_Color_LCH(lVal,0,0);

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

        colorLCH.set2Value(cVal);
        colorLCH.set3Value(hVal);

        var colorRGB;
        if(colorLCH.checkRGBPossiblity() || fixedColor==undefined){
          colorRGB = colorLCH.calcRGBColor();
        }
        else {
          //colorRGB = new class_Color_RGB(0.5, 0.5, 0.5);
          continue;
        }

        if(doColorblindnessSim){
          var tmpLMS = colorRGB.calcLMSColor();
          colorRGB.deleteReferences();
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

  }

  colorLCH.deleteReferences();

  return background;
}
