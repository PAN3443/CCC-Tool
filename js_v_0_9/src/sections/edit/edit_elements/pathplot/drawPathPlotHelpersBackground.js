function drawGRBackground(canvasContex,fixedColor){
  canvasContex.clearRect(0, 0, canvasContex.canvas.clientWidth, canvasContex.canvas.clientHeight);
  var canvasData =  getRGBBackground( fixedColor,canvasContex.canvas.clientWidth, "GR"); //canvasContex.getImageData(0, 0, hueResolution, hueResolution);

  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  rgbPlot(canvasContex, canvasContex.canvas.clientWidth, "G", "R");
}

function drawBRBackground(canvasContex,fixedColor){

  canvasContex.clearRect(0, 0, canvasContex.canvas.clientWidth, canvasContex.canvas.clientHeight);
  var canvasData = getRGBBackground( fixedColor,canvasContex.canvas.clientWidth,"BR");

  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  rgbPlot(canvasContex, canvasContex.canvas.clientWidth, "B", "R");
}

function drawGBBackground(canvasContex,fixedColor){
  canvasContex.clearRect(0, 0, canvasContex.canvas.clientWidth, canvasContex.canvas.clientHeight);
  var canvasData = getRGBBackground( fixedColor,canvasContex.canvas.clientWidth,"GB");

  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  rgbPlot(canvasContex, canvasContex.canvas.clientWidth, "G", "B");
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

function rgbPlot(context, hueResolution, xlabel, ylabel) {

  var yStart = Math.round(hueResolution * 0.9);
  var yEnd = Math.round(hueResolution * 0.2);
  var yEndLine = Math.round(hueResolution * 0.15);
  var yEndArrow = Math.round(hueResolution * 0.1);
  var arrowHeight = Math.round((yEndLine - yEndArrow) * 0.75);
  var fontSize = arrowHeight * 0.75;
  var xStart = Math.round(hueResolution * 0.1);
  var xEnd = Math.round(hueResolution * 0.8);
  var xEndLine = Math.round(hueResolution * 0.85);
  var xEndArrow = Math.round(hueResolution * 0.9);


  var lineColor = pathplotFontColor;
  var arrowFontColor = pathplotFontColor;

  plotXStart = xStart;
  heigthVArea = yStart - yEnd;
  plotYStart = yStart;
  plotYEnd = yEnd;

  context.fillStyle = arrowFontColor;


  var xPosPos;
  var yPos = hueResolution * 0.93;
  context.font = fontSize + "px Arial";

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
    context.fillText(text, xPosPos, yPos + fontSize);
  }

  xPosPos = Math.round(hueResolution * 0.07);
  yPos = yStart;
  context.font = fontSize + "px Arial";

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
  context.lineWidth = Math.round(hueResolution * 0.01);
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
  context.lineWidth = Math.round(hueResolution * 0.01);
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
  context.font = fontSize + "px Arial";

  context.fillText(xlabel, xEndArrow, yStart + fontSize);
  context.fillText(ylabel, xStart - fontSize, yEndArrow);


}

///////////////////////////////////////////////////////////////////////////////

function drawVPlot(cmsClone, vPlotContex, startValue, endValue,labelText){

  var vPlotWidth = vPlotContex.canvas.clientWidth;
  var vPlotHeight = vPlotContex.canvas.clientHeight;
  vPlotContex.clearRect(0, 0, vPlotWidth, vPlotHeight);

  var yStart = Math.round(vPlotHeight*0.9);
  var yEnd = Math.round(vPlotHeight*0.1);
  var arrowHeightY = Math.round(yEnd*0.5);
  var fontSize = Math.round(vPlotHeight*0.05);
  var fontSize_Label = Math.round(vPlotHeight*0.075);
  var xStart = Math.round(vPlotWidth*0.1);
  var xEnd = Math.round(vPlotWidth*0.98);
  var arrowHeightX = Math.round((vPlotWidth-xEnd)/2);
  var labelPos = Math.round(vPlotWidth * 0.015);
  var textPos = Math.round(vPlotWidth * 0.08);


  var lineColor = pathplotFontColor;//'rgb(200,200,200)';
  var arrowFontColor = pathplotFontColor;

  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.fillStyle = arrowFontColor;

  var widthVArea = cmsClone.getRefRange();

  var tmpCounter = 0;
  var leftCounter = 0;

  var xPosPos;
  var plotwidth = xEnd - xStart;

  for (var i = 0; i < cmsClone.getKeyLength(); i++) {

    xPosPos = xStart + ((cmsClone.getRefPosition(i) - cmsClone.getRefPosition(0)) / widthVArea) * plotwidth;

    vPlotContex.beginPath();
    vPlotContex.lineWidth = Math.round(Math.round(vPlotHeight * 0.01) / 2);
    vPlotContex.moveTo(xPosPos, yStart);
    vPlotContex.lineTo(xPosPos, vPlotHeight * 0.93);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
    var text = "" + (i + 1);
    vPlotContex.font = fontSize + "px Arial";
    vPlotContex.fillText(text, xPosPos, vPlotHeight * 0.93 + fontSize);
  }

  var yPos = yStart;
  vPlotContex.font = fontSize + "px Arial";

  var steps = 10;

  for (var i = 0; i <= steps; i++) {
    yPos = yStart - (yStart - yEnd) * i/steps;
    var text = ""+parseInt((startValue+(endValue-startValue)*i/steps));//.toFixed(2);
    vPlotContex.beginPath();
    vPlotContex.lineWidth = 1;
    vPlotContex.moveTo(xStart, yPos);
    vPlotContex.lineTo(xEnd, yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
    vPlotContex.fillText(text, textPos * 0.75, yPos);
  }

  vPlotContex.strokeStyle = arrowFontColor;
  vPlotContex.beginPath();
  vPlotContex.lineWidth = Math.round(vPlotHeight * 0.01);
  vPlotContex.moveTo(xStart, yStart);
  vPlotContex.lineTo(vPlotWidth, yStart);
  vPlotContex.stroke();

  // the triangle
  vPlotContex.beginPath();
  vPlotContex.moveTo(vPlotWidth-arrowHeightX, yStart - (arrowHeightX/2));
  vPlotContex.lineTo(vPlotWidth, yStart);
  vPlotContex.lineTo(vPlotWidth-arrowHeightX, yStart + (arrowHeightX/2));
  vPlotContex.closePath();

  // the fill color
  vPlotContex.fillStyle = arrowFontColor;
  vPlotContex.fill();

  vPlotContex.beginPath();
  vPlotContex.lineWidth = Math.round(vPlotHeight * 0.01);
  vPlotContex.moveTo(xStart, yStart);
  vPlotContex.lineTo(xStart, 0);
  vPlotContex.stroke();

  // the triangle
  vPlotContex.beginPath();
  vPlotContex.moveTo(xStart - (arrowHeightY/2), yEnd-arrowHeightY);
  vPlotContex.lineTo(xStart, 0);
  vPlotContex.lineTo(xStart + (arrowHeightY/2), yEnd-arrowHeightY);
  vPlotContex.closePath();

  // the fill color
  vPlotContex.fill();
  cmsClone.deleteReferences();

  vPlotContex.font = fontSize_Label + "px Arial";
  vPlotContex.fillText(labelText, labelPos, fontSize_Label);
}

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
          colorLAB.deleteReferences();
          continue;
        }
        colorLAB.deleteReferences();

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
