function draw_RGB_Coordinates(context, hueResolution, xlabel, ylabel) {

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

function draw_LineChart_Coordinates(lineChart_Contex, startValue, endValue,labelText){

  var lineChart_Width = lineChart_Contex.canvas.clientWidth;
  var lineChart_Height = lineChart_Contex.canvas.clientHeight;
  lineChart_Contex.clearRect(0, 0, lineChart_Width, lineChart_Height);

  var yStart = Math.round(lineChart_Height*0.9);
  var yEnd = Math.round(lineChart_Height*0.1);
  var arrowHeightY = Math.round(yEnd*0.5);
  var fontSize = Math.round(lineChart_Height*0.05);
  var fontSize_Label = Math.round(lineChart_Height*0.075);
  var xStart = Math.round(lineChart_Width*0.1);
  var xEnd = Math.round(lineChart_Width*0.98);
  var arrowHeightX = Math.round((lineChart_Width-xEnd)/2);
  var labelPos = Math.round(lineChart_Width * 0.015);
  var textPos = Math.round(lineChart_Width * 0.08);


  var lineColor = pathplotFontColor;//'rgb(200,200,200)';
  var arrowFontColor = pathplotFontColor;

  lineChart_Contex.strokeStyle = arrowFontColor;
  lineChart_Contex.fillStyle = arrowFontColor;

  var widthVArea = ref_GlobalCMS.getRefRange();

  var tmpCounter = 0;
  var leftCounter = 0;

  var xPosPos;
  var plotwidth = xEnd - xStart;

  for (var i = 0; i < ref_GlobalCMS.getKeyLength(); i++) {

    xPosPos = xStart + ((ref_GlobalCMS.getRefPosition(i) - ref_GlobalCMS.getRefPosition(0)) / widthVArea) * plotwidth;

    lineChart_Contex.beginPath();
    lineChart_Contex.lineWidth = Math.round(Math.round(lineChart_Height * 0.01) / 2);
    lineChart_Contex.moveTo(xPosPos, yStart);
    lineChart_Contex.lineTo(xPosPos, lineChart_Height * 0.93);
    lineChart_Contex.strokeStyle = lineColor;
    lineChart_Contex.stroke();
    lineChart_Contex.strokeStyle = arrowFontColor;
    var text = "" + (i + 1);
    lineChart_Contex.font = fontSize + "px Arial";
    lineChart_Contex.fillText(text, xPosPos, lineChart_Height * 0.93 + fontSize);
  }

  var yPos = yStart;
  lineChart_Contex.font = fontSize + "px Arial";

  var steps = 10;

  for (var i = 0; i <= steps; i++) {
    yPos = yStart - (yStart - yEnd) * i/steps;
    var text = ""+parseInt((startValue+(endValue-startValue)*i/steps));//.toFixed(2);
    lineChart_Contex.beginPath();
    lineChart_Contex.lineWidth = 1;
    lineChart_Contex.moveTo(xStart, yPos);
    lineChart_Contex.lineTo(xEnd, yPos);
    lineChart_Contex.strokeStyle = lineColor;
    lineChart_Contex.stroke();
    lineChart_Contex.strokeStyle = arrowFontColor;
    lineChart_Contex.fillText(text, textPos * 0.75, yPos);
  }

  lineChart_Contex.strokeStyle = arrowFontColor;
  lineChart_Contex.beginPath();
  lineChart_Contex.lineWidth = Math.round(lineChart_Height * 0.01);
  lineChart_Contex.moveTo(xStart, yStart);
  lineChart_Contex.lineTo(lineChart_Width, yStart);
  lineChart_Contex.stroke();

  // the triangle
  lineChart_Contex.beginPath();
  lineChart_Contex.moveTo(lineChart_Width-arrowHeightX, yStart - (arrowHeightX/2));
  lineChart_Contex.lineTo(lineChart_Width, yStart);
  lineChart_Contex.lineTo(lineChart_Width-arrowHeightX, yStart + (arrowHeightX/2));
  lineChart_Contex.closePath();

  // the fill color
  lineChart_Contex.fillStyle = arrowFontColor;
  lineChart_Contex.fill();

  lineChart_Contex.beginPath();
  lineChart_Contex.lineWidth = Math.round(lineChart_Height * 0.01);
  lineChart_Contex.moveTo(xStart, yStart);
  lineChart_Contex.lineTo(xStart, 0);
  lineChart_Contex.stroke();

  // the triangle
  lineChart_Contex.beginPath();
  lineChart_Contex.moveTo(xStart - (arrowHeightY/2), yEnd-arrowHeightY);
  lineChart_Contex.lineTo(xStart, 0);
  lineChart_Contex.lineTo(xStart + (arrowHeightY/2), yEnd-arrowHeightY);
  lineChart_Contex.closePath();

  // the fill color
  lineChart_Contex.fill();

  lineChart_Contex.font = fontSize_Label + "px Arial";
  lineChart_Contex.fillText(labelText, labelPos, fontSize_Label);
}
