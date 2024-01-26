const images = document.getElementsByClassName("carousel-image");
const nav = document.getElementsByClassName("carousel-dot");
const imagesContainer = document.getElementById("carousel-images");

let slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}
function showSlides(n) {
  let i;
  if (n > images.length - 2) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = images.length - 2;
  }

  var scrollWidth =
    28 * parseFloat(getComputedStyle(document.documentElement).fontSize); //convert rem to pixels
  imagesContainer.scroll(slideIndex * scrollWidth, 0);
}
imagesContainer.addEventListener("scrollend", function () {
  var scrollWidth =
    28 * parseFloat(getComputedStyle(document.documentElement).fontSize);
  var index = Math.round(imagesContainer.scrollLeft / scrollWidth);
  console.log(index, images.length, imagesContainer.scrollLeft / scrollWidth);
  if (index == 0) {
    imagesContainer.scrollBy(scrollWidth, 0);
  }
  if (index == images.length - 1) {
    imagesContainer.scrollBy(-scrollWidth, 0);
  }
  for (i = 0; i < nav.length; i++) {
    nav[i].className = nav[i].className.replace(" active", "");
  }
  for (i = 0; i < images.length; i++) {
    images[i].classList.remove("middle");
  }

  try {
    images[index].classList.add("middle");
    nav[index - 1].className += " active";
  } catch (err) {
    console.log("Carousel Error: ", err);
  }
});
showSlides((slideIndex = 1));
