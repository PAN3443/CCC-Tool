
function pp_3D_mousemove(event){
  // calc mouse pos
  switch (event.target.parentElement.id) {
    case editSection.part_Pathplot.partDivID+"_PP_3D":
      var rect = document.getElementById(editSection.part_Pathplot.partDivID+"_PP_3D").getBoundingClientRect();
      editSection.part_Pathplot.pp_3D_Mousemove(event.clientX - rect.left,event.clientY - rect.top,rect.width,rect.height);
    break;
    case optiSection.part_Pathplot.partDivID+"_PP_3D":
      var rect = document.getElementById(optiSection.part_Pathplot.partDivID+"_PP_3D").getBoundingClientRect();
      optiSection.part_Pathplot.pp_3D_Mousemove(event.clientX - rect.left,event.clientY - rect.top,rect.width,rect.height);
    break;
    case cbSimSection.part_Pathplot.partDivID+"_PP_3D":
      var rect = document.getElementById(cbSimSection.part_Pathplot.partDivID+"_PP_3D").getBoundingClientRect();
      cbSimSection.part_Pathplot.pp_3D_Mousemove(event.clientX - rect.left,event.clientY - rect.top,rect.width,rect.height);
    break;
  }
}

function pp_3D_mouseleave(event){
  switch (event.target.id) {
    case editSection.part_Pathplot.partDivID+"_PP_3D":
      editSection.part_Pathplot.pp_doRotation=false;
    break;
    case optiSection.part_Pathplot.partDivID+"_PP_3D":
      optiSection.part_Pathplot.pp_doRotation=false;
    break;
    case cbSimSection.part_Pathplot.partDivID+"_PP_3D":
      cbSimSection.part_Pathplot.pp_doRotation=false;
    break;
  }
  enableScroll();

}

function pp_3D_mouseenter(event){
  switch (event.target.id) {
    case editSection.part_Pathplot.partDivID+"_PP_3D":
      editSection.part_Pathplot.pp_doRotation=false;
    break;
    case optiSection.part_Pathplot.partDivID+"_PP_3D":
      optiSection.part_Pathplot.pp_doRotation=false;
    break;
    case cbSimSection.part_Pathplot.partDivID+"_PP_3D":
      cbSimSection.part_Pathplot.pp_doRotation=false;
    break;
  }
  disableScroll();
}

function pp_3D_mousedown(event){

  switch (event.which) {
    case 1:
      // left mouse click
      switch (event.target.parentElement.id) {
        case editSection.part_Pathplot.partDivID+"_PP_3D":
          editSection.part_Pathplot.pp_doRotation=true;
          editSection.part_Pathplot.pp_doTranslation=false;
        break;
        case optiSection.part_Pathplot.partDivID+"_PP_3D":
          optiSection.part_Pathplot.pp_doRotation=true;
          optiSection.part_Pathplot.pp_doTranslation=false;
        break;
        case cbSimSection.part_Pathplot.partDivID+"_PP_3D":
          cbSimSection.part_Pathplot.pp_doRotation=true;
          cbSimSection.part_Pathplot.pp_doTranslation=false;
        break;
      }
      break;
    case 3:
      // right mouse click
      switch (event.target.parentElement.id) {
        case editSection.part_Pathplot.partDivID+"_PP_3D":
          editSection.part_Pathplot.pp_doRotation=false;
          editSection.part_Pathplot.pp_doTranslation=true;
        break;
        case optiSection.part_Pathplot.partDivID+"_PP_3D":
          optiSection.part_Pathplot.pp_doRotation=false;
          optiSection.part_Pathplot.pp_doTranslation=true;
        break;
        case cbSimSection.part_Pathplot.partDivID+"_PP_3D":
          cbSimSection.part_Pathplot.pp_doRotation=false;
          cbSimSection.part_Pathplot.pp_doTranslation=true;
        break;
      }
      break;
  }



}

function pp_3D_mouseup(event){
  switch (event.target.parentElement.id) {
    case editSection.part_Pathplot.partDivID+"_PP_3D":
      editSection.part_Pathplot.pp_doRotation=false;
      editSection.part_Pathplot.pp_doTranslation=false;
    break;
    case optiSection.part_Pathplot.partDivID+"_PP_3D":
      optiSection.part_Pathplot.pp_doRotation=false;
      optiSection.part_Pathplot.pp_doTranslation=false;
    break;
    case cbSimSection.part_Pathplot.partDivID+"_PP_3D":
      cbSimSection.part_Pathplot.pp_doRotation=false;
      cbSimSection.part_Pathplot.pp_doTranslation=false;
    break;
  }
}


function pp_3D_mousewheel(event){
    switch (event.target.parentElement.id) {
      case editSection.part_Pathplot.partDivID+"_PP_3D":
        if(event.deltaY>0){
          editSection.part_Pathplot.pp_3D_zoom(false);
        } else if(event.deltaY<0){
          editSection.part_Pathplot.pp_3D_zoom(true);
        }
      break;
      case optiSection.part_Pathplot.partDivID+"_PP_3D":
        if(event.deltaY>0){
          optiSection.part_Pathplot.pp_3D_zoom(false);
        } else if(event.deltaY<0){
          optiSection.part_Pathplot.pp_3D_zoom(true);
        }
      break;
      case cbSimSection.part_Pathplot.partDivID+"_PP_3D":
        if(event.deltaY>0){
          cbSimSection.part_Pathplot.pp_3D_zoom(false);
        } else if(event.deltaY<0){
          cbSimSection.part_Pathplot.pp_3D_zoom(true);
        }
      break;
    }
}
