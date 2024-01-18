const images = document.getElementsByClassName("carousel-image");
const nav = document.getElementsByClassName("carousel-dot");

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
  console.log(slideIndex);
  for (i = 0; i < nav.length; i++) {
    nav[i].className = nav[i].className.replace(" active", "");
  }

  images[slideIndex].scrollIntoView();

  nav[slideIndex].className += " active";
}
