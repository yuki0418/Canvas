class Base {
  x;
  y;
  deg;
  ctx;

  constructor(x, y, deg, ctx) {
    this.x = x || 0;
    this.y = y || 0;
    this.deg = deg || 0;
    this.ctx = ctx;
  };

  show() {
    const canvas = {
      width: this.ctx.canvas.width,
      height: this.ctx.canvas.height
    }
    this.ctx.save();
    this.ctx.translate(canvas.width / 2, canvas.height / 2);
    this.ctx.rotate(this.deg);
    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
    this.ctx.closePath();
    this.ctx.fill();
    
    this.ctx.beginPath();
    this.ctx.lineTo(-10, 0);
    this.ctx.lineTo(0, -20);
    this.ctx.lineTo(10, 0);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.restore();
  };

  update() {}

  rotate(mouse) {
    const canvas = {
      width: this.ctx.canvas.width,
      height: this.ctx.canvas.height
    }
    let targetX = (mouse.x - canvas.width / 2) - this.x;
    let targetY = (mouse.y - canvas.height / 2) - this.y;
    this.deg = Math.atan2(targetY, targetX) + Math.PI / 2;
  }
}