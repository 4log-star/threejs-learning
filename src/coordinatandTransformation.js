import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x111111);
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000,
// );

// camera.position.z = 5;

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0xffff });
// const cube = new THREE.Mesh(geometry, material);

// const group = new THREE.Group()
// group.add(cube)
// group.position.x = 3

// cube.position.x = 1
// cube.scale.setScalar(2)
// group.scale.setScalar(2)
// scene.add(group);

// function animate(t) {
//     group.rotation.y += 0.01
//   renderer.render(scene, camera);
// }

// renderer.setAnimationLoop(animate);

//basic solar system using coordinat and transformation

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
light.castShadow = true;

scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({
  color: 0xfff700,
  roughness: 1,
  metalness: 0,
});
const sun = new THREE.Mesh(geometry, sunMaterial);

const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({ color: "blue" });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

sun.scale.setScalar(2);
earth.position.x = 5;
const group = new THREE.Group();
scene.add(sun);
// scene.add(group);
sun.add(group);
group.add(earth);

const moonGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({ color: "#808080" });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.x = 1;
const moonGroup = new THREE.Group();
earth.add(moonGroup);
moonGroup.add(moon);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

function animate(t) {
  controls.update();
  earth.rotation.z = t * 0.0002;
  group.rotation.y = t * 0.001;
  moonGroup.rotation.y = t * 0.001;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
