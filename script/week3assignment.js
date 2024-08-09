// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
const nWidth = width / Math.max(width, height) * 10;
const nHeight = height / Math.max(width, height) * 10;
scene.add(camera);

camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create materials with different colors
const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue for the body
const otherPartsMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow for the head, arms, and legs

// Create geometries
const bodyGeometry = new THREE.BoxGeometry(1, 2, 0.5);
const headGeometry = new THREE.SphereGeometry(0.5, 32, 16);
const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.2, 32);

// Create meshes with respective materials
const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
const headMesh = new THREE.Mesh(headGeometry, otherPartsMaterial);
const leftArmMesh = new THREE.Mesh(armGeometry, otherPartsMaterial);
const rightArmMesh = new THREE.Mesh(armGeometry, otherPartsMaterial);
const leftLegMesh = new THREE.Mesh(legGeometry, otherPartsMaterial);
const rightLegMesh = new THREE.Mesh(legGeometry, otherPartsMaterial);

// Position the meshes
headMesh.position.y = 1.5;
leftArmMesh.position.set(-0.5, 0, 0);
rightArmMesh.position.set(0.5, 0, 0);
leftLegMesh.position.set(-0.3, -1.5, 0);
rightLegMesh.position.set(0.3, -1.5, 0);

// Create a group and add the meshes to it
const group = new THREE.Group();
group.add(bodyMesh);
group.add(headMesh);
group.add(leftArmMesh);
group.add(rightArmMesh);
group.add(leftLegMesh);
group.add(rightLegMesh);

// Add the group to the scene
scene.add(group);

// Apply transformations to the group
group.scale.set(1.2, 1.2, 1.2);
group.rotation.y = Math.PI / 4;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the group
  group.rotation.x += 0.01;
  group.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
