
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


    drawBandSketch(globalCMS1,"id_colormapSketch","id_createColormapKeys","id_colormapSketch_Ref", true, -1);


    for (var i = refLineSketchContainer.length - 1; i >= 0; i--) {
      refLineSketchContainer[i].remove();
      refLineSketchContainer.pop();
    }

}

function bandOnDragEnd(event) {

    orderColorSketch(colorspaceModus);
    //drawBandSketch(globalCMS1,"id_colormapSketch","id_createColormapKeys","id_colormapSketch_Ref", false, -1);
    document.getElementById("id_createColormapKeys").style.visibility="visible";
}

function bandOnEnter(event) {
    if(globalCMS1.getKeyLength()==0){
      drawBandSketch(globalCMS1,"id_colormapSketch","id_createColormapKeys","id_colormapSketch_Ref", true, 0);
      indexOfDroppedPlace=0;
    }

}

function bandOnLeave(event) {

    drawBandSketch(globalCMS1,"id_colormapSketch","id_createColormapKeys","id_colormapSketch_Ref", true, -1);
    indexOfDroppedPlace = -1;
}

function bandOnDrop(event){

  somethingChanged = true;
    /////////////
    //// Creator Band

    if(globalCMS1.getKeyLength()==0){
      indexOfDroppedPlace=0;
    }

        if(indexOfDroppedPlace==-1)
        return;

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

      indexOfDroppedPlace==-1;

      //orderColorSketch(colorspaceModus);

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
