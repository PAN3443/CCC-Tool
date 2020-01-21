
function pp_3D_mousemove(event){
  // calc mouse pos
  switch (event.target.parentElement.id) {
    case editSection.part_Pathplot.partDivID+"_PP_3D":
      var rect = document.getElementById(editSection.part_Pathplot.partDivID+"_PP_3D").getBoundingClientRect();
      editSection.part_Pathplot.mousePosX = event.clientX - rect.left;
      editSection.part_Pathplot.mousePosY = event.clientY - rect.top;
      if(editSection.part_Pathplot.pp_dorotation){
          editSection.part_Pathplot.pp_xRotationAngle = editSection.pp_xRotationDownAngle + ( editSection.part_Pathplot.mousePosX - editSection.part_Pathplot.pp_downXPos ) * 0.02;
          editSection.part_Pathplot.pp_yRotationAngle = editSection.pp_yRotationDownAngle + ( editSection.part_Pathplot.mousePosY - editSection.part_Pathplot.pp_downYPos ) * 0.02;
      }
    break;
    case optiSection.part_Pathplot.partDivID+"_PP_3D":
      var rect = document.getElementById(optiSection.part_Pathplot.partDivID+"_PP_3D").getBoundingClientRect();
      optiSection.part_Pathplot.mousePosX = event.clientX - rect.left;
      optiSection.part_Pathplot.mousePosY = event.clientY - rect.top;
      if(optiSection.part_Pathplot.pp_dorotation){
          optiSection.part_Pathplot.pp_xRotationAngle = optiSection.pp_xRotationDownAngle + ( optiSection.part_Pathplot.mousePosX - optiSection.part_Pathplot.pp_downXPos ) * 0.02;
          optiSection.part_Pathplot.pp_yRotationAngle = optiSection.pp_yRotationDownAngle + ( optiSection.part_Pathplot.mousePosY - optiSection.part_Pathplot.pp_downYPos ) * 0.02;
      }
    break;
  }
}

function pp_3D_mouseleave(event){
  switch (event.target.id) {
    case editSection.part_Pathplot.partDivID+"_PP_3D":
      editSection.part_Pathplot.pp_dorotation=false;
    break;
    case optiSection.part_Pathplot.partDivID+"_PP_3D":
      optiSection.part_Pathplot.pp_dorotation=false;
    break;
  }
}

function pp_3D_mousedown(event){
  switch (event.target.parentElement.id) {
    case editSection.part_Pathplot.partDivID+"_PP_3D":
      editSection.part_Pathplot.pp_dorotation=true;
      editSection.part_Pathplot.pp_downXPos = editSection.part_Pathplot.mousePosX;
      editSection.part_Pathplot.pp_downYPos = editSection.part_Pathplot.mousePosY;

      editSection.pp_xRotationDownAngle=editSection.part_Pathplot.pp_xRotationAngle; //Math.PI/2;
      editSection.pp_yRotationDownAngle=editSection.part_Pathplot.pp_yRotationAngle;
    break;
    case optiSection.part_Pathplot.partDivID+"_PP_3D":
      optiSection.part_Pathplot.pp_dorotation=true;
      optiSection.part_Pathplot.pp_downXPos = optiSection.part_Pathplot.mousePosX;
      optiSection.part_Pathplot.pp_downYPos = optiSection.part_Pathplot.mousePosY;

      optiSection.pp_xRotationDownAngle=optiSection.part_Pathplot.pp_xRotationAngle; //Math.PI/2;
      optiSection.pp_yRotationDownAngle=optiSection.part_Pathplot.pp_yRotationAngle;
    break;
  }
}

function pp_3D_mouseup(event){
  switch (event.target.parentElement.id) {
    case editSection.part_Pathplot.partDivID+"_PP_3D":
      editSection.part_Pathplot.pp_dorotation=false;
    break;
    case optiSection.part_Pathplot.partDivID+"_PP_3D":
      optiSection.part_Pathplot.pp_dorotation=false;
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
