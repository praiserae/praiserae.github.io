// WEBSITE FUNCTIONALITY (general)
document.addEventListener('DOMContentLoaded', function () {
    // Smooth Scroll for Navigation Links
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// SNAKE GAME FUNCTIONALITY

let canvas = document.getElementById('snakeCanvas');
let ctx = canvas.getContext('2d');
let snake;
let direction;
let food;
let score;
let gameInterval;
let canvasSize = 400;
let gridSize = 20; // Grid size for each block
let blockSize = canvasSize / gridSize; // Size of each block

function startSnakeGame() {
    // Initialize game settings
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    snake = [{ x: 10, y: 10 }];
    direction = 'RIGHT';
    food = generateFood();
    score = 0;
    document.getElementById('score').textContent = score;
    
    // Clear existing game loop and start a new one
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 150); // Slow down the game speed by increasing interval time
}

function generateFood() {
    // Randomly place food (strawberry)
    return {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
    };
}

function gameLoop() {
    // Move snake, check for collision, and redraw elements
    moveSnake();
    if (checkCollision()) {
        alert("Game Over! Final Score: " + score);
        clearInterval(gameInterval);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas for the next frame
    drawGameField();  // Draw field border
    drawSnake();      // Draw snake
    drawFood();       // Draw food (strawberry)
}

function moveSnake() {
    let head = { ...snake[0] };

    // Move the snake based on the current direction
    if (direction === 'UP') head.y--;
    if (direction === 'DOWN') head.y++;
    if (direction === 'LEFT') head.x--;
    if (direction === 'RIGHT') head.x++;

    snake.unshift(head);

    // Check if snake eats the food (strawberry)
    if (head.x === food.x && head.y === food.y) {
        score++; // Increase score
        document.getElementById('score').textContent = score;
        food = generateFood(); // Generate new food
    } else {
        snake.pop(); // Remove last part of snake if not eating
    }
}

function drawGameField() {
    ctx.fillStyle = '#1E2A47'; // Dark border color
    ctx.strokeRect(0, 0, canvas.width, canvas.height); // Draw the border around game field
}

function drawSnake() {
    // Draw each part of the snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.fillStyle = '#00FF00'; // Head color
        } else {
            ctx.fillStyle = '#00CC00'; // Body color
        }
        ctx.fillRect(segment.x * blockSize, segment.y * blockSize, blockSize, blockSize); // Draw the segment
    });
}

function drawFood() {
    // Draw the food (strawberry)
    ctx.fillStyle = '#FF0000'; // Food color (strawberry)
    ctx.beginPath();
    ctx.arc(food.x * blockSize + blockSize / 2, food.y * blockSize + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
    ctx.fill();
}

function checkCollision() {
    let head = snake[0];

    // Wall collision
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        return true;
    }

    // Self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Control snake with W, A, S, D keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'W') {
        if (direction !== 'DOWN') direction = 'UP';
    } else if (event.key === 's' || event.key === 'S') {
        if (direction !== 'UP') direction = 'DOWN';
    } else if (event.key === 'a' || event.key === 'A') {
        if (direction !== 'RIGHT') direction = 'LEFT';
    } else if (event.key === 'd' || event.key === 'D') {
        if (direction !== 'LEFT') direction = 'RIGHT';
    }
});

// Send email on contact form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let email = '1rayanassouli@gmail.com'; // Your contact email
    let subject = 'New Contact Form Submission';
    let body = `Name: ${document.getElementById('name').value}\nMessage: ${document.getElementById('message').value}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
