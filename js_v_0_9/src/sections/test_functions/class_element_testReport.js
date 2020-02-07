class class_Element_TestReport extends class_Testing_Element_Basis {

  constructor(divID,buttonID) {
    super(divID,buttonID);

    var selectedRealWorldType = undefined;

    var realWorldCanvasIndex = 0;

    var importRealDataField = [];

    var scientificMeasurmentsLabels = [];
    var scientificMeasurmentsFiles = [];
    var scientificMeasurmentsData = new Array(scientificMeasurmentsFiles.length);
    var scientificMeasurmentsAcknowlegments = [];

    var statisticalDataLabels = [];
    var statisticalDataFiles = [];
    var statisticalDataData = new Array(statisticalDataFiles.length);
    var statisticalDataAcknowlegments = [];

    //this.worker_testreport = new Worker(version_JS_FolderName+"/src/sections/test_functions/worker/worker_ReportTesting.js"); //, { type: "module" });
    //this.worker_testreport.postMessage({'message':'init'});
  }

  updateElement(){

  }

  inform_Worker_Testfield (index){
    var workerJSON = {};
    workerJSON['message'] = "Testfield";
    workerJSON['reportOptions_ColorDif'] = reportOptions_ColorDif;
    workerJSON['testfield'] = reportListTestField[index];
    return workerJSON;//*/
  }

};
