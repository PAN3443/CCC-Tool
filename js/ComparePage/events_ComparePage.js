function updateComparePage(){

  if(document.getElementById("compareIntSpace").style.display!="none"){
    drawCompareMapPreviews();
    return;
  }

  if(document.getElementById("compareColormapPath").style.display!="none"){
    initRGB3D();
    changeCourseSpaceCompare();
    return;
  }

  if(document.getElementById("compareGlobalSpeed").style.display!="none"){

    globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("compare1_globalSpeed_StartKey").selectedIndex,document.getElementById("compare1_globalSpeed_EndKey").selectedIndex);
    globalCMS2 = calcCMSIntervals(globalCMS2,document.getElementById("compare2_globalSpeed_StartKey").selectedIndex,document.getElementById("compare2_globalSpeed_EndKey").selectedIndex);
    calcGlobalSpeedPlot(globalCMS1, "compare1_GlobalSpeed_Canvas_Lab", 0, "compare1_GlobalSpeed_Label_Min_Lab", "compare1_GlobalSpeed_Label_Max_Lab", "compare1_GlobalSpeed_Label_Av_Lab", "compare1_GlobalSpeed_Label_Dev_Lab");
    calcGlobalSpeedPlot(globalCMS1,"compare1_GlobalSpeed_Canvas_de94", 1, "compare1_GlobalSpeed_Label_Min_de94", "compare1_GlobalSpeed_Label_Max_de94", "compare1_GlobalSpeed_Label_Av_de94", "compare1_GlobalSpeed_Label_Dev_de94");
    calcGlobalSpeedPlot(globalCMS1,"compare1_GlobalSpeed_Canvas_de2000", 2, "compare1_GlobalSpeed_Label_Min_de2000", "compare1_GlobalSpeed_Label_Max_de2000", "compare1_GlobalSpeed_Label_Av_de2000", "compare1_GlobalSpeed_Label_Dev_de2000");
    calcGlobalSpeedPlot(globalCMS1,"compare1_GlobalSpeed_Canvas_din99", 3, "compare1_GlobalSpeed_Label_Min_din99", "compare1_GlobalSpeed_Label_Max_din99", "compare1_GlobalSpeed_Label_Av_din99", "compare1_GlobalSpeed_Label_Dev_din99");
    calcGlobalSpeedPlot(globalCMS2, "compare2_GlobalSpeed_Canvas_Lab", 0, "compare2_GlobalSpeed_Label_Min_Lab", "compare2_GlobalSpeed_Label_Max_Lab", "compare2_GlobalSpeed_Label_Av_Lab", "compare2_GlobalSpeed_Label_Dev_Lab");
    calcGlobalSpeedPlot(globalCMS2,"compare2_GlobalSpeed_Canvas_de94", 1, "compare2_GlobalSpeed_Label_Min_de94", "compare2_GlobalSpeed_Label_Max_de94", "compare2_GlobalSpeed_Label_Av_de94", "compare2_GlobalSpeed_Label_Dev_de94");
    calcGlobalSpeedPlot(globalCMS2,"compare2_GlobalSpeed_Canvas_de2000", 2, "compare2_GlobalSpeed_Label_Min_de2000", "compare2_GlobalSpeed_Label_Max_de2000", "compare2_GlobalSpeed_Label_Av_de2000", "compare2_GlobalSpeed_Label_Dev_de2000");
    calcGlobalSpeedPlot(globalCMS2,"compare2_GlobalSpeed_Canvas_din99", 3, "compare2_GlobalSpeed_Label_Min_din99", "compare2_GlobalSpeed_Label_Max_din99", "compare2_GlobalSpeed_Label_Av_din99", "compare2_GlobalSpeed_Label_Dev_din99");
    return;
  }

  if(document.getElementById("compareLocalBarSpeed").style.display!="none"){

    drawKeySpeed(globalCMS1,"id_compare1RatioRGB",0);
    drawKeySpeed(globalCMS1,"id_compare1RatioHSV",1);
    drawKeySpeed(globalCMS1,"id_compare1RatioLAB",2);
    drawKeySpeed(globalCMS1,"id_compare1RatioDE94",3);
    drawKeySpeed(globalCMS1,"id_compare1RatioDe2000",4);
    drawKeySpeed(globalCMS1,"id_compare1RatioDIN99",5);

    drawKeySpeed(globalCMS2,"id_compare2RatioRGB",0);
    drawKeySpeed(globalCMS2,"id_compare2RatioHSV",1);
    drawKeySpeed(globalCMS2,"id_compare2RatioLAB",2);
    drawKeySpeed(globalCMS2,"id_compare2RatioDE94",3);
    drawKeySpeed(globalCMS2,"id_compare2RatioDe2000",4);
    drawKeySpeed(globalCMS2,"id_compare2RatioDIN99",5);
    return;
  }

  if(document.getElementById("compareLocalLineSpeed").style.display!="none"){

    globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("compare1_localSpeed_StartKey").selectedIndex,document.getElementById("compare1_localSpeed_EndKey").selectedIndex);
    globalCMS2 = calcCMSIntervals(globalCMS2,document.getElementById("compare2_localSpeed_StartKey").selectedIndex,document.getElementById("compare2_localSpeed_EndKey").selectedIndex);
    calcLocalSpeedPlot(globalCMS1, "compare1_LocalSpeed_Canvas_Lab", 0, "compare1_LocalSpeed_Label_Min_Lab", "compare1_LocalSpeed_Label_Max_Lab", "compare1_LocalSpeed_Label_Av_Lab", "compare1_LocalSpeed_Label_Dev_Lab");
    calcLocalSpeedPlot(globalCMS1,"compare1_LocalSpeed_Canvas_de94", 1, "compare1_LocalSpeed_Label_Min_de94", "compare1_LocalSpeed_Label_Max_de94", "compare1_LocalSpeed_Label_Av_de94", "compare1_LocalSpeed_Label_Dev_de94");
    calcLocalSpeedPlot(globalCMS1,"compare1_LocalSpeed_Canvas_de2000", 2, "compare1_LocalSpeed_Label_Min_de2000", "compare1_LocalSpeed_Label_Max_de2000", "compare1_LocalSpeed_Label_Av_de2000", "compare1_LocalSpeed_Label_Dev_de2000");
    calcLocalSpeedPlot(globalCMS1,"compare1_LocalSpeed_Canvas_din99", 3, "compare1_LocalSpeed_Label_Min_din99", "compare1_LocalSpeed_Label_Max_din99", "compare1_LocalSpeed_Label_Av_din99", "compare1_LocalSpeed_Label_Dev_din99");
    calcLocalSpeedPlot(globalCMS2, "compare2_LocalSpeed_Canvas_Lab", 0, "compare2_LocalSpeed_Label_Min_Lab", "compare2_LocalSpeed_Label_Max_Lab", "compare2_LocalSpeed_Label_Av_Lab", "compare2_LocalSpeed_Label_Dev_Lab");
    calcLocalSpeedPlot(globalCMS2,"compare2_LocalSpeed_Canvas_de94", 1, "compare2_LocalSpeed_Label_Min_de94", "compare2_LocalSpeed_Label_Max_de94", "compare2_LocalSpeed_Label_Av_de94", "compare2_LocalSpeed_Label_Dev_de94");
    calcLocalSpeedPlot(globalCMS2,"compare2_LocalSpeed_Canvas_de2000", 2, "compare2_LocalSpeed_Label_Min_de2000", "compare2_LocalSpeed_Label_Max_de2000", "compare2_LocalSpeed_Label_Av_de2000", "compare2_LocalSpeed_Label_Dev_de2000");
    calcLocalSpeedPlot(globalCMS2,"compare2_LocalSpeed_Canvas_din99", 3, "compare2_LocalSpeed_Label_Min_din99", "compare2_LocalSpeed_Label_Max_din99", "compare2_LocalSpeed_Label_Av_din99", "compare2_LocalSpeed_Label_Dev_din99");
    return;
  }

  if(document.getElementById("compareOrder").style.display!="none"){

    globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("compare1_Order_StartKey").selectedIndex,document.getElementById("compare1_Order_EndKey").selectedIndex);
    globalCMS2 = calcCMSIntervals(globalCMS2,document.getElementById("compare2_Order_StartKey").selectedIndex,document.getElementById("compare2_Order_EndKey").selectedIndex);
    calcOrderPlot(globalCMS1, "compare1_OrderSpeed_Canvas_Lab", 0, "compare1_OrderSpeed_Label_Min_Lab", "compare1_OrderSpeed_Label_MinGlobal_Lab");
    calcOrderPlot(globalCMS1,"compare1_OrderSpeed_Canvas_de94", 1, "compare1_OrderSpeed_Label_Min_de94", "compare1_OrderSpeed_Label_MinGlobal_de94");
    calcOrderPlot(globalCMS1,"compare1_OrderSpeed_Canvas_de2000", 2, "compare1_OrderSpeed_Label_Min_de2000", "compare1_OrderSpeed_Label_MinGlobal_de2000");
    calcOrderPlot(globalCMS1,"compare1_OrderSpeed_Canvas_din99", 3, "compare1_OrderSpeed_Label_Min_din99", "compare1_OrderSpeed_Label_MinGlobal_din99");
    calcOrderPlot(globalCMS2, "compare2_OrderSpeed_Canvas_Lab", 0, "compare2_OrderSpeed_Label_Min_Lab", "compare2_OrderSpeed_Label_MinGlobal_Lab");
    calcOrderPlot(globalCMS2,"compare2_OrderSpeed_Canvas_de94", 1, "compare2_OrderSpeed_Label_Min_de94", "compare2_OrderSpeed_Label_MinGlobal_de94");
    calcOrderPlot(globalCMS2,"compare2_OrderSpeed_Canvas_de2000", 2, "compare2_OrderSpeed_Label_Min_de2000", "compare2_OrderSpeed_Label_MinGlobal_de2000");
    calcOrderPlot(globalCMS2,"compare2_OrderSpeed_Canvas_din99", 3, "compare2_OrderSpeed_Label_Min_din99", "compare2_OrderSpeed_Label_MinGlobal_din99");
    return;
  }

}

/*function changePlotTypeCompare(type){
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
    //globalCMS1.calcIntervalColors(intervalSize, colorspaceModus);
globalCMS1 = calcCMSIntervals(globalCMS1);
    calcGlobalSpeedPlot(globalCMS1, "compare1_GlobalSpeed_Canvas_Lab", 0, "compare1_GlobalSpeed_Label_Min_Lab", "compare1_GlobalSpeed_Label_Max_Lab", "compare1_GlobalSpeed_Label_Av_Lab", "compare1_GlobalSpeed_Label_Dev_Lab");
    calcGlobalSpeedPlot(globalCMS1,"compare1_GlobalSpeed_Canvas_de94", 1, "compare1_GlobalSpeed_Label_Min_de94", "compare1_GlobalSpeed_Label_Max_de94", "compare1_GlobalSpeed_Label_Av_de94", "compare1_GlobalSpeed_Label_Dev_de94");
    calcGlobalSpeedPlot(globalCMS1,"compare1_GlobalSpeed_Canvas_de2000", 2, "compare1_GlobalSpeed_Label_Min_de2000", "compare1_GlobalSpeed_Label_Max_de2000", "compare1_GlobalSpeed_Label_Av_de2000", "compare1_GlobalSpeed_Label_Dev_de2000");
    calcGlobalSpeedPlot(globalCMS1,"compare1_GlobalSpeed_Canvas_din99", 3, "compare1_GlobalSpeed_Label_Min_din99", "compare1_GlobalSpeed_Label_Max_din99", "compare1_GlobalSpeed_Label_Av_din99", "compare1_GlobalSpeed_Label_Dev_din99");
//globalCMS2.calcIntervalColors(intervalSize, colorspaceModus);
globalCMS2 = calcCMSIntervals(globalCMS2);
    calcGlobalSpeedPlot(globalCMS2, "compare2_GlobalSpeed_Canvas_Lab", 0, "compare2_GlobalSpeed_Label_Min_Lab", "compare2_GlobalSpeed_Label_Max_Lab", "compare2_GlobalSpeed_Label_Av_Lab", "compare2_GlobalSpeed_Label_Dev_Lab");
    calcGlobalSpeedPlot(globalCMS2,"compare2_GlobalSpeed_Canvas_de94", 1, "compare2_GlobalSpeed_Label_Min_de94", "compare2_GlobalSpeed_Label_Max_de94", "compare2_GlobalSpeed_Label_Av_de94", "compare2_GlobalSpeed_Label_Dev_de94");
    calcGlobalSpeedPlot(globalCMS2,"compare2_GlobalSpeed_Canvas_de2000", 2, "compare2_GlobalSpeed_Label_Min_de2000", "compare2_GlobalSpeed_Label_Max_de2000", "compare2_GlobalSpeed_Label_Av_de2000", "compare2_GlobalSpeed_Label_Dev_de2000");
    calcGlobalSpeedPlot(globalCMS2,"compare2_GlobalSpeed_Canvas_din99", 3, "compare2_GlobalSpeed_Label_Min_din99", "compare2_GlobalSpeed_Label_Max_din99", "compare2_GlobalSpeed_Label_Av_din99", "compare2_GlobalSpeed_Label_Dev_din99");
    return;
  }

  if(document.getElementById("compareLocalLineSpeed").style.display!="none"){
    //globalCMS1.calcIntervalColors(intervalSize, colorspaceModus);
globalCMS1 = calcCMSIntervals(globalCMS1);
    calcLocalSpeedPlot(globalCMS1, "compare1_LocalSpeed_Canvas_Lab", 0, "compare1_LocalSpeed_Label_Min_Lab", "compare1_LocalSpeed_Label_Max_Lab", "compare1_LocalSpeed_Label_Av_Lab", "compare1_LocalSpeed_Label_Dev_Lab");
    calcLocalSpeedPlot(globalCMS1,"compare1_LocalSpeed_Canvas_de94", 1, "compare1_LocalSpeed_Label_Min_de94", "compare1_LocalSpeed_Label_Max_de94", "compare1_LocalSpeed_Label_Av_de94", "compare1_LocalSpeed_Label_Dev_de94");
    calcLocalSpeedPlot(globalCMS1,"compare1_LocalSpeed_Canvas_de2000", 2, "compare1_LocalSpeed_Label_Min_de2000", "compare1_LocalSpeed_Label_Max_de2000", "compare1_LocalSpeed_Label_Av_de2000", "compare1_LocalSpeed_Label_Dev_de2000");
    calcLocalSpeedPlot(globalCMS1,"compare1_LocalSpeed_Canvas_din99", 3, "compare1_LocalSpeed_Label_Min_din99", "compare1_LocalSpeed_Label_Max_din99", "compare1_LocalSpeed_Label_Av_din99", "compare1_LocalSpeed_Label_Dev_din99");
//globalCMS2.calcIntervalColors(intervalSize, colorspaceModus);
globalCMS2 = calcCMSIntervals(globalCMS2);
    calcLocalSpeedPlot(globalCMS2, "compare2_LocalSpeed_Canvas_Lab", 0, "compare2_LocalSpeed_Label_Min_Lab", "compare2_LocalSpeed_Label_Max_Lab", "compare2_LocalSpeed_Label_Av_Lab", "compare2_LocalSpeed_Label_Dev_Lab");
    calcLocalSpeedPlot(globalCMS2,"compare2_LocalSpeed_Canvas_de94", 1, "compare2_LocalSpeed_Label_Min_de94", "compare2_LocalSpeed_Label_Max_de94", "compare2_LocalSpeed_Label_Av_de94", "compare2_LocalSpeed_Label_Dev_de94");
    calcLocalSpeedPlot(globalCMS2,"compare2_LocalSpeed_Canvas_de2000", 2, "compare2_LocalSpeed_Label_Min_de2000", "compare2_LocalSpeed_Label_Max_de2000", "compare2_LocalSpeed_Label_Av_de2000", "compare2_LocalSpeed_Label_Dev_de2000");
    calcLocalSpeedPlot(globalCMS2,"compare2_LocalSpeed_Canvas_din99", 3, "compare2_LocalSpeed_Label_Min_din99", "compare2_LocalSpeed_Label_Max_din99", "compare2_LocalSpeed_Label_Av_din99", "compare2_LocalSpeed_Label_Dev_din99");
    return;
  }
}*/


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
          initRGB3D();
          changeCourseSpaceCompare();
        break;
        case 2:
            intervalSize=parseFloat(document.getElementById("id_CompareInputIntervalNum").value);
            document.getElementById("id_selectCompareMatrix").style.background=styleActiveColor;
            document.getElementById("compareGlobalSpeed").style.display="inline-block";


fillKeyCombobox(globalCMS1,"compare1_globalSpeed_StartKey","compare1_globalSpeed_EndKey");
globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("compare1_globalSpeed_StartKey").selectedIndex,document.getElementById("compare1_globalSpeed_EndKey").selectedIndex);

            calcGlobalSpeedPlot(globalCMS1, "compare1_GlobalSpeed_Canvas_Lab", 0, "compare1_GlobalSpeed_Label_Min_Lab", "compare1_GlobalSpeed_Label_Max_Lab", "compare1_GlobalSpeed_Label_Av_Lab", "compare1_GlobalSpeed_Label_Dev_Lab");
            calcGlobalSpeedPlot(globalCMS1,"compare1_GlobalSpeed_Canvas_de94", 1, "compare1_GlobalSpeed_Label_Min_de94", "compare1_GlobalSpeed_Label_Max_de94", "compare1_GlobalSpeed_Label_Av_de94", "compare1_GlobalSpeed_Label_Dev_de94");
            calcGlobalSpeedPlot(globalCMS1,"compare1_GlobalSpeed_Canvas_de2000", 2, "compare1_GlobalSpeed_Label_Min_de2000", "compare1_GlobalSpeed_Label_Max_de2000", "compare1_GlobalSpeed_Label_Av_de2000", "compare1_GlobalSpeed_Label_Dev_de2000");
            calcGlobalSpeedPlot(globalCMS1,"compare1_GlobalSpeed_Canvas_din99", 3, "compare1_GlobalSpeed_Label_Min_din99", "compare1_GlobalSpeed_Label_Max_din99", "compare1_GlobalSpeed_Label_Av_din99", "compare1_GlobalSpeed_Label_Dev_din99");

fillKeyCombobox(globalCMS2,"compare2_globalSpeed_StartKey","compare2_globalSpeed_EndKey");
globalCMS2 = calcCMSIntervals(globalCMS2,document.getElementById("compare2_globalSpeed_StartKey").selectedIndex,document.getElementById("compare2_globalSpeed_EndKey").selectedIndex);

            calcGlobalSpeedPlot(globalCMS2, "compare2_GlobalSpeed_Canvas_Lab", 0, "compare2_GlobalSpeed_Label_Min_Lab", "compare2_GlobalSpeed_Label_Max_Lab", "compare2_GlobalSpeed_Label_Av_Lab", "compare2_GlobalSpeed_Label_Dev_Lab");
            calcGlobalSpeedPlot(globalCMS2,"compare2_GlobalSpeed_Canvas_de94", 1, "compare2_GlobalSpeed_Label_Min_de94", "compare2_GlobalSpeed_Label_Max_de94", "compare2_GlobalSpeed_Label_Av_de94", "compare2_GlobalSpeed_Label_Dev_de94");
            calcGlobalSpeedPlot(globalCMS2,"compare2_GlobalSpeed_Canvas_de2000", 2, "compare2_GlobalSpeed_Label_Min_de2000", "compare2_GlobalSpeed_Label_Max_de2000", "compare2_GlobalSpeed_Label_Av_de2000", "compare2_GlobalSpeed_Label_Dev_de2000");
            calcGlobalSpeedPlot(globalCMS2,"compare2_GlobalSpeed_Canvas_din99", 3, "compare2_GlobalSpeed_Label_Min_din99", "compare2_GlobalSpeed_Label_Max_din99", "compare2_GlobalSpeed_Label_Av_din99", "compare2_GlobalSpeed_Label_Dev_din99");
          break;
          case 3:
              document.getElementById("id_selectCompareBar").style.background=styleActiveColor;
              document.getElementById("compareLocalBarSpeed").style.display="inline-block";

              drawKeySpeed(globalCMS1,"id_compare1RatioRGB",0);
              drawKeySpeed(globalCMS1,"id_compare1RatioHSV",1);
              drawKeySpeed(globalCMS1,"id_compare1RatioLAB",2);
              drawKeySpeed(globalCMS1,"id_compare1RatioDE94",3);
              drawKeySpeed(globalCMS1,"id_compare1RatioDe2000",4);
              drawKeySpeed(globalCMS1,"id_compare1RatioDIN99",5);

              drawKeySpeed(globalCMS2,"id_compare2RatioRGB",0);
              drawKeySpeed(globalCMS2,"id_compare2RatioHSV",1);
              drawKeySpeed(globalCMS2,"id_compare2RatioLAB",2);
              drawKeySpeed(globalCMS2,"id_compare2RatioDE94",3);
              drawKeySpeed(globalCMS2,"id_compare2RatioDe2000",4);
              drawKeySpeed(globalCMS2,"id_compare2RatioDIN99",5);

            break;
            case 4:
                intervalSize=parseFloat(document.getElementById("id_CompareInputIntervalNum2").value);
                document.getElementById("id_selectCompareLine").style.background=styleActiveColor;
                document.getElementById("compareLocalLineSpeed").style.display="inline-block";
                //globalCMS1.calcIntervalColors(intervalSize, colorspaceModus);
                fillKeyCombobox(globalCMS1,"compare1_localSpeed_StartKey","compare1_localSpeed_EndKey");
                globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("compare1_localSpeed_StartKey").selectedIndex,document.getElementById("compare1_localSpeed_EndKey").selectedIndex);
                calcLocalSpeedPlot(globalCMS1, "compare1_LocalSpeed_Canvas_Lab", 0, "compare1_LocalSpeed_Label_Min_Lab", "compare1_LocalSpeed_Label_Max_Lab", "compare1_LocalSpeed_Label_Av_Lab", "compare1_LocalSpeed_Label_Dev_Lab");
                calcLocalSpeedPlot(globalCMS1,"compare1_LocalSpeed_Canvas_de94", 1, "compare1_LocalSpeed_Label_Min_de94", "compare1_LocalSpeed_Label_Max_de94", "compare1_LocalSpeed_Label_Av_de94", "compare1_LocalSpeed_Label_Dev_de94");
                calcLocalSpeedPlot(globalCMS1,"compare1_LocalSpeed_Canvas_de2000", 2, "compare1_LocalSpeed_Label_Min_de2000", "compare1_LocalSpeed_Label_Max_de2000", "compare1_LocalSpeed_Label_Av_de2000", "compare1_LocalSpeed_Label_Dev_de2000");
                calcLocalSpeedPlot(globalCMS1,"compare1_LocalSpeed_Canvas_din99", 3, "compare1_LocalSpeed_Label_Min_din99", "compare1_LocalSpeed_Label_Max_din99", "compare1_LocalSpeed_Label_Av_din99", "compare1_LocalSpeed_Label_Dev_din99");

                fillKeyCombobox(globalCMS2,"compare2_localSpeed_StartKey","compare2_localSpeed_EndKey");
                globalCMS2 = calcCMSIntervals(globalCMS2,document.getElementById("compare2_localSpeed_StartKey").selectedIndex,document.getElementById("compare2_localSpeed_EndKey").selectedIndex);
                calcLocalSpeedPlot(globalCMS2, "compare2_LocalSpeed_Canvas_Lab", 0, "compare2_LocalSpeed_Label_Min_Lab", "compare2_LocalSpeed_Label_Max_Lab", "compare2_LocalSpeed_Label_Av_Lab", "compare2_LocalSpeed_Label_Dev_Lab");
                calcLocalSpeedPlot(globalCMS2,"compare2_LocalSpeed_Canvas_de94", 1, "compare2_LocalSpeed_Label_Min_de94", "compare2_LocalSpeed_Label_Max_de94", "compare2_LocalSpeed_Label_Av_de94", "compare2_LocalSpeed_Label_Dev_de94");
                calcLocalSpeedPlot(globalCMS2,"compare2_LocalSpeed_Canvas_de2000", 2, "compare2_LocalSpeed_Label_Min_de2000", "compare2_LocalSpeed_Label_Max_de2000", "compare2_LocalSpeed_Label_Av_de2000", "compare2_LocalSpeed_Label_Dev_de2000");
                calcLocalSpeedPlot(globalCMS2,"compare2_LocalSpeed_Canvas_din99", 3, "compare2_LocalSpeed_Label_Min_din99", "compare2_LocalSpeed_Label_Max_din99", "compare2_LocalSpeed_Label_Av_din99", "compare2_LocalSpeed_Label_Dev_din99");
              break;
              case 5:
                  intervalSize=parseFloat(document.getElementById("id_CompareInputIntervalNum3").value);
                  document.getElementById("id_selectCompareOrder").style.background=styleActiveColor;
                  document.getElementById("compareOrder").style.display="inline-block";

                  fillKeyCombobox(globalCMS1,"compare1_Order_StartKey","compare1_Order_EndKey");
                  globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("compare1_Order_StartKey").selectedIndex,document.getElementById("compare1_Order_EndKey").selectedIndex);
                  calcOrderPlot(globalCMS1, "compare1_OrderSpeed_Canvas_Lab", 0, "compare1_OrderSpeed_Label_Min_Lab", "compare1_OrderSpeed_Label_MinGlobal_Lab");
                  calcOrderPlot(globalCMS1,"compare1_OrderSpeed_Canvas_de94", 1, "compare1_OrderSpeed_Label_Min_de94", "compare1_OrderSpeed_Label_MinGlobal_de94");
                  calcOrderPlot(globalCMS1,"compare1_OrderSpeed_Canvas_de2000", 2, "compare1_OrderSpeed_Label_Min_de2000", "compare1_OrderSpeed_Label_MinGlobal_de2000");
                  calcOrderPlot(globalCMS1,"compare1_OrderSpeed_Canvas_din99", 3, "compare1_OrderSpeed_Label_Min_din99", "compare1_OrderSpeed_Label_MinGlobal_din99");

                  fillKeyCombobox(globalCMS2,"compare2_Order_StartKey","compare2_Order_EndKey");
                  globalCMS2 = calcCMSIntervals(globalCMS2,document.getElementById("compare2_Order_StartKey").selectedIndex,document.getElementById("compare2_Order_EndKey").selectedIndex);
                  calcOrderPlot(globalCMS2, "compare2_OrderSpeed_Canvas_Lab", 0, "compare2_OrderSpeed_Label_Min_Lab", "compare2_OrderSpeed_Label_MinGlobal_Lab");
                  calcOrderPlot(globalCMS2,"compare2_OrderSpeed_Canvas_de94", 1, "compare2_OrderSpeed_Label_Min_de94", "compare2_OrderSpeed_Label_MinGlobal_de94");
                  calcOrderPlot(globalCMS2,"compare2_OrderSpeed_Canvas_de2000", 2, "compare2_OrderSpeed_Label_Min_de2000", "compare2_OrderSpeed_Label_MinGlobal_de2000");
                  calcOrderPlot(globalCMS2,"compare2_OrderSpeed_Canvas_din99", 3, "compare2_OrderSpeed_Label_Min_din99", "compare2_OrderSpeed_Label_MinGlobal_din99");
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
    globalCMS1=cloneCMS(myList[colormap1SelectIndex]);
    globalCMS2=cloneCMS(myList[colormap2SelectIndex]);

    orderColorSketch(colorspaceModus);

    changeComparePage(1);

}



function changeCourseSpaceCompare(){

  document.getElementById("id_hueValueOptionsCompare").style.display = "none";
  document.getElementById("id_RGBCourseDivCompare").style.display = "none";

  switch(analyzeColorspaceModus){
      case "rgb":
        document.getElementById("id_RGBCourseDivCompare").style.display = "initial";
        rgbInit("id_canvasRGCompare","id_canvasRBCompare","id_canvasBGCompare", true);
        drawcolormap_RGBSpace(true,true);
        animate();
      break;
      case "hsv":
        document.getElementById("id_hueValueOptionsCompare").style.display = "initial";
        //document.getElementById("id_setValueRangeCompare").value = 100;
          drawcolormap_hueSpace(true, true, true);
        stopAnimation();
      break;
      case "lab": case "din99":
        document.getElementById("id_hueValueOptionsCompare").style.display = "initial";
        //document.getElementById("id_setValueRangeCompare").value = 65;
        drawcolormap_hueSpace(true, true, true);
        stopAnimation();
      break;
      default:
      console.log("Error at the changeColorspace function");
      return;
  }//


}

function drawCompareMapPreviews(){

  var oldColorspace = colorspaceModus;

  colorspaceModus="rgb";
      drawCanvasColormap("id_compare1RGB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalCMS1);
      drawCanvasColormap("id_compare2RGB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalCMS2);
  colorspaceModus="hsv";
      drawCanvasColormap("id_compare1HSV_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalCMS1);
      drawCanvasColormap("id_compare2HSV_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalCMS2);
  colorspaceModus="lab";
      drawCanvasColormap("id_compare1LAB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalCMS1);
      drawCanvasColormap("id_compare2LAB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalCMS2);
  colorspaceModus="din99";
      drawCanvasColormap("id_compare1DIN99_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalCMS1);
      drawCanvasColormap("id_compare2DIN99_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalCMS2);
  colorspaceModus = oldColorspace;
}
