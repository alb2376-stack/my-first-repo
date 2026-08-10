// 3d-geometries.js: Three.js scene: grid, lit primitives, and orbit controls.
// Page: 3d-explorations.html   Container: #threejs-container-1
// Wrapped in an IIFE so its scene variables stay off the global scope and do
// not collide with 3d-atmospheric.js on the same page.

(function() {
  // Scene, camera, renderer setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 800 / 400, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(800, 400);
  renderer.setClearColor(0xf0f0f0); // Light grey background

  document.getElementById('threejs-container-1').appendChild(renderer.domElement);

  // Add grid helper
  const grid = new THREE.GridHelper(16, 32, 0xcccccc, 0xcccccc);
  scene.add(grid);

  // These shapes use MeshPhongMaterial, which only shows up if something is
  // lighting it. Ambient light lifts everything evenly, the directional light
  // gives one side a highlight so the forms read as three dimensional.
  const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambient);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  // Add 3D primitives
  // Box
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshPhongMaterial({ color: 0xff5e00, transparent: true, opacity:0.3 })
  );
  box.position.set(-5, 1, 0);
  scene.add(box);
  // Sphere
 const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1.2, 32, 32),
  new THREE.MeshPhongMaterial({
    color: 0xe91e63,
    
  })
);
sphere.position.set(0, 1.2, 0);
scene.add(sphere);

// Cylinder
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, 2, 32),
  new THREE.MeshPhongMaterial({
    color: 0xff5e00,
    transparent: true,
    opacity: 0.7
  })
);
cylinder.position.set(5, 1, 0);
scene.add(cylinder);

// Cone
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(1, 2, 32),
  new THREE.MeshPhongMaterial({
    color: 0xe91e63,
    transparent: true,
    opacity: 0.8
  })
);
cone.position.set(2.5, 1, -4);
scene.add(cone);

  // Camera position
  camera.position.set(8, 8, 8);
  camera.lookAt(0, 0, 0);

  // OrbitControls lets you drag to rotate and scroll to zoom. Damping adds a
  // little glide after you let go, and min/max distance stops you from flying
  // inside the shapes or losing them off in the distance.
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.screenSpacePanning = false;
  controls.minDistance = 4;
  controls.maxDistance = 40;
  controls.target.set(0, 1, 0);

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
})(); 