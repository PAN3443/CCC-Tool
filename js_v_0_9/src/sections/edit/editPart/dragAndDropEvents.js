
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
  editCMS_AllowDrop=false;
  //document.getElementById('id_EditPage_CMSVisCanvas').style.border = "0.4 solid var(--general-active-color)";
}

function cmsStructureOnLeave(event) {
    //document.getElementById('id_EditPage_CMSVisCanvas').style.border = "none";
    editSection.updateSection();
}



////////////////////////////////////////////////
