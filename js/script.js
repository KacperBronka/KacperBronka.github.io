// Canvas
const canvas = document.querySelector("canvas.webgl");

//Texture Loader
const loader = new THREE.TextureLoader();
const star = loader.load("img/star.png");
// Scene
const scene = new THREE.Scene();

let boxSize = 1;
if (window.innerWidth < 500) {
  boxSize = 0.8;
}
// Objects
const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize, 30, 30, 30);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 5000;

const posArr = new Float32Array(particlesCnt * 3);

for (let i = 0; i < particlesCnt * 3; i++) {
  posArr[i] = (Math.random() - 0.5) * (Math.random() * 5);
}

particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArr, 3));

// Materials

const material = new THREE.PointsMaterial({
  size: 0.005,
  color: "#99ffff",
});

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.005,
  map: star,
  transparent: true,
  color: "white",
});

// Mesh
const sphere = new THREE.Points(geometry, material);
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(sphere, particles);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color("#232323"));

//Mouse

/**
 * Animate
 */

const clock = new THREE.Clock();

let color = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.material.color.r = Math.sin(elapsedTime);
  sphere.material.color.g = Math.sin(elapsedTime * 0.8) + 0.2;

  particles.rotation.y = elapsedTime * -0.1;
  particles.rotation.x = 0.03 * elapsedTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
