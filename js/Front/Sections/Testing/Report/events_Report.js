



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

  changeReportZoom("id_TestPage_ReportOrginalCCanvas_Pixel");
  changeReportZoom("id_TestPage_ReportOrginalGCanvas_Pixel");
  changeReportZoom("id_TestPage_Report0Canvas_Pixel");
  changeReportZoom("id_TestPage_Report1Canvas_Pixel");
  changeReportZoom("id_TestPage_Report2Canvas_Pixel");
}


function subreportZoom (){

  zoomStatus = parseInt(document.getElementById("id_Test_SubReport_Zoom").value);

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
  }

}


function changeMarkReportCursor(){
  doPixelMarking = document.getElementById("id_Test_SubReport_DoMarkedCursor").checked;
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


function eventSubReport_mouseleave(){

  var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;

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

}


function eventSubReport_mouseenter(){

}
