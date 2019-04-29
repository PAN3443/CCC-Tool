function calcRGBElements(){

  var areaDim = pathPlotResolution * 0.7;

  pathplotElementPositions=[];

    for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

      switch (globalCMS1.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

            tmpColor = globalCMS1.getLeftKeyColor(i, "rgb");

            var drawCircle = true;
            if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
              drawCircle = false;

            ////////////////////////////////////////////////////////////////
            /////// left Color
            pathplotElementPositions.push(calcRGBElementPos(tmpColor,drawCircle,areaDim,i,0));

            ////////////////////////////////////////////////////////////////
            /////// Right Color
            tmpColor = globalCMS1.getRightKeyColor(i, "rgb");
            pathplotElementPositions.push(calcRGBElementPos(tmpColor,true,areaDim,i,1));

          break;
        case "left key":
            var drawCircle = true;
            if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
              drawCircle = false;

            ////////////////////////////////////////////////////////////////
            /////// left Color
            tmpColor = globalCMS1.getLeftKeyColor(i, "rgb");
            pathplotElementPositions.push(calcRGBElementPos(tmpColor,drawCircle,areaDim,i,0));

            ////////////////////////////////////////////////////////
            ///// Right Color
            // do nothing
          break;

          case "right key":
            tmpColor = globalCMS1.getRightKeyColor(i, "rgb"); // right color because of right key
            pathplotElementPositions.push(calcRGBElementPos(tmpColor,true,areaDim,i,1));
          break;
        default:
            // dual Key
            tmpColor = globalCMS1.getRightKeyColor(i, "rgb"); // right color because of right key
            pathplotElementPositions.push(calcRGBElementPos(tmpColor,true,areaDim,i,2));

      }

    }

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
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,rgbPos,rgbPos3D];

  return posArray;

}

function drawRGBElements(canvasContex, index1, index2){

  var startPosX = pathPlotResolution * 0.1;
  var startPosY = pathPlotResolution * 0.9;

  for (var i = 0; i < pathplotElementPositions.length; i++) {
    var xPos = pathplotElementPositions[i][4][index1]+startPosX;
    var yPos = startPosY-pathplotElementPositions[i][4][index2];
    drawElement(pathplotElementPositions[i][1], canvasContex, xPos, yPos, pathplotElementPositions[i][0],pathplotElementPositions[i][3], pathplotElementPositions[i][2]);
  }

}

function drawRGB3DElements(){
  for (var i = 0; i < pathplotElementPositions.length; i++) {
    draw3DElement(pathplotElementPositions[i][1], pathplotElementPositions[i][5][0], pathplotElementPositions[i][5][1], pathplotElementPositions[i][5][2], pathplotElementPositions[i][0],pathplotElementPositions[i][3], pathplotElementPositions[i][2]);
  }
}


/////////////////////////////////////////////////////////////////////


function calcHSVElements(){

  pathplotElementPositions=[];
  vPlotElementPositions=[];

  for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

    switch (globalCMS1.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        tmpColor = globalCMS1.getLeftKeyColor(i, "hsv");

        var drawCircle = true;

        if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcHSV_Hue_ElementPos(tmpColor,drawCircle,i,0));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        var tmpColor2 = globalCMS1.getRightKeyColor(i, "hsv");
        pathplotElementPositions.push(calcHSV_Hue_ElementPos(tmpColor,true,i,1));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(tmpColor,true,i,0,i));
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(tmpColor2,true,i,1,i));
        } else {

          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(tmpColor,drawCircle,i,0,(i - 1)));
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(tmpColor,drawCircle,i,0,i));
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(tmpColor2,true,i,1,i));

        }

        break;
      case "left key":

        var drawCircle = true;
        if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color

          tmpColor = globalCMS1.getLeftKeyColor(i, "hsv");

        pathplotElementPositions.push(calcHSV_Hue_ElementPos(tmpColor,drawCircle,i,0));

        ////////////////////////////////////////////////////////
        ///// Right Color

        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(tmpColor,true,i,0,i));
        } else {
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(tmpColor,drawCircle,i,0,(i - 1)));
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(tmpColor,drawCircle,i,0,i));
        }
        break;

      case "right key":

          tmpColor = globalCMS1.getRightKeyColor(i, "hsv");

        pathplotElementPositions.push(calcHSV_Hue_ElementPos(tmpColor,true,i,1));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        vPlotElementPositions.push(calcHSV_VPlot_ElementPos(tmpColor,true,i,1,i));

        break;
      default:
        // dual Key

        tmpColor = globalCMS1.getRightKeyColor(i, "hsv");

        pathplotElementPositions.push(calcHSV_Hue_ElementPos(tmpColor,true,i,2));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        vPlotElementPositions.push(calcHSV_VPlot_ElementPos(tmpColor,true,i,2,i));

        if(globalCMS1.getKeyType(i-1)==="left key"){
          vPlotElementPositions.push(calcHSV_VPlot_ElementPos(tmpColor,true,i,2,(i - 1)));//calcHSV_VPlot_ElementPos(tmpColor,drawCircle,i,2,(i - 1)));
        }
    }

  }
}

function calcHSV_Hue_ElementPos(tmpColor,shape,keyindex,colorSide){

  var colorspaceRadius = Math.round((pathPlotResolution / 2));

  var hsPos = [];
  var tmpDis = tmpColor.getSValue() * colorspaceRadius;
  var tmpRad = (tmpColor.getHValue() * Math.PI * 2) - Math.PI;
  var xPos = tmpDis * Math.cos(tmpRad) + colorspaceRadius;
  var yPos = tmpDis * Math.sin(tmpRad) + colorspaceRadius;
  hsPos.push(xPos);
  hsPos.push(yPos);

  var hsvPos3D = [];
  tmpDis = tmpColor.getSValue() * hsv3DRadius;
  var xPos3D = tmpDis * Math.cos(tmpRad);
  var yPos3D = vStart3D+(vEnd3D-vStart3D)*tmpColor.getVValue();
  var zPos3D = tmpDis * Math.sin(tmpRad);
  hsvPos3D.push(xPos3D);
  hsvPos3D.push(yPos3D);
  hsvPos3D.push(zPos3D);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,hsPos,hsvPos3D]; // first element is to seperate between vplot element and hue plot element

  return posArray;

}

function calcHSV_VPlot_ElementPos(tmpColor,shape,keyindex,colorSide,currentRefIndex){

  var xRatio = (globalCMS1.getRefPosition(currentRefIndex)-globalCMS1.getRefPosition(0))/ globalCMS1.getRefRange();

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
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,vPlotPos]; // first element is to seperate between vplot element and hue plot element

  return posArray;
}


/////////////////////////////////////////////////////////////////////

function calcLabElements(){

  pathplotElementPositions=[];
  vPlotElementPositions=[];

  for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

    switch (globalCMS1.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        tmpColor = globalCMS1.getLeftKeyColor(i, "lab_rgb_possible");

        var drawCircle = true;

        if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcLab_Hue_ElementPos(tmpColor,drawCircle,i,0));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        var tmpColor2 = globalCMS1.getRightKeyColor(i, "lab_rgb_possible");
        pathplotElementPositions.push(calcLab_Hue_ElementPos(tmpColor,true,i,1));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(tmpColor,true,i,0,i));
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(tmpColor2,true,i,1,i));
        } else {

          vPlotElementPositions.push(calcLab_VPlot_ElementPos(tmpColor,drawCircle,i,0,(i - 1)));
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(tmpColor,drawCircle,i,0,i));
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(tmpColor2,true,i,1,i));

        }

        break;
      case "left key":

        var drawCircle = true;
        if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color

          tmpColor = globalCMS1.getLeftKeyColor(i, "lab_rgb_possible");

        pathplotElementPositions.push(calcLab_Hue_ElementPos(tmpColor,drawCircle,i,0));

        ////////////////////////////////////////////////////////
        ///// Right Color

        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(tmpColor,true,i,0,i));
        } else {
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(tmpColor,drawCircle,i,0,(i - 1)));
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(tmpColor,drawCircle,i,0,i));
        }
        break;

      case "right key":

          tmpColor = globalCMS1.getRightKeyColor(i, "lab_rgb_possible");

        pathplotElementPositions.push(calcLab_Hue_ElementPos(tmpColor,true,i,1));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        vPlotElementPositions.push(calcLab_VPlot_ElementPos(tmpColor,true,i,1,i));

        break;
      default:
        // dual Key

        tmpColor = globalCMS1.getRightKeyColor(i, "lab_rgb_possible");

        pathplotElementPositions.push(calcLab_Hue_ElementPos(tmpColor,true,i,2));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        vPlotElementPositions.push(calcLab_VPlot_ElementPos(tmpColor,true,i,2,i));

        if(globalCMS1.getKeyType(i-1)==="left key"){
          vPlotElementPositions.push(calcLab_VPlot_ElementPos(tmpColor,true,i,2,(i - 1)));//calcLab_VPlot_ElementPos(tmpColor,drawCircle,i,2,(i - 1)));
        }
    }

  }
}

function calcLab_Hue_ElementPos(tmpColor,shape,keyindex,colorSide){

  var canvasCenter = Math.round(pathPlotResolution / 2);
  var abPos = [];
  var xPos = ((tmpColor.getAValue() / labSpaceRange) * canvasCenter) + canvasCenter;
  var yPos = ((tmpColor.getBValue() / labSpaceRange) * canvasCenter) + canvasCenter;
  abPos.push(xPos);
  abPos.push(yPos);

  var labPos3D = [];
  var xPos3D = 0;
  var yPos3D = 0;
  var zPos3D = 0;

  if(labABMax2!=undefined && labABMax2!=0){
    var labABMax2 = labABMax*2;
    xPos3D = labSPos+((tmpColor.get2Value()+labABMax)/labABMax2)*(labEPos-labSPos);
    yPos3D = labSPos+(tmpColor.get1Value()/100.0)*(labEPos-labSPos);
    zPos3D = labSPos+((tmpColor.get3Value()+labABMax)/labABMax2)*(labEPos-labSPos);
  }

  labPos3D.push(xPos3D);
  labPos3D.push(yPos3D);
  labPos3D.push(zPos3D);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,abPos,labPos3D]; // first element is to seperate between vplot element and hue plot element

  return posArray;

}

function calcLab_VPlot_ElementPos(tmpColor,shape,keyindex,colorSide,currentRefIndex){

  var xRatio = (globalCMS1.getRefPosition(currentRefIndex)-globalCMS1.getRefPosition(0))/ globalCMS1.getRefRange();

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
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,vPlotPos]; // first element is to seperate between vplot element and hue plot element

  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function calcDIN99Elements(){

  pathplotElementPositions=[];
  vPlotElementPositions=[];

  for (var i = 0; i < globalCMS1.getKeyLength(); i++) {

    switch (globalCMS1.getKeyType(i)) {
      case "nil key":
        // do nothing

        break;
      case "twin key":

        tmpColor = globalCMS1.getLeftKeyColor(i, "din99_rgb_possible");

        var drawCircle = true;

        if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color
        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(tmpColor,drawCircle,i,0));

        ////////////////////////////////////////////////////////////////
        /////// Right Color
        var tmpColor2 = globalCMS1.getRightKeyColor(i, "din99_rgb_possible");
        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(tmpColor,true,i,1));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(tmpColor,true,i,0,i));
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(tmpColor2,true,i,1,i));
        } else {

          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(tmpColor,drawCircle,i,0,(i - 1)));
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(tmpColor,drawCircle,i,0,i));
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(tmpColor2,true,i,1,i));

        }

        break;
      case "left key":

        var drawCircle = true;
        if (globalCMS1.getKeyType(i - 1) === "nil key" || globalCMS1.getKeyType(i - 1) === "left key")
          drawCircle = false;

        ////////////////////////////////////////////////////////////////
        /////// left Color

          tmpColor = globalCMS1.getLeftKeyColor(i, "din99_rgb_possible");

        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(tmpColor,drawCircle,i,0));

        ////////////////////////////////////////////////////////
        ///// Right Color

        // do nothing

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        if (drawCircle) {
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(tmpColor,true,i,0,i));
        } else {
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(tmpColor,drawCircle,i,0,(i - 1)));
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(tmpColor,drawCircle,i,0,i));
        }
        break;

      case "right key":

          tmpColor = globalCMS1.getRightKeyColor(i, "din99_rgb_possible");

        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(tmpColor,true,i,1));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(tmpColor,true,i,1,i));

        break;
      default:
        // dual Key

        tmpColor = globalCMS1.getRightKeyColor(i, "din99_rgb_possible");

        pathplotElementPositions.push(calcDIN99_Hue_ElementPos(tmpColor,true,i,2));

        ////////////////////////////////////////////////////////////////
        /////// V Plot

        vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(tmpColor,true,i,2,i));

        if(globalCMS1.getKeyType(i-1)==="left key"){
          vPlotElementPositions.push(calcDIN99_VPlot_ElementPos(tmpColor,true,i,2,(i - 1)));//calcDIN99_VPlot_ElementPos(tmpColor,drawCircle,i,2,(i - 1)));
        }
    }

  }
}

function calcDIN99_Hue_ElementPos(tmpColor,shape,keyindex,colorSide){

  var abPos = [];
  var xPos = (tmpColor.getA99Value() - rangeA99Neg) / rangeA99 * pathPlotResolution;
  var yPos = (tmpColor.getB99Value() - rangeB99Neg) / rangeB99 * pathPlotResolution;
  abPos.push(xPos);
  abPos.push(yPos);

  var labPos3D = [];
  var xPos3D = 0;
  var yPos3D = 0;
  var zPos3D = 0;
  if(din99ABMax!=undefined && din99ABMax!=0){
    var din99ABMax2 = din99ABMax*2;
    xPos3D = din99SPos+((tmpColor.get2Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
    yPos3D = din99SPos+(tmpColor.get1Value()/100.0)*(din99EPos-din99SPos);
    zPos3D = din99SPos+((tmpColor.get3Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
  }
  labPos3D.push(xPos3D);
  labPos3D.push(yPos3D);
  labPos3D.push(zPos3D);

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,abPos,labPos3D]; // first element is to seperate between vplot element and hue plot element

  return posArray;

}

function calcDIN99_VPlot_ElementPos(tmpColor,shape,keyindex,colorSide,currentRefIndex){

  var xRatio = (globalCMS1.getRefPosition(currentRefIndex)-globalCMS1.getRefPosition(0))/ globalCMS1.getRefRange();

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
  }

  var posArray = [keyindex,showColor.getHexString(),shape,colorSide,vPlotPos]; // first element is to seperate between vplot element and hue plot element

  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////////

function drawHueElements(canvasContex){

  for (var i = 0; i < pathplotElementPositions.length; i++) {
      // Hue Plot
      var xPos = pathplotElementPositions[i][4][0];
      var yPos = pathplotElementPositions[i][4][1];
      drawElement(pathplotElementPositions[i][1], canvasContex, xPos, yPos, pathplotElementPositions[i][0],pathplotElementPositions[i][3], pathplotElementPositions[i][2]);
  }

}

function drawVplotElements(canvasContex,vPlotIndex){

  for (var i = 0; i < vPlotElementPositions.length; i++) {
      // VPlot
      var xPos = vPlotElementPositions[i][4][0];
      var yPos = vPlotElementPositions[i][4][vPlotIndex+1];
      drawElement(vPlotElementPositions[i][1], canvasContex, xPos, yPos, vPlotElementPositions[i][0],vPlotElementPositions[i][3], vPlotElementPositions[i][2]);
  }

}

function drawPathplot3DElements(){
  for (var i = 0; i < pathplotElementPositions.length; i++) {
    if(pathplotElementPositions[i][0])
    draw3DElement(pathplotElementPositions[i][1], pathplotElementPositions[i][5][0], pathplotElementPositions[i][5][1], pathplotElementPositions[i][5][2], pathplotElementPositions[i][0],pathplotElementPositions[i][3], pathplotElementPositions[i][2]);
  }
}
