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

  /// REPORT
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
}
