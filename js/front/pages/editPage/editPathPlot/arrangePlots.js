

function choosePathPlotSpace(type){
//id_EditPage_PathPlot_ThreeCanvas


document.getElementById("id_editPage_PathPlotSpaces_RGB").style.background = 'none';
document.getElementById("id_editPage_PathPlotSpaces_HSV").style.background = 'none';
document.getElementById("id_editPage_PathPlotSpaces_LAB").style.background = 'none';
document.getElementById("id_editPage_PathPlotSpaces_DIN99").style.background = 'none';

  var box = document.getElementById("id_EditPage_Edit_Path").getBoundingClientRect();
  var box2 = document.getElementById("id_EditPage_PathPlotSpaces_Label").getBoundingClientRect();

  var restHeight = box.height-box2.height;
  var tmpLineHeight = restHeight*0.05;

  document.getElementById("id_EditPage_PathPlot_BigCanvas_Label").style.lineHeight=tmpLineHeight+"px";
  document.getElementById("id_EditPage_PathPlot_SmallCanvasTop_Label").style.lineHeight=tmpLineHeight+"px";
  document.getElementById("id_EditPage_PathPlot_SmallCanvasBottom_Label").style.lineHeight=tmpLineHeight+"px";

  if(restHeight<0)
  return;

  stopAnimation();

  document.getElementById("id_EditPage_PathPlot_SmallTopCanvas_Div").style.height="50%";
  document.getElementById("id_EditPage_PathPlot_SmallBottomCanvas_Div").style.height="50%";
  document.getElementById("id_EditPage_PathPlot_SmallTopCanvas_Div").style.width="100%";
  document.getElementById("id_EditPage_PathPlot_SmallTopCanvas_Div").style.border = "none";
  document.getElementById("id_EditPage_PathPlot_SmallBottomCanvas_Div").style.width="100%";
  document.getElementById("id_EditPage_PathPlot_BigCanvas_Div").style.width = "66%";
  document.getElementById("id_EditPage_PathPlot_SmallCanvas_Div").style.width = "33%";
  document.getElementById("id_EditPage_PathPlot_SmallCanvas_Div").style.display="inline-block";
  document.getElementById("id_EditPage_PathPlot_BigCanvas_SubDiv").style.height="100%";
  document.getElementById("id_EditPage_PathPlot_BigCanvas_Label").style.display="none";
  document.getElementById("id_EditPage_PathPlot_SmallCanvasTop_Label").style.display="none";
  document.getElementById("id_EditPage_PathPlot_SmallCanvasBottom_Label").style.display="none";

  document.getElementById('id_EditPage_PathPlot_BigCanvas_2').removeEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_EditPage_PathPlot_BigCanvas_2').removeEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_EditPage_PathPlot_BigCanvas_2').removeEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_EditPage_PathPlot_BigCanvas_2').removeEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').removeEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').removeEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').removeEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').removeEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').removeEventListener("mouseleave", mouseLeaveColorspaceRGB);
  document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').removeEventListener("mousemove", mouseMoveColorspaceRGB);
  document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').removeEventListener("mousedown", mouseDownColorspaceRGB);
  document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').removeEventListener("mouseup", mouseUpColorspaceRGB);

  document.getElementById('id_EditPage_PathPlot_BigCanvas_2').removeEventListener("mouseleave", mouseLeaveValuePlot);
  document.getElementById('id_EditPage_PathPlot_BigCanvas_2').removeEventListener("mousemove", mouseMoveValuePlot);
  document.getElementById('id_EditPage_PathPlot_BigCanvas_2').removeEventListener("mousedown", mouseDownValuePlot);
  document.getElementById('id_EditPage_PathPlot_BigCanvas_2').removeEventListener("mouseup", mouseUpColorspace);

  document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').removeEventListener("click", switchPathPlotAssignment);
  document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').removeEventListener("click", switchPathPlotAssignment);
  document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').style.cursor = "default";
  document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').style.cursor = "default";

  pathCanvasAssignmentBig = 0;
  pathCanvasAssignmentSmallTop = 1;
  pathCanvasAssignmentSmallBottom = 2;

  if(type==0){

    document.getElementById("id_editPage_PathPlotSpaces_RGB").style.background="rgb(76, 175, 80)";

    document.getElementById('id_EditPage_PathPlot_BigCanvas_2').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_BigCanvas_2').addEventListener("mousemove", mouseMoveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_BigCanvas_2').addEventListener("mousedown", mouseDownColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_BigCanvas_2').addEventListener("mouseup", mouseUpColorspaceRGB);


    if(box.width-4*restHeight>0){

      document.getElementById("id_EditPage_PathPlot_SmallCanvas_Div").style.display="flex";
      document.getElementById("id_EditPage_PathPlot_SmallTopCanvas_Div").style.height="100%";
      document.getElementById("id_EditPage_PathPlot_SmallBottomCanvas_Div").style.height="100%";
      document.getElementById("id_EditPage_PathPlot_SmallTopCanvas_Div").style.width="50%";
      document.getElementById("id_EditPage_PathPlot_SmallBottomCanvas_Div").style.width="50%";
      document.getElementById("id_EditPage_PathPlot_BigCanvas_Div").style.width = "33%";
      document.getElementById("id_EditPage_PathPlot_SmallCanvas_Div").style.width = "66%";
      document.getElementById("id_EditPage_PathPlot_ThreeCanvas").style.height = restHeight+"px";
      document.getElementById("id_EditPage_PathPlot_ThreeCanvas").style.width = restHeight*3+"px";
      document.getElementById("id_EditPage_PathPlot_SmallBottomCanvas_Div").style.display="inline-block";
      document.getElementById("id_EditPage_PathPlot_SmallTopCanvas_Div").style.display="inline-block";

      document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
      document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').addEventListener("mousemove", mouseMoveColorspaceRGB);
      document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').addEventListener("mousedown", mouseDownColorspaceRGB);
      document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').addEventListener("mouseup", mouseUpColorspaceRGB);

      document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
      document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').addEventListener("mousemove", mouseMoveColorspaceRGB);
      document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').addEventListener("mousedown", mouseDownColorspaceRGB);
      document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').addEventListener("mouseup", mouseUpColorspaceRGB);



    }
    else{

      document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').addEventListener("click", switchPathPlotAssignment);
      document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').addEventListener("click", switchPathPlotAssignment);
      document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').style.cursor = "pointer";
      document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').style.cursor = "pointer";
      document.getElementById("id_EditPage_PathPlot_SmallTopCanvas_Div").style.borderBottom = "1px solid rgb(220,220,220)";


      document.getElementById("id_EditPage_PathPlot_ThreeCanvas").style.height = restHeight+"px";
      document.getElementById("id_EditPage_PathPlot_ThreeCanvas").style.width = restHeight*1.5+"px";
    }


    document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = restHeight+"px";
    document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = restHeight+"px";

    document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.display = "none";
    document.getElementById("id_EditPage_PathPlot_3D_Div").style.display = "inline-block";

    pathColorspace="rgb";
    document.getElementById("id_EditPage_Path_Label").innerHTML = "Path Plot : RGB";
    drawcolormap_RGBSpace(true,true);
    resize();
    animate();
  }
  else {

    document.getElementById("id_EditPage_PathPlot_SmallTopCanvas_Div").style.height="45%";
    document.getElementById("id_EditPage_PathPlot_SmallBottomCanvas_Div").style.height="45%";
    document.getElementById("id_EditPage_PathPlot_BigCanvas_SubDiv").style.height="95%";
    document.getElementById("id_EditPage_PathPlot_BigCanvas_Label").style.display="block";
    document.getElementById("id_EditPage_PathPlot_SmallCanvasTop_Label").style.display="block";
    document.getElementById("id_EditPage_PathPlot_SmallCanvasBottom_Label").style.display="block";

    document.getElementById("id_EditPage_PathPlot_SmallTopCanvas_Div").style.borderBottom = "1px solid rgb(220,220,220)";
    document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.display = "inline-block";
    document.getElementById("id_EditPage_PathPlot_3D_Div").style.display = "none";

    document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.height = restHeight+"px";
    document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.width = restHeight+"px";

    document.getElementById("id_EditPage_PathPlot_ThreeCanvas").style.height = restHeight+"px";
    document.getElementById("id_EditPage_PathPlot_ThreeCanvas").style.width = restHeight*3+"px";

    document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').addEventListener("click", switchPathPlotAssignment);
    document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').addEventListener("click", switchPathPlotAssignment);
    document.getElementById('id_EditPage_PathPlot_SmallTopCanvas_2').style.cursor = "pointer";
    document.getElementById('id_EditPage_PathPlot_SmallBottomCanvas_2').style.cursor = "pointer";

    document.getElementById('id_EditPage_PathPlot_BigCanvas_2').addEventListener("mouseleave", mouseLeaveValuePlot);
    document.getElementById('id_EditPage_PathPlot_BigCanvas_2').addEventListener("mousemove", mouseMoveValuePlot);
    document.getElementById('id_EditPage_PathPlot_BigCanvas_2').addEventListener("mousedown", mouseDownValuePlot);
    document.getElementById('id_EditPage_PathPlot_BigCanvas_2').addEventListener("mouseup", mouseUpColorspace);


    switch (type) {
        case 1: // HSV
          document.getElementById("id_editPage_PathPlotSpaces_HSV").style.background="rgb(76, 175, 80)";
          pathColorspace="hsv";
          document.getElementById("id_EditPage_Path_Label").innerHTML = "Path Plot : HSV";
          initPlotLabel("Hue", "Saturation", "Value");
          backgroundValue=100;
          break;
          case 2: // LAB
            document.getElementById("id_editPage_PathPlotSpaces_LAB").style.background="rgb(76, 175, 80)";
            pathColorspace="lab";
            initPlotLabel("Lightness", "Green-Red : A", "Blue-Yellow : B");
            document.getElementById("id_EditPage_Path_Label").innerHTML = "Path Plot : Lab";
            backgroundValue=65;
            break;
            case 3: // DIN99
            document.getElementById("id_editPage_PathPlotSpaces_DIN99").style.background="rgb(76, 175, 80)";
            pathColorspace="din99";
            initPlotLabel("Lightness", "Green-Red : A99", "Blue-Yellow : B99");
            document.getElementById("id_EditPage_Path_Label").innerHTML = "Path Plot : DIN99";
            backgroundValue=65;
              break;
      default:

    }

    drawcolormap_hueSpace(true, true, true);
  }


  document.getElementById("id_EditPage_PathPlotSpaces_Dropdown").style.display="none";
}

function switchPathPlotAssignment(event){


  var tmpVar = pathCanvasAssignmentBig;
  var tmpLabel =document.getElementById("id_EditPage_PathPlot_BigCanvas_Label").innerHTML;
  if(event.target.id==="id_EditPage_PathPlot_SmallTopCanvas_2"){
    pathCanvasAssignmentBig = pathCanvasAssignmentSmallTop;
    pathCanvasAssignmentSmallTop = tmpVar;

    document.getElementById("id_EditPage_PathPlot_BigCanvas_Label").innerHTML = document.getElementById("id_EditPage_PathPlot_SmallCanvasTop_Label").innerHTML;
    document.getElementById("id_EditPage_PathPlot_SmallCanvasTop_Label").innerHTML = tmpLabel;

  }
  else{
    pathCanvasAssignmentBig = pathCanvasAssignmentSmallBottom;
    pathCanvasAssignmentSmallBottom = tmpVar;

    document.getElementById("id_EditPage_PathPlot_BigCanvas_Label").innerHTML = document.getElementById("id_EditPage_PathPlot_SmallCanvasBottom_Label").innerHTML;
    document.getElementById("id_EditPage_PathPlot_SmallCanvasBottom_Label").innerHTML = tmpLabel;
  }

  if(pathColorspace==="rgb"){
    drawcolormap_RGBSpace(true,true);
  }
  else{
    drawcolormap_hueSpace(true, true, true);
  }


}

function initPlotLabel(label0, label1, label2){
  switch (pathCanvasAssignmentBig) {
    case 0:

      document.getElementById("id_EditPage_PathPlot_BigCanvas_Label").innerHTML=label0;

      if (pathCanvasAssignmentSmallTop==1) {
        document.getElementById("id_EditPage_PathPlot_SmallCanvasTop_Label").innerHTML=label1;
        document.getElementById("id_EditPage_PathPlot_SmallCanvasBottom_Label").innerHTML=label2;
      }
      else{
        document.getElementById("id_EditPage_PathPlot_SmallCanvasTop_Label").innerHTML=label2;
        document.getElementById("id_EditPage_PathPlot_SmallCanvasBottom_Label").innerHTML=label1;
      }

      break;
    case 1:

    document.getElementById("id_EditPage_PathPlot_BigCanvas_Label").innerHTML=label1;

    if (pathCanvasAssignmentSmallTop==0) {
      document.getElementById("id_EditPage_PathPlot_SmallCanvasTop_Label").innerHTML=label0;
      document.getElementById("id_EditPage_PathPlot_SmallCanvasBottom_Label").innerHTML=label2;
    }
    else{
      document.getElementById("id_EditPage_PathPlot_SmallCanvasTop_Label").innerHTML=label2;
      document.getElementById("id_EditPage_PathPlot_SmallCanvasBottom_Label").innerHTML=label0;
    }

      break;
    case 2:

    document.getElementById("id_EditPage_PathPlot_BigCanvas_Label").innerHTML=label2;

    if (pathCanvasAssignmentSmallTop==1) {
      document.getElementById("id_EditPage_PathPlot_SmallCanvasTop_Label").innerHTML=label1;
      document.getElementById("id_EditPage_PathPlot_SmallCanvasBottom_Label").innerHTML=label0;
    }
    else{
      document.getElementById("id_EditPage_PathPlot_SmallCanvasTop_Label").innerHTML=label0;
      document.getElementById("id_EditPage_PathPlot_SmallCanvasBottom_Label").innerHTML=label1;
    }

      break;
    default:

  }
}
