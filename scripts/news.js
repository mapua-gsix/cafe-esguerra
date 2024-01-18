//Use this to generate news/promos/announcement, simply use <template id=promo-item-template>

fetch("../content/news.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  });
function render_data(
  bannerImagePath,
  header,
  content,
  datePosted,
  redirectText,
  redirectLink
) {
  var item_template = document.getElementById("promo-item-template").content;

  var clone = document.importNode(item_template, true);

  clone.querySelector(".promo-image").src = bannerImagePath;
  clone.querySelector("div.promo-header").textContent = header;
  clone.querySelector("div.promo-date").textContent = datePosted;
  clone.querySelector("div.promo-content").textContent = content;
  clone.querySelector("div.promo-redirectText").textContent = redirectText;
  clone.querySelector(".promo-redirectButton").onclick = function () {
    window.location.href = redirectLink;
  };

  return clone;
}
function appendData(data) {
  if ("content" in document.createElement("template")) {
    const container = document.getElementById("promocontainer");
    for (let i = 0; i < 1; i++) {
      container.appendChild(
        render_data(
          data.news[i].bannerImagePath,
          data.news[i].header,
          data.news[i].content,
          data.news[i].datePosted,
          data.news[i].redirectText,
          data.news[i].redirectLink
        )
      );
    }
  } else {
    console.log("template feature missing.");
  }
}
