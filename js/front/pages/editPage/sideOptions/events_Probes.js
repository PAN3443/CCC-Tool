function initProbePage(){

  if(globalCMS1.getProbeSetLength()==0){

    document.getElementById("id_EditPage_generateProbeSet").style.display="block";
    document.getElementById("id_EditPage_editProbe").style.display="none";

    changeRangeGeneration(0);
    changeProbeType(2);


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

    globalProbeSet.setProbeSetName("new Probe");

  }
  else{
    document.getElementById("id_EditPage_editProbe").style.display="block";
    document.getElementById("id_EditPage_generateProbeSet").style.display="none";
  }

}


function drawProbePreview(){

    if(globalCMS1.getKeyLength()!=0){
      var tmpCMS = globalProbeSet.generateProbeCMS(globalCMS1);
      drawCanvasColormap("id_EditPage_ProbePreview", tmpCMS);
    }

}


///////////////////////////////////////////////////////
////////////// Generate Probe Set
///////////////////////////////////////////////////////

function addProbeToCMS(){

}


function createProbe(start,end){
  var newProbe = new class_Probe(globalProbeType, start, end , globalProbeSpace);

  if(globalProbeSubtype==0){
    // one-side
    newProbe.setIsTwoSided(false);
    newProbe.setOneSidedType(globalProbeSubtypeIndex);
  }
  else{
    // two sided
    newProbe.setIsTwoSided(true);
    newProbe.setTwoSidedType(globalProbeSubtypeIndex);
  }

  newProbe.setProbeColor(new classColor_HSV(globalProbeColor.get1Value(),globalProbeColor.get2Value(),globalProbeColor.get3Value()));

  return newProbe;
}

function generateProbeSet(){

  globalProbeSet.clear();

  switch (globalProbeRangeType) {
       case 0: // single

          var start = parseFloat(document.getElementById("id_inputSingleProbeRangeStart").value);
          var end = parseFloat(document.getElementById("id_inputSingleProbeRangeEnd").value);

          if(isNaN(start) || isNaN(end) || start==undefined || end==undefined){
            openAlert("The input value for the probe start and end position is not correct!");
            return;
          }

          if(start>end){
            openAlert("The the probe start position has to be smaller than the end position!");
            return;
          }

          globalProbeSet.addProbe(createProbe(start,end));

         break;
         case 1: // interval

           var startVal = parseFloat(document.getElementById("id_inputProbeIntervalStart").value);
           if(isNaN(startVal) || start==undefined){
             openAlert("The input value for the probe start is not correct!");
             return;
           }

           var intervalLength = parseFloat(document.getElementById("id_inputProbeIntervalLength").value);
           if(isNaN(intervalLength) || intervalLength==undefined){
             openAlert("The input value for the probe width is not correct!");
             return;
           }

           if(intervalLength<=0){
             openAlert("The input value for the number of probes has to be bigger as null!");
             return;
           }

           var distanceLength = parseFloat(document.getElementById("id_inputProbeDistance").value);
           if(isNaN(distanceLength) || distanceLength==undefined){
             openAlert("The input value for the distance is not correct!");
             return;
           }
           if(distanceLength<0){
             openAlert("The input value for the number of probes has to be positive or null!");
             return;
           }

           var numberOfSteps =  numberOfSteps=parseInt(document.getElementById("id_inputNumberIntervalAuto").value);
           if(isNaN(numberOfSteps) || numberOfSteps==undefined){
             openAlert("The input value for the number of probes is not correct!");
             return;
           }

           if(numberOfSteps<1){
             openAlert("The input value for the number of probes has to be at least one!");
             return;
           }


           var currentPos = startVal;

           for (var i = 0; i < numberOfSteps; i++) {
             var nextPos = currentPos+intervalLength;
             globalProbeSet.addProbe(createProbe(currentPos,nextPos));
             currentPos=nextPos+distanceLength;
           }

           break;
           case 2:

               var ranges = document.getElementById("id_inputCustomProbeRanges").value.split(";");

               for (var i = 0; i < ranges.length; i++) {
                 var range = ranges[i].split(",");

                 if(range.length==2){

                   var start =parseFloat(range[0]);
                   var end = parseFloat(range[1]);

                   if(end>start)
                   globalProbeSet.addProbe(createProbe(currentPos,nextPos));
                 }
               }
               break;
       default:
       return;

     }

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
  document.getElementById("id_EditPage_ProbeColor_Div").style.display = 'none';
  document.getElementById("id_EditPage_ProbeFunction_Div").style.display = 'none';
  globalProbeType =type;
  switch (type) {
    case 0:
        document.getElementById("id_EditPage_selectProbeSubTypeLabel").style.visibility="hidden";
        document.getElementById("id_EditPage_ProbeType_Constant").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeTypeLabel").innerHTML="&#9660; Constant";
        document.getElementById("id_EditPage_ProbeColor_Div").style.display = 'flex';
        generateProbeSet();
        changeProbeColor();
      break;
    case 1:
        document.getElementById("id_EditPage_ProbeType_Gradient").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeTypeLabel").innerHTML="&#9660; Gradient";
        document.getElementById("id_EditPage_ProbeFunction_Div").style.display = 'flex';
        document.getElementById("id_EditPage_ProbeColor_Div").style.display = 'flex';
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
  globalProbeSubtype=type;
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
  globalProbeSubtypeIndex = type;
  switch (type){
    case 0:
        document.getElementById("id_EditPage_FunctionOneSided_Selection1").style.background="rgb(76, 175, 80)";
      break;
    case 1:
        document.getElementById("id_EditPage_FunctionOneSided_Selection2").style.background="rgb(76, 175, 80)";
      break;
    default:

  }

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

  generateProbeSet();
}


function changeRangeGeneration(type){
  globalProbeRangeType = type;
  document.getElementById("id_EditPage_ProbeSetRangeType_Single").style.background = 'none';
  document.getElementById("id_EditPage_ProbeSetRangeType_Interval").style.background = 'none';
  document.getElementById("id_EditPage_ProbeSetRangeType_Custom").style.background = 'none';

  document.getElementById("id_EditPage_SingleProbeOptions").style.display = 'none';
  document.getElementById("id_EditPage_IntervalProbeOptions").style.display = 'none';
  document.getElementById("id_EditPage_CustomProbeOptions").style.display = 'none';

  switch (type){
    case 0:
        document.getElementById("id_EditPage_ProbeSetRangeType_Single").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeSetRangeType").innerHTML="&#9660; Single";
        document.getElementById("id_EditPage_SingleProbeOptions").style.display = 'block';
      break;
    case 1:
        document.getElementById("id_EditPage_ProbeSetRangeType_Interval").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeSetRangeType").innerHTML="&#9660; Interval";
        document.getElementById("id_EditPage_IntervalProbeOptions").style.display = 'block';
      break;
    case 2:
        document.getElementById("id_EditPage_ProbeSetRangeType_Custom").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_selectProbeSetRangeType").innerHTML="&#9660; Custom";
        document.getElementById("id_EditPage_CustomProbeOptions").style.display = 'block';
    break;
    default:

  }

  document.getElementById("id_EditPage_selectProbeSetRangeTypeDropDown").style.display="none";

  generateProbeSet();
}


function changeProbeColor(){



  var canvasObject = document.getElementById("id_inputProbeColorPreview");
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

///////////////////////////////////////////////////////
////////////// Edit Probe Set
///////////////////////////////////////////////////////
