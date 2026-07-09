 // Create heart shape
  function createHeart(x, z, scale = 0.08) {
    const heartShape = new THREE.Shape();

    heartShape.moveTo(0, 0);
    heartShape.bezierCurveTo(0, 0, -5, -5, -10, 0);
    heartShape.bezierCurveTo(-20, 10, -20, 25, -20, 25);
    heartShape.bezierCurveTo(-20, 40, -5, 55, 0, 60);
    heartShape.bezierCurveTo(5, 55, 20, 40, 20, 25);
    heartShape.bezierCurveTo(20, 25, 20, 10, 10, 0);
    heartShape.bezierCurveTo(5, -5, 0, 0, 0, 0);

    const geometry = new THREE.ExtrudeGeometry(heartShape, {
      depth: 6,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1
    });

    const material = new THREE.MeshPhongMaterial({
      color: 0xff69b4, // pink
      shininess: 100
    });

    const heart = new THREE.Mesh(geometry, material);

    heart.scale.set(scale, scale, scale);
    heart.rotation.x = -Math.PI / 2;
    heart.position.set(x, 0.5, z);

    scene.add(heart);
  }

  // Three hearts
  createHeart(-4, 0);
  createHeart(0, 0);
  createHeart(4, 0);