
function rgbMesh(){

  for (var i = colorspaceGroup.children.length - 1; i >= 0; i--) {
    colorspaceGroup.remove(colorspaceGroup.children[i]);
  }

  var linecolor = new THREE.Color(pathplotFontColor);

  var startPos = -128;
  var textPos = 220;
  var arrowEnd = 200;
  var endpos = startPos+255;

  var tmpRGBColor = new class_Color_RGB(0,0,0);
  //////////////////////////////////////////////////////////////////
  // Arrow Labels

    var loader = new THREE.FontLoader();

      loader.load( 'js/libs/ThreeJS/Fonts/helvetiker_regular.typeface.json', function ( font ) {

      var textGeo1 = new THREE.TextGeometry( "R", {
          font: font,
          size: textSize,
          height: textHeight,
          curveSegments: 4,
          bevelThickness: 1,
          bevelSize: 1.0,
          bevelEnabled: true
      } );

      var textGeo2 = new THREE.TextGeometry( "G", {
          font: font,
          size: textSize,
          height: textHeight,
          curveSegments: 4,
          bevelThickness: 1,
          bevelSize: 1.0,
          bevelEnabled: true
      } );

      var textGeo3 = new THREE.TextGeometry( "B", {
          font: font,
          size: textSize,
          height: textHeight,
          curveSegments: 4,
          bevelThickness: 1,
          bevelSize: 1.0,
          bevelEnabled: true
      } );

      var textMaterial = new THREE.MeshPhongMaterial( { color: linecolor } );

      var textR = new THREE.Mesh( textGeo1, textMaterial );
      textR.position.set( textPos, startPos, startPos );

      var textG = new THREE.Mesh( textGeo2, textMaterial );
      textG.position.set( startPos, textPos,  startPos );

      var textB = new THREE.Mesh( textGeo3, textMaterial );
      textB.position.set( startPos, startPos, textPos );

      colorspaceGroup.add( textR );
      colorspaceGroup.add( textG );
      colorspaceGroup.add( textB );

  } );

  /////////////////////////////////////////////////////////////
  //// Arrows

  var from = new THREE.Vector3( endpos, startPos, startPos );
  var to = new THREE.Vector3( arrowEnd, startPos, startPos );
  var direction = to.clone().sub(from);
  var length = direction.length();
  var arrowXCoord = new THREE.ArrowHelper(direction.normalize(), from, length, linecolor );
  colorspaceGroup.add( arrowXCoord );

  from = new THREE.Vector3( startPos, endpos, startPos );
  to = new THREE.Vector3( startPos, arrowEnd,  startPos );
  direction = to.clone().sub(from);
  length = direction.length();
  var arrowYCoord = new THREE.ArrowHelper(direction.normalize(), from, length, linecolor );
  colorspaceGroup.add( arrowYCoord );

  from = new THREE.Vector3( startPos, startPos, endpos );
  to = new THREE.Vector3( startPos, startPos, arrowEnd );
  direction = to.clone().sub(from);
  length = direction.length();
  var arrowZCoord = new THREE.ArrowHelper(direction.normalize(), from, length, linecolor );
  colorspaceGroup.add( arrowZCoord );

  /////////////////////////////////////////////////////////////
  //// Rest Cube

  var linesGeometry = new THREE.BufferGeometry();
  var linesMaterial = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth: 2 } );

  var indices = [];
	var positions = [];
	var colors = [];

  positions.push( endpos, endpos, endpos );  //eee = 0
  positions.push( startPos, endpos, endpos );  //see = 1
  positions.push( endpos, endpos, startPos );  //ees = 2
  positions.push( endpos, startPos, endpos );  //ese = 3

  positions.push( endpos, startPos, startPos );  //ess = 4
  positions.push( startPos, startPos, endpos );  //sse = 5
  positions.push( startPos, endpos, startPos );  //ses = 6
  positions.push( startPos, startPos, startPos );  //sss = 7

  tmpRGBColor.set1Value(1);
  tmpRGBColor.set2Value(1);
  tmpRGBColor.set3Value(1);
  if(doColorblindnessSim){
    var tmpLMS = tmpRGBColor.calcLMSColor();
    tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
  }
  colors.push( tmpRGBColor.get1Value(), tmpRGBColor.get2Value(), tmpRGBColor.get3Value() );

  tmpRGBColor.set1Value(0);
  tmpRGBColor.set2Value(1);
  tmpRGBColor.set3Value(1);
  if(doColorblindnessSim){
    var tmpLMS = tmpRGBColor.calcLMSColor();
    tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
  }
  colors.push( tmpRGBColor.get1Value(), tmpRGBColor.get2Value(), tmpRGBColor.get3Value() );

  tmpRGBColor.set1Value(1);
  tmpRGBColor.set2Value(1);
  tmpRGBColor.set3Value(0);
  if(doColorblindnessSim){
    var tmpLMS = tmpRGBColor.calcLMSColor();
    tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
  }
  colors.push( tmpRGBColor.get1Value(), tmpRGBColor.get2Value(), tmpRGBColor.get3Value() );

  tmpRGBColor.set1Value(1);
  tmpRGBColor.set2Value(0);
  tmpRGBColor.set3Value(1);
  if(doColorblindnessSim){
    var tmpLMS = tmpRGBColor.calcLMSColor();
    tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
  }
  colors.push( tmpRGBColor.get1Value(), tmpRGBColor.get2Value(), tmpRGBColor.get3Value() );

  tmpRGBColor.set1Value(1);
  tmpRGBColor.set2Value(0);
  tmpRGBColor.set3Value(0);
  if(doColorblindnessSim){
    var tmpLMS = tmpRGBColor.calcLMSColor();
    tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
  }
  colors.push( tmpRGBColor.get1Value(), tmpRGBColor.get2Value(), tmpRGBColor.get3Value() );

  tmpRGBColor.set1Value(0);
  tmpRGBColor.set2Value(0);
  tmpRGBColor.set3Value(1);
  if(doColorblindnessSim){
    var tmpLMS = tmpRGBColor.calcLMSColor();
    tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
  }
  colors.push( tmpRGBColor.get1Value(), tmpRGBColor.get2Value(), tmpRGBColor.get3Value() );

  tmpRGBColor.set1Value(0);
  tmpRGBColor.set2Value(1);
  tmpRGBColor.set3Value(0);
  if(doColorblindnessSim){
    var tmpLMS = tmpRGBColor.calcLMSColor();
    tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
  }
  colors.push( tmpRGBColor.get1Value(), tmpRGBColor.get2Value(), tmpRGBColor.get3Value() );

  tmpRGBColor.set1Value(0);
  tmpRGBColor.set2Value(0);
  tmpRGBColor.set3Value(0);
  if(doColorblindnessSim){
    var tmpLMS = tmpRGBColor.calcLMSColor();
    tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
  }
  colors.push( tmpRGBColor.get1Value(), tmpRGBColor.get2Value(), tmpRGBColor.get3Value() );

  indices=[
    6,2, 6,1, 0,2, 0,1, // top rect
    7,5, 7,4, 3,5, 3,4, // bottom rect
    7,6, 5,1, 3,0, 4,2
  ];

  linesGeometry.setIndex( indices );
				linesGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
				linesGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
				linesGeometry.computeBoundingSphere();
				linesMesh = new THREE.LineSegments( linesGeometry, linesMaterial );
				linesMesh.position.x = 0;
				linesMesh.position.y = 0;
        linesMesh.position.z = 0;
        colorspaceGroup.add(linesMesh);

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //

  // vertices
  var numberOfPieces = 5;
  var distance = 255/numberOfPieces;

  var numberOfLine = numberOfPieces+1;
  var numberOfPlane = numberOfLine*numberOfLine;

  var geometry = new THREE.Geometry();


  var indexArray = [];

  for (var b = 0; b <= numberOfPieces; b++) {
    var bPosition = b*distance+startPos;
    for (var g = 0; g <= numberOfPieces; g++) {
      var gPosition = g*distance+startPos;
       for (var r = 0; r <= numberOfPieces; r++){

        indexArray.push(undefined);

        /////////////////////
        /// FRONT
        if(b==0){
            var rPosition = r*distance+startPos;
            geometry.vertices.push(new THREE.Vector3(rPosition, gPosition, bPosition));
            indexArray[indexArray.length-1]=geometry.vertices.length-1;

            // front
            if(g!=0 && r!=0){

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

              var currentIndex = g* numberOfLine +r;
              var preIndex = currentIndex-1;
              var currentIndexLastLoop = (g-1)*numberOfLine +r;
              var preIndexLastLoop = currentIndexLastLoop-1;

              var currentG_Value = g*distance/255;
              var currentR_Value = r*distance/255;
              var lastG_Value = (g-1)*distance/255;
              var lastR_Value = (r-1)*distance/255;


              geometry.faces.push(new THREE.Face3(indexArray[preIndexLastLoop], indexArray[currentIndex], indexArray[preIndex] ));
              geometry.faces.push(new THREE.Face3(indexArray[preIndexLastLoop], indexArray[currentIndexLastLoop], indexArray[currentIndex] ));

              // Color CurrentIndex
              tmpRGBColor.set1Value(currentR_Value);
              tmpRGBColor.set2Value(currentG_Value);
              tmpRGBColor.set3Value(0);
              if(doColorblindnessSim){
                var tmpLMS = tmpRGBColor.calcLMSColor();
                tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
              }
              geometry.faces[geometry.faces.length-2].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());
              geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());

              // Color preIndex
              tmpRGBColor.set1Value(lastR_Value);
              tmpRGBColor.set2Value(currentG_Value);
              tmpRGBColor.set3Value(0);
              if(doColorblindnessSim){
                var tmpLMS = tmpRGBColor.calcLMSColor();
                tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
              }
              geometry.faces[geometry.faces.length-2].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());

              // Color currentIndexLastLoop
              tmpRGBColor.set1Value(currentR_Value);
              tmpRGBColor.set2Value(lastG_Value);
              tmpRGBColor.set3Value(0);
              if(doColorblindnessSim){
                var tmpLMS = tmpRGBColor.calcLMSColor();
                tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
              }
              geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

              // Color preIndexLastLoop
              tmpRGBColor.set1Value(lastR_Value);
              tmpRGBColor.set2Value(lastG_Value);
              tmpRGBColor.set3Value(0);
              if(doColorblindnessSim){
                var tmpLMS = tmpRGBColor.calcLMSColor();
                tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
              }
              geometry.faces[geometry.faces.length-2].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());
              geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());


            }
        }
        else{

          // check the case of adding a vertex to the geometry
          if(b==numberOfPieces || r==0 || r==numberOfPieces || g==0 || g==numberOfPieces)
          {
            var rPosition = r*distance+startPos;
            geometry.vertices.push(new THREE.Vector3(rPosition, gPosition, bPosition));
            indexArray[indexArray.length-1]=geometry.vertices.length-1;
          }


          /////////////////////
          /// Back
          if(b==numberOfPieces && g!=0 && r!=0){
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

            var currentIndex = b*numberOfPlane + g* numberOfLine +r;
            var preIndex = currentIndex-1;
            var currentIndexLastLoop = b*numberOfPlane+(g-1)*numberOfLine +r;
            var preIndexLastLoop = currentIndexLastLoop-1;

            var currentG_Value = g*distance/255;
            var currentR_Value = r*distance/255;
            var lastG_Value = (g-1)*distance/255;
            var lastR_Value = (r-1)*distance/255;


            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastLoop], indexArray[preIndex], indexArray[currentIndex]));
            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastLoop], indexArray[currentIndex], indexArray[currentIndexLastLoop]));

            // Color CurrentIndex
            tmpRGBColor.set1Value(currentR_Value);
            tmpRGBColor.set2Value(currentG_Value);
            tmpRGBColor.set3Value(1);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());
            geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color preIndex
            tmpRGBColor.set1Value(lastR_Value);
            tmpRGBColor.set2Value(currentG_Value);
            tmpRGBColor.set3Value(1);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color currentIndexLastLoop
            tmpRGBColor.set1Value(currentR_Value);
            tmpRGBColor.set2Value(lastG_Value);
            tmpRGBColor.set3Value(1);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color preIndexLastLoop
            tmpRGBColor.set1Value(lastR_Value);
            tmpRGBColor.set2Value(lastG_Value);
            tmpRGBColor.set3Value(1);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());
            geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());

          } // Back end

          /////////////////////
          /// Left Side
          if(r==0 && g!=0){

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


            var currentIndex = b*numberOfPlane + g* numberOfLine;
            var preIndex = b*numberOfPlane + (g-1)* numberOfLine;
            var currentIndexLastB = (b-1)*numberOfPlane+g*numberOfLine;
            var preIndexLastB = (b-1)*numberOfPlane+ (g-1)*numberOfLine;

            var currentG_Value = g*distance/255;
            var currentB_Value = b*distance/255;
            var lastG_Value = (g-1)*distance/255;
            var lastB_Value = (b-1)*distance/255;


            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastB], indexArray[currentIndexLastB], indexArray[currentIndex] ));
            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastB], indexArray[currentIndex], indexArray[preIndex] ));

            // Color CurrentIndex
            tmpRGBColor.set1Value(0);
            tmpRGBColor.set3Value(currentB_Value);
            tmpRGBColor.set2Value(currentG_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());
            geometry.faces[geometry.faces.length-2].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color preIndex
            tmpRGBColor.set1Value(0);
            tmpRGBColor.set3Value(currentB_Value);
            tmpRGBColor.set2Value(lastG_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color currentIndexLastB
            tmpRGBColor.set1Value(0);
            tmpRGBColor.set3Value(lastB_Value);
            tmpRGBColor.set2Value(currentG_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color preIndexLastB
            tmpRGBColor.set1Value(0);
            tmpRGBColor.set3Value(lastB_Value);
            tmpRGBColor.set2Value(lastG_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());
            geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());


          }

          //////////////////////
          /// Right Side
          if(r==numberOfPieces && g!=0){

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


            var currentIndex = b*numberOfPlane + g* numberOfLine+r;
            var preIndex = b*numberOfPlane + (g-1)* numberOfLine+r;
            var currentIndexLastB = (b-1)*numberOfPlane+g*numberOfLine+r;
            var preIndexLastB = (b-1)*numberOfPlane+ (g-1)*numberOfLine+r;

            var currentG_Value = g*distance/255;
            var currentB_Value = b*distance/255;
            var lastG_Value = (g-1)*distance/255;
            var lastB_Value = (b-1)*distance/255;


            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastB], indexArray[currentIndex],indexArray[currentIndexLastB] ));
            geometry.faces.push(new THREE.Face3(indexArray[preIndexLastB], indexArray[preIndex], indexArray[currentIndex] ));

            // Color CurrentIndex
            tmpRGBColor.set1Value(1);
            tmpRGBColor.set3Value(currentB_Value);
            tmpRGBColor.set2Value(currentG_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());
            geometry.faces[geometry.faces.length-2].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color preIndex
            tmpRGBColor.set1Value(1);
            tmpRGBColor.set3Value(currentB_Value);
            tmpRGBColor.set2Value(lastG_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color currentIndexLastB
            tmpRGBColor.set1Value(1);
            tmpRGBColor.set3Value(lastB_Value);
            tmpRGBColor.set2Value(currentG_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color preIndexLastB
            tmpRGBColor.set1Value(1);
            tmpRGBColor.set3Value(lastB_Value);
            tmpRGBColor.set2Value(lastG_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());
            geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());


          }


          /////////////////////
          /// Bottom Side
          if(g==0 && r!=0){
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


            var currentIndex = b*numberOfPlane +r;
            var preIndex = currentIndex-1;
            var currentIndexLastB = (b-1)*numberOfPlane+r;
            var preIndexLastB = currentIndexLastB-1;

            var currentR_Value = r*distance/255;
            var currentB_Value = b*distance/255;
            var lastR_Value = (r-1)*distance/255;
            var lastB_Value = (b-1)*distance/255;


            geometry.faces.push(new THREE.Face3(indexArray[preIndex], indexArray[currentIndexLastB], indexArray[preIndexLastB] ));
            geometry.faces.push(new THREE.Face3(indexArray[preIndex], indexArray[currentIndex], indexArray[currentIndexLastB] ));

            // Color CurrentIndex
            tmpRGBColor.set2Value(0);
            tmpRGBColor.set3Value(currentB_Value);
            tmpRGBColor.set1Value(currentR_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color preIndex
            tmpRGBColor.set2Value(0);
            tmpRGBColor.set3Value(currentB_Value);
            tmpRGBColor.set1Value(lastR_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());
            geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color currentIndexLastB
            tmpRGBColor.set2Value(0);
            tmpRGBColor.set3Value(lastB_Value);
            tmpRGBColor.set1Value(currentR_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());
            geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color preIndexLastB
            tmpRGBColor.set2Value(0);
            tmpRGBColor.set3Value(lastB_Value);
            tmpRGBColor.set1Value(lastR_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());
          }

          /////////////////////
          /// Top Side
          if(g==numberOfPieces&& r!=0){
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


            var currentIndex = b*numberOfPlane+ g* numberOfLine +r;
            var preIndex = currentIndex-1;
            var currentIndexLastB = (b-1)*numberOfPlane+ g* numberOfLine +r;
            var preIndexLastB = currentIndexLastB-1;

            var currentR_Value = r*distance/255;
            var currentB_Value = b*distance/255;
            var lastR_Value = (r-1)*distance/255;
            var lastB_Value = (b-1)*distance/255;


            geometry.faces.push(new THREE.Face3(indexArray[preIndex], indexArray[preIndexLastB],indexArray[currentIndexLastB] ));
            geometry.faces.push(new THREE.Face3(indexArray[preIndex], indexArray[currentIndexLastB], indexArray[currentIndex] ));

            // Color CurrentIndex
            tmpRGBColor.set2Value(1);
            tmpRGBColor.set3Value(currentB_Value);
            tmpRGBColor.set1Value(currentR_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color preIndex
            tmpRGBColor.set2Value(1);
            tmpRGBColor.set3Value(currentB_Value);
            tmpRGBColor.set1Value(lastR_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());
            geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color currentIndexLastB
            tmpRGBColor.set2Value(1);
            tmpRGBColor.set3Value(lastB_Value);
            tmpRGBColor.set1Value(currentR_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());
            geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

            // Color preIndexLastB
            tmpRGBColor.set2Value(1);
            tmpRGBColor.set3Value(lastB_Value);
            tmpRGBColor.set1Value(lastR_Value);
            if(doColorblindnessSim){
              var tmpLMS = tmpRGBColor.calcLMSColor();
              tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
            }
            geometry.faces[geometry.faces.length-2].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

          }


        }


      } // For loop end (r)
    } // For loop end (g)
  } // For loop end (b)

  geometry.computeFaceNormals();



        var material = new THREE.MeshBasicMaterial( {//new THREE.MeshLambertMaterial( { //new THREE.MeshBasicMaterial( {
                /*side: THREE.DoubleSide,*/
                opacity: 0.5,
      					premultipliedAlpha: true,
      					transparent: true, //
								vertexColors: THREE.VertexColors,
								reflectivity: 0,
								reflectionCube : null
							} );



  var meshRGB = new THREE.Mesh(geometry, material);
  meshRGB.position.x = 0;
  meshRGB.position.y = 0;
  meshRGB.position.z = 0;
  colorspaceGroup.add(meshRGB);



}
