function drawKeyBursLine(canvasID,tmpCMS){

  keyBurPoint = [];
  keyBurKeyIndex = [];

  var canvasObject = document.getElementById(canvasID);
  var tmpRect = canvasObject.getBoundingClientRect();
  canvasObject.width = tmpRect.width;
  canvasObject.height = tmpRect.height;

  var canvasContex = canvasObject.getContext("2d");

  /*canvasContex.mozImageSmoothingEnabled = false;
  canvasContex.webkitImageSmoothingEnabled = false;
  canvasContex.msImageSmoothingEnabled = false;
  canvasContex.imageSmoothingEnabled = false; // did not work !?!?!
  canvasContex.oImageSmoothingEnabled = false;*/

  var colormapWidth = tmpRect.width * 0.9;
  var xPos = Math.round(tmpRect.width * 0.05);

  canvasContex.beginPath();
  canvasContex.lineWidth = 2;
  canvasContex.moveTo(xPos, Math.round(tmpRect.height/2));
  canvasContex.lineTo(xPos + colormapWidth, Math.round(tmpRect.height/2));
  canvasContex.strokeStyle = 'rgb(120,120,120)';
  canvasContex.stroke();



  var bigRad=Math.round(tmpRect.height/10);
  var smallRad=Math.round(tmpRect.height/20);
  var middlePos = Math.round(tmpRect.height/2);
  colorBurRadius = bigRad; //smallRad;

  var bandSketchWidth = colormapWidth/(tmpCMS.getKeyLength()-1);
  // draw keys
  for (var i = 0; i < tmpCMS.getKeyLength(); i++) {

    var pos1 = Math.round(xPos + (tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth);
    var pos2 = Math.round(xPos + (i*bandSketchWidth));

    if(tmpCMS.getBur(i)==false && limitKeyBurLine)
    continue;

    canvasContex.beginPath();
    canvasContex.lineWidth = 1;
    canvasContex.moveTo(pos1, 0);
    canvasContex.lineTo(pos1, middlePos);
    canvasContex.strokeStyle = 'rgb(120,120,120)';
    canvasContex.stroke();

    canvasContex.beginPath();
    canvasContex.lineWidth = 1;
    canvasContex.moveTo(pos1, middlePos);
    canvasContex.lineTo(pos2, tmpRect.height);
    canvasContex.strokeStyle = 'rgb(120,120,120)';
    canvasContex.stroke();
  }

  for (var i = 0; i < tmpCMS.getKeyLength(); i++) {

      var pos1 = Math.round(xPos + (tmpCMS.getRefPosition(i) - tmpCMS.getRefPosition(0)) / (tmpCMS.getRefPosition(tmpCMS.getKeyLength()-1) - tmpCMS.getRefPosition(0)) * colormapWidth);
      var pos2 = Math.round(xPos + (i*bandSketchWidth));

    if(tmpCMS.getBur(i)){

        keyBurPoint.push(pos1);
        keyBurKeyIndex.push(i);

      if(i!=0 && i!=tmpCMS.getKeyLength()-1){

        canvasContex.beginPath(pos1);
        canvasContex.arc(pos1, middlePos, bigRad, 0, 2 * Math.PI, false);
        canvasContex.fillStyle = 'black';
        canvasContex.fill();
        canvasContex.beginPath(pos1);
        canvasContex.arc(pos1, middlePos, smallRad, 0, 2 * Math.PI, false);
        canvasContex.fillStyle = 'green';
        canvasContex.fill();

      }
      else{
        canvasContex.beginPath();
        canvasContex.arc(pos1, middlePos, bigRad, 0, 2 * Math.PI, false);
        canvasContex.fillStyle = 'black';
        canvasContex.fill();

      }

    }
    else{

      if(limitKeyBurLine)
      continue;

      canvasContex.beginPath();
      canvasContex.arc(pos1, middlePos, smallRad, 0, 2 * Math.PI, false);
      canvasContex.fillStyle = 'black';
      canvasContex.fill();
    }


  }

}
