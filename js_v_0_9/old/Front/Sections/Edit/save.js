

function saveCMS(){

  myDesignsList[indexActiveCMS] = cloneCMS(globalCMS1);
  document.getElementById("id_header_editWarning").style.visibility="hidden";
  somethingChanged=false;
  drawPredefined_MyDesignsCMS();

}

function saveCMSasNew(){


  if(myDesignsList.length<numberOfMyDesignsObj){
    myDesignsList.push(cloneCMS(globalCMS1));
    somethingChanged=false;
    document.getElementById("id_header_editWarning").style.visibility="hidden";
    drawPredefined_MyDesignsCMS();
  }
  else{
    openAlert("You already used the full CMS-storage and the CMS can not saved as new one!");
  }

  /*document.getElementById("edit_Page_FreeSpaceInfo").innerHTML="Free Places: "+(numberOfMyDesignsObj-myDesignsList.length);

  if(numberOfMyDesignsObj-myDesignsList.length==0){
    document.getElementById("edit_Page_FreeSpaceInfo").style.color="red";
  }
  else{
    document.getElementById("edit_Page_FreeSpaceInfo").style.color="black";
  }*/

}


function saveColormapToList(){

  if(globalCMS1.getKeyLength()>0){

    if(isEdit==-1){

      if(myList.length<9){
        myList.push(cloneCMS(globalCMS1));
        colormap1SelectIndex=myList.length-1;
        clearCreateSide();

        globalCMS1.clear();
        orderColorSketch();
      }
      else{
        changePage(0);
      }

    }
    else{
      tmpSaveColormap = cloneCMS(globalCMS1);
      openSavePopUp();
    }

    switchModifyModus(0);
  }

}
