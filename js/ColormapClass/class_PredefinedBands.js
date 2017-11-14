////////////////////////////////////////////////
// ------------ Class classPredefinedBand ---------------//
////////////////////////////////////////////////
class class_PredefinedBand{
    constructor(rgbColor) {
    console.log(234);
    this.colorarray = [];
    console.log(234);
    this.colorarray.push(rgbColor);
  }

  pushColor(rgbColor){
      this.colorarray.push(rgbColor);
  }

  getRGBString(index){
      var tmpString = "rgb("+Math.round(this.colorarray[index].getRValue()*255)+","+Math.round(this.colorarray[index].getGValue()*255)+","+Math.round(this.colorarray[index].getBValue()*255)+")"; // Math.round because Chrome needs integers
      return tmpString;
  }

  getRGBStringAplha(index, alpha){
      var tmpString = "rgba("+Math.round(this.colorarray[index].getRValue()*255)+","+Math.round(this.colorarray[index].getGValue()*255)+","+Math.round(this.colorarray[index].getBValue()*255)+","+alpha+")";
      return tmpString;
  }

  getRGBColor(index){
    return this.colorarray[index];
  }

  calcCIELabColor(index){
    /// from RGB -> XYZ

    var var_R = this.colorarray[index].getRValue();
    var var_G = this.colorarray[index].getGValue();
    var var_B = this.colorarray[index].getBValue();

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

  calcHSVColor(index){

        //R, G and B input range = 0 ÷ 255
        //H, S and V output range = 0 ÷ 1.0

        var var_R = this.colorarray[index].getRValue();
        var var_G = this.colorarray[index].getGValue();
        var var_B = this.colorarray[index].getBValue();

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

        return(new classColor_HSV(H, S, V));

  }

  calcDIN99Color(index, kE,kCH){
    var tmpLAB = this.colorarray[index].calcCIELabColor();
    return tmpLAB.calcDIN99Color(kE,kCH);
  }

 
};


