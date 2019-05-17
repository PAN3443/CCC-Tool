function realWorldDataTestField(options){

  var positions = [];
  var testFieldVal = [];

  if(options==undefined)
    return [0,0,testFieldVal,positions];

  var testFieldDimX = options.length;
  var testFieldDimY = options[0].length;

  for (var y = 0; y < testFieldDimY; y++) {
    for (var x = 0; x < testFieldDimX; x++) {
      var value = options[x][y];
      positions.push([x, y]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX,testFieldDimY,testFieldVal,positions];
}
