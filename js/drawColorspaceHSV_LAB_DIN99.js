//////////////////////////////////////////
// -------------HSV LAB DIN99---------------//
//////////////////////////////////////////
function hueInit(canvasID){

          var canvasColorspace = document.getElementById(canvasID);

          canvasColorspace.width = hue_resolution_X;
          canvasColorspace.height = hue_resolution_Y;
          canvasColorspaceWidth = canvasColorspace.width;
          canvasColorspaceHeight = canvasColorspace.height;
          //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
          var colorspaceContex = canvasColorspace.getContext("2d");
          colorspaceBackgroundData = colorspaceContex.getImageData(0, 0, canvasColorspaceWidth, canvasColorspaceHeight);

          colorspaceCenterX = Math.round(canvasColorspaceWidth/2);
          colorspaceCenterY = Math.round(canvasColorspaceHeight/2);
          colorspaceRadius = Math.round((canvasColorspaceWidth/2)*radiusratio);

          var errorRGBColor = new classColor_RGB(0.5,0.5,0.5);

          switch(analyzeColorspaceModus){
              case "hsv":
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
                        var vVal;

                          if(mouseGrappedSpaceObjectID==-1){
                            if(showSideID==2)
                            vVal= parseFloat(document.getElementById('id_setValueRange').value)/100;
                            if(showSideID==3)
                            vVal= parseFloat(document.getElementById('id_setValueRangeCompare').value)/100;
                          }
                          else{
                            vVal = globalColormap1.getHSVColor(mouseGrappedSpaceObjectID).getVValue();

                          }

                        var colorHSV = new classColor_HSV(hVal,sVal,vVal);
                        var colorRGB = colorHSV.calcRGBColor();
                        var index = (x + y * canvasColorspaceWidth) * 4;

                        colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                        colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                        colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                        colorspaceBackgroundData.data[index + 3] = 255; //a


                      }

                  }

                }
              break;
              case "lab":
                var xStart = canvasColorspaceWidth*0.1;
                var yStart = canvasColorspaceHeight*0.1;
                var xEnd = canvasColorspaceWidth*0.9;
                var yEnd = canvasColorspaceHeight*0.9;
                var xWidth = canvasColorspaceWidth*labSpaceRectRange;
                var yHeight = canvasColorspaceHeight*labSpaceRectRange;

                colorspaceCenterX = Math.round(canvasColorspaceWidth/2);
                colorspaceCenterY = Math.round(canvasColorspaceHeight/2);


                // draw colorspace
                for(var x=0; x<canvasColorspaceWidth;x++){

                  for(var y=0; y<canvasColorspaceHeight;y++){

                     if(x>=xStart && x<=xEnd && y>=yStart && y<=yEnd){
                        // calc hsv color
                        var colorRGB;
                        if(mouseGrappedSpaceObjectID==-1){

                          var lVal;
                          if(showSideID==2)
                          lVal= parseFloat(document.getElementById('id_setValueRange').value);
                          if(showSideID==3)
                          lVal= parseFloat(document.getElementById('id_setValueRangeCompare').value);

                          var aVal = ((x-colorspaceCenterX)/(xWidth/2))*labSpaceRange;
                          var bVal = ((y-colorspaceCenterY)/(yHeight/2))*labSpaceRange;

                          var colorLAB = new classColor_LAB(lVal,aVal,bVal);
                          colorRGB = colorLAB.calcRGBColor();
                        }
                        else{
                          var lVal;
                          if(showSideID==2)
                          lVal = globalColormap1.getLabColor(mouseGrappedSpaceObjectID).getLValue();
                          if(showSideID==3)
                          lVal = globalColormap1.getLabColor(mouseGrappedSpaceObjectID).getLValue();

                          var aVal = ((x-colorspaceCenterX)/(xWidth/2))*labSpaceRange;
                          var bVal = ((y-colorspaceCenterY)/(yHeight/2))*labSpaceRange;

                          var colorLAB = new classColor_LAB(lVal,aVal,bVal);

                          if(document.getElementById("id_checkboxRGB").checked==true){
                            colorRGB = colorLAB.calcRGBColorCorrect(errorRGBColor);
                          }
                          else{
                            colorRGB = colorLAB.calcRGBColor();
                          }
                        }

                        var index = (x + y * canvasColorspaceWidth) * 4;

                        colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                        colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                        colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                        colorspaceBackgroundData.data[index + 3] = 255; //a
                      }
                  }

                }
              break;
              case "din99":
              var xStart = canvasColorspaceWidth*0.1;
              var yStart = canvasColorspaceHeight*0.1;
              var xEnd = canvasColorspaceWidth*0.9;
              var yEnd = canvasColorspaceHeight*0.9;
              var xWidth = canvasColorspaceWidth*labSpaceRectRange;
              var yHeight = canvasColorspaceHeight*labSpaceRectRange;


              rangeA99 = rangeA99Pos-rangeA99Neg;
              rangeB99 = rangeB99Pos-rangeB99Neg;

              colorspaceCenterX = Math.round(canvasColorspaceWidth/2);
              colorspaceCenterY = Math.round(canvasColorspaceHeight/2);


              // draw colorspace
              for(var x=0; x<canvasColorspaceWidth;x++){

                for(var y=0; y<canvasColorspaceHeight;y++){

                   if(x>=xStart && x<=xEnd && y>=yStart && y<=yEnd){
                      // calc hsv color
                      var colorRGB;
                      //var a99Val = ((x-colorspaceCenterX)/(xWidth/2))*din99SpaceRange;
                      //var b99Val = ((y-colorspaceCenterY)/(yHeight/2))*din99SpaceRange;
                      var a99Val =   ((x-xStart)/(xEnd-xStart))*rangeA99+rangeA99Neg;
                      var b99Val = ((y-yStart)/(yEnd-yStart))*rangeB99+rangeB99Neg;

                      var colorDIN99;
                      if(mouseGrappedSpaceObjectID==-1){
                        var l99Val;
                        if(showSideID==2)
                        l99Val= parseFloat(document.getElementById('id_setValueRange').value);
                        if(showSideID==3)
                        l99Val= parseFloat(document.getElementById('id_setValueRangeCompare').value);

                        colorDIN99 = new classColorDIN99(l99Val,a99Val,b99Val);
                        colorRGB = colorDIN99.calcRGBColor();
                      }
                      else{
                        var l99Val;
                        l99Val = globalColormap1.getDIN99Color(mouseGrappedSpaceObjectID).getL99Value();

                        colorDIN99 = new classColorDIN99(l99Val,a99Val,b99Val);

                        if(document.getElementById("id_checkboxRGB").checked==true){
                          colorRGB = colorDIN99.calcRGBColorCorrect(errorRGBColor);
                        }
                        else{
                          colorRGB = colorDIN99.calcRGBColor();
                        }
                      }

                      if(colorRGB.getRValue()==0 && colorRGB.getGValue()==0 && colorRGB.getBValue()==0){
                        if(colorDIN99.getL99Value()!=0 || colorDIN99.getA99Value() !=0 || colorDIN99.getB99Value()!=0){
                          colorRGB = new classColor_RGB(1,1,1);
                        }
                      }

                      //console.log(a99Val+' '+b99Val);
                      //console.log(colorRGB.getRValue()*255+' '+colorRGB.getGValue()*255+' '+colorRGB.getBValue()*255);
                      //break;

                      var index = (x + y * canvasColorspaceWidth) * 4;

                      colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                      colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                      colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                      colorspaceBackgroundData.data[index + 3] = 255; //a
                    }
                }

              }
              break;
              default:
              console.log("Error at the changeColorspace function");
              return;
          }

      //colorspaceContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;

}

function init_VPlot(colormapTmp, canvasID){

    var canvasVPlot = document.getElementById(canvasID);

    canvasVPlot.width = vPlot_resolution_X;
    canvasVPlot.height = vPlot_resolution_Y;

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
    plotXEnd =xEnd;
    heigthVArea =yStart-yEnd;
    plotYStart =yStart;
    plotYEnd =yEnd;

    vPlotContex.fillStyle = arrowFontColor;
    /////////////////////////////////////////////////////////////////
    // init vars for V-Value Overview
    widthVArea = 0;
    widthVArea2=0;

    var tmpCounter = 0;
    var leftCounter = 0;
    var xPosPos;


    if(doOriginalValuePlot){
      var plotwidth = plotXEnd-plotXStart;

          widthVArea = bandSketch.getRefR2(bandSketch.getBandLength()-1)-bandSketch.getRefR1(0);
      if(showSideID==3){

        widthVArea2 = bandSketch2.getRefR2(bandSketch2.getBandLength()-1)-bandSketch2.getRefR1(0);

        xPosPos = xStart;
        vPlotContex.beginPath();
        vPlotContex.lineWidth=Math.round(lineWidthVPlot/2);
        vPlotContex.moveTo(xPosPos, yStart);
        vPlotContex.lineTo(xPosPos, vPlot_resolution_Y*0.93);
        vPlotContex.strokeStyle = "rgb(200,200,200)";
        vPlotContex.stroke();
        vPlotContex.strokeStyle = "rgb(200,200,200)";
        var text = "1";
        vPlotContex.font = labelFontSizeSmall+"px Arial";
        vPlotContex.fillText(text,xPosPos,vPlot_resolution_Y*0.96+labelFontSizeSmall);

        for(var i=0; i<bandSketch2.getBandLength(); i++){

          xPosPos += ((bandSketch2.getRefR2(i)-bandSketch2.getRefR1(i))/widthVArea2)*plotwidth;

          vPlotContex.beginPath();
          vPlotContex.lineWidth=Math.round(lineWidthVPlot/2);
          vPlotContex.moveTo(xPosPos, yStart);
          vPlotContex.lineTo(xPosPos, vPlot_resolution_Y*0.93);
          vPlotContex.strokeStyle = "rgb(200,200,200)";
          vPlotContex.stroke();
          vPlotContex.strokeStyle = "rgb(200,200,200)";
          var text = ""+(i+2);
          vPlotContex.font = labelFontSizeSmall+"px Arial";
          vPlotContex.fillText(text,xPosPos,vPlot_resolution_Y*0.96+labelFontSizeSmall);

        }
      }

      xPosPos = xStart;

      vPlotContex.beginPath();
      vPlotContex.lineWidth=Math.round(lineWidthVPlot/2);
      vPlotContex.moveTo(xPosPos, yStart);
      vPlotContex.lineTo(xPosPos, vPlot_resolution_Y*0.93);
      vPlotContex.strokeStyle = lineColor;
      vPlotContex.stroke();
      vPlotContex.strokeStyle = arrowFontColor;
      var text = "1";
      vPlotContex.font = labelFontSizeSmall+"px Arial";
      vPlotContex.fillText(text,xPosPos,vPlot_resolution_Y*0.93+labelFontSizeSmall);

      for(var i=0; i<bandSketch.getBandLength(); i++){

        xPosPos += ((bandSketch.getRefR2(i)-bandSketch.getRefR1(i))/widthVArea)*plotwidth;
        vPlotContex.beginPath();
        vPlotContex.lineWidth=Math.round(lineWidthVPlot/2);
        vPlotContex.moveTo(xPosPos, yStart);
        vPlotContex.lineTo(xPosPos, vPlot_resolution_Y*0.93);
        vPlotContex.strokeStyle = lineColor;
        vPlotContex.stroke();
        vPlotContex.strokeStyle = arrowFontColor;
        var text = ""+(i+2);
        vPlotContex.font = labelFontSizeSmall+"px Arial";
        vPlotContex.fillText(text,xPosPos,vPlot_resolution_Y*0.93+labelFontSizeSmall);

      }
    }
    else{
        widthVArea = Math.round((xEnd-xStart)/(bandSketch.getBandLength()));
      if(showSideID==3){
        widthVArea2 = Math.round((xEnd-xStart)/(bandSketch2.getBandLength()));

        for(var i=0; i<=bandSketch2.getBandLength(); i++){

          xPosPos = xStart+i*widthVArea2;

          vPlotContex.beginPath();
          vPlotContex.lineWidth=Math.round(lineWidthVPlot/2);
          vPlotContex.moveTo(xPosPos, yStart);
          vPlotContex.lineTo(xPosPos, vPlot_resolution_Y*0.93);
          vPlotContex.strokeStyle = "rgb(200,200,200)";
          vPlotContex.stroke();
          vPlotContex.strokeStyle = "rgb(200,200,200)";
          var text = ""+(i+1);
          vPlotContex.font = labelFontSizeSmall+"px Arial";
          vPlotContex.fillText(text,xPosPos,vPlot_resolution_Y*0.96+labelFontSizeSmall);

        }
      }

      for(var i=0; i<=bandSketch.getBandLength(); i++){

        xPosPos = xStart+i*widthVArea;

        vPlotContex.beginPath();
        vPlotContex.lineWidth=Math.round(lineWidthVPlot/2);
        vPlotContex.moveTo(xPosPos, yStart);
        vPlotContex.lineTo(xPosPos, vPlot_resolution_Y*0.93);
        vPlotContex.strokeStyle = lineColor;
        vPlotContex.stroke();
        vPlotContex.strokeStyle = arrowFontColor;
        var text = ""+(i+1);
        vPlotContex.font = labelFontSizeSmall+"px Arial";
        vPlotContex.fillText(text,xPosPos,vPlot_resolution_Y*0.93+labelFontSizeSmall);

      }
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

      vPlotContex.fillText("Key Position",xEndArrow,yStart+labelFontSize);

      switch(analyzeColorspaceModus){
          case "hsv":
            vPlotContex.fillText("Value",xStart-labelFontSize,yEndArrow);
          break;
          case "lab": case "din99":
            vPlotContex.fillText("Lightness",xStart-labelFontSize,yEndArrow);
          break;
          default:
          console.log("Error at the changeColorspace function");
          return;
      }

}

function drawcolormap_hueSpace(colormapTmp, canvasID, calcBackground,drawInterpolationLine){

  ////////////////////////////////////////////////////////
  // draw Colormap
  if(bandSketch.getBandLength()==0)
  return;

  ///////////////// do extra threat for drawing ///////////////////////

          init_VPlot(colormapTmp,"id_anaylseValue");

          var canvasColorspace = document.getElementById(canvasID);

          canvasColorspace.width = hue_resolution_X;
          canvasColorspace.height = hue_resolution_Y;
          canvasColorspaceWidth = canvasColorspace.width;
          canvasColorspaceHeight = canvasColorspace.height;

          var xStart = canvasColorspaceWidth*0.1;
          var yStart = canvasColorspaceHeight*0.1;
          var xEnd = canvasColorspaceWidth*0.9;
          var yEnd = canvasColorspaceHeight*0.9;

          var xWidth = canvasColorspaceWidth*0.8;
          var yHeight = canvasColorspaceHeight*0.8;

          //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
          var colorspaceContex = canvasColorspace.getContext("2d");
          var canvasColorspaceData = colorspaceContex.getImageData(0, 0, canvasColorspaceWidth, canvasColorspaceHeight);

          if(calcBackground)
              hueInit(canvasID);

          colorspaceContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;

          ////////////////////////////////////////////////////////

          spaceElementsXPos = [];
          spaceElementsYPos = [];
          spaceElementsType = [];
          spaceElementsKey = [];

          ////////////////////////////////////////////////////////

          var canvasVPlot = document.getElementById("id_anaylseValue");
          var vPlotContex = canvasVPlot.getContext("2d");





              /////////////////////////////////////////////////////////////////

              //if(drawInterpolationLine){
                drawInterpolationLineInHSV(colormapTmp, colorspaceContex, vPlotContex, xWidth,yHeight,xStart,yStart, false, intervalSize);
              //}
              //else{
              //  drawInterpolationLineInHSV(colormapTmp, colorspaceContex, vPlotContex, xWidth,yHeight,xStart,yStart,false, interactionIntervalSize);
              //}
               var plotwidth = plotXEnd-plotXStart;
               var twinStarted=false;
               var leftStarted=false;
               var xPos, yPos, xPos2, yPos2, xVPos, xVPos2, tmpColor, tmpColor2;
               xVPos=plotXStart;
               xVPos2=plotXStart;
               for(var i = 0; i<colormapTmp.getNumColors(); i++){

                  var tmpKey = colormapTmp.getKey(i);

                    switch(tmpKey) {
                      case "nil key":

                          //// for mouse events: nil key is not important
                          spaceElementsXPos.push(-1);
                          spaceElementsYPos.push(-1);
                          spaceElementsType.push(false);
                          spaceElementsKey.push("nil key");

                          break;
                      case "twin key":
                          if(twinStarted==true){
                              twinStarted=false;


                              switch(analyzeColorspaceModus){
                                  case "hsv":
                                  tmpColor = colormapTmp.getHSVColor(i);
                                  var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                                  var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                                  xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                                  yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                                  break;
                                  case "lab":
                                  tmpColor = colormapTmp.getLabColor(i);
                                  xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                                  yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                                  break;
                                  case "din99":
                                  tmpColor = colormapTmp.getDIN99Color(i);
                                  xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                                  yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;

                                  break;
                                  default:
                                  console.log("Error at the changeColorspace function");
                                  return;
                              }

                                drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, i, true);


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
                              if(tmpKey2==="nil key" || tmpKey2==="left key" || tmpKey2==="interval left key")
                              drawCircle=false;

                              switch(analyzeColorspaceModus){
                                  case "hsv":
                                    tmpColor = colormapTmp.getHSVColor(i);
                                    var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                                    var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                                    xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                                    yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                                  break;
                                  case "lab":
                                    tmpColor = colormapTmp.getLabColor(i);
                                    xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                                    yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                                  break;
                                  case "din99":
                                  tmpColor = colormapTmp.getDIN99Color(i);
                                  xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                                  yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;
                                  break;
                                  default:
                                  console.log("Error at the changeColorspace function");
                                  return;
                              }

                              // draw circle
                              drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, i, drawCircle);


                              //// for mouse events: twin key first = circle or quad
                              spaceElementsXPos.push(xPos);
                              spaceElementsYPos.push(yPos);
                              spaceElementsKey.push("twin key1");
                              spaceElementsType.push(drawCircle);



                              /////////////////////////////////////////////
                              // Twin Key First: V Overview
                              if(colormapTmp.getKey(i-1)==="left key" || colormapTmp.getKey(i-1)==="nil key"){
                                // -> constant band


                                if(doOriginalValuePlot){
                                  xVPos = plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                                  xVPos2 = plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                                }
                                else{
                                  xVPos2 = xVPos+widthVArea;
                                }
                                  switch(analyzeColorspaceModus){
                                      case "hsv":
                                        yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                                      break;
                                      case "lab":
                                          yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                                      break;
                                      case "din99":
                                          yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                                      break;
                                      default:
                                      console.log("Error at the changeColorspace function");
                                      return;
                                  }

                                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i, false);
                                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos, i, false);


                                if(doOriginalValuePlot==false){
                                  xVPos = xVPos2;
                                }

                              }else {


                                if(doOriginalValuePlot){
                                  xVPos = plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                                  xVPos2 = plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                                }
                                else{
                                  xVPos2 = xVPos+widthVArea;
                                }

                                switch(analyzeColorspaceModus){
                                    case "hsv":
                                    tmpColor2 = colormapTmp.getHSVColor(i-1);
                                    yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                                    yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                                    break;
                                    case "lab":
                                    tmpColor2 = colormapTmp.getLabColor(i-1);
                                    yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                                    yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                                    break;
                                    case "din99":
                                    tmpColor2 = colormapTmp.getDIN99Color(i-1);
                                    yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                                    yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                                    break;
                                    default:
                                    console.log("Error at the changeColorspace function");
                                    return;
                                }


                                drawElement(colormapTmp.getRGBColor(i-1).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i-1, true);
                                drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos2, i, true);

                                if(doOriginalValuePlot==false){
                                  xVPos = xVPos2;
                                }

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
                              if(tmpKey2==="nil key" || tmpKey2==="left key" || tmpKey2==="interval left key")
                                    drawCircle=false;

                                switch(analyzeColorspaceModus){
                                    case "hsv":
                                    tmpColor = colormapTmp.getHSVColor(i);
                                    var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                                    var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                                    xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                                    yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                                    break;
                                    case "lab":
                                    tmpColor = colormapTmp.getLabColor(i);
                                    xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                                    yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                                    break;
                                    case "din99":
                                    tmpColor = colormapTmp.getDIN99Color(i);
                                    xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                                    yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;
                                    break;
                                    default:
                                    console.log("Error at the changeColorspace function");
                                    return;
                                }

                              // draw circle
                              drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, i, drawCircle);

                              //// for mouse events: left key first = circle or quad
                              spaceElementsXPos.push(xPos);
                              spaceElementsYPos.push(yPos);
                              spaceElementsKey.push("left key1");
                              spaceElementsType.push(drawCircle);


                              /////////////////////////////////////////////
                              // LEFT Key First: V Overview
                              if(colormapTmp.getKey(i-1)==="left key" || colormapTmp.getKey(i-1)==="nil key"){
                                  // -> constant band

                                  if(doOriginalValuePlot){
                                    xVPos = plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                                    xVPos2 = plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                                  }
                                  else{
                                    xVPos2 = xVPos+widthVArea;
                                  }

                                  switch(analyzeColorspaceModus){
                                      case "hsv":
                                        yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                                      break;
                                      case "lab":
                                        yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                                      break;
                                      case "din99":
                                        yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                                      break;
                                      default:
                                      console.log("Error at the changeColorspace function");
                                      return;
                                  }

                                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i, false);
                                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos, i, false);

                                  if(doOriginalValuePlot==false){
                                    xVPos = xVPos2;
                                  }

                              }else {

                                if(doOriginalValuePlot){
                                  xVPos = plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                                  xVPos2 = plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                                }
                                else{
                                  xVPos2 = xVPos+widthVArea;
                                }

                                switch(analyzeColorspaceModus){
                                    case "hsv":
                                    tmpColor2 = colormapTmp.getHSVColor(i-1);
                                    tmpColor = colormapTmp.getHSVColor(i);
                                    yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                                    yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                                    break;
                                    case "lab":
                                    tmpColor2 = colormapTmp.getLabColor(i-1);
                                    tmpColor = colormapTmp.getLabColor(i);
                                    yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                                    yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                                    break;
                                    case "din99":
                                    tmpColor2 = colormapTmp.getDIN99Color(i-1);
                                    tmpColor = colormapTmp.getDIN99Color(i);
                                    yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                                    yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                                    break;
                                    default:
                                    console.log("Error at the changeColorspace function");
                                    return;
                                }

                                drawElement(colormapTmp.getRGBColor(i-1).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i-1, true);
                                drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos2, i, true);

                                if(doOriginalValuePlot==false){
                                  xVPos = xVPos2;
                                }

                              }



                              leftStarted=true;
                              break;
                          }

                      default:
                          // dual Key, right key,

                          switch(analyzeColorspaceModus){
                              case "hsv":
                                tmpColor = colormapTmp.getHSVColor(i);
                                var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                                var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                                xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                                yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                              break;
                              case "lab":
                                tmpColor = colormapTmp.getLabColor(i);
                                xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                                yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                              break;
                              case "din99":
                                tmpColor = colormapTmp.getDIN99Color(i);
                                xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                                yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;
                              break;
                              default:
                              console.log("Error at the changeColorspace function");
                              return;
                          }
                          drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, i, true);

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


                            if(doOriginalValuePlot){
                              xVPos = plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                              xVPos2 = plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                            }
                            else{
                              xVPos2 = xVPos+widthVArea;
                            }

                            switch(analyzeColorspaceModus){
                                case "hsv":
                                  tmpColor2 = colormapTmp.getHSVColor(i-1);
                                  yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                                break;
                                case "lab":
                                  tmpColor2 = colormapTmp.getLabColor(i-1);
                                  yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                                break;
                                case "din99":
                                  tmpColor2 = colormapTmp.getDIN99Color(i-1);
                                  yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                                break;
                                default:
                                console.log("Error at the changeColorspace function");
                                return;
                            }

                            drawElement(colormapTmp.getRGBColor(i-1).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i-1, true);


                          }

                          if(doOriginalValuePlot==false){
                            xVPos = xVPos2;
                          }




                  }

              }



}


function parallelDrawPath(canvasID, colormapTmp, isCompareMap){

  if(workerDrawPathIsBusy)
  return;

  workerDrawPathIsBusy=true;

  var canvasColorspace = document.getElementById(canvasID);
  var canvasVPlot = document.getElementById("id_anaylseValue");

  canvasColorspace.width = hue_resolution_X;
  canvasColorspace.height = hue_resolution_Y;

  canvasColorspaceWidth = canvasColorspace.width;
  canvasColorspaceHeight = canvasColorspace.height;

  workerPathContext = canvasColorspace.getContext("2d");
  workerVPathContext = canvasVPlot.getContext("2d");

  workerVPathContext.width = vPlot_resolution_X;
  workerVPathContext.height = vPlot_resolution_Y;

    /////////////////////////////////////////////////////////////////////////////
    ////// Start Worker

    worker_drawPath = new Worker('js/worker/worker_drawHSVIntervalPath.js');
    worker_drawPath.addEventListener('message', eventFunctionDrawPath_HSV_LAB_DIN99, false);

    // future seperate worker init vPLot


    // make an empty object
    var jsonObj = {};

    jsonObj['analyzeColorspaceModus'] = analyzeColorspaceModus;
    jsonObj['xResolution'] = hue_resolution_X;
    jsonObj['yResolution'] = hue_resolution_Y;
    jsonObj['colorValue1'] = [];
    jsonObj['colorValue2'] = [];
    jsonObj['colorValue3'] = [];
    jsonObj['ref'] = [];
    jsonObj['key'] = [];
    jsonObj['xStart'] = canvasColorspaceWidth*0.1;
    jsonObj['yStart'] = canvasColorspaceHeight*0.1;
    jsonObj['xEnd'] = canvasColorspaceWidth*0.9;
    jsonObj['yEnd'] = canvasColorspaceHeight*0.9;

    jsonObj['xWidth'] = canvasColorspaceWidth*0.8;
    jsonObj['yHeight'] = canvasColorspaceHeight*0.8;

    jsonObj['colorspaceCenterX'] =colorspaceCenterX;
    jsonObj['colorspaceCenterY'] =colorspaceCenterY;
    jsonObj['colorspaceRadius'] =colorspaceRadius;
    jsonObj['labSpaceRange'] =labSpaceRange;
    jsonObj['rangeA99Neg'] =rangeA99Neg;
    jsonObj['rangeB99Neg'] =rangeB99Neg;
    jsonObj['rangeA99'] =rangeA99;
    jsonObj['rangeB99'] =rangeB99;
    jsonObj['isCompareMap'] =isCompareMap;
    jsonObj['plotXStart'] = Math.round(vPlot_resolution_X*0.1);
    jsonObj['plotXEnd'] = Math.round(vPlot_resolution_X*0.85);
    jsonObj['plotYStart'] = Math.round(vPlot_resolution_Y*0.9);
    jsonObj['plotYEnd'] = Math.round(vPlot_resolution_Y*0.2);




    var intervalColormap = colormapTmp.calcColorMap(intervalSize, colorspaceModus);


    for(var i = 0; i<intervalColormap.getColormapLength()-1; i++){

     jsonObj.key.push(intervalColormap.getType(i));

     var tmpColor = intervalColormap.getColor(i, analyzeColorspaceModus);

     jsonObj.colorValue1.push(tmpColor.get1Value());
     jsonObj.colorValue2.push(tmpColor.get2Value());
     jsonObj.colorValue3.push(tmpColor.get3Value());

     jsonObj.ref.push(intervalColormap.getRef(i));

    }

    worker_drawPath.postMessage(jsonObj);

}

function parallelDrawBackground(canvasID, colormapTmp){

  var canvasColorspace = document.getElementById(canvasID);


  canvasColorspace.width = hue_resolution_X;
  canvasColorspace.height = hue_resolution_Y;

  canvasColorspaceWidth = canvasColorspace.width;
  canvasColorspaceHeight = canvasColorspace.height;

  workerBackgroundContext = canvasColorspace.getContext("2d");
  workerBackgroundData = workerBackgroundContext.getImageData(0, 0, canvasColorspaceWidth, canvasColorspaceHeight);


  init_VPlot(colormapTmp,"id_anaylseValue");
  hueInit(canvasID);

  workerBackgroundContext.putImageData(colorspaceBackgroundData, 0, 0);

}

function parallelDrawElements(canvasID, colormapTmp, isCompareMap){

  var canvasColorspace = document.getElementById(canvasID);


  canvasColorspace.width = hue_resolution_X;
  canvasColorspace.height = hue_resolution_Y;

  canvasColorspaceWidth = canvasColorspace.width;
  canvasColorspaceHeight = canvasColorspace.height;

  workerElementContext = canvasColorspace.getContext("2d");

  spaceElementsXPos = [];
  spaceElementsYPos = [];
  spaceElementsType = [];
  spaceElementsKey = [];
}



function drawInterpolationLineInHSV(colormapTmp, colorspaceContex, vPlotContex, xWidth,yHeight,xStart,yStart,isCompareMap,intervalSize){


        var xPos, yPos, xPos2, yPos2, xVPos, xVPos2, tmpColor, tmpColor2;
        var plotwidth = plotXEnd-plotXStart;
        var twinStarted=false;
        var leftStarted=false;
        xVPos=plotXStart;
        xVPos2=plotXStart;

        var xStart = canvasColorspaceWidth*0.1;
        var yStart = canvasColorspaceHeight*0.1;
        var xEnd = canvasColorspaceWidth*0.9;
        var yEnd = canvasColorspaceHeight*0.9;

        var intervalColormap = colormapTmp.calcColorMap(intervalSize, colorspaceModus);

        var widthVAreaInterval = plotwidth/(intervalColormap.getRefNum()-1); //getColormapLength()-1);
        var refLength = intervalColormap.getRef(intervalColormap.getColormapLength()-1)-intervalColormap.getRef(0);

        var leftOrTwinStarted = false;

        for(var i = 0; i<intervalColormap.getColormapLength()-1; i++){


             var tmpKey = intervalColormap.getType(i);
             tmpColor = intervalColormap.getColor(i, analyzeColorspaceModus);
             tmpColor2 = intervalColormap.getColor(i+1, analyzeColorspaceModus);


             switch(analyzeColorspaceModus){
                 case "hsv":
                 var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                 var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                 xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                 yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;

                 var tmpDis2 = tmpColor2.getSValue()*colorspaceRadius;
                 var tmpRad2 = (tmpColor2.getHValue()*Math.PI*2)-Math.PI;
                 xPos2 = tmpDis2*Math.cos(tmpRad2)+colorspaceCenterX;
                 yPos2 = tmpDis2*Math.sin(tmpRad2)+colorspaceCenterY;
                 break;
                 case "lab":
                 xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                 yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;

                 xPos2 = ((tmpColor2.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                 yPos2 = ((tmpColor2.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                 break;
                 case "din99":
                 xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                 yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;

                 xPos2 = ((tmpColor2.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                 yPos2 = ((tmpColor2.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;
                 break;
                 default:
                 console.log("Error at the changeColorspace function");
                 return;
             }

             if(tmpKey=="left key" || tmpKey=="interval left key" || tmpKey=="twin key" ||  tmpKey=="interval twin key"){
                 if(leftOrTwinStarted){
                   leftOrTwinStarted=false;
                 }
                 else{
                   leftOrTwinStarted=true;

                   drawLine(colorspaceContex,xPos,yPos,xPos2,yPos2, true, isCompareMap);


                   continue;
                 }
             }



             drawLine(colorspaceContex,xPos,yPos,xPos2,yPos2, false, isCompareMap);



             if(doOriginalValuePlot){
               xVPos = plotXStart+((intervalColormap.getRef(i)-intervalColormap.getRef(0))/refLength)*plotwidth;
               xVPos2 = plotXStart+((intervalColormap.getRef(i+1)-intervalColormap.getRef(0))/refLength)*plotwidth;
             }
             else{
               xVPos2 = xVPos+widthVAreaInterval;
             }

             switch(analyzeColorspaceModus){
                 case "hsv":
                 yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                 yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                 break;
                 case "lab":
                 yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                 yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                 break;
                 case "din99":
                 yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                 yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                 break;
                 default:
                 console.log("Error at the changeColorspace function");
                 return;
             }


             drawLine(vPlotContex,xVPos,yPos,xVPos2,yPos2, false, isCompareMap)

             /*
             vPlotContex.strokeStyle="rgb(1,1,1)";
             vPlotContex.moveTo(xVPos,yPos);
             vPlotContex.lineTo(xVPos2,yPos2);
             vPlotContex.stroke();*/

             if(doOriginalValuePlot==false){
               xVPos = xVPos2;
             }

}


}


function drawcolormap_compare_hueSpace(colormapTmp, colormapTmp2, canvasID, calcBackground,drawInterpolationLine){

  init_VPlot(colormapTmp,"id_compareValue");

  var canvasColorspace = document.getElementById(canvasID);

  canvasColorspace.width = hue_resolution_X;
  canvasColorspace.height = hue_resolution_Y;
  canvasColorspaceWidth = canvasColorspace.width;
  canvasColorspaceHeight = canvasColorspace.height;

  var xStart = canvasColorspaceWidth*0.1;
  var yStart = canvasColorspaceHeight*0.1;
  var xEnd = canvasColorspaceWidth*0.9;
  var yEnd = canvasColorspaceHeight*0.9;

  var xWidth = canvasColorspaceWidth*0.8;
  var yHeight = canvasColorspaceHeight*0.8;

  //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
  var colorspaceContex = canvasColorspace.getContext("2d");
  var canvasColorspaceData = colorspaceContex.getImageData(0, 0, canvasColorspaceWidth, canvasColorspaceHeight);

  if(calcBackground)
      hueInit(canvasID);

  colorspaceContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;

  ////////////////////////////////////////////////////////



  ////////////////////////////////////////////////////////

  var canvasVPlot = document.getElementById("id_compareValue");
  var vPlotContex = canvasVPlot.getContext("2d");


  ////////////////////////////////////////////////////////
  // draw Colormap 2

  if(bandSketch2.getBandLength()>0){

      /////////////////////////////////////////////////////////////////

      //if(drawInterpolationLine){
        drawInterpolationLineInHSV(colormapTmp2, colorspaceContex, vPlotContex, xWidth,yHeight,xStart,yStart, true, intervalSize);
      //}
      //else{
      //  drawInterpolationLineInHSV(colormapTmp2, colorspaceContex, vPlotContex, xWidth,yHeight,xStart,yStart,false, interactionIntervalSize);
      //}
       var plotwidth = plotXEnd-plotXStart;
       var twinStarted=false;
       var leftStarted=false;
       var xPos, yPos, xPos2, yPos2, xVPos, xVPos2, tmpColor, tmpColor2;
       xVPos=plotXStart;
       xVPos2=plotXStart;
         for(var i = 0; i<colormapTmp2.getNumColors(); i++){

          var tmpKey = colormapTmp2.getKey(i);

            switch(tmpKey) {
              case "nil key":

                  break;
              case "twin key":
                  if(twinStarted==true){
                      twinStarted=false;


                      switch(analyzeColorspaceModus){
                          case "hsv":
                          tmpColor = colormapTmp2.getHSVColor(i);
                          var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                          var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                          xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                          yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                          break;
                          case "lab":
                          tmpColor = colormapTmp2.getLabColor(i);
                          xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                          yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                          break;
                          case "din99":
                          tmpColor = colormapTmp2.getDIN99Color(i);
                          xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                          yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;
                          break;
                          default:
                          console.log("Error at the changeColorspace function");
                          return;
                      }

                        drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, -2, true);


                        break;

                  }
                  else{
                      var tmpKey2 = colormapTmp2.getKey(i-1);
                      var drawCircle = true;
                      if(tmpKey2==="nil key" || tmpKey2==="left key" || tmpKey2==="interval left key")
                      drawCircle=false;

                      switch(analyzeColorspaceModus){
                          case "hsv":
                            tmpColor = colormapTmp2.getHSVColor(i);
                            var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                            var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                            xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                            yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                          break;
                          case "lab":
                            tmpColor = colormapTmp2.getLabColor(i);
                            xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                            yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                          break;
                          case "din99":
                          tmpColor = colormapTmp2.getDIN99Color(i);
                          xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                          yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;
                          break;
                          default:
                          console.log("Error at the changeColorspace function");
                          return;
                      }

                      // draw circle
                      drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, -2, drawCircle);

                      /////////////////////////////////////////////
                      // Twin Key First: V Overview
                      if(colormapTmp2.getKey(i-1)==="left key" || colormapTmp2.getKey(i-1)==="nil key"){
                        // -> constant band


                        if(doOriginalValuePlot){
                          xVPos = plotXStart+((colormapTmp2.getPosition(i-1)-colormapTmp2.getPosition(0))/widthVArea)*plotwidth;
                          xVPos2 = plotXStart+((colormapTmp2.getPosition(i)-colormapTmp2.getPosition(0))/widthVArea)*plotwidth;
                        }
                        else{
                          xVPos2 = xVPos+widthVArea;
                        }
                          switch(analyzeColorspaceModus){
                              case "hsv":
                                yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                              break;
                              case "lab":
                                  yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                              break;
                              case "din99":
                                  yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                              break;
                              default:
                              console.log("Error at the changeColorspace function");
                              return;
                          }

                          drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, -2, false);
                          drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos, -2, false);


                        if(doOriginalValuePlot==false){
                          xVPos = xVPos2;
                        }

                      }else {


                        if(doOriginalValuePlot){
                          xVPos = plotXStart+((colormapTmp2.getPosition(i-1)-colormapTmp2.getPosition(0))/widthVArea)*plotwidth;
                          xVPos2 = plotXStart+((colormapTmp2.getPosition(i)-colormapTmp2.getPosition(0))/widthVArea)*plotwidth;
                        }
                        else{
                          xVPos2 = xVPos+widthVArea;
                        }

                        switch(analyzeColorspaceModus){
                            case "hsv":
                            tmpColor2 = colormapTmp2.getHSVColor(i-1);
                            yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                            yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                            break;
                            case "lab":
                            tmpColor2 = colormapTmp2.getLabColor(i-1);
                            yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                            yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                            break;
                            case "din99":
                            tmpColor2 = colormapTmp2.getDIN99Color(i-1);
                            yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                            yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                            break;
                            default:
                            console.log("Error at the changeColorspace function");
                            return;
                        }


                        drawElement(colormapTmp2.getRGBColor(i-1).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, -2, true);
                        drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos2, -2, true);

                        if(doOriginalValuePlot==false){
                          xVPos = xVPos2;
                        }

                      }


                      twinStarted=true;


                      break;
                  }
              case "left key":
                  if(leftStarted==true){


                      leftStarted=false;
                      break;

                  }
                  else{
                      var tmpKey2 = colormapTmp2.getKey(i-1);
                      var drawCircle = true;
                      if(tmpKey2==="nil key" || tmpKey2==="left key" || tmpKey2==="interval left key")
                            drawCircle=false;

                        switch(analyzeColorspaceModus){
                            case "hsv":
                            tmpColor = colormapTmp2.getHSVColor(i);
                            var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                            var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                            xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                            yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                            break;
                            case "lab":
                            tmpColor = colormapTmp2.getLabColor(i);
                            xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                            yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                            break;
                            case "din99":
                            tmpColor = colormapTmp2.getDIN99Color(i);
                            xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                            yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;
                            break;
                            default:
                            console.log("Error at the changeColorspace function");
                            return;
                        }

                      // draw circle
                      drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, -2, drawCircle);


                      /////////////////////////////////////////////
                      // LEFT Key First: V Overview
                      if(colormapTmp2.getKey(i-1)==="left key" || colormapTmp2.getKey(i-1)==="nil key"){
                          // -> constant band

                          if(doOriginalValuePlot){
                            xVPos = plotXStart+((colormapTmp2.getPosition(i-1)-colormapTmp2.getPosition(0))/widthVArea)*plotwidth;
                            xVPos2 = plotXStart+((colormapTmp2.getPosition(i)-colormapTmp2.getPosition(0))/widthVArea)*plotwidth;
                          }
                          else{
                            xVPos2 = xVPos+widthVArea;
                          }

                          switch(analyzeColorspaceModus){
                              case "hsv":
                                yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                              break;
                              case "lab":
                                yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                              break;
                              case "din99":
                                yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                              break;
                              default:
                              console.log("Error at the changeColorspace function");
                              return;
                          }

                          drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, -2, false);
                          drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos, -2, false);

                          if(doOriginalValuePlot==false){
                            xVPos = xVPos2;
                          }

                      }else {

                        if(doOriginalValuePlot){
                          xVPos = plotXStart+((colormapTmp2.getPosition(i-1)-colormapTmp2.getPosition(0))/widthVArea)*plotwidth;
                          xVPos2 = plotXStart+((colormapTmp2.getPosition(i)-colormapTmp2.getPosition(0))/widthVArea)*plotwidth;
                        }
                        else{
                          xVPos2 = xVPos+widthVArea;
                        }

                        switch(analyzeColorspaceModus){
                            case "hsv":
                            tmpColor2 = colormapTmp2.getHSVColor(i-1);
                            tmpColor = colormapTmp2.getHSVColor(i);
                            yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                            yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                            break;
                            case "lab":
                            tmpColor2 = colormapTmp2.getLabColor(i-1);
                            tmpColor = colormapTmp2.getLabColor(i);
                            yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                            yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                            break;
                            case "din99":
                            tmpColor2 = colormapTmp2.getDIN99Color(i-1);
                            tmpColor = colormapTmp2.getDIN99Color(i);
                            yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                            yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                            break;
                            default:
                            console.log("Error at the changeColorspace function");
                            return;
                        }

                        drawElement(colormapTmp2.getRGBColor(i-1).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, -2, true);
                        drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos2, -2, true);

                        if(doOriginalValuePlot==false){
                          xVPos = xVPos2;
                        }

                      }



                      leftStarted=true;
                      break;
                  }

              default:
                  // dual Key, right key,

                  switch(analyzeColorspaceModus){
                      case "hsv":
                        tmpColor = colormapTmp2.getHSVColor(i);
                        var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                        var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                        xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                        yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                      break;
                      case "lab":
                        tmpColor = colormapTmp2.getLabColor(i);
                        xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                        yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                      break;
                      case "din99":
                        tmpColor = colormapTmp2.getDIN99Color(i);
                        xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                        yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;
                      break;
                      default:
                      console.log("Error at the changeColorspace function");
                      return;
                  }
                  drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, -2, true);

                  // V Overview
                  /////////////////////////////////////////////
                  // Default: V Overview

                  if(tmpKey=='dual key'){
                    tmpColor2 = colormapTmp2.getHSVColor(i-1);


                    if(doOriginalValuePlot){
                      xVPos = plotXStart+((colormapTmp2.getPosition(i-1)-colormapTmp2.getPosition(0))/widthVArea)*plotwidth;
                      xVPos2 = plotXStart+((colormapTmp2.getPosition(i)-colormapTmp2.getPosition(0))/widthVArea)*plotwidth;
                    }
                    else{
                      xVPos2 = xVPos+widthVArea;
                    }

                    switch(analyzeColorspaceModus){
                        case "hsv":
                          tmpColor2 = colormapTmp2.getHSVColor(i-1);
                          yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                        break;
                        case "lab":
                          tmpColor2 = colormapTmp2.getLabColor(i-1);
                          yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                        break;
                        case "din99":
                          tmpColor2 = colormapTmp2.getDIN99Color(i-1);
                          yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                        break;
                        default:
                        console.log("Error at the changeColorspace function");
                        return;
                    }

                    drawElement(colormapTmp2.getRGBColor(i-1).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, -2, true);


                  }

                  if(doOriginalValuePlot==false){
                    xVPos = xVPos2;
                  }




          }

      }

  }

  ////////////////////////////////////////////////////////
  // draw Colormap 1

  spaceElementsXPos = [];
  spaceElementsYPos = [];
  spaceElementsType = [];
  spaceElementsKey = [];

  if(bandSketch.getBandLength()>0){

      /////////////////////////////////////////////////////////////////

      //if(drawInterpolationLine){
        drawInterpolationLineInHSV(colormapTmp, colorspaceContex, vPlotContex, xWidth,yHeight,xStart,yStart, false, intervalSize);
      //}
      //else{
      //  drawInterpolationLineInHSV(colormapTmp, colorspaceContex, vPlotContex, xWidth,yHeight,xStart,yStart,false, interactionIntervalSize);
      //}
       var plotwidth = plotXEnd-plotXStart;
       var twinStarted=false;
       var leftStarted=false;
       var xPos, yPos, xPos2, yPos2, xVPos, xVPos2, tmpColor, tmpColor2;
       xVPos=plotXStart;
       xVPos2=plotXStart;
         for(var i = 0; i<colormapTmp.getNumColors(); i++){

          var tmpKey = colormapTmp.getKey(i);

            switch(tmpKey) {
              case "nil key":

                  //// for mouse events: nil key is not important
                  spaceElementsXPos.push(-1);
                  spaceElementsYPos.push(-1);
                  spaceElementsType.push(false);
                  spaceElementsKey.push("nil key");

                  break;
              case "twin key":
                  if(twinStarted==true){
                      twinStarted=false;


                      switch(analyzeColorspaceModus){
                          case "hsv":
                          tmpColor = colormapTmp.getHSVColor(i);
                          var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                          var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                          xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                          yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                          break;
                          case "lab":
                          tmpColor = colormapTmp.getLabColor(i);
                          xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                          yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                          break;
                          case "din99":
                          tmpColor = colormapTmp.getDIN99Color(i);
                          xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                          yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;
                          break;
                          default:
                          console.log("Error at the changeColorspace function");
                          return;
                      }

                        drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, i, true);


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
                      if(tmpKey2==="nil key" || tmpKey2==="left key" || tmpKey2==="interval left key")
                      drawCircle=false;

                      switch(analyzeColorspaceModus){
                          case "hsv":
                            tmpColor = colormapTmp.getHSVColor(i);
                            var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                            var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                            xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                            yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                          break;
                          case "lab":
                            tmpColor = colormapTmp.getLabColor(i);
                            xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                            yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                          break;
                          case "din99":
                          tmpColor = colormapTmp.getDIN99Color(i);
                          xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                          yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;
                          break;
                          default:
                          console.log("Error at the changeColorspace function");
                          return;
                      }

                      // draw circle
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, i, drawCircle);


                      //// for mouse events: twin key first = circle or quad
                      spaceElementsXPos.push(xPos);
                      spaceElementsYPos.push(yPos);
                      spaceElementsKey.push("twin key1");
                      spaceElementsType.push(drawCircle);



                      /////////////////////////////////////////////
                      // Twin Key First: V Overview
                      if(colormapTmp.getKey(i-1)==="left key" || colormapTmp.getKey(i-1)==="nil key"){
                        // -> constant band


                        if(doOriginalValuePlot){
                          xVPos = plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                          xVPos2 = plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                        }
                        else{
                          xVPos2 = xVPos+widthVArea;
                        }
                          switch(analyzeColorspaceModus){
                              case "hsv":
                                yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                              break;
                              case "lab":
                                  yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                              break;
                              case "din99":
                                  yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                              break;
                              default:
                              console.log("Error at the changeColorspace function");
                              return;
                          }

                          drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i, false);
                          drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos, i, false);


                        if(doOriginalValuePlot==false){
                          xVPos = xVPos2;
                        }

                      }else {


                        if(doOriginalValuePlot){
                          xVPos = plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                          xVPos2 = plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                        }
                        else{
                          xVPos2 = xVPos+widthVArea;
                        }

                        switch(analyzeColorspaceModus){
                            case "hsv":
                            tmpColor2 = colormapTmp.getHSVColor(i-1);
                            yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                            yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                            break;
                            case "lab":
                            tmpColor2 = colormapTmp.getLabColor(i-1);
                            yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                            yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                            break;
                            case "din99":
                            tmpColor2 = colormapTmp.getDIN99Color(i-1);
                            yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                            yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                            break;
                            default:
                            console.log("Error at the changeColorspace function");
                            return;
                        }


                        drawElement(colormapTmp.getRGBColor(i-1).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i-1, true);
                        drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos2, i, true);

                        if(doOriginalValuePlot==false){
                          xVPos = xVPos2;
                        }

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
                      if(tmpKey2==="nil key" || tmpKey2==="left key" || tmpKey2==="interval left key")
                            drawCircle=false;

                        switch(analyzeColorspaceModus){
                            case "hsv":
                            tmpColor = colormapTmp.getHSVColor(i);
                            var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                            var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                            xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                            yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                            break;
                            case "lab":
                            tmpColor = colormapTmp.getLabColor(i);
                            xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                            yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                            break;
                            case "din99":
                            tmpColor = colormapTmp.getDIN99Color(i);
                            xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                            yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;
                            break;
                            default:
                            console.log("Error at the changeColorspace function");
                            return;
                        }

                      // draw circle
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, i, drawCircle);

                      //// for mouse events: left key first = circle or quad
                      spaceElementsXPos.push(xPos);
                      spaceElementsYPos.push(yPos);
                      spaceElementsKey.push("left key1");
                      spaceElementsType.push(drawCircle);


                      /////////////////////////////////////////////
                      // LEFT Key First: V Overview
                      if(colormapTmp.getKey(i-1)==="left key" || colormapTmp.getKey(i-1)==="nil key"){
                          // -> constant band

                          if(doOriginalValuePlot){
                            xVPos = plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                            xVPos2 = plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                          }
                          else{
                            xVPos2 = xVPos+widthVArea;
                          }

                          switch(analyzeColorspaceModus){
                              case "hsv":
                                yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                              break;
                              case "lab":
                                yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                              break;
                              case "din99":
                                yPos = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                              break;
                              default:
                              console.log("Error at the changeColorspace function");
                              return;
                          }

                          drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i, false);
                          drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos, i, false);

                          if(doOriginalValuePlot==false){
                            xVPos = xVPos2;
                          }

                      }else {

                        if(doOriginalValuePlot){
                          xVPos = plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                          xVPos2 = plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                        }
                        else{
                          xVPos2 = xVPos+widthVArea;
                        }

                        switch(analyzeColorspaceModus){
                            case "hsv":
                            tmpColor2 = colormapTmp.getHSVColor(i-1);
                            tmpColor = colormapTmp.getHSVColor(i);
                            yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                            yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getVValue()));
                            break;
                            case "lab":
                            tmpColor2 = colormapTmp.getLabColor(i-1);
                            tmpColor = colormapTmp.getLabColor(i);
                            yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                            yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                            break;
                            case "din99":
                            tmpColor2 = colormapTmp.getDIN99Color(i-1);
                            tmpColor = colormapTmp.getDIN99Color(i);
                            yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                            yPos2 = Math.round(plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                            break;
                            default:
                            console.log("Error at the changeColorspace function");
                            return;
                        }

                        drawElement(colormapTmp.getRGBColor(i-1).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i-1, true);
                        drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos2, i, true);

                        if(doOriginalValuePlot==false){
                          xVPos = xVPos2;
                        }

                      }



                      leftStarted=true;
                      break;
                  }

              default:
                  // dual Key, right key,

                  switch(analyzeColorspaceModus){
                      case "hsv":
                        tmpColor = colormapTmp.getHSVColor(i);
                        var tmpDis = tmpColor.getSValue()*colorspaceRadius;
                        var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                        xPos = tmpDis*Math.cos(tmpRad)+colorspaceCenterX;
                        yPos = tmpDis*Math.sin(tmpRad)+colorspaceCenterY;
                      break;
                      case "lab":
                        tmpColor = colormapTmp.getLabColor(i);
                        xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                        yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                      break;
                      case "din99":
                        tmpColor = colormapTmp.getDIN99Color(i);
                        xPos = ((tmpColor.getA99Value()-rangeA99Neg)/rangeA99*(xEnd-xStart))+xStart;
                        yPos = ((tmpColor.getB99Value()-rangeB99Neg)/rangeB99*(yEnd-yStart))+yStart;
                      break;
                      default:
                      console.log("Error at the changeColorspace function");
                      return;
                  }
                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, i, true);

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


                    if(doOriginalValuePlot){
                      xVPos = plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                      xVPos2 = plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                    }
                    else{
                      xVPos2 = xVPos+widthVArea;
                    }

                    switch(analyzeColorspaceModus){
                        case "hsv":
                          tmpColor2 = colormapTmp.getHSVColor(i-1);
                          yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getVValue()));
                        break;
                        case "lab":
                          tmpColor2 = colormapTmp.getLabColor(i-1);
                          yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                        break;
                        case "din99":
                          tmpColor2 = colormapTmp.getDIN99Color(i-1);
                          yPos = Math.round(plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                        break;
                        default:
                        console.log("Error at the changeColorspace function");
                        return;
                    }

                    drawElement(colormapTmp.getRGBColor(i-1).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i-1, true);


                  }

                  if(doOriginalValuePlot==false){
                    xVPos = xVPos2;
                  }




          }

      }

  }


}
