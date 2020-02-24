////////////////////////////////////////////////
// ------------ Class HSV ---------------//
////////////////////////////////////////////////

class class_Color_HSV extends class_Color_Basis{

    // for future # => private  .... change this. to this.#
    // private fields are not supported at the moment
    /*#hValue = undefined;
    #sValue = undefined;
    #vValue = undefined;
    #colorType = undefined;*/

    constructor(value_1, value_2, value_3) {
      super(value_1, value_2, value_3); // h,s,v
      this.colorType = "hsv";
  }

    getHValue() {
        return this.value_1;
    }

    getSValue() {
        return this.value_2;
    }

    getVValue(){
        return this.value_3;
    }

    setHValue(newVal) {
        this.value_1 = newVal;
    }

    setSValue(newVal) {
        this.value_2 = newVal;
    }

    setVValue(newVal) {
        this.value_3 = newVal;
    }

    /*getHSVString(){
        var tmpString = "hsv("+this.value_1+","+this.value_2+","+this.value_3+")";
        return tmpString;
    }

    getHSVString(numDecimalPlaces){
        var tmpString = "hsv("+this.value_1.toFixed(numDecimalPlaces)+","+this.value_2.toFixed(numDecimalPlaces)+","+this.value_3.toFixed(numDecimalPlaces)+")";
        return tmpString;
    }*/

    calcLABColor() {
      /// from RGB -> XYZ
      var tmpRGB = this.calcRGBColor();
      var tmpLab = tmpRGB.calcLABColor();
      tmpRGB.deleteReferences();
      return tmpLab;
    }

    calcDIN99Color() {
      var tmpLAB = this.calcLABColor();
      var tmpDIN99 = tmpLAB.calcDIN99Color();
      tmpLAB.deleteReferences();
      return tmpDIN99;
    }

    calcLCHColor(){
      var tmpLAB = this.calcLABColor();
      var tmpLch = tmpLAB.calcLCHColor();
      tmpLAB.deleteReferences();
      return tmpLch;
    }

    calcHSVColor() {
      return new class_Color_HSV(this.value_1,this.value_2,this.value_3);
    }

    calcLMSColor() {
      var tmpRGB = this.calcRGBColor();
      var tmpLMS = tmpRGB.calcLMSColor();
      tmpRGB.deleteReferences();
      return tmpLMS;
    }

    calcRGBColor(){

        /*var R,G,B,var_r,var_g,var_b;
            if ( this.value_2 == 0 )
            {
            R = this.value_3;
            G = this.value_3;
            B = this.value_3;
            }
            else
            {
            var var_h = this.value_1 * 6;
            if ( var_h == 6 ) var_h = 0;      //H must be < 1
            var var_i = parseInt( var_h );            //Or ... var_i = floor( var_h )
            var var_1 = this.value_3 * ( 1 - this.value_2 )
            var var_2 = this.value_3 * ( 1 - this.value_2 * ( var_h - var_i ) )
            var var_3 = this.value_3 * ( 1 - this.value_2 * ( 1 - ( var_h - var_i ) ) )

            if      ( var_i == 0 ) { var_r = this.value_3;   var_g = var_3;          var_b = var_1; }
            else if ( var_i == 1 ) { var_r = var_2 ;        var_g = this.value_3;    var_b = var_1; }
            else if ( var_i == 2 ) { var_r = var_1 ;        var_g = this.value_3;    var_b = var_3; }
            else if ( var_i == 3 ) { var_r = var_1 ;        var_g = var_2 ;         var_b = this.value_3;}
            else if ( var_i == 4 ) { var_r = var_3 ;        var_g = var_1 ;         var_b = this.value_3;}
            else                   { var_r = this.value_3;   var_g = var_1;      var_b = var_2;}

            R = var_r;
            G = var_g;
            B = var_b;
        }
        return new class_Color_RGB(R,G,B); */

        var r, g, b;

            var i = Math.floor(this.value_1 * 6);
            var f = this.value_1 * 6 - i;
            var p = this.value_3 * (1 - this.value_2);
            var q = this.value_3 * (1 - f * this.value_2);
            var t = this.value_3 * (1 - (1 - f) * this.value_2);

            switch(i % 6){
                case 0: r = this.value_3, g = t, b = p; break;
                case 1: r = q, g = this.value_3, b = p; break;
                case 2: r = p, g = this.value_3, b = t; break;
                case 3: r = p, g = q, b = this.value_3; break;
                case 4: r = t, g = p, b = this.value_3; break;
                case 5: r = this.value_3, g = p, b = q; break;
            }


        return new class_Color_RGB(r,g,b);
    }

    checkRGBPossiblity(){
      var tmpRGB = this.calcRGBColor();
      var result = tmpRGB.checkRGBPossiblity();
      tmpRGB.deleteReferences();
      tmpRGB=null;
      return result;
    }

    setColorToRGBPossiblity(){
      var tmpRGB = this.calcRGBColor();
      tmpRGB.setColorToRGBPossiblity();
      var tmpColor = tmpRGB.calcHSVColor();
      tmpRGB.deleteReferences();
      tmpRGB=null;
      this.value_1 = tmpColor.get1Value();
      this.value_2 = tmpColor.get2Value();
      this.value_3 = tmpColor.get3Value();
      tmpColor.deleteReferences();
      tmpColor=null;
    }

}
