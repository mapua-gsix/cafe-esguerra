function load_cart() {
  fetch("../content/products.json").then((response) =>
    response.json().then((data) => appendOrders(data))
  );

  function render_item(cartItem, data, i) {
    var item_template = document.getElementById("order-item-template").content;

    //FINDING CORRESPONDING PRODUCT FROM PRODUCTS.JSON
    const isSameId = (element) => element.id == cartItem.id;
    var index = data.products.findIndex(isSameId);

    //CREATING ITEM
    var clone = document.importNode(item_template, true);

    //SETTING CHILDREN DATA
    var price = clone.querySelector(".item-price");
    price.textContent = `Price: ₱${parseFloat(
      cartItem.priceEach * cartItem.quantity
    ).toFixed(2)}`;
    clone.querySelector(".product-name").textContent =
      data.products[index].name;
    clone.querySelector(".product-index").textContent = i + 1;
    var quantity = clone.querySelector(".product-quantity");
    quantity.value = cartItem.quantity;
    function changeQuantity(value) {
      if (value < 1 || value == null) {
        value = 1;
        quantity.value = 1;
      } else if (value > 100) {
        value = 100;
        quantity.value = 100;
      }
      modify_item_quantities(cartItem, value);
      price.textContent = `Price: ₱${parseFloat(
        cartItem.priceEach * value
      ).toFixed(2)}`;
    }
    quantity.onchange = function () {
      changeQuantity(this.value);
    };
    clone.querySelector(".product-description").textContent =
      data.products[index].description;
    clone.querySelector(".image").src = data.products[index].image;
    clone.querySelector(".remove-button").onclick = function () {
      remove_from_cart(cartItem);
      load_cart();
    };
    clone.querySelector(".add").onclick = function () {
      quantity.value++;
      changeQuantity(quantity.value);
    };
    clone.querySelector(".remove").onclick = function () {
      quantity.value--;
      changeQuantity(quantity.value);
    };
    clone.querySelector(".product-price").textContent = `₱${parseFloat(
      cartItem.priceEach
    ).toFixed(2)} each`;

    var customizations = clone.querySelector(".product-customizations");
    customizations.appendChild(generateChildren(cartItem.customizations));

    return clone;
  }
  function generateChildren(array) {
    var frag = document.createDocumentFragment();
    array.forEach((element) => {
      if (element != null) {
        var span = document.createElement("span");
        span.textContent = element;
        span.classList.add("product-customization");
        frag.appendChild(span);
      }
    });
    return frag;
  }
  function appendOrders(data) {
    const ordercontainer = document.getElementById("ordercontainer");
    while (ordercontainer.children.length > 1) {
      ordercontainer.removeChild(ordercontainer.lastChild);
    }
    var cart = JSON.parse(sessionStorage.getItem("cart"));
    console.log("ORDERS:", cart);
    if (cart != null) {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < cart.length; i++) {
        fragment.appendChild(render_item(cart[i], data, i));
      }
      ordercontainer.appendChild(fragment);
    }
  }
}
