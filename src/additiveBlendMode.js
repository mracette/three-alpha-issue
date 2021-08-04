import * as THREE from "three";

const PATH_TO_TEXTURE = "src/assets/particle1.png";
const SIZE = 500;
const CANVAS_STYLE = `width: ${SIZE}px; height: ${SIZE}px; position: absolute; top: 10; left: 10; border: 1px solid black; z-index: 2`;

const init = () => {
  let scene = new THREE.Scene();
  let camera = new THREE.OrthographicCamera(0, SIZE, 0, SIZE, 0, 10000);
  let renderer = new THREE.WebGLRenderer({
    alpha: true,
  });
  renderer.setSize(SIZE, SIZE);
  renderer.domElement.style = CANVAS_STYLE;
  document.body.appendChild(renderer.domElement);
  return { scene, camera, renderer };
};

const loader = new THREE.TextureLoader();

const drawTopLayer = async () => {
  const { scene, camera, renderer } = init();
  const texture = await loader.loadAsync(PATH_TO_TEXTURE);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([0, 0, 0], 3)
  );
  geometry.attributes.position.needsUpdate = true;
  const material = new THREE.PointsMaterial({
    map: texture,
    side: THREE.DoubleSide,
    size: SIZE / 4,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthTest: false,
  });
  material.needsUpdate = true;
  const point = new THREE.Points(geometry, material);
  point.position.set(SIZE / 2, SIZE / 2, -5);
  scene.add(point);
  renderer.render(scene, camera);
};

const runAll = async () => {
  await drawTopLayer();
};

runAll();
