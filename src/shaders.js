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

const material = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 1 },
  },

  vertexShader: `
  uniform float uTime;
    varying vec2 vUv;

    void main() {

      vUv = uv;
      vec3 pos = position;
      // pos.x += sin(uTime) * 0.5;
      // pos.y += sin(pos.x * 5.0 + uTime) * 0.2;
      // pos.y += sin(uTime) * 0.5;
      // pos += normal * sin(uTime) * 0.2;
      // pos += normal * sin(pos.y * 10.0 + uTime) * 0.1;
      // pos += normal * sin(pos.x * 10.0 + uTime) * 0.1;
      // pos += normal * sin(pos.z * 10.0 + uTime) * 0.1;
      // pos += normal * sin(pos.x * 10.0 + pos.y * 10.0 + uTime) * 0.1;
      // pos += normal * sin(pos.y * 10.0 + uTime) * 0.1;
      // pos += normal * sin(pos.y * 10.0 - uTime);
      pos += normal * sin(pos.y * 20.0 - uTime * 3.0) * 0.1;
      

      gl_Position =
        projectionMatrix *
        modelViewMatrix *
        vec4(pos, 1.0);

    }
  `,

  fragmentShader: `
    uniform float uTime;

    varying vec2 vUv;

    void main() {

      // float wave = sin(vUv.x * 50.0 + uTime);
      // float pulse = sin(uTime * 3.0) * 0.5 + 0.5;

      // float stripes = sin(vUv.y * 50.0 + uTime);
      float pulse = sin( uTime) * 0.5 + 0.5;
      float stripes = sin(vUv.y  * 50.0 + uTime * pulse) * 0.5 + 0.5;

      float r = sin(uTime) * 0.5 + 0.5;
  float g = sin(uTime + 2.0) * 0.5 + 0.5;
  float b = sin(uTime + 4.0) * 0.5 + 0.5;

      // gl_FragColor = vec4(stripes, 0.0, 1.0, 1.0);



float finalColor = stripes * pulse;
// gl_FragColor = vec4(finalColor, 0.0, 1.0, 1.0);
gl_FragColor = vec4(r*stripes, g*stripes, b*stripes, 1.0);

        // gl_FragColor = vec4(pulse * 5.0, 0.0, 1.0, 0.0);

    

   

     
      // gl_FragColor =  vec4(pulse, 0.0, 1.0, 1.0) ;

    }
  `,
});

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), material);

scene.add(sphere);

const planeGeo = new THREE.PlaneGeometry(1, 1);
const planeMat = new THREE.ShaderMaterial({});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;

function animate(t) {
  material.uniforms.uTime.value = t * 0.001;
  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
