

function checkIntervalInputFieldsChange(event){

    checkInputVal(document.getElementById(event.target.id),false,false);

    intervalSize = parseFloat(document.getElementById(event.target.id).value);
    updateAnalyzePage();
}

function checkIntervalInputFieldsKey(event){

  checkInputVal(document.getElementById(event.target.id),false,false);

  if (event.keyCode == 13) {

    intervalSize = parseFloat(document.getElementById(event.target.id).value);

    if (showSideID == 2) { // Analyse SIDE
      updateAnalyzePage();
    }

    if (showSideID == 3) { // Comnpare SIDE
      updateComparePage();
    }


  }

}


function changeAnalyzeColorspace(type) {

  document.getElementById("button_AnalyzeRGB").style.border = "0.2vh solid black";
  document.getElementById("button_AnalyzeRGB").style.color = "black";
  document.getElementById("button_AnalyzeHSV").style.border = "0.2vh solid black";
  document.getElementById("button_AnalyzeHSV").style.color = "black";
  document.getElementById("button_AnalyzeLAB").style.border = "0.2vh solid black";
  document.getElementById("button_AnalyzeLAB").style.color = "black";
  document.getElementById("button_AnalyzeDIN99").style.border = "0.2vh solid black";
  document.getElementById("button_AnalyzeDIN99").style.color = "black";
  document.getElementById("button_CompareRGB").style.border = "0.2vh solid black";
  document.getElementById("button_CompareRGB").style.color = "black";
  document.getElementById("button_CompareHSV").style.border = "0.2vh solid black";
  document.getElementById("button_CompareHSV").style.color = "black";
  document.getElementById("button_CompareLAB").style.border = "0.2vh solid black";
  document.getElementById("button_CompareLAB").style.color = "black";
  document.getElementById("button_CompareDIN99").style.border = "0.2vh solid black";
  document.getElementById("button_CompareDIN99").style.color = "black";

  switch (type) {
    case 0:
      analyzeColorspaceModus = "rgb";
      document.getElementById("button_AnalyzeRGB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_AnalyzeRGB").style.color = styleActiveColor;
      document.getElementById("button_CompareRGB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_CompareRGB").style.color = styleActiveColor;
      break;
    case 1:
      analyzeColorspaceModus = "hsv";
      document.getElementById("button_AnalyzeHSV").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_AnalyzeHSV").style.color = styleActiveColor;
      document.getElementById("button_CompareHSV").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_CompareHSV").style.color = styleActiveColor;
      break;
    case 2:
      analyzeColorspaceModus = "lab";
      document.getElementById("button_AnalyzeLAB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_AnalyzeLAB").style.color = styleActiveColor;
      document.getElementById("button_CompareLAB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_CompareLAB").style.color = styleActiveColor;
      break;
    case 3:
      analyzeColorspaceModus = "din99";
      document.getElementById("button_AnalyzeDIN99").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_AnalyzeDIN99").style.color = styleActiveColor;
      document.getElementById("button_CompareDIN99").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_CompareDIN99").style.color = styleActiveColor;
      break;
    default:
      return;
  }

  if (showSideID == 2) { // Analyse SIDE
    changeCourseSpace();
  }

  if (showSideID == 3) { // Comnpare SIDE
    changeCourseSpaceCompare();
  }

}


function changeColorspace(type) {

  if(type>3){
    alert("This interpolation color space is not ready implemented. Coming Soon!!!");
    return;
  }

  document.getElementById("button_RGB").style.border = "0.2vh solid white";
  document.getElementById("button_RGB").style.color = "white";
  document.getElementById("button_HSV").style.border = "0.2vh solid white";
  document.getElementById("button_HSV").style.color = "white";
  document.getElementById("button_LAB").style.border = "0.2vh solid white";
  document.getElementById("button_LAB").style.color = "white";
  document.getElementById("button_DIN99").style.border = "0.2vh solid white";
  document.getElementById("button_DIN99").style.color = "white";

  document.getElementById("button_ExportInterpolationSpaceRGB").style.border = "0.2vh solid black";
  document.getElementById("button_ExportInterpolationSpaceRGB").style.color = "black";
  document.getElementById("button_ExportInterpolationSpaceHSV").style.border = "0.2vh solid black";
  document.getElementById("button_ExportInterpolationSpaceHSV").style.color = "black";
  document.getElementById("button_ExportInterpolationSpaceLAB").style.border = "0.2vh solid black";
  document.getElementById("button_ExportInterpolationSpaceLAB").style.color = "black";
  document.getElementById("button_ExportInterpolationSpaceDIN99").style.border = "0.2vh solid black";
  document.getElementById("button_ExportInterpolationSpaceDIN99").style.color = "black";
  document.getElementById("button_ExportInterpolationSpaceDe94").style.border = "0.2vh solid grey";
  document.getElementById("button_ExportInterpolationSpaceDe94").style.color = "grey";
  document.getElementById("button_ExportInterpolationSpaceDe2000").style.border = "0.2vh solid grey";
  document.getElementById("button_ExportInterpolationSpaceDe2000").style.color = "grey";


  switch (type) {
    case 0:
      colorspaceModus = "rgb";
      document.getElementById("button_RGB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_RGB").style.color = styleActiveColor;
      /*document.getElementById("id_color1_FirstLabel").innerHTML = "R:";
      document.getElementById("id_color1_SecondLabel").innerHTML = "G:";
      document.getElementById("id_color1_ThirdLabel").innerHTML = "B:";*/
      document.getElementById("id_table_Color1").innerHTML = "C1 (RGB)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (RGB)";

      document.getElementById("button_ExportInterpolationSpaceRGB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportInterpolationSpaceRGB").style.color = styleActiveColor;
      break;
    case 1:
      colorspaceModus = "hsv";
      document.getElementById("button_HSV").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_HSV").style.color = styleActiveColor;
    /*  document.getElementById("id_color1_FirstLabel").innerHTML = "H:";
      document.getElementById("id_color1_SecondLabel").innerHTML = "S:";
      document.getElementById("id_color1_ThirdLabel").innerHTML = "V:";*/
      document.getElementById("id_table_Color1").innerHTML = "C1 (HSV)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (HSV)";

      document.getElementById("button_ExportInterpolationSpaceHSV").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportInterpolationSpaceHSV").style.color = styleActiveColor;
      break;
    case 2:
      colorspaceModus = "lab";
      document.getElementById("button_LAB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_LAB").style.color = styleActiveColor;
    /*  document.getElementById("id_color1_FirstLabel").innerHTML = "L:";
      document.getElementById("id_color1_SecondLabel").innerHTML = "A:";
      document.getElementById("id_color1_ThirdLabel").innerHTML = "B:";*/
      document.getElementById("id_table_Color1").innerHTML = "C1 (LAB)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (LAB)";

      document.getElementById("button_ExportInterpolationSpaceLAB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportInterpolationSpaceLAB").style.color = styleActiveColor;
      break;
    case 3:
      colorspaceModus = "din99";
      document.getElementById("button_DIN99").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_DIN99").style.color = styleActiveColor;
      /*document.getElementById("id_color1_FirstLabel").innerHTML = "L99:";
      document.getElementById("id_color1_SecondLabel").innerHTML = "A99:";
      document.getElementById("id_color1_ThirdLabel").innerHTML = "B99:";*/
      document.getElementById("id_table_Color1").innerHTML = "C1 (DIN99)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (DIN99)";

      document.getElementById("button_ExportInterpolationSpaceDIN99").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportInterpolationSpaceDIN99").style.color = styleActiveColor;
      break;
      case 4:
        colorspaceModus = "de94";
        //document.getElementById("button_DIN99").style.border = "0.2vh solid "+styleActiveColor;
        //document.getElementById("button_DIN99").style.color = styleActiveColor;
        document.getElementById("id_table_Color1").innerHTML = "C1 (LAB)";
        document.getElementById("id_table_Color2").innerHTML = "C2 (LAB)";

        document.getElementById("button_ExportInterpolationSpaceDe94").style.border = "0.2vh solid "+styleActiveColor;
        document.getElementById("button_ExportInterpolationSpaceDe94").style.color = styleActiveColor;
        break;
        case 5:
          colorspaceModus = "de2000";
          //document.getElementById("button_DIN99").style.border = "0.2vh solid "+styleActiveColor;
          //document.getElementById("button_DIN99").style.color = styleActiveColor;
          document.getElementById("id_table_Color1").innerHTML = "C1 (LAB)";
          document.getElementById("id_table_Color2").innerHTML = "C2 (LAB)";

          document.getElementById("button_ExportInterpolationSpaceDe2000").style.border = "0.2vh solid "+styleActiveColor;
          document.getElementById("button_ExportInterpolationSpaceDe2000").style.color = styleActiveColor;
          break;
    default:
      return;
  }


  if (showSideID == 0) { // MyDesigns SIDE
    drawMyList();
  }


  if (showSideID == 2) { // Analyse SIDE
    updateAnalyzePage();
  }

  if (showSideID == 3) { // Comnpare SIDE
    changeCourseSpaceCompare();
  }


  if(showSideID == 4){
    //drawExistingColormaps_AddPage();
  }

  if(showSideID == 6){
    drawCanvasColormap("id_previewColormapExport", linearMap_resolution_X, linearMap_resolution_Y, globalColormap1);
    fillExportTable();
  }


  if (showSideID == 1) { // CREATE SIDE

    /*switch (type) {
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

    }*/
    drawPredefinedBands();
    //updateCreatorBand();

  }

  orderColorSketch(colorspaceModus);
}


function openSavePopUp(){

    document.getElementById("popupSaveWindow").style.display="inline-block";
    somethingChanged = false;
}

function cancelSave(){

    document.getElementById("popupSaveWindow").style.display="none";

    if(initPageType!=5)
    initNewPage();
    else
    openCompareSelect();

    globalColormap1 = myList[colormap1SelectIndex];
    bandSketch.colormap2Sketch(globalColormap1);
    orderColorSketch();
}

function doSave(){
    myList[colormap1SelectIndex]=tmpSaveColormap;

    if(saveTwoColormaps)
    myList[colormap2SelectIndex]=tmpSaveColormap2;

    document.getElementById("popupSaveWindow").style.display="none";

    drawMyList();
    drawAddExistingAddPage();
    if(initPageType!=5)
    initNewPage();
    else
    openCompareSelect();

}

function doSaveAsNew(){
    if(saveTwoColormaps){
      if(myList.length<9){
        myList.push(tmpSaveColormap);
        myList.push(tmpSaveColormap2);
        colormap1SelectIndex=myList.length-2;
        colormap2SelectIndex=-1;
        document.getElementById("popupSaveWindow").style.display="none";
        drawMyList();
        drawAddExistingAddPage();
        if(initPageType!=5)
        initNewPage();
        else
        openCompareSelect();

      }
      else{
        alert("Sorry there is not enough space at the MyDesigns list to save the two CMS as new!!!!");
      }
    }
    else{
      if(myList.length<10){
        myList.push(tmpSaveColormap);
        colormap1SelectIndex=myList.length-1;
        document.getElementById("popupSaveWindow").style.display="none";
        drawMyList();
        drawAddExistingAddPage();
        if(initPageType!=5)
        initNewPage();
        else
        openCompareSelect();
      }
      else{
        alert("Sorry there is not enough space at the MyDesigns list to save the CMS as new!!!!");
      }

    }



}

function openCompareSelect(){

    if(myList.length==2){
      colormap1SelectIndex=0;
      colormap2SelectIndex=1;
      globalColormap1 = myList[colormap1SelectIndex];
      globalColormap2 = myList[colormap2SelectIndex];
      initNewPage();
    }
    else{
      document.getElementById("popupCompareSelectWindow").style.display="inline-block";
      for(var i=0; i<myList.length; i++){
        //  console.log(myList[i].getColormapName());
        drawCanvasColormap("id_canvasCompareSelectColormap"+i, myList_resolution_X,  myList_resolution_Y, myList[i]);
        document.getElementById("id_canvasCompareSelectColormap"+i).style.border = "0.2vh solid rgb(0,0,0)";

        if(i!=colormap1SelectIndex){
          document.getElementById("id_buttonAcceptCompareSelect"+i).style.border = "0.2vh solid rgb(0,0,0)";
          document.getElementById("id_buttonAcceptCompareSelect"+i).style.color = "rgb(0,0,0)";
        }
        else{
          document.getElementById("id_buttonAcceptCompareSelect"+i).style.border = "0.2vh solid "+styleActiveColor;
          document.getElementById("id_buttonAcceptCompareSelect"+i).style.color = styleActiveColor;
        }

        document.getElementById("id_nanCompareSelectColormap"+i).style.background = myList[i].getNaNColor("rgb").getRGBString();
      }

      for(var i=9; i>myList.length-1; i--){

        /*<canvas id="id_canvasColormap0" class="class_MyListColormapCanvas" style="height:100%; width:70%; margin-left:4%; border-radius: 0.5vh;">

        </canvas>*/
        document.getElementById("id_canvasCompareSelectColormap"+i).style.border = "0.2vh solid rgb(180,180,180)";

        document.getElementById("id_buttonAcceptCompareSelect"+i).style.color = "rgb(180,180,180)";

        document.getElementById("id_buttonAcceptCompareSelect"+i).style.border = "0.2vh solid rgb(180,180,180)";

        var canvasObject = document.getElementById("id_canvasMyListColormap"+i);

        var canvasContex = canvasObject.getContext("2d");

        canvasContex.clearRect(0, 0, canvasObject.width, canvasObject.height);

        document.getElementById("id_nanCompareSelectColormap"+i).style.background = "rgb(180,180,180)";

      }
    }
}



function selectCompareCMS(index){

  if(colormap1SelectIndex==index){
    colormap1SelectIndex=-1;
    document.getElementById("id_buttonAcceptCompareSelect"+index).style.border = "0.2vh solid rgb(0,0,0)";
    document.getElementById("id_buttonAcceptCompareSelect"+index).style.color = "rgb(0,0,0)";
    document.getElementById("acceptCompareSelection").style.visibility = "hidden";
    return
  }

  if(colormap2SelectIndex==index){
    colormap2SelectIndex=-1;
    document.getElementById("id_buttonAcceptCompareSelect"+index).style.border = "0.2vh solid rgb(0,0,0)";
    document.getElementById("id_buttonAcceptCompareSelect"+index).style.color = "rgb(0,0,0)";
    document.getElementById("acceptCompareSelection").style.visibility = "hidden";
    return
  }

  if(colormap1SelectIndex==-1){
    colormap1SelectIndex=index;
    document.getElementById("id_buttonAcceptCompareSelect"+index).style.border = "0.2vh solid "+styleActiveColor;
    document.getElementById("id_buttonAcceptCompareSelect"+index).style.color = styleActiveColor;
  }
  else if(colormap2SelectIndex==-1){
      colormap2SelectIndex=index;
      document.getElementById("id_buttonAcceptCompareSelect"+index).style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("id_buttonAcceptCompareSelect"+index).style.color = styleActiveColor;
  }


  if(colormap1SelectIndex!=-1 && colormap1SelectIndex!=-1){
    document.getElementById("acceptCompareSelection").style.visibility = "visible";
  }
  else{
    document.getElementById("acceptCompareSelection").style.visibility = "hidden";
  }
}

function acceptCompareSelection(){
  document.getElementById("popupCompareSelectWindow").style.display="none";
  initNewPage();
}

function changePage(type){

  if(pageIsLoaded==false)
  return

  if(colormap1SelectIndex==-1){
    switch (type) {
      case 3:
        if(showSideID==1 && bandSketch.getBandLength()!=0){
          break;
        }
        alert("There is no CMS at the MyDesigns list for the edit page.");

        return;
      case 4:
        if(showSideID==1 && bandSketch.getBandLength()!=0){
          break;
        }
        alert("There is no CMS at the MyDesigns list for the analyze page.");
        return;
      case 5:
          if(showSideID==1 && bandSketch.getBandLength()!=0){
            alert("There is no CMS at the MyDesigns list for the compare page.");
            return;
          }
      case 6:
          if(bandSketch.getBandLength()==0){
            alert("There is no CMS at the MyDesigns list for the export page.");
            return;
          }
      default:
  }

  }

  if(type==2){
    if(myList.length==10){
      alert("The MyDesigns List is full.");
      return;
    }
  }

  if(type==5 && myList.length<2 ){
    if(myList.length == 1 && isEdit==-1 && bandSketch.getBandLength()!=0){

    }
    else{
      alert("There is not enough CMSs at the MyDesigns list for the compare page. You need at least two CMS!");
      return;
    }

  }

  colormap2SelectIndex=-1;
  initPageType=type;

  // old page
  switch (showSideID) {



    case -1:
                document.getElementById("id_welcomePage").style.display = "none";
                document.getElementById("id_MainMenue").style.display = "inline-block";
                document.getElementById("id_Colorspace_Menue").style.display = "initial";
                document.getElementById("div_colormapBandSketch").style.display = "inline-block";

                if(initPageType!=5)
                initNewPage();
                else
                openCompareSelect();

    break;
    case 0:
                document.getElementById("id_myListPage").style.display = "none";

                if(initPageType!=5)
                initNewPage();
                else
                openCompareSelect();
    break;

    case 1:
              if( (type==2 && isEdit==-1) || (type==3 && isEdit!=-1) )
              return;

              document.getElementById("id_Create_Menue").style.display = "none";
              document.getElementById("id_creatorPage").style.display = "none";
              document.getElementById("id_LinearMap_Table_Div").style.display = "none";

              if(bandSketch.getBandLength()>0){

                if(isEdit==-1){
                  var newMap = bandSketch.sketch2Colormap(colorspaceModus, globalColormap1.getColormapName());
                  myList.push(newMap);
                  colormap1SelectIndex=myList.length-1;
                  if(initPageType!=5)
                  initNewPage();
                  else
                  openCompareSelect();
                }
                else{


                  var newMap = bandSketch.sketch2Colormap(colorspaceModus, globalColormap1.getColormapName());
                  tmpSaveColormap = newMap;

                  if(somethingChanged)
                  openSavePopUp();
                  else if(initPageType!=5)
                  initNewPage();
                  else
                  openCompareSelect();

                  //myList[isEdit]=newMap;
                }

                clearCreateSide();

              }
              else{
                if(colormap1SelectIndex == -1 ){
                  if(myList.length>0){
                      colormap1SelectIndex=0;
                  }

                }

                if(colormap1SelectIndex != -1 ){
                  globalColormap1 = myList[colormap1SelectIndex];
                  bandSketch.colormap2Sketch(globalColormap1);

                }

                if(initPageType!=5)
                initNewPage();
                else
                openCompareSelect();

              }




    break;

    case 2:
                if(type==4)
                return;

                document.getElementById("id_analysisPage").style.display = "none";

                for(var i = refLineSketchContainer.length-1; i>=0; i--){
                  refLineSketchContainer[i].remove();
                  refLineSketchContainer.pop();
                }
                stopAnimation();

                var newMap = bandSketch.sketch2Colormap(colorspaceModus, globalColormap1.getColormapName());
                tmpSaveColormap = newMap;

                if(somethingChanged)
                openSavePopUp();
                else if(initPageType!=5)
                initNewPage();
                else
                openCompareSelect();

                //alert("Ask user if he want to save as new or replace the CMS");
                //myList[colormap1SelectIndex] = globalColormap1;

                //document.getElementById("id_AnalyseColorspace_Menue").style.display = "none";
    break;

    case 3:
                if(type==5)
                return;


                document.getElementById("id_comparePage").style.display = "none";
                document.getElementById("div_colormapBandSketch2").style.display = "none";
                document.getElementById("div_switchButton").style.display = "none";
                for(var i = refLineSketchContainer.length-1; i>=0; i--){
                  refLineSketchContainer[i].remove();
                  refLineSketchContainer.pop();
                }

                //alert("Ask user if he want to save as new or replace the CMS");
                //myList[colormap1SelectIndex] = globalColormap1;
                //myList[colormap2SelectIndex] = globalColormap1;
                stopAnimation();

                var newMap = bandSketch.sketch2Colormap(colorspaceModus, globalColormap1.getColormapName());
                tmpSaveColormap = newMap;

                var newMap2 = bandSketch2.sketch2Colormap(colorspaceModus, globalColormap1.getColormapName());
                tmpSaveColormap2 = newMap2;

                saveTwoColormaps=true;

                if(somethingChanged)
                openSavePopUp();
                else if(initPageType!=5)
                initNewPage();
                else
                openCompareSelect();



    break;

    case 4:
                if(type==1)
                return;
                document.getElementById("id_addPage").style.display = "none";

                if(initPageType!=5)
                initNewPage();
                else
                openCompareSelect();
    break;

    case 5:
                  if(type==7)
                  return;

                  document.getElementById("id_tutorialPage").style.display = "none";
                  document.getElementById("id_Colorspace_Menue").style.display = "initial";
                  //document.getElementById("id_Tutorial_Menue").style.display = "none";
                  document.getElementById("div_colormapBandSketch").style.display = "inline-block";



                  if(initPageType!=5)
                  initNewPage();
                  else
                  openCompareSelect();



    break;

    case 6:
                  if(type==6)
                  return;
                  document.getElementById("id_exportPage").style.display = "none";

                  if(colormap1SelectIndex == -1 ){
                    if(myList.length>0){
                        colormap1SelectIndex=0;
                        globalColormap1 = myList[colormap1SelectIndex];
                        bandSketch.colormap2Sketch(globalColormap1);
                    }
                    else{
                      bandSketch.clearSketch();
                    }


                  }

                  if(colormap1SelectIndex != -1 ){
                    globalColormap1 = myList[colormap1SelectIndex];
                    bandSketch.colormap2Sketch(globalColormap1);
                  }

                  if(initPageType!=5)
                  initNewPage();
                  else
                  openCompareSelect();


    break;

    default:
      return;

  }



}

function initNewPage(){

  somethingChanged = false;

  document.getElementById("button_showMyDesigns").style.background = styleInactiveColor;
  document.getElementById("button_showGallary").style.background = styleInactiveColor;
  document.getElementById("button_showNewCMS").style.background = styleInactiveColor;
  document.getElementById("button_showEditCMS").style.background = styleInactiveColor;
  document.getElementById("button_showAnalyze").style.background = styleInactiveColor;
  document.getElementById("button_showCompare").style.background = styleInactiveColor;
  document.getElementById("button_showExport").style.background = styleInactiveColor;
  document.getElementById("button_showTutorial").style.background = styleInactiveColor;

 // new page
  switch (initPageType) {
    case 0:
      // MyDesings
      /////////////////////////////////////////
      document.getElementById("id_myListPage").style.display = "initial";
      document.getElementById("button_showMyDesigns").style.background = styleActiveColor;
      showSideID = 0;
      drawMyList();

      break;
    case 1:
      // Gallary
      /////////////////////////////////////////
      //

      showSideID = 4;

      document.getElementById("id_addPage").style.display = "inline-block";
      document.getElementById("button_showGallary").style.background = styleActiveColor;
      restSpace = sizeMyList-myList.length;

      if(restSpace==0)
        document.getElementById("id_addPageFreeLabel").style.color = "red";
      else
        document.getElementById("id_addPageFreeLabel").style.color = "black";

      document.getElementById("id_addPageFreeLabel").innerHTML = "Free Space for Adding Maps to MyDesigns : "+restSpace;
      drawAddExistingAddPage();
      if(existingColormapsAreDrawn==false){
          constructionExistingColormaps_AddPage();
          existingColormapsAreDrawn=true;
      }
      else{
        for (var i = 0; i < addedIndex.length; i++) {
          document.getElementById("id_acceptButton_"+addedType[i]+"_"+addedIndex[i]).style.color = "black";
          document.getElementById("id_acceptButton_"+addedType[i]+"_"+addedIndex[i]).style.borderColor = "black";
        }
      }

      addedIndex = [];
      addedType = [];
      addedPos = [];

      break;
    case 2:
      // New
      /////////////////////////////////////////


      isEdit = -1;
      showSideID = 1;
      //styleCreatorPage();

      document.getElementById("id_InputMapName").value = "Costumer Colormap";
      document.getElementById("id_Create_Menue").style.display = "inline-block";
      document.getElementById("id_Create_Menue").style.marginLeft = "20px";

      document.getElementById("id_creatorPage").style.display = "inline-block";

      document.getElementById("button_showNewCMS").style.background = styleActiveColor;
      switchModifyModus(0);
      drawPredefinedBands();
      bandSketch.clearSketch();

      break;
    case 3:
      // Edit
      /////////////////////////////////////////
      isEdit = colormap1SelectIndex;

      showSideID = 1;
      //styleCreatorPage();
      document.getElementById("id_InputMapName").value = myList[isEdit].getColormapName();
      document.getElementById("id_Create_Menue").style.display = "inline-block";
      document.getElementById("id_Create_Menue").style.marginLeft = "20px";

      document.getElementById("id_creatorPage").style.display = "inline-block";

      bandSketch.colormap2Sketch(myList[colormap1SelectIndex]);
      switchModifyModus(1);
      drawPredefinedBands();
      document.getElementById("button_showEditCMS").style.background = styleActiveColor;
      break;
    case 4:
      // Analyze
      /////////////////////////////////////////
      showSideID = 2;

      //document.getElementById("id_IntervalOption").style.marginLeft = "20px";
      document.getElementById("id_analysisPage").style.display = "inline-block";
      document.getElementById("button_showAnalyze").style.background = styleActiveColor;
      //document.getElementById("id_AnalyseColorspace_Menue").style.display = "inline";
      initAnalysePage();
      break;
    case 5:
      // Compare
      /////////////////////////////////////////
      showSideID = 3;

      //document.getElementById("id_IntervalOption").style.marginLeft = "20px";
      document.getElementById("div_colormapBandSketch2").style.display = "inline-block";
      document.getElementById("div_switchButton").style.display = "inline-block";
      document.getElementById("id_comparePage").style.display = "inline-block";
      document.getElementById("button_showCompare").style.background = styleActiveColor;
      //document.getElementById("id_AnalyseColorspace_Menue").style.display = "inline";
      initComparePage();
      break;
    case 6:
      // Export
      /////////////////////////////////////////
      showSideID = 6;
      document.getElementById("button_showExport").style.background = styleActiveColor;
      document.getElementById("id_exportPage").style.display = "inline-block";

      initExportWindow();

      break;
    case 7:
      // Tutorial
      /////////////////////////////////////////
      showSideID = 5;
      document.getElementById("id_tutorialPage").style.display = "inline-block";
      //document.getElementById("id_Tutorial_Menue").style.display = "inline-block";
      document.getElementById("button_showTutorial").style.background = styleActiveColor;
      document.getElementById("id_Colorspace_Menue").style.display = "none";
      document.getElementById("div_colormapBandSketch").style.display = "none";
      changeTutorial(4);
      break;

    default:
      return;
  }



  initPageType=-1;

  orderColorSketch(colorspaceModus);
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
                globalColormap1 = colormap;
                bandSketch.colormap2Sketch(globalColormap1);
                orderColorSketch();
                break;
            default:
                console.log("Error at readSingleFile function -> showSideID is unknown!");
                return;
    }







  };


  reader.readAsText(file);


}
