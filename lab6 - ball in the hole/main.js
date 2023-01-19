var canvas;
var ctx;
var x = 75;
var y = 75;
var maxX = 300;
var maxY = 150;
var dx = 0;
var dy = 0;
var holeX = 200;
var holeY = 75;
var holeWidth = 20;
var holeHeight = 20;
var score = 0;
var speed = 5;

function startGame() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    window.addEventListener('deviceorientation', handleOrientation);
    animate();
}


function handleOrientation(event) {
    var beta = event.beta;
    var gamma = event.gamma;

    dx = (gamma / 90) * speed;
    dy = (beta / 180) * speed;
}
function checkCollision() {
    if (x > holeX && x < holeX + holeWidth && y > holeY && y < holeY + holeHeight) {
        alert("You scored a point!");
        score++;
        document.getElementById("score").innerHTML = score;
        x = 75;
        y = 75;
    }
}


function draw() {
    ctx.clearRect(0, 0, maxX, maxY);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "#000000";
    ctx.fillRect(holeX, holeY, holeWidth, holeHeight);

    x += dx;
    y += dy;

    if (x > maxX - 10) {
        x = maxX - 10;
        dx = -dx;
    }
    if (x < 10) {
        x = 10;
        dx = -dx;
    }
    if (y > maxY - 10) {
        y = maxY - 10;
        dy = -dy;
    }
    if (y < 10) {
        y = 10;
        dy = -dy;
    }
    checkCollision();
}

var startTime = performance.now();

function updateTime() {
    var currentTime = performance.now();
    var elapsedTime = (currentTime - startTime) / 1000;
    document.getElementById("time").innerHTML = "Czas: " + elapsedTime;
}
function animate() {
  draw();
  updateTime();
  requestAnimationFrame(animate);
}
