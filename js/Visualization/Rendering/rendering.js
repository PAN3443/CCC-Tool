
function resizeMapping()
{

  var canvasObj = document.getElementById("id_LinearMap_Table_Div");

  var box = canvasObj.getBoundingClientRect();
  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;

	mapping_camera.aspect = drawWidth/drawHeight;
	mapping_camera.updateProjectionMatrix();

	mapping_renderer.setSize(drawWidth, drawHeight);*/
}

function renderMapping() {


          mapping_renderer.clear();
          /*rgbGroup.rotation.y += ( xRotationAngle - rgbGroup.rotation.y ) * 0.05;
          rgbGroup.rotation.x += ( yRotationAngle - rgbGroup.rotation.x ) * 0.05;
          colormapRGB3D.rotation.y = rgbGroup.rotation.y;
          colormapRGB3D.rotation.x = rgbGroup.rotation.x;

          textR.rotation.y += ( xRotationAngle - textR.rotation.y ) * 0.05;
          textR.rotation.x += ( yRotationAngle - textR.rotation.x ) * 0.05;
          textG.rotation.y += ( xRotationAngle - textG.rotation.y ) * -0.05;
          textG.rotation.x += ( yRotationAngle - textG.rotation.x ) * -0.05;
          textB.rotation.y += ( xRotationAngle - textB.rotation.y ) * -0.05;
          textB.rotation.x += ( yRotationAngle - textB.rotation.x ) * -0.05;*/
          mapping_camera.lookAt( mapping_scene.position );
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
				render();
        mapping_doingAnimation = true;
				//stats.update();
}



function initMapping()
{

  if ( ! Detector.webgl ){
     Detector.addGetWebGLMessage();
      return;
  }

  var canvasObj;

  switch (showSideID) {
    case 1:
        canvasObj = document.getElementById("id_rgb3DModiy");
      break;

    case 2:
        canvasObj = document.getElementById("id_rgb3D");
      break;
      case 3:
        canvasObj = document.getElementById("id_rgb3DCompare");
        break;
    default:
      return;
  }

  canvasObj.innerHTML = "";
  var box = canvasObj.getBoundingClientRect();
  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;
	mapping_scene = new THREE.mapping_scene();
  mapping_scene.background = new THREE.Color( 0xffffff); //0xf6f6f6
	mapping_camera = new THREE.Perspectivemapping_camera(75,drawWidth /drawHeight, 0.1, 1000);//new THREE.Orthographicmapping_camera( 0.5 * drawWidth * 2 / - 2, 0.5 * drawWidth * 2 / 2, drawWidth / 2, drawWidth / - 2, 150, 1000 ); //new THREE.Perspectivemapping_camera(75,drawWidth /drawHeight, 0.1, 1000);
	mapping_renderer = new THREE.WebGLmapping_renderer();

  /*rgbGroup = new THREE.Group();
  colormapRGB3D = new THREE.Group();
  mapping_scene.add( rgbGroup );
  mapping_scene.add( colormapRGB3D );
	//group.position.y = 100;

  /*
    * Create a Rectangle
  */
  /*var textureRG = THREE.ImageUtils.loadTexture( "img/WebGL/rg.png" );
  var planeRG_geometry = new THREE.PlaneGeometry( 256, 256, 1, 1 );
  planeRG_material = new THREE.MeshLambertMaterial({ map : textureRG, side: THREE.DoubleSide });
  planeRG_material.transparent = true;
  planeRG_material.opacity = opacityVal;
  planeRG = new THREE.Mesh( planeRG_geometry, planeRG_material );
  rgbGroup.add( planeRG );

  planeRG.position.x = 0;
  planeRG.position.y = 0;
  planeRG.position.z = -128;

  var textureBG = THREE.ImageUtils.loadTexture( "img/WebGL/bg.png" );
  var planeBG_geometry = new THREE.PlaneGeometry( 256, 256, 1, 1 );
  planeBG_material = new THREE.MeshLambertMaterial({ map : textureBG, side: THREE.DoubleSide });
  planeBG_material.transparent = true;
  planeBG_material.opacity = opacityVal;
  planeBG = new THREE.Mesh( planeBG_geometry, planeBG_material );
  rgbGroup.add( planeBG );

  planeBG.rotation.y = Math.PI+Math.PI/2;

  planeBG.position.x = -128;
  planeBG.position.y = 0;
  planeBG.position.z = 0;

  var textureBR = THREE.ImageUtils.loadTexture( "img/WebGL/rb.png" );
  var planeBR_geometry = new THREE.PlaneGeometry( 256, 256, 1, 1 );
  planeBR_material = new THREE.MeshLambertMaterial({ map : textureBR, side: THREE.DoubleSide });
  planeBR_material.transparent = true;
  planeBR_material.opacity = opacityVal;
  planeBR = new THREE.Mesh( planeBR_geometry, planeBR_material );

  rgbGroup.add( planeBR );

  planeBR.rotation.x = Math.PI/2;

  planeBR.position.x = 0;
  planeBR.position.y = -128;
  planeBR.position.z = 0;

  var textureRG255 = THREE.ImageUtils.loadTexture( "img/WebGL/rg_255.png" );
  var planeRG255_geometry = new THREE.PlaneGeometry( 256, 256, 1, 1 );
  planeRG255_material = new THREE.MeshLambertMaterial({ map : textureRG255, side: THREE.DoubleSide });
  planeRG255_material.transparent = true;
  planeRG255_material.opacity = opacityVal;
  planeRG255 = new THREE.Mesh( planeRG255_geometry, planeRG255_material );
  rgbGroup.add( planeRG255 );

  planeRG255.position.x = 0;
  planeRG255.position.y = 0;
  planeRG255.position.z = 128;//

  var textureBG255 = THREE.ImageUtils.loadTexture( "img/WebGL/bg_255.png" );
  var planeBG255_geometry = new THREE.PlaneGeometry( 256, 256, 1, 1 );
  planeBG255_material = new THREE.MeshLambertMaterial({ map : textureBG255, side: THREE.DoubleSide });
  planeBG255_material.transparent = true;
  planeBG255_material.opacity = opacityVal;
  planeBG255 = new THREE.Mesh( planeBG255_geometry, planeBG255_material );
  rgbGroup.add( planeBG255 );

  planeBG255.rotation.y = Math.PI+Math.PI/2;

  planeBG255.position.x = 128;
  planeBG255.position.y = 0;
  planeBG255.position.z = 0;

  var textureBR255 = THREE.ImageUtils.loadTexture( "img/WebGL/rb_255.png" );
  var planeBR255_geometry = new THREE.PlaneGeometry( 256, 256, 1, 1 );
  planeBR255_material = new THREE.MeshLambertMaterial({ map : textureBR255, side: THREE.DoubleSide });
  planeBR255_material.transparent = true;
  planeBR255_material.opacity = opacityVal;
  planeBR255 = new THREE.Mesh( planeBR255_geometry, planeBR255_material );

  rgbGroup.add( planeBR255 );

  planeBR255.rotation.x = Math.PI/2;

  planeBR255.position.x = 0;
  planeBR255.position.y = 128;
  planeBR255.position.z = 0;

  /////////////////////////////////////////////////////////////


  var from = new THREE.Vector3( -128, -128, -128 );
  var to = new THREE.Vector3( 200, -128, -128 );
  var direction = to.clone().sub(from);
  var length = direction.length();
  var arrowXCoord = new THREE.ArrowHelper(direction.normalize(), from, length, 0x000000 );
  rgbGroup.add( arrowXCoord );

  to = new THREE.Vector3( -128, 200,  -128 );
  direction = to.clone().sub(from);
  length = direction.length();
  var arrowYCoord = new THREE.ArrowHelper(direction.normalize(), from, length, 0x000000 );
  rgbGroup.add( arrowYCoord );

  to = new THREE.Vector3( -128, -128, 200 );
  direction = to.clone().sub(from);
  length = direction.length();
  var arrowZCoord = new THREE.ArrowHelper(direction.normalize(), from, length, 0x000000 );
  rgbGroup.add( arrowZCoord );
  ////////////////////////////////////////////////////////////////////////////////


  //////////////////////////////////////////////////////////////////

    var loader = new THREE.FontLoader();

      loader.load( 'js/WebGL/three/helvetiker_regular.typeface.json', function ( font ) {

      var textGeo1 = new THREE.TextGeometry( "R", {
          font: font,
          size: textSize,
          height: textHeight,
          curveSegments: 4,
          bevelThickness: 2,
          bevelSize: 1.5,
          bevelEnabled: true
      } );

      var textGeo2 = new THREE.TextGeometry( "G", {
          font: font,
          size: textSize,
          height: textHeight,
          curveSegments: 4,
          bevelThickness: 2,
          bevelSize: 1.5,
          bevelEnabled: true
      } );

      var textGeo3 = new THREE.TextGeometry( "B", {
          font: font,
          size: textSize,
          height: textHeight,
          curveSegments: 4,
          bevelThickness: 2,
          bevelSize: 1.5,
          bevelEnabled: true
      } );

      var textMaterial = new THREE.MeshPhongMaterial( { color: 0x000000 } );

      textR = new THREE.Mesh( textGeo1, textMaterial );
      textR.position.set( 220, -128, -128 );

      textG = new THREE.Mesh( textGeo2, textMaterial );
      textG.position.set( -128, 220,  -128 );

      textB = new THREE.Mesh( textGeo3, textMaterial );
      textB.position.set( -128, -128, 220 );

      rgbGroup.add( textR );
      rgbGroup.add( textG );
      rgbGroup.add( textB );

  } );*/

  mapping_cameraLight = new THREE.PointLight( 0xffffff,1 );
  mapping_cameraLight.position.set( 0, 0, radius );
  mapping_scene.add( mapping_cameraLight );

  /*var pointLight = new THREE.PointLight( 0xffffff,1 );
  pointLight.position.set( 0, 0, 0 );
  mapping_scene.add( pointLight );*/

  mapping_camera.position.x = 0;
  mapping_camera.position.y = 0;
	mapping_camera.position.z = radius;

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
  /*var rect;
  switch (showSideID) {
    case 1:
      rect = document.getElementById('id_rgb3DModiy').getBoundingClientRect();//event.target.id
      break;
    case 2:
      rect = document.getElementById('id_rgb3D').getBoundingClientRect();//event.target.id
      break;
    case 3:
        rect = document.getElementById('id_rgb3DCompare').getBoundingClientRect();//event.target.id
    break;
    default:
      return;
  }

  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  //var ratioToColorspaceResolutionX = hue_resolution_X / rect.width;
  //var ratioToColorspaceResolutionY = hue_resolution_Y / rect.height;
  mousePosX = canvasPosX;// * ratioToColorspaceResolutionX;
  mousePosY = canvasPosY;// * ratioToColorspaceResolutionY;


  if(dorotation){
      // change x change

      xRotationAngle = xRotationDownAngle + ( mousePosX - downXPos ) * 0.02;
      yRotationAngle = yRotationDownAngle + ( mousePosY - downYPos ) * 0.02;

  }*/

}

function eventMapping_mouseleave(){
  //dorotation=false;
}

function eventMapping_mousedown(){
  /*dorotation=true;
  downXPos = mousePosX;
  downYPos = mousePosY;

  xRotationDownAngle=xRotationAngle; //Math.PI/2;
  yRotationDownAngle=yRotationAngle;*/
}

function eventMapping_mouseup(){
  //dorotation=false;
}

function rotatemapping_cameraMapping(){

  // Use Math.cos and Math.sin to set mapping_camera X and Z values based on angle.
  /*mapping_camera.position.x = radius * Math.sin( xRotationAngle)* Math.cos( yRotationAngle);
  mapping_camera.position.y = radius * Math.sin( xRotationAngle)* Math.sin( yRotationAngle);
  mapping_camera.position.z = radius *  Math.cos( xRotationAngle);

  mapping_cameraLight.position.x = radius * Math.sin( xRotationAngle)* Math.cos( yRotationAngle);
  mapping_cameraLight.position.y = radius * Math.sin( xRotationAngle)* Math.sin( yRotationAngle);
  mapping_cameraLight.position.z = radius *  Math.cos( xRotationAngle);

  mapping_camera.lookAt( mapping_scene.position );
  //render();*/
}
