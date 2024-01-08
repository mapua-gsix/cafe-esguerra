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
