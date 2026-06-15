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

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshNormalMaterial(),
);
scene.add(sphere);

const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.001;

const targetPosition = new THREE.Vector3();
const offset = new THREE.Vector3(0, 3, 8);
function animate(t) {
  controls.update();

  //   const targetPosition = new THREE.Vector3(mouse.x * 3, mouse.y * 2, 5);
  //   targetPosition.set(mouse.x * 3, mouse.y * 2, 5);
  //   camera.position.lerp(targetPosition, 0.05);
  //   camera.position.set(0, 0, 5);
    // camera.lookAt(0, 0, 0);
  sphere.position.x = Math.sin(t * 0.001) * 10;
  targetPosition.copy(sphere.position).add(offset)
  camera.position.lerp(targetPosition, 0.05)

 
  camera.lookAt(sphere.position);
  //   camera.lookAt(sphere.position);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
