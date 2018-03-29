function showAddCMSHelp(){
  document.getElementById("addCMS_help").style.display="inline-block";
}

function hideAddCMSHelp(){
  document.getElementById("addCMS_help").style.display="none";
}


function showMyDesingsPreview(){
  document.getElementById("addPage_MyDesignsPreview").style.display="inline-block";
}

function hideMyDesingsPreview(){
  document.getElementById("addPage_MyDesignsPreview").style.display="none";
}



function drawAddExistingAddPage(){

    for(var i=0; i<myList.length; i++){

      drawCanvasColormap("id_canvasAddExistingColormap"+i, myList_resolution_X,  myList_resolution_Y, myList[i]);
      document.getElementById("id_canvasAddExistingColormap"+i).style.border = "0.2vh solid rgb(0,0,0)";;

      document.getElementById("id_nanAddExistingColormap"+i).style.background = myList[i].getNaNColor("rgb").getRGBString();
    }

    for(var i=9; i>myList.length-1; i--){

      /*<canvas id="id_canvasColormap0" class="class_AddExistingColormapCanvas" style="height:100%; width:70%; margin-left:4%; border-radius: 0.5vh;">

      </canvas>*/
      document.getElementById("id_canvasAddExistingColormap"+i).style.border = "0.2vh solid rgb(180,180,180)";

      var canvasObject = document.getElementById("id_canvasAddExistingColormap"+i);

      var canvasContex = canvasObject.getContext("2d");

      canvasContex.clearRect(0, 0, canvasObject.width, canvasObject.height);

      document.getElementById("id_nanAddExistingColormap"+i).style.background = "rgb(180,180,180)";

    }
}


function expandAddColormapDivs (event){

  switch (event.target.id) {
    case "id_expandYellowDiv":
      if(document.getElementById("id_addYellowDiv").style.display === "none")
        document.getElementById("id_addYellowDiv").style.display = "inline-block";
      else
        document.getElementById("id_addYellowDiv").style.display = "none";
      break;
    case "id_expandRedPurpleDiv":
      if(document.getElementById("id_addRedPurpleDiv").style.display === "none")
        document.getElementById("id_addRedPurpleDiv").style.display = "inline-block";
      else
        document.getElementById("id_addRedPurpleDiv").style.display = "none";

      break;
    case "id_expandBlueDiv":
      if(document.getElementById("id_addBlueDiv").style.display === "none")
        document.getElementById("id_addBlueDiv").style.display = "inline-block";
      else
        document.getElementById("id_addBlueDiv").style.display = "none";
      break;
    case "id_expandGreenDiv":
      if(document.getElementById("id_addGreenDiv").style.display === "none")
        document.getElementById("id_addGreenDiv").style.display = "inline-block";
      else
        document.getElementById("id_addGreenDiv").style.display = "none";
      break;
    case "id_expandBrownDiv":
      if(document.getElementById("id_addBrownDiv").style.display === "none")
        document.getElementById("id_addBrownDiv").style.display = "inline-block";
      else
        document.getElementById("id_addBrownDiv").style.display = "none";
      break;
    case "id_expandDivergentDiv":
      if(document.getElementById("id_addDivergentDiv").style.display === "none")
        document.getElementById("id_addDivergentDiv").style.display = "inline-block";
      else
        document.getElementById("id_addDivergentDiv").style.display = "none";
      break;
      case "id_expandComplexThreeDiv":
        if(document.getElementById("id_addComplexThreeDiv").style.display === "none")
          document.getElementById("id_addComplexThreeDiv").style.display = "inline-block";
        else
          document.getElementById("id_addComplexThreeDiv").style.display = "none";
        break;
        case "id_expandComplexFourDiv":
          if(document.getElementById("id_addComplexFourDiv").style.display === "none")
            document.getElementById("id_addComplexFourDiv").style.display = "inline-block";
          else
            document.getElementById("id_addComplexFourDiv").style.display = "none";
          break;
    default:

  }

}


function expandAddColormapDivsIndex (index){

  switch (index) {
    case 0:
      if(document.getElementById("id_addYellowDiv").style.display === "none")
        document.getElementById("id_addYellowDiv").style.display = "inline-block";
      else
        document.getElementById("id_addYellowDiv").style.display = "none";
      break;
    case 1:
      if(document.getElementById("id_addRedPurpleDiv").style.display === "none")
        document.getElementById("id_addRedPurpleDiv").style.display = "inline-block";
      else
        document.getElementById("id_addRedPurpleDiv").style.display = "none";

      break;
    case 2:
      if(document.getElementById("id_addBlueDiv").style.display === "none")
        document.getElementById("id_addBlueDiv").style.display = "inline-block";
      else
        document.getElementById("id_addBlueDiv").style.display = "none";
      break;
    case 3:
      if(document.getElementById("id_addGreenDiv").style.display === "none")
        document.getElementById("id_addGreenDiv").style.display = "inline-block";
      else
        document.getElementById("id_addGreenDiv").style.display = "none";
      break;
    case 4:
      if(document.getElementById("id_addBrownDiv").style.display === "none")
        document.getElementById("id_addBrownDiv").style.display = "inline-block";
      else
        document.getElementById("id_addBrownDiv").style.display = "none";
      break;
    case 5:
      if(document.getElementById("id_addDivergentDiv").style.display === "none")
        document.getElementById("id_addDivergentDiv").style.display = "inline-block";
      else
        document.getElementById("id_addDivergentDiv").style.display = "none";
      break;
      case 6:
        if(document.getElementById("id_addComplexThreeDiv").style.display === "none")
          document.getElementById("id_addComplexThreeDiv").style.display = "inline-block";
        else
          document.getElementById("id_addComplexThreeDiv").style.display = "none";
        break;
        case 7:
          if(document.getElementById("id_addComplexFourDiv").style.display === "none")
            document.getElementById("id_addComplexFourDiv").style.display = "inline-block";
          else
            document.getElementById("id_addComplexFourDiv").style.display = "none";
          break;
    default:

  }

}


function searchAddedColormap(index, type){

  for(var i=0; i<addedType.length; i++){
      if(addedType[i]==type && addedIndex[i]==index)
      return i;
  }
  return -1;

}


function addPageGetColormap(index, type){

var colormapPath;
  switch (type) {
    case 0:
    colormapPath = pathColormaps+folderYellow+fileYellowColormaps[index];
      break;
      case 1:
       colormapPath = pathColormaps+folderRedPurple+fileRedPurpleColormaps[index];
        break;
        case 2:
        colormapPath = pathColormaps+folderBlue+fileBlueColormaps[index];
          break;
          case 3:
          colormapPath = pathColormaps+folderGreen+fileGreenColormaps[index];
            break;
            case 4:
            colormapPath = pathColormaps+folderBrown+fileBrownColormaps[index];
              break;
              case 5:
              colormapPath = pathColormaps+folderDivergent+fileDivergentColormaps[index];
                break;
                case 6:
                colormapPath = pathColormaps+folderThreeBand+fileThreeBandColormaps[index];
                  break;
                  case 7:
                  colormapPath = pathColormaps+folderFourBand+fileFourBandColormaps[index];
                    break;
    default:
      return;
  }
  return xmlColormapParserPath(colormapPath);
}

function  createNewColormapRow(type, index, parent){
  var div = document.createElement("div");
  div.className = "row";
  div.style.width = "50%";

  var can = document.createElement("canvas");
  can.className = "class_colormapAddPage";
  var tmpId = "id_can_"+type+"_"+index;
  can.id = tmpId;

  var divNaN = document.createElement("div");
  divNaN.className = "class_buttonAddPage";
  divNaN.id = "id_divNaN_"+type+"_"+index;
  divNaN.title = "NaN";

  var acceptButton = document.createElement("div");
  acceptButton.className = "class_buttonAddPage classButtonWhite";
  acceptButton.id = "id_acceptButton_"+type+"_"+index;
  acceptButton.style.color = "black";
  acceptButton.style.borderColor = "black";
  acceptButton.innerHTML = "&#10004;";
  acceptButton.style.cursor = "pointer";

  acceptButton.onclick = (function(tmpIndex, tmpType) {
  return function() {

      var searchIndex = searchAddedColormap(tmpIndex, tmpType);
      if(searchIndex !=-1){

        var tmpPos = addedPos[searchIndex];



        myList.splice(addedPos[searchIndex], 1);
        addedPos.splice(searchIndex, 1);
        addedType.splice(searchIndex, 1);
        addedIndex.splice(searchIndex, 1);

        for(var i=0; i<addedPos.length; i++){
            if(addedPos[i]>searchIndex)
            addedPos[i]=addedPos[i]-1;
        }


        if(myList.length==0){
          colormap1SelectIndex=-1;
          globalColormap1=new classColorMapSpecification();
          bandSketch.clearSketch();
        }
        else{
          if(colormap1SelectIndex==tmpPos){
            colormap1SelectIndex=0;
            globalColormap1=myList[0];
          }
          else{
            if(colormap1SelectIndex>tmpPos){
              colormap1SelectIndex--;
              globalColormap1=myList[colormap1SelectIndex];

            }
          }
        }


        //addedPos = [];
        //this.style.backgroundImage = "url(img/acceptButton_black.png)";
        this.style.color = "black";
        this.style.borderColor = "black";
      }
      else{
        if(restSpace!=0){
          addedPos.push(myList.length);
          addedType.push(tmpType);
          addedIndex.push(tmpIndex);
          myList.push(addPageGetColormap(tmpIndex, tmpType));
          colormap1SelectIndex=myList.length-1;
          globalColormap1=myList[myList.length-1];
          //this.style.backgroundImage = "url(img/acceptButton_blue.png)";
          //this.style.borderColor = "rgb(0,191,255)";
          this.style.color = styleActiveColor;
          this.style.borderColor = styleActiveColor;
        }

      }

      bandSketch.colormap2Sketch(globalColormap1);
      orderColorSketch(colorspaceModus);

      restSpace = sizeMyList-myList.length;

      if(restSpace==0)
        document.getElementById("id_addPageFreeLabel").style.color = "red";
      else
        document.getElementById("id_addPageFreeLabel").style.color = "black";

        document.getElementById("id_addPageFreeLabel").innerHTML = "Free Space for Adding CMSs to MyDesings : "+restSpace;

        drawAddExistingAddPage();
  };
})(index, type);

  var exportButton = document.createElement("div");
  exportButton.className = "class_buttonAddPage classButtonWhite";
  exportButton.style.backgroundImage = "url(img/exportButton_black.png)";
  exportButton.style.cursor = "pointer";

  exportButton.onclick = (function(tmpIndex, tmpType) {
  return function() {

      globalColormap1 = addPageGetColormap(tmpIndex, tmpType);
      bandSketch.colormap2Sketch(globalColormap1);
      colormap1SelectIndex=-1;
      changePage(6);

  };
})(index, type);

  div.appendChild(can);
  div.appendChild(divNaN);
  div.appendChild(acceptButton);
  div.appendChild(exportButton);
  parent.appendChild(div)
  //return div;
}

function constructionExistingColormaps_AddPage(){


    /// Yellow
    document.getElementById("id_addYellowDiv").innerHTML = "";

    for(var i=0; i<fileYellowColormaps.length; i++){

      var div = document.createElement("div");
      div.className = "class_ColormapRow";
      document.getElementById("id_addYellowDiv").appendChild(div);
      createNewColormapRow(0, i, div);

      if(i+1<fileYellowColormaps.length){
        i++;
        createNewColormapRow(0, i, div);
      }

    }

    /// Red Purple
    document.getElementById("id_addRedPurpleDiv").innerHTML = "";

    for(var i=0; i<fileRedPurpleColormaps.length; i++){
      var div = document.createElement("div");
      div.className = "class_ColormapRow";
      document.getElementById("id_addRedPurpleDiv").appendChild(div);
      createNewColormapRow(1, i, div);

      if(i+1<fileRedPurpleColormaps.length){
        i++;
        createNewColormapRow(1, i, div);
      }
    }

    /// Blue
    document.getElementById("id_addBlueDiv").innerHTML = "";

    for(var i=0; i<fileBlueColormaps.length; i++){
      var div = document.createElement("div");
      div.className = "class_ColormapRow";
      document.getElementById("id_addBlueDiv").appendChild(div);
      createNewColormapRow(2, i, div);

      if(i+1<fileBlueColormaps.length){
        i++;
        createNewColormapRow(2, i, div);
      }
    }

    /// Green
    document.getElementById("id_addGreenDiv").innerHTML = "";

    for(var i=0; i<fileGreenColormaps.length; i++){
      var div = document.createElement("div");
      div.className = "class_ColormapRow";
      document.getElementById("id_addGreenDiv").appendChild(div);
      createNewColormapRow(3, i, div);

      if(i+1<fileGreenColormaps.length){
        i++;
        createNewColormapRow(3, i, div);
      }
    }

    /// Brown
    document.getElementById("id_addBrownDiv").innerHTML = "";

    for(var i=0; i<fileBrownColormaps.length; i++){
      var div = document.createElement("div");
      div.className = "class_ColormapRow";
      document.getElementById("id_addBrownDiv").appendChild(div);
      createNewColormapRow(4, i, div);

      if(i+1<fileBrownColormaps.length){
        i++;
        createNewColormapRow(4, i, div);
      }
    }

    /// Divergent
    document.getElementById("id_addDivergentDiv").innerHTML = "";

    for(var i=0; i<fileDivergentColormaps.length; i++){
      var div = document.createElement("div");
      div.className = "class_ColormapRow";
      document.getElementById("id_addDivergentDiv").appendChild(div);
      createNewColormapRow(5, i, div);

      if(i+1<fileDivergentColormaps.length){
        i++;
        createNewColormapRow(5, i, div);
      }
    }

    /// Three Band
    document.getElementById("id_addComplexThreeDiv").innerHTML = "";

    for(var i=0; i<fileThreeBandColormaps.length; i++){
      var div = document.createElement("div");
      div.className = "class_ColormapRow";
      document.getElementById("id_addComplexThreeDiv").appendChild(div);
      createNewColormapRow(6, i, div);

      if(i+1<fileDivergentColormaps.length){
        i++;
        createNewColormapRow(6, i, div);
      }
    }

    /// Four Band
    document.getElementById("id_addComplexFourDiv").innerHTML = "";

    for(var i=0; i<fileFourBandColormaps.length; i++){

      var div = document.createElement("div");
      div.className = "class_ColormapRow";
      document.getElementById("id_addComplexFourDiv").appendChild(div);
      createNewColormapRow(7, i, div);

      if(i+1<fileDivergentColormaps.length){
        i++;
        createNewColormapRow(7, i, div);
      }
    }

drawExistingColormaps_AddPage();
}


function drawExistingColormaps_AddPage(){

  for(var i=0; i<fileYellowColormaps.length; i++){

    var colormapPath = pathColormaps+folderYellow+fileYellowColormaps[i];

    var colormap = xmlColormapParserPath(colormapPath);
    var tmpId = "id_can_"+0+"_"+i;

    drawCanvasColormap(tmpId, existingMap_resolution_X,  existingMap_resolution_Y, colormap);
    tmpId="id_divNaN_"+0+"_"+i;
    document.getElementById(tmpId).style.background = colormap.getNaNColor("rgb").getRGBString();

  }

  for(var i=0; i<fileRedPurpleColormaps.length; i++){
    var colormapPath = pathColormaps+folderRedPurple+fileRedPurpleColormaps[i];

    var colormap = xmlColormapParserPath(colormapPath);
    var tmpId = "id_can_"+1+"_"+i;

    drawCanvasColormap(tmpId, existingMap_resolution_X,  existingMap_resolution_Y, colormap);
    tmpId="id_divNaN_"+1+"_"+i;
    document.getElementById(tmpId).style.background = colormap.getNaNColor("rgb").getRGBString();
  }

  for(var i=0; i<fileBlueColormaps.length; i++){
    var colormapPath = pathColormaps+folderBlue+fileBlueColormaps[i];

    var colormap = xmlColormapParserPath(colormapPath);
    var tmpId = "id_can_"+2+"_"+i;

    drawCanvasColormap(tmpId, existingMap_resolution_X,  existingMap_resolution_Y, colormap);
    tmpId="id_divNaN_"+2+"_"+i;
    document.getElementById(tmpId).style.background = colormap.getNaNColor("rgb").getRGBString();
  }

  for(var i=0; i<fileGreenColormaps.length; i++){
    var colormapPath = pathColormaps+folderGreen+fileGreenColormaps[i];

    var colormap = xmlColormapParserPath(colormapPath);
    var tmpId = "id_can_"+3+"_"+i;

    drawCanvasColormap(tmpId, existingMap_resolution_X,  existingMap_resolution_Y, colormap);
    tmpId="id_divNaN_"+3+"_"+i;
    document.getElementById(tmpId).style.background = colormap.getNaNColor("rgb").getRGBString();
  }

  for(var i=0; i<fileBrownColormaps.length; i++){
    var colormapPath = pathColormaps+folderBrown+fileBrownColormaps[i];

    var colormap = xmlColormapParserPath(colormapPath);
    var tmpId = "id_can_"+4+"_"+i;
    drawCanvasColormap(tmpId, existingMap_resolution_X,  existingMap_resolution_Y, colormap);
    tmpId="id_divNaN_"+4+"_"+i;
    document.getElementById(tmpId).style.background = colormap.getNaNColor("rgb").getRGBString();
  }

  for(var i=0; i<fileDivergentColormaps.length; i++){
    var colormapPath = pathColormaps+folderDivergent+fileDivergentColormaps[i];

    var colormap = xmlColormapParserPath(colormapPath);
    var tmpId = "id_can_"+5+"_"+i;

    drawCanvasColormap(tmpId, existingMap_resolution_X,  existingMap_resolution_Y, colormap);
    tmpId="id_divNaN_"+5+"_"+i;
    document.getElementById(tmpId).style.background = colormap.getNaNColor("rgb").getRGBString();
  }

  for(var i=0; i<fileThreeBandColormaps.length; i++){
    var colormapPath = pathColormaps+folderThreeBand+fileThreeBandColormaps[i];

    var colormap = xmlColormapParserPath(colormapPath);
    var tmpId = "id_can_"+6+"_"+i;

    drawCanvasColormap(tmpId, existingMap_resolution_X,  existingMap_resolution_Y, colormap);
    tmpId="id_divNaN_"+6+"_"+i;
    document.getElementById(tmpId).style.background = colormap.getNaNColor("rgb").getRGBString();
  }

  for(var i=0; i<fileFourBandColormaps.length; i++){
    var colormapPath = pathColormaps+folderFourBand+fileFourBandColormaps[i];

    var colormap = xmlColormapParserPath(colormapPath);
    var tmpId = "id_can_"+7+"_"+i;

    drawCanvasColormap(tmpId, existingMap_resolution_X,  existingMap_resolution_Y, colormap);
    tmpId="id_divNaN_"+7+"_"+i;
    document.getElementById(tmpId).style.background = colormap.getNaNColor("rgb").getRGBString();
  }



}
