/////////////////////////////////////////////////////////
function ackley_TestField(options) {

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[3];
  var testFieldDimY = options[4];

  var fieldStartX = options[2][0];
  var fieldStartY = options[2][2];
  var fieldStepX = Math.round((Math.abs(options[2][1]-options[2][0])/testFieldDimX) * errorMath) / errorMath;
  var fieldStepY = Math.round((Math.abs(options[2][3]-options[2][2])/testFieldDimY) * errorMath) / errorMath;

  var d = 2; // dimension
  var a = options[5];
  var b = options[6];
  var c = options[7];

  for (var y = 0; y < testFieldDimY; y++) {
    var yPos = fieldStartY + y * fieldStepY;
    for (var x = 0; x < testFieldDimX; x++) {
      var xPos = fieldStartX + x * fieldStepX;
      var term1 = -a * Math.exp(-b * Math.sqrt((xPos * xPos + yPos * yPos) / d));
      var term2 = -Math.exp((Math.cos(c * xPos) + Math.cos(c * yPos)) / d);
      var value = term1 + term2 + a + Math.exp(1);
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function bukin_N6_TestField(options) {

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
      term1 = 100 * Math.sqrt(Math.abs(yPos - 0.01 * Math.pow(xPos, 2)));
      term2 = 0.01 * Math.abs(xPos + 10);
      var value = term1 + term2;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function crossInTray_TestField(options) {

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
      var value = -0.00001 * Math.pow((Math.abs(Math.sin(xPos) * Math.sin(yPos) * Math.exp(Math.abs(100 - (Math.sqrt(Math.pow(xPos, 2) + Math.pow(yPos, 2)) / Math.PI)))) + 1), 0.1);
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function dropWave_TestField(options) {

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
      var frac1 = 1 + Math.cos(12 * Math.sqrt(Math.pow(xPos, 2) + Math.pow(yPos, 2)));
      var frac2 = 0.5 * (Math.pow(xPos, 2) + Math.pow(yPos, 2)) + 2;
      var value = -frac1 / frac2;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function eggholder_TestField(options) {

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
      var term1 = -(yPos + 47) * Math.sin(Math.sqrt(Math.abs(yPos + xPos / 2 + 47)));
      var term2 = -xPos * Math.sin(Math.sqrt(Math.abs(xPos - (yPos + 47))));
      var value = term1 + term2;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}


/////////////////////////////////////////////////////////

function griewank_TestField(options) {

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[3];
  var testFieldDimY = options[4];

  var fieldStartX = options[2][0];
  var fieldStartY = options[2][2];
  var fieldStepX = Math.round((Math.abs(options[2][1]-options[2][0])/testFieldDimX) * errorMath) / errorMath;
  var fieldStepY = Math.round((Math.abs(options[2][3]-options[2][2])/testFieldDimY) * errorMath) / errorMath;

  // 2D version
  for (var y = 0; y < testFieldDimY; y++) {
    var yPos = fieldStartY + y * fieldStepY;
    for (var x = 0; x < testFieldDimX; x++) {
      var xPos = fieldStartX + x * fieldStepX;
      var sum = Math.pow(xPos, 2) / 4000 + Math.pow(yPos, 2) / 4000;
      var prod = Math.cos(xPos / Math.sqrt(1)) * Math.cos(yPos / Math.sqrt(2));
      var value = sum - prod + 1;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);

    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function holderTable_TestField(options) {

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
      var fact1 = Math.sin(xPos) * Math.cos(yPos);
      var fact2 = Math.exp(Math.abs(1 - Math.sqrt(Math.pow(xPos, 2) + Math.pow(yPos, 2)) / Math.PI));
      var value = -Math.abs(fact1 * fact2);
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];

}

/////////////////////////////////////////////////////////

function langermann_TestField(options) {

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[3];
  var testFieldDimY = options[4];

  var fieldStartX = options[2][0];
  var fieldStartY = options[2][2];
  var fieldStepX = Math.round((Math.abs(options[2][1]-options[2][0])/testFieldDimX) * errorMath) / errorMath;
  var fieldStepY = Math.round((Math.abs(options[2][3]-options[2][2])/testFieldDimY) * errorMath) / errorMath;

  var vec_c = options[5];
  var mat_A = options[6];

  for (var y = 0; y < testFieldDimY; y++) {
    var yPos = fieldStartY + y * fieldStepY;
    for (var x = 0; x < testFieldDimX; x++) {
      var xPos = fieldStartX + x * fieldStepX;
      var value = 0;
      for (var i = 0; i < vec_c.length; i++) {
        var innerVal = Math.pow((xPos - mat_A[0][i]), 2) + Math.pow((yPos - mat_A[1][i]), 2);
        value += vec_c[i] * Math.exp(-innerVal / Math.PI) * Math.cos(Math.PI * innerVal);
      }
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function levy_TestField(options) {

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
      var weightX = 1 + (xPos - 1) / 4;
      var weightY = 1 + (yPos - 1) / 4;
      var term1 = Math.pow(Math.sin(Math.PI * weightX), 2);
      var term3 = Math.pow((weightY - 1), 2) * (1 + Math.pow(Math.sin(2 * Math.PI * weightY), 2));
      var term2 = Math.pow((weightX - 1), 2) * Math.pow(1 + 10 * (Math.sin(Math.PI * weightX + 1)), 2) + Math.pow((weightY - 1), 2) * Math.pow(1 + 10 * (Math.sin(Math.PI * weightY + 1)), 2);
      var value = term1 + term2 + term3;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function levyN13_TestField(options) {

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
      var term1 = Math.pow(Math.sin(3 * Math.PI * xPos), 2);
      var term2 = Math.pow((xPos - 1), 2) * Math.pow(1 + (Math.sin(3 * Math.PI * yPos)), 2);
      var term3 = Math.pow((yPos - 1), 2) * Math.pow(1 + (Math.sin(2 * Math.PI * yPos)), 2);
      var value = term1 + term2 + term3;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}



/////////////////////////////////////////////////////////

function rastrigin_TestField(options) {

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[3];
  var testFieldDimY = options[4];

  var fieldStartX = options[2][0];
  var fieldStartY = options[2][2];
  var fieldStepX = Math.round((Math.abs(options[2][1]-options[2][0])/testFieldDimX) * errorMath) / errorMath;
  var fieldStepY = Math.round((Math.abs(options[2][3]-options[2][2])/testFieldDimY) * errorMath) / errorMath;

  var d = 2;
  for (var y = 0; y < testFieldDimY; y++) {
    var yPos = fieldStartY + y * fieldStepY;
    for (var x = 0; x < testFieldDimX; x++) {
      var xPos = fieldStartX + x * fieldStepX;
      var term1 = Math.pow(xPos, 2) - 10 * Math.cos(2 * Math.PI * xPos);
      var term2 = Math.pow(yPos, 2) - 10 * Math.cos(2 * Math.PI * yPos);
      var value = 10 * d + term1 + term2;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}



/////////////////////////////////////////////////////////

function schaffer_N2_TestField(options) {

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
      var term1 = Math.pow(Math.sin(Math.pow(xPos, 2) - Math.pow(yPos, 2)), 2) - 0.5;
      var term2 = Math.pow(1 + 0.001 * (Math.pow(xPos, 2) + Math.pow(yPos, 2)), 2);
      var value = 0.5 + term1 / term2;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////

function schafferN4_TestField(options) {

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
      var term1 = Math.cos(Math.sin(Math.abs(Math.pow(xPos, 2) - Math.pow(yPos, 2)))) - 0.5;
      var term2 = Math.pow(1 + 0.001 * (Math.pow(xPos, 2) + Math.pow(yPos, 2)), 2);
      var value = 0.5 + term1 / term2;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}



/////////////////////////////////////////////////////////

function schwefel_TestField(options) {

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[3];
  var testFieldDimY = options[4];

  var fieldStartX = options[2][0];
  var fieldStartY = options[2][2];
  var fieldStepX = Math.round((Math.abs(options[2][1]-options[2][0])/testFieldDimX) * errorMath) / errorMath;
  var fieldStepY = Math.round((Math.abs(options[2][3]-options[2][2])/testFieldDimY) * errorMath) / errorMath;

  var d = 2;
  for (var y = 0; y < testFieldDimY; y++) {
    var yPos = fieldStartY + y * fieldStepY;
    for (var x = 0; x < testFieldDimX; x++) {
      var xPos = fieldStartX + x * fieldStepX;
      var term1 = xPos * Math.sin(Math.sqrt(Math.abs(xPos)));
      var term2 = yPos * Math.sin(Math.sqrt(Math.abs(yPos)));
      var value = 418.9829 * d - (term1 + term2);
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }
  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}



/////////////////////////////////////////////////////////

function shubert_TestField(options) {

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
      var term1 = 0;
      var term2 = 0;
      for (var i = 1; i <= 5; i++) {
        term1 += i * Math.cos((i + 1) * xPos + i);
        term2 += i * Math.cos((i + 1) * yPos + i);
      }
      var value = term1 * term2;
      positions.push([xPos, yPos]);
      testFieldVal.push(value);
    }
  }

  return [testFieldDimX, testFieldDimY, testFieldVal, positions];
}

/////////////////////////////////////////////////////////
