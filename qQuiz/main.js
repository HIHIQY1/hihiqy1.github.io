let Pnl_Main = document.getElementById("main");
let Pnl_Load = document.getElementById("pnl-load");
let Pnl_Quiz = document.getElementById("quiz");
let Pnl_ButtonContainer = document.getElementById("pnl-buttoncontainer");
let Btn_LoadToMain = document.getElementById("btn-loadtomain");
let Pnl_QuizCredits = document.getElementById("pnl-quizcredits");
let Btn_CreditsToLoad = document.getElementById("btn-creditstoload");
let Btn_StartQuiz = document.getElementById("btn-startquiz");
let Pnl_About = document.getElementById("pnl-about");
let Btn_AboutToMain = document.getElementById("btn-abouttomain");
let Pnl_SavedQuizzes = document.getElementById("pnl-savedquizzes");
let Btn_SavedToMain = document.getElementById("btn-savedtomain");
let Btn_CreditsSave = document.getElementById("btn-creditssave");
let Btn_CreditsUnsave = document.getElementById("btn-creditsunsave");
let Btn_ClearSavedQuizzes = document.getElementById("btn-clearsavedquizzes");
let savedQuizzesContainer = document.getElementById("savedquizzescontainer");
let anim1 = document.getElementById("anim1");
let anim2 = document.getElementById("anim2");

let isTouchDevice = false;

let tempLevelJSON;

setupMain();

function setupMain() {
    isTouchDevice = isTouch();

    while (Pnl_ButtonContainer.lastChild) {
        Pnl_ButtonContainer.removeChild(Pnl_ButtonContainer.lastChild);
    }

    {
        let newSpacer = document.createElement("div");
        newSpacer.classList.add("spacer5");
        Pnl_Main.insertBefore(newSpacer, Pnl_ButtonContainer);
    }

    let Btn_LoadFromCode = document.createElement("div");
    Btn_LoadFromCode.classList.add("button");
    Btn_LoadFromCode.innerText = "Load from code";
    Btn_LoadFromCode.addEventListener("click", () => {
        panelAnim(Pnl_Main, Pnl_Load);
        //Pnl_Main.style.display = "none";
        //Pnl_Load.style.display = "initial";
    });
    Pnl_ButtonContainer.appendChild(Btn_LoadFromCode);

    {
        let newSpacer = document.createElement("div");
        newSpacer.classList.add("spacer2");
        Pnl_ButtonContainer.appendChild(newSpacer);
    }

    let Btn_SavedQuizzes = document.createElement("div");
    Btn_SavedQuizzes.classList.add("button");
    Btn_SavedQuizzes.innerText = "Saved quizzes";
    Btn_SavedQuizzes.addEventListener("click", () => {
        //Pnl_Main.style.display = "none";
        loadSavedQuizzes();
        //Pnl_SavedQuizzes.style.display = "initial";
        panelAnim(Pnl_Main, Pnl_SavedQuizzes);
    });
    Pnl_ButtonContainer.appendChild(Btn_SavedQuizzes);

    {
        let newSpacer = document.createElement("div");
        newSpacer.classList.add("spacer2");
        Pnl_ButtonContainer.appendChild(newSpacer);
    }

    let Btn_ToEditor = document.createElement("div");
    Btn_ToEditor.classList.add("button");
    Btn_ToEditor.innerText = "Quizeditor";
    Btn_ToEditor.addEventListener("click", () => {
        window.location.href = "./Editor/index.html";
    });
    Pnl_ButtonContainer.appendChild(Btn_ToEditor);

    {
        let newSpacer = document.createElement("div");
        newSpacer.classList.add("spacer2");
        Pnl_ButtonContainer.appendChild(newSpacer);
    }

    let Btn_About = document.createElement("div");
    Btn_About.classList.add("button");
    Btn_About.innerText = "About qQuiz";
    Btn_About.addEventListener("click", () => {
        panelAnim(Pnl_Main, Pnl_About);
    });
    Pnl_ButtonContainer.appendChild(Btn_About);

    Btn_AboutToMain.addEventListener("click", () => {
        panelAnim(Pnl_About, Pnl_Main);
    });

    Btn_LoadToMain.addEventListener("click", () => {
        panelAnim(Pnl_Load, Pnl_Main);
    });

    Btn_CreditsToLoad.addEventListener("click", () => {
        let Btn_Load = document.getElementById("btn-load");
        Btn_Load.setAttribute("enabled", "true");
        Btn_Load.style.backgroundColor = "";
        document.getElementById("text").removeAttribute("disabled");
        panelAnim(Pnl_QuizCredits, Pnl_Load);
    });

    Btn_StartQuiz.addEventListener("click", quizCreditsChecked);

    Btn_SavedToMain.addEventListener("click", () => {
        //Pnl_Main.style.display = "";
        //Pnl_SavedQuizzes.style.display = "";
        panelAnim(Pnl_SavedQuizzes, Pnl_Main);
    });

    Btn_CreditsSave.addEventListener("click", saveCurrentQuiz);

    Btn_CreditsUnsave.addEventListener("click", unsaveCurrentQuiz);

    Btn_ClearSavedQuizzes.addEventListener("click", showDeleteAllSavedQuizzesModal);

    {
        let buttons = document.getElementsByClassName("button");
        for (let button of buttons) {
            //button.addEventListener((isTouchDevice ? "touchstart" : "mousedown"), element_mouseDown);
            //button.addEventListener((isTouchDevice ? "touchend" : "mouseup"), element_mouseUp);

            button.addEventListener((isTouchDevice ? "touchstart" : "mousedown"), element_mouseDown);
            button.addEventListener((isTouchDevice ? "touchend" : "mouseup"), element_mouseUp);
            button.addEventListener((isTouchDevice ? "touchstart" : "mouseenter"), element_mouseEnter);
            button.addEventListener((isTouchDevice ? "touchend" : "mouseleave"), element_mouseLeave);
        }
    }
}

document.getElementById("btn-load").addEventListener("mouseup", () => {
    let btn = document.getElementById("btn-load");
    let codeElement = document.getElementById("text");
    if (btn.getAttribute("enabled") == "true") {
        btn.setAttribute("enabled", "false");
        btn.style.backgroundColor = "rgb(50, 50, 50)";

        codeElement.setAttribute("disabled", "true");

        let valu = document.getElementById("text").value;
        if (valu) {
            decryptLevelData(valu);
        }
        else {
            codeElement.style.backgroundColor = "rgb(255, 0, 0)";
            setTimeout(() => {
                codeElement.style.backgroundColor = "";
                btn.setAttribute("enabled", "true");
                btn.style.backgroundColor = "";
            }, 500);
        }
    }
});

function decryptLevelData(levelData) {
    // encrypt = btoa(unescape(encodeURIComponent(str))))
    let decryptedLevelData;
    let levelJSON;
    try {
        try {
            decryptedLevelData = atob(levelData);
        }
        catch {
            decryptedLevelData = LZString.decompressFromUTF16(levelData);
        }
        levelJSON = JSON.parse(decryptedLevelData);
    }
    catch (err) {
        showParseError();
    }
    if (!decryptedLevelData || !levelJSON) {
        showParseError();
    }

    if (decryptedLevelData && levelJSON) {
        document.getElementById("loadbar").style.width = "75%";

        setTimeout(() => {
            tempLevelJSON = levelJSON;
            renderQuizCredits();
            panelAnim(Pnl_Load, Pnl_QuizCredits);
            setTimeout(() => {
                document.getElementById("loadbar").style.width = "";
            }, 500);
        }, 750);
    }
}

function showParseError() {
    let codeElement = document.getElementById("text");
    codeElement.style.backgroundColor = "rgb(255, 0, 0)";
    setTimeout(() => {
        codeElement.style.backgroundColor = "";
        codeElement.removeAttribute("disabled");
    }, 500);

    let btn = document.getElementById("btn-load");
    setTimeout(() => {
        btn.setAttribute("enabled", "true");
        btn.style.backgroundColor = "";
    }, 500);
}

function renderQuizCredits() {
    let QuizCredits = document.getElementById("quizcredits");
    while (QuizCredits.children.length) {
        QuizCredits.removeChild(QuizCredits.children[0]);
    }
    let H1_QuizName = document.createElement("h1");
    H1_QuizName.innerText = tempLevelJSON.name;
    H1_QuizName.classList.add("quiztitle");
    QuizCredits.appendChild(H1_QuizName);
    let Par_QuizCredits = document.createElement("p");
    Par_QuizCredits.innerText = "Quiz made by: " + tempLevelJSON.author
        + "\n Questions: " + tempLevelJSON.questions.length +
        "\nLast edited on: " + new Date(tempLevelJSON.lastEdited).toLocaleString();
    QuizCredits.appendChild(Par_QuizCredits);

    let quizUID = tempLevelJSON.name.length + tempLevelJSON.author.length + tempLevelJSON.questions.length + new Date(tempLevelJSON.lastEdited).getTime();
    let tempSavedQuizzes = JSON.parse(localStorage.getItem("qQuiz_savedQuizzes"));
    if (tempSavedQuizzes && tempSavedQuizzes.length) {
        if (tempSavedQuizzes.filter(x => x.quizUID == quizUID).length) {
            Btn_CreditsSave.style.display = "none";
            Btn_CreditsUnsave.style.display = "";
        } else {
            Btn_CreditsSave.style.display = "";
            Btn_CreditsUnsave.style.display = "none";
        }
    } else {
        Btn_CreditsSave.style.display = "";
        Btn_CreditsUnsave.style.display = "none";
    }
}

function quizCreditsChecked() {
    setTimeout(() => {
        panelAnim(Pnl_QuizCredits, Pnl_Quiz);
        document.getElementById("loadbar").style.width = "";
        setupQuiz(tempLevelJSON);
    }, 100);
}

function loadSavedQuizzes() {
    while (savedQuizzesContainer.lastChild) {
        savedQuizzesContainer.removeChild(savedQuizzesContainer.lastChild)
    }

    {
        let heading = document.createElement("h1");
        heading.innerText = "Saved Quizzes";
        heading.classList.add("subtitle");
        savedQuizzesContainer.appendChild(heading);
    }

    {
        let newSpacer = document.createElement("div");
        newSpacer.classList.add("spacer2");
        savedQuizzesContainer.appendChild(newSpacer);
    }

    let savedQuizzes = localStorage.getItem("qQuiz_savedQuizzes");
    if (!savedQuizzes) {
        renderEmptySavedList(savedQuizzesContainer);
    } else {
        if (!JSON.parse(savedQuizzes).length) {
            renderEmptySavedList(savedQuizzesContainer);
        } else {
            savedQuizzes = JSON.parse(savedQuizzes);
            for (let savedQuiz of savedQuizzes) {
                let newSQL = renderSavedQuizzesListItem(savedQuiz.name, savedQuiz.author);
                newSQL.addEventListener("click", () => {
                    document.getElementById("text").value = localStorage.getItem("qQuiz_" + savedQuiz.quizUID);
                    Pnl_SavedQuizzes.style.display = "";
                    decryptLevelData(document.getElementById("text").value);
                });
            }

            Btn_ClearSavedQuizzes.style.display = "";
        }
    }
}

function renderEmptySavedList() {
    renderSavedQuizzesListItem("It looks like you don't have any saved quizzes", "Load some and save 'em!");

    Btn_ClearSavedQuizzes.style.display = "none";
}

function renderSavedQuizzesListItem(title, creator) {
    let EmptyListItem = document.createElement("div");
    // sql is short for Saved Quizzes List, here. Don't judge, I couldn't come up with a better name .-.
    EmptyListItem.classList.add("sql-item");

    let EmptyListItemTitle = document.createElement("div");
    EmptyListItemTitle.classList.add("sql-item-title");
    EmptyListItemTitle.innerText = title;
    EmptyListItem.append(EmptyListItemTitle);

    let EmptyListItemLabel = document.createElement("div");
    EmptyListItemLabel.classList.add("sql-item-label");
    EmptyListItemLabel.innerText = creator;
    EmptyListItem.append(EmptyListItemLabel);

    savedQuizzesContainer.appendChild(EmptyListItem);

    {
        let newSpacer = document.createElement("div");
        newSpacer.classList.add("spacer");
        savedQuizzesContainer.appendChild(newSpacer);
    }

    return EmptyListItem;
}

function saveCurrentQuiz() {
    let savedQuizzes = localStorage.getItem("qQuiz_savedQuizzes");
    if (!savedQuizzes) {
        savedQuizzes = [];
    } else {
        savedQuizzes = JSON.parse(savedQuizzes);
    }
    let newSavedQuiz = {
        "name": tempLevelJSON.name,
        "author": tempLevelJSON.author,
        "length": tempLevelJSON.questions.length,
        "lastedited": new Date(tempLevelJSON.lastEdited).getTime(),
        "quizUID": tempLevelJSON.name.length + tempLevelJSON.author.length +
            tempLevelJSON.questions.length + new Date(tempLevelJSON.lastEdited).getTime()
    };
    savedQuizzes.push(newSavedQuiz);

    savedQuizzes.sort((a, b) => a.name.localeCompare(b.name));

    localStorage.setItem("qQuiz_savedQuizzes", JSON.stringify(savedQuizzes));
    localStorage.setItem("qQuiz_" + newSavedQuiz.quizUID, document.getElementById("text").value);

    Btn_CreditsSave.style.display = "none";
    Btn_CreditsUnsave.style.display = "";
}

function unsaveCurrentQuiz() {
    let savedQuizzes = localStorage.getItem("qQuiz_savedQuizzes");
    if (!savedQuizzes) {
        savedQuizzes = [];
    } else {
        savedQuizzes = JSON.parse(savedQuizzes);
    }
    let newSavedQuiz = {
        "name": tempLevelJSON.name,
        "author": tempLevelJSON.author,
        "length": tempLevelJSON.questions.length,
        "lastedited": new Date(tempLevelJSON.lastEdited).getTime(),
        "quizUID": tempLevelJSON.name.length + tempLevelJSON.author.length +
            tempLevelJSON.questions.length + new Date(tempLevelJSON.lastEdited).getTime()
    };
    savedQuizzes = savedQuizzes.filter(x => x.quizUID != newSavedQuiz.quizUID);

    savedQuizzes.sort((a, b) => a.name.localeCompare(b.name));

    localStorage.setItem("qQuiz_savedQuizzes", JSON.stringify(savedQuizzes));
    localStorage.removeItem("qQuiz_" + newSavedQuiz.quizUID, document.getElementById("text").value);

    Btn_CreditsSave.style.display = "";
    Btn_CreditsUnsave.style.display = "none";
}

function clearSavedQuizzes() {
    let savedQuizzes = localStorage.getItem("qQuiz_savedQuizzes");
    if (!savedQuizzes) {
        console.warn("Cannot clear when there are no saved quizzes.");
    } else {
        savedQuizzes = JSON.parse(savedQuizzes);
    }
    for (savedQuiz of savedQuizzes) {
        localStorage.removeItem("qQuiz_" + savedQuiz.quizUID);
    }
    localStorage.removeItem("qQuiz_savedQuizzes");
}

function showDeleteAllSavedQuizzesModal() {
    showModal("Are you sure you want to remove all saved quizzes?", () => {
        clearSavedQuizzes();
        loadSavedQuizzes();
    }, () => { });
}

function showModal(label, yesAction, noAction) {
    let ModalWrapper = document.createElement("div");
    ModalWrapper.classList.add("modal-wrapper");

    let ModalContent = document.createElement("div");
    ModalContent.classList.add("modal-content");

    let ModalLabel = document.createElement("p");
    ModalLabel.classList.add("modal-label");
    ModalLabel.innerText = label;

    let ModalButtonsContainer = document.createElement("div");
    ModalButtonsContainer.classList.add("modal-buttons");

    let ModalButtonYes = document.createElement("div");
    ModalButtonYes.classList.add("button");
    ModalButtonYes.innerText = "Yes";
    ModalButtonYes.addEventListener("click", () => {
        yesAction();
        ModalWrapper.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(ModalWrapper);
        }, 500);
    });

    let ModalButtonNo = document.createElement("div");
    ModalButtonNo.classList.add("button");
    ModalButtonNo.innerText = "No";
    ModalButtonNo.addEventListener("click", () => {
        noAction();
        ModalWrapper.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(ModalWrapper);
        }, 500);
    });

    ModalContent.appendChild(ModalLabel);
    {
        let newSpacer = document.createElement("div");
        newSpacer.classList.add("spacer2");
        ModalContent.appendChild(newSpacer);
    }
    {
        let newSpacer = document.createElement("div");
        newSpacer.classList.add("modal-line");
        ModalContent.appendChild(newSpacer);
    }
    {
        let newSpacer = document.createElement("div");
        newSpacer.classList.add("spacer2");
        ModalContent.appendChild(newSpacer);
    }
    ModalButtonsContainer.appendChild(ModalButtonNo);
    ModalButtonsContainer.appendChild(ModalButtonYes);
    ModalContent.appendChild(ModalButtonsContainer);
    ModalWrapper.appendChild(ModalContent);
    document.body.appendChild(ModalWrapper);

    setTimeout(() => { ModalWrapper.style.opacity = 1; }, 5);
}

function isTouch() {
    return ("ontouchstart" in window
        || navigator.maxTouchPoints);
}
function element_mouseDown(e) {
    if (e.button == 0) {
        e.target.classList.add("active");
    }
}
function element_mouseUp(e) {
    if (e.button == 0) {
        setTimeout(() => { e.target.classList.remove("active"); }, 10);
    }
}
function element_mouseEnter(e) {
    e.currentTarget.classList.add("hover");
}
function element_mouseLeave(e) {
    e.currentTarget.classList.remove("hover");
    element_mouseUp(e);
}

function panelAnim(panel1, panel2) {
    anim1.style.height = "100vh";
    anim1.appendChild(panel1);

    anim2.style.height = "100vh";
    panel2.style.display = "unset";
    anim2.appendChild(panel2);
    setTimeout(() => {
        anim1.style.transform = "scale(0)";
        anim1.style.opacity = 0;

        anim2.style.transform = "scale(1)";
        anim2.style.opacity = 1;

        setTimeout(() => {
            panel1.style.display = "none";

            document.body.appendChild(panel2);
            document.body.insertBefore(panel1, panel2);

            anim1.style.height = "";
            anim1.style.transform = "";
            anim1.style.opacity = "";
            anim2.style.height = "";
            anim2.style.transform = "";
            anim2.style.opacity = "";
        }, 500);
    }, 100);
}