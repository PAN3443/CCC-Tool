////////////////////////////////////////////////
// ------------ Class CIELab ---------------//
////////////////////////////////////////////////

class class_Color_LCH extends class_Color_Basis{

  // for future # => private  .... change this. to this.#
  // private fields are not supported at the moment
  /*#lValue = undefined;
  #cValue = undefined;
  #hValue = undefined;
  #colorType = undefined;*/

      constructor(value_1, value_2, value_3) {
        super(value_1, value_2, value_3); // l,c,h
        this.colorType = "lch";
      }

      getLValue() {
        return this.value_1;
      }

      getCValue() {
        return this.value_2;
      }

      getHValue() {
        return this.value_3;
      }

      setLValue(newLVal) {
        this.value_1 = newLVal;
      }

      setCValue(newAVal) {
        this.value_2 = newAVal;
      }

      setHValue(newBVal) {
        this.value_3 = newBVal;
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
        return new class_Color_LCH(this.get1Value(), this.get2Value(), this.get3Value());
      }

      checkRGBPossiblity(){
        var tmpLab = this.calcLABColor();
        var rgbPossibility = tmpLab.checkRGBPossiblity();
        tmpLab.deleteReferences();
        return rgbPossibility;
      }

      setColorToRGBPossiblity(){
        var tmpRGB = this.calcRGBColor();
        tmpRGB.setColorToRGBPossiblity();
        var tmpColor = tmpRGB.calcLCHColor();
        tmpRGB.deleteReferences();
        tmpRGB=null;
        this.value_1 = tmpColor.get1Value();
        this.value_2 = tmpColor.get2Value();
        this.value_3 = tmpColor.get3Value();
        tmpColor.deleteReferences();
        tmpColor=null;
      }

      getLCHString(){
          var tmpString = "lch("+this.value_1+","+this.value_2+","+this.value_3+")";
          return tmpString;
      }

      getLCHString(numDecimalPlaces){
          var tmpString = "lch("+this.value_1.toFixed(numDecimalPlaces)+","+this.value_2.toFixed(numDecimalPlaces)+","+this.value_3.toFixed(numDecimalPlaces)+")";
          return tmpString;
      }

      calcLABColor(){
        var lValue = this.value_1*100;
        var tmpRad = degree360ToRad(this.value_3 * 360);

        var aValue = Math.cos(tmpRad) * this.value_2 *128;
        var bValue = Math.sin(tmpRad) * this.value_2 *128;
        return new class_Color_LAB(lValue,aValue,bValue);
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
