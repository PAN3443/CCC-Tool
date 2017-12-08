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
    var arrowHeight = yEndLine-yEndArrow;
    var labelFontSize = arrowHeight*0.75;
    var xStart =  Math.round(vPlot_resolution_X*0.1);
    var xEnd =  Math.round(vPlot_resolution_X*0.8);
    var xEndArrow =  Math.round(vPlot_resolution_X*0.9);
    var xEndLine =  xEndArrow-arrowHeight;

    vPlotContex.strokeStyle = 'rgb(0,0,0)';
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
    vPlotContex.fillStyle = 'rgb(0,0,0)';
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
    vPlotContex.fillStyle = 'rgb(0,0,0)';
    vPlotContex.fill();

    ////////////////// TEXT /////////////////////
    vPlotContex.font = labelFontSize+"px Arial";
    vPlotContex.fillText("Value",xStart-labelFontSize,yEndArrow);
    vPlotContex.fillText("Keys",xEndArrow,yStart+labelFontSize);


    /////////////////////////////////////////////////////////////////
    // init vars for V-Value Overview
    var widthVArea = 0;
    var tmpCounter = 0;
    var leftCounter = 0;
    for(var i = 0; i<colormapTmp.getNumColors(); i++){


      //console.log(colormapTmp.getKey(i));
    /*  if(colormapTmp.getKey(i)!="nil key"){

        if(colormapTmp.getKey(i)!="left key")
          tmpCounter++;
        else
          leftCounter++;
      }*/
    }
    //leftCounter++; // because last key is single left
    //tmpCounter=tmpCounter+(leftCounter/2);
    //widthVArea = Math.round((vPlot_resolution_X*0.7)/tmpCounter);

    console.log(tmpCounter);
    for(var i=0; i<tmpCounter; i++){
      var tmpXPos = xStart+i*widthVArea;

      vPlotContex.beginPath();
      vPlotContex.lineWidth=Math.round(lineWidthVPlot/2);
      vPlotContex.moveTo(tmpXPos, yStart);
      vPlotContex.lineTo(tmpXPos, vPlot_resolution_Y*0.93);
      vPlotContex.stroke();
    }

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

                      // V Overview
                      /*if(i==mouseAboveSpaceObjectID)
                        createSide_drawVElement(xStart,widthVArea, tmpHSVColor,true);
                      else
                        createSide_drawVElement(xStart,widthVArea, tmpHSVColor,false);
                      xStart=xStart+widthVArea;*/

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

                    // V Overview
                     /*if(i==mouseAboveSpaceObjectID)
                        createSide_drawVElement(xStart,widthVArea, tmpHSVColor,true);
                      else
                        createSide_drawVElement(xStart,widthVArea, tmpHSVColor,false);
                      xStart=xStart+widthVArea;*/
                    twinStarted=true;


                    //// for mouse events: twin key first = circle or quad
                    spaceElementsXPos.push(xPos);
                    spaceElementsYPos.push(yPos);
                    spaceElementsKey.push("twin key1");
                    if(drawCircle)
                        spaceElementsType.push(true);
                    else
                        spaceElementsType.push(false);

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
                          drawCircle=false;

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

                    // V Overview
                       /*if(i==mouseAboveSpaceObjectID)
                        createSide_drawVElement(xStart,widthVArea, tmpHSVColor,true);
                      else
                        createSide_drawVElement(xStart,widthVArea, tmpHSVColor,false);
                      xStart=xStart+widthVArea;*/

                    //// for mouse events: left key first = circle or quad
                    spaceElementsXPos.push(xPos);
                    spaceElementsYPos.push(yPos);
                    spaceElementsKey.push("left key1");
                    if(drawCircle)
                        spaceElementsType.push(true);
                    else
                        spaceElementsType.push(false);

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
                       /*if(i==mouseAboveSpaceObjectID)
                        createSide_drawVElement(xStart,widthVArea, tmpHSVColor,true);
                      else
                        createSide_drawVElement(xStart,widthVArea, tmpHSVColor,false);
                      xStart=xStart+widthVArea;*/

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
