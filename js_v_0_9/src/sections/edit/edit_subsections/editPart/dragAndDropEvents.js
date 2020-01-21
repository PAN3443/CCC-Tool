
/////////////////////////////////////////////
//  Drag And Drop
////////////////////////////////////////////

function cmsStructureOnDragStart(event){
    hideAllDropDowns();
    event.dataTransfer.dropEffect = "move";
}

function cmsStructureDragOver(event){
  event.preventDefault();

  event = event || window.event;
  //var dragX = event.pageX, dragY = event.pageY;

  var rect = event.target.getBoundingClientRect();
  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  var ratioToColorspaceResolutionX = event.target.width / rect.width;
  var ratioToColorspaceResolutionY = event.target.height / rect.height;
  editSection.dragOver(canvasPosX * ratioToColorspaceResolutionX,canvasPosY * ratioToColorspaceResolutionY);
}

function cmsStructureOnDragEnd(event) {
    editSection.updateSection();
}

function cmsStructureOnEnter(event) {
  editSection.predefinedDrawStatus = -2;
}

function cmsStructureOnLeave(event) {
    editSection.predefinedDrawStatus = -2;
    editSection.updateSection();
}



////////////////////////////////////////////////
