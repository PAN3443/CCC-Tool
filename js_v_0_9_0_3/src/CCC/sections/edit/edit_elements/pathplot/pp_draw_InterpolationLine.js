function calcRGBInterpolationLine(rgbResolution){
  pathplotLines=[];
  pathplotLinesDashed=[];

  var areaDim = rgbResolution * 0.7;

  for (var i = 0; i < ref_GlobalCMS.getKeyLength()-1; i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":

      break;

      case "left key":
        pathplotLinesDashed.push(getRGBLineSegment(ref_GlobalCMS.getLeftKeyColor(i,"rgb"),ref_GlobalCMS.getLeftKeyColor(i+1,"rgb"),areaDim));
        break;

      case "twin key":

        pathplotLinesDashed.push(getRGBLineSegment(ref_GlobalCMS.getLeftKeyColor(i,"rgb"),ref_GlobalCMS.getRightKeyColor(i,"rgb"),areaDim));

      default:

        if(ref_GlobalCMS.get_PP_WorkColorLength(i)==0){
            pathplotLines.push(getRGBLineSegment(ref_GlobalCMS.getRightKeyColor(i,"rgb"),ref_GlobalCMS.getLeftKeyColor(i+1,"rgb"),areaDim));
        }
        else {
          pathplotLines.push(getRGBLineSegment(ref_GlobalCMS.getRightKeyColor(i,"rgb"),ref_GlobalCMS.get_PP_WorkColor(i,0,"rgb"),areaDim));

          for(var j=0; j<ref_GlobalCMS.get_PP_WorkColorLength(i)-1; j++){
            pathplotLines.push(getRGBLineSegment(ref_GlobalCMS.get_PP_WorkColor(i,j,"rgb"),ref_GlobalCMS.get_PP_WorkColor(i,j+1,"rgb"),areaDim));
          }

          pathplotLines.push(getRGBLineSegment(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"rgb"),ref_GlobalCMS.getLeftKeyColor(i+1,"rgb"),areaDim));
        }
      }
    }
}

function getRGBLineSegment(fromColor, tillColor,areaDim){

  var rgbFromPos = [];
  rgbFromPos.push(fromColor[1] * areaDim);
  rgbFromPos.push(fromColor[2] * areaDim);
  rgbFromPos.push(fromColor[3] * areaDim);

  var rgbTillPos = [];
  rgbTillPos.push(tillColor[1] * areaDim);
  rgbTillPos.push(tillColor[2] * areaDim);
  rgbTillPos.push(tillColor[3] * areaDim);

  var rgbFromPos3D = [];
  rgbFromPos3D.push(fromColor[1] *255 - 128);
  rgbFromPos3D.push(fromColor[2] *255 - 128);
  rgbFromPos3D.push(fromColor[3] *255 - 128);

  var rgbTillPos3D = [];
  rgbTillPos3D.push(tillColor[1] *255 - 128);
  rgbTillPos3D.push(tillColor[2] *255 - 128);
  rgbTillPos3D.push(tillColor[3] *255 - 128);
  ///////////////////////////////////////////////////////////////////

  var posArray = [rgbFromPos,rgbTillPos,rgbFromPos3D,rgbTillPos3D];

  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////

function calcInterpolationLine_RGBLine(vWidth,vHeight){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesLineChart=[];
  var cmsRefRange = ref_GlobalCMS.getRefRange();
  var cmsStartRef = ref_GlobalCMS.getRefPosition(0);

  for (var i = 0; i < ref_GlobalCMS.getKeyLength() - 1; i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":
        pathplotLinesLineChart.push(getLineSegment_LineChart_RGBLine(ref_GlobalCMS.getLeftKeyColor(i + 1, "rgb"), ref_GlobalCMS.getLeftKeyColor(i + 1, "rgb"),((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      break;

      case "left key":
        pathplotLinesDashed.push(getLineSegment_3D_RGBLine(ref_GlobalCMS.getLeftKeyColor(i, "rgb"), ref_GlobalCMS.getLeftKeyColor(i + 1, "rgb")));
        pathplotLinesLineChart.push(getLineSegment_LineChart_RGBLine(ref_GlobalCMS.getLeftKeyColor(i + 1, "rgb"),ref_GlobalCMS.getLeftKeyColor(i + 1, "rgb"),((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        break;

      case "twin key":

        pathplotLinesDashed.push(getLineSegment_3D_RGBLine(ref_GlobalCMS.getRightKeyColor(i, "rgb"), ref_GlobalCMS.getLeftKeyColor(i, "rgb")));

      default:

      if(ref_GlobalCMS.get_PP_WorkColorLength(i)==0){
          pathplotLines.push(getLineSegment_3D_RGBLine(ref_GlobalCMS.getRightKeyColor(i,"rgb"),ref_GlobalCMS.getLeftKeyColor(i+1,"rgb")));
          pathplotLinesLineChart.push(getLineSegment_LineChart_RGBLine(ref_GlobalCMS.getRightKeyColor(i,"rgb"),ref_GlobalCMS.getLeftKeyColor(i+1,"rgb"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
      else {
        pathplotLines.push(getLineSegment_3D_RGBLine(ref_GlobalCMS.getRightKeyColor(i,"rgb"),ref_GlobalCMS.get_PP_WorkColor(i,0,"rgb")));
        pathplotLinesLineChart.push(getLineSegment_LineChart_RGBLine(ref_GlobalCMS.getRightKeyColor(i,"rgb"),ref_GlobalCMS.get_PP_WorkColor(i,0,"rgb"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.get_PP_WorkColorRef(i,0)-cmsStartRef)/cmsRefRange),vWidth,vHeight));

        for(var j=0; j<ref_GlobalCMS.get_PP_WorkColorLength(i)-1; j++){
          pathplotLines.push(getLineSegment_3D_RGBLine(ref_GlobalCMS.get_PP_WorkColor(i,j,"rgb"),ref_GlobalCMS.get_PP_WorkColor(i,j+1,"rgb")));
          pathplotLinesLineChart.push(getLineSegment_LineChart_RGBLine(ref_GlobalCMS.get_PP_WorkColor(i, j, "rgb"),ref_GlobalCMS.get_PP_WorkColor(i, j + 1, "rgb"), ((ref_GlobalCMS.get_PP_WorkColorRef(i,j)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.get_PP_WorkColorRef(i,j + 1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        }
        pathplotLines.push(getLineSegment_3D_RGBLine(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"rgb"),ref_GlobalCMS.getLeftKeyColor(i+1,"rgb")));
        pathplotLinesLineChart.push(getLineSegment_LineChart_RGBLine(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"rgb"),ref_GlobalCMS.getLeftKeyColor(i+1,"rgb"),((ref_GlobalCMS.get_PP_WorkColorRef(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
    }

  }

}

function getLineSegment_3D_RGBLine(fromColor, tillColor){

  var rgbFromPos3D = [];
  rgbFromPos3D.push(fromColor[1] *255 - 128);
  rgbFromPos3D.push(fromColor[2] *255 - 128);
  rgbFromPos3D.push(fromColor[3] *255 - 128);

  var rgbTillPos3D = [];
  rgbTillPos3D.push(tillColor[1] *255 - 128);
  rgbTillPos3D.push(tillColor[2] *255 - 128);
  rgbTillPos3D.push(tillColor[3] *255 - 128);
  ///////////////////////////////////////////////////////////////////

  var posArray = [undefined,undefined,rgbFromPos3D,rgbTillPos3D];
  return posArray;

}

function getLineSegment_LineChart_RGBLine(fromColor, tillColor, xRatio, xRatio2,vWidth,vHeight){

  var lineChart_xStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-lineChart_xStart;
  var lineChart_yStart=Math.round(vHeight*0.9)
  var heigthVArea=lineChart_yStart-Math.round(vHeight*0.1);

  var fromPos = [];
  var xPos1 = lineChart_xStart + xRatio * plotwidth;
  var yPos11 = Math.round(lineChart_yStart - (heigthVArea * fromColor[1]));
  var yPos12 = Math.round(lineChart_yStart - (heigthVArea * fromColor[2]));
  var yPos13 = Math.round(lineChart_yStart - (heigthVArea * fromColor[3]));

  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xPos2 = lineChart_xStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(lineChart_yStart - (heigthVArea * tillColor[1]));
  var yPos22 = Math.round(lineChart_yStart - (heigthVArea * tillColor[2]));
  var yPos23 = Math.round(lineChart_yStart - (heigthVArea * tillColor[3]));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);
  ///////////////////////////////////////////////////////////////////

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////

function calcInterpolationLine_LMS(vWidth,vHeight){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesLineChart=[];
  var cmsRefRange = ref_GlobalCMS.getRefRange();
  var cmsStartRef = ref_GlobalCMS.getRefPosition(0);

  for (var i = 0; i < ref_GlobalCMS.getKeyLength() - 1; i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":
        pathplotLinesLineChart.push(getLineSegment_LineChart_LMS(ref_GlobalCMS.getLeftKeyColor(i + 1, "lms"), ref_GlobalCMS.getLeftKeyColor(i + 1, "lms"),((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      break;

      case "left key":
        pathplotLinesDashed.push(getLineSegment_3D_LMS(ref_GlobalCMS.getLeftKeyColor(i, "lms"), ref_GlobalCMS.getLeftKeyColor(i + 1, "lms")));
        pathplotLinesLineChart.push(getLineSegment_LineChart_LMS(ref_GlobalCMS.getLeftKeyColor(i + 1, "lms"),ref_GlobalCMS.getLeftKeyColor(i + 1, "lms"),((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        break;

      case "twin key":

        pathplotLinesDashed.push(getLineSegment_3D_LMS(ref_GlobalCMS.getRightKeyColor(i, "lms"), ref_GlobalCMS.getLeftKeyColor(i, "lms")));

      default:

      if(ref_GlobalCMS.get_PP_WorkColorLength(i)==0){
          pathplotLines.push(getLineSegment_3D_LMS(ref_GlobalCMS.getRightKeyColor(i,"lms"),ref_GlobalCMS.getLeftKeyColor(i+1,"lms")));
          pathplotLinesLineChart.push(getLineSegment_LineChart_LMS(ref_GlobalCMS.getRightKeyColor(i,"lms"),ref_GlobalCMS.getLeftKeyColor(i+1,"lms"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
      else {
        pathplotLines.push(getLineSegment_3D_LMS(ref_GlobalCMS.getRightKeyColor(i,"lms"),ref_GlobalCMS.get_PP_WorkColor(i,0,"lms")));
        pathplotLinesLineChart.push(getLineSegment_LineChart_LMS(ref_GlobalCMS.getRightKeyColor(i,"lms"),ref_GlobalCMS.get_PP_WorkColor(i,0,"lms"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.get_PP_WorkColorRef(i,0)-cmsStartRef)/cmsRefRange),vWidth,vHeight));

        for(var j=0; j<ref_GlobalCMS.get_PP_WorkColorLength(i)-1; j++){
          pathplotLines.push(getLineSegment_3D_LMS(ref_GlobalCMS.get_PP_WorkColor(i,j,"lms"),ref_GlobalCMS.get_PP_WorkColor(i,j+1,"lms")));
          pathplotLinesLineChart.push(getLineSegment_LineChart_LMS(ref_GlobalCMS.get_PP_WorkColor(i, j, "lms"),ref_GlobalCMS.get_PP_WorkColor(i, j + 1, "lms"), ((ref_GlobalCMS.get_PP_WorkColorRef(i,j)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.get_PP_WorkColorRef(i,j + 1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        }
        pathplotLines.push(getLineSegment_3D_LMS(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"lms"),ref_GlobalCMS.getLeftKeyColor(i+1,"lms")));
        pathplotLinesLineChart.push(getLineSegment_LineChart_LMS(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"lms"),ref_GlobalCMS.getLeftKeyColor(i+1,"lms"),((ref_GlobalCMS.get_PP_WorkColorRef(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
    }

  }

}

function getLineSegment_3D_LMS(fromColor, tillColor){

  var lmsFromPos3D = [];
  lmsFromPos3D.push(fromColor[1]);
  lmsFromPos3D.push(fromColor[2]);
  lmsFromPos3D.push(fromColor[3]);

  var lmsTillPos3D = [];
  lmsTillPos3D.push(tillColor[1]);
  lmsTillPos3D.push(tillColor[2]);
  lmsTillPos3D.push(tillColor[3]);
  ///////////////////////////////////////////////////////////////////
  fromColor=null;
  tillColor=null;

  var posArray = [undefined,undefined,lmsFromPos3D,lmsTillPos3D];
  return posArray;

}

function getLineSegment_LineChart_LMS(fromColor, tillColor, xRatio, xRatio2,vWidth,vHeight){

  var lineChart_xStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-lineChart_xStart;
  var lineChart_yStart=Math.round(vHeight*0.9)
  var heigthVArea=lineChart_yStart-Math.round(vHeight*0.1);

  var fromPos = [];
  var xPos1 = lineChart_xStart + xRatio * plotwidth;
  var yPos11 = Math.round(lineChart_yStart - (heigthVArea * fromColor[1]/100));
  var yPos12 = Math.round(lineChart_yStart - (heigthVArea * fromColor[2]/100));
  var yPos13 = Math.round(lineChart_yStart - (heigthVArea * fromColor[3]/100));

  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xPos2 = lineChart_xStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(lineChart_yStart - (heigthVArea * tillColor[1]/100));
  var yPos22 = Math.round(lineChart_yStart - (heigthVArea * tillColor[2]/100));
  var yPos23 = Math.round(lineChart_yStart - (heigthVArea * tillColor[3]/100));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);
  ///////////////////////////////////////////////////////////////////

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function calcInterpolationLine_HSV(hueRes,vWidth,vHeight){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesLineChart=[];
  var cmsRefRange = ref_GlobalCMS.getRefRange();
  var cmsStartRef = ref_GlobalCMS.getRefPosition(0);

  //////////////////////////////////////

  for (var i = 0; i < ref_GlobalCMS.getKeyLength() - 1; i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":
        pathplotLinesLineChart.push(getLineSegment_LineChart_HSV(ref_GlobalCMS.getLeftKeyColor(i + 1, "hsv"), ref_GlobalCMS.getLeftKeyColor(i + 1, "hsv"),((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      break;

      case "left key":
        pathplotLinesDashed.push(getLineSegment_Hue_HSV(ref_GlobalCMS.getLeftKeyColor(i, "hsv"), ref_GlobalCMS.getLeftKeyColor(i + 1, "hsv"),hueRes));
        pathplotLinesLineChart.push(getLineSegment_LineChart_HSV(ref_GlobalCMS.getLeftKeyColor(i + 1, "hsv"),ref_GlobalCMS.getLeftKeyColor(i + 1, "hsv"),((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        break;

      case "twin key":

        pathplotLinesDashed.push(getLineSegment_Hue_HSV(ref_GlobalCMS.getRightKeyColor(i, "hsv"), ref_GlobalCMS.getLeftKeyColor(i, "hsv"),hueRes));

      default:

      if(ref_GlobalCMS.get_PP_WorkColorLength(i)==0){
          pathplotLines.push(getLineSegment_Hue_HSV(ref_GlobalCMS.getRightKeyColor(i,"hsv"),ref_GlobalCMS.getLeftKeyColor(i+1,"hsv"),hueRes));
          pathplotLinesLineChart.push(getLineSegment_LineChart_HSV(ref_GlobalCMS.getRightKeyColor(i,"hsv"),ref_GlobalCMS.getLeftKeyColor(i+1,"hsv"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
      else {
        pathplotLines.push(getLineSegment_Hue_HSV(ref_GlobalCMS.getRightKeyColor(i,"hsv"),ref_GlobalCMS.get_PP_WorkColor(i,0,"hsv"),hueRes));
        pathplotLinesLineChart.push(getLineSegment_LineChart_HSV(ref_GlobalCMS.getRightKeyColor(i,"hsv"),ref_GlobalCMS.get_PP_WorkColor(i,0,"hsv"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.get_PP_WorkColorRef(i,0)-cmsStartRef)/cmsRefRange),vWidth,vHeight));

        for(var j=0; j<ref_GlobalCMS.get_PP_WorkColorLength(i)-1; j++){
          pathplotLines.push(getLineSegment_Hue_HSV(ref_GlobalCMS.get_PP_WorkColor(i,j,"hsv"),ref_GlobalCMS.get_PP_WorkColor(i,j+1,"hsv"),hueRes));
          pathplotLinesLineChart.push(getLineSegment_LineChart_HSV(ref_GlobalCMS.get_PP_WorkColor(i, j, "hsv"),ref_GlobalCMS.get_PP_WorkColor(i, j + 1, "hsv"), ((ref_GlobalCMS.get_PP_WorkColorRef(i,j)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.get_PP_WorkColorRef(i,j + 1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        }
        pathplotLines.push(getLineSegment_Hue_HSV(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"hsv"),ref_GlobalCMS.getLeftKeyColor(i+1,"hsv"),hueRes));
        pathplotLinesLineChart.push(getLineSegment_LineChart_HSV(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"hsv"),ref_GlobalCMS.getLeftKeyColor(i+1,"hsv"),((ref_GlobalCMS.get_PP_WorkColorRef(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
    }

  }

}

function getLineSegment_Hue_HSV(fromColor, tillColor,hueRes){

  var colorspaceRadius = Math.round((hueRes*0.95 / 2));
  var colorspaceCenterX = Math.round(hueRes / 2);
  var colorspaceCenterY = Math.round(hueRes / 2);

  var fromPos = [];
  var tmpDis = fromColor[2] * colorspaceRadius;
  var tmpRad = degree360ToRad(fromColor[1]*360);
  var xPos1 = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
  var yPos1 = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
  var tmpY= hueRes-yPos1;
  fromPos.push(xPos1);
  fromPos.push(tmpY);

  var fromPos3D = [];
  tmpDis = fromColor[2] * hsv3DRadius;
  var xPos3D1 = tmpDis * Math.cos(tmpRad)*-1;
  var yPos3D1 = vStart3D+(vEnd3D-vStart3D)*fromColor[3];
  var zPos3D1 = tmpDis * Math.sin(tmpRad);
  fromPos3D.push(xPos3D1);
  fromPos3D.push(yPos3D1);
  fromPos3D.push(zPos3D1);

  /////////////////////////////////////////////////

  var tillPos = [];
  tmpDis = tillColor[2] * colorspaceRadius;
  tmpRad = degree360ToRad(tillColor[1]*360);
  var xPos2 = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
  var yPos2 = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
  var tmpY2= hueRes-yPos2;
  tillPos.push(xPos2);
  tillPos.push(tmpY2);


  var tillPos3D = [];
  tmpDis = tillColor[2] * hsv3DRadius;
  var xPos3D2 = tmpDis * Math.cos(tmpRad)*-1;
  var yPos3D2 = vStart3D+(vEnd3D-vStart3D)*tillColor[3];
  var zPos3D2 = tmpDis * Math.sin(tmpRad);
  tillPos3D.push(xPos3D2);
  tillPos3D.push(yPos3D2);
  tillPos3D.push(zPos3D2);
  ///////////////////////////////////////////////////////////////////

  var posArray = [fromPos,tillPos,fromPos3D,tillPos3D];
  return posArray;

}

function getLineSegment_LineChart_HSV(fromColor, tillColor, xRatio, xRatio2,vWidth,vHeight){

  var lineChart_xStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-lineChart_xStart;
  var lineChart_yStart=Math.round(vHeight*0.9)
  var heigthVArea=lineChart_yStart-Math.round(vHeight*0.1);

  var fromPos = [];
  var xPos1 = lineChart_xStart + xRatio * plotwidth;
  var yPos11 = Math.round(lineChart_yStart - (heigthVArea * fromColor[1]));
  var yPos12 = Math.round(lineChart_yStart - (heigthVArea * fromColor[2]));
  var yPos13 = Math.round(lineChart_yStart - (heigthVArea * fromColor[3]));

  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xPos2 = lineChart_xStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(lineChart_yStart - (heigthVArea * tillColor[1]));
  var yPos22 = Math.round(lineChart_yStart - (heigthVArea * tillColor[2]));
  var yPos23 = Math.round(lineChart_yStart - (heigthVArea * tillColor[3]));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);
  ///////////////////////////////////////////////////////////////////

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function calcInterpolationLine_Lab(hueRes,vWidth,vHeight){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesLineChart=[];
  var cmsRefRange = ref_GlobalCMS.getRefRange();
  var cmsStartRef = ref_GlobalCMS.getRefPosition(0);

  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;

  for (var i = 0; i < ref_GlobalCMS.getKeyLength() - 1; i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":
        pathplotLinesLineChart.push(getLineSegment_LineChart_Lab(ref_GlobalCMS.getLeftKeyColor(i + 1, "lab"), ref_GlobalCMS.getLeftKeyColor(i + 1, "lab"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      break;

      case "left key":
        pathplotLinesDashed.push(getLineSegment_Hue_Lab(ref_GlobalCMS.getLeftKeyColor(i, "lab"), ref_GlobalCMS.getLeftKeyColor(i + 1, "lab"),hueRes));
        pathplotLinesLineChart.push(getLineSegment_LineChart_Lab(ref_GlobalCMS.getLeftKeyColor(i + 1, "lab"),ref_GlobalCMS.getLeftKeyColor(i + 1, "lab"),((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        break;

      case "twin key":

        pathplotLinesDashed.push(getLineSegment_Hue_Lab(ref_GlobalCMS.getRightKeyColor(i, "lab"), ref_GlobalCMS.getLeftKeyColor(i, "lab"),hueRes));
        // no break because we want to do the default here, too!

      default:

      if(ref_GlobalCMS.get_PP_WorkColorLength(i)==0){
          pathplotLines.push(getLineSegment_Hue_Lab(ref_GlobalCMS.getRightKeyColor(i,"lab"),ref_GlobalCMS.getLeftKeyColor(i+1,"lab"),hueRes));
          pathplotLinesLineChart.push(getLineSegment_LineChart_Lab(ref_GlobalCMS.getRightKeyColor(i,"lab"),ref_GlobalCMS.getLeftKeyColor(i+1,"lab"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
      else {
          pathplotLines.push(getLineSegment_Hue_Lab(ref_GlobalCMS.getRightKeyColor(i,"lab"),ref_GlobalCMS.get_PP_WorkColor(i,0,"lab"),hueRes));
          pathplotLinesLineChart.push(getLineSegment_LineChart_Lab(ref_GlobalCMS.getRightKeyColor(i,"lab"),ref_GlobalCMS.get_PP_WorkColor(i,0,"lab"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.get_PP_WorkColorRef(i,0)-cmsStartRef)/cmsRefRange),vWidth,vHeight));

        for(var j=0; j<ref_GlobalCMS.get_PP_WorkColorLength(i)-1; j++){
          pathplotLines.push(getLineSegment_Hue_Lab(ref_GlobalCMS.get_PP_WorkColor(i,j,"lab"),ref_GlobalCMS.get_PP_WorkColor(i,j+1,"lab"),hueRes));
          pathplotLinesLineChart.push(getLineSegment_LineChart_Lab(ref_GlobalCMS.get_PP_WorkColor(i, j, "lab"),ref_GlobalCMS.get_PP_WorkColor(i, j + 1, "lab"), ((ref_GlobalCMS.get_PP_WorkColorRef(i,j)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.get_PP_WorkColorRef(i,j + 1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        }

        pathplotLines.push(getLineSegment_Hue_Lab(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"lab"),ref_GlobalCMS.getLeftKeyColor(i+1,"lab"),hueRes));
        pathplotLinesLineChart.push(getLineSegment_LineChart_Lab(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"lab"),ref_GlobalCMS.getLeftKeyColor(i+1,"lab"),((ref_GlobalCMS.get_PP_WorkColorRef(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }

    }

  }

}

function getLineSegment_Hue_Lab(fromColor, tillColor,hueRes){

  var canvasCenter = Math.round(hueRes / 2);

  var fromPos = [];

  var xPos1 = ((fromColor[2] / labSpaceRange) * canvasCenter) + canvasCenter;
  var yPos1 = ((fromColor[3] / labSpaceRange) * canvasCenter) + canvasCenter;
  var tmpY = hueRes-yPos1;
  fromPos.push(xPos1);
  fromPos.push(tmpY);

  var fromPos3D = [];
  var xPos3D1 = 0;
  var yPos3D1 = 0;
  var zPos3D1 = 0;
  if(labABMax!=undefined && labABMax!=0){
    var labABMax2 = labABMax*2;
    xPos3D1 = labSPos+((fromColor[2]+labABMax)/labABMax2)*(labEPos-labSPos);
    yPos3D1 = labSPos+(fromColor[1]/100.0)*(labEPos-labSPos);
    zPos3D1 = labEPos-((fromColor[3]+labABMax)/labABMax2)*(labEPos-labSPos);
  }
  fromPos3D.push(xPos3D1);
  fromPos3D.push(yPos3D1);
  fromPos3D.push(zPos3D1);

  /////////////////////////////////////////////////

  var tillPos = [];
  var xPos2 = ((tillColor[2] / labSpaceRange) * canvasCenter) + canvasCenter;
  var yPos2 = ((tillColor[3] / labSpaceRange) * canvasCenter) + canvasCenter;
  var tmpY2 = hueRes-yPos2;
  tillPos.push(xPos2);
  tillPos.push(tmpY2);


  var tillPos3D = [];
  var xPos3D2 = 0;
  var yPos3D2 = 0;
  var zPos3D2 = 0;
  if(labABMax!=undefined && labABMax!=0){
    var labABMax2 = labABMax*2;
    xPos3D2 = labSPos+((tillColor[2]+labABMax)/labABMax2)*(labEPos-labSPos);
    yPos3D2 = labSPos+(tillColor[1]/100.0)*(labEPos-labSPos);
    zPos3D2 = labEPos-((tillColor[3]+labABMax)/labABMax2)*(labEPos-labSPos);
  }
  tillPos3D.push(xPos3D2);
  tillPos3D.push(yPos3D2);
  tillPos3D.push(zPos3D2);
  ///////////////////////////////////////////////////////////////////

  var posArray = [fromPos,tillPos,fromPos3D,tillPos3D];
  return posArray;

}

function getLineSegment_LineChart_Lab(fromColor, tillColor, xRatio, xRatio2,vWidth,vHeight){

  var lineChart_xStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-lineChart_xStart;
  var lineChart_yStart=Math.round(vHeight*0.9)
  var heigthVArea=lineChart_yStart-Math.round(vHeight*0.1);

  var fromPos = [];
  var xPos1 = lineChart_xStart + xRatio * plotwidth;
  var yPos11 = Math.round(lineChart_yStart - (heigthVArea * fromColor[1] / 100));
  var yPos12 = Math.round(lineChart_yStart - (heigthVArea * (fromColor[2]+labSpaceRange) / (labSpaceRange*2)));
  var yPos13 = Math.round(lineChart_yStart - (heigthVArea * (fromColor[3]+labSpaceRange) / (labSpaceRange*2)));
  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xPos2 = lineChart_xStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(lineChart_yStart - (heigthVArea * tillColor[1] / 100));
  var yPos22 = Math.round(lineChart_yStart - (heigthVArea * (tillColor[2]+labSpaceRange) / (labSpaceRange*2)));
  var yPos23 = Math.round(lineChart_yStart - (heigthVArea * (tillColor[3]+labSpaceRange) / (labSpaceRange*2)));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);
  ///////////////////////////////////////////////////////////////////

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function calcInterpolationLine_DIN99(hueRes,vWidth,vHeight){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesLineChart=[];
  var cmsRefRange = ref_GlobalCMS.getRefRange();
  var cmsStartRef = ref_GlobalCMS.getRefPosition(0);

  rangeA99 = rangeA99Pos - rangeA99Neg;
  rangeB99 = rangeB99Pos - rangeB99Neg;

  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;

  for (var i = 0; i < ref_GlobalCMS.getKeyLength() - 1; i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":
        pathplotLinesLineChart.push(getLineSegment_LineChart_DIN99(ref_GlobalCMS.getLeftKeyColor(i + 1, "din99"), ref_GlobalCMS.getLeftKeyColor(i + 1, "din99"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      break;
      case "left key":
        pathplotLinesDashed.push(getLineSegment_Hue_DIN99(ref_GlobalCMS.getLeftKeyColor(i, "din99"), ref_GlobalCMS.getLeftKeyColor(i + 1, "din99"),hueRes));
        pathplotLinesLineChart.push(getLineSegment_LineChart_DIN99(ref_GlobalCMS.getLeftKeyColor(i + 1, "din99"),ref_GlobalCMS.getLeftKeyColor(i + 1, "din99"),((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        break;

      case "twin key":

          pathplotLinesDashed.push(getLineSegment_Hue_DIN99(ref_GlobalCMS.getRightKeyColor(i, "din99"), ref_GlobalCMS.getLeftKeyColor(i, "din99"),hueRes));

          // no break because we want to do the default here, too!

      default:

      if(ref_GlobalCMS.get_PP_WorkColorLength(i)==0){
          pathplotLines.push(getLineSegment_Hue_DIN99(ref_GlobalCMS.getRightKeyColor(i,"din99"),ref_GlobalCMS.getLeftKeyColor(i+1,"din99"),hueRes));
          pathplotLinesLineChart.push(getLineSegment_LineChart_DIN99(ref_GlobalCMS.getRightKeyColor(i,"din99"),ref_GlobalCMS.getLeftKeyColor(i+1,"din99"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));

      }
      else {
          pathplotLines.push(getLineSegment_Hue_DIN99(ref_GlobalCMS.getRightKeyColor(i,"din99"),ref_GlobalCMS.get_PP_WorkColor(i,0,"din99"),hueRes));
          pathplotLinesLineChart.push(getLineSegment_LineChart_DIN99(ref_GlobalCMS.getRightKeyColor(i,"din99"),ref_GlobalCMS.get_PP_WorkColor(i,0,"din99"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.get_PP_WorkColorRef(i,0)-cmsStartRef)/cmsRefRange),vWidth,vHeight));


        for(var j=0; j<ref_GlobalCMS.get_PP_WorkColorLength(i)-1; j++){
          pathplotLines.push(getLineSegment_Hue_DIN99(ref_GlobalCMS.get_PP_WorkColor(i,j,"din99"),ref_GlobalCMS.get_PP_WorkColor(i,j+1,"din99"),hueRes));
          pathplotLinesLineChart.push(getLineSegment_LineChart_DIN99(ref_GlobalCMS.get_PP_WorkColor(i, j, "din99"),ref_GlobalCMS.get_PP_WorkColor(i, j + 1, "din99"), ((ref_GlobalCMS.get_PP_WorkColorRef(i,j)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.get_PP_WorkColorRef(i,j + 1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        }

        pathplotLines.push(getLineSegment_Hue_DIN99(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"din99"),ref_GlobalCMS.getLeftKeyColor(i+1,"din99"),hueRes));
        pathplotLinesLineChart.push(getLineSegment_LineChart_DIN99(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"din99"),ref_GlobalCMS.getLeftKeyColor(i+1,"din99"),((ref_GlobalCMS.get_PP_WorkColorRef(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }

    }

  }

}

function getLineSegment_Hue_DIN99(fromColor, tillColor,hueRes){

  var canvasCenter = Math.round(hueRes / 2);

  var fromPos = [];
  var xPos1 = (fromColor[2] - rangeA99Neg) / rangeA99 * hueRes;
  var yPos1 = (fromColor[3] - rangeB99Neg) / rangeB99 * hueRes;
  var tmpY = hueRes-yPos1;
  fromPos.push(xPos1);
  fromPos.push(tmpY);

  var fromPos3D = [];
  var xPos3D1 = 0;
  var yPos3D1 = 0;
  var zPos3D1 = 0;
  if(din99ABMax!=undefined && din99ABMax!=0){
    var din99ABMax2 = din99ABMax*2;
    xPos3D1 = din99SPos+((fromColor[2]+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
    yPos3D1 = din99SPos+(fromColor[1]/100.0)*(din99EPos-din99SPos);
    zPos3D1 = din99EPos-((fromColor[3]+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
  }
  fromPos3D.push(xPos3D1);
  fromPos3D.push(yPos3D1);
  fromPos3D.push(zPos3D1);

  /////////////////////////////////////////////////

  var tillPos = [];
  var xPos2 = (tillColor[2] - rangeA99Neg) / rangeA99 * hueRes;
  var yPos2 = (tillColor[3] - rangeB99Neg) / rangeB99 * hueRes;
  var tmpY2 = hueRes-yPos2;
  tillPos.push(xPos2);
  tillPos.push(tmpY2);

  var tillPos3D = [];
  var xPos3D2 = 0;
  var yPos3D2 = 0;
  var zPos3D2 = 0;
  if(din99ABMax!=undefined && din99ABMax!=0){
    var din99ABMax2 = din99ABMax*2;
    xPos3D2 = din99SPos+((tillColor[2]+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
    yPos3D2 = din99SPos+(tillColor[1]/100.0)*(din99EPos-din99SPos);
    zPos3D2 = din99EPos-((tillColor[3]+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
  }
  tillPos3D.push(xPos3D2);
  tillPos3D.push(yPos3D2);
  tillPos3D.push(zPos3D2);
  ///////////////////////////////////////////////////////////////////

  var posArray = [fromPos,tillPos,fromPos3D,tillPos3D];
  return posArray;

}

function getLineSegment_LineChart_DIN99(fromColor, tillColor, xRatio, xRatio2,vWidth,vHeight){

  var lineChart_xStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-lineChart_xStart;
  var lineChart_yStart=Math.round(vHeight*0.9)
  var heigthVArea=lineChart_yStart-Math.round(vHeight*0.1);

  var fromPos = [];
  var xPos1 = lineChart_xStart + xRatio * plotwidth;
  var yPos11 = Math.round(lineChart_yStart - (heigthVArea * fromColor[1] / 100));
  var yPos12 = Math.round(lineChart_yStart - (heigthVArea * (fromColor[2]+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
  var yPos13 = Math.round(lineChart_yStart - (heigthVArea * (fromColor[3]+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xPos2 = lineChart_xStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(lineChart_yStart - (heigthVArea * tillColor[1] / 100));
  var yPos22 = Math.round(lineChart_yStart - (heigthVArea * (tillColor[2]+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
  var yPos23 = Math.round(lineChart_yStart - (heigthVArea * (tillColor[3]+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);
  ///////////////////////////////////////////////////////////////////

  var posArray = [fromPos,tillPos];
  return posArray;
}

//////////////////////////////////////////////////////////////////////////////////////////////
function calcInterpolationLine_LCH(hueRes,vWidth,vHeight){
  pathplotLines=[];
  pathplotLinesDashed=[];
  pathplotLinesLineChart=[];
  var cmsRefRange = ref_GlobalCMS.getRefRange();
  var cmsStartRef = ref_GlobalCMS.getRefPosition(0);

  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;

  for (var i = 0; i < ref_GlobalCMS.getKeyLength() - 1; i++) {

    switch (ref_GlobalCMS.getKeyType(i)) {
      case "nil key":
        pathplotLinesLineChart.push(getLineSegment_LineChart_LCH(ref_GlobalCMS.getLeftKeyColor(i + 1, "lch"), ref_GlobalCMS.getLeftKeyColor(i + 1, "lch"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      break;

      case "left key":
        pathplotLinesDashed.push(getLineSegment_Hue_LCH(ref_GlobalCMS.getLeftKeyColor(i, "lch"), ref_GlobalCMS.getLeftKeyColor(i + 1, "lch"),hueRes));
        pathplotLinesLineChart.push(getLineSegment_LineChart_LCH(ref_GlobalCMS.getLeftKeyColor(i + 1, "lch"),ref_GlobalCMS.getLeftKeyColor(i + 1, "lch"),((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        break;

      case "twin key":

        pathplotLinesDashed.push(getLineSegment_Hue_LCH(ref_GlobalCMS.getRightKeyColor(i, "lch"), ref_GlobalCMS.getLeftKeyColor(i, "lch"),hueRes));

      default:

      if(ref_GlobalCMS.get_PP_WorkColorLength(i)==0){
          pathplotLines.push(getLineSegment_Hue_LCH(ref_GlobalCMS.getRightKeyColor(i,"lch"),ref_GlobalCMS.getLeftKeyColor(i+1,"lch"),hueRes));
          pathplotLinesLineChart.push(getLineSegment_LineChart_LCH(ref_GlobalCMS.getRightKeyColor(i,"lch"),ref_GlobalCMS.getLeftKeyColor(i+1,"lch"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }
      else {
        pathplotLines.push(getLineSegment_Hue_LCH(ref_GlobalCMS.getRightKeyColor(i,"lch"),ref_GlobalCMS.get_PP_WorkColor(i,0,"lch"),hueRes));
        pathplotLinesLineChart.push(getLineSegment_LineChart_LCH(ref_GlobalCMS.getRightKeyColor(i,"lch"),ref_GlobalCMS.get_PP_WorkColor(i,0,"lch"), ((ref_GlobalCMS.getRefPosition(i)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.get_PP_WorkColorRef(i,0)-cmsStartRef)/cmsRefRange),vWidth,vHeight));

        for(var j=0; j<ref_GlobalCMS.get_PP_WorkColorLength(i)-1; j++){
          pathplotLines.push(getLineSegment_Hue_LCH(ref_GlobalCMS.get_PP_WorkColor(i,j,"lch"),ref_GlobalCMS.get_PP_WorkColor(i,j+1,"lch"),hueRes));
          pathplotLinesLineChart.push(getLineSegment_LineChart_LCH(ref_GlobalCMS.get_PP_WorkColor(i, j, "lch"),ref_GlobalCMS.get_PP_WorkColor(i, j + 1, "lch"), ((ref_GlobalCMS.get_PP_WorkColorRef(i,j)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.get_PP_WorkColorRef(i,j + 1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
        }
        pathplotLines.push(getLineSegment_Hue_LCH(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"lch"),ref_GlobalCMS.getLeftKeyColor(i+1,"lch"),hueRes));
        pathplotLinesLineChart.push(getLineSegment_LineChart_LCH(ref_GlobalCMS.get_PP_WorkColor(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1,"lch"),ref_GlobalCMS.getLeftKeyColor(i+1,"lch"),((ref_GlobalCMS.get_PP_WorkColorRef(i,ref_GlobalCMS.get_PP_WorkColorLength(i)-1)-cmsStartRef)/cmsRefRange),((ref_GlobalCMS.getRefPosition(i+1)-cmsStartRef)/cmsRefRange),vWidth,vHeight));
      }


    }

  }

}

function getLineSegment_Hue_LCH(fromColor, tillColor,hueRes){

  var colorspaceRadius = Math.round((hueRes*0.95 / 2));
  var colorspaceCenterX = Math.round(hueRes / 2);
  var colorspaceCenterY = Math.round(hueRes / 2);

  var fromPos = [];
  var tmpDis = fromColor[2] * colorspaceRadius;
  var tmpRad = degree360ToRad(fromColor[3]*360);
  var xPos1 = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
  var yPos1 = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
  var tmpY= hueRes-yPos1;
  fromPos.push(xPos1);
  fromPos.push(tmpY);

  var fromPos3D = [];
  tmpDis = fromColor[2] * hsv3DRadius;
  var xPos3D1 = tmpDis * Math.cos(tmpRad)*-1;
  var yPos3D1 = vStart3D+(vEnd3D-vStart3D)*fromColor[1];
  var zPos3D1 = tmpDis * Math.sin(tmpRad);
  fromPos3D.push(xPos3D1);
  fromPos3D.push(yPos3D1);
  fromPos3D.push(zPos3D1);

  /////////////////////////////////////////////////

  var tillPos = [];
  tmpDis = tillColor[2] * colorspaceRadius;
  tmpRad = degree360ToRad(tillColor[3]*360);
  var xPos2 = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
  var yPos2 = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;
  var tmpY2= hueRes-yPos2;
  tillPos.push(xPos2);
  tillPos.push(tmpY2);


  var tillPos3D = [];
  tmpDis = tillColor[2] * hsv3DRadius;
  var xPos3D2 = tmpDis * Math.cos(tmpRad)*-1;
  var yPos3D2 = vStart3D+(vEnd3D-vStart3D)*tillColor[1];
  var zPos3D2 = tmpDis * Math.sin(tmpRad);
  tillPos3D.push(xPos3D2);
  tillPos3D.push(yPos3D2);
  tillPos3D.push(zPos3D2);
  ///////////////////////////////////////////////////////////////////

  var posArray = [fromPos,tillPos,fromPos3D,tillPos3D];
  return posArray;

}

function getLineSegment_LineChart_LCH(fromColor, tillColor, xRatio, xRatio2,vWidth,vHeight){

  var lineChart_xStart=Math.round(vWidth*0.1);
  var plotwidth=Math.round(vWidth*0.98)-lineChart_xStart;
  var lineChart_yStart=Math.round(vHeight*0.9)
  var heigthVArea=lineChart_yStart-Math.round(vHeight*0.1);

  var fromPos = [];
  var xPos1 = lineChart_xStart + xRatio * plotwidth;
  var yPos11 = Math.round(lineChart_yStart - (heigthVArea * fromColor[1]));
  var yPos12 = Math.round(lineChart_yStart - (heigthVArea * fromColor[2]));
  var yPos13 = Math.round(lineChart_yStart - (heigthVArea * fromColor[3]));
  fromPos.push(xPos1);
  fromPos.push(yPos11);
  fromPos.push(yPos12);
  fromPos.push(yPos13);

  var tillPos = [];
  var xPos2 = lineChart_xStart + xRatio2 * plotwidth;
  var yPos21 = Math.round(lineChart_yStart - (heigthVArea * tillColor[1]));
  var yPos22 = Math.round(lineChart_yStart - (heigthVArea * tillColor[2]));
  var yPos23 = Math.round(lineChart_yStart - (heigthVArea * tillColor[3]));
  tillPos.push(xPos2);
  tillPos.push(yPos21);
  tillPos.push(yPos22);
  tillPos.push(yPos23);
  ///////////////////////////////////////////////////////////////////

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

function drawInterpolationLine_LineChart(canvasContex, index){

  canvasContex.beginPath();
  canvasContex.setLineDash([]);

  for (var i = 0; i < pathplotLinesLineChart.length; i++) {
      canvasContex.moveTo(pathplotLinesLineChart[i][0][0], pathplotLinesLineChart[i][0][index+1]);
      canvasContex.lineTo(pathplotLinesLineChart[i][1][0], pathplotLinesLineChart[i][1][index+1]);
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
