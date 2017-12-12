
function drawCanvasBand(canvasObject, rgbColor1, rgbColor2,resolutionX,resolutionY){

            $("#"+canvasObject.id).attr("width", resolutionX+"px");
            $("#"+canvasObject.id).attr("height", resolutionY+"px");

            var canvasContex = canvasObject.getContext("2d");
            var canvasData = canvasContex.getImageData(0, 0, resolutionX, resolutionY);

            switch(colorspaceModus){
                case "rgb":;

                    if(rgbColor1.getRGBString()===rgbColor2.getRGBString()){
                        canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, rgbColor1, resolutionX);
                    }
                    else{
                        canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, rgbColor1, rgbColor2, resolutionX);
                    }

                break;
                case "hsv":

                    var tmpC1HSV = rgbColor1.calcHSVColor();
                    if(rgbColor1.getRGBString()===rgbColor2.getRGBString()){
                        canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, tmpC1HSV, resolutionX);
                    }
                    else{
                        var tmpC2HSV = rgbColor2.calcHSVColor();
                        canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, tmpC1HSV, tmpC2HSV, resolutionX);
                    }

                break;
                case "lab":

                    var tmpC1LAB = rgbColor1.calcLABColor();
                    if(rgbColor1.getRGBString()===rgbColor2.getRGBString()){
                        canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, tmpC1LAB, resolutionX);
                    }
                    else{
                        var tmpC2LAB = rgbColor2.calcLABColor();
                        canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, tmpC1LAB, tmpC2LAB, resolutionX);
                    }

                break;
                case "din99":
                    var tmpC1DIN99 = rgbColor1.calcDIN99Color(kE,kCH);
                    if(rgbColor1.getRGBString()===rgbColor2.getRGBString()){
                        canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, tmpC1DIN99, resolutionX);
                    }
                    else{
                        var tmpC2DIN99 = rgbColor2.calcDIN99Color(kE,kCH);
                        canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, tmpC1DIN99, tmpC2DIN99, resolutionX);
                    }

                break;
                default:
                console.log("Error at the changeColorspace function");
            }

            canvasContex.putImageData(canvasData, 0, 0);
}
