checkForApp();

function checkForApp() {
    if (document.URL.includes("dev=true")) {
        window.location="menu.html";
    }
}