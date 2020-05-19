var gWorkColor1 = undefined;
var gWorkColor2 = undefined;

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
var sim_AdaptiveColorblindness = [
  [0, 1.05118294, -0.05116099],
  [0, 1, 0],
  [0, 0, 1]
];

// CMS

var currentCMS = 0; // 0=Edit, 1=Opti, 2=Probe
var editCMS = undefined;
var optiCMS = undefined;
var probeCMS = undefined;
var somethingChanged = false;

// Offscreen Canvas
var canvas = undefined;
var canvasContex = undefined;

var error = 100; // 0.01
var errorMath = 1e12;

var worker_drawCMS = undefined;
self.addEventListener('message', function(e) {
  switch (e.data.message) {
    case "init":
      self.importScripts('../../../../Global/worker/general_processingCases.js');
      self.importScripts('../../../../Global/helper/canvasHelper.js');

      // Colors
      self.importScripts('../../../../Global/color/class_Colorspace_Allrounder.js');
      self.importScripts('../../../../Global/color/colorDifference.js');

      self.importScripts('../../../global/cms/class_Colormap_Specification.js');
      self.importScripts('../../../global/cms/class_Colormap_Key.js');
      self.importScripts('../../../global/cms/class_Colormap_Interval.js');
      self.importScripts('../../../global/cms/cmsIntervalHelper.js');

      self.importScripts('../../../../Global/helper/math.js');
      self.importScripts('../../../../Global/helper/quicksort.js');

      gWorkColor1 = new class_Color("rgb", 0, 0, 0);
      gWorkColor2 = new class_Color("rgb", 0, 0, 0);

      editCMS = new class_CMS();
      optiCMS = new class_CMS();
      probeCMS = new class_CMS();

      worker_drawCMS = new Worker("worker_drawEditCMS.js"); //, { type: "module" });
      worker_drawCMS.addEventListener('message', workerListener_DrawCMS, false);
      worker_drawCMS.postMessage({
        'message': 'init'
      });
      break;
    case "getCMSName":

      break;
    case "getCMSName":

      break;
    case "drawCMS":

      break;
    case "setCMSName":
      singleUpdate_EditSection();
      break;
    case "setNaNColor":
      singleUpdate_EditSection();
      break;
    case "setAboveColor":
      singleUpdate_EditSection();
      break;
    case "setBelowColor":
      singleUpdate_EditSection();
      break;
    case "updateEditCMS":
      editCMS.setCMSFromPackage(e.data.cmsInfoPackage);
      somethingChanged = false;
      currentCMS = 0;
      //// Update CMS of subworker //////
      workerRequest_updateDrawCMS();
      //////////////////////////////////
      intervalUpdate_EditSection();
      singleUpdate_EditSection();
      break;
    case "updateOptiCMS":
      optiCMS.setCMSFromPackage(editCMS.createCMSInfoPackage());
      currentCMS = 0;
      break;
    case "updateProbeCMS":
      probeCMS.setCMSFromPackage(editCMS.createCMSInfoPackage());
      currentCMS = 0;
      break;

    default:
      generalJSON_Processing(e.data);


  }

}, false);

function singleUpdate_EditSection() {
  var answerJSON = {};
  answerJSON['type'] = "singleUpdate";
  // edit, opti and probe CMS have here the same information!
  answerJSON['name'] = editCMS.createCMSInfoPackage();
  answerJSON['nan'] = editCMS.getNaNColor("rgb_string");
  answerJSON['above'] = editCMS.getAboveColor("rgb_string");
  answerJSON['below'] = editCMS.getBelowColor("rgb_string");

  switch (currentCMS) {
    case 0:
      answerJSON['interSpace'] = editCMS.getInterpolationSpace();
      answerJSON['interType'] = editCMS.getInterpolationType();
      answerJSON['cmsInfoPackage'] = editCMS.createCMSInfoPackage();
      break;
    case 1:
      answerJSON['interSpace'] = optiCMS.getInterpolationSpace();
      answerJSON['interType'] = optiCMS.getInterpolationType();
      break;
    case 2:
      answerJSON['interSpace'] = probeCMS.getInterpolationSpace();
      answerJSON['interType'] = probeCMS.getInterpolationType();
      break;
    default:
      return;
  }

  self.postMessage(answerJSON);
}

function intervalUpdate_EditSection() {
  workerRequest_DrawCMS();
}

//////////////////////////////////////////////
///  Worker Request
//////////////////////////////////////////////

function workerRequest_updateDrawCMS() {

  var workerJSON = {};
  workerJSON['message'] = "updateDrawCMS";

  switch (currentCMS) {
    case 0:
      workerJSON['cmsInfoPackage'] = editCMS.createCMSInfoPackage();
      break;
    case 1:
      workerJSON['cmsInfoPackage'] = optiCMS.createCMSInfoPackage();
      break;
    case 2:
      workerJSON['cmsInfoPackage'] = probeCMS.createCMSInfoPackage();
      break;
    default:
      return;
  }

  worker_drawCMS.postMessage(workerJSON);
}

function workerRequest_DrawCMS() {
  var workerJSON = {};
  workerJSON['message'] = "draw";
  worker_drawCMS.postMessage(workerJSON);
}

//////////////////////////////////////////////
///  Worker Listener
//////////////////////////////////////////////

function workerListener_DrawCMS(e) {
  console.log("666", e.data.message);
}
