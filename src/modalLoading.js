import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

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
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(5, 10, 5);
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
scene.add(light);
light.castShadow = true;

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "#333" }),
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
plane.receiveShadow = true;
scene.add(plane);


const loader = new GLTFLoader();
loader.load("src/assets/models/Camping Stuff.glb", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      // child.material.color.set("red")
    }
  });
});

const helper = new THREE.CameraHelper(light.shadow.camera);
scene.add(helper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

function animate(t) {
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
