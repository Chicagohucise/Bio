import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scence();

const camear = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1,1000)

const  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window,innerHeight);
camear.position.setZ(30);

renderer.render(scene,camear);

const  geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshBasicMaterial({color:0xFF6347, wireframe:true});
const torus = new THREE.Mesh(geometry,material)

scene.add(torus)

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camear);
}

animate()