function calcRGBElements(rgbResolution){

  var areaDim = rgbResolution * 0.7;

  pathplotElementPositions=[];

    for (var i = 0; i < ref_GlobalCMS.getKeyLength(); i++) {

      switch (ref_GlobalCMS.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

            var drawCircle = true;
            if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
              drawCircle = false;

            ////////////////////////////////////////////////////////////////
            /////// left Color
            pathplotElementPositions.push(calcRGBElementPos(ref_GlobalCMS.getLeftKeyColor(i, "rgb"),drawCircle,areaDim,i,0));

            ////////////////////////////////////////////////////////////////
            /////// Right Color
            pathplotElementPositions.push(calcRGBElementPos(ref_GlobalCMS.getRightKeyColor(i, "rgb"),true,areaDim,i,1));

          break;
        case "left key":
            var drawCircle = true;
            if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
              drawCircle = false;

            ////////////////////////////////////////////////////////////////
            /////// left Color
            pathplotElementPositions.push(calcRGBElementPos(ref_GlobalCMS.getLeftKeyColor(i, "rgb"),drawCircle,areaDim,i,0));

            ////////////////////////////////////////////////////////
            ///// Right Color
            // do nothing
          break;

          case "right key":
            pathplotElementPositions.push(calcRGBElementPos(ref_GlobalCMS.getRightKeyColor(i, "rgb"),true,areaDim,i,1));
          break;
        default:
            // dual Key
            pathplotElementPositions.push(calcRGBElementPos(ref_GlobalCMS.getRightKeyColor(i, "rgb"),true,areaDim,i,2));
      }

    }


}

function calcRGBElementPos(tmpColor,shape,areaDim,keyindex,colorSide){

  var rgbPos = [];
  rgbPos.push(tmpColor[1] * areaDim);
  rgbPos.push(tmpColor[2] * areaDim);
  rgbPos.push(tmpColor[3] * areaDim);

  var rgbPos3D = [];
  rgbPos3D.push(tmpColor[1] *255 - 128);
  rgbPos3D.push(tmpColor[2] *255 - 128);
  rgbPos3D.push(tmpColor[3] *255 - 128);

  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,rgbPos,rgbPos3D];
  return posArray;

}

/////////////////////////////////////////////////////////////////////

function calcRGBLineElements(vWidth,vHeight){

  pathplotElementPositions=[];
  lineChartElementPositions=[];

  for (var i = 0; i < ref_GlobalCMS.getKeyLength(); i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        var drawCircle = true;

        if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcRGB_3D_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "rgb"),drawCircle,i,0));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        pathplotElementPositions.push(calcRGB_3D_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "rgb"),true,i,1));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          lineChartElementPositions.push(calcRGB_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "rgb"),true,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcRGB_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "rgb"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        } else {
          lineChartElementPositions.push(calcRGB_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "rgb"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition((i - 1))-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcRGB_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "rgb"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcRGB_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "rgb"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }

        break;
      case "left key":

        var drawCircle = true;
        if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcRGB_3D_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "rgb"),drawCircle,i,0));

        ////////////////////////////////////////////////////////
        ///// Right Color
        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          lineChartElementPositions.push(calcRGB_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "rgb"),true,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        } else {
          lineChartElementPositions.push(calcRGB_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "rgb"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition((i - 1))-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcRGB_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "rgb"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }
        break;

      case "right key":

        pathplotElementPositions.push(calcRGB_3D_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "rgb"),true,i,1));
        ////////////////////////////////////////////////////////////////
        /////// V Plot
        lineChartElementPositions.push(calcRGB_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "rgb"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));

        break;
      default:
        // dual Key

        pathplotElementPositions.push(calcRGB_3D_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "rgb"),true,i,2));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        lineChartElementPositions.push(calcRGB_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "rgb"),true,i,2,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));

        if(ref_GlobalCMS.getKeyType(i-1)==="left key"){
          lineChartElementPositions.push(calcRGB_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "rgb"),true,i,2,((ref_GlobalCMS.getRefPosition(i-1)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }
    }

  }


}

function calcRGB_3D_ElementPos(tmpColor,shape,keyindex,colorSide){

  var rgbPos3D = [];
  rgbPos3D.push(tmpColor[1] *255 - 128);
  rgbPos3D.push(tmpColor[2] *255 - 128);
  rgbPos3D.push(tmpColor[3] *255 - 128);

  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,[undefined,undefined],rgbPos3D]; // first element is to seperate between LineChart element and hue plot element
  return posArray;

}

function calcRGB_LineChart_ElementPos(tmpColor,shape,keyindex,colorSide,xRatio,vWidth,vHeight){

  var lineChart_xStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-lineChart_xStart;
  var lineChart_yStart=Math.round(vHeight*0.9)
  var heigthVArea=lineChart_yStart-Math.round(vHeight*0.1);

  var lineChartPos = [];
  var xPos = lineChart_xStart + xRatio * plotwidth;
  var yPos1 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[1]));
  var yPos2 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[2]));
  var yPos3 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[3]));

  lineChartPos.push(xPos);
  lineChartPos.push(yPos1);
  lineChartPos.push(yPos2);
  lineChartPos.push(yPos3);

  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,lineChartPos]; // first element is to seperate between LineChart element and hue plot element
  return posArray;
}

/////////////////////////////////////////////////////////////////////

function calcLMSElements(vWidth,vHeight){

  pathplotElementPositions=[];
  lineChartElementPositions=[];

  for (var i = 0; i < ref_GlobalCMS.getKeyLength(); i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        var drawCircle = true;

        if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLMS_3D_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lms"),drawCircle,i,0));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        pathplotElementPositions.push(calcLMS_3D_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lms"),true,i,1));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          lineChartElementPositions.push(calcLMS_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lms"),true,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcLMS_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lms"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        } else {
          lineChartElementPositions.push(calcLMS_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lms"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition((i - 1))-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcLMS_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lms"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcLMS_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lms"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }

        break;
      case "left key":

        var drawCircle = true;
        if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLMS_3D_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lms"),drawCircle,i,0));

        ////////////////////////////////////////////////////////
        ///// Right Color
        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          lineChartElementPositions.push(calcLMS_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lms"),true,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        } else {
          lineChartElementPositions.push(calcLMS_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lms"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition((i - 1))-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcLMS_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lms"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }
        break;

      case "right key":

        pathplotElementPositions.push(calcLMS_3D_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lms"),true,i,1));
        ////////////////////////////////////////////////////////////////
        /////// V Plot
        lineChartElementPositions.push(calcLMS_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lms"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));

        break;
      default:
        // dual Key

        pathplotElementPositions.push(calcLMS_3D_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lms"),true,i,2));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        lineChartElementPositions.push(calcLMS_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lms"),true,i,2,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));

        if(ref_GlobalCMS.getKeyType(i-1)==="left key"){
          lineChartElementPositions.push(calcLMS_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lms"),true,i,2,((ref_GlobalCMS.getRefPosition(i-1)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }
    }

  }


}

function calcLMS_3D_ElementPos(tmpColor,shape,keyindex,colorSide){

  var lmsPos3D = [];
  lmsPos3D.push(tmpColor[1]);
  lmsPos3D.push(tmpColor[2]);
  lmsPos3D.push(tmpColor[3]);

  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,[undefined,undefined],lmsPos3D]; // first element is to seperate between LineChart element and hue plot element
  return posArray;

}

function calcLMS_LineChart_ElementPos(tmpColor,shape,keyindex,colorSide,xRatio,vWidth,vHeight){

  var lineChart_xStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-lineChart_xStart;
  var lineChart_yStart=Math.round(vHeight*0.9)
  var heigthVArea=lineChart_yStart-Math.round(vHeight*0.1);

  var lineChartPos = [];
  var xPos = lineChart_xStart + xRatio * plotwidth;
  var yPos1 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[1]/100));
  var yPos2 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[2]/100));
  var yPos3 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[3]/100));

  lineChartPos.push(xPos);
  lineChartPos.push(yPos1);
  lineChartPos.push(yPos2);
  lineChartPos.push(yPos3);

  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,lineChartPos]; // first element is to seperate between LineChart element and hue plot element
  return posArray;
}

/////////////////////////////////////////////////////////////////////

function calcHSVElements(hueRes,vWidth,vHeight){

  pathplotElementPositions=[];
  lineChartElementPositions=[];

  for (var i = 0; i < ref_GlobalCMS.getKeyLength(); i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        var drawCircle = true;

        if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcHSV_Hue_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "hsv"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        pathplotElementPositions.push(calcHSV_Hue_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "hsv"),true,i,1,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          lineChartElementPositions.push(calcHSV_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "hsv"),true,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcHSV_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "hsv"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        } else {
          lineChartElementPositions.push(calcHSV_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "hsv"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition((i - 1))-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcHSV_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "hsv"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcHSV_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "hsv"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }

        break;
      case "left key":

        var drawCircle = true;
        if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcHSV_Hue_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "hsv"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////
        ///// Right Color
        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          lineChartElementPositions.push(calcHSV_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "hsv"),true,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        } else {
          lineChartElementPositions.push(calcHSV_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "hsv"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition((i - 1))-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcHSV_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "hsv"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }
        break;

      case "right key":

        pathplotElementPositions.push(calcHSV_Hue_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "hsv"),true,i,1,hueRes));
        ////////////////////////////////////////////////////////////////
        /////// V Plot
        lineChartElementPositions.push(calcHSV_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "hsv"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));

        break;
      default:
        // dual Key

        pathplotElementPositions.push(calcHSV_Hue_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "hsv"),true,i,2,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        lineChartElementPositions.push(calcHSV_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "hsv"),true,i,2,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));

        if(ref_GlobalCMS.getKeyType(i-1)==="left key"){
          lineChartElementPositions.push(calcHSV_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "hsv"),true,i,2,((ref_GlobalCMS.getRefPosition(i-1)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }
    }

  }


}

function calcHSV_Hue_ElementPos(tmpColor,shape,keyindex,colorSide,hueRes){

  var colorspaceRadius = Math.round((hueRes*0.95 / 2));
  var colorspaceCenterX = Math.round(hueRes / 2);
  var colorspaceCenterY = Math.round(hueRes / 2);

  var hsPos = [];
  var tmpDis = tmpColor[2] * colorspaceRadius;
  var tmpRad = degree360ToRad(tmpColor[1]*360);
  var xPos = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
  var yPos = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
  var tmpY= hueRes-yPos;
  hsPos.push(xPos);
  hsPos.push(tmpY);

  var hsvPos3D = [];
  tmpDis = tmpColor[2] * hsv3DRadius;
  var xPos3D = tmpDis * Math.cos(tmpRad)*-1;
  var yPos3D = vStart3D+(vEnd3D-vStart3D)*tmpColor[3];
  var zPos3D = tmpDis * Math.sin(tmpRad);
  hsvPos3D.push(xPos3D);
  hsvPos3D.push(yPos3D);
  hsvPos3D.push(zPos3D);

  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,hsPos,hsvPos3D]; // first element is to seperate between LineChart element and hue plot element
  return posArray;
}

function calcHSV_LineChart_ElementPos(tmpColor,shape,keyindex,colorSide,xRatio,vWidth,vHeight){

  var lineChart_xStart=Math.round(vWidth*0.1);
var plotwidth=Math.round(vWidth*0.98)-lineChart_xStart;
var lineChart_yStart=Math.round(vHeight*0.9)
var heigthVArea=lineChart_yStart-Math.round(vHeight*0.1);

  var lineChartPos = [];
  var xPos = lineChart_xStart + xRatio * plotwidth;
  var yPos1 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[1]));
  var yPos2 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[2]));
  var yPos3 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[3]));

  lineChartPos.push(xPos);
  lineChartPos.push(yPos1);
  lineChartPos.push(yPos2);
  lineChartPos.push(yPos3);


  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,lineChartPos]; // first element is to seperate between LineChart element and hue plot element
  return posArray;
}

/////////////////////////////////////////////////////////////////////

function calcLabElements(hueRes,vWidth,vHeight){

  pathplotElementPositions=[];
  lineChartElementPositions=[];

  for (var i = 0; i < ref_GlobalCMS.getKeyLength(); i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        var drawCircle = true;

        if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLab_Hue_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lab"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        pathplotElementPositions.push(calcLab_Hue_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lab"),true,i,1,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          lineChartElementPositions.push(calcLab_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lab"),true,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcLab_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lab"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        } else {
          lineChartElementPositions.push(calcLab_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lab"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition((i - 1))-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcLab_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lab"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcLab_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lab"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }

        break;
      case "left key":

        var drawCircle = true;
        if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLab_Hue_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lab"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////
        ///// Right Color

        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          lineChartElementPositions.push(calcLab_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lab"),true,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        } else {
          lineChartElementPositions.push(calcLab_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lab"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition((i - 1))-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcLab_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lab"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }
        break;

      case "right key":

        pathplotElementPositions.push(calcLab_Hue_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lab"),true,i,1,hueRes));
        ////////////////////////////////////////////////////////////////
        /////// V Plot
        lineChartElementPositions.push(calcLab_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lab"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));

        break;
      default:
        // dual Key
        pathplotElementPositions.push(calcLab_Hue_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lab"),true,i,2,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        lineChartElementPositions.push(calcLab_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lab"),true,i,2,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        if(ref_GlobalCMS.getKeyType(i-1)==="left key"){
          lineChartElementPositions.push(calcLab_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lab"),true,i,2,((ref_GlobalCMS.getRefPosition(i-1)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }
    }

  }


}

function calcLab_Hue_ElementPos(tmpColor,shape,keyindex,colorSide,hueRes){

  var canvasCenter = Math.round(hueRes / 2);
  var abPos = [];
  var xPos = ((tmpColor[2] / labSpaceRange) * canvasCenter) + canvasCenter;
  var yPos = ((tmpColor[3] / labSpaceRange) * canvasCenter) + canvasCenter;
  var tmpY = hueRes-yPos;
  abPos.push(xPos);
  abPos.push(tmpY);

  var labPos3D = [];
  var xPos3D = 0;
  var yPos3D = 0;
  var zPos3D = 0;

  if(labABMax!=undefined && labABMax!=0){
    var labABMax2 = labABMax*2;
    xPos3D = labSPos+((tmpColor[2]+labABMax)/labABMax2)*(labEPos-labSPos);
    yPos3D = labSPos+(tmpColor[1]/100.0)*(labEPos-labSPos);
    zPos3D = labEPos-((tmpColor[3]+labABMax)/labABMax2)*(labEPos-labSPos);
  }

  labPos3D.push(xPos3D);
  labPos3D.push(yPos3D);
  labPos3D.push(zPos3D);

  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,abPos,labPos3D]; // first element is to seperate between LineChart element and hue plot element
  return posArray;

}

function calcLab_LineChart_ElementPos(tmpColor,shape,keyindex,colorSide,xRatio,vWidth,vHeight){

  var lineChart_xStart=Math.round(vWidth*0.1);
var plotwidth=Math.round(vWidth*0.98)-lineChart_xStart;
var lineChart_yStart=Math.round(vHeight*0.9)
var heigthVArea=lineChart_yStart-Math.round(vHeight*0.1);

  var lineChartPos = [];
  var xPos = lineChart_xStart + xRatio * plotwidth;
  var yPos1 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[1] / 100));
  var yPos2 = Math.round(lineChart_yStart - (heigthVArea * (tmpColor[2]+labSpaceRange) / (labSpaceRange*2)));
  var yPos3 = Math.round(lineChart_yStart - (heigthVArea * (tmpColor[3]+labSpaceRange) / (labSpaceRange*2)));

  lineChartPos.push(xPos);
  lineChartPos.push(yPos1);
  lineChartPos.push(yPos2);
  lineChartPos.push(yPos3);

  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,lineChartPos]; // first element is to seperate between LineChart element and hue plot element
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function calcDIN99Elements(hueRes,vWidth,vHeight){

  pathplotElementPositions=[];
  lineChartElementPositions=[];

  rangeA99 = rangeA99Pos - rangeA99Neg;
  rangeB99 = rangeB99Pos - rangeB99Neg;

  for (var i = 0; i < ref_GlobalCMS.getKeyLength(); i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        var drawCircle = true;

        if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "din99"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "din99"),true,i,1,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          lineChartElementPositions.push(calcDIN99_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "din99"),true,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcDIN99_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "din99"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        } else {

          lineChartElementPositions.push(calcDIN99_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "din99"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition((i - 1))-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcDIN99_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "din99"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcDIN99_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "din99"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));

        }

        break;
      case "left key":

        var drawCircle = true;
        if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "din99"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////
        ///// Right Color
        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        if (drawCircle) {
          lineChartElementPositions.push(calcDIN99_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "din99"),true,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        } else {
          lineChartElementPositions.push(calcDIN99_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "din99"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition((i - 1))-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcDIN99_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "din99"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }
        break;

      case "right key":

        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "din99"),true,i,1,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        lineChartElementPositions.push(calcDIN99_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "din99"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));

        break;
      default:
        // dual Key
        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "din99"),true,i,2,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        lineChartElementPositions.push(calcDIN99_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "din99"),true,i,2,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        if(ref_GlobalCMS.getKeyType(i-1)==="left key"){
          lineChartElementPositions.push(calcDIN99_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "din99"),true,i,2,((ref_GlobalCMS.getRefPosition(i-1)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));//calcDIN99_LineChart_ElementPos(tmpColor,drawCircle,i,2,(i - 1)));
        }
    }

  }


}

function calcDIN99_Hue_ElementPos(tmpColor,shape,keyindex,colorSide,hueRes){

  var ab99Pos = [];
  var xPos = (tmpColor[2] - rangeA99Neg) / rangeA99 * hueRes;
  var yPos = (tmpColor[3] - rangeB99Neg) / rangeB99 * hueRes;
  var tmpY = hueRes-yPos;
  ab99Pos.push(xPos);
  ab99Pos.push(tmpY);

  var labPos3D = [];
  var xPos3D = 0;
  var yPos3D = 0;
  var zPos3D = 0;
  if(din99ABMax!=undefined && din99ABMax!=0){
    var din99ABMax2 = din99ABMax*2;
    xPos3D = din99SPos+((tmpColor[2]+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
    yPos3D = din99SPos+(tmpColor[1]/100.0)*(din99EPos-din99SPos);
    zPos3D = din99EPos-((tmpColor[3]+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
  }
  labPos3D.push(xPos3D);
  labPos3D.push(yPos3D);
  labPos3D.push(zPos3D);

  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,ab99Pos,labPos3D]; // first element is to seperate between LineChart element and hue plot element
  return posArray;

}

function calcDIN99_LineChart_ElementPos(tmpColor,shape,keyindex,colorSide,xRatio,vWidth,vHeight){

  var lineChart_xStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-lineChart_xStart;
  var lineChart_yStart=Math.round(vHeight*0.9)
  var heigthVArea=lineChart_yStart-Math.round(vHeight*0.1);

  var lineChartPos = [];
  var xPos = lineChart_xStart + xRatio * plotwidth;
  var yPos1 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[1] / 100));
  var yPos2 = Math.round(lineChart_yStart - (heigthVArea * (tmpColor[2]+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
  var yPos3 = Math.round(lineChart_yStart - (heigthVArea * (tmpColor[3]+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));

  lineChartPos.push(xPos);
  lineChartPos.push(yPos1);
  lineChartPos.push(yPos2);
  lineChartPos.push(yPos3);

  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,lineChartPos]; // first element is to seperate between LineChart element and hue plot element
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function calcLCHElements(hueRes,vWidth,vHeight){

  pathplotElementPositions=[];
  lineChartElementPositions=[];

  for (var i = 0; i < ref_GlobalCMS.getKeyLength(); i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        var drawCircle = true;

        if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLCH_Hue_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lch"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        pathplotElementPositions.push(calcLCH_Hue_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lch"),true,i,1,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          lineChartElementPositions.push(calcLCH_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lch"),true,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcLCH_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lch"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        } else {
          lineChartElementPositions.push(calcLCH_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lch"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition((i - 1))-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcLCH_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lch"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcLCH_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lch"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }

        break;
      case "left key":

        var drawCircle = true;
        if (ref_GlobalCMS.getKeyType(i - 1) === "nil key" || ref_GlobalCMS.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLCH_Hue_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lch"),drawCircle,i,0,hueRes));

        ////////////////////////////////////////////////////////
        ///// Right Color
        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        if (drawCircle) {
          lineChartElementPositions.push(calcLCH_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lch"),true,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        } else {
          lineChartElementPositions.push(calcLCH_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lch"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition((i - 1))-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
          lineChartElementPositions.push(calcLCH_LineChart_ElementPos(ref_GlobalCMS.getLeftKeyColor(i, "lch"),drawCircle,i,0,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }
        break;

      case "right key":

        pathplotElementPositions.push(calcLCH_Hue_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lch"),true,i,1,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        lineChartElementPositions.push(calcLCH_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lch"),true,i,1,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));

        break;
      default:
        // dual Key
        pathplotElementPositions.push(calcLCH_Hue_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lch"),true,i,2,hueRes));

        ////////////////////////////////////////////////////////////////
        /////// V Plot
        lineChartElementPositions.push(calcLCH_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lch"),true,i,2,((ref_GlobalCMS.getRefPosition(i)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));

        if(ref_GlobalCMS.getKeyType(i-1)==="left key"){
          lineChartElementPositions.push(calcLCH_LineChart_ElementPos(ref_GlobalCMS.getRightKeyColor(i, "lch"),true,i,2,((ref_GlobalCMS.getRefPosition(i-1)-ref_GlobalCMS.getRefPosition(0))/ ref_GlobalCMS.getRefRange()),vWidth,vHeight));
        }
    }

  }


}

function calcLCH_Hue_ElementPos(tmpColor,shape,keyindex,colorSide,hueRes){

  var colorspaceRadius = Math.round((hueRes*0.95 / 2));
  var colorspaceCenterX = Math.round(hueRes / 2);
  var colorspaceCenterY = Math.round(hueRes / 2);

  var chPos = [];
  var tmpDis = tmpColor[2] * colorspaceRadius;
  var tmpRad = degree360ToRad(tmpColor[3]*360);
  var xPos = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
  var yPos = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
  var tmpY= hueRes-yPos;
  chPos.push(xPos);
  chPos.push(tmpY);

  var lchPos3D = [];
  tmpDis = tmpColor[2]* hsv3DRadius;
  var xPos3D = tmpDis * Math.cos(tmpRad)*-1;
  var yPos3D = vStart3D+(vEnd3D-vStart3D)*tmpColor[1];
  var zPos3D = tmpDis * Math.sin(tmpRad);
  lchPos3D.push(xPos3D);
  lchPos3D.push(yPos3D);
  lchPos3D.push(zPos3D);

  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,chPos,lchPos3D]; // first element is to seperate between LineChart element and hue plot element
  return posArray;

}

function calcLCH_LineChart_ElementPos(tmpColor,shape,keyindex,colorSide,xRatio,vWidth,vHeight){

  var lineChart_xStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-lineChart_xStart;
  var lineChart_yStart=Math.round(vHeight*0.9)
  var heigthVArea=lineChart_yStart-Math.round(vHeight*0.1);

  var lineChartPos = [];
  var xPos = lineChart_xStart + xRatio * plotwidth;
  var yPos1 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[1]));
  var yPos2 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[2]));
  var yPos3 = Math.round(lineChart_yStart - (heigthVArea * tmpColor[3]));

  lineChartPos.push(xPos);
  lineChartPos.push(yPos1);
  lineChartPos.push(yPos2);
  lineChartPos.push(yPos3);

  gWorkColor1.setColorInfo(tmpColor);
  var showColor = gWorkColor1.getColorInfo("rgb_hex");
  if(doColorblindnessSim){
    showColor = gWorkColor1.getColorInfo("rgb_cb_hex");
  }

  var posArray = [keyindex,showColor,shape,colorSide,lineChartPos]; // first element is to seperate between LineChart element and hue plot element
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

function drawLineChartElements(canvasContex,LineChartIndex,mouseAboveKeyID,mouseGrappedColorSide){

  for (var i = 0; i < lineChartElementPositions.length; i++) {
      // LineChart
      var xPos = lineChartElementPositions[i][4][0];
      var yPos = lineChartElementPositions[i][4][LineChartIndex+1];
      drawElement(lineChartElementPositions[i][1], canvasContex, xPos, yPos, lineChartElementPositions[i][0],lineChartElementPositions[i][3], lineChartElementPositions[i][2],mouseAboveKeyID,mouseGrappedColorSide,true);
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
