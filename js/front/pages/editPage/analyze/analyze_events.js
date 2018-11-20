function updateAnalyze(){

    if(document.getElementById("id_EditPage_DivAnalyze").style.display=="none")
      return;

      switch (analyzePlotType) {
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


function changeAnalyzeType(type){

  analyzePlotType=type;

  document.getElementById("id_EditPage_AnalyzePlot_Space").style.background = 'none';
  document.getElementById("id_EditPage_AnalyzePlot_BandSpeed").style.background = 'none';
  document.getElementById("id_EditPage_AnalyzePlot_LocalSpeed").style.background = 'none';
  document.getElementById("id_EditPage_AnalyzePlot_GlobalSpeed").style.background = 'none';
  document.getElementById("id_EditPage_AnalyzePlot_Order").style.background = 'none';

  switch (analyzePlotType) {
    case 0:
      document.getElementById("id_EditPage_AnalyzePlot_Space").style.background="rgb(76, 175, 80)";
      document.getElementById("id_EditPage_Analyze_Label").innerHTML = "Plot : Interpolation Spaces";
      styleStructure_InterpolationSpaces();
      break;
      case 1:
        document.getElementById("id_EditPage_AnalyzePlot_BandSpeed").style.background="rgb(76, 175, 80)";
        document.getElementById("id_EditPage_Analyze_Label").innerHTML = "Plot : Band Speed";
        styleStructure_BandSpeed();
        break;
        case 2:
          document.getElementById("id_EditPage_AnalyzePlot_LocalSpeed").style.background="rgb(76, 175, 80)";
          document.getElementById("id_EditPage_Analyze_Label").innerHTML = "Plot : Local Speed";
          styleStructure_LocalSpeed();
          break;
          case 3:
            document.getElementById("id_EditPage_AnalyzePlot_GlobalSpeed").style.background="rgb(76, 175, 80)";
            document.getElementById("id_EditPage_Analyze_Label").innerHTML = "Plot : Global Speed Difference";
            styleStructure_GlobalSpeed();
            break;
            case 4:
              document.getElementById("id_EditPage_AnalyzePlot_Order").style.background="rgb(76, 175, 80)";
              document.getElementById("id_EditPage_Analyze_Label").innerHTML = "Plot : Order";
              styleStructure_Order();
              break;
    default:

  }



  updateAnalyze();
}


function styleGlobalLocalOrderPlot(){

  document.getElementById("id_EditPage_AnalyzeContainer_SpacesKeyspeed").style.display = "none";
  document.getElementById("id_EditPage_AnalyzeContainer_GlobalLocalOrder").style.display = "flex";

  var rect = document.getElementById("id_EditPage_AnalyzeContainer_GlobalLocalOrder").getBoundingClientRect();

  var canvasDim =  Math.round(rect.height*0.8);
  var margin =  Math.round(rect.height*0.1);
  document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.height = canvasDim+"px";
  document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.width = canvasDim+"px";
  document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.marginTop = margin+"px";

  /*var rest = rect.width-canvasDim;

  rect = document.getElementById("id_EditPage_LabelDiv_GlobalLocalOrder").getBoundingClientRect();

  rest -= rect.width;
  margin=Math.round(rest/3);

  if(margin>0){
    document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.marginLeft = margin+"px";
    document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.marginRight = margin+"px";
    document.getElementById("id_EditPage_LabelDiv_GlobalLocalOrder").style.marginRight = margin+"px";
  }*/

  document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.marginLeft = "auto";
  document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").style.marginRight = "auto";
  document.getElementById("id_EditPage_LabelDiv_GlobalLocalOrder").style.marginRight = "auto";


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

  switch (analyzePlotType) {
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
