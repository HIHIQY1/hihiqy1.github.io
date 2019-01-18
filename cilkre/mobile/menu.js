document.getElementById("btn-play").addEventListener("click", function() { showPanel(document.getElementById("levels-panel")); });
document.getElementById("btn-backtomenu").addEventListener("click", function() { hidePanel(document.getElementById("levels-panel")); });

var allButtons = document.getElementsByClassName("level-button");
for (i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("mousedown", function(e) { toLevel(e); });
}

function toLevel(e) {
    if (e.target.id[e.target.id.length - 1] != undefined) {
        document.getElementById("blackpanel").style.animation = "rightToMiddle .75s ease-in-out 1";
        setTimeout(function () {
            window.location = "level" + e.target.id[e.target.id.length - 1] + ".html";
            document.getElementById("blackpanel").style.animation = "";
        }, 700);
    }
}

function showPanel(selectedPanel) {
    selectedPanel.style.right = "0";
    selectedPanel.style.animation = "rightToMiddle .75s ease-in-out 1";
}

function hidePanel(selectedPanel) {
    selectedPanel.style.right = "-100%";
    selectedPanel.style.animation = "middleToRight .75s ease-in-out 1";
}