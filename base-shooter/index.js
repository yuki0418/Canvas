import Base from './Base.js';
import Bullet from './Bullet.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = 500;
let canvasHeight = window.innerHeight;
let mouse = {
  x: 0, y: 0
};
let base;
let bullets = [];

function setup() {
  initAddEvents();

  // Setup canvas
  clear();

  base = new Base(0, 0, 0, ctx);
}

function start() {
  window.requestAnimationFrame(draw);
}

function draw() {
  clear();

  base.update();
  base.show();

  // update and show bullets
  for(let i in bullets) {
    bullets[i].update();
    bullets[i].show();

    if(bullets[i].isOutofCanvas()) {
      bullets.splice(i, 1);
    };
  }

  window.requestAnimationFrame(draw);
}

function clear() {
  // Setup canvas
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvasWidth,canvasHeight);
}


function reset() {}

function end() {}

function initAddEvents() {
  // Get Cliant location on Canvas
  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    base.rotate(mouse);
  });

  // Click action
  canvas.addEventListener('click', (event) => {
    const clickedPosi = {
      x: event.offsetX,
      y: event.offsetY
    }
    bullets.push(new Bullet(0, 0, ctx, clickedPosi));
  });
}

setup();
start();