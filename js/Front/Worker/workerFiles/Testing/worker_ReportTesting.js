var testfield = undefined;
var colorField = undefined;
var testTensorFieldValues = undefined;
var testTensorFieldColorDif = undefined;
var reportOptions_ColorDif = 2;

var reportType = undefined;

// Offscreen Canvas
var canvas = undefined;
var canvasContex = undefined;

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


// CMS
var globalCMS1 = undefined;

var error = 100; // 0.01
var errorMath = 1e12;


self.addEventListener('message', function(e) {

  switch (e.data.message) {

    case "init":
      self.importScripts('../../processingCases.js');
      // Colors
      self.importScripts('../../../Classes/ColormapClass/class_Colorspace_RGB.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colorspace_XYZ.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colorspace_LMS.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colorspace_HSV.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colorspace_LAB.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colorspace_DIN99.js');

      self.importScripts('../../../Classes/ColormapClass/class_colormapSpecification.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colormap_Key.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colormap_Interval.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colormap_Probe.js');
      self.importScripts('../../../Classes/ColormapClass/class_Colormap_ProbeSet.js');

      self.importScripts('../../../GlobalEvents/Helpers/canvasHelpers.js');
      self.importScripts('../../../GlobalEvents/Helpers/calcColordifference.js');

      self.importScripts('../../../Sections/Testing/Report/calc_Report.js');
      self.importScripts('../../../Sections/Testing/Report/calcTensorDiff.js');
      self.importScripts('../../../GlobalEvents/Helpers/math.js');

      self.importScripts('../../../Worker/workerFiles/Testing/workerFunctions_Report.js');

      // For ThreeJS Mesh
      self.importScripts('../../../../libs/ThreeJS/three.min.js');

      globalCMS1 = new class_CMS();
      reportType = e.data.reportType;

    break;

    case "Testfield":
      testfield = e.data.testfield;
      reportOptions_ColorDif= e.data.reportOptions_ColorDif;
      testTensorFieldValues = calcTensorValueDif(testfield);
      colorfield = calcColorField();
      testTensorFieldColorDif = calcTensorColorDif(colorfield,reportOptions_ColorDif);
      startReportCalc();
    break;

    case "calcTensorField":
      reportOptions_ColorDif= e.data.reportOptions_ColorDif;
      testTensorFieldValues = calcTensorValueDif(testfield);
      colorfield = calcColorField();
      testTensorFieldColorDif = calcTensorColorDif(colorfield,reportOptions_ColorDif);
      startReportCalc();
    break;

    case "calcReport":
      // new CMS
      colorfield = calcColorField();
      testTensorFieldColorDif = calcTensorColorDif(colorfield,reportOptions_ColorDif);
      startReportCalc();
    break;

  default:
    generalJSON_Processing(e.data);


  }

}, false);
