class class_CMS {

    constructor() {
    this.name = "Customer Colormap";
    this.interpolationSpace="lab";

    this.NaN_RGB = new classColor_RGB(0,0,0);
    this.NaN_HSV = new classColor_HSV(0,0,0);
    this.NaN_LAB = new classColor_LAB(0,0,0);
    this.NaN_DIN99 = new classColorDIN99(0,0,0);

    this.Below_RGB = new classColor_RGB(0,0,0);
    this.Below_HSV = new classColor_HSV(0,0,0);
    this.Below_LAB = new classColor_LAB(0,0,0);
    this.Below_DIN99 = new classColorDIN99(0,0,0);

    this.Above_RGB = new classColor_RGB(0,0,0);
    this.Above_HSV = new classColor_HSV(0,0,0);
    this.Above_LAB = new classColor_LAB(0,0,0);
    this.Above_DIN99 = new classColorDIN99(0,0,0);

    /// color array from import and for the export
    this.preprocessingColorArray = [];
    this.preprocessingPositionPoints = [];

    //// Real CMS structure
    this.keyArray = [];
    this.intervalArray=[];
    this.intervalPosition=[];

    /// Probes
    this.probeArray=[];

  }

  setInterpolationSpace(space){
    this.interpolationSpace=space;
  }

  getInterpolationSpace(){
    return this.interpolationSpace;
  }



  /////////////////////////////////
  //// Key Structure
  /////////////////////////////////

  setAutoRange(newStart,newEnd){

    var currentStart = this.keyArray[0].getRefPosition();
    var currentdistance = this.keyArray[this.keyArray.length-1].getRefPosition()-currentStart;
    var newDistance = newEnd-newStart;

    for (var i = 0; i < this.keyArray.length; i++) {
      var ratio = (this.keyArray[i].getRefPosition()-currentStart)/currentdistance;
      var newPos = newStart+ratio*newDistance;
      this.keyArray[i].setRefPosition(newPos);
    }

  }

  calculateColor(val){

    if(val<this.keyArray[0].getRefPosition()){
      //console.log(val);
      return this.NaN_RGB;
    }


    if(val>this.keyArray[this.keyArray.length-1].getRefPosition()){
      //console.log(val);
      return this.NaN_RGB;
    }

    for (var i = 0; i < this.keyArray.length-1; i++) {

      if(val>this.keyArray[i].getRefPosition() && val<this.keyArray[i+1].getRefPosition()){

        var color1 = this.keyArray[i].getRightKeyColor(this.interpolationSpace);
        var color2 = this.keyArray[i+1].getLeftKeyColor(this.interpolationSpace);

        if(color1==undefined){
          if(this.interpolationSpace==="rgb")
          return color2;
          else
          return color2.calcRGBColor();
        }

        var leftRef = this.keyArray[i].getRefPosition();
        var rightRef = this.keyArray[i+1].getRefPosition();

        var tmpRatio = (val-leftRef)/(rightRef-leftRef);

        switch (this.interpolationSpace) {
          case "rgb":

              var rValue = color1.get1Value()+(color2.get1Value() - color1.get1Value())*tmpRatio;
              var gValue = color1.get2Value()+(color2.get2Value() - color1.get2Value())*tmpRatio;
              var bValue = color1.get3Value()+(color2.get3Value() - color1.get3Value())*tmpRatio;

              if(rValue==0 &&  gValue==0 && bValue==0) {
                console.log(val);
              }

            return new classColor_RGB(rValue,gValue,bValue);
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
              var tmpColor = new classColor_HSV(tmpH,tmpS,tmpV);
              return tmpColor.calcRGBColor();
            break;
          case "lab":

              var lValue = color1.get1Value()+(color2.get1Value() - color1.get1Value())*tmpRatio;
              var aValue = color1.get2Value()+(color2.get2Value() - color1.get2Value())*tmpRatio;
              var bValue = color1.get3Value()+(color2.get3Value() - color1.get3Value())*tmpRatio;

              var tmpColor = new classColor_LAB(lValue,aValue,bValue);
              return tmpColor.calcRGBColor();
            break;
          case "din99":
              var l99Value = color1.get1Value()+(color2.get1Value() - color1.get1Value())*tmpRatio;
              var a99Value = color1.get2Value()+(color2.get2Value() - color1.get2Value())*tmpRatio;
              var b99Value = color1.get3Value()+(color2.get3Value() - color1.get3Value())*tmpRatio;

              var tmpColor = new classColorDIN99(l99Value,a99Value,b99Value);
              return tmpColor.calcRGBColor();
            break;
          default:
          console.log("Error calculateColor function");
          return this.NaN_RGB;
        }

      }


      if(val==this.keyArray[i].getRefPosition()){

        var color;

        if(i==0){
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
           return color.calcRGBColor();
        }
      }



    }

    if(val==this.keyArray[this.keyArray.length-1].getRefPosition()){
      var color = this.keyArray[this.keyArray.length-1].getLeftKeyColor(this.interpolationSpace);

      switch (this.interpolationSpace) {
        case "rgb":
          return color;
        default:
         return color.calcRGBColor();
      }
    }

    return this.NaN_RGB;
  }

  deleteKey(index){
    this.keyArray.splice(index, 1);
  }

  clear(){
    /*this.name = "Customer Colormap";*/

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

  getKeyLength(){
    return this.keyArray.length;
  }

  getKey(index){
    return this.keyArray[index];
  }

  setRefPosition(index, ref){
    this.keyArray[index].setRefPosition(ref);
  }

  setOpacityVal(index,val,side) {
    this.keyArray[index].setOpacityVal(val,side);
  }

  getOpacityVal(index,side) {
      return this.keyArray[index].getOpacityVal(side);
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


  deleteBand(index){
    var tmpRightColor = this.keyArray[index+1].getRightKeyColor("lab");
    this.keyArray[index].setRightKeyColor(tmpRightColor);
    this.deleteKey(index+1);

  }


  ///////////////////////////////////
  /// Probe
  ///////////////////////////////////

  getProbeLength(){
    return this.probeArray.length;
  }

  deleteProbe(index){
    this.probeArray.splice(index, 1);
  }

  getProbe(index){
    return this.probeArray[index];
  }

  setProbe(index,probe){
    this.probeArray[index]=probe;
  }

  addProbe(probe){
    this.probeArray.push(probe);
  }

  insertProbe(index,probe){
      this.probeArray.splice(index, 0,probe);
  }

  ///////////////////////////////////
  /// Interval functions
  //////////////////////////////////

  /// CMS Interval Colors


  calcGlobalIntervalColors(numIntervals, startKey, endKey, withoutMerge){

    this.intervalArray=[];
    this.intervalPosition=[];


    var startPos = this.keyArray[startKey].getRefPosition();
    var endPos = this.keyArray[endKey].getRefPosition();

    var intervalDistance = (endPos-startPos)/(numIntervals);

    var currentIntervalPointPos = startPos;
    var intervalPointCounter = 0;

    var error = 1e12;//1e-12; // because of common known problem 0.1+0.2 will be 0.30000000000000004

    for(var keyIndex=startKey; keyIndex<endKey; keyIndex++){

      var currentPos = this.keyArray[keyIndex].getRefPosition();
      var nextPos = this.keyArray[keyIndex+1].getRefPosition();


      if(currentIntervalPointPos==currentPos){
        currentIntervalPointPos=Math.round((currentIntervalPointPos+intervalDistance) * error) / error; //currentIntervalPointPos+=intervalDistance;
      }


      var tmpColor,tmpColor2;

      switch (this.keyArray[keyIndex].getKeyType()) {


          case "nil key": case "left key":

          var arrayPos = [this.intervalArray.length-1,this.intervalArray.length-1];

          //// test
          tmpColor = this.keyArray[keyIndex+1].getLeftKeyColor(this.interpolationSpace);

          /*arrayPos.push(this.intervalArray.length);
          var newKeyInterval = new class_Interval(tmpColor, true, this.keyArray[keyIndex].getRefPosition());
          this.intervalArray.push(newKeyInterval);
          arrayPos[0]=this.intervalArray.length-1;*/

          while (currentIntervalPointPos<nextPos) {

            intervalPointCounter++;
            if(intervalPointCounter==numIntervals) // last interval point has to hit the last key reference, but it is possible that the algorithm did not hit this value exactly and we have to stop it then and only adding the last key as interval
            break;

            if(withoutMerge){
              var intervalColor = this.calculateColor(currentIntervalPointPos, this.interpolationSpace);
              var newInterval = new class_Interval(intervalColor, false, currentIntervalPointPos);
              this.intervalArray.push(newInterval);
            }
            currentIntervalPointPos=Math.round((currentIntervalPointPos+intervalDistance) * error) / error; //currentIntervalPointPos+=intervalDistance;

          }

          // this is only
          arrayPos.push(this.intervalArray.length);
          var newKeyInterval2 = new class_Interval(tmpColor, true, this.keyArray[keyIndex+1].getRefPosition());
          this.intervalArray.push(newKeyInterval2);
          arrayPos[1]=this.intervalArray.length-1;
          //// test

          this.intervalPosition.push(arrayPos);

          break;

        default:

        var arrayPos = [];
        tmpColor = this.keyArray[keyIndex].getRightKeyColor(this.interpolationSpace);
        var ref1 = this.keyArray[keyIndex].getRefPosition();
        tmpColor2 = this.keyArray[keyIndex+1].getLeftKeyColor(this.interpolationSpace);
        var ref2 = this.keyArray[keyIndex+1].getRefPosition();

        arrayPos.push(this.intervalArray.length);
        //// test
        if(this.keyArray[keyIndex].getKeyType()!="dual key"){
          var newKeyInterval = new class_Interval(tmpColor, true, this.keyArray[keyIndex].getRefPosition());
          this.intervalArray.push(newKeyInterval);
        }
        //// test


        while (currentIntervalPointPos<nextPos) {

          intervalPointCounter++;
          if(intervalPointCounter==numIntervals) // last interval point has to hit the last key reference, but it is possible that the algorithm did not hit this value exactly and we have to stop it then and only adding the last key as interval
          break;

          var intervalColor = this.calculateColor(currentIntervalPointPos, this.interpolationSpace);
          var newInterval = new class_Interval(intervalColor, false, currentIntervalPointPos);
          this.intervalArray.push(newInterval);

          currentIntervalPointPos=Math.round((currentIntervalPointPos+intervalDistance) * error) / error; //currentIntervalPointPos+=intervalDistance;

        }

        //// test
          arrayPos.push(this.intervalArray.length);
          var newKeyInterval2 = new class_Interval(tmpColor2, true, this.keyArray[keyIndex+1].getRefPosition());
          this.intervalArray.push(newKeyInterval2);
        //// test

        this.intervalPosition.push(arrayPos);

      }

    }//for



  }


  calcDeltaIntervalColors(intervalDeltaDis, startKey, endKey){

    this.intervalArray=[];
    this.intervalPosition=[];

    if(this.keyArray.length==0)
    return;

    for(var keyIndex=startKey; keyIndex<endKey; keyIndex++){


      var tmpColor,tmpColor2;
      switch (this.keyArray[keyIndex].getKeyType()) {
          case "nil key": case "left key":


          var arrayPos = [this.intervalArray.length-1,this.intervalArray.length-1];

          //// test
          tmpColor = this.keyArray[keyIndex+1].getLeftKeyColor(this.interpolationSpace);

          /*arrayPos.push(this.intervalArray.length);
          var newKeyInterval = new class_Interval(tmpColor, true, this.keyArray[keyIndex].getRefPosition());
          this.intervalArray.push(newKeyInterval);
          arrayPos[0]=this.intervalArray.length-1;*/

          // this is only
          arrayPos.push(this.intervalArray.length);
          var newKeyInterval2 = new class_Interval(tmpColor, true, this.keyArray[keyIndex+1].getRefPosition());
          this.intervalArray.push(newKeyInterval2);
          arrayPos[1]=this.intervalArray.length-1;
          //// test

          this.intervalPosition.push(arrayPos);

          break;

        default:

        var arrayPos = [];
        tmpColor = this.keyArray[keyIndex].getRightKeyColor(this.interpolationSpace);
        var ref1 = this.keyArray[keyIndex].getRefPosition();
        tmpColor2 = this.keyArray[keyIndex+1].getLeftKeyColor(this.interpolationSpace);
        var ref2 = this.keyArray[keyIndex+1].getRefPosition();

        arrayPos.push(this.intervalArray.length);
        //// test
        if(this.keyArray[keyIndex].getKeyType()!="dual key"){
          var newKeyInterval = new class_Interval(tmpColor, true, this.keyArray[keyIndex].getRefPosition());
          this.intervalArray.push(newKeyInterval);
        }
        //// test

          ///// Calc Interval Colors
          var tmpDelta = 0;

          if(this.interpolationSpace==="din99"){
            tmpDelta = calc3DEuclideanDistance(tmpColor,tmpColor2);
          }
          else {
            tmpDelta = calcDeltaCIEDE2000(tmpColor,tmpColor2); // if not lab the function is converting into lab for the difference calculation.
          }

          var numberIntervals = Math.round(tmpDelta/intervalDeltaDis);
          var intervalDistance =  (ref2-ref1)/numberIntervals;

          if(numberIntervals<=0){
            arrayPos = [this.intervalArray.length-1,this.intervalArray.length-1];
            this.intervalPosition.push(arrayPos);
            continue;
          }

          for (var i = 1; i < numberIntervals; i++) {
            var intervalRef = ref1+(i*intervalDistance);

            var intervalColor;

            var tmpRatio = (intervalRef-ref1)/(ref2-ref1);

            switch (this.interpolationSpace) {
              case "rgb":
                  var rValue = tmpColor.get1Value()+(tmpColor2.get1Value() - tmpColor.get1Value())*tmpRatio;
                  var gValue = tmpColor.get2Value()+(tmpColor2.get2Value() - tmpColor.get2Value())*tmpRatio;
                  var bValue = tmpColor.get3Value()+(tmpColor2.get3Value() - tmpColor.get3Value())*tmpRatio;

                  intervalColor = new classColor_RGB(rValue,gValue,bValue);
                break;
              case "hsv":

                  var tmpDis = tmpColor.getSValue()*50; // radius 50; center(0,0,0);
                  var tmpRad = (tmpColor.getHValue()*Math.PI*2)-Math.PI;
                  var xPos = tmpDis*Math.cos(tmpRad);
                  var yPos = tmpDis*Math.sin(tmpRad);
                  var zPos = tmpColor.getVValue()-50;

                  var tmpDis2 = tmpColor2.getSValue()*50;
                  var tmpRad2 = (tmpColor2.getHValue()*Math.PI*2)-Math.PI;
                  var xPos2 = tmpDis2*Math.cos(tmpRad2);
                  var yPos2 = tmpDis2*Math.sin(tmpRad2);
                  var zPos2 = tmpColor2.getVValue()-50;

                  var tmpX = xPos+(xPos2 - xPos)*tmpRatio;
                  var tmpY = yPos+(yPos2 - yPos)*tmpRatio;
                  var tmpZ = zPos+(zPos2 - zPos)*tmpRatio;

                  var tmpH =(Math.atan2(tmpY,tmpX)+Math.PI)/(Math.PI*2);
                  var tmpS = Math.sqrt(Math.pow(tmpX,2)+Math.pow(tmpY,2))/50;
                  var tmpV = tmpZ+50;
                  intervalColor = new classColor_HSV(tmpH,tmpS,tmpV);

                break;
              case "lab":

                  var lValue = tmpColor.get1Value()+(tmpColor2.get1Value() - tmpColor.get1Value())*tmpRatio;
                  var aValue = tmpColor.get2Value()+(tmpColor2.get2Value() - tmpColor.get2Value())*tmpRatio;
                  var bValue = tmpColor.get3Value()+(tmpColor2.get3Value() - tmpColor.get3Value())*tmpRatio;

                  intervalColor = new classColor_LAB(lValue,aValue,bValue);

                break;
              case "din99":
                  var l99Value = tmpColor.get1Value()+(tmpColor2.get1Value() - tmpColor.get1Value())*tmpRatio;
                  var a99Value = tmpColor.get2Value()+(tmpColor2.get2Value() - tmpColor.get2Value())*tmpRatio;
                  var b99Value = tmpColor.get3Value()+(tmpColor2.get3Value() - tmpColor.get3Value())*tmpRatio;

                  intervalColor = new classColorDIN99(l99Value,a99Value,b99Value);
                break;
              default:
              console.log("Error calcColorMap function");
            }

            var newInterval = new class_Interval(intervalColor, false, intervalRef);
            this.intervalArray.push(newInterval);


          }

        //// test
          arrayPos.push(this.intervalArray.length);
          var newKeyInterval2 = new class_Interval(tmpColor2, true, this.keyArray[keyIndex+1].getRefPosition());
          this.intervalArray.push(newKeyInterval2);
        //// test

        this.intervalPosition.push(arrayPos);

      }

    }//for



  }


  getIntervalLength(){
    return this.intervalArray.length;
  }

  getIntervalColor(index,colorspace){
      return this.intervalArray[index].getColor(colorspace);
  }

  getIntervalisKey(index){
      return this.intervalArray[index].getIsKeyPart();
  }

  getIntervalRef(index){
      return this.intervalArray[index].getRefPosition();
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



   setBelowColor(color){

     var colorType = color.getColorType();
     switch (colorType) {
       case "rgb":
       this.Below_RGB = color;
       this.Below_HSV = color.calcHSVColor();
       this.Below_LAB = color.calcLABColor();
       this.Below_DIN99 = color.calcDIN99Color(1,1);
         break;
       case "hsv":
       this.Below_RGB = color.calcRGBColor();
       this.Below_HSV = color;
       this.Below_LAB = color.calcLABColor();
       this.Below_DIN99 = color.calcDIN99Color(1,1);
         break;
       case "lab":
       this.Below_RGB = color.calcRGBColor();
       this.Below_HSV = color.calcHSVColor();
       this.Below_LAB = color;
       this.Below_DIN99 = color.calcDIN99Color(1,1);
         break;
       case "din99":
       this.Below_RGB = color.calcRGBColor();
       this.Below_HSV = color.calcHSVColor();
       this.Below_LAB = color.calcLABColor();
       this.Below_DIN99 = color;
         break;
       default:

     }
   }

   getBelowColor(colorspace){

     switch (colorspace) {
       case "rgb":
       return this.Below_RGB;

       case "hsv":
       return this.Below_HSV;

       case "lab":
       return this.Below_LAB;

       case "din99":
       return this.Below_DIN99;

       default:

     }
   }



   setAboveColor(color){

     var colorType = color.getColorType();
     switch (colorType) {
       case "rgb":
       this.Above_RGB = color;
       this.Above_HSV = color.calcHSVColor();
       this.Above_LAB = color.calcLABColor();
       this.Above_DIN99 = color.calcDIN99Color(1,1);
         break;
       case "hsv":
       this.Above_RGB = color.calcRGBColor();
       this.Above_HSV = color;
       this.Above_LAB = color.calcLABColor();
       this.Above_DIN99 = color.calcDIN99Color(1,1);
         break;
       case "lab":
       this.Above_RGB = color.calcRGBColor();
       this.Above_HSV = color.calcHSVColor();
       this.Above_LAB = color;
       this.Above_DIN99 = color.calcDIN99Color(1,1);
         break;
       case "din99":
       this.Above_RGB = color.calcRGBColor();
       this.Above_HSV = color.calcHSVColor();
       this.Above_LAB = color.calcLABColor();
       this.Above_DIN99 = color;
         break;
       default:

     }
   }

   getAboveColor(colorspace){

     switch (colorspace) {
       case "rgb":
       return this.Above_RGB;

       case "hsv":
       return this.Above_HSV;

       case "lab":
       return this.Above_LAB;

       case "din99":
       return this.Above_DIN99;

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
    newKey.setMoT(keyObj.getMoT());
    newCMS.pushKey(newKey);
  }

  return newCMS;
}
