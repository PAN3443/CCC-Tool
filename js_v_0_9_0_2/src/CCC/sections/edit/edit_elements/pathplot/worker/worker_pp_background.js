
/// color settings
// 2000
var de2000_k_L = 1.0,
  de2000_k_C = 1.0,
  de2000_k_H = 1.0;

// 94
var de94_k_L = 1.0,
  de94_k_C = 1.0,
  de94_k_H = 1.0;
var de94_k_1 = 0.045,
  de94_k_2 = 0.015;

var din99_kE = 1;
var din99_kCH = 1;
var cielab_ref_X = 94.811;
var cielab_ref_Y = 100.000;
var cielab_ref_Z = 107.304;

// Simulation Colorblindness
var tmXYZ_Selected = [
  [0.4124564, 0.3575761, 0.1804375],
  [0.2126729, 0.7151522, 0.0721750],
  [0.0193339, 0.1191920, 0.9503041]
];
var tmXYZ_Selected_Inv = [
  [3.2404542, -1.5371385, -0.4985314],
  [-0.9692660, 1.8760108, 0.0415560],
  [0.0556434, -0.2040259, 1.0572252]
];
var tmLMS_Selected = [
  [0.38971, 0.68898, -0.07868],
  [-0.22981, 1.18340, 0.04641],
  [0, 0, 1]
];
var tmLMS_Selected_Inv = [
  [5917000000 / 3097586539, -3444900000 / 3097586539, 625427369 / 3097586539],
  [1149050000 / 3097586539, 1948550000 / 3097586539, -49903 / 6195173078],
  [0, 0, 1]
];
var sim_AdaptiveColorblindness = undefined;



self.addEventListener('message', function(e) {

  switch (e.data.message) {

    case "init":
      self.importScripts('../../../../../../Global/color/class_Colorspace_Basis.js');
      self.importScripts('../../../../../../Global/color/class_Colorspace_RGB.js');
      self.importScripts('../../../../../../Global/color/class_Colorspace_XYZ.js');
      self.importScripts('../../../../../../Global/color/class_Colorspace_LMS.js');
      self.importScripts('../../../../../../Global/color/class_Colorspace_HSV.js');
      self.importScripts('../../../../../../Global/color/class_Colorspace_LAB.js');
      self.importScripts('../../../../../../Global/color/class_Colorspace_LCH.js');
      self.importScripts('../../../../../../Global/color/class_Colorspace_DIN99.js');

      self.importScripts('../../../../../../Global/worker/general_processingCases.js');
      self.importScripts('../../../../../../Global/helper/math.js');
    break;
    case "getBackground":
      var hueResolution = parseInt(e.data.hueResolution);
      switch (e.data.pp_space) {
        case "rgb":
          var canvasData_GR = new ImageData(hueResolution, hueResolution);
          var canvasData_BR = new ImageData(hueResolution, hueResolution);
          var canvasData_GB = new ImageData(hueResolution, hueResolution);

          var xStart = hueResolution * 0.1;
          var yStart = hueResolution * 0.9;
          var xEnd = hueResolution * 0.8;
          var yEnd = hueResolution * 0.2;
          var xWidth = xEnd - xStart;
          var yHeight = yStart - yEnd;

          var tmpRGB_GR = new class_Color_RGB(0,0,0);
          var tmpRGB_BR = new class_Color_RGB(0,0,0);
          var tmpRGB_GB = new class_Color_RGB(0,0,0);

          if(e.data.fixedValue1!=undefined){
            tmpRGB_GR.set3Value(e.data.fixedValue3);
            tmpRGB_BR.set2Value(e.data.fixedValue2);
            tmpRGB_GB.set1Value(e.data.fixedValue1);
          }

          var deleteColors = [];
          for (var x = 0; x < hueResolution; x++) {
            for (var y = 0; y < hueResolution; y++) {

              if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
                // calc hsv color
                var indices = getColorIndicesForCoord(x, y, hueResolution);

                var xVal = (x - xStart) / xWidth;
                var yVal = (yStart - y) / yHeight;

                tmpRGB_GR.set1Value(yVal);
                tmpRGB_GR.set2Value(xVal);

                tmpRGB_BR.set1Value(yVal);
                tmpRGB_BR.set3Value(xVal);

                tmpRGB_GB.set2Value(xVal);
                tmpRGB_GB.set3Value(yVal);

                if(e.data.doColorblindnessSim){
                  var tmpLMS = tmpRGB_GR.calcLMSColor();
                  tmpRGB_GR.deleteReferences();
                  tmpRGB_GR = tmpLMS.calcColorBlindRGBColor();
                  tmpLMS.deleteReferences();

                  tmpLMS = tmpRGB_BR.calcLMSColor();
                  tmpRGB_BR.deleteReferences();
                  tmpRGB_BR = tmpLMS.calcColorBlindRGBColor();
                  tmpLMS.deleteReferences();

                  tmpLMS = tmpRGB_GB.calcLMSColor();
                  tmpRGB_GB.deleteReferences();
                  tmpRGB_GB = tmpLMS.calcColorBlindRGBColor();
                  tmpLMS.deleteReferences();
                }

                canvasData_GR.data[indices[0]] = Math.round(tmpRGB_GR.get1Value() * 255); // r
                canvasData_GR.data[indices[1]] = Math.round(tmpRGB_GR.get2Value() * 255); // g
                canvasData_GR.data[indices[2]] = Math.round(tmpRGB_GR.get3Value() * 255); // b
                canvasData_GR.data[indices[3]] = 255; //a

                canvasData_BR.data[indices[0]] = Math.round(tmpRGB_BR.get1Value() * 255); // r
                canvasData_BR.data[indices[1]] = Math.round(tmpRGB_BR.get2Value() * 255); // g
                canvasData_BR.data[indices[2]] = Math.round(tmpRGB_BR.get3Value() * 255); // b
                canvasData_BR.data[indices[3]] = 255; //a

                canvasData_GB.data[indices[0]] = Math.round(tmpRGB_GB.get1Value() * 255); // r
                canvasData_GB.data[indices[1]] = Math.round(tmpRGB_GB.get2Value() * 255); // g
                canvasData_GB.data[indices[2]] = Math.round(tmpRGB_GB.get3Value() * 255); // b
                canvasData_GB.data[indices[3]] = 255; //a
              }

            }
          }

          var answerJSON = {};
          answerJSON['pp_space'] = e.data.pp_space;
          answerJSON['canvasID'] = e.data.canvasID_1;
          answerJSON['imageData'] = canvasData_GR;
          answerJSON['label1'] = "G";
          answerJSON['label2'] = "R";
          self.postMessage(answerJSON);

          answerJSON['canvasID'] = e.data.canvasID_2;
          answerJSON['imageData'] = canvasData_BR;
          answerJSON['label1'] = "B";
          answerJSON['label2'] = "R";
          self.postMessage(answerJSON);

          answerJSON['canvasID'] = e.data.canvasID_3;
          answerJSON['imageData'] = canvasData_GB;
          answerJSON['label1'] = "G";
          answerJSON['label2'] = "B";
          self.postMessage(answerJSON);

          /////////////////////////////////////
          //// delete Colors

          tmpRGB_GR.deleteReferences();
          tmpRGB_BR.deleteReferences();
          tmpRGB_GB.deleteReferences();

        break;
        case "hsv":
          var background = new ImageData(hueResolution, hueResolution);

          var colorspaceCenterX = Math.round(hueResolution / 2);
          var colorspaceCenterY = Math.round(hueResolution / 2);
          var colorspaceRadius = Math.round((hueResolution*0.95 / 2));// * radiusratio);

          var vVal = 1.0;

          if (e.data.fixedValue3!=undefined)
            vVal=e.data.fixedValue3;

          var deleteColors = [];
          var colorHSV = new class_Color_HSV(0, 0, vVal);

          for (var x = 0; x < hueResolution; x++) {

            for (var y = 0; y < hueResolution; y++) {

              var dis = Math.sqrt(Math.pow(colorspaceCenterX - x, 2) + Math.pow(colorspaceCenterY - y, 2));

              if (dis <= colorspaceRadius) {
                // calc hsv color

                var tmpY= hueResolution-y;
                var ty = (tmpY) - (colorspaceCenterY);
                var tx = x - colorspaceCenterX;
                var angle = atan2_360Degree(tx,ty)/360; // values 0-1 ...
                var hVal = angle;
                var sVal = dis / colorspaceRadius;

                colorHSV.set1Value(hVal);
                colorHSV.set2Value(sVal);
                var colorRGB = colorHSV.calcRGBColor();


                if(e.data.doColorblindnessSim){
                  var tmpLMS = colorRGB.calcLMSColor();
                  deleteColors.push(colorRGB);
                  colorRGB = tmpLMS.calcColorBlindRGBColor();
                  deleteColors.push(tmpLMS);
                }

                var indices = getColorIndicesForCoord(x, y, hueResolution);

                background.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
                background.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
                background.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
                background.data[indices[3]] = 255; //a
                deleteColors.push(colorRGB);
              }

            }

          }

          var answerJSON = {};
          answerJSON['pp_space'] = e.data.pp_space;
          answerJSON['canvasID'] = e.data.canvasID_1;
          answerJSON['imageData'] = background;
          self.postMessage(answerJSON);

          colorHSV.deleteReferences();

          for (var i = deleteColors.length-1; i >= 0; i--) {
            deleteColors[i].deleteReferences();
          }
        break;
        case "lab":
          var background = new ImageData(hueResolution, hueResolution);

          var colorspaceCenterX = Math.round(hueResolution / 2);
          var colorspaceCenterY = Math.round(hueResolution / 2);
          var colorspaceRadius = Math.round((hueResolution / 2));// * radiusratio);

          var lVal = 50;

          if (e.data.fixedValue1!=undefined)
            lVal=e.data.fixedValue1;

          var deleteColors = [];
          var colorLAB = new class_Color_LAB(lVal, 0, 0);
          for (var x = 0; x < hueResolution; x++) {

            for (var y = 0; y < hueResolution; y++) {

                var tmpY = hueResolution-y;
                var aVal = ((x - colorspaceCenterX) / (hueResolution / 2)) * e.data.labSpaceRange;
                var bVal = ((tmpY - colorspaceCenterY) / (hueResolution / 2)) * e.data.labSpaceRange;

                colorLAB.set2Value(aVal);
                colorLAB.set3Value(bVal);
                var colorRGB = undefined;

                if(colorLAB.checkRGBPossiblity() || e.data.fixedValue1==undefined){
                  colorRGB = colorLAB.calcRGBColor();
                }
                else {
                  //colorRGB = new class_Color_RGB(0.5, 0.5, 0.5);
                  continue;
                }

                if(e.data.doColorblindnessSim){
                  var tmpLMS = colorRGB.calcLMSColor();
                  deleteColors.push(colorRGB);
                  colorRGB = tmpLMS.calcColorBlindRGBColor();
                  deleteColors.push(tmpLMS);
                }

                var indices = getColorIndicesForCoord(x, y, hueResolution);

                background.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
                background.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
                background.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
                background.data[indices[3]] = 255; //a
                deleteColors.push(colorRGB);

            }

          }

          var answerJSON = {};
          answerJSON['pp_space'] = e.data.pp_space;
          answerJSON['canvasID'] = e.data.canvasID_1;
          answerJSON['imageData'] = background;
          self.postMessage(answerJSON);

          colorLAB.deleteReferences();
          for (var i = deleteColors.length-1; i >= 0; i--) {
            deleteColors[i].deleteReferences();
          }
        break;
        case "din99":
          var background = new ImageData(hueResolution, hueResolution);

          var colorspaceCenterX = Math.round(hueResolution / 2);
          var colorspaceCenterY = Math.round(hueResolution / 2);
          var colorspaceRadius = Math.round((hueResolution / 2));// * radiusratio);

          var l99Val = 50;

          if (e.data.fixedValue1!=undefined)
            l99Val=e.data.fixedValue1;

          var deleteColors = [];
          var colorDIN99 = new class_Color_DIN99(l99Val, 0, 0);
          for (var x = 0; x < hueResolution; x++) {

            for (var y = 0; y < hueResolution; y++) {

                var tmpY = hueResolution-y;
                var a99Val = (x  / hueResolution) * e.data.rangeA99 + e.data.rangeA99Neg;
                var b99Val = (tmpY / hueResolution) * e.data.rangeB99 + e.data.rangeB99Neg;

                colorDIN99.set2Value(a99Val);
                colorDIN99.set3Value(b99Val);
                var colorRGB = undefined;
                if (colorDIN99.checkRGBPossiblity() || e.data.fixedValue1==undefined){
                  colorRGB = colorDIN99.calcRGBColor();
                } else {
                  //colorRGB = new class_Color_RGB(0.5, 0.5, 0.5);
                  continue;
                }

                if(e.data.doColorblindnessSim){
                  var tmpLMS = colorRGB.calcLMSColor();
                  deleteColors.push(colorRGB);
                  colorRGB = tmpLMS.calcColorBlindRGBColor();
                  deleteColors.push(tmpLMS);
                }

                var indices = getColorIndicesForCoord(x, y, hueResolution);
                background.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
                background.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
                background.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
                background.data[indices[3]] = 255; //a
                deleteColors.push(colorRGB);

            }
          }

          var answerJSON = {};
          answerJSON['pp_space'] = e.data.pp_space;
          answerJSON['canvasID'] = e.data.canvasID_1;
          answerJSON['imageData'] = background;
          self.postMessage(answerJSON);

          colorDIN99.deleteReferences();
          for (var i = deleteColors.length-1; i >= 0; i--) {
            deleteColors[i].deleteReferences();
          }
        break;
        case "lch":
          var background = new ImageData(hueResolution, hueResolution);

            var colorspaceCenterX = Math.round(hueResolution / 2);
            var colorspaceCenterY = Math.round(hueResolution / 2);
            var colorspaceRadius = Math.round((hueResolution*0.95 / 2));// * radiusratio);

            var lVal = 0.50;

            if (e.data.fixedValue1!=undefined)
              lVal=e.data.fixedValue1;

            var deleteColors = [];
            var colorLCH = new class_Color_LCH(lVal,0,0);

            for (var x = 0; x < hueResolution; x++) {

              for (var y = 0; y < hueResolution; y++) {

                var dis = Math.sqrt(Math.pow(colorspaceCenterX - x, 2) + Math.pow(colorspaceCenterY - y, 2));

                if (dis <= colorspaceRadius) {
                  // calc hsv color

                  var tmpY= hueResolution-y;
                  var ty = (tmpY) - (colorspaceCenterY);
                  var tx = x - colorspaceCenterX;
                  var angle = atan2_360Degree(tx,ty)/360; // values 0-1 ...
                  var hVal = angle;
                  var cVal = dis / colorspaceRadius;

                  colorLCH.set2Value(cVal);
                  colorLCH.set3Value(hVal);

                  var colorRGB;
                  if(colorLCH.checkRGBPossiblity() || e.data.fixedValue1==undefined){
                    colorRGB = colorLCH.calcRGBColor();
                  }
                  else {
                    //colorRGB = new class_Color_RGB(0.5, 0.5, 0.5);
                    continue;
                  }

                  if(e.data.doColorblindnessSim){
                    var tmpLMS = colorRGB.calcLMSColor();
                    deleteColors.push(colorRGB);
                    colorRGB = tmpLMS.calcColorBlindRGBColor();
                    deleteColors.push(tmpLMS);
                  }

                  var indices = getColorIndicesForCoord(x, y, hueResolution);

                  background.data[indices[0]] = Math.round(colorRGB.get1Value() * 255); // r
                  background.data[indices[1]] = Math.round(colorRGB.get2Value() * 255); // g
                  background.data[indices[2]] = Math.round(colorRGB.get3Value() * 255); // b
                  background.data[indices[3]] = 255; //a
                  deleteColors.push(colorRGB);

                }

              }

            }



          var answerJSON = {};
          answerJSON['pp_space'] = e.data.pp_space;
          answerJSON['canvasID'] = e.data.canvasID_1;
          answerJSON['imageData'] = background;
          self.postMessage(answerJSON);

          colorLCH.deleteReferences();

          for (var i = deleteColors.length-1; i >= 0; i--) {
            deleteColors[i].deleteReferences();
          }
        break;
      }


    break;
  default:
    generalJSON_Processing(e.data);
  }

}, false);

function getColorIndicesForCoord(x, y, width) {
  var red = y * (width * 4) + x * 4;
  return [red, red + 1, red + 2, red + 3];
}
