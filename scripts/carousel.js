const images = document.getElementsByClassName("carousel-image");
const carouselNav = document.getElementById("carousel-nav");
const imagesContainer = document.getElementById("carousel-images");

let slideIndex = 0;

function plusSlides(n) {
  var prev = slideIndex;
  showSlides((slideIndex += n), prev);
}
function showSlides(n, prev) {
  if (n > images.length - 1) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = images.length - 1;
  }
  console.log(
    slideIndex,
    slideIndex * (imagesContainer.scrollWidth / (images.length + 2)) -
      prev * (imagesContainer.scrollWidth / (images.length + 2))
  );
  imagesContainer.scrollBy(
    slideIndex * (imagesContainer.scrollWidth / (images.length + 2)) -
      prev * (imagesContainer.scrollWidth / (images.length + 2)),
    0
  );
}

const inMiddle = (entries, observer) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("is-inMiddle", entry.isIntersecting);
    dots[parseInt(entry.target.dataset.index)].classList.toggle(
      "active",
      entry.isIntersecting
    );
    if (entry.isIntersecting && slideIndex != entry.target.dataset.index) {
      slideIndex = parseInt(entry.target.dataset.index);
    }
  });
};

const carouselobsoptions = {
  root: imagesContainer,
  rootMargin: "0% -50% 0% -50%",
  threshold: 0,
};
const CarouselObs = new IntersectionObserver(inMiddle, carouselobsoptions);

document.querySelectorAll("[data-middle]").forEach((el) => {
  CarouselObs.observe(el);
});

for (let i = 0; i < images.length; i++) {
  var child = document.createElement("a");
  child.className = "carousel-dot";
  child.onclick = () => {
    console.log("bru");
    let prev = slideIndex;
    showSlides((slideIndex = i), prev);
  };
  carouselNav.appendChild(child);
}

const dots = document.getElementsByClassName("carousel-dot");
