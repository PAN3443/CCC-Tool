var testField = undefined;
var testtype = undefined;
var testsubtype = undefined;
var testoptions = undefined;

var testMappingMesh = undefined;
var testMappingMeshGrey = undefined;
var testMappingMeshData = [];


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
var tmXYZ_Selected = undefined;
var tmXYZ_Selected_Inv = undefined;
var tmLMS_Selected = undefined;
var tmLMS_Selected_Inv = undefined;
var sim_AdaptiveColorblindness = undefined;

// CMS
var editCMS = undefined;
var optiCMS = undefined;
var probeCMS = undefined;

// Offscreen Canvas
var canvas = undefined;
var canvasContex = undefined;

var error = 100; // 0.01
var errorMath = 1e12;


self.addEventListener('message', function(e) {
  switch (e.data.message) {
    case "init":
      self.importScripts('../../../../Global/worker/general_processingCases.js');
      self.importScripts('../../../../Global/helper/canvasHelper.js');

      // Colors
      self.importScripts('../../../../Global/color/class_Colorspace_Basis.js');
      self.importScripts('../../../../Global/color/class_Colorspace_RGB.js');
      self.importScripts('../../../../Global/color/class_Colorspace_XYZ.js');
      self.importScripts('../../../../Global/color/class_Colorspace_LMS.js');
      self.importScripts('../../../../Global/color/class_Colorspace_HSV.js');
      self.importScripts('../../../../Global/color/class_Colorspace_LAB.js');
      self.importScripts('../../../../Global/color/class_Colorspace_LCH.js');
      self.importScripts('../../../../Global/color/class_Colorspace_DIN99.js');

      self.importScripts('../../../global/cms/class_Colormap_Specification.js');
      self.importScripts('../../../global/cms/class_Colormap_Key.js');
      self.importScripts('../../../global/cms/class_Colormap_Interval.js');
      self.importScripts('../../../global/cms/class_Colormap_Probe.js');
      self.importScripts('../../../global/cms/class_Colormap_ProbeSet.js');

      self.importScripts('../../../global/cms/cmsIntervalHelper.js');
      self.importScripts('../../../../Global/color/colorDifference.js');

      editCMS = new class_CMS();
      optiCMS = new class_CMS();
      probeCMS = new class_CMS();
    break;
    case "setCMSName":

    break;
    case "getCMSName":

    break;

  default:
    generalJSON_Processing(e.data);


  }

}, false);
