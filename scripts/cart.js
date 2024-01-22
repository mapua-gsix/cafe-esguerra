const cart_badge = document.getElementById("badge");

function add_to_cart(item) {
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  if (cart === null) {
    sessionStorage.setItem("cart", JSON.stringify([item]));
  } else {
    let foundDuplicate = false;
    cart.forEach((cartItem) => {
      item.quantity = cartItem.quantity;
      if (JSON.stringify(item) === JSON.stringify(cartItem)) {
        console.log(item, cartItem);
        cartItem.quantity++;
        foundDuplicate = true;
      }
      item.quantity = 1;
    });
    if (!foundDuplicate) {
      cart.push(item);
    }

    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
  onModifyCart();
}
function remove_from_cart(product) {
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  if (cart === null) {
    return;
  } else {
  }
  let index = 0;
  cart.forEach((cartItem, i) => {
    if (
      JSON.stringify({
        id: product.id,
        priceEach: product.priceEach,
        customizations: product.customizations,
      }) ===
      JSON.stringify({
        id: cartItem.id,
        priceEach: cartItem.priceEach,
        customizations: cartItem.customizations,
      })
    ) {
      index = i;
    }
  });
  cart.splice(index, 1);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  onModifyCart();
}
function modify_item_quantities(product, target) {
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  if (cart === null) {
    return;
  }
  let index = 0;
  cart.forEach((cartItem, i) => {
    if (
      JSON.stringify({
        id: product.id,
        priceEach: product.priceEach,
        customizations: product.customizations,
      }) ===
      JSON.stringify({
        id: cartItem.id,
        priceEach: cartItem.priceEach,
        customizations: cartItem.customizations,
      })
    ) {
      index = i;
    }
  });
  cart[index].quantity = target;
  sessionStorage.setItem("cart", JSON.stringify(cart));
  onModifyCart();
}
function group_items(cart) {
  var array = [];
  var uniqueValues = [...new Set(cart)];

  uniqueValues.forEach((value) => {
    array.push({
      id: value,
      quantity: cart.filter((x) => x == value).length,
    });
  });

  return array;
}
function ungroup_cart(grouped_cart) {
  var array = [];
  grouped_cart.forEach((group) => {
    for (let i = 0; i < group.quantity; i++) {
      array.push({
        id: group.id,
        customizations: group.customizations,
        price: group.priceEach,
      });
    }
  });

  return array;
}
function onModifyCart() {
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  var ungrouped_cart = ungroup_cart(cart);
  cart_badge.textContent = ungrouped_cart.length;
  getTotalPrice();
}
function handle_submit(event) {
  event.preventDefault();
  var cart_item = {
    id: event.target.productID.value,
    quantity: 1,
    customizations: [
      event.target.sizeOptionInput.value,
      event.target.temperatureOptionInput.value,
      event.target.otherOptionInput.value,
    ],
    priceEach: getProductPrice(),
  };
  add_to_cart(cart_item);
  close_options();
}
function getTotalPrice() {
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  if (cart === null) {
  } else {
    var runningTotal = 0;
    cart.forEach((cartItem) => {
      runningTotal += cartItem.quantity * cartItem.priceEach;
    });
    return runningTotal;
  }
}
onModifyCart();
