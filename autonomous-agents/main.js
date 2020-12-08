import PVector from '../PVector.js';
import Vehicle from './Vehicle.js';

let vehicle;

const size = {
  width: 600,
  height: 450,
}
const mouse = new PVector(size.width/2,size.height/2);

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function setup() {
  canvas.height = size.height;
  canvas.width = size.width;

  setupEventListeners();

  vehicle = new Vehicle(ctx, size.width/2,  size.height/2);
}

function clear() {
  ctx.clearRect(0,0, size.width, size.height);
}


function drow() {
  clear();

  vehicle.run();
  vehicle.seek(mouse);

  window.requestAnimationFrame(drow);
}

function setupEventListeners() {
  canvas.addEventListener('mousemove', setMousePosition);
}

function setMousePosition(event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}

setup();
window.requestAnimationFrame(drow);