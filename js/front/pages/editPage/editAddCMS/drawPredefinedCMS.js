

function drawPredefined_MyDesignsCMS(){

  var children = document.getElementById("id_EditPage_MyDesigns_Div").children;
  for (var i = children.length-1; i >=0; i--) {
    children[i].parentNode.removeChild(children[i]);
  }


//  tmpDiv.id = 'const'+i;

  for(var i=0; i<myDesignsList.length; i++){

    if(myDesignsList[i].getKeyLength()==0)
      continue;

    var tmpDiv = document.createElement('div');
    tmpDiv.id= "myDesignDiv_"+i;
    tmpDiv.style.marginTop = "5px";

    var tmpCMSlinear = document.createElement('canvas');
    tmpCMSlinear.id="myDesignDiv_linear"+i;
    tmpCMSlinear.className = 'class_predefinedLinearCMSBands'
    tmpDiv.appendChild(tmpCMSlinear);

    var tmpCMSsketch = document.createElement('canvas');
    tmpCMSsketch.id= "myDesignDiv_sketch"+i;
    tmpCMSsketch.className = 'class_predefinedSketchCMSBands';

    tmpDiv.appendChild(tmpCMSsketch);

    tmpDiv.setAttribute('draggable', true);

    tmpDiv.addEventListener("dragstart", bandOnDragStart);
    tmpDiv.addEventListener("dragend", bandOnDragEnd);

    tmpDiv.onmousedown = (function(id) {
    return function() {
      currentPredefinedId=id;
    };
  })(i);

    document.getElementById('id_EditPage_MyDesigns_Div').appendChild(tmpDiv);

    drawCanvasColormap("myDesignDiv_linear"+i, myList_resolution_X,  myList_resolution_Y, myDesignsList[i]);
    drawBandSketch(myDesignsList[i],"myDesignDiv_sketch"+i, false, -1);


  }



}


/////////////////////////////////////////////////////////////////////////////////////




function changeFilterPredefined(type){
// 0=all, 1=Multiband, 2=Divergent, 3=Scaled All, 4=Scaled Blue, 5=Scaled Brown, 6=Scaled Green, 7=Scaled Red Purple, 8=Scaled Yellow Orange

  //document.getElementById("id_EditPage_MyDesigns_Div").classList.remove("mystyle");
  document.getElementById("id_editPage_Order_All").style.background = 'none';
  document.getElementById("id_editPage_Order_Multiband").style.background = 'none';
  document.getElementById("id_editPage_Order_Divergent").style.background = 'none';
  document.getElementById("id_editPage_Order_Scaled_All").style.background = 'none';
  document.getElementById("id_editPage_Order_Scaled_Blue").style.background = 'none';
  document.getElementById("id_editPage_Order_Scaled_Brown").style.background = 'none';
  document.getElementById("id_editPage_Order_Scaled_Green").style.background = 'none';
  document.getElementById("id_editPage_Order_Scaled_RedPurple").style.background = 'none';
  document.getElementById("id_editPage_Order_Scaled_YellowOrange").style.background = 'none';

  var children = document.getElementById("id_EditPage_PredefinedCMS_Div").children;
  for (var i = children.length-1; i >=0; i--) {
    children[i].parentNode.removeChild(children[i]);
  }

  switch (type) {
    case 0:
      document.getElementById("id_editPage_Order_All").style.background="rgb(76, 175, 80)";
      document.getElementById("id_editPage_OrderPredefinedLabel").title = "All";
        drawPredefinedCMS(cmsFourBandColormaps, 7);
        drawPredefinedCMS(cmsThreeBandColormaps, 6);
        drawPredefinedCMS(cmsDivergentColormaps, 5);
        drawPredefinedCMS(cmsYellowColormaps, 0);
        drawPredefinedCMS(cmsBlueColormaps, 1);
        drawPredefinedCMS(cmsRedPurpleColormaps, 2);
        drawPredefinedCMS(cmsGreenColormaps, 3);
        drawPredefinedCMS(cmsBrownColormaps, 4);
      break
      case 1:
        document.getElementById("id_editPage_Order_Multiband").style.background="rgb(76, 175, 80)";
        document.getElementById("id_editPage_OrderPredefinedLabel").title = "Multiband";
        drawPredefinedCMS(cmsFourBandColormaps, 7);
        drawPredefinedCMS(cmsThreeBandColormaps, 6);
        break
        case 2:
          document.getElementById("id_editPage_Order_Divergent").style.background="rgb(76, 175, 80)";
          document.getElementById("id_editPage_OrderPredefinedLabel").title = "Divergent";
          drawPredefinedCMS(cmsDivergentColormaps, 5);
          break
          case 3:
            document.getElementById("id_editPage_Order_Scaled_All").style.background="rgb(76, 175, 80)";
            document.getElementById("id_editPage_OrderPredefinedLabel").title = "Scaled All";
            drawPredefinedCMS(cmsYellowColormaps, 0);
            drawPredefinedCMS(cmsBlueColormaps, 1);
            drawPredefinedCMS(cmsRedPurpleColormaps, 2);
            drawPredefinedCMS(cmsGreenColormaps, 3);
            drawPredefinedCMS(cmsBrownColormaps, 4);
            break
            case 4:
              document.getElementById("id_editPage_Order_Scaled_Blue").style.background="rgb(76, 175, 80)";
              document.getElementById("id_editPage_OrderPredefinedLabel").title = "Scaled Blue";
              drawPredefinedCMS(cmsBlueColormaps, 1);
              break
              case 5:
                document.getElementById("id_editPage_Order_Scaled_Brown").style.background="rgb(76, 175, 80)";
                document.getElementById("id_editPage_OrderPredefinedLabel").title = "Scaled Brown";
                drawPredefinedCMS(cmsBrownColormaps, 4);
                break
                case 6:
                  document.getElementById("id_editPage_Order_Scaled_Green").style.background="rgb(76, 175, 80)";
                  document.getElementById("id_editPage_OrderPredefinedLabel").title = "Scaled Green";
                  drawPredefinedCMS(cmsGreenColormaps, 3);
                  break
                  case 7:
                    document.getElementById("id_editPage_Order_Scaled_RedPurple").style.background="rgb(76, 175, 80)";
                    document.getElementById("id_editPage_OrderPredefinedLabel").title = "Scaled Red Purple";
                    drawPredefinedCMS(cmsRedPurpleColormaps, 2);
                    break
                    case 8:
                      document.getElementById("id_editPage_Order_Scaled_YellowOrange").style.background="rgb(76, 175, 80)";
                      document.getElementById("id_editPage_OrderPredefinedLabel").title = "Scaled Yellow Orange";
                      drawPredefinedCMS(cmsYellowColormaps, 0);
                      break
    default:

  }

  document.getElementById("id_editPage_OrderPredefinedDropdown").style.display="none";
}

function drawPredefinedCMS(cmsArray, cmsType){

//  tmpDiv.id = 'const'+i;

  for(var i=0; i<cmsArray.length; i++){

    if(cmsArray[i].getKeyLength()==0)
      continue;

    var tmpDiv = document.createElement('div');
    tmpDiv.id= "predefinedDiv_"+i+"_"+cmsType;
    tmpDiv.style.marginTop = "5px";

    var tmpCMSlinear = document.createElement('canvas');
    tmpCMSlinear.id="predefined_linear"+i+"_"+cmsType;
    tmpCMSlinear.className = 'class_predefinedLinearCMSBands'
    tmpDiv.appendChild(tmpCMSlinear);

    var tmpCMSsketch = document.createElement('canvas');
    tmpCMSsketch.id= "predefined_sketch"+i+"_"+cmsType;
    tmpCMSsketch.className = 'class_predefinedSketchCMSBands';

    tmpDiv.appendChild(tmpCMSsketch);

    tmpDiv.setAttribute('draggable', true);

    tmpDiv.addEventListener("dragstart", bandOnDragStart);
    tmpDiv.addEventListener("dragend", bandOnDragEnd);

    tmpDiv.onmousedown = (function(id,type) {
    return function() {
      currentPredefinedId=id;
      currentPredefinedType=type;
    };
  })(i,cmsType);

    document.getElementById('id_EditPage_PredefinedCMS_Div').appendChild(tmpDiv);

    drawCanvasColormap(tmpCMSlinear.id, myList_resolution_X,  myList_resolution_Y, cmsArray[i]);
    drawBandSketch(cmsArray[i],tmpCMSsketch.id, false, -1);


  }



}


function loadPredefinedCMS(subPath,fileNames){

  var tmpArray = [];
  for (var i = 0; i < fileNames.length; i++) {
    tmpArray.push(xmlColormapParserPath(subPath+fileNames[i]));
  }

  return tmpArray;

}
