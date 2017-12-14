
function drawCanvasBand(canvasObject, color1, color2,resolutionX,resolutionY){

            $("#"+canvasObject.id).attr("width", resolutionX+"px");
            $("#"+canvasObject.id).attr("height", resolutionY+"px");

            var canvasContex = canvasObject.getContext("2d");
            var canvasData = canvasContex.getImageData(0, 0, resolutionX, resolutionY);

            /*var rgbColor1;
            var rgbColor2;

            if(color1.getColorType()==="rgb"){
              rgbColor1 = color1;
              rgbColor2 = color2;
            }
            else {
              rgbColor1 = color1.calcRGBColor();
              rgbColor2 = color2.calcRGBColor();
            }*/


            /*if(rgbColor1.getRGBString()===rgbColor2.getRGBString()){
                canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, color1, resolutionX);
            }
            else{
                canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, color1, color2, resolutionX);
            }

            /*if(color1.get1Value()!=color2.get1Value() ||  // i = scaled
               color1.get2Value()!=color2.get2Value() ||
               color1.get3Value()!=color2.get3Value()){
                 canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, color1, color2, resolutionX);
            }
            else {
                canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, color1, resolutionX);
            }*/

            var tmpcolor1, tmpcolor2;
            switch(colorspaceModus){
                case "rgb":;

                    if(color1.getColorType()===colorspaceModus)
                      tmpcolor1=color1;
                    else
                      tmpcolor1=color1.calcRGBColor();

                    if(color2.getColorType()===colorspaceModus)
                      tmpcolor2=color2;
                    else
                      tmpcolor2=color2.calcRGBColor();


                break;
                case "hsv":

                    if(color1.getColorType()===colorspaceModus)
                      tmpcolor1=color1;
                    else
                      tmpcolor1=color1.calcHSVColor();

                    if(color2.getColorType()===colorspaceModus)
                      tmpcolor2=color2;
                    else
                      tmpcolor2=color2.calcHSVColor();

                break;
                case "lab":

                    if(color1.getColorType()===colorspaceModus)
                      tmpcolor1=color1;
                    else
                      tmpcolor1=color1.calcLABColor();

                    if(color2.getColorType()===colorspaceModus)
                      tmpcolor2=color2;
                    else
                      tmpcolor2=color2.calcLABColor();

                break;
                case "din99":
                    if(color1.getColorType()===colorspaceModus)
                      tmpcolor1=color1;
                    else
                      tmpcolor1=color1.calcDIN99Color(kE,kCH);

                    if(color2.getColorType()===colorspaceModus)
                      tmpcolor2=color2;
                    else
                      tmpcolor2=color2.calcDIN99Color(kE,kCH);

                break;
                default:
                console.log("Error at the changeColorspace function");
                return;
            }//*/

            if(tmpcolor1.get1Value()!=tmpcolor2.get1Value() ||  // i = scaled
               tmpcolor1.get2Value()!=tmpcolor2.get2Value() ||
               tmpcolor1.get3Value()!=tmpcolor2.get3Value()){
              canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, tmpcolor1, tmpcolor2, resolutionX);

            }
            else{
              canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, tmpcolor1, resolutionX);
            }

            canvasContex.putImageData(canvasData, 0, 0);
}
