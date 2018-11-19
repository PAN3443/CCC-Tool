///////////////////////////////////////////////////////
////////////// Edit Probe Set
///////////////////////////////////////////////////////


function init_editProbe(){

  document.getElementById("id_EditPage_editProbe").style.display="block";
  document.getElementById("id_EditPage_generateProbeSet").style.display="none";
  updateProbeSetSelectBox();
  selectProbe();

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

function deleteProbeSet(){

  if(document.getElementById("id_selectProbeSetList").selectedIndex<globalCMS1.getProbeSetLength()){
    askType=5;
    openAskWindow();
  }

}

function deleteProbe(){

  var tmpProbeSet = globalCMS1.getProbeSet(document.getElementById("id_selectProbeSetList").selectedIndex);
  if((document.getElementById("id_selectProbeList").selectedIndex-1)<tmpProbeSet.getProbeLength()){
    askType=6;
    openAskWindow();
  }

}


function selectProbe(){

  var selectbox = document.getElementById("id_selectProbeList");

  if(selectbox.selectedIndex==0){

      document.getElementById("id_EditPage_RemoveProbeButton").style.visibility="hidden";
      document.getElementById("id_EditPage_AddUpdateProbeButton").innerHTML="Add New Probe";
      document.getElementById("id_probe_EditProbeStart").value='';
      document.getElementById("id_probe_EditProbeEnd").value='';

      globalProbeColor = new  classColor_HSV(0,0,1.0);
      changeProbeType(0);
  }
  else{
      document.getElementById("id_EditPage_RemoveProbeButton").style.visibility="visible";
      document.getElementById("id_EditPage_AddUpdateProbeButton").innerHTML="Update Probe";

      var tmpProbe = globalCMS1.getProbe(document.getElementById("id_selectProbeSetList").selectedIndex,document.getElementById("id_selectProbeList").selectedIndex-1);
      // fill probe inputs
      document.getElementById("id_probe_EditProbeStart").value=tmpProbe.getStartPos();
      document.getElementById("id_probe_EditProbeEnd").value=tmpProbe.getEndPos();

      globalProbeColor=tmpProbe.getProbeColor();

      changeProbeType(tmpProbe.getType());

      if(tmpProbe.getIsTwoSided()){
        changeProbeSubType(1);
        changeOneSideFunction(tmpProbe.getTwoSidedType());
      }
      else{
        changeProbeSubType(0);
        changeOneSideFunction(tmpProbe.getOneSidedType());
      }

  }
}


function addOrUpdateProbe(){



}
