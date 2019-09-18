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


function sum(...theArgs) {
  return theArgs.reduce((previous, current) => {
    return previous + current;
  });
}

function sumArray(array){
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum +=  array[i];
  }
  return sum;
}

function vecNorm(v){
  var tmp = 1/vecLength(v);
  for (var i = 0; i < v.length; i++) {
    v[i]=v[i]*tmp;
  }
  return v;
}

function vecLength(v){
  var sum = 0;
  for (var i = 0; i < v.length; i++) {
    sum += Math.pow(v[i],2);
  }
  return Math.sqrt(sum);
}

function vec_Distance(v1,v2){
  if(v1.length == v2.length){
    var sum = 0;
    for (var i = 0; i < v1.length; i++) {
      sum += Math.pow(v2[i]-v1[i],2);
    }
    return Math.sqrt(sum);
  }
  return undefined;
}
