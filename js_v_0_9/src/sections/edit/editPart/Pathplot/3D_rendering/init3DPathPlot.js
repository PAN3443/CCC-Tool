
function downloadPathPlot3DImage(){
  stopPathPlotAnimation();
  var oldSize = this.pp_renderer.getSize();
  this.pp_renderer.setSize(2160, 2160);
  this.pp_renderer.preserveDrawingBuffer = true;
  this.pp_renderer.render(this.pp_scene,this.pp_camera);
  pathplotImgData = this.pp_renderer.domElement.toDataURL();
  this.pp_renderer.preserveDrawingBuffer = false;
  this.pp_renderer.setSize(oldSize.width, oldSize.height);
  startPathPlotAnimation();
  this.href = pathplotImgData;
}


function pathPlot3D_Resize()
{

  var canvasObj = document.getElementById("id_EditPage_PathPlot_3D_Div");

  var box = canvasObj.getBoundingClientRect();
  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;

	this.pp_camera.aspect = drawWidth/drawHeight;
	this.pp_camera.updateProjectionMatrix();

	this.pp_renderer.setSize(drawWidth, drawHeight);
}

function renderPathPlot() {
          this.pp_renderer.clear();
          this.pp_colorspaceGroup.rotation.y += ( this.pp_xRotationAngle - this.pp_colorspaceGroup.rotation.y ) * 0.05;
          this.pp_colorspaceGroup.rotation.x += ( this.pp_yRotationAngle - this.pp_colorspaceGroup.rotation.x ) * 0.05;
          this.pp_LineGroup.rotation.y += ( this.pp_xRotationAngle - this.pp_LineGroup.rotation.y ) * 0.05;
          this.pp_LineGroup.rotation.x += ( this.pp_yRotationAngle - this.pp_LineGroup.rotation.x ) * 0.05;
          this.pp_ElementsGroup.rotation.y += ( this.pp_xRotationAngle - this.pp_ElementsGroup.rotation.y ) * 0.05;
          this.pp_ElementsGroup.rotation.x += ( this.pp_yRotationAngle - this.pp_ElementsGroup.rotation.x ) * 0.05;

          this.pp_camera.lookAt( this.pp_scene.position );
          this.pp_renderer.render( this.pp_scene, this.pp_camera );
}

function stopPathPlotAnimation(){
  if(this.pp_doAnimation){
    cancelAnimationFrame( this.pp_animationID );
    this.pp_doAnimation = false;
  }
  //clearInterval(testIntervalAnimation);
}

function animatePathPlot() {
        //testIntervalAnimation = setInterval(renderPathPlot, testAnimationInterval);
        if(this.pp_doAnimation){
          this.pp_animationID = requestAnimationFrame( animatePathPlot );
  				renderPathPlot();
        }
}

function startPathPlotAnimation(){
  this.pp_doAnimation=true;
  animatePathPlot();
}


function initPathPlot(){
  /*if ( ! Detector.webgl ){
     Detector.addGetWebGLMessage();
      return;
  }*/

  var canvasObj = document.getElementById("id_EditPage_PathPlot_3D_Div");

  canvasObj.innerHTML = "";
  var box = canvasObj.getBoundingClientRect();
  var drawWidth = box.width; //window.innerWidth;
  var drawHeight =box.height; // window.innerHeight;
	this.pp_scene = new THREE.this.pp_scene();
	this.pp_camera = new THREE.Perspectivethis.pp_camera(75,drawWidth /drawHeight, 0.1, 1000);//new THREE.Orthographicthis.pp_camera( 0.5 * drawWidth * 2 / - 2, 0.5 * drawWidth * 2 / 2, drawWidth / 2, drawWidth / - 2, 150, 1000 ); //new THREE.Perspectivethis.pp_camera(75,drawWidth /drawHeight, 0.1, 1000);
  this.pp_renderer = new THREE.WebGLthis.pp_renderer({ alpha: true, antialias: true, logarithmicDepthBuffer: true}); //this.pp_renderer = new THREE.WebGLthis.pp_renderer( { alpha: true } ); //new THREE.WebGLthis.pp_renderer();
  this.pp_renderer.setClearColor( 0xffffff, 0);
  this.pp_renderer.setSize(drawWidth,drawHeight);//(window.innerWidth, window.innerHeight);

  canvasObj.appendChild( this.pp_renderer.domElement );

  this.pp_cameraLight = new THREE.PointLight( 0xffffff,1 );
  this.pp_cameraLight.position.set( 0, 0, this.pp_camera_radius );
  this.pp_scene.add( this.pp_cameraLight );

  /*var pointLight = new THREE.PointLight( 0xffffff,1 );
  pointLight.position.set( 0, 0, 0 );
  this.pp_scene.add( pointLight );*/

  this.pp_camera.position.x = 0;
  this.pp_camera.position.y = 0;
	this.pp_camera.position.z = this.pp_camera_radius;

  this.pp_colorspaceGroup = new THREE.Group();
  this.pp_LineGroup = new THREE.Group();
  this.pp_ElementsGroup = new THREE.Group();

  this.pp_scene.add( this.pp_colorspaceGroup );
  this.pp_scene.add( this.pp_LineGroup );
  this.pp_scene.add( this.pp_ElementsGroup );

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
}

function pp3D_mousemove(event){
  // calc mouse pos
  var rect = document.getElementById('id_EditPage_PathPlot_3D_Div').getBoundingClientRect();//event.target.id


  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;
  this.mousePosX = canvasPosX;// * ratioToColorspaceResolutionX;
  this.mousePosY = canvasPosY;// * ratioToColorspaceResolutionY;


  if(this.pp_dorotation){
      this.pp_xRotationAngle = this.pp_xRotationDownAngle + ( this.mousePosX - this.pp_downXPos ) * 0.02;
      this.pp_yRotationAngle = this.pp_yRotationDownAngle + ( this.mousePosY - this.pp_downYPos ) * 0.02;
  }

}

function pp3D_mouseleave(){
  this.pp_dorotation=false;
}

function pp3D_mousedown(){
  this.pp_dorotation=true;
  this.pp_downXPos = this.mousePosX;
  this.pp_downYPos = this.mousePosY;

  this.pp_xRotationDownAngle=this.pp_xRotationAngle; //Math.PI/2;
  this.pp_yRotationDownAngle=this.pp_yRotationAngle;
}

function pp3D_mouseup(){
  this.pp_dorotation=false;
}

function rotatethis.pp_camera(){

  // Use Math.cos and Math.sin to set this.pp_camera X and Z values based on angle.
  this.pp_camera.position.x = this.pp_camera_radius * Math.sin( this.pp_xRotationAngle)* Math.cos( this.pp_yRotationAngle);
  this.pp_camera.position.y = this.pp_camera_radius * Math.sin( this.pp_xRotationAngle)* Math.sin( this.pp_yRotationAngle);
  this.pp_camera.position.z = this.pp_camera_radius *  Math.cos( this.pp_xRotationAngle);

  this.pp_cameraLight.position.x = this.pp_camera_radius * Math.sin( this.pp_xRotationAngle)* Math.cos( this.pp_yRotationAngle);
  this.pp_cameraLight.position.y = this.pp_camera_radius * Math.sin( this.pp_xRotationAngle)* Math.sin( this.pp_yRotationAngle);
  this.pp_cameraLight.position.z = this.pp_camera_radius *  Math.cos( this.pp_xRotationAngle);

  this.pp_camera.lookAt( this.pp_scene.position );
  //render();
}

function changeOpacityRange(event){

      if(parseFloat(document.getElementById(event.target.id).value)<0){
        document.getElementById(event.target.id).value = 0;
      }

      if(parseFloat(document.getElementById(event.target.id).value)>100){
        document.getElementById(event.target.id).value = 100;
      }
      this.pp_space_opacity = parseFloat(document.getElementById(event.target.id).value) / 100;

      planeRG_material.opacity = this.pp_space_opacity;
      planeBG_material.opacity = this.pp_space_opacity;
      planeBR_material.opacity = this.pp_space_opacity;
      planeRG255_material.opacity = this.pp_space_opacity;
      planeBG255_material.opacity = this.pp_space_opacity;
      planeBR255_material.opacity = this.pp_space_opacity;
}
