class class_TestFunction_Section extends class_Section {

  constructor() {
    super('id_TestingPage');

    if (typeof(Worker) === undefined) {
      return;
    }

    this.testingCMS = new class_CMS();
    this.backSection = undefined;

    ///////////////////////////////////////////////
    /// Init
    document.getElementById('id_Test_MeshVisDiv').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_Test_MeshVisDiv').addEventListener("mousemove", tm_3D_mousemove);
    document.getElementById('id_Test_MeshVisDiv').addEventListener("mouseleave", tm_3D_mouseleave);
    document.getElementById('id_Test_MeshVisDiv').addEventListener("mousedown", tm_3D_mousedown);
    document.getElementById('id_Test_MeshVisDiv').addEventListener("mouseup", tm_3D_mouseup);
    document.getElementById('id_Test_MeshVisDiv').addEventListener("wheel", tm_3D_mousewheel);

    document.getElementById('id_Test_MeshVisDivGrey').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mousemove", tm_3D_mousemove);
    document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mouseleave", tm_3D_mouseleave);
    document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mousedown", tm_3D_mousedown);
    document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mouseup", tm_3D_mouseup);
    document.getElementById('id_Test_MeshVisDivGrey').addEventListener("wheel", tm_3D_mousewheel);

    document.getElementById('id_Test_MeshVisDivFull').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_Test_MeshVisDivFull').addEventListener("mousemove", tm_3D_mousemove);
    document.getElementById('id_Test_MeshVisDivFull').addEventListener("mouseleave", tm_3D_mouseleave);
    document.getElementById('id_Test_MeshVisDivFull').addEventListener("mousedown", tm_3D_mousedown);
    document.getElementById('id_Test_MeshVisDivFull').addEventListener("mouseup", tm_3D_mouseup);
    document.getElementById('id_Test_MeshVisDivFull').addEventListener("wheel", tm_3D_mousewheel);

    document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mousemove", tm_3D_mousemove);
    document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mouseleave", tm_3D_mouseleave);
    document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mousedown", tm_3D_mousedown);
    document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mouseup", tm_3D_mouseup);
    document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("wheel", tm_3D_mousewheel);
    ////// Init interactive Tests

    this.element_singleTest = new class_Element_SingleTest("id_Test_SingleTestDiv","id_Test_SwitchToSingleTest");
    this.element_testCollection = new class_Element_Collection("id_Test_FunctionCollection","id_Test_SwitchToCollection");
    this.element_testReport = new class_Element_TestReport("id_Test_ReportDiv","id_Test_SwitchToReport");

  }

  resize(){
    this.element_singleTest.resize();
    //this.element_testCollection.resize();
    //this.element_testReport.resize();
  }


  showSection() {
    if (typeof(Worker) === undefined) {
      openAlert("Attention".bold() + ": Your browser does not support Worker. Therefore the test function section of the CCC-Tool won't work. Please use another brower for this functionality.\n");
      return;
    }

    var selectobject = document.getElementById("id_TestSection_CMS_Select")
    for (var i = selectobject.length - 1; i >= 0; i--) {
      selectobject.remove(i);
    }

    if (this.backSection === "myDesigns") {
      // => many CMS for switching
      document.getElementById("id_TestPage_CMS_VIS_ColormapLinear").style.width = "75vw";
      document.getElementById("id_TestSection_CMS_Label").style.display = "block";
      selectobject.style.display = "block";
      for (var i = 0; i < myDesignsSection.getMyDesignLength(); i++) {
        var optionCMS = document.createElement("option");
        optionCMS.innerHTML = myDesignsSection.getMyDesignCMSName(i);
        selectobject.add(optionCMS);
      }
      selectobject.selectedIndex = 0;
      this.testingCMS = myDesignsSection.getMyDesignCMS(0);
    } else {
      // => single CMS
      document.getElementById("id_TestPage_CMS_VIS_ColormapLinear").style.width = "100vw";
      document.getElementById("id_TestSection_CMS_Label").style.display = "none";
      selectobject.style.display = "none";
    }
    var cmsJSON=json_message_sendCMS(cloneCMS(this.testingCMS));
    this.element_testCollection.worker_testCollection_CCCTest.postMessage(cmsJSON);
    this.element_testCollection.worker_testCollection_Collection.postMessage(cmsJSON);
    this.element_testCollection.worker_testCollection_RealWorldData.postMessage(cmsJSON);
    this.element_singleTest.worker_testInteractive.postMessage(cmsJSON);
    this.testingCMS.drawCMS_Horizontal("id_TestPage_CMS_VIS_ColormapLinear", 1000, 1);
    this.inform_Worker_GeneralInformations();
    super.showSection();
    this.element_testCollection.showElement();
  }

  setCMS(cms) {
    this.testingCMS.deleteReferences();
    this.testingCMS = cms;
  }

  backToSection() {
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

  updateSection() {
    this.element_singleTest.updateElement();
    this.element_testCollection.updateElement();
    this.element_testReport.updateElement();
  }

  selectTestingCMS(){
    this.testingCMS.deleteReferences();
    this.testingCMS = myDesignsSection.getMyDesignCMS(document.getElementById("id_TestSection_CMS_Select").selectedIndex);
    var cmsJSON=json_message_sendCMS(cloneCMS(this.testingCMS));
    this.element_testCollection.worker_testCollection_CCCTest.postMessage(cmsJSON);
    this.element_testCollection.worker_testCollection_Collection.postMessage(cmsJSON);
    this.element_testCollection.worker_testCollection_RealWorldData.postMessage(cmsJSON);
    this.element_singleTest.worker_testInteractive.postMessage(cmsJSON);
    this.testingCMS.drawCMS_Horizontal("id_TestPage_CMS_VIS_ColormapLinear", 1000, 1);
    this.updateSection();
  }

  inform_Worker_GeneralInformations(){
    var workerJSON = {};
    workerJSON['message'] = "colorSimSettings";
    workerJSON['doColorblindnessSim'] = doColorblindnessSim;
    workerJSON['tmXYZ_Selected'] = tmXYZ_Selected;
    workerJSON['tmXYZ_Selected_Inv'] = tmXYZ_Selected_Inv;
    workerJSON['tmLMS_Selected'] = tmLMS_Selected;
    workerJSON['tmLMS_Selected_Inv'] = tmLMS_Selected_Inv;
    workerJSON['sim_AdaptiveColorblindness'] = sim_AdaptiveColorblindness;
    this.element_testCollection.worker_testCollection_CCCTest.postMessage(workerJSON);
    this.element_testCollection.worker_testCollection_Collection.postMessage(workerJSON);
    this.element_testCollection.worker_testCollection_RealWorldData.postMessage(workerJSON);
    this.element_singleTest.worker_testInteractive.postMessage(workerJSON);

    workerJSON = {};
    workerJSON['message'] = "colorSettings";
    workerJSON['din99_kE'] = din99_kE;
    workerJSON['din99_kCH'] = din99_kCH;
    workerJSON['cielab_ref_X'] = cielab_ref_X;
    workerJSON['cielab_ref_Y'] = cielab_ref_Y;
    workerJSON['cielab_ref_Z'] = cielab_ref_Z;
    this.element_testCollection.worker_testCollection_CCCTest.postMessage(workerJSON);
    this.element_testCollection.worker_testCollection_Collection.postMessage(workerJSON);
    this.element_testCollection.worker_testCollection_RealWorldData.postMessage(workerJSON);
    this.element_singleTest.worker_testInteractive.postMessage(workerJSON);

    workerJSON = {};
    workerJSON['message'] = "colorMetrics";
    // 2000
    workerJSON['de2000_k_L'] = de2000_k_L;
    workerJSON['de2000_k_C'] = de2000_k_C;
    workerJSON['de2000_k_H'] = de2000_k_H;
    // 94
    workerJSON['de94_k_L'] = de94_k_L;
    workerJSON['de94_k_C'] = de94_k_C;
    workerJSON['de94_k_H'] = de94_k_H;
    workerJSON['de94_k_1'] = de94_k_1;
    workerJSON['de94_k_2'] = de94_k_2;
    this.element_testCollection.worker_testCollection_CCCTest.postMessage(workerJSON);
    this.element_testCollection.worker_testCollection_Collection.postMessage(workerJSON);
    this.element_testCollection.worker_testCollection_RealWorldData.postMessage(workerJSON);
    this.element_singleTest.worker_testInteractive.postMessage(workerJSON);
  }

  };
