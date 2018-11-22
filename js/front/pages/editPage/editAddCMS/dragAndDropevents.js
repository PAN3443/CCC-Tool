
/////////////////////////////////////////////
//  Drag And Drop
////////////////////////////////////////////

function bandOnDragStart(event){

  if(document.getElementById("id_popupColorPicker").style.display!="none"){
    document.getElementById("id_popupColorPicker").style.display="none";
  }

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", event.target.getAttribute('id') );


    document.getElementById("id_editPage_DragImage").style.display="block";

    if(globalCMS1.getKeyLength()==0)
      document.getElementById("id_editPage_DragImage").style.visibility="hidden";
    else
      document.getElementById("id_editPage_DragImage").style.visibility="visible";

    document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.display="none";
    document.getElementById("id_EditPage_CMS_VIS_SketchKeyNumbers").style.display="none";
    document.getElementById("id_EditPage_CMS_VIS_SketchKeys").style.display="none";
    document.getElementById("id_EditPage_CMS_VIS_Lines2").style.display="none";
    document.getElementById("id_EditPage_CMS_VIS_Lines3").style.visibility="hidden";


    /*document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.visibility="hidden";
    document.getElementById("id_EditPage_CMS_VIS_SketchKeyNumbers").style.visibility="hidden";
    document.getElementById("id_EditPage_CMS_VIS_SketchKeys").style.visibility="hidden";

    document.getElementById("id_EditPage_CMS_VIS_Lines2").style.visibility="hidden";
    document.getElementById("id_EditPage_CMS_VIS_Lines3").style.visibility="hidden";*/

    var tmpString = event.target.id;
    //tmpString = tmpString.substr(4);


    switch (tmpString) {
      /*case "id_creatorBand":
      dragPredefinedBandIndex = bandIndex;
      dragPredefinedBandType = createBandType;
        break;*/
        case "id_editPage_customConstBand":
        dragPredefinedBandIndex = undefined;
        dragPredefinedBandType = 4;
          break;
          case "id_editPage_customScaleBand":
          dragPredefinedBandIndex = undefined;
          dragPredefinedBandType = 5;
            break;
      default:

      switch(tmpString[0]){
          case "c": // const
              dragPredefinedBandType = 0;
              tmpString = tmpString.substr(5);
              dragPredefinedBandIndex = parseInt(tmpString);
          break;
          case "s": // scale
              dragPredefinedBandType = 1;
              tmpString = tmpString.substr(5);
              dragPredefinedBandIndex = parseInt(tmpString);
          break;

          case "m": // myDesign
              dragPredefinedBandType = 2;
              //tmpString = tmpString.substr(12);
              dragPredefinedBandIndex = currentPredefinedId;
          break;

          case "o": // online
            dragPredefinedBandType = 6;
          break;

          case "p": // predefined
            dragPredefinedBandType = 3;
            //tmpString = tmpString.substr(12);
            dragPredefinedBandIndex = currentPredefinedId;
          break;

          default:
              console.log("Error at the openpredefinedbands function");
      }

    }

    drawBandSketch(globalCMS1,"id_EditPage_CMS_VIS_ColormapSketch", true, -1);


    for (var i = refElementContainer.length - 1; i >= 0; i--) {
      refElementContainer[i].remove();
      refElementContainer.pop();
    }

}

function bandOnDragEnd(event) {



    document.getElementById("id_editPage_DragImage").style.display="none";
    document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.display="block";
    document.getElementById("id_EditPage_CMS_VIS_SketchKeyNumbers").style.display="block";
    document.getElementById("id_EditPage_CMS_VIS_SketchKeys").style.display="block";
    document.getElementById("id_EditPage_CMS_VIS_Lines2").style.display="block";
    document.getElementById("id_EditPage_CMS_VIS_Lines3").style.visibility="visible";

    updateEditPage();

    /*document.getElementById("id_EditPage_CMS_VIS_KeyBurs").style.visibility="visible";
    document.getElementById("id_EditPage_CMS_VIS_SketchKeyNumbers").style.visibility="visible";
    document.getElementById("id_EditPage_CMS_VIS_SketchKeys").style.visibility="visible";


    document.getElementById("id_EditPage_CMS_VIS_Lines2").style.visibility="visible";
    document.getElementById("id_EditPage_CMS_VIS_Lines3").style.visibility="visible";*/


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
                            globalCMS1.pushKey(new class_Key(undefined, undefined,0.0),true); // nil key
                            globalCMS1.pushKey(new class_Key(constBands[dragPredefinedBandIndex], undefined,1.0),true); // left key
                    }
                    else{

                        // band at the end

                        switch (indexOfDroppedPlace) {
                          case globalCMS1.getKeyLength()-1:
                            // case constant
                            var tmpVal = globalCMS1.getRefPosition(indexOfDroppedPlace);
                            var dist = Math.abs(tmpVal-globalCMS1.getRefPosition(indexOfDroppedPlace-1));
                            globalCMS1.setRefPosition(indexOfDroppedPlace,tmpVal-dist*0.5);
                            globalCMS1.pushKey(new class_Key(constBands[dragPredefinedBandIndex],undefined,tmpVal),true); // push left key
                            break;

                          default:
                            var startPos = globalCMS1.getRefPosition(indexOfDroppedPlace);
                            var endPos = (startPos+Math.abs(globalCMS1.getRefPosition(indexOfDroppedPlace+1)-startPos)*0.5);

                            ///////////
                            ///// split key
                            globalCMS1.setRefPosition(indexOfDroppedPlace,endPos);
                            globalCMS1.setBur(indexOfDroppedPlace,true);
                            // case constant add Keys
                            var oldColor = globalCMS1.getLeftKeyColor(indexOfDroppedPlace,"lab");
                            globalCMS1.setLeftKeyColor(indexOfDroppedPlace,constBands[dragPredefinedBandIndex]); // create left key
                            globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(oldColor,undefined,startPos),true);

                        }




                    }
            break;
            case 1:
                    // ->scale
                    if(globalCMS1.getKeyLength()==0){
                            globalCMS1.pushKey(new class_Key(undefined, scaleBands[dragPredefinedBandIndex][0],0.0),true); // right key
                            globalCMS1.pushKey(new class_Key(scaleBands[dragPredefinedBandIndex][1], undefined,1.0),true); // left key
                    }
                    else{


                      switch (indexOfDroppedPlace) {
                        case globalCMS1.getKeyLength()-1:
                          // case scaled band
                          var tmpVal = globalCMS1.getRefPosition(indexOfDroppedPlace);
                          var dist = Math.abs(tmpVal-globalCMS1.getRefPosition(indexOfDroppedPlace-1));
                          globalCMS1.setRefPosition(indexOfDroppedPlace,tmpVal-dist*0.5);
                          globalCMS1.setRightKeyColor(indexOfDroppedPlace,scaleBands[dragPredefinedBandIndex][0]); // update old left key
                          globalCMS1.pushKey(new class_Key(scaleBands[dragPredefinedBandIndex][1],undefined,tmpVal),true); // push new left key
                          break;

                        default:
                          var startPos = globalCMS1.getRefPosition(indexOfDroppedPlace);
                          var endPos = (startPos+Math.abs(globalCMS1.getRefPosition(indexOfDroppedPlace+1)-startPos)*0.5);

                          ///////////
                          ///// split key
                          globalCMS1.setRefPosition(indexOfDroppedPlace,endPos);
                          globalCMS1.setBur(indexOfDroppedPlace,true);
                          // case scale add Keys
                          var oldColor = globalCMS1.getLeftKeyColor(indexOfDroppedPlace,"lab");
                          globalCMS1.setLeftKeyColor(indexOfDroppedPlace,scaleBands[dragPredefinedBandIndex][1]);
                          globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(oldColor,scaleBands[dragPredefinedBandIndex][0],startPos),true);

                      }




                    }
            break;
            case 2:
                    // -> myDesign CMS

                    if(globalCMS1.getKeyLength()==0){

                            for (var i = 0; i < myDesignsList[currentPredefinedId].getKeyLength(); i++) {

                              if(i==0 || i==myDesignsList[currentPredefinedId].getKeyLength()-1){
                                globalCMS1.pushKey(myDesignsList[currentPredefinedId].getKeyClone(i),true);
                              }
                              else{
                                globalCMS1.pushKey(myDesignsList[currentPredefinedId].getKeyClone(i),false);
                              }

                            }

                    }
                    else{
                        insertCMSinGlobalCMS(myDesignsList[currentPredefinedId], indexOfDroppedPlace);
                    }


            break;
            case 3:

            var tmpCMS;
            switch (currentPredefinedType) {
              case 0:
                  tmpCMS = cmsYellowColormaps[currentPredefinedId];
                break
                case 1:
                  tmpCMS = cmsBlueColormaps[currentPredefinedId];
                  break
                  case 2:
                    tmpCMS = cmsRedPurpleColormaps[currentPredefinedId];
                    break
                    case 3:
                      tmpCMS = cmsGreenColormaps[currentPredefinedId];
                      break
                      case 4:
                      tmpCMS = cmsBrownColormaps[currentPredefinedId];
                        break
                        case 5:
                        tmpCMS = cmsDivergentColormaps[currentPredefinedId];
                          break
                          case 6:
                          tmpCMS = cmsThreeBandColormaps[currentPredefinedId];
                            break
                            case 7:
                              tmpCMS = cmsFourBandColormaps[currentPredefinedId];
                              break

              default:
                return;
            }

            if(globalCMS1.getKeyLength()==0){

                for (var i = 0; i < tmpCMS.getKeyLength(); i++) {
                    if(i==0 || i==tmpCMS.getKeyLength()-1){
                      globalCMS1.pushKey(tmpCMS.getKeyClone(i),true);
                    }
                    else{
                      globalCMS1.pushKey(tmpCMS.getKeyClone(i),false);
                    }
                }
            }
            else{
                insertCMSinGlobalCMS(tmpCMS, indexOfDroppedPlace);
            }




            break;
            case 4:
            // ->const
            if(globalCMS1.getKeyLength()==0){
                    globalCMS1.pushKey(new class_Key(undefined, undefined,0.0),true); // nil key
                    globalCMS1.pushKey(new class_Key(customConstBandColor, undefined,1.0),true); // left key
            }
            else{

                // band at the end

                switch (indexOfDroppedPlace) {
                  case globalCMS1.getKeyLength()-1:
                    // case constant
                    var tmpVal = globalCMS1.getRefPosition(indexOfDroppedPlace);
                    var dist = Math.abs(tmpVal-globalCMS1.getRefPosition(indexOfDroppedPlace-1));
                    globalCMS1.setRefPosition(indexOfDroppedPlace,tmpVal-dist*0.5);
                    globalCMS1.pushKey(new class_Key(customConstBandColor,undefined,tmpVal),true); // push left key
                    break;

                  default:
                    var startPos = globalCMS1.getRefPosition(indexOfDroppedPlace);
                    var endPos = (startPos+Math.abs(globalCMS1.getRefPosition(indexOfDroppedPlace+1)-startPos)*0.5);

                    ///////////
                    ///// split key
                    globalCMS1.setRefPosition(indexOfDroppedPlace,endPos);
                    globalCMS1.setBur(indexOfDroppedPlace,true);
                    // case constant add Keys
                    var oldColor = globalCMS1.getLeftKeyColor(indexOfDroppedPlace,"lab");
                    globalCMS1.setLeftKeyColor(indexOfDroppedPlace,customConstBandColor); // create left key
                    globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(oldColor,undefined,startPos),true);

                }




            }
            break;
            case 5:
            // ->scale
            if(globalCMS1.getKeyLength()==0){
                    globalCMS1.pushKey(new class_Key(undefined, customScaleBandColor1,0.0),true); // right key
                    globalCMS1.pushKey(new class_Key(customScaleBandColor2, undefined,1.0),true); // left key
            }
            else{


              switch (indexOfDroppedPlace) {
                case globalCMS1.getKeyLength()-1:
                  // case scaled band
                  var tmpVal = globalCMS1.getRefPosition(indexOfDroppedPlace);
                  var dist = Math.abs(tmpVal-globalCMS1.getRefPosition(indexOfDroppedPlace-1));
                  globalCMS1.setRefPosition(indexOfDroppedPlace,tmpVal-dist*0.5);
                  globalCMS1.setRightKeyColor(indexOfDroppedPlace,customScaleBandColor1); // update old left key
                  globalCMS1.pushKey(new class_Key(customScaleBandColor2,undefined,tmpVal),true); // push new left key
                  break;

                default:
                  var startPos = globalCMS1.getRefPosition(indexOfDroppedPlace);
                  var endPos = (startPos+Math.abs(globalCMS1.getRefPosition(indexOfDroppedPlace+1)-startPos)*0.5);

                  ///////////
                  ///// split key
                  globalCMS1.setRefPosition(indexOfDroppedPlace,endPos);
                  globalCMS1.setBur(indexOfDroppedPlace,true);
                  // case scale add Keys
                  var oldColor = globalCMS1.getLeftKeyColor(indexOfDroppedPlace,"lab");
                  globalCMS1.setLeftKeyColor(indexOfDroppedPlace,customScaleBandColor2);
                  globalCMS1.insertKey(indexOfDroppedPlace, new class_Key(oldColor,customScaleBandColor1,startPos),true);

              }




            }
            break;

            default:
        }

      indexOfDroppedPlace==-1;

      //updateEditPage()

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


function insertCMSinGlobalCMS(cms, startKey){

  var cmsDis = cms.getRefRange();

  switch (startKey) {
    case globalCMS1.getKeyLength()-1:
      // case scaled band
      var tmpVal = globalCMS1.getRefPosition(startKey);
      var dist = Math.abs(tmpVal-globalCMS1.getRefPosition(startKey-1))*0.5;
      var startPos = tmpVal-dist;

      globalCMS1.setRefPosition(startKey,startPos);
      globalCMS1.setRightKeyColor(startKey,cms.getRightKeyColor(0,"lab"));

      for (var i = 1; i < cms.getKeyLength()-1; i++) {

        var ratio = (cms.getRefPosition(i)-cms.getRefPosition(i-1))/cmsDis;
        startPos = startPos+dist*ratio;

        var tmpKey = cms.getKeyClone(i);
        tmpKey.setRefPosition(startPos);
        globalCMS1.pushKey(tmpKey,false); // push new left key
      }

      var tmpKey2 = cms.getKeyClone(i);
      tmpKey2.setRefPosition(tmpVal);
      globalCMS1.pushKey(tmpKey2,true);

      //globalCMS1.setBur(startKey,true);


      break;

    default:

    var startPos = globalCMS1.getRefPosition(startKey);
    var dist = Math.abs(globalCMS1.getRefPosition(startKey+1)-startPos)*0.5;
    var endPos = (startPos+dist);



    globalCMS1.setRefPosition(startKey,endPos);
    var oldColor = globalCMS1.getLeftKeyColor(startKey,"lab");


    globalCMS1.setLeftKeyColor(startKey,cms.getLeftKeyColor(cms.getKeyLength()-1,"lab"));
    globalCMS1.setBur(startKey,true);

    for (var i = cms.getKeyLength()-2; i >= 0 ; i--) {

      var ratio = (cms.getRefPosition(i+1)-cms.getRefPosition(i))/cmsDis;
      endPos = endPos-dist*ratio;

      var tmpKey = cms.getKeyClone(i);
      tmpKey.setRefPosition(endPos);
      globalCMS1.insertKey(startKey, tmpKey, false);
    }

    globalCMS1.setLeftKeyColor(startKey,oldColor);
    globalCMS1.setBur(startKey,true);


      /*

      ///////////
      ///// split key


      // case scale add Keys



      ;*/

  }




}
