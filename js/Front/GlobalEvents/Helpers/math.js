function deg2rad (degree)
{
    return (degree/180*Math.PI);
}

function rad2deg (rad){
  return (rad*180/Math.PI);
}


function atan2_360Degree(x,y){

  var tmpRad = Math.atan2(y,x);

  if(tmpRad<0){
    tmpRad = 2*Math.PI+tmpRad;
  }

  return rad2deg(tmpRad);

}


function degree360ToRad(degree){

  if(degree>180){
    degree = degree-360;
  }

  return deg2rad (degree);
}
