// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
scene.add(camera);

camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Create a material for the sphere and spikes
const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100 });
const spikeMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100 });

// Create a sphere to represent the core of the virus
const sphereGeometry = new THREE.SphereGeometry(1, 32, 16);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Create a group for the spikes
const spikesGroup = new THREE.Group();

// Create spikes and position them on the sphere
const spikeGeometry = new THREE.ConeGeometry(0.1, 0.4, 4); // Pyramid shape
const spikeCount = 50;

for (let i = 0; i < spikeCount; i++) {
  const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);

  // Randomly position spikes on the sphere's surface
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos((Math.random() * 2) - 1);
  const radius = 1.1; // Slightly larger than the sphere's radius

  spike.position.x = radius * Math.sin(phi) * Math.cos(theta);
  spike.position.y = radius * Math.sin(phi) * Math.sin(theta);
  spike.position.z = radius * Math.cos(phi);

  // Make spikes point outward
  spike.lookAt(0, 0, 0);

  spikesGroup.add(spike);
}

// Add the spikes group to the scene
scene.add(spikesGroup);

// Create edge geometry and material for the sphere
const edgeGeometry = new THREE.EdgesGeometry(sphereGeometry);
const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
const sphereEdges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
scene.add(sphereEdges);

// Group for sphere and edges
const virusGroup = new THREE.Group();
virusGroup.add(sphere);
virusGroup.add(sphereEdges);
virusGroup.add(spikesGroup);
scene.add(virusGroup);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the virus
  virusGroup.rotation.x += 0.01;
  virusGroup.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
