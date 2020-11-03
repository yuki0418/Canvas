let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let bird;
let pipes = [];
let frameCount = 0;

start();

function start() {
  setUp();
  draw();
}

function setUp() {
  canvas.width = 600;
  canvas.height = 500;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
  bird = new Bird();
  pipes.push(new Pipe());
  setAction();
};

// Drow canvas
function draw() {
  frameCount++;
  
  clear();

  bird.show(ctx);
  bird.update();

  // Add pipes
  if(frameCount % 40 == 0) {
    pipes.push(new Pipe());
  }

  for(let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if(pipes[i].hits(bird)) {
      console.log('hit');
      window.cancelAnimationFrame(draw);
      alert('GAME OVER\nF5 to restart');
      return;
    }

    if(pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }

  window.requestAnimationFrame(draw);
}

// Clear canvas
function clear() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setAction() {
  window.addEventListener('keypress', function(e) {
    if(e.keyCode == 32) {// space key
      // Actions
      bird.up();
    }
  })
}

/**
 * Bird
 */
function Bird() {
  this.x = 50;
  this.y = canvas.height/2;

  this.gravity = 0.6;
  this.lift = -15;
  this.velocity = 0;

  this.show = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
  }
  
  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    // Bird should in the canvas
    if(this.y > canvas.height) {
      this.y = canvas.height;
      this.velocity = 0;
    }

    if(this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}

/**
 * Pipe
 */
function Pipe() {
  this.top = Math.random() * canvas.height/2;
  this.bottom = Math.random() * canvas.height/2;
  this.x = canvas.width;
  this.w = 20;
  this.speed = 5;

  this.hits = function(bird) {
    if(bird.y < this.top || bird.y > canvas.height - this.bottom) {
      if(bird.x > this.x && bird.x < this.x + this.w) {
        return true;
      }
    }
    return false;
  }

  this.show = function() {
    ctx.beginPath();
    ctx.fillRect(this.x, 0, this.w, this.top);
    ctx.fillRect(this.x, canvas.height - this.bottom, this.w, this.bottom);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  this.update = function() {
    this.x -= this.speed;
  }

  this.offscreen = function() {
    if(this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}