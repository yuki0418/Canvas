let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let ball;
let bar;
let blocks = [];
let deletedBlocks = 0;
let score;
let isGameEnd = false;
const numBlockX = 10;
const numBlockY = 3;

let inputedKeys = [];

setup();
drow();

function setup() {
  canvas.width = 600;
  canvas.height = 500;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.height);
  
  ball = new Ball();
  bar = new Bar()
  score = new Score();

  for(let x = 0; x < numBlockX; x++) {
    for(let y = 0; y < numBlockY; y++) {
      blocks.push(new Block(((canvas.width/numBlockX) * x) + 7, (y + 3) * 15));
    }
  };
  
  addKeyEvent();
}

function drow() {
  clear();

  ball.show()
  ball.update();

  bar.show();
  bar.update();

  score.show();

  blocks.map(block => {
    block.show();
    block.update();
  });

  if(isGameEnd || blocks.length == deletedBlocks) {
    endGame();
  } else { 
    window.requestAnimationFrame(drow);
  }
}

function clear() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function endGame() {
  window.cancelAnimationFrame(drow);

  alert('Game over\nScore is ' + score.score + '\nEnter F5 to restart');
};

function addKeyEvent() {
  window.addEventListener('keydown', function(e) {
    inputedKeys.push(e.key);
  });

  window.addEventListener('keyup', function(e) {
    inputedKeys = inputedKeys.filter(key => {
      return key !== e.key;
    });
  });
}

function Score() {
  this.score = 0;

  this.addScore = function() {
    ++this.score;
  };

  this.show = function() {
    ctx.font = '16px serif';
    ctx.fillText('SCORE: ' + this.score, canvas.width - 90, 25);
  }
}

function Ball() {
  this.x = canvas.width / 2;
  this.y = canvas.height / 2;
  this.velocityX = 0;
  this.velocityY = 1;
  this.speed = 4;

  this.show = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
  }

  this.update = function() {
    this.hitWall();
    this.hitBar();
    this.x += this.speed * this.velocityX;
    this.y += this.speed * this.velocityY;
  }

  this.hitWall = function() {
    if(this.x >= canvas.width || this.x <= 0) {
      this.velocityX *= -1;
    }
    if(this.y <= 0) {
      this.velocityY *= -1;
    }
    if(this.y >= canvas.height) { // Hit Bottom
      isGameEnd = true;
      this.velocityX = 0;
      this.velocityY = 0;
    }
  }

  this.hitBar = function() {
    if(
      (this.x >= bar.x && this.x <= bar.x + bar.width) &&
      (this.y >= bar.y && this.y <= bar.y + bar.height)) {
      this.velocityY *= -1;
      let ramNum = Math.random();
      ramNum *= Math.round(Math.random()) ? 1 : -1;
      this.velocityX = ramNum;
    }
  }

  this.hitBlock = function() {
    this.velocityY *= -1;
  }
}

function Bar() {
  this.width = 100;
  this.height = 10;
  this.x = (canvas.width / 2) - (this.width / 2);
  this.y = canvas.height - 50;
  this.speed = 5;
  this.velocity = 0;

  this.show = function() {
    ctx.beginPath();
    this.width = 100 - (this.width / blocks.length * deletedBlocks) + 30;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'white';
    ctx.closePath();
  }

  this.update = function() {
    if(
      (inputedKeys[inputedKeys.length - 1] === 'a' || inputedKeys[inputedKeys.length - 1] === 'A') &&
      this.x >= 0) {
      this.moveLeft();
    } else if(
      (inputedKeys[inputedKeys.length - 1] === 'd' || inputedKeys[inputedKeys.length - 1] === 'D') &&
      this.x + this.width <= canvas.width) {
      this.moveRight();
    } else {
      this.moveStop()
    }

    this.x += this.velocity;
  }

  this.moveRight = function() {
    this.velocity = this.speed;
  }

  this.moveLeft = function() {
    this.velocity = this.speed * -1;
  }
  
  this.moveStop = function() {
    this.velocity = 0;
  }
};

function Block(x, y) {
  this.x = x;
  this.y = y;
  this.width = canvas.width / numBlockX - 15;
  this.height = 5;
  this.removed = false;

  this.show = function() {
    if(!this.removed) {
      ctx.beginPath();
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = 'white';
      ctx.closePath();
    }
  }

  this.update = function() {
    this.hitBall();
  }

  this.hitBall = function() {
    if(
      (ball.x > this.x && ball.x < this.x + this.width) &&
      (ball.y > this.y && ball.y < this.y + this.height) &&
      !this.removed
    ) {
      this.removed = true;
      this.clear();
      ball.hitBlock();
      ++deletedBlocks;
      score.addScore();
    }
  }

  this.clear = function() {
    ctx.clearRect(this.x, this.y, this.width, this.height);
  }
}