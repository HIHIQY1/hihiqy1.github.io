let Inp_Input = document.getElementById("fileinput");
let Inp_Output = document.getElementById("textoutput");
let Lbl_StatusPercent = document.getElementById("statuspercent");

let Chk_AlreadyBlackWhite = document.getElementById("chk-alreadyblackwhite");
let Chk_LimitSize = document.getElementById("chk-limitsize");

let isTouchDevice = false;

// Event listeners have moved to the bottom, because of the isTouchDevice

let dots = {
    "0": "⠀",
    "1": "⠁",
    "12": "⠃",
    "123": "⠇",
    "124": "⠋",
    "125": "⠓",
    "126": "⠣",
    "1234": "⠏",
    "1235": "⠗",
    "1236": "⠧",
    "12345": "⠟",
    "12346": "⠯",
    "123456": "⠿",
    "12356": "⠷",
    "1245": "⠛",
    "1246": "⠫",
    "12456": "⠻",
    "1256": "⠳",
    "13": "⠅",
    "134": "⠍",
    "135": "⠕",
    "136": "⠥",
    "1345": "⠝",
    "1346": "⠭",
    "13456": "⠽",
    "1356": "⠵",
    "14": "⠉",
    "145": "⠙",
    "146": "⠩",
    "1456": "⠹",
    "15": "⠑",
    "156": "⠱",
    "16": "⠡",
    "2": "⠂",
    "23": "⠆",
    "234": "⠎",
    "235": "⠖",
    "236": "⠦",
    "2345": "⠞",
    "2346": "⠮",
    "23456": "⠾",
    "2356": "⠶",
    "24": "⠊",
    "245": "⠚",
    "246": "⠪",
    "2456": "⠺",
    "25": "⠒",
    "256": "⠲",
    "26": "⠢",
    "3": "⠄",
    "34": "⠌",
    "345": "⠜",
    "346": "⠬",
    "3456": "⠼",
    "35": "⠔",
    "356": "⠴",
    "36": "⠤",
    "4": "⠈",
    "45": "⠘",
    "456": "⠸",
    "46": "⠨",
    "5": "⠐",
    "56": "⠰",
    "6": "⠠"
};

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

setup();
//requestAnimationFrame(draw);

function setup() {
    resFix();

    isTouchDevice = isTouch();

    animatePanels(0);
}

function resFix() {
    canvas.width = canvas.getBoundingClientRect().width;
    canvas.height = canvas.getBoundingClientRect().height;
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //requestAnimationFrame(draw);
}

async function drawImage(image) {
    if (!JSON.parse(Chk_LimitSize.getAttribute("checked")) || (image.width < 100 || image.height < 100)) {
        canvas.width = Math.round(image.width / 2) * 2;
        canvas.height = Math.round(image.height / 3) * 3;
    } else {
        console.info("limit size=on");
        let ratio = 0;
        if (image.width >= image.height) {
            ratio = image.width / 100;
            canvas.width = Math.round(image.width / ratio / 2) * 2;
            canvas.height = Math.round(image.height / ratio / 3) * 3;
        } else {
            ratio = image.height / 100;
            canvas.width = Math.round(image.width / ratio / 2) * 2;
            canvas.height = Math.round(image.height / ratio / 3) * 3;
        }
    }
    console.info("old size=" + image.width + "x" + image.height);
    console.info("new size=" + canvas.width + "x" + canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    Inp_Output.setAttribute("cols", Math.ceil(canvas.width / 1));
    Inp_Output.setAttribute("rows", Math.ceil(canvas.height / 2));

    let alreadyBlackWhite = JSON.parse(Chk_AlreadyBlackWhite.getAttribute("checked"));

    if (!alreadyBlackWhite) {
        for (let i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                let dat = ctx.getImageData(i, j, 1, 1).data;
                let klr = "black";
                //console.log(dat[0] + dat[1] + dat[2] > 225 * 3 / 2);
                if (dat[0] + dat[1] + dat[2] > 255 * 3 / 2) {
                    klr = "white";
                }
                ctx.fillStyle = klr;
                ctx.fillRect(i, j, 1, 1);
            }
            await wait(0);
            Lbl_StatusPercent.innerText = Math.round(i / canvas.width * 50) + "%";
        }

        console.info("rendered image");
    }

    Lbl_StatusPercent.innerText = "50%";

    Inp_Output.value = "";
    let newArray = [];
    for (let i = 0; i < canvas.height; i += 3) {
        for (let j = 0; j < canvas.width; j += 2) {
            newArray = [];

            let dats = [];
            dats.push(ctx.getImageData(j, i, 1, 1).data);
            dats.push(ctx.getImageData(j, i + 1, 1, 1).data);
            dats.push(ctx.getImageData(j, i + 2, 1, 1).data);
            dats.push(ctx.getImageData(j + 1, i, 1, 1).data);
            dats.push(ctx.getImageData(j + 1, i + 1, 1, 1).data);
            dats.push(ctx.getImageData(j + 1, i + 2, 1, 1).data);
            for (let k = 0; k < dats.length; k++) {
                if (dats[k][0] + dats[k][0] + dats[k][2] == 0) {
                    newArray.push(k + 1);
                }
            }

            let str = "";
            if (newArray.length) {
                newArray.forEach(e => {
                    str += e + "";
                });
            } else {
                str = "0";
            }
            Inp_Output.value += dots[str];
        }

        // Rendering a newline
        Inp_Output.value += "\n";

        await wait(0);
        Lbl_StatusPercent.innerText = Math.round(i / canvas.height * 50 + 50) + "%";
    }
    Lbl_StatusPercent.innerText = "100%";
    console.info("rendered text");

    setTimeout(() => {
        animatePanels(-2);
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            Lbl_StatusPercent.innerText = "0%";
        }, 1000);
    }, 100);
}

function avg(arr) {
    let avgvar = 0;
    for (let i = 0; i < arr.length; i++) {
        avgvar += arr[i];
    }
    return avgvar / arr.length;
}

function handleInput(e) {
    console.log("input");
    let fr = new FileReader();
    fr.onload = () => {
        let img = new Image();
        img.onload = () => {
            console.info("image loaded");
            // Animate the panel change
            animatePanels(-1);
            setTimeout(() => {
                drawImage(img);
            }, 1000);
        };
        img.onerror = () => {
            console.warn("image not loaded");
        }
        img.src = fr.result;
    }
    fr.readAsDataURL(e[0]);
}

function animatePanels(modifier) {
    let panels = document.getElementsByClassName("panel");
    for (let i = 0; i < panels.length; i++) {
        panels[i].style.transform = "rotate(Calc(360deg / " + panels.length + " * " + (i + modifier) + "))";
        panels[i].style.opacity = i + modifier == 0 ? 1 : "";
        panels[i].style.zIndex = i + modifier == 0 ? 2 : "";
    }
}

function switchSwitch(e) {
    e.currentTarget.setAttribute("checked", JSON.parse(e.currentTarget.getAttribute("checked")) ? "false" : "true");
}

function isTouch() {
    return ("ontouchstart" in window
        || navigator.maxTouchPoints);
}

// Event listeners have moved to here
document.getElementById("dropzone").addEventListener("drop", e => {
    e.stopPropagation();
    e.preventDefault();
    if (e.dataTransfer.files.length == 1 && e.dataTransfer.files[0].type.toLowerCase() == "image/*") {
        handleInput(e.dataTransfer.files);
    }
});

Inp_Input.addEventListener("change", e => { handleInput(e.target.files); });
Chk_AlreadyBlackWhite.addEventListener((isTouchDevice ? "touchend" : "mouseup"), switchSwitch);
Chk_LimitSize.addEventListener((isTouchDevice ? "touchend" : "mouseup"), switchSwitch);

document.getElementById("btn-copy").addEventListener((isTouchDevice ? "touchend" : "mouseup"), () => {
    Inp_Output.select();
    document.execCommand("copy");
});

document.getElementById("btn-back").addEventListener((isTouchDevice ? "touchend" : "mouseup"), () => {
    animatePanels(0);
});

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));