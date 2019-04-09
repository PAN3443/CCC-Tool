
function calcGradientHSV(hVal1,sVal1,vVal1,hVal2,sVal2,vVal2,ratio){


  var tmpDis = sVal1*50; // radius 50; center(0,0,0);
  var tmpRad = (hVal1*Math.PI*2)-Math.PI;
  var xPos = tmpDis*Math.cos(tmpRad);
  var yPos = tmpDis*Math.sin(tmpRad);
  var zPos = vVal1-50;

  var tmpDis2 = sVal2*50;
  var tmpRad2 = (hVal2*Math.PI*2)-Math.PI;
  var xPos2 = tmpDis2*Math.cos(tmpRad2);
  var yPos2 = tmpDis2*Math.sin(tmpRad2);
  var zPos2 = vVal2-50;

  var tmpX = xPos+(xPos2 - xPos)*ratio;
  var tmpY = yPos+(yPos2 - yPos)*ratio;
  var tmpZ = zPos+(zPos2 - zPos)*ratio;

  var tmpH =(Math.atan2(tmpY,tmpX)+Math.PI)/(Math.PI*2);
  var tmpS = Math.sqrt(Math.pow(tmpX,2)+Math.pow(tmpY,2))/50;
  var tmpV = tmpZ+50;

  return [tmpH,tmpS,tmpV];

}


function calcGradientWorker(c1Val1,c2Val1,c3Val1,c1Val2,c2Val2,c3Val2,ratio){ // this function is at each gradient calculation file and allows the worker to differ rgb-,hsv,..-gradients
  return calcGradientHSV(c1Val1,c2Val1,c3Val1,c1Val2,c2Val2,c3Val2,ratio);
}
