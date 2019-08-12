



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
  document.getElementById("id_Report_pageSwitchStatus3").innerHTML = "&#x25CE;";

  document.getElementById("id_Test_Map_Collection").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_InteractiveTest").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_MyTests").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_SubReport").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_AutoAnalysis").classList.remove("class_Test_Map_DivActive");
  document.getElementById("id_Test_Map_Optimization").classList.remove("class_Test_Map_DivActive");

  document.getElementById("id_Test_Map_Collection").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_InteractiveTest").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_MyTests").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_SubReport").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_AutoAnalysis").classList.add("class_Test_Map_Div");
  document.getElementById("id_Test_Map_Optimization").classList.add("class_Test_Map_Div");



  switch (reportModus) {
    case 0:
    document.getElementById("id_report_TestInfoDiv").style.height = "83vh";
    document.getElementById("id_report_SubReportDiv").style.height = "0vh";
    document.getElementById("id_report_OpitimizationReportDiv").style.height = "0vh";
    document.getElementById("id_report_AnalysisReportDiv").style.height = "0vh";
    document.getElementById("id_Report_pageSwitchDown").style.visibility = "visible";
    document.getElementById("id_Report_pageSwitchStatus0").innerHTML = "&#x25C9;";
    document.getElementById("id_reportPageLabel").innerHTML = "Report".bold()+" : MyTests";

    document.getElementById("id_Test_Map_MyTests").classList.remove("class_Test_Map_Div");
    document.getElementById("id_Test_Map_MyTests").classList.add("class_Test_Map_DivActive");
    break;
    case 1:
      document.getElementById("id_report_TestInfoDiv").style.height = "0vh";
      document.getElementById("id_report_SubReportDiv").style.height = "83vh";
      document.getElementById("id_report_OpitimizationReportDiv").style.height = "0vh";
      document.getElementById("id_report_AnalysisReportDiv").style.height = "0vh";
      document.getElementById("id_Report_pageSwitchStatus1").innerHTML = "&#x25C9;";
      document.getElementById("id_Report_pageSwitchUp").style.visibility = "visible";
      document.getElementById("id_Report_pageSwitchDown").style.visibility = "visible";
      document.getElementById("id_reportPageLabel").innerHTML = "Report".bold()+" : Subtraction Report";

      document.getElementById("id_Test_Map_SubReport").classList.remove("class_Test_Map_Div");
      document.getElementById("id_Test_Map_SubReport").classList.add("class_Test_Map_DivActive");
    break;
    case 2:
      document.getElementById("id_report_TestInfoDiv").style.height = "0vh";
      document.getElementById("id_report_SubReportDiv").style.height = "0vh";
      document.getElementById("id_report_AnalysisReportDiv").style.height = "83vh";
      document.getElementById("id_report_OpitimizationReportDiv").style.height = "0vh";
      document.getElementById("id_Report_pageSwitchStatus2").innerHTML = "&#x25C9;";
      document.getElementById("id_Report_pageSwitchUp").style.visibility = "visible";
      document.getElementById("id_Report_pageSwitchDown").style.visibility = "visible";
      document.getElementById("id_reportPageLabel").innerHTML = "Report".bold()+" : Auto Analysis";

      document.getElementById("id_Test_Map_AutoAnalysis").classList.remove("class_Test_Map_Div");
      document.getElementById("id_Test_Map_AutoAnalysis").classList.add("class_Test_Map_DivActive");
    break;
    case 3:
      document.getElementById("id_report_TestInfoDiv").style.height = "0vh";
      document.getElementById("id_report_SubReportDiv").style.height = "0vh";
      document.getElementById("id_report_AnalysisReportDiv").style.height = "0vh";
      document.getElementById("id_report_OpitimizationReportDiv").style.height = "83vh";
      document.getElementById("id_Report_pageSwitchStatus3").innerHTML = "&#x25C9;";
      document.getElementById("id_Report_pageSwitchUp").style.visibility = "visible";
      document.getElementById("id_reportPageLabel").innerHTML = "Report".bold()+" : Auto Optimization";

      document.getElementById("id_Test_Map_Optimization").classList.remove("class_Test_Map_Div");
      document.getElementById("id_Test_Map_Optimization").classList.add("class_Test_Map_DivActive");
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
  updateSubReport_MetricButton();
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


function changeSubReportMetric(type){
  reportOptions_ColorDif=type;
  updateSubReport_MetricButton();
  inform_Worker_Tensorfield(testfunctionWorker_Report0);
}

function updateSubReport_MetricButton(){
  document.getElementById("id_test_subreport_MetricLab").classList.remove("class_generalbuttonActive");
  document.getElementById("id_test_subreport_MetricDe94").classList.remove("class_generalbuttonActive");
  document.getElementById("id_test_subreport_MetricDe2000").classList.remove("class_generalbuttonActive");
  document.getElementById("id_test_subreport_MetricDIN99").classList.remove("class_generalbuttonActive");

  document.getElementById("id_test_subreport_MetricLab").classList.add("class_generalbutton");
  document.getElementById("id_test_subreport_MetricDe94").classList.add("class_generalbutton");
  document.getElementById("id_test_subreport_MetricDe2000").classList.add("class_generalbutton");
  document.getElementById("id_test_subreport_MetricDIN99").classList.add("class_generalbutton");

  switch (reportOptions_ColorDif) {
    case 0:
    document.getElementById("id_test_subreport_MetricLab").classList.remove("class_generalbutton");
    document.getElementById("id_test_subreport_MetricLab").classList.add("class_generalbuttonActive");
      break;
      case 1:
      document.getElementById("id_test_subreport_MetricDe94").classList.remove("class_generalbutton");
      document.getElementById("id_test_subreport_MetricDe94").classList.add("class_generalbuttonActive");
        break;
        case 2:
        document.getElementById("id_test_subreport_MetricDe2000").classList.remove("class_generalbutton");
        document.getElementById("id_test_subreport_MetricDe2000").classList.add("class_generalbuttonActive");
          break;
          case 3:
          document.getElementById("id_test_subreport_MetricDIN99").classList.remove("class_generalbutton");
          document.getElementById("id_test_subreport_MetricDIN99").classList.add("class_generalbuttonActive");
            break;
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


  if(parseInt(document.getElementById("id_Test_RatioReport_Zoom").max)<zoomStatus){
    document.getElementById("id_Test_RatioReport_Zoom").max=zoomStatus;
  }

  document.getElementById("id_Test_RatioReport_Zoom").value = zoomStatus;

  changeReportZoom("id_TestPage_ReportOrginalCCanvas");
  changeReportZoom("id_TestPage_ReportOrginalGCanvas");
  changeReportZoom("id_TestPage_Report0Canvas");
  changeReportZoom("id_TestPage_Report1Canvas");
  changeReportZoom("id_TestPage_Report2Canvas");

  changeReportZoom("id_TestPage_ReportOrginalCCanvas_Pixel");
  changeReportZoom("id_TestPage_ReportOrginalGCanvas_Pixel");
  changeReportZoom("id_TestPage_Report0Canvas_Pixel");
  changeReportZoom("id_TestPage_Report1Canvas_Pixel");
  changeReportZoom("id_TestPage_Report2Canvas_Pixel");
}

function ratioReportZoom (){

  zoomStatus = parseInt(document.getElementById("id_Test_RatioReport_Zoom").value);

  changeReportZoom("id_TestPage_ReportOrginalCCanvas");
  changeReportZoom("id_TestPage_ReportOrginalGCanvas");
  changeReportZoom("id_TestPage_Report0Canvas");
  changeReportZoom("id_TestPage_Report1Canvas");
  changeReportZoom("id_TestPage_Report2Canvas");

  changeReportZoom("id_TestPage_ReportOrginalCCanvas_Pixel");
  changeReportZoom("id_TestPage_ReportOrginalGCanvas_Pixel");
  changeReportZoom("id_TestPage_Report0Canvas_Pixel");
  changeReportZoom("id_TestPage_Report1Canvas_Pixel");
  changeReportZoom("id_TestPage_Report2Canvas_Pixel");
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

  var canvasPosX = Math.floor((event.clientX - rect.left)/rect.width*reportListTestField[document.getElementById("id_TestPage_ReportList").selectedIndex].length);
  var canvasPosY = reportListTestField[document.getElementById("id_TestPage_ReportList").selectedIndex][0].length-Math.floor((event.clientY - rect.top)/rect.height*reportListTestField[document.getElementById("id_TestPage_ReportList").selectedIndex][0].length)-1;

  mousePosX = canvasPosX;
  mousePosY = canvasPosY;

  if(!fixPixelPreview){
    document.getElementById("id_pixelPreviewModus").innerHTML = "Modus".bold()+": Explore (x:"+mousePosX+", y:"+mousePosY+")";
    drawPreviewPixels(mousePosX,mousePosY);
    fillSubReportTable(mousePosX,mousePosY);
  }

}


function getMaxIndex(array){

  var maxVal = -Infinity;
  var maxIndex = undefined;
  for (var i = 0; i < array.length; i++) {
    if(array[i]==undefined)
      continue;

    var testVal= array[i];
    if(testVal<0)
      testVal=testVal*-1;

    if(testVal>maxVal){
      maxVal=testVal;
      maxIndex=i;
    }
  }
  return maxIndex;
}

function changeMarkReportCursor(){
  doPixelMarking = document.getElementById("id_Test_RatioReport_DoMarkedCursor").checked;
}

function drawPreviewPixels(x,y){

  var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;


  if(reportListTestField[selectedIndex][x]==undefined)
  return;

  if(reportListTestField[selectedIndex][x][y]==undefined)
  return;

    var context_OrginalCCanvas_Pixel =  document.getElementById("id_TestPage_ReportOrginalCCanvas_Pixel").getContext('2d');
    var context_OrginalGCanvas_Pixel =  document.getElementById("id_TestPage_ReportOrginalGCanvas_Pixel").getContext('2d');
    var context_Orginal0Canvas_Pixel =  document.getElementById("id_TestPage_Report0Canvas_Pixel").getContext('2d');
    var context_Orginal1Canvas_Pixel =  document.getElementById("id_TestPage_Report1Canvas_Pixel").getContext('2d');
    var context_Orginal2Canvas_Pixel =  document.getElementById("id_TestPage_Report2Canvas_Pixel").getContext('2d');

    context_OrginalCCanvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
    context_OrginalGCanvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
    context_Orginal0Canvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
    context_Orginal1Canvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
    context_Orginal2Canvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);

    if(doPixelMarking){

      var context_OrginalCCanvas  =  document.getElementById("id_TestPage_ReportOrginalCCanvas").getContext('2d');
      var context_OrginalGCanvas  =  document.getElementById("id_TestPage_ReportOrginalGCanvas").getContext('2d');
      var context_Orginal0Canvas  =  document.getElementById("id_TestPage_Report0Canvas").getContext('2d');
      var context_Orginal1Canvas  =  document.getElementById("id_TestPage_Report1Canvas").getContext('2d');
      var context_Orginal2Canvas  =  document.getElementById("id_TestPage_Report2Canvas").getContext('2d');

      var markpixelColorG = determineMarkColor(context_OrginalGCanvas.getImageData(x, reportListTestField[selectedIndex][0].length-y, 1, 1).data);
      var markpixelColorC = determineMarkColor(context_OrginalCCanvas.getImageData(x, reportListTestField[selectedIndex][0].length-y, 1, 1).data);
      var markpixelColor0 = determineMarkColor(context_Orginal0Canvas.getImageData(x, reportListTestField[selectedIndex][0].length-y, 1, 1).data);
      var markpixelColor1 = determineMarkColor(context_Orginal1Canvas.getImageData(x, reportListTestField[selectedIndex][0].length-y, 1, 1).data);
      var markpixelColor2 = determineMarkColor(context_Orginal2Canvas.getImageData(x, reportListTestField[selectedIndex][0].length-y, 1, 1).data);

      var imgDataG = new ImageData(reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
      var imgDataC = new ImageData(reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
      var imgData0 = new ImageData(reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
      var imgData1 = new ImageData(reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
      var imgData2 = new ImageData(reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);

      var tmpDistance = Math.round((reportListTestField[selectedIndex].length+reportListTestField[selectedIndex][0].length)/2*0.01);
      if(tmpDistance==0)
      tmpDistance=1;

      for (var tx = 0; tx < imgDataG.width; tx++) {
        for (var ty = 0; ty < imgDataG.height; ty++) {
          var indices = getColorIndicesForCoord(tx, reportListTestField[selectedIndex][0].length-1 - ty, reportListTestField[selectedIndex].length);
          imgDataG.data[indices[0]] = Math.round(markpixelColorG);
          imgDataG.data[indices[1]] = Math.round(markpixelColorG);
          imgDataG.data[indices[2]] = Math.round(markpixelColorG);

          imgDataC.data[indices[0]] = Math.round(markpixelColorC);
          imgDataC.data[indices[1]] = Math.round(markpixelColorC);
          imgDataC.data[indices[2]] = Math.round(markpixelColorC);

          imgData0.data[indices[0]] = Math.round(markpixelColor0);
          imgData0.data[indices[1]] = Math.round(markpixelColor0);
          imgData0.data[indices[2]] = Math.round(markpixelColor0);

          imgData1.data[indices[0]] = Math.round(markpixelColor1);
          imgData1.data[indices[1]] = Math.round(markpixelColor1);
          imgData1.data[indices[2]] = Math.round(markpixelColor1);

          imgData2.data[indices[0]] = Math.round(markpixelColor2);
          imgData2.data[indices[1]] = Math.round(markpixelColor2);
          imgData2.data[indices[2]] = Math.round(markpixelColor2);

          if(tmpDistance==1){
            if(x==tx && y==ty){
              imgDataG.data[indices[3]] = 255;
              imgDataC.data[indices[3]] = 255;
              imgData0.data[indices[3]] = 255;
              imgData1.data[indices[3]] = 255;
              imgData2.data[indices[3]] = 255;
            }
            else{
              imgDataG.data[indices[3]] = 0;
              imgDataC.data[indices[3]] = 0;
              imgData0.data[indices[3]] = 0;
              imgData1.data[indices[3]] = 0;
              imgData2.data[indices[3]] = 0;
            }
          }
          else{
            var a = tx-x;
            var b = ty-y;
            var ratioDistance = Math.sqrt( a*a + b*b )/tmpDistance;

            if(ratioDistance<=1 && ratioDistance>0){
              var factor = Math.pow(ratioDistance,4);
              imgDataG.data[indices[3]] = factor*255;
              imgDataC.data[indices[3]] = factor*255;
              imgData0.data[indices[3]] = factor*255;
              imgData1.data[indices[3]] = factor*255;
              imgData2.data[indices[3]] = factor*255;
            }
            else{
              imgDataG.data[indices[3]] = 0;
              imgDataC.data[indices[3]] = 0;
              imgData0.data[indices[3]] = 0;
              imgData1.data[indices[3]] = 0;
              imgData2.data[indices[3]] = 0;
            }
          }

        }
      }

      context_OrginalCCanvas_Pixel.putImageData( imgDataC, 0, 0 );
      context_OrginalGCanvas_Pixel.putImageData( imgDataG, 0, 0 );
      context_Orginal0Canvas_Pixel.putImageData( imgData0, 0, 0 );
      context_Orginal1Canvas_Pixel.putImageData( imgData1, 0, 0 );
      context_Orginal2Canvas_Pixel.putImageData( imgData2, 0, 0 );
      //*/




      /*imgData = new ImageData(1,1);
      imgData[0]   = markpixelColor;
      imgData[1]   = markpixelColor;
      imgData[2]   = markpixelColor;
      imgData[3]   = 10; // 255 = solid
      context_OrginalCCanvas_Pixel.putImageData( imgData, x, y );
      context_OrginalGCanvas_Pixel.putImageData( imgData, x, y );
      context_Orginal0Canvas_Pixel.putImageData( imgData, x, y );
      context_Orginal1Canvas_Pixel.putImageData( imgData, x, y );
      context_Orginal2Canvas_Pixel.putImageData( imgData, x, y );*/
    }


  document.getElementById("id_report_pixelPreview11").style.background = globalCMS1.calculateColor(reportListTestField[selectedIndex][x][y]).getRGBString();;

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


function determineMarkColor(c){
  if((c[0]+c[1]+c[2])/3 > 125 )
    return 0;
  else
    return 255;
}

function switchPixelPreviewModus(e){

  switch (event.which) {
    case 1:
      // Left Mouse Click
      fixPixelPreview = false;
      pixelPreviewX = 0;
      pixelPreviewY = 0;
      break;
    case 3:
    // Right Mouse Click
    fixPixelPreview = true;
    pixelPreviewX = mousePosX;
    pixelPreviewY = mousePosY;
    document.getElementById("id_pixelPreviewModus").innerHTML = "Modus".bold()+": Fixed Pixel (x:"+mousePosX+", y:"+mousePosY+")";
    drawPreviewPixels(mousePosX,mousePosY);
    fillSubReportTable(mousePosX,mousePosY);
    var context_OrginalCCanvas_Pixel =  document.getElementById("id_TestPage_ReportOrginalCCanvas_Pixel").getContext('2d');
    var context_OrginalGCanvas_Pixel =  document.getElementById("id_TestPage_ReportOrginalGCanvas_Pixel").getContext('2d');
    var context_Orginal0Canvas_Pixel =  document.getElementById("id_TestPage_Report0Canvas_Pixel").getContext('2d');
    var context_Orginal1Canvas_Pixel =  document.getElementById("id_TestPage_Report1Canvas_Pixel").getContext('2d');
    var context_Orginal2Canvas_Pixel =  document.getElementById("id_TestPage_Report2Canvas_Pixel").getContext('2d');

    context_OrginalCCanvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
    context_OrginalGCanvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
    context_Orginal0Canvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
    context_Orginal1Canvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
    context_Orginal2Canvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);

    break;
  }


}


function eventRatioReport_mouseleave(){

  /*var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;

  var context_OrginalCCanvas_Pixel =  document.getElementById("id_TestPage_ReportOrginalCCanvas_Pixel").getContext('2d');
  var context_OrginalGCanvas_Pixel =  document.getElementById("id_TestPage_ReportOrginalGCanvas_Pixel").getContext('2d');
  var context_Orginal0Canvas_Pixel =  document.getElementById("id_TestPage_Report0Canvas_Pixel").getContext('2d');
  var context_Orginal1Canvas_Pixel =  document.getElementById("id_TestPage_Report1Canvas_Pixel").getContext('2d');
  var context_Orginal2Canvas_Pixel =  document.getElementById("id_TestPage_Report2Canvas_Pixel").getContext('2d');

  context_OrginalCCanvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
  context_OrginalGCanvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
  context_Orginal0Canvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
  context_Orginal1Canvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);
  context_Orginal2Canvas_Pixel.clearRect(0, 0, reportListTestField[selectedIndex].length, reportListTestField[selectedIndex][0].length);*/

}


function eventSubReport_mouseenter(){

}



function fillSubReportTable(x,y){

  var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;

  var old_tbody = document.getElementById("id_ratioReportTableBody");
  var new_tbody = document.createElement('tbody');

  var tableInfo = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];

  if(x != undefined && y != undefined){

    var indexMaxRatioValue = undefined;
    var indexMaxRatioColor = undefined;
    var indexMaxRatioSub = undefined;

    switch (x) {
      case 0:

          switch (y) {
            case 0:
              // left bottom corner

                indexMaxRatioValue = getMaxIndex([undefined,valueRatioInfo[1][x][y],valueRatioInfo[2][x][y],undefined,valueDifInfo[0][x][y],undefined,undefined,undefined]);
                indexMaxRatioColor = getMaxIndex([undefined,colorRatioInfo[1][x][y],colorRatioInfo[2][x][y],undefined,colorRatioInfo[0][x][y],undefined,undefined,undefined]);
                indexMaxRatioSub = getMaxIndex([undefined,ratioInfo[1][x][y],ratioInfo[2][x][y],undefined,ratioInfo[0][x][y],undefined,undefined,undefined]);
                tableInfo[1] = [valueDifInfo[1][x][y],valueRatioInfo[1][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[1][x][y]),colorDifInfo[1][x][y],colorRatioInfo[1][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[1][x][y]),ratioInfo[1][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[1][x][y]),false,false,false];
                tableInfo[2] = [valueDifInfo[2][x][y],valueRatioInfo[2][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[2][x][y]),colorDifInfo[2][x][y],colorRatioInfo[2][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[2][x][y]),ratioInfo[2][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[2][x][y]),false,false,false];
                tableInfo[4] = [valueDifInfo[0][x][y],valueRatioInfo[0][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[0][x][y]),colorDifInfo[0][x][y],colorRatioInfo[0][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[0][x][y]),ratioInfo[0][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[0][x][y]),false,false,false];

              break;
              case reportListTestField[selectedIndex][0].length-1:
                  // left top corner
                  indexMaxRatioValue = getMaxIndex([undefined,undefined,undefined,undefined,valueRatioInfo[0][x][y],undefined,valueRatioInfo[1][x][y-1],valueRatioInfo[3][x][y-1]]);
                  indexMaxRatioColor = getMaxIndex([undefined,undefined,undefined,undefined,colorRatioInfo[0][x][y],undefined,colorRatioInfo[1][x][y-1],colorRatioInfo[3][x][y-1]]);
                  indexMaxRatioSub = getMaxIndex([undefined,undefined,undefined,undefined,ratioInfo[0][x][y],undefined,ratioInfo[1][x][y-1],ratioInfo[3][x][y-1]]);
                  tableInfo[4] = [valueDifInfo[0][x][y],valueRatioInfo[0][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[0][x][y]),colorDifInfo[0][x][y],colorRatioInfo[0][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[0][x][y]),ratioInfo[0][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[0][x][y]),false,false,false];
                  tableInfo[6] = [valueDifInfo[1][x][y-1],valueRatioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[1][x][y-1]),colorDifInfo[1][x][y-1],colorRatioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[1][x][y-1]),ratioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[1][x][y-1]),false,false,false];
                  tableInfo[7] = [valueDifInfo[3][x][y-1],valueRatioInfo[3][x][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[3][x][y-1]),colorDifInfo[3][x][y-1],colorRatioInfo[3][x][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[3][x][y-1]),ratioInfo[3][x][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[3][x][y-1]),false,false,false];
                break;
            default:
                // left side
                indexMaxRatioValue = getMaxIndex([undefined,valueRatioInfo[1][x][y],valueRatioInfo[2][x][y],undefined,valueDifInfo[0][x][y],undefined,valueRatioInfo[1][x][y-1],valueRatioInfo[3][x][y-1]]);
                indexMaxRatioColor = getMaxIndex([undefined,colorRatioInfo[1][x][y],colorRatioInfo[2][x][y],undefined,colorRatioInfo[0][x][y],undefined,colorRatioInfo[1][x][y-1],colorRatioInfo[3][x][y-1]]);
                indexMaxRatioSub = getMaxIndex([undefined,ratioInfo[1][x][y],ratioInfo[2][x][y],undefined,ratioInfo[0][x][y],undefined,ratioInfo[1][x][y-1],ratioInfo[3][x][y-1]]);
                tableInfo[1] = [valueDifInfo[1][x][y],valueRatioInfo[1][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[1][x][y]),colorDifInfo[1][x][y],colorRatioInfo[1][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[1][x][y]),ratioInfo[1][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[1][x][y]),false,false,false];
                tableInfo[2] = [valueDifInfo[2][x][y],valueRatioInfo[2][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[2][x][y]),colorDifInfo[2][x][y],colorRatioInfo[2][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[2][x][y]),ratioInfo[2][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[2][x][y]),false,false,false];
                tableInfo[4] = [valueDifInfo[0][x][y],valueRatioInfo[0][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[0][x][y]),colorDifInfo[0][x][y],colorRatioInfo[0][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[0][x][y]),ratioInfo[0][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[0][x][y]),false,false,false];
                tableInfo[6] = [valueDifInfo[1][x][y-1],valueRatioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[1][x][y-1]),colorDifInfo[1][x][y-1],colorRatioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[1][x][y-1]),ratioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[1][x][y-1]),false,false,false];
                tableInfo[7] = [valueDifInfo[3][x][y-1],valueRatioInfo[3][x][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[3][x][y-1]),colorDifInfo[3][x][y-1],colorRatioInfo[3][x][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[3][x][y-1]),ratioInfo[3][x][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[3][x][y-1]),false,false,false];
          }

        break;
        case reportListTestField[selectedIndex].length-1:

            switch (y) {
              case 0:
                //  right bottom corner
                indexMaxRatioValue = getMaxIndex([valueRatioInfo[3][x-1][y],valueRatioInfo[1][x][y],undefined,valueRatioInfo[0][x-1][y],undefined,undefined,undefined,undefined]);
                indexMaxRatioColor = getMaxIndex([colorRatioInfo[3][x-1][y],colorRatioInfo[1][x][y],undefined,colorRatioInfo[0][x-1][y],undefined,undefined,undefined,undefined]);
                indexMaxRatioSub = getMaxIndex([ratioInfo[3][x-1][y],ratioInfo[1][x][y],undefined,ratioInfo[0][x-1][y],undefined,undefined,undefined,undefined]);
                tableInfo[0] = [valueDifInfo[3][x-1][y],valueRatioInfo[3][x-1][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[3][x-1][y]),colorDifInfo[3][x-1][y],colorRatioInfo[3][x-1][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[3][x-1][y]),ratioInfo[3][x-1][y],reportColorValueDifColormap.calculateColor(ratioInfo[3][x-1][y]),false,false,false];
                tableInfo[1] = [valueDifInfo[1][x][y],valueRatioInfo[1][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[1][x][y]),colorDifInfo[1][x][y],colorRatioInfo[1][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[1][x][y]),ratioInfo[1][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[1][x][y]),false,false,false];
                tableInfo[3] = [valueDifInfo[0][x-1][y],valueRatioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[0][x-1][y]),colorDifInfo[0][x-1][y],colorRatioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[0][x-1][y]),ratioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(ratioInfo[0][x-1][y]),false,false,false];
                break;
                case reportListTestField[selectedIndex][0].length-1:
                  //  right top corner
                  indexMaxRatioValue = getMaxIndex([undefined,undefined,undefined,valueRatioInfo[0][x-1][y],undefined,valueRatioInfo[2][x-1][y-1],valueRatioInfo[1][x][y-1],undefined]);
                  indexMaxRatioColor = getMaxIndex([undefined,undefined,undefined,colorRatioInfo[0][x-1][y],undefined,colorRatioInfo[2][x-1][y-1],colorRatioInfo[1][x][y-1],undefined]);
                  indexMaxRatioSub = getMaxIndex([undefined,undefined,undefined,ratioInfo[0][x-1][y],undefined,ratioInfo[2][x-1][y-1],ratioInfo[1][x][y-1],undefined]);
                  tableInfo[3] = [valueDifInfo[0][x-1][y],valueRatioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[0][x-1][y]),colorDifInfo[0][x-1][y],colorRatioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[0][x-1][y]),ratioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(ratioInfo[0][x-1][y]),false,false,false];
                  tableInfo[5] = [valueDifInfo[2][x-1][y-1],valueRatioInfo[2][x-1][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[2][x-1][y-1]),colorDifInfo[2][x-1][y-1],colorRatioInfo[2][x-1][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[2][x-1][y-1]),ratioInfo[2][x-1][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[2][x-1][y-1]),false,false,false];
                  tableInfo[6] = [valueDifInfo[1][x][y-1],valueRatioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[1][x][y-1]),colorDifInfo[1][x][y-1],colorRatioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[1][x][y-1]),ratioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[1][x][y-1]),false,false,false];
                  break;
              default:
                // right sieht
                indexMaxRatioValue = getMaxIndex([valueRatioInfo[3][x-1][y],valueRatioInfo[1][x][y],undefined,valueRatioInfo[0][x-1][y],undefined,valueRatioInfo[2][x-1][y-1],valueRatioInfo[1][x][y-1],undefined]);
                indexMaxRatioColor = getMaxIndex([colorRatioInfo[3][x-1][y],colorRatioInfo[1][x][y],undefined,colorRatioInfo[0][x-1][y],undefined,colorRatioInfo[2][x-1][y-1],colorRatioInfo[1][x][y-1],undefined]);
                indexMaxRatioSub = getMaxIndex([ratioInfo[3][x-1][y],ratioInfo[1][x][y],undefined,ratioInfo[0][x-1][y],undefined,ratioInfo[2][x-1][y-1],ratioInfo[1][x][y-1],undefined]);
                tableInfo[0] = [valueDifInfo[3][x-1][y],valueRatioInfo[3][x-1][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[3][x-1][y]),colorDifInfo[3][x-1][y],colorRatioInfo[3][x-1][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[3][x-1][y]),ratioInfo[3][x-1][y],reportColorValueDifColormap.calculateColor(ratioInfo[3][x-1][y]),false,false,false];
                tableInfo[1] = [valueDifInfo[1][x][y],valueRatioInfo[1][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[1][x][y]),colorDifInfo[1][x][y],colorRatioInfo[1][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[1][x][y]),ratioInfo[1][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[1][x][y]),false,false,false];
                tableInfo[3] = [valueDifInfo[0][x-1][y],valueRatioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[0][x-1][y]),colorDifInfo[0][x-1][y],colorRatioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[0][x-1][y]),ratioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(ratioInfo[0][x-1][y]),false,false,false];
                tableInfo[5] = [valueDifInfo[2][x-1][y-1],valueRatioInfo[2][x-1][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[2][x-1][y-1]),colorDifInfo[2][x-1][y-1],colorRatioInfo[2][x-1][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[2][x-1][y-1]),ratioInfo[2][x-1][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[2][x-1][y-1]),false,false,false];
                tableInfo[6] = [valueDifInfo[1][x][y-1],valueRatioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[1][x][y-1]),colorDifInfo[1][x][y-1],colorRatioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[1][x][y-1]),ratioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[1][x][y-1]),false,false,false];
            }
          break;
      default:

      switch (y) {
        case 0:
          //  bottom side
          indexMaxRatioValue = getMaxIndex([valueRatioInfo[3][x-1][y],valueRatioInfo[1][x][y],valueRatioInfo[2][x][y],valueRatioInfo[0][x-1][y],valueRatioInfo[0][x][y],undefined,undefined,undefined]);
          indexMaxRatioColor = getMaxIndex([colorRatioInfo[3][x-1][y],colorRatioInfo[1][x][y],colorRatioInfo[2][x][y],colorRatioInfo[0][x-1][y],colorRatioInfo[0][x][y],undefined,undefined,undefined]);
          indexMaxRatioSub = getMaxIndex([ratioInfo[3][x-1][y],ratioInfo[1][x][y],ratioInfo[2][x][y],ratioInfo[0][x-1][y],ratioInfo[0][x][y],undefined,undefined,undefined]);
          tableInfo[0] = [valueDifInfo[3][x-1][y],valueRatioInfo[3][x-1][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[3][x-1][y]),colorDifInfo[3][x-1][y],colorRatioInfo[3][x-1][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[3][x-1][y]),ratioInfo[3][x-1][y],reportColorValueDifColormap.calculateColor(ratioInfo[3][x-1][y]),false,false,false];
          tableInfo[1] = [valueDifInfo[1][x][y],valueRatioInfo[1][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[1][x][y]),colorDifInfo[1][x][y],colorRatioInfo[1][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[1][x][y]),ratioInfo[1][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[1][x][y]),false,false,false];
          tableInfo[2] = [valueDifInfo[2][x][y],valueRatioInfo[2][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[2][x][y]),colorDifInfo[2][x][y],colorRatioInfo[2][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[2][x][y]),ratioInfo[2][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[2][x][y]),false,false,false];
          tableInfo[3] = [valueDifInfo[0][x-1][y],valueRatioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[0][x-1][y]),colorDifInfo[0][x-1][y],colorRatioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[0][x-1][y]),ratioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(ratioInfo[0][x-1][y]),false,false,false];
          tableInfo[4] = [valueDifInfo[0][x][y],valueRatioInfo[0][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[0][x][y]),colorDifInfo[0][x][y],colorRatioInfo[0][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[0][x][y]),ratioInfo[0][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[0][x][y]),false,false,false];
          break;
          case reportListTestField[selectedIndex][0].length-1:
          // top side
          indexMaxRatioValue = getMaxIndex([undefined,undefined,undefined,valueRatioInfo[0][x-1][y],valueRatioInfo[0][x][y],valueRatioInfo[2][x-1][y-1],valueRatioInfo[1][x][y-1],valueRatioInfo[3][x][y-1]]);
          indexMaxRatioColor = getMaxIndex([undefined,undefined,undefined,colorRatioInfo[0][x-1][y],colorRatioInfo[0][x][y],colorRatioInfo[2][x-1][y-1],colorRatioInfo[1][x][y-1],colorRatioInfo[3][x][y-1]]);
          indexMaxRatioSub = getMaxIndex([undefined,undefined,undefined,ratioInfo[0][x-1][y],ratioInfo[0][x][y],ratioInfo[2][x-1][y-1],ratioInfo[1][x][y-1],ratioInfo[3][x][y-1]]);
          tableInfo[3] = [valueDifInfo[0][x-1][y],valueRatioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[0][x-1][y]),colorDifInfo[0][x-1][y],colorRatioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[0][x-1][y]),ratioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(ratioInfo[0][x-1][y]),false,false,false];
          tableInfo[4] = [valueDifInfo[0][x][y],valueRatioInfo[0][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[0][x][y]),colorDifInfo[0][x][y],colorRatioInfo[0][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[0][x][y]),ratioInfo[0][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[0][x][y]),false,false,false];
          tableInfo[5] = [valueDifInfo[2][x-1][y-1],valueRatioInfo[2][x-1][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[2][x-1][y-1]),colorDifInfo[2][x-1][y-1],colorRatioInfo[2][x-1][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[2][x-1][y-1]),ratioInfo[2][x-1][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[2][x-1][y-1]),false,false,false];
          tableInfo[6] = [valueDifInfo[1][x][y-1],valueRatioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[1][x][y-1]),colorDifInfo[1][x][y-1],colorRatioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[1][x][y-1]),ratioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[1][x][y-1]),false,false,false];
          tableInfo[7] = [valueDifInfo[3][x][y-1],valueRatioInfo[3][x][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[3][x][y-1]),colorDifInfo[3][x][y-1],colorRatioInfo[3][x][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[3][x][y-1]),ratioInfo[3][x][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[3][x][y-1]),false,false,false];
            break;
        default:
        indexMaxRatioValue = getMaxIndex([valueRatioInfo[3][x-1][y],valueRatioInfo[1][x][y],valueRatioInfo[2][x][y],valueRatioInfo[0][x-1][y],valueRatioInfo[0][x][y],valueRatioInfo[2][x-1][y-1],valueRatioInfo[1][x][y-1],valueRatioInfo[3][x][y-1]]);
        indexMaxRatioColor = getMaxIndex([colorRatioInfo[3][x-1][y],colorRatioInfo[1][x][y],colorRatioInfo[2][x][y],colorRatioInfo[0][x-1][y],colorRatioInfo[0][x][y],colorRatioInfo[2][x-1][y-1],colorRatioInfo[1][x][y-1],colorRatioInfo[3][x][y-1]]);
        indexMaxRatioSub = getMaxIndex([ratioInfo[3][x-1][y],ratioInfo[1][x][y],ratioInfo[2][x][y],ratioInfo[0][x-1][y],ratioInfo[0][x][y],ratioInfo[2][x-1][y-1],ratioInfo[1][x][y-1],ratioInfo[3][x][y-1]]);
        tableInfo[0] = [valueDifInfo[3][x-1][y],valueRatioInfo[3][x-1][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[3][x-1][y]),colorDifInfo[3][x-1][y],colorRatioInfo[3][x-1][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[3][x-1][y]),ratioInfo[3][x-1][y],reportColorValueDifColormap.calculateColor(ratioInfo[3][x-1][y]),false,false,false];
        tableInfo[1] = [valueDifInfo[1][x][y],valueRatioInfo[1][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[1][x][y]),colorDifInfo[1][x][y],colorRatioInfo[1][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[1][x][y]),ratioInfo[1][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[1][x][y]),false,false,false];
        tableInfo[2] = [valueDifInfo[2][x][y],valueRatioInfo[2][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[2][x][y]),colorDifInfo[2][x][y],colorRatioInfo[2][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[2][x][y]),ratioInfo[2][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[2][x][y]),false,false,false];
        tableInfo[3] = [valueDifInfo[0][x-1][y],valueRatioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[0][x-1][y]),colorDifInfo[0][x-1][y],colorRatioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[0][x-1][y]),ratioInfo[0][x-1][y],reportColorValueDifColormap.calculateColor(ratioInfo[0][x-1][y]),false,false,false];
        tableInfo[4] = [valueDifInfo[0][x][y],valueRatioInfo[0][x][y],reportColorValueDifColormap.calculateColor(valueRatioInfo[0][x][y]),colorDifInfo[0][x][y],colorRatioInfo[0][x][y],reportColorValueDifColormap.calculateColor(colorRatioInfo[0][x][y]),ratioInfo[0][x][y],reportColorValueDifColormap.calculateColor(ratioInfo[0][x][y]),false,false,false];
        tableInfo[5] = [valueDifInfo[2][x-1][y-1],valueRatioInfo[2][x-1][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[2][x-1][y-1]),colorDifInfo[2][x-1][y-1],colorRatioInfo[2][x-1][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[2][x-1][y-1]),ratioInfo[2][x-1][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[2][x-1][y-1]),false,false,false];
        tableInfo[6] = [valueDifInfo[1][x][y-1],valueRatioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[1][x][y-1]),colorDifInfo[1][x][y-1],colorRatioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[1][x][y-1]),ratioInfo[1][x][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[1][x][y-1]),false,false,false];
        tableInfo[7] = [valueDifInfo[3][x][y-1],valueRatioInfo[3][x][y-1],reportColorValueDifColormap.calculateColor(valueRatioInfo[3][x][y-1]),colorDifInfo[3][x][y-1],colorRatioInfo[3][x][y-1],reportColorValueDifColormap.calculateColor(colorRatioInfo[3][x][y-1]),ratioInfo[3][x][y-1],reportColorValueDifColormap.calculateColor(ratioInfo[3][x][y-1]),false,false,false];
      }

    }//*/

    console.log(indexMaxRatioValue,indexMaxRatioColor,indexMaxRatioSub);

    if(indexMaxRatioValue!=undefined)
      tableInfo[indexMaxRatioValue][8]=true;

      if(indexMaxRatioColor!=undefined)
        tableInfo[indexMaxRatioColor][9]=true;

        if(indexMaxRatioSub!=undefined)
          tableInfo[indexMaxRatioSub][10]=true;

  }


  for (var i = 0; i < tableInfo.length; i++) {

    var className = "class_tableInput";
    if(i%2==1){
      className = "class_tableInputDark";
    }

    /*if(tableInfo!=undefined){

    }*/

    var tr = document.createElement('tr');

    // ID
    td = document.createElement('td')
    td.className = className;
    td.style.width = "2vw";
    td.style.maxWidth = "2vw";
    td.appendChild(document.createTextNode(i+1));
    tr.appendChild(td);

    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    // Value
    td = document.createElement('td')
    td.className = className;
    td.style.width = "6vw";
    td.style.maxWidth = "6vw";
    if(tableInfo[i]!=undefined)
      td.appendChild(document.createTextNode(tableInfo[i][0]));
    else
      td.appendChild(document.createTextNode("/"));
    tr.appendChild(td);

    // Ratio Value
    td = document.createElement('td')
    td.className = className;
    td.style.width = "6vw";
    td.style.maxWidth = "6vw";
    td.style.borderRight = "none";
    if(tableInfo[i]!=undefined){
      td.appendChild(document.createTextNode(tableInfo[i][1]));

      if(tableInfo[i][8]){
        td.style.borderWidth = "0.2vh";
        td.style.borderColor = "rgb(0,0,0)";
      }
    }
    else
      td.appendChild(document.createTextNode("/"));



    tr.appendChild(td);

    // Colored Entry for Ratio Value
    td = document.createElement('td')
    td.className = className;
    td.style.width = "1vw";
    td.style.maxWidth = "1vw";
    td.style.borderLeft = "none";
    if(tableInfo[i]!=undefined){
      td.style.background = tableInfo[i][2].getRGBString();

      if(tableInfo[i][8]){
        td.style.borderWidth = "0.2vh";
        td.style.borderColor = "rgb(0,0,0)";
      }
    }
    tr.appendChild(td);

    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    // Color Dif
    td = document.createElement('td')
    td.className = className;
    td.style.width = "6vw";
    td.style.maxWidth = "6vw";
    if(tableInfo[i]!=undefined)
      td.appendChild(document.createTextNode(tableInfo[i][3]));
    else
      td.appendChild(document.createTextNode("/"));
    tr.appendChild(td);

    // Ratio Color Dif
    td = document.createElement('td')
    td.className = className;
    td.style.width = "6vw";
    td.style.maxWidth = "6vw";
    td.style.borderRight = "none";
    if(tableInfo[i]!=undefined){
        td.appendChild(document.createTextNode(tableInfo[i][4]));

        if(tableInfo[i][9]){
          td.style.borderWidth = "0.2vh";
          td.style.borderColor = "rgb(0,0,0)";
        }
    }
    else
      td.appendChild(document.createTextNode("/"));


    tr.appendChild(td);

    // Colored Entry for Ratio Color Dif
    td = document.createElement('td')
    td.className = className;
    td.style.width = "1vw";
    td.style.maxWidth = "1vw";
    td.style.borderLeft = "none";
    if(tableInfo[i]!=undefined){
      td.style.background = tableInfo[i][5].getRGBString();

      if(tableInfo[i][9]){
        td.style.borderWidth = "0.2vh";
        td.style.borderColor = "rgb(0,0,0)";
      }
    }
    tr.appendChild(td);

    //////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    // Subtraction Field
    td = document.createElement('td')
    td.className = className;
    td.style.width = "6vw";
    td.style.maxWidth = "6vw";
    td.style.borderRight = "none";
    if(tableInfo[i]!=undefined){
      td.appendChild(document.createTextNode(tableInfo[i][6]));

      if(tableInfo[i][10]){
        td.style.borderWidth = "0.2vh";
        td.style.borderColor = "rgb(0,0,0)";
      }
    }
    else
      td.appendChild(document.createTextNode("/"));


    tr.appendChild(td);

    // Colored Entry for Subtraction
    td = document.createElement('td')
    td.className = className;
    td.style.width = "1vw";
    td.style.maxWidth = "1vw";
    td.style.borderLeft = "none";
    if(tableInfo[i]!=undefined){
      td.style.background = tableInfo[i][7].getRGBString();

      if(tableInfo[i][10]){
        td.style.borderWidth = "0.2vh";
        td.style.borderColor = "rgb(0,0,0)";
      }

    }

    tr.appendChild(td);

    new_tbody.appendChild(tr);

  }

  old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
  new_tbody.id="id_ratioReportTableBody";

}
