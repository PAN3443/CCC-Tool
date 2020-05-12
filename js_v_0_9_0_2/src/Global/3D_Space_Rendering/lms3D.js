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

      loader.load( "../../"+version_JS_FolderName+'/libs/ThreeJS/Fonts/helvetiker_regular.typeface.json', function ( font ) {

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
        colorspaceGroup.add(meshArray[0]);
        colorspaceGroup.add(meshArray[1]);
  }

  return colorspaceGroup;
}

function lms3DMesh(){
  var tmpRGB;

  var linesGeometry = new THREE.BufferGeometry();
  var linesMaterial = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors, linewidth: 1, transparent: true, opacity: lineOpacity, } );
  lms_linesPoints = [];
  lms_linesIndices = [];
  lms_linesColors = [];

  lmsGeometry = new THREE.Geometry();

  lms_pointIndices =  [];
  for (var i = 0; i < positionsLMS.length-1; i++) {
    var l_indicesRow = [];
    for (var j = 0; j < positionsLMS[i].length-1; j++) {
      var m_indicesRow = [];
      for (var k = 0; k < positionsLMS[i][j].length-1; k++) {
        m_indicesRow.push(undefined);
      }
      l_indicesRow.push(m_indicesRow);
    }
    lms_pointIndices.push(l_indicesRow);
  }
  lms_colorArray =  [];

  /////////////////////////////////////////////////
  /// 1. Step add Vertices and Colors to Array
  for (var i = 0; i < positionsLMS.length-1; i++) {
    for (var j = 0; j < positionsLMS[i].length-1; j++) {
      for (var k = 0; k < positionsLMS[i][j].length-1; k++) {

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
                lmsGeometry.faces.push(lms_createFace(i,j+1,k, i,j+1,k+1, i+1,j+1,k+1,true,false,true));
                lmsGeometry.faces.push(lms_createFace(i,j+1,k, i+1,j+1,k+1, i+1,j+1,k,false,true,true));
                break;
                case "bottom":
                lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j,k+1, i,j,k+1,false,true,true));
                lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j,k, i+1,j,k+1,true,false,true));
                break;
                case "front":
                lmsGeometry.faces.push(lms_createFace(i,j,k, i,j+1,k, i+1,j+1,k,true,false,true));
                lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j+1,k, i+1,j,k,false,true,true));
                break;
                case "back":
                lmsGeometry.faces.push(lms_createFace(i,j,k+1, i+1,j+1,k+1, i,j+1,k+1,false,true,true));
                lmsGeometry.faces.push(lms_createFace(i,j,k+1, i+1,j,k+1, i+1,j+1,k+1,true,false,true));
                break;
                case "left":
                lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j+1,k+1, i,j+1,k,true,false,true));
                lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j+1,k, i,j,k,false,true,true));
                break;
                case "right":
                lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j+1,k, i+1,j+1,k+1,true,false,true));
                lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j+1,k+1, i+1,j,k+1,false,true,true));
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
                    lmsGeometry.faces.push(lms_createFace(i,j+1,k, i,j,k+1, i+1,j+1,k+1,true,true,true));
                    lmsGeometry.faces.push(lms_createFace(i,j+1,k, i+1,j+1,k+1, i+1,j+1,k,true,true,true));
                  break;
                  case positionsLMS[i+1][j][k]:
                    lmsGeometry.faces.push(lms_createFace(i,j+1,k, i,j+1,k+1, i+1,j+1,k+1,true,true,true));
                    lmsGeometry.faces.push(lms_createFace(i,j+1,k, i+1,j+1,k+1, i+1,j,k,true,true,true));
                  break;
                  case positionsLMS[i][j][k]:
                    lmsGeometry.faces.push(lms_createFace(i+1,j+1,k, i,j,k, i,j+1,k+1,true,true,true));
                    lmsGeometry.faces.push(lms_createFace(i+1,j+1,k, i,j+1,k+1, i+1,j+1,k+1,true,true,true));
                  break;
                  case positionsLMS[i+1][j][k+1]:
                    lmsGeometry.faces.push(lms_createFace(i+1,j+1,k, i,j+1,k, i,j+1,k+1,true,true,true));
                    lmsGeometry.faces.push(lms_createFace(i+1,j+1,k, i,j+1,k+1, i+1,j,k+1,true,true,true));
                  break;
                }
                break;
                case "bottom":
                  switch (true) {
                    case positionsLMS[i][j+1][k+1]:
                    lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j,k+1, i,j+1,k+1,true,true,true));
                    lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j,k, i+1,j,k+1,true,true,true));
                    break;
                    case positionsLMS[i+1][j+1][k]:
                    lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j,k+1, i,j,k+1,true,true,true));
                    lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j+1,k, i+1,j,k+1,true,true,true));
                    break;
                    case positionsLMS[i+1][j+1][k+1]:
                    lmsGeometry.faces.push(lms_createFace(i+1,j,k, i,j,k+1, i,j,k,true,true,true));
                    lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j+1,k+1, i,j,k+1,true,true,true));
                    break;
                    case positionsLMS[i][j+1][k]:
                    lmsGeometry.faces.push(lms_createFace(i+1,j,k, i,j,k+1, i,j+1,k,true,true,true));
                    lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j,k+1, i,j,k+1,true,true,true));
                    break;
                  }
                break;
                case "front":
                switch (true) {
                  case positionsLMS[i][j+1][k+1]:
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i,j+1,k+1, i+1,j+1,k,true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j+1,k, i+1,j,k,true,true,true));
                  break;
                  case positionsLMS [i+1][j][k+1]:
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i,j+1,k, i+1,j+1,k,true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j+1,k, i+1,j,k+1,true,true,true));
                  break;
                  case positionsLMS[i][j][k+1]:
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i,j+1,k, i+1,j+1,k,true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i,j,k+1, i,j+1,k,true,true,true));
                  break;
                  case positionsLMS[i+1][j+1][k+1]:
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i,j+1,k, i+1,j+1,k+1,true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i,j,k, i,j+1,k,true,true,true));
                  break;
                }
                break;
                case "back":
                switch (true) {
                  case positionsLMS[i][j+1][k]:
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i+1,j+1,k+1, i,j+1,k,true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i+1,j,k+1, i+1,j+1,k+1,true,true,true));
                  break;
                  case positionsLMS[i+1][j][k]:
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i+1,j+1,k+1, i,j+1,k+1,true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i+1,j,k, i+1,j+1,k+1,true,true,true));
                  break;
                  case positionsLMS[i+1][j+1][k]:
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k+1, i+1,j+1,k, i,j+1,k+1,true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k+1, i,j+1,k+1, i,j,k+1,true,true,true));
                  break;
                  case positionsLMS[i][j][k]:
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k+1, i+1,j+1,k+1, i,j+1,k+1,true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k+1, i,j+1,k+1, i,j,k,true,true,true));
                  break;
                }
                break;
                case "left":
                switch (true) {
                  case positionsLMS[i+1][j+1][k+1]:
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i+1,j+1,k+1, i,j+1,k, true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j+1,k, i,j,k, true,true,true));
                  break;
                  case positionsLMS[i+1][j][k]:
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j+1,k+1, i,j+1,k, true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j+1,k, i+1,j,k, true,true,true));
                  break;
                  case positionsLMS[i+1][j+1][k]:
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i,j+1,k+1, i+1,j+1,k ,true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i,j,k+1, i,j+1,k+1, true,true,true));
                  break;
                  case positionsLMS[i+1][j][k+1]:
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i,j+1,k+1, i,j+1,k, true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j,k+1, i,j+1,k+1, true,true,true));
                  break;
                }

                break;
                case "right":
                switch (true) {
                  case positionsLMS[i][j+1][k]:
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i,j+1,k, i+1,j+1,k+1, true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j+1,k+1, i+1,j,k+1, true,true,true));
                  break;
                  case positionsLMS[i][j][k+1]:
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j+1,k, i+1,j+1,k+1, true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j+1,k+1, i,j,k+1, true,true,true));
                  break;
                  case positionsLMS[i][j][k]:
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k+1, i+1,j+1,k, i+1,j+1,k+1, true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k+1, i,j,k, i+1,j+1,k, true,true,true));
                  break;
                  case positionsLMS[i][j+1][k+1]:
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k+1, i+1,j+1,k, i,j+1,k+1, true,true,true));
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k+1, i+1,j,k, i+1,j+1,k, true,true,true));
                  break;
                }
                break;
              }
          break;
          case 6:
              switch (true) {
                case (!positionsLMS[i][j][k] && !positionsLMS[i+1][j][k]):
                lmsGeometry.faces.push(lms_createFace(i,j+1,k, i,j,k+1, i+1,j,k+1, true,true,true));
                lmsGeometry.faces.push(lms_createFace(i,j+1,k, i+1,j,k+1, i+1,j+1,k, true,true,true));

                  if(i==0 || lms3D_countTrueEdges(i-1,j,k)<4){
                    lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j+1,k, i,j+1,k+1, false,false,false)); //3,4,2
                  }

                  if(i==positionsLMS.length-2 || lms3D_countTrueEdges(i+1,j,k)<4){
                    lmsGeometry.faces.push(lms_createFace(i+1,j+1,k,  i+1,j,k+1, i+1,j+1,k+1,false,false,false)); //6,8,7
                  }
                break;
                case (!positionsLMS[i][j+1][k] && !positionsLMS[i+1][j+1][k]):
                lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j+1,k+1, i,j+1,k+1, true,true,true));
                lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j,k, i+1,j+1,k+1, true,true,true));

                  if(i==0 || lms3D_countTrueEdges(i-1,j,k)<4){
                    lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j,k, i,j+1,k+1, false,false,false)); //3,4,1
                  }

                  if(i==positionsLMS.length-2 || lms3D_countTrueEdges(i+1,j,k)<4){
                    lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j,k+1, i+1,j+1,k+1, false,false,false)); //5,8,7
                  }
                break;
                case (!positionsLMS[i][j][k+1] && !positionsLMS[i+1][j][k+1]):
                lmsGeometry.faces.push(lms_createFace(i,j,k, i,j+1,k+1, i+1,j+1,k+1, true,true,true));
                lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j+1,k+1, i+1,j,k, true,true,true));
                  if(i==0 || lms3D_countTrueEdges(i-1,j,k)<4){
                    lmsGeometry.faces.push(lms_createFace(i,j,k, i,j+1,k, i,j+1,k+1, false,false,false)); //1,4,2
                  }

                  if(i==positionsLMS.length-2 || lms3D_countTrueEdges(i+1,j,k)<4){
                    lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j+1,k+1, i+1,j+1,k, false,false,false));//5,6,8
                  }
                break;
                case (!positionsLMS[i][j+1][k+1] && !positionsLMS[i+1][j+1][k+1]):
                lmsGeometry.faces.push(lms_createFace(i,j+1,k, i+1,j,k+1, i,j,k+1, true,true,true));
                lmsGeometry.faces.push(lms_createFace(i,j+1,k, i+1,j+1,k, i+1,j,k+1, true,true,true));
                  if(i==0 || lms3D_countTrueEdges(i-1,j,k)<4){
                    lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j,k, i,j+1,k, false,false,false)); //3,2,1
                  }

                  if(i==positionsLMS.length-2 || lms3D_countTrueEdges(i+1,j,k)<4){
                    lmsGeometry.faces.push(lms_createFace(i+1,j+1,k, i+1,j,k, i+1,j,k+1, false,false,false)); //6,7,5
                  }
                break;
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                case (!positionsLMS[i][j][k] && !positionsLMS[i][j+1][k]): // !1 & !2
                lmsGeometry.faces.push(lms_createFace(i,j,k+1,i+1,j+1,k,i,j+1,k+1, true,true,true));
                lmsGeometry.faces.push(lms_createFace(i,j,k+1,i+1,j,k,i+1,j+1,k, true,true,true));
                  if(j==0 || lms3D_countTrueEdges(i,j-1,k)<4){
                    lmsGeometry.faces.push(lms_createFace(i+1,j,k, i,j,k+1, i+1,j,k+1, false,false,false)); //5,7,3
                  }

                  if(j==positionsLMS[i].length-2 || lms3D_countTrueEdges(i,j+1,k)<4){
                    lmsGeometry.faces.push(lms_createFace(i+1,j+1,k, i+1,j+1,k+1, i,j+1,k+1, false,false,false)); //6,4,8
                  }
                break;
                case (!positionsLMS[i][j][k+1] && !positionsLMS[i][j+1][k+1]): // !3 && !4
                lmsGeometry.faces.push(lms_createFace(i+1,j,k+1,i,j+1,k,i+1,j+1,k+1, true,true,true));
                lmsGeometry.faces.push(lms_createFace(i+1,j,k+1,i,j,k,i,j+1,k, true,true,true));
                  if(j==0 || lms3D_countTrueEdges(i,j-1,k)<4){
                    lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j,k+1, i+1,j,k,false,false,false)); //1,5,7
                  }

                  if(j==positionsLMS[i].length-2 || lms3D_countTrueEdges(i,j+1,k)<4){
                    lmsGeometry.faces.push(lms_createFace(i,j+1,k, i+1,j+1,k, i+1,j+1,k+1,false,false,false)); //2,8,6
                  }
                break;
                case (!positionsLMS[i+1][j][k] && !positionsLMS[i+1][j+1][k]):
                lmsGeometry.faces.push(lms_createFace(i,j,k,i+1,j+1,k+1,i,j+1,k, true,true,true));
                lmsGeometry.faces.push(lms_createFace(i,j,k,i+1,j,k+1,i+1,j+1,k+1, true,true,true));
                if(j==0 || lms3D_countTrueEdges(i,j-1,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i,j,k+1, i+1,j,k+1,false,true,false)); //1,7,3
                }

                if(j==positionsLMS[i].length-2 || lms3D_countTrueEdges(i,j+1,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j+1,k, i+1,j+1,k+1, i,j+1,k+1,false,false,false)); //2,4,8
                }
                break;
                case (!positionsLMS[i+1][j][k+1] && !positionsLMS[i+1][j+1][k+1]):
                lmsGeometry.faces.push(lms_createFace(i+1,j,k,i,j+1,k+1,i+1,j+1,k, true,true,true));
                lmsGeometry.faces.push(lms_createFace(i+1,j,k,i,j,k+1,i,j+1,k+1, true,true,true));
                if(j==0 || lms3D_countTrueEdges(i,j-1,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i+1,j,k,  i,j,k,false,false,false)); //3,1,5
                }

                if(j==positionsLMS[i].length-2 || lms3D_countTrueEdges(i,j+1,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i+1,j+1,k, i,j+1,k+1, i,j+1,k, false,false,false)); //6,2,4
                }
                break;
                ////////////////////////////////////////////////////////////////////////////////////////////////////////
                case (!positionsLMS[i][j][k] && !positionsLMS[i][j][k+1]): // !1 && !3
                  lmsGeometry.faces.push(lms_createFace(i,j+1,k,i,j+1,k+1,i+1,j,k+1, true,true,true));//i,j+1,k,i+1,j,k+1,i,j+1,k+1));//
                  lmsGeometry.faces.push(lms_createFace(i,j+1,k,i+1,j,k+1,i+1,j,k, true,true,true));//i,j+1,k,i+1,j,k,i+1,j,k+1));//
                  if(k==0 || lms3D_countTrueEdges(i,j,k-1)<4){
                    lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j+1,k, i,j+1,k, false,false,false));//5,2,6
                  }

                  if(k==positionsLMS[i][j].length-2 || lms3D_countTrueEdges(i,j,k+1)<4){
                    lmsGeometry.faces.push(lms_createFace(i+1,j,k+1, i,j+1,k+1, i+1,j+1,k+1, false,false,false)); //7,8,4
                  }
                break;
                case (!positionsLMS[i][j+1][k] && !positionsLMS[i][j+1][k+1]): // !2 & !4
                  lmsGeometry.faces.push(lms_createFace(i,j,k,i+1,j+1,k+1,i,j,k+1, true,true,true));//i,j,k,i,j,k+1,i+1,j+1,k+1));//
                  lmsGeometry.faces.push(lms_createFace(i,j,k,i+1,j+1,k,i+1,j+1,k+1, true,true,true));//i,j,k,i+1,j+1,k+1,i+1,j+1,k));//
                  if(k==0 || lms3D_countTrueEdges(i,j,k-1)<4){
                    lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j,k, i+1,j+1,k, false,false,false));//1,6,5
                  }

                  if(k==positionsLMS[i][j].length-2 || lms3D_countTrueEdges(i,j,k+1)<4){
                    lmsGeometry.faces.push(lms_createFace(i,j,k+1, i+1,j+1,k+1, i+1,j,k+1, false,false,false)); //3,7,8
                  }
                break;
                case (!positionsLMS[i+1][j][k] && !positionsLMS[i+1][j][k+1]): // !5 & !7
                  lmsGeometry.faces.push(lms_createFace(i,j,k,i,j,k+1,i+1,j+1,k+1, true,true,true));//i,j,k,i+1,j+1,k+1,i,j,k+1));//
                  lmsGeometry.faces.push(lms_createFace(i,j,k,i+1,j+1,k+1,i+1,j+1,k, true,true,true));//i,j,k,i+1,j+1,k,i+1,j+1,k+1));//
                  if(k==0 || lms3D_countTrueEdges(i,j,k-1)<4){
                    lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j+1,k, i,j+1,k, false,false,false));//1,2,6
                  }

                  if(k==positionsLMS[i][j].length-2 || lms3D_countTrueEdges(i,j,k+1)<4){
                    lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j+1,k+1, i+1,j+1,k+1, false,false,false)); //3,8,4
                  }
                break;
                case (!positionsLMS[i+1][j+1][k] && !positionsLMS[i+1][j+1][k+1]):// !6 % !8
                  lmsGeometry.faces.push(lms_createFace(i,j+1,k,i+1,j,k+1,i,j+1,k+1, true,true,true));//i,j+1,k,i,j+1,k+1,i+1,j,k+1));//
                  lmsGeometry.faces.push(lms_createFace(i,j+1,k,i+1,j,k,i+1,j,k+1, true,true,true));//i,j+1,k,i+1,j,k+1,i+1,j,k));//
                  if(k==0 || lms3D_countTrueEdges(i,j,k-1)<4){
                    lmsGeometry.faces.push(lms_createFace(i+1,j,k, i,j+1,k, i,j,k, false,false,false));//5,1,2
                  }

                  if(k==positionsLMS[i][j].length-2 || lms3D_countTrueEdges(i,j,k+1)<4){
                    lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j+1,k+1, i+1,j,k+1, false,false,false)); //3,7,4
                  }
                break;
              }
          break;
          case 7:
            switch (true) {
              case !positionsLMS[i][j][k]: //!1
                lmsGeometry.faces.push(lms_createFace(i,j,k+1,i+1,j,k,i,j+1,k, true,true,true)); //3,5,2
                if(i==0 || lms3D_countTrueEdges(i-1,j,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j+1,k, i,j+1,k+1, false,false,false)); //3,4,2
                }
                if(k==0 || lms3D_countTrueEdges(i,j,k-1)<4){
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j+1,k, i,j+1,k, false,false,false));//5,2,6
                }
                if(j==0 || lms3D_countTrueEdges(i,j-1,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i,j,k+1, i+1,j,k+1, false,false,false)); //5,7,3
                }
              break;
              case !positionsLMS[i][j+1][k]: // !2
                lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j+1,k, i,j+1,k+1, true,true,true)); // 1,6,4
                if(i==0 || lms3D_countTrueEdges(i-1,j,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j,k, i,j+1,k+1, false,false,false)); //3,4,1
                }
                if(k==0 || lms3D_countTrueEdges(i,j,k-1)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j,k, i+1,j+1,k, false,false,false));//1,6,5
                }
                if(j==positionsLMS[i].length-2 || lms3D_countTrueEdges(i,j+1,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i+1,j+1,k, i+1,j+1,k+1, i,j+1,k+1, false,false,false)); //6,4,8
                }
              break;
              case !positionsLMS[i][j][k+1]: // !3
                lmsGeometry.faces.push(lms_createFace(i+1,j,k+1,i,j,k,i,j+1,k+1, true,true,true)); //7,1,4
                if(i==0 || lms3D_countTrueEdges(i-1,j,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i,j+1,k, i,j+1,k+1, false,false,false)); //1,4,2
                }
                if(k==positionsLMS[i][j].length-2 || lms3D_countTrueEdges(i,j,k+1)<4){
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k+1, i,j+1,k+1, i+1,j+1,k+1, false,false,false)); //7,8,4
                }
                if(j==0 || lms3D_countTrueEdges(i,j-1,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j,k+1, i+1,j,k,false,false,false)); //1,5,7
                }
              break;
              case !positionsLMS[i][j+1][k+1]: // !4
                lmsGeometry.faces.push(lms_createFace(i,j+1,k,i+1,j+1,k+1,i,j,k+1, true,true,true)); //2,8,3
                if(i==0 || lms3D_countTrueEdges(i-1,j,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j,k, i,j+1,k, false,false,false)); //3,2,1
                }
                if(k==positionsLMS[i][j].length-2 || lms3D_countTrueEdges(i,j,k+1)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i+1,j+1,k+1, i+1,j,k+1, false,false,false)); //3,7,8
                }
                if(j==positionsLMS[i].length-2 || lms3D_countTrueEdges(i,j+1,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j+1,k, i+1,j+1,k, i+1,j+1,k+1,false,false,false)); //2,8,6
                }
              break;
              case !positionsLMS[i+1][j][k]: //!5
                lmsGeometry.faces.push(lms_createFace(i,j,k,i+1,j,k+1,i+1,j+1,k, true,true,true));//1,7,6
                if(i==positionsLMS.length-2 || lms3D_countTrueEdges(i+1,j,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i+1,j+1,k,  i+1,j,k+1, i+1,j+1,k+1,false,false,false)); //6,8,7
                }
                if(k==0 || lms3D_countTrueEdges(i,j,k-1)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i+1,j+1,k, i,j+1,k, false,false,false));//1,2,6
                }
                if(j==0 || lms3D_countTrueEdges(i,j-1,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k, i,j,k+1, i+1,j,k+1,false,true,false)); //1,7,3
                }
              break;
              case !positionsLMS[i+1][j+1][k]: //!6
                lmsGeometry.faces.push(lms_createFace(i,j+1,k,i+1,j,k,i+1,j+1,k+1, true,true,true));//2,5,8
                if(i==positionsLMS.length-2 || lms3D_countTrueEdges(i+1,j,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j,k+1, i+1,j+1,k+1, false,false,false)); //5,8,7
                }
                if(k==0 || lms3D_countTrueEdges(i,j,k-1)<4){
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i,j+1,k, i,j,k, false,false,false));//5,1,2
                }
                if(j==positionsLMS[i].length-2 || lms3D_countTrueEdges(i,j+1,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j+1,k, i+1,j+1,k+1, i,j+1,k+1,false,false,false)); //2,4,8
                }
              break;
              case !positionsLMS[i+1][j][k+1]: // !7
                lmsGeometry.faces.push(lms_createFace(i+1,j,k,i,j,k+1,i+1,j+1,k+1, true,true,true));//5,3,8
                if(i==positionsLMS.length-2 || lms3D_countTrueEdges(i+1,j,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i+1,j,k, i+1,j+1,k+1, i+1,j+1,k, false,false,false));//5,6,8
                }
                if(k==positionsLMS[i][j].length-2 || lms3D_countTrueEdges(i,j,k+1)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j+1,k+1, i+1,j+1,k+1, false,false,false)); //3,8,4
                }
                if(j==0 || lms3D_countTrueEdges(i,j-1,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i+1,j,k,  i,j,k,false,false,false)); //3,1,5
                }
              break;
              case !positionsLMS[i+1][j+1][k+1]: //!8
                lmsGeometry.faces.push(lms_createFace(i+1,j,k+1,i,j+1,k+1,i+1,j+1,k, true,true,true));//7,4,6
                if(i==positionsLMS.length-2 || lms3D_countTrueEdges(i+1,j,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i+1,j+1,k, i+1,j,k, i+1,j,k+1, false,false,false)); //6,7,5
                }
                if(k==positionsLMS[i][j].length-2 || lms3D_countTrueEdges(i,j,k+1)<4){
                  lmsGeometry.faces.push(lms_createFace(i,j,k+1, i,j+1,k+1, i+1,j,k+1, false,false,false)); //3,7,4
                }
                if(j==positionsLMS[i].length-2 || lms3D_countTrueEdges(i,j+1,k)<4){
                  lmsGeometry.faces.push(lms_createFace(i+1,j+1,k, i,j+1,k+1, i,j+1,k, false,false,false)); //6,2,4
                }
              break;
              }
          break;
          }

      }

    }

  }

  /////////////////////////////////////////////////
  /// 2. Step create Faces and Lines (Marching Cubes)

    lmsGeometry.computeFaceNormals();

      linesGeometry.setIndex( lms_linesIndices );
      linesGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( lms_linesPoints, 3 ) );
      linesGeometry.addAttribute( 'color', new THREE.Float32BufferAttribute( lms_linesColors, 3 ) );
      linesGeometry.computeBoundingSphere();
      var linesMesh = new THREE.LineSegments( linesGeometry, linesMaterial );
      linesMesh.position.x = 0;
      linesMesh.position.y = 0;
      linesMesh.position.z = 0;

      var material = new THREE.MeshBasicMaterial( {
                    /*side: THREE.DoubleSide,*/
                    opacity: planesOpacity,
                    premultipliedAlpha: true,
                    transparent: true, //*/
                    vertexColors: THREE.VertexColors,
                    reflectivity: 0
                  } );

      var meshLMS = new THREE.Mesh(lmsGeometry, material);
      meshLMS.position.x = 0;
      meshLMS.position.y = 0;
      meshLMS.position.z = 0;

      return [linesMesh,meshLMS];
}


function lms3D_countTrueEdges(i,j,k){
  var counter = 0;

  if(i>=positionsLMS.length-2)
    return counter;

    if(j>=positionsLMS[i].length-2)
      return counter;

      if(k>=positionsLMS[i][j].length-2)
        return counter;

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

function lms_createFace(i_1,j_1,k_1,i_2,j_2,k_2,i_3,j_3,k_3,draw_Line_12,draw_Line_13,draw_Line_23){

  lms_checkPointIndices(i_1,j_1,k_1);
  lms_checkPointIndices(i_2,j_2,k_2);
  lms_checkPointIndices(i_3,j_3,k_3);

  var tmpFace =new THREE.Face3(lms_pointIndices[i_1][j_1][k_1], lms_pointIndices[i_2][j_2][k_2], lms_pointIndices[i_3][j_3][k_3]);
  tmpFace.vertexColors[0] = new THREE.Color(lms_colorArray[lms_pointIndices[i_1][j_1][k_1]]);
  tmpFace.vertexColors[1] = new THREE.Color(lms_colorArray[lms_pointIndices[i_2][j_2][k_2]]);
  tmpFace.vertexColors[2] = new THREE.Color(lms_colorArray[lms_pointIndices[i_3][j_3][k_3]]);

  if(draw_Line_12)
    lms_linesIndices.push(lms_pointIndices[i_1][j_1][k_1], lms_pointIndices[i_2][j_2][k_2]);
  if(draw_Line_13)
    lms_linesIndices.push(lms_pointIndices[i_1][j_1][k_1], lms_pointIndices[i_3][j_3][k_3]);
  if(draw_Line_23)
    lms_linesIndices.push(lms_pointIndices[i_2][j_2][k_2], lms_pointIndices[i_3][j_3][k_3]);

  return tmpFace;
}

function lms_checkPointIndices(i,j,k){
  if(lms_pointIndices[i][j][k]==undefined){
    lmsGeometry.vertices.push(new THREE.Vector3(i*lms3D_lmsStep,j*lms3D_lmsStep,k*lms3D_lmsStep));
    lms_linesPoints.push(i*lms3D_lmsStep,j*lms3D_lmsStep,k*lms3D_lmsStep);

    gWorkerColor1.updateColor("lms",i*lms3D_lmsStep,j*lms3D_lmsStep,k*lms3D_lmsStep)

    var tmpRGBInfo = gWorkColor1.getColorInfo("rgb");
    if (doColorblindnessSim){
      tmpRGBInfo = gWorkColor1.getColorInfo("rgb_cb");
      lms_colorArray.push(gWorkerColor1.get_RGB_String());
    }
    else {
      lms_colorArray.push(gWorkerColor1.get_RGB_CB_String());
    }

    lms_linesColors.push(tmpRGBInfo[1], tmpRGBInfo[2], tmpRGBInfo[3]);
    lms_pointIndices[i][j][k]=lmsGeometry.vertices.length-1;
  }
}

function lms_DefinePlaneType(i,j,k){
  if(positionsLMS[i][j+1][k] && positionsLMS[i][j+1][k+1] && positionsLMS[i+1][j+1][k+1] && positionsLMS[i+1][j+1][k])
    return "top";

  if(positionsLMS[i][j][k] && positionsLMS[i+1][j][k+1] && positionsLMS[i][j][k+1] && positionsLMS[i+1][j][k+1])
    return "bottom"

  if(positionsLMS[i][j][k] && positionsLMS[i][j+1][k] && positionsLMS[i+1][j+1][k] && positionsLMS[i+1][j][k])
    return "front"

  if(positionsLMS[i][j][k+1] && positionsLMS[i+1][j+1][k+1] && positionsLMS[i][j+1][k+1] && positionsLMS[i+1][j][k+1])
      return "back";

  if(positionsLMS[i][j][k+1] && positionsLMS[i][j+1][k] && positionsLMS[i][j+1][k+1] && positionsLMS[i][j][k])
    return "left";

  if(positionsLMS[i+1][j][k] && positionsLMS[i+1][j+1][k] && positionsLMS[i+1][j+1][k+1] && positionsLMS[i+1][j][k+1])
    return "right";

  return undefined;
}
