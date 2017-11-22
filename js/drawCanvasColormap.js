/////////////////////////////////////////////////////////////////////////////////////////////
//// Colormap
//////////////////////////////////////////////////////////////////////////////////////////////

function drawCanvasColormap(canvasID,resolutionX, resolutionY, tmpColormap){ //1920,150
    
    // start 
    var canvasObject = document.getElementById(canvasID);

    $("#"+canvasID).attr("width", resolutionX+"px");
    $("#"+canvasID).attr("height", resolutionY+"px"); 

    var canvasContex = canvasObject.getContext("2d");
    //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
    var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);

        /////////////////////////////////////////////////////////

        var colormapWidth = resolutionX;
        var xPos = 0;
        var yPos = 0;
        var colormapHeigth = resolutionY;

        var twinStarted = false;
        var leftStarted = false;

        // draw colormap
        for(var i = 0; i<tmpColormap.getNumColors(); i++){
            
            var tmpKey = tmpColormap.getKey(i);
              switch(tmpKey) {
                case "nil key": 
                    
                    var pos1 = (tmpColormap.getPosition(i)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;
                    var pos2 = (tmpColormap.getPosition(i+1)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;
                    var elementwidth = pos2-pos1;

                    switch(colorspaceModus){
                            case "rgb": 
                            canvasData = createConstantBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getRGBColor(i), resolutionX);
                            break;
                            case "hsv": 
                            canvasData = createConstantBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getHSVColor(i), resolutionX);
                            break;
                            case "lab": 
                            canvasData = createConstantBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getLabColor(i), resolutionX);                    
                            break;
                            case "din99":
                            canvasData = createConstantBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getDIN99Color(i), resolutionX); 
                            break;
                            default:
                            colorspaceModus="rgb";
                            canvasData = createConstantBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getRGBColor(i), resolutionX);
                    }
                    break;
                case "twin key":
                    
                    if(twinStarted==true){               
                     

                        var pos1 = (tmpColormap.getPosition(i)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;
                        var pos2 = (tmpColormap.getPosition(i+1)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;
                        var elementwidth = pos2-pos1;

                        switch(colorspaceModus){
                                case "rgb": 
                                canvasData = createScaledBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getRGBColor(i), tmpColormap.getRGBColor(i+1), resolutionX);
                                break;
                                case "hsv": 
                                canvasData = createScaledBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getHSVColor(i), tmpColormap.getHSVColor(i+1), resolutionX);
                                break;
                                case "lab": 
                                canvasData = createScaledBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getLabColor(i), tmpColormap.getLabColor(i+1), resolutionX);                
                                break;
                                case "din99": 
                                canvasData = createScaledBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getDIN99Color(i), tmpColormap.getDIN99Color(i+1), resolutionX);
                                break;
                                default:
                                colorspaceModus="rgb";
                                canvasData = createScaledBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getRGBColor(i), tmpColormap.getRGBColor(i+1), resolutionX);       
                        }
                        twinStarted=false;
                    }
                    else{


                        twinStarted=true;
                    }     
                    break;
                case "left key":
                    if(leftStarted==true){

                        var pos1 = (tmpColormap.getPosition(i)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;
                        var pos2 = (tmpColormap.getPosition(i+1)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;
                        var elementwidth = pos2-pos1;

                        switch(colorspaceModus){
                            case "rgb": 
                            canvasData = createConstantBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getRGBColor(i), resolutionX);
                            break;
                            case "hsv": 
                            canvasData = createConstantBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getHSVColor(i), resolutionX);
                            break;
                            case "lab": 
                            canvasData = createConstantBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getLabColor(i), resolutionX);                    
                            break;
                            case "din99":
                            canvasData = createConstantBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getDIN99Color(i), resolutionX); 
                            break;
                            default:
                            colorspaceModus="rgb";
                            canvasData = createConstantBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getRGBColor(i), resolutionX);
                    }

                        leftStarted=false;
                        
                    }
                    else{
                        leftStarted=true;
                    }
                    break;
                default:
                        
                        var pos1 = (tmpColormap.getPosition(i)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;
                        var pos2 = (tmpColormap.getPosition(i+1)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;
                        var elementwidth = pos2-pos1; 
                        switch(colorspaceModus){
                                case "rgb": 
                                canvasData = createScaledBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getRGBColor(i), tmpColormap.getRGBColor(i+1), resolutionX);
                                break;
                                case "hsv": 
                                canvasData = createScaledBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getHSVColor(i), tmpColormap.getHSVColor(i+1), resolutionX);
                                break;
                                case "lab": 
                                canvasData = createScaledBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getLabColor(i), tmpColormap.getLabColor(i+1), resolutionX);                
                                break;
                                case "din99": 
                                canvasData = createScaledBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getDIN99Color(i), tmpColormap.getDIN99Color(i+1), resolutionX);
                                break;
                                default:
                                colorspaceModus="rgb";
                                canvasData = createScaledBand(canvasData, xPos+pos1, elementwidth, colormapHeigth, tmpColormap.getRGBColor(i), tmpColormap.getRGBColor(i+1), resolutionX);       
                        }
            }
            
        }
        canvasContex.putImageData(canvasData, 0, 0);
        canvasContex.lineWidth = 2;
        canvasContex.strokeStyle = 'rgb(0,0,0)';
        canvasContex.strokeRect(0,0, colormapWidth, colormapHeigth);

        
}


function createScaledBand(canvasData, xStart, bandWidth, bandHeight, color1, color2, canvasWidth){

    xStart = Math.round(xStart);
    bandWidth = Math.round(bandWidth);
    bandHeight = Math.round(bandHeight);

    switch(colorspaceModus){
        case "rgb":  
                for(var x=xStart; x<xStart+bandWidth;x++){
                   
                    var tmpRatio = (x-xStart)/bandWidth;
                                          
                    var rValue = color1.getRValue()+(color2.getRValue() - color1.getRValue())*tmpRatio;
                    var gValue = color1.getGValue()+(color2.getGValue() - color1.getGValue())*tmpRatio;
                    var bValue = color1.getBValue()+(color2.getBValue() - color1.getBValue())*tmpRatio;
                                            
                    var tmpCurrentColor = new classColor_RGB(rValue,gValue,bValue); 
 
                    for(var y=0; y<bandHeight;y++){
                            var index = (x + y * canvasWidth) * 4;
                            canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue()*255); // r
                            canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue()*255); // g
                            canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue()*255); // b
                            canvasData.data[index + 3] = 255; //a  
 
                    }
       
                }

        break;
        case "hsv": 

            var tmpDis = color1.getSValue()*50; // radius 50; center(0,0,0);
            var tmpRad = (color1.getHValue()*Math.PI*2)-Math.PI;
            var xPos = tmpDis*Math.cos(tmpRad);
            var yPos = tmpDis*Math.sin(tmpRad);
            var zPos = color1.getVValue()-50;

            var tmpDis2 = color2.getSValue()*50;
            var tmpRad2 = (color2.getHValue()*Math.PI*2)-Math.PI;
            var xPos2 = tmpDis2*Math.cos(tmpRad2);
            var yPos2 = tmpDis2*Math.sin(tmpRad2);
            var zPos2 = color2.getVValue()-50;


            for(var x=xStart; x<xStart+bandWidth;x++){

                    var tmpRatio = (x-xStart)/bandWidth;

                    var tmpX = xPos+(xPos2 - xPos)*tmpRatio;
                    var tmpY = yPos+(yPos2 - yPos)*tmpRatio;
                    var tmpZ = zPos+(zPos2 - zPos)*tmpRatio;
                                            
                    var tmpH =(Math.atan2(tmpY,tmpX)+Math.PI)/(Math.PI*2);
                    var tmpS = Math.sqrt(Math.pow(tmpX,2)+Math.pow(tmpY,2))/50;
                    var tmpV = tmpZ+50;
                    var tmpCurrentHSVColor = new classColor_HSV(tmpH,tmpS,tmpV);
             
                    var tmpCurrentColor = tmpCurrentHSVColor.calcRGBColor(); 
                    for(var y=0; y<bandHeight;y++){
                        var index = (x + y * canvasWidth) * 4;
                            canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue()*255); // r
                            canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue()*255); // g
                            canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue()*255); // b
                            canvasData.data[index + 3] = 255; //a
                    }
                      
                } 
                
        break;
        case "lab": 
             for(var x=xStart; x<xStart+bandWidth;x++){

                var tmpRatio = (x-xStart)/bandWidth;
                                           
                var lValue = color1.getLValue()+(color2.getLValue() - color1.getLValue())*tmpRatio;
                var aValue = color1.getAValue()+(color2.getAValue() - color1.getAValue())*tmpRatio;
                var bValue = color1.getBValue()+(color2.getBValue() - color1.getBValue())*tmpRatio;                                       
                var tmpCurrentLABColor = new classColorCIELab(lValue,aValue,bValue);
                                            
                var tmpCurrentColor = tmpCurrentLABColor.calcRGB(); 
        
                for(var y=0; y<bandHeight;y++){
                    var index = (x + y * canvasWidth) * 4;
                    canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue()*255); // r
                    canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue()*255); // g
                    canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue()*255); // b
                    canvasData.data[index + 3] = 255; //a
                }
                        
        }
                                    
        break;
        case "din99": 
           
            for(var x=xStart; x<xStart+bandWidth;x++){

                var tmpRatio = (x-xStart)/bandWidth;
                 
                var l99Value = color1.getL99Value()+(color2.getL99Value() - color1.getL99Value())*tmpRatio;
                var a99Value = color1.getA99Value()+(color2.getA99Value() - color1.getA99Value())*tmpRatio;
                var b99Value = color1.getB99Value()+(color2.getB99Value() - color1.getB99Value())*tmpRatio;
                                                      
                var tmpCurrentDIN99Color = new classColorDIN99(l99Value,a99Value,b99Value); 
                                            
                var tmpCurrentColor = tmpCurrentDIN99Color.calcRGBColor(); 

                for(var y=0; y<bandHeight;y++){
                    var index = (x + y * canvasWidth) * 4;
                    canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue()*255); // r
                    canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue()*255); // g
                    canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue()*255); // b
                    canvasData.data[index + 3] = 255; //a
                }
                        
        }

        break;
        default:
            console.log("Error at the createBand function");

    }

    return canvasData;
}


function createConstantBand(canvasData, xStart, bandWidth, bandHeight, color1, canvasWidth){

    xStart = Math.round(xStart);
    bandWidth = Math.round(bandWidth);
    bandHeight = Math.round(bandHeight);

    switch(colorspaceModus){
        case "rgb": 

                for(var x=xStart; x<xStart+bandWidth;x++){

                    for(var y=0; y<bandHeight;y++){
                            var index = (x + y * canvasWidth) * 4;
                            canvasData.data[index + 0] = Math.round(color1.getRValue()*255); // r
                            canvasData.data[index + 1] = Math.round(color1.getGValue()*255); // g
                            canvasData.data[index + 2] = Math.round(color1.getBValue()*255); // b
                            canvasData.data[index + 3] = 255; //a
                    }
                        
                }

        break;
        case "hsv": 

            var tmpCurrentColor = color1.calcRGBColor(); 

            for(var x=xStart; x<xStart+bandWidth;x++){
                    
                    for(var y=0; y<bandHeight;y++){
                            var index = (x + y * canvasWidth) * 4;
                            canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue()*255); // r
                            canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue()*255); // g
                            canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue()*255); // b
                            canvasData.data[index + 3] = 255; //a
                    }
                        
            } 
        break;
        case "lab": 

            var tmpCurrentColor = color1.calcRGB(); 

            for(var x=xStart; x<xStart+bandWidth;x++){

                    for(var y=0; y<bandHeight;y++){
                        var index = (x + y * canvasWidth) * 4;
                        canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue()*255); // r
                        canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue()*255); // g
                        canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue()*255); // b
                        canvasData.data[index + 3] = 255; //a
                    }
                            
            }
                                    
        break;
        case "din99": 

            var tmpCurrentColor = color1.calcRGBColor(); 

            for(var x=xStart; x<xStart+bandWidth;x++){

                    for(var y=0; y<bandHeight;y++){
                        var index = (x + y * canvasWidth) * 4;
                        canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue()*255); // r
                        canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue()*255); // g
                        canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue()*255); // b
                        canvasData.data[index + 3] = 255; //a
                    }
                            
            }

        break;
        default:
            console.log("Error at the createBand function");

    }

    return canvasData;
}


/////////////////////////////////////////////////////////////////////////////////////////////
//// Keys
//////////////////////////////////////////////////////////////////////////////////////////////

function drawKeys(canvasID,resolutionX, resolutionY, tmpColormap){
        // start 
    var canvasObject = document.getElementById(canvasID);

    $("#"+canvasID).attr("width", resolutionX+"px");
    $("#"+canvasID).attr("height", resolutionY+"px"); 

    var canvasContex = canvasObject.getContext("2d");
    //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
    var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);

        /////////////////////////////////////////////////////////

        var colormapWidth = resolutionX*0.95;
        var xPos = resolutionX*0.025;
        var yPos = resolutionY;

        var twinStarted = false;
        var leftStarted = false;

        var distanceColorrects = resolutionY/3;
   
        
        var colorrectHeigth = resolutionY/2;
        var colorrectWitdh = resolutionY/3;

        // draw keys
        for(var i = 0; i<tmpColormap.getNumColors(); i++){

            var tmpKey = tmpColormap.getKey(i);

              switch(tmpKey) {
                case "nil key": 
                    
                    var pos1 = (tmpColormap.getPosition(i)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;
                   
                        canvasContex.beginPath();
                        canvasContex.lineWidth = 1;
                        canvasContex.moveTo(xPos+pos1, yPos);
                        canvasContex.lineTo(xPos+pos1, yPos-distanceColorrects);
                        canvasContex.strokeStyle = 'rgb(0,0,0)';
                        canvasContex.stroke();

                        var colorrectYPos = yPos-distanceColorrects-colorrectHeigth;
                        var colorrectXPos = xPos+pos1-(colorrectWitdh/2);

                        drawColorRect(canvasContex, colorrectXPos,colorrectYPos,colorrectWitdh,colorrectHeigth,"rgb(125,125,125)", true);

                    break;
                case "twin key":
                    
                    if(twinStarted==true){               
                        twinStarted=false;
                    }
                    else{

                        var pos1 = (tmpColormap.getPosition(i)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;
                        var rgbColor1 = tmpColormap.getRGBColor(i).getRGBString();
                        var rgbColor2 = tmpColormap.getRGBColor(i+1).getRGBString();

                        canvasContex.beginPath();
                        canvasContex.lineWidth = 1;
                        canvasContex.moveTo(xPos+pos1, yPos);
                        canvasContex.lineTo(xPos+pos1, yPos-distanceColorrects);
                        canvasContex.strokeStyle = 'rgb(0,0,0)';
                        canvasContex.stroke();

                        var colorrectYPos = yPos-distanceColorrects-colorrectHeigth;
                        var colorrectXPos = xPos+pos1-(colorrectWitdh/2);

                        drawColorRect(canvasContex, colorrectXPos,colorrectYPos,colorrectWitdh/2,colorrectHeigth,rgbColor1, false);
                        var colorrectXPos = xPos+pos1;
                        drawColorRect(canvasContex, colorrectXPos,colorrectYPos,colorrectWitdh/2,colorrectHeigth,rgbColor2, false);

                        twinStarted=true;
                    }
                    
                    break;
                case "left key":
                    if(leftStarted==true){

                        leftStarted=false;
                        
                    }
                    else{
                        var pos1 = (tmpColormap.getPosition(i)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;
                        var rgbColor1 = tmpColormap.getRGBColor(i).getRGBString();

                        canvasContex.beginPath();
                        canvasContex.lineWidth = 1;
                        canvasContex.moveTo(xPos+pos1, yPos);
                        canvasContex.lineTo(xPos+pos1, yPos-distanceColorrects);
                        canvasContex.strokeStyle = 'rgb(0,0,0)'; 
                        canvasContex.stroke();

                        var colorrectYPos = yPos-distanceColorrects-colorrectHeigth;
                        var colorrectXPos = xPos+pos1-(colorrectWitdh/2);

                        drawColorRect(canvasContex, colorrectXPos,colorrectYPos,colorrectWitdh/2,colorrectHeigth,rgbColor1, false);
                        var colorrectXPos = xPos+pos1;
                        drawColorRect(canvasContex, colorrectXPos,colorrectYPos,colorrectWitdh/2,colorrectHeigth,"rgb(125,125,125)", true);

                        leftStarted=true;
                    }
                    break;
                case "right key":

                        var rgbColor1 = tmpColormap.getRGBColor(i).getRGBString();                  
                        
                        var pos1 = (tmpColormap.getPosition(i)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;
                        
                        canvasContex.beginPath();
                        canvasContex.lineWidth = 1;
                        canvasContex.moveTo(xPos+pos1, yPos);
                        canvasContex.lineTo(xPos+pos1, yPos-distanceColorrects);
                        canvasContex.strokeStyle = 'rgb(0,0,0)';
                        canvasContex.stroke();

                        var colorrectYPos = yPos-distanceColorrects-colorrectHeigth;
                        var colorrectXPos = xPos+pos1-(colorrectWitdh/2);

                        drawColorRect(canvasContex, colorrectXPos,colorrectYPos,colorrectWitdh/2,colorrectHeigth,"rgb(125,125,125)", true);
                        var colorrectXPos = xPos+pos1;
                        drawColorRect(canvasContex, colorrectXPos,colorrectYPos,colorrectWitdh/2,colorrectHeigth,rgbColor1, false);
                    break;
                default:
                        var rgbColor1 = tmpColormap.getRGBColor(i).getRGBString();


                        var pos1 = (tmpColormap.getPosition(i)-tmpColormap.getRangeStart())/(tmpColormap.getRangeEnd()-tmpColormap.getRangeStart())*colormapWidth;

                       
                        ////
                        canvasContex.beginPath();
                        canvasContex.lineWidth = 1;
                        canvasContex.moveTo(xPos+pos1, yPos);
                        canvasContex.lineTo(xPos+pos1, yPos-distanceColorrects);
                        canvasContex.strokeStyle = 'rgb(0,0,0)';
                        canvasContex.stroke();

                    
                        var colorrectYPos = yPos-distanceColorrects-colorrectHeigth;
                        var colorrectXPos = xPos+pos1-(colorrectWitdh/2);

                        drawColorRect(canvasContex, colorrectXPos,colorrectYPos,colorrectWitdh,colorrectHeigth,rgbColor1, false);
 
            }
                    
        }
          
}

function drawColorRect(contex,colorrectXPos,colorrectYPos,colorrectWitdh,colorrectHeigth,rgbColor, isGrey){

    contex.fillStyle = rgbColor;
    contex.fillRect(colorrectXPos,colorrectYPos, colorrectWitdh, colorrectHeigth);

    if(isGrey==true){
        contex.beginPath();
        contex.moveTo(colorrectXPos, colorrectYPos+colorrectHeigth);
        contex.lineTo(colorrectXPos+colorrectWitdh, colorrectYPos);
        contex.strokeStyle = 'rgb(0,0,0)';
        contex.lineWidth = 1;
        contex.stroke();
    }

    contex.lineWidth = 1;
    contex.strokeStyle = 'rgb(0,0,0)';
    contex.strokeRect(colorrectXPos,colorrectYPos, colorrectWitdh, colorrectHeigth);

}
