let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let canvasWidth = 500;
let canvasHeight = window.innerHeight;
let mouse = {
  x: 0, y: 0
};
let base;
let bullets = [];
let bubbles = [];
const numBubbles = 10;

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

  addBubbles();
  detectBullets();

  // update and show bubbles
  for(let i in bubbles) {
    bubbles[i].update();
    bubbles[i].show();
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
    bullets.push(new Bullet(ctx, clickedPosi));
  });
}

function addBubbles() {
  if(bubbles.length < numBubbles) {
    let randomX = Math.random() * this.canvas.width;
    let randomY = Math.random() * this.canvas.height;

    // Move bubble to outside of the canvas
    if(randomX < this.canvas.width / 2) {
      randomX -= this.canvas.width / 2;
    } else {
      randomX += this.canvas.width / 2;
    }
    if(randomY < this.canvas.height / 2) {
      randomY -= this.canvas.height / 2;
    } else {
      randomY += this.canvas.height / 2;
    }

    bubbles.push(new Bubble(randomX, randomY, ctx));
  }
}

function detectBullets() {
  for(let i in bubbles) {
    for(let i2 in bullets) {
      if(bubbles[i].isBulleHit(bullets[i2])) {
        bubbles.splice(i, 1);
        bullets.splice(i2, 1);
      }
    }
  }
}

setup();
start();