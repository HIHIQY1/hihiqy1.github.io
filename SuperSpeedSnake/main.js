let loadedResources = 0;
let neededResources = 0;

document.addEventListener("keydown", onKeyDown);

setup();
requestAnimationFrame(draw);

function setup() {
    resFix();

    loadImage("tile", "assets/textures/tile.svg");
    loadImage("apple", "assets/textures/apple.svg");
    loadImage("snakeBody", "assets/textures/snakeBody.svg");
    loadImage("snakeHead", "assets/textures/snakeHead.svg");

    relocateApple();

    tickInterval = setInterval(doTick, 1000 / tps);
}

async function loadImage(name, src) {
    neededResources++;
    let tempImg = new Image();
    tempImg.addEventListener("load", z => {
        images.push({
            name: name,
            image: tempImg
        });
        loadedResources++;
    });
    tempImg.addEventListener("error", e => {
        console.info("Could not load image " + src);
    });
    tempImg.src = src;
}