

function updatePredefined(){

  drawConstantBands();

  if ( document.getElementById("id_EditPage_Predefined_Div").style.display!="none") {
    changePredefined();
  } else {
    drawPredefined_MyDesignsCMS();
  }


}



function drawPredefined_MyDesignsCMS(){

  var children = document.getElementById("id_EditPage_MyDesigns_CMS_Div").children;
  for (var i = children.length-1; i >=0; i--) {
    children[i].parentNode.removeChild(children[i]);
  }

  var drawnNothing = true;

  document.getElementById("id_EditPage_MyDesigns_CMS_Div").style.display = "block";
  document.getElementById("id_EditPage_MyDesigns_EmptyDiv").style.display = "none";

  for(var i=0; i<myDesignsList.length; i++){

    if(myDesignsList[i].getKeyLength()==0)
      continue;

    drawnNothing=false;

    /*var tmpDiv = document.createElement('div');
    tmpDiv.className = "class_predefinedRow";
    tmpDiv.style.display = "block";
    tmpDiv.id= "myDesignDiv_"+i;
    tmpDiv.style.marginTop = "5px";*/

    var tmpCMSlinear = document.createElement('canvas');
    tmpCMSlinear.id="myDesignDiv_linear"+i;
    tmpCMSlinear.className = 'class_predefinedLinearCMSBands'
    //tmpDiv.appendChild(tmpCMSlinear);

    /*var tmpCMSsketch = document.createElement('canvas');
    tmpCMSsketch.id= "myDesignDiv_sketch"+i;
    tmpCMSsketch.className = 'class_predefinedSketchCMSBands';
    tmpDiv.appendChild(tmpCMSsketch);*/

    tmpCMSlinear.setAttribute('draggable', true);

    tmpCMSlinear.addEventListener("dragstart", bandOnDragStart);
    tmpCMSlinear.addEventListener("dragend", bandOnDragEnd);

    tmpCMSlinear.onmousedown = (function(id) {
    return function() {
      currentPredefinedId=id;
    };
  })(i);

    document.getElementById('id_EditPage_MyDesigns_CMS_Div').appendChild(tmpCMSlinear);

    drawCanvasColormap("myDesignDiv_linear"+i, myDesignsList[i]);
   // drawBandSketch(myDesignsList[i],"myDesignDiv_sketch"+i, false, -1);


  }

  if(drawnNothing){

    document.getElementById("id_EditPage_MyDesigns_CMS_Div").style.display = "none";
    document.getElementById("id_EditPage_MyDesigns_EmptyDiv").style.display = "flex";

  }



}


/////////////////////////////////////////////////////////////////////////////////////


function changeFilterPredefined(type){
  selectedPredefinedType=type;

  changePredefined();
}

function changePredefined(){
// 0=all, 1=Multiband, 2=Divergent, 3=Scaled All, 4=Scaled Blue, 5=Scaled Brown, 6=Scaled Green, 7=Scaled Red Purple, 8=Scaled Yellow Orange

  /*//document.getElementById("id_EditPage_MyDesigns_CMS_Div").classList.remove("mystyle");
  //document.getElementById("id_editPage_Order_All").style.background = 'none';
  document.getElementById("id_editPage_Order_Multiband").style.background = 'none';
  document.getElementById("id_editPage_Order_Divergent").style.background = 'none';
  //document.getElementById("id_editPage_Order_Scaled_All").style.background = 'none';
  document.getElementById("id_editPage_Order_Scaled_Blue").style.background = 'none';
  document.getElementById("id_editPage_Order_Scaled_Brown").style.background = 'none';
  document.getElementById("id_editPage_Order_Scaled_Green").style.background = 'none';
  document.getElementById("id_editPage_Order_Scaled_RedPurple").style.background = 'none';
  document.getElementById("id_editPage_Order_Scaled_YellowOrange").style.background = 'none';*/

  var children = document.getElementById("id_EditPage_Predefined_CMS_Div").children;
  for (var i = children.length-1; i >=0; i--) {
    children[i].parentNode.removeChild(children[i]);
  }


  switch (selectedPredefinedType) {
    /*case 0:
      document.getElementById("id_editPage_Order_All").style.background="rgb(76, 175, 80)";
        drawPredefinedCMS(cmsFourBandColormaps, 7);
        drawPredefinedCMS(cmsThreeBandColormaps, 6);
        drawPredefinedCMS(cmsDivergentColormaps, 5);
        drawPredefinedCMS(cmsYellowColormaps, 0);
        drawPredefinedCMS(cmsBlueColormaps, 1);
        drawPredefinedCMS(cmsRedPurpleColormaps, 2);
        drawPredefinedCMS(cmsGreenColormaps, 3);
        drawPredefinedCMS(cmsBrownColormaps, 4);
      break*/
      case 1:
        //document.getElementById("id_editPage_Order_Multiband").style.background="rgb(76, 175, 80)";
        drawPredefinedCMS(cmsFourBandColormaps, 7);
        drawPredefinedCMS(cmsThreeBandColormaps, 6);
        break
        case 2:
          //document.getElementById("id_editPage_Order_Divergent").style.background="rgb(76, 175, 80)";
          drawPredefinedCMS(cmsDivergentColormaps, 5);
          break
          /*case 3:
            document.getElementById("id_editPage_Order_Scaled_All").style.background="rgb(76, 175, 80)";
            drawPredefinedCMS(cmsYellowColormaps, 0);
            drawPredefinedCMS(cmsBlueColormaps, 1);
            drawPredefinedCMS(cmsRedPurpleColormaps, 2);
            drawPredefinedCMS(cmsGreenColormaps, 3);
            drawPredefinedCMS(cmsBrownColormaps, 4);
            break*/
            case 4:
              //document.getElementById("id_editPage_Order_Scaled_Blue").style.background="rgb(76, 175, 80)";
              drawPredefinedCMS(cmsBlueColormaps, 1);
              break
              case 5:
                //document.getElementById("id_editPage_Order_Scaled_Brown").style.background="rgb(76, 175, 80)";
                drawPredefinedCMS(cmsBrownColormaps, 4);
                break
                case 6:
                  //document.getElementById("id_editPage_Order_Scaled_Green").style.background="rgb(76, 175, 80)";
                  drawPredefinedCMS(cmsGreenColormaps, 3);
                  break
                  case 7:
                    //document.getElementById("id_editPage_Order_Scaled_RedPurple").style.background="rgb(76, 175, 80)";
                    drawPredefinedCMS(cmsRedPurpleColormaps, 2);
                    break
                    case 8:
                    //document.getElementById("id_editPage_Order_Scaled_YellowOrange").style.background="rgb(76, 175, 80)";
                      drawPredefinedCMS(cmsYellowColormaps, 0);
                      break
    default:

  }

}

function drawPredefinedCMS(cmsArray, cmsType){

//  tmpDiv.id = 'const'+i;

  for(var i=0; i<cmsArray.length; i++){

    if(cmsArray[i].getKeyLength()==0)
      continue;

    var tmpDiv = document.createElement('div');
    tmpDiv.style.display = "flex";
    tmpDiv.style.width = "100%";

    var tmpCMSlinear = document.createElement('canvas');
    tmpCMSlinear.id="predefined_linear"+i+"_"+cmsType;
    tmpCMSlinear.className = 'class_predefinedLinearCMSBandsWidthReverse'
    tmpDiv.appendChild(tmpCMSlinear);

    var tmpReverseButton = document.createElement('button');
    tmpReverseButton.className= "class_EditPage_EditButton";
    tmpReverseButton.style.width= "7.5%";
    tmpReverseButton.style.maxWidth= "7.5%";
    tmpReverseButton.style.height="3vh";
    tmpReverseButton.style.lineHeight="3vh";
    tmpReverseButton.style.fontSize="1.5vh";
    tmpReverseButton.style.marginTop= "0.25vh";
    tmpReverseButton.style.marginLeft= "auto";
    tmpReverseButton.style.marginRight= "auto";
    tmpReverseButton.style.borderRadius= "0.5vh";
    tmpReverseButton.innerHTML = "&#8646;"
    tmpReverseButton.onclick = (function(id,type) {
    return function() {


        switch (type) {
          case 7:
          cmsFourBandColormaps[id].calcReverse();
          drawCanvasColormap("predefined_linear"+id+"_"+type, cmsFourBandColormaps[id]);
            break;
            case 6:
            cmsThreeBandColormaps[id].calcReverse();
            drawCanvasColormap("predefined_linear"+id+"_"+type, cmsThreeBandColormaps[id]);
              break
              case 5:
              cmsDivergentColormaps[id].calcReverse();
              drawCanvasColormap("predefined_linear"+id+"_"+type, cmsDivergentColormaps[id]);
                break
                  case 1:
                  cmsBlueColormaps[id].calcReverse();
                  drawCanvasColormap("predefined_linear"+id+"_"+type, cmsBlueColormaps[id]);
                    break
                    case 4:
                    cmsBrownColormaps[id].calcReverse();
                    drawCanvasColormap("predefined_linear"+id+"_"+type, cmsBrownColormaps[id]);
                      break
                      case 3:
                      cmsGreenColormaps[id].calcReverse();
                      drawCanvasColormap("predefined_linear"+id+"_"+type, cmsGreenColormaps[id]);
                        break
                        case 2:
                        cmsRedPurpleColormaps[id].calcReverse();
                        drawCanvasColormap("predefined_linear"+id+"_"+type, cmsRedPurpleColormaps[id]);
                          break
                          case 0:
                           cmsYellowColormaps[id].calcReverse();
                           drawCanvasColormap("predefined_linear"+id+"_"+type, cmsYellowColormaps[id]);
                            break
          default:

        }

      };
    })(i,cmsType);
    tmpDiv.appendChild(tmpReverseButton);

    tmpCMSlinear.setAttribute('draggable', true);

    tmpCMSlinear.addEventListener("dragstart", bandOnDragStart);
    tmpCMSlinear.addEventListener("dragend", bandOnDragEnd);

    tmpCMSlinear.onmousedown = (function(id,type) {
    return function() {
      currentPredefinedId=id;
      currentPredefinedType=type;
    };
  })(i,cmsType);

    document.getElementById('id_EditPage_Predefined_CMS_Div').appendChild(tmpDiv);

    drawCanvasColormap(tmpCMSlinear.id, cmsArray[i]);
    //drawBandSketch(cmsArray[i],tmpCMSsketch.id, false, -1);


  }



}



function loadPredefinedCMS(subPath,fileNames){

  var tmpArray = [];
  for (var i = 0; i < fileNames.length; i++) {
    tmpArray.push(xmlColormapParserPath(subPath+fileNames[i]));
  }

  return tmpArray;

}
