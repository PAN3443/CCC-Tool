///////////////////////////////////////////////////////////////////////////////////////////
/////////// getColorObjects


function getRightColorSpace(wishSpace, color){

    if(color.getColorType()!=wishSpace){
      if(color.getColorType()==="rgb"){
        switch(wishSpace){
           case "hsv":
               return color.calcHSVColor();
           case "lab":
               return color.calcLABColor();
           case "din99":
               return color.calcDIN99Color();
           default:
           console.log("Error at the getRightColorSpace function");
       }
      }
      if(color.getColorType()==="hsv"){
        switch(wishSpace){
           case "rgb":
               return color.calcRGBColor();
           case "lab":
               return color.calcLABColor();
           case "din99":
               return color.calcDIN99Color();
           default:
           console.log("Error at the getRightColorSpace function");
       }
      }
      if(color.getColorType()==="lab"){
        switch(wishSpace){
           case "hsv":
               return color.calcHSVColor();
           case "rgb":
               return color.calcRGBColor();
           case "din99":
               return color.calcDIN99Color();
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
