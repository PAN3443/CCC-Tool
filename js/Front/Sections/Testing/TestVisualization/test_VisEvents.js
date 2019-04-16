function updateTestVis(){

  stopAnimationTestMapping();
  document.getElementById("id_Test_PixelCanvas").style.display = "none";
  document.getElementById("id_Test_PixelCanvasGrey").style.display = "none";
  document.getElementById("id_Test_MeshVisDiv").style.display = "none";
  document.getElementById("id_Test_MeshVisDivGrey").style.display = "none";

  document.getElementById("id_TestPage_HightmapButton").style.display = "none";
  document.getElementById("id_Test_showBoundingBox").style.display = "none";
  document.getElementById("id_Test_showHideAxis").style.display = "none";
  document.getElementById("id_Test_MeshVisOptions").style.display = "none";

  document.getElementById("id_TestFull_PixelVis").style.display = "none";
  document.getElementById("id_TestFull_MeshVis").style.display = "none";


  if(document.getElementById("id_TestVisualization_Mesh").checked){
    document.getElementById("id_Test_MeshVisDiv").style.display = "block";
    document.getElementById("id_Test_MeshVisDivGrey").style.display = "block";

    document.getElementById("id_Test_showBoundingBox").style.display = "block";
    document.getElementById("id_Test_showHideAxis").style.display = "block";
    document.getElementById("id_Test_MeshVisOptions").style.display = "flex";
    document.getElementById("id_TestPage_HightmapButton").style.display = "block";
    document.getElementById("id_TestFull_MeshVis").style.display = "flex";
    startAnimationTestMapping();
  }
  else{
    document.getElementById("id_Test_PixelCanvas").style.display = "block";
    document.getElementById("id_Test_PixelCanvasGrey").style.display = "block";
    document.getElementById("id_TestFull_PixelVis").style.display = "flex";
  }

  drawTestField(userTestGlobalField, true);
}


function drawTestField(field, doStatusbar){

    if(document.getElementById("id_TestVisualization_Mesh").checked)
      drawTest_Mesh(field, doStatusbar);
    else
      drawTest_Pixel(field, doStatusbar);

}




function downloadTestImage() {

  var testing_ImgData = undefined;
  if(document.getElementById("id_TestVisualization_Mesh").checked){
    stopAnimationTestMapping();
    var oldSize = testmapping_renderer.getSize();
    testmapping_renderer.setSize(2160, 2160);
    testmapping_renderer.preserveDrawingBuffer = true;
    testmapping_renderer.render( testmapping_scene,testmapping_camera );
    testing_ImgData = testmapping_renderer.domElement.toDataURL();
    testmapping_renderer.preserveDrawingBuffer = false;
    testmapping_renderer.setSize(oldSize.width, oldSize.height);
    startAnimationTestMapping();
  }
  else {

    var canvasID = "id_Test_PixelCanvas";

    if(document.getElementById("id_PopUp_fullTestingWindow").style.display!="none")
      var canvasID = "id_Test_PixelCanvasFull"

    testing_ImgData = document.getElementById(canvasID).toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

  }

  this.href = testing_ImgData;
}

function downloadTestImageGrey() {

  var testing_ImgData = undefined;
  if(document.getElementById("id_TestVisualization_Mesh").checked){
    stopAnimationTestMapping();
    var oldSize = testmapping_rendererGrey.getSize();
    testmapping_rendererGrey.setSize(2160, 2160);
    testmapping_rendererGrey.preserveDrawingBuffer = true;
    testmapping_rendererGrey.render( testmapping_sceneGrey,testmapping_cameraGrey );
    testing_ImgData = testmapping_rendererGrey.domElement.toDataURL();
    testmapping_rendererGrey.preserveDrawingBuffer = false;
    testmapping_rendererGrey.setSize(oldSize.width, oldSize.height);
    startAnimationTestMapping();
  }
  else {
    var canvasID = "id_Test_PixelCanvasGrey";

    if(document.getElementById("id_PopUp_fullTestingWindow").style.display!="none")
      var canvasID = "id_Test_PixelCanvasGreyFull"

    testing_ImgData = document.getElementById(canvasID).toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  }
  this.href = testing_ImgData;
}
