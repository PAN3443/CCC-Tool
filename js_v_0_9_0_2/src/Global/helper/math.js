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
  return [
    c1[1]-c2[1],
    c1[2]-c2[2],
    c1[3]-c2[3]
  ];
}

function vec_Divi(v,s){
  var result = [];
  for (var i = 0; i < v.length; i++) {
    result.push(v[i]/s);
  }
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


function vec_Cross(v1,v2){

    if(v1.length!=3 || v2.length!=3)
      return undefined;

    var result =[undefined,undefined,undefined];
    result[0] = v1[1] * v2[2] - v1[2] * v2[1];
    result[1] = v1[0] * v2[2] - v1[2] * v2[0];
    result[2] = v1[0] * v2[1] - v1[1] * v2[0];
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



function midnightFormula(a,b,c){


  var results = [];
  var discriminant = Math.pow(b,2) - (4*a*c);

  if(discriminant>0){
    // Roots are real and different
    results.push((-b + Math.sqrt(discriminant)) / (2*a));
    results.push((-b - Math.sqrt(discriminant)) / (2*a));
  }
  else if(discriminant==0){
    // Roots are real and same
    results.push((-b + Math.sqrt(discriminant)) / (2*a));
  }
  else{
    // Roots are complex and different
    //var realPart = -b/(2*a);
    //var imaginaryPart = Math.sqrt(-discriminant)/(2*a);

  }

  return results;

}
