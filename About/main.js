document.addEventListener("contextmenu", function(e) { e.preventDefault(); });

document.getElementById("header-1").addEventListener("click", function() { goToSection(1); });
document.getElementById("header-2").addEventListener("click", function() { goToSection(2); });
document.getElementById("header-3").addEventListener("click", function() { goToSection(3); });
document.getElementById("header-4").addEventListener("click", function() { goToSection(4); });

function getYrsOld()
{
    // From https://stackoverflow.com/a/10008175
    var birthdate = new Date("2003/12/27");
    var current = new Date();
    var difference = current-birthdate;
    var age = Math.floor(difference / 31557600000);
    document.getElementById("yrs").textContent = age;
} getYrsOld();

function goToSection(integer) {
    var offset;
    switch (integer) {
        case 1:
            offset = 0;
            window.scrollTo({
                top: offset,
                left: 0,
                behavior: 'smooth'
            });
            break;
        case 2:
            offset = document.getElementById("yt").getBoundingClientRect().top - document.body.getBoundingClientRect().top - document.getElementById("header").getBoundingClientRect().height - 15;
            window.scrollTo({
                top: offset,
                left: 0,
                behavior: 'smooth'
            });
            break;
        case 3:
            offset = document.getElementById("web").getBoundingClientRect().top - document.body.getBoundingClientRect().top - document.getElementById("header").getBoundingClientRect().height - 15;
            window.scrollTo({
                top: offset,
                left: 0,
                behavior: 'smooth'
            });
            break;
        case 4:
            offset = document.getElementById("social").getBoundingClientRect().top - document.body.getBoundingClientRect().top - document.getElementById("header").getBoundingClientRect().height - 15;
            window.scrollTo({
                top: offset,
                left: 0,
                behavior: 'smooth'
            });
            break;
    }
}