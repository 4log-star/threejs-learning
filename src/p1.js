import "./style.css";
import * as THREE from "three";
import gsap from "gsap";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const mainRig = new THREE.Group();
const mouseRig = new THREE.Group();

scene.add(mainRig);
mainRig.add(mouseRig);
mouseRig.add(camera);

camera.position.set(0, 0, 20);

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshNormalMaterial(),
);
sphere.scale.set(0, 0, 0);
scene.add(sphere);
camera.lookAt(sphere.position)
const mouse = new THREE.Vector2();

const tl = gsap.timeline();
tl.to(camera.position, {
  z: 5,
  duration: 2,
})
  .to(
    sphere.rotation,
    {
      y: Math.PI * 2,
      duration: 2,
    },
    "<",
  )
  .to(sphere.scale, {
    x: 1,
    y: 1,
    z: 1,
  });

window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
  mouseRig.position.x += (mouse.x * 0.5 - mouseRig.position.x) * 0.05;
  mouseRig.position.y += (mouse.y * 0.3 - mouseRig.position.y) * 0.05;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
