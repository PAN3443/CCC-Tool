
/////////////////////////////////////////////
// COLORPICKER
////////////////////////////////////////////



function colorpicker_MouseMove(event){
    // calc mouse pos
    var rect = document.getElementById("id_workcanvasPicker").getBoundingClientRect();

    var canvasPosX = event.clientX - rect.left;
    var canvasPosY = event.clientY - rect.top;

    var ratioToColorspaceResolutionX = hs_resolution_X/rect.width; 
    var ratioToColorspaceResolutionY = hs_resolution_Y/rect.height; 

    mousePosX = canvasPosX*ratioToColorspaceResolutionX;
    mousePosY = canvasPosY*ratioToColorspaceResolutionY;

    // check if mouse is above a element
    var tmpC1HSV = getHSVColor(true);

    var xPos1 = tmpC1HSV.getHValue() * hs_resolution_X;
    var yPos1 = (1-tmpC1HSV.getSValue()) * hs_resolution_Y;
 
}


function colorpicker_MouseClick(){


        var hVal = mousePosX/hs_resolution_X; 
        var sVal = 1-mousePosY/hs_resolution_Y;

    switch(colorspaceModus){
        case "rgb":
             var tmpRGB = getRGBColor();
             var tmpHSV = tmpRGB.calcHSVColor();
                if(tmpHSV.getVValue()==0)
                   tmpHSV.setVValue(0.00001);
             tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
             tmpRGB = tmpHSV.calcRGBColor();
             switch(activColorIndex){

                    case 0: 
                        colorVal1_C1 = tmpRGB.getRValue()*255;
                        colorVal2_C1 = tmpRGB.getGValue()*255;
                        colorVal3_C1 = tmpRGB.getBValue()*255;
                    break;
                    case 1:
                        colorVal1_C2 = tmpRGB.getRValue()*255;
                        colorVal2_C2 = tmpRGB.getGValue()*255;
                        colorVal3_C2 = tmpRGB.getBValue()*255;
                    break;
                    case 2:
                        colorVal1_C3 = tmpRGB.getRValue()*255;
                        colorVal2_C3 = tmpRGB.getGValue()*255;
                        colorVal3_C3 = tmpRGB.getBValue()*255;  
                    break;
                    case 3:
                        colorVal1_C4 = tmpRGB.getRValue()*255;
                        colorVal2_C4 = tmpRGB.getGValue()*255;
                        colorVal3_C4 = tmpRGB.getBValue()*255;  
                    break;
                    case 4:
                        colorVal1_C5 = tmpRGB.getRValue()*255;
                        colorVal2_C5 = tmpRGB.getGValue()*255;
                        colorVal3_C5 = tmpRGB.getBValue()*255;  
                    break;
                    default:
                            console.log("Error at the changeColorspace function");

                }
        break;
        case "hsv":
             var tmpHSV = getHSVColor();
             var tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
             switch(activColorIndex){
                    case 0: 
                        colorVal1_C1 = tmpHSV.getHValue();
                        colorVal2_C1 = tmpHSV.getSValue();
                        colorVal3_C1 = tmpHSV.getVValue();
                    break;
                    case 1:
                        colorVal1_C2 = tmpHSV.getHValue();
                        colorVal2_C2 = tmpHSV.getSValue();
                        colorVal3_C2 = tmpHSV.getVValue();
                    break;
                    case 2:
                       colorVal1_C3 = tmpHSV.getHValue();
                        colorVal2_C3 = tmpHSV.getSValue();
                        colorVal3_C3 = tmpHSV.getVValue();
                    break;
                    case 3:
                        colorVal1_C4 = tmpHSV.getHValue();
                        colorVal2_C4 = tmpHSV.getSValue();
                        colorVal3_C4 = tmpHSV.getVValue();  
                    break;
                    case 4:
                        colorVal1_C5 = tmpHSV.getHValue();
                        colorVal2_C5 = tmpHSV.getSValue();
                        colorVal3_C5 = tmpHSV.getVValue();
                    break;
                    default:
                            console.log("Error at the changeColorspace function");

                }
        break;
        case "lab":
            var tmpLAB = getLABColor();
            var tmpHSV = tmpLAB.calcHSVColor();
            if(tmpHSV.getVValue()==0)
               tmpHSV.setVValue(0.00001);
            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
            tmpLAB = tmpHSV.calcCIELabColor();
             switch(activColorIndex){
                    case 0: 
                        colorVal1_C1 = tmpLAB.getLValue();
                        colorVal2_C1 = tmpLAB.getAValue();
                        colorVal3_C1 = tmpLAB.getBValue();
                    break;
                    case 1:
                        colorVal1_C2 = tmpLAB.getLValue();
                        colorVal2_C2 = tmpLAB.getAValue();
                        colorVal3_C2 = tmpLAB.getBValue();
                    break;
                    case 2:
                        colorVal1_C3 = tmpLAB.getLValue();
                        colorVal2_C3 = tmpLAB.getAValue();
                        colorVal3_C3 = tmpLAB.getBValue();
                    break;
                    case 3:
                        colorVal1_C4 = tmpLAB.getLValue();
                        colorVal2_C4 = tmpLAB.getAValue();
                        colorVal3_C4 = tmpLAB.getBValue();
                    break;
                    case 4:
                        colorVal1_C5 = tmpLAB.getLValue();
                        colorVal2_C5 = tmpLAB.getAValue();
                        colorVal3_C5 = tmpLAB.getBValue();
                    break;
                    default:
                            console.log("Error at the changeColorspace function");

                }
        break;
        case "din99":
            var tmpDIN99 = getDIN99Color();
            var tmpHSV = tmpDIN99.calcHSVColor();
            if(tmpHSV.getVValue()==0)
                 tmpHSV.setVValue(0.00001);
            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
            tmpDIN99 = tmpHSV.calcDIN99Color(kE,kCH);
            switch(activColorIndex){
                    case 0: 
                        colorVal1_C1 = tmpDIN99.getL99Value();
                        colorVal2_C1 = tmpDIN99.getA99Value();
                        colorVal3_C1 = tmpDIN99.getB99Value();
                    break;
                    case 1:
                        colorVal1_C2 = tmpDIN99.getL99Value();
                        colorVal2_C2 = tmpDIN99.getA99Value();
                        colorVal3_C2 = tmpDIN99.getB99Value();
                    break;
                    case 2:
                        colorVal1_C3 = tmpDIN99.getL99Value();
                        colorVal2_C3 = tmpDIN99.getA99Value();
                        colorVal3_C3 = tmpDIN99.getB99Value();
                    break;
                    case 3:
                        colorVal1_C4 = tmpDIN99.getL99Value();
                        colorVal2_C4 = tmpDIN99.getA99Value();
                        colorVal3_C4 = tmpDIN99.getB99Value();
                    break;
                    case 4:
                        colorVal1_C5 = tmpDIN99.getL99Value();
                        colorVal2_C5 = tmpDIN99.getA99Value();
                        colorVal3_C5 = tmpDIN99.getB99Value();
                    break;
                    default:
                            console.log("Error at the changeColorspace function");

                }
        break;
        default:
        return;
    }

    switch(activColorIndex){

                    case 0: 
                        document.getElementById("id_color1_First").value = colorVal1_C1;
                        document.getElementById("id_color1_Second").value = colorVal2_C1;
                        document.getElementById("id_color1_Third").value = colorVal3_C1;
                    break;
                    case 1:
                        document.getElementById("id_color1_First").value = colorVal1_C2;
                        document.getElementById("id_color1_Second").value = colorVal2_C2;
                        document.getElementById("id_color1_Third").value = colorVal3_C2;
                    break;
                    case 2:
                        document.getElementById("id_color1_First").value = colorVal1_C3;
                        document.getElementById("id_color1_Second").value = colorVal2_C3;
                        document.getElementById("id_color1_Third").value = colorVal3_C3;
                    break;
                    case 3:
                        document.getElementById("id_color1_First").value = colorVal1_C4;
                        document.getElementById("id_color1_Second").value = colorVal2_C4;
                        document.getElementById("id_color1_Third").value = colorVal3_C4;
                    break;
                    case 4:
                        document.getElementById("id_color1_First").value = colorVal1_C5;
                        document.getElementById("id_color1_Second").value = colorVal2_C5;
                        document.getElementById("id_color1_Third").value = colorVal3_C5;
                    break;
                    default:
                            console.log("Error at the changeColorspace function");

    }

    if(creatorBandIsNew==true){
        saveBandToArray(); 
    }

    drawColorCircles();
    updateCreatorBand();

}

/////////////////////////////////////////////
// C1 V-Picker
////////////////////////////////////////////


function c1Vpicker_MouseMove(event){

    // calc mouse pos
    var rect = document.getElementById("id_canvasPickerC1V").getBoundingClientRect();

    var canvasPosX = event.clientX - rect.left;
    var canvasPosY = event.clientY - rect.top;

    var ratioToColorspaceResolutionX = v_resolution_X/rect.width; 
    var ratioToColorspaceResolutionY = v_resolution_Y/rect.height; 

    mousePosX = canvasPosX*ratioToColorspaceResolutionX;
    mousePosY = canvasPosY*ratioToColorspaceResolutionY;

}


function c1Vpicker_MouseClick(){
    
    var newV = 1-mousePosY/v_resolution_Y;

        switch(colorspaceModus){
        case "rgb":
             var tmpRGB = getRGBColor();
             var tmpHSV = tmpRGB.calcHSVColor();
             tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
             tmpRGB = tmpHSV.calcRGBColor();
             switch(activColorIndex){

                    case 0: 
                        colorVal1_C1 = tmpRGB.getRValue()*255;
                        colorVal2_C1 = tmpRGB.getGValue()*255;
                        colorVal3_C1 = tmpRGB.getBValue()*255;
                    break;
                    case 1:
                        colorVal1_C2 = tmpRGB.getRValue()*255;
                        colorVal2_C2 = tmpRGB.getGValue()*255;
                        colorVal3_C2 = tmpRGB.getBValue()*255;
                    break;
                    case 2:
                        colorVal1_C3 = tmpRGB.getRValue()*255;
                        colorVal2_C3 = tmpRGB.getGValue()*255;
                        colorVal3_C3 = tmpRGB.getBValue()*255;  
                    break;
                    case 3:
                        colorVal1_C4 = tmpRGB.getRValue()*255;
                        colorVal2_C4 = tmpRGB.getGValue()*255;
                        colorVal3_C4 = tmpRGB.getBValue()*255;  
                    break;
                    case 4:
                        colorVal1_C5 = tmpRGB.getRValue()*255;
                        colorVal2_C5 = tmpRGB.getGValue()*255;
                        colorVal3_C5 = tmpRGB.getBValue()*255;  
                    break;
                    default:
                            console.log("Error at the changeColorspace function");

                }
        break;
        case "hsv":
             var tmpHSV = getHSVColor();
             var tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
             switch(activColorIndex){
                    case 0: 
                        colorVal1_C1 = tmpHSV.getHValue();
                        colorVal2_C1 = tmpHSV.getSValue();
                        colorVal3_C1 = tmpHSV.getVValue();
                    break;
                    case 1:
                        colorVal1_C2 = tmpHSV.getHValue();
                        colorVal2_C2 = tmpHSV.getSValue();
                        colorVal3_C2 = tmpHSV.getVValue();
                    break;
                    case 2:
                       colorVal1_C3 = tmpHSV.getHValue();
                        colorVal2_C3 = tmpHSV.getSValue();
                        colorVal3_C3 = tmpHSV.getVValue();
                    break;
                    case 3:
                        colorVal1_C4 = tmpHSV.getHValue();
                        colorVal2_C4 = tmpHSV.getSValue();
                        colorVal3_C4 = tmpHSV.getVValue();  
                    break;
                    case 4:
                        colorVal1_C5 = tmpHSV.getHValue();
                        colorVal2_C5 = tmpHSV.getSValue();
                        colorVal3_C5 = tmpHSV.getVValue();
                    break;
                    default:
                            console.log("Error at the changeColorspace function");

                }
        break;
        case "lab":
            var tmpLAB = getLABColor();
             var tmpHSV = tmpLAB.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpLAB = tmpHSV.calcCIELabColor();
             switch(activColorIndex){
                    case 0: 
                        colorVal1_C1 = tmpLAB.getLValue();
                        colorVal2_C1 = tmpLAB.getAValue();
                        colorVal3_C1 = tmpLAB.getBValue();
                    break;
                    case 1:
                        colorVal1_C2 = tmpLAB.getLValue();
                        colorVal2_C2 = tmpLAB.getAValue();
                        colorVal3_C2 = tmpLAB.getBValue();
                    break;
                    case 2:
                        colorVal1_C3 = tmpLAB.getLValue();
                        colorVal2_C3 = tmpLAB.getAValue();
                        colorVal3_C3 = tmpLAB.getBValue();
                    break;
                    case 3:
                        colorVal1_C4 = tmpLAB.getLValue();
                        colorVal2_C4 = tmpLAB.getAValue();
                        colorVal3_C4 = tmpLAB.getBValue();
                    break;
                    case 4:
                        colorVal1_C5 = tmpLAB.getLValue();
                        colorVal2_C5 = tmpLAB.getAValue();
                        colorVal3_C5 = tmpLAB.getBValue();
                    break;
                    default:
                            console.log("Error at the changeColorspace function");

                }
        break;
        case "din99":
            var tmpDIN99 = getDIN99Color();
                            var tmpHSV = tmpDIN99.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpDIN99 = tmpHSV.calcDIN99Color(kE,kCH);
            switch(activColorIndex){
                    case 0: 
                        colorVal1_C1 = tmpDIN99.getL99Value();
                        colorVal2_C1 = tmpDIN99.getA99Value();
                        colorVal3_C1 = tmpDIN99.getB99Value();
                    break;
                    case 1:
                        colorVal1_C2 = tmpDIN99.getL99Value();
                        colorVal2_C2 = tmpDIN99.getA99Value();
                        colorVal3_C2 = tmpDIN99.getB99Value();
                    break;
                    case 2:
                        colorVal1_C3 = tmpDIN99.getL99Value();
                        colorVal2_C3 = tmpDIN99.getA99Value();
                        colorVal3_C3 = tmpDIN99.getB99Value();
                    break;
                    case 3:
                        colorVal1_C4 = tmpDIN99.getL99Value();
                        colorVal2_C4 = tmpDIN99.getA99Value();
                        colorVal3_C4 = tmpDIN99.getB99Value();
                    break;
                    case 4:
                        colorVal1_C5 = tmpDIN99.getL99Value();
                        colorVal2_C5 = tmpDIN99.getA99Value();
                        colorVal3_C5 = tmpDIN99.getB99Value();
                    break;
                    default:
                            console.log("Error at the changeColorspace function");

                }
        break;
        default:
        return;
    }

    switch(activColorIndex){

                    case 0: 
                        document.getElementById("id_color1_First").value = colorVal1_C1;
                        document.getElementById("id_color1_Second").value = colorVal2_C1;
                        document.getElementById("id_color1_Third").value = colorVal3_C1;
                    break;
                    case 1:
                        document.getElementById("id_color1_First").value = colorVal1_C2;
                        document.getElementById("id_color1_Second").value = colorVal2_C2;
                        document.getElementById("id_color1_Third").value = colorVal3_C2;
                    break;
                    case 2:
                        document.getElementById("id_color1_First").value = colorVal1_C3;
                        document.getElementById("id_color1_Second").value = colorVal2_C3;
                        document.getElementById("id_color1_Third").value = colorVal3_C3;
                    break;
                    case 3:
                        document.getElementById("id_color1_First").value = colorVal1_C4;
                        document.getElementById("id_color1_Second").value = colorVal2_C4;
                        document.getElementById("id_color1_Third").value = colorVal3_C4;
                    break;
                    case 4:
                        document.getElementById("id_color1_First").value = colorVal1_C5;
                        document.getElementById("id_color1_Second").value = colorVal2_C5;
                        document.getElementById("id_color1_Third").value = colorVal3_C5;
                    break;
                    default:
                            console.log("Error at the changeColorspace function");

    }

    drawColorCircles();
    updateCreatorBand();

    if(creatorBandIsNew==true){
        saveBandToArray(); 
    }

}



