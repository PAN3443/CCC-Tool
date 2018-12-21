
self.addEventListener('message', function(e) {

  var data = e.data;


    var xPos, yPos, xPos2, yPos2, xVPos, xVPos2, tmpColor, tmpColor2;
    var plotwidth = data.plotXEnd-data.data.plotXStart;
    xVPos=data.data.plotXStart;
    xVPos2=data.data.plotXStart;

    var heigthVArea = data.data.plotYStart-data.plotYEnd;

    //var widthVAreaInterval = plotwidth/(intervalColormap.getRefNum()-1); //getColormapLength()-1);
    var refLength = data.ref[data.ref.length-1]-data.ref[0];

    var leftOrTwinStarted = false;

     var jsonObj = {};

     jsonObj['modus'] = "";
     jsonObj['xPos'] = 0;
     jsonObj['yPos'] = 0;
     jsonObj['xPos2'] = 0;
     jsonObj['yPos2'] = 0;
     jsonObj['circle'] = true;
     jsonObj['isCompare'] = true;

     var jsonObj2 = {};

     jsonObj2['modus'] = "spaceElements";
     jsonObj2['spaceElementsXPos'] = 0;
     jsonObj2['spaceElementsYPos'] = 0;
     jsonObj2['spaceElementsType'] = false;
     jsonObj2['spaceElementsKey'] = "";

  var plotwidth = data.plotXEnd-data.data.plotXStart;
  var twinStarted=false;
  var leftStarted=false;
  var xPos, yPos, xPos2, yPos2, xVPos, xVPos2, tmpColor, tmpColor2;
  xVPos=data.data.plotXStart;
  xVPos2=data.data.plotXStart;

  var heigthVArea = data.plotYStart-data.plotYEnd;

 /*for(var i = 0; i<data.key.length; i++){

      var tmpKey = data.key[i];

        switch(tmpKey) {
          case "nil key":

              //// for mouse events: nil key is not important
              jsonObj2.spaceElementsXPos=-1;
              jsonObj2.spaceElementsYPos=-1;
              jsonObj2.spaceElementsType=false;
              jsonObj2.spaceElementsKey="nil key";

              self.postMessage(jsonObj2);

              break;
          case "twin key":
              if(twinStarted==true){
                  twinStarted=false;


                  switch(analyzeColorspaceModus){
                      case "hsv":
                      tmpColor = colormapTmp.getHSVColor(i);
                      var tmpDis = tmpColor.getSValue()*data.colorspaceRadius;
                      var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                      xPos = tmpDis*Math.cos(tmpRad)+data.colorspaceCenterX;
                      yPos = tmpDis*Math.sin(tmpRad)+data.colorspaceCenterY;
                      break;
                      case "lab":
                      tmpColor = colormapTmp.getLabColor(i);
                      xPos = ((tmpColor.getAValue()/data.labSpaceRange)*xWidth/2)+data.colorspaceCenterX;
                      yPos = ((tmpColor.getBValue()/data.labSpaceRange)*yHeight/2)+data.colorspaceCenterY;
                      break;
                      case "din99":
                      tmpColor = colormapTmp.getDIN99Color(i);
                      xPos = ((tmpColor.getA99Value()-data.data.rangeA99Neg)/data.rangeA99*(data.xEnd-data.xStart))+data.xStart;
                      yPos = ((tmpColor.getB99Value()-data.data.rangeB99Neg)/data.rangeB99*(data.yEnd-data.yStart))+data.yStart;
                      break;
                      default:
                      console.log("Error at the changeColorspace function");
                      return;
                  }

                    //drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, i, true);


                    //// for mouse events: twin key second = circle
                  jsonObj2.spaceElementsXPos=xPos;
                  jsonObj2.spaceElementsYPos=yPos;
                  jsonObj2.spaceElementsType=true;
                  jsonObj2.spaceElementsKey="twin key2";

                  self.postMessage(jsonObj2);
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
                        var tmpDis = tmpColor.getSValue()*data.colorspaceRadius;
                        var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                        xPos = tmpDis*Math.cos(tmpRad)+data.colorspaceCenterX;
                        yPos = tmpDis*Math.sin(tmpRad)+data.colorspaceCenterY;
                      break;
                      case "lab":
                        tmpColor = colormapTmp.getLabColor(i);
                        xPos = ((tmpColor.getAValue()/data.labSpaceRange)*xWidth/2)+data.colorspaceCenterX;
                        yPos = ((tmpColor.getBValue()/data.labSpaceRange)*yHeight/2)+data.colorspaceCenterY;
                      break;
                      case "din99":
                      tmpColor = colormapTmp.getDIN99Color(i);
                      xPos = ((tmpColor.getA99Value()-data.data.rangeA99Neg)/data.rangeA99*(data.xEnd-data.xStart))+data.xStart;
                      yPos = ((tmpColor.getB99Value()-data.data.rangeB99Neg)/data.rangeB99*(data.yEnd-data.yStart))+data.yStart;
                      break;
                      default:
                      console.log("Error at the changeColorspace function");
                      return;
                  }

                  // draw circle
                  //drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, i, drawCircle);


                  //// for mouse events: twin key first = circle or quad
                  jsonObj2.spaceElementsXPos=xPos;
                  jsonObj2.spaceElementsYPos=yPos;
                  jsonObj2.spaceElementsKey="twin key1";
                  jsonObj2.spaceElementsType=drawCircle;

                  self.postMessage(jsonObj2);

                  /////////////////////////////////////////////
                  // Twin Key First: V Overview
                  if(colormapTmp.getKey(i-1)==="left key" || colormapTmp.getKey(i-1)==="nil key"){
                    // -> constant band


                    //if(doOriginalValuePlot){
                      xVPos = data.plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                      xVPos2 = data.plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                    /*}
                    else{
                      xVPos2 = xVPos+widthVArea;
                    }*/
                      switch(analyzeColorspaceModus){
                          case "hsv":
                            yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor.getVValue()));
                          break;
                          case "lab":
                              yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                          break;
                          case "din99":
                              yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                          break;
                          default:
                          console.log("Error at the changeColorspace function");
                          return;
                      }

                      //drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i, false);
                      //drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos, i, false);


                    /*if(doOriginalValuePlot==false){
                      xVPos = xVPos2;
                    }*/

                  }else {


                    //if(doOriginalValuePlot){
                      xVPos = data.plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                      xVPos2 = data.plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                    /*}
                    else{
                      xVPos2 = xVPos+widthVArea;
                    }*/

                    switch(analyzeColorspaceModus){
                        case "hsv":
                        tmpColor2 = colormapTmp.getHSVColor(i-1);
                        yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor2.getVValue()));
                        yPos2 = Math.round(data.plotYStart-(heigthVArea*tmpColor.getVValue()));
                        break;
                        case "lab":
                        tmpColor2 = colormapTmp.getLabColor(i-1);
                        yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                        yPos2 = Math.round(data.plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                        break;
                        case "din99":
                        tmpColor2 = colormapTmp.getDIN99Color(i-1);
                        yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                        yPos2 = Math.round(data.plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                        break;
                        default:
                        console.log("Error at the changeColorspace function");
                        return;
                    }


                    //drawElement(colormapTmp.getRGBColor(i-1).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i-1, true);
                    //drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos2, i, true);

                    /*if(doOriginalValuePlot==false){
                      xVPos = xVPos2;
                    }*/

                  }


                  twinStarted=true;


                  break;
              }
          case "left key":
              if(leftStarted==true){


                  // do nothing
                  jsonObj2.spaceElementsXPos=-1;
                  jsonObj2.spaceElementsYPos=-1;
                  jsonObj2.spaceElementsType=false;
                  jsonObj2.spaceElementsKey="left key2";

                  self.postMessage(jsonObj2);

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
                        var tmpDis = tmpColor.getSValue()*data.colorspaceRadius;
                        var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                        xPos = tmpDis*Math.cos(tmpRad)+data.colorspaceCenterX;
                        yPos = tmpDis*Math.sin(tmpRad)+data.colorspaceCenterY;
                        break;
                        case "lab":
                        tmpColor = colormapTmp.getLabColor(i);
                        xPos = ((tmpColor.getAValue()/data.labSpaceRange)*xWidth/2)+data.colorspaceCenterX;
                        yPos = ((tmpColor.getBValue()/data.labSpaceRange)*yHeight/2)+data.colorspaceCenterY;
                        break;
                        case "din99":
                        tmpColor = colormapTmp.getDIN99Color(i);
                        xPos = ((tmpColor.getA99Value()-data.data.rangeA99Neg)/data.rangeA99*(data.xEnd-data.xStart))+data.xStart;
                        yPos = ((tmpColor.getB99Value()-data.data.rangeB99Neg)/data.rangeB99*(data.yEnd-data.yStart))+data.yStart;
                        break;
                        default:
                        console.log("Error at the changeColorspace function");
                        return;
                    }

                  // draw circle
                  //drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, i, drawCircle);

                  //// for mouse events: left key first = circle or quad
                  jsonObj2.spaceElementsXPos=xPos;
                  jsonObj2.spaceElementsYPos=yPos;
                  jsonObj2.spaceElementsKey="left key1";
                  jsonObj2.spaceElementsType=drawCircle;

                  self.postMessage(jsonObj2);


                  /////////////////////////////////////////////
                  // LEFT Key First: V Overview
                  if(colormapTmp.getKey(i-1)==="left key" || colormapTmp.getKey(i-1)==="nil key"){
                      // -> constant band

                      //if(doOriginalValuePlot){
                        xVPos = data.plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                        xVPos2 = data.plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                      /*}
                      else{
                        xVPos2 = xVPos+widthVArea;
                      }*/

                      switch(analyzeColorspaceModus){
                          case "hsv":
                            yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor.getVValue()));
                          break;
                          case "lab":
                            yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                          break;
                          case "din99":
                            yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                          break;
                          default:
                          console.log("Error at the changeColorspace function");
                          return;
                      }

                      //drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i, false);
                      //drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos, i, false);

                      /*f(doOriginalValuePlot==false){
                        xVPos = xVPos2;
                      }*/

                  }else {

                    //if(doOriginalValuePlot){
                      xVPos = data.plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                      xVPos2 = data.plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                    /*}
                    else{
                      xVPos2 = xVPos+widthVArea;
                    }*/

                    switch(analyzeColorspaceModus){
                        case "hsv":
                        tmpColor2 = colormapTmp.getHSVColor(i-1);
                        tmpColor = colormapTmp.getHSVColor(i);
                        yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor2.getVValue()));
                        yPos2 = Math.round(data.plotYStart-(heigthVArea*tmpColor.getVValue()));
                        break;
                        case "lab":
                        tmpColor2 = colormapTmp.getLabColor(i-1);
                        tmpColor = colormapTmp.getLabColor(i);
                        yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                        yPos2 = Math.round(data.plotYStart-(heigthVArea*tmpColor.getLValue()/100));
                        break;
                        case "din99":
                        tmpColor2 = colormapTmp.getDIN99Color(i-1);
                        tmpColor = colormapTmp.getDIN99Color(i);
                        yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                        yPos2 = Math.round(data.plotYStart-(heigthVArea*tmpColor.getL99Value()/100));
                        break;
                        default:
                        console.log("Error at the changeColorspace function");
                        return;
                    }

                    //drawElement(colormapTmp.getRGBColor(i-1).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i-1, true);
                    //drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),vPlotContex,xVPos2,yPos2, i, true);

                    /*if(doOriginalValuePlot==false){
                      xVPos = xVPos2;
                    }*/

                  }



                  leftStarted=true;
                  break;
              }

          default:
              // dual Key, right key,

              switch(analyzeColorspaceModus){
                  case "hsv":
                    tmpColor = colormapTmp.getHSVColor(i);
                    var tmpDis = tmpColor.getSValue()*data.colorspaceRadius;
                    var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                    xPos = tmpDis*Math.cos(tmpRad)+data.colorspaceCenterX;
                    yPos = tmpDis*Math.sin(tmpRad)+data.colorspaceCenterY;
                  break;
                  case "lab":
                    tmpColor = colormapTmp.getLabColor(i);
                    xPos = ((tmpColor.getAValue()/data.labSpaceRange)*xWidth/2)+data.colorspaceCenterX;
                    yPos = ((tmpColor.getBValue()/data.labSpaceRange)*yHeight/2)+data.colorspaceCenterY;
                  break;
                  case "din99":
                    tmpColor = colormapTmp.getDIN99Color(i);
                    xPos = ((tmpColor.getA99Value()-data.data.rangeA99Neg)/data.rangeA99*(data.xEnd-data.xStart))+data.xStart;
                    yPos = ((tmpColor.getB99Value()-data.data.rangeB99Neg)/data.rangeB99*(data.yEnd-data.yStart))+data.yStart;
                  break;
                  default:
                  console.log("Error at the changeColorspace function");
                  return;
              }
              //drawElement(colormapTmp.getRGBColor(i).getRGBStringAplha(alphaVal),colorspaceContex,xPos,yPos, i, true);

              //// for mouse events: dual Key, right key = circle
              jsonObj2.spaceElementsXPos=xPos;
              jsonObj2.spaceElementsYPos=yPos;
              jsonObj2.spaceElementsType=true;
              jsonObj2.spaceElementsKey=tmpKey;

              self.postMessage(jsonObj2);

              // V Overview
              /////////////////////////////////////////////
              // Default: V Overview

              if(tmpKey=='dual key'){
                tmpColor2 = colormapTmp.getHSVColor(i-1);


                //if(doOriginalValuePlot){
                  xVPos = data.plotXStart+((colormapTmp.getPosition(i-1)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                  xVPos2 = data.plotXStart+((colormapTmp.getPosition(i)-colormapTmp.getPosition(0))/widthVArea)*plotwidth;
                /*}
                else{
                  xVPos2 = xVPos+widthVArea;
                }*/

                switch(analyzeColorspaceModus){
                    case "hsv":
                      tmpColor2 = colormapTmp.getHSVColor(i-1);
                      yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor2.getVValue()));
                    break;
                    case "lab":
                      tmpColor2 = colormapTmp.getLabColor(i-1);
                      yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor2.getLValue()/100));
                    break;
                    case "din99":
                      tmpColor2 = colormapTmp.getDIN99Color(i-1);
                      yPos = Math.round(data.plotYStart-(heigthVArea*tmpColor2.getL99Value()/100));
                    break;
                    default:
                    console.log("Error at the changeColorspace function");
                    return;
                }

                //drawElement(colormapTmp.getRGBColor(i-1).getRGBStringAplha(alphaVal),vPlotContex,xVPos,yPos, i-1, true);


              }

              /*if(doOriginalValuePlot==false){
                xVPos = xVPos2;
              }*/




      }

  }


  jsonObj.modus = "finish";

  self.postMessage(jsonObj);


*/

}, false);
