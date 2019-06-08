let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let images = [];

// Fps and inbetweening
let performanceNow = performance.now();
let performanceThen = performance.now();
let performanceTotal = performanceThen - performanceNow;
let measuredFPS = 0;
let avgFPS = [0];

let inbetween = 0;
let inbetweenTime = 1;

function resFix() {
    canvas.width = canvas.getBoundingClientRect().height;
    canvas.height = canvas.getBoundingClientRect().height;
}

async function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Drawing here
    if (neededResources == loadedResources) {
        let tileHeight = canvas.height / grid.height;
        let tileWidth = tileHeight;

        if (snake.length < 41) {
            let gridImage = sprite("tile");

            for (let x = 0; x < grid.width; x++) {
                for (let y = 0; y < grid.height; y++) {
                    let gridColor = "hsl(0, 0%, 10%)";

                    if (!snakeDead) {
                        let colorOffset = (x / grid.width + y / grid.height) * 360;
                        if (snake.length >= 21 && snake.length < 26) {
                            //if (snake.length == 3) {
                            gridColor = "hsl(" + ((performance.now() - gameStarted) / 1000 % 1 * 360 * 4 + colorOffset) % 360 + ", 100%, 50%)";
                        }
                        if (snake.length >= 27 && snake.length < 31) {
                            gridColor = "hsl(" + ((performance.now() - gameStarted) / 1000 % 1 * -360 * 6 + colorOffset) % 360 + ", 100%, 50%)";
                        }
                        if (snake.length >= 31 && snake.length < 36) {
                            gridColor = "hsl(" + ((performance.now() - gameStarted) / 1000 % 1 * 360 * 8 + colorOffset) % 360 + ", 100%, 50%)";
                        }
                        if (snake.length >= 37 && snake.length < 40) {
                            gridColor = "hsl(" + ((performance.now() - gameStarted) / 1000 % 1 * -360 * 10 + colorOffset) % 360 + ", 100%, 50%)";
                        }
                    } else {
                        gridColor = "hsl(0, 100%, 10%)";
                    }

                    //ctx.drawImage(gridImage,
                    //    x * tileWidth, y * tileHeight,
                    //    tileWidth, tileHeight);

                    ctx.strokeStyle = gridColor;
                    drawGridCell(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                }
            }

            // Drawing the snek
            for (let i = 0; i < snake.length; i++) {
                // If this piece is a head, draw the head piece
                let pieceImage = sprite("snakeBody");
                if (!i) {
                    pieceImage = sprite("snakeHead");
                }

                ctx.drawImage(pieceImage,
                    snake[i].x * tileWidth, snake[i].y * tileWidth,
                    tileWidth, tileHeight);
            }

            ctx.drawImage(sprite("apple"),
                apple.x * tileWidth, apple.y * tileHeight,
                tileWidth, tileHeight);
        }

        ctx.font = "2rem Arial";
        ctx.fillStyle = "white";
        ctx.fillText(snake.length + "/speed=" + Math.round((1 / (snakeSpeed / tps))), grid.width * tileWidth, 50);
    }

    inbetween++;

    performanceNow = performance.now();
    performanceTotal = performanceNow - performanceThen;
    performanceThen = performance.now();

    // Something something fps
    measuredFPS = Math.ceil(1000 / performanceTotal);
    avgFPS.push(measuredFPS);
    while (avgFPS.length > tps) {
        avgFPS.splice(0, 1);
    }

    requestAnimationFrame(draw);
}

function drawGridCell(x, y, w, h) {
    //M 10 30 Q 10 10, 30 10 L 70 10 Q 90 10, 90 30 L 90 70 Q 90 90, 70 90 L 30 90 Q 10 90, 10 70 Z
    ctx.lineWidth = w / 10;
    ctx.beginPath();
    ctx.moveTo(x + w / 10, y + h / 10 * 3);
    ctx.quadraticCurveTo(x + w / 10, y + h / 10, x + w / 10 * 3, y + h / 10);
    ctx.lineTo(x + w / 10 * 7, y + h / 10);
    ctx.quadraticCurveTo(x + w / 10 * 9, y + h / 10, x + w / 10 * 9, y + h / 10 * 3);
    ctx.lineTo(x + w / 10 * 9, y + h / 10 * 7);
    ctx.quadraticCurveTo(x + w / 10 * 9, y + h / 10 * 9, x + w / 10 * 7, y + h / 10 * 9);
    ctx.lineTo(x + w / 10 * 3, y + h / 10 * 9);
    ctx.quadraticCurveTo(x + w / 10, y + h / 10 * 9, x + w / 10, y + h / 10 * 7);
    ctx.closePath();
    ctx.stroke();
}

function avg(arr) {
    let avgvar = 0;
    for (let i = 0; i < arr.length; i++) {
        avgvar += arr[i];
    }
    return avgvar / arr.length;
}

function sprite(name) {
    return images.filter(img => img.name == name)[0].image;
}