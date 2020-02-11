class class_Edit_Part_Analysis extends class_Edit_Part_Basis {

  constructor(divID,parentID) {
    super(divID,parentID);
    this.analysis_Height_VH=62;
    this.analysis_Width_VW=undefined;
    this.optionRowID=undefined;
    this.workCMS = undefined;
    this.numDecimalPlaces = 5;
  }

  updatePart(){

    if(this.analysis_Width_VW==undefined)
      return;

    if(!super.updatePart())
      return;

      switch (document.getElementById("id_EditPage_SelectAnalysisType").options[document.getElementById("id_EditPage_SelectAnalysisType").selectedIndex].value) {
        case "intSpace":
          this.calc_AnalysisPlot_IntSpace();
        break;
        case "speedBand":
          this.calc_AnalysisPlot_BandSpeed();
        break;
        case "locSpeed":
          this.calc_AnalysisPlot_LocalSpeed();
        break;
        case "globSpeed":

        break;
        case "intOrder":

        break;
        default:
          return;
      }

  }

  showPart(){
    if(super.showPart())
      this.stylePart();
  }

  stylePart(){

    if(this.analysis_Width_VW==undefined)
      return;

    this.partIsReady=false;

    document.getElementById(this.partDivID).innerHTML="";
    document.getElementById(this.optionRowID).innerHTML="";
    //
    document.getElementById(this.partDivID).style.display="flex";
    switch (document.getElementById("id_EditPage_SelectAnalysisType").options[document.getElementById("id_EditPage_SelectAnalysisType").selectedIndex].value) {
      case "intSpace":
        document.getElementById(this.partDivID).style.flexDirection="column";
        var rowHeight = this.analysis_Height_VH/9;
        document.getElementById(this.partDivID).appendChild(this.createIntRow("RGB", rowHeight , this.partDivID+"_IntRGB"));
        document.getElementById(this.partDivID).appendChild(this.createIntRow("HSV", rowHeight , this.partDivID+"_IntHSV"));
        document.getElementById(this.partDivID).appendChild(this.createIntRow("Lab", rowHeight , this.partDivID+"_IntLAB"));
        /*document.getElementById(this.partDivID).appendChild(this.createIntRow("DS de94", rowHeight , this.partDivID+"_IntDS94"));
        document.getElementById(this.partDivID).appendChild(this.createIntRow("DS CIEDE2000", rowHeight , this.partDivID+"_IntDS2000"));*/
        document.getElementById(this.partDivID).appendChild(this.createIntRow("DIN99", rowHeight , this.partDivID+"_IntDIN99"));

        var tmpSelect = document.createElement('select');
        tmpSelect.id= this.partDivID+"_IntPlotType";
        tmpSelect.style.width= "5vw";
        tmpSelect.style.fontSize= "2vh";
        tmpSelect.style.height= "3vh";
        tmpSelect.style.lineHeight= "3vh";
        tmpSelect.onchange = function(){
          if(editSection.isSectionOpen())
            editSection.part_Analysis.updatePart();

          if(optiSection.isSectionOpen())
            optiSection.part_Analysis.updatePart();
        };
        var tmpLinearOption = document.createElement('option');
        tmpLinearOption.innerHTML = "Linear Plot";
        tmpLinearOption.value = "linear";
        tmpSelect.appendChild(tmpLinearOption);
        var tmpSketchOption = document.createElement('option');
        tmpSketchOption.innerHTML = "Sketch Plot";
        tmpSketchOption.value = "sketch";
        tmpSelect.appendChild(tmpSketchOption);
        document.getElementById(this.optionRowID).appendChild(tmpSelect);
      break;
      case "speedBand":
        var rowHeight = this.analysis_Height_VH/9;
        document.getElementById(this.partDivID).style.flexDirection="column";
        document.getElementById(this.partDivID).appendChild(this.createIntRow("Lab", rowHeight , this.partDivID+"_BandLAB"));
        document.getElementById(this.partDivID).appendChild(this.createIntRow("de94", rowHeight , this.partDivID+"_BandDS94"));
        document.getElementById(this.partDivID).appendChild(this.createIntRow("CIEDE2000", rowHeight , this.partDivID+"_BandDS2000"));
        document.getElementById(this.partDivID).appendChild(this.createIntRow("DIN99", rowHeight , this.partDivID+"_BandDIN99"));
      break;
      case "locSpeed":
        document.getElementById(this.partDivID).style.flexDirection="row";
        var tmpWidth = (this.analysis_Width_VW/2)-3;
        var tmpInfoDiv = this.creatInfoDiv(tmpWidth,this.analysis_Height_VH);
        document.getElementById(this.partDivID).appendChild(tmpInfoDiv);
        document.getElementById(this.partDivID).appendChild(this.createAnalysisCanvas(tmpWidth,this.analysis_Height_VH, this.partDivID+"_LocSpeedCanvas"));

      break;
      case "globSpeed":
        document.getElementById(this.partDivID).style.flexDirection="row";
        var tmpWidth = (this.analysis_Width_VW/2)-3;
        var tmpInfoDiv = this.creatInfoDiv(tmpWidth,this.analysis_Height_VH);
        document.getElementById(this.partDivID).appendChild(tmpInfoDiv);
        document.getElementById(this.partDivID).appendChild(this.createAnalysisCanvas(tmpWidth,this.analysis_Height_VH, this.partDivID+"_GlobSpeedCanvas"));
      break;
      case "intOrder":
        document.getElementById(this.partDivID).style.flexDirection="row";
        var tmpWidth = (this.analysis_Width_VW/2)-3;
        var tmpInfoDiv = this.creatInfoDiv(tmpWidth,this.analysis_Height_VH);
        document.getElementById(this.partDivID).appendChild(tmpInfoDiv);
        document.getElementById(this.partDivID).appendChild(this.createAnalysisCanvas(tmpWidth,this.analysis_Height_VH, this.partDivID+"_IntOrderCanvas"));
      break;
      default:
        return;
    }
    this.partIsReady=true;
    this.updatePart();
  }

  createAnalysisCanvas(tmpWidth, tmpHeigh, canvasID){
    var tmpCanvas=document.createElement('canvas');
    tmpCanvas.style.width=tmpWidth+"vw";
    tmpCanvas.style.maxWidth=tmpHeigh+"vh";
    tmpCanvas.style.height=tmpHeigh+"vh";
    tmpCanvas.style.maxHeight=tmpWidth+"vw";
    tmpCanvas.style.margin="auto";
    tmpCanvas.style.background="url(img/EditPage/plotBackground.png)";
    tmpCanvas.style.backgroundSize="cover";
    tmpCanvas.style.backgroundRepeat="no-repeat";
    tmpCanvas.style.backgroundPosition="center center";
    tmpCanvas.style.border="0.2vh solid var(--main-border)";
    tmpCanvas.id=canvasID;

    tmpCanvas.style.imageRendering = "optimizeSpeed";             /* Older versions of FF*/
    tmpCanvas.style.imageRendering = "-moz-crisp-edges";          /* FF 6.0+*/
    tmpCanvas.style.imageRendering = "-webkit-optimize-contrast"; /* Webkit (non standard naming)*/
    tmpCanvas.style.imageRendering = "-o-crisp-edges";            /* OS X & Windows Opera (12.02+)*/
    tmpCanvas.style.imageRendering = "pixelated";               /* Possible future browsers.*/
    tmpCanvas.style.msInterpolationMode = "nearest-neighbor";   /* IE (non standard naming)*/

    return tmpCanvas;
  }

  creatInfoDiv(tmpWidth, tmpHeight){
    var tmpDiv = document.createElement('div');
    tmpDiv.style.width= tmpWidth+"vw";
    tmpDiv.style.height= tmpHeight+"vh";
    tmpDiv.style.display="flex";
    tmpDiv.style.fontWeight="bold";
    tmpDiv.style.flexDirection="column";
    tmpDiv.style.paddingTop = "1vh";
    tmpDiv.style.paddingBottom = "1vh";
    tmpDiv.style.paddingLeft = "1vw";
    tmpDiv.style.paddingRight = "1vw";
    //tmpDiv.style.background = "var(--main-sepArea-bg)";

    var tmpP = document.createElement('p');
    tmpP.style.marginTop = "auto";
    tmpP.style.marginBottom = "1vh";
    tmpP.innerHTML = "Statisic:";
    tmpP.style.fontSize = "2.5vh";
    tmpP.style.lineHeight = "3.0vh";
    tmpP.style.color = "var(--main-font-color)";
    tmpDiv.appendChild(tmpP);

    tmpP = document.createElement('p');
    tmpP.id=this.partDivID+"_InfoMax";
    tmpP.style.fontSize = "2.0vh";
    tmpP.style.lineHeight = "3.0vh";
    tmpP.style.color = "var(--main-font-color)";
    tmpP.innerHTML = "Max:";
    tmpDiv.appendChild(tmpP);

    tmpP = document.createElement('p');
    tmpP.id=this.partDivID+"_InfoMin";
    tmpP.style.fontSize = "2.0vh";
    tmpP.style.lineHeight = "3.0vh";
    tmpP.style.color = "var(--main-font-color)";
    tmpP.innerHTML = "Min:";
    tmpDiv.appendChild(tmpP);

    tmpP = document.createElement('p');
    tmpP.id=this.partDivID+"_InfoAverage";
    tmpP.style.fontSize = "2.0vh";
    tmpP.style.lineHeight = "3.0vh";
    tmpP.style.color = "var(--main-font-color)";
    tmpP.innerHTML = "Average:";
    tmpDiv.appendChild(tmpP);

    tmpP = document.createElement('p');
    tmpP.id=this.partDivID+"_InfoDeviation";
    tmpP.style.fontSize = "2.0vh";
    tmpP.style.lineHeight = "3.0vh";
    tmpP.style.marginBottom = "auto";
    tmpP.style.color = "var(--main-font-color)";
    tmpP.innerHTML = "Deviation:";
    tmpDiv.appendChild(tmpP);

    return tmpDiv;
  }

  createIntRow(label, height, canvasID){
      var tmpDiv = document.createElement('div');
      tmpDiv.style.width= "100%";
      tmpDiv.style.height= height+"vh";
      tmpDiv.style.display = "flex";
      tmpDiv.style.margin = "auto";
      var tmpLabel=document.createElement('p');
      tmpLabel.style.width="20%";
      tmpLabel.style.color="var(--main-font-color)";
      tmpLabel.style.fontSize=(height*0.5)+"vh";
      tmpLabel.style.height=height+"vh";
      tmpLabel.style.lineHeight=height+"vh";
      tmpLabel.style.margin="auto";
      tmpLabel.innerHTML = label;
      var tmpCanvas=document.createElement('canvas');
      tmpCanvas.style.width="70%";
      tmpCanvas.style.height="100%";
      tmpCanvas.style.margin="auto";
      tmpCanvas.style.border="0.2vh solid var(--main-border)";
      tmpCanvas.id=canvasID;
      tmpDiv.appendChild(tmpLabel);
      tmpDiv.appendChild(tmpCanvas);
      return tmpDiv;
  }

  //////////////////////////////////////////
  // Analysis Type (Interpolation Space) ///
  //////////////////////////////////////////

  calc_AnalysisPlot_IntSpace(){
    this.workCMS = this.getParentCMS();
    var selectID = document.getElementById(this.partDivID+"_IntPlotType").selectedIndex;
    switch (document.getElementById(this.partDivID+"_IntPlotType").options[selectID].value) {
      case "linear":
        this.workCMS.setInterpolationSpace("lab");
        this.workCMS.drawCMS_Horizontal(this.partDivID+"_IntLAB",2000,1);
        /*this.workCMS.setInterpolationSpace("de94-ds");
        this.workCMS.drawCMS_Horizontal(this.partDivID+"_IntDS94",2000,1);
        this.workCMS.setInterpolationSpace("de2000-ds");
        this.workCMS.drawCMS_Horizontal(this.partDivID+"_IntDS2000",2000,1);*/
        this.workCMS.setInterpolationSpace("din99");
        this.workCMS.drawCMS_Horizontal(this.partDivID+"_IntDIN99",2000,1);
        this.workCMS.setInterpolationSpace("rgb");
        this.workCMS.drawCMS_Horizontal(this.partDivID+"_IntRGB",2000,1);
        this.workCMS.setInterpolationSpace("hsv");
        this.workCMS.drawCMS_Horizontal(this.partDivID+"_IntHSV",2000,1);
      break;
      case "sketch":
        this.workCMS.setInterpolationSpace("lab");
        this.workCMS.drawCMS_BandSketch(this.partDivID+"_IntLAB");
        /*this.workCMS.setInterpolationSpace("de94-ds");
        this.workCMS.drawCMS_BandSketch(this.partDivID+"_IntDS94");
        this.workCMS.setInterpolationSpace("de2000-ds");
        this.workCMS.drawCMS_BandSketch(this.partDivID+"_IntDS2000");*/
        this.workCMS.setInterpolationSpace("din99");
        this.workCMS.drawCMS_BandSketch(this.partDivID+"_IntDIN99");
        this.workCMS.setInterpolationSpace("rgb");
        this.workCMS.drawCMS_BandSketch(this.partDivID+"_IntRGB");
        this.workCMS.setInterpolationSpace("hsv");
        this.workCMS.drawCMS_BandSketch(this.partDivID+"_IntHSV");
      break;
    }
    this.workCMS.deleteReferences();
  }

  //////////////////////////////////////////
  //       Analysis Type (Band Speed)     //
  //////////////////////////////////////////
  calc_AnalysisPlot_BandSpeed(){
    this.workCMS = this.getParentCMS();
      this.draw_BandSpeed(this.partDivID+"_BandLAB","lab");
      this.draw_BandSpeed(this.partDivID+"_BandDS94","de94");
      this.draw_BandSpeed(this.partDivID+"_BandDS2000","de2000");
      this.draw_BandSpeed(this.partDivID+"_BandDIN99","din99");
    this.workCMS.deleteReferences();
  }

  draw_BandSpeed(plotid, type){

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
    this.workCMS.setInterpolationSpace("lab");
  else
    this.workCMS.setInterpolationSpace(type);

  /////////////////////////////////////////////////////////////////////////////
  // Calc Speed
  for(var i=0; i<this.workCMS.getKeyLength()-1; i++){

          var speed=0;

          if(this.workCMS.getKeyType(i)==="nil key" || this.workCMS.getKeyType(i)==="left key")
          continue;

          numberOfScaledBands++;
          indexList.push(i);

          var c1 = this.workCMS.getRightKeyColor(i,this.workCMS.getInterpolationSpace());
          var c2 = this.workCMS.getLeftKeyColor(i+1,this.workCMS.getInterpolationSpace());

          var dis = this.workCMS.getRefPosition(i+1)-this.workCMS.getRefPosition(i);

          var deltaSum =0;
          if(((this.workCMS.getInterpolationType()==="linear" &&
             this.workCMS.getInterpolationSpace()!="rgb" &&  // distance of intervals is the same like the distance of start and end color
             this.workCMS.getInterpolationSpace()!="hsv" &&
             this.workCMS.getInterpolationSpace()!="lab" &&
             this.workCMS.getInterpolationSpace()!="din99") || this.workCMS.getInterpolationType()==="spline") &&
             this.workCMS.getIntervalLength(i)>0){

            switch (this.workCMS.getInterpolationSpace()) {
              case "rgb":
              case "hsv":
              case "lab":
              case "din99":
                deltaSum += calc3DEuclideanDistance(c1,this.workCMS.getIntervalColor(i,0,this.workCMS.getInterpolationSpace()));// /(this.workCMS.getIntervalRef(i,0)-this.workCMS.getRefPosition(i)));
                for (var j = 0; j < this.workCMS.getIntervalLength(i)-1; j++) {
                  deltaSum += calc3DEuclideanDistance(this.workCMS.getIntervalColor(i,j,this.workCMS.getInterpolationSpace()),this.workCMS.getIntervalColor(i,j+1,this.workCMS.getInterpolationSpace()));// /(this.workCMS.getIntervalRef(i,j+1)-this.workCMS.getIntervalRef(i,j)));
                }
                deltaSum += calc3DEuclideanDistance(this.workCMS.getIntervalColor(i,this.workCMS.getIntervalLength(i)-1,this.workCMS.getInterpolationSpace()),c2);// /(this.workCMS.getRefPosition(i+1)-this.workCMS.getIntervalRef(i,this.workCMS.getIntervalLength(i)-1)));
                break;
              case "de94":
              case "de94-ds":
                deltaSum += calcDeltaDE94(c1,this.workCMS.getIntervalColor(i,0,this.workCMS.getInterpolationSpace()));// /(this.workCMS.getIntervalRef(i,0)-this.workCMS.getRefPosition(i)));
                for (var j = 0; j < this.workCMS.getIntervalLength(i)-1; j++) {
                  deltaSum += calcDeltaDE94(this.workCMS.getIntervalColor(i,j,this.workCMS.getInterpolationSpace()),this.workCMS.getIntervalColor(i,j+1,this.workCMS.getInterpolationSpace()));// /(this.workCMS.getIntervalRef(i,j+1)-this.workCMS.getIntervalRef(i,j)));
                }
                deltaSum += calcDeltaDE94(this.workCMS.getIntervalColor(i,this.workCMS.getIntervalLength(i)-1,this.workCMS.getInterpolationSpace()),c2);// /(this.workCMS.getRefPosition(i+1)-this.workCMS.getIntervalRef(i,this.workCMS.getIntervalLength(i)-1)));
              break;
              case "de2000":
              case "de2000-ds":
                deltaSum += calcDeltaCIEDE2000(c1,this.workCMS.getIntervalColor(i,0,this.workCMS.getInterpolationSpace()));// /(this.workCMS.getIntervalRef(i,0)-this.workCMS.getRefPosition(i)));
                for (var j = 0; j < this.workCMS.getIntervalLength(i)-1; j++) {
                  deltaSum += calcDeltaCIEDE2000(this.workCMS.getIntervalColor(i,j,this.workCMS.getInterpolationSpace()),this.workCMS.getIntervalColor(i,j+1,this.workCMS.getInterpolationSpace()));// /(this.workCMS.getIntervalRef(i,j+1)-this.workCMS.getIntervalRef(i,j)));
                }
                deltaSum += calcDeltaCIEDE2000(this.workCMS.getIntervalColor(i,this.workCMS.getIntervalLength(i)-1,this.workCMS.getInterpolationSpace()),c2);// /(this.workCMS.getRefPosition(i+1)-this.workCMS.getIntervalRef(i,this.workCMS.getIntervalLength(i)-1)));
              break;
              default:
                return;
            }

            speed = deltaSum/dis;

          }
          else {

            switch (this.workCMS.getInterpolationSpace()) {
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
      /*case "de94-ds":
      case "de2000-ds":*/
      case "de94":
      case "de2000":
        color1 = this.workCMS.getRightKeyColor(indexList[i],"lab");
        color2 = this.workCMS.getLeftKeyColor(indexList[i]+1,"lab");

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
      color1 = this.workCMS.getRightKeyColor(indexList[i],"din99");
      color2 = this.workCMS.getLeftKeyColor(indexList[i]+1,"din99");

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

  //////////////////////////////////////////
  //     Analysis Type (Local Speed)      //
  //////////////////////////////////////////

  calc_AnalysisPlot_LocalSpeed(){
      this.workCMS = this.getParentCMS();
      var canvasPlot = document.getElementById(this.partDivID+"_LocSpeedCanvas");

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
      var space = this.workCMS.getInterpolationSpace();
      var sumBands = 0;

      /*var blackWhiteDelta = undefined;
      var blackWhiteMaxSpeed = -Infinity;
      switch (this.workCMS.getInterpolationSpace()) {
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


        for (var i = 0; i < this.workCMS.getKeyLength()-1; i++) {

          if(this.workCMS.getKeyType(i)==="nil key" || this.workCMS.getKeyType(i)==="left key"){
            speeds.push(undefined);
          }
          else {

            speeds.push([]);

            if(((this.workCMS.getInterpolationType()==="linear" &&
               this.workCMS.getInterpolationSpace()!="rgb" &&  // distance of intervals is the same like the distance of start and end color
               this.workCMS.getInterpolationSpace()!="hsv" &&
               this.workCMS.getInterpolationSpace()!="lab" &&
               this.workCMS.getInterpolationSpace()!="din99") || this.workCMS.getInterpolationType()==="spline") &&
               this.workCMS.getIntervalLength(i)>0){

              switch (this.workCMS.getInterpolationSpace()) {
                case "rgb":
                case "hsv":
                case "lab":
                case "din99":
                  var dis = this.workCMS.getIntervalRef(i,0)-this.workCMS.getRefPosition(i);
                  speeds[i].push(calc3DEuclideanDistance(this.workCMS.getRightKeyColor(i,space),this.workCMS.getIntervalColor(i,0,this.workCMS.getInterpolationSpace()))/dis);
                  //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  for (var j = 0; j < this.workCMS.getIntervalLength(i)-1; j++) {
                    dis = this.workCMS.getIntervalRef(i,j+1)-this.workCMS.getIntervalRef(i,j);
                    speeds[i].push(calc3DEuclideanDistance(this.workCMS.getIntervalColor(i,j,this.workCMS.getInterpolationSpace()),this.workCMS.getIntervalColor(i,j+1,this.workCMS.getInterpolationSpace()))/dis);
                    //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  }
                  dis=this.workCMS.getRefPosition(i+1)-this.workCMS.getIntervalRef(i,this.workCMS.getIntervalLength(i)-1);
                  speeds[i].push(calc3DEuclideanDistance(this.workCMS.getIntervalColor(i,this.workCMS.getIntervalLength(i)-1,this.workCMS.getInterpolationSpace()),this.workCMS.getLeftKeyColor(i+1,space))/dis);
                  //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  break;
                case "de94":
                case "de94-ds":
                  var dis = this.workCMS.getIntervalRef(i,0)-this.workCMS.getRefPosition(i);
                  speeds[i].push(calcDeltaDE94(this.workCMS.getRightKeyColor(i,space),this.workCMS.getIntervalColor(i,0,this.workCMS.getInterpolationSpace()))/dis);
                  //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  for (var j = 0; j < this.workCMS.getIntervalLength(i)-1; j++) {
                    dis = this.workCMS.getIntervalRef(i,j+1)-this.workCMS.getIntervalRef(i,j);
                    speeds[i].push(calcDeltaDE94(this.workCMS.getIntervalColor(i,j,this.workCMS.getInterpolationSpace()),this.workCMS.getIntervalColor(i,j+1,this.workCMS.getInterpolationSpace()))/dis);
                    //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  }
                  dis=this.workCMS.getRefPosition(i+1)-this.workCMS.getIntervalRef(i,this.workCMS.getIntervalLength(i)-1);
                  speeds[i].push(calcDeltaDE94(this.workCMS.getIntervalColor(i,this.workCMS.getIntervalLength(i)-1,this.workCMS.getInterpolationSpace()),this.workCMS.getLeftKeyColor(i+1,space))/dis);
                  //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                break;
                case "de2000":
                case "de2000-ds":
                  var dis = this.workCMS.getIntervalRef(i,0)-this.workCMS.getRefPosition(i);
                  speeds[i].push(calcDeltaCIEDE2000(this.workCMS.getRightKeyColor(i,space),this.workCMS.getIntervalColor(i,0,this.workCMS.getInterpolationSpace()))/dis);
                  //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  for (var j = 0; j < this.workCMS.getIntervalLength(i)-1; j++) {
                    dis = this.workCMS.getIntervalRef(i,j+1)-this.workCMS.getIntervalRef(i,j);
                    speeds[i].push(calcDeltaCIEDE2000(this.workCMS.getIntervalColor(i,j,this.workCMS.getInterpolationSpace()),this.workCMS.getIntervalColor(i,j+1,this.workCMS.getInterpolationSpace()))/dis);
                    //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                  }
                  dis=this.workCMS.getRefPosition(i+1)-this.workCMS.getIntervalRef(i,this.workCMS.getIntervalLength(i)-1);
                  speeds[i].push(calcDeltaCIEDE2000(this.workCMS.getIntervalColor(i,this.workCMS.getIntervalLength(i)-1,this.workCMS.getInterpolationSpace()),this.workCMS.getLeftKeyColor(i+1,space))/dis);
                  //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
                break;
                default:
                  return;
              }
            }
            else {
              var dis = this.workCMS.getRefPosition(i+1)-this.workCMS.getRefPosition(i);
              switch (this.workCMS.getInterpolationSpace()) {
                case "rgb":
                case "hsv":
                case "lab":
                case "din99":
                  speeds[i].push(calc3DEuclideanDistance(this.workCMS.getRightKeyColor(i,space),this.workCMS.getLeftKeyColor(i+1,space))/dis);
                break;
                case "de94":
                case "de94-ds":
                  speeds[i].push(calcDeltaDE94(this.workCMS.getRightKeyColor(i,space),this.workCMS.getLeftKeyColor(i+1,space))/dis);
                break;
                case "de2000":
                case "de2000-ds":
                  speeds[i].push(calcDeltaCIEDE2000(this.workCMS.getRightKeyColor(i,space),this.workCMS.getLeftKeyColor(i+1,space))/dis);
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
      for (var i = 0; i < this.workCMS.getKeyLength()-1; i++) {

        if(speeds[i]==undefined) // = const band
          continue;

        var ratioBlockSum = 0 ;
        for (var j = 0; j < speeds[i].length; j++) {

          var c1 = undefined;
          var c2 = undefined;

          if(speeds[i].length==1){
            c1 = this.workCMS.getRightKeyColor(i,space);
            c2 = this.workCMS.getLeftKeyColor(i+1,space);
          }
          else {
            switch (j) {
              case 0:
                c1 = this.workCMS.getRightKeyColor(i,space);
                c2 = this.workCMS.getIntervalColor(i,j,this.workCMS.getInterpolationSpace());;
                break;
              case speeds[i].length-1:
                c1 = this.workCMS.getIntervalColor(i,j-1,this.workCMS.getInterpolationSpace());
                c2 = this.workCMS.getLeftKeyColor(i+1,space);
                break;
              default:
                c1 = this.workCMS.getIntervalColor(i,j-1,this.workCMS.getInterpolationSpace());
                c2 = this.workCMS.getIntervalColor(i,j,this.workCMS.getInterpolationSpace());
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

      document.getElementById(this.partDivID+"_InfoMin").innerHTML = "Local Speed Minimum".bold() +" = "+ min.toFixed(this.numDecimalPlaces);

      if(min==0)
        document.getElementById(this.partDivID+"_InfoMin").style.color = getComputedStyle(document.documentElement).getPropertyValue('--general-warning-color');
      else
        document.getElementById(this.partDivID+"_InfoMin").style.color = "var(--main-font-color)"; //getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

      document.getElementById(this.partDivID+"_InfoMax").innerHTML = "Local Speed Maximum".bold() +" = "+ max.toFixed(this.numDecimalPlaces);
      document.getElementById(this.partDivID+"_InfoAverage").innerHTML = "Local Speed Average".bold() +" = "+ average.toFixed(this.numDecimalPlaces);
      document.getElementById(this.partDivID+"_InfoDeviation").innerHTML = "Local Speed Deviation".bold() +" = "+ deviation.toFixed(this.numDecimalPlaces);

      this.workCMS.deleteReferences();

}
  //////////////////////////////////////////
  // Analysis Type (Interpolation Space) ///
  //////////////////////////////////////////

  //////////////////////////////////////////
  // Analysis Type (Interpolation Space) ///
  //////////////////////////////////////////

};
