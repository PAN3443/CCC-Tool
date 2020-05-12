function rgbMesh(colorspaceGroup) {

  for (var i = colorspaceGroup.children.length - 1; i >= 0; i--) {
    colorspaceGroup.remove(colorspaceGroup.children[i]);
  }

  var linecolor = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--main-font-color'));

  var startPos = -127.5;
  var textPos = 210;
  var arrowEnd = 200;
  var endpos = startPos + 255;

  //////////////////////////////////////////////////////////////////
  // Arrow Labels

  var loader = new THREE.FontLoader();

  loader.load("../../" + version_JS_FolderName + '/libs/ThreeJS/Fonts/helvetiker_regular.typeface.json', function(font) {

    var parameter = {
      font: font,
      size: 25,
      height: 5,
      curveSegments: 10,
      bevelThickness: 0.1,
      bevelSize: 1.0,
      bevelEnabled: true
    };

    var textMaterial = new THREE.MeshPhongMaterial({
      color: linecolor
    });

    var textR = new THREE.Mesh(new THREE.TextGeometry("R", parameter), textMaterial);
    textR.position.set(textPos, startPos, startPos);

    var textG = new THREE.Mesh(new THREE.TextGeometry("G", parameter), textMaterial);
    textG.position.set(startPos, textPos, startPos);

    var textB = new THREE.Mesh(new THREE.TextGeometry("B", parameter), textMaterial);
    textB.position.set(startPos, startPos, textPos);

    colorspaceGroup.add(textR);
    colorspaceGroup.add(textG);
    colorspaceGroup.add(textB);

  });

  /////////////////////////////////////////////////////////////
  //// Arrows

  var from = new THREE.Vector3(endpos, startPos, startPos);
  var to = new THREE.Vector3(arrowEnd, startPos, startPos);
  var direction = to.clone().sub(from);
  var length = direction.length();
  var arrowXCoord = new THREE.ArrowHelper(direction.normalize(), from, length, linecolor);
  colorspaceGroup.add(arrowXCoord);

  from = new THREE.Vector3(startPos, endpos, startPos);
  to = new THREE.Vector3(startPos, arrowEnd, startPos);
  direction = to.clone().sub(from);
  length = direction.length();
  var arrowYCoord = new THREE.ArrowHelper(direction.normalize(), from, length, linecolor);
  colorspaceGroup.add(arrowYCoord);

  from = new THREE.Vector3(startPos, startPos, endpos);
  to = new THREE.Vector3(startPos, startPos, arrowEnd);
  direction = to.clone().sub(from);
  length = direction.length();
  var arrowZCoord = new THREE.ArrowHelper(direction.normalize(), from, length, linecolor);
  colorspaceGroup.add(arrowZCoord);

  /////////////////////////////////////////////////////////////
  //// Cube
  colorspaceGroup.add(create_RGB_Line_Mesh(startPos, endpos));
  colorspaceGroup.add(create_RGB_Plane_Mesh(5, startPos));

  return colorspaceGroup;
}

function create_RGB_Line_Mesh(startPos, endpos) {

  var linesGeometry = new THREE.BufferGeometry();
  var linesMaterial = new THREE.LineBasicMaterial({
    vertexColors: THREE.VertexColors,
    linewidth: 2
  });

  var indices = [];
  var positions = [];
  var colors = [];

  positions.push(endpos, endpos, endpos); //eee = 0
  positions.push(startPos, endpos, endpos); //see = 1
  positions.push(endpos, endpos, startPos); //ees = 2
  positions.push(endpos, startPos, endpos); //ese = 3

  positions.push(endpos, startPos, startPos); //ess = 4
  positions.push(startPos, startPos, endpos); //sse = 5
  positions.push(startPos, endpos, startPos); //ses = 6
  positions.push(startPos, startPos, startPos); //sss = 7

  gWorkColor1.updateColor("rgb", 1.0, 1.0, 1.0);
  var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
  if (doColorblindnessSim)
    tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");
  colors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);

  gWorkColor1.updateColor("rgb", 0.0, 1.0, 1.0);
  var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
  if (doColorblindnessSim)
    tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");
  colors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);

  gWorkColor1.updateColor("rgb", 1.0, 1.0, 0.0);
  var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
  if (doColorblindnessSim)
    tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");
  colors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);

  gWorkColor1.updateColor("rgb", 1.0, 0.0, 1.0);
  var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
  if (doColorblindnessSim)
    tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");
  colors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);

  gWorkColor1.updateColor("rgb", 1.0, 0.0, 0.0);
  var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
  if (doColorblindnessSim)
    tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");
  colors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);

  gWorkColor1.updateColor("rgb", 0.0, 0.0, 1.0);
  var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
  if (doColorblindnessSim)
    tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");
  colors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);

  gWorkColor1.updateColor("rgb", 0.0, 1.0, 0.0);
  var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
  if (doColorblindnessSim)
    tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");
  colors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);

  gWorkColor1.updateColor("rgb", 0.0, 0.0, 0.0);
  var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
  if (doColorblindnessSim)
    tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");
  colors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);

  indices = [
    6, 2, 6, 1, 0, 2, 0, 1, // top rect
    7, 5, 7, 4, 3, 5, 3, 4, // bottom rect
    7, 6, 5, 1, 3, 0, 4, 2
  ];

  linesGeometry.setIndex(indices);
  linesGeometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  linesGeometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  linesGeometry.computeBoundingSphere();
  var linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
  linesMesh.position.x = 0;
  linesMesh.position.y = 0;
  linesMesh.position.z = 0;

  return linesMesh;

}

function create_RGB_Plane_Mesh(numberOfPieces, startPos) {

  var distance = 255 / numberOfPieces;

  var numberOfLine = numberOfPieces + 1;
  var numberOfPlane = numberOfLine * numberOfLine;

  var geometry = new THREE.Geometry();


  var indexArray = [];

  for (var b = 0; b <= numberOfPieces; b++) {
    var bPosition = b * distance + startPos;
    for (var g = 0; g <= numberOfPieces; g++) {
      var gPosition = g * distance + startPos;
      for (var r = 0; r <= numberOfPieces; r++) {

        indexArray.push(undefined);

        /////////////////////
        /// FRONT
        if (b == 0) {
          var rPosition = r * distance + startPos;
          geometry.vertices.push(new THREE.Vector3(rPosition, gPosition, bPosition));
          indexArray[indexArray.length - 1] = geometry.vertices.length - 1;

          // front
          if (g != 0 && r != 0) {

            /////////////////////////////////////////////////////////////
            //       G
            //        ^
            //        |
            //        |---> R
            //
            //
            //  preIndex               *-------------*   currentIndex
            //                         |           / |
            //                         |         /   |
            //                         |      /      |
            //                         |   /         |
            //                         |/            |
            //  preIndexLastLoop       *-------------*  currentIndexLastLoop
            //

            var currentIndex = g * numberOfLine + r;
            var preIndex = currentIndex - 1;
            var currentIndexLastLoop = (g - 1) * numberOfLine + r;
            var preIndexLastLoop = currentIndexLastLoop - 1;

            var currentG_Value = g * distance / 255;
            var currentR_Value = r * distance / 255;
            var lastG_Value = (g - 1) * distance / 255;
            var lastR_Value = (r - 1) * distance / 255;

            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastLoop], indexArray[currentIndex], indexArray[preIndex]));
            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastLoop], indexArray[currentIndexLastLoop], indexArray[currentIndex]));

            // Color CurrentIndex
            gWorkColor1.updateColor("rgb", currentR_Value, currentG_Value, 0);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

            // Color preIndex
            gWorkColor1.updateColor("rgb", lastR_Value, currentG_Value, 0);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[2] = new THREE.Color(tmpRGBString);

            // Color currentIndexLastLoop
            gWorkColor1.updateColor("rgb", currentR_Value, lastG_Value, 0);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

            // Color preIndexLastLoop
            gWorkColor1.updateColor("rgb", lastR_Value, lastG_Value, 0);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[0] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);
          }
        } else {

          // check the case of adding a vertex to the geometry
          if (b == numberOfPieces || r == 0 || r == numberOfPieces || g == 0 || g == numberOfPieces) {
            var rPosition = r * distance + startPos;
            geometry.vertices.push(new THREE.Vector3(rPosition, gPosition, bPosition));
            indexArray[indexArray.length - 1] = geometry.vertices.length - 1;
          }


          /////////////////////
          /// Back
          if (b == numberOfPieces && g != 0 && r != 0) {
            /////////////////////////////////////////////////////////////
            //       G
            //        ^
            //        |
            //        |---> R
            //
            //
            //  preIndex               *-------------*   currentIndex
            //                         |           / |
            //                         |         /   |
            //                         |      /      |
            //                         |   /         |
            //                         |/            |
            //  preIndexLastLoop       *-------------*  currentIndexLastLoop
            //

            var currentIndex = b * numberOfPlane + g * numberOfLine + r;
            var preIndex = currentIndex - 1;
            var currentIndexLastLoop = b * numberOfPlane + (g - 1) * numberOfLine + r;
            var preIndexLastLoop = currentIndexLastLoop - 1;

            var currentG_Value = g * distance / 255;
            var currentR_Value = r * distance / 255;
            var lastG_Value = (g - 1) * distance / 255;
            var lastR_Value = (r - 1) * distance / 255;

            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastLoop], indexArray[preIndex], indexArray[currentIndex]));
            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastLoop], indexArray[currentIndex], indexArray[currentIndexLastLoop]));

            // Color CurrentIndex
            gWorkColor1.updateColor("rgb", currentR_Value, currentG_Value, 1.0);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[2] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

            // Color preIndex
            gWorkColor1.updateColor("rgb", lastR_Value, currentG_Value, 1.0);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color(tmpRGBString);

            // Color currentIndexLastLoop
            gWorkColor1.updateColor("rgb", currentR_Value, lastG_Value, 1.0);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

            // Color preIndexLastLoop
            gWorkColor1.updateColor("rgb", lastR_Value, lastG_Value, 1.0);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[0] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);

          } // Back end

          /////////////////////
          /// Left Side
          if (r == 0 && g != 0) {

            /////////////////////////////////////////////////////////////
            //       G
            //        ^
            //        |
            //        |---> B
            //
            //
            //  currentIndexLastB      *-------------*   currentIndex
            //  (g,b-1)                |           / |   (g,b)
            //                         |         /   |
            //                         |      /      |
            //                         |   /         |
            //                         |/            |
            //  preIndexLastB          *-------------*  preIndex
            //  (g-1,b-1)                                 (g-1,b)


            var currentIndex = b * numberOfPlane + g * numberOfLine;
            var preIndex = b * numberOfPlane + (g - 1) * numberOfLine;
            var currentIndexLastB = (b - 1) * numberOfPlane + g * numberOfLine;
            var preIndexLastB = (b - 1) * numberOfPlane + (g - 1) * numberOfLine;

            var currentG_Value = g * distance / 255;
            var currentB_Value = b * distance / 255;
            var lastG_Value = (g - 1) * distance / 255;
            var lastB_Value = (b - 1) * distance / 255;

            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastB], indexArray[currentIndexLastB], indexArray[currentIndex]));
            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastB], indexArray[currentIndex], indexArray[preIndex]));

            // Color CurrentIndex
            gWorkColor1.updateColor("rgb", 0, currentG_Value, currentB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 2].vertexColors[2] = new THREE.Color(tmpRGBString);

            // Color preIndex
            gWorkColor1.updateColor("rgb", 0, lastG_Value, currentB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

            // Color currentIndexLastB
            gWorkColor1.updateColor("rgb", 0, currentG_Value, lastB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color(tmpRGBString);

            // Color preIndexLastB
            gWorkColor1.updateColor("rgb", 0, lastG_Value, lastB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[0] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);
          }

          //////////////////////
          /// Right Side
          if (r == numberOfPieces && g != 0) {

            /////////////////////////////////////////////////////////////
            //       G
            //        ^
            //        |
            //        |---> B
            //
            //
            //  currentIndexLastB      *-------------*   currentIndex
            //  (g,b-1)                |           / |   (g,b)
            //                         |         /   |
            //                         |      /      |
            //                         |   /         |
            //                         |/            |
            //  preIndexLastB          *-------------*  preIndex
            //  (g-1,b-1)                                 (g-1,b)


            var currentIndex = b * numberOfPlane + g * numberOfLine + r;
            var preIndex = b * numberOfPlane + (g - 1) * numberOfLine + r;
            var currentIndexLastB = (b - 1) * numberOfPlane + g * numberOfLine + r;
            var preIndexLastB = (b - 1) * numberOfPlane + (g - 1) * numberOfLine + r;

            var currentG_Value = g * distance / 255;
            var currentB_Value = b * distance / 255;
            var lastG_Value = (g - 1) * distance / 255;
            var lastB_Value = (b - 1) * distance / 255;


            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastB], indexArray[currentIndex], indexArray[currentIndexLastB]));
            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastB], indexArray[preIndex], indexArray[currentIndex]));

            // Color CurrentIndex
            gWorkColor1.updateColor("rgb", 1.0, currentG_Value, currentB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color(tmpRGBString);

            // Color preIndex
            gWorkColor1.updateColor("rgb", 1.0, lastG_Value, currentB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

            // Color currentIndexLastB
            gWorkColor1.updateColor("rgb", 1.0, currentG_Value, lastB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[2] = new THREE.Color(tmpRGBString);

            // Color preIndexLastB
            gWorkColor1.updateColor("rgb", 1.0, lastG_Value, lastB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[0] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);


          }


          /////////////////////
          /// Bottom Side
          if (g == 0 && r != 0) {
            /////////////////////////////////////////////////////////////
            //       G
            //        ^
            //        |
            //        |---> B
            //
            //
            //   preIndexLastB         *-------------*   currentIndexLastB
            //  (r-1,b-1)              |           / |   (r,b-1)
            //                         |         /   |
            //                         |      /      |
            //                         |   /         |
            //                         |/            |
            //   preIndex              *-------------*   currentIndex
            //  (r-1,b)                                  (r,b)


            var currentIndex = b * numberOfPlane + r;
            var preIndex = currentIndex - 1;
            var currentIndexLastB = (b - 1) * numberOfPlane + r;
            var preIndexLastB = currentIndexLastB - 1;

            var currentR_Value = r * distance / 255;
            var currentB_Value = b * distance / 255;
            var lastR_Value = (r - 1) * distance / 255;
            var lastB_Value = (b - 1) * distance / 255;


            geometry.faces.push(new THREE.Face3(indexArray[preIndex], indexArray[currentIndexLastB], indexArray[preIndexLastB]));
            geometry.faces.push(new THREE.Face3(indexArray[preIndex], indexArray[currentIndex], indexArray[currentIndexLastB]));

            // Color CurrentIndex
            gWorkColor1.updateColor("rgb", currentR_Value, 0.0, currentB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

            // Color preIndex
            gWorkColor1.updateColor("rgb", lastR_Value, 0.0, currentB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[0] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);

            // Color currentIndexLastB
            gWorkColor1.updateColor("rgb", currentR_Value, 0.0, lastB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

            // Color preIndexLastB
            gWorkColor1.updateColor("rgb", lastR_Value, 0.0, lastB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[2] = new THREE.Color(tmpRGBString);
          }

          /////////////////////
          /// Top Side
          if (g == numberOfPieces && r != 0) {
            /////////////////////////////////////////////////////////////
            //       G
            //        ^
            //        |
            //        |---> B
            //
            //
            //   preIndexLastB         *-------------*   currentIndexLastB
            //  (r-1,b-1)              |           / |   (r,b-1)
            //                         |         /   |
            //                         |      /      |
            //                         |   /         |
            //                         |/            |
            //   preIndex              *-------------*   currentIndex
            //  (r-1,b)                                  (r,b)


            var currentIndex = b * numberOfPlane + g * numberOfLine + r;
            var preIndex = currentIndex - 1;
            var currentIndexLastB = (b - 1) * numberOfPlane + g * numberOfLine + r;
            var preIndexLastB = currentIndexLastB - 1;

            var currentR_Value = r * distance / 255;
            var currentB_Value = b * distance / 255;
            var lastR_Value = (r - 1) * distance / 255;
            var lastB_Value = (b - 1) * distance / 255;

            geometry.faces.push(new THREE.Face3(indexArray[preIndex], indexArray[preIndexLastB], indexArray[currentIndexLastB]));
            geometry.faces.push(new THREE.Face3(indexArray[preIndex], indexArray[currentIndexLastB], indexArray[currentIndex]));

            // Color CurrentIndex
            gWorkColor1.updateColor("rgb", currentR_Value, 1.0, currentB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 1].vertexColors[2] = new THREE.Color(tmpRGBString);

            // Color preIndex
            gWorkColor1.updateColor("rgb", lastR_Value, 1.0, currentB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[0] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[0] = new THREE.Color(tmpRGBString);

            // Color currentIndexLastB
            gWorkColor1.updateColor("rgb", currentR_Value, 1.0, lastB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[2] = new THREE.Color(tmpRGBString);
            geometry.faces[geometry.faces.length - 1].vertexColors[1] = new THREE.Color(tmpRGBString);

            // Color preIndexLastB
            gWorkColor1.updateColor("rgb", lastR_Value, 1.0, lastB_Value);
            var tmpRGBString = gWorkColor1.get_RGB_String();
            if (doColorblindnessSim)
              tmpRGBString = gWorkColor1.get_RGB_CB_String();
            geometry.faces[geometry.faces.length - 2].vertexColors[1] = new THREE.Color(tmpRGBString);
          }
        }
      } // For loop end (r)
    } // For loop end (g)
  } // For loop end (b)

  geometry.computeFaceNormals();

  var material = new THREE.MeshBasicMaterial({ //new THREE.MeshLambertMaterial( { //new THREE.MeshBasicMaterial( {
    /*side: THREE.DoubleSide,*/
    opacity: planesOpacity,
    premultipliedAlpha: true,
    transparent: true, //
    vertexColors: THREE.VertexColors,
    reflectivity: 0
  });

  var meshRGB = new THREE.Mesh(geometry, material);
  meshRGB.position.x = 0;
  meshRGB.position.y = 0;
  meshRGB.position.z = 0;

  tmpRGBColor.deleteReferences();
  tmpRGBColor = null;

  return meshRGB;
}
