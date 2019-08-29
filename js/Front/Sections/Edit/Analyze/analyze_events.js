
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

    if(document.getElementById("id_EditPage_DivAnalyze").style.display=="none")
      return;


      document.getElementById("id_EditPage_Max_GlobalLocalOrder").style.color=getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');
      document.getElementById("id_EditPage_Min_GlobalLocalOrder").style.color=getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');
      document.getElementById("id_EditPage_Average_GlobalLocalOrder").style.color=getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');
      document.getElementById("id_EditPage_Deviation_GlobalLocalOrder").style.color=getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

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



function styleGlobalLocalOrderPlot(){

  document.getElementById("id_EditPage_AnalyzeContainer_SpacesKeyspeed").style.display = "none";
  document.getElementById("id_EditPage_AnalyzeContainer_GlobalLocalOrder").style.display = "flex";

  /*var tmpBox = document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").getBoundingClientRect();

  if(tmpBox.height<tmpBox.width)
  document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.width = document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.height;
  else
  document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.height = document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.width;

  document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.marginLeft = "auto";
  document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.marginRight = "auto";*/

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

function changeAnalyzeIntervalCalculation(){


  switch (document.getElementById("id_EditPage_SelectAnalyzePlot").selectedIndex) {
        case 2:
          if(document.getElementById("id_editPage_Anaylze_IntervalNumber").checked)
            document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value=numberOfIntervalsLocal;
          else
            document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value=colorDifferenceLocal;

          styleStructure_LocalSpeed();
          break;
          case 3:

            if(document.getElementById("id_editPage_Anaylze_IntervalNumber").checked)
              document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value=numberOfIntervalsGlobal;
            else
              document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value=colorDifferenceGlobal;
            styleStructure_GlobalSpeed();
            break;
            case 4:

              if(document.getElementById("id_editPage_Anaylze_IntervalNumber").checked)
                document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value=numberOfIntervalsOrder;
              else
                document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value=colorDifferenceOrder;
              styleStructure_Order();
              break;
    default:

  }
}

function changeAnalyzeIntervalInput(){


  var tmpVal;


  if(document.getElementById("id_editPage_Anaylze_IntervalNumber").checked){

    tmpVal = parseInt(document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value);
    if(isNaN(tmpVal)|| tmpVal==undefined){
      openAlert("Input for the caluclation of the interval colors is not correct!");
      updateAnalyze();
      return;
    }

    if(tmpVal<1){
      openAlert("Input for the caluclation of the interval colors with a fixed number of intervals has to be at least one!");
      updateAnalyze();
      return;
    }
  }
  else{

    tmpVal = parseFloat(document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value);
    if(isNaN(tmpVal)|| tmpVal==undefined){
      openAlert("Input for the caluclation of the interval colors is not correct!");
      updateAnalyze();
      return;
    }

    if(tmpVal<=0){
      openAlert("Input for the caluclation of the interval colors with using the color difference has to be larger than null!");
      updateAnalyze();
      return;
    }

  }

  switch (document.getElementById("id_EditPage_SelectAnalyzePlot").selectedIndex) {
        case 2:
          if(document.getElementById("id_editPage_Anaylze_IntervalNumber").checked)
            numberOfIntervalsLocal=tmpVal;
          else
            colorDifferenceLocal=tmpVal;

          styleStructure_LocalSpeed();
          break;
          case 3:

            if(document.getElementById("id_editPage_Anaylze_IntervalNumber").checked)
              numberOfIntervalsGlobal=tmpVal;
            else
              colorDifferenceGlobal=tmpVal;
            styleStructure_GlobalSpeed();
            break;
            case 4:

              if(document.getElementById("id_editPage_Anaylze_IntervalNumber").checked)
                numberOfIntervalsOrder=tmpVal;
              else
                colorDifferenceOrder=tmpVal;
              styleStructure_Order();
              break;
    default:

  }
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
