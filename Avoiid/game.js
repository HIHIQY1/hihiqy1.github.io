// /\/OIID
// v0.6
// Made by HIHIQY1
// Do not copy!

var intervalTime;
var score;
var canMove = false;

document.getElementById("btn-play").addEventListener("mousedown", function() { startGame("menu"); });
document.getElementById("btn-play-again").addEventListener("mousedown", function() { startGame("afterlevelmenu"); });
document.getElementById("fourth-1").addEventListener("mousedown", function() { movePlayer(1); });
document.getElementById("fourth-2").addEventListener("mousedown", function() { movePlayer(2); });
document.getElementById("fourth-3").addEventListener("mousedown", function() { movePlayer(3); });
document.getElementById("fourth-4").addEventListener("mousedown", function() { movePlayer(4); });

document.addEventListener("keydown", function(e) { keyPress(e); });

function startGame(fromWhatSource) {
    console.log("okey let's geau :D");
    intervalTime = 1000;
    score = 0;
    canMove = true;
    var elems = document.getElementsByClassName("piece");
    for (i = 0; i < elems.length; i++) {
        elems[i].style.backgroundColor = "initial";
    }
    document.getElementById("menu").style.top = "-100%";
    document.getElementById("afterlevelmenu").style.top = "-100%";
    document.getElementById(fromWhatSource).style.animation = "wipeanim-toceil .5s ease-in 1";
    setTimeout(function() { update(); }, 1000);
}

function update() {
    console.log("updeet " + intervalTime);
    
    // Where blocks should be
    if (document.getElementById("third-1").style.backgroundColor !== "initial")
    { document.getElementById("piece1ShouldBe").innerHTML = "1"; }
    if (document.getElementById("third-2").style.backgroundColor !== "initial")
    { document.getElementById("piece2ShouldBe").innerHTML = "1"; }
    if (document.getElementById("third-3").style.backgroundColor !== "initial")
    { document.getElementById("piece3ShouldBe").innerHTML = "1"; }
    if (document.getElementById("third-4").style.backgroundColor !== "initial")
    { document.getElementById("piece4ShouldBe").innerHTML = "1"; }
    
    // Blocks "falling"
    document.getElementById("fourth-1").style.backgroundColor = document.getElementById("third-1").style.backgroundColor;
    document.getElementById("fourth-2").style.backgroundColor = document.getElementById("third-2").style.backgroundColor;
    document.getElementById("fourth-3").style.backgroundColor = document.getElementById("third-3").style.backgroundColor;
    document.getElementById("fourth-4").style.backgroundColor = document.getElementById("third-4").style.backgroundColor;
    
    document.getElementById("third-1").style.backgroundColor = document.getElementById("second-1").style.backgroundColor;
    document.getElementById("third-2").style.backgroundColor = document.getElementById("second-2").style.backgroundColor;
    document.getElementById("third-3").style.backgroundColor = document.getElementById("second-3").style.backgroundColor;
    document.getElementById("third-4").style.backgroundColor = document.getElementById("second-4").style.backgroundColor;
    
    document.getElementById("second-1").style.backgroundColor = document.getElementById("first-1").style.backgroundColor;
    document.getElementById("second-2").style.backgroundColor = document.getElementById("first-2").style.backgroundColor;
    document.getElementById("second-3").style.backgroundColor = document.getElementById("first-3").style.backgroundColor;
    document.getElementById("second-4").style.backgroundColor = document.getElementById("first-4").style.backgroundColor;
    
    // New blocks
    document.getElementById("first-1").style.backgroundColor = "initial";
    document.getElementById("first-2").style.backgroundColor = "initial";
    document.getElementById("first-3").style.backgroundColor = "initial";
    document.getElementById("first-4").style.backgroundColor = "initial";
    
    var tempRandom = Math.floor(Math.random() * 3) + 1;
    for (i = 1; i < tempRandom; i++) {
        var selectRandom = Math.floor(Math.random() * 4) + 1;
        while (document.getElementById("first-" + selectRandom).style.backgroundColor == undefined)
        {
            selectRandom = Math.floor(Math.random() * 4) + 1;
        }
        document.getElementById("first-" + selectRandom).style.backgroundColor = "white";
    }
    
    // Playerrenderer
    var playerPos = document.getElementById("playerPos").innerHTML;
    console.log("Player pos: " + playerPos);
    document.getElementById("fourth-" + playerPos).style.backgroundColor = "blue";
    
    // Killsystem
    if (document.getElementById("piece" + playerPos + "ShouldBe").innerHTML == "1")
    {
        document.getElementById("canGoFurther").innerHTML = "0";
    }
    
    // Reset things
    document.getElementById("piece1ShouldBe").innerHTML = "";
    document.getElementById("piece2ShouldBe").innerHTML = "";
    document.getElementById("piece3ShouldBe").innerHTML = "";
    document.getElementById("piece4ShouldBe").innerHTML = "";
    
    // Score
    score = score + 1;
    console.log("score = " + score);
    
    // Timing changes
    if (intervalTime > 500) { intervalTime = intervalTime - 10; }
    else if (intervalTime > 100) { intervalTime = intervalTime - 5; }
    //else if (intervalTime > 50) { intervalTime = intervalTime - 1; }
    //if (intervalTime < 750) { document.getElementById("canGoFurther").innerHTML = "0"; }
    
    // If can go further
    if (document.getElementById("canGoFurther").innerHTML == "1") {
        setTimeout(function() { update(); }, intervalTime);
    }
    else {
        stopTheGame();
    }
}

function movePlayer(toPos) {
    document.getElementById("playerPos").innerHTML = toPos;
}

function stopTheGame() {
    console.log("can't go further :(");
    document.getElementById("canGoFurther").innerHTML = "1";
    document.getElementById("score").innerHTML = "Score: " + score;
    canMove = false;
    document.getElementById("playerPos").innerHTML = "2";
    document.getElementById("afterlevelmenu").style.top = "0";
    document.getElementById("afterlevelmenu").style.animation = "wipeanim-fromfloor .5s ease-out 1";
}

function keyPress(e) {
    if (canMove) {
        if (e.key == "1" | e.key == "2" | e.key == "3" | e.key == "4") {
            movePlayer(e.key);
        }
    }
}