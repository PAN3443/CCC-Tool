
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
              workCMS_Edit.pushKey(new class_Key(constBands[dragPredefinedBandIndex], undefined, 1, true));
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
