go();

function go() {
  if (new Date().getDate() == 27) {
    if (new Date().getMonth() + 1 == 12) {
      document.title = "Ik ben jarig!";
      document.getElementById("weljarig").style.display = "initial";
      document.getElementById("nietjarig").style.display = "none";
      document.getElementById("weljarig").style.opacity = "1";
      document.getElementById("weljarig").style.animation =
        "showanim 5s ease-out 1";
      document.getElementById("flash").style.animation =
        "flash 1s ease-in-out 1";
    }
  } else {
    document.getElementById("nietjarig").style.animation =
      "showanim 5s ease-out 1";
  }
}
