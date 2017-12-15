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
          colorspaceBackgroundData = colorspaceContex.getImageData(0, 0, canvasColorspaceWidth, canvasColorspaceHeight);

          colorspaceCenterX = Math.round(canvasColorspaceWidth/2);
          colorspaceCenterY = Math.round(canvasColorspaceHeight/2);
          colorspaceRadius = Math.round((canvasColorspaceWidth/2)*radiusratio);

          var errorRGBColor = new classColor_RGB(0.5,0.5,0.5);

          switch(colorspaceModus){
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

                          if(mouseGrappedSpaceObjectID==-1)
                            vVal= parseFloat(document.getElementById('id_setValueRange').value)/100;
                          else
                            vVal = analysisColormap.getHSVColor(mouseGrappedSpaceObjectID).getVValue();
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
                          var lVal = parseFloat(document.getElementById('id_setValueRange').value);
                          var aVal = ((x-colorspaceCenterX)/(xWidth/2))*labSpaceRange;
                          var bVal = ((y-colorspaceCenterY)/(yHeight/2))*labSpaceRange;

                          var colorLAB = new classColor_LAB(lVal,aVal,bVal);
                          colorRGB = colorLAB.calcRGBColor();
                        }
                        else{
                          var lVal = analysisColormap.getLabColor(mouseGrappedSpaceObjectID).getLValue();
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

              colorspaceCenterX = Math.round(canvasColorspaceWidth/2);
              colorspaceCenterY = Math.round(canvasColorspaceHeight/2);


              // draw colorspace
              for(var x=0; x<canvasColorspaceWidth;x++){

                for(var y=0; y<canvasColorspaceHeight;y++){

                   if(x>=xStart && x<=xEnd && y>=yStart && y<=yEnd){
                      // calc hsv color
                      var colorRGB;
                      if(mouseGrappedSpaceObjectID==-1){
                        var l99Val = parseFloat(document.getElementById('id_setValueRange').value);
                        var a99Val = ((x-colorspaceCenterX)/(xWidth/2))*din99SpaceRange;
                        var b99Val = ((y-colorspaceCenterY)/(yHeight/2))*din99SpaceRange;

                        var colorDIN99 = new classColorDIN99(l99Val,a99Val,b99Val);
                        colorRGB = colorDIN99.calcRGBColor();
                      }
                      else{
                        var l99Val = analysisColormap.getDIN99Color(mouseGrappedSpaceObjectID).getL99Value();
                        var a99Val = ((x-colorspaceCenterX)/(xWidth/2))*din99SpaceRange;
                        var b99Val = ((y-colorspaceCenterY)/(yHeight/2))*din99SpaceRange;

                        var colorDIN99 = new classColorDIN99(l99Val,a99Val,b99Val);

                        if(document.getElementById("id_checkboxRGB").checked==true){
                          colorRGB = colorDIN99.calcRGBColorCorrect(errorRGBColor);
                        }
                        else{
                          colorRGB = colorDIN99.calcRGBColor();
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
    widthVArea = Math.round((xEnd-xStart)/(bandSketch.getBandLenght()));

    for(var i=0; i<=bandSketch.getBandLenght(); i++){

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

      vPlotContex.fillText("Keys",xEndArrow,yStart+labelFontSize);

      switch(colorspaceModus){
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

function drawcolormap_hueSpace(colormapTmp, canvasID, calcBackground){

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
  var vPlotKeyPos = 0;


  ////////////////////////////////////////////////////////
  // draw Colormap
  if(bandSketch.getBandLenght()>0){

      /////////////////////////////////////////////////////////////////

       var twinStarted=false;
       var leftStarted=false;
       var xPos, yPos, xPos2, yPos2, tmpColor, tmpColor2;
         for(var i = 0; i<colormapTmp.getNumColors(); i++){

          var tmpKey = colormapTmp.getKey(i);

            switch(tmpKey) {
              case "nil key":

                  if(colormapTmp.getNumColors()>2){

                      switch(colorspaceModus){
                          case "hsv":
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
                          break;
                          case "lab":
                          tmpColor = colormapTmp.getLabColor(i);
                          xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                          yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;

                          tmpColor2 = colormapTmp.getLabColor(i+1);
                          xPos2 = ((tmpColor2.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                          yPos2 = ((tmpColor2.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                          break;
                          case "din99":
                          tmpColor = colormapTmp.getDIN99Color(i);
                          xPos = ((tmpColor.getA99Value()/din99SpaceRange)*xWidth/2)+colorspaceCenterX;
                          yPos = ((tmpColor.getB99Value()/din99SpaceRange)*yHeight/2)+colorspaceCenterY;

                          tmpColor2 = colormapTmp.getDIN99Color(i+1);
                          xPos2 = ((tmpColor2.getA99Value()/din99SpaceRange)*xWidth/2)+colorspaceCenterX;
                          yPos2 = ((tmpColor2.getB99Value()/din99SpaceRange)*yHeight/2)+colorspaceCenterY;
                          break;
                          default:
                          console.log("Error at the changeColorspace function");
                          return;
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


                      switch(colorspaceModus){
                          case "hsv":
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
                          break;
                          case "lab":
                          tmpColor = colormapTmp.getLabColor(i);
                          xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                          yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;

                          tmpColor2 = colormapTmp.getLabColor(i+1);
                          xPos2 = ((tmpColor2.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                          yPos2 = ((tmpColor2.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                          break;
                          case "din99":
                          tmpColor = colormapTmp.getDIN99Color(i);
                          xPos = ((tmpColor.getA99Value()/din99SpaceRange)*xWidth/2)+colorspaceCenterX;
                          yPos = ((tmpColor.getB99Value()/din99SpaceRange)*yHeight/2)+colorspaceCenterY;

                          tmpColor2 = colormapTmp.getDIN99Color(i+1);
                          xPos2 = ((tmpColor2.getA99Value()/din99SpaceRange)*xWidth/2)+colorspaceCenterX;
                          yPos2 = ((tmpColor2.getB99Value()/din99SpaceRange)*yHeight/2)+colorspaceCenterY;
                          break;
                          default:
                          console.log("Error at the changeColorspace function");
                          return;
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

                      switch(colorspaceModus){
                          case "hsv":
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
                          break;
                          case "lab":
                            tmpColor = colormapTmp.getLabColor(i);
                            xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                            yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;

                            tmpColor2 = colormapTmp.getLabColor(i+1);
                            xPos2 = ((tmpColor2.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                            yPos2 = ((tmpColor2.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                          break;
                          case "din99":
                            tmpColor = colormapTmp.getDIN99Color(i);
                            xPos = ((tmpColor.getA99Value()/din99SpaceRange)*xWidth/2)+colorspaceCenterX;
                            yPos = ((tmpColor.getB99Value()/din99SpaceRange)*yHeight/2)+colorspaceCenterY;

                            tmpColor2 = colormapTmp.getDIN99Color(i+1);
                            xPos2 = ((tmpColor2.getA99Value()/din99SpaceRange)*xWidth/2)+colorspaceCenterX;
                            yPos2 = ((tmpColor2.getB99Value()/din99SpaceRange)*yHeight/2)+colorspaceCenterY;
                          break;
                          default:
                          console.log("Error at the changeColorspace function");
                          return;
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


                          switch(colorspaceModus){
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

                        vPlotContex.moveTo(xPos,yPos);
                        vPlotContex.lineTo(xPos2,yPos);
                        vPlotContex.stroke();


                        tmpRecSize = circleRad*2;
                        vPlotContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                        x1 = xPos-circleRad;
                        y1 = yPos-circleRad;

                         if(i==mouseAboveSpaceObjectID){
                            tmpRecSize = bigcircleRad*2;
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

                        switch(colorspaceModus){
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
                            drawCircle=false;

                        switch(colorspaceModus){
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
                            xPos = ((tmpColor.getA99Value()/din99SpaceRange)*xWidth/2)+colorspaceCenterX;
                            yPos = ((tmpColor.getB99Value()/din99SpaceRange)*yHeight/2)+colorspaceCenterY;
                            break;
                            default:
                            console.log("Error at the changeColorspace function");
                            return;
                        }


                      if(i!=colormapTmp.getNumColors()-1){

                            switch(colorspaceModus){
                                case "hsv":
                                tmpColor2 = colormapTmp.getHSVColor(i+1);
                                var tmpDis2 = tmpColor2.getSValue()*colorspaceRadius;
                                var tmpRad2 = (tmpColor2.getHValue()*Math.PI*2)-Math.PI;
                                xPos2 = tmpDis2*Math.cos(tmpRad2)+colorspaceCenterX;
                                yPos2 = tmpDis2*Math.sin(tmpRad2)+colorspaceCenterY;
                                break;
                                case "lab":
                                tmpColor2 = colormapTmp.getLabColor(i+1);
                                xPos2 = ((tmpColor2.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                                yPos2 = ((tmpColor2.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                                break;
                                case "din99":
                                tmpColor2 = colormapTmp.getDIN99Color(i+1);
                                xPos2 = ((tmpColor2.getA99Value()/din99SpaceRange)*xWidth/2)+colorspaceCenterX;
                                yPos2 = ((tmpColor2.getB99Value()/din99SpaceRange)*yHeight/2)+colorspaceCenterY;
                                break;
                                default:
                                console.log("Error at the changeColorspace function");
                                return;
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

                          switch(colorspaceModus){
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

                          vPlotContex.moveTo(xPos,yPos);
                          vPlotContex.lineTo(xPos2,yPos);
                          vPlotContex.stroke();


                          tmpRecSize = circleRad*2;
                          vPlotContex.fillStyle = colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal);
                          x1 = xPos-circleRad;
                          y1 = yPos-circleRad;

                           if(i==mouseAboveSpaceObjectID){
                              tmpRecSize = bigcircleRad*2;
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

                        switch(colorspaceModus){
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

                  switch(colorspaceModus){
                      case "hsv":
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
                      break;
                      case "lab":
                        tmpColor = colormapTmp.getLabColor(i);

                        xPos = ((tmpColor.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                        yPos = ((tmpColor.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;

                        tmpColor2 = colormapTmp.getLabColor(i+1);
                        xPos2 = ((tmpColor2.getAValue()/labSpaceRange)*xWidth/2)+colorspaceCenterX;
                        yPos2 = ((tmpColor2.getBValue()/labSpaceRange)*yHeight/2)+colorspaceCenterY;
                      break;
                      case "din99":
                        tmpColor = colormapTmp.getDIN99Color(i);

                        xPos = ((tmpColor.getA99Value()/din99SpaceRange)*xWidth/2)+colorspaceCenterX;
                        yPos = ((tmpColor.getB99Value()/din99SpaceRange)*yHeight/2)+colorspaceCenterY;

                        tmpColor2 = colormapTmp.getDIN99Color(i+1);
                        xPos2 = ((tmpColor2.getA99Value()/din99SpaceRange)*xWidth/2)+colorspaceCenterX;
                        yPos2 = ((tmpColor2.getB99Value()/din99SpaceRange)*yHeight/2)+colorspaceCenterY;
                      break;
                      default:
                      console.log("Error at the changeColorspace function");
                      return;
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

                    switch(colorspaceModus){
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

function rgbInit(canvasIDRG,canvasIDRB,canvasIDBG, calcBackground){

  var canvasColorspaceRG = document.getElementById(canvasIDRG);
  canvasColorspaceRG.width = hue_resolution_X;
  canvasColorspaceRG.height = hue_resolution_Y;
  var colorspaceContexRG = canvasColorspaceRG.getContext("2d");

  var canvasColorspaceRB = document.getElementById(canvasIDRB);
  canvasColorspaceRB.width = hue_resolution_X;
  canvasColorspaceRB.height = hue_resolution_Y;
  var colorspaceContexRB = canvasColorspaceRB.getContext("2d");

  var canvasColorspaceBG = document.getElementById(canvasIDBG);
  canvasColorspaceBG.width = hue_resolution_X;
  canvasColorspaceBG.height = hue_resolution_Y;
  var colorspaceContexBG = canvasColorspaceBG.getContext("2d");

  if(calcBackground){

    colorspaceBackgroundDataRG = colorspaceContexRG.getImageData(0, 0, canvasColorspaceRG.width, canvasColorspaceRG.height);
    colorspaceBackgroundDataRB = colorspaceContexRB.getImageData(0, 0, canvasColorspaceRB.width, canvasColorspaceRB.height);
    colorspaceBackgroundDataBG = colorspaceContexBG.getImageData(0, 0, canvasColorspaceBG.width, canvasColorspaceBG.height);

    var xStart = hue_resolution_X*0.1;
    var yStart = hue_resolution_Y*0.9;
    var xEnd = hue_resolution_X*0.8;
    var yEnd = hue_resolution_Y*0.2;
    var xWidth = xEnd-xStart;
    var yHeight =yStart-yEnd;

    //RG
    for(var x=0; x<hue_resolution_X;x++){

      for(var y=0; y<hue_resolution_Y;y++){

         if(x>=xStart && x<=xEnd && y<=yStart && y>=yEnd){
            // calc hsv color
            var colorRGB;

            var r = (x-xStart)/xWidth;
            var g = (yStart-y)/yHeight;

            if(mouseGrappedSpaceObjectID==-1){
              colorRGB = new classColor_RGB(r,g,0);
            }
            else{
              var b = analysisColormap.getRGBColor(mouseGrappedSpaceObjectID).getBValue();
              colorRGB = new classColor_RGB(r,g,b);
            }

            var index = (x + y * hue_resolution_X) * 4;

            colorspaceBackgroundDataRG.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
            colorspaceBackgroundDataRG.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
            colorspaceBackgroundDataRG.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
            colorspaceBackgroundDataRG.data[index + 3] = 255; //a
          }
      }

    }

    //RB

    for(var x=0; x<hue_resolution_X;x++){

      for(var y=0; y<hue_resolution_Y;y++){

         if(x>=xStart && x<=xEnd && y<=yStart && y>=yEnd){
            // calc hsv color
            var colorRGB;

            var r = (x-xStart)/xWidth;
            var b = (yStart-y)/yHeight;

            if(mouseGrappedSpaceObjectID==-1){
              colorRGB = new classColor_RGB(r,0,b);
            }
            else{
              var b = analysisColormap.getRGBColor(mouseGrappedSpaceObjectID).getGValue();
              colorRGB = new classColor_RGB(r,g,b);
            }

            var index = (x + y * hue_resolution_X) * 4;

            colorspaceBackgroundDataRB.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
            colorspaceBackgroundDataRB.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
            colorspaceBackgroundDataRB.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
            colorspaceBackgroundDataRB.data[index + 3] = 255; //a
          }
      }

    }

    //BG

    for(var x=0; x<hue_resolution_X;x++){

      for(var y=0; y<hue_resolution_Y;y++){

         if(x>=xStart && x<=xEnd && y<=yStart && y>=yEnd){
            // calc hsv color
            var colorRGB;

            var b = (x-xStart)/xWidth;
            var g = (yStart-y)/yHeight;

            if(mouseGrappedSpaceObjectID==-1){
              colorRGB = new classColor_RGB(0,g,b);
            }
            else{
              var r = analysisColormap.getRGBColor(mouseGrappedSpaceObjectID).getRValue();
              colorRGB = new classColor_RGB(r,g,b);
            }

            var index = (x + y * hue_resolution_X) * 4;

            colorspaceBackgroundDataBG.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
            colorspaceBackgroundDataBG.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
            colorspaceBackgroundDataBG.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
            colorspaceBackgroundDataBG.data[index + 3] = 255; //a
          }
      }

    }

  }

    colorspaceContexRG.putImageData(colorspaceBackgroundDataRG, 0, 0); // update ColorspaceCanvas;
    colorspaceContexRB.putImageData(colorspaceBackgroundDataRB, 0, 0); // update ColorspaceCanvas;
    colorspaceContexBG.putImageData(colorspaceBackgroundDataBG, 0, 0); // update ColorspaceCanvas;

    rgbPlot(colorspaceContexRG, canvasColorspaceRG.width, canvasColorspaceRG.height, "R", "G");
    rgbPlot(colorspaceContexRB, canvasColorspaceRB.width, canvasColorspaceRB.height, "R", "B");
    rgbPlot(colorspaceContexBG, canvasColorspaceBG.width, canvasColorspaceBG.height, "B", "G");
}

function rgbPlot(context, canvasWidth, canvasHidth, xlabel , ylabel){

    var yStart =  Math.round(canvasHidth*0.9);
    var yEnd =  Math.round(canvasHidth*0.2);
    var yEndLine =  Math.round(canvasHidth*0.15);
    var yEndArrow =  Math.round(canvasHidth*0.1);
    var arrowHeight =  Math.round((yEndLine-yEndArrow)*0.75);
    var labelFontSize = arrowHeight*0.75;
    var labelFontSizeSmall = arrowHeight*0.5;
    var xStart =  Math.round(canvasWidth*0.1);
    var xEnd =  Math.round(canvasWidth*0.8);
    var xEndLine =  Math.round(canvasWidth*0.85);
    var xEndArrow =  Math.round(canvasWidth*0.9);


    var lineColor = 'rgb(200,200,200)';
    var arrowFontColor = 'rgb(90,90,90)';

    plotXStart =xStart;
    heigthVArea =yStart-yEnd;
    plotYStart =yStart;
    plotYEnd =yEnd;

    context.fillStyle = arrowFontColor;


    var xPosPos;
    var yPos = canvasHidth*0.93;
    context.font = labelFontSizeSmall+"px Arial";

    var steps = 5;
    for(var i=0; i<=steps; i++){

      xPosPos = xStart+(xEnd-xStart) * (i /steps);
      context.beginPath();
      context.lineWidth=1;
      context.moveTo(xPosPos, yStart);
      context.lineTo(xPosPos, yPos);
      context.strokeStyle = lineColor;
      context.stroke();
      context.strokeStyle = arrowFontColor;
      var text = ""+ i* (255/steps);
      context.fillText(text,xPosPos,yPos+labelFontSizeSmall);
    }

    xPosPos = Math.round(canvasWidth*0.07);
    yPos = yStart;
    context.font = labelFontSizeSmall+"px Arial";

    for(var i=0; i<=steps; i++){

      yPos = yStart-(yStart-yEnd) * (i /steps);
      context.beginPath();
      context.lineWidth=1;
      context.moveTo(xPosPos, yPos);
      context.lineTo(xStart,yPos);
      context.strokeStyle = lineColor;
      context.stroke();
      context.strokeStyle = arrowFontColor;
      var text = ""+ i* (255/steps);
      context.fillText(text,xPosPos*0.75,yPos);
    }


      ////////////////////////////////////////////////////////////
      /////////////ARROWS////////////////////
      ////////////////////////////////////////////////////////////
      context.strokeStyle = arrowFontColor;
      context.beginPath();
      context.lineWidth=lineWidthVPlot;
      context.moveTo(xStart, yStart);
      context.lineTo(xEndLine, yStart);
      context.stroke();

      // the triangle
      context.beginPath();
      context.moveTo(xEndLine, yStart-arrowWidth);
      context.lineTo(xEndArrow, yStart);
      context.lineTo(xEndLine, yStart+arrowWidth);
      context.closePath();

      // the fill color
      context.fillStyle = arrowFontColor;
      context.fill();

      context.beginPath();
      context.lineWidth=lineWidthVPlot;
      context.moveTo(xStart, yStart);
      context.lineTo(xStart, yEndLine);
      context.stroke();

      // the triangle
      context.beginPath();
      context.moveTo(xStart-arrowWidth, yEndLine);
      context.lineTo(xStart, yEndArrow);
      context.lineTo(xStart+arrowWidth, yEndLine);
      context.closePath();

      // the fill color
      context.fill();

      ////////////////// TEXT /////////////////////
      context.font = labelFontSize+"px Arial";

      context.fillText(xlabel,xEndArrow,yStart+labelFontSize);
      context.fillText(ylabel,xStart-labelFontSize,yEndArrow);


}

function drawcolormap_RGBSpace(colormapTmp, canvasIDRG,canvasIDRB, canvasIDBG, calcBackground){

  var xStart = hue_resolution_X*0.1;
  var yStart = hue_resolution_Y*0.9;
  var xEnd = hue_resolution_X*0.8;
  var yEnd = hue_resolution_Y*0.2;
  var xWidth = xEnd-xStart;
  var yHeight =yStart-yEnd;

  var canvasColorspaceRG = document.getElementById(canvasIDRG);
  canvasColorspaceRG.width = hue_resolution_X;
  canvasColorspaceRG.height = hue_resolution_Y;
  var colorspaceContexRG = canvasColorspaceRG.getContext("2d");

  var canvasColorspaceRB = document.getElementById(canvasIDRB);
  canvasColorspaceRB.width = hue_resolution_X;
  canvasColorspaceRB.height = hue_resolution_Y;
  var colorspaceContexRB = canvasColorspaceRB.getContext("2d");

  var canvasColorspaceBG = document.getElementById(canvasIDBG);
  canvasColorspaceBG.width = hue_resolution_X;
  canvasColorspaceBG.height = hue_resolution_Y;
  var colorspaceContexBG = canvasColorspaceBG.getContext("2d");

  rgbInit(canvasIDRG,canvasIDRB,canvasIDBG, calcBackground);

  ////////////////////////////////////////////////////////

  spaceElementsXPos = [];
  spaceElementsYPos = [];
  spaceElementsType = [];
  spaceElementsKey = [];

  ////////////////////////////////////////////////////////
  // draw Colormap
  if(bandSketch.getBandLenght()>0){

      /////////////////////////////////////////////////////////////////

       var twinStarted=false;
       var leftStarted=false;
       var xPos, yPos, xPos2, yPos2, tmpColor, tmpColor2;
       var tmpArray = [];
       var tmpArray2 = [];
         for(var i = 0; i<colormapTmp.getNumColors(); i++){

          tmpColor = colormapTmp.getRGBColor(i);

          var tmpKey = colormapTmp.getKey(i);
          tmpArray = [-1,-1,-1];
          tmpArray2 = [-1,-1,-1];
            switch(tmpKey) {
              case "nil key":

                  if(colormapTmp.getNumColors()>2){


                        // RG

                        xPos =  tmpColor.getRValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getGValue()*yHeight;

                        tmpColor2 = colormapTmp.getRGBColor(i+1);
                        xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                        yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                        drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true);

                        // RB

                        xPos =  tmpColor.getRValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getBValue()*yHeight;

                        xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                        yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                        drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, true);

                        // BG

                        xPos =  tmpColor.getBValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getGValue()*yHeight;

                        xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                        yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                        drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, true);
                  }

                  //// for mouse events: nil key is not important
                  spaceElementsXPos.push(tmpArray);
                  spaceElementsYPos.push(tmpArray2);
                  spaceElementsType.push(false);
                  spaceElementsKey.push("nil key");

                  break;
              case "twin key":
                  if(twinStarted==true){
                      twinStarted=false;

                      // RG

                      xPos =  tmpColor.getRValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getGValue()*yHeight;

                      tmpColor2 = colormapTmp.getRGBColor(i+1);
                      xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                      drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, false);
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, i, true);

                      tmpArray[0] = xPos;
                      tmpArray2[0] = yPos;

                      // RB

                      xPos =  tmpColor.getRValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getBValue()*yHeight;

                      xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                      drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, false);
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, i, true);

                      tmpArray[1] = xPos;
                      tmpArray2[1] = yPos;

                      // BG

                      xPos =  tmpColor.getBValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getGValue()*yHeight;

                      xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                      drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, false);
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexBG,xPos,yPos, i, true);

                      tmpArray[2] = xPos;
                      tmpArray2[2] = yPos;

                        //// for mouse events: twin key second = circle
                      spaceElementsXPos.push(tmpArray);
                      spaceElementsYPos.push(tmpArray2);
                      spaceElementsType.push(true);
                      spaceElementsKey.push("twin key2");

                        break;

                  }
                  else{
                      var tmpKey2 = colormapTmp.getKey(i-1);
                      var drawCircle = true;
                      if(tmpKey2==="nil key" || tmpKey2==="left key")
                      drawCircle=false;


                      // RG

                      xPos =  tmpColor.getRValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getGValue()*yHeight;

                      tmpColor2 = colormapTmp.getRGBColor(i+1);
                      xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                      drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true);
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, i, drawCircle);

                      tmpArray[0] = xPos;
                      tmpArray2[0] = yPos;

                      // RB

                      xPos =  tmpColor.getRValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getBValue()*yHeight;

                      xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                      drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, true);
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, i, drawCircle);

                      tmpArray[1] = xPos;
                      tmpArray2[1] = yPos;

                      // BG

                      xPos =  tmpColor.getBValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getGValue()*yHeight;

                      xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                      drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, true);
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexBG,xPos,yPos, i, drawCircle);

                      tmpArray[2] = xPos;
                      tmpArray2[2] = yPos;

                        //// for mouse events: twin key second = circle
                      spaceElementsXPos.push(tmpArray);
                      spaceElementsYPos.push(tmpArray2);
                      if(drawCircle)
                          spaceElementsType.push(true);
                      else
                          spaceElementsType.push(false);
                      spaceElementsKey.push("twin key1");


                      twinStarted=true;


                      break;
                  }
              case "left key":
                  if(leftStarted==true){

                      // do nothing
                    spaceElementsXPos.push(tmpArray);
                    spaceElementsYPos.push(tmpArray2);
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

                        // RG

                        xPos =  tmpColor.getRValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getGValue()*yHeight;

                        if(i!=colormapTmp.getNumColors()-1){
                          tmpColor2 = colormapTmp.getRGBColor(i+1);
                          xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                          yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                          drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true);
                        }

                        drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, i, drawCircle);

                        tmpArray[0] = xPos;
                        tmpArray2[0] = yPos;

                        xPos =  tmpColor.getRValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getBValue()*yHeight;

                        if(i!=colormapTmp.getNumColors()-1){
                          tmpColor2 = colormapTmp.getRGBColor(i+1);
                          xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                          yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                          drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true);
                        }
                        drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, i, drawCircle);

                        tmpArray[1] = xPos;
                        tmpArray2[1] = yPos;

                        // BG

                        xPos =  tmpColor.getBValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getGValue()*yHeight;

                        if(i!=colormapTmp.getNumColors()-1){
                          tmpColor2 = colormapTmp.getRGBColor(i+1);
                          xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                          yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                          drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true);
                        }

                        drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexBG,xPos,yPos, i, drawCircle);

                        tmpArray[2] = xPos;
                        tmpArray2[2] = yPos;

                          //// for mouse events: twin key second = circle
                        spaceElementsXPos.push(tmpArray);
                        spaceElementsYPos.push(tmpArray2);
                        if(drawCircle)
                            spaceElementsType.push(true);
                        else
                            spaceElementsType.push(false);
                        spaceElementsKey.push("left key1");

                      leftStarted=true;
                      break;
                  }

              default:
                  // dual Key, right key,


                  // RG

                  xPos =  tmpColor.getRValue()*xWidth+xStart;
                  yPos =  yStart-tmpColor.getGValue()*yHeight;

                  tmpColor2 = colormapTmp.getRGBColor(i+1);
                  xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                  yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                  drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, false);
                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, i, true);

                  tmpArray[0] = xPos;
                  tmpArray2[0] = yPos;

                  // RB

                  xPos =  tmpColor.getRValue()*xWidth+xStart;
                  yPos =  yStart-tmpColor.getBValue()*yHeight;

                  xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                  yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                  drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, false);
                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, i, true);

                  tmpArray[1] = xPos;
                  tmpArray2[1] = yPos;

                  // BG

                  xPos =  tmpColor.getBValue()*xWidth+xStart;
                  yPos =  yStart-tmpColor.getGValue()*yHeight;

                  xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                  yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                  drawLine(colorspaceContexBG ,xPos,yPos,xPos2,yPos2, false);
                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexBG,xPos,yPos, i, true);

                  tmpArray[2] = xPos;
                  tmpArray2[2] = yPos;

                    //// for mouse events: twin key second = circle
                  spaceElementsXPos.push(tmpArray);
                  spaceElementsYPos.push(tmpArray2);
                  spaceElementsType.push(true);
                  spaceElementsKey.push(tmpKey);
          }

      }

  }

}


function drawElement(colorString,colorspaceContex,xPos,yPos, index, circle){
  // draw circle

  colorspaceContex.setLineDash([]);

  if(circle){
    colorspaceContex.beginPath();
    if(index==mouseAboveSpaceObjectID)
      colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
    else
      colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
    colorspaceContex.fillStyle = colorString;
    colorspaceContex.fill();
    colorspaceContex.lineWidth = smallLineWidth;
    if(index==mouseGrappedSpaceObjectID)
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
}

function drawLine(colorspaceContex,xPos,yPos,xPos2,yPos2, dashed){

  if(dashed)
  colorspaceContex.setLineDash([15,10]);
  else
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
}
