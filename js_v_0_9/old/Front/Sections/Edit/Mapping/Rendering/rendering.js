
function changeAxisVisibility(){

  if(showMappingAxis){
    showMappingAxis=false;
    document.getElementById('id_EditPage_Mapping_ShowAxis').style.background=styleNotActiveColor;
  }
  else{
    showMappingAxis=true;
    document.getElementById('id_EditPage_Mapping_ShowAxis').style.background="none";//styleActiveColor;
  }

  for (var i = 0; i < coordinateArrowsGroup.children.length; i++) {
    if (coordinateArrowsGroup.children[i] instanceof THREE.ArrowHelper) {
        coordinateArrowsGroup.children[i].visible = showMappingAxis;
    }
  }
}



function updateMappingSize()
{
  var box = document.getElementById("id_EditPage_DrawMappingDiv").getBoundingClientRect();

  if(document.getElementById("id_PopUp_fullMappingWindow").style.display!="none"){
    box = document.getElementById("id_PopUp_FullMappingDiv").getBoundingClientRect();
  }

  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;

	mapping_camera.aspect = drawWidth/drawHeight;
	mapping_camera.updateProjectionMatrix();

	mapping_renderer.setSize(drawWidth, drawHeight);//*

}

function renderMapping() {

  if(mappingMesh!=undefined)

          mapping_renderer.clear();

          coordinateArrowsGroup.rotation.y += ( mapping_xRotationAngle - coordinateArrowsGroup.rotation.y ) * 0.05;
          coordinateArrowsGroup.rotation.x += ( mapping_yRotationAngle - coordinateArrowsGroup.rotation.x ) * 0.05;

          coordinateArrowsGroup.position.x += mapping_Translation_X;
          coordinateArrowsGroup.position.y += mapping_Translation_Y;

          currentOriginX+= mapping_Translation_X;
          currentOriginY+= mapping_Translation_Y;

          mapping_Translation_X=0;
          mapping_Translation_Y=0;

          mapping_camera.lookAt( mapping_scene.position);//mapping_scene.position );
          mapping_renderer.render( mapping_scene, mapping_camera );
}

function stopAnimationMapping(){
  if(mapping_doAnimation){
    cancelAnimationFrame( mapping_animationID );
    mapping_doAnimation = false;
  }
}

function animateMapping() {
    if(mapping_doAnimation){
      mapping_animationID = requestAnimationFrame( animateMapping );
      renderMapping();
    }
}

function startAnimationMapping(){
  mapping_doAnimation = true;
  animateMapping();
}


function initMapping()
{

  /*if ( ! Detector.webgl ){
     Detector.addGetWebGLMessage();
      return;
  }*/

  currentOriginX=0;
  currentOriginY=0;

  var canvasObj = document.getElementById("id_EditPage_DrawMappingDiv");

  canvasObj.innerHTML = "";
  var box = canvasObj.getBoundingClientRect();
  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;
	mapping_scene = new THREE.Scene();
  //mapping_scene.background = new THREE.Color( 0x000000 );
	mapping_camera = new THREE.PerspectiveCamera(50,drawWidth /drawHeight, 1, 10000);//new THREE.PerspectiveCamera(75,drawWidth /drawHeight, 0.1, 1000);//new THREE.Orthographicmapping_camera( 0.5 * drawWidth * 2 / - 2, 0.5 * drawWidth * 2 / 2, drawWidth / 2, drawWidth / - 2, 150, 1000 ); //new THREE.Perspectivemapping_camera(75,drawWidth /drawHeight, 0.1, 1000);
	mapping_renderer = new THREE.WebGLRenderer( { alpha: true } ); //new THREE.WebGLRenderer();
  //mapping_renderer = new THREE.WebGLRenderer({ alpha: true });
  mapping_renderer.setClearColor( 0xffffff, 0);

  coordinateArrowsGroup = new THREE.Group();

  mapping_scene.add( coordinateArrowsGroup );

  var from = new THREE.Vector3( 0, 0, 0 );
  var to = new THREE.Vector3( 100, 0, 0 );
  var direction = to.clone().sub(from);
  var length = direction.length();
  var arrowXAxis= new THREE.ArrowHelper(direction.normalize(), from, length, 0x0000ff );
  if(document.getElementById('id_EditPage_Mapping_ShowAxis').checked==false)
    arrowXAxis.visible=false;
  coordinateArrowsGroup.add( arrowXAxis);

  to = new THREE.Vector3( 0, 100,  0 );
  direction = to.clone().sub(from);
  length = direction.length();
  var arrowYAxis= new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000 );
  if(document.getElementById('id_EditPage_Mapping_ShowAxis').checked==false)
    arrowYAxis.visible=false;
  coordinateArrowsGroup.add( arrowYAxis);

  to = new THREE.Vector3( 0, 0, 100 );
  direction = to.clone().sub(from);
  length = direction.length();
  var arrowZAxis= new THREE.ArrowHelper(direction.normalize(), from, length, 0x00ff00 );
  if(document.getElementById('id_EditPage_Mapping_ShowAxis').checked==false)
    arrowZAxis.visible=false;
  coordinateArrowsGroup.add( arrowZAxis);
  ////////////////////////////////////////////////////////////////////////////////

  /*mapping_cameraLight = new THREE.PointLight( 0xff0040, 1, 0, 2 ); // color, intensity, distance, decay
  mapping_cameraLight.add( new THREE.Mesh( new THREE.SphereBufferGeometry( 0.02, 16, 8 ), new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
  mapping_cameraLight.position.set( 0, 0, mapping_maxRadius/2 );
	mapping_cameraLight.castShadow = true;
  mapping_scene.add( mapping_cameraLight );//*/

  /*mapping_cameraLight = new THREE.PointLight( 0xffffff );
  mapping_camera.add(mapping_cameraLight);*/

  /////////////////////////////////////

  var ambientLight = new THREE.AmbientLight( 0xffffff );
  ambientLight.name = 'ambientLight';
  mapping_scene.add( ambientLight );//


  mapping_camera.position.x = 0;
  mapping_camera.position.y = 0;
	mapping_camera.position.z = mapping_maxRadius/2;

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

  var rect = document.getElementById(event.currentTarget.id).getBoundingClientRect();//

/*  var rect = document.getElementById("id_EditPage_DrawMappingDiv").getBoundingClientRect();

  if(document.getElementById("id_PopUp_fullMappingWindow").style.display!="none"){
    rect = document.getElementById("id_PopUp_FullMappingDiv").getBoundingClientRect();
  }*/

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
    mapping_Translation_X = (mousePosX-oldXPos)/rect.width * (mapping_camera.position.z);
    mapping_Translation_Y = (oldYPos-mousePosY)/rect.height * (mapping_camera.position.z);

    oldXPos=mousePosX;
    oldYPos=mousePosY;
  }

}

/*export*/ function eventMapping_mouseleave(){
  mapping_dorotation=false;
  mapping_doTranslation=false;
  enableScroll();
}


/*export*/ function eventMapping_mouseenter(){
  mapping_dorotation=false;
  mapping_doTranslation=false;
  disableScroll();
}

function eventMapping_mousedown(event){

  oldXPos=mousePosX;
  oldYPos=mousePosY;

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
      break;
  }

}

function eventMapping_mouseup(){
  mapping_dorotation=false;
  mapping_doTranslation=false;
}


function eventMapping_mousewheel(event){

  if(event.deltaY>0){

    var newRadius=mapping_camera.position.z+mapping_zoomFactor;

    if(newRadius>mapping_maxRadius)
    return;

    mapping_camera.position.z=newRadius;
    return;
  }

  if(event.deltaY<0){
    var newRadius=mapping_camera.position.z-mapping_zoomFactor;

    if(newRadius<mapping_minRadius)
    return;

    mapping_camera.position.z=newRadius;
    return;
  }

}
