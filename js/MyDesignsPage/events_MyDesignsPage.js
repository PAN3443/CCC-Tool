function exportColormapFromMyDesigns(index){

    if(index<myList.length){
      exportColormap = myList[index];
      document.getElementById("id_exportWindow").style.display = "initial";
      exportSideOpen = true;
      initExportWindow();
    }

}


function deletetColormapFromMyDesigns(index){

    if(index<myList.length){
        if (confirm("Do you really want to delete the colormap?") == true) {
          myList.splice(index,1);
          drawMyList();
        } else {
            // do nothing
        }
    }

}


function openEditColormapFromMyDesigns(index){

    if(index<myList.length){
      isEdit = index;
      /*showSideID = 1;
      styleCreatorPage();
      document.getElementById("id_myListPage").style.display = "none";

      document.getElementById("id_Create_Menue").style.display = "inline";
      document.getElementById("id_Create_Menue").style.marginLeft = "20px";

      document.getElementById("id_creatorPage").style.display = "inline";

      document.getElementById("id_SideLabel").innerHTML = "Create Colormap";

      bandSketch.colormap2Sketch(myList[index]);
      orderColorSketch(colorspaceModus);
      changeColorspace(0);*/

      document.getElementById("id_myListPage").style.display = "none";

      document.getElementById("id_editPage").style.display = "inline-block";

      document.getElementById("id_SideLabel").innerHTML = "Edit CMS";
      showSideID = 6;
      bandSketch.colormap2Sketch(myList[index]);
      orderColorSketch(colorspaceModus);
      addKeyButtons();
    }

}

function selectAnalysis(){

  if(myListPageModus==1){

    myListPageModus=0;
    document.getElementById("id_MyListAnalysisButton").style.color = "black";
    document.getElementById("id_MyListAnalysisButton").style.borderColor = "rgb(180,180,180)";
    showEditButtons();
    document.getElementById("id_myListInfo").innerHTML = "";

  }
  else{

    if(myListPageModus==2){
      document.getElementById("id_MyListCompareButton").style.color = "black";
      document.getElementById("id_MyListCompareButton").style.borderColor = "rgb(180,180,180)";

      if(selectFirstForCompare){
        document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.backgroundImage = "url(img/acceptButton_black.png)";
        document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.borderColor = "rgb(180,180,180)";
        selectFirstForCompare=false;
      }
    }

    if(myList.length>0){
      myListPageModus=1;
      if(myList.length==1){
        acceptColormapFromMyDesigns(0);
      }
      else{
        document.getElementById("id_MyListAnalysisButton").style.color = "rgb(0,191,255)";
        document.getElementById("id_MyListAnalysisButton").style.borderColor = "rgb(0,191,255)";
        showAcceptButtons();
        document.getElementById("id_myListInfo").innerHTML = "Info: Select one colormap for the analysis";
      }
    }
  }

}


function selectCompare(){

  if(myListPageModus==2){

    if(selectFirstForCompare){
      document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.backgroundImage = "url(img/acceptButton_black.png)";
      document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.borderColor = "rgb(180,180,180)";
      selectFirstForCompare=false;
    }

    myListPageModus=0;
    document.getElementById("id_MyListCompareButton").style.color = "black";
    document.getElementById("id_MyListCompareButton").style.borderColor = "rgb(180,180,180)";
    showEditButtons();
    document.getElementById("id_myListInfo").innerHTML = "";

  }
  else{

    if(myListPageModus==1){
      document.getElementById("id_MyListAnalysisButton").style.color = "black";
      document.getElementById("id_MyListAnalysisButton").style.borderColor = "rgb(180,180,180)";
    }

    if(myList.length>1){
      myListPageModus=2;
      if(myList.length==2){
        acceptColormapFromMyDesigns(0);
        acceptColormapFromMyDesigns(1);
      }
      else{
        document.getElementById("id_MyListCompareButton").style.color = "rgb(0,191,255)";
        document.getElementById("id_MyListCompareButton").style.borderColor = "rgb(0,191,255)";
        showAcceptButtons();
        document.getElementById("id_myListInfo").innerHTML = "Info: Select two colormaps for the compare";
      }
    }
  }

}



function showEditButtons(){

  for(var i=0; i<myList.length; i++){
    document.getElementById("id_buttonExportMyList"+i).style.display = "initial";
    document.getElementById("id_buttonEditMyList"+i).style.display = "initial";
    document.getElementById("id_buttonDeleteMyList"+i).style.display = "initial";
    document.getElementById("id_buttonAcceptMyList"+i).style.display = "none";
  }

  for(var i=9; i>myList.length-1; i--){
    document.getElementById("id_buttonExportMyList"+i).style.display = "initial";
    document.getElementById("id_buttonEditMyList"+i).style.display = "initial";
    document.getElementById("id_buttonDeleteMyList"+i).style.display = "initial";
    document.getElementById("id_placeHolderMyList"+i).style.display = "none";
  }

}

function showAcceptButtons(){

  for(var i=0; i<myList.length; i++){

    document.getElementById("id_buttonExportMyList"+i).style.display = "none";
    document.getElementById("id_buttonEditMyList"+i).style.display = "none";
    document.getElementById("id_buttonDeleteMyList"+i).style.display = "none";
    document.getElementById("id_buttonAcceptMyList"+i).style.display = "initial";
  }

  for(var i=9; i>myList.length-1; i--){

    document.getElementById("id_buttonExportMyList"+i).style.display = "none";
    document.getElementById("id_buttonEditMyList"+i).style.display = "none";
    document.getElementById("id_buttonDeleteMyList"+i).style.display = "none";
    document.getElementById("id_placeHolderMyList"+i).style.display = "initial";

  }

}

function acceptColormapFromMyDesigns(index){

  if(myListPageModus==1 ){
    showSideID = 2;
    colormap1SelectIndex = index;
    analysisColormap = myList[index];
    showAnalysisSide();
    selectAnalysis(); // reset
  }

  if(myListPageModus==2 ){

    if(selectFirstForCompare){

      colormap2SelectIndex = index;
      document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.backgroundImage = "url(img/acceptButton_black.png)";
      document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.borderColor = "rgb(180,180,180)";
      selectFirstForCompare=false;

      if(colormap1SelectIndex!=colormap2SelectIndex){
          compareColormap1 = myList[colormap1SelectIndex];
          compareColormap2 = myList[colormap2SelectIndex];
          showCompareSide();
          selectCompare();
      }

    }
    else{
      colormap1SelectIndex = index;
      document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.backgroundImage = "url(img/acceptButton_blue.png)";
      document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.borderColor = "rgb(0,191,255)";
      selectFirstForCompare=true;
    }

  }
}
