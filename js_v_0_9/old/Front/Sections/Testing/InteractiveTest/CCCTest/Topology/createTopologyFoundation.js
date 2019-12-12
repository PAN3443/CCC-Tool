



function createPlaneFoundation(options){
  var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value); //10;//
  var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value); //10;//

  topologyField = new Array(dimX);
  for (var i = 0; i < dimX; i++) {
    topologyField[i] = new Array(dimY).fill(options[1]+0.0); // +0.0 because we want no reference
  }
}


function createGradientFoundation(options){

  var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value); //10;//
  var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value); //10;//

  topologyField = new Array(dimX);
  for (var i = 0; i < dimX; i++) {
    topologyField[i] = new Array(dimY).fill(0); // +0.0 because we want no reference
  }

  var minValue = options[1];
  var maxValue = options[2];
  var currentMax = undefined;
  var amountOfGradient = undefined;
  var currentY = undefined;
  var currentX = undefined;

  for (var y = 0; y < dimY; y++) {

    currentY = Math.round((y / (dimY - 1)) * errorMath) / errorMath;

    switch (options[5]) {
      case 0: // M-Type = linear
        //  gradient depends on y => g=M*(1-y); and on x <=0 positive x>0 negative
        currentMax = Math.round((minValue + (maxValue - minValue) * (currentY)) * errorMath) / errorMath;
        break;
      case 1: // M-Type = quad (hunch)
        if (options[6] % 2 == 0)
          currentMax = minValue + (maxValue - minValue) * (1 - Math.pow(currentY - 1, options[6]));
        else
          currentMax = minValue + (maxValue - minValue) * (1 + Math.pow(currentY - 1, options[6]));
        break;

      case 2: // M-Type = quad (crumb)
        // here we don't need to check if the exponend is 0 for modulo 2, because we only check values between 0 and 1
        currentMax = minValue + (maxValue - minValue) * (Math.pow(currentY, options[6]));
        break;

    }

    amountOfGradient = Math.round((minValue - currentMax) * errorMath) / errorMath; // Math.round(((maxValue-minValue)*(currentY)) * errorMath) / errorMath;


    for (var x = 0; x < dimX; x++) {

      var currentX = Math.round((x / (dimX - 1)) * errorMath) / errorMath;

      var value = undefined;

      switch (options[3]) {
        case 0: // m-Type = linear
          value = Math.round((minValue + (currentMax - minValue) * (currentX)) * errorMath) / errorMath;
          break;
        case 1: // m-Type = quad (arc)
          if (options[4] % 2 == 0)
            value = minValue + (currentMax - minValue) * (1 - Math.pow(currentX - 1, options[4]));
          else
            value = minValue + (currentMax - minValue) * (1 + Math.pow(currentX - 1, options[4]));
          break;
        case 2: // m-Type = quad (peak)
          value = minValue + (currentMax - minValue) * (Math.pow(currentX, options[4]));
          break;

      }

      topologyField[x][y]=value;
    }

  }
}

function createRidgeValleyFoundation(options){


  var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value); //10;//
  var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value); //10;//

  topologyField = new Array(dimX);
  for (var i = 0; i < dimX; i++) {
    topologyField[i] = new Array(dimY).fill(0); // +0.0 because we want no reference
  }

  var minValue = options[1];
  var maxValue = options[2];
  var currentMax = undefined;
  var amountOfGradient = undefined;
  var currentY = undefined;
  var currentX = undefined;


  var isRidge = true; // valley
  if (options[2] < options[1]) {
    isRidge = false; // ridge*/
  }

  for (var y = 0; y < dimY; y++) {

    currentY = Math.round((y / (dimY - 1)) * errorMath) / errorMath;

    //if(!isRidge)
    //currentY = 1-currentY;


    switch (options[5]) {
      case 0: // M-Type = linear
        //  gradient depends on y => g=M*(1-y); and on x <=0 positive x>0 negative
        currentMax = Math.round((minValue + (maxValue - minValue) * (currentY)) * errorMath) / errorMath;
        break;
      case 1: // M-Type = quad (hunch)

        if (options[6] % 2 == 0)
          currentMax = minValue + (maxValue - minValue) * (1 - Math.pow(currentY - 1, options[6]));
        else
          currentMax = minValue + (maxValue - minValue) * (1 + Math.pow(currentY - 1, options[6]));
        break;

      case 2: // M-Type = quad (crumb)
        // here we don't need to check if the exponend is 0 for modulo 2, because we only check values between 0 and 1
        currentMax = minValue + (maxValue - minValue) * (Math.pow(currentY, options[6]));
        break;

    }

    amountOfGradient = Math.round((minValue - currentMax) * errorMath) / errorMath; // Math.round(((maxValue-minValue)*(currentY)) * errorMath) / errorMath;


    for (var x = 0; x < dimX; x++) {

      var currentX = Math.round((-1 + (x / (dimX - 1)) * 2) * errorMath) / errorMath;

      var value = undefined;

      switch (options[3]) {
        case 0: // m-Type = linear
          if (currentX <= 0) {
            value = Math.round((currentMax + currentX * -1 * amountOfGradient) * errorMath) / errorMath;
          } else {
            value = Math.round((currentMax + currentX * amountOfGradient) * errorMath) / errorMath;
          }
          break;
        case 1: // m-Type = quad (arc)
          if (options[4] % 2 == 0 || currentX > 0)
            value = Math.round((amountOfGradient * Math.pow(currentX, options[4]) + currentMax) * errorMath) / errorMath;
          else {
            if (currentX <= 0) {
              value = Math.round((amountOfGradient * (Math.pow(currentX, options[4]) * -1) + currentMax) * errorMath) / errorMath;
            } else {
              value = Math.round((amountOfGradient * (Math.pow(currentX, options[4])) + currentMax) * errorMath) / errorMath;
            }
          }

          break;
        case 2: // m-Type = quad (peak)


          if (currentX <= 0) {
            value = Math.round((-1 * amountOfGradient * (Math.pow(1 + currentX, options[4])) + minValue) * errorMath) / errorMath;
          } else {
            if (options[4] % 2 == 0)
              value = Math.round((-1 * amountOfGradient * (Math.pow(currentX - 1, options[4])) + minValue) * errorMath) / errorMath;
            else
              value = Math.round((-1 * amountOfGradient * (Math.pow(1 - currentX, options[4])) + minValue) * errorMath) / errorMath;
          }

          break;

      }

      topologyField[x][y]=value;
    }


  }
}
function createExtremaFoundation(options){


  var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value); //10;//
  var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value); //10;//

  topologyField = new Array(dimX);
  for (var i = 0; i < dimX; i++) {
    topologyField[i] = new Array(dimY).fill(0); // +0.0 because we want no reference
  }

  var xStart = -1;
  var yStart = -1;
  var xStep = 2 / (dimX - 1);
  var yStep = 2 / (dimY - 1);

  var currentX = undefined;
  var currentY = undefined;
  for (var y = 0; y < dimY; y++) {

    currentY = yStart + y * yStep;

    for (var x = 0; x < dimX; x++) {

      currentX = xStart + x * xStep;

      var value = Math.round((options[1] * Math.pow(currentX, 2) + options[2] * Math.pow(currentY, 2) + options[3]) * errorMath) / errorMath; // x-1 because we dont

      topologyField[x][y]=value;
    }

  }

}
