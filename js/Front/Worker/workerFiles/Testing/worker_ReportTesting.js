var testfield = undefined;
var colorField = undefined;
var testTensorFieldValues = undefined;
var testTensorFieldColorDif = undefined;
var reportOptions_ColorDif = 2;
var ratioFields = undefined;

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
var ratioDifCMS = undefined;

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

      self.importScripts('../../../GlobalEvents/CMSColorGradient/calcGradientHSV.js');
      self.importScripts('../../../GlobalEvents/CMSColorGradient/calcGradientLinear.js');

      // For ThreeJS Mesh
      self.importScripts('../../../../libs/ThreeJS/three.min.js');


      globalCMS1 = new class_CMS();
      ratioDifCMS = new class_CMS();
      reportType = e.data.reportType;

    break;

    case "defineReportCMS":
      ratioDifCMS.pushKey(new class_Key(undefined, new classColorDIN99(29.581458825788705,16.03125,-26.896446228027347), -1, false));
      ratioDifCMS.pushKey(new class_Key(new classColorDIN99(55.87141911613874,-7.531250000000001,-28.383946228027348), new classColorDIN99(55.87141911613874,-7.531250000000001,-28.383946228027348), -0.6446462116468379, false));
      ratioDifCMS.pushKey(new class_Key(new classColorDIN99(81.87664737898814,-20.531249999999996,-9.790196228027346), new classColorDIN99(81.87664737898814,-20.531249999999996,-9.790196228027346), -0.2977457733249843, false));
      ratioDifCMS.pushKey(new class_Key(new classColorDIN99(99.85395907566293,-0.9780546619960879,3.201916766455866), new classColorDIN99(99.85395907566293,-0.9780546619960879,3.201916766455866), 0, false));
      ratioDifCMS.pushKey(new class_Key(new classColorDIN99(86.74992752799066,-3.4687500000000013,25.166053771972656), new classColorDIN99(86.74992752799066,-3.4687500000000013,25.166053771972656), 0.2620538509705699, false));
      ratioDifCMS.pushKey(new class_Key(new classColorDIN99(61.129411174208734,20.093750000000004,25.90980377197265), new classColorDIN99(61.129411174208734,20.093750000000004,25.90980377197265), 0.6152160300563556, false));
      ratioDifCMS.pushKey(new class_Key(new classColorDIN99(28.529860414174685,30.656250000000004,10.291053771972658), undefined, 1, false));
    break;
    case "Testfield":
      testfield = e.data.testfield;
      reportOptions_ColorDif= e.data.reportOptions_ColorDif;
      testTensorFieldValues = calcValueDifField(testfield);
      colorfield = calcColorField();
      testTensorFieldColorDif = calcColorDifField(colorfield,reportOptions_ColorDif);
      startReportCalc();
    break;
    case "calcTensorField":
      reportOptions_ColorDif= e.data.reportOptions_ColorDif;
      testTensorFieldValues = calcValueDifField(testfield);
      colorfield = calcColorField();
      testTensorFieldColorDif = calcColorDifField(colorfield,reportOptions_ColorDif);
      startReportCalc();
    break;
    case "calcReport":
      // new CMS
      colorfield = calcColorField();
      testTensorFieldColorDif = calcColorDifField(colorfield,reportOptions_ColorDif);
      startReportCalc();
    break;
  default:
    generalJSON_Processing(e.data);


  }

}, false);
