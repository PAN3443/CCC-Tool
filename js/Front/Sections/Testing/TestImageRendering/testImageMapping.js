function drawTestField(field){

  var geometry = new THREE.Geometry();

  if(do3DTestField && !field.getCellValues())
  geometry.vertices = field.getTHREEPointArray3D(scalefactor3DTest);
  else
  geometry.vertices = field.getTHREEPointArray();

  var rgbString ="rgb(0,0,0)"

    //// create faces
    var numFaces = (field.getXDim()-1)*(field.getYDim()-1)*2;
    var faceArray = new Array(numFaces).fill(undefined)//[];

    if(field.getCellValues()){
      for (var y = 1; y < field.getYDim(); y++) {
        for (var x = 1; x < field.getXDim(); x++) {

          var currentIndex = y* field.getXDim() +x;
          var preIndex = currentIndex-1;
          var currentIndexLastLoop = (y-1)*field.getXDim() +x;
          var preIndexLastLoop = currentIndexLastLoop-1;

          var faceID1 = ((y-1)*(field.getXDim()-1)+(x-1))*2;
          var faceID2 = faceID1+1;

          var tmpColorString = field.getFieldColor(x-1,y-1).getRGBString();
          faceArray[faceID1] = new THREE.Face3(preIndexLastLoop, currentIndex, preIndex );
          //faceArray.push(new THREE.Face3(preIndexLastLoop, currentIndex, preIndex ));

          faceArray[faceID1].vertexColors[0] = new THREE.Color(tmpColorString);
          faceArray[faceID1].vertexColors[1] = new THREE.Color(tmpColorString);
          faceArray[faceID1].vertexColors[2] = new THREE.Color(tmpColorString);



          faceArray[faceID2] = new THREE.Face3(preIndexLastLoop, currentIndexLastLoop, currentIndex);
          //faceArray.push(new THREE.Face3(preIndexLastLoop, currentIndexLastLoop, currentIndex));

          faceArray[faceID2].vertexColors[0] = new THREE.Color(tmpColorString);
          faceArray[faceID2].vertexColors[1] = new THREE.Color(tmpColorString);
          faceArray[faceID2].vertexColors[2] = new THREE.Color(tmpColorString);


        }
      }
    }
    else{
      for (var y = 1; y < field.getYDim(); y++) {

        for (var x = 1; x < field.getXDim(); x++) {

          var currentIndex = y* field.getXDim() +x;
          var preIndex = currentIndex-1;
          var currentIndexLastLoop = (y-1)*field.getXDim() +x;
          var preIndexLastLoop = currentIndexLastLoop-1;

          var faceID1 = ((y-1)*(field.getXDim()-1)+(x-1))*2;
          var faceID2 = faceID1+1;

          faceArray[faceID1] = new THREE.Face3(preIndexLastLoop, currentIndex, preIndex );

          faceArray[faceID1].vertexColors[0] = new THREE.Color(field.getFieldColor(x-1,y-1).getRGBString());
          faceArray[faceID1].vertexColors[1] = new THREE.Color(field.getFieldColor(x,y).getRGBString());
          faceArray[faceID1].vertexColors[2] = new THREE.Color(field.getFieldColor(x-1,y).getRGBString());


          faceArray[faceID2] = new THREE.Face3(preIndexLastLoop, currentIndexLastLoop, currentIndex);

          faceArray[faceID2].vertexColors[0] = new THREE.Color(field.getFieldColor(x-1,y-1).getRGBString());
          faceArray[faceID2].vertexColors[1] = new THREE.Color(field.getFieldColor(x,y-1).getRGBString());
          faceArray[faceID2].vertexColors[2] = new THREE.Color(field.getFieldColor(x,y).getRGBString());


        }
      }
    }

    geometry.faces = faceArray;

    geometry.computeBoundingBox();
    geometry.computeFaceNormals();

    var largestDis = Math.hypot(geometry.boundingBox.size().x,geometry.boundingBox.size().y); //,geometry.boundingBox.size().z);

    var center = geometry.boundingBox.getCenter()

    mapping_minRadius = largestDis*0.000000001;
    mapping_maxRadius = largestDis*2;
    mapping_zoomFactor = largestDis / 50;

    if(testmapping_camera.position.z>mapping_maxRadius || testmapping_camera.position.z<mapping_minRadius)
    testmapping_camera.position.z = largestDis;

    testmapping_camera.near = mapping_minRadius/2;
    testmapping_camera.far = mapping_maxRadius*2;
    testmapping_camera.updateProjectionMatrix();

    var material =
      //new THREE.MeshDepthMaterial( {
      new THREE.MeshLambertMaterial({
              side: THREE.DoubleSide,
              transparent: false,
              vertexColors: THREE.VertexColors,
              blending: THREE.NoBlending,
              depthTest: true,
              depthWrite:true,
              // depthFunc : THREE.NeverDepth
              //depthFunc : THREE.AlwaysDepth
              // depthFunc : THREE.LessDepth
              depthFunc : THREE.LessEqualDepth
              // depthFunc : THREE.GreaterEqualDepth
              // depthFunc : THREE.GreaterDepth
              // depthFunc : THREE.NotEqualDepth
              //wireframe: true
            } );

    testmappingMesh = new THREE.Mesh(geometry, material);

    testmappingMesh.position.x = -1*center.x;
    testmappingMesh.position.y = -1*center.y;
    //testmappingMesh.position.z = -1*center.z;
    testmappingMesh.position.z = 0;

    //// update arrow

    for (var i = testMappingGroup.children.length - 1; i >= 0; i--) {
      testMappingGroup.remove(testMappingGroup.children[i]);
    }

    testMappingGroup.add(testmappingMesh);

    testMappingGroup.position.x = 0;
    testMappingGroup.position.y = 0;

    /*if(do3DTestField && !field.getCellValues()){
      var from = new THREE.Vector3( 0, 0, 0 );
      var to = new THREE.Vector3( geometry.boundingBox.size().x, 0, 0 );
      var direction = to.clone().sub(from);
      var length = direction.length();
      var arrowXAxis = new THREE.ArrowHelper(direction.normalize(), from, length, 0x0000ff );
      if(document.getElementById('id_EditPage_Mapping_ShowAxis').checked==false)
        arrowXAxis.visible=false;
      testMappingGroup.add( arrowXAxis );

      to = new THREE.Vector3( 0, geometry.boundingBox.size().y,  0 );
      direction = to.clone().sub(from);
      length = direction.length();
      var arrowYAxis = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000 );
      if(document.getElementById('id_EditPage_Mapping_ShowAxis').checked==false)
        arrowYAxis.visible=false;
      testMappingGroup.add( arrowYAxis );

      to = new THREE.Vector3( 0, 0, geometry.boundingBox.size().z );
      direction = to.clone().sub(from);
      length = direction.length();
      var arrowZAxis = new THREE.ArrowHelper(direction.normalize(), from, length, 0x00ff00 );
      if(document.getElementById('id_EditPage_Mapping_ShowAxis').checked==false)
        arrowZAxis.visible=false;
      testMappingGroup.add( arrowZAxis );
    }*/



  /*********************************************
  ***** OLD draw Function
  **********************************************/

  /*var canvasPlot = document.getElementById(canvasID);
  var canvasCtx = canvasPlot.getContext("2d");


  if(field==undefined){
    canvasCtx.clearRect(0, 0, canvasPlot.width, canvasPlot.height);
    return;
  }

  var pixelsPerXStep = Math.floor(testingFieldResolution/field.getXDim());
  var pixelsPerYStep = Math.floor(testingFieldResolution/field.getYDim());

  var imageDIMX = field.getXDim()*pixelsPerXStep;
  var imageDIMY = field.getYDim()*pixelsPerXStep;

  canvasPlot.width = imageDIMX;
  canvasPlot.height = imageDIMY;

   canvasCtx.mozImageSmoothingEnabled = false;
   canvasCtx.webkitImageSmoothingEnabled = false;
   canvasCtx.msImageSmoothingEnabled = false;
   canvasCtx.imageSmoothingEnabled = false; // did not work !?!?!
   canvasCtx.oImageSmoothingEnabled = false;

  var canvasData = canvasCtx.createImageData(canvasPlot.width, canvasPlot.height); //getImageData(0, 0, canvasPlot.width, canvasPlot.height);


  for(var x=0; x<field.getXDim(); x++){

    for (var subX = 0; subX < pixelsPerXStep; subX++) {

      var currentX = x*pixelsPerXStep+subX;

      for(var y=0; y<field.getYDim(); y++){

          var tmpColor = field.getFieldColor(x,y);

          if(tmpColor==undefined){
            tmpColor = new classColor_RGB(0,0,1);
          }

          for (var subY = 0; subY < pixelsPerYStep; subY++) {

            var currentY = y*pixelsPerYStep+subY;

            var index = (currentX + currentY * canvasPlot.width) * 4;
            canvasData.data[index + 0] = Math.round(tmpColor.getRValue() * 255); // r
            canvasData.data[index + 1] = Math.round(tmpColor.getGValue() * 255); // g
            canvasData.data[index + 2] = Math.round(tmpColor.getBValue() * 255); // b
            canvasData.data[index + 3] = 255; //a

          }

      }

    }

  }

  canvasCtx.putImageData(canvasData, 0, 0);*/

}


function changeScaleFactor(){
  var value = document.getElementById("id_Test_ScaleFactor").value;

  if(isNaN(value) || value== undefined){
    openAlert("Invalid input for the scale factor.")
    document.getElementById("id_Test_ScaleFactor").value = 1.0;
    return;
  }

  if(value<=0){
    openAlert("Invalid input for the scale factor. The input has to be positive!")
    document.getElementById("id_Test_ScaleFactor").value = 1.0;
    return;
  }

  scalefactor3DTest=value;

  if(userTestGlobalField!=undefined)
  drawTestField(userTestGlobalField);
}
