function hsvMesh(){

  var tmpHSV1 = new classColor_HSV(0,0,0);
  var tmpHSV2 = new classColor_HSV(0,0,0);
  var tmpRGB;

  for (var i = colorspaceGroup.children.length - 1; i >= 0; i--) {
    colorspaceGroup.remove(colorspaceGroup.children[i]);
  }

  var numberParticelsPerCircle = 50;
  var stepForLine = 5;

  var hueSteps = 1.0/numberParticelsPerCircle;

  var linesGeometry = new THREE.BufferGeometry();
  var linesMaterial = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth: 2 } );
  var linesPoints = [];
  var linesIndices = [];
  var linesColors = [];


  ///

  var linesTopCircleVertex = [];
  var linesBottomCircleVertex = [];
  var geometry = new THREE.Geometry();
  var lastColor1;
  var lastColor2;
  var firstColor1;
  var firstColor2;

  geometry.vertices.push(new THREE.Vector3(0,vStart3D,0));
  geometry.vertices.push(new THREE.Vector3(0,vEnd3D,0));

  for (var hStep = 0; hStep < numberParticelsPerCircle; hStep++) {
    var hueVal = hStep*hueSteps;
    var tmpRad = (hueVal * Math.PI * 2) - Math.PI;
    var xPos = hsv3DRadius * Math.cos(tmpRad);
    var zPos = hsv3DRadius * Math.sin(tmpRad);

    linesPoints.push(xPos,vStart3D,zPos);
    linesPoints.push(xPos,vEnd3D,zPos);

    geometry.vertices.push(new THREE.Vector3(xPos,vStart3D,zPos));
    geometry.vertices.push(new THREE.Vector3(xPos,vEnd3D,zPos));

    tmpHSV1.set1Value(hueVal);
    tmpHSV1.set2Value(1.0);
    tmpHSV1.set3Value(0);
    tmpRGB = tmpHSV1.calcRGBColor();
    if(doColorblindnessSim){
      var tmpLMS = tmpRGBColor.calcLMSColor();
      tmpRGB = tmpLMS.calcColorBlindRGBColor();
    }

    linesColors.push( tmpRGB.get1Value(), tmpRGB.get2Value(), tmpRGB.get3Value() );
    tmpHSV2.set1Value(hueVal);
    tmpHSV2.set2Value(1.0);
    tmpHSV2.set3Value(1);
    tmpRGB = tmpHSV2.calcRGBColor();
    if(doColorblindnessSim){
      var tmpLMS = tmpRGBColor.calcLMSColor();
      tmpRGB = tmpLMS.calcColorBlindRGBColor();
    }

    linesColors.push( tmpRGB.get1Value(), tmpRGB.get2Value(), tmpRGB.get3Value() );


    if(hStep%stepForLine==0)
    linesIndices.push(hStep*2,hStep*2+1);


    if(hStep!=0){
      linesIndices.push(hStep*2,hStep*2-2,hStep*2+1,hStep*2-1);

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

      var currentIndex1 = hStep*2+2;
      var currentIndex2 = hStep*2+3;
      var lastIndex1 = hStep*2;
      var lastIndex2 = hStep*2+1;

      // top bottom
      geometry.faces.push(new THREE.Face3(currentIndex1, lastIndex1, 0));
      geometry.faces.push(new THREE.Face3(currentIndex2,  1, lastIndex2 ));
      geometry.faces[geometry.faces.length-2].vertexColors[2] = new THREE.Color("rgb(0,0,0)");
      geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color("rgb(255,255,255)");

      // side
      geometry.faces.push(new THREE.Face3(currentIndex1, currentIndex2, lastIndex2));
      geometry.faces.push(new THREE.Face3(currentIndex1, lastIndex2, lastIndex1 ));

      // Color currentIndex1
      tmpRGBColor=tmpHSV1.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = tmpRGBColor.calcLMSColor();
        tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
      }
      geometry.faces[geometry.faces.length-2].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-4].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());

      // Color currentIndex2
      tmpRGBColor=tmpHSV2.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = tmpRGBColor.calcLMSColor();
        tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
      }
      geometry.faces[geometry.faces.length-2].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-3].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());

      // Color lastIndex1
      tmpRGBColor=lastColor1.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = tmpRGBColor.calcLMSColor();
        tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
      }
      geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-4].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

      // Color lastIndex2
      tmpRGBColor=lastColor2.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = tmpRGBColor.calcLMSColor();
        tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
      }
      geometry.faces[geometry.faces.length-2].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-3].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());



    }
    else {
      firstColor1= new classColor_HSV(tmpHSV1.get1Value(),tmpHSV1.get2Value(),tmpHSV1.get3Value());
      firstColor2= new classColor_HSV(tmpHSV2.get1Value(),tmpHSV2.get2Value(),tmpHSV2.get3Value());
    }

    if(hStep==numberParticelsPerCircle-1){
      linesIndices.push(hStep*2,0,hStep*2+1,1);


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

      var currentIndex1 = hStep*2+2;
      var currentIndex2 = hStep*2+3;
      var firstIndex1 = 2;
      var firstIndex2 = 3;

      // top bottom
      geometry.faces.push(new THREE.Face3(firstIndex1, currentIndex1, 0));
      geometry.faces.push(new THREE.Face3(firstIndex2,  1, currentIndex2 ));
      geometry.faces[geometry.faces.length-2].vertexColors[2] = new THREE.Color("rgb(0,0,0)");
      geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color("rgb(255,255,255)");

      // side
      geometry.faces.push(new THREE.Face3(firstIndex1, firstIndex2, currentIndex2));
      geometry.faces.push(new THREE.Face3(firstIndex1, currentIndex2, currentIndex1 ));

      // Color firstIndex1
      tmpRGBColor=firstColor1.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = tmpRGBColor.calcLMSColor();
        tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
      }
      geometry.faces[geometry.faces.length-2].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-4].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());

      // Color firstIndex2
      tmpRGBColor=firstColor2.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = tmpRGBColor.calcLMSColor();
        tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
      }
      geometry.faces[geometry.faces.length-2].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-3].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());

      // Color currentIndex1
      tmpRGBColor=tmpHSV1.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = tmpRGBColor.calcLMSColor();
        tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
      }
      geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-4].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

      // Color currentIndex2
      tmpRGBColor=tmpHSV2.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = tmpRGBColor.calcLMSColor();
        tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
      }
      geometry.faces[geometry.faces.length-2].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-3].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());
    }

    lastColor1= new classColor_HSV(tmpHSV1.get1Value(),tmpHSV1.get2Value(),tmpHSV1.get3Value());
    lastColor2= new classColor_HSV(tmpHSV2.get1Value(),tmpHSV2.get2Value(),tmpHSV2.get3Value());

  }



  linesGeometry.setIndex( linesIndices );
        linesGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( linesPoints, 3 ) );
        linesGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( linesColors, 3 ) );
        linesGeometry.computeBoundingSphere();
        var linesMesh = new THREE.LineSegments( linesGeometry, linesMaterial );
        linesMesh.position.x = 0;
        linesMesh.position.y = 0;
        linesMesh.position.z = 0;
        colorspaceGroup.add(linesMesh);


        geometry.computeFaceNormals();



        var material = new THREE.MeshBasicMaterial( {
                      /*side: THREE.DoubleSide,*/
                      opacity: 0.5,
            					premultipliedAlpha: true,
            					transparent: true, //*/
      								vertexColors: THREE.VertexColors,
      								reflectivity: 0,
      								reflectionCube : null
      							} );



        var meshHSV = new THREE.Mesh(geometry, material);
        meshHSV.position.x = 0;
        meshHSV.position.y = 0;
        meshHSV.position.z = 0;
        colorspaceGroup.add(meshHSV);

}
