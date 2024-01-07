var navbar = document.getElementById("navbar");
window.addEventListener("scroll", (event) => {
  let scroll = this.scrollY;
  if (scroll > 100) {
    navbar.classList.remove("transparent");
  } else {
    navbar.classList.add("transparent");
  }
});
