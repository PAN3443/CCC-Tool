function pathPlot3D_Resize()
{

  var canvasObj = document.getElementById("id_EditPage_PathPlot_3D_Div");

  var box = canvasObj.getBoundingClientRect();
  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;

	camera.aspect = drawWidth/drawHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(drawWidth, drawHeight);
}

function renderPathPlot() {

          renderer.clear();
          colorspaceGroup.rotation.y += ( xRotationAngle - colorspaceGroup.rotation.y ) * 0.05;
          colorspaceGroup.rotation.x += ( yRotationAngle - colorspaceGroup.rotation.x ) * 0.05;
          pathPlotLineGroup.rotation.y += ( xRotationAngle - pathPlotLineGroup.rotation.y ) * 0.05;
          pathPlotLineGroup.rotation.x += ( yRotationAngle - pathPlotLineGroup.rotation.x ) * 0.05;
          pathPlotElementsGroup.rotation.y += ( xRotationAngle - pathPlotElementsGroup.rotation.y ) * 0.05;
          pathPlotElementsGroup.rotation.x += ( yRotationAngle - pathPlotElementsGroup.rotation.x ) * 0.05;


          /*textR.rotation.y += ( xRotationAngle - textR.rotation.y ) * 0.05;
          textR.rotation.x += ( yRotationAngle - textR.rotation.x ) * 0.05;
          textG.rotation.y += ( xRotationAngle - textG.rotation.y ) * -0.05;
          textG.rotation.x += ( yRotationAngle - textG.rotation.x ) * -0.05;
          textB.rotation.y += ( xRotationAngle - textB.rotation.y ) * -0.05;
          textB.rotation.x += ( yRotationAngle - textB.rotation.x ) * -0.05;*/
          camera.lookAt( scene.position );
          renderer.render( scene, camera );

}

function stopPathPlotAnimation(){

  if(pathplot_doAnimation){
    cancelAnimationFrame( pathplotAnimationID );
    pathplot_doAnimation = false;
  }


  //clearInterval(testIntervalAnimation);


}

function animatePathPlot() {

        //testIntervalAnimation = setInterval(renderPathPlot, testAnimationInterval);

        if(pathplot_doAnimation){
          pathplotAnimationID = requestAnimationFrame( animatePathPlot );
  				renderPathPlot();
        }


}

function startPathPlotAnimation(){
  pathplot_doAnimation=true;
  animatePathPlot();
}


function initPathPlot(){
  /*if ( ! Detector.webgl ){
     Detector.addGetWebGLMessage();
      showSpace=0;
      return;
  }*/


  var canvasObj = document.getElementById("id_EditPage_PathPlot_3D_Div");



  canvasObj.innerHTML = "";
  var box = canvasObj.getBoundingClientRect();
  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;
	scene = new THREE.Scene();
  //scene.background = new THREE.Color( 0xffffff); //0xf6f6f6
	camera = new THREE.PerspectiveCamera(75,drawWidth /drawHeight, 0.1, 1000);//new THREE.OrthographicCamera( 0.5 * drawWidth * 2 / - 2, 0.5 * drawWidth * 2 / 2, drawWidth / 2, drawWidth / - 2, 150, 1000 ); //new THREE.PerspectiveCamera(75,drawWidth /drawHeight, 0.1, 1000);
	//renderer = new THREE.WebGLRenderer();
  renderer = new THREE.WebGLRenderer( { alpha: true } ); //new THREE.WebGLRenderer();
  renderer.setClearColor( 0xffffff, 0);

  renderer.setSize(drawWidth,drawHeight);//(window.innerWidth, window.innerHeight);
  canvasObj.appendChild( renderer.domElement );

  cameraLight = new THREE.PointLight( 0xffffff,1 );
  cameraLight.position.set( 0, 0, radius );
  scene.add( cameraLight );

  /*var pointLight = new THREE.PointLight( 0xffffff,1 );
  pointLight.position.set( 0, 0, 0 );
  scene.add( pointLight );*/

  camera.position.x = 0;
  camera.position.y = 0;
	camera.position.z = radius;

  colorspaceGroup = new THREE.Group();
  pathPlotLineGroup = new THREE.Group();
  pathPlotElementsGroup = new THREE.Group();

  scene.add( colorspaceGroup );
  scene.add( pathPlotLineGroup );
  scene.add( pathPlotElementsGroup );


}

function eventPathPlot3D_mousemove(event){
  // calc mouse pos
  var rect = document.getElementById('id_EditPage_PathPlot_3D_Div').getBoundingClientRect();//event.target.id


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
      /*change = mousePosY-downYPos;
      downYPos = mousePosY;
      ratioChange = change/rect.height;

      angleChange = ratioChange*Math.PI;

      yRotationAngle = yRotationAngle + angleChange;

       rotateCamera();//console.log(xRotationAngle);*/
  }

}

function eventPathPlot3D_mouseleave(){
  dorotation=false;
}

function eventPathPlot3D_mousedown(){
  dorotation=true;
  downXPos = mousePosX;
  downYPos = mousePosY;

  xRotationDownAngle=xRotationAngle; //Math.PI/2;
  yRotationDownAngle=yRotationAngle;
}

function eventPathPlot3D_mouseup(){
  dorotation=false;
}

function rotateCamera(){

  // Use Math.cos and Math.sin to set camera X and Z values based on angle.
  camera.position.x = radius * Math.sin( xRotationAngle)* Math.cos( yRotationAngle);
  camera.position.y = radius * Math.sin( xRotationAngle)* Math.sin( yRotationAngle);
  camera.position.z = radius *  Math.cos( xRotationAngle);

  cameraLight.position.x = radius * Math.sin( xRotationAngle)* Math.cos( yRotationAngle);
  cameraLight.position.y = radius * Math.sin( xRotationAngle)* Math.sin( yRotationAngle);
  cameraLight.position.z = radius *  Math.cos( xRotationAngle);

  camera.lookAt( scene.position );
  //render();
}

function changeOpacityRange(event){

      if(parseFloat(document.getElementById(event.target.id).value)<0){
        document.getElementById(event.target.id).value = 0;
      }

      if(parseFloat(document.getElementById(event.target.id).value)>100){
        document.getElementById(event.target.id).value = 100;
      }
      opacityVal = parseFloat(document.getElementById(event.target.id).value) / 100;

      planeRG_material.opacity = opacityVal;
      planeBG_material.opacity = opacityVal;
      planeBR_material.opacity = opacityVal;
      planeRG255_material.opacity = opacityVal;
      planeBG255_material.opacity = opacityVal;
      planeBR255_material.opacity = opacityVal;


}
