function labMesh(colorspaceGroup) {

  for (var i = colorspaceGroup.children.length - 1; i >= 0; i--) {
    colorspaceGroup.remove(colorspaceGroup.children[i]);
  }

  if (positionsLAB.length != 0) {
    var labMesh = lab3DMesh();
    colorspaceGroup.add(labMesh[0]);
    colorspaceGroup.add(labMesh[1]);
  }
  return colorspaceGroup;
}



function lab3DMesh() {
  var tmpRGB;

  var linesGeometry = new THREE.BufferGeometry();
  var linesMaterial = new THREE.LineBasicMaterial({
    vertexColors: THREE.VertexColors,
    linewidth: 1,
    transparent: true,
    opacity: lineOpacity,
  });
  var linesPoints = [];
  var linesIndices = [];
  var linesColors = [];

  ///
  var linesTopCircleVertex = [];
  var linesBottomCircleVertex = [];
  var geometry = new THREE.Geometry();

  linesPoints.push(0, labSPos, 0);
  linesColors.push(0, 0, 0);

  linesPoints.push(0, labEPos, 0);
  linesColors.push(1, 1, 1);

  geometry.vertices.push(new THREE.Vector3(0, labSPos, 0));
  geometry.vertices.push(new THREE.Vector3(0, labEPos, 0));

  ///// draw parts inside positionsLAB array
  var labABMax2 = labABMax * 2;
  for (var i = 0; i < positionsLAB.length; i++) {

    for (var j = 0; j < positionsLAB[i].length; j++) {

      var xpos = labSPos + ((positionsLAB[i][j][1] + labABMax) / labABMax2) * (labEPos - labSPos);
      var ypos = labSPos + (positionsLAB[i][j][0] / 100.0) * (labEPos - labSPos);
      var zpos = labEPos - ((positionsLAB[i][j][2] + labABMax) / labABMax2) * (labEPos - labSPos);

      linesPoints.push(xpos, ypos, zpos);

      gWorkColor1.updateColor("lab", positionsLAB[i][j][0], positionsLAB[i][j][1], positionsLAB[i][j][2]);
      var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
      if (doColorblindnessSim)
        tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");

      linesColors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);
      geometry.vertices.push(new THREE.Vector3(xpos, ypos, zpos));

      var currentIndex1 = i * positionsLAB[i].length + j + 2;
      var currentIndex2 = i * positionsLAB[i].length + j + 1;
      var lastIndex1 = currentIndex1 - positionsLAB[i].length;
      var lastIndex2 = currentIndex2 - positionsLAB[i].length;

      // lines bottom to top

      if (i != 0) {
        linesIndices.push(lastIndex1, currentIndex1);

        if (i == positionsLAB.length - 1)
          linesIndices.push(1, currentIndex1);
      } else {
        linesIndices.push(0, currentIndex1);
      }

      if (j != 0) {
        // circle lines
        linesIndices.push(currentIndex2, currentIndex1);

        if (j == positionsLAB[i].length - 1)
          linesIndices.push(currentIndex1, i * positionsLAB[i].length + 2);

        if (i != 0) {

          /////////////////////////////////////////////////////////////
          //
          //
          //  lastIndex2             *-------------*    lastIndex1
          //                         |           / |
          //                         |         /   |
          //                         |      /      |
          //                         |   /         |
          //                         |/            |
          //  currentIndex2          *-------------*   currentIndex1
          //


          geometry.faces.push(new THREE.Face3(currentIndex2, lastIndex1, lastIndex2));
          geometry.faces.push(new THREE.Face3(currentIndex2, currentIndex1, lastIndex1));

          // Color currentIndex1
          gWorkColor1.updateColor("lab", positionsLAB[i][j][0], positionsLAB[i][j][1], positionsLAB[i][j][2]);
          var tmpRGBString = gWorkColor1.get_RGB_String();
          if (doColorblindnessSim)
            tmpRGBString = gWorkColor1.get_RGB_CB_String();
          geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

          // Color currentIndex2
          gWorkColor1.updateColor("lab", positionsLAB[i][j - 1][0], positionsLAB[i][j - 1][1], positionsLAB[i][j - 1][2]);
          var tmpRGBString = gWorkColor1.get_RGB_String();
          if (doColorblindnessSim)
            tmpRGBString = gWorkColor1.get_RGB_CB_String();
          geometry.faces[geometry.faces.length - 2].vertexColors[0] = new THREE.Color(tmpRGBString);
          geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);

          // Color lastIndex1
          gWorkColor1.updateColor("lab", positionsLAB[i - 1][j][0], positionsLAB[i - 1][j][1], positionsLAB[i - 1][j][2]);
          var tmpRGBString = gWorkColor1.get_RGB_String();
          if (doColorblindnessSim)
            tmpRGBString = gWorkColor1.get_RGB_CB_String();
          geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color(tmpRGBString);
          geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

          // Color lastIndex2
          gWorkColor1.updateColor("lab", positionsLAB[i - 1][j - 1][0], positionsLAB[i - 1][j - 1][1], positionsLAB[i - 1][j - 1][2]);
          var tmpRGBString = gWorkColor1.get_RGB_String();
          if (doColorblindnessSim)
            tmpRGBString = gWorkColor1.get_RGB_CB_String();
          geometry.faces[geometry.faces.length - 2].vertexColors[2] = new THREE.Color(tmpRGBString);


          if (i == positionsLAB.length - 1) {
            // Top Pyramide
            geometry.faces.push(new THREE.Face3(currentIndex2, 1, currentIndex1));
            geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color("rgb(255,255,255)");

            // Color currentIndex1
            gWorkColor1.updateColor("lab", positionsLAB[i][j][0], positionsLAB[i][j][1], positionsLAB[i][j][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

            // Color currentIndex2
            gWorkColor1.updateColor("lab", positionsLAB[i][j - 1][0], positionsLAB[i][j - 1][1], positionsLAB[i][j - 1][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);
          }

        } // bracket if i !=0
        else {
          // Bottom Pyramide
          geometry.faces.push(new THREE.Face3(currentIndex2, currentIndex1, 0));
          geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color("rgb(0,0,0)");

          // Color currentIndex1
          gWorkColor1.updateColor("lab", positionsLAB[i][j][0], positionsLAB[i][j][1], positionsLAB[i][j][2]);
          var tmpRGBString = gWorkColor1.get_RGB_String();
          if (doColorblindnessSim)
            tmpRGBString = gWorkColor1.get_RGB_CB_String();
          geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

          // Color currentIndex2
          gWorkColor1.updateColor("lab", positionsLAB[i][j - 1][0], positionsLAB[i][j - 1][1], positionsLAB[i][j - 1][2]);
          var tmpRGBString = gWorkColor1.get_RGB_String();
          if (doColorblindnessSim)
            tmpRGBString = gWorkColor1.get_RGB_CB_String();
          geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);
        }

        if (j == positionsLAB[i].length - 1) {

          var currentIndex1 = i * positionsLAB[i].length + j + 2;
          var currentIndex2 = currentIndex1 - positionsLAB[i].length + 1;
          var lastIndex1 = currentIndex1 - positionsLAB[i].length;
          var lastIndex2 = lastIndex1 - positionsLAB[i].length + 1;

          if (i != 0) {

            /////////////////////////////////////////////////////////////
            //
            //
            //  lastIndex2             *-------------*    lastIndex1
            //                         |           / |
            //                         |         /   |
            //                         |      /      |
            //                         |   /         |
            //                         |/            |
            //  currentIndex2          *-------------*   currentIndex1
            //


            geometry.faces.push(new THREE.Face3(currentIndex2, lastIndex2, lastIndex1));
            geometry.faces.push(new THREE.Face3(currentIndex2, lastIndex1, currentIndex1));

            // Color currentIndex1
            gWorkColor1.updateColor("lab", positionsLAB[i][j][0], positionsLAB[i][j][1], positionsLAB[i][j][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

            // Color currentIndex2
            gWorkColor1.updateColor("lab", positionsLAB[i][0][0], positionsLAB[i][0][1], positionsLAB[i][0][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[0] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);


            // Color lastIndex1
            gWorkColor1.updateColor("lab", positionsLAB[i - 1][j][0], positionsLAB[i - 1][j][1], positionsLAB[i - 1][j][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[2] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

            // Color lastIndex2
            gWorkColor1.updateColor("lab", positionsLAB[i - 1][0][0], positionsLAB[i - 1][0][1], positionsLAB[i - 1][0][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color(tmpRGBString);


            if (i == positionsLAB.length - 1) {
              // Top Pyramide
              geometry.faces.push(new THREE.Face3(currentIndex2, currentIndex1, 1));
              geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color("rgb(255,255,255)");

              // Color currentIndex1
              gWorkColor1.updateColor("lab", positionsLAB[i][j][0], positionsLAB[i][j][1], positionsLAB[i][j][2]);
              var tmpRGBString = gWorkColor1.get_RGB_String();
              if (doColorblindnessSim)
                tmpRGBString = gWorkColor1.get_RGB_CB_String();
              geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

              // Color currentIndex2
              gWorkColor1.updateColor("lab", positionsLAB[i][0][0], positionsLAB[i][0][1], positionsLAB[i][0][2]);
              var tmpRGBString = gWorkColor1.get_RGB_String();
              if (doColorblindnessSim)
                tmpRGBString = gWorkColor1.get_RGB_CB_String();
              geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);
            }

          } // bracket if i !=0
          else {
            // Bottom Pyramide
            geometry.faces.push(new THREE.Face3(currentIndex2, 0, currentIndex1));
            geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color("rgb(0,0,0)");

            // Color currentIndex1
            gWorkColor1.updateColor("lab", positionsLAB[i][j][0], positionsLAB[i][j][1], positionsLAB[i][j][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

            // Color currentIndex2
            gWorkColor1.updateColor("lab", positionsLAB[i][0][0], positionsLAB[i][0][1], positionsLAB[i][0][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);
          }

        }



      } // bracket if j!0



    }

  }

  geometry.computeFaceNormals();

  linesGeometry.setIndex(linesIndices);
  linesGeometry.addAttribute('position', new THREE.Float32BufferAttribute(linesPoints, 3));
  linesGeometry.addAttribute('color', new THREE.Float32BufferAttribute(linesColors, 3));
  linesGeometry.computeBoundingSphere();
  var linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
  linesMesh.position.x = 0;
  linesMesh.position.y = 0;
  linesMesh.position.z = 0;

  var material = new THREE.MeshBasicMaterial({
    /*side: THREE.DoubleSide,*/
    opacity: planesOpacity,
    premultipliedAlpha: true,
    transparent: true, //*/
    vertexColors: THREE.VertexColors,
    reflectivity: 0
  });


  var meshLab = new THREE.Mesh(geometry, material);
  meshLab.position.x = 0;
  meshLab.position.y = 0;
  meshLab.position.z = 0;

  return [linesMesh, meshLab];
}