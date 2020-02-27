//////////////////////////////////////////
// -------------Helpers--------------//
//////////////////////////////////////////

function draw3DLine(xPos,yPos, zPos, xPos2, yPos2, zPos2,isDashed){

    var linecolor = new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--main-font-color'));

    var lineMaterial = new THREE.LineBasicMaterial( { color: linecolor, linewidth: lineWidth3D } );

    if(isDashed)
      lineMaterial = new THREE.LineDashedMaterial( { color: linecolor, dashSize: 10, gapSize: 10, linewidth: 5.0 } );

  /*  if(secondStrokeStyle){
      lineMaterial = new THREE.LineBasicMaterial( { color: 0x907D27, linewidth: lineWidth3D } );
      if(isDashed)
        lineMaterial = new THREE.LineDashedMaterial( { color: 0x907D27, dashSize: 10, gapSize: 10, linewidth: lineWidth3D } );
    }*/

    var geometry = new THREE.Geometry();

    geometry.vertices.push(
      new THREE.Vector3(xPos,yPos, zPos),
      new THREE.Vector3(xPos2, yPos2, zPos2)
    );

    var line = new THREE.Line( geometry, lineMaterial );
    line.computeLineDistances();
    //pathPlotLineGroup.add( line );
    return line;
}

function draw3DElement(colorHexStr,xPos,yPos,zPos, index,colorside, circle,mouseAboveKeyID,mouseGrappedColorSide){
  // draw circle
  var bigcircleRad3D = 8;
  var circleRad3D = 5;
  var colorHex = parseInt(colorHexStr.replace(/^#/, ''), 16);

  if(circle){

    var geometry;

    if(index==mouseAboveKeyID && colorside==mouseGrappedColorSide)
      geometry = new THREE.SphereGeometry(bigcircleRad3D, 20, 20);
    else
      geometry = new THREE.SphereGeometry(circleRad3D, 20, 20);

    var material = new THREE.MeshBasicMaterial( {color: colorHex} );
    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = xPos;
    sphere.position.y = yPos;
    sphere.position.z = zPos;
    return sphere;
  }
  else{

    var geometry;

    if(index==mouseAboveKeyID && colorside==mouseGrappedColorSide)
      geometry = new THREE.BoxGeometry(bigcircleRad3D*2,bigcircleRad3D*2,bigcircleRad3D*2);
    else
      geometry = new THREE.BoxGeometry(circleRad3D*2,circleRad3D*2,circleRad3D*2);

    var material = new THREE.MeshBasicMaterial( {color: colorHex} );
    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = xPos;
    cube.position.y = yPos;
    cube.position.z = zPos;
    return cube;
  }
}
