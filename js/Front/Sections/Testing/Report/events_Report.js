
function updateReportList(selectedIndex){

  document.getElementById("id_TestPage_ReportList").innerHTML = "";
  for (var i = 0; i < reportListTestField.length; i++) {
    var option = document.createElement("option");
    option.innerHTML = "Testfield "+i+" ("+reportListTestInfo[i][1]+")";
    document.getElementById("id_TestPage_ReportList").add(option);
  }


  if(selectedIndex!=undefined && !isNaN(selectedIndex) && selectedIndex<reportListTestField.length)
    document.getElementById("id_TestPage_ReportList").selectedIndex=selectedIndex;
  else
    document.getElementById("id_TestPage_ReportList").selectedIndex=0;

  open_Report();
}

function calc_Report(){
  inform_Worker_CalcReport(testfunctionWorker_Report0);
}

function open_Report(){
  var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;
  inform_Worker_Testfield (testfunctionWorker_Report0,selectedIndex);

}

function updateReportTensorFields(){
  inform_Worker_Tensorfield(testfunctionWorker_Report0);
}

function remove_Report(){

  var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;

  if(reportListTestField.length==1){
    var reportListTestInfo = [];
    var reportListTestField = [];
    document.getElementById("id_Test_pageSwitchStatus2").style.visibility = "hidden";
    testingModus=0;
    slideTestDisplayDivs();
  }
  else{
    updateReportList();
  }

}
