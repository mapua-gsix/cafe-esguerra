var navbar = document.getElementById("navbar");
window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  if (scroll > 1) {
    navbar.classList.remove("transparent");
  } else {
    navbar.classList.add("transparent");
  }
});
