function changeGalleryPredefined(type){

  document.getElementById("id_GalleryPage_Div_Multiband").style.background = styleNotActiveColor;
  document.getElementById("id_GalleryPage_Div_Divergent").style.background = styleNotActiveColor;
  document.getElementById("id_GalleryPage_Div_ScaledBlue").style.background = styleNotActiveColor;
  document.getElementById("id_GalleryPage_Div_ScaledBrown").style.background = styleNotActiveColor;
  document.getElementById("id_GalleryPage_Div_ScaledGreen").style.background = styleNotActiveColor;
  document.getElementById("id_GalleryPage_Div_ScaledRedPurple").style.background = styleNotActiveColor;
  document.getElementById("id_GalleryPage_Div_ScaledYellowOrange").style.background = styleNotActiveColor;

  var children = document.getElementById("id_GalleryPage_CMS_Div").children;
  for (var i = children.length-1; i >=0; i--) {
    children[i].parentNode.removeChild(children[i]);
  }


  switch (type) {
    case 0:
    document.getElementById("id_GalleryPage_Div_Multiband").style.background = styleActiveColor;
      drawGalleryPredefinedCMS(cmsThreeBandColormaps, 0);
      drawGalleryPredefinedCMS(cmsFourBandColormaps, 1);
      break;
      case 1:
      document.getElementById("id_GalleryPage_Div_Divergent").style.background = styleActiveColor;
        drawGalleryPredefinedCMS(cmsDivergentColormaps, 2);
        break
        case 2:
        document.getElementById("id_GalleryPage_Div_ScaledBlue").style.background = styleActiveColor;
          drawGalleryPredefinedCMS(cmsBlueColormaps, 3);
          break
            case 3:
            document.getElementById("id_GalleryPage_Div_ScaledBrown").style.background = styleActiveColor;
              drawGalleryPredefinedCMS(cmsBrownColormaps, 4);
              break
              case 4:
              document.getElementById("id_GalleryPage_Div_ScaledGreen").style.background = styleActiveColor;
                drawGalleryPredefinedCMS(cmsGreenColormaps, 5);
                break
                case 5:
                document.getElementById("id_GalleryPage_Div_ScaledRedPurple").style.background = styleActiveColor;
                  drawGalleryPredefinedCMS(cmsRedPurpleColormaps, 6);
                  break
                  case 6:
                    document.getElementById("id_GalleryPage_Div_ScaledYellowOrange").style.background = styleActiveColor;
                      drawGalleryPredefinedCMS(cmsYellowColormaps, 7);
                    break

    default:
    changeGalleryPredefined(0);
  }

}



function drawGalleryPredefinedCMS(cmsArray, cmsType){

// tmpDiv.id = 'const'+i;

  var doNewRow = true;
  var tmpRow;
  for(var i=0; i<cmsArray.length; i++){

    var tmpCMSDiv = document.createElement('div');
    tmpCMSDiv.className = "row";
    tmpCMSDiv.style.width = "45vw;"

    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.id = "id_Gallery_"+cmsType+"_"+i;
    tmpCanvas.className= "class_GalleryCanvas";

    var tmpReverseButton = document.createElement('button');
    tmpReverseButton.className= "class_GalleryButton";
    tmpReverseButton.innerHTML = "&#8644;";
    tmpReverseButton.onclick = (function(id,type) {
    return function() {


        switch (type) {
          case 0:
          cmsThreeBandColormaps[id].calcReverse();
          drawCanvasColormap("id_Gallery_"+type+"_"+id, cmsThreeBandColormaps[id]);
            break;
            case 1:
            cmsFourBandColormaps[id].calcReverse();
            drawCanvasColormap("id_Gallery_"+type+"_"+id, cmsFourBandColormaps[id]);
              break
              case 2:
              cmsDivergentColormaps[id].calcReverse();
              drawCanvasColormap("id_Gallery_"+type+"_"+id, cmsDivergentColormaps[id]);
                break
                  case 3:
                  cmsBlueColormaps[id].calcReverse();
                  drawCanvasColormap("id_Gallery_"+type+"_"+id, cmsBlueColormaps[id]);
                    break
                    case 4:
                    cmsBrownColormaps[id].calcReverse();
                    drawCanvasColormap("id_Gallery_"+type+"_"+id, cmsBrownColormaps[id]);
                      break
                      case 5:
                      cmsGreenColormaps[id].calcReverse();
                      drawCanvasColormap("id_Gallery_"+type+"_"+id, cmsGreenColormaps[id]);
                        break
                        case 6:
                        cmsRedPurpleColormaps[id].calcReverse();
                        drawCanvasColormap("id_Gallery_"+type+"_"+id, cmsRedPurpleColormaps[id]);
                          break
                          case 7:
                           cmsYellowColormaps[id].calcReverse();
                           drawCanvasColormap("id_Gallery_"+type+"_"+id, cmsYellowColormaps[id]);
                            break
          default:

        }

      };
    })(i,cmsType);



    var tmpEditButton = document.createElement('canvas');
    tmpEditButton.className= "class_GalleryButton";
    tmpEditButton.style.backgroundImage = "url(img/Buttons/editButton_black.png)";
    tmpEditButton.onclick = (function(id,type) {
    return function() {

        if(myDesignsList.length>=numberOfMyDesignsObj){
            openAlert("You already used the full CMS-storage and add a new one!");
            return;
        }

        switch (type) {
          case 0:
          myDesignsList.push(cmsThreeBandColormaps[id]);
            break;
            case 1:
            myDesignsList.push(cmsFourBandColormaps[id]);
              break
              case 2:
              myDesignsList.push(cmsDivergentColormaps[id]);
                break
                  case 3:
                  myDesignsList.push(cmsBlueColormaps[id]);
                    break
                    case 4:
                    myDesignsList.push(cmsBrownColormaps[id]);
                      break
                      case 5:
                      myDesignsList.push(cmsGreenColormaps[id]);
                        break
                        case 6:
                        myDesignsList.push(cmsRedPurpleColormaps[id]);
                          break
                          case 7:
                           myDesignsList.push(cmsYellowColormaps[id]);
                            break
          default:

        }

        indexActiveCMS=myDesignsList.length-1;
        showEditPage();

      };
    })(i,cmsType);

    var tmpExportButton = document.createElement('canvas');
    tmpExportButton.className= "class_GalleryButton";
    tmpExportButton.style.backgroundImage = "url(img/Buttons/exportButton_black.png)";
    tmpExportButton.onclick = (function(id,type) {
    return function() {

        switch (type) {
          case 0:
          globalCMS1 = cloneCMS(cmsThreeBandColormaps[id]);
            break;
            case 1:
            globalCMS1 = cloneCMS(cmsFourBandColormaps[id]);
              break
              case 2:
              globalCMS1 = cloneCMS(cmsDivergentColormaps[id]);
                break
                  case 3:
                  globalCMS1 = cloneCMS(cmsBlueColormaps[id]);
                    break
                    case 4:
                    globalCMS1 = cloneCMS(cmsBrownColormaps[id]);
                      break
                      case 5:
                      globalCMS1 = cloneCMS(cmsGreenColormaps[id]);
                        break
                        case 6:
                        globalCMS1 = cloneCMS(cmsRedPurpleColormaps[id]);
                          break
                          case 7:
                           globalCMS1 = cloneCMS(cmsYellowColormaps[id]);
                            break
          default:

        }

        openExportWindow();

      };
    })(i,cmsType);

    tmpCMSDiv.appendChild(tmpCanvas);
    tmpCMSDiv.appendChild(tmpReverseButton);
    tmpCMSDiv.appendChild(tmpEditButton);
    tmpCMSDiv.appendChild(tmpExportButton);

    if (doNewRow) {
      tmpRow = document.createElement('div');
      tmpRow.className = "row";
      tmpRow.style.marginTop = "0.5vh";
      tmpRow.style.marginBottom = "0.5vh";

      tmpRow.appendChild(tmpCMSDiv);


      doNewRow=false;
    }
    else {
      tmpRow.appendChild(tmpCMSDiv);
      document.getElementById('id_GalleryPage_CMS_Div').appendChild(tmpRow);

      drawCanvasColormap("id_Gallery_"+cmsType+"_"+(i-1), cmsArray[i-1]);
      drawCanvasColormap("id_Gallery_"+cmsType+"_"+i, cmsArray[i]);

      doNewRow=true;
    }


  }



}
