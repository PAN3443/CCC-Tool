class class_CMS {


    // for future # => private  .... change this. to this.#
    // private fields are not supported at the moment
    /*  #name = "Customer Colormap";
        #interpolationSpace="lab";
        #interpolationType="linear"; // linear or spline or optimization
        #description = "";
        #colorNaN = new class_Color_LAB(0,0,0);
        #colorBelow = new class_Color_LAB(0,0,0);
        #colorAbove = new class_Color_LAB(0,0,0);
        #deltaE_RGB = 10;
        #deltaE_HSV = 10;
        #deltaE_LAB = 2;
        #deltaE_DIN99 = 2;
        #preventIntervalCalculation = true;
        #keyArray = [];
        #intervalArray=[];
        #intervalExportSampling=[];
        #probeSetArray=[];*/

    constructor() {
    this.name = "Customer Colormap";
    this.interpolationSpace="lab";
    this.interpolationType="linear"; // linear or spline or optimization

    this.description = "";

    this.colorNaN = new class_Color_LAB(0,0,0);
    this.colorBelow = new class_Color_LAB(0,0,0);
    this.colorAbove = new class_Color_LAB(0,0,0);

    /// color array from import and for the export
    //this.preprocessingColorArray = [];
    //this.preprocessingPositionPoints = [];

    //// Real CMS structure
    this.deltaE_RGB = 10;
    this.deltaE_HSV = 10;
    this.deltaE_LAB = 2;
    this.deltaE_DIN99 = 2;

    this.preventIntervalCalculation = true;
    this.keyArray = [];
    this.intervalArray=[];
    this.intervalExportSampling=[];

    /// Probes
    this.probeSetArray=[];
  }


  deleteReferences(){
    delete this.name;
    delete this.interpolationSpace;
    delete this.interpolationType;

    delete this.description;

    this.colorNaN.deleteReferences();
    this.colorNaN=null;
    this.colorBelow.deleteReferences();
    this.colorBelow=null;
    this.colorAbove.deleteReferences();
    this.colorAbove=null;

    for (var i = this.keyArray.length-1; i >=0 ; i--) {
      this.keyArray[i].deleteReferences();
      this.keyArray[i]=null;
    }
    delete this.keyArray;

    for (var i = this.intervalArray.length-1; i>=0 ; i--) {
      for (var j = this.intervalArray[i].length-1; j>=0; j--) {
        this.intervalArray[i][j].deleteReferences();
        this.intervalArray[i][j]=null;
      }
    }
    delete this.intervalArray;

    for (var i = this.intervalExportSampling.length-1; i>=0 ; i--) {
      for (var j = this.intervalExportSampling[i].length-1; j>=0; j--) {
        this.intervalExportSampling[i][j].deleteReferences();
        this.intervalExportSampling[i][j]=null;
      }
    }
    delete this.intervalExportSampling;

    for (var i = this.probeSetArray.length-1; i >=0 ; i--) {
      this.probeSetArray[i].deleteReferences();
      this.probeSetArray[i]=null;
    }
    delete this.probeSetArray;

  }


  clearIntervalColors(){
    for (var i = this.intervalArray.length-1; i>=0 ; i--) {
      for (var j = this.intervalArray[i].length-1; j>=0; j--) {
        this.intervalArray[i][j].deleteReferences();
        this.intervalArray[i][j]=null;
      }
    }
    this.intervalArray=[];

    for(var keyIndex=0; keyIndex<this.keyArray.length-1; keyIndex++){
      this.intervalArray.push([]);
    }
  }


  clear(){
    /*this.name = "Customer Colormap";*/

    this.colorNaN.set1Value(0);
    this.colorNaN.set1Value(0);
    this.colorNaN.set1Value(0);
    this.colorBelow.set1Value(0);
    this.colorBelow.set1Value(0);
    this.colorBelow.set1Value(0);
    this.colorNaN.set1Value(0);
    this.colorNaN.set1Value(0);
    this.colorNaN.set1Value(0);

    this.preventIntervalCalculation = true;

    /// color array from import and for the export
    //this.preprocessingColorArray = [];
    //this.preprocessingPositionPoints = [];

    //// Real CMS structure

    for (var i = this.keyArray.length-1; i >=0 ; i--) {
      this.keyArray[i].deleteReferences();
      this.keyArray[i]=null;
    }
    this.keyArray = [];

    for (var i = this.intervalArray.length-1; i>=0 ; i--) {
      for (var j = this.intervalArray[i].length-1; j>=0; j--) {
        this.intervalArray[i][j].deleteReferences();
        this.intervalArray[i][j]=null;
      }
    }
    this.intervalArray=[];

    for (var i = this.intervalExportSampling.length-1; i>=0 ; i--) {
      for (var j = this.intervalExportSampling[i].length-1; j>=0; j--) {
        this.intervalExportSampling[i][j].deleteReferences();
        this.intervalExportSampling[i][j]=null;
      }
    }
    this.intervalExportSampling=[];

    for (var i = this.probeSetArray.length-1; i >=0 ; i--) {
      this.probeSetArray[i].deleteReferences();
      this.probeSetArray[i]=null;
    }
    this.probeSetArray=[];

  }

  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Interval functions
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  setPreventIntervals(bool){
    this.preventIntervalCalculation=bool;

    if(this.preventIntervalCalculation){
      for (var i = this.intervalArray.length-1; i>=0 ; i--) {
        for (var j = this.intervalArray[i].length-1; j>=0; j--) {
          this.intervalArray[i][j].deleteReferences();
          this.intervalArray[i][j]=null;
        }
      }
      this.intervalArray=[];
    }
    else {
      this.calcDeltaIntervalColors();
    }

  }

  getPreventIntervals(){
    return this.preventIntervalCalculation;
  }

  calcExportSampling(numIntervals){

    for (var i = this.intervalExportSampling.length-1; i>=0 ; i--) {
      for (var j = this.intervalExportSampling[i].length-1; j>=0; j--) {
        this.intervalExportSampling[i][j].deleteReferences();
        this.intervalExportSampling[i][j]=null;
      }
    }
    this.intervalExportSampling=[];


    if(this.keyArray.length<2)
    return;


    var startPos = this.keyArray[0].getRefPosition();
    var endPos = this.keyArray[this.keyArray.length-1].getRefPosition();

    var intervalDistance = (endPos-startPos)/(numIntervals);

    var currentIntervalPointPos = startPos;
    var intervalPointCounter = 0;

    var error = 1e12;//1e-12; // because of common known problem 0.1+0.2 will be 0.30000000000000004

    for(var keyIndex=0; keyIndex<this.keyArray.length-1; keyIndex++){

      var currentPos = this.keyArray[keyIndex].getRefPosition();
      var nextPos = this.keyArray[keyIndex+1].getRefPosition();
      this.intervalExportSampling.push([]);

      if(currentIntervalPointPos==currentPos){
        currentIntervalPointPos=Math.round((currentIntervalPointPos+intervalDistance) * error) / error; //currentIntervalPointPos+=intervalDistance;
      }

      var tmpColor,tmpColor2;

      switch (this.keyArray[keyIndex].getKeyType()) {


          case "nil key": case "left key":


          while (currentIntervalPointPos<nextPos) {

            intervalPointCounter++;
            if(intervalPointCounter==numIntervals) // last interval point has to hit the last key reference, but it is possible that the algorithm did not hit this value exactly and we have to stop it then and only adding the last key as interval
            break;

            currentIntervalPointPos=Math.round((currentIntervalPointPos+intervalDistance) * error) / error; //currentIntervalPointPos+=intervalDistance;

          }

          break;

        default:

        var ref1 = this.keyArray[keyIndex].getRefPosition();
        var ref2 = this.keyArray[keyIndex+1].getRefPosition();

        while (currentIntervalPointPos<nextPos) {

          intervalPointCounter++;
          if(intervalPointCounter==numIntervals) // last interval point has to hit the last key reference, but it is possible that the algorithm did not hit this value exactly and we have to stop it then and only adding the last key as interval
          break;

          var intervalColor = this.calculateColor(currentIntervalPointPos, this.interpolationSpace);
          this.intervalExportSampling[keyIndex].push(new class_Interval(intervalColor,  currentIntervalPointPos));

          currentIntervalPointPos=Math.round((currentIntervalPointPos+intervalDistance) * error) / error; //currentIntervalPointPos+=intervalDistance;

        }

      }

    }//for

  }

  calcDeltaIntervalColors(){

    if(!this.preventIntervalCalculation){
      for (var i = this.intervalArray.length-1; i>=0 ; i--) {
        for (var j = this.intervalArray[i].length-1; j>=0; j--) {
          this.intervalArray[i][j].deleteReferences();
          this.intervalArray[i][j]=null;
        }
      }
      this.intervalArray=[];

      if(this.keyArray.length<2)
      return;

      for(var keyIndex=0; keyIndex<this.keyArray.length-1; keyIndex++){

        this.intervalArray.push([]);

        if(this.keyArray[keyIndex].getKeyType()!="nil key" && this.keyArray[keyIndex].getKeyType()!="left key"){

          var ref1 = this.keyArray[keyIndex].getRefPosition();
          var ref2 = this.keyArray[keyIndex+1].getRefPosition();

          var tmpDeltaIntervals = undefined;


          if(this.interpolationType=="linear"){

            switch (this.interpolationSpace) {
              case "rgb":
                tmpDeltaIntervals = calcDeltaIntervalBetween_C1C2(this.keyArray[keyIndex].getRightKeyColor(this.interpolationSpace),this.keyArray[keyIndex+1].getLeftKeyColor(this.interpolationSpace), this.deltaE_RGB, this.interpolationSpace);
              break;
              case "hsv":
                tmpDeltaIntervals = calcDeltaIntervalBetween_C1C2(this.keyArray[keyIndex].getRightKeyColor(this.interpolationSpace),this.keyArray[keyIndex+1].getLeftKeyColor(this.interpolationSpace), this.deltaE_HSV, this.interpolationSpace);
              break;
              case "lch":
                tmpDeltaIntervals = calcDeltaIntervalBetween_C1C2(this.keyArray[keyIndex].getRightKeyColor(this.interpolationSpace),this.keyArray[keyIndex+1].getLeftKeyColor(this.interpolationSpace), this.deltaE_HSV, this.interpolationSpace);
              break;
              case "lab":
              case "de94-ds":
              case "de2000-ds":
                tmpDeltaIntervals = calcDeltaIntervalBetween_C1C2(this.keyArray[keyIndex].getRightKeyColor(this.interpolationSpace),this.keyArray[keyIndex+1].getLeftKeyColor(this.interpolationSpace), this.deltaE_LAB, this.interpolationSpace);
              break;
              case "din99":
                tmpDeltaIntervals = calcDeltaIntervalBetween_C1C2(this.keyArray[keyIndex].getRightKeyColor(this.interpolationSpace),this.keyArray[keyIndex+1].getLeftKeyColor(this.interpolationSpace), this.deltaE_DIN99, this.interpolationSpace);
              break;
            }

          }
          else {
            var tArray = [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9];
            //var tArray = [0.02, 0.04, 0.06, 0.08, 0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9, 0.92, 0.94, 0.96, 0.98];

            tmpDeltaIntervals = calcSplineIntervalBetween_C1C2(tArray, this.getSplineColors(keyIndex,keyIndex+1), 1.0,this.interpolationSpace);
          }

          if(tmpDeltaIntervals==undefined)
            continue;

          // tmpDeltaIntervals = [[colors][colorDifferences][ratios]];
          var keyDistance = Math.abs(ref2-ref1);
          var currentPos = ref1;
          var intervalDistance =  keyDistance/(tmpDeltaIntervals[0].length+1);

            for (var i = 0; i < tmpDeltaIntervals[0].length; i++) {
              var intervalRef = ref1+((i+1)*intervalDistance); // equal distribution of the interval ref positions
              if(this.interpolationSpace==="de94-ds" || this.interpolationSpace==="de2000-ds"){
                currentPos += (tmpDeltaIntervals[2][i]*keyDistance);
                intervalRef = currentPos;
              }
              // the ratio of the colordifference determine the new ref position

              var newInterval = new class_Interval(tmpDeltaIntervals[0][i], intervalRef);
              this.intervalArray[keyIndex].push(newInterval);
              }// For

        }// If

      } // For
    }

 }

  getInterpolationType(){
     return this.interpolationType;
   }

  setInterpolationType(type){
     this.interpolationType=type;
     this.calcDeltaIntervalColors();
   }

  getIntervalLength(keyBandIndex){
    if(keyBandIndex<this.intervalArray.length)
      return this.intervalArray[keyBandIndex].length;
    else
      return 0;
  }

  getIntervalColor(keyBandIndex,index,colorspace){
        return this.intervalArray[keyBandIndex][index].getColor(colorspace);
    }

  getIntervalRef(keyBandIndex,index){
        return this.intervalArray[keyBandIndex][index].getRefPosition();
    }

  getExportSamplingLength(keyBandIndex){
    if(keyBandIndex<this.intervalExportSampling.length)
      return this.intervalExportSampling[keyBandIndex].length;
    else
      return 0;
  }

  getExportSamplingColor(keyBandIndex,index,colorspace){
      return this.intervalExportSampling[keyBandIndex][index].getColor(colorspace);
  }

  getExportSamplingRef(keyBandIndex,index){
    return this.intervalExportSampling[keyBandIndex][index].getRefPosition();
  }

  getSplineColors(keyIndex1,keyIndex2){

        // no interpolation needed for constand bands
        if(this.getKeyType(keyIndex1)=="nil key" ||  this.getKeyType(keyIndex1)=="left key")
          return [undefined,undefined,undefined,undefined];

        if(this.interpolationSpace=="de94" || this.interpolationSpace=="de2000")
          return [undefined,undefined,undefined,undefined];

        var existingC1 = true;
        var existingC3 = true;

        if(this.getKeyType(keyIndex1)=="right key" ||  this.getKeyType(keyIndex1)=="twin key"){
          existingC1=false;
        }

        if(this.getKeyType(keyIndex2)=="left key" || this.getKeyType(keyIndex2)=="twin key" || keyIndex2==this.keyArray.length-1){ // this.keyArray.length-1 is alwas a left key. For the push creation this don't have to be.
          existingC3=false;
        }

        var c0 = undefined; //
        var c1 = undefined; //
        var c2 = undefined; //
        var c3 = undefined; //

        if(!existingC1)
          c0 = new class_Color_RGB(0,0,0);  // every value is zero and has no influence
        else
          c0 = this.getRightKeyColor(keyIndex1-1,this.interpolationSpace);

        c1 = this.getRightKeyColor(keyIndex1,this.interpolationSpace);

        c2 = this.getLeftKeyColor(keyIndex2,this.interpolationSpace);

        if(!existingC3)
          c3 = new class_Color_RGB(0,0,0);  // every value is zero and has no influence
        else{
          c3 = this.getLeftKeyColor(keyIndex2+1,this.interpolationSpace);
        }

        return [c0,c1,c2,c3];

    }

  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  setInterpolationSpace(space){
    this.interpolationSpace=space;
    this.calcDeltaIntervalColors();
  }

  getInterpolationSpace(){
    return this.interpolationSpace;
  }


  insertCMS(cms, insertIndex){

    if(this.getKeyLength()==0)
      return;

    var cmsDis = cms.getRefRange();

    switch (insertIndex) {
      case this.getKeyLength()-1:
        // case scaled band
        var tmpVal = this.getRefPosition(insertIndex);
        var dist = Math.abs(tmpVal-this.getRefPosition(insertIndex-1))*0.5;
        var startPos = tmpVal-dist;

        this.setRefPosition(insertIndex,startPos);
        this.setRightKeyColor(insertIndex,cms.getRightKeyColor(0,"lab"));

        for (var i = 1; i < cms.getKeyLength()-1; i++) {

          var ratio = (cms.getRefPosition(i)-cms.getRefPosition(i-1))/cmsDis;
          startPos = startPos+dist*ratio;

          var tmpKey = cms.getKeyClone(i);
          tmpKey.setRefPosition(startPos);
          this.pushKey(tmpKey,false); // push new left key
        }

        var tmpKey2 = cms.getKeyClone(i);
        tmpKey2.setRefPosition(tmpVal);
        this.pushKey(tmpKey2,true);

        break;

      default:

      var startPos = this.getRefPosition(insertIndex);
      var dist = Math.abs(this.getRefPosition(insertIndex+1)-startPos)*0.5;
      var endPos = (startPos+dist);



      this.setRefPosition(insertIndex,endPos);
      var oldColor = this.getLeftKeyColor(insertIndex,"lab");


      this.setLeftKeyColor(insertIndex,cms.getLeftKeyColor(cms.getKeyLength()-1,"lab"));
      this.setBur(insertIndex,true);

      for (var i = cms.getKeyLength()-2; i >= 0 ; i--) {

        var ratio = (cms.getRefPosition(i+1)-cms.getRefPosition(i))/cmsDis;
        endPos = endPos-dist*ratio;

        var tmpKey = cms.getKeyClone(i);
        tmpKey.setRefPosition(endPos);
        this.insertKey(insertIndex, tmpKey);
      }

      this.setLeftKeyColor(insertIndex,oldColor);
      this.setBur(insertIndex,true);



    }
    this.calcDeltaIntervalColors();
  }

  /* Not sure if we need updateColorToNewSettings anymore.
  /*updateColorToNewSettings(){

    this.colorNaN = this.colorNaN.calcDIN99Color();
    this.colorBelow = this.colorBelow.calcLABColor();
    this.colorAbove = this.colorAbove.calcLABColor();

    for (var i = 0; i < this.keyArray.length; i++) {
      this.keyArray[i].updateKeyColorsToSettings();
    }

  }*/

  /////////////////////////////////
  //// Key Structure
  /////////////////////////////////

  calcReverse(){

    if(this.keyArray.length<2)
      return;

    var tmpKeyArray = [];
    var startPos = this.keyArray[0].getRefPosition();
    var endPos = this.keyArray[this.keyArray.length-1].getRefPosition();
    var dis = endPos-startPos;


    for (var i = 0; i < this.keyArray.length; i++) {

      //
      if((this.keyArray[i].getKeyType()==="nil key" || this.keyArray[i].getKeyType()==="left key") && i!=this.keyArray.length-1){
         this.keyArray[i].setRightKeyColor(this.keyArray[i+1].getLeftKeyColor("lab"));
         this.keyArray[i+1].setLeftKeyColor(undefined);
      }

      var newPos = startPos+(endPos-this.keyArray[i].getRefPosition());

      var tmpColor = this.keyArray[i].getLeftKeyColor("lab");
      this.keyArray[i].setLeftKeyColor(this.keyArray[i].getRightKeyColor("lab"));
      this.keyArray[i].setRightKeyColor(tmpColor);

      tmpKeyArray.splice(0, 0,this.getKeyClone(i));
      tmpKeyArray[0].setRefPosition(newPos);
    }

    for (var i = 0; i < array.length; i++) {
      array[i]
    }
    for (var i = this.keyArray.length-1; i >=0 ; i--) {
      this.keyArray[i].deleteReferences();
      this.keyArray[i]=null;
    }
    this.keyArray = tmpKeyArray;
    this.calcDeltaIntervalColors();
  }

  setAutoRange(newStart,newEnd){

    var currentStart = this.keyArray[0].getRefPosition();
    var currentdistance = this.keyArray[this.keyArray.length-1].getRefPosition()-currentStart;
    var newDistance = newEnd-newStart;

    for (var i = 0; i < this.keyArray.length; i++) {
      var ratio = (this.keyArray[i].getRefPosition()-currentStart)/currentdistance;
      var newPos = newStart+ratio*newDistance;
      this.keyArray[i].setRefPosition(newPos);
    }
    this.calcDeltaIntervalColors();

  }

  calculateColor(val){

    if(isNaN(val)){
      return this.colorNaN.calcRGBColor();
    }

    if(val<this.keyArray[0].getRefPosition()){
      return this.colorBelow.calcRGBColor();
    }


    if(val>this.keyArray[this.keyArray.length-1].getRefPosition()){
      return this.colorAbove.calcRGBColor();
    }

    for (var i = 0; i < this.keyArray.length-1; i++) {

      if(val>this.keyArray[i].getRefPosition() && val<this.keyArray[i+1].getRefPosition()){

        var color1 = this.keyArray[i].getRightKeyColor(this.interpolationSpace);
        var color2 = this.keyArray[i+1].getLeftKeyColor(this.interpolationSpace);

        if(color1==undefined){
          return color2.calcRGBColor();
        }

        var newColorValues =undefined;
        if((this.getInterpolationSpace()==="de94-ds" || this.getInterpolationSpace()==="de2000-ds" || this.getInterpolationType()==="spline") && this.getIntervalLength(i)>0){

          if(val>this.keyArray[i].getRefPosition() && val<=this.getIntervalRef(i,0)){
            var leftRef = this.keyArray[i].getRefPosition();
            var rightRef = this.getIntervalRef(i,0);
            var intervalColor2 = this.getIntervalColor(i,0,this.interpolationSpace);
            var tmpRatio = (val-leftRef)/(rightRef-leftRef);
            newColorValues = calcGradientLinear(color1.get1Value(),color1.get2Value(),color1.get3Value(),intervalColor2.get1Value(),intervalColor2.get2Value(),intervalColor2.get3Value(), tmpRatio);
            intervalColor2.deleteReferences();
            intervalColor2 = null;
          } else if (val>this.getIntervalRef(i,this.getIntervalLength(i)-1) && val<this.keyArray[i+1].getRefPosition()) {
            var leftRef =  this.getIntervalRef(i,this.getIntervalLength(i)-1);
            var rightRef = this.keyArray[i+1].getRefPosition();
            var intervalColor1 = this.getIntervalColor(i,this.getIntervalLength(i)-1,this.interpolationSpace);
            var tmpRatio = (val-leftRef)/(rightRef-leftRef);
            newColorValues = calcGradientLinear(intervalColor1.get1Value(),intervalColor1.get2Value(),intervalColor1.get3Value(),color2.get1Value(),color2.get2Value(),color2.get3Value(), tmpRatio);
            intervalColor1.deleteReferences();
            intervalColor1 = null;
          } else {
            for (var j = 0; j < this.getIntervalLength(i)-1; j++){
              if(val>this.getIntervalRef(i,j) && val<=this.getIntervalRef(i,j+1)){
                var leftRef =  this.getIntervalRef(i,j);
                var rightRef = this.getIntervalRef(i,j+1);
                var intervalColor1 = this.getIntervalColor(i,j,this.interpolationSpace);
                var intervalColor2 = this.getIntervalColor(i,j+1,this.interpolationSpace);
                var tmpRatio = (val-leftRef)/(rightRef-leftRef);
                newColorValues = calcGradientLinear(intervalColor1.get1Value(),intervalColor1.get2Value(),intervalColor1.get3Value(),intervalColor2.get1Value(),intervalColor2.get2Value(),intervalColor2.get3Value(), tmpRatio);
                intervalColor1.deleteReferences();
                intervalColor1 = null;
                intervalColor2.deleteReferences();
                intervalColor2 = null;
              }
            }
          }
        }
        else{
          var leftRef = this.keyArray[i].getRefPosition();
          var rightRef = this.keyArray[i+1].getRefPosition();
          var tmpRatio = (val-leftRef)/(rightRef-leftRef);
          newColorValues = calcGradientLinear(color1.get1Value(),color1.get2Value(),color1.get3Value(),color2.get1Value(),color2.get2Value(),color2.get3Value(), tmpRatio);
        }

        color1.deleteReferences();
        color2.deleteReferences();
        color1=null;
        color2=null;

        switch (this.interpolationSpace) {
          case "rgb":
              return new class_Color_RGB(newColorValues[0],newColorValues[1],newColorValues[2]);
          case "hsv":
              var tmpColor = new class_Color_HSV(newColorValues[0],newColorValues[1],newColorValues[2]);
              var rgbColor = tmpColor.calcRGBColor();
              tmpColor.deleteReferences();
              tmpColor=null;
              return rgbColor;
            break;
          case "lab":
          case "de94":
          case "de94-ds":
          case "de2000":
          case "de2000-ds":
              var tmpColor = new class_Color_LAB(newColorValues[0],newColorValues[1],newColorValues[2]);
              var rgbColor = tmpColor.calcRGBColor();
              tmpColor.deleteReferences();
              tmpColor=null;
              return rgbColor;
            break;
          case "din99":
              var tmpColor = new class_Color_DIN99(newColorValues[0],newColorValues[1],newColorValues[2]);
              var rgbColor = tmpColor.calcRGBColor();
              tmpColor.deleteReferences();
              tmpColor=null;
              return rgbColor;
            break;
          case "lch":
              var tmpColor = new class_Color_LCH(newColorValues[2],newColorValues[1],newColorValues[0]);
              var rgbColor = tmpColor.calcRGBColor();
              tmpColor.deleteReferences();
              tmpColor=null;
              return rgbColor;
          break;

          default:
          console.log("Error calculateColor function");
          color1.deleteReferences();
          color2.deleteReferences();
          color1=null;
          color2=null;
          return cloneColor(this.colorNaN);
        }






      }


      if(val==this.keyArray[i].getRefPosition()){

        var color;

        if(i==0){
          if(this.keyArray[i].getKeyType()==="nil key")
            color = this.keyArray[i+1].getLeftKeyColor(this.interpolationSpace);
          else
            color = this.keyArray[i].getRightKeyColor(this.interpolationSpace);
        }
        else{
          if(this.keyArray[i].getMoT()){
            if(this.keyArray[i].getKeyType()==="left key"){
              color = this.keyArray[i+1].getLeftKeyColor(this.interpolationSpace);
            }
            else{
              color = this.keyArray[i].getRightKeyColor(this.interpolationSpace);
            }
          }
          else{
            color = this.keyArray[i].getLeftKeyColor(this.interpolationSpace);
          }
        }

        switch (this.interpolationSpace) {
          case "rgb":
            return color;
          default:
            var tmpRGBColor = color.calcRGBColor();
            color.deleteReferences();
            color=null;
           return tmpRGBColor;
        }
      }



    }

    if(val==this.keyArray[this.keyArray.length-1].getRefPosition()){
      var color = this.keyArray[this.keyArray.length-1].getLeftKeyColor(this.interpolationSpace);

      if(color==undefined)
        return undefined;

      switch (this.interpolationSpace) {
        case "rgb":
          return new class_Color_RGB(color.get1Value(),color.get2Value(),color.get3Value());
        default:
          var tmpRGBColor = color.calcRGBColor();
          color.deleteReferences();
          color=null;
         return tmpRGBColor;
      }
    }

    return cloneColor(this.colorNaN);
  }

  deleteKey(index){
    this.keyArray[index].deleteReferences();
    this.keyArray[index]=null;
    this.keyArray.splice(index, 1);
    this.calcDeltaIntervalColors();
  }



  getKeyLength(){
    return this.keyArray.length;
  }

  getKey(index){
    return this.keyArray[index];
  }

  getKeyClone(index){
    var newKey = new class_Key(this.keyArray[index].getLeftKeyColor("lab"),this.keyArray[index].getRightKeyColor("lab"),this.keyArray[index].getRefPosition());
    newKey.setMoT(this.keyArray[index].getMoT());
    newKey.setBur(this.keyArray[index].getBur());
    return newKey;
  }

  setRefPosition(index, ref){
    this.keyArray[index].setRefPosition(ref);
    this.calcDeltaIntervalColors();
  }

  setOpacityVal(index,val,side) {
    this.keyArray[index].setOpacityVal(val,side);
  }

  getOpacityVal(index,side) {
      return this.keyArray[index].getOpacityVal(side);
  }

  getRefRange(){
    if(this.keyArray.length>1){
      return (this.keyArray[this.keyArray.length-1].getRefPosition()-this.keyArray[0].getRefPosition());
    }
    else {
      return 0;
    }

  }

  getRefPosition(index){

    if(index<0 || index>=this.keyArray.length)
    return undefined;

    return this.keyArray[index].getRefPosition();
  }


  equalKeyIntervals(){


    if(this.keyArray.length>2){

      var startPos = this.keyArray[0].getRefPosition();
      var fullDis = Math.abs(this.keyArray[this.keyArray.length-1].getRefPosition()-startPos);
      var equalDis = fullDis/(this.keyArray.length-1);

      for (var i = 1; i < this.keyArray.length-1; i++) {
        var newPos = startPos+(i*equalDis);
        this.keyArray[i].setRefPosition(newPos);
      }
    }

    this.calcDeltaIntervalColors();

  }


  setLeftKeyColor(index, color){
    this.keyArray[index].setLeftKeyColor(color);
    this.calcDeltaIntervalColors();
  }

  getLeftKeyColor(index, colorspace){
    return this.keyArray[index].getLeftKeyColor(colorspace);
  }

  setRightKeyColor(index, color){
    this.keyArray[index].setRightKeyColor(color);
    this.calcDeltaIntervalColors();
  }

  getRightKeyColor(index, colorspace){
    return this.keyArray[index].getRightKeyColor(colorspace);
  }

  getRightKeyColorCB(index){
    return this.keyArray[index].getRightKeyColorCB();
  }

  getLeftKeyColorCB(index){
    return this.keyArray[index].getLeftKeyColorCB();
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
      this.calcDeltaIntervalColors();

  }

  addKey(key){
    // find position
    var index = undefined;
    var ref = key.getRefPosition();

    for (var i = 1; i < this.keyArray.length; i++) {
      if(ref>this.keyArray[i-1].getRefPosition() && ref<this.keyArray[i].getRefPosition()){
        index=i;
        break;
      }
    }

    if(index!=undefined){
      this.keyArray.splice(index, 0,key);
    }
    this.calcDeltaIntervalColors();
  }

  pushKey(key){
    this.keyArray.push(key);

    this.calcDeltaIntervalColors();
  }

  getBur(index){
    return this.keyArray[index].getBur();
  }

  setBur(index,newBurs){
    this.keyArray[index].setBur(newBurs);
  }


  deleteBand(index){
    var tmpRightColor = this.keyArray[index+1].getRightKeyColor("lab");
    this.keyArray[index].setRightKeyColor(tmpRightColor);
    this.deleteKey(index+1);
    this.calcDeltaIntervalColors();
  }


  ///////////////////////////////////
  /// Probe
  ///////////////////////////////////

  clearProbeSetList(){
    this.probeSetArray=[];
  }

  addProbeSet(probeSet){
      this.probeSetArray.push(probeSet);
  }

  getProbeSetLength(){
    return this.probeSetArray.length;
  }

  deleteProbeSet(index){
    this.probeSetArray[index].deleteReferences();
    this.probeSetArray[index]=null;
    this.probeSetArray.splice(index, 1);
  }

  deleteProbe(setindex,probeindex){
    this.probeSetArray[setindex].deleteProbe(probeindex);
  }

  getProbeSet(index){
    return this.probeSetArray[index];
  }

  getProbe(setindex,probeindex){
    if(setindex<this.probeSetArray.length)
      return this.probeSetArray[setindex].getProbe(probeindex);
  }

  getProbeSetClone(index){
      return cloneProbeSet(this.probeSetArray[index]);
  }

  setProbe(index,probeIndex, probe){
    this.probeSetArray[index].setProbe(probeIndex, probe);
  }

  addProbe(index,probe){
    this.probeSetArray[index].addProbe(probe);
  }

  changeProbeSetName(index,name){
    this.probeSetArray[index].setProbeSetName(name);
  }

  insertProbe(index,probeIndex,probe){
      this.probeSetArray[index].insertProbe(probeIndex,probe);
  }

  updateProbe(index,probeIndex,type,functionType,start,end,probeColor){
      this.probeSetArray[index].updateProbe(probeIndex,type,functionType,start,end,probeColor);
  }



  /////////////// Other GET SET ////////////////////


   getColormapName() {
    return this.name;
   }

   setColormapName(newName) {
    this.name = newName;
   }

   getDescription() {
    return this.description;
   }

   setDescription(description) {
    this.description = description;
   }

   /*pushPreprocessColor(color){
     preprocessingColorArray.push(color);

   }

    pushPreprocessRef(position){
        this.preprocessingPositionPoints.push(position);
    }*/


   setNaNColor(color){

     this.colorNaN.deleteReferences();

     if(color.getColorType()==="lab"){
       this.colorNaN = color;
     }
     else {
       this.colorNaN = color.calcLABColor();
       color.deleteReferences();
       color=null;
     }



   }

   getNaNColor(colorspace){

     switch (colorspace) {
       case "rgb":
       return this.colorNaN.calcRGBColor();

       case "hsv":
       return this.colorNaN.calcHSVColor();

       case "lab":
       return cloneColor( this.colorNaN);

       case "din99":
       return this.colorNaN.calcDIN99Color();

       case "lch":
       return this.colorNaN.calcLCHColor();

     }
   }

   setBelowColor(color){

     this.colorBelow.deleteReferences();

     if(color.getColorType()==="lab"){
       this.colorBelow = color;
     }
     else {
       this.colorBelow = color.calcLABColor();
       color.deleteReferences();
       color=null;
     }



   }

   getBelowColor(colorspace){

     switch (colorspace) {
       case "rgb":
       return this.colorBelow.calcRGBColor();

       case "hsv":
       return this.colorBelow.calcHSVColor();

       case "lab":
        return cloneColor( this.colorBelow);
       case "din99":
       return this.colorBelow.calcDIN99Color();

       case "lch":
       return this.colorBelow.calcLCHColor();

     }
   }



   setAboveColor(color){

     this.colorAbove.deleteReferences();

     if(color.getColorType()==="lab"){
       this.colorAbove = color;
     }
     else {
       this.colorAbove = color.calcLABColor();
       color.deleteReferences();
       color=null;
     }

   }

   getAboveColor(colorspace){

     switch (colorspace) {
       case "rgb":
       return this.colorAbove.calcRGBColor();

       case "hsv":
       return this.colorAbove.calcHSVColor();

       case "lab":
       return cloneColor(this.colorAbove);
       case "din99":
       return this.colorAbove.calcDIN99Color();

       case "lch":
       return this.colorAbove.calcLCHColor();

     }
   }




}

function cloneColor(color){

  if(color==undefined)
    return undefined;

  switch (color.getColorType()) {
    case "rgb":
        return new class_Color_RGB(color.get1Value(),color.get2Value(),color.get3Value());
      break;
      case "hsv":
          return new class_Color_HSV(color.get1Value(),color.get2Value(),color.get3Value());
        break;
        case "lab":
            return new class_Color_LAB(color.get1Value(),color.get2Value(),color.get3Value());
          break;
          case "lch":
              return new class_Color_LCH(color.get1Value(),color.get2Value(),color.get3Value());
            break;
            case "LMS":
                return new class_Color_LMS(color.get1Value(),color.get2Value(),color.get3Value());
              break;
              case "din99":
                  return new class_Color_DIN99(color.get1Value(),color.get2Value(),color.get3Value());
                break;
                case "xyz":
                  return new class_Color_XYZ(color.get1Value(),color.get2Value(),color.get3Value());
                break;
    default:
        return undefined;
  }
}


function cloneCMS(cmsObj){



  var newCMS = new class_CMS();

  newCMS.setPreventIntervals(true);
  newCMS.setColormapName(cmsObj.getColormapName());
  newCMS.setNaNColor(cmsObj.getNaNColor("lab"));
  newCMS.setAboveColor(cmsObj.getAboveColor("lab"));
  newCMS.setBelowColor(cmsObj.getBelowColor("lab"));
  newCMS.setDescription(cmsObj.getDescription());
  newCMS.setInterpolationSpace(cmsObj.getInterpolationSpace());
  newCMS.setInterpolationType(cmsObj.getInterpolationType());


  //clone Keys
  for(var i=0; i<cmsObj.getKeyLength(); i++){
    var keyObj = cmsObj.getKeyClone(i);
    newCMS.pushKey(keyObj);
  }

  for (var i = 0; i < cmsObj.getProbeSetLength(); i++) {
    var probeObj = cmsObj.getProbeSetClone(i);
    newCMS.addProbeSet(probeObj);
  }

  newCMS.setPreventIntervals(cmsObj.getPreventIntervals());

  return newCMS;
}
