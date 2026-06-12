import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import { HDRLoader } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const scene = new THREE.Scene();
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
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
// renderer.toneMappingExposure = 0.2;
// renderer.toneMappingExposure = 5;

document.body.appendChild(renderer.domElement);

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ color: "#333" }),
);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -2;
plane.receiveShadow = true;
scene.add(plane);

const chromeSPhere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({ color: "#3434", roughness: 0, metalness : 1 }),
);
chromeSPhere.position.x = 5;
scene.add(chromeSPhere);

const roughSPhere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({ color: "#346332", roughness: 0.5 , metalness :1}),
);
roughSPhere.position.x = 2;
scene.add(roughSPhere);
scene.environmentIntensity = 1

const loader = new GLTFLoader();
loader.load("src/assets/models/Camping Stuff.glb", (gltf) => {
  scene.add(gltf.scene);
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.metalness = 1;
      child.material.roughness = 0;

      // child.material.color.set("red")
    }
  });
});

// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.castShadow = true;
// light.position.set(5, 20, 5);

const rgbeLoader = new HDRLoader();
rgbeLoader.load(`src/assets/HDRI/suburban_garden_4k.hdr`, (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

function animate(t) {
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
