function hsvMesh(){

  var tmpHSV1 = new classColor_HSV(0,0,0);
  var tmpHSV2 = new classColor_HSV(0,0,0);
  var hsvRadius = 200;
  var tmpRGB;

  for (var i = colorspaceGroup.children.length - 1; i >= 0; i--) {
    colorspaceGroup.remove(colorspaceGroup.children[i]);
  }

  var numberParticelsPerCircle = 50;

  var hueSteps = 1.0/numberParticelsPerCircle;

  var linesGeometry = new THREE.BufferGeometry();
  var linesMaterial = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth: 2 } );


  var linesPoints = [];


  var linesIndices = [0,1,2,3,4,5,6,7];


  var linesColors = [];


  ///

  var linesTopCircleVertex = [];
  var linesBottomCircleVertex = [];
  var geometry = new THREE.Geometry();
  var lastColor1;
  var lastColor2;

  for (var hStep = 0; hStep < numberParticelsPerCircle; hStep++) {
    var hueVal = hStep*hueSteps;
    var tmpRad = (hueVal * Math.PI * 2) - Math.PI;
    var xPos = hsvRadius * Math.cos(tmpRad);
    var yPos = hsvRadius * Math.sin(tmpRad);

    linesPoints.push(xPos,yPos,-100);
    linesPoints.push(xPos,yPos,100);

    geometry.vertices.push(new THREE.Vector3(xPos,yPos,-100));
    geometry.vertices.push(new THREE.Vector3(xPos,yPos,100));

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



    linesIndices.push(hStep*2,hStep*2+1);


    if(hStep!=0){
      linesIndices.push(hStep*2,hStep*2-2,hStep*2+1,hStep*2-1);

      geometry.faces.push(new THREE.Face3(hStep*2-1, hStep*2-2, hStep*2));
      geometry.faces.push(new THREE.Face3(hStep*2-1, hStep*2, hStep*2+1 ));

      tmpRGBColor=tmpHSV1.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = tmpRGBColor.calcLMSColor();
        tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
      }
      geometry.faces[geometry.faces.length-2].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

      tmpRGBColor=tmpHSV2.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = tmpRGBColor.calcLMSColor();
        tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
      }
      geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor.getRGBString());

      tmpRGBColor=lastColor1.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = tmpRGBColor.calcLMSColor();
        tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
      }
      geometry.faces[geometry.faces.length-2].vertexColors[1] = new THREE.Color(tmpRGBColor.getRGBString());

      tmpRGBColor=lastColor2.calcRGBColor();
      if(doColorblindnessSim){
        var tmpLMS = tmpRGBColor.calcLMSColor();
        tmpRGBColor = tmpLMS.calcColorBlindRGBColor();
      }
      geometry.faces[geometry.faces.length-2].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());
      geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBColor.getRGBString());


    }

    if(hStep==numberParticelsPerCircle-1){
      linesIndices.push(hStep*2,0,hStep*2+1,1);
    }

    lastColor1= new classColor_HSV(tmpHSV1.set1Value(),tmpHSV1.set2Value(),tmpHSV1.set3Value());
    lastColor2= new classColor_HSV(tmpHSV2.set1Value(),tmpHSV2.set2Value(),tmpHSV2.set3Value());

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
                      /*side: THREE.DoubleSide,
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
