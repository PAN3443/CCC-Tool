////////////////////////////////////////////////
// ------------ Class LMS ---------------//
////////////////////////////////////////////////
class class_Color_XYZ{


  // for future # => private  .... change this. to this.#
  // private fields are not supported at the moment
  /*  #xValue = undefined;
  #yValue = undefined;
  #zValue = undefined;
  #colorType = undefined;*/

    constructor(x, y, z) {

    this.xValue = x; // long wave red area
    this.yValue = y; // middle wave green area
    this.zValue = z; // short wave blue area

    this.colorType = "xyz";
  }

  deleteReferences(){
    delete this.xValue;
    delete this.yValue;
    delete this.zValue;
    delete this.colorType;
  }

  getColorType(){
    return this.colorType;
  }

  getXValue() {
      return this.xValue;
  }

  getYValue() {
      return this.yValue;
  }

  getZValue(){
      return this.zValue;
  }

  getRGBString() {
    var tmpRGB = this.calcRGBColor();
    var string = tmpRGB.getRGBString();
    tmpRGB.deleteReferences();
    return string;
  }


  calcRGBColor(){
      var error = 100.0; //0.01;

      //    Calc RGB
        var var_X = this.xValue / 100.0;
        var var_Y = this.yValue / 100.0;
        var var_Z = this.zValue / 100.0;

        /*var var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
        var var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415;
        var var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570;*/

        var var_R = var_X * tmXYZ_Selected_Inv[0][0] + var_Y * tmXYZ_Selected_Inv[0][1] + var_Z * tmXYZ_Selected_Inv[0][2];
        var var_G = var_X * tmXYZ_Selected_Inv[1][0] + var_Y * tmXYZ_Selected_Inv[1][1] + var_Z * tmXYZ_Selected_Inv[1][2];
        var var_B = var_X * tmXYZ_Selected_Inv[2][0] + var_Y * tmXYZ_Selected_Inv[2][1] + var_Z * tmXYZ_Selected_Inv[2][2];

        //apply standard gamma correction
        if ( var_R > 0.0031308 ) var_R = 1.055 * Math.pow( var_R , ( 1.0 / 2.4 ) ) - 0.055;
        else                     var_R = 12.92 * var_R;
        if ( var_G > 0.0031308 ) var_G = 1.055 * Math.pow( var_G , ( 1.0 / 2.4 ) ) - 0.055;
        else                     var_G = 12.92 * var_G;
        if ( var_B > 0.0031308 ) var_B = 1.055 * Math.pow( var_B , ( 1.0 / 2.4 ) ) - 0.055;
        else                     var_B = 12.92 * var_B;

        if (var_R>1.0 || var_G>1.0 || var_B>1.0 || var_R<0.0 || var_G<0.0 || var_B<0.0){
            // Wrong RGB -Values

            if(var_R>1.0 && var_R-1.0<error){
                var_R=1.0;
            }
            if(var_G>1.0 && var_G-1.0<error){
                var_G=1.0;
            }
            if(var_B>1.0 && var_B-1.0<error){
                var_B=1.0;
            }
            if(var_R<0.0 && 1.0-var_R<error){
                var_R=0.0;
            }
            if(var_G<0.0 && 1.0-var_G<error){
                var_G=0.0;
            }
            if(var_B<0.0 && 1.0-var_B<error){
                var_B=0.0;
            }
            if (var_R>1.0 || var_G>1.0 || var_B>1.0 || var_R<0.0 || var_G<0.0 || var_B<0.0){
                //var rgbString = "rgb(0,0,0)";
                //return rgbString;
                return new class_Color_RGB(0,0,0);
            }
            else{
                //var rgbString = "rgb("+var_R*255+","+var_G*255+","+var_B*255+")";
                //return rgbString;
                return new class_Color_RGB(var_R,var_G,var_B);
            }
        }
        else{
            // Right RGB -Values
            //var rgbString = "rgba("+var_R*255+","+var_G*255+","+var_B*255+",1.0)";
            //return rgbString;
            return new class_Color_RGB(var_R,var_G,var_B);
        }
  }


  checkRGBPossiblity(){

    var var_X = this.xValue / 100.0;
    var var_Y = this.yValue / 100.0;
    var var_Z = this.zValue / 100.0;

    /*var var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
    var var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415;
    var var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570;*/

    var var_R = var_X * tmXYZ_Selected_Inv[0][0] + var_Y * tmXYZ_Selected_Inv[0][1] + var_Z * tmXYZ_Selected_Inv[0][2];
    var var_G = var_X * tmXYZ_Selected_Inv[1][0] + var_Y * tmXYZ_Selected_Inv[1][1] + var_Z * tmXYZ_Selected_Inv[1][2];
    var var_B = var_X * tmXYZ_Selected_Inv[2][0] + var_Y * tmXYZ_Selected_Inv[2][1] + var_Z * tmXYZ_Selected_Inv[2][2];

    //apply standard gamma correction
    if ( var_R > 0.0031308 ) var_R = 1.055 * Math.pow( var_R , ( 1.0 / 2.4 ) ) - 0.055;
    else                     var_R = 12.92 * var_R;
    if ( var_G > 0.0031308 ) var_G = 1.055 * Math.pow( var_G , ( 1.0 / 2.4 ) ) - 0.055;
    else                     var_G = 12.92 * var_G;
    if ( var_B > 0.0031308 ) var_B = 1.055 * Math.pow( var_B , ( 1.0 / 2.4 ) ) - 0.055;
    else                     var_B = 12.92 * var_B;

    if (var_R>1.0 || var_G>1.0 || var_B>1.0 || var_R<0.0 || var_G<0.0 || var_B<0.0){
        // Wrong RGB -Values
        return false;
    }
    else{
        return true;
    }
  }

  setColorToRGBPossiblity(){
    var tmpRGB = this.calcRGBColor();
    tmpRGB.setColorToRGBPossiblity();
    var tmpColor = tmpRGB.calcXYZColor();
    tmpRGB.deleteReferences();
    tmpRGB=null;
    this.xValue = tmpColor.get1Value();
    this.yValue = tmpColor.get2Value();
    this.zValue = tmpColor.get3Value();
    tmpColor.deleteReferences();
    tmpColor=null;
  }


  calcLABColor(){
    /// from XYZ -> LAB
    var var_X = this.xValue   / cielab_ref_X;
    var var_Y = this.yValue  / cielab_ref_Y;
    var var_Z = this.zValue / cielab_ref_Z;

    if ( var_X  > 0.008856 ) var_X = Math.pow(var_X, ( 1/3 ));
    else var_X  = ( 7.787 * var_X ) + ( 16 / 116 );
    if ( var_Y  > 0.008856 ) var_Y = Math.pow(var_Y, ( 1/3 ));
    else var_Y  = ( 7.787 * var_Y ) + ( 16 / 116 );
    if ( var_Z > 0.008856 ) var_Z = Math.pow(var_Z, ( 1/3 ));
    else var_Z = ( 7.787 * var_Z ) + ( 16 / 116 );

    var var_L = ( 116 * var_Y ) - 16
    var var_A = 500 * ( var_X  - var_Y )
    var var_B = 200 * ( var_Y - var_Z )

    return(new class_Color_LAB(var_L, var_A, var_B));
  }

  calcLMSColor() {

    var var_L = this.xValue * tmLMS_Selected[0][0] + this.yValue * tmLMS_Selected[0][1] + this.zValue * tmLMS_Selected[0][2];
    var var_M = this.xValue * tmLMS_Selected[1][0] + this.yValue * tmLMS_Selected[1][1] + this.zValue * tmLMS_Selected[1][2];
    var var_S = this.xValue * tmLMS_Selected[2][0] + this.yValue * tmLMS_Selected[2][1] + this.zValue * tmLMS_Selected[2][2];

    return (new class_Color_LMS(var_L, var_M, var_S));
  }

};
