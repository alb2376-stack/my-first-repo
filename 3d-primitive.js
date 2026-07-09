const x = 0, y = 0;

const heartShape = new THREE.Shape();

heartShape.moveTo(x + 5, y + 5);
heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

const heartGeometry = new THREE.ExtrudeGeometry(heartShape, {
  depth: 4,
  bevelEnabled: true,
  bevelSegments: 6,
  steps: 2,
  bevelSize: 0.8,
  bevelThickness: 0.8
});

const heartMaterial = new THREE.MeshPhongMaterial({
  color: 0xff69b4
});

const heart = new THREE.Mesh(heartGeometry, heartMaterial);

heart.scale.set(0.12, 0.12, 0.12);
heart.rotation.x = -Math.PI / 2;
heart.position.set(0, 0.5, 0);

scene.add(heart);