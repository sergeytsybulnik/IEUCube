import initScene from './initScene';
import { createRubiks } from './createRubiks';
import { debounce } from './utils';
import { doRotate, doScramble, rotateInfo, scheduleFlip } from './rotations';
import { initHtmlControls, initPointerAndTouchListeners } from './initEventListeners';
import { Clock } from 'three';

const [scene, camera, renderer, controls, DEFAULT_WIDTH, DEFAULT_HEIGHT, sound] = initScene();
const cube = createRubiks();

scene.add(cube);
scene.add(rotateInfo.rotatorObject);

// initHtmlControls(cube, sound);
initPointerAndTouchListeners(cube, controls, camera, sound);

const mouse = {
  x: 0,
  y: 0
};

window.addEventListener('mousemove', (e) => {
  mouse.x = (e.clientX / window.innerWidth)*2 - 1;
  mouse.y = -(e.clientY / window.innerHeight)*2 + 1;
});

// handle window resize
window.addEventListener('resize', debounce(() => {
  camera.aspect = DEFAULT_WIDTH / DEFAULT_HEIGHT;
  camera.updateProjectionMatrix();
  renderer.setSize(DEFAULT_WIDTH, DEFAULT_HEIGHT);
}));

var clock = new Clock();
var time = 0;
var delta = 0;

const render = () => {
  
  doRotate(cube);
  setTimeout(() => doScramble(cube), 10000);
  
  delta = clock.getDelta();
  time += delta;
  
  // cube.rotation.x = time * 4;
  scene.position.y = Math.abs(Math.sin(time))/4;
  // cube.position.z = Math.cos(time) * 4;

  scene.rotation.x = mouse.y;
  // scene.rotation.z = mouse.x;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('Webflow init');
  setTimeout(() => render(), 200);
});

// setTimeout(() => render(), 200);
