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

    this.NaN_RGB = new classColor_RGB(0,0,0);
    this.NaN_HSV = new classColor_HSV(0,0,0);
    this.NaN_LAB = new classColor_LAB(0,0,0);
    this.NaN_DIN99 = new classColorDIN99(0,0,0);

    this.referenceRangeStart = 0;
    this.referenceRangeEnd = 0;
    this.positionPoints = [];
    this.positionKeys = []; //twin key, dual key, nil key, left key)

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

   getNumScaledDiffereces(){
     return this.distanceRGB.length;
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


 setNaNColor(color){

   var colorType = color.getColorType();
   switch (colorType) {
     case "rgb":
     this.NaN_RGB = color;
     this.NaN_HSV = color.calcHSVColor();
     this.NaN_LAB = color.calcLABColor();
     this.NaN_DIN99 = color.calcDIN99Color(1,1);
       break;
     case "hsv":
     this.NaN_RGB = color.calcRGBColor();
     this.NaN_HSV = color;
     this.NaN_LAB = color.calcLABColor();
     this.NaN_DIN99 = color.calcDIN99Color(1,1);
       break;
     case "lab":
     this.NaN_RGB = color.calcRGBColor();
     this.NaN_HSV = color.calcHSVColor();
     this.NaN_LAB = color;
     this.NaN_DIN99 = color.calcDIN99Color(1,1);
       break;
     case "din99":
     this.NaN_RGB = color.calcRGBColor();
     this.NaN_HSV = color.calcHSVColor();
     this.NaN_LAB = color.calcLABColor();
     this.NaN_DIN99 = color;
       break;
     default:

   }
 }

 getNaNColor(colorspace){

   switch (colorspace) {
     case "rgb":
     return this.NaN_RGB;

     case "hsv":
     return this.NaN_HSV;

     case "lab":
     return this.NaN_LAB;

     case "din99":
     return this.NaN_DIN99;

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


}
