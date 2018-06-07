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

  }

  /////////////////////////////////
  //// Key Structure
  /////////////////////////////////

  calculateColor(val, interpolationSpace){

    if(val<this.keyArray[0].getRefPosition())
    return this.NaN_RGB;

    if(val>this.keyArray[this.keyArray.length-1].getRefPosition())
    return this.NaN_RGB;

    for (var i = 0; i < this.keyArray.length-1; i++) {

      if(val>this.keyArray[i].getRefPosition() && val<this.keyArray[i+1].getRefPosition()){

        var color1 = this.keyArray[i].getRightKeyColor(interpolationSpace);
        var color2 = this.keyArray[i+1].getLeftKeyColor(interpolationSpace);

        if(color1==undefined){
          if(interpolationSpace==="rgb")
          return color2;
          else
          return color2.calcRGBColor();
        }

        var leftRef = this.keyArray[i].getRefPosition();
        var rightRef = this.keyArray[i+1].getRefPosition();

        var tmpRatio = (val-leftRef)/(rightRef-leftRef);

        switch (interpolationSpace) {
          case "rgb":

              var rValue = color1.get1Value()+(color2.get1Value() - color1.get1Value())*tmpRatio;
              var gValue = color1.get2Value()+(color2.get2Value() - color1.get2Value())*tmpRatio;
              var bValue = color1.get3Value()+(color2.get3Value() - color1.get3Value())*tmpRatio;

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
    }

    return this.NaN_RGB;
  }

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
  /// Interval functions
  //////////////////////////////////

  /// CMS Interval Colors
  calcIntervalColors(intervals, colorspace){
    this.intervalArray=[];
    this.intervalPosition=[];


    if(this.keyArray.length>1 && intervals !=0){

      var tmpIntervalRef=[];
      var intervalDistance = (this.keyArray[this.keyArray.length-1].getRefPosition()-this.keyArray[0].getRefPosition())/(intervals-1);


      for(var i=0; i<intervals-1; i++){
            var tmpVal = this.keyArray[0].getRefPosition()+(i*intervalDistance);
            tmpIntervalRef.push(tmpVal);
        }
        tmpIntervalRef.push(this.keyArray[this.keyArray.length-1].getRefPosition());



      var currentKeyPos = 0;
      var startIndex = 0;

      for(var refIndex=0; refIndex<tmpIntervalRef.length; refIndex++){

          if(tmpIntervalRef[refIndex]>this.keyArray[currentKeyPos].getRefPosition()){

            while(tmpIntervalRef[refIndex]>this.keyArray[currentKeyPos].getRefPosition()){
              var arrayPos = [startIndex, this.intervalArray.length-1];
              this.intervalPosition.push(arrayPos);
              startIndex=this.intervalArray.length;
              currentKeyPos++;
            }

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

            }//if

            // calc color
            var newInterval = new class_Interval(tmpColor, false, tmpIntervalRef[refIndex]);
            this.intervalArray.push(newInterval);

        }//else

      }//for

    }//

  }//


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
