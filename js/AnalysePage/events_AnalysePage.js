function updateAnalyzePage(){

  if(document.getElementById("analyzeIntSpace").style.display!="none"){
    drawAnalyseMapPreviews();
    return;
  }

  if(document.getElementById("analyzeColormapPath").style.display!="none"){
    intervalSize=100;
    initRGB3D();
    changeCourseSpace();
    return;
  }

  if(document.getElementById("analyzeGlobalSpeed").style.display!="none"){
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
    calcGlobalSpeedPlot(intervalColormap, "analyze_GlobalSpeed_Canvas_Lab", 0, "analyze_GlobalSpeed_Label_Min_Lab", "analyze_GlobalSpeed_Label_Max_Lab", "analyze_GlobalSpeed_Label_Av_Lab", "analyze_GlobalSpeed_Label_Dev_Lab");
    calcGlobalSpeedPlot(intervalColormap,"analyze_GlobalSpeed_Canvas_de94", 1, "analyze_GlobalSpeed_Label_Min_de94", "analyze_GlobalSpeed_Label_Max_de94", "analyze_GlobalSpeed_Label_Av_de94", "analyze_GlobalSpeed_Label_Dev_de94");
    calcGlobalSpeedPlot(intervalColormap,"analyze_GlobalSpeed_Canvas_de2000", 2, "analyze_GlobalSpeed_Label_Min_de2000", "analyze_GlobalSpeed_Label_Max_de2000", "analyze_GlobalSpeed_Label_Av_de2000", "analyze_GlobalSpeed_Label_Dev_de2000");
    calcGlobalSpeedPlot(intervalColormap,"analyze_GlobalSpeed_Canvas_din99", 3, "analyze_GlobalSpeed_Label_Min_din99", "analyze_GlobalSpeed_Label_Max_din99", "analyze_GlobalSpeed_Label_Av_din99", "analyze_GlobalSpeed_Label_Dev_din99");
    return;
  }

  if(document.getElementById("analyzeLocalBarSpeed").style.display!="none"){
    drawAnalyseDifferenceMaps();
    return;
  }

  if(document.getElementById("analyzeLocalLineSpeed").style.display!="none"){
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
    calcLocalSpeedPlot(intervalColormap, "analyze_LocalSpeed_Canvas_Lab", 0, "analyze_LocalSpeed_Label_Min_Lab", "analyze_LocalSpeed_Label_Max_Lab", "analyze_LocalSpeed_Label_Av_Lab", "analyze_LocalSpeed_Label_Dev_Lab");
    calcLocalSpeedPlot(intervalColormap,"analyze_LocalSpeed_Canvas_de94", 1, "analyze_LocalSpeed_Label_Min_de94", "analyze_LocalSpeed_Label_Max_de94", "analyze_LocalSpeed_Label_Av_de94", "analyze_LocalSpeed_Label_Dev_de94");
    calcLocalSpeedPlot(intervalColormap,"analyze_LocalSpeed_Canvas_de2000", 2, "analyze_LocalSpeed_Label_Min_de2000", "analyze_LocalSpeed_Label_Max_de2000", "analyze_LocalSpeed_Label_Av_de2000", "analyze_LocalSpeed_Label_Dev_de2000");
    calcLocalSpeedPlot(intervalColormap,"analyze_LocalSpeed_Canvas_din99", 3, "analyze_LocalSpeed_Label_Min_din99", "analyze_LocalSpeed_Label_Max_din99", "analyze_LocalSpeed_Label_Av_din99", "analyze_LocalSpeed_Label_Dev_din99");
    return;
  }

  if(document.getElementById("analyzeOrder").style.display!="none"){
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
    calcOrderPlot(intervalColormap, "analyze_OrderSpeed_Canvas_Lab", 0, "analyze_OrderSpeed_Label_Min_Lab", "analyze_OrderSpeed_Label_MinGlobal_Lab");
    calcOrderPlot(intervalColormap,"analyze_OrderSpeed_Canvas_de94", 1, "analyze_OrderSpeed_Label_Min_de94", "analyze_OrderSpeed_Label_MinGlobal_de94");
    calcOrderPlot(intervalColormap,"analyze_OrderSpeed_Canvas_de2000", 2, "analyze_OrderSpeed_Label_Min_de2000", "analyze_OrderSpeed_Label_MinGlobal_de2000");
    calcOrderPlot(intervalColormap,"analyze_OrderSpeed_Canvas_din99", 3, "analyze_OrderSpeed_Label_Min_din99", "analyze_OrderSpeed_Label_MinGlobal_din99");
    return;
  }

}

function changePlotType(type){
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
        break;
    default:


  }


  if(document.getElementById("analyzeGlobalSpeed").style.display!="none"){
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
    calcGlobalSpeedPlot(intervalColormap, "analyze_GlobalSpeed_Canvas_Lab", 0, "analyze_GlobalSpeed_Label_Min_Lab", "analyze_GlobalSpeed_Label_Max_Lab", "analyze_GlobalSpeed_Label_Av_Lab", "analyze_GlobalSpeed_Label_Dev_Lab");
    calcGlobalSpeedPlot(intervalColormap,"analyze_GlobalSpeed_Canvas_de94", 1, "analyze_GlobalSpeed_Label_Min_de94", "analyze_GlobalSpeed_Label_Max_de94", "analyze_GlobalSpeed_Label_Av_de94", "analyze_GlobalSpeed_Label_Dev_de94");
    calcGlobalSpeedPlot(intervalColormap,"analyze_GlobalSpeed_Canvas_de2000", 2, "analyze_GlobalSpeed_Label_Min_de2000", "analyze_GlobalSpeed_Label_Max_de2000", "analyze_GlobalSpeed_Label_Av_de2000", "analyze_GlobalSpeed_Label_Dev_de2000");
    calcGlobalSpeedPlot(intervalColormap,"analyze_GlobalSpeed_Canvas_din99", 3, "analyze_GlobalSpeed_Label_Min_din99", "analyze_GlobalSpeed_Label_Max_din99", "analyze_GlobalSpeed_Label_Av_din99", "analyze_GlobalSpeed_Label_Dev_din99");
    return;
  }

  if(document.getElementById("analyzeLocalLineSpeed").style.display!="none"){
    var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
    calcLocalSpeedPlot(intervalColormap, "analyze_LocalSpeed_Canvas_Lab", 0, "analyze_LocalSpeed_Label_Min_Lab", "analyze_LocalSpeed_Label_Max_Lab", "analyze_LocalSpeed_Label_Av_Lab", "analyze_LocalSpeed_Label_Dev_Lab");
    calcLocalSpeedPlot(intervalColormap,"analyze_LocalSpeed_Canvas_de94", 1, "analyze_LocalSpeed_Label_Min_de94", "analyze_LocalSpeed_Label_Max_de94", "analyze_LocalSpeed_Label_Av_de94", "analyze_LocalSpeed_Label_Dev_de94");
    calcLocalSpeedPlot(intervalColormap,"analyze_LocalSpeed_Canvas_de2000", 2, "analyze_LocalSpeed_Label_Min_de2000", "analyze_LocalSpeed_Label_Max_de2000", "analyze_LocalSpeed_Label_Av_de2000", "analyze_LocalSpeed_Label_Dev_de2000");
    calcLocalSpeedPlot(intervalColormap,"analyze_LocalSpeed_Canvas_din99", 3, "analyze_LocalSpeed_Label_Min_din99", "analyze_LocalSpeed_Label_Max_din99", "analyze_LocalSpeed_Label_Av_din99", "analyze_LocalSpeed_Label_Dev_din99");
    return;
  }
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
          intervalSize=100;
          initRGB3D();
          changeCourseSpace();
        break;
        case 2:
            intervalSize=parseFloat(document.getElementById("id_InputIntervalNum").value);
            document.getElementById("id_selectAnalyzeMatrix").style.background=styleActiveColor;
            document.getElementById("analyzeGlobalSpeed").style.display="inline-block";
            var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
            calcGlobalSpeedPlot(intervalColormap, "analyze_GlobalSpeed_Canvas_Lab", 0, "analyze_GlobalSpeed_Label_Min_Lab", "analyze_GlobalSpeed_Label_Max_Lab", "analyze_GlobalSpeed_Label_Av_Lab", "analyze_GlobalSpeed_Label_Dev_Lab");
            calcGlobalSpeedPlot(intervalColormap,"analyze_GlobalSpeed_Canvas_de94", 1, "analyze_GlobalSpeed_Label_Min_de94", "analyze_GlobalSpeed_Label_Max_de94", "analyze_GlobalSpeed_Label_Av_de94", "analyze_GlobalSpeed_Label_Dev_de94");
            calcGlobalSpeedPlot(intervalColormap,"analyze_GlobalSpeed_Canvas_de2000", 2, "analyze_GlobalSpeed_Label_Min_de2000", "analyze_GlobalSpeed_Label_Max_de2000", "analyze_GlobalSpeed_Label_Av_de2000", "analyze_GlobalSpeed_Label_Dev_de2000");
            calcGlobalSpeedPlot(intervalColormap,"analyze_GlobalSpeed_Canvas_din99", 3, "analyze_GlobalSpeed_Label_Min_din99", "analyze_GlobalSpeed_Label_Max_din99", "analyze_GlobalSpeed_Label_Av_din99", "analyze_GlobalSpeed_Label_Dev_din99");

          break;
          case 3:
              document.getElementById("id_selectAnalyzeBar").style.background=styleActiveColor;
              document.getElementById("analyzeLocalBarSpeed").style.display="inline-block";
              drawAnalyseDifferenceMaps();

            break;
            case 4:
                  intervalSize=parseFloat(document.getElementById("id_InputIntervalNum2").value);
                document.getElementById("id_selectAnalyzeLine").style.background=styleActiveColor;
                document.getElementById("analyzeLocalLineSpeed").style.display="inline-block";
                var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
                calcLocalSpeedPlot(intervalColormap, "analyze_LocalSpeed_Canvas_Lab", 0, "analyze_LocalSpeed_Label_Min_Lab", "analyze_LocalSpeed_Label_Max_Lab", "analyze_LocalSpeed_Label_Av_Lab", "analyze_LocalSpeed_Label_Dev_Lab");
                calcLocalSpeedPlot(intervalColormap,"analyze_LocalSpeed_Canvas_de94", 1, "analyze_LocalSpeed_Label_Min_de94", "analyze_LocalSpeed_Label_Max_de94", "analyze_LocalSpeed_Label_Av_de94", "analyze_LocalSpeed_Label_Dev_de94");
                calcLocalSpeedPlot(intervalColormap,"analyze_LocalSpeed_Canvas_de2000", 2, "analyze_LocalSpeed_Label_Min_de2000", "analyze_LocalSpeed_Label_Max_de2000", "analyze_LocalSpeed_Label_Av_de2000", "analyze_LocalSpeed_Label_Dev_de2000");
                calcLocalSpeedPlot(intervalColormap,"analyze_LocalSpeed_Canvas_din99", 3, "analyze_LocalSpeed_Label_Min_din99", "analyze_LocalSpeed_Label_Max_din99", "analyze_LocalSpeed_Label_Av_din99", "analyze_LocalSpeed_Label_Dev_din99");

              break;
              case 5:
                  intervalSize=parseFloat(document.getElementById("id_InputIntervalNum3").value);
                  document.getElementById("id_selectAnalyzeOrder").style.background=styleActiveColor;
                  document.getElementById("analyzeOrder").style.display="inline-block";
                  var intervalColormap = globalColormap1.calcColorMap(intervalSize, colorspaceModus);
                  calcOrderPlot(intervalColormap, "analyze_OrderSpeed_Canvas_Lab", 0, "analyze_OrderSpeed_Label_Min_Lab", "analyze_OrderSpeed_Label_MinGlobal_Lab");
                  calcOrderPlot(intervalColormap,"analyze_OrderSpeed_Canvas_de94", 1, "analyze_OrderSpeed_Label_Min_de94", "analyze_OrderSpeed_Label_MinGlobal_de94");
                  calcOrderPlot(intervalColormap,"analyze_OrderSpeed_Canvas_de2000", 2, "analyze_OrderSpeed_Label_Min_de2000", "analyze_OrderSpeed_Label_MinGlobal_de2000");
                  calcOrderPlot(intervalColormap,"analyze_OrderSpeed_Canvas_din99", 3, "analyze_OrderSpeed_Label_Min_din99", "analyze_OrderSpeed_Label_MinGlobal_din99");
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

    bandSketch.colormap2Sketch(globalColormap1);
    orderColorSketch(colorspaceModus);

    changeAnalyzePage(1);
    //drawRGBSpace();
}

function changeCourseSpace(){
  document.getElementById("id_containerHueCourse").style.display = "none";
  document.getElementById("id_anaylseValue").style.display = "none";
  document.getElementById("id_hueValueOptions").style.display = "none";
  document.getElementById("id_RGBCourseDiv").style.display = "none";

  switch(analyzeColorspaceModus){
      case "rgb":
        stopAnimation();
        document.getElementById("id_RGBCourseDiv").style.display = "initial";
        //rgbInit("id_canvasRG","id_canvasRB","id_canvasBG", true);
        drawcolormap_RGBSpace(globalColormap1, "id_canvasRG","id_canvasRB","id_canvasBG", true, true);
        animate();
      break;
      case "hsv":
        stopAnimation();
        document.getElementById("id_containerHueCourse").style.display = "initial";
        document.getElementById("id_anaylseValue").style.display = "initial";
        document.getElementById("id_hueValueOptions").style.display = "initial";
        hueInit("id_anaylseCourseHueBackground");
        document.getElementById("id_setValueRange").value = 100;

        hueInit("id_anaylseCourseHueBackground");
        drawcolormap_hueSpace(globalColormap1, "id_anaylseCourseHueBackground",true, true); //drawcolormap_hueSpace(globalColormap1, "id_workcanvasAnalyseHue");
      break;
      case "lab": case "din99":
        stopAnimation();
        document.getElementById("id_containerHueCourse").style.display = "initial";
        document.getElementById("id_anaylseValue").style.display = "initial";
        document.getElementById("id_hueValueOptions").style.display = "initial";
        hueInit("id_anaylseCourseHueBackground");
        document.getElementById("id_setValueRange").value = 65;
        hueInit("id_anaylseCourseHueBackground");
        drawcolormap_hueSpace(globalColormap1, "id_anaylseCourseHueBackground",true, true); //drawcolormap_hueSpace(globalColormap1, "id_workcanvasAnalyseHue");

      break;
      default:
      console.log("Error at the changeColorspace function");
      return;
  }//*/


}

function changeValueRange(){

      if(parseFloat(document.getElementById('id_setValueRange'))<0){
        document.getElementById('id_setValueRange').value = 0;
      }

      if(parseFloat(document.getElementById('id_setValueRange'))>100){
        document.getElementById('id_setValueRange').value = 100;
      }

      hueInit("id_anaylseCourseHueBackground");
      drawcolormap_hueSpace(globalColormap1, "id_anaylseCourseHueBackground",true, true);
}

function analyseColormapRGBPossible(){
  if(document.getElementById("id_checkboxRGB").checked==true){
    orderColorSketch('rgb');
    bandSketch.colormap2Sketch(globalColormap1);
    drawcolormap_hueSpace(globalColormap1, "id_anaylseCourseHueBackground",true, true);
  }
}

function drawAnalyseMapPreviews(){

  var oldColorspace = colorspaceModus;

  colorspaceModus="rgb";
      drawCanvasColormap("id_anaylseRGB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalColormap1);
  colorspaceModus="hsv";
      drawCanvasColormap("id_anaylseHSV_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalColormap1);
  colorspaceModus="lab";
      drawCanvasColormap("id_anaylseLAB_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalColormap1);
  colorspaceModus="din99";
      drawCanvasColormap("id_anaylseDIN99_Preview",analysePreviewMap_resolution_X, analysePreviewMap_resolution_Y, globalColormap1);
  colorspaceModus = oldColorspace;
}



function calcOrderPlot(intervalColormap, plotid, type, minId, minGlobalId){

      var canvasPlot = document.getElementById(plotid);

      canvasPlot.width = 1000;
      canvasPlot.height = 1000;


      var canvasCtx = canvasPlot.getContext("2d");
      canvasCtx.webkitImageSmoothingEnabled = false;
      canvasCtx.mozImageSmoothingEnabled = false;
      canvasCtx.imageSmoothingEnabled = false;

      /*var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height); //getImageData(0, 0, canvasPlot.width, canvasPlot.height);
            var colorRef = new classColor_RGB(0.5,0.5,0.5);
            var tmpColor = new classColor_RGB(1,1,1);
            var counter =0;

            for(var y=0; y<canvasPlot.width; y++){

              for(var x=0; x<canvasPlot.height; x++){

                  var index = (x + y * canvasPlot.width) * 4;
                  canvasData.data[index + 0] = Math.round(colorRef.getRValue() * 255); // r
                  canvasData.data[index + 1] = Math.round(colorRef.getGValue() * 255); // g
                  canvasData.data[index + 2] = Math.round(colorRef.getBValue() * 255); // b
                  canvasData.data[index + 3] = 255; //a

              }

              counter++;
              if(counter==5){
                var change = colorRef;
                colorRef = tmpColor;
                tmpColor = change;
                counter=0;
              }

            }
            canvasCtx.putImageData(canvasData, 0, 0);//*/

      ///////////////////////////////////////////////////////////////
      ///// init order plot
      //////////////////////////////////////////////////////////////

      var colormapbarwidth = canvasPlot.width*0.9;
      var colormapXStart = (canvasPlot.width-colormapbarwidth)/2;
      var plotHeight = canvasPlot.height*0.9;
      var plotyStart = (canvasPlot.height-plotHeight)/2;

      var arrowHeight = canvasPlot.height*0.025;
      var arrowWidth = canvasPlot.width*0.0125;
      var labelFontSize = canvasPlot.height*0.02;
      var labelYStart = (((canvasPlot.height-plotHeight)/2)-(arrowHeight/2)-labelFontSize)/2+labelFontSize;

      var arrowPlotHeight = (plotHeight*0.95)/2;
      var colormapHeight = plotHeight*0.05;
      var colormapYStart = plotyStart+(plotHeight/2)-(colormapHeight/2);
      var colormapYEnd = colormapYStart+colormapHeight;

          // colormap interval rect

          //////////////////////////////////////////////////////////////////////
          //// Arrow 1
          canvasCtx.strokeStyle = "rgb(0,0,0)";
          canvasCtx.beginPath();
          canvasCtx.lineWidth=2;
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
          canvasCtx.fillStyle = "rgb(0,0,0)";
          canvasCtx.fill();

          canvasCtx.font = labelFontSize+"px Arial";
          canvasCtx.fillText("|local Order|",colormapXStart+arrowWidth,labelYStart);
          var width = canvasCtx.measureText("|local Order|").width;
          var height = canvasCtx.measureText("|local Order|").height;
          canvasCtx.fillStyle = "rgb(1,1,1)";
          canvasCtx.fillRect(colormapXStart+arrowWidth,labelYStart, width, height);
          //////////////////////////////////////////////////////////////////////
          //// Arrow 2
          canvasCtx.strokeStyle = "rgb(0,0,0)";
          canvasCtx.beginPath();
          canvasCtx.lineWidth=2;
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
          canvasCtx.fillStyle = "rgb(0,0,0)";
          canvasCtx.fill();

          canvasCtx.font = labelFontSize+"px Arial";
          canvasCtx.fillText("negative global Order",colormapXStart+arrowWidth,canvasPlot.height-labelYStart);
          var width = canvasCtx.measureText("negative global Order").width;
          var height = canvasCtx.measureText("negative global Order").height;
          canvasCtx.fillStyle = "rgb(1,1,1)";
          canvasCtx.fillRect(colormapXStart+arrowWidth,canvasPlot.height-labelYStart, width, height);


          //////////////////////////////////////////////////////////// draw refLineSketchContainer



          //////////////////////////////////////////////////////////////////////
          //// Draw intervals
          var currentXPos = colormapXStart;
          var bandWidth = colormapbarwidth/(intervalColormap.getIntervalLength());
          for(var y=0; y<intervalColormap.getIntervalLength(); y++){

                  var colorRef = intervalColormap.getIntervalColor(y,"rgb");


                  /*
                  var colorRef2 = intervalColormap.getIntervalColor(y+1,"rgb");

                  var gradient=canvasCtx.createLinearGradient(0,bandWidth,0,0);
                  gradient.addColorStop(0,colorRef2.getRGBString());
                  gradient.addColorStop(1,colorRef.getRGBString());
                  canvasCtx.fillStyle=gradient;*/
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
                       deltaE_K0_K2= intervalColormap.calcDeltaE_Interval_Lab(x-1,x+1);
                       deltaE_K1_K2= intervalColormap.calcDeltaE_Interval_Lab(x,x+1);
                       deltaE_K0_K1= intervalColormap.calcDeltaE_Interval_Lab(x-1,x);
                        break;

                        case 1:
                         deltaE_K0_K2= intervalColormap.calcDeltaE_Interval_De94(x-1,x+1);
                         deltaE_K1_K2= intervalColormap.calcDeltaE_Interval_De94(x,x+1);
                         deltaE_K0_K1= intervalColormap.calcDeltaE_Interval_De94(x-1,x);
                          break;

                          case 2:
                           deltaE_K0_K2= intervalColormap.calcDeltaE_Interval_De2000(x-1,x+1);
                           deltaE_K1_K2= intervalColormap.calcDeltaE_Interval_De2000(x,x+1);
                           deltaE_K0_K1= intervalColormap.calcDeltaE_Interval_De2000(x-1,x);
                            break;

                          case 3:
                             deltaE_K0_K2= intervalColormap.calcDeltaE_Interval_DIN99(x-1,x+1);
                             deltaE_K1_K2= intervalColormap.calcDeltaE_Interval_DIN99(x,x+1);
                             deltaE_K0_K1= intervalColormap.calcDeltaE_Interval_DIN99(x-1,x);
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
                             deltaE_K0_K2= intervalColormap.calcDeltaE_Interval_Lab(k0,k2);
                             deltaE_K1_K2= intervalColormap.calcDeltaE_Interval_Lab(k1,k2);
                             deltaE_K0_K1= intervalColormap.calcDeltaE_Interval_Lab(k0,k1);
                              break;

                              case 1:
                               deltaE_K0_K2= intervalColormap.calcDeltaE_Interval_De94(k0,k2);
                               deltaE_K1_K2= intervalColormap.calcDeltaE_Interval_De94(k1,k2);
                               deltaE_K0_K1= intervalColormap.calcDeltaE_Interval_De94(k0,k1);
                                break;

                                case 2:
                                 deltaE_K0_K2= intervalColormap.calcDeltaE_Interval_De2000(k0,k2);
                                 deltaE_K1_K2= intervalColormap.calcDeltaE_Interval_De2000(k1,k2);
                                 deltaE_K0_K1= intervalColormap.calcDeltaE_Interval_De2000(k0,k1);
                                  break;

                                case 3:
                                   deltaE_K0_K2= intervalColormap.calcDeltaE_Interval_DIN99(k0,k2);
                                   deltaE_K1_K2= intervalColormap.calcDeltaE_Interval_DIN99(k1,k2);
                                   deltaE_K0_K1= intervalColormap.calcDeltaE_Interval_DIN99(k0,k1);
                                  break;
                            default:

                        }

                        var tmpVal1 = deltaE_K0_K2-deltaE_K0_K1;
                        var tmpVal2 = deltaE_K0_K2-deltaE_K1_K2;


                        var orderVal = Math.min(tmpVal1,tmpVal2);

                        if(orderVal<arrayk2[0]){
                          minGlobal = Math.min(minGlobal,orderVal);

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


          if(minGlobal>=0)
          return;

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
      canvasCtx.webkitImageSmoothingEnabled = false;
      canvasCtx.mozImageSmoothingEnabled = false;
      canvasCtx.imageSmoothingEnabled = false;
      var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height); //getImageData(0, 0, canvasPlot.width, canvasPlot.height);
      var sumForAverage = 0;
      var min = 1000000;
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

                deltaE = intervalColormap.calcDeltaE_Interval_Lab(x,y);
                  break;

                  case 1:
                    deltaE = intervalColormap.calcDeltaE_Interval_De94(x,y);
                    break;

                    case 2:
                      deltaE = intervalColormap.calcDeltaE_Interval_De2000(x,y);
                      break;

                      case 3:
                      deltaE = intervalColormap.calcDeltaE_Interval_DIN99(x,y);
                        break;
                default:

              }

              switch (plotType) {
                case 0:
                  var distance = Math.sqrt(Math.pow(intervalColormap.getIntervalRef(x)-intervalColormap.getIntervalRef(y),2))
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
                  break;
                case 1:
                    min = Math.min(min,deltaE);
                    max = Math.max(max,deltaE);
                    sumForAverage += deltaE;
                    break;
                default:
                  return;

              }


            }


            switch (plotType) {
              case 0:
                column.push(speed);
                break;
              case 1:
                column.push(deltaE);
                  break;
              default:
                return;

            }

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


              switch (plotType) {
                case 0:
                  var speed= matrix[x][y];
                  var val = speed/max;
                  if(speed==-1){
                    val=1;
                  }
                  else{
                    sumForVariance += Math.pow(matrix[x][y]-average,2);
                  }

                  colorRef = new classColor_RGB(val,val,val);
                  break;
                case 1:
                    var deltaE= matrix[x][y];
                    var val = deltaE/max;
                    sumForVariance += Math.pow(matrix[x][y]-average,2);
                    colorRef = new classColor_RGB(val,val,val);
                    break;
                default:
                  return;

              }



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


      document.getElementById(minId).innerHTML = "Global Minimum = "+ min.toFixed(numDecimalPlaces);

      if(min==0)
      document.getElementById(minId).style.color = "red";
      else
      document.getElementById(minId).style.color = "black";

      document.getElementById(maxId).innerHTML = "Global Maximum = "+ max.toFixed(numDecimalPlaces);
      document.getElementById(avId).innerHTML = "Global Average = "+ average.toFixed(numDecimalPlaces);
      document.getElementById(devId).innerHTML = "Global Deviation = "+ deviation.toFixed(numDecimalPlaces);


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
      var colorRef = new classColor_RGB(0.5,0.5,0.5);
      var tmpColor = new classColor_RGB(1,1,1);
      var counter =0;

      for(var y=0; y<canvasPlot.width; y++){

        for(var x=0; x<canvasPlot.height; x++){

            var index = (x + y * canvasPlot.width) * 4;
            canvasData.data[index + 0] = Math.round(colorRef.getRValue() * 255); // r
            canvasData.data[index + 1] = Math.round(colorRef.getGValue() * 255); // g
            canvasData.data[index + 2] = Math.round(colorRef.getBValue() * 255); // b
            canvasData.data[index + 3] = 255; //a

        }

        counter++;
        if(counter==5){
          var change = colorRef;
          colorRef = tmpColor;
          tmpColor = change;
          counter=0;
        }

      }
      canvasCtx.putImageData(canvasData, 0, 0);//
      var numTwinOrLeft=0;
      for(var x=0; x<intervalColormap.getIntervalLength()-1; x++){

            var deltaE=0;
            var speed=0;
            if(x!=y){

              switch (type) {
                case 0:

                deltaE = intervalColormap.calcDeltaE_Interval_Lab(x,x+1);
                  break;

                  case 1:
                    deltaE = intervalColormap.calcDeltaE_Interval_De94(x,x+1);
                    break;

                    case 2:
                      deltaE = intervalColormap.calcDeltaE_Interval_De2000(x,x+1);
                      break;

                      case 3:
                      deltaE = intervalColormap.calcDeltaE_Interval_DIN99(x,x+1);
                        break;
                default:

              }


              switch (plotType) {
                case 0:
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
                  break;
                case 1:
                    min = Math.min(min,deltaE);
                    max = Math.max(max,deltaE);
                    sumForAverage += deltaE;
                    break;
                default:
                  return;

              }



            }


            switch (plotType) {
              case 0:
                  vector.push(speed);
                break;
              case 1:
                  vector.push(deltaE);
                  break;
              default:
                return;

            }

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


      document.getElementById(minId).innerHTML = "Local Minimum = "+ min.toFixed(numDecimalPlaces);

      if(min==0)
      document.getElementById(minId).style.color = "red";
      else
      document.getElementById(minId).style.color = "black";

      document.getElementById(maxId).innerHTML = "Local Maximum = "+ max.toFixed(numDecimalPlaces);
      document.getElementById(avId).innerHTML = "Local Average = "+ average.toFixed(numDecimalPlaces);
      document.getElementById(devId).innerHTML = "Local Deviation = "+ deviation.toFixed(numDecimalPlaces);


}



function drawAnalyseDifferenceMaps(){

  var old_tbody = document.getElementById("id_analyseTableBody");
  var new_tbody = document.createElement('tbody');


  //var canvasREF = document.getElementById("id_anaylseRatioRef");
  var canvasRGB = document.getElementById("id_anaylseRatioRGB");
  var canvasHSV = document.getElementById("id_anaylseRatioHSV");
  var canvasLAB = document.getElementById("id_anaylseRatioLAB");
  var canvasCIEDE2000 = document.getElementById("id_anaylseRatioDe2000");
  var canvasDE94 = document.getElementById("id_anaylseRatioDE94");
  var canvasDIN99 = document.getElementById("id_anaylseRatioDIN99");

  //canvasREF.width = resolutionX_differenceMetrics;
  //canvasREF.height = 1;
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

  //var refCtx = canvasREF.getContext("2d");
  //var refData = refCtx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
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

  // for Preview
  //var canvasPreviewREF = document.getElementById("id_anaylsePreviewRef");
  //var canvasPreviewC1 = document.getElementById("id_anaylsePreviewC");

  /*canvasPreviewREF.width = resolutionX_differenceMetrics;
  canvasPreviewREF.height = 1;
  canvasPreviewC1.width = resolutionX_differenceMetrics;
  canvasPreviewC1.height = 1;
  var ref1iPreviewCtx = canvasPreviewREF.getContext("2d");
  var ref1PreviewData = ref1PreviewCtx.getImageData(0, 0, resolutionX_differenceMetrics, 1);
  var c1PreviewCtx = canvasPreviewC1.getContext("2d");
  var c1PreviewData = c1PreviewCtx.getImageData(0, 0, resolutionX_differenceMetrics, 1);*/

  bandSketch.calcNewDistances();

  var currentPos = [0,0,0,0,0,0,0];
  var currentWidth = [0,0,0,0,0,0,0];
  var colorRef = new classColor_RGB(0.5,0.5,0.5);

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

      /*if(document.getElementById("analyse_SelectMetric").value==0){
        c1PreviewData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
        c1PreviewData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
        c1PreviewData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
        c1PreviewData.data[index + 3] = 255; //a
      }*/
    }
    currentPos[4]=currentPos[4]+currentWidth[4];

    if(i != bandSketch.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[4]+x) * 4;
        de94Data.data[index + 0] = Math.round(0); // r
        de94Data.data[index + 1] = Math.round(0); // g
        de94Data.data[index + 2] = Math.round(0); // b
        de94Data.data[index + 3] = 255; //a

        /*if(document.getElementById("analyse_SelectMetric").value==0){
          c1PreviewData.data[index + 0] = Math.round(0); // r
          c1PreviewData.data[index + 1] = Math.round(0); // g
          c1PreviewData.data[index + 2] = Math.round(0); // b
          c1PreviewData.data[index + 3] = 255; //a
        }*/
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

      /*if(document.getElementById("analyse_SelectMetric").value==1){
        c1PreviewData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
        c1PreviewData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
        c1PreviewData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
        c1PreviewData.data[index + 3] = 255; //a
      }*/
    }
    currentPos[5]=currentPos[5]+currentWidth[5];

    if(i != bandSketch.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[5]+x) * 4;
        de2000Data.data[index + 0] = Math.round(0); // r
        de2000Data.data[index + 1] = Math.round(0); // g
        de2000Data.data[index + 2] = Math.round(0); // b
        de2000Data.data[index + 3] = 255; //a

        /*if(document.getElementById("analyse_SelectMetric").value==1){
          c1PreviewData.data[index + 0] = Math.round(0); // r
          c1PreviewData.data[index + 1] = Math.round(0); // g
          c1PreviewData.data[index + 2] = Math.round(0); // b
          c1PreviewData.data[index + 3] = 255; //a
        }*/
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

      /*if(document.getElementById("analyse_SelectMetric").value==2){
        c1PreviewData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
        c1PreviewData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
        c1PreviewData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
        c1PreviewData.data[index + 3] = 255; //a
      }*/
    }
    currentPos[6]=currentPos[6]+currentWidth[6];

    if(i != bandSketch.getBandLength()-1){
      for(var x=0; x<borderWidth; x++){
        var index = (currentPos[6]+x) * 4;
        din99Data.data[index + 0] = Math.round(0); // r
        din99Data.data[index + 1] = Math.round(0); // g
        din99Data.data[index + 2] = Math.round(0); // b
        din99Data.data[index + 3] = 255; //a

        /*if(document.getElementById("analyse_SelectMetric").value==2){
          c1PreviewData.data[index + 0] = Math.round(0); // r
          c1PreviewData.data[index + 1] = Math.round(0); // g
          c1PreviewData.data[index + 2] = Math.round(0); // b
          c1PreviewData.data[index + 3] = 255; //a
        }*/
      }

    currentPos[6]=currentPos[6]+borderWidth;
    }


    new_tbody.appendChild(tr);

  }

  //refCtx.putImageData(refData, 0, 0); // update ColorspaceCanvas;
  rgbCtx.putImageData(rgbData, 0, 0); // update ColorspaceCanvas;
  hsvCtx.putImageData(hsvData, 0, 0); // update ColorspaceCanvas;
  labCtx.putImageData(labData, 0, 0); // update ColorspaceCanvas;
  de94Ctx.putImageData(de94Data, 0, 0); // update ColorspaceCanvas;
  de2000Ctx.putImageData(de2000Data, 0, 0); // update ColorspaceCanvas;
  din99Ctx.putImageData(din99Data, 0, 0); // update ColorspaceCanvas;

  //.putImageData(ref1PreviewData, 0, 0); // update ColorspaceCanvas;
  //c1PreviewCtx.putImageData(c1PreviewData, 0, 0); // update ColorspaceCanvas;

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
  new_tbody.id="id_analyseTableBody";


}
