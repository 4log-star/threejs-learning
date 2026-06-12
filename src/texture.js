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
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

const textureLoader = new THREE.TextureLoader();

const colorTexture = textureLoader.load(
  `src/assets/rosewood/rosewood_veneer1_diff_4k.jpg`,
);
colorTexture.repeat.set(10, 50);
colorTexture.wrapS = THREE.RepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  map: colorTexture,
  normalMap: colorTexture,
  roughnessMap: colorTexture,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

const light = new THREE.DirectionalLight(0xffffff, 20);
light.castShadow = true;
light.position.set(5, 20, 5);

scene.add(light);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

function animate(t) {
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
