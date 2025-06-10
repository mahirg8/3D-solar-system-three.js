import * as THREE from "https://unpkg.com/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js";

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-50, 90, 150);

// Controls
const orbit = new OrbitControls(camera, renderer.domElement);

// Lights
const sunLight = new THREE.PointLight(0xffffff, 4, 300);
scene.add(sunLight);
const ambientLight = new THREE.AmbientLight(0xffffff, 0);
scene.add(ambientLight);

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load("./image/stars.jpg");
const sunTexture = textureLoader.load("./image/sun.jpg");
const mercuryTexture = textureLoader.load("./image/mercury.jpg");
const venusTexture = textureLoader.load("./image/venus.jpg");
const earthTexture = textureLoader.load("./image/earth.jpg");
const marsTexture = textureLoader.load("./image/mars.jpg");
const jupiterTexture = textureLoader.load("./image/jupiter.jpg");
const saturnTexture = textureLoader.load("./image/saturn.jpg");
const uranusTexture = textureLoader.load("./image/uranus.jpg");
const neptuneTexture = textureLoader.load("./image/neptune.jpg");
const plutoTexture = textureLoader.load("./image/pluto.jpg");
const saturnRingTexture = textureLoader.load("./image/saturn_ring.png");
const uranusRingTexture = textureLoader.load("./image/uranus_ring.png");

// Background
const cubeTextureLoader = new THREE.CubeTextureLoader();
const cubeTexture = cubeTextureLoader.load([
  starTexture, starTexture, starTexture,
  starTexture, starTexture, starTexture,
]);
scene.background = cubeTexture;

// Add Stars
function addStars(count) {
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < count; i++) {
    const x = THREE.MathUtils.randFloatSpread(1000);
    const y = THREE.MathUtils.randFloatSpread(1000);
    const z = THREE.MathUtils.randFloatSpread(1000);
    positions.push(x, y, z);
  }

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.2,
    sizeAttenuation: true,
  });

  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
}
addStars(2000);

// Sun
const sunGeo = new THREE.SphereGeometry(15, 50, 50);
const sunMat = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Paths
const path_of_planets = [];
function createLineLoopWithMesh(radius, color = 0xffffff, width = 1) {
  const geometry = new THREE.BufferGeometry();
  const points = [];
  const segments = 100;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(radius * Math.cos(angle), 0, radius * Math.sin(angle));
  }
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
  const material = new THREE.LineBasicMaterial({ color, linewidth: width });
  const line = new THREE.LineLoop(geometry, material);
  scene.add(line);
  path_of_planets.push(line);
}

// Planet Creator
const genratePlanet = (size, texture, x, ring) => {
  const geo = new THREE.SphereGeometry(size, 50, 50);
  const mat = new THREE.MeshStandardMaterial({ map: texture });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  mesh.position.set(x, 0, 0);

  if (ring) {
    const ringGeo = new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      map: ring.ringmat,
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(x, 0, 0);
    ringMesh.rotation.x = -Math.PI / 2;
    obj.add(ringMesh);
  }

  obj.add(mesh);
  scene.add(obj);
  createLineLoopWithMesh(x);

  return { planetObj: obj, planet: mesh };
};

// Planets Array
const planets = [
  { name: "Mercury", ...genratePlanet(3.2, mercuryTexture, 28), rotation: 0.004, revolution: 0.004 },
  { name: "Venus", ...genratePlanet(5.8, venusTexture, 44), rotation: 0.002, revolution: 0.015 },
  { name: "Earth", ...genratePlanet(6, earthTexture, 62), rotation: 0.02, revolution: 0.01 },
  { name: "Mars", ...genratePlanet(4, marsTexture, 78), rotation: 0.018, revolution: 0.008 },
  { name: "Jupiter", ...genratePlanet(12, jupiterTexture, 100), rotation: 0.04, revolution: 0.002 },
  {
    name: "Saturn",
    ...genratePlanet(10, saturnTexture, 138, {
      innerRadius: 10,
      outerRadius: 20,
      ringmat: saturnRingTexture,
    }),
    rotation: 0.038,
    revolution: 0.0009,
  },
  {
    name: "Uranus",
    ...genratePlanet(7, uranusTexture, 176, {
      innerRadius: 7,
      outerRadius: 12,
      ringmat: uranusRingTexture,
    }),
    rotation: 0.03,
    revolution: 0.0004,
  },
  { name: "Neptune", ...genratePlanet(7, neptuneTexture, 200), rotation: 0.032, revolution: 0.0001 },
  { name: "Pluto", ...genratePlanet(2.8, plutoTexture, 216), rotation: 0.008, revolution: 0.0007 },
];

// GUI
const gui = new dat.GUI();
const options = {
  "Real view": true,
  "Show path": true,
};
gui.add(options, "Real view").onChange(e => ambientLight.intensity = e ? 0 : 0.5);
gui.add(options, "Show path").onChange(e => path_of_planets.forEach(p => p.visible = e));

planets.forEach(p => {
  const folder = gui.addFolder(p.name);
  folder.add(p, "revolution", 0, 0.05).name("Revolution Speed");
  folder.add(p, "rotation", 0, 0.05).name("Rotation Speed");
});

// Animate
function animate() {
  sun.rotateY(0.004);
  planets.forEach(p => {
    p.planetObj.rotateY(p.revolution);
    p.planet.rotateY(p.rotation);
  });
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
