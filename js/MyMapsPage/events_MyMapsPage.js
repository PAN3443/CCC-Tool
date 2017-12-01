function exportColormapFromMyMaps(index){

    if(index<myList.length){
      exportColormap = myList[index];
      document.getElementById("id_exportWindow").style.display = "initial";
      exportSideOpen = true;
      initExportWindow();
    }

}


function deletetColormapFromMyMaps(index){

    if(index<myList.length){
        if (confirm("Do you really want to delete the colormap?") == true) {
          myList.splice(index,1);
          drawMyList();
        } else {
            // do nothing
        }
    }

}


function openEditColormapFromMyMaps(index){

    if(index<myList.length){

    }

}
