let selectedLists = [];
let currentSection = "main";
let editingList;
let lists = [
    {
        "color": "#00D4FF",
        "title": "Boodgeschaps",
        "description": "dingen",
        "items": [
            {
                "text": "appels",
            }
        ]
    }
];

let pnlMain = document.getElementById("pnl-main");
let pnlEdit = document.getElementById("pnl-edit");

setup();

function setup() {
    //let placeHolderCards = 5;
    if (localStorage.getItem("Leijst_lists")) {
        loadFromStorage();
    }

    for (let i = 0; i < lists.length; i++) {
        renderListCard(lists[i], i);
    }

    navBarUpdate();

    document.getElementById("btn-add-list").addEventListener("click", btnAddListClick);
    document.getElementById("btn-delete-lists").addEventListener("click", deleteSelectedLists);
    document.getElementById("btn-deselect-lists").addEventListener("click", deselectLists);
    document.getElementById("btn-edit-list").addEventListener("click", btnEditListClick);
    document.getElementById("btn-back").addEventListener("click", btnBackClick);
    document.getElementById("btn-add-item").addEventListener("click", btnAddItemClick);
    document.getElementById("btn-edit").addEventListener("click", btnEditClick);

    let navBarButtons = Array.from(document.getElementsByClassName("navbar-button"));
    for (let btn of navBarButtons) {
        handleEventClasses(btn);
    }

    pnlMain.style.transform = "translate3d(0, 0, 0)";
}

// List is an object with color, title, description, and tags.
function renderListCard(list, index) {
    let container = document.getElementById("lists");

    let card = document.createElement("div");
    card.classList.add("card");

    let cardColor = document.createElement("div");
    cardColor.classList.add("card-color");
    cardColor.style.backgroundColor = list.color;

    let cardSectionText = document.createElement("div");
    cardSectionText.classList.add("card-section-text");

    let cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title");
    cardTitle.innerText = list.title;

    let cardDescription = document.createElement("div");
    cardDescription.classList.add("card-description");
    cardDescription.innerText = list.description;

    cardSectionText.appendChild(cardTitle);
    cardSectionText.appendChild(cardDescription);

    card.appendChild(cardColor);
    card.appendChild(cardSectionText);
    card.setAttribute("listid", index);
    handleEventClasses(card);
    card.addEventListener("click", clickCard);

    container.appendChild(card);
}
function renderItem(item, index) {
    let container = document.getElementById("items");

    let itemElement = document.createElement("div");
    itemElement.classList.add("item");

    let itemText = document.createElement("div");
    itemText.classList.add("item-text");
    itemText.innerText = item.text;

    itemElement.appendChild(itemText);
    itemElement.setAttribute("itemid", index);
    handleEventClasses(itemElement);
    itemElement.addEventListener("click", itemClick);

    container.appendChild(itemElement);
}

function addListSpacer(container) {
    let listSpacer = document.createElement("div");
    listSpacer.classList.add("list-spacer");
    container.appendChild(listSpacer);
}

function clickCard(e) {
    let listId = e.currentTarget.getAttribute("listid");
    if (!selectedLists.includes(listId)) {
        selectedLists.push(e.currentTarget.getAttribute("listid"));
    } else {
        selectedLists.splice(selectedLists.indexOf(listId), 1);
    }
    showSelectedListCards();
    navBarUpdate();
}

function showSelectedListCards() {
    let listCards = document.getElementsByClassName("card");
    for (listCard of listCards) {
        if (selectedLists.includes(listCard.getAttribute("listid"))) {
            listCard.classList.add("selected");
        } else {
            listCard.classList.remove("selected");
        }
    }
}

function navBarUpdate() {
    let navMain = document.getElementById("nav-main");
    let navSelected = document.getElementById("nav-selected");
    let navEdit = document.getElementById("nav-edit");
    let btnEditList = document.getElementById("btn-edit-list");

    if (currentSection == "main") {
        navEdit.style.transform = "";

        if (selectedLists.length == 0) {
            navMain.style.transform = "translate3d(0, 0, 0)";

            navSelected.style.transform = "";
        }
        if (selectedLists.length >= 1) {
            navSelected.style.transform = "translate3d(0, 0, 0)";

            navMain.style.transform = "translate3d(0, -4rem, 0)";

            if (selectedLists.length == 1) {
                btnEditList.style.display = "";
            } else {
                btnEditList.style.display = "none";
            }
        }
    }
    if (currentSection == "edit") {
        navSelected.style.transform = "translate3d(0, -4rem, 0)";

        navEdit.style.transform = "translate3d(0, 0, 0)";
    }
}

function deselectLists() {
    selectedLists = [];
    showSelectedListCards();
    navBarUpdate();
}

function deleteSelectedLists() {
    // TODO: Delete them in storage, too
    let listCards = document.getElementsByClassName("card");
    listCards = Array.from(listCards);
    for (listCard of listCards) {
        if (selectedLists.includes(listCard.getAttribute("listid"))) {
            while (listCard.lastChild) {
                listCard.removeChild(listCard.lastChild);
            }
            document.getElementById("lists").removeChild(listCard);
        }
    }
    for (selectedList of selectedLists) {
        lists.splice(selectedList, 1);
    }
    selectedLists = [];
    navBarUpdate();
    saveToStorage();
}

function btnEditListClick(e) {
    editingList = parseInt(selectedLists[0]);

    renderItems();
    currentSection = "edit";
    pnlMain.style.transform = "translate3d(-100%, 0, 0)";
    pnlEdit.style.transform = "translate3d(0, 0, 0)";
    navBarUpdate();
}
function btnBackClick(e) {
    currentSection = "main";
    pnlMain.style.transform = "translate3d(0, 0, 0)";
    pnlEdit.style.transform = "";
    navBarUpdate();
}

function renderItems(e) {
    let container = document.getElementById("items");
    while (container.lastChild) {
        container.removeChild(container.lastChild);
    }
    let items = lists[editingList].items;
    for (let i = 0; i < items.length; i++) {
        renderItem(items[i], i);
    }
}
function itemClick(e) {
    let itemId = e.currentTarget.getAttribute("itemid");
    let itemText = prompt("Enter text", lists[editingList].items[itemId].text);
    if (itemText) {
        lists[editingList].items[itemId].text = itemText;

        let itemElement = Array.from(document.getElementsByClassName("item-text")).filter(f => f.parentElement.getAttribute("itemid") == itemId)[0];
        itemElement.innerText = lists[editingList].items[itemId].text;
    } else {
        lists[editingList].items.splice(lists[editingList].items.indexOf(lists[editingList].items[itemId]), 1);

        let itemElement = Array.from(document.getElementsByClassName("item")).filter(f => f.getAttribute("itemid") == itemId)[0];
        console.info(itemElement);
        document.getElementById("items").removeChild(itemElement);
    }
    saveToStorage();
}

function btnAddListClick(e) {
    let listTitle = prompt("List title?", "My New List");
    //let listColor = prompt("List color?", "#00D4FF");

    lists.push({
        "color": "#00D4FF",
        "title": listTitle,
        "description": "No description provided.",
        "items": []
    });
    renderListCard(lists[lists.length - 1], lists.length - 1);
    saveToStorage();
}

function btnAddItemClick(e) {
    let itemText = prompt("Item text?");
    if (itemText) {
        lists[editingList].items.push({
            "text": itemText
        });
        renderItems();
        saveToStorage();
    }
}

function saveToStorage() {
    localStorage.setItem("Leijst_lists", JSON.stringify(lists));
}
function loadFromStorage() {
    lists = JSON.parse(localStorage.getItem("Leijst_lists"));
}

function btnEditClick(e) {
    let listTitle = prompt("List title?", lists[editingList].title);
    let listDescription = prompt("List description?", lists[editingList].description);
    let listColor = prompt("List color?", lists[editingList].color);
    if (listTitle) {
        lists[editingList].title = listTitle;
        let theNewElement = Array.from(document.getElementsByClassName("card-title"))
            .filter(f => f.parentElement.parentElement.getAttribute("listid") == editingList)[0];
        theNewElement.innerText = lists[editingList].title;
    }
    if (listDescription) {
        lists[editingList].description = listDescription;
        let theNewElement = Array.from(document.getElementsByClassName("card-description"))
            .filter(f => f.parentElement.parentElement.getAttribute("listid") == editingList)[0];
        theNewElement.innerText = lists[editingList].description;
    }
    if (listColor) {
        lists[editingList].color = listColor;
        let theNewElement = Array.from(document.getElementsByClassName("card-color"))
            .filter(f => f.parentElement.getAttribute("listid") == editingList)[0];
        theNewElement.style.backgroundColor = lists[editingList].color;
    }
    saveToStorage();
}

function isTouch() {
    return ("ontouchstart" in window
        || navigator.maxTouchPoints);
}