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
              colorRGB = new classColor_RGB(r,g,255);
            }
            else{
              var b;
                b  = globalColormap1.getRGBColor(mouseGrappedSpaceObjectID).getBValue();

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
              colorRGB = new classColor_RGB(r,255,b);
            }
            else{
              var g;
                g = globalColormap1.getRGBColor(mouseGrappedSpaceObjectID).getGValue();


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
              colorRGB = new classColor_RGB(255,g,b);
            }
            else{
              var r;
                r = globalColormap1.getRGBColor(mouseGrappedSpaceObjectID).getRValue();

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

function drawcolormap_RGBSpace(colormapTmp, canvasIDRG,canvasIDRB, canvasIDBG, calcBackground, drawInterpolationLine){

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

    if(showSpace==1){
      for(var i = colormapRGB3D.children.length-1; i>=0; i--){
        colormapRGB3D.remove( colormapRGB3D.children[i]);
      }

    }
  ////////////////////////////////////////////////////////
  // draw Colormap
  if(bandSketch.getBandLenght()>0){

      //if(drawInterpolationLine){
        drawInterpolationLineInRGB(colormapTmp, colorspaceContexRG,colorspaceContexRB,colorspaceContexBG,xWidth,yHeight,xStart,yStart,intervalSize);
      //}
      //else{
      //  drawInterpolationLineInRGB(colormapTmp, colorspaceContexRG,colorspaceContexRB,colorspaceContexBG,xWidth,yHeight,xStart,yStart,interactionIntervalSize);
      //}
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

                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, i, true);

                      tmpArray[0] = xPos;
                      tmpArray2[0] = yPos;

                      // RB

                      xPos =  tmpColor.getRValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getBValue()*yHeight;

                      xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, i, true);

                      tmpArray[1] = xPos;
                      tmpArray2[1] = yPos;

                      // BG

                      xPos =  tmpColor.getBValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getGValue()*yHeight;

                      xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexBG,xPos,yPos, i, true);

                      tmpArray[2] = xPos;
                      tmpArray2[2] = yPos;

                        //// for mouse events: twin key second = circle
                      spaceElementsXPos.push(tmpArray);
                      spaceElementsYPos.push(tmpArray2);
                      spaceElementsType.push(true);
                      spaceElementsKey.push("twin key2");


                      if(showSpace==1){

                                var x1 = tmpColor.getRValue()*255-128;
                                var y1 = tmpColor.getGValue()*255-128;
                                var z1 = tmpColor.getBValue()*255-128;

                                var x2 = tmpColor2.getRValue()*255-128;
                                var y2 = tmpColor2.getGValue()*255-128;
                                var z2 = tmpColor2.getBValue()*255-128;

                                draw3DElement(tmpColor.getHexString(),x1,y1,z1, i, true);
                        }

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

                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, i, drawCircle);

                      tmpArray[0] = xPos;
                      tmpArray2[0] = yPos;

                      // RB

                      xPos =  tmpColor.getRValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getBValue()*yHeight;

                      xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, i, drawCircle);

                      tmpArray[1] = xPos;
                      tmpArray2[1] = yPos;

                      // BG

                      xPos =  tmpColor.getBValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getGValue()*yHeight;

                      xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

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

                      if(showSpace==1){

                                var x1 = tmpColor.getRValue()*255-128;
                                                var y1 = tmpColor.getGValue()*255-128;
                                                var z1 = tmpColor.getBValue()*255-128;

                                                var x2 = tmpColor2.getRValue()*255-128;
                                                var y2 = tmpColor2.getGValue()*255-128;
                                                var z2 = tmpColor2.getBValue()*255-128;

                                                draw3DElement(tmpColor.getHexString(),x1,y1,z1, i, drawCircle);
                        }


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


                        drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, i, drawCircle);

                        tmpArray[0] = xPos;
                        tmpArray2[0] = yPos;

                        // RB

                        xPos =  tmpColor.getRValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getBValue()*yHeight;


                        drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, i, drawCircle);

                        tmpArray[1] = xPos;
                        tmpArray2[1] = yPos;

                        // BG

                        xPos =  tmpColor.getBValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getGValue()*yHeight;


                        if(showSpace==1){

                                  var x1 = tmpColor.getRValue()*255-128;
                                                  var y1 = tmpColor.getGValue()*255-128;
                                                  var z1 = tmpColor.getBValue()*255-128;

                                                  draw3DElement(tmpColor.getHexString(),x1,y1,z1, i, drawCircle);
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

                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, i, true);

                  tmpArray[0] = xPos;
                  tmpArray2[0] = yPos;

                  // RB

                  xPos =  tmpColor.getRValue()*xWidth+xStart;
                  yPos =  yStart-tmpColor.getBValue()*yHeight;

                  xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                  yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, i, true);

                  tmpArray[1] = xPos;
                  tmpArray2[1] = yPos;

                  // BG

                  xPos =  tmpColor.getBValue()*xWidth+xStart;
                  yPos =  yStart-tmpColor.getGValue()*yHeight;

                  xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                  yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexBG,xPos,yPos, i, true);

                  tmpArray[2] = xPos;
                  tmpArray2[2] = yPos;

                    //// for mouse events: twin key second = circle
                  spaceElementsXPos.push(tmpArray);
                  spaceElementsYPos.push(tmpArray2);
                  spaceElementsType.push(true);
                  spaceElementsKey.push(tmpKey);

                  if(showSpace==1){

                    var x1 = tmpColor.getRValue()*255-128;
                    var y1 = tmpColor.getGValue()*255-128;
                    var z1 = tmpColor.getBValue()*255-128;

                    var x2 = tmpColor2.getRValue()*255-128;
                    var y2 = tmpColor2.getGValue()*255-128;
                    var z2 = tmpColor2.getBValue()*255-128;

                      draw3DElement(tmpColor.getHexString(),x1,y1,z1, i, true);

                  }
          }

      }

  }

}


function drawInterpolationLineInRGB(colormapTmp, colorspaceContexRG,colorspaceContexRB,colorspaceContexBG,xWidth,yHeight,xStart,yStart, intervalSize){

  var intervalColormap = colormapTmp.calcColorMap(intervalSize, colorspaceModus);

  var tmpColor,tmpColor2, xPos, xPos2, yPos, yPos2;

  var twinStarted=false;
  var leftStarted=false;

  for(var i = 0; i<intervalColormap.getColormapLength()-1; i++){

   var tmpKey = intervalColormap.getType(i);

   tmpColor = intervalColormap.getColor(i, "rgb");
   tmpColor2 = intervalColormap.getColor(i+1, "rgb");

      /*    console.log(tmpKey);
     if(tmpColor.get1Value()==tmpColor2.get1Value() &&
     tmpColor.get2Value()==tmpColor2.get2Value() &&
     tmpColor.get3Value()==tmpColor2.get3Value()){
       continue;
     }*/

     switch(tmpKey) {

       case "twin key": case "interval twin key":



           if(twinStarted==true){

             // RG

             xPos =  tmpColor.getRValue()*xWidth+xStart;
             yPos =  yStart-tmpColor.getGValue()*yHeight;

             xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
             yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

             drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, false, false);


             // RB

             xPos =  tmpColor.getRValue()*xWidth+xStart;
             yPos =  yStart-tmpColor.getBValue()*yHeight;

             xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
             yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

             drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, false, false);

             // BG

             xPos =  tmpColor.getBValue()*xWidth+xStart;
             yPos =  yStart-tmpColor.getGValue()*yHeight;

             xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
             yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

             drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, false, false);

             if(showSpace==1){

               var x1 = tmpColor.getRValue()*255-128;
               var y1 = tmpColor.getGValue()*255-128;
               var z1 = tmpColor.getBValue()*255-128;

               var x2 = tmpColor2.getRValue()*255-128;
               var y2 = tmpColor2.getGValue()*255-128;
               var z2 = tmpColor2.getBValue()*255-128;


                 draw3DLine(x1,y1, z1, x2, y2, z2, false, false);

             }
               twinStarted=false;

                 break;

           }
           else{

             xPos =  tmpColor.getRValue()*xWidth+xStart;
             yPos =  yStart-tmpColor.getGValue()*yHeight;

             xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
             yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

             drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true, false);


             // RB

             xPos =  tmpColor.getRValue()*xWidth+xStart;
             yPos =  yStart-tmpColor.getBValue()*yHeight;

             xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
             yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

             drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, true, false);


             // BG

             xPos =  tmpColor.getBValue()*xWidth+xStart;
             yPos =  yStart-tmpColor.getGValue()*yHeight;

             xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
             yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

             drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, true, false);

             if(showSpace==1){

               var x1 = tmpColor.getRValue()*255-128;
               var y1 = tmpColor.getGValue()*255-128;
               var z1 = tmpColor.getBValue()*255-128;

               var x2 = tmpColor2.getRValue()*255-128;
               var y2 = tmpColor2.getGValue()*255-128;
               var z2 = tmpColor2.getBValue()*255-128;

              draw3DLine(x1,y1, z1, x2, y2, z2, true, false);


             }

              twinStarted=true;


               break;
           }
       case "left key": case "interval left key":
           if(leftStarted==true){


               leftStarted=false;
               break;

           }
           else{
             // RG

             xPos =  tmpColor.getRValue()*xWidth+xStart;
             yPos =  yStart-tmpColor.getGValue()*yHeight;

             xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
             yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

             drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true, false);

             // RB

             xPos =  tmpColor.getRValue()*xWidth+xStart;
             yPos =  yStart-tmpColor.getBValue()*yHeight;

             xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
             yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

             drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, true, false);


             // BG

             xPos =  tmpColor.getBValue()*xWidth+xStart;
             yPos =  yStart-tmpColor.getGValue()*yHeight;

             xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
             yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

             drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, true, false);

             if(showSpace==1){

               var x1 = tmpColor.getRValue()*255-128;
               var y1 = tmpColor.getGValue()*255-128;
               var z1 = tmpColor.getBValue()*255-128;

               var x2 = tmpColor2.getRValue()*255-128;
               var y2 = tmpColor2.getGValue()*255-128;
               var z2 = tmpColor2.getBValue()*255-128;

                 draw3DLine(x1,y1, z1, x2, y2, z2, true, false);

             }

               leftStarted=true;
               break;
           }

       default:
           // RG

           xPos =  tmpColor.getRValue()*xWidth+xStart;
           yPos =  yStart-tmpColor.getGValue()*yHeight;

           xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
           yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

           drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, false, false);

           // RB

           xPos =  tmpColor.getRValue()*xWidth+xStart;
           yPos =  yStart-tmpColor.getBValue()*yHeight;

           xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
           yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

           drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, false, false);

           // BG

           xPos =  tmpColor.getBValue()*xWidth+xStart;
           yPos =  yStart-tmpColor.getGValue()*yHeight;

           xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
           yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

           drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, false, false);

           if(showSpace==1){

             var x1 = tmpColor.getRValue()*255-128;
             var y1 = tmpColor.getGValue()*255-128;
             var z1 = tmpColor.getBValue()*255-128;

             var x2 = tmpColor2.getRValue()*255-128;
             var y2 = tmpColor2.getGValue()*255-128;
             var z2 = tmpColor2.getBValue()*255-128;

               draw3DLine(x1,y1, z1, x2, y2, z2, false, false);

           }
   }

  }

}


function drawcolormap_compare_RGBSpace(colormapTmp, colormapTmp2, canvasIDRG,canvasIDRB, canvasIDBG, calcBackground, drawInterpolationLine){

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

    if(showSpace==1){
      for(var i = colormapRGB3D.children.length-1; i>=0; i--){
        colormapRGB3D.remove( colormapRGB3D.children[i]);
      }

    }


    ////////////////////////////////////////////////////////
    // draw Colormap 2


  if(bandSketch2.getBandLenght()>0){


        /////////////////////////////////////////////////////////////////

         var twinStarted=false;
         var leftStarted=false;
         var xPos, yPos, xPos2, yPos2, tmpColor, tmpColor2;

           for(var i = 0; i<colormapTmp2.getNumColors(); i++){

            tmpColor = colormapTmp2.getRGBColor(i);

            var tmpKey = colormapTmp2.getKey(i);

              switch(tmpKey) {
                case "nil key":

                    if(colormapTmp2.getNumColors()>2){


                          // RG

                          xPos =  tmpColor.getRValue()*xWidth+xStart;
                          yPos =  yStart-tmpColor.getGValue()*yHeight;

                          tmpColor2 = colormapTmp2.getRGBColor(i+1);
                          xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                          yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                          drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true, true);

                          // RB

                          xPos =  tmpColor.getRValue()*xWidth+xStart;
                          yPos =  yStart-tmpColor.getBValue()*yHeight;

                          xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                          yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                          drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, true, true);

                          // BG

                          xPos =  tmpColor.getBValue()*xWidth+xStart;
                          yPos =  yStart-tmpColor.getGValue()*yHeight;

                          xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                          yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                          drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, true, true);

                          if(showSpace==1){

                            var x1 = tmpColor.getRValue()*255-128;
                            var y1 = tmpColor.getGValue()*255-128;
                            var z1 = tmpColor.getBValue()*255-128;

                            var x2 = tmpColor2.getRValue()*255-128;
                            var y2 = tmpColor2.getGValue()*255-128;
                            var z2 = tmpColor2.getBValue()*255-128;

                              draw3DLine(x1,y1, z1, x2, y2, z2, true, true);
                          }
                    }


                    break;
                case "twin key":
                    if(twinStarted==true){
                        twinStarted=false;

                        // RG

                        xPos =  tmpColor.getRValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getGValue()*yHeight;

                        tmpColor2 = colormapTmp2.getRGBColor(i+1);
                        xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                        yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                        drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, false, true);
                        drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, -2, true);


                        // RB

                        xPos =  tmpColor.getRValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getBValue()*yHeight;

                        xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                        yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                        drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, false, true);
                        drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, -2, true);


                        // BG

                        xPos =  tmpColor.getBValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getGValue()*yHeight;

                        xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                        yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                        drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, false, true);
                        drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexBG,xPos,yPos, -2, true);


                        if(showSpace==1){

                                  var x1 = tmpColor.getRValue()*255-128;
                                                  var y1 = tmpColor.getGValue()*255-128;
                                                  var z1 = tmpColor.getBValue()*255-128;

                                                  var x2 = tmpColor2.getRValue()*255-128;
                                                  var y2 = tmpColor2.getGValue()*255-128;
                                                  var z2 = tmpColor2.getBValue()*255-128;

                                                    draw3DLine(x1,y1, z1, x2, y2, z2, false, true);
                                                    draw3DElement(tmpColor.getHexString(),x1,y1,z1, -2, true);
                          }

                          break;

                    }
                    else{
                        var tmpKey2 = colormapTmp2.getKey(i-1);
                        var drawCircle = true;
                        if(tmpKey2==="nil key" || tmpKey2==="left key" || tmpKey2==="interval left key")
                        drawCircle=false;


                        // RG

                        xPos =  tmpColor.getRValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getGValue()*yHeight;

                        tmpColor2 = colormapTmp2.getRGBColor(i+1);
                        xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                        yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                        drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true, true);
                        drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, -2, drawCircle);


                        // RB

                        xPos =  tmpColor.getRValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getBValue()*yHeight;

                        xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                        yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                        drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, true, true);
                        drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, -2, drawCircle);

                        // BG

                        xPos =  tmpColor.getBValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getGValue()*yHeight;

                        xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                        yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                        drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, true, true);
                        drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexBG,xPos,yPos, -2, drawCircle);



                        if(showSpace==1){

                                  var x1 = tmpColor.getRValue()*255-128;
                                                  var y1 = tmpColor.getGValue()*255-128;
                                                  var z1 = tmpColor.getBValue()*255-128;

                                                  var x2 = tmpColor2.getRValue()*255-128;
                                                  var y2 = tmpColor2.getGValue()*255-128;
                                                  var z2 = tmpColor2.getBValue()*255-128;

                                                  draw3DLine(x1,y1, z1, x2, y2, z2, true, true);
                                                  draw3DElement(tmpColor.getHexString(),x1,y1,z1, -2, drawCircle);
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

                          // RG

                          xPos =  tmpColor.getRValue()*xWidth+xStart;
                          yPos =  yStart-tmpColor.getGValue()*yHeight;

                          if(i!=colormapTmp2.getNumColors()-1){
                            tmpColor2 = colormapTmp2.getRGBColor(i+1);
                            xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                            yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                            drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true, true);
                          }

                          drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, -2, drawCircle);



                          // RB

                          xPos =  tmpColor.getRValue()*xWidth+xStart;
                          yPos =  yStart-tmpColor.getBValue()*yHeight;

                          if(i!=colormapTmp2.getNumColors()-1){
                            tmpColor2 = colormapTmp2.getRGBColor(i+1);
                            xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                            yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                            drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, true, true);
                          }
                          drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, -2, drawCircle);


                          // BG

                          xPos =  tmpColor.getBValue()*xWidth+xStart;
                          yPos =  yStart-tmpColor.getGValue()*yHeight;

                          if(i!=colormapTmp2.getNumColors()-1){
                            tmpColor2 = colormapTmp2.getRGBColor(i+1);
                            xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                            yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                            drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, true, true);
                          }

                          if(showSpace==1){

                                    var x1 = tmpColor.getRValue()*255-128;
                                                    var y1 = tmpColor.getGValue()*255-128;
                                                    var z1 = tmpColor.getBValue()*255-128;

                                                    if(i!=colormapTmp2.getNumColors()-1){
                                                      tmpColor2 = colormapTmp2.getRGBColor(i+1);
                                                      var x2 = tmpColor2.getRValue()*255-128;
                                                      var y2 = tmpColor2.getGValue()*255-128;
                                                      var z2 = tmpColor2.getBValue()*255-128;
                                                      draw3DLine(x1,y1, z1, x2, y2, z2, true, true);
                                                    }

                                                    draw3DElement(tmpColor.getHexString(),x1,y1,z1, -2, drawCircle);
                            }



                          drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexBG,xPos,yPos, -2, drawCircle);

                        leftStarted=true;
                        break;
                    }

                default:
                    // dual Key, right key,


                    // RG

                    xPos =  tmpColor.getRValue()*xWidth+xStart;
                    yPos =  yStart-tmpColor.getGValue()*yHeight;

                    tmpColor2 = colormapTmp2.getRGBColor(i+1);
                    xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                    yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                    drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, false, true);
                    drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, -2, true);



                    // RB

                    xPos =  tmpColor.getRValue()*xWidth+xStart;
                    yPos =  yStart-tmpColor.getBValue()*yHeight;

                    xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                    yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                    drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, false, true);
                    drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, -2, true);


                    // BG

                    xPos =  tmpColor.getBValue()*xWidth+xStart;
                    yPos =  yStart-tmpColor.getGValue()*yHeight;

                    xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                    yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                    drawLine(colorspaceContexBG ,xPos,yPos,xPos2,yPos2, false, true);
                    drawElement(colormapTmp2.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexBG,xPos,yPos, -2, true);


                    if(showSpace==1){

                      var x1 = tmpColor.getRValue()*255-128;
                      var y1 = tmpColor.getGValue()*255-128;
                      var z1 = tmpColor.getBValue()*255-128;

                      var x2 = tmpColor2.getRValue()*255-128;
                      var y2 = tmpColor2.getGValue()*255-128;
                      var z2 = tmpColor2.getBValue()*255-128;

                        draw3DLine(x1,y1, z1, x2, y2, z2, false, true);
                        draw3DElement(tmpColor.getHexString(),x1,y1,z1, -2, true);

                    }
            }

        }

    }



  ////////////////////////////////////////////////////////
  // draw Colormap 1
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

                        drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true, false);

                        // RB

                        xPos =  tmpColor.getRValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getBValue()*yHeight;

                        xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                        yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                        drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, true, false);

                        // BG

                        xPos =  tmpColor.getBValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getGValue()*yHeight;

                        xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                        yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                        drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, true, false);

                        if(showSpace==1){

                          var x1 = tmpColor.getRValue()*255-128;
                          var y1 = tmpColor.getGValue()*255-128;
                          var z1 = tmpColor.getBValue()*255-128;

                          var x2 = tmpColor2.getRValue()*255-128;
                          var y2 = tmpColor2.getGValue()*255-128;
                          var z2 = tmpColor2.getBValue()*255-128;

                            draw3DLine(x1,y1, z1, x2, y2, z2, true, false);
                        }
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

                      drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, false, false);
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, i, true);

                      tmpArray[0] = xPos;
                      tmpArray2[0] = yPos;

                      // RB

                      xPos =  tmpColor.getRValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getBValue()*yHeight;

                      xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                      drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, false, false);
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, i, true);

                      tmpArray[1] = xPos;
                      tmpArray2[1] = yPos;

                      // BG

                      xPos =  tmpColor.getBValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getGValue()*yHeight;

                      xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                      drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, false, false);
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexBG,xPos,yPos, i, true);

                      tmpArray[2] = xPos;
                      tmpArray2[2] = yPos;

                        //// for mouse events: twin key second = circle
                      spaceElementsXPos.push(tmpArray);
                      spaceElementsYPos.push(tmpArray2);
                      spaceElementsType.push(true);
                      spaceElementsKey.push("twin key2");


                      if(showSpace==1){

                                var x1 = tmpColor.getRValue()*255-128;
                                                var y1 = tmpColor.getGValue()*255-128;
                                                var z1 = tmpColor.getBValue()*255-128;

                                                var x2 = tmpColor2.getRValue()*255-128;
                                                var y2 = tmpColor2.getGValue()*255-128;
                                                var z2 = tmpColor2.getBValue()*255-128;

                                                  draw3DLine(x1,y1, z1, x2, y2, z2, false, false);
                                                  draw3DElement(tmpColor.getHexString(),x1,y1,z1, i, true);
                        }

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

                      drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true, false);
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, i, drawCircle);

                      tmpArray[0] = xPos;
                      tmpArray2[0] = yPos;

                      // RB

                      xPos =  tmpColor.getRValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getBValue()*yHeight;

                      xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                      drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, true, false);
                      drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, i, drawCircle);

                      tmpArray[1] = xPos;
                      tmpArray2[1] = yPos;

                      // BG

                      xPos =  tmpColor.getBValue()*xWidth+xStart;
                      yPos =  yStart-tmpColor.getGValue()*yHeight;

                      xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                      yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                      drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, true, false);
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

                      if(showSpace==1){

                                var x1 = tmpColor.getRValue()*255-128;
                                                var y1 = tmpColor.getGValue()*255-128;
                                                var z1 = tmpColor.getBValue()*255-128;

                                                var x2 = tmpColor2.getRValue()*255-128;
                                                var y2 = tmpColor2.getGValue()*255-128;
                                                var z2 = tmpColor2.getBValue()*255-128;

                                                draw3DLine(x1,y1, z1, x2, y2, z2, true, false);
                                                draw3DElement(tmpColor.getHexString(),x1,y1,z1, i, drawCircle);
                        }


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

                          drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, true, false);
                        }

                        drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, i, drawCircle);

                        tmpArray[0] = xPos;
                        tmpArray2[0] = yPos;

                        // RB

                        xPos =  tmpColor.getRValue()*xWidth+xStart;
                        yPos =  yStart-tmpColor.getBValue()*yHeight;

                        if(i!=colormapTmp.getNumColors()-1){
                          tmpColor2 = colormapTmp.getRGBColor(i+1);
                          xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                          yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                          drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, true, false);
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

                          drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, true, false);
                        }

                        if(showSpace==1){

                                  var x1 = tmpColor.getRValue()*255-128;
                                                  var y1 = tmpColor.getGValue()*255-128;
                                                  var z1 = tmpColor.getBValue()*255-128;

                                                  if(i!=colormapTmp.getNumColors()-1){
                                                    tmpColor2 = colormapTmp.getRGBColor(i+1);
                                                    var x2 = tmpColor2.getRValue()*255-128;
                                                    var y2 = tmpColor2.getGValue()*255-128;
                                                    var z2 = tmpColor2.getBValue()*255-128;
                                                    draw3DLine(x1,y1, z1, x2, y2, z2, true, false);
                                                  }

                                                  draw3DElement(tmpColor.getHexString(),x1,y1,z1, i, drawCircle);
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

                  drawLine(colorspaceContexRG,xPos,yPos,xPos2,yPos2, false, false);
                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRG,xPos,yPos, i, true);

                  tmpArray[0] = xPos;
                  tmpArray2[0] = yPos;

                  // RB

                  xPos =  tmpColor.getRValue()*xWidth+xStart;
                  yPos =  yStart-tmpColor.getBValue()*yHeight;

                  xPos2 =  tmpColor2.getRValue()*xWidth+xStart;
                  yPos2 =  yStart-tmpColor2.getBValue()*yHeight;

                  drawLine(colorspaceContexRB,xPos,yPos,xPos2,yPos2, false, false);
                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexRB,xPos,yPos, i, true);

                  tmpArray[1] = xPos;
                  tmpArray2[1] = yPos;

                  // BG

                  xPos =  tmpColor.getBValue()*xWidth+xStart;
                  yPos =  yStart-tmpColor.getGValue()*yHeight;

                  xPos2 =  tmpColor2.getBValue()*xWidth+xStart;
                  yPos2 =  yStart-tmpColor2.getGValue()*yHeight;

                  drawLine(colorspaceContexBG,xPos,yPos,xPos2,yPos2, false, false);
                  drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContexBG,xPos,yPos, i, true);

                  tmpArray[2] = xPos;
                  tmpArray2[2] = yPos;

                    //// for mouse events: twin key second = circle
                  spaceElementsXPos.push(tmpArray);
                  spaceElementsYPos.push(tmpArray2);
                  spaceElementsType.push(true);
                  spaceElementsKey.push(tmpKey);

                  if(showSpace==1){

                    var x1 = tmpColor.getRValue()*255-128;
                    var y1 = tmpColor.getGValue()*255-128;
                    var z1 = tmpColor.getBValue()*255-128;

                    var x2 = tmpColor2.getRValue()*255-128;
                    var y2 = tmpColor2.getGValue()*255-128;
                    var z2 = tmpColor2.getBValue()*255-128;

                      draw3DLine(x1,y1, z1, x2, y2, z2, false, false);
                      draw3DElement(tmpColor.getHexString(),x1,y1,z1, i, true);

                  }
          }

      }

  }



}
