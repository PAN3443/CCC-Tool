function drawBandSketch(cms,sketchObjectID){

  // start
  var canvasObject = document.getElementById(sketchObjectID);
  var rect = canvasObject.getBoundingClientRect();

  var canvasContex = canvasObject.getContext("2d");


  var fontSize = 40;//20;
  var smallFontSize = 30;//15;
  var bandLength; //= bandSketchObjLength;


  canvasObject.height = 1;//40;
  if(rect.width!=0)
    bandLength= Math.round(rect.width/(cms.getKeyLength()-1 + cms.getKeyLength()));
  else
    bandLength= Math.round(500/(cms.getKeyLength()-1 + cms.getKeyLength()));


  bandSketchObjLength=bandLength;

  if(cms.getKeyLength()!=0){

    if(document.getElementById("id_EditPage").display!="none")
      canvasObject.style.borderStyle = "solid";

    canvasObject.width = (cms.getKeyLength()-1)*bandLength;


    var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);
    var currentPos=0;

    ///////////////////////////////
    // draw cms band

    var color1, color2;

    for(var x=0; x<cms.getKeyLength()-1; x++){

      color1 = cms.getRightKeyColor(x,globalCMS1.getInterpolationSpace());
      color2 = cms.getLeftKeyColor(x+1,globalCMS1.getInterpolationSpace());

      if(color1==undefined)
        canvasData=createConstantBand(canvasData, currentPos, 0, bandLength, canvasObject.height, color2, canvasObject.width);
      else
        canvasData=createScaledBand(canvasData, currentPos, 0, bandLength, canvasObject.height, color1, color2, canvasObject.width);

      currentPos += bandLength;
    }

    canvasContex.putImageData(canvasData, 0, 0);

 }

}
