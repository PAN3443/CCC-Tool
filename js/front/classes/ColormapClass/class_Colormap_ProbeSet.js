////////////////////////////////////////////////
// ------------ Class Probe ---------------//
////////////////////////////////////////////////


class class_ProbeSet{

      constructor(name) {
        this.name = name;
        this.probeArray = [];
        this.currentKey = 0;
      }

      deconstructor(){

      }

      clear(){
        this.probeArray = [];
      }

      getProbeSetName(){
        return this.name;
      }

      setProbeSetName(val){
        this.name = val;
      }

      getProbeLength(){
        return this.probeArray.length;
      }


      setProbe(index,probe){
        this.probeArray[index]=probe;
      }

      getProbe(index){
        return this.probeArray[index];
      }

      addProbe(probe){
        this.probeArray.push(probe);
      }

      insertProbe(index,probe){
          this.probeArray.splice(index, 0,probe);
      }

      getProbeClone(index){

        if(index<this.probeArray.length){

          var newProbe = new class_Probe(this.probeArray[index].getType(),this.probeArray[index].getStartPos(),this.probeArray[index].getEndPos(),this.probeArray[index].getProbeColorspace());
          newProbe.setTwoSidedType(this.probeArray[index].getTwoSidedType());
          newProbe.setOneSidedType(this.probeArray[index].getOneSidedType());
          newProbe.setIsTwoSided(this.probeArray[index].getIsTwoSided());
          newProbe.setProbeColor(this.probeArray[index].getProbeColor());

          return newProbe;
        }


        return undefined;

      }


      generateProbeCMS(tmpCMS){

          var newCMS = cloneCMS(tmpCMS);

          this.currentKey=0;
          newCMS.setColormapName(tmpCMS.getColormapName() + this.name);

          if(newCMS.getKeyLength()==0)
          return newCMS;

          var posArray=[];
          var typeArray=[]; // s = start, m=middle, e=end, se= start and  k=key;,
          var indexArray=[];
          var doInfo =true;

          for (var probeIndex = 0; probeIndex < this.probeArray.length; probeIndex++) {


            /////////////////////////////////////////////////////////////
            // if probe is after the last Key
            if(this.probeArray[probeIndex].getStartPos()>=newCMS.getRefPosition(newCMS.getKeyLength()-1)){
                //if(doInfo)console.log(probeIndex,"probe is after last key");
                break;
            }

            /////////////////////////////////////////////////////////////
            // if probe is before the current Key // only possible for the first key
            if(this.probeArray[probeIndex].getEndPos()<=newCMS.getRefPosition(0)){
                //if(doInfo)console.log(probeIndex,"probe is before current key");
                continue;
            }

            /////////////////////////////////////////////////////////////
            // if probe start is and probe end are after the next keys

            while(this.probeArray[probeIndex].getStartPos()>=newCMS.getRefPosition(this.currentKey+1)){
              //if(doInfo)console.log(probeIndex,"skip key: ", this.currentKey);
              this.currentKey++;
            }

            /////////////////////////////////////////////////////////////
            // if probe is between current and the next Key
            if(this.probeArray[probeIndex].getStartPos()>=newCMS.getRefPosition(this.currentKey) &&
               this.probeArray[probeIndex].getEndPos()<=newCMS.getRefPosition(this.currentKey+1)){

                 //if(doInfo)console.log(probeIndex,"probe is between current and the next Key");

                 if(this.probeArray[probeIndex].getStartPos()==newCMS.getRefPosition(this.currentKey)){
                   var currentColor = newCMS.getRightKeyColor(this.currentKey,"hsv");
                   newCMS.setRightKeyColor(this.currentKey,this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getStartPos(),probeIndex));
                 }
                 else{
                   var currentColor = tmpCMS.calculateColor(this.probeArray[probeIndex].getStartPos());
                   var startKey;
                   if(this.probeArray[probeIndex].getType()==0){
                     startKey = new class_Key(currentColor, undefined, this.probeArray[probeIndex].getStartPos()); // left key because of constant band
                   }
                   else{
                     var newColor = this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getStartPos(),probeIndex);
                     startKey = new class_Key(currentColor, newColor, this.probeArray[probeIndex].getStartPos()); // left key because of constant band
                   }
                   this.currentKey++;
                   newCMS.insertKey(this.currentKey,startKey,true);
                 }


                 // need to add a dual key in the middle of the probes and in the case of struts
                 if(this.probeArray[probeIndex].getIsTwoSided()){

                  var middle = this.probeArray[probeIndex].getStartPos()+(Math.abs(this.probeArray[probeIndex].getStartPos()-this.probeArray[probeIndex].getEndPos())/2);


                    if(this.probeArray[probeIndex].getType()==1){
                      currentColor = tmpCMS.calculateColor(middle);
                      var newColor = this.getNewKeyColor(currentColor,middle,probeIndex);
                      var middleKey = new class_Key(newColor, newColor, middle); // left key because of constant band
                      this.currentKey++;
                      newCMS.insertKey(this.currentKey,middleKey,false);
                    }


                    if(this.probeArray[probeIndex].getType()==2){
                      var addExtraMiddle = false;
                      if(this.probeArray[probeIndex].getNumberOfStrutKeys()%2==0){
                        addExtraMiddle=true;
                      }
                      var currentPos = this.probeArray[probeIndex].getStartPos();
                      var strucDis = Math.abs(this.probeArray[probeIndex].getEndPos()-this.probeArray[probeIndex].getStartPos())/(this.probeArray[probeIndex].getNumberOfStrutKeys()+1);

                      for (var i = 1; i <= this.probeArray[probeIndex].getNumberOfStrutKeys(); i++) {
                        var nextPos = currentPos+strucDis;

                        if(addExtraMiddle){
                          if( middle>currentPos && middle<nextPos){
                            currentColor = tmpCMS.calculateColor(middle);
                            var newColor = this.getNewKeyColor(currentColor,middle,probeIndex);
                            var middleKey = new class_Key(newColor, newColor, middle); // left key because of constant band
                            this.currentKey++;
                            newCMS.insertKey(this.currentKey,middleKey,false);
                          }
                        }

                        currentColor = tmpCMS.calculateColor(nextPos);
                        var newColor = this.getNewKeyColor(currentColor,nextPos,probeIndex);
                        var strutKey = new class_Key(newColor, newColor, nextPos); // left key because of constant band
                        this.currentKey++;
                        newCMS.insertKey(this.currentKey,strutKey,false);


                        currentPos=nextPos;
                      }
                    }



                 }


                 if(this.probeArray[probeIndex].getEndPos()==newCMS.getRefPosition(this.currentKey+1)){
                   this.currentKey++;
                   var currentColor = newCMS.getLeftKeyColor(this.currentKey,"hsv");
                   newCMS.setLeftKeyColor(this.currentKey,this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getEndPos(),probeIndex));
                 }
                 else{
                   var currentColor = tmpCMS.calculateColor(this.probeArray[probeIndex].getEndPos());
                   newColor = this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getEndPos(),probeIndex);
                   var endKey = new class_Key(newColor,currentColor, this.probeArray[probeIndex].getEndPos()); // left key because of constant band
                   this.currentKey++;
                   newCMS.insertKey(this.currentKey,endKey,true);

                 }
                 continue;
            }


            /////////////////////////////////////////////////////////////
            // if probe start is after current and before the next Key AND probe end is after next key



            if(this.probeArray[probeIndex].getStartPos()>=newCMS.getRefPosition(this.currentKey) &&
               this.probeArray[probeIndex].getStartPos()<newCMS.getRefPosition(this.currentKey+1) &&
               this.probeArray[probeIndex].getEndPos()>newCMS.getRefPosition(this.currentKey+1)){

                 //if(doInfo)console.log(probeIndex,"probe start is after current and before the next Key AND probe end is after next key");
                 // ADD Start Key of Probe

                 if(this.probeArray[probeIndex].getStartPos()==newCMS.getRefPosition(this.currentKey)){
                   var currentColor = newCMS.getRightKeyColor(this.currentKey,"hsv");
                   newCMS.setRightKeyColor(this.currentKey,this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getStartPos(),probeIndex));
                 }
                 else{
                   var startKey;
                   if(this.probeArray[probeIndex].getType()==0){
                     startKey = new class_Key(tmpCMS.calculateColor(this.probeArray[probeIndex].getStartPos()), undefined, this.probeArray[probeIndex].getStartPos()); // left key because of constant band
                   }
                   else{
                     var newColor = this.getNewKeyColor(tmpCMS.calculateColor(this.probeArray[probeIndex].getStartPos()),this.probeArray[probeIndex].getStartPos(),probeIndex);
                     startKey = new class_Key(tmpCMS.calculateColor(this.probeArray[probeIndex].getStartPos()), newColor, this.probeArray[probeIndex].getStartPos()); // left key because of constant band

                   }

                   this.currentKey++;
                   newCMS.insertKey(this.currentKey,startKey,true);
                 }

                 // check if the probe is going after the last key
                 if(this.probeArray[probeIndex].getEndPos() >= newCMS.getRefPosition(newCMS.getKeyLength()-1)){
                     //if(doInfo)console.log(probeIndex,"reached last key");

                     // update keys till the last key
                     newCMS = this.updateInsideProbeRange(newCMS,tmpCMS,probeIndex,true);

                     newCMS.setLeftKeyColor(newCMS.getKeyLength()-1,this.getNewKeyColor(newCMS.getLeftKeyColor(newCMS.getKeyLength()-1,"hsv"),newCMS.getRefPosition(newCMS.getKeyLength()-1),probeIndex));

                     break;
                 }
                 else{
                   // Update Keys inside the probe // and add middle of probe

                   newCMS = this.updateInsideProbeRange(newCMS,tmpCMS,probeIndex,false);




                   if(this.probeArray[probeIndex].getEndPos()==newCMS.getRefPosition(this.currentKey+1)){
                     this.currentKey++;
                     var currentColor = newCMS.getLeftKeyColor(this.currentKey,"hsv");
                     newCMS.setLeftKeyColor(this.currentKey,this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getEndPos(),probeIndex));
                   }
                   else{
                     var currentColor = tmpCMS.calculateColor(this.probeArray[probeIndex].getEndPos());
                     newColor = this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getEndPos(),probeIndex);
                     var endKey = new class_Key( newColor,currentColor, this.probeArray[probeIndex].getEndPos()); // left key because of constant band
                     this.currentKey++;
                     newCMS.insertKey(this.currentKey,endKey,true);
                   }


                 continue;
                 }


            }



            /////////////////////////////////////////////////////////////
            // if probe start is before current and end after the current Key  // I think this should only possible for this.currentKey==0

            if(this.probeArray[probeIndex].getStartPos()<newCMS.getRefPosition(this.currentKey) &&
               this.probeArray[probeIndex].getEndPos()>=newCMS.getRefPosition(this.currentKey)
               ){
                 //if(doInfo)console.log(probeIndex,"probe start is before current and end after the current Key");


                 if(this.currentKey==0){


                   var currentColor;

                   if(newCMS.getKeyType(this.currentKey) == "nil key"){
                     currentColor = newCMS.getLeftKeyColor(1,"hsv");
                   }
                   else{
                     currentColor = newCMS.getRightKeyColor(0,"hsv");
                   }

                   newCMS.setRightKeyColor(0,this.getNewKeyColor(currentColor,newCMS.getRefPosition(0),probeIndex));

                   // check if the probe is going after the last key
                   if(this.probeArray[probeIndex].getEndPos() >= newCMS.getRefPosition(newCMS.getKeyLength()-1)){
                       //if(doInfo)console.log(probeIndex,"reached last key");

                       // update keys till the last key
                       newCMS = this.updateInsideProbeRange(newCMS,tmpCMS,probeIndex,true);

                       newCMS.setLeftKeyColor(newCMS.getKeyLength()-1,this.getNewKeyColor(newCMS.getLeftKeyColor(newCMS.getKeyLength()-1,"hsv"),newCMS.getRefPosition(newCMS.getKeyLength()-1),probeIndex));

                       break;
                   }
                   else{

                       newCMS = this.updateInsideProbeRange(newCMS,tmpCMS,probeIndex,false);


                       if(this.probeArray[probeIndex].getEndPos()==newCMS.getRefPosition(this.currentKey+1)){
                         this.currentKey++;
                         currentColor = newCMS.getLeftKeyColor(this.currentKey,"hsv");

                         newCMS.setLeftKeyColor(this.currentKey,this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getEndPos(),probeIndex));
                       }
                       else{
                         currentColor = tmpCMS.calculateColor(this.probeArray[probeIndex].getEndPos());
                         newColor = this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getEndPos(),probeIndex);
                         var endKey = new class_Key( newColor,currentColor, this.probeArray[probeIndex].getEndPos()); // left key because of constant band
                         this.currentKey++;
                         newCMS.insertKey(this.currentKey,endKey,true);
                       }
                    }



                 }
                 else{
                   this.currentKey--;
                   probeIndex--;
                 }

                 continue;

            }


            /// TEST nothing should reach this loop area
            /*console.log("Probe:",this.probeArray[probeIndex].getStartPos(),this.probeArray[probeIndex].getEndPos());
            console.log("Key:", newCMS.getRefPosition(this.currentKey));*/

          }


          //if(doInfo)console.log("number of new key: ", newCMS.getKeyLength()-tmpCMS.getKeyLength());

          /*for (var i = 0; i < newCMS.getKeyLength(); i++) {
            console.log('Key ' + i + ':  ref('+newCMS.getRefPosition(i)+')')
            var tmpColor = newCMS.getLeftKeyColor(i,"hsv");

            if(tmpColor==undefined){
              console.log('left-color: ('+undefined+')');
            }
            else {
              console.log('left-color: ('+tmpColor.get1Value()+','+tmpColor.get2Value()+','+tmpColor.get3Value()+')');
            }

            var tmpColor = newCMS.getRightKeyColor(i,"hsv");

            if(tmpColor==undefined){
              console.log('right-color: ('+undefined+')');
            }
            else {
              console.log('right-color: ('+tmpColor.get1Value()+','+tmpColor.get2Value()+','+tmpColor.get3Value()+')');
            }

            console.log('----------------------------------------------------------');
          }*/






          return newCMS;

      }


      getNewKeyColor(keyColor,keyPosition,probeIndex){

          var tmpHSVColor;
          if(keyPosition<this.probeArray[probeIndex].getStartPos() || keyPosition>this.probeArray[probeIndex].getEndPos()){
            tmpHSVColor = keyColor.calcHSVColor();
            return tmpHSVColor;
          }

          if(this.probeArray[probeIndex].getType()==0){
            /////////////////////////////////////////////////
            // constant probe

            if(keyPosition==this.probeArray[probeIndex].getStartPos()){
              return undefined;
            }

            return this.probeArray[probeIndex].getProbeColor();
          }

          var positionRatio =  Math.abs((keyPosition-this.probeArray[probeIndex].getStartPos())/(this.probeArray[probeIndex].getEndPos()-this.probeArray[probeIndex].getStartPos()));

          if(this.probeArray[probeIndex].getType()==1){
            /////////////////////////////////////////////////
            // gradient probe

            tmpHSVColor = this.probeArray[probeIndex].getProbeColor();
          }
          else{
            /////////////////////////////////////////////////
            // contour probe
            if(keyColor==undefined)
            return new classColor_HSV(0.0,1.0,1.0);

            tmpHSVColor = keyColor.calcHSVColor();
          }

          if(this.probeArray[probeIndex].getIsTwoSided()){
            switch (this.probeArray[probeIndex].getTwoSidedType()) {
              case 0: // value 0 -> 100 AND saturation 0 -> 100 -> 0
              case 1: // value 100 -> 0 AND saturation 0 -> 100 -> 0
                      if(this.probeArray[probeIndex].getTwoSidedType()==1)
                        tmpHSVColor.set3Value(1.0-positionRatio);
                      else
                        tmpHSVColor.set3Value(positionRatio);

                      if(positionRatio==0.5){
                            tmpHSVColor.set2Value(1.0);
                      }
                      else{
                        if(positionRatio>0.5){
                            var newRatio = (positionRatio-0.5)/0.5;
                            tmpHSVColor.set2Value(1.0-newRatio);
                        }
                        else{
                            var newRatio = (positionRatio)/0.5;
                            tmpHSVColor.set2Value(newRatio);
                        }
                      }
                break;
              case 2: // value 100 -> 0 -> 100  AND saturation 0 -> 100
              case 3: // value 100 -> 0 -> 100 AND saturation 100 -> 0
                  if(this.probeArray[probeIndex].getTwoSidedType()==3)
                    tmpHSVColor.set2Value(1.0-positionRatio);
                  else
                    tmpHSVColor.set2Value(positionRatio);

                  if(positionRatio==0.5){
                        tmpHSVColor.set3Value(0.0);
                  }
                  else{
                    if(positionRatio>0.5){
                        var newRatio = (positionRatio-0.5)/0.5;
                        tmpHSVColor.set3Value(newRatio);
                    }
                    else{
                        var newRatio = (positionRatio)/0.5;
                        tmpHSVColor.set3Value(1.0-newRatio);
                    }
                  }
                  break;
                case 4: // value 0 -> 100 -> 0  AND saturation 0 -> 100
                case 5: // value 0 -> 100 -> 0 AND saturation 100 -> 0
                      if(this.probeArray[probeIndex].getTwoSidedType()==4)
                        tmpHSVColor.set2Value(1.0-positionRatio);
                      else
                        tmpHSVColor.set2Value(positionRatio);

                      if(positionRatio==0.5){
                            tmpHSVColor.set3Value(1.0);
                      }
                      else{
                        if(positionRatio>0.5){
                            var newRatio = (positionRatio-0.5)/0.5;
                            tmpHSVColor.set3Value(1.0-newRatio);
                        }
                        else{
                            var newRatio = (positionRatio)/0.5;
                            tmpHSVColor.set3Value(newRatio);
                        }
                      }
                    break;
              default:
                  console.log("Error at getNewKeyColor function");
                  return keyColor;
            }
          }
          else{
            switch (this.probeArray[probeIndex].getOneSidedType()) {
              case 0: // value 100 -> 0
                    tmpHSVColor.set3Value(1.0-positionRatio);
                break;
                case 1: // value 0 -> 100
                    tmpHSVColor.set3Value(positionRatio);
                  break;
              default:
                console.log("Error at getNewKeyColor function");
                return tmpHSVColor;
            }
          }

          return tmpHSVColor;



      }


      updateInsideProbeRange(newCMS,tmpCMS, probeIndex, reachedLast){



        switch (this.probeArray[probeIndex].getType()) {
          case 0:
          // constant probes -> remove keys inside a probe
            while(this.checkWhileArgument(newCMS,probeIndex,reachedLast)){
                this.currentKey++;
                newCMS.deleteKey(this.currentKey);
                this.currentKey--;
            }
            break;
            case 1:

              while(this.checkWhileArgument(newCMS,probeIndex,reachedLast)){
                  this.currentKey++;
                  newCMS.deleteKey(this.currentKey);
                  this.currentKey--;
              }

              if(this.probeArray[probeIndex].getIsTwoSided()){
                var middle = this.probeArray[probeIndex].getStartPos()+(Math.abs(this.probeArray[probeIndex].getStartPos()-this.probeArray[probeIndex].getEndPos())/2);
                // need to add a dual key in the middle of the probes
                var currentColor = tmpCMS.calculateColor(middle);
                var newColor = this.getNewKeyColor(currentColor,middle,probeIndex);
                var middleKey = new class_Key(newColor, newColor, middle); // left key because of constant band
                this.currentKey++;
                newCMS.insertKey(this.currentKey,middleKey,false);
                //this.currentKey++;
              }

              break;
              case 2:

                  var middle = this.probeArray[probeIndex].getStartPos()+(Math.abs(this.probeArray[probeIndex].getStartPos()-this.probeArray[probeIndex].getEndPos())/2);
                  var addExtraMiddle = false;
                  if(this.probeArray[probeIndex].getIsTwoSided() && this.probeArray[probeIndex].getNumberOfStrutKeys()%2==0){
                    addExtraMiddle=true;
                  }
                  var currentPos = this.probeArray[probeIndex].getStartPos();
                  var strucDis = Math.abs(this.probeArray[probeIndex].getEndPos()-this.probeArray[probeIndex].getStartPos())/(this.probeArray[probeIndex].getNumberOfStrutKeys()+1);
                  var reachedEndOfCMS = false;
                  var notAddNextStrut = false; // in case a key has the same reference of a strut the key will be modified and the strut hasn't to be added
                  var doneExtraMiddle = false;
                  for (var i = 0; i < this.probeArray[probeIndex].getNumberOfStrutKeys(); i++) {
                    var nextPos = currentPos+strucDis;


                    while(nextPos>=newCMS.getRefPosition(this.currentKey+1)){



                      if(addExtraMiddle && doneExtraMiddle == false){
                        // check if currentKey is on the middel
                        if(middle == newCMS.getRefPosition(this.currentKey+1)){
                          // will be done with the update of the key
                          doneExtraMiddle=true;
                        }
                        else if ( middle < newCMS.getRefPosition(this.currentKey+1) &&  // if middle is between two keys
                                  middle > newCMS.getRefPosition(this.currentKey) &&
                                  middle > currentPos) {
                          var currentColor = tmpCMS.calculateColor(middle);
                          var newColor = this.getNewKeyColor(currentColor,middle,probeIndex);
                          var middleKey = new class_Key(newColor, newColor, middle); // left key because of constant band
                          this.currentKey++;
                          newCMS.insertKey(this.currentKey,middleKey,false);
                          doneExtraMiddle=true;
                        }
                      }

                      // update of the key
                      this.currentKey++;
                      if(this.currentKey==newCMS.getKeyLength()-1){
                        var currentLeftColor = newCMS.getLeftKeyColor(this.currentKey,"hsv");
                        newCMS.setLeftKeyColor(this.currentKey,this.getNewKeyColor(currentLeftColor,newCMS.getRefPosition(this.currentKey),probeIndex));
                        reachedEndOfCMS=true;
                        break;
                      }

                      // special case: key and strut have the same reference point -> extend the while loop
                      if(nextPos==newCMS.getRefPosition(this.currentKey+1)){
                        if(i == this.probeArray[probeIndex].getNumberOfStrutKeys()-1){
                          var currentLeftColor = newCMS.getLeftKeyColor(this.currentKey,"hsv");
                          newCMS.setLeftKeyColor(this.currentKey,this.getNewKeyColor(currentLeftColor,newCMS.getRefPosition(this.currentKey),probeIndex));
                          reachedEndOfCMS=true; // this case is not the end of the CMS but the end of the strut
                          break;
                        }
                        currentPos = nextPos;
                        nextPos = currentPos+strucDis;
                      }

                      var currentRightColor = newCMS.getRightKeyColor(this.currentKey,"hsv");
                      var currentLeftColor = newCMS.getLeftKeyColor(this.currentKey,"hsv");
                      if(currentRightColor==undefined){
                        var currentRightColor = newCMS.getLeftKeyColor(this.currentKey+1,"hsv");
                        newCMS.setRightKeyColor(this.currentKey,this.getNewKeyColor(currentRightColor,newCMS.getRefPosition(this.currentKey),probeIndex));
                      }
                      else{
                        newCMS.setRightKeyColor(this.currentKey,this.getNewKeyColor(currentRightColor,newCMS.getRefPosition(this.currentKey),probeIndex));
                      }
                      newCMS.setLeftKeyColor(this.currentKey,this.getNewKeyColor(currentLeftColor,newCMS.getRefPosition(this.currentKey),probeIndex));

                      newCMS.setBur(this.currentKey,false);


                    }

                    if(reachedEndOfCMS){
                      break;
                    }

                    if(notAddNextStrut){
                      notAddNextStrut=false;
                      continue;
                    }


                    if(addExtraMiddle && doneExtraMiddle == false ){ // if middle is between two struts or between a key and a strut
                      if( middle>currentPos && middle<nextPos){
                        var currentColor = tmpCMS.calculateColor(middle);
                        var newColor = this.getNewKeyColor(currentColor,middle,probeIndex);
                        var middleKey = new class_Key(newColor, newColor, middle); // left key because of constant band
                        this.currentKey++;
                        newCMS.insertKey(this.currentKey,middleKey,false);
                        doneExtraMiddle=true;
                      }
                    }

                    var currentColor = tmpCMS.calculateColor(nextPos);
                    var newColor = this.getNewKeyColor(currentColor,nextPos,probeIndex);
                    var strutKey = new class_Key(newColor, newColor, nextPos); // left key because of constant band
                    this.currentKey++;
                    newCMS.insertKey(this.currentKey,strutKey,false);


                    currentPos=nextPos;
                  }

                break;
          default:

        }


        return newCMS;


        /*var middle = this.probeArray[probeIndex].getStartPos()+((this.probeArray[probeIndex].getStartPos()-this.probeArray[probeIndex].getEndPos())/2);
        while(this.probeArray[probeIndex].getEndPos()>newCMS.getRefPosition(this.currentKey+1)){

          if(newCMS.getRefPosition(this.currentKey)==middle){
            currentColor = tmpCMS.calculateColor(middle);
            newColor = this.getNewKeyColor(currentColor,middle,probeIndex);
            newCMS.setRightKeyColor(this.currentKey,newColor);
            newCMS.setLeftKeyColor(this.currentKey,newColor);
            this.currentKey++;
          }

          if(this.probeArray[probeIndex].getIsTwoSided() && newCMS.getRefPosition(this.currentKey)>middle && newCMS.getRefPosition(this.currentKey+1)<middle){
            // need to add a dual key in the middle of the probes
            currentColor = tmpCMS.calculateColor(middle);
            newColor = this.getNewKeyColor(currentColor,middle,probeIndex);
            var middleKey = new class_Key(newColor, newColor, this.probeArray[probeIndex].getStartPos()); // left key because of constant band
            this.currentKey++;
            newCMS.insertKey(this.currentKey,middleKey,false);
            this.currentKey++;
          }

          if(this.probeArray[probeIndex].getType()==2){


            this.currentKey++;
            var currentRightColor = newCMS.getRightKeyColor(this.currentKey,"hsv");
            var currentLeftColor = newCMS.getLeftKeyColor(this.currentKey,"hsv");
            newCMS.setRightKeyColor(this.currentKey,this.getNewKeyColor(currentRightColor,newCMS.getRefPosition(this.currentKey),probeIndex));
            newCMS.setLeftKeyColor(this.currentKey,this.getNewKeyColor(currentLeftColor,newCMS.getRefPosition(this.currentKey),probeIndex));

          }
          else{
            // for gradient probes and constant probes -> remove keys inside a probe
            this.currentKey++;
            newCMS.deleteKey(this.currentKey);
            this.currentKey--;
          }

        }*/
      }

      checkWhileArgument(newCMS,probeIndex,reachedLast){

        if(reachedLast){
          if(this.currentKey<newCMS.getKeyLength()-2)
            return true;
        }
        else{
          if(this.probeArray[probeIndex].getEndPos()>newCMS.getRefPosition(this.currentKey+1))
            return true;
        }

        return false;

      }
};


function cloneProbeSet(probesetObj){

  var newProbeSet = new class_ProbeSet();

  for (var i = 0; i < probesetObj.getProbeLength(); i++) {
    newProbeSet.addProbe(probesetObj.getProbeClone(i));
  }

  newProbeSet.setProbeSetName(probesetObj.getProbeSetName());

  return newProbeSet;
}
