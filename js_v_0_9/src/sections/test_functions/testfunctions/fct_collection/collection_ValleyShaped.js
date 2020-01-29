
/////////////////////////////////////////////////////////

function three_Hump_Camel_TestField(options){

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[3];
  var testFieldDimY = options[4];

  var fieldStartX = options[2][0];
  var fieldStartY = options[2][2];
  var fieldStepX = Math.round((Math.abs(options[2][1]-options[2][0])/testFieldDimX) * errorMath) / errorMath;
  var fieldStepY = Math.round((Math.abs(options[2][3]-options[2][2])/testFieldDimY) * errorMath) / errorMath;

  for (var y = 0; y < testFieldDimY; y++) {
    var yPos = fieldStartY + y * fieldStepY;
    for (var x = 0; x < testFieldDimX; x++) {
      var xPos = fieldStartX + x * fieldStepX;
      var term1 = 2 * Math.pow(xPos, 2);
      var term2 = -1.05 * Math.pow(xPos, 4);
      var term3 = Math.pow(xPos, 6) / 6;
      var term4 = xPos * yPos;
      var term5 = Math.pow(yPos, 2);
      var value = term1 + term2 + term3 + term4 + term5;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function six_Hump_Camel_TestField(options){

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[3];
  var testFieldDimY = options[4];

  var fieldStartX = options[2][0];
  var fieldStartY = options[2][2];
  var fieldStepX = Math.round((Math.abs(options[2][1]-options[2][0])/testFieldDimX) * errorMath) / errorMath;
  var fieldStepY = Math.round((Math.abs(options[2][3]-options[2][2])/testFieldDimY) * errorMath) / errorMath;

  for (var y = 0; y < testFieldDimY; y++) {
    var yPos = fieldStartY + y * fieldStepY;
    for (var x = 0; x < testFieldDimX; x++) {
      var xPos = fieldStartX + x * fieldStepX;
      var term1 = (4-2.1*Math.pow(xPos, 2)+(Math.pow(xPos, 4)/3))*Math.pow(xPos, 2);
      var term2 = xPos*yPos;
      var term3 = (-4+4*Math.pow(yPos, 2))*Math.pow(yPos, 2);
      var value = term1 + term2 + term3;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////
