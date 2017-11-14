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

    $("#id_workcanvasPicker").attr("width", hs_resolution_X+"px");
    $("#id_workcanvasPicker").attr("height", hs_resolution_Y+"px");
    var canvasColorspaceWidth = canvasColorspace.width;
    var canvasColorspaceHeight = canvasColorspace.height;
    //var ratioWidthHeight = canvasColorspaceWidth/canvasColorspaceHeight;
    var colorspaceContex = canvasColorspace.getContext("2d");

    var tmpC1RGB = getRGBColor();
    var tmpC1HSV = getHSVColor();
    var xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
    var yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

    colorspaceContex.beginPath();
    colorspaceContex.arc(xPos, yPos, circleRad, 0, 2 * Math.PI, false);
    colorspaceContex.fillStyle = tmpC1RGB.getRGBStringAplha(1.0);
    colorspaceContex.fill();
    colorspaceContex.lineWidth = circleStrokeWidth;
    colorspaceContex.strokeStyle = 'rgb(0,0,0)';
    colorspaceContex.stroke();

    drawVChangeRects();


    var tmpactivColorIndex = activColorIndex;
    switch(createBandType) { // 0=constant, 1=scale, 2=double, 3=triple, 4=quadruple)

        case 0:
        // do nothing
            
        break;
        case 1:

                if(tmpactivColorIndex!=0){
                    activColorIndex=0;
                    
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }

                if(tmpactivColorIndex!=4){
                    activColorIndex=4;
            
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
             
        break;
        case 2:
                if(tmpactivColorIndex!=0){
                    activColorIndex=0;
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
                if(tmpactivColorIndex!=2){
                    activColorIndex=2;
                
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
                if(tmpactivColorIndex!=4){
                    activColorIndex=4;
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
        break;
        case 3:
                if(tmpactivColorIndex!=0){
                    activColorIndex=0;
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
                if(tmpactivColorIndex!=1){
                    activColorIndex=1;
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
                if(tmpactivColorIndex!=3){
                    activColorIndex=3;
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
                if(tmpactivColorIndex!=4){
                    activColorIndex=4;
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
        break;
        case 4:
                if(tmpactivColorIndex!=0){
                    activColorIndex=0;
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
                if(tmpactivColorIndex!=1){
                    activColorIndex=1;
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
                if(tmpactivColorIndex!=2){
                    activColorIndex=2;
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
                if(tmpactivColorIndex!=3){
                    activColorIndex=3;
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
                if(tmpactivColorIndex!=4){
                    activColorIndex=4;
                    tmpC1HSV = getHSVColor();
                    xPos = tmpC1HSV.getHValue() * canvasColorspaceWidth;
                    yPos = (1-tmpC1HSV.getSValue()) * canvasColorspaceHeight;

                    colorspaceContex.beginPath();
                    colorspaceContex.arc(xPos, yPos, circleRad/2, 0, 2 * Math.PI, false);
                    colorspaceContex.lineWidth = circleStrokeWidth;
                    colorspaceContex.strokeStyle = 'rgb(90,90,90)';
                    colorspaceContex.stroke();
                }
                           
        break;
        default:
                console.log("Error at the updateCreatorBand function");

    }
    activColorIndex  = tmpactivColorIndex;
}

function drawVChangeRects(){

    var canvasVInput1 = document.getElementById("id_canvasPickerC1V");
    var resolution_X = v_resolution_X;
    var resolution_Y = v_resolution_Y;
    $("#id_canvasPickerC1V").attr("width", resolution_X+"px");
    $("#id_canvasPickerC1V").attr("height", resolution_Y+"px");
    
    var canvasVInputContex1 = canvasVInput1.getContext("2d");

    drawValueRect(canvasVInputContex1, getHSVColor(true), resolution_X, resolution_Y);

}

function drawValueRect(canvasVInputContex, colorHSV, canvasWidth, canvasHeight){
  
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
        
        colorRGB1 = colorHSV.calcRGBColor();
        var yPos = canvasHeight*(1-colorHSV.getVValue());
        canvasVInputContex.fillStyle = "rgba(255,255,255,0.7)";
        canvasVInputContex.fillRect(0,yPos-vBarWidth, canvasWidth, vBarWidth*2);
        canvasVInputContex.fillStyle = "rgba(0,0,0,0.7)"; //colorRGB1.getRGBStringAplha(1.0);
        canvasVInputContex.fillRect(0,yPos-vBarWidth/2, canvasWidth, vBarWidth);
            
        
}

