document.getElementById("btn-pause").addEventListener("click", function() { showPanel(document.getElementById("pause-panel")); });
document.getElementById("btn-resume").addEventListener("click", function() { hidePanel(document.getElementById("pause-panel")); });
document.getElementById("btn-to-menu").addEventListener("click", function(e) { toMenu(e); });
document.getElementById("btn-backtomenu").addEventListener("click", function(e) { toMenu(e); });
document.getElementById("btn-reset").addEventListener("click", resetPuzzle);

intro();

function intro() {
    document.getElementById("blackpanel").style.animation = "middleToRight .75s ease-in-out 1";
}

function showPanel(selectedPanel) {
    selectedPanel.style.right = "0";
    selectedPanel.style.animation = "rightToMiddle .75s ease-in-out 1";
}

function hidePanel(selectedPanel) {
    selectedPanel.style.right = "-100%";
    selectedPanel.style.animation = "middleToRight .75s ease-in-out 1";
}

function toMenu(e) {
    document.getElementById("blackpanel").style.animation = "rightToMiddle .75s ease-in-out 1";
    setTimeout(function() {
        window.location = "menu.html";
        document.getElementById("blackpanel").style.animation = "";
    }, 700);
}

function resetPuzzle() {
    document.getElementById("blackpanel").style.animation = "rightToMiddle .75s ease-in-out 1";
    setTimeout(function() {
        window.location = window.location;
    }, 700);
}