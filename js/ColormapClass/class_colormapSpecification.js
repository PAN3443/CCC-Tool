class classColorMapSpecification {

    constructor() {
    this.name = "Customer Colormap";

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
    this.middleOfTriple = [];

    this.bandArray  = []; //
    this.default_NumberIntervals = 10;
    this.default_NumberIntervalPoints = 9;
    this.default_IntervalStepSize = 0.1;

  }

  deleteKey(index){

    switch (this.positionKeys[index]) {
      case "twin key":
        if(this.positionPoints[index]==this.positionPoints[index+1]){
          this.positionPoints.splice(index, 2);
          this.positionKeys.splice(index, 2);
          this.rgbColorArray.splice(index, 2);
          this.cielabColorArray.splice(index, 2);
          this.hsvColorArray.splice(index, 2);
          this.din99ColorArray.splice(index, 2);
        }
        else{
          this.positionPoints.splice(index-1, 2);
          this.positionKeys.splice(index-1, 2);
          this.rgbColorArray.splice(index-1, 2);
          this.cielabColorArray.splice(index-1, 2);
          this.hsvColorArray.splice(index-1, 2);
          this.din99ColorArray.splice(index-1, 2);
        }
        break;
      case "left key":
        if(index!=this.positionPoints.length-1){
          if(this.positionPoints[index]==this.positionPoints[index+1]){
            this.positionPoints.splice(index, 2);
            this.positionKeys.splice(index, 2);
            this.rgbColorArray.splice(index, 2);
            this.cielabColorArray.splice(index, 2);
            this.hsvColorArray.splice(index, 2);
            this.din99ColorArray.splice(index, 2);
          }
          else{
            this.positionPoints.splice(index-1, 2);
            this.positionKeys.splice(index-1, 2);
            this.rgbColorArray.splice(index-1, 2);
            this.cielabColorArray.splice(index-1, 2);
            this.hsvColorArray.splice(index-1, 2);
            this.din99ColorArray.splice(index-1, 2);
          }
        }
        else{
          return;
        }
        break;
      default:
        this.positionPoints.splice(index, 1);
        this.positionKeys.splice(index, 1);
        this.rgbColorArray.splice(index, 1);
        this.cielabColorArray.splice(index, 1);
        this.hsvColorArray.splice(index, 1);
        this.din99ColorArray.splice(index, 1);
    }

  }

  clear(){
    this.name = "Customer Colormap";

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
    this.middleOfTriple = [];
    var lastElementTwin = false;
    var lastElementLeft = false;

     for(var i = 0; i<this.positionPoints.length-1; i++){
        if(lastElementLeft==true){
            this.positionKeys.push("left key");
            this.middleOfTriple.push(false);
            lastElementLeft = false;
            continue;
        }
        if(lastElementTwin==true){
            this.positionKeys.push("twin key");
            this.middleOfTriple.push(false);
            lastElementTwin = false;
            continue;
        }
        if(i==0){
            if(this.rgbColorArray[i].getRGBString()===this.rgbColorArray[i+1].getRGBString()){
                this.positionKeys.push("nil key"); // start with constant colorband
                this.middleOfTriple.push(false);
            }
            else{
                this.positionKeys.push("right key"); // start with scaled colorband
                this.middleOfTriple.push(false);
            }
        }
        else{
            // twin/leftKey  or not
            if(this.positionPoints[i]==this.positionPoints[i+1]){
                if(i+2>this.positionPoints.length-1){

                    alert("Error in Colormap -> twin key at the end of colormap is not possible");

                }
                else{
                    if(this.rgbColorArray[i+1].getRGBString()===this.rgbColorArray[i+2].getRGBString()){
                        this.positionKeys.push("left key"); // start with constant colorband
                        this.middleOfTriple.push(true);
                        lastElementLeft = true;
                    }
                    else{
                        this.positionKeys.push("twin key"); // start with scaled colorband
                        this.middleOfTriple.push(true);
                        lastElementTwin = true;
                    }
                }

            }
            else{

                this.positionKeys.push("dual key");
                this.middleOfTriple.push(false);

            }
        }

     }

     this.positionKeys.push("left key"); // colormaps always end with leftKey

  }


  ///////////////////////////////////
  /// CMS to Colormap
  //////////////////////////////////


  calcColorMap(intervals, colorspace){


    var tmpColormap=  new classColormap(colorspace);



    if(this.positionPoints.length>1 && intervals !=0){

      var tmpIntervalRef=[];
      var intervalDistance = (this.positionPoints[this.positionPoints.length-1]-this.positionPoints[0])/intervals;

    /*  for(var i=0; i<=intervals; i++){
          var tmpVal = this.positionPoints[0]+(i*intervalDistance);
          tmpIntervalRef.push(tmpVal);
      }*/

      for(var i=0; i<intervals; i++){
            var tmpVal = this.positionPoints[0]+(i*intervalDistance);
            tmpIntervalRef.push(tmpVal);
        }
        tmpIntervalRef.push(this.positionPoints[this.positionPoints.length-1]);



      var currentKeyPos = 0;
      var doneLastKey = false;
      var docase = 0;
      var intervalRefIndex = 0;
      while(doneLastKey==false){

          docase = 1;
          if(tmpIntervalRef[intervalRefIndex]>this.positionPoints[currentKeyPos]){
            docase = 2;
          }

          if(tmpIntervalRef[intervalRefIndex]<this.positionPoints[currentKeyPos]){
            docase = 3;
          }


        switch (docase) {
          case 1:
                  //////////////////////////////////////////////////////////////////////////
                  ////// Case IntervalKey
                  //////////////////////////////////////////////////////////////////////////
                    var type = "interval "+this.positionKeys[currentKeyPos];

                    var tmpColor;
                    switch (colorspace) {
                      case "rgb":
                          tmpColor = new classColor_RGB(this.rgbColorArray[currentKeyPos].get1Value(),this.rgbColorArray[currentKeyPos].get2Value(),this.rgbColorArray[currentKeyPos].get3Value());
                        break;
                      case "hsv":
                          tmpColor = new classColor_HSV(this.hsvColorArray[currentKeyPos].get1Value(),this.hsvColorArray[currentKeyPos].get2Value(),this.hsvColorArray[currentKeyPos].get3Value());
                        break;
                      case "lab":
                          tmpColor = new classColor_LAB(this.cielabColorArray[currentKeyPos].get1Value(),this.cielabColorArray[currentKeyPos].get2Value(),this.cielabColorArray[currentKeyPos].get3Value());
                        break;
                      case "din99":
                          tmpColor = new classColorDIN99(this.din99ColorArray[currentKeyPos].get1Value(),this.din99ColorArray[currentKeyPos].get2Value(),this.din99ColorArray[currentKeyPos].get3Value());
                        break;
                      default:
                      console.log("Error calcColorMap function");
                    }
                    tmpColormap.addElement(tmpColor, tmpIntervalRef[intervalRefIndex], type);
                    currentKeyPos++;

                    if(this.positionKeys[currentKeyPos-1]==="left key" || this.positionKeys[currentKeyPos-1]==="twin key"){

                      if(currentKeyPos == this.positionKeys.length){
                          doneLastKey=true;
                          break;
                      }
                      var type2 = "interval "+this.positionKeys[currentKeyPos];

                      var tmpColor;
                      switch (colorspace) {
                        case "rgb":
                            tmpColor = new classColor_RGB(this.rgbColorArray[currentKeyPos].get1Value(),this.rgbColorArray[currentKeyPos].get2Value(),this.rgbColorArray[currentKeyPos].get3Value());
                          break;
                        case "hsv":
                            tmpColor = new classColor_HSV(this.hsvColorArray[currentKeyPos].get1Value(),this.hsvColorArray[currentKeyPos].get2Value(),this.hsvColorArray[currentKeyPos].get3Value());
                          break;
                        case "lab":
                            tmpColor = new classColor_LAB(this.cielabColorArray[currentKeyPos].get1Value(),this.cielabColorArray[currentKeyPos].get2Value(),this.cielabColorArray[currentKeyPos].get3Value());
                          break;
                        case "din99":
                            tmpColor = new classColorDIN99(this.din99ColorArray[currentKeyPos].get1Value(),this.din99ColorArray[currentKeyPos].get2Value(),this.din99ColorArray[currentKeyPos].get3Value());
                          break;
                        default:
                        console.log("Error calcColorMap function");
                      }
                      tmpColormap.addElement(tmpColor, tmpIntervalRef[intervalRefIndex], type2);
                      currentKeyPos++;
                    }

                    intervalRefIndex++;
          break;
          case 2:
                    //////////////////////////////////////////////////////////////////////////
                    ////// Case Key
                    //////////////////////////////////////////////////////////////////////////
                                var type = this.positionKeys[currentKeyPos];
                                var tmpColor;
                                switch (colorspace) {
                                  case "rgb":
                                      tmpColor = new classColor_RGB(this.rgbColorArray[currentKeyPos].get1Value(),this.rgbColorArray[currentKeyPos].get2Value(),this.rgbColorArray[currentKeyPos].get3Value());
                                    break;
                                  case "hsv":
                                      tmpColor = new classColor_HSV(this.hsvColorArray[currentKeyPos].get1Value(),this.hsvColorArray[currentKeyPos].get2Value(),this.hsvColorArray[currentKeyPos].get3Value());
                                    break;
                                  case "lab":
                                      tmpColor = new classColor_LAB(this.cielabColorArray[currentKeyPos].get1Value(),this.cielabColorArray[currentKeyPos].get2Value(),this.cielabColorArray[currentKeyPos].get3Value());
                                    break;
                                  case "din99":
                                      tmpColor = new classColorDIN99(this.din99ColorArray[currentKeyPos].get1Value(),this.din99ColorArray[currentKeyPos].get2Value(),this.din99ColorArray[currentKeyPos].get3Value());
                                    break;
                                  default:
                                  console.log("Error calcColorMap function");
                                }
                                tmpColormap.addElement(tmpColor, this.positionPoints[currentKeyPos], type);

                                currentKeyPos++;

                                if(this.positionKeys[currentKeyPos-1]==="left key" || this.positionKeys[currentKeyPos-1]==="twin key"){

                                  if(currentKeyPos == this.positionKeys.length-1){
                                      continue;
                                  }
                                  var type2 = this.positionKeys[currentKeyPos];

                                  try {
                                    var tmpColor;
                                    switch (colorspace) {
                                      case "rgb":
                                          tmpColor = new classColor_RGB(this.rgbColorArray[currentKeyPos].get1Value(),this.rgbColorArray[currentKeyPos].get2Value(),this.rgbColorArray[currentKeyPos].get3Value());
                                        break;
                                      case "hsv":
                                          tmpColor = new classColor_HSV(this.hsvColorArray[currentKeyPos].get1Value(),this.hsvColorArray[currentKeyPos].get2Value(),this.hsvColorArray[currentKeyPos].get3Value());
                                        break;
                                      case "lab":
                                          tmpColor = new classColor_LAB(this.cielabColorArray[currentKeyPos].get1Value(),this.cielabColorArray[currentKeyPos].get2Value(),this.cielabColorArray[currentKeyPos].get3Value());
                                        break;
                                      case "din99":
                                          tmpColor = new classColorDIN99(this.din99ColorArray[currentKeyPos].get1Value(),this.din99ColorArray[currentKeyPos].get2Value(),this.din99ColorArray[currentKeyPos].get3Value());
                                        break;
                                      default:
                                      console.log("Error calcColorMap function");
                                    }
                                    tmpColormap.addElement(tmpColor, this.positionPoints[currentKeyPos], type2);
                                    currentKeyPos++;
                                  } catch (e) {
                                    console.log("Error at cms to colormap function (case 2)");
                                  }


                                }
          break;
          case 3:
                    //////////////////////////////////////////////////////////////////////////
                    ////// Case Interval
                    //////////////////////////////////////////////////////////////////////////
                    var type = "interval";

                    var leftRef = this.positionPoints[currentKeyPos-1];
                    var rightRef = this.positionPoints[currentKeyPos];

                    // calc color

                    var tmpRatio = (tmpIntervalRef[intervalRefIndex]-leftRef)/(rightRef-leftRef);


                    var tmpColor;
                    switch (colorspace) {
                      case "rgb":

                          var rValue = this.rgbColorArray[currentKeyPos-1].get1Value()+(this.rgbColorArray[currentKeyPos].get1Value() - this.rgbColorArray[currentKeyPos-1].get1Value())*tmpRatio;
                          var gValue = this.rgbColorArray[currentKeyPos-1].get2Value()+(this.rgbColorArray[currentKeyPos].get2Value() - this.rgbColorArray[currentKeyPos-1].get2Value())*tmpRatio;
                          var bValue = this.rgbColorArray[currentKeyPos-1].get3Value()+(this.rgbColorArray[currentKeyPos].get3Value() - this.rgbColorArray[currentKeyPos-1].get3Value())*tmpRatio;

                          tmpColor = new classColor_RGB(rValue,gValue,bValue);
                        break;
                      case "hsv":

                          var tmpDis = this.hsvColorArray[currentKeyPos-1].getSValue()*50; // radius 50; center(0,0,0);
                          var tmpRad = (this.hsvColorArray[currentKeyPos-1].getHValue()*Math.PI*2)-Math.PI;
                          var xPos = tmpDis*Math.cos(tmpRad);
                          var yPos = tmpDis*Math.sin(tmpRad);
                          var zPos = this.hsvColorArray[currentKeyPos-1].getVValue()-50;

                          var tmpDis2 = this.hsvColorArray[currentKeyPos].getSValue()*50;
                          var tmpRad2 = (this.hsvColorArray[currentKeyPos].getHValue()*Math.PI*2)-Math.PI;
                          var xPos2 = tmpDis2*Math.cos(tmpRad2);
                          var yPos2 = tmpDis2*Math.sin(tmpRad2);
                          var zPos2 = this.hsvColorArray[currentKeyPos].getVValue()-50;

                          var tmpX = xPos+(xPos2 - xPos)*tmpRatio;
                          var tmpY = yPos+(yPos2 - yPos)*tmpRatio;
                          var tmpZ = zPos+(zPos2 - zPos)*tmpRatio;

                          var tmpH =(Math.atan2(tmpY,tmpX)+Math.PI)/(Math.PI*2);
                          var tmpS = Math.sqrt(Math.pow(tmpX,2)+Math.pow(tmpY,2))/50;
                          var tmpV = tmpZ+50;
                          tmpColor = new classColor_HSV(tmpH,tmpS,tmpV);

                        break;
                      case "lab":

                          var lValue = this.cielabColorArray[currentKeyPos-1].get1Value()+(this.cielabColorArray[currentKeyPos].get1Value() - this.cielabColorArray[currentKeyPos-1].get1Value())*tmpRatio;
                          var aValue = this.cielabColorArray[currentKeyPos-1].get2Value()+(this.cielabColorArray[currentKeyPos].get2Value() - this.cielabColorArray[currentKeyPos-1].get2Value())*tmpRatio;
                          var bValue = this.cielabColorArray[currentKeyPos-1].get3Value()+(this.cielabColorArray[currentKeyPos].get3Value() - this.cielabColorArray[currentKeyPos-1].get3Value())*tmpRatio;

                          tmpColor = new classColor_LAB(lValue,aValue,bValue);

                        break;
                      case "din99":
                          var l99Value = this.din99ColorArray[currentKeyPos-1].get1Value()+(this.din99ColorArray[currentKeyPos].get1Value() - this.din99ColorArray[currentKeyPos-1].get1Value())*tmpRatio;
                          var a99Value = this.din99ColorArray[currentKeyPos-1].get2Value()+(this.din99ColorArray[currentKeyPos].get2Value() - this.din99ColorArray[currentKeyPos-1].get2Value())*tmpRatio;
                          var b99Value = this.din99ColorArray[currentKeyPos-1].get3Value()+(this.din99ColorArray[currentKeyPos].get3Value() - this.din99ColorArray[currentKeyPos-1].get3Value())*tmpRatio;

                          tmpColor = new classColorDIN99(l99Value,a99Value,b99Value);
                        break;
                      default:
                      console.log("Error calcColorMap function");
                    }
                    tmpColormap.addElement(tmpColor, tmpIntervalRef[intervalRefIndex], type);
                    intervalRefIndex++;
            break;
          default:
            doneLastKey=true;

        }

        if(currentKeyPos==this.positionPoints.lenght){
          doneLastKey=true;
        }

      }


    }

    return tmpColormap;

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


   setMiddleOfTripple(){
     /// hier weiter
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





class class_CMS {

    constructor() {
    this.name = "Customer Colormap";

    this.NaN_RGB = new classColor_RGB(0,0,0);
    this.NaN_HSV = new classColor_HSV(0,0,0);
    this.NaN_LAB = new classColor_LAB(0,0,0);
    this.NaN_DIN99 = new classColorDIN99(0,0,0);

    /// color array from import and for the export
    this.preprocessingColorArray = [];
    this.preprocessingPositionPoints = [];

    //// Real CMS structure
    this.keyArray = [];
    this.intervalArray=[];
    this.intervalPosition=[];

    /// color transformation settings (future work)
    this.ref_X = 94.811;
    this.ref_Y = 100.000;
    this.ref_Z = 107.304;
    this.kE =1;
    this.kCH =1;

  }

  /////////////////////////////////
  //// Key Structure
  /////////////////////////////////

  deleteKey(index){
    this.keyArray.splice(index, 1);
  }

  clear(){
    this.name = "Customer Colormap";

    this.NaN_RGB = new classColor_RGB(0,0,0);
    this.NaN_HSV = new classColor_HSV(0,0,0);
    this.NaN_LAB = new classColor_LAB(0,0,0);
    this.NaN_DIN99 = new classColorDIN99(0,0,0);

    /// color array from import and for the export
    this.preprocessingColorArray = [];
    this.preprocessingPositionPoints = [];

    //// Real CMS structure
    this.keyArray = [];
    this.intervalArray=[];
    this.intervalPosition=[];

  }

  ///////////////////////////////////
  /// key functions
  //////////////////////////////////

  createKeys(){

    this.keyArray=[];

    var lastElementTwin = false;
    var lastElementLeft = false;

     for(var i = 0; i<this.preprocessingPositionPoints.length-1; i++){
        if(lastElementLeft==true){
            lastElementLeft = false;
            continue;
        }
        if(lastElementTwin==true){
            lastElementTwin = false;
            continue;
        }
        if(i==0){
            if(preprocessingColorArray[i].equalTo(preprocessingColorArray[i+1])){
                // nil key
                var cL = undefined;
                var cR = undefined;
                var newKey = new class_Key(cL,cR,preprocessingPositionPoints[i]);
                this.keyArray.push(newKey);
            }
            else{
                // right key
                var cL = undefined;
                var cR = preprocessingColorArray[i];
                var newKey = new class_Key(cL,cR,preprocessingPositionPoints[i]);
                this.keyArray.push(newKey);
            }
        }
        else{
            // twin/leftKey  or not
            if(this.preprocessingPositionPoints[i]==this.preprocessingPositionPoints[i+1]){
                if(i+2>this.preprocessingPositionPoints.length-1){

                    alert("Error in Colormap -> twin key at the end of colormap is not possible");

                }
                else{
                    if(this.rgbColorArray[i+1].getRGBString()===this.rgbColorArray[i+2].getRGBString()){
                        this.positionKeys.push("left key");
                        this.middleOfTriple.push(true);

                        // left key
                        var cL = preprocessingColorArray[i];
                        var cR = undefined;
                        var newKey = new class_Key(cL,cR,preprocessingPositionPoints[i]);
                        this.keyArray.push(newKey);

                        lastElementLeft = true;
                    }
                    else{
                        this.positionKeys.push("twin key");
                        this.middleOfTriple.push(true);

                        // right key
                        var cL = preprocessingColorArray[i];
                        var cR = preprocessingColorArray[i+1];
                        var newKey = new class_Key(cL,cR,preprocessingPositionPoints[i]);
                        this.keyArray.push(newKey);

                        lastElementTwin = true;
                    }
                }

            }
            else{

                var cL = preprocessingColorArray[i];
                var cR = preprocessingColorArray[i];
                var newKey = new class_Key(cL,cR,preprocessingPositionPoints[i]);
                this.keyArray.push(newKey);

            }
        }

     }


     var cL = preprocessingColorArray[preprocessingColorArray.lenght-1];
     var cR = undefined;
     var newKey = new class_Key(cL,cR,preprocessingPositionPoints[preprocessingPositionPoints.lenght-1]);
     this.keyArray.push(newKey);


  }

  getKeyLength(){
    return this.keyArray.length;
  }

  getKey(index){
    return this.keyArray[index];
  }

  setRefPosition(index, ref){
    this.keyArray[index].setRefPosition(ref);
  }

  getRefRange(){
    return (this.keyArray[this.keyArray.length-1].getRefPosition()-this.keyArray[0].getRefPosition());
  }

  getRefPosition(index){
    return this.keyArray[index].getRefPosition();
  }


  setLeftKeyColor(index, color){
    this.keyArray[index].setLeftKeyColor(color);
  }

  getLeftKeyColor(index, colorspace){
    return this.keyArray[index].getLeftKeyColor(colorspace);
  }

  setRightKeyColor(index, color){
    this.keyArray[index].setRightKeyColor(color);
  }

  getRightKeyColor(index, colorspace){
    return this.keyArray[index].getRightKeyColor(colorspace);
  }

  getKeyType(index){
    return this.keyArray[index].getKeyType();
  }

  getMoT(index){
    return this.keyArray[index].getMoT();
  }

  setMoT(index,mot){
    this.keyArray[index].setMoT(mot);
  }


  insertKey(index,key){
      this.keyArray.splice(index, 0,key);
  }

  pushKey(key){
      this.keyArray.push(key);
  }


  ///////////////////////////////////
  /// Interval functions
  //////////////////////////////////

  /// CMS Interval Colors
  calcIntervalColors(intervals, colorspace){
    this.intervalArray=[];
    this.intervalPosition=[];


    if(this.keyArray.length>1 && intervals !=0){

      var tmpIntervalRef=[];
      var intervalDistance = (this.keyArray[this.keyArray.length-1].getRefPosition()-this.keyArray[0].getRefPosition())/intervals;


      for(var i=0; i<intervals; i++){
            var tmpVal = this.keyArray[0].getRefPosition()+(i*intervalDistance);
            tmpIntervalRef.push(tmpVal);
        }
        tmpIntervalRef.push(this.keyArray[this.keyArray.length-1].getRefPosition());



      var currentKeyPos = 0;
      var startIndex = 0;

      for(var refIndex=0; refIndex<tmpIntervalRef.length; refIndex++){

          if(tmpIntervalRef[refIndex]>this.keyArray[currentKeyPos].getRefPosition()){
            var arrayPos = [startIndex, this.intervalArray.length-1];
            this.intervalPosition.push(arrayPos);
            startIndex=this.intervalArray.length;
            currentKeyPos++;
          }

          if(tmpIntervalRef[refIndex]==this.keyArray[currentKeyPos].getRefPosition()){
            var tmpColor;
            switch (this.keyArray[currentKeyPos].getKeyType()) {
                case "nil key":
                tmpColor = this.keyArray[currentKeyPos+1].getLeftKeyColor(colorspace);
                break;
              case "twin key":
                if(this.keyArray[currentKeyPos].getMoT())
                tmpColor = this.keyArray[currentKeyPos].getRightKeyColor(colorspace);
                else
                tmpColor = this.keyArray[currentKeyPos].getLeftKeyColor(colorspace);

                var arrayPos = [startIndex, this.intervalArray.length];
                this.intervalPosition.push(arrayPos);
                startIndex=this.intervalArray.length+1;

                break;
              case "left key":
                if(currentKeyPos==this.keyArray.length-1){
                  tmpColor = this.keyArray[currentKeyPos].getLeftKeyColor(colorspace);
                }
                else {
                  if(this.keyArray[currentKeyPos].getMoT())
                  tmpColor = this.keyArray[currentKeyPos].getRightKeyColor(colorspace+1);
                  else
                  tmpColor = this.keyArray[currentKeyPos].getLeftKeyColor(colorspace);
                }

                var arrayPos = [startIndex, this.intervalArray.length];
                this.intervalPosition.push(arrayPos);
                startIndex=this.intervalArray.length+1;

                break;
              case "right key":
                tmpColor = this.keyArray[currentKeyPos].getRightKeyColor(colorspace);
                break;
              default:
                //  dual key
                tmpColor = this.keyArray[currentKeyPos].getRightKeyColor(colorspace);

                var arrayPos = [startIndex, this.intervalArray.length];
                this.intervalPosition.push(arrayPos);
                startIndex=this.intervalArray.length+1;
            }

            var newInterval = new class_Interval(tmpColor, true, tmpIntervalRef[refIndex]);
            this.intervalArray.push(newInterval);
            currentKeyPos++;
          }
          else{
              /////////////////////////////////////////
              //// calc new interval color
              /////////////////////////////////////////

              var color1;
              var color2;
              var tmpColor;
              var doInterpolation=true;
              ///// get color1

              switch (this.keyArray[currentKeyPos-1].getKeyType()) {
                case "nil key": case "left key":
                  tmpColor = this.keyArray[currentKeyPos].getLeftKeyColor(colorspace);
                  doInterpolation=false;
                default:
                  // right or dual key
                  color1 = this.keyArray[currentKeyPos-1].getRightKeyColor(colorspace);

              }

              ///// get color2
              // twin left or dual key
              color2 = this.keyArray[currentKeyPos].getLeftKeyColor(colorspace);

            if(doInterpolation){
              var leftRef = this.keyArray[currentKeyPos-1].getRefPosition();
              var rightRef = this.keyArray[currentKeyPos].getRefPosition();
              var tmpRatio = (tmpIntervalRef[refIndex]-leftRef)/(rightRef-leftRef);

              switch (colorspace) {
                case "rgb":
                    var rValue = color1.get1Value()+(color2.get1Value() - color1.get1Value())*tmpRatio;
                    var gValue = color1.get2Value()+(color2.get2Value() - color1.get2Value())*tmpRatio;
                    var bValue = color1.get3Value()+(color2.get3Value() - color1.get3Value())*tmpRatio;

                    tmpColor = new classColor_RGB(rValue,gValue,bValue);
                  break;
                case "hsv":

                    var tmpDis = color1.getSValue()*50; // radius 50; center(0,0,0);
                    var tmpRad = (color1.getHValue()*Math.PI*2)-Math.PI;
                    var xPos = tmpDis*Math.cos(tmpRad);
                    var yPos = tmpDis*Math.sin(tmpRad);
                    var zPos = color1.getVValue()-50;

                    var tmpDis2 = color2.getSValue()*50;
                    var tmpRad2 = (color2.getHValue()*Math.PI*2)-Math.PI;
                    var xPos2 = tmpDis2*Math.cos(tmpRad2);
                    var yPos2 = tmpDis2*Math.sin(tmpRad2);
                    var zPos2 = color2.getVValue()-50;

                    var tmpX = xPos+(xPos2 - xPos)*tmpRatio;
                    var tmpY = yPos+(yPos2 - yPos)*tmpRatio;
                    var tmpZ = zPos+(zPos2 - zPos)*tmpRatio;

                    var tmpH =(Math.atan2(tmpY,tmpX)+Math.PI)/(Math.PI*2);
                    var tmpS = Math.sqrt(Math.pow(tmpX,2)+Math.pow(tmpY,2))/50;
                    var tmpV = tmpZ+50;
                    tmpColor = new classColor_HSV(tmpH,tmpS,tmpV);

                  break;
                case "lab":

                    var lValue = color1.get1Value()+(color2.get1Value() - color1.get1Value())*tmpRatio;
                    var aValue = color1.get2Value()+(color2.get2Value() - color1.get2Value())*tmpRatio;
                    var bValue = color1.get3Value()+(color2.get3Value() - color1.get3Value())*tmpRatio;

                    tmpColor = new classColor_LAB(lValue,aValue,bValue);

                  break;
                case "din99":
                    var l99Value = color1.get1Value()+(color2.get1Value() - color1.get1Value())*tmpRatio;
                    var a99Value = color1.get2Value()+(color2.get2Value() - color1.get2Value())*tmpRatio;
                    var b99Value = color1.get3Value()+(color2.get3Value() - color1.get3Value())*tmpRatio;

                    tmpColor = new classColorDIN99(l99Value,a99Value,b99Value);
                  break;
                default:
                console.log("Error calcColorMap function");
              }

              // calc color
              var newInterval = new class_Interval(tmpColor, false, tmpIntervalRef[refIndex]);
              this.intervalArray.push(newInterval);
            }//if

        }//else



      }//for

    }//



  }//

  getIntervalColor(index,colorspace){
      return this.intervalArray[index].getColor(colorspace);
  }

  getIntervalisKey(index){
      return this.intervalArray[index].getIsKeyPart();
  }

  /////////////// Other GET SET ////////////////////

  getIntervalPositions(keyIndex){
    // gives the first interval index and the last interval index between the key with keyIndex and the key with the keyIndex+1
    if(keyIndex!=this.keyArray.length-1)
      return this.intervalPosition[keyIndex];
    else
      return [0,0]

  }


   getColormapName() {
    return this.name;
   }

   setColormapName(newName) {
    this.name = newName;
   }

   pushPreprocessColor(color){
     preprocessingColorArray.push(color);

   }

    pushPreprocessRef(position){
        this.preprocessingPositionPoints.push(position);
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



}


function cloneCMS(cmsObj){

  var newCMS = new class_CMS();
  newCMS.setColormapName(cmsObj.getColormapName());
  newCMS.setNaNColor(cmsObj.getNaNColor("lab"));

  //clone Keys
  for(var i=0; i<cmsObj.getKeyLength(); i++){
    var keyObj = cmsObj.getKey(i);
    var newKey = new class_Key(keyObj.getLeftKeyColor("lab"),keyObj.getRightKeyColor("lab"),keyObj.getRefPosition());
    newCMS.pushKey(newKey);
  }

  return newCMS;
}
