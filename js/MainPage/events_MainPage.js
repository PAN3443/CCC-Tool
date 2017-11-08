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
//// switch band type //////
///////////////////////////////

function changeBandType(){
    
   if(document.getElementById("radiobutton_ScaledBand").checked == false){

            colorVal1_C2= parseFloat(document.getElementById("id_color1_First").value);
            document.getElementById("id_color2_First").value= document.getElementById("id_color1_First").value;
            
            colorVal2_C2= parseFloat(document.getElementById("id_color1_Second").value);
            document.getElementById("id_color2_Second").value= document.getElementById("id_color1_Second").value;
               
            colorVal3_C2= parseFloat(document.getElementById("id_color1_Third").value);
            document.getElementById("id_color2_Third").value= document.getElementById("id_color1_Third").value;
              
            colorVal1_C1= parseFloat(document.getElementById("id_color2_First").value);
            document.getElementById("id_color1_First").value= document.getElementById("id_color2_First").value;
               
            colorVal2_C1= parseFloat(document.getElementById("id_color2_Second").value);
            document.getElementById("id_color1_Second").value= document.getElementById("id_color2_Second").value;
               
            colorVal3_C1= parseFloat(document.getElementById("id_color2_Third").value);
            document.getElementById("id_color1_Third").value= document.getElementById("id_color2_Third").value;
            
      
    } 

    drawColorCircles();
    updateCreatorBand();
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
                    var tmpC1DIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2DIN99 = new classColorDIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
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
                    var tmpC1DIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2DIN99 = new classColorDIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
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
                    var tmpC1DIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC2DIN99 = new classColorDIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
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
                    var tmpC1DIN99 = tmpC1RGB.calcDIN99Color(kE,kCH);
                    var tmpC2DIN99 = tmpC2RGB.calcDIN99Color(kE,kCH);
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
                    var tmpC1DIN99 = tmpC1HSV.calcDIN99Color(kE,kCH);
                    var tmpC2DIN99 = tmpC2HSV.calcDIN99Color(kE,kCH);
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
                    var tmpC1DIN99 = tmpC1LAB.calcDIN99Color(kE,kCH);
                    var tmpC2DIN99 = tmpC2LAB.calcDIN99Color(kE,kCH);
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
    updateCreatorBand();
}


//////////////////////////////
///// change color input /////
//////////////////////////////

function insertColor(e){

    switch(colorspaceModus){
                case "rgb":
                    checkInputVal(document.getElementById(e.target.id),true,false);

                    if(parseFloat(document.getElementById(e.target.id).value)>255){
                        document.getElementById(e.target.id).value = 255;
                    }

                    if(parseFloat(document.getElementById(e.target.id).value)<0){
                        document.getElementById(e.target.id).value = 0;
                    }

                break;
                case "hsv": 
                   checkInputVal(document.getElementById(e.target.id),true,false);

                   if(parseFloat(document.getElementById(e.target.id).value)>1){
                        document.getElementById(e.target.id).value = 1;
                   }

                   if(parseFloat(document.getElementById(e.target.id).value)<0){
                        document.getElementById(e.target.id).value = 0;
                   }
                break;
                case "lab":  
                    if(e.target.id==="id_color1_First" || e.target.id==="id_color2_First"){
                        checkInputVal(document.getElementById(e.target.id),true,false);

                        if(parseFloat(document.getElementById(e.target.id).value)>100){
                        document.getElementById(e.target.id).value = 100;
                        }

                        if(parseFloat(document.getElementById(e.target.id).value)<0){
                            document.getElementById(e.target.id).value = 0;
                        }
                    }
                    else{
                        checkInputVal(document.getElementById(e.target.id),true,true);
                    }

                break;
                case "din99": 
                    if(e.target.id==="id_color1_First" || e.target.id==="id_color2_First"){
                        checkInputVal(document.getElementById(e.target.id),true,false);

                        if(parseFloat(document.getElementById(e.target.id).value)>100){
                        document.getElementById(e.target.id).value = 100;
                        }

                        if(parseFloat(document.getElementById(e.target.id).value)<0){
                            document.getElementById(e.target.id).value = 0;
                        }
                    }
                    else{
                        checkInputVal(document.getElementById(e.target.id),true,true);
                    }
                    
                break;
                default:
                console.log("Error at the changeColorspace function");
    }


   if (e.keyCode == 13) {

    if(document.getElementById("radiobutton_ScaledBand").checked == true){

       switch(e.target.id){
                case "id_color1_First":
                colorVal1_C1= parseFloat(document.getElementById("id_color1_First").value);
                break;
                case "id_color1_Second":
                colorVal2_C1= parseFloat(document.getElementById("id_color1_Second").value);
                break;
                case "id_color1_Third":
                colorVal3_C1= parseFloat(document.getElementById("id_color1_Third").value);
                break;
                case "id_color2_First":
                colorVal1_C2= parseFloat(document.getElementById("id_color2_First").value);
                break;
                case "id_color2_Second":
                colorVal2_C2= parseFloat(document.getElementById("id_color2_Second").value);
                break;
                case "id_color2_Third":
                colorVal3_C2= parseFloat(document.getElementById("id_color2_Third").value);
                break;
                default:
                //
       }
    }
    else{
        switch(e.target.id){
                case "id_color1_First":
                colorVal1_C1= parseFloat(document.getElementById("id_color1_First").value);
                colorVal1_C2= parseFloat(document.getElementById("id_color1_First").value);
                document.getElementById("id_color2_First").value= document.getElementById("id_color1_First").value;
                break;
                case "id_color1_Second":
                colorVal2_C1= parseFloat(document.getElementById("id_color1_Second").value);
                colorVal2_C2= parseFloat(document.getElementById("id_color1_Second").value);
                document.getElementById("id_color2_Second").value= document.getElementById("id_color1_Second").value;
                break;
                case "id_color1_Third":
                colorVal3_C1= parseFloat(document.getElementById("id_color1_Third").value);
                colorVal3_C2= parseFloat(document.getElementById("id_color1_Third").value);
                document.getElementById("id_color2_Third").value= document.getElementById("id_color1_Third").value;
                break;
                case "id_color2_First":
                colorVal1_C2= parseFloat(document.getElementById("id_color2_First").value);
                colorVal1_C1= parseFloat(document.getElementById("id_color2_First").value);
                document.getElementById("id_color1_First").value= document.getElementById("id_color2_First").value;
                break;
                case "id_color2_Second":
                colorVal2_C2= parseFloat(document.getElementById("id_color2_Second").value);
                colorVal2_C1= parseFloat(document.getElementById("id_color2_Second").value);
                document.getElementById("id_color1_Second").value= document.getElementById("id_color2_Second").value;
                break;
                case "id_color2_Third":
                colorVal3_C2= parseFloat(document.getElementById("id_color2_Third").value);
                colorVal3_C1= parseFloat(document.getElementById("id_color2_Third").value);
                document.getElementById("id_color1_Third").value= document.getElementById("id_color2_Third").value;
                break;
                default:
                //
       }

    }

       drawColorCircles();
       updateCreatorBand();
       
   }
  
}

function insertColorChange(e){

    switch(colorspaceModus){
                case "rgb":
                    checkInputVal(document.getElementById(e.target.id),true,false);

                    if(parseFloat(document.getElementById(e.target.id).value)>255){
                        document.getElementById(e.target.id).value = 255;
                    }

                    if(parseFloat(document.getElementById(e.target.id).value)<0){
                        document.getElementById(e.target.id).value = 0;
                    }

                break;
                case "hsv": 
                   checkInputVal(document.getElementById(e.target.id),true,false);

                   if(parseFloat(document.getElementById(e.target.id).value)>1){
                        document.getElementById(e.target.id).value = 1;
                   }

                   if(parseFloat(document.getElementById(e.target.id).value)<0){
                        document.getElementById(e.target.id).value = 0;
                   }
                break;
                case "lab":  
                    if(e.target.id==="id_color1_First" || e.target.id==="id_color2_First"){
                        checkInputVal(document.getElementById(e.target.id),true,false);

                        if(parseFloat(document.getElementById(e.target.id).value)>100){
                        document.getElementById(e.target.id).value = 100;
                        }

                        if(parseFloat(document.getElementById(e.target.id).value)<0){
                            document.getElementById(e.target.id).value = 0;
                        }
                    }
                    else{
                        checkInputVal(document.getElementById(e.target.id),true,true);
                    }

                break;
                case "din99": 
                    if(e.target.id==="id_color1_First" || e.target.id==="id_color2_First"){
                        checkInputVal(document.getElementById(e.target.id),true,false);

                        if(parseFloat(document.getElementById(e.target.id).value)>100){
                        document.getElementById(e.target.id).value = 100;
                        }

                        if(parseFloat(document.getElementById(e.target.id).value)<0){
                            document.getElementById(e.target.id).value = 0;
                        }
                    }
                    else{
                        checkInputVal(document.getElementById(e.target.id),true,true);
                    }
                    
                break;
                default:
                console.log("Error at the changeColorspace function");
    }

    if(document.getElementById("radiobutton_ScaledBand").checked == true){

       switch(e.target.id){
                case "id_color1_First":
                colorVal1_C1= parseFloat(document.getElementById("id_color1_First").value);
                break;
                case "id_color1_Second":
                colorVal2_C1= parseFloat(document.getElementById("id_color1_Second").value);
                break;
                case "id_color1_Third":
                colorVal3_C1= parseFloat(document.getElementById("id_color1_Third").value);
                break;
                case "id_color2_First":
                colorVal1_C2= parseFloat(document.getElementById("id_color2_First").value);
                break;
                case "id_color2_Second":
                colorVal2_C2= parseFloat(document.getElementById("id_color2_Second").value);
                break;
                case "id_color2_Third":
                colorVal3_C2= parseFloat(document.getElementById("id_color2_Third").value);
                break;
                default:
                //
       }
    }
    else{
        switch(e.target.id){
                case "id_color1_First":
                colorVal1_C1= parseFloat(document.getElementById("id_color1_First").value);
                colorVal1_C2= parseFloat(document.getElementById("id_color1_First").value);
                document.getElementById("id_color2_First").value= document.getElementById("id_color1_First").value;
                break;
                case "id_color1_Second":
                colorVal2_C1= parseFloat(document.getElementById("id_color1_Second").value);
                colorVal2_C2= parseFloat(document.getElementById("id_color1_Second").value);
                document.getElementById("id_color2_Second").value= document.getElementById("id_color1_Second").value;
                break;
                case "id_color1_Third":
                colorVal3_C1= parseFloat(document.getElementById("id_color1_Third").value);
                colorVal3_C2= parseFloat(document.getElementById("id_color1_Third").value);
                document.getElementById("id_color2_Third").value= document.getElementById("id_color1_Third").value;
                break;
                case "id_color2_First":
                colorVal1_C2= parseFloat(document.getElementById("id_color2_First").value);
                colorVal1_C1= parseFloat(document.getElementById("id_color2_First").value);
                document.getElementById("id_color1_First").value= document.getElementById("id_color2_First").value;
                break;
                case "id_color2_Second":
                colorVal2_C2= parseFloat(document.getElementById("id_color2_Second").value);
                colorVal2_C1= parseFloat(document.getElementById("id_color2_Second").value);
                document.getElementById("id_color1_Second").value= document.getElementById("id_color2_Second").value;
                break;
                case "id_color2_Third":
                colorVal3_C2= parseFloat(document.getElementById("id_color2_Third").value);
                colorVal3_C1= parseFloat(document.getElementById("id_color2_Third").value);
                document.getElementById("id_color1_Third").value= document.getElementById("id_color2_Third").value;
                break;
                default:
                //
       }
    }

    drawColorCircles();
    updateCreatorBand();

  
}

                    

function updateCreatorBand(){
    var canvasObject = document.getElementById("id_creatorBand");
    var resolutionX = 400;
    var resolutionY = 75;

    $("#id_creatorBand").attr("width", resolutionX+"px");
    $("#id_creatorBand").attr("height", resolutionY+"px"); 

    var canvasContex = canvasObject.getContext("2d");
    //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
    var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);

    switch(colorspaceModus){
                case "rgb":;
                    var tmpC1RGB = new classColor_RGB((colorVal1_C1/255),(colorVal2_C1/255),(colorVal3_C1/255));

                    if(document.getElementById("radiobutton_ScaledBand").checked == true){
                        var tmpC2RGB = new classColor_RGB((colorVal1_C2/255),(colorVal2_C2/255),(colorVal3_C2/255));
                        canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                        document.getElementById("id_creatorBandC1").style.background = tmpC1RGB.getRGBString();
                        document.getElementById("id_creatorBandC2").style.background = tmpC2RGB.getRGBString();
                    }
                    else{
                        canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, tmpC1RGB, resolutionX);
                        document.getElementById("id_creatorBandC1").style.background = tmpC1RGB.getRGBString();
                        document.getElementById("id_creatorBandC2").style.background = tmpC1RGB.getRGBString();
                    }

                break;
                case "hsv": 
                    var tmpC1HSV = new classColor_HSV(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC1RGB = tmpC1HSV.calcRGBColor();
                    if(document.getElementById("radiobutton_ScaledBand").checked == true){
                        var tmpC2HSV = new classColor_HSV(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                        var tmpC2RGB = tmpC2HSV.calcRGBColor();
                        canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, tmpC1HSV, tmpC2HSV, resolutionX);
                        document.getElementById("id_creatorBandC1").style.background = tmpC1RGB.getRGBString();
                        document.getElementById("id_creatorBandC2").style.background = tmpC2RGB.getRGBString();

                    }
                    else{
                        canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, tmpC1HSV, resolutionX);
                        document.getElementById("id_creatorBandC1").style.background = tmpC1RGB.getRGBString();
                        document.getElementById("id_creatorBandC2").style.background = tmpC1RGB.getRGBString();
                    }

                break;
                case "lab":  
                
                    var tmpC1LAB = new classColorCIELab(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    var tmpC1RGB = tmpC1LAB.calcRGB();
                    
                    if(document.getElementById("radiobutton_ScaledBand").checked == true){
                        var tmpC2LAB = new classColorCIELab(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                        var tmpC2RGB = tmpC2LAB.calcRGB();
                        canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, tmpC1LAB, tmpC2LAB, resolutionX);
                        document.getElementById("id_creatorBandC1").style.background = tmpC1RGB.getRGBString();
                        document.getElementById("id_creatorBandC2").style.background = tmpC2RGB.getRGBString();
                    }
                    else{
                        canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, tmpC1LAB, resolutionX);
                        document.getElementById("id_creatorBandC1").style.background = tmpC1RGB.getRGBString();
                        document.getElementById("id_creatorBandC2").style.background = tmpC1RGB.getRGBString();
                    }

                break;
                case "din99":
                    var tmpC1DIN99 = new classColorDIN99(colorVal1_C1,colorVal2_C1,colorVal3_C1);
                    
                    var tmpC1RGB = tmpC1DIN99.calcRGBColor();
                    

                    if(document.getElementById("radiobutton_ScaledBand").checked == true){
                        var tmpC2DIN99 = new classColorDIN99(colorVal1_C2,colorVal2_C2,colorVal3_C2);
                        var tmpC2RGB = tmpC2DIN99.calcRGBColor(); 
                        canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, tmpC1DIN99, tmpC2DIN99, resolutionX);
                        document.getElementById("id_creatorBandC1").style.background = tmpC1RGB.getRGBString();
                        document.getElementById("id_creatorBandC2").style.background = tmpC2RGB.getRGBString();
                    }
                    else{
                        canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, tmpC1DIN99, resolutionX);
                        document.getElementById("id_creatorBandC1").style.background = tmpC1RGB.getRGBString();
                        document.getElementById("id_creatorBandC2").style.background = tmpC1RGB.getRGBString();
                    }
                break;
                default:
                console.log("Error at the changeColorspace function");
    }

    canvasContex.putImageData(canvasData, 0, 0);
}


    
    