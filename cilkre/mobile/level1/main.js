document.getElementById("btn-2").style.visibility = "hidden";
document.getElementById("btn-1").addEventListener("click", appels)
document.getElementById("btn-2").addEventListener("click", winwin);

function appels() {
    document.getElementById("btn-2").style.visibility = "";
    document.getElementById("btn-1").style.visibility = "hidden";
}

function winwin() {
    showPanel(document.getElementById("win-panel"));
}