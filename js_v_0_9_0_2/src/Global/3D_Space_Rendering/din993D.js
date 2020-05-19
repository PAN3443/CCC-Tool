function din99Mesh(colorspaceGroup) {

  for (var i = colorspaceGroup.children.length - 1; i >= 0; i--) {
    colorspaceGroup.remove(colorspaceGroup.children[i]);
  }

  if (positionsDIN99.length != 0) {

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

    linesPoints.push(0, din99SPos, 0);
    linesColors.push(0, 0, 0);

    linesPoints.push(0, din99EPos, 0);
    linesColors.push(1, 1, 1);

    geometry.vertices.push(new THREE.Vector3(0, din99SPos, 0));
    geometry.vertices.push(new THREE.Vector3(0, din99EPos, 0));


    ///// draw parts inside positionsDIN99 array
    var din99ABMax2 = din99ABMax * 2;
    for (var i = 0; i < positionsDIN99.length; i++) {

      for (var j = 0; j < positionsDIN99[i].length; j++) {

        var xpos = din99SPos + ((positionsDIN99[i][j][1] + din99ABMax) / din99ABMax2) * (din99EPos - din99SPos);
        var ypos = din99SPos + (positionsDIN99[i][j][0] / 100.0) * (din99EPos - din99SPos);
        var zpos = din99EPos - ((positionsDIN99[i][j][2] + din99ABMax) / din99ABMax2) * (din99EPos - din99SPos);

        linesPoints.push(xpos, ypos, zpos);

        gWorkColor1.updateColor("lab", positionsDIN99[i][j][0], positionsDIN99[i][j][1], positionsDIN99[i][j][2]);
        var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
        if (doColorblindnessSim)
          tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");

        linesColors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);

        geometry.vertices.push(new THREE.Vector3(xpos, ypos, zpos));

        var currentIndex1 = i * positionsDIN99[i].length + j + 2;
        var currentIndex2 = i * positionsDIN99[i].length + j + 1;
        var lastIndex1 = currentIndex1 - positionsDIN99[i].length;
        var lastIndex2 = currentIndex2 - positionsDIN99[i].length;

        // lines bottom to top

        if (i != 0) {
          linesIndices.push(lastIndex1, currentIndex1);

          if (i == positionsDIN99.length - 1)
            linesIndices.push(1, currentIndex1);
        } else {
          linesIndices.push(0, currentIndex1);
        }



        if (j != 0) {
          // circle lines
          linesIndices.push(currentIndex2, currentIndex1);

          if (j == positionsDIN99[i].length - 1)
            linesIndices.push(currentIndex1, i * positionsDIN99[i].length + 2);

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
            gWorkColor1.updateColor("din99", positionsDIN99[i][j][0], positionsDIN99[i][j][1], positionsDIN99[i][j][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

            // Color currentIndex2
            gWorkColor1.updateColor("din99", positionsDIN99[i][j - 1][0], positionsDIN99[i][j - 1][1], positionsDIN99[i][j - 1][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[0] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);


            // Color lastIndex1
            gWorkColor1.updateColor("din99", positionsDIN99[i - 1][j][0], positionsDIN99[i - 1][j][1], positionsDIN99[i - 1][j][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

            // Color lastIndex2
            gWorkColor1.updateColor("din99", positionsDIN99[i - 1][j - 1][0], positionsDIN99[i - 1][j - 1][1], positionsDIN99[i - 1][j - 1][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[2] = new THREE.Color(tmpRGBString);


            if (i == positionsDIN99.length - 1) {
              // Top Pyramide
              geometry.faces.push(new THREE.Face3(currentIndex2, 1, currentIndex1));
              geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color("rgb(255,255,255)");

              // Color currentIndex1
              gWorkColor1.updateColor("din99", positionsDIN99[i][j][0], positionsDIN99[i][j][1], positionsDIN99[i][j][2]);
              var tmpRGBString = gWorkColor1.get_RGB_String();
              if (doColorblindnessSim)
                tmpRGBString = gWorkColor1.get_RGB_CB_String();
              geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

              // Color currentIndex2
              gWorkColor1.updateColor("din99", positionsDIN99[i][j - 1][0], positionsDIN99[i][j - 1][1], positionsDIN99[i][j - 1][2]);
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
            gWorkColor1.updateColor("din99", positionsDIN99[i][j][0], positionsDIN99[i][j][1], positionsDIN99[i][j][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

            // Color currentIndex2
            gWorkColor1.updateColor("din99", positionsDIN99[i][j - 1][0], positionsDIN99[i][j - 1][1], positionsDIN99[i][j - 1][2]);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);
          }

          if (j == positionsDIN99[i].length - 1) {

            var currentIndex1 = i * positionsDIN99[i].length + j + 2;
            var currentIndex2 = currentIndex1 - positionsDIN99[i].length + 1;
            var lastIndex1 = currentIndex1 - positionsDIN99[i].length;
            var lastIndex2 = lastIndex1 - positionsDIN99[i].length + 1;

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
              gWorkColor1.updateColor("din99", positionsDIN99[i][j][0], positionsDIN99[i][j][1], positionsDIN99[i][j][2]);
              var tmpRGBString = gWorkColor1.get_RGB_String();
              if (doColorblindnessSim)
                tmpRGBString = gWorkColor1.get_RGB_CB_String();
              geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

              // Color currentIndex2
              gWorkColor1.updateColor("din99", positionsDIN99[i][0][0], positionsDIN99[i][0][1], positionsDIN99[i][0][2]);
              var tmpRGBString = gWorkColor1.get_RGB_String();
              if (doColorblindnessSim)
                tmpRGBString = gWorkColor1.get_RGB_CB_String();
              geometry.faces[geometry.faces.length - 2].vertexColors[0] = new THREE.Color(tmpRGBString);
              geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);


              // Color lastIndex1
              gWorkColor1.updateColor("din99", positionsDIN99[i - 1][j][0], positionsDIN99[i - 1][j][1], positionsDIN99[i - 1][j][2]);
              var tmpRGBString = gWorkColor1.get_RGB_String();
              if (doColorblindnessSim)
                tmpRGBString = gWorkColor1.get_RGB_CB_String();
              geometry.faces[geometry.faces.length - 2].vertexColors[2] = new THREE.Color(tmpRGBString);
              geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

              // Color lastIndex2
              gWorkColor1.updateColor("din99", positionsDIN99[i - 1][0][0], positionsDIN99[i - 1][0][1], positionsDIN99[i - 1][0][2]);
              var tmpRGBString = gWorkColor1.get_RGB_String();
              if (doColorblindnessSim)
                tmpRGBString = gWorkColor1.get_RGB_CB_String();
              geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color(tmpRGBString);


              if (i == positionsDIN99.length - 1) {
                // Top Pyramide
                geometry.faces.push(new THREE.Face3(currentIndex2, currentIndex1, 1));
                geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color("rgb(255,255,255)");

                // Color currentIndex1
                gWorkColor1.updateColor("din99", positionsDIN99[i][j][0], positionsDIN99[i][j][1], positionsDIN99[i][j][2]);
                var tmpRGBString = gWorkColor1.get_RGB_String();
                if (doColorblindnessSim)
                  tmpRGBString = gWorkColor1.get_RGB_CB_String();
                geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

                // Color currentIndex2
                gWorkColor1.updateColor("din99", positionsDIN99[i][0][0], positionsDIN99[i][0][1], positionsDIN99[i][0][2]);
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
              gWorkColor1.updateColor("din99", positionsDIN99[i][j][0], positionsDIN99[i][j][1], positionsDIN99[i][j][2]);
              var tmpRGBString = gWorkColor1.get_RGB_String();
              if (doColorblindnessSim)
                tmpRGBString = gWorkColor1.get_RGB_CB_String();
              geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

              // Color currentIndex2
              gWorkColor1.updateColor("din99", positionsDIN99[i][0][0], positionsDIN99[i][0][1], positionsDIN99[i][0][2]);
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
    colorspaceGroup.add(linesMesh);


    var material = new THREE.MeshBasicMaterial({
      /*side: THREE.DoubleSide,*/
      opacity: planesOpacity,
      premultipliedAlpha: true,
      transparent: true, //*/
      vertexColors: THREE.VertexColors,
      reflectivity: 0
    });


    var meshDin99 = new THREE.Mesh(geometry, material);
    meshDin99.position.x = 0;
    meshDin99.position.y = 0;
    meshDin99.position.z = 0;
    colorspaceGroup.add(meshDin99);

  }

  return colorspaceGroup;
}
