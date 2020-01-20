

function choosePathPlotSpace(type){
//id_EditPage_PathPlot_ThreeCanvas

document.getElementById("id_editPage_PathPlotSpaces_RGB").classList.remove("class_TabRowButtonActive");
document.getElementById("id_editPage_PathPlotSpaces_HSV").classList.remove("class_TabRowButtonActive");
document.getElementById("id_editPage_PathPlotSpaces_LAB").classList.remove("class_TabRowButtonActive");
document.getElementById("id_editPage_PathPlotSpaces_DIN99").classList.remove("class_TabRowButtonActive");
document.getElementById("id_editPage_PathPlotSpaces_LCH").classList.remove("class_TabRowButtonActive");

document.getElementById("id_editPage_PathPlotSpaces_RGB").classList.add("class_TabRowButtonNotActive");
document.getElementById("id_editPage_PathPlotSpaces_HSV").classList.add("class_TabRowButtonNotActive");
document.getElementById("id_editPage_PathPlotSpaces_LAB").classList.add("class_TabRowButtonNotActive");
document.getElementById("id_editPage_PathPlotSpaces_DIN99").classList.add("class_TabRowButtonNotActive");
document.getElementById("id_editPage_PathPlotSpaces_LCH").classList.add("class_TabRowButtonNotActive");

  if(type==0){

    document.getElementById("id_editPage_PathPlotSpaces_RGB").classList.remove("class_TabRowButtonNotActive");
    document.getElementById("id_editPage_PathPlotSpaces_RGB").classList.add("class_TabRowButtonActive");
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


    document.getElementById("id_EditPage_PathPlot_SubContainer1").style.display = "flex";
    document.getElementById("id_EditPage_PathPlot_SubContainer2").style.display = "flex";

    //// height 54vh
    var tmpHeight = 0;
    var tmpWidth = 0;

    if(editPage_optimizationMode){
      document.getElementById("id_EditPage_PathPlot_Container").style.display = "block";
      tmpHeight = 25;
      tmpWidth = 20;
    }
    else {
      if (document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display != "none"){

        document.getElementById("id_EditPage_PathPlot_Container").style.display = "block";
        /// width : 24vw
        // height 54vh - 2* 2vh (because of standardText labels)
        tmpHeight = 25;
        tmpWidth = 12;
        if(document.getElementById("id_EditPage_Add_Structures_Optimization").style.display == "none"){
          tmpWidth = 15;
        }
      }
      else {

        document.getElementById("id_EditPage_PathPlot_Container").style.display = "flex";
        /// width : 80vw
        // height 54vh -  2vh (because of standardText labels)
        tmpHeight = 45;
        tmpWidth = 20;
        if(document.getElementById("id_EditPage_Add_Structures_Optimization").style.display == "none"){
          tmpWidth = 25;
        }
      }
    }

    document.getElementById("id_EditPage_PathPlot_SubContainer1").appendChild(document.getElementById("id_EditPage_PathPlot_1_Container"));
    document.getElementById("id_EditPage_PathPlot_SubContainer1").appendChild(document.getElementById("id_EditPage_PathPlot_2_Container"));
    document.getElementById("id_EditPage_PathPlot_SubContainer2").appendChild(document.getElementById("id_EditPage_PathPlot_3_Container"));
    document.getElementById("id_EditPage_PathPlot_SubContainer2").appendChild(document.getElementById("id_EditPage_PathPlot_3D_Container"));

    document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = tmpHeight+"vh";
    document.getElementById("id_EditPage_PathPlot_3D_Div").style.maxHeight = tmpWidth+"vw";
    document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = tmpWidth+"vw";
    document.getElementById("id_EditPage_PathPlot_3D_Div").style.maxWidth = tmpHeight+"vh";

    document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.height = tmpHeight+"vh";
    document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.maxHeight = tmpWidth+"vw";
    document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.width = tmpWidth+"vw";
    document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.maxWidth = tmpHeight+"vh";

    document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.height = tmpHeight+"vh";
    document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.maxHeight = tmpWidth+"vw";
    document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.width = tmpWidth+"vw";
    document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.maxWidth = tmpHeight+"vh";

    document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.height = tmpHeight+"vh";
    document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.maxHeight = tmpWidth+"vw";
    document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.width = tmpWidth+"vw";
    document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.maxWidth = tmpHeight+"vh";

    if(!browserCanOffscreenCanvas)
      pathplotCanvasToHTMLSize();

    drawcolormap_RGBSpace(true,true);

  }
  else {
    document.getElementById('id_EditPage_PathPlot_SingleCanvasDiv').style.display = "block";
    switch (type) {
        case 1: // HSV
          document.getElementById("id_editPage_PathPlotSpaces_HSV").classList.remove("class_TabRowButtonNotActive");
          document.getElementById("id_editPage_PathPlotSpaces_HSV").classList.add("class_TabRowButtonActive");
          pathColorspace="hsv";
          initPlotLabel("Hue", "Saturation", "Value");
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "H : -, S: -, V: -";
          backgroundValue=100;
          hsvMesh();
          break;
          case 2: // LAB
            document.getElementById("id_editPage_PathPlotSpaces_LAB").classList.remove("class_TabRowButtonNotActive");
            document.getElementById("id_editPage_PathPlotSpaces_LAB").classList.add("class_TabRowButtonActive");
            pathColorspace="lab";
            initPlotLabel("Lightness", "Green-Red : A", "Blue-Yellow : B");
            document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L : -, a: -, b: -";
            backgroundValue=65;
            labMesh();
            break;
            case 3: // DIN99
              document.getElementById("id_editPage_PathPlotSpaces_DIN99").classList.remove("class_TabRowButtonNotActive");
              document.getElementById("id_editPage_PathPlotSpaces_DIN99").classList.add("class_TabRowButtonActive");
              pathColorspace="din99";
              initPlotLabel("Lightness", "Green-Red : A99", "Blue-Yellow : B99");
              document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L99 : -, a99: -, b99: -";
              backgroundValue=65;
              din99Mesh();
            break;
            case 4: // LCH
              document.getElementById("id_editPage_PathPlotSpaces_LCH").classList.remove("class_TabRowButtonNotActive");
              document.getElementById("id_editPage_PathPlotSpaces_LCH").classList.add("class_TabRowButtonActive");
              pathColorspace="lch";
              initPlotLabel("Lightness", "Chroma", "Hue");
              document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L : -, C : -, H: -";
              backgroundValue=0.65;
              lchMesh();
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
    /*document.getElementById("id_EditPage_TopDiv").style.display = "block";
    document.getElementById("id_EditPage_BottomDiv").style.display = "block";*/

      var canvasDim = "";
      var canvasDim2 = "";

      var tmpHeightVPlot = 0;
      var tmpHeightSingle = 0;
      var tmpWidthSingle = 0;
      var tmpWidthVPlot =0;


      document.getElementById("id_EditPage_PathPlot_SubContainer1").style.display = "block";
      document.getElementById("id_EditPage_PathPlot_SubContainer2").style.display = "flex";
      document.getElementById("id_EditPage_PathPlot_SubContainer1").appendChild(document.getElementById("id_EditPage_PathPlot_1_Container"));
      document.getElementById("id_EditPage_PathPlot_SubContainer1").appendChild(document.getElementById("id_EditPage_PathPlot_2_Container"));
      document.getElementById("id_EditPage_PathPlot_SubContainer1").appendChild(document.getElementById("id_EditPage_PathPlot_3_Container"));
      //document.getElementById("id_EditPage_PathPlot_SubContainer2").appendChild(document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv"));
      document.getElementById("id_EditPage_PathPlot_SubContainer2").appendChild(document.getElementById("id_EditPage_PathPlot_3D_Container"));


      if(editPage_optimizationMode){
          document.getElementById("id_EditPage_PathPlot_Container").style.display = "flex";
          document.getElementById("id_EditPage_PathPlot_SubContainer2").style.display = "block";

          /// width : 50vw
          // height 54vh -  2vh (because of standardText labels)

          tmpWidthVPlot=25;
          tmpWidthSingle=20;
          tmpHeightVPlot=15;
          tmpHeightSingle=20;
      }
      else {
        if (document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display != "none"){
          /// width : 24vw
          // height 54vh - 3* 2vh (because of standardText labels)
          document.getElementById("id_EditPage_PathPlot_Container").style.display = "block";

          tmpWidthVPlot=24;
          tmpWidthSingle=12;
          if(document.getElementById("id_EditPage_Add_Structures_Optimization").style.display == "none"){
            tmpWidthVPlot=30;
            tmpWidthSingle=15;
          }

          tmpHeightVPlot=10;
          tmpHeightSingle=15;

        }
        else {

          document.getElementById("id_EditPage_PathPlot_Container").style.display = "flex";

          /// width : 80vw
          // height 54vh -  2vh (because of standardText labels)

          tmpWidthVPlot=40;
          tmpWidthSingle=20;
          if(document.getElementById("id_EditPage_Add_Structures_Optimization").style.display == "none"){
            tmpWidthVPlot=50;
            tmpWidthSingle=25;
          }

          tmpHeightVPlot=15;
          tmpHeightSingle=40;

        }
      }

      document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.height = tmpHeightSingle+"vh";
      document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.maxHeight = tmpWidthSingle+"vw";
      document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.width = tmpWidthSingle+"vw";
      document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.maxWidth = tmpHeightSingle+"vh";

      document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = tmpHeightSingle+"vh";
      document.getElementById("id_EditPage_PathPlot_3D_Div").style.maxHeight = tmpWidthSingle+"vw";
      document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = tmpWidthSingle+"vw";
      document.getElementById("id_EditPage_PathPlot_3D_Div").style.maxWidth = tmpHeightSingle+"vh";

      document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.height = tmpHeightVPlot+"vh";
      document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.maxHeight = tmpHeightVPlot+"vh";
      document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.width = tmpWidthVPlot+"vw";
      document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.maxWidth = tmpWidthVPlot+"vw";

      document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.height = tmpHeightVPlot+"vh";
      document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.maxHeight = tmpHeightVPlot+"vh";
      document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.width = tmpWidthVPlot+"vw";
      document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.maxWidth = tmpWidthVPlot+"vw";

      document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.height = tmpHeightVPlot+"vh";
      document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.maxHeight = tmpHeightVPlot+"vh";
      document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.width = tmpWidthVPlot+"vw";
      document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.maxWidth = tmpWidthVPlot+"vw";



    if(!browserCanOffscreenCanvas)
      pathplotCanvasToHTMLSize();
    drawcolormap_hueSpace(true, true, true);
  }

  pathPlot3D_Resize();

}


function pathplotCanvasToHTMLSize(){
  canvasToHTMLSize("id_EditPage_PathPlot_Canvas1_0");
  canvasToHTMLSize("id_EditPage_PathPlot_Canvas2_0");
  canvasToHTMLSize("id_EditPage_PathPlot_Canvas3_0");
  canvasToHTMLSize("id_EditPage_PathPlot_Canvas1_1");
  canvasToHTMLSize("id_EditPage_PathPlot_Canvas2_1");
  canvasToHTMLSize("id_EditPage_PathPlot_Canvas3_1");
  canvasToHTMLSize("id_EditPage_PathPlot_Canvas1_2");
  canvasToHTMLSize("id_EditPage_PathPlot_Canvas2_2");
  canvasToHTMLSize("id_EditPage_PathPlot_Canvas3_2");
  canvasToHTMLSize("id_EditPage_PathPlot_SingleCanvas_0");


}

function initPlotLabel(label0, label1, label2){
  document.getElementById("id_EditPage_PathPlot_Canvas1_Label").innerHTML = label0;
  document.getElementById("id_EditPage_PathPlot_Canvas2_Label").innerHTML = label1;
  document.getElementById("id_EditPage_PathPlot_Canvas3_Label").innerHTML = label2;
}
