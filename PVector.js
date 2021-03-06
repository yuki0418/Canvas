export default class PVector {
  constructor(x_, y_) {
    this.x = x_;
    this.y = y_;
  }

  /**
   * Return this PVector values
   */
  get() {
    const v3 = new PVector(this.x, this.y);
    return v3;
  }

  /**
   * Add vectors
   * @param {PVector} v 
   */
  add(v) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
  }

  static add(v1, v2) {
    let v3 = new PVector(v1.x + v2.x, v1.y + v2.y);
    return v3;
  }

  /**
   * Subtract vectors
   * @param {PVector} v
   */
  sub(v) {
    this.x = this.x - v.x;
    this.y = this.y - v.y;
  }

  static sub(v1, v2) {
    let v3 = new PVector(v1.x - v2.x, v1.y - v2.y);
    return v3;
  }

  /**
   * Scale the vector with multiplication
   * @param {Number} n
   */
  mult(n) {
    this.x = this.x * n;
    this.y = this.y * n;
  }

  /**
   * Scale the vector with division
   * @param {Number} n
   */
  div(n) {
    this.x = this.x / n;
    this.y = this.y / n;
  }

  /**
   * 
   * @param {PVector} vector 
   * @param {number} n 
   */
  static div(vector, n) {
    let newVector = new PVector(vector.x, vector.y);
    newVector.div(n);
    return newVector;
  }

  /**
   * Calculate the magnitude of a vector
   */
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * set the magnitude of a vector
   */
  setMag() {}

  /**
   * normalize the vector to a unit length of 1
   */
  normalize() {
    let m = this.mag();
    if(m != 0) {
      this.div(m);
    }
  }

  /**
   * limit the magnitude of a vector
   */
  limit(max) {
    if(this.x > max) this.x = max;
    if(this.y > max) this.y = max;
  }

  /**
   * the 2D heading of a vector expressed as an angle
   */
  heading() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * rotate a 2D vector by an angle
   */
  rotate() {}

  /**
   * linear interpolate to another vector
   */
  lerp() {}

  /**
   * the Euclidean distance between two vectors (considered as points)
   */
  dist() {}

  /**
   * find the angle between two vectors
   */
  angleBetween() {}

  /**
   * the dot product of two vectors
   */
  dot() {}

  /**
   *  the cross product of two vectors (only relevant in three dimensions)
   */
  cross() {}

  /**
   * make a random 2D vector
   */
  random2D() {}

  /**
   * make a random 3D vector
   */
  random3D() {}
}