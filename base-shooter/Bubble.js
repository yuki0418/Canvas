class Bubble {
  x;
  y;
  ctx;
  r;
  velocityX;
  velocityY;
  speed;
  health; // Hit point
  maxHealth;
  isHitted;
  isKilled;

  colors = [
    '#EA6B54',
    '#EBB160',
    '#F3D788',
    '#97A87D',
    '#B3ACA0',
  ]

  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.speed = 0.0007;
    this.ctx = ctx;
    this.isHitted = false;
    this.isKilled = false;
    this.maxHealth = 5;
    this.setVelocities();
    this.setHealth();
    this.setRadius();
  };

  show() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.fillStyle = this.colors[this.health - 1] || 'white';
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  update() {
    this.x += this.velocityX * (this.maxHealth - this.health) * this.speed;
    this.y += this.velocityY * (this.maxHealth - this.health) * this.speed;
  }

  setVelocities() {
    this.velocityX = this.ctx.canvas.width / 2 - this.x;
    this.velocityY = this.ctx.canvas.height / 2 - this.y;
  }

  setHealth() {
    const randomHelth = Math.floor(Math.random() * this.maxHealth) + 1;
    this.health = randomHelth;
  }

  setRadius() {
    this.r = 15 + this.health * 5;
  }

  isBulletHit(bullet) {
    // Get distance
    let distance_x = this.x - bullet.x;
    let distance_y = this.y - bullet.y;
    let radii_sum = this.r + bullet.r;

    if(distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum) {
      this.isHitted = true;
      this.onDamage();
      return true;
    }
    return false;
  }

  onDamage() {
    if(this.isHitted && this.health > 0) {
      this.health--;
      this.isHitted = false;
      this.setRadius();
    }

    if(this.health <= 0) {
      this.isKilled = true;
    }
  }

  // Pretend hit to the base
  isCenter() {
    let distance_x = this.x - this.ctx.canvas.width / 2;
    let distance_y = this.y - this.ctx.canvas.height / 2;
    let radii_sum = this.r + 10;

    if(distance_x * distance_x + distance_y * distance_y <= radii_sum * radii_sum) {
      return true;
    }
    return false;
  }
}