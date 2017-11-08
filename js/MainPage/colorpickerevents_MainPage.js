
/////////////////////////////////////////////
// COLORPICKER
////////////////////////////////////////////


function colorpicker_MouseLeave(){
    aboveC1Circle=false;
    aboveC2Circle=false;
    drawColorCircles();
}

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

    if(document.getElementById("radiobutton_ScaledBand").checked == true){
        
        var tmpC2HSV = getHSVColor(false);
        var xPos2 = tmpC2HSV.getHValue() * hs_resolution_X;
        var yPos2 = (1-tmpC2HSV.getSValue()) * hs_resolution_Y;

        if(aboveC1Circle || aboveC2Circle){
            if(aboveC1Circle){
                var dis = Math.sqrt(Math.pow(xPos1-mousePosX,2)+Math.pow(yPos1-mousePosY,2));
                if(dis>bigcircleRad){
                    aboveC1Circle=false;
                    aboveC2Circle=false;
                    drawColorCircles();
                }
            }
            else{
                var dis = Math.sqrt(Math.pow(xPos2-mousePosX,2)+Math.pow(yPos2-mousePosY,2));
                if(dis>bigcircleRad){
                    aboveC1Circle=false;
                    aboveC2Circle=false;
                    drawColorCircles();
                }
            }
            
        }
        else{
            
            var dis = Math.sqrt(Math.pow(xPos1-mousePosX,2)+Math.pow(yPos1-mousePosY,2));
            if(dis<circleRad){
                aboveC1Circle=true;
                aboveC2Circle=false;
                drawColorCircles();
            }
            if(aboveC1Circle==false){
                var dis = Math.sqrt(Math.pow(xPos2-mousePosX,2)+Math.pow(yPos2-mousePosY,2));
                if(dis<circleRad){
                    aboveC2Circle=true;
                    drawColorCircles();
                }
            }

        }

    }
    else{
    
         if(aboveC1Circle){
                var dis = Math.sqrt(Math.pow(xPos1-mousePosX,2)+Math.pow(yPos1-mousePosY,2));
                if(dis>bigcircleRad){
                    aboveC1Circle=false;
                    drawColorCircles();
                }
         }
         else{
            var dis = Math.sqrt(Math.pow(xPos1-mousePosX,2)+Math.pow(yPos1-mousePosY,2));
            if(dis<circleRad){
                aboveC1Circle=true;
                drawColorCircles();
            }
         }
    }
    



    /*for(var i=0; i<createSide_ElementType.length; i++){

        if( createSide_MouseAboveKey==i){
            if(createSide_ElementType[i]==true){
            // Circle -> Part of Scaled Band
                var dis = Math.sqrt(Math.pow(createSide_ElementXPos[i]-createSide_ColorspaceMousePOSX,2)+Math.pow(createSide_ElementYPos[i]-createSide_ColorspaceMousePOSY,2));
                if(dis>bigcircleRad){
                    createSide_MouseAboveKey=-1;
                    createSide_drawColormapInSpace();
                    break;
                }
                else{
                    break;
                }

            }
            else{
                if(createSide_ElementXPos[i]!=-1){
                    // QUAD -> Constant Band

                    //var dis = Math.sqrt(Math.pow(createSide_ElementXPos[i]-createSide_ColorspaceMousePOSX,2)+Math.pow(createSide_ElementYPos[i]-createSide_ColorspaceMousePOSY,2));
                
                    if( createSide_ColorspaceMousePOSX<createSide_ElementXPos[i]-bigcircleRad ||
                        createSide_ColorspaceMousePOSX>createSide_ElementXPos[i]+bigcircleRad ||
                        createSide_ColorspaceMousePOSY<createSide_ElementYPos[i]-bigcircleRad ||
                        createSide_ColorspaceMousePOSY>createSide_ElementYPos[i]+bigcircleRad ){
                        createSide_MouseAboveKey=-1;
                        createSide_drawColormapInSpace();
                        break;
                    }
                    else{
                        break;
                    }

                }
            }
        }

        if(createSide_ElementType[i]==true){
            // Circle -> Part of Scaled Band
            var dis = Math.sqrt(Math.pow(createSide_ElementXPos[i]-createSide_ColorspaceMousePOSX,2)+Math.pow(createSide_ElementYPos[i]-createSide_ColorspaceMousePOSY,2));
            if(dis<=circleRad){
                createSide_MouseAboveKey=i;
                createSide_drawColormapInSpace();
                break;
            }

           
        }
        else{
            if(createSide_ElementXPos[i]!=-1){
                // QUAD -> Constant Band

                var dis = Math.sqrt(Math.pow(createSide_ElementXPos[i]-createSide_ColorspaceMousePOSX,2)+Math.pow(createSide_ElementYPos[i]-createSide_ColorspaceMousePOSY,2));
            
                if( createSide_ColorspaceMousePOSX>=createSide_ElementXPos[i]-circleRad &&
                    createSide_ColorspaceMousePOSX<=createSide_ElementXPos[i]+circleRad &&
                    createSide_ColorspaceMousePOSY>=createSide_ElementYPos[i]-circleRad &&
                    createSide_ColorspaceMousePOSY<=createSide_ElementYPos[i]+circleRad ){
                    createSide_MouseAboveKey=i;
                    createSide_drawColormapInSpace();
                    break;
                }

            }
        }
    }
    
    // check if mouse is inside of Colorspace
        var dis = Math.sqrt(Math.pow(colorspaceCenterX-createSide_ColorspaceMousePOSX,2)+Math.pow(colorspaceCenterY-createSide_ColorspaceMousePOSY,2));
        if(dis<=colorspaceRadius){
            document.getElementById("createSide_CanvasColorspace").style.cursor = "pointer"; // crosshair
            // if draw the first scaled band in the HSV Space
            if(drawSecondColorBandatHSV){
                var ty = (createSide_ColorspaceMousePOSY) - (colorspaceCenterY);
                var tx = createSide_ColorspaceMousePOSX- colorspaceCenterX;  
                var angle = (Math.atan2(ty,tx)+Math.PI)/(Math.PI*2); // values 0-1 ...
                var hVal = angle;
                var sVal = dis/colorspaceRadius;
                var vVal = createSide_updateVVal;          
                var colorHSV = new classColor_HSV(hVal,sVal,vVal);       
                var tmpRGBColor = colorHSV.calcRGBColor();
                colormapBandSketchC2[secondIndexHSV] = tmpRGBColor;
                orderColorSketch();
            }
        }
        else{
            document.getElementById("createSide_CanvasColorspace").style.cursor = "default";
            drawSecondColorBandatHSV=false;
            createSide_updateC1Index = -1;
            createSide_updateC2Index = -1;
            if(createSide_grapedKeyIndex != -1){
                createSide_grapedKeyIndex=-1;
                createSide_drawColormapInSpace();
            }
        }

    // if inside of colorspace
    if(createSide_grapedKeyIndex != -1){
        //calc color and give it to the band
        var ty = (createSide_ColorspaceMousePOSY) - (colorspaceCenterY);
        var tx = createSide_ColorspaceMousePOSX- colorspaceCenterX;  
        var angle = (Math.atan2(ty,tx)+Math.PI)/(Math.PI*2); // values 0-1 ...
        var hVal = angle;
        var sVal = dis/colorspaceRadius;
        var vVal = createSide_updateVVal;          
        var colorHSV = new classColor_HSV(hVal,sVal,vVal);       
        var tmpRGBColor = colorHSV.calcRGBColor();

        //draw the colorspace new
        if(createSide_updateC1Index != -1)
            colormapBandSketchC1[createSide_updateC1Index] = tmpRGBColor;

        if(createSide_updateC2Index != -1)
            colormapBandSketchC2[createSide_updateC2Index] = tmpRGBColor;

        orderColorSketch();
    }*/

}


function colorpicker_MouseClick(){


    if(aboveC1Circle && grapedC2Circle || aboveC2Circle && grapedC1Circle){
        if(aboveC1Circle && grapedC2Circle){
        grapedC1Circle =true;
        grapedC2Circle =false;
        }

        if(aboveC2Circle && grapedC1Circle){
            grapedC1Circle =false;
            grapedC2Circle =true;
        }
    }
    else{
            var hVal = mousePosX/hs_resolution_X; 
            var sVal = 1-mousePosY/hs_resolution_Y;

            if(document.getElementById("radiobutton_ScaledBand").checked == true){

                if(grapedC1Circle){

                    switch(colorspaceModus){
                        case "rgb":
                            var tmpRGB = new classColor_RGB(colorVal1_C1/255,colorVal2_C1/255,colorVal3_C1/255);
                            var tmpHSV = tmpRGB.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
                            tmpRGB = tmpHSV.calcRGBColor();
                            colorVal1_C1= tmpRGB.getRValue()*255;
                            colorVal2_C1= tmpRGB.getGValue()*255;
                            colorVal3_C1= tmpRGB.getBValue()*255;
                            break;
                        case "hsv": 
                            var tmpHSV = new classColor_HSV(hVal, sVal, colorVal3_C1);
                            colorVal1_C1=tmpHSV.getHValue();
                            colorVal2_C1=tmpHSV.getSValue();
                            colorVal3_C1=tmpHSV.getVValue();
                            break;
                        case "lab": 
                            var tmpLAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                            var tmpHSV = tmpLAB.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
                            tmpLAB = tmpHSV.calcCIELabColor();
                            colorVal1_C1=tmpLAB.getLValue();
                            colorVal2_C1=tmpLAB.getAValue();
                            colorVal3_C1=tmpLAB.getBValue();
                            break;
                        case "din99":
                            var tmpDIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                            var tmpHSV = tmpDIN99.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
                            tmpDIN99 = tmpHSV.calcDIN99Color(kE,kCH);
                            colorVal1_C1=tmpDIN99.getL99Value();
                            colorVal2_C1=tmpDIN99.getA99Value();
                            colorVal3_C1=tmpDIN99.getB99Value();
                            break;

                        default:
                        console.log("Error at the colorpicker_MouseClick function");
                    }
                }
                else{
                    
                    switch(colorspaceModus){
                        case "rgb":
                            var tmpRGB = new classColor_RGB(colorVal1_C2/255,colorVal2_C2/255,colorVal3_C2/255);
                            var tmpHSV = tmpRGB.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
                            tmpRGB = tmpHSV.calcRGBColor();
                            colorVal1_C2= tmpRGB.getRValue()*255;
                            colorVal2_C2= tmpRGB.getGValue()*255;
                            colorVal3_C2= tmpRGB.getBValue()*255;
                            break;
                        case "hsv": 
                            var tmpHSV = new classColor_HSV(hVal, sVal, colorVal3_C2);
                            colorVal1_C2=tmpHSV.getHValue();
                            colorVal2_C2=tmpHSV.getSValue();
                            colorVal3_C2=tmpHSV.getVValue();
                            break;
                        case "lab": 
                            var tmpLAB = new classColorCIELab(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                            var tmpHSV = tmpLAB.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());

                            tmpLAB = tmpHSV.calcCIELabColor();
                            colorVal1_C2=tmpLAB.getLValue();
                            colorVal2_C2=tmpLAB.getAValue();
                            colorVal3_C2=tmpLAB.getBValue();
                            break;
                        case "din99":
                            var tmpDIN99 = new classColorDIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                            var tmpHSV = tmpDIN99.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
                            tmpDIN99 = tmpHSV.calcDIN99Color(kE,kCH);
                            colorVal1_C2=tmpDIN99.getL99Value();
                            colorVal2_C2=tmpDIN99.getA99Value();
                            colorVal3_C2=tmpDIN99.getB99Value();
                            break;

                        default:
                        console.log("Error at the colorpicker_MouseClick function");
                    }
                }
                
                
            }
            else{

                    switch(colorspaceModus){
                        case "rgb":
                            var tmpRGB = new classColor_RGB(colorVal1_C1/255,colorVal2_C1/255,colorVal3_C1/255);
                            var tmpHSV = tmpRGB.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
                            tmpRGB = tmpHSV.calcRGBColor();
                            colorVal1_C1=tmpRGB.getRValue()*255;
                            colorVal2_C1=tmpRGB.getGValue()*255;
                            colorVal3_C1=tmpRGB.getBValue()*255;
                            colorVal1_C2=tmpRGB.getRValue()*255;
                            colorVal2_C2=tmpRGB.getGValue()*255;
                            colorVal3_C2=tmpRGB.getBValue()*255;
                            break;
                        case "hsv": 
                            var tmpHSV = new classColor_HSV(hVal, sVal, colorVal3_C1);
                            colorVal1_C1=tmpHSV.getHValue();
                            colorVal2_C1=tmpHSV.getSValue();
                            colorVal3_C1=tmpHSV.getVValue(); 
                            colorVal1_C2=tmpHSV.getHValue();
                            colorVal2_C2=tmpHSV.getSValue();
                            colorVal3_C2=tmpHSV.getVValue();
                            break;
                        case "lab":  
                            var tmpLAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                            var tmpHSV = tmpLAB.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
                            tmpLAB = tmpHSV.calcCIELabColor();
                            colorVal1_C1=tmpLAB.getLValue();
                            colorVal2_C1=tmpLAB.getAValue();
                            colorVal3_C1=tmpLAB.getBValue();
                            colorVal1_C2=tmpLAB.getLValue();
                            colorVal2_C2=tmpLAB.getAValue();
                            colorVal3_C2=tmpLAB.getBValue();
                            break;
                        case "din99":
                            var tmpDIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                            var tmpHSV = tmpDIN99.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(hVal, sVal, tmpHSV.getVValue());
                            tmpDIN99 = tmpHSV.calcDIN99Color(kE,kCH);
                            colorVal1_C1=tmpDIN99.getL99Value();
                            colorVal2_C1=tmpDIN99.getA99Value();
                            colorVal3_C1=tmpDIN99.getB99Value();
                            colorVal1_C2=tmpDIN99.getL99Value();
                            colorVal2_C2=tmpDIN99.getA99Value();
                            colorVal3_C2=tmpDIN99.getB99Value();
                            break;

                        default:
                        console.log("Error at the colorpicker_MouseClick function");
                    }

            }

            document.getElementById("id_color1_First").value = colorVal1_C1;
            document.getElementById("id_color1_Second").value = colorVal2_C1;
            document.getElementById("id_color1_Third").value = colorVal3_C1;
            document.getElementById("id_color2_First").value = colorVal1_C2;
            document.getElementById("id_color2_Second").value = colorVal2_C2;
            document.getElementById("id_color2_Third").value = colorVal3_C2;


            //drawColorCircles();
            updateCreatorBand();

    }

    drawColorCircles();

}

/////////////////////////////////////////////
// C1 V-Picker
////////////////////////////////////////////

function c1Vpicker_MouseLeave(){
    aboveC1Circle=false;
    drawColorCircles();
}

function c1Vpicker_MouseEnter(){
    aboveC1Circle=true;
    drawColorCircles();
}

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

   if(document.getElementById("radiobutton_ScaledBand").checked == true){

         switch(colorspaceModus){
                        case "rgb":
                            var tmpRGB = new classColor_RGB(colorVal1_C1/255,colorVal2_C1/255,colorVal3_C1/255);
                            var tmpHSV = tmpRGB.calcHSVColor();
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpRGB = tmpHSV.calcRGBColor();
                            colorVal1_C1= tmpRGB.getRValue()*255;
                            colorVal2_C1= tmpRGB.getGValue()*255;
                            colorVal3_C1= tmpRGB.getBValue()*255;
                            break;
                        case "hsv": 
                            var tmpHSV = new classColor_HSV(colorVal1_C1, colorVal2_C1, newV);
                            colorVal1_C1=tmpHSV.getHValue();
                            colorVal2_C1=tmpHSV.getSValue();
                            colorVal3_C1=tmpHSV.getVValue();
                            break;
                        case "lab": 
                            var tmpLAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                            var tmpHSV = tmpLAB.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpLAB = tmpHSV.calcCIELabColor();
                            colorVal1_C1=tmpLAB.getLValue();
                            colorVal2_C1=tmpLAB.getAValue();
                            colorVal3_C1=tmpLAB.getBValue();
                            break;
                        case "din99":
                            var tmpDIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                            var tmpHSV = tmpDIN99.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpDIN99 = tmpHSV.calcDIN99Color(kE,kCH);
                            colorVal1_C1=tmpDIN99.getL99Value();
                            colorVal2_C1=tmpDIN99.getA99Value();
                            colorVal3_C1=tmpDIN99.getB99Value();
                            break;

                        default:
                        console.log("Error at the colorpicker_MouseClick function");
                    }
   }
   else{

         switch(colorspaceModus){
                        case "rgb":
                            var tmpRGB = new classColor_RGB(colorVal1_C1/255,colorVal2_C1/255,colorVal3_C1/255);
                            var tmpHSV = tmpRGB.calcHSVColor();
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpRGB = tmpHSV.calcRGBColor();
                            colorVal1_C1= tmpRGB.getRValue()*255;
                            colorVal2_C1= tmpRGB.getGValue()*255;
                            colorVal3_C1= tmpRGB.getBValue()*255;
                            colorVal1_C2= tmpRGB.getRValue()*255;
                            colorVal2_C2= tmpRGB.getGValue()*255;
                            colorVal3_C2= tmpRGB.getBValue()*255;
                            break;
                        case "hsv": 
                            var tmpHSV = new classColor_HSV(colorVal1_C1, colorVal2_C1, newV);
                            colorVal1_C1=tmpHSV.getHValue();
                            colorVal2_C1=tmpHSV.getSValue();
                            colorVal3_C1=tmpHSV.getVValue();
                            colorVal1_C2=tmpHSV.getHValue();
                            colorVal2_C2=tmpHSV.getSValue();
                            colorVal3_C2=tmpHSV.getVValue();
                            break;
                        case "lab": 
                            var tmpLAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                            var tmpHSV = tmpLAB.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpLAB = tmpHSV.calcCIELabColor();
                            colorVal1_C1=tmpLAB.getLValue();
                            colorVal2_C1=tmpLAB.getAValue();
                            colorVal3_C1=tmpLAB.getBValue();
                            colorVal1_C2=tmpLAB.getLValue();
                            colorVal2_C2=tmpLAB.getAValue();
                            colorVal3_C2=tmpLAB.getBValue();
                            break;
                        case "din99":
                            var tmpDIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                            var tmpHSV = tmpDIN99.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpDIN99 = tmpHSV.calcDIN99Color(kE,kCH);
                            colorVal1_C1=tmpDIN99.getL99Value();
                            colorVal2_C1=tmpDIN99.getA99Value();
                            colorVal3_C1=tmpDIN99.getB99Value();
                            colorVal1_C2=tmpDIN99.getL99Value();
                            colorVal2_C2=tmpDIN99.getA99Value();
                            colorVal3_C2=tmpDIN99.getB99Value();
                            break;

                        default:
                        console.log("Error at the colorpicker_MouseClick function");
                    }
   }

    document.getElementById("id_color1_First").value = colorVal1_C1;
    document.getElementById("id_color1_Second").value = colorVal2_C1;
    document.getElementById("id_color1_Third").value = colorVal3_C1;
    document.getElementById("id_color2_First").value = colorVal1_C2;
    document.getElementById("id_color2_Second").value = colorVal2_C2;
    document.getElementById("id_color2_Third").value = colorVal3_C2;

    grapedC1Circle =true;
    grapedC2Circle =false;
    drawColorCircles();
    updateCreatorBand();

}

/////////////////////////////////////////////
// C2 V-Picker
////////////////////////////////////////////

function c2Vpicker_MouseLeave(){
    aboveC2Circle=false;
    drawColorCircles();
}

function c2Vpicker_MouseEnter(){
    aboveC2Circle=true;
    drawColorCircles();
}

function c2Vpicker_MouseMove(event){

    // calc mouse pos
    var rect = document.getElementById("id_canvasPickerC2V").getBoundingClientRect();

    var canvasPosX = event.clientX - rect.left;
    var canvasPosY = event.clientY - rect.top;

    var ratioToColorspaceResolutionX = v_resolution_X/rect.width; 
    var ratioToColorspaceResolutionY = v_resolution_Y/rect.height; 

    mousePosX = canvasPosX*ratioToColorspaceResolutionX;
    mousePosY = canvasPosY*ratioToColorspaceResolutionY;

}


function c2Vpicker_MouseClick(){
    
    var newV = 1-mousePosY/v_resolution_Y;

   if(document.getElementById("radiobutton_ScaledBand").checked == true){

         switch(colorspaceModus){
                        case "rgb":
                            var tmpRGB = new classColor_RGB(colorVal1_C2/255,colorVal2_C2/255,colorVal3_C2/255);
                            var tmpHSV = tmpRGB.calcHSVColor();
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpRGB = tmpHSV.calcRGBColor();
                            colorVal1_C2= tmpRGB.getRValue()*255;
                            colorVal2_C2= tmpRGB.getGValue()*255;
                            colorVal3_C2= tmpRGB.getBValue()*255;
                            break;
                        case "hsv": 
                            var tmpHSV = new classColor_HSV(colorVal1_C2, colorVal2_C2, newV);
                            colorVal1_C2=tmpHSV.getHValue();
                            colorVal2_C2=tmpHSV.getSValue();
                            colorVal3_C2=tmpHSV.getVValue();
                            break;
                        case "lab": 
                            var tmpLAB = new classColorCIELab(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                            var tmpHSV = tmpLAB.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpLAB = tmpHSV.calcCIELabColor();
                            colorVal1_C2=tmpLAB.getLValue();
                            colorVal2_C2=tmpLAB.getAValue();
                            colorVal3_C2=tmpLAB.getBValue();
                            break;
                        case "din99":
                            var tmpDIN99 = new classColorDIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                            var tmpHSV = tmpDIN99.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpDIN99 = tmpHSV.calcDIN99Color(kE,kCH);
                            colorVal1_C2=tmpDIN99.getL99Value();
                            colorVal2_C2=tmpDIN99.getA99Value();
                            colorVal3_C2=tmpDIN99.getB99Value();
                            break;

                        default:
                        console.log("Error at the colorpicker_MouseClick function");
                    }
   }
   else{

         switch(colorspaceModus){
                        case "rgb":
                            var tmpRGB = new classColor_RGB(colorVal1_C1/255,colorVal2_C1/255,colorVal3_C1/255);
                            var tmpHSV = tmpRGB.calcHSVColor();
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpRGB = tmpHSV.calcRGBColor();
                            colorVal1_C1= tmpRGB.getRValue()*255;
                            colorVal2_C1= tmpRGB.getGValue()*255;
                            colorVal3_C1= tmpRGB.getBValue()*255;
                            colorVal1_C2= tmpRGB.getRValue()*255;
                            colorVal2_C2= tmpRGB.getGValue()*255;
                            colorVal3_C2= tmpRGB.getBValue()*255;
                            break;
                        case "hsv": 
                            var tmpHSV = new classColor_HSV(colorVal1_C1, colorVal2_C1, newV);
                            colorVal1_C1=tmpHSV.getHValue();
                            colorVal2_C1=tmpHSV.getSValue();
                            colorVal3_C1=tmpHSV.getVValue();
                            colorVal1_C2=tmpHSV.getHValue();
                            colorVal2_C2=tmpHSV.getSValue();
                            colorVal3_C2=tmpHSV.getVValue();
                            break;
                        case "lab": 
                            var tmpLAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                            var tmpHSV = tmpLAB.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpLAB = tmpHSV.calcCIELabColor();
                            colorVal1_C1=tmpLAB.getLValue();
                            colorVal2_C1=tmpLAB.getAValue();
                            colorVal3_C1=tmpLAB.getBValue();
                            colorVal1_C2=tmpLAB.getLValue();
                            colorVal2_C2=tmpLAB.getAValue();
                            colorVal3_C2=tmpLAB.getBValue();
                            break;
                        case "din99":
                            var tmpDIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                            var tmpHSV = tmpDIN99.calcHSVColor();
                            if(tmpHSV.getVValue()==0)
                                tmpHSV.setVValue(0.00001);
                            tmpHSV = new classColor_HSV(tmpHSV.getHValue(), tmpHSV.getSValue(), newV);
                            tmpDIN99 = tmpHSV.calcDIN99Color(kE,kCH);
                            colorVal1_C1=tmpDIN99.getL99Value();
                            colorVal2_C1=tmpDIN99.getA99Value();
                            colorVal3_C1=tmpDIN99.getB99Value();
                            colorVal1_C2=tmpDIN99.getL99Value();
                            colorVal2_C2=tmpDIN99.getA99Value();
                            colorVal3_C2=tmpDIN99.getB99Value();
                            break;

                        default:
                        console.log("Error at the colorpicker_MouseClick function");
                    }
   }

    document.getElementById("id_color1_First").value = colorVal1_C1;
    document.getElementById("id_color1_Second").value = colorVal2_C1;
    document.getElementById("id_color1_Third").value = colorVal3_C1;
    document.getElementById("id_color2_First").value = colorVal1_C2;
    document.getElementById("id_color2_Second").value = colorVal2_C2;
    document.getElementById("id_color2_Third").value = colorVal3_C2;

    grapedC1Circle =false;
    grapedC2Circle =true;
    drawColorCircles();
    updateCreatorBand();

}