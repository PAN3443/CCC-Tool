///////////////////////////////////////////////////////
////////////// Generate Probe Set
///////////////////////////////////////////////////////

function changeGenerationProbeName(){
  globalProbeSet.setProbeSetName(document.getElementById("id_probe_GenerationName").value);
}

function addProbeToCMS(){
  globalCMS1.addProbeSet(cloneProbeSet(globalProbeSet));
  document.getElementById("id_PopUp_GenerateProbeSetWindow").style.display = "none";
  init_editProbe();
  closeColorPicker();
}

function closeProbeGeneration(){
  document.getElementById("id_PopUp_GenerateProbeSetWindow").style.display = "none";
  init_editProbe();
  closeColorPicker();
}




function checkKeyCustomRangeInput(){

  document.getElementById("id_EditPage_ProbePreviewLabel").style.visibility = "visible";
  document.getElementById("id_EditPage_ProbePreview").style.visibility = "visible";

  if(checkProbeInputVal("id_inputCustomProbeRanges", true)){
      generateProbeSet();
      return;
  }

  document.getElementById("id_EditPage_ProbePreviewLabel").style.visibility = "hidden";
  document.getElementById("id_EditPage_ProbePreview").style.visibility = "hidden";

  /*switch (event.type) {
    case "keyup":
      if (event.keyCode == 13) {
        if(checkProbeInputVal("id_inputCustomProbeRanges", true);
        generateProbeSet();
      }
      else{
        checkProbeInputVal("id_inputCustomProbeRanges", false);
      }
      break;
    case "change":
      if(checkProbeInputVal("id_inputCustomProbeRanges", true)){
        generateProbeSet();
      }
    break;
    default:

  }*/

}


function createProbe(start,end){
  var newProbe = new class_Probe(globalProbeType, start, end , globalProbeSpace);

  newProbe.setFunctionType(globalProbeSubtypeIndex);
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


           if( isNaN(startVal) || startVal==undefined){
             openAlert("The input value for the probe start is not correct!"); console.log(document.getElementById("id_inputProbeIntervalStart").value);
             return;
           }

           var intervalLength = parseFloat(document.getElementById("id_inputProbeIntervalLength").value);
           if(isNaN(intervalLength) || intervalLength==undefined){
             openAlert("The input value for the probe width is not correct!"); console.log(document.getElementById("id_inputProbeIntervalLength").value);
             return;
           }

           if(intervalLength<=0){
             openAlert("The input value for the number of probes has to be bigger as null!");
             return;
           }

           var distanceLength = parseFloat(document.getElementById("id_inputProbeDistance").value);
           if(isNaN(distanceLength) || distanceLength==undefined){
             openAlert("The input value for the distance is not correct!"); console.log(document.getElementById("id_inputProbeDistance").value);
             return;
           }
           if(distanceLength<0){
             openAlert("The input value for the number of probes has to be positive or null!");
             return;
           }

           var numberOfSteps =parseInt(document.getElementById("id_inputNumberIntervalAuto").value);
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

             var content = document.getElementById("id_inputCustomProbeRanges").value;

             // to give the user a better overview, we allow new lines and spaces at the input field and remove them now
             for(var i=content.length-1; i>=0; i--){

                 switch(content[i]) {
                     case " ":
                     case "\n":
                     case "\t":
                     case "\r":
                       if(i==0){
                           content = content.slice(i+1);
                       }
                       else{
                         if(i==content.length-1){
                             content = content.slice(0, i);
                         }
                         else{
                             content = content.slice(0, i) + content.slice(i+1);
                         }
                       }
                     break;
                     default:
                     // do nothing

                  }
              }

               var ranges = content.split(";");

               for (var i = 0; i < ranges.length; i++) {
                 var range = ranges[i].split(",");

                 if(range.length==2){

                   var start =parseFloat(range[0]);
                   var end = parseFloat(range[1]);

                   if(end>start)
                   globalProbeSet.addProbe(createProbe(start,end));
                 }
               }
               break;
       default:
       return;

     }

     drawProbePreview(globalProbeSet);




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
        document.getElementById("id_EditPage_ProbeSetRangeType_Single").style.background=getComputedStyle(document.documentElement).getPropertyValue('--general-active-color');
        document.getElementById("id_EditPage_selectProbeSetRangeType").innerHTML="&#9660; Single";
        document.getElementById("id_EditPage_SingleProbeOptions").style.display = 'block';
        generateProbeSet();
      break;
    case 1:
        document.getElementById("id_EditPage_ProbeSetRangeType_Interval").style.background=getComputedStyle(document.documentElement).getPropertyValue('--general-active-color');
        document.getElementById("id_EditPage_selectProbeSetRangeType").innerHTML="&#9660; Interval";
        document.getElementById("id_EditPage_IntervalProbeOptions").style.display = 'block';
        generateProbeSet();
      break;
    case 2:
        document.getElementById("id_EditPage_ProbeSetRangeType_Custom").style.background=getComputedStyle(document.documentElement).getPropertyValue('--general-active-color');
        document.getElementById("id_EditPage_selectProbeSetRangeType").innerHTML="&#9660; Custom";
        document.getElementById("id_EditPage_CustomProbeOptions").style.display = 'block';
        checkKeyCustomRangeInput();
    break;
    default:

  }

  document.getElementById("id_EditPage_selectProbeSetRangeTypeDropDown").style.display="none";


}
