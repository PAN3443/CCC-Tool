function updateAnalyze(){

    if(document.getElementById("id_EditPage_DivAnalyze").style.display=="none")
      return;


    id_EditPage_AnalyzePlot_Container

    switch (analyzePlotType) {
      case 0:

        break;
        case 1:

          break;
          case 2:

            break;
            case 3:

              break;
              case 4:

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
            document.getElementById("id_EditPage_Analyze_Label").innerHTML = "Plot : Global Speed";
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
