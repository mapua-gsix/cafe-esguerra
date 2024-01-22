function show_options(product) {
  const optionsmodal = document.getElementById("options-modal");
  const sizeOptions = product.sizeOptions;
  const temperatureOptions = product.temperature;
  const otherOptions = product.otherOptions;
  const initialAmountOfChildren = 1;
  console.log(sizeOptions, temperatureOptions, otherOptions);

  const sizeOptionsFragment = document.createDocumentFragment();
  const temperatureOptionsFragment = document.createDocumentFragment();
  const otherOptionsFragment = document.createDocumentFragment();

  const sizeOptionsTemplate = document.getElementById(
    "size-option-template"
  ).content;
  const temperatureOptionsTemplate = document.getElementById(
    "temperature-option-template"
  ).content;
  const otherOptionsTemplate = document.getElementById(
    "other-option-template"
  ).content;
  const sizeOptionsContainer = document.getElementById("size-options");
  const temperatureOptionsContainer = document.getElementById(
    "temperature-options"
  );
  const otherOptionsContainer = document.getElementById("other-options");

  while (sizeOptionsContainer.children.length > initialAmountOfChildren) {
    sizeOptionsContainer.removeChild(sizeOptionsContainer.lastChild);
  }
  while (
    temperatureOptionsContainer.children.length > initialAmountOfChildren
  ) {
    temperatureOptionsContainer.removeChild(
      temperatureOptionsContainer.lastChild
    );
  }
  while (otherOptionsContainer.children.length > initialAmountOfChildren) {
    otherOptionsContainer.removeChild(otherOptionsContainer.lastChild);
  }

  setProductViewInfo(product);

  sizeOptions.forEach((sizeOption) => {
    sizeOptionsFragment.appendChild(
      render_options(
        sizeOption.name,
        sizeOption,
        sizeOptionsTemplate,
        ".size-option",
        product
      )
    );
  });
  temperatureOptions.forEach((temperatureOption) => {
    temperatureOptionsFragment.appendChild(
      render_options(
        temperatureOption,
        temperatureOption,
        temperatureOptionsTemplate,
        ".temperature-option",
        product
      )
    );
  });
  otherOptions.forEach((otherOption) => {
    otherOptionsFragment.appendChild(
      render_options(
        otherOption.name,
        otherOption,
        otherOptionsTemplate,
        ".other-option",
        product
      )
    );
  });
  sizeOptionsContainer.appendChild(sizeOptionsFragment);
  temperatureOptionsContainer.appendChild(temperatureOptionsFragment);
  otherOptionsContainer.appendChild(otherOptionsFragment);
  optionsmodal.style.display = "flex";
}
function close_options() {
  const optionsmodal = document.getElementById("options-modal");
  optionsmodal.style.display = "none";
}
function render_options(
  optionName,
  optionValue,
  template,
  class_name,
  product
) {
  const clone = document.importNode(template, true);
  clone.querySelector(class_name).textContent = optionName;
  const input = clone.querySelector(`${class_name}-input`);
  input.value = optionName;
  if (class_name === `.size-option`) {
    input.oninput = function () {
      setProductPrice(optionValue.price + product.price);
    };
  }

  return clone;
}
function setProductViewInfo(product) {
  const productview = document.getElementById("product-view");
  const options = document.getElementById("options");
  productview.querySelector(".product-name").textContent = product.name;
  productview.querySelector(".product-price").textContent = parseFloat(
    product.price
  ).toFixed(2);
  productview.querySelector(".product-view-image").src = product.image;
  options.querySelector(".product-id").value = product.id;
}
function setProductPrice(price) {
  const productview = document.getElementById("product-view");
  productview.querySelector(".product-price").textContent =
    parseFloat(price).toFixed(2);
}
function getProductPrice() {
  const productview = document.getElementById("product-view");
  return productview.querySelector(".product-price").textContent;
}
