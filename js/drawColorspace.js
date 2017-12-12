//////////////////////////////////////////
// -------------HSV---------------//
//////////////////////////////////////////
function hueInit(canvasID){

          var canvasColorspace = document.getElementById(canvasID);
          //$("#"+canvasID).attr("width", hue_resolution_X+"px");
          //$("#"+canvasID).attr("height", hue_resolution_Y+"px");
          canvasColorspace.width = hue_resolution_X;
          canvasColorspace.height = hue_resolution_Y;
          canvasColorspaceWidth = canvasColorspace.width;
          canvasColorspaceHeight = canvasColorspace.height;
          //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
          var colorspaceContex = canvasColorspace.getContext("2d");
          var canvasColorspaceData = colorspaceContex.getImageData(0, 0, canvasColorspaceWidth, canvasColorspaceHeight);

          colorspaceCenterX = Math.round(canvasColorspaceWidth/2);
          colorspaceCenterY = Math.round(canvasColorspaceHeight/2);
          colorspaceRadius = Math.round((canvasColorspaceWidth/2)*radiusratio);


    if(document.getElementById('analyseSideShowHSV').checked == true){
          // draw colorspace
        for(var x=0; x<canvasColorspaceWidth;x++){

          for(var y=0; y<canvasColorspaceHeight;y++){

              var dis = Math.sqrt(Math.pow(colorspaceCenterX-x,2)+Math.pow(colorspaceCenterY-y,2));

              if(dis<=colorspaceRadius){
                // calc hsv color

                var ty = (y) - (colorspaceCenterY);
                var tx = x- colorspaceCenterX;
                var angle = (Math.atan2(ty,tx)+Math.PI)/(Math.PI*2); // values 0-1 ...
                var hVal = angle;
                var sVal = dis/colorspaceRadius;
                var vVal = parseFloat(document.getElementById('id_setValueRange').value)/100;
                var colorHSV = new classColor_HSV(hVal,sVal,vVal);
                var colorRGB = colorHSV.calcRGBColor();
                var index = (x + y * canvasColorspaceWidth) * 4;

                canvasColorspaceData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                canvasColorspaceData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                canvasColorspaceData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                canvasColorspaceData.data[index + 3] = 255; //a


              }

          }

        }
     }


     if(document.getElementById('analyseSideShowLAB').checked == true){
        var xStart = canvasColorspaceWidth*0.1;
        var yStart = canvasColorspaceHeight*0.1;
        var xEnd = canvasColorspaceWidth*0.9;
        var yEnd = canvasColorspaceHeight*0.9;
        var xWidth = canvasColorspaceWidth*0.8;
        var yHeight = canvasColorspaceHeight*0.8;

        colorspaceCenterX = Math.round(canvasColorspaceWidth/2);
        colorspaceCenterY = Math.round(canvasColorspaceHeight/2);


        // draw colorspace
        for(var x=0; x<canvasColorspaceWidth;x++){

          for(var y=0; y<canvasColorspaceHeight;y++){

             if(x>=xStart && x<=xEnd && y>=yStart && y<=yEnd){
                // calc hsv color
                var lVal = parseFloat(document.getElementById('id_setValueRange').value);

                var aVal = ((x-colorspaceCenterX)/(xWidth/2))*labSpaceRange;
                var bVal = ((y-colorspaceCenterY)/(yHeight/2))*labSpaceRange;

                var colorLAB = new classColor_LAB(lVal,aVal,bVal);
                var colorRGB = colorLAB.calcRGBColor();
                var index = (x + y * canvasColorspaceWidth) * 4;

                canvasColorspaceData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                canvasColorspaceData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                canvasColorspaceData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                canvasColorspaceData.data[index + 3] = 255; //a
              }
          }

        }
      }

      colorspaceContex.putImageData(canvasColorspaceData, 0, 0); // update ColorspaceCanvas;

}

function init_VPlot(colormapTmp, canvasID){

    var canvasVPlot = document.getElementById(canvasID);

    canvasVPlot.width = vPlot_resolution_X;
    canvasVPlot.height = vPlot_resolution_Y;

    //$("#"+canvasID).attr("width", vPlot_resolution_X+"px");
    //$("#"+canvasID).attr("height", vPlot_resolution_Y+"px");
    //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
    var vPlotContex = canvasVPlot.getContext("2d");


    var yStart =  Math.round(vPlot_resolution_Y*0.9);
    var yEnd =  Math.round(vPlot_resolution_Y*0.2);
    var yEndLine =  Math.round(vPlot_resolution_Y*0.15);
    var yEndArrow =  Math.round(vPlot_resolution_Y*0.1);
    var arrowHeight =  Math.round((yEndLine-yEndArrow)*0.75);
    var labelFontSize = arrowHeight*0.75;
    var labelFontSizeSmall = arrowHeight*0.5;
    var xStart =  Math.round(vPlot_resolution_X*0.1);
    var xEnd =  Math.round(vPlot_resolution_X*0.85);
    var xEndArrow =  Math.round(vPlot_resolution_X*0.9);
    var xEndLine =  xEndArrow-arrowHeight;

    var lineColor = 'rgb(200,200,200)';
    var arrowFontColor = 'rgb(90,90,90)';

    plotXStart =xStart;
    heigthVArea =yStart-yEnd;
    plotYStart =yStart;
    plotYEnd =yEnd;

    vPlotContex.fillStyle = arrowFontColor;
    /////////////////////////////////////////////////////////////////
    // init vars for V-Value Overview
    widthVArea = 0;
    var tmpCounter = 0;
    var leftCounter = 0;
    var xPosPos;
    widthVArea = Math.round((xEnd-xStart)/(colormapBandSketchC1.length));

    for(var i=0; i<=colormapBandSketchC1.length; i++){

      xPosPos = xStart+i*widthVArea;

      vPlotContex.beginPath();
      vPlotContex.lineWidth=Math.round(lineWidthVPlot/2);
      vPlotContex.moveTo(xPosPos, yStart);
      vPlotContex.lineTo(xPosPos, vPlot_resolution_Y*0.93);
      vPlotContex.strokeStyle = lineColor;
      vPlotContex.stroke();
      vPlotContex.strokeStyle = arrowFontColor;
      var text = "Key "+(i+1);
      vPlotContex.font = labelFontSizeSmall+"px Arial";
      vPlotContex.fillText(text,xPosPos,vPlot_resolution_Y*0.93+labelFontSizeSmall);

    }



    xPosPos = Math.round(vPlot_resolution_X*0.09);
    var yPos = yStart;
    vPlotContex.font = labelFontSizeSmall+"px Arial";

    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(xPosPos, yPos);
    vPlotContex.lineTo(xStart,yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
    vPlotContex.fillText("0.00",xPosPos*0.75,yPos);

    yPos = yStart-(yStart-yEnd)*0.10;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(xPosPos, yPos);
    vPlotContex.lineTo(xEnd, yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.10",xPosPos*0.75,yPos);

    yPos = yStart-(yStart-yEnd)*0.20;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(xPosPos, yPos);
    vPlotContex.lineTo(xEnd, yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.20",xPosPos*0.75,yPos);

        yPos = yStart-(yStart-yEnd)*0.30;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(xPosPos, yPos);
    vPlotContex.lineTo(xEnd, yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.30",xPosPos*0.75,yPos);

        yPos = yStart-(yStart-yEnd)*0.40;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(xPosPos, yPos);
    vPlotContex.lineTo(xEnd, yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.40",xPosPos*0.75,yPos);

        yPos = yStart-(yStart-yEnd)*0.50;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=2;
    vPlotContex.moveTo(xPosPos, yPos);
    vPlotContex.lineTo(xEnd, yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.50",xPosPos*0.75,yPos);

        yPos = yStart-(yStart-yEnd)*0.60;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(xPosPos, yPos);
    vPlotContex.lineTo(xEnd, yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.60",xPosPos*0.75,yPos);

        yPos = yStart-(yStart-yEnd)*0.70;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(xPosPos, yPos);
    vPlotContex.lineTo(xEnd, yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.70",xPosPos*0.75,yPos);

        yPos = yStart-(yStart-yEnd)*0.80;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(xPosPos, yPos);
    vPlotContex.lineTo(xEnd, yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.80",xPosPos*0.75,yPos);

        yPos = yStart-(yStart-yEnd)*0.90;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(xPosPos, yPos);
    vPlotContex.lineTo(xEnd, yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.90",xPosPos*0.75,yPos);

        yPos = yStart-(yStart-yEnd);
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(xPosPos, yPos);
    vPlotContex.lineTo(xEnd, yPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("1.00",xPosPos*0.75,yPos);

      ////////////////////////////////////////////////////////////
      /////////////ARROWS////////////////////
      ////////////////////////////////////////////////////////////
      vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.beginPath();
      vPlotContex.lineWidth=lineWidthVPlot;
      vPlotContex.moveTo(xStart, yStart);
      vPlotContex.lineTo(xEndLine, yStart);
      vPlotContex.stroke();

      // the triangle
      vPlotContex.beginPath();
      vPlotContex.moveTo(xEndLine, yStart-arrowWidth);
      vPlotContex.lineTo(xEndArrow, yStart);
      vPlotContex.lineTo(xEndLine, yStart+arrowWidth);
      vPlotContex.closePath();

      // the outline
      //vPlotContex.lineWidth = 10;
      //vPlotContex.strokeStyle = '#666666';
      //vPlotContex.stroke();if(document.getElementById('analyseSideShowLAB').checked == true)

      // the fill color
      vPlotContex.fillStyle = arrowFontColor;
      vPlotContex.fill();

      vPlotContex.beginPath();
      vPlotContex.lineWidth=lineWidthVPlot;
      vPlotContex.moveTo(xStart, yStart);
      vPlotContex.lineTo(xStart, yEndLine);
      vPlotContex.stroke();

      // the triangle
      vPlotContex.beginPath();
      vPlotContex.moveTo(xStart-arrowWidth, yEndLine);
      vPlotContex.lineTo(xStart, yEndArrow);
      vPlotContex.lineTo(xStart+arrowWidth, yEndLine);
      vPlotContex.closePath();

      // the fill color
      vPlotContex.fill();

      ////////////////// TEXT /////////////////////
      vPlotContex.font = labelFontSize+"px Arial";
      if(document.getElementById('analyseSideShowLAB').checked == true)
      vPlotContex.fillText("Lightness",xStart-labelFontSize,yEndArrow);
      else
      vPlotContex.fillText("Value",xStart-labelFontSize,yEndArrow);
      vPlotContex.fillText("Keys",xEndArrow,yStart+labelFontSize);

}



function drawcolormap_hsvSpace(colormapTmp, canvasID){

  init_VPlot(colormapTmp,"id_anaylseValue");

  var canvasColorspace = document.getElementById(canvasID);
  //$("#"+canvasID).attr("width", hue_resolution_X+"px");
  //$("#"+canvasID).attr("height", hue_resolution_Y+"px");
  canvasColorspace.width = hue_resolution_X;
  canvasColorspace.height = hue_resolution_Y;
  canvasColorspaceWidth = canvasColorspace.width;
  canvasColorspaceHeight = canvasColorspace.height;

  var xWidth = canvasColorspaceWidth*0.8;
  var yHeight = canvasColorspaceHeight*0.8;

  //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
  var colorspaceContex = canvasColorspace.getContext("2d");
  var canvasColorspaceData = colorspaceContex.getImageData(0, 0, canvasColorspaceWidth, canvasColorspaceHeight);

  ////////////////////////////////////////////////////////

  spaceElementsXPos = [];
  spaceElementsYPos = [];
  spaceElementsType = [];
  spaceElementsKey = [];

  ////////////////////////////////////////////////////////

  var canvasVPlot = document.getElementById("id_anaylseValue");
  var vPlotContex = canvasVPlot.getContext("2d");
  var vPlotKeyPos = 0;


  ////////////////////////////////////////////////////////

// draw Colormap
if(colormapBandSketchC1.length>0){

    /////////////////////////////////////////////////////////////////

     var twinStarted=false;
     var leftStarted=false;
     var xPos, yPos, xPos2, yPos2, tmpColor, tmpColor2;
       for(var i = 0; i<colormapTmp.getNumColors(); i++){

        var tmpKey = colormapTmp.getKey(i);

          switch(tmpKey) {
            case "nil key":

                if(colormapTmp.getNumColors()>2){

                    if(document.getElementById('analyseSideShowHSV').checked == true){
                      tmpColor = colormapTmp.getHSVColor(i);
                      var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                      var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                      xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                      yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;

                      tmpColor2 = colormapTmp.getHSVColor(i+1);
                      var tmpDis2 = tmpColor2.getSValue()*colorspaceRadius;
                      var tmpRad2 = (tmpColor2.getHValue()*Math.PI*2)-Math.PI;
                      xPos2 = tmpDis2*Math.cos(tmpRad2)+colorspaceCenterX;
                      yPos2 = tmpDis2*Math.sin(tmpRad2)+colorspaceCenterY;
                    }
                    else{
                      tmpColor = colormapTmp.getLabColor(i);
                      xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                      yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;

                      tmpColor2 = colormapTmp.getLabColor(i+1);
                      xPos2 = ((tmpColor2.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                      yPos2 = ((tmpColor2.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                    }

                    // draw dashed line
                    // draw solid line+
                    colorspaceContex.setLineDash([15,10]);
                    colorspaceContex.beginPath();
                    colorspaceContex.lineWidth=bigLineWidth;
                    colorspaceContex.moveTo(xPos, yPos);
                    colorspaceContex.lineTo(xPos2, yPos2);
                    colorspaceContex.strokeStyle = 'rgb(0,0,0)';
                    colorspaceContex.stroke();
                    colorspaceContex.beginPath();
                    colorspaceContex.lineWidth=smallLineWidth;
                    colorspaceContex.moveTo(xPos, yPos);
                    colorspaceContex.lineTo(xPos2, yPos2);
                    colorspaceContex.strokeStyle = 'rgb(255,255,255)';
                    colorspaceContex.stroke();
                }

                //// for mouse events: nil key is not important
                spaceElementsXPos.push(-1);
                spaceElementsYPos.push(-1);
                spaceElementsType.push(false);
                spaceElementsKey.push("nil key");

                break;
            case "twin key":
                if(twinStarted==true){
                    twinStarted=false;

                    if(document.getElementById('analyseSideShowHSV').checked == true){
                      tmpColor = colormapTmp.getHSVColor(i);
                      var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                      var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                      xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                      yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;

                      tmpColor2 = colormapTmp.getHSVColor(i+1);
                      var tmpDis2 = tmpColor2.getSValue()*colorspaceRadius;
                      var tmpRad2 = (tmpColor2.getHValue()*Math.PI*2)-Math.PI;
                      xPos2 = tmpDis2*Math.cos(tmpRad2)+colorspaceCenterX;
                      yPos2 = tmpDis2*Math.sin(tmpRad2)+colorspaceCenterY;
                    }
                    else{
                      tmpColor = colormapTmp.getLabColor(i);
                      xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                      yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;

                      tmpColor2 = colormapTmp.getLabColor(i+1);
                      xPos2 = ((tmpColor2.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                      yPos2 = ((tmpColor2.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                    }

                      // draw solid line+
                      colorspaceContex.setLineDash([]);
                      colorspaceContex.beginPath();
                      colorspaceContex.lineWidth=bigLineWidth;
                      colorspaceContex.moveTo(xPos, yPos);
                      colorspaceContex.lineTo(xPos2, yPos2);
                      colorspaceContex.strokeStyle = 'rgb(0,0,0)';
                      colorspaceContex.stroke();
                      colorspaceContex.beginPath();
                      colorspaceContex.lineWidth=smallLineWidth;
                      colorspaceContex.moveTo(xPos, yPos);
                      colorspaceContex.lineTo(xPos2, yPos2);
                      colorspaceContex.strokeStyle = 'rgb(255,255,255)';
                      colorspaceContex.stroke();
                      // draw circle
                      colorspaceContex.beginPath();
                      if(i==mouseAboveSpaceObjectID)
                        colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                      else
                        colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
                      colorspaceContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                      colorspaceContex.fill();
                      colorspaceContex.lineWidth = smallLineWidth;
                      if(i==mouseGrappedSpaceObjectID)
                        colorspaceContex.strokeStyle =  mouseGrappedColor;
                      else
                        colorspaceContex.strokeStyle = 'rgb(0,0,0)';
                      colorspaceContex.stroke();


                      //// for mouse events: twin key second = circle
                    spaceElementsXPos.push(xPos);
                    spaceElementsYPos.push(yPos);
                    spaceElementsType.push(true);
                    spaceElementsKey.push("twin key2");

                      break;

                }
                else{
                    var tmpKey2 = colormapTmp.getKey(i-1);
                    var drawCircle = true;
                    if(tmpKey2==="nil key" || tmpKey2==="left key")
                    drawCircle=false;

                    if(document.getElementById('analyseSideShowHSV').checked == true){
                      tmpColor = colormapTmp.getHSVColor(i);
                      var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                      var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                      xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                      yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;

                      tmpColor2 = colormapTmp.getHSVColor(i+1);
                      var tmpDis2 = tmpColor2.getSValue()*colorspaceRadius;
                      var tmpRad2 = (tmpColor2.getHValue()*Math.PI*2)-Math.PI;
                      xPos2 = tmpDis2*Math.cos(tmpRad2)+colorspaceCenterX;
                      yPos2 = tmpDis2*Math.sin(tmpRad2)+colorspaceCenterY;
                    }
                    else{
                      tmpColor = colormapTmp.getLabColor(i);
                      xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                      yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;

                      tmpColor2 = colormapTmp.getLabColor(i+1);
                      xPos2 = ((tmpColor2.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                      yPos2 = ((tmpColor2.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                    }

                    // draw dashed line
                    // draw solid line+
                    colorspaceContex.setLineDash([15,10]);
                    colorspaceContex.beginPath();
                    colorspaceContex.lineWidth=bigLineWidth;
                    colorspaceContex.moveTo(xPos, yPos);
                    colorspaceContex.lineTo(xPos2, yPos2);
                    colorspaceContex.strokeStyle = 'rgb(0,0,0)';
                    colorspaceContex.stroke();
                    colorspaceContex.beginPath();
                    colorspaceContex.lineWidth=smallLineWidth;
                    colorspaceContex.moveTo(xPos, yPos);
                    colorspaceContex.lineTo(xPos2, yPos2);
                    colorspaceContex.strokeStyle = 'rgb(255,255,255)';
                    colorspaceContex.stroke();
                    // draw circle
                    if(drawCircle){
                      colorspaceContex.setLineDash([]);
                      colorspaceContex.beginPath();
                      if(i==mouseAboveSpaceObjectID)
                        colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                      else
                        colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
                      colorspaceContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                      colorspaceContex.fill();
                      colorspaceContex.lineWidth = smallLineWidth;
                      if(i==mouseGrappedSpaceObjectID)
                        colorspaceContex.strokeStyle =  mouseGrappedColor;
                      else
                        colorspaceContex.strokeStyle = 'rgb(0,0,0)';
                      colorspaceContex.stroke();
                    }
                    else{
                      colorspaceContex.setLineDash([]);
                            var tmpRecSize = circleRad*2;
                            colorspaceContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                            var x1 = xPos-circleRad;
                            var y1 = yPos-circleRad;

                            if(i==mouseAboveSpaceObjectID){
                                tmpRecSize = bigcircleRad*2;
                                x1 = xPos-bigcircleRad;
                                y1 = yPos-bigcircleRad;
                             }

                            colorspaceContex.fillRect(x1, y1, tmpRecSize, tmpRecSize);
                            colorspaceContex.lineWidth = smallLineWidth;
                            if(i==mouseGrappedSpaceObjectID)
                                colorspaceContex.strokeStyle =  mouseGrappedColor;
                            else
                                colorspaceContex.strokeStyle = 'rgb(0,0,0)';
                            colorspaceContex.strokeRect(x1, y1, tmpRecSize, tmpRecSize);
                    }




                    //// for mouse events: twin key first = circle or quad
                    spaceElementsXPos.push(xPos);
                    spaceElementsYPos.push(yPos);
                    spaceElementsKey.push("twin key1");
                    if(drawCircle)
                        spaceElementsType.push(true);
                    else
                        spaceElementsType.push(false);


                    /////////////////////////////////////////////
                    // Twin Key First: V Overview
                    if(colormapTmp.getKey(i-1)==="left key" || colormapTmp.getKey(i-1)==="nil key"){
                      // -> constant band

                      vPlotContex.beginPath();
                      vPlotContex.lineWidth=plotLineWidth;
                      vPlotContex.strokeStyle = plotLineColor;

                      xPos = Math.round(plotXStart+(vPlotKeyPos)*widthVArea);
                      vPlotKeyPos++;
                      xPos2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                      if(document.getElementById('analyseSideShowHSV').checked == true)
                        yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                      else
                        yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()));


                      vPlotContex.moveTo(xPos,yPos);
                      vPlotContex.lineTo(xPos2,yPos);
                      vPlotContex.stroke();


                      tmpRecSize = circleRad;
                      vPlotContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                      x1 = xPos-circleRad;
                      y1 = yPos-circleRad;

                       if(i==mouseAboveSpaceObjectID){
                          tmpRecSize = bigcircleRad;
                          x1 = xPos-bigcircleRad;
                          y1 = yPos-bigcircleRad;
                       }

                       vPlotContex.lineWidth = 2;
                       vPlotContex.strokeStyle = "rgb(0,0,0)";
                      vPlotContex.fillRect(x1, y1, tmpRecSize, tmpRecSize);
                      vPlotContex.strokeRect(x1, y1, tmpRecSize, tmpRecSize);


                      vPlotContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                      var x1 = xPos2-circleRad;

                       if(i==mouseAboveSpaceObjectID){
                          x1 = xPos2-bigcircleRad;
                       }

                      vPlotContex.fillRect(x1, y1, tmpRecSize, tmpRecSize);
                      vPlotContex.strokeRect(x1, y1, tmpRecSize, tmpRecSize);

                    }else {


                      vPlotContex.beginPath();
                      vPlotContex.lineWidth=plotLineWidth;
                      vPlotContex.strokeStyle = plotLineColor;

                      xPos = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                      vPlotKeyPos++;
                      xPos2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));

                      if(document.getElementById('analyseSideShowHSV').checked == true){
                        tmpColor2 = colormapTmp.getHSVColor(i-1);
                        yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                        yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                      }
                      else{
                        tmpColor2 = colormapTmp.getLabColor(i-1);
                        yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()));
                        yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()));
                      }

                      vPlotContex.moveTo(xPos,yPos);
                      vPlotContex.lineTo(xPos2,yPos2);
                      vPlotContex.stroke();

                      vPlotContex.beginPath();
                      if(i-1==mouseAboveSpaceObjectID)
                        vPlotContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                      else
                        vPlotContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
                      vPlotContex.fillStyle = tmpColor2.calcRGBColor().getRGBStringAplha(alphaVal);
                      vPlotContex.fill();
                      vPlotContex.lineWidth = 2;
                      vPlotContex.strokeStyle = 'rgb(0,0,0)';
                      vPlotContex.stroke();

                      vPlotContex.beginPath();
                      if(i==mouseAboveSpaceObjectID)
                        vPlotContex.arc(xPos2, yPos2, bigcircleRad, 0, 2 * Math.PI, false);
                      else
                        vPlotContex.arc(xPos2, yPos2, circleRad, 0, 2 * Math.PI, false);
                      vPlotContex.fillStyle = tmpColor.calcRGBColor().getRGBStringAplha(alphaVal);
                      vPlotContex.fill();
                      vPlotContex.lineWidth = 2;
                      vPlotContex.strokeStyle = 'rgb(0,0,0)';
                      vPlotContex.stroke();



                    }


                    twinStarted=true;


                    break;
                }
            case "left key":
                if(leftStarted==true){


                    // do nothing
                    spaceElementsXPos.push(-1);
                    spaceElementsYPos.push(-1);
                    spaceElementsType.push(false);
                    spaceElementsKey.push("left key2");

                    leftStarted=false;
                    break;

                }
                else{
                    var tmpKey2 = colormapTmp.getKey(i-1);
                    var drawCircle = true;
                    if(tmpKey2==="nil key" || tmpKey2==="left key")
                          drawCircle=false;plotXStart

                      if(document.getElementById('analyseSideShowHSV').checked == true){
                            tmpColor = colormapTmp.getHSVColor(i);
                            var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                            var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                            xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                            yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                      }
                      else{
                            tmpColor = colormapTmp.getLabColor(i);
                            xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                            yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                      }


                    if(i!=colormapTmp.getNumColors()-1){
                          if(document.getElementById('analyseSideShowHSV').checked == true){
                            tmpColor2 = colormapTmp.getHSVColor(i+1);
                            var tmpDis2 = tmpColor2.getSValue()*colorspaceRadius;
                            var tmpRad2 = (tmpColor2.getHValue()*Math.PI*2)-Math.PI;
                            xPos2 = tmpDis2*Math.cos(tmpRad2)+colorspaceCenterX;
                            yPos2 = tmpDis2*Math.sin(tmpRad2)+colorspaceCenterY;
                        }
                         else{
                            tmpColor2 = colormapTmp.getLabColor(i+1);
                            xPos2 = ((tmpColor2.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                            yPos2 = ((tmpColor2.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                          }

                          // draw dashed line
                          // draw solid line+
                          colorspaceContex.setLineDash([15,10]);
                          colorspaceContex.beginPath();
                          colorspaceContex.lineWidth=bigLineWidth;
                          colorspaceContex.moveTo(xPos, yPos);
                          colorspaceContex.lineTo(xPos2, yPos2);
                          colorspaceContex.strokeStyle = 'rgb(0,0,0)';
                          colorspaceContex.stroke();
                          colorspaceContex.beginPath();
                          colorspaceContex.lineWidth=smallLineWidth;
                          colorspaceContex.moveTo(xPos, yPos);
                          colorspaceContex.lineTo(xPos2, yPos2);
                          colorspaceContex.strokeStyle = 'rgb(255,255,255)';
                          colorspaceContex.stroke();

                    }

                    // draw circle
                          if(drawCircle){
                            colorspaceContex.setLineDash([]);
                            colorspaceContex.beginPath();
                            if(i==mouseAboveSpaceObjectID)
                                colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                            else
                                colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
                            colorspaceContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                            colorspaceContex.fill();
                            colorspaceContex.lineWidth = smallLineWidth;
                            if(i==mouseGrappedSpaceObjectID)
                                colorspaceContex.strokeStyle =  mouseGrappedColor;
                            else
                                colorspaceContex.strokeStyle = 'rgb(0,0,0)';
                            colorspaceContex.stroke();
                          }
                          else{
                            colorspaceContex.setLineDash([]);
                            var tmpRecSize = circleRad*2;
                            colorspaceContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                            var x1 = xPos-circleRad;
                            var y1 = yPos-circleRad;

                             if(i==mouseAboveSpaceObjectID){
                                tmpRecSize = bigcircleRad*2;
                                x1 = xPos-bigcircleRad;
                                y1 = yPos-bigcircleRad;
                             }

                            colorspaceContex.fillRect(x1, y1, tmpRecSize, tmpRecSize);
                            colorspaceContex.lineWidth = smallLineWidth;
                            if(i==mouseGrappedSpaceObjectID)
                                colorspaceContex.strokeStyle =  mouseGrappedColor;
                            else
                                colorspaceContex.strokeStyle = 'rgb(0,0,0)';
                            colorspaceContex.strokeRect(x1, y1, tmpRecSize, tmpRecSize);
                          }

                    //// for mouse events: left key first = circle or quad
                    spaceElementsXPos.push(xPos);
                    spaceElementsYPos.push(yPos);
                    spaceElementsKey.push("left key1");
                    if(drawCircle)
                        spaceElementsType.push(true);
                    else
                        spaceElementsType.push(false);

                    /////////////////////////////////////////////
                    // LEFT Key First: V Overview
                    if(colormapTmp.getKey(i-1)==="left key" || colormapTmp.getKey(i-1)==="nil key"){
                        // -> constant band

                        vPlotContex.beginPath();
                        vPlotContex.lineWidth=plotLineWidth;
                        vPlotContex.strokeStyle = plotLineColor;

                        xPos = Math.round(plotXStart+(vPlotKeyPos)*widthVArea);
                        vPlotKeyPos++;
                        xPos2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                        if(document.getElementById('analyseSideShowHSV').checked == true)
                          yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                        else
                          yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()));


                        vPlotContex.moveTo(xPos,yPos);
                        vPlotContex.lineTo(xPos2,yPos);
                        vPlotContex.stroke();


                        tmpRecSize = circleRad;
                        vPlotContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                        x1 = xPos-circleRad;
                        y1 = yPos-circleRad;

                         if(i==mouseAboveSpaceObjectID){
                            tmpRecSize = bigcircleRad;
                            x1 = xPos-bigcircleRad;
                            y1 = yPos-bigcircleRad;
                         }

                         vPlotContex.lineWidth = 2;
                         vPlotContex.strokeStyle = "rgb(0,0,0)";
                        vPlotContex.fillRect(x1, y1, tmpRecSize, tmpRecSize);
                        vPlotContex.strokeRect(x1, y1, tmpRecSize, tmpRecSize);


                        vPlotContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                        var x1 = xPos2-circleRad;

                         if(i==mouseAboveSpaceObjectID){
                            x1 = xPos2-bigcircleRad;
                         }

                        vPlotContex.fillRect(x1, y1, tmpRecSize, tmpRecSize);
                        vPlotContex.strokeRect(x1, y1, tmpRecSize, tmpRecSize);

                    }else {

                      vPlotContex.beginPath();
                      vPlotContex.lineWidth=plotLineWidth;
                      vPlotContex.strokeStyle = plotLineColor;

                      xPos = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                      vPlotKeyPos++;
                      xPos2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));

                      if(document.getElementById('analyseSideShowHSV').checked == true){
                        tmpColor2 = colormapTmp.getHSVColor(i-1);
                        tmpColor = colormapTmp.getHSVColor(i);
                        yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                        yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                      }
                      else{
                        tmpColor2 = colormapTmp.getLabColor(i-1);
                        tmpColor = colormapTmp.getLabColor(i);
                        yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                        yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                      }

                      vPlotContex.moveTo(xPos,yPos);
                      vPlotContex.lineTo(xPos2,yPos2);
                      vPlotContex.stroke();

                      vPlotContex.beginPath();
                      if(i-1==mouseAboveSpaceObjectID)
                        vPlotContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                      else
                        vPlotContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
                      vPlotContex.fillStyle = tmpColor2.calcRGBColor().getRGBStringAplha(alphaVal);
                      vPlotContex.fill();
                      vPlotContex.lineWidth = 2;
                      vPlotContex.strokeStyle = 'rgb(0,0,0)';
                      vPlotContex.stroke();

                      vPlotContex.beginPath();
                      if(i==mouseAboveSpaceObjectID)
                        vPlotContex.arc(xPos2, yPos2, bigcircleRad, 0, 2 * Math.PI, false);
                      else
                        vPlotContex.arc(xPos2, yPos2, circleRad, 0, 2 * Math.PI, false);
                      vPlotContex.fillStyle = tmpColor.calcRGBColor().getRGBStringAplha(alphaVal);
                      vPlotContex.fill();
                      vPlotContex.lineWidth = 2;
                      vPlotContex.strokeStyle = 'rgb(0,0,0)';
                      vPlotContex.stroke();
                    }

                    leftStarted=true;
                    break;
                }

            default:
                // dual Key, right key,

                if(document.getElementById('analyseSideShowHSV').checked == true){
                      tmpColor = colormapTmp.getHSVColor(i);
                      var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                      var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                      xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                      yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;

                      tmpColor2 = colormapTmp.getHSVColor(i+1);
                      var tmpDis2 = tmpColor2.getSValue()*colorspaceRadius;
                      var tmpRad2 = (tmpColor2.getHValue()*Math.PI*2)-Math.PI;
                      xPos2 = tmpDis2*Math.cos(tmpRad2)+colorspaceCenterX;
                      yPos2 = tmpDis2*Math.sin(tmpRad2)+colorspaceCenterY;
                }
                else{
                      tmpColor = colormapTmp.getLabColor(i);

                      xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                      yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;

                      tmpColor2 = colormapTmp.getLabColor(i+1);
                      xPos2 = ((tmpColor2.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                      yPos2 = ((tmpColor2.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                }
                // draw solid line+
                colorspaceContex.setLineDash([]);
                colorspaceContex.beginPath();
                colorspaceContex.lineWidth=bigLineWidth;
                colorspaceContex.moveTo(xPos, yPos);
                colorspaceContex.lineTo(xPos2, yPos2);
                colorspaceContex.strokeStyle = 'rgb(0,0,0)';
                colorspaceContex.stroke();
                colorspaceContex.beginPath();
                colorspaceContex.lineWidth=smallLineWidth;
                colorspaceContex.moveTo(xPos, yPos);
                colorspaceContex.lineTo(xPos2, yPos2);
                colorspaceContex.strokeStyle = 'rgb(255,255,255)';
                colorspaceContex.stroke();
                // draw circle
                colorspaceContex.beginPath();
                if(i==mouseAboveSpaceObjectID)
                    colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                else
                    colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
                colorspaceContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                colorspaceContex.fill();
                colorspaceContex.lineWidth = smallLineWidth;
                if(i==mouseGrappedSpaceObjectID)
                   colorspaceContex.strokeStyle =  mouseGrappedColor;
                else
                   colorspaceContex.strokeStyle = 'rgb(0,0,0)';
                colorspaceContex.stroke();

                //// for mouse events: dual Key, right key = circle
                spaceElementsXPos.push(xPos);
                spaceElementsYPos.push(yPos);
                spaceElementsType.push(true);
                spaceElementsKey.push(tmpKey);

                // V Overview
                /////////////////////////////////////////////
                // Default: V Overview

                if(tmpKey=='dual key'){
                  tmpColor2 = colormapTmp.getHSVColor(i-1);

                  vPlotContex.beginPath();
                  vPlotContex.lineWidth=plotLineWidth;
                  vPlotContex.strokeStyle = plotLineColor;

                  xPos = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                  vPlotKeyPos++;
                  xPos2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));

                  if(document.getElementById('analyseSideShowHSV').checked == true){
                    tmpColor2 = colormapTmp.getHSVColor(i-1);
                    yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                    yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                  }
                  else{
                    tmpColor2 = colormapTmp.getLabColor(i-1);
                    yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()));
                    yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()));
                  }

                  vPlotContex.moveTo(xPos,yPos);
                  vPlotContex.lineTo(xPos2,yPos2);
                  vPlotContex.stroke();


                  vPlotContex.beginPath();
                  if(i-1==mouseAboveSpaceObjectID)
                    vPlotContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                  else
                    vPlotContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
                  vPlotContex.fillStyle = tmpColor2.calcRGBColor().getRGBStringAplha(alphaVal);
                  vPlotContex.fill();
                  vPlotContex.lineWidth = 2;
                  vPlotContex.strokeStyle = 'rgb(0,0,0)';
                  vPlotContex.stroke();
                }




        }

    }

}
else{

  //canvasVInputContex.putImageData(canvasVInputData, 0, 0); // update VValue Canvas;
  var grd = canvasVInputContex.createLinearGradient(0, 0, 0, canvasVInputHeight);
  grd.addColorStop(0, "white");
  grd.addColorStop(1, "black");
  canvasVInputContex.fillStyle = grd;
  canvasVInputContex.fillRect(0,0, canvasVInputWidth, canvasVInputHeight);
  }
}
