function calcRGBElements(cmsClone, rgbResolution){

  var areaDim = rgbResolution * 0.7;

  pathplotElementPositions=[];

    for (var i = 0; i < cmsClone.getKeyLength(); i++) {

      switch (cmsClone.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

            var drawCircle = true;
            if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
              drawCircle = false;

            ////////////////////////////////////////////////////////////////
            /////// left Color
            pathplotElementPositions.push(calcRGBElementPos(cmsClone.getLeftKeyColor(i, "rgb"),drawCircle,areaDim,i,0));

            ////////////////////////////////////////////////////////////////
            /////// Right Color
            pathplotElementPositions.push(calcRGBElementPos(cmsClone.getRightKeyColor(i, "rgb"),true,areaDim,i,1));

          break;
        case "left key":
            var drawCircle = true;
            if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
              drawCircle = false;

            ////////////////////////////////////////////////////////////////
            /////// left Color
            pathplotElementPositions.push(calcRGBElementPos(cmsClone.getLeftKeyColor(i, "rgb"),drawCircle,areaDim,i,0));

            ////////////////////////////////////////////////////////
            ///// Right Color
            // do nothing
          break;

          case "right key":
            pathplotElementPositions.push(calcRGBElementPos(cmsClone.getRightKeyColor(i, "rgb"),true,areaDim,i,1));
          break;
        default:
            // dual Key
            pathplotElementPositions.push(calcRGBElementPos(cmsClone.getRightKeyColor(i, "rgb"),true,areaDim,i,2));
      }

    }

  cmsClone.deleteReferences();
}

function calcRGBElementPos(tmpColor,shape,areaDim,keyindex,colorSide){

  var rgbPos = [];
  rgbPos.push(tmpColor.getRValue() * areaDim);
  rgbPos.push(tmpColor.getGValue() * areaDim);
  rgbPos.push(tmpColor.getBValue() * areaDim);

  var rgbPos3D = [];
  rgbPos3D.push(tmpColor.getRValue() *255 - 128);
  rgbPos3D.push(tmpColor.getGValue() *255 - 128);
  rgbPos3D.push(tmpColor.getBValue() *255 - 128);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,rgbPos,rgbPos3D];

  tmpColor.deleteReferences();
  showColor.deleteReferences();
  tmpColor=null;
  showColor=null;

  return posArray;

}

/////////////////////////////////////////////////////////////////////

function calcRGBLineElements(cmsClone,vWidth,vHeight){

  pathplotElementPositions=[];
  vPlotElementPositions=[];

  for (var i = 0; i < cmsClone.getKeyLength(); i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        var drawCircle = true;

        if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcRGB_3D_ElementPos(cmsClone.getLeftKeyColor(i, "rgb"),drawCircle,i,0));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        pathplotElementPositions.push(calcRGB_3D_ElementPos(cmsClone.getRightKeyColor(i, "rgb"),true,i,1));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcRGB_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "rgb"),true,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcRGB_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "rgb"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        } else {
          vPlotElementPositions.push(calcRGB_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "rgb"),drawCircle,i,0,((cmsClone.getRefPosition((i - 1))-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcRGB_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "rgb"),drawCircle,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcRGB_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "rgb"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }

        break;
      case "left key":

        var drawCircle = true;
        if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcRGB_3D_ElementPos(cmsClone.getLeftKeyColor(i, "rgb"),drawCircle,i,0));

        ////////////////////////////////////////////////////////
        ///// Right Color
        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcRGB_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "rgb"),true,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        } else {
          vPlotElementPositions.push(calcRGB_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "rgb"),drawCircle,i,0,((cmsClone.getRefPosition((i - 1))-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcRGB_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "rgb"),drawCircle,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }
        break;

      case "right key":

        pathplotElementPositions.push(calcRGB_3D_ElementPos(cmsClone.getRightKeyColor(i, "rgb"),true,i,1));
        ////////////////////////////////////////////////////////////////
        /////// V Plot
        vPlotElementPositions.push(calcRGB_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "rgb"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));

        break;
      default:
        // dual Key

        pathplotElementPositions.push(calcRGB_3D_ElementPos(cmsClone.getRightKeyColor(i, "rgb"),true,i,2));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        vPlotElementPositions.push(calcRGB_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "rgb"),true,i,2,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));

        if(cmsClone.getKeyType(i-1)==="left key"){
          vPlotElementPositions.push(calcRGB_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "rgb"),true,i,2,((cmsClone.getRefPosition(i-1)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }
    }

  }

  cmsClone.deleteReferences();
}

function calcRGB_3D_ElementPos(tmpColor,shape,keyindex,colorSide){

  var rgbPos3D = [];
  rgbPos3D.push(tmpColor.getRValue() *255 - 128);
  rgbPos3D.push(tmpColor.getGValue() *255 - 128);
  rgbPos3D.push(tmpColor.getBValue() *255 - 128);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,[undefined,undefined],rgbPos3D]; // first element is to seperate between vplot element and hue plot element
  showColor.deleteReferences();
  tmpColor.deleteReferences();
  showColor=null;
  tmpColor=null;

  return posArray;

}

function calcRGB_VPlot_ElementPos(tmpColor,shape,keyindex,colorSide,xRatio,vWidth,vHeight){

  var vPlotxStart=Math.round(vWidth*0.1);
var plotwidth=Math.round(vWidth*0.98)-vPlotxStart;
var vPlotyStart=Math.round(vHeight*0.9)
var heigthVArea=vPlotyStart-Math.round(vHeight*0.1);

  var vPlotPos = [];
  var xPos = vPlotxStart + xRatio * plotwidth;
  var yPos1 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getRValue()));
  var yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getGValue()));
  var yPos3 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getBValue()));

  vPlotPos.push(xPos);
  vPlotPos.push(yPos1);
  vPlotPos.push(yPos2);
  vPlotPos.push(yPos3);


  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,vPlotPos]; // first element is to seperate between vplot element and hue plot element

  showColor.deleteReferences();
  tmpColor.deleteReferences();
  showColor=null;
  tmpColor=null;

  return posArray;
}

/////////////////////////////////////////////////////////////////////

function calcLMSElements(cmsClone,vWidth,vHeight){

  pathplotElementPositions=[];
  vPlotElementPositions=[];

  for (var i = 0; i < cmsClone.getKeyLength(); i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        var drawCircle = true;

        if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLMS_3D_ElementPos(cmsClone.getLeftKeyColor(i, "lms"),drawCircle,i,0));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        pathplotElementPositions.push(calcLMS_3D_ElementPos(cmsClone.getRightKeyColor(i, "lms"),true,i,1));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcLMS_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lms"),true,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcLMS_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lms"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        } else {
          vPlotElementPositions.push(calcLMS_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lms"),drawCircle,i,0,((cmsClone.getRefPosition((i - 1))-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcLMS_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lms"),drawCircle,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcLMS_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lms"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }

        break;
      case "left key":

        var drawCircle = true;
        if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLMS_3D_ElementPos(cmsClone.getLeftKeyColor(i, "lms"),drawCircle,i,0));

        ////////////////////////////////////////////////////////
        ///// Right Color
        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcLMS_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lms"),true,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        } else {
          vPlotElementPositions.push(calcLMS_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lms"),drawCircle,i,0,((cmsClone.getRefPosition((i - 1))-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcLMS_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lms"),drawCircle,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }
        break;

      case "right key":

        pathplotElementPositions.push(calcLMS_3D_ElementPos(cmsClone.getRightKeyColor(i, "lms"),true,i,1));
        ////////////////////////////////////////////////////////////////
        /////// V Plot
        vPlotElementPositions.push(calcLMS_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lms"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));

        break;
      default:
        // dual Key

        pathplotElementPositions.push(calcLMS_3D_ElementPos(cmsClone.getRightKeyColor(i, "lms"),true,i,2));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        vPlotElementPositions.push(calcLMS_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lms"),true,i,2,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));

        if(cmsClone.getKeyType(i-1)==="left key"){
          vPlotElementPositions.push(calcLMS_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lms"),true,i,2,((cmsClone.getRefPosition(i-1)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }
    }

  }

  cmsClone.deleteReferences();
}

function calcLMS_3D_ElementPos(tmpColor,shape,keyindex,colorSide){

  /*var rgbPos3D = [];
  rgbPos3D.push(tmpColor.getLValue() *255 - 128);
  rgbPos3D.push(tmpColor.getGValue() *255 - 128);
  rgbPos3D.push(tmpColor.getBValue() *255 - 128);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,[undefined,undefined],rgbPos3D]; // first element is to seperate between vplot element and hue plot element
  showColor.deleteReferences();
  tmpColor.deleteReferences();
  showColor=null;
  tmpColor=null;

  return posArray;*/

}

function calcLMS_VPlot_ElementPos(tmpColor,shape,keyindex,colorSide,xRatio,vWidth,vHeight){

  /*var vPlotxStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-vPlotxStart;
  var vPlotyStart=Math.round(vHeight*0.9)
  var heigthVArea=vPlotyStart-Math.round(vHeight*0.1);

  var vPlotPos = [];
  var xPos = vPlotxStart + xRatio * plotwidth;
  var yPos1 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getRValue()));
  var yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getGValue()));
  var yPos3 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getBValue()));

  vPlotPos.push(xPos);
  vPlotPos.push(yPos1);
  vPlotPos.push(yPos2);
  vPlotPos.push(yPos3);


  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,vPlotPos]; // first element is to seperate between vplot element and hue plot element

  showColor.deleteReferences();
  tmpColor.deleteReferences();
  showColor=null;
  tmpColor=null;

  return posArray;*/
}

/////////////////////////////////////////////////////////////////////

function calcHSVElements(cmsClone,hueRes,vWidth,vHeight){

  pathplotElementPositions=[];
  vPlotElementPositions=[];

  for (var i = 0; i < cmsClone.getKeyLength(); i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        var drawCircle = true;

        if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcHSV_Hue_ElementPos(cmsClone.getLeftKeyColor(i, "hsv"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        pathplotElementPositions.push(calcHSV_Hue_ElementPos(cmsClone.getRightKeyColor(i, "hsv"),true,i,1,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "hsv"),true,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "hsv"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        } else {
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "hsv"),drawCircle,i,0,((cmsClone.getRefPosition((i - 1))-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "hsv"),drawCircle,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "hsv"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }

        break;
      case "left key":

        var drawCircle = true;
        if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcHSV_Hue_ElementPos(cmsClone.getLeftKeyColor(i, "hsv"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////
        ///// Right Color
        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "hsv"),true,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        } else {
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "hsv"),drawCircle,i,0,((cmsClone.getRefPosition((i - 1))-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "hsv"),drawCircle,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }
        break;

      case "right key":

        pathplotElementPositions.push(calcHSV_Hue_ElementPos(cmsClone.getRightKeyColor(i, "hsv"),true,i,1,hueRes));
        ////////////////////////////////////////////////////////////////
        /////// V Plot
        vPlotElementPositions.push(calcHSV_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "hsv"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));

        break;
      default:
        // dual Key

        pathplotElementPositions.push(calcHSV_Hue_ElementPos(cmsClone.getRightKeyColor(i, "hsv"),true,i,2,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        vPlotElementPositions.push(calcHSV_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "hsv"),true,i,2,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));

        if(cmsClone.getKeyType(i-1)==="left key"){
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "hsv"),true,i,2,((cmsClone.getRefPosition(i-1)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }
    }

  }

  cmsClone.deleteReferences();
}

function calcHSV_Hue_ElementPos(tmpColor,shape,keyindex,colorSide,hueRes){

  var colorspaceRadius = Math.round((hueRes*0.95 / 2));
  var colorspaceCenterX = Math.round(hueRes / 2);
  var colorspaceCenterY = Math.round(hueRes / 2);

  var hsPos = [];
  var tmpDis = tmpColor.getSValue() * colorspaceRadius;
  var tmpRad = degree360ToRad(tmpColor.getHValue()*360);
  var xPos = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
  var yPos = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
  var tmpY= hueRes-yPos;
  hsPos.push(xPos);
  hsPos.push(tmpY);

  var hsvPos3D = [];
  tmpDis = tmpColor.getSValue() * hsv3DRadius;
  var xPos3D = tmpDis * Math.cos(tmpRad)*-1;
  var yPos3D = vStart3D+(vEnd3D-vStart3D)*tmpColor.getVValue();
  var zPos3D = tmpDis * Math.sin(tmpRad);
  hsvPos3D.push(xPos3D);
  hsvPos3D.push(yPos3D);
  hsvPos3D.push(zPos3D);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,hsPos,hsvPos3D]; // first element is to seperate between vplot element and hue plot element
  showColor.deleteReferences();
  tmpColor.deleteReferences();
  showColor=null;
  tmpColor=null;

  return posArray;

}

function calcHSV_VPlot_ElementPos(tmpColor,shape,keyindex,colorSide,xRatio,vWidth,vHeight){

  var vPlotxStart=Math.round(vWidth*0.1);
var plotwidth=Math.round(vWidth*0.98)-vPlotxStart;
var vPlotyStart=Math.round(vHeight*0.9)
var heigthVArea=vPlotyStart-Math.round(vHeight*0.1);

  var vPlotPos = [];
  var xPos = vPlotxStart + xRatio * plotwidth;
  var yPos1 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getHValue()));
  var yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getSValue()));
  var yPos3 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getVValue()));

  vPlotPos.push(xPos);
  vPlotPos.push(yPos1);
  vPlotPos.push(yPos2);
  vPlotPos.push(yPos3);


  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,vPlotPos]; // first element is to seperate between vplot element and hue plot element

  showColor.deleteReferences();
  tmpColor.deleteReferences();
  showColor=null;
  tmpColor=null;

  return posArray;
}

/////////////////////////////////////////////////////////////////////

function calcLabElements(cmsClone,hueRes,vWidth,vHeight){

  pathplotElementPositions=[];
  vPlotElementPositions=[];

  for (var i = 0; i < cmsClone.getKeyLength(); i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        var drawCircle = true;

        if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLab_Hue_ElementPos(cmsClone.getLeftKeyColor(i, "lab_rgb_possible"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        pathplotElementPositions.push(calcLab_Hue_ElementPos(cmsClone.getRightKeyColor(i, "lab_rgb_possible"),true,i,1,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lab_rgb_possible"),true,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lab_rgb_possible"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        } else {

          vPlotElementPositions.push(calcLab_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lab_rgb_possible"),drawCircle,i,0,((cmsClone.getRefPosition((i - 1))-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lab_rgb_possible"),drawCircle,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lab_rgb_possible"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));

        }

        break;
      case "left key":

        var drawCircle = true;
        if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLab_Hue_ElementPos(cmsClone.getLeftKeyColor(i, "lab_rgb_possible"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////
        ///// Right Color

        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lab_rgb_possible"),true,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        } else {
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lab_rgb_possible"),drawCircle,i,0,((cmsClone.getRefPosition((i - 1))-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lab_rgb_possible"),drawCircle,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }
        break;

      case "right key":

        pathplotElementPositions.push(calcLab_Hue_ElementPos(cmsClone.getRightKeyColor(i, "lab_rgb_possible"),true,i,1,hueRes));
        ////////////////////////////////////////////////////////////////
        /////// V Plot
        vPlotElementPositions.push(calcLab_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lab_rgb_possible"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));

        break;
      default:
        // dual Key
        pathplotElementPositions.push(calcLab_Hue_ElementPos(cmsClone.getRightKeyColor(i, "lab_rgb_possible"),true,i,2,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        vPlotElementPositions.push(calcLab_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lab_rgb_possible"),true,i,2,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        if(cmsClone.getKeyType(i-1)==="left key"){
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lab_rgb_possible"),true,i,2,((cmsClone.getRefPosition(i-1)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }
    }

  }

  cmsClone.deleteReferences();
}

function calcLab_Hue_ElementPos(tmpColor,shape,keyindex,colorSide,hueRes){

  var canvasCenter = Math.round(hueRes / 2);
  var abPos = [];
  var xPos = ((tmpColor.getAValue() / labSpaceRange) * canvasCenter) + canvasCenter;
  var yPos = ((tmpColor.getBValue() / labSpaceRange) * canvasCenter) + canvasCenter;
  var tmpY = hueRes-yPos;
  abPos.push(xPos);
  abPos.push(tmpY);

  var labPos3D = [];
  var xPos3D = 0;
  var yPos3D = 0;
  var zPos3D = 0;

  if(labABMax!=undefined && labABMax!=0){
    var labABMax2 = labABMax*2;
    xPos3D = labSPos+((tmpColor.get2Value()+labABMax)/labABMax2)*(labEPos-labSPos);
    yPos3D = labSPos+(tmpColor.get1Value()/100.0)*(labEPos-labSPos);
    zPos3D = labEPos-((tmpColor.get3Value()+labABMax)/labABMax2)*(labEPos-labSPos);
  }

  labPos3D.push(xPos3D);
  labPos3D.push(yPos3D);
  labPos3D.push(zPos3D);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,abPos,labPos3D]; // first element is to seperate between vplot element and hue plot element

  showColor.deleteReferences();
  tmpColor.deleteReferences();
  showColor=null;
  tmpColor=null;

  return posArray;

}

function calcLab_VPlot_ElementPos(tmpColor,shape,keyindex,colorSide,xRatio,vWidth,vHeight){

  var vPlotxStart=Math.round(vWidth*0.1);
var plotwidth=Math.round(vWidth*0.98)-vPlotxStart;
var vPlotyStart=Math.round(vHeight*0.9)
var heigthVArea=vPlotyStart-Math.round(vHeight*0.1);

  var vPlotPos = [];
  var xPos = vPlotxStart + xRatio * plotwidth;
  var yPos1 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getLValue() / 100));
  var yPos2 = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getAValue()+labSpaceRange) / (labSpaceRange*2)));
  var yPos3 = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getBValue()+labSpaceRange) / (labSpaceRange*2)));

  vPlotPos.push(xPos);
  vPlotPos.push(yPos1);
  vPlotPos.push(yPos2);
  vPlotPos.push(yPos3);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,vPlotPos]; // first element is to seperate between vplot element and hue plot element

  showColor.deleteReferences();
  tmpColor.deleteReferences();
  showColor=null;
  tmpColor=null;

  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function calcDIN99Elements(cmsClone,hueRes,vWidth,vHeight){

  pathplotElementPositions=[];
  vPlotElementPositions=[];

  rangeA99 = rangeA99Pos - rangeA99Neg;
  rangeB99 = rangeB99Pos - rangeB99Neg;

  for (var i = 0; i < cmsClone.getKeyLength(); i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        var drawCircle = true;

        if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(cmsClone.getLeftKeyColor(i, "din99_rgb_possible"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(cmsClone.getRightKeyColor(i, "din99_rgb_possible"),true,i,1,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "din99_rgb_possible"),true,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "din99_rgb_possible"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        } else {

          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "din99_rgb_possible"),drawCircle,i,0,((cmsClone.getRefPosition((i - 1))-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "din99_rgb_possible"),drawCircle,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "din99_rgb_possible"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));

        }

        break;
      case "left key":

        var drawCircle = true;
        if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(cmsClone.getLeftKeyColor(i, "din99_rgb_possible"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////
        ///// Right Color
        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        if (drawCircle) {
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "din99_rgb_possible"),true,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        } else {
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "din99_rgb_possible"),drawCircle,i,0,((cmsClone.getRefPosition((i - 1))-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "din99_rgb_possible"),drawCircle,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }
        break;

      case "right key":

        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(cmsClone.getRightKeyColor(i, "din99_rgb_possible"),true,i,1,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "din99_rgb_possible"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));

        break;
      default:
        // dual Key
        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(cmsClone.getRightKeyColor(i, "din99_rgb_possible"),true,i,2,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "din99_rgb_possible"),true,i,2,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        if(cmsClone.getKeyType(i-1)==="left key"){
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "din99_rgb_possible"),true,i,2,((cmsClone.getRefPosition(i-1)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));//calcDIN99_VPlot_ElementPos(tmpColor,drawCircle,i,2,(i - 1)));
        }
    }

  }

  cmsClone.deleteReferences();
}

function calcDIN99_Hue_ElementPos(tmpColor,shape,keyindex,colorSide,hueRes){

  var ab99Pos = [];
  var xPos = (tmpColor.getA99Value() - rangeA99Neg) / rangeA99 * hueRes;
  var yPos = (tmpColor.getB99Value() - rangeB99Neg) / rangeB99 * hueRes;
  var tmpY = hueRes-yPos;
  ab99Pos.push(xPos);
  ab99Pos.push(tmpY);

  var labPos3D = [];
  var xPos3D = 0;
  var yPos3D = 0;
  var zPos3D = 0;
  if(din99ABMax!=undefined && din99ABMax!=0){
    var din99ABMax2 = din99ABMax*2;
    xPos3D = din99SPos+((tmpColor.get2Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
    yPos3D = din99SPos+(tmpColor.get1Value()/100.0)*(din99EPos-din99SPos);
    zPos3D = din99EPos-((tmpColor.get3Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
  }
  labPos3D.push(xPos3D);
  labPos3D.push(yPos3D);
  labPos3D.push(zPos3D);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,ab99Pos,labPos3D]; // first element is to seperate between vplot element and hue plot element

  showColor.deleteReferences();
  tmpColor.deleteReferences();
  showColor=null;
  tmpColor=null;

  return posArray;

}

function calcDIN99_VPlot_ElementPos(tmpColor,shape,keyindex,colorSide,xRatio,vWidth,vHeight){

  var vPlotxStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-vPlotxStart;
  var vPlotyStart=Math.round(vHeight*0.9)
  var heigthVArea=vPlotyStart-Math.round(vHeight*0.1);

  var vPlotPos = [];
  var xPos = vPlotxStart + xRatio * plotwidth;
  var yPos1 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getL99Value() / 100));
  var yPos2 = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getA99Value()+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
  var yPos3 = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));

  vPlotPos.push(xPos);
  vPlotPos.push(yPos1);
  vPlotPos.push(yPos2);
  vPlotPos.push(yPos3);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,vPlotPos]; // first element is to seperate between vplot element and hue plot element

  showColor.deleteReferences();
  tmpColor.deleteReferences();
  showColor=null;
  tmpColor=null;

  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function calcLCHElements(cmsClone,hueRes,vWidth,vHeight){

  pathplotElementPositions=[];
  vPlotElementPositions=[];

  for (var i = 0; i < cmsClone.getKeyLength(); i++) {

    switch (cmsClone.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        var drawCircle = true;

        if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLCH_Hue_ElementPos(cmsClone.getLeftKeyColor(i, "lch_rgb_possible"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        pathplotElementPositions.push(calcLCH_Hue_ElementPos(cmsClone.getRightKeyColor(i, "lch_rgb_possible"),true,i,1,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcLCH_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lch_rgb_possible"),true,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcLCH_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lch_rgb_possible"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        } else {
          vPlotElementPositions.push(calcLCH_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lch_rgb_possible"),drawCircle,i,0,((cmsClone.getRefPosition((i - 1))-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcLCH_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lch_rgb_possible"),drawCircle,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcLCH_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lch_rgb_possible"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }

        break;
      case "left key":

        var drawCircle = true;
        if (cmsClone.getKeyType(i - 1) === "nil key" || cmsClone.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLCH_Hue_ElementPos(cmsClone.getLeftKeyColor(i, "lch_rgb_possible"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////
        ///// Right Color
        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        if (drawCircle) {
          vPlotElementPositions.push(calcLCH_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lch_rgb_possible"),true,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        } else {
          vPlotElementPositions.push(calcLCH_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lch_rgb_possible"),drawCircle,i,0,((cmsClone.getRefPosition((i - 1))-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
          vPlotElementPositions.push(calcLCH_VPlot_ElementPos(cmsClone.getLeftKeyColor(i, "lch_rgb_possible"),drawCircle,i,0,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }
        break;

      case "right key":

        pathplotElementPositions.push(calcLCH_Hue_ElementPos(cmsClone.getRightKeyColor(i, "lch_rgb_possible"),true,i,1,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        vPlotElementPositions.push(calcLCH_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lch_rgb_possible"),true,i,1,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));

        break;
      default:
        // dual Key
        pathplotElementPositions.push(calcLCH_Hue_ElementPos(cmsClone.getRightKeyColor(i, "lch_rgb_possible"),true,i,2,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        vPlotElementPositions.push(calcLCH_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lch_rgb_possible"),true,i,2,((cmsClone.getRefPosition(i)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));

        if(cmsClone.getKeyType(i-1)==="left key"){
          vPlotElementPositions.push(calcLCH_VPlot_ElementPos(cmsClone.getRightKeyColor(i, "lch_rgb_possible"),true,i,2,((cmsClone.getRefPosition(i-1)-cmsClone.getRefPosition(0))/ cmsClone.getRefRange()),vWidth,vHeight));
        }
    }

  }

  cmsClone.deleteReferences();
}

function calcLCH_Hue_ElementPos(tmpColor,shape,keyindex,colorSide,hueRes){

  var colorspaceRadius = Math.round((hueRes*0.95 / 2));
  var colorspaceCenterX = Math.round(hueRes / 2);
  var colorspaceCenterY = Math.round(hueRes / 2);

  var chPos = [];
  var tmpDis = tmpColor.getCValue() * colorspaceRadius;
  var tmpRad = degree360ToRad(tmpColor.getHValue()*360);
  var xPos = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
  var yPos = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
  var tmpY= hueRes-yPos;
  chPos.push(xPos);
  chPos.push(tmpY);

  var lchPos3D = [];
  tmpDis = tmpColor.getCValue() * hsv3DRadius;
  var xPos3D = tmpDis * Math.cos(tmpRad)*-1;
  var yPos3D = vStart3D+(vEnd3D-vStart3D)*tmpColor.getLValue();
  var zPos3D = tmpDis * Math.sin(tmpRad);
  lchPos3D.push(xPos3D);
  lchPos3D.push(yPos3D);
  lchPos3D.push(zPos3D);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,chPos,lchPos3D]; // first element is to seperate between vplot element and hue plot element

  showColor.deleteReferences();
  tmpColor.deleteReferences();
  showColor=null;
  tmpColor=null;

  return posArray;

}

function calcLCH_VPlot_ElementPos(tmpColor,shape,keyindex,colorSide,xRatio,vWidth,vHeight){

  var vPlotxStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-vPlotxStart;
  var vPlotyStart=Math.round(vHeight*0.9)
  var heigthVArea=vPlotyStart-Math.round(vHeight*0.1);

  var vPlotPos = [];
  var xPos = vPlotxStart + xRatio * plotwidth;
  var yPos1 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getLValue()));
  var yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getCValue()));
  var yPos3 = Math.round(vPlotyStart - (heigthVArea * tmpColor.getHValue()));

  vPlotPos.push(xPos);
  vPlotPos.push(yPos1);
  vPlotPos.push(yPos2);
  vPlotPos.push(yPos3);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
    tmpLMS.deleteReferences();
    tmpLMS=null;
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,vPlotPos]; // first element is to seperate between vplot element and hue plot element

  showColor.deleteReferences();
  tmpColor.deleteReferences();
  showColor=null;
  tmpColor=null;

  return posArray;
}

/////////////////////////////////////////////////////////////////////

function drawPathplotElements(canvasContex,index1,index2, isRGB,mouseAboveKeyID,mouseGrappedColorSide){

  if (isRGB) {
    var startPosX = canvasContex.canvas.clientHeight * 0.1;
    var startPosY = canvasContex.canvas.clientHeight * 0.9;

    for (var i = 0; i < pathplotElementPositions.length; i++) {
      var xPos = pathplotElementPositions[i][4][index1]+startPosX;
      var yPos = startPosY-pathplotElementPositions[i][4][index2];
      drawElement(pathplotElementPositions[i][1], canvasContex, xPos, yPos, pathplotElementPositions[i][0],pathplotElementPositions[i][3], pathplotElementPositions[i][2],mouseAboveKeyID,mouseGrappedColorSide,false);
    }
  }
  else {
    for (var i = 0; i < pathplotElementPositions.length; i++) {
        // Hue Plot
        var xPos = pathplotElementPositions[i][4][0];
        var yPos = pathplotElementPositions[i][4][1];
        drawElement(pathplotElementPositions[i][1], canvasContex, xPos, yPos, pathplotElementPositions[i][0],pathplotElementPositions[i][3], pathplotElementPositions[i][2],mouseAboveKeyID,mouseGrappedColorSide,false);
    }
  }

}

function drawVplotElements(canvasContex,vPlotIndex,mouseAboveKeyID,mouseGrappedColorSide){

  for (var i = 0; i < vPlotElementPositions.length; i++) {
      // VPlot
      var xPos = vPlotElementPositions[i][4][0];
      var yPos = vPlotElementPositions[i][4][vPlotIndex+1];
      drawElement(vPlotElementPositions[i][1], canvasContex, xPos, yPos, vPlotElementPositions[i][0],vPlotElementPositions[i][3], vPlotElementPositions[i][2],mouseAboveKeyID,mouseGrappedColorSide,true);
  }

}

function drawPathplot3DElements(pathPlotElementsGroup,mouseAboveKeyID,mouseGrappedColorSide){
  for (var i = pathPlotElementsGroup.children.length - 1; i >= 0; i--) {
    pathPlotElementsGroup.remove(pathPlotElementsGroup.children[i]);
  }

  for (var i = 0; i < pathplotElementPositions.length; i++) {
    //if(pathplotElementPositions[i][0])
    pathPlotElementsGroup.add(draw3DElement(pathplotElementPositions[i][1], pathplotElementPositions[i][5][0], pathplotElementPositions[i][5][1], pathplotElementPositions[i][5][2], pathplotElementPositions[i][0],pathplotElementPositions[i][3], pathplotElementPositions[i][2],mouseAboveKeyID,mouseGrappedColorSide));
  }

  return pathPlotElementsGroup;
}
