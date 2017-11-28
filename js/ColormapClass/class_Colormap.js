////////////////////////////////////////////////
// ------------ Class Colormap ---------------//
////////////////////////////////////////////////

class xclassColorMap {

    constructor() {
    this.name = "";

    this.rgbColorArray = [];
    this.cielabColorArray = [];
    this.hsvColorArray = [];
    this.din99ColorArray = [];

    this.referenceRangeStart = 0;
    this.referenceRangeEnd = 0;
    this.positionPoints = [];
    this.positionKeys = []; //twin key, dual key, nil key, left key)
    this.distanceCIEDE2000 = [];
    this.distanceRGB = [];
    this.distanceHSV = [];
    this.distanceSumCIEDE2000 = 0;
    this.distanceSumRGB = 0;
    this.distanceSumHSV = 0;

    this.bandArray  = []; //
    this.default_NumberIntervals = 10;
    this.default_NumberIntervalPoints = 9;
    this.default_IntervalStepSize = 0.1;

  }

  createKeys(){

    this.positionKeys=[];
    var lastElementTwin = false;
    var lastElementLeft = false;

     for(var i = 0; i<this.positionPoints.length-1; i++){
        if(lastElementLeft==true){
            this.positionKeys.push("left key");
            lastElementLeft = false;
            continue;
        }
        if(lastElementTwin==true){
            this.positionKeys.push("twin key");
            lastElementTwin = false;
            continue;
        }
        if(i==0){
            if(this.rgbColorArray[i].getRGBString()===this.rgbColorArray[i+1].getRGBString()){
                this.positionKeys.push("nil key"); // start with constant colorband
            }
            else{
                this.positionKeys.push("right key"); // start with scaled colorband
            }
        }
        else{
            // twin/leftKey  or not
            if(this.positionPoints[i]==this.positionPoints[i+1]){
                if(i+2>this.positionPoints.length-1){
                    altert("Error in Colormap -> twin key at the end of colormap is not possible");
                }
                else{
                    if(this.rgbColorArray[i+1].getRGBString()===this.rgbColorArray[i+2].getRGBString()){
                        this.positionKeys.push("left key"); // start with constant colorband
                        lastElementLeft = true;
                    }
                    else{
                        this.positionKeys.push("twin key"); // start with scaled colorband
                        lastElementTwin = true;
                    }
                }

            }
            else{

                this.positionKeys.push("dual key");

            }
        }

     }

     this.positionKeys.push("left key"); // colormaps always end with leftKey

  }

  calcNewDistances(){

    this.distanceSumCIEDE2000 = 0;
    this.distanceSumRGB = 0;
    this.distanceSumHSV = 0;
    this.distanceRGB = [];
    this.distanceHSV = [];
    this.distanceCIEDE2000 = [];

    if(this.rgbColorArray.length>1){
      /// RGB
        for(var i = 0; i<this.rgbColorArray.length-1; i++){
            // calc distance rgb
            var tmpDis = this.calcDeltaRGB(this.rgbColorArray[i],this.rgbColorArray[i+1]);
            this.distanceRGB.push(tmpDis);
            this.distanceSumRGB = this.distanceSumRGB + tmpDis;
        }
      /// HSV
        for(var i = 0; i<this.hsvColorArray.length-1; i++){
            // calc distance rgb
            //var tmpDis = this.calcDeltaHSV(hsvColorArray[i],hsvColorArray[i+1]);
            var tmpDis = 0;
            this.distanceHSV.push(tmpDis);
            this.distanceSumHSV = this.distanceSumHSV + tmpDis;
        }

      /// CIEDE2000
        for(var i = 0; i<this.cielabColorArray.length-1; i++){
            var tmpDis = this.calcDeltaCIEDE2000(this.cielabColorArray[i],this.cielabColorArray[i+1]);
            this.distanceCIEDE2000.push(tmpDis);
            this.distanceSumCIEDE2000 = this.distanceSumCIEDE2000 + tmpDis;
        }
    }


  }

///////////////////////////////////
/// Band functions
//////////////////////////////////
  calcBands(){

    this.bandArray=[];

    for(var i = 0; i<this.positionPoints.length-1; i++){
        if( this.positionKeys[i]==="nil key" && this.positionKeys[i+1]==="left key" ||      // discrete band at begin of colormap
            this.positionKeys[i]==="nil key" && this.positionKeys[i+1]==="right key" ||     // complete colormap is one discrete band -> should never be
            this.positionKeys[i]==="nil key" && this.positionKeys[i+1]==="twin key" ||
            this.positionKeys[i]==="left key" && this.positionKeys[i+1]==="left key" ||    // discrete band at the end of colormap
            this.positionKeys[i]==="left key" && this.positionKeys[i+1]==="twin key"        // discrete band inside of the colormap
        ){

            if(this.positionPoints[i]!=this.positionPoints[i+1]){
            this.bandArray.push( new class_Band(this.rgbColorArray[i],this.rgbColorArray[i+1],this.hsvColorArray[i],this.hsvColorArray[i+1],this.cielabColorArray[i],this.cielabColorArray[i+1],this.din99ColorArray[i],this.din99ColorArray[i+1],this.positionPoints[i],this.positionPoints[i+1], true));
            }
        }
        else{

            if(this.positionPoints[i]!=this.positionPoints[i+1]){
            this.bandArray.push( new class_Band(this.rgbColorArray[i],this.rgbColorArray[i+1],this.hsvColorArray[i],this.hsvColorArray[i+1],this.cielabColorArray[i],this.cielabColorArray[i+1],this.din99ColorArray[i],this.din99ColorArray[i+1],this.positionPoints[i],this.positionPoints[i+1], false));
            }
        }
    }
  }

  calcIntervalPointsAllBands(){
    for(var i = 0; i<this.bandArray.length; i++){
        this.bandArray[i].calcIntervalPoints();
    }
  }

  setMerging(boolValue){
    for(var i = 0; i<this.bandArray.length; i++){
        this.bandArray[i].setDoMerge(boolValue);
    }
  }

  setNumberIntervalsAllBands(number){
    this.default_NumberIntervals = number;
    for(var i = 0; i<this.bandArray.length; i++){
        this.bandArray[i].setSample_numberOfIntervals(number);
    }
  }

  setNumberIntervalsSingleBands(index,number){
        this.bandArray[index].setSample_numberOfIntervals(number);
  }

  getNumberIntervalsSingleBands(index){
    return this.bandArray[index].getSample_numberOfIntervals();
  }


  setNumberIntervalPointssAllBands(number){
    this.default_NumberIntervalPoints = number;
    for(var i = 0; i<this.bandArray.length; i++){
        this.bandArray[i].setSample_numberOfIntervalPoints(number);
    }
  }

  setNumberIntervalPointsSingleBands(index,number){
        this.bandArray[index].setSample_numberOfIntervalPoints(number);
  }

  getNumberIntervalPointsSingleBands(index){
    return this.bandArray[index].getSample_numberOfIntervalPoints();
  }

  setStepSizeOfIntervalAllBands(number){
    this.default_IntervalStepSize = number;
    for(var i = 0; i<this.bandArray.length; i++){
        this.bandArray[i].setSample_stepSizeOfInterval(number);
    }
  }

  setStepSizeOfIntervalSingleBands(index,number){
        this.bandArray[index].setSample_stepSizeOfInterval(number);
  }

  setBandSampleType(number){
      for(var i = 0; i<this.bandArray.length; i++){
        this.bandArray[i].setSample_type(number);
    }
  }

  setIntervalMetric(number){
        for(var i = 0; i<this.bandArray.length; i++){
            this.bandArray[i].setIntervalMetric(number);
        }
   }

  getStepSizeOfIntervalSingleBands(index){
    return this.bandArray[index].getSample_stepSizeOfInterval();
  }

  getDefaultNumIntervals(){
    return this.default_NumberIntervals;
  }
  getDefaultNumIntervalPoints(){
    return this.default_NumberIntervalPoints;
  }
  getDefaultStepSizeIntervals(){
    return this.default_IntervalStepSize;
  }

  getNumberOfBands(){
      return this.bandArray.length();
  }

  getBand(index){
    console.log(index);
      return this.bandArray[index];
  }

  /////////////// GET ////////////////////

  getKey(index){
    return this.positionKeys[index];
  }

  getKeyLength(){
    return this.positionKeys.length;
  }

   getRangeStart(){
    return this.referenceRangeStart;
   }

   getRangeEnd(){
    return this.referenceRangeEnd;
   }

   getNumColors(){
     return this.rgbColorArray.length;
   }

   getColormapName() {
    return this.name;
   }

   getRGBColor(index) {
    return this.rgbColorArray[index];
   }

   getLabColor(index) {
    return this.cielabColorArray[index];
   }

   getHSVColor(index) {
    return this.hsvColorArray[index];
   }

   getDIN99Color(index) {
    return this.din99ColorArray[index];
   }

   getRGBDistance(index) {
    return this.distanceRGB[index];
   }

   getCIEDE2000Distance(index) {
    return this.distanceCIEDE2000[index];
   }

   getHSVDistance(index) {
    return this.distanceHSV[index];
   }

   getDistanceSumCIEDE2000(){
       return this.distanceSumCIEDE2000;
   }

   getDistanceSumRGB(){
       return this.distanceSumRGB;
   }

   getDistanceSumHSV(){
       return this.distanceSumHSV;
   }

   getPosition(index){
        return this.positionPoints[index];
   }

   getNumberOfBands(){
       return this.bandArray.length;
   }

   getBand(index){
       return this.bandArray[index];
   }



  /////////////// SET ////////////////////
   setPosition(index,val){
     this.positionPoints[index] = val;
     if(index==0){
         this.referenceRangeStart = val;
     }
     if(index==this.getNumColors()-1){
         this.referenceRangeEnd = val;
     }
   }

   setColormapName(newName) {
    this.name = newName;
   }

   setRGBColor(index, color) {
    this.rgbColorArray[index] = color;
    this.cielabColorArray[index] = color.calcCIELabColor();
    this.hsvColorArray[index] = color.calcHSVColor();
    this.calcNewDistances();
   }

   setLabColor(index, color) {
    this.rgbColorArray[index] = color.calcRGB();
    this.cielabColorArray[index] = color;
    this.hsvColorArray[index] = color.calcHSVColor();
    this.calcNewDistances();
   }

   setHSVColor(index, color) {
    this.rgbColorArray[index] = color.calcRGBColor();
    this.cielabColorArray[index] = color.calcCIELabColor();
    this.hsvColorArray[index] = color;
    this.calcNewDistances();
   }

   setDIN99Color(index, color) {
    this.rgbColorArray[index] = color.calcRGBColor();
    this.cielabColorArray[index] = color.calcCIELabColor();
    this.hsvColorArray[index] = color;
    this.calcNewDistances();
   }



  /////////////// Insert ////////////////////

    insertRGBColor(index, color) {
    this.rgbColorArray.splice(index, 0,color);
    this.cielabColorArray.splice(index, 0,color.calcCIELabColor());
    this.hsvColorArray.splice(index, 0,color.calcHSVColor());
    this.calcNewDistances();
   }

   insertLabColor(index, color) {
    this.rgbColorArray.splice(index, 0,color.calcRGB());
    this.cielabColorArray.splice(index, 0,color);
    this.hsvColorArray.splice(index, 0,color.calcHSVColor());
    this.calcNewDistances();
   }

   insertHSVColor(index, color) {
    this.rgbColorArray.splice(index, 0,color.calcRGBColor());
    this.cielabColorArray.splice(index, 0,color.calcCIELabColor());
    this.hsvColorArray.splice(index, 0,color);
    this.calcNewDistances();
   }


  /////////////// push ////////////////////

  pushRGBColor(rgbColor){
    this.rgbColorArray.push(rgbColor);
    this.cielabColorArray.push(rgbColor.calcCIELabColor());
    this.hsvColorArray.push(rgbColor.calcHSVColor());
    this.din99ColorArray.push(rgbColor.calcDIN99Color(1,1)); // kE,kCH
    this.calcNewDistances();
  }

  pushHSVColor(hsvColor){
    this.rgbColorArray.push(hsvColor.calcRGBColor());
    this.cielabColorArray.push(hsvColor.calcCIELabColor());
    this.hsvColorArray.push(hsvColor);
    this.din99ColorArray.push(hsvColor.calcDIN99Color(1,1));// kE,kCH
    this.calcNewDistances();
  }

  pushCIELabColor(labColor){
    this.rgbColorArray.push(labColor.calcRGB());
    this.cielabColorArray.push(labColor);
    this.hsvColorArray.push(labColor.calcHSVColor());
    this.din99ColorArray.push(labColor. calcDIN99Color(1,1));// kE,kCH
    this.calcNewDistances();
  }

  pushPositionPoints(position){
      this.positionPoints.push(position);

      if(this.positionPoints.length==1){
        this.referenceRangeStart = position;
      }
      this.referenceRangeEnd = position;
  }

  /////////////// CIEDE2000 ////////////////////
  calcDeltaCIEDE2000(color1,color2){
            var k_L = 1.0, k_C = 1.0, k_H = 1.0;
            var deg360InRad = deg2rad(360.0);
            var deg180InRad = deg2rad(180.0);
            var pow25To7 = Math.pow(25, 7);

            // Step 1
            var C1 = Math.sqrt((color1.getAValue() * color1.getAValue()) + (color1.getBValue() * color1.getBValue()));
            var C2 = Math.sqrt((color2.getAValue() * color2.getAValue()) + (color2.getBValue() * color2.getBValue()));

            var barC = (C1 + C2) / 2.0;

            var G = 0.5 * (1 - Math.sqrt(Math.pow(barC, 7) / (Math.pow(barC, 7) + pow25To7)));

            var a1Prime = (1.0 + G) * color1.getAValue();
            var a2Prime = (1.0 + G) * color2.getAValue();

            var CPrime1 = Math.sqrt((a1Prime * a1Prime) + (color1.getBValue() * color1.getBValue()));
            var CPrime2 = Math.sqrt((a2Prime * a2Prime) + (color2.getBValue() * color2.getBValue()));

            var hPrime1;
            if (color1.getBValue() == 0 && a1Prime == 0)
                hPrime1 = 0.0;
            else {
                hPrime1 = Math.atan2(color1.getBValue(), a1Prime);
                /*
                * This must be converted to a hue angle in degrees between 0
                * and 360 by addition of 2􏰏 to negative hue angles.
                */
                if (hPrime1 < 0)
                    hPrime1 += deg360InRad;
            }
            var hPrime2;
            if (color2.getBValue() == 0 && a2Prime == 0)
                hPrime2 = 0.0;
            else {
                hPrime2 = Math.atan2(color2.getBValue(), a2Prime);
                /*
                * This must be converted to a hue angle in degrees between 0
                * and 360 by addition of 2􏰏 to negative hue angles.
                */
                if (hPrime2 < 0)
                    hPrime2 += deg360InRad;
            }

            // Step 2

            var deltaLPrime = color2.getLValue() - color1.getLValue();

            var deltaCPrime = CPrime2 - CPrime1;

            var deltahPrime;
            var CPrimeProduct = CPrime1 * CPrime2;
            if (CPrimeProduct == 0)
                deltahPrime = 0;
            else {
                /* Avoid the fabs() call */
                deltahPrime = hPrime2 - hPrime1;
                if (deltahPrime < -deg180InRad)
                    deltahPrime += deg360InRad;
                else if (deltahPrime > deg180InRad)
                    deltahPrime -= deg360InRad;
            }

            var deltaHPrime = 2.0 * Math.sqrt(CPrimeProduct) *
                Math.sin(deltahPrime / 2.0);

            // Step 3


            var barLPrime = (color1.getLValue() + color2.getLValue()) / 2.0;

            var barCPrime = (CPrime1 + CPrime2) / 2.0;

            var barhPrime, hPrimeSum = hPrime1 + hPrime2;
            if (CPrime1 * CPrime2 == 0) {
                barhPrime = hPrimeSum;
            } else {
                if (Math.abs(hPrime1 - hPrime2) <= deg180InRad)
                    barhPrime = hPrimeSum / 2.0;
                else {
                    if (hPrimeSum < deg360InRad)
                        barhPrime = (hPrimeSum + deg360InRad) / 2.0;
                    else
                        barhPrime = (hPrimeSum - deg360InRad) / 2.0;
                }
            }

            var T = 1.0 - (0.17 * Math.cos(barhPrime - deg2rad(30.0))); +
                (0.24 * Math.cos(2.0 * barhPrime)) +
                (0.32 * Math.cos((3.0 * barhPrime) + deg2rad(6.0))) -
                (0.20 * Math.cos((4.0 * barhPrime) - deg2rad(63.0)));

            var deltaTheta = deg2rad(30.0) *
                Math.exp(-Math.pow((barhPrime - deg2rad(275.0)) / deg2rad(25.0), 2.0));

            var R_C = 2.0 * Math.sqrt(Math.pow(barCPrime, 7.0) /
                (Math.pow(barCPrime, 7.0) + pow25To7));

            var S_L = 1 + ((0.015 * Math.pow(barLPrime - 50.0, 2.0)) /
                Math.sqrt(20 + Math.pow(barLPrime - 50.0, 2.0)));

            var S_C = 1 + (0.045 * barCPrime);

            var S_H = 1 + (0.015 * barCPrime * T);

            var R_T = (-Math.sin(2.0 * deltaTheta)) * R_C;


            var deltaE = Math.sqrt(
                Math.pow(deltaLPrime / (k_L * S_L), 2.0) +
                Math.pow(deltaCPrime / (k_C * S_C), 2.0) +
                Math.pow(deltaHPrime / (k_H * S_H), 2.0) +
                (R_T * (deltaCPrime / (k_C * S_C)) * (deltaHPrime / (k_H * S_H))));

            return deltaE;

    }

    ///////////////////// RGB Distance ////////////////////////
    calcDeltaRGB(color1,color2){
        return Math.sqrt( Math.pow(color1.getRValue()-color2.getRValue(),2) + Math.pow(color1.getGValue()-color2.getGValue(),2) + Math.pow(color1.getBValue()-color2.getBValue(),2));
    }
}





////////////////////////////////////////////////
// ------------ OLD Class Colormap ---------------//
////////////////////////////////////////////////

class classColormap {

  constructor(startColor, endColor) {
    this.startColor = startColor;
    this.endColor = endColor;
    this.intermediateColors = [];
    this.edgeWeights = [];
    this.distanceSum = 0;
    this.calcNewEdges();
  }

  changeColorABVal(colorindex, aVal, bVal){
      switch(colorindex) {
    case 0:
        // Startnode
         this.startColor.setAValue(aVal);
         this.startColor.setBValue(bVal);
        break;
    case this.intermediateColors.length+1:
        // Endnode
        this.endColor.setAValue(aVal);
        this.endColor.setBValue(bVal);
        break;
    default:
        // intermediate node
         this.intermediateColors[colorindex-1].setAValue(aVal);
         this.intermediateColors[colorindex-1].setBValue(bVal);
    }
    this.calcNewEdges();

  }

  getEdgeDistance(index){
      return this.edgeWeights[index];
  }

  getFullDistance() {
    return this.distanceSum;
  }

  getStartColor() {
    return this.startColor;
  }

  getEndColor() {
    return this.endColor;
  }

  getIntermedaiteColor(index) {
    return this.intermediateColors[index];
  }

  getIntermedaiteColorLength(){
    return this.intermediateColors.length;
  }

  setIntermedaiteColor(index, color) {
    this.intermediateColors.splice(index, 0, color);
    this.calcNewEdges();
  }

  pushIntermedaiteColor(color) {
    this.intermediateColors.push(color);
    this.calcNewEdges();
  }

  calcNewEdges(){
        this.distanceSum = 0;

        for(var i = this.edgeWeights.length-1; i>=0; i--){
                this.edgeWeights.pop();
        }

        var tmpColors = [];
        tmpColors.push(this.startColor);
        for(var i = 0; i<this.intermediateColors.length; i++){
        tmpColors.push(this.intermediateColors[i]);
        }
        tmpColors.push(this.endColor);


        // intermediate Colors
        for(var i = 0; i<tmpColors.length-1; i++){
            var tmpDis = this.calcDeltaCIEDE2000(tmpColors[i],tmpColors[i+1]);
            this.edgeWeights.push(tmpDis);
            this.distanceSum = this.distanceSum + tmpDis;
        }

    }

    calcDeltaCIEDE2000(color1,color2){

            var k_L = 1.0, k_C = 1.0, k_H = 1.0;
            var deg360InRad = deg2rad(360.0);
            var deg180InRad = deg2rad(180.0);
            var pow25To7 = Math.pow(25, 7);

            // Step 1

            var C1 = Math.sqrt((color1.getAValue() * color1.getAValue()) + (color1.getBValue() * color1.getBValue()));
            var C2 = Math.sqrt((color2.getAValue() * color2.getAValue()) + (color2.getBValue() * color2.getBValue()));

            var barC = (C1 + C2) / 2.0;

            var G = 0.5 * (1 - Math.sqrt(Math.pow(barC, 7) / (Math.pow(barC, 7) + pow25To7)));

            var a1Prime = (1.0 + G) * color1.getAValue();
            var a2Prime = (1.0 + G) * color2.getAValue();

            var CPrime1 = Math.sqrt((a1Prime * a1Prime) + (color1.getBValue() * color1.getBValue()));
            var CPrime2 = Math.sqrt((a2Prime * a2Prime) + (color2.getBValue() * color2.getBValue()));

            var hPrime1;
            if (color1.getBValue() == 0 && a1Prime == 0)
                hPrime1 = 0.0;
            else {
                hPrime1 = Math.atan2(color1.getBValue(), a1Prime);
                /*
                * This must be converted to a hue angle in degrees between 0
                * and 360 by addition of 2􏰏 to negative hue angles.
                */
                if (hPrime1 < 0)
                    hPrime1 += deg360InRad;
            }
            var hPrime2;
            if (color2.getBValue() == 0 && a2Prime == 0)
                hPrime2 = 0.0;
            else {
                hPrime2 = Math.atan2(color2.getBValue(), a2Prime);
                /*
                * This must be converted to a hue angle in degrees between 0
                * and 360 by addition of 2􏰏 to negative hue angles.
                */
                if (hPrime2 < 0)
                    hPrime2 += deg360InRad;
            }

            // Step 2

            var deltaLPrime = color2.getLValue() - color1.getLValue();

            var deltaCPrime = CPrime2 - CPrime1;

            var deltahPrime;
            var CPrimeProduct = CPrime1 * CPrime2;
            if (CPrimeProduct == 0)
                deltahPrime = 0;
            else {
                /* Avoid the fabs() call */
                deltahPrime = hPrime2 - hPrime1;
                if (deltahPrime < -deg180InRad)
                    deltahPrime += deg360InRad;
                else if (deltahPrime > deg180InRad)
                    deltahPrime -= deg360InRad;
            }

            var deltaHPrime = 2.0 * Math.sqrt(CPrimeProduct) *
                Math.sin(deltahPrime / 2.0);

            // Step 3


            var barLPrime = (color1.getLValue() + color2.getLValue()) / 2.0;

            var barCPrime = (CPrime1 + CPrime2) / 2.0;

            var barhPrime, hPrimeSum = hPrime1 + hPrime2;
            if (CPrime1 * CPrime2 == 0) {
                barhPrime = hPrimeSum;
            } else {
                if (Math.abs(hPrime1 - hPrime2) <= deg180InRad)
                    barhPrime = hPrimeSum / 2.0;
                else {
                    if (hPrimeSum < deg360InRad)
                        barhPrime = (hPrimeSum + deg360InRad) / 2.0;
                    else
                        barhPrime = (hPrimeSum - deg360InRad) / 2.0;
                }
            }

            var T = 1.0 - (0.17 * Math.cos(barhPrime - deg2rad(30.0))); +
                (0.24 * Math.cos(2.0 * barhPrime)) +
                (0.32 * Math.cos((3.0 * barhPrime) + deg2rad(6.0))) -
                (0.20 * Math.cos((4.0 * barhPrime) - deg2rad(63.0)));

            var deltaTheta = deg2rad(30.0) *
                Math.exp(-Math.pow((barhPrime - deg2rad(275.0)) / deg2rad(25.0), 2.0));

            var R_C = 2.0 * Math.sqrt(Math.pow(barCPrime, 7.0) /
                (Math.pow(barCPrime, 7.0) + pow25To7));

            var S_L = 1 + ((0.015 * Math.pow(barLPrime - 50.0, 2.0)) /
                Math.sqrt(20 + Math.pow(barLPrime - 50.0, 2.0)));

            var S_C = 1 + (0.045 * barCPrime);

            var S_H = 1 + (0.015 * barCPrime * T);

            var R_T = (-Math.sin(2.0 * deltaTheta)) * R_C;


            var deltaE = Math.sqrt(
                Math.pow(deltaLPrime / (k_L * S_L), 2.0) +
                Math.pow(deltaCPrime / (k_C * S_C), 2.0) +
                Math.pow(deltaHPrime / (k_H * S_H), 2.0) +
                (R_T * (deltaCPrime / (k_C * S_C)) * (deltaHPrime / (k_H * S_H))));

            return deltaE;

    }


};
