//////////////////////////////////////////
// -------------HSV LAB DIN99---------------//
//////////////////////////////////////////
function hueInit() {

  var canvasID = "id_EditPage_PathPlot_SingleCanvas_0";

  var canvasColorspace = document.getElementById(canvasID);
  var canvasObjBox = canvasColorspace.getBoundingClientRect();
  canvasColorspace.width = canvasObjBox.width;
  canvasColorspace.height = canvasObjBox.height;

  var colorspaceContex = canvasColorspace.getContext("2d");

  colorspaceContex.mozImageSmoothingEnabled = false;
  colorspaceContex.webkitImageSmoothingEnabled = false;
  colorspaceContex.msImageSmoothingEnabled = false;
  colorspaceContex.imageSmoothingEnabled = false; // did not work !?!?!
  colorspaceContex.oImageSmoothingEnabled = false;

  var colorspaceBackgroundData = colorspaceContex.getImageData(0, 0, canvasColorspace.width, canvasColorspace.height);

  var colorspaceCenterX = Math.round(canvasColorspace.width / 2);
  var colorspaceCenterY = Math.round(canvasColorspace.height / 2);
  var colorspaceRadius = Math.round((canvasColorspace.width / 2));// * radiusratio);

  var errorRGBColor = new classColor_RGB(0.5, 0.5, 0.5);

  switch (pathColorspace) {
    case "hsv":
      for (var x = 0; x < canvasColorspace.width; x++) {

        for (var y = 0; y < canvasColorspace.height; y++) {

          var dis = Math.sqrt(Math.pow(colorspaceCenterX - x, 2) + Math.pow(colorspaceCenterY - y, 2));

          if (dis <= colorspaceRadius) {
            // calc hsv color

            var ty = (y) - (colorspaceCenterY);
            var tx = x - colorspaceCenterX;
            var angle = (Math.atan2(ty, tx) + Math.PI) / (Math.PI * 2); // values 0-1 ...
            var hVal = angle;
            var sVal = dis / colorspaceRadius;
            var vVal;

            if (mouseGrappedKeyID == -1) {
                vVal = backgroundValue / 100;
            } else {
              switch (mouseGrappedColorSide) {
                case 0:
                  // left color
                  vVal = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "hsv").getVValue();
                  break;
                default:
                  // both colors
                  vVal = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "hsv").getVValue();
              }
            }

            var colorHSV = new classColor_HSV(hVal, sVal, vVal);
            var colorRGB = colorHSV.calcRGBColor();

            if(doColorblindnessSim){
              var tmpLMS = colorRGB.calcLMSColor();
              colorRGB = tmpLMS.calcColorBlindRGBColor();
            }

            var index = (x + y * canvasColorspace.width) * 4;

            colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
            colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
            colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
            colorspaceBackgroundData.data[index + 3] = 255; //a


          }

        }

      }
      break;
    case "lab":

      colorspaceCenterX = Math.round(canvasColorspace.width / 2);
      colorspaceCenterY = Math.round(canvasColorspace.height / 2);

      // draw colorspace
      for (var x = 0; x < canvasColorspace.width; x++) {

        for (var y = 0; y < canvasColorspace.height; y++) {

            // calc hsv color
            var colorRGB;

            var aVal = ((x - colorspaceCenterX) / (canvasColorspace.width / 2)) * labSpaceRange;
            var bVal = ((y - colorspaceCenterY) / (canvasColorspace.height / 2)) * labSpaceRange;
            var lVal = backgroundValue;
            if (mouseGrappedKeyID == -1) {

              var colorLAB = new classColor_LAB(lVal, aVal, bVal);
              colorRGB = colorLAB.calcRGBColor();
            } else {

              switch (mouseGrappedColorSide) {
                case 0:
                  // left color
                  lVal = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "lab").getLValue();
                  break;
                default:
                  // both colors
                  lVal = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "lab").getLValue();
              }


              var colorLAB = new classColor_LAB(lVal, aVal, bVal);

              if (onlyRGBPossibleColor) {
                colorRGB = colorLAB.calcRGBColorCorrect(errorRGBColor);
              } else {
                colorRGB = colorLAB.calcRGBColor();
              }


            } // else

            if(doColorblindnessSim){
              var tmpLMS = colorRGB.calcLMSColor();
              colorRGB = tmpLMS.calcColorBlindRGBColor();
            }

            var index = (x + y * canvasColorspace.width) * 4;

            colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
            colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
            colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
            colorspaceBackgroundData.data[index + 3] = 255; //a

        }

      }
      break;
    case "din99":


      rangeA99 = rangeA99Pos - rangeA99Neg;
      rangeB99 = rangeB99Pos - rangeB99Neg;

      colorspaceCenterX = Math.round(canvasColorspace.width / 2);
      colorspaceCenterY = Math.round(canvasColorspace.height / 2);


      // draw colorspace
      for (var x = 0; x < canvasColorspace.width; x++) {

        for (var y = 0; y < canvasColorspace.height; y++) {


            // calc hsv color
            var colorRGB;

            var a99Val = (x  / canvasColorspace.width) * rangeA99 + rangeA99Neg;
            var b99Val = (y / canvasColorspace.height) * rangeB99 + rangeB99Neg;

            var colorDIN99;

            if (mouseGrappedKeyID == -1) {
              var l99Val;


                l99Val = backgroundValue;


              colorDIN99 = new classColorDIN99(l99Val, a99Val, b99Val);
              colorRGB = colorDIN99.calcRGBColor();
            } else {

              var l99Val;

              switch (mouseGrappedColorSide) {
                case 0:
                  // left color
                  l99Val = globalCMS1.getLeftKeyColor(mouseGrappedKeyID, "din99").getL99Value();
                  break;
                default:
                  // both colors
                  l99Val = globalCMS1.getRightKeyColor(mouseGrappedKeyID, "din99").getL99Value();
              }

              colorDIN99 = new classColorDIN99(l99Val, a99Val, b99Val);

              if (onlyRGBPossibleColor) {
                colorRGB = colorDIN99.calcRGBColorCorrect(errorRGBColor);
              } else {
                colorRGB = colorDIN99.calcRGBColor();
              }

            } // else

            if (colorRGB.getRValue() == 0 && colorRGB.getGValue() == 0 && colorRGB.getBValue() == 0) {
              if (colorDIN99.getL99Value() != 0 || colorDIN99.getA99Value() != 0 || colorDIN99.getB99Value() != 0) {
                colorRGB = new classColor_RGB(1, 1, 1);
              }
            }


            if(doColorblindnessSim){
              var tmpLMS = colorRGB.calcLMSColor();
              colorRGB = tmpLMS.calcColorBlindRGBColor();
            }

            var index = (x + y * canvasColorspace.width) * 4;

            colorspaceBackgroundData.data[index + 0] = Math.round(colorRGB.getRValue() * 255); // r
            colorspaceBackgroundData.data[index + 1] = Math.round(colorRGB.getGValue() * 255); // g
            colorspaceBackgroundData.data[index + 2] = Math.round(colorRGB.getBValue() * 255); // b
            colorspaceBackgroundData.data[index + 3] = 255; //a

        }

      }
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  colorspaceContex.putImageData(colorspaceBackgroundData, 0, 0); // update ColorspaceCanvas;

}

function init_VPlot() {

  var canvasObj0 = document.getElementById("id_EditPage_PathPlot_Canvas1_0");
  var canvasContex0 = canvasObj0.getContext("2d");

  var canvasObj1 = document.getElementById("id_EditPage_PathPlot_Canvas2_0");
  var canvasContex1 = canvasObj1.getContext("2d");

  var canvasObj2 = document.getElementById("id_EditPage_PathPlot_Canvas3_0");
  var canvasContex2 = canvasObj2.getContext("2d");

  drawVPlot(canvasContex0,canvasObj0.width,canvasObj0.height,"");
  drawVPlot(canvasContex1,canvasObj1.width,canvasObj1.height,"");
  drawVPlot(canvasContex2,canvasObj2.width,canvasObj2.height,"");
}

function drawcolormap_hueSpace(calcBackground, drawInterpolationLine, doInitVplot) {



  /*if (doInitVplot)
    init_VPlot();

  if (calcBackground)
    hueInit();*/



  if (drawInterpolationLine){


    for (var i = pathPlotLineGroup.children.length - 1; i >= 0; i--) {
      pathPlotLineGroup.remove(pathPlotLineGroup.children[i]);
    }

    drawInterpolationLineHSV_LAB_DIN99(false);

  }

  for (var i = pathPlotElementsGroup.children.length - 1; i >= 0; i--) {
    pathPlotElementsGroup.remove(pathPlotElementsGroup.children[i]);
  }

  drawElements_HSV_LAB_DIN99(false);




}


function drawElements_HSV_LAB_DIN99(isCompareMap) {

  var canvasColorspace = document.getElementById("id_EditPage_PathPlot_SingleCanvas_2");
  var canvasObjBox = canvasColorspace.getBoundingClientRect();

  canvasColorspace.width = canvasObjBox.width;
  canvasColorspace.height = canvasObjBox.height;

  var colorspaceContex = canvasColorspace.getContext("2d");
  var canvasColorspaceData = colorspaceContex.getImageData(0, 0, canvasColorspace.width, canvasColorspace.height);

  colorspaceContex.mozImageSmoothingEnabled = false;
  colorspaceContex.webkitImageSmoothingEnabled = false;
  colorspaceContex.msImageSmoothingEnabled = false;
  colorspaceContex.imageSmoothingEnabled = false; // did not work !?!?!
  colorspaceContex.oImageSmoothingEnabled = false;

  var canvasVPlot1 = document.getElementById("id_EditPage_PathPlot_Canvas1_2");
  var canvasVPlot2 = document.getElementById("id_EditPage_PathPlot_Canvas2_2");
  var canvasVPlot3 = document.getElementById("id_EditPage_PathPlot_Canvas3_2");


  var canvasObjBox = canvasVPlot1.getBoundingClientRect();

  canvasVPlot1.width = canvasObjBox.width;
  canvasVPlot1.height = canvasObjBox.height;

  canvasVPlot2.width = canvasObjBox.width;
  canvasVPlot2.height = canvasObjBox.height;

  canvasVPlot3.width = canvasObjBox.width;
  canvasVPlot3.height = canvasObjBox.height;

  var vPlotContex1 = canvasVPlot1.getContext("2d");
  var vPlotContex2 = canvasVPlot2.getContext("2d");
  var vPlotContex3 = canvasVPlot3.getContext("2d");

  vPlotContex1.mozImageSmoothingEnabled = false;
  vPlotContex1.webkitImageSmoothingEnabled = false;
  vPlotContex1.msImageSmoothingEnabled = false;
  vPlotContex1.imageSmoothingEnabled = false; // did not work !?!?!
  vPlotContex1.oImageSmoothingEnabled = false;

  vPlotContex2.mozImageSmoothingEnabled = false;
  vPlotContex2.webkitImageSmoothingEnabled = false;
  vPlotContex2.msImageSmoothingEnabled = false;
  vPlotContex2.imageSmoothingEnabled = false; // did not work !?!?!
  vPlotContex2.oImageSmoothingEnabled = false;

  vPlotContex3.mozImageSmoothingEnabled = false;
  vPlotContex3.webkitImageSmoothingEnabled = false;
  vPlotContex3.msImageSmoothingEnabled = false;
  vPlotContex3.imageSmoothingEnabled = false; // did not work !?!?!
  vPlotContex3.oImageSmoothingEnabled = false;

  var vPlotyStart = Math.round(canvasVPlot1.height * 0.9);
  var vPlotyEnd = Math.round(canvasVPlot1.height * 0.1);
  var vPlotxStart = Math.round(canvasVPlot1.width * 0.1);
  var vPlotxEnd = Math.round(canvasVPlot1.width * 0.85);
  var heigthVArea = vPlotyStart - vPlotyEnd;
  var plotwidth = vPlotxEnd - vPlotxStart;

  /////////////////////////////////////////////////////////////////



  /////////////////////////////////////////////////////////////////

  var xPos, yPos, xPos2, yPos2, xVPos, xVPos2, tmpColor, tmpColor2;
  xVPos = 0;
  xVPos2 = 0;

  var csModus=pathColorspace;
  if((pathColorspace=="lab" || pathColorspace=="din99") && onlyRGBPossibleColor){
    if(pathColorspace=="lab")
    csModus = "lab_rgb_possible";
    if(pathColorspace=="din99")
    csModus = "din99_rgb_possible";
  }

    workCMS = globalCMS1;

    for (var i = 0; i < workCMS.getKeyLength(); i++) {

      switch (workCMS.getKeyType(i)) {
        case "nil key":
          // do nothing

          break;
        case "twin key":

            tmpColor = workCMS.getLeftKeyColor(i, csModus);


          var drawCircle = true;

          if (workCMS.getKeyType(i - 1) === "nil key" || workCMS.getKeyType(i - 1) === "left key")
            drawCircle = false;

          ////////////////////////////////////////////////////////////////
          /////// left Color

          drawHueElement(tmpColor, canvasColorspace.width, canvasColorspace.height, drawCircle, colorspaceContex, i, 0);

          ////////////////////////////////////////////////////////////////
          /////// Right Color

          var tmpColor2 = workCMS.getRightKeyColor(i, csModus);

          drawHueElement(tmpColor2, canvasColorspace.width, canvasColorspace.height, true, colorspaceContex, i, 1);


          ////////////////////////////////////////////////////////////////
          /////// V Plot

          if (drawCircle) {
            drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex1,vPlotContex2,vPlotContex3, i, 0);
            drawVElement(tmpColor2, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex1,vPlotContex2,vPlotContex3, i, 1);
          } else {

            drawVElement(tmpColor, workCMS.getRefPosition(i - 1), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex1,vPlotContex2,vPlotContex3, i, 0);
            drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex1,vPlotContex2,vPlotContex3, i, 0);
            drawVElement(tmpColor2, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex1,vPlotContex2,vPlotContex3, i, 1);

          }

          break;
        case "left key":

          var drawCircle = true;
          if (workCMS.getKeyType(i - 1) === "nil key" || workCMS.getKeyType(i - 1) === "left key")
            drawCircle = false;

          ////////////////////////////////////////////////////////////////
          /////// left Color

            tmpColor = workCMS.getLeftKeyColor(i, csModus);

          drawHueElement(tmpColor, canvasColorspace.width, canvasColorspace.height, drawCircle, colorspaceContex, i, 0);

          ////////////////////////////////////////////////////////
          ///// Right Color

          // do nothing

          ////////////////////////////////////////////////////////////////
          /////// V Plot

          if (drawCircle) {
            drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex1,vPlotContex2,vPlotContex3, i, 0);
          } else {
            drawVElement(tmpColor, workCMS.getRefPosition(i - 1), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex1,vPlotContex2,vPlotContex3, i, 0);
            drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex1,vPlotContex2,vPlotContex3, i, 0);
          }
          break;

        case "right key":

            tmpColor = workCMS.getRightKeyColor(i, csModus);

          drawHueElement(tmpColor, canvasColorspace.width, canvasColorspace.height, true, colorspaceContex, i, 1);

          ////////////////////////////////////////////////////////////////
          /////// V Plot

          drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex1,vPlotContex2,vPlotContex3, i, 1);

          break;
        default:
          // dual Key

          tmpColor = workCMS.getRightKeyColor(i, csModus);

          drawHueElement(tmpColor, canvasColorspace.width, canvasColorspace.height, true, colorspaceContex, i, 2);

          ////////////////////////////////////////////////////////////////
          /////// V Plot

          drawVElement(tmpColor, workCMS.getRefPosition(i), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, true, vPlotContex1,vPlotContex2,vPlotContex3, i, 2);


          if(workCMS.getKeyType(i-1)==="left key"){
            drawVElement(tmpColor, workCMS.getRefPosition(i - 1), workCMS.getRefPosition(0), workCMS.getRefRange(), vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex1,vPlotContex2,vPlotContex3, i, 2);
          }
      }

    }




}


function drawInterpolationLineHSV_LAB_DIN99(isCompareMap) {

  pathplotLines1 = [];
  pathplotLines2 = [];
  pathplotLines3 = [];
  pathplotLines4 = [];


  var canvasColorspace = document.getElementById("id_EditPage_PathPlot_SingleCanvas_1");
  var canvasObjBox = canvasColorspace.getBoundingClientRect();


  canvasColorspace.width = canvasObjBox.width;
  canvasColorspace.height = canvasObjBox.height;

  var colorspaceContex = canvasColorspace.getContext("2d");
  var canvasColorspaceData = colorspaceContex.getImageData(0, 0, canvasColorspace.width, canvasColorspace.height);

  colorspaceContex.mozImageSmoothingEnabled = false;
  colorspaceContex.webkitImageSmoothingEnabled = false;
  colorspaceContex.msImageSmoothingEnabled = false;
  colorspaceContex.imageSmoothingEnabled = false; // did not work !?!?!
  colorspaceContex.oImageSmoothingEnabled = false;

  var canvasVPlot1 = document.getElementById("id_EditPage_PathPlot_Canvas1_1");
  var canvasVPlot2 = document.getElementById("id_EditPage_PathPlot_Canvas2_1");
  var canvasVPlot3 = document.getElementById("id_EditPage_PathPlot_Canvas3_1");
  canvasObjBox = canvasVPlot1.getBoundingClientRect();

  canvasVPlot1.width = canvasObjBox.width;
  canvasVPlot1.height = canvasObjBox.height;

  canvasVPlot2.width = canvasObjBox.width;
  canvasVPlot2.height = canvasObjBox.height;

  canvasVPlot3.width = canvasObjBox.width;
  canvasVPlot3.height = canvasObjBox.height;

  var vPlotContex1 = canvasVPlot1.getContext("2d");
  var vPlotContex2 = canvasVPlot2.getContext("2d");
  var vPlotContex3 = canvasVPlot3.getContext("2d");

  vPlotContex1.mozImageSmoothingEnabled = false;
  vPlotContex1.webkitImageSmoothingEnabled = false;
  vPlotContex1.msImageSmoothingEnabled = false;
  vPlotContex1.imageSmoothingEnabled = false; // did not work !?!?!
  vPlotContex1.oImageSmoothingEnabled = false;

  vPlotContex2.mozImageSmoothingEnabled = false;
  vPlotContex2.webkitImageSmoothingEnabled = false;
  vPlotContex2.msImageSmoothingEnabled = false;
  vPlotContex2.imageSmoothingEnabled = false; // did not work !?!?!
  vPlotContex2.oImageSmoothingEnabled = false;

  vPlotContex3.mozImageSmoothingEnabled = false;
  vPlotContex3.webkitImageSmoothingEnabled = false;
  vPlotContex3.msImageSmoothingEnabled = false;
  vPlotContex3.imageSmoothingEnabled = false; // did not work !?!?!
  vPlotContex3.oImageSmoothingEnabled = false;

  var vPlotyStart = Math.round(canvasVPlot1.height * 0.9);
  var vPlotyEnd = Math.round(canvasVPlot1.height * 0.1);
  var vPlotxStart = Math.round(canvasVPlot1.width * 0.1);
  var vPlotxEnd = Math.round(canvasVPlot1.width * 0.85);
  var heigthVArea = vPlotyStart - vPlotyEnd;
  var plotwidth = vPlotxEnd - vPlotxStart;

  globalCMS1.calcDeltaIntervalColors(intervalDelta, 0,globalCMS1.getKeyLength()-1);


  var tmpColor, tmpColor2, xPos, xPos2, yPos, yPos2;


        workCMS = globalCMS1;


    var csModus=pathColorspace;
    if((pathColorspace=="lab" || pathColorspace=="din99") && onlyRGBPossibleColor){
      if(pathColorspace=="lab")
      csModus = "lab_rgb_possible";
      if(pathColorspace=="din99")
      csModus = "din99_rgb_possible";
    }


    for (var i = 0; i < workCMS.getKeyLength() - 1; i++) {

      switch (workCMS.getKeyType(i)) {
        case "nil key":
          //drawHueLine(workCMS.getLeftKeyColor(i,pathColorspace),workCMS.getLeftKeyColor(i+1,pathColorspace),xWidth,yHeight,xStart,yStart,xEnd,yEnd,colorspaceRadius, colorspaceCenterY, colorspaceCenterX, isDashed,compareColor,colorspaceContex);
          drawVLine(workCMS.getLeftKeyColor(i + 1, csModus),
            workCMS.getLeftKeyColor(i + 1, csModus),
            workCMS.getRefPosition(i),
            workCMS.getRefPosition(i + 1),
            workCMS.getRefPosition(0),
            workCMS.getRefRange(),
            vPlotxStart, vPlotyStart, heigthVArea, plotwidth);
          break;
        case "twin key":
          var intervalIndexA = workCMS.getIntervalPositions(i);
          drawHueLine(workCMS.getLeftKeyColor(i, pathColorspace), workCMS.getRightKeyColor(i, csModus), canvasColorspace.width, canvasColorspace.height, true, colorspaceContex);

            for (var j = intervalIndexA[0]; j < intervalIndexA[1]; j++) {
              drawHueLine(workCMS.getIntervalColor(j, csModus), workCMS.getIntervalColor(j + 1, csModus), canvasColorspace.width, canvasColorspace.height, false, colorspaceContex);
              drawVLine(workCMS.getIntervalColor(j, csModus),
                workCMS.getIntervalColor(j + 1, csModus),
                workCMS.getIntervalRef(j),
                workCMS.getIntervalRef(j + 1),
                workCMS.getRefPosition(0),
                workCMS.getRefRange(),
                vPlotxStart, vPlotyStart, heigthVArea, plotwidth);
            }
          break;
        case "left key":
          drawHueLine(workCMS.getLeftKeyColor(i, csModus), workCMS.getLeftKeyColor(i + 1, csModus), canvasColorspace.width, canvasColorspace.height, true,  colorspaceContex);
          drawVLine(workCMS.getLeftKeyColor(i + 1, csModus),
            workCMS.getLeftKeyColor(i + 1, csModus),
            workCMS.getRefPosition(i),
            workCMS.getRefPosition(i + 1),
            workCMS.getRefPosition(0),
            workCMS.getRefRange(),
            vPlotxStart, vPlotyStart, heigthVArea, plotwidth);
          break;
        default:

          var intervalIndexA = workCMS.getIntervalPositions(i);

          if(workCMS.getKeyType(i)=="dual key"){
            // we do not save the interval colors for dual key double -> it is easier for the analyze algorithm
            drawHueLine(workCMS.getLeftKeyColor(i,csModus), workCMS.getIntervalColor(intervalIndexA[0],csModus), canvasColorspace.width, canvasColorspace.height, false,  colorspaceContex);
            drawVLine(workCMS.getLeftKeyColor(i,csModus),
              workCMS.getIntervalColor(intervalIndexA[0],csModus),
              workCMS.getRefPosition(i),
              workCMS.getIntervalRef(intervalIndexA[0]),
              workCMS.getRefPosition(0),
              workCMS.getRefRange(),
              vPlotxStart, vPlotyStart, heigthVArea, plotwidth);
          }

            for (var j = intervalIndexA[0]; j < intervalIndexA[1]; j++) {
              drawHueLine(workCMS.getIntervalColor(j, csModus), workCMS.getIntervalColor(j + 1, csModus), canvasColorspace.width, canvasColorspace.height, false,  colorspaceContex);
              drawVLine(workCMS.getIntervalColor(j, csModus),
                workCMS.getIntervalColor(j + 1, csModus),
                workCMS.getIntervalRef(j),
                workCMS.getIntervalRef(j + 1),
                workCMS.getRefPosition(0),
                workCMS.getRefRange(),
                vPlotxStart, vPlotyStart, heigthVArea, plotwidth);
            }

      }


    }



  colorspaceContex.beginPath();
  vPlotContex1.beginPath();
  vPlotContex2.beginPath();
  vPlotContex3.beginPath();

  colorspaceContex.setLineDash([]);
  vPlotContex1.setLineDash([]);
  vPlotContex2.setLineDash([]);
  vPlotContex3.setLineDash([]);

  for (var i = 0; i < pathplotLines1.length/4; i++) {

      var index = i*4;
      colorspaceContex.moveTo(pathplotLines1[index], pathplotLines1[index+1]);
      colorspaceContex.lineTo(pathplotLines1[index+2], pathplotLines1[index+3]);

      vPlotContex1.moveTo(pathplotLines2[index], pathplotLines2[index+1]);
      vPlotContex1.lineTo(pathplotLines2[index+2], pathplotLines2[index+3]);

      vPlotContex2.moveTo(pathplotLines3[index], pathplotLines3[index+1]);
      vPlotContex2.lineTo(pathplotLines3[index+2], pathplotLines3[index+3]);

      vPlotContex3.moveTo(pathplotLines4[index], pathplotLines4[index+1]);
      vPlotContex3.lineTo(pathplotLines4[index+2], pathplotLines4[index+3]);

  }

  colorspaceContex.lineWidth=bigLineWidth;
  vPlotContex1.lineWidth=bigLineWidth;
  vPlotContex2.lineWidth=bigLineWidth;
  vPlotContex3.lineWidth=bigLineWidth;

  colorspaceContex.strokeStyle = 'rgb(0,0,0)';
  vPlotContex1.strokeStyle = 'rgb(0,0,0)';
  vPlotContex2.strokeStyle = 'rgb(0,0,0)';
  vPlotContex3.strokeStyle = 'rgb(0,0,0)';


  colorspaceContex.stroke();
  vPlotContex1.stroke();
  vPlotContex2.stroke();
  vPlotContex3.stroke();

  colorspaceContex.lineWidth=smallLineWidth;
  vPlotContex1.lineWidth=smallLineWidth;
  vPlotContex2.lineWidth=smallLineWidth;
  vPlotContex3.lineWidth=smallLineWidth;

  colorspaceContex.strokeStyle = 'rgb(255,255,255)';
  vPlotContex1.strokeStyle = 'rgb(255,255,255)';
  vPlotContex2.strokeStyle = 'rgb(255,255,255)';
  vPlotContex3.strokeStyle = 'rgb(255,255,255)';

  colorspaceContex.stroke();
  vPlotContex1.stroke();
  vPlotContex2.stroke();
  vPlotContex3.stroke();



}

function drawHueElement(tmpColor, canvasColorspaceWidth, canvasColorspaceHeight, drawCircle, colorspaceContex, keyIndex, colorSide) {

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
  }

  var xPos3D = undefined;
  var yPos3D = undefined;
  var zPos3D = undefined;

  var colorspaceCenterX = Math.round(canvasColorspaceWidth/2);
  var colorspaceCenterY = Math.round(canvasColorspaceHeight/2);

  switch (pathColorspace) {
    case "hsv":

      var colorspaceRadius = Math.round((canvasColorspaceWidth / 2));

      var tmpDis = tmpColor.getSValue() * colorspaceRadius;
      var tmpRad = (tmpColor.getHValue() * Math.PI * 2) - Math.PI;
      xPos = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
      yPos = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;

      tmpDis = tmpColor.getSValue() * hsv3DRadius;
      xPos3D = tmpDis * Math.cos(tmpRad);
      yPos3D = vStart3D+(vEnd3D-vStart3D)*tmpColor.getVValue();
      zPos3D = tmpDis * Math.sin(tmpRad);
      break;
    case "lab":
      xPos = ((tmpColor.getAValue() / labSpaceRange) * canvasColorspaceWidth / 2) + colorspaceCenterX;
      yPos = ((tmpColor.getBValue() / labSpaceRange) * canvasColorspaceHeight / 2) + colorspaceCenterY;

      if(positionsLAB.length!=0){
        var labABMax2 = labABMax*2;
        xPos3D = labSPos+((tmpColor.get2Value()+labABMax)/labABMax2)*(labEPos-labSPos);
        yPos3D = labSPos+(tmpColor.get1Value()/100.0)*(labEPos-labSPos);
        zPos3D = labSPos+((tmpColor.get3Value()+labABMax)/labABMax2)*(labEPos-labSPos);
      }


      break;
    case "din99":
      xPos = (tmpColor.getA99Value() - rangeA99Neg) / rangeA99 * canvasColorspaceWidth;
      yPos = (tmpColor.getB99Value() - rangeB99Neg) / rangeB99 * canvasColorspaceHeight;

      if(positionsDIN99.length!=0){
        var din99ABMax2 = din99ABMax*2;
        xPos3D = din99SPos+((tmpColor.get2Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
        yPos3D = din99SPos+(tmpColor.get1Value()/100.0)*(din99EPos-din99SPos);
        zPos3D = din99SPos+((tmpColor.get3Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
      }

      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  drawElement(showColor.getRGBString(), colorspaceContex, xPos, yPos, keyIndex, colorSide, drawCircle);

  if(xPos3D!=undefined){
    draw3DElement(showColor.getHexString(), xPos3D, yPos3D, zPos3D, keyIndex,colorSide, drawCircle);
  }

}

function drawVElement(tmpColor, currentRef, startRef, rangeSize, vPlotxStart, vPlotyStart, heigthVArea, plotwidth, drawCircle, vPlotContex1,vPlotContex2,vPlotContex3, keyIndex, colorSide) {

  var showColor = tmpColor.calcRGBColor();
  if(doColorblindnessSim){
    var tmpLMS = showColor.calcLMSColor();
    showColor = tmpLMS.calcColorBlindRGBColor();
  }


  var xVPos = vPlotxStart + ((currentRef - startRef) / rangeSize) * plotwidth;

  var yPos;
  switch (pathColorspace) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getHValue()));
      break;
    case "lab":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getLValue() / 100));
      break;
    case "din99":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getL99Value() / 100));
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  drawElement(showColor.getRGBString(), vPlotContex1, xVPos, yPos, keyIndex, colorSide, drawCircle);

  switch (pathColorspace) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getSValue()));
      break;
    case "lab":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getAValue()+labSpaceRange) / (labSpaceRange*2)));
      break;
    case "din99":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getA99Value()+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  drawElement(showColor.getRGBString(), vPlotContex2, xVPos, yPos, keyIndex, colorSide, drawCircle);

  switch (pathColorspace) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getVValue()));
      break;
    case "lab":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getBValue()+labSpaceRange) / (labSpaceRange*2)));
      break;
    case "din99":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  drawElement(showColor.getRGBString(), vPlotContex3, xVPos, yPos, keyIndex, colorSide, drawCircle);


}

function drawHueLine(tmpColor, tmpColor2, canvasColorspaceWidth, canvasColorspaceHeight, isDashed, colorspaceContex) {
  // RG

  var xPos3D1 = undefined;
  var yPos3D1 = undefined;
  var zPos3D1 = undefined;

  var xPos3D2 = undefined;
  var yPos3D2 = undefined;
  var zPos3D2 = undefined;

  var colorspaceCenterX = Math.round(canvasColorspaceWidth/2);
  var colorspaceCenterY = Math.round(canvasColorspaceHeight/2);

  switch (pathColorspace) {
    case "hsv":
      var colorspaceRadius = Math.round((canvasColorspaceWidth / 2));
      var tmpDis = tmpColor.getSValue() * colorspaceRadius;
      var tmpRad = (tmpColor.getHValue() * Math.PI * 2) - Math.PI;
      xPos = tmpDis * Math.cos(tmpRad) + colorspaceCenterX;
      yPos = tmpDis * Math.sin(tmpRad) + colorspaceCenterY;

      var tmpDis2 = tmpColor2.getSValue() * colorspaceRadius;
      var tmpRad2 = (tmpColor2.getHValue() * Math.PI * 2) - Math.PI;
      xPos2 = tmpDis2 * Math.cos(tmpRad2) + colorspaceCenterX;
      yPos2 = tmpDis2 * Math.sin(tmpRad2) + colorspaceCenterY;

      tmpDis = tmpColor.getSValue() * hsv3DRadius;
      xPos3D1 = tmpDis * Math.cos(tmpRad);
      yPos3D1 = vStart3D+(vEnd3D-vStart3D)*tmpColor.getVValue();
      zPos3D1 = tmpDis * Math.sin(tmpRad);

      tmpDis2 = tmpColor2.getSValue() * hsv3DRadius;
      xPos3D2 = tmpDis2 * Math.cos(tmpRad2);
      yPos3D2 = vStart3D+(vEnd3D-vStart3D)*tmpColor2.getVValue();
      zPos3D2 = tmpDis2 * Math.sin(tmpRad2);
      break;
    case "lab":
      xPos = ((tmpColor.getAValue() / labSpaceRange) * canvasColorspaceWidth / 2) + colorspaceCenterX;
      yPos = ((tmpColor.getBValue() / labSpaceRange) * canvasColorspaceHeight / 2) + colorspaceCenterY;

      xPos2 = ((tmpColor2.getAValue() / labSpaceRange) * canvasColorspaceWidth / 2) + colorspaceCenterX;
      yPos2 = ((tmpColor2.getBValue() / labSpaceRange) * canvasColorspaceHeight / 2) + colorspaceCenterY;

      if(positionsLAB.length!=0){
        var labABMax2 = labABMax*2;
        xPos3D1 = labSPos+((tmpColor.get2Value()+labABMax)/labABMax2)*(labEPos-labSPos);
        yPos3D1 = labSPos+(tmpColor.get1Value()/100.0)*(labEPos-labSPos);
        zPos3D1 = labSPos+((tmpColor.get3Value()+labABMax)/labABMax2)*(labEPos-labSPos);

        xPos3D2 = labSPos+((tmpColor2.get2Value()+labABMax)/labABMax2)*(labEPos-labSPos);
        yPos3D2 = labSPos+(tmpColor2.get1Value()/100.0)*(labEPos-labSPos);
        zPos3D2 = labSPos+((tmpColor2.get3Value()+labABMax)/labABMax2)*(labEPos-labSPos);
      }

      break;
    case "din99":
      xPos = (tmpColor.getA99Value() - rangeA99Neg) / rangeA99 * canvasColorspaceWidth;
      yPos = (tmpColor.getB99Value() - rangeB99Neg) / rangeB99 * canvasColorspaceHeight;

      xPos2 = (tmpColor2.getA99Value() - rangeA99Neg) / rangeA99 * canvasColorspaceWidth;
      yPos2 = (tmpColor2.getB99Value() - rangeB99Neg) / rangeB99 * canvasColorspaceHeight;

      if(positionsDIN99.length!=0){
        var din99ABMax2 = din99ABMax*2;
        xPos3D1 = din99SPos+((tmpColor.get2Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
        yPos3D1 = din99SPos+(tmpColor.get1Value()/100.0)*(din99EPos-din99SPos);
        zPos3D1 = din99SPos+((tmpColor.get3Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);

        xPos3D2 = din99SPos+((tmpColor2.get2Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
        yPos3D2 = din99SPos+(tmpColor2.get1Value()/100.0)*(din99EPos-din99SPos);
        zPos3D2 = din99SPos+((tmpColor2.get3Value()+din99ABMax)/din99ABMax2)*(din99EPos-din99SPos);
      }

      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  if(isDashed)
    drawLine(colorspaceContex, xPos, yPos, xPos2, yPos2);
  else{
    pathplotLines1.push(xPos);
    pathplotLines1.push(yPos);
    pathplotLines1.push(xPos2);
    pathplotLines1.push(yPos2);
  }

  if(xPos3D1!=undefined)
    draw3DLine(xPos3D1, yPos3D1, zPos3D1, xPos3D2, yPos3D2, zPos3D2, isDashed);


}

function drawVLine(tmpColor, tmpColor2, ref, ref2, startRef, rangeSize, vPlotxStart, vPlotyStart, heigthVArea, plotwidth) {
  var xPos = vPlotxStart + ((ref - startRef) / rangeSize) * plotwidth;
  var xPos2 = vPlotxStart + ((ref2 - startRef) / rangeSize) * plotwidth;

  var yPos, yPos2;
  switch (pathColorspace) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getHValue()));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor2.getHValue()));
      break;
    case "lab":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getLValue() / 100));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor2.getLValue() / 100));
      break;
    case "din99":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getL99Value() / 100));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor2.getL99Value() / 100));
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }


  pathplotLines2.push(xPos);
  pathplotLines2.push(yPos);
  pathplotLines2.push(xPos2);
  pathplotLines2.push(yPos2);


  switch (pathColorspace) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getSValue()));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor2.getSValue()));
      break;
    case "lab":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getAValue()+labSpaceRange) / (labSpaceRange*2)));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * (tmpColor2.getAValue()+labSpaceRange) / (labSpaceRange*2)));
      break;
    case "din99":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getA99Value()+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * (tmpColor2.getA99Value()+(rangeA99Neg*-1)) / (rangeA99Pos-rangeA99Neg)));
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  pathplotLines3.push(xPos);
  pathplotLines3.push(yPos);
  pathplotLines3.push(xPos2);
  pathplotLines3.push(yPos2);

  switch (pathColorspace) {
    case "hsv":
      yPos = Math.round(vPlotyStart - (heigthVArea * tmpColor.getVValue()));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * tmpColor2.getVValue()));
      break;
    case "lab":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getBValue()+labSpaceRange) / (labSpaceRange*2)));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * (tmpColor2.getBValue()+labSpaceRange) / (labSpaceRange*2)));
      break;
    case "din99":
      yPos = Math.round(vPlotyStart - (heigthVArea * (tmpColor.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
      yPos2 = Math.round(vPlotyStart - (heigthVArea * (tmpColor2.getB99Value()+(rangeB99Neg*-1)) / (rangeB99Pos-rangeB99Neg)));
      break;
    default:
      console.log("Error at the changeColorspace function");
      return;
  }

  pathplotLines4.push(xPos);
  pathplotLines4.push(yPos);
  pathplotLines4.push(xPos2);
  pathplotLines4.push(yPos2);
}
