import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  120,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;
camera.rotation.y = Math.PI / 4

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xabbcee });
const material2 = new THREE.MeshBasicMaterial({ color: "red" });
const cube = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material2);
// cube.scale.x = 3;

cube.position.x = 0;
cube2.position.x = -5;
cube2.scale.y = 5;

scene.add(cube);
// scene.add(cube2);

for (let i = 0; i < 20; i++) {
  const cube = new THREE.Mesh(geometry, material);

  cube.position.x = (i - 10) * 2;

  scene.add(cube);
}

scene.background = new THREE.Color(0xffee22);

renderer.setAnimationLoop(animate);
function animate(t) {
  if (t > 2000) {
    cube.rotation.y = t / 100;
    // cube2.rotation.y = -t/100
    cube2.rotation.y = -Math.sin(t * 0.001);
  }
  renderer.render(scene, camera);
}
