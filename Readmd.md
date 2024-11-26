<!-- *Basic starting code if we use MeshPhysicalMaterial -->

<!-- Start -->

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
75, // Field of view
window.innerWidth / window.innerHeight, // Aspect ratio
0.1, // Near clipping plane
100 // Far clipping plane
);
camera.position.z = 10; // Camera position

// Object creation
const geometry = new THREE.SphereGeometry(4, 250, 250); // Sphere geometry
const material = new THREE.MeshPhysicalMaterial({
color: "Blue",
metalness: 0.5,
roughness: 0.5,
}); // Material properties
const cube = new THREE.Mesh(geometry, material); // Mesh creation
scene.add(cube); // Adding mesh to the scene

// Lighting setup
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white ambient light
scene.add(ambientLight); // Adding ambient light to the scene

// Renderer setup
const canvas = document.querySelector("#draw"); // Selecting the canvas element
const renderer = new THREE.WebGLRenderer({ canvas }); // Creating the renderer
renderer.setSize(window.innerWidth, window.innerHeight); // Setting the renderer size
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Setting pixel ratio

// Window resize event listener
window.addEventListener("resize", function onResize() {
camera.aspect = window.innerWidth / window.innerHeight; // Updating camera aspect ratio
camera.updateProjectionMatrix(); // Updating camera projection matrix
renderer.setSize(window.innerWidth, window.innerHeight); // Updating renderer size
});

// Orbit controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enabling damping for smoother controls
controls.minPolarAngle = -Math.PI / 5; // Setting minimum polar angle (bottom)
controls.maxDistance = 10; // Setting maximum distance
controls.minDistance = 2; // Setting minimum distance
controls.update(); // Updating controls

// Animation function
function animate() {
requestAnimationFrame(animate); // Requesting the next frame
controls.update(); // Updating controls
renderer.render(scene, camera); // Rendering the scene
}
animate(); // Starting the animation

<!-- End -->

<!-- Mouse Movement -->

<!-- LookAt hame kisi bhi object par lookat kar sakta hai -->

-> If we want to give the points of x,y,z. so we want to use (THREE.Vector3(x,y,z))

=> cube.lookAt(new THREE.Vector3(0, 0, 0));

Example 1:

const mouse = {
x: 0,
y: 0,
};

window.addEventListener("mousemove", function onMouseMove(e) {
mouse.x = e.clientX / window.innerWidth;
mouse.y = e.clientY / window.innerHeight;
});

function animate() {
requestAnimationFrame(animate);
controls.update();
cube.lookAt(new THREE.Vector3(mouse.x - 0.5, -mouse.y + 0.5, 0));
renderer.render(scene, camera);
}
animate();

              <!-- Responsive -->

<!-- *Responsive Scene -->

window.addEventListener("resize", function onResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});

<!-- *Pixalratio -->

-> pixal color karna and draw karna pixals par three js use GPU.
-> Device pixal ration means haamra device ek pixal par kitna pixals
promote karta hai.

-> Hamay hamara pixal ration hamasah 1 sa 2 ka beach mai rakhna hai,

// => Setup

-> write this after canvar , renderer.

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

<!-- *OrbitControls -->

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableRotate = true;
controls.maxAzimuthAngle = -Math.PI / 5; // right
controls.minAzimuthAngle = Math.PI / 5; // left

controls.maxPolarAngle = Math.PI / 5; // top
controls.minPolarAngle = -Math.PI / 5; // bottom

controls.maxDistance = 10;
controls.minDistance = 2;

// controls.maxZoom = 5; // it is used when we use arthographic camera
// controls.minZoom = 2;
controls.update();

<!-- *Lilgui -->

 lighting, Ambian lights, directionalLight. point light, SpotLight

-> First install the package (npm i lil-gui);

<!-- start -->

import GUI from "lil-gui";

const gui = new GUI();

const params = {
width: 1,
height: 2,
depth: 3,
color: "#ff0000",
};

function updateGeometry() {
cube.geometry.dispose();
cube.geometry = new THREE.BoxGeometry(
params.width,
params.height,
params.depth,
);
cube.material.needsUpdate = true; // Ensure material updates after geometry change
}

gui.add(camera.position, "z", 0, 100).name("Camera Distance");
gui.add(params, "width", 1, 10).onChange(updateGeometry);
gui.add(params, "height", 1, 10).onChange(updateGeometry);
gui.add(params, "depth", 1, 10).onChange(updateGeometry);
gui.addColor(params, "color").onChange((value) => {
cube.material.color.set(value);
cube.material.needsUpdate = true; // Ensure material updates after color change
});

<!-- End -->

<!-- Development Tools -->

<!-- *Lights -->

-> All the light are made from object3D.
-> If we use MeshPhysicalMaterial so we have to use light otherwise object will not show in the scene.

<!-- # Ambian lights -->

-> It's constent light that spread evenly on the object.

<!-- Start -->

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
100
);

camera.position.z = 10;

const geometry = new THREE.SphereGeometry(4, 250, 250);
const material = new THREE.MeshPhysicalMaterial({
color: "Blue",
metalness: 0.5,
roughness: 0.5,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lighting
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);
scene.add(new THREE.DirectionalLightHelper(directionalLight, 1));

const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);
scene.add(new THREE.PointLightHelper(pointLight, 1));

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const canvas = document.querySelector("#draw");
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

window.addEventListener("resize", function onResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minPolarAngle = -Math.PI / 5; // bottom
controls.maxDistance = 10;
controls.minDistance = 2;
controls.update();

// GUI

const gui = new GUI();

const params = {
radius: 4,
widthSegments: 32,
heightSegments: 16,
color: "Blue",
rotationY: 0,
rotationX: 0,
rotationZ: 0,
metalness: 0.5,
roughness: 0.5,
directionalLightIntensity: 0.5,
pointLightIntensity: 0.5,
ambientLightIntensity: 0.40404,
};

function updateGeometry() {
cube.geometry.dispose();
cube.geometry = new THREE.SphereGeometry(
params.radius,
params.widthSegments,
params.heightSegments
);
cube.material.needsUpdate = true; // Ensure material updates after geometry change
}

function updateMaterial() {
cube.material.metalness = params.metalness;
cube.material.roughness = params.roughness;
cube.material.needsUpdate = true; // Ensure material updates after material properties change
}

function updateLights() {
directionalLight.intensity = params.directionalLightIntensity;
pointLight.intensity = params.pointLightIntensity;
ambientLight.intensity = params.ambientLightIntensity;
}

gui.add(camera.position, "z", 0, 100).name("Camera Distance");
gui.add(params, "radius", 1, 10).onChange(updateGeometry);
gui.add(params, "widthSegments", 1, 64).onChange(updateGeometry);
gui.add(params, "heightSegments", 1, 64).onChange(updateGeometry);
gui.add(params, "rotationY", -Math.PI, Math.PI).onChange(function (val) {cube.rotation.y = val;});
gui.add(params, "rotationX", -Math.PI, Math.PI).onChange(function (val) {cube.rotation.x = val;});
gui.add(params, "rotationZ", -Math.PI, Math.PI).onChange(function (val) {cube.rotation.z = val;});
gui.addColor(params, "color").onChange((value) => {
cube.material.color.set(value);
cube.material.needsUpdate = true; // Ensure material updates after color change
});
gui.add(params, "metalness", 0, 1).onChange(updateMaterial);
gui.add(params, "roughness", 0, 1).onChange(updateMaterial);
gui.add(params, "directionalLightIntensity", 0, 1).onChange(updateLights);
gui.add(params, "pointLightIntensity", 0, 1).onChange(updateLights);
gui.add(params, "ambientLightIntensity", 0, 1).onChange(updateLights);

function animate() {
requestAnimationFrame(animate);
controls.update();
renderer.render(scene, camera);
}
animate();

<!-- End -->

<!-- *Example: 2 -->

<!-- start -->

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
100
);
camera.position.z = 4;

// Object creation
const geometry = new THREE.BoxGeometry(2, 1, 1);
const material = new THREE.MeshPhysicalMaterial({
color: "Blue",
metalness: 0.8,
roughness: 0.1,
reflectivity: 1
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lighting setup
const ambientLight = new THREE.AmbientLight("white", 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("white", 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const helper = new THREE.DirectionalLightHelper(directionalLight, .4);
scene.add(helper);

const pointLight = new THREE.PointLight("white", 1, 100 );
pointLight.position.set(-0.32, 1.64, -0.08);
scene.add(pointLight);

const pointLightHelper = new THREE.PointLightHelper(pointLight, .4);
scene.add(pointLightHelper);

// Renderer setup
const canvas = document.querySelector("#draw");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Window resize event listener
window.addEventListener("resize", function onResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});

// Orbit controls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minPolarAngle = -Math.PI / 5;
controls.maxDistance = 10;
controls.minDistance = 2;
controls.update();

// GUI setup
const gui = new GUI();
const params = {
ambientLightIntensity: 1,
directionalLightIntensity: 0.5,
pointLightIntensity: 0.5,
};

gui.add(params, "ambientLightIntensity", 0, 1).onChange((value) => {
ambientLight.intensity = value;
});

gui.add(params, "directionalLightIntensity", 0, 1).onChange((value) => {
directionalLight.intensity = value;
});

gui.add(params, "pointLightIntensity", 0, 1).onChange((value) => {
pointLight.intensity = value;
});

gui.add(directionalLight.position, "x", -10, 10).onChange((value) => {
directionalLight.position.x = value;
});

gui.add(directionalLight.position, "y", -10, 10).onChange((value) => {
directionalLight.position.y = value;
});

gui.add(directionalLight.position, "z", -10, 10).onChange((value) => {
directionalLight.position.z = value;
});

gui.add(pointLight.position, "x", -10, 10).onChange((value) => {
pointLight.position.x = value;
});

gui.add(pointLight.position, "y", -10, 10).onChange((value) => {
pointLight.position.y = value;
});

gui.add(pointLight.position, "z", -10, 10).onChange((value) => {
pointLight.position.z = value;
});

// Animation function
function animate() {
requestAnimationFrame(animate);
controls.update();
renderer.render(scene, camera);
}
animate();

<!-- End -->

<!-- *Raycaster -->

-> jaaha par bhi hame mouse move kara ga waha par wo rays point karaga.
-> hamay hamrai values ko normalize karna ho ga jo value 0 to 900 someting jaati hai wo value 0 to 1 taak jaaya.

Example: 1

-> Ya code mai ek error hai ki ek object sa doosra object par bahi rays ja rahi hai.
-> hame ya nahi chaata, muja chaya ki mai jis element par hover karu sirf wo he change ho doosra nahi.

<!-- Start -->

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
pointer.x = (event.clientX / window.innerWidth) *2 - 1;
pointer.y = -(event.clientY / window.innerHeight)* 2 + 1;

raycaster.setFromCamera(pointer, camera);
const intersects = raycaster.intersectObjects([sphere, box]);

if (intersects.length > 0) {
intersects[0].object.material.color.set("red");
} else {
box.material.color.set("blue");
sphere.material.color.set("green");
}
}

window.addEventListener("mousemove", onPointerMove);

<!-- End -->

                
                <!-- 3D Modles -->

<!-- *GLTF -->

-> Import the package first then we can use the 3D models:
=> import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

=> Example: 1 Move the gun in scene on mouse move events.

<!-- Start -->

const loader = new GLTFLoader();
loader.load("./Model/gun.glb", function (gltf) {
  const model = gltf.scene;
  model.position.set(0, 0, 0); // Set initial position
  scene.add(model);

  // Move the model on mouse move
  document.addEventListener('mousemove', function (event) {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    model.position.set(x, y, 0);
  });
});
<!-- End -->


<!-- Full code  -->

<!-- Start -->
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
document.addEventListener('mousemove', function (event) {
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

<!-- End -->

