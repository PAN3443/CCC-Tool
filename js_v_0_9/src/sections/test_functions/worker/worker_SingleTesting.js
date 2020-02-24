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
      self.importScripts('../../../global/worker/general_processingCases.js');
      self.importScripts('workerFunctions_testing.js');
      worker_LoadColorClasses();

      self.importScripts('../../../global/helper/canvasHelper.js');
      self.importScripts('../../../global/fields/class_testField.js');
      self.importScripts('../../../global/helper/math.js');

      self.importScripts('../testfunctions/cccTest.js');
      self.importScripts('../testfunctions/fct_collection/collection_BowlShaped.js');
      self.importScripts('../testfunctions/fct_collection/collection_localMinima.js');
      self.importScripts('../testfunctions/fct_collection/collection_ValleyShaped.js');
      self.importScripts('../testfunctions/fct_collection/collection_other.js');
      self.importScripts('../testfunctions/realWorldData.js');

      //self.importScripts('../../../GlobalEvents/Color_CMS_Helpers/calcGradientLinear.js');

      self.importScripts('../../../global/helper/random.js');
      self.importScripts('../../../global/cms/cmsIntervalHelper.js');
      self.importScripts('../../../global/color/colorDifference.js');

      self.importScripts('../interactiveTest/simplexNoise.js');

      // For ThreeJS Mesh
      self.importScripts('../../../../libs/ThreeJS/three.min.js');

      globalCMS1 = new class_CMS();
      greyScaledCMS = new class_CMS();
      greyScaledCMS.pushKey(new class_Key(undefined, new class_Color_LAB(0,0,0), 0, false));
      greyScaledCMS.pushKey(new class_Key(new class_Color_LAB(100,0,0), undefined, 1, false));
      greyScaledCMS.setInterpolationSpace("de2000-ds");
      greyScaledCMS.calcNeededIntervalsColors(false,undefined,undefined);

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

      if(testField!=undefined)
        testField.deleteReferences();

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
