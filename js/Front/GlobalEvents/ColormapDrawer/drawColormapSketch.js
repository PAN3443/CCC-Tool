function drawBandSketch(cms,sketchObjectID, withInputFields, aboveInputField){

  // start
  var canvasObject = document.getElementById(sketchObjectID);
  var rect = canvasObject.getBoundingClientRect();

  var canvasContex = canvasObject.getContext("2d");
  /*canvasContex.mozImageSmoothingEnabled = false;
  canvasContex.webkitImageSmoothingEnabled = false;
  canvasContex.msImageSmoothingEnabled = false;
  canvasContex.imageSmoothingEnabled = false; // did not work !?!?!
  canvasContex.oImageSmoothingEnabled = false;*/


  var fontSize = 40;//20;
  var smallFontSize = 30;//15;
  var bandLength; //= bandSketchObjLength;

  if(withInputFields){
    canvasObject.height = 80;//40;

    if(rect.width!=0)
      bandLength= Math.round(rect.width/(cms.getKeyLength()-1));
    else
      bandLength= Math.round(500/(cms.getKeyLength()-1));

  }else{
    canvasObject.height = 1;//40;
    if(rect.width!=0)
      bandLength= Math.round(rect.width/(cms.getKeyLength()-1 + cms.getKeyLength()));
    else
      bandLength= Math.round(500/(cms.getKeyLength()-1 + cms.getKeyLength()));
  }

  bandSketchObjLength=bandLength;

  if(cms.getKeyLength()==0){
    canvasObject.height = 80;//40;
    canvasObject.width = 2500;//1500;

    canvasObject.style.borderStyle = "dashed";
    canvasContex.textBaseline="bottom";
    // write text into the canvasID

    if(withInputFields){

      if(aboveInputField==0){
          // draw dragElemten_ID
          var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);
          canvasData=drawInsertBandPreview(canvasData, 0, canvasObject.width, canvasObject.height, canvasObject.width);
          canvasContex.putImageData(canvasData, 0, 0);
      }
      else{
        dropRects = [];
        dropRects.push(0);
        canvasContex.font = fontSize+"px Arial";
        var txt="Drop It Here";
        var xPos=(canvasObject.width/2)-(canvasContex.measureText(txt).width/2);
        var yPos=(canvasObject.height/2)+(fontSize/2);
        canvasContex.fillText(txt,xPos,yPos);
        return;
      }

    }
    /*else{
      canvasContex.font = fontSize+"px Arial";

      var txt;
      if(showSideID==1){
        txt="Drag a band construct from the bottom and drop it in this area.";
      }
      else{
        txt="Emty CMS. Please visit the New or Gallery section";
      }
      var xPos=(canvasObject.width/2)-(canvasContex.measureText(txt).width/2);
      var yPos=(canvasObject.height/2)+(fontSize/2);
      canvasContex.fillText(txt,xPos,yPos);
    }*/

  }
  else{

    canvasObject.style.borderStyle = "solid";

    if(withInputFields){
      dropRects = [];
      canvasObject.width = (cms.getKeyLength()-1)*bandLength+cms.getKeyLength()*bandLength;
    }
    else{
      canvasObject.width = (cms.getKeyLength()-1)*bandLength;
    }

    var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);
    var currentPos=0;

    ///////////////////////////////
    // draw cms band

    var color1, color2;

    for(var x=0; x<cms.getKeyLength()-1; x++){

      if(withInputFields){
        if(aboveInputField==x)
          canvasData=drawInsertBandPreview(canvasData, currentPos, bandLength, canvasObject.height, canvasObject.width);

        currentPos += bandLength;
      }

      color1 = cms.getRightKeyColor(x,globalCMS1.getInterpolationSpace());
      color2 = cms.getLeftKeyColor(x+1,globalCMS1.getInterpolationSpace());

      if(color1==undefined)
        canvasData=createConstantBand(canvasData, currentPos, bandLength, canvasObject.height, color2, canvasObject.width);
      else
        canvasData=createScaledBand(canvasData, currentPos, bandLength, canvasObject.height, color1, color2, canvasObject.width);

      currentPos += bandLength;
    }

    if(aboveInputField==cms.getKeyLength()-1)
      canvasData=drawInsertBandPreview(canvasData, currentPos, bandLength, canvasObject.height, canvasObject.width);

    canvasContex.putImageData(canvasData, 0, 0);

    ///////////////////////////////
    // draw cms band
    if(withInputFields){
    currentPos=0;
    var borderWidth=1;//canvasObject.width/canvasObject.getBoundingClientRect().width;
    //console.log(canvasObject.getBoundingClientRect().width+"/"+canvasObject.width+"="+borderWidth);

      for(var x=0; x<cms.getKeyLength(); x++){
      // push to drop Rects


            dropRects.push(currentPos);
            if(aboveInputField!=x){


              /*canvasContex.font = fontSize+"px Arial";
              var txt="here";
              var xPos= currentPos+(bandLength/2)-(canvasContex.measureText(txt).width/2);
              var yPos=(canvasObject.height/2)+(fontSize/2);
              canvasContex.fillStyle = "black";
              canvasContex.fillText(txt,xPos,yPos);//*/
              canvasContex.lineWidth=borderWidth;
              canvasContex.strokeStyle = "black";
              canvasContex.strokeRect(currentPos,0,bandLength,canvasObject.height);
              //canvasContex.lineWidth=2;
              canvasContex.beginPath();
              canvasContex.moveTo(currentPos+(bandLength/2),0+canvasObject.height/16);
              canvasContex.lineTo(currentPos+(bandLength/2),canvasObject.height-canvasObject.height/16);
              canvasContex.stroke();

              canvasContex.beginPath();
              canvasContex.moveTo(currentPos+bandLength/16,canvasObject.height/2);
              canvasContex.lineTo(currentPos+bandLength-bandLength/16,canvasObject.height/2);
              canvasContex.stroke();

              canvasContex.strokeStyle = "red";
              canvasContex.fillStyle = "red";


              canvasContex.beginPath();
              canvasContex.arc(currentPos+(bandLength/2),canvasObject.height/2,30,0,2*Math.PI);
              canvasContex.stroke();

              canvasContex.beginPath();
              canvasContex.arc(currentPos+(bandLength/2),canvasObject.height/2,20,0,2*Math.PI);
              canvasContex.stroke();

              canvasContex.beginPath();
              canvasContex.arc(currentPos+(bandLength/2),canvasObject.height/2,10,0,2*Math.PI);
              canvasContex.stroke();

              canvasContex.beginPath();
              canvasContex.arc(currentPos+(bandLength/2),canvasObject.height/2,3,0,2*Math.PI);
              canvasContex.fill();

          }
          currentPos += bandLength*2;

    }
  }
 }

}


function drawInsertBandPreview(canvasData, currentPos, bandLength, canvasHeight, canvasWidth){

  switch(dragPredefinedBandType){
      case 0:
              // ->const
              canvasData=createConstantBand(canvasData, currentPos, bandLength, canvasHeight, constBands[dragPredefinedBandIndex].getInColorFormat(globalCMS1.getInterpolationSpace()), canvasWidth);
      break;
      case 1:
              // ->scale
              canvasData=createScaledBand(canvasData, currentPos, bandLength, canvasHeight, scaleBands[dragPredefinedBandIndex][0].getInColorFormat(globalCMS1.getInterpolationSpace()),scaleBands[dragPredefinedBandIndex][1].getInColorFormat(globalCMS1.getInterpolationSpace()), canvasWidth);
      break;
      case 2:
              // ->double
              var numberOfBands=2;
              var tmpbandLength=bandLength/numberOfBands;
              if(tmpbandLength%1!=0){
                var rest=tmpbandLength%1;
                tmpbandLength=Math.floor(tmpbandLength);
                var lesspixels=Math.round(rest*numberOfBands); // should be an integer
                canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength+lesspixels, canvasHeight, doubleBands[dragPredefinedBandIndex][0].getInColorFormat(globalCMS1.getInterpolationSpace()),doubleBands[dragPredefinedBandIndex][1].getInColorFormat(globalCMS1.getInterpolationSpace()), canvasWidth);
                currentPos+=(tmpbandLength+lesspixels);
              }
              else{
                canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, doubleBands[dragPredefinedBandIndex][0].getInColorFormat(globalCMS1.getInterpolationSpace()),doubleBands[dragPredefinedBandIndex][1].getInColorFormat(globalCMS1.getInterpolationSpace()), canvasWidth);
                currentPos+=tmpbandLength;
              }
              canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, doubleBands[dragPredefinedBandIndex][2].getInColorFormat(globalCMS1.getInterpolationSpace()),doubleBands[dragPredefinedBandIndex][3].getInColorFormat(globalCMS1.getInterpolationSpace()), canvasWidth);
      break;
      case 3:
              // ->triple
              var numberOfBands=3;
              var tmpbandLength=bandLength/numberOfBands; //Math.round(bandLength/numberOfBands);

              if(tmpbandLength%1!=0){
                var rest=tmpbandLength%1;
                tmpbandLength=Math.floor(tmpbandLength);
                var lesspixels=Math.round(rest*numberOfBands);
                canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength+lesspixels, canvasHeight, tribleBands[dragPredefinedBandIndex][0].getInColorFormat( globalCMS1.getInterpolationSpace()),tribleBands[dragPredefinedBandIndex][1].getInColorFormat( globalCMS1.getInterpolationSpace()), canvasWidth);
                currentPos+=(tmpbandLength+lesspixels);
              }
              else{
                canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, tribleBands[dragPredefinedBandIndex][0].getInColorFormat( globalCMS1.getInterpolationSpace()),tribleBands[dragPredefinedBandIndex][1].getInColorFormat( globalCMS1.getInterpolationSpace()), canvasWidth);
                currentPos+=tmpbandLength;
              }
              canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, tribleBands[dragPredefinedBandIndex][2].getInColorFormat( globalCMS1.getInterpolationSpace()),tribleBands[dragPredefinedBandIndex][3].getInColorFormat( globalCMS1.getInterpolationSpace()), canvasWidth);
              currentPos+=tmpbandLength;
              canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, tribleBands[dragPredefinedBandIndex][4].getInColorFormat( globalCMS1.getInterpolationSpace()),tribleBands[dragPredefinedBandIndex][5].getInColorFormat( globalCMS1.getInterpolationSpace()), canvasWidth);


      break;
      case 4:
              // ->quad
              var numberOfBands=4;
                            var tmpbandLength=bandLength/numberOfBands;
                            if(tmpbandLength%1!=0){
                              var rest=tmpbandLength%1;
                              tmpbandLength=Math.floor(tmpbandLength);
                              var lesspixels=Math.round(rest*numberOfBands);
                              canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength+lesspixels, canvasHeight, quadBands[dragPredefinedBandIndex][0].getInColorFormat( globalCMS1.getInterpolationSpace()),quadBands[dragPredefinedBandIndex][1].getInColorFormat( globalCMS1.getInterpolationSpace()), canvasWidth);
                              currentPos+=(tmpbandLength+lesspixels);
                            }
                            else{
                              canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, quadBands[dragPredefinedBandIndex][0].getInColorFormat( globalCMS1.getInterpolationSpace()),quadBands[dragPredefinedBandIndex][1].getInColorFormat( globalCMS1.getInterpolationSpace()), canvasWidth);
                              currentPos+=tmpbandLength;
                            }
                            canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, quadBands[dragPredefinedBandIndex][2].getInColorFormat( globalCMS1.getInterpolationSpace()),quadBands[dragPredefinedBandIndex][3].getInColorFormat( globalCMS1.getInterpolationSpace()), canvasWidth);
                            currentPos+=tmpbandLength;
                            canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, quadBands[dragPredefinedBandIndex][4].getInColorFormat( globalCMS1.getInterpolationSpace()),quadBands[dragPredefinedBandIndex][5].getInColorFormat( globalCMS1.getInterpolationSpace()), canvasWidth);
                            currentPos+=tmpbandLength;
                            canvasData=createUnknownTypeBand(canvasData, currentPos, tmpbandLength, canvasHeight, quadBands[dragPredefinedBandIndex][6].getInColorFormat( globalCMS1.getInterpolationSpace()),quadBands[dragPredefinedBandIndex][7].getInColorFormat( globalCMS1.getInterpolationSpace()), canvasWidth);
      break;
      case 5:
              // ->MyDesigns CMS
              canvasData = drawInsertCMSPreview(myDesignsList[dragPredefinedBandIndex],canvasData, currentPos, bandLength, canvasHeight, canvasWidth);
            break;
      case 6:
              // -> predefined CMS
              var tmpCMS;
              switch (currentPredefinedType) {
                case 0:
                    tmpCMS = cmsYellowColormaps[currentPredefinedId];
                  break
                  case 1:
                    tmpCMS = cmsBlueColormaps[currentPredefinedId];
                    break
                    case 2:
                      tmpCMS = cmsRedPurpleColormaps[currentPredefinedId];
                      break
                      case 3:
                        tmpCMS = cmsGreenColormaps[currentPredefinedId];
                        break
                        case 4:
                        tmpCMS = cmsBrownColormaps[currentPredefinedId];
                          break
                          case 5:
                          tmpCMS = cmsDivergentColormaps[currentPredefinedId];
                            break
                            case 6:
                            tmpCMS = cmsThreeBandColormaps[currentPredefinedId];
                              break
                              case 7:
                                tmpCMS = cmsFourBandColormaps[currentPredefinedId];
                                break

                default:
                  return;
              }
              canvasData = drawInsertCMSPreview(tmpCMS,canvasData, currentPos, bandLength, canvasHeight, canvasWidth);
      break;
      case 7:
              // -> online CMS


              break;

      case 8:
              // ->const
              canvasData=createConstantBand(canvasData, currentPos, bandLength, canvasHeight, customConstBandColor.getInColorFormat(globalCMS1.getInterpolationSpace()), canvasWidth);
      break;
      case 9:
              // ->scale
              canvasData=createScaledBand(canvasData, currentPos, bandLength, canvasHeight, customScaleBandColor1.getInColorFormat(globalCMS1.getInterpolationSpace()),customScaleBandColor2.getInColorFormat(globalCMS1.getInterpolationSpace()), canvasWidth);
      break;

      default:
      console.log("Error in drawInsertBandPreview function.");
  }

  return canvasData;

}


function drawInsertCMSPreview(cms,canvasData, currentPos, bandLength, canvasHeight, canvasWidth){

  var subBandLength = bandLength/(cms.getKeyLength()-1);
  var subCurrentPos = currentPos;
  for(var x=0; x<cms.getKeyLength()-1; x++){

    color1 = cms.getRightKeyColor(x,globalCMS1.getInterpolationSpace());
    color2 = cms.getLeftKeyColor(x+1,globalCMS1.getInterpolationSpace());

    if(color1==undefined)
      canvasData=createConstantBand(canvasData, subCurrentPos, subBandLength, canvasHeight, color2, canvasWidth);
    else
      canvasData=createScaledBand(canvasData, subCurrentPos, subBandLength, canvasHeight, color1, color2, canvasWidth);

    subCurrentPos += subBandLength;
  }

  return canvasData;

}




function sketch_MouseMove(event){
  if(document.getElementById("id_EditPage").style.display == "none")
  return;

  var rect = event.target.getBoundingClientRect();
  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  var ratioToColorspaceResolutionX = event.target.width / rect.width;
  var ratioToColorspaceResolutionY = event.target.height / rect.height;
  mousePosX = canvasPosX * ratioToColorspaceResolutionX;
  mousePosY = canvasPosY * ratioToColorspaceResolutionY;
}

function sketch_MouseClick(){
  if(document.getElementById("id_EditPage").style.display == "none")
  return;

  for (var i = 1; i <= globalCMS1.getKeyLength()-1; i++) {
    if(mousePosX-(bandSketchObjLength*i)<=0){
      askIndex=i-1;
      askType=1;
      openAskWindow()
      break;
    }
  }

}
