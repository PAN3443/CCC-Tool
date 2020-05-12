// Offscreen Canvas
var canvasList = [];
var typeList = []; // ccctest, collection, realdata
var subtypeList = []; // e.g. jump test ....
var optionsList = [];
var testFieldList = [];

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
var mainCMS = undefined;

var error = 100; // 0.01
var errorMath = 1e12;
var tmpWorkerType = undefined;
self.addEventListener('message', function(e) {

  if(e.data==undefined){
    console.debug("Worker",tmpWorkerType);
    return;
  }

  switch (e.data.message) {
    case "init":
      self.importScripts('../../../../Global/worker/general_processingCases.js');
      self.importScripts('workerFunctions_testing.js');
      worker_LoadColorClasses();

      self.importScripts('../../../global/fields/class_testField.js');

      self.importScripts('../../../../Global/helper/math.js');
      self.importScripts('../../../global/cms/cmsIntervalHelper.js');
      self.importScripts('../../../../Global/color/colorDifference.js');

      tmpWorkerType=e.data.initOption1;
      switch (e.data.initOption1) {
        case "CCCTest":
            self.importScripts('../testfunctions/cccTest.js');
          break;
          case "Collection":
            self.importScripts('../testfunctions/fct_collection/collection_BowlShaped.js');
            self.importScripts('../testfunctions/fct_collection/collection_localMinima.js');
            self.importScripts('../testfunctions/fct_collection/collection_ValleyShaped.js');
            self.importScripts('../testfunctions/fct_collection/collection_other.js');
          break;
          case "RealData":
            self.importScripts('../testfunctions/realWorldData.js');
          break;
      }

      self.importScripts('../../../../Global/helper/canvasHelper.js');

      //self.importScripts('../../../global/Color_CMS_Helpers/calcGradientLinear.js');

      mainCMS = new class_CMS();
    break;



    case "pushOptions":
        optionsList.push(e.data.optionsList);
    break;
    case "setType":
      typeList.push(e.data.type);
      subtypeList.push(e.data.subtype);
    break;

    case "pushCanvas":
        canvasList.push(e.data.canvas);
        var newTestField = new class_TestField(0,0);
        testFieldList.push(newTestField);
    break;
    case "calcTestFields":

      for (var i = 0; i < typeList.length; i++) {
        calc_Preview_TestingField(i);
      }
    break;

    case "getRealWorldData_IMG":

      while(optionsList.length<=e.data.index){
        optionsList.push(undefined);
      }

      optionsList[e.data.index] = e.data.img;
    break;


    case "getImgData":

      for (var i = 0; i < testFieldList.length; i++) {
        var answerJSON = {};
        answerJSON['canvasID'] = canvasList[i];
        answerJSON['imageData'] = calculateImageData(testFieldList[i],false);
        self.postMessage(answerJSON);
      }

    break;

    case "drawTestField":
      console.log("drawData");

    break;

  default:
    generalJSON_Processing(e.data);

  }

}, false);
