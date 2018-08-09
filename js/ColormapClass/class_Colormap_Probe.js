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
        this.intervalColorPos = [];
        this.intervalColorRatio = [];

      }

      addIntervalColorPos(pos, ratio){
        this.intervalColorPos.push(pos);
        this.intervalColorRatio.push(ratio);
      }


      generateProbeCMS(tmpCMS){

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

};
