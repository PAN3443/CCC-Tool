

function choosePathPlotSpace(type){
//id_EditPage_PathPlot_ThreeCanvas

document.getElementById("id_editPage_PathPlotSpaces_RGB").classList.remove("class_EditPage_TabRowButtonActive");
document.getElementById("id_editPage_PathPlotSpaces_HSV").classList.remove("class_EditPage_TabRowButtonActive");
document.getElementById("id_editPage_PathPlotSpaces_LAB").classList.remove("class_EditPage_TabRowButtonActive");
document.getElementById("id_editPage_PathPlotSpaces_DIN99").classList.remove("class_EditPage_TabRowButtonActive");
document.getElementById("id_editPage_PathPlotSpaces_LCH").classList.remove("class_EditPage_TabRowButtonActive");

document.getElementById("id_editPage_PathPlotSpaces_RGB").classList.add("class_EditPage_TabRowButtonNotActive");
document.getElementById("id_editPage_PathPlotSpaces_HSV").classList.add("class_EditPage_TabRowButtonNotActive");
document.getElementById("id_editPage_PathPlotSpaces_LAB").classList.add("class_EditPage_TabRowButtonNotActive");
document.getElementById("id_editPage_PathPlotSpaces_DIN99").classList.add("class_EditPage_TabRowButtonNotActive");
document.getElementById("id_editPage_PathPlotSpaces_LCH").classList.add("class_EditPage_TabRowButtonNotActive");

  if(type==0){

    document.getElementById("id_editPage_PathPlotSpaces_RGB").classList.remove("class_EditPage_TabRowButtonNotActive");
    document.getElementById("id_editPage_PathPlotSpaces_RGB").classList.add("class_EditPage_TabRowButtonActive");
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
    var canvasDim = "";
    if (document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display != "none"){

      document.getElementById("id_EditPage_PathPlot_Container").style.display = "block";
      document.getElementById("id_EditPage_PathPlot_SubContainer1").appendChild(document.getElementById("id_EditPage_PathPlot_1_Container"));
      document.getElementById("id_EditPage_PathPlot_SubContainer1").appendChild(document.getElementById("id_EditPage_PathPlot_2_Container"));
      document.getElementById("id_EditPage_PathPlot_SubContainer2").appendChild(document.getElementById("id_EditPage_PathPlot_3_Container"));
      document.getElementById("id_EditPage_PathPlot_SubContainer2").appendChild(document.getElementById("id_EditPage_PathPlot_3D_Container"));


      /// width : 24vw
      // height 54vh - 2* 2vh (because of standardText labels)

      var tmpWidth = 12;

      if(document.getElementById("id_EditPage_Add_Structures").style.display == "none"){
        tmpWidth = 15;
      }

      // test possible
      document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = "25vh";
      document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = tmpWidth+"vw";

      var rect = document.getElementById("id_EditPage_PathPlot_3D_Div").getBoundingClientRect();


      if(rect.width<rect.height)
        canvasDim= tmpWidth+"vw";
      else
        canvasDim="25vh";

    }
    else {

      document.getElementById("id_EditPage_PathPlot_Container").style.display = "flex";
      document.getElementById("id_EditPage_PathPlot_SubContainer1").appendChild(document.getElementById("id_EditPage_PathPlot_1_Container"));
      document.getElementById("id_EditPage_PathPlot_SubContainer1").appendChild(document.getElementById("id_EditPage_PathPlot_2_Container"));
      document.getElementById("id_EditPage_PathPlot_SubContainer2").appendChild(document.getElementById("id_EditPage_PathPlot_3_Container"));
      document.getElementById("id_EditPage_PathPlot_SubContainer2").appendChild(document.getElementById("id_EditPage_PathPlot_3D_Container"));

      /// width : 80vw
      // height 54vh -  2vh (because of standardText labels)


      var tmpWidth = 20;

      if(document.getElementById("id_EditPage_Add_Structures").style.display == "none"){
        tmpWidth = 25;
      }

      document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = "52vh";
      document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = tmpWidth+"vw";
      var rect = document.getElementById("id_EditPage_PathPlot_3D_Div").getBoundingClientRect();

      if(rect.width<rect.height)
        canvasDim=tmpWidth+"vw";
      else
        canvasDim="52vh";

    }

    document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = canvasDim;
    document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = canvasDim;
    document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.height = canvasDim;
    document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.width = canvasDim;
    document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.height = canvasDim;
    document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.width = canvasDim;
    document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.height = canvasDim;
    document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.width = canvasDim;


    if(!browserCanOffscreenCanvas)
      pathplotCanvasToHTMLSize();

    drawcolormap_RGBSpace(true,true);
    rgbMesh();

  }
  else {

    document.getElementById('id_EditPage_PathPlot_SingleCanvasDiv').style.display = "block";

    switch (type) {
        case 1: // HSV
          document.getElementById("id_editPage_PathPlotSpaces_HSV").classList.remove("class_EditPage_TabRowButtonNotActive");
          document.getElementById("id_editPage_PathPlotSpaces_HSV").classList.add("class_EditPage_TabRowButtonActive");
          pathColorspace="hsv";
          initPlotLabel("Hue", "Saturation", "Value");
          document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "H : -, S: -, V: -";
          backgroundValue=100;
          hsvMesh();
          break;
          case 2: // LAB
            document.getElementById("id_editPage_PathPlotSpaces_LAB").classList.remove("class_EditPage_TabRowButtonNotActive");
            document.getElementById("id_editPage_PathPlotSpaces_LAB").classList.add("class_EditPage_TabRowButtonActive");
            pathColorspace="lab";
            initPlotLabel("Lightness", "Green-Red : A", "Blue-Yellow : B");
            document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L : -, a: -, b: -";
            backgroundValue=65;
            labMesh();
            break;
            case 3: // DIN99
              document.getElementById("id_editPage_PathPlotSpaces_DIN99").classList.remove("class_EditPage_TabRowButtonNotActive");
              document.getElementById("id_editPage_PathPlotSpaces_DIN99").classList.add("class_EditPage_TabRowButtonActive");
              pathColorspace="din99";
              initPlotLabel("Lightness", "Green-Red : A99", "Blue-Yellow : B99");
              document.getElementById("id_EditPage_PathPlot_PositionLabel").innerHTML = "L99 : -, a99: -, b99: -";
              backgroundValue=65;
              din99Mesh();
            break;
            case 4: // LCH
              document.getElementById("id_editPage_PathPlotSpaces_LCH").classList.remove("class_EditPage_TabRowButtonNotActive");
              document.getElementById("id_editPage_PathPlotSpaces_LCH").classList.add("class_EditPage_TabRowButtonActive");
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


      document.getElementById("id_EditPage_PathPlot_SubContainer1").style.display = "block";
      document.getElementById("id_EditPage_PathPlot_SubContainer2").style.display = "flex";
      document.getElementById("id_EditPage_PathPlot_SubContainer1").appendChild(document.getElementById("id_EditPage_PathPlot_1_Container"));
      document.getElementById("id_EditPage_PathPlot_SubContainer1").appendChild(document.getElementById("id_EditPage_PathPlot_2_Container"));
      document.getElementById("id_EditPage_PathPlot_SubContainer1").appendChild(document.getElementById("id_EditPage_PathPlot_3_Container"));
      //document.getElementById("id_EditPage_PathPlot_SubContainer2").appendChild(document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv"));
      document.getElementById("id_EditPage_PathPlot_SubContainer2").appendChild(document.getElementById("id_EditPage_PathPlot_3D_Container"));


      if (document.getElementById("id_editPage_AnalyzeMappingProbeSetDiv").style.display != "none"){
        /// width : 24vw
        // height 54vh - 3* 2vh (because of standardText labels)


        document.getElementById("id_EditPage_PathPlot_Container").style.display = "block";


        canvasDim="24vw";
        var canvasDimHalf="12vw";
        if(document.getElementById("id_EditPage_Add_Structures").style.display == "none"){
          canvasDim="30vw";
          canvasDimHalf="15vw";
        }

        canvasDim2="11vh";
        document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.height = canvasDim2;
        document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.width = canvasDimHalf;


        var rect = document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").getBoundingClientRect();

        /*if(rect.width<rect.height){
          canvasDim2=canvasDim;
        }*/


          document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.height = canvasDim2;
          document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.width = canvasDim2;

          document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = canvasDim2;
          document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = canvasDimHalf;

        document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.height = canvasDim2;
        document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.width = canvasDim;
        document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.height = canvasDim2;
        document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.width = canvasDim;
        document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.height = canvasDim2;
        document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.width = canvasDim;

      }
      else {

        document.getElementById("id_EditPage_PathPlot_Container").style.display = "flex";


        /// width : 80vw
        // height 54vh -  2vh (because of standardText labels)

        canvasDim="20vw"
        var canvasDim3="40vw"

        if(document.getElementById("id_EditPage_Add_Structures").style.display == "none"){
          canvasDim="25vw"
          canvasDim3="50vw"
        }


        canvasDim2="52vh"
        document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.height = canvasDim2;
        document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.width = canvasDim;
        var rect = document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").getBoundingClientRect();

        if(rect.width<rect.height)
          canvasDim2=canvasDim;

          document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.height = canvasDim2;
          document.getElementById("id_EditPage_PathPlot_SingleCanvasDiv").style.width = canvasDim2;

          document.getElementById("id_EditPage_PathPlot_3D_Div").style.height = canvasDim2;
          document.getElementById("id_EditPage_PathPlot_3D_Div").style.width = canvasDim2;

        document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.height = "15vh";//canvasDim2;
        document.getElementById("id_EditPage_PathPlot_Canvas1_Div").style.width = canvasDim3;//canvasDim;
        document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.height = "15vh";//canvasDim2;
        document.getElementById("id_EditPage_PathPlot_Canvas2_Div").style.width = canvasDim3;//canvasDim;
        document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.height = "15vh";//canvasDim2;
        document.getElementById("id_EditPage_PathPlot_Canvas3_Div").style.width = canvasDim3;//canvasDim;

      }

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
