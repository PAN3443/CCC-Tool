function changeColorspace(type) {

  document.getElementById("button_RGB").style.border = "0.2vh solid white";
  document.getElementById("button_RGB").style.color = "white";
  document.getElementById("button_HSV").style.border = "0.2vh solid white";
  document.getElementById("button_HSV").style.color = "white";
  document.getElementById("button_LAB").style.border = "0.2vh solid white";
  document.getElementById("button_LAB").style.color = "white";
  document.getElementById("button_DIN99").style.border = "0.2vh solid white";
  document.getElementById("button_DIN99").style.color = "white";

  document.getElementById("exportSide_Radiobutton_ApproxRGB").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxHSV").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxLAB").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxDIN99").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxRGBLabel").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxHSVLabel").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxLABLabel").style.display = "initial";
  document.getElementById("exportSide_Radiobutton_ApproxDIN99Label").style.display = "initial";

  switch (type) {
    case 0:
      colorspaceModus = "rgb";
      document.getElementById("button_RGB").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_RGB").style.color = "rgb(0,191,255)";
      document.getElementById("id_color1_FirstLabel").innerHTML = "R:";
      document.getElementById("id_color1_SecondLabel").innerHTML = "G:";
      document.getElementById("id_color1_ThirdLabel").innerHTML = "B:";
      document.getElementById("id_table_Color1").innerHTML = "C1 (RGB)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (RGB)";
      document.getElementById("id_table_exportColor1").innerHTML = "C1 (RGB)";
      document.getElementById("id_table_exportColor2").innerHTML = "C2 (RGB)";
      document.getElementById("exportSide_Radiobutton_RGB").checked = "true";

      if(document.getElementById("exportSide_Radiobutton_ApproxRGB").checked){
        document.getElementById("exportSide_Radiobutton_ApproxLAB").checked=true;
        exportSide_changeApproxSpace();
      }
      document.getElementById("exportSide_Radiobutton_ApproxRGB").style.display = "none";
      document.getElementById("exportSide_Radiobutton_ApproxRGBLabel").style.display = "none";

      break;
    case 1:
      colorspaceModus = "hsv";
      document.getElementById("button_HSV").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_HSV").style.color = "rgb(0,191,255)";
      document.getElementById("id_color1_FirstLabel").innerHTML = "H:";
      document.getElementById("id_color1_SecondLabel").innerHTML = "S:";
      document.getElementById("id_color1_ThirdLabel").innerHTML = "V:";
      document.getElementById("id_table_Color1").innerHTML = "C1 (HSV)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (HSV)";
      document.getElementById("id_table_exportColor1").innerHTML = "C1 (HSV)";
      document.getElementById("id_table_exportColor2").innerHTML = "C2 (HSV)";
      document.getElementById("exportSide_Radiobutton_HSV").checked = "true";
      document.getElementById("exportSide_Radiobutton_ApproxHSV").style.display = "none";
      document.getElementById("exportSide_Radiobutton_ApproxHSVLabel").style.display = "none";

      if(document.getElementById("exportSide_Radiobutton_ApproxHSV").checked==true){
        document.getElementById("exportSide_Radiobutton_ApproxLAB").checked=true;
        exportSide_changeApproxSpace();
      }
      break;
    case 2:
      colorspaceModus = "lab";
      document.getElementById("button_LAB").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_LAB").style.color = "rgb(0,191,255)";
      document.getElementById("id_color1_FirstLabel").innerHTML = "L:";
      document.getElementById("id_color1_SecondLabel").innerHTML = "A:";
      document.getElementById("id_color1_ThirdLabel").innerHTML = "B:";
      document.getElementById("id_table_Color1").innerHTML = "C1 (LAB)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (LAB)";
      document.getElementById("id_table_exportColor1").innerHTML = "C1 (LAB)";
      document.getElementById("id_table_exportColor2").innerHTML = "C2 (LAB)";
      document.getElementById("exportSide_Radiobutton_LAB").checked = "true";
      document.getElementById("exportSide_Radiobutton_ApproxLAB").style.display = "none";
      document.getElementById("exportSide_Radiobutton_ApproxLABLabel").style.display = "none";

      if(document.getElementById("exportSide_Radiobutton_ApproxLAB").checked==true){
        document.getElementById("exportSide_Radiobutton_ApproxDIN99").checked=true;
        exportSide_changeApproxSpace();
      }
      break;
    case 3:
      colorspaceModus = "din99";
      document.getElementById("button_DIN99").style.border = "0.2vh solid rgb(0,191,255)";
      document.getElementById("button_DIN99").style.color = "rgb(0,191,255)";
      document.getElementById("id_color1_FirstLabel").innerHTML = "L99:";
      document.getElementById("id_color1_SecondLabel").innerHTML = "A99:";
      document.getElementById("id_color1_ThirdLabel").innerHTML = "B99:";
      document.getElementById("id_table_Color1").innerHTML = "C1 (DIN99)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (DIN99)";
      document.getElementById("id_table_exportColor1").innerHTML = "C1 (DIN99)";
      document.getElementById("id_table_exportColor2").innerHTML = "C2 (DIN99)";
      document.getElementById("exportSide_Radiobutton_DIN99").checked = "true";
      document.getElementById("exportSide_Radiobutton_ApproxDIN99").style.display = "none";
      document.getElementById("exportSide_Radiobutton_ApproxDIN99Label").style.display = "none";

      if(document.getElementById("exportSide_Radiobutton_ApproxDIN99").checked==true){
        document.getElementById("exportSide_Radiobutton_ApproxLAB").checked=true;
        exportSide_changeApproxSpace();
      }
      break;
    default:
      return;
  }


  if (showSideID == 0) { // MyMaps SIDE
    drawMyList();
  }

  if (showSideID == 2) { // Analyse SIDE
    orderColorSketch(colorspaceModus);
    changeCourseSpace();
  }

  if (showSideID == 3) { // Analyse SIDE
    orderColorSketch(colorspaceModus);
    changeCourseSpaceCompare();
  }


  if(showSideID == 4){
    //drawExistingColormaps_AddPage();
  }

  if (showSideID == 1) { // CREATE SIDE

    switch (type) {
      case 0:

        var tmpactivColorIndex = activColorIndex;

        activColorIndex = 0;
        var tmpRGB = getRGBColor();
        colorVal1_C1 = tmpRGB.getRValue() * 255;
        colorVal2_C1 = tmpRGB.getGValue() * 255;
        colorVal3_C1 = tmpRGB.getBValue() * 255;
        activColorIndex = 1;
        tmpRGB = getRGBColor();
        colorVal1_C2 = tmpRGB.getRValue() * 255;
        colorVal2_C2 = tmpRGB.getGValue() * 255;
        colorVal3_C2 = tmpRGB.getBValue() * 255;
        activColorIndex = 2;
        tmpRGB = getRGBColor();
        colorVal1_C3 = tmpRGB.getRValue() * 255;
        colorVal2_C3 = tmpRGB.getGValue() * 255;
        colorVal3_C3 = tmpRGB.getBValue() * 255;
        activColorIndex = 3;
        tmpRGB = getRGBColor();
        colorVal1_C4 = tmpRGB.getRValue() * 255;
        colorVal2_C4 = tmpRGB.getGValue() * 255;
        colorVal3_C4 = tmpRGB.getBValue() * 255;
        activColorIndex = 4;
        tmpRGB = getRGBColor();
        colorVal1_C5 = tmpRGB.getRValue() * 255;
        colorVal2_C5 = tmpRGB.getGValue() * 255;
        colorVal3_C5 = tmpRGB.getBValue() * 255;

        activColorIndex = tmpactivColorIndex;
        break;
      case 1:
        var tmpactivColorIndex = activColorIndex;

        activColorIndex = 0;
        var tmpHSV = getHSVColor();
        colorVal1_C1 = tmpHSV.getHValue();
        colorVal2_C1 = tmpHSV.getSValue();
        colorVal3_C1 = tmpHSV.getVValue();
        activColorIndex = 1;
        tmpHSV = getHSVColor();
        colorVal1_C2 = tmpHSV.getHValue();
        colorVal2_C2 = tmpHSV.getSValue();
        colorVal3_C2 = tmpHSV.getVValue();
        activColorIndex = 2;
        tmpHSV = getHSVColor();
        colorVal1_C3 = tmpHSV.getHValue();
        colorVal2_C3 = tmpHSV.getSValue();
        colorVal3_C3 = tmpHSV.getVValue();
        activColorIndex = 3;
        tmpHSV = getHSVColor();
        colorVal1_C4 = tmpHSV.getHValue();
        colorVal2_C4 = tmpHSV.getSValue();
        colorVal3_C4 = tmpHSV.getVValue();
        activColorIndex = 4;
        tmpHSV = getHSVColor();
        colorVal1_C5 = tmpHSV.getHValue();
        colorVal2_C5 = tmpHSV.getSValue();
        colorVal3_C5 = tmpHSV.getVValue();

        activColorIndex = tmpactivColorIndex;
        break;
      case 2:
        var tmpactivColorIndex = activColorIndex;
        activColorIndex = 0;
        var tmpLAB = getLABColor();
        colorVal1_C1 = tmpLAB.getLValue();
        colorVal2_C1 = tmpLAB.getAValue();
        colorVal3_C1 = tmpLAB.getBValue();
        activColorIndex = 1;
        tmpLAB = getLABColor();
        colorVal1_C2 = tmpLAB.getLValue();
        colorVal2_C2 = tmpLAB.getAValue();
        colorVal3_C2 = tmpLAB.getBValue();
        activColorIndex = 2;
        tmpLAB = getLABColor();
        colorVal1_C3 = tmpLAB.getLValue();
        colorVal2_C3 = tmpLAB.getAValue();
        colorVal3_C3 = tmpLAB.getBValue();
        activColorIndex = 3;
        tmpLAB = getLABColor();
        colorVal1_C4 = tmpLAB.getLValue();
        colorVal2_C4 = tmpLAB.getAValue();
        colorVal3_C4 = tmpLAB.getBValue();
        activColorIndex = 4;
        tmpLAB = getLABColor();
        colorVal1_C5 = tmpLAB.getLValue();
        colorVal2_C5 = tmpLAB.getAValue();
        colorVal3_C5 = tmpLAB.getBValue();
        activColorIndex = tmpactivColorIndex;

        break;
      case 3:
        var tmpactivColorIndex = activColorIndex;

        activColorIndex = 0;
        var tmpDIN99 = getDIN99Color();
        colorVal1_C1 = tmpDIN99.getL99Value();
        colorVal2_C1 = tmpDIN99.getA99Value();
        colorVal3_C1 = tmpDIN99.getB99Value();
        activColorIndex = 1;
        tmpDIN99 = getDIN99Color();
        colorVal1_C2 = tmpDIN99.getL99Value();
        colorVal2_C2 = tmpDIN99.getA99Value();
        colorVal3_C2 = tmpDIN99.getB99Value();
        activColorIndex = 2;
        tmpDIN99 = getDIN99Color();
        colorVal1_C3 = tmpDIN99.getL99Value();
        colorVal2_C3 = tmpDIN99.getA99Value();
        colorVal3_C3 = tmpDIN99.getB99Value();
        activColorIndex = 3;
        tmpDIN99 = getDIN99Color();
        colorVal1_C4 = tmpDIN99.getL99Value();
        colorVal2_C4 = tmpDIN99.getA99Value();
        colorVal3_C4 = tmpDIN99.getB99Value();
        activColorIndex = 4;
        tmpDIN99 = getDIN99Color();
        colorVal1_C5 = tmpDIN99.getL99Value();
        colorVal2_C5 = tmpDIN99.getA99Value();
        colorVal3_C5 = tmpDIN99.getB99Value();

        activColorIndex = tmpactivColorIndex;
        break;
      default:
        return;
    }

    switch (activColorIndex) {
      case 0:
        document.getElementById("id_color1_First").value = colorVal1_C1.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Second").value = colorVal2_C1.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Third").value = colorVal3_C1.toFixed(numDecimalPlaces);
        break;
      case 1:
        document.getElementById("id_color1_First").value = colorVal1_C2.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Second").value = colorVal2_C2.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Third").value = colorVal3_C2.toFixed(numDecimalPlaces);
        break;
      case 2:
        document.getElementById("id_color1_First").value = colorVal1_C3.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Second").value = colorVal2_C3.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Third").value = colorVal3_C3.toFixed(numDecimalPlaces);
        break;
      case 3:
        document.getElementById("id_color1_First").value = colorVal1_C4.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Second").value = colorVal2_C4.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Third").value = colorVal3_C4.toFixed(numDecimalPlaces);
        break;
      case 4:
        document.getElementById("id_color1_First").value = colorVal1_C5.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Second").value = colorVal2_C5.toFixed(numDecimalPlaces);
        document.getElementById("id_color1_Third").value = colorVal3_C5.toFixed(numDecimalPlaces);
        break;
      default:
        console.log("Error at the changeColorspace function");

    }
    drawPredefinedBands();
    updateCreatorBand();
    orderColorSketch(colorspaceModus);
  }
}




function showADDSide() {

  if(myList.length<10){


    switch (showSideID) {

      case -1:
                  document.getElementById("id_welcomePage").style.display = "none";
                  document.getElementById("id_DorpDownMenue").style.display = "inline-block";
                  document.getElementById("id_Colorspace_Menue").style.display = "initial";
      break;
      case 0:
                  document.getElementById("id_myListPage").style.display = "none";
      break;

      default:
        return;

    }



    showSideID = 4;

    document.getElementById("id_addPage").style.display = "inline-block";
    document.getElementById("id_SideLabel").innerHTML = "Add Existing Colormap";
    restSpace = sizeMyList-myList.length;

    if(restSpace==0)
      document.getElementById("id_addPageFreeLabel").style.color = "red";
    else
      document.getElementById("id_addPageFreeLabel").style.color = "black";

    document.getElementById("id_addPageFreeLabel").innerHTML = "Free Space for Adding Maps to MyList : "+restSpace;
    drawAddExistingAddPage();
    constructionExistingColormaps_AddPage();
    addedIndex = [];
    addedType = [];
    addedPos = [];
  }
  else{
    alert("There are only ten colormaps inside the My Maps list allowed. Please delete a colormap for adding a new one");
  }
}

function showCreateSide() {

  if(myList.length<10){


    switch (showSideID) {

      case -1:
                  document.getElementById("id_welcomePage").style.display = "none";
                  document.getElementById("id_DorpDownMenue").style.display = "inline-block";
                  document.getElementById("id_Colorspace_Menue").style.display = "initial";
      case 0:
                  document.getElementById("id_myListPage").style.display = "none";
      break;

      default:
        return;

    }


    isEdit = -1;
    showSideID = 1;
    styleCreatorPage();


    document.getElementById("id_Create_Menue").style.display = "inline-block";
    document.getElementById("id_Create_Menue").style.marginLeft = "20px";

    document.getElementById("id_creatorPage").style.display = "inline-block";

    document.getElementById("id_SideLabel").innerHTML = "Create Colormap";
    changeColorspace(0);
    orderColorSketch(colorspaceModus);
  }
  else{
    alert("There are only ten colormaps inside the My Maps list allowed. Please delete a colormap for adding a new one");
  }
}


function showMyMapsSide(){



  switch (showSideID) {

    case 1:
              if(bandSketch.getBandLenght()>0){

                if(isEdit==-1){
                  var newMap = bandSketch.sketch2Colormap(colorspaceModus, createColormap.getColormapName());
                  myList.push(newMap);
                }
                else{
                  var newMap = bandSketch.sketch2Colormap(colorspaceModus, createColormap.getColormapName());
                  myList[isEdit]=newMap;
                }

                clearCreateSide();

              }

              document.getElementById("id_Create_Menue").style.display = "none";
              document.getElementById("id_creatorPage").style.display = "none";


    break;

    case 2:

                document.getElementById("id_analysisPage").style.display = "none";

                bandSketch.clearSketch()
                for(var i = refLineSketchContainer.length-1; i>=0; i--){
                  refLineSketchContainer[i].remove();
                  refLineSketchContainer.pop();
                }
                bandSketch.clearSketch();
                 myList[colormap1SelectIndex] = analysisColormap;

                 stopAnimation();
    break;
    case 3:
                document.getElementById("id_comparePage").style.display = "none";
                for(var i = refLineSketchContainer.length-1; i>=0; i--){
                  refLineSketchContainer[i].remove();
                  refLineSketchContainer.pop();
                }
                bandSketch.clearSketch();
                bandSketch2.clearSketch();
                 myList[colormap1SelectIndex] = compareColormap1;
                 myList[colormap2SelectIndex] = compareColormap2;
                stopAnimation();
    break;

    case 4:
                document.getElementById("id_addPage").style.display = "none";
    break;

    case 5:
                  document.getElementById("id_tutorialPage").style.display = "none";
                  document.getElementById("id_Colorspace_Menue").style.display = "initial";
                  document.getElementById("id_Tutorial_Menue").style.display = "none";
    break;

    default:
      return;

  }

  document.getElementById("id_myListPage").style.display = "initial";
  document.getElementById("id_SideLabel").innerHTML = "My Maps";
  showSideID = 0;
  drawMyList();

}

function showTutorialSide(){



  switch (showSideID) {
    case -1:
              document.getElementById("id_welcomePage").style.display = "none";
              document.getElementById("id_DorpDownMenue").style.display = "inline-block";
    break;

    case 0:
              document.getElementById("id_myListPage").style.display = "none";
    break;

    case 1:
              if(bandSketch.getBandLenght()>0){
                if(isEdit==-1){
                  if (confirm("Do you want to save the colormap to the My List page?") == true) {
                    var newMap = bandSketch.sketch2Colormap(colorspaceModus, createColormap.getColormapName());
                    myList.push(newMap);
                  }
                }
                else
                  if (confirm("Do you want to save the changes to the My List page?") == true) {
                    var newMap = bandSketch.sketch2Colormap(colorspaceModus, createColormap.getColormapName());
                    myList[isEdit]=newMap;
                  }

                clearCreateSide();

              }

              document.getElementById("id_Create_Menue").style.display = "none";
              document.getElementById("id_creatorPage").style.display = "none";
    break;

    case 2:
            document.getElementById("id_analysisPage").style.display = "none";
            bandSketch.clearSketch()
            for(var i = refLineSketchContainer.length-1; i>=0; i--){
              refLineSketchContainer[i].remove();
              refLineSketchContainer.pop();
            }
            bandSketch.clearSketch();
             myList[colormap1SelectIndex] = analysisColormap;
             stopAnimation();
    break;
    case 3:
            document.getElementById("id_comparePage").style.display = "none";
            for(var i = refLineSketchContainer.length-1; i>=0; i--){
              refLineSketchContainer[i].remove();
              refLineSketchContainer.pop();
            }
            bandSketch.clearSketch();
            bandSketch2.clearSketch();
             myList[colormap1SelectIndex] = compareColormap1;
             myList[colormap2SelectIndex] = compareColormap2;
            stopAnimation();
    break;

    case 4:
          document.getElementById("id_addPage").style.display = "none";
    break;

    default:
      return;

  }


  showSideID = 5;
  document.getElementById("id_tutorialPage").style.display = "inline-block";
  document.getElementById("id_Tutorial_Menue").style.display = "inline-block";
  document.getElementById("id_SideLabel").innerHTML = "Tutorial";
  document.getElementById("id_Colorspace_Menue").style.display = "none";
  changeTutorial(4);

}

function showCompareSide(){
    showSideID = 3;
    document.getElementById("id_myListPage").style.display = "none";
    document.getElementById("id_comparePage").style.display = "inline-block";
    document.getElementById("id_SideLabel").innerHTML = "Compare Colormaps";
    initComparePage();
}

function showAnalysisSide(){
    showSideID = 2;
    document.getElementById("id_myListPage").style.display = "none";
    document.getElementById("id_analysisPage").style.display = "inline-block";
    document.getElementById("id_SideLabel").innerHTML = "Analyse Colormap";
    initAnalysePage();
}

function readSingleFile(e) {

  var file = e.target.files[0];
  if (!file) {
    return;
  }

  var fileName = file.name;

  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;


    var fileExtension = fileName.replace(/^.*\./, '');
    var colormap;

    switch (fileExtension) {
            case 'xml': case 'XML':
                colormap = xmlColormapParserFile(contents);
                break;
            case 'json': case 'JSON':
                colormap = jsonColormapParserFile(contents);
                break;
            case 'csv': case 'CSV':
                colormap = csvColormapParserFile(contents);
                break;
            default:
                console.log("Error at readSingleFile function -> file extension is unknown!");
                return;
    }

    switch (showSideID) {
            case 0:

                break;
            case 1:
                createColormap = colormap;
                //colormap2Sketch(createColormap);
                bandSketch.colormap2Sketch(createColormap);
                orderColorSketch();
                break;
            default:
                console.log("Error at readSingleFile function -> showSideID is unknown!");
                return;
    }







  };


  reader.readAsText(file);


}
