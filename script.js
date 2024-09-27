const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Increased knight size
let knight = {
    x: 50,
    y: canvas.height - 150,  // Adjusting position because of larger size
    width: 100,  // Increased from 50 to 100
    height: 100, // Increased from 50 to 100
    speed: 5,
    jumping: false
};

let dragons = [];
let score = 0;
let time = 0;
let gameOver = false;
let keys = {};

// Load images
const knightImg = new Image();
knightImg.src = 'knight.webp'; // Knight image path

const dragonImg = new Image();
dragonImg.src = 'dragon.webp'; // Dragon image path

// Event listener for movement controls
document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Create new dragon with increased size
function spawnDragon() {
    let dragon = {
        x: canvas.width,
        y: canvas.height - 150, // Adjusting position for larger size
        width: 100,  // Increased from 50 to 100
        height: 100  // Increased from 50 to 100
    };
    dragons.push(dragon);
}

// Update game state
function update() {
    if (!gameOver) {
        score++;
        time = Math.floor(score / 60); // Assuming 60 FPS for time calculation

        // Knight movement (left, right, up, down)
        if (keys['ArrowRight'] && knight.x + knight.width < canvas.width) {
            knight.x += knight.speed;
        }
        if (keys['ArrowLeft'] && knight.x > 0) {
            knight.x -= knight.speed;
        }
        if (keys['ArrowUp'] && knight.y > 0) {
            knight.y -= knight.speed;
        }
        if (keys['ArrowDown'] && knight.y + knight.height < canvas.height) {
            knight.y += knight.speed;
        }

        // Move dragons
        for (let i = 0; i < dragons.length; i++) {
            dragons[i].x -= 5;
            if (dragons[i].x < 0) {
                dragons.splice(i, 1);
            }

            // Collision detection
            if (dragons[i] &&
                knight.x < dragons[i].x + dragons[i].width &&
                knight.x + knight.width > dragons[i].x &&
                knight.y < dragons[i].y + dragons[i].height &&
                knight.y + knight.height > dragons[i].y) {
                gameOver = true;
                alert("Game Over! Your Score: " + score + " Time Survived: " + time + "s");
            }
        }

        // Add new dragon every 100 frames
        if (score % 100 === 0) {
            spawnDragon();
        }

        draw();
        requestAnimationFrame(update);
    }
}

// Draw game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw knight with increased size
    ctx.drawImage(knightImg, knight.x, knight.y, knight.width, knight.height);

    // Draw dragons with increased size
    for (let i = 0; i < dragons.length; i++) {
        ctx.drawImage(dragonImg, dragons[i].x, dragons[i].y, dragons[i].width, dragons[i].height);
    }

    // Update score and time
    document.getElementById('score').innerHTML = "Score: " + score;
    document.getElementById('time').innerHTML = "Time: " + time + "s";
}

// Start game
update();
