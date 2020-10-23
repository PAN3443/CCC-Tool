/////////////////////////////////////
// -------------Event COLORSPACE HUE---------------//
/////////////////////////////////////

function pp_2D_mouseEnter(event){

  switch (true) {
    case editSection.isSectionOpen():
      editSection.part_Pathplot.pp_setCanvasMode(event.target.id);
    break;
    case optiSection.isSectionOpen():
      optiSection.part_Pathplot.pp_setCanvasMode(event.target.id);
    break;
    case cbSimSection.isSectionOpen():
      cbSimSection.part_Pathplot.pp_setCanvasMode(event.target.id);
    break;
  }
}

function pp_2D_mouseLeave(event) {
  document.getElementById(event.target.id).style.cursor = "default";
  clearInterval(timer2DAnimation);

  switch (true) {
    case editSection.isSectionOpen():
      editSection.part_Pathplot.pp_CanvasMode = undefined;
      if(editSection.part_Pathplot.mouseGrappedKeyID!=-1){
        editSection.saveCreateProcess();
        editSection.part_Pathplot.updatePart(true,true,true);
      }
      editSection.part_Pathplot.mouseGrappedKeyID=-1;
      editSection.part_Pathplot.mouseGrappedColorSide=-1;
    break;
    case optiSection.isSectionOpen():
      optiSection.part_Pathplot.pp_CanvasMode = undefined; //
      if(optiSection.part_Pathplot.mouseGrappedKeyID!=-1){
        optiSection.saveCreateProcess();
        optiSection.part_Pathplot.updatePart(true,true,true);
      }
      optiSection.part_Pathplot.mouseGrappedKeyID=-1;
      optiSection.part_Pathplot.mouseGrappedColorSide=-1;
    break;
    case cbSimSection.isSectionOpen():
      cbSimSection.part_Pathplot.pp_CanvasMode = undefined;
      if(cbSimSection.part_Pathplot.mouseGrappedKeyID!=-1){
        cbSimSection.saveCreateProcess();
        cbSimSection.part_Pathplot.updatePart(true,true,true);
      }
      cbSimSection.part_Pathplot.mouseGrappedKeyID=-1;
      cbSimSection.part_Pathplot.mouseGrappedColorSide=-1;
    break;
  }
}

function pathplot2DAnimation(){
  switch (true) {
    case editSection.isSectionOpen():
      editSection.updateSection();
    break;
    case optiSection.isSectionOpen():
      optiSection.updateSection();
    break;
    case cbSimSection.isSectionOpen():
      cbSimSection.updateSection();
    break;
  }
}

function pp_2D_mouseMove(event) {

  // calc mouse pos
  var rect = document.getElementById(event.target.id).getBoundingClientRect();
  var resolutionX = document.getElementById(event.target.id).width;
  var resolutionY = document.getElementById(event.target.id).height;

  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;

  switch (true) {
    case editSection.isSectionOpen():
      editSection.part_Pathplot.pp_mouseMove(event.target.id,canvasPosX,canvasPosY);
    break;
    case optiSection.isSectionOpen():
      optiSection.part_Pathplot.pp_mouseMove(event.target.id,canvasPosX,canvasPosY);
    break;
    case cbSimSection.isSectionOpen():
      cbSimSection.part_Pathplot.pp_mouseMove(event.target.id,canvasPosX,canvasPosY);
    break;
  }
}

function pp_2D_mouseDown(event) {

  switch (true) {
    case editSection.isSectionOpen():
      if(editSection.part_Pathplot.mouseAboveKeyID!=-1){
          timer2DAnimation = setInterval(pathplot2DAnimation, animationInterval);
          // Calc Band Index
          editSection.part_Pathplot.mouseGrappedKeyID = editSection.part_Pathplot.mouseAboveKeyID;
          editSection.part_Pathplot.updatePart(true,false,false);
      }
    break;
    case optiSection.isSectionOpen():
      timer2DAnimation = setInterval(pathplot2DAnimation, animationInterval);
      // Calc Band Index
      optiSection.part_Pathplot.mouseGrappedKeyID = optiSection.part_Pathplot.mouseAboveKeyID;
      optiSection.part_Pathplot.updatePart(true,false,false);
    break;
    case cbSimSection.isSectionOpen():
      if(cbSimSection.part_Pathplot.mouseAboveKeyID!=-1){
          timer2DAnimation = setInterval(pathplot2DAnimation, animationInterval);
          // Calc Band Index
          cbSimSection.part_Pathplot.mouseGrappedKeyID = cbSimSection.part_Pathplot.mouseAboveKeyID;
          cbSimSection.part_Pathplot.updatePart(true,false,false);
      }
    break;
  }
}

function pp_2D_mouseUp() {

  clearInterval(timer2DAnimation);

  switch (true) {
    case editSection.isSectionOpen():
      editSection.part_Pathplot.mouseGrappedKeyID=-1;
      editSection.part_Pathplot.mouseGrappedColorSide=-1;
      editSection.saveCreateProcess();
      editSection.part_Pathplot.updatePart(true,true,true);
    break;
    case optiSection.isSectionOpen():
      optiSection.part_Pathplot.mouseGrappedKeyID=-1;
      optiSection.part_Pathplot.mouseGrappedColorSide=-1;
      optiSection.saveCreateProcess();
      optiSection.part_Pathplot.updatePart(true,true,true);
    break;
    case cbSimSection.isSectionOpen():
      cbSimSection.part_Pathplot.mouseGrappedKeyID=-1;
      cbSimSection.part_Pathplot.mouseGrappedColorSide=-1;
      cbSimSection.saveCreateProcess();
      cbSimSection.part_Pathplot.updatePart(true,true,true);
    break;
  }
}
