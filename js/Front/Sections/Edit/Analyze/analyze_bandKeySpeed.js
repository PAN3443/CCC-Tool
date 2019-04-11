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

    document.getElementById("id_EditPage_MatricLabel_IntSpaceKeySpeed").style.display = "block";
    document.getElementById("id_EditPage_MatricDiv1_IntSpaceKeySpeed").style.display = "flex";
    document.getElementById("id_EditPage_MatricDiv2_IntSpaceKeySpeed").style.display = "flex";

    document.getElementById("id_EditPage_EuDisLabel_IntSpaceKeySpeed").style.display = "block";

    document.getElementById("id_EditPage_CanvasDE94_IntSpaceKeySpeed").style.height = "7.25vh";
    document.getElementById("id_EditPage_CanvasCIEDE2000_IntSpaceKeySpeed").style.height = "7.25vh";
    document.getElementById("id_EditPage_CanvasLAB_IntSpaceKeySpeed").style.height = "7.25vh";
    document.getElementById("id_EditPage_CanvasDIN99_IntSpaceKeySpeed").style.height = "7.25vh";
    document.getElementById("id_EditPage_CanvasRGB_IntSpaceKeySpeed").style.height = "7.25vh";
    document.getElementById("id_EditPage_CanvasHSV_IntSpaceKeySpeed").style.height = "7.25vh";

    draw_BandSpeed(globalCMS1,"id_EditPage_CanvasDE94_IntSpaceKeySpeed", 3);
    draw_BandSpeed(globalCMS1, "id_EditPage_CanvasCIEDE2000_IntSpaceKeySpeed", 4);
    draw_BandSpeed(globalCMS1, "id_EditPage_CanvasLAB_IntSpaceKeySpeed", 2);
    draw_BandSpeed(globalCMS1, "id_EditPage_CanvasDIN99_IntSpaceKeySpeed", 5);
    draw_BandSpeed(globalCMS1, "id_EditPage_CanvasRGB_IntSpaceKeySpeed", 0);
    draw_BandSpeed(globalCMS1, "id_EditPage_CanvasHSV_IntSpaceKeySpeed", 1);
  }

}


function draw_BandSpeed(cms, plotid, type){

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
