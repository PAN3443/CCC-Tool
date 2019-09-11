////////////////////////////////////////////////
// ------------ Class HSV ---------------//
////////////////////////////////////////////////

class classColor_HSV{
    constructor(hValue, sValue, vValue) {
    this.hValue = hValue;
    this.sValue = sValue;
    this.vValue = vValue;
    this.colorType = "hsv";
  }

  deleteReferences(){
    delete this.hValue;
    delete this.sValue;
    delete this.vValue;
    delete this.colorType;
  }

  getColorType(){
    return this.colorType;
  }

    getHValue() {
        return this.hValue;
    }

    getSValue() {
        return this.sValue;
    }

    getVValue(){
        return this.vValue;
    }

    get1Value() {
        return this.hValue;
    }

    get2Value() {
        return this.sValue;
    }

    get3Value(){
        return this.vValue;
    }

    set1Value(newVal) {
        this.hValue=newVal;
    }

    set2Value(newVal) {
        this.sValue=newVal;
    }

    set3Value(newVal){
        this.vValue=newVal;
    }

    setHValue(newVal) {
        this.hValue = newVal;
    }

    setSValue(newVal) {
        this.sValue = newVal;
    }

    setVValue(newVal) {
        this.vValue = newVal;
    }

    equalTo(color){

      switch (color.getColorType()) {
        case "hsv":
            if(color.get1Value()==this.get1Value()&&
               color.get2Value()==this.get2Value()&&
               color.get3Value()==this.get3Value())
               return true;
            else
              return false;
        default:
          var tmpColor = color.calcHSVColor();
          if(color.get1Value()==this.get1Value()&&
             color.get2Value()==this.get2Value()&&
             color.get3Value()==this.get3Value())
             return true;
          else
            return false;

      }

    }

    getRGBString() {
      var tmpRGB = this.calcRGBColor();
      var string = tmpRGB.getRGBString();
      tmpRGB.deleteReferences();
      return string;
    }

    getInColorFormat(format){

      switch (format) {
        case "rgb":
            return this.calcRGBColor();
        case "hsv":
            return new classColor_HSV(this.get1Value(),this.get2Value(),this.get3Value());
        case "lab":
            return this.calcLABColor();
        case "din99":
            return this.calcDIN99Color();
        case "lch":
            return this.calcLCHColor();
        default:
          console.log("Error in function getColorFormat of HSV class");
      }

    }

    getHSVString(){
        var tmpString = "hsv("+this.hValue+","+this.sValue+","+this.vValue+")";
        return tmpString;
    }

    getHSVString(numDecimalPlaces){
        var tmpString = "hsv("+this.hValue.toFixed(numDecimalPlaces)+","+this.sValue.toFixed(numDecimalPlaces)+","+this.vValue.toFixed(numDecimalPlaces)+")";
        return tmpString;
    }


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
      return new classColor_HSV(this.hValue,this.sValue,this.vValue);
    }

    calcRGBColor(){

        /*var R,G,B,var_r,var_g,var_b;
            if ( this.sValue == 0 )
            {
            R = this.vValue;
            G = this.vValue;
            B = this.vValue;
            }
            else
            {
            var var_h = this.hValue * 6;
            if ( var_h == 6 ) var_h = 0;      //H must be < 1
            var var_i = parseInt( var_h );            //Or ... var_i = floor( var_h )
            var var_1 = this.vValue * ( 1 - this.sValue )
            var var_2 = this.vValue * ( 1 - this.sValue * ( var_h - var_i ) )
            var var_3 = this.vValue * ( 1 - this.sValue * ( 1 - ( var_h - var_i ) ) )

            if      ( var_i == 0 ) { var_r = this.vValue;   var_g = var_3;          var_b = var_1; }
            else if ( var_i == 1 ) { var_r = var_2 ;        var_g = this.vValue;    var_b = var_1; }
            else if ( var_i == 2 ) { var_r = var_1 ;        var_g = this.vValue;    var_b = var_3; }
            else if ( var_i == 3 ) { var_r = var_1 ;        var_g = var_2 ;         var_b = this.vValue;}
            else if ( var_i == 4 ) { var_r = var_3 ;        var_g = var_1 ;         var_b = this.vValue;}
            else                   { var_r = this.vValue;   var_g = var_1;      var_b = var_2;}

            R = var_r;
            G = var_g;
            B = var_b;
        }
        return new classColor_RGB(R,G,B); */

        var r, g, b;

            var i = Math.floor(this.hValue * 6);
            var f = this.hValue * 6 - i;
            var p = this.vValue * (1 - this.sValue);
            var q = this.vValue * (1 - f * this.sValue);
            var t = this.vValue * (1 - (1 - f) * this.sValue);

            switch(i % 6){
                case 0: r = this.vValue, g = t, b = p; break;
                case 1: r = q, g = this.vValue, b = p; break;
                case 2: r = p, g = this.vValue, b = t; break;
                case 3: r = p, g = q, b = this.vValue; break;
                case 4: r = t, g = p, b = this.vValue; break;
                case 5: r = this.vValue, g = p, b = q; break;
            }


        return new classColor_RGB(r,g,b);
    }

    checkRGBPossiblity(){

      var tmpRGB = this.calcRGBColor();

      if(tmpRGB.get1Value()>1.0 || tmpRGB.get1Value()<0.0)
        return false;

        if(tmpRGB.get1Value()>1.0 || tmpRGB.get1Value()<0.0)
          return false;

          if(tmpRGB.get1Value()>1.0 || tmpRGB.get1Value()<0.0)
            return false;


      return true;
    }

}
