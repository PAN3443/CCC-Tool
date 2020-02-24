
function extraSamplingCMS(cms){

  // calc intervals


  switch (cms.getInterpolationType()) {
    case "linear":
        var currentPathplotSpace = undefined;

        switch (true) {
          case editSection.isSectionOpen():
              currentPathplotSpace = editSection.part_Pathplot.pathplot_space;
          break;
          case optiSection.isSectionOpen():
              currentPathplotSpace = optiSection.part_Pathplot.pathplot_space;
          break;
          default:
            return;
        }

        if(cms.getInterpolationSpace()!==currentPathplotSpace)
          cms.calcNeededIntervalsColors(true,"delta",undefined); // calc intervals
        else
          cms.clearIntervalColors();

        cms.replaceExportIntervalWithDeltaInterval();

    break;
    case "spline":
        cms.calcNeededIntervalsColors(false,undefined,undefined); // calc intervals
        if(cms.getInterpolationSpace()==="hsv" || cms.getInterpolationSpace()==="lch"){
          var maxInterval = 90;
          var numList = [];
          var continuousSections = cms.searchForContinuousSections(0,cms.getKeyLength()-1);
          for (var i = 0; i < cms.getKeyLength()-1; i++) {
            numList.push(0);
          }

          for (var i = 0; i < continuousSections.length; i++) {
            for (var j = continuousSections[i][0]; j < continuousSections[i][1]; j++) {
              var tmpColor1 = cms.getRightKeyColor(j, cms.getInterpolationSpace());
              var tmpColor2 = cms.getLeftKeyColor(j+1, cms.getInterpolationSpace());
              var hueDiff = Math.abs(tmpColor1.getHValue()-tmpColor2.getHValue());
              numList[j]=maxInterval*hueDiff;
            }
          }
          cms.calcSpecificKeyIntervalColors_Export(numList);
        }
        else {
          cms.replaceExportIntervalWithDeltaInterval();
        }
    break;
  }
}

function calcRGBInterpolationLine(cmsClone,rgbResolution){
  pathplotLines=[];
  pathplotLinesDashed=[];

  var areaDim = rgbResolution * 0.7;

  extraSamplingCMS(cmsClone);

  for (var i = 0; i < cmsClone.getKeyLength()-1; i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":

      break;

      case "left key":
        pathplotLinesDashed.push(getRGBLineSegment(cmsClone.getLeftKeyColor(i,"rgb"),cmsClone.getLeftKeyColor(i+1,"rgb"),areaDim));
        break;

      case "twin key":

        pathplotLinesDashed.push(getRGBLineSegment(cmsClone.getLeftKeyColor(i,"rgb"),cmsClone.getRightKeyColor(i,"rgb"),areaDim));

      default:

        if(cmsClone.getExportSamplingLength(i)==0){
            pathplotLines.push(getRGBLineSegment(cmsClone.getRightKeyColor(i,"rgb"),cmsClone.getLeftKeyColor(i+1,"rgb"),areaDim));
        }
        else {
          pathplotLines.push(getRGBLineSegment(cmsClone.getRightKeyColor(i,"rgb"),cmsClone.getExportSamplingColor(i,0,"rgb"),areaDim));

          for(var j=0; j<cmsClone.getExportSamplingLength(i)-1; j++){
            pathplotLines.push(getRGBLineSegment(cmsClone.getExportSamplingColor(i,j,"rgb"),cmsClone.getExportSamplingColor(i,j+1,"rgb"),areaDim));
          }

          pathplotLines.push(getRGBLineSegment(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"rgb"),cmsClone.getLeftKeyColor(i+1,"rgb"),areaDim));
        }
      }

    }
    cmsClone.deleteReferences();
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
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [rgbFromPos,rgbTillPos,rgbFromPos3D,rgbTillPos3D];

  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////

function calcInterpolationLine_RGBLine(cmsClone,vWidth,vHeight){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesVPlot=[];
  var cmsRefRange = cmsClone.getRefRange();
  var cmsStartRef = cmsClone.getRefPosition(0);

  extraSamplingCMS(cmsClone);

  for (var i = 0; i < cmsClone.getKeyLength() - 1; i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":
        pathplotLinesVPlot.push(getLineSegment_VPlot_RGBLine(cmsClone.getLeftKeyColor(i + 1, "rgb"), cmsClone.getLeftKeyColor(i + 1, "rgb"),((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      break;

      case "left key":
        pathplotLinesDashed.push(getLineSegment_3D_RGBLine(cmsClone.getLeftKeyColor(i, "rgb"), cmsClone.getLeftKeyColor(i + 1, "rgb")));
        pathplotLinesVPlot.push(getLineSegment_VPlot_RGBLine(cmsClone.getLeftKeyColor(i + 1, "rgb"),cmsClone.getLeftKeyColor(i + 1, "rgb"),((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        break;

      case "twin key":

        pathplotLinesDashed.push(getLineSegment_3D_RGBLine(cmsClone.getRightKeyColor(i, "rgb"), cmsClone.getLeftKeyColor(i, "rgb")));

      default:

      if(cmsClone.getExportSamplingLength(i)==0){
          pathplotLines.push(getLineSegment_3D_RGBLine(cmsClone.getRightKeyColor(i,"rgb"),cmsClone.getLeftKeyColor(i+1,"rgb")));
          pathplotLinesVPlot.push(getLineSegment_VPlot_RGBLine(cmsClone.getRightKeyColor(i,"rgb"),cmsClone.getLeftKeyColor(i+1,"rgb"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
      else {
        pathplotLines.push(getLineSegment_3D_RGBLine(cmsClone.getRightKeyColor(i,"rgb"),cmsClone.getExportSamplingColor(i,0,"rgb")));
        pathplotLinesVPlot.push(getLineSegment_VPlot_RGBLine(cmsClone.getRightKeyColor(i,"rgb"),cmsClone.getExportSamplingColor(i,0,"rgb"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getExportSamplingRef(i,0)-cmsStartRef)/cmsRefRange),vWidth,vHeight));

        for(var j=0; j<cmsClone.getExportSamplingLength(i)-1; j++){
          pathplotLines.push(getLineSegment_3D_RGBLine(cmsClone.getExportSamplingColor(i,j,"rgb"),cmsClone.getExportSamplingColor(i,j+1,"rgb")));
          pathplotLinesVPlot.push(getLineSegment_VPlot_RGBLine(cmsClone.getExportSamplingColor(i, j, "rgb"),cmsClone.getExportSamplingColor(i, j + 1, "rgb"), ((cmsClone.getExportSamplingRef(i,j)-cmsStartRef)/cmsRefRange),((cmsClone.getExportSamplingRef(i,j + 1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        }
        pathplotLines.push(getLineSegment_3D_RGBLine(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"rgb"),cmsClone.getLeftKeyColor(i+1,"rgb")));
        pathplotLinesVPlot.push(getLineSegment_VPlot_RGBLine(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"rgb"),cmsClone.getLeftKeyColor(i+1,"rgb"),((cmsClone.getExportSamplingRef(i,cmsClone.getExportSamplingLength(i)-1)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
    }

  }

  cmsClone.deleteReferences();
}

function getLineSegment_3D_RGBLine(fromColor, tillColor){

  var rgbFromPos3D = [];
  rgbFromPos3D.push(fromColor.getRValue() *255 - 128);
  rgbFromPos3D.push(fromColor.getGValue() *255 - 128);
  rgbFromPos3D.push(fromColor.getBValue() *255 - 128);

  var rgbTillPos3D = [];
  rgbTillPos3D.push(tillColor.getRValue() *255 - 128);
  rgbTillPos3D.push(tillColor.getGValue() *255 - 128);
  rgbTillPos3D.push(tillColor.getBValue() *255 - 128);
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [undefined,undefined,rgbFromPos3D,rgbTillPos3D];
  return posArray;

}

function getLineSegment_VPlot_RGBLine(fromColor, tillColor, xRatio, xRatio2,vWidth,vHeight){

  var vPlotxStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-vPlotxStart;
  var vPlotyStart=Math.round(vHeight*0.9)
  var heigthVArea=vPlotyStart-Math.round(vHeight*0.1);

  var fromPos = [];
  var xPos1 = vPlotxStart + xRatio * plotwidth;
  var yPos11 = Math.round(vPlotyStart - (heigthVArea * fromColor.getRValue()));
  var yPos12 = Math.round(vPlotyStart - (heigthVArea * fromColor.getGValue()));
  var yPos13 = Math.round(vPlotyStart - (heigthVArea * fromColor.getBValue()));

  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xPos2 = vPlotxStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(vPlotyStart - (heigthVArea * tillColor.getRValue()));
  var yPos22 = Math.round(vPlotyStart - (heigthVArea * tillColor.getGValue()));
  var yPos23 = Math.round(vPlotyStart - (heigthVArea * tillColor.getBValue()));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////

function calcInterpolationLine_LMS(cmsClone,vWidth,vHeight){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesVPlot=[];
  var cmsRefRange = cmsClone.getRefRange();
  var cmsStartRef = cmsClone.getRefPosition(0);

  extraSamplingCMS(cmsClone);

  for (var i = 0; i < cmsClone.getKeyLength() - 1; i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":
        pathplotLinesVPlot.push(getLineSegment_VPlot_LMS(cmsClone.getLeftKeyColor(i + 1, "lms"), cmsClone.getLeftKeyColor(i + 1, "lms"),((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      break;

      case "left key":
        pathplotLinesDashed.push(getLineSegment_3D_LMS(cmsClone.getLeftKeyColor(i, "lms"), cmsClone.getLeftKeyColor(i + 1, "lms")));
        pathplotLinesVPlot.push(getLineSegment_VPlot_LMS(cmsClone.getLeftKeyColor(i + 1, "lms"),cmsClone.getLeftKeyColor(i + 1, "lms"),((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        break;

      case "twin key":

        pathplotLinesDashed.push(getLineSegment_3D_LMS(cmsClone.getRightKeyColor(i, "lms"), cmsClone.getLeftKeyColor(i, "lms")));

      default:

      if(cmsClone.getExportSamplingLength(i)==0){
          pathplotLines.push(getLineSegment_3D_LMS(cmsClone.getRightKeyColor(i,"lms"),cmsClone.getLeftKeyColor(i+1,"lms")));
          pathplotLinesVPlot.push(getLineSegment_VPlot_LMS(cmsClone.getRightKeyColor(i,"lms"),cmsClone.getLeftKeyColor(i+1,"lms"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
      else {
        pathplotLines.push(getLineSegment_3D_LMS(cmsClone.getRightKeyColor(i,"lms"),cmsClone.getExportSamplingColor(i,0,"lms")));
        pathplotLinesVPlot.push(getLineSegment_VPlot_LMS(cmsClone.getRightKeyColor(i,"lms"),cmsClone.getExportSamplingColor(i,0,"lms"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getExportSamplingRef(i,0)-cmsStartRef)/cmsRefRange),vWidth,vHeight));

        for(var j=0; j<cmsClone.getExportSamplingLength(i)-1; j++){
          pathplotLines.push(getLineSegment_3D_LMS(cmsClone.getExportSamplingColor(i,j,"lms"),cmsClone.getExportSamplingColor(i,j+1,"lms")));
          pathplotLinesVPlot.push(getLineSegment_VPlot_LMS(cmsClone.getExportSamplingColor(i, j, "lms"),cmsClone.getExportSamplingColor(i, j + 1, "lms"), ((cmsClone.getExportSamplingRef(i,j)-cmsStartRef)/cmsRefRange),((cmsClone.getExportSamplingRef(i,j + 1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        }
        pathplotLines.push(getLineSegment_3D_LMS(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"lms"),cmsClone.getLeftKeyColor(i+1,"lms")));
        pathplotLinesVPlot.push(getLineSegment_VPlot_LMS(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"lms"),cmsClone.getLeftKeyColor(i+1,"lms"),((cmsClone.getExportSamplingRef(i,cmsClone.getExportSamplingLength(i)-1)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
    }

  }

  cmsClone.deleteReferences();
}

function getLineSegment_3D_LMS(fromColor, tillColor){

  var lmsFromPos3D = [];
  lmsFromPos3D.push(fromColor.getLValue());
  lmsFromPos3D.push(fromColor.getMValue());
  lmsFromPos3D.push(fromColor.getSValue());

  var lmsTillPos3D = [];
  lmsTillPos3D.push(tillColor.getLValue());
  lmsTillPos3D.push(tillColor.getMValue());
  lmsTillPos3D.push(tillColor.getSValue());
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [undefined,undefined,lmsFromPos3D,lmsTillPos3D];
  return posArray;

}

function getLineSegment_VPlot_LMS(fromColor, tillColor, xRatio, xRatio2,vWidth,vHeight){

  var vPlotxStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-vPlotxStart;
  var vPlotyStart=Math.round(vHeight*0.9)
  var heigthVArea=vPlotyStart-Math.round(vHeight*0.1);

  var fromPos = [];
  var xPos1 = vPlotxStart + xRatio * plotwidth;
  var yPos11 = Math.round(vPlotyStart - (heigthVArea * fromColor.getLValue()/100));
  var yPos12 = Math.round(vPlotyStart - (heigthVArea * fromColor.getMValue()/100));
  var yPos13 = Math.round(vPlotyStart - (heigthVArea * fromColor.getSValue()/100));

  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xPos2 = vPlotxStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(vPlotyStart - (heigthVArea * tillColor.getLValue()/100));
  var yPos22 = Math.round(vPlotyStart - (heigthVArea * tillColor.getMValue()/100));
  var yPos23 = Math.round(vPlotyStart - (heigthVArea * tillColor.getSValue()/100));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function calcInterpolationLine_HSV(cmsClone,hueRes,vWidth,vHeight){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesVPlot=[];
  var cmsRefRange = cmsClone.getRefRange();
  var cmsStartRef = cmsClone.getRefPosition(0);

  extraSamplingCMS(cmsClone);

  //////////////////////////////////////

  for (var i = 0; i < cmsClone.getKeyLength() - 1; i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":
        pathplotLinesVPlot.push(getLineSegment_VPlot_HSV(cmsClone.getLeftKeyColor(i + 1, "hsv"), cmsClone.getLeftKeyColor(i + 1, "hsv"),((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      break;

      case "left key":
        pathplotLinesDashed.push(getLineSegment_Hue_HSV(cmsClone.getLeftKeyColor(i, "hsv"), cmsClone.getLeftKeyColor(i + 1, "hsv"),hueRes));
        pathplotLinesVPlot.push(getLineSegment_VPlot_HSV(cmsClone.getLeftKeyColor(i + 1, "hsv"),cmsClone.getLeftKeyColor(i + 1, "hsv"),((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        break;

      case "twin key":

        pathplotLinesDashed.push(getLineSegment_Hue_HSV(cmsClone.getRightKeyColor(i, "hsv"), cmsClone.getLeftKeyColor(i, "hsv"),hueRes));

      default:

      if(cmsClone.getExportSamplingLength(i)==0){
          pathplotLines.push(getLineSegment_Hue_HSV(cmsClone.getRightKeyColor(i,"hsv"),cmsClone.getLeftKeyColor(i+1,"hsv"),hueRes));
          pathplotLinesVPlot.push(getLineSegment_VPlot_HSV(cmsClone.getRightKeyColor(i,"hsv"),cmsClone.getLeftKeyColor(i+1,"hsv"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
      else {
        pathplotLines.push(getLineSegment_Hue_HSV(cmsClone.getRightKeyColor(i,"hsv"),cmsClone.getExportSamplingColor(i,0,"hsv"),hueRes));
        pathplotLinesVPlot.push(getLineSegment_VPlot_HSV(cmsClone.getRightKeyColor(i,"hsv"),cmsClone.getExportSamplingColor(i,0,"hsv"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getExportSamplingRef(i,0)-cmsStartRef)/cmsRefRange),vWidth,vHeight));

        for(var j=0; j<cmsClone.getExportSamplingLength(i)-1; j++){
          pathplotLines.push(getLineSegment_Hue_HSV(cmsClone.getExportSamplingColor(i,j,"hsv"),cmsClone.getExportSamplingColor(i,j+1,"hsv"),hueRes));
          pathplotLinesVPlot.push(getLineSegment_VPlot_HSV(cmsClone.getExportSamplingColor(i, j, "hsv"),cmsClone.getExportSamplingColor(i, j + 1, "hsv"), ((cmsClone.getExportSamplingRef(i,j)-cmsStartRef)/cmsRefRange),((cmsClone.getExportSamplingRef(i,j + 1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        }
        pathplotLines.push(getLineSegment_Hue_HSV(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"hsv"),cmsClone.getLeftKeyColor(i+1,"hsv"),hueRes));
        pathplotLinesVPlot.push(getLineSegment_VPlot_HSV(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"hsv"),cmsClone.getLeftKeyColor(i+1,"hsv"),((cmsClone.getExportSamplingRef(i,cmsClone.getExportSamplingLength(i)-1)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
    }

  }

  cmsClone.deleteReferences();
}

function getLineSegment_Hue_HSV(fromColor, tillColor,hueRes){

  var colorspaceRadius = Math.round((hueRes*0.95 / 2));
  var colorspaceCenterX = Math.round(hueRes / 2);
  var colorspaceCenterY = Math.round(hueRes / 2);

  var fromPos = [];
  var tmpDis = fromColor.getSValue() * colorspaceRadius;
  var tmpRad = degree360ToRad(fromColor.getHValue()*360);
  var xPos1 = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
  var yPos1 = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
  var tmpY= hueRes-yPos1;
  fromPos.push(xPos1);
  fromPos.push(tmpY);

  var fromPos3D = [];
  tmpDis = fromColor.getSValue() * hsv3DRadius;
  var xPos3D1 = tmpDis * Math.cos(tmpRad)*-1;
  var yPos3D1 = vStart3D+(vEnd3D-vStart3D)*fromColor.getVValue();
  var zPos3D1 = tmpDis * Math.sin(tmpRad);
  fromPos3D.push(xPos3D1);
  fromPos3D.push(yPos3D1);
  fromPos3D.push(zPos3D1);

  /////////////////////////////////////////////////

  var tillPos = [];
  tmpDis = tillColor.getSValue() * colorspaceRadius;
  tmpRad = degree360ToRad(tillColor.getHValue()*360);
  var xPos2 = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
  var yPos2 = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
  var tmpY2= hueRes-yPos2;
  tillPos.push(xPos2);
  tillPos.push(tmpY2);


  var tillPos3D = [];
  tmpDis = tillColor.getSValue() * hsv3DRadius;
  var xPos3D2 = tmpDis * Math.cos(tmpRad)*-1;
  var yPos3D2 = vStart3D+(vEnd3D-vStart3D)*tillColor.getVValue();
  var zPos3D2 = tmpDis * Math.sin(tmpRad);
  tillPos3D.push(xPos3D2);
  tillPos3D.push(yPos3D2);
  tillPos3D.push(zPos3D2);
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [fromPos,tillPos,fromPos3D,tillPos3D];
  return posArray;

}

function getLineSegment_VPlot_HSV(fromColor, tillColor, xRatio, xRatio2,vWidth,vHeight){

  var vPlotxStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-vPlotxStart;
  var vPlotyStart=Math.round(vHeight*0.9)
  var heigthVArea=vPlotyStart-Math.round(vHeight*0.1);

  var fromPos = [];
  var xPos1 = vPlotxStart + xRatio * plotwidth;
  var yPos11 = Math.round(vPlotyStart - (heigthVArea * fromColor.getHValue()));
  var yPos12 = Math.round(vPlotyStart - (heigthVArea * fromColor.getSValue()));
  var yPos13 = Math.round(vPlotyStart - (heigthVArea * fromColor.getVValue()));

  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xPos2 = vPlotxStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(vPlotyStart - (heigthVArea * tillColor.getHValue()));
  var yPos22 = Math.round(vPlotyStart - (heigthVArea * tillColor.getSValue()));
  var yPos23 = Math.round(vPlotyStart - (heigthVArea * tillColor.getVValue()));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function calcInterpolationLine_Lab(cmsClone,hueRes,vWidth,vHeight){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesVPlot=[];
  var cmsRefRange = cmsClone.getRefRange();
  var cmsStartRef = cmsClone.getRefPosition(0);

  extraSamplingCMS(cmsClone);

  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;

  for (var i = 0; i < cmsClone.getKeyLength() - 1; i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":
        pathplotLinesVPlot.push(getLineSegment_VPlot_Lab(cmsClone.getLeftKeyColor(i + 1, "lab_rgb_possible"), cmsClone.getLeftKeyColor(i + 1, "lab_rgb_possible"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      break;

      case "left key":
        pathplotLinesDashed.push(getLineSegment_Hue_Lab(cmsClone.getLeftKeyColor(i, "lab_rgb_possible"), cmsClone.getLeftKeyColor(i + 1, "lab_rgb_possible"),hueRes));
        pathplotLinesVPlot.push(getLineSegment_VPlot_Lab(cmsClone.getLeftKeyColor(i + 1, "lab_rgb_possible"),cmsClone.getLeftKeyColor(i + 1, "lab_rgb_possible"),((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        break;

      case "twin key":

        pathplotLinesDashed.push(getLineSegment_Hue_Lab(cmsClone.getRightKeyColor(i, "lab_rgb_possible"), cmsClone.getLeftKeyColor(i, "lab_rgb_possible"),hueRes));
        // no break because we want to do the default here, too!

      default:

      if(cmsClone.getExportSamplingLength(i)==0){
          pathplotLines.push(getLineSegment_Hue_Lab(cmsClone.getRightKeyColor(i,"lab_rgb_possible"),cmsClone.getLeftKeyColor(i+1,"lab_rgb_possible"),hueRes));
          pathplotLinesVPlot.push(getLineSegment_VPlot_Lab(cmsClone.getRightKeyColor(i,"lab_rgb_possible"),cmsClone.getLeftKeyColor(i+1,"lab_rgb_possible"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
      else {
          pathplotLines.push(getLineSegment_Hue_Lab(cmsClone.getRightKeyColor(i,"lab_rgb_possible"),cmsClone.getExportSamplingColor(i,0,"lab_rgb_possible"),hueRes));
          pathplotLinesVPlot.push(getLineSegment_VPlot_Lab(cmsClone.getRightKeyColor(i,"lab_rgb_possible"),cmsClone.getExportSamplingColor(i,0,"lab_rgb_possible"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getExportSamplingRef(i,0)-cmsStartRef)/cmsRefRange),vWidth,vHeight));

        for(var j=0; j<cmsClone.getExportSamplingLength(i)-1; j++){
          pathplotLines.push(getLineSegment_Hue_Lab(cmsClone.getExportSamplingColor(i,j,"lab_rgb_possible"),cmsClone.getExportSamplingColor(i,j+1,"lab_rgb_possible"),hueRes));
          pathplotLinesVPlot.push(getLineSegment_VPlot_Lab(cmsClone.getExportSamplingColor(i, j, "lab_rgb_possible"),cmsClone.getExportSamplingColor(i, j + 1, "lab_rgb_possible"), ((cmsClone.getExportSamplingRef(i,j)-cmsStartRef)/cmsRefRange),((cmsClone.getExportSamplingRef(i,j + 1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        }

        pathplotLines.push(getLineSegment_Hue_Lab(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"lab_rgb_possible"),cmsClone.getLeftKeyColor(i+1,"lab_rgb_possible"),hueRes));
        pathplotLinesVPlot.push(getLineSegment_VPlot_Lab(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"lab_rgb_possible"),cmsClone.getLeftKeyColor(i+1,"lab_rgb_possible"),((cmsClone.getExportSamplingRef(i,cmsClone.getExportSamplingLength(i)-1)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }

    }

  }

  cmsClone.deleteReferences();
}

function getLineSegment_Hue_Lab(fromColor, tillColor,hueRes){

  var canvasCenter = Math.round(hueRes / 2);

  var fromPos = [];

  var xPos1 = ((fromColor.getAValue() / labSpaceRange) * canvasCenter) + canvasCenter;
  var yPos1 = ((fromColor.getBValue() / labSpaceRange) * canvasCenter) + canvasCenter;
  var tmpY = hueRes-yPos1;
  fromPos.push(xPos1);
  fromPos.push(tmpY);

  var fromPos3D = [];
  var xPos3D1 = 0;
  var yPos3D1 = 0;
  var zPos3D1 = 0;
  if(labABMax!=undefined && labABMax!=0){
    var labABMax2 = labABMax*2;
    xPos3D1 = labSPos+((fromColor.get2Value()+labABMax)/labABMax2)*(labEPos-labSPos);
    yPos3D1 = labSPos+(fromColor.get1Value()/100.0)*(labEPos-labSPos);
    zPos3D1 = labEPos-((fromColor.get3Value()+labABMax)/labABMax2)*(labEPos-labSPos);
  }
  fromPos3D.push(xPos3D1);
  fromPos3D.push(yPos3D1);
  fromPos3D.push(zPos3D1);

  /////////////////////////////////////////////////

  var tillPos = [];
  var xPos2 = ((tillColor.getAValue() / labSpaceRange) * canvasCenter) + canvasCenter;
  var yPos2 = ((tillColor.getBValue() / labSpaceRange) * canvasCenter) + canvasCenter;
  var tmpY2 = hueRes-yPos2;
  tillPos.push(xPos2);
  tillPos.push(tmpY2);


  var tillPos3D = [];
  var xPos3D2 = 0;
  var yPos3D2 = 0;
  var zPos3D2 = 0;
  if(labABMax!=undefined && labABMax!=0){
    var labABMax2 = labABMax*2;
    xPos3D2 = labSPos+((tillColor.get2Value()+labABMax)/labABMax2)*(labEPos-labSPos);
    yPos3D2 = labSPos+(tillColor.get1Value()/100.0)*(labEPos-labSPos);
    zPos3D2 = labEPos-((tillColor.get3Value()+labABMax)/labABMax2)*(labEPos-labSPos);
  }
  tillPos3D.push(xPos3D2);
  tillPos3D.push(yPos3D2);
  tillPos3D.push(zPos3D2);
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [fromPos,tillPos,fromPos3D,tillPos3D];
  return posArray;

}

function getLineSegment_VPlot_Lab(fromColor, tillColor, xRatio, xRatio2,vWidth,vHeight){

  var vPlotxStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-vPlotxStart;
  var vPlotyStart=Math.round(vHeight*0.9)
  var heigthVArea=vPlotyStart-Math.round(vHeight*0.1);

  var fromPos = [];
  var xPos1 = vPlotxStart + xRatio * plotwidth;
  var yPos11 = Math.round(vPlotyStart - (heigthVArea * fromColor.getLValue() / 100));
  var yPos12 = Math.round(vPlotyStart - (heigthVArea * (fromColor.getAValue()+labSpaceRange) / (labSpaceRange*2)));
  var yPos13 = Math.round(vPlotyStart - (heigthVArea * (fromColor.getBValue()+labSpaceRange) / (labSpaceRange*2)));
  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xPos2 = vPlotxStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(vPlotyStart - (heigthVArea * tillColor.getLValue() / 100));
  var yPos22 = Math.round(vPlotyStart - (heigthVArea * (tillColor.getAValue()+labSpaceRange) / (labSpaceRange*2)));
  var yPos23 = Math.round(vPlotyStart - (heigthVArea * (tillColor.getBValue()+labSpaceRange) / (labSpaceRange*2)));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function calcInterpolationLine_DIN99(cmsClone,hueRes,vWidth,vHeight){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesVPlot=[];
  var cmsRefRange = cmsClone.getRefRange();
  var cmsStartRef = cmsClone.getRefPosition(0);

  rangeA99 = rangeA99Pos - rangeA99Neg;
  rangeB99 = rangeB99Pos - rangeB99Neg;

  extraSamplingCMS(cmsClone);

  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;

  for (var i = 0; i < cmsClone.getKeyLength() - 1; i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":
        pathplotLinesVPlot.push(getLineSegment_VPlot_DIN99(cmsClone.getLeftKeyColor(i + 1, "din99_rgb_possible"), cmsClone.getLeftKeyColor(i + 1, "din99_rgb_possible"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      break;
      case "left key":
        pathplotLinesDashed.push(getLineSegment_Hue_DIN99(cmsClone.getLeftKeyColor(i, "din99_rgb_possible"), cmsClone.getLeftKeyColor(i + 1, "din99_rgb_possible"),hueRes));
        pathplotLinesVPlot.push(getLineSegment_VPlot_DIN99(cmsClone.getLeftKeyColor(i + 1, "din99_rgb_possible"),cmsClone.getLeftKeyColor(i + 1, "din99_rgb_possible"),((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        break;

      case "twin key":

          pathplotLinesDashed.push(getLineSegment_Hue_DIN99(cmsClone.getRightKeyColor(i, "din99_rgb_possible"), cmsClone.getLeftKeyColor(i, "din99_rgb_possible"),hueRes));

          // no break because we want to do the default here, too!

      default:

      if(cmsClone.getExportSamplingLength(i)==0){
          pathplotLines.push(getLineSegment_Hue_DIN99(cmsClone.getRightKeyColor(i,"din99_rgb_possible"),cmsClone.getLeftKeyColor(i+1,"din99_rgb_possible"),hueRes));
          pathplotLinesVPlot.push(getLineSegment_VPlot_DIN99(cmsClone.getRightKeyColor(i,"din99_rgb_possible"),cmsClone.getLeftKeyColor(i+1,"din99_rgb_possible"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));

      }
      else {
          pathplotLines.push(getLineSegment_Hue_DIN99(cmsClone.getRightKeyColor(i,"din99_rgb_possible"),cmsClone.getExportSamplingColor(i,0,"din99_rgb_possible"),hueRes));
          pathplotLinesVPlot.push(getLineSegment_VPlot_DIN99(cmsClone.getRightKeyColor(i,"din99_rgb_possible"),cmsClone.getExportSamplingColor(i,0,"din99_rgb_possible"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getExportSamplingRef(i,0)-cmsStartRef)/cmsRefRange),vWidth,vHeight));


        for(var j=0; j<cmsClone.getExportSamplingLength(i)-1; j++){
          pathplotLines.push(getLineSegment_Hue_DIN99(cmsClone.getExportSamplingColor(i,j,"din99_rgb_possible"),cmsClone.getExportSamplingColor(i,j+1,"din99_rgb_possible"),hueRes));
          pathplotLinesVPlot.push(getLineSegment_VPlot_DIN99(cmsClone.getExportSamplingColor(i, j, "din99_rgb_possible"),cmsClone.getExportSamplingColor(i, j + 1, "din99_rgb_possible"), ((cmsClone.getExportSamplingRef(i,j)-cmsStartRef)/cmsRefRange),((cmsClone.getExportSamplingRef(i,j + 1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        }

        pathplotLines.push(getLineSegment_Hue_DIN99(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"din99_rgb_possible"),cmsClone.getLeftKeyColor(i+1,"din99_rgb_possible"),hueRes));
        pathplotLinesVPlot.push(getLineSegment_VPlot_DIN99(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"din99_rgb_possible"),cmsClone.getLeftKeyColor(i+1,"din99_rgb_possible"),((cmsClone.getExportSamplingRef(i,cmsClone.getExportSamplingLength(i)-1)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }

    }

  }

  cmsClone.deleteReferences();
}

function getLineSegment_Hue_DIN99(fromColor, tillColor,hueRes){

  var canvasCenter = Math.round(hueRes / 2);

  var fromPos = [];
  var xPos1 = (fromColor.getA99Value() - rangeA99Neg) / rangeA99 * hueRes;
  var yPos1 = (fromColor.getB99Value() - rangeB99Neg) / rangeB99 * hueRes;
  var tmpY = hueRes-yPos1;
  fromPos.push(xPos1);
  fromPos.push(tmpY);

  var fromPos3D = [];
  var xPos3D1 = 0;
  var yPos3D1 = 0;
  var zPos3D1 = 0;
  if(din99ABMax!=undefined && din99ABMax!=0){
    var din99ABMax2 = din99ABMax*2;
    xPos3D1 = din99SPos+((fromColor.get2Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
    yPos3D1 = din99SPos+(fromColor.get1Value()/100.0)*(din99EPos-din99SPos);
    zPos3D1 = din99EPos-((fromColor.get3Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
  }
  fromPos3D.push(xPos3D1);
  fromPos3D.push(yPos3D1);
  fromPos3D.push(zPos3D1);

  /////////////////////////////////////////////////

  var tillPos = [];
  var xPos2 = (tillColor.getA99Value() - rangeA99Neg) / rangeA99 * hueRes;
  var yPos2 = (tillColor.getB99Value() - rangeB99Neg) / rangeB99 * hueRes;
  var tmpY2 = hueRes-yPos2;
  tillPos.push(xPos2);
  tillPos.push(tmpY2);

  var tillPos3D = [];
  var xPos3D2 = 0;
  var yPos3D2 = 0;
  var zPos3D2 = 0;
  if(din99ABMax!=undefined && din99ABMax!=0){
    var din99ABMax2 = din99ABMax*2;
    xPos3D2 = din99SPos+((tillColor.get2Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
    yPos3D2 = din99SPos+(tillColor.get1Value()/100.0)*(din99EPos-din99SPos);
    zPos3D2 = din99EPos-((tillColor.get3Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
  }
  tillPos3D.push(xPos3D2);
  tillPos3D.push(yPos3D2);
  tillPos3D.push(zPos3D2);
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [fromPos,tillPos,fromPos3D,tillPos3D];
  return posArray;

}

function getLineSegment_VPlot_DIN99(fromColor, tillColor, xRatio, xRatio2,vWidth,vHeight){

  var vPlotxStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-vPlotxStart;
  var vPlotyStart=Math.round(vHeight*0.9)
  var heigthVArea=vPlotyStart-Math.round(vHeight*0.1);

  var fromPos = [];
  var xPos1 = vPlotxStart + xRatio * plotwidth;
  var yPos11 = Math.round(vPlotyStart - (heigthVArea * fromColor.getL99Value() / 100));
  var yPos12 = Math.round(vPlotyStart - (heigthVArea * (fromColor.getA99Value()+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
  var yPos13 = Math.round(vPlotyStart - (heigthVArea * (fromColor.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xPos2 = vPlotxStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(vPlotyStart - (heigthVArea * tillColor.getL99Value() / 100));
  var yPos22 = Math.round(vPlotyStart - (heigthVArea * (tillColor.getA99Value()+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
  var yPos23 = Math.round(vPlotyStart - (heigthVArea * (tillColor.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function calcInterpolationLine_LCH(cmsClone,hueRes,vWidth,vHeight){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesVPlot=[];
  var cmsRefRange = cmsClone.getRefRange();
  var cmsStartRef = cmsClone.getRefPosition(0);

  extraSamplingCMS(cmsClone);

  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;

  for (var i = 0; i < cmsClone.getKeyLength() - 1; i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":
        pathplotLinesVPlot.push(getLineSegment_VPlot_LCH(cmsClone.getLeftKeyColor(i + 1, "lch_rgb_possible"), cmsClone.getLeftKeyColor(i + 1, "lch_rgb_possible"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      break;

      case "left key":
        pathplotLinesDashed.push(getLineSegment_Hue_LCH(cmsClone.getLeftKeyColor(i, "lch_rgb_possible"), cmsClone.getLeftKeyColor(i + 1, "lch_rgb_possible"),hueRes));
        pathplotLinesVPlot.push(getLineSegment_VPlot_LCH(cmsClone.getLeftKeyColor(i + 1, "lch_rgb_possible"),cmsClone.getLeftKeyColor(i + 1, "lch_rgb_possible"),((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        break;

      case "twin key":

        pathplotLinesDashed.push(getLineSegment_Hue_LCH(cmsClone.getRightKeyColor(i, "lch_rgb_possible"), cmsClone.getLeftKeyColor(i, "lch_rgb_possible"),hueRes));

      default:

      if(cmsClone.getExportSamplingLength(i)==0){
          pathplotLines.push(getLineSegment_Hue_LCH(cmsClone.getRightKeyColor(i,"lch_rgb_possible"),cmsClone.getLeftKeyColor(i+1,"lch_rgb_possible"),hueRes));
          pathplotLinesVPlot.push(getLineSegment_VPlot_LCH(cmsClone.getRightKeyColor(i,"lch_rgb_possible"),cmsClone.getLeftKeyColor(i+1,"lch_rgb_possible"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
      else {
        pathplotLines.push(getLineSegment_Hue_LCH(cmsClone.getRightKeyColor(i,"lch_rgb_possible"),cmsClone.getExportSamplingColor(i,0,"lch_rgb_possible"),hueRes));
        pathplotLinesVPlot.push(getLineSegment_VPlot_LCH(cmsClone.getRightKeyColor(i,"lch_rgb_possible"),cmsClone.getExportSamplingColor(i,0,"lch_rgb_possible"), ((cmsClone.getRefPosition(i)-cmsStartRef)/cmsRefRange),((cmsClone.getExportSamplingRef(i,0)-cmsStartRef)/cmsRefRange),vWidth,vHeight));

        for(var j=0; j<cmsClone.getExportSamplingLength(i)-1; j++){
          pathplotLines.push(getLineSegment_Hue_LCH(cmsClone.getExportSamplingColor(i,j,"lch_rgb_possible"),cmsClone.getExportSamplingColor(i,j+1,"lch_rgb_possible"),hueRes));
          pathplotLinesVPlot.push(getLineSegment_VPlot_LCH(cmsClone.getExportSamplingColor(i, j, "lch_rgb_possible"),cmsClone.getExportSamplingColor(i, j + 1, "lch_rgb_possible"), ((cmsClone.getExportSamplingRef(i,j)-cmsStartRef)/cmsRefRange),((cmsClone.getExportSamplingRef(i,j + 1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        }
        pathplotLines.push(getLineSegment_Hue_LCH(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"lch_rgb_possible"),cmsClone.getLeftKeyColor(i+1,"lch_rgb_possible"),hueRes));
        pathplotLinesVPlot.push(getLineSegment_VPlot_LCH(cmsClone.getExportSamplingColor(i,cmsClone.getExportSamplingLength(i)-1,"lch_rgb_possible"),cmsClone.getLeftKeyColor(i+1,"lch_rgb_possible"),((cmsClone.getExportSamplingRef(i,cmsClone.getExportSamplingLength(i)-1)-cmsStartRef)/cmsRefRange),((cmsClone.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }


    }

  }

  cmsClone.deleteReferences();
}

function getLineSegment_Hue_LCH(fromColor, tillColor,hueRes){

  var colorspaceRadius = Math.round((hueRes*0.95 / 2));
  var colorspaceCenterX = Math.round(hueRes / 2);
  var colorspaceCenterY = Math.round(hueRes / 2);

  var fromPos = [];
  var tmpDis = fromColor.getCValue() * colorspaceRadius;
  var tmpRad = degree360ToRad(fromColor.getHValue()*360);
  var xPos1 = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
  var yPos1 = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
  var tmpY= hueRes-yPos1;
  fromPos.push(xPos1);
  fromPos.push(tmpY);

  var fromPos3D = [];
  tmpDis = fromColor.getCValue() * hsv3DRadius;
  var xPos3D1 = tmpDis * Math.cos(tmpRad)*-1;
  var yPos3D1 = vStart3D+(vEnd3D-vStart3D)*fromColor.getLValue();
  var zPos3D1 = tmpDis * Math.sin(tmpRad);
  fromPos3D.push(xPos3D1);
  fromPos3D.push(yPos3D1);
  fromPos3D.push(zPos3D1);

  /////////////////////////////////////////////////

  var tillPos = [];
  tmpDis = tillColor.getCValue() * colorspaceRadius;
  tmpRad = degree360ToRad(tillColor.getHValue()*360);
  var xPos2 = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
  var yPos2 = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
  var tmpY2= hueRes-yPos2;
  tillPos.push(xPos2);
  tillPos.push(tmpY2);


  var tillPos3D = [];
  tmpDis = tillColor.getCValue() * hsv3DRadius;
  var xPos3D2 = tmpDis * Math.cos(tmpRad)*-1;
  var yPos3D2 = vStart3D+(vEnd3D-vStart3D)*tillColor.getLValue();
  var zPos3D2 = tmpDis * Math.sin(tmpRad);
  tillPos3D.push(xPos3D2);
  tillPos3D.push(yPos3D2);
  tillPos3D.push(zPos3D2);
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [fromPos,tillPos,fromPos3D,tillPos3D];
  return posArray;

}

function getLineSegment_VPlot_LCH(fromColor, tillColor, xRatio, xRatio2,vWidth,vHeight){

  var vPlotxStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-vPlotxStart;
  var vPlotyStart=Math.round(vHeight*0.9)
  var heigthVArea=vPlotyStart-Math.round(vHeight*0.1);

  var fromPos = [];
  var xPos1 = vPlotxStart + xRatio * plotwidth;
  var yPos11 = Math.round(vPlotyStart - (heigthVArea * fromColor.getLValue()));
  var yPos12 = Math.round(vPlotyStart - (heigthVArea * fromColor.getCValue()));
  var yPos13 = Math.round(vPlotyStart - (heigthVArea * fromColor.getHValue()));
  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xPos2 = vPlotxStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(vPlotyStart - (heigthVArea * tillColor.getLValue()));
  var yPos22 = Math.round(vPlotyStart - (heigthVArea * tillColor.getCValue()));
  var yPos23 = Math.round(vPlotyStart - (heigthVArea * tillColor.getHValue()));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);
  ///////////////////////////////////////////////////////////////////
  fromColor.deleteReferences();
  tillColor.deleteReferences();
  fromColor=null;
  tillColor=null;

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function drawInterpolationLine(canvasContex,index1, index2, isRGB){

  var startPosX = canvasContex.canvas.clientHeight * 0.1;
  var startPosY = canvasContex.canvas.clientHeight * 0.9;

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

  canvasContex.lineWidth=Math.round(canvasContex.canvas.clientHeight*0.01);
  canvasContex.strokeStyle = 'rgb(0,0,0)';
  canvasContex.stroke();

  canvasContex.lineWidth=Math.round(canvasContex.canvas.clientHeight*0.005);
  canvasContex.strokeStyle = 'rgb(255,255,255)';
  canvasContex.stroke();//*/

  //////////////////////////////////////////////////////////////////////////////////
  canvasContex.beginPath();
  var dash = Math.round(canvasContex.canvas.clientHeight*0.05);
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

  canvasContex.lineWidth=Math.round(canvasContex.canvas.clientHeight*0.01);
  canvasContex.strokeStyle = 'rgb(0,0,0)';
  canvasContex.stroke();

  canvasContex.lineWidth=Math.round(canvasContex.canvas.clientHeight*0.005);
  canvasContex.strokeStyle = 'rgb(255,255,255)';
  canvasContex.stroke();//*/

}

function drawInterpolationLine_VPlot(canvasContex, index){

  canvasContex.beginPath();
  canvasContex.setLineDash([]);

  for (var i = 0; i < pathplotLinesVPlot.length; i++) {
      canvasContex.moveTo(pathplotLinesVPlot[i][0][0], pathplotLinesVPlot[i][0][index+1]);
      canvasContex.lineTo(pathplotLinesVPlot[i][1][0], pathplotLinesVPlot[i][1][index+1]);
  }

  canvasContex.lineWidth=Math.round(canvasContex.canvas.clientHeight*0.015);
  canvasContex.strokeStyle = pathplotFontColor;
  canvasContex.stroke();


}

function draw3DInterpolationLine(pathPlotLineGroup){

  for (var i = pathPlotLineGroup.children.length - 1; i >= 0; i--) {
    pathPlotLineGroup.remove(pathPlotLineGroup.children[i]);
  }

  for (var i = 0; i < pathplotLines.length; i++) {
    pathPlotLineGroup.add(draw3DLine(pathplotLines[i][2][0], pathplotLines[i][2][1], pathplotLines[i][2][2], pathplotLines[i][3][0], pathplotLines[i][3][1], pathplotLines[i][3][2], false));
  }

  for (var i = 0; i < pathplotLinesDashed.length; i++) {
    pathPlotLineGroup.add(draw3DLine(pathplotLinesDashed[i][2][0], pathplotLinesDashed[i][2][1], pathplotLinesDashed[i][2][2], pathplotLinesDashed[i][3][0], pathplotLinesDashed[i][3][1], pathplotLinesDashed[i][3][2], true));
  }

  return pathPlotLineGroup;
}
