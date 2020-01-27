
/////////////////////////////////////////////////////////

function bohachevsky_F1_TestField(options){

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
      var term1 = Math.pow(xPos, 2);
      var term2 = Math.pow(2 * yPos, 2);
      var term3 = -0.3 * Math.cos(3 * Math.PI * xPos);
      var term4 = -0.4 * Math.cos(4 * Math.PI * yPos);
      var value = term1 + term2 + term3 + term4 + 0.7;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
    return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function bohachevsky_F2_TestField(options){

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
      var term1 = Math.pow(xPos, 2);
      var term2 = Math.pow(2 * yPos, 2);
      var term3 = -0.3 * Math.cos(3 * Math.PI * xPos) * Math.cos(4 * Math.PI * yPos);
      var value = term1 + term2 + term3 + 0.3;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
    return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function bohachevsky_F3_TestField(options){

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
      var term1 = Math.pow(xPos, 2);
      var term2 = Math.pow(2 * yPos, 2);
      var term3 = -0.3 * Math.cos(3 * Math.PI * xPos + 4 * Math.PI * yPos);
      var value = term1 + term2 + term3 + 0.3;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
    return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function perm_V1_TestField(options){

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[3];
  var testFieldDimY = options[4];

  var fieldStartX = options[2][0];
  var fieldStartY = options[2][2];
  var fieldStepX = Math.round((Math.abs(options[2][1]-options[2][0])/testFieldDimX) * errorMath) / errorMath;
  var fieldStepY = Math.round((Math.abs(options[2][3]-options[2][2])/testFieldDimY) * errorMath) / errorMath;

  var b = options[5];
  for (var y = 0; y < testFieldDimY; y++) {
    var yPos = fieldStartY + y * fieldStepY;
    for (var x = 0; x < testFieldDimX; x++) {
      var xPos = fieldStartX + x * fieldStepX;
      var value = 0;
      value += Math.pow((1 + b) * (xPos - (1)) + (2 + b) * (yPos - (1 / 2)), 2)
      value += Math.pow((1 + b) * (Math.pow(xPos, 2) - 1) + (2 + b) * (Math.pow(yPos, 2) - Math.pow((1 / 2), 2)), 2);
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
    return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function rot_Hyper_Ellipsoid_TestField(options){

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
      var term1 = Math.pow(xPos, 2); // i=1, j=1
      var term2 = Math.pow(xPos, 2); // i=2, j=1
      var term3 = Math.pow(yPos, 2); // i=2, j=2
      var value = term1 + term2 + term3;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
    return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function sphere_TestField(options){

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
      var term1 = Math.pow(xPos, 2);
      var term2 = Math.pow(yPos, 2);
      var value = term1 + term2;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
    return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function sumDifPowers_TestField(options){

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
      var term1 = Math.pow((Math.abs(xPos)), (2));
      var term2 = Math.pow((Math.abs(yPos)), (3));
      var value = term1 + term2;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
    return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}


/////////////////////////////////////////////////////////


function sum_Squares_TestField(options){

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
      var term1 = Math.pow(xPos, 2);
      var term2 = Math.pow(2 * yPos, 2);
      var value = term1 + term2;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
    return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function trid_TestField(options){

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
      var term1 = Math.pow(xPos - 1, 2);
      var term2 = Math.pow(yPos - 1, 2);
      var term3 = xPos * yPos;
      var value = term1 + term2 - term3;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }

    return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////
