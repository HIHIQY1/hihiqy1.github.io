document.addEventListener("contextmenu", e => {
    e.preventDefault();
});

let Pnl_Home = document.getElementById("pnl-home");
let Par_Home = document.getElementById("par-home");
let Btn_Wiki = document.getElementById("btn-wiki");
let Btn_ToHome = document.getElementById("btn-tohome");
let Pnl_Prestart = document.getElementById("pnl-prestart");
let Btn_Prestart = document.getElementById("btn-prestart");
let Btn_ToWarning = document.getElementById("btn-towarning");
let Pnl_Warning = document.getElementById("pnl-warning");
let Btn_ToMainCheck = document.getElementById("btn-tomaincheck");
let Pnl_MainCheck = document.getElementById("pnl-maincheck");
let Pnl_Instructions = document.getElementById("pnl-instructions");
let Btn_ToInstructions = document.getElementById("btn-toinstructions");
let Btn_Start = document.getElementById("btn-start");
let Pnl_Main = document.getElementById("pnl-main");
let Img_RedGreen = document.getElementById("img-redgreen");
let Pnl_After = document.getElementById("pnl-after");
let Btn_ToFinal = document.getElementById("btn-tofinal");
let Pnl_Final = document.getElementById("pnl-final");
let Btn_Finish = document.getElementById("btn-finish");
let Btn_ToLightlyColored = document.getElementById("btn-tolightlycolored");
let Pnl_LightlyColored = document.getElementById("pnl-lightlycolored");

// Translations
let H_The = document.getElementById("h-the");
let H_HowItWorks = document.getElementById("h-howitworks");
let H_Warning = document.getElementById("h-warning");
let H_Check = document.getElementById("h-check");
let H_Oh = document.getElementById("h-oh");
let H_Instructions = document.getElementById("h-instructions");
let H_Done = document.getElementById("h-done");
let H_ThatsIt = document.getElementById("h-thatsit");
let Par_Prestart = document.getElementById("par-prestart");
let Par_Warning = document.getElementById("par-warning");
let Par_Check = document.getElementById("par-check");
let Par_Oh = document.getElementById("par-oh");
let Par_Instructions = document.getElementById("par-instructions");
let Par_Same = document.getElementById("par-same");
let Par_WentWell = document.getElementById("par-wentwell");
let Par_Finish = document.getElementById("par-finish");
let Btn_UnsureStart = document.getElementById("btn-unsurestart");
let Btn_ColoredHome = document.getElementById("btn-coloredhome");
let Btn_Share = document.getElementById("btn-share");
let Msg_Copied = document.getElementById("copied");
let availableTranslations = ["en", "nl"];
let translations = [];

let MainLoopId;
let Display_Red = true;

let Btns_ToHome = document.getElementsByClassName("btn-home");
for (let Btn_Stop of Btns_ToHome) {
    Btn_Stop.addEventListener("click", emergencyStop);
}

setup();

Btn_Prestart.addEventListener("click", () => {
    Pnl_Home.style.visibility = "";
    Pnl_Home.style.opacity = 0;
    setTimeout(() => {
        Pnl_Prestart.style.visibility = "initial";
        Pnl_Prestart.style.opacity = 1;
    }, 1000);
});

Btn_ToHome.addEventListener("click", () => {
    Pnl_Prestart.style.visibility = "";
    Pnl_Prestart.style.opacity = 0;
    setTimeout(() => {
        Pnl_Home.style.visibility = "initial";
        Pnl_Home.style.opacity = 1;
    }, 1000);
});

Btn_ToWarning.addEventListener("click", () => {
    Pnl_Prestart.style.visibility = "";
    Pnl_Prestart.style.opacity = 0;
    setTimeout(() => {
        Pnl_Warning.style.visibility = "initial";
        Pnl_Warning.style.opacity = 1;
    }, 1000);
});

Btn_Wiki.addEventListener("click", () => {
    Pnl_Home.style.visibility = "";
    Pnl_Home.style.opacity = 0;
    setTimeout(() => {
        window.location.href =
            "https://en.m.wikipedia.org/wiki/McCollough_effect";
    }, 1500);
});

Btn_ToMainCheck.addEventListener("click", () => {
    Pnl_Warning.style.visibility = "";
    Pnl_Warning.style.opacity = 0;
    setTimeout(() => {
        Pnl_MainCheck.style.visibility = "initial";
        Pnl_MainCheck.style.opacity = 1;
    }, 1500);
});

Btn_ToInstructions.addEventListener("click", () => {
    Pnl_MainCheck.style.visibility = "";
    Pnl_MainCheck.style.opacity = 0;
    document.body.style.backgroundColor = "black";
    setTimeout(() => {
        Pnl_Instructions.style.visibility = "initial";
        Pnl_Instructions.style.opacity = 1;
    }, 1000);
});

Btn_ToLightlyColored.addEventListener("click", () => {
    Pnl_MainCheck.style.visibility = "";
    Pnl_MainCheck.style.opacity = 0;
    document.body.style.backgroundColor = "black";
    setTimeout(() => {
        Pnl_LightlyColored.style.visibility = "initial";
        Pnl_LightlyColored.style.opacity = 1;
    }, 1000);
});

Btn_Start.addEventListener("click", () => {
    Pnl_Instructions.style.visibility = "";
    Pnl_Instructions.style.opacity = 0;
    setTimeout(() => {
        Pnl_Main.style.visibility = "initial";
        Pnl_Main.style.opacity = 1;
        setTimeout(() => {
            Pnl_Main.style.visibility = "";
            Pnl_Main.style.opacity = 0;
            clearInterval(MainLoopId);
            setTimeout(() => {
                //asdfghjklqwertyuiop to keep the formatter from formatting this empty block;
                Pnl_After.style.visibility = "initial";
                Pnl_After.style.opacity = 1;
            }, 1000);
        }, 1000 * 60 * parseFloat(document.getElementById("num-time").value));
        MainLoopId = setInterval(mainLoop, 10000);
    }, 1000);
});

Btn_ToFinal.addEventListener("click", () => {
    Pnl_After.style.visibility = "";
    Pnl_After.style.opacity = 0;
    setTimeout(() => {
        Pnl_Final.style.visibility = "initial";
        Pnl_Final.style.opacity = 1;
    }, 1000);
});

Btn_Finish.addEventListener("click", () => {
    document.body.style.backgroundColor = "";
    Pnl_Final.style.visibility = "";
    Pnl_Final.style.opacity = 0;
    setTimeout(() => {
        Pnl_Home.style.visibility = "initial";
        Pnl_Home.style.opacity = 1;
    }, 1500);
});

Btn_Share.addEventListener("click", () => {
    try {
        let CopyThing = document.createElement("input");
        CopyThing.value = "https://HIHIQY1.github.io/HIHIQY1/McCollough/";
        document.body.appendChild(CopyThing);
        CopyThing.focus();
        CopyThing.select();
        document.execCommand("copy");
        document.body.removeChild(CopyThing);

        Msg_Copied.style.transform = "scale(1)";
        setTimeout(() => {
            Msg_Copied.style.transform = "";
        }, 3000);
    } catch {
        // Too bad lmao
    }
});

function loadTranslations() {
    let availableLanguages = navigator.languages.filter(l => availableTranslations.includes(l.split("-")[0]));

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "Lang/" + availableLanguages[0].split("-")[0] + ".json");
    xhr.responseType = "json";
    xhr.onload = e => {
        applyTranslation(xhr.response);
    };
    xhr.send();
}

function applyTranslation(lang) {
    // Headings
    H_The.innerText = lang.headings.the;
    H_HowItWorks.innerText = lang.headings.howitworks;
    H_Warning.innerText = lang.headings.warning;
    H_Check.innerText = lang.headings.check;
    H_Oh.innerText = lang.headings.oh;
    H_Instructions.innerText = lang.headings.instructions;
    H_Done.innerText = lang.headings.done;
    H_ThatsIt.innerText = lang.headings.thatsit;
    // Paragraphs
    Par_Home.innerText = lang.paragraphs.home;
    Par_Prestart.innerText = lang.paragraphs.prestart;
    Par_Warning.innerText = lang.paragraphs.warning;
    Par_Check.innerText = lang.paragraphs.check;
    Par_Oh.innerText = lang.paragraphs.oh;
    Par_Instructions.innerText = lang.paragraphs.instructions;
    Par_Same.innerText = lang.paragraphs.same;
    Par_WentWell.innerText = lang.paragraphs.wentwell;
    Par_Finish.innerText = lang.paragraphs.finish;
    Msg_Copied.innerText = lang.paragraphs.linkcopied;
    // Buttons
    Btn_Start.innerText = lang.buttons.start;
    Btn_Wiki.innerText = lang.buttons.wiki;
    Btn_ToWarning.innerText = lang.buttons.next;
    Btn_ToHome.innerText = lang.buttons.previous;
    Btn_ToMainCheck.innerText = lang.buttons.surestart;
    Btn_UnsureStart.innerText = lang.buttons.unsurestart;
    Btn_ToInstructions.innerText = lang.buttons.blackwhite;
    Btn_ToLightlyColored.innerText = lang.buttons.lightlycolored;
    Btn_ColoredHome.innerText = lang.buttons.tomainmenu;
    Btn_Start.innerText = lang.buttons.start;
    Btn_ToFinal.innerText = lang.buttons.next;
    Btn_Finish.innerText = lang.buttons.finish;
    Btn_Share.innerText = lang.buttons.share;

    document.title = lang.headings.the;
}

function mainLoop() {
    Img_RedGreen.setAttribute("src", Display_Red ? "green.svg" : "red.svg");
    Display_Red = Display_Red ? false : true;
}

function setup() {
    setTimeout(() => {
        Pnl_Home.style.visibility = "initial";
        Pnl_Home.style.opacity = 1;
        Par_Home.style.opacity = 1;
    }, 1000);
    loadTranslations();
}

function emergencyStop() {
    document.body.style.backgroundColor = "";
    for (pnl of document.getElementsByClassName("panel")) {
        pnl.style.visibility = "";
        pnl.style.opacity = 0;
    }
    setTimeout(() => {
        Pnl_Home.style.visibility = "initial";
        Pnl_Home.style.opacity = 1;
    }, 1500);
}
