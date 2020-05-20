function hsvMesh(colorspaceGroup) {

  for (var i = colorspaceGroup.children.length - 1; i >= 0; i--) {
    colorspaceGroup.remove(colorspaceGroup.children[i]);
  }

  var numberParticelsPerCircle = 50;
  var stepForLine = 5;

  var hueSteps = 1.0 / numberParticelsPerCircle;

  var linesGeometry = new THREE.BufferGeometry();
  var linesMaterial = new THREE.LineBasicMaterial({
    vertexColors: THREE.VertexColors,
    linewidth: 2
  });
  var linesPoints = [];
  var linesIndices = [];
  var linesColors = [];

  ///
  var linesTopCircleVertex = [];
  var linesBottomCircleVertex = [];
  var geometry = new THREE.Geometry();
  var currentColorInfo1 = ["hsv", 0, 0, 0];
  var currentColorInfo2 = ["hsv", 0, 0, 0];
  var lastColorInfo1 = ["hsv", 0, 0, 0];
  var lastColorInfo2 = ["hsv", 0, 0, 0];
  var firstColorInfo1 = ["hsv", 0, 0, 0];
  var firstColorInfo2 = ["hsv", 0, 0, 0];

  geometry.vertices.push(new THREE.Vector3(0, vStart3D, 0));
  geometry.vertices.push(new THREE.Vector3(0, vEnd3D, 0));

  for (var hStep = 0; hStep < numberParticelsPerCircle; hStep++) {
    var hueVal = hStep * hueSteps;
    var tmpRad = (hueVal * Math.PI * 2) - Math.PI;
    var xPos = hsv3DRadius * Math.cos(tmpRad);
    var zPos = hsv3DRadius * Math.sin(tmpRad) * -1;

    linesPoints.push(xPos, vStart3D, zPos);
    linesPoints.push(xPos, vEnd3D, zPos);

    geometry.vertices.push(new THREE.Vector3(xPos, vStart3D, zPos));
    geometry.vertices.push(new THREE.Vector3(xPos, vEnd3D, zPos));

    currentColorInfo1 = ["hsv", hueVal, 1.0, 0.0];
    gWorkColor1.updateColor("hsv", hueVal, 1.0, 0.0);
    var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
    if (doColorblindnessSim)
      tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");
    linesColors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);

    currentColorInfo2 = ["hsv", hueVal, 1.0, 1.0];
    gWorkColor1.updateColor("hsv", hueVal, 1.0, 1.0);
    var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
    if (doColorblindnessSim)
      tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");
    linesColors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);

    if (hStep % stepForLine == 0)
      linesIndices.push(hStep * 2, hStep * 2 + 1);

    if (hStep != 0) {
      linesIndices.push(hStep * 2, hStep * 2 - 2, hStep * 2 + 1, hStep * 2 - 1);

      /////////////////////////////////////////////////////////////
      //       V
      //        ^
      //        |
      //        |---> H
      //
      //
      //  currentIndex2          *-------------*    lastIndex2
      //                         |           / |
      //                         |         /   |
      //                         |      /      |
      //                         |   /         |
      //                         |/            |
      //  currentIndex1          *-------------*   lastIndex1
      //

      var currentIndex1 = hStep * 2 + 2;
      var currentIndex2 = hStep * 2 + 3;
      var lastIndex1 = hStep * 2;
      var lastIndex2 = hStep * 2 + 1;

      // top bottom
      geometry.faces.push(new THREE.Face3(currentIndex1, 0, lastIndex1));
      geometry.faces.push(new THREE.Face3(currentIndex2, lastIndex2, 1));
      geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color("rgb(0,0,0)");
      geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color("rgb(255,255,255)");

      // side
      geometry.faces.push(new THREE.Face3(currentIndex1, lastIndex2, currentIndex2));
      geometry.faces.push(new THREE.Face3(currentIndex1, lastIndex1, lastIndex2));

      // Color currentIndex1
      gWorkColor1.updateColor(currentColorInfo1[0], currentColorInfo1[1], currentColorInfo1[2], currentColorInfo1[3]);
      var tmpRGBString = gWorkColor1.getColorInfo("rgb_string")
      if (doColorblindnessSim)
        tmpRGBString = gWorkColor1.getColorInfo("rgb_cb_string")
      geometry.faces[geometry.faces.length - 2].vertexColors[0] = new THREE.Color(tmpRGBString);
      geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);
      geometry.faces[geometry.faces.length - 4].vertexColors[0] = new THREE.Color(tmpRGBString);

      // Color currentIndex2
      gWorkColor1.updateColor(currentColorInfo2[0], currentColorInfo2[1], currentColorInfo2[2], currentColorInfo2[3]);
      var tmpRGBString = gWorkColor1.getColorInfo("rgb_string")
      if (doColorblindnessSim)
        tmpRGBString = gWorkColor1.getColorInfo("rgb_cb_string")
      geometry.faces[geometry.faces.length - 2].vertexColors[2] = new THREE.Color(tmpRGBString);
      geometry.faces[geometry.faces.length - 3].vertexColors[0] = new THREE.Color(tmpRGBString);

      // Color lastIndex1
      gWorkColor1.updateColor(lastColorInfo1[0], lastColorInfo1[1], lastColorInfo1[2], lastColorInfo1[3]);
      var tmpRGBString = gWorkColor1.getColorInfo("rgb_string")
      if (doColorblindnessSim)
        tmpRGBString = gWorkColor1.getColorInfo("rgb_cb_string")
      geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);
      geometry.faces[geometry.faces.length - 4].vertexColors[2] = new THREE.Color(tmpRGBString);

      // Color lastIndex2
      gWorkColor1.updateColor(lastColorInfo2[0], lastColorInfo2[1], lastColorInfo2[2], lastColorInfo2[3]);
      var tmpRGBString = gWorkColor1.getColorInfo("rgb_string")
      if (doColorblindnessSim)
        tmpRGBString = gWorkColor1.getColorInfo("rgb_cb_string")
      geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color(tmpRGBString);
      geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);
      geometry.faces[geometry.faces.length - 3].vertexColors[1] = new THREE.Color(tmpRGBString);

    } else {
      firstColorInfo1 = ["hsv", currentColorInfo1[1], currentColorInfo1[2], currentColorInfo1[3]];
      firstColorInfo2 = ["hsv", currentColorInfo2[1], currentColorInfo2[2], currentColorInfo2[3]];
    }

    if (hStep == numberParticelsPerCircle - 1) {
      linesIndices.push(hStep * 2, 0, hStep * 2 + 1, 1);


      /////////////////////////////////////////////////////////////
      //       V
      //        ^
      //        |
      //        |---> H
      //
      //
      //   firstIndex2           *-------------*   currentIndex2
      //                         |           / |
      //                         |         /   |
      //                         |      /      |
      //                         |   /         |
      //                         |/            |
      //   firstIndex1           *-------------*   currentIndex1
      //

      var currentIndex1 = hStep * 2 + 2;
      var currentIndex2 = hStep * 2 + 3;
      var firstIndex1 = 2;
      var firstIndex2 = 3;

      // top bottom
      geometry.faces.push(new THREE.Face3(firstIndex1, 0, currentIndex1));
      geometry.faces.push(new THREE.Face3(firstIndex2, currentIndex2, 1));
      geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color("rgb(0,0,0)");
      geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color("rgb(255,255,255)");

      // side
      geometry.faces.push(new THREE.Face3(firstIndex1, currentIndex2, firstIndex2));
      geometry.faces.push(new THREE.Face3(firstIndex1, currentIndex1, currentIndex2));

      // Color firstIndex1
      gWorkColor1.updateColor(firstColorInfo1[0], firstColorInfo1[1], firstColorInfo1[2], firstColorInfo1[3]);
      var tmpRGBString = gWorkColor1.getColorInfo("rgb_string")
      if (doColorblindnessSim)
        tmpRGBString = gWorkColor1.getColorInfo("rgb_cb_string")
      geometry.faces[geometry.faces.length - 2].vertexColors[0] = new THREE.Color(tmpRGBString);
      geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);
      geometry.faces[geometry.faces.length - 4].vertexColors[0] = new THREE.Color(tmpRGBString);

      // Color firstIndex2
      gWorkColor1.updateColor(firstColorInfo2[0], firstColorInfo2[1], firstColorInfo2[2], firstColorInfo2[3]);
      var tmpRGBString = gWorkColor1.getColorInfo("rgb_string")
      if (doColorblindnessSim)
        tmpRGBString = gWorkColor1.getColorInfo("rgb_cb_string")
      geometry.faces[geometry.faces.length - 2].vertexColors[2] = new THREE.Color(tmpRGBString);
      geometry.faces[geometry.faces.length - 3].vertexColors[0] = new THREE.Color(tmpRGBString);

      // Color currentIndex1
      gWorkColor1.updateColor(currentColorInfo1[0], currentColorInfo1[1], currentColorInfo1[2], currentColorInfo1[3]);
      var tmpRGBString = gWorkColor1.getColorInfo("rgb_string")
      if (doColorblindnessSim)
        tmpRGBString = gWorkColor1.getColorInfo("rgb_cb_string")
      geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);
      geometry.faces[geometry.faces.length - 4].vertexColors[2] = new THREE.Color(tmpRGBString);

      // Color currentIndex2
      gWorkColor1.updateColor(currentColorInfo2[0], currentColorInfo2[1], currentColorInfo2[2], currentColorInfo2[3]);
      var tmpRGBString = gWorkColor1.getColorInfo("rgb_string")
      if (doColorblindnessSim)
        tmpRGBString = gWorkColor1.getColorInfo("rgb_cb_string")
      geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color(tmpRGBString);
      geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);
      geometry.faces[geometry.faces.length - 3].vertexColors[1] = new THREE.Color(tmpRGBString);
    }

    lastColorInfo1 = ["hsv", currentColorInfo1[1], currentColorInfo1[2], currentColorInfo1[3]];
    lastColorInfo2 = ["hsv", currentColorInfo2[1], currentColorInfo2[2], currentColorInfo2[3]];

  }

  linesGeometry.setIndex(linesIndices);
  linesGeometry.addAttribute('position', new THREE.Float32BufferAttribute(linesPoints, 3));
  linesGeometry.addAttribute('color', new THREE.Float32BufferAttribute(linesColors, 3));
  linesGeometry.computeBoundingSphere();
  var linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
  linesMesh.position.x = 0;
  linesMesh.position.y = 0;
  linesMesh.position.z = 0;
  colorspaceGroup.add(linesMesh);

  geometry.computeFaceNormals();

  var material = new THREE.MeshBasicMaterial({
    /*side: THREE.DoubleSide,*/
    opacity: planesOpacity,
    premultipliedAlpha: true,
    transparent: true, //*/
    vertexColors: THREE.VertexColors,
    reflectivity: 0
  });



  var meshHSV = new THREE.Mesh(geometry, material);
  meshHSV.position.x = 0;
  meshHSV.position.y = 0;
  meshHSV.position.z = 0;
  colorspaceGroup.add(meshHSV);

  return colorspaceGroup;

}
