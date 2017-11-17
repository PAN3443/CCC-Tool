
/////////////////////////////////////////////
//  Drag And Drop
////////////////////////////////////////////

function bandOnDragStart(event){

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", event.target.getAttribute('id') );

    var tmpString = event.target.id;
    //tmpString = tmpString.substr(4);



    if(tmpString=="id_creatorBand"){
        dragPredefinedBandIndex = bandIndex;
        dragPredefinedBandType = createBandType;

    }
    else{

                switch(tmpString[0]){
                    case "c": 
                        dragPredefinedBandType = 0;
                        tmpString = tmpString.substr(5);
                        dragPredefinedBandIndex = parseInt(tmpString);
                    break;
                    case "s": 
                        dragPredefinedBandType = 1;
                        tmpString = tmpString.substr(5);
                        dragPredefinedBandIndex = parseInt(tmpString);
                    break;
                    case "d": 
                        dragPredefinedBandType = 2;
                        tmpString = tmpString.substr(6);
                        dragPredefinedBandIndex = parseInt(tmpString);
                    break;
                    case "t":
                        dragPredefinedBandType = 3;
                        tmpString = tmpString.substr(6);
                        dragPredefinedBandIndex = parseInt(tmpString);
                    break;
                    case "q": 
                        console.log(dragPredefinedBandType);
                        dragPredefinedBandType = 4;
                        tmpString = tmpString.substr(5);
                        dragPredefinedBandIndex = parseInt(tmpString);
                    break;
                    default:
                        console.log("Error at the openpredefinedbands function");
                    

                }
 
    }

    // show  all drop positions
        if(colormapBandSketchC1.length==0){
            dropPositionElements[0].style.border = "3px dashed red";
        }
        else{

            var tmpRect = document.getElementById("id_colormapSketch").getBoundingClientRect();
            var tmpLength = tmpRect.width/(colormapBandSketchC1.length-1+colormapBandSketchC1.length);//100/(colormapBandSketchC1.length-1);
            
            for(var i=0; i<dropPositionElements.length; i++){
                dropPositionElements[i].style.display = "initial";
                dropPositionElements[i].style.width = tmpLength+"px";
            }

            for(var i=0; i<droppedBandElements.length; i++){
                droppedBandElements[i].style.width = tmpLength+"px";
            }
              
                
           
        }


}

function bandOnDragEnd(event) {

    dragPredefinedBandIndex = bandIndex;
    dragPredefinedBandType = createBandType;

    if(colormapBandSketchC1.length==0){
         //document.getElementById("createSide_SketchLabel").style.display = "initial";
         //document.getElementById("createSide_YourColormapDummy").style.border = "2px dashed black";
         dropPositionElements[0].style.border = "3px dashed black";
    }
    else{
        // hide all drop positions
        var tmpRect = document.getElementById("id_colormapSketch").getBoundingClientRect();
        var tmpLength = tmpRect.width/(colormapBandSketchC1.length-1);//100/(colormapBandSketchC1.length-1);
        

        for(var i=0; i<dropPositionElements.length; i++){
                dropPositionElements[i].style.display = "none";
        }

        for(var i=0; i<droppedBandElements.length; i++){
                droppedBandElements[i].style.width = tmpLength+"px";
        }

    }

}

function bandOnEnter(event) {
    var tmpString = event.target.id;
    
    if(tmpString!=undefined){

         tmpString = tmpString.substr(7);
         indexOfDroppedPlace = parseInt(tmpString);
         document.getElementById("dragPos"+indexOfDroppedPlace).style.innerHTML = "";
         document.getElementById("dragPos"+indexOfDroppedPlace).style.background = "rgb(220,220,220)";
    }
    

}

function bandOnLeave(event) {


    if(indexOfDroppedPlace >=0){
        document.getElementById("dragPos"+indexOfDroppedPlace).style.background = "none";
        document.getElementById("dragPos"+indexOfDroppedPlace).style.innerHTML = "Drop here";
        indexOfDroppedPlace = -1;
    }
}

function bandOnDrop(event){
 

    /////////////
    //// Creator Band


        document.getElementById("dragPos"+indexOfDroppedPlace).style.background = "none";

           /*var tmpString = event.target.id;

                switch(tmpString[0]){
                    case "c": 
                        tmpString = tmpString.substr(5);
                        bandIndex = parseInt(tmpString);
                        createBandType = 0;
                        styleBandCreator();

                        switch(colorspaceModus){
                            case "rgb":
                            
                                colorVal1_C1 = constBands[bandIndex].getRValue()*255;
                                colorVal2_C1 = constBands[bandIndex].getGValue()*255;
                                colorVal3_C1 = constBands[bandIndex].getBValue()*255;
                                    
                                colorVal1_C5 = constBands[bandIndex].getRValue()*255;
                                colorVal2_C5 = constBands[bandIndex].getGValue()*255;
                                colorVal3_C5 = constBands[bandIndex].getBValue()*255;
                                        
                            break;
                            case "hsv":
                                var tmpHSVC1 = constBands[bandIndex].calcHSVColor();
                                colorVal1_C1 = tmpHSVC1.getHValue();
                                colorVal2_C1 = tmpHSVC1.getSValue();
                                colorVal3_C1 = tmpHSVC1.getVValue();
                                    
                                colorVal1_C5 = tmpHSVC1.getHValue();
                                colorVal2_C5 = tmpHSVC1.getSValue();
                                colorVal3_C5 = tmpHSVC1.getVValue();
                            break;
                            case "lab":
                                var tmpLABC1 = constBands[bandIndex].calcCIELabColor();
                                colorVal1_C1 = tmpLABC1.getLValue();
                                colorVal2_C1 = tmpLABC1.getAValue();
                                colorVal3_C1 = tmpLABC1.getBValue();
                                    
                                colorVal1_C5 = tmpLABC1.getLValue();
                                colorVal2_C5 = tmpLABC1.getAValue();
                                colorVal3_C5 = tmpLABC1.getBValue();
                            break;
                            case "din99":
                                var tmpDIN99C1 = constBands[bandIndex].calcDIN99Color(kE,kCH);
                                colorVal1_C1 = tmpDIN99C1.getL99Value();
                                colorVal2_C1 = tmpDIN99C1.getA99Value();
                                colorVal3_C1 = tmpDIN99C1.getB99Value();
                                    
                                colorVal1_C5 = tmpDIN99C1.getL99Value();
                                colorVal2_C5 = tmpDIN99C1.getA99Value();
                                colorVal3_C5 = tmpDIN99C1.getB99Value();
                            break;
                            default:
                            return;
                        }
                    break;
                    case "s": 
                        tmpString = tmpString.substr(5);
                        bandIndex = parseInt(tmpString);
                        createBandType = 1;
                        styleBandCreator();
                        

                        switch(colorspaceModus){
                            case "rgb":
                            
                                colorVal1_C1 = scaleBands[bandIndex][0].getRValue()*255;
                                colorVal2_C1 = scaleBands[bandIndex][0].getGValue()*255;
                                colorVal3_C1 = scaleBands[bandIndex][0].getBValue()*255;

                                colorVal1_C5 = scaleBands[bandIndex][1].getRValue()*255;
                                colorVal2_C5 = scaleBands[bandIndex][1].getGValue()*255;
                                colorVal3_C5 = scaleBands[bandIndex][1].getBValue()*255;
                                        
                            break;
                            case "hsv":
                                var tmpHSVC1 = scaleBands[bandIndex][0].calcHSVColor();
                                var tmpHSVC2 = scaleBands[bandIndex][1].calcHSVColor();
                                colorVal1_C1 = tmpHSVC1.getHValue();
                                colorVal2_C1 = tmpHSVC1.getSValue();
                                colorVal3_C1 = tmpHSVC1.getVValue();
                                    
                                colorVal1_C5 = tmpHSVC2.getHValue();
                                colorVal2_C5 = tmpHSVC2.getSValue();
                                colorVal3_C5 = tmpHSVC2.getVValue();
                            break;
                            case "lab":
                                var tmpLABC1 = scaleBands[bandIndex][0].calcCIELabColor();
                                var tmpLABC2 = scaleBands[bandIndex][1].calcCIELabColor();
                                colorVal1_C1 = tmpLABC1.getLValue();
                                colorVal2_C1 = tmpLABC1.getAValue();
                                colorVal3_C1 = tmpLABC1.getBValue();
                                    
                                colorVal1_C5 = tmpLABC2.getLValue();
                                colorVal2_C5 = tmpLABC2.getAValue();
                                colorVal3_C5 = tmpLABC2.getBValue();
                            break;
                            case "din99":
                                var tmpDIN99C1 = scaleBands[bandIndex][0].calcDIN99Color(kE,kCH);
                                var tmpDIN99C2 = scaleBands[bandIndex][1].calcDIN99Color(kE,kCH);
                                colorVal1_C1 = tmpDIN99C1.getL99Value();
                                colorVal2_C1 = tmpDIN99C1.getA99Value();
                                colorVal3_C1 = tmpDIN99C1.getB99Value();
                                    
                                colorVal1_C5 = tmpDIN99C2.getL99Value();
                                colorVal2_C5 = tmpDIN99C2.getA99Value();
                                colorVal3_C5 = tmpDIN99C2.getB99Value();
                            break;
                            default:
                            return;
                        }
                    break;
                    case "d": 
                        tmpString = tmpString.substr(6);
                        bandIndex = parseInt(tmpString);
                        createBandType = 2;
                        styleBandCreator();
                        

                        switch(colorspaceModus){
                            case "rgb":
                            
                                colorVal1_C1 = doubleBands[bandIndex][0].getRValue()*255;
                                colorVal2_C1 = doubleBands[bandIndex][0].getGValue()*255;
                                colorVal3_C1 = doubleBands[bandIndex][0].getBValue()*255;

                                colorVal1_C3 = doubleBands[bandIndex][1].getRValue()*255;
                                colorVal2_C3 = doubleBands[bandIndex][1].getGValue()*255;
                                colorVal3_C3 = doubleBands[bandIndex][1].getBValue()*255;

                                colorVal1_C5 = doubleBands[bandIndex][2].getRValue()*255;
                                colorVal2_C5 = doubleBands[bandIndex][2].getGValue()*255;
                                colorVal3_C5 = doubleBands[bandIndex][2].getBValue()*255;
                                        
                            break;
                            case "hsv":
                                var tmpHSVC1 = doubleBands[bandIndex][0].calcHSVColor();
                                var tmpHSVC2 = doubleBands[bandIndex][1].calcHSVColor();
                                var tmpHSVC3 = doubleBands[bandIndex][2].calcHSVColor();
                                colorVal1_C1 = tmpHSVC1.getHValue();
                                colorVal2_C1 = tmpHSVC1.getSValue();
                                colorVal3_C1 = tmpHSVC1.getVValue();

                                colorVal1_C3 = tmpHSVC2.getHValue();
                                colorVal2_C3 = tmpHSVC2.getSValue();
                                colorVal3_C3 = tmpHSVC2.getVValue();
                                    
                                colorVal1_C5 = tmpHSVC3.getHValue();
                                colorVal2_C5 = tmpHSVC3.getSValue();
                                colorVal3_C5 = tmpHSVC3.getVValue();
                            break;
                            case "lab":
                                var tmpLABC1 = doubleBands[bandIndex][0].calcCIELabColor();
                                var tmpLABC2 = doubleBands[bandIndex][1].calcCIELabColor();
                                var tmpLABC3 = doubleBands[bandIndex][2].calcCIELabColor();
                                colorVal1_C1 = tmpLABC1.getLValue();
                                colorVal2_C1 = tmpLABC1.getAValue();
                                colorVal3_C1 = tmpLABC1.getBValue();
                                    
                                colorVal1_C2 = tmpLABC2.getLValue();
                                colorVal2_C2 = tmpLABC2.getAValue();
                                colorVal3_C2 = tmpLABC2.getBValue();

                                colorVal1_C5 = tmpLABC3.getLValue();
                                colorVal2_C5 = tmpLABC3.getAValue();
                                colorVal3_C5 = tmpLABC3.getBValue();
                            break;
                            case "din99":
                                var tmpDIN99C1 = doubleBands[bandIndex][0].calcDIN99Color(kE,kCH);
                                var tmpDIN99C2 = doubleBands[bandIndex][1].calcDIN99Color(kE,kCH);
                                var tmpDIN99C3 = doubleBands[bandIndex][2].calcDIN99Color(kE,kCH);
                                colorVal1_C1 = tmpDIN99C1.getL99Value();
                                colorVal2_C1 = tmpDIN99C1.getA99Value();
                                colorVal3_C1 = tmpDIN99C1.getB99Value();
                                    
                                colorVal1_C3 = tmpDIN99C2.getL99Value();
                                colorVal2_C3 = tmpDIN99C2.getA99Value();
                                colorVal3_C3 = tmpDIN99C2.getB99Value();

                                colorVal1_C5 = tmpDIN99C3.getL99Value();
                                colorVal2_C5 = tmpDIN99C3.getA99Value();
                                colorVal3_C5 = tmpDIN99C3.getB99Value();
                            break;
                            default:
                            return;
                        }

                    break;
                    case "t":
                        tmpString = tmpString.substr(6);
                        bandIndex = parseInt(tmpString);
                        createBandType = 3;
                        styleBandCreator();

                        switch(colorspaceModus){
                            case "rgb":
                            
                                colorVal1_C1 = tribleBands[bandIndex][0].getRValue()*255;
                                colorVal2_C1 = tribleBands[bandIndex][0].getGValue()*255;
                                colorVal3_C1 = tribleBands[bandIndex][0].getBValue()*255;

                                colorVal1_C2 = tribleBands[bandIndex][1].getRValue()*255;
                                colorVal2_C2 = tribleBands[bandIndex][1].getGValue()*255;
                                colorVal3_C2 = tribleBands[bandIndex][1].getBValue()*255;

                                colorVal1_C4 = tribleBands[bandIndex][2].getRValue()*255;
                                colorVal2_C4 = tribleBands[bandIndex][2].getGValue()*255;
                                colorVal3_C4 = tribleBands[bandIndex][2].getBValue()*255;

                                colorVal1_C5 = tribleBands[bandIndex][3].getRValue()*255;
                                colorVal2_C5 = tribleBands[bandIndex][3].getGValue()*255;
                                colorVal3_C5 = tribleBands[bandIndex][3].getBValue()*255;
                                        
                            break;
                            case "hsv":
                                var tmpHSVC1 = tribleBands[bandIndex][0].calcHSVColor();
                                var tmpHSVC2 = tribleBands[bandIndex][1].calcHSVColor();
                                var tmpHSVC3 = tribleBands[bandIndex][2].calcHSVColor();
                                var tmpHSVC4 = tribleBands[bandIndex][3].calcHSVColor();
                                colorVal1_C1 = tmpHSVC1.getHValue();
                                colorVal2_C1 = tmpHSVC1.getSValue();
                                colorVal3_C1 = tmpHSVC1.getVValue();

                                colorVal1_C2 = tmpHSVC2.getHValue();
                                colorVal2_C2 = tmpHSVC2.getSValue();
                                colorVal3_C2 = tmpHSVC2.getVValue();
                                    
                                colorVal1_C4 = tmpHSVC3.getHValue();
                                colorVal2_C4 = tmpHSVC3.getSValue();
                                colorVal3_C4 = tmpHSVC3.getVValue();

                                colorVal1_C5 = tmpHSVC4.getHValue();
                                colorVal2_C5 = tmpHSVC4.getSValue();
                                colorVal3_C5 = tmpHSVC4.getVValue();
                            break;
                            case "lab":
                                var tmpLABC1 = tribleBands[bandIndex][0].calcCIELabColor();
                                var tmpLABC2 = tribleBands[bandIndex][1].calcCIELabColor();
                                var tmpLABC3 = tribleBands[bandIndex][2].calcCIELabColor();
                                var tmpLABC4 = tribleBands[bandIndex][3].calcCIELabColor();
                                colorVal1_C1 = tmpLABC1.getLValue();
                                colorVal2_C1 = tmpLABC1.getAValue();
                                colorVal3_C1 = tmpLABC1.getBValue();
                                    
                                colorVal1_C2 = tmpLABC2.getLValue();
                                colorVal2_C2 = tmpLABC2.getAValue();
                                colorVal3_C2 = tmpLABC2.getBValue();

                                colorVal1_C4 = tmpLABC3.getLValue();
                                colorVal2_C4 = tmpLABC3.getAValue();
                                colorVal3_C4 = tmpLABC3.getBValue();

                                colorVal1_C5 = tmpLABC4.getLValue();
                                colorVal2_C5 = tmpLABC4.getAValue();
                                colorVal3_C5 = tmpLABC4.getBValue();
                            break;
                            case "din99":
                                var tmpDIN99C1 = tribleBands[bandIndex][0].calcDIN99Color(kE,kCH);
                                var tmpDIN99C2 = tribleBands[bandIndex][1].calcDIN99Color(kE,kCH);
                                var tmpDIN99C3 = tribleBands[bandIndex][2].calcDIN99Color(kE,kCH);
                                var tmpDIN99C4 = tribleBands[bandIndex][3].calcDIN99Color(kE,kCH);
                                colorVal1_C1 = tmpDIN99C1.getL99Value();
                                colorVal2_C1 = tmpDIN99C1.getA99Value();
                                colorVal3_C1 = tmpDIN99C1.getB99Value();
                                    
                                colorVal1_C2 = tmpDIN99C2.getL99Value();
                                colorVal2_C2 = tmpDIN99C2.getA99Value();
                                colorVal3_C2 = tmpDIN99C2.getB99Value();

                                colorVal1_C4 = tmpDIN99C3.getL99Value();
                                colorVal2_C4 = tmpDIN99C3.getA99Value();
                                colorVal3_C4 = tmpDIN99C3.getB99Value();

                                colorVal1_C5 = tmpDIN99C4.getL99Value();
                                colorVal2_C5 = tmpDIN99C4.getA99Value();
                                colorVal3_C5 = tmpDIN99C4.getB99Value();
                            break;
                            default:
                            return;
                        }
                    break;
                    case "q": 
                        tmpString = tmpString.substr(5);
                        bandIndex = parseInt(tmpString);
                        createBandType = 4;
                        styleBandCreator();

                        switch(colorspaceModus){
                            case "rgb":
                            
                                colorVal1_C1 = quadBands[bandIndex][0].getRValue()*255;
                                colorVal2_C1 = quadBands[bandIndex][0].getGValue()*255;
                                colorVal3_C1 = quadBands[bandIndex][0].getBValue()*255;

                                colorVal1_C2 = quadBands[bandIndex][1].getRValue()*255;
                                colorVal2_C2 = quadBands[bandIndex][1].getGValue()*255;
                                colorVal3_C2 = quadBands[bandIndex][1].getBValue()*255;

                                colorVal1_C3 = quadBands[bandIndex][2].getRValue()*255;
                                colorVal2_C3 = quadBands[bandIndex][2].getGValue()*255;
                                colorVal3_C3 = quadBands[bandIndex][2].getBValue()*255;

                                colorVal1_C4 = quadBands[bandIndex][3].getRValue()*255;
                                colorVal2_C4 = quadBands[bandIndex][3].getGValue()*255;
                                colorVal3_C4 = quadBands[bandIndex][3].getBValue()*255;

                                colorVal1_C5 = quadBands[bandIndex][4].getRValue()*255;
                                colorVal2_C5 = quadBands[bandIndex][4].getGValue()*255;
                                colorVal3_C5 = quadBands[bandIndex][4].getBValue()*255;
                                        
                            break;
                            case "hsv":
                                var tmpHSVC1 = quadBands[bandIndex][0].calcHSVColor();
                                var tmpHSVC2 = quadBands[bandIndex][1].calcHSVColor();
                                var tmpHSVC3 = quadBands[bandIndex][2].calcHSVColor();
                                var tmpHSVC4 = quadBands[bandIndex][3].calcHSVColor();
                                var tmpHSVC5 = quadBands[bandIndex][4].calcHSVColor();
                                colorVal1_C1 = tmpHSVC1.getHValue();
                                colorVal2_C1 = tmpHSVC1.getSValue();
                                colorVal3_C1 = tmpHSVC1.getVValue();

                                colorVal1_C2 = tmpHSVC2.getHValue();
                                colorVal2_C2 = tmpHSVC2.getSValue();
                                colorVal3_C2 = tmpHSVC2.getVValue();
                                    
                                colorVal1_C3 = tmpHSVC3.getHValue();
                                colorVal2_C3 = tmpHSVC3.getSValue();
                                colorVal3_C3 = tmpHSVC3.getVValue();

                                colorVal1_C4 = tmpHSVC4.getHValue();
                                colorVal2_C4 = tmpHSVC4.getSValue();
                                colorVal3_C4 = tmpHSVC4.getVValue();

                                colorVal1_C5 = tmpHSVC5.getHValue();
                                colorVal2_C5 = tmpHSVC5.getSValue();
                                colorVal3_C5 = tmpHSVC5.getVValue();
                            break;
                            case "lab":
                                var tmpLABC1 = quadBands[bandIndex][0].calcCIELabColor();
                                var tmpLABC2 = quadBands[bandIndex][1].calcCIELabColor();
                                var tmpLABC3 = quadBands[bandIndex][2].calcCIELabColor();
                                var tmpLABC4 = quadBands[bandIndex][3].calcCIELabColor();
                                var tmpLABC5 = quadBands[bandIndex][4].calcCIELabColor();
                                colorVal1_C1 = tmpLABC1.getLValue();
                                colorVal2_C1 = tmpLABC1.getAValue();
                                colorVal3_C1 = tmpLABC1.getBValue();
                                    
                                colorVal1_C2 = tmpLABC2.getLValue();
                                colorVal2_C2 = tmpLABC2.getAValue();
                                colorVal3_C2 = tmpLABC2.getBValue();

                                colorVal1_C3 = tmpLABC3.getLValue();
                                colorVal2_C3 = tmpLABC3.getAValue();
                                colorVal3_C3 = tmpLABC3.getBValue();

                                colorVal1_C4 = tmpLABC4.getLValue();
                                colorVal2_C4 = tmpLABC4.getAValue();
                                colorVal3_C4 = tmpLABC4.getBValue();

                                colorVal1_C5 = tmpLABC5.getLValue();
                                colorVal2_C5 = tmpLABC5.getAValue();
                                colorVal3_C5 = tmpLABC5.getBValue();
                            break;
                            case "din99":
                                var tmpDIN99C1 = quadBands[bandIndex][0].calcDIN99Color(kE,kCH);
                                var tmpDIN99C2 = quadBands[bandIndex][1].calcDIN99Color(kE,kCH);
                                var tmpDIN99C3 = quadBands[bandIndex][2].calcDIN99Color(kE,kCH);
                                var tmpDIN99C4 = quadBands[bandIndex][3].calcDIN99Color(kE,kCH);
                                var tmpDIN99C5 = quadBands[bandIndex][4].calcDIN99Color(kE,kCH);
                                colorVal1_C1 = tmpDIN99C1.getL99Value();
                                colorVal2_C1 = tmpDIN99C1.getA99Value();
                                colorVal3_C1 = tmpDIN99C1.getB99Value();
                                    
                                colorVal1_C2 = tmpDIN99C2.getL99Value();
                                colorVal2_C2 = tmpDIN99C2.getA99Value();
                                colorVal3_C2 = tmpDIN99C2.getB99Value();

                                colorVal1_C3 = tmpDIN99C3.getL99Value();
                                colorVal2_C3 = tmpDIN99C3.getA99Value();
                                colorVal3_C3 = tmpDIN99C3.getB99Value();

                                colorVal1_C4 = tmpDIN99C4.getL99Value();
                                colorVal2_C4 = tmpDIN99C4.getA99Value();
                                colorVal3_C4 = tmpDIN99C4.getB99Value();

                                colorVal1_C5 = tmpDIN99C5.getL99Value();
                                colorVal2_C5 = tmpDIN99C5.getA99Value();
                                colorVal3_C5 = tmpDIN99C5.getB99Value();
                            break;
                            default:
                            return;
                        }
                    break;
                    default:
                        console.log("Error at the openpredefinedbands function");
                    

                }*/

               
        switch(dragPredefinedBandType){
            case 0:
                    // ->const
                    colormapBandSketchC1.splice(indexOfDroppedPlace, 0, constBands[dragPredefinedBandIndex]);
                    colormapBandSketchC2.splice(indexOfDroppedPlace, 0, constBands[dragPredefinedBandIndex]);

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
                        else{

                            // band in the middle
                            if(colormapBandSketchR1.length > indexOfDroppedPlace && indexOfDroppedPlace!=0){
                                var newPos = colormapBandSketchR2[indexOfDroppedPlace-1]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace-1]-colormapBandSketchR1[indexOfDroppedPlace-1])/2;
                                colormapBandSketchR2[indexOfDroppedPlace-1] = newPos;

                                var newPos2 = colormapBandSketchR2[indexOfDroppedPlace]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace]-colormapBandSketchR1[indexOfDroppedPlace])/2;
                                colormapBandSketchR1[indexOfDroppedPlace] = newPos2;

                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos2);
                            }
                        }

                        // band as frist
                        if(indexOfDroppedPlace==0){
                            var tmpVal = colormapBandSketchR1[0];
                            var dist = Math.abs(tmpVal-colormapBandSketchR2[0]);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal);
                        }

                    }
            break;
            case 1:
                    // ->scale
                    colormapBandSketchC1.splice(indexOfDroppedPlace, 0, scaleBands[dragPredefinedBandIndex][0]);
                    colormapBandSketchC2.splice(indexOfDroppedPlace, 0, scaleBands[dragPredefinedBandIndex][1]);
                    if(colormapBandSketchR1.length==0){
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, 0.0);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, 1.0);
                    }
                    else{



                        // band as least
                        if(indexOfDroppedPlace == colormapBandSketchR1.length){
                            var tmpVal = colormapBandSketchR2[indexOfDroppedPlace-1];
                            var dist = Math.abs(tmpVal-colormapBandSketchR1[indexOfDroppedPlace-1]);
                            console.log(tmpVal);
                            console.log(dist);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist);
                        }
                        else{
                            // band in the middle
                            if(indexOfDroppedPlace < colormapBandSketchR1.length && indexOfDroppedPlace!=0){
                            console.log(indexOfDroppedPlace);
                                var newPos = colormapBandSketchR2[indexOfDroppedPlace-1]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace-1]-colormapBandSketchR1[indexOfDroppedPlace-1])/2;
                                colormapBandSketchR2[indexOfDroppedPlace-1] = newPos;
                                
                                var newPos2 = colormapBandSketchR2[indexOfDroppedPlace]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace]-colormapBandSketchR1[indexOfDroppedPlace])/2;
                                colormapBandSketchR1[indexOfDroppedPlace] = newPos2;

                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos2);

                            }
                        }

                        // band as frist
                        if(indexOfDroppedPlace==0){
                            var tmpVal = colormapBandSketchR1[0];
                            var dist = Math.abs(tmpVal-colormapBandSketchR2[0]);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal);
                        }
                        
                    }
            break;
            case 2:
                    // ->double
                    colormapBandSketchC1.splice(indexOfDroppedPlace, 0, doubleBands[dragPredefinedBandIndex][1]);
                    colormapBandSketchC2.splice(indexOfDroppedPlace, 0, doubleBands[dragPredefinedBandIndex][2]);
                    colormapBandSketchC1.splice(indexOfDroppedPlace, 0, doubleBands[dragPredefinedBandIndex][0]);
                    colormapBandSketchC2.splice(indexOfDroppedPlace, 0, doubleBands[dragPredefinedBandIndex][1]);
                    if(colormapBandSketchR1.length==0){
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, 0.5);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, 1.0);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, 0.0);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, 0.5);
                    }
                    else{

                        // band as least
                        if(colormapBandSketchR1.length == indexOfDroppedPlace){
                            var tmpVal = colormapBandSketchR2[indexOfDroppedPlace-1];
                            var dist = Math.abs(tmpVal-colormapBandSketchR1[indexOfDroppedPlace-1]);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal+dist);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist*2);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist);
                        }
                        else{
                            // band in the middle
                            if(colormapBandSketchR1.length > indexOfDroppedPlace && indexOfDroppedPlace!=0){
                            
                                var newPos = colormapBandSketchR2[indexOfDroppedPlace-1]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace-1]-colormapBandSketchR1[indexOfDroppedPlace-1])/2;
                                colormapBandSketchR2[indexOfDroppedPlace-1] = newPos;
                                
                                var newPos2 = colormapBandSketchR2[indexOfDroppedPlace]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace]-colormapBandSketchR1[indexOfDroppedPlace])/2;
                                colormapBandSketchR1[indexOfDroppedPlace] = newPos2;

                                var dist = Math.abs(newPos2-newPos);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos+(0.5*dist));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos2);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos+(0.5*dist));
                            }

                            // band as frist
                            if(indexOfDroppedPlace==0){
                                var tmpVal = colormapBandSketchR1[0];
                                var dist = Math.abs(tmpVal-colormapBandSketchR2[0]);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist*2);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal-dist);
                            }
                        }
                        
                    }
            break;
            case 3:
                    // ->triple
                    colormapBandSketchC1.splice(indexOfDroppedPlace, 0, tribleBands[dragPredefinedBandIndex][2]);
                    colormapBandSketchC2.splice(indexOfDroppedPlace, 0, tribleBands[dragPredefinedBandIndex][3]);
                    colormapBandSketchC1.splice(indexOfDroppedPlace, 0, tribleBands[dragPredefinedBandIndex][1]);
                    colormapBandSketchC2.splice(indexOfDroppedPlace, 0, tribleBands[dragPredefinedBandIndex][2]);
                    colormapBandSketchC1.splice(indexOfDroppedPlace, 0, tribleBands[dragPredefinedBandIndex][0]);
                    colormapBandSketchC2.splice(indexOfDroppedPlace, 0, tribleBands[dragPredefinedBandIndex][1]);
                    if(colormapBandSketchR1.length==0){
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, 0.66);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, 1.0);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, 0.33);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, 0.66);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, 0.0);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, 0.33);
                    }
                    else{
                            // band as least
                        if(colormapBandSketchR1.length == indexOfDroppedPlace){
                            var tmpVal = colormapBandSketchR2[indexOfDroppedPlace-1];
                            var dist = Math.abs(tmpVal-colormapBandSketchR1[indexOfDroppedPlace-1]);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal+(dist*2));
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+(dist*3));
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal+(dist));
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+(dist*2));
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist);
                        }
                        else{
                            // band in the middle
                            if(colormapBandSketchR1.length > indexOfDroppedPlace && indexOfDroppedPlace!=0){
                            
                                var newPos = colormapBandSketchR2[indexOfDroppedPlace-1]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace-1]-colormapBandSketchR1[indexOfDroppedPlace-1])/2;
                                colormapBandSketchR2[indexOfDroppedPlace-1] = newPos;
                                
                                var newPos2 = colormapBandSketchR2[indexOfDroppedPlace]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace]-colormapBandSketchR1[indexOfDroppedPlace])/2;
                                colormapBandSketchR1[indexOfDroppedPlace] = newPos2;

                                var dist = Math.abs(newPos2-newPos);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos+(0.66*dist));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos2);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos+(0.33*dist));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos+(0.66*dist));
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos+(0.33*dist));
                            }

                            // band as frist
                            if(indexOfDroppedPlace==0){
                                var tmpVal = colormapBandSketchR1[0];
                                var dist = Math.abs(tmpVal-colormapBandSketchR2[0]);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-(dist));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-(dist*2));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal-(dist));
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-(dist*3));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal-(dist*2));
                            }
                        }
                        
                    }
            break;
            case 4:
                    // ->quad
                    colormapBandSketchC1.splice(indexOfDroppedPlace, 0, quadBands[dragPredefinedBandIndex][3]);
                    colormapBandSketchC2.splice(indexOfDroppedPlace, 0, quadBands[dragPredefinedBandIndex][4]);
                    colormapBandSketchC1.splice(indexOfDroppedPlace, 0, quadBands[dragPredefinedBandIndex][2]);
                    colormapBandSketchC2.splice(indexOfDroppedPlace, 0, quadBands[dragPredefinedBandIndex][3]);
                    colormapBandSketchC1.splice(indexOfDroppedPlace, 0, quadBands[dragPredefinedBandIndex][1]);
                    colormapBandSketchC2.splice(indexOfDroppedPlace, 0, quadBands[dragPredefinedBandIndex][2]);
                    colormapBandSketchC1.splice(indexOfDroppedPlace, 0, quadBands[dragPredefinedBandIndex][0]);
                    colormapBandSketchC2.splice(indexOfDroppedPlace, 0, quadBands[dragPredefinedBandIndex][1]);
                    if(colormapBandSketchR1.length==0){
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, 0.75);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, 1.0);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, 0.5);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, 0.75);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, 0.25);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, 0.5);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, 0.0);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, 0.25);
                    }
                    else{
                          // band as least
                        if(colormapBandSketchR1.length == indexOfDroppedPlace){
                            var tmpVal = colormapBandSketchR2[indexOfDroppedPlace-1];
                            var dist = Math.abs(tmpVal-colormapBandSketchR1[indexOfDroppedPlace-1]);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal+(dist*3));
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+(dist*4));
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal+(dist*2));
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+(dist*3));
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal+(dist));
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+(dist*2));
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist);
                        }
                        else{
                            // band in the middle
                            if(colormapBandSketchR1.length > indexOfDroppedPlace && indexOfDroppedPlace!=0){
                            
                                var newPos = colormapBandSketchR2[indexOfDroppedPlace-1]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace-1]-colormapBandSketchR1[indexOfDroppedPlace-1])/2;
                                colormapBandSketchR2[indexOfDroppedPlace-1] = newPos;
                                
                                var newPos2 = colormapBandSketchR2[indexOfDroppedPlace]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace]-colormapBandSketchR1[indexOfDroppedPlace])/2;
                                colormapBandSketchR1[indexOfDroppedPlace] = newPos2;

                                var dist = Math.abs(newPos2-newPos);
                                 colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos+(0.75*dist));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos2);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos+(0.5*dist));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos+(0.75*dist));
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos+(0.25*dist));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos+(0.5*dist));
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos+(0.25*dist));
                            }

                            // band as frist
                            if(indexOfDroppedPlace==0){
                                var tmpVal = colormapBandSketchR1[0];
                                var dist = Math.abs(tmpVal-colormapBandSketchR2[0]);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-(dist));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-(dist*2));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal-(dist));
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-(dist*3));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal-(dist*2));
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-(dist*4));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal-(dist*3));
                            }
                        }
                    }

            break;
        
            default:
        }

        
       /* if(colormapBandSketchR1.length==0){
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

        }*/

        orderColorSketch();
    

    /////////////
    //// Sketch Band

    /*if(bandInsideOfSketch){

        document.getElementById("dragPos"+indexOfDroppedPlace).style.background = "none";

        // open Band Options

      
        createSide_OpenBandOption(true);

    }*/
   
}


////////////////////////////////////////////////
///////////////////////////////////////////////

function orderColorSketch(){

   
    document.getElementById("id_colormapSketch").innerHTML = null;
    dropPositionElements = [];
    droppedBandElements = [];

    if(colormapBandSketchC1.length!=0){ 

        document.getElementById("id_colormapSketch").style.border = "none";

        var tmpRect = document.getElementById("id_colormapSketch").getBoundingClientRect();
        
        var tmpLength = tmpRect.width/colormapBandSketchC1.length-1;//100/(colormapBandSketchC1.length-1);

        for(var i=0; i<colormapBandSketchC1.length; i++){

            // create drop place
            var tDiv = document.createElement('div');
            tDiv.id = 'dragPos'+i;
            tDiv.style.border = "3px solid red";
            tDiv.style.height = 100 +'%'; 
            tDiv.style.width = 100+'%';
            tDiv.style.display = "none";
            //tDiv.style.visibility = "hidden";
            tDiv.style.lineHeight = "8vh";
            tDiv.style.fontSize = "2vh";
            tDiv.style.textAlign = "center";
            tDiv.style.verticalAlign = "middle";
            tDiv.innerHTML = "Here";

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
            droppedBandElements.push(tCan);

            tCan.style.height = 100 +'%'; 
            tCan.style.maxWidth = tmpLength + "px"; //100 +'%';
            tCan.style.width = tmpLength + "px"; //100 +'%';
            tCan.style.cursor = "move";

            drawCanvasBand(tCan, colormapBandSketchC1[i], colormapBandSketchC2[i],tCan.width,tCan.height );

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
            t2Div.style.lineHeight = "8vh";
            t2Div.style.fontSize = "2vh";
            t2Div.style.textAlign = "center";
            t2Div.style.verticalAlign = "middle";
            t2Div.innerHTML = "Here";

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
        t2Div.style.lineHeight = "8vh";
        t2Div.style.fontSize = "4vh";
        t2Div.style.textAlign = "center";
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

    calcColormap();
    drawCanvasColormap("id_linearColormap",1920, 250, createColormap);
    drawKeys("id_keyColormap",1920, 100, createColormap)
    fillTable();
    // draw preview colormap
    //bandListToColormap();
    //createSide_drawColormap();
    //createSide_drawColormapInSpace();

}
