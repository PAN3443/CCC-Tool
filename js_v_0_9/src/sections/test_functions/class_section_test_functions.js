class class_TestFunction_Section extends class_Section {

  constructor() {
    super('id_TestingPage');

    if (typeof (Worker) === undefined){
      return;
    }

    /*this.worker_testCollection_CCCTest = new Worker(version_JS_FolderName+"/worker/worker_PreviewTesting.js", { type: "module" });
    this.worker_testCollection_CCCTest.postMessage({'message':'init', 'initOption1' : 'CCCTest'});
    this.worker_testCollection_CCCTest.addEventListener('message', workerEvent_DrawPreviewTestfunction, false);
    this.worker_testCollection_Collection = new Worker(version_JS_FolderName+"/worker/worker_PreviewTesting.js", { type: "module" });
    this.worker_testCollection_Collection.postMessage({'message':'init', 'initOption1' : 'Collection'});
    this.worker_testCollection_Collection.addEventListener('message', workerEvent_DrawPreviewTestfunction, false);
    this.worker_testCollection_RealWorldData = new Worker(version_JS_FolderName+"/worker/worker_PreviewTesting.js", { type: "module" });
    this.worker_testCollection_RealWorldData.postMessage({'message':'init', 'initOption1' : 'RealData'});
    this.worker_testCollection_RealWorldData.addEventListener('message', workerEvent_DrawPreviewTestfunction, false);*/

    //this.worker_testInteractive = new Worker(version_JS_FolderName+"/worker/worker_SingleTesting.js", { type: "module" });
    /*this.worker_testInteractive.postMessage({'message':'init'});
    this.worker_testInteractive.addEventListener('message', workerEvent_DrawTestfunction, false);
    init_Worker_SingleTesting_LoadRealWorld();*/

    this.backSection = undefined;
  }

  showSection(){
    if (typeof (Worker) === undefined){
      openAlert("Attention".bold()+": Your browser does not support Worker. Therefore the test function section of the CCC-Tool won't work. Please use another brower for this functionality.\n");
      return;
    }

    if(this.backSection==="edit"){

    }
    else{

    }
    super.showSection();
  }

  backToSection(){
    switch (this.backSection) {
      case "edit":
        editSection.showSection();
        break;
        case "gallery":
          gallerySection.showSection();
          break;
          case "myDesigns":
            myDesignsSection.showSection();
            break;
      default:
        myDesignsSection.showSection();
    }
  }

  updateSection(){

  }
};
