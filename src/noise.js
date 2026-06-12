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
const render = new THREE.WebGLRenderer();
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const controls = new OrbitControls(camera, render.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: {
      value: 1,
    },
  },
  vertexShader: `
    uniform float uTime;
    varying vec2 vUv;
    void main(){
    vUv = uv;
    vec3 pos = position;
    pos += normal * sin(pos.y * 20.0 - uTime * 3.0) * 0.1;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
    `,
  fragmentShader: `
    uniform float uTime;
    varying vec2 vUv;
    void main() {
    float stripes = sin(vUv.y * 20.0 + uTime);
    float stripes2 = sin(vUv.x * 13.0 - uTime);
    float pattern = stripes * stripes2;
    float d = distance(vUv, vec2(0.5));
    // gl_FragColor = vec4(pattern, 0.0, 1.0, 1.0);
    gl_FragColor = vec4(d, 0.0, 1.0, 1.0);
    }
    `,
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);



function animate(t) {
    material.uniforms.uTime.value = t * 0.001;
  controls.update();
  render.render(scene, camera);
}

render.setAnimationLoop(animate);
