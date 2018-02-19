function updateComparePage(){

  if(document.getElementById("compareIntSpace").style.display!="none"){
    drawCompareMapPreviews();
    return;
  }

  if(document.getElementById("compareColormapPath").style.display!="none"){
    intervalSize=100;
    initRGB3D();
    changeCourseSpaceCompare();
    return;
  }

  if(document.getElementById("compareGlobalSpeed").style.display!="none"){
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
    calcGlobalSpeedPlot(intervalColormap, "compare1_GlobalSpeed_Canvas_Lab", 0, "compare1_GlobalSpeed_Label_Min_Lab", "compare1_GlobalSpeed_Label_Max_Lab", "compare1_GlobalSpeed_Label_Av_Lab", "compare1_GlobalSpeed_Label_Dev_Lab");
    calcGlobalSpeedPlot(intervalColormap,"compare1_GlobalSpeed_Canvas_de94", 1, "compare1_GlobalSpeed_Label_Min_de94", "compare1_GlobalSpeed_Label_Max_de94", "compare1_GlobalSpeed_Label_Av_de94", "compare1_GlobalSpeed_Label_Dev_de94");
    calcGlobalSpeedPlot(intervalColormap,"compare1_GlobalSpeed_Canvas_de2000", 2, "compare1_GlobalSpeed_Label_Min_de2000", "compare1_GlobalSpeed_Label_Max_de2000", "compare1_GlobalSpeed_Label_Av_de2000", "compare1_GlobalSpeed_Label_Dev_de2000");
    calcGlobalSpeedPlot(intervalColormap,"compare1_GlobalSpeed_Canvas_din99", 3, "compare1_GlobalSpeed_Label_Min_din99", "compare1_GlobalSpeed_Label_Max_din99", "compare1_GlobalSpeed_Label_Av_din99", "compare1_GlobalSpeed_Label_Dev_din99");
    intervalColormap = globalColormap2.calcColorMap(intervalSize, colorspaceModus);
    calcGlobalSpeedPlot(intervalColormap, "compare2_GlobalSpeed_Canvas_Lab", 0, "compare2_GlobalSpeed_Label_Min_Lab", "compare2_GlobalSpeed_Label_Max_Lab", "compare2_GlobalSpeed_Label_Av_Lab", "compare2_GlobalSpeed_Label_Dev_Lab");
    calcGlobalSpeedPlot(intervalColormap,"compare2_GlobalSpeed_Canvas_de94", 1, "compare2_GlobalSpeed_Label_Min_de94", "compare2_GlobalSpeed_Label_Max_de94", "compare2_GlobalSpeed_Label_Av_de94", "compare2_GlobalSpeed_Label_Dev_de94");
    calcGlobalSpeedPlot(intervalColormap,"compare2_GlobalSpeed_Canvas_de2000", 2, "compare2_GlobalSpeed_Label_Min_de2000", "compare2_GlobalSpeed_Label_Max_de2000", "compare2_GlobalSpeed_Label_Av_de2000", "compare2_GlobalSpeed_Label_Dev_de2000");
    calcGlobalSpeedPlot(intervalColormap,"compare2_GlobalSpeed_Canvas_din99", 3, "compare2_GlobalSpeed_Label_Min_din99", "compare2_GlobalSpeed_Label_Max_din99", "compare2_GlobalSpeed_Label_Av_din99", "compare2_GlobalSpeed_Label_Dev_din99");
    return;
  }

  if(document.getElementById("compareLocalBarSpeed").style.display!="none"){
    drawCompareDifferenceMaps();
    return;
  }

  if(document.getElementById("compareLocalLineSpeed").style.display!="none"){
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
    calcLocalSpeedPlot(intervalColormap, "compare1_LocalSpeed_Canvas_Lab", 0, "compare1_LocalSpeed_Label_Min_Lab", "compare1_LocalSpeed_Label_Max_Lab", "compare1_LocalSpeed_Label_Av_Lab", "compare1_LocalSpeed_Label_Dev_Lab");
    calcLocalSpeedPlot(intervalColormap,"compare1_LocalSpeed_Canvas_de94", 1, "compare1_LocalSpeed_Label_Min_de94", "compare1_LocalSpeed_Label_Max_de94", "compare1_LocalSpeed_Label_Av_de94", "compare1_LocalSpeed_Label_Dev_de94");
    calcLocalSpeedPlot(intervalColormap,"compare1_LocalSpeed_Canvas_de2000", 2, "compare1_LocalSpeed_Label_Min_de2000", "compare1_LocalSpeed_Label_Max_de2000", "compare1_LocalSpeed_Label_Av_de2000", "compare1_LocalSpeed_Label_Dev_de2000");
    calcLocalSpeedPlot(intervalColormap,"compare1_LocalSpeed_Canvas_din99", 3, "compare1_LocalSpeed_Label_Min_din99", "compare1_LocalSpeed_Label_Max_din99", "compare1_LocalSpeed_Label_Av_din99", "compare1_LocalSpeed_Label_Dev_din99");
    intervalColormap = globalColormap2.calcColorMap(intervalSize, colorspaceModus);
    calcLocalSpeedPlot(intervalColormap, "compare2_LocalSpeed_Canvas_Lab", 0, "compare2_LocalSpeed_Label_Min_Lab", "compare2_LocalSpeed_Label_Max_Lab", "compare2_LocalSpeed_Label_Av_Lab", "compare2_LocalSpeed_Label_Dev_Lab");
    calcLocalSpeedPlot(intervalColormap,"compare2_LocalSpeed_Canvas_de94", 1, "compare2_LocalSpeed_Label_Min_de94", "compare2_LocalSpeed_Label_Max_de94", "compare2_LocalSpeed_Label_Av_de94", "compare2_LocalSpeed_Label_Dev_de94");
    calcLocalSpeedPlot(intervalColormap,"compare2_LocalSpeed_Canvas_de2000", 2, "compare2_LocalSpeed_Label_Min_de2000", "compare2_LocalSpeed_Label_Max_de2000", "compare2_LocalSpeed_Label_Av_de2000", "compare2_LocalSpeed_Label_Dev_de2000");
    calcLocalSpeedPlot(intervalColormap,"compare2_LocalSpeed_Canvas_din99", 3, "compare2_LocalSpeed_Label_Min_din99", "compare2_LocalSpeed_Label_Max_din99", "compare2_LocalSpeed_Label_Av_din99", "compare2_LocalSpeed_Label_Dev_din99");
    return;
  }

  if(document.getElementById("compareOrder").style.display!="none"){
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
    calcOrderPlot(intervalColormap, "compare1_OrderSpeed_Canvas_Lab", 0, "compare1_OrderSpeed_Label_Min_Lab", "compare1_OrderSpeed_Label_MinGlobal_Lab");
    calcOrderPlot(intervalColormap,"compare1_OrderSpeed_Canvas_de94", 1, "compare1_OrderSpeed_Label_Min_de94", "compare1_OrderSpeed_Label_MinGlobal_de94");
    calcOrderPlot(intervalColormap,"compare1_OrderSpeed_Canvas_de2000", 2, "compare1_OrderSpeed_Label_Min_de2000", "compare1_OrderSpeed_Label_MinGlobal_de2000");
    calcOrderPlot(intervalColormap,"compare1_OrderSpeed_Canvas_din99", 3, "compare1_OrderSpeed_Label_Min_din99", "compare1_OrderSpeed_Label_MinGlobal_din99");
    intervalColormap = globalColormap2.calcColorMap(intervalSize, colorspaceModus);
    calcOrderPlot(intervalColormap, "compare2_OrderSpeed_Canvas_Lab", 0, "compare2_OrderSpeed_Label_Min_Lab", "compare2_OrderSpeed_Label_MinGlobal_Lab");
    calcOrderPlot(intervalColormap,"compare2_OrderSpeed_Canvas_de94", 1, "compare2_OrderSpeed_Label_Min_de94", "compare2_OrderSpeed_Label_MinGlobal_de94");
    calcOrderPlot(intervalColormap,"compare2_OrderSpeed_Canvas_de2000", 2, "compare2_OrderSpeed_Label_Min_de2000", "compare2_OrderSpeed_Label_MinGlobal_de2000");
    calcOrderPlot(intervalColormap,"compare2_OrderSpeed_Canvas_din99", 3, "compare2_OrderSpeed_Label_Min_din99", "compare2_OrderSpeed_Label_MinGlobal_din99");
    return;
  }

}

function changePlotTypeCompare(type){
  plotType=type;

  switch (type) {
    case 0:
      document.getElementById("button_AnalyzeDifferenceMatrix").style.border = "0.2vh solid black";
      document.getElementById("button_AnalyzeDifferenceMatrix").style.color = "black";
      document.getElementById("button_AnalyzeSpeedMatrix").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_AnalyzeSpeedMatrix").style.color = styleActiveColor;
      document.getElementById("button_AnalyzeDifferenceLine").style.border = "0.2vh solid black";
      document.getElementById("button_AnalyzeDifferenceLine").style.color = "black";
      document.getElementById("button_AnalyzeSpeedLine").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_AnalyzeSpeedLine").style.color = styleActiveColor;
      document.getElementById("button_CompareDifferenceMatrix").style.border = "0.2vh solid black";
      document.getElementById("button_CompareDifferenceMatrix").style.color = "black";
      document.getElementById("button_CompareSpeedMatrix").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_CompareSpeedMatrix").style.color = styleActiveColor;
      document.getElementById("button_CompareDifferenceLine").style.border = "0.2vh solid black";
      document.getElementById("button_CompareDifferenceLine").style.color = "black";
      document.getElementById("button_CompareSpeedLine").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_CompareSpeedLine").style.color = styleActiveColor;
      break;
      case 1:
      document.getElementById("button_AnalyzeSpeedMatrix").style.border = "0.2vh solid black";
      document.getElementById("button_AnalyzeSpeedMatrix").style.color = "black";
        document.getElementById("button_AnalyzeDifferenceMatrix").style.border = "0.2vh solid "+styleActiveColor;
        document.getElementById("button_AnalyzeDifferenceMatrix").style.color = styleActiveColor;
        document.getElementById("button_AnalyzeSpeedLine").style.border = "0.2vh solid black";
        document.getElementById("button_AnalyzeSpeedLine").style.color = "black";
          document.getElementById("button_AnalyzeDifferenceLine").style.border = "0.2vh solid "+styleActiveColor;
          document.getElementById("button_AnalyzeDifferenceLine").style.color = styleActiveColor;
          document.getElementById("button_CompareSpeedMatrix").style.border = "0.2vh solid black";
          document.getElementById("button_CompareSpeedMatrix").style.color = "black";
            document.getElementById("button_CompareDifferenceMatrix").style.border = "0.2vh solid "+styleActiveColor;
            document.getElementById("button_CompareDifferenceMatrix").style.color = styleActiveColor;
            document.getElementById("button_CompareSpeedLine").style.border = "0.2vh solid black";
            document.getElementById("button_CompareSpeedLine").style.color = "black";
              document.getElementById("button_CompareDifferenceLine").style.border = "0.2vh solid "+styleActiveColor;
              document.getElementById("button_CompareDifferenceLine").style.color = styleActiveColor;
        break;
    default:


  }


  if(document.getElementById("compareGlobalSpeed").style.display!="none"){
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
    calcGlobalSpeedPlot(intervalColormap, "compare1_GlobalSpeed_Canvas_Lab", 0, "compare1_GlobalSpeed_Label_Min_Lab", "compare1_GlobalSpeed_Label_Max_Lab", "compare1_GlobalSpeed_Label_Av_Lab", "compare1_GlobalSpeed_Label_Dev_Lab");
    calcGlobalSpeedPlot(intervalColormap,"compare1_GlobalSpeed_Canvas_de94", 1, "compare1_GlobalSpeed_Label_Min_de94", "compare1_GlobalSpeed_Label_Max_de94", "compare1_GlobalSpeed_Label_Av_de94", "compare1_GlobalSpeed_Label_Dev_de94");
    calcGlobalSpeedPlot(intervalColormap,"compare1_GlobalSpeed_Canvas_de2000", 2, "compare1_GlobalSpeed_Label_Min_de2000", "compare1_GlobalSpeed_Label_Max_de2000", "compare1_GlobalSpeed_Label_Av_de2000", "compare1_GlobalSpeed_Label_Dev_de2000");
    calcGlobalSpeedPlot(intervalColormap,"compare1_GlobalSpeed_Canvas_din99", 3, "compare1_GlobalSpeed_Label_Min_din99", "compare1_GlobalSpeed_Label_Max_din99", "compare1_GlobalSpeed_Label_Av_din99", "compare1_GlobalSpeed_Label_Dev_din99");
    intervalColormap = globalColormap2.calcColorMap(intervalSize, colorspaceModus);
    calcGlobalSpeedPlot(intervalColormap, "compare2_GlobalSpeed_Canvas_Lab", 0, "compare2_GlobalSpeed_Label_Min_Lab", "compare2_GlobalSpeed_Label_Max_Lab", "compare2_GlobalSpeed_Label_Av_Lab", "compare2_GlobalSpeed_Label_Dev_Lab");
    calcGlobalSpeedPlot(intervalColormap,"compare2_GlobalSpeed_Canvas_de94", 1, "compare2_GlobalSpeed_Label_Min_de94", "compare2_GlobalSpeed_Label_Max_de94", "compare2_GlobalSpeed_Label_Av_de94", "compare2_GlobalSpeed_Label_Dev_de94");
    calcGlobalSpeedPlot(intervalColormap,"compare2_GlobalSpeed_Canvas_de2000", 2, "compare2_GlobalSpeed_Label_Min_de2000", "compare2_GlobalSpeed_Label_Max_de2000", "compare2_GlobalSpeed_Label_Av_de2000", "compare2_GlobalSpeed_Label_Dev_de2000");
    calcGlobalSpeedPlot(intervalColormap,"compare2_GlobalSpeed_Canvas_din99", 3, "compare2_GlobalSpeed_Label_Min_din99", "compare2_GlobalSpeed_Label_Max_din99", "compare2_GlobalSpeed_Label_Av_din99", "compare2_GlobalSpeed_Label_Dev_din99");
    return;
  }

  if(document.getElementById("compareLocalLineSpeed").style.display!="none"){
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
    calcLocalSpeedPlot(intervalColormap, "compare1_LocalSpeed_Canvas_Lab", 0, "compare1_LocalSpeed_Label_Min_Lab", "compare1_LocalSpeed_Label_Max_Lab", "compare1_LocalSpeed_Label_Av_Lab", "compare1_LocalSpeed_Label_Dev_Lab");
    calcLocalSpeedPlot(intervalColormap,"compare1_LocalSpeed_Canvas_de94", 1, "compare1_LocalSpeed_Label_Min_de94", "compare1_LocalSpeed_Label_Max_de94", "compare1_LocalSpeed_Label_Av_de94", "compare1_LocalSpeed_Label_Dev_de94");
    calcLocalSpeedPlot(intervalColormap,"compare1_LocalSpeed_Canvas_de2000", 2, "compare1_LocalSpeed_Label_Min_de2000", "compare1_LocalSpeed_Label_Max_de2000", "compare1_LocalSpeed_Label_Av_de2000", "compare1_LocalSpeed_Label_Dev_de2000");
    calcLocalSpeedPlot(intervalColormap,"compare1_LocalSpeed_Canvas_din99", 3, "compare1_LocalSpeed_Label_Min_din99", "compare1_LocalSpeed_Label_Max_din99", "compare1_LocalSpeed_Label_Av_din99", "compare1_LocalSpeed_Label_Dev_din99");
    intervalColormap = globalColormap2.calcColorMap(intervalSize, colorspaceModus);
    calcLocalSpeedPlot(intervalColormap, "compare2_LocalSpeed_Canvas_Lab", 0, "compare2_LocalSpeed_Label_Min_Lab", "compare2_LocalSpeed_Label_Max_Lab", "compare2_LocalSpeed_Label_Av_Lab", "compare2_LocalSpeed_Label_Dev_Lab");
    calcLocalSpeedPlot(intervalColormap,"compare2_LocalSpeed_Canvas_de94", 1, "compare2_LocalSpeed_Label_Min_de94", "compare2_LocalSpeed_Label_Max_de94", "compare2_LocalSpeed_Label_Av_de94", "compare2_LocalSpeed_Label_Dev_de94");
    calcLocalSpeedPlot(intervalColormap,"compare2_LocalSpeed_Canvas_de2000", 2, "compare2_LocalSpeed_Label_Min_de2000", "compare2_LocalSpeed_Label_Max_de2000", "compare2_LocalSpeed_Label_Av_de2000", "compare2_LocalSpeed_Label_Dev_de2000");
    calcLocalSpeedPlot(intervalColormap,"compare2_LocalSpeed_Canvas_din99", 3, "compare2_LocalSpeed_Label_Min_din99", "compare2_LocalSpeed_Label_Max_din99", "compare2_LocalSpeed_Label_Av_din99", "compare2_LocalSpeed_Label_Dev_din99");
    return;
  }
}


function changeComparePage(type){

  document.getElementById("id_selectCompareSpace").style.background=styleInactiveColor;
  document.getElementById("id_selectComparePath").style.background=styleInactiveColor;
  document.getElementById("id_selectCompareMatrix").style.background=styleInactiveColor;
  document.getElementById("id_selectCompareBar").style.background=styleInactiveColor;
  document.getElementById("id_selectCompareLine").style.background=styleInactiveColor;
  document.getElementById("id_selectCompareOrder").style.background=styleInactiveColor;

  document.getElementById("compareColormapPath").style.display="none";
  document.getElementById("compareGlobalSpeed").style.display="none";
  document.getElementById("compareLocalLineSpeed").style.display="none";
  document.getElementById("compareLocalBarSpeed").style.display="none";
  document.getElementById("compareOrder").style.display="none";
  document.getElementById("compareIntSpace").style.display="none";

  switch (type) {
    case 0:
        document.getElementById("id_selectCompareSpace").style.background=styleActiveColor;
        document.getElementById("compareIntSpace").style.display="inline-block";

        drawCompareMapPreviews();
      break;
      case 1:
          document.getElementById("id_selectComparePath").style.background=styleActiveColor;
          document.getElementById("compareColormapPath").style.display="inline-block";
          intervalSize=100;
          initRGB3D();
          changeCourseSpaceCompare();
        break;
        case 2:
            intervalSize=parseFloat(document.getElementById("id_CompareInputIntervalNum").value);
            document.getElementById("id_selectCompareMatrix").style.background=styleActiveColor;
            document.getElementById("compareGlobalSpeed").style.display="inline-block";
            var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
            calcGlobalSpeedPlot(intervalColormap, "compare1_GlobalSpeed_Canvas_Lab", 0, "compare1_GlobalSpeed_Label_Min_Lab", "compare1_GlobalSpeed_Label_Max_Lab", "compare1_GlobalSpeed_Label_Av_Lab", "compare1_GlobalSpeed_Label_Dev_Lab");
            calcGlobalSpeedPlot(intervalColormap,"compare1_GlobalSpeed_Canvas_de94", 1, "compare1_GlobalSpeed_Label_Min_de94", "compare1_GlobalSpeed_Label_Max_de94", "compare1_GlobalSpeed_Label_Av_de94", "compare1_GlobalSpeed_Label_Dev_de94");
            calcGlobalSpeedPlot(intervalColormap,"compare1_GlobalSpeed_Canvas_de2000", 2, "compare1_GlobalSpeed_Label_Min_de2000", "compare1_GlobalSpeed_Label_Max_de2000", "compare1_GlobalSpeed_Label_Av_de2000", "compare1_GlobalSpeed_Label_Dev_de2000");
            calcGlobalSpeedPlot(intervalColormap,"compare1_GlobalSpeed_Canvas_din99", 3, "compare1_GlobalSpeed_Label_Min_din99", "compare1_GlobalSpeed_Label_Max_din99", "compare1_GlobalSpeed_Label_Av_din99", "compare1_GlobalSpeed_Label_Dev_din99");
            intervalColormap = globalColormap2.calcColorMap(intervalSize, colorspaceModus);
            calcGlobalSpeedPlot(intervalColormap, "compare2_GlobalSpeed_Canvas_Lab", 0, "compare2_GlobalSpeed_Label_Min_Lab", "compare2_GlobalSpeed_Label_Max_Lab", "compare2_GlobalSpeed_Label_Av_Lab", "compare2_GlobalSpeed_Label_Dev_Lab");
            calcGlobalSpeedPlot(intervalColormap,"compare2_GlobalSpeed_Canvas_de94", 1, "compare2_GlobalSpeed_Label_Min_de94", "compare2_GlobalSpeed_Label_Max_de94", "compare2_GlobalSpeed_Label_Av_de94", "compare2_GlobalSpeed_Label_Dev_de94");
            calcGlobalSpeedPlot(intervalColormap,"compare2_GlobalSpeed_Canvas_de2000", 2, "compare2_GlobalSpeed_Label_Min_de2000", "compare2_GlobalSpeed_Label_Max_de2000", "compare2_GlobalSpeed_Label_Av_de2000", "compare2_GlobalSpeed_Label_Dev_de2000");
            calcGlobalSpeedPlot(intervalColormap,"compare2_GlobalSpeed_Canvas_din99", 3, "compare2_GlobalSpeed_Label_Min_din99", "compare2_GlobalSpeed_Label_Max_din99", "compare2_GlobalSpeed_Label_Av_din99", "compare2_GlobalSpeed_Label_Dev_din99");
          break;
          case 3:
              document.getElementById("id_selectCompareBar").style.background=styleActiveColor;
              document.getElementById("compareLocalBarSpeed").style.display="inline-block";
              drawCompareDifferenceMaps();

            break;
            case 4:
                  intervalSize=parseFloat(document.getElementById("id_CompareInputIntervalNum2").value);
                document.getElementById("id_selectCompareLine").style.background=styleActiveColor;
                document.getElementById("compareLocalLineSpeed").style.display="inline-block";
                var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
                calcLocalSpeedPlot(intervalColormap, "compare1_LocalSpeed_Canvas_Lab", 0, "compare1_LocalSpeed_Label_Min_Lab", "compare1_LocalSpeed_Label_Max_Lab", "compare1_LocalSpeed_Label_Av_Lab", "compare1_LocalSpeed_Label_Dev_Lab");
                calcLocalSpeedPlot(intervalColormap,"compare1_LocalSpeed_Canvas_de94", 1, "compare1_LocalSpeed_Label_Min_de94", "compare1_LocalSpeed_Label_Max_de94", "compare1_LocalSpeed_Label_Av_de94", "compare1_LocalSpeed_Label_Dev_de94");
                calcLocalSpeedPlot(intervalColormap,"compare1_LocalSpeed_Canvas_de2000", 2, "compare1_LocalSpeed_Label_Min_de2000", "compare1_LocalSpeed_Label_Max_de2000", "compare1_LocalSpeed_Label_Av_de2000", "compare1_LocalSpeed_Label_Dev_de2000");
                calcLocalSpeedPlot(intervalColormap,"compare1_LocalSpeed_Canvas_din99", 3, "compare1_LocalSpeed_Label_Min_din99", "compare1_LocalSpeed_Label_Max_din99", "compare1_LocalSpeed_Label_Av_din99", "compare1_LocalSpeed_Label_Dev_din99");

                intervalColormap = globalColormap2.calcColorMap(intervalSize, colorspaceModus);
                calcLocalSpeedPlot(intervalColormap, "compare2_LocalSpeed_Canvas_Lab", 0, "compare2_LocalSpeed_Label_Min_Lab", "compare2_LocalSpeed_Label_Max_Lab", "compare2_LocalSpeed_Label_Av_Lab", "compare2_LocalSpeed_Label_Dev_Lab");
                calcLocalSpeedPlot(intervalColormap,"compare2_LocalSpeed_Canvas_de94", 1, "compare2_LocalSpeed_Label_Min_de94", "compare2_LocalSpeed_Label_Max_de94", "compare2_LocalSpeed_Label_Av_de94", "compare2_LocalSpeed_Label_Dev_de94");
                calcLocalSpeedPlot(intervalColormap,"compare2_LocalSpeed_Canvas_de2000", 2, "compare2_LocalSpeed_Label_Min_de2000", "compare2_LocalSpeed_Label_Max_de2000", "compare2_LocalSpeed_Label_Av_de2000", "compare2_LocalSpeed_Label_Dev_de2000");
                calcLocalSpeedPlot(intervalColormap,"compare2_LocalSpeed_Canvas_din99", 3, "compare2_LocalSpeed_Label_Min_din99", "compare2_LocalSpeed_Label_Max_din99", "compare2_LocalSpeed_Label_Av_din99", "compare2_LocalSpeed_Label_Dev_din99");
              break;
              case 5:
                  intervalSize=parseFloat(document.getElementById("id_CompareInputIntervalNum3").value);
                  document.getElementById("id_selectCompareOrder").style.background=styleActiveColor;
                  document.getElementById("compareOrder").style.display="inline-block";
                  var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
                  calcOrderPlot(intervalColormap, "compare1_OrderSpeed_Canvas_Lab", 0, "compare1_OrderSpeed_Label_Min_Lab", "compare1_OrderSpeed_Label_MinGlobal_Lab");
                  calcOrderPlot(intervalColormap,"compare1_OrderSpeed_Canvas_de94", 1, "compare1_OrderSpeed_Label_Min_de94", "compare1_OrderSpeed_Label_MinGlobal_de94");
                  calcOrderPlot(intervalColormap,"compare1_OrderSpeed_Canvas_de2000", 2, "compare1_OrderSpeed_Label_Min_de2000", "compare1_OrderSpeed_Label_MinGlobal_de2000");
                  calcOrderPlot(intervalColormap,"compare1_OrderSpeed_Canvas_din99", 3, "compare1_OrderSpeed_Label_Min_din99", "compare1_OrderSpeed_Label_MinGlobal_din99");

                  intervalColormap = globalColormap2.calcColorMap(intervalSize, colorspaceModus);
                  calcOrderPlot(intervalColormap, "compare2_OrderSpeed_Canvas_Lab", 0, "compare2_OrderSpeed_Label_Min_Lab", "compare2_OrderSpeed_Label_MinGlobal_Lab");
                  calcOrderPlot(intervalColormap,"compare2_OrderSpeed_Canvas_de94", 1, "compare2_OrderSpeed_Label_Min_de94", "compare2_OrderSpeed_Label_MinGlobal_de94");
                  calcOrderPlot(intervalColormap,"compare2_OrderSpeed_Canvas_de2000", 2, "compare2_OrderSpeed_Label_Min_de2000", "compare2_OrderSpeed_Label_MinGlobal_de2000");
                  calcOrderPlot(intervalColormap,"compare2_OrderSpeed_Canvas_din99", 3, "compare2_OrderSpeed_Label_Min_din99", "compare2_OrderSpeed_Label_MinGlobal_din99");
                break;
    default:

  }






}


function increaseCompare3DDiv(){
    if(size3D<100){

      size3D+=5;
      document.getElementById("id_rgb3DCompare").style.height = size3D+"vh";

      var canvasObj = document.getElementById("id_rgb3DCompare");
      canvasObj.innerHTML="";
      var box = canvasObj.getBoundingClientRect();
      var drawWidth = box.width; //window.innerWidth;
      var drawHeight =box.height; // window.innerHeight;
      camera.aspect = drawWidth/drawHeight;
    	camera.updateProjectionMatrix();
      renderer.setSize(drawWidth,drawHeight);//(window.innerWidth, window.innerHeight);
      canvasObj.appendChild( renderer.domElement );

      if(size3D==100){
        document.getElementById("increaseCompare3D").style.color = "grey";
      }
      else{
        document.getElementById("increaseCompare3D").style.color = "black";
      }

      if(size3D==50){
        document.getElementById("decreaseCompare3D").style.color = "grey";
      }
      else{
        document.getElementById("decreaseCompare3D").style.color = "black";
      }

    }

}

function decreaseCompare3DDiv(){
  if(size3D>50){

    size3D-=5;
    document.getElementById("id_rgb3DCompare").style.height = size3D+"vh";

    var canvasObj = document.getElementById("id_rgb3DCompare");
    canvasObj.innerHTML="";
    var box = canvasObj.getBoundingClientRect();
    var drawWidth = box.width; //window.innerWidth;
    var drawHeight =box.height; // window.innerHeight;
    camera.aspect = drawWidth/drawHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(drawWidth,drawHeight);//(window.innerWidth, window.innerHeight);
    canvasObj.appendChild( renderer.domElement );


    if(size3D==100){
      document.getElementById("increaseCompare3D").style.color = "grey";
    }
    else{
      document.getElementById("increaseCompare3D").style.color = "black";
    }

    if(size3D==50){
      document.getElementById("decreaseCompare3D").style.color = "grey";
    }
    else{
      document.getElementById("decreaseCompare3D").style.color = "black";
    }

  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function initComparePage(){

    bandSketch.colormap2Sketch(globalColormap1);
    bandSketch2.colormap2Sketch(globalColormap2);
    orderColorSketch(colorspaceModus);

    changeComparePage(1);

}

function switchCompareMaps(){
  var tmp = colormap2SelectIndex;
  colormap2SelectIndex = colormap1SelectIndex;
  colormap1SelectIndex = tmp;

  var tmpColormap = globalColormap2;
  globalColormap2 = globalColormap1;
  globalColormap1 = tmpColormap;

  bandSketch.colormap2Sketch(globalColormap1);
  bandSketch2.colormap2Sketch(globalColormap2);

  orderColorSketch();
  updateComparePage()
}

function changeCourseSpaceCompare(){

  document.getElementById("id_containerHueCourseCompare").style.display = "none";
  document.getElementById("id_compareValue").style.display = "none";
  document.getElementById("id_hueValueOptionsCompare").style.display = "none";
  document.getElementById("id_RGBCourseDivCompare").style.display = "none";

  switch(analyzeColorspaceModus){
      case "rgb":;
        document.getElementById("id_RGBCourseDivCompare").style.display = "initial";
        rgbInit("id_canvasRGCompare","id_canvasRBCompare","id_canvasBGCompare", true);
        //drawcolormap_RGBSpace(globalColormap1, "id_canvasRG","id_canvasRB","id_canvasBG", true);
        drawcolormap_compare_RGBSpace(globalColormap1, globalColormap2, "id_canvasRGCompare","id_canvasRBCompare","id_canvasBGCompare", true, true);
        animate();
      break;
      case "hsv":
        document.getElementById("id_containerHueCourseCompare").style.display = "initial";
        document.getElementById("id_compareValue").style.display = "initial";
        document.getElementById("id_hueValueOptionsCompare").style.display = "initial";
        hueInit("id_compareCourseHueBackground");
        document.getElementById("id_setValueRangeCompare").value = 100;
        //drawcolormap_hueSpace(globalColormap1, "id_anaylseCourseHueBackground",false);
        drawcolormap_compare_hueSpace(globalColormap1, globalColormap2, "id_compareCourseHueBackground",false);
        stopAnimation();
      break;
      case "lab": case "din99":
        document.getElementById("id_containerHueCourseCompare").style.display = "initial";
        document.getElementById("id_compareValue").style.display = "initial";
        document.getElementById("id_hueValueOptionsCompare").style.display = "initial";
        hueInit("id_compareCourseHueBackground");
        document.getElementById("id_setValueRangeCompare").value = 65;
        //drawcolormap_hueSpace(globalColormap1, "id_anaylseCourseHueBackground",false);
        drawcolormap_compare_hueSpace(globalColormap1, globalColormap2,"id_compareCourseHueBackground",false);
        stopAnimation();
      break;
      default:
      console.log("Error at the changeColorspace function");
      return;
  }//


}

function changeValueRangeCompare(){

      if(parseFloat(document.getElementById('id_setValueRangeCompare'))<0){
        document.getElementById('id_setValueRangeCompare').value = 0;
      }

      if(parseFloat(document.getElementById('id_setValueRangeCompare'))>100){
        document.getElementById('id_setValueRangeCompare').value = 100;
      }

      hueInit("id_compareCourseHueBackground");
      drawcolormap_compare_hueSpace(globalColormap1, globalColormap2,"id_compareCourseHueBackground",false);
}

function compareColormapRGBPossible(){
  if(document.getElementById("id_checkboxRGBCompare").checked==true){
    orderColorSketch('rgb');
    bandSketch.colormap2Sketch(globalColormap1);
    bandSketch2.colormap2Sketch(globalColormap2);
    drawcolormap_compare_hueSpace(globalColormap1, globalColormap2,"id_compareCourseHueBackground",false);
    document.getElementById("id_checkboxRGB").checked=true;
  }
  else{
    document.getElementById("id_checkboxRGB").checked=false;
  }
}

function drawCompareMapPreviews(){

  var oldColorspace = colorspaceModus;

  colorspaceModus="rgb";
      drawCanvasColormap("id_compare1RGB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalColormap1);
      drawCanvasColormap("id_compare2RGB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalColormap2);
  colorspaceModus="hsv";
      drawCanvasColormap("id_compare1HSV_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalColormap1);
      drawCanvasColormap("id_compare2HSV_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalColormap2);
  colorspaceModus="lab";
      drawCanvasColormap("id_compare1LAB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalColormap1);
      drawCanvasColormap("id_compare2LAB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalColormap2);
  colorspaceModus="din99";
      drawCanvasColormap("id_compare1DIN99_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalColormap1);
      drawCanvasColormap("id_compare2DIN99_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalColormap2);
  colorspaceModus = oldColorspace;
}

function drawCompareDifferenceMaps(){

  var old_tbody = document.getElementById("id_compareTableBody");
  var new_tbody = document.createElement('tbody');

  var canvasRGB = document.getElementById("id_compare1RatioRGB");
  var canvasHSV = document.getElementById("id_compare1RatioHSV");
  var canvasLAB = document.getElementById("id_compare1RatioLAB");
  var canvasCIEDE2000 = document.getElementById("id_compare1RatioDe2000");
  var canvasDE94 = document.getElementById("id_compare1RatioDE94");
  var canvasDIN99 = document.getElementById("id_compare1RatioDIN99");

  var canvasRGB_2 = document.getElementById("id_compare2RatioRGB");
  var canvasHSV_2 = document.getElementById("id_compare2RatioHSV");
  var canvasLAB_2 = document.getElementById("id_compare2RatioLAB");
  var canvasCIEDE2000_2 = document.getElementById("id_compare2RatioDe2000");
  var canvasDE94_2 = document.getElementById("id_compare2RatioDE94");
  var canvasDIN99_2 = document.getElementById("id_compare2RatioDIN99");

  canvasRGB.width = resolutionX_differenceMetrics;
  canvasRGB.height = 1;
  canvasHSV.width = resolutionX_differenceMetrics;
  canvasHSV.height = 1;
  canvasLAB.width = resolutionX_differenceMetrics;
  canvasLAB.height = 1;
  canvasCIEDE2000.width = resolutionX_differenceMetrics;
  canvasCIEDE2000.height = 1;
  canvasDE94.width = resolutionX_differenceMetrics;
  canvasDE94.height = 1;
  canvasDIN99.width = resolutionX_differenceMetrics;
  canvasDIN99.height = 1;

  canvasRGB_2.width = resolutionX_differenceMetrics;
  canvasRGB_2.height = 1;
  canvasHSV_2.width = resolutionX_differenceMetrics;
  canvasHSV_2.height = 1;
  canvasLAB_2.width = resolutionX_differenceMetrics;
  canvasLAB_2.height = 1;
  canvasCIEDE2000_2.width = resolutionX_differenceMetrics;
  canvasCIEDE2000_2.height = 1;
  canvasDE94_2.width = resolutionX_differenceMetrics;
  canvasDE94_2.height = 1;
  canvasDIN99_2.width = resolutionX_differenceMetrics;
  canvasDIN99_2.height = 1;

  var rgbCtx = canvasRGB.getContext("2d");
  var rgbData = rgbCtx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var hsvCtx = canvasHSV.getContext("2d");
  var hsvData = hsvCtx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var labCtx = canvasLAB.getContext("2d");
  var labData = labCtx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var de94Ctx = canvasDE94.getContext("2d");
  var de94Data = de94Ctx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var de2000Ctx = canvasCIEDE2000.getContext("2d");
  var de2000Data = de2000Ctx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var din99Ctx = canvasDIN99.getContext("2d");
  var din99Data = din99Ctx.getImageData(0, 0, resolutionX_differenceMetrics, 1);

  var rgbCtx_2 = canvasRGB_2.getContext("2d");
  var rgbData_2 = rgbCtx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var hsvCtx_2 = canvasHSV_2.getContext("2d");
  var hsvData_2 = hsvCtx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var labCtx_2 = canvasLAB_2.getContext("2d");
  var labData_2 = labCtx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var de94Ctx_2 = canvasDE94_2.getContext("2d");
  var de94Data_2 = de94Ctx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var de2000Ctx_2 = canvasCIEDE2000_2.getContext("2d");
  var de2000Data_2 = de2000Ctx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var din99Ctx_2 = canvasDIN99_2.getContext("2d");
  var din99Data_2 = din99Ctx_2.getImageData(0, 0, resolutionX_differenceMetrics, 1);

  bandSketch.calcNewDistances();
  bandSketch2.calcNewDistances();

  ///////////////////////////////////////////////////
  /// COLORMAP 1


  var currentPos = [0,0,0,0,0,0,0];
  var currentWidth = [0,0,0,0,0,0,0];

  var borderWidth = 2; //px

  var restWidth = resolutionX_differenceMetrics-(bandSketch.getBandLength()-bandSketch.getNumConstBands()-1)*borderWidth;

  var arrayRGBSpeed = [];
  var arrayHSVSpeed = [];
  var arrayLABSpeed = [];
  var arrayDe94Speed = [];
  var arrayDe2000Speed = [];
  var arrayDIN99Speed = [];

  var arrayRGBSpeedSum = 0;
  var arrayHSVSpeedSum = 0;
  var arrayLABSpeedSum = 0;
  var arrayDe94SpeedSum = 0;
  var arrayDe2000SpeedSum = 0;
  var arrayDIN99SpeedSum = 0;

  for (var i = 0; i < bandSketch.getBandLength(); i++) {
    var refDis = bandSketch.getRefDistance(i);

      if(refDis==0){
        arrayRGBSpeed.push(0);
        arrayHSVSpeed.push(0);
        arrayLABSpeed.push(0);
        arrayDe94Speed.push(0);
        arrayDe2000Speed.push(0);
        arrayDIN99Speed.push(0);
      }
      else{
        arrayRGBSpeed.push(bandSketch.getRGBDistance(i)/refDis);
        arrayHSVSpeed.push(bandSketch.getHSVDistance(i)/refDis);
        arrayLABSpeed.push(bandSketch.getLABDistance(i)/refDis);
        arrayDe94Speed.push(bandSketch.getDE94Distance(i)/refDis);
        arrayDe2000Speed.push(bandSketch.getCIEDE2000Distance(i)/refDis);
        arrayDIN99Speed.push(bandSketch.getDIN99Distance(i)/refDis);

        arrayRGBSpeedSum += arrayRGBSpeed[arrayRGBSpeed.length-1];
        arrayHSVSpeedSum += arrayHSVSpeed[arrayHSVSpeed.length-1];
        arrayLABSpeedSum += arrayLABSpeed[arrayLABSpeed.length-1];
        arrayDe94SpeedSum += arrayDe94Speed[arrayDe94Speed.length-1];
        arrayDe2000SpeedSum += arrayDe2000Speed[arrayDe2000Speed.length-1];
        arrayDIN99SpeedSum += arrayDIN99Speed[arrayDIN99Speed.length-1];
      }



  }

  for (var i = 0; i < bandSketch.getBandLength(); i++) {

    var tr = document.createElement('tr');
    tr.style.background = 'rgb(144,238,144)';

    if(bandSketch.getRefDistance(i)==0){


      var td = document.createElement('td');
      td.className = "class_tableInput";
      var tmpVal = i+1;
      td.appendChild(document.createTextNode("constant "+tmpVal));
      tr.appendChild(td);
      // rgb
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0%"));
      tr.appendChild(td);
      // hsv
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0%"));
      tr.appendChild(td);
      // lab
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0%"));
      tr.appendChild(td);
      // DE94
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0%"));
      tr.appendChild(td);
      // DE00
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0%"));
      tr.appendChild(td);
      // DIN99
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0%"));
      tr.appendChild(td);
      new_tbody.appendChild(tr);
      continue;
    }

    var td = document.createElement('td')
    td.className = "class_tableInput";
    var tmpVal = i+1;
    td.appendChild(document.createTextNode("scaled "+tmpVal));
    tr.appendChild(td);


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// RGB

    var color1 = bandSketch.getC1Color(i,"rgb");
    var color2 = bandSketch.getC2Color(i,"rgb");


    var tmpRatio = arrayRGBSpeed[i]/arrayRGBSpeedSum;

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(arrayRGBSpeed[i].toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[1] = Math.ceil(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[1]; x++){
      var index = (currentPos[1]+x) * 4;

      var tmpRatio = x/currentWidth[1];

      var rValue = color1.getRValue() + (color2.getRValue() - color1.getRValue()) * tmpRatio;
      var gValue = color1.getGValue() + (color2.getGValue() - color1.getGValue()) * tmpRatio;
      var bValue = color1.getBValue() + (color2.getBValue() - color1.getBValue()) * tmpRatio;

      rgbData.data[index + 0] = Math.round(rValue * 255); // r
      rgbData.data[index + 1] = Math.round(gValue * 255); // g
      rgbData.data[index + 2] = Math.round(bValue * 255); // b
      rgbData.data[index + 3] = 255; //a
    }
    currentPos[1]=currentPos[1]+currentWidth[1];

    if(i != bandSketch.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[1]+x) * 4;
        rgbData.data[index + 0] = Math.round(0); // r
        rgbData.data[index + 1] = Math.round(0); // g
        rgbData.data[index + 2] = Math.round(0); // b
        rgbData.data[index + 3] = 255; //a
      }

    currentPos[1]=currentPos[1]+borderWidth;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// hsv

    color1 = bandSketch.getC1Color(i,"hsv");
    color2 = bandSketch.getC2Color(i,"hsv");

    var tmpDis = color1.getSValue() * 50; // radius 50; center(0,0,0);
    var tmpRad = (color1.getHValue() * Math.PI * 2) - Math.PI;
    var xPos = tmpDis * Math.cos(tmpRad);
    var yPos = tmpDis * Math.sin(tmpRad);
    var zPos = color1.getVValue() - 50;

    var tmpDis2 = color2.getSValue() * 50;
    var tmpRad2 = (color2.getHValue() * Math.PI * 2) - Math.PI;
    var xPos2 = tmpDis2 * Math.cos(tmpRad2);
    var yPos2 = tmpDis2 * Math.sin(tmpRad2);
    var zPos2 = color2.getVValue() - 50;

    tmpRatio = arrayHSVSpeed[i]/arrayHSVSpeedSum;

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(arrayHSVSpeed[i].toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[2] = Math.ceil(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[2]; x++){
      var index = (currentPos[2]+x) * 4;

      var tmpRatio = x/currentWidth[2];

      var tmpX = xPos + (xPos2 - xPos) * tmpRatio;
      var tmpY = yPos + (yPos2 - yPos) * tmpRatio;
      var tmpZ = zPos + (zPos2 - zPos) * tmpRatio;

      var tmpH = (Math.atan2(tmpY, tmpX) + Math.PI) / (Math.PI * 2);
      var tmpS = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2)) / 50;
      var tmpV = tmpZ + 50;
      var tmpCurrentHSVColor = new classColor_HSV(tmpH, tmpS, tmpV);

      var tmpCurrentColor = tmpCurrentHSVColor.calcRGBColor();

      hsvData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      hsvData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      hsvData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      hsvData.data[index + 3] = 255; //a
    }
    currentPos[2]=currentPos[2]+currentWidth[2];

    if(i != bandSketch.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[2]+x) * 4;
        hsvData.data[index + 0] = Math.round(0); // r
        hsvData.data[index + 1] = Math.round(0); // g
        hsvData.data[index + 2] = Math.round(0); // b
        hsvData.data[index + 3] = 255; //a
      }

    currentPos[2]=currentPos[2]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// lab
    color1 = bandSketch.getC1Color(i,"lab");
    color2 = bandSketch.getC2Color(i,"lab");

    tmpRatio = arrayLABSpeed[i]/arrayLABSpeedSum;

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(arrayLABSpeed[i].toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[3] = Math.ceil(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[3]; x++){
      var index = (currentPos[3]+x) * 4;

      var tmpRatio = x/currentWidth[3];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      labData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      labData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      labData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      labData.data[index + 3] = 255; //a
    }
    currentPos[3]=currentPos[3]+currentWidth[3];

    if(i != bandSketch.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[3]+x) * 4;
        labData.data[index + 0] = Math.round(0); // r
        labData.data[index + 1] = Math.round(0); // g
        labData.data[index + 2] = Math.round(0); // b
        labData.data[index + 3] = 255; //a
      }

    currentPos[3]=currentPos[3]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// de94
    tmpRatio = arrayDe94Speed[i]/arrayDe94SpeedSum;

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(arrayDe94Speed[i].toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[4] = Math.ceil(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[4]; x++){
      var index = (currentPos[4]+x) * 4;

      var tmpRatio = x/currentWidth[4];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      de94Data.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      de94Data.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      de94Data.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      de94Data.data[index + 3] = 255; //a

    }
    currentPos[4]=currentPos[4]+currentWidth[4];

    if(i != bandSketch.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[4]+x) * 4;
        de94Data.data[index + 0] = Math.round(0); // r
        de94Data.data[index + 1] = Math.round(0); // g
        de94Data.data[index + 2] = Math.round(0); // b
        de94Data.data[index + 3] = 255; //a

      }

    currentPos[4]=currentPos[4]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// de2000
    tmpRatio = arrayDe2000Speed[i]/arrayDe2000SpeedSum;

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(arrayDe2000Speed[i].toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[5] = Math.ceil(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[5]; x++){
      var index = (currentPos[5]+x) * 4;

      var tmpRatio = x/currentWidth[5];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      de2000Data.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      de2000Data.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      de2000Data.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      de2000Data.data[index + 3] = 255; //a

    }
    currentPos[5]=currentPos[5]+currentWidth[5];

    if(i != bandSketch.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[5]+x) * 4;
        de2000Data.data[index + 0] = Math.round(0); // r
        de2000Data.data[index + 1] = Math.round(0); // g
        de2000Data.data[index + 2] = Math.round(0); // b
        de2000Data.data[index + 3] = 255; //a

      }

    currentPos[5]=currentPos[5]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// din99
    color1 = bandSketch.getC1Color(i,"din99");
    color2 = bandSketch.getC2Color(i,"din99");
    tmpRatio = arrayDIN99Speed[i]/arrayDIN99SpeedSum;

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(arrayDIN99Speed[i].toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[6] = Math.ceil(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[6]; x++){
      var index = (currentPos[6]+x) * 4;

      var tmpRatio = x/currentWidth[6];

      var l99Value = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var a99Value = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var b99Value = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentDIN99Color = new classColorDIN99(l99Value,a99Value,b99Value);
      var tmpCurrentColor = tmpCurrentDIN99Color.calcRGBColor();

      din99Data.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      din99Data.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      din99Data.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      din99Data.data[index + 3] = 255; //a

    }
    currentPos[6]=currentPos[6]+currentWidth[6];

    if(i != bandSketch.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[6]+x) * 4;
        din99Data.data[index + 0] = Math.round(0); // r
        din99Data.data[index + 1] = Math.round(0); // g
        din99Data.data[index + 2] = Math.round(0); // b
        din99Data.data[index + 3] = 255; //a

      }

    currentPos[6]=currentPos[6]+borderWidth;
    }


    new_tbody.appendChild(tr);

  }




  ///////////////////////////////////////////////////
  /// COLORMAP 2


   currentPos = [0,0,0,0,0,0,0];
   currentWidth = [0,0,0,0,0,0,0];

   borderWidth = 2; //px

   restWidth = resolutionX_differenceMetrics-(bandSketch2.getBandLength()-bandSketch2.getNumConstBands()-1)*borderWidth;

   arrayRGBSpeed = [];
   arrayHSVSpeed = [];
   arrayLABSpeed = [];
   arrayDe94Speed = [];
   arrayDe2000Speed = [];
   arrayDIN99Speed = [];

   arrayRGBSpeedSum = 0;
   arrayHSVSpeedSum = 0;
   arrayLABSpeedSum = 0;
   arrayDe94SpeedSum = 0;
   arrayDe2000SpeedSum = 0;
   arrayDIN99SpeedSum = 0;

  for (var i = 0; i < bandSketch2.getBandLength(); i++) {
    var refDis = bandSketch2.getRefDistance(i);

      if(refDis==0){
        arrayRGBSpeed.push(0);
        arrayHSVSpeed.push(0);
        arrayLABSpeed.push(0);
        arrayDe94Speed.push(0);
        arrayDe2000Speed.push(0);
        arrayDIN99Speed.push(0);
      }
      else{
        arrayRGBSpeed.push(bandSketch2.getRGBDistance(i)/refDis);
        arrayHSVSpeed.push(bandSketch2.getHSVDistance(i)/refDis);
        arrayLABSpeed.push(bandSketch2.getLABDistance(i)/refDis);
        arrayDe94Speed.push(bandSketch2.getDE94Distance(i)/refDis);
        arrayDe2000Speed.push(bandSketch2.getCIEDE2000Distance(i)/refDis);
        arrayDIN99Speed.push(bandSketch2.getDIN99Distance(i)/refDis);

        arrayRGBSpeedSum += arrayRGBSpeed[arrayRGBSpeed.length-1];
        arrayHSVSpeedSum += arrayHSVSpeed[arrayHSVSpeed.length-1];
        arrayLABSpeedSum += arrayLABSpeed[arrayLABSpeed.length-1];
        arrayDe94SpeedSum += arrayDe94Speed[arrayDe94Speed.length-1];
        arrayDe2000SpeedSum += arrayDe2000Speed[arrayDe2000Speed.length-1];
        arrayDIN99SpeedSum += arrayDIN99Speed[arrayDIN99Speed.length-1];
      }



  }

  for (var i = 0; i < bandSketch2.getBandLength(); i++) {

    var tr = document.createElement('tr');
    tr.style.background = 'rgb(255,250,205)';;//'rgb(255,255,224)';

    if(bandSketch2.getRefDistance(i)==0){


      var td = document.createElement('td');
      td.className = "class_tableInput";
      var tmpVal = i+1;
      td.appendChild(document.createTextNode("constant "+tmpVal));
      tr.appendChild(td);
      // rgb
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0%"));
      tr.appendChild(td);
      // hsv
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0%"));
      tr.appendChild(td);
      // lab
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0%"));
      tr.appendChild(td);
      // DE94
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0%"));
      tr.appendChild(td);
      // DE00
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0%"));
      tr.appendChild(td);
      // DIN99
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0"));
      tr.appendChild(td);
      td = document.createElement('td');
      td.className = "class_tableInput";
      td.appendChild(document.createTextNode("0%"));
      tr.appendChild(td);
      new_tbody.appendChild(tr);
      continue;
    }

    var td = document.createElement('td')
    td.className = "class_tableInput";
    var tmpVal = i+1;
    td.appendChild(document.createTextNode("scaled "+tmpVal));
    tr.appendChild(td);


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// RGB

    var color1 = bandSketch2.getC1Color(i,"rgb");
    var color2 = bandSketch2.getC2Color(i,"rgb");


    var tmpRatio = arrayRGBSpeed[i]/arrayRGBSpeedSum;

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(arrayRGBSpeed[i].toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[1] = Math.ceil(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[1]; x++){
      var index = (currentPos[1]+x) * 4;

      var tmpRatio = x/currentWidth[1];

      var rValue = color1.getRValue() + (color2.getRValue() - color1.getRValue()) * tmpRatio;
      var gValue = color1.getGValue() + (color2.getGValue() - color1.getGValue()) * tmpRatio;
      var bValue = color1.getBValue() + (color2.getBValue() - color1.getBValue()) * tmpRatio;

      rgbData_2.data[index + 0] = Math.round(rValue * 255); // r
      rgbData_2.data[index + 1] = Math.round(gValue * 255); // g
      rgbData_2.data[index + 2] = Math.round(bValue * 255); // b
      rgbData_2.data[index + 3] = 255; //a
    }
    currentPos[1]=currentPos[1]+currentWidth[1];

    if(i != bandSketch2.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[1]+x) * 4;
        rgbData_2.data[index + 0] = Math.round(0); // r
        rgbData_2.data[index + 1] = Math.round(0); // g
        rgbData_2.data[index + 2] = Math.round(0); // b
        rgbData_2.data[index + 3] = 255; //a
      }

    currentPos[1]=currentPos[1]+borderWidth;
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// hsv

    color1 = bandSketch2.getC1Color(i,"hsv");
    color2 = bandSketch2.getC2Color(i,"hsv");

    var tmpDis = color1.getSValue() * 50; // radius 50; center(0,0,0);
    var tmpRad = (color1.getHValue() * Math.PI * 2) - Math.PI;
    var xPos = tmpDis * Math.cos(tmpRad);
    var yPos = tmpDis * Math.sin(tmpRad);
    var zPos = color1.getVValue() - 50;

    var tmpDis2 = color2.getSValue() * 50;
    var tmpRad2 = (color2.getHValue() * Math.PI * 2) - Math.PI;
    var xPos2 = tmpDis2 * Math.cos(tmpRad2);
    var yPos2 = tmpDis2 * Math.sin(tmpRad2);
    var zPos2 = color2.getVValue() - 50;

    tmpRatio = arrayHSVSpeed[i]/arrayHSVSpeedSum;

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(arrayHSVSpeed[i].toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[2] = Math.ceil(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[2]; x++){
      var index = (currentPos[2]+x) * 4;

      var tmpRatio = x/currentWidth[2];

      var tmpX = xPos + (xPos2 - xPos) * tmpRatio;
      var tmpY = yPos + (yPos2 - yPos) * tmpRatio;
      var tmpZ = zPos + (zPos2 - zPos) * tmpRatio;

      var tmpH = (Math.atan2(tmpY, tmpX) + Math.PI) / (Math.PI * 2);
      var tmpS = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2)) / 50;
      var tmpV = tmpZ + 50;
      var tmpCurrentHSVColor = new classColor_HSV(tmpH, tmpS, tmpV);

      var tmpCurrentColor = tmpCurrentHSVColor.calcRGBColor();

      hsvData_2.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      hsvData_2.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      hsvData_2.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      hsvData_2.data[index + 3] = 255; //a
    }
    currentPos[2]=currentPos[2]+currentWidth[2];

    if(i != bandSketch2.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[2]+x) * 4;
        hsvData_2.data[index + 0] = Math.round(0); // r
        hsvData_2.data[index + 1] = Math.round(0); // g
        hsvData_2.data[index + 2] = Math.round(0); // b
        hsvData_2.data[index + 3] = 255; //a
      }

    currentPos[2]=currentPos[2]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// lab
    color1 = bandSketch2.getC1Color(i,"lab");
    color2 = bandSketch2.getC2Color(i,"lab");

    tmpRatio = arrayLABSpeed[i]/arrayLABSpeedSum;

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(arrayLABSpeed[i].toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[3] = Math.ceil(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[3]; x++){
      var index = (currentPos[3]+x) * 4;

      var tmpRatio = x/currentWidth[3];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      labData_2.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      labData_2.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      labData_2.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      labData_2.data[index + 3] = 255; //a
    }
    currentPos[3]=currentPos[3]+currentWidth[3];

    if(i != bandSketch2.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[3]+x) * 4;
        labData_2.data[index + 0] = Math.round(0); // r
        labData_2.data[index + 1] = Math.round(0); // g
        labData_2.data[index + 2] = Math.round(0); // b
        labData_2.data[index + 3] = 255; //a
      }

    currentPos[3]=currentPos[3]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// de94
    tmpRatio = arrayDe94Speed[i]/arrayDe94SpeedSum;

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(arrayDe94Speed[i].toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[4] = Math.ceil(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[4]; x++){
      var index = (currentPos[4]+x) * 4;

      var tmpRatio = x/currentWidth[4];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      de94Data_2.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      de94Data_2.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      de94Data_2.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      de94Data_2.data[index + 3] = 255; //a

    }
    currentPos[4]=currentPos[4]+currentWidth[4];

    if(i != bandSketch2.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[4]+x) * 4;
        de94Data_2.data[index + 0] = Math.round(0); // r
        de94Data_2.data[index + 1] = Math.round(0); // g
        de94Data_2.data[index + 2] = Math.round(0); // b
        de94Data_2.data[index + 3] = 255; //a

      }

    currentPos[4]=currentPos[4]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// de2000
    tmpRatio = arrayDe2000Speed[i]/arrayDe2000SpeedSum;

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(arrayDe2000Speed[i].toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[5] = Math.ceil(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[5]; x++){
      var index = (currentPos[5]+x) * 4;

      var tmpRatio = x/currentWidth[5];

      var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
      var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

      de2000Data_2.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      de2000Data_2.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      de2000Data_2.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      de2000Data_2.data[index + 3] = 255; //a

    }
    currentPos[5]=currentPos[5]+currentWidth[5];

    if(i != bandSketch2.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[5]+x) * 4;
        de2000Data_2.data[index + 0] = Math.round(0); // r
        de2000Data_2.data[index + 1] = Math.round(0); // g
        de2000Data_2.data[index + 2] = Math.round(0); // b
        de2000Data_2.data[index + 3] = 255; //a

      }

    currentPos[5]=currentPos[5]+borderWidth;
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////
    //// din99
    color1 = bandSketch2.getC1Color(i,"din99");
    color2 = bandSketch2.getC2Color(i,"din99");
    tmpRatio = arrayDIN99Speed[i]/arrayDIN99SpeedSum;

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode(arrayDIN99Speed[i].toFixed(numDecimalPlaces)));
    tr.appendChild(td);

    td = document.createElement('td')
    td.className = "class_tableInput";
    td.appendChild(document.createTextNode((tmpRatio*100).toFixed(numDecimalPlaces)+"%"));
    tr.appendChild(td);

    currentWidth[6] = Math.ceil(restWidth*tmpRatio);

    for(var x=0; x<currentWidth[6]; x++){
      var index = (currentPos[6]+x) * 4;

      var tmpRatio = x/currentWidth[6];

      var l99Value = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
      var a99Value = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
      var b99Value = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

      var tmpCurrentDIN99Color = new classColorDIN99(l99Value,a99Value,b99Value);
      var tmpCurrentColor = tmpCurrentDIN99Color.calcRGBColor();

      din99Data_2.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
      din99Data_2.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
      din99Data_2.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
      din99Data_2.data[index + 3] = 255; //a

    }
    currentPos[6]=currentPos[6]+currentWidth[6];

    if(i != bandSketch2.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[6]+x) * 4;
        din99Data_2.data[index + 0] = Math.round(0); // r
        din99Data_2.data[index + 1] = Math.round(0); // g
        din99Data_2.data[index + 2] = Math.round(0); // b
        din99Data_2.data[index + 3] = 255; //a

      }

    currentPos[6]=currentPos[6]+borderWidth;
    }


    new_tbody.appendChild(tr);

  }

  rgbCtx.putImageData(rgbData, 0, 0); // update ColorspaceCanvas;
  hsvCtx.putImageData(hsvData, 0, 0); // update ColorspaceCanvas;
  labCtx.putImageData(labData, 0, 0); // update ColorspaceCanvas;
  de94Ctx.putImageData(de94Data, 0, 0); // update ColorspaceCanvas;
  de2000Ctx.putImageData(de2000Data, 0, 0); // update ColorspaceCanvas;
  din99Ctx.putImageData(din99Data, 0, 0); // update ColorspaceCanvas;

  rgbCtx_2.putImageData(rgbData_2, 0, 0); // update ColorspaceCanvas;
  hsvCtx_2.putImageData(hsvData_2, 0, 0); // update ColorspaceCanvas;
  labCtx_2.putImageData(labData_2, 0, 0); // update ColorspaceCanvas;
  de94Ctx_2.putImageData(de94Data_2, 0, 0); // update ColorspaceCanvas;
  de2000Ctx_2.putImageData(de2000Data_2, 0, 0); // update ColorspaceCanvas;
  din99Ctx_2.putImageData(din99Data_2, 0, 0); // update ColorspaceCanvas;

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
  new_tbody.id="id_compareTableBody";


}
