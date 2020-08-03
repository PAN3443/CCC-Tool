class class_TestFunction_Section extends class_Section {

  constructor() {
    super('id_TestingPage');

    this.testingCMS = new class_CMS();

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
    //this.element_singleTest.resize();
  }


  showSection() {
    if (typeof(Worker) === undefined) {
      openAlert("Attention".bold() + ": Your browser does not support Worker. Therefore the test function section of the CCC-Tool won't work. Please use another brower for this functionality.\n");
      return;
    }

    super.showSection(false); // no automatic updateSection

    var selectobject = document.getElementById("id_TestSection_CMS_Select")
    for (var i = selectobject.length - 1; i >= 0; i--) {
      selectobject.remove(i);
    }

    if (this.backSection === "id_EditPage") {
      // => single CMS
      document.getElementById("id_TestPage_CMS_VIS_ColormapLinear").style.width = "100vw";
      document.getElementById("id_TestSection_CMS_Label").style.display = "none";
      selectobject.style.display = "none";
    } else {
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
      this.testingCMS.setCMSFromPackage(myDesignsSection.getMyDesignCMS(0));
    }
    this.inform_Worker_GeneralInformations();
    var cmsJSON=json_message_sendCMS(this.testingCMS.createCMSInfoPackage());
    this.element_testCollection.worker_testCollection_CCCTest.postMessage(cmsJSON);
    this.element_testCollection.worker_testCollection_Collection.postMessage(cmsJSON);
    this.element_testCollection.worker_testCollection_RealWorldData.postMessage(cmsJSON);
    this.element_singleTest.worker_testInteractive.postMessage(cmsJSON);
    this.element_testReport.worker_testreport.postMessage(cmsJSON);
    this.testingCMS.drawCMS_Horizontal("id_TestPage_CMS_VIS_ColormapLinear", 1000, 1);
    this.updateSection();
    this.element_testCollection.showElement();
  }

  setCMS(cmsInfoPackage) {
    this.testingCMS.setCMSFromPackage(cmsInfoPackage);
  }

  updateSection() {
    this.element_singleTest.updateElement();

    this.element_testCollection.updateElement();

    if(this.element_testReport.isElementOpen())
      this.element_testReport.updateElement();
  }

  selectTestingCMS(){
    this.testingCMS.setCMSFromPackage(myDesignsSection.getMyDesignCMS(document.getElementById("id_TestSection_CMS_Select").selectedIndex));
    var cmsJSON=json_message_sendCMS(this.testingCMS.createCMSInfoPackage());
    this.element_testCollection.worker_testCollection_CCCTest.postMessage(cmsJSON);
    this.element_testCollection.worker_testCollection_Collection.postMessage(cmsJSON);
    this.element_testCollection.worker_testCollection_RealWorldData.postMessage(cmsJSON);
    this.element_singleTest.worker_testInteractive.postMessage(cmsJSON);
    this.element_testReport.worker_testreport.postMessage(cmsJSON);
    this.testingCMS.drawCMS_Horizontal("id_TestPage_CMS_VIS_ColormapLinear", 1000, 1);
    this.updateSection();
  }

  inform_Worker_GeneralInformations(){
    var workerJSON = json_message_colorblindSimInfo();
    this.element_testCollection.worker_testCollection_CCCTest.postMessage(workerJSON);
    this.element_testCollection.worker_testCollection_Collection.postMessage(workerJSON);
    this.element_testCollection.worker_testCollection_RealWorldData.postMessage(workerJSON);
    this.element_singleTest.worker_testInteractive.postMessage(workerJSON);
    this.element_testReport.worker_testreport.postMessage(workerJSON);

    workerJSON = json_message_colorSettingsInfo();
    this.element_testCollection.worker_testCollection_CCCTest.postMessage(workerJSON);
    this.element_testCollection.worker_testCollection_Collection.postMessage(workerJSON);
    this.element_testCollection.worker_testCollection_RealWorldData.postMessage(workerJSON);
    this.element_singleTest.worker_testInteractive.postMessage(workerJSON);
    this.element_testReport.worker_testreport.postMessage(workerJSON);

    workerJSON = json_message_metricInfo();
    this.element_testCollection.worker_testCollection_CCCTest.postMessage(workerJSON);
    this.element_testCollection.worker_testCollection_Collection.postMessage(workerJSON);
    this.element_testCollection.worker_testCollection_RealWorldData.postMessage(workerJSON);
    this.element_singleTest.worker_testInteractive.postMessage(workerJSON);
    this.element_testReport.worker_testreport.postMessage(workerJSON);
  }

  };