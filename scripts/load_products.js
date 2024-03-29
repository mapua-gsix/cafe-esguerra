function handle_search(e) {}
function appendProductTypes(typeArray) {
  typeArray.forEach((type) => {
    appendProducts(type);
  });
}
function appendProducts(type) {
  const urlParams = new URLSearchParams(window.location.search);
  let query = urlParams.get("query");
  const searchForm = document.getElementById("search");
  if (query == null) {
    query = "";
  } else {
    searchForm.query.value = query;
  }

  switch (type) {
    case "coffee":
      console.log("loading coffee...");
      fetch("../content/products.json").then((response) =>
        response.json().then((data) => appendItems(data, "10", query))
      );
      break;
    case "frappe":
      console.log("loading frappes...");
      fetch("../content/products.json").then((response) =>
        response.json().then((data) => appendItems(data, "11", query))
      );
      break;
    case "tea":
      console.log("loading teas...");
      fetch("../content/products.json").then((response) =>
        response.json().then((data) => appendItems(data, "20", query))
      );
      break;
    case "milktea":
      console.log("loading milkteas..");
      fetch("../content/products.json").then((response) =>
        response.json().then((data) => appendItems(data, "21", query))
      );
      break;
    case "soda":
      console.log("loading sodas...");
      fetch("../content/products.json").then((response) =>
        response.json().then((data) => appendItems(data, "22", query))
      );
      break;
    case "blended":
      console.log("loading blended...");
      fetch("../content/products.json").then((response) =>
        response.json().then((data) => appendItems(data, "23", query))
      );
      break;
    case "yakult":
      console.log("loading yakult...");
      fetch("../content/products.json").then((response) =>
        response.json().then((data) => appendItems(data, "24", query))
      );
      break;
    case "pastry":
      console.log("loading pastries...");
      fetch("../content/products.json").then((response) =>
        response.json().then((data) => appendItems(data, "30", query))
      );
      break;

    default:
      break;
  }
}

function render_product(product) {
  var item_template = document.getElementById("product-item-template").content;

  //CREATING ITEM
  var clone = document.importNode(item_template, true);

  //SETTING CHILDREN DATA
  let wrapper = clone.querySelector(".product-wrapper");
  let item = clone.querySelector(".product-item");
  wrapper.onmousemove = (e) => {
    let rect = wrapper.getBoundingClientRect();
    let x = e.clientX - rect.left; //x position within the element.
    let y = e.clientY - rect.top;
    let pX = (x / rect.width) * 100;
    let pY = (y / rect.height) * 100;
    if (pX < 0) {
      pX = 0;
    }
    if (pX > 100) {
      pX = 100;
    }
    if (pY < 0) {
      pY = 0;
    }
    if (pY > 100) {
      pY = 100;
    }
    let degX = (pX - 50) / 50;
    let degY = -(pY - 50) / 50;
    item.style.transform = `rotateX(${degY}deg) rotateY(${degX}deg) translateZ(10px)`;
    item.style.zIndex = 99;
  };
  wrapper.onmouseleave = () => {
    item.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };
  clone.querySelector(".product-name").textContent = product.name;
  clone.querySelector(".product-image").src = product.image;
  clone.querySelector(".product-description").textContent = product.description;
  clone.querySelector(".product-price").textContent = parseFloat(
    product.price
  ).toFixed(2);
  clone.querySelector(".add-to-cart-button").onclick = function () {
    show_options(product);
  };

  return clone;
}

function appendItems(data, type, query) {
  const fragment = document.createDocumentFragment();
  data.products.forEach((product) => {
    console.log(product.name, query);
    if (
      Math.floor(product.id / 100) == type &&
      product.name.toUpperCase().includes(query.toUpperCase())
    ) {
      fragment.appendChild(render_product(product));
    }
  });
  document.querySelector(`.type-${type}`).appendChild(fragment);
}
