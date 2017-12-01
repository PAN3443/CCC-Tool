////////////////////////////////////////////////
// ------------ Class CIELab ---------------//
////////////////////////////////////////////////

class classColorCIELab{

      constructor(lValue, aValue, bValue) {
        this.lValue = lValue;
        this.aValue = aValue;
        this.bValue = bValue;
        this.ref_X = 94.811;
        this.ref_Y = 100.000;
        this.ref_Z = 107.304;
        this.colorType = "lab"
      }

      getColorType(){
        return this.colorType;
      }
      getLValue() {
        return this.lValue;
      }

      getAValue() {
        return this.aValue;
      }

      getBValue() {
        return this.bValue;
      }

      setLValue(newLVal) {
        this.lValue = newLVal;
      }

      setAValue(newAVal) {
        this.aValue = newAVal;
      }

      setBValue(newBVal) {
        this.bValue = newBVal;
      }

      calcRGB(){
            var error = 100.0; //0.01;


            //  Calc XYZ
            var var_Y = (this.lValue + 16.0)/116.0;
            var var_X = this.aValue/500.0 + var_Y;
            var var_Z = var_Y - this.bValue/200.0;

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

            var_X = (var_X * this.ref_X);
            var_Y = (var_Y * this.ref_Y);
            var_Z = (var_Z * this.ref_Z);

            //    Calc RGB
                var var_X = var_X / 100.0;
                var var_Y = var_Y / 100.0;
                var var_Z = var_Z / 100.0;

                var var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
                var var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415;
                var var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570;

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
                    //alert(var_R+" "+var_G+" "+var_B);
                    if (var_R>1.0 || var_G>1.0 || var_B>1.0 || var_R<0.0 || var_G<0.0 || var_B<0.0){
                        //var rgbString = "rgb(0,0,0)";
                        //return rgbString;
                        return new classColor_RGB(0,0,0);
                    }
                    else{
                        //var rgbString = "rgb("+var_R*255+","+var_G*255+","+var_B*255+")";
                        //return rgbString;
                        return new classColor_RGB(var_R,var_G,var_B);
                    }
                }
                else{
                    // Right RGB -Values
                    //var rgbString = "rgba("+var_R*255+","+var_G*255+","+var_B*255+",1.0)";
                    //return rgbString;
                    return new classColor_RGB(var_R,var_G,var_B);
                }



      }

      calcHSVColor(){
        var tmpRGBColor = this.calcRGB();
        return tmpRGBColor.calcHSVColor();
      }

      calcDIN99Color(kE,kCH){
        var valueL99, valueA99, valueB99;
        var lScale = 100/Math.log(139/100.0); // = 303.67
        valueL99 = lScale/kE*Math.log(1+.0039*this.lValue);

        if (this.aValue==0.0 && this.bValue==0.0) {
            valueA99 = 0.0;
            valueB99 = 0.0;
        } else {
            var angle = 2*Math.PI/360*26;
            var e = this.aValue*Math.cos(angle) + this.bValue*Math.sin(angle);
            var f = 0.83*(this.bValue*Math.cos(angle) - this.aValue*Math.sin(angle));
            var G = Math.sqrt(Math.pow(e,2)+Math.pow(f,2));
            var C99 = Math.log(1+0.075*G)/(0.0435*kCH*kE);
            var hef = Math.atan2(f,e);
            var h99 = hef+angle;
            valueA99 = C99 * Math.cos(h99);
            valueB99 = C99 * Math.sin(h99);
        }
        return new classColorDIN99(valueL99, valueA99, valueB99);
      }

    };
