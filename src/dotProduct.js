import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";

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

// const a = new THREE.Vector3(1, 0, 0);
// const b = new THREE.Vector3(1, 0, 0);
// console.log(a.dot(b));

// const a = new THREE.Vector3(1, 0, 0);
// const b = new THREE.Vector3(-1, 0, 0);
// console.log(a.dot(b));

const a = new THREE.Vector3(1, 0, 0);
const b = new THREE.Vector3(0.6, 0.8, 0);
console.log(a.dot(b));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

function animate(t) {
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
