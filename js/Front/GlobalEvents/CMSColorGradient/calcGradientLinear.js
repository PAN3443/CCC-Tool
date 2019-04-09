

function calcGradientLinear(rVal1,gVal1,bVal1,rVal2,gVal2,bVal2,ratio){

  var rValue = rVal1+(rVal2-rVal1)*ratio;
  var gValue = gVal1+(gVal2-gVal1)*ratio;
  var bValue = bVal1+(bVal2-bVal1)*ratio;

  return [rValue,gValue,bValue];

}

function calcGradientWorker(c1Val1,c2Val1,c3Val1,c1Val2,c2Val2,c3Val2,ratio){ // this function is at each gradient calculation file and allows the worker to differ rgb-,hsv,..-gradients
  return calcGradientLinear(c1Val1,c2Val1,c3Val1,c1Val2,c2Val2,c3Val2,ratio);
}
