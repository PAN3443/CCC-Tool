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


      mapping_MaterialPositions = new Float32Array(globalDomain.getNumberOfCells() * 3 * 6);
      // mapping_Materialmapping_MaterialNormals = new Float32Array( globalDomain.getNumberOfCells() * 3 * 6 );
      mapping_MaterialColors = new Float32Array(globalDomain.getNumberOfCells() * 3 * 6);

      var time1 = new Date().getTime();

      var max = 0;
      var pointValues = true;

      if (globalDomain.getCell(0).getPointLength() != 4) {
        console.log("Error");
        return;
      }

      if (globalDomain.getCell(0).getCellValueSize() == 1) {
        pointValues=false;
      }
      
      for (var index = 0; index < globalDomain.getNumberOfCells(); index++) {


        if(pointValues){
          var color1 = globalCMS1.calculateColor(globalDomain.getCell(index).getCellValue(0), colorspaceModus);
          var color2 = globalCMS1.calculateColor(globalDomain.getCell(index).getCellValue(1), colorspaceModus);
          var color3 = globalCMS1.calculateColor(globalDomain.getCell(index).getCellValue(2), colorspaceModus);
          var color4 = globalCMS1.calculateColor(globalDomain.getCell(index).getCellValue(3), colorspaceModus);

          mapping_MaterialColors[index * 18 + 0] = color1.getRValue();
          mapping_MaterialColors[index * 18 + 1] = color1.getGValue();
          mapping_MaterialColors[index * 18 + 2] = color1.getBValue();
          mapping_MaterialColors[index * 18 + 3] = color2.getRValue();
          mapping_MaterialColors[index * 18 + 4] = color2.getGValue();
          mapping_MaterialColors[index * 18 + 5] = color2.getBValue();
          mapping_MaterialColors[index * 18 + 6] = color3.getRValue();
          mapping_MaterialColors[index * 18 + 7] = color3.getGValue();
          mapping_MaterialColors[index * 18 + 8] = color3.getBValue();

          mapping_MaterialColors[index * 18 + 9] = color1.getRValue();
          mapping_MaterialColors[index * 18 + 10] = color1.getGValue();
          mapping_MaterialColors[index * 18 + 11] = color1.getBValue();
          mapping_MaterialColors[index * 18 + 12] = color3.getRValue();
          mapping_MaterialColors[index * 18 + 13] = color3.getGValue();
          mapping_MaterialColors[index * 18 + 14] = color3.getBValue();
          mapping_MaterialColors[index * 18 + 15] = color4.getRValue();
          mapping_MaterialColors[index * 18 + 16] = color4.getGValue();
          mapping_MaterialColors[index * 18 + 17] = color4.getBValue();
        }
        else{
          var color = globalCMS1.calculateColor(globalDomain.getCell(index).getCellValue(0), colorspaceModus);
          mapping_MaterialColors[index * 18 + 0] = color.getRValue();
          mapping_MaterialColors[index * 18 + 1] = color.getGValue();
          mapping_MaterialColors[index * 18 + 2] = color.getBValue();
          mapping_MaterialColors[index * 18 + 3] = color.getRValue();
          mapping_MaterialColors[index * 18 + 4] = color.getGValue();
          mapping_MaterialColors[index * 18 + 5] = color.getBValue();
          mapping_MaterialColors[index * 18 + 6] = color.getRValue();
          mapping_MaterialColors[index * 18 + 7] = color.getGValue();
          mapping_MaterialColors[index * 18 + 8] = color.getBValue();

          mapping_MaterialColors[index * 18 + 9] = color.getRValue();
          mapping_MaterialColors[index * 18 + 10] = color.getGValue();
          mapping_MaterialColors[index * 18 + 11] = color.getBValue();
          mapping_MaterialColors[index * 18 + 12] = color.getRValue();
          mapping_MaterialColors[index * 18 + 13] = color.getGValue();
          mapping_MaterialColors[index * 18 + 14] = color.getBValue();
          mapping_MaterialColors[index * 18 + 15] = color.getRValue();
          mapping_MaterialColors[index * 18 + 16] = color.getGValue();
          mapping_MaterialColors[index * 18 + 17] = color.getBValue();
        }

        /// vertices

        var p1 = globalDomain.getCell(index).getCellPoint(0);
        var p2 = globalDomain.getCell(index).getCellPoint(1);
        var p3 = globalDomain.getCell(index).getCellPoint(2);
        var p4 = globalDomain.getCell(index).getCellPoint(3);

        max = Math.max(max, p1.getXPos())
        max = Math.max(max, p1.getYPos());
        max = Math.max(max, p1.getZPos());
        max = Math.max(max, p2.getXPos());
        max = Math.max(max, p2.getYPos());
        max = Math.max(max, p2.getZPos());
        max = Math.max(max, p3.getXPos());
        max = Math.max(max, p3.getYPos());
        max = Math.max(max, p3.getZPos());

        max = Math.max(max, p1.getXPos());
        max = Math.max(max, p1.getYPos());
        max = Math.max(max, p1.getZPos());
        max = Math.max(max, p3.getXPos());
        max = Math.max(max, p3.getYPos());
        max = Math.max(max, p3.getZPos());
        max = Math.max(max, p4.getXPos());
        max = Math.max(max, p4.getYPos());
        max = Math.max(max, p4.getZPos());

        mapping_MaterialPositions[index * 18 + 0] = p1.getXPos();
        mapping_MaterialPositions[index * 18 + 1] = p1.getYPos();
        mapping_MaterialPositions[index * 18 + 2] = p1.getZPos();
        mapping_MaterialPositions[index * 18 + 3] = p2.getXPos();
        mapping_MaterialPositions[index * 18 + 4] = p2.getYPos();
        mapping_MaterialPositions[index * 18 + 5] = p2.getZPos();
        mapping_MaterialPositions[index * 18 + 6] = p3.getXPos();
        mapping_MaterialPositions[index * 18 + 7] = p3.getYPos();
        mapping_MaterialPositions[index * 18 + 8] = p3.getZPos();

        mapping_MaterialPositions[index * 18 + 9] = p1.getXPos();
        mapping_MaterialPositions[index * 18 + 10] = p1.getYPos();
        mapping_MaterialPositions[index * 18 + 11] = p1.getZPos();
        mapping_MaterialPositions[index * 18 + 12] = p3.getXPos();
        mapping_MaterialPositions[index * 18 + 13] = p3.getYPos();
        mapping_MaterialPositions[index * 18 + 14] = p3.getZPos();
        mapping_MaterialPositions[index * 18 + 15] = p4.getXPos();
        mapping_MaterialPositions[index * 18 + 16] = p4.getYPos();
        mapping_MaterialPositions[index * 18 + 17] = p4.getZPos();


        /*mapping_MaterialNormals[ index * 18 + 0 ] = 0;
				mapping_MaterialNormals[ index * 18 + 1 ] = 0;
				mapping_MaterialNormals[ index * 18 + 2 ] = 1;
        mapping_MaterialNormals[ index * 18 + 3 ] = 0;
				mapping_MaterialNormals[ index * 18 + 4 ] = 0;
				mapping_MaterialNormals[ index * 18 + 5 ] = 1;
        mapping_MaterialNormals[ index * 18 + 6 ] = 0;
				mapping_MaterialNormals[ index * 18 + 7 ] = 0;
				mapping_MaterialNormals[ index * 18 + 8 ] = 1;

        mapping_MaterialNormals[ index * 18 + 9 ] = 0;
				mapping_MaterialNormals[ index * 18 + 10 ] = 0;
				mapping_MaterialNormals[ index * 18 + 11 ] = 1;
        mapping_MaterialNormals[ index * 18 + 12 ] = 0;
				mapping_MaterialNormals[ index * 18 + 13 ] = 0;
				mapping_MaterialNormals[ index * 18 + 14 ] = 1;
        mapping_MaterialNormals[ index * 18 + 15 ] = 0;
				mapping_MaterialNormals[ index * 18 + 16 ] = 0;
				mapping_MaterialNormals[ index * 18 + 17 ] = 1;*/

        var squareGeometry = new THREE.Geometry();

      }

      mapping_maxRadius = max;
      mapping_zoomFactor = max / 100;

      updateMesh();

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

  for (var i = mappingGroup.children.length - 1; i >= 0; i--) {
    mappingGroup.remove(mappingGroup.children[i]);
  }

  var geometry = new THREE.BufferGeometry();

  var positionAttribute = new THREE.Float32BufferAttribute(mapping_MaterialPositions, 3);
  //var normalAttribute = new THREE.Float32BufferAttribute( mapping_MaterialNormals, 3 );
  var colorAttribute = new THREE.Float32BufferAttribute(mapping_MaterialColors, 3);
  /*normalAttribute.normalized = true; // this will map the buffer values to 0.0f - +1.0f in the shader
  colorAttribute.normalized = true;*/
  geometry.addAttribute('position', positionAttribute);
  //  geometry.addAttribute( 'normal', normalAttribute );
  geometry.addAttribute('color', colorAttribute);
  geometry.computeBoundingSphere();

  /*var material = new THREE.MeshPhongMaterial( {
    color: 0xaaaaaa, specular: 0xffffff, shininess: 250,
    side: THREE.DoubleSide, vertexColors: THREE.VertexColors
  } );

  //var material  = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide, vertexColors: THREE.VertexColors });

  /*var material = new THREE.MeshNormalMaterial( {
      color: 0xaaaaaa,
      normalscale: new THREE.Vector2( 1, - 1 ),
      vertexColors: THREE.VertexColors,
      //flatShading: true,
      side: THREE.DoubleSide
    } );*/

  /*var material = new THREE.MeshBasicMaterial({
    vertexColors: THREE.VertexColors,
    side: THREE.DoubleSide
  });*/

  var material = new THREE.MeshLambertMaterial( {
						side: THREE.DoubleSide,
						color: 0xF5F5F5,
						vertexColors: THREE.VertexColors
					} );

  material.transparent = true;
  material.blending = THREE["NoBlending"];


  var mesh = new THREE.Mesh(geometry, material);

  mappingGroup.add(mesh);
}
