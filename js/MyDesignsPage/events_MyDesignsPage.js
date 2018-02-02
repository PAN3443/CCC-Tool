function exportColormapFromMyDesigns(index){

    if(index<myList.length){
      globalColormap1 = myList[index];
      document.getElementById("id_exportWindow").style.display = "initial";
      exportSideOpen = true;
      initExportWindow();
    }

}


function deletetColormapFromMyDesigns(index){

    if(index<myList.length){
        if (confirm("Do you really want to delete the colormap?") == true) {


          myList.splice(index,1);

          if(index==colormap1SelectIndex){
            colormap1SelectIndex=0;
          }

          if(index<colormap1SelectIndex){
            colormap1SelectIndex--;
          }

          if(myList.length==0){
            colormap1SelectIndex=-1;
            bandSketch.clearSketch();
            orderColorSketch();
          }

          drawMyList();
        } else {
            // do nothing
        }
    }

}



/*function selectAnalysis(){

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

*/

function acceptColormapFromMyDesigns(index){

  if(index<myList.length){

    document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.border = "0.2vh solid rgb(0,0,0)";
    document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.color = "rgb(0,0,0)";
    colormap1SelectIndex = index;
    document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.border = "0.2vh solid "+styleActiveColor;
    document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.color = styleActiveColor;

    globalColormap1=myList[colormap1SelectIndex];
    bandSketch.colormap2Sketch(globalColormap1);
    orderColorSketch(colorspaceModus);

  }

}
