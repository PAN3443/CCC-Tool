var testField = undefined;
var testtype = undefined;
var testsubtype = undefined;
var testoptions = undefined;

var testMappingMesh = undefined;
var testMappingMeshGrey = undefined;
var testMappingMeshData = [];

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

// real world data
var imgData_medical = [];
var imgData_scientificFlowSim = [];
var imgData_photographs = [];

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

      self.importScripts('../../../Classes/Domain/class_testField.js');
      self.importScripts('../../../Worker/workerFiles/Testing/workerFunctions_testing.js');

      self.importScripts('../../../Sections/Testing/Testfunctions/cccTest.js');
      self.importScripts('../../../Sections/Testing/Testfunctions/FctCollection/collection_BowlShaped.js');
      self.importScripts('../../../Sections/Testing/Testfunctions/FctCollection/collection_localMinima.js');
      self.importScripts('../../../Sections/Testing/Testfunctions/FctCollection/collection_ValleyShaped.js');
      self.importScripts('../../../Sections/Testing/Testfunctions/FctCollection/collection_other.js');
      self.importScripts('../../../Sections/Testing/Testfunctions/realWorldData.js');

      // For Noise Field
      self.importScripts('../../../GlobalEvents/CMSColorGradient/calcGradientHSV.js');
      self.importScripts('../../../GlobalEvents/CMSColorGradient/calcGradientLinear.js');

      self.importScripts('../../../GlobalEvents/Helpers/random.js');
      self.importScripts('../../../Sections/Testing/InteractiveTest/Noise/simplexNoise.js');

      // For ThreeJS Mesh
      self.importScripts('../../../../libs/ThreeJS/three.min.js');

      globalCMS1 = new class_CMS();

      testField = new class_TestField(0,0);
    break;

    case "calcNoiseField":
      /*testField.setNoise(e.data.addNoise);
      testField.setNoiseField(e.data.noiseField,e.data.noiseBehavior,e.data.maxChange,e.data.replaceNoiseFrom,e.data.replaceNoiseTill);*/
      testField.generateNoiseField(e.data.noiseType,
        e.data.noiseBehavior,
        e.data.noiseMaxChange,
        e.data.noiseProportion,
        e.data.noiseDistribution,
        e.data.noiseScaling,
        e.data.replaceFrom,
        e.data.replaceNoiseTill);

      /// give main thread an example image of the noise and a histogram describing the distribution of the noise field
      var answerJSON = {};
      answerJSON['visType'] = "noiseExample";
      answerJSON['canvasID'] = "id_TestPage_newTestNoiseCanvas";
      answerJSON['imageData'] = testField.generateNoiseExampleImage();
      self.postMessage(answerJSON);

      answerJSON = {};
      answerJSON['visType'] = "noiseHisto";
      answerJSON['canvasID'] = "id_TestPage_newTestNoiseDistributionCanvas";
      answerJSON['histoData'] = testField.generateNoiseDistributionHisto();
      self.postMessage(answerJSON);

    break;

    case "pushRealWorldData":

      switch (e.data.type) {
        case "medical":
          while (imgData_medical.length<=e.data.index) {
            imgData_medical.push(undefined);
          }
          imgData_medical[e.data.index]=e.data.imgData;
        break;
        case "scientificFlowSim":
          while (imgData_scientificFlowSim.length<=e.data.index) {
            imgData_scientificFlowSim.push(undefined);
          }
          imgData_scientificFlowSim[e.data.index]=e.data.imgData;
        break;
        case "photographs":
          while (imgData_photographs.length<=e.data.index) {
            imgData_photographs.push(undefined);
          }
          imgData_photographs[e.data.index]=e.data.imgData;
        break;
      }

    break;

    case "updateTest":
      testtype = e.data.type;
      testsubtype = e.data.subtype;
      testoptions = e.data.options;
      testField = new class_TestField(0,0);
      calc_Single_TestingField();
    break;

    case "getVisData":

      var answerJSON = {};
      answerJSON['visType'] = e.data.visType;

      switch (e.data.visType) {
        case "pixel":
          answerJSON['canvasID'] = "id_Test_PixelCanvas";
          answerJSON['canvasIDFull'] = "id_Test_PixelCanvasFull";
          answerJSON['imageData'] = calculateImageData(testField,false);
          answerJSON['canvasIDGrey'] = "id_Test_PixelCanvasGrey";
          answerJSON['canvasIDGreyFull'] = "id_Test_PixelCanvasGreyFull";
          answerJSON['imageDataGrey'] = calculateImageData(testField,true);
          break;
        case "mesh":
            calculateTransferMeshData(testField,e.data.do3DTestField,e.data.scalefactor3DTest);
            answerJSON['testMappingMeshData'] = testMappingMeshData;
        break;
      }
      self.postMessage(answerJSON);

    break;

    case "draw":
      console.log("drawData");

    break;

  default:
    generalJSON_Processing(e.data);


  }

}, false);
