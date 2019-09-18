function styleStructure_BandSpeed(){

  if(globalCMS1.getKeyLength()==0){
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "flex";
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "none";
  }
  else{
    document.getElementById("id_EditPage_AnalyzePlot_Container").style.display = "flex";
    document.getElementById("id_EditPage_Analyze_EmptyDiv").style.display = "none";

    document.getElementById("id_EditPage_AnalyzeContainer_GlobalLocalOrder").style.display = "none";
    document.getElementById("id_EditPage_AnalyzeContainer_SpacesSelectVisType").style.display = "none";
    document.getElementById("id_EditPage_AnalyzeContainer_SpacesKeyspeed").style.display = "block";

    document.getElementById("id_EditPage_InterpolationAnalyse_RGB_Div").style.display = "none";
    document.getElementById("id_EditPage_InterpolationAnalyse_HSV_Div").style.display = "none";

    document.getElementById("id_EditPage_CanvasLAB_IntSpaceKeySpeed").style.height = "7.5vh";
    document.getElementById("id_EditPage_CanvasLAB_DS94_IntSpaceKeySpeed").style.height = "7.5vh";
    document.getElementById("id_EditPage_CanvasLAB_DS2000_IntSpaceKeySpeed").style.height = "7.5vh";
    document.getElementById("id_EditPage_CanvasDE94_IntSpaceKeySpeed").style.height = "7.5vh";
    document.getElementById("id_EditPage_CanvasCIEDE2000_IntSpaceKeySpeed").style.height = "7.5vh";
    document.getElementById("id_EditPage_CanvasDIN99_IntSpaceKeySpeed").style.height = "7.5vh";

    var orginalIntSpace = globalCMS1.getInterpolationSpace();
    draw_BandSpeed("id_EditPage_CanvasLAB_IntSpaceKeySpeed","lab");
    draw_BandSpeed("id_EditPage_CanvasLAB_DS94_IntSpaceKeySpeed","de94-ds");
    draw_BandSpeed("id_EditPage_CanvasLAB_DS2000_IntSpaceKeySpeed","de2000-ds");
    draw_BandSpeed("id_EditPage_CanvasDE94_IntSpaceKeySpeed","de94");
    draw_BandSpeed("id_EditPage_CanvasCIEDE2000_IntSpaceKeySpeed","de2000");
    draw_BandSpeed("id_EditPage_CanvasDIN99_IntSpaceKeySpeed","din99");
    globalCMS1.setInterpolationSpace(orginalIntSpace);
  }

}


function draw_BandSpeed(plotid, type){

  var canvasPlot = document.getElementById(plotid);

  var rect = canvasPlot.getBoundingClientRect();
  canvasPlot.width = rect.width;
  canvasPlot.height = 1;

  var canvasCtx = canvasPlot.getContext("2d");
  canvasCtx.webkitImageSmoothingEnabled = false;
  canvasCtx.mozImageSmoothingEnabled = false;
  canvasCtx.imageSmoothingEnabled = false;
  canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);
  var canvasData = canvasCtx.createImageData(canvasPlot.width, 1); //getImageData(0, 0, canvasPlot.width, canvasPlot.height);

  var borderWidth = 2; //px

  var numberOfScaledBands=0;
  var currentWidth=0;
  var currentPos=0;

  var arraySpeed = [];
  var arraySpeedSum = 0;
  var indexList = [];

  if(type==="de94"||type==="de2000")
    return;

  globalCMS1.setInterpolationSpace(type);
  /////////////////////////////////////////////////////////////////////////////
  // Calc Speed
  for(var i=0; i<globalCMS1.getKeyLength()-1; i++){

          var speed=0;

          if(globalCMS1.getKeyType(i)==="nil key" || globalCMS1.getKeyType(i)==="left key")
          continue;

          numberOfScaledBands++;
          indexList.push(i);

          var c1 = globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace());
          var c2 = globalCMS1.getLeftKeyColor(i+1,globalCMS1.getInterpolationSpace());

          var dis = globalCMS1.getRefPosition(i+1)-globalCMS1.getRefPosition(i);

          var deltaSum =0;
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
                deltaSum += calc3DEuclideanDistance(c1,globalCMS1.getIntervalColor(i,0,globalCMS1.getInterpolationSpace()));// /(globalCMS1.getIntervalRef(i,0)-globalCMS1.getRefPosition(i)));
                for (var j = 0; j < globalCMS1.getIntervalLength(i)-1; j++) {
                  deltaSum += calc3DEuclideanDistance(globalCMS1.getIntervalColor(i,j,globalCMS1.getInterpolationSpace()),globalCMS1.getIntervalColor(i,j+1,globalCMS1.getInterpolationSpace()));// /(globalCMS1.getIntervalRef(i,j+1)-globalCMS1.getIntervalRef(i,j)));
                }
                deltaSum += calc3DEuclideanDistance(globalCMS1.getIntervalColor(i,globalCMS1.getIntervalLength(i)-1,globalCMS1.getInterpolationSpace()),c2);// /(globalCMS1.getRefPosition(i+1)-globalCMS1.getIntervalRef(i,globalCMS1.getIntervalLength(i)-1)));
                break;
              case "de94":
              case "de94-ds":
                deltaSum += calcDeltaDE94(c1,globalCMS1.getIntervalColor(i,0,globalCMS1.getInterpolationSpace()));// /(globalCMS1.getIntervalRef(i,0)-globalCMS1.getRefPosition(i)));
                for (var j = 0; j < globalCMS1.getIntervalLength(i)-1; j++) {
                  deltaSum += calcDeltaDE94(globalCMS1.getIntervalColor(i,j,globalCMS1.getInterpolationSpace()),globalCMS1.getIntervalColor(i,j+1,globalCMS1.getInterpolationSpace()));// /(globalCMS1.getIntervalRef(i,j+1)-globalCMS1.getIntervalRef(i,j)));
                }
                deltaSum += calcDeltaDE94(globalCMS1.getIntervalColor(i,globalCMS1.getIntervalLength(i)-1,globalCMS1.getInterpolationSpace()),c2);// /(globalCMS1.getRefPosition(i+1)-globalCMS1.getIntervalRef(i,globalCMS1.getIntervalLength(i)-1)));
              break;
              case "de2000":
              case "de2000-ds":
                deltaSum += calcDeltaCIEDE2000(c1,globalCMS1.getIntervalColor(i,0,globalCMS1.getInterpolationSpace()));// /(globalCMS1.getIntervalRef(i,0)-globalCMS1.getRefPosition(i)));
                for (var j = 0; j < globalCMS1.getIntervalLength(i)-1; j++) {
                  deltaSum += calcDeltaCIEDE2000(globalCMS1.getIntervalColor(i,j,globalCMS1.getInterpolationSpace()),globalCMS1.getIntervalColor(i,j+1,globalCMS1.getInterpolationSpace()));// /(globalCMS1.getIntervalRef(i,j+1)-globalCMS1.getIntervalRef(i,j)));
                }
                deltaSum += calcDeltaCIEDE2000(globalCMS1.getIntervalColor(i,globalCMS1.getIntervalLength(i)-1,globalCMS1.getInterpolationSpace()),c2);// /(globalCMS1.getRefPosition(i+1)-globalCMS1.getIntervalRef(i,globalCMS1.getIntervalLength(i)-1)));
              break;
              default:
                return;
            }

            speed = deltaSum/dis;

          }
          else {

            switch (globalCMS1.getInterpolationSpace()) {
              case "rgb":
              case "hsv":
              case "lab":
              case "din99":
                speed = calc3DEuclideanDistance(c1,c2)/dis;
              break;
              case "de94":
              case "de94-ds":
                speed = calcDeltaDE94(c1,c2)/dis;
              break;
              case "de2000":
              case "de2000-ds":
                speed = calcDeltaCIEDE2000(c1,c2)/dis;
              break;
              default:
                return;
            }
          }

          arraySpeed.push(speed);
          arraySpeedSum += speed;
  }


  var restWidth = canvasPlot.width-(numberOfScaledBands-1)*borderWidth;
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
      case "lab":
        color1 = globalCMS1.getRightKeyColor(indexList[i],"lab");
        color2 = globalCMS1.getLeftKeyColor(indexList[i]+1,"lab");

        for(var x=0; x<currentWidth; x++){
          var index = (currentPos+x) * 4;

          var tmpRatio = x/currentWidth;

          var lValue = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
          var aValue = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
          var bValue = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

          var tmpCurrentLABColor = new class_Color_LAB(lValue,aValue,bValue);
          var tmpCurrentColor = tmpCurrentLABColor.calcRGBColor();

          canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
          canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
          canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
          canvasData.data[index + 3] = 255; //a
          tmpCurrentLABColor.deleteReferences();
          tmpCurrentColor.deleteReferences();
          tmpCurrentLABColor=null;
          tmpCurrentColor=null;
        }
        color1.deleteReferences();
        color2.deleteReferences();
        color1=null;
        color2=null;
        break;
      case "din99":
      case "de94-ds":
      case "de2000-ds":
      case "de94":
      case "de2000":
      color1 = globalCMS1.getRightKeyColor(indexList[i],"din99");
      color2 = globalCMS1.getLeftKeyColor(indexList[i]+1,"din99");

      for(var x=0; x<currentWidth; x++){
        var index = (currentPos+x) * 4;

        var tmpRatio = x/currentWidth;

        var l99Value = color1.get1Value() + (color2.get1Value() - color1.get1Value()) * tmpRatio;
        var a99Value = color1.get2Value() + (color2.get2Value() - color1.get2Value()) * tmpRatio;
        var b99Value = color1.get3Value() + (color2.get3Value() - color1.get3Value()) * tmpRatio;

        var tmpCurrentDIN99Color = new class_Color_DIN99(l99Value,a99Value,b99Value);
        var tmpCurrentColor = tmpCurrentDIN99Color.calcRGBColor();

        canvasData.data[index + 0] = Math.round(tmpCurrentColor.getRValue() * 255); // r
        canvasData.data[index + 1] = Math.round(tmpCurrentColor.getGValue() * 255); // g
        canvasData.data[index + 2] = Math.round(tmpCurrentColor.getBValue() * 255); // b
        canvasData.data[index + 3] = 255; //a
        tmpCurrentDIN99Color.deleteReferences();
        tmpCurrentColor.deleteReferences();
        tmpCurrentDIN99Color=null;
        tmpCurrentColor=null;
      }
      color1.deleteReferences();
      color2.deleteReferences();
      color1=null;
      color2=null;
      break;

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
