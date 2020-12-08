import PVector from '../PVector.js';

export default class Vehicle {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.location = new PVector(x, y);
    this.velocity = new PVector(0,0);
    this.acceleration = new PVector(0,0);
    this.r = 3.0;
    this.maxSpeed = 3;
    this.maxForce = 0.08;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    let theta = this.velocity.heading() + Math.PI/2;
    this.ctx.fillStyle = 'black';
    this.ctx.translate(this.location.x, this.location.y);
    this.ctx.rotate(theta);
    this.ctx.beginPath();
    this.ctx.lineTo(0, 0);
    this.ctx.lineTo(-10, 20);
    this.ctx.lineTo(10, 20);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.rotate(-theta);
    this.ctx.translate(-this.location.x, -this.location.y);
  }

  run() {
    this.update();
    this.display();
  }

  /**
   * 
   * @param {PVector} target 
   */
  seek(target) {
    let desired = PVector.sub(target, this.location);
    desired.div(2);
    desired.normalize();
    desired.mult(this.maxSpeed);

    let steer = PVector.sub(desired,this.velocity);
    steer.limit(this.maxForce);

    this.applyForce(steer);
  }

  /**
   * 
   * @param {PVector} force 
   */
  applyForce(force) {
    this.acceleration.add(force);
  }
}