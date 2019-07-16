



function switchToPreviousReport() {
    reportModus--;
    switchReportDisplay();
}

function switchToNextReport() {
  reportModus++;
  switchReportDisplay();
}

function setReportDisplay(type) {

  if(reportModus!=type){
    reportModus=type;
    switchReportDisplay();
  }

}

function switchReportDisplay(){

  document.getElementById("id_Report_pageSwitchDown").style.visibility = "hidden";
  document.getElementById("id_Report_pageSwitchUp").style.visibility = "hidden";

  document.getElementById("id_Report_pageSwitchStatus0").innerHTML = "&#x25CE;";
  document.getElementById("id_Report_pageSwitchStatus1").innerHTML = "&#x25CE;";
  document.getElementById("id_Report_pageSwitchStatus2").innerHTML = "&#x25CE;";

  switch (reportModus) {
    case 0:
    document.getElementById("id_report_TestInfoDiv").style.height = "83vh";
    document.getElementById("id_report_SubReportDiv").style.height = "0vh";
    document.getElementById("id_report_OtherReportDiv").style.height = "0vh";
    document.getElementById("id_Report_pageSwitchDown").style.visibility = "visible";
    document.getElementById("id_Report_pageSwitchStatus0").innerHTML = "&#x25C9;";
    document.getElementById("id_reportPageLabel").innerHTML = "Test List";
    break;
    case 1:
      document.getElementById("id_report_TestInfoDiv").style.height = "0vh";
      document.getElementById("id_report_SubReportDiv").style.height = "83vh";
      document.getElementById("id_report_OtherReportDiv").style.height = "0vh";
      document.getElementById("id_Report_pageSwitchStatus1").innerHTML = "&#x25C9;";
      document.getElementById("id_Report_pageSwitchUp").style.visibility = "visible";
      document.getElementById("id_Report_pageSwitchDown").style.visibility = "visible";
      document.getElementById("id_reportPageLabel").innerHTML = "Subtraction Report";
    break;
    case 2:
      document.getElementById("id_report_TestInfoDiv").style.height = "0vh";
      document.getElementById("id_report_SubReportDiv").style.height = "0vh";
      document.getElementById("id_report_OtherReportDiv").style.height = "83vh";
      document.getElementById("id_Report_pageSwitchStatus2").innerHTML = "&#x25C9;";
      document.getElementById("id_Report_pageSwitchUp").style.visibility = "visible";
      document.getElementById("id_reportPageLabel").innerHTML = "Other Report";
    break;
  }

}

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
    reportListTestInfo = [];
    reportListTestField = [];
    document.getElementById("id_Test_pageSwitchStatus2").style.visibility = "hidden";
    testingModus=0;
    slideTestDisplayDivs();
  }
  else{

    reportListTestInfo.splice(selectedIndex, 1);
    reportListTestField.splice(selectedIndex, 1);
    document.getElementById("id_TestPage_ReportList").innerHTML = "";
    for (var i = 0; i < reportListTestField.length; i++) {
      var option = document.createElement("option");
      option.innerHTML = "Testfield "+i+" ("+reportListTestInfo[i][1]+")";
      document.getElementById("id_TestPage_ReportList").add(option);
    }

    if(selectedIndex<reportListTestField.length){
      document.getElementById("id_TestPage_ReportList").selectedIndex=selectedIndex;
    }
    else {
      document.getElementById("id_TestPage_ReportList").selectedIndex=selectedIndex-1;
    }

    updateReportList();
  }

}


/////////////////////////////////////////////
////// Substraction Report

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


  if(parseInt(document.getElementById("id_Test_SubReport_Zoom").max)<zoomStatus){
    document.getElementById("id_Test_SubReport_Zoom").max=zoomStatus;
  }

  document.getElementById("id_Test_SubReport_Zoom").value = zoomStatus;

  changeReportZoom("id_TestPage_ReportOrginalCCanvas");
  changeReportZoom("id_TestPage_ReportOrginalGCanvas");
  changeReportZoom("id_TestPage_Report0Canvas");
  changeReportZoom("id_TestPage_Report1Canvas");
  changeReportZoom("id_TestPage_Report2Canvas");
}


function subreportZoom (){

  zoomStatus = parseInt(document.getElementById("id_Test_SubReport_Zoom").value);

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

function mouseMoveReport(e){
  // calc mouse pos
  var rect = document.getElementById(event.currentTarget.id).getBoundingClientRect();//

  var canvasPosX = Math.floor((event.clientX - rect.left)/rect.width*document.getElementById(event.currentTarget.id).width);
  var canvasPosY = reportListTestField[document.getElementById("id_TestPage_ReportList").selectedIndex][0].length-Math.floor((event.clientY - rect.top)/rect.height*document.getElementById(event.currentTarget.id).height)-1;

  mousePosX = canvasPosX;
  mousePosY = canvasPosY;

  if(!fixPixelPreview){
    document.getElementById("id_pixelPreviewModus").innerHTML = "Modus".bold()+": Explore (x:"+mousePosX+", y:"+mousePosY+")";
    drawPreviewPixels(mousePosX,mousePosY);
  }

}

function drawPreviewPixels(x,y){

  var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;

  document.getElementById("id_report_pixelPreview11").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y]).getRGBString();

  document.getElementById("id_report_pixelPreview00").style.visibility = "hidden";
  document.getElementById("id_report_pixelPreview01").style.visibility = "hidden";
  document.getElementById("id_report_pixelPreview02").style.visibility = "hidden";
  document.getElementById("id_report_pixelPreview10").style.visibility = "hidden";
  document.getElementById("id_report_pixelPreview12").style.visibility = "hidden";
  document.getElementById("id_report_pixelPreview20").style.visibility = "hidden";
  document.getElementById("id_report_pixelPreview21").style.visibility = "hidden";
  document.getElementById("id_report_pixelPreview22").style.visibility = "hidden";

  document.getElementById("id_report_linePreview00").style.visibility = "hidden";
  document.getElementById("id_report_linePreview01").style.visibility = "hidden";
  document.getElementById("id_report_linePreview02").style.visibility = "hidden";
  document.getElementById("id_report_linePreview10").style.visibility = "hidden";
  document.getElementById("id_report_linePreview12").style.visibility = "hidden";
  document.getElementById("id_report_linePreview20").style.visibility = "hidden";
  document.getElementById("id_report_linePreview21").style.visibility = "hidden";
  document.getElementById("id_report_linePreview22").style.visibility = "hidden";

  switch (x) {
    case 0:

        switch (y) {
          case 0:
            // left bottom corner
              document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview01").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview02").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview02").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview12").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y]).getRGBString();

              document.getElementById("id_report_linePreview01").style.visibility = "visible";
              document.getElementById("id_report_linePreview02").style.visibility = "visible";
              document.getElementById("id_report_linePreview12").style.visibility = "visible";
            break;
            case reportListTestField[selectedIndex][0].length-1:
                // left top corner
                document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview12").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y]).getRGBString();
                document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview21").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y-1]).getRGBString();
                document.getElementById("id_report_pixelPreview22").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview22").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y-1]).getRGBString();

                document.getElementById("id_report_linePreview12").style.visibility = "visible";
                document.getElementById("id_report_linePreview21").style.visibility = "visible";
                document.getElementById("id_report_linePreview22").style.visibility = "visible";
              break;
          default:
              // left side

              document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview01").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview02").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview02").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview12").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y]).getRGBString();
              document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview21").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y-1]).getRGBString();
              document.getElementById("id_report_pixelPreview22").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview22").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y-1]).getRGBString();

              document.getElementById("id_report_linePreview01").style.visibility = "visible";
              document.getElementById("id_report_linePreview02").style.visibility = "visible";
              document.getElementById("id_report_linePreview12").style.visibility = "visible";
              document.getElementById("id_report_linePreview21").style.visibility = "visible";
              document.getElementById("id_report_linePreview22").style.visibility = "visible";
        }

      break;
      case reportListTestField[selectedIndex].length-1:

          switch (y) {
            case 0:
              //  right bottom corner
              document.getElementById("id_report_pixelPreview00").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview00").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview01").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview10").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y]).getRGBString();

              document.getElementById("id_report_linePreview00").style.visibility = "visible";
              document.getElementById("id_report_linePreview01").style.visibility = "visible";
              document.getElementById("id_report_linePreview10").style.visibility = "visible";
              break;
              case reportListTestField[selectedIndex][0].length-1:
                //  right top corner

                document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview10").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y]).getRGBString();
                document.getElementById("id_report_pixelPreview20").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview20").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y-1]).getRGBString();
                document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview21").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y-1]).getRGBString();

                document.getElementById("id_report_linePreview10").style.visibility = "visible";
                document.getElementById("id_report_linePreview20").style.visibility = "visible";
                document.getElementById("id_report_linePreview21").style.visibility = "visible";
                break;
            default:
              // right sieht
              document.getElementById("id_report_pixelPreview00").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview00").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview01").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview10").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y]).getRGBString();
              document.getElementById("id_report_pixelPreview20").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview20").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y-1]).getRGBString();
              document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview21").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y-1]).getRGBString();

              document.getElementById("id_report_linePreview00").style.visibility = "visible";
              document.getElementById("id_report_linePreview01").style.visibility = "visible";
              document.getElementById("id_report_linePreview10").style.visibility = "visible";
              document.getElementById("id_report_linePreview20").style.visibility = "visible";
              document.getElementById("id_report_linePreview21").style.visibility = "visible";
          }
        break;
    default:

    switch (y) {
      case 0:
        //  bottom side
        document.getElementById("id_report_pixelPreview00").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview00").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y+1]).getRGBString();
        document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview01").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y+1]).getRGBString();
        document.getElementById("id_report_pixelPreview02").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview02").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y+1]).getRGBString();
        document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview10").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y]).getRGBString();
        document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview12").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y]).getRGBString();

        document.getElementById("id_report_linePreview00").style.visibility = "visible";
        document.getElementById("id_report_linePreview01").style.visibility = "visible";
        document.getElementById("id_report_linePreview02").style.visibility = "visible";
        document.getElementById("id_report_linePreview10").style.visibility = "visible";
        document.getElementById("id_report_linePreview12").style.visibility = "visible";
        break;
        case reportListTestField[selectedIndex][0].length-1:
        // top side

        document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview10").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y]).getRGBString();
        document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview12").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y]).getRGBString();
        document.getElementById("id_report_pixelPreview20").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview20").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y-1]).getRGBString();
        document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview21").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y-1]).getRGBString();
        document.getElementById("id_report_pixelPreview22").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview22").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y-1]).getRGBString();

        document.getElementById("id_report_linePreview10").style.visibility = "visible";
        document.getElementById("id_report_linePreview12").style.visibility = "visible";
        document.getElementById("id_report_linePreview20").style.visibility = "visible";
        document.getElementById("id_report_linePreview21").style.visibility = "visible";
        document.getElementById("id_report_linePreview22").style.visibility = "visible";
          break;
      default:

      document.getElementById("id_report_pixelPreview00").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview00").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y+1]).getRGBString();
      document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview01").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y+1]).getRGBString();
      document.getElementById("id_report_pixelPreview02").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview02").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y+1]).getRGBString();
      document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview10").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y]).getRGBString();
      document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview12").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y]).getRGBString();
      document.getElementById("id_report_pixelPreview20").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview20").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x-1][y-1]).getRGBString();
      document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview21").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y-1]).getRGBString();
      document.getElementById("id_report_pixelPreview22").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview22").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x+1][y-1]).getRGBString();

      document.getElementById("id_report_linePreview00").style.visibility = "visible";
      document.getElementById("id_report_linePreview01").style.visibility = "visible";
      document.getElementById("id_report_linePreview02").style.visibility = "visible";
      document.getElementById("id_report_linePreview10").style.visibility = "visible";
      document.getElementById("id_report_linePreview12").style.visibility = "visible";
      document.getElementById("id_report_linePreview20").style.visibility = "visible";
      document.getElementById("id_report_linePreview21").style.visibility = "visible";
      document.getElementById("id_report_linePreview22").style.visibility = "visible";

    }

  }//*/
}

function switchPixelPreviewModus(e){

  switch (event.which) {
    case 1:
      // Left Mouse Click
      fixPixelPreview = true;
      pixelPreviewX = mousePosX;
      pixelPreviewY = mousePosY;
      document.getElementById("id_pixelPreviewModus").innerHTML = "Modus".bold()+": Fixed Pixel (x:"+mousePosX+", y:"+mousePosY+")";
      drawPreviewPixels(mousePosX,mousePosY);
      break;
    case 3:
    // Right Mouse Click
    fixPixelPreview = false;
    pixelPreviewX = 0;
    pixelPreviewY = 0;

      break;
  }


}


function eventSubReport_mouseleave(){

}


function eventSubReport_mouseenter(){

}
