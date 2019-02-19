let xhr = new XMLHttpRequest();
xhr.responseType = "json";
xhr.open("GET", "projects.json");
xhr.addEventListener("load", e => {
    console.info(xhr.response);
    renderTiles(xhr.response);
});
xhr.send();

function renderTiles(projects) {
    let container = document.getElementById("projs");
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
        tile.classList.add("block");
        if (project.tile && project.tile.extraClasses.length) {
            for (let extraClass of project.tile.extraClasses) {
                tile.classList.add(extraClass);
            }
        }
        if (project.highlighted)
            tile.classList.add("highlighted");

        let tileName = document.createElement("h6");
        tileName.innerText = project.name;
        tile.appendChild(tileName);

        let tileDescription = document.createElement("p");
        tileDescription.innerText = project.description;
        tile.appendChild(tileDescription);

        let tileLink = document.createElement("a");
        tileLink.classList.add("projlink");
        tileLink.innerText = dutchpage ? "Meer..." : "More...";
        tileLink.setAttribute("href", project.href);
        tile.appendChild(tileLink);

        container.appendChild(tile);
    }

    let tiles = document.getElementsByClassName("block");
    for (let i = 0; i < tiles.length; i++) {
        setTimeout(() => {
            tiles[i].style.transform = "scale(1)";
        }, i * 50 + 25);
    }
}