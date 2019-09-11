
function changeColorspace(){

  var intSpace =   document.getElementById("id_editPage_InterpolationSelect").options[document.getElementById("id_editPage_InterpolationSelect").selectedIndex].value;

  switch (intSpace) {
    case "rgb":
        document.getElementById("id_editPage_idUsedMetric").innerHTML = "Metric: None";
        document.getElementById("id_EditPage_Analysis_UsedMetric").innerHTML = "Metric: None";
      break;
      case "hsv":
          document.getElementById("id_editPage_idUsedMetric").innerHTML = "Metric: None";
          document.getElementById("id_EditPage_Analysis_UsedMetric").innerHTML = "Metric: None";
        break;
        case "lab":
            document.getElementById("id_editPage_idUsedMetric").innerHTML = "Metric: Euclidean Distance";
            document.getElementById("id_EditPage_Analysis_UsedMetric").innerHTML = "Metric: Euclidean Distance (Lab Space)";
          break;
          case "lch":
              document.getElementById("id_editPage_idUsedMetric").innerHTML = "Metric: Euclidean Distance";
              document.getElementById("id_EditPage_Analysis_UsedMetric").innerHTML = "Metric: Euclidean Distance (Lab Space)";
            break;
          case "din99":
              document.getElementById("id_editPage_idUsedMetric").innerHTML = "Metric: Euclidean Distance";
              document.getElementById("id_EditPage_Analysis_UsedMetric").innerHTML = "Metric: Euclidean Distance (DIN99 Space)";
            break;
            case "de94":
                document.getElementById("id_editPage_idUsedMetric").innerHTML = "Metric: de94";
                document.getElementById("id_EditPage_Analysis_UsedMetric").innerHTML = "Metric: de94";
              break;
              case "de2000":
                  document.getElementById("id_editPage_idUsedMetric").innerHTML = "Metric: CIEDE2000";
                  document.getElementById("id_EditPage_Analysis_UsedMetric").innerHTML = "Metric: CIEDE2000";
                break;
                case "de94-ds":
                    document.getElementById("id_editPage_idUsedMetric").innerHTML = "Metric: de94";
                    document.getElementById("id_EditPage_Analysis_UsedMetric").innerHTML = "Metric: de94";
                  break;
                  case "de2000-ds":
                      document.getElementById("id_editPage_idUsedMetric").innerHTML = "Metric: CIEDE2000";
                      document.getElementById("id_EditPage_Analysis_UsedMetric").innerHTML = "Metric: CIEDE2000";
                    break;
    default:
      intSpace="lab";
      document.getElementById("id_editPage_idUsedMetric").innerHTML = "Metric: Euclidean Distance";
  }

  globalCMS1.setInterpolationSpace(intSpace);

  globalCMS1JSON=inform_Worker_GlobalCMS();

  if(document.getElementById("id_EditPage_Add_Structures_Optimization").style.display!="none"){
    updatePredefined();
  }

  // UPDATE Path Plot
  if(document.getElementById("id_EditPage_Edit_Path").style.display!="none"){
    if(pathColorspace==="rgb"){
      drawcolormap_RGBSpace(true,true);
    }
    else{
      drawcolormap_hueSpace(true, true, true);
    }
  }


  updateEditPage(); // = update CMS, Mapping and Analyze Plots

  if(editPage_optimizationMode){
    updateOptimizationPage();
  }


}


function updateInterpolationSpaceEditPage(){
  switch (globalCMS1.getInterpolationSpace()) {
    case "rgb":
    document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 5;
      break;
      case "hsv":
      document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 6;
        break;
        case "lab":
        document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 0;
          break;
          case "lch":
          document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 1;
            break;
          case "din99":
          document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 2;
            break;
            case "de94":
            document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 3;
              break;
              case "de2000":
              document.getElementById("id_editPage_InterpolationSelect").selectedIndex = 4;
                break;
    default:

  }
  changeColorspace();

}

function changeInterpolationType(){

  switch (document.getElementById("id_editPage_InterpolationTypeSelect").selectedIndex){
    case 0:
      globalCMS1.setInterpolationType("linear");
      break;
      case 1:
        globalCMS1.setInterpolationType("spline");
        break;
  }

  // UPDATE Path Plot
  if(document.getElementById("id_EditPage_Edit_Path").style.display!="none"){
    if(pathColorspace==="rgb"){
      drawcolormap_RGBSpace(true,true);
    }
    else{
      drawcolormap_hueSpace(true, true, true);
    }
  }

  updateEditPage(); // = update CMS, Mapping and Analyze Plots

  if(editPage_optimizationMode){
    updateOptimizationPage();
  }

}

function updateInterpolationType(){

  if(globalCMS1.getInterpolationType()==="linear")
    document.getElementById("id_editPage_InterpolationTypeSelect").selectedIndex=0;
  else
    document.getElementById("id_editPage_InterpolationTypeSelect").selectedIndex=1;

  changeInterpolationType();

}
