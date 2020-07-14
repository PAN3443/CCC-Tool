var gWorkColor1 = undefined;
var gWorkColor2 = undefined;
var gWorkColor3 = undefined;

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
var  sim_AdaptiveColorblindness = [
  [0, 1.05118294, -0.05116099],
  [0, 1, 0],
  [0, 0, 1]
];



self.addEventListener('message', function(e) {

  switch (e.data.message) {

    case "init":
    self.importScripts('../../../../../../Global/worker/general_processingCases.js');
    self.importScripts('../../../../../../Global/helper/canvasHelper.js');
    self.importScripts('../../../../../../Global/color/class_Colorspace_Allrounder.js');
    self.importScripts('../../../../../../Global/helper/math.js');

    gWorkColor1 = new class_Color("rgb", 0, 0, 0);
    gWorkColor2 = new class_Color("rgb", 0, 0, 0);
    gWorkColor3 = new class_Color("rgb", 0, 0, 0);
    break;
    case "getBackground":
      var hueResolution = parseInt(e.data.hueResolution);
      var colorInfo1 = undefined;
      var colorInfo2 = undefined;
      var colorInfo3 = undefined;
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

          gWorkColor1.updateColor("rgb", 0, 0, 0);
          gWorkColor2.updateColor("rgb", 0, 0, 0);
          gWorkColor3.updateColor("rgb", 0, 0, 0);

          if(e.data.fixedValue1!=undefined){
            gWorkColor1.setValue("rgb", 2, e.data.fixedValue3)
            gWorkColor2.setValue("rgb", 1, e.data.fixedValue2)
            gWorkColor3.setValue("rgb", 0, e.data.fixedValue1)
          }

          for (var x = 0; x < hueResolution; x++) {
            for (var y = 0; y < hueResolution; y++) {

              if (x >= xStart && x <= xEnd && y <= yStart && y >= yEnd) {
                // calc hsv color
                var indices = getColorIndicesForCoord(x, y, hueResolution);

                var xVal = (x - xStart) / xWidth;
                var yVal = (yStart - y) / yHeight;

                gWorkColor1.setValue("rgb", 0,yVal);
                gWorkColor1.setValue("rgb", 1,xVal);

                gWorkColor2.setValue("rgb", 0,yVal);
                gWorkColor2.setValue("rgb", 2,xVal);

                gWorkColor3.setValue("rgb", 1,xVal);
                gWorkColor3.setValue("rgb", 2,yVal);

                if(e.data.doColorblindnessSim){
                  colorInfo1 = gWorkColor1.getColorInfo("rgb_cb");
                  colorInfo2 = gWorkColor2.getColorInfo("rgb_cb");
                  colorInfo3 = gWorkColor3.getColorInfo("rgb_cb");
                }
                else{
                  colorInfo1 = gWorkColor1.getColorInfo("rgb");
                  colorInfo2 = gWorkColor2.getColorInfo("rgb");
                  colorInfo3 = gWorkColor3.getColorInfo("rgb");
                }

                canvasData_GR.data[indices[0]] = Math.round(colorInfo1[1] * 255); // r
                canvasData_GR.data[indices[1]] = Math.round(colorInfo1[2] * 255); // g
                canvasData_GR.data[indices[2]] = Math.round(colorInfo1[3] * 255); // b
                canvasData_GR.data[indices[3]] = 255; //a

                canvasData_BR.data[indices[0]] = Math.round(colorInfo2[1] * 255); // r
                canvasData_BR.data[indices[1]] = Math.round(colorInfo2[2] * 255); // g
                canvasData_BR.data[indices[2]] = Math.round(colorInfo2[3] * 255); // b
                canvasData_BR.data[indices[3]] = 255; //a

                canvasData_GB.data[indices[0]] = Math.round(colorInfo3[1] * 255); // r
                canvasData_GB.data[indices[1]] = Math.round(colorInfo3[2] * 255); // g
                canvasData_GB.data[indices[2]] = Math.round(colorInfo3[3] * 255); // b
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

        break;
        case "hsv":
          var background = new ImageData(hueResolution, hueResolution);

          var colorspaceCenterX = Math.round(hueResolution / 2);
          var colorspaceCenterY = Math.round(hueResolution / 2);
          var colorspaceRadius = Math.round((hueResolution*0.95 / 2));// * radiusratio);

          var vVal = 1.0;

          if (e.data.fixedValue3!=undefined)
            vVal=e.data.fixedValue3;

          gWorkColor1.updateColor("hsv", 0, 0, vVal);

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

                gWorkColor1.setValue("hsv", 0,hVal);
                gWorkColor1.setValue("hsv", 1,sVal);

                if(e.data.doColorblindnessSim){
                  colorInfo1 = gWorkColor1.getColorInfo("rgb_cb");
                }
                else{
                  colorInfo1 = gWorkColor1.getColorInfo("rgb");
                }

                var indices = getColorIndicesForCoord(x, y, hueResolution);
                background.data[indices[0]] = Math.round(colorInfo1[1] * 255); // r
                background.data[indices[1]] = Math.round(colorInfo1[2] * 255); // g
                background.data[indices[2]] = Math.round(colorInfo1[3] * 255); // b
                background.data[indices[3]] = 255; //a
              }

            }

          }

          var answerJSON = {};
          answerJSON['pp_space'] = e.data.pp_space;
          answerJSON['canvasID'] = e.data.canvasID_1;
          answerJSON['imageData'] = background;
          self.postMessage(answerJSON);
        break;
        case "lab":
          var background = new ImageData(hueResolution, hueResolution);

          var colorspaceCenterX = Math.round(hueResolution / 2);
          var colorspaceCenterY = Math.round(hueResolution / 2);
          var colorspaceRadius = Math.round((hueResolution / 2));// * radiusratio);

          var lVal = 50;

          if (e.data.fixedValue1!=undefined)
            lVal=e.data.fixedValue1;

          gWorkColor1.autoRGBClipping=false;
          gWorkColor1.updateColor("lab", lVal, 0, 0);

          for (var x = 0; x < hueResolution; x++) {
            for (var y = 0; y < hueResolution; y++) {

                var tmpY = hueResolution-y;
                var aVal = ((x - colorspaceCenterX) / (hueResolution / 2)) * e.data.labSpaceRange;
                var bVal = ((tmpY - colorspaceCenterY) / (hueResolution / 2)) * e.data.labSpaceRange;

                gWorkColor1.setValue("lab", 1,aVal);
                gWorkColor1.setValue("lab", 2,bVal);

                if(e.data.fixedValue1!=undefined && !gWorkColor1.checkRGBPossiblity()){
                  continue;
                }

                if(e.data.doColorblindnessSim){
                  colorInfo1 = gWorkColor1.getColorInfo("rgb_cb");
                }
                else{
                  colorInfo1 = gWorkColor1.getColorInfo("rgb");
                }

                var indices = getColorIndicesForCoord(x, y, hueResolution);
                background.data[indices[0]] = Math.round(colorInfo1[1] * 255); // r
                background.data[indices[1]] = Math.round(colorInfo1[2] * 255); // g
                background.data[indices[2]] = Math.round(colorInfo1[3] * 255); // b
                background.data[indices[3]] = 255; //a

            }
          }
          gWorkColor1.autoRGBClipping=true;

          var answerJSON = {};
          answerJSON['pp_space'] = e.data.pp_space;
          answerJSON['canvasID'] = e.data.canvasID_1;
          answerJSON['imageData'] = background;
          self.postMessage(answerJSON);

        break;
        case "din99":
          var background = new ImageData(hueResolution, hueResolution);

          var colorspaceCenterX = Math.round(hueResolution / 2);
          var colorspaceCenterY = Math.round(hueResolution / 2);
          var colorspaceRadius = Math.round((hueResolution / 2));// * radiusratio);

          var l99Val = 50;

          if (e.data.fixedValue1!=undefined)
            l99Val=e.data.fixedValue1;

          gWorkColor1.autoRGBClipping=false;
          gWorkColor1.updateColor("din99", l99Val, 0, 0);
          for (var x = 0; x < hueResolution; x++) {

            for (var y = 0; y < hueResolution; y++) {

                var tmpY = hueResolution-y;
                var a99Val = (x  / hueResolution) * e.data.rangeA99 + e.data.rangeA99Neg;
                var b99Val = (tmpY / hueResolution) * e.data.rangeB99 + e.data.rangeB99Neg;

                gWorkColor1.setValue("din99", 1,a99Val);
                gWorkColor1.setValue("din99", 2,b99Val);

                if(e.data.fixedValue1!=undefined && !gWorkColor1.checkRGBPossiblity()){
                  continue;
                }

                if(e.data.doColorblindnessSim){
                  colorInfo1 = gWorkColor1.getColorInfo("rgb_cb");
                }
                else{
                  colorInfo1 = gWorkColor1.getColorInfo("rgb");
                }

                var indices = getColorIndicesForCoord(x, y, hueResolution);
                background.data[indices[0]] = Math.round(colorInfo1[1] * 255); // r
                background.data[indices[1]] = Math.round(colorInfo1[2] * 255); // g
                background.data[indices[2]] = Math.round(colorInfo1[3] * 255); // b
                background.data[indices[3]] = 255; //a

            }
          }
          gWorkColor1.autoRGBClipping=true;

          var answerJSON = {};
          answerJSON['pp_space'] = e.data.pp_space;
          answerJSON['canvasID'] = e.data.canvasID_1;
          answerJSON['imageData'] = background;
          self.postMessage(answerJSON);
        break;
        case "lch":
          var background = new ImageData(hueResolution, hueResolution);

            var colorspaceCenterX = Math.round(hueResolution / 2);
            var colorspaceCenterY = Math.round(hueResolution / 2);
            var colorspaceRadius = Math.round((hueResolution*0.95 / 2));// * radiusratio);

            var lVal = 0.50;

            if (e.data.fixedValue1!=undefined)
              lVal=e.data.fixedValue1;

            gWorkColor1.autoRGBClipping=false;
            gWorkColor1.updateColor("lch", lVal, 0, 0);

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

                  gWorkColor1.setValue("lch", 1,cVal);
                  gWorkColor1.setValue("lch", 2,hVal);

                  if(e.data.fixedValue1!=undefined && !gWorkColor1.checkRGBPossiblity()){
                    continue;
                  }

                  if(e.data.doColorblindnessSim){
                    colorInfo1 = gWorkColor1.getColorInfo("rgb_cb");
                  }
                  else{
                    colorInfo1 = gWorkColor1.getColorInfo("rgb");
                  }

                  var indices = getColorIndicesForCoord(x, y, hueResolution);
                  background.data[indices[0]] = Math.round(colorInfo1[1] * 255); // r
                  background.data[indices[1]] = Math.round(colorInfo1[2] * 255); // g
                  background.data[indices[2]] = Math.round(colorInfo1[3] * 255); // b
                  background.data[indices[3]] = 255; //a

                }

              }

            }
            gWorkColor1.autoRGBClipping=true;

          var answerJSON = {};
          answerJSON['pp_space'] = e.data.pp_space;
          answerJSON['canvasID'] = e.data.canvasID_1;
          answerJSON['imageData'] = background;
          self.postMessage(answerJSON);
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
