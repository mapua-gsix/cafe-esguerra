const inViewport = (entries, observer) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle(
      "is-inViewport",
      entry.isIntersecting || entry.target.classList.contains("is-inViewport")
    );
    console.log(Obs.thresholds);
  });
};
const element = document.getElementById("element");

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};
const Obs = new IntersectionObserver(inViewport, options);

document.querySelectorAll("[data-inviewport]").forEach((el) => {
  Obs.observe(el);
});
