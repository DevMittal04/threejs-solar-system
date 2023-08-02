import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Textures
import sunTexture from "../img/sun.jpg"
import starsTexture from "../img/stars.jpg"
import mercuryTexture from "../img/mercury.jpg"
import venusTexture from "../img/venus.jpg"
import earthTexture from "../img/earth.jpg"
import marsTexture from "../img/mars.jpg"
import jupiterTexture from "../img/jupiter.jpg"
import saturnTexture from "../img/saturn.jpg"
import saturnRingTexture from "../img/saturn-ring.png"
import uranusTexture from "../img/uranus.jpg"
import uranusRingTexture from "../img/uranus-ring.png"
import neptuneTexture from "../img/neptune.jpg"
import plutoTexture from "../img/pluto.jpg"

// Scene, Camera, Renderer and Orbit Controls
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(-90, 200, 140)
orbit.update();

// Ambient Light for the Whole Scene
const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

// Cube Texture for the Whole Scene
const cubeTextureLoader = new THREE.CubeTextureLoader()
scene.background = cubeTextureLoader.load([starsTexture, starsTexture, starsTexture, starsTexture, starsTexture, starsTexture])

// Texture Loader
const textureLoader = new THREE.TextureLoader()

// Sun
const sunGeometry = new THREE.SphereGeometry(16, 30, 30)
const sunMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture)
})
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
scene.add(sun)

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

// createPlanet Function
function createPlanet(size, texture, position, ring) {
  const geometry = new THREE.SphereGeometry(size, 30, 30)
  const material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(texture)
  })
  const mesh = new THREE.Mesh(geometry, material)
  const obj = new THREE.Object3D()
  obj.add(mesh)
  if (ring) {
    const ringGeometry = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32)
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide
    })
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial)
    obj.add(ringMesh)
    ringMesh.position.x = position
    ringMesh.rotation.x = -0.5 * Math.PI
  }
  scene.add(obj)
  mesh.position.x = position
  return { mesh, obj }
}

// Planets
const mercury = createPlanet(3.2, mercuryTexture, 28)
const venus = createPlanet(4.8, venusTexture, 48)
const earth = createPlanet(5, earthTexture, 68)
const mars = createPlanet(2.6, marsTexture, 88)
const jupiter = createPlanet(11, jupiterTexture, 108)
const saturn = createPlanet(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture
})
const uranus = createPlanet(4.4, uranusTexture, 168, {
  innerRadius: 4.4,
  outerRadius: 6.4,
  texture: uranusRingTexture
})
const neptune = createPlanet(4.2, neptuneTexture, 188)
const pluto = createPlanet(1.8, plutoTexture, 208)

// Window Resizing
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function animate() {
  requestAnimationFrame(animate);

  // Rotations
  sun.rotation.y += 0.004
  mercury.mesh.rotation.y += 0.004
  venus.mesh.rotation.y += 0.002;
  earth.mesh.rotation.y += 0.02;
  mars.mesh.rotation.y += 0.018;
  jupiter.mesh.rotation.y += 0.04;
  saturn.mesh.rotation.y += 0.038;
  uranus.mesh.rotation.y += 0.03;
  neptune.mesh.rotation.y += 0.032;
  pluto.mesh.rotation.y += 0.008;

  // Revolution around Sun
  mercury.obj.rotation.y += 0.04
  venus.obj.rotation.y += 0.015;
  earth.obj.rotation.y += 0.01;
  mars.obj.rotation.y += 0.008;
  jupiter.obj.rotation.y += 0.002;
  saturn.obj.rotation.y += 0.0009;
  uranus.obj.rotation.y += 0.0004;
  neptune.obj.rotation.y += 0.0001;
  pluto.obj.rotation.y += 0.00007;

  render()
}

function render() {
  renderer.render(scene, camera);
}

animate()
