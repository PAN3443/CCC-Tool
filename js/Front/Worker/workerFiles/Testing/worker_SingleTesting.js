var testField = undefined;
var testtype = undefined;
var testsubtype = undefined;
var testoptions = undefined;


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


  return;
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

      self.importScripts('../../../Classes/Domain/class_testField.js');
      self.importScripts('../../../Worker/workerFiles/Testing/workerFunctions_testing.js');

      self.importScripts('../../../Sections/Testing/Testfunctions/cccTest.js');
      self.importScripts('../../../Sections/Testing/Testfunctions/FctCollection/collection_BowlShaped.js');
      self.importScripts('../../../Sections/Testing/Testfunctions/FctCollection/collection_localMinima.js');
      self.importScripts('../../../Sections/Testing/Testfunctions/FctCollection/collection_ValleyShaped.js');
      self.importScripts('../../../Sections/Testing/Testfunctions/FctCollection/collection_other.js');
      self.importScripts('../../../Sections/Testing/Testfunctions/realWorldData.js');


      self.importScripts('../../../GlobalEvents/CMSColorGradient/calcGradientHSV.js');
      self.importScripts('../../../GlobalEvents/CMSColorGradient/calcGradientLinear.js');

      globalCMS1 = new class_CMS();

      testField = new class_TestField(0,0);
    break;


    case "setTest":
      testtype = e.data.testtype;
      testsubtype = e.data.testsubtype;
      testoptions = e.data.testoptions;
    break;

    case "calcTestField":
        calc_TestingField(i);
    break;

    case "getIMGData":
      var answerJSON = {};
      answerJSON['canvasID'] = "id_Test_PixelCanvas";
      answerJSON['imageData'] = calculateImageData(testField,false);
      self.postMessage(answerJSON);

      var answerJSON = {};
      answerJSON['canvasID'] = "id_Test_PixelCanvasGrey";
      answerJSON['imageData'] = calculateImageData(testField,true);
      self.postMessage(answerJSON);
    break;

    case "getMeshData":

      console.log("getData");
    break;

    case "draw":
      console.log("drawData");

    break;

  default:

    //  generalJSON_Processing(e.data);


  }

}, false);
