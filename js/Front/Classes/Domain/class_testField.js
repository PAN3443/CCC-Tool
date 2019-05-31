////////////////////////////////////////////////
// ------------ Class Domain ---------------//
////////////////////////////////////////////////

class class_TestField {
  constructor(dimensionX, dimensionY) {

    this.dimensionX = dimensionX;
    this.dimensionY = dimensionY;
    this.fieldValues = [];
    this.xPos = [];
    this.yPos = [];
    this.cellValues = false;
    /*this.xmax = -Infinity;
    this.xmin = Infinity;
    this.ymax = -Infinity;
    this.ymin = Infinity;*/
    this.vmax = -Infinity;
    this.vmin = Infinity;
    this.vdis = undefined;
    this.doAutoScale = false;
    this.scaleRangeMin = undefined;
    this.scaleRangeMax = undefined;
    this.scaleRangeDis = undefined;

    this.noiseValues = [];
    this.addNoise = false;
    this.noiseBehavior = undefined;
    this.noiseMaxChange = undefined;
    this.replaceNoiseFrom = undefined;
    this.replaceNoiseTill = undefined;

    for (var x = 0; x < dimensionX; x++) {
      var newArray = [];
      var newArray2 = [];
      var newArray3 = [];
      for (var y = 0; y < dimensionY; y++) {
        newArray.push(undefined);
        newArray2.push(undefined);
        newArray3.push(undefined);
      }
      this.fieldValues.push(newArray);
      this.xPos.push(newArray2);
      this.yPos.push(newArray3);
    }

  }

  generateNoiseField(noiseType,noiseBehavior,noiseMaxChange,noiseProportion,noiseDistribution,noiseScaling,replaceFrom,replaceTill){

      this.addNoise = true;
      this.replaceNoiseFrom = replaceFrom;
      this.replaceNoiseTill = replaceTill;
      this.noiseBehavior = noiseBehavior;
      this.noiseMaxChange = noiseMaxChange;
      this.noiseValues = new Array(this.dimensionX);;
      var checkData = new Array(this.dimensionX);

      for (var i = 0; i < this.dimensionX; i++) {
        checkData[i] = new Array(this.dimensionY).fill(false);
        this.noiseValues[i] = new Array(this.dimensionY).fill(undefined);
      }
      ////
      var numValues = this.dimensionX*this.dimensionY;
      switch (noiseType) {
        case 0:
          this.addNoise = false;
          return;

        case 1:

          var numNois = Math.round(numValues*noiseProportion);

          ///////////////////////////////
          // for noise Distirbution

          var useRandomPos = true;

          if(noiseProportion==1){
            useRandomPos=false;
          }


          if(useRandomPos){
            switch (noiseDistribution) {
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
                      tmpRand[i] = this.checkForMaximalChange((((tmpRand[i]-rMin)/dis-0.5)*2));
                      noHit=true;
                      while (noHit) {
                        var rXPos = getRandomInt(0, this.dimensionX);
                        var rYPos = getRandomInt(0, this.dimensionY);
                        var noHit = true;
                        this.noiseValues[rXPos][rYPos]=tmpRand[i];
                        checkData[rXPos][rYPos] = true;
                        noHit=false;
                      }
                    }
                }
                break;

                case 2: case 3: case 4:
                var type = noiseDistribution-2;
                for (var i = 0; i < numNois; i++) {
                  var rand = this.checkForMaximalChange((rand_beta(type)-0.5)*2);
                  noHit=true;
                  while (noHit) {
                    var rXPos = getRandomInt(0, this.dimensionX);
                    var rYPos = getRandomInt(0, this.dimensionY);
                    var noHit = true;
                    this.noiseValues[rXPos][rYPos]=rand;
                    checkData[rXPos][rYPos] = true;
                    noHit=false;
                  }
                }
                break;
              default:
                  for (var i = 0; i < numNois; i++) {
                    var rand = this.checkForMaximalChange(getRandomArbitrary(-1,1));
                    noHit=true;
                    while (noHit) {
                      var rXPos = getRandomInt(0, this.dimensionX);
                      var rYPos = getRandomInt(0, this.dimensionY);
                      var noHit = true;
                      this.noiseValues[rXPos][rYPos]=rand;
                      checkData[rXPos][rYPos] = true;
                      noHit=false;
                    }
                  }
            }
          }
          else{

            switch (noiseDistribution) {
              case 1:
                  var rMax = -Infinity;
                  var rMin = Infinity;
                  for (var x = 0; x < this.dimensionX; x++) {
                    for (var y = 0; y < this.dimensionY; y++) {
                      var rand = randn_bm();
                      rMax = Math.max(rand, rMax);
                      rMin = Math.min(rand, rMin);
                      this.noiseValues[x][y] = rand;
                    }
                  }

                  var dis = Math.abs(rMax-rMin);
                  if(dis!=0){
                    for (var x = 0; x < this.dimensionX; x++) {
                      for (var y = 0; y < this.dimensionY; y++) {
                        /*checkData[x][y] = true;*/
                        this.noiseValues[x][y]=this.checkForMaximalChange((((this.noiseValues[x][y]-rMin)/dis-0.5)*2));
                      }
                    }
                }
                break;

                case 2: case 3: case 4:
                var type = noiseDistribution-2;
                for (var x = 0; x < this.dimensionX; x++) {
                  for (var y = 0; y < this.dimensionY; y++) {
                    var rand = this.checkForMaximalChange((rand_beta(type)-0.5)*2);
                    /*checkData[x][y] = true;*/
                    this.noiseValues[x][y]=rand;
                  }
                }
                break;
              default:
                for (var x = 0; x < this.dimensionX; x++) {
                  for (var y = 0; y < this.dimensionY; y++) {
                    var rand = this.checkForMaximalChange(getRandomArbitrary(-1,1));
                    /*checkData[x][y] = true;*/
                    this.noiseValues[x][y]=rand;
                  }
                }
            }
          }


          break;
          case 2:
            noise.seed(Math.random());
            for (var x = 0; x < this.dimensionX; x++) {
              for (var y = 0; y < this.dimensionY; y++) {
                var rand = this.checkForMaximalChange(noise.simplex2(x/noiseScaling , y/noiseScaling));
                this.noiseValues[x][y] = rand;
              }
            }
          break;
        default:

      }

  }


  generateNoiseExampleImage(){

    var simData = new Array(this.dimensionX);
    for (var i = 0; i < this.dimensionX; i++){
      var ratio = i/(this.dimensionX-1);
      simData[i] = new Array(this.dimensionY).fill(ratio*255);
    }
    /////////////// add noise to sim data ///////////////
    for (var x = 0; x < this.dimensionX; x++) {
      for (var y = 0; y < this.dimensionY; y++) {
        var index = y*this.dimensionX+x;
        if(this.noiseValues[x][y]!=undefined){
          var newVal = 255*this.noiseValues[x][y];
          switch (this.noiseBehavior) {
            case 0:
              simData[x][y] += (simData[x][y]*this.noiseValues[x][y]);
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
    //////////////////////////////////
    var imgData = new ImageData(this.dimensionX, this.dimensionY);
    for (var x = 0; x < this.dimensionX; x++) {

      for (var y = 0; y < this.dimensionY; y++) {

          var index = (x + y * this.dimensionX) * 4;

          imgData.data[index + 0] = Math.round(simData[x][y]); // r
          imgData.data[index + 1] = Math.round(simData[x][y]); // g
          imgData.data[index + 2] = Math.round(simData[x][y]); // b
          imgData.data[index + 3] = 255; //a


      }

    }

    return imgData;
  }

  generateNoiseDistributionHisto(){
    var numBars = 50;
    var hitogram = new Array(numBars).fill(0.0);
    var maxHisto = 0;

    var step = undefined;

    if(this.noiseBehavior==2){
      step = Math.round((1.0/numBars) * errorMath) / errorMath;
    }
    else {
      step = Math.round((2.0/numBars) * errorMath) / errorMath;
    }


    for (var x = 0; x < this.dimensionX; x++) {
      for (var y = 0; y < this.dimensionY; y++) {

      if(this.noiseValues[x][y]==undefined)
      continue;

      var index = undefined;

      if(this.noiseBehavior==2){
        index = Math.round((this.noiseValues[x][y])/step)-1;
      }
      else {
        index = Math.round((this.noiseValues[x][y]+1)/step)-1;
      }

      if(index==-1)
        index++;

      hitogram[index]++;
      maxHisto = Math.max(maxHisto,hitogram[index]);
    }
  }

  for (var j = 0; j < hitogram.length; j++){
    hitogram[j] = hitogram[j]/maxHisto;
  }

  return hitogram;

  }

  checkForMaximalChange(random){
      /*if(Math.abs(random)<this.noiseMaxChange)
        return random;

      var newRandom = this.noiseMaxChange;

      if(random<0)
        newRandom *= -1;

      return newRandom;*/

      if(this.noiseBehavior==2){
        return (random+1)/2;// * this.noiseMaxChange;
      }
      else{
        /*if(noiseType==2){
          return (random-0.5)*2* this.noiseMaxChange; // make 0,1 -> -1,1
        }
        else{*/
          return random * this.noiseMaxChange;
        //}

      }

  }

  setAutoScale(bool){
    this.doAutoScale = bool;
  }

  getAutoScale(){
    return this.doAutoScale;
  }

  setScaleRange(min,max){
    this.scaleRangeMin = min;
    this.scaleRangeMax = max;
    this.scaleRangeDis = Math.abs(this.scaleRangeMax-this.scaleRangeMin);
  }

  setField(data){
    this.dimensionX = data[0];
    this.dimensionY = data[1];
    this.fieldValues = [];
    this.xPos = [];
    this.yPos = [];
    this.vmax = -Infinity;
    this.vmin = Infinity;

    for (var x = 0; x < this.dimensionX; x++) {
      var newArray = [];
      var newArray2 = [];
      var newArray3 = [];
      for (var y = 0; y < this.dimensionY; y++) {

        var index = y*this.dimensionX+x;
        if(data[2][index]!=undefined){
          this.vmax = Math.max(this.vmax,data[2][index]);
          this.vmin = Math.min(this.vmin,data[2][index]);
        }
        newArray.push(data[2][index]);
        newArray2.push(data[3][index][0]);
        newArray3.push(data[3][index][1]);
      }
      this.fieldValues.push(newArray);
      this.xPos.push(newArray2);
      this.yPos.push(newArray3);
    }
    this.vdis = Math.abs(this.vmax-this.vmin);
  }

  setCellValues(bool){
    this.cellValues=bool;
  }

  getCellValues(){
    return this.cellValues;
  }

  /*setFieldValue(x,y,value,color,greyRGB,xPos,yPos){
    this.xmax = Math.max(this.xmax,xPos);
    this.xmin = Math.min(this.xmin,xPos);
    this.ymax = Math.max(this.ymax,yPos);
    this.ymin = Math.min(this.ymin,yPos);
    this.vmax = Math.max(this.vmax,value);
    this.vmin = Math.min(this.vmin,value);

    this.fieldValues[x][y] = value;
    this.fieldColors[x][y] = color;
    this.fieldGreyColors[x][y] = greyRGB;
    this.xPos[x][y] = xPos;
    this.yPos[x][y] = yPos;
  }*/

  getRatioFieldValue(x,y){

    var result = this.fieldValues[x][y];

    if(this.addNoise && this.noiseValues[x][y]!=undefined){

      var replaceDis =  this.replaceNoiseTill-this.replaceNoiseFrom;
      var tmpValueDis = this.vmax-this.vmin;

      switch (this.noiseBehavior) {
        case 0:
        case 1:

          var amount = undefined;

          if(this.noiseBehavior==0)
            amount = result*this.noiseValues[x][y];
          else
            amount = this.noiseValues[x][y]*tmpValueDis;

          var newVal = result + amount;

          if(amount==undefined || newVal==undefined)
            break;

          var stopper = 0;

          if(newVal>this.vmax)
            newVal=this.vmax;

          if(newVal<this.vmin)
            newVal=this.vmin;

          /*while(newVal>this.vmax || newVal<this.vmin){
            amount /=2;
            newVal = result + amount;
            stopper++;
            if(stopper==1000)
              break;
          }*/
          result = newVal
        break;
        case 2:
          result = replaceDis*this.noiseValues[x][y]+this.replaceNoiseFrom; //(this.noiseValues[x][y]*tmpValueDis)+this.vmin;
        break;
      }//switch
    }//if*/

    return (result-this.vmin)/(this.vmax-this.vmin);
  }

  getFieldValue(x,y){

    var result = undefined;
    if(this.doAutoScale){
      var valueRatio = (this.fieldValues[x][y]-this.vmin)/this.vdis;
      result = this.scaleRangeMin+this.scaleRangeDis*valueRatio;
    }
    else{
      result = this.fieldValues[x][y];
    }


    if(this.addNoise && this.noiseValues[x][y]!=undefined){

      var replaceDis =  this.replaceNoiseTill-this.replaceNoiseFrom;
      var tmpValueDis = this.vmax-this.vmin;

      switch (this.noiseBehavior) {
        case 0:
        case 1:

          var amount = undefined;

          if(this.noiseBehavior==0)
            amount = result*this.noiseValues[x][y];
          else
            amount = this.noiseValues[x][y]*tmpValueDis;

          var newVal = result + amount;

          if(amount==undefined || newVal==undefined)
            break;

          var stopper = 0;

          if(newVal>this.vmax)
            newVal=this.vmax;

          if(newVal<this.vmin)
            newVal=this.vmin;

          /*while(newVal>this.vmax || newVal<this.vmin){
            amount /=2;
            newVal = result + amount;
            stopper++;
            if(stopper==1000)
              break;
          }*/


          result = newVal
        break;
        case 2:
          result = replaceDis*this.noiseValues[x][y]+this.replaceNoiseFrom; //(this.noiseValues[x][y]*tmpValueDis)+this.vmin;
        break;
      }//switch
    }//if*/

    return result;

  }



  getXPos(x,y){
    return this.xPos[x][y];
  }

  getYPos(x,y){
    return this.yPos[x][y];
  }

  getYDim(){
    return this.dimensionY;
  }

  getXDim(){
    return this.dimensionX;
  }

  getYDim(){
    return this.dimensionY;
  }

  getTHREEPointArray(){
    var newArray = [];


    for (var y = 0; y < this.dimensionY; y++) {
      for (var x = 0; x < this.dimensionX; x++) {
        newArray.push(new THREE.Vector3(this.xPos[x][y],this.yPos[x][y],0))
      }
    }

    return newArray;
  }

  getTHREEPointArray3D(scalefactor3DTest){

    var newArray = [];

    for (var y = 0; y < this.dimensionY; y++) {
      for (var x = 0; x < this.dimensionX; x++) {

        var value = this.fieldValues[x][y];

        if(this.addNoise && this.noiseValues[x][y]!=undefined){

          var replaceDis =  this.replaceNoiseTill-this.replaceNoiseFrom;
          var tmpValueDis = this.vmax-this.vmin;

          switch (this.noiseBehavior) {
            case 0:
            case 1:

              var amount = undefined;

              if(this.noiseBehavior==0)
                amount = value*this.noiseValues[x][y];
              else
                amount = this.noiseValues[x][y]*tmpValueDis;

              var newVal = value + amount;

              if(amount==undefined || newVal==undefined)
                break;

              var stopper = 0;

              if(newVal>this.vmax)
                newVal=this.vmax;

              if(newVal<this.vmin)
                newVal=this.vmin;

              /*while(newVal>this.vmax || newVal<this.vmin){
                amount /=2;
                newVal = value + amount;
                stopper++;
                if(stopper==1000)
                  break;
              }*/

              value = newVal
            break;
            case 2:
              value = replaceDis*this.noiseValues[x][y]+this.replaceNoiseFrom; //(this.noiseValues[x][y]*tmpValueDis)+this.vmin;
            break;
          }//switch
        }//if*/

        newArray.push(new THREE.Vector3(this.xPos[x][y],this.yPos[x][y],(value-this.vmin)*scalefactor3DTest));
      }
    }


    return newArray;
  }


  getZPos(scalefactor3DTest, x,y){
    return this.fieldValues[x][y]*scalefactor3DTest;
  }


}
