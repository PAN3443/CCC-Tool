

function updateVPlotData(){
  vPlotyStart = Math.round(pathPlotResolution * 0.9);
  vPlotyEnd = Math.round(pathPlotResolution * 0.1);
  vPlotxStart = Math.round(vPlotWidth * 0.1);
  vPlotxEnd = Math.round(vPlotWidth * 0.85);
  heigthVArea = vPlotyStart - vPlotyEnd;
  plotwidth = vPlotxEnd - vPlotxStart;
}


function drawElement(colorString,colorspaceContex,xPos,yPos, index, colorside, circle){
  // draw circle

  colorspaceContex.setLineDash([]);

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
      colorspaceContex.strokeStyle =  mouseGrappedColor;
    else
      colorspaceContex.strokeStyle = 'rgb(0,0,0)';
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
              colorspaceContex.strokeStyle =  mouseGrappedColor;
          else
              colorspaceContex.strokeStyle = 'rgb(0,0,0)';
          colorspaceContex.strokeRect(x1, y1, tmpRecSize, tmpRecSize);
  }
}

function drawLine(colorspaceContex,xPos,yPos,xPos2,yPos2){

  //if(dashed)
  colorspaceContex.setLineDash([15,10]);
  //else
  //colorspaceContex.setLineDash([]);
  colorspaceContex.beginPath();
  colorspaceContex.lineWidth=bigLineWidth;
  colorspaceContex.moveTo(xPos, yPos);
  colorspaceContex.lineTo(xPos2, yPos2);
  colorspaceContex.strokeStyle = 'rgb(0,0,0)';
  colorspaceContex.stroke();
  colorspaceContex.lineWidth=smallLineWidth;
  colorspaceContex.strokeStyle = 'rgb(255,255,255)';
  colorspaceContex.stroke();
}
