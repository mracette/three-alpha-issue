import * as THREE from "three";
import { BoxBufferGeometry } from "three";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";

const PATH_TO_TEXTURE = "src/assets/particle1.png";
const SIZE = 500;
const CANVAS_STYLE = `width: ${SIZE}px; height: ${SIZE}px; position: absolute; top: 10; left: 10; border: 1px solid black; z-index: 2`;

const init = () => {
  let scene = new THREE.Scene();
  let camera = new THREE.OrthographicCamera(0, SIZE, 0, SIZE, 0, 10000);
  let renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.clearColor = new THREE.Color(0x00ff00);
  renderer.setSize(SIZE, SIZE);
  renderer.domElement.style = CANVAS_STYLE;
  document.body.appendChild(renderer.domElement);
  return { scene, camera, renderer };
};

const drawLine = () => {
  const { scene, camera, renderer } = init();
  // const points = [0, SIZE / 2, -1, SIZE, SIZE / 2, -1];
  // const points = [0, 0, 0, SIZE / 2, SIZE / 2, 0, SIZE, SIZE, 0];
  const vectors = [
    new THREE.Vector3(0, SIZE / 2, -5),
    new THREE.Vector3(SIZE / 2, SIZE / 3, -5),
    new THREE.Vector3(SIZE, SIZE / 2, -5),
  ];
  const points = vectors.map((v) => [v.x, v.y, v.z]).flat();
  const colors = new Array(vectors.length * 3).fill(255);

  const lineGeo = new LineGeometry();
  lineGeo.setPositions(points);
  lineGeo.setColors(colors);

  const lineMat = new LineMaterial({
    color: 0xffffff,
    linewidth: 0.1, // in pixels
    vertexColors: true,
    //resolution:  // to be set by renderer, eventually
    dashed: false,
    alphaToCoverage: true,
  });

  console.log(points, colors);

  const line = new Line2(lineGeo, lineMat);

  scene.add(line);

  // const render = () => {
  //     renderer.render(scene, camera);
  //   window.requestAnimationFrame(render);
  // };
  // window.requestAnimationFrame(render);

  renderer.render(scene, camera);
};

const runAll = () => {
  drawLine();
};

runAll();
