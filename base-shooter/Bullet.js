export default class Base {
  x;
  y;
  deg;
  canvas;
  ctx;
  speed;
  clickedPosi;

  constructor(x, y, ctx, clickedPosi) {
    this.x = x || 0;
    this.y = y || 0;
    this.ctx = ctx;
    this.clickedPosi = clickedPosi;
    this.speed = 3;
    this.velocityX = 0;
    this.velocityY = 0;

    this.canvas = {
      width: this.ctx.canvas.width,
      height: this.ctx.canvas.height
    };

    this.setDeg();
  };

  show() {
    this.ctx.save();
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.rotate(this.deg);
    this.ctx.fillStyle = 'white';
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    // this.ctx.fillRect(this.x, this.y, 10, 10);
    this.ctx.restore();
  }

  update() {
    this.x = this.x + this.speed;
    this.y = this.y + this.speed;
  }

  setDeg() {
    let targetX = (this.clickedPosi.x - this.canvas.width / 2) - this.x;
    let targetY = (this.clickedPosi.y - this.canvas.height / 2) - this.y;
    this.deg = Math.atan2(targetY, targetX) - Math.PI / 4;
  }

  isOutofCanvas() {
    if(
      this.x > this.canvas.width / 2 || this.x < -this.canvas.width / 2 ||
      this.y > this.canvas.height / 2 || this.y < -this.canvas.height / 2
    ) {
      return true;
    } else {
      return false;
    }
  }
}