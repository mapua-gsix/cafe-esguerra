const inViewport = (entries, observer) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle(
      "is-inViewport",
      entry.isIntersecting || entry.target.classList.contains("is-inViewport")
    );
  });
};

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};
const Obs = new IntersectionObserver(inViewport, options);

document.querySelectorAll("[data-inviewport]").forEach((el) => {
  Obs.observe(el);
});
