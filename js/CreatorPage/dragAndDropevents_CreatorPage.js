
/////////////////////////////////////////////
//  Drag And Drop
////////////////////////////////////////////

function bandOnDragStart(event){

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", event.target.getAttribute('id') );
    document.getElementById("id_createColormapKeys").style.visibility="hidden";
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
                        dragPredefinedBandType = 4;
                        tmpString = tmpString.substr(5);
                        dragPredefinedBandIndex = parseInt(tmpString);
                    break;
                    default:
                        console.log("Error at the openpredefinedbands function");


                }

    }

    // show  all drop positions
        if(bandSketch.getBandLength()==0){
            dropPositionElements[0].style.border = "3px dashed red";
        }
        else{

            var tmpRect = document.getElementById("id_colormapSketch").getBoundingClientRect();
            var tmpLength =(tmpRect.width-((bandSketch.getBandLength()+1)*6)-bandSketch.getBandLength()*2)/(bandSketch.getBandLength()+1+bandSketch.getBandLength());//100/(bandSketch.getBandLength()-1);

            for(var i=0; i<dropPositionElements.length; i++){
                dropPositionElements[i].style.display = "initial";
                dropPositionElements[i].style.width = tmpLength+"px";
            }

            for(var i=0; i<droppedBandElements.length; i++){
                droppedBandElements[i].style.width = tmpLength+"px";
            }

            for(var i=0; i<refLineSketchContainer.length; i++){
                refLineSketchContainer[i].style.display = "none";
            }



        }


}

function bandOnDragEnd(event) {
    document.getElementById("id_createColormapKeys").style.visibility="visible";
    dragPredefinedBandIndex = bandIndex;
    dragPredefinedBandType = createBandType;

    if(bandSketch.getBandLength()==0){
         //document.getElementById("createSide_SketchLabel").style.display = "initial";
         //document.getElementById("createSide_YourColormapDummy").style.border = "2px dashed black";
         dropPositionElements[0].style.border = "3px dashed black";
    }
    else{
        // hide all drop positions
        var tmpRect = document.getElementById("id_colormapSketch").getBoundingClientRect();
        var tmpLength;
        tmpLength = tmpRect.width/bandSketch.getBandLength()-2; //2 = border width of each band.


        //if(bandSketch.getBandLength()==1)
        // tmpLength = tmpRect.width;//100/(bandSketch.getBandLength()-1);
        //else
        // tmpLength = tmpRect.width/(bandSketch.getBandLength()-1);//100/(bandSketch.getBandLength()-1);


        for(var i=0; i<dropPositionElements.length; i++){
                dropPositionElements[i].style.display = "none";
        }

        for(var i=0; i<droppedBandElements.length; i++){
                droppedBandElements[i].style.width = tmpLength+"px";
        }

        for(var i=0; i<refLineSketchContainer.length; i++){
            refLineSketchContainer[i].style.display = "initial";
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

        if(indexOfDroppedPlace==-1)
        return;
        //document.getElementById("dragPos"+indexOfDroppedPlace).style.background = "none";

        switch(dragPredefinedBandType){
            case 0:
                    // ->const
                    if(bandSketch.getBandLength()==0){
                            bandSketch.spliceBand(indexOfDroppedPlace, constBands[dragPredefinedBandIndex], constBands[dragPredefinedBandIndex], 0.0, 1.0);
                    }
                    else{

                        // band as least
                        if(bandSketch.getBandLength() == indexOfDroppedPlace){
                            var tmpVal = bandSketch.getRefR2(indexOfDroppedPlace-1);
                            var dist = Math.abs(tmpVal-bandSketch.getRefR1(indexOfDroppedPlace-1));
                            bandSketch.setRefR2(indexOfDroppedPlace-1,tmpVal-dist*0.5);
                            bandSketch.spliceBand(indexOfDroppedPlace, constBands[dragPredefinedBandIndex], constBands[dragPredefinedBandIndex], tmpVal-dist*0.5, tmpVal);
                        }
                        else{

                            // band in the middle
                            if(bandSketch.getBandLength() > indexOfDroppedPlace && indexOfDroppedPlace!=0){
                                var newPos = bandSketch.getRefR2(indexOfDroppedPlace-1)-Math.abs(bandSketch.getRefR2(indexOfDroppedPlace-1)-bandSketch.getRefR1(indexOfDroppedPlace-1))/2;
                                bandSketch.setRefR2(indexOfDroppedPlace-1,newPos);

                                var newPos2 = bandSketch.getRefR2(indexOfDroppedPlace)-Math.abs(bandSketch.getRefR2(indexOfDroppedPlace)-bandSketch.getRefR1(indexOfDroppedPlace))/2;
                                bandSketch.setRefR1(indexOfDroppedPlace,newPos2);

                                bandSketch.spliceBand(indexOfDroppedPlace, constBands[dragPredefinedBandIndex], constBands[dragPredefinedBandIndex], newPos, newPos2);
                            }
                        }

                        // band as frist
                        if(indexOfDroppedPlace==0){
                            var tmpVal = bandSketch.getRefR1(0);
                            var dist = Math.abs(tmpVal-bandSketch.getRefR2(0));
                            bandSketch.setRefR1(0,tmpVal+dist*0.5);

                            bandSketch.spliceBand(indexOfDroppedPlace, constBands[dragPredefinedBandIndex], constBands[dragPredefinedBandIndex], tmpVal, tmpVal+dist*0.5);

                        }

                    }
            break;
            case 1:
                    // ->scale
                    if(bandSketch.getBandLength()==0){
                            bandSketch.spliceBand(indexOfDroppedPlace, scaleBands[dragPredefinedBandIndex][0], scaleBands[dragPredefinedBandIndex][1], 0.0, 1.0);
                    }
                    else{

                        // band as least
                        if(indexOfDroppedPlace == bandSketch.getBandLength()){
                            var tmpVal = bandSketch.getRefR2(indexOfDroppedPlace-1);
                            var dist = Math.abs(tmpVal-bandSketch.getRefR1(indexOfDroppedPlace-1));
                            bandSketch.setRefR2(indexOfDroppedPlace-1,tmpVal-dist*0.5);
                            bandSketch.spliceBand(indexOfDroppedPlace, scaleBands[dragPredefinedBandIndex][0], scaleBands[dragPredefinedBandIndex][1], tmpVal-dist*0.5, tmpVal);
                        }
                        else{
                            // band in the middle
                            if(indexOfDroppedPlace < bandSketch.getBandLength() && indexOfDroppedPlace!=0){

                                var newPos = bandSketch.getRefR2(indexOfDroppedPlace-1)-Math.abs(bandSketch.getRefR2(indexOfDroppedPlace-1)-bandSketch.getRefR1(indexOfDroppedPlace-1))/2;
                                bandSketch.setRefR2(indexOfDroppedPlace-1,newPos);

                                var newPos2 = bandSketch.getRefR2(indexOfDroppedPlace)-Math.abs(bandSketch.getRefR2(indexOfDroppedPlace)-bandSketch.getRefR1(indexOfDroppedPlace))/2;
                                bandSketch.setRefR1(indexOfDroppedPlace,newPos2);
                                bandSketch.spliceBand(indexOfDroppedPlace, scaleBands[dragPredefinedBandIndex][0], scaleBands[dragPredefinedBandIndex][1], newPos, newPos2);

                            }
                        }

                        // band as frist
                        if(indexOfDroppedPlace==0){
                            var tmpVal = bandSketch.getRefR1(0);
                            var dist = Math.abs(tmpVal-bandSketch.getRefR2(0));
                            bandSketch.setRefR1(0,tmpVal+dist*0.5);
                            bandSketch.spliceBand(indexOfDroppedPlace, scaleBands[dragPredefinedBandIndex][0], scaleBands[dragPredefinedBandIndex][1], tmpVal, tmpVal+dist*0.5);
                        }

                    }
            break;
            case 2:
                    // ->double


                    if(bandSketch.getBandLength()==0){
                            bandSketch.spliceBand(indexOfDroppedPlace, doubleBands[dragPredefinedBandIndex][2], doubleBands[dragPredefinedBandIndex][3], 0.5, 1.0);
                            bandSketch.spliceBand(indexOfDroppedPlace, doubleBands[dragPredefinedBandIndex][0], doubleBands[dragPredefinedBandIndex][1], 0.0, 0.5);
                    }
                    else{

                        // band as least
                        if(bandSketch.getBandLength() == indexOfDroppedPlace){
                            var tmpVal = bandSketch.getRefR2(indexOfDroppedPlace-1);
                            var dist = Math.abs(tmpVal-bandSketch.getRefR1(indexOfDroppedPlace-1));
                            bandSketch.setRefR2(indexOfDroppedPlace-1,tmpVal-dist*0.5);
                            bandSketch.spliceBand(indexOfDroppedPlace, doubleBands[dragPredefinedBandIndex][2], doubleBands[dragPredefinedBandIndex][3], tmpVal-dist*0.25, tmpVal);
                            bandSketch.spliceBand(indexOfDroppedPlace, doubleBands[dragPredefinedBandIndex][0], doubleBands[dragPredefinedBandIndex][1], tmpVal-dist*0.5,  tmpVal-dist*0.25);
                        }
                        else{
                            // band in the middle
                            if(bandSketch.getBandLength() > indexOfDroppedPlace && indexOfDroppedPlace!=0){

                                var newPos = bandSketch.getRefR2(indexOfDroppedPlace-1)-Math.abs(bandSketch.getRefR2(indexOfDroppedPlace-1)-bandSketch.getRefR1(indexOfDroppedPlace-1))/2;
                                bandSketch.setRefR2(indexOfDroppedPlace-1,newPos);

                                var newPos2 = bandSketch.getRefR2(indexOfDroppedPlace)-Math.abs(bandSketch.getRefR2(indexOfDroppedPlace)-bandSketch.getRefR1(indexOfDroppedPlace))/2;
                                bandSketch.setRefR1(indexOfDroppedPlace,newPos2);

                                var dist = Math.abs(newPos2-newPos);
                                bandSketch.spliceBand(indexOfDroppedPlace, doubleBands[dragPredefinedBandIndex][2], doubleBands[dragPredefinedBandIndex][3], newPos+(0.5*dist), newPos2);
                                bandSketch.spliceBand(indexOfDroppedPlace, doubleBands[dragPredefinedBandIndex][0], doubleBands[dragPredefinedBandIndex][1], newPos, newPos+(0.5*dist));
                            }

                            // band as frist
                            if(indexOfDroppedPlace==0){
                                var tmpVal = bandSketch.getRefR1(0);
                                var dist = Math.abs(tmpVal-bandSketch.getRefR2(0));
                                bandSketch.setRefR1(0,tmpVal+dist*0.5);
                                bandSketch.spliceBand(indexOfDroppedPlace, doubleBands[dragPredefinedBandIndex][2], doubleBands[dragPredefinedBandIndex][3], tmpVal+dist*0.25, tmpVal+dist*0.5);
                                bandSketch.spliceBand(indexOfDroppedPlace, doubleBands[dragPredefinedBandIndex][0], doubleBands[dragPredefinedBandIndex][1], tmpVal, tmpVal+dist*0.25);
                            }
                        }

                    }
            break;
            case 3:
                    // ->triple

                    if(bandSketch.getBandLength()==0){
                            bandSketch.spliceBand(indexOfDroppedPlace, tribleBands[dragPredefinedBandIndex][4], tribleBands[dragPredefinedBandIndex][5], 0.66, 1.0);
                            bandSketch.spliceBand(indexOfDroppedPlace, tribleBands[dragPredefinedBandIndex][2], tribleBands[dragPredefinedBandIndex][3], 0.33, 0.66);
                            bandSketch.spliceBand(indexOfDroppedPlace, tribleBands[dragPredefinedBandIndex][0], tribleBands[dragPredefinedBandIndex][1], 0.0, 0.33);
                    }
                    else{
                            // band as least
                        if(bandSketch.getBandLength() == indexOfDroppedPlace){
                            var tmpVal = bandSketch.getRefR2(indexOfDroppedPlace-1);
                            var dist = Math.abs(tmpVal-bandSketch.getRefR1(indexOfDroppedPlace-1));
                            bandSketch.setRefR2(indexOfDroppedPlace-1,tmpVal-dist*0.5);
                            bandSketch.spliceBand(indexOfDroppedPlace, tribleBands[dragPredefinedBandIndex][4], tribleBands[dragPredefinedBandIndex][5], tmpVal-dist*(0.5/3), tmpVal);
                            bandSketch.spliceBand(indexOfDroppedPlace, tribleBands[dragPredefinedBandIndex][2], tribleBands[dragPredefinedBandIndex][3], tmpVal-dist*(1/3), tmpVal-dist*(0.5/3));
                            bandSketch.spliceBand(indexOfDroppedPlace, tribleBands[dragPredefinedBandIndex][0], tribleBands[dragPredefinedBandIndex][1], tmpVal-dist*0.5, tmpVal-dist*(1/3));
                        }
                        else{
                            // band in the middle
                            if(bandSketch.getBandLength() > indexOfDroppedPlace && indexOfDroppedPlace!=0){

                                var newPos = bandSketch.getRefR2(indexOfDroppedPlace-1)-Math.abs(bandSketch.getRefR2(indexOfDroppedPlace-1)-bandSketch.getRefR1(indexOfDroppedPlace-1))/2;
                                bandSketch.setRefR2(indexOfDroppedPlace-1,newPos);

                                var newPos2 = bandSketch.getRefR2(indexOfDroppedPlace)-Math.abs(bandSketch.getRefR2(indexOfDroppedPlace)-bandSketch.getRefR1(indexOfDroppedPlace))/2;
                                bandSketch.setRefR1(indexOfDroppedPlace,newPos2);

                                var dist = Math.abs(newPos2-newPos);
                                bandSketch.spliceBand(indexOfDroppedPlace, tribleBands[dragPredefinedBandIndex][4], tribleBands[dragPredefinedBandIndex][5], newPos+(2/3*dist), newPos2);
                                bandSketch.spliceBand(indexOfDroppedPlace, tribleBands[dragPredefinedBandIndex][2], tribleBands[dragPredefinedBandIndex][3], newPos+(1/3*dist), newPos+(2/3*dist));
                                bandSketch.spliceBand(indexOfDroppedPlace, tribleBands[dragPredefinedBandIndex][0], tribleBands[dragPredefinedBandIndex][1], newPos, newPos+(1/3*dist));
                            }

                            // band as frist
                            if(indexOfDroppedPlace==0){
                                var tmpVal = bandSketch.getRefR1(0);
                                var dist = Math.abs(tmpVal-bandSketch.getRefR2(0));
                                bandSketch.setRefR1(0,tmpVal+dist*0.5);
                                bandSketch.spliceBand(indexOfDroppedPlace, tribleBands[dragPredefinedBandIndex][4], tribleBands[dragPredefinedBandIndex][5], tmpVal+dist*1/3, tmpVal+dist*0.5);
                                bandSketch.spliceBand(indexOfDroppedPlace, tribleBands[dragPredefinedBandIndex][2], tribleBands[dragPredefinedBandIndex][3], tmpVal+dist*0.5/3, tmpVal+dist*1/3);
                                bandSketch.spliceBand(indexOfDroppedPlace, tribleBands[dragPredefinedBandIndex][0], tribleBands[dragPredefinedBandIndex][1], tmpVal, tmpVal+dist*0.5/3);
                            }
                        }

                    }
            break;
            case 4:
                    // ->quad

                    if(bandSketch.getBandLength()==0){
                            bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][6], quadBands[dragPredefinedBandIndex][7], 0.75, 1.0 );
                            bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][4], quadBands[dragPredefinedBandIndex][5], 0.5, 0.75 );
                            bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][2], quadBands[dragPredefinedBandIndex][3], 0.25, 0.5 );
                            bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][0], quadBands[dragPredefinedBandIndex][1], 0.0, 0.25);
                    }
                    else{
                          // band as least
                        if(bandSketch.getBandLength() == indexOfDroppedPlace){
                            var tmpVal = bandSketch.getRefR2(indexOfDroppedPlace-1);
                            var dist = Math.abs(tmpVal-bandSketch.getRefR1(indexOfDroppedPlace-1));
                            bandSketch.setRefR2(indexOfDroppedPlace-1,tmpVal-dist*0.5);
                            bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][6], quadBands[dragPredefinedBandIndex][7], tmpVal-(dist*0.125), tmpVal);
                            bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][4], quadBands[dragPredefinedBandIndex][5], tmpVal-(dist*0.25), tmpVal-(dist*0.125));
                            bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][2], quadBands[dragPredefinedBandIndex][3], tmpVal-(dist*0.375), tmpVal-(dist*0.25));
                            bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][0], quadBands[dragPredefinedBandIndex][1], tmpVal-dist*0.5 , tmpVal-(dist*0.375));
                        }
                        else{
                            // band in the middle
                            if(bandSketch.getBandLength() > indexOfDroppedPlace && indexOfDroppedPlace!=0){

                                var newPos = bandSketch.getRefR2(indexOfDroppedPlace-1)-Math.abs(bandSketch.getRefR2(indexOfDroppedPlace-1)-bandSketch.getRefR1(indexOfDroppedPlace-1))/2;
                                bandSketch.setRefR2(indexOfDroppedPlace-1,newPos);

                                var newPos2 = bandSketch.getRefR2(indexOfDroppedPlace)-Math.abs(bandSketch.getRefR2(indexOfDroppedPlace)-bandSketch.getRefR1(indexOfDroppedPlace))/2;
                                bandSketch.setRefR1(indexOfDroppedPlace,newPos2);

                                var dist = Math.abs(newPos2-newPos);
                                bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][6], quadBands[dragPredefinedBandIndex][7], newPos+(0.75*dist), newPos2);
                                bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][4], quadBands[dragPredefinedBandIndex][5], newPos+(0.5*dist), newPos+(0.75*dist));
                                bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][2], quadBands[dragPredefinedBandIndex][3], newPos+(0.25*dist), newPos+(0.5*dist));
                                bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][0], quadBands[dragPredefinedBandIndex][1], newPos, newPos+(0.25*dist));
                            }

                            // band as frist
                            if(indexOfDroppedPlace==0){
                                var tmpVal = bandSketch.getRefR1(0);
                                var dist = Math.abs(tmpVal-bandSketch.getRefR2(0));
                                bandSketch.setRefR1(0,tmpVal+dist*0.5);
                                bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][6], quadBands[dragPredefinedBandIndex][7], tmpVal+(dist*0.375), tmpVal+dist*0.5);
                                bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][4], quadBands[dragPredefinedBandIndex][5], tmpVal+(dist*0.25), tmpVal+(dist*0.375));
                                bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][2], quadBands[dragPredefinedBandIndex][3], tmpVal+(dist*0.125), tmpVal+(dist*0.25));
                                bandSketch.spliceBand(indexOfDroppedPlace, quadBands[dragPredefinedBandIndex][0], quadBands[dragPredefinedBandIndex][1], tmpVal, tmpVal+(dist*0.125));
                            }
                        }
                    }

            break;

            default:
        }




        orderColorSketch(colorspaceModus);


  /////////////
  ////  Save Band Process

      saveCreateProcess();


}


////////////////////////////////////////////////
