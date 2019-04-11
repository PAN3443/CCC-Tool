

function drawGRBackground(canvasContex,canvasWidth,canvasHeight,fixedColor){

  canvasContex.clearRect(0, 0, canvasWidth, canvasHeight);
  var canvasData = canvasContex.getImageData(0, 0, canvasWidth, canvasHeight);

  var xStart = canvasWidth * 0.1;
  var yStart = canvasHeight * 0.9;
  var xEnd = canvasWidth * 0.8;
  var yEnd = canvasHeight * 0.2;
  var xWidth = xEnd - xStart;
  var yHeight = yStart - yEnd;

  var b = 0;

  if (fixedColor != undefined) {
    b=fixedColor.get3Value();
  }

  var tmpRGB= new classColor_RGB(1,1,1);

  for (var x = 0; x < canvasWidth; x++) {

    for (var y = 0; y < canvasHeight; y++) {


      if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
        // calc hsv color

        var xVal = (x - xStart) / xWidth;
        var yVal = (yStart - y) / yHeight;

        var index = (x + y * canvasWidth) * 4;

        tmpRGB.set1Value(yVal);
        tmpRGB.set2Value(xVal);
        tmpRGB.set3Value(b);


        if(doColorblindnessSim){
          var tmpLMS = tmpRGB.calcLMSColor();
          tmpRGB = tmpLMS.calcColorBlindRGBColor();
        }

          canvasData.data[index + 0] = Math.round(tmpRGB.get1Value() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpRGB.get2Value() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpRGB.get3Value() * 255); // b
          canvasData.data[index + 3] = 255; //a

      }
    }

  }


  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  rgbPlot(canvasContex, canvasWidth, canvasHeight, "G", "R");

}

function drawBRBackground(canvasContex,canvasWidth,canvasHeight,fixedColor){

  canvasContex.clearRect(0, 0, canvasWidth, canvasHeight);
  var canvasData = canvasContex.getImageData(0, 0, canvasWidth, canvasHeight);

  var xStart = canvasWidth * 0.1;
  var yStart = canvasHeight * 0.9;
  var xEnd = canvasWidth * 0.8;
  var yEnd = canvasHeight * 0.2;
  var xWidth = xEnd - xStart;
  var yHeight = yStart - yEnd;

  var g = 0;

  if (fixedColor != undefined) {
    g=fixedColor.get2Value();
  }

  var tmpRGB= new classColor_RGB(1,1,1);

  for (var x = 0; x < canvasWidth; x++) {

    for (var y = 0; y < canvasHeight; y++) {


      if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
        // calc hsv color

        var xVal = (x - xStart) / xWidth;
        var yVal = (yStart - y) / yHeight;

        var index = (x + y * canvasWidth) * 4;


        tmpRGB.set1Value(yVal);
        tmpRGB.set2Value(g);
        tmpRGB.set3Value(xVal);



        if(doColorblindnessSim){

          var tmpLMS = tmpRGB.calcLMSColor();
          tmpRGB = tmpLMS.calcColorBlindRGBColor();

        }

          canvasData.data[index + 0] = Math.round(tmpRGB.get1Value() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpRGB.get2Value() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpRGB.get3Value() * 255); // b
          canvasData.data[index + 3] = 255; //a

      }
    }

  }


  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  rgbPlot(canvasContex, canvasWidth, canvasHeight, "B", "R");
}

function drawGBBackground(canvasContex,canvasWidth,canvasHeight,fixedColor){


  canvasContex.clearRect(0, 0, canvasWidth, canvasHeight);
  var canvasData = canvasContex.getImageData(0, 0, canvasWidth, canvasHeight);

  var xStart = canvasWidth * 0.1;
  var yStart = canvasHeight * 0.9;
  var xEnd = canvasWidth * 0.8;
  var yEnd = canvasHeight * 0.2;
  var xWidth = xEnd - xStart;
  var yHeight = yStart - yEnd;

  var r = 0;

  if (fixedColor != undefined) {
    r=fixedColor.get1Value();
  }

  var tmpRGB= new classColor_RGB(1,1,1);

  for (var x = 0; x < canvasWidth; x++) {

    for (var y = 0; y < canvasHeight; y++) {


      if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
        // calc hsv color

        var xVal = (x - xStart) / xWidth;
        var yVal = (yStart - y) / yHeight;

        var index = (x + y * canvasWidth) * 4;

        tmpRGB.set1Value(r);
        tmpRGB.set2Value(xVal);
        tmpRGB.set3Value(yVal);

        if(doColorblindnessSim){

          var tmpLMS = tmpRGB.calcLMSColor();
          tmpRGB = tmpLMS.calcColorBlindRGBColor();
        }

          canvasData.data[index + 0] = Math.round(tmpRGB.get1Value() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpRGB.get2Value() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpRGB.get3Value() * 255); // b
          canvasData.data[index + 3] = 255; //a

      }
    }

  }

  canvasContex.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;
  rgbPlot(canvasContex, canvasWidth, canvasHeight, "G", "B");
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
