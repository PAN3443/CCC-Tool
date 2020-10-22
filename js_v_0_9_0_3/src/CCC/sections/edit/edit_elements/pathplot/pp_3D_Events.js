
function pp_3D_mousemove(event){
  // calc mouse pos
  switch (event.target.parentElement.id) {
    case editSection.part_Pathplot.partDivID+"_PP_3D":
      var rect = document.getElementById(editSection.part_Pathplot.partDivID+"_PP_3D").getBoundingClientRect();
      editSection.part_Pathplot.pp_3D_Mousemove(event.clientX - rect.left,event.clientY - rect.top,rect.width,rect.height);
      /*if(editSection.part_Pathplot.pp_doRotation){
          editSection.part_Pathplot.pp_xRotationAngle = editSection.pp_xRotationDownAngle + ( editSection.part_Pathplot.mousePosX - editSection.part_Pathplot.pp_downXPos ) * 0.02;
          editSection.part_Pathplot.pp_yRotationAngle = editSection.pp_yRotationDownAngle + ( editSection.part_Pathplot.mousePosY - editSection.part_Pathplot.pp_downYPos ) * 0.02;
      }*/
    break;
    case optiSection.part_Pathplot.partDivID+"_PP_3D":
      var rect = document.getElementById(optiSection.part_Pathplot.partDivID+"_PP_3D").getBoundingClientRect();
      optiSection.part_Pathplot.pp_3D_Mousemove(event.clientX - rect.left,event.clientY - rect.top,rect.width,rect.height);
      /*if(optiSection.part_Pathplot.pp_doRotation){
          optiSection.part_Pathplot.pp_xRotationAngle = optiSection.pp_xRotationDownAngle + ( optiSection.part_Pathplot.mousePosX - optiSection.part_Pathplot.pp_downXPos ) * 0.02;
          optiSection.part_Pathplot.pp_yRotationAngle = optiSection.pp_yRotationDownAngle + ( optiSection.part_Pathplot.mousePosY - optiSection.part_Pathplot.pp_downYPos ) * 0.02;
      }*/
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
    }
}

/*function changeOpacityRange(event){

      if(parseFloat(document.getElementById(event.target.id).value)<0){
        document.getElementById(event.target.id).value = 0;
      }

      if(parseFloat(document.getElementById(event.target.id).value)>100){
        document.getElementById(event.target.id).value = 100;
      }
      this.pp_space_opacity = parseFloat(document.getElementById(event.target.id).value) / 100;

      planeRG_material.opacity = this.pp_space_opacity;
      planeBG_material.opacity = this.pp_space_opacity;
      planeBR_material.opacity = this.pp_space_opacity;
      planeRG255_material.opacity = this.pp_space_opacity;
      planeBG255_material.opacity = this.pp_space_opacity;
      planeBR255_material.opacity = this.pp_space_opacity;
}*/
