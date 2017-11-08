function getHSVColor(c1bool){


    if(c1bool){

        switch(colorspaceModus){
                case "rgb":;
                    var tmpC1RGB = new classColor_RGB((colorVal1_C1/255),(colorVal2_C1/255),(colorVal3_C1/255));
                    return tmpC1RGB.calcHSVColor();
                case "hsv": 
                    return new classColor_HSV(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                case "lab":  
                    var tmpC1LAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    return tmpC1LAB.calcHSVColor();
                case "din99":
                    var tmpC1DIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    return tmpC1DIN99.calcHSVColor();

                default:
                console.log("Error at the getHSVColor function");
      }

    }
    else{

        switch(colorspaceModus){
                case "rgb":;
                    var tmpC2RGB = new classColor_RGB((colorVal1_C2/255),(colorVal2_C2/255),(colorVal3_C2/255));
                    return tmpC2RGB.calcHSVColor();
                case "hsv": 
                    return new classColor_HSV(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                case "lab":  
                    var tmpC2LAB = new classColorCIELab(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    return tmpC2LAB.calcHSVColor();
                case "din99":
                    var tmpC2DIN99 = new classColorDIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    return tmpC2DIN99.calcHSVColor();
                default:
                console.log("Error at the getHSVColor function");
      }

    }
      
}