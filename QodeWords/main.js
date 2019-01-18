document.getElementById("btn-load").addEventListener("mousedown", function () {
    var btn = document.getElementById("btn-load");
    var codeElement = document.getElementById("text");
    if (btn.getAttribute("enabled") == "true") {
        btn.setAttribute("enabled", "false");
        btn.style.backgroundColor = "rgb(50, 50, 50)";

        codeElement.setAttribute("disabled", "true");

        var valu = document.getElementById("text").value;
        if (valu) {
            decryptLevelData(valu);
        }
        else {
            codeElement.style.backgroundColor = "rgb(255, 0, 0)";
            setTimeout(function () {
                codeElement.style.backgroundColor = "";
                btn.setAttribute("enabled", "true");
                btn.style.backgroundColor = "";
            }, 500);
        }
    }
});

function decryptLevelData(levelData) {
    // encrypt = btoa(unescape(encodeURIComponent(str))))
    var decryptedLevelData;
    var levelJSON;
    try {
        decryptedLevelData = atob(levelData);
        levelJSON = JSON.parse(decryptedLevelData);
    }
    catch (err) {
        console.log("decrypting error ->\n" + err.toString());

        var codeElement = document.getElementById("text");
        codeElement.style.backgroundColor = "rgb(255, 0, 0)";
        setTimeout(function () {
            codeElement.style.backgroundColor = "";
            codeElement.removeAttribute("disabled");
        }, 500);

        var btn = document.getElementById("btn-load");
        setTimeout(function () {
            btn.setAttribute("enabled", "true");
            btn.style.backgroundColor = "";
        }, 500);
    }

    if (decryptedLevelData && levelJSON) {        
        var colorData = [];
        for (i = 0; i < decryptedLevelData.length; i++) {
            colorData.push(decryptedLevelData.charCodeAt(i).toString(8));
        }

        var canvas = document.getElementById("colorcode");
        var ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = false;
        canvas.width = Math.sqrt(colorData.length);
        canvas.height = Math.sqrt(colorData.length);
        canvas.style.display = "block";

        console.log(colorData);

        console.log("drawstart");

        var x = 0;
        var y = 0;
        for (i = 0; i < colorData.length; i++) {
            x = i % canvas.width;
            if (x == 0 && i > 0) {
                y++;
            }
            ctx.fillStyle = "rgb(" +
            colorData[i] + ", " +
            colorData[i + 1] + ", " +
            colorData[i + 2] + ")";
            ctx.fillRect(x, y, 1, 1);
        }

        console.log("drawend");

        canvas.style.transitionDuration = "1s";
        setTimeout(function () { canvas.style.height = "75vh"; }, 100);
        setTimeout(function () { document.getElementById("status").innerHTML = "Loading..."; }, 100);
        setTimeout(function () { canvas.style.transitionDuration = ""; }, 1100);
        setTimeout(function () { document.getElementById("status").innerHTML = "Loaded"; }, 1100);

        setTimeout(function () {
            document.getElementById("swart").style.height = "100vh";
            document.getElementById("swart").style.opacity = "1";

            setTimeout(function () {
                document.getElementById("main").style.display = "none";
                setup(levelJSON);
                setTimeout(function () {
                    document.getElementById("swart").style.opacity = "0";
                    setTimeout(function () { document.getElementById("swart").style.height = "0"; }, 750);
                }, 250);
            }, 500);
        }, 2000);
    }
}