// Importing OrbitControls (make sure the path matches the version you are using)
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

// Creating the scene
var scene = new THREE.Scene();

// Creating the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Creating the renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// add light.
const directionLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionLight.position.set(0, 0, 10)
scene.add(directionLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // white light at 50% intensity
scene.add(ambientLight)

// load different color textures
const textureEarth = new THREE.TextureLoader().load('textures/earth_normalmap_8192x4096.jpg');

textureEarth.colorSpace = THREE.SRGBColorSpace;

const material = new THREE.MeshStandardMaterial({ map: textureEarth });


const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32); // radius, widthSegments, heightSegments
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.set(0, 0, 1);
scene.add(sphere);



// Adding OrbitControls
var controls = new OrbitControls(camera, renderer.domElement);

// Adjust control settings if needed
controls.minDistance = 1;
controls.maxDistance = 10;
controls.enablePan = true;

function animate() {
    requestAnimationFrame(animate);

    // Rotate the sphere around the y-axis
    sphere.rotation.y += 0.01; // Adjust the value to control the speed of rotation

    // Required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    // Rendering the scene
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);
animate();