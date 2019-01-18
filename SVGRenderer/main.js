document.getElementById("file-input").addEventListener("input", e => {
    handleInput(e.target.files);
});
document.getElementById("dropzone").addEventListener("dragover", e => {
    e.stopPropagation();
    e.preventDefault();
    //e.dataTransfer.dropEffect = "copy";
    if (e.dataTransfer.items.length == 1) {
        if (e.dataTransfer.items[0].type.toLowerCase() == "image/svg+xml") {
            e.dataTransfer.dropEffect = "copy";
        } else {
            e.dataTransfer.dropEffect = "none";
        }
    } else {
        e.dataTransfer.dropEffect = "none";
    }
});
document.getElementById("dropzone").addEventListener("drop", e => {
    e.stopPropagation();
    e.preventDefault();
    if (e.dataTransfer.files.length == 1 && e.dataTransfer.files[0].type.toLowerCase() == "image/svg+xml") {
        handleInput(e.dataTransfer.files);
    }
});

let Pnl_Input = document.getElementById("pnl-input");
let Pnl_Scale = document.getElementById("pnl-scale");
let Pnl_Output = document.getElementById("pnl-output");

document.getElementById("btn-render").addEventListener("click", () => {
    Pnl_Scale.style.transform = "scale(0)";
    Pnl_Scale.style.opacity = 0;
    convertImage();
});

document.getElementById("btn-backtohome").addEventListener("click", () => {
    Pnl_Output.style.transform = "scale(0)";
    Pnl_Output.style.opacity = 0;
    Pnl_Input.style.transform = "scale(1)";
    Pnl_Input.style.opacity = 1;
    setTimeout(() => {
        document.getElementById("img-converted").src = "";
    }, 500);
});

let Btn_ToScaling = document.getElementById("btn-toscaling");

Btn_ToScaling.addEventListener("click", () => {
    if (!Btn_ToScaling.classList.contains("disabledbutton")) {
        Pnl_Input.style.transform = "scale(0)";
        Pnl_Input.style.opacity = 0;
        showScalePanel();
    }
});

let Num_Scale = document.getElementById("scale");
Num_Scale.addEventListener("input", scaleChange);

let loadedSource;
let loadedImage;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let scaleFactor = 1;

function handleInput(e) {
    document.getElementById("loadedfile").innerText = "Selected file:\n" + e[0].name;
    document.getElementById("loadedfile").style.display = "initial";
    if (Btn_ToScaling.classList.contains("disabledbutton"))
        Btn_ToScaling.classList.remove("disabledbutton");

    let fr = new FileReader();
    fr.addEventListener("load", () => {
        //newImg.src = fr.result;
        loadedSource = fr.result;

        loadedImage = new Image();
        loadedImage.addEventListener("load", () => {
            scaleChange();
        });
        loadedImage.addEventListener("error", () => {
            console.log("err");
        });
        loadedImage.src = loadedSource;
    });
    fr.addEventListener("error", () => {
        console.log("couldn't read");
    })
    fr.readAsDataURL(e[0]);
}

function showScalePanel() {
    Pnl_Scale.style.transform = "scale(1)";
    Pnl_Scale.style.opacity = 1;
}

function scaleChange() {
    try {
        if (!isNaN(Num_Scale.value) && Num_Scale.value.length > 0) {
            scaleFactor = parseFloat(Num_Scale.value);
            if (scaleFactor != 1) {
                document.getElementById("newsize").style.display = "initial";
                document.getElementById("newsize").innerText = "The new size will be " + loadedImage.width * scaleFactor + " * " + loadedImage.height * scaleFactor;
            } else {
                document.getElementById("newsize").style.display = "";
            }
        } else {
            Num_Scale.value = "1";
        }
    } catch { }
}

function convertImage() {
    scaleFactor = document.getElementById("scale").value;

    loadedImage.addEventListener("load", () => {
        try {
            canvas.width = loadedImage.width * scaleFactor;
            canvas.height = loadedImage.height * scaleFactor;

            ctx.drawImage(loadedImage, 0, 0, loadedImage.width * scaleFactor, loadedImage.height * scaleFactor);
            document.getElementById("img-converted").src = canvas.toDataURL();

            Pnl_Output.style.transform = "scale(1)";
            Pnl_Output.style.opacity = 1;
        } catch {
            setTimeout(() => {
                document.getElementById("img-converted").src = "";

                Pnl_Scale.style.transform = "scale(1)";
                Pnl_Scale.style.opacity = 1;
            }, 750);
        }
    });
    loadedImage.addEventListener("error", () => {
        console.log("err");
    });
    loadedImage.src = loadedSource;
}