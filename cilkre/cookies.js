function checkAllowCookie() {
if (document.cookie.indexOf("allowCookie") == -1) {
}
else {
document.getElementById("bottom-cookiemsg").innerHTML="";
}
}

function allowCookies(cookiename) {
var date = new Date();
date.setTime(date.getTime() + (7*60*60*24*1000));
var expires = "expires=" + date.toUTCString();
document.cookie = cookiename + "=" + 1 + ";" + expires + ";";
document.getElementById("bottom-cookiemsg").innerHTML="";
}