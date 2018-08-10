////////////////////////////////////////////////
// ------------ Class DIN99 ---------------//
////////////////////////////////////////////////

// DIN99 Version o

class classProbe{

      constructor(type, fct, rangeType) {
        this.type = type; // 0=gradient, 1=contour
        this.fct = fct; // 0=linear
        this.rangeType = rangeType; // 0=singe, 1=interval, 2=interval auto, 3=custom
        this.backgroundColor = undefined;
        this.intervalStartPos = [];
        this.intervalEndPos = [];
        this.workColorspace = "hsv";

      }

      addIntervalColorPos(start, end){
        this.intervalStartPos.push(start);
        this.intervalEndPos.push(end);
      }

      clearIntervalColors(){
        this.intervalStartPos=[];
        this.intervalEndPos=[];
      }

      generateProbeCMS(tmpCMS,interpolationSpace){

          var newCMS = cloneCMS(tmpCMS);

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
                  rightKeyColor.setVValue(0);
                }
                  break;
                  case "E":
                  if(leftKeyColor!=undefined){
                    leftKeyColor.setVValue(1);
                  }
                    break;
                    case "SE":
                      if(rightKeyColor!=undefined){
                        rightKeyColor.setVValue(0);
                      }
                      if(leftKeyColor!=undefined){
                        leftKeyColor.setVValue(1);
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
                    rightKeyColor.setVValue(keyRatio);
                  }
                  if(leftKeyColor!=undefined){
                    leftKeyColor.setVValue(keyRatio);
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
                colorL.set3Value(1);
                var colorR = new classColor_HSV(colorL.get1Value(),colorL.get2Value(),0);

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


        return newCMS;


      }


      changeType(type){
        this.type = type;
      }

      getType(){
        return this.type;
      }


      changeFunction(fct){
        this.fct = fct;
      }

      getFunction(){
        return this.fct;
      }

      changeRangeType(rangeType){
        this.rangeType = rangeType;
      }

      getRangeType(){
        return this.rangeType;
      }

};
