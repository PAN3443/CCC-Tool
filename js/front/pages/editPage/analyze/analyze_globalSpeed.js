function styleStructure_GlobalSpeed(){

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
    document.getElementById("id_EditPage_DoLogDiv_GlobalLocalOrder").style.display = "block";
    document.getElementById("id_EditPage_FixedAxisLabel_GlobalLocalOrder").innerHTML="Fixed Global Speed Difference:";
    styleGlobalLocalOrderPlot();
    updateKeySelection();


    var oldInterval = intervalDelta;
    var oldIntervalSize = intervalSize;
    if(document.getElementById("id_editPage_Anaylze_IntervalNumber").checked){
      document.getElementById("id_editPage_Anaylze_IntervalCalcInputLabel").innerHTML = "Number of Intervals:";
      document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value = numberOfIntervalsGlobal;
      intervalSize = numberOfIntervalsGlobal;
      globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex,document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex,0);
    }
    else{
      document.getElementById("id_editPage_Anaylze_IntervalCalcInputLabel").innerHTML = "Value of Color-Difference:";
      document.getElementById("id_editPage_Anaylze_IntervalCalcInput").value = colorDifferenceGlobal;
      intervalDelta=colorDifferenceGlobal;
      globalCMS1 = calcCMSIntervals(globalCMS1,document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex,document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex,2);
    }
    intervalDelta=oldInterval;
    intervalSize=oldIntervalSize;

    if(document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex!=document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex)
    drawGlobalSpeedPlot(globalCMS1, "id_EditPage_Canvas_GlobalLocalOrder", document.getElementById("id_AnalyzeSubContainer_Select").selectedIndex, "id_EditPage_Min_GlobalLocalOrder", "id_EditPage_Max_GlobalLocalOrder", "id_EditPage_Average_GlobalLocalOrder", "id_EditPage_Deviation_GlobalLocalOrder");
    else{
      var context = document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").getContext('2d');
      context.clearRect(0, 0, document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").width, document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").height);
    }
  }

}


function drawGlobalSpeedPlot(intervalColormap, plotid, type, minId, maxId, avId, devId){

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

                    speed=-1;
                    numTwinOrLeft++;
                  }
                  else{
                    var distance = Math.sqrt(Math.pow(intervalColormap.getIntervalRef(x)-intervalColormap.getIntervalRef(y),2))
                    speed = deltaE/distance;
                    realMin = Math.min(realMin,speed);
                    realMax = Math.max(realMax,speed);
                    sumForAverage += speed;
                    if(document.getElementById("id_EditPage_DoLogSelect_GlobalLocalOrder").checked)
                    speed = Math.log(speed+1);
                    min = Math.min(min,speed);
                    max = Math.max(max,speed);
                    //sumForAverage += speed;
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

      var fixedMax =(max-min);

      if(document.getElementById("id_EditPage_DoFixedAxis_GlobalLocalOrder").checked){
        fixedMax = parseFloat(document.getElementById("id_EditPage_InputFixedAxis_GlobalLocalOrder").value);


        if(isNaN(fixedMax) || fixedMax<=0){
          fixedMax=(max-min);
          document.getElementById("id_EditPage_InputFixedAxis_GlobalLocalOrder").value=fixedMax;
        }

      }

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
                  var val;
                  if(speed==-1){
                    val=1;
                  }
                  else{

                    if(document.getElementById("id_EditPage_DoFixedAxis_GlobalLocalOrder").checked){
                      val = (speed-min)/fixedMax;

                      if(val<0.0)
                        val=0.0;

                      if(val>1.0)
                        val=1.0;
                    }
                    else{
                      val = (speed-min)/(max-min);

                    }


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
