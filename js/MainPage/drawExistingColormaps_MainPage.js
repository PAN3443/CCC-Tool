function drawPredefinedBands(){

    document.getElementById('button_AddConstandBand').style.display = "none";
    document.getElementById('id_tmpContainer').appendChild(document.getElementById('button_AddConstandBand'));
    document.getElementById('button_AddScaleBand').style.display = "none";
    document.getElementById('id_tmpContainer').appendChild(document.getElementById('button_AddScaleBand'));
    document.getElementById('button_AddDoubleBands').style.display = "none";
    document.getElementById('id_tmpContainer').appendChild(document.getElementById('button_AddDoubleBands'));
    document.getElementById('button_AddTripleBands').style.display = "none";
    document.getElementById('id_tmpContainer').appendChild(document.getElementById('button_AddTripleBands'));
    document.getElementById('button_AddQuadrupelBands').style.display = "none";
    document.getElementById('id_tmpContainer').appendChild(document.getElementById('button_AddQuadrupelBands'));

    //---------------------------
    // --------- Empty Divs
    document.getElementById('id_ConstandBand_Div').innerHTML = "";
    document.getElementById('id_ScaleBand_Div').innerHTML = "";
    document.getElementById('id_DoubleBands_Div').innerHTML = "";
    document.getElementById('id_TripleBands_Div').innerHTML = "";
    document.getElementById('id_QuadrupelBands_Div').innerHTML = "";

    var resolutionX = 400;
    var resolutionY = 75;

    //---------------------------
    // --------- Const
    for(var i=0; i<constBands.length; i++){

        var iDiv = document.createElement('div');
        iDiv.id = 'const'+i;
        iDiv.className = 'class_predefinedConstBands';
        iDiv.setAttribute('draggable', true);
        iDiv.style.background = constBands[i].getRGBString();
        document.getElementById('id_ConstandBand_Div').appendChild(iDiv);
        iDiv.addEventListener("click", openPredefinedBand);
        iDiv.addEventListener("dragstart", bandOnDragStart);
        iDiv.addEventListener("dragend", bandOnDragEnd);

    }
    document.getElementById('id_ConstandBand_Div').appendChild(document.getElementById('button_AddConstandBand'));
    document.getElementById('button_AddConstandBand').style.display = "initial";

    //---------------------------
    // --------- Scale
    for(var i=0; i<scaleBands.length; i++){

        var iCan = document.createElement('canvas');
        var id = 'scale'+i
        iCan.id = id;
        iCan.className = 'class_predefinedScaledBands';
        iCan.setAttribute('draggable', true);
        document.getElementById('id_ScaleBand_Div').appendChild(iCan);
        iCan.addEventListener("click", openPredefinedBand);
        iCan.addEventListener("dragstart", bandOnDragStart);
        iCan.addEventListener("dragend", bandOnDragEnd);

        var tmpC1RGB = scaleBands[i][0];
        var tmpC2RGB = scaleBands[i][1];


        drawCanvasBand(iCan, tmpC1RGB, tmpC2RGB,resolutionX,resolutionY);
    
    }
    document.getElementById('id_ScaleBand_Div').appendChild(document.getElementById('button_AddScaleBand'));
    document.getElementById('button_AddScaleBand').style.display = "initial";

    //---------------------------
    // --------- Double

    for(var i=0; i<doubleBands.length; i++){

        var iCan = document.createElement('canvas');
        iCan.id = 'double'+i;
        iCan.className = 'class_predefinedScaledBands';
        iCan.setAttribute('draggable', true);

        document.getElementById('id_DoubleBands_Div').appendChild(iCan);
        iCan.addEventListener("click", openPredefinedBand);
        iCan.addEventListener("dragstart", bandOnDragStart);
        iCan.addEventListener("dragend", bandOnDragEnd);

        var tmpC1RGB = doubleBands[i][0];
        var tmpC2RGB = doubleBands[i][1];
        var tmpC3RGB = doubleBands[i][2];

        var resolutionX = iCan.width; //400;
        var resolutionY = iCan.height; //75;

        //$("#sclae"+i).attr("width", resolutionX+"px");
        //$("#sclae"+i).attr("height", resolutionY+"px"); 

        var canvasContex = iCan.getContext("2d");
        //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
        var canvasData = canvasContex.getImageData(0, 0, iCan.width, iCan.height);

        var bandWidth = Math.round(resolutionX/2);

        switch(colorspaceModus){
                    case "rgb": 
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB, tmpC3RGB, resolutionX);
                    break;
                    case "hsv": 
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcHSVColor(), tmpC3RGB.calcHSVColor(), resolutionX);
                    break;
                    case "lab":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcCIELabColor(), tmpC2RGB.calcCIELabColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcCIELabColor(), tmpC3RGB.calcCIELabColor(), resolutionX);
                    break;
                    case "din99": 
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(kE,kCH), tmpC2RGB.calcDIN99Color(kE,kCH), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcDIN99Color(kE,kCH), tmpC3RGB.calcDIN99Color(kE,kCH), resolutionX);
                    break;
                    default:
                        console.log("Error at the updateCreatorBand function");
        }

        canvasContex.putImageData(canvasData, 0, 0);
    
    }
    document.getElementById('id_DoubleBands_Div').appendChild(document.getElementById('button_AddDoubleBands'));
    document.getElementById('button_AddDoubleBands').style.display = "initial";

     //---------------------------
    // --------- Tripe

    for(var i=0; i<tribleBands.length; i++){

        var iCan = document.createElement('canvas');
        var id= 'triple'+i;
        iCan.id = id;
        iCan.className = 'class_predefinedScaledBands';
        iCan.setAttribute('draggable', true);

        document.getElementById('id_TripleBands_Div').appendChild(iCan);
        iCan.addEventListener("click", openPredefinedBand);
        iCan.addEventListener("dragstart", bandOnDragStart);
        iCan.addEventListener("dragend", bandOnDragEnd);
        var tmpC1RGB = tribleBands[i][0];
        var tmpC2RGB = tribleBands[i][1];
        var tmpC3RGB = tribleBands[i][2];
        var tmpC4RGB = tribleBands[i][3];

        var resolutionX = 360;
        var resolutionY = 75;

        $("#"+id).attr("width", resolutionX+"px");
        $("#"+id).attr("height", resolutionY+"px"); 

        var canvasContex = iCan.getContext("2d");
        //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
        var canvasData = canvasContex.getImageData(0, 0, iCan.width, iCan.height);

        var bandWidth = Math.round(resolutionX/3);

        switch(colorspaceModus){
                    case "rgb": 
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB, tmpC3RGB, resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB, tmpC4RGB, resolutionX);
                    break;
                    case "hsv": 
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcHSVColor(), tmpC3RGB.calcHSVColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcHSVColor(), tmpC4RGB.calcHSVColor(), resolutionX);
                    break;
                    case "lab":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcCIELabColor(), tmpC2RGB.calcCIELabColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcCIELabColor(), tmpC3RGB.calcCIELabColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcCIELabColor(), tmpC4RGB.calcCIELabColor(), resolutionX);
                    break;
                    case "din99": 
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(kE,kCH), tmpC2RGB.calcDIN99Color(kE,kCH), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcDIN99Color(kE,kCH), tmpC3RGB.calcDIN99Color(kE,kCH), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcDIN99Color(kE,kCH), tmpC4RGB.calcDIN99Color(kE,kCH), resolutionX);
                    break;
                    default:
                        console.log("Error at the updateCreatorBand function");
        }

        canvasContex.putImageData(canvasData, 0, 0);
    
    }
    document.getElementById('id_TripleBands_Div').appendChild(document.getElementById('button_AddTripleBands'));
    document.getElementById('button_AddTripleBands').style.display = "initial";

     //---------------------------
    // --------- Quad

    for(var i=0; i<quadBands.length; i++){

        var iCan = document.createElement('canvas');
        var id= 'quads'+i;
        iCan.id = id;
        iCan.className = 'class_predefinedScaledBands';
        iCan.setAttribute('draggable', true);

        document.getElementById('id_QuadrupelBands_Div').appendChild(iCan);
        iCan.addEventListener("click", openPredefinedBand);
        iCan.addEventListener("dragstart", bandOnDragStart);
        iCan.addEventListener("dragend", bandOnDragEnd);
        
        var tmpC1RGB = quadBands[i][0];
        var tmpC2RGB = quadBands[i][1];
        var tmpC3RGB = quadBands[i][2];
        var tmpC4RGB = quadBands[i][3];
        var tmpC5RGB = quadBands[i][3];

        var resolutionX = 360;
        var resolutionY = 75;

        $("#"+id).attr("width", resolutionX+"px");
        $("#"+id).attr("height", resolutionY+"px"); 

        var canvasContex = iCan.getContext("2d");
        //canvasContex.clearRect(0, 0, resolutionX, resolutionY);
        var canvasData = canvasContex.getImageData(0, 0, iCan.width, iCan.height);

        var bandWidth = Math.round(resolutionX/4);

        switch(colorspaceModus){
                    case "rgb": 
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB, tmpC2RGB, resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB, tmpC3RGB, resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB, tmpC4RGB, resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC4RGB, tmpC5RGB, resolutionX);
                    break;
                    case "hsv": 
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcHSVColor(), tmpC2RGB.calcHSVColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcHSVColor(), tmpC3RGB.calcHSVColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcHSVColor(), tmpC4RGB.calcHSVColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC4RGB.calcHSVColor(), tmpC5RGB.calcHSVColor(), resolutionX);
                    break;
                    case "lab":
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcCIELabColor(), tmpC2RGB.calcCIELabColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcCIELabColor(), tmpC3RGB.calcCIELabColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcCIELabColor(), tmpC4RGB.calcCIELabColor(), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC4RGB.calcCIELabColor(), tmpC5RGB.calcCIELabColor(), resolutionX);
                    break;
                    case "din99": 
                        canvasData=createScaledBand(canvasData, 0, bandWidth, resolutionY, tmpC1RGB.calcDIN99Color(kE,kCH), tmpC2RGB.calcDIN99Color(kE,kCH), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth, bandWidth, resolutionY, tmpC2RGB.calcDIN99Color(kE,kCH), tmpC3RGB.calcDIN99Color(kE,kCH), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*2, bandWidth, resolutionY, tmpC3RGB.calcDIN99Color(kE,kCH), tmpC4RGB.calcDIN99Color(kE,kCH), resolutionX);
                        canvasData=createScaledBand(canvasData, bandWidth*3, bandWidth, resolutionY, tmpC4RGB.calcDIN99Color(kE,kCH), tmpC5RGB.calcDIN99Color(kE,kCH), resolutionX);
                    break;
                    default:
                        console.log("Error at the updateCreatorBand function");
        }

        canvasContex.putImageData(canvasData, 0, 0);
    
    }
    document.getElementById('id_QuadrupelBands_Div').appendChild(document.getElementById('button_AddQuadrupelBands'));
    document.getElementById('button_AddQuadrupelBands').style.display = "initial";
}

