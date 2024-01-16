var menutoggle = document.getElementById("menutoggle");
var navbar = document.getElementById("navbar");
function menutoggleClick() {
  if (navbar.classList.contains("expanded")) {
    navbar.classList.remove("expanded");
    menutoggle.classList.remove("expanded");
  } else {
    navbar.classList.add("expanded");
    menutoggle.classList.add("expanded");
  }
}
document.addEventListener("click", function (e) {
  if (checkIfPartOfHeader(e.target)) {
  } else {
    navbar.classList.remove("expanded");
    menutoggle.classList.remove("expanded");
  }
});
function checkIfPartOfHeader(a) {
  while (a) {
    if (a.tagName === "HEADER") {
      return true;
    }
    a = a.parentNode;
  }
  return false;
}
