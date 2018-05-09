function exportColormapFromMyDesigns(index){

    if(index<myList.length){
      globalColormap1 = myList[index];
      changePage(6);
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
            globalCMS1.clear();
            orderColorSketch();
          }

          drawMyList();
        } else {
            // do nothing
        }
    }

}


function acceptColormapFromMyDesigns(index){

  if(index<myList.length){

    document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.border = "0.2vh solid rgb(0,0,0)";
    document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.color = "rgb(0,0,0)";
    colormap1SelectIndex = index;
    document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.border = "0.2vh solid "+styleActiveColor;
    document.getElementById("id_buttonAcceptMyList"+colormap1SelectIndex).style.color = styleActiveColor;

    globalColormap1=cloneCMS(myList[colormap1SelectIndex]);
    orderColorSketch(colorspaceModus);

  }

}
