////////////////////////////////////////////////
// ------------ Class Probe ---------------//
////////////////////////////////////////////////

class class_Probe{

      constructor(type, start, end , space) {
        this.ProbeType = type; // 0=gradient, 1=contour, 2=constant
        this.probeColor = new class_Color_HSV(0.0,0.0,1.0);
        this.functionType =0;
        this.colorspace = space;
        this.startPos = start;
        this.endPos = end;
        this.numberOfStrutKeys = 5;
      }

      deleteReferences(){
        delete this.ProbeType; // 0=gradient, 1=contour, 2=constant
        this.probeColor.deleteReferences();
        this.probeColor=null;
        delete this.functionType;
        delete this.colorspace;
        delete this.startPos;
        delete this.endPos;
        delete this.numberOfStrutKeys;
      }


      updateProbe(type,functionType,start,end,probeColor){
        this.ProbeType = type;
        this.functionType = functionType;
        this.startPos = start;
        this.endPos = end;

        if(this.probeColor!=undefined){
          this.probeColor.deleteReferences();
          this.probeColor=null;
        }

        this.probeColor = probeColor;
      }

      setFunctionType(type){
        this.functionType = type;
      }

      getFunctionType(){
        return this.functionType;
      }

      getNumberOfStrutKeys(){
        return this.numberOfStrutKeys;
      }

      setType(type){
        this.ProbeType = type;
      }

      getType(){
        return this.ProbeType;
      }

      setStartPos(val){
        this.startPos = val;
      }

      getStartPos(){
        return this.startPos;
      }

      setEndPos(val){
        this.endPos = val;
      }

      getEndPos(){
        return this.endPos;
      }

      setProbeColorspace(colorspace){
        this.colorspace = colorspace;
      }

      getProbeColorspace(){
        return this.colorspace;
      }


      setProbeColor(val){
        this.probeColor = val;
      }

      getProbeColor(){
        return new class_Color_HSV(this.probeColor.get1Value(),this.probeColor.get2Value(),this.probeColor.get3Value());
      }



}



/*class classProbe{

      constructor(type, rangeType) {
        this.type = type; // 0=gradient, 1=contour, 2=constant
        //this.fct = fct; // 0=linear
        this.rangeType = rangeType; // 0=singe, 1=interval, 2=interval auto, 3=custom
        this.backgroundColor = undefined;
        this.intervalStartPos = [];
        this.intervalEndPos = [];
        this.workColorspace = "hsv";
        this.probeColor = new class_Color_HSV(0,0,0);
        this.numberOfProbes = 0;
        this.valueStart = 0;
        this.valueEnd = 1.0;

      }

      addIntervalColorPos(start, end){
        this.intervalStartPos.push(start);
        this.intervalEndPos.push(end);
      }

      clearIntervalColors(){
        this.intervalStartPos=[];
        this.intervalEndPos=[];
      }

      getsetTwoSidedType(getTwoSidedType)Length(){
        return this.intervalStartPos.length;
      }

      getProbeRangeStart(index){
        return this.intervalStartPos[index];
      }

      getProbeRangeEnd(index){
        return this.intervalEndPos[index];
      }

      generateProbeCMS(tmpCMS,interpolationSpace,newName){

          var newCMS = cloneCMS(tmpCMS);

          newCMS.setColormapName(newName);

          var posArray=[];
          var typeArray=[]; // s = start, e=end, se= start and end, k=key;

          posArray.push(this.intervalStartPos[0]);
          typeArray.push("S");


          posArray.push(this.intervalEndPos[0]);
          typeArray.push("E");

          for (var i = 1; i < this.intervalStartPos.length; i++) {

            if(this.intervalStartPos[i] == this.intervalEndPos[i-1]){
              typeArray[typeArray.length-1]="SE"
            }
            else{
              posArray.push(this.intervalStartPos[i]);
              typeArray.push("S");
            }

            posArray.push(this.intervalEndPos[i]);
            typeArray.push("E");
          }

          ///////////////////////////////////////////////////////////////////////////////
          /// insert Intervals and update Keys
          var currentArrayPos=0;
          var numberOfInsertIntervals=0;

          while (posArray[currentArrayPos]<tmpCMS.getRefPosition(0)) {
            currentArrayPos++;

            if(currentArrayPos>=posArray.length)
            break;
          }

          switch (this.type) {

            case 0:
            //////////////////////////////////////
            // gradient probe
            /////////////////////////////////////
            for (var i = 0; i < tmpCMS.getKeyLength(); i++) {

              var rightKeyColor = tmpCMS.getRightKeyColor(i,this.workColorspace);
              if(rightKeyColor==undefined && i !=tmpCMS.getKeyLength()-1){
                rightKeyColor = tmpCMS.getLeftKeyColor(i+1,this.workColorspace); // left key inside of a range will convert into a twin key
              }
              var leftKeyColor = tmpCMS.getLeftKeyColor(i,this.workColorspace);

              if(posArray[currentArrayPos]==tmpCMS.getRefPosition(i)){

                switch (typeArray[currentArrayPos]) {
                  case "S":
                  if(rightKeyColor!=undefined){
                    rightKeyColor.setVValue(this.valueStart);
                  }
                    break;
                    case "E":
                    if(leftKeyColor!=undefined){
                      leftKeyColor.setVValue(this.valueEnd);
                    }
                      break;
                      case "SE":
                        if(rightKeyColor!=undefined){
                          rightKeyColor.setVValue(this.valueStart);
                        }
                        if(leftKeyColor!=undefined){
                          leftKeyColor.setVValue(this.valueEnd);
                        }
                        break;
                  default:
                    console.log("Error at function generateProbeCMS");
                    return;
                }

                newCMS.setRightKeyColor(i+numberOfInsertIntervals,rightKeyColor);
                newCMS.setLeftKeyColor(i+numberOfInsertIntervals,leftKeyColor);

                currentArrayPos++;
                if(currentArrayPos>=posArray.length)
                break;
              }
              else{

                if(currentArrayPos>0){ // if no interval is before the key we do not have to update the key

                  if(typeArray[currentArrayPos-1]!="E"){ // if key is not between the start and the end of a range -> no update
                    var rangeSize = posArray[currentArrayPos]-posArray[currentArrayPos-1];
                    var disToKey = tmpCMS.getRefPosition(i)-posArray[currentArrayPos-1];
                    var keyRatio = disToKey/rangeSize;

                    var newVal = this.valueStart+(this.valueEnd-this.valueStart)*keyRatio;

                    if(rightKeyColor!=undefined){
                      rightKeyColor.setVValue(newVal);
                    }
                    if(leftKeyColor!=undefined){
                      leftKeyColor.setVValue(newVal);
                    }

                    newCMS.setRightKeyColor(i+numberOfInsertIntervals,rightKeyColor);
                    newCMS.setLeftKeyColor(i+numberOfInsertIntervals,leftKeyColor);
                  }
                }

              }


              if(i!=tmpCMS.getKeyLength()-1){

                while (posArray[currentArrayPos]<tmpCMS.getRefPosition(i+1)) {

                  var colorL = tmpCMS.calculateColor(posArray[currentArrayPos], interpolationSpace);
                  colorL=colorL.calcHSVColor();
                  var colorR;




                  switch (typeArray[currentArrayPos]) {
                    case "S":
                      colorR = new class_Color_HSV(colorL.get1Value(),colorL.get2Value(),this.valueStart);
                      break;
                      case "E":
                        colorR = new class_Color_HSV(colorL.get1Value(),colorL.get2Value(),colorL.get3Value());
                        colorL.set3Value(this.valueEnd);
                        break;
                        case "SE":
                          colorL.set3Value(this.valueEnd);
                          colorR = new class_Color_HSV(colorL.get1Value(),colorL.get2Value(),this.valueStart);
                          break;
                    default:
                      console.log("Error at function generateProbeCMS");
                      return;
                  }


                  numberOfInsertIntervals++;
                  newCMS.insertKey(i+numberOfInsertIntervals,new class_Key(colorL, colorR, posArray[currentArrayPos]));

                  //globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(oldColor,undefined,startPos));
                  //console.log(numberOfInsertIntervals,newCMS.getKeyLength() );

                  currentArrayPos++;
                  if(currentArrayPos>=posArray.length)
                  break;
                }

              }

                if(currentArrayPos>=posArray.length)
                break;
            }



              break;

            case 1:
            //////////////////////////////////////
            // contour probe
            /////////////////////////////////////

            for (var i = 0; i < tmpCMS.getKeyLength(); i++) {

              var rightKeyColor = tmpCMS.getRightKeyColor(i,this.workColorspace);
              if(rightKeyColor==undefined && i !=tmpCMS.getKeyLength()-1){
                rightKeyColor = tmpCMS.getLeftKeyColor(i+1,this.workColorspace); // left key inside of a range will convert into a twin key
              }
              var leftKeyColor = tmpCMS.getLeftKeyColor(i,this.workColorspace);

              if(posArray[currentArrayPos]==tmpCMS.getRefPosition(i)){

                switch (typeArray[currentArrayPos]) {
                  case "S":
                  break;
                  case "E": case "SE":
                  if(leftKeyColor!=undefined){
                    leftKeyColor = this.probeColor; //new class_Color_HSV(this.probeColor.get1Value(),this.probeColor.get2Value(),this.probeColor.get3Value())
                  }
                    break;
                  default:
                    console.log("Error at function generateProbeCMS");
                    return;
                }

                newCMS.setRightKeyColor(i+numberOfInsertIntervals,rightKeyColor);
                newCMS.setLeftKeyColor(i+numberOfInsertIntervals,leftKeyColor);


                currentArrayPos++;
                if(currentArrayPos>=posArray.length)
                break;
              }
              else{

                if(currentArrayPos>0){ // if no interval is before the key we do not have to update the key

                  if(typeArray[currentArrayPos-1]!="E"){ // if key is not between the start and the end of a range -> no update
                    var rangeSize = posArray[currentArrayPos]-posArray[currentArrayPos-1];
                    var disToKey = tmpCMS.getRefPosition(i)-posArray[currentArrayPos-1];
                    var keyRatio = disToKey/rangeSize;



                    if(rightKeyColor!=undefined){
                      var newH = (1-keyRatio) * rightKeyColor.getHValue() + keyRatio*this.probeColor.getHValue();
                      var newS = (1-keyRatio) * rightKeyColor.getSValue() + keyRatio*this.probeColor.getSValue();
                      var newV = (1-keyRatio) * rightKeyColor.getVValue() + keyRatio*this.probeColor.getVValue();

                      rightKeyColor.setHValue(newH);
                      rightKeyColor.setSValue(newS);
                      rightKeyColor.setVValue(newV);
                    }
                    if(leftKeyColor!=undefined){
                      var newH = (1-keyRatio) * leftKeyColor.getHValue() + keyRatio*this.probeColor.getHValue();
                      var newS = (1-keyRatio) * leftKeyColor.getSValue() + keyRatio*this.probeColor.getSValue();
                      var newV = (1-keyRatio) * leftKeyColor.getVValue() + keyRatio*this.probeColor.getVValue();

                      leftKeyColor.setHValue(newH);
                      leftKeyColor.setSValue(newS);
                      leftKeyColor.setVValue(newV);
                    }


                    newCMS.setRightKeyColor(i+numberOfInsertIntervals,rightKeyColor);
                    newCMS.setLeftKeyColor(i+numberOfInsertIntervals,leftKeyColor);
                  }
                }

              }


              if(i!=tmpCMS.getKeyLength()-1){

                while (posArray[currentArrayPos]<tmpCMS.getRefPosition(i+1)) {

                  var colorR = tmpCMS.calculateColor(posArray[currentArrayPos], interpolationSpace);
                  colorR=colorR.calcHSVColor();
                  var colorL;




                  switch (typeArray[currentArrayPos]) {
                    case "S":
                      colorL = colorR;
                      break;
                      case "E": case "SE":
                          colorL = this.probeColor;
                          break;
                    default:
                      console.log("Error at function generateProbeCMS");
                      return;
                  }


                  numberOfInsertIntervals++;
                  newCMS.insertKey(i+numberOfInsertIntervals,new class_Key(colorL, colorR, posArray[currentArrayPos]));

                  //globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(oldColor,undefined,startPos));
                  //console.log(numberOfInsertIntervals,newCMS.getKeyLength() );

                  currentArrayPos++;
                  if(currentArrayPos>=posArray.length)
                  break;
                }

              }

                if(currentArrayPos>=posArray.length)
                break;
            }


            break;

            case 2:
            //////////////////////////////////////
            // constant probe
            /////////////////////////////////////
            for (var i = 0; i < tmpCMS.getKeyLength(); i++) {



              /*var rightKeyColor = tmpCMS.getRightKeyColor(i,this.workColorspace);
              if(rightKeyColor==undefined && i !=tmpCMS.getKeyLength()-1){
                rightKeyColor = tmpCMS.getLeftKeyColor(i+1,this.workColorspace); // left key inside of a range will convert into a twin key
              }
              var leftKeyColor = tmpCMS.getLeftKeyColor(i,this.workColorspace);* /

              if(posArray[currentArrayPos]==tmpCMS.getRefPosition(i)){

                switch (typeArray[currentArrayPos]) {
                  case "S":
                    newCMS.setRightKeyColor(i+numberOfInsertIntervals,undefined);

                    break;
                    case "E":
                      newCMS.setLeftKeyColor(i+numberOfInsertIntervals,this.probeColor);
                      break;
                      case "SE":
                        newCMS.setRightKeyColor(i+numberOfInsertIntervals,this.probeColor);
                        newCMS.setLeftKeyColor(i+numberOfInsertIntervals,this.probeColor);
                        break;
                  default:
                    console.log("Error at function generateProbeCMS");
                    return;
                }

                currentArrayPos++;
                if(currentArrayPos>=posArray.length)
                break;
              }
              else{

                if(currentArrayPos>0){ // if no interval is before the key we do not have to update the key

                  if(typeArray[currentArrayPos-1]!="E"){ // if key is not between the start and the end of a range -> no update
                    newCMS.setRightKeyColor(i+numberOfInsertIntervals,this.probeColor);
                    newCMS.setLeftKeyColor(i+numberOfInsertIntervals,this.probeColor);
                  }
                }

              }


              if(i!=tmpCMS.getKeyLength()-1){

                while (posArray[currentArrayPos]<tmpCMS.getRefPosition(i+1)) {




                  var color = tmpCMS.calculateColor(posArray[currentArrayPos], interpolationSpace);
                  color=color.calcHSVColor();

                  numberOfInsertIntervals++;
                  switch (typeArray[currentArrayPos]) {
                    case "S":
                      newCMS.insertKey(i+numberOfInsertIntervals,new class_Key(color, undefined, posArray[currentArrayPos]));
                      break;
                      case "E":
                        newCMS.insertKey(i+numberOfInsertIntervals,new class_Key(this.probeColor, color, posArray[currentArrayPos]));
                        break;
                        case "SE":
                          newCMS.insertKey(i+numberOfInsertIntervals,new class_Key(this.probeColor, this.probeColor, posArray[currentArrayPos]));
                          break;
                    default:
                      console.log("Error at function generateProbeCMS");
                      return;
                  }



                  //globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(oldColor,undefined,startPos));
                  //console.log(numberOfInsertIntervals,newCMS.getKeyLength() );

                  currentArrayPos++;
                  if(currentArrayPos>=posArray.length)
                  break;
                }

              }

                if(currentArrayPos>=posArray.length)
                break;
            }




            break;
            default:


          }


            return newCMS;


      }


      changeType(type){
        this.type = type;
      }

      getType(){
        return this.type;
      }


      getType(){
        return this.type;
      }


      setProbeColor(newColor){
        this.probeColor = newColor.calcHSVColor();
      }

      getProbeColor(){
        return this.probeColor;
      }

      setNumberProbes(newNumber){
        this.numberOfProbes = newNumber;
      }

      getNumberProbes(){
        return this.numberOfProbes;
      }

      setValueStart(newVal){
        this.valueStart = newVal;
      }

      getValueStart(){
        return this.valueStart;
      }

      setValueEnd(newVal){
        this.valueEnd = newVal;
      }

      getValueEnd(){
        return this.valueEnd;
      }

      changeRangeType(rangeType){
        this.rangeType = rangeType;
      }

      getRangeType(){
        return this.rangeType;
      }

};
*/
