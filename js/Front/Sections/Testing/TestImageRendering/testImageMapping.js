function drawTestField(field, doStatusbar){

  var status = 0;

  if(doStatusbar)
    document.getElementById("id_Test_StatusBar").style.width = status+"%";

  var geometry = new THREE.Geometry(); //
  var geometryGrey = new THREE.Geometry(); //

  if(do3DTestField && !field.getCellValues()){
    geometry.vertices = field.getTHREEPointArray3D(scalefactor3DTest);
    geometryGrey.vertices = field.getTHREEPointArray3D(scalefactor3DTest);
  }
  else{
    geometry.vertices = field.getTHREEPointArray();
      geometryGrey.vertices = field.getTHREEPointArray();
  }


  var rgbString ="rgb(0,0,0)"

    //// create faces
    var numFaces = (field.getXDim()-1)*(field.getYDim()-1)*2;
    var faceArray = new Array(numFaces).fill(undefined);//[];
    var faceArrayGrey = new Array(numFaces).fill(undefined);

    if(field.getCellValues()){
      for (var y = 1; y < field.getYDim(); y++) {

        if(doStatusbar){
          status= (y-1)/(field.getYDim())*90;
          document.getElementById("id_Test_StatusBar").style.width = status+"%";
        }
        for (var x = 1; x < field.getXDim(); x++) {

          var currentIndex = y* field.getXDim() +x;
          var preIndex = currentIndex-1;
          var currentIndexLastLoop = (y-1)*field.getXDim() +x;
          var preIndexLastLoop = currentIndexLastLoop-1;

          var faceID1 = ((y-1)*(field.getXDim()-1)+(x-1))*2;
          var faceID2 = faceID1+1;

          var tmpColorString = field.getFieldColor(x-1,y-1).getRGBString();
          faceArray[faceID1] = new THREE.Face3(preIndexLastLoop, currentIndex, preIndex );
          faceArray[faceID1].vertexColors[0] = new THREE.Color(tmpColorString);
          faceArray[faceID1].vertexColors[1] = new THREE.Color(tmpColorString);
          faceArray[faceID1].vertexColors[2] = new THREE.Color(tmpColorString);

          faceArray[faceID2] = new THREE.Face3(preIndexLastLoop, currentIndexLastLoop, currentIndex);
          faceArray[faceID2].vertexColors[0] = new THREE.Color(tmpColorString);
          faceArray[faceID2].vertexColors[1] = new THREE.Color(tmpColorString);
          faceArray[faceID2].vertexColors[2] = new THREE.Color(tmpColorString);

          var tmpColorString = field.getFieldGreyColor(x-1,y-1).getRGBString();
          faceArrayGrey[faceID1] = new THREE.Face3(preIndexLastLoop, currentIndex, preIndex );
          faceArrayGrey[faceID1].vertexColors[0] = new THREE.Color(tmpColorString);
          faceArrayGrey[faceID1].vertexColors[1] = new THREE.Color(tmpColorString);
          faceArrayGrey[faceID1].vertexColors[2] = new THREE.Color(tmpColorString);

          faceArrayGrey[faceID2] = new THREE.Face3(preIndexLastLoop, currentIndexLastLoop, currentIndex);
          faceArrayGrey[faceID2].vertexColors[0] = new THREE.Color(tmpColorString);
          faceArrayGrey[faceID2].vertexColors[1] = new THREE.Color(tmpColorString);
          faceArrayGrey[faceID2].vertexColors[2] = new THREE.Color(tmpColorString);


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

          faceArrayGrey[faceID1] = new THREE.Face3(preIndexLastLoop, currentIndex, preIndex );
          faceArrayGrey[faceID1].vertexColors[0] = new THREE.Color(field.getFieldGreyColor(x-1,y-1).getRGBString());
          faceArrayGrey[faceID1].vertexColors[1] = new THREE.Color(field.getFieldGreyColor(x,y).getRGBString());
          faceArrayGrey[faceID1].vertexColors[2] = new THREE.Color(field.getFieldGreyColor(x-1,y).getRGBString());

          faceArrayGrey[faceID2] = new THREE.Face3(preIndexLastLoop, currentIndexLastLoop, currentIndex);
          faceArrayGrey[faceID2].vertexColors[0] = new THREE.Color(field.getFieldGreyColor(x-1,y-1).getRGBString());
          faceArrayGrey[faceID2].vertexColors[1] = new THREE.Color(field.getFieldGreyColor(x,y-1).getRGBString());
          faceArrayGrey[faceID2].vertexColors[2] = new THREE.Color(field.getFieldGreyColor(x,y).getRGBString());


        }
      }
    }

    geometry.faces = faceArray;
    geometryGrey.faces = faceArrayGrey;

    geometry.computeBoundingBox();

    //geometry.computeFaceNormals();

    var largestDis = Math.hypot(geometry.boundingBox.size().x,geometry.boundingBox.size().y,geometry.boundingBox.size().z); //,geometry.boundingBox.size().z);

    var center = geometry.boundingBox.getCenter()

    mapping_transferBorderX = geometry.boundingBox.size().x*2;
    mapping_transferBorderY = geometry.boundingBox.size().y*2;

    mapping_maxRadius = largestDis*2;
    mapping_zoomFactor = mapping_maxRadius / 50;

    /*if(testmapping_camera.position.z>mapping_maxRadius || testmapping_camera.position.z<mapping_minRadius)
     testmapping_camera.position.z = largestDis;*/

    /*testmapping_camera.near = largestDis*0.000000001;
    testmapping_camera.far = mapping_maxRadius*2;
    testmapping_camera.updateProjectionMatrix();*/

    testmapping_camera.position.x = geometry.boundingBox.size().x;
    testmapping_camera.position.y = geometry.boundingBox.size().y;
    testmapping_camera.position.z = 0; //0//-1*center.z;*/

    /*testmapping_cameraGrey.near = largestDis*0.000000001;
    testmapping_cameraGrey.far = mapping_maxRadius*2;
    testmapping_cameraGrey.updateProjectionMatrix();*/

    testmapping_cameraGrey.position.x = geometry.boundingBox.size().x;
    testmapping_cameraGrey.position.y = geometry.boundingBox.size().y;
    testmapping_cameraGrey.position.z = 0; //0//-1*center.z;*/

    var material =
      //new THREE.MeshDepthMaterial( {
      new THREE.MeshLambertMaterial({
              side: THREE.DoubleSide,
              vertexColors: THREE.VertexColors
              //  blending: THREE.NoBlending,
              //depthTest: true,
              //depthWrite:true,
              // depthFunc : THREE.NeverDepth
              // depthFunc : THREE.AlwaysDepth
              // depthFunc : THREE.LessDepth
              // depthFunc : THREE.LessEqualDepth
              // depthFunc : THREE.GreaterEqualDepth
              // depthFunc : THREE.GreaterDepth
              // depthFunc : THREE.NotEqualDepth
              //wireframe: true
            } );

    testmappingMesh = new THREE.Mesh(geometry, material);
    testmappingMesh.position.x = -1*center.x;
    testmappingMesh.position.y = -1*center.y;
    testmappingMesh.position.z = 0; //-1*center.z;*/

    testmappingMeshGrey = new THREE.Mesh(geometryGrey, material);
    testmappingMeshGrey.position.x = -1*center.x;
    testmappingMeshGrey.position.y = -1*center.y;
    testmappingMeshGrey.position.z = 0; //-1*center.z;*/


    //// update arrow


    for (var i = testMappingGroup.children.length - 1; i >= 0; i--) {
      testMappingGroup.remove(testMappingGroup.children[i]);
    }
    testMappingGroup.add(testmappingMesh);

    testMappingGroup.position.x = geometry.boundingBox.size().x; //0;
    testMappingGroup.position.y = geometry.boundingBox.size().y; //0;
    testMappingGroup.position.z = largestDis*2; //0;

    for (var i = testMappingGroupGrey.children.length - 1; i >= 0; i--) {
      testMappingGroupGrey.remove(testMappingGroupGrey.children[i]);
    }
    testMappingGroupGrey.add(testmappingMeshGrey);

    testMappingGroupGrey.position.x = geometry.boundingBox.size().x; //0;
    testMappingGroupGrey.position.y = geometry.boundingBox.size().y; //0;
    testMappingGroupGrey.position.z = largestDis*2; //0;

    testmapping_camera.lookAt(testMappingGroup.position);
    testmapping_cameraGrey.lookAt(testMappingGroupGrey.position);




    if(do3DTestField && !field.getCellValues() && testing_DrawBoundingBox){

      var linesGeometry = new THREE.BufferGeometry();
      var linesMaterial = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth: 2 } );

      var indices = [];
    	var positions = [];
    	var colors = [];

      var startPosX = center.x-(geometry.boundingBox.size().x/2);
      var startPosY = center.y-(geometry.boundingBox.size().y/2);
      var startPosZ = center.z-(geometry.boundingBox.size().z/2);

      var endPosX = center.x+(geometry.boundingBox.size().x/2);
      var endPosY = center.y+(geometry.boundingBox.size().y/2);
      var endPosZ = center.z+(geometry.boundingBox.size().z/2);

      positions.push( startPosX, startPosY, startPosZ );
      positions.push( endPosX, startPosY, startPosZ );
      positions.push( endPosX, endPosY, startPosZ );
      positions.push( startPosX, endPosY, startPosZ );

      positions.push( startPosX, startPosY, endPosZ );
      positions.push( endPosX, startPosY, endPosZ );
      positions.push( endPosX, endPosY, endPosZ );
      positions.push( startPosX, endPosY, endPosZ );

      colors.push( 0,0,0 );
      colors.push( 0,0,0 );
      colors.push( 0,0,0 );
      colors.push( 0,0,0 );
      colors.push( 1,1,1 );
      colors.push( 1,1,1 );
      colors.push( 1,1,1 );
      colors.push( 1,1,1 );


      indices=[
        0,1, 1,2, 2,3, 3,0, // bottom rect
        4,5, 5,6, 6,7, 7,4, // top rect
        0,4, 1,5, 2,6, 3,7
      ];

      linesGeometry.setIndex( indices );
    	linesGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    	linesGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    	linesGeometry.computeBoundingSphere();

            var linesMesh = new THREE.LineSegments( linesGeometry, linesMaterial );
    				linesMesh.position.x = 0;
    				linesMesh.position.y = 0;
            linesMesh.position.z = 0;

            linesMesh.position.x = -1*center.x;
            linesMesh.position.y = -1*center.y;
            linesMesh.position.z = 0;

            testMappingGroup.add(linesMesh);

            var linesMeshGrey = new THREE.LineSegments( linesGeometry, linesMaterial );
    				linesMeshGrey.position.x = 0;
    				linesMeshGrey.position.y = 0;
            linesMeshGrey.position.z = 0;

            linesMeshGrey.position.x = -1*center.x;
            linesMeshGrey.position.y = -1*center.y;
            linesMeshGrey.position.z = 0;

            testMappingGroupGrey.add(linesMeshGrey);
    }




  if(testing_DrawAxes){
      var orginX = center.x-(geometry.boundingBox.size().x/2);
      var orginY = center.y-(geometry.boundingBox.size().y/2);
      var orginZ = center.z-(geometry.boundingBox.size().z/2);

      var lengthX = geometry.boundingBox.size().x*1.2;
      var lengthY = geometry.boundingBox.size().y*1.2;
      var lengthZ = geometry.boundingBox.size().z*1.2;

      if(testing_DrawBoundingBox && do3DTestField && !field.getCellValues()){
        orginX = center.x+(geometry.boundingBox.size().x/2);
        orginY = center.y+(geometry.boundingBox.size().y/2);
        orginZ = center.z+(geometry.boundingBox.size().z/2);

        lengthX = geometry.boundingBox.size().x*0.2;
        lengthY = geometry.boundingBox.size().y*0.2;
        lengthZ = geometry.boundingBox.size().z*0.2;
      }

      var length = Math.max(lengthX,lengthY,lengthZ);
      var direction = new THREE.Vector3( 1, 0, 0 );
      var arrowXAxis = new THREE.ArrowHelper(direction, orginX, length, 0x0000ff );
      arrowXAxis.position.x = -1*center.x+orginX;
      arrowXAxis.position.y = -1*center.y;
      arrowXAxis.position.z = 0;
      testMappingGroup.add( arrowXAxis );
      var arrowXAxisGrey = new THREE.ArrowHelper(direction, orginX, length, 0x0000ff );
      arrowXAxisGrey.position.x = -1*center.x+orginX;
      arrowXAxisGrey.position.y = -1*center.y;
      arrowXAxisGrey.position.z = 0;
      testMappingGroupGrey.add( arrowXAxisGrey );


      direction = new THREE.Vector3( 0, 1, 0 );
      var arrowYAxis = new THREE.ArrowHelper(direction, orginY, length, 0xff0000 );
      arrowYAxis.position.x = -1*center.x;
      arrowYAxis.position.y = -1*center.y+orginY;
      arrowYAxis.position.z = 0;
      testMappingGroup.add( arrowYAxis );
      var arrowYAxisGrey = new THREE.ArrowHelper(direction, orginY, length, 0xff0000 );
      arrowYAxisGrey.position.x = -1*center.x;
      arrowYAxisGrey.position.y = -1*center.y+orginY;
      arrowYAxisGrey.position.z = 0;
      testMappingGroupGrey.add( arrowYAxisGrey );
    if(do3DTestField && !field.getCellValues()){
      direction = new THREE.Vector3( 0, 0, 1 );
      var arrowZAxis = new THREE.ArrowHelper(direction, orginZ, length, 0x00ff00 );
      arrowZAxis.position.x = -1*center.x;
      arrowZAxis.position.y = -1*center.y;
      arrowZAxis.position.z = orginZ;
      testMappingGroup.add( arrowZAxis );
      var arrowZAxisGrey = new THREE.ArrowHelper(direction, orginZ, length, 0x00ff00 );
      arrowZAxisGrey.position.x = -1*center.x;
      arrowZAxisGrey.position.y = -1*center.y;
      arrowZAxisGrey.position.z = orginZ;
      testMappingGroupGrey.add( arrowZAxisGrey );
    }
  }

  if(doStatusbar)
    document.getElementById("id_Test_StatusBar").style.width = "100%";


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
