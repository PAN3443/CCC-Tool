function drawBandSketch(tmpCMS,sketchObjectID){

  // start
  var canvasObject = document.getElementById(sketchObjectID);
  var rect = canvasObject.getBoundingClientRect();

  var canvasContex = canvasObject.getContext("2d");

  var sketch_BandWidth; //= bandSketchObjLength;
  canvasObject.height = 1;//40;
  if(rect.width!=0)
    sketch_BandWidth= Math.round(rect.width/(tmpCMS.getKeyLength()-1 + tmpCMS.getKeyLength()));
  else
    sketch_BandWidth= Math.round(500/(tmpCMS.getKeyLength()-1 + tmpCMS.getKeyLength()));


  //bandSketchObjLength=bandLength;

  if(tmpCMS.getKeyLength()!=0){

    if(document.getElementById("id_EditPage").display!="none")
      canvasObject.style.borderStyle = "solid";

    canvasObject.width = (tmpCMS.getKeyLength()-1)*sketch_BandWidth;

    var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);
    var currentSktech_xPos=0;

    ///////////////////////////////
    // draw tmpCMS band
    for(var i=0; i<tmpCMS.getKeyLength()-1; i++){

      switch (tmpCMS.getKeyType(i)) {
        case "nil key": case "left key":
          canvasData = createConstantBand(canvasData, currentSktech_xPos, 0, sketch_BandWidth, canvasObject.height, tmpCMS.getLeftKeyColor(i+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
          break;
        default:
        if((tmpCMS.getInterpolationSpace()==="de94-ds" || tmpCMS.getInterpolationSpace()==="de2000-ds" || tmpCMS.getInterpolationType()==="spline") && tmpCMS.getIntervalLength(i)>0){
          var sketch_SubBandWidth = Math.round(sketch_BandWidth/(tmpCMS.getIntervalLength(i)+1));
          var currentSktech_SubxPos = currentSktech_xPos;

          // from left key to first interval
          canvasData = createScaledBand(canvasData,currentSktech_SubxPos, 0, sketch_SubBandWidth, canvasObject.height, tmpCMS.getRightKeyColor(i,tmpCMS.getInterpolationSpace()), tmpCMS.getIntervalColor(i,0,tmpCMS.getInterpolationSpace()), canvasObject.width);
          currentSktech_SubxPos+=sketch_SubBandWidth;
          // between intervals
          for (var j = 0; j < tmpCMS.getIntervalLength(i)-1; j++) {
            canvasData = createScaledBand(canvasData,currentSktech_SubxPos, 0, sketch_SubBandWidth, canvasObject.height, tmpCMS.getIntervalColor(i,j,tmpCMS.getInterpolationSpace()), tmpCMS.getIntervalColor(i,j+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
            currentSktech_SubxPos+=sketch_SubBandWidth;
          }
          // from last interval to last key
          sketch_SubBandWidth = (currentSktech_xPos+sketch_BandWidth-currentSktech_SubxPos);
          canvasData = createScaledBand(canvasData,currentSktech_SubxPos, 0, sketch_SubBandWidth, canvasObject.height, tmpCMS.getIntervalColor(i,tmpCMS.getIntervalLength(i)-1,tmpCMS.getInterpolationSpace()), tmpCMS.getLeftKeyColor(i+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
        }
        else {
          canvasData = createScaledBand(canvasData,currentSktech_xPos, 0, sketch_BandWidth, canvasObject.height, tmpCMS.getRightKeyColor(i,tmpCMS.getInterpolationSpace()), tmpCMS.getLeftKeyColor(i+1,tmpCMS.getInterpolationSpace()), canvasObject.width);
        }
      }
      currentSktech_xPos += sketch_BandWidth;
    }

    canvasContex.putImageData(canvasData, 0, 0);

 }

}
