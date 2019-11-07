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

function copyVector(v){
  var result = [];
  for (var i = 0; i < v.length; i++) {
    result.push(v[i]);
  }
  return result;
}

function vecScalMulti(v,s){
  var result = copyVector(v);
  for (var i = 0; i < result.length; i++) {
    result[i]=result[i]*s;
  }
  return result;
}



function vec_Diff_COLOR(c1,c2){

  var result = [
    c1.get1Value()-c2.get1Value(),
    c1.get2Value()-c2.get2Value(),
    c1.get3Value()-c2.get3Value()
  ];

  return result;
}

function vec_Diff(v1,v2){
  if(v1.length!=v2.length)
    return undefined;
  var result = [];

  for (var i = 0; i < v1.length; i++) {
    result.push(v1[i]-v2[i]);
  }
  return result;
}

function vec_Add(v1,v2){
  if(v1.length!=v2.length)
    return undefined;

  var result = [];

  for (var i = 0; i < v1.length; i++) {
    result.push(v1[i]+v2[i]);
  }
  return result;
}

function vec_Dot(v1,v2){

  if(v1.length!=v2.length)
    return undefined;
  var result = 0;

  for (var i = 0; i < v1.length; i++) {
    result+=v1[i]*v2[i];
  }
  return result;
}

function vecNorm(v){
  var result = copyVector(v);
  if(vecLength(v)!=0){
    var tmp = 1/vecLength(v);
    for (var i = 0; i < result.length; i++) {
      result[i] = result[i]*tmp;
    }
    return result;
  }
  return result; // vector is [0,0,....];

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
