function expandTable(){

    if(tableIsExpand){
        document.getElementById("id_table_workwindow").style.width = 0+"%";
        document.getElementById("id_table_workwindow").style.display = "none";
        tableIsExpand=false;
    }
    else{
        document.getElementById("id_table_workwindow").style.width = 27+"cm";
        document.getElementById("id_table_workwindow").style.display = "initial";
        tableIsExpand=true;
    }

    drawColorCircles();
}


///////////////////////////////
//// switch colorspace //////
///////////////////////////////

function changeColorspace(type){

    document.getElementById("button_RGB").style.border = "2px solid white";
    document.getElementById("button_RGB").style.color = "white";
    document.getElementById("button_HSV").style.border = "2px solid white";
    document.getElementById("button_HSV").style.color = "white";
    document.getElementById("button_LAB").style.border = "2px solid white";
    document.getElementById("button_LAB").style.color = "white";
    document.getElementById("button_DIN99").style.border = "2px solid white";
    document.getElementById("button_DIN99").style.color = "white";



    switch(type){
        case 0:
            switch(colorspaceModus){
                case "rgb": 
                return;
                case "hsv": 
                    var tmpC1HSV = new classColor_HSV(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2HSV = new classColor_HSV(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    var tmpC1RGB = tmpC1HSV.calcRGBColor();
                    var tmpC2RGB = tmpC2HSV.calcRGBColor();
                    colorVal1_C1 = tmpC1RGB.getRValue()*255;
                    colorVal2_C1 = tmpC1RGB.getGValue()*255;
                    colorVal3_C1 = tmpC1RGB.getBValue()*255;
                    colorVal1_C2 = tmpC2RGB.getRValue()*255;
                    colorVal2_C2 = tmpC2RGB.getGValue()*255;
                    colorVal3_C2 = tmpC2RGB.getBValue()*255;
                break;
                case "lab":  
                    var tmpC1LAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2LAB = new classColorCIELab(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    var tmpC1RGB = tmpC1LAB.calcRGB();
                    var tmpC2RGB = tmpC2LAB.calcRGB();
                    colorVal1_C1 = tmpC1RGB.getRValue()*255;
                    colorVal2_C1 = tmpC1RGB.getGValue()*255;
                    colorVal3_C1 = tmpC1RGB.getBValue()*255;
                    colorVal1_C2 = tmpC2RGB.getRValue()*255;
                    colorVal2_C2 = tmpC2RGB.getGValue()*255;
                    colorVal3_C2 = tmpC2RGB.getBValue()*255;            
                break;
                case "din99": 
                    var tmpC1DIN99 = new classColor_DIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2DIN99 = new classColor_DIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    var tmpC1RGB = tmpC1DIN99.calcRGBColor();
                    var tmpC2RGB = tmpC2DIN99.calcRGBColor();
                    colorVal1_C1 = tmpC1RGB.getRValue()*255;
                    colorVal2_C1 = tmpC1RGB.getGValue()*255;
                    colorVal3_C1 = tmpC1RGB.getBValue()*255;
                    colorVal1_C2 = tmpC2RGB.getRValue()*255;
                    colorVal2_C2 = tmpC2RGB.getGValue()*255;
                    colorVal3_C2 = tmpC2RGB.getBValue()*255;
                break;
                default:
                console.log("Error at the changeColorspace function");
            }
        colorspaceModus="rgb";
        document.getElementById("button_RGB").style.border = "2px solid yellow";
        document.getElementById("button_RGB").style.color = "yellow";
        document.getElementById("id_color1_FirstLabel").innerHTML = "R:";
        document.getElementById("id_color1_SecondLabel").innerHTML = "G:";
        document.getElementById("id_color1_ThirdLabel").innerHTML = "B:";
        document.getElementById("id_color2_FirstLabel").innerHTML = "R:";
        document.getElementById("id_color2_SecondLabel").innerHTML = "G:";
        document.getElementById("id_color2_ThirdLabel").innerHTML = "B:";

        break;
        case 1:
            switch(colorspaceModus){
                case "rgb": 
                    var tmpC1RGB = new classColor_RGB((colorVal1_C1/255),(colorVal2_C1/255),(colorVal3_C1/255));
                    var tmpC2RGB = new classColor_RGB((colorVal1_C2/255),(colorVal2_C2/255),(colorVal3_C2/255));
                    var tmpC1HSV = tmpC1RGB.calcHSVColor();
                    var tmpC2HSV = tmpC2RGB.calcHSVColor();
                    colorVal1_C1 = tmpC1HSV.getHValue();
                    colorVal2_C1 = tmpC1HSV.getSValue();
                    colorVal3_C1 = tmpC1HSV.getVValue();
                    colorVal1_C2 = tmpC2HSV.getHValue();
                    colorVal2_C2 = tmpC2HSV.getSValue();
                    colorVal3_C2 = tmpC2HSV.getVValue();
                break;
                case "hsv": 
                return;
                case "lab":  
                    var tmpC1LAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2LAB = new classColorCIELab(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    var tmpC1HSV = tmpC1LAB.calcHSVColor();
                    var tmpC2HSV = tmpC2LAB.calcHSVColor();
                    colorVal1_C1 = tmpC1HSV.getHValue();
                    colorVal2_C1 = tmpC1HSV.getSValue();
                    colorVal3_C1 = tmpC1HSV.getVValue();
                    colorVal1_C2 = tmpC2HSV.getHValue();
                    colorVal2_C2 = tmpC2HSV.getSValue();
                    colorVal3_C2 = tmpC2HSV.getVValue();             
                break;
                case "din99": 
                    var tmpC1DIN99 = new classColor_DIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2DIN99 = new classColor_DIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    var tmpC1HSV = tmpC1DIN99.calcHSVColor();
                    var tmpC2HSV = tmpC2DIN99.calcHSVColor();
                    colorVal1_C1 = tmpC1HSV.getHValue();
                    colorVal2_C1 = tmpC1HSV.getSValue();
                    colorVal3_C1 = tmpC1HSV.getVValue();
                    colorVal1_C2 = tmpC2HSV.getHValue();
                    colorVal2_C2 = tmpC2HSV.getSValue();
                    colorVal3_C2 = tmpC2HSV.getVValue(); 
                break;
                default:
                console.log("Error at the changeColorspace function");
            }
        colorspaceModus="hsv";
        document.getElementById("button_HSV").style.border = "2px solid yellow";
        document.getElementById("button_HSV").style.color = "yellow";
        document.getElementById("id_color1_FirstLabel").innerHTML = "H:";
        document.getElementById("id_color1_SecondLabel").innerHTML = "S:";
        document.getElementById("id_color1_ThirdLabel").innerHTML = "V:";
        document.getElementById("id_color2_FirstLabel").innerHTML = "H:";
        document.getElementById("id_color2_SecondLabel").innerHTML = "S:";
        document.getElementById("id_color2_ThirdLabel").innerHTML = "V:";
        break;
        case 2:
             switch(colorspaceModus){
                case "rgb": 
                    var tmpC1RGB = new classColor_RGB((colorVal1_C1/255),(colorVal2_C1/255),(colorVal3_C1/255));
                    var tmpC2RGB = new classColor_RGB((colorVal1_C2/255),(colorVal2_C2/255),(colorVal3_C2/255));
                    var tmpC1LAB = tmpC1RGB.calcCIELabColor();
                    var tmpC2LAB = tmpC2RGB.calcCIELabColor();
                    colorVal1_C1 = tmpC1LAB.getLValue();
                    colorVal2_C1 = tmpC1LAB.getAValue();
                    colorVal3_C1 = tmpC1LAB.getBValue();
                    colorVal1_C2 = tmpC2LAB.getLValue();
                    colorVal2_C2 = tmpC2LAB.getAValue();
                    colorVal3_C2 = tmpC2LAB.getBValue();
                break;
                case "hsv": 
                    var tmpC1HSV = new classColor_HSV(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2HSV = new classColor_HSV(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    var tmpC1LAB = tmpC1HSV.calcCIELabColor();
                    var tmpC2LAB = tmpC2HSV.calcCIELabColor();
                    colorVal1_C1 = tmpC1LAB.getLValue();
                    colorVal2_C1 = tmpC1LAB.getAValue();
                    colorVal3_C1 = tmpC1LAB.getBValue();
                    colorVal1_C2 = tmpC2LAB.getLValue();
                    colorVal2_C2 = tmpC2LAB.getAValue();
                    colorVal3_C2 = tmpC2LAB.getBValue();         
                break;
                case "lab":  
                return;
                case "din99": 
                    var tmpC1DIN99 = new classColor_DIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2DIN99 = new classColor_DIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    var tmpC1LAB = tmpC1DIN99.calcLABColor();
                    var tmpC2LAB = tmpC2DIN99.calcLABColor();
                    colorVal1_C1 = tmpC1LAB.getLValue();
                    colorVal2_C1 = tmpC1LAB.getAValue();
                    colorVal3_C1 = tmpC1LAB.getBValue();
                    colorVal1_C2 = tmpC2LAB.getLValue();
                    colorVal2_C2 = tmpC2LAB.getAValue();
                    colorVal3_C2 = tmpC2LAB.getBValue();
                break;
                default:
                console.log("Error at the changeColorspace function");
            }
        colorspaceModus="lab";
        document.getElementById("button_LAB").style.border = "2px solid yellow";
        document.getElementById("button_LAB").style.color = "yellow";
        document.getElementById("id_color1_FirstLabel").innerHTML = "L:";
        document.getElementById("id_color1_SecondLabel").innerHTML = "A:";
        document.getElementById("id_color1_ThirdLabel").innerHTML = "B:";
        document.getElementById("id_color2_FirstLabel").innerHTML = "L:";
        document.getElementById("id_color2_SecondLabel").innerHTML = "A:";
        document.getElementById("id_color2_ThirdLabel").innerHTML = "B:";
        break;
        case 3:
            switch(colorspaceModus){
                case "rgb": 
                    var tmpC1RGB = new classColor_RGB((colorVal1_C1/255),(colorVal2_C1/255),(colorVal3_C1/255));
                    var tmpC2RGB = new classColor_RGB((colorVal1_C2/255),(colorVal2_C2/255),(colorVal3_C2/255));
                    var tmpC1DIN99 = tmpC1RGB.calcHSVColor();
                    var tmpC2DIN99 = tmpC2RGB.calcHSVColor();
                    colorVal1_C1 = tmpC1DIN99.getL99Value();
                    colorVal2_C1 = tmpC1DIN99.getA99Value();
                    colorVal3_C1 = tmpC1DIN99.getB99Value();
                    colorVal1_C2 = tmpC2DIN99.getL99Value();
                    colorVal2_C2 = tmpC2DIN99.getA99Value();
                    colorVal3_C2 = tmpC2DIN99.getB99Value(); 
                break;
                case "hsv": 
                    var tmpC1HSV = new classColor_HSV(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2HSV = new classColor_HSV(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    var tmpC1DIN99 = tmpC1HSV.calcLABColor();
                    var tmpC2DIN99 = tmpC2HSV.calcLABColor();
                    colorVal1_C1 = tmpC1DIN99.getL99Value();
                    colorVal2_C1 = tmpC1DIN99.getA99Value();
                    colorVal3_C1 = tmpC1DIN99.getB99Value();
                    colorVal1_C2 = tmpC2DIN99.getL99Value();
                    colorVal2_C2 = tmpC2DIN99.getA99Value();
                    colorVal3_C2 = tmpC2DIN99.getB99Value();          
                break;
                case "lab":  
                    var tmpC1LAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2LAB = new classColorCIELab(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                    var tmpC1DIN99 = tmpC1LAB.calcLABColor();
                    var tmpC2DIN99 = tmpC2LAB.calcLABColor();
                    colorVal1_C1 = tmpC1DIN99.getL99Value();
                    colorVal2_C1 = tmpC1DIN99.getA99Value();
                    colorVal3_C1 = tmpC1DIN99.getB99Value();
                    colorVal1_C2 = tmpC2DIN99.getL99Value();
                    colorVal2_C2 = tmpC2DIN99.getA99Value();
                    colorVal3_C2 = tmpC2DIN99.getB99Value();
                break;
                case "din99": 
                return;
                default:
                console.log("Error at the changeColorspace function");
            }
        colorspaceModus="din99";
        document.getElementById("button_DIN99").style.border = "2px solid yellow";
        document.getElementById("button_DIN99").style.color = "yellow";
        document.getElementById("id_color1_FirstLabel").innerHTML = "L99:";
        document.getElementById("id_color1_SecondLabel").innerHTML = "A99:";
        document.getElementById("id_color1_ThirdLabel").innerHTML = "B99:";
        document.getElementById("id_color2_FirstLabel").innerHTML = "L99:";
        document.getElementById("id_color2_SecondLabel").innerHTML = "A99:";
        document.getElementById("id_color2_ThirdLabel").innerHTML = "B99:";
        break;
        default:
        return;
    }


    document.getElementById("id_color1_First").value = colorVal1_C1;
    document.getElementById("id_color1_Second").value = colorVal2_C1;
    document.getElementById("id_color1_Third").value = colorVal3_C1;
    document.getElementById("id_color2_First").value = colorVal1_C2;
    document.getElementById("id_color2_Second").value = colorVal2_C2;
    document.getElementById("id_color2_Third").value = colorVal3_C2;
    drawExistingColormaps();

}

