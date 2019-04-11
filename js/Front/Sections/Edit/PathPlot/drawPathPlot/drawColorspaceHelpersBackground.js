

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


function drawVPlot(vPlotContex, canvasWidth, canvasHeight, label, startValue, endValue){
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

  var startValue=0;
  var endValue=1.0;





}


function init_VPlot() {

  switch (pathColorspace) {
    case "hsv":
      break;
    case "lab":
      startValue2=labSpaceRange*-1;
      endValue2=labSpaceRange;
      startValue3=labSpaceRange*-1;
      endValue3=labSpaceRange;
      break;
    case "din99":
      startValue2=rangeA99Neg;
      endValue2=rangeA99Pos;
      startValue3=rangeB99Neg;
      endValue3=rangeB99Pos;


      yPos = yStart - (yStart - yEnd) * (rangeA99Neg*-1)/(rangeA99Pos-rangeA99Neg);
      vPlotContex2.beginPath();
      vPlotContex2.lineWidth = 2;
      vPlotContex2.moveTo(xPosPos, yPos);
      vPlotContex2.lineTo(xEnd, yPos);
      vPlotContex2.strokeStyle = lineColor;
      vPlotContex2.stroke();
      vPlotContex2.strokeStyle = arrowFontColor;
      //vPlotContex2.fillText("0", xPosPos * 0.75, yPos);

      yyPos = yStart - (yStart - yEnd) * (rangeA99Neg*-1)/(rangeB99Pos-rangeB99Neg);
      vPlotContex3.beginPath();
      vPlotContex3.lineWidth = 2;
      vPlotContex3.moveTo(xPosPos, yPos);
      vPlotContex3.lineTo(xEnd, yPos);
      vPlotContex3.strokeStyle = lineColor;
      vPlotContex3.stroke();
      vPlotContex3.strokeStyle = arrowFontColor;
      //vPlotContex3.fillText("0", xPosPos * 0.75, yPos);

      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }


  for (var i = 0; i <= steps; i++) {
    yPos = yStart - (yStart - yEnd) * i/steps;
    var tmpVal = (startValue1+(endValue1-startValue1)*i/steps);
    var text = ""+tmpVal.toFixed(2);
    vPlotContex1.beginPath();
    vPlotContex1.lineWidth = 1;
    vPlotContex1.moveTo(xStart, yPos);
    vPlotContex1.lineTo(xEnd, yPos);
    vPlotContex1.strokeStyle = lineColor;
    vPlotContex1.stroke();
    vPlotContex1.strokeStyle = arrowFontColor;
    vPlotContex1.fillText(text, xPosPos * 0.75, yPos);

    yPos = yStart - (yStart - yEnd) * i/steps;
    var tmpVal =(startValue2+(endValue2-startValue2)*i/steps);
    var text = ""+tmpVal.toFixed(2);
    vPlotContex2.beginPath();
    vPlotContex2.lineWidth = 1;
    vPlotContex2.moveTo(xStart, yPos);
    vPlotContex2.lineTo(xEnd, yPos);
    vPlotContex2.strokeStyle = lineColor;
    vPlotContex2.stroke();
    vPlotContex2.strokeStyle = arrowFontColor;
    vPlotContex2.fillText(text, xPosPos * 0.75, yPos);

    yPos = yStart - (yStart - yEnd) * i/steps;
    var tmpVal =(startValue3+(endValue3-startValue3)*i/steps);
    var text = ""+tmpVal.toFixed(2);
    vPlotContex3.beginPath();
    vPlotContex3.lineWidth = 1;
    vPlotContex3.moveTo(xStart, yPos);
    vPlotContex3.lineTo(xEnd, yPos);
    vPlotContex3.strokeStyle = lineColor;
    vPlotContex3.stroke();
    vPlotContex3.strokeStyle = arrowFontColor;
    vPlotContex3.fillText(text, xPosPos * 0.75, yPos);
  }


  ////////////////////////////////////////////////////////////
  /////////////ARROWS////////////////////
  ////////////////////////////////////////////////////////////

  // the fill color
  vPlotContex2.fill();

  vPlotContex1.strokeStyle = arrowFontColor;
  vPlotContex1.beginPath();
  vPlotContex1.lineWidth = lineWidthVPlot;
  vPlotContex1.moveTo(xStart, yStart);
  vPlotContex1.lineTo(xEndLine, yStart);
  vPlotContex1.stroke();

  // the triangle
  vPlotContex1.beginPath();
  vPlotContex1.moveTo(xEndLine, yStart - (arrowHeight/2));
  vPlotContex1.lineTo(xEndArrow, yStart);
  vPlotContex1.lineTo(xEndLine, yStart + (arrowHeight/2));
  vPlotContex1.closePath();

  // the fill color
  vPlotContex1.fillStyle = arrowFontColor;
  vPlotContex1.fill();

  vPlotContex1.beginPath();
  vPlotContex1.lineWidth = lineWidthVPlot;
  vPlotContex1.moveTo(xStart, yStart);
  vPlotContex1.lineTo(xStart, yEndLine);
  vPlotContex1.stroke();

  // the triangle
  vPlotContex1.beginPath();
  vPlotContex1.moveTo(xStart - (arrowHeight/2), yEndLine);
  vPlotContex1.lineTo(xStart, yEndArrow);
  vPlotContex1.lineTo(xStart + (arrowHeight/2), yEndLine);
  vPlotContex1.closePath();

  // the fill color
  vPlotContex1.fill();

  vPlotContex2.strokeStyle = arrowFontColor;
  vPlotContex2.beginPath();
  vPlotContex2.lineWidth = lineWidthVPlot;
  vPlotContex2.moveTo(xStart, yStart);
  vPlotContex2.lineTo(xEndLine, yStart);
  vPlotContex2.stroke();

  // the triangle
  vPlotContex2.beginPath();
  vPlotContex2.moveTo(xEndLine, yStart - (arrowHeight/2));
  vPlotContex2.lineTo(xEndArrow, yStart);
  vPlotContex2.lineTo(xEndLine, yStart + (arrowHeight/2));
  vPlotContex2.closePath();

  // the fill color
  vPlotContex2.fillStyle = arrowFontColor;
  vPlotContex2.fill();

  vPlotContex2.beginPath();
  vPlotContex2.lineWidth = lineWidthVPlot;
  vPlotContex2.moveTo(xStart, yStart);
  vPlotContex2.lineTo(xStart, yEndLine);
  vPlotContex2.stroke();

  // the triangle
  vPlotContex2.beginPath();
  vPlotContex2.moveTo(xStart - (arrowHeight/2), yEndLine);
  vPlotContex2.lineTo(xStart, yEndArrow);
  vPlotContex2.lineTo(xStart + (arrowHeight/2), yEndLine);
  vPlotContex2.closePath();

  // the fill color
  vPlotContex2.fill();

  vPlotContex3.strokeStyle = arrowFontColor;
  vPlotContex3.beginPath();
  vPlotContex3.lineWidth = lineWidthVPlot;
  vPlotContex3.moveTo(xStart, yStart);
  vPlotContex3.lineTo(xEndLine, yStart);
  vPlotContex3.stroke();

  // the triangle
  vPlotContex3.beginPath();
  vPlotContex3.moveTo(xEndLine, yStart - (arrowHeight/2));
  vPlotContex3.lineTo(xEndArrow, yStart);
  vPlotContex3.lineTo(xEndLine, yStart + (arrowHeight/2));
  vPlotContex3.closePath();

  // the fill color
  vPlotContex3.fillStyle = arrowFontColor;
  vPlotContex3.fill();

  vPlotContex3.beginPath();
  vPlotContex3.lineWidth = lineWidthVPlot;
  vPlotContex3.moveTo(xStart, yStart);
  vPlotContex3.lineTo(xStart, yEndLine);
  vPlotContex3.stroke();

  // the triangle
  vPlotContex3.beginPath();
  vPlotContex3.moveTo(xStart - (arrowHeight/2), yEndLine);
  vPlotContex3.lineTo(xStart, yEndArrow);
  vPlotContex3.lineTo(xStart + (arrowHeight/2), yEndLine);
  vPlotContex3.closePath();

  // the fill color
  vPlotContex3.fill();

  ////////////////// TEXT /////////////////////
  vPlotContex1.font = labelFontSize + "px Arial";
  vPlotContex1.fillText("Position", xEndArrow, yStart + labelFontSize);

  vPlotContex2.font = labelFontSize + "px Arial";
  vPlotContex2.fillText("Position", xEndArrow, yStart + labelFontSize);

  vPlotContex3.font = labelFontSize + "px Arial";
  vPlotContex3.fillText("Position", xEndArrow, yStart + labelFontSize);

}
