////////////////////////////////////////////////
// ------------ Class Probe ---------------//
////////////////////////////////////////////////


class class_ProbeSet{

      constructor(name) {
        this.name = name;
        this.probeArray = [];
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
        return this.numberOfProbes;
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

      getProbeClone(index){

        if(index<this.probeArray.lenght){

          var newProbe = class_Probe(this.probeArray[index].getType(),this.probeArray[index].getStartPos(),this.probeArray[index].getEndPos(),this.probeArray[index].getProbeColorspace());
          newProbe.setTwoSidedType(this.probeArray[index].getTwoSidedType());
          newProbe.setOneSidedType(this.probeArray[index].getOneSidedType());
          newProbe.setIsTwoSided(this.probeArray[index].getIsTwoSided());
          newProbe.setProbeColor(this.probeArray[index].getProbeColor());

          return newProbe;
        }

        return undefined;

      }


      generateProbeCMS(tmpCMS,interpolationSpace){

          var newCMS = cloneCMS(tmpCMS);

          newCMS.setColormapName(tmpCMS.getColormapName() + this.name);

          if(newCMS.getKeyLength()==0)
          return newCMS;

          var posArray=[];
          var typeArray=[]; // s = start, m=middle, e=end, se= start and  k=key;,
          var indexArray=[];
          var currentKey=0;

          for (var probeIndex = 0; probeIndex < this.probeArray.length; probeIndex++) {

            /////////////////////////////////////////////////////////////
            // if probe is after the last Key
            if(this.probeArray[probeIndex].getStartPos()<=newCMS.getRefPosition(newCMS.getKeyLength()-1)){
                break;
            }

            /////////////////////////////////////////////////////////////
            // if probe is before the current Key // only possible for the first key
            if(this.probeArray[probeIndex].getEndPos()<=newCMS.getRefPosition(0)){
                continue;
            }

            /////////////////////////////////////////////////////////////
            // if probe start is and probe end are after the next keys

            while(this.probeArray[probeIndex].getStartPos()>newCMS.getRefPosition(currentKey+1)){
              currentKey++;
            }

            /////////////////////////////////////////////////////////////
            // if probe is between current and the next Key
            if(this.probeArray[probeIndex].getStartPos()>=newCMS.getRefPosition(currentKey) &&
               this.probeArray[probeIndex].getEndPos()<=newCMS.getRefPosition(currentKey+1)){

                 var currentColor = tmpCMS.calculateColor(this.probeArray[probeIndex].getStartPos());

                 if(this.probeArray[probeIndex].getStartPos()==newCMS.getRefPosition(currentKey)){
                   newCMS.setRightKeyColor(currentKey,currentColor);
                 }
                 else{
                   var startKey;
                   if(this.probeArray[probeIndex].getType()==0){
                     startKey = new class_Key(currentColor, undefined, this.probeArray[probeIndex].getStartPos()); // left key because of constant band
                   }
                   else{
                     var newColor = this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getStartPos(),probeIndex);
                     startKey = new class_Key(currentColor, newColor, this.probeArray[probeIndex].getStartPos()); // left key because of constant band
                   }
                   insertKey(currentKey,startKey,true);
                   currentKey++;
                 }



                 if(this.probeArray[probeIndex].getIsTwoSided()){
                   // need to add a dual key in the middle of the probes
                   var middle = this.probeArray[probeIndex].getStartPos()+((this.probeArray[probeIndex].getStartPos()-this.probeArray[probeIndex].getEndPos())/2);
                   currentColor = tmpCMS.calculateColor(middle);
                   newColor = this.getNewKeyColor(currentColor,middle,probeIndex);
                   var middle = new class_Key(newColor, newColor, this.probeArray[probeIndex].getStartPos()); // left key because of constant band
                   insertKey(currentKey,endKey,true)
                   currentKey++;
                 }

                 currentColor = tmpCMS.calculateColor(this.probeArray[probeIndex].getEndPos());
                 if(this.probeArray[probeIndex].getEndPos()==newCMS.getRefPosition(currentKey+1)){
                   currentKey++;
                   newCMS.setLeftKeyColor(currentKey,currentColor);
                 }
                 else{
                   newColor = this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getEndPos(),probeIndex);
                   var endKey = new class_Key(currentColor, newColor, this.probeArray[probeIndex].getEndPos()); // left key because of constant band
                   insertKey(currentKey,endKey,true)
                   currentKey++;
                 }
                 continue;
            }


            /////////////////////////////////////////////////////////////
            // if probe start is after current and before the next Key AND probe end is after next key

            if(currentKey+1 >= newCMS.getKeyLength()){
                if(this.probeArray[probeIndex].getEndPos()>newCMS.getRefPosition(newCMS.getKeyLength()-1)){
                  newCMS.setLeftKeyColor(newCMS.getKeyLength()-1,this.getNewKeyColor(newCMS.getLeftKeyColor(newCMS.getKeyLength()-1),newCMS.getRefPosition(newCMS.getKeyLength()-1),probeIndex));
                }
                break;
            }

            if(this.probeArray[probeIndex].getStartPos()>=newCMS.getRefPosition(currentKey) &&
               this.probeArray[probeIndex].getStartPos()<newCMS.getRefPosition(currentKey+1) &&
               this.probeArray[probeIndex].getEndPos()>newCMS.getRefPosition(currentKey+1)){

                 // ADD Start Key of Probe
                 var currentColor = tmpCMS.calculateColor(this.probeArray[probeIndex].getStartPos());
                 if(this.probeArray[probeIndex].getStartPos()==newCMS.getRefPosition(currentKey)){
                   newCMS.setRightKeyColor(currentKey,currentColor);
                 }
                 else{
                   var startKey;
                   if(this.probeArray[probeIndex].getType()==0){
                     startKey = new class_Key(currentColor, undefined, this.probeArray[probeIndex].getStartPos()); // left key because of constant band
                   }
                   else{
                     var newColor = this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getStartPos(),probeIndex);
                     startKey = new class_Key(currentColor, newColor, this.probeArray[probeIndex].getStartPos()); // left key because of constant band
                   }
                   insertKey(currentKey,startKey,true);
                   currentKey++;
                 }


                 // Update Keys inside the probe // and add middle of probe
                 var middle = this.probeArray[probeIndex].getStartPos()+((this.probeArray[probeIndex].getStartPos()-this.probeArray[probeIndex].getEndPos())/2);
                 white(this.probeArray[probeIndex].getEndPos()>newCMS.getRefPosition(currentKey+1)){

                   if(this.probeArray[probeIndex].getIsTwoSided() && newCMS.getRefPosition(currentKey)>middle && newCMS.getRefPosition(currentKey+1)<middle){
                     // need to add a dual key in the middle of the probes
                     currentColor = tmpCMS.calculateColor(middle);
                     newColor = this.getNewKeyColor(currentColor,middle,probeIndex);
                     var middle = new class_Key(newColor, newColor, this.probeArray[probeIndex].getStartPos()); // left key because of constant band
                     insertKey(currentKey,endKey,true)
                     currentKey++;
                   }

                   if(this.probeArray[probeIndex].getType()==2){
                     currentColor = tmpCMS.calculateColor(newCMS.getRefPosition(currentKey));
                     newCMS.setRightKeyColor(currentKey,this.getNewKeyColor(currentColor,newCMS.getRefPosition(currentKey),probeIndex));
                     newCMS.setLeftKeyColor(currentKey,this.getNewKeyColor(currentColor,newCMS.getRefPosition(currentKey),probeIndex));
                     currentKey++;
                   }
                   else{
                     // for gradient probes and constant probes -> remove keys inside a probe
                     deleteKey(currentKey);
                     currentKey--;
                   }

                 }

                 currentColor = tmpCMS.calculateColor(this.probeArray[probeIndex].getEndPos());
                 if(this.probeArray[probeIndex].getEndPos()==newCMS.getRefPosition(currentKey+1)){
                   currentKey++;
                   newCMS.setLeftKeyColor(currentKey,currentColor);
                 }
                 else{
                   newColor = this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getEndPos(),probeIndex);
                   var endKey = new class_Key(currentColor, newColor, this.probeArray[probeIndex].getEndPos()); // left key because of constant band
                   insertKey(currentKey,endKey,true)
                   currentKey++;
                 }


               continue;
            }



            /////////////////////////////////////////////////////////////
            // if probe start is before current and end after the current Key  // I think this should only possible for currentKey==0

            if(this.probeArray[probeIndex].getStartPos()<newCMS.getRefPosition(currentKey) &&
               this.probeArray[probeIndex].getEndPos()>=newCMS.getRefPosition(currentKey) &&
               ){

                 if(currentKey==0){
                   var currentColor;

                   if(newCMS.getKeyType() == "nil key"){
                     currentColor = newCMS.getLeftKeyColor(1);
                   }
                   else{
                     currentColor = newCMS.getRightKeyColor(0);
                   }

                   newCMS.setRightKeyColor(0,this.getNewKeyColor(currentColor,newCMS.getRefPosition(0),probeIndex));

                   // Update Keys inside the probe // and add middle of probe
                   var middle = this.probeArray[probeIndex].getStartPos()+((this.probeArray[probeIndex].getStartPos()-this.probeArray[probeIndex].getEndPos())/2);
                   white(this.probeArray[probeIndex].getEndPos()>newCMS.getRefPosition(currentKey+1)){

                     if(this.probeArray[probeIndex].getIsTwoSided() && newCMS.getRefPosition(currentKey)>middle && newCMS.getRefPosition(currentKey+1)<middle){
                       // need to add a dual key in the middle of the probes
                       currentColor = tmpCMS.calculateColor(middle);
                       newColor = this.getNewKeyColor(currentColor,middle,probeIndex);
                       var middle = new class_Key(newColor, newColor, this.probeArray[probeIndex].getStartPos()); // left key because of constant band
                       insertKey(currentKey,endKey,true)
                       currentKey++;
                     }

                     if(this.probeArray[probeIndex].getType()==2){
                       currentColor = tmpCMS.calculateColor(newCMS.getRefPosition(currentKey));
                       newCMS.setRightKeyColor(currentKey,this.getNewKeyColor(currentColor,newCMS.getRefPosition(currentKey),probeIndex));
                       newCMS.setLeftKeyColor(currentKey,this.getNewKeyColor(currentColor,newCMS.getRefPosition(currentKey),probeIndex));
                       currentKey++;
                     }
                     else{
                       // for gradient probes and constant probes -> remove keys inside a probe
                       deleteKey(currentKey);
                       currentKey--;
                     }

                   }

                   currentColor = tmpCMS.calculateColor(this.probeArray[probeIndex].getEndPos());
                   if(this.probeArray[probeIndex].getEndPos()==newCMS.getRefPosition(currentKey+1)){
                     currentKey++;
                     newCMS.setLeftKeyColor(currentKey,currentColor);
                   }
                   else{
                     newColor = this.getNewKeyColor(currentColor,this.probeArray[probeIndex].getEndPos(),probeIndex);
                     var endKey = new class_Key(currentColor, newColor, this.probeArray[probeIndex].getEndPos()); // left key because of constant band
                     insertKey(currentKey,endKey,true)
                     currentKey++;
                   }



                 }
                 else{
                   currentKey--;
                   probeIndex--;
                 }

                 continue;

            }


            /// TEST nothing should reach this loop area
            console.log("Probe:",this.probeArray[probeIndex].getStartPos(),this.probeArray[probeIndex].getEndPos());
            console.log("Key:", newCMS.getRefPosition(currentKey));

          }

          return newCMS;

      }


      getNewKeyColor(keyColor,keyPosition,probeIndex){


          if(keyPosition<this.probeArray[probeIndex].getStartPos() || keyPosition>this.probeArray[probeIndex].getEndPos()){
            return keyColor;
          }

          if(this.probeArray[probeIndex].getType()==0){
            /////////////////////////////////////////////////
            // constant probe

            return this.probeArray[probeIndex].getProbeColor();
          }



          var positionRatio =  Math.abs(keyPosition-this.probeArray[probeIndex].getStartPos()/(this.probeArray[probeIndex].getEndPos()-this.probeArray[probeIndex].getStartPos()));

          var tmpHSVColor;
          if(this.probeArray[probeIndex].getType()==1){
            /////////////////////////////////////////////////
            // gradient probe
            tmpHSVColor = this.probeArray[probeIndex].getProbeColor();
          }
          else{
            /////////////////////////////////////////////////
            // contour probe
            tmpHSVColor = keyColor.calcHSVColor();
          }

          if(this.probeArray[probeIndex].getIsTwoSided()){
            switch (this.probeArray[probeIndex].getTwoSidedType()) {
              case 0: // value 0 -> 100 AND saturation 0 -> 100 -> 0
              case 1: // value 100 -> 0 AND saturation 0 -> 100 -> 0
                      if(this.probeArray[probeIndex].getTwoSidedType()=1)
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
                  if(this.probeArray[probeIndex].getTwoSidedType()=3)
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
                return keyColor;
            }
          }



      }

};
