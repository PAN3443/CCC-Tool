
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

            for(var i=0; i<refLineSketchContainer.length; i++){
                refLineSketchContainer[i].style.display = "none";
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


        //document.getElementById("dragPos"+indexOfDroppedPlace).style.background = "none";

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
                            colormapBandSketchR2[indexOfDroppedPlace-1] = tmpVal-dist*0.5;
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist*0.5);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal);
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
                            colormapBandSketchR1[0] = tmpVal+dist*0.5;
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist*0.5);

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
                            colormapBandSketchR2[indexOfDroppedPlace-1] = tmpVal-dist*0.5;
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist*0.5);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal);
                        }
                        else{
                            // band in the middle
                            if(indexOfDroppedPlace < colormapBandSketchR1.length && indexOfDroppedPlace!=0){

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
                            colormapBandSketchR1[0] = tmpVal+dist*0.5;
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist*0.5);
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
                            colormapBandSketchR2[indexOfDroppedPlace-1] = tmpVal-dist*0.5;
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist*0.25);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist*0.5);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal-dist*0.25);
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
                                colormapBandSketchR1[0] = tmpVal+dist*0.5;
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal+dist*0.25);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist*0.5);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist*0.25);
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
                            colormapBandSketchR2[indexOfDroppedPlace-1] = tmpVal-dist*0.5;
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist*(0.5/3));
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist*(1/3));
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal-dist*(0.5/3));
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist*0.5);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal-dist*(1/3));
                        }
                        else{
                            // band in the middle
                            if(colormapBandSketchR1.length > indexOfDroppedPlace && indexOfDroppedPlace!=0){

                                var newPos = colormapBandSketchR2[indexOfDroppedPlace-1]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace-1]-colormapBandSketchR1[indexOfDroppedPlace-1])/2;
                                colormapBandSketchR2[indexOfDroppedPlace-1] = newPos;

                                var newPos2 = colormapBandSketchR2[indexOfDroppedPlace]-Math.abs(colormapBandSketchR2[indexOfDroppedPlace]-colormapBandSketchR1[indexOfDroppedPlace])/2;
                                colormapBandSketchR1[indexOfDroppedPlace] = newPos2;

                                var dist = Math.abs(newPos2-newPos);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos+(2/3*dist));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos2);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos+(1/3*dist));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos+(2/3*dist));
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, newPos);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, newPos+(1/3*dist));
                            }

                            // band as frist
                            if(indexOfDroppedPlace==0){
                                var tmpVal = colormapBandSketchR1[0];
                                var dist = Math.abs(tmpVal-colormapBandSketchR2[0]);
                                colormapBandSketchR1[0] = tmpVal+dist*0.5;
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal+dist*1/3);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist*0.5);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal+dist*0.5/3);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist*1/3);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist*0.5/3);
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
                            colormapBandSketchR2[indexOfDroppedPlace-1] = tmpVal-dist*0.5;
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-(dist*0.125));
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal);
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-(dist*0.25));
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal-(dist*0.125));
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-(dist*0.375));
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal-(dist*0.25));
                            colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal-dist*0.5);
                            colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal-(dist*0.375));
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
                                colormapBandSketchR1[0] = tmpVal+dist*0.5;
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal+(dist*0.375));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+dist*0.5);
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal+(dist*0.25));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+(dist*0.375));
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal+(dist*0.125));
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+(dist*0.25));
                                colormapBandSketchR1.splice(indexOfDroppedPlace, 0, tmpVal);
                                colormapBandSketchR2.splice(indexOfDroppedPlace, 0, tmpVal+(dist*0.125));
                            }
                        }
                    }

            break;

            default:
        }




        orderColorSketch();


  /////////////
  ////  Save Band Process

      saveCreateProcess();


}


////////////////////////////////////////////////
