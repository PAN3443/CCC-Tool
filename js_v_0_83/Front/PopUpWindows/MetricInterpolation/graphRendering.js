

//import {eventMapping_mouseleave, eventMapping_mouseenter,eventMapping_mousedown} from '../Sections/Edit/Mapping/Rendering/rendering.js';





/////////////////////////////////////////

var tmpGraph = undefined;

function initForceGraph(){
  tmpGraph = new class_Graph("rgb");


  if(globalCMS1==undefined)
    return;

  if(globalCMS1==null)
    return;

  if(globalCMS1.getKeyLength()==0)
    return;


  var continuousSections = searchForContinuousSections(0,globalCMS1.getKeyLength()-1);

  for (var j = 0; j < continuousSections.length; j++) {
      for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++) {
        tmpGraph.pushNode(globalCMS1.getRightKeyColor(i,globalCMS1.getInterpolationSpace()));
      }// for
      tmpGraph.pushNode(globalCMS1.getLeftKeyColor(continuousSections[j][1],globalCMS1.getInterpolationSpace()));

      for (var i = continuousSections[j][0]; i < continuousSections[j][1]; i++) {
        for (var k = i+1; k <= continuousSections[j][1]; k++) {
          tmpGraph.pushEdge_DistanceWeight(i,k,"eu");
        }
      }
      break;
  }


  /*switch (document.getElementById("id_teeeeeestselect").selectedIndex) {
    case 0:
      tmpGraph.pushNode(new class_Color_RGB(80/255, 200/255, 50/255));
      tmpGraph.pushNode(new class_Color_RGB(20/255, 80/255, 140/255));
      tmpGraph.pushNode(new class_Color_RGB(50/255, 20/255, 8/255));
      tmpGraph.pushNode(new class_Color_RGB(80/255, 200/255, 10/255));
      tmpGraph.pushNode(new class_Color_RGB(50/255, 50/255, 250/255));
      tmpGraph.pushEdge_DistanceWeight(0,1,"eu");
      tmpGraph.pushEdge_DistanceWeight(1,2,"eu");
      tmpGraph.pushEdge_DistanceWeight(2,3,"eu");
      tmpGraph.pushEdge_DistanceWeight(3,4,"eu");
      break;
      case 1:
      tmpGraph.pushNode(new class_Color_RGB(80/255, 200/255, 50/255));
      tmpGraph.pushNode(new class_Color_RGB(50/255, 20/255, 8/255));
      tmpGraph.pushNode(new class_Color_RGB(50/255, 50/255, 250/255));
      tmpGraph.pushEdge_DistanceWeight(0,1,"eu");
      break;
      case 2:
      tmpGraph.pushNode(new class_Color_RGB(80/255, 200/255, 50/255));
      tmpGraph.pushNode(new class_Color_RGB(50/255, 20/255, 8/255));
      tmpGraph.pushNode(new class_Color_RGB(50/255, 50/255, 250/255));
      tmpGraph.pushEdge_DistanceWeight(0,1,"eu");
      tmpGraph.pushEdge_DistanceWeight(1,2,"eu");
      tmpGraph.pushEdge_DistanceWeight(2,0,"eu");
      break;
      case 3:
      tmpGraph.pushNode(new class_Color_RGB(50/255, 0, 0));
      tmpGraph.pushNode(new class_Color_RGB(50/255, 80/255, 0));
      tmpGraph.pushNode(new class_Color_RGB(50/255, 200/255, 90/255));
      tmpGraph.pushNode(new class_Color_RGB(50/255, 0/255, 80/255));
      tmpGraph.pushEdge_DistanceWeight(0,1,"eu");
      tmpGraph.pushEdge_DistanceWeight(1,2,"eu");
      tmpGraph.pushEdge_DistanceWeight(2,3,"eu");
      tmpGraph.pushEdge_DistanceWeight(3,0,"eu");
      break;
      case 4:
      tmpGraph.pushNode(new class_Color_RGB(0, 0, 0));
      tmpGraph.pushNode(new class_Color_RGB(20/255, 80/255, 140/255));
      tmpGraph.pushNode(new class_Color_RGB(80/255, 200/255, 10/255));
      tmpGraph.pushNode(new class_Color_RGB(50/255, 50/255, 250/255));
      tmpGraph.pushEdge_DistanceWeight(0,1,"eu");
      tmpGraph.pushEdge_DistanceWeight(0,2,"eu");
      tmpGraph.pushEdge_DistanceWeight(0,3,"eu");
      tmpGraph.pushEdge_DistanceWeight(1,2,"eu");
      tmpGraph.pushEdge_DistanceWeight(1,3,"eu");
      tmpGraph.pushEdge_DistanceWeight(2,3,"eu");
      break;
      case 5:
      tmpGraph.pushNode(new class_Color_RGB(0, 0, 0));
      tmpGraph.pushNode(new class_Color_RGB(20/255, 80/255, 140/255));
      tmpGraph.pushNode(new class_Color_RGB(50/255, 20/255, 8/255));
      tmpGraph.pushNode(new class_Color_RGB(80/255, 200/255, 10/255));
      tmpGraph.pushNode(new class_Color_RGB(50/255, 50/255, 250/255));
      tmpGraph.pushEdge_DistanceWeight(0,1,"eu");
      tmpGraph.pushEdge_DistanceWeight(1,2,"eu");
      tmpGraph.pushEdge_DistanceWeight(2,3,"eu");
      tmpGraph.pushEdge_DistanceWeight(3,0,"eu");
      tmpGraph.pushEdge_DistanceWeight(0,4,"eu");
      tmpGraph.pushEdge_DistanceWeight(1,4,"eu");
      tmpGraph.pushEdge_DistanceWeight(2,4,"eu");
      tmpGraph.pushEdge_DistanceWeight(3,4,"eu");
      break;
    default:
      return;
  }*/

  draw_MetricInt_Graph();
}




function sliderOnChange(){
  initForceGraph();
  testForceGraph();
}

function testForceGraph(){

  /*var value = document.getElementById("id_teeeeeestslider").value;

  document.getElementById("id_teeeeeestvalue").innerHTML = value;

  if(value==0)
    return;

    tmpGraph.force(100,value);
    */

  tmpGraph.force(100,0.2);
  draw_MetricInt_Graph();
}



//////////////////////////////////////////////////////////////


function draw_MetricInt_Graph(){

  for (var i = metricInt_GraphGroup.children.length - 1; i > 0; i--) {
    metricInt_GraphGroup.remove(metricInt_GraphGroup.children[i]);
  }

  metricInt_GraphGroup.add(metricInT_GraphRendering_RGBMesh);
  metricInt_GraphGroup.add(metricInT_GraphRendering_RGBLineMesh);



  var linesGeometry = new THREE.BufferGeometry();
  var linesMaterial = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 1 } );
  var linesIndices = [];
  var linesColors = [];

  var points_Geometry = new THREE.BufferGeometry();
  var points_Positions = [];
  var points_Colors = [];

  for ( var i = 0; i < tmpGraph.getNodeLength(); i ++ ) {
    // positions

    var tmpColor = tmpGraph.getNodeColor(i);

    if(tmpColor.getColorType()==="rgb"){
      points_Positions.push(tmpColor.get1Value()*255-127.5, tmpColor.get2Value()*255-127.5, tmpColor.get3Value()*255-127.5);
      points_Colors.push(tmpColor.get1Value(), tmpColor.get2Value(), tmpColor.get3Value()); //0,0,0);//
    }
    else{
      points_Positions.push(tmpColor.get1Value(), tmpColor.get2Value(), tmpColor.get3Value());
      var tmpRGB = tmpColor.calcRGBColor();
      points_Colors.push(tmpRGB.get1Value(), tmpRGB.get2Value(), tmpRGB.get3Value());
      tmpRGB.deleteReferences();
      tmpRGB=null;
    }

    tmpColor.deleteReferences();
    tmpColor=null;
  }

  for ( var i = 0; i < tmpGraph.getEdgeLength(); i ++ ) {
    // positions
    linesIndices.push(tmpGraph.getEdgeNodeID_1(i),tmpGraph.getEdgeNodeID_2(i));
  }

  //////////////////////////////////////////////////////////////

  linesGeometry.setIndex( linesIndices );
  linesGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( points_Positions, 3 ) );
  //linesGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( linesColors, 3 ) );
  linesGeometry.computeBoundingSphere();
  metricInt_GraphGroup.add(new THREE.LineSegments( linesGeometry, linesMaterial ));

  points_Geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( points_Positions, 3 ) );
  points_Geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( points_Colors, 3 ) );
  points_Geometry.computeBoundingSphere();
  //
  var tmpSize = 5;

  if((255*0.8)/tmpGraph.getNodeLength()>tmpSize)
    tmpSize=(255*0.8)/tmpGraph.getNodeLength();

  metricInt_GraphGroup.add(new THREE.Points( points_Geometry, new THREE.PointsMaterial( { size: tmpSize, vertexColors: THREE.VertexColors } )));
  metricInt_Graph_camera.position.z = 500;


}


///////////////////////////////////////////////////////////////////////////////////
/////// Init /////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function init_MetricInt_Events(){
  document.getElementById('id_MetricInter_GraphRenderDiv').addEventListener('contextmenu', event => event.preventDefault());
  document.getElementById('id_MetricInter_GraphRenderDiv').addEventListener("mousemove", event_MetricInt_Graph_mousemove);
  document.getElementById('id_MetricInter_GraphRenderDiv').addEventListener("mouseleave", eventMapping_mouseleave);
  document.getElementById('id_MetricInter_GraphRenderDiv').addEventListener("mouseenter", eventMapping_mouseenter);
  document.getElementById('id_MetricInter_GraphRenderDiv').addEventListener("mousedown", eventMapping_mousedown);
  document.getElementById('id_MetricInter_GraphRenderDiv').addEventListener("mouseup", eventMapping_mouseup);
  document.getElementById("id_MetricInter_GraphRenderDiv").addEventListener("wheel", event_MetricInt_Graph_mousewheel);
}

//////////////////////////////////////////////////////////////////////////////////
/////// Modul Vars  //////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

var metricInt_Graph_doAnimation = false;
var metricInt_Graph_scene;
var metricInt_Graph_camera;
var metricInt_Graph_renderer;
var metricInt_GraphGroup;
var metricInt_GraphMesh;
var metricInt_Graph_controls;
var metricInT_GraphRendering_RGBMesh;
var metricInT_GraphRendering_RGBLineMesh;

/////////////////////////////////////////

function render_MetricInt_Graph() {

    metricInt_Graph_renderer.clear();

    var newXPos = metricInt_GraphGroup.position.x + mapping_Translation_X;
    var newYPos = metricInt_GraphGroup.position.y + mapping_Translation_Y;

    if(newXPos>=-150 && newXPos<=150){
        metricInt_GraphGroup.position.x = newXPos;
    }

    if(newYPos>=-150 && newYPos<=150){
      metricInt_GraphGroup.position.y = newYPos;
    }

    mapping_Translation_X=0;
    mapping_Translation_Y=0;

    metricInt_Graph_renderer.render( metricInt_Graph_scene,metricInt_Graph_camera );
}

/*export*/ function stopAnimation_MetricInt_Graph(){
  if(metricInt_Graph_doAnimation){
    cancelAnimationFrame( mapping_animationID );
    metricInt_Graph_doAnimation = false;
  }
}

function animate_MetricInt_Graph() {

    if(metricInt_Graph_doAnimation){
      mapping_animationID = requestAnimationFrame( animate_MetricInt_Graph );
      render_MetricInt_Graph();
    }

}

/*export*/ function startAnimation_MetricInt_Graph(){
  metricInt_Graph_doAnimation = true;
  animate_MetricInt_Graph();
  update_MetricInt_RenderSize();
}

function update_MetricInt_RenderSize()
{
  document.getElementById("id_MetricInter_GraphRenderDiv").appendChild( metricInt_Graph_renderer.domElement);
  var box = document.getElementById("id_MetricInter_GraphRenderDiv").getBoundingClientRect();

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

	metricInt_Graph_camera.aspect = aspect;
	metricInt_Graph_camera.updateProjectionMatrix();
	metricInt_Graph_renderer.setSize(box.width, box.height);//*
}

function init_MetricInt_Graph()
{
  mapping_Translation_X=0;
  mapping_Translation_Y=0;

  var divObj = document.getElementById("id_MetricInter_GraphRenderDiv");
  divObj.innerHTML = "";
  var box = divObj.getBoundingClientRect();

  metricInt_Graph_scene = new THREE.Scene();
	metricInt_Graph_camera = new THREE.PerspectiveCamera(50,box.width / box.height, 1, 10000);
  metricInt_Graph_renderer = new THREE.WebGLRenderer({ alpha: true,antialias: true,
    logarithmicDepthBuffer: true});
  metricInt_Graph_renderer.setClearColor( 0xffffff, 0);
  metricInt_GraphGroup = new THREE.Group();
  metricInt_Graph_scene.add( metricInt_GraphGroup );
  metricInt_GraphGroup.rotation.y = Math.PI;

  var ambientLight = new THREE.AmbientLight( 0xffffff );
  ambientLight.name = 'ambientLight';
  metricInt_Graph_scene.add( ambientLight );//

  metricInt_Graph_camera.position.x = 0;
  metricInt_Graph_camera.position.y = 0;
  metricInt_Graph_camera.position.z = 0; //mapping_maxRadius/2;

  metricInt_Graph_renderer.setSize(box.width , box.height);//(window.innerWidth, window.innerHeight);
  divObj.appendChild( metricInt_Graph_renderer.domElement );


  /////////////////////////////////////
  /////////////////////////////////////


  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////

  // instantiate a loader
  /*var loader = new THREE.TextureLoader();

  // load a resource
  bg_texture = loader.load(
  	// resource URL
  	'img/EditPage/plotBackground.png',

  	// onLoad callback
  	function ( texture ) {
      var img = texture.image;
        bgWidth= img.width;
        bgHeight = img.height;
        metricInt_Graph_scene.background = bg_texture;
        update_MetricInt_RenderSize();
  	},

  	// onProgRepeatWrappingress callback currently not supported
  	undefined,

  	// onError callback
  	function ( err ) {
  		console.error( 'Background could not be loaded!!!!' );
  	}
  );

  bg_texture.wrapS = THREE.RepeatWrapping;
  bg_texture.wrapT = THREE.RepeatWrapping;*/

  metricInt_Graph_renderer = new THREE.WebGLRenderer( { alpha: true } ); //new THREE.WebGLRenderer();
  metricInt_Graph_renderer.setClearColor( 0xffffff, 0);
  update_MetricInt_RenderSize();


  metricInT_GraphRendering_RGBMesh = create_RGB_Plane_Mesh(1,-127.5);
  metricInT_GraphRendering_RGBLineMesh = create_RGB_Line_Mesh(-127.5,127.5);



}


function event_MetricInt_Graph_mousemove(event){
  // calc mouse pos

  var rect = document.getElementById(event.currentTarget.id).getBoundingClientRect();//

  var canvasPosX = event.clientX - rect.left;
  var canvasPosY = event.clientY - rect.top;

  mousePosX = canvasPosX;// * ratioToColorspaceResolutionX;
  mousePosY = canvasPosY;// * ratioToColorspaceResolutionY;

  mapping_Translation_X = 0;
  mapping_Translation_Y = 0;

  if(mapping_dorotation){
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

      metricInt_GraphGroup.quaternion.multiplyQuaternions(rotationQuaternion, metricInt_GraphGroup.quaternion);
  }

  if(mapping_doTranslation){
    mapping_Translation_X = (mousePosX-oldXPos)/rect.width * Math.abs(metricInt_Graph_camera.position.z);
    mapping_Translation_Y = (oldYPos-mousePosY)/rect.height * Math.abs(metricInt_Graph_camera.position.z);
    oldXPos=mousePosX;
    oldYPos=mousePosY;
  }

}

function event_MetricInt_Graph_mousewheel(event){

  if(event.deltaY>0){

    var newRadius=metricInt_Graph_camera.position.z-5;

    if(newRadius<=-500) // lab is from -128 till 128, lab is displayed grom -127.5 till 127.5
    return;

  	metricInt_Graph_camera.position.z = newRadius;
    return;
  }

  if(event.deltaY<0){
    var newRadius=metricInt_Graph_camera.position.z+5;

    if(newRadius>=1000)
    return;

    metricInt_Graph_camera.position.z = newRadius;
    return;
  }

}
