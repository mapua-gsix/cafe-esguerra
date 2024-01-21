const images = document.getElementsByClassName("carousel-image");
const nav = document.getElementsByClassName("carousel-dot");
const imagesContainer = document.getElementById("carousel-images");

let slideIndex = 0;

function plusSlides(n) {
  showSlides((slideIndex += n));
}
function showSlides(n) {
  let i;
  if (n > images.length - 1) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = images.length - 1;
  }
  for (i = 0; i < nav.length; i++) {
    nav[i].className = nav[i].className.replace(" active", "");
  }

  imagesContainer.scroll(slideIndex * 500, 0);

  nav[slideIndex].className += " active";
}
