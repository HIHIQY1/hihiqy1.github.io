document.addEventListener("contextmenu", (e) => e.preventDefault());
window.addEventListener("resize", mobileCheck);

let neededResources = 0;
let loadedResources = 0;
let qyApps = [];
let specifiedCategory = null;
let isMobile = false;

setup();

function setup() {
    mobileCheck();
    renderToolbar();
    loadApps();
    setTimeout(checkSelected, 100);
}

function renderToolbar() {
    let toolbar = document.getElementById("toolbar");

    let icon = document.createElement("img");
    icon.id = "toolbarlogo";
    icon.src = "qyAppsIcon.png";

    let homeButton = document.createElement("div");
    homeButton.classList.add("toolbaritem");
    let homeButtonText = document.createElement("span");
    homeButtonText.textContent = "Home";
    homeButton.appendChild(homeButtonText);
    homeButton.addEventListener("mouseup", () => setCategory(null));

    let gamesButton = document.createElement("div");
    gamesButton.classList.add("toolbaritem");
    let gamesButtonText = document.createElement("span");
    gamesButtonText.textContent = "Games";
    gamesButton.appendChild(gamesButtonText);
    gamesButton.addEventListener("mouseup", () => setCategory("games"));

    let appsButton = document.createElement("div");
    appsButton.classList.add("toolbaritem");
    let appsButtonText = document.createElement("span");
    appsButtonText.textContent = "Apps";
    appsButton.appendChild(appsButtonText);
    appsButton.addEventListener("mouseup", () => setCategory("apps"));

    toolbar.appendChild(icon);
    toolbar.appendChild(homeButton);
    toolbar.appendChild(gamesButton);
    toolbar.appendChild(appsButton);
}

function setCategory(category) {
    specifiedCategory = category;
    renderApps();
}

function loadApps() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "qyApps.json");
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            qyApps = xhr.response;
            renderApps();
        }
    };
    xhr.send();
}

function renderApps() {
    let appContainer = document.getElementById("container");

    while (appContainer.lastChild) {
        appContainer.removeChild(appContainer.lastChild);
    }

    for (let app of qyApps) {
        let appTile = document.createElement("div");
        appTile.classList.add("tile");
        appTile.setAttribute("appid", app.id);

        let appTileTitle = document.createElement("div");
        appTileTitle.classList.add("tiletitle");
        appTileTitle.textContent = app.name;
        appTile.appendChild(appTileTitle);

        let appTilePlatforms = document.createElement("div");
        appTilePlatforms.classList.add("tileplatforms", "tileinfo");
        let platformsString = "";
        for (let i = 0; i < app.platforms.length; i++) {
            platformsString += app.platforms[i].replace(/\b\w/g, l => l.toUpperCase());
            if (i != app.platforms.length - 1) {
                platformsString += ", ";
            }
        }
        appTilePlatforms.textContent = "Platforms: " + platformsString;
        appTile.appendChild(appTilePlatforms);

        let appTileRelease = document.createElement("div");
        appTileRelease.classList.add("tilerelease", "tileinfo");
        appTileRelease.textContent = "Release: " + app.release;
        appTile.appendChild(appTileRelease);

        appTile.addEventListener("mouseup", (e) => openAppPage(e, app.id));

        if (specifiedCategory && app.category) {
            if (app.category == specifiedCategory) {
                appContainer.appendChild(appTile);
            }
        } else {
            appContainer.appendChild(appTile);
        }
    }
}

function openAppPage(e, id) {
    let selectedApp = qyApps.filter(app => app.id == id)[0];

    let usp = new URLSearchParams(location.search);
    usp.set("selectedApp", id);
    let tmpurl = new URL(window.location);
    tmpurl.search = usp;
    window.history.pushState({}, "", tmpurl);

    let appPageTransition = document.getElementById("apppagetransition");
    let transitionStyle = window.getComputedStyle(e.currentTarget);
    appPageTransition.style.height = parseFloat(transitionStyle.getPropertyValue("height")) +
        parseFloat(transitionStyle.getPropertyValue("padding-bottom")) +
        parseFloat(transitionStyle.getPropertyValue("padding-top")) +
        "px";
    appPageTransition.style.top = e.currentTarget.getBoundingClientRect().top -
        parseFloat(transitionStyle.getPropertyValue("padding-top")) +
        "px";
    appPageTransition.style.left = e.currentTarget.getBoundingClientRect().left + "px";
    appPageTransition.style.visibility = "initial";
    appPageTransition.style.opacity = 1;


    renderAppPage(selectedApp);
}

function renderAppPage(selectedApp) {
    let appPage = document.getElementById("apppage");

    while (appPage.lastChild) {
        appPage.removeChild(appPage.lastChild);
    }

    let closeAppPageButton = document.createElement("div");
    closeAppPageButton.id = "btn-close";
    let closeAppPageButtonImg = document.createElement("img");
    closeAppPageButtonImg.src = "cross.svg";
    closeAppPageButton.appendChild(closeAppPageButtonImg);
    closeAppPageButton.addEventListener("mouseup", closeAppPage);
    appPage.appendChild(closeAppPageButton);

    let appImg = document.createElement("img");
    appImg.id = "appimg";
    {
        appImg.src = selectedApp.icon || "unknownicon.svg";
    }
    appPage.appendChild(appImg);

    let appTitle = document.createElement("div");
    appTitle.id = "apptitle";
    appTitle.textContent = selectedApp.name;
    appPage.appendChild(appTitle);

    {
        let spacer = document.createElement("div");
        spacer.classList.add("spacer2");
        appPage.appendChild(spacer);
    }
    {
        let line = document.createElement("div");
        line.classList.add("line");
        appPage.appendChild(line);
    }

    {
        if (selectedApp.downloads) {
            {
                let spacer = document.createElement("div");
                spacer.classList.add("spacer2");
                appPage.appendChild(spacer);
            }

            let appDownloadsTitle = document.createElement("div");
            appDownloadsTitle.classList.add("apppageheader");
            appDownloadsTitle.innerText = "Downloads";
            appPage.appendChild(appDownloadsTitle);

            {
                let spacer = document.createElement("div");
                spacer.classList.add("spacer");
                appPage.appendChild(spacer);
            }

            let dls = Object.keys(selectedApp.downloads)
            for (let i = 0; i < dls.length; i++) {
                let dlBtn = document.createElement("div");
                dlBtn.classList.add("downloadbutton");
                dlBtn.textContent = dls[i].replace(/\b\w/g, l => l.toUpperCase()) + " download";
                dlBtn.addEventListener("mouseup", () => window.location.href = selectedApp.downloads[dls[i]]);
                appPage.appendChild(dlBtn);

                let spacer = document.createElement("div");
                spacer.classList.add(i != dls.length - 1 ? "spacer" : "spacer2");
                appPage.appendChild(spacer);
            }

            let line = document.createElement("div");
            line.classList.add("line");
            appPage.appendChild(line);
        }
    }

    if (selectedApp.description) {
        {
            let spacer = document.createElement("div");
            spacer.classList.add("spacer2");
            appPage.appendChild(spacer);
        }

        let appDescriptionTitle = document.createElement("div");
        appDescriptionTitle.classList.add("apppageheader");
        appDescriptionTitle.innerText = "App Description";
        appPage.appendChild(appDescriptionTitle);

        let appDescription = document.createElement("div");
        appDescription.classList.add("apppageparagraph");
        appDescription.innerText = selectedApp.description;
        appPage.appendChild(appDescription);

        {
            {
                let spacer = document.createElement("div");
                spacer.classList.add("spacer2");
                appPage.appendChild(spacer);
            }
            let line = document.createElement("div");
            line.classList.add("line");
            appPage.appendChild(line);
            {
                let spacer = document.createElement("div");
                spacer.classList.add("spacer2");
                appPage.appendChild(spacer);
            }
        }
    }

    let appInfoTitle = document.createElement("div");
    appInfoTitle.classList.add("apppageheader");
    appInfoTitle.innerText = "App Info";
    appPage.appendChild(appInfoTitle);

    let appInfo = document.createElement("div");
    appInfo.classList.add("apppageparagraph");
    appInfo.innerText = "Platforms: " + selectedApp.platforms +
        "\nRelease: " + selectedApp.release +
        "\nCategory: " + selectedApp.category +
        "\nVersion: " + selectedApp.version;
    appPage.appendChild(appInfo);

    {
        let spacer = document.createElement("div");
        spacer.classList.add("spacer2");
        appPage.appendChild(spacer);
    }

    let bodyStyle = window.getComputedStyle(document.body)
    let appPageTransition = document.getElementById("apppagetransition");
    appPageTransition.style.transitionDuration = ".5s";
    setTimeout(() => {
        appPageTransition.style.top = "0px";
        appPageTransition.style.left = "0px";
        appPageTransition.style.width = bodyStyle.width;
        appPageTransition.style.height = bodyStyle.height;
        appPageTransition.style.borderRadius = "0";
        appPage.style.transitionDuration = "0s";
        document.getElementById("main-wrapper").style.transform = "scale(.9)";
    }, 0);
    setTimeout(() => {
        appPageTransition.style.opacity = 0;
        appPageTransition.style.visibility = "";
        appPage.style.top = 0;
    }, 500);
}

function closeAppPage() {
    let appPage = document.getElementById("apppage");
    appPage.style.transform = "scale(.5)";
    appPage.style.opacity = "0";
    appPage.style.borderRadius = "5vw";
    appPage.style.transitionDuration = ".5s";
    document.getElementById("main-wrapper").style.transform = "";
    setTimeout(() => {
        appPage.style.transitionDuration = "0s";
        appPage.style.opacity = "";
        appPage.style.transform = "";
        appPage.style.top = "";
        appPage.style.borderRadius = "";
    }, 500);

    let appPageTransition = document.getElementById("apppagetransition");
    appPageTransition.style.width = "";
    appPageTransition.style.height = "";
    appPageTransition.style.top = "";
    appPageTransition.style.left = "";
    appPageTransition.style.transitionDuration = "";
    appPageTransition.style.borderRadius = "";
    appPageTransition.style.opacity = "";
    appPageTransition.style.visibility = "";

    let tmpurl = new URL(window.location);
    tmpurl.search = "";
    window.history.pushState({}, "", tmpurl);
}

function mobileCheck() {
    let bodyRect = document.body.getBoundingClientRect();
    if (bodyRect.width < bodyRect.height) {
        isMobile = true;
    } else {
        isMobile = false;
    }
}

function checkSelected() {
    let usp = new URLSearchParams(location.search);
    let selectedApps = usp.get("selectedApp");
    if (selectedApps) {
        let appTile = Array.from(document.getElementsByClassName("tile")).filter(tile => tile.getAttribute("appid") == selectedApps)[0];
        openAppPage({
            "currentTarget": appTile
        }, selectedApps);
    }
}