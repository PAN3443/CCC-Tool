function styleStructure_LocalSpeed(){

  if(globalCMS1.getKeyLength()==0){
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "flex";
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "none";
  }
  else{
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "flex";
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "none";
    document.getElementById("id_editPage_OrderAxisLabel1").style.visibility = "hidden";
    document.getElementById("id_editPage_OrderAxisLabel2").style.visibility = "hidden";
    document.getElementById("id_EditPage_ColorAboveDiv_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_Average_GlobalLocalOrder").style.display = "block";
    document.getElementById("id_EditPage_Deviation_GlobalLocalOrder").style.display = "block";
    //document.getElementById("id_EditPage_FixedAxisDiv_GlobalLocalOrder").style.display = "block";
    document.getElementById("id_EditPage_DoLogDiv_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_FixedAxisLabel_GlobalLocalOrder").innerHTML="Fixed Local Speed Axis:";

    styleGlobalLocalOrderPlot();

    updateKeySelection();

    var plotid ="id_EditPage_Canvas_GlobalLocalOrder";


    if(document.getElementById("id_PopUp_fullAnalzeWindow").style.display!="none")
      plotid="id_PopUp_FullAnalayzeCanvas";


    if(document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex!=document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex)
      drawLocalSpeedPlot(globalCMS1, plotid, "id_EditPage_Min_GlobalLocalOrder", "id_EditPage_Max_GlobalLocalOrder", "id_EditPage_Average_GlobalLocalOrder", "id_EditPage_Deviation_GlobalLocalOrder");
    else{
      var context = document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").getContext('2d');
      context.clearRect(0, 0, document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").width, document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").height);
    }



  }


}



function drawLocalSpeedPlot(intervalColormap, plotid, minId, maxId, avId, devId){

      var canvasPlot = document.getElementById(plotid);

      var canvasCtx = canvasPlot.getContext("2d");
      canvasCtx.webkitImageSmoothingEnabled = false;
      canvasCtx.mozImageSmoothingEnabled = false;
      canvasCtx.imageSmoothingEnabled = false;
      canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);

      var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height); //getImageData(0, 0, canvasPlot.width, canvasPlot.height);
      var sumForAverage = 0;
      var min = Infinity;
      var max = -Infinity;

      var colors = [];
      var speeds = [];
      var space = globalCMS1.getInterpolationSpace();
      var sumBands = 0;

        for (var i = 0; i < globalCMS1.getKeyLength()-1; i++) {

          if(globalCMS1.getKeyType(i)==="nil key" || globalCMS1.getKeyType(i)==="left key"){
            colors.push(undefined);
            speeds.push(undefined);
          }
          else {

            colors.push([]);
            speeds.push([]);

            if(space==="de94" || space==="de2000"){
                return;
            }
            else {
                  var c1 = globalCMS1.getRightKeyColor(i,space);
                  var c2 = globalCMS1.getLeftKeyColor(i+1,space);
                  var r1 = globalCMS1.getRefPosition(i);
                  var r2 = globalCMS1.getRefPosition(i+1);
                  var tmpResults = calcDeltaIntervalBetween_C1C2(c1,c2, deltaSampling_Analyze, space);

                if(tmpResults==undefined){
                  tmpResults=[];
                  tmpResults.push([]);
                  var tmpBandDelta = undefined;

                  switch (space) {
                    case "rgb":
                    case "hsv":
                    case "lab":
                    case "din99":
                      tmpBandDelta = calc3DEuclideanDistance(c1,c2);
                    break;
                    case "de94":
                    case "de94-ds":
                      tmpBandDelta = calcDeltaDE94(c1,c2);
                    break;
                    case "de2000":
                    case "de2000-ds":
                      tmpBandDelta = calcDeltaCIEDE2000(c1,c2);
                    break;
                    default:
                      return;
                  }

                  tmpResults.push([tmpBandDelta]);
                  tmpResults.push([1.0]);
                }

                colors[i]=tmpResults[0];

                sumBands += tmpResults[1].length;
                var tmpDis = Math.abs(r2-r1);
                var intervalDis = tmpDis/tmpResults[1].length; // for equal distances between the interval colors
                for (var j = 0; j < tmpResults[1].length; j++) {
                  var speed = undefined;
                  if(space==="de94-ds" || space==="de2000-ds"){
                    speed = tmpResults[1][j]/(tmpDis*tmpResults[2][j]);
                  }
                  else {
                    speed = tmpResults[1][j]/intervalDis;
                  }
                  min = Math.min(min,speed);
                  max = Math.max(max,speed);
                  sumForAverage += speed;
                  speeds[i].push(speed);
                }
          }// ELSE (!= graph interpolation)
        } // ELSE (!=CONST BAND)
      } // FOR

      var average = sumForAverage/sumBands;

      ///////////////////////////////////////////////////////////////////////////////////////////////////

      canvasPlot.width = sumBands;
      canvasPlot.height = 500;
      canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);

      var bandWidth = 1;//Math.floor(canvasPlot.width/sumBands);
      var sumForVariance = 0;

      //////////////////////////////////////////////////////////////////////////////////
      // calc variance and draw
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

      //var ratioArray = [] ;
      for (var i = 0; i < globalCMS1.getKeyLength()-1; i++) {

        if(speeds[i]==undefined) // = const band
          continue;

        var ratioBlockSum = 0 ;
        for (var j = 0; j < speeds[i].length; j++) {

          var c1 = undefined;
          var c2 = undefined;

          switch (j) {
            case 0:
              c1 = globalCMS1.getRightKeyColor(i,space);

              if(colors[i].length==0)
                c2 = globalCMS1.getLeftKeyColor(i+1,space);
              else
                c2 = colors[i][j];
              break;
              case speeds[i].length-1:
                c1 = colors[i][j-1];
                c2 = globalCMS1.getLeftKeyColor(i+1,space);
              break;
            default:
              c1 = colors[i][j-1];
              c2 = colors[i][j];
          }


          if(c1==undefined){
            console.log("c1",j,speeds[i].length-1);
            continue;
          }

          if(c2==undefined){
            console.log("c2",j,speeds[i].length-1);
            continue;
          }

          //ratioBlockSum+=speeds[i][j]/sumForAverage;

          //////////////////////////////////////

          var barHeight;

          if(document.getElementById("id_EditPage_DoFixedAxis_GlobalLocalOrder").checked){
            var ratio = (speeds[i][j]/fixedMax);
            if(ratio>1.0)
              ratio=1.0;
            barHeight=canvasPlot.height*ratio;
          }
          else{
            barHeight=canvasPlot.height*(speeds[i][j]/max);
          }

          var yPos= canvasPlot.height-barHeight;

          var gradient=canvasCtx.createLinearGradient(0,0,0,canvasPlot.height);
          gradient.addColorStop(0,c1.getRGBString());
          gradient.addColorStop(1,c2.getRGBString());
          canvasCtx.fillStyle=gradient;
          canvasCtx.fillRect(currentXPos,yPos,bandWidth,barHeight);

          if(c1!=undefined){
            c1.deleteReferences();
            c1=null;
          }

          if(c2!=undefined){
            c2.deleteReferences();
            c2=null;
          }

          sumForVariance += Math.pow(speeds[i][j]-average,2);

          currentXPos+=bandWidth;

        }

        //ratioArray.push(ratioBlockSum);

      }

      //console.log(ratioArray);

      var variance = sumForVariance/sumBands;
      var deviation = Math.sqrt(variance);

      document.getElementById(minId).innerHTML = "Local Speed Minimum = "+ min;//.toFixed(numDecimalPlaces);

      if(min==0)
      document.getElementById(minId).style.color = getComputedStyle(document.documentElement).getPropertyValue('--general-warning-color');
      else
      document.getElementById(minId).style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

      document.getElementById(maxId).innerHTML = "Local Speed Maximum = "+ max;//.toFixed(numDecimalPlaces);
      document.getElementById(avId).innerHTML = "Local Speed Average = "+ average;//.toFixed(numDecimalPlaces);
      document.getElementById(devId).innerHTML = "Local Speed Deviation = "+ deviation;//.toFixed(numDecimalPlaces);*/


}
