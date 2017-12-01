//////////////////////////////
///// Menue button Events /////
//////////////////////////////

function createSideExport(){
  if(colormapBandSketchC1.length!=0){
    exportColormap = createColormap;
    document.getElementById("id_exportWindow").style.display = "initial";
    exportSideOpen = true;
    initExportWindow();
  }
}

function colormapNameChangeEnter(e){
   if (e.keyCode == 13 && createColormap!=undefined)
    createColormap.setColormapName(document.getElementById("id_InputMapName").value);
}

function colormapNameChange(e){
    if(createColormap!=undefined){
     createColormap.setColormapName(document.getElementById("id_InputMapName").value);
    }
}

function deleteCreatedColormap(){

  if (confirm("Do you really want to delete the colormap?") == true) {
      clearCreateSide();
  } else {
      // do nothing
  }

}

function clearCreateSide(){
  colormapProcess = [];
  processPosition = -1;
  createColormap.setColormapName("Costumer Colormap");
  document.getElementById("id_InputMapName").value = "Costumer Colormap";
  colormapBandSketchC1 = [];
  colormapBandSketchC2 = [];
  colormapBandSketchR1 = [];
  colormapBandSketchR2 = [];
  orderColorSketch();

  for(var i = refElementContainer.length-1; i>=0; i--){
    refElementContainer[i].remove();
    refElementContainer.pop();
  }
}

function backwardColormapProcess(){
  if(processPosition>0){
    processPosition--;
    createColormap = colormapProcess[processPosition];
    updateColormapSketch();
  }
}

function forwardColormapProcess(){
  if(processPosition<colormapProcess.length-1){
    processPosition++;
    createColormap = colormapProcess[processPosition];
    updateColormapSketch();
  }
}


function updateColormapSketch(){

  colormapBandSketchC1 = [];
  colormapBandSketchC2 = [];
  colormapBandSketchR1 = [];
  colormapBandSketchR2 = [];

  for(var i=0; i<createColormap.getNumberOfBands(); i++){

    colormapBandSketchC1.push(createColormap.getBand(i).getLeftRGBColor());
    colormapBandSketchC2.push(createColormap.getBand(i).getRightRGBColor());
    colormapBandSketchR1.push(createColormap.getBand(i).getLeftRef());
    colormapBandSketchR2.push(createColormap.getBand(i).getRightRef());

  }

  orderColorSketch();
}


function saveColormapToList(){

  if(colormapBandSketchC1.length>0){
    myList.push(createColormap);
    clearCreateSide();

    showSideID = 0;

    document.getElementById("id_myListPage").style.display = "initial";

    document.getElementById("id_Create_Menue").style.display = "none";
    document.getElementById("id_creatorPage").style.display = "none";

    document.getElementById("id_SideLabel").innerHTML = "My Maps";

    drawMyList();
  }
}
