///////////////////////////////////////////////
/// Pathplot 3D Vars
// Lab
var positionsLAB=[];
var labABMax = 0;
var labSPos = -150.0; // -100-200
var labEPos = 150.0; // -100-200

// din99
var positionsDIN99=[];
var din99ABMax = 0;
var din99SPos = -150.0; // -100-200
var din99EPos = 150.0; // -100-200

// LMS
var positionsLMS =[];
var lms3D_lmsStep = 1;
/////////////////////////////////////////////////

/// color settings
var din99_kE = undefined;
var din99_kCH = undefined;
var cielab_ref_X = undefined;
var cielab_ref_Y = undefined;
var cielab_ref_Z = undefined;

// Simulation Colorblindness
var doColorblindnessSim = false;
var tmXYZ_Selected = undefined;
var tmXYZ_Selected_Inv = undefined;
var tmLMS_Selected = undefined;
var tmLMS_Selected_Inv = undefined;
var sim_AdaptiveColorblindness = undefined;

var error = 100; // 0.01
var errorMath = 1e12;

self.addEventListener('message', function(e) {
  switch (e.data.message) {
    case "init":
      self.importScripts('../worker/general_processingCases.js');

      tmXYZ_Selected = [
        [0.4124564, 0.3575761, 0.1804375],
        [0.2126729, 0.7151522, 0.0721750],
        [0.0193339, 0.1191920, 0.9503041]
      ];

      tmXYZ_Selected_Inv = [
        [3.2404542, -1.5371385, -0.4985314],
        [-0.9692660, 1.8760108, 0.0415560],
        [0.0556434, -0.2040259, 1.0572252]
      ];

      tmLMS_Selected = [
        [0.38971, 0.68898, -0.07868],
        [-0.22981, 1.18340, 0.04641],
        [0, 0, 1]
      ];

      tmLMS_Selected_Inv = [
        [5917000000 / 3097586539, -3444900000 / 3097586539, 625427369 / 3097586539],
        [1149050000 / 3097586539, 1948550000 / 3097586539, -49903 / 6195173078],
        [0, 0, 1]
      ];

      self.importScripts('../color/class_Colorspace_RGB.js');
      self.importScripts('../color/class_Colorspace_XYZ.js');
      self.importScripts('../color/class_Colorspace_LMS.js');
      self.importScripts('../color/class_Colorspace_HSV.js');
      self.importScripts('../color/class_Colorspace_LAB.js');
      self.importScripts('../color/class_Colorspace_LCH.js');
      self.importScripts('../color/class_Colorspace_DIN99.js');

      self.importScripts('../helper/math.js');
      self.importScripts('../color/calcSpaceGrid.js');

    break;
    case "updateModels":
      var answerJSON = {};
      calcSpaceGridLAB();
      answerJSON['type'] = "lab";
      answerJSON['labSPos'] = labSPos;
      answerJSON['labEPos'] = labEPos;
      answerJSON['labABMax'] = labABMax;
      answerJSON['positions'] = positionsLAB;
      self.postMessage(answerJSON);
      calcSpaceGridDIN99();
      answerJSON = {};
      answerJSON['type'] = "din99";
      answerJSON['positions'] = positionsDIN99;
      answerJSON['din99ABMax'] = din99ABMax;
      answerJSON['din99SPos'] = din99SPos;
      answerJSON['din99EPos'] = din99EPos;
      self.postMessage(answerJSON);
      calcSpaceGridLMS();
      answerJSON = {};
      answerJSON['type'] = "lms";
      answerJSON['positions'] = positionsLMS;
      answerJSON['lms3D_lmsStep'] = lms3D_lmsStep;
      self.postMessage(answerJSON);
    break;
  default:
    generalJSON_Processing(e.data);


  }

}, false);
