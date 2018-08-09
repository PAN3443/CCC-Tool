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

console.log(globalCMS1.getProbeLength());

  for (var i = 0; i < globalCMS1.getProbeLength(); i++) {

    var opt = document.createElement('option');

    var tmpProbe = globalCMS1.getProbe();
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

  } else {
    document.getElementById("probeActionLabel").innerHTML = "Modify Probe";
    document.getElementById("id_buttonRemoveProbe").style.display = "block";
    document.getElementById("id_buttonAddUpdateProbe").innerHTML = "Update";
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

  console.log(123);

  if(document.getElementById("id_selectProbeList").selectedIndex==0){
    // ADD new Probe
    var tmpProbe = new classProbe(document.getElementById("id_selectProbeType").selectedIndex, document.getElementById("id_selectProbeFunctionType").selectedIndex, document.getElementById("id_selectProbeRangeType").selectedIndex);
    globalCMS1.addProbe(tmpProbe);

  }
  else{

    // Update Probe
  }

  updateProbeList();
}
