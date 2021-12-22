import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)



const hlight = new THREE.AmbientLight(0x404040, 1);
scene.add(hlight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);
const light = new THREE.PointLight(0xc4c4c4, 1);
light.position.set(0, 300, 500);
scene.add(light);
const light2 = new THREE.PointLight(0xc4c4c4, 1);
light2.position.set(500, 100, 0);
scene.add(light2);
const light3 = new THREE.PointLight(0xc4c4c4, 1);
light3.position.set(0, 100, -500);
scene.add(light3);
const light4 = new THREE.PointLight(0xc4c4c4, 1);
light4.position.set(-500, 300, 500);
scene.add(light4);


const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setClearColor(0xffffff, 0);
const parent = document.getElementById("threejs")
renderer.setSize(parent.offsetWidth, 400)
parent.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableZoom = false;

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(parent.offsetWidth, 400)
  render()
}

let object;
const loader = new GLTFLoader();
loader.load('media/Lemon_meho.glb', function (gltf) {
  object = gltf.scene.children[0];
  object.position.y = -0.14
  object.position.z = -0.8
  object.scale.set(0.002, 0.002, 0.002);
  scene.add(gltf.scene);
  animate();
});

function animate() {
  requestAnimationFrame(animate)

  //object ? object.rotation.z += 0.01 : null

  controls.update()

  render()
}

function render() {
  renderer.render(scene, camera)
}
animate()