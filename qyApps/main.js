document.addEventListener("contextmenu", (e) => e.preventDefault());
window.addEventListener("resize", mobileCheck);

let neededResources = 0;
let loadedResources = 0;
let qyApps = [];
let specifiedCategory = null;
let isMobile = false;
let isTouchDevice = false;
let search = "";
let searchBarOpen = false;
let aboutOpen = false;

setup();

function setup() {
    isTouchDevice = isTouch();
    mobileCheck();
    renderToolbar();
    loadApps();
    setTimeout(checkSelected, 100);
}

function renderToolbar() {
    let toolbar = document.getElementById("toolbar");

    let Tbi_Icon = document.createElement("div");
    Tbi_Icon.classList.add("toolbaritem");
    let Tbi_Icon_Icon = document.createElement("img");
    Tbi_Icon_Icon.src = "qyAppsIcon.png";
    Tbi_Icon.appendChild(Tbi_Icon_Icon);
    Tbi_Icon.addEventListener("mouseup", () => {
        if (searchBarOpen) {
            closeSearch();
        }
        if (aboutOpen) {
            closeAbout();
        } else {
            openAbout();
        }
    });

    let homeButton = document.createElement("div");
    homeButton.classList.add("toolbaritem");
    let homeButtonText = document.createElement("img");
    homeButtonText.src = "icons/home.svg";
    homeButton.appendChild(homeButtonText);
    //homeButton.addEventListener("mouseup", () => setCategory(null));
    homeButton.addEventListener("mouseup", () => {
        search = "";
        renderApps();
        if (aboutOpen)
            closeAbout();
        if (searchBarOpen)
            closeSearch();
    });

    let x = document.createElement("div");
    x.classList.add("toolbaritem");
    let zText = document.createElement("img");
    zText.src = "icons/search.svg";
    x.appendChild(zText);
    x.addEventListener("mouseup", () => {
        if (aboutOpen) {
            closeAbout();
        }
        if (searchBarOpen) {
            closeSearch();
        } else {
            openSearch();
        }
    });

    toolbar.appendChild(homeButton);
    toolbar.appendChild(Tbi_Icon);
    //toolbar.appendChild(gamesButton);
    //toolbar.appendChild(appsButton);
    toolbar.appendChild(x);

    {
        let z = document.getElementsByClassName("toolbaritem");
        //z = z.filter(x => x.id != "toolbarlogo");
        for (y of z) {
            y.addEventListener((isTouchDevice ? "touchstart" : "mousedown"), element_mouseDown);
            y.addEventListener((isTouchDevice ? "touchend" : "mouseup"), element_mouseUp);
            y.addEventListener((isTouchDevice ? "touchstart" : "mouseenter"), element_mouseEnter);
            y.addEventListener((isTouchDevice ? "touchend" : "mouseleave"), element_mouseLeave);
        }
    }
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

    let filteredApps = qyApps.filter(app => app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.tags.map(x => { return x.toLowerCase(); }).filter(z => z.toLowerCase().includes(search.toLowerCase())).length);

    if (filteredApps.length) {
        for (let app of filteredApps) {
            renderAppTile(app, appContainer);
        }
    } else {
        renderAppTile({
            name: "No app found",
            shortdescription: "Try a different search term."
        }, appContainer);
    }

    {
        let spcr = document.createElement("div");
        spcr.classList.add("toolbar-spacer");
        //setTimeout(() => { spcr.style.height = document.getElementById("toolbar").getBoundingClientRect().height + "px" }, 100);
        appContainer.appendChild(spcr);
    }
}

function renderAppTile(app, appContainer) {
    let appTile = document.createElement("div");
    appTile.classList.add("tile");
    appTile.setAttribute("appid", app.id);

    let appTileImg = document.createElement("img");
    appTileImg.classList.add("tileimg");
    appTileImg.src = app.icon || "unknownicon.svg";
    appTile.appendChild(appTileImg);

    let appTileTitle = document.createElement("div");
    appTileTitle.classList.add("tiletitle");
    appTileTitle.innerText = app.name;
    appTile.appendChild(appTileTitle);

    //if (app.release) {
    //    let appTileRelease = document.createElement("div");
    //    appTileRelease.classList.add("tilerelease", "tileinfo");
    //    appTileRelease.textContent = "Release: " + app.release;
    //    appTile.appendChild(appTileRelease);
    //}
    console.info(app.name + " has short desc: \"" + app.shortdescription + "\"");
    if (app.shortdescription) {
        console.info(app.name + " has short desc: \"" + app.shortdescription + "\"");
        let appTileDescription = document.createElement("div");
        appTileDescription.classList.add("tiledescription", "tileinfo");
        appTileDescription.innerText = app.shortdescription;
        appTile.appendChild(appTileDescription);
    }

    // Not very sure if I should leave this in or not, since it's also info that could be seen at the app's page.
    //if (app.platforms) {
    //    let appTilePlatforms = document.createElement("div");
    //    appTilePlatforms.classList.add("tileplatforms", "tileinfo");
    //    let platformsString = "";
    //    for (let i = 0; i < app.platforms.length; i++) {
    //        platformsString += app.platforms[i].replace(/\b\w/g, l => l.toUpperCase());
    //        if (i != app.platforms.length - 1) {
    //            platformsString += ", ";
    //        }
    //    }
    //    appTilePlatforms.innerText = "Platforms: " + platformsString;
    //    appTile.appendChild(appTilePlatforms);
    //}

    if (app.id) {
        appTile.addEventListener((isTouchDevice ? "touchstart" : "mousedown"), element_mouseDown);
        appTile.addEventListener((isTouchDevice ? "touchend" : "mouseup"), element_mouseUp);
        appTile.addEventListener((isTouchDevice ? "touchstart" : "mouseenter"), element_mouseEnter);
        appTile.addEventListener((isTouchDevice ? "touchend" : "mouseleave"), element_mouseLeave);

        appTile.addEventListener("mouseup", (e) => openAppPage(e, app.id));
    }

    if (specifiedCategory && app.category) {
        if (app.category == specifiedCategory) {
            appContainer.appendChild(appTile);
        }
    } else {
        appContainer.appendChild(appTile);
    }
}

function openAppPage(e, id) {
    let selectedApp = qyApps.filter(app => app.id == id)[0];

    let usp = new URLSearchParams(location.search);
    usp.set("selectedApp", id);
    let tmpurl = new URL(window.location);
    tmpurl.search = usp;
    window.history.pushState({}, "", tmpurl);

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
    closeAppPageButtonImg.src = "icons/cross.svg";
    closeAppPageButton.appendChild(closeAppPageButtonImg);
    closeAppPageButton.addEventListener("mouseup", closeAppPage);
    appPage.appendChild(closeAppPageButton);
    closeAppPageButton.addEventListener((isTouchDevice ? "touchstart" : "mousedown"), element_mouseDown);
    closeAppPageButton.addEventListener((isTouchDevice ? "touchend" : "mouseup"), element_mouseUp);

    let appImg = document.createElement("img");
    appImg.id = "appimg";
    {
        appImg.src = selectedApp.icon || "unknownicon.svg";
    }
    appPage.appendChild(appImg);

    let appTitle = document.createElement("div");
    appTitle.id = "apptitle";
    appTitle.innerText = selectedApp.name;
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

            let downloadsContainer = document.createElement("div");
            downloadsContainer.classList.add("downloadscontainer");

            let dls = Object.keys(selectedApp.downloads)
            for (let i = 0; i < dls.length; i++) {
                let dlBtn = document.createElement("div");
                dlBtn.classList.add("button");
                dlBtn.innerText = dls[i].replace(/\b\w/g, l => l.toUpperCase()) + " download";
                dlBtn.addEventListener("mouseup", () => window.location.href = selectedApp.downloads[dls[i]]);
                downloadsContainer.appendChild(dlBtn);

                dlBtn.addEventListener((isTouchDevice ? "touchstart" : "mousedown"), element_mouseDown);
                dlBtn.addEventListener((isTouchDevice ? "touchend" : "mouseup"), element_mouseUp);
                dlBtn.addEventListener((isTouchDevice ? "touchstart" : "mouseenter"), element_mouseEnter);
                dlBtn.addEventListener((isTouchDevice ? "touchend" : "mouseleave"), element_mouseLeave);

                //let spacer = document.createElement("div");
                //spacer.classList.add(i != dls.length - 1 ? "spacer" : "spacer2");
                //appPage.appendChild(spacer);
            }

            appPage.appendChild(downloadsContainer);

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

    let platformsString = "";
    for (let i = 0; i < selectedApp.platforms.length; i++) {
        platformsString += selectedApp.platforms[i].replace(/\b\w/g, l => l.toUpperCase());
        if (i != selectedApp.platforms.length - 1) {
            platformsString += ", ";
        }
    }

    appInfo.innerText = "Platforms: " + platformsString +
        "\nRelease: " + selectedApp.release +
        "\nCategory: " + selectedApp.category +
        "\nVersion: " + selectedApp.version;
    appPage.appendChild(appInfo);

    {
        let spacer = document.createElement("div");
        spacer.classList.add("spacer2");
        appPage.appendChild(spacer);
    }

    appPage.style.transitionDuration = ".5s";
    document.getElementById("main-wrapper").style.transform = "scale(.9)";
    document.getElementById("main-wrapper").style.opacity = .5;

    appPage.style.transform = "scale(1)";
}

function closeAppPage() {
    let appPage = document.getElementById("apppage");
    appPage.style.transform = "scale(0)";
    appPage.style.opacity = "0";
    appPage.style.transitionDuration = ".5s";
    document.getElementById("main-wrapper").style.transform = "";
    document.getElementById("main-wrapper").style.opacity = "";
    setTimeout(() => {
        appPage.style.transitionDuration = "0s";
        appPage.style.opacity = "";
        appPage.style.transform = "";
    }, 500);

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

function openSearch() {
    let searchContainer = document.getElementById("search");

    while (searchContainer.lastChild) {
        searchContainer.removeChild(searchContainer.lastChild);
    }

    let searchBar = document.createElement("input");
    searchBar.id = "inp-search";
    searchBar.value = search;
    searchBar.setAttribute("placeholder", "Enter a search term");
    searchBar.setAttribute("maxlength", 100);
    searchContainer.appendChild(searchBar);

    let Btn_SearchNow = document.createElement("div");
    Btn_SearchNow.classList.add("searchbaritem");
    let Btn_SearchNow_Icon = document.createElement("img");
    Btn_SearchNow_Icon.src = "icons/checkmark.svg";
    Btn_SearchNow.appendChild(Btn_SearchNow_Icon);
    searchContainer.appendChild(Btn_SearchNow);
    Btn_SearchNow.addEventListener("mouseup", () => {
        if (searchBar.value != search) {
            search = searchBar.value;
            renderApps();
        }
        closeSearch();
    });

    let Btn_CancelSearch = document.createElement("div");
    Btn_CancelSearch.classList.add("searchbaritem");
    let Btn_CancelSearch_Icon = document.createElement("img");
    Btn_CancelSearch_Icon.src = "icons/cross.svg";
    Btn_CancelSearch.appendChild(Btn_CancelSearch_Icon);
    searchContainer.appendChild(Btn_CancelSearch);
    Btn_CancelSearch.addEventListener("mouseup", () => {
        search = "";
        renderApps();
        closeSearch();
    });

    let searchBarButtons = document.getElementsByClassName("searchbaritem");
    for (let searchBarButton of searchBarButtons) {
        searchBarButton.addEventListener((isTouchDevice ? "touchstart" : "mousedown"), element_mouseDown);
        searchBarButton.addEventListener((isTouchDevice ? "touchend" : "mouseup"), element_mouseUp);
        searchBarButton.addEventListener((isTouchDevice ? "touchstart" : "mouseenter"), element_mouseEnter);
        searchBarButton.addEventListener((isTouchDevice ? "touchend" : "mouseleave"), element_mouseLeave);
    }

    searchContainer.style.opacity = 1;
    searchContainer.style.bottom = document.getElementById("toolbar").getBoundingClientRect().height + "px";
    searchBarOpen = true;
}
function closeSearch() {
    let searchContainer = document.getElementById("search");
    searchContainer.style.opacity = "";
    searchContainer.style.bottom = "";
    searchBarOpen = false;
}

function openAbout() {
    let aboutContainer = document.getElementById("about");

    while (aboutContainer.lastChild) {
        aboutContainer.removeChild(aboutContainer.lastChild);
    }

    let P_About = document.createElement("p");
    P_About.innerText = "qyApps is a webpage, completely dedicated to my apps.\nAll of them are free! Go download 'em, and see what they do.\n\nThey're all created by me, HIHIQY1.";
    aboutContainer.appendChild(P_About);

    let Btn_VisitSite = document.createElement("div");
    Btn_VisitSite.classList.add("button");
    Btn_VisitSite.innerText = "Visit my site";
    Btn_VisitSite.addEventListener("mouseup", () => window.location = "https://hihiqy1.github.io");
    aboutContainer.appendChild(Btn_VisitSite);

    Btn_VisitSite.addEventListener((isTouchDevice ? "touchstart" : "mousedown"), element_mouseDown);
    Btn_VisitSite.addEventListener((isTouchDevice ? "touchend" : "mouseup"), element_mouseUp);
    Btn_VisitSite.addEventListener((isTouchDevice ? "touchstart" : "mouseenter"), element_mouseEnter);
    Btn_VisitSite.addEventListener((isTouchDevice ? "touchend" : "mouseleave"), element_mouseLeave);

    aboutContainer.style.transform = "scale(1)";
    aboutContainer.style.bottom = document.getElementById("toolbar").getBoundingClientRect().height + "px";
    aboutContainer.style.opacity = 1;
    aboutOpen = true;
}
function closeAbout() {
    let aboutContainer = document.getElementById("about");
    aboutContainer.style.transform = "";
    aboutContainer.style.bottom = "";
    aboutContainer.style.opacity = "";
    aboutOpen = false;
}

function isTouch() {
    return ("ontouchstart" in window
        || navigator.maxTouchPoints);
}
function element_mouseDown(e) {
    e.currentTarget.classList.add("active");
}
function element_mouseUp(e) {
    e.currentTarget.classList.remove("active");
}
function element_mouseEnter(e) {
    e.currentTarget.classList.add("hover");
}
function element_mouseLeave(e) {
    e.currentTarget.classList.remove("hover");
    element_mouseUp(e);
}