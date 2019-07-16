function changeGalleryPredefined(type){

  document.getElementById("id_GalleryPage_Div_Multiband").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_GalleryPage_Div_Divergent").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_GalleryPage_Div_ScaledBlue").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_GalleryPage_Div_ScaledBrown").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_GalleryPage_Div_ScaledGreen").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_GalleryPage_Div_ScaledRedPurple").classList.remove("class_TabRowButtonActive");
  document.getElementById("id_GalleryPage_Div_ScaledYellowOrange").classList.remove("class_TabRowButtonActive");

  document.getElementById("id_GalleryPage_Div_Multiband").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_GalleryPage_Div_Divergent").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_GalleryPage_Div_ScaledBlue").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_GalleryPage_Div_ScaledBrown").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_GalleryPage_Div_ScaledGreen").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_GalleryPage_Div_ScaledRedPurple").classList.add("class_TabRowButtonNotActive");
  document.getElementById("id_GalleryPage_Div_ScaledYellowOrange").classList.add("class_TabRowButtonNotActive");

  var children = document.getElementById("id_GalleryPage_CMS_Div").children;
  for (var i = children.length-1; i >=0; i--) {
    children[i].parentNode.removeChild(children[i]);
  }

  switch (type) {
    case 0:
    document.getElementById("id_GalleryPage_Div_Multiband").classList.remove("class_TabRowButtonNotActive");
    document.getElementById("id_GalleryPage_Div_Multiband").classList.add("class_TabRowButtonActive");
      drawGalleryPredefinedCMS(cmsThreeBandColormaps.length, 0);
      drawGalleryPredefinedCMS(cmsFourBandColormaps.length, 1);
      break;
      case 1:
      document.getElementById("id_GalleryPage_Div_Divergent").classList.remove("class_TabRowButtonNotActive");
      document.getElementById("id_GalleryPage_Div_Divergent").classList.add("class_TabRowButtonActive");
        drawGalleryPredefinedCMS(cmsDivergentColormaps.length, 2);
        break
        case 2:
        document.getElementById("id_GalleryPage_Div_ScaledBlue").classList.remove("class_TabRowButtonNotActive");
        document.getElementById("id_GalleryPage_Div_ScaledBlue").classList.add("class_TabRowButtonActive");
          drawGalleryPredefinedCMS(cmsBlueColormaps.length, 3);
          break
            case 3:
            document.getElementById("id_GalleryPage_Div_ScaledBrown").classList.remove("class_TabRowButtonNotActive");
            document.getElementById("id_GalleryPage_Div_ScaledBrown").classList.add("class_TabRowButtonActive");
              drawGalleryPredefinedCMS(cmsBrownColormaps.length, 4);
              break
              case 4:
              document.getElementById("id_GalleryPage_Div_ScaledGreen").classList.remove("class_TabRowButtonNotActive");
              document.getElementById("id_GalleryPage_Div_ScaledGreen").classList.add("class_TabRowButtonActive");
                drawGalleryPredefinedCMS(cmsGreenColormaps.length, 5);
                break
                case 5:
                document.getElementById("id_GalleryPage_Div_ScaledRedPurple").classList.remove("class_TabRowButtonNotActive");
                document.getElementById("id_GalleryPage_Div_ScaledRedPurple").classList.add("class_TabRowButtonActive");
                  drawGalleryPredefinedCMS(cmsRedPurpleColormaps.length, 6);
                  break
                  case 6:
                    document.getElementById("id_GalleryPage_Div_ScaledYellowOrange").classList.remove("class_TabRowButtonNotActive");
                    document.getElementById("id_GalleryPage_Div_ScaledYellowOrange").classList.add("class_TabRowButtonActive");
                      drawGalleryPredefinedCMS(cmsYellowColormaps.length, 7);
                    break

    default:
    changeGalleryPredefined(0);
  }

}

function drawGalleryPredefinedCMS(numberCMS, cmsType){

  for (var i = 0; i < numberCMS; i++) {

    var divRow = document.createElement('div');
    divRow.className = 'row';
    divRow.style.width = '100%';


    var div1 = createGalleryElement(cmsType, i);
    divRow.appendChild(div1);

    if(i+1<numberCMS){
      i++;
      var div2 = createGalleryElement(cmsType, i);
      divRow.appendChild(div2);
    }

    document.getElementById("id_GalleryPage_CMS_Div").appendChild(divRow);
  }


  for (var i = 0; i < numberCMS; i++) {
    switch (cmsType) {
      case 0:
        drawCanvasColormap("id_Gallery_"+cmsType+"_"+i, cmsThreeBandColormaps[i]);
        break;
        case 1:
          drawCanvasColormap("id_Gallery_"+cmsType+"_"+i, cmsFourBandColormaps[i]);
          break
          case 2:
            drawCanvasColormap("id_Gallery_"+cmsType+"_"+i, cmsDivergentColormaps[i]);
            break
              case 3:
                drawCanvasColormap("id_Gallery_"+cmsType+"_"+i, cmsBlueColormaps[i]);
                break
                case 4:
                  drawCanvasColormap("id_Gallery_"+cmsType+"_"+i, cmsBrownColormaps[i]);
                  break
                  case 5:
                  drawCanvasColormap("id_Gallery_"+cmsType+"_"+i, cmsGreenColormaps[i]);
                    break
                    case 6:
                    drawCanvasColormap("id_Gallery_"+cmsType+"_"+i, cmsRedPurpleColormaps[i]);
                      break
                      case 7:
                       drawCanvasColormap("id_Gallery_"+cmsType+"_"+i, cmsYellowColormaps[i]);
                        break
    }
  }


}

function createGalleryElement(cmsType, i){


  var tmpDiv = document.createElement('div');
  tmpDiv.className = 'class_GalleryCMSDIV';

  var tmpLabelDiv = document.createElement('div');
  tmpLabelDiv.className = 'class_GalleryObjCMSLabel';
  tmpLabelDiv.style.display="flex";
  tmpLabelDiv.style.border = "0.2vh solid rgb(40,40,40)"
  tmpLabelDiv.style.borderBottom = "none";
  tmpLabelDiv.style.borderRadius = "0.5vh 0.5vh 0px 0px";

  var tmpLabel = document.createElement('div');
  tmpLabel.style.width="85%";
  tmpLabel.style.paddingLeft="5%";
  tmpLabel.className = 'class_GalleryObjCMSLabel';
  tmpLabel.style.color="white";

  var tmpReverseButton = document.createElement('div');
  tmpReverseButton.className = 'class_GalleryObjButton';
  tmpReverseButton.title = "Reverse";
  tmpReverseButton.innerHTML="&#8644;";
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
      }

    };
  })(i,cmsType);

  var tmpExportButton = document.createElement('div');
  tmpExportButton.className = 'class_GalleryObjButton';
  tmpExportButton.title = "Export";
  tmpExportButton.innerHTML="&#8615;";

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
      }

      openExportWindow();

    };
  })(i,cmsType);

  var tmpADDButton = document.createElement('div');
  tmpADDButton.className = 'class_GalleryObjButton';
  tmpADDButton.title = "Add to MyDesigns";
  tmpADDButton.innerHTML="+";

  tmpADDButton.onclick = (function(id,type) {
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
      showMyDesignsPage();

    };
  })(i,cmsType);

  var tmpEditButton = document.createElement('div');
  tmpEditButton.className = 'class_GalleryObjButton';
  tmpEditButton.innerHTML="&#9998;";
  tmpEditButton.title = "Edit";
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

  tmpLabelDiv.appendChild(tmpLabel);
  tmpLabelDiv.appendChild(tmpReverseButton);
  tmpLabelDiv.appendChild(tmpExportButton);
  tmpLabelDiv.appendChild(tmpADDButton);
  tmpLabelDiv.appendChild(tmpEditButton);

  tmpDiv.appendChild(tmpLabelDiv);

  var tmpCMSlinear = document.createElement('canvas');
  tmpCMSlinear.id = "id_Gallery_"+cmsType+"_"+i;
  tmpCMSlinear.className = 'class_GalleryObjCMSCanvas classColormapCanvas';
  tmpCMSlinear.style.border = "0.2vh solid rgb(40,40,40)"
  tmpCMSlinear.style.borderRadius = "0px 0px 0.5vh 0.5vh";
  tmpDiv.appendChild(tmpCMSlinear);


  switch (cmsType) {
    case 0:
    tmpLabel.innerHTML=cmsThreeBandColormaps[i].getColormapName();
      break;
      case 1:
      tmpLabel.innerHTML=cmsFourBandColormaps[i].getColormapName();
        break
        case 2:
        tmpLabel.innerHTML=cmsDivergentColormaps[i].getColormapName();
          break
            case 3:
            tmpLabel.innerHTML=cmsBlueColormaps[i].getColormapName();
              break
              case 4:
              tmpLabel.innerHTML=cmsBrownColormaps[i].getColormapName();
                break
                case 5:
                tmpLabel.innerHTML=cmsGreenColormaps[i].getColormapName();
                  break
                  case 6:
                  tmpLabel.innerHTML=cmsRedPurpleColormaps[i].getColormapName();
                    break
                    case 7:
                     tmpLabel.innerHTML=cmsYellowColormaps[i].getColormapName();
                      break
  }


  return tmpDiv;


}
