// rotating-primitives.js
// Three.js scene: still primitives on the same plane with snow atmosphere

(function() {
  // Scene, camera, renderer setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 800 / 400, 0.1, 50);
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(800, 400);
  renderer.setClearColor(0x000000);

  document.getElementById('threejs-container-2').appendChild(renderer.domElement);

  // --------------------
  // Snow
  // --------------------
  const snowCount = 3000;
  const snowGeometry = new THREE.BufferGeometry();
  const snowPositions = [];

  for (let i = 0; i < snowCount; i++) {
    snowPositions.push(
      (Math.random() - 0.5) * 40,
      Math.random() * 20,
      (Math.random() - 0.5) * 40
    );
  }

  snowGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(snowPositions, 3)
  );

  const snowMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08,
    transparent: true,
    opacity: 0.8
  });

  const snow = new THREE.Points(snowGeometry, snowMaterial);
  scene.add(snow);

  // --------------------
  // Geometries
  // --------------------
  const colors = [0xff69b4, 0xff1493, 0xff007f];

  // Cube
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(2, 2, 2),
    new THREE.MeshBasicMaterial({ color: colors[0] })
  );
  cube.position.set(-6, 1.5, 0);

  // Cone
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(1.5, 3, 32),
    new THREE.MeshBasicMaterial({ color: colors[1] })
  );
  cone.position.set(0, 1.5, 0);

  // Cylinder
  const cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, 3.6, 32),
    new THREE.MeshBasicMaterial({ color: colors[2] })
  );
  cylinder.position.set(6, 1.5, 0);

  scene.add(cube);
  scene.add(cone);
  scene.add(cylinder);

  // --------------------
  // Camera
  // --------------------
  camera.position.set(0, 6, 12);
  camera.lookAt(0, 1.5, 0);

  // --------------------
  // OrbitControls
  // --------------------
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.screenSpacePanning = false;
  controls.minDistance = 6;
  controls.maxDistance = 30;
  controls.target.set(0, 1.5, 0);

  // --------------------
  // Animation
  // --------------------
  function animate() {
    requestAnimationFrame(animate);

    // Animate only the snow
    const positions = snow.geometry.attributes.position.array;

    for (let i = 1; i < positions.length; i += 3) {
      positions[i] -= 0.03;
      positions[i - 1] += Math.sin(Date.now() * 0.001 + i) * 0.002;

      if (positions[i] < 0) {
        positions[i] = 20;
        positions[i - 1] = (Math.random() - 0.5) * 40;
        positions[i + 1] = (Math.random() - 0.5) * 40;
      }
    }

    snow.geometry.attributes.position.needsUpdate = true;

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
})();