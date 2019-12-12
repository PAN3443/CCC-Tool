


function updateTestMappingCanvas()
{

  var idCanvas="id_Test_MeshVisDiv";
  var idCanvasGrey = "id_Test_MeshVisDivGrey";

  if(document.getElementById("id_PopUp_fullTestingWindow").style.display!="none"){
    idCanvas="id_Test_MeshVisDivFull";
    idCanvasGrey = "id_Test_MeshVisDivGreyFull";
  }


  document.getElementById(idCanvas).appendChild( testmapping_renderer.domElement);
  var box = document.getElementById(idCanvas).getBoundingClientRect();

  var aspect = box.width / box.height;
  var texAspect = bgWidth / bgHeight;
  var relAspect = aspect / texAspect;

  if(bg_texture!=undefined){
    bg_texture.repeat = new THREE.Vector2(
        Math.max(relAspect, 1),
        Math.max(1/relAspect,1) );
    bg_texture.offset = new THREE.Vector2(
        -Math.max(relAspect-1, 0)/2,
        -Math.max(1/relAspect-1, 0)/2 );
  }

	testmapping_camera.aspect = aspect;
	testmapping_camera.updateProjectionMatrix();
	testmapping_renderer.setSize(box.width, box.height);//*


  document.getElementById(idCanvasGrey).appendChild( testmapping_rendererGrey.domElement);
  var boxGrey = document.getElementById(idCanvasGrey).getBoundingClientRect();
	testmapping_cameraGrey.aspect = boxGrey.width/boxGrey.height;
	testmapping_cameraGrey.updateProjectionMatrix();
	testmapping_rendererGrey.setSize(boxGrey.width, boxGrey.height);

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

    inform_Worker_GetVisualisation();

}

function showTestingAxis(){

    if(testing_DrawAxes){
      testing_DrawAxes=false;
    }
    else{
      testing_DrawAxes=true;
    }

    updateTest_Mesh();

}

function showTestingBoundingBox(){

    if(testing_DrawBoundingBox){
      testing_DrawBoundingBox=false;
    }
    else{
      testing_DrawBoundingBox=true;
    }

    updateTest_Mesh();

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
  if(testmapping_doAnimation){
    cancelAnimationFrame( mapping_animationID );
    testmapping_doAnimation = false;
  }
}

function animateTestMapping() {

    if(testmapping_doAnimation){
      mapping_animationID = requestAnimationFrame( animateTestMapping );
      renderTestMapping();
    }

}

function startAnimationTestMapping(){
  testmapping_doAnimation = true;
  animateTestMapping();
}



function initTestMapping()
{
  mapping_Translation_X=0;
  mapping_Translation_Y=0;


  var canvasObj = document.getElementById("id_Test_MeshVisDiv");
  canvasObj.innerHTML = "";
  var box = canvasObj.getBoundingClientRect();



  testmapping_scene = new THREE.Scene();
	testmapping_camera = new THREE.PerspectiveCamera(50,box.width / box.height, 1, 10000);
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

  testmapping_renderer.setSize(box.width , box.height);//(window.innerWidth, window.innerHeight);
  canvasObj.appendChild( testmapping_renderer.domElement );


  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////

  var canvasObjGrey = document.getElementById("id_Test_MeshVisDivGrey");
  canvasObjGrey.innerHTML = "";
  var boxGrey = canvasObjGrey.getBoundingClientRect();

  testmapping_sceneGrey = new THREE.Scene();
	testmapping_cameraGrey = new THREE.PerspectiveCamera(50,boxGrey.width /boxGrey.height, 1, 10000);
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

  testmapping_rendererGrey.setSize(boxGrey.width,boxGrey.height);
  canvasObjGrey.appendChild( testmapping_rendererGrey.domElement );


  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////

  // instantiate a loader
  var loader = new THREE.TextureLoader();

  // load a resource
  bg_texture = loader.load(
  	// resource URL
  	'img/EditPage/plotBackground.png',

  	// onLoad callback
  	function ( texture ) {
      var img = texture.image;
        bgWidth= img.width;
        bgHeight = img.height;
        testmapping_scene.background = bg_texture;
        testmapping_sceneGrey.background = bg_texture;
        updateTestMappingCanvas(false);
  	},

  	// onProgRepeatWrappingress callback currently not supported
  	undefined,

  	// onError callback
  	function ( err ) {
  		console.error( 'Background could not be loaded!!!!' );
  	}
  );

  bg_texture.wrapS = THREE.RepeatWrapping;
  bg_texture.wrapT = THREE.RepeatWrapping;


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
    document.getElementById("id_Test_MeshVisOptions_Zoom").value = Math.round(newRadius/mapping_maxRadius*100);
    return;
  }

  if(event.deltaY<0){
    var newRadius=testmapping_camera.position.z+mapping_zoomFactor;

    if(newRadius>=mapping_maxRadius)
    return;

    testmapping_camera.position.z = newRadius;
    testmapping_cameraGrey.position.z = newRadius;
    document.getElementById("id_Test_MeshVisOptions_Zoom").value = Math.round(newRadius/mapping_maxRadius*100);
    return;
  }

}


function testmappingZoomInput(){

  var value = parseInt(document.getElementById("id_Test_MeshVisOptions_Zoom").value);
  var newRadius = value/100*mapping_maxRadius;

  testmapping_camera.position.z = newRadius;
  testmapping_cameraGrey.position.z = newRadius;

}
