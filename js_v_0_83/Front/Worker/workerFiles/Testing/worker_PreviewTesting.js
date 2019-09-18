// Offscreen Canvas
var canvasList = [];
var typeList = []; // ccctest, collection, realdata
var subtypeList = []; // e.g. jump test ....
var optionsList = [];
var testFieldList = [];

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
      worker_LoadColorClasses();

      self.importScripts('../../../Classes/Domain/class_testField.js');
      self.importScripts('../../../Worker/workerFiles/Testing/workerFunctions_testing.js');
      self.importScripts('../../../GlobalEvents/Helpers/math.js');
      self.importScripts('../../../GlobalEvents/Color_CMS_Helpers/cmsIntervals.js');
      self.importScripts('../../../GlobalEvents/Color_CMS_Helpers/calcColordifference.js');

      switch (e.data.initOption1) {
        case "CCCTest":
          self.importScripts('../../../Sections/Testing/Testfunctions/cccTest.js');
          break;
          case "Collection":
            self.importScripts('../../../Sections/Testing/Testfunctions/FctCollection/collection_BowlShaped.js');
            self.importScripts('../../../Sections/Testing/Testfunctions/FctCollection/collection_localMinima.js');
            self.importScripts('../../../Sections/Testing/Testfunctions/FctCollection/collection_ValleyShaped.js');
            self.importScripts('../../../Sections/Testing/Testfunctions/FctCollection/collection_other.js');
          break;
          case "RealData":
            self.importScripts('../../../Sections/Testing/Testfunctions/realWorldData.js');
          break;

      }

      self.importScripts('../../../GlobalEvents/Helpers/canvasHelpers.js');

      self.importScripts('../../../GlobalEvents/Color_CMS_Helpers/calcGradientHSV.js');
      self.importScripts('../../../GlobalEvents/Color_CMS_Helpers/calcGradientLinear.js');

      globalCMS1 = new class_CMS();
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
