class class_CMS {

    constructor() {
    this.name = "Customer Colormap";
    this.interpolationSpace="lab";
    this.interpolationType="linear"; // linear or spline or optimization

    this.description = "";

    this.colorNaN = new classColor_LAB(0,0,0);
    this.colorBelow = new classColor_LAB(0,0,0);
    this.colorAbove = new classColor_LAB(0,0,0);

    /// color array from import and for the export
    this.preprocessingColorArray = [];
    this.preprocessingPositionPoints = [];

    //// Real CMS structure
    this.keyArray = [];
    this.intervalArray=[];

    /// Probes
    this.probeSetArray=[];


    // Spline
    this.splineP0_Array = [];
    this.splineP3_Array = [];
  }



  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// Interval functions
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  /// CMS Interval Colors


  calcGlobalIntervalColors(numIntervals){

    this.intervalArray=[];


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
      this.intervalArray.push([]);

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

            /*if(withoutMerge){
              var intervalColor = this.calculateColor(currentIntervalPointPos, this.interpolationSpace);
              var newInterval = new class_Interval(intervalColor, false, currentIntervalPointPos);
              this.intervalArray.push(newInterval);
            }*/
            currentIntervalPointPos=Math.round((currentIntervalPointPos+intervalDistance) * error) / error; //currentIntervalPointPos+=intervalDistance;

          }

          break;

        default:

        tmpColor = this.keyArray[keyIndex].getRightKeyColor(this.interpolationSpace);
        var ref1 = this.keyArray[keyIndex].getRefPosition();
        tmpColor2 = this.keyArray[keyIndex+1].getLeftKeyColor(this.interpolationSpace);
        var ref2 = this.keyArray[keyIndex+1].getRefPosition();

        while (currentIntervalPointPos<nextPos) {

          intervalPointCounter++;
          if(intervalPointCounter==numIntervals) // last interval point has to hit the last key reference, but it is possible that the algorithm did not hit this value exactly and we have to stop it then and only adding the last key as interval
          break;

          var intervalColor = this.calculateColor(currentIntervalPointPos, this.interpolationSpace);
          var newInterval = new class_Interval(intervalColor,  currentIntervalPointPos);
          this.intervalArray[keyIndex].push(newInterval);

          currentIntervalPointPos=Math.round((currentIntervalPointPos+intervalDistance) * error) / error; //currentIntervalPointPos+=intervalDistance;

        }

      }

    }//for

  }


  calcDeltaIntervalColors(intervalDeltaDis){

    this.intervalArray=[];

    if(this.keyArray.length<2)
    return;


    for(var keyIndex=0; keyIndex<this.keyArray.length-1; keyIndex++){

      this.intervalArray.push([]);

      var tmpColor,tmpColor2;

      if(this.keyArray[keyIndex].getKeyType()!="nil key" && this.keyArray[keyIndex].getKeyType()!="left key"){

        var ref1 = this.keyArray[keyIndex].getRefPosition();
        var ref2 = this.keyArray[keyIndex+1].getRefPosition();

        var tmpDeltaIntervals = undefined;


        if(this.interpolationType=="linear"){
          tmpDeltaIntervals = calcDeltaIntervalBetween_C1C2(this.keyArray[keyIndex].getRightKeyColor(this.interpolationSpace),this.keyArray[keyIndex+1].getLeftKeyColor(this.interpolationSpace), intervalDeltaDis, this.interpolationSpace);
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
        var intervalDistance =  keyDistance/tmpDeltaIntervals[0].length;
          for (var i = 0; i < tmpDeltaIntervals[0].length; i++) {
            var intervalRef = ref1+(i*intervalDistance); // equal distribution of the interval ref positions
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


 getInterpolationType(){
   return this.interpolationType;
 }

 setInterpolationType(type){
   this.interpolationType=type;
 }

  getIntervalLength(keyBandIndex){
    return this.intervalArray[keyBandIndex].length;
  }

  getIntervalColor(keyBandIndex,index,colorspace){
      return this.intervalArray[keyBandIndex][index].getColor(colorspace);
  }

  getIntervalRef(keyBandIndex,index){
      return this.intervalArray[keyBandIndex][index].getRefPosition();
  }

  clearIntervalColors(){
    this.intervalArray=[];

    for(var keyIndex=0; keyIndex<this.keyArray.length-1; keyIndex++){
      this.intervalArray.push([]);
    }
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

      if(this.getKeyType(keyIndex2)=="left key" || this.getKeyType(keyIndex2)=="twin key") {
        existingC3=false;
      }

      var c0 = undefined; //
      var c1 = undefined; //
      var c2 = undefined; //
      var c3 = undefined; //

      if(!existingC1)
        c0 = new classColor_RGB(0,0,0);  // every value is zero and has no influence
      else
        c0 = this.getRightKeyColor(keyIndex1-1,this.interpolationSpace);

      c1 = this.getRightKeyColor(keyIndex1,this.interpolationSpace);

      c2 = this.getLeftKeyColor(keyIndex2,this.interpolationSpace);

      if(!existingC3)
        c3 = new classColor_RGB(0,0,0);  // every value is zero and has no influence
      else
        c3 = this.getLeftKeyColor(keyIndex2+1,this.interpolationSpace);

      return [c0,c1,c2,c3];

  }


  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////

  setInterpolationSpace(space){
    this.interpolationSpace=space;
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

      if((this.keyArray[i].getKeyType()==="nil key" || this.keyArray[i].getKeyType()==="left key") && i!=this.keyArray.length-1){
         this.keyArray[i].setRightKeyColor(this.keyArray[i+1].getLeftKeyColor("lab"));
         this.keyArray[i+1].setLeftKeyColor(undefined);
      }

      var newPos = startPos+(endPos-this.keyArray[i].getRefPosition());

      var tmpKeyColor = this.keyArray[i].getLeftKeyColor("lab");
      this.keyArray[i].setLeftKeyColor(this.keyArray[i].getRightKeyColor("lab"));
      this.keyArray[i].setRightKeyColor(tmpKeyColor);

      tmpKeyArray.splice(0, 0,this.getKeyClone(i));
      tmpKeyArray[0].setRefPosition(newPos);
    }

    this.keyArray = tmpKeyArray;
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
              var newColor = calcGradientLinear(color1.getRValue(),color1.getGValue(),color1.getBValue(),color2.getRValue(),color2.getGValue(),color2.getBValue(), tmpRatio);
              return new classColor_RGB(newColor[0],newColor[1],newColor[2]);
          case "hsv":
              var newColor = calcGradientLinear(color1.getHValue(),color1.getSValue(),color1.getVValue(),color2.getHValue(),color2.getSValue(),color2.getVValue(), tmpRatio); //calcGradientCylinder(color1.getHValue(),color1.getSValue(),color1.getVValue(),color2.getHValue(),color2.getSValue(),color2.getVValue(), tmpRatio);
              var tmpColor = new classColor_HSV(newColor[0],newColor[1],newColor[2]);
              return tmpColor.calcRGBColor();
            break;
          case "lab":
          case "de94":
          case "de94-ds":
          case "de2000":
          case "de2000-ds":
              var newColor = calcGradientLinear(color1.get1Value(),color1.get2Value(),color1.get3Value(),color2.get1Value(),color2.get2Value(),color2.get3Value(), tmpRatio);
              var tmpColor = new classColor_LAB(newColor[0],newColor[1],newColor[2]);
              return tmpColor.calcRGBColor();
            break;
          case "din99":
              var newColor = calcGradientLinear(color1.get1Value(),color1.get2Value(),color1.get3Value(),color2.get1Value(),color2.get2Value(),color2.get3Value(), tmpRatio);
              var tmpColor = new classColorDIN99(newColor[0],newColor[1],newColor[2]);
              return tmpColor.calcRGBColor();
            break;
          case "lch":
              var newColor = calcGradientLinear(color1.getHValue(),color1.getCValue(),color1.getLValue(),color2.getHValue(),color2.getCValue(),color2.getLValue(), tmpRatio); // calcGradientCylinder(color1.getHValue(),color1.getCValue(),color1.getLValue(),color2.getHValue(),color2.getCValue(),color2.getLValue(), tmpRatio);
              var tmpColor = new classColor_LCH(newColor[2],newColor[1],newColor[0]);
              return tmpColor.calcRGBColor();
          break;

          default:
          console.log("Error calculateColor function");
          return this.colorNaN;
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
           return color.calcRGBColor();
        }
      }



    }

    if(val==this.keyArray[this.keyArray.length-1].getRefPosition()){
      var color = this.keyArray[this.keyArray.length-1].getLeftKeyColor(this.interpolationSpace);

      if(color==undefined)
        return undefined;

      switch (this.interpolationSpace) {
        case "rgb":
          return color;
        default:
         return color.calcRGBColor();
      }
    }

    return this.colorNaN;
  }

  deleteKey(index){
    this.keyArray.splice(index, 1);
  }

  clear(){
    /*this.name = "Customer Colormap";*/

    this.colorNaN = new classColor_LAB(0,0,0);
    this.colorBelow = new classColor_LAB(0,0,0);
    this.colorNaN = new classColor_LAB(0,0,0);

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

  getKeyClone(index){
    var newKey = new class_Key(this.keyArray[index].getLeftKeyColor("lab"),this.keyArray[index].getRightKeyColor("lab"),this.keyArray[index].getRefPosition());
    newKey.setMoT(this.keyArray[index].getMoT());
    newKey.setBur(this.keyArray[index].getBur());
    return newKey;
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
  }

  pushKey(key){
      this.keyArray.push(key);

      /*if(this.keyArray[this.keyArray.length-1].getBur()==false){
        this.keyArray[this.keyArray.length-1].setBur(true);
      }*/
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
    this.probeSetArray[index].deconstructor();
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

   getDescription() {
    return this.description;
   }

   setDescription(description) {
    this.description = description;
   }

   pushPreprocessColor(color){
     preprocessingColorArray.push(color);

   }

    pushPreprocessRef(position){
        this.preprocessingPositionPoints.push(position);
    }


   setNaNColor(color){

     if(color.getColorType()==="lab"){
       this.colorNaN = color;
     }
     else {
       this.colorNaN = color.calcLABColor();
     }

   }

   getNaNColor(colorspace){

     switch (colorspace) {
       case "rgb":
       return this.colorNaN.calcRGBColor();

       case "hsv":
       return this.colorNaN.calcHSVColor();

       case "lab":
       return this.colorNaN.calcLABColor();

       case "din99":
       return this.colorNaN.calcDIN99Color();

       case "lch":
       return this.colorNaN.calcLCHColor();

     }
   }



   setBelowColor(color){

     if(color.getColorType()==="lab"){
       this.colorBelow = color;
     }
     else {
       this.colorBelow = color.calcLABColor();
     }

   }

   getBelowColor(colorspace){

     switch (colorspace) {
       case "rgb":
       return this.colorBelow.calcRGBColor();

       case "hsv":
       return this.colorBelow.calcHSVColor();

       case "lab":
       return this.colorBelow.calcLABColor();

       case "din99":
       return this.colorBelow.calcDIN99Color();

       case "lch":
       return this.colorBelow.calcLCHColor();

     }
   }



   setAboveColor(color){

     if(color.getColorType()==="lab"){
       this.colorAbove = color;
     }
     else {
       this.colorAbove = color.calcLABColor();
     }

   }

   getAboveColor(colorspace){

     switch (colorspace) {
       case "rgb":
       return this.colorAbove.calcRGBColor();

       case "hsv":
       return this.colorAbove.calcHSVColor();

       case "lab":
       return this.colorAbove.calcLABColor();

       case "din99":
       return this.colorAbove.calcDIN99Color();

       case "lch":
       return this.colorAbove.calcLCHColor();

     }
   }




}


function cloneCMS(cmsObj){

  var newCMS = new class_CMS();
  newCMS.setColormapName(cmsObj.getColormapName());
  newCMS.setNaNColor(cmsObj.getNaNColor("lab"));
  newCMS.setAboveColor(cmsObj.getAboveColor("lab"));
  newCMS.setBelowColor(cmsObj.getBelowColor("lab"));
  newCMS.setDescription(cmsObj.getDescription());
  newCMS.setInterpolationSpace(cmsObj.getInterpolationSpace());

  //clone Keys
  for(var i=0; i<cmsObj.getKeyLength(); i++){
    var keyObj = cmsObj.getKeyClone(i);
    /*var newKey = new class_Key(keyObj.getLeftKeyColor("lab"),keyObj.getRightKeyColor("lab"),keyObj.getRefPosition());
    newKey.setMoT(keyObj.getMoT());*/
    newCMS.pushKey(keyObj);
  }

  for (var i = 0; i < cmsObj.getProbeSetLength(); i++) {
    var probeObj = cmsObj.getProbeSetClone(i);
    newCMS.addProbeSet(probeObj);
  }

  return newCMS;
}
