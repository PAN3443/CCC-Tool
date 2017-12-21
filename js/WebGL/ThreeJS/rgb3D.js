function initRGB3D(){

  const renderWidth = 500;
  const renderHeight = 500;

  document.getElementById("id_rgb3D").width = renderWidth;
  document.getElementById("id_rgb3D").height = renderHeight;


  scene = new THREE.Scene();

    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(renderWidth, renderHeight);
    document.body.appendChild(renderer.domElement);

    // Create a camera, zoom it out from the renderWidth a bit, and add it to the scene.
    camera = new THREE.PerspectiveCamera(45, renderWidth / renderHeight, 0.1, 20000);
    camera.position.set(0,6,0);
    scene.add(camera);

    // Create an event listener that resizes the renderer with the browser window.
    /*window.addEventListener('resize', function() {
      renderer.setSize(renderWidth, renderHeight);
      camera.aspect = renderWidth / renderHeight;
      camera.updateProjectionMatrix();
    });*/

    // Create a light, set its position, and add it to the scene.
   var light = new THREE.PointLight(0xffffff);
   //light.position.set(-100,200,100);
   light.position.x = 10;
   light.position.y = 50;
   light.position.z = 130;
   scene.add(light);

   // create the sphere's material
  const sphereMaterial =
   new THREE.MeshLambertMaterial(
     {
       color: 0xCC0000
     });

     // Set up the sphere vars
    const RADIUS = 50;
    const SEGMENTS = 16;
    const RINGS = 16;

    // Create a new mesh with
    // sphere geometry - we will cover
    // the sphereMaterial next!
    const sphere = new THREE.Mesh(

      new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS),

      sphereMaterial);

    // Move the Sphere back in Z so we
    // can see it.
    sphere.position.x = 0;
    sphere.position.y = 0;
    sphere.position.z = 0;

    renderer.render(scene, camera);

    document.getElementById("id_rgb3D").appendChild(renderer.domElement);
}
