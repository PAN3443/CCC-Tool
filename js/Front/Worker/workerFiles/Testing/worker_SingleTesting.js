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
var greyScaledCMS = undefined;

var error = 100; // 0.01
var errorMath = 1e12;


self.addEventListener('message', function(e) {

  switch (e.data.message) {

    case "init":
      self.importScripts('../../processingCases.js');
      self.importScripts('../../../GlobalEvents/Helpers/math.js');
      worker_LoadColorClasses();

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

      self.importScripts('../../../GlobalEvents/Helpers/random.js');
      self.importScripts('../../../Sections/Testing/InteractiveTest/Noise/simplexNoise.js');

      // For ThreeJS Mesh
      self.importScripts('../../../../libs/ThreeJS/three.min.js');

      globalCMS1 = new class_CMS();
      greyScaledCMS = new class_CMS();

      greyScaledCMS.pushKey(new class_Key(undefined, new classColor_LAB(0,0,0), 0, false));
      greyScaledCMS.pushKey(new class_Key(new classColor_LAB(8.584251408919807,0,0), new classColor_LAB(8.584251408919807,0,0), 1.0-0.9331267977291702, false));
      greyScaledCMS.pushKey(new class_Key(new classColor_LAB(17.45589136962069,0,0), new classColor_LAB(17.45589136962069,0,0), 1.0-0.857733338111792, false));
      greyScaledCMS.pushKey(new class_Key(new classColor_LAB(26.624541242866588,0,0), new classColor_LAB(26.624541242866588,0,0), 1.0-0.7717210813652056, false));
      greyScaledCMS.pushKey(new class_Key(new classColor_LAB(36.10014449892251,0,0), new classColor_LAB(36.10014449892251,0,0), 1.0-0.6724353282071089, false));
      greyScaledCMS.pushKey(new class_Key(new classColor_LAB(45.89297750132293,0,0), new classColor_LAB(45.89297750132293,0,0), 1.0-0.5540357402164376, false));
      greyScaledCMS.pushKey(new class_Key(new classColor_LAB(56.01366065166631,0,0), new classColor_LAB(56.01366065166631,0,0), 1.0-0.42607923480947885, false));
      greyScaledCMS.pushKey(new class_Key(new classColor_LAB(66.47316990752064,0,0), new classColor_LAB(66.47316990752064,0,0), 1.0-0.30343212796712415, false));
      greyScaledCMS.pushKey(new class_Key(new classColor_LAB(77.28284868593305,0,0), new classColor_LAB(77.28284868593305,0,0), 1.0-0.19353721300887902, false));
      greyScaledCMS.pushKey(new class_Key(new classColor_LAB(88.45442016545135,0,0), new classColor_LAB(88.45442016545135,0,0), 1.0-0.09275388606291055, false));
      greyScaledCMS.pushKey(new class_Key(new classColor_LAB(100,0,0), undefined, 1, false));
      greyScaledCMS.setInterpolationSpace("lab");

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
      answerJSON['type'] = "noiseExample";
      answerJSON['canvasID'] = "id_TestPage_newTestNoiseCanvas";
      answerJSON['imageData'] = testField.generateNoiseExampleImage();
      self.postMessage(answerJSON);

      answerJSON = {};
      answerJSON['type'] = "noiseHisto";
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
      answerJSON['type'] = e.data.visType;

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
    case "sendTestfield":
      var answerJSON = {};
      answerJSON['type'] = "sendTestfield";
      answerJSON['arrayIndex'] = e.data.arrayIndex;
      var testFieldArray = [];

      if(testField.getCellValues()){
        for (var x = 0; x < testField.getXDim()-1; x++) {
          var tmpArray = [];
          for (var y = 0; y < testField.getYDim()-1; y++) {
            var value = testField.getFieldValue(x,y);
            tmpArray.push(value);
          }
          testFieldArray.push(tmpArray);
        }
      }
      else {
        for (var x = 0; x < testField.getXDim(); x++) {
          var tmpArray = [];
          for (var y = 0; y < testField.getYDim(); y++) {
            var value = testField.getFieldValue(x,y);
            tmpArray.push(value);
          }
          testFieldArray.push(tmpArray);
        }
      }

      answerJSON['testField'] = testFieldArray;
      self.postMessage(answerJSON);
    break;
    case "draw":
      console.log("drawData");

    break;

  default:
    generalJSON_Processing(e.data);


  }

}, false);
