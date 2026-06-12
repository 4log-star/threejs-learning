import "./style.css";
import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

// const box = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: "red" }),
// );
// scene.add(box);
// camera.lookAt(box.position);
// let targetX = 0;

// window.addEventListener("mousemove", (e) => {
//   targetX = ((e.clientX / window.innerWidth) * 2 - 1) * 5;
// });

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: "red" }),
);
sphere.position.set(5, 0, 0)
scene.add(sphere);

const offset = new THREE.Vector3(0, 3, 8);


function animate(t) {
  controls.update();
 sphere.position.x = Math.sin(t * 0.001) * 5;

  const desiredPosition =
    sphere.position.clone().add(offset);

  camera.position.lerp(
    desiredPosition,
    0.05
  );

  camera.lookAt(sphere.position);

  // box.position.x = (targetX - box.position.x) * 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
