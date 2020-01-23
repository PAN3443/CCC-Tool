
function keyAdd2DAnimation(){
  if(editSection.drawAddKey){
    editSection.drawWorkCMS();
  }
}

function keyChange2DAnimation(){
  if(editSection.part_Pathplot.pathplot_space==="rgb" && editSection.part_Pathplot.partIsReady){
    editSection.part_Pathplot.partIsReady=false; // prevent the draw of the pathplot, because at the RGB Pathplot are no changes
    editSection.updateSection();
    editSection.part_Pathplot.partIsReady=true;
  }
  else
    editSection.updateSection();
}

function editCMS_MouseMove(event){

  var rect = event.target.getBoundingClientRect();
  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  var ratioToColorspaceResolutionX = event.target.width / rect.width;
  var ratioToColorspaceResolutionY = event.target.height / rect.height;
  var mousePosX = canvasPosX * ratioToColorspaceResolutionX;
  var mousePosY = canvasPosY * ratioToColorspaceResolutionY;
  editSection.cmsVisMouseMove(mousePosX,mousePosY);
}

function editCMS_MouseDown(){

  switch (editSection.getKeyModus()) {
    case 0:
        editSection.cmsVisGrap();
      break;
      case 1:
        if(editSection.drawAddKey){
          editSection.replaceWithWorkCMS();
          editSection.updateSection();
        }
        editSection.drawAddKey=false;
        break;
        case 2:
            editSection.cmsVisDeleteKey();
          break;
  }
}

function editCMS_MouseUp(){
  if(editSection.grappedSomething()){
    clearInterval(timer2DAnimation);
    editSection.resetGrapMoveVars();
    editSection.saveCreateProcess();
  }
}

function editCMS_MouseEnter(){

  if(editSection.getKeyModus()==1){
    timer2DAnimation = setInterval(keyAdd2DAnimation, animationInterval);
  }
  else {
    if(editSection.grappedSomething()){
      clearInterval(timer2DAnimation);
      editSection.resetGrapMoveVars();
      editSection.saveCreateProcess();
    }
  }

}

function editCMS_MouseLeave(){

  if(editSection.drawOriginal){
    editSection.drawEditCMSVIS();
    editSection.drawOriginal=false;
  }

  clearInterval(timer2DAnimation);
  editSection.resetGrapMoveVars();

  if(editSection.grappedSomething()){
    editSection.saveCreateProcess();
  }

  editSection.drawEditCMSVIS();
}
