let tps = 40;
let tickInterval;
let tick = 0;
let gameStarted = 0;
let gamePaused = true;

let grid = { width: 20, height: 20 };

let apple = {
    x: 0,
    y: 0
}
let snake = [
    {
        x: 3,
        y: 0
    },
    {
        x: 2,
        y: 0
    },
    {
        x: 1,
        y: 0
    }
];
let snakeDirection = "e";
let snakeSpeed = tps / 2;
let snakeDead = false;

let score = 0;

async function doTick() {
    if (!gamePaused) {
        if (!snakeDead) {
            // Update the snake
            if (!(tick % snakeSpeed)) {
                checkForApple();

                for (let i = snake.length - 1; i > 0; i--) {
                    snake[i].x = snake[i - 1].x;
                    snake[i].y = snake[i - 1].y;
                }

                switch (snakeDirection) {
                    case "n":
                        if ((snake.filter(piece => snake[0].x == piece.x && snake[0].y - 1 == piece.y).length) ||
                            snake[0].y - 1 < 0) {
                            snakeDead = true;
                        } else {
                            snake[0].y--;
                        }
                        break;
                    case "e":
                        if ((snake.filter(piece => snake[0].x + 1 == piece.x && snake[0].y == piece.y).length) ||
                            snake[0].x + 1 >= grid.width) {
                            snakeDead = true;
                        } else {
                            snake[0].x++;
                        }
                        break;
                    case "s":
                        if ((snake.filter(piece => snake[0].x == piece.x && snake[0].y + 1 == piece.y).length) ||
                            snake[0].y + 1 >= grid.height) {
                            snakeDead = true;
                        } else {
                            snake[0].y++;
                        }
                        break;
                    case "w":
                        if ((snake.filter(piece => snake[0].x - 1 == piece.x && snake[0].y == piece.y).length) ||
                            snake[0].x - 1 < 0) {
                            snakeDead = true;
                        } else {
                            snake[0].x--;
                        }
                        break;
                }
            }

            if (score == 20) {
                grid.width = 40;
                grid.height = 40;
            }

            // If the snake wasn't dead but now is
            if (snakeDead) {
                setTimeout(() => {
                    snake = [
                        {
                            x: 3,
                            y: 0
                        },
                        {
                            x: 2,
                            y: 0
                        },
                        {
                            x: 1,
                            y: 0
                        }
                    ];
                    snakeDirection = "e";
                    snakeSpeed = tps / 2;
                    snakeDead = false;
                    score = 0;
                    grid = { width: 20, height: 20 };
                    relocateApple();

                    document.getElementById("score").innerText = 0;
                }, 500);
            }
            if (snake.length >= 37) {
                //if (snake.length >= 0) {
                if (!(Math.round(performance.now() / 1000) % 15)) {
                    canvas.style.transform = "rotate(" + (Math.round(performance.now() / 1000) % 60) / 60 * 360 + "deg)";
                }
            }
            if (snake.length == 41) {
                gamePaused = true;
                alert("you won");
            }
        }

        tick++;
    }

    inbetween = 0;
    inbetweenTime = Math.round(avg(avgFPS) / tps);
}

function checkForApple() {
    let appleInFront = false;

    // I mean, yes, it could be written shorter, but I think this is more readable
    if (snakeDirection == "n") {
        if (apple.x == snake[0].x && apple.y == snake[0].y - 1) {
            appleInFront = true;
        }
    }
    if (snakeDirection == "e") {
        if (apple.x == snake[0].x + 1 && apple.y == snake[0].y) {
            appleInFront = true;
        }
    }
    if (snakeDirection == "s") {
        if (apple.x == snake[0].x && apple.y == snake[0].y + 1) {
            appleInFront = true;
        }
    }
    if (snakeDirection == "w") {
        if (apple.x == snake[0].x - 1 && apple.y == snake[0].y) {
            appleInFront = true;
        }
    }

    if (appleInFront) {
        score = snake.length;
        relocateApple();
        snake.push({
            "x": -1,
            "y": -1
        });
        snakeSpeed = Math.floor(tps / snake.length);

        document.getElementById("score").innerText = (snake.length - 3) * 100;
    }
}
function relocateApple() {
    apple.x = 1 + Math.floor(Math.random() * (grid.width - 2));
    apple.y = 1 + Math.floor(Math.random() * (grid.height - 2));
}

function onKeyDown(e) {
    if (!gamePaused) {
        switch (e.key) {
            case "ArrowUp":
                snakeDirection = "n";
                break;
            case "ArrowRight":
                snakeDirection = "e";
                break;
            case "ArrowDown":
                snakeDirection = "s";
                break;
            case "ArrowLeft":
                snakeDirection = "w";
                break;
            case " ":
                relocateApple();
                break;
            case "Escape":
                gamePaused = true;
                canvas.style.cursor = "";
                break;
        }
    }
}

canvas.addEventListener("click", e => {
    if (gameStarted == 0) {
        gameStarted = performance.now();
    }
    gamePaused = false;
    canvas.style.cursor = "none";
});