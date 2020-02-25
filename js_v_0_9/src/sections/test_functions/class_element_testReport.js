class class_Element_TestReport extends class_Testing_Element_Basis {

  constructor(divID,buttonID) {
    super(divID,buttonID);


    this.reportListTestInfo = [];
    this.reportListTestField = [];

    this.worker_testreport = new Worker(version_JS_FolderName+"/src/sections/test_functions/worker/worker_ReportTesting.js"); //, { type: "module" });
    this.worker_testreport.addEventListener('message', workerEvent_GetReport, false);
    this.worker_testreport.postMessage({'message':'init'});


    var reportColorValueDifColormap = new class_CMS();
    reportColorValueDifColormap.pushKey(new class_Key(undefined, new class_Color_DIN99(29.581458825788705,16.03125,-26.896446228027347), -1, false));
    reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(55.87141911613874,-7.531250000000001,-28.383946228027348), new class_Color_DIN99(55.87141911613874,-7.531250000000001,-28.383946228027348), -0.6446462116468379, false));
    reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(81.87664737898814,-20.531249999999996,-9.790196228027346), new class_Color_DIN99(81.87664737898814,-20.531249999999996,-9.790196228027346), -0.2977457733249843, false));
    reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(99.85395907566293,-0.9780546619960879,3.201916766455866), new class_Color_DIN99(99.85395907566293,-0.9780546619960879,3.201916766455866), 0, false));
    reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(86.74992752799066,-3.4687500000000013,25.166053771972656), new class_Color_DIN99(86.74992752799066,-3.4687500000000013,25.166053771972656), 0.2620538509705699, false));
    reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(61.129411174208734,20.093750000000004,25.90980377197265), new class_Color_DIN99(61.129411174208734,20.093750000000004,25.90980377197265), 0.6152160300563556, false));
    reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(28.529860414174685,30.656250000000004,10.291053771972658), undefined, 1, false));
    reportColorValueDifColormap.setAboveColor(new class_Color_RGB(1.0,0,0));
    reportColorValueDifColormap.setBelowColor(new class_Color_RGB(0,0,1.0));
    reportColorValueDifColormap.setInterpolationSpace("de2000-ds");
    reportColorValueDifColormap.calcNeededIntervalsColors(false,undefined,undefined);
    reportColorValueDifColormap.drawCMS_Horizontal("id_TestPage_DifReportColormap", 1000, 1);
    document.getElementById("id_TestPage_DifReportBelowColor").style.background = "rgb(0,0,255)";
    document.getElementById("id_TestPage_DifReportAboveColor").style.background = "rgb(255,0,0)";

    /*var selectedRealWorldType = undefined;

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


    var reportModus = 0;
    var reportColorValueDifColormap = new class_CMS();
    var hasDrawnReportCMS = false;

    var markpixelColor = 255;
    var doPixelMarking = true;

    var reportOptions_ColorDif = 2; // 0=eu.Lab, 1=de94, 2=de2000, 3=din99


    var zoomStatus = 100;
    var maximalZoomBar = 500;

    var fixPixelPreview = false;
    var pixelPreviewX = 0;
    var pixelPreviewY = 0;


    var valueDifInfo = undefined;
    var colorDifInfo = undefined;
    var valueRatioInfo = undefined;
    var colorRatioInfo = undefined;
    var ratioInfo = undefined;*/


  }


  showElement(){
    if(this.reportListTestField.length==0){
      openAlert("The report list is empty. Please add a new report!");
    }
    else {
      super.showElement();
      this.fillReportSelect();
      this.updateElement();
    }

  }

  fillReportSelect(){
    var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;

    document.getElementById("id_TestPage_ReportList").innerHTML = "";
    for (var i = 0; i < this.reportListTestField.length; i++) {
      var option = document.createElement("option");
      option.innerHTML = "Testfield "+i+" ("+this.reportListTestInfo[i][1]+")";
      document.getElementById("id_TestPage_ReportList").add(option);
    }

    if(selectedIndex!=undefined && !isNaN(selectedIndex) && selectedIndex<this.reportListTestField.length)
      document.getElementById("id_TestPage_ReportList").selectedIndex=selectedIndex;
    else
      document.getElementById("id_TestPage_ReportList").selectedIndex=0;
  }

  updateElement(){
    var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;
    updateSubReport_MetricButton();
    this.inform_Worker_Testfield (testfunctionWorker_Report0,selectedIndex);
  }

  inform_Worker_Testfield (index){
    var workerJSON = {};
    workerJSON['message'] = "Testfield";
    workerJSON['reportOptions_ColorDif'] = reportOptions_ColorDif;
    workerJSON['testfield'] = this.reportListTestField[index];
    return workerJSON;//*/
  }

};




function calc_Report(){
  inform_Worker_CalcReport(testfunctionWorker_Report0);
}

function

function updateReportTensorFields(){
  inform_Worker_Tensorfield(testfunctionWorker_Report0);
}

function remove_Report(){

  var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;

  if(this.reportListTestField.length==1){
    this.reportListTestInfo = [];
    this.reportListTestField = [];
    document.getElementById("id_Test_pageSwitchStatus2").style.visibility = "hidden";
    testingModus=0;
    slideTestDisplayDivs();
  }
  else{

    this.reportListTestInfo.splice(selectedIndex, 1);
    this.reportListTestField.splice(selectedIndex, 1);
    document.getElementById("id_TestPage_ReportList").innerHTML = "";
    for (var i = 0; i < this.reportListTestField.length; i++) {
      var option = document.createElement("option");
      option.innerHTML = "Testfield "+i+" ("+this.reportListTestInfo[i][1]+")";
      document.getElementById("id_TestPage_ReportList").add(option);
    }

    if(selectedIndex<this.reportListTestField.length){
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

  var canvasPosX = Math.floor((event.clientX - rect.left)/rect.width*this.reportListTestField[document.getElementById("id_TestPage_ReportList").selectedIndex].length);
  var canvasPosY = this.reportListTestField[document.getElementById("id_TestPage_ReportList").selectedIndex][0].length-Math.floor((event.clientY - rect.top)/rect.height*this.reportListTestField[document.getElementById("id_TestPage_ReportList").selectedIndex][0].length)-1;

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


  if(this.reportListTestField[selectedIndex][x]==undefined)
  return;

  if(this.reportListTestField[selectedIndex][x][y]==undefined)
  return;

    var context_OrginalCCanvas_Pixel =  document.getElementById("id_TestPage_ReportOrginalCCanvas_Pixel").getContext('2d');
    var context_OrginalGCanvas_Pixel =  document.getElementById("id_TestPage_ReportOrginalGCanvas_Pixel").getContext('2d');
    var context_Orginal0Canvas_Pixel =  document.getElementById("id_TestPage_Report0Canvas_Pixel").getContext('2d');
    var context_Orginal1Canvas_Pixel =  document.getElementById("id_TestPage_Report1Canvas_Pixel").getContext('2d');
    var context_Orginal2Canvas_Pixel =  document.getElementById("id_TestPage_Report2Canvas_Pixel").getContext('2d');

    context_OrginalCCanvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
    context_OrginalGCanvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
    context_Orginal0Canvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
    context_Orginal1Canvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
    context_Orginal2Canvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);

    if(doPixelMarking){

      var context_OrginalCCanvas  =  document.getElementById("id_TestPage_ReportOrginalCCanvas").getContext('2d');
      var context_OrginalGCanvas  =  document.getElementById("id_TestPage_ReportOrginalGCanvas").getContext('2d');
      var context_Orginal0Canvas  =  document.getElementById("id_TestPage_Report0Canvas").getContext('2d');
      var context_Orginal1Canvas  =  document.getElementById("id_TestPage_Report1Canvas").getContext('2d');
      var context_Orginal2Canvas  =  document.getElementById("id_TestPage_Report2Canvas").getContext('2d');

      var markpixelColorG = determineMarkColor(context_OrginalGCanvas.getImageData(x, this.reportListTestField[selectedIndex][0].length-y, 1, 1).data);
      var markpixelColorC = determineMarkColor(context_OrginalCCanvas.getImageData(x, this.reportListTestField[selectedIndex][0].length-y, 1, 1).data);
      var markpixelColor0 = determineMarkColor(context_Orginal0Canvas.getImageData(x, this.reportListTestField[selectedIndex][0].length-y, 1, 1).data);
      var markpixelColor1 = determineMarkColor(context_Orginal1Canvas.getImageData(x, this.reportListTestField[selectedIndex][0].length-y, 1, 1).data);
      var markpixelColor2 = determineMarkColor(context_Orginal2Canvas.getImageData(x, this.reportListTestField[selectedIndex][0].length-y, 1, 1).data);

      var imgDataG = new ImageData(this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
      var imgDataC = new ImageData(this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
      var imgData0 = new ImageData(this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
      var imgData1 = new ImageData(this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
      var imgData2 = new ImageData(this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);

      var tmpDistance = Math.round((this.reportListTestField[selectedIndex].length+this.reportListTestField[selectedIndex][0].length)/2*0.01);
      if(tmpDistance==0)
      tmpDistance=1;

      for (var tx = 0; tx < imgDataG.width; tx++) {
        for (var ty = 0; ty < imgDataG.height; ty++) {
          var indices = getColorIndicesForCoord(tx, this.reportListTestField[selectedIndex][0].length-1 - ty, this.reportListTestField[selectedIndex].length);
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


  document.getElementById("id_report_pixelPreview11").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y]).getRGBString();;

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
              document.getElementById("id_report_pixelPreview01").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview02").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview02").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview12").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y]).getRGBString();

              document.getElementById("id_report_linePreview01").style.visibility = "visible";
              document.getElementById("id_report_linePreview02").style.visibility = "visible";
              document.getElementById("id_report_linePreview12").style.visibility = "visible";

            break;
            case this.reportListTestField[selectedIndex][0].length-1:
                // left top corner
                document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview12").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y]).getRGBString();
                document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview21").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y-1]).getRGBString();
                document.getElementById("id_report_pixelPreview22").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview22").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y-1]).getRGBString();

                document.getElementById("id_report_linePreview12").style.visibility = "visible";
                document.getElementById("id_report_linePreview21").style.visibility = "visible";
                document.getElementById("id_report_linePreview22").style.visibility = "visible";
              break;
          default:
              // left side

              document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview01").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview02").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview02").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview12").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y]).getRGBString();
              document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview21").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y-1]).getRGBString();
              document.getElementById("id_report_pixelPreview22").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview22").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y-1]).getRGBString();

              document.getElementById("id_report_linePreview01").style.visibility = "visible";
              document.getElementById("id_report_linePreview02").style.visibility = "visible";
              document.getElementById("id_report_linePreview12").style.visibility = "visible";
              document.getElementById("id_report_linePreview21").style.visibility = "visible";
              document.getElementById("id_report_linePreview22").style.visibility = "visible";
        }

      break;
      case this.reportListTestField[selectedIndex].length-1:

          switch (y) {
            case 0:
              //  right bottom corner
              document.getElementById("id_report_pixelPreview00").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview00").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview01").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview10").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y]).getRGBString();

              document.getElementById("id_report_linePreview00").style.visibility = "visible";
              document.getElementById("id_report_linePreview01").style.visibility = "visible";
              document.getElementById("id_report_linePreview10").style.visibility = "visible";
              break;
              case this.reportListTestField[selectedIndex][0].length-1:
                //  right top corner

                document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview10").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y]).getRGBString();
                document.getElementById("id_report_pixelPreview20").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview20").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y-1]).getRGBString();
                document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview21").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y-1]).getRGBString();

                document.getElementById("id_report_linePreview10").style.visibility = "visible";
                document.getElementById("id_report_linePreview20").style.visibility = "visible";
                document.getElementById("id_report_linePreview21").style.visibility = "visible";
                break;
            default:
              // right sieht
              document.getElementById("id_report_pixelPreview00").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview00").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview01").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y+1]).getRGBString();
              document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview10").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y]).getRGBString();
              document.getElementById("id_report_pixelPreview20").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview20").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y-1]).getRGBString();
              document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
              document.getElementById("id_report_pixelPreview21").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y-1]).getRGBString();

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
        document.getElementById("id_report_pixelPreview00").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y+1]).getRGBString();
        document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview01").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y+1]).getRGBString();
        document.getElementById("id_report_pixelPreview02").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview02").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y+1]).getRGBString();
        document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview10").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y]).getRGBString();
        document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview12").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y]).getRGBString();

        document.getElementById("id_report_linePreview00").style.visibility = "visible";
        document.getElementById("id_report_linePreview01").style.visibility = "visible";
        document.getElementById("id_report_linePreview02").style.visibility = "visible";
        document.getElementById("id_report_linePreview10").style.visibility = "visible";
        document.getElementById("id_report_linePreview12").style.visibility = "visible";
        break;
        case this.reportListTestField[selectedIndex][0].length-1:
        // top side

        document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview10").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y]).getRGBString();
        document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview12").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y]).getRGBString();
        document.getElementById("id_report_pixelPreview20").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview20").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y-1]).getRGBString();
        document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview21").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y-1]).getRGBString();
        document.getElementById("id_report_pixelPreview22").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview22").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y-1]).getRGBString();

        document.getElementById("id_report_linePreview10").style.visibility = "visible";
        document.getElementById("id_report_linePreview12").style.visibility = "visible";
        document.getElementById("id_report_linePreview20").style.visibility = "visible";
        document.getElementById("id_report_linePreview21").style.visibility = "visible";
        document.getElementById("id_report_linePreview22").style.visibility = "visible";
          break;
      default:

      document.getElementById("id_report_pixelPreview00").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview00").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y+1]).getRGBString();
      document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview01").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y+1]).getRGBString();
      document.getElementById("id_report_pixelPreview02").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview02").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y+1]).getRGBString();
      document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview10").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y]).getRGBString();
      document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview12").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y]).getRGBString();
      document.getElementById("id_report_pixelPreview20").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview20").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x-1][y-1]).getRGBString();
      document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview21").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x][y-1]).getRGBString();
      document.getElementById("id_report_pixelPreview22").style.visibility = "visible";
      document.getElementById("id_report_pixelPreview22").style.background = globalCMS1.calculateColor(this.reportListTestField[selectedIndex][x+1][y-1]).getRGBString();

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

    context_OrginalCCanvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
    context_OrginalGCanvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
    context_Orginal0Canvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
    context_Orginal1Canvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
    context_Orginal2Canvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);

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
  context_OrginalCCanvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
  context_OrginalGCanvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
  context_Orginal0Canvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
  context_Orginal1Canvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
  context_Orginal2Canvas_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);*/

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
              case this.reportListTestField[selectedIndex][0].length-1:
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
        case this.reportListTestField[selectedIndex].length-1:

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
                case this.reportListTestField[selectedIndex][0].length-1:
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
          case this.reportListTestField[selectedIndex][0].length-1:
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
