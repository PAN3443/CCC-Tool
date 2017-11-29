
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
///////////////////////////////////////////////

function orderColorSketch(){

    document.getElementById("id_colormapSketch").innerHTML = null;

    for(var i = dropPositionElements.length-1; i>=0; i--){
      dropPositionElements[i].remove();
      dropPositionElements.pop();
    }

    for(var i = droppedBandElements.length-1; i>=0; i--){
      droppedBandElements[i].remove();
      droppedBandElements.pop();
    }

    for(var i = refLineSketchContainer.length-1; i>=0; i--){
      refLineSketchContainer[i].remove();
      refLineSketchContainer.pop();
    }

    if(colormapBandSketchC1.length!=0){

      // show and draw the colormap
      document.getElementById("id_LinearMap_Table_Div").style.display = "initial";
      calcColormap();
      drawCanvasColormap("id_linearColormap",linearMap_resolution_X, linearMap_resolution_Y, createColormap);
      drawKeys("id_keyColormap",key_resolution_X, key_resolution_Y, createColormap, "id_keyColormapLinesBottom",false)
      fillTable();

      //////////////////////////////////////////////////////////////////////////

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

            //tCan.addEventListener("dragstart", createSide_BandOnDragStart);
            //tCan.addEventListener("dragend", createSide_BandOnDragEnd);
            tCan.addEventListener("click", bandOnClick);

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            var refLineDiv = document.createElement('div');
            refLineDiv.style.height = 100 +'%';
            refLineDiv.style.width = 100+'%';
            refLineDiv.style.borderLeft = "1px solid black";

            //tDiv.style.visibility = "hidden";

            document.getElementById("id_colormapSketch_Ref").appendChild(refLineDiv);
            refLineSketchContainer.push(refLineDiv);


            /////////////////// draw ref /////////
            var tmpText = ''+colormapBandSketchR1[i].toFixed(numDecimalPlaces);

            var box = document.getElementById("id_colormapSketch_Ref").getBoundingClientRect();

            var body = document.body;
            var docEl = document.documentElement;

            var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

            var clientTop = docEl.clientTop || body.clientTop || 0;
            var clientLeft = docEl.clientLeft || body.clientLeft || 0;

            var top  = box.top +  scrollTop - clientTop;
            var left = box.left + scrollLeft - clientLeft;

            var p = document.createElement('p');
            var xposHTML = ((i)/colormapBandSketchC1.length)*box.width+left;
            var yposHTML = box.height+top;

            document.body.appendChild(p);
            p.innerHTML = tmpText;
            p.width = "min-content";
            p.style.background = "rgb(255,255,255)";
            p.style.paddingLeft = 5+"px";
            p.style.paddingRight = 5+"px";
            p.style.border = "2px solid rgb(0,0,0)";
            p.style.margin = "0px";

            p.style.position = "absolute";
            p.style.top = Math.round(yposHTML)+"px";
            p.style.left = Math.round(xposHTML)+"px";
            refLineSketchContainer.push(p);
            xposHTML = xposHTML-(p.getBoundingClientRect().width/2);
            p.style.left = Math.round(xposHTML)+"px";

            /////////////////// special case: last element /////////
            if(i==colormapBandSketchC1.length-1){
              refLineDiv.style.borderRight = "1px solid black";

              var tmpText = ''+colormapBandSketchR2[i].toFixed(numDecimalPlaces);

              var p2 = document.createElement('p');
              xposHTML = box.width+left;

              document.body.appendChild(p2);
              p2.innerHTML = tmpText;
              p2.width = "min-content";
              p2.style.background = "rgb(255,255,255)";
              p2.style.paddingLeft = 5+"px";
              p2.style.paddingRight = 5+"px";
              p2.style.border = "2px solid rgb(0,0,0)";
              p2.style.margin = "0px";

              p2.style.position = "absolute";
              p2.style.top = Math.round(yposHTML)+"px";
              p2.style.left = Math.round(xposHTML)+"px";
              refLineSketchContainer.push(p2);
              xposHTML = xposHTML-(p.getBoundingClientRect().width/2);
              p2.style.left = Math.round(xposHTML)+"px";
            }
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

        document.getElementById("id_LinearMap_Table_Div").style.display = "none";


    }


}
