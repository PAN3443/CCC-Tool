class class_Edit_Part_Analysis extends class_Edit_Part_Basis {

  constructor(divID,parentID) {
    super(divID,parentID);
    this.analysis_Height_VH=62;
    this.analysis_Width_VW=undefined;
    this.optionRowID=undefined;
    this.selectTypeID=undefined;
    this.workCMS = undefined;
    this.numDecimalPlaces = 5;
  }

  updatePart(){

    if(this.analysis_Width_VW==undefined)
      return;

    if(!super.updatePart())
      return;

      switch (document.getElementById(this.selectTypeID).options[document.getElementById(this.selectTypeID).selectedIndex].value) {
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
          this.calc_AnalysisPlot_GlobalSpeed();
        break;
        case "intOrder":
          this.calc_AnalysisPlot_IntOrder();
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
    switch (document.getElementById(this.selectTypeID).options[document.getElementById(this.selectTypeID).selectedIndex].value) {
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
        tmpSelect.style.width= "15vw";
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
        tmpInfoDiv.appendChild(this.createOptionColorDiff());
        document.getElementById(this.partDivID).appendChild(tmpInfoDiv);
        document.getElementById(this.partDivID).appendChild(this.createAnalysisCanvas(tmpWidth,this.analysis_Height_VH, this.partDivID+"_LocSpeedCanvas"));
      break;
      case "globSpeed":
        document.getElementById(this.partDivID).style.flexDirection="row";
        var tmpWidth = (this.analysis_Width_VW/2)-3;
        var tmpInfoDiv = this.creatInfoDiv(tmpWidth,this.analysis_Height_VH);

        tmpInfoDiv.appendChild(this.createOptionColorDiff());

        var tmpP = document.createElement('h2');
        tmpP.innerHTML = "Color Options:";
        tmpInfoDiv.appendChild(tmpP);

        var tmpRow = document.createElement('div');
        tmpP = document.createElement('p');
        tmpP.innerHTML = "Continuous Section:";
        tmpRow.appendChild(tmpP);

        var tmpSelect = document.createElement('select');
        tmpSelect.id= this.partDivID+"_KeySetSelection";
        tmpSelect.style.width= "18vw";
        tmpSelect.style.maxWidth= "18vw";
        tmpSelect.onchange = function(){
          if(editSection.isSectionOpen())
            editSection.part_Analysis.updatePart();

          if(optiSection.isSectionOpen())
            optiSection.part_Analysis.updatePart();
        };
        tmpRow.appendChild(tmpSelect);
        tmpInfoDiv.appendChild(tmpRow);

        tmpInfoDiv.appendChild(this.createOptionUseColors());

        document.getElementById(this.partDivID).appendChild(tmpInfoDiv);
        document.getElementById(this.partDivID).appendChild(this.createAnalysisCanvas(tmpWidth,this.analysis_Height_VH, this.partDivID+"_GlobSpeedCanvas"));
      break;
      case "intOrder":
        document.getElementById(this.partDivID).style.flexDirection="row";
        var tmpWidth = (this.analysis_Width_VW/2)-3;
        var tmpInfoDiv = this.creatInfoDiv(tmpWidth,this.analysis_Height_VH);
        var tmpP = document.createElement('h2');
        tmpP.style.marginTop = "auto";
        tmpP.innerHTML = "Color Options:";
        tmpInfoDiv.appendChild(tmpP);
        tmpInfoDiv.appendChild(this.createOptionUseColors());
        document.getElementById(this.partDivID).appendChild(tmpInfoDiv);
        document.getElementById(this.partDivID+"_InfoMax").id = this.partDivID+"_InfoGlobalMin";
        document.getElementById(this.partDivID+"_InfoMin").id = this.partDivID+"_InfoLocalMin";
        document.getElementById(this.partDivID+"_InfoAverage").remove();
        document.getElementById(this.partDivID+"_InfoDeviation").remove();
        //document.getElementById(this.partDivID+"_UsedColors").options[1].disabled = true;
        //document.getElementById(this.partDivID+"_UsedColors").options[2].disabled = true;
        document.getElementById(this.partDivID+"_NumIntervals").value = 5;
        document.getElementById(this.partDivID+"_NumIntervals").maxValue = 10;


        var tmpDiv= document.createElement('div');
        tmpDiv.style.margin="auto";
        var tmpP = document.createElement('p');
        tmpP.innerHTML = "Local Order";
        tmpDiv.appendChild(tmpP);

        tmpDiv.appendChild(this.createAnalysisCanvas(tmpWidth,this.analysis_Height_VH-8, this.partDivID+"_IntOrderCanvas"));

        tmpP = document.createElement('p');
        tmpP.innerHTML = "Global Order";
        tmpDiv.appendChild(tmpP);
        document.getElementById(this.partDivID).appendChild(tmpDiv);
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
    tmpCanvas.style.background="url(../../img/EditPage/plotBackground.png)";
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

  createOptionUseColors(){
    var tmpDiv = document.createElement('div');
    tmpDiv.style.marginBottom = "auto";

    var tmpRow = document.createElement('div');
    var tmpP = document.createElement('p');
    tmpP.style.margin = "auto";
    tmpP.style.marginLeft = "0vw";
    tmpP.innerHTML = "Use Colors:";
    tmpRow.appendChild(tmpP);

    var tmpSelect = document.createElement('select');
    tmpSelect.id= this.partDivID+"_UsedColors";
    tmpSelect.style.width= "18vw";
    tmpSelect.style.maxWidth= "18vw";
    tmpSelect.onchange = function(){
      if(editSection.isSectionOpen())
        editSection.part_Analysis.updatePart();

      if(optiSection.isSectionOpen())
        optiSection.part_Analysis.updatePart();
    };
    var tmpOnlyKeysOption = document.createElement('option');
    tmpOnlyKeysOption.innerHTML = "Only Key Colors";
    tmpOnlyKeysOption.value = "keys";
    tmpSelect.appendChild(tmpOnlyKeysOption);
    /*var tmpDeltaSamplingOption = document.createElement('option');
    tmpDeltaSamplingOption.innerHTML = "Key Colors + Delta Sampling";
    tmpDeltaSamplingOption.value = "ds";
    tmpSelect.appendChild(tmpDeltaSamplingOption);*/
    tmpRow.appendChild(tmpSelect);
    tmpDiv.appendChild(tmpRow);
    var tmpIntervalOption = document.createElement('option');
    tmpIntervalOption.innerHTML = "Key Colors + Interval Colors";
    tmpIntervalOption.value = "interval";
    tmpSelect.appendChild(tmpIntervalOption);
    tmpRow.appendChild(tmpSelect);
    tmpDiv.appendChild(tmpRow);

    var tmpRow = document.createElement('div');
    tmpRow.id= this.partDivID+"_IntervalDiv";
    tmpP = document.createElement('p');
    tmpP.innerHTML = "#Intervals:";
    tmpRow.appendChild(tmpP);

    var tmpInput = document.createElement('input');
    tmpInput.type = "number";
    tmpInput.id= this.partDivID+"_NumIntervals";
    tmpInput.value = 20;
    tmpInput.style.width= "18vw";
    tmpInput.style.maxWidth= "18vw";
    tmpInput.onchange = function(){
      if(editSection.isSectionOpen())
        editSection.part_Analysis.updatePart();

      if(optiSection.isSectionOpen())
        optiSection.part_Analysis.updatePart();
    };
    tmpRow.appendChild(tmpInput);
    tmpDiv.appendChild(tmpRow);

    return tmpDiv;
  }

  creatInfoDiv(tmpWidth, tmpHeight){
    var tmpDiv = document.createElement('div');
    tmpDiv.style.width= tmpWidth+"vw";
    tmpDiv.style.height= tmpHeight+"vh";
    tmpDiv.style.display="flex";
    tmpDiv.style.flexDirection="column";
    tmpDiv.style.paddingTop = "1vh";
    tmpDiv.style.paddingBottom = "1vh";
    tmpDiv.style.paddingLeft = "1vw";
    tmpDiv.style.paddingRight = "1vw";
    //tmpDiv.style.background = "var(--main-sepArea-bg)";

    var tmpP = document.createElement('h2');
    tmpP.style.marginTop = "auto";
    tmpP.innerHTML = "Statistic:";
    tmpDiv.appendChild(tmpP);

    tmpP = document.createElement('p');
    tmpP.id=this.partDivID+"_InfoMax";
    tmpP.innerHTML = "Max:";
    tmpP.style.height = "var(--line-height-normal)";
    tmpDiv.appendChild(tmpP);

    tmpP = document.createElement('p');
    tmpP.id=this.partDivID+"_InfoMin";
    tmpP.innerHTML = "Min:";
    tmpP.style.height = "var(--line-height-normal)";
    tmpDiv.appendChild(tmpP);

    tmpP = document.createElement('p');
    tmpP.id=this.partDivID+"_InfoAverage";
    tmpP.innerHTML = "Average:";
    tmpP.style.height = "var(--line-height-normal)";
    tmpDiv.appendChild(tmpP);

    tmpP = document.createElement('p');
    tmpP.id=this.partDivID+"_InfoDeviation";
    tmpP.style.marginBottom = "auto";
    tmpP.innerHTML = "Deviation:";
    tmpP.style.height = "var(--line-height-normal)";
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
      tmpLabel.style.fontFamily = "var(--font-family-SpecialText)";
      tmpLabel.style.width="20%";
      tmpLabel.style.color="var(--main-font-color)";
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

  createOptionColorDiff(){
    var tmpDiv = document.createElement('div');
    tmpDiv.style.marginBottom = "auto";
    var tmpP = document.createElement('h2');
    tmpP.innerHTML = "Metric Options:";
    tmpDiv.appendChild(tmpP);

    var tmpRow = document.createElement('div');
    tmpP = document.createElement('p');
    tmpP.innerHTML = "Use Color Difference:";
    tmpRow.appendChild(tmpP);


    var tmpSelect = document.createElement('select');
    tmpSelect.id= this.partDivID+"_UseMetric";
    tmpSelect.style.width= "18vw";
    tmpSelect.style.maxWidth= "18vw";
    tmpSelect.onchange = function(){
      if(editSection.isSectionOpen())
        editSection.part_Analysis.updatePart();

      if(optiSection.isSectionOpen())
        optiSection.part_Analysis.updatePart();
    };
    var tmpLabOption = document.createElement('option');
    tmpLabOption.innerHTML = "Euclidean Distance (Lab)";
    tmpLabOption.value = "lab";
    tmpSelect.appendChild(tmpLabOption);

    var tmpDe94Option = document.createElement('option');
    tmpDe94Option.innerHTML = "Metric de94 (Lab)";
    tmpDe94Option.value = "de94";
    tmpSelect.appendChild(tmpDe94Option);

    var tmpDe2000Option = document.createElement('option');
    tmpDe2000Option.innerHTML = "Metric CIEDE2000 (Lab)";
    tmpDe2000Option.value = "de2000";
    tmpSelect.appendChild(tmpDe2000Option);

    var tmpDIN99Option = document.createElement('option');
    tmpDIN99Option.innerHTML = "Euclidean Distance (DIN99)";
    tmpDIN99Option.value = "din99";
    tmpSelect.appendChild(tmpDIN99Option);
    tmpRow.appendChild(tmpSelect);
    tmpDiv.appendChild(tmpRow);

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
      canvasPlot.width = 1500;
      canvasPlot.height = 1500;
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

        var tmpID = document.getElementById(this.partDivID+"_UseMetric").selectedIndex;
        var useMetric = document.getElementById(this.partDivID+"_UseMetric").options[tmpID].value;

        for (var i = 0; i < this.workCMS.getKeyLength()-1; i++) {

          if(this.workCMS.getKeyType(i)==="nil key" || this.workCMS.getKeyType(i)==="left key"){
            speeds.push(undefined);
          }
          else {

            speeds.push([]);

            //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));

            if(/*((this.workCMS.getInterpolationType()==="linear" &&
               this.workCMS.getInterpolationSpace()!="rgb" &&  // distance of intervals is the same like the distance of start and end color
               this.workCMS.getInterpolationSpace()!="hsv" &&
               this.workCMS.getInterpolationSpace()!="lab" &&
               this.workCMS.getInterpolationSpace()!="din99") || this.workCMS.getInterpolationType()==="spline") &&*/
               this.workCMS.getIntervalLength(i)>0){

            switch (useMetric) {
              case "lab":
              case "din99":
              var dis = this.workCMS.getIntervalRef(i,0)-this.workCMS.getRefPosition(i);
              speeds[i].push(calc3DEuclideanDistance(this.workCMS.getRightKeyColor(i,useMetric),this.workCMS.getIntervalColor(i,0,useMetric))/dis);
              //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
              for (var j = 0; j < this.workCMS.getIntervalLength(i)-1; j++) {
                dis = this.workCMS.getIntervalRef(i,j+1)-this.workCMS.getIntervalRef(i,j);
                speeds[i].push(calc3DEuclideanDistance(this.workCMS.getIntervalColor(i,j,useMetric),this.workCMS.getIntervalColor(i,j+1,useMetric))/dis);
                //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
              }
              dis=this.workCMS.getRefPosition(i+1)-this.workCMS.getIntervalRef(i,this.workCMS.getIntervalLength(i)-1);
              speeds[i].push(calc3DEuclideanDistance(this.workCMS.getIntervalColor(i,this.workCMS.getIntervalLength(i)-1,useMetric),this.workCMS.getLeftKeyColor(i+1,useMetric))/dis);
              break;
              case "de94":
              var dis = this.workCMS.getIntervalRef(i,0)-this.workCMS.getRefPosition(i);
              speeds[i].push(calcDeltaDE94(this.workCMS.getRightKeyColor(i,"lab"),this.workCMS.getIntervalColor(i,0,"lab"))/dis);
              //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
              for (var j = 0; j < this.workCMS.getIntervalLength(i)-1; j++) {
                dis = this.workCMS.getIntervalRef(i,j+1)-this.workCMS.getIntervalRef(i,j);
                speeds[i].push(calcDeltaDE94(this.workCMS.getIntervalColor(i,j,"lab"),this.workCMS.getIntervalColor(i,j+1,"lab"))/dis);
                //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
              }
              dis=this.workCMS.getRefPosition(i+1)-this.workCMS.getIntervalRef(i,this.workCMS.getIntervalLength(i)-1);
              speeds[i].push(calcDeltaDE94(this.workCMS.getIntervalColor(i,this.workCMS.getIntervalLength(i)-1,"lab"),this.workCMS.getLeftKeyColor(i+1,"lab"))/dis);
              break;
              case "de2000":
              var dis = this.workCMS.getIntervalRef(i,0)-this.workCMS.getRefPosition(i);
              speeds[i].push(calcDeltaCIEDE2000(this.workCMS.getRightKeyColor(i,"lab"),this.workCMS.getIntervalColor(i,0,"lab"))/dis);
              //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
              for (var j = 0; j < this.workCMS.getIntervalLength(i)-1; j++) {
                dis = this.workCMS.getIntervalRef(i,j+1)-this.workCMS.getIntervalRef(i,j);
                speeds[i].push(calcDeltaCIEDE2000(this.workCMS.getIntervalColor(i,j,"lab"),this.workCMS.getIntervalColor(i,j+1,"lab"))/dis);
                //blackWhiteMaxSpeed = Math.max(blackWhiteMaxSpeed,(blackWhiteDelta/dis));
              }
              dis=this.workCMS.getRefPosition(i+1)-this.workCMS.getIntervalRef(i,this.workCMS.getIntervalLength(i)-1);
              speeds[i].push(calcDeltaCIEDE2000(this.workCMS.getIntervalColor(i,this.workCMS.getIntervalLength(i)-1,"lab"),this.workCMS.getLeftKeyColor(i+1,"lab"))/dis);
              break;
              default:
                return;
            }
          }
          else {
            var dis = this.workCMS.getRefPosition(i+1)-this.workCMS.getRefPosition(i);
            switch (useMetric) {
            case "lab":
            case "din99":
              speeds[i].push(calc3DEuclideanDistance(this.workCMS.getRightKeyColor(i,useMetric),this.workCMS.getLeftKeyColor(i+1,useMetric))/dis);
            break;
            case "de94":
              speeds[i].push(calcDeltaDE94(this.workCMS.getRightKeyColor(i,"lab"),this.workCMS.getLeftKeyColor(i+1,"lab"))/dis);
            break;
            case "de2000":
              speeds[i].push(calcDeltaCIEDE2000(this.workCMS.getRightKeyColor(i,"lab"),this.workCMS.getLeftKeyColor(i+1,"lab"))/dis);
            break;
            default:
              return;
            }
          }



            /*if(((this.workCMS.getInterpolationType()==="linear" &&
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
            }*/

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

      document.getElementById(this.partDivID+"_InfoMin").innerHTML = "Minimum = "+ min.toFixed(this.numDecimalPlaces);
      document.getElementById(this.partDivID+"_InfoMin").title = "Minimum = "+ min;

      if(min==0)
        document.getElementById(this.partDivID+"_InfoMin").style.color = getComputedStyle(document.documentElement).getPropertyValue('--general-warning-color');
      else
        document.getElementById(this.partDivID+"_InfoMin").style.color = "var(--main-font-color)"; //getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

      document.getElementById(this.partDivID+"_InfoMax").innerHTML = "Maximum = "+ max.toFixed(this.numDecimalPlaces);
      document.getElementById(this.partDivID+"_InfoMax").title = "Maximum = "+ max;
      document.getElementById(this.partDivID+"_InfoAverage").innerHTML = "Average = "+ average.toFixed(this.numDecimalPlaces);
      document.getElementById(this.partDivID+"_InfoAverage").title = "Average = "+ average;
      document.getElementById(this.partDivID+"_InfoDeviation").innerHTML = "Deviation = "+ deviation.toFixed(this.numDecimalPlaces);
      document.getElementById(this.partDivID+"_InfoDeviation").title = "Deviation = "+ deviation;

      this.workCMS.deleteReferences();

}
  //////////////////////////////////////////
  // Analysis Type (Global Speed) ///
  //////////////////////////////////////////

  calc_AnalysisPlot_GlobalSpeed(){
      var canvasPlot = document.getElementById(this.partDivID+"_GlobSpeedCanvas");
      var context = canvasPlot.getContext('2d');
      context.clearRect(0, 0, canvasPlot.width, canvasPlot.height);

      this.workCMS = this.getParentCMS();
      var continuousSections = this.workCMS.searchForContinuousSections(0,this.workCMS.getKeyLength()-1);
      // fill continious
      var tmpID = document.getElementById(this.partDivID+"_UseMetric").selectedIndex;
      var useMetric = document.getElementById(this.partDivID+"_UseMetric").options[tmpID].value;
      var neededSpace = "lab";

      if(useMetric==="din99")
        neededSpace = "din99";

      var selectbox = document.getElementById(this.partDivID+"_KeySetSelection");
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
      var selectedIndex = document.getElementById(this.partDivID+"_KeySetSelection").selectedIndex;

      var sumForAverage = 0;

      var colorArray = [];
      var refArray = [];

      // fill arrays with key and interval information
      var tmpIndex = document.getElementById(this.partDivID+"_UsedColors").selectedIndex;
      document.getElementById(this.partDivID+"_IntervalDiv").style.visibility="hidden";
      switch (document.getElementById(this.partDivID+"_UsedColors").options[tmpIndex].value) {
        case "keys":
          for (var i = continuousSections[selectedIndex][0]; i < continuousSections[selectedIndex][1]; i++) {
              colorArray.push(this.workCMS.getRightKeyColor(i,neededSpace));
              refArray.push(this.workCMS.getRefPosition(i));
          }
        break;
        case "ds":
          this.workCMS.calcDeltaIntervalColors();
          for (var i = continuousSections[selectedIndex][0]; i < continuousSections[selectedIndex][1]; i++) {
              colorArray.push(this.workCMS.getRightKeyColor(i,neededSpace));
              refArray.push(this.workCMS.getRefPosition(i));
              for (var j = 0; j < this.workCMS.getIntervalLength(i)-1; j++) {
                colorArray.push(this.workCMS.getIntervalColor(i,j,neededSpace));
                refArray.push(this.workCMS.getIntervalRef(i,j));
              }
          }
        break;
        case "interval":
          document.getElementById(this.partDivID+"_IntervalDiv").style.visibility="visible";
          var numIntervals = parseInt(document.getElementById(this.partDivID+"_NumIntervals").value);

          if(isNaN(numIntervals)){
            openAlert("The input for the number of interval colors at the analysis is invalid. Please enter a number!");
            return;
          }

          if(numIntervals<2){
            openAlert("The input for the number of interval colors at the analysis is invalid. Please enter a number greater than 1!");
            return;
          }

          var numList = [];
          for (var i = 0; i < continuousSections[selectedIndex][0]; i++) {
            numList.push(0);
          }
          for (var i = continuousSections[selectedIndex][0]; i < continuousSections[selectedIndex][1]; i++) {
            numList.push(numIntervals);
          }
          for (var i = continuousSections[selectedIndex][1]; i < this.workCMS.getKeyLength()-1; i++) {
            numList.push(0);
          }
          this.workCMS.calcSpecificKeyIntervalColors(numList);
          for (var i = continuousSections[selectedIndex][0]; i < continuousSections[selectedIndex][1]; i++) {
              colorArray.push(this.workCMS.getRightKeyColor(i,neededSpace));
              refArray.push(this.workCMS.getRefPosition(i));
              for (var j = 0; j < this.workCMS.getIntervalLength(i)-1; j++) {
                colorArray.push(this.workCMS.getIntervalColor(i,j,neededSpace));
                refArray.push(this.workCMS.getIntervalRef(i,j));
              }
          }
        break;
        default:
          return;
      }

      colorArray.push(this.workCMS.getLeftKeyColor(continuousSections[selectedIndex][1],neededSpace));
      refArray.push(this.workCMS.getRefPosition(continuousSections[selectedIndex][1]));

      var min = Infinity;
      var max = -Infinity;
      var numTwinOrLeft=0;

        var matrix = [];

        for(var x=0; x<colorArray.length; x++){

          var column = [];
          for(var y=0; y<colorArray.length; y++){

              var deltaE=0;
              var speed=0;
              if(x!=y){

                switch (useMetric) {
                    case "lab":
                    case "din99":
                     deltaE = calc3DEuclideanDistance(cloneColor(colorArray[x]),cloneColor(colorArray[y]));
                      break;
                      case "de94":
                       deltaE = calcDeltaDE94(cloneColor(colorArray[x]),cloneColor(colorArray[y]));
                        break;
                        case "de2000":
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
                        val = 1-(speed-min)/maxColorDif; //(speed/maxColorDif);//
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


      document.getElementById(this.partDivID+"_InfoMin").innerHTML = "Minimum = "+ min.toFixed(this.numDecimalPlaces);
      document.getElementById(this.partDivID+"_InfoMin").title = "Minimum = "+ min;

      if(min==0)
      document.getElementById(this.partDivID+"_InfoMin").style.color = getComputedStyle(document.documentElement).getPropertyValue('--general-warning-color');
      else
      document.getElementById(this.partDivID+"_InfoMin").style.color = "var(--main-font-color)"; //getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

      document.getElementById(this.partDivID+"_InfoMax").innerHTML = "Maximum = "+ max.toFixed(this.numDecimalPlaces);
      document.getElementById(this.partDivID+"_InfoMax").title = "Maximum = "+ max;
      document.getElementById(this.partDivID+"_InfoAverage").innerHTML = "Average = "+ average.toFixed(this.numDecimalPlaces);
      document.getElementById(this.partDivID+"_InfoAverage").title = "Average = "+ average;
      document.getElementById(this.partDivID+"_InfoDeviation").innerHTML = "Deviation = "+ deviation.toFixed(this.numDecimalPlaces);
      document.getElementById(this.partDivID+"_InfoDeviation").title = "Deviation = "+ deviation;

      for (var i = colorArray.length-1; i >=0; i--){
        colorArray[i].deleteReferences();
        colorArray[i]=null;
      }

      this.workCMS.deleteReferences();


}
  //////////////////////////////////////////
  // Analysis Type (Intrinsic Order) ///
  //////////////////////////////////////////
  calc_AnalysisPlot_IntOrder() {

  var canvasPlot = document.getElementById(this.partDivID+"_IntOrderCanvas");

  canvasPlot.width = 1500;
  canvasPlot.height = 1500;

  var canvasCtx = canvasPlot.getContext("2d");
  canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);

  canvasCtx.mozImageSmoothingEnabled = false;
  canvasCtx.webkitImageSmoothingEnabled = false;
  canvasCtx.msImageSmoothingEnabled = false;
  canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
  canvasCtx.oImageSmoothingEnabled = false;

  ///////////////////////////////////////////////////////////////
  ///// init order plot
  //////////////////////////////////////////////////////////////

  var colormapbarwidth = canvasPlot.width * 0.9;
  var colormapXStart = (canvasPlot.width - colormapbarwidth) / 2;
  var plotHeight = canvasPlot.height * 0.9;
  var plotyStart = (canvasPlot.height - plotHeight) / 2;

  var arrowHeight = canvasPlot.height * 0.05;
  var arrowWidth = canvasPlot.width * 0.025;
  var labelFontSize = canvasPlot.height * 0.04;
  var labelYStart = (((canvasPlot.height - plotHeight) / 2) - (arrowHeight / 2) - labelFontSize) / 2 + labelFontSize;

  var arrowPlotHeight = (plotHeight * 0.95) / 2;
  var colormapHeight = plotHeight * 0.05;
  var colormapYStart = plotyStart + (plotHeight / 2) - (colormapHeight / 2);
  var colormapYEnd = colormapYStart + colormapHeight;

  // colormap interval rect

  //////////////////////////////////////////////////////////////////////
  //// Arrow 1
  canvasCtx.strokeStyle = "rgb(0,0,0)"; //"rgb(255,127,80)";
  canvasCtx.beginPath();
  canvasCtx.lineWidth = 10;
  canvasCtx.moveTo(colormapXStart, colormapYStart);
  canvasCtx.lineTo(colormapXStart, plotyStart);
  canvasCtx.stroke();

  // the triangle
  canvasCtx.beginPath();
  canvasCtx.moveTo(colormapXStart - arrowWidth, plotyStart);
  canvasCtx.lineTo(colormapXStart, plotyStart - arrowHeight);
  canvasCtx.lineTo(colormapXStart + arrowWidth, plotyStart);
  canvasCtx.closePath();

  // the fill color
  canvasCtx.fillStyle = "rgb(0,0,0)"; //"rgb(255,127,80)";
  canvasCtx.fill();

  /*canvasCtx.font = labelFontSize+"px Arial";
  canvasCtx.fillText("|local Order|",colormapXStart+arrowWidth,labelYStart);
  var width = canvasCtx.measureText("|local Order|").width;
  var height = canvasCtx.measureText("|local Order|").height;
  canvasCtx.fillStyle = "rgb(1,1,1)";
  canvasCtx.fillRect(colormapXStart+arrowWidth,labelYStart, width, height);*/
  //////////////////////////////////////////////////////////////////////
  //// Arrow 2
  canvasCtx.strokeStyle = "rgb(0,0,0)"; //"rgb(30,144,255)";
  canvasCtx.beginPath();
  canvasCtx.lineWidth = 10;
  canvasCtx.moveTo(colormapXStart, colormapYEnd);
  canvasCtx.lineTo(colormapXStart, plotyStart + plotHeight);
  canvasCtx.stroke();

  // the triangle
  canvasCtx.beginPath();
  canvasCtx.moveTo(colormapXStart - arrowWidth, plotyStart + plotHeight);
  canvasCtx.lineTo(colormapXStart, plotyStart + plotHeight + arrowHeight);
  canvasCtx.lineTo(colormapXStart + arrowWidth, plotyStart + plotHeight);
  canvasCtx.closePath();

  // the fill color
  canvasCtx.fillStyle = "rgb(0,0,0)"; //"rgb(30,144,255)";
  canvasCtx.fill();

  /*canvasCtx.font = labelFontSize+"px Arial";
  canvasCtx.fillText("negative global Order",colormapXStart+arrowWidth,canvasPlot.height-labelYStart);
  var width = canvasCtx.measureText("negative global Order").width;
  var height = canvasCtx.measureText("negative global Order").height;
  canvasCtx.fillStyle = "rgb(1,1,1)";
  canvasCtx.fillRect(colormapXStart+arrowWidth,canvasPlot.height-labelYStart, width, height);*/

  //////////////////////////////////////////////////////////// draw refLineSketchContainer
  canvasCtx.lineWidth = 1;

  //////////////////////////////////////////////////////////////////////
  //// get colors
  this.workCMS = this.getParentCMS();
  var colorArray = [];
  var tmpIndex = document.getElementById(this.partDivID+"_UsedColors").selectedIndex;
  document.getElementById(this.partDivID+"_IntervalDiv").style.visibility="hidden";
  switch (document.getElementById(this.partDivID+"_UsedColors").options[tmpIndex].value) {
    case "keys":
    for (var i = 0; i < this.workCMS.getKeyLength(); i++) {
      switch (this.workCMS.getKeyType(i)) {
        case "nil key":
          continue;
          break;
        case "left key":
          colorArray.push(this.workCMS.getLeftKeyColor(i, this.workCMS.getInterpolationSpace()));
          break;
        case "twin key":
          colorArray.push(this.workCMS.getLeftKeyColor(i, this.workCMS.getInterpolationSpace()));
          colorArray.push(this.workCMS.getRightKeyColor(i, this.workCMS.getInterpolationSpace()));
          break;
        case "right key":
          colorArray.push(this.workCMS.getRightKeyColor(i, this.workCMS.getInterpolationSpace()));
          break;
        default:
          colorArray.push(this.workCMS.getRightKeyColor(i, this.workCMS.getInterpolationSpace()));
      }
    }
    break;
    case "ds":
    for (var i = 0; i < this.workCMS.getKeyLength(); i++) {
      switch (this.workCMS.getKeyType(i)) {
        case "nil key":
          continue;
          break;
        case "left key":
          colorArray.push(this.workCMS.getLeftKeyColor(i, this.workCMS.getInterpolationSpace()));
          break;
        case "twin key":
          colorArray.push(this.workCMS.getLeftKeyColor(i, this.workCMS.getInterpolationSpace()));
          colorArray.push(this.workCMS.getRightKeyColor(i, this.workCMS.getInterpolationSpace()));
          for (var j = 0; j < this.workCMS.getIntervalLength(i) - 1; j++) {
            colorArray.push(this.workCMS.getIntervalColor(i, j, this.workCMS.getInterpolationSpace()));
          }
          break;
        case "right key":
          colorArray.push(this.workCMS.getRightKeyColor(i, this.workCMS.getInterpolationSpace()));
          for (var j = 0; j < this.workCMS.getIntervalLength(i) - 1; j++) {
            colorArray.push(this.workCMS.getIntervalColor(i, j, this.workCMS.getInterpolationSpace()));
          }
          break;
        default:
          colorArray.push(this.workCMS.getRightKeyColor(i, this.workCMS.getInterpolationSpace()));
          for (var j = 0; j < this.workCMS.getIntervalLength(i) - 1; j++) {
            colorArray.push(this.workCMS.getIntervalColor(i, j, this.workCMS.getInterpolationSpace()));
          }
      }
    }
    break;
    case "interval":
      document.getElementById(this.partDivID+"_IntervalDiv").style.visibility="visible";
      var numIntervals = parseInt(document.getElementById(this.partDivID+"_NumIntervals").value);

      if(isNaN(numIntervals)){
        openAlert("The input for the number of interval colors at the analysis is invalid. Please enter a number!");
        return;
      }

      if(numIntervals<2){
        openAlert("The input for the number of interval colors at the analysis is invalid. Please enter a number greater than 1!");
        return;
      }

      var numList = [];
      for (var i = 0; i < this.workCMS.getKeyLength()-1; i++) {
        numList.push(numIntervals);
      }
      this.workCMS.calcSpecificKeyIntervalColors(numList);

      for (var i = 0; i < this.workCMS.getKeyLength(); i++) {
        switch (this.workCMS.getKeyType(i)) {
          case "nil key":
            continue;
            break;
          case "left key":
            colorArray.push(this.workCMS.getLeftKeyColor(i, this.workCMS.getInterpolationSpace()));
            break;
          case "twin key":
            colorArray.push(this.workCMS.getLeftKeyColor(i, this.workCMS.getInterpolationSpace()));
            colorArray.push(this.workCMS.getRightKeyColor(i, this.workCMS.getInterpolationSpace()));
            for (var j = 0; j < this.workCMS.getIntervalLength(i) - 1; j++) {
              colorArray.push(this.workCMS.getIntervalColor(i, j, this.workCMS.getInterpolationSpace()));
            }
            break;
          case "right key":
            colorArray.push(this.workCMS.getRightKeyColor(i, this.workCMS.getInterpolationSpace()));
            for (var j = 0; j < this.workCMS.getIntervalLength(i) - 1; j++) {
              colorArray.push(this.workCMS.getIntervalColor(i, j, this.workCMS.getInterpolationSpace()));
            }
            break;
          default:
            colorArray.push(this.workCMS.getRightKeyColor(i, this.workCMS.getInterpolationSpace()));
            for (var j = 0; j < this.workCMS.getIntervalLength(i) - 1; j++) {
              colorArray.push(this.workCMS.getIntervalColor(i, j, this.workCMS.getInterpolationSpace()));
            }
        }
      }
    break;
    default:
      return;
  }


  //////////////////////////////////////////////////////////////////////
  //// Draw intervals


  var currentXPos = colormapXStart;
  var bandWidth = colormapbarwidth / (colorArray.length);

  for (var i = 0; i < colorArray.length; i++) {
    canvasCtx.fillStyle = colorArray[i].getRGBString();
    canvasCtx.fillRect(currentXPos, colormapYStart, bandWidth, colormapHeight);
    /*canvasCtx.strokeStyle = "rgb(0,0,0)";
    canvasCtx.rect(currentXPos,colormapYStart,bandWidth,colormapHeight);
    canvasCtx.stroke();*/
    currentXPos += bandWidth;
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

  for (var i = 1; i < colorArray.length - 1; i++) {

    var orderValues = getOrderValues(cloneColor(colorArray[i-1]), cloneColor(colorArray[i]), cloneColor(colorArray[i+1]), this.workCMS.getInterpolationSpace());
    var orderVal = Math.min(orderValues[3], orderValues[4]);

    maxLocal = Math.max(maxLocal, orderVal);
    minLocal = Math.min(minLocal, orderVal);

    localOrder.push(orderVal);
  }

  // draw
  currentXPos = colormapXStart + bandWidth;

  if (minLocal < 0)
    maxLocal = Math.max(maxLocal, minLocal * -1);

  for (var y = 0; y < localOrder.length; y++) {

    var colorRef = undefined;

    var tmpVal = localOrder[y];
    if (tmpVal < 0) {
      tmpVal *= -1;
      colorRef = new class_Color_RGB(1, 0, 0);
    } else {
      colorRef = new class_Color_RGB(0, 0, 1);
    }

    var deltaHeight = arrowPlotHeight * (tmpVal / maxLocal);
    var yPos = colormapYStart - deltaHeight;

    canvasCtx.fillStyle = colorRef.getRGBString();
    canvasCtx.fillRect(currentXPos, yPos, bandWidth, deltaHeight);

    colorRef.deleteReferences();
    colorRef = null;

    currentXPos += bandWidth;

  }


  ///////////////////////////////////////////////////////////////
  ///// Global Order
  //////////////////////////////////////////////////////////////

  var arrayk0 = [];
  var t1, t2, t3;

  var minGlobal = 1; // Infinity is not needed, because min is only intressting if it is negative
  for (var k0 = 0; k0 < colorArray.length - 2; k0++) {

    var deltaE_K0_K2 = 0;
    var deltaE_K1_K2 = 0;
    var deltaE_K0_K1 = 0;

    //var arrayk2 = [-1,-1,-1,-1];

    for (var k2 = k0 + 2; k2 < colorArray.length; k2++) {

      var arrayk2 = [0, -1, -1, -1];

      for (var k1 = k0 + 1; k1 < k2; k1++) {

        var orderValues = getOrderValues(cloneColor(colorArray[k0]), cloneColor(colorArray[k1]), cloneColor(colorArray[k2]), this.workCMS.getInterpolationSpace());
        var orderVal = Math.min(orderValues[3], orderValues[4]);

        minGlobal = Math.min(minGlobal, orderVal);

        if (orderVal < 0) {
          /*arrayk2[0] = orderVal;
          arrayk2[1] = k0;
          arrayk2[2] = k1;
          arrayk2[3] = k2;*/
          //
          arrayk0.push([orderVal,k0,k1,k2]);
        }
      }
      //if (arrayk2[3] != -1)
        //arrayk0.push(arrayk2);
    }
  }



  var dodraw = true;

  if (minGlobal >= 0)
    dodraw = false;

  if (dodraw) {

    // sort
    arrayk0 = quickSort(arrayk0);

    // draw

    for (var i = 0; i < arrayk0.length; i++) {

      var xPosK0 = colormapXStart + arrayk0[i][1] * bandWidth + (bandWidth / 2);
      var xPosK2 = colormapXStart + arrayk0[i][3] * bandWidth + (bandWidth / 2);
      var xPosK1 = colormapXStart + arrayk0[i][2] * bandWidth + (bandWidth / 2);

      var deltaHeight = (arrowPlotHeight * (arrayk0[i][0] / minGlobal) * 2);

      var yPosK1 = colormapYEnd + deltaHeight;

      //canvasCtx.globalAlpha=1.0+(-0.8*(tmpMin/maxNegMin));
      canvasCtx.strokeStyle = colorArray[arrayk0[i][2]].getRGBString(); //"rgb(0,0,0)";
      canvasCtx.beginPath();
      canvasCtx.lineWidth = 2;
      canvasCtx.beginPath();
      canvasCtx.moveTo(xPosK0, colormapYEnd);
      canvasCtx.quadraticCurveTo(xPosK1, yPosK1, xPosK2, colormapYEnd);
      canvasCtx.stroke();
    }

  }


  //////////////////////////////////////////////////////////////

  if (minLocal < 0)
    document.getElementById(this.partDivID+"_InfoLocalMin").style.color = "var(--general-warning-color)";//getComputedStyle(document.documentElement).getPropertyValue('--general-warning-color');
  else
    document.getElementById(this.partDivID+"_InfoLocalMin").style.color = "var(--main-font-color)";//getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

  if (minGlobal < 0)
    document.getElementById(this.partDivID+"_InfoGlobalMin").style.color = "var(--general-warning-color)";//getComputedStyle(document.documentElement).getPropertyValue('--general-warning-color');
  else
    document.getElementById(this.partDivID+"_InfoGlobalMin").style.color = "var(--main-font-color)";//getComputedStyle(document.documentElement).getPropertyValue('--main-sepArea-font-color');

  document.getElementById(this.partDivID+"_InfoLocalMin").innerHTML = "Local Minimum = " + minLocal.toFixed(this.numDecimalPlaces); //.toFixed(numDecimalPlaces);
  document.getElementById(this.partDivID+"_InfoLocalMin").title = "Local Minimum = " + minLocal;
  document.getElementById(this.partDivID+"_InfoGlobalMin").innerHTML = "Global Minimum = " + minGlobal.toFixed(this.numDecimalPlaces); //.toFixed(numDecimalPlaces);*/
  document.getElementById(this.partDivID+"_InfoGlobalMin").innerHTML = "Global Minimum = " + minGlobal;
  this.workCMS.deleteReferences();
}

};
