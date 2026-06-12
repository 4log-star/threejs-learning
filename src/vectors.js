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

// const v = new THREE.Vector3(1, 2, 3);
// console.log(v);

// const player = new THREE.Vector3(0, 0, 0);
// const enemy = new THREE.Vector3(4, 7, 2);

// console.log(player.distanceTo(enemy));

const a = new THREE.Vector3(0, 0, 0);
const b = new THREE.Vector3(3, 4, 0);
console.log(a.distanceTo(b));

const direction = b.clone().sub(a);
console.log(direction.normalize())

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

function animate(t) {
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
