import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";

const w =window.innerWidth;
const h = window.innerHeight;

const renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setSize(w, h);

document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 5;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampinFactor = 0.05;

const geo =  new THREE.IcosahedronGeometry(1.0, 2);

const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true

});

const mesh = new THREE.Mesh(geo, mat);

scene.add(mesh);

const hemLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);

scene.add(hemLight);


const wireMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true
})

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

// renderer.render(scene, camera);

function animate(t = 0) {
     requestAnimationFrame(animate);
    //  mesh.scale.setScalar(Math.cos(t * 0.001) + 1.0);
    mesh.rotateY(0.01);
     renderer.render(scene, camera);
     controls.update();
    
}
animate();