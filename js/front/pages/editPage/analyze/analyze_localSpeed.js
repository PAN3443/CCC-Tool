function styleStructure_LocalSpeed(){

  if(globalCMS1.getKeyLength()==0){
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "flex";
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "none";
  }
  else{
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "flex";
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "none";
    document.getElementById("id_EditPage_Average_GlobalLocalOrder").style.display = "block";
    document.getElementById("id_EditPage_Deviation_GlobalLocalOrder").style.display = "block";
    document.getElementById("id_EditPage_FixedAxisDiv_GlobalLocalOrder").style.display = "block";
    document.getElementById("id_EditPage_DoLogDiv_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_FixedAxisLabel_GlobalLocalOrder").innerHTML="Fixed Local Speed Axis:";

    styleGlobalLocalOrderPlot();

    updateKeySelection();

    var oldInterval = intervalDelta;
    var oldIntervalSize = intervalSize;
    if(document.getElementById("id_editPage_Anaylze_IntervalNumber").checked){
      document.getElementById("id_editPage_Anaylze_IntervalCalcInputLabel").innerHTML = "Number of Intervals:";
      document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value = numberOfIntervalsLocal;
      intervalSize = numberOfIntervalsLocal;
      globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex,document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex,0);
    }
    else{
      document.getElementById("id_editPage_Anaylze_IntervalCalcInputLabel").innerHTML = "Value of Color-Difference:";
      document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value = colorDifferenceLocal;
      intervalDelta=colorDifferenceLocal;
      globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex,document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex,2);
    }
    intervalDelta=oldInterval;
    intervalSize=oldIntervalSize;

    if(document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex!=document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex)
    drawLocalSpeedPlot(globalCMS1, "id_EditPage_Canvas_GlobalLocalOrder", document.getElementById("id_AnalyzeSubContainer_Select").selectedIndex, "id_EditPage_Min_GlobalLocalOrder", "id_EditPage_Max_GlobalLocalOrder", "id_EditPage_Average_GlobalLocalOrder", "id_EditPage_Deviation_GlobalLocalOrder");
    else{
      var context = document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").getContext('2d');
      context.clearRect(0, 0, document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").width, document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").height);
    }



  }


}



function drawLocalSpeedPlot(intervalColormap, plotid, type, minId, maxId, avId, devId){

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
      var min = 100000000000;
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

      var fixedMax = 200;
      if(document.getElementById("id_EditPage_DoFixedAxis_GlobalLocalOrder").checked){
        fixedMax = parseFloat(document.getElementById("id_EditPage_InputFixedAxis_GlobalLocalOrder").value);

        if(isNaN(fixedMax) || fixedMax<=0){
          fixedMax=200;
          document.getElementById("id_EditPage_InputFixedAxis_GlobalLocalOrder").value=fixedMax;
        }
      }

      var currentXPos = 0;
      for(var y=0; y<vector.length; y++){


            if(vector[y]!=-1){
              var colorRef = intervalColormap.getIntervalColor(y,"rgb");
              var colorRef2 = intervalColormap.getIntervalColor(y+1,"rgb");

              var deltaHeight;

              if(document.getElementById("id_EditPage_DoFixedAxis_GlobalLocalOrder").checked){
                var ratio = (vector[y]/fixedMax);
                if(ratio>1.0)
                  ratio=1.0;

                deltaHeight=canvasPlot.height*ratio;
              }
              else{
                deltaHeight=canvasPlot.height*(vector[y]/max);
              }

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
