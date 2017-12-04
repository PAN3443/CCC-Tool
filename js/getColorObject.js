///////////////////////////////////////////////////////////////////////////////////////////
/////////// getColorObjects

function getHSVColor(){


    switch(activColorIndex){

        case 0:
             switch(colorspaceModus){
                case "rgb":
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
        break;
        case 1:
                switch(colorspaceModus){
                            case "rgb":
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
        break;
        case 2:
                switch(colorspaceModus){
                            case "rgb":
                                var tmpC2RGB = new classColor_RGB((colorVal1_C3/255),(colorVal2_C3/255),(colorVal3_C3/255));
                                return tmpC2RGB.calcHSVColor();
                            case "hsv":
                                return new classColor_HSV(colorVal1_C3,colorVal2_C3,colorVal3_C3);
                            case "lab":
                                var tmpC2LAB = new classColorCIELab(colorVal1_C3,colorVal2_C3,colorVal3_C3);
                                return tmpC2LAB.calcHSVColor();
                            case "din99":
                                var tmpC2DIN99 = new classColorDIN99(colorVal1_C3,colorVal2_C3,colorVal3_C3);
                                return tmpC2DIN99.calcHSVColor();
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        case 3:
                switch(colorspaceModus){
                            case "rgb":
                                var tmpC2RGB = new classColor_RGB((colorVal1_C4/255),(colorVal2_C4/255),(colorVal3_C4/255));
                                return tmpC2RGB.calcHSVColor();
                            case "hsv":
                                return new classColor_HSV(colorVal1_C4,colorVal2_C4,colorVal3_C4);
                            case "lab":
                                var tmpC2LAB = new classColorCIELab(colorVal1_C4,colorVal2_C4,colorVal3_C4);
                                return tmpC2LAB.calcHSVColor();
                            case "din99":
                                var tmpC2DIN99 = new classColorDIN99(colorVal1_C4,colorVal2_C4,colorVal3_C4);
                                return tmpC2DIN99.calcHSVColor();
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        case 4:
                switch(colorspaceModus){
                            case "rgb":
                                var tmpC2RGB = new classColor_RGB((colorVal1_C5/255),(colorVal2_C5/255),(colorVal3_C5/255));
                                return tmpC2RGB.calcHSVColor();
                            case "hsv":
                                return new classColor_HSV(colorVal1_C5,colorVal2_C5,colorVal3_C5);
                            case "lab":
                                var tmpC2LAB = new classColorCIELab(colorVal1_C5,colorVal2_C5,colorVal3_C5);
                                return tmpC2LAB.calcHSVColor();
                            case "din99":
                                var tmpC2DIN99 = new classColorDIN99(colorVal1_C5,colorVal2_C5,colorVal3_C5);
                                return tmpC2DIN99.calcHSVColor();
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        default:
                console.log("Error at the getHSVColor function");

    }

}


function getRGBColor(){

    switch(activColorIndex){

        case 0:
             switch(colorspaceModus){
                case "rgb":
                    return new classColor_RGB((colorVal1_C1/255),(colorVal2_C1/255),(colorVal3_C1/255));
                case "hsv":
                    var tmpHSV = new classColor_HSV(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    return tmpHSV.calcRGBColor();
                case "lab":
                    var tmpC1LAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    return tmpC1LAB.calcRGB();
                case "din99":
                    var tmpC1DIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    return tmpC1DIN99.calcRGBColor();
                default:
                console.log("Error at the getHSVColor function");
            }
        break;
        case 1:
             switch(colorspaceModus){
                case "rgb":;
                    return new classColor_RGB((colorVal1_C2/255),(colorVal2_C2/255),(colorVal3_C2/255));
                case "hsv":
                    var tmpHSV = new classColor_HSV(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    return tmpHSV.calcRGBColor();
                case "lab":
                    var tmpC2LAB = new classColorCIELab(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    return tmpC2LAB.calcRGB();
                case "din99":
                    var tmpC2DIN99 = new classColorDIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    return tmpC2DIN99.calcRGBColor();
                default:
                console.log("Error at the getHSVColor function");
            }
        break;
        case 2:
                switch(colorspaceModus){
                            case "rgb":
                                return new classColor_RGB((colorVal1_C3/255),(colorVal2_C3/255),(colorVal3_C3/255));
                            case "hsv":
                                var tmpHSV = new classColor_HSV(colorVal1_C3,colorVal2_C3,colorVal3_C3);
                                return tmpHSV.calcRGBColor();
                            case "lab":
                                var tmpC2LAB = new classColorCIELab(colorVal1_C3,colorVal2_C3,colorVal3_C3);
                                return tmpC2LAB.calcRGB();
                            case "din99":
                                var tmpC2DIN99 = new classColorDIN99(colorVal1_C3,colorVal2_C3,colorVal3_C3);
                                return tmpC2DIN99.calcRGBColor();
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        case 3:
                switch(colorspaceModus){
                            case "rgb":
                                return new classColor_RGB((colorVal1_C4/255),(colorVal2_C4/255),(colorVal3_C4/255));
                            case "hsv":
                                var tmpHSV = new classColor_HSV(colorVal1_C4,colorVal2_C4,colorVal3_C4);
                                return tmpHSV.calcRGBColor();
                            case "lab":
                                var tmpC2LAB = new classColorCIELab(colorVal1_C4,colorVal2_C4,colorVal3_C4);
                                return tmpC2LAB.calcRGB();
                            case "din99":
                                var tmpC2DIN99 = new classColorDIN99(colorVal1_C4,colorVal2_C4,colorVal3_C4);
                                return tmpC2DIN99.calcRGBColor();
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        case 4:
                switch(colorspaceModus){
                            case "rgb":
                                return new classColor_RGB((colorVal1_C5/255),(colorVal2_C5/255),(colorVal3_C5/255));
                            case "hsv":
                                 var tmpHSV = new classColor_HSV(colorVal1_C5,colorVal2_C5,colorVal3_C5);
                                 return tmpHSV.calcRGBColor();
                            case "lab":
                                var tmpC2LAB = new classColorCIELab(colorVal1_C5,colorVal2_C5,colorVal3_C5);
                                return tmpC2LAB.calcRGB();
                            case "din99":
                                var tmpC2DIN99 = new classColorDIN99(colorVal1_C5,colorVal2_C5,colorVal3_C5);
                                return tmpC2DIN99.calcRGBColor();
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        default:
                console.log("Error at the getHSVColor function");

    }

}

function getLABColor(){


    switch(activColorIndex){

        case 0:
             switch(colorspaceModus){
                case "rgb":
                    var tmpC1RGB = new classColor_RGB((colorVal1_C1/255),(colorVal2_C1/255),(colorVal3_C1/255));
                    return tmpC1RGB.calcCIELabColor();
                case "hsv":
                    var tmpHSV = new classColor_HSV(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    return tmpHSV.calcCIELabColor();
                case "lab":
                    return new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                case "din99":
                    var tmpC2DIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    return tmpC2DIN99.calcLABColor();

                default:
                console.log("Error at the getHSVColor function");
            }
        break;
        case 1:
                switch(colorspaceModus){
                            case "rgb":
                                var tmpC2RGB = new classColor_RGB((colorVal1_C2/255),(colorVal2_C2/255),(colorVal3_C2/255));
                                return tmpC2RGB.calcCIELabColor();
                            case "hsv":
                                 var tmpHSV = new classColor_HSV(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                                 return tmpHSV.calcCIELabColor();
                            case "lab":
                                return new classColorCIELab(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                            case "din99":
                                var tmpC2DIN99 = new classColorDIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                                return tmpC2DIN99.calcLABColor();
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        case 2:
                switch(colorspaceModus){
                            case "rgb":
                                var tmpC2RGB = new classColor_RGB((colorVal1_C3/255),(colorVal2_C3/255),(colorVal3_C3/255));
                                return tmpC2RGB.calcCIELabColor();
                            case "hsv":
                                var tmpHSV = new classColor_HSV(colorVal1_C3,colorVal2_C3,colorVal3_C3);
                                 return tmpHSV.calcCIELabColor();
                            case "lab":
                                return new classColorCIELab(colorVal1_C3,colorVal2_C3,colorVal3_C3);
                            case "din99":
                                var tmpC2DIN99 = new classColorDIN99(colorVal1_C3,colorVal2_C3,colorVal3_C3);
                                return tmpC2DIN99.calcLABColor();
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        case 3:
                switch(colorspaceModus){
                            case "rgb":
                                var tmpC2RGB = new classColor_RGB((colorVal1_C4/255),(colorVal2_C4/255),(colorVal3_C4/255));
                                return tmpC2RGB.calcCIELabColor();
                            case "hsv":
                                var tmpHSV = new classColor_HSV(colorVal1_C4,colorVal2_C4,colorVal3_C4);
                                 return tmpHSV.calcCIELabColor();
                            case "lab":
                                return new classColorCIELab(colorVal1_C4,colorVal2_C4,colorVal3_C4);
                            case "din99":
                                var tmpC2DIN99 = new classColorDIN99(colorVal1_C4,colorVal2_C4,colorVal3_C4);
                                return tmpC2DIN99.calcLABColor();
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        case 4:
                switch(colorspaceModus){
                            case "rgb":
                                var tmpC2RGB = new classColor_RGB((colorVal1_C5/255),(colorVal2_C5/255),(colorVal3_C5/255));
                                return tmpC2RGB.calcCIELabColor();
                            case "hsv":
                                var tmpHSV = new classColor_HSV(colorVal1_C5,colorVal2_C5,colorVal3_C5);
                                 return tmpHSV.calcCIELabColor();
                            case "lab":
                                return  new classColorCIELab(colorVal1_C5,colorVal2_C5,colorVal3_C5);
                            case "din99":
                                var tmpC2DIN99 = new classColorDIN99(colorVal1_C5,colorVal2_C5,colorVal3_C5);
                                return tmpC2DIN99.calcLABColor();
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        default:
                console.log("Error at the getHSVColor function");

    }

}

function getDIN99Color(){


    switch(activColorIndex){

        case 0:
             switch(colorspaceModus){
                case "rgb":
                    var tmpC1RGB = new classColor_RGB((colorVal1_C1/255),(colorVal2_C1/255),(colorVal3_C1/255));
                    return tmpC1RGB.calcDIN99Color(kE,kCH);
                case "hsv":
                    var tmpHSV = new classColor_HSV(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    return tmpHSV.calcDIN99Color(kE,kCH);
                case "lab":
                    var tmpC1LAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    return tmpC1LAB.calcDIN99Color(kE,kCH);
                case "din99":
                    return new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                default:
                console.log("Error at the getHSVColor function");
            }
        break;
        case 1:
                switch(colorspaceModus){
                            case "rgb":
                                var tmpC2RGB = new classColor_RGB((colorVal1_C2/255),(colorVal2_C2/255),(colorVal3_C2/255));
                                return tmpC2RGB.calcDIN99Color(kE,kCH);
                            case "hsv":
                                 var tmpHSV = new classColor_HSV(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                                 return tmpHSV.calcDIN99Color(kE,kCH);
                            case "lab":
                                var tmpC2LAB = new classColorCIELab(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                                return tmpC2LAB.calcDIN99Color(kE,kCH);
                            case "din99":
                                return new classColorDIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        case 2:
                switch(colorspaceModus){
                            case "rgb":
                                var tmpC2RGB = new classColor_RGB((colorVal1_C3/255),(colorVal2_C3/255),(colorVal3_C3/255));
                                return tmpC2RGB.calcDIN99Color(kE,kCH);
                            case "hsv":
                                var tmpHSV = new classColor_HSV(colorVal1_C3,colorVal2_C3,colorVal3_C3);
                                 return tmpHSV.calcDIN99Color(kE,kCH);
                            case "lab":
                                var tmpC2LAB = new classColorCIELab(colorVal1_C3,colorVal2_C3,colorVal3_C3);
                                return tmpC2LAB.calcDIN99Color(kE,kCH);
                            case "din99":
                                return new classColorDIN99(colorVal1_C3,colorVal2_C3,colorVal3_C3);
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        case 3:
                switch(colorspaceModus){
                            case "rgb":
                                var tmpC2RGB = new classColor_RGB((colorVal1_C4/255),(colorVal2_C4/255),(colorVal3_C4/255));
                                return tmpC2RGB.calcDIN99Color(kE,kCH);
                            case "hsv":
                                var tmpHSV = new classColor_HSV(colorVal1_C4,colorVal2_C4,colorVal3_C4);
                                 return tmpHSV.calcDIN99Color(kE,kCH);
                            case "lab":
                                var tmpC2LAB = new classColorCIELab(colorVal1_C4,colorVal2_C4,colorVal3_C4);
                                return tmpC2LAB.calcDIN99Color(kE,kCH);
                            case "din99":
                                return new classColorDIN99(colorVal1_C4,colorVal2_C4,colorVal3_C4);
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        case 4:
                switch(colorspaceModus){
                            case "rgb":
                                var tmpC2RGB = new classColor_RGB((colorVal1_C5/255),(colorVal2_C5/255),(colorVal3_C5/255));
                                return tmpC2RGB.calcDIN99Color(kE,kCH);
                            case "hsv":
                                var tmpHSV = new classColor_HSV(colorVal1_C5,colorVal2_C5,colorVal3_C5);
                                 return tmpHSV.calcDIN99Color(kE,kCH);
                            case "lab":
                                var tmpC2LAB = new classColorCIELab(colorVal1_C5,colorVal2_C5,colorVal3_C5);
                                return tmpC2LAB.calcDIN99Color(kE,kCH);
                            case "din99":
                                return new classColorDIN99(colorVal1_C5,colorVal2_C5,colorVal3_C5);
                            default:
                            console.log("Error at the getHSVColor function");
                }
        break;
        default:
                console.log("Error at the getHSVColor function");

    }

}

function getRightColorSpace(wishSpace, color){

    if(color.getColorType()!=wishSpace){
      if(color.getColorType()==="rgb"){
        switch(wishSpace){
           case "hsv":
               return color.calcHSVColor();
           case "lab":
               return color.calcCIELabColor();
           case "din99":
               return color.calcDIN99Color(kE,kCH);
           default:
           console.log("Error at the getRightColorSpace function");
       }
      }
      if(color.getColorType()==="hsv"){
        switch(wishSpace){
           case "rgb":
               return color.calcRGBColor();
           case "lab":
               return color.calcCIELabColor();
           case "din99":
               return color.calcDIN99Color(kE,kCH);
           default:
           console.log("Error at the getRightColorSpace function");
       }
      }
      if(color.getColorType()==="lab"){
        switch(wishSpace){
           case "hsv":
               return color.calcHSVColor();
           case "rgb":
               return color.calcRGB();
           case "din99":
               return color.calcDIN99Color(kE,kCH);
           default:
           console.log("Error at the getRightColorSpace function");
       }
      }
      if(color.getColorType()==="din99"){
        switch(wishSpace){
           case "hsv":
               return color.calcHSVColor();
           case "lab":
               return color.calcLABColor();
           case "rgb":
               return color.calcRGBColor();
           default:
           console.log("Error at the getRightColorSpace function");
       }
      }

    }
    else{
      return color;
    }
}
