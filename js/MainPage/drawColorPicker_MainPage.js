function drawHSBackground(){

    var canvasColorspace = document.getElementById("id_canvasPickerHS");
    $("#id_canvasPickerHS").attr("width", hs_resolution_X+"px");
    $("#id_canvasPickerHS").attr("height", hs_resolution_Y+"px");
    var canvasColorspaceWidth = canvasColorspace.width;
    var canvasColorspaceHeight = canvasColorspace.height;
    //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
    var colorspaceContex = canvasColorspace.getContext("2d");
    var  canvasColorspaceData = colorspaceContex.getImageData(0, 0, canvasColorspaceWidth, canvasColorspaceHeight);
  
    // draw colorspace
    for(var x=0; x<canvasColorspaceWidth;x++){

          var hVal = x/canvasColorspaceWidth; 


          for(var y=0; y<canvasColorspaceHeight;y++){

                // calc hsv color
                var sVal = 1-y/canvasColorspaceHeight;
                var vVal = 1;          
                var colorHSV = new classColor_HSV(hVal,sVal,vVal);       
                var colorRGB = colorHSV.calcRGBColor();
                var index = (x + y * canvasColorspaceWidth) * 4;

                canvasColorspaceData.data[index + 0] = Math.round(colorRGB.getRValue()*255); // r
                canvasColorspaceData.data[index + 1] = Math.round(colorRGB.getGValue()*255); // g
                canvasColorspaceData.data[index + 2] = Math.round(colorRGB.getBValue()*255); // b
                canvasColorspaceData.data[index + 3] = 255; //a

          }
    }

    colorspaceContex.putImageData(canvasColorspaceData, 0, 0);

}

function drawColorCircles(){
    
    var canvasColorspace = document.getElementById("id_workcanvasPicker");
    var rectPickerCanvas = document.getElementById("id_canvasPickerHS").getBoundingClientRect();
    canvasColorspace.style.display = "initial";
    canvasColorspace.style.position = "absolute";
    canvasColorspace.style.width = rectPickerCanvas.width+"px";
    canvasColorspace.style.height = rectPickerCanvas.height+"px";
    canvasColorspace.style.top = rectPickerCanvas.top+"px";
    canvasColorspace.style.left = rectPickerCanvas.left+"px";

    $("#id_workcanvasPicker").attr("width", hs_resolution_X+"px");
    $("#id_workcanvasPicker").attr("height", hs_resolution_Y+"px");
    var canvasColorspaceWidth = canvasColorspace.width;
    var canvasColorspaceHeight = canvasColorspace.height;
    //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
    var colorspaceContex = canvasColorspace.getContext("2d");

    switch(colorspaceModus){
        case "rgb": 

                    var tmpC1RGB = new classColor_RGB((colorVal1_C1/255),(colorVal2_C1/255),(colorVal3_C1/255));
                    var tmpC2RGB = new classColor_RGB((colorVal1_C2/255),(colorVal2_C2/255),(colorVal3_C2/255));

                    var tmpC1HSV = tmpC1RGB.calcHSVColor();
                    var tmpC2HSV = tmpC2RGB.calcHSVColor();

                    // FOR C1
                    var xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    var yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    if(aboveC1Circle==true)
                        colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                    else
                        colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);

                    colorspaceContex.fillStyle = tmpC1RGB.getRGBStringAplha(1.0);
                    colorspaceContex.fill();
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    if(grapedC1Circle==true)
                        colorspaceContex.strokeStyle =  activeCircleColor;
                    else
                        colorspaceContex.strokeStyle = 'rgb(0,0,0)';

                    colorspaceContex.stroke();

                if(document.getElementById("radiobutton_ScaledBand").checked == true){

                    // FOR C2
                    xPos = tmpC2HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC2HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    if(aboveC2Circle==true)
                        colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                    else
                        colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);

                    colorspaceContex.fillStyle = tmpC2RGB.getRGBStringAplha(1.0);
                    colorspaceContex.fill();
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    if(grapedC2Circle==true)
                        colorspaceContex.strokeStyle =  activeCircleColor;
                    else
                        colorspaceContex.strokeStyle = 'rgb(0,0,0)';

                    colorspaceContex.stroke();

        
                }


        break;
        case "hsv": 

                    var tmpC1HSV = new classColor_HSV(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2HSV = new classColor_HSV(colorVal1_C2,colorVal2_C2,colorVal3_C2);

                    // FOR C1
                    var xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    var yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    if(aboveC1Circle==true)
                        colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                    else
                        colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);

                    colorspaceContex.fillStyle = tmpC1HSV.calcRGBColor().getRGBStringAplha(1.0);
                    colorspaceContex.fill();
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    if(grapedC1Circle==true)
                        colorspaceContex.strokeStyle =  activeCircleColor;
                    else
                        colorspaceContex.strokeStyle = 'rgb(0,0,0)';

                    colorspaceContex.stroke();

                if(document.getElementById("radiobutton_ScaledBand").checked == true){

               
                    // FOR C2
                    xPos = tmpC2HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC2HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    if(aboveC2Circle==true)
                        colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                    else
                        colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);

                    colorspaceContex.fillStyle = tmpC2HSV.calcRGBColor().getRGBStringAplha(1.0);
                    colorspaceContex.fill();
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    if(grapedC2Circle==true)
                        colorspaceContex.strokeStyle =  activeCircleColor;
                    else
                        colorspaceContex.strokeStyle = 'rgb(0,0,0)';

                    colorspaceContex.stroke();

        
                }

                 

        break;
        case "lab": 

                    var tmpC1LAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2LAB = new classColorCIELab(colorVal1_C2,colorVal2_C2,colorVal3_C2);

                    var tmpC1HSV = tmpC1LAB.calcHSVColor();
                    var tmpC2HSV = tmpC2LAB.calcHSVColor();

                    // FOR C1
                    var xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    var yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    if(aboveC1Circle==true)
                        colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                    else
                        colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);

                    colorspaceContex.fillStyle = tmpC1HSV.calcRGBColor().getRGBStringAplha(1.0);
                    colorspaceContex.fill();
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    if(grapedC1Circle==true)
                        colorspaceContex.strokeStyle =  activeCircleColor;
                    else
                        colorspaceContex.strokeStyle = 'rgb(0,0,0)';

                    colorspaceContex.stroke();

                if(document.getElementById("radiobutton_ScaledBand").checked == true){

               
                    // FOR C2
                    xPos = tmpC2HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC2HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    if(aboveC2Circle==true)
                        colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                    else
                        colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);

                    colorspaceContex.fillStyle = tmpC2HSV.calcRGBColor().getRGBStringAplha(1.0);
                    colorspaceContex.fill();
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    if(grapedC2Circle==true)
                        colorspaceContex.strokeStyle =  activeCircleColor;
                    else
                        colorspaceContex.strokeStyle = 'rgb(0,0,0)';

                    colorspaceContex.stroke();

        
                }

               
                                    
        break;
        case "din99": 

                    var tmpC1DIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2DIN99 = new classColorDIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);

                    var tmpC1HSV = tmpC1DIN99.calcHSVColor();
                    var tmpC2HSV = tmpC2DIN99.calcHSVColor();

                    // FOR C1
                    var xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    var yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    if(aboveC1Circle==true)
                        colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                    else
                        colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);

                    colorspaceContex.fillStyle = tmpC1HSV.calcRGBColor().getRGBStringAplha(1.0);
                    colorspaceContex.fill();
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    if(grapedC1Circle==true)
                        colorspaceContex.strokeStyle =  activeCircleColor;
                    else
                        colorspaceContex.strokeStyle = 'rgb(0,0,0)';

                    colorspaceContex.stroke();

                if(document.getElementById("radiobutton_ScaledBand").checked == true){
                    // FOR C2
                    xPos = tmpC2HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC2HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    if(aboveC2Circle==true)
                        colorspaceContex.arc(xPos, yPos, bigcircleRad, 0, 2 * Math.PI, false);
                    else
                        colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
        
                    colorspaceContex.fillStyle = tmpC2HSV.calcRGBColor().getRGBStringAplha(1.0);
                    colorspaceContex.fill();
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    if(grapedC2Circle==true)
                        colorspaceContex.strokeStyle =  activeCircleColor;
                    else
                        colorspaceContex.strokeStyle = 'rgb(0,0,0)';

                    colorspaceContex.stroke();
          
        
                } 

        break;
        default:
            console.log("Error at the createBand function");

    }


    drawVChangeRects();

}

function drawVChangeRects(){

    var canvasVInput1 = document.getElementById("id_canvasPickerC1V");
    var resolution_X = v_resolution_X;
    var resolution_Y = v_resolution_Y;
    $("#id_canvasPickerC1V").attr("width", resolution_X+"px");
    $("#id_canvasPickerC1V").attr("height", resolution_Y+"px");
    
    var canvasVInputContex1 = canvasVInput1.getContext("2d");

    var canvasVInput2 = document.getElementById("id_canvasPickerC2V");
    $("#id_canvasPickerC2V").attr("width", resolution_X+"px");
    $("#id_canvasPickerC2V").attr("height", resolution_Y+"px");
    
    var canvasVInputContex2 = canvasVInput2.getContext("2d");

    if(document.getElementById("radiobutton_ScaledBand").checked == true){
        drawValueRect(canvasVInputContex1, getHSVColor(true), resolution_X, resolution_Y,aboveC1Circle);
        drawValueRect(canvasVInputContex2, getHSVColor(false), resolution_X, resolution_Y,aboveC2Circle);
    }
    else{
        drawValueRect(canvasVInputContex1, getHSVColor(true), resolution_X, resolution_Y,aboveC1Circle);
        drawValueRect(canvasVInputContex2, getHSVColor(true), resolution_X, resolution_Y,aboveC1Circle);
    }

    
}

function drawValueRect(canvasVInputContex, colorHSV, canvasWidth, canvasHeight,mouseOverElement){
        //gradient
        var hVal = colorHSV.getHValue();
        var sVal = colorHSV.getSValue();        
        var colorHSV2 = new classColor_HSV(hVal,sVal,1);       
        var colorRGB1 = colorHSV2.calcRGBColor();
        colorHSV2 = new classColor_HSV(hVal,sVal,0);       
        var colorRGB2 = colorHSV2.calcRGBColor();
        var grd = canvasVInputContex.createLinearGradient(0, 0, 0, canvasHeight);
            grd.addColorStop(0, colorRGB1.getRGBString());
            grd.addColorStop(1, colorRGB2.getRGBString());
            canvasVInputContex.fillStyle = grd;
            canvasVInputContex.fillRect(0,0, canvasWidth, canvasHeight);
        
        // Button
        if(mouseOverElement){
            colorRGB1 = colorHSV.calcRGBColor();
            var yPos = canvasHeight*(1-colorHSV.getVValue());  
            canvasVInputContex.fillStyle = "rgba(255,255,255,0.7)";
            canvasVInputContex.fillRect(0,yPos-bigvBarWidth, canvasWidth, bigvBarWidth*2);     
            canvasVInputContex.fillStyle = "rgba(0,0,0,0.7)"; //colorRGB1.getRGBStringAplha(1.0);
            canvasVInputContex.fillRect(0,yPos-bigvBarWidth/2, canvasWidth, bigvBarWidth);
            //canvasVInputContex.strokeStyle = 'rgb(0,0,0)';
            //canvasVInputContex.strokeRect(0,yPos-bigvBarWidth, canvasWidth, bigvBarWidth*2);
        }
        else{
            colorRGB1 = colorHSV.calcRGBColor();
            var yPos = canvasHeight*(1-colorHSV.getVValue());
            canvasVInputContex.fillStyle = "rgba(255,255,255,0.7)";
            canvasVInputContex.fillRect(0,yPos-vBarWidth, canvasWidth, vBarWidth*2);
            canvasVInputContex.fillStyle = "rgba(0,0,0,0.7)"; //colorRGB1.getRGBStringAplha(1.0);
            canvasVInputContex.fillRect(0,yPos-vBarWidth/2, canvasWidth, vBarWidth);
            //canvasVInputContex.strokeStyle = 'rgb(0,0,0)';
            //canvasVInputContex.strokeRect(0,yPos-vBarWidth, canvasWidth, vBarWidth*2);
        }
}

