var gWorkColor1 = undefined;
var gWorkColor2 = undefined;

// Offscreen Canvas
var canvasList = [];
var typeList = []; // ccctest, collection, realdata
var subtypeList = []; // e.g. jump test ....
var optionsList = [];
var testFieldList = [];

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

var error = 100; // 0.01
var errorMath = 1e12;
var tmpWorkerType = undefined;
self.addEventListener('message', function(e) {

  if(e.data==undefined){
    console.debug("Worker",tmpWorkerType);
    return;
  }

  switch (e.data.message) {
    case "init":
      self.importScripts('../../../../Global/worker/general_processingCases.js');
      self.importScripts('workerFunctions_testing.js');
      worker_LoadColorClasses();

      self.importScripts('../../../global/fields/class_testField.js');

      self.importScripts('../../../../Global/helper/math.js');
      self.importScripts('../../../global/cms/cmsIntervalHelper.js');
      self.importScripts('../../../../Global/color/colorDifference.js');

      tmpWorkerType=e.data.initOption1;
      switch (e.data.initOption1) {
        case "CCCTest":
            self.importScripts('../testfunctions/cccTest.js');
          break;
          case "Collection":
            self.importScripts('../testfunctions/fct_collection/collection_BowlShaped.js');
            self.importScripts('../testfunctions/fct_collection/collection_localMinima.js');
            self.importScripts('../testfunctions/fct_collection/collection_ValleyShaped.js');
            self.importScripts('../testfunctions/fct_collection/collection_other.js');
          break;
          case "RealData":
            self.importScripts('../testfunctions/realWorldData.js');
          break;
      }

      self.importScripts('../../../../Global/helper/canvasHelper.js');

      gWorkColor1 = new class_Color("rgb",0,0,0);
      gWorkColor2 = new class_Color("rgb",0,0,0);
      
      testingCMS = new class_CMS();
    break;
    case "pushOptions":
        optionsList.push(e.data.optionsList);
    break;
    case "setType":
      typeList.push(e.data.type);
      subtypeList.push(e.data.subtype);
    break;
    case "pushCanvas":
        canvasList.push(e.data.canvas);
        var newTestField = new class_TestField(0,0);
        testFieldList.push(newTestField);
    break;
    case "calcTestFields":
      for (var i = 0; i < typeList.length; i++) {
        calc_Preview_TestingField(i);
      }
    break;
    case "getRealWorldData_IMG":
      while(optionsList.length<=e.data.index){
        optionsList.push(undefined);
      }
      optionsList[e.data.index] = e.data.img;
    break;
    case "getImgData":
      for (var i = 0; i < testFieldList.length; i++) {
        var answerJSON = {};
        answerJSON['canvasID'] = canvasList[i];
        answerJSON['imageData'] = calculateImageData(testFieldList[i],false);
        self.postMessage(answerJSON);
      }

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
