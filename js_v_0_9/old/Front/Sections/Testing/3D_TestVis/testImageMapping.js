


function drawTransfered_Mesh(meshData){

  testMeshBoundingBox = undefined;
  testMeshCenter = undefined;

  if(meshData[0] && meshData[1]){
      // 3D Cell Values
      testmappingMesh = new THREE.Group();
      testmappingMeshGrey = new THREE.Group();

      for (var i = 0; i < meshData[2].length; i++) {

        var geometry = undefined;
        var geometryGrey = undefined;

        if (meshData[2][i][2] == 0) {
          geometry = new THREE.PlaneGeometry(meshData[2][i][0], meshData[2][i][1], 1, 1);
          geometryGrey = new THREE.PlaneGeometry(meshData[2][i][0], meshData[2][i][1], 1, 1);
        } else {
          geometry = new THREE.BoxBufferGeometry(meshData[2][i][0], meshData[2][i][1], meshData[2][i][2]);
          geometryGrey = new THREE.BoxBufferGeometry(meshData[2][i][0], meshData[2][i][1], meshData[2][i][2]);
        }

        var material = new THREE.MeshLambertMaterial({
          side: THREE.DoubleSide
        });
        material.color.set(new THREE.Color(meshData[2][i][6],meshData[2][i][7],meshData[2][i][8]));
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = meshData[2][i][3];
        mesh.position.y = meshData[2][i][4];
        mesh.position.z = meshData[2][i][5];
        testmappingMesh.add(mesh);

        var materialGrey = new THREE.MeshLambertMaterial({
          side: THREE.DoubleSide
        });
        materialGrey.color.set(new THREE.Color(meshData[2][i][9],meshData[2][i][9],meshData[2][i][9]));
        var meshGrey = new THREE.Mesh(geometryGrey, materialGrey);
        meshGrey.position.x = meshData[2][i][3];
        meshGrey.position.y = meshData[2][i][4];
        meshGrey.position.z = meshData[2][i][5];
        testmappingMeshGrey.add(meshGrey);

      }

      testMeshBoundingBox = new THREE.Box3().setFromObject(testmappingMesh);
      testMeshCenter = testMeshBoundingBox.getCenter();
  }
  else {

    var geometry = new THREE.Geometry(); //
    var geometryGrey = new THREE.Geometry(); //

    geometry.vertices = meshData[2];
    geometryGrey.vertices = meshData[2];

    var faceArray = new Array(meshData[3].length).fill(undefined); //[];
    var faceArrayGrey = new Array(meshData[3].length).fill(undefined);

    if(meshData[0]){
      // 2D Cell Values
      for (var i = 0; i < meshData[3].length; i++) {

        faceArray[i] = new THREE.Face3(meshData[3][i][0],meshData[3][i][1],meshData[3][i][2]);
        faceArray[i].vertexColors[0] = new THREE.Color(meshData[3][i][3],meshData[3][i][4],meshData[3][i][5]);
        faceArray[i].vertexColors[1] = new THREE.Color(meshData[3][i][3],meshData[3][i][4],meshData[3][i][5]);
        faceArray[i].vertexColors[2] = new THREE.Color(meshData[3][i][3],meshData[3][i][4],meshData[3][i][5]);

        faceArrayGrey[i] = new THREE.Face3(meshData[3][i][0],meshData[3][i][1],meshData[3][i][2]);
        faceArrayGrey[i].vertexColors[0] = new THREE.Color(meshData[3][i][6],meshData[3][i][6],meshData[3][i][6]);
        faceArrayGrey[i].vertexColors[1] = new THREE.Color(meshData[3][i][6],meshData[3][i][6],meshData[3][i][6]);
        faceArrayGrey[i].vertexColors[2] = new THREE.Color(meshData[3][i][6],meshData[3][i][6],meshData[3][i][6]);
      }
    }
    else{
      // Point Values
      for (var i = 0; i < meshData[3].length; i++) {
        faceArray[i] = new THREE.Face3(meshData[3][i][0],meshData[3][i][1],meshData[3][i][2]);
        faceArray[i].vertexColors[0] = new THREE.Color(meshData[3][i][3][0],meshData[3][i][3][1],meshData[3][i][3][2]);
        faceArray[i].vertexColors[1] = new THREE.Color(meshData[3][i][4][0],meshData[3][i][4][1],meshData[3][i][4][2]);
        faceArray[i].vertexColors[2] = new THREE.Color(meshData[3][i][5][0],meshData[3][i][5][1],meshData[3][i][5][2]);

        faceArrayGrey[i] = new THREE.Face3(meshData[3][i][0],meshData[3][i][1],meshData[3][i][2]);
        faceArrayGrey[i].vertexColors[0] = new THREE.Color(meshData[3][i][3][3],meshData[3][i][3][3],meshData[3][i][3][3]);
        faceArrayGrey[i].vertexColors[1] = new THREE.Color(meshData[3][i][4][3],meshData[3][i][4][3],meshData[3][i][4][3]);
        faceArrayGrey[i].vertexColors[2] = new THREE.Color(meshData[3][i][5][3],meshData[3][i][5][3],meshData[3][i][5][3]);
      }

    }

    geometry.faces = faceArray;
    geometryGrey.faces = faceArrayGrey;
    geometry.computeBoundingBox();

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
      });

    testmappingMesh = new THREE.Mesh(geometry, material);
    testmappingMeshGrey = new THREE.Mesh(geometryGrey, material);

    testMeshBoundingBox = geometry.boundingBox;
    testMeshCenter = testMeshBoundingBox.getCenter();

  }

  testmappingMesh.position.x = -1 * testMeshCenter.x;
  testmappingMesh.position.y = -1 * testMeshCenter.y;
  testmappingMesh.position.z = 0; //-1*testMeshCenter.z;*/

  testmappingMeshGrey.position.x = -1 * testMeshCenter.x;
  testmappingMeshGrey.position.y = -1 * testMeshCenter.y;
  testmappingMeshGrey.position.z = 0; //-1*testMeshCenter.z;*/

  var largestDis = undefined;

  if (do3DTestField)
    largestDis = Math.hypot(testMeshBoundingBox.getSize().x, testMeshBoundingBox.getSize().y, testMeshBoundingBox.getSize().z); //,testMeshBoundingBox.getSize().z);
  else
    largestDis = Math.max(testMeshBoundingBox.getSize().x, testMeshBoundingBox.getSize().y);

  mapping_transferBorderX = testMeshBoundingBox.getSize().x * 2;
  mapping_transferBorderY = testMeshBoundingBox.getSize().y * 2;

  mapping_maxRadius = largestDis * 2;
  mapping_zoomFactor = mapping_maxRadius / 50;

  ///*

  testmapping_camera.near = largestDis * 0.001;
  testmapping_camera.far = 2 * mapping_maxRadius;
  testmapping_camera.updateProjectionMatrix();

  testmapping_cameraGrey.near = largestDis * 0.001;
  testmapping_cameraGrey.far = 2 * mapping_maxRadius;
  testmapping_cameraGrey.updateProjectionMatrix();

  //*/
  testmapping_camera.position.x = testMeshBoundingBox.getSize().x;
  testmapping_camera.position.y = testMeshBoundingBox.getSize().y;
  //testmapping_camera.position.z = 0; //0//-1*testMeshCenter.z;*/

  testmapping_cameraGrey.position.x = testMeshBoundingBox.getSize().x;
  testmapping_cameraGrey.position.y = testMeshBoundingBox.getSize().y;
  //testmapping_cameraGrey.position.z = 0; //0//-1*testMeshCenter.z;*/

  //if(testmapping_camera.position.z>mapping_maxRadius || testmapping_camera.position.z<mapping_minRadius){
  testmapping_camera.position.z = largestDis;
  testmapping_cameraGrey.position.z = largestDis;
  //}

  document.getElementById("id_Test_MeshVisOptions_Zoom").value = 50;


  for (var i = testMappingGroup.children.length - 1; i >= 0; i--) {
    testMappingGroup.remove(testMappingGroup.children[i]);
  }
  testMappingGroup.add(testmappingMesh);

  testMappingGroup.position.x = testMeshBoundingBox.getSize().x; //0;
  testMappingGroup.position.y = testMeshBoundingBox.getSize().y; //0;
  testMappingGroup.position.z = largestDis * 2; //0;

  for (var i = testMappingGroupGrey.children.length - 1; i >= 0; i--) {
    testMappingGroupGrey.remove(testMappingGroupGrey.children[i]);
  }
  testMappingGroupGrey.add(testmappingMeshGrey);

  testMappingGroupGrey.position.x = testMeshBoundingBox.getSize().x; //0;
  testMappingGroupGrey.position.y = testMeshBoundingBox.getSize().y; //0;
  testMappingGroupGrey.position.z = largestDis * 2; //0;

  testmapping_camera.lookAt(testMappingGroup.position);
  testmapping_cameraGrey.lookAt(testMappingGroupGrey.position);

  updateTest_Mesh();

}


function updateTest_Mesh() {

  for (var i = testMappingGroup.children.length - 1; i > 0; i--) {
    testMappingGroup.remove(testMappingGroup.children[i]);
  }

  for (var i = testMappingGroupGrey.children.length - 1; i > 0; i--) {
    testMappingGroupGrey.remove(testMappingGroupGrey.children[i]);
  }

  if (do3DTestField && testing_DrawBoundingBox) {

    var linesGeometry = new THREE.BufferGeometry();
    var linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: THREE.VertexColors,
      linewidth: 2
    });

    var indices = [];
    var positions = [];
    var colors = [];

    var startPosX = testMeshCenter.x - (testMeshBoundingBox.getSize().x / 2);
    var startPosY = testMeshCenter.y - (testMeshBoundingBox.getSize().y / 2);
    var startPosZ = testMeshCenter.z - (testMeshBoundingBox.getSize().z / 2);

    var endPosX = testMeshCenter.x + (testMeshBoundingBox.getSize().x / 2);
    var endPosY = testMeshCenter.y + (testMeshBoundingBox.getSize().y / 2);
    var endPosZ = testMeshCenter.z + (testMeshBoundingBox.getSize().z / 2);

    positions.push(startPosX, startPosY, startPosZ);
    positions.push(endPosX, startPosY, startPosZ);
    positions.push(endPosX, endPosY, startPosZ);
    positions.push(startPosX, endPosY, startPosZ);

    positions.push(startPosX, startPosY, endPosZ);
    positions.push(endPosX, startPosY, endPosZ);
    positions.push(endPosX, endPosY, endPosZ);
    positions.push(startPosX, endPosY, endPosZ);

    colors.push(0, 0, 0);
    colors.push(0, 0, 0);
    colors.push(0, 0, 0);
    colors.push(0, 0, 0);
    colors.push(1, 1, 1);
    colors.push(1, 1, 1);
    colors.push(1, 1, 1);
    colors.push(1, 1, 1);

    indices = [
      0, 1, 1, 2, 2, 3, 3, 0, // bottom rect
      4, 5, 5, 6, 6, 7, 7, 4, // top rect
      0, 4, 1, 5, 2, 6, 3, 7
    ];

    linesGeometry.setIndex(indices);
    linesGeometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    linesGeometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    linesGeometry.computeBoundingSphere();

    var linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    linesMesh.position.x = 0;
    linesMesh.position.y = 0;
    linesMesh.position.z = 0;

    linesMesh.position.x = -1 * testMeshCenter.x;
    linesMesh.position.y = -1 * testMeshCenter.y;
    linesMesh.position.z = 0;

    testMappingGroup.add(linesMesh);

    var linesMeshGrey = new THREE.LineSegments(linesGeometry, linesMaterial);
    linesMeshGrey.position.x = 0;
    linesMeshGrey.position.y = 0;
    linesMeshGrey.position.z = 0;

    linesMeshGrey.position.x = -1 * testMeshCenter.x;
    linesMeshGrey.position.y = -1 * testMeshCenter.y;
    linesMeshGrey.position.z = 0;

    testMappingGroupGrey.add(linesMeshGrey);
  }

  if (testing_DrawAxes) {
    var orginX = testMeshCenter.x - (testMeshBoundingBox.getSize().x / 2);
    var orginY = testMeshCenter.y - (testMeshBoundingBox.getSize().y / 2);
    var orginZ = testMeshCenter.z - (testMeshBoundingBox.getSize().z / 2);

    var lengthX = testMeshBoundingBox.getSize().x * 1.5;
    var lengthY = testMeshBoundingBox.getSize().y * 1.5;
    var lengthZ = testMeshBoundingBox.getSize().z * 1.5;

    if (testing_DrawBoundingBox && do3DTestField) {
      orginX = testMeshCenter.x + (testMeshBoundingBox.getSize().x / 2);
      orginY = testMeshCenter.y + (testMeshBoundingBox.getSize().y / 2);
      orginZ = testMeshCenter.z + (testMeshBoundingBox.getSize().z / 2);

      lengthX = testMeshBoundingBox.getSize().x * 0.2;
      lengthY = testMeshBoundingBox.getSize().y * 0.2;
      lengthZ = testMeshBoundingBox.getSize().z * 0.2;
    }

    var length = Math.max(lengthX, lengthY, lengthZ);
    var direction = new THREE.Vector3(1, 0, 0);
    var arrowXAxis = new THREE.ArrowHelper(direction, orginX, length, 0x0000ff);
    arrowXAxis.position.x = -1 * testMeshCenter.x + orginX;
    arrowXAxis.position.y = -1 * testMeshCenter.y;
    arrowXAxis.position.z = 0;
    testMappingGroup.add(arrowXAxis);
    var arrowXAxisGrey = new THREE.ArrowHelper(direction, orginX, length, 0x0000ff);
    arrowXAxisGrey.position.x = -1 * testMeshCenter.x + orginX;
    arrowXAxisGrey.position.y = -1 * testMeshCenter.y;
    arrowXAxisGrey.position.z = 0;
    testMappingGroupGrey.add(arrowXAxisGrey);

    direction = new THREE.Vector3(0, 1, 0);
    var arrowYAxis = new THREE.ArrowHelper(direction, orginY, length, 0xff0000);
    arrowYAxis.position.x = -1 * testMeshCenter.x;
    arrowYAxis.position.y = -1 * testMeshCenter.y + orginY;
    arrowYAxis.position.z = 0;
    testMappingGroup.add(arrowYAxis);
    var arrowYAxisGrey = new THREE.ArrowHelper(direction, orginY, length, 0xff0000);
    arrowYAxisGrey.position.x = -1 * testMeshCenter.x;
    arrowYAxisGrey.position.y = -1 * testMeshCenter.y + orginY;
    arrowYAxisGrey.position.z = 0;
    testMappingGroupGrey.add(arrowYAxisGrey);
    if (do3DTestField) {
      direction = new THREE.Vector3(0, 0, 1);
      var arrowZAxis = new THREE.ArrowHelper(direction, orginZ, length, 0x00ff00);
      arrowZAxis.position.x = -1 * testMeshCenter.x;
      arrowZAxis.position.y = -1 * testMeshCenter.y;
      arrowZAxis.position.z = orginZ;
      testMappingGroup.add(arrowZAxis);
      var arrowZAxisGrey = new THREE.ArrowHelper(direction, orginZ, length, 0x00ff00);
      arrowZAxisGrey.position.x = -1 * testMeshCenter.x;
      arrowZAxisGrey.position.y = -1 * testMeshCenter.y;
      arrowZAxisGrey.position.z = orginZ;
      testMappingGroupGrey.add(arrowZAxisGrey);
    }
  }

}


function changeScaleFactor() {
  var value = document.getElementById("id_Test_ScaleFactor").value;

  if (isNaN(value) || value == undefined) {
    openAlert("Invalid input for the scale factor.")
    document.getElementById("id_Test_ScaleFactor").value = 1.0;
    return;
  }

  if (value <= 0) {
    openAlert("Invalid input for the scale factor. The input has to be positive!")
    document.getElementById("id_Test_ScaleFactor").value = 1.0;
    return;
  }

  scalefactor3DTest = value;

  inform_Worker_GetVisualisation();

  /*if (userTestGlobalField != undefined)
    drawTestField(userTestGlobalField);*/
}
