//////////////////////////////
///// Menue button Events /////
//////////////////////////////

function createSideExport(){
  if(bandSketch.getBandLength()!=0){
    document.getElementById("id_exportWindow").style.display = "initial";
    exportSideOpen = true;
    initExportWindow();
  }
}

function colormapNameChangeEnter(e){
   if (e.keyCode == 13 && globalCMS1!=undefined)
    globalCMS1.setColormapName(document.getElementById("id_InputMapName").value);
}

function colormapNameChange(e){
    if(globalCMS1!=undefined){
     globalCMS1.setColormapName(document.getElementById("id_InputMapName").value);
    }
}

function deleteCreatedColormap(){

  if (confirm("Do you really want to delete the colormap?") == true) {
      clearCreateSide();

      globalCMS1.clear();
      orderColorSketch();

  }

}

function saveColormapToList(){

  if(globalCMS1.getKeyLength()>0){

    if(isEdit==-1){

      if(myList.length<9){
        //var newMap = bandSketch.sketch2Colormap(colorspaceModus, globalColormap1.getColormapName());
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

      //var newMap = bandSketch.sketch2Colormap(colorspaceModus, globalColormap1.getColormapName());
      tmpSaveColormap = cloneCMS(globalCMS1);

      openSavePopUp();
      //changePage(0);

    }

  }

}

function createPage_showHelp(){

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  // Sketch
  var workrect = document.getElementById("id_colormapSketch").getBoundingClientRect();
  var top = (workrect.top+workrect.height) + scrollTop - clientTop;
  var left = workrect.left + scrollLeft - clientLeft;
  document.getElementById("createSide_sketchHelp").style.display="inline-block";
  document.getElementById("createSide_sketchHelp").style.left= left+"px";
  document.getElementById("createSide_sketchHelp").style.top= top+"px";

  // Colorspace
  workrect = document.getElementById("id_Colorspace_Menue").getBoundingClientRect();
  top = (workrect.top+workrect.height) + scrollTop - clientTop;
  left = workrect.left + scrollLeft - clientLeft;
  document.getElementById("createSide_colorspaceHelp").style.display="inline-block";
  document.getElementById("createSide_colorspaceHelp").style.left= left+"px";
  document.getElementById("createSide_colorspaceHelp").style.top= top+"px";

  // Add band buttons
  if(document.getElementById("id_DivAddBands").style.display!="none"){
    workrect = document.getElementById("button_AddConstantBand").getBoundingClientRect();
    top = (workrect.top+workrect.height) + scrollTop - clientTop;
    left = workrect.left + scrollLeft - clientLeft;
    document.getElementById("createSide_add1Help").style.display="inline-block";
    document.getElementById("createSide_add1Help").style.left= left+"px";
    document.getElementById("createSide_add1Help").style.top= top+"px";

    workrect = document.getElementById("button_AddScaleBand").getBoundingClientRect();
    top = (workrect.top+workrect.height) + scrollTop - clientTop;
    left = workrect.left + scrollLeft - clientLeft;
    document.getElementById("createSide_add2Help").style.display="inline-block";
    document.getElementById("createSide_add2Help").style.left= left+"px";
    document.getElementById("createSide_add2Help").style.top= top+"px";

    workrect = document.getElementById("button_AddDoubleBands").getBoundingClientRect();
    top = (workrect.top+workrect.height) + scrollTop - clientTop;
    left = workrect.left + scrollLeft - clientLeft;
    document.getElementById("createSide_add3Help").style.display="inline-block";
    document.getElementById("createSide_add3Help").style.left= left+"px";
    document.getElementById("createSide_add3Help").style.top= top+"px";

    workrect = document.getElementById("button_AddTripleBands").getBoundingClientRect();
    top = (workrect.top+workrect.height) + scrollTop - clientTop;
    left = workrect.left + scrollLeft - clientLeft;
    document.getElementById("createSide_add4Help").style.display="inline-block";
    document.getElementById("createSide_add4Help").style.left= left+"px";
    document.getElementById("createSide_add4Help").style.top= top+"px";

    workrect = document.getElementById("button_AddQuadrupleBands").getBoundingClientRect();
    top = (workrect.top+workrect.height) + scrollTop - clientTop;
    left = workrect.left + scrollLeft - clientLeft;
    document.getElementById("createSide_add5Help").style.display="inline-block";
    document.getElementById("createSide_add5Help").style.left= left+"px";
    document.getElementById("createSide_add5Help").style.top= top+"px";
  }


}

function createPage_hideHelp(){

  document.getElementById("createSide_sketchHelp").style.display="none";
  document.getElementById("createSide_colorspaceHelp").style.display="none";
  document.getElementById("createSide_add1Help").style.display="none";
  document.getElementById("createSide_add2Help").style.display="none";
  document.getElementById("createSide_add3Help").style.display="none";
  document.getElementById("createSide_add4Help").style.display="none";
  document.getElementById("createSide_add5Help").style.display="none";

}

function clearCreateSide(){
  colormapProcess = [];
  processPosition = -1;


  for(var i = refElementContainer.length-1; i>=0; i--){
    refElementContainer[i].remove();
    refElementContainer.pop();
  }
}

function backwardColormapProcess(){
  if(processPosition>0){
    processPosition--;
    globalCMS1 = colormapProcess[processPosition];
  }
}

function forwardColormapProcess(){
  if(processPosition<colormapProcess.length-1){
    processPosition++;
    globalCMS1 = colormapProcess[processPosition];
  }
}

function loadColormapCreateSide(){
  document.getElementById("id_inputData").click();
}
