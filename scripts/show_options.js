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
      render_options(sizeOption, sizeOptionsTemplate, ".size-option")
    );
  });
  temperatureOptions.forEach((temperatureOption) => {
    temperatureOptionsFragment.appendChild(
      render_options(
        temperatureOption,
        temperatureOptionsTemplate,
        ".temperature-option"
      )
    );
  });
  otherOptions.forEach((otherOption) => {
    otherOptionsFragment.appendChild(
      render_options(otherOption, otherOptionsTemplate, ".other-option")
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
function render_options(option, template, class_name) {
  const clone = document.importNode(template, true);
  clone.querySelector(class_name).textContent = option;
  clone.querySelector(`${class_name}-input`).value = option;
  return clone;
}
function setProductViewInfo(product) {
  const productview = document.getElementById("product-view");
  const options = document.getElementById("options");
  productview.querySelector(".product-name").textContent = product.name;
  productview.querySelector(".product-price").textContent = product.price;
  productview.querySelector(".product-view-image").src = product.image;
  options.querySelector(".product-id").value = product.id;
}
