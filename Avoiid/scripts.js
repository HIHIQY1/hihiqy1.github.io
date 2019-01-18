// /\/OIID
// v0.6
// Made by HIHIQY1
// Do not copy!

document.getElementById("btn-exit").addEventListener("mousedown", hideAll);
document.getElementById("btn-menu").addEventListener("mousedown", afterToMain);
document.getElementById("btn-howto").addEventListener("mousedown", howTo);

function hideAll() {
    document.getElementById("hideall").style.zIndex = "10";
    fadeElement(document.getElementById("hideall"), 1);
}

//var string = "GUUQT://gjgjrx1.HJUGVC.JP/gjgjrx1/bWPJJE/TQFM";var newstring;for (i = 0; i < string.length; i++) {if(string.split("")[i]===string.split("")[i].toLowerCase()){if(string.split("")[i]=="a"){newstring=newstring+"z";}if(string.split("")[i]=="b"){newstring=newstring+"a";}if(string.split("")[i]=="c"){newstring=newstring+"b";}if(string.split("")[i]=="d"){newstring=newstring+"c";}if(string.split("")[i]=="e"){newstring=newstring+"d";}if(string.split("")[i]=="f"){newstring=newstring+"e";}if(string.split("")[i]=="g"){newstring=newstring+"f";}if(string.split("")[i]=="h"){newstring=newstring+"g";}if(string.split("")[i]=="i"){newstring=newstring+"h";}if(string.split("")[i]=="j"){newstring=newstring+"i";}if(string.split("")[i]=="k"){newstring=newstring+"j";}if(string.split("")[i]=="l"){newstring=newstring+"k";}if(string.split("")[i]=="m"){newstring=newstring+"l";}if(string.split("")[i]=="n"){newstring=newstring+"m";}if(string.split("")[i]=="o"){newstring=newstring+"n";}if(string.split("")[i]=="p"){newstring=newstring+"o";}if(string.split("")[i]=="q"){newstring=newstring+"p";}if(string.split("")[i]=="r"){newstring=newstring+"q";}if(string.split("")[i]=="s"){newstring=newstring+"r";}if(string.split("")[i]=="t"){newstring=newstring+"s";}if(string.split("")[i]=="u"){newstring=newstring+"t";}if(string.split("")[i]=="v"){newstring=newstring+"u";}if(string.split("")[i]=="w"){newstring=newstring+"v";}if(string.split("")[i]=="x"){newstring=newstring+"w";}if(string.split("")[i]=="y"){newstring=newstring+"x";}if(string.split("")[i]=="z"){newstring=newstring+"y";}}if(string.split("")[i]===string.split("")[i].toUpperCase()){if(string.split("")[i]=="A"){newstring=newstring+"Z";}if(string.split("")[i]=="B"){newstring=newstring+"A";}if(string.split("")[i]=="C"){newstring=newstring+"B";}if(string.split("")[i]=="D"){newstring=newstring+"C";}if(string.split("")[i]=="E"){newstring=newstring+"D";}if(string.split("")[i]=="F"){newstring=newstring+"E";}if(string.split("")[i]=="G"){newstring=newstring+"F";}if(string.split("")[i]=="H"){newstring=newstring+"G";}if(string.split("")[i]=="I"){newstring=newstring+"H";}if(string.split("")[i]=="J"){newstring=newstring+"I";}if(string.split("")[i]=="K"){newstring=newstring+"J";}if(string.split("")[i]=="L"){newstring=newstring+"K";}if(string.split("")[i]=="M"){newstring=newstring+"L";}if(string.split("")[i]=="N"){newstring=newstring+"M";}if(string.split("")[i]=="O"){newstring=newstring+"N";}if(string.split("")[i]=="P"){newstring=newstring+"O";}if(string.split("")[i]=="Q"){newstring=newstring+"P";}if(string.split("")[i]=="R"){newstring=newstring+"Q";}if(string.split("")[i]=="S"){newstring=newstring+"R";}if(string.split("")[i]=="T"){newstring=newstring+"S";}if(string.split("")[i]=="U"){newstring=newstring+"T";}if(string.split("")[i]=="V"){newstring=newstring+"U";}if(string.split("")[i]=="W"){newstring=newstring+"V";}if(string.split("")[i]=="X"){newstring=newstring+"W";}if(string.split("")[i]=="Y"){newstring=newstring+"X";}if(string.split("")[i]=="Z"){newstring=newstring+"Y";}}if(newstring.split("")[i]=="/"){newstring=newstring+"/"}}/*if(window.location.href!=newstring){window.location="https://duckduckgo.com";}*/
if (!window.location.href.startsWith("https://hihiqy1.github.io/HIHIQY1/Avoiid/spel")){window.location.href="https://duckduckgo.com";}

function fadeElement(anElement, anOpacity) {
    anElement.style.opacity = anOpacity;
}

function afterToMain() {
    document.getElementById("menu").style.top = "0";
    document.getElementById("menu").style.animation = undefined;
    document.getElementById("afterlevelmenu").style.top = "-100%";
    document.getElementById("afterlevelmenu").style.animation = "wipeanim-toceil .5s ease-in 1";
}

function howTo() {
    alert("Welcome!\nIn this game, you have to avoid the white blocks.");
    alert("You can do this by pressing 1, 2, 3 or 4 on your keyboard,\nor by tapping in one of the 4 sections.");
    alert("You are playing as the blue block. Try to get the highest score possible!\nGood luck!");
    alert("Note: the visible movement has a delay.");
}