let dutchpage = false;
let availableTranslations = ["en", "nl"];

window.addEventListener("DOMContentLoaded", () => {
    {
        let langs = Array.from(navigator.languages);
        if (!langs.filter(l => availableTranslations.includes(l.split("-").length))) {
            langs.push("en");
        }
        let availableLanguages = langs.filter(l => availableTranslations.includes(l.split("-")[0]));

        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("GET", "index_assets/lang/" + availableLanguages[0].split("-")[0] + ".json");
        xhr.addEventListener("load", e => {
            translatey(xhr.response);
        });
        xhr.send();
    }

    {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";
        xhr.open("GET", "projects.json");
        xhr.addEventListener("load", e => {
            console.info(xhr.response);
            renderTiles(xhr.response);
        });
        xhr.send();
    }

    document.getElementById("emaillink").setAttribute("href", "mailto:HIHIQY1+site@gmail.com?subject=Hey%21");

    let logoAnimImg = document.getElementById("logoanim");
    logoAnimImg.addEventListener("load", welcomeAnim);
});

// The welcome animation
function welcomeAnim() {
    setTimeout(() => {
        window.scrollTo(0, 0);
        //document.getElementById("nameanim").style.transform = "rotate(Calc(180deg / 3 * 2)) scale3d(1, 1, 1)";
        //document.getElementById("nameanim").style.transform = "rotate(0) scale3d(1, 1, 1)";
        document.getElementById("logoanim").style.transform = "rotate(0) scale3d(1, 1, 1)";

        setTimeout(() => {
            document.getElementById("floating-animation").style.height =
                document.getElementById("header").getBoundingClientRect().height + "px";
            setTimeout(() => {
                document.getElementById("floating-animation").style.display = "none";
            }, 500);
        }, 500);
    }, 200);
}

function renderTiles(projects) {
    let container = document.getElementById("projects");
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    }

    if (dutchpage) {
        projects = projects.filter(x => x.dutch);
    } else {
        projects = projects.filter(x => !x.dutch);
    }
    projects = projects.filter(x => x.display);
    projects.sort((a, b) => a.date < b.date);
    projects.sort((a, b) => b.highlighted);

    for (let project of projects) {
        let tile = document.createElement("div");
        tile.classList.add("project");

        if (project.tile && project.tile.extraClasses.length) {
            for (let extraClass of project.tile.extraClasses) {
                tile.classList.add(extraClass);
            }
        }

        if (project.highlighted)
            tile.classList.add("highlighted");

        let tileIconContainer = document.createElement("div");
        tileIconContainer.classList.add("project-section-icon");

        let tileIcon = document.createElement("img");
        tileIcon.src = project.icon ? project.icon : "./index_assets/icons/unknownIcon.svg";
        tileIconContainer.appendChild(tileIcon);

        tile.appendChild(tileIconContainer);

        let projectSectionInfo = document.createElement("div");
        projectSectionInfo.classList.add("project-section-info");

        let tileName = document.createElement("div");
        tileName.classList.add("project-title");
        tileName.innerText = project.name;
        projectSectionInfo.appendChild(tileName);

        let tileDescription = document.createElement("p");
        if (project.containshiddenlink) {
            tileDescription.innerHTML = project.description;
        } else {
            tileDescription.innerText = project.description;
        }
        projectSectionInfo.appendChild(tileDescription);

        tile.appendChild(projectSectionInfo);

        if (project.href) {
            let projectSectionLink = document.createElement("div");
            projectSectionLink.classList.add("project-section-link");

            let tileLink = document.createElement("a");
            tileLink.classList.add("projlink");
            tileLink.innerText = dutchpage ? "Meer..." : "More...";
            tileLink.setAttribute("href", project.href);
            projectSectionLink.appendChild(tileLink);

            tile.appendChild(projectSectionLink);
        }

        container.appendChild(tile);
    }

    let tiles = document.getElementsByClassName("block");
    for (let i = 0; i < tiles.length; i++) {
        setTimeout(() => {
            tiles[i].style.transform = "scale(1)";
        }, i * 50 + 25);
    }
}

function translatey(lang) {
    document.getElementById("p-about").innerText = lang["p-about"];
    document.getElementById("t-projects").innerText = lang["t-projects"];
    document.getElementById("t-more").innerText = lang["t-more"];
    document.getElementById("p-more").innerText = lang["p-more"];
    document.getElementById("t-socials").innerText = lang["t-socials"];
}