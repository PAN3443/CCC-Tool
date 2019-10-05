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
var greyScaledCMS = undefined;

var error = 100; // 0.01
var errorMath = 1e12;


self.addEventListener('message', function(e) {

  switch (e.data.message) {

    case "init":
      self.importScripts('../../processingCases.js');
      worker_LoadColorClasses();

      self.importScripts('../../../GlobalEvents/Helpers/canvasHelpers.js');

      self.importScripts('../../../Sections/Testing/Report/calc_Report.js');
      self.importScripts('../../../Sections/Testing/Report/calcTensorDiff.js');
      self.importScripts('../../../GlobalEvents/Helpers/math.js');
      self.importScripts('../../../GlobalEvents/Color_CMS_Helpers/cmsIntervals.js');
      self.importScripts('../../../GlobalEvents/Color_CMS_Helpers/calcColordifference.js');

      self.importScripts('../../../Worker/workerFiles/Testing/workerFunctions_Report.js');

      self.importScripts('../../../GlobalEvents/Color_CMS_Helpers/calcGradientLinear.js');

      // For ThreeJS Mesh
      self.importScripts('../../../../libs/ThreeJS/three.min.js');


      globalCMS1 = new class_CMS();
      ratioDifCMS = new class_CMS();
      greyScaledCMS = new class_CMS();
      reportType = e.data.reportType;

    break;

    case "defineReportCMS":
      ratioDifCMS.setPreventIntervals(true);
      ratioDifCMS.pushKey(new class_Key(undefined, new class_Color_DIN99(29.581458825788705,16.03125,-26.896446228027347), -1, false));
      ratioDifCMS.pushKey(new class_Key(new class_Color_DIN99(55.87141911613874,-7.531250000000001,-28.383946228027348), new class_Color_DIN99(55.87141911613874,-7.531250000000001,-28.383946228027348), -0.6446462116468379, false));
      ratioDifCMS.pushKey(new class_Key(new class_Color_DIN99(81.87664737898814,-20.531249999999996,-9.790196228027346), new class_Color_DIN99(81.87664737898814,-20.531249999999996,-9.790196228027346), -0.2977457733249843, false));
      ratioDifCMS.pushKey(new class_Key(new class_Color_DIN99(99.85395907566293,-0.9780546619960879,3.201916766455866), new class_Color_DIN99(99.85395907566293,-0.9780546619960879,3.201916766455866), 0, false));
      ratioDifCMS.pushKey(new class_Key(new class_Color_DIN99(86.74992752799066,-3.4687500000000013,25.166053771972656), new class_Color_DIN99(86.74992752799066,-3.4687500000000013,25.166053771972656), 0.2620538509705699, false));
      ratioDifCMS.pushKey(new class_Key(new class_Color_DIN99(61.129411174208734,20.093750000000004,25.90980377197265), new class_Color_DIN99(61.129411174208734,20.093750000000004,25.90980377197265), 0.6152160300563556, false));
      ratioDifCMS.pushKey(new class_Key(new class_Color_DIN99(28.529860414174685,30.656250000000004,10.291053771972658), undefined, 1, false));
      ratioDifCMS.setAboveColor(new class_Color_RGB(1.0,0,0));
      ratioDifCMS.setBelowColor(new class_Color_RGB(0,0,1.0));
      ratioDifCMS.setInterpolationSpace("lab");

      greyScaledCMS.setPreventIntervals(true);
      greyScaledCMS.pushKey(new class_Key(undefined, new class_Color_LAB(0,0,0), 0, false));
      greyScaledCMS.pushKey(new class_Key(new class_Color_LAB(8.584251408919807,0,0), new class_Color_LAB(8.584251408919807,0,0), 1.0-0.9331267977291702, false));
      greyScaledCMS.pushKey(new class_Key(new class_Color_LAB(17.45589136962069,0,0), new class_Color_LAB(17.45589136962069,0,0), 1.0-0.857733338111792, false));
      greyScaledCMS.pushKey(new class_Key(new class_Color_LAB(26.624541242866588,0,0), new class_Color_LAB(26.624541242866588,0,0), 1.0-0.7717210813652056, false));
      greyScaledCMS.pushKey(new class_Key(new class_Color_LAB(36.10014449892251,0,0), new class_Color_LAB(36.10014449892251,0,0), 1.0-0.6724353282071089, false));
      greyScaledCMS.pushKey(new class_Key(new class_Color_LAB(45.89297750132293,0,0), new class_Color_LAB(45.89297750132293,0,0), 1.0-0.5540357402164376, false));
      greyScaledCMS.pushKey(new class_Key(new class_Color_LAB(56.01366065166631,0,0), new class_Color_LAB(56.01366065166631,0,0), 1.0-0.42607923480947885, false));
      greyScaledCMS.pushKey(new class_Key(new class_Color_LAB(66.47316990752064,0,0), new class_Color_LAB(66.47316990752064,0,0), 1.0-0.30343212796712415, false));
      greyScaledCMS.pushKey(new class_Key(new class_Color_LAB(77.28284868593305,0,0), new class_Color_LAB(77.28284868593305,0,0), 1.0-0.19353721300887902, false));
      greyScaledCMS.pushKey(new class_Key(new class_Color_LAB(88.45442016545135,0,0), new class_Color_LAB(88.45442016545135,0,0), 1.0-0.09275388606291055, false));
      greyScaledCMS.pushKey(new class_Key(new class_Color_LAB(100,0,0), undefined, 1, false));
      greyScaledCMS.setAboveColor(new class_Color_RGB(1.0,0,0));
      greyScaledCMS.setBelowColor(new class_Color_RGB(0,0,1.0));
      greyScaledCMS.setInterpolationSpace("lab");



    break;
    case "Testfield":
      testfield = e.data.testfield;
      reportOptions_ColorDif= e.data.reportOptions_ColorDif;
      calcColorField();
      sendReportOriginalImage();
      sendReportGreyImage();
      startReportCalc();
    break;
    case "calcTensorField":
      reportOptions_ColorDif= e.data.reportOptions_ColorDif;
      calcColorField();
      //sendReportOriginalImage();
      startReportCalc();
    break;
    case "calcReport":
      // new CMS
      calcColorField();
      sendReportOriginalImage();
      startReportCalc();
    break;
  default:
    generalJSON_Processing(e.data);


  }

}, false);
