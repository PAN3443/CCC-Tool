function drawMapping() {

  if(globalCMS1.getKeyLength()==0)
  return;

  // if worker

  // else

  if (globalDomain.getNumberOfCells() == 0) {
    console.log("Error there are no generated cells.");
    return;
  }

  var type = globalDomain.getCell(0).getCellType();

  switch (type) {
    case 1: // 1. Rectangle

      /// new version

      var geometry = new THREE.Geometry();
      geometry.vertices = globalDomain.getPointArray();
      var facesArray = new Array(globalDomain.getNumberOfCells()*2);
      var pointValues = true;

      if (globalDomain.getCell(0).getIndicesLength() != 4) {
        console.log("Error");
        return;
      }

      if (globalDomain.getCell(0).getCellValueSize() == 1) {
        pointValues=false;
      }



      for (var index = 0; index < globalDomain.getNumberOfCells(); index++) {

        var value;
        if(pointValues){
          value = (globalDomain.getCell(index).getCellValue(0)+
                  globalDomain.getCell(index).getCellValue(1)+
                  globalDomain.getCell(index).getCellValue(2)+
                  globalDomain.getCell(index).getCellValue(3))/4;
        }
        else
          value= globalDomain.getCell(index).getCellValue(0);

        var toolColor = globalCMS1.calculateColor(globalDomain.getCell(index).getCellValue(0), colorspaceModus);

        facesArray[index * 2 + 0] = new THREE.Face3( globalDomain.getCell(index).getCellIndex(0), globalDomain.getCell(index).getCellIndex(1),globalDomain.getCell(index).getCellIndex(2));
        facesArray[index * 2 + 0].color.setRGB( toolColor.getRValue(),toolColor.getGValue(),toolColor.getBValue());
        facesArray[index * 2 + 1] = new THREE.Face3( globalDomain.getCell(index).getCellIndex(0), globalDomain.getCell(index).getCellIndex(2),globalDomain.getCell(index).getCellIndex(3));
        facesArray[index * 2 + 1].color.setRGB( toolColor.getRValue(),toolColor.getGValue(),toolColor.getBValue());

      }

      geometry.faces=facesArray;

      /*geometry.computeFaceNormals();
      geometry.computeVertexNormals();*/
      geometry.computeBoundingBox ();

      var largestDis = Math.hypot(geometry.boundingBox.size().x,geometry.boundingBox.size().y,geometry.boundingBox.size().z);
      mapping_maxRadius = largestDis;
      mapping_zoomFactor = largestDis / 100;

      mapping_camera.far = largestDis*2;
      mapping_camera.updateProjectionMatrix();

      var material = new THREE.MeshLambertMaterial( {
    						side: THREE.DoubleSide,
    						color: 0xF5F5F5,
                vertexColors: THREE.FaceColors
    						//vertexColors: THREE.VertexColors
    					} );

      material.transparent = true;
      material.blending = THREE["NoBlending"];

      mappingMesh = new THREE.Mesh(geometry, material);

      mapping_scene.add(mappingMesh);


      //// update arrow

      /*for (var i = coordinateArrowsGroup.children.length - 1; i >= 0; i--) {
        coordinateArrowsGroup.remove(coordinateArrowsGroup.children[i]);
      }

      var from = new THREE.Vector3( 0, 0, 0 );
      var to = new THREE.Vector3( largestDis, 0, 0 );
      var direction = to.clone().sub(from);
      var length = direction.length();
      var arrowXCoord = new THREE.ArrowHelper(direction.normalize(), from, length, 0x0000ff );
      coordinateArrowsGroup.add( arrowXCoord );

      to = new THREE.Vector3( 0, largestDis,  0 );
      direction = to.clone().sub(from);
      length = direction.length();
      var arrowYCoord = new THREE.ArrowHelper(direction.normalize(), from, length, 0xff0000 );
      coordinateArrowsGroup.add( arrowYCoord );

      to = new THREE.Vector3( 0, 0, largestDis );
      direction = to.clone().sub(from);
      length = direction.length();
      var arrowZCoord = new THREE.ArrowHelper(direction.normalize(), from, length, 0x00ff00 );
      coordinateArrowsGroup.add( arrowZCoord );*/

      break;
    case 2: // 2. Triangle
      /*for (var i = 0; i < globalDomain.getNumberOfCells(); i++) {


      }*/
      break;
    case 3: //  3. Hexahedron
      /*for (var i = 0; i < globalDomain.getNumberOfCells(); i++) {


      }*/
      break;
    default:

  }




}


function updateMesh() {

  if(globalDomain==undefined || mappingMesh==undefined)
  return;

  var pointValues = true;

  if (globalDomain.getCell(0).getIndicesLength() != 4) {
    console.log("Error");
    return;
  }

  if (globalDomain.getCell(0).getCellValueSize() == 1) {
    pointValues=false;
  }


  for (var index = 0; index < globalDomain.getNumberOfCells(); index++) {

    var value;
    if(pointValues){
      value = (globalDomain.getCell(index).getCellValue(0)+
              globalDomain.getCell(index).getCellValue(1)+
              globalDomain.getCell(index).getCellValue(2)+
              globalDomain.getCell(index).getCellValue(3))/4;
    }
    else
      value= globalDomain.getCell(index).getCellValue(0);

    var toolColor = globalCMS1.calculateColor(globalDomain.getCell(index).getCellValue(0), colorspaceModus);

    mappingMesh.geometry.faces[index * 2 + 0].color.setRGB( toolColor.getRValue(),toolColor.getGValue(),toolColor.getBValue());
    mappingMesh.geometry.faces[index * 2 + 1].color.setRGB( toolColor.getRValue(),toolColor.getGValue(),toolColor.getBValue());

  }

  mappingMesh.geometry.verticesNeedUpdate = true;
  mappingMesh.geometry.colorsNeedUpdate = true;


}
