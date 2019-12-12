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
    document.getElementById("id_EditPage_Analyze_ContiuousSections").style.display = "none";
    document.getElementById("id_EditPage_MaxSetting_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_KeyOrSamplingSetting_GlobalLocalOrder").style.display = "none";

    document.getElementById("id_EditPage_FixedAxisLabel_GlobalLocalOrder").innerHTML="Fixed Local Speed Axis:";

    styleGlobalLocalOrderPlot();

    var plotid ="id_EditPage_Canvas_GlobalLocalOrder";


    if(document.getElementById("id_PopUp_fullAnalzeWindow").style.display!="none")
      plotid="id_PopUp_FullAnalayzeCanvas";


    //if(document.getElementById("id_EditPage_SelectFrom_GlobalLocalOrder").selectedIndex!=document.getElementById("id_EditPage_SelectTill_GlobalLocalOrder").selectedIndex)
      drawLocalSpeedPlot(plotid, "id_EditPage_Min_GlobalLocalOrder", "id_EditPage_Max_GlobalLocalOrder", "id_EditPage_Average_GlobalLocalOrder", "id_EditPage_Deviation_GlobalLocalOrder");
    /*else{
      var context = document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").getContext('2d');
      context.clearRect(0, 0, document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").width, document.getElementById("id_EditPage_Canvas_GlobalLocalOrder").height);
    }*/



  }


}



function drawLocalSpeedPlot(plotid, minId, maxId, avId, devId){

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

      var speeds = [];
      var space = globalCMS1.getInterpolationSpace();
      var sumBands = 0;

      /*var blackWhiteDelta = undefined;
      var blackWhiteMaxSpeed = -Infinity;

      switch (globalCMS1.getInterpolationSpace()) {
          case "lab":
            blackWhiteDelta = calc3DEuclideanDistance(new class_Color_LAB(100,0,0),new class_Color_LAB(0,0,0));
            break;
          case "din99":
            blackWhiteDelta = calc3DEuclideanDistance(new class_Color_DIN99(100,0,0),new class_Color_DIN99(0,0,0));
            break;
            case "de94":
            case "de94-ds":
             blackWhiteDelta = calcDeltaDE94(new class_Color_LAB(100,0,0),new class_Color_LAB(0,0,0));
              break;
              case "de2000":
              case "de2000-ds":
               blackWhiteDelta = calcDeltaCIEDE2000(new class_Color_LAB(100,0,0),new class_Color_LAB(0,0,0));
                break;
      }*/


        for (var i = 0; i < globalCMS1.getKeyLength()-1; i++) {

          if(globalCMS1.getKeyType(i)==="nil key" || globalCMS1.getKeyType(i)==="left key"){
            speeds.push(undefined);
          }
          else {

            speeds.push([]);

            if(((globalCMS1.getInterpolationType()==="linear" &&
               globalCMS1.getInterpolationSpace()!="rgb" &&  // distance of intervals is the same like the distance of start and end color
               globalCMS1.getInterpolationSpace()!="hsv" &&
               globalCMS1.getInterpolationSpace()!="lab" &&
               globalCMS1.getInterpolationSpace()!="din99") || globalCMS1.getInterpolationType()==="spline") &&
               globalCMS1.getIntervalLength(i)>0){

              switch (globalCMS1.getInterpolationSpace()) {
                case "rgb":
                case "hsv":
                case "lab":
                case "din99":
                  var dis = globalCMS1.getIntervalRef(i,0)-globalCMS1.getRefPosition(i);
                  speeds[i].push(calc3DEuclideanDistance(globalCMS1.getRightKeyColor(i,space),globalCMS1.getIntervalColor(i,0,globalCMS1.getInterpolationSpace()))/dis);
                  //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  for (var j = 0; j < globalCMS1.getIntervalLength(i)-1; j++) {
                    dis = globalCMS1.getIntervalRef(i,j+1)-globalCMS1.getIntervalRef(i,j);
                    speeds[i].push(calc3DEuclideanDistance(globalCMS1.getIntervalColor(i,j,globalCMS1.getInterpolationSpace()),globalCMS1.getIntervalColor(i,j+1,globalCMS1.getInterpolationSpace()))/dis);
                    //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  }
                  dis=globalCMS1.getRefPosition(i+1)-globalCMS1.getIntervalRef(i,globalCMS1.getIntervalLength(i)-1);
                  speeds[i].push(calc3DEuclideanDistance(globalCMS1.getIntervalColor(i,globalCMS1.getIntervalLength(i)-1,globalCMS1.getInterpolationSpace()),globalCMS1.getLeftKeyColor(i+1,space))/dis);
                  //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  break;
                case "de94":
                case "de94-ds":
                  var dis = globalCMS1.getIntervalRef(i,0)-globalCMS1.getRefPosition(i);
                  speeds[i].push(calcDeltaDE94(globalCMS1.getRightKeyColor(i,space),globalCMS1.getIntervalColor(i,0,globalCMS1.getInterpolationSpace()))/dis);
                  //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  for (var j = 0; j < globalCMS1.getIntervalLength(i)-1; j++) {
                    dis = globalCMS1.getIntervalRef(i,j+1)-globalCMS1.getIntervalRef(i,j);
                    speeds[i].push(calcDeltaDE94(globalCMS1.getIntervalColor(i,j,globalCMS1.getInterpolationSpace()),globalCMS1.getIntervalColor(i,j+1,globalCMS1.getInterpolationSpace()))/dis);
                    //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  }
                  dis=globalCMS1.getRefPosition(i+1)-globalCMS1.getIntervalRef(i,globalCMS1.getIntervalLength(i)-1);
                  speeds[i].push(calcDeltaDE94(globalCMS1.getIntervalColor(i,globalCMS1.getIntervalLength(i)-1,globalCMS1.getInterpolationSpace()),globalCMS1.getLeftKeyColor(i+1,space))/dis);
                  //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                break;
                case "de2000":
                case "de2000-ds":
                  var dis = globalCMS1.getIntervalRef(i,0)-globalCMS1.getRefPosition(i);
                  speeds[i].push(calcDeltaCIEDE2000(globalCMS1.getRightKeyColor(i,space),globalCMS1.getIntervalColor(i,0,globalCMS1.getInterpolationSpace()))/dis);
                  //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  for (var j = 0; j < globalCMS1.getIntervalLength(i)-1; j++) {
                    dis = globalCMS1.getIntervalRef(i,j+1)-globalCMS1.getIntervalRef(i,j);
                    speeds[i].push(calcDeltaCIEDE2000(globalCMS1.getIntervalColor(i,j,globalCMS1.getInterpolationSpace()),globalCMS1.getIntervalColor(i,j+1,globalCMS1.getInterpolationSpace()))/dis);
                    //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  }
                  dis=globalCMS1.getRefPosition(i+1)-globalCMS1.getIntervalRef(i,globalCMS1.getIntervalLength(i)-1);
                  speeds[i].push(calcDeltaCIEDE2000(globalCMS1.getIntervalColor(i,globalCMS1.getIntervalLength(i)-1,globalCMS1.getInterpolationSpace()),globalCMS1.getLeftKeyColor(i+1,space))/dis);
                  //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                break;
                default:
                  return;
              }
            }
            else {
              var dis = globalCMS1.getRefPosition(i+1)-globalCMS1.getRefPosition(i);
              switch (globalCMS1.getInterpolationSpace()) {
                case "rgb":
                case "hsv":
                case "lab":
                case "din99":
                  speeds[i].push(calc3DEuclideanDistance(globalCMS1.getRightKeyColor(i,space),globalCMS1.getLeftKeyColor(i+1,space))/dis);
                break;
                case "de94":
                case "de94-ds":
                  speeds[i].push(calcDeltaDE94(globalCMS1.getRightKeyColor(i,space),globalCMS1.getLeftKeyColor(i+1,space))/dis);
                break;
                case "de2000":
                case "de2000-ds":
                  speeds[i].push(calcDeltaCIEDE2000(globalCMS1.getRightKeyColor(i,space),globalCMS1.getLeftKeyColor(i+1,space))/dis);
                break;
                default:
                  return;
              }
            }

            for (var j = 0; j < speeds[i].length; j++) {
              min = Math.min(min,speeds[i][j]);
              max = Math.max(max,speeds[i][j]);
              sumForAverage += speeds[i][j];
            }
            //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
            sumBands +=speeds[i].length;
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

      var usedMax = max;

      /*if(document.getElementById("id_EditPage_BlackWhiteRatio").checked){
        usedMax = blackWhiteMaxSpeed;
      }*/

      var currentXPos = 0;

      //var ratioArray = [] ;
      for (var i = 0; i < globalCMS1.getKeyLength()-1; i++) {

        if(speeds[i]==undefined) // = const band
          continue;

        var ratioBlockSum = 0 ;
        for (var j = 0; j < speeds[i].length; j++) {

          var c1 = undefined;
          var c2 = undefined;

          if(speeds[i].length==1){
            c1 = globalCMS1.getRightKeyColor(i,space);
            c2 = globalCMS1.getLeftKeyColor(i+1,space);
          }
          else {
            switch (j) {
              case 0:
                c1 = globalCMS1.getRightKeyColor(i,space);
                c2 = globalCMS1.getIntervalColor(i,j,globalCMS1.getInterpolationSpace());;
                break;
              case speeds[i].length-1:
                c1 = globalCMS1.getIntervalColor(i,j-1,globalCMS1.getInterpolationSpace());
                c2 = globalCMS1.getLeftKeyColor(i+1,space);
                break;
              default:
                c1 = globalCMS1.getIntervalColor(i,j-1,globalCMS1.getInterpolationSpace());
                c2 = globalCMS1.getIntervalColor(i,j,globalCMS1.getInterpolationSpace());
            }
          }

          //////////////////////////////////////

          var barHeight;

          /*if(document.getElementById("id_EditPage_DoFixedAxis_GlobalLocalOrder").checked){
            var ratio = (speeds[i][j]/usedMax);
            if(ratio>1.0)
              ratio=1.0;
            barHeight=canvasPlot.height*ratio;
          }
          else{*/
            barHeight=canvasPlot.height*(speeds[i][j]/usedMax);
          //}

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
