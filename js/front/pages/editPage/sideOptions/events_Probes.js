function initProbePage(){

  if(globalCMS1.getProbeLength()==0){

    document.getElementById("id_EditPage_generateProbeSet").style.display="block";
    document.getElementById("id_EditPage_editProbe").style.display="none";

    changeProbeType(2)

    document.getElementById("id_editPage_ProbeSpace_Value").checked = true;
    document.getElementById("id_EditPage_FunctionOneSided_Label1").innerHTML = "Value 100% to 0%";
    document.getElementById("id_EditPage_FunctionOneSided_Label2").innerHTML = "Value 0% to 100%";

  }
  else{
    document.getElementById("id_EditPage_editProbe").style.display="block";
    document.getElementById("id_EditPage_generateProbeSet").style.display="none";
  }

}


function drawProbePreview(){

}


///////////////////////////////////////////////////////
////////////// Generate Probe Set
///////////////////////////////////////////////////////

function addProbe(){

}

function generateProbe(){


  drawProbePreview();
}



function changeProbeType(type){

  document.getElementById("id_EditPage_selectProbeSubTypeLabel").style.visibility="visible";
  document.getElementById("id_EditPage_ProbeType_Constant").style.background = 'none';
  document.getElementById("id_EditPage_ProbeType_Gradient").style.background = 'none';
  document.getElementById("id_EditPage_ProbeType_Contour").style.background = 'none';

  document.getElementById("id_EditPage_ProbeSubType_TwoSide").style.display = 'none';

  document.getElementById("id_editPage_ProbeSpace_Lightness").disabled = false;
  document.getElementById("id_editPage_ProbeSpace_Lightness_Label").style.color = 'black';

  // options
  document.getElementById("id_EditPage_ProbeValue_Div").style.display = 'none';
  document.getElementById("id_EditPage_ProbeFunction_Div").style.display = 'none';

  switch (type) {
    case 0:
        document.getElementById("id_EditPage_selectProbeSubTypeLabel").style.visibility="hidden";
        document.getElementById("id_EditPage_ProbeType_Constant").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeTypeLabel").innerHTML="&#9660; Constant";
        document.getElementById("id_EditPage_ProbeValue_Div").style.display = 'flex';
        generateProbe();
      break;
    case 1:
        document.getElementById("id_EditPage_ProbeType_Gradient").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeTypeLabel").innerHTML="&#9660; Gradient";
        document.getElementById("id_EditPage_ProbeFunction_Div").style.display = 'flex';
        changeProbeSubType(0);
      break;
    case 2:
        document.getElementById("id_EditPage_ProbeType_Contour").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeTypeLabel").innerHTML="&#9660; Contour";
        document.getElementById("id_EditPage_ProbeFunction_Div").style.display = 'flex';
        document.getElementById("id_EditPage_ProbeSubType_TwoSide").style.display = 'flex';
        changeProbeSubType(0);
      break;
    default:

  }

  document.getElementById("id_EditPage_selectProbeTypeDropDown").style.display="none";
}

function changeProbeSubType(type){

  document.getElementById("id_EditPage_ProbeSubType_TwoSide").style.background = 'none';
  document.getElementById("id_EditPage_ProbeSubType_OneSide").style.background = 'none';

  document.getElementById("id_EditPage_ProbeFunctionOneSided_Div").style.display = 'none';
  document.getElementById("id_EditPage_ProbeFunctionTwoSided_Div").style.display = 'none';

  document.getElementById("id_editPage_ProbeSpace_Lightness").disabled = false;
  document.getElementById("id_editPage_ProbeSpace_Lightness_Label").style.color = 'black';


  switch (type) {
    case 0:
        document.getElementById("id_EditPage_ProbeSubType_OneSide").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeSubTypeLabel").innerHTML="&#9660; One Sided";
        document.getElementById("id_EditPage_ProbeFunctionOneSided_Div").style.display = 'flex';
        changeOneSideFunction(1);
      break;
    case 1:
        document.getElementById("id_EditPage_ProbeSubType_TwoSide").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeSubTypeLabel").innerHTML="&#9660; Two Sided";
        document.getElementById("id_EditPage_ProbeFunctionTwoSided_Div").style.display = 'block';
        document.getElementById("id_editPage_ProbeSpace_Lightness").disabled = true;
        document.getElementById("id_editPage_ProbeSpace_Lightness_Label").style.color = 'grey';
        document.getElementById("id_editPage_ProbeSpace_Value").checked = true;
        document.getElementById("id_EditPage_FunctionOneSided_Label1").innerHTML = "Value 100% to 0%";
        document.getElementById("id_EditPage_FunctionOneSided_Label2").innerHTML = "Value 0% to 100%";
        changeTwoSideFunction(0);
      break;
    default:

  }

  document.getElementById("id_EditPage_selectProbeSubTypeDropDown").style.display="none";

}

function changeProbeSpace(){
  if(document.getElementById("id_editPage_ProbeSpace_Value").checked){
    document.getElementById("id_EditPage_FunctionOneSided_Label1").innerHTML = "Value 100% to 0%";
    document.getElementById("id_EditPage_FunctionOneSided_Label2").innerHTML = "Value 0% to 100%";
  }
  else{
    document.getElementById("id_EditPage_FunctionOneSided_Label1").innerHTML = "Lightness 100% to 0%";
    document.getElementById("id_EditPage_FunctionOneSided_Label2").innerHTML = "Lightness 0% to 100%";
  }
  generateProbe();
}

function changeOneSideFunction(type){

  document.getElementById("id_EditPage_FunctionOneSided_Selection1").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_FunctionOneSided_Selection2").style.background = 'rgb(220,220,220)';

  switch (type){
    case 0:
        document.getElementById("id_EditPage_FunctionOneSided_Selection1").style.background="rgb(76, 175, 80)";
      break;
    case 1:
        document.getElementById("id_EditPage_FunctionOneSided_Selection2").style.background="rgb(76, 175, 80)";
      break;
    default:

  }

  generateProbe();
}

function changeTwoSideFunction(type){

  document.getElementById("id_EditPage_FunctionTwoSided_Selection0").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_FunctionTwoSided_Selection1").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_FunctionTwoSided_Selection2").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_FunctionTwoSided_Selection3").style.background = 'rgb(220,220,220)';

  switch (type){
    case 0:
        document.getElementById("id_EditPage_FunctionTwoSided_Selection0").style.background="rgb(76, 175, 80)";
      break;
    case 1:
        document.getElementById("id_EditPage_FunctionTwoSided_Selection1").style.background="rgb(76, 175, 80)";
      break;
    case 2:
        document.getElementById("id_EditPage_FunctionTwoSided_Selection2").style.background="rgb(76, 175, 80)";
    break;
    case 3:
        document.getElementById("id_EditPage_FunctionTwoSided_Selection3").style.background="rgb(76, 175, 80)";
    break;
    default:

  }

  generateProbe();
}


///////////////////////////////////////////////////////
////////////// Edit Probe Set
///////////////////////////////////////////////////////
