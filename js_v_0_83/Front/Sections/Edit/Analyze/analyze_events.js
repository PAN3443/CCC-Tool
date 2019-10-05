
function changeAutoAnalyze(){

  if(autoAnalyze){
      autoAnalyze=false;
      document.getElementById('id_settingMenu_Label_AnalyzeUpdate_Button').innerHTML="Activate Automatical Analyze Update";
  }
  else{
      autoAnalyze=true;
      document.getElementById('id_settingMenu_Label_AnalyzeUpdate_Button').innerHTML="Deactivate Automatical Analyze Update";
      updateAnalyze();
  }

}

function updateAnalyze(){

    /*if(!editPage_optimizationMode) // because at the
    analyzeMetricIndex = document.getElementById("id_AnalyzeSubContainer_Select").selectedIndex;*/

    if(document.getElementById("id_EditPage_DivAnalyze").style.display=="none")
      return;

      document.getElementById("id_EditPage_Max_GlobalLocalOrder").style.color=getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');
      document.getElementById("id_EditPage_Min_GlobalLocalOrder").style.color=getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');
      document.getElementById("id_EditPage_Average_GlobalLocalOrder").style.color=getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');
      document.getElementById("id_EditPage_Deviation_GlobalLocalOrder").style.color=getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

      document.getElementById("id_EditPage_Analyze_InterPolInfoDiv").style.display = "none";
      document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "flex";

      switch (document.getElementById("id_EditPage_SelectAnalyzePlot").selectedIndex) {
        case 0:
          styleStructure_InterpolationSpaces();
          break;
          case 1:
            styleStructure_BandSpeed();
            break;
            case 2:
              //if(analyze_checkChoosedInterpoationSpace())
              styleStructure_LocalSpeed();
              break;
              case 3:
                //if(analyze_checkChoosedInterpoationSpace())
                styleStructure_GlobalSpeed();
                break;
                case 4:
                  //if(analyze_checkChoosedInterpoationSpace())
                  styleStructure_Order();
                  break;
        default:

      }
}


function analyze_checkChoosedInterpoationSpace(){
  if(globalCMS1.getInterpolationSpace()==="rgb" || globalCMS1.getInterpolationSpace()==="hsv"){
    document.getElementById("id_EditPage_Analyze_InterPolInfoDiv").style.display = "flex";
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "none";
    return false;
  }
  else {
    return true;
  }
}



function styleGlobalLocalOrderPlot(){
  document.getElementById("id_EditPage_AnalyzeContainer_SpacesKeyspeed").style.display = "none";
  document.getElementById("id_EditPage_AnalyzeContainer_GlobalLocalOrder").style.display = "flex";
}

function updateKeySelection(){
  var oldStartIndex = document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex;
  var oldEndIndex = document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex;
  fillKeyCombobox(globalCMS1,"id_EditPage_SelectFrom_GlobalLocalOrder","id_EditPage_SelectTill_GlobalLocalOrder");

  if(oldStartIndex<document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").length && oldEndIndex<document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").length && oldStartIndex!=-1 && oldEndIndex!=-1){
    document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex=oldStartIndex;
    document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex=oldEndIndex;
  }
  else{
    document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex=0;
    document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex=globalCMS1.getKeyLength()-1;
  }

  var options = document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").options;
  for (var i = 0; i < options.length; i++) {
    if(i<document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex)
      options[i].disabled = false;
    else
      options[i].disabled = true;
  }

  options = document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").options;
  for (var i = 0; i < options.length; i++) {
    if(i>document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex)
      options[i].disabled = false;
    else
      options[i].disabled = true;
  }
}



function changeDeltaSampling(event){

  var tmpVal = parseFloat(event.target.value);

  if(isNaN(deltaSampling_Analyze)|| tmpVal==undefined){
    openAlert("Input for the caluclation of the interval colors is not correct!");
    document.getElementById("id_editPage_Optimization_IntervalCalcInput").value = deltaSampling_Analyze;
    document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value = deltaSampling_Analyze;
    return;
  }

  if(tmpVal<=0){
    openAlert("Input for the caluclation of the interval colors with using the color difference has to be larger than null!");
    document.getElementById("id_editPage_Optimization_IntervalCalcInput").value = deltaSampling_Analyze;
    document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value = deltaSampling_Analyze;
    return;
  }

  deltaSampling_Analyze=tmpVal;
  document.getElementById("id_editPage_Optimization_IntervalCalcInput").value = deltaSampling_Analyze;
  document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value = deltaSampling_Analyze;
  updateAnalyze();

}


function updateAnalyzeCompareKeyIndex(startComboID,endComboID){

  var startIndex = document.getElementById(startComboID).selectedIndex;
  var endIndex = document.getElementById(endComboID).selectedIndex;

  var options = document.getElementById(startComboID).options;
  for (var i = 0; i < options.length; i++) {
    if(i<endIndex)
      options[i].disabled = false;
    else
      options[i].disabled = true;
  }

  options = document.getElementById(endComboID).options;
  for (var i = 0; i < options.length; i++) {
    if(i>startIndex)
      options[i].disabled = false;
    else
      options[i].disabled = true;
  }

  switch (document.getElementById("id_EditPage_SelectAnalyzePlot").selectedIndex) {
    case 0:
      styleStructure_InterpolationSpaces();
      break;
      case 1:
        styleStructure_BandSpeed();
        break;
        case 2:
          styleStructure_LocalSpeed();
          break;
          case 3:
            styleStructure_GlobalSpeed();
            break;
            case 4:
              styleStructure_Order();
              break;
    default:

  }
}

function fillKeyCombobox(colormap,startComboID,endComboID){

    var selectbox = document.getElementById(startComboID);
    for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }

    // fill startbox
    if(colormap.getKeyLength()==0)
    return;


    for (var i = 1; i <= colormap.getKeyLength(); i++) {

      var opt = document.createElement('option');
      opt.innerHTML = i;
      opt.value = i;

      if(i == colormap.getKeyLength()){
        opt.disabled = true;
      }

      selectbox.appendChild(opt);
    }
    document.getElementById(startComboID).options[0].selected = true;
    ///////////////////////////////////////////////////////////////////////
    selectbox = document.getElementById(endComboID);
    for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }

    // fill endbox

    // fill startbox

    for (var i = 1; i <= colormap.getKeyLength(); i++) {

      var opt = document.createElement('option');
      opt.innerHTML = i;
      opt.value = i;

      if(i == 1){
        opt.disabled = true;
      }

      selectbox.appendChild(opt);
    }
    document.getElementById(endComboID).options[document.getElementById(endComboID).options.length-1].selected = true;
}
