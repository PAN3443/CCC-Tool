////////////////////////////////////////////////
// ------------ Class CIELab ---------------//
////////////////////////////////////////////////

class class_Color_LAB extends class_Color_Basis{

  // for future # => private  .... change this. to this.#
  // private fields are not supported at the moment
  /*#lValue = undefined;
  #aValue = undefined;
  #bValue = undefined;
  #colorType = undefined;*/

      constructor(value_1, value_2, value_3) {
        super(value_1, value_2, value_3); // l,a,b
        this.colorType = "lab";
      }

      getLValue() {
        return this.value_1;
      }

      getAValue() {
        return this.value_2;
      }

      getBValue() {
        return this.value_3;
      }

      setLValue(newLVal) {
        this.value_1 = newLVal;
      }

      setAValue(newAVal) {
        this.value_2 = newAVal;
      }

      setBValue(newBVal) {
        this.value_3 = newBVal;
      }

      getLABString(){
          var tmpString = "lab("+this.value_1+","+this.value_2+","+this.value_3+")";
          return tmpString;
      }

      getLABString(numDecimalPlaces){
          var tmpString = "lab("+this.value_1.toFixed(numDecimalPlaces)+","+this.value_2.toFixed(numDecimalPlaces)+","+this.value_3.toFixed(numDecimalPlaces)+")";
          return tmpString;
      }

      calcLABColor() {
        return new class_Color_LAB(this.get1Value(), this.get2Value(), this.get3Value());
      }

      calcLMSColor() {
        var tmpXYZ = this.calcXYZColor();
        var lmsColor = tmpXYZ.calcLMSColor();
        tmpXYZ.deleteReferences();
        return lmsColor;
      }

      calcXYZColor(){
        //  Calc XYZ
        var var_Y = (this.value_1 + 16.0)/116.0;
        var var_X = this.value_2/500.0 + var_Y;
        var var_Z = var_Y - this.value_3/200.0;

        if ( Math.pow (var_Y, 3.0) > 0.008856 ){
            var_Y = Math.pow (var_Y, 3.0);
        }
        else {
            var_Y = ( var_Y - 16.0 / 116.0 ) / 7.787;
        }

        if ( Math.pow (var_X, 3.0)  > 0.008856 ){
            var_X = Math.pow (var_X, 3.0);
        }
        else {
            var_X = ( var_X - 16.0 / 116.0 ) / 7.787;
        }

        if ( Math.pow (var_Z, 3.0)  > 0.008856 ){
            var_Z = Math.pow (var_Z, 3.0);
        }
        else {
            var_Z = ( var_Z - 16.0 / 116.0 ) / 7.787;
        }

        var_X = (var_X * cielab_ref_X);
        var_Y = (var_Y * cielab_ref_Y);
        var_Z = (var_Z * cielab_ref_Z);

        return(new class_Color_XYZ(var_X, var_Y, var_Z));
      }

      calcRGBColor(){
        var tmpXYZ = this.calcXYZColor();
        var rgbColor = tmpXYZ.calcRGBColor();
        tmpXYZ.deleteReferences();
        return rgbColor;
      }

      checkRGBPossiblity(){
        var colorXYZ = this.calcXYZColor();
        var result = colorXYZ.checkRGBPossiblity();
        colorXYZ.deleteReferences();
        colorXYZ=null;
        return result;
      }

      setColorToRGBPossiblity(){
        var tmpRGB = this.calcRGBColor();
        tmpRGB.setColorToRGBPossiblity();
        var tmpColor = tmpRGB.calcLABColor();
        tmpRGB.deleteReferences();
        tmpRGB=null;
        this.value_1 = tmpColor.get1Value();
        this.value_2 = tmpColor.get2Value();
        this.value_3 = tmpColor.get3Value();
        tmpColor.deleteReferences();
        tmpColor=null;
      }

      calcRGBColorCorrect(errorRGBColor){
            var error = 100.0; //0.01;


            var colorXYZ = this.calcXYZColor()

            //    Calc RGB
                var var_X = colorXYZ.getXValue() / 100.0;
                var var_Y = colorXYZ.getYValue() / 100.0;
                var var_Z = colorXYZ.getZValue() / 100.0;

                colorXYZ.deleteReferences();
                colorXYZ=null;

                /*var var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
                var var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415;
                var var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570;*/

                var var_R = var_X * tmXYZ_Selected_Inv[0][0] + var_Y * tmXYZ_Selected_Inv[0][1] + var_Z * tmXYZ_Selected_Inv[0][2];
                var var_G = var_X * tmXYZ_Selected_Inv[1][0] + var_Y * tmXYZ_Selected_Inv[1][1] + var_Z * tmXYZ_Selected_Inv[1][2];
                var var_B = var_X * tmXYZ_Selected_Inv[2][0] + var_Y * tmXYZ_Selected_Inv[2][1] + var_Z * tmXYZ_Selected_Inv[2][2];

                if ( var_R > 0.0031308 ) var_R = 1.055 * Math.pow( var_R , ( 1.0 / 2.4 ) ) - 0.055;
                else                     var_R = 12.92 * var_R;
                if ( var_G > 0.0031308 ) var_G = 1.055 * Math.pow( var_G , ( 1.0 / 2.4 ) ) - 0.055;
                else                     var_G = 12.92 * var_G;
                if ( var_B > 0.0031308 ) var_B = 1.055 * Math.pow( var_B , ( 1.0 / 2.4 ) ) - 0.055;
                else                     var_B = 12.92 * var_B;

                if (var_R>1.0 || var_G>1.0 || var_B>1.0 || var_R<0.0 || var_G<0.0 || var_B<0.0){
                    // Wrong RGB -Values
                    return errorRGBColor;

                }
                else{
                    // Right RGB -Values
                    //var rgbString = "rgba("+var_R*255+","+var_G*255+","+var_B*255+",1.0)";
                    //return rgbString;
                    return new class_Color_RGB(var_R,var_G,var_B);
                }



      }

      calcHSVColor(){
        var tmpRGBColor = this.calcRGBColor();
        var hsvColor = tmpRGBColor.calcHSVColor();
        tmpRGBColor.deleteReferences();
        return hsvColor;
      }

      calcLCHColor(){
        var valueL = this.value_1/100;
        var normAVal = this.value_2/128.0;
        var normBVal = this.value_3/128.0;
        var valueC = Math.sqrt(Math.pow(normAVal,2) + Math.pow(normBVal,2));

        var valueH = atan2_360Degree(normAVal,normBVal)/360; // values 0-1

        return new class_Color_LCH(valueL, valueC, valueH);
      }

      calcDIN99Color(){

        var valueL99, valueA99, valueB99;
        var lScale = 100/Math.log(139/100.0); // = 303.67
        valueL99 = lScale/din99_kE*Math.log(1+.0039*this.value_1);

        if (this.value_2==0.0 && this.value_3==0.0) {
            valueA99 = 0.0;
            valueB99 = 0.0;
        } else {
            var angle = 2*Math.PI/360*26;
            var e = this.value_2*Math.cos(angle) + this.value_3*Math.sin(angle);
            var f = 0.83*(this.value_3*Math.cos(angle) - this.value_2*Math.sin(angle));
            var G = Math.sqrt(Math.pow(e,2)+Math.pow(f,2));
            var C99 = Math.log(1+0.075*G)/(0.0435*din99_kCH*din99_kE);
            var hef = Math.atan2(f,e);
            var h99 = hef+angle;
            valueA99 = C99 * Math.cos(h99);
            valueB99 = C99 * Math.sin(h99);
        }

        return new class_Color_DIN99(valueL99, valueA99, valueB99);
      }

    };