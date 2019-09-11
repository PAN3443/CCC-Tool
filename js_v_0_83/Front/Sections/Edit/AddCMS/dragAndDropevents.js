
/////////////////////////////////////////////
//  Drag And Drop
////////////////////////////////////////////

function cmsStructureOnDragStart(event){

    hideAllDropDowns();
    editCMS_AllowDrop=false;

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", event.target.getAttribute('id') );

    var tmpString = event.target.id;

      switch(tmpString[0]){
          case "c": // const
              dragPredefinedBandType = 0;
              tmpString = tmpString.substr(5);
              dragPredefinedBandIndex = parseInt(tmpString);
          break;
          case "m": // myDesign
              dragPredefinedBandType = 1;
              //tmpString = tmpString.substr(12);
              dragPredefinedBandIndex = currentPredefinedId;
          break;
          case "p": // predefined
            dragPredefinedBandType = 2;
            //tmpString = tmpString.substr(12);
            dragPredefinedBandIndex = currentPredefinedId;
          break;


          default:
              console.log("Error at the openpredefinedbands function");
      }


}

function cmsStructureDragOver(event){
  event.preventDefault();

  event = event || window.event;
  //var dragX = event.pageX, dragY = event.pageY;

      if(globalCMS1.getKeyLength()!=0){

        var rect = event.target.getBoundingClientRect();
        var canvasPosX = event.clientX - rect.left;
        var canvasPosY = event.clientY - rect.top;
        var ratioToColorspaceResolutionX = event.target.width / rect.width;
        var ratioToColorspaceResolutionY = event.target.height / rect.height;
        mousePosX = canvasPosX * ratioToColorspaceResolutionX;
        mousePosY = canvasPosY * ratioToColorspaceResolutionY;

        /// Are we between Linear Key Start and Linear CMS End?
        var keyIndex = undefined;
        if(around_LinearCMSVis_yPosition()){
          keyIndex = getClosest_linearKey();
        }
        else if(around_SketchCMSVis_yPosition()){
          keyIndex = getClosest_sketchKey();
        }

        if(keyIndex!=undefined){

          if(keyIndex!=editCMS_dragOver_LastKey){

            workCMS_Edit = cloneCMS(globalCMS1);
            switch(dragPredefinedBandType){
                  case 0:
                          // ->const

                              // band at the end
                              switch (keyIndex) {
                                case workCMS_Edit.getKeyLength()-1:
                                  // case constant
                                  var tmpVal = workCMS_Edit.getRefPosition(keyIndex);
                                  var dist = Math.abs(tmpVal-workCMS_Edit.getRefPosition(keyIndex-1));
                                  workCMS_Edit.setRefPosition(keyIndex,tmpVal-dist*0.5);
                                  workCMS_Edit.pushKey(new class_Key(cloneColor(constBands[dragPredefinedBandIndex]),undefined,tmpVal,true)); // push left key
                                  break;

                                default:
                                  var startPos = workCMS_Edit.getRefPosition(keyIndex);
                                  var endPos = (startPos+Math.abs(workCMS_Edit.getRefPosition(keyIndex+1)-startPos)*0.5);

                                  ///////////
                                  ///// split key
                                  workCMS_Edit.setRefPosition(keyIndex,endPos);
                                  workCMS_Edit.setBur(keyIndex,true);
                                  // case constant add Keys
                                  var oldColor = workCMS_Edit.getLeftKeyColor(keyIndex,"lab");
                                  workCMS_Edit.setLeftKeyColor(keyIndex,cloneColor(constBands[dragPredefinedBandIndex])); // create left key
                                  workCMS_Edit.insertKey(keyIndex, new class_Key(oldColor,undefined,startPos,true));

                                  if(oldColor!=undefined){
                                    oldColor.deleteReferences();
                                    oldColor=null;
                                  }
                              }

                  break;

                  case 1:
                        // -> myDesign CMS
                        workCMS_Edit.insertCMS(myDesignsList[currentPredefinedId], keyIndex);
                  break;
                  case 2:

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

                    workCMS_Edit.insertCMS(tmpCMS, keyIndex);
                  break;

              }

              editCMS_dragOver_LastKey=keyIndex;
              editCMS_dragOver_DrawGlobalCMS=false;
              editCMS_AllowDrop = true;
              workCMS_Edit.setPreventIntervals(false);
              drawEditCMSVIS(workCMS_Edit,[]);

        }
      }
      else{
        editCMS_AllowDrop=false;
        if(editCMS_dragOver_DrawGlobalCMS==false){
          drawEditCMSVIS(globalCMS1,[]);
          editCMS_dragOver_LastKey=-1;
          editCMS_dragOver_DrawGlobalCMS=true;
        }
      }

    }
}

function cmsStructureOnDragEnd(event) {

    updateEditPage();

}

function cmsStructureOnEnter(event) {

  editCMS_AllowDrop=false;

  document.getElementById('id_EditPage_CMSVisCanvas').style.border = "0.4 solid var(--general-active-color)";

  if(globalCMS1.getKeyLength()==0){
    switch(dragPredefinedBandType){
      case 0:
              // ->const
              workCMS_Edit.clear();
              workCMS_Edit.pushKey(new class_Key(undefined, undefined, 0, true));
              workCMS_Edit.pushKey(new class_Key(cloneColor(constBands[dragPredefinedBandIndex]), undefined, 1, true));
      break;

      case 1:
              // ->MyDesigns CMS
              workCMS_Edit=cloneCMS(myDesignsList[dragPredefinedBandIndex]);
            break;
      case 2:
              // -> predefined CMS
              switch (currentPredefinedType) {
                case 0:
                    workCMS_Edit = cloneCMS(cmsYellowColormaps[currentPredefinedId]);
                  break
                  case 1:
                    workCMS_Edit = cloneCMS(cmsBlueColormaps[currentPredefinedId]);
                    break
                    case 2:
                      workCMS_Edit = cloneCMS(cmsRedPurpleColormaps[currentPredefinedId]);
                      break
                      case 3:
                        workCMS_Edit = cloneCMS(cmsGreenColormaps[currentPredefinedId]);
                        break
                        case 4:
                        workCMS_Edit = cloneCMS(cmsBrownColormaps[currentPredefinedId]);
                          break
                          case 5:
                          workCMS_Edit = cloneCMS(cmsDivergentColormaps[currentPredefinedId]);
                            break
                            case 6:
                            workCMS_Edit = cloneCMS(cmsThreeBandColormaps[currentPredefinedId]);
                              break
                              case 7:
                                workCMS_Edit = cloneCMS(cmsFourBandColormaps[currentPredefinedId]);
                                break

                default:
                  return;
              }

      break;
    }

    workCMS_Edit.setColormapName(globalCMS1.getColormapName());
    workCMS_Edit.setNaNColor(globalCMS1.getNaNColor("lab"));
    workCMS_Edit.setAboveColor(globalCMS1.getAboveColor("lab"));
    workCMS_Edit.setBelowColor(globalCMS1.getBelowColor("lab"));
    workCMS_Edit.setInterpolationSpace(globalCMS1.getInterpolationSpace());
    drawEditCMSVIS(workCMS_Edit,[]);
    editCMS_AllowDrop=true;

  }

}

function cmsStructureOnLeave(event) {
    document.getElementById('id_EditPage_CMSVisCanvas').style.border = "none";
    drawEditCMSVIS(globalCMS1,[]);
    editCMS_dragOver_LastKey = undefined;
    editCMS_AllowDrop=false;
}

function cmsStructureOnDrop(event){

    if(editCMS_AllowDrop){
      globalCMS1=cloneCMS(workCMS_Edit);
      workCMS_Edit.deleteReferences();

      /////////////
      ////  Save Band Process
      saveCreateProcess();

        if(document.getElementById("id_EditPage_Edit_Keys").style.display!="none"){
           openEditKeyDiv(document.getElementById("id_EditPage_EditKey_List").selectedIndex);
        }

        globalCMS1JSON=inform_Worker_GlobalCMS();

        if(document.getElementById("id_EditPage_Edit_Path").style.display!="none"){
          if(pathColorspace==="rgb")
            drawcolormap_RGBSpace(true,true);
          else
            drawcolormap_hueSpace(true, true, true);
        }
    }


}

function checkConstantBand(c1,c2){

  if(c1.equalTo(c2)) // case constant band
    return undefined;
  else
    return c1;

}

////////////////////////////////////////////////
