let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let stars = [];

function setup() {
  canvas.width = 500;
  canvas. height = 500;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.translate(canvas.width / 2, canvas.height / 2);

  for(let i = 0; i < 125; i++) {
    stars.push(new Star());
  }
}

function draw() {
  clear();

  for(let i in stars) {
    stars[i].update();
    stars[i].show();
  }

  window.requestAnimationFrame(draw);
}

function clear() {
  ctx.fillStyle = 'black';
  ctx.fillRect(-canvas.width/2,-canvas.height/2,canvas.width, canvas.height );
}

class Star {
  constructor() {
    this.x = Math.ceil(Math.random() * canvas.width / 2) * (Math.round(Math.random()) ? 1 : -1);
    this.y = Math.ceil(Math.random() * canvas.height / 2) * (Math.round(Math.random()) ? 1 : -1);
    this.z = 0.1;
    this.speed = 0.01;
  }

  update() {
    this.x += this.x * this.speed;
    this.y += this.y * this.speed;
    this.z += 0.01;
    this.resetPosi();
  }

  resetPosi() {
    if(
      this.x < -(canvas.width / 2) || this.x > canvas.width / 2 ||
      this.y < -(canvas.height /2) || this.y > canvas.height / 2
    ) {
      this.x = Math.ceil(Math.random() * canvas.width / 5) * (Math.round(Math.random()) ? 1 : -1);
      this.y = Math.ceil(Math.random() * canvas.height / 5) * (Math.round(Math.random()) ? 1 : -1);
      this.z = 0.01;
    }
  }

  show() {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.z, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

setup()
window.requestAnimationFrame(draw);