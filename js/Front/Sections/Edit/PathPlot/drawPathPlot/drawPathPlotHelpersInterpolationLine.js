
function calcRGBInterpolationLine(){
  pathplotLines=[];
  pathplotLinesDashed=[];

  var areaDim = pathPlotResolution * 0.7;

  globalCMS1.calcDeltaIntervalColors(intervalDelta, 0,globalCMS1.getKeyLength()-1);
  for (var i = 0; i < globalCMS1.getKeyLength()-1; i++) {

    switch (globalCMS1.getKeyType(i)) {
      case "nil key":

      break;
      case "twin key":
        var intervalIndexA = globalCMS1.getIntervalPositions(i);
        pathplotLinesDashed.push(getRGBLineSegment(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getRightKeyColor(i,"rgb"),areaDim));
          for(var j=intervalIndexA[0]; j<intervalIndexA[1]; j++){
            pathplotLines.push(getRGBLineSegment(globalCMS1.getIntervalColor(j,"rgb"),globalCMS1.getIntervalColor(j+1,"rgb"),areaDim));
          }
        break;
      case "left key":
        pathplotLinesDashed.push(getRGBLineSegment(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getLeftKeyColor(i+1,"rgb"),areaDim));
        break;

      default:

        var intervalIndexA = globalCMS1.getIntervalPositions(i);
        if(globalCMS1.getKeyType(i)=="dual key"){
          pathplotLines.push(getRGBLineSegment(globalCMS1.getLeftKeyColor(i,"rgb"),globalCMS1.getIntervalColor(intervalIndexA[0],"rgb"),areaDim));
        }

          for(var j=intervalIndexA[0]; j<intervalIndexA[1]; j++){
            pathplotLines.push(getRGBLineSegment(globalCMS1.getIntervalColor(j,"rgb"),globalCMS1.getIntervalColor(j+1,"rgb"),areaDim));
          }

      }

    }

}

function getRGBLineSegment(fromColor, tillColor,areaDim){

  var rgbFromPos = [];
  rgbFromPos.push(fromColor.getRValue() * areaDim);
  rgbFromPos.push(fromColor.getGValue() * areaDim);
  rgbFromPos.push(fromColor.getBValue() * areaDim);

  var rgbTillPos = [];
  rgbTillPos.push(tillColor.getRValue() * areaDim);
  rgbTillPos.push(tillColor.getGValue() * areaDim);
  rgbTillPos.push(tillColor.getBValue() * areaDim);

  var rgbFromPos3D = [];
  rgbFromPos3D.push(fromColor.getRValue() *255 - 128);
  rgbFromPos3D.push(fromColor.getGValue() *255 - 128);
  rgbFromPos3D.push(fromColor.getBValue() *255 - 128);

  var rgbTillPos3D = [];
  rgbTillPos3D.push(tillColor.getRValue() *255 - 128);
  rgbTillPos3D.push(tillColor.getGValue() *255 - 128);
  rgbTillPos3D.push(tillColor.getBValue() *255 - 128);

  var posArray = [rgbFromPos,rgbTillPos,rgbFromPos3D,rgbTillPos3D];

  return posArray;

}

//////////////////////////////////////////////////////////////////////////////////////

function calcInterpolationLine_HSV(){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesVPlot=[];

  globalCMS1.calcDeltaIntervalColors(intervalDelta, 0,globalCMS1.getKeyLength()-1);

  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;

  for (var i = 0; i < globalCMS1.getKeyLength() - 1; i++) {

    switch (globalCMS1.getKeyType(i)) {
      case "nil key":
        pathplotLinesVPlot.push(getLineSegment_VPlot_HSV(globalCMS1.getLeftKeyColor(i + 1, "hsv"), globalCMS1.getLeftKeyColor(i + 1, "hsv"), globalCMS1.getRefPosition(i), globalCMS1.getRefPosition(i + 1)));
      break;
      case "twin key":
        var intervalIndexA = globalCMS1.getIntervalPositions(i);
        pathplotLinesDashed.push(getLineSegment_Hue_HSV(globalCMS1.getLeftKeyColor(i, "hsv"), globalCMS1.getRightKeyColor(i, "hsv")));

          for (var j = intervalIndexA[0]; j < intervalIndexA[1]; j++) {
            pathplotLines.push(getLineSegment_Hue_HSV(globalCMS1.getIntervalColor(j, "hsv"), globalCMS1.getIntervalColor(j + 1, "hsv")));
            pathplotLinesVPlot.push(getLineSegment_VPlot_HSV(globalCMS1.getIntervalColor(j, "hsv"),globalCMS1.getIntervalColor(j + 1, "hsv"),globalCMS1.getIntervalRef(j),globalCMS1.getIntervalRef(j + 1)));
          }
        break;
      case "left key":
        pathplotLinesDashed.push(getLineSegment_Hue_HSV(globalCMS1.getLeftKeyColor(i, "hsv"), globalCMS1.getLeftKeyColor(i + 1, "hsv")));
        pathplotLinesVPlot.push(getLineSegment_VPlot_HSV(globalCMS1.getLeftKeyColor(i + 1, "hsv"),globalCMS1.getLeftKeyColor(i + 1, "hsv"),globalCMS1.getRefPosition(i),globalCMS1.getRefPosition(i+1)));
        break;
      default:

        var intervalIndexA = globalCMS1.getIntervalPositions(i);

        if(globalCMS1.getKeyType(i)=="dual key"){
          // we do not save the interval colors for dual key double -> it is easier for the analyze algorithm
          pathplotLines.push(getLineSegment_Hue_HSV(globalCMS1.getLeftKeyColor(i,"hsv"), globalCMS1.getIntervalColor(intervalIndexA[0],"hsv")));
          pathplotLinesVPlot.push(getLineSegment_VPlot_HSV(globalCMS1.getLeftKeyColor(i,"hsv"),globalCMS1.getIntervalColor(intervalIndexA[0],"hsv"), globalCMS1.getRefPosition(i),globalCMS1.getIntervalRef(intervalIndexA[0])));
        }

          for (var j = intervalIndexA[0]; j < intervalIndexA[1]; j++) {
            pathplotLines.push(getLineSegment_Hue_HSV(globalCMS1.getIntervalColor(j, "hsv"), globalCMS1.getIntervalColor(j + 1, "hsv")));
            pathplotLinesVPlot.push(getLineSegment_VPlot_HSV(globalCMS1.getIntervalColor(j, "hsv"),globalCMS1.getIntervalColor(j + 1, "hsv"), globalCMS1.getIntervalRef(j),globalCMS1.getIntervalRef(j + 1)));
          }

    }

  }

}

function getLineSegment_Hue_HSV(fromColor, tillColor){

  var colorspaceRadius = Math.round((pathPlotResolution / 2));

  var fromPos = [];
  var tmpDis = fromColor.getSValue() * colorspaceRadius;
  var tmpRad = (fromColor.getHValue() * Math.PI * 2) - Math.PI;
  var xPos1 = tmpDis * Math.cos(tmpRad) + colorspaceRadius;
  var yPos1 = tmpDis * Math.sin(tmpRad) + colorspaceRadius;
  fromPos.push(xPos1);
  fromPos.push(yPos1);

  var fromPos3D = [];
  tmpDis = fromColor.getSValue() * hsv3DRadius;
  var xPos3D1 = tmpDis * Math.cos(tmpRad);
  var yPos3D1 = vStart3D+(vEnd3D-vStart3D)*fromColor.getVValue();
  var zPos3D1 = tmpDis * Math.sin(tmpRad);
  fromPos3D.push(xPos3D1);
  fromPos3D.push(yPos3D1);
  fromPos3D.push(zPos3D1);

  /////////////////////////////////////////////////

  var tillPos = [];
  tmpDis = tillColor.getSValue() * colorspaceRadius;
  tmpRad = (tillColor.getHValue() * Math.PI * 2) - Math.PI;
  var xPos2 = tmpDis * Math.cos(tmpRad) + colorspaceRadius;
  var yPos2 = tmpDis * Math.sin(tmpRad) + colorspaceRadius;
  tillPos.push(xPos2);
  tillPos.push(yPos2);


  var tillPos3D = [];
  tmpDis = tillColor.getSValue() * hsv3DRadius;
  var xPos3D2 = tmpDis * Math.cos(tmpRad);
  var yPos3D2 = vStart3D+(vEnd3D-vStart3D)*tillColor.getVValue();
  var zPos3D2 = tmpDis * Math.sin(tmpRad);
  tillPos3D.push(xPos3D2);
  tillPos3D.push(yPos3D2);
  tillPos3D.push(zPos3D2);
  ///////////////////////////////////////////////////////////////////

  var posArray = [fromPos,tillPos,fromPos3D,tillPos3D];
  return posArray;

}

function getLineSegment_VPlot_HSV(fromColor, tillColor, ref1, ref2){
  var fromPos = [];
  var xRatio = (ref1-globalCMS1.getRefPosition(0))/ globalCMS1.getRefRange();
  var xPos1 = vPlotxStart + xRatio * plotwidth;
  var yPos11 = Math.round(vPlotyStart - (heigthVArea * fromColor.getHValue()));
  var yPos12 = Math.round(vPlotyStart - (heigthVArea * fromColor.getSValue()));
  var yPos13 = Math.round(vPlotyStart - (heigthVArea * fromColor.getVValue()));
  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xRatio2 = (ref2-globalCMS1.getRefPosition(0))/ globalCMS1.getRefRange();
  var xPos2 = vPlotxStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(vPlotyStart - (heigthVArea * tillColor.getHValue()));
  var yPos22 = Math.round(vPlotyStart - (heigthVArea * tillColor.getSValue()));
  var yPos23 = Math.round(vPlotyStart - (heigthVArea * tillColor.getVValue()));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function calcInterpolationLine_Lab(){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesVPlot=[];

  globalCMS1.calcDeltaIntervalColors(intervalDelta, 0,globalCMS1.getKeyLength()-1);

  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;

  for (var i = 0; i < globalCMS1.getKeyLength() - 1; i++) {

    switch (globalCMS1.getKeyType(i)) {
      case "nil key":
        pathplotLinesVPlot.push(getLineSegment_VPlot_Lab(globalCMS1.getLeftKeyColor(i + 1, "lab_rgb_possible"), globalCMS1.getLeftKeyColor(i + 1, "lab_rgb_possible"), globalCMS1.getRefPosition(i), globalCMS1.getRefPosition(i + 1)));
      break;
      case "twin key":
        var intervalIndexA = globalCMS1.getIntervalPositions(i);
        pathplotLinesDashed.push(getLineSegment_Hue_Lab(globalCMS1.getLeftKeyColor(i, "lab_rgb_possible"), globalCMS1.getRightKeyColor(i, "lab_rgb_possible")));

          for (var j = intervalIndexA[0]; j < intervalIndexA[1]; j++) {
            pathplotLines.push(getLineSegment_Hue_Lab(globalCMS1.getIntervalColor(j, "lab_rgb_possible"), globalCMS1.getIntervalColor(j + 1, "lab_rgb_possible")));
            pathplotLinesVPlot.push(getLineSegment_VPlot_Lab(globalCMS1.getIntervalColor(j, "lab_rgb_possible"),globalCMS1.getIntervalColor(j + 1, "lab_rgb_possible"),globalCMS1.getIntervalRef(j),globalCMS1.getIntervalRef(j + 1)));
          }
        break;
      case "left key":
        pathplotLinesDashed.push(getLineSegment_Hue_Lab(globalCMS1.getLeftKeyColor(i, "lab_rgb_possible"), globalCMS1.getLeftKeyColor(i + 1, "lab_rgb_possible")));
        pathplotLinesVPlot.push(getLineSegment_VPlot_Lab(globalCMS1.getLeftKeyColor(i + 1, "lab_rgb_possible"),globalCMS1.getLeftKeyColor(i + 1, "lab_rgb_possible"),globalCMS1.getRefPosition(i),globalCMS1.getRefPosition(i+1)));
        break;
      default:

        var intervalIndexA = globalCMS1.getIntervalPositions(i);

        if(globalCMS1.getKeyType(i)=="dual key"){
          // we do not save the interval colors for dual key double -> it is easier for the analyze algorithm
          pathplotLines.push(getLineSegment_Hue_Lab(globalCMS1.getLeftKeyColor(i,"lab_rgb_possible"), globalCMS1.getIntervalColor(intervalIndexA[0],"lab_rgb_possible")));
          pathplotLinesVPlot.push(getLineSegment_VPlot_Lab(globalCMS1.getLeftKeyColor(i,"lab_rgb_possible"),globalCMS1.getIntervalColor(intervalIndexA[0],"lab_rgb_possible"), globalCMS1.getRefPosition(i),globalCMS1.getIntervalRef(intervalIndexA[0])));
        }

          for (var j = intervalIndexA[0]; j < intervalIndexA[1]; j++) {
            pathplotLines.push(getLineSegment_Hue_Lab(globalCMS1.getIntervalColor(j, "lab_rgb_possible"), globalCMS1.getIntervalColor(j + 1, "lab_rgb_possible")));
            pathplotLinesVPlot.push(getLineSegment_VPlot_Lab(globalCMS1.getIntervalColor(j, "lab_rgb_possible"),globalCMS1.getIntervalColor(j + 1, "lab_rgb_possible"), globalCMS1.getIntervalRef(j),globalCMS1.getIntervalRef(j + 1)));
          }

    }

  }
}

function getLineSegment_Hue_Lab(fromColor, tillColor){

  var canvasCenter = Math.round(pathPlotResolution / 2);

  var fromPos = [];
  var xPos1 = ((fromColor.getAValue() / labSpaceRange) * canvasCenter) + canvasCenter;
  var yPos1 = ((fromColor.getBValue() / labSpaceRange) * canvasCenter) + canvasCenter;
  fromPos.push(xPos1);
  fromPos.push(yPos1);

  var fromPos3D = [];
  var xPos3D1 = 0;
  var yPos3D1 = 0;
  var zPos3D1 = 0;
  if(labABMax!=undefined && labABMax!=0){
    var labABMax2 = labABMax*2;
    xPos3D1 = labSPos+((fromColor.get2Value()+labABMax)/labABMax2)*(labEPos-labSPos);
    yPos3D1 = labSPos+(fromColor.get1Value()/100.0)*(labEPos-labSPos);
    zPos3D1 = labSPos+((fromColor.get3Value()+labABMax)/labABMax2)*(labEPos-labSPos);
  }
  fromPos3D.push(xPos3D1);
  fromPos3D.push(yPos3D1);
  fromPos3D.push(zPos3D1);

  /////////////////////////////////////////////////

  var tillPos = [];
  var xPos2 = ((tillColor.getAValue() / labSpaceRange) * canvasCenter) + canvasCenter;
  var yPos2 = ((tillColor.getBValue() / labSpaceRange) * canvasCenter) + canvasCenter;
  tillPos.push(xPos2);
  tillPos.push(yPos2);


  var tillPos3D = [];
  var xPos3D2 = 0;
  var yPos3D2 = 0;
  var zPos3D2 = 0;
  if(labABMax!=undefined && labABMax!=0){
    var labABMax2 = labABMax*2;
    xPos3D2 = labSPos+((tillColor.get2Value()+labABMax)/labABMax2)*(labEPos-labSPos);
    yPos3D2 = labSPos+(tillColor.get1Value()/100.0)*(labEPos-labSPos);
    zPos3D2 = labSPos+((tillColor.get3Value()+labABMax)/labABMax2)*(labEPos-labSPos);
  }
  tillPos3D.push(xPos3D2);
  tillPos3D.push(yPos3D2);
  tillPos3D.push(zPos3D2);
  ///////////////////////////////////////////////////////////////////

  var posArray = [fromPos,tillPos,fromPos3D,tillPos3D];
  return posArray;

}

function getLineSegment_VPlot_Lab(fromColor, tillColor, ref1, ref2){

  var fromPos = [];
  var xRatio = (ref1-globalCMS1.getRefPosition(0))/ globalCMS1.getRefRange();
  var xPos1 = vPlotxStart + xRatio * plotwidth;
  var yPos11 = Math.round(vPlotyStart - (heigthVArea * fromColor.getLValue() / 100));
  var yPos12 = Math.round(vPlotyStart - (heigthVArea * (fromColor.getAValue()+labSpaceRange) / (labSpaceRange*2)));
  var yPos13 = Math.round(vPlotyStart - (heigthVArea * (fromColor.getBValue()+labSpaceRange) / (labSpaceRange*2)));
  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xRatio2 = (ref2-globalCMS1.getRefPosition(0))/ globalCMS1.getRefRange();
  var xPos2 = vPlotxStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(vPlotyStart - (heigthVArea * tillColor.getLValue() / 100));
  var yPos22 = Math.round(vPlotyStart - (heigthVArea * (tillColor.getAValue()+labSpaceRange) / (labSpaceRange*2)));
  var yPos23 = Math.round(vPlotyStart - (heigthVArea * (tillColor.getBValue()+labSpaceRange) / (labSpaceRange*2)));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function calcInterpolationLine_DIN99(){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesVPlot=[];

  rangeA99 = rangeA99Pos - rangeA99Neg;
  rangeB99 = rangeB99Pos - rangeB99Neg;

  globalCMS1.calcDeltaIntervalColors(intervalDelta, 0,globalCMS1.getKeyLength()-1);

  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;

  for (var i = 0; i < globalCMS1.getKeyLength() - 1; i++) {

    switch (globalCMS1.getKeyType(i)) {
      case "nil key":
        pathplotLinesVPlot.push(getLineSegment_VPlot_DIN99(globalCMS1.getLeftKeyColor(i + 1, "din99_rgb_possible"), globalCMS1.getLeftKeyColor(i + 1, "din99_rgb_possible"), globalCMS1.getRefPosition(i), globalCMS1.getRefPosition(i + 1)));
      break;
      case "twin key":
        var intervalIndexA = globalCMS1.getIntervalPositions(i);
        pathplotLinesDashed.push(getLineSegment_Hue_DIN99(globalCMS1.getLeftKeyColor(i, "din99_rgb_possible"), globalCMS1.getRightKeyColor(i, "din99_rgb_possible")));

          for (var j = intervalIndexA[0]; j < intervalIndexA[1]; j++) {
            pathplotLines.push(getLineSegment_Hue_DIN99(globalCMS1.getIntervalColor(j, "din99_rgb_possible"), globalCMS1.getIntervalColor(j + 1, "din99_rgb_possible")));
            pathplotLinesVPlot.push(getLineSegment_VPlot_DIN99(globalCMS1.getIntervalColor(j, "din99_rgb_possible"),globalCMS1.getIntervalColor(j + 1, "din99_rgb_possible"),globalCMS1.getIntervalRef(j),globalCMS1.getIntervalRef(j + 1)));
          }
        break;
      case "left key":
        pathplotLinesDashed.push(getLineSegment_Hue_DIN99(globalCMS1.getLeftKeyColor(i, "din99_rgb_possible"), globalCMS1.getLeftKeyColor(i + 1, "din99_rgb_possible")));
        pathplotLinesVPlot.push(getLineSegment_VPlot_DIN99(globalCMS1.getLeftKeyColor(i + 1, "din99_rgb_possible"),globalCMS1.getLeftKeyColor(i + 1, "din99_rgb_possible"),globalCMS1.getRefPosition(i),globalCMS1.getRefPosition(i+1)));
        break;
      default:

        var intervalIndexA = globalCMS1.getIntervalPositions(i);

        if(globalCMS1.getKeyType(i)=="dual key"){
          // we do not save the interval colors for dual key double -> it is easier for the analyze algorithm
          pathplotLines.push(getLineSegment_Hue_DIN99(globalCMS1.getLeftKeyColor(i,"din99_rgb_possible"), globalCMS1.getIntervalColor(intervalIndexA[0],"din99_rgb_possible")));
          pathplotLinesVPlot.push(getLineSegment_VPlot_DIN99(globalCMS1.getLeftKeyColor(i,"din99_rgb_possible"),globalCMS1.getIntervalColor(intervalIndexA[0],"din99_rgb_possible"), globalCMS1.getRefPosition(i),globalCMS1.getIntervalRef(intervalIndexA[0])));
        }

          for (var j = intervalIndexA[0]; j < intervalIndexA[1]; j++) {
            pathplotLines.push(getLineSegment_Hue_DIN99(globalCMS1.getIntervalColor(j, "din99_rgb_possible"), globalCMS1.getIntervalColor(j + 1, "din99_rgb_possible")));
            pathplotLinesVPlot.push(getLineSegment_VPlot_DIN99(globalCMS1.getIntervalColor(j, "din99_rgb_possible"),globalCMS1.getIntervalColor(j + 1, "din99_rgb_possible"), globalCMS1.getIntervalRef(j),globalCMS1.getIntervalRef(j + 1)));
          }

    }

  }
}

function getLineSegment_Hue_DIN99(fromColor, tillColor){

  var canvasCenter = Math.round(pathPlotResolution / 2);

  var fromPos = [];
  var xPos1 = (fromColor.getA99Value() - rangeA99Neg) / rangeA99 * pathPlotResolution;
  var yPos1 = (fromColor.getB99Value() - rangeB99Neg) / rangeB99 * pathPlotResolution;
  fromPos.push(xPos1);
  fromPos.push(yPos1);

  var fromPos3D = [];
  var xPos3D1 = 0;
  var yPos3D1 = 0;
  var zPos3D1 = 0;
  if(din99ABMax!=undefined && din99ABMax!=0){
    var din99ABMax2 = din99ABMax*2;
    xPos3D1 = din99SPos+((fromColor.get2Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
    yPos3D1 = din99SPos+(fromColor.get1Value()/100.0)*(din99EPos-din99SPos);
    zPos3D1 = din99SPos+((fromColor.get3Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
  }
  fromPos3D.push(xPos3D1);
  fromPos3D.push(yPos3D1);
  fromPos3D.push(zPos3D1);

  /////////////////////////////////////////////////

  var tillPos = [];
  var xPos2 = (tillColor.getA99Value() - rangeA99Neg) / rangeA99 * pathPlotResolution;
  var yPos2 = (tillColor.getB99Value() - rangeB99Neg) / rangeB99 * pathPlotResolution;
  tillPos.push(xPos2);
  tillPos.push(yPos2);

  var tillPos3D = [];
  var xPos3D2 = 0;
  var yPos3D2 = 0;
  var zPos3D2 = 0;
  if(din99ABMax!=undefined && din99ABMax!=0){
    var din99ABMax2 = din99ABMax*2;
    xPos3D2 = din99SPos+((tillColor.get2Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
    yPos3D2 = din99SPos+(tillColor.get1Value()/100.0)*(din99EPos-din99SPos);
    zPos3D2 = din99SPos+((tillColor.get3Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
  }
  tillPos3D.push(xPos3D2);
  tillPos3D.push(yPos3D2);
  tillPos3D.push(zPos3D2);
  ///////////////////////////////////////////////////////////////////

  var posArray = [fromPos,tillPos,fromPos3D,tillPos3D];
  return posArray;

}

function getLineSegment_VPlot_DIN99(fromColor, tillColor, ref1, ref2){
  var fromPos = [];
  var xRatio = (ref1-globalCMS1.getRefPosition(0))/ globalCMS1.getRefRange();
  var xPos1 = vPlotxStart + xRatio * plotwidth;
  var yPos11 = Math.round(vPlotyStart - (heigthVArea * fromColor.getL99Value() / 100));
  var yPos12 = Math.round(vPlotyStart - (heigthVArea * (fromColor.getA99Value()+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
  var yPos13 = Math.round(vPlotyStart - (heigthVArea * (fromColor.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xRatio2 = (ref2-globalCMS1.getRefPosition(0))/ globalCMS1.getRefRange();
  var xPos2 = vPlotxStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(vPlotyStart - (heigthVArea * tillColor.getL99Value() / 100));
  var yPos22 = Math.round(vPlotyStart - (heigthVArea * (tillColor.getA99Value()+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
  var yPos23 = Math.round(vPlotyStart - (heigthVArea * (tillColor.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////

function drawInterpolationLine(canvasContex,index1, index2, isRGB){

  var startPosX = pathPlotResolution * 0.1;
  var startPosY = pathPlotResolution * 0.9;

  canvasContex.beginPath();

  canvasContex.setLineDash([]);

  if(isRGB){
    for (var i = 0; i < pathplotLines.length; i++) {
        canvasContex.moveTo(pathplotLines[i][0][index1]+startPosX, startPosY-pathplotLines[i][0][index2]);
        canvasContex.lineTo(pathplotLines[i][1][index1]+startPosX, startPosY-pathplotLines[i][1][index2]);
    }
  }
  else{

    for (var i = 0; i < pathplotLines.length; i++) {
        canvasContex.moveTo(pathplotLines[i][0][index1], pathplotLines[i][0][index2]);
        canvasContex.lineTo(pathplotLines[i][1][index1], pathplotLines[i][1][index2]);
    }
  }


  canvasContex.lineWidth=bigLineWidth;
  canvasContex.strokeStyle = 'rgb(0,0,0)';
  canvasContex.stroke();

  canvasContex.lineWidth=smallLineWidth;
  canvasContex.strokeStyle = 'rgb(255,255,255)';
  canvasContex.stroke();

  //////////////////////////////////////////////////////////////////////////////////
  canvasContex.beginPath();
  var dash = Math.round(pathPlotResolution*0.05);
  canvasContex.setLineDash([dash,dash]);
  if(isRGB){
    for (var i = 0; i < pathplotLinesDashed.length; i++) {
        canvasContex.moveTo(pathplotLinesDashed[i][0][index1]+startPosX, startPosY-pathplotLinesDashed[i][0][index2]);
        canvasContex.lineTo(pathplotLinesDashed[i][1][index1]+startPosX, startPosY-pathplotLinesDashed[i][1][index2]);
    }
  }
  else {
    for (var i = 0; i < pathplotLinesDashed.length; i++) {
        canvasContex.moveTo(pathplotLinesDashed[i][0][index1], pathplotLinesDashed[i][0][index2]);
        canvasContex.lineTo(pathplotLinesDashed[i][1][index1], pathplotLinesDashed[i][1][index2]);
    }
  }

  canvasContex.lineWidth=bigLineWidth;
  canvasContex.strokeStyle = 'rgb(0,0,0)';
  canvasContex.stroke();

  canvasContex.lineWidth=smallLineWidth;
  canvasContex.strokeStyle = 'rgb(255,255,255)';
  canvasContex.stroke();

}

function drawInterpolationLine_VPlot(canvasContex, index){

  canvasContex.beginPath();
  canvasContex.setLineDash([]);

  for (var i = 0; i < pathplotLinesVPlot.length; i++) {
      canvasContex.moveTo(pathplotLinesVPlot[i][0][0], pathplotLinesVPlot[i][0][index+1]);
      canvasContex.lineTo(pathplotLinesVPlot[i][1][0], pathplotLinesVPlot[i][1][index+1]);
  }

  canvasContex.lineWidth=bigLineWidth;
  canvasContex.strokeStyle = 'rgb(0,0,0)';
  canvasContex.stroke();

  canvasContex.lineWidth=smallLineWidth;
  canvasContex.strokeStyle = 'rgb(255,255,255)';
  canvasContex.stroke();

}

function draw3DInterpolationLine(){

  for (var i = pathPlotLineGroup.children.length - 1; i >= 0; i--) {
    pathPlotLineGroup.remove(pathPlotLineGroup.children[i]);
  }

  for (var i = 0; i < pathplotLines.length; i++) {
    draw3DLine(pathplotLines[i][2][0], pathplotLines[i][2][1], pathplotLines[i][2][2], pathplotLines[i][3][0], pathplotLines[i][3][1], pathplotLines[i][3][2], false);
  }

  for (var i = 0; i < pathplotLinesDashed.length; i++) {
    draw3DLine(pathplotLinesDashed[i][2][0], pathplotLinesDashed[i][2][1], pathplotLinesDashed[i][2][2], pathplotLinesDashed[i][3][0], pathplotLinesDashed[i][3][1], pathplotLinesDashed[i][3][2], true);
  }
}
