


function updateTestMappingCanvas(isBackground)
{

  var idCanvas="id_TestCanvas";
  var idCanvasGrey = "id_TestCanvasGrey";

  if(isBackground){
    idCanvas="id_TestCanvasFull";
    idCanvasGrey = "id_TestCanvasGreyFull";
  }

  document.getElementById(idCanvas).appendChild( testmapping_renderer.domElement);
  var box = document.getElementById(idCanvas).getBoundingClientRect();
  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;
	testmapping_camera.aspect = drawWidth/drawHeight;
	testmapping_camera.updateProjectionMatrix();
	testmapping_renderer.setSize(drawWidth, drawHeight);//*


  document.getElementById(idCanvasGrey).appendChild( testmapping_rendererGrey.domElement);
  var boxGrey = document.getElementById(idCanvasGrey).getBoundingClientRect();
  var drawWidthGrey = boxGrey.width; //window.innerWidth;
  var drawHeightGrey =boxGrey.height; // window.innerHeight;
	testmapping_cameraGrey.aspect = drawWidthGrey/drawHeightGrey;
	testmapping_cameraGrey.updateProjectionMatrix();
	testmapping_rendererGrey.setSize(drawWidthGrey, drawHeightGrey);

}

function switchHightmap(){

    if(do3DTestField){
      do3DTestField=false;

      testMappingGroup.rotation.y = Math.PI;
      testMappingGroup.rotation.x = 0;
      testMappingGroup.rotation.z = 0;

      testMappingGroupGrey.rotation.y = Math.PI;
      testMappingGroupGrey.rotation.x = 0;
      testMappingGroupGrey.rotation.z = 0;
      document.getElementById("id_TestPage_HightmapButton").innerHTML="3D";
      document.getElementById("id_TestPage_HightmapButtonFull").innerHTML="3D";
      document.getElementById("id_Test_ScaleFactor_Div").style.visibility="hidden";

    }
    else{
      do3DTestField=true;
      document.getElementById("id_TestPage_HightmapButton").innerHTML="2D";
      document.getElementById("id_TestPage_HightmapButtonFull").innerHTML="2D";

      document.getElementById("id_Test_ScaleFactor_Div").style.visibility="visible";
    }


        if(userTestGlobalField!=undefined)
    drawTestField(userTestGlobalField,true);

}

function showTestingAxis(){

    if(testing_DrawAxes){
      testing_DrawAxes=false;
    }
    else{
      testing_DrawAxes=true;
    }

        if(userTestGlobalField!=undefined)
    drawTestField(userTestGlobalField,true);

}

function showTestingBoundingBox(){

    if(testing_DrawBoundingBox){
      testing_DrawBoundingBox=false;
    }
    else{
      testing_DrawBoundingBox=true;
    }

    if(userTestGlobalField!=undefined)
    drawTestField(userTestGlobalField,true);

}





function renderTestMapping() {

            testmapping_renderer.clear();
            testmapping_rendererGrey.clear();

            var newXPos = testMappingGroup.position.x + mapping_Translation_X;
            var newYPos = testMappingGroup.position.y + mapping_Translation_Y;

            if(newXPos>=0 && newXPos<=mapping_transferBorderX){
              testMappingGroup.position.x = newXPos;
              testMappingGroupGrey.position.x = newXPos;
            }

            if(newYPos>=0 && newYPos<=mapping_transferBorderY){
              testMappingGroup.position.y = newYPos;
              testMappingGroupGrey.position.y = newYPos;
            }

            mapping_Translation_X=0;
            mapping_Translation_Y=0;

            testmapping_renderer.render( testmapping_scene,testmapping_camera );
            testmapping_rendererGrey.render(testmapping_sceneGrey,testmapping_cameraGrey);

}



function stopAnimationTestMapping(){
  if(testmapping_doingAnimation){
    cancelAnimationFrame( mapping_animationID );
    testmapping_doingAnimation = false;
  }
}

function animateTestMapping() {

    if(testmapping_doingAnimation){
      mapping_animationID = requestAnimationFrame( animateTestMapping );
      renderTestMapping();
    }

}

function startAnimationTestMapping(){
  testmapping_doingAnimation = true;
  animateTestMapping();
}

function downloadTestImage() {
  stopAnimationTestMapping();
  var oldSize = testmapping_renderer.getSize();
  testmapping_renderer.setSize(2160, 2160);
  testmapping_renderer.preserveDrawingBuffer = true;
  testmapping_renderer.render( testmapping_scene,testmapping_camera );
  var testing_ImgData = testmapping_renderer.domElement.toDataURL();
  testmapping_renderer.preserveDrawingBuffer = false;
  testmapping_renderer.setSize(oldSize.width, oldSize.height);
  startAnimationTestMapping();
  this.href = testing_ImgData;
}

function downloadTestImageGrey() {
  stopAnimationTestMapping();
  var oldSize = testmapping_rendererGrey.getSize();
  testmapping_rendererGrey.setSize(2160, 2160);
  testmapping_rendererGrey.preserveDrawingBuffer = true;
  testmapping_rendererGrey.render( testmapping_sceneGrey,testmapping_cameraGrey );
  var testing_ImgData = testmapping_rendererGrey.domElement.toDataURL();
  testmapping_rendererGrey.preserveDrawingBuffer = false;
  testmapping_rendererGrey.setSize(oldSize.width, oldSize.height);
  startAnimationTestMapping();
  this.href = testing_ImgData;
}

function initTestMapping()
{

  mapping_Translation_X=0;
  mapping_Translation_Y=0;

  var bg_texture = THREE.ImageUtils.loadTexture( 'img/EditPage/plotBackground.png' );

  var canvasObj = document.getElementById("id_TestCanvas");
  canvasObj.innerHTML = "";
  var box = canvasObj.getBoundingClientRect();
  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;

  testmapping_scene = new THREE.Scene();
  testmapping_scene.background = texture;
	testmapping_camera = new THREE.PerspectiveCamera(50,drawWidth /drawHeight, 1, 10000);
  testmapping_renderer = new THREE.WebGLRenderer({ alpha: true,antialias: true,
    logarithmicDepthBuffer: true});
  testmapping_renderer.setClearColor( 0xffffff, 0);
  testMappingGroup = new THREE.Group();
  testmapping_scene.add( testMappingGroup );
  testMappingGroup.rotation.y = Math.PI;

  var ambientLight = new THREE.AmbientLight( 0xffffff );
  ambientLight.name = 'ambientLight';
  testmapping_scene.add( ambientLight );//

  testmapping_camera.position.x = 0;
  testmapping_camera.position.y = 0;
  testmapping_camera.position.z = 0; //mapping_maxRadius/2;

  testmapping_renderer.setSize(drawWidth,drawHeight);//(window.innerWidth, window.innerHeight);
  canvasObj.appendChild( testmapping_renderer.domElement );


  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////

  var canvasObjGrey = document.getElementById("id_TestCanvasGrey");
  canvasObjGrey.innerHTML = "";
  var boxGrey = canvasObjGrey.getBoundingClientRect();
  var drawWidthGrey = boxGrey.width; //window.innerWidth;
  var drawHeightGrey =boxGrey.height; // window.innerHeight;

  testmapping_sceneGrey = new THREE.Scene();
  testmapping_sceneGrey.background = texture;
	testmapping_cameraGrey = new THREE.PerspectiveCamera(50,drawWidth /drawHeight, 1, 10000);
  testmapping_rendererGrey = new THREE.WebGLRenderer( {alpha: true,antialias: true,
    logarithmicDepthBuffer: true } );
  testmapping_rendererGrey.setClearColor( 0xffffff, 0);
  testMappingGroupGrey = new THREE.Group();
  testmapping_sceneGrey.add( testMappingGroupGrey );
  testMappingGroupGrey.rotation.y = Math.PI;

  var ambientLightGrey = new THREE.AmbientLight( 0xffffff );
  ambientLightGrey.name = 'ambientLightGrey';
  testmapping_sceneGrey.add( ambientLightGrey );

  testmapping_cameraGrey.position.x = 0;
  testmapping_cameraGrey.position.y = 0;
  testmapping_cameraGrey.position.z = 0; //mapping_maxRadius/2;

  testmapping_rendererGrey.setSize(drawWidthGrey,drawHeightGrey);
  canvasObjGrey.appendChild( testmapping_rendererGrey.domElement );

}


function eventTestMapping_mousemove(event){
  // calc mouse pos

  var rect = document.getElementById(event.currentTarget.id).getBoundingClientRect();//

  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;

  mousePosX = canvasPosX;// * ratioToColorspaceResolutionX;
  mousePosY = canvasPosY;// * ratioToColorspaceResolutionY;

  mapping_Translation_X = 0;
  mapping_Translation_Y = 0;

  if(mapping_dorotation && do3DTestField){
      // change x change
      //mapping_xRotationAngle = mapping_xRotationDownAngle + ( mousePosX - mapping_downXPos ) * 0.02;
      //mapping_yRotationAngle = mapping_yRotationDownAngle + ( mousePosY - mapping_downYPos ) * 0.02;

      var angle1 = ((mousePosX-oldXPos)/rect.width) * 2*Math.PI;
      var angle2 = ((oldYPos-mousePosY)/rect.height) * 2*Math.PI;

      var rotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                angle2,
                angle1,
                0,
                'XYZ'
            ));

      oldXPos=mousePosX;
      oldYPos=mousePosY;

      testMappingGroup.quaternion.multiplyQuaternions(rotationQuaternion, testMappingGroup.quaternion);
      testMappingGroupGrey.quaternion.multiplyQuaternions(rotationQuaternion, testMappingGroupGrey.quaternion);
  }

  if(mapping_doTranslation){

    var speedReduction= 0.25+0.75*(mapping_maxRadius-testmapping_camera.position.z)/mapping_maxRadius; // max reduction is to 0.25 of speed

    mapping_Translation_X = (oldXPos-mousePosX)/rect.width * mapping_transferBorderX*speedReduction;
    mapping_Translation_Y = (oldYPos-mousePosY)/rect.height * mapping_transferBorderY*speedReduction;

    oldXPos=mousePosX;
    oldYPos=mousePosY;
  }

}

function eventTestMapping_mousewheel(event){


  if(event.deltaY>0){

    var newRadius=testmapping_camera.position.z-mapping_zoomFactor;

    if(newRadius<=0)
    return;

  	testmapping_camera.position.z = newRadius;
    testmapping_cameraGrey.position.z = newRadius;
    return;
  }

  if(event.deltaY<0){
    var newRadius=testmapping_camera.position.z+mapping_zoomFactor;

    if(newRadius>=mapping_maxRadius)
    return;

    testmapping_camera.position.z = newRadius;
    testmapping_cameraGrey.position.z = newRadius;
    return;
  }

}
