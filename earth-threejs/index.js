import * as THREE from 'three'
import {OrbitControls} from "jsm/controls/OrbitControls.js";

const w = window.innerWidth
const h = window.innerHeight

const renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setSize(w,h);

document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z=2;

// Camera is set up now scen have to set
const scene = new THREE.Scene();


const earthGroup = new THREE.Group();

earthGroup.rotation.z = -23.4 * Math.PI / 180;

scene.add(earthGroup);

// Controls for moving the object or view
const controls = new OrbitControls(camera, renderer.domElement);

// For adding some animation while moving the object
controls.enableDamping = true;
controls.dampinFactor = 0.05;

// Creating object
const geo =  new THREE.IcosahedronGeometry(1, 12);

// Add lights
const loader = new THREE.TextureLoader();
const mat = new THREE.MeshStandardMaterial({
    map:loader.load('./assets/earthmap1k.jpg'),

});

const earthMesh = new THREE.Mesh(geo, mat);
earthGroup.add(earthMesh);

const hemLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);

earthGroup.add(hemLight);

function animate(t = 0) {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    earthMesh.rotateY(0.002);
    // earthMesh.rotateX(0.001);
    controls.update();
   
}
animate();