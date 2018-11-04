

function choosePathPlotSpace(type){
//id_EditPage_PathPlot_ThreeCanvas


document.getElementById("id_editPage_PathPlotSpaces_RGB").style.background = 'none';
document.getElementById("id_editPage_PathPlotSpaces_HSV").style.background = 'none';
document.getElementById("id_editPage_PathPlotSpaces_LAB").style.background = 'none';
document.getElementById("id_editPage_PathPlotSpaces_DIN99").style.background = 'none';

  var box = document.getElementById("id_EditPage_Edit_Path").getBoundingClientRect();
  var box2 = document.getElementById("id_EditPage_PathPlotSpaces_Label").getBoundingClientRect();

  var restHeight = box.height-box2.height;

  if(restHeight<0)
  return;


  /*stopAnimation();
  document.getElementById("id_RGBCourseDiv").style.display = "initial";
  drawcolormap_RGBSpace(true,true);
  animate();
  camera.updateProjectionMatrix();
  break;
  case "hsv":
  stopAnimation();
  document.getElementById("id_divHSVLABDIN").style.display = "initial";
  document.getElementById("id_setValueRange").value = 100;

  drawcolormap_hueSpace(true, true, true);
  break;
  case "lab": case "din99":
  stopAnimation();
  document.getElementById("id_divHSVLABDIN").style.display = "initial";
  document.getElementById("id_setValueRange").value = 65;
  drawcolormap_hueSpace(true, true, true);*/


  if(type==0){

    //initRGB3D();
    document.getElementById("id_editPage_PathPlotSpaces_RGB").style.background="rgb(76, 175, 80)";
    document.getElementById("id_EditPage_PathPlot_ThreeCanvas").style.height = restHeight+"px";
    document.getElementById("id_EditPage_PathPlot_ThreeCanvas").style.width = restHeight*1.5+"px";

    document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = restHeight+"px";
    document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = restHeight*2+"px";

    document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.display = "none";
    document.getElementById("id_EditPage_PathPlot_3D_Div").style.display = "inline-block";
  }
  else {
    document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.display = "inline-block";
    document.getElementById("id_EditPage_PathPlot_3D_Div").style.display = "none";

    document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.height = restHeight+"px";
    document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.width = restHeight+"px";

    document.getElementById("id_EditPage_PathPlot_ThreeCanvas").style.height = restHeight+"px";
    document.getElementById("id_EditPage_PathPlot_ThreeCanvas").style.width = restHeight*3+"px";

    switch (type) {
        case 1: // HSV
          document.getElementById("id_editPage_PathPlotSpaces_HSV").style.background="rgb(76, 175, 80)";
          break;
          case 2: // LAB
            document.getElementById("id_editPage_PathPlotSpaces_LAB").style.background="rgb(76, 175, 80)";
            break;
            case 3: // DIN99
            document.getElementById("id_editPage_PathPlotSpaces_DIN99").style.background="rgb(76, 175, 80)";
              break;
      default:

    }
  }



}
