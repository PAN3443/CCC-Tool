class class_Element_TestReport extends class_Testing_Element_Basis {

  constructor(divID,buttonID) {
    super(divID,buttonID);
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
