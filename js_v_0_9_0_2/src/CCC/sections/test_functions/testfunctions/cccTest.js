function stepTestField(options){

    var positions = [];
    var testFieldVal = [];

    var testFieldDimX = ((options[1].length) * 2) + 1; // oldStep Image: (stepArray.length-1)*2+1; // nDim-1 = number of cells in x direction
    var testFieldDimY = options[1].length+1; // oldStep Image: stepArray.length+1; // mDim-1 = number of cells in y direction

    var dis = Math.round((globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1) - globalCMS1.getRefPosition(0)) * errorMath) / errorMath; // = version with rational number Steps
    for (var y = 0; y < testFieldDimY; y++) {
      for (var x = 0; x < testFieldDimX; x++) {
        testFieldVal.push(undefined);
        positions.push([(x / 2), y]);
      }
    }

    var currentValIndex = 0;
    for (var i = 0; i < options[1].length; i++) {
      var value = undefined;
      if (options[0]) {
        value = Math.round((globalCMS1.getRefPosition(0) + (options[1][i] * dis)) * errorMath) / errorMath; // = version with rational number Steps
      } else {
        value = options[1][i];
      }
      var currentXPos = 1;
      for (var y = 0; y < (testFieldDimY - 1); y++) {
        var tmpIndex = (y * testFieldDimX) + currentValIndex;
        testFieldVal[tmpIndex] = value;
        tmpIndex = (i * testFieldDimX) + currentXPos;
        testFieldVal[tmpIndex] = value;
        currentXPos += 2;
      }
      currentValIndex += 2;
    }

    return [testFieldDimX,testFieldDimY,testFieldVal,positions];

}

function littleBitTestField(options){

    var positions = [];
    var testFieldVal = [];

    var testFieldDimX = (options[6]+options[6]+1)*options[5];
    var testFieldDimY = options[7];

    var currentMax = undefined;
    var amountOfGradient = undefined;
    var currentY = undefined;
    var currentX = undefined;

    var minSink = options[3];
    var maxSink = options[4];

    var startVal = options[1];
    var endVal = options[2];

    if (options[0]) {
      var tmpDis = globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1) - globalCMS1.getRefPosition(0);
      maxSink = Math.round((options[4] * tmpDis) * errorMath) / errorMath;
      minSink = Math.round((options[3] * tmpDis) * errorMath) / errorMath;
      startVal = Math.round((options[1] * tmpDis+globalCMS1.getRefPosition(0)) * errorMath) / errorMath;
      endVal = Math.round((options[2] * tmpDis+globalCMS1.getRefPosition(0)) * errorMath) / errorMath;
    }

    var valDifference = endVal - startVal;

    var sinkStep = Math.round(((maxSink - minSink) / (options[6] - 1)) * errorMath) / errorMath;
    var numberOfAreas = options[6] + options[6] + 1;

    for (var y = 0; y < testFieldDimY; y++) {

      var currentY = y / (testFieldDimY - 1);
      var preValue = Math.round((startVal + currentY * valDifference) * errorMath) / errorMath;

      for (var a = 0; a < numberOfAreas; a++) {

        var times = Math.round((a * 0.5 + 0.5 - 1) * errorMath) / errorMath; // with numberOfAreas*0.5+0.5 -> 1=1, 3=2, 5=3, 7=5, 9=5;
        var currentSink = Math.round(Math.abs(minSink + times * sinkStep) * errorMath) / errorMath;
        var currentSinkAmplitutde = Math.round(currentSink / 2 * errorMath) / errorMath;

        /*if(y==0 && a%2!=0)
          console.log(times,currentSink);*/

        for (var p = 0; p < options[5]; p++) {

          var value = preValue; // NO SINK
          if (a % 2 != 0) {
            // SINK
            var currentDegree = p / (options[5] - 1) * 2 * Math.PI;
            value = Math.round((value + currentSinkAmplitutde * Math.cos(currentDegree) - currentSinkAmplitutde) * errorMath) / errorMath;
          }

          var x = a * (options[5]) + p;
          positions.push([x, y]);
          testFieldVal.push(value);

        }

      }

    }

    return [testFieldDimX,testFieldDimY,testFieldVal,positions];

}

function tresholdTestField(options){

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[6];
  var testFieldDimY = options[7];

  var minValue = options[3];
  var treshValue = options[4];
  var maxValue = options[5];

  if (options[0]) {
    var tmpDis = globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1) - globalCMS1.getRefPosition(0);
    minValue = Math.round((globalCMS1.getRefPosition(0) + options[3] * tmpDis) * errorMath) / errorMath;
    treshValue = Math.round((globalCMS1.getRefPosition(0) + options[4] * tmpDis) * errorMath) / errorMath;
    maxValue = Math.round((globalCMS1.getRefPosition(0) + options[5] * tmpDis) * errorMath) / errorMath;
  }

  var currentY = undefined;
  var currentX = undefined;

  for (var y = 0; y < testFieldDimY; y++) {

    currentY = Math.round((y / (testFieldDimY - 1)) * errorMath) / errorMath;

    var currentYValueMax = maxValue - currentY * (maxValue - treshValue);
    var currentYValueMin = minValue + currentY * (treshValue - minValue);

    for (var x = 0; x < testFieldDimX; x++) {

      var currentX = Math.round((-1 + (x / (testFieldDimX - 1)) * 2) * errorMath) / errorMath;

      var value = undefined;

      if (currentX <= 0) {
        switch (options[1]) {
          case 0: // Y-Type = linear
            value = Math.round((treshValue + (treshValue - currentYValueMin) * (currentX)) * errorMath) / errorMath;
            break;
          case 1: // Y-Type =
            if (options[2] % 2 == 0)
              value = treshValue + (treshValue - currentYValueMin) * -1 * (Math.pow(currentX, options[2]));
            else
              value = treshValue + (treshValue - currentYValueMin) * (Math.pow(currentX, options[2]));
            break;

          case 2: // Y-Type =
            value = treshValue + (treshValue - currentYValueMin) * (Math.pow(currentX + 1, options[2]) - 1);
            break;

        }
      } else {
        switch (options[1]) {
          case 0: // Y-Type = linear
            value = Math.round((treshValue + (currentYValueMax - treshValue) * (currentX)) * errorMath) / errorMath;
            break;
          case 1: // Y-Type =
            value = treshValue + (currentYValueMax - treshValue) * (Math.pow(currentX, options[2]));
            break;
          case 2: // Y-Type =
            if (options[2] % 2 == 0)
              value = treshValue + (currentYValueMax - treshValue) * -1 * (Math.pow(currentX - 1, options[2]) - 1);
            else
              value = treshValue + (currentYValueMax - treshValue) * (Math.pow(currentX - 1, options[2]) + 1);
            break;

        }
      }

      //console.log(value);
      positions.push([(currentX / 2), currentY]);
      testFieldVal.push(value);

    }

  }

  return [testFieldDimX,testFieldDimY,testFieldVal,positions];
}

function ridgeValleyTestField(options){

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[7];
  var testFieldDimY = options[8];

  var minValue = options[1];
  var maxValue = options[2];
  var currentMax = undefined;
  var amountOfGradient = undefined;
  var currentY = undefined;
  var currentX = undefined;

  if(options[0]){
    minValue = Math.round((globalCMS1.getRefPosition(0) + options[1] * (globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1) - globalCMS1.getRefPosition(0))) * errorMath) / errorMath;
    maxValue = Math.round((globalCMS1.getRefPosition(0) + options[2] * (globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1) - globalCMS1.getRefPosition(0))) * errorMath) / errorMath;
  }


  var isRidge = true; // valley
  if (maxValue < minValue) {
    isRidge = false; // ridge*/
  }

  for (var y = 0; y < testFieldDimY; y++) {

    currentY = Math.round((y / (testFieldDimY - 1)) * errorMath) / errorMath;

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


    for (var x = 0; x < testFieldDimX; x++) {

      var currentX = Math.round((-1 + (x / (testFieldDimX - 1)) * 2) * errorMath) / errorMath;

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

      positions.push([(currentX / 2), currentY]);
      testFieldVal.push(value);
    }

  }

  return [testFieldDimX,testFieldDimY,testFieldVal,positions];
}

function gradientTestField(options){

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[7];
  var testFieldDimY = options[8];

  var minValue = options[1];
  var maxValue = options[2];
  var currentMax = undefined;
  var amountOfGradient = undefined;
  var currentY = undefined;
  var currentX = undefined;

  if(options[0]){
    minValue = Math.round((globalCMS1.getRefPosition(0) + options[1] * (globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1) - globalCMS1.getRefPosition(0))) * errorMath) / errorMath;
    maxValue = Math.round((globalCMS1.getRefPosition(0) + options[2] * (globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1) - globalCMS1.getRefPosition(0))) * errorMath) / errorMath;
  }

  for (var y = 0; y < testFieldDimY; y++) {

    currentY = Math.round((y / (testFieldDimY - 1)) * errorMath) / errorMath;

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


    for (var x = 0; x < testFieldDimX; x++) {

      var currentX = Math.round((x / (testFieldDimX - 1)) * errorMath) / errorMath;

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

      //console.log(value);
      positions.push([currentX, currentY]);
      testFieldVal.push(value);
    }

  }

  return [testFieldDimX,testFieldDimY,testFieldVal,positions];
}

function extremaTestField(options){

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[4];
  var testFieldDimY = options[5];

  var xStart = -1;
  var yStart = -1;
  var xStep = 2 / (testFieldDimX - 1);
  var yStep = 2 / (testFieldDimY - 1);


  var currentX = undefined;
  var currentY = undefined;
  for (var y = 0; y < testFieldDimY; y++) {

    currentY = yStart + y * yStep;

    for (var x = 0; x < testFieldDimX; x++) {

      currentX = xStart + x * xStep;

      var value = Math.round((options[0] * Math.pow(currentX, 2) + options[1] * Math.pow(currentY, 2) + options[2]) * errorMath) / errorMath; // x-1 because we dont

      positions.push([currentX, currentY]);
      testFieldVal.push(value);
    }

  }

  return [testFieldDimX,testFieldDimY,testFieldVal,positions];
}

function frequencyTestField(options){

  //options[0]; // ratio
  //options[1]; // sin or cos

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[6];
  var testFieldDimY = options[7];

  var startVal = options[4];
  var endVal = options[5];

  if(options[0]){
    startVal = Math.round((globalCMS1.getRefPosition(0) + options[4] * (globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1) - globalCMS1.getRefPosition(0))) * errorMath) / errorMath;
    endVal = Math.round((globalCMS1.getRefPosition(0) + options[5] * (globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1) - globalCMS1.getRefPosition(0))) * errorMath) / errorMath;
  }

  var amplitude = Math.round(((startVal - endVal) / 2.0) * errorMath) / errorMath;
  var m = Math.round((startVal - amplitude) * errorMath) / errorMath;

  var numberDoublings = options[3];

  var currentX = undefined;
  var currentY = undefined;
  var value = undefined;

  var startFrequency = options[2];

  var harmonicSeries = [];
  var sum=0;

  /// init start of the harmonic series depending on the start frequency
  if(startFrequency==1)
      harmonicSeries = [0];
  else{
    for(var i=1; i=startFrequency; i++)
    {
      sum+=1/i;
    }
    var tmp = sum;
    harmonicSeries.push(tmp)
  }

  for(var i=startFrequency; i<=(numberDoublings+1); i++)
  {
    sum+=1/i;
    var tmp = sum;
    harmonicSeries.push(tmp)
  }

  var maxHarmonic = harmonicSeries[harmonicSeries.length-1];
  var minHarmonic = harmonicSeries[0];

  for (var y = 0; y < testFieldDimY; y++) {

    currentY = y/(testFieldDimY-1);

    var currentAmplitude = amplitude*(1.0-currentY);
    var yPos = currentX*(maxHarmonic-minHarmonic)+minHarmonic;

    for (var x = 0; x < testFieldDimX; x++) {

      currentX = x/(testFieldDimX-1);

      var xPos = currentX*maxHarmonic;
      var xsubPos = 0;
      var j = 0;

      for (var i = 1; i < harmonicSeries.length; i++) {
          if(xPos<=harmonicSeries[i]){
            xsubPos = xPos-harmonicSeries[i-1];
            break;
          }
          else {
            j++;
          }
      }


      value = currentAmplitude * Math.sin( 2*Math.PI *(startFrequency+j)*xsubPos)+m;

      positions.push([currentX, currentY]);
      testFieldVal.push(value);
    }

  }

  return [testFieldDimX,testFieldDimY,testFieldVal,positions];

}

function topologyTestField(options){

  var positions = [];
  var testFieldVal = [];

  var testFieldDimX = options[0].length;
  var testFieldDimY = options[0][0].length;

  for (var y = 0; y < testFieldDimY; y++) {

    for (var x = 0; x < testFieldDimX; x++) {

      var value = options[0][x][y];

      positions.push([x, y]);
      testFieldVal.push(value);

    }

  }

  return [testFieldDimX,testFieldDimY,testFieldVal,positions];
}
