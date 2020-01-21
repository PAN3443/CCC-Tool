
function pp_3D_mousemove(event){
  // calc mouse pos
  switch (event.target.parentElement.id) {
    case editSection.sectionID+"_PP_3D":
      var rect = document.getElementById(editSection.sectionID+"_PP_3D").getBoundingClientRect();
      editSection.mousePosX = event.clientX - rect.left;
      editSection.mousePosY = event.clientY - rect.top;
      if(editSection.pp_dorotation){
          editSection.pp_xRotationAngle = editSection.pp_xRotationDownAngle + ( editSection.mousePosX - editSection.pp_downXPos ) * 0.02;
          editSection.pp_yRotationAngle = editSection.pp_yRotationDownAngle + ( editSection.mousePosY - editSection.pp_downYPos ) * 0.02;
      }
    break;
    case optiSection.sectionID+"_PP_3D":
      var rect = document.getElementById(optiSection.sectionID+"_PP_3D").getBoundingClientRect();
      optiSection.mousePosX = event.clientX - rect.left;
      optiSection.mousePosY = event.clientY - rect.top;
      if(optiSection.pp_dorotation){
          optiSection.pp_xRotationAngle = optiSection.pp_xRotationDownAngle + ( optiSection.mousePosX - optiSection.pp_downXPos ) * 0.02;
          optiSection.pp_yRotationAngle = optiSection.pp_yRotationDownAngle + ( optiSection.mousePosY - optiSection.pp_downYPos ) * 0.02;
      }
    break;
  }
}

function pp_3D_mouseleave(event){
  switch (event.target.id) {
    case editSection.sectionID+"_PP_3D":
      editSection.pp_dorotation=false;
    break;
    case optiSection.sectionID+"_PP_3D":
      optiSection.pp_dorotation=false;
    break;
  }
}

function pp_3D_mousedown(event){
  switch (event.target.parentElement.id) {
    case editSection.sectionID+"_PP_3D":
      editSection.pp_dorotation=true;
      editSection.pp_downXPos = editSection.mousePosX;
      editSection.pp_downYPos = editSection.mousePosY;

      editSection.pp_xRotationDownAngle=editSection.pp_xRotationAngle; //Math.PI/2;
      editSection.pp_yRotationDownAngle=editSection.pp_yRotationAngle;
    break;
    case optiSection.sectionID+"_PP_3D":
      optiSection.pp_dorotation=true;
      optiSection.pp_downXPos = optiSection.mousePosX;
      optiSection.pp_downYPos = optiSection.mousePosY;

      optiSection.pp_xRotationDownAngle=optiSection.pp_xRotationAngle; //Math.PI/2;
      optiSection.pp_yRotationDownAngle=optiSection.pp_yRotationAngle;
    break;
  }
}

function pp_3D_mouseup(event){
  switch (event.target.parentElement.id) {
    case editSection.sectionID+"_PP_3D":
      editSection.pp_dorotation=false;
    break;
    case optiSection.sectionID+"_PP_3D":
      optiSection.pp_dorotation=false;
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
