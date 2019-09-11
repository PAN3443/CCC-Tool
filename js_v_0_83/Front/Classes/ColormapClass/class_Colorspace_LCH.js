////////////////////////////////////////////////
// ------------ Class CIELab ---------------//
////////////////////////////////////////////////

class classColor_LCH{

      constructor(lValue, cValue, hValue) {
        this.lValue = lValue;
        this.cValue = cValue;
        this.hValue = hValue;
        this.colorType = "lch";
      }

      deleteReferences(){
        delete this.lValue;
        delete this.cValue;
        delete this.hValue;
        delete this.colorType;
      }

      getColorType(){
        return this.colorType;
      }
      getLValue() {
        return this.lValue;
      }

      getCValue() {
        return this.cValue;
      }

      getHValue() {
        return this.hValue;
      }

      get1Value() {
        return this.lValue;
      }

      get2Value() {
        return this.cValue;
      }

      get3Value() {
        return this.hValue;
      }

      set1Value(newVal) {
          this.lValue=newVal;
      }

      set2Value(newVal) {
          this.cValue=newVal;
      }

      set3Value(newVal){
          this.hValue=newVal;
      }

      setLValue(newLVal) {
        this.lValue = newLVal;
      }

      setCValue(newAVal) {
        this.cValue = newAVal;
      }

      setHValue(newBVal) {
        this.hValue = newBVal;
      }

      getRGBString() {
        var tmpRGB = this.calcRGBColor();
        var string = tmpRGB.getRGBString();
        tmpRGB.deleteReferences();
        return string;
      }

      equalTo(color){

        switch (color.getColorType()) {
          case "lch":
              if(color.get1Value()==this.get1Value()&&
                 color.get2Value()==this.get2Value()&&
                 color.get3Value()==this.get3Value())
                 return true;
              else
                return false;
          default:
            var tmpColor = color.calcLCHColor();
            if(color.get1Value()==this.get1Value()&&
               color.get2Value()==this.get2Value()&&
               color.get3Value()==this.get3Value())
               return true;
            else
              return false;

        }

      }

      getInColorFormat(format){
        switch (format) {
          case "rgb":
              return this.calcRGBColor();
          case "hsv":
              return this.calcHSVColor();
          case "lab":
              return this.calcLABColor();
          case "din99":
              return this.calcDIN99Color();
          case "lch":
              return new classColor_LCH(this.get1Value(),this.get2Value(),this.get3Value());
          default:
            console.log("Error in function getColorFormat of LAB class");
        }

      }

      calcXYZColor(){
        var tmpLab = this.calcLABColor();
        var xyzColor = tmpLab.calcXYZColor();
        tmpLab.deleteReferences();
        return xyzColor;
      }

      calcRGBColor(){
        var tmpLab = this.calcLABColor();
        var rgbColor = tmpLab.calcRGBColor();
        tmpLab.deleteReferences();
        return rgbColor;
      }

      calcRGBColorCorrect(errorRGBColor){
        var tmpLab = this.calcLABColor();
        var rgbColor = tmpLab.calcRGBColorCorrect(errorRGBColor);
        tmpLab.deleteReferences();
        return rgbColor;
      }

      calcLCHColor(){
        return new classColor_LCH(this.get1Value(), this.get2Value(), this.get3Value());
      }



      checkRGBPossiblity(){
        var tmpLab = this.calcLABColor();
        var rgbPossibility = tmpLab.checkRGBPossiblity();
        tmpLab.deleteReferences();
        return rgbPossibility;
      }

      getLCHString(){
          var tmpString = "lch("+this.lValue+","+this.cValue+","+this.hValue+")";
          return tmpString;
      }

      getLCHString(numDecimalPlaces){
          var tmpString = "lch("+this.lValue.toFixed(numDecimalPlaces)+","+this.cValue.toFixed(numDecimalPlaces)+","+this.hValue.toFixed(numDecimalPlaces)+")";
          return tmpString;
      }


      calcLABColor(){
        var lValue = this.lValue*100;
        var tmpRad = degree360ToRad(this.hValue * 360);

        var aValue = Math.cos(tmpRad) * this.cValue *128;
        var bValue = Math.sin(tmpRad) * this.cValue *128;
        return new classColor_LAB(lValue,aValue,bValue);
      }


      calcLMSColor() {
        var tmpLab = this.calcLABColor();
        var tmpLMS = tmpLab.calcLMSColor();
        tmpLab.deleteReferences();
        return tmpLMS;
      }


      calcHSVColor(){
        var tmpLab = this.calcLABColor();
        var tmpHSV = tmpLab.calcHSVColor();
        tmpLab.deleteReferences();
        return tmpHSV;
      }

      calcDIN99Color() {
        var tmpLAB = this.calcLABColor();
        var tmpDIN99 = tmpLAB.calcDIN99Color();
        tmpLAB.deleteReferences();
        return tmpDIN99;
      }

    };
