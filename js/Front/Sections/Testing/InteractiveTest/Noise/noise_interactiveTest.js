

function calcNoise(){


  var dimX = parseInt(document.getElementById("id_TestPage_GridDimX").value); //10;//
  var dimY = parseInt(document.getElementById("id_TestPage_GridDimY").value); //10;//

  var simData = new Array(dimX);
  var checkData = new Array(dimX);
  for (var i = 0; i < dimX; i++) {
    var ratio = i/(dimX-1);

    simData[i] = new Array(dimY).fill(ratio*255);
    checkData[i] = new Array(dimY).fill(false);
  }

//////////////////////////////////
//// noise
  var numValues = dimX*dimY;
  var randomArray = new Array(dimX*dimY).fill(undefined);
  switch (document.getElementById("id_Test_NoiseType").selectedIndex) {
    case 1:

      var proportion = parseFloat(document.getElementById("id_Test_NoiseProportion").value);
      var numNois = Math.round(numValues*proportion);

      ///////////////////////////////
      // for noise Distirbution

      var useRandomPos = true;

      if(proportion==1){
        useRandomPos=false;
      }


      if(useRandomPos){
        switch (document.getElementById("id_Test_NoiseDistribution").selectedIndex) {
          case 1:
              var rMax = -Infinity;
              var rMin = Infinity;
              var tmpRand = new Array(numNois);
              for (var i = 0; i < numNois; i++) {
                var rand = randn_bm();
                rMax = Math.max(rand, rMax);
                rMin = Math.min(rand, rMin);
                tmpRand[i] = rand;
              }

              var dis = Math.abs(rMax-rMin);
              if(dis!=0){
                for (var i = 0; i < numNois; i++) {
                  tmpRand[i] = checkForMaximalChange((((tmpRand[i]-rMin)/dis-0.5)*2));
                  noHit=true;
                  while (noHit) {
                    var rXPos = getRandomInt(0, dimX);
                    var rYPos = getRandomInt(0, dimY);
                    var noHit = true;
                    var index = rYPos*dimX+rXPos;
                    randomArray[index]=tmpRand[i];
                    checkData[rXPos][rYPos] = true;
                    noHit=false;
                  }
                }
            }
            break;

            case 2: case 3: case 4:
            var type = document.getElementById("id_Test_NoiseDistribution").selectedIndex-2;
            for (var i = 0; i < numNois; i++) {
              var rand = checkForMaximalChange((rand_beta(type)-0.5)*2);
              noHit=true;
              while (noHit) {
                var rXPos = getRandomInt(0, dimX);
                var rYPos = getRandomInt(0, dimY);
                var noHit = true;
                var index = rYPos*dimX+rXPos;
                randomArray[index]=rand;
                checkData[rXPos][rYPos] = true;
                noHit=false;
              }
            }
            break;
          default:
              for (var i = 0; i < numNois; i++) {
                var rand = checkForMaximalChange(getRandomArbitrary(-1,1));
                noHit=true;
                while (noHit) {
                  var rXPos = getRandomInt(0, dimX);
                  var rYPos = getRandomInt(0, dimY);
                  var noHit = true;
                  var index = rYPos*dimX+rXPos;
                  randomArray[index]=rand;
                  checkData[rXPos][rYPos] = true;
                  noHit=false;
                }
              }
        }
      }
      else{

        switch (document.getElementById("id_Test_NoiseDistribution").selectedIndex) {
          case 1:
              var rMax = -Infinity;
              var rMin = Infinity;
              var tmpRand = new Array(numNois);
              for (var i = 0; i < numNois; i++) {
                var rand = randn_bm();
                rMax = Math.max(rand, rMax);
                rMin = Math.min(rand, rMin);
                tmpRand[i] = rand;
              }

              var dis = Math.abs(rMax-rMin);
              if(dis!=0){
                for (var i = 0; i < numNois; i++) {
                  tmpRand[i] = checkForMaximalChange((((tmpRand[i]-rMin)/dis-0.5)*2));
                  /*var rYPos = (i / dimX) >> 0;
                  var rXPos = i - (rYPos * dimY);
                  checkData[rXPos][rYPos] = true;*/
                  randomArray[i]=tmpRand[i];
                }
            }
            break;

            case 2: case 3: case 4:
            var type = document.getElementById("id_Test_NoiseDistribution").selectedIndex-2;
            for (var i = 0; i < numNois; i++) {
              var rand = checkForMaximalChange((rand_beta(type)-0.5)*2);
              /*var rYPos = (i / dimX) >> 0;
              var rXPos = i - (rYPos * dimY);
                checkData[rXPos][rYPos] = true;*/
                randomArray[i]=rand;
            }
            break;
          default:
              for (var i = 0; i < numNois; i++) {
                var rand = checkForMaximalChange(getRandomArbitrary(-1,1));
                /*var rYPos = (i / dimX) >> 0;
                var rXPos = i - (rYPos * dimY);

                console.log(rYPos,rXPos);
                  checkData[rXPos][rYPos] = true;*/
                  randomArray[i]=rand;
              }
        }
      }


      break;
      case 2:
        noise.seed(Math.random());
        randomArray = new Array(dimX*dimY);
        var scaling = parseInt(document.getElementById("id_Test_NoiseScaling").value);
        for (var x = 0; x < dimX; x++) {
          for (var y = 0; y < dimY; y++) {
            var index = y*dimX+x;
            var rand = checkForMaximalChange(noise.simplex2(x/scaling , y/scaling));
            randomArray[index] = rand;
          }
        }
      break;
    default:

  }

  //////////////////////////////////////////////
  /// Behavior

  for (var x = 0; x < dimX; x++) {
    for (var y = 0; y < dimY; y++) {
      var index = y*dimX+x;
      if(randomArray[index]!=undefined){
        var newVal = 255*randomArray[index];
        switch (document.getElementById("id_Test_NoiseBehavior").selectedIndex) {
          case 0:
            simData[x][y] += (simData[x][y]*randomArray[index]);
            if(simData[x][y]>255)
              simData[x][y]=255;

              if(simData[x][y]<0)
                simData[x][y]=0;
          break;
          case 1:
          simData[x][y] += newVal;
            if(simData[x][y]>255)
              simData[x][y]=255;

              if(simData[x][y]<0)
                simData[x][y]=0;
          break;
          case 2:
            simData[x][y] = newVal;
          break;
        }
      }

    }
  }



  //////////////////////////////////////////////
  /// Draw

  var canvasPlot = document.getElementById("id_TestPage_newTestNoiseCanvas");
  var canvasCtx = canvasPlot.getContext("2d");

  canvasPlot.width = dimX;
  canvasPlot.height = dimY;

 canvasCtx.mozImageSmoothingEnabled = false;
 canvasCtx.webkitImageSmoothingEnabled = false;
 canvasCtx.msImageSmoothingEnabled = false;
 canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
 canvasCtx.oImageSmoothingEnabled = false;

  var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height);

  for (var x = 0; x < canvasPlot.width; x++) {

    for (var y = 0; y < canvasPlot.height; y++) {

        var index = (x + y * canvasPlot.width) * 4;

        canvasData.data[index + 0] = Math.round(simData[x][y]); // r
        canvasData.data[index + 1] = Math.round(simData[x][y]); // g
        canvasData.data[index + 2] = Math.round(simData[x][y]); // b
        canvasData.data[index + 3] = 255; //a


    }

  }


  canvasCtx.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;

  //////////////////// Draw Distribution (Histogram)

  var numOfBars = 50;
  var hitogram = new Array(numOfBars).fill(0.0);
  var maxHisto = 0;

  var step = undefined;

  if(document.getElementById("id_Test_NoiseBehavior").selectedIndex==2){
    step = Math.round((1.0/numOfBars) * errorMath) / errorMath;
  }
  else {
    step = Math.round((2.0/numOfBars) * errorMath) / errorMath;
  }

  for (var i = 0; i < randomArray.length; i++) {

    if(randomArray[i]==undefined)
    continue;

    var index = undefined;

    if(document.getElementById("id_Test_NoiseBehavior").selectedIndex==2){
      index = Math.round((randomArray[i])/step)-1;
    }
    else {
      index = Math.round((randomArray[i]+1)/step)-1;
    }

    if(index==-1)
      index++;

    hitogram[index]++;
    maxHisto = Math.max(maxHisto,hitogram[index]);
  }

  canvasPlot = document.getElementById("id_TestPage_newTestNoiseDistributionCanvas");
  var rect = canvasPlot.getBoundingClientRect();

  var rangeWidth = 25;
  canvasPlot.width = numOfBars*rangeWidth; //rect.width/numOfBars;
  canvasPlot.height = rect.height;

  var xStart = 0;
  var yStart = canvasPlot.height;

  var canvasCtx = canvasPlot.getContext("2d");
  canvasCtx.mozImageSmoothingEnabled = false;
  canvasCtx.webkitImageSmoothingEnabled = false;
  canvasCtx.msImageSmoothingEnabled = false;
  canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
  canvasCtx.oImageSmoothingEnabled = false;
  canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);


  var currentPos = 0;
  for (var j = 0; j < hitogram.length; j++) {
      var tmpHeight = Math.round((canvasPlot.height*(hitogram[j]/maxHisto)));
      canvasCtx.fillStyle="rgb(80,80,80)";
      canvasCtx.strokeStyle="black";
      canvasCtx.lineWidth=1;
      canvasCtx.fillRect(currentPos,canvasPlot.height-tmpHeight,rangeWidth,tmpHeight);
      currentPos+=rangeWidth;
  }

  // for worker

  testField_WorkerJSON.noiseField =  randomArray;

}


function checkForMaximalChange(random){
    var maxChangeFactor = parseFloat(document.getElementById("id_Test_NoiseMaxChange").value);

    /*if(Math.abs(random)<maxChangeFactor)
      return random;

    var newRandom = maxChangeFactor;

    if(random<0)
      newRandom *= -1;

    return newRandom;*/

    if(document.getElementById("id_Test_NoiseBehavior").selectedIndex==2){
      return (random+1)/2;// * maxChangeFactor;
    }
    else{
      /*if(document.getElementById("id_Test_NoiseType").selectedIndex==2){
        return (random-0.5)*2* maxChangeFactor; // make 0,1 -> -1,1
      }
      else{*/
        return random * maxChangeFactor;
      //}

    }

}
