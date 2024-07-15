const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const basket = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 30,
    width: 100,
    height: 25,
    speed: 10,
    dx: 0
};
const coffeeCups = [];
const cupSpeed = 2;
let score = 0;
let gameInterval;

document.addEventListener('keydown', moveBasket);
document.addEventListener('keyup', stopBasket);

function startGame() {
    document.getElementById('game-container').style.display = 'block';
    gameInterval = setInterval(updateGame, 20);
    generateCoffeeCups();
}

function resetGame() {
    clearInterval(gameInterval);
    coffeeCups.length = 0;
    score = 0;
    basket.x = canvas.width / 2 - 30;
    document.getElementById('game-container').style.display = 'none';
}

function moveBasket(e) {
    if (e.key === 'ArrowRight') {
        basket.dx = basket.speed;
    } else if (e.key === 'ArrowLeft') {
        basket.dx = -basket.speed;
    }
}

function stopBasket(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        basket.dx = 0;
    }
}

function updateGame() {
    clearCanvas();
    drawBasket();
    updateBasket();
    drawCoffeeCups();
    updateCoffeeCups();
    checkCollision();
    drawScore();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBasket() {
    ctx.fillStyle = '#00704A';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function updateBasket() {
    basket.x += basket.dx;

    if (basket.x < 0) {
        basket.x = 0;
    } else if (basket.x + basket.width > canvas.width) {
        basket.x = canvas.width - basket.width;
    }
}

function generateCoffeeCups() {
    setInterval(() => {
        const x = Math.random() * (canvas.width - 20);
        coffeeCups.push({ x: x, y: 0 });
    }, 1000);
}

function drawCoffeeCups() {
    ctx.fillStyle = '#ebb70d';
    coffeeCups.forEach(cup => {
        ctx.beginPath();
        ctx.arc(cup.x, cup.y, 10, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateCoffeeCups() {
    coffeeCups.forEach(cup => {
        cup.y += cupSpeed;
    });
}

function checkCollision() {
    coffeeCups.forEach((cup, index) => {
        if (cup.y + 10 > basket.y && cup.x > basket.x && cup.x < basket.x + basket.width) {
            coffeeCups.splice(index, 1);
            score++;
        } else if (cup.y + 10 > canvas.height) {
            coffeeCups.splice(index, 1);
        }
    });
}

function drawScore() {
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}
