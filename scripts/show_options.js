function show_options(product) {
  const optionsmodal = document.getElementById("options-modal");
  const sizeOptions = product.sizeOptions;
  const temperatureOptions = product.temperature;
  const otherOptions = product.otherOptions;
  const initialAmountOfChildren = 1;

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
        sizeOption.price,
        sizeOptionsTemplate,
        ".size-option",
        product
      )
    );
  });
  temperatureOptions.forEach((temperatureOption) => {
    temperatureOptionsFragment.appendChild(
      render_options(
        temperatureOption.name,
        temperatureOption.price,
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
        otherOption.price,
        otherOptionsTemplate,
        ".other-option",
        product
      )
    );
  });
  sizeOptionsContainer.appendChild(sizeOptionsFragment);
  temperatureOptionsContainer.appendChild(temperatureOptionsFragment);
  otherOptionsContainer.appendChild(otherOptionsFragment);
  optionsmodal.classList.add("open");
  optionsmodal.addEventListener("click", (event) => {
    if (event.target.id === "options-modal") {
      close_options();
    }
  });
  setProductPrice(product);
  document.getElementById("modal-content").classList.add("open");
  document.getElementsByTagName("body")[0].classList.add("modal-active");
}
function close_options() {
  document.getElementById("options-modal").classList.remove("open");
  document.getElementById("modal-content").classList.remove("open");
  document.getElementsByTagName("body")[0].classList.remove("modal-active");
}
function render_options(
  optionName,
  optionPrice,
  template,
  class_name,
  product
) {
  const clone = document.importNode(template, true);
  clone.querySelector(class_name).textContent = optionName;
  const input = clone.querySelector(`${class_name}-input`);
  input.value = optionName;
  input.dataset.price = optionPrice;
  if (
    class_name === `.size-option` ||
    class_name === ".other-option" ||
    class_name === ".temperature-option"
  ) {
    input.oninput = function () {
      setProductPrice(product);
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
function setProductPrice(product) {
  var sizePrice = 0;
  var otherPrice = 0;
  var temperaturePrice = 0;
  try {
    document.options.sizeOptionInput.forEach((element) => {
      if (element.checked) {
        sizePrice = element.dataset.price;
      }
    });
  } catch {
    sizePrice = 0;
  }

  try {
    document.options.otherOptionInput.forEach((element) => {
      if (element.checked) {
        otherPrice = element.dataset.price;
      }
    });
  } catch {
    otherPrice = 0;
  }
  try {
    document.options.temperatureOptionInput.forEach((element) => {
      if (element.checked) {
        temperaturePrice = element.dataset.price;
      }
    });
  } catch {
    temperaturePrice = 0;
  }
  const productview = document.getElementById("product-view");
  productview.querySelector(".product-price").textContent = parseFloat(
    parseFloat(product.price) +
      parseFloat(sizePrice) +
      parseFloat(otherPrice) +
      parseFloat(temperaturePrice)
  ).toFixed(2);
}
function getProductPrice() {
  const productview = document.getElementById("product-view");
  return productview.querySelector(".product-price").textContent;
}
