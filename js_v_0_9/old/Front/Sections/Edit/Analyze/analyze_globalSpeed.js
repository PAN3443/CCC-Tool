function styleStructure_GlobalSpeed(){

  if(globalCMS1.getKeyLength()==0){
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "flex";
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "none";
  }
  else{
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "flex";
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "none";
    document.getElementById("id_editPage_OrderAxisLabel1").style.visibility = "hidden";
    document.getElementById("id_editPage_OrderAxisLabel2").style.visibility = "hidden";
    document.getElementById("id_EditPage_Average_GlobalLocalOrder").style.display = "block";
    document.getElementById("id_EditPage_Deviation_GlobalLocalOrder").style.display = "block";
    //document.getElementById("id_EditPage_FixedAxisDiv_GlobalLocalOrder").style.display = "block";
    document.getElementById("id_EditPage_ColorAboveDiv_GlobalLocalOrder").style.display = "flex";
    document.getElementById("id_EditPage_ColorAboveFixedAxis_GlobalLocalOrder").style.background = globalPlotAboveColor.getRGBString();
    document.getElementById("id_EditPage_DoLogDiv_GlobalLocalOrder").style.display = "none";//"block";
    document.getElementById("id_EditPage_FixedAxisLabel_GlobalLocalOrder").innerHTML="Fixed Global Speed Difference:";
    document.getElementById("id_EditPage_MaxSetting_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_KeyOrSamplingSetting_GlobalLocalOrder").style.display = "block";

    document.getElementById("id_EditPage_Analyze_ContiuousSections").style.display = "flex";

    styleGlobalLocalOrderPlot();

    var oldInterval = intervalDelta;
    var oldIntervalSize = intervalSize;

    var plotid ="id_EditPage_Canvas_GlobalLocalOrder";

    if(document.getElementById("id_PopUp_fullAnalzeWindow").style.display!="none")
      plotid="id_PopUp_FullAnalayzeCanvas";

    globalCMS1.calcDeltaIntervalColors(deltaSampling_Analyze);
    intervalDelta=oldInterval;
    intervalSize=oldIntervalSize;

    drawGlobalSpeedPlot(plotid, "id_EditPage_Min_GlobalLocalOrder", "id_EditPage_Max_GlobalLocalOrder", "id_EditPage_Average_GlobalLocalOrder", "id_EditPage_Deviation_GlobalLocalOrder");

  }

}

function drawGlobalSpeedPlot(plotid, minId, maxId, avId, devId){

      var continuousSections = searchForContinuousSections(0,globalCMS1.getKeyLength()-1);

      // fill continious
      var selectbox = document.getElementById("id_EditPage_Analyze_ContiuousSelector");
      var oldStartIndex = selectbox.selectedIndex;
      for(var i = selectbox.options.length - 1 ; i >= 0 ; i--)
      {
          selectbox.remove(i);
      }

      // fill startbox
      if(continuousSections.length==0)
      return;

      for (var i = 0; i < continuousSections.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = "Key " +(continuousSections[i][0]+1)+" - Key " +(continuousSections[i][1]+1);
        opt.value = i;
        selectbox.appendChild(opt);
      }

      if(oldStartIndex>=0)
        selectbox.selectedIndex=oldStartIndex;
      else
        selectbox.selectedIndex=0;

      ///////////////////////////////////////////////////////////////////////////////////////////////////
      var selectedIndex = document.getElementById("id_EditPage_Analyze_ContiuousSelector").selectedIndex;

      var sumForAverage = 0;

      var colorArray = [];
      var refArray = [];

      // fill arrays with key and interval information

      if(document.getElementById("id_EditPage_AnalyseOnlyUseKeys").checked){
        for (var i = continuousSections[selectedIndex][0]; i < continuousSections[selectedIndex][1]; i++) {
            colorArray.push(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()));
            refArray.push(globalCMS1.getRefPosition(i));
        }
      }
      else {
        for (var i = continuousSections[selectedIndex][0]; i < continuousSections[selectedIndex][1]; i++) {
            colorArray.push(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()));
            refArray.push(globalCMS1.getRefPosition(i));
            for (var j = 0; j < globalCMS1.getIntervalLength(i)-1; j++) {
              colorArray.push(globalCMS1.getIntervalColor(i,j,globalCMS1.getInterpolationSpace()));
              refArray.push(globalCMS1.getIntervalRef(i,j));
            }
        }
      }
        colorArray.push(globalCMS1.getLeftKeyColor(continuousSections[selectedIndex][1],globalCMS1.getInterpolationSpace()));
        refArray.push(globalCMS1.getRefPosition(continuousSections[selectedIndex][1]));

        var min = Infinity;
        var max = -Infinity;
        var numTwinOrLeft=0;
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

        var matrix = [];

        for(var x=0; x<colorArray.length; x++){

          var column = [];
          for(var y=0; y<colorArray.length; y++){

              var deltaE=0;
              var speed=0;
              if(x!=y){

                switch (globalCMS1.getInterpolationSpace()) {
                    case "rgb":
                    case "hsv":
                    case "lab":
                    case "din99":
                     deltaE = calc3DEuclideanDistance(cloneColor(colorArray[x]),cloneColor(colorArray[y]));
                      break;
                      case "de94":
                      case "de94-ds":
                       deltaE = calcDeltaDE94(cloneColor(colorArray[x]),cloneColor(colorArray[y]));
                        break;
                        case "de2000":
                        case "de2000-ds":
                         deltaE = calcDeltaCIEDE2000(cloneColor(colorArray[x]),cloneColor(colorArray[y]));
                          break;
                }


                    if(refArray[x]==refArray[y]){

                      speed=-1;
                      numTwinOrLeft++;
                    }
                    else{
                      var distance = Math.abs(refArray[x]-refArray[y]);
                      speed = deltaE/distance;
                      sumForAverage += speed;
                      min = Math.min(min,speed);
                      max = Math.max(max,speed);
                      //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/distance));
                    }

              }

              column.push(speed);
          }
          matrix.push(column);
        }


      var maxColorDif = max;//(max-min);

      /*if(document.getElementById("id_EditPage_BlackWhiteRatio").checked){
        maxColorDif = blackWhiteMaxSpeed;
      }*/

      var average=sumForAverage/(colorArray.length*colorArray.length-colorArray.length); // -colorArray.length because for each x=y we don't calculate a speed
      var sumForVariance = 0;

      /////////////////////////////////////////////////////
      var canvasPlot = document.getElementById(plotid);

      canvasPlot.width = colorArray.length;
      canvasPlot.height = colorArray.length;

      var canvasCtx = canvasPlot.getContext("2d");

       canvasCtx.mozImageSmoothingEnabled = false;
       canvasCtx.webkitImageSmoothingEnabled = false;
       canvasCtx.msImageSmoothingEnabled = false;
       canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
       canvasCtx.oImageSmoothingEnabled = false;

      var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height); //getImageData(0, 0, canvasPlot.width, canvasPlot.height);

      //////////////////////////////////////////////////////////////////////////////////
      // calc variance
      ////////////////////////////////////////////////////////////////////////////////////

      /*var maxColorDif = max;

      if(document.getElementById("id_EditPage_DoFixedAxis_GlobalLocalOrder").checked){
        maxColorDif = parseFloat(document.getElementById("id_EditPage_InputFixedAxis_GlobalLocalOrder").value);


        if(isNaN(maxColorDif) || maxColorDif<=0){
          maxColorDif=(max-min);
          document.getElementById("id_EditPage_InputFixedAxis_GlobalLocalOrder").value=maxColorDif;
        }

      }*/

      for(var x=0; x<colorArray.length; x++){

        for(var y=0; y<colorArray.length; y++){

            var colorRef = undefined;
            if(x==y){
              colorRef = colorArray[x].calcRGBColor();
            }
            else
            {

                  var speed= matrix[x][y];
                  var val;
                  if(speed==-1){
                    val=1;
                  }
                  else{

                      /*if(document.getElementById("id_EditPage_DoLogSelect_GlobalLocalOrder").checked){

                        if(document.getElementById("id_EditPage_DoFixedAxis_GlobalLocalOrder").checked && speed>maxColorDif ){
                          val = 1.1; // bigger than 1 -> coloring in above border color
                        }
                        else{
                          val = (Math.log(speed+1)-Math.log(min+1))/Math.log(maxColorDif+1);
                        }
                      }
                      else{*/
                        val = 1-(speed/maxColorDif);//(speed-min)/maxColorDif;
                      //}

                    sumForVariance += Math.pow(matrix[x][y]-average,2);
                  }

                  if(val<0.0)
                    val=0.0;

                  colorRef = new class_Color_RGB(val,val,val);

                  if(val>1.0)
                    colorRef = globalPlotAboveColor


            }

            var index = (x + y * canvasPlot.width) * 4;
            canvasData.data[index + 0] = Math.round(colorRef.getRValue() * 255); // r
            canvasData.data[index + 1] = Math.round(colorRef.getGValue() * 255); // g
            canvasData.data[index + 2] = Math.round(colorRef.getBValue() * 255); // b
            canvasData.data[index + 3] = 255; //a

            colorRef.deleteReferences();
            colorRef=null;

        }
      }

      canvasCtx.putImageData(canvasData, 0, 0);

      var variance = sumForVariance/(colorArray.length*colorArray.length-colorArray.length);
      var deviation = Math.sqrt(variance);


      document.getElementById(minId).innerHTML = "Global Speed Minimum = "+ min;//.toFixed(numDecimalPlaces);

      if(min==0)
      document.getElementById(minId).style.color = getComputedStyle(document.documentElement).getPropertyValue('--general-warning-color');
      else
      document.getElementById(minId).style.color = getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

      document.getElementById(maxId).innerHTML = "Global Speed Maximum = "+ max;//.toFixed(numDecimalPlaces);
      document.getElementById(avId).innerHTML = "Global Speed Average = "+ average;//.toFixed(numDecimalPlaces);
      document.getElementById(devId).innerHTML = "Global Speed Deviation = "+ deviation;//.toFixed(numDecimalPlaces);

      for (var i = colorArray.length-1; i >=0; i--){
        colorArray[i].deleteReferences();
        colorArray[i]=null;
      }


}
