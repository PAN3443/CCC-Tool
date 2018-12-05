

function choosePathPlotSpace(type){
//id_EditPage_PathPlot_ThreeCanvas


document.getElementById("id_editPage_PathPlotSpaces_RGB").style.background = 'none';
document.getElementById("id_editPage_PathPlotSpaces_HSV").style.background = 'none';
document.getElementById("id_editPage_PathPlotSpaces_LAB").style.background = 'none';
document.getElementById("id_editPage_PathPlotSpaces_DIN99").style.background = 'none';

  stopAnimation();



  if(type==0){

    document.getElementById("id_editPage_PathPlotSpaces_RGB").style.background="grey";
    initPlotLabel("RG", "RB", "BG");
    pathColorspace="rgb";
    document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "R : -, G: -, B: -";


    document.getElementById('id_EditPage_PathPlot_SingleCanvasDiv').style.display = "none";

    document.getElementById('id_EditPage_PathPlot_Canvas1_2').removeEventListener("mouseleave", mouseLeaveValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').removeEventListener("mousemove", mouseMoveValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').removeEventListener("mousedown", mouseDownValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').removeEventListener("mouseup", mouseUpColorspace);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').addEventListener("mousemove", mouseMoveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').addEventListener("mousedown", mouseDownColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').addEventListener("mouseup", mouseUpColorspaceRGB);

    document.getElementById('id_EditPage_PathPlot_Canvas2_2').removeEventListener("mouseleave", mouseLeaveValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').removeEventListener("mousemove", mouseMoveValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').removeEventListener("mousedown", mouseDownValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').removeEventListener("mouseup", mouseUpColorspace);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').addEventListener("mousemove", mouseMoveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').addEventListener("mousedown", mouseDownColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').addEventListener("mouseup", mouseUpColorspaceRGB);

    document.getElementById('id_EditPage_PathPlot_Canvas3_2').removeEventListener("mouseleave", mouseLeaveValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').removeEventListener("mousemove", mouseMoveValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').removeEventListener("mousedown", mouseDownValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').removeEventListener("mouseup", mouseUpColorspace);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').addEventListener("mouseleave", mouseLeaveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').addEventListener("mousemove", mouseMoveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').addEventListener("mousedown", mouseDownColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').addEventListener("mouseup", mouseUpColorspaceRGB);

    // style

    document.getElementById("id_EditPage_TopDiv").style.display = "flex";
    document.getElementById("id_EditPage_BottomDiv").style.display = "flex";
    document.getElementById("id_EditPage_PathPlot_3D_Container").style.display = "block";



    //// height 54vh


    var canvasDim = "";
    if (document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display != "none"){
      /// width : 24vw
      // height 54vh - 2* 2vh (because of standardText labels)

      // test possible
      document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = "25vh";
      document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = "12vw";

      var rect = document.getElementById("id_EditPage_PathPlot_3D_Div").getBoundingClientRect();


      if(rect.width<rect.height)
        canvasDim="12vw";
      else
        canvasDim="25vh";

      document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = canvasDim;
      document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = canvasDim;
      document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.height = canvasDim;
      document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.width = canvasDim;
      document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.height = canvasDim;
      document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.width = canvasDim;
      document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.height = canvasDim;
      document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.width = canvasDim;
    }
    else {

      /// width : 80vw
      // height 54vh -  2vh (because of standardText labels)

      document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = "25vh";
      document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = "20vw";
      var rect = document.getElementById("id_EditPage_PathPlot_3D_Div").getBoundingClientRect();
      console.log(rect.width+":"+rect.height);
      if(rect.width<rect.height)
        canvasDim="10vw";
      else
        canvasDim="52vh";
canvasDim="20vw";
      document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = canvasDim;
      document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = canvasDim;
      document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.height = canvasDim;
      document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.width = canvasDim;
      document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.height = canvasDim;
      document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.width = canvasDim;
      document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.height = canvasDim;
      document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.width = canvasDim;
    }
    console.log(canvasDim);

    drawcolormap_RGBSpace(true,true);
    resize();
    animate();

  }
  else {
    // Attention!!!!!!
    return;
    document.getElementById('id_EditPage_PathPlot_SingleCanvasDiv').style.display = "block";

    switch (type) {
        case 1: // HSV
          document.getElementById("id_editPage_PathPlotSpaces_HSV").style.background="grey";
          pathColorspace="hsv";
          initPlotLabel("Hue", "Saturation", "Value");
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "H : -, S: -, V: -";
          backgroundValue=100;
          break;
          case 2: // LAB
            document.getElementById("id_editPage_PathPlotSpaces_LAB").style.background="grey";
            pathColorspace="lab";
            initPlotLabel("Lightness", "Green-Red : A", "Blue-Yellow : B");
            document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L : -, a: -, b: -";
            backgroundValue=65;
            break;
            case 3: // DIN99
            document.getElementById("id_editPage_PathPlotSpaces_DIN99").style.background="grey";
            pathColorspace="din99";
            initPlotLabel("Lightness", "Green-Red : A99", "Blue-Yellow : B99");
            document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L99 : -, a99: -, b99: -";
            backgroundValue=65;
              break;
      default:

    }

    document.getElementById('id_EditPage_PathPlot_Canvas1_2').addEventListener("mouseleave", mouseLeaveValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').addEventListener("mousemove", mouseMoveValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').addEventListener("mousedown", mouseDownValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').addEventListener("mouseup", mouseUpColorspace);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').removeEventListener("mouseleave", mouseLeaveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').removeEventListener("mousemove", mouseMoveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').removeEventListener("mousedown", mouseDownColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas1_2').removeEventListener("mouseup", mouseUpColorspaceRGB);

    document.getElementById('id_EditPage_PathPlot_Canvas2_2').addEventListener("mouseleave", mouseLeaveValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').addEventListener("mousemove", mouseMoveValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').addEventListener("mousedown", mouseDownValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').addEventListener("mouseup", mouseUpColorspace);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').removeEventListener("mouseleave", mouseLeaveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').removeEventListener("mousemove", mouseMoveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').removeEventListener("mousedown", mouseDownColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas2_2').removeEventListener("mouseup", mouseUpColorspaceRGB);

    document.getElementById('id_EditPage_PathPlot_Canvas3_2').addEventListener("mouseleave", mouseLeaveValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').addEventListener("mousemove", mouseMoveValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').addEventListener("mousedown", mouseDownValuePlot);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').addEventListener("mouseup", mouseUpColorspace);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').removeEventListener("mouseleave", mouseLeaveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').removeEventListener("mousemove", mouseMoveColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').removeEventListener("mousedown", mouseDownColorspaceRGB);
    document.getElementById('id_EditPage_PathPlot_Canvas3_2').removeEventListener("mouseup", mouseUpColorspaceRGB);

    // style
    document.getElementById("id_EditPage_TopDiv").style.display = "block";
    document.getElementById("id_EditPage_BottomDiv").style.display = "block";
    document.getElementById("id_EditPage_PathPlot_3D_Container").style.display = "none";

    var possibleCanvasWidth = rect.width*1/2;
    var possibleCanvasHeight = (rect.height-(rect2.height*3))/4;

    var canvasDim = 0;

    if(possibleCanvasWidth<possibleCanvasHeight)
      canvasDim=possibleCanvasWidth;
    else
      canvasDim=possibleCanvasHeight;

    document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.height = canvasDim+"px";
    document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.width = canvasDim+"px";

    document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.height = possibleCanvasHeight+"px";
    document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.width = rect.width+"px";
    document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.height = possibleCanvasHeight+"px";
    document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.width = rect.width+"px";
    document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.height = possibleCanvasHeight+"px";
    document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.width = rect.width+"px";


    drawcolormap_hueSpace(true, true, true);
  }

}


function initPlotLabel(label0, label1, label2){
  document.getElementById("id_EditPage_PathPlot_Canvas1_Label").innerHTML = label0;
  document.getElementById("id_EditPage_PathPlot_Canvas2_Label").innerHTML = label1;
  document.getElementById("id_EditPage_PathPlot_Canvas3_Label").innerHTML = label2;
}
