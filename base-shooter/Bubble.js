class Bubble {
  x;
  y;
  ctx;
  r;
  velocityX;
  velocityY;
  speed;
  health; // Hit point

  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.speed = (Math.random() * 0.003) + 0.001;
    this.ctx = ctx;
    this.setVelocities();
    this.setHealth();
    this.setRadius();
  };

  show() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = 'white';
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  update() {
    this.x += this.velocityX * this.speed;
    this.y += this.velocityY * this.speed;
  }

  setVelocities() {
    this.velocityX = this.ctx.canvas.width / 2 - this.x;
    this.velocityY = this.ctx.canvas.height / 2 - this.y;
  }

  setHealth() {
    const randomHelth = Math.floor(Math.random() * 5);
    this.health = randomHelth;
  }

  setRadius() {
    this.r = 15 + this.health * 5;
  }

  isBulleHit(bullet) {
    // Get distance
    let distance_x = this.x - bullet.x;
    let distance_y = this.y - bullet.y;
    let radii_sum = this.r + bullet.r;

    if(distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum) {
      return true;
    }
    return false;
  }
}