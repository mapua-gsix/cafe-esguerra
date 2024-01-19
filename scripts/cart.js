function add_to_cart(product_id) {
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  if (cart === null) {
    sessionStorage.setItem("cart", JSON.stringify(group_items([product_id])));
  } else {
    var ungrouped_cart = ungroup_cart(cart);
    ungrouped_cart.push(product_id);
    sessionStorage.setItem("cart", JSON.stringify(group_items(ungrouped_cart)));
  }
}
function remove_from_cart(product) {
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  if (cart === null) {
  } else {
    console.log(product.id);
    var index = cart
      .map(function (e) {
        return e.id;
      })
      .indexOf(product.id);
    console.log(index);
    cart.splice(index, 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }
}
function remove_items_from_cart(product_id, amount) {
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  if (cart === null) {
  } else {
    var ungrouped_cart = ungroup_cart(cart);
    var i = amount;

    while (i--) {
      if (cart[i] === product_id) {
        ungrouped_cart.splice(i, 1);
      }
    }
    sessionStorage.setItem("cart", JSON.stringify(group_items(ungrouped_cart)));
  }
}
function modify_item_quantities(product_id, target) {
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  if (cart === null) {
    return;
  }
  var index = cart
    .map(function (e) {
      return e.id;
    })
    .indexOf(product_id);
  cart[index].quantity = target;
  sessionStorage.setItem("cart", JSON.stringify(cart));
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
      array.push(group.id);
    }
  });
  return array;
}
