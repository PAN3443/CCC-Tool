function lmsMesh(colorspaceGroup){
  for (var i = colorspaceGroup.children.length - 1; i >= 0; i--) {
    colorspaceGroup.remove(colorspaceGroup.children[i]);
  }

  var linecolor = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--main-font-color'));

  var startPos = 0;
  var textPos = 120;
  var arrowEnd = 110;
  var endpos = 100;

  //////////////////////////////////////////////////////////////////
  // Arrow Labels

    var loader = new THREE.FontLoader();

      loader.load( 'js_v_0_9/libs/ThreeJS/Fonts/helvetiker_regular.typeface.json', function ( font ) {

      var parameter = {
          font: font,
          size: 25,
          height: 5,
          curveSegments: 10,
          bevelThickness: 0.1,
          bevelSize: 1.0,
          bevelEnabled: true
      };

      var textMaterial = new THREE.MeshPhongMaterial( { color: linecolor } );

      var textL = new THREE.Mesh( new THREE.TextGeometry( "L", parameter), textMaterial );
      textL.position.set( textPos, startPos, startPos );

      var textM = new THREE.Mesh( new THREE.TextGeometry( "M", parameter), textMaterial );
      textM.position.set( startPos, textPos,  startPos );

      var textS = new THREE.Mesh( new THREE.TextGeometry( "S", parameter), textMaterial );
      textS.position.set( startPos, startPos, textPos );

      colorspaceGroup.add( textL );
      colorspaceGroup.add( textM );
      colorspaceGroup.add( textS );

  } );

  /////////////////////////////////////////////////////////////
  //// Arrows

  var from = new THREE.Vector3( startPos, startPos, startPos );
  var to = new THREE.Vector3( arrowEnd, startPos, startPos );
  var direction = to.clone().sub(from);
  var length = direction.length();
  var arrowXCoord = new THREE.ArrowHelper(direction.normalize(), from, length, linecolor );
  colorspaceGroup.add( arrowXCoord );

  from = new THREE.Vector3( startPos, startPos, startPos );
  to = new THREE.Vector3( startPos, arrowEnd,  startPos );
  direction = to.clone().sub(from);
  length = direction.length();
  var arrowYCoord = new THREE.ArrowHelper(direction.normalize(), from, length, linecolor );
  colorspaceGroup.add( arrowYCoord );

  from = new THREE.Vector3( startPos, startPos, startPos );
  to = new THREE.Vector3( startPos, startPos, arrowEnd );
  direction = to.clone().sub(from);
  length = direction.length();
  var arrowZCoord = new THREE.ArrowHelper(direction.normalize(), from, length, linecolor );
  colorspaceGroup.add( arrowZCoord );


  if(positionsLMS.length!=0){
        var meshArray = lms3DMesh();
        /*colorspaceGroup.add(meshArray[0]);
        colorspaceGroup.add(meshArray[1]);*/
  }

  return colorspaceGroup;
}

function lms3DMesh(){
  var tmpRGB;

  var linesGeometry = new THREE.BufferGeometry();
  var linesMaterial = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth: 1, transparent: true, opacity: lineOpacity, } );
  var linesPoints = [];
  var linesIndices = [];
  var linesColors = [];

  var geometry = new THREE.Geometry();

  var pointIndices =  [];
  var tmpRGBcolors =  [];

  /////////////////////////////////////////////////
  /// 1. Step add Vertices and Colors to Array
  for (var i = 0; i < positionsLMS.length-1; i++) {
    var lPos = i*lms3D_lmsStep;
    var l_indicesRow = [];
    for (var j = 0; j < positionsLMS[i].length-1; j++) {
      var mPos = j*lms3D_lmsStep;
      var m_indicesRow = [];
      for (var k = 0; k < positionsLMS[i][j].length-1; k++) {
        var sPos = k*lms3D_lmsStep;

        var tmpIndex = undefined;
        var tmpRGB = undefined;
        if(positionsLMS[i][j][k]){
          var tmpLMS = new class_Color_LMS(lPos,mPos,sPos);
          if(doColorblindnessSim){
            tmpRGB = tmpLMS.calcColorBlindRGBColor();
          }
          else {
            tmpRGB = tmpLMS.calcRGBColor();
          }
          geometry.vertices.push(new THREE.Vector3(lPos,mPos,sPos));
          tmpRGBcolors.push(tmpRGB);
          tmpIndex=geometry.vertices.length-1;
        }
        m_indicesRow.push(tmpIndex);
      }
      l_indicesRow.push(m_indicesRow);
    }
    pointIndices.push(l_indicesRow);
  }

  /////////////////////////////////////////////////
  /// 2. Step create Faces and Lines (Marching Cubes)
  for (var i = 0; i < positionsLMS.length-2; i++) {
    for (var j = 0; j < positionsLMS[i].length-2; j++) {
      for (var k = 0; k < positionsLMS[i][j].length-2; k++) {


        switch (lms3D_countTrueEdges(i,j,k)) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 8:
            // do nothing
          break;
          case 4:
              /////////////////////////////////////
              //// Check if plane
                switch (lms_DefinePlaneType(i,j,k)) {
                case "top":
                geometry.faces.push(new THREE.Face3(pointIndices[i][j+1][k], pointIndices[i][j+1][k+1], pointIndices[i+1][j+1][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j+1][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                geometry.faces.push(new THREE.Face3(pointIndices[i][j+1][k], pointIndices[i+1][j+1][k+1], pointIndices[i+1][j+1][k]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j+1][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k]].getRGBString());
                break;
                case "bottom":
                geometry.faces.push(new THREE.Face3(pointIndices[i][j][k], pointIndices[i+1][j][k+1], pointIndices[i][j][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j][k+1]].getRGBString());
                geometry.faces.push(new THREE.Face3(pointIndices[i][j][k], pointIndices[i+1][j][k], pointIndices[i+1][j][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k+1]].getRGBString());
                break;
                case "front":
                geometry.faces.push(new THREE.Face3(pointIndices[i][j][k], pointIndices[i][j+1][k], pointIndices[i+1][j+1][k]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k]].getRGBString());
                geometry.faces.push(new THREE.Face3(pointIndices[i][j][k], pointIndices[i+1][j+1][k], pointIndices[i+1][j][k]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k]].getRGBString());
                break;
                case "back":
                geometry.faces.push(new THREE.Face3(pointIndices[i][j][k+1], pointIndices[i+1][j+1][k+1], pointIndices[i][j+1][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                geometry.faces.push(new THREE.Face3(pointIndices[i][j][k+1], pointIndices[i+1][j][k+1], pointIndices[i+1][j+1][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                break;
                case "left":
                geometry.faces.push(new THREE.Face3(pointIndices[i][j][k+1], pointIndices[i][j+1][k], pointIndices[i][j+1][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                geometry.faces.push(new THREE.Face3(pointIndices[i][j][k+1], pointIndices[i][j+1][k+1], pointIndices[i][j][k]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j][k]].getRGBString());
                break;
                case "right":
                geometry.faces.push(new THREE.Face3(pointIndices[i+1][j][k], pointIndices[i+1][j+1][k], pointIndices[i+1][j+1][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i+1][j][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                geometry.faces.push(new THREE.Face3(pointIndices[i+1][j][k], pointIndices[i+1][j+1][k+1], pointIndices[i+1][j][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i+1][j][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k+1]].getRGBString());
                break;
              }
          break;
          case 5:
            /////////////////////////////////////
            //// Check if plane
              switch (lms_DefinePlaneType(i,j,k)) {
                case "top":
                switch (true) {
                  case positionsLMS[i][j][k+1]:
                    geometry.faces.push(new THREE.Face3(pointIndices[i][j+1][k], pointIndices[i][j][k+1], pointIndices[i+1][j+1][k+1]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j+1][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j][k+1]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                    geometry.faces.push(new THREE.Face3(pointIndices[i][j+1][k], pointIndices[i+1][j+1][k+1], pointIndices[i+1][j+1][k]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j+1][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k]].getRGBString());
                  break;
                  case positionsLMS[i+1][j][k]:
                    geometry.faces.push(new THREE.Face3(pointIndices[i][j+1][k], pointIndices[i][j+1][k+1], pointIndices[i+1][j+1][k+1]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j+1][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                    geometry.faces.push(new THREE.Face3(pointIndices[i][j+1][k], pointIndices[i+1][j+1][k+1], pointIndices[i+1][j][k]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j+1][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k]].getRGBString());
                  break;
                  case positionsLMS[i][j][k]:
                    geometry.faces.push(new THREE.Face3(pointIndices[i+1][j+1][k], pointIndices[i][j][k], pointIndices[i][j+1][k+1]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i+1][j+1][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                    geometry.faces.push(new THREE.Face3(pointIndices[i+1][j+1][k], pointIndices[i][j+1][k+1], pointIndices[i+1][j+1][k+1]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i+1][j+1][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                  break;
                  case positionsLMS[i+1][j][k+1]:
                    geometry.faces.push(new THREE.Face3(pointIndices[i+1][j+1][k], pointIndices[i][j+1][k], pointIndices[i][j+1][k+1]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i+1][j+1][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                    geometry.faces.push(new THREE.Face3(pointIndices[i+1][j+1][k], pointIndices[i][j+1][k+1], pointIndices[i+1][j][k+1]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i+1][j+1][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k+1]].getRGBString());
                  break;
                }
                break;
                case "bottom":
                  switch (true) {
                    case positionsLMS[i][j+1][k+1]:
                    geometry.faces.push(new THREE.Face3(pointIndices[i][j][k], pointIndices[i+1][j][k+1], pointIndices[i][j+1][k+1]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k+1]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                    geometry.faces.push(new THREE.Face3(pointIndices[i][j][k], pointIndices[i+1][j][k], pointIndices[i+1][j][k+1]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k+1]].getRGBString());
                    break;
                    case positionsLMS[i+1][j+1][k]:
                    geometry.faces.push(new THREE.Face3(pointIndices[i][j][k], pointIndices[i+1][j][k+1], pointIndices[i][j][k+1]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k+1]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j][k+1]].getRGBString());
                    geometry.faces.push(new THREE.Face3(pointIndices[i][j][k], pointIndices[i+1][j+1][k], pointIndices[i+1][j][k+1]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k+1]].getRGBString());
                    break;
                    case [i+1][j+1][k+1]:
                    geometry.faces.push(new THREE.Face3(pointIndices[i+1][j][k], pointIndices[i][j][k+1], pointIndices[i][j][k]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i+1][j][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j][k+1]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j][k]].getRGBString());
                    geometry.faces.push(new THREE.Face3(pointIndices[i+1][j][k], pointIndices[i+1][j+1][k+1], pointIndices[i][j][k+1]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i+1][j][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j][k+1]].getRGBString());
                    break;
                    case positionsLMS[i][j+1][k]:
                    geometry.faces.push(new THREE.Face3(pointIndices[i+1][j][k], pointIndices[i][j][k+1], pointIndices[i][j+1][k]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i+1][j][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j][k+1]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k]].getRGBString());
                    geometry.faces.push(new THREE.Face3(pointIndices[i+1][j][k], pointIndices[i+1][j][k+1], pointIndices[i][j][k+1]));
                    geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i+1][j][k]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k+1]].getRGBString());
                    geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j][k+1]].getRGBString());
                    break;
                  }
                break;
                case "front":
                switch (true) {
                  case positionsLMS:
                  geometry.faces.push(new THREE.Face3(pointIndices[i][j][k], pointIndices[i][j+1][k], pointIndices[i+1][j+1][k]));
                  geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k]].getRGBString());
                  geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k]].getRGBString());
                  geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k]].getRGBString());
                  geometry.faces.push(new THREE.Face3(pointIndices[i][j][k], pointIndices[i+1][j+1][k], pointIndices[i+1][j][k]));
                  geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k]].getRGBString());
                  geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k]].getRGBString());
                  geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k]].getRGBString());
                  break;
                  case positionsLMS:
                  geometry.faces.push(new THREE.Face3(pointIndices[i][j][k], pointIndices[i][j+1][k], pointIndices[i+1][j+1][k]));
                  geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k]].getRGBString());
                  geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k]].getRGBString());
                  geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k]].getRGBString());
                  geometry.faces.push(new THREE.Face3(pointIndices[i][j][k], pointIndices[i+1][j+1][k], pointIndices[i+1][j][k]));
                  geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k]].getRGBString());
                  geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k]].getRGBString());
                  geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k]].getRGBString());
                  break;
                  case positionsLMS:

                  break;
                  case positionsLMS:

                  break;
                }

                // 1 : [i][j][k]
                // 2 : [i][j+1][k]
                // 3 : [i][j][k+1]
                // 4 : [i][j+1][k+1]
                // 5 : [i+1][j][k]
                // 6 : [i+1][j+1][k]
                // 7 : [i+1][j][k+1]
                // 8 : [i+1][j+1][k+1]

                break;
                case "back":
                switch (true) {
                  case positionsLMS:
                  break;
                  case positionsLMS:

                  break;
                  case positionsLMS:

                  break;
                  case positionsLMS:

                  break;
                }
                geometry.faces.push(new THREE.Face3(pointIndices[i][j][k+1], pointIndices[i+1][j+1][k+1], pointIndices[i][j+1][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                geometry.faces.push(new THREE.Face3(pointIndices[i][j][k+1], pointIndices[i+1][j][k+1], pointIndices[i+1][j+1][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                break;
                case "left":
                switch (true) {
                  case positionsLMS:
                  break;
                  case positionsLMS:

                  break;
                  case positionsLMS:

                  break;
                  case positionsLMS:

                  break;
                }
                geometry.faces.push(new THREE.Face3(pointIndices[i][j][k+1], pointIndices[i][j+1][k], pointIndices[i][j+1][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                geometry.faces.push(new THREE.Face3(pointIndices[i][j][k+1], pointIndices[i][j+1][k+1], pointIndices[i][j][k]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i][j][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i][j+1][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i][j][k]].getRGBString());
                break;
                case "right":
                switch (true) {
                  case positionsLMS:
                  break;
                  case positionsLMS:

                  break;
                  case positionsLMS:

                  break;
                  case positionsLMS:

                  break;
                }
                geometry.faces.push(new THREE.Face3(pointIndices[i+1][j][k], pointIndices[i+1][j+1][k], pointIndices[i+1][j+1][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i+1][j][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                geometry.faces.push(new THREE.Face3(pointIndices[i+1][j][k], pointIndices[i+1][j+1][k+1], pointIndices[i+1][j][k+1]));
                geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[i+1][j][k]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j+1][k+1]].getRGBString());
                geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[i+1][j][k+1]].getRGBString());
                break;
              }
          break;

          }

          // 1 : positionsLMS[i][j][k]
          // 2 : positionsLMS[i][j+1][k]
          // 3 : positionsLMS[i][j][k+1]
          // 4 : positionsLMS[i][j+1][k+1]
          // 5 : positionsLMS[i+1][j][k]
          // 6 : positionsLMS[i+1][j+1][k]
          // 7 : positionsLMS[i+1][j][k+1]
          // 8 : positionsLMS[i+1][j+1][k+1]

          /*
          geometry.faces.push(new THREE.Face3(pointIndices[???][???][???], pointIndices[???][???][???], pointIndices[???][???][???]));
          geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[???][???][???]].getRGBString());
          geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[???][???][???]].getRGBString());
          geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[???][???][???]].getRGBString());
          geometry.faces.push(new THREE.Face3(pointIndices[???][???][???], pointIndices[???][???][???], pointIndices[???][???][???]));
          geometry.faces[geometry.faces.length-1].vertexColors[0] = new THREE.Color(tmpRGBcolors[pointIndices[???][???][???]].getRGBString());
          geometry.faces[geometry.faces.length-1].vertexColors[1] = new THREE.Color(tmpRGBColor[pointIndices[???][???][???]].getRGBString());
          geometry.faces[geometry.faces.length-1].vertexColors[2] = new THREE.Color(tmpRGBColor[pointIndices[???][???][???]].getRGBString());
          */
        }
      }
    }


      geometry.computeFaceNormals();

      /*linesGeometry.setIndex( linesIndices );
      linesGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( linesPoints, 3 ) );
      linesGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( linesColors, 3 ) );
      linesGeometry.computeBoundingSphere();
      var linesMesh = new THREE.LineSegments( linesGeometry, linesMaterial );
      linesMesh.position.x = 0;
      linesMesh.position.y = 0;
      linesMesh.position.z = 0;*/

      var material = new THREE.MeshBasicMaterial( {
                    /*side: THREE.DoubleSide,*/
                    opacity: planesOpacity,
                    premultipliedAlpha: true,
                    transparent: true, //*/
                    vertexColors: THREE.VertexColors,
                    reflectivity: 0
                  } );


      var meshLMS = new THREE.Mesh(geometry, material);
      meshLMS.position.x = 0;
      meshLMS.position.y = 0;
      meshLMS.position.z = 0;

      /////////////////////////////////////////////////
      // delete Colors
      for (var i = 0; i < tmpRGBcolors.length; i++) {
        tmpRGBcolors[i].deleteReferences();
      }
      tmpRGBcolors=[];

      return [undefined,meshLMS];//[linesMesh,meshLMS];
}


function lms3D_countTrueEdges(i,j,k){
  var counter = 0;

  if(positionsLMS[i][j][k])
    counter++;
  if(positionsLMS[i][j+1][k])
    counter++;
  if(positionsLMS[i][j][k+1])
    counter++;
  if(positionsLMS[i][j+1][k+1])
    counter++;
  if(positionsLMS[i+1][j][k])
    counter++;
  if(positionsLMS[i+1][j+1][k])
    counter++;
  if(positionsLMS[i+1][j][k+1])
    counter++;
  if(positionsLMS[i+1][j+1][k+1])
    counter++;

  return counter;
}


function lms_DefinePlaneType(i,j,k){
  if(positionsLMS[i][j+1][k] && positionsLMS[i][j+1][k+1] && positionsLMS[i+1][j+1][k+1] && positionsLMS[i+1][j+1][k]){
    return "top";

  if(positionsLMS[i][j][k] && positionsLMS[i+1][j][k+1] && positionsLMS[i][j][k+1] && positionsLMS[i+1][j][k+1])
    return "bottom"

  if(positionsLMS[i][j][k] && positionsLMS[i][j+1][k] && positionsLMS[i+1][j+1][k] && positionsLMS[i+1][j][k])
    return "front"

  if(positionsLMS[i][j][k+1] && positionsLMS[i+1][j+1][k+1] && positionsLMS[i][j+1][k+1] && positionsLMS[i+1][j+1][k+1])
      return "back";

  if(positionsLMS[i][j][k+1] && positionsLMS[i][j+1][k] && positionsLMS[i][j+1][k+1] && positionsLMS[i][j][k])
    return "left";

  if(positionsLMS[i+1][j][k] && positionsLMS[i+1][j+1][k] && positionsLMS[i+1][j+1][k+1] && positionsLMS[i+1][j][k+1])
    return "right";

  return undefined;
}
