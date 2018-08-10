function changeProbeSelection() {
  selectProbe(document.getElementById("id_selectProbeList").selectedIndex);
}

function updateProbeList() {

  var selectbox = document.getElementById("id_selectProbeList");
  for(var i = selectbox.options.length - 1 ; i > 0 ; i--)
  {
      selectbox.remove(i);
  }

  // fill startbox


  for (var i = 0; i < globalCMS1.getProbeLength(); i++) {

    var opt = document.createElement('option');

    var tmpProbe = globalCMS1.getProbe(i);
    var type="";

    switch (tmpProbe.getType()) {
      case 0:
        type="Gradient Probe";
        break;
      case 1:
        type="Contour Probe";
        break;
      default:

    }

    var functionType="";

    switch (tmpProbe.getFunction()) {
      case 0:
        type="linear";
        break;
      default:

    }

    opt.innerHTML = "Probe: "+(i+1)+"; Type: "+type+"; Function: "+functionType+";";
    opt.value = i;

    selectbox.appendChild(opt);
  }

}

function selectProbe(index) {


  // Proposal Probe Inputs
  //single
  document.getElementById("id_inputSingleProbeRangeStart").value=globalCMS1.getRefPosition(0);
  document.getElementById("id_inputSingleProbeRangeEnd").value=globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);
  //intervals
  document.getElementById("id_inputProbeIntervalLength").value=globalCMS1.getRefRange()/10;
  //auto interval
  document.getElementById("id_inputNumberIntervalAuto").value=100;
  //custom
  document.getElementById("id_inputCustomProbeRanges").value=globalCMS1.getRefPosition(0)+","+globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1)+";";


  if (index == 0) {
    document.getElementById("probeActionLabel").innerHTML = "Generate Probe";
    document.getElementById("id_selectProbeFunctionType").selectedIndex = 0;
    document.getElementById("id_selectProbeType").selectedIndex = 0;
    document.getElementById("id_selectProbeRangeType").selectedIndex = 0;
    document.getElementById("id_buttonRemoveProbe").style.display = "none";
    document.getElementById("id_divProbeRangesSingle").style.display = "block";
    document.getElementById("id_divProbeRangesInterval").style.display = "none";
    document.getElementById("id_divProbeRangesIntervalAuto").style.display = "none";
    document.getElementById("id_divProbeRangesCustom").style.display = "none";
    document.getElementById("id_divProbeNumberIntervalColros").style.display = "none";
    document.getElementById("id_buttonAddUpdateProbe").innerHTML = "Add";
    document.getElementById("divProbePreview").style.display="none";
  } else {
    document.getElementById("probeActionLabel").innerHTML = "Modify Probe";
    document.getElementById("id_buttonRemoveProbe").style.display = "block";
    document.getElementById("id_buttonAddUpdateProbe").innerHTML = "Update";

    var tmpProbe = getProbe(document.getElementById("id_selectProbeList").selectedIndex-1);
    document.getElementById("id_selectProbeType").selectedIndex=tmpProbe.getType();
    document.getElementById("id_selectProbeFunctionType").selectedIndex=tmpProbe.getFunction();
    document.getElementById("id_selectProbeRangeType").selectedIndex=tmpProbe.getRangeType();

    // fill range Information
    switch (document.getElementById("id_selectProbeRangeType").selectedIndex) {
      case 0:
        document.getElementById("id_inputSingleProbeRangeStart").value=globalCMS1.getRefPosition(0);
        document.getElementById("id_inputSingleProbeRangeEnd").value=globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);
        break;
        case 1:
          document.getElementById("id_inputSingleProbeRangeStart").value=globalCMS1.getRefPosition(0);
          document.getElementById("id_inputSingleProbeRangeEnd").value=globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);
          document.getElementById("id_inputProbeIntervalLength").value=globalCMS1.getRefRange()/10;
          break;
          case 2:
            document.getElementById("id_inputSingleProbeRangeStart").value=globalCMS1.getRefPosition(0);
            document.getElementById("id_inputSingleProbeRangeEnd").value=globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);
            document.getElementById("id_inputNumberIntervalAuto").value=100;
            break;
            case 3:
              document.getElementById("id_inputCustomProbeRanges").value=globalCMS1.getRefPosition(0)+","+globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1)+";";
              break;
      default:

    }

    // draw Preview
    document.getElementById("divProbePreview").style.display="block";
    drawProbePreview(tmpProbe);
  }


}

function selectProbeRangeType() {
  document.getElementById("id_divProbeRangesSingle").style.display = "none";
  document.getElementById("id_divProbeRangesInterval").style.display = "none";
  document.getElementById("id_divProbeRangesIntervalAuto").style.display = "none";
  document.getElementById("id_divProbeRangesCustom").style.display = "none";
  switch (document.getElementById("id_selectProbeRangeType").selectedIndex) {
    case 0:
      document.getElementById("id_divProbeRangesSingle").style.display = "block";
      break;
    case 1:
      document.getElementById("id_divProbeRangesSingle").style.display = "block";
      document.getElementById("id_divProbeRangesInterval").style.display = "block";
      break;
    case 2:
      document.getElementById("id_divProbeRangesSingle").style.display = "block";
      document.getElementById("id_divProbeRangesIntervalAuto").style.display = "block";
      break;
    case 3:
      document.getElementById("id_divProbeRangesCustom").style.display = "block";
      break;
    default:

  }

}

function selectProbeFunction() {
  switch (document.getElementById("id_selectProbeFunctionType").selectedIndex) {
    case 0:

      break;
    case 1:

      break;
    default:

  }
}

function selectProbeType() {
  switch (document.getElementById("id_selectProbeType").selectedIndex) {
    case 0:

      break;
    case 1:

      break;
    default:

  }
}


function checkProbeRangeInput(){
  switch (document.getElementById("id_selectProbeRangeType").selectedIndex) {
    case 0: case 1: case 2:

      document.getElementById("id_inputSingleProbeRangeEnd").min = document.getElementById("id_inputSingleProbeRangeStart").value;
      document.getElementById("id_inputSingleProbeRangeStart").max = document.getElementById("id_inputSingleProbeRangeEnd").value;

      if(document.getElementById("id_selectProbeRangeType").selectedIndex==1 && parseFloat(document.getElementById("id_inputProbeIntervalLength").value)==0){
        document.getElementById("id_inputProbeIntervalLength").value=0.0000000000000001;
      }
      break;
    case 3:
      // 1. split with ";", 2. split with ",", 3. check the elements for right order and ....
      break;
    default:

  }
}


function probeRemove(){
  if(document.getElementById("id_selectProbeList").selectedIndex>0){
    globalCMS1.deleteProbe(document.getElementById("id_selectProbeList").selectedIndex-1);
    updateProbeList();
  }

}

function probeAction(){

  if(document.getElementById("id_selectProbeRangeType").selectedIndex==3){
    //check if custom range is correct
  }

  var tmpProbe;
  if(document.getElementById("id_selectProbeList").selectedIndex==0){
    // ADD new Probe
    tmpProbe = new classProbe(document.getElementById("id_selectProbeType").selectedIndex, document.getElementById("id_selectProbeFunctionType").selectedIndex, document.getElementById("id_selectProbeRangeType").selectedIndex);
    globalCMS1.addProbe(tmpProbe);
    updateProbeList();
    document.getElementById("id_selectProbeList").selectedIndex=document.getElementById("id_selectProbeList").options.length-1;
    document.getElementById("divProbePreview").style.display="block";

  }
  else{
    // Update Probe
    tmpProbe = getProbe(document.getElementById("id_selectProbeList").selectedIndex-1);
    tmpProbe.changeType(document.getElementById("id_selectProbeType").selectedIndex);
    tmpProbe.changeFunction(document.getElementById("id_selectProbeFunctionType").selectedIndex);
    tmpProbe.changeRangeType(document.getElementById("id_selectProbeRangeType").selectedIndex);
    tmpProbe.clearIntervalColors();
    updateProbeList();
  }

  /////////// Calclate Colors

  switch (document.getElementById("id_selectProbeFunctionType").selectedIndex) {
    case 0:
      switch (document.getElementById("id_selectProbeRangeType").selectedIndex) {
        case 0:
          tmpProbe.addIntervalColorPos(parseFloat(document.getElementById("id_inputSingleProbeRangeStart"), parseFloat(document.getElementById("id_inputSingleProbeRangeEnd"))));
          break;
          case 1:

            var startVal = parseFloat(document.getElementById("id_inputSingleProbeRangeStart").value);
            var endVal = globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1);
            var intervalLength = parseFloat(document.getElementById("id_inputProbeIntervalLength").value);
            var numberOfSteps = Math.round((endVal-startVal)/intervalLength);
            endVal=startVal+intervalLength*numberOfSteps; // real End out of the border of the CMS

            var currentPos = startVal;

            for (var i = 0; i < numberOfSteps; i++) {

              if(i == numberOfSteps-1){
                tmpProbe.addIntervalColorPos(currentPos, globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1));
              }
              else
                tmpProbe.addIntervalColorPos(currentPos, currentPos+intervalLength);
              currentPos+=intervalLength;
            }

            break;
            case 2:
              var startVal = parseFloat(document.getElementById("id_inputSingleProbeRangeStart").value);
              var endVal = parseFloat(document.getElementById("id_inputSingleProbeRangeEnd").value);

              var numberOfIntervals = parseFloat(document.getElementById("id_inputNumberIntervalAuto").value);
              var intervalLength = (endVal-startVal)/numberOfIntervals;
              var currentPos=startVal;

              for (var i = 0; i < numberOfIntervals; i++) {
                if(i == numberOfSteps-1){
                  tmpProbe.addIntervalColorPos(currentPos, globalCMS1.getRefPosition(globalCMS1.getKeyLength()-1));
                }
                else
                  tmpProbe.addIntervalColorPos(currentPos, currentPos+intervalLength);
                currentPos+=intervalLength;
              }

              break;
              case 3:

                break;
        default:

      }
      break;
    default:
    console.log("Error at the probeAction function.");
  }



  //
  globalCMS1.setProbe(document.getElementById("id_selectProbeList").selectedIndex-1,tmpProbe)

  // draw Probe Preview
  drawProbePreview(tmpProbe);
}


function drawProbePreview(probe){
  drawCanvasColormap("id_linearProbePreview", linearMap_resolution_X, linearMap_resolution_Y, probe.generateProbeCMS(globalCMS1,colorspaceModus));
}
