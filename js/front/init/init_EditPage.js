

function init_events_EditPage(){

  var sketchElement = document.getElementById('id_EditPage_CMS_VIS_ColormapSketch');
  sketchElement.addEventListener("dragenter", bandOnEnter);
  sketchElement.addEventListener("dragleave", bandOnLeave);
  //sketchElement.addEventListener("drop dragdrop", createSide_BandOnDrop);

  sketchElement.addEventListener("mousemove", sketch_MouseMove);
  sketchElement.addEventListener("click", sketch_MouseClick);

  sketchElement.ondrop = function(event) {
    event.preventDefault();
    bandOnDrop();
  }; // allow Drop


  sketchElement.ondragover = function(event) {
    event.preventDefault();

    event = event || window.event;
    //var dragX = event.pageX, dragY = event.pageY;

    var rect = event.target.getBoundingClientRect();
    var canvasPosX = event.clientX - rect.left;
    //var canvasPosY = event.clientY - rect.top;
    var ratioToColorspaceResolutionX = event.target.width / rect.width;
    //var ratioToColorspaceResolutionY = event.target.height / rect.height;
    mousePosX = canvasPosX * ratioToColorspaceResolutionX;
    //mousePosY = canvasPosY * ratioToColorspaceResolutionY;

    if (globalCMS1.getKeyLength() == 0) {
      indexOfDroppedPlace = 0;
      return;
    }

    for (var i = 0; i < dropRects.length; i++) {
      if (mousePosX >= dropRects[i] && mousePosX <= dropRects[i] + bandSketchObjLength) {
        if (indexOfDroppedPlace != i) {
          indexOfDroppedPlace = i;
          drawBandSketch(globalCMS1, "id_EditPage_CMS_VIS_ColormapSketch",  true, i);
        }
        return;
      }
    }
    indexOfDroppedPlace = -1;

  }; // allow Drop
}
