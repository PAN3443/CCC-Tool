function drawBandSketch(cms,sketchObjectID, sketchKeyID, withInputFields, aboveInputField){


  //editPage_drawKeys(sketchKeyID, cms);

  // start
  var canvasObject = document.getElementById(sketchObjectID);
  var canvasContex = canvasObject.getContext("2d");

  canvasObject.height = 80;
  var fontSize = 50;
  var smallFontSize = 20;
  var bandLength = bandSketchObjLength;

  if(cms.getKeyLength()==0){
    canvasObject.width = 1500;

    canvasObject.style.border = "2px dashed black";
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
    else{
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
    }

  }
  else{

    canvasObject.style.border = "2px solid black";

    if(withInputFields){
      dropRects = [];
      canvasObject.width = (cms.getKeyLength()-1)*bandLength+cms.getKeyLength()*bandLength;
    }
    else
      canvasObject.width = (cms.getKeyLength()-1)*bandLength;



    var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);
    var currentPos=0;

    ///////////////////////////////
    // draw cms band

    var color1, color2;

    for(var x=0; x<cms.getKeyLength()-1; x++){

      if(withInputFields){
        if(aboveInputField==x){
          color1 = cms.getRightKeyColor(0,colorspaceModus);
          color2 = cms.getRightKeyColor(0,colorspaceModus);

          if(color1==undefined)
            canvasData=createConstantBand(canvasData, currentPos, bandLength, canvasObject.height, color2, canvasObject.width);
          else
            canvasData=createScaledBand(canvasData, currentPos, bandLength, canvasObject.height, color1, color2, canvasObject.width);
        }
        currentPos += bandLength;
      }

      color1 = cms.getRightKeyColor(x,colorspaceModus);
      color2 = cms.getLeftKeyColor(x+1,colorspaceModus);

      if(color1==undefined)
        canvasData=createConstantBand(canvasData, currentPos, bandLength, canvasObject.height, color2, canvasObject.width);
      else
        canvasData=createScaledBand(canvasData, currentPos, bandLength, canvasObject.height, color1, color2, canvasObject.width);

      currentPos += bandLength;
    }

    if(aboveInputField==cms.getKeyLength()-1){
      color1 = cms.getRightKeyColor(0,colorspaceModus);
      color2 = cms.getRightKeyColor(0,colorspaceModus);

      if(color1==undefined)
        canvasData=createConstantBand(canvasData, currentPos, bandLength, canvasObject.height, color2, canvasObject.width);
      else
        canvasData=createScaledBand(canvasData, currentPos, bandLength, canvasObject.height, color1, color2, canvasObject.width);
    }

    canvasContex.putImageData(canvasData, 0, 0);

    ///////////////////////////////
    // draw cms band
    currentPos=0;
    if(withInputFields){
      for(var x=0; x<cms.getKeyLength(); x++){
      // push to drop Rects
        dropRects.push(currentPos);
        if(aboveInputField!=x){
          canvasContex.font = fontSize+"px Arial";
          var txt="DP";
          var xPos=currentPos+(bandLength/2)-(canvasContex.measureText(txt).width/2);
          var yPos=(canvasObject.height/2)+(fontSize/2);
          canvasContex.fillText(txt,xPos,yPos);

        }
        currentPos += 2*bandLength;
      }
    }
   }
}


function drawInsertBandPreview(canvasData, currentPos, bandLength, canvasHeight, canvasWidth){


  switch(dragPredefinedBandType){
      case 0:
              // ->const
              canvasData=createConstantBand(canvasData, currentPos, bandLength, canvasHeight, constBands[dragPredefinedBandIndex].getInColorFormat(colorspaceModus), canvasWidth);
      break;
      case 1:
              // ->scale
              canvasData=createScaledBand(canvasData, currentPos, bandLength, canvasHeight, scaleBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),scaleBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
      break;
      case 2:
              // ->double
              var numberOfBands=2;
              bandLength/=numberOfBands;
              if(bandLength%1!=0){
                var rest=bandLength-1;
                bandLength=Math.floor(bandLength);
                var lesspixels=Math.round(rest*numberOfBands);
                canvasData=createUnknownTypeBand(canvasData, currentPos, bandLength+lesspixels, canvasHeight, doubleBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),doubleBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
              }
              else{
                canvasData=createUnknownTypeBand(canvasData, currentPos, bandLength, canvasHeight, doubleBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),doubleBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
              }
              currentPos+=bandLength;
              canvasData=createUnknownTypeBand(canvasData, currentPos, bandLength, canvasHeight, doubleBands[dragPredefinedBandIndex][2].getInColorFormat(colorspaceModus),doubleBands[dragPredefinedBandIndex][3].getInColorFormat(colorspaceModus), canvasWidth);
      break;
      case 3:
              // ->tripleX
              var numberOfBands=3;
              bandLength/=numberOfBands;
              if(bandLength%1!=0){
                var rest=bandLength-1;
                bandLength=Math.floor(bandLength);
                var lesspixels=Math.round(rest*numberOfBands);
                canvasData=createUnknownTypeBand(canvasData, currentPos, bandLength+lesspixels, canvasHeight, tribleBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),tribleBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
              }
              else{
                canvasData=createUnknownTypeBand(canvasData, currentPos, bandLength, canvasHeight, tribleBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),tribleBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
              }
              currentPos+=bandLength;
              canvasData=createUnknownTypeBand(canvasData, currentPos, bandLength, canvasHeight, tribleBands[dragPredefinedBandIndex][2].getInColorFormat(colorspaceModus),tribleBands[dragPredefinedBandIndex][3].getInColorFormat(colorspaceModus), canvasWidth);
              currentPos+=bandLength;
              canvasData=createUnknownTypeBand(canvasData, currentPos, bandLength, canvasHeight, tribleBands[dragPredefinedBandIndex][4].getInColorFormat(colorspaceModus),tribleBands[dragPredefinedBandIndex][5].getInColorFormat(colorspaceModus), canvasWidth);

      break;
      case 4:
              // ->quad
              var numberOfBands=4;
              bandLength/=numberOfBands;
              if(bandLength%1!=0){
                var rest=bandLength-1;
                bandLength=Math.floor(bandLength);
                var lesspixels=Math.round(rest*numberOfBands);
                canvasData=createUnknownTypeBand(canvasData, currentPos, bandLength+lesspixels, canvasHeight, quadBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),quadBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
              }
              else{
                canvasData=createUnknownTypeBand(canvasData, currentPos, bandLength, canvasHeight, quadBands[dragPredefinedBandIndex][0].getInColorFormat(colorspaceModus),quadBands[dragPredefinedBandIndex][1].getInColorFormat(colorspaceModus), canvasWidth);
              }
              currentPos+=bandLength;
              canvasData=createUnknownTypeBand(canvasData, currentPos, bandLength, canvasHeight, quadBands[dragPredefinedBandIndex][2].getInColorFormat(colorspaceModus),quadBands[dragPredefinedBandIndex][3].getInColorFormat(colorspaceModus), canvasWidth);
              currentPos+=bandLength;
              canvasData=createUnknownTypeBand(canvasData, currentPos, bandLength, canvasHeight, quadBands[dragPredefinedBandIndex][4].getInColorFormat(colorspaceModus),quadBands[dragPredefinedBandIndex][5].getInColorFormat(colorspaceModus), canvasWidth);
              currentPos+=bandLength;
              canvasData=createUnknownTypeBand(canvasData, currentPos, bandLength, canvasHeight, quadBands[dragPredefinedBandIndex][6].getInColorFormat(colorspaceModus),quadBands[dragPredefinedBandIndex][7].getInColorFormat(colorspaceModus), canvasWidth);

      break;

      default:
      console.log("Error in drawInsertBandPreview function.");
  }

  return canvasData;

}
