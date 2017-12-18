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

    this.distanceLAB = [];
    this.distanceDIN99 = [];
    this.distanceCIEDE2000 = [];
    this.distanceDE94 = [];
    this.distanceRGB = [];
    this.distanceHSV = [];
    this.distanceRef = [];
    this.distanceSumRef = 0;
    this.distanceSumCIEDE2000 = 0;
    this.distanceSumRGB = 0;
    this.distanceSumHSV = 0;
    this.distanceSumLAB = 0;
    this.distanceSumDE94 = 0;
    this.distanceSumDIN99 = 0;

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
    //  console.log('getRGBColor' + this.rgbColorArray[index].getColorType());
    return this.rgbColorArray[index];
   }

   getLabColor(index) {
    //  console.log('getLabColor' + this.cielabColorArray[index].getColorType());
    return this.cielabColorArray[index];
   }

   getHSVColor(index) {
    //  console.log('getHSVColor' + this.hsvColorArray[index].getColorType());
    return this.hsvColorArray[index];
   }

   getDIN99Color(index) {

     //console.log('getDIN99Color' + this.din99ColorArray[index].getColorType());

    return this.din99ColorArray[index];
   }






   getRGBDistance(index) {
    return this.distanceRGB[index];
   }

   getHSVDistance(index) {
    return this.distanceHSV[index];
   }

   getLABDistance(index) {
    return this.distanceLAB[index];
   }

   getDE94Distance(index) {
    return this.distanceDE94[index];
   }

   getCIEDE2000Distance(index) {
    return this.distanceCIEDE2000[index];
   }

   getDIN99Distance(index) {
    return this.distanceDIN99[index];
   }

   getRefDistance(index) {
    return this.distanceRef[index];
   }


   getDistanceSumRef(){
       return this.distanceSumRef;
   }


   getDistanceSumRGB(){
       return this.distanceSumRGB;
   }


   getDistanceSumHSV(){
       return this.distanceSumHSV;
   }

   getDistanceSumLAB(){
       return this.distanceSumLAB;
   }

   getDistanceSumDE94(){
       return this.distanceSumDE94;
   }

   getDistanceSumCIEDE2000(){
       return this.distanceSumCIEDE2000;
   }

   getDistanceSumDIN99(){
       return this.distanceSumDIN99;
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
    this.cielabColorArray[index] = color.calcLABColor();
    this.hsvColorArray[index] = color.calcHSVColor();
   }

   setLabColor(index, color) {
    this.rgbColorArray[index] = color.calcRGBColor();
    this.cielabColorArray[index] = color;
    this.hsvColorArray[index] = color.calcHSVColor();
   }

   setHSVColor(index, color) {
    this.rgbColorArray[index] = color.calcRGBColor();
    this.cielabColorArray[index] = color.calcLABColor();
    this.hsvColorArray[index] = color;
   }

   setDIN99Color(index, color) {
    this.rgbColorArray[index] = color.calcRGBColor();
    this.cielabColorArray[index] = color.calcLABColor();
    this.hsvColorArray[index] = color;
   }



  /////////////// Insert ////////////////////

    insertRGBColor(index, color) {
    this.rgbColorArray.splice(index, 0,color);
    this.cielabColorArray.splice(index, 0,color.calcLABColor());
    this.hsvColorArray.splice(index, 0,color.calcHSVColor());
   }

   insertLabColor(index, color) {
    this.rgbColorArray.splice(index, 0,color.calcRGBColor());
    this.cielabColorArray.splice(index, 0,color);
    this.hsvColorArray.splice(index, 0,color.calcHSVColor());
   }

   insertHSVColor(index, color) {
    this.rgbColorArray.splice(index, 0,color.calcRGBColor());
    this.cielabColorArray.splice(index, 0,color.calcLABColor());
    this.hsvColorArray.splice(index, 0,color);
   }


  /////////////// push ////////////////////

  pushRGBColor(rgbColor){
    this.rgbColorArray.push(rgbColor);
    this.cielabColorArray.push(rgbColor.calcLABColor());
    this.hsvColorArray.push(rgbColor.calcHSVColor());
    this.din99ColorArray.push(rgbColor.calcDIN99Color(1,1)); // kE,kCH
  }

  pushHSVColor(hsvColor){
    this.rgbColorArray.push(hsvColor.calcRGBColor());
    this.cielabColorArray.push(hsvColor.calcLABColor());
    this.hsvColorArray.push(hsvColor);
    this.din99ColorArray.push(hsvColor.calcDIN99Color(1,1));// kE,kCH
  }

  pushCIELabColor(labColor){
    this.rgbColorArray.push(labColor.calcRGBColor());
    this.cielabColorArray.push(labColor);
    this.hsvColorArray.push(labColor.calcHSVColor());
    this.din99ColorArray.push(labColor. calcDIN99Color(1,1));// kE,kCH
  }

  pushDIN99Color(din99Color){
    this.rgbColorArray.push(din99Color.calcRGBColor());
    this.cielabColorArray.push(din99Color.calcLABColor());
    this.hsvColorArray.push(din99Color.calcHSVColor());
    this.din99ColorArray.push(din99Color);
  }

  pushColor(color){
    var colorType = color.getColorType();
    switch (colorType) {
      case "rgb":
        this.rgbColorArray.push(color);
        this.cielabColorArray.push(color.calcLABColor());
        this.hsvColorArray.push(color.calcHSVColor());
        this.din99ColorArray.push(color.calcDIN99Color(1,1)); // kE,kCH
        break;
      case "hsv":
        this.rgbColorArray.push(color.calcRGBColor());
        this.cielabColorArray.push(color.calcLABColor());
        this.hsvColorArray.push(color);
        this.din99ColorArray.push(color.calcDIN99Color(1,1));// kE,kCH
        break;
      case "lab":
        this.rgbColorArray.push(color.calcRGBColor());
        this.cielabColorArray.push(color);
        this.hsvColorArray.push(color.calcHSVColor());
        this.din99ColorArray.push(color. calcDIN99Color(1,1));// kE,kCH
        break;
      case "din99":
        this.rgbColorArray.push(color.calcRGBColor());
        this.cielabColorArray.push(color.calcLABColor());
        this.hsvColorArray.push(color.calcHSVColor());
        this.din99ColorArray.push(color);
        break;
      default:

    }
 }

  pushPositionPoints(position){
      this.positionPoints.push(position);

      if(this.positionPoints.length==1){
        this.referenceRangeStart = position;
      }
      this.referenceRangeEnd = position;
  }

  ///////////////////////////////////
  /// DISTANCE functions
  //////////////////////////////////


  calcNewDistances(){

    this.distanceLAB = [];
    this.distanceDIN99 = [];
    this.distanceCIEDE2000 = [];
    this.distanceDE94 = [];
    this.distanceRGB = [];
    this.distanceHSV = [];
    this.distanceRef = [];
    this.distanceSumRef = 0;
    this.distanceSumCIEDE2000 = 0;
    this.distanceSumRGB = 0;
    this.distanceSumHSV = 0;
    this.distanceSumLAB = 0;
    this.distanceSumDE94 = 0;
    this.distanceSumDIN99 = 0;

    if(this.rgbColorArray.length>1){

        for(var i = 0; i<this.rgbColorArray.length-1; i++){

            // ref
            var tmpDis = this.positionPoints[i+1]-this.positionPoints[i];
            this.distanceRef.push(tmpDis);
            this.distanceSumRef= this.distanceSumRef + tmpDis;

            /// RGB
            tmpDis = this.calc3DEuclideanDistance(this.rgbColorArray[i],this.rgbColorArray[i+1]);

            this.distanceRGB.push(tmpDis);
            this.distanceSumRGB = this.distanceSumRGB + tmpDis;
            /// HSV
            tmpDis = this.hsvColorArray[i].getSValue()*50; // radius 50; center(0,0,0);
            var tmpRad = (this.hsvColorArray[i].getHValue()*Math.PI*2)-Math.PI;
            var x = tmpDis*Math.cos(tmpRad);
            var y = tmpDis*Math.sin(tmpRad);
            var z = this.hsvColorArray[i].getVValue()-50;

            tmpDis = this.hsvColorArray[i+1].getSValue()*50;
            tmpRad = (this.hsvColorArray[i+1].getHValue()*Math.PI*2)-Math.PI;
            var x2 = tmpDis*Math.cos(tmpRad);
            var y2 = tmpDis*Math.sin(tmpRad);
            var z2 = this.hsvColorArray[i+1].getVValue()-50;
            tmpDis= Math.sqrt( Math.pow(x-x2,2) + Math.pow(y-y2,2) + Math.pow(z-z2,2));
            this.distanceHSV.push(tmpDis);
            this.distanceSumHSV = this.distanceSumHSV + tmpDis;

            /// LAB
            tmpDis = this.calc3DEuclideanDistance(this.cielabColorArray[i],this.cielabColorArray[i+1]);
            this.distanceLAB.push(tmpDis);
            this.distanceSumLAB = this.distanceSumLAB + tmpDis;

             /// DE94
             tmpDis = this.calcDeltaDE94(this.cielabColorArray[i],this.cielabColorArray[i+1]);
             this.distanceDE94.push(tmpDis);
             this.distanceSumDE94 = this.distanceSumDE94 + tmpDis;

             /// CIEDE2000
             tmpDis = this.calcDeltaCIEDE2000(this.cielabColorArray[i],this.cielabColorArray[i+1]);
             this.distanceCIEDE2000.push(tmpDis);
             this.distanceSumCIEDE2000 = this.distanceSumCIEDE2000 + tmpDis;

             // DIN99
             tmpDis = this.calc3DEuclideanDistance(this.din99ColorArray[i],this.din99ColorArray[i+1]);
             this.distanceDIN99.push(tmpDis);
             this.distanceSumDIN99 = this.distanceSumDIN99 + tmpDis;
        }


    }


  }

  /////////////// DE94 ////////////////////
  calcDeltaDE94(color1,color2){

            var k_L = 1.0, k_C = 1.0, k_H = 1.0;
            var k_1 = 0.045, k_2 = 0.015; // K1: 0.045 graphic arts  0.048 textiles  K2: 0.015 graphic arts 0.014 textiles


            var deg360InRad = deg2rad(360.0);
            var deg180InRad = deg2rad(180.0);
            var pow25To7 = Math.pow(25, 7);

            // Step 1
            var deltaL = color1.getLValue()-color2.getLValue();
            var C1 = Math.sqrt((color1.getAValue() * color1.getAValue()) + (color1.getBValue() * color1.getBValue()));
            var C2 = Math.sqrt((color2.getAValue() * color2.getAValue()) + (color2.getBValue() * color2.getBValue()));
            var deltaC = C1-C2;
            var deltaA = color1.getAValue()-color2.getAValue();
            var deltaB = color1.getBValue()-color2.getBValue();
            var deltaH = Math.sqrt((deltaA * deltaA) + (deltaB * deltaB) - (deltaC * deltaC));
            var s_L =1;
            var s_C =1+k_1*C1;
            var s_H =1+k_2*C2;


            var elem1 = deltaL/(k_L*s_L);
            var elem2 = deltaC/(k_C*s_C);
            var elem3 = deltaH/(k_H*s_H);
            var deltaE =  Math.sqrt((elem1 * elem1) + (elem2 * elem2) + (elem3 * elem3));

            return deltaE;

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

    ///////////////////// RGB, HSV, LAB, DIN99 Distance ////////////////////////
    calc3DEuclideanDistance(color1,color2){
    return Math.sqrt( Math.pow(color1.get1Value()-color2.get1Value(),2) + Math.pow(color1.get2Value()-color2.get2Value(),2) + Math.pow(color1.get3Value()-color2.get3Value(),2));
    }
}
