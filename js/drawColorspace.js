//////////////////////////////////////////
// -------------Functions---------------//
//////////////////////////////////////////
function hsv_hueInit(canvasID){

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
                var vVal = 1;
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

    vPlotContex.fillStyle = arrowFontColor;
    /////////////////////////////////////////////////////////////////
    // init vars for V-Value Overview
    widthVArea = 0;
    var tmpCounter = 0;
    var leftCounter = 0;
    var tmpXPos;
    widthVArea = Math.round((xEnd-xStart)/(colormapBandSketchC1.length));

    for(var i=0; i<=colormapBandSketchC1.length; i++){

      tmpXPos = xStart+i*widthVArea;

      vPlotContex.beginPath();
      vPlotContex.lineWidth=Math.round(lineWidthVPlot/2);
      vPlotContex.moveTo(tmpXPos, yStart);
      vPlotContex.lineTo(tmpXPos, vPlot_resolution_Y*0.93);
      vPlotContex.strokeStyle = lineColor;
      vPlotContex.stroke();
      vPlotContex.strokeStyle = arrowFontColor;
      var text = "Key "+(i+1);
      vPlotContex.font = labelFontSizeSmall+"px Arial";
      vPlotContex.fillText(text,tmpXPos,vPlot_resolution_Y*0.93+labelFontSizeSmall);

    }



    tmpXPos = Math.round(vPlot_resolution_X*0.09);
    var tmpYPos = yStart;
    vPlotContex.font = labelFontSizeSmall+"px Arial";

    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(tmpXPos, tmpYPos);
    vPlotContex.lineTo(xStart,tmpYPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
    vPlotContex.fillText("0.00",tmpXPos*0.75,tmpYPos);

    tmpYPos = yStart-(yStart-yEnd)*0.10;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(tmpXPos, tmpYPos);
    vPlotContex.lineTo(xEnd, tmpYPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.10",tmpXPos*0.75,tmpYPos);

    tmpYPos = yStart-(yStart-yEnd)*0.20;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(tmpXPos, tmpYPos);
    vPlotContex.lineTo(xEnd, tmpYPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.20",tmpXPos*0.75,tmpYPos);

        tmpYPos = yStart-(yStart-yEnd)*0.30;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(tmpXPos, tmpYPos);
    vPlotContex.lineTo(xEnd, tmpYPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.30",tmpXPos*0.75,tmpYPos);

        tmpYPos = yStart-(yStart-yEnd)*0.40;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(tmpXPos, tmpYPos);
    vPlotContex.lineTo(xEnd, tmpYPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.40",tmpXPos*0.75,tmpYPos);

        tmpYPos = yStart-(yStart-yEnd)*0.50;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=2;
    vPlotContex.moveTo(tmpXPos, tmpYPos);
    vPlotContex.lineTo(xEnd, tmpYPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.50",tmpXPos*0.75,tmpYPos);

        tmpYPos = yStart-(yStart-yEnd)*0.60;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(tmpXPos, tmpYPos);
    vPlotContex.lineTo(xEnd, tmpYPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.60",tmpXPos*0.75,tmpYPos);

        tmpYPos = yStart-(yStart-yEnd)*0.70;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(tmpXPos, tmpYPos);
    vPlotContex.lineTo(xEnd, tmpYPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.70",tmpXPos*0.75,tmpYPos);

        tmpYPos = yStart-(yStart-yEnd)*0.80;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(tmpXPos, tmpYPos);
    vPlotContex.lineTo(xEnd, tmpYPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.80",tmpXPos*0.75,tmpYPos);

        tmpYPos = yStart-(yStart-yEnd)*0.90;
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(tmpXPos, tmpYPos);
    vPlotContex.lineTo(xEnd, tmpYPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("0.90",tmpXPos*0.75,tmpYPos);

        tmpYPos = yStart-(yStart-yEnd);
    vPlotContex.beginPath();
    vPlotContex.lineWidth=1;
    vPlotContex.moveTo(tmpXPos, tmpYPos);
    vPlotContex.lineTo(xEnd, tmpYPos);
    vPlotContex.strokeStyle = lineColor;
    vPlotContex.stroke();
    vPlotContex.strokeStyle = arrowFontColor;
      vPlotContex.fillText("1.00",tmpXPos*0.75,tmpYPos);

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
      //vPlotContex.stroke();

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

       for(var i = 0; i<colormapTmp.getNumColors(); i++){

        var tmpKey = colormapTmp.getKey(i);

          switch(tmpKey) {
            case "nil key":

                if(colormapTmp.getNumColors()>2){
                    var tmpHSVColor = colormapTmp.getHSVColor(i);
                    var tmpDis = tmpHSVColor.getSValue()*colorspaceRadius;
                    var tmpRad = (tmpHSVColor.getHValue()*Math.PI*2)-Math.PI;
                    var xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                    var yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;

                    var tmpHSVColor2 = colormapTmp.getHSVColor(i+1);
                    var tmpDis2 = tmpHSVColor2.getSValue()*colorspaceRadius;
                    var tmpRad2 = (tmpHSVColor2.getHValue()*Math.PI*2)-Math.PI;
                    var xPos2 = tmpDis2*Math.cos(tmpRad2)+colorspaceCenterX;
                    var yPos2 = tmpDis2*Math.sin(tmpRad2)+colorspaceCenterY;

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
                     var tmpHSVColor = colormapTmp.getHSVColor(i);
                      var tmpDis = tmpHSVColor.getSValue()*colorspaceRadius;
                      var tmpRad = (tmpHSVColor.getHValue()*Math.PI*2)-Math.PI;
                      var xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                      var yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;

                      var tmpHSVColor2 = colormapTmp.getHSVColor(i+1);
                      var tmpDis2 = tmpHSVColor2.getSValue()*colorspaceRadius;
                      var tmpRad2 = (tmpHSVColor2.getHValue()*Math.PI*2)-Math.PI;
                      var xPos2 = tmpDis2*Math.cos(tmpRad2)+colorspaceCenterX;
                      var yPos2 = tmpDis2*Math.sin(tmpRad2)+colorspaceCenterY;
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

                      // V Overview


                      break;

                }
                else{
                    var tmpKey2 = colormapTmp.getKey(i-1);
                    var drawCircle = true;
                    if(tmpKey2==="nil key" || tmpKey2==="left key")
                    drawCircle=false;

                    var tmpHSVColor = colormapTmp.getHSVColor(i);
                    var tmpDis = tmpHSVColor.getSValue()*colorspaceRadius;
                    var tmpRad = (tmpHSVColor.getHValue()*Math.PI*2)-Math.PI;
                    var xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                    var yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;

                    var tmpHSVColor2 = colormapTmp.getHSVColor(i+1);
                    var tmpDis2 = tmpHSVColor2.getSValue()*colorspaceRadius;
                    var tmpRad2 = (tmpHSVColor2.getHValue()*Math.PI*2)-Math.PI;
                    var xPos2 = tmpDis2*Math.cos(tmpRad2)+colorspaceCenterX;
                    var yPos2 = tmpDis2*Math.sin(tmpRad2)+colorspaceCenterY;

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

                      var tmpX = Math.round(plotXStart+(vPlotKeyPos)*widthVArea);
                      var tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));
                      vPlotKeyPos++;
                      vPlotContex.moveTo(tmpX,tmpY);
                      var tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));

                      vPlotContex.lineTo(tmpX2,tmpY);
                      vPlotContex.stroke();


                      tmpRecSize = circleRad;
                      vPlotContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                      x1 = tmpX-circleRad/2;
                      y1 = tmpY-circleRad/2;

                       if(i==mouseAboveSpaceObjectID){
                          tmpRecSize = bigcircleRad;
                          x1 = tmpX-bigcircleRad/2;
                          y1 = tmpY-bigcircleRad/2;
                       }

                       vPlotContex.lineWidth = 2;
                       vPlotContex.strokeStyle = "rgb(0,0,0)";
                      vPlotContex.fillRect(x1, y1, tmpRecSize, tmpRecSize);
                      vPlotContex.strokeRect(x1, y1, tmpRecSize, tmpRecSize);


                      vPlotContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                      var x1 = tmpX2-circleRad/2;

                       if(i==mouseAboveSpaceObjectID){
                          x1 = tmpX2-bigcircleRad/2;
                       }

                      vPlotContex.fillRect(x1, y1, tmpRecSize, tmpRecSize);
                      vPlotContex.strokeRect(x1, y1, tmpRecSize, tmpRecSize);

                    }else {
                      tmpHSVColor2 = colormapTmp.getHSVColor(i-1);

                      vPlotContex.beginPath();
                      vPlotContex.lineWidth=plotLineWidth;
                      vPlotContex.strokeStyle = plotLineColor;

                      var tmpX = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                      var tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor2.getVValue()));
                      vPlotKeyPos++;
                      vPlotContex.moveTo(tmpX,tmpY);
                      var tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                      var tmpY2 = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));

                      vPlotContex.lineTo(tmpX2,tmpY2);
                      vPlotContex.stroke();


                      vPlotContex.beginPath();
                      if(i-1==mouseAboveSpaceObjectID)
                        vPlotContex.arc(tmpX, tmpY, bigcircleRad/2, 0, 2 * Math.PI, false);
                      else
                        vPlotContex.arc(tmpX, tmpY, circleRad/2, 0, 2 * Math.PI, false);
                      vPlotContex.fillStyle = tmpHSVColor2.calcRGBColor().getRGBStringAplha(alphaVal);
                      vPlotContex.fill();
                      vPlotContex.lineWidth = 2;
                      vPlotContex.strokeStyle = 'rgb(0,0,0)';
                      vPlotContex.stroke();

                      vPlotContex.beginPath();
                      if(i==mouseAboveSpaceObjectID)
                        vPlotContex.arc(tmpX2, tmpY2, bigcircleRad/2, 0, 2 * Math.PI, false);
                      else
                        vPlotContex.arc(tmpX2, tmpY2, circleRad/2, 0, 2 * Math.PI, false);
                      vPlotContex.fillStyle = tmpHSVColor.calcRGBColor().getRGBStringAplha(alphaVal);
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

                    var tmpHSVColor = colormapTmp.getHSVColor(i);
                    var tmpDis = tmpHSVColor.getSValue()*colorspaceRadius;
                    var tmpRad = (tmpHSVColor.getHValue()*Math.PI*2)-Math.PI;
                    var xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                    var yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;


                    if(i!=colormapTmp.getNumColors()-1){
                          var tmpHSVColor2 = colormapTmp.getHSVColor(i+1);
                          var tmpDis2 = tmpHSVColor2.getSValue()*colorspaceRadius;
                          var tmpRad2 = (tmpHSVColor2.getHValue()*Math.PI*2)-Math.PI;
                          var xPos2 = tmpDis2*Math.cos(tmpRad2)+colorspaceCenterX;
                          var yPos2 = tmpDis2*Math.sin(tmpRad2)+colorspaceCenterY;

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

                        var tmpX = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                        var tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));
                        vPlotKeyPos++;
                        vPlotContex.moveTo(tmpX,tmpY);
                        var tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));

                        vPlotContex.lineTo(tmpX2,tmpY);
                        vPlotContex.stroke();


                        tmpRecSize = circleRad;
                        vPlotContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                        x1 = tmpX-circleRad/2;
                        y1 = tmpY-circleRad/2;

                         if(i==mouseAboveSpaceObjectID){
                            tmpRecSize = bigcircleRad;
                            x1 = tmpX-bigcircleRad/2;
                            y1 = tmpY-bigcircleRad/2;
                         }

                         vPlotContex.lineWidth = 2;
                         vPlotContex.strokeStyle = "rgb(0,0,0)";
                        vPlotContex.fillRect(x1, y1, tmpRecSize, tmpRecSize);
                        vPlotContex.strokeRect(x1, y1, tmpRecSize, tmpRecSize);


                        vPlotContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                        var x1 = tmpX2-circleRad/2;

                         if(i==mouseAboveSpaceObjectID){
                            x1 = tmpX2-bigcircleRad/2;
                         }

                        vPlotContex.fillRect(x1, y1, tmpRecSize, tmpRecSize);
                        vPlotContex.strokeRect(x1, y1, tmpRecSize, tmpRecSize);

                    }else {
                      tmpHSVColor2 = colormapTmp.getHSVColor(i-1);

                      vPlotContex.beginPath();
                      vPlotContex.lineWidth=plotLineWidth;
                      vPlotContex.strokeStyle = plotLineColor;

                      var tmpX = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                      var tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor2.getVValue()));
                      vPlotKeyPos++
                      vPlotContex.moveTo(tmpX,tmpY);
                      var tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                      var tmpY2 = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));

                      vPlotContex.lineTo(tmpX2,tmpY2);
                      vPlotContex.stroke();


                      vPlotContex.beginPath();
                      if(i-1==mouseAboveSpaceObjectID)
                        vPlotContex.arc(tmpX, tmpY, bigcircleRad/2, 0, 2 * Math.PI, false);
                      else
                        vPlotContex.arc(tmpX, tmpY, circleRad/2, 0, 2 * Math.PI, false);
                      vPlotContex.fillStyle = tmpHSVColor2.calcRGBColor().getRGBStringAplha(alphaVal);
                      vPlotContex.fill();
                      vPlotContex.lineWidth = 2;
                      vPlotContex.strokeStyle = 'rgb(0,0,0)';
                      vPlotContex.stroke();

                      vPlotContex.beginPath();
                      if(i==mouseAboveSpaceObjectID)
                        vPlotContex.arc(tmpX2, tmpY2, bigcircleRad/2, 0, 2 * Math.PI, false);
                      else
                        vPlotContex.arc(tmpX2, tmpY2, circleRad/2, 0, 2 * Math.PI, false);
                      vPlotContex.fillStyle = tmpHSVColor.calcRGBColor().getRGBStringAplha(alphaVal);
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

                var tmpHSVColor = colormapTmp.getHSVColor(i);
                var tmpDis = tmpHSVColor.getSValue()*colorspaceRadius;
                var tmpRad = (tmpHSVColor.getHValue()*Math.PI*2)-Math.PI;
                var xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                var yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;

                var tmpHSVColor2 = colormapTmp.getHSVColor(i+1);
                var tmpDis2 = tmpHSVColor2.getSValue()*colorspaceRadius;
                var tmpRad2 = (tmpHSVColor2.getHValue()*Math.PI*2)-Math.PI;
                var xPos2 = tmpDis2*Math.cos(tmpRad2)+colorspaceCenterX;
                var yPos2 = tmpDis2*Math.sin(tmpRad2)+colorspaceCenterY;
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

                // V Overview
                /////////////////////////////////////////////
                // LEFT Key First: V Overview

                if(tmpKey=='dual key'){
                  tmpHSVColor2 = colormapTmp.getHSVColor(i-1);

                  vPlotContex.beginPath();
                  vPlotContex.lineWidth=plotLineWidth;
                  vPlotContex.strokeStyle = plotLineColor;

                  var tmpX = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                  var tmpY = Math.round(plotYStart-(heigthVArea*tmpHSVColor2.getVValue()));
                  vPlotKeyPos++
                  vPlotContex.moveTo(tmpX,tmpY);
                  var tmpX2 = Math.round(plotXStart+((vPlotKeyPos)*widthVArea));
                  var tmpY2 = Math.round(plotYStart-(heigthVArea*tmpHSVColor.getVValue()));

                  vPlotContex.lineTo(tmpX2,tmpY2);
                  vPlotContex.stroke();


                  vPlotContex.beginPath();
                  if(i-1==mouseAboveSpaceObjectID)
                    vPlotContex.arc(tmpX, tmpY, bigcircleRad/2, 0, 2 * Math.PI, false);
                  else
                    vPlotContex.arc(tmpX, tmpY, circleRad/2, 0, 2 * Math.PI, false);
                  vPlotContex.fillStyle = tmpHSVColor2.calcRGBColor().getRGBStringAplha(alphaVal);
                  vPlotContex.fill();
                  vPlotContex.lineWidth = 2;
                  vPlotContex.strokeStyle = 'rgb(0,0,0)';
                  vPlotContex.stroke();
                }


                //// for mouse events: dual Key, right key = circle
                spaceElementsXPos.push(xPos);
                spaceElementsYPos.push(yPos);
                spaceElementsType.push(true);
                spaceElementsKey.push(tmpKey);

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
