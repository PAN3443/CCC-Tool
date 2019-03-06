function init_Testing(){

  document.getElementById("id_Test_downloadScreenshot").addEventListener('click', downloadTestImage, false);
  document.getElementById("id_Test_downloadScreenshotGrey").addEventListener('click', downloadTestImageGrey, false);
  document.getElementById("id_Test_downloadScreenshotFull").addEventListener('click', downloadTestImage, false);
  document.getElementById("id_Test_downloadScreenshotGreyFull").addEventListener('click', downloadTestImageGrey, false);
  do3DTestField=false;

  document.getElementById('id_TestCanvas').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_TestCanvas').addEventListener("mousemove", eventTestMapping_mousemove);
  document.getElementById('id_TestCanvas').addEventListener("mouseleave", eventMapping_mouseleave);
  document.getElementById('id_TestCanvas').addEventListener("mouseenter", eventMapping_mouseenter);
  document.getElementById('id_TestCanvas').addEventListener("mousedown", eventMapping_mousedown);
  document.getElementById('id_TestCanvas').addEventListener("mouseup", eventMapping_mouseup);
  document.getElementById("id_TestCanvas").addEventListener("wheel", eventTestMapping_mousewheel);

  document.getElementById('id_TestCanvasGrey').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_TestCanvasGrey').addEventListener("mousemove", eventTestMapping_mousemove);
  document.getElementById('id_TestCanvasGrey').addEventListener("mouseleave", eventMapping_mouseleave);
  document.getElementById('id_TestCanvasGrey').addEventListener("mouseenter", eventMapping_mouseenter);
  document.getElementById('id_TestCanvasGrey').addEventListener("mousedown", eventMapping_mousedown);
  document.getElementById('id_TestCanvasGrey').addEventListener("mouseup", eventMapping_mouseup);
  document.getElementById("id_TestCanvasGrey").addEventListener("wheel", eventTestMapping_mousewheel);

  document.getElementById('id_TestCanvasFull').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_TestCanvasFull').addEventListener("mousemove", eventTestMapping_mousemove);
  document.getElementById('id_TestCanvasFull').addEventListener("mouseleave", eventMapping_mouseleave);
  document.getElementById('id_TestCanvasFull').addEventListener("mouseenter", eventMapping_mouseenter);
  document.getElementById('id_TestCanvasFull').addEventListener("mousedown", eventMapping_mousedown);
  document.getElementById('id_TestCanvasFull').addEventListener("mouseup", eventMapping_mouseup);
  document.getElementById("id_TestCanvasFull").addEventListener("wheel", eventTestMapping_mousewheel);

  document.getElementById('id_TestCanvasGreyFull').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_TestCanvasGreyFull').addEventListener("mousemove", eventTestMapping_mousemove);
  document.getElementById('id_TestCanvasGreyFull').addEventListener("mouseleave", eventMapping_mouseleave);
  document.getElementById('id_TestCanvasGreyFull').addEventListener("mouseenter", eventMapping_mouseenter);
  document.getElementById('id_TestCanvasGreyFull').addEventListener("mousedown", eventMapping_mousedown);
  document.getElementById('id_TestCanvasGreyFull').addEventListener("mouseup", eventMapping_mouseup);
  document.getElementById("id_TestCanvasGreyFull").addEventListener("wheel", eventTestMapping_mousewheel);

  document.getElementById('id_TestPage_NewJumpValue').addEventListener("keyup", newJumpTestStartPerEnter );


  cccTest_NewJump_Options = [true,[0,1]];
  cccTest_NewRidgeValley_Options= [true,0,1,1,2,1,2,101,100];
  cccTest_NewLocalExtrema_Options = [1,-1,0,true,101,101];
  cccTest_NewGradient_Options= [true,0,1,1,2,1,2,101,100];
  cccTest_NewLittleBit_Options=[true,0.001,0.1,10];
  cccTest_NewTreshold_Options=[true,0,2,0.0,0.5,1.0,101,101];
}
