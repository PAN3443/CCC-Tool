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
  var selectbox2 = document.getElementById("id_selectMainProbeSetList");

  for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
  {
      selectbox.remove(i);
  }

  for(var i = selectbox2.options.length - 1 ; i >= 0 ; i--)
  {
      selectbox2.remove(i);
  }

  for (var i = 0; i < globalCMS1.getProbeSetLength(); i++) {
    var opt = document.createElement('option');
    var opt2 = document.createElement('option');

    opt.innerHTML = "Probe-Set: "+globalCMS1.getProbeSet(i).getProbeSetName();
    opt2.innerHTML = "Probe-Set: "+globalCMS1.getProbeSet(i).getProbeSetName();

    selectbox.appendChild(opt);
    selectbox2.appendChild(opt2);
  }

  document.getElementById("id_selectProbeSetList").selectedIndex=0;
  updateProbeSelectBox();
}


function editPageChangeProbeSetName(){
  var index = document.getElementById("id_selectProbeSetList").selectedIndex;
  var index2= document.getElementById("id_selectProbeList").selectedIndex;
  globalCMS1.changeProbeSetName(index,document.getElementById("id_probe_EditProbeName").value);
  updateProbeSetSelectBox();
  document.getElementById("id_selectProbeSetList").selectedIndex=index;
  updateProbeSelectBox();
  document.getElementById("id_selectProbeList").selectedIndex=index2;
  selectProbe();

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
          type="Constant"
        break;
        case 1: // gradient
            type="One Sided"
          break;
          case 2: // contour
              type="One Sided Transparent"
            break;
            case 3: // gradient
                type="Two Sided"
              break;
              case 4: // contour
                  type="Two Sided Transparent"
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

      if(tmpProbe.getType()==3 || tmpProbe.getType()==4){
        changeOneSideFunction(tmpProbe.getFunctionType());
      }
      else{
        changeOneSideFunction(tmpProbe.getFunctionType());
      }

  }
}


function addOrUpdateProbe(){

  var tmpProbeSet = globalCMS1.getProbeSet(document.getElementById("id_selectProbeSetList").selectedIndex);

  // check input
  var start = parseFloat(document.getElementById("id_probe_EditProbeStart").value);
  var end = parseFloat(document.getElementById("id_probe_EditProbeEnd").value);

  if(isNaN(start) || isNaN(end) || start==undefined || end==undefined){
    openAlert("The input value for the probe start or end position is not correct!");
    return;
  }

  if(start>end){
    openAlert("The the probe start position has to be smaller than the end position!");
    return;
  }

  // check if new probe range is overlapping

  var isOverlapping = false;
  var errorMess = "\tThe new range \""+start+","+end+"; is overlapping with the probes:  ";

  var insertIndex = 0;  // init is the assumption of the probe insertion before the existing probes
  var foundInsertionProint = false;
  var probeIndex = document.getElementById("id_selectProbeList").selectedIndex-1;
  for (var i = 0; i < tmpProbeSet.getProbeLength(); i++) {

      var checkStart = tmpProbeSet.getProbe(i).getStartPos();
      var checkEnd = tmpProbeSet.getProbe(i).getEndPos();


      if(document.getElementById("id_selectProbeList").selectedIndex!=0 && i == probeIndex) // we don't check the probe range if this is the probe range the user want to update
        continue;
        else if (foundInsertionProint==false) {
        // we have to find the insertion point in the case of additing a new probe
        if(i!=tmpProbeSet.getProbeLength()-1){
            var checkStart2 = tmpProbeSet.getProbe(i+1).getStartPos();
            if(start>=checkEnd && end<=checkStart2){
              foundInsertionProint=true;
              insertIndex=i+1;
            }
        }
        else{
          if(checkEnd<=start){
            insertIndex=i+1;
          }

        }

      }

      if(checkEnd<=start)
        continue;

      if(checkStart>=end)
        continue;



      isOverlapping=true;
      errorMess=errorMess+" Probe "+(i+1)+": "+checkStart+","+checkEnd+";";

  }

  if(isOverlapping){
    openAlert(errorMess);
    return;
  }


  if(document.getElementById("id_selectProbeList").selectedIndex==0){

    // add newProbe
    var newProbe = createProbe(start,end);
    globalCMS1.insertProbe(document.getElementById("id_selectProbeSetList").selectedIndex,insertIndex,newProbe);

  }
  else{

    globalCMS1.updateProbe(document.getElementById("id_selectProbeSetList").selectedIndex,document.getElementById("id_selectProbeList").selectedIndex-1,globalProbeType,globalProbeSubtypeIndex,start,end,globalProbeColor);
    insertIndex = document.getElementById("id_selectProbeList").selectedIndex-1;
  }

  updateProbeSelectBox();
  document.getElementById("id_selectProbeList").selectedIndex = insertIndex+1;
  selectProbe();
  tmpProbeSet = globalCMS1.getProbeSet(document.getElementById("id_selectProbeSetList").selectedIndex);
  drawProbePreview(tmpProbeSet);
}
