function init_Testing(){




  fillTestCollection();



  /////////////////// Report ///////////

  document.getElementById('id_TestPage_ReportOrginalCDiv').addEventListener("wheel", eventZoomReport);
  document.getElementById('id_TestPage_ReportOrginalCDiv').addEventListener("scroll", eventScrollReport);
  document.getElementById('id_TestPage_ReportOrginalGDiv').addEventListener("wheel", eventZoomReport);
  document.getElementById('id_TestPage_ReportOrginalGDiv').addEventListener("scroll", eventScrollReport);
  document.getElementById('id_TestPage_Report0Div').addEventListener("wheel", eventZoomReport);
  document.getElementById('id_TestPage_Report0Div').addEventListener("scroll", eventScrollReport);
  document.getElementById('id_TestPage_Report1Div').addEventListener("wheel", eventZoomReport);
  document.getElementById('id_TestPage_Report1Div').addEventListener("scroll", eventScrollReport);
  document.getElementById('id_TestPage_Report2Div').addEventListener("wheel", eventZoomReport);
  document.getElementById('id_TestPage_Report2Div').addEventListener("scroll", eventScrollReport);

  document.getElementById('id_TestPage_ReportOrginalCDiv').addEventListener("mousedown", switchPixelPreviewModus);
  document.getElementById('id_TestPage_ReportOrginalGDiv').addEventListener("mousedown", switchPixelPreviewModus);
  document.getElementById('id_TestPage_Report0Div').addEventListener("mousedown", switchPixelPreviewModus);
  document.getElementById('id_TestPage_Report1Div').addEventListener("mousedown", switchPixelPreviewModus);
  document.getElementById('id_TestPage_Report2Div').addEventListener("mousedown", switchPixelPreviewModus);

  document.getElementById('id_TestPage_ReportOrginalCDiv').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_TestPage_ReportOrginalGDiv').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_TestPage_Report0Div').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_TestPage_Report1Div').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_TestPage_Report2Div').addEventListener('contextmenu', event => event.preventDefault());

  document.getElementById('id_TestPage_ReportOrginalCCanvas_Pixel').addEventListener("mousemove", mouseMoveReport);
  document.getElementById('id_TestPage_ReportOrginalGCanvas_Pixel').addEventListener("mousemove", mouseMoveReport);
  document.getElementById('id_TestPage_Report0Canvas_Pixel').addEventListener("mousemove", mouseMoveReport);
  document.getElementById('id_TestPage_Report1Canvas_Pixel').addEventListener("mousemove", mouseMoveReport);
  document.getElementById('id_TestPage_Report2Canvas_Pixel').addEventListener("mousemove", mouseMoveReport);


  document.getElementById('id_TestPage_ReportOrginalCCanvas_Pixel').addEventListener("mouseleave", eventRatioReport_mouseleave);
  document.getElementById('id_TestPage_ReportOrginalGCanvas_Pixel').addEventListener("mouseleave", eventRatioReport_mouseleave);
  document.getElementById('id_TestPage_Report0Canvas_Pixel').addEventListener("mouseleave", eventRatioReport_mouseleave);
  document.getElementById('id_TestPage_Report1Canvas_Pixel').addEventListener("mouseleave", eventRatioReport_mouseleave);
  document.getElementById('id_TestPage_Report2Canvas_Pixel').addEventListener("mouseleave", eventRatioReport_mouseleave);

  fixPixelPreview = false;
  pixelPreviewX = 0;
  pixelPreviewY = 0;



  document.getElementById('id_TestPage_ReportList').addEventListener("change", open_Report);

  ////////////// define CMS for Value Color Difference Report
  reportColorValueDifColormap.pushKey(new class_Key(undefined, new class_Color_DIN99(29.581458825788705,16.03125,-26.896446228027347), -1, false));
  reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(55.87141911613874,-7.531250000000001,-28.383946228027348), new class_Color_DIN99(55.87141911613874,-7.531250000000001,-28.383946228027348), -0.6446462116468379, false));
  reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(81.87664737898814,-20.531249999999996,-9.790196228027346), new class_Color_DIN99(81.87664737898814,-20.531249999999996,-9.790196228027346), -0.2977457733249843, false));
  reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(99.85395907566293,-0.9780546619960879,3.201916766455866), new class_Color_DIN99(99.85395907566293,-0.9780546619960879,3.201916766455866), 0, false));
  reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(86.74992752799066,-3.4687500000000013,25.166053771972656), new class_Color_DIN99(86.74992752799066,-3.4687500000000013,25.166053771972656), 0.2620538509705699, false));
  reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(61.129411174208734,20.093750000000004,25.90980377197265), new class_Color_DIN99(61.129411174208734,20.093750000000004,25.90980377197265), 0.6152160300563556, false));
  reportColorValueDifColormap.pushKey(new class_Key(new class_Color_DIN99(28.529860414174685,30.656250000000004,10.291053771972658), undefined, 1, false));
  reportColorValueDifColormap.setAboveColor(new class_Color_RGB(1.0,0,0));
  reportColorValueDifColormap.setBelowColor(new class_Color_RGB(0,0,1.0));
  reportColorValueDifColormap.setInterpolationSpace("lab");
  hasDrawnReportCMS = false;

  document.getElementById("id_TestPage_DifReportBelowColor").style.background = 'rgb(0,0,255)';
  document.getElementById("id_TestPage_DifReportAboveColor").style.background = 'rgb(255,0,0)';



}


function displayTestMap(){
  if(testingModus==2){
    document.getElementById("id_Test_Map").style.width="97vw";
  }
  else{
    document.getElementById("id_Test_Map").style.width="100vw";
  }
  document.getElementById("id_Test_Map").style.display="flex";
}
