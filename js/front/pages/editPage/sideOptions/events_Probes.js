function initProbePage(){

  if(globalCMS1.getProbeSetLength()==0){

    initProbeGeneration();

  }
  else{
    init_editProbe();


  }

}

function initProbeGeneration(){
  document.getElementById("id_EditPage_generateProbeSet").style.display="block";
  document.getElementById("id_EditPage_editProbe").style.display="none";

  if(globalCMS1.getKeyLength()>0){
    document.getElementById("id_inputSingleProbeRangeStart").value = globalCMS1.getRefPosition(0) + (globalCMS1.getRefRange()/6*2);
    document.getElementById("id_inputSingleProbeRangeEnd").value = globalCMS1.getRefPosition(0) + (globalCMS1.getRefRange()/6*4);

    document.getElementById("id_inputProbeIntervalStart").value = globalCMS1.getRefPosition(0) + (globalCMS1.getRefRange()/4);
    document.getElementById("id_inputProbeDistance").value = globalCMS1.getRefRange()/10;
    document.getElementById("id_inputProbeIntervalLength").value = globalCMS1.getRefPosition(0) + (globalCMS1.getRefRange()/4);
    document.getElementById("id_inputNumberIntervalAuto").value = 2;

    document.getElementById("id_inputCustomProbeRanges").value =
    (globalCMS1.getRefPosition(0) + (globalCMS1.getRefRange()/10*2))+","+(globalCMS1.getRefPosition(0) + (globalCMS1.getRefRange()/10*3))+";"
    +(globalCMS1.getRefPosition(0) + (globalCMS1.getRefRange()/10*6))+","+(globalCMS1.getRefPosition(0) + (globalCMS1.getRefRange()/10*7))+";";
  }
  else{
    document.getElementById("id_inputSingleProbeRangeStart").value = 0;
    document.getElementById("id_inputSingleProbeRangeEnd").value = 1;

    document.getElementById("id_inputProbeIntervalStart").value = 0.2;
    document.getElementById("id_inputProbeDistance").value = 0.2;
    document.getElementById("id_inputProbeIntervalLength").value = 0.15;
    document.getElementById("id_inputNumberIntervalAuto").value = 2;

    document.getElementById("id_inputCustomProbeRanges").value = "0.0,0.2;0.4,0.9;";
  }



  document.getElementById("id_editPage_ProbeSpace_Value").checked = true;
  document.getElementById("id_EditPage_FunctionOneSided_Label1").innerHTML = "Value 100% to 0%";
  document.getElementById("id_EditPage_FunctionOneSided_Label2").innerHTML = "Value 0% to 100%";

  globalProbeColor.set1Value(0);
  globalProbeColor.set2Value(0);
  globalProbeColor.set3Value(1.0);

  document.getElementById("id_probe_GenerationName").value = "New Probe";

  globalProbeSet.setProbeSetName(document.getElementById("id_probe_GenerationName").value);

  changeRangeGeneration(0);
  changeProbeType(2);
}


function drawProbePreview(probeSet){

    if(globalCMS1.getKeyLength()!=0){
      document.getElementById("id_EditPage_ProbePreviewLabel").style.visibility = "visible";
      document.getElementById("id_EditPage_ProbePreview").style.visibility = "visible";

      var tmpCMS = probeSet.generateProbeCMS(globalCMS1);

      drawCanvasColormap("id_EditPage_ProbePreview", tmpCMS);
    }
    else{
      document.getElementById("id_EditPage_ProbePreviewLabel").style.visibility = "hidden";
      document.getElementById("id_EditPage_ProbePreview").style.visibility = "hidden";
    }

}

function changeProbeType(type){

  document.getElementById("id_EditPage_selectProbeSubTypeLabel").style.visibility="visible";
  document.getElementById("id_EditPage_ProbeType_Constant").style.background = 'none';
  document.getElementById("id_EditPage_ProbeType_Gradient").style.background = 'none';
  document.getElementById("id_EditPage_ProbeType_Contour").style.background = 'none';

  document.getElementById("id_EditPage_ProbeSubType_TwoSide").style.display = 'none';


  //document.getElementById("id_editPage_ProbeSpace_Lightness").disabled = false;
  //document.getElementById("id_editPage_ProbeSpace_Lightness_Label").style.color = 'black';


  ///////////////////////////////////////////////////////////////////
  document.getElementById("id_EditPage_editProbeSubTypeLabel").style.visibility="visible";
  document.getElementById("id_EditPage_editProbeType_Constant").style.background = 'none';
  document.getElementById("id_EditPage_editProbeType_Gradient").style.background = 'none';
  document.getElementById("id_EditPage_editProbeType_Contour").style.background = 'none';

  // options
  document.getElementById("id_EditPage_editProbeColor_Div").style.display = 'none';
  document.getElementById("id_EditPage_editProbeFunction_Div").style.display = 'none';
  globalProbeType =type;
  switch (type) {
    case 0:
        document.getElementById("id_EditPage_editProbeSubTypeLabel").style.visibility="hidden";
        document.getElementById("id_EditPage_editProbeType_Constant").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeTypeLabel").innerHTML="&#9660; Constant";
        document.getElementById("id_EditPage_editProbeColor_Div").style.display = 'flex';

        document.getElementById("id_EditPage_selectProbeSubTypeLabel").style.visibility="hidden";
        document.getElementById("id_EditPage_ProbeType_Constant").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeTypeLabel").innerHTML="&#9660; Constant";
        document.getElementById("id_EditPage_ProbeColor_Div").style.display = 'flex';

        generateProbeSet();
        changeProbeColor();
      break;
    case 1:
        document.getElementById("id_EditPage_editProbeType_Gradient").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeTypeLabel").innerHTML="&#9660; Gradient";
        document.getElementById("id_EditPage_editProbeFunction_Div").style.display = 'flex';
        document.getElementById("id_EditPage_editProbeColor_Div").style.display = 'flex';

        document.getElementById("id_EditPage_ProbeType_Gradient").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeTypeLabel").innerHTML="&#9660; Gradient";
        document.getElementById("id_EditPage_ProbeFunction_Div").style.display = 'flex';
        document.getElementById("id_EditPage_ProbeColor_Div").style.display = 'flex';
        //document.getElementById("id_EditPage_ProbeSubType_TwoSide").style.display = 'flex';

        /*if(document.getElementById("id_EditPage_generateProbeSet").style.display=="none" && document.getElementById("id_selectProbeList").selectedIndex!=)
          if(globalCMS1.getProbe(document.getElementById("id_selectProbeSetList").selectedIndex,document.getElementById("id_selectProbeList").selectedIndex-1).getIsTwoSided())
            changeProbeSubType(1);
          else
            changeProbeSubType(0);
        else*/
          changeProbeSubType(0);
      break;
    case 2:
        document.getElementById("id_EditPage_editProbeType_Contour").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeTypeLabel").innerHTML="&#9660; Contour";
        document.getElementById("id_EditPage_editProbeFunction_Div").style.display = 'flex';
        document.getElementById("id_EditPage_editProbeSubType_TwoSide").style.display = 'flex';

        document.getElementById("id_EditPage_ProbeType_Contour").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeTypeLabel").innerHTML="&#9660; Contour";
        document.getElementById("id_EditPage_ProbeFunction_Div").style.display = 'flex';
        document.getElementById("id_EditPage_ProbeSubType_TwoSide").style.display = 'flex';
          if(document.getElementById("id_EditPage_generateProbeSet").style.display=="none" && document.getElementById("id_selectProbeList").selectedIndex!=)
            if(globalCMS1.getProbe(document.getElementById("id_selectProbeSetList").selectedIndex,document.getElementById("id_selectProbeList").selectedIndex-1).getIsTwoSided())
              changeProbeSubType(1);
            else
              changeProbeSubType(0);
          else
            changeProbeSubType(0);
      break;
    default:

  }

  document.getElementById("id_EditPage_selectProbeTypeDropDown").style.display="none";
  document.getElementById("id_EditPage_editProbeTypeDropDown").style.display="none";
}

function changeProbeSubType(type){
  globalProbeSubtype=type;
  document.getElementById("id_EditPage_ProbeSubType_TwoSide").style.background = 'none';
  document.getElementById("id_EditPage_ProbeSubType_OneSide").style.background = 'none';

  document.getElementById("id_EditPage_ProbeFunctionOneSided_Div").style.display = 'none';
  document.getElementById("id_EditPage_ProbeFunctionTwoSided_Div").style.display = 'none';

  document.getElementById("id_editPage_ProbeSpace_Lightness").disabled = false;
  document.getElementById("id_editPage_ProbeSpace_Lightness_Label").style.color = 'black';

  /////// edit probe page
  document.getElementById("id_EditPage_editProbeSubType_TwoSide").style.background = 'none';
  document.getElementById("id_EditPage_editProbeSubType_OneSide").style.background = 'none';

  document.getElementById("id_EditPage_editProbeFunctionOneSided_Div").style.display = 'none';
  document.getElementById("id_EditPage_editProbeFunctionTwoSided_Div").style.display = 'none';


  switch (type) {
    case 0:
        document.getElementById("id_EditPage_editProbeSubType_OneSide").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeSubTypeLabel").innerHTML="&#9660; One Sided";
        document.getElementById("id_EditPage_editProbeFunctionOneSided_Div").style.display = 'flex';

        document.getElementById("id_EditPage_ProbeSubType_OneSide").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeSubTypeLabel").innerHTML="&#9660; One Sided";
        document.getElementById("id_EditPage_ProbeFunctionOneSided_Div").style.display = 'flex';

        if(document.getElementById("id_EditPage_generateProbeSet").style.display=="none" && document.getElementById("id_selectProbeList").selectedIndex!=0)
            changeOneSideFunction(globalCMS1.getProbe(document.getElementById("id_selectProbeSetList").selectedIndex,document.getElementById("id_selectProbeList").selectedIndex-1).getTwoSidedType());
        else
            changeOneSideFunction(1);
      break;
    case 1:
        document.getElementById("id_EditPage_editProbeSubType_TwoSide").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeSubTypeLabel").innerHTML="&#9660; Two Sided";
        document.getElementById("id_EditPage_editProbeFunctionTwoSided_Div").style.display = 'block';

        document.getElementById("id_EditPage_ProbeSubType_TwoSide").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeSubTypeLabel").innerHTML="&#9660; Two Sided";
        document.getElementById("id_EditPage_ProbeFunctionTwoSided_Div").style.display = 'block';
        if(document.getElementById("id_EditPage_generateProbeSet").style.display=="none" && document.getElementById("id_selectProbeList").selectedIndex!=0)
            changeTwoSideFunction(globalCMS1.getProbe(document.getElementById("id_selectProbeSetList").selectedIndex,document.getElementById("id_selectProbeList").selectedIndex-1).getTwoSidedType());
        else
            changeTwoSideFunction(0);
      break;
    default:

  }

  document.getElementById("id_EditPage_selectProbeSubTypeDropDown").style.display="none";
  document.getElementById("id_EditPage_editProbeSubTypeDropDown").style.display="none";

}

function changeProbeSpace(){
  if(document.getElementById("id_editPage_ProbeSpace_Value").checked){
    globalProbeSpace="hsv";
    document.getElementById("id_EditPage_FunctionOneSided_Label1").innerHTML = "Value 100% to 0%";
    document.getElementById("id_EditPage_FunctionOneSided_Label2").innerHTML = "Value 0% to 100%";
  }
  else{
    globalProbeSpace="lab";
    document.getElementById("id_EditPage_FunctionOneSided_Label1").innerHTML = "Lightness 100% to 0%";
    document.getElementById("id_EditPage_FunctionOneSided_Label2").innerHTML = "Lightness 0% to 100%";
  }
  generateProbeSet();
}

function changeOneSideFunction(type){

  document.getElementById("id_EditPage_FunctionOneSided_Selection1").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_FunctionOneSided_Selection2").style.background = 'rgb(220,220,220)';

  document.getElementById("id_EditPage_editFunctionOneSided_Selection1").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_editFunctionOneSided_Selection2").style.background = 'rgb(220,220,220)';
  globalProbeSubtypeIndex = type;
  switch (type){
    case 0:
        document.getElementById("id_EditPage_FunctionOneSided_Selection1").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editFunctionOneSided_Selection1").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeFunction_ValLabel").innerHTML="Value (0%,100%)";
        document.getElementById("id_EditPage_editProbeFunction_SatLabel").innerHTML="Saturation /";
      break;
    case 1:
        document.getElementById("id_EditPage_FunctionOneSided_Selection2").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editFunctionOneSided_Selection2").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeFunction_ValLabel").innerHTML="Value (100%,0%)";
        document.getElementById("id_EditPage_editProbeFunction_SatLabel").innerHTML="Saturation /";
      break;
    default:

  }

  document.getElementById("id_EditPage_editProbeFunctionDropDown").style.display="none";

  if(globalProbeType==1){ // -> gradient
    changeProbeColor();
  }

  generateProbeSet();
}

function changeTwoSideFunction(type){
  globalProbeSubtypeIndex = type;
  document.getElementById("id_EditPage_FunctionTwoSided_Selection0").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_FunctionTwoSided_Selection1").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_FunctionTwoSided_Selection2").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_FunctionTwoSided_Selection3").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_FunctionTwoSided_Selection4").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_FunctionTwoSided_Selection5").style.background = 'rgb(220,220,220)';

  document.getElementById("id_EditPage_editFunctionTwoSided_Selection0").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_editFunctionTwoSided_Selection1").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_editFunctionTwoSided_Selection2").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_editFunctionTwoSided_Selection3").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_editFunctionTwoSided_Selection4").style.background = 'rgb(220,220,220)';
  document.getElementById("id_EditPage_editFunctionTwoSided_Selection5").style.background = 'rgb(220,220,220)';

  switch (type){
    case 0:
        document.getElementById("id_EditPage_FunctionTwoSided_Selection0").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editFunctionTwoSided_Selection0").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeFunction_ValLabel").innerHTML="Value (0%,100%)";
        document.getElementById("id_EditPage_editProbeFunction_SatLabel").innerHTML="Saturation (0%,100%,0%)";
      break;
    case 1:
        document.getElementById("id_EditPage_FunctionTwoSided_Selection1").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editFunctionTwoSided_Selection1").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeFunction_ValLabel").innerHTML="Value (100%,0%)";
        document.getElementById("id_EditPage_editProbeFunction_SatLabel").innerHTML="Saturation (0%,100%,0%)";
      break;
    case 2:
        document.getElementById("id_EditPage_FunctionTwoSided_Selection2").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editFunctionTwoSided_Selection2").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeFunction_ValLabel").innerHTML="Value (100%,0%,100%)";
        document.getElementById("id_EditPage_editProbeFunction_SatLabel").innerHTML="Saturation (0%,100%)";
    break;
    case 3:
        document.getElementById("id_EditPage_FunctionTwoSided_Selection3").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editFunctionTwoSided_Selection3").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeFunction_ValLabel").innerHTML="Value (100%,0%,100%)";
        document.getElementById("id_EditPage_editProbeFunction_SatLabel").innerHTML="Saturation (100%,0%)";
    break;
    case 4:
        document.getElementById("id_EditPage_FunctionTwoSided_Selection4").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editFunctionTwoSided_Selection4").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeFunction_ValLabel").innerHTML="Value (0%,100%,0%)";
        document.getElementById("id_EditPage_editProbeFunction_SatLabel").innerHTML="Saturation (0%,100%)";
    break;
    case 5:
        document.getElementById("id_EditPage_FunctionTwoSided_Selection5").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editFunctionTwoSided_Selection5").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_editProbeFunction_ValLabel").innerHTML="Value (0%,100%,0%)";
        document.getElementById("id_EditPage_editProbeFunction_SatLabel").innerHTML="Saturation (100%,0%)";
    break;
    default:

  }

  document.getElementById("id_EditPage_editProbeFunctionDropDown").style.display="none";

  generateProbeSet();
}


function changeProbeColor(){
  document.getElementById("id_inputProbeColor").style.background = globalProbeColor.calcRGBColor().getRGBString();
  document.getElementById("id_inputEditProbeColor").style.background = globalProbeColor.calcRGBColor().getRGBString();

  if(document.getElementById("id_EditPage_generateProbeSet").style.display=="none")
    changeColorPreview("id_inputEditProbeColorPreview");
  else
    changeColorPreview("id_inputProbeColorPreview");
}


function changeColorPreview(id){
  var canvasObject = document.getElementById(id);
  var canvasRect = canvasObject.getBoundingClientRect();

  canvasObject.width = canvasRect.width;
  canvasObject.height = 1;

  var canvasContex = canvasObject.getContext("2d");
  var canvasData = canvasContex.getImageData(0, 0, canvasObject.width, canvasObject.height);

  if(globalProbeType==0){
    canvasData = createConstantBand(canvasData, 0, canvasObject.width, 1, globalProbeColor, canvasObject.width);
  }
  else{

    var oldinterpolationSpace = globalCMS1.getInterpolationSpace();
    globalCMS1.setInterpolationSpace("hsv");
    var tmpHSV1= new classColor_HSV(globalProbeColor.get1Value(),globalProbeColor.get2Value(),globalProbeColor.get3Value());
    var tmpHSV2= new classColor_HSV(globalProbeColor.get1Value(),globalProbeColor.get2Value(),globalProbeColor.get3Value());

    switch (globalProbeSubtypeIndex) {
      case 0:
          tmpHSV1.set3Value(1.0);
          tmpHSV2.set3Value(0);

        break;
        case 1:
          tmpHSV1.set3Value(0);
          tmpHSV2.set3Value(1.0);
        break;
      default:

    }

    canvasData = createScaledBand(canvasData, 0, canvasObject.width, 1, tmpHSV1,tmpHSV2, canvasObject.width);
    globalCMS1.setInterpolationSpace(oldinterpolationSpace);

  }

  canvasContex.putImageData(canvasData, 0, 0);
}
