var gWorkColor1 = undefined;
var gWorkColor2 = undefined;

var testfield = undefined;
var colorField = undefined;
var testTensorFieldValues = undefined;
var testTensorFieldColorDif = undefined;
var reportOptions_ColorDif = 2;
var ratioFields = undefined;
var selectorType ="max";
var normalizationSelector = "minMax";
var customNormValue = 100;


var reportType = undefined;

// Offscreen Canvas
var canvas = undefined;
var canvasContex = undefined;

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
var doColorblindnessSim = false;
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

// CMS
var testingCMS = undefined;
var ratioDifCMS = undefined;
var greyScaledCMS = undefined;

var error = 100; // 0.01
var errorMath = 1e12;


self.addEventListener('message', function(e) {

  switch (e.data.message) {

    case "init":
      self.importScripts('../../../../Global/worker/general_processingCases.js');

      self.importScripts('../../../../Global/color/class_Colorspace_Allrounder.js');

      self.importScripts('../../../global/cms/class_Colormap_Specification.js');
      self.importScripts('../../../global/cms/class_Colormap_Key.js');
      self.importScripts('../../../global/cms/class_Colormap_Interval.js');

      self.importScripts('../../../../Global/helper/canvasHelper.js');

      self.importScripts('../report/calc_Report.js');
      self.importScripts('../../../../Global/helper/math.js');
      self.importScripts('../../../../Global/helper/quicksort.js');
      self.importScripts('../../../global/cms/cmsIntervalHelper.js');
      self.importScripts('../../../../Global/color/colorDifference.js');

      gWorkColor1 = new class_Color("rgb",0,0,0);
      gWorkColor2 = new class_Color("rgb",0,0,0);

      testingCMS = new class_CMS();
      ratioDifCMS = new class_CMS();
      ratioDifCMS.pushKey(new class_Key(undefined, ["din99", 29.581458825788705,16.03125,-26.896446228027347], -1, false));
      ratioDifCMS.pushKey(new class_Key(["din99", 55.87141911613874,-7.531250000000001,-28.383946228027348], ["din99", 55.87141911613874,-7.531250000000001,-28.383946228027348], -0.6446462116468379, false));
      ratioDifCMS.pushKey(new class_Key(["din99", 81.87664737898814,-20.531249999999996,-9.790196228027346], ["din99", 81.87664737898814,-20.531249999999996,-9.790196228027346], -0.2977457733249843, false));
      ratioDifCMS.pushKey(new class_Key(["din99", 99.85395907566293,-0.9780546619960879,3.201916766455866], ["din99", 99.85395907566293,-0.9780546619960879,3.201916766455866], 0, false));
      ratioDifCMS.pushKey(new class_Key(["din99", 86.74992752799066,-3.4687500000000013,25.166053771972656], ["din99", 86.74992752799066,-3.4687500000000013,25.166053771972656], 0.2620538509705699, false));
      ratioDifCMS.pushKey(new class_Key(["din99", 61.129411174208734,20.093750000000004,25.90980377197265], ["din99", 61.129411174208734,20.093750000000004,25.90980377197265], 0.6152160300563556, false));
      ratioDifCMS.pushKey(new class_Key(["din99", 28.529860414174685,30.656250000000004,10.291053771972658], undefined, 1, false));
      ratioDifCMS.setAboveColor(["rgb",1.0,0,0]);
      ratioDifCMS.setBelowColor(["rgb",0,0,1.0]);
      ratioDifCMS.setInterpolationSpace("de2000-ds");
      //ratioDifCMS.calcNeededIntervalsColors(false,undefined,undefined);

      greyScaledCMS = new class_CMS();
      greyScaledCMS = new class_CMS();
      greyScaledCMS.pushKey(new class_Key(undefined, ["lab",0,0,0], 0, false));
      greyScaledCMS.pushKey(new class_Key(["lab",100,0,0], undefined, 1, false));
      greyScaledCMS.setInterpolationSpace("de2000-ds");
      //greyScaledCMS.calcNeededIntervalsColors(false,undefined,undefined);

      reportType = e.data.reportType;

    break;
    case "calcReport_New_Testfield":
      testfield = e.data.testfield;
      reportOptions_ColorDif= e.data.reportOptions_ColorDif;
      selectorType = e.data.reportOptions_ColorSelector;
      normalizationSelector=e.data.reportOptions_NormalizationSelector;
      customNormValue=e.data.customValue;
      calcColorField();
      sendReportOriginalImage();
      sendReportGreyImage();
      startReportCalc();
    break;
    case "calcReport_New_Setting":
      reportOptions_ColorDif= e.data.reportOptions_ColorDif;
      selectorType = e.data.reportOptions_ColorSelector;
      normalizationSelector=e.data.reportOptions_NormalizationSelector;
      customNormValue=e.data.customValue;
      calcColorField();
      startReportCalc();
    break;
    case "calcReport_New_CMS":
      // new CMS
      calcColorField();
      sendReportOriginalImage();
      startReportCalc();
    break;
    case "updateMainCMS":
      if(testingCMS==undefined)
        break;
      testingCMS.setCMSFromPackage(e.data.cmsInfoPackage);
    break;
  default:
    generalJSON_Processing(e.data);


  }

}, false);

function startReportCalc() {

  /*switch (reportType) {
    case 0:*/

      ratioFields = getRatioDifField(testfield, colorField, reportOptions_ColorDif,selectorType,normalizationSelector,customNormValue);
      var answerJSON = {};
      answerJSON['type'] = 0;
      answerJSON['subtype'] = "reportIMG"
      answerJSON['canvasID'] = "id_TestPage_Report0";
      answerJSON['imageData'] = ratioFields[0];
      self.postMessage(answerJSON);

      answerJSON = {};
      answerJSON['type'] = 0;
      answerJSON['subtype'] = "reportIMG"
      answerJSON['canvasID'] = "id_TestPage_Report1";
      answerJSON['imageData'] = ratioFields[1];
      self.postMessage(answerJSON);

      answerJSON = {};
      answerJSON['type'] = 0;
      answerJSON['subtype'] = "reportIMG"
      answerJSON['canvasID'] = "id_TestPage_Report2";
      answerJSON['imageData'] = ratioFields[2];
      self.postMessage(answerJSON);


      //// calc statistics

      answerJSON = {};
      answerJSON['type'] = 0;
      answerJSON['subtype'] = "statistics"
      answerJSON['valueDifInfo'] = ratioFields[3];
      answerJSON['valueDifStat'] = calcSubReportStatisics(ratioFields[3]);
      answerJSON['colorDifInfo'] = ratioFields[4];
      answerJSON['colorDifStat'] = calcSubReportStatisics(ratioFields[4]);
      answerJSON['valueRatioInfo'] = ratioFields[5];
      answerJSON['valueRatioStat'] = calcSubReportStatisics(ratioFields[5]);
      answerJSON['colorRatioInfo'] = ratioFields[6];
      answerJSON['colorRatioStat'] = calcSubReportStatisics(ratioFields[6]);
      answerJSON['subtractionInfo'] = ratioFields[7];
      answerJSON['subtractionStat'] = calcSubReportStatisics(ratioFields[7]);

      self.postMessage(answerJSON);

  /*  break;
}*/

}

function calcSubReportStatisics(tmpArrays){

  var sumForAverage = 0;
  var counter = 0;
  var min = Infinity;
  var max = -Infinity;

  for (var index = 0; index < tmpArrays.length; index++) {
    for (var x = 0; x < tmpArrays[index].length; x++) {
      for (var y = 0; y < tmpArrays[index][0].length; y++) {
        sumForAverage += tmpArrays[index][x][y];
        min = Math.min(min,tmpArrays[index][x][y]);
        max = Math.max(max,tmpArrays[index][x][y]);
        counter++;
      }
    }
  }

  var average=sumForAverage/counter;
  var sumForVariance = 0;

  for (var index = 0; index < tmpArrays.length; index++) {
    for (var x = 0; x < tmpArrays[index].length; x++) {
      for (var y = 0; y < tmpArrays[index][0].length; y++) {
        sumForVariance += Math.pow(tmpArrays[index][x][y]-average,2);
      }
    }
  }

  var variance = sumForVariance/counter;
  var deviation = Math.sqrt(variance);

  return [min,max,average,variance,deviation];
}

function calcColorField() {

  colorField = [];

  if (testfield.length == 0)
    return [];

  var xDim = testfield.length;
  var yDim = testfield[0].length;

  var space ="lab";

  if(reportOptions_ColorDif==="din99")
    space="din99";

  for (var x = 0; x < xDim; x++) {
    var tmpArray = [];
    for (var y = 0; y < yDim; y++) {
      tmpArray.push(testingCMS.calculateColor(testfield[x][y],space));
    }
    colorField.push(tmpArray);
  }

}

function sendReportOriginalImage(){

  var answerJSON = {};
  answerJSON['type'] = 0;
  answerJSON['subtype'] = "reportIMG"
  answerJSON['canvasID'] = "id_TestPage_ReportOrginalC";
  var imgData = new ImageData(colorField.length, colorField[0].length);
  var maxHeightIndex = colorField[0].length - 1;
  for (var y = 0; y < colorField[0].length; y++) {
    for (var x = 0; x < colorField.length; x++) {
      gWorkColor1.updateColor(colorField[x][y][0],colorField[x][y][1],colorField[x][y][2],colorField[x][y][3]);
      var colorRGB = gWorkColor1.getColorInfo("rgb");
      var indices = getColorIndicesForCoord(x, maxHeightIndex - y, colorField.length);
      imgData.data[indices[0]] = Math.round(colorRGB[1] * 255); // r
      imgData.data[indices[1]] = Math.round(colorRGB[2] * 255); // g
      imgData.data[indices[2]] = Math.round(colorRGB[3] * 255); // b
      imgData.data[indices[3]] = 255; //a
    }
  }
  answerJSON['imageData'] = imgData;
  self.postMessage(answerJSON);

}

function sendReportGreyImage(){

  var min = Infinity;
  var max = -Infinity;

  for (var y = 0; y < testfield[0].length; y++) {
    for (var x = 0; x < testfield.length; x++) {

        min = Math.min(min,testfield[x][y]);
        max = Math.max(max,testfield[x][y]);
  }}
  var dis=max-min;

  var answerJSON = {};
  answerJSON['type'] = 0;
  answerJSON['subtype'] = "reportIMG"
  answerJSON['canvasID'] = "id_TestPage_ReportOrginalG";

  var imgData = new ImageData(testfield.length, testfield[0].length);
  var maxHeightIndex = testfield[0].length - 1;
  for (var y = 0; y < testfield[0].length; y++) {
    for (var x = 0; x < testfield.length; x++) {
      var greyVal = greyScaledCMS.calculateColor(((testfield[x][y]-min)/dis),"rgb");
      var indices = getColorIndicesForCoord(x, maxHeightIndex - y, testfield.length);
      imgData.data[indices[0]] = Math.round(greyVal[1]*255); // r
      imgData.data[indices[1]] = Math.round(greyVal[2]*255); // g
      imgData.data[indices[2]] = Math.round(greyVal[3]*255); // b
      imgData.data[indices[3]] = 255; //a
    }
  }
  answerJSON['imageData'] = imgData;
  self.postMessage(answerJSON);
}
