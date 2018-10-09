
/////////////////////////////////////////////
//  Drag And Drop
////////////////////////////////////////////

function bandOnDragStart(event){

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", event.target.getAttribute('id') );

    document.getElementById("id_EditPage_CMS_VIS_LinearKeys").style.visibility="hidden";
    document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.visibility="hidden";
    document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").style.visibility="hidden";

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


    drawBandSketch(globalCMS1,"id_EditPage_CMS_VIS_ColormapSketch", true, -1);


    for (var i = refLineSketchContainer.length - 1; i >= 0; i--) {
      refLineSketchContainer[i].remove();
      refLineSketchContainer.pop();
    }

}

function bandOnDragEnd(event) {

    updateEditPage()
    //drawBandSketch(globalCMS1,"id_colormapSketch","id_createColormapKeys","id_colormapSketch_Ref", false, -1);

    document.getElementById("id_EditPage_CMS_VIS_LinearKeys").style.visibility="visible";
    document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.visibility="visible";
    document.getElementById("id_EditPage_CMS_VIS_ColormapLinear").style.visibility="visible";
}

function bandOnEnter(event) {
    if(globalCMS1.getKeyLength()==0){
      drawBandSketch(globalCMS1,"id_EditPage_CMS_VIS_ColormapSketch", true, 0);
      indexOfDroppedPlace=0;
    }

}

function bandOnLeave(event) {

    drawBandSketch(globalCMS1,"id_EditPage_CMS_VIS_ColormapSketch", true, -1);
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
                    // -> predefined CMS

            break;

            default:
        }

      indexOfDroppedPlace==-1;

      updateEditPage()

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
