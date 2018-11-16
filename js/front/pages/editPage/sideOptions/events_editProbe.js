///////////////////////////////////////////////////////
////////////// Edit Probe Set
///////////////////////////////////////////////////////


function init_editProbe(){

  document.getElementById("id_EditPage_editProbe").style.display="block";
  document.getElementById("id_EditPage_generateProbeSet").style.display="none";
  updateProbeSetSelectBox();

}

function updateProbeSetSelectBox(){


  var selectbox = document.getElementById("id_selectProbeSetList");

  for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
  {
      selectbox.remove(i);
  }

  for (var i = 0; i < globalCMS1.getProbeSetLength(); i++) {
    var opt = document.createElement('option');

    opt.innerHTML = "Probe-Set: "+globalCMS1.getProbeSet(i).getProbeSetName();

    selectbox.appendChild(opt);
  }

  document.getElementById("id_selectProbeSetList").selectedIndex=0;
  updateProbeSelectBox();
}


function editPageChangeProbeSetName(){
  globalCMS1.changeProbeSetName(document.getElementById("id_selectProbeSetList").selectedIndex,document.getElementById("id_probe_EditProbeName").value);
}

function updateProbeSelectBox(){

  var index = document.getElementById("id_selectProbeSetList").selectedIndex;

  var selectbox = document.getElementById("id_selectProbeList");

  for(var i = selectbox.options.length - 1 ; i > 0 ; i--)
  {
      selectbox.remove(i);
  }

  var tmpProbeSet = globalCMS1.getProbeSet(index);

  document.getElementById("id_probe_EditProbeName").value = tmpProbeSet.getProbeSetName();

  drawProbePreview(tmpProbeSet);


  for (var i = 0; i < tmpProbeSet.getProbeLength() ; i++) {
    var opt = document.createElement('option');

    var tmpProbe = tmpProbeSet.getProbe(i);
  if(tmpProbe==undefined)
  continue;

    var type = "";

    switch (tmpProbe.getType()) {
      case 0: // constant
          type="constant"
        break;
        case 1: // gradient
            type="gradient"
          break;
          case 2: // contour
              type="contour"
            break;
      default:

    }

    opt.innerHTML = (i+1)+". Probe: Range=("+tmpProbe.getStartPos()+","+tmpProbe.getEndPos()+"), Type="+type;

    selectbox.appendChild(opt);
  }

  selectbox.selectedIndex = 0;


}

function removeProbe(){

}


function selectProbe(){

  var selectbox = document.getElementById("id_selectProbeList");

  if(selectbox.selectedIndex==0){

      document.getElementById("id_EditPage_RemoveProbeButton").style.visibility="hidden";
      document.getElementById("id_EditPage_AddUpdateProbeButton").innerHTML="Add New Probe";

  }
  else{
      document.getElementById("id_EditPage_RemoveProbeButton").style.visibility="visible";
      document.getElementById("id_EditPage_AddUpdateProbeButton").innerHTML="Update Probe";

      // fill probe inputs
  }
}


function addOrUpdateProbe(){



}
