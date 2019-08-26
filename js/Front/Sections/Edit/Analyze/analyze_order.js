function styleStructure_Order(){

  if(globalCMS1.getKeyLength()==0){
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "flex";
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "none";
  }
  else{
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "flex";
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "none";
    document.getElementById("id_EditPage_FixedAxisDiv_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_Average_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_Deviation_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_DoLogDiv_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_ColorAboveDiv_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_editPage_OrderAxisLabel1").style.visibility = "visible";
    document.getElementById("id_editPage_OrderAxisLabel2").style.visibility = "visible";


    styleGlobalLocalOrderPlot();

    updateKeySelection();

    var plotid ="id_EditPage_Canvas_GlobalLocalOrder";


    if(document.getElementById("id_PopUp_fullAnalzeWindow").style.display!="none")
      plotid="id_PopUp_FullAnalayzeCanvas";

    var oldInterval = intervalDelta;
    var oldIntervalSize = intervalSize;
    if(document.getElementById("id_editPage_Anaylze_IntervalNumber").checked){
      document.getElementById("id_editPage_Anaylze_IntervalCalcInputLabel").innerHTML = "Number of Intervals:";
      document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value = numberOfIntervalsOrder;
      intervalSize = numberOfIntervalsOrder;
      globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex,document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex,0);
    }
    else{
      document.getElementById("id_editPage_Anaylze_IntervalCalcInputLabel").innerHTML = "Value of Color-Difference:";
      document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value = colorDifferenceOrder;
      intervalDelta=colorDifferenceOrder;
      globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex,document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex,2);
    }
    intervalDelta=oldInterval;
    intervalSize=oldIntervalSize;


    if(document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex!=document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex)
    drawOrderPlot(globalCMS1, plotid, document.getElementById("id_AnalyzeSubContainer_Select").selectedIndex, "id_EditPage_Min_GlobalLocalOrder", "id_EditPage_Max_GlobalLocalOrder");
    else{
      var context = document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").getContext('2d');
      context.clearRect(0, 0, document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").width, document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").height);
    }
  }


}



function drawOrderPlot(intervalColormap,plotid, type, minId, minGlobalId){

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
          canvasCtx.strokeStyle = "rgb(0,0,0)";//"rgb(255,127,80)";
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
          canvasCtx.fillStyle = "rgb(0,0,0)";//"rgb(255,127,80)";
          canvasCtx.fill();

          /*canvasCtx.font = labelFontSize+"px Arial";
          canvasCtx.fillText("|local Order|",colormapXStart+arrowWidth,labelYStart);
          var width = canvasCtx.measureText("|local Order|").width;
          var height = canvasCtx.measureText("|local Order|").height;
          canvasCtx.fillStyle = "rgb(1,1,1)";
          canvasCtx.fillRect(colormapXStart+arrowWidth,labelYStart, width, height);*/
          //////////////////////////////////////////////////////////////////////
          //// Arrow 2
          canvasCtx.strokeStyle = "rgb(0,0,0)";//"rgb(30,144,255)";
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
          canvasCtx.fillStyle = "rgb(0,0,0)";//"rgb(30,144,255)";
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

          var minLocal = Infinity;
          var maxLocal = -Infinity;
          var minGlobal = Infinity;
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
        document.getElementById(minId).style.color = getComputedStyle(document.documentElement).getPropertyValue('--general-warning-color');
        else
        document.getElementById(minId).style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

        if(minGlobal<0)
        document.getElementById(minGlobalId).style.color = getComputedStyle(document.documentElement).getPropertyValue('--general-warning-color');
        else
        document.getElementById(minGlobalId).style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

        document.getElementById(minId).innerHTML = "Local Minimum = "+ minLocal;//.toFixed(numDecimalPlaces);
        document.getElementById(minGlobalId).innerHTML = "Global Minimum = "+ minGlobal;//.toFixed(numDecimalPlaces);

}
