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
let isEnd = false;
let score = 0;
const numBubbles = 15;

const adsElm = document.getElementById('ads');

function setup() {
  // Setup canvas
  clear();
  drawStartScreen();
  setEventsForStartScreen();
}

function start() {
  // Set Default
  addEventsForGame();
  base = new Base(0, 0, 0, ctx);
  bullets = [];
  bubbles = [];
  isEnd = false;
  score = 0;
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
  
  // update and show bubbles
  for(let i in bubbles) {
    bubbles[i].update();
    bubbles[i].show();
  }
  
  detectBullets();

  if(!isEnd) {
    drawScore();
    window.requestAnimationFrame(draw);
  }
}

function clear() {
  // Setup canvas
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvasWidth,canvasHeight);
}

/**
 * Gameover
 */
function end() {
  isEnd = true;
  window.cancelAnimationFrame(draw);
  drawEndGame();
  setEventsForEndGame();
  adsElm.setAttribute("style", "display: block");
}

/**
 * Add event listners for game
 */
function addEventsForGame() {
  removeEventListeners();

  // Get Cliant location on Canvas
  canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    base.rotate(mouse);
  });

  // Click action
  canvas.addEventListener('click', clickHanderShoot, true);
}

/**
 * Add bubbles if lenght of bubbles is less than max number of bubbles
 */
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

/**
 * Check if the bubble is hit to the base or bullet
 */
function detectBullets() {
  for(let i in bubbles) {
    if(bubbles[i].isCenter()) {
      // Hit to the base, end game
      end();
    }

    for(let i2 in bullets) {
      if(bubbles[i]?.isBulletHit(bullets[i2])) {
        bullets.splice(i2, 1);
        if(bubbles[i].isKilled) {
          bubbles.splice(i, 1);
          score++;
        }
      }
    }
  }
}

/**
 * Display score
 */
function drawScore() {
  ctx.save();
  ctx.font = '16px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText('SCORE: ' + score, canvas.width - 80, 50);
  ctx.restore();
}

/**
 * Display start screen
 */
function drawStartScreen() {
  ctx.save();
  ctx.translate(0, -50);
  ctx.font = '24px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText('BUBBLE SHOOTER', canvas.width / 2, canvas.height / 2);
  ctx.font = '16px Arial';
  ctx.fillText('SPACE to start', canvas.width / 2, canvas.height / 2 + 50);
  ctx.fillText('Left Click to shoot', canvas.width / 2, canvas.height / 2 + 100);
  ctx.restore();
}

/**
 * Show summary for gameover
 */
function drawEndGame() {
  clear();
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.save();
  ctx.font = '24px Arial';
  ctx.fillText('SCORE: ' + score, canvas.width / 2, canvas.height / 2);
  ctx.font = '16px Arial';
  ctx.fillText('SPACE to restart', canvas.width / 2, canvas.height / 2 + 50);
  ctx.restore();
};

function setEventsForStartScreen() {
  removeEventListeners();
  window.addEventListener('keydown', handerStart, true);
}

/**
 * Set Event Listners for gameover
 */
function setEventsForEndGame() {
  removeEventListeners();
  window.addEventListener('keydown', handerReset, true);
}

/**
 * Event listner for start screen
 */
function handerStart(event) {
  if(event.key === ' ') {
    start();
  }
}

/**
 * Click event to shoot bullets
 */
function clickHanderShoot(event) {
  const clickedPosi = {
    x: event.offsetX,
    y: event.offsetY
  }
  bullets.push(new Bullet(ctx, clickedPosi));
}

function handerReset(event) {
  if(event.key === ' ') {
    adsElm.setAttribute("style", "display: none");
    start();
  }
}

/**
 * Remove event handlers
 */
function removeEventListeners() {
  window.removeEventListener('keydown', handerStart, true);
  canvas.removeEventListener('click', clickHanderShoot, true);
  window.removeEventListener('keydown', handerReset, true);
}

setup();