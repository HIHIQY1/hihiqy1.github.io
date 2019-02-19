// /\/OIID
// v0.6
// Made by HIHIQY1
// Do not copy!

document.getElementById("btn-exit").addEventListener("mousedown", hideAll);
document.getElementById("btn-menu").addEventListener("mousedown", afterToMain);
document.getElementById("btn-howto").addEventListener("mousedown", howTo);

function hideAll() {
    document.getElementById("hideall").style.zIndex = "10";
    fadeElement(document.getElementById("hideall"), 1);
}

if (!window.location.href.startsWith("https://hihiqy1.github.io/Avoiid/spel")) { window.location.href = "https://duckduckgo.com"; }

function fadeElement(anElement, anOpacity) {
    anElement.style.opacity = anOpacity;
}

function afterToMain() {
    document.getElementById("menu").style.top = "0";
    document.getElementById("menu").style.animation = undefined;
    document.getElementById("afterlevelmenu").style.top = "-100%";
    document.getElementById("afterlevelmenu").style.animation = "wipeanim-toceil .5s ease-in 1";
}

function howTo() {
    alert("Welcome!\nIn this game, you have to avoid the white blocks.");
    alert("You can do this by pressing 1, 2, 3 or 4 on your keyboard,\nor by tapping in one of the 4 sections.");
    alert("You are playing as the blue block. Try to get the highest score possible!\nGood luck!");
    alert("Note: the visible movement has a delay.");
}