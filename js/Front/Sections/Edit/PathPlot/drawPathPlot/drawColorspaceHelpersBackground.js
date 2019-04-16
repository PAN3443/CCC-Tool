

function drawGRBackground(canvasContex,canvasWidth,canvasHeight,fixedColor){

  canvasContex.clearRect(0, 0, canvasWidth, canvasHeight);
  var canvasData =  getRGBBackground(canvasWidth, canvasHeight, fixedColor, "GR"); //canvasContex.getImageData(0, 0, canvasWidth, canvasHeight);

  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  rgbPlot(canvasContex, canvasWidth, canvasHeight, "G", "R");
}


function drawBRBackground(canvasContex,canvasWidth,canvasHeight,fixedColor){

  canvasContex.clearRect(0, 0, canvasWidth, canvasHeight);
  var canvasData = getRGBBackground(canvasWidth, canvasHeight, fixedColor,"BR");

  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  rgbPlot(canvasContex, canvasWidth, canvasHeight, "B", "R");
}

function drawGBBackground(canvasContex,canvasWidth,canvasHeight,fixedColor){


  canvasContex.clearRect(0, 0, canvasWidth, canvasHeight);
  var canvasData = getRGBBackground(canvasWidth, canvasHeight, fixedColor,"GB");

  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  rgbPlot(canvasContex, canvasWidth, canvasHeight, "G", "B");
}

function getRGBBackground(canvasWidth, canvasHeight, fixedColor, type){

  var xStart = canvasWidth * 0.1;
  var yStart = canvasHeight * 0.9;
  var xEnd = canvasWidth * 0.8;
  var yEnd = canvasHeight * 0.2;
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



  var tmpRGB= new classColor_RGB(1,1,1);

  var background = new ImageData(canvasWidth, canvasHeight);

  for (var x = 0; x < canvasWidth; x++) {

    for (var y = 0; y < canvasHeight; y++) {

      if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
        // calc hsv color
        var indices = getColorIndicesForCoord(x, y, canvasWidth);

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
          tmpRGB = tmpLMS.calcColorBlindRGBColor();
        }

        background.data[indices[0]] = Math.round(tmpRGB.get1Value() * 255); // r
        background.data[indices[1]] = Math.round(tmpRGB.get2Value() * 255); // g
        background.data[indices[2]] = Math.round(tmpRGB.get3Value() * 255); // b
        background.data[indices[3]] = 255; //a
      }

    }
  }

  return background;
}



function rgbPlot(context, canvasWidth, canvasHeight, xlabel, ylabel) {

  var yStart = Math.round(canvasHeight * 0.9);
  var yEnd = Math.round(canvasHeight * 0.2);
  var yEndLine = Math.round(canvasHeight * 0.15);
  var yEndArrow = Math.round(canvasHeight * 0.1);
  var arrowHeight = Math.round((yEndLine - yEndArrow) * 0.75);
  var labelFontSize = arrowHeight * 0.85;
  var labelFontSizeSmall = arrowHeight * 0.75;
  var xStart = Math.round(canvasWidth * 0.1);
  var xEnd = Math.round(canvasWidth * 0.8);
  var xEndLine = Math.round(canvasWidth * 0.85);
  var xEndArrow = Math.round(canvasWidth * 0.9);


  var lineColor = 'rgb(200,200,200)';
  var arrowFontColor = 'rgb(90,90,90)';

  plotXStart = xStart;
  heigthVArea = yStart - yEnd;
  plotYStart = yStart;
  plotYEnd = yEnd;

  context.fillStyle = arrowFontColor;


  var xPosPos;
  var yPos = canvasHeight * 0.93;
  context.font = labelFontSizeSmall + "px Arial";

  var steps = 5;
  for (var i = 0; i <= steps; i++) {

    xPosPos = xStart + (xEnd - xStart) * (i / steps);
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(xPosPos, yStart);
    context.lineTo(xPosPos, yPos);
    context.strokeStyle = lineColor;
    context.stroke();
    context.strokeStyle = arrowFontColor;
    var text = "" + i * (255 / steps);
    context.fillText(text, xPosPos, yPos + labelFontSizeSmall);
  }

  xPosPos = Math.round(canvasWidth * 0.07);
  yPos = yStart;
  context.font = labelFontSizeSmall + "px Arial";

  for (var i = 0; i <= steps; i++) {

    yPos = yStart - (yStart - yEnd) * (i / steps);
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(xPosPos, yPos);
    context.lineTo(xStart, yPos);
    context.strokeStyle = lineColor;
    context.stroke();
    context.strokeStyle = arrowFontColor;
    var text = "" + i * (255 / steps);
    context.fillText(text, xPosPos * 0.5, yPos);
  }


  ////////////////////////////////////////////////////////////
  /////////////ARROWS////////////////////
  ////////////////////////////////////////////////////////////
  context.strokeStyle = arrowFontColor;
  context.beginPath();
  context.lineWidth = lineWidthVPlot;
  context.moveTo(xStart, yStart);
  context.lineTo(xEndLine, yStart);
  context.stroke();

  // the triangle
  context.beginPath();
  context.moveTo(xEndLine, yStart - arrowHeight/2);
  context.lineTo(xEndArrow, yStart);
  context.lineTo(xEndLine, yStart + arrowHeight/2);
  context.closePath();

  // the fill color
  context.fillStyle = arrowFontColor;
  context.fill();

  context.beginPath();
  context.lineWidth = lineWidthVPlot;
  context.moveTo(xStart, yStart);
  context.lineTo(xStart, yEndLine);
  context.stroke();

  // the triangle
  context.beginPath();
  context.moveTo(xStart - arrowHeight/2, yEndLine);
  context.lineTo(xStart, yEndArrow);
  context.lineTo(xStart + arrowHeight/2, yEndLine);
  context.closePath();

  // the fill color
  context.fill();

  ////////////////// TEXT /////////////////////
  context.font = labelFontSize + "px Arial";

  context.fillText(xlabel, xEndArrow, yStart + labelFontSize);
  context.fillText(ylabel, xStart - labelFontSize, yEndArrow);


}





///////////////////////////////////////////////////////////////////////////////


function drawVPlot(vPlotContex, canvasWidth, canvasHeight, startValue, endValue){

  vPlotContex.clearRect(0, 0, canvasWidth, canvasHeight);

  /*vPlotContex.mozImageSmoothingEnabled = false;
  vPlotContex.webkitImageSmoothingEnabled = false;
  vPlotContex.msImageSmoothingEnabled = false;
  vPlotContex.imageSmoothingEnabled = false; // did not work !?!?!
  vPlotContex.oImageSmoothingEnabled = false;*/


  var yStart = Math.round(canvasHeight * 0.9);
  var yEnd = Math.round(canvasHeight * 0.1);
  var yEndLine = Math.round(canvasHeight * 0.05);
  var yEndArrow = 0;
  var arrowHeight = Math.round(yEndLine - yEndArrow);
  var labelFontSize = arrowHeight * 1.5;
  var labelFontSizeSmall = arrowHeight * 1;
  var xStart = Math.round(canvasWidth * 0.1);
  var xEnd = Math.round(canvasWidth * 0.85);
  var xEndArrow = Math.round(canvasWidth * 0.9);
  var xEndLine = xEndArrow - arrowHeight;

  var lineColor = 'rgb(200,200,200)';
  var arrowFontColor = 'rgb(0,0,00)';//'rgb(90,90,90)';

  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillStyle = arrowFontColor;

  var widthVArea = 0;
  var widthVArea2 = 0;

  var tmpCounter = 0;
  var leftCounter = 0;

  var xPosPos;
  var plotwidth = xEnd - xStart;

  widthVArea = globalCMS1.getRefRange();

  for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

    xPosPos = xStart + ((globalCMS1.getRefPosition(i) - globalCMS1.getRefPosition(0)) / widthVArea) * plotwidth;

    vPlotContex.beginPath();
    vPlotContex.lineWidth = Math.round(lineWidthVPlot / 2);
    vPlotContex.moveTo(xPosPos, yStart);
    vPlotContex.lineTo(xPosPos, canvasHeight * 0.93);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
    var text = "" + (i + 1);
    vPlotContex.font = labelFontSizeSmall + "px Arial";
    vPlotContex.fillText(text, xPosPos, canvasHeight * 0.93 + labelFontSizeSmall);

  }

  xPosPos = Math.round(canvasWidth * 0.075);
  var yPos = yStart;
  vPlotContex.font = labelFontSizeSmall + "px Arial";

  var steps = 10;

  for (var i = 0; i <= steps; i++) {
    yPos = yStart - (yStart - yEnd) * i/steps;
    var tmpVal = (startValue+(endValue-startValue)*i/steps);
    var text = ""+tmpVal.toFixed(2);
    vPlotContex.beginPath();
    vPlotContex.lineWidth = 1;
    vPlotContex.moveTo(xStart, yPos);
    vPlotContex.lineTo(xEnd, yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
    vPlotContex.fillText(text, xPosPos * 0.75, yPos);
  }

  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.beginPath();
  vPlotContex.lineWidth = lineWidthVPlot;
  vPlotContex.moveTo(xStart, yStart);
  vPlotContex.lineTo(xEndLine, yStart);
  vPlotContex.stroke();

  // the triangle
  vPlotContex.beginPath();
  vPlotContex.moveTo(xEndLine, yStart - (arrowHeight/2));
  vPlotContex.lineTo(xEndArrow, yStart);
  vPlotContex.lineTo(xEndLine, yStart + (arrowHeight/2));
  vPlotContex.closePath();

  // the fill color
  vPlotContex.fillStyle = arrowFontColor;
  vPlotContex.fill();

  vPlotContex.beginPath();
  vPlotContex.lineWidth = lineWidthVPlot;
  vPlotContex.moveTo(xStart, yStart);
  vPlotContex.lineTo(xStart, yEndLine);
  vPlotContex.stroke();

  // the triangle
  vPlotContex.beginPath();
  vPlotContex.moveTo(xStart - (arrowHeight/2), yEndLine);
  vPlotContex.lineTo(xStart, yEndArrow);
  vPlotContex.lineTo(xStart + (arrowHeight/2), yEndLine);
  vPlotContex.closePath();

  // the fill color
  vPlotContex.fill();

  vPlotContex.font = labelFontSize + "px Arial";
  vPlotContex.fillText("Position", xEndArrow, yStart + labelFontSize);

}

function drawHSVBackground(canvasContex,canvasWidth,canvasHeight,fixedColor){

  canvasContex.clearRect(0, 0, canvasWidth, canvasHeight);
  /*canvasContex.mozImageSmoothingEnabled = false;
  canvasContex.webkitImageSmoothingEnabled = false;
  canvasContex.msImageSmoothingEnabled = false;
  canvasContex.imageSmoothingEnabled = false; // did not work !?!?!
  canvasContex.oImageSmoothingEnabled = false;*/

  var colorspaceBackgroundData = canvasContex.getImageData(0, 0, canvasWidth, canvasHeight);

  var colorspaceCenterX = Math.round(canvasWidth / 2);
  var colorspaceCenterY = Math.round(canvasHeight / 2);
  var colorspaceRadius = Math.round((canvasWidth / 2));// * radiusratio);

  var vVal = 1.0;

  if (fixedColor!=undefined)
    vVal=fixedColor.getVValue();

  var colorRGB;
  for (var x = 0; x < canvasWidth; x++) {

    for (var y = 0; y < canvasHeight; y++) {

      var dis = Math.sqrt(Math.pow(colorspaceCenterX - x, 2) + Math.pow(colorspaceCenterY - y, 2));

      if (dis <= colorspaceRadius) {
        // calc hsv color

        var ty = (y) - (colorspaceCenterY);
        var tx = x - colorspaceCenterX;
        var angle = (Math.atan2(ty, tx) + Math.PI) / (Math.PI * 2); // values 0-1 ...
        var hVal = angle;
        var sVal = dis / colorspaceRadius;


        var colorHSV = new classColor_HSV(hVal, sVal, vVal);
        colorRGB = colorHSV.calcRGBColor();

        if(doColorblindnessSim){
          var tmpLMS = colorRGB.calcLMSColor();
          colorRGB = tmpLMS.calcColorBlindRGBColor();
        }

        var index = (x + y * canvasWidth) * 4;

        colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
        colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
        colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
        colorspaceBackgroundData.data[index + 3] = 255; //a


      }

    }

  }

  canvasContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;

}

function drawLabBackground(canvasContex,canvasWidth,canvasHeight,fixedColor){

  canvasContex.clearRect(0, 0, canvasWidth, canvasHeight);
  /*canvasContex.mozImageSmoothingEnabled = false;
  canvasContex.webkitImageSmoothingEnabled = false;
  canvasContex.msImageSmoothingEnabled = false;
  canvasContex.imageSmoothingEnabled = false; // did not work !?!?!
  canvasContex.oImageSmoothingEnabled = false;*/

  var colorspaceBackgroundData = canvasContex.getImageData(0, 0, canvasWidth, canvasHeight);

  var colorspaceCenterX = Math.round(canvasWidth / 2);
  var colorspaceCenterY = Math.round(canvasHeight / 2);
  var colorspaceRadius = Math.round((canvasWidth / 2));// * radiusratio);

  var errorRGBColor = new classColor_RGB(0.5, 0.5, 0.5);

  var lVal = 50;

  if (fixedColor!=undefined)
    lVal=fixedColor.getLValue();

  for (var x = 0; x < canvasWidth; x++) {

    for (var y = 0; y < canvasHeight; y++) {

        // calc hsv color
        var colorRGB;

        var aVal = ((x - colorspaceCenterX) / (canvasWidth / 2)) * labSpaceRange;
        var bVal = ((y - colorspaceCenterY) / (canvasHeight / 2)) * labSpaceRange;

        var colorLAB = new classColor_LAB(lVal, aVal, bVal);
        colorRGB = colorLAB.calcRGBColor();

        var colorLAB = new classColor_LAB(lVal, aVal, bVal);

        if (fixedColor!=undefined){
          colorRGB = colorLAB.calcRGBColorCorrect(errorRGBColor);
        } else{
          colorRGB = colorLAB.calcRGBColor();
        }


        if(doColorblindnessSim){
          var tmpLMS = colorRGB.calcLMSColor();
          colorRGB = tmpLMS.calcColorBlindRGBColor();
        }

        var index = (x + y * canvasWidth) * 4;

        colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
        colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
        colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
        colorspaceBackgroundData.data[index + 3] = 255; //a

    }

  }

  canvasContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;

}

function drawDIN99Background(canvasContex,canvasWidth,canvasHeight,fixedColor){

  canvasContex.clearRect(0, 0, canvasWidth, canvasHeight);
  /*canvasContex.mozImageSmoothingEnabled = false;
  canvasContex.webkitImageSmoothingEnabled = false;
  canvasContex.msImageSmoothingEnabled = false;
  canvasContex.imageSmoothingEnabled = false; // did not work !?!?!
  canvasContex.oImageSmoothingEnabled = false;*/

  rangeA99 = rangeA99Pos - rangeA99Neg;
  rangeB99 = rangeB99Pos - rangeB99Neg;

  var colorspaceBackgroundData = canvasContex.getImageData(0, 0, canvasWidth, canvasHeight);

  var colorspaceCenterX = Math.round(canvasWidth / 2);
  var colorspaceCenterY = Math.round(canvasHeight / 2);
  var colorspaceRadius = Math.round((canvasWidth / 2));// * radiusratio);

  var errorRGBColor = new classColor_RGB(0.5, 0.5, 0.5);

  var l99Val = 50;

  if (fixedColor!=undefined)
    l99Val=fixedColor.getL99Value();

  var colorRGB;


  for (var x = 0; x < canvasWidth; x++) {

    for (var y = 0; y < canvasHeight; y++) {

        var a99Val = (x  / canvasWidth) * rangeA99 + rangeA99Neg;
        var b99Val = (y / canvasHeight) * rangeB99 + rangeB99Neg;

        var colorDIN99 = new classColorDIN99(l99Val, a99Val, b99Val);

        if (fixedColor!=undefined){
          colorRGB = colorDIN99.calcRGBColorCorrect(errorRGBColor);
        } else {
          colorRGB = colorDIN99.calcRGBColor();
        }

        if (colorRGB.getRValue() == 0 && colorRGB.getGValue() == 0 && colorRGB.getBValue() == 0) {
            if (colorDIN99.getL99Value() != 0 || colorDIN99.getA99Value() != 0 || colorDIN99.getB99Value() != 0) {
              colorRGB = new classColor_RGB(1, 1, 1);
            }
        }

        if(doColorblindnessSim){
          var tmpLMS = colorRGB.calcLMSColor();
          colorRGB = tmpLMS.calcColorBlindRGBColor();
        }

        var index = (x + y * canvasWidth) * 4;
        colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
        colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
        colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
        colorspaceBackgroundData.data[index + 3] = 255; //a

    }
  }

  canvasContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;

}
