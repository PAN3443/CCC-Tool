

function updateLineChartData(){
  lineChart_yStart = Math.round(lineChart_Height * 0.9);
  lineChart_yEnd = Math.round(lineChart_Height * 0.1);
  lineChart_xStart = Math.round(lineChart_Width * 0.1);
  lineChart_xEnd = Math.round(lineChart_Width * 0.85);
  heigthVArea = lineChart_yStart - lineChart_yEnd;
  plotwidth = lineChart_xEnd - lineChart_xStart;
}


function drawElement(colorString,colorspaceContex,xPos,yPos, index, colorside, circle,mouseAboveKeyID,mouseGrappedColorSide, isLineChart){
  // draw circle
  colorspaceContex.setLineDash([]);
  var circleRad = Math.round(colorspaceContex.canvas.clientHeight*0.015);
  var bigcircleRad = Math.round(colorspaceContex.canvas.clientHeight*0.03);
  var smallLineWidth = Math.round(colorspaceContex.canvas.clientHeight*0.005);

  if(isLineChart){
    circleRad = Math.round(colorspaceContex.canvas.clientHeight*0.03);
    bigcircleRad = Math.round(colorspaceContex.canvas.clientHeight*0.06);
    smallLineWidth = Math.round(colorspaceContex.canvas.clientHeight*0.015);
  }

  if(circle){
    colorspaceContex.beginPath();
    if(index==mouseAboveKeyID && colorside==mouseGrappedColorSide)
      colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
    else
      colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
    colorspaceContex.fillStyle = colorString;
    colorspaceContex.fill();
    colorspaceContex.lineWidth = smallLineWidth;
    if(index==mouseAboveKeyID && colorside==mouseGrappedColorSide)
      colorspaceContex.strokeStyle =  'rgb(0,0,0)';
    else
      colorspaceContex.strokeStyle = 'rgb(30,30,30)';
    colorspaceContex.stroke();
  }
  else{
          var tmpRecSize = circleRad*2;
          colorspaceContex.fillStyle = colorString;
          var x1 = xPos-circleRad;
          var y1 = yPos-circleRad;

          if(index==mouseAboveKeyID && colorside==mouseGrappedColorSide){
              tmpRecSize = bigcircleRad*2;
              x1 = xPos-bigcircleRad;
              y1 = yPos-bigcircleRad;
           }

          colorspaceContex.fillRect(x1, y1, tmpRecSize, tmpRecSize);
          colorspaceContex.lineWidth = smallLineWidth;
          if(index==mouseAboveKeyID && colorside==mouseGrappedColorSide)
              colorspaceContex.strokeStyle =  'rgb(0,0,0)';
          else
              colorspaceContex.strokeStyle = 'rgb(30,30,30)';
          colorspaceContex.strokeRect(x1, y1, tmpRecSize, tmpRecSize);
  }
}

function drawLine(colorspaceContex,xPos,yPos,xPos2,yPos2){
  //if(dashed)
  colorspaceContex.setLineDash([15,10]);
  //else
  //colorspaceContex.setLineDash([]);
  colorspaceContex.beginPath();
  colorspaceContex.lineWidth=Math.round(colorspaceContex.canvas.clientHeight*0.01);
  colorspaceContex.moveTo(xPos, yPos);
  colorspaceContex.lineTo(xPos2, yPos2);
  colorspaceContex.strokeStyle = 'rgb(0,0,0)';
  colorspaceContex.stroke();
  colorspaceContex.lineWidth=Math.round(colorspaceContex.canvas.clientHeight*0.005);
  colorspaceContex.strokeStyle = 'rgb(255,255,255)';
  colorspaceContex.stroke();
}
