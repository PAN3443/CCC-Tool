////////////////////////////////////////////////
// ------------ Class DIN99 ---------------//
////////////////////////////////////////////////

// DIN99 Version o

class class_Color_DIN99 extends class_Color_Basis{

      // for future # => private  .... change this. to this.#
      // private fields are not supported at the moment
      /*#l99Value = undefined;
      #a99Value = undefined;
      #b99Value = undefined;
      #colorType = undefined;*/

      constructor(value_1, value_2, value_3) {
        super(value_1, value_2, value_3); // l99, a99, b99
        this.colorType = "din99";
      }

      getL99Value() {
        return this.value_1;
      }

      getA99Value() {
        return this.value_2;
      }

      getB99Value() {
        return this.value_3;
      }

      setL99Value(newLVal) {
        this.value_1 = newLVal;
      }

      setA99Value(newAVal) {
        this.value_2 = newAVal;
      }

      setB99Value(newBVal) {
        this.value_3 = newBVal;
      }

      calcDIN99Color() {
        return new class_Color_DIN99(this.get1Value(), this.get2Value(), this.get3Value());
      }

      /*getDIN99String(){
          var tmpString = "din99("+this.value_1+","+this.value_2+","+this.value_3+")";
          return tmpString;
      }

      getDIN99String(numDecimalPlaces){
          var tmpString = "din99("+this.value_1.toFixed(numDecimalPlaces)+","+this.value_2.toFixed(numDecimalPlaces)+","+this.value_3.toFixed(numDecimalPlaces)+")";
          return tmpString;
      }*/

      calcLMSColor() {
        var tmpLab = this.calcLABColor();
        var tmpLMS = tmpLab.calcLMSColor();
        tmpLab.deleteReferences();
        return tmpLMS;
      }

      calcRGBColor(){
        var tmpLAB = this.calcLABColor();
        return tmpLAB.calcRGBColor();
      }

      calcRGBColorCorrect(errorRGBColor){
        var tmpLAB = this.calcLABColor();
        return tmpLAB.calcRGBColorCorrect(errorRGBColor);
      }

      checkRGBPossiblity(){
        var tmpLAB = this.calcLABColor();
        var result = tmpLAB.checkRGBPossiblity();
        tmpLAB.deleteReferences();
        return result;
      }

      setColorToRGBPossiblity(){
        var tmpRGB = this.calcRGBColor();
        tmpRGB.setColorToRGBPossiblity();
        var tmpColor = tmpRGB.calcDIN99Color();
        tmpRGB.deleteReferences();
        tmpRGB=null;
        this.value_1 = tmpColor.get1Value();
        this.value_2 = tmpColor.get2Value();
        this.value_3 = tmpColor.get3Value();
        tmpColor.deleteReferences();
        tmpColor=null;
      }

      calcHSVColor(){
          var tmpRGB = this.calcRGBColor();
          var tmpHSV = tmpRGB.calcHSVColor();
          tmpRGB.deleteReferences();
          return tmpRGB;
      }

      calcLCHColor(){
        var tmpLAB = this.calcLABColor();
        var tmpLch = tmpLAB.calcLCHColor();
        tmpLAB.deleteReferences();
        return tmpLch;
      }

      calcLABColor(){
        var angle =  2*Math.PI/360*26;
        var lScale = 100/Math.log(139/100.0); // = 303.67
        var value_L =  (Math.exp(this.value_1*din99_kE/lScale)-1.0)/0.0039;
        var hef = Math.atan2(this.value_3,this.value_2);
        var h99 = hef-angle;
        var C99 = Math.sqrt(Math.pow(this.value_2,2)+Math.pow(this.value_3,2));
        var G = (Math.exp(0.0435*C99*din99_kCH*din99_kE)-1)/0.075;
        var e = G*Math.cos(h99);
        var f = G*Math.sin(h99);

        var value_A = e*Math.cos(angle)-(f/0.83)*Math.sin(angle);
        var value_B = e*Math.sin(angle)+(f/0.83)*Math.cos(angle);

        return new class_Color_LAB(value_L,value_A,value_B);
      }

    };
