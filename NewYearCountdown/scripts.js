document.getElementById("noggeen").innerHTML = (new Date().getFullYear() + 1).toString();
document.getElementById("jawel").innerHTML = new Date().getFullYear().toString();
update();
setInterval(update, 250);

function update() {
    //var waitTime = (new Date().getFullYear() + 1) - new Date();
    
    if (new Date().getDate() == 1 & new Date().getMonth() == 0)
    {
        document.getElementById("tochwel").style.display = "initial";
        document.getElementById("nogniet").style.display = "none";
    }
    else {
        document.getElementById("nogniet").style.display = "initial";
        document.getElementById("tochwel").style.display = "none";

        var now = new Date();
        var nextYear = new Date("1/1/" + (now.getFullYear() + 1));
        var difference = nextYear - now;
        var days = Math.floor(difference/(1000*60*60*24));
        var hours = 23 - new Date().getHours();
        var minutes = 59 - new Date().getMinutes();
        var seconds = 59 - new Date().getSeconds();

        document.getElementById("countdown").innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;
    }
}