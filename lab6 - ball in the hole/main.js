var holes = [];
var posX;
var posY;
var holeX;
var holeY;
var startGame = false;
var startDate;
var czasGry;
var lastEventTimestamp;
let container = document.querySelector('.container');
var ball = document.querySelector(".ball");

var maxX = container.clientWidth  - ball.clientWidth;
var maxY = container.clientHeight - ball.clientHeight;

function handleOrientation(event) {
    var y = event.beta;
    var x = event.gamma; 

    if (x >  90) { x =  90};
    if (x < -90) { x = -90};

    x += 90;
    y += 90;
    
    var currentEventTimestamp = new Date().getTime();
    if (!lastEventTimestamp || currentEventTimestamp - lastEventTimestamp > 50) {
        lastEventTimestamp = currentEventTimestamp;
        if ((maxX*x/180 - 22) < maxX && (maxY*y/180 - 22) < maxY)
        {
            ball.style.top  = (maxY*y/180 - 22) + "px";
            ball.style.left = (maxX*x/180 - 22) + "px";
            posX = maxX*x/180 - 22;
            posY = maxY*y/180 - 22;
            checkCollision();
        }
    }
}

function start() {
    if (startGame = true){
        startDate = new Date();
        countTime;
        createHoles();
    }
}

function createHoles() {
    for (i = 0; i < (container.clientWidth/100); i++ ) {
        let hole = document.createElement('div');
        hole.classList.add("hole");
        holeX = Math.random() * (container.clientWidth - 77);
        holeY = Math.random() * (container.clientHeight - 77);
        hole.style.left = holeX + 'px';
        hole.style.top = holeY + 'px';
        holes.push(hole);
        container.appendChild(hole);
    }
    getGoodHole();
}

function checkCollision() {
    for (let i = 0; i < holes.length; i++) {
        if(posY < Math.floor(holes[i].style.top.slice(0,-2)) + 30 && posY > holes[i].style.top.slice(0,-2)){
            if(posX > holes[i].style.left.slice(0,-2) && posX < Math.floor(holes[i].style.left.slice(0,-2)) + 30){
                if(holes[i].classList.contains("goodHole")){
                    startGame = false;
                    stopTimer();
                    var isWinner = window.confirm('Gratulacje! Wygrales rozgrywkę. Czas trwania gry: '+ czasGry + '. Czy chcesz zagrać ponownie?');
                    if (isWinner) {
                        holes.length = 0;
                        container.innerHTML = '';
                        startGame = true;
                        start();
                    }
                }
                else if(holes[i].classList.contains("hole")) {
                    startGame = false;
                    stopTimer();
                    var isLoser = window.confirm('Nie udalo Ci sie:( Czas trwania gry: ' + czasGry + '. Czy chcesz zagrać ponownie?');
                    if (isLoser) {
                        holes.length = 0;
                        container.innerHTML = '';
                        startGame = true;
                        start();
                    }
                }
            }
        }
    }
}

var countTime = setInterval(startTimer, 1000);
function startTimer() {
    if (startGame == true) {
        var date = new Date();
        czasGry = (Math.abs(date - startDate))/1000;
        document.getElementById("czas").innerHTML = czasGry;
    }
}

function stopTimer() {
    if (startGame == false) {
        var date = new Date();
        czasGry = (Math.abs(date - startDate))/1000;
        document.getElementById("czas").innerHTML = czasGry;
    }
}

function getGoodHole() {
    let goodHole = Math.floor(Math.random()* holes.length);
    if (goodHole > holes.length - 1) {
        goodHole--;
    }
    else if (goodHole < 0) {
        goodHole++;
    }
    console.log(goodHole)
    holes[goodHole].classList.remove('hole');
    holes[goodHole].classList.add('goodHole');

window.addEventListener('deviceorientation', handleOrientation, true)
};
