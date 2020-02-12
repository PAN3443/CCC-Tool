function lmsMesh(){
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



  return colorspaceGroup;
}
