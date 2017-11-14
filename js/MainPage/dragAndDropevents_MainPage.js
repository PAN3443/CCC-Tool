
/////////////////////////////////////////////
//  Drag And Drop
////////////////////////////////////////////

function bandOnDragStart(event){

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", event.target.getAttribute('id') );

    var tmpString = event.target.id;
    //tmpString = tmpString.substr(4);

    if(tmpString=="id_creatorBand"){
        dragElemBandCreator=true;

        // show  all drop positions
        if(colormapBandSketchC1.length==0){
            dropPositionElements[0].style.border = "3px dashed red";
        }
        else{
            for(var i=0; i<dropPositionElements.length; i++){
                dropPositionElements[i].style.display = "initial";
            }
        }
    }
    else{
        dragElemBandCreator=false;

        // show  all drop positions
        if(colormapBandSketchC1.length==0){
            dropPositionElements[0].style.border = "3px dashed red";
        }
        else{
            for(var i=0; i<dropPositionElements.length; i++){
                dropPositionElements[i].style.display = "initial";
            }
        }
    }


}

function bandOnDragEnd(event) {

    if(colormapBandSketchC1.length==0){
         //document.getElementById("createSide_SketchLabel").style.display = "initial";
         //document.getElementById("createSide_YourColormapDummy").style.border = "2px dashed black";
         dropPositionElements[0].style.border = "3px dashed black";
    }
    else{
        // hide all drop positions
        for(var i=0; i<dropPositionElements.length; i++){
            dropPositionElements[i].style.display = "none";  
        }
    }

}

function bandOnEnter(event) {
    var tmpString = event.target.id;
    
    if(tmpString!=undefined){

        if(dragElemBandCreator){
            tmpString = tmpString.substr(7);
            indexOfDroppedPlace = parseInt(tmpString);
            document.getElementById("dragPos"+indexOfDroppedPlace).style.innerHTML = "";
        
            /*if(document.getElementById("radiobutton_ScaledBand").checked == true){
                
                var tmpRGB1 = getRGBColor(true);
                var tmpRGB2 = getRGBColor(false);
                document.getElementById("dragPos"+indexOfDroppedPlace).style.background = '-webkit-linear-gradient(left, '+tmpRGB1.getRGBString()+','+tmpRGB2.getRGBString()+')';
                document.getElementById("dragPos"+indexOfDroppedPlace).style.background = '-o-linear-gradient(right, '+tmpRGB1.getRGBString()+','+tmpRGB2.getRGBString()+')';
                document.getElementById("dragPos"+indexOfDroppedPlace).style.background = '-moz-linear-gradient(right, '+tmpRGB1.getRGBString()+','+tmpRGB2.getRGBString()+')';
                document.getElementById("dragPos"+indexOfDroppedPlace).style.background = 'linear-gradient(to right, '+tmpRGB1.getRGBString()+','+tmpRGB2.getRGBString()+')';
            }
            else{
                var tmpRGB1 = getRGBColor(true);
                document.getElementById("dragPos"+indexOfDroppedPlace).style.background = tmpRGB1.getRGBString();
            }*/
            getRGBColor(c1bool)
        }
        else{

        }

    }
    

}

function bandOnLeave(event) {
    if(indexOfDroppedPlace >=0){
        document.getElementById("dragPos"+indexOfDroppedPlace).style.background = "none";
        document.getElementById("dragPos"+indexOfDroppedPlace).style.innerHTML = "Drop here";
        indexOfDroppedPlace = -1;
    }
}

function bandOnDrop(){
 

    /////////////
    //// Creator Band
    if(dragElemBandCreator){
        document.getElementById("dragPos"+indexOfDroppedPlace).style.background = "none";

        /*if(document.getElementById("radiobutton_ScaledBand").checked == true){
            colormapBandSketchC1.splice(indexOfDroppedPlace, 0, getRGBColor(true));
            colormapBandSketchC2.splice(indexOfDroppedPlace, 0, getRGBColor(false));
        }
        else{
            colormapBandSketchC1.splice(indexOfDroppedPlace, 0, getRGBColor(true));
            colormapBandSketchC2.splice(indexOfDroppedPlace, 0, getRGBColor(true));
        }*/

        if(colormapBandSketchR1.length==0){
            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, 0.0);
            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, 1.0);
        }
        else{

            // band as least
            if(colormapBandSketchR1.length == indexOfDroppedPlace){
                var tmpVal = colormapBandSketchR2[indexOfDroppedPlace-1];
                var dist = Math.abs(tmpVal-colormapBandSketchR1[indexOfDroppedPlace-1]);
                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal);
                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist);
            }
            // band in the middle
            if(colormapBandSketchR1.length > indexOfDroppedPlace && indexOfDroppedPlace!=0){
            
                var newPos = colormapBandSketchR2[indexOfDroppedPlace-1]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace-1]-colormapBandSketchR1[indexOfDroppedPlace-1])/2;
                colormapBandSketchR2[indexOfDroppedPlace-1] = newPos;
                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos);

                var newPos = colormapBandSketchR2[indexOfDroppedPlace]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace]-colormapBandSketchR1[indexOfDroppedPlace])/2;
                colormapBandSketchR1[indexOfDroppedPlace] = newPos;
                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos);
            }

            // band as frist
            if(indexOfDroppedPlace==0){
                var tmpVal = colormapBandSketchR2[0];
                var dist = Math.abs(tmpVal-colormapBandSketchR1[0]);
                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist);
                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal);
            }

        }

        orderColorSketch();
    }

    /////////////
    //// Predefined Band


    /////////////
    //// Predefined Band

    /*if(bandInsideOfSketch){

        document.getElementById("dragPos"+indexOfDroppedPlace).style.background = "none";

    


     
    
        // open Band Options

        bandOptionsIndex = indexOfDroppedPlace;
        createSide_OpenBandOption(true);



    }*/
   
}


////////////////////////////////////////////////
///////////////////////////////////////////////

function orderColorSketch(){

   
    document.getElementById("id_colormapSketch").innerHTML = null;

    if(colormapBandSketchC1.length!=0){ 

        document.getElementById("id_colormapSketch").style.border = "none";

        for(var i=0; i<colormapBandSketchC1.length; i++){

            // create drop place
            var tDiv = document.createElement('div');
            tDiv.id = 'dragPos'+i;
            tDiv.style.border = "3px solid red";
            tDiv.style.height = 100 +'%'; 
            tDiv.style.width = 100+'%';
            tDiv.style.textAlign = 'center';
            tDiv.style.lineHeight = "2cm";
            tDiv.style.verticalAlign = "middle";
            tDiv.style.display = "none";
            //tDiv.style.visibility = "hidden";
            tDiv.innerHTML = "Drop Here";

            tDiv.addEventListener("dragenter", bandOnEnter);
            tDiv.addEventListener("dragleave", bandOnLeave);
            //tDiv.addEventListener("drop dragdrop", createSide_BandOnDrop);

            tDiv.ondrop = function(event){
                event.preventDefault();
                bandOnDrop();
            }; // allow Drop
            tDiv.ondragover = function(event){event.preventDefault();}; // allow Drop

            document.getElementById("id_colormapSketch").appendChild(tDiv);
            dropPositionElements.push(tDiv);

            // create band
            var tCan = document.createElement('canvas');
            tCan.id = 'band'+i;
            
            tCan.style.border = "1px solid black";
            tCan.style.margin = "0px";
            tCan.setAttribute('draggable', true);

            document.getElementById("id_colormapSketch").appendChild(tCan);

            tCan.style.height = 100 +'%'; 
            tCan.style.width = 100 +'%';
            tCan.style.cursor = "move";

            /*if(bandType[colormapBandSketch[i]]){
                // scaled
                iDiv.style.background = '-webkit-linear-gradient(left, '+colormapBandSketchC1[i].getRGBString()+','+colormapBandSketchC2[i].getRGBString()+')';
                iDiv.style.background = '-o-linear-gradient(right, '+colormapBandSketchC1[i].getRGBString()+','+colormapBandSketchC2[i].getRGBString()+')';
                iDiv.style.background = '-moz-linear-gradient(right, '+colormapBandSketchC1[i].getRGBString()+','+colormapBandSketchC2[i].getRGBString()+')';
                iDiv.style.background = 'linear-gradient(to right, '+colormapBandSketchC1[i].getRGBString()+','+colormapBandSketchC2[i].getRGBString()+')';
            }
            else{
                iDiv.style.background = colormapBandSketchC1[i].getRGBString();
                
            }*/

            var resolutionX = 200;
            var resolutionY = 75;
            
            $("#band"+i).attr("width", resolutionX+"px");
            $("#band"+i).attr("height", resolutionY+"px"); 

            var canvasContex = tCan.getContext("2d");
            var canvasData = canvasContex.getImageData(0, 0, tCan.width, tCan.height);

            switch(colorspaceModus){
                case "rgb":;

                    if(colormapBandSketchC1[i].getRGBString()===colormapBandSketchC2[i].getRGBString()){
                        canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, colormapBandSketchC1[i], resolutionX);
                    }
                    else{  
                        canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, colormapBandSketchC1[i], colormapBandSketchC2[i], resolutionX);
                    }

                break;
                case "hsv": 

                    var tmpC1HSV = colormapBandSketchC1[i].calcHSVColor();
                    if(colormapBandSketchC1[i].getRGBString()===colormapBandSketchC2[i].getRGBString()){
                        canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, tmpC1HSV, resolutionX);
                    }
                    else{
                        var tmpC2HSV = colormapBandSketchC2[i].calcHSVColor();
                        canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, tmpC1HSV, tmpC2HSV, resolutionX);
                    }

                break;
                case "lab":  

                    var tmpC1LAB = colormapBandSketchC1[i].calcCIELabColor();
                    if(colormapBandSketchC1[i].getRGBString()===colormapBandSketchC2[i].getRGBString()){
                        canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, tmpC1LAB, resolutionX);
                    }
                    else{
                        var tmpC2LAB = colormapBandSketchC2[i].calcCIELabColor();
                        canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, tmpC1LAB, tmpC2LAB, resolutionX);
                    }

                break;
                case "din99":
                    var tmpC1DIN99 = colormapBandSketchC1[i].calcDIN99Color(kE,kCH);
                    if(colormapBandSketchC1[i].getRGBString()===colormapBandSketchC2[i].getRGBString()){
                        canvasData=createConstantBand(canvasData, 0, resolutionX, resolutionY, tmpC1DIN99, resolutionX);
                    }
                    else{
                        var tmpC2DIN99 = colormapBandSketchC2[i].calcDIN99Color(kE,kCH);
                        canvasData=createScaledBand(canvasData, 0, resolutionX, resolutionY, tmpC1DIN99, tmpC2DIN99, resolutionX);
                    }

                break;
                default:
                console.log("Error at the changeColorspace function");
            }

            canvasContex.putImageData(canvasData, 0, 0);

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


            
            //tCan.addEventListener("dragstart", createSide_BandOnDragStart);
            //tCan.addEventListener("dragend", createSide_BandOnDragEnd);
            tCan.addEventListener("click", bandOnClick);


        }

        var t2Div = document.createElement('div');
            t2Div.id = 'dragPos'+colormapBandSketchC1.length;
            t2Div.style.border = "3px solid red";
            t2Div.style.height = 99 +'%'; 
            t2Div.style.width = 100+'%';
            t2Div.style.display = "none";
            //tDiv.style.visibility = "hidden";
            t2Div.style.textAlign = 'center';
            t2Div.style.lineHeight = "2cm";
            t2Div.style.verticalAlign = "middle";
            t2Div.innerHTML = "Drop Here";

            t2Div.addEventListener("dragenter", bandOnEnter);
            t2Div.addEventListener("dragleave", bandOnLeave);
            
            t2Div.ondrop = function(event){
                event.preventDefault();
                bandOnDrop();
            }; // allow Drop
            t2Div.ondragover = function(event){event.preventDefault();}; // allow Drop

            document.getElementById("id_colormapSketch").appendChild(t2Div);
            dropPositionElements.push(t2Div);

           
    }
    else{
        var t2Div = document.createElement('div');
        t2Div.id = 'dragPos'+colormapBandSketchC1.length;
        t2Div.style.border = "2px dashed black";
        t2Div.style.height = 100 +'%'; 
        t2Div.style.width = 100+'%';
        t2Div.style.textAlign = 'center';
        t2Div.style.lineHeight = "2cm";
        t2Div.style.verticalAlign = "middle";
        //t2Div.style.cursor = "none";
        //t2Div.style.display = "initial";
        //tDiv.style.visibility = "hidden";
        t2Div.innerHTML = "Drop Here";

        t2Div.addEventListener("dragenter", bandOnEnter);
        t2Div.addEventListener("dragleave", bandOnLeave);

        t2Div.ondrop = function(event){
                event.preventDefault();
                bandOnDrop();
        }; // allow Drop
        t2Div.ondragover = function(event){event.preventDefault();}; // allow Drop

        document.getElementById("id_colormapSketch").appendChild(t2Div);
        dropPositionElements.push(t2Div);

    }

    // draw preview colormap
    //bandListToColormap();
    //createSide_drawColormap();
    //createSide_drawColormapInSpace();

}
