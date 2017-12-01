////////////////////////////////////////////////
// ------------ Class RGB ---------------//
////////////////////////////////////////////////
class classColor_RGB{
    constructor(rValue, gValue, bValue) {
    this.rValue = rValue;
    this.gValue = gValue;
    this.bValue = bValue;
    this.ref_X = 94.811;
    this.ref_Y = 100.000;
    this.ref_Z = 107.304;
    this.colorType = "rgb"
  }

  getColorType(){
    return this.colorType;
  }

  getRValue() {
    return this.rValue;
  }

  getGValue() {
    return this.gValue;
  }

  getBValue() {
    return this.bValue;
  }

  setRValue(r) {
    this.rValue = r;
  }

  setGValue(g) {
    this.gValue = g;
  }

  setBValue(b) {
    this.bValue = b;
  }

  getRGBString(){
      var tmpString = "rgb("+Math.round(this.rValue*255)+","+Math.round(this.gValue*255)+","+Math.round(this.bValue*255)+")"; // Math.round because Chrome needs integers
      return tmpString;
  }

  getRGBStringAplha(alpha){
      var tmpString = "rgba("+Math.round(this.rValue*255)+","+Math.round(this.gValue*255)+","+Math.round(this.bValue*255)+","+alpha+")";
      return tmpString;
  }

  calcCIELabColor(){
    /// from RGB -> XYZ

    var var_R = this.rValue;
    var var_G = this.gValue;
    var var_B = this.bValue;

    if ( var_R > 0.04045 ) var_R = Math.pow((( var_R + 0.055 ) / 1.055 ), 2.4);
    else                   var_R = var_R / 12.92;
    if ( var_G > 0.04045 ) var_G = Math.pow(( ( var_G + 0.055 ) / 1.055 ), 2.4);
    else                   var_G = var_G / 12.92;
    if ( var_B > 0.04045 ) var_B = Math.pow(( ( var_B + 0.055 ) / 1.055 ),2.4);
    else                   var_B = var_B / 12.92;

    var_R = var_R * 100;
    var_G = var_G * 100;
    var_B = var_B * 100;

    var var_X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805;
    var var_Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722;
    var var_Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505;

    /// from XYZ -> LAB
    var_X = var_X / this.ref_X;
    var_Y = var_Y / this.ref_Y;
    var_Z = var_Z / this.ref_Z;

    if ( var_X > 0.008856 ) var_X = Math.pow(var_X , ( 1/3 ));
    else                    var_X = ( 7.787 * var_X ) + ( 16 / 116 );
    if ( var_Y > 0.008856 ) var_Y = Math.pow(var_Y , ( 1/3 ));
    else                    var_Y = ( 7.787 * var_Y ) + ( 16 / 116 );
    if ( var_Z > 0.008856 ) var_Z = Math.pow(var_Z , ( 1/3 ));
    else                    var_Z = ( 7.787 * var_Z ) + ( 16 / 116 );

    var var_L = ( 116 * var_Y ) - 16
    var var_A = 500 * ( var_X - var_Y )
    var var_B = 200 * ( var_Y - var_Z )

    return(new classColorCIELab(var_L, var_A, var_B));
  }

  calcHSVColor(){

        //R, G and B input range = 0 ÷ 255
        //H, S and V output range = 0 ÷ 1.0

        /*var var_R = this.rValue;
        var var_G = this.gValue;
        var var_B = this.bValue;

        var var_Min = Math.min( var_R, var_G, var_B );  //Min. value of RGB
        var var_Max = Math.max( var_R, var_G, var_B );    //Max. value of RGB
        var del_Max = var_Max - var_Min;             //Delta RGB value

        var H = 0;
        var S = 0;
        var V = var_Max;

        if ( del_Max != 0 )                     //If not it is a gray color -> no chroma
        {
        S = del_Max / var_Max;

            var del_R = ( ( ( var_Max - var_R ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
            var del_G = ( ( ( var_Max - var_G ) / 6 ) + ( del_Max / 2 ) ) / del_Max;
            var del_B = ( ( ( var_Max - var_B ) / 6 ) + ( del_Max / 2 ) ) / del_Max;

            if      ( var_R == var_Max ) H = del_B - del_G;
            else if ( var_G == var_Max ) H = ( 1 / 3 ) + del_R - del_B;
            else if ( var_B == var_Max ) H = ( 2 / 3 ) + del_G - del_R;

            if ( H < 0 ) H += 1;
            if ( H > 1 ) H -= 1;
        }

        return(new classColor_HSV(H, S, V));*/

        var max = Math.max(this.rValue, this.gValue, this.bValue), min = Math.min(this.rValue, this.gValue, this.bValue);
        var h, s, v = max;

        var d = max - min;
        s = max == 0 ? 0 : d / max;

        if(max == min){
            h = 0; // achromatic
        }else{
            switch(max){
                case this.rValue: h = (this.gValue - this.bValue) / d + (this.gValue < this.bValue ? 6 : 0); break;
                case this.gValue: h = (this.bValue - this.rValue) / d + 2; break;
                case this.bValue: h = (this.rValue - this.gValue) / d + 4; break;
            }
            h /= 6;
        }
        return(new classColor_HSV(h, s, v));

  }

  calcDIN99Color(kE,kCH){
    var tmpLAB = this.calcCIELabColor();
    return tmpLAB.calcDIN99Color(kE,kCH);
  }

  setColorFromHEX(hex){
     this.rValue = parseInt(hex.slice(1, 3), 16)/255;
     this.gValue = parseInt(hex.slice(3, 5), 16)/255;
     this.bValue = parseInt(hex.slice(5, 7), 16)/255;
  }

  valueToHex(val) {
    var hex = Number(val).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
  }

  getHexString() {
    var rhex = this.valueToHex(parseInt(this.rValue*255));
    var ghex = this.valueToHex(parseInt(this.gValue*255));
    var bhex = this.valueToHex(parseInt(this.bValue*255));
    return "#" + rhex + ghex + bhex;
  }
};
