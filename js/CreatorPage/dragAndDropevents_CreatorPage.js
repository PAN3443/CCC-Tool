
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
        if(globalCMS1.getKeyLength()==0){
            dropPositionElements[0].style.border = "3px dashed red";
        }
        else{

            var tmpRect = document.getElementById("id_colormapSketch").getBoundingClientRect();
            var tmpLength =(tmpRect.width-((globalCMS1.getKeyLength())*6)-(globalCMS1.getKeyLength()-1)*2)/(globalCMS1.getKeyLength()+globalCMS1.getKeyLength()-1);//100/(bandSketch.getBandLength()-1);

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

    if(globalCMS1.getKeyLength()==0){
         //document.getElementById("createSide_SketchLabel").style.display = "initial";
         //document.getElementById("createSide_YourColormapDummy").style.border = "2px dashed black";
         dropPositionElements[0].style.border = "3px dashed black";
    }
    else{
        // hide all drop positions
        var tmpRect = document.getElementById("id_colormapSketch").getBoundingClientRect();
        var tmpLength;
        tmpLength = tmpRect.width/(globalCMS1.getKeyLength()-1)-2; //2 = border width of each band.


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

  somethingChanged = true;
    /////////////
    //// Creator Band

        if(indexOfDroppedPlace==-1)
        return;
        //document.getElementById("dragPos"+indexOfDroppedPlace).style.background = "none";

        switch(dragPredefinedBandType){
            case 0:
                    // ->const
                    if(globalCMS1.getKeyLength()==0){
                            globalCMS1.pushKey(new class_Key(undefined, undefined,0.0)); // nil key
                            globalCMS1.pushKey(new class_Key(constBands[dragPredefinedBandIndex], undefined,1.0)); // left key
                    }
                    else{

                        // band at the end

                        switch (indexOfDroppedPlace) {
                          case globalCMS1.getKeyLength()-1:
                            // case constant
                            var tmpVal = globalCMS1.getRefPosition(indexOfDroppedPlace);
                            var dist = Math.abs(tmpVal-globalCMS1.getRefPosition(indexOfDroppedPlace-1));
                            globalCMS1.setRefPosition(indexOfDroppedPlace,tmpVal-dist*0.5);
                            globalCMS1.pushKey(new class_Key(constBands[dragPredefinedBandIndex],undefined,tmpVal)); // push left key
                            break;

                          default:
                            var startPos = globalCMS1.getRefPosition(indexOfDroppedPlace);
                            var endPos = (startPos+Math.abs(globalCMS1.getRefPosition(indexOfDroppedPlace+1)-startPos)*0.5);

                            ///////////
                            ///// split key
                            globalCMS1.setRefPosition(indexOfDroppedPlace,endPos);

                            // case constant add Keys
                            var oldColor = globalCMS1.getLeftKeyColor(indexOfDroppedPlace,"lab");
                            globalCMS1.setLeftKeyColor(indexOfDroppedPlace,constBands[dragPredefinedBandIndex]); // create left key
                            globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(oldColor,undefined,startPos));

                        }


                    }
            break;
            case 1:
                    // ->scale
                    if(globalCMS1.getKeyLength()==0){
                            globalCMS1.pushKey(new class_Key(undefined, scaleBands[dragPredefinedBandIndex][0],0.0)); // right key
                            globalCMS1.pushKey(new class_Key(scaleBands[dragPredefinedBandIndex][1], undefined,1.0)); // left key
                    }
                    else{


                      switch (indexOfDroppedPlace) {
                        case globalCMS1.getKeyLength()-1:
                          // case scaled band
                          var tmpVal = globalCMS1.getRefPosition(indexOfDroppedPlace);
                          var dist = Math.abs(tmpVal-globalCMS1.getRefPosition(indexOfDroppedPlace-1));
                          globalCMS1.setRefPosition(indexOfDroppedPlace,tmpVal-dist*0.5);
                          globalCMS1.setRightKeyColor(indexOfDroppedPlace,scaleBands[dragPredefinedBandIndex][0]); // update old left key
                          globalCMS1.pushKey(new class_Key(scaleBands[dragPredefinedBandIndex][1],undefined,tmpVal)); // push new left key
                          break;

                        default:
                          var startPos = globalCMS1.getRefPosition(indexOfDroppedPlace);
                          var endPos = (startPos+Math.abs(globalCMS1.getRefPosition(indexOfDroppedPlace+1)-startPos)*0.5);

                          ///////////
                          ///// split key
                          globalCMS1.setRefPosition(indexOfDroppedPlace,endPos);

                          // case constant add Keys
                          var oldColor = globalCMS1.getLeftKeyColor(indexOfDroppedPlace,"lab");
                          globalCMS1.setLeftKeyColor(indexOfDroppedPlace,scaleBands[dragPredefinedBandIndex][1]);
                          globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(oldColor,scaleBands[dragPredefinedBandIndex][0],startPos));

                      }


                    }
            break;
            case 2:
                    // ->double


                    if(globalCMS1.getKeyLength()==0){

                            globalCMS1.pushKey(new class_Key(undefined, checkConstantBand(doubleBands[dragPredefinedBandIndex][0], doubleBands[dragPredefinedBandIndex][1]),0.0)); // nil or right key
                            globalCMS1.pushKey(new class_Key(doubleBands[dragPredefinedBandIndex][1], checkConstantBand(doubleBands[dragPredefinedBandIndex][2], doubleBands[dragPredefinedBandIndex][3]),0.5)); // left key
                            globalCMS1.pushKey(new class_Key(doubleBands[dragPredefinedBandIndex][3], undefined,1.0)); // left key

                    }
                    else{

                      switch (indexOfDroppedPlace) {
                        case globalCMS1.getKeyLength()-1:
                          var tmpVal = globalCMS1.getRefPosition(indexOfDroppedPlace);
                          var dist = Math.abs(tmpVal-globalCMS1.getRefPosition(indexOfDroppedPlace-1))*0.5;
                          globalCMS1.setRefPosition(indexOfDroppedPlace,tmpVal-dist);
                          globalCMS1.setRightKeyColor(indexOfDroppedPlace,checkConstantBand(doubleBands[dragPredefinedBandIndex][0], doubleBands[dragPredefinedBandIndex][1])); // update old left key
                          globalCMS1.pushKey(new class_Key(doubleBands[dragPredefinedBandIndex][1], checkConstantBand(doubleBands[dragPredefinedBandIndex][2], doubleBands[dragPredefinedBandIndex][3]),tmpVal-dist*0.5)); // push new left key
                          globalCMS1.pushKey(new class_Key(doubleBands[dragPredefinedBandIndex][3], undefined,tmpVal)); // push new left key
                          break;

                        default:
                          var startPos = globalCMS1.getRefPosition(indexOfDroppedPlace);
                          var endPos = (startPos+Math.abs(globalCMS1.getRefPosition(indexOfDroppedPlace+1)-startPos)*0.5);
                          var dist = endPos-startPos;
                          ///////////
                          ///// split key
                          globalCMS1.setRefPosition(indexOfDroppedPlace,endPos);

                          // case constant add Keys
                          var oldColor = globalCMS1.getLeftKeyColor(indexOfDroppedPlace,"lab");
                          globalCMS1.setLeftKeyColor(indexOfDroppedPlace,doubleBands[dragPredefinedBandIndex][3]);
                          globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(doubleBands[dragPredefinedBandIndex][1], checkConstantBand(doubleBands[dragPredefinedBandIndex][2], doubleBands[dragPredefinedBandIndex][3]),startPos+dist*0.5));
                          globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(oldColor,checkConstantBand(doubleBands[dragPredefinedBandIndex][0], doubleBands[dragPredefinedBandIndex][1]),startPos));

                      }

                    }
            break;
            case 3:
                    // ->triple

                    if(globalCMS1.getKeyLength()==0){

                      globalCMS1.pushKey(new class_Key(undefined, checkConstantBand(tribleBands[dragPredefinedBandIndex][0], tribleBands[dragPredefinedBandIndex][1]),0.0)); // nil or right key
                      globalCMS1.pushKey(new class_Key(tribleBands[dragPredefinedBandIndex][1], checkConstantBand(tribleBands[dragPredefinedBandIndex][2], tribleBands[dragPredefinedBandIndex][3]),0.33)); // left key
                      globalCMS1.pushKey(new class_Key(tribleBands[dragPredefinedBandIndex][3], checkConstantBand(tribleBands[dragPredefinedBandIndex][4], tribleBands[dragPredefinedBandIndex][5]),0.66)); // left key
                      globalCMS1.pushKey(new class_Key(tribleBands[dragPredefinedBandIndex][5], undefined,1.0)); // left key

                    }
                    else{


                      switch (indexOfDroppedPlace) {
                        case globalCMS1.getKeyLength()-1:
                          var tmpVal = globalCMS1.getRefPosition(indexOfDroppedPlace);
                          var dist = Math.abs(tmpVal-globalCMS1.getRefPosition(indexOfDroppedPlace-1))*0.5;
                          globalCMS1.setRefPosition(indexOfDroppedPlace,tmpVal-dist);
                          globalCMS1.setRightKeyColor(indexOfDroppedPlace,checkConstantBand(tribleBands[dragPredefinedBandIndex][0], tribleBands[dragPredefinedBandIndex][1])); // update old left key
                          globalCMS1.pushKey(new class_Key(tribleBands[dragPredefinedBandIndex][1], checkConstantBand(tribleBands[dragPredefinedBandIndex][2], tribleBands[dragPredefinedBandIndex][3]),tmpVal-dist*0.66)); // push new left key
                          globalCMS1.pushKey(new class_Key(tribleBands[dragPredefinedBandIndex][3], checkConstantBand(tribleBands[dragPredefinedBandIndex][4], tribleBands[dragPredefinedBandIndex][5]),tmpVal-dist*0.33)); // push new left key
                          globalCMS1.pushKey(new class_Key(tribleBands[dragPredefinedBandIndex][5], undefined,tmpVal)); // push new left key
                          break;

                        default:
                          var startPos = globalCMS1.getRefPosition(indexOfDroppedPlace);
                          var endPos = (startPos+Math.abs(globalCMS1.getRefPosition(indexOfDroppedPlace+1)-startPos)*0.5);
                          var dist = endPos-startPos;
                          ///////////
                          ///// split key
                          globalCMS1.setRefPosition(indexOfDroppedPlace,endPos);

                          // case constant add Keys
                          var oldColor = globalCMS1.getLeftKeyColor(indexOfDroppedPlace,"lab");
                          globalCMS1.setLeftKeyColor(indexOfDroppedPlace,tribleBands[dragPredefinedBandIndex][5]);
                          globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(tribleBands[dragPredefinedBandIndex][3], checkConstantBand(tribleBands[dragPredefinedBandIndex][4], tribleBands[dragPredefinedBandIndex][5]),startPos+dist*0.66));
                          globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(tribleBands[dragPredefinedBandIndex][1], checkConstantBand(tribleBands[dragPredefinedBandIndex][2], tribleBands[dragPredefinedBandIndex][3]),startPos+dist*0.33));
                          globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(oldColor,checkConstantBand(tribleBands[dragPredefinedBandIndex][0], tribleBands[dragPredefinedBandIndex][1]),startPos));

                      }

                    }
            break;
            case 4:
                    // ->quad

                    if(globalCMS1.getKeyLength()==0){

                      globalCMS1.pushKey(new class_Key(undefined, checkConstantBand(quadBands[dragPredefinedBandIndex][0], quadBands[dragPredefinedBandIndex][1]),0.0)); // nil or right key
                      globalCMS1.pushKey(new class_Key(quadBands[dragPredefinedBandIndex][1], checkConstantBand(quadBands[dragPredefinedBandIndex][2], quadBands[dragPredefinedBandIndex][3]),0.25)); // left key
                      globalCMS1.pushKey(new class_Key(quadBands[dragPredefinedBandIndex][3], checkConstantBand(quadBands[dragPredefinedBandIndex][4], quadBands[dragPredefinedBandIndex][5]),0.5)); // left key
                      globalCMS1.pushKey(new class_Key(quadBands[dragPredefinedBandIndex][5], checkConstantBand(quadBands[dragPredefinedBandIndex][6], quadBands[dragPredefinedBandIndex][7]),0.75)); // left key
                      globalCMS1.pushKey(new class_Key(quadBands[dragPredefinedBandIndex][7], undefined,1.0)); // left key

                    }
                    else{

                      switch (indexOfDroppedPlace) {
                        case globalCMS1.getKeyLength()-1:
                          var tmpVal = globalCMS1.getRefPosition(indexOfDroppedPlace);
                          var dist = Math.abs(tmpVal-globalCMS1.getRefPosition(indexOfDroppedPlace-1))*0.5;
                          globalCMS1.setRefPosition(indexOfDroppedPlace,tmpVal-dist);
                          globalCMS1.setRightKeyColor(indexOfDroppedPlace,checkConstantBand(quadBands[dragPredefinedBandIndex][0], quadBands[dragPredefinedBandIndex][1])); // update old left key
                          globalCMS1.pushKey(new class_Key(quadBands[dragPredefinedBandIndex][1], checkConstantBand(quadBands[dragPredefinedBandIndex][2], quadBands[dragPredefinedBandIndex][3]),tmpVal-dist*0.75)); // push new left key
                          globalCMS1.pushKey(new class_Key(quadBands[dragPredefinedBandIndex][3], checkConstantBand(quadBands[dragPredefinedBandIndex][4], quadBands[dragPredefinedBandIndex][5]),tmpVal-dist*0.5)); // push new left key
                          globalCMS1.pushKey(new class_Key(quadBands[dragPredefinedBandIndex][5], checkConstantBand(quadBands[dragPredefinedBandIndex][6], quadBands[dragPredefinedBandIndex][7]),tmpVal-dist*0.25)); // push new left key
                          globalCMS1.pushKey(new class_Key(quadBands[dragPredefinedBandIndex][7], undefined,tmpVal)); // push new left key
                          break;

                        default:
                          var startPos = globalCMS1.getRefPosition(indexOfDroppedPlace);
                          var endPos = (startPos+Math.abs(globalCMS1.getRefPosition(indexOfDroppedPlace+1)-startPos)*0.5);
                          var dist = endPos-startPos;
                          ///////////
                          ///// split key
                          globalCMS1.setRefPosition(indexOfDroppedPlace,endPos);

                          // case constant add Keys
                          var oldColor = globalCMS1.getLeftKeyColor(indexOfDroppedPlace,"lab");
                          globalCMS1.setLeftKeyColor(indexOfDroppedPlace,quadBands[dragPredefinedBandIndex][7]);
                          globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(quadBands[dragPredefinedBandIndex][5], checkConstantBand(quadBands[dragPredefinedBandIndex][6], quadBands[dragPredefinedBandIndex][7]),startPos+dist*0.75));
                          globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(quadBands[dragPredefinedBandIndex][3], checkConstantBand(quadBands[dragPredefinedBandIndex][4], quadBands[dragPredefinedBandIndex][5]),startPos+dist*0.5));
                          globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(quadBands[dragPredefinedBandIndex][1], checkConstantBand(quadBands[dragPredefinedBandIndex][2], quadBands[dragPredefinedBandIndex][3]),startPos+dist*0.25));
                          globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(oldColor,checkConstantBand(quadBands[dragPredefinedBandIndex][0], quadBands[dragPredefinedBandIndex][1]),startPos));

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


function checkConstantBand(c1,c2){

  if(c1.equalTo(c2)) // case constant band
    return undefined;
  else
    return c1;

}


////////////////////////////////////////////////
