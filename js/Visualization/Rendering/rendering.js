
function resizeMapping()
{

  var canvasObj = document.getElementById("testVis");

  var box = canvasObj.getBoundingClientRect();
  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;

	mapping_camera.aspect = drawWidth/drawHeight;
	mapping_camera.updateProjectionMatrix();

	mapping_renderer.setSize(drawWidth, drawHeight);//*/
}

function renderMapping() {

          mapping_renderer.clear();

          coordinateArrowsGroup.rotation.y += ( mapping_xRotationAngle - coordinateArrowsGroup.rotation.y ) * 0.05;
          coordinateArrowsGroup.rotation.x += ( mapping_yRotationAngle - coordinateArrowsGroup.rotation.x ) * 0.05;
          mappingGroup.rotation.y += ( mapping_xRotationAngle - mappingGroup.rotation.y ) * 0.05;
          mappingGroup.rotation.x += ( mapping_yRotationAngle - mappingGroup.rotation.x ) * 0.05;

          coordinateArrowsGroup.position.x += mapping_Translation_X;
          coordinateArrowsGroup.position.y += mapping_Translation_Y;

          mappingGroup.position.x += mapping_Translation_X;
          mappingGroup.position.y += mapping_Translation_Y;

          mapping_Translation_X=0;
          mapping_Translation_Y=0;

          mapping_camera.lookAt( mapping_scene.position);//mapping_scene.position );
          mapping_renderer.render( mapping_scene, mapping_camera );

}

function stopAnimationMapping(){
  if(mapping_doingAnimation){
    cancelAnimationFrame( mapping_animationID );
    mapping_doingAnimation = false;
  }
}

function animateMapping() {
				mapping_animationID = requestAnimationFrame( animateMapping );
				renderMapping();
        mapping_doingAnimation = true;
				//stats.update();
}



function initMapping()
{

  if ( ! Detector.webgl ){
     Detector.addGetWebGLMessage();
      return;
  }

  var canvasObj = document.getElementById("testVis");

  canvasObj.innerHTML = "";
  var box = canvasObj.getBoundingClientRect();
  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;
	mapping_scene = new THREE.Scene();
  mapping_scene.background = new THREE.Color( 0xffffff); //0xf6f6f6
	mapping_camera = new THREE.PerspectiveCamera(50,drawWidth /drawHeight, 1, 10000);//new THREE.PerspectiveCamera(75,drawWidth /drawHeight, 0.1, 1000);//new THREE.Orthographicmapping_camera( 0.5 * drawWidth * 2 / - 2, 0.5 * drawWidth * 2 / 2, drawWidth / 2, drawWidth / - 2, 150, 1000 ); //new THREE.Perspectivemapping_camera(75,drawWidth /drawHeight, 0.1, 1000);
	mapping_renderer = new THREE.WebGLRenderer();
  mapping_renderer.setClearColor( 0xffffff, 0);

  coordinateArrowsGroup = new THREE.Group();
  mappingGroup = new THREE.Group();

  mapping_scene.add( coordinateArrowsGroup );
  mapping_scene.add( mappingGroup );

  var from = new THREE.Vector3( 0, 0, 0 );
  var to = new THREE.Vector3( 100, 0, 0 );
  var direction = to.clone().sub(from);
  var length = direction.length();
  var arrowXCoord = new THREE.ArrowHelper(direction.normalize(), from, length, 0x0000ff );
  coordinateArrowsGroup.add( arrowXCoord );

  to = new THREE.Vector3( 0, 100,  0 );
  direction = to.clone().sub(from);
  length = direction.length();
  var arrowYCoord = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000 );
  coordinateArrowsGroup.add( arrowYCoord );

  to = new THREE.Vector3( 0, 0, 100 );
  direction = to.clone().sub(from);
  length = direction.length();
  var arrowZCoord = new THREE.ArrowHelper(direction.normalize(), from, length, 0x00ff00 );
  coordinateArrowsGroup.add( arrowZCoord );
  ////////////////////////////////////////////////////////////////////////////////

  /*mapping_cameraLight = new THREE.PointLight( 0xffffff,1 );
  mapping_cameraLight.position.set( 0, 0, mapping_radius );
  mapping_scene.add( mapping_cameraLight );*/

  var ambientLight = new THREE.AmbientLight( 0xffffff );
  ambientLight.name = 'ambientLight';
  mapping_scene.add( ambientLight );

  /*var pointLight = new THREE.PointLight( 0xffffff,1 );
  pointLight.position.set( 0, 0, 0 );
  mapping_scene.add( pointLight );*/

  mapping_camera.position.x = 0;
  mapping_camera.position.y = 0;
	mapping_camera.position.z = mapping_radius;

	mapping_renderer.setSize(drawWidth,drawHeight);//(window.innerWidth, window.innerHeight);
  canvasObj.appendChild( mapping_renderer.domElement );
  //stats = new Stats();
	//canvasObj.appendChild( stats.dom );

}


//////////////////////////////////////////////////////////////////////////////////////
/////   Events
////////////////////////////////////////////////////////////////////////////////

function eventMapping_mousemove(event){
  // calc mouse pos
  var rect = document.getElementById('testVis').getBoundingClientRect();//event.target.id

  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  //var ratioToColorspaceResolutionX = hue_resolution_X / rect.width;
  //var ratioToColorspaceResolutionY = hue_resolution_Y / rect.height;
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
    mapping_Translation_X = mousePosX-oldXPos;
    mapping_Translation_Y = oldYPos-mousePosY;

    oldXPos=mousePosX;
    oldYPos=mousePosY;
  }

}

function eventMapping_mouseleave(){
  mapping_dorotation=false;
  mapping_doTranslation=false;
  enableScroll();
}


function eventMapping_mouseenter(){
  mapping_dorotation=false;
  mapping_doTranslation=false;
  disableScroll();
}

function eventMapping_mousedown(event){


  switch (event.which) {
    case 1:
      // left mouse click
      mapping_dorotation=true;
      mapping_doTranslation=false;
      mapping_downXPos = mousePosX;
      mapping_downYPos = mousePosY;
      mapping_xRotationDownAngle=mapping_xRotationAngle; //Math.PI/2;
      mapping_yRotationDownAngle=mapping_yRotationAngle;
      break;
    case 3:
      // right mouse click
      mapping_dorotation=false;
      mapping_doTranslation=true;
      oldXPos=mousePosX;
      oldYPos=mousePosY;
      break;
  }

}

function eventMapping_mouseup(){
  mapping_dorotation=false;
  mapping_doTranslation=false;
}


function eventMapping_mousewheel(event){

  if(event.deltaY>0){

    var newRadius=mapping_radius+mapping_zoomFactor;

    if(newRadius>mapping_maxRadius)
    return;

    mapping_radius=newRadius;

    //mapping_cameraLight.position.set( 0, 0, mapping_radius );
    mapping_camera.position.z = mapping_radius;
    return;
  }

  if(event.deltaY<0){
    var newRadius=mapping_radius-mapping_zoomFactor;

    if(newRadius<mapping_minRadius)
    return;

    mapping_radius=newRadius;

    //mapping_cameraLight.position.set( 0, 0, mapping_radius );
    mapping_camera.position.z = mapping_radius;
    return;
  }

}

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}


function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
