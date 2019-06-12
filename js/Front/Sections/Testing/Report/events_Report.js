
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


function eventZoomReport(e){

  var element = document.getElementById(e.target.id);

  if(event.deltaY>0){
    if(zoomStatus==100)
    return;

    zoomStatus-=10;
  }

  if(event.deltaY<0){
    zoomStatus+=10;
  }

  changeReportZoom("id_TestPage_ReportOrginalCCanvas");
  changeReportZoom("id_TestPage_ReportOrginalGCanvas");
  changeReportZoom("id_TestPage_Report0Canvas");
  changeReportZoom("id_TestPage_Report1Canvas");
  changeReportZoom("id_TestPage_Report2Canvas");
}

function changeReportZoom(id){
  document.getElementById(id).style.height = zoomStatus+"%";
  document.getElementById(id).style.width = zoomStatus+"%";
}

function eventScrollReport(e){
  var element = document.getElementById(e.target.id);
  var scrollTop=element.scrollTop;
  var scrollLeft=element.scrollLeft;
  changeReportScroll("id_TestPage_ReportOrginalCDiv",scrollTop,scrollLeft);
  changeReportScroll("id_TestPage_ReportOrginalGDiv",scrollTop,scrollLeft);
  changeReportScroll("id_TestPage_Report0Div",scrollTop,scrollLeft);
  changeReportScroll("id_TestPage_Report1Div",scrollTop,scrollLeft);
  changeReportScroll("id_TestPage_Report2Div",scrollTop,scrollLeft);
}

function changeReportScroll(id,scrollTop,scrollLeft){
  document.getElementById(id).scrollTop = scrollTop;
  document.getElementById(id).scrollLeft = scrollLeft;
}
