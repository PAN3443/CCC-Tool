
var editCMS_drawADDKey=false;
var editCMS_AddKeyDrawOriginal=false;

function keyAdd2DAnimation(){
  if(editCMS_drawADDKey){
    editSection.drawEditCMSVIS();
  }
}

function keyChange2DAnimation(){
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
        editSection.replaceWithWorkCMS();
        editSection.updateSection();
        break;
        case 2:
            editSection.deleteKey();
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

  if(editCMS_AddKeyDrawOriginal){
    editSection.drawEditCMSVIS();
    editCMS_AddKeyDrawOriginal=false;
  }

  clearInterval(timer2DAnimation);
  editSection.resetGrapMoveVars();

  if(editSection.grappedSomething()){
    editSection.saveCreateProcess();
  }
}
