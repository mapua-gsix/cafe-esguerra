//Use this to generate news/promos/announcement, simply use <template id=news-item-template>

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
  var item_template = document.getElementById("news-item-template").content;

  var clone = document.importNode(item_template, true);

  clone.querySelector(".news-image").src = bannerImagePath;
  clone.querySelector(".news-header").textContent = header;
  clone.querySelector(".news-date").textContent = datePosted;
  var contentContainer = clone.querySelector("div.news-content");
  content.forEach((element) => {
    const pElement = document.createElement("p");
    pElement.textContent = element;
    contentContainer.appendChild(pElement);
  });
  clone.querySelector(".news-redirect-text").textContent = redirectText;
  clone.querySelector(".news-redirect-button").onclick = function () {
    window.location.href = redirectLink;
  };

  return clone;
}
function appendData(data) {
  if ("content" in document.createElement("template")) {
    const container = document.getElementById("newscontainer");
    for (let i = 0; i < data.news.length; i++) {
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
