import { OrbitControls } from "three/examples/jsm/Addons.js";
import "./style.css";
import * as THREE from "three";
import { color } from "three/tsl";

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
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

const rayCaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// rayCaster.setFromCamera(mouse, camera);

// const geo = new THREE.SphereGeometry(1, 32, 32);
// const purpleMaterial = new THREE.MeshBasicMaterial({ color: "purple" });
// const purpleSphere = new THREE.Mesh(geo, purpleMaterial);
// const greenSphere = new THREE.Mesh(
//   geo,
//   new THREE.MeshBasicMaterial({ color: "green" }),
// );
// const orangeSphere = new THREE.Mesh(
//   geo,
//   new THREE.MeshBasicMaterial({ color: "orange" }),
// );
// greenSphere.position.x = 3;
// orangeSphere.position.x = -3;
// scene.add(purpleSphere);
// scene.add(greenSphere);
// scene.add(orangeSphere);

// const interacts = rayCaster.intersectObject(purpleSphere);
// const interacts2 = rayCaster.intersectObject()

// window.addEventListener("click", (event) => {
//   rayCaster.setFromCamera(mouse, camera);
//   const hits = rayCaster.intersectObjects(scene.children);
//   if (hits.length > 0) {
//     hits[0].object.material.color.set("red");
//   }
//   console.log(hits);
// });

// let hoveredObject = null;
// function animate(t) {
//   controls.update();
//   rayCaster.setFromCamera(mouse, camera);
//   const hits = rayCaster.intersectObjects(scene.children);
//   if (hits.length > 0) {
//     const currentObject = hits[0].object;
//     if (hoveredObject !== currentObject) {
//       if (hoveredObject) {
//         hoveredObject.material.color.set("white");
//       }
//       currentObject.material.color.set("yellow");
//       hoveredObject = currentObject;
//     }
//   } else {
//     if (hoveredObject) {
//       hoveredObject.material.color.set("whiite");
//       hoveredObject = null;
//     }
//   }
//   renderer.render(scene, camera);

// }

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshBasicMaterial({ color: "#333", side: THREE.DoubleSide }),
);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.2, 32, 32),
  new THREE.MeshBasicMaterial({ color: "red" }),
);
scene.add(sphere);

window.addEventListener("click", () => {
  rayCaster.setFromCamera(mouse, camera);

  const hits = rayCaster.intersectObject(plane);

  if (hits.length > 0) {
    const point = hits[0].point;

    sphere.position.copy(hits[0].point);
    console.log(hits[0].point, hits[0].object === sphere);
  }
});

const point = { x: 12, z: -8 };
console.log(
  THREE.MathUtils.clamp(point.x, -5, 5),
  THREE.MathUtils.clamp(point.z, -5, 5),
);

function animate(t) {
  controls.update();
  rayCaster.setFromCamera(mouse, camera);
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
