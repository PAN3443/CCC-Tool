


function updateTestMappingCanvas(canvasID)
{
  currentTestMappingCanvasID=canvasID;
  document.getElementById(currentTestMappingCanvasID).appendChild( testmapping_renderer.domElement);
  var box = document.getElementById(currentTestMappingCanvasID).getBoundingClientRect();

  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;

	testmapping_camera.aspect = drawWidth/drawHeight;
	testmapping_camera.updateProjectionMatrix();

	testmapping_renderer.setSize(drawWidth, drawHeight);//*

}


function renderTestMapping() {

          testmapping_renderer.clear();

          testMappingGroup.position.x += mapping_Translation_X;
          testMappingGroup.position.y += mapping_Translation_Y;

          if(mapping_dorotation && do3DTestField){
            testMappingGroup.rotation.y += ( mapping_xRotationAngle - testMappingGroup.rotation.y ) * 0.05;
            testMappingGroup.rotation.x += ( mapping_yRotationAngle - testMappingGroup.rotation.x ) * 0.05;
          }
          else{

            if(!do3DTestField){
              testMappingGroup.rotation.y = 0;
              testMappingGroup.rotation.x = 0;
            }

          }
          /*currentOriginX+= mapping_Translation_X;
          currentOriginY+= mapping_Translation_Y;*/

          mapping_Translation_X=0;
          mapping_Translation_Y=0;

          testmapping_camera.lookAt( testmapping_scene.position);
          testmapping_renderer.render( testmapping_scene, testmapping_camera );

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


function initTestMapping()
{

  mapping_Translation_X=0;
  mapping_Translation_Y=0;

  currentTestMappingCanvasID = "id_UserTestCanvas";
  var canvasObj = document.getElementById(currentTestMappingCanvasID);

  canvasObj.innerHTML = "";
  var box = canvasObj.getBoundingClientRect();
  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;
	testmapping_scene = new THREE.Scene();
	testmapping_camera = new THREE.PerspectiveCamera(50,drawWidth /drawHeight, 1, 10000);//new THREE.PerspectiveCamera(75,drawWidth /drawHeight, 0.1, 1000);//new THREE.Orthographictestmapping_camera( 0.5 * drawWidth * 2 / - 2, 0.5 * drawWidth * 2 / 2, drawWidth / 2, drawWidth / - 2, 150, 1000 ); //new THREE.Perspectivetestmapping_camera(75,drawWidth /drawHeight, 0.1, 1000);
	testmapping_renderer = new THREE.WebGLRenderer( { alpha: true } ); //new THREE.WebGLRenderer();
  testmapping_renderer.setClearColor( 0xffffff, 0);

  testMappingGroup = new THREE.Group();

  testmapping_scene.add( testMappingGroup );
  /////////////////////////////////////

  var ambientLight = new THREE.AmbientLight( 0xffffff );
  ambientLight.name = 'ambientLight';
  testmapping_scene.add( ambientLight );//

  testmapping_camera.position.x = 0;
  testmapping_camera.position.y = 0;
	testmapping_camera.position.z = mapping_maxRadius/2;

	testmapping_renderer.setSize(drawWidth,drawHeight);//(window.innerWidth, window.innerHeight);
  canvasObj.appendChild( testmapping_renderer.domElement );

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
  mapping_Translation_Z = 0;

  if(mapping_dorotation){
      // change x change
      mapping_xRotationAngle = mapping_xRotationDownAngle + ( mousePosX - mapping_downXPos ) * 0.02;
      mapping_yRotationAngle = mapping_yRotationDownAngle + ( mousePosY - mapping_downYPos ) * 0.02;
  }

  if(mapping_doTranslation){
    mapping_Translation_X = (mousePosX-oldXPos)/rect.width * (testmapping_camera.position.z);
    mapping_Translation_Y = (oldYPos-mousePosY)/rect.height * (testmapping_camera.position.z);

    oldXPos=mousePosX;
    oldYPos=mousePosY;
  }

}

function eventTestMapping_mousewheel(event){



  if(event.deltaY>0){

    var newRadius=testmapping_camera.position.z+mapping_zoomFactor;

    if(newRadius>mapping_maxRadius)
    return;

  	testmapping_camera.position.z = newRadius;
    return;
  }

  if(event.deltaY<0){
    var newRadius=testmapping_camera.position.z-mapping_zoomFactor;

    if(newRadius<mapping_minRadius)
    return;

    testmapping_camera.position.z = newRadius;
    return;
  }

}
