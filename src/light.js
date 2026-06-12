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
renderer.shadowMap.enabled = true;

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const shinyMaterial = new THREE.MeshStandardMaterial({
  color: 0xff00ff,
  roughness: 0.5,
  metalness: 1,
//   emissive : 0xff00ff,
//   emissiveIntensity : 2
});
const shinySphere = new THREE.Mesh(sphereGeometry, shinyMaterial);

const roughMaterial = new THREE.MeshStandardMaterial({
  color: "#243999",
  roughness: 1,
  metalness: 0.5,
});

const roughSphere = new THREE.Mesh(sphereGeometry, roughMaterial);
shinySphere.position.y = 2;
roughSphere.position.y = 2;

shinySphere.castShadow = true;
roughSphere.castShadow = true;

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ color: "#1010" });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

plane.rotation.x = -Math.PI / 2;

scene.add(shinySphere);
roughSphere.position.x = 4;
scene.add(roughSphere);
scene.add(plane);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.castShadow = true;
light.position.set(5, 20, 5)

scene.add(light);

const pinkLight = new THREE.PointLight(0xff00ff, 20);
pinkLight.position.copy(shinySphere.position);
pinkLight.castShadow = true;
scene.add(pinkLight);

const blueLight = new THREE.PointLight('#243999', 20);
blueLight.position.copy(roughSphere.position)
blueLight.castShadow = true;
scene.add(blueLight)

const ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function animate(t) {
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
