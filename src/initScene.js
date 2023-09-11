import {
  // AmbientLight,
  // Audio,
  // AudioListener,
  // AudioLoader,
  // AxesHelper,
  Color,
  PerspectiveCamera,
  Scene,
  // SpotLight,
  WebGLRenderer
} from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getCubeSize } from './rubiks';

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 400;

const initScene = () => {
  // CANVAS
  const canvas = document.getElementById("ieu_cube");
  const size = getCubeSize();
  const scene = new Scene();
  const camera = new PerspectiveCamera(55, DEFAULT_WIDTH / DEFAULT_HEIGHT, 0.1, 1000);
  camera.position.set(size*1.2, size, size);

  const renderer = new WebGLRenderer({ canvas, antialias: true });

  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.setClearColor(new Color(0xFFFFFF));
  renderer.setSize(DEFAULT_WIDTH, DEFAULT_HEIGHT);
  renderer.setAnimationLoop( animation );
  renderer.shadowMap.enabled = false;

  // document.body.appendChild(renderer.domElement);

  // // orbiting camera with mouse
  const controls = new OrbitControls(camera, renderer.domElement);
  // // to disable zoom
  controls.enableZoom = false;
  // // to disable rotation
  controls.enableRotate = false;
  // // to disable pan
  controls.enablePan = false;
  controls.minDistance = size * 1.8;
  controls.maxDistance = size * 2;

  // coordinate system axes: X - red, Y - green, Z - blue
  // const axesHelper = new AxesHelper(5);
  // scene.add(axesHelper);

  // const light = new AmbientLight(0xFFFFFF, 0.5);
  // scene.add(light);

  // const spotPositions = [
  //   [1, 1, 10],
  //   [1, 1, -10],
  //   [10, 1, 1],
  //   [-10, 1, 1],
  //   [1, 10, 1],
  //   [1, -10, 1],
  // ];
  // spotPositions.forEach(position => {
  //   const spotLight = new SpotLight(0xffd500);
  //   spotLight.position.set(size * position[0], size * position[1], size * position[2]);
  //   scene.add(spotLight);
  // });

  // const listener = new AudioListener();
  // const sound = new Audio(listener);
  // const audioLoader = new AudioLoader();
  // const wavUrl = `${window.location.origin}${window.location.pathname}sounds/rotate.wav`;
  // audioLoader.load(wavUrl, function(buffer) {
  //   sound.setBuffer(buffer);
  //   sound.setVolume(0.5);
  // });

  // scene.rotation.x = Math.PI / 2;
  // scene.rotation.y = Math.PI / 2;

  function animation( time ) {

    scene.rotation.y = time / 6000;
  
    // renderer.render( scene, camera );
  
  }

  return [scene, camera, renderer, DEFAULT_WIDTH, DEFAULT_HEIGHT ]; // ,sound, controls
};

export default initScene;
