

function switchCCCToolMode(event){

  switch (event.target.id) {
    case 'switchExpertMode':

        if(document.getElementById('switchExpertModeWelcomePage').checked==true){
          document.getElementById('switchExpertModeWelcomePage').checked=false;
        }
        else{
          document.getElementById('switchExpertModeWelcomePage').checked=true;
        }


      break;
    default:

  }



  if(document.getElementById('switchExpertModeWelcomePage').checked){

    document.getElementById('switchExpertMode').style.color = styleActiveColor2;
    document.getElementById('switchExpertMode').style.borderColor = styleActiveColor2;

    document.getElementById("button_showAnalyze").style.display = "inline-block";
    document.getElementById("button_showCompare").style.display = "inline-block";
    document.getElementById("button_showSettings").style.display = "inline-block";
    document.getElementById("id_selectPathModifying").style.display = "inline-block";
    document.getElementById("id_selectManageProbes").style.display = "inline-block";
    document.getElementById("exportprobeDiv").style.display = "block";



    if (showSideID == 1) {

      if(globalCMS1.getKeyLength() != 0){
        document.getElementById("id_Mapping_Table_Div").style.display = "block";
        fillTable();
      }

      if(document.getElementById("mapping_checkAutoUpdate").checked==true && mapping_doingAnimation && document.getElementById('switchExpertMode').checked){
        updateMesh();
      }

    }


  }
  else{

    document.getElementById('switchExpertMode').style.color = "white";
    document.getElementById('switchExpertMode').style.borderColor = "white";

    document.getElementById("button_showAnalyze").style.display = "none";
    document.getElementById("button_showCompare").style.display = "none";
    document.getElementById("button_showSettings").style.display = "none";
    document.getElementById("id_Mapping_Table_Div").style.display = "none";
    document.getElementById("id_selectPathModifying").style.display = "none";
    document.getElementById("id_selectManageProbes").style.display = "none";
    document.getElementById("exportprobeDiv").style.display = "none";

    if(document.getElementById("modifyColormapPath").style.display != "none"){
      switchModifyModus(0);
    }

    if (showSideID==2 || showSideID==3) {
      changePage(0);
    }

  }

  orderColorSketch(colorspaceModus);
}

function checkIntervalInputFieldsChange(event){

    checkInputVal(document.getElementById(event.target.id),false,false);

    if(parseFloat(document.getElementById(event.target.id).value)>=1)
    intervalSize = parseFloat(document.getElementById(event.target.id).value);
    else{
      //openAlert("Attention: The number of interval points have to be at least two.");
      document.getElementById(event.target.id).value=intervalSize;
      return;
    }

    if (showSideID == 2) { // Analyse SIDE
      updateAnalyzePage();
    }

    if (showSideID == 3) { // Comnpare SIDE
      updateComparePage();
    }

    if(showSideID == 6){ // export
      fillExportTable();
    }
}

function checkIntervalInputFieldsKey(event){

  checkInputVal(document.getElementById(event.target.id),false,false);

  if (event.keyCode == 13) {

    if(parseFloat(document.getElementById(event.target.id).value)>=1)
    intervalSize = parseFloat(document.getElementById(event.target.id).value);
    else{
      //openAlert("Attention: The number of interval points have to be at least two.");
      document.getElementById(event.target.id).value=intervalSize;
      return;
    }

    if (showSideID == 2) { // Analyse SIDE
      updateAnalyzePage();
    }

    if (showSideID == 3) { // Comnpare SIDE
      updateComparePage();
    }
    if(showSideID == 6){ // export
      fillExportTable();
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
  document.getElementById("button_modifyPathRGB").style.border = "0.2vh solid black";
  document.getElementById("button_modifyPathRGB").style.color = "black";
  document.getElementById("button_modifyPathHSV").style.border = "0.2vh solid black";
  document.getElementById("button_modifyPathHSV").style.color = "black";
  document.getElementById("button_modifyPathLAB").style.border = "0.2vh solid black";
  document.getElementById("button_modifyPathLAB").style.color = "black";
  document.getElementById("button_modifyPathDIN99").style.border = "0.2vh solid black";
  document.getElementById("button_modifyPathDIN99").style.color = "black";

  switch (type) {
    case 0:
      analyzeColorspaceModus = "rgb";
      document.getElementById("button_AnalyzeRGB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_AnalyzeRGB").style.color = styleActiveColor;
      document.getElementById("button_CompareRGB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_CompareRGB").style.color = styleActiveColor;
      document.getElementById("button_modifyPathRGB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_modifyPathRGB").style.color = styleActiveColor;
      break;
    case 1:
      analyzeColorspaceModus = "hsv";
      document.getElementById("button_AnalyzeHSV").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_AnalyzeHSV").style.color = styleActiveColor;
      document.getElementById("button_CompareHSV").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_CompareHSV").style.color = styleActiveColor;
      document.getElementById("button_modifyPathHSV").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_modifyPathHSV").style.color = styleActiveColor;
      break;
    case 2:
      analyzeColorspaceModus = "lab";
      document.getElementById("button_AnalyzeLAB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_AnalyzeLAB").style.color = styleActiveColor;
      document.getElementById("button_CompareLAB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_CompareLAB").style.color = styleActiveColor;
      document.getElementById("button_modifyPathLAB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_modifyPathLAB").style.color = styleActiveColor;
      break;
    case 3:
      analyzeColorspaceModus = "din99";
      document.getElementById("button_AnalyzeDIN99").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_AnalyzeDIN99").style.color = styleActiveColor;
      document.getElementById("button_CompareDIN99").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_CompareDIN99").style.color = styleActiveColor;
      document.getElementById("button_modifyPathDIN99").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_modifyPathDIN99").style.color = styleActiveColor;
      break;
    default:
      return;
  }

  if (showSideID == 1) { // Edit SIDE
    drawPathEditPath();
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
    openAlert("This interpolation color space is not ready implemented. Coming Soon!!!");
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

  if(type!=0){
      document.getElementById('id_checkboxRGB').disabled = false;
  }

  switch (type) {
    case 0:
      colorspaceModus = "rgb";
      document.getElementById("button_RGB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_RGB").style.color = styleActiveColor;

      document.getElementById("id_table_Color1").innerHTML = "C1 (RGB)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (RGB)";

      document.getElementById("button_ExportInterpolationSpaceRGB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportInterpolationSpaceRGB").style.color = styleActiveColor;

      document.getElementById('id_checkboxRGB').checked = true;
      document.getElementById('id_checkboxRGB').disabled = true;
      break;
    case 1:
      colorspaceModus = "hsv";
      document.getElementById("button_HSV").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_HSV").style.color = styleActiveColor;
      document.getElementById("id_table_Color1").innerHTML = "C1 (HSV)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (HSV)";

      document.getElementById("button_ExportInterpolationSpaceHSV").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportInterpolationSpaceHSV").style.color = styleActiveColor;

      document.getElementById('id_checkboxRGB').checked = true;
      document.getElementById('id_checkboxRGB').disabled = true;
      break;
    case 2:
      colorspaceModus = "lab";
      document.getElementById("button_LAB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_LAB").style.color = styleActiveColor;
      document.getElementById("id_table_Color1").innerHTML = "C1 (LAB)";
      document.getElementById("id_table_Color2").innerHTML = "C2 (LAB)";

      document.getElementById("button_ExportInterpolationSpaceLAB").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_ExportInterpolationSpaceLAB").style.color = styleActiveColor;
      break;
    case 3:
      colorspaceModus = "din99";
      document.getElementById("button_DIN99").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_DIN99").style.color = styleActiveColor;
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
    updateComparePage();
  }


  if(showSideID == 4){
    //drawExistingColormaps_AddPage();
  }

  if(showSideID == 6){
    fillExportTable();
  }


  if (showSideID == 1) { // CREATE SIDE

    if(document.getElementById("id_DivAddBands").style.display!="none")
    drawPredefinedBands();

    if(document.getElementById("id_DivModifyKeys").style.display!="none")
    drawModifyPreview();

    if(document.getElementById("modifyColormapPath").style.display!="none")
    drawPathEditPath();
    //updateCreatorBand();

  }

  orderColorSketch(colorspaceModus);

  updateMesh();
}


function openAskWindow(){
    document.getElementById("popupAskWindow").style.display="inline";
    switch (askType) {
      case 0:
      //delete CMS
        document.getElementById("id_askText").innerHTML="Do you really want to delete the CMS?";
        break;
      case 1:
        //delete Band
        document.getElementById("id_askText").innerHTML="Do you really want to delete the Band?";
        break;

        case 2:
          //load Session
          document.getElementById("id_askText").innerHTML="Do you really want to load a session and reject the current session?";
          break;

          case 3:
            //load Session
            document.getElementById("id_askText").innerHTML="Do you really want to delete the colormap?";
            break;
      default:

    }
}

function checkAsk(){
  document.getElementById("popupAskWindow").style.display="none";

  switch (askType) {
    case 0:
      //delete CMS
      clearCreateSide();
      globalCMS1.clear();
      orderColorSketch();
      break;
    case 1:
      //delete Band
      globalCMS1.deleteBand(askIndex);
      orderColorSketch();
      somethingChanged = true;
      saveCreateProcess();
      break;

      case 2:
        //load Session
        document.getElementById("id_inputSessionData").click();
        break;

        case 3:

          myList.splice(askIndex, 1);

          if (askIndex == colormap1SelectIndex) {
            colormap1SelectIndex = 0;
          }

          if (askIndex < colormap1SelectIndex) {
            colormap1SelectIndex--;
          }

          if (myList.length == 0) {
            colormap1SelectIndex = -1;
            globalCMS1.clear();
          } else {
            globalCMS1 = cloneCMS(myList[colormap1SelectIndex]);
          }

          orderColorSketch();
          drawMyList();
        break;

    default:

  }
}


function closeAsk(){
  document.getElementById("popupAskWindow").style.display="none";
}

function openSavePopUp(){

    document.getElementById("popupSaveWindow").style.display="block";
    somethingChanged = false;
}

function cancelSave(){

    document.getElementById("popupSaveWindow").style.display="none";

    if(initPageType!=5)
    initNewPage();
    else
    openCompareSelect();

    globalCMS1 = cloneCMS(myList[colormap1SelectIndex]);
    orderColorSketch();

    colormap2SelectIndex=-1;
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

    colormap2SelectIndex=-1;

}

function doSaveAsNew(){

      if(myList.length<10){
        myList.push(tmpSaveColormap);
        colormap1SelectIndex=myList.length-1;
        colormap2SelectIndex=-1;
        document.getElementById("popupSaveWindow").style.display="none";
        drawMyList();
        drawAddExistingAddPage();
        if(initPageType!=5)
        initNewPage();
        else
        openCompareSelect();

        colormap2SelectIndex=-1;
      }
      else{
        openAlert("Sorry there is not enough space at the MyDesigns list to save the CMS as new!!!!");
      }

}

function openCompareSelect(){

    if(myList.length==2){
      colormap1SelectIndex=0;
      colormap2SelectIndex=1;
      globalCMS1 = cloneCMS(myList[colormap1SelectIndex]);
      globalCMS2 = cloneCMS(myList[colormap2SelectIndex]);
      initNewPage();
    }
    else{

      if(colormap1SelectIndex!=-1 && colormap2SelectIndex!=-1){
        document.getElementById("acceptCompareSelection").style.visibility = "visible";
      }
      else{
        document.getElementById("acceptCompareSelection").style.visibility = "hidden";
      }

      document.getElementById("popupCompareSelectWindow").style.display="block";
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

  if(index>=myList.length)
  return;

  if(colormap1SelectIndex==index){
    colormap1SelectIndex=-1;
    document.getElementById("id_buttonAcceptCompareSelect"+index).style.border = "0.2vh solid rgb(0,0,0)";
    document.getElementById("id_buttonAcceptCompareSelect"+index).style.color = "rgb(0,0,0)";
    document.getElementById("acceptCompareSelection").style.visibility = "hidden";
    return;
  }

  if(colormap2SelectIndex==index){
    colormap2SelectIndex=-1;
    document.getElementById("id_buttonAcceptCompareSelect"+index).style.border = "0.2vh solid rgb(0,0,0)";
    document.getElementById("id_buttonAcceptCompareSelect"+index).style.color = "rgb(0,0,0)";
    document.getElementById("acceptCompareSelection").style.visibility = "hidden";
    return;
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


  if(colormap1SelectIndex!=-1 && colormap2SelectIndex!=-1){
    document.getElementById("acceptCompareSelection").style.visibility = "visible";
  }
  else{
    document.getElementById("acceptCompareSelection").style.visibility = "hidden";
  }
}

function acceptCompareSelection(){

  if(colormap1SelectIndex!=-1 && colormap2SelectIndex!=-1){
    document.getElementById("popupCompareSelectWindow").style.display="none";
    initNewPage();
  }
}

function changePage(type){

  if(pageIsLoaded==false)
  return;

  if(type==7){
    openAlert("Sorry. The work on the tutorial is not finished yet. It will be available with the upload of the version 1.0. Please use the help buttons at the tool or contact us via ccchelp\'@\'informatik.uni-leipzig.de!");
    return;
  }//*/


  if(colormap1SelectIndex==-1){
    switch (type) {
      case 3:
        if(showSideID==1 && globalCMS1.getKeyLength()!=0){
          break;
        }
        openAlert("There is no CMS at the MyDesigns list for the edit page.");

        return;
      case 4:
        if(showSideID==1 && globalCMS1.getKeyLength()!=0){
          break;
        }
        openAlert("There is no CMS at the MyDesigns list for the analyze page.");
        return;
      case 5:
          if(showSideID==1 && globalCMS1.getKeyLength()!=0){
            openAlert("There is no CMS at the MyDesigns list for the compare page.");
            return;
          }
      case 6:
          if(globalCMS1.getKeyLength()==0){
            openAlert("There is no CMS at the MyDesigns list for the export page.");
            return;
          }
      default:
  }

  }

  if(type==2){
    if(myList.length==10){
      openAlert("The MyDesigns List is full.");
      return;
    }
  }

  if(type==5 && myList.length<2 ){
    if(myList.length == 1 && showSideID==1 && isEdit==-1 && globalCMS1.getKeyLength()!=0){

    }
    else{
      openAlert("There are not enough CMSs at the MyDesigns list for the compare page. You need at least two CMS!");
      return;
    }

  }


  initPageType=type;



  // old page
  switch (showSideID) {



    case -1:
                document.getElementById("id_welcomePage").style.display = "none";
                document.getElementById("id_MainMenue").style.display = "block";
                document.getElementById("id_Mod_Menue").style.display = "block";
                document.getElementById("id_Colorspace_Menue").style.display = "initial";
                document.getElementById("div_colormapBandSketch").style.display = "block";
                document.getElementById("switchExpertMode").style.visibility = "visible";

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
              document.getElementById("id_Mapping_Table_Div").style.display = "none";
              //document.getElementById("div_colormapLinear").style.display = "none";

              stopAnimation();
              stopAnimationMapping();

              if(globalCMS1.getKeyLength()>0){

                if(isEdit==-1){

                  var newMap = cloneCMS(globalCMS1);
                  myList.push(newMap);
                  colormap1SelectIndex=myList.length-1;
                  if(initPageType!=5)
                  initNewPage();
                  else
                  openCompareSelect();
                }
                else{


                  var newMap = cloneCMS(globalCMS1);
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
                  globalCMS1= cloneCMS(myList[colormap1SelectIndex]);
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

                if(initPageType!=5)
                initNewPage();
                else
                openCompareSelect();


    break;

    case 3:
                if(type==5)
                return;


                document.getElementById("id_comparePage").style.display = "none";
                document.getElementById("div_colormapBandSketch2").style.display = "none";
                //document.getElementById("div_switchButton").style.display = "none";
                for(var i = refLineSketchContainer.length-1; i>=0; i--){
                  refLineSketchContainer[i].remove();
                  refLineSketchContainer.pop();
                }


                stopAnimation();


                initNewPage();
                colormap2SelectIndex=-1;


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
                  document.getElementById("div_colormapBandSketch").style.display = "block";

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
                        globalCMS1= cloneCMS(myList[colormap1SelectIndex]);
                    }
                  }

                  if(colormap1SelectIndex != -1 ){
                    globalCMS1= cloneCMS(myList[colormap1SelectIndex]);
                  }

                  if(initPageType!=5)
                  initNewPage();
                  else
                  openCompareSelect();


    break;

    case 7:
                  if(type==8)
                  return;

                  document.getElementById("id_impressumPage").style.display = "none";

                  document.getElementById("id_Colorspace_Menue").style.display = "initial";
                  //document.getElementById("id_Tutorial_Menue").style.display = "none";
                  document.getElementById("div_colormapBandSketch").style.display = "block";

                  if(initPageType!=5)
                  initNewPage();
                  else
                  openCompareSelect();


    break;

    case 8:

                if(type==9)
                return;

                document.getElementById("id_settingPage").style.display = "none";

                document.getElementById("id_Colorspace_Menue").style.display = "initial";
                //document.getElementById("id_Tutorial_Menue").style.display = "none";
                document.getElementById("div_colormapBandSketch").style.display = "block";

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

  document.getElementById("button_showMyDesigns").style.background = "none"; //styleInactiveColor;
  document.getElementById("button_showGallery").style.background = "none"; //styleInactiveColor;
  document.getElementById("button_showNewCMS").style.background = "none"; //styleInactiveColor;
  document.getElementById("button_showEditCMS").style.background = "none"; //styleInactiveColor;
  document.getElementById("button_showAnalyze").style.background = "none"; //styleInactiveColor;
  document.getElementById("button_showCompare").style.background = "none"; //styleInactiveColor;
  document.getElementById("button_showExport").style.background = "none"; //styleInactiveColor;
  document.getElementById("button_showTutorial").style.background = "none"; //styleInactiveColor;
  document.getElementById("button_showSettings").style.background = "none"; //styleInactiveColor;

 // new page
  switch (initPageType) {
    case 0:
      // MyDesings
      /////////////////////////////////////////
      document.getElementById("id_myListPage").style.display = "block";
      document.getElementById("button_showMyDesigns").style.background = styleActiveColor;
      showSideID = 0;
      drawMyList();

      break;
    case 1:
      // Gallery
      /////////////////////////////////////////
      //

      showSideID = 4;

      document.getElementById("id_addPage").style.display = "block";
      document.getElementById("button_showGallery").style.background = styleActiveColor;
      restSpace = sizeMyList-myList.length;

      if(restSpace==0)
        document.getElementById("id_addPageFreeLabel").style.color = "red";
      else
        document.getElementById("id_addPageFreeLabel").style.color = "black";

      document.getElementById("id_addPageFreeLabel").innerHTML = "Free Space for Adding Maps to MyDesigns : "+restSpace;
      //drawAddExistingAddPage();
      if(existingColormapsAreDrawn==false){
          for (var i = refElementContainer.length - 1; i >= 0; i--) {
            refElementContainer[i].remove();
            refElementContainer.pop();
          }
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

      document.getElementById("id_InputMapName").value = "Custom Colormap";
      document.getElementById("id_Create_Menue").style.display = "block";
      document.getElementById("id_Create_Menue").style.marginLeft = "20px";

      document.getElementById("id_creatorPage").style.display = "block";

      document.getElementById("button_showNewCMS").style.background = styleActiveColor;
      switchModifyModus(0);
      drawPredefinedBands();

      if(document.getElementById("id_mapping_Div").style.display !="none"){
        switchTableTestFunction(0);
      }

      globalCMS1.clear();

      break;
    case 3:
      // Edit
      /////////////////////////////////////////
      isEdit = colormap1SelectIndex;

      showSideID = 1;
      //styleCreatorPage();
      document.getElementById("id_InputMapName").value = myList[isEdit].getColormapName();
      document.getElementById("id_Create_Menue").style.display = "block";
      document.getElementById("id_Create_Menue").style.marginLeft = "20px";

      document.getElementById("id_creatorPage").style.display = "block";

      globalCMS1= cloneCMS(myList[colormap1SelectIndex]);
      switchModifyModus(1);
      drawPredefinedBands();

      if(document.getElementById("id_mapping_Div").style.display !="none"){
        animateMapping();
        updateMesh();
      }

      document.getElementById("button_showEditCMS").style.background = styleActiveColor;
      break;
    case 4:
      // Analyze
      /////////////////////////////////////////
      showSideID = 2;

      //document.getElementById("id_IntervalOption").style.marginLeft = "20px";
      document.getElementById("id_analysisPage").style.display = "block";
      document.getElementById("button_showAnalyze").style.background = styleActiveColor;
      //document.getElementById("id_AnalyseColorspace_Menue").style.display = "inline";
      initAnalysePage();
      break;
    case 5:
      // Compare
      /////////////////////////////////////////
      showSideID = 3;

      document.getElementById("div_colormapBandSketch2").style.display = "block";
      document.getElementById("id_comparePage").style.display = "block";
      document.getElementById("button_showCompare").style.background = styleActiveColor;
      initComparePage();
      break;
    case 6:
      // Export
      /////////////////////////////////////////
      showSideID = 6;
      document.getElementById("button_showExport").style.background = styleActiveColor;
      document.getElementById("id_exportPage").style.display = "block";

      initExportWindow();

      break;
    case 7:
      // Tutorial
      /////////////////////////////////////////
      showSideID = 5;
      document.getElementById("id_tutorialPage").style.display = "block";
      document.getElementById("button_showTutorial").style.background = styleActiveColor;
      document.getElementById("id_Colorspace_Menue").style.display = "none";
      document.getElementById("div_colormapBandSketch").style.display = "none";
      changeTutorial(0);

      break;

      case 8:
        // Impressum
        /////////////////////////////////////////
        showSideID = 7;
        document.getElementById("id_impressumPage").style.display = "block";
        document.getElementById("id_Colorspace_Menue").style.display = "none";
        document.getElementById("div_colormapBandSketch").style.display = "none";

        break;

        case 9:
          // Setting
          /////////////////////////////////////////
          showSideID = 8;
          document.getElementById("id_settingPage").style.display = "block";
          document.getElementById("button_showSettings").style.background = styleActiveColor;
          document.getElementById("id_Colorspace_Menue").style.display = "none";
          document.getElementById("div_colormapBandSketch").style.display = "none";

          break;

    default:
      return;
  }

  initPageType=-1;

  if(showSideID!=5 && showSideID!=7 && showSideID!=8)
  orderColorSketch(colorspaceModus);
  else{

    for(var i = refLineSketchContainer.length-1; i>=0; i--){
      refLineSketchContainer[i].remove();
      refLineSketchContainer.pop();
    }

    for(var i = refElementContainer.length-1; i>=0; i--){
      refElementContainer[i].remove();
      refElementContainer.pop();
    }
  }
}


function readCMSFile(e) {

  var file = e.target.files[0];
  if (!file) {
    return;
  }

  var fileName = file.name;

  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;


    var fileExtension = fileName.replace(/^.*\./, '');
    var cms;

    switch (fileExtension) {
            case 'xml': case 'XML':
                cms = xmlColormapParserFile(contents);
                break;
            case 'json': case 'JSON':
                cms = jsonColormapParserFile(contents);
                break;
            case 'csv': case 'CSV':
                cms = csvColormapParserFile(contents);
                break;
            default:
                console.log("Error at readCMSFile function -> file extension is unknown!");
                return;
    }


    switch (showSideID) {
            case 0:

                // check if CMS is empty (key length)
                if(cms.getKeyLength()!=0){
                  globalCMS1=cloneCMS(cms);
                  myList.push(cms);
                  colormap1SelectIndex=myList.length-1;
                  orderColorSketch();
                  drawMyList();
                }

                break;
            case 1:
                globalCMS1=cms;
                orderColorSketch();
                break;
            default:
                console.log("Error at readCMSFile function -> showSideID is unknown!");
                return;
    }

  };


  reader.readAsText(file);


}



function closeAlert(){
  document.getElementById("popupAlertWindow").style.display="none";
}

function openAlert(txt){
  document.getElementById("popupAlertWindow").style.display="block";
  document.getElementById("id_alertText").innerHTML=txt;
}
