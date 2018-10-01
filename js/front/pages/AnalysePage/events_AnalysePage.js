
function calcCMSIntervals(workCMS, startKeyIndex, endKeyIndex){

  switch (intervalMode) {
    case 0:

        workCMS.calcGlobalIntervalColors(intervalSize, colorspaceModus, startKeyIndex, endKeyIndex, doNoMerge);


      break;

    /*case 1:



      break;*/

    case 2:


        workCMS.calcDeltaIntervalColors(intervalDelta, colorspaceModus, startKeyIndex, endKeyIndex);

    break;
    default:
      intervalMode=0;

        workCMS.calcGlobalIntervalColors(intervalSize, colorspaceModus, startKeyIndex, endKeyIndex, doNoMerge);


  }

  return workCMS;

}


function updateAnalyzePage(){

  if(document.getElementById("analyzeIntSpace").style.display!="none"){
    drawAnalyseMapPreviews();
    return;
  }

  if(document.getElementById("analyzeColormapPath").style.display!="none"){
    initRGB3D();
    changeCourseSpace();
    return;
  }

  if(document.getElementById("analyzeGlobalSpeed").style.display!="none"){

    globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("analyze_globalSpeed_StartKey").selectedIndex,document.getElementById("analyze_globalSpeed_EndKey").selectedIndex);
    calcGlobalSpeedPlot(globalCMS1,"analyze_GlobalSpeed_Canvas_Lab", 0, "analyze_GlobalSpeed_Label_Min_Lab", "analyze_GlobalSpeed_Label_Max_Lab", "analyze_GlobalSpeed_Label_Av_Lab", "analyze_GlobalSpeed_Label_Dev_Lab");
    calcGlobalSpeedPlot(globalCMS1,"analyze_GlobalSpeed_Canvas_de94", 1, "analyze_GlobalSpeed_Label_Min_de94", "analyze_GlobalSpeed_Label_Max_de94", "analyze_GlobalSpeed_Label_Av_de94", "analyze_GlobalSpeed_Label_Dev_de94");
    calcGlobalSpeedPlot(globalCMS1,"analyze_GlobalSpeed_Canvas_de2000", 2, "analyze_GlobalSpeed_Label_Min_de2000", "analyze_GlobalSpeed_Label_Max_de2000", "analyze_GlobalSpeed_Label_Av_de2000", "analyze_GlobalSpeed_Label_Dev_de2000");
    calcGlobalSpeedPlot(globalCMS1,"analyze_GlobalSpeed_Canvas_din99", 3, "analyze_GlobalSpeed_Label_Min_din99", "analyze_GlobalSpeed_Label_Max_din99", "analyze_GlobalSpeed_Label_Av_din99", "analyze_GlobalSpeed_Label_Dev_din99");
    return;
  }

  if(document.getElementById("analyzeLocalBarSpeed").style.display!="none"){
    drawKeySpeed(globalCMS1,"id_anaylseRatioRGB",0);
    drawKeySpeed(globalCMS1,"id_anaylseRatioHSV",1);
    drawKeySpeed(globalCMS1,"id_anaylseRatioLAB",2);
    drawKeySpeed(globalCMS1,"id_anaylseRatioDE94",3);
    drawKeySpeed(globalCMS1,"id_anaylseRatioDe2000",4);
    drawKeySpeed(globalCMS1,"id_anaylseRatioDIN99",5);
    return;
  }

  if(document.getElementById("analyzeLocalLineSpeed").style.display!="none"){
    globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("analyze_localSpeed_StartKey").selectedIndex,document.getElementById("analyze_localSpeed_EndKey").selectedIndex);
    calcLocalSpeedPlot(globalCMS1,"analyze_LocalSpeed_Canvas_Lab", 0, "analyze_LocalSpeed_Label_Min_Lab", "analyze_LocalSpeed_Label_Max_Lab", "analyze_LocalSpeed_Label_Av_Lab", "analyze_LocalSpeed_Label_Dev_Lab");
    calcLocalSpeedPlot(globalCMS1,"analyze_LocalSpeed_Canvas_de94", 1, "analyze_LocalSpeed_Label_Min_de94", "analyze_LocalSpeed_Label_Max_de94", "analyze_LocalSpeed_Label_Av_de94", "analyze_LocalSpeed_Label_Dev_de94");
    calcLocalSpeedPlot(globalCMS1,"analyze_LocalSpeed_Canvas_de2000", 2, "analyze_LocalSpeed_Label_Min_de2000", "analyze_LocalSpeed_Label_Max_de2000", "analyze_LocalSpeed_Label_Av_de2000", "analyze_LocalSpeed_Label_Dev_de2000");
    calcLocalSpeedPlot(globalCMS1,"analyze_LocalSpeed_Canvas_din99", 3, "analyze_LocalSpeed_Label_Min_din99", "analyze_LocalSpeed_Label_Max_din99", "analyze_LocalSpeed_Label_Av_din99", "analyze_LocalSpeed_Label_Dev_din99");
    return;
  }

  if(document.getElementById("analyzeOrder").style.display!="none"){
    globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("analyze_Order_StartKey").selectedIndex,document.getElementById("analyze_Order_EndKey").selectedIndex);
    calcOrderPlot(globalCMS1,"analyze_OrderSpeed_Canvas_Lab", 0, "analyze_OrderSpeed_Label_Min_Lab", "analyze_OrderSpeed_Label_MinGlobal_Lab");
    calcOrderPlot(globalCMS1,"analyze_OrderSpeed_Canvas_de94", 1, "analyze_OrderSpeed_Label_Min_de94", "analyze_OrderSpeed_Label_MinGlobal_de94");
    calcOrderPlot(globalCMS1,"analyze_OrderSpeed_Canvas_de2000", 2, "analyze_OrderSpeed_Label_Min_de2000", "analyze_OrderSpeed_Label_MinGlobal_de2000");
    calcOrderPlot(globalCMS1,"analyze_OrderSpeed_Canvas_din99", 3, "analyze_OrderSpeed_Label_Min_din99", "analyze_OrderSpeed_Label_MinGlobal_din99");
    return;
  }

}

/*function changePlotType(type){
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

  if(showSideID==2)
  updateAnalyzePage();

  if(showSideID==3)
  updateComparePage();
}*/


function changePlotMode(mode){

  switch (mode) {
    case 0:
      doLogMartixPlot=false;
      document.getElementById("button_AnalyzeDoLogPlot").style.border = "0.2vh solid black";
      document.getElementById("button_AnalyzeDoLogPlot").style.color = "black";
      document.getElementById("button_AnalyzeDoLinearPlot").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_AnalyzeDoLinearPlot").style.color = styleActiveColor;
      document.getElementById("button_CompareDoLogPlot").style.border = "0.2vh solid black";
      document.getElementById("button_CompareDoLogPlot").style.color = "black";
      document.getElementById("button_CompareDoLinearPlot").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_CompareDoLinearPlot").style.color = styleActiveColor;
      break;
      case 1:
      doLogMartixPlot=true;
      document.getElementById("button_AnalyzeDoLinearPlot").style.border = "0.2vh solid black";
      document.getElementById("button_AnalyzeDoLinearPlot").style.color = "black";
      document.getElementById("button_AnalyzeDoLogPlot").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_AnalyzeDoLogPlot").style.color = styleActiveColor;
      document.getElementById("button_CompareDoLinearPlot").style.border = "0.2vh solid black";
      document.getElementById("button_CompareDoLinearPlot").style.color = "black";
      document.getElementById("button_CompareDoLogPlot").style.border = "0.2vh solid "+styleActiveColor;
      document.getElementById("button_CompareDoLogPlot").style.color = styleActiveColor;
        break;
    default:

  }


  if(showSideID==2)
  updateAnalyzePage();

  if(showSideID==3)
  updateComparePage();

}


function changeAnalyzePage(type){


  document.getElementById("id_selectAnalyzeSpace").style.background=styleInactiveColor;
  document.getElementById("id_selectAnalyzePath").style.background=styleInactiveColor;
  document.getElementById("id_selectAnalyzeMatrix").style.background=styleInactiveColor;
  document.getElementById("id_selectAnalyzeBar").style.background=styleInactiveColor;
  document.getElementById("id_selectAnalyzeLine").style.background=styleInactiveColor;
  document.getElementById("id_selectAnalyzeOrder").style.background=styleInactiveColor;


  document.getElementById("analyzeColormapPath").style.display="none";
  document.getElementById("analyzeGlobalSpeed").style.display="none";
  document.getElementById("analyzeLocalLineSpeed").style.display="none";
  document.getElementById("analyzeLocalBarSpeed").style.display="none";
  document.getElementById("analyzeOrder").style.display="none";
  document.getElementById("analyzeIntSpace").style.display="none";



  switch (type) {
    case 0:
        document.getElementById("id_selectAnalyzeSpace").style.background=styleActiveColor;
        document.getElementById("analyzeIntSpace").style.display="inline-block";

        drawAnalyseMapPreviews();
      break;
      case 1:
          document.getElementById("id_selectAnalyzePath").style.background=styleActiveColor;
          document.getElementById("analyzeColormapPath").style.display="inline-block";
          initRGB3D();
          changeCourseSpace();
        break;
        case 2:
            intervalSize=parseFloat(document.getElementById("id_InputIntervalNum").value);
            document.getElementById("id_selectAnalyzeMatrix").style.background=styleActiveColor;
            document.getElementById("analyzeGlobalSpeed").style.display="inline-block";
            fillKeyCombobox(globalCMS1,"analyze_globalSpeed_StartKey","analyze_globalSpeed_EndKey");
            globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("analyze_globalSpeed_StartKey").selectedIndex,document.getElementById("analyze_globalSpeed_EndKey").selectedIndex);
            calcGlobalSpeedPlot(globalCMS1, "analyze_GlobalSpeed_Canvas_Lab", 0, "analyze_GlobalSpeed_Label_Min_Lab", "analyze_GlobalSpeed_Label_Max_Lab", "analyze_GlobalSpeed_Label_Av_Lab", "analyze_GlobalSpeed_Label_Dev_Lab");
            calcGlobalSpeedPlot(globalCMS1,"analyze_GlobalSpeed_Canvas_de94", 1, "analyze_GlobalSpeed_Label_Min_de94", "analyze_GlobalSpeed_Label_Max_de94", "analyze_GlobalSpeed_Label_Av_de94", "analyze_GlobalSpeed_Label_Dev_de94");
            calcGlobalSpeedPlot(globalCMS1,"analyze_GlobalSpeed_Canvas_de2000", 2, "analyze_GlobalSpeed_Label_Min_de2000", "analyze_GlobalSpeed_Label_Max_de2000", "analyze_GlobalSpeed_Label_Av_de2000", "analyze_GlobalSpeed_Label_Dev_de2000");
            calcGlobalSpeedPlot(globalCMS1,"analyze_GlobalSpeed_Canvas_din99", 3, "analyze_GlobalSpeed_Label_Min_din99", "analyze_GlobalSpeed_Label_Max_din99", "analyze_GlobalSpeed_Label_Av_din99", "analyze_GlobalSpeed_Label_Dev_din99");

          break;
          case 3:
              document.getElementById("id_selectAnalyzeBar").style.background=styleActiveColor;
              document.getElementById("analyzeLocalBarSpeed").style.display="inline-block";
              drawKeySpeed(globalCMS1,"id_anaylseRatioRGB",0);
              drawKeySpeed(globalCMS1,"id_anaylseRatioHSV",1);
              drawKeySpeed(globalCMS1,"id_anaylseRatioLAB",2);
              drawKeySpeed(globalCMS1,"id_anaylseRatioDE94",3);
              drawKeySpeed(globalCMS1,"id_anaylseRatioDe2000",4);
              drawKeySpeed(globalCMS1,"id_anaylseRatioDIN99",5);
            break;
            case 4:
                intervalSize=parseFloat(document.getElementById("id_InputIntervalNum2").value);
                document.getElementById("id_selectAnalyzeLine").style.background=styleActiveColor;
                document.getElementById("analyzeLocalLineSpeed").style.display="inline-block";
                fillKeyCombobox(globalCMS1,"analyze_localSpeed_StartKey","analyze_localSpeed_EndKey");
                globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("analyze_localSpeed_StartKey").selectedIndex,document.getElementById("analyze_localSpeed_EndKey").selectedIndex);
                calcLocalSpeedPlot(globalCMS1, "analyze_LocalSpeed_Canvas_Lab", 0, "analyze_LocalSpeed_Label_Min_Lab", "analyze_LocalSpeed_Label_Max_Lab", "analyze_LocalSpeed_Label_Av_Lab", "analyze_LocalSpeed_Label_Dev_Lab");
                calcLocalSpeedPlot(globalCMS1,"analyze_LocalSpeed_Canvas_de94", 1, "analyze_LocalSpeed_Label_Min_de94", "analyze_LocalSpeed_Label_Max_de94", "analyze_LocalSpeed_Label_Av_de94", "analyze_LocalSpeed_Label_Dev_de94");
                calcLocalSpeedPlot(globalCMS1,"analyze_LocalSpeed_Canvas_de2000", 2, "analyze_LocalSpeed_Label_Min_de2000", "analyze_LocalSpeed_Label_Max_de2000", "analyze_LocalSpeed_Label_Av_de2000", "analyze_LocalSpeed_Label_Dev_de2000");
                calcLocalSpeedPlot(globalCMS1,"analyze_LocalSpeed_Canvas_din99", 3, "analyze_LocalSpeed_Label_Min_din99", "analyze_LocalSpeed_Label_Max_din99", "analyze_LocalSpeed_Label_Av_din99", "analyze_LocalSpeed_Label_Dev_din99");

              break;
              case 5:
                  intervalSize=parseFloat(document.getElementById("id_InputIntervalNum3").value);
                  document.getElementById("id_selectAnalyzeOrder").style.background=styleActiveColor;
                  document.getElementById("analyzeOrder").style.display="inline-block";
                  fillKeyCombobox(globalCMS1,"analyze_Order_StartKey","analyze_Order_EndKey");
                  globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("analyze_Order_StartKey").selectedIndex,document.getElementById("analyze_Order_EndKey").selectedIndex);
                  calcOrderPlot(globalCMS1, "analyze_OrderSpeed_Canvas_Lab", 0, "analyze_OrderSpeed_Label_Min_Lab", "analyze_OrderSpeed_Label_MinGlobal_Lab");
                  calcOrderPlot(globalCMS1,"analyze_OrderSpeed_Canvas_de94", 1, "analyze_OrderSpeed_Label_Min_de94", "analyze_OrderSpeed_Label_MinGlobal_de94");
                  calcOrderPlot(globalCMS1,"analyze_OrderSpeed_Canvas_de2000", 2, "analyze_OrderSpeed_Label_Min_de2000", "analyze_OrderSpeed_Label_MinGlobal_de2000");
                  calcOrderPlot(globalCMS1,"analyze_OrderSpeed_Canvas_din99", 3, "analyze_OrderSpeed_Label_Min_din99", "analyze_OrderSpeed_Label_MinGlobal_din99");
                break;
    default:

  }






}


function increaseAnalyse3DDiv(){
    if(size3D<100){

      size3D+=5;
      document.getElementById("id_rgb3D").style.height = size3D+"vh";

      var canvasObj = document.getElementById("id_rgb3D");
      canvasObj.innerHTML="";
      var box = canvasObj.getBoundingClientRect();
      var drawWidth = box.width; //window.innerWidth;
      var drawHeight =box.height; // window.innerHeight;
      camera.aspect = drawWidth/drawHeight;
    	camera.updateProjectionMatrix();
      renderer.setSize(drawWidth,drawHeight);//(window.innerWidth, window.innerHeight);
      canvasObj.appendChild( renderer.domElement );

      if(size3D==100){
        document.getElementById("increaseAnalyse3D").style.color = "grey";
      }
      else{
        document.getElementById("increaseAnalyse3D").style.color = "black";
      }

      if(size3D==50){
        document.getElementById("decreaseAnalyse3D").style.color = "grey";
      }
      else{
        document.getElementById("decreaseAnalyse3D").style.color = "black";
      }

    }

}

function decreaseAnalyse3DDiv(){
  if(size3D>50){

    size3D-=5;
    document.getElementById("id_rgb3D").style.height = size3D+"vh";

    var canvasObj = document.getElementById("id_rgb3D");
    canvasObj.innerHTML="";
    var box = canvasObj.getBoundingClientRect();
    var drawWidth = box.width; //window.innerWidth;
    var drawHeight =box.height; // window.innerHeight;
    camera.aspect = drawWidth/drawHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(drawWidth,drawHeight);//(window.innerWidth, window.innerHeight);
    canvasObj.appendChild( renderer.domElement );


    if(size3D==100){
      document.getElementById("increaseAnalyse3D").style.color = "grey";
    }
    else{
      document.getElementById("increaseAnalyse3D").style.color = "black";
    }

    if(size3D==50){
      document.getElementById("decreaseAnalyse3D").style.color = "grey";
    }
    else{
      document.getElementById("decreaseAnalyse3D").style.color = "black";
    }

  }
}


function initAnalysePage(){
    orderColorSketch(colorspaceModus);
    changeAnalyzePage(1);
}

function changeCourseSpace(){
  document.getElementById("id_divHSVLABDIN").style.display = "none";
  document.getElementById("id_RGBCourseDiv").style.display = "none";

  switch(analyzeColorspaceModus){
      case "rgb":
        stopAnimation();
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
        drawcolormap_hueSpace(true, true, true);

      break;
      default:
      console.log("Error at the changeColorspace function");
      return;
  }
}



function drawAnalyseMapPreviews(){
  var oldColorspace = colorspaceModus;
  colorspaceModus="rgb";
      drawCanvasColormap("id_anaylseRGB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalCMS1);
  colorspaceModus="hsv";
      drawCanvasColormap("id_anaylseHSV_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalCMS1);
  colorspaceModus="lab";
      drawCanvasColormap("id_anaylseLAB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalCMS1);
  colorspaceModus="din99";
      drawCanvasColormap("id_anaylseDIN99_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalCMS1);
  colorspaceModus = oldColorspace;
}



function calcOrderPlot(intervalColormap,plotid, type, minId, minGlobalId){

      var canvasPlot = document.getElementById(plotid);

      canvasPlot.width = 1000;
      canvasPlot.height = 1000;


      var canvasCtx = canvasPlot.getContext("2d");

      canvasCtx.mozImageSmoothingEnabled = false;
      canvasCtx.webkitImageSmoothingEnabled = false;
      canvasCtx.msImageSmoothingEnabled = false;
      canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
      canvasCtx.oImageSmoothingEnabled = false;


      ///////////////////////////////////////////////////////////////
      ///// init order plot
      //////////////////////////////////////////////////////////////

      var colormapbarwidth = canvasPlot.width*0.9;
      var colormapXStart = (canvasPlot.width-colormapbarwidth)/2;
      var plotHeight = canvasPlot.height*0.9;
      var plotyStart = (canvasPlot.height-plotHeight)/2;

      var arrowHeight = canvasPlot.height*0.05;
      var arrowWidth = canvasPlot.width*0.025;
      var labelFontSize = canvasPlot.height*0.04;
      var labelYStart = (((canvasPlot.height-plotHeight)/2)-(arrowHeight/2)-labelFontSize)/2+labelFontSize;

      var arrowPlotHeight = (plotHeight*0.95)/2;
      var colormapHeight = plotHeight*0.05;
      var colormapYStart = plotyStart+(plotHeight/2)-(colormapHeight/2);
      var colormapYEnd = colormapYStart+colormapHeight;

          // colormap interval rect

          //////////////////////////////////////////////////////////////////////
          //// Arrow 1
          canvasCtx.strokeStyle = "rgb(255,127,80)";
          canvasCtx.beginPath();
          canvasCtx.lineWidth=10;
          canvasCtx.moveTo(colormapXStart, colormapYStart);
          canvasCtx.lineTo(colormapXStart, plotyStart);
          canvasCtx.stroke();

          // the triangle
          canvasCtx.beginPath();
          canvasCtx.moveTo(colormapXStart-arrowWidth, plotyStart);
          canvasCtx.lineTo(colormapXStart, plotyStart-arrowHeight);
          canvasCtx.lineTo(colormapXStart+arrowWidth, plotyStart);
          canvasCtx.closePath();

          // the fill color
          canvasCtx.fillStyle = "rgb(255,127,80)";
          canvasCtx.fill();

          /*canvasCtx.font = labelFontSize+"px Arial";
          canvasCtx.fillText("|local Order|",colormapXStart+arrowWidth,labelYStart);
          var width = canvasCtx.measureText("|local Order|").width;
          var height = canvasCtx.measureText("|local Order|").height;
          canvasCtx.fillStyle = "rgb(1,1,1)";
          canvasCtx.fillRect(colormapXStart+arrowWidth,labelYStart, width, height);*/
          //////////////////////////////////////////////////////////////////////
          //// Arrow 2
          canvasCtx.strokeStyle = "rgb(30,144,255)";
          canvasCtx.beginPath();
          canvasCtx.lineWidth=10;
          canvasCtx.moveTo(colormapXStart, colormapYEnd);
          canvasCtx.lineTo(colormapXStart, plotyStart+plotHeight);
          canvasCtx.stroke();

          // the triangle
          canvasCtx.beginPath();
          canvasCtx.moveTo(colormapXStart-arrowWidth, plotyStart+plotHeight);
          canvasCtx.lineTo(colormapXStart, plotyStart+plotHeight+arrowHeight);
          canvasCtx.lineTo(colormapXStart+arrowWidth, plotyStart+plotHeight);
          canvasCtx.closePath();

          // the fill color
          canvasCtx.fillStyle = "rgb(30,144,255)";
          canvasCtx.fill();

          /*canvasCtx.font = labelFontSize+"px Arial";
          canvasCtx.fillText("negative global Order",colormapXStart+arrowWidth,canvasPlot.height-labelYStart);
          var width = canvasCtx.measureText("negative global Order").width;
          var height = canvasCtx.measureText("negative global Order").height;
          canvasCtx.fillStyle = "rgb(1,1,1)";
          canvasCtx.fillRect(colormapXStart+arrowWidth,canvasPlot.height-labelYStart, width, height);*/


          //////////////////////////////////////////////////////////// draw refLineSketchContainer
          canvasCtx.lineWidth=1;


          //////////////////////////////////////////////////////////////////////
          //// Draw intervals

          var numKeyBars = 0;



          var currentXPos = colormapXStart;
          var bandWidth = colormapbarwidth/(intervalColormap.getIntervalLength()); //+numKeyBars);


          for(var y=0; y<intervalColormap.getIntervalLength(); y++){

                  var colorRef = intervalColormap.getIntervalColor(y,"rgb");

                  canvasCtx.fillStyle=colorRef.getRGBString();
                  canvasCtx.fillRect(currentXPos,colormapYStart,bandWidth,colormapHeight);

                  canvasCtx.strokeStyle = "rgb(0,0,0)";
                  canvasCtx.rect(currentXPos,colormapYStart,bandWidth,colormapHeight);
                  canvasCtx.stroke();

                  currentXPos+=bandWidth;

          }





        ///////////////////////////////////////////////////////////////
        ///// Calculation of Order
        //////////////////////////////////////////////////////////////

          var minLocal = 100000;
          var maxLocal = -100000;
          var minGlobal = 100000;
          ///////////////////////////////////////////////////////////////
          ///// Local Order
          //////////////////////////////////////////////////////////////

          var localOrder = [];

          for(var x=1; x<intervalColormap.getIntervalLength()-1; x++){

                  var deltaE_K0_K2=0;
                  var deltaE_K1_K2=0;
                  var deltaE_K0_K1=0;


                  switch (type) {
                      case 0:
                       deltaE_K0_K2= calc3DEuclideanDistance(intervalColormap.getIntervalColor(x-1,"lab"),intervalColormap.getIntervalColor(x+1,"lab"));
                       deltaE_K1_K2= calc3DEuclideanDistance(intervalColormap.getIntervalColor(x,"lab"),intervalColormap.getIntervalColor(x+1,"lab"));
                       deltaE_K0_K1= calc3DEuclideanDistance(intervalColormap.getIntervalColor(x-1,"lab"),intervalColormap.getIntervalColor(x,"lab"));
                        break;

                        case 1:
                         deltaE_K0_K2= calcDeltaDE94(intervalColormap.getIntervalColor(x-1,"lab"),intervalColormap.getIntervalColor(x+1,"lab"));
                         deltaE_K1_K2= calcDeltaDE94(intervalColormap.getIntervalColor(x,"lab"),intervalColormap.getIntervalColor(x+1,"lab"));
                         deltaE_K0_K1= calcDeltaDE94(intervalColormap.getIntervalColor(x-1,"lab"),intervalColormap.getIntervalColor(x,"lab"));
                          break;

                          case 2:
                           deltaE_K0_K2= calcDeltaCIEDE2000(intervalColormap.getIntervalColor(x-1,"lab"),intervalColormap.getIntervalColor(x+1,"lab"));
                           deltaE_K1_K2= calcDeltaCIEDE2000(intervalColormap.getIntervalColor(x,"lab"),intervalColormap.getIntervalColor(x+1,"lab"));
                           deltaE_K0_K1= calcDeltaCIEDE2000(intervalColormap.getIntervalColor(x-1,"lab"),intervalColormap.getIntervalColor(x,"lab"));
                            break;

                          case 3:
                            deltaE_K0_K2= calc3DEuclideanDistance(intervalColormap.getIntervalColor(x-1,"din99"),intervalColormap.getIntervalColor(x+1,"din99"));
                            deltaE_K1_K2= calc3DEuclideanDistance(intervalColormap.getIntervalColor(x,"din99"),intervalColormap.getIntervalColor(x+1,"din99"));
                            deltaE_K0_K1= calc3DEuclideanDistance(intervalColormap.getIntervalColor(x-1,"din99"),intervalColormap.getIntervalColor(x,"din99"));
                            break;
                      default:

                  }

                  var tmpVal1 = deltaE_K0_K2-deltaE_K0_K1;
                  var tmpVal2 = deltaE_K0_K2-deltaE_K1_K2;


                  var orderVal = Math.min(tmpVal1,tmpVal2);

                  maxLocal = Math.max(maxLocal,orderVal);
                  minLocal = Math.min(minLocal,orderVal);

                  localOrder.push(orderVal);

          }

          // draw
            currentXPos = colormapXStart+bandWidth;

            if(minLocal<0)
            maxLocal = Math.max(maxLocal,minLocal*-1);

            for(var y=0; y<localOrder.length; y++){

                  var colorRef = new classColor_RGB(0,0,1);

                  var tmpVal = localOrder[y];
                  if(tmpVal<0){
                    tmpVal *= -1;
                    colorRef = new classColor_RGB(1,0,0);
                  }

                    var deltaHeight = arrowPlotHeight*(tmpVal/maxLocal);
                    var yPos= colormapYStart-deltaHeight;

                    canvasCtx.fillStyle=colorRef.getRGBString();
                    canvasCtx.fillRect(currentXPos,yPos,bandWidth,deltaHeight);

                    //canvasCtx.strokeStyle = "rgb(0,0,0)";
                    //canvasCtx.rect(currentXPos,yPos,bandWidth,deltaHeight);
                    //canvasCtx.stroke();



                  currentXPos+=bandWidth;

            }


          ///////////////////////////////////////////////////////////////
          ///// Global Order
          //////////////////////////////////////////////////////////////

          var arrayk0 = [];
          var t1,t2,t3;

          var minGlobal = 100000;
          for(var k0=0; k0<intervalColormap.getIntervalLength()-2; k0++){

                  var deltaE_K0_K2=0;
                  var deltaE_K1_K2=0;
                  var deltaE_K0_K1=0;

                  //var arrayk2 = [-1,-1,-1,-1];

                  for(var k2=k0+2; k2<intervalColormap.getIntervalLength(); k2++){

                      var arrayk2 = [-1,-1,-1,-1];

                      for(var k1=k0+1; k1<k2; k1++){


                        switch (type) {
                            case 0:
                              deltaE_K0_K2= calc3DEuclideanDistance(intervalColormap.getIntervalColor(k0,"lab"),intervalColormap.getIntervalColor(k2,"lab"));
                              deltaE_K1_K2= calc3DEuclideanDistance(intervalColormap.getIntervalColor(k1,"lab"),intervalColormap.getIntervalColor(k2,"lab"));
                              deltaE_K0_K1= calc3DEuclideanDistance(intervalColormap.getIntervalColor(k0,"lab"),intervalColormap.getIntervalColor(k1,"lab"));
                            break;

                              case 1:
                               deltaE_K0_K2= calcDeltaDE94(intervalColormap.getIntervalColor(k0,"lab"),intervalColormap.getIntervalColor(k2,"lab"));
                               deltaE_K1_K2= calcDeltaDE94(intervalColormap.getIntervalColor(k1,"lab"),intervalColormap.getIntervalColor(k2,"lab"));
                               deltaE_K0_K1= calcDeltaDE94(intervalColormap.getIntervalColor(k0,"lab"),intervalColormap.getIntervalColor(k1,"lab"));
                                break;

                              case 2:
                                deltaE_K0_K2= calcDeltaCIEDE2000(intervalColormap.getIntervalColor(k0,"lab"),intervalColormap.getIntervalColor(k2,"lab"));
                                deltaE_K1_K2= calcDeltaCIEDE2000(intervalColormap.getIntervalColor(k1,"lab"),intervalColormap.getIntervalColor(k2,"lab"));
                                deltaE_K0_K1= calcDeltaCIEDE2000(intervalColormap.getIntervalColor(k0,"lab"),intervalColormap.getIntervalColor(k1,"lab"));
                                break;

                              case 3:
                                deltaE_K0_K2= calc3DEuclideanDistance(intervalColormap.getIntervalColor(k0,"din99"),intervalColormap.getIntervalColor(k2,"din99"));
                                deltaE_K1_K2= calc3DEuclideanDistance(intervalColormap.getIntervalColor(k1,"din99"),intervalColormap.getIntervalColor(k2,"din99"));
                                deltaE_K0_K1= calc3DEuclideanDistance(intervalColormap.getIntervalColor(k0,"din99"),intervalColormap.getIntervalColor(k1,"din99"));
                                break;
                            default:

                        }

                        var tmpVal1 = deltaE_K0_K2-deltaE_K0_K1;
                        var tmpVal2 = deltaE_K0_K2-deltaE_K1_K2;


                        var orderVal = Math.min(tmpVal1,tmpVal2);

                        minGlobal = Math.min(minGlobal,orderVal);

                        if(orderVal<arrayk2[0]){
                          arrayk2[0]= orderVal;
                          arrayk2[1]= k0;
                          arrayk2[2]= k1;
                          arrayk2[3]= k2;
                          //
                        }

                      }

                      if(arrayk2[3]!=-1)
                      arrayk0.push(arrayk2);

                  }

          }



          var dodraw = true;

          if(minGlobal>=0)
          dodraw=false;

          if(dodraw){

            // sort
            arrayk0 = quickSort(arrayk0);

            // draw

            for(var i=0; i<arrayk0.length; i++){

                var colorRef = intervalColormap.getIntervalColor(arrayk0[i][2],"rgb");//new classColor_RGB(0,0,0); //intervalColormap.getIntervalColor(k1Pos,"rgb");

                var xPosK0 = colormapXStart+arrayk0[i][1]*bandWidth+(bandWidth/2);
                var xPosK2 = colormapXStart+arrayk0[i][3]*bandWidth+(bandWidth/2);
                var xPosK1 = colormapXStart+arrayk0[i][2]*bandWidth+(bandWidth/2);

                var deltaHeight = (arrowPlotHeight*(arrayk0[i][0]/minGlobal)*2);

                var yPosK1 = colormapYEnd+deltaHeight;

                //canvasCtx.globalAlpha=1.0+(-0.8*(tmpMin/maxNegMin));
                        canvasCtx.strokeStyle = colorRef.getRGBString();//"rgb(0,0,0)";
                        canvasCtx.beginPath();
                        canvasCtx.lineWidth=2;
                        canvasCtx.beginPath();
                        canvasCtx.moveTo(xPosK0,colormapYEnd);
                        canvasCtx.quadraticCurveTo(xPosK1,yPosK1,xPosK2,colormapYEnd);
                        canvasCtx.stroke();
              }

          }




        //////////////////////////////////////////////////////////////

        if(minLocal<0)
        document.getElementById(minId).style.color = "red";
        else
        document.getElementById(minId).style.color = "black";

        if(minGlobal<0)
        document.getElementById(minGlobalId).style.color = "red";
        else
        document.getElementById(minGlobalId).style.color = "black";

        document.getElementById(minId).innerHTML = "Local Minimum = "+ minLocal.toFixed(numDecimalPlaces);
        document.getElementById(minGlobalId).innerHTML = "Global Minimum = "+ minGlobal.toFixed(numDecimalPlaces);

}



function calcGlobalSpeedPlot(intervalColormap, plotid, type, minId, maxId, avId, devId){

      var canvasPlot = document.getElementById(plotid);


      canvasPlot.width = intervalColormap.getIntervalLength();
      canvasPlot.height = intervalColormap.getIntervalLength();

      var canvasCtx = canvasPlot.getContext("2d");

       canvasCtx.mozImageSmoothingEnabled = false;
       canvasCtx.webkitImageSmoothingEnabled = false;
       canvasCtx.msImageSmoothingEnabled = false;
       canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
       canvasCtx.oImageSmoothingEnabled = false;

      var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height); //getImageData(0, 0, canvasPlot.width, canvasPlot.height);
      var sumForAverage = 0;
      var min = 1000000;
      var realMax = 0;
      var realMin = 1000000;
      var max = 0;
        var numTwinOrLeft=0;

      var matrix = [];

      for(var x=0; x<intervalColormap.getIntervalLength(); x++){

        var column = [];
        for(var y=0; y<intervalColormap.getIntervalLength(); y++){

            var deltaE=0;
            var speed=0;
            if(x!=y){
              switch (type) {
                case 0:

                deltaE = calc3DEuclideanDistance(intervalColormap.getIntervalColor(x,"lab"),intervalColormap.getIntervalColor(y,"lab"));
                  break;

                  case 1:
                    deltaE = calcDeltaDE94(intervalColormap.getIntervalColor(x,"lab"),intervalColormap.getIntervalColor(y,"lab"));
                    break;

                    case 2:
                      deltaE = calcDeltaCIEDE2000(intervalColormap.getIntervalColor(x,"lab"),intervalColormap.getIntervalColor(y,"lab"));
                      break;

                      case 3:
                      deltaE = calc3DEuclideanDistance(intervalColormap.getIntervalColor(x,"din99"),intervalColormap.getIntervalColor(y,"din99"));
                        break;
                default:

              }

              /*switch (plotType) {
                case 0:*/

                  if(intervalColormap.getIntervalRef(x)==intervalColormap.getIntervalRef(y)){
                    console.log(x,y);
                    speed=-1;
                    numTwinOrLeft++;
                  }
                  else{
                    var distance = Math.sqrt(Math.pow(intervalColormap.getIntervalRef(x)-intervalColormap.getIntervalRef(y),2))
                    speed = deltaE/distance;
                    realMin = Math.min(realMin,speed);
                    realMax = Math.max(realMax,speed);
                    if(doLogMartixPlot)
                    speed = Math.log(speed+1);
                    min = Math.min(min,speed);
                    max = Math.max(max,speed);
                    sumForAverage += speed;
                  }
                /*  break;
                case 1:
                    realMin = Math.min(realMin,deltaE);
                    realMax = Math.max(realMax,deltaE);
                    if(doLogMartixPlot)
                    deltaE = Math.log(deltaE+1);
                    min = Math.min(min,deltaE);
                    max = Math.max(max,deltaE);
                    sumForAverage += deltaE;
                    break;
                default:
                  return;

              }*/


            }


            /*switch (plotType) {
              case 0:*/
                column.push(speed);
            /*    break;
              case 1:
                column.push(deltaE);
                  break;
              default:
                return;

            }*/

        }
        matrix.push(column);
      }


      var average=sumForAverage/(intervalColormap.getIntervalLength()*intervalColormap.getIntervalLength()-intervalColormap.getIntervalLength()-numTwinOrLeft);
      var sumForVariance = 0;

      //////////////////////////////////////////////////////////////////////////////////
      // calc variance
      ////////////////////////////////////////////////////////////////////////////////////

      for(var x=0; x<intervalColormap.getIntervalLength(); x++){

        for(var y=0; y<intervalColormap.getIntervalLength(); y++){

            var colorRef = new classColor_RGB(0,0,0);
            if(x==y){
              colorRef = intervalColormap.getIntervalColor(x,"rgb")
            }
            else
            {


              /*switch (plotType) {
                case 0:*/
                  var speed= matrix[x][y];
                  var val = (speed-min)/(max-min);
                  if(speed==-1){
                    val=1;
                  }
                  else{
                    sumForVariance += Math.pow(matrix[x][y]-average,2);
                  }

                  colorRef = new classColor_RGB(val,val,val);
              /*    break;
                case 1:
                    var deltaE= matrix[x][y];
                    var val = (deltaE-min)/(max-min);
                    sumForVariance += Math.pow(matrix[x][y]-average,2);
                    colorRef = new classColor_RGB(val,val,val);
                    break;
                default:
                  return;

              }*/



            }
            var index = (x + y * canvasPlot.width) * 4;
            canvasData.data[index + 0] = Math.round(colorRef.getRValue() * 255); // r
            canvasData.data[index + 1] = Math.round(colorRef.getGValue() * 255); // g
            canvasData.data[index + 2] = Math.round(colorRef.getBValue() * 255); // b
            canvasData.data[index + 3] = 255; //a




        }
      }

      canvasCtx.putImageData(canvasData, 0, 0);

      var variance = sumForVariance/(intervalColormap.getIntervalLength()*intervalColormap.getIntervalLength()-intervalColormap.getIntervalLength()-numTwinOrLeft);
      var deviation = Math.sqrt(variance);


      document.getElementById(minId).innerHTML = "Global Speed Minimum = "+ realMin.toFixed(numDecimalPlaces);

      if(min==0)
      document.getElementById(minId).style.color = "red";
      else
      document.getElementById(minId).style.color = "black";

      document.getElementById(maxId).innerHTML = "Global Speed Maximum = "+ realMax.toFixed(numDecimalPlaces);
      document.getElementById(avId).innerHTML = "Global Speed Average = "+ average.toFixed(numDecimalPlaces);
      document.getElementById(devId).innerHTML = "Global Speed Deviation = "+ deviation.toFixed(numDecimalPlaces);


}


function calcLocalSpeedPlot(intervalColormap, plotid, type, minId, maxId, avId, devId){

      var canvasPlot = document.getElementById(plotid);

      canvasPlot.width = 500;
      canvasPlot.height = 500;

      var canvasCtx = canvasPlot.getContext("2d");
      canvasCtx.webkitImageSmoothingEnabled = false;
      canvasCtx.mozImageSmoothingEnabled = false;
      canvasCtx.imageSmoothingEnabled = false;
      canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);
      var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height); //getImageData(0, 0, canvasPlot.width, canvasPlot.height);
      var sumForAverage = 0;
      var min = 1000000;
      var max = 0;

      var bandWidth = canvasPlot.width/(intervalColormap.getIntervalLength()-1);

      var vector = [];

      var numTwinOrLeft=0;
      for(var x=0; x<intervalColormap.getIntervalLength()-1; x++){

            var deltaE=0;
            var speed=0;
            //if(x!=y){

              switch (type) {
                case 0:

                deltaE = calc3DEuclideanDistance(intervalColormap.getIntervalColor(x,"lab"),intervalColormap.getIntervalColor(x+1,"lab"));
                  break;

                  case 1:
                    deltaE = calcDeltaDE94(intervalColormap.getIntervalColor(x,"lab"),intervalColormap.getIntervalColor(x+1,"lab"));
                    break;

                    case 2:
                      deltaE = calcDeltaCIEDE2000(intervalColormap.getIntervalColor(x,"lab"),intervalColormap.getIntervalColor(x+1,"lab"));
                      break;

                      case 3:
                      deltaE = calc3DEuclideanDistance(intervalColormap.getIntervalColor(x,"din99"),intervalColormap.getIntervalColor(x+1,"din99"));
                        break;
                default:

              }




              /*switch (plotType) {
                case 0:*/
                  var distance = intervalColormap.getIntervalRef(x+1)-intervalColormap.getIntervalRef(x);

                  if(distance==0){
                    speed=-1;
                    numTwinOrLeft++;
                  }
                  else{
                    speed = deltaE/distance;
                    min = Math.min(min,speed);
                    max = Math.max(max,speed);
                    sumForAverage += speed;
                  }
                  vector.push(speed);
              /*    break;
                case 1:
                    min = Math.min(min,deltaE);
                    max = Math.max(max,deltaE);
                    sumForAverage += deltaE;
                    vector.push(deltaE);
                    break;
                default:
                  return;

              }*/

      }


      var average=sumForAverage/(vector.length-numTwinOrLeft);
      var sumForVariance = 0;

      //////////////////////////////////////////////////////////////////////////////////
      // calc variance
      ////////////////////////////////////////////////////////////////////////////////////

      var currentXPos = 0;
      for(var y=0; y<vector.length; y++){


            if(vector[y]!=-1){
              var colorRef = intervalColormap.getIntervalColor(y,"rgb");
              var colorRef2 = intervalColormap.getIntervalColor(y+1,"rgb");

              var deltaHeight = canvasPlot.height*(vector[y]/max);
              var yPos= canvasPlot.height-deltaHeight;


              var gradient=canvasCtx.createLinearGradient(0,0,0,canvasPlot.height);
              gradient.addColorStop(0,colorRef2.getRGBString());
              gradient.addColorStop(1,colorRef.getRGBString());
              canvasCtx.fillStyle=gradient;
              canvasCtx.fillRect(currentXPos,yPos,bandWidth,deltaHeight);

              //canvasCtx.strokeStyle = "rgb(0,0,0)";
              //canvasCtx.rect(currentXPos,yPos,bandWidth,deltaHeight);
              //canvasCtx.stroke();

              sumForVariance += Math.pow(vector[y]-average,2);
            }
            else{

            }



            currentXPos+=bandWidth;

      }

      //canvasCtx.putImageData(canvasData, 0, 0);

      var variance = sumForVariance/(vector.length-numTwinOrLeft);
      var deviation = Math.sqrt(variance);


      document.getElementById(minId).innerHTML = "Local Speed Minimum = "+ min.toFixed(numDecimalPlaces);

      if(min==0)
      document.getElementById(minId).style.color = "red";
      else
      document.getElementById(minId).style.color = "black";

      document.getElementById(maxId).innerHTML = "Local Speed Maximum = "+ max.toFixed(numDecimalPlaces);
      document.getElementById(avId).innerHTML = "Local Speed Average = "+ average.toFixed(numDecimalPlaces);
      document.getElementById(devId).innerHTML = "Local Speed Deviation = "+ deviation.toFixed(numDecimalPlaces);


}




function drawKeySpeed(cms, plotid, type){

  var canvasPlot = document.getElementById(plotid);

  canvasPlot.width = resolutionX_differenceMetrics;
  canvasPlot.height = 1;

  var canvasCtx = canvasPlot.getContext("2d");
  canvasCtx.webkitImageSmoothingEnabled = false;
  canvasCtx.mozImageSmoothingEnabled = false;
  canvasCtx.imageSmoothingEnabled = false;
  canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);
  var canvasData = canvasCtx.createImageData(resolutionX_differenceMetrics, 1); //getImageData(0, 0, canvasPlot.width, canvasPlot.height);

  var borderWidth = 2; //px


  var numberOfScaledBands=0;
  var currentWidth=0;
  var currentPos=0;

  var arraySpeed = [];
  var arraySpeedSum = 0;
  var indexList = [];
  /////////////////////////////////////////////////////////////////////////////
  // Calc Speed
  for(var x=0; x<cms.getKeyLength()-1; x++){

          var speed=0;
          var dis = cms.getRefPosition(x+1)-cms.getRefPosition(x);

          if(cms.getKeyType(x)==="nil key" || cms.getKeyType(x)==="left key")
          continue;


          numberOfScaledBands++;
          indexList.push(x);

          if(dis!=0){
            switch (type) {
              case 0:
                var c1 = cms.getRightKeyColor(x,"rgb");
                var c2 = cms.getLeftKeyColor(x+1,"rgb");

                if(c1!=undefined)
                 speed= calc3DEuclideanDistance(c1,c2)/dis;
                break;
              case 1:
                  var c1 = cms.getRightKeyColor(x,"hsv");
                  var c2 = cms.getLeftKeyColor(x+1,"hsv");

                  if(c1!=undefined)
                   speed= calc3DEuclideanDistance(c1,c2)/dis;
                  break;
              case 2:
                var c1 = cms.getRightKeyColor(x,"lab");
                var c2 = cms.getLeftKeyColor(x+1,"lab");

                if(c1!=undefined)
                 speed= calc3DEuclideanDistance(c1,c2)/dis;

                break;
                case 3:
                var c1 = cms.getRightKeyColor(x,"lab");
                var c2 = cms.getLeftKeyColor(x+1,"lab");

                if(c1!=undefined)
                 speed= calcDeltaDE94(c1,c2)/dis;

                  break;

                  case 4:
                  var c1 = cms.getRightKeyColor(x,"lab");
                  var c2 = cms.getLeftKeyColor(x+1,"lab");

                  if(c1!=undefined)
                   speed= calcDeltaCIEDE2000(c1,c2)/dis;
                    break;

                    case 5:
                    var c1 = cms.getRightKeyColor(x,"din99");
                    var c2 = cms.getLeftKeyColor(x+1,"din99");

                    if(c1!=undefined)
                     speed= calc3DEuclideanDistance(c1,c2)/dis;

                      break;
              default:
            }

          }


          arraySpeed.push(speed);
          arraySpeedSum += speed;
  }

  var restWidth = resolutionX_differenceMetrics-(numberOfScaledBands-1)*borderWidth;
  /////////////////////////////////////////////////////////////////////////////
  // Calc Speed
  for (var i = 0; i < arraySpeed.length; i++) {

    var tr = document.createElement('tr');

    if(speed[i]==0){

      // table

      continue;
    }


    var tmpRatio = arraySpeed[i]/arraySpeedSum;
    currentWidth = Math.ceil(restWidth*tmpRatio);

    var color1;
    var color2;

    switch (type) {
      case 0:
      color1 = cms.getRightKeyColor(indexList[i],"rgb");
      color2 = cms.getLeftKeyColor(indexList[i]+1,"rgb");

        for(var x=0; x<currentWidth; x++){
          var index = (currentPos+x) * 4;

          var tmpRatio = x/currentWidth;

          var rValue = color1.getRValue() + (color2.getRValue() - color1.getRValue()) * tmpRatio;
          var gValue = color1.getGValue() + (color2.getGValue() - color1.getGValue()) * tmpRatio;
          var bValue = color1.getBValue() + (color2.getBValue() - color1.getBValue()) * tmpRatio;

          canvasData.data[index + 0] = Math.round(rValue * 255); // r
          canvasData.data[index + 1] = Math.round(gValue * 255); // g
          canvasData.data[index + 2] = Math.round(bValue * 255); // b
          canvasData.data[index + 3] = 255; //a
        }

        break;
      case 1:
      color1 = cms.getRightKeyColor(indexList[i],"hsv");
      color2 = cms.getLeftKeyColor(indexList[i]+1,"hsv");

      var tmpDis = color1.getSValue()*50; // radius 50; center(0,0,0);
                                    var tmpRad = (color1.getHValue()*Math.PI*2)-Math.PI;
                                    var xPos = tmpDis*Math.cos(tmpRad);
                                    var yPos = tmpDis*Math.sin(tmpRad);
                                    var zPos = color1.getVValue()-50;

                                    var tmpDis2 = color2.getSValue()*50;
                                    var tmpRad2 = (color2.getHValue()*Math.PI*2)-Math.PI;
                                    var xPos2 = tmpDis2*Math.cos(tmpRad2);
                                    var yPos2 = tmpDis2*Math.sin(tmpRad2);
                                    var zPos2 = color2.getVValue()-50;

        for(var x=0; x<currentWidth; x++){
          var index = (currentPos+x) * 4;

          var tmpRatio = x/currentWidth;

          var tmpX = xPos + (xPos2 - xPos) * tmpRatio;
          var tmpY = yPos + (yPos2 - yPos) * tmpRatio;
          var tmpZ = zPos + (zPos2 - zPos) * tmpRatio;

          var tmpH = (Math.atan2(tmpY, tmpX) + Math.PI) / (Math.PI * 2);
          var tmpS = Math.sqrt(Math.pow(tmpX, 2) + Math.pow(tmpY, 2)) / 50;
          var tmpV = tmpZ + 50;
          var tmpCurrentHSVColor = new classColor_HSV(tmpH, tmpS, tmpV);

          var tmpCurrentColor = tmpCurrentHSVColor.calcRGBColor();

          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }
          break;
      case 2: case 3: case 4:
      color1 = cms.getRightKeyColor(indexList[i],"lab");
      color2 = cms.getLeftKeyColor(indexList[i]+1,"lab");

        for(var x=0; x<currentWidth; x++){
          var index = (currentPos+x) * 4;

          var tmpRatio = x/currentWidth;

          var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
          var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
          var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

          var tmpCurrentLABColor = new classColor_LAB(lValue,aValue,bValue);
          var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
        }
        break;
      case 5:
      color1 = cms.getRightKeyColor(indexList[i],"din99");
      color2 = cms.getLeftKeyColor(indexList[i]+1,"din99");

      for(var x=0; x<currentWidth; x++){
        var index = (currentPos+x) * 4;

        var tmpRatio = x/currentWidth;

        var l99Value = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
        var a99Value = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
        var b99Value = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

        var tmpCurrentDIN99Color = new classColorDIN99(l99Value,a99Value,b99Value);
        var tmpCurrentColor = tmpCurrentDIN99Color.calcRGBColor();

        canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
        canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
        canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
        canvasData.data[index + 3] = 255; //a
      }
      break;
      default:

    }
    currentPos+=currentWidth;
    if(i != arraySpeed.length-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos+x) * 4;
        canvasData.data[index + 0] = Math.round(0); // r
        canvasData.data[index + 1] = Math.round(0); // g
        canvasData.data[index + 2] = Math.round(0); // b
        canvasData.data[index + 3] = 255; //a
      }

      currentPos+=borderWidth;
    }

  }// for loop speed array


  canvasCtx.putImageData(canvasData, 0, 0); // update ColorspaceCanvas;

}


function changeAnalyzeCompareKeyIndex(event){
  switch (event.target.id) {
    case "analyze_globalSpeed_StartKey": case "analyze_globalSpeed_EndKey":
      updateAnalyzeCompareKeyIndex("analyze_globalSpeed_StartKey","analyze_globalSpeed_EndKey");
      break;

      case "analyze_localSpeed_StartKey": case "analyze_localSpeed_EndKey":
        updateAnalyzeCompareKeyIndex("analyze_localSpeed_StartKey","analyze_localSpeed_EndKey");
        break;

        case "analyze_Order_StartKey": case "analyze_Order_EndKey":
          updateAnalyzeCompareKeyIndex("analyze_Order_StartKey","analyze_Order_EndKey");
          break;


          case "compare1_globalSpeed_StartKey": case "compare1_globalSpeed_EndKey":
            updateAnalyzeCompareKeyIndex("compare1_globalSpeed_StartKey","compare1_globalSpeed_EndKey");
            break;

            case "compare1_localSpeed_StartKey": case "compare1_localSpeed_EndKey":
              updateAnalyzeCompareKeyIndex("compare1_localSpeed_StartKey","compare1_localSpeed_EndKey");
              break;

              case "compare1_Order_StartKey": case "compare1_Order_EndKey":
                updateAnalyzeCompareKeyIndex("compare1_Order_StartKey","compare1_Order_EndKey");
                break;


                case "compare2_globalSpeed_StartKey": case "compare2_globalSpeed_EndKey":
                  updateAnalyzeCompareKeyIndex("compare2_globalSpeed_StartKey","compare2_globalSpeed_EndKey");
                  break;

                  case "compare2_localSpeed_StartKey": case "compare2_localSpeed_EndKey":
                    updateAnalyzeCompareKeyIndex("compare2_localSpeed_StartKey","compare2_localSpeed_EndKey");
                    break;

                    case "compare2_Order_StartKey": case "compare2_Order_EndKey":
                      updateAnalyzeCompareKeyIndex("compare2_Order_StartKey","compare2_Order_EndKey");
                      break;

    default:

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

  if(showSideID==2)
  updateAnalyzePage();

  if(showSideID==3)
  updateComparePage();
}

function fillKeyCombobox(colormap,startComboID,endComboID){

    var selectbox = document.getElementById(startComboID);
    for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
    {
        selectbox.remove(i);
    }

    // fill startbox

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
