class Bullet {
  x;
  y;
  r;
  velocityX;
  velocityY;
  canvas;
  ctx;
  speed;
  clickedPosi;

  constructor(ctx, clickedPosi) {
    this.x = ctx.canvas.width / 2;
    this.y = ctx.canvas.height / 2;
    this.r = 3;
    this.ctx = ctx;
    this.clickedPosi = clickedPosi;
    this.speed = 3;
    this.velocityX = 0;
    this.velocityY = 0;

    this.canvas = {
      width: this.ctx.canvas.width,
      height: this.ctx.canvas.height
    };

    this.setVelocities();
  };

  show() {
    this.ctx.save();
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  update() {
    this.x += this.velocityX * this.speed;
    this.y += this.velocityY * this.speed;
  }

  setDeg() {
    let targetX = (this.clickedPosi.x - this.canvas.width / 2) - this.x;
    let targetY = (this.clickedPosi.y - this.canvas.height / 2) - this.y;
    this.deg = Math.atan2(targetY, targetX) - Math.PI / 4;

  }
  
  setVelocities() {
    let dx = this.clickedPosi.x - this.x;
    let dy = this.clickedPosi.y - this.y;
    let mag = Math.sqrt(dx * dx + dy * dy);
    this.velocityX = dx / mag;
    this.velocityY = dy / mag;
  }

  isOutofCanvas() {
    if(
      this.x > this.canvas.width || this.x < 0 ||
      this.y > this.canvas.height || this.y < 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}