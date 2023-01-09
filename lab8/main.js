const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const numBalls = document.getElementById("numBalls");
const minDist = document.getElementById("minDist");

let balls = [];
let running = false;

function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
}

Ball.prototype.update = function() {
  this.x += this.dx;
  this.y += this.dy;

  if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
    this.dx = -this.dx;
  }

  if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
    this.dy = -this.dy;
  }

  this.draw();
}

function connectBalls(ball1, ball2) {
  let dist = Math.sqrt(Math.pow(ball2.x - ball1.x, 2) + Math.pow(ball2.y - ball1.y, 2));
  if (dist < minDist.value) {
    ctx.beginPath();
    ctx.moveTo(ball1.x, ball1.y);
    ctx.lineTo(ball2.x, ball2.y);
    ctx.stroke();
  }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    for (let i = 0; i < balls.length; i++) {
      balls[i].update();
      for (let j = i + 1; j < balls.length; j++) {
        connectBalls(balls[i], balls[j]);
      }
    }
  }
  
  function start() {
    if (!running) {
      running = true;
      balls = [];
      for (let i = 0; i < numBalls.value; i++) {
        let radius = Math.floor(Math.random() * 20) + 10;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 2;
        let dy = (Math.random() - 0.5) * 2;
        let color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        balls.push(new Ball(x, y, dx, dy, radius, color));
      }
      animate();
    }
  }
  
  function reset() {
    running = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
