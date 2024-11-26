import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"; // Import HDRI loader
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.set(0, 1, 2); // Adjust camera position

// Renderer setup
const canvas = document.querySelector("#draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Orbit controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Load HDRI environment
const rgbloader = new RGBELoader();

rgbloader.load(
  "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/rosendal_plains_1_2k.hdr",
  (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  }
);



// Load 3D model

const loader = new GLTFLoader();

loader.load("./Model/gun.glb", function (gltf) {
  scene.add(gltf.scene);
});

// Mouse move event listener to move the camera
document.addEventListener("mousemove", function (event) {
  const x = (event.clientX / window.innerWidth) * 5 - 1;
  const y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Adjust camera position based on mouse move
  camera.position.set(x, y, 2);
});

// Window resize event listener
window.addEventListener("resize", function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation function
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
