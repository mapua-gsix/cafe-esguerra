function appendProducts(type) {
  switch (type) {
    case "coffee":
      console.log("loading coffee...");
      fetch("../content/products.json").then((response) =>
        response.json().then((data) => appendItems(data, "1"))
      );
      break;
    case "beverages":
      console.log("loading beverages...");
      fetch("../content/products.json").then((response) =>
        response.json().then((data) => appendItems(data, "2"))
      );
      break;
    case "desserts":
      console.log("loading desserts...");
      fetch("../content/products.json").then((response) =>
        response.json().then((data) => appendItems(data, "3"))
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
  clone.querySelector(".product-name").textContent = product.name;
  clone.querySelector(".product-image").src = product.image;
  clone.querySelector(".product-description").textContent = product.description;
  clone.querySelector(".product-price").textContent = product.price;
  clone.querySelector(".add-to-cart-button").onclick = function () {
    show_options(product);
  };

  return clone;
}

function appendItems(data, type) {
  const fragment = document.createDocumentFragment();
  data.products.forEach((product) => {
    console.log(
      `checking if ${product.id} matches with ${type * 1000} : ${Math.floor(
        product.id / 1000
      )}`
    );
    if (Math.floor(product.id / 1000) == type) {
      fragment.appendChild(render_product(product));
    }
  });
  document.getElementById("products").appendChild(fragment);
}
