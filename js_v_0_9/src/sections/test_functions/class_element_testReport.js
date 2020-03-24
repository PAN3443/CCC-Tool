class class_Element_TestReport extends class_Testing_Element_Basis {

  constructor(divID,buttonID) {
    super(divID,buttonID);


    this.reportListTestInfo = [];
    this.reportListTestField = [];

    this.worker_testreport = new Worker(version_JS_FolderName+"/src/sections/test_functions/worker/worker_ReportTesting.js"); //, { type: "module" });
    this.worker_testreport.addEventListener('message', workerEvent_GetReport, false);
    this.worker_testreport.postMessage({'message':'init'});

    this.reportOptions_ColorDif="lab"; // lab, CIEDE2000, DE94, din99
    this.reportOptions_ColorSelector="max";

    this.reportColorValueDifColormap = new class_CMS();
    this.reportColorValueDifColormap.pushKey(new class_Key(undefined, new class_Color_DIN99(29.581458825788705,16.03125,-26.896446228027347), -1, false));
    this.reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(55.87141911613874,-7.531250000000001,-28.383946228027348), new class_Color_DIN99(55.87141911613874,-7.531250000000001,-28.383946228027348), -0.6446462116468379, false));
    this.reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(81.87664737898814,-20.531249999999996,-9.790196228027346), new class_Color_DIN99(81.87664737898814,-20.531249999999996,-9.790196228027346), -0.2977457733249843, false));
    this.reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(99.85395907566293,-0.9780546619960879,3.201916766455866), new class_Color_DIN99(99.85395907566293,-0.9780546619960879,3.201916766455866), 0, false));
    this.reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(86.74992752799066,-3.4687500000000013,25.166053771972656), new class_Color_DIN99(86.74992752799066,-3.4687500000000013,25.166053771972656), 0.2620538509705699, false));
    this.reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(61.129411174208734,20.093750000000004,25.90980377197265), new class_Color_DIN99(61.129411174208734,20.093750000000004,25.90980377197265), 0.6152160300563556, false));
    this.reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(28.529860414174685,30.656250000000004,10.291053771972658), undefined, 1, false));
    this.reportColorValueDifColormap.setAboveColor(new class_Color_RGB(1.0,0,0));
    this.reportColorValueDifColormap.setBelowColor(new class_Color_RGB(0,0,1.0));
    this.reportColorValueDifColormap.setInterpolationSpace("de2000-ds");
    this.reportColorValueDifColormap.calcNeededIntervalsColors(false,undefined,undefined);
    this.reportColorValueDifColormap.drawCMS_Horizontal("id_TestPage_DifReportColormap", 1000, 1);

    this.zoomStatus = 100;
    //this.maximalZoomBar = 500;
    this.markCursor = true;

    this.mousePosX = undefined;
    this.mousePosY = undefined;

    this.fixPixelPreview = false;

    this.valueDifInfo = undefined;
    this.colorDifInfo = undefined;
    this.valueRatioInfo = undefined;
    this.colorRatioInfo = undefined;
    this.ratioInfo = undefined;

    document.getElementById('id_TestPage_ReportOrginalC_Div').addEventListener("wheel", eventZoomReport);
    document.getElementById('id_TestPage_ReportOrginalC_Div').addEventListener("scroll", eventScrollReport);
    document.getElementById('id_TestPage_ReportOrginalG_Div').addEventListener("wheel", eventZoomReport);
    document.getElementById('id_TestPage_ReportOrginalG_Div').addEventListener("scroll", eventScrollReport);
    document.getElementById('id_TestPage_Report0_Div').addEventListener("wheel", eventZoomReport);
    document.getElementById('id_TestPage_Report0_Div').addEventListener("scroll", eventScrollReport);
    document.getElementById('id_TestPage_Report1_Div').addEventListener("wheel", eventZoomReport);
    document.getElementById('id_TestPage_Report1_Div').addEventListener("scroll", eventScrollReport);
    document.getElementById('id_TestPage_Report2_Div').addEventListener("wheel", eventZoomReport);
    document.getElementById('id_TestPage_Report2_Div').addEventListener("scroll", eventScrollReport);

    document.getElementById('id_TestPage_ReportOrginalC_Div').addEventListener("mousedown", switchPixelPreviewModus);
    document.getElementById('id_TestPage_ReportOrginalG_Div').addEventListener("mousedown", switchPixelPreviewModus);
    document.getElementById('id_TestPage_Report0_Div').addEventListener("mousedown", switchPixelPreviewModus);
    document.getElementById('id_TestPage_Report1_Div').addEventListener("mousedown", switchPixelPreviewModus);
    document.getElementById('id_TestPage_Report2_Div').addEventListener("mousedown", switchPixelPreviewModus);

    document.getElementById('id_TestPage_ReportOrginalC_Div').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_TestPage_ReportOrginalG_Div').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_TestPage_Report0_Div').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_TestPage_Report1_Div').addEventListener('contextmenu', event => event.preventDefault());
    document.getElementById('id_TestPage_Report2_Div').addEventListener('contextmenu', event => event.preventDefault());

    document.getElementById('id_TestPage_ReportOrginalC_Pixel').addEventListener("mousemove", mouseMoveReport);
    document.getElementById('id_TestPage_ReportOrginalG_Pixel').addEventListener("mousemove", mouseMoveReport);
    document.getElementById('id_TestPage_Report0_Pixel').addEventListener("mousemove", mouseMoveReport);
    document.getElementById('id_TestPage_Report1_Pixel').addEventListener("mousemove", mouseMoveReport);
    document.getElementById('id_TestPage_Report2_Pixel').addEventListener("mousemove", mouseMoveReport);

  }

  showElement(){
    if(this.reportListTestField.length==0){
      openAlert("The report list is empty. Please add a new report!");
    }
    else {
      super.showElement();

      for (var i = 0; i < document.getElementById("id_TestPage_SelectReportMetric").options.length; i++) {
        if(document.getElementById("id_TestPage_SelectReportMetric").options[i].value===this.reportOptions_ColorDif){
          document.getElementById("id_TestPage_SelectReportMetric").selectedIndex=i;
          break;
        }
      }

      for (var i = 0; i < document.getElementById("id_TestPage_SelectColorSelector").options.length; i++) {
        if(document.getElementById("id_TestPage_SelectColorSelector").options[i].value===this.reportOptions_ColorSelector){
          document.getElementById("id_TestPage_SelectColorSelector").selectedIndex=i;
          break;
        }
      }

      this.markCursor = document.getElementById("id_Test_RatioReport_DoMarkedCursor").checked;

      this.fillReportSelect();
      this.selectTestReport();
    }
  }



  report_screenshot() {
    var canvasID = "id_TestPage_Report2";
    var testing_ImgData = document.getElementById(canvasID).toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

    document.getElementById("id_Report_downloadScreenshot").href = testing_ImgData;
  }


  selectTestReport(){
    document.getElementById("id_TestPage_ReportOrginalG_Div").style.display="none";
    document.getElementById("id_TestPage_ReportOrginalG_Waiter").style.display="flex";
    document.getElementById("id_TestPage_ReportOrginalC_Div").style.display="none";
    document.getElementById("id_TestPage_ReportOrginalC_Waiter").style.display="flex";
    document.getElementById("id_TestPage_Report0_Div").style.display="none";
    document.getElementById("id_TestPage_Report0_Waiter").style.display="flex";
    document.getElementById("id_TestPage_Report1_Div").style.display="none";
    document.getElementById("id_TestPage_Report1_Waiter").style.display="flex";
    document.getElementById("id_TestPage_Report2_Div").style.display="none";
    document.getElementById("id_TestPage_Report2_Waiter").style.display="flex";
    this.deleteStatistics();
    var workerJSON = {};
    workerJSON['message'] = "calcReport_New_Testfield";
    workerJSON['reportOptions_ColorDif'] = this.reportOptions_ColorDif;
    workerJSON['reportOptions_ColorSelector'] = this.reportOptions_ColorSelector;
    workerJSON['testfield'] = this.reportListTestField[document.getElementById("id_TestPage_ReportList").selectedIndex];
    this.worker_testreport.postMessage(workerJSON);
    this.fillSubReportTable();
  }

  fillReportSelect(){
    var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;

    document.getElementById("id_TestPage_ReportList").innerHTML = "";
    for (var i = 0; i < this.reportListTestField.length; i++) {
      var option = document.createElement("option");
      option.innerHTML = "Testfield "+(i+1)+" ("+this.reportListTestInfo[i][1]+")";
      document.getElementById("id_TestPage_ReportList").add(option);
    }

    if(selectedIndex>-1 && selectedIndex!=undefined && !isNaN(selectedIndex) && selectedIndex<this.reportListTestField.length)
      document.getElementById("id_TestPage_ReportList").selectedIndex=selectedIndex;
    else
      document.getElementById("id_TestPage_ReportList").selectedIndex=this.reportListTestField.length-1;
  }

  updateElement(){
    document.getElementById("id_TestPage_ReportOrginalC_Div").style.display="none";
    document.getElementById("id_TestPage_ReportOrginalC_Waiter").style.display="flex";
    document.getElementById("id_TestPage_Report0_Div").style.display="none";
    document.getElementById("id_TestPage_Report0_Waiter").style.display="flex";
    document.getElementById("id_TestPage_Report1_Div").style.display="none";
    document.getElementById("id_TestPage_Report1_Waiter").style.display="flex";
    document.getElementById("id_TestPage_Report2_Div").style.display="none";
    document.getElementById("id_TestPage_Report2_Waiter").style.display="flex";
    this.deleteStatistics();
    var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;
    var workerJSON = {};
    workerJSON['message'] = "calcReport_New_CMS";
    this.worker_testreport.postMessage(workerJSON);
    this.fillSubReportTable();
  }

  remove_Report(){
    var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;
    if(this.reportListTestField.length==1){
      this.reportListTestInfo = [];
      this.reportListTestField = [];
      testingSection.element_singleTest.showElement();
    }
    else{
      this.reportListTestInfo.splice(selectedIndex, 1);
      this.reportListTestField.splice(selectedIndex, 1);
      this.fillReportSelect();
      this.selectTestReport();
    }

  }

  changeReportMetric(type){
    document.getElementById("id_TestPage_Report0_Div").style.display="none";
    document.getElementById("id_TestPage_Report0_Waiter").style.display="flex";
    document.getElementById("id_TestPage_Report1_Div").style.display="none";
    document.getElementById("id_TestPage_Report1_Waiter").style.display="flex";
    document.getElementById("id_TestPage_Report2_Div").style.display="none";
    document.getElementById("id_TestPage_Report2_Waiter").style.display="flex";
    this.deleteStatistics();
    this.reportOptions_ColorDif=document.getElementById("id_TestPage_SelectReportMetric").options[document.getElementById("id_TestPage_SelectReportMetric").selectedIndex].value;
    this.reportOptions_ColorSelector = document.getElementById("id_TestPage_SelectColorSelector").options[document.getElementById("id_TestPage_SelectColorSelector").selectedIndex].value;
    var workerJSON = {};
    workerJSON['message'] = "calcReport_New_Setting";
    workerJSON['reportOptions_ColorDif'] = this.reportOptions_ColorDif;
    workerJSON['reportOptions_ColorSelector'] = this.reportOptions_ColorSelector;
    this.worker_testreport.postMessage(workerJSON);
    this.fillSubReportTable();
  }

  ratioReportZoom (){

    this.zoomStatus = parseInt(document.getElementById("id_Test_RatioReport_Zoom").value);

    this.changeReportZoom("id_TestPage_ReportOrginalC");
    this.changeReportZoom("id_TestPage_ReportOrginalG");
    this.changeReportZoom("id_TestPage_Report0");
    this.changeReportZoom("id_TestPage_Report1");
    this.changeReportZoom("id_TestPage_Report2");

    this.changeReportZoom("id_TestPage_ReportOrginalC_Pixel");
    this.changeReportZoom("id_TestPage_ReportOrginalG_Pixel");
    this.changeReportZoom("id_TestPage_Report0_Pixel");
    this.changeReportZoom("id_TestPage_Report1_Pixel");
    this.changeReportZoom("id_TestPage_Report2_Pixel");
  }

  changeReportZoom(id){
    document.getElementById(id).style.height = this.zoomStatus+"%";
    document.getElementById(id).style.width = this.zoomStatus+"%";
  }

  changeMarkReportCursor(){
    this.markCursor = document.getElementById("id_Test_RatioReport_DoMarkedCursor").checked;
    this.drawPreviewPixels();
  }

  report_mouseMove(ratioPosX,ratioPosY){

    if(!this.fixPixelPreview){

      this.mousePosX = Math.floor(ratioPosX*this.reportListTestField[document.getElementById("id_TestPage_ReportList").selectedIndex].length);
      this.mousePosY = this.reportListTestField[document.getElementById("id_TestPage_ReportList").selectedIndex][0].length-Math.floor(ratioPosY*this.reportListTestField[document.getElementById("id_TestPage_ReportList").selectedIndex][0].length)-1;

      document.getElementById("id_pixelPreviewModus").innerHTML = "Modus".bold()+": Explore (x:"+this.mousePosX+", y:"+this.mousePosY+")";
      this.drawPreviewPixels();
      this.fillSubReportTable();
    }
  }

  drawPreviewPixels(){

    var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;

    if(this.reportListTestField[selectedIndex][this.mousePosX]==undefined)
    return;

    if(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY]==undefined)
    return;

      var context_OrginalC_Pixel =  document.getElementById("id_TestPage_ReportOrginalC_Pixel").getContext('2d');
      var context_OrginalG_Pixel =  document.getElementById("id_TestPage_ReportOrginalG_Pixel").getContext('2d');
      var context_Orginal0_Pixel =  document.getElementById("id_TestPage_Report0_Pixel").getContext('2d');
      var context_Orginal1_Pixel =  document.getElementById("id_TestPage_Report1_Pixel").getContext('2d');
      var context_Orginal2_Pixel =  document.getElementById("id_TestPage_Report2_Pixel").getContext('2d');

      context_OrginalC_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
      context_OrginalG_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
      context_Orginal0_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
      context_Orginal1_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
      context_Orginal2_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);

      if(document.getElementById("id_Test_RatioReport_DoMarkedCursor").checked){

        var context_OrginalCCanvas  =  document.getElementById("id_TestPage_ReportOrginalC").getContext('2d');
        var context_OrginalGCanvas  =  document.getElementById("id_TestPage_ReportOrginalG").getContext('2d');
        var context_Orginal0Canvas  =  document.getElementById("id_TestPage_Report0").getContext('2d');
        var context_Orginal1Canvas  =  document.getElementById("id_TestPage_Report1").getContext('2d');
        var context_Orginal2Canvas  =  document.getElementById("id_TestPage_Report2").getContext('2d');

        var markpixelColorG = determineMarkColor(context_OrginalGCanvas.getImageData(this.mousePosX, this.reportListTestField[selectedIndex][0].length-this.mousePosY, 1, 1).data);
        var markpixelColorC = determineMarkColor(context_OrginalCCanvas.getImageData(this.mousePosX, this.reportListTestField[selectedIndex][0].length-this.mousePosY, 1, 1).data);
        var markpixelColor0 = determineMarkColor(context_Orginal0Canvas.getImageData(this.mousePosX, this.reportListTestField[selectedIndex][0].length-this.mousePosY, 1, 1).data);
        var markpixelColor1 = determineMarkColor(context_Orginal1Canvas.getImageData(this.mousePosX, this.reportListTestField[selectedIndex][0].length-this.mousePosY, 1, 1).data);
        var markpixelColor2 = determineMarkColor(context_Orginal2Canvas.getImageData(this.mousePosX, this.reportListTestField[selectedIndex][0].length-this.mousePosY, 1, 1).data);

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
              if(this.mousePosX==tx && this.mousePosY==ty){
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
              var a = tx-this.mousePosX;
              var b = ty-this.mousePosY;
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

        context_OrginalC_Pixel.putImageData( imgDataC, 0, 0 );
        context_OrginalG_Pixel.putImageData( imgDataG, 0, 0 );
        context_Orginal0_Pixel.putImageData( imgData0, 0, 0 );
        context_Orginal1_Pixel.putImageData( imgData1, 0, 0 );
        context_Orginal2_Pixel.putImageData( imgData2, 0, 0 );
        //*/

        /*imgData = new ImageData(1,1);
        imgData[0]   = markpixelColor;
        imgData[1]   = markpixelColor;
        imgData[2]   = markpixelColor;
        imgData[3]   = 10; // 255 = solid
        context_OrginalC_Pixel.putImageData( imgData, x, y );
        context_OrginalG_Pixel.putImageData( imgData, x, y );
        context_Orginal0_Pixel.putImageData( imgData, x, y );
        context_Orginal1_Pixel.putImageData( imgData, x, y );
        context_Orginal2_Pixel.putImageData( imgData, x, y );*/
      }


    document.getElementById("id_report_pixelPreview11").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY]).getRGBString();;

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

    switch(this.mousePosX) {
      case 0:

          switch(this.mousePosY) {
            case 0:
              // left bottom corner
                document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview01").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY+1]).getRGBString();
                document.getElementById("id_report_pixelPreview02").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview02").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY+1]).getRGBString();
                document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview12").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY]).getRGBString();

                document.getElementById("id_report_linePreview01").style.visibility = "visible";
                document.getElementById("id_report_linePreview02").style.visibility = "visible";
                document.getElementById("id_report_linePreview12").style.visibility = "visible";

              break;
              case this.reportListTestField[selectedIndex][0].length-1:
                  // left top corner
                  document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
                  document.getElementById("id_report_pixelPreview12").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY]).getRGBString();
                  document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
                  document.getElementById("id_report_pixelPreview21").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY-1]).getRGBString();
                  document.getElementById("id_report_pixelPreview22").style.visibility = "visible";
                  document.getElementById("id_report_pixelPreview22").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY-1]).getRGBString();

                  document.getElementById("id_report_linePreview12").style.visibility = "visible";
                  document.getElementById("id_report_linePreview21").style.visibility = "visible";
                  document.getElementById("id_report_linePreview22").style.visibility = "visible";
                break;
            default:
                // left side

                document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview01").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY+1]).getRGBString();
                document.getElementById("id_report_pixelPreview02").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview02").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY+1]).getRGBString();
                document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview12").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY]).getRGBString();
                document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview21").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY-1]).getRGBString();
                document.getElementById("id_report_pixelPreview22").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview22").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY-1]).getRGBString();

                document.getElementById("id_report_linePreview01").style.visibility = "visible";
                document.getElementById("id_report_linePreview02").style.visibility = "visible";
                document.getElementById("id_report_linePreview12").style.visibility = "visible";
                document.getElementById("id_report_linePreview21").style.visibility = "visible";
                document.getElementById("id_report_linePreview22").style.visibility = "visible";
          }

        break;
        case this.reportListTestField[selectedIndex].length-1:

            switch(this.mousePosY) {
              case 0:
                //  right bottom corner
                document.getElementById("id_report_pixelPreview00").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview00").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY+1]).getRGBString();
                document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview01").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY+1]).getRGBString();
                document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview10").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY]).getRGBString();

                document.getElementById("id_report_linePreview00").style.visibility = "visible";
                document.getElementById("id_report_linePreview01").style.visibility = "visible";
                document.getElementById("id_report_linePreview10").style.visibility = "visible";
                break;
                case this.reportListTestField[selectedIndex][0].length-1:
                  //  right top corner

                  document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
                  document.getElementById("id_report_pixelPreview10").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY]).getRGBString();
                  document.getElementById("id_report_pixelPreview20").style.visibility = "visible";
                  document.getElementById("id_report_pixelPreview20").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY-1]).getRGBString();
                  document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
                  document.getElementById("id_report_pixelPreview21").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY-1]).getRGBString();

                  document.getElementById("id_report_linePreview10").style.visibility = "visible";
                  document.getElementById("id_report_linePreview20").style.visibility = "visible";
                  document.getElementById("id_report_linePreview21").style.visibility = "visible";
                  break;
              default:
                // right sieht
                document.getElementById("id_report_pixelPreview00").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview00").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY+1]).getRGBString();
                document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview01").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY+1]).getRGBString();
                document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview10").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY]).getRGBString();
                document.getElementById("id_report_pixelPreview20").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview20").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY-1]).getRGBString();
                document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
                document.getElementById("id_report_pixelPreview21").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY-1]).getRGBString();

                document.getElementById("id_report_linePreview00").style.visibility = "visible";
                document.getElementById("id_report_linePreview01").style.visibility = "visible";
                document.getElementById("id_report_linePreview10").style.visibility = "visible";
                document.getElementById("id_report_linePreview20").style.visibility = "visible";
                document.getElementById("id_report_linePreview21").style.visibility = "visible";
            }
          break;
      default:

      switch(this.mousePosY) {
        case 0:
          //  bottom side
          document.getElementById("id_report_pixelPreview00").style.visibility = "visible";
          document.getElementById("id_report_pixelPreview00").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY+1]).getRGBString();
          document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
          document.getElementById("id_report_pixelPreview01").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY+1]).getRGBString();
          document.getElementById("id_report_pixelPreview02").style.visibility = "visible";
          document.getElementById("id_report_pixelPreview02").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY+1]).getRGBString();
          document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
          document.getElementById("id_report_pixelPreview10").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY]).getRGBString();
          document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
          document.getElementById("id_report_pixelPreview12").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY]).getRGBString();

          document.getElementById("id_report_linePreview00").style.visibility = "visible";
          document.getElementById("id_report_linePreview01").style.visibility = "visible";
          document.getElementById("id_report_linePreview02").style.visibility = "visible";
          document.getElementById("id_report_linePreview10").style.visibility = "visible";
          document.getElementById("id_report_linePreview12").style.visibility = "visible";
          break;
          case this.reportListTestField[selectedIndex][0].length-1:
          // top side

          document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
          document.getElementById("id_report_pixelPreview10").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY]).getRGBString();
          document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
          document.getElementById("id_report_pixelPreview12").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY]).getRGBString();
          document.getElementById("id_report_pixelPreview20").style.visibility = "visible";
          document.getElementById("id_report_pixelPreview20").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY-1]).getRGBString();
          document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
          document.getElementById("id_report_pixelPreview21").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY-1]).getRGBString();
          document.getElementById("id_report_pixelPreview22").style.visibility = "visible";
          document.getElementById("id_report_pixelPreview22").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY-1]).getRGBString();

          document.getElementById("id_report_linePreview10").style.visibility = "visible";
          document.getElementById("id_report_linePreview12").style.visibility = "visible";
          document.getElementById("id_report_linePreview20").style.visibility = "visible";
          document.getElementById("id_report_linePreview21").style.visibility = "visible";
          document.getElementById("id_report_linePreview22").style.visibility = "visible";
            break;
        default:

        document.getElementById("id_report_pixelPreview00").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview00").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY+1]).getRGBString();
        document.getElementById("id_report_pixelPreview01").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview01").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY+1]).getRGBString();
        document.getElementById("id_report_pixelPreview02").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview02").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY+1]).getRGBString();
        document.getElementById("id_report_pixelPreview10").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview10").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY]).getRGBString();
        document.getElementById("id_report_pixelPreview12").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview12").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY]).getRGBString();
        document.getElementById("id_report_pixelPreview20").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview20").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX-1][this.mousePosY-1]).getRGBString();
        document.getElementById("id_report_pixelPreview21").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview21").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX][this.mousePosY-1]).getRGBString();
        document.getElementById("id_report_pixelPreview22").style.visibility = "visible";
        document.getElementById("id_report_pixelPreview22").style.background = testingSection.testingCMS.calculateColor(this.reportListTestField[selectedIndex][this.mousePosX+1][this.mousePosY-1]).getRGBString();

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

  deleteStatistics(){
    document.getElementById("id_ratioReportValueDifMax").innerHTML = "/";
    document.getElementById("id_ratioReportValueDifMin").innerHTML = "/";
    document.getElementById("id_ratioReportValueDifAvg").innerHTML = "/";
    document.getElementById("id_ratioReportValueDifVar").innerHTML = "/";
    document.getElementById("id_ratioReportValueDifDev").innerHTML = "/";
    document.getElementById("id_ratioReportValueDifMax").title = "/";
    document.getElementById("id_ratioReportValueDifMin").title = "/";
    document.getElementById("id_ratioReportValueDifAvg").title = "/";
    document.getElementById("id_ratioReportValueDifVar").title = "/";
    document.getElementById("id_ratioReportValueDifDev").title = "/";

    document.getElementById("id_ratioReportColorDifMax").innerHTML = "/";
    document.getElementById("id_ratioReportColorDifMin").innerHTML = "/";
    document.getElementById("id_ratioReportColorDifAvg").innerHTML = "/";
    document.getElementById("id_ratioReportColorDifVar").innerHTML = "/";
    document.getElementById("id_ratioReportColorDifDev").innerHTML = "/";
    document.getElementById("id_ratioReportColorDifMax").title = "/";
    document.getElementById("id_ratioReportColorDifMin").title = "/";
    document.getElementById("id_ratioReportColorDifAvg").title = "/";
    document.getElementById("id_ratioReportColorDifVar").title = "/";
    document.getElementById("id_ratioReportColorDifDev").title = "/";

    document.getElementById("id_ratioReportSubMax").innerHTML = "/";
    document.getElementById("id_ratioReportSubMin").innerHTML = "/";
    document.getElementById("id_ratioReportSubAvg").innerHTML = "/";
    document.getElementById("id_ratioReportSubVar").innerHTML = "/";
    document.getElementById("id_ratioReportSubDev").innerHTML = "/";
    document.getElementById("id_ratioReportSubMax").title = "/";
    document.getElementById("id_ratioReportSubMin").title = "/";
    document.getElementById("id_ratioReportSubAvg").title = "/";
    document.getElementById("id_ratioReportSubVar").title = "/";
    document.getElementById("id_ratioReportSubDev").title = "/";
  }

  fillSubReportTable(){

    var selectedIndex = document.getElementById("id_TestPage_ReportList").selectedIndex;

    var old_tbody = document.getElementById("id_ratioReportTableBody");
    var new_tbody = document.createElement('tbody');

    var tableInfo = [undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined];

    if(this.mousePosX != undefined && this.mousePosY != undefined){

      var indexMaxRatioValue = undefined;
      var indexMaxRatioColor = undefined;
      var indexMaxRatioSub = undefined;

      switch (this.mousePosX) {
        case 0:

            switch(this.mousePosY) {
              case 0:
                // left bottom corner
                  indexMaxRatioValue = getMaxIndex([undefined,this.valueRatioInfo[1][this.mousePosX][this.mousePosY],this.valueRatioInfo[2][this.mousePosX][this.mousePosY],undefined,this.valueDifInfo[0][this.mousePosX][this.mousePosY],undefined,undefined,undefined]);
                  indexMaxRatioColor = getMaxIndex([undefined,this.colorRatioInfo[1][this.mousePosX][this.mousePosY],this.colorRatioInfo[2][this.mousePosX][this.mousePosY],undefined,this.colorRatioInfo[0][this.mousePosX][this.mousePosY],undefined,undefined,undefined]);
                  indexMaxRatioSub = getMaxIndex([undefined,this.ratioInfo[1][this.mousePosX][this.mousePosY],this.ratioInfo[2][this.mousePosX][this.mousePosY],undefined,this.ratioInfo[0][this.mousePosX][this.mousePosY],undefined,undefined,undefined]);
                  tableInfo[1] = [this.valueDifInfo[1][this.mousePosX][this.mousePosY],this.valueRatioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[1][this.mousePosX][this.mousePosY]),this.colorDifInfo[1][this.mousePosX][this.mousePosY],this.colorRatioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[1][this.mousePosX][this.mousePosY]),this.ratioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[1][this.mousePosX][this.mousePosY]),false,false,false];
                  tableInfo[2] = [this.valueDifInfo[2][this.mousePosX][this.mousePosY],this.valueRatioInfo[2][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[2][this.mousePosX][this.mousePosY]),this.colorDifInfo[2][this.mousePosX][this.mousePosY],this.colorRatioInfo[2][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[2][this.mousePosX][this.mousePosY]),this.ratioInfo[2][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[2][this.mousePosX][this.mousePosY]),false,false,false];
                  tableInfo[4] = [this.valueDifInfo[0][this.mousePosX][this.mousePosY],this.valueRatioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[0][this.mousePosX][this.mousePosY]),this.colorDifInfo[0][this.mousePosX][this.mousePosY],this.colorRatioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[0][this.mousePosX][this.mousePosY]),this.ratioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[0][this.mousePosX][this.mousePosY]),false,false,false];

                break;
                case this.reportListTestField[selectedIndex][0].length-1:
                    // left top corner
                    indexMaxRatioValue = getMaxIndex([undefined,undefined,undefined,undefined,this.valueRatioInfo[0][this.mousePosX][this.mousePosY],undefined,this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[3][this.mousePosX][this.mousePosY-1]]);
                    indexMaxRatioColor = getMaxIndex([undefined,undefined,undefined,undefined,this.colorRatioInfo[0][this.mousePosX][this.mousePosY],undefined,this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[3][this.mousePosX][this.mousePosY-1]]);
                    indexMaxRatioSub = getMaxIndex([undefined,undefined,undefined,undefined,this.ratioInfo[0][this.mousePosX][this.mousePosY],undefined,this.ratioInfo[1][this.mousePosX][this.mousePosY-1],this.ratioInfo[3][this.mousePosX][this.mousePosY-1]]);
                    tableInfo[4] = [this.valueDifInfo[0][this.mousePosX][this.mousePosY],this.valueRatioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[0][this.mousePosX][this.mousePosY]),this.colorDifInfo[0][this.mousePosX][this.mousePosY],this.colorRatioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[0][this.mousePosX][this.mousePosY]),this.ratioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[0][this.mousePosX][this.mousePosY]),false,false,false];
                    tableInfo[6] = [this.valueDifInfo[1][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1]),this.colorDifInfo[1][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1]),this.ratioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[1][this.mousePosX][this.mousePosY-1]),false,false,false];
                    tableInfo[7] = [this.valueDifInfo[3][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[3][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[3][this.mousePosX][this.mousePosY-1]),this.colorDifInfo[3][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[3][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[3][this.mousePosX][this.mousePosY-1]),this.ratioInfo[3][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[3][this.mousePosX][this.mousePosY-1]),false,false,false];
                  break;
              default:
                  // left side
                  indexMaxRatioValue = getMaxIndex([undefined,this.valueRatioInfo[1][this.mousePosX][this.mousePosY],this.valueRatioInfo[2][this.mousePosX][this.mousePosY],undefined,this.valueDifInfo[0][this.mousePosX][this.mousePosY],undefined,this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[3][this.mousePosX][this.mousePosY-1]]);
                  indexMaxRatioColor = getMaxIndex([undefined,this.colorRatioInfo[1][this.mousePosX][this.mousePosY],this.colorRatioInfo[2][this.mousePosX][this.mousePosY],undefined,this.colorRatioInfo[0][this.mousePosX][this.mousePosY],undefined,this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[3][this.mousePosX][this.mousePosY-1]]);
                  indexMaxRatioSub = getMaxIndex([undefined,this.ratioInfo[1][this.mousePosX][this.mousePosY],this.ratioInfo[2][this.mousePosX][this.mousePosY],undefined,this.ratioInfo[0][this.mousePosX][this.mousePosY],undefined,this.ratioInfo[1][this.mousePosX][this.mousePosY-1],this.ratioInfo[3][this.mousePosX][this.mousePosY-1]]);
                  tableInfo[1] = [this.valueDifInfo[1][this.mousePosX][this.mousePosY],this.valueRatioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[1][this.mousePosX][this.mousePosY]),this.colorDifInfo[1][this.mousePosX][this.mousePosY],this.colorRatioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[1][this.mousePosX][this.mousePosY]),this.ratioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[1][this.mousePosX][this.mousePosY]),false,false,false];
                  tableInfo[2] = [this.valueDifInfo[2][this.mousePosX][this.mousePosY],this.valueRatioInfo[2][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[2][this.mousePosX][this.mousePosY]),this.colorDifInfo[2][this.mousePosX][this.mousePosY],this.colorRatioInfo[2][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[2][this.mousePosX][this.mousePosY]),this.ratioInfo[2][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[2][this.mousePosX][this.mousePosY]),false,false,false];
                  tableInfo[4] = [this.valueDifInfo[0][this.mousePosX][this.mousePosY],this.valueRatioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[0][this.mousePosX][this.mousePosY]),this.colorDifInfo[0][this.mousePosX][this.mousePosY],this.colorRatioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[0][this.mousePosX][this.mousePosY]),this.ratioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[0][this.mousePosX][this.mousePosY]),false,false,false];
                  tableInfo[6] = [this.valueDifInfo[1][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1]),this.colorDifInfo[1][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1]),this.ratioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[1][this.mousePosX][this.mousePosY-1]),false,false,false];
                  tableInfo[7] = [this.valueDifInfo[3][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[3][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[3][this.mousePosX][this.mousePosY-1]),this.colorDifInfo[3][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[3][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[3][this.mousePosX][this.mousePosY-1]),this.ratioInfo[3][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[3][this.mousePosX][this.mousePosY-1]),false,false,false];
            }

          break;
          case this.reportListTestField[selectedIndex].length-1:

              switch(this.mousePosY) {
                case 0:
                  //  right bottom corner
                  indexMaxRatioValue = getMaxIndex([this.valueRatioInfo[3][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[1][this.mousePosX][this.mousePosY],undefined,this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY],undefined,undefined,undefined,undefined]);
                  indexMaxRatioColor = getMaxIndex([this.colorRatioInfo[3][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[1][this.mousePosX][this.mousePosY],undefined,this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY],undefined,undefined,undefined,undefined]);
                  indexMaxRatioSub = getMaxIndex([this.ratioInfo[3][this.mousePosX-1][this.mousePosY],this.ratioInfo[1][this.mousePosX][this.mousePosY],undefined,this.ratioInfo[0][this.mousePosX-1][this.mousePosY],undefined,undefined,undefined,undefined]);
                  tableInfo[0] = [this.valueDifInfo[3][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[3][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[3][this.mousePosX-1][this.mousePosY]),this.colorDifInfo[3][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[3][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[3][this.mousePosX-1][this.mousePosY]),this.ratioInfo[3][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[3][this.mousePosX-1][this.mousePosY]),false,false,false];
                  tableInfo[1] = [this.valueDifInfo[1][this.mousePosX][this.mousePosY],this.valueRatioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[1][this.mousePosX][this.mousePosY]),this.colorDifInfo[1][this.mousePosX][this.mousePosY],this.colorRatioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[1][this.mousePosX][this.mousePosY]),this.ratioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[1][this.mousePosX][this.mousePosY]),false,false,false];
                  tableInfo[3] = [this.valueDifInfo[0][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY]),this.colorDifInfo[0][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY]),this.ratioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[0][this.mousePosX-1][this.mousePosY]),false,false,false];
                  break;
                  case this.reportListTestField[selectedIndex][0].length-1:
                    //  right top corner
                    indexMaxRatioValue = getMaxIndex([undefined,undefined,undefined,this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY],undefined,this.valueRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1],undefined]);
                    indexMaxRatioColor = getMaxIndex([undefined,undefined,undefined,this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY],undefined,this.colorRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1],undefined]);
                    indexMaxRatioSub = getMaxIndex([undefined,undefined,undefined,this.ratioInfo[0][this.mousePosX-1][this.mousePosY],undefined,this.ratioInfo[2][this.mousePosX-1][this.mousePosY-1],this.ratioInfo[1][this.mousePosX][this.mousePosY-1],undefined]);
                    tableInfo[3] = [this.valueDifInfo[0][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY]),this.colorDifInfo[0][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY]),this.ratioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[0][this.mousePosX-1][this.mousePosY]),false,false,false];
                    tableInfo[5] = [this.valueDifInfo[2][this.mousePosX-1][this.mousePosY-1],this.valueRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[2][this.mousePosX-1][this.mousePosY-1]),this.colorDifInfo[2][this.mousePosX-1][this.mousePosY-1],this.colorRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[2][this.mousePosX-1][this.mousePosY-1]),this.ratioInfo[2][this.mousePosX-1][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[2][this.mousePosX-1][this.mousePosY-1]),false,false,false];
                    tableInfo[6] = [this.valueDifInfo[1][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1]),this.colorDifInfo[1][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1]),this.ratioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[1][this.mousePosX][this.mousePosY-1]),false,false,false];
                    break;
                default:
                  // right sieht
                  indexMaxRatioValue = getMaxIndex([this.valueRatioInfo[3][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[1][this.mousePosX][this.mousePosY],undefined,this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY],undefined,this.valueRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1],undefined]);
                  indexMaxRatioColor = getMaxIndex([this.colorRatioInfo[3][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[1][this.mousePosX][this.mousePosY],undefined,this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY],undefined,this.colorRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1],undefined]);
                  indexMaxRatioSub = getMaxIndex([this.ratioInfo[3][this.mousePosX-1][this.mousePosY],this.ratioInfo[1][this.mousePosX][this.mousePosY],undefined,this.ratioInfo[0][this.mousePosX-1][this.mousePosY],undefined,this.ratioInfo[2][this.mousePosX-1][this.mousePosY-1],this.ratioInfo[1][this.mousePosX][this.mousePosY-1],undefined]);
                  tableInfo[0] = [this.valueDifInfo[3][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[3][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[3][this.mousePosX-1][this.mousePosY]),this.colorDifInfo[3][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[3][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[3][this.mousePosX-1][this.mousePosY]),this.ratioInfo[3][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[3][this.mousePosX-1][this.mousePosY]),false,false,false];
                  tableInfo[1] = [this.valueDifInfo[1][this.mousePosX][this.mousePosY],this.valueRatioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[1][this.mousePosX][this.mousePosY]),this.colorDifInfo[1][this.mousePosX][this.mousePosY],this.colorRatioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[1][this.mousePosX][this.mousePosY]),this.ratioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[1][this.mousePosX][this.mousePosY]),false,false,false];
                  tableInfo[3] = [this.valueDifInfo[0][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY]),this.colorDifInfo[0][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY]),this.ratioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[0][this.mousePosX-1][this.mousePosY]),false,false,false];
                  tableInfo[5] = [this.valueDifInfo[2][this.mousePosX-1][this.mousePosY-1],this.valueRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[2][this.mousePosX-1][this.mousePosY-1]),this.colorDifInfo[2][this.mousePosX-1][this.mousePosY-1],this.colorRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[2][this.mousePosX-1][this.mousePosY-1]),this.ratioInfo[2][this.mousePosX-1][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[2][this.mousePosX-1][this.mousePosY-1]),false,false,false];
                  tableInfo[6] = [this.valueDifInfo[1][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1]),this.colorDifInfo[1][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1]),this.ratioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[1][this.mousePosX][this.mousePosY-1]),false,false,false];
              }
            break;
        default:

        switch(this.mousePosY) {
          case 0:
            //  bottom side
            indexMaxRatioValue = getMaxIndex([this.valueRatioInfo[3][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[1][this.mousePosX][this.mousePosY],this.valueRatioInfo[2][this.mousePosX][this.mousePosY],this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[0][this.mousePosX][this.mousePosY],undefined,undefined,undefined]);
            indexMaxRatioColor = getMaxIndex([this.colorRatioInfo[3][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[1][this.mousePosX][this.mousePosY],this.colorRatioInfo[2][this.mousePosX][this.mousePosY],this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[0][this.mousePosX][this.mousePosY],undefined,undefined,undefined]);
            indexMaxRatioSub = getMaxIndex([this.ratioInfo[3][this.mousePosX-1][this.mousePosY],this.ratioInfo[1][this.mousePosX][this.mousePosY],this.ratioInfo[2][this.mousePosX][this.mousePosY],this.ratioInfo[0][this.mousePosX-1][this.mousePosY],this.ratioInfo[0][this.mousePosX][this.mousePosY],undefined,undefined,undefined]);
            tableInfo[0] = [this.valueDifInfo[3][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[3][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[3][this.mousePosX-1][this.mousePosY]),this.colorDifInfo[3][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[3][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[3][this.mousePosX-1][this.mousePosY]),this.ratioInfo[3][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[3][this.mousePosX-1][this.mousePosY]),false,false,false];
            tableInfo[1] = [this.valueDifInfo[1][this.mousePosX][this.mousePosY],this.valueRatioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[1][this.mousePosX][this.mousePosY]),this.colorDifInfo[1][this.mousePosX][this.mousePosY],this.colorRatioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[1][this.mousePosX][this.mousePosY]),this.ratioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[1][this.mousePosX][this.mousePosY]),false,false,false];
            tableInfo[2] = [this.valueDifInfo[2][this.mousePosX][this.mousePosY],this.valueRatioInfo[2][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[2][this.mousePosX][this.mousePosY]),this.colorDifInfo[2][this.mousePosX][this.mousePosY],this.colorRatioInfo[2][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[2][this.mousePosX][this.mousePosY]),this.ratioInfo[2][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[2][this.mousePosX][this.mousePosY]),false,false,false];
            tableInfo[3] = [this.valueDifInfo[0][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY]),this.colorDifInfo[0][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY]),this.ratioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[0][this.mousePosX-1][this.mousePosY]),false,false,false];
            tableInfo[4] = [this.valueDifInfo[0][this.mousePosX][this.mousePosY],this.valueRatioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[0][this.mousePosX][this.mousePosY]),this.colorDifInfo[0][this.mousePosX][this.mousePosY],this.colorRatioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[0][this.mousePosX][this.mousePosY]),this.ratioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[0][this.mousePosX][this.mousePosY]),false,false,false];
            break;
            case this.reportListTestField[selectedIndex][0].length-1:
            // top side
            indexMaxRatioValue = getMaxIndex([undefined,undefined,undefined,this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[0][this.mousePosX][this.mousePosY],this.valueRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[3][this.mousePosX][this.mousePosY-1]]);
            indexMaxRatioColor = getMaxIndex([undefined,undefined,undefined,this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[0][this.mousePosX][this.mousePosY],this.colorRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[3][this.mousePosX][this.mousePosY-1]]);
            indexMaxRatioSub = getMaxIndex([undefined,undefined,undefined,this.ratioInfo[0][this.mousePosX-1][this.mousePosY],this.ratioInfo[0][this.mousePosX][this.mousePosY],this.ratioInfo[2][this.mousePosX-1][this.mousePosY-1],this.ratioInfo[1][this.mousePosX][this.mousePosY-1],this.ratioInfo[3][this.mousePosX][this.mousePosY-1]]);
            tableInfo[3] = [this.valueDifInfo[0][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY]),this.colorDifInfo[0][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY]),this.ratioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[0][this.mousePosX-1][this.mousePosY]),false,false,false];
            tableInfo[4] = [this.valueDifInfo[0][this.mousePosX][this.mousePosY],this.valueRatioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[0][this.mousePosX][this.mousePosY]),this.colorDifInfo[0][this.mousePosX][this.mousePosY],this.colorRatioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[0][this.mousePosX][this.mousePosY]),this.ratioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[0][this.mousePosX][this.mousePosY]),false,false,false];
            tableInfo[5] = [this.valueDifInfo[2][this.mousePosX-1][this.mousePosY-1],this.valueRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[2][this.mousePosX-1][this.mousePosY-1]),this.colorDifInfo[2][this.mousePosX-1][this.mousePosY-1],this.colorRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[2][this.mousePosX-1][this.mousePosY-1]),this.ratioInfo[2][this.mousePosX-1][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[2][this.mousePosX-1][this.mousePosY-1]),false,false,false];
            tableInfo[6] = [this.valueDifInfo[1][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1]),this.colorDifInfo[1][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1]),this.ratioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[1][this.mousePosX][this.mousePosY-1]),false,false,false];
            tableInfo[7] = [this.valueDifInfo[3][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[3][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[3][this.mousePosX][this.mousePosY-1]),this.colorDifInfo[3][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[3][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[3][this.mousePosX][this.mousePosY-1]),this.ratioInfo[3][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[3][this.mousePosX][this.mousePosY-1]),false,false,false];
              break;
          default:
          indexMaxRatioValue = getMaxIndex([this.valueRatioInfo[3][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[1][this.mousePosX][this.mousePosY],this.valueRatioInfo[2][this.mousePosX][this.mousePosY],this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[0][this.mousePosX][this.mousePosY],this.valueRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[3][this.mousePosX][this.mousePosY-1]]);
          indexMaxRatioColor = getMaxIndex([this.colorRatioInfo[3][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[1][this.mousePosX][this.mousePosY],this.colorRatioInfo[2][this.mousePosX][this.mousePosY],this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[0][this.mousePosX][this.mousePosY],this.colorRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[3][this.mousePosX][this.mousePosY-1]]);
          indexMaxRatioSub = getMaxIndex([this.ratioInfo[3][this.mousePosX-1][this.mousePosY],this.ratioInfo[1][this.mousePosX][this.mousePosY],this.ratioInfo[2][this.mousePosX][this.mousePosY],this.ratioInfo[0][this.mousePosX-1][this.mousePosY],this.ratioInfo[0][this.mousePosX][this.mousePosY],this.ratioInfo[2][this.mousePosX-1][this.mousePosY-1],this.ratioInfo[1][this.mousePosX][this.mousePosY-1],this.ratioInfo[3][this.mousePosX][this.mousePosY-1]]);
          tableInfo[0] = [this.valueDifInfo[3][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[3][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[3][this.mousePosX-1][this.mousePosY]),this.colorDifInfo[3][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[3][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[3][this.mousePosX-1][this.mousePosY]),this.ratioInfo[3][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[3][this.mousePosX-1][this.mousePosY]),false,false,false];
          tableInfo[1] = [this.valueDifInfo[1][this.mousePosX][this.mousePosY],this.valueRatioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[1][this.mousePosX][this.mousePosY]),this.colorDifInfo[1][this.mousePosX][this.mousePosY],this.colorRatioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[1][this.mousePosX][this.mousePosY]),this.ratioInfo[1][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[1][this.mousePosX][this.mousePosY]),false,false,false];
          tableInfo[2] = [this.valueDifInfo[2][this.mousePosX][this.mousePosY],this.valueRatioInfo[2][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[2][this.mousePosX][this.mousePosY]),this.colorDifInfo[2][this.mousePosX][this.mousePosY],this.colorRatioInfo[2][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[2][this.mousePosX][this.mousePosY]),this.ratioInfo[2][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[2][this.mousePosX][this.mousePosY]),false,false,false];
          tableInfo[3] = [this.valueDifInfo[0][this.mousePosX-1][this.mousePosY],this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[0][this.mousePosX-1][this.mousePosY]),this.colorDifInfo[0][this.mousePosX-1][this.mousePosY],this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[0][this.mousePosX-1][this.mousePosY]),this.ratioInfo[0][this.mousePosX-1][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[0][this.mousePosX-1][this.mousePosY]),false,false,false];
          tableInfo[4] = [this.valueDifInfo[0][this.mousePosX][this.mousePosY],this.valueRatioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[0][this.mousePosX][this.mousePosY]),this.colorDifInfo[0][this.mousePosX][this.mousePosY],this.colorRatioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[0][this.mousePosX][this.mousePosY]),this.ratioInfo[0][this.mousePosX][this.mousePosY],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[0][this.mousePosX][this.mousePosY]),false,false,false];
          tableInfo[5] = [this.valueDifInfo[2][this.mousePosX-1][this.mousePosY-1],this.valueRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[2][this.mousePosX-1][this.mousePosY-1]),this.colorDifInfo[2][this.mousePosX-1][this.mousePosY-1],this.colorRatioInfo[2][this.mousePosX-1][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[2][this.mousePosX-1][this.mousePosY-1]),this.ratioInfo[2][this.mousePosX-1][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[2][this.mousePosX-1][this.mousePosY-1]),false,false,false];
          tableInfo[6] = [this.valueDifInfo[1][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[1][this.mousePosX][this.mousePosY-1]),this.colorDifInfo[1][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[1][this.mousePosX][this.mousePosY-1]),this.ratioInfo[1][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[1][this.mousePosX][this.mousePosY-1]),false,false,false];
          tableInfo[7] = [this.valueDifInfo[3][this.mousePosX][this.mousePosY-1],this.valueRatioInfo[3][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.valueRatioInfo[3][this.mousePosX][this.mousePosY-1]),this.colorDifInfo[3][this.mousePosX][this.mousePosY-1],this.colorRatioInfo[3][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.colorRatioInfo[3][this.mousePosX][this.mousePosY-1]),this.ratioInfo[3][this.mousePosX][this.mousePosY-1],this.reportColorValueDifColormap.calculateColor(this.ratioInfo[3][this.mousePosX][this.mousePosY-1]),false,false,false];
        }

      }//*/

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
      var td = document.createElement('td')
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
      if(tableInfo[i]!=undefined){
        td.appendChild(document.createTextNode(tableInfo[i][0].toFixed(5)));
        td.title = tableInfo[i][0];
      }
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
        td.appendChild(document.createTextNode(tableInfo[i][1].toFixed(5)));
        td.title = tableInfo[i][1];
        if(tableInfo[i][8]){
          td.style.borderWidth = "0.2vh";
          td.style.borderColor = "rgb(255,0,0)";
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
          td.style.borderColor = "rgb(255,0,0)";
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
      if(tableInfo[i]!=undefined){
        td.appendChild(document.createTextNode(tableInfo[i][3].toFixed(5)));
        td.title = tableInfo[i][3];
      }
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
          td.appendChild(document.createTextNode(tableInfo[i][4].toFixed(5)));
          td.title = tableInfo[i][4];
          if(tableInfo[i][9]){
            td.style.borderWidth = "0.2vh";
            td.style.borderColor = "rgb(255,0,0)";
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
          td.style.borderColor = "rgb(255,0,0)";
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
        td.appendChild(document.createTextNode(tableInfo[i][6].toFixed(5)));
        td.title = tableInfo[i][6];
        if(tableInfo[i][10]){
          td.style.borderWidth = "0.2vh";
          td.style.borderColor = "rgb(255,0,0)";
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
          td.style.borderColor = "rgb(255,0,0)";
        }

      }

      tr.appendChild(td);

      new_tbody.appendChild(tr);

    }

    old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
    new_tbody.id="id_ratioReportTableBody";//*/

  }

};

/////////////////////////////////////////////
////// Substraction Report
function eventZoomReport(e){

  var element = document.getElementById(e.target.id);

  if(event.deltaY>0){
    if(testingSection.element_testReport.zoomStatus==100)
    return;

    testingSection.element_testReport.zoomStatus-=10;
  }

  if(event.deltaY<0){
    testingSection.element_testReport.zoomStatus+=10;
  }

  if(parseInt(document.getElementById("id_Test_RatioReport_Zoom").max)<testingSection.element_testReport.zoomStatus){
    document.getElementById("id_Test_RatioReport_Zoom").max= testingSection.element_testReport.zoomStatus;
  }

  document.getElementById("id_Test_RatioReport_Zoom").value = testingSection.element_testReport.zoomStatus;

  testingSection.element_testReport.changeReportZoom("id_TestPage_ReportOrginalC");
  testingSection.element_testReport.changeReportZoom("id_TestPage_ReportOrginalG");
  testingSection.element_testReport.changeReportZoom("id_TestPage_Report0");
  testingSection.element_testReport.changeReportZoom("id_TestPage_Report1");
  testingSection.element_testReport.changeReportZoom("id_TestPage_Report2");

  testingSection.element_testReport.changeReportZoom("id_TestPage_ReportOrginalC_Pixel");
  testingSection.element_testReport.changeReportZoom("id_TestPage_ReportOrginalG_Pixel");
  testingSection.element_testReport.changeReportZoom("id_TestPage_Report0_Pixel");
  testingSection.element_testReport.changeReportZoom("id_TestPage_Report1_Pixel");
  testingSection.element_testReport.changeReportZoom("id_TestPage_Report2_Pixel");
}

function eventScrollReport(e){
  var element = document.getElementById(e.target.id);
  var scrollTop=element.scrollTop;
  var scrollLeft=element.scrollLeft;
  changeReportScroll("id_TestPage_ReportOrginalC_Div",scrollTop,scrollLeft);
  changeReportScroll("id_TestPage_ReportOrginalG_Div",scrollTop,scrollLeft);
  changeReportScroll("id_TestPage_Report0_Div",scrollTop,scrollLeft);
  changeReportScroll("id_TestPage_Report1_Div",scrollTop,scrollLeft);
  changeReportScroll("id_TestPage_Report2_Div",scrollTop,scrollLeft);
}

function changeReportScroll(id,scrollTop,scrollLeft){
  document.getElementById(id).scrollTop = scrollTop;
  document.getElementById(id).scrollLeft = scrollLeft;
}

function mouseMoveReport(e){

  // calc mouse pos
  var rect = document.getElementById(event.currentTarget.id).getBoundingClientRect();//

  var canvasPosX = (event.clientX - rect.left)/rect.width;
  var canvasPosY = (event.clientY - rect.top)/rect.height;

  testingSection.element_testReport.report_mouseMove(canvasPosX,canvasPosY)

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
      testingSection.element_testReport.fixPixelPreview = false;

      break;
    case 3:
    // Right Mouse Click
    testingSection.element_testReport.fixPixelPreview = true;

    document.getElementById("id_pixelPreviewModus").innerHTML = "Modus".bold()+": Fixed Pixel (x:"+testingSection.element_testReport.mousePosX+", y:"+testingSection.element_testReport.mousePosY+")";
    testingSection.element_testReport.drawPreviewPixels();
    testingSection.element_testReport.fillSubReportTable();
    var context_OrginalC_Pixel =  document.getElementById("id_TestPage_ReportOrginalC_Pixel").getContext('2d');
    var context_OrginalG_Pixel =  document.getElementById("id_TestPage_ReportOrginalG_Pixel").getContext('2d');
    var context_Orginal0_Pixel =  document.getElementById("id_TestPage_Report0_Pixel").getContext('2d');
    var context_Orginal1_Pixel =  document.getElementById("id_TestPage_Report1_Pixel").getContext('2d');
    var context_Orginal2_Pixel =  document.getElementById("id_TestPage_Report2_Pixel").getContext('2d');

    /*context_OrginalC_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
    context_OrginalG_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
    context_Orginal0_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
    context_Orginal1_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);
    context_Orginal2_Pixel.clearRect(0, 0, this.reportListTestField[selectedIndex].length, this.reportListTestField[selectedIndex][0].length);*/

    break;
  }


}
