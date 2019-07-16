function init_Testing(){

  document.getElementById("id_Test_downloadScreenshot").addEventListener('click', downloadTestImage, false);
  document.getElementById("id_Test_downloadScreenshotGrey").addEventListener('click', downloadTestImageGrey, false);
  document.getElementById("id_Test_downloadScreenshotFull").addEventListener('click', downloadTestImage, false);
  document.getElementById("id_Test_downloadScreenshotGreyFull").addEventListener('click', downloadTestImageGrey, false);
  do3DTestField=false;

  document.getElementById('id_Test_MeshVisDiv').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_Test_MeshVisDiv').addEventListener("mousemove", eventTestMapping_mousemove);
  document.getElementById('id_Test_MeshVisDiv').addEventListener("mouseleave", eventMapping_mouseleave);
  document.getElementById('id_Test_MeshVisDiv').addEventListener("mouseenter", eventMapping_mouseenter);
  document.getElementById('id_Test_MeshVisDiv').addEventListener("mousedown", eventMapping_mousedown);
  document.getElementById('id_Test_MeshVisDiv').addEventListener("mouseup", eventMapping_mouseup);
  document.getElementById("id_Test_MeshVisDiv").addEventListener("wheel", eventTestMapping_mousewheel);

  document.getElementById('id_Test_MeshVisDivGrey').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mousemove", eventTestMapping_mousemove);
  document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mouseleave", eventMapping_mouseleave);
  document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mouseenter", eventMapping_mouseenter);
  document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mousedown", eventMapping_mousedown);
  document.getElementById('id_Test_MeshVisDivGrey').addEventListener("mouseup", eventMapping_mouseup);
  document.getElementById("id_Test_MeshVisDivGrey").addEventListener("wheel", eventTestMapping_mousewheel);

  document.getElementById('id_Test_MeshVisDivFull').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_Test_MeshVisDivFull').addEventListener("mousemove", eventTestMapping_mousemove);
  document.getElementById('id_Test_MeshVisDivFull').addEventListener("mouseleave", eventMapping_mouseleave);
  document.getElementById('id_Test_MeshVisDivFull').addEventListener("mouseenter", eventMapping_mouseenter);
  document.getElementById('id_Test_MeshVisDivFull').addEventListener("mousedown", eventMapping_mousedown);
  document.getElementById('id_Test_MeshVisDivFull').addEventListener("mouseup", eventMapping_mouseup);
  document.getElementById("id_Test_MeshVisDivFull").addEventListener("wheel", eventTestMapping_mousewheel);

  document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mousemove", eventTestMapping_mousemove);
  document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mouseleave", eventMapping_mouseleave);
  document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mouseenter", eventMapping_mouseenter);
  document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mousedown", eventMapping_mousedown);
  document.getElementById('id_Test_MeshVisDivGreyFull').addEventListener("mouseup", eventMapping_mouseup);
  document.getElementById("id_Test_MeshVisDivGreyFull").addEventListener("wheel", eventTestMapping_mousewheel);


  ////// Init interactive Tests
  cccTest_NewJump_Options = [true,[0,1]];
  cccTest_NewRidgeValley_Options= [true,0,1,1,2,1,2,101,100];
  cccTest_NewLocalExtrema_Options = [1,-1,0,true,101,101];
  cccTest_NewGradient_Options= [true,0,1,1,2,1,2,101,100];
  cccTest_NewLittleBit_Options=[true,0.0,1.0,0.0001,0.001,10,10,100];
  cccTest_NewTreshold_Options=[true,0,2,0.0,0.5,1.0,101,101];
  cccTest_NewFrequency_Options = [true,true,1,1,0.0,1.0,100,100];

  fctTest_NewValleyShaped_Options=["Three-Hump Camel Function","Three_Hump_Camel",[-5,5,-5,5],100,100];
  fctTest_NewBowlShaped_Options=["Bohachevsky Function ","Bohachevsky_F1",[-100,100,-100,100],100,100];
  fctTest_NewLocalMin_Options =["Ackley Function","Ackley",[-32.768,32.768,-32.768,32.768],100,100,20,0.2,Math.PI*2];

  fillTestCollection();



  /////////////////// Report ///////////

  document.getElementById('id_TestPage_ReportOrginalCCanvas').addEventListener("wheel", eventZoomReport);
  document.getElementById('id_TestPage_ReportOrginalCDiv').addEventListener("scroll", eventScrollReport);
  document.getElementById('id_TestPage_ReportOrginalCDiv').onwheel = function(){ return false; }
  document.getElementById('id_TestPage_ReportOrginalGCanvas').addEventListener("wheel", eventZoomReport);
  document.getElementById('id_TestPage_ReportOrginalGDiv').addEventListener("scroll", eventScrollReport);
  document.getElementById('id_TestPage_ReportOrginalGDiv').onwheel = function(){ return false; }
  document.getElementById('id_TestPage_Report0Canvas').addEventListener("wheel", eventZoomReport);
  document.getElementById('id_TestPage_Report0Div').addEventListener("scroll", eventScrollReport);
  document.getElementById('id_TestPage_Report0Div').onwheel = function(){ return false; }
  document.getElementById('id_TestPage_Report1Canvas').addEventListener("wheel", eventZoomReport);
  document.getElementById('id_TestPage_Report1Div').addEventListener("scroll", eventScrollReport);
  document.getElementById('id_TestPage_Report1Div').onwheel = function(){ return false; }
  document.getElementById('id_TestPage_Report2Canvas').addEventListener("wheel", eventZoomReport);
  document.getElementById('id_TestPage_Report2Div').addEventListener("scroll", eventScrollReport);
  document.getElementById('id_TestPage_Report2Div').onwheel = function(){ return false; }

  document.getElementById('id_TestPage_ReportOrginalCCanvas').addEventListener("mousedown", switchPixelPreviewModus);
  document.getElementById('id_TestPage_ReportOrginalGCanvas').addEventListener("mousedown", switchPixelPreviewModus);
  document.getElementById('id_TestPage_Report0Canvas').addEventListener("mousedown", switchPixelPreviewModus);
  document.getElementById('id_TestPage_Report1Canvas').addEventListener("mousedown", switchPixelPreviewModus);
  document.getElementById('id_TestPage_Report2Canvas').addEventListener("mousedown", switchPixelPreviewModus);

  document.getElementById('id_TestPage_ReportOrginalCCanvas').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_TestPage_ReportOrginalGCanvas').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_TestPage_Report0Canvas').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_TestPage_Report1Canvas').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_TestPage_Report2Canvas').addEventListener('contextmenu', event => event.preventDefault());

  document.getElementById('id_TestPage_ReportOrginalCCanvas').addEventListener("mousemove", mouseMoveReport);
  document.getElementById('id_TestPage_ReportOrginalGCanvas').addEventListener("mousemove", mouseMoveReport);
  document.getElementById('id_TestPage_Report0Canvas').addEventListener("mousemove", mouseMoveReport);
  document.getElementById('id_TestPage_Report1Canvas').addEventListener("mousemove", mouseMoveReport);
  document.getElementById('id_TestPage_Report2Canvas').addEventListener("mousemove", mouseMoveReport);

  fixPixelPreview = false;
  pixelPreviewX = 0;
  pixelPreviewY = 0;



  document.getElementById('id_TestPage_ReportList').addEventListener("change", open_Report);

  ////////////// define CMS for Value Color Difference Report
  reportColorValueDifColormap.pushKey(new class_Key(undefined, new classColorDIN99(29.581458825788705,16.03125,-26.896446228027347), -1, false));
  reportColorValueDifColormap.pushKey(new class_Key(new classColorDIN99(55.87141911613874,-7.531250000000001,-28.383946228027348), new classColorDIN99(55.87141911613874,-7.531250000000001,-28.383946228027348), -0.6446462116468379, false));
  reportColorValueDifColormap.pushKey(new class_Key(new classColorDIN99(81.87664737898814,-20.531249999999996,-9.790196228027346), new classColorDIN99(81.87664737898814,-20.531249999999996,-9.790196228027346), -0.2977457733249843, false));
  reportColorValueDifColormap.pushKey(new class_Key(new classColorDIN99(99.85395907566293,-0.9780546619960879,3.201916766455866), new classColorDIN99(99.85395907566293,-0.9780546619960879,3.201916766455866), 0, false));
  reportColorValueDifColormap.pushKey(new class_Key(new classColorDIN99(86.74992752799066,-3.4687500000000013,25.166053771972656), new classColorDIN99(86.74992752799066,-3.4687500000000013,25.166053771972656), 0.2620538509705699, false));
  reportColorValueDifColormap.pushKey(new class_Key(new classColorDIN99(61.129411174208734,20.093750000000004,25.90980377197265), new classColorDIN99(61.129411174208734,20.093750000000004,25.90980377197265), 0.6152160300563556, false));
  reportColorValueDifColormap.pushKey(new class_Key(new classColorDIN99(28.529860414174685,30.656250000000004,10.291053771972658), undefined, 1, false));
  reportColorValueDifColormap.setAboveColor(new classColor_RGB(1.0,0,0));
  reportColorValueDifColormap.setBelowColor(new classColor_RGB(0,0,1.0));
  reportColorValueDifColormap.setInterpolationSpace("lab");
  hasDrawnReportCMS = false;

  document.getElementById("id_TestPage_DifReportBelowColor").style.background = 'rgb(0,0,255)';
  document.getElementById("id_TestPage_DifReportAboveColor").style.background = 'rgb(255,0,0)';



}
